$.fn.createSideFilter = function (options) {
    var $this = $(this);
    $this.addClass('filterSlider filter-wrap');
    options = $.extend({
        title: 'Side Form',
        openButton: '',
        closeButton: '',
        maxwidth: '',
    }, options);
    var css = '';
    if (options.maxwidth !== '')
        css = 'max-width:' + options.maxwidth + '; ';
    var fBody = '<div class="filter-slide" style="' + css + '"><div class="filter-head">';
    fBody += '<div class="filterTitle">' + options.title + '</div>';
    fBody += '<button type="button" class="close mr-auto closeSideFilter"><i class="fas fa-times"></i></button>';
    fBody += '</div>';
    fBody += $this.html();
    fBody += '</div>';
    $this.html(fBody);
    $(options.openButton).off('click').on('click', function () {
        $this.show().addClass('active');
        $('body').addClass("Ovf-h");
        $('body').append('<div class="filter-overlay"></div>');
        $('.filter-overlay').off('click').on('click', function () {
            $this.find('.closeSideFilter').trigger('click');
        });
    });
    $this.find('.closeSideFilter').off('click').on('click', function () {
        $('.filterSlider').hide("slide", { direction: "right" }, 500);
        $this.removeClass('active');
        $('body').removeClass('Ovf-h').find('.filter-overlay').remove();
    });
    $(options.closeButton).off('click').on('click', function () {
        $this.find('.closeSideFilter').trigger('click');
    });
    $('.filterSlider input[type="text"],.filterSlider textarea').on('change', function () {
        var $this = $(this);
        if ($this.val().match(/<script[\s\S]*?>[\s\S]*?<\/script>/gi)) {
            $this.val('');
        }
    });
};


function JSONParse(str) {
    let $key = '';
    let $value = '';
    try {
        return JSON.parse(str, function (key, value) {
            if (typeof value != 'string') {
                return value;
            }
            $key = key;
            $value = value;
            return (value.substring(0, 8) == 'function') ? eval(`(${value})`) : value;
        });
    } catch (e) {
        console.error(`Error occured while JSON parsing. key: ${$key}, value: ${$value} ,error message: ${e}`);
    }
}
function JSONStringify(componentValue) {
    let $key = '';
    let $value = '';
    try {
        return JSON.stringify(componentValue, function (key, value) {
            $key = key;
            $value = value;
            return (typeof value === 'function') ? value.toString() : value;
        });
    } catch (e) {
        WriteLog(`Error occured while JSON parsing. key: ${$key}, value: ${$value} ,error message: ${e}`);
    }
}

