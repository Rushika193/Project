import json
from logging import setLogRecordFactory
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from pathlib import Path
import os
from scrapper.settings import BASE_DIR
from apps.webscrapper.driver_helper.chrome_driver import ChromeDriver
from apps.webscrapper.Helper.elasticsearch import ElasticSearch
WAIT_TIME = 3
INDEX_NAME = 'live_site_data'
ES_HOST = '40.114.92.165' 
ES_PORT = '9200'

class WebsiteScrapper:

    
    def get_page_source(self,url):
        self.driver.get(url)
        self.driver.implicitly_wait(WAIT_TIME)
        return self.driver.page_source

    def get_href_links(self,html_dom):
        hrefs = []
        anchors = html_dom.find_elements_by_tag_name('a')
        hrefs = [anchor.get_attribute('href') for anchor in anchors]
        return hrefs

    def get_page_property(self,url):
        page_property = {}
        try:
            self.driver.get(url)
            page_property['page_width'] = self.driver.execute_script("return document.body.offsetWidth;")
            page_property['page_height'] = self.driver.execute_script("return document.body.offsetHeight;")
        except Exception as e:
            raise e
        return  page_property

    def get_page_rows(self,row_selector_class,page_url):
        row_selector=row_selector_class
        self.driver.get(page_url)
        row_dom = self.driver.find_elements_by_class_name(row_selector)
        return row_dom

    def get_row_columns(self,col_selector,row_obj):
        col_selector = col_selector
        col_dom = row_obj.find_elements_by_class_name(col_selector)
        return col_dom
