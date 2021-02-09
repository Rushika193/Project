from logging import setLogRecordFactory
import os
from scrapper.settings import BASE_DIR, STATIC_ROOT
from apps.webscrapper.Helper.DOMStructure import DOMStructure
from apps.webscrapper.Helper.elasticsearch import ElasticSearch
from apps.webscrapper.Helper.DriverHelper import DriverHelper
from apps.webscrapper.Helper.WebsiteScrapper import WebsiteScrapper
import random
import string
from decouple import config
import time

class DOMParser:

    def __init__(self):
        driverHelper = DriverHelper("chrome")
        self.driver = driverHelper.driver
        self.scrapper = WebsiteScrapper()

    def __del__(self):
        self.driver.close()

    # Parse sites for given array of URLS
    def parse_sites(self, urls):
        page_row = []
        for url in urls:
            # Load the URL of the site
            self.load_url(url)
            # Extract the list of pages that site has
            pages = self.get_page_list()
            for page in pages:
                print(page)
                try:
                    self.load_url(page)
                    page_row += self.parse_rows()
                except Exception as e:
                    print('exception', e)

        return page_row

    def load_url(self, url):
        self.single_page_url = url
        self.driver.get(self.single_page_url)
        #self.driver.maximize_window()
        #lazyload executes here

        """
            var count =0;
            var windowsHeight = document.body.scrollHeight;
            function scrollToBottom()
            {                   
                window.scrollBy(0, 500)
                if(count >= windowsHeight)
                {
                    clearInterval(scrolltobottom);
                    window.scrollTo(0,0);
                }    
                count +=  500;                
            }
            var scrolltobottom = setInterval(scrollToBottom,1000)                                           
        """
        scrollHeight = int(self.driver.execute_script("return  document.body.scrollHeight"))
        scrollPos = 0
        while (scrollPos <= scrollHeight):
            self.driver.execute_script("window.scrollBy(0, 500)")
            scrollPos += 500
            time.sleep(2)
        self.driver.execute_script("window.scrollTo(0,0)")


    # return the list of pages from menu for a page
    def get_page_list(self):
        page_links = []
        navbar = self.driver.find_element_by_tag_name('nav')
        website_type = navbar.get_attribute('data-active')
        if website_type == 'mutiplepage':
            page_links = self.scrapper.get_href_links(navbar)
        elif website_type == 'onepagemenu':
            page_links = [self.single_page_url]
        return list(set(page_links))

    def get_cpage_rows(self):
        return self.driver.find_elements_by_class_name('cRow')

    def get_cpage_basic_rows(self):
        actual_rows = []
        advance_component = ['accordion', 'body', 'bar chart', 'carousel', 'search',
                             'search result', 'contact us', 'dynamic_cmp_detail',
                             'dynamic_cmp_list', 'google map', 'iFrame', 'image slider',
                             'imagebanner', 'line chart', 'login status', 'logo slider',
                             'managepages', 'menu', 'menupages', 'milestone', 'pie chart',
                             'Policy Info', 'row separator', 'share page', 'user registration',
                             'siteheader', 'siteheadermenu', 'skill bar', 'SoundCloudPlayer',
                             'subscribe', 'forgot password', 'login form', 'password recover', '',
                             'tabs', 'Text editor', 'unsubscribe form', 'verticalcollector',
                             'verticalcollectors', 'videobanner', 'layer slider', 'dynamic form', 'client slider']
        try:
            rows = self.get_cpage_rows()
            for row in rows:
                row_data_type = row.get_attribute('data-type')
                if row_data_type not in advance_component:
                    actual_rows.append(row)
        except Exception as e:
            raise e
        return actual_rows

    def parse_rows(self):
        comp_data = []
        grp_data_component = ['container', 'holder']
        data_types = ['button', 'font icon', 'image', 'icon text', 'rich text', 'social link',
                      'text link', 'text', 'youtube video', 'Image Link', 'heading', 'form', 'underline']
        rows = self.get_cpage_basic_rows()

        for row in rows:
            fileName = ''.join(random.choice(
                string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(16))
            # full path
            # make sure the directory exists
            file_path = 'static/screenshot/'+fileName+'.png'
            row.screenshot(file_path)

            # Get the structure of the given row
            row_structure = DOMStructure().row_structure(row)
            components = row_structure["components"]
            result = self.get_template(row, components)
            row_structure['template'] = result['template']
            row_structure['componentOrderJson'] = result['componentOrderJson']
            row_structure['imagePath'] = file_path
            # save the data  somewhere using Elastic Search
            es = ElasticSearch()
            es.single_indexing(config('INDEX_NAME'),
                               row_structure, 'cbuilder_row')
        return comp_data

    def get_template(self, row, components):
        components = list(set(components))
        jsScript = open(STATIC_ROOT + "/js/row_template.js").read()
        row_template = self.driver.execute_script(jsScript, row, components)
        return row_template

    def get_website_source(self):
        website_source = []
        page_list = self.get_page_list()
        for page in page_list:
            try:
                page_source = self.scrapper.get_page_source(page)
                status = 'Ok'
            except Exception as e:
                page_source = ''
                status = 'exception:'+str(e)
            website_source.append({'url': page,
                                   'page_source': page_source,
                                   'status': status})
        return website_source

    def get_cpage_cols(self, row_obj):
        return row_obj.find_elements_by_xpath('div/div')

    def get_data_type(self, obj):
        return obj.get_attribute('data-type')

    #______listing and non listing start____________#

    def checkListInRow(self, row_structs):
        areColsEqual = True
        totalcols = len(row_structs["child"])
        col_commpo = row_structs["child"][0]["components"]
        for i in range(1, totalcols):
            if(not self.equalArray(col_commpo, row_structs["child"][i]["components"])):
                areColsEqual = False
                break
        return areColsEqual, col_commpo

    def check_list_in_col(self, col, compo_type):
        holders = []
        containers = []
        for component in col["child"]:
            if component["type"] == 'holder':
                holders.append(component['components'])
            if component["type"] == 'container':
                containers.append(component['components'])
        holders_len = len(holders)
        identical = True
        if holders_len > 1:
            first_holder = holders[0]
            for i in range(1, holders_len):
                eql = self.equalArray(first_holder, holders[i])
                if not eql:
                    identical = False
                    break
        else:
            identical = False
        return identical

    def Array_identical(self, arr):
        n = len(arr)
        i = 0
        allAreEqual = True
        while i < (n-1):
            if(arr[i] == arr[i+1]):
                allAreEqual = True
            else:
                allAreEqual = False
                break
            i += 1
        return allAreEqual

    def equalArray(self, arr1, arr2):
        n = len(arr1)
        m = len(arr2)
        if (n != m):
            return False
        arr1.sort()
        arr2.sort()
        # Linearly compare elements
        for i in range(0, n - 1):
            if (arr1[i] != arr2[i]):
                return False
        # If all elements were same.
        return True

    #______listing and non listing end____________#

    def get_property(self, class_dict=None, class_attribute=None):
        ATTRIBUTE_CLASS = {
            'margin-left': 'Ml',
            'margin-top': 'Mt',
            'margin-right': 'Mr',
                            'margin-bottom': 'Mb',
                            'padding-left': 'Pl-',
                            'padding-right': 'Pr-',
                            'padding-bottom': 'Pb-',
                            'padding-top': 'Pt-',
                            'text-align': 'TxAl-',
                            'font-size': 'Fs-',
                            'line-height': 'Lh-',
                            'letter-space': 'LtrSpc-',
                            'text-decoration': 'Td',
                            'font-style': 'FsI',
                            'font-weight': 'f-weight-',
                            'width': 'sfCol_',
                            'height': 'H-',
                            'font-family': 'ff-',
                            'text-transform': 'tx',
                            'width': 'W-',
                            'font-icon': 'fa-'

        }
        a_c = class_dict if class_dict is not None else ATTRIBUTE_CLASS
        property_data = {}
        comp_class = class_attribute
        classes = comp_class.split()
        for _class in classes:
            for i in a_c:
                if _class.startswith(a_c[i]):

                    value = None

                    if _class.startswith('M'):
                        if _class[2] == 'N':
                            value = _class[_class.index('-'):]
                        else:
                            value = _class[_class.index('-')+1:]
                    elif _class.startswith('f-weight-'):
                        value = _class[_class.index('t-')+2:]

                    elif _class.startswith('TxAl'):
                        allign = _class[_class.index('-')+1:]
                        if allign == 'l':
                            value = 'left'
                        elif allign == 'c':
                            value = 'center'
                        elif allign == 'r':
                            value = 'right'
                        elif allign == 'n':
                            value = 'none'

                    elif _class.startswith('Td'):
                        if _class == 'TdU':
                            value = 'underline'
                        if _class == 'TdS':
                            value = 'line-through'

                    elif _class == 'FsI':
                        value = 'italic'
                    elif _class.startswith('sfCol_') or _class.startswith('W-'):
                        if _class.startswith('sfCol_'):
                            value = _class[_class.index('_')+1:]
                        else:
                            value = _class[_class.index('-')+1:]
                    elif _class.startswith('tx'):
                        if _class == 'txU':
                            value = 'uppercase'
                        elif _class == 'txL':
                            value = 'lowwercase'
                        elif _class == 'txC':
                            value = 'capitalized'
                    else:
                        value = _class[_class.index('-')+1:]

                    temp = value
                    property_data[i] = temp
        return property_data

    def parse_page_data(self):
        rows = self.get_cpage_basic_rows()

    def get_page_data(self):
        _es = ElasticSearch()
        comp_data = []
        grp_data_component = ['container', 'holder']
        data_types = ['button', 'font icon', 'image', 'icon text', 'rich text', 'social link',
                      'text link', 'text', 'youtube video', 'Image Link', 'heading', 'form', 'underline']
        rows = self.get_cpage_basic_rows()
        for row in rows:
            row_data = []
            # row property
            row_property_class = row.get_attribute('class')
            row_property_data = self.get_property(
                class_attribute=row_property_class)
            columns = self.get_cpage_cols(row)
            for column in columns:
                column_data = []
                # column_property
                column_property_class = column.get_attribute('class')
                column_property_data = self.get_property(
                    class_attribute=column_property_class)
                div_class = column.get_attribute('class')
                if div_class == 'cGrid ':
                    divisions = column.find_elements_by_xpath('div/div')
                else:
                    divisions = column.find_elements_by_xpath('div')

                for division in divisions:
                    data_type = self.get_data_type(division)
                    if data_type in grp_data_component:
                        if data_type == grp_data_component[0]:
                            container_property_class = division.get_attribute(
                                'class')
                            container_property_data = self.get_property(
                                class_attribute=container_property_class)
                            container_data = self.get_container_data(division)
                            column_data.append(
                                {'component_name': data_type, 'properties': container_property_data, 'child': container_data})
                        else:
                            # holder property
                            holder_property_class = division.get_attribute(
                                'class')
                            holder_property_data = self.get_property(
                                class_attribute=holder_property_class)
                            holder_data = self.get_holder_data(division)
                            column_data.append(
                                {'component_name': data_type, 'properties': holder_property_data, 'child': holder_data})
                    elif data_type in data_types:
                        data = self.get_component_data(division)
                        column_data.append(data)
                    else:
                        column_data.append({'component_name': 'undefined', 'properties': division.get_attribute(
                            'class'), 'child': data_type})

                row_data.append(
                    {'component_name': 'col', 'properties': column_property_data, 'child': column_data})

            row_data_es = {'component_name': 'row',
                           'properties': row_property_data, 'child': row_data}
            ind, created = _es.get_or_create(config('INDEX_NAME'))
            if ind:
                _es.single_indexing(config('INDEX_NAME'), row_data_es)
            comp_data.append(row_data_es)
        return comp_data

    def get_container_data(self, container_obj):
        cont_data = []
        undefined_data = []
        data_types = ['button', 'font icon', 'image', 'icon text', 'rich text', 'social link',
                      'text link', 'text', 'youtube video', 'Image Link', 'heading', 'form', 'underline']

        grp_data_component = ['holder']
        columns = self.get_cpage_cols(container_obj)
        for column in columns:
            column_data = []
            divisions = column.find_elements_by_xpath('div')
            for div in divisions:
                data_type = self.get_data_type(div)
                if data_type in grp_data_component:
                    holder_property_class = div.get_attribute('class')
                    holder_property_data = self.get_property(
                        class_attribute=holder_property_class)
                    holder_data = self.get_holder_data(div)
                    column_data.append(
                        {'component_name': data_type, 'properties': holder_property_data, 'child': holder_data})
                elif data_type in data_types:
                    data = self.get_component_data(div)
                    column_data.append(data)
                else:
                    column_data.append({'component_name': 'undefined', 'properties': div.get_attribute(
                        'class'), 'child': data_type})
            cont_data.append(
                {'component_name': 'col', 'properties': {}, 'child': column_data})
        return cont_data

    def get_holder_data(self, holder_obj):

        undefined_data = []
        data = {}
        column_data = []
        data_types = ['button', 'font icon', 'image', 'icon text', 'rich text', 'social link',
                      'text link', 'text', 'youtube video', 'Image Link', 'heading', 'form', 'underline']

        grp_data_component = ['holder']
        data_div = self.get_cpage_cols(holder_obj)

        for div in data_div:
            data_type = self.get_data_type(div)
            if data_type in grp_data_component:
                holder_property_class = div.get_attribute('class')
                holder_property_data = self.get_property(
                    class_attribute=holder_property_class)
                holder_data = self.get_holder_data(div)
                column_data.append(
                    {'component_name': data_type, 'properties': holder_property_data, 'child': holder_data})
            elif data_type in data_types:
                component_data = self.get_component_data(div)
                column_data.append(component_data)
            else:
                column_data.append({'component_name': 'undefined', 'properties': div.get_attribute(
                    'class'), 'child': data_type})
        return column_data

    def get_component_data(self, component_obj):

        data = []
        data_type = self.get_data_type(component_obj)

        if data_type == 'text':
            data = self.get_text_property(component_obj)
        elif data_type == 'heading':
            data = self.get_heading_property(component_obj)
        elif data_type == 'image':
            data = self.get_image_property(component_obj)
        elif data_type == 'underline':
            data = self.get_underline_property(component_obj)
        elif data_type == 'rich text':
            data = self.get_rich_text_property(component_obj)
        elif data_type == 'text link':
            data = self.get_text_link_property(component_obj)
        elif data_type == 'Image Link':
            data = self.get_image_link_property(component_obj)
        elif data_type == 'button':
            data = self.get_button_property(component_obj)
        elif data_type == 'font icon':
            data = self.get_font_icon_property(component_obj)
        elif data_type == 'icon text':
            data = self.get_icon_text_property(component_obj)
        elif data_type == 'social link':
            data = self.get_social_link_property(component_obj)
        elif data_type == 'youtube video':
            data = self.get_youtube_video_property(component_obj)
        elif data_type == 'form':
            #data = self.get_form_property(component_obj)
            data = {}
        _data = {'component_name': data_type}
        _data.update(data)
        return _data

    def get_form_property(self, form_obj):
        return 'form'

    def get_youtube_video_property(self, youtube_video_obj):

        data = {}
        component_property_data = {}
        youtube_video_property_data = {}

        component_property_class = youtube_video_obj.get_attribute('class')
        component_property_data = self.get_property(
            class_attribute=component_property_class)

        youtube_video_div = youtube_video_obj.find_element_by_xpath('div')
        youtube_video_property_class = youtube_video_div.get_attribute('class')
        youtube_video_property_data = self.get_property(
            class_attribute=youtube_video_property_class)

        video_link = youtube_video_div.find_element_by_xpath(
            'iframe').get_attribute('src')
        data = {
            # 'component_property':component_property_data,
            'properties': youtube_video_property_data,
            'content': video_link
        }
        return data

    def get_social_link_property(self, social_link_obj):

        data = {}
        component_property_data = {}
        social_link_property_data = []

        component_property_class = social_link_obj.get_attribute('class')
        social_link_list = social_link_obj.find_elements_by_xpath('div/div')

        component_property_data = self.get_property(
            class_attribute=component_property_class)
        for social_link in social_link_list:
            icon_data = self.get_font_icon_property(social_link)
            social_link_property_data.append(icon_data)

        data = {
            'properties': component_property_data,
            'content': social_link_property_data
        }

        return data

    def get_icon_text_property(self, icon_text_obj):
        data = {}
        component_property_data = {}
        icon_text_property_data = {}
        icon_text = []
        component_property_class = icon_text_obj.get_attribute('class')
        icon_text_div = icon_text_obj.find_element_by_xpath('ul')
        icon_text_property_class = icon_text_div.get_attribute('class')

        component_property_data = self.get_property(
            class_attribute=component_property_class)
        icon_text_property_data = self.get_property(
            class_attribute=icon_text_property_class)

        show_icon = True if icon_text_div.get_attribute(
            'data-showicon') == 'true' else False
        icon_text_property_data['show-icon'] = show_icon

        list_items = icon_text_div.find_elements_by_xpath('li')

        for items in list_items:

            item_property_data = {}
            icon_property_data = {}
            label_property_data = {}

            item_property_class = items.get_attribute('class')
            label_property_class = items.find_element_by_xpath(
                'label').get_attribute('class')

            item_property_data = self.get_property(
                class_attribute=item_property_class)
            label_property_data = self.get_property(
                class_attribute=label_property_class)
            if show_icon:
                icon_property_class = items.find_element_by_xpath(
                    'i').get_attribute('class')
                icon_property_data = self.get_property(
                    class_attribute=icon_property_class)
            label_text = items.find_element_by_xpath('label').text
            list_data = {
                'list_item_property': item_property_data,
                'icon_property': icon_property_data,
                'label_property': label_property_data,
                'label_text': label_text
            }

            icon_text.append(list_data)

        data = {  # 'component_property':component_property_data,
            'properties': icon_text_property_data,
            'content': icon_text}
        return data

    def get_font_icon_property(self, font_icon_obj):
        data = {}
        component_property_data = {}
        font_icon_property_data = {}
        component_property_class = font_icon_obj.get_attribute('class')
        font_icon_div = None
        try:
            font_icon_div = font_icon_obj.find_element_by_xpath('a')
            font_icon_property_class = font_icon_div.get_attribute('class')
            font_icon_property_data = self.get_property(
                class_attribute=font_icon_property_class)
            font_icon_property_data['data-href'] = font_icon_div.get_attribute(
                'data-href')

        except:
            font_icon_div = font_icon_obj.find_element_by_xpath('div')
            font_icon_property_class = font_icon_div.get_attribute('class')
            font_icon_property_data = self.get_property(
                class_attribute=font_icon_property_class)

        component_property_data = self.get_property(
            class_attribute=component_property_class)

        font_icon_i = font_icon_div.find_element_by_xpath(
            'i').get_attribute('class')
        font_icon = self.get_property(class_attribute=font_icon_i)

        data = {  # 'component_property':component_property_data,
            'properties': font_icon_property_data,
            'content': font_icon}
        return data

    def get_button_property(self, button_obj):
        data = {}
        component_property_data = {}
        button_property_data = {}
        component_property_class = button_obj.get_attribute('class')
        button_div = button_obj.find_element_by_xpath('a')
        button_property_class = button_div.get_attribute('class')

        component_property_data = self.get_property(
            class_attribute=component_property_class)
        button_property_data = self.get_property(
            class_attribute=button_property_class)
        action_type = button_div.get_attribute('data-actiontype')
        button_property_data['actiontype'] = action_type
        if action_type == 'Actlink':
            data_link = button_div.get_attribute('data-link')
            data_href = button_div.get_attribute('data-href')
            button_property_data['data-link'] = data_link
            button_property_data['data-href'] = data_href
        elif action_type == 'ActflDownload':
            data_attachment = button_div.get_attribute('data-attachment')
            button_property_data['data-attachment'] = data_attachment
        elif action_type == 'ActSection':
            section_id = button_div.get_attribute('sectionid')
            button_property_data['section-id'] = section_id
        elif action_type == 'ActPopup':
            button_property_data['pop-up'] = 'not-specific'
        button_text = button_div.find_element_by_xpath('span').text

        data = {  # 'component_property':component_property_data,
            'properties': button_property_data,
            'content': button_text}
        return data

    def get_image_link_property(self, image_link_obj):
        data = {}
        component_property_data = {}
        image_property_data = {}
        component_property_class = image_link_obj.get_attribute('class')
        image_link_div = image_link_obj.find_element_by_xpath('a')
        image_link_property_class = image_link_div.get_attribute('class')
        link_type = image_link_div.get_attribute('data-link')

        component_property_data = self.get_property(
            class_attribute=component_property_class)
        image_link_property_data = self.get_property(
            class_attribute=image_link_property_class)
        image_link_property_data.update(dict(image_link_div.size))
        image_link_property_data['link_type'] = link_type
        image_link_property_data['redirect_link'] = image_link_div.get_attribute(
            'href')

        image = image_link_div.find_element_by_xpath('img')
        image_link = image.get_attribute('src')

        data = {  # 'component_property':component_property_data,
            'properties': image_link_property_data,
            'content': image_link}
        return data

    def get_text_link_property(self, text_link_obj):

        data = {}
        component_property_data = {}
        text_property_data = {}
        component_property_class = text_link_obj.get_attribute('class')
        text_link_div = text_link_obj.find_element_by_xpath('div/a')
        text_link_property_class = text_link_div.get_attribute('class')
        link_type = text_link_div.get_attribute('data-link')

        component_property_data = self.get_property(
            class_attribute=component_property_class)
        text_link_property_data = self.get_property(
            class_attribute=text_link_property_class)
        text_link_property_data['link_type'] = link_type

        data = {  # 'component_property':component_property_data,
            'properties': text_link_property_data,
            'content': text_link_div.get_attribute('href')}
        return data

    def get_rich_text_property(self, rich_text_obj):
        data = {}
        component_property_data = {}
        text_property_data = {}
        component_property_class = rich_text_obj.get_attribute('class')
        rich_text_div = rich_text_obj.find_element_by_xpath('div/div/div')
        rich_text_property_class = rich_text_div.get_attribute('class')
        text_font_family = rich_text_div.value_of_css_property('font-family')
        try:
            quoted = rich_text_div.find_element_by_xpath('blockquote')
            if quoted is not None:
                is_quoted = True
            else:
                is_quoted = False
        except:
            is_quoted = False
        component_property_data = self.get_property(
            class_attribute=component_property_class)
        rich_text_property_data = self.get_property(
            class_attribute=rich_text_property_class)
        rich_text_property_data['font-family'] = text_font_family
        rich_text_property_data['blockquote'] = is_quoted
        data = {  # 'component_property':component_property_data,
            'properties': rich_text_property_data,
            'content': rich_text_div.get_attribute('innerText')}
        return data

    def get_text_property(self, text_obj):

        data = {}
        component_property_data = {}
        text_property_data = {}
        component_property_class = text_obj.get_attribute('class')
        text_div = text_obj.find_element_by_xpath('p')
        text_property_class = text_div.get_attribute('class')
        component_property_data = self.get_property(
            class_attribute=component_property_class)
        text_property_data = self.get_property(
            class_attribute=text_property_class)

        data = {  # 'component_property':component_property_data,
            'properties': text_property_data,
            'content': text_div.get_attribute('innerHTML')}

        return data

    def get_heading_property(self, heading_obj):

        data = {}
        component_property_data = {}
        heading_property_data = {}
        component_property_class = heading_obj.get_attribute('class')
        heading_div = heading_obj.find_element_by_xpath('h1')
        heading_property_class = heading_div.get_attribute('class')
        component_property_data = self.get_property(
            class_attribute=component_property_class)
        heading_property_data = self.get_property(
            class_attribute=heading_property_class)

        data = {  # 'component_property':component_property_data,
            'properties': heading_property_data,
            'content': heading_div.get_attribute('innerHTML')}

        return data

    def get_image_property(self, image_obj):

        data = {}
        component_property_data = {}
        image_property_data = {}

        component_property_class = image_obj.get_attribute('class')
        image_div = image_obj.find_element_by_xpath('img')
        component_property_data = self.get_property(
            class_attribute=component_property_class)
        image_property_data = image_div.size

        data = {  # 'component_property':component_property_data,
            'properties': image_property_data,
            'content': image_div.get_attribute('src')}

        return data

    def get_underline_property(self, underline_obj):

        data = {}
        component_property_data = {}
        underline_property_data = {}

        component_property_class = underline_obj.get_attribute('class')

        underline_div = underline_obj.find_elements_by_tag_name('div')
        underline_property_class = underline_div[0].get_attribute('class')

        component_property_data = self.get_property(
            class_attribute=component_property_class)
        underline_property_data = self.get_property(
            class_attribute=underline_property_class)

        data = {  # 'component_property':component_property_data,
            'properties': underline_property_data,
            'content': 'underline'
        }
        return data