function DOMCreateStart(tag, className, id, extra) {
    var returnDOM = '';
    if (tag !== undefined) {
        returnDOM += '<' + tag;
        if (className !== undefined && className.length > 0) {
            returnDOM += ' class="' + className + '"';
        }
        if (id !== undefined && id.length > 0) {
            returnDOM += ' id="' + id + '" ';
        }

        if (extra !== undefined && extra.length > 0) {
            var extraLength = extra.length;
            var dType = '';
            for (var extraItem = 0; extraItem < extraLength; extraItem += 1) {
                dType += ' ' + extra[extraItem];
            }
            returnDOM += dType;
        }
        returnDOM += '>';
    }
    return returnDOM;
}
function DOMCreateEnd(tag) {
    return '</' + tag + '>';
}
function DOMCreate(tag, appendData, className, id, extra) {
    return DOMCreateStart(tag, className, id, extra) + appendData + DOMCreateEnd(tag);
}
function DivCreate(className, id, datatype, style) {
    return DOMCreateStart('div', className, id, datatype, style);
}
function divStart(divClass) {
    return '<div class="' + divClass + '">';
}
function FieldRowDOMCreate(data) {
    return '<div class="field-row">' + data + '</div>';
}
function GetToggleSwitchDom(label, id) {
    return `<div class="field-row stElWrap col50-50"><label class="fCol">${label}</label>
           <div class="fCol TxAl-r"><span class="toggle_btn">
           <input  type="checkbox" id="${id}">
           <label for="${id}" class="tgl_slider"></label>
           </span></div></div>`;
}
function GetSelectDOM(id, label, options) {
    let html = `<div class="field-row stElWrap col50-50">
                            <label class="fCol">${label}</label >
                            <span class="fCol TxAl-r select__box">
                            <select id="${id}">`;
    $.each(options, function (i, v) {
        if (typeof v.attrs == 'undefined') {
            v.attrs = '';
        }
        html += '<option ' + v.attrs + ' value="' + v.val + '">' + v.text + '</option>';
    });
    html += '</select></span></div>';
    return html;
}
function FullPagePopup(fullpageOption) {
    //WBPopup.init(fullpageOption);
    $('.fullpagepopupWrapper').remove();
    let option = {
        heading: "popup header title",
        data: "no data",
        showheading: true,
        width: "80%",
        height: "80%",
        advance: false,
        onappend: function ($wrapper) {
        },
        onclose: function ($wrapper) {
        }
    };
    option = $.extend(option, fullpageOption);
    let classes = {
        'header': 'fullpage-popup-header',
        'title': 'fullpage-popup-title',
        'body': 'fullpage-popup-model-body',
        'innerwrapper': 'fullpagepopup',
    };
    if (typeof option.advance !== "undefined" && option.advance) {
        classes = {
            'header': 'popupfullpage_model_header',
            'title': 'header_title',
            'body': 'popupfullpage_model_body',
            'innerwrapper': 'fullpagepopup',
        };
    }
    option.classes = classes;
    let fullpageHeader = '';
    if (option.showheading) {
        fullpageHeader = DOMCreate('div', DOMCreate('span', option.heading, option.classes.title + ' txC') + DOMCreate('span', '<i class="fa fa-times"></i>', ' f-right fullpage-close-model'), option.classes.header, 'fullpagePopup');
    }
    //var body = DOMCreate('div', '', 'scrollbar') + DOMCreate('div', option.data, option.classes.body + ' scrollable__child');
    let body = DOMCreate('div', option.data, option.classes.body);
    //body = DOMCreate('div', body);
    let fullpagPopup = DOMCreate('div', fullpageHeader + body, option.classes.innerwrapper, '', ['style="width:' + option.width + ';max-height:' + option.height + '"']);
    fullpagPopup = DOMCreate('div', fullpagPopup, 'v-align');
    fullpagPopup = DOMCreate('div', fullpagPopup, 'fullpagepopupWrapper');
    $('body').append(fullpagPopup);
    if (typeof (option.onappend) === "function") {
        option.onappend($('.fullpagepopupWrapper'));
    }
    $('.fullpage-close-model').on('click', function () {
        $('.fullpagepopupWrapper').remove();
        if (typeof option.onclose === "function") {
            option.onclose($('.fullpagepopupWrapper'));
        }
    });
    $('#divComponentPanel , #popupModel').hide();
}
function CloseFullPagePopup() {
    $('.fullpage-close-model').trigger('click');
}

function ScreenDimension() {
    let myWidth = 0, myHeight = 0;
    if (typeof (window.innerWidth) == 'number') {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }
    return { "height": myHeight, "width": myWidth };
}

String.prototype.replaceAll = function (search, replacement) {
    return this.replace(new RegExp(search, 'g'), replacement);
};
String.prototype.removeScript = function () {
    return this.replaceAll('<[^>]*>', '');
};

let $activeDOM;
let EmailBasicFonts = [
    { val: 'arial', text: 'arial' },
    { val: 'helvetica', text: 'helvetica' },
    { val: 'georgia', text: 'georgia' },
    { val: 'times new roman', text: 'times new roman' },
    { val: 'courier New', text: 'courier New' },
    { val: 'verdana', text: 'verdana' }];
let ComponentHelper = {
    popUpSetting: function (title, componentType, type, $parentRow, $this) {
        let $popUpModel = $('#popupModel');

        $popUpModel.find('.pTitle').text(title + ' properties');
        $('#popupModel .popup-model-body').html('<p>There is no setting</p>');
        $popUpModel.fadeIn(400);
        if (typeof (mailcomponent[componentType][type]) !== 'undefined') {
            this.createComponentSetting(mailcomponent[componentType][type], type, $this);
        }
        /* remove the tab there is only one */
        let tabs = $popUpModel.find('#SettingTabs').find('li').length;
        if (tabs == 1) {
            $popUpModel.find('#SettingTabs').find('li').remove();
        }
        $('.SetHdlr').removeClass('active');
        $popUpModel.find('.collapse').off('click').on('click', function () {
            $popUpModel.fadeOut(400);
            $('.actEle').removeClass('actEle');
        });
        let scrn = ScreenDimension();
        let left = scrn.width - $popUpModel.width() - 50;
        $popUpModel.css({ 'left': left, 'top': '56px' });
    },
    createComponentSetting: function (objSettings, SettingName, $this) {
        let settingDOM = '';

        if (typeof (objSettings.tabs) !== undefined) {
            let $tabComponent = objSettings.tabs;
            let tabKeys = Object.keys($tabComponent);
            let tabLength = tabKeys.length;
            let tabs = '';
            let tabData = '';
            for (var j = 0; j < tabLength; j += 1) {
                let $tabCompo = tabKeys[j];
                let tab = 'settingtab' + (j + 1);
                let showTab = true;
                if (typeof ($tabComponent[$tabCompo].show) !== "undefined") {
                    showTab = $tabComponent[$tabCompo].show;
                }
                if (showTab === true) {
                    tabs += DOMCreate('li', $tabCompo, '', '', ['data-tabs="' + tab + '"']);
                }
                let appendData = '';

                if (typeof ($tabComponent[$tabCompo].DOM) !== 'undefined') {
                    appendData = $tabComponent[$tabCompo].DOM;
                } else {
                    console.log($tabCompo + 'DOM is missing');
                }
                if (j === 0) {
                    tabData += DOMCreate('div', appendData, 'tabcontent scroll__parent', tab);
                }
                else {
                    tabData += DOMCreate('div', appendData, 'tabcontent scroll__parent', tab, ['style="display: none;"']);
                }

                let settingDOM = DOMCreate('ul', tabs, 'settingTabs', 'SettingTabs');
                settingDOM += DOMCreate('div', tabData, 'tabsWrapper');
                settingDOM = DOMCreate('div', settingDOM, '', 'SettingtabsWrp');
                $('#popupModel .popup-model-body').html(settingDOM);
                //Scroller();
                $('#SettingTabs').attr("data-settingtype", SettingName);

                $('#SettingTabs li').off('click').on('click', function () {
                    $('#SettingTabs li').removeClass('active');
                    $thisLi = $(this);
                    $thisLi.addClass('active');
                    $('.tabcontent').hide();
                    $('#' + $thisLi.attr('data-tabs')).show();
                    if (typeof $tabComponent[$thisLi.text()].active === 'function') {
                        $tabComponent[$thisLi.text()].active();
                    }

                });

            }
            for (var k = 0; k < tabLength; k += 1) {
                let $tabCompo = tabKeys[k];
                if (typeof ($tabComponent[$tabCompo].onload) === 'function') {
                    $tabComponent[$tabCompo].onload($this);
                }
            }
            $('#SettingTabs li').eq(0).trigger('click');
        }
    },

    checkRowExists: function () {
        if ($('.rowCompAceptor .rowComp').length == 0) {
            let htmls = `<tr style="width: 100%;" class="empty-editor noElement">
                        <td style="width: 100%;">
                           <div class="empty-ele">
                             <span class="empty"></span>
                             <h4>Drag &amp; drop a row here</h4>
                           </div>
                          </td>
                        </tr>`;
            $('.rowCompAceptor').html(htmls);
            if ($('.layout.components-list.activeAccordion').length == 0) {
                $('.layout.components-list h4').trigger('click');
                $('.comItemBlock.rowBasic').addClass('heartBeat');
            }
        }
    },
    bindComponentEvents: function ($parent) {
        this.bindSettingEvents($parent);
    },
    bindSettingEvents: function ($elem) {

        let $comsettings = $('.com-settings');
        let $settingStyle = $('.s-style');
        let $imagesettings = $('.image-settings');
        let $duplicateHolder = $('.duplicateHolder');
        let $settingList = $('.SetHdlr > .stng >.cb-stng');
        let $deleteHelper = $('.deletehelper');
        if (typeof $elem !== "undefined") {
            $comsettings = $elem.find('.com-settings');
            $comStyle = $elem.find('.com-style');
            $settingStyle = $elem.find('.s-style');
            $imagesettings = $elem.find('.image-settings');
            $duplicateHolder = $elem.find('.duplicateHolder');
            $settingList = $elem.find('.SetHdlr > .stng >.cb-stng');
            $deleteHelper = $elem.find('.deletehelper');

            if (EasyLibrary.IsDefined(mailcomponent[$elem.attr('data-type')])) {
                if (
                    mailcomponent[$elem.attr('data-type')].eventlistner == "function") {
                    mailcomponent[$elem.attr('data-type')].eventlistner($elem);
                }
            }
        }

        $deleteHelper.off('click').on('click', function () {
            $('.activeSetting').removeClass('activeSetting');
            let $parent = $(this).closest('.mComponent');
            $parent.addClass('activeSetting');
            $activeDOM = $parent;
            let compName = $parent.attr('data-type');
            SageConfirmDialog('Are you sure to delete?').done(function () {

                if (compName == 'column') {
                    $parent.find('.colCompAceptor').html('<div class="empty-col"><h4>This is column</h4><span> drag component here.</span></div>');
                } else {
                    $parent.remove();
                    if (compName == 'row') {
                        ComponentHelper.checkRowExists();
                    }
                }

            });

        });
        $comsettings.off().on('click', function () {
            let $this = $(this);
            $('.activeSetting').removeClass('.activeSetting');
            let $parent = $this.closest('.mComponent');
            if ($this.attr('data-type') == 'mail body') {
                $parent = $('.MtEditorArea .mailTemplateBody');
            }
            $parent.addClass('activeSetting');
            $activeDOM = $parent;
            let componentType = $parent.attr('data-type');
            if (EasyLibrary.IsDefined(mailcomponent[componentType]) && EasyLibrary.IsDefined(mailcomponent[componentType].inherits)) {
                componentType = mailcomponent[componentType].inherits;
            }
            let title = componentType;
            if (EasyLibrary.IsDefined($this.attr('data-title'))) {
                title = $this.attr('data-title');
            }
            let type = "settingDOMs";
            ComponentHelper.popUpSetting(title, componentType, type, $parent, $this);
        });
        $settingStyle.off().on('click', function () {
            let $this = $(this);
            $('.activeSetting').removeClass('activeSetting');
            let $parent = $this.closest('.mComponent');
            if ($this.attr('data-type') == 'mail body') {
                $parent = $('.MtEditorArea .mailTemplateBody');
            }
            $parent.addClass('activeSetting');
            $activeDOM = $parent;
            let componentType = $parent.attr('data-type');
            let type = "styleDOMs";
            let title = componentType;
            if (EasyLibrary.IsDefined($this.attr('data-title'))) {
                title = $this.attr('data-title');
            }
            ComponentHelper.popUpSetting(title, componentType, type, $parent, $this);

        });
        $imagesettings.off().on('click', function () {
            let $image = $(this).closest('.mComponent').find('img');
            $(this).SageMedia({
                userModuleID: MailEditorUserModuleID,
                onSelect: function (src, response, type, filename, extension) {
                },
                mediaType: 'image',
                success: function (resposne) {
                    $image.attr('src', SageFrameHostURL + resposne.filePath).attr('alt', resposne.alt);
                }
            });
        });
        $settingList.off().on('click', function () {
            $('.activeSetting').removeClass('activeSetting');
            var $this = $(this);
            let $parent = $this.closest('.mComponent');
            $parent.addClass('activeSetting');
            $activeDOM = $parent;
            $('#divComponentPanel, #popupModel').hide();
            let $setLst = $(this).parent().parent();
            if ($setLst.hasClass('active')) {
                $setLst.removeClass('active');
                // $setLst.find('.setDrp').hide();
            }
            else {
                $('.SetHdlr').removeClass('active');
                $setLst.addClass('active');
                // $('.setDrp').hide();
                //$setLst.find('.setDrp').show();
            }
        });
        $('.SetHdlr >.moveUp').off().on('click', function () {
            let $child = $(this).parents('.rowComp');
            let total = $('.rowCompAceptor  > .cRow').length;
            let index = $('.rowCompAceptor  > .cRow').index($child);
            if (index > 0 && index < total) {
                $child.insertBefore($child.prev()).animate({}, 5000);
            }
        });
        $('.SetHdlr >.moveDown').off().on('click', function () {
            let $child = $(this).closest('.rowComp');
            let total = $('.rowCompAceptor  > .rowComp').length;
            let index = $('.rowCompAceptor  > .rowComp').index($child);
            if (index => 0 && index < total) {
                $child.insertAfter($child.next()).animate({}, 5000);
            }
        });
    },
    appendComponent: function (dataType, $this, ui, isRow) {
        let appendDOM = '';

        if (typeof (mailcomponent[dataType].defaultdata) !== 'undefined') {
            appendDOM = mailcomponent[dataType].defaultdata;
        }
        let $appendLayer = $(appendDOM);
        let $appendedParent = $this;
        //let $shadedLayer = $this.find(' > .editor-row-shaded-layer');
        //if (typeof ($shadedLayer) === 'undefined' || $shadedLayer.length == 0) {
        //}
        //else {
        //    $appendedParent = $shadedLayer;
        //}
        /*beforedrop callbackfunction*/
        if (typeof (mailcomponent[dataType].beforedrop) === 'function') {
            mailcomponent[dataType].beforedrop($appendedParent, $appendLayer, true);
        }
        if (isRow) {
            $(".noElement").remove();
            if ($this.find(".noElement").length > 0) /*add first element when cart is empty*/ {
                $('.rowBasic').removeClass('heartBeat');
                $('.rowCompAceptor').append($appendLayer);
            } else {
                if (typeof ui !== 'undefined') {
                    let i = 0;
                    $this.find('.rowComp').each(function () {
                        if ($(this).offset().top >= ui.offset.top) {
                            $appendLayer.insertBefore($(this));
                            i = 1;
                            return false;
                        }
                    });
                    if (i !== 1) {
                        $('.rowCompAceptor').append($appendLayer);
                    }
                }

            }
        } else {
            if ($this.find(">.empty-col").length > 0) /*add first element when cart is empty*/ {
                $this.find(">.empty-col").remove();
                $appendedParent.append($appendLayer);
            } else {
                let i = 0; /*used as flag to find out if element added or not*/
                $appendedParent.children('.mail-component').each(function () {
                    if ($(this).offset().top >= ui.offset.top) {
                        $appendLayer.insertBefore($(this));
                        i = 1;
                        return false;
                    }
                });
                if (i !== 1) /*if element dropped at the end of cart*/ {
                    $appendedParent.append($appendLayer);
                }
            }
        }
        ComponentHelper.bindComponentEvents($appendLayer);
        ComponentHelper.draggableSortableEvents();

        /*afterDrop callbackfunction*/
        if (typeof (mailcomponent[dataType].afterdrop) === 'function') {
            mailcomponent[dataType].afterdrop($appendedParent, $appendLayer, true);
        }
        if (typeof (mailcomponent[dataType].eventlistner) === 'function') {
            mailcomponent[dataType].eventlistner($appendLayer);
        }


    },
    draggableSortableEvents: function () {

        $(".colCompAceptor").sortable({
            revert: 0,
            delay: 150,
            items: '.mComponent',
            cancel: '.col-options',
            handle: ".sortComponent",
            helper: function () {
                return $('<div class="comhelperBox" style="height:40px;width:100px;"></div>');
            },
            connectWith: '.colCompAceptor',
            cursorAt: { left: 5, top: 5 },
            placeholder: 'ui-state-com-sortable-hover ui-hover-state',
            stop: function (event, ui) {
                let dataType = $(ui.item[0]).find('> .SetHdlr').find('.com-settings').attr('data-type');
                if (dataType !== "undefined") {
                    if (typeof mailcomponent[dataType].onsort === "function") {
                        mailcomponent[dataType].onsort($(ui.item[0]));
                    }
                }
            },
            receive: function (event, ui) {
                $(this).find(".empty-col").remove();
            }
        }).droppable({
            accept: ".comBasic",
            greedy: true,
            tolerance: 'pointer',
            hoverClass: "ui-state-com-droppable-hover ui-hover-state",
            drop: function (event, ui) {
                let $this = $(this);
                let item = $(ui.draggable);
                let dataType = item.attr('data-type');
                ComponentHelper.appendComponent(dataType, $this, ui, false);
            },
            over: function (event, ui) {


            },
            out: function (event, ui) {
            }
        });
        let i = 0;
        $(".rowCompAceptor").sortable({
            revert: true,
            items: '.rowComp',
            handle: '.drag',
            cursorAt: { left: 5, top: 5 },
            helper: function (event, ui) {
                return $('<div class="rowhelperBox" style="height:40px;width:100%;"></div>');
            },
            placeholder: 'ui-state-sortablerow-hover ui-hover-state',
            containment: '.MtEditorArea',
            stop: function (event, ui) {
                $('.rowhelperBox').remove();
            }
        }).droppable({
            accept: ".rowBasic",
            greedy: true,
            hoverClass: "ui-state-row-hover ui-hover-state",
            drop: function (event, ui) {
                let $this = $(this);
                let item = $(ui.draggable);
                let dataType = item.attr('data-type');
                ComponentHelper.appendComponent(dataType, $this, ui, true);
            }
        });
        $(".comBasic").draggable({
            helper: "clone",
            revert: true,
            cursor: 'pointer',
            connectWith: '.colCompAceptor',
            containment: '.mt-maincontainer',
            start: function (event, ui) {

            }
        });
        $(".rowBasic").draggable({
            helper: "clone",
            revert: true,
            cursor: 'pointer',
            connectWith: '.rowCompAceptor',
            containment: '.mt-maincontainer',
            start: function (event, ui) {

            },

        });

    }
};
let EasyLibrary = {
    IsDefined: function (item) {
        if (typeof item !== 'undefined') {
            return true;
        } else {
            return false;
        }
    },
    ReadDOM: function (fileName, Cache) {
        var oRequest = new XMLHttpRequest();
        try {
            var URL = '';
            if (typeof Cache == 'undefined' || Cache) {
                URL = `${SageFrameHostURL + ComposerModulePath}components/html/${fileName}.html`;
            } else {
                URL = `${SageFrameHostURL + ComposerModulePath}components/html/${fileName}.html?t=${Math.random() * 100}`;
            }
            URL = URL.replaceAll(' ', '');
            oRequest.open("GET", URL, false);
            //oRequest.setRequestHeader("User-Agent", navigator.userAgent);
            oRequest.send(null);
        }
        catch (message) {

        }
        if (oRequest.status == 200) {
            return this.RemoveSpaceFromDOM(oRequest.responseText);
        } else {
            console.error("Error executing XMLHttpRequest call!");
        }
    },
    RemoveSpaceFromDOM: function (data) {
        if (data != null) {
            return data.replace(/\>\s+\</g, '><').trim();//.replace(/(\r\n|\n|\r)/gm, "").trim();
        }
    }
};
let EmailEditorsHelper;
(function ($) {
    if (EasyLibrary.IsDefined(EmailBasicToken) && EmailBasicToken != null) {
        EmailBasicToken.HostURL.SampleValue = SageFrameHostURL;
    }
    $.CreateMailEdior = function ($this, op) {
        let options = $.extend({
            IsDevelopmentMode: 'false',
        }, op);
        var MailTemplate = {
            init: function () {
                if (typeof MailEditorUserModuleID == 'undefined') {
                    alert("UsermoduleID for editor is needed.Write a code let MailEditorUserModuleID='<%=SageUserModuleID %>' in your modules script.");
                }
                if (options.IsDevelopmentMode.toLowerCase() == 'true') {
                    $.extend(mailcomponent, extendedMailComps);

                    $.each(mailcomponent, function (i, v) {
                        let Name = v.componentname;
                        if (UpdateMailComponent.indexOf(Name) >= 0) {
                            MailTemplate.updateComponent(Name, v);
                            console.log('updated ' + Name + ' component');
                        }
                    });
                }
                this.createCompTools();
                ComponentHelper.checkRowExists();
                ComponentHelper.bindSettingEvents();
            },
            createCompTools: function () {
                let componentList = Object.keys(mailcomponent);
                let componentListLen = componentList.length;
                let $componentList = $('#MailCompCollection > .components-list-array');
                //create basic at first
                $componentList.append(getCompAcordianDOM('basic', 'basic'));
                for (var i = 0; i < componentListLen; i += 1) {
                    let $compo = mailcomponent[componentList[i]];
                    if (!$compo.hidden) {
                        let comName = $compo.componentname;
                        let iconClass = $compo.icon;
                        let compCls = '';
                        if (typeof $compo.row !== 'undefined' && $compo.row) {
                            compCls = 'rowBasic';
                        } else {
                            compCls = 'comBasic';
                        }
                        let compo = getCompItemDOM(iconClass, comName, compCls, $compo.info);
                        let compCat = $compo.category;
                        let clsAccor = compCat.replaceAll(' ', '-').toLowerCase();
                        if ($componentList.find('> .' + clsAccor).length == 0) {
                            let accor = getCompAcordianDOM(compCat, clsAccor);
                            $componentList.append(accor);
                        }
                        $componentList.find('> .' + clsAccor).find('.comItems').append(compo);
                    }

                }
                function getCompItemDOM(iconClass, name, rowClass, info) {
                    let infoDom = '';
                    if (typeof info !== 'undefined' && info.length > 0) {
                        infoDom = `<span class="compInfo">${info}</span>`;
                    }
                    return `<span class="comItemBlock ${rowClass}" draggable="true"  data-type="${name}"><i class="compIcon ${iconClass}"></i><br/>${name + infoDom}</span>`;
                }
                function getCompAcordianDOM(Category, cls) {
                    return `<div class="${cls} components-list"><h4>${Category} Components</h4><div class="comItems" style="display: grid;"></div>`;
                }

                this.toolsEvent();
                ComponentHelper.draggableSortableEvents();
            },
            toolsEvent: function () {
                $('.comItems').hide();
                $('.components-list-array h4').on('click', function () {
                    let $this = $(this);
                    if (!$this.parent().hasClass('activeAccordion')) {
                        $('.components-list').removeClass('activeAccordion');
                        $('.comItems').slideUp(400);
                        $this.next().slideDown(400);
                        $this.parent().addClass('activeAccordion');
                    }
                    else {
                        $this.parent().removeClass('activeAccordion');
                        $this.next().slideUp(400);
                    }
                });
                $('.components-list-array h4').eq(0).trigger('click');
                $('#divComponentPanel .icClose').off('click').on('click', function () {
                    $('#divComponentPanel').hide(100);
                });
                $('.expand-compo-btn').off('click').on('click', function () {
                    $('#divComponentPanel').show(100);
                    $('.collapse').trigger('click');
                });
                $('body>form').addClass('mt-maincontainer');
                $('.setting__panel').draggable({
                    containment: '.mt-maincontainer',
                    handle: '.dragComponentSettings',
                    start: function (e, ui) {
                        $(ui.helper).css({
                            "position": "fixed"
                        });
                    },
                    stop: function (event, ui) {
                        //AutoAlignDragger(ui.helper);
                    }
                });
                $('#refreshComSearch').on('click', function () {
                    $('#componentSearch').val('');
                    RecycleSearch();
                });
                $('#componentSearch').on('keyup', function () {
                    let searchVal = $(this).val().trim();
                    if (searchVal.length == 0) {
                        RecycleSearch();
                    }
                    else {
                        $('.components-list div').slideDown(400);
                        $('.comItemBlock').each(function () {
                            let $this = $(this);
                            let name = $this.text().toLowerCase();
                            let pos = name.indexOf(searchVal.toLowerCase());
                            if (pos < 0) {
                                $this.hide();
                            }
                            else {
                                $this.show();
                            }
                        });
                    }
                });
                function RecycleSearch() {
                    $('.components-list').not('.activeAccordion').find('div').slideUp(400);
                    $('.comItemBlock').each(function () {
                        $(this).show();
                    });
                }
            },

            updateComponent: function (componentName, compValue) {
                compValue = JSONStringify(compValue);
                $.ajax({
                    async: false,
                    cache: false,
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        ComponentName: componentName,
                        ComponentValue: compValue
                    }),
                    dataType: 'json',
                    url: SageFrameAppPath + '/Modules/WBMailTemplate/services/MailTemplate.asmx/AddUpdateComponent',
                    success: function () {
                    },
                    error: function (msg) {
                        console.error('Error While Updating Component to db');
                    },
                });
            }
        };
        MailTemplate.init();
        EmailEditorsHelper = {
            TokensArr: [],
            GetData: function () {
                let Data = {
                    EditorDOM: '',
                    ViewDOM: '',
                };
                let $EditDOM = $('#divMailTemplateEditors');
                $EditDOM.find('table,tr').css('box-sizing', 'border-box');
                $EditDOM.find('table').css('border-spacing', '0px');
                $EditDOM.find('.SetHdlr.active').removeClass('active');
                $EditDOM.find('img').each(function (i, v) {
                    let $img = $(this);
                    let src = $img.attr('src');
                    if (!src.includes("http")) {
                        src = SageFrameHostURL + src;
                    }
                    $img.attr('src', src);
                });

                Data.EditorDOM = $EditDOM.html().replace(/\>\s+\</g, '><').trim();
                Data.EditorDOM = Data.EditorDOM.replaceAll(SageFrameHostURL, EmailBasicToken.HostURL.Token);
                let $ViewDOM = $('#divMailComposerViewTemp');
                $ViewDOM.html(Data.EditorDOM);

                if ($ViewDOM.find('.colCompAceptor .mComponent').length > 0) {
                    $($ViewDOM).find('.mComponent').each(function () {
                        let dataType = $(this).attr('data-type');
                        if (typeof mailcomponent[dataType] !== 'undefined' && typeof (mailcomponent[dataType].remove) === 'function') {
                            mailcomponent[dataType].remove($ViewDOM);
                        }
                    });
                    $ViewDOM.find('.SetHdlr').remove();
                    $ViewDOM.find('.empty-col').remove();
                    $ViewDOM.find('*[contenteditable]').removeAttr('contenteditable');
                    $ViewDOM.find('.mailTemplateBody').removeAttr('class').removeAttr('data-type').addClass('mailTemplateBody');
                    $ViewDOM.find('.mailTemplateBody').find('*').removeAttr('class').removeAttr('data-type');
                    Data.ViewDOM = $ViewDOM.html().replace(/\>\s+\</g, '><').trim();
                    Data.ViewDOM = Data.ViewDOM.replaceAll(SageFrameHostURL, EmailBasicToken.HostURL.Token);
                }
                $ViewDOM.html('');
                return Data;
            },
            SetEditData: function ($EditDOM) {
                $EditDOM = $EditDOM.replaceAll(EmailBasicToken.HostURL.Token, EmailBasicToken.HostURL.SampleValue);
                $('#divMailTemplateEditors').html($EditDOM);
                ComponentHelper.bindSettingEvents();
                ComponentHelper.draggableSortableEvents();
                $('#divMailTemplateEditors .mComponent').each(function () {
                    let $this = $(this);
                    let dataType = $this.attr('data-type');
                    if (typeof mailcomponent[dataType] !== 'undefined') {
                        if (typeof (mailcomponent[dataType].onload) === 'function') {
                            mailcomponent[dataType].onload($this);
                        } else if (typeof (mailcomponent[dataType].afterdrop) == 'function') {
                            mailcomponent[dataType].afterdrop($this, $this, false);
                        }
                        if (typeof mailcomponent[dataType].eventlistner === "function") {
                            mailcomponent[dataType].eventlistner($this);
                        }
                    }
                });
                ComponentHelper.checkRowExists();
            },
            ClearEditor: function () {
                $('#divMailTemplateEditors .mailTemplateBody').removeAttr('style').css({ 'width': '100%', 'max-width': '650px', 'margin': '0 auto' });
                $('#divMailTemplateEditors').find('.rowComp').remove();
                ComponentHelper.checkRowExists();
            },
            ReplaceTokenBySample: function (body) {
                let tokens = this.TokensArr;
                if (tokens.length == 0) {
                    tokens = Object.keys(EmailBasicToken);
                }

                $.each(tokens, function (i, v) {
                    let tkn = EmailBasicToken[v];
                    body = body.replaceAll(tkn.Token + '[_]{0,1}[0-9]*', tkn.SampleValue);
                });
                //let $TempDom = $('#divMailComposerViewTemp');
                //$TempDom.html(body);
                //$TempDom.find('.mComponent').each(function () {
                //    let compName = $(this).attr('data-type');
                //    if (EasyLibrary.IsDefined(mailcomponent[compName])) {
                //        if (typeof mailcomponent[compName].replaceTokenBySample == 'function')
                //            mailcomponent[compName].replaceTokenBySample($TempDom);
                //    }
                //});
                return body;
            },
            /** preview your email html inside iframe in popup*/
            PreviewTemplate: function (html, title) {
                let $PseudoDOM = $('<div/>');
                $PseudoDOM.html(html).find('a').attr('href', 'javascript:void(0);');
                html = $PseudoDOM.html();
                FullPagePopup({
                    data: '<div id="divTemplatePreview" class="tempPrevWrp" ></div>',
                    heading: title,
                    showheading: true,
                    width: "70%",
                    height: "70%",
                    onclose: function () {
                    },
                    onappend: function ($parent) {
                        $parent.addClass('templatePreview');
                        var iframe = document.createElement('iframe');
                        var htmls = '<body>' + html + '</body>';
                        iframe.srcdoc = html;
                        // iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html);
                        $('#divTemplatePreview').html(iframe);

                    }
                });
            }
        };
    };
    $.fn.CreateMailComposer = function (op) {
        $.CreateMailEdior($(this), op);
    };

})(jQuery);