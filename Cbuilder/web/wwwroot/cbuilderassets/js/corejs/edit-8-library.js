/***********DOM Creation Generic methods END************/
var EasyLibrary = {
    ReadDOM: function (fileName, Cache) {
        var oRequest = new XMLHttpRequest();
        try {
            var URL = '';
            if (typeof Cache == 'undefined' || Cache)
                URL = `${SageFrameHostURL}/cbuilderassets/js/html/${fileName}.html`;
            else
                URL = `${SageFrameHostURL}/cbuilderassets/js/html/${fileName}.html?t=` + Math.random();
            oRequest.open("GET", URL, false);
            //oRequest.setRequestHeader("User-Agent", navigator.userAgent);
            oRequest.send(null);
        } catch (message) { }
        if (oRequest.status == 200)
            return this.RemoveSpaceFromDOM(oRequest.responseText);
        else
            console.error("Error executing XMLHttpRequest call!");
    },
    GetAdminURL: function () {
        return "https://easybuilder.contentder.com/";
    },
    PageListDOM: function () {
        return this.RemoveSpaceFromDOM($('#innerPageList').html());
    },
    RemoveSpaceFromDOM: function (data) {
        if (data != null) {
            return data.replace(/\>\s+\</g, '><').trim(); //.replace(/(\r\n|\n|\r)/gm, "").trim();
        }
    },
    FontCollectionList: function () {
        return this.RemoveSpaceFromDOM($('ul#fontIconCollection').html());
    },
    /*
    
    */
    DefaultImage1: function () {
        return `<img  src="${webbuildermodulepath}/img/def1.jpg" />`;
    },
    DefaultImages: function () {
        return ["def1.jpg", "def2.jpg", "def3.jpg", "def4jpg", "def5.jpg",];
    },
    NoScreenshot: function () {
        return `<img  src="${webbuildermodulepath}/img/def1.jpg" />`;
    },
    NoScreenshotImagePath: function () {
        return `${webbuildermodulepath}/img/noscreenshot.jpg`;
    },
    IsDefined: function (data) {
        if (typeof data === "undefined")
            return false;
        else
            return true;
    },
    IsUndefined: function (data) {
        if (typeof data === "undefined")
            return true;
        else
            return false;
    },
    GetPageArray: function () {
        var pages = [];
        $('#innerPageList li').each(function () {
            var $this = $(this);
            pages.push({
                'id': $this.attr('data-pageid'),
                'name': $this.find('span').text().trim()
            });
        });
        return pages;
    },
    GetDashboardPageArray: function () {
        var pages = [];
        $('#dashboardPageList li').each(function () {
            var $this = $(this);
            pages.push({
                'id': $this.attr('data-pageid'),
                'name': $this.find('span').text().trim()
            });
        });
        return pages;
    },
    GetPageOption: function () {
        var option = '';
        $('#innerPageList li').each(function () {
            var $this = $(this);
            option += '<option value="' + $this.attr('data-pageid') + '">' + $this.find('span').text().trim() + '</option>';
        });
        return option;
    },
    GetDasboardPageOption: function () {
        var option = '';
        $('#dashboardPageList li').each(function () {
            var $this = $(this);
            option += '<option data-dashboard="true" value="' + $this.attr('data-pageid') + '">' + $this.find('span').text().trim() + '</option>';
        });
        return option;
    },
    NumberCounter: function (itemCounter, minValue, maxValue, stepSize, defaultCount, callBackContainer, callBack) {
        let counter = `<i data-min=${minValue} id="numCounterReducer" class="fa fa-chevron-left"></i>
                           <span id="numCounterTotal" class ="f-weight-600 editor-com-innerSpacing-left-5 editor-com-innerSpacing-right-5">${defaultCount}</span>
                        <i data-max=${maxValue} id="numCounterIncreaser" class ="fa fa-chevron-right"></i>`;
        itemCounter.append(counter);
        var reducer = itemCounter.find('#numCounterReducer');
        var increaser = itemCounter.find('#numCounterIncreaser');
        var totalCounter = itemCounter.find('#numCounterTotal');

        totalCounter.text(defaultCount);

        reducer.on('click', function () {
            var minValue = $(this).attr('data-min');
            var currentTotal = totalCounter.text();
            var count = parseInt(currentTotal);
            var newCount = count - stepSize;
            if (newCount >= parseInt(minValue)) {
                ReflectCounter(newCount);
            }
        });


        increaser.on('click', function () {
            var maxValue = $(this).attr('data-max');
            var currentTotal = totalCounter.text();
            var count = parseInt(currentTotal);
            var newCount = count + stepSize;
            if (newCount <= parseInt(maxValue)) {
                ReflectCounter(newCount);
            }
        });

        function ReflectCounter(newCount) {
            totalCounter.text(newCount);
            callBack(newCount, callBackContainer);
        }
    },
    GetSettings: function () {
        var $body = $('.site-body');
        var tempSettings = $body.attr('data-settings');
        if (typeof (tempSettings) !== 'undefined' && tempSettings.length > 0) {
            tempSettings = JSON.parse(tempSettings);
            //set the settings
            $body.addClass(tempSettings.defaultLayout);
            $body.addClass('ff-' + tempSettings.defaultFontFamily);
            $body.addClass('f-weight-400');
            $body.addClass(tempSettings.SiteHeaderEffect);
            $('.editor-box').attr('style', tempSettings.body.style);
            $body.addClass(tempSettings.temporaryWidth);
            $('.editor-box').attrs(tempSettings.body);
            $('.editor-box').addClass('main-container');
            if (typeof (tempSettings.shadedLayer) !== "undefined" && tempSettings.shadedLayer !== null) {
                var shadedDiv = divStart('editor-row-shaded-layer') + divEnd;
                var appendElem = $('.editor-box').children();
                $('.editor-box').append(shadedDiv);
                $('.editor-box').find(' > .editor-row-shaded-layer').append(appendElem).attrs(tempSettings.shadedLayer);
            }
            //initialize the settings
            $('#primaryColor').css('background-color', tempSettings.primaryColor);
            $('#secondaryColor').css('background-color', tempSettings.secondaryColor);
            $('#optionalColor').css('background-color', tempSettings.optionalColor);
            $('.layoutChange[data-layout="' + tempSettings.defaultLayout + '"]').prop('checked', true);
            $('#basicFonts').val(tempSettings.defaultFontFamily);

            //overriding the setting
            webBuilderSettings = tempSettings;
        }
        if (webBuilderSettings.scrolltotop) {
            $('#chkScrollToTopBox').prop('checked', true);
            var scroll = '<div class="scrolltotop" id="ScroolToTop"><div class="ScrollToTop editor-component"><div class="scrollDOM"><i class="fa fa-arrow-up" aria-hidden="true"></i></div></div></div>';
            $('.site-body').append(scroll);
            $('#ScroolToTop').on('click', function () {
                $('body,html').animate({
                    scrollTop: '0px'
                }, 1000);
            });
        }

    },
    GenerateID: function ($elem, type) {
        var _this = this;
        var rows = 0;
        if (_this.IsDefined($('body').attr('data-count'))) {
            rows = parseInt($('body').attr('data-count'));
        }
        var id = rows + 1;
        $('body').attr('data-count', id);
        webBuilderSettings.idcount = id;
        return id;
    },
    GenerateAndAppendID: function ($elem, type) {
        $elem.attr('data-id', this.GenerateID($elem, type));
    },
    GenerateAndAppendDataType: function ($elem, type) {
        let dataType = $elem.attr('data-type');
        if (this.IsUndefined($elem.attr('data-customtype'))) {
            $elem.attr('data-type', type);
            dataType = type;
        }
        return dataType;
    },
    GetComponenetID: function ($elem) {
        var ID = 0;
        if (this.IsDefined($elem.attr('data-id'))) {
            ID = parseInt($elem.attr('data-id'));
        }
        return ID;
    },
    Alert: function (alertdata) {
        alert(alertdata);
    },
    SetAPI: function (APICntrl) {
        if (this.IsDefined(APICntrl)) {
            APICntrl.PageName = this.GetCurrentPageName;
            var componentname = APICntrl.ComponentName;
            //have to check if the key exists ??
            if (this.IsDefined(component[componentname]["package"])) {
                if (this.IsDefined(component[componentname]["package"]["API"])) {
                    component[componentname]["package"]["API"].push(APICntrl);
                }
            } else {
                component[componentname].package = {
                    "API": []
                };
                component[componentname]["package"]["API"].push(APICntrl);
            }
        }
    },
    APICollector: function (objAPIController) {
        var packageXML = '';
        if (this.IsDefined(objAPIController)) {
            let staticPara = "";
            if (objAPIController.Type.toLowerCase() === "url") {
                staticPara = (objAPIController.StaticParameters.trim().length == 0 ? "" : "#" + objAPIController.StaticParameters);
            }
            packageXML += '<apilist>';
            packageXML += '<namespace>';
            packageXML += objAPIController.NameSpace;
            packageXML += '</namespace>';
            packageXML += '<classnames>';
            packageXML += objAPIController.ClassNames;
            packageXML += '</classnames>';
            packageXML += '<methodnames>';
            packageXML += objAPIController.MethodNames;
            packageXML += '</methodnames>';
            packageXML += '<parameters>';
            packageXML += objAPIController.Parameters + staticPara;
            packageXML += '</parameters>';
            packageXML += '<componentid>';
            packageXML += objAPIController.ComponentID;
            packageXML += '</componentid>';
            packageXML += '<componentname>';
            packageXML += objAPIController.ComponentName;
            packageXML += '</componentname>';
            packageXML += '<type>';
            packageXML += objAPIController.Type;
            packageXML += '</type>';
            packageXML += '<pagename>';
            packageXML += objAPIController.PageName;
            packageXML += '</pagename>';
            packageXML += '</apilist>';
        }
        return packageXML;
    },
    GetSingleAPI: function (key) {
        if (this.IsDefined(apiResultString) && this.IsDefined(apiResultString[key]))
            return apiResultString[key];
        else
            return null;
    },
    GetSingleAPIResult: function (key) {
        if (this.IsDefined(apiResultString) && this.IsDefined(apiResultString[key]))
            return apiResultString[key].Result;
        else
            return null;
    },
    GetCurrentPageName: function () {
        return currentpageName;
    },
    EnableLoader: function ($this) {
        $this.addClass('sLdng');
    },
    RemoveLoader: function ($this) {
        $this.removeClass('sLdng');
    },
    RandomColor: function () {
        return '#' + Math.random().toString(16).substr(2, 6);
    },
    Pinned: function () {
        return $('#popupModel .right_actions >.pin__right').hasClass('pinned');
    },
    ComponentTemplate: function ($parent, dropped) {
        let thatComp = component[$parent.attr('data-type')];
        var option = {
            heading: "Choose " + thatComp.componentname + " Templates",
            data: `<div class="fullpage-popup-model-search" id="divCompTempFltr">
                    <div class="temp-top-search Pa-20  Dfx flxWrp TxAl-m">
                        <div class="temp-search PosR">
                            <input type="text" id="txtCompTempSearch" placeholder="Search Template">
                            <button id="btnSearchCompTemp" class="search-btn-temp">
                                <i class="fa fa-search"></i>
                            </button>
                        </div>
                        <div class="temp-filter Dfx">
                            <span id="btnTagsFlterOpn" class="filter-btn cPointer">Filter</span>
                            <span id="btnResetTempSearch" class="cPointer  clear-btn">Clear All</span>
                        </div>
                    </div>
                    <div id="divCompTagsFltr" style="display: none" class="temp-sug sfCol_100 Pa-25 ">
                        <div id="divCompTempTags" class="flx flxWrp"></div>
                    </div>
                </div>
                <div id="divCompChooseTempLst" data-offset="0" data-limit="10" class="tempItem-wrp lay-wrp Dfx flxWrp TxAl-c"></div>
                <div class="Dfx TxAl-c">
                    <span class="stngSmallBtn" id="btnLoadMoreCompTemp">Load More</span>
                </div>`,
            showheading: true,
            width: "75%",
            height: "80%",
            advance: false,
            onappend: function ($wrap) {
                $wrap.find(".fullpagepopup").css("height", "80%");
                $wrap.find('#fullpagePopup').after($wrap.find('#divCompTempFltr'));
                $wrap.find(".fullpage-popup-model-body").addClass("Pa-0");
                GetLayout(false);
                GetTags();
            },
            onclose: function () {
                if (EasyLibrary.IsDefined(WbGlobal.CompTempManager))
                    WbGlobal.CompTempManager.compEvent($parent);
            }
        };
        FullPagePopup(option);

        function eventLister() {
            var $cont = $('#divCompChooseTempLst');
            $(".useThisTemp").off("click").on("click", function () {
                var html = EasyLibrary.RemoveSpaceFromDOM($(this).closest('.tempItem').find('.hdnTemp').html());
                var $temp = $(html);
                if (dropped) {
                    applyTemplate($temp);
                } else {
                    SageConfirmDialog("Are you sure to use this template?").done(function () {
                        applyTemplate($temp);
                    });
                }
            });
            $('#btnSearchCompTemp').off().on('click', function () {
                GetLayout(false);
            });
            $('#txtCompTempSearch').off().on('keyup', function (e) {
                if (e.keyCode === 13 || $(this).val() === '')
                    GetLayout(false);
            });
            $('#divCompTempTags .tempTags').off().on('click', function () {
                $(this).toggleClass('active');
                GetLayout(false);
            });
            $('#btnTagsFlterOpn').off('click').on('click', function () {
                $('#divCompTagsFltr').toggle(300);
            });
            $('#btnLoadMoreCompTemp').off().on('click', function () {
                $cont.attr('data-offset', parseInt($cont.attr('data-offset') + parseInt($cont.attr('data-limit'))));
                GetLayout(true);
            });
            $('#btnResetTempSearch').off().on('click', function () {
                $('#divCompTagsFltr .active').removeClass('active');
                $('#txtCompTempSearch').val('');
                GetLayout(false);
            });
        }

        function applyTemplate($temp) {
            thatComp.applyTemplate($parent, $temp, dropped);
            CloseFullPagePopup();
            SettingEvents($parent);
            $parent.find(".editor-component").each(function () {
                SettingEvents($(this));
            });
        }

        function GetLayout(IsAppend) {
            var url = SageFrameAppPath + '/Builder';
            if (EasyLibrary.IsDefined(WbGlobal.CompTempManager))
                url = WbGlobal.CompTempManager.TemplatePath;
            var itmscls = 'sfCol_33 tsfCol_50 msfCol_100 Pa-15';
            if (EasyLibrary.IsDefined(thatComp.tempItemsClass))
                itmscls = thatComp.tempItemsClass;
            var $cont = $('#divCompChooseTempLst');
            var config = {
                method: "GetComponentTemplate",
                url: url,
                data: "",
                ajaxSuccess: ""
            };
            if (!IsAppend) {
                $cont.attr('data-offset', 0);
                $cont.attr('data-limit', 9);
                if (EasyLibrary.IsDefined(thatComp.tempItemLimit))
                    $cont.attr('data-limit', thatComp.tempItemLimit);
            }
            config.data = {
                componentName: thatComp.componentname,
                offset: $cont.attr('data-offset'),
                limit: $cont.attr('data-limit'),
                searchKey: $('#txtCompTempSearch').val(),
                tagIDs: $('#divCompTempTags .active').map(function () {
                    return $(this).attr('data-id');
                }).get().join(',')
            };
            config.ajaxSuccess = function (data) {
                if (data !== null) {
                    var html = '';
                    data = data.d;
                    if (typeof data === "string")
                        data = JSONParse(data);
                    if (data.length >= parseInt(config.data.limit))
                        $('#btnLoadMoreCompTemp').show();
                    else
                        $('#btnLoadMoreCompTemp').hide();
                    $.each(data, function (i, v) {
                        html += '<div class="' + itmscls + '">';
                        html += '<div class="tempItem Dfx TxAl-m TxAl-c PosR"><div class="hdnTemp Dn mDn tDn">' + v.LayoutDOM + '</div>';
                        html += '<div class="imgWrp">';
                        html += '<img src="' + v.Screenshot + '"/>';
                        html += '</div><div class="desc Dfx TxAl-c TxAl-m flxWrp">';
                        html += '<span class="tit">' + v.LayoutName + '</span>';
                        html += '<button type="button" class="btn-ui useThisTemp">Use This</button>';
                        html += '</div></div></div>';
                    });
                    if (IsAppend) {
                        $cont.append(html);
                    } else if (html !== '')
                        $cont.html(html);
                    else
                        $cont.html('<div class="emptyData"><p>Sorry template not found.</p></div>');
                    eventLister();

                }
            };
            CommonLibrary.AjaxCall(config);
        }

        function GetTags() {
            var config = {
                method: "GetCompTemplateTags",
                url: SageFrameAppPath + '/Builder',
                data: {
                    componentName: thatComp.componentname,
                },
                async: true,
                ajaxSuccess: function (data) {
                    if (data !== null) {
                        data = data.d;
                        if (typeof data === "string")
                            data = JSONParse(data);
                        var html = '';
                        $.each(data, function (i, v) {
                            html += '<span class="tempTags" data-id="' + v.Key + '">' + v.Value + '</span>';
                        });
                        $('#divCompTempTags').html(html);
                    }
                    eventLister();
                }
            };
            CommonLibrary.AjaxCall(config);
        }
    }
};
//initialize the body settings
EasyLibrary.GetSettings();

function GetLibrary(dataType) {
    return component[dataType]["view"]["library"];
}
//implementation
//var scroller = new ScrollJS({
//    container: $('#container'),
//    scrollbar: $('#scrollbar'),
//    content: $('#content')
//});
//store external html DOMs in a variable for re-use without repetitive call
const ExternalFileDoms = {
    divbackcolorchoose: staticDOMs.divbackcolorchoose,
    divbackimagechoose: staticDOMs.divbackimagechoose,
    backgroundtab: staticDOMs.backgroundtab,
    txtbasictab: staticDOMs.txtbasictab
};

function SetDefaultFont(o) {
    if (typeof (o) === "undefined" || typeof (o.targetParent) === 'undefined') {
        console.log("DefaultFontFamily=> targetparent: missing or invalid");
        return;
    }
    if (typeof (o) === "undefined" || typeof (o.targetElem) === 'undefined') {
        console.log("DefaultFontFamily=> targetElem: missing or invalid");
        return;
    }
    if (!(o.targetParent instanceof jQuery)) {
        console.error("DefaultFontFamily=> targetParent should be a jQuery object");
        return;
    }
    let targetParent = o.targetParent;
    let target = o.targetElem;
    let defaultFont = {
        setupFont: function () {
            let defaultFontFamily = $(`#basicFonts`).val();
            $(target).each(function (i, val) {
                if (!targetParent.find(val).length > 0) {
                    console.log("DefaultFontFamily=> targetElem: invalid");
                    return;
                }
                let fontClasses = targetParent.find(val).attr('class').match(/ff-(\w+)/g);
                if (fontClasses !== null)
                    targetParent.find(val).removeClass(fontClasses[0]);
                targetParent.find(val).addClass('ff-' + defaultFontFamily);
            });
        }
    }
    defaultFont.setupFont();

}
//function SelectedItem(o) {
//    if (typeof (o) === "undefined" || typeof (o.targetParent) === 'undefined') {
//        console.log("SelectedItem=> targetparent: missing or invalid");
//        return;
//    }
//    if (typeof (o) === "undefined" || typeof (o.targetElem) === 'undefined') {
//        console.log("SelectedItem=> targetElem: missing or invalid");
//        return;
//    }
//    if (!(o.targetParent instanceof jQuery)) {
//        console.error("SelectedItem=> targetParent should be a jQuery object");
//        return;
//    }
//    if (typeof (o.itemsPerRow) === "undefined") {
//        console.log('ItemEvent=> itemsPerRow is missing');
//        return;
//    }
//    let types = ['fItem', 'lItem', 'fRow', 'lRow', 'fCol', 'lCol'];
//    let targetParent = o.targetParent,
//        target = o.targetElem,
//        type = o.type,
//        itemsPerRow = o.itemsPerRow,
//        totalItem = $(targetParent).find(target).length;
//    targetItem = {};

//}
(function ($) {
    "use strict";
    $.fn.nthItemEvent = function (o) {
        if (typeof (o) === "undefined" || typeof (o.targetParent) === 'undefined') {
            console.log("ItemEvent=> targetparent: missing or invalid");
            return;
        }
        if (typeof (o) === "undefined" || typeof (o.targetElem) === 'undefined') {
            console.log("ItemEvent=> targetElem: missing or invalid");
            return;
        }
        if (!(o.targetParent instanceof jQuery)) {
            console.error("ItemEvent=> targetParent should be a jQuery object");
            return;
        }
        if (typeof (o.type) == "undefined") {
            console.log('ItemEvent=> type is missing');
            return;
        }
        if (o.type == "row" && typeof (o.itemsPerRow) === "undefined") {
            console.log('ItemEvent=> itemsPerRow is missing');
            return;
        }
        let types = ['item', 'row'];
        let targetParent = o.targetParent,
            self = this,
            target = o.targetElem,
            type = o.type,
            itemsPerRow = o.itemsPerRow,
            totalItem = $(targetParent).find(target).length,
            column = o.column && itemsPerRow>1 ? true : false,
            lastRowItems = type == types[1] ? parseInt(totalItem % itemsPerRow) :0,
            selectOptionClass = 'item',
            idSuffix = '_' + Math.floor((Math.random() * 1000) + 100);

        let objEle = {};
        function updateEvent(type) {
            switch (type) {
                case types[0]:
                    objEle.firstEleClass = 'itemFirst';
                    objEle.lastEleClass = 'itemLast';
                    break;
                case types[1]:
                    objEle.firstEleClass = 'itemFirst';
                    objEle.lastEleClass = 'itemLast';
                    objEle.firstColClass = 'columnFirst';
                    objEle.lastColClass = 'columnLast';
                    break;
                default:
                    break;
            }
        }
        let ItemEvent = {
            initEvent: function () {
                let self = this;
                updateEvent(type);
                $(targetParent).find(target).removeClass(objEle.firstColClass).removeClass(objEle.lastColClass);
                $(targetParent).find(target).removeClass(objEle.firstEleClass).removeClass(objEle.lastEleClass);
                if (type == types[0])
                    self.setItemEvent()
                else self.setRowEvent();
            },
            setItemEvent: function () {
                targetParent.find(target).eq(0).addClass(objEle.firstEleClass);
                targetParent.find(target + ':last').addClass(objEle.lastEleClass);
                this.appendDOM(types[0]);
            },
            appendDOM: function (type) {
                let _this = this;
                self.find('[class^="' + types[0] + '"]').remove();
                let optionDOM = type == types[0] ? _this.createItemSelectDOM() : _this.createRowSelectDOM();
                self.append(optionDOM);
            },
            createItemSelectDOM: function () {
                return DOMCreate('option', 'First Item', selectOptionClass + objEle.firstEleClass + idSuffix, '', ['value=".' + objEle.firstEleClass + '"']) + DOMCreate('option', 'Last Item', selectOptionClass + objEle.lastEleClass + idSuffix, '', ['value=".' + objEle.lastEleClass + '"']);
            },
            createRowSelectDOM: function () {
                let optionDOMs = DOMCreate('option', 'First Row', selectOptionClass + objEle.firstEleClass + idSuffix, '', ['value=".' + objEle.firstEleClass + '"']) + DOMCreate('option', 'Last Row', selectOptionClass + objEle.lastEleClass + idSuffix, '', ['value=".' + objEle.lastEleClass + '"']);
                if (column) {
                    optionDOMs += DOMCreate('option', 'First Column', selectOptionClass + objEle.firstColClass + idSuffix, '', ['value=".' + objEle.firstColClass + '"']) + DOMCreate('option', 'Last Column', 'item' + objEle.lastColClass + idSuffix, '', ['value=".' + objEle.lastColClass + '"']);
                }
                return optionDOMs;
            },
            setRowEvent: function () {
                let _this = this;
                _this.appendDOM(types[1]);
                if (totalItem < itemsPerRow)
                    $(targetParent).find(target).addClass(objEle.firstEleClass);
                else if (totalItem > itemsPerRow) {
                    this.setFirstRow(0, parseInt(itemsPerRow))
                    if (lastRowItems == 0)
                        _this.setLastRow(totalItem - 1, parseInt(totalItem - itemsPerRow - 1))
                    else
                        _this.setLastRow(totalItem - 1, parseInt(totalItem - lastRowItems - 1))
                }
            },
            setFirstRow: function (init, condition) {
                if (init !== undefined && condition !== undefined)
                    for (let i = init; i <condition; i++)
                        $(targetParent).find(target).eq(i).addClass(objEle.firstEleClass);
                else
                    $(targetParent).find(target).first().addClass(objEle.firstEleClass);
                if (column)
                    while (init < totalItem) {
                        $(targetParent).find(target).eq(init).addClass(objEle.firstColClass);
                        init += parseInt(itemsPerRow);
                    }
            },
            setLastRow: function (init, condition) {
                if (init !== undefined && condition !== undefined)
                    for (let i = init; i > condition; i--)
                        $(targetParent).find(target).eq(i).addClass(objEle.lastEleClass);
                else $(targetParent).find(target).last().addClass(objEle.lastEleClass);
                if (column) {
                    let condn = lastRowItems;
                    while ((totalItem - condn) >= itemsPerRow) {
                        let index = totalItem - condn - 1;
                        $(targetParent).find(target).eq(index).addClass(objEle.lastColClass);
                        condn += parseInt(itemsPerRow);
                    }
                }
            }
        }
        ItemEvent.initEvent();
    };
}(jQuery));


(function ($) {
    "use strict";
    $.fn.AdvanceBackground = function (o) {
        if (typeof o === 'undefined' || typeof o.targetParent === 'undefined') {
            console.error("AdvanceBackground => missing option: targetParent");
            return;
        }
        if (!(o.targetParent instanceof jQuery)) {
            console.error("AdvanceBackground => targetParent should be a jQuery object");
            return;
        }
        if (typeof o === 'undefined' || typeof o.targetElem === 'undefined') {
            console.error("AdvanceBackground => missing option: targetElem");
            return;
        }
        let $self = this,
            targetParent = o.targetParent,
            targetElem = o.targetElem,
            targets = $(targetParent).find(targetElem),
            idSuffix = '_' + Math.floor((Math.random() * 1000) + 100),
            options = ["image", "color"];
        if (typeof o.options !== 'undefined' && o.options && o.options instanceof Array) {
            options = o.options;
        }
        let AdvanceBackground = {
            updateTargets: function () {
                let tar = UpdateTargets(targetParent, targetElem, 'AdvanceBackground');
                targets = tar.target;
                return tar.exists;
            },
            appendBGChangerDOM: function () {
                let bgChDom = this.GeneralBackgroundDOM();
                bgChDom = this.fixDomId(bgChDom);
                $self.html(bgChDom);
            },
            GeneralBackgroundDOM: function () {
                let backGroundDOM = '';
                let optionLen = options.length;
                if (optionLen > 0) {
                    if (optionLen == 1) {
                        if (optionLen > 1)
                            backGroundDOM += DOMCreate('h4', 'Background');
                        let optionValue = options[0];
                        switch (optionValue) {
                            case 'color':
                                backGroundDOM += ExternalFileDoms.divbackcolorchoose;
                                break;
                            case 'image':
                                backGroundDOM += ExternalFileDoms.divbackimagechoose;
                                break;
                        }
                        backGroundDOM = FieldRowDOMCreate(backGroundDOM);
                    } else {
                        backGroundDOM += ExternalFileDoms.backgroundtab;
                    }
                }
                return backGroundDOM;
            },
            setupData: function () {
                this.setupBGImage();
                this.setupBGImageEffect();
                this.setupShades();
            },
            setupBGImage: function () {
                if (!this.updateTargets()) {
                    return;
                }
                let parentBgImage = $(targets[0]).css('background-image');
                if (typeof (parentBgImage) === 'undefined' || parentBgImage === 'none') {
                    parentBgImage = `${webbuildermodulepath}/img/tiger.jpg`;
                }
                parentBgImage = parentBgImage.replace('url(', '').replace(')', '').replace(/\"/gi, "");
                $self.find(`#RowBGImageSrc${idSuffix}`).attr('src', parentBgImage);
            },
            setupBGImageEffect: function () {
                if (!this.updateTargets()) {
                    return;
                }
                let effectClass = 'background-effect-size-contain';
                let sfEffect = $(targets[0]).attr('class').match(/background-effect-[a-z]{1,10}-[a-z]{1,10}/g);
                if (sfEffect !== null) {
                    effectClass = sfEffect[0];
                }
                $self.find(`#bgImageEffect${idSuffix}`).val(effectClass);
            },
            setupShades: function () {
                if (!this.updateTargets()) {
                    return;
                }
                let $shadedlayer = $(targets[0]).find(' > .editor-row-shaded-layer');
                if ($shadedlayer.length > 0) {
                    $self.find(`#shadedLayerActive${idSuffix}`).prop('checked', true);
                    //let conClass = $shadedlayer.attr('class').replace('editor-row-container', '').trim();
                    //$('#selContainerWidth').val(conClass);
                    $self.find(`#divPickShaded${idSuffix}`).fadeIn(400);
                    $self.find(`#chooseColorShadedCol${idSuffix}`).css({
                        'background-color': $shadedlayer.css('background-color')
                    });
                } else {
                    $self.find(`#shadedLayerActive${idSuffix}`).prop('checked', false);
                }
            },
            setupColorPicker: function () {
                let self = this;
                let colorPickerOption = ColorPickerOption({
                    renderCallback: function ($elm, toggled) {
                        let objColor = RenderCallBackColor(this);
                        if (typeof o.colorCallBack == 'function')
                            o.colorCallBack(objColor);
                        let colorPickerID = $elm.attr('id');
                        self.updateTargets();
                        switch (colorPickerID) {
                            case 'chooseColorShadedCol' + idSuffix:
                                $.each(targets, function (i, target) {
                                    $(target).find(' > .editor-row-shaded-layer').css({
                                        'background-color': objColor.bgColor,
                                        //'color': objColor.textColor
                                    });
                                });
                                break;
                            case 'chooseColorColBG' + idSuffix:
                                $.each(targets, function (i, target) {
                                    $(target).css({
                                        'background-color': objColor.bgColor,
                                        //'color': objColor.textColor
                                    });
                                });
                                break;
                        }
                    }
                });
                $self.find('.chooseBGColors').colorPicker(colorPickerOption);
            },
            addEventListeners: function () {
                if (!this.updateTargets()) {
                    return;
                }
                let self = this;
                let bgColor = $(targets[0]).css('background-color');
                let txtColor = $(targets[0]).css('color');
                if (typeof ($(targets[0]).attr('style')) === 'undefined' || typeof (bgColor) === "undefined") {
                    bgColor = "rgba(255, 255, 255, 0)";
                }
                if (typeof ($(targets[0]).attr('style')) === 'undefined' || typeof (txtColor) === "undefined") {
                    txtColor = "rgba(0, 0, 0, 0)";
                }
                let prevhovereffect = $(targets[0]).attr('data-prevhovereffect');
                if (typeof prevhovereffect !== 'undefined') {
                    let tmpEff = JSON.parse(prevhovereffect);
                    if (tmpEff.bg) {
                        bgColor = tmpEff.bg;
                    }
                    if (tmpEff.font) {
                        txtColor = tmpEff.font;
                    }
                }
                //background type
                $self.find(`#selBackround${idSuffix}`).off().on('change', function () {
                    self.updateTargets();
                    let select = $(this).val();
                    let backgroundColor = '';
                    let backgroundImage = '';
                    switch (select) {
                        case 'none':
                            $self.find(`#divBackColorChoose${idSuffix}`).hide();
                            $self.find(`#divBackImageChoose${idSuffix}`).hide();
                            backgroundColor = '';
                            backgroundImage = '';
                            self.removeBGImage();
                            self.removeBGColor(bgColor, txtColor);
                            break;
                        case 'image':
                            $self.find(`#divBackColorChoose${idSuffix}`).hide();
                            $self.find(`#divBackImageChoose${idSuffix}`).show();
                            backgroundColor = '';
                            backgroundImage = 'image';
                            self.removeBGColor(bgColor, txtColor);
                            break;
                        case 'color':
                            $self.find(`#divBackColorChoose${idSuffix}`).show();
                            $self.find(`#divBackImageChoose${idSuffix}`).hide();
                            backgroundColor = 'color';
                            backgroundImage = '';
                            self.removeBGImage();
                            break;
                    }
                    if (typeof o.backgroundType == 'function')
                        o.backgroundType(select);
                    $.each(targets, function (i, target) {
                        $(target).attr('data-backgroundColor', backgroundColor);
                        $(target).attr('data-backgroundImage', backgroundImage);
                    });
                });
                //image change event
                $self.find(`#RowBGImage${idSuffix}`).off().on('click', function () {
                    self.updateTargets();
                    let $this = $(this);
                    let media = $this.SageMedia({
                        onSelect: function (src, response, type, filename, extension) {
                            src = src.replace(/\\/g, '/');
                            if (typeof o.sageMediaCallBack == 'function')
                                o.sageMediaCallBack(src);
                            //$this.attr('src', src);
                            $self.find(`#RowBGImageSrc${idSuffix}`).attr('src', src);
                            $.each(targets, function (i, target) {
                                $(target).css({
                                    'background-image': 'url("' + src + '")'
                                });
                            });
                        },
                        success: function (resposne) {
                           
                        },
                        mediaType: 'image',
                        extension: 'png,jpeg,jpg,ico,svg,gif,webp'
                    });
                    media.Show();
                });
                //image effects
                $self.find(`#bgImageEffect${idSuffix}`).off().on('change', function () {
                    self.updateTargets();
                    let newEffectClass = $(this).val();
                    let effectClass = 'background-effect-size-contain';
                    $.each(targets, function (i, target) {
                        $(target).css({
                            'background-position-y': "0px"
                        });
                        let sfEffect = $(target).attr('class').match(/background-effect-[a-z]{1,10}-[a-z]{1,10}/g);
                        if (sfEffect !== null) {
                            effectClass = sfEffect[0];
                        }
                        $(target).removeClass(effectClass).addClass(newEffectClass);

                        let sfPosition = $(target).attr('class').match(/bgp-c-[a-z]{1,10}-[a-z]{1,10}/g);
                        if (sfPosition !== null) {
                            $(target).removeClass(sfPosition[0]);
                        }
                        let sfParallex = $(target).attr('class').match(/bgp-p-[a-z]{1,10}/g);
                        if (sfParallex !== null) {
                            $(target).removeClass(sfParallex[0]);
                        }
                    });
                    switch (newEffectClass) {
                        case 'background-effect-size-contain':
                            $self.find(`#divBackgroundPositionTab${idSuffix}`).hide();
                            $self.find(`#divBackgroundPositionCover${idSuffix}`).hide();
                            break;
                        case 'background-effect-image-parallax':
                            $self.find(`#divBackgroundPositionTab${idSuffix}`).show();
                            $self.find(`#divBackgroundPositionCover${idSuffix}`).hide();
                            $(targets).addClass($self.find(`#bgImagePosition${idSuffix}`).val());
                            break;
                        case 'background-effect-size-cover':
                            $self.find(`#divBackgroundPositionTab${idSuffix}`).hide();
                            $self.find(`#divBackgroundPositionCover${idSuffix}`).show();
                            $(targets).addClass($self.find(`#bgImageCoverPosition${idSuffix}`).val());
                            break;
                        default:

                    }
                });
                $self.find(`#bgImagePosition${idSuffix}`).off().on('change', function () {
                    self.updateTargets();
                    let newPositionClass = $(this).val();
                    $.each(targets, function (i, target) {
                        let sfPosition = $(target).attr('class').match(/bgp-p-[a-z]{1,10}/g);
                        if (sfPosition !== null) {
                            $(target).removeClass(sfPosition[0]);
                        }
                        $(target).addClass(newPositionClass);
                    });
                });
                $self.find(`#bgImageCoverPosition${idSuffix}`).off().on('change', function () {
                    self.updateTargets();
                    let newPositionClass = $(this).val();
                    $.each(targets, function (i, target) {
                        let sfPosition = $(target).attr('class').match(/bgp-c-[a-z]{1,10}-[a-z]{1,10}/g);
                        if (sfPosition !== null) {
                            $(target).removeClass(sfPosition[0]);
                        }
                        $(target).addClass(newPositionClass);
                    });
                });
                //shaded layer
                $self.find(`#shadedLayerActive${idSuffix}`).off().on('click', function () {
                    if ($(this).is(':checked')) {
                        self.shadeAdd();
                    } else {
                        self.shadeRemove();
                    }
                });
                //final
                $self.find(`#chooseColorColBG${idSuffix}`).css({
                    'background-color': bgColor,
                    'color': txtColor
                });
                let backgroundColor = $(targets[0]).attr('data-backgroundColor');
                let backgroundImage = $(targets[0]).attr('data-backgroundImage');
                let selected = 'none';
                if (typeof (backgroundColor) !== 'undefined' && backgroundColor.length > 0) {
                    selected = 'color';
                } else if (typeof (backgroundImage) !== 'undefined' && backgroundImage.length > 0) {
                    selected = 'image';
                    self.setupBGImageEffect();
                }
                $self.find(`#selBackround${idSuffix}`).val(selected);
                $self.find(`#selBackround${idSuffix}`).trigger('change');

                let sfPosition = $(targets[0]).attr('class').match(/bgp-c-[a-z]{1,10}-[a-z]{1,10}/g);
                if (sfPosition !== null) {
                    $self.find(`#divBackgroundPositionCover${idSuffix}`).show();
                    $self.find(`#bgImageCoverPosition${idSuffix}`).val(sfPosition);
                }

                let sfParallex = $(targets[0]).attr('class').match(/bgp-p-[a-z]{1,10}/g);
                if (sfParallex !== null) {
                    $self.find(`#divBackgroundPositionTab${idSuffix}`).show();
                    $self.find(`#bgImagePosition${idSuffix}`).val(sfParallex);
                }

            },
            shadeAdd: function () {
                if (!this.updateTargets()) {
                    return;
                }
                let shadedDiv = '<div class="editor-row-shaded-layer" style="height:100%;"></div>';
                $self.find(`#divPickShaded${idSuffix}`).fadeIn(400);
                let c = $self.find(`#chooseColorShadedCol${idSuffix}`).css('background-color');
                $.each(targets, function (i, target) {
                    $(target).children().not(".SetHdlr, .addPro").wrapAll(shadedDiv);
                    //let appendElem = $(target).contents();
                    //$(target).append(shadedDiv);
                    //$(target).find(' > .editor-row-shaded-layer').append(appendElem).css({ 'background-color': c });
                    $(target).find(' > .editor-row-shaded-layer').css({
                        'background-color': c
                    });
                    let parentClasses = $(target).attr('class');
                    let paddingClass = parentClasses.match(/([a-z]?)P[a-z]{0,1}-[0-9]{1,3}/g);
                    if (paddingClass !== null) {
                        $(paddingClass).each(function (i, v) {
                            $(target).find(' > .editor-row-shaded-layer').addClass(v);
                            $(target).removeClass(v);
                        });
                    }
                });
            },
            shadeRemove: function () {
                if (!this.updateTargets()) {
                    return;
                }
                $.each(targets, function (i, target) {
                    let parentClasses = $(target).find('.editor-row-shaded-layer').attr('class');
                    if (typeof parentClasses !== 'undefined') {
                        let paddingClass = parentClasses.match(/([a-z]?)P[a-z]{0,1}-[0-9]{1,3}/g);
                        if (paddingClass !== null) {
                            $(paddingClass).each(function (i, v) {
                                $(target).find('.editor-row-shaded-layer').removeClass(v);
                                $(target).addClass(v);
                            });
                        }
                    }
                });
                this.removeShadedLayer();
            },
            removeBGImage: function () {
                if (!this.updateTargets()) {
                    return;
                }
                this.removeShadedLayer();
                $.each(targets, function (i, target) {
                    $(target).removeClass('editor-row-bg-image-parallax');
                    $(target).css({
                        'background-image': ''
                    });
                });
            },
            removeBGColor: function (bgColor, txtColor) {
                if (!this.updateTargets()) {
                    return;
                }
                $.each(targets, function (i, target) {
                    $(target).css({
                        'background-color': '',
                        'color': ''
                    });
                });
                $self.find(`#chooseColorColBG${idSuffix}`).css({
                    'background-color': bgColor,
                    'color': txtColor
                });
            },
            removeShadedLayer: function () {
                if (!this.updateTargets()) {
                    return;
                }
                $.each(targets, function (i, target) {
                    $(target).find(' > .editor-row-shaded-layer').children().unwrap();
                    //let appendElem = $(target).find(' > .editor-row-shaded-layer').contents();
                    //$(target).append(appendElem);
                    //$(target).find(' > .editor-row-shaded-layer').remove();
                });
                $self.find(`#divPickShaded${idSuffix}`).fadeOut(100);
                $self.find(`#shadedLayerActive${idSuffix}`).prop('checked', false);
            },
            fixDomId: function (dom) {
                let ids = ['selBackround', 'divBackColorChoose', 'chooseColorColBG', 'divBackImageChoose', 'RowBGImage', 'bgImageEffect', 'shadedLayerActive', 'divPickShaded', 'chooseColorShadedCol', 'RowBGImageSrc',
                    'divBackgroundPositionTab', 'bgImagePosition', 'divBackgroundPositionCover', 'bgImageCoverPosition'
                ];
                let $dom = $(dom);
                for (let i = 0, j = ids.length; i < j; i++) {
                    $dom.find('#' + ids[i]).removeAttr('id').attr('id', ids[i] + idSuffix);
                }
                $dom.find("label[for='shadedLayerActive']").attr('for', 'shadedLayerActive' + idSuffix);
                return $dom[0];
            },
            init: function () {
                this.appendBGChangerDOM();
                this.setupData();
                this.addEventListeners();
                this.setupColorPicker();
            }
        };
        AdvanceBackground.init();
    };
}(jQuery));
(function ($) {
    "use strict";
    $.fn.AdvanceSpacing = function (o) {
        if (typeof o === 'undefined' || typeof o.targetParent === 'undefined') {
            console.error("AdvanceSpacing => missing option: targetParent");
            return;
        }
        if (!(o.targetParent instanceof jQuery)) {
            console.error("AdvanceSpacing => targetParent should be a jQuery object");
            return;
        }
        if (typeof o === 'undefined' || typeof o.targetElem === 'undefined') {
            console.error("AdvanceSpacing => missing option: targetElem");
            return;
        }
        let $self = this,
            targetParent = o.targetParent,
            targetElem = o.targetElem,
            targets = $(targetParent).find(targetElem),
            saveClasses = false,
            idSuffix = '_' + Math.floor((Math.random() * 1000) + 100),
            options = {
                "margin": {
                    "max": 80,
                    "min": -80,
                    "times": 5,
                    "position": ["all", "top", "left", "bottom", "right"]
                },
                "padding": {
                    "max": 80,
                    "min": 0,
                    "times": 5,
                    "position": ["all", "top", "left", "bottom", "right"]
                }
            };
        if (typeof o.saveClasses !== 'undefined' && o.saveClasses === true) {
            saveClasses = true;
        }
        if (typeof o.options !== 'undefined' && o.options) {
            options = o.options;
        }
        if (options.margin && Object.keys(options.margin).indexOf("label") == -1) {
            options.margin.label = 'Outer Spacing/Margin';
        }
        if (options.padding && Object.keys(options.padding).indexOf("label") == -1) {
            options.padding.label = 'Inner Spacing/Padding';
        }
        let marginSliderListLocal = [];
        let paddingSliderListLocal = [];
        let _ResetBulkMarginSliderValue = function () {
            $self.find(`#${marginSliderListLocal[0][0]}${idSuffix}`).slider('value', 0);
            $self.find(`#${marginSliderListLocal[0][1]}${idSuffix}`).text(0);
        };
        let _ResetBulkPaddingSliderValue = function () {
            $self.find(`#${paddingSliderListLocal[0][0]}${idSuffix}`).slider('value', 0);
            $self.find(`#${paddingSliderListLocal[0][1]}${idSuffix}`).text(0);
        };
        if ($(targets).hasClass('editor-row-shaded-layer')) {
            targets = $(targets).parent();
        }
        let dAlpha = DeviceAlpha();
        let AdvanceSpacing = {
            saveClasses: function () {
                if (!saveClasses) {
                    return;
                }
                if (targets.length > 0) {
                    let $cls = $(targets[0]).attr('class');
                    let $padCls = $cls.match(/([a-z]?)P[a-z]-[0-9]{1,3}/g);
                    if ($padCls && $padCls.length > 0) {
                        $(targetParent).attr('data-padclasses', $padCls.join(' '));
                    }
                } else {
                    $(targetParent).attr('data-padclasses', '');
                }
            },
            updateTargets: function () {
                let tar = UpdateTargets(targetParent, targetElem, 'AdvanceSpacing');
                targets = tar.target;
                return tar.exists;
            },
            appendSpacingDom: function () {
                let dom = this.GeneralSpacingDOM(options);
                dom = this.fixDomId(dom);
                $self.html(dom);
            },
            fixDomId: function (dom) {
                let ids = ['OuterSpacingWrap', 'InnerSpacingWrap',
                    'bulkMarginSlider', 'marginTopSlider', 'marginRightSlider', 'marginBottomSlider', 'marginLeftSlider',
                    'bulkMarginHandler', 'marginTopHandler', 'marginRightHandler', 'marginBottomHandler', 'marginLeftHandler',
                    'bulkPaddingSlider', 'paddingTopSlider', 'paddingRightSlider', 'paddingBottomSlider', 'paddingLeftSlider',
                    'bulkPaddingHandler', 'paddingTopHandler', 'paddingRightHandler', 'paddingBottomHandler', 'paddingLeftHandler'
                ];
                let $dom = $(dom);
                for (let i = 0, j = ids.length; i < j; i++) {
                    $dom.find('#' + ids[i]).removeAttr('id').attr('id', ids[i] + idSuffix);
                }
                return $dom;
            },
            GeneralSpacingDOM: function ($options) {
                let outerDOM = '';
                let innerDOM = '';
                if (typeof ($options) !== 'undefined') {
                    let spaceOption = Object.keys($options);
                    let spaceOptionLength = spaceOption.length;
                    for (let j = 0; j < spaceOptionLength; j++) {
                        let $sp = spaceOption[j];
                        switch ($sp) {
                            case 'margin':
                                outerDOM += DOMCreate('label', $options.margin.label, '', 'OuterSpacingWrap', ['data-min="' + $options['margin']['min'] + '"', 'data-max="' + $options['margin']['max'] + '"', 'data-times="' + $options['margin']['times'] + '"']);
                                outerDOM = `<div class="field-row stElWrap col100">${outerDOM}</div>`;
                                if (typeof ($options['margin']['position'] !== 'undefined')) {
                                    let positionList = $options['margin']['position'];
                                    let positionListLen = positionList.length;
                                    for (let i = 0; i < positionListLen; i++) {
                                        switch (positionList[i].toLowerCase()) {
                                            case 'all':
                                                outerDOM += CreateSliderDOM(marginSliderListLocal[0][0], marginSliderListLocal[0][1], 'Bulk');
                                                marginSliderListLocal[0][2] = true;
                                                break;
                                            case 'top':
                                                outerDOM += CreateSliderDOM(marginSliderListLocal[1][0], marginSliderListLocal[1][1], 'Top');
                                                marginSliderListLocal[1][2] = true;
                                                break;
                                            case 'right':
                                                outerDOM += CreateSliderDOM(marginSliderListLocal[2][0], marginSliderListLocal[2][1], 'Right');
                                                marginSliderListLocal[2][2] = true;
                                                break;
                                            case 'bottom':
                                                outerDOM += CreateSliderDOM(marginSliderListLocal[3][0], marginSliderListLocal[3][1], 'Bottom');
                                                marginSliderListLocal[3][2] = true;
                                                break;
                                            case 'left':
                                                outerDOM += CreateSliderDOM(marginSliderListLocal[4][0], marginSliderListLocal[4][1], 'Left');
                                                marginSliderListLocal[4][2] = true;
                                                break;
                                        }
                                    }
                                }
                                outerDOM = FieldRowDOMCreate(outerDOM);
                                break;
                            case 'padding':
                                innerDOM += DOMCreate('label', $options.padding.label, '', 'InnerSpacingWrap', ['data-min="' + $options['padding']['min'] + '"', 'data-max="' + $options['padding']['max'] + '"', 'data-times="' + $options['padding']['times'] + '"']);
                                innerDOM = `<div class="field-row stElWrap col100">${innerDOM}</div>`;
                                if (typeof ($options['padding']['position'] !== 'undefined')) {
                                    let positionList = $options['padding']['position'];
                                    let positionListLen = positionList.length;
                                    for (let i = 0; i < positionListLen; i++) {
                                        switch (positionList[i].toLowerCase()) {
                                            case 'all':
                                                innerDOM += CreateSliderDOM(paddingSliderListLocal[0][0], paddingSliderListLocal[0][1], 'Bulk');
                                                paddingSliderListLocal[0][2] = true;
                                                break;
                                            case 'top':
                                                innerDOM += CreateSliderDOM(paddingSliderListLocal[1][0], paddingSliderListLocal[1][1], 'Top');
                                                paddingSliderListLocal[1][2] = true;
                                                break;
                                            case 'right':
                                                innerDOM += CreateSliderDOM(paddingSliderListLocal[2][0], paddingSliderListLocal[2][1], 'Right');
                                                paddingSliderListLocal[2][2] = true;
                                                break;
                                            case 'bottom':
                                                innerDOM += CreateSliderDOM(paddingSliderListLocal[3][0], paddingSliderListLocal[3][1], 'Bottom');
                                                paddingSliderListLocal[3][2] = true;
                                                break;
                                            case 'left':
                                                innerDOM += CreateSliderDOM(paddingSliderListLocal[4][0], paddingSliderListLocal[4][1], 'Left');
                                                paddingSliderListLocal[4][2] = true;
                                                break;
                                        }
                                    }
                                }
                                innerDOM = FieldRowDOMCreate(innerDOM);
                                break;
                        }
                    }
                }
                return outerDOM + innerDOM;
            },
            BulkMargin: function (space, $parent, ref) {
                if (ref && typeof ref['updateTargets'] === 'function') {
                    ref['updateTargets']();
                    $parent = targets;
                }
                if (space !== 'undefined' && typeof (space) !== 'undefined') {
                    let times = 1;
                    if (typeof ($self.find(`#OuterSpacingWrap${idSuffix}`).attr('data-times')) !== 'undefined')
                        times = parseInt($self.find(`#OuterSpacingWrap${idSuffix}`).attr('data-times'));
                    if (times == 0)
                        times = 1;
                    let parentClasses = GetTargetsClasses($parent);
                    if (typeof (parentClasses) !== "undefined") {
                        let regex = new RegExp('\\b' + dAlpha + 'M[a-z](N){0,1}-[0-9]{1,3}\\b', 'g');
                        let marginClass = parentClasses.match(regex);
                        if (marginClass !== null) {
                            $.each(marginClass, function (i, v) {
                                $parent.removeClass(v.trim());
                            });
                        }
                    }
                    for (let i = 1; i < 5; i++) {
                        if (marginSliderListLocal[i][2]) {
                            $self.find(`#${marginSliderListLocal[i][0]}${idSuffix}`).slider('value', space);
                            $self.find(`#${marginSliderListLocal[i][1]}${idSuffix}`).text(space);
                        }
                    }
                    if (dAlpha === "") {
                        let devices = DeviceList(parentClasses, '\\btM[a-z](N){0,1}-[0-9]{1,3}\\b', '\\bmM[a-z](N){0,1}-[0-9]{1,3}\\b');
                        let deviceLength = devices.length;
                        for (var i = 0; i < deviceLength; i++) {
                            ApplySpace(space, devices[i]);
                        }
                    } else {
                        ApplySpace(space, dAlpha);
                    }

                    function ApplySpace(space_, dAlpha_) {
                        if (space_ >= 0) {
                            space_ = space_ * times;
                            if (marginSliderListLocal[1][2])
                                $parent.addClass(dAlpha_ + 'Mt-' + space_);
                            if (marginSliderListLocal[2][2])
                                $parent.addClass(dAlpha_ + 'Mr-' + space_);
                            if (marginSliderListLocal[3][2])
                                $parent.addClass(dAlpha_ + 'Mb-' + space_);
                            if (marginSliderListLocal[4][2])
                                $parent.addClass(dAlpha_ + 'Ml-' + space_);
                            if (!marginSliderListLocal[1][2] && !marginSliderListLocal[2][2] && !marginSliderListLocal[3][2] && !marginSliderListLocal[4][2]) {
                                $parent.addClass(dAlpha_ + 'Mt-' + space_);
                                $parent.addClass(dAlpha_ + 'Mr-' + space_);
                                $parent.addClass(dAlpha_ + 'Mb-' + space_);
                                $parent.addClass(dAlpha_ + 'Ml-' + space_);
                            }
                        } else {
                            space_ = Math.abs(space_);
                            space_ = space_ * times;
                            if (marginSliderListLocal[1][2])
                                $parent.addClass(dAlpha_ + 'MtN-' + space_);
                            if (marginSliderListLocal[2][2])
                                $parent.addClass(dAlpha_ + 'MrN-' + space_);
                            if (marginSliderListLocal[3][2])
                                $parent.addClass(dAlpha_ + 'MbN-' + space_);
                            if (marginSliderListLocal[4][2])
                                $parent.addClass(dAlpha_ + 'MlN-' + space_);
                            if (!marginSliderListLocal[1][2] && !marginSliderListLocal[2][2] && !marginSliderListLocal[3][2] && !marginSliderListLocal[4][2]) {
                                $parent.addClass(dAlpha_ + 'MtN-' + space_);
                                $parent.addClass(dAlpha_ + 'MrN-' + space_);
                                $parent.addClass(dAlpha_ + 'MbN-' + space_);
                                $parent.addClass(dAlpha_ + 'MlN-' + space_);
                            }
                        }
                    }
                }
            },
            MarginTop: function (space, $parent, ref) {
                if (ref && typeof ref['updateTargets'] === 'function') {
                    ref['updateTargets']();
                    $parent = targets;
                }
                if (space !== 'undefined' && typeof (space) !== 'undefined') {
                    let times = 1;
                    if (typeof ($self.find(`#OuterSpacingWrap${idSuffix}`).attr('data-times')) !== 'undefined')
                        times = parseInt($self.find(`#OuterSpacingWrap${idSuffix}`).attr('data-times'));
                    if (times == 0)
                        times = 1;
                    let parentClasses = GetTargetsClasses($parent);
                    let dAlpha = DeviceAlpha();
                    let regex = new RegExp('\\b' + dAlpha + 'Mt(N){0,1}-[0-9]{1,3}\\b', 'g');
                    let marginClass = parentClasses.match(regex);
                    if (marginClass !== null) {
                        $.each(marginClass, function (i, v) {
                            $parent.removeClass(v.trim());
                        });
                    }
                    if (dAlpha === "") {
                        let devices = DeviceList(parentClasses, '\\btMt(N){0,1}-[0-9]{1,3}\\b', '\\bmMt(N){0,1}-[0-9]{1,3}\\b');
                        let deviceLength = devices.length;
                        for (var i = 0; i < deviceLength; i++) {
                            ApplySpace(space, devices[i]);
                        }
                    } else {
                        ApplySpace(space, dAlpha);
                    }

                    function ApplySpace(space_, dAlpha_) {
                        if (space_ >= 0) {
                            $parent.addClass(dAlpha_ + 'Mt-' + space_ * times);
                        } else {
                            space_ = Math.abs(space_);
                            $parent.addClass(dAlpha_ + 'MtN-' + space_ * times);
                        }
                    }
                    _ResetBulkMarginSliderValue();
                }
            },
            MarginRight: function (space, $parent, ref) {
                if (ref && typeof ref['updateTargets'] === 'function') {
                    ref['updateTargets']();
                    $parent = targets;
                }
                if (space !== 'undefined' && typeof (space) !== 'undefined') {
                    let times = 1;
                    if (typeof ($self.find(`#OuterSpacingWrap${idSuffix}`).attr('data-times')) !== 'undefined')
                        times = parseInt($self.find(`#OuterSpacingWrap${idSuffix}`).attr('data-times'));
                    if (times == 0)
                        times = 1;
                    let parentClasses = GetTargetsClasses($parent);
                    let dAlpha = DeviceAlpha();
                    let regex = new RegExp('\\b' + dAlpha + 'Mr(N){0,1}-[0-9]{1,3}\\b', 'g');
                    let marginClass = parentClasses.match(regex);
                    if (marginClass !== null) {
                        $.each(marginClass, function (i, v) {
                            $parent.removeClass(v.trim());
                        });
                    }
                    if (dAlpha === "") {
                        let devices = DeviceList(parentClasses, '\\btMr(N){0,1}-[0-9]{1,3}\\b', '\\bmMr(N){0,1}-[0-9]{1,3}\\b');
                        let deviceLength = devices.length;
                        for (var i = 0; i < deviceLength; i++) {
                            ApplySpace(space, devices[i]);
                        }
                    } else {
                        ApplySpace(space, dAlpha);
                    }

                    function ApplySpace(space_, dAlpha_) {
                        if (space_ >= 0) {
                            $parent.addClass(dAlpha_ + 'Mr-' + space_ * times);
                        } else {
                            space_ = Math.abs(space_);
                            $parent.addClass(dAlpha_ + 'MrN-' + space_ * times);
                        }
                    }
                    _ResetBulkMarginSliderValue();
                }
            },
            MarginBottom: function (space, $parent, ref) {
                if (ref && typeof ref['updateTargets'] === 'function') {
                    ref['updateTargets']();
                    $parent = targets;
                }
                if (space !== 'undefined' && typeof (space) !== 'undefined') {
                    let times = 1;
                    if (typeof ($self.find(`#OuterSpacingWrap${idSuffix}`).attr('data-times')) !== 'undefined')
                        times = parseInt($self.find(`#OuterSpacingWrap${idSuffix}`).attr('data-times'));
                    if (times == 0)
                        times = 1;
                    let parentClasses = GetTargetsClasses($parent);
                    let dAlpha = DeviceAlpha();
                    let regex = new RegExp('\\b' + dAlpha + 'Mb(N){0,1}-[0-9]{1,3}\\b', 'g');
                    let marginClass = parentClasses.match(regex);
                    if (marginClass !== null) {
                        $.each(marginClass, function (i, v) {
                            $parent.removeClass(v.trim());
                        });
                    }
                    if (dAlpha === "") {
                        let devices = DeviceList(parentClasses, '\\btMb(N){0,1}-[0-9]{1,3}\\b', '\\bmMb(N){0,1}-[0-9]{1,3}\\b');
                        let deviceLength = devices.length;
                        for (var i = 0; i < deviceLength; i++) {
                            ApplySpace(space, devices[i]);
                        }
                    } else {
                        ApplySpace(space, dAlpha);
                    }

                    function ApplySpace(space_, dAlpha_) {
                        if (space_ >= 0) {
                            $parent.addClass(dAlpha_ + 'Mb-' + space_ * times);
                        } else {
                            space_ = Math.abs(space_);
                            $parent.addClass(dAlpha_ + 'MbN-' + space_ * times);
                        }
                    }
                    _ResetBulkMarginSliderValue();
                }
            },
            MarginLeft: function (space, $parent, ref) {
                if (ref && typeof ref['updateTargets'] === 'function') {
                    ref['updateTargets']();
                    $parent = targets;
                }
                if (space !== 'undefined' && typeof (space) !== 'undefined') {
                    let times = 1;
                    if (typeof ($self.find(`#OuterSpacingWrap${idSuffix}`).attr('data-times')) !== 'undefined')
                        times = parseInt($self.find(`#OuterSpacingWrap${idSuffix}`).attr('data-times'));
                    if (times == 0)
                        times = 1;
                    let parentClasses = GetTargetsClasses($parent);
                    let dAlpha = DeviceAlpha();
                    let regex = new RegExp('\\b' + dAlpha + 'Ml(N){0,1}-[0-9]{1,3}\\b', 'g');
                    let marginClass = parentClasses.match(regex);
                    if (marginClass !== null) {
                        $.each(marginClass, function (i, v) {
                            $parent.removeClass(v.trim());
                        });
                    }

                    if (dAlpha === "") {
                        let devices = DeviceList(parentClasses, '\\btMl(N){0,1}-[0-9]{1,3}\\b', '\\bmMl(N){0,1}-[0-9]{1,3}\\b');
                        let deviceLength = devices.length;
                        for (var i = 0; i < deviceLength; i++) {
                            ApplySpace(space, devices[i]);
                        }
                    } else {
                        ApplySpace(space, dAlpha);
                    }

                    function ApplySpace(space_, dAlpha_) {
                        if (space_ >= 0) {
                            $parent.addClass(dAlpha_ + 'Ml-' + space_ * times);
                        } else {
                            space_ = Math.abs(space_);
                            $parent.addClass(dAlpha_ + 'MlN-' + space_ * times);
                        }
                    }
                    _ResetBulkMarginSliderValue();
                }
            },
            LoadMarginSliderInitValue: function () {
                let times = 1;
                if (typeof ($self.find(`#OuterSpacingWrap${idSuffix}`).attr('data-times')) !== 'undefined')
                    times = parseInt($self.find(`#OuterSpacingWrap${idSuffix}`).attr('data-times'));
                if (times == 0)
                    times = 1;
                let parentClasses = $(targets[0]).attr('class');
                let $shadedLayer = targets.find('> .editor-row-shaded-layer');
                if ($shadedLayer.length > 0) {
                    parentClasses += " " + $shadedLayer.attr('class');
                } else {
                    //parentClasses = $(targets[0]).attr('class');
                }
                let dAlpha = DeviceAlpha();
                let regex = new RegExp('\\b' + dAlpha + 'Mt-[0-9]{1,3}\\b', 'g');
                let marginClass = parentClasses.match(regex);
                let margin = 0;
                if (marginClass !== null) {
                    margin = parseInt(marginClass[0].trim().replace(dAlpha + 'Mt-', ''));
                } else {
                    regex = new RegExp('\\b' + dAlpha + 'MtN-[0-9]{1,3}\\b', 'g');
                    marginClass = parentClasses.match(regex);
                    if (marginClass !== null) {
                        margin = -parseInt(marginClass[0].trim().replace(dAlpha + 'MtN-', ''));
                    }
                }
                margin = margin / times;
                marginSliderListLocal[1][4] = margin;
                regex = new RegExp('\\b' + dAlpha + 'Mr-[0-9]{1,3}\\b', 'g');
                marginClass = parentClasses.match(regex);
                margin = 0;
                if (marginClass !== null) {
                    margin = parseInt(marginClass[0].trim().replace(dAlpha + 'Mr-', ''));
                } else {
                    regex = new RegExp('\\b' + dAlpha + 'MrN-[0-9]{1,3}\\b', 'g');
                    marginClass = parentClasses.match(regex);
                    if (marginClass !== null) {
                        margin = -parseInt(marginClass[0].trim().replace(dAlpha + 'MrN-', ''));
                    }
                }
                margin = margin / times;
                marginSliderListLocal[2][4] = margin;
                regex = new RegExp('\\b' + dAlpha + 'Mb-[0-9]{1,3}\\b', 'g');
                marginClass = parentClasses.match(regex);
                margin = 0;
                if (marginClass !== null) {
                    margin = parseInt(marginClass[0].trim().replace(dAlpha + 'Mb-', ''));
                } else {
                    regex = new RegExp('\\b' + dAlpha + 'MbN-[0-9]{1,3}\\b', 'g');
                    marginClass = parentClasses.match(regex);
                    if (marginClass !== null) {
                        margin = -parseInt(marginClass[0].trim().replace(dAlpha + 'MbN-', ''));
                    }
                }
                margin = margin / times;
                marginSliderListLocal[3][4] = margin;
                regex = new RegExp('\\b' + dAlpha + 'Ml-[0-9]{1,3}\\b', 'g');
                marginClass = parentClasses.match(regex);
                margin = 0;
                if (marginClass !== null) {
                    margin = parseInt(marginClass[0].trim().replace(dAlpha + 'Ml-', ''));
                } else {
                    regex = new RegExp('\\b' + dAlpha + 'MlN-[0-9]{1,3}\\b', 'g');
                    marginClass = parentClasses.match(regex);
                    if (marginClass !== null) {
                        margin = -parseInt(marginClass[0].trim().replace(dAlpha + 'MlN-', ''));
                    }
                }
                margin = margin / times;
                marginSliderListLocal[4][4] = margin;
                let bulkMargin = false;
                let bulkMarginEnable = true;
                for (let i = 1; i < 5; i++) {
                    if (marginSliderListLocal[i][2]) {
                        if (bulkMargin === false)
                            bulkMargin = marginSliderListLocal[i][4];
                        else if (bulkMargin != marginSliderListLocal[i][4]) {
                            bulkMarginEnable = false;
                            break;
                        }
                    }
                }
                if (bulkMarginEnable) {
                    marginSliderListLocal[0][4] = bulkMargin;
                }
            },
            InitMarginEvents: function () {
                let self = this;
                this.LoadMarginSliderInitValue();
                let $outerSpaceWrap = $self.find(`#OuterSpacingWrap${idSuffix}`);
                if (typeof ($outerSpaceWrap.attr('data-max')) !== 'undefined' && typeof ($outerSpaceWrap.attr('data-min')) !== 'undefined') {
                    let maxValue = parseInt($outerSpaceWrap.attr('data-max'));
                    let minValue = parseInt($outerSpaceWrap.attr('data-min'));
                    for (let i = 0; i < 5; i++) {
                        if (marginSliderListLocal[i][2]) {
                            AdvanceSageSlider($self.find(`#${marginSliderListLocal[i][0]}${idSuffix}`), $self.find(`#${marginSliderListLocal[i][1]}${idSuffix}`), minValue, maxValue, marginSliderListLocal[i][4], self[marginSliderListLocal[i][3]], targets, 'px', self);
                        }
                    }
                }
            },
            BulkPadding: function (space, $parent, ref) {

                if (ref && typeof ref['updateTargets'] === 'function') {
                    ref['updateTargets']();
                    $parent = targets;
                }
                if (space !== 'undefined' && typeof (space) !== 'undefined') {
                    let times = 5;
                    if (typeof ($self.find(`#InnerSpacingWrap${idSuffix}`).attr('data-times')) !== 'undefined')
                        times = parseInt($self.find(`#InnerSpacingWrap${idSuffix}`).attr('data-times'));
                    if (times == 0)
                        times = 5;
                    let $shadedLayer = $parent.find('> .editor-row-shaded-layer');

                    if ($shadedLayer.length > 0) {
                        $parent = $shadedLayer;
                    }
                    let parentClasses = GetTargetsClasses($parent);
                    let dAlpha = DeviceAlpha();
                    let regex = new RegExp('\\b' + dAlpha + 'P[a-z]{0,1}-[0-9]{1,3}\\b', 'g');
                    let paddingClass = parentClasses.match(regex);
                    if (paddingClass !== null) {
                        $.each(paddingClass, function (i, v) {
                            $parent.removeClass(v.trim());
                        });
                    }

                    for (let i = 1; i < 5; i++) {
                        if (paddingSliderListLocal[i][2]) {
                            $self.find(`#${paddingSliderListLocal[i][0]}${idSuffix}`).slider('value', space);
                            $self.find(`#${paddingSliderListLocal[i][1]}${idSuffix}`).text(space);
                        }
                    }
                    if (dAlpha === "") {
                        let devices = [];
                        devices.push("");
                        let regex = new RegExp('\\btP[a-z]{0,1}-[0-9]{1,3}\\b', 'g');
                        let paddingClass = parentClasses.match(regex);
                        if (paddingClass === null) {
                            devices.push("t");
                        }
                        regex = new RegExp('\\bmP[a-z]{0,1}-[0-9]{1,3}\\b', 'g');
                        paddingClass = parentClasses.match(regex);
                        if (paddingClass === null) {
                            devices.push("m");
                        }
                        let deviceLength = devices.length;
                        for (var i = 0; i < deviceLength; i++) {
                            AddClass(devices[i], space);
                        }
                    } else {
                        AddClass(dAlpha, space);
                    }

                    function AddClass(device, space_) {
                        if (space_ >= 0) {
                            space_ = space_ * times;
                            if (paddingSliderListLocal[1][2])
                                $parent.addClass(device + 'Pt-' + space_);
                            if (paddingSliderListLocal[2][2])
                                $parent.addClass(device + 'Pr-' + space_);
                            if (paddingSliderListLocal[3][2])
                                $parent.addClass(device + 'Pb-' + space_);
                            if (paddingSliderListLocal[4][2])
                                $parent.addClass(device + 'Pl-' + space_);
                            if (!paddingSliderListLocal[1][2] && !paddingSliderListLocal[2][2] && !paddingSliderListLocal[3][2] && !paddingSliderListLocal[4][2]) {
                                $parent.addClass(device + 'Pt-' + space_);
                                $parent.addClass(device + 'Pr-' + space_);
                                $parent.addClass(device + 'Pb-' + space_);
                                $parent.addClass(device + 'Pl-' + space_);
                            }
                        }
                    }
                    if (ref && typeof ref['saveClasses'] === 'function') {
                        ref['saveClasses']();
                    }
                }
            },
            PaddingTop: function (space, $parent, ref) {
                if (ref && typeof ref['updateTargets'] === 'function') {
                    ref['updateTargets']();
                    $parent = targets;
                }
                if (space !== 'undefined' && typeof (space) !== 'undefined') {
                    let times = 1;
                    if (typeof ($self.find(`#InnerSpacingWrap${idSuffix}`).attr('data-times')) !== 'undefined')
                        times = parseInt($self.find(`#InnerSpacingWrap${idSuffix}`).attr('data-times'));
                    if (times == 0)
                        times = 1;
                    let $shadedLayer = $parent.find('> .editor-row-shaded-layer');
                    if ($shadedLayer.length > 0) {
                        $parent = $shadedLayer;
                    }
                    let parentClasses = GetTargetsClasses($parent);
                    let dAlpha = DeviceAlpha();
                    let regex = new RegExp('\\b' + dAlpha + 'Pt-[0-9]{1,3}\\b', 'g');
                    let paddingClass = parentClasses.match(regex);
                    if (paddingClass !== null) {
                        $.each(paddingClass, function (i, v) {
                            $parent.removeClass(v.trim());
                        });
                    }
                    if (dAlpha === "") {
                        let devices = DeviceList(parentClasses, '\\btPt-[0-9]{1,3}\\b', '\\bmPt-[0-9]{1,3}\\b');
                        let deviceLength = devices.length;
                        for (var i = 0; i < deviceLength; i++) {
                            $parent.addClass(devices[i] + 'Pt-' + space * times);
                        }
                    } else {
                        $parent.addClass(dAlpha + 'Pt-' + space * times);
                    }
                    if (ref && typeof ref['saveClasses'] === 'function') {
                        ref['saveClasses']();
                    }

                    _ResetBulkPaddingSliderValue();
                }
            },
            PaddingRight: function (space, $parent, ref) {
                if (ref && typeof ref['updateTargets'] === 'function') {
                    ref['updateTargets']();
                    $parent = targets;
                }
                if (space !== 'undefined' && typeof (space) !== 'undefined') {
                    let times = 1;
                    if (typeof ($self.find(`#InnerSpacingWrap${idSuffix}`).attr('data-times')) !== 'undefined')
                        times = parseInt($self.find(`#InnerSpacingWrap${idSuffix}`).attr('data-times'));
                    if (times == 0)
                        times = 1;
                    let $shadedLayer = $parent.find('> .editor-row-shaded-layer');
                    if ($shadedLayer.length > 0) {
                        $parent = $shadedLayer;
                    }
                    let parentClasses = GetTargetsClasses($parent);
                    let dAlpha = DeviceAlpha();
                    let regex = new RegExp('\\b' + dAlpha + 'Pr-[0-9]{1,3}\\b', 'g');
                    let paddingClass = parentClasses.match(regex);
                    if (paddingClass !== null) {
                        $.each(paddingClass, function (i, v) {
                            $parent.removeClass(v.trim());
                        });
                    }
                    if (dAlpha === "") {
                        let devices = DeviceList(parentClasses, '\\btPr-[0-9]{1,3}\\b', '\\bmPr-[0-9]{1,3}\\b');
                        let deviceLength = devices.length;
                        for (var i = 0; i < deviceLength; i++) {
                            $parent.addClass(devices[i] + 'Pr-' + space * times);
                        }
                    } else {
                        $parent.addClass(dAlpha + 'Pr-' + space * times);
                    }
                    if (ref && typeof ref['saveClasses'] === 'function') {
                        ref['saveClasses']();
                    }
                    _ResetBulkPaddingSliderValue();
                }
            },
            PaddingBottom: function (space, $parent, ref) {
                if (ref && typeof ref['updateTargets'] === 'function') {
                    ref['updateTargets']();
                    $parent = targets;
                }
                if (space !== 'undefined' && typeof (space) !== 'undefined') {
                    let times = 1;
                    if (typeof ($self.find(`#InnerSpacingWrap${idSuffix}`).attr('data-times')) !== 'undefined')
                        times = parseInt($self.find(`#InnerSpacingWrap${idSuffix}`).attr('data-times'));
                    if (times == 0)
                        times = 1;
                    let $shadedLayer = $parent.find('> .editor-row-shaded-layer');
                    if ($shadedLayer.length > 0) {
                        $parent = $shadedLayer;
                    }
                    let parentClasses = GetTargetsClasses($parent);
                    let dAlpha = DeviceAlpha();
                    let regex = new RegExp('\\b' + dAlpha + 'Pb-[0-9]{1,3}\\b', 'g');
                    let paddingClass = parentClasses.match(regex);
                    if (paddingClass !== null) {
                        $.each(paddingClass, function (i, v) {
                            $parent.removeClass(v.trim());
                        });
                    }
                    if (dAlpha === "") {
                        let devices = DeviceList(parentClasses, '\\btPb-[0-9]{1,3}\\b', '\\bmPb-[0-9]{1,3}\\b');
                        let deviceLength = devices.length;
                        for (var i = 0; i < deviceLength; i++) {
                            $parent.addClass(devices[i] + 'Pb-' + space * times);
                        }
                    } else {
                        $parent.addClass(dAlpha + 'Pb-' + space * times);
                    }
                    if (ref && typeof ref['saveClasses'] === 'function') {
                        ref['saveClasses']();
                    }
                    _ResetBulkPaddingSliderValue();
                }
            },
            PaddingLeft: function (space, $parent, ref) {
                if (ref && typeof ref['updateTargets'] === 'function') {
                    ref['updateTargets']();
                    $parent = targets;
                }
                if (space !== 'undefined' && typeof (space) !== 'undefined') {
                    let times = 1;
                    if (typeof ($self.find(`#InnerSpacingWrap${idSuffix}`).attr('data-times')) !== 'undefined')
                        times = parseInt($self.find(`#InnerSpacingWrap${idSuffix}`).attr('data-times'));
                    if (times == 0)
                        times = 1;
                    let $shadedLayer = $parent.find('> .editor-row-shaded-layer');
                    if ($shadedLayer.length > 0) {
                        $parent = $shadedLayer;
                    }
                    let parentClasses = GetTargetsClasses($parent);
                    let dAlpha = DeviceAlpha();
                    let regex = new RegExp('\\b' + dAlpha + 'Pl-[0-9]{1,3}\\b', 'g');
                    let paddingClass = parentClasses.match(regex);
                    if (paddingClass !== null) {
                        $.each(paddingClass, function (i, v) {
                            $parent.removeClass(v.trim());
                        });
                    }
                    if (dAlpha === "") {
                        let devices = DeviceList(parentClasses, '\\btPl-[0-9]{1,3}\\b', '\\bmPl-[0-9]{1,3}\\b');
                        let deviceLength = devices.length;
                        for (var i = 0; i < deviceLength; i++) {
                            $parent.addClass(devices[i] + 'Pl-' + space * times);
                        }
                    } else {
                        $parent.addClass(dAlpha + 'Pl-' + space * times);
                    }
                    if (ref && typeof ref['saveClasses'] === 'function') {
                        ref['saveClasses']();
                    }
                    _ResetBulkPaddingSliderValue();
                }
            },
            LoadPaddingSliderInitValue: function () {
                let times = 1;
                if (typeof ($self.find(`#InnerSpacingWrap${idSuffix}`).attr('data-times')) !== 'undefined')
                    times = parseInt($self.find(`#InnerSpacingWrap${idSuffix}`).attr('data-times'));
                if (times == 0)
                    times = 1;
                let padding = 0;
                let parentClasses = $(targets[0]).attr('class');
                let $shadedLayer = targets.find('> .editor-row-shaded-layer');
                if ($shadedLayer.length > 0) {
                    parentClasses += " " + $shadedLayer.attr('class');
                } else {
                    //parentClasses = $(targets[0]).attr('class');
                }
                let dAlpha = DeviceAlpha();
                let regex = new RegExp('\\b' + dAlpha + 'Pt-[0-9]{1,3}\\b', 'g');
                let paddingClass = '';
                if (typeof (parentClasses) !== "undefined") {
                    paddingClass = parentClasses.match(regex);
                    if (paddingClass !== null) {
                        padding = parseInt(paddingClass[0].trim().replace(dAlpha + 'Pt-', ''));
                    }
                }

                padding = padding / times;
                paddingSliderListLocal[1][4] = padding;
                if (typeof (parentClasses) !== "undefined") {
                    regex = new RegExp('\\b' + dAlpha + 'Pr-[0-9]{1,3}\\b', 'g');
                    paddingClass = parentClasses.match(regex);
                    padding = 0;
                    if (paddingClass !== null) {
                        padding = parseInt(paddingClass[0].trim().replace(dAlpha + 'Pr-', ''));
                    }
                }
                padding = padding / times;
                paddingSliderListLocal[2][4] = padding;
                if (typeof (parentClasses) !== "undefined") {
                    regex = new RegExp('\\b' + dAlpha + 'Pb-[0-9]{1,3}\\b', 'g');
                    paddingClass = parentClasses.match(regex);
                    padding = 0;
                    if (paddingClass !== null) {
                        padding = parseInt(paddingClass[0].trim().replace(dAlpha + 'Pb-', ''));
                    }
                }
                if (typeof (parentClasses) !== "undefined") {
                    padding = padding / times;
                    paddingSliderListLocal[3][4] = padding;
                    regex = new RegExp('\\b' + dAlpha + 'Pl-[0-9]{1,3}\\b', 'g');
                    paddingClass = parentClasses.match(regex);
                    padding = 0;
                    if (paddingClass !== null) {
                        padding = parseInt(paddingClass[0].trim().replace(dAlpha + 'Pl-', ''));
                    }
                }
                padding = padding / times;
                paddingSliderListLocal[4][4] = padding;
                let bulkPadding = false;
                let bulkPaddingEnable = true;
                for (let i = 1; i < 5; i++) {
                    if (paddingSliderListLocal[i][2]) {
                        if (bulkPadding === false)
                            bulkPadding = paddingSliderListLocal[i][4];
                        if (bulkPadding != paddingSliderListLocal[i][4]) {
                            bulkPaddingEnable = false;
                            break;
                        }
                    }
                }
                if (bulkPaddingEnable) {
                    paddingSliderListLocal[0][4] = bulkPadding;
                }
            },
            InitPaddingEvents: function () {
                let self = this;
                this.LoadPaddingSliderInitValue();
                let $outerSpaceWrap = $self.find(`#InnerSpacingWrap${idSuffix}`);
                if (typeof $outerSpaceWrap.attr('data-times') === 'undefined') {

                }
                if (typeof ($outerSpaceWrap.attr('data-max')) !== 'undefined' && typeof ($outerSpaceWrap.attr('data-min')) !== 'undefined') {
                    let maxValue = parseInt($outerSpaceWrap.attr('data-max'));
                    let minValue = parseInt($outerSpaceWrap.attr('data-min'));
                    for (let i = 0; i < 5; i++) {
                        if (paddingSliderListLocal[i][2]) {
                            AdvanceSageSlider($self.find(`#${paddingSliderListLocal[i][0]}${idSuffix}`), $self.find(`#${paddingSliderListLocal[i][1]}${idSuffix}`), minValue, maxValue, paddingSliderListLocal[i][4], self[paddingSliderListLocal[i][3]], targets, 'px', self);
                        }
                    }
                }
            },
            init: function () {
                let opts = Object.keys(options);
                let marginSet = false;
                let paddingSet = false;
                if (opts.indexOf("margin") > -1) {
                    marginSliderListLocal = [
                        ['bulkMarginSlider', 'bulkMarginHandler', false, 'BulkMargin', 0],
                        ['marginTopSlider', 'marginTopHandler', false, 'MarginTop', 0],
                        ['marginRightSlider', 'marginRightHandler', false, 'MarginRight', 0],
                        ['marginBottomSlider', 'marginBottomHandler', false, 'MarginBottom', 0],
                        ['marginLeftSlider', 'marginLeftHandler', false, 'MarginLeft', 0]
                    ];
                    marginSet = true;
                }
                if (opts.indexOf("padding") > -1) {
                    paddingSliderListLocal = [
                        ['bulkPaddingSlider', 'bulkPaddingHandler', false, 'BulkPadding', 0],
                        ['paddingTopSlider', 'paddingTopHandler', false, 'PaddingTop', 0],
                        ['paddingRightSlider', 'paddingRightHandler', false, 'PaddingRight', 0],
                        ['paddingBottomSlider', 'paddingBottomHandler', false, 'PaddingBottom', 0],
                        ['paddingLeftSlider', 'paddingLeftHandler', false, 'PaddingLeft', 0]
                    ];
                    paddingSet = true;
                }
                this.updateTargets();
                if (targets.length == 0) {
                    console.error("AdvanceSpacing => target does not exist");
                    return false;
                }
                this.appendSpacingDom();
                if (marginSet) {
                    this.InitMarginEvents();
                }
                if (paddingSet) {
                    this.InitPaddingEvents();
                }
            }
        };
        AdvanceSpacing.init();
    };
}(jQuery));
(function ($) {
    "use strict";
    $.fn.AdvanceTextSetting = function (o) {
        if (typeof o === 'undefined' || typeof o.targetParent === 'undefined') {
            console.error("AdvanceTextSetting => missing option: targetParent");
            return;
        }
        if (!(o.targetParent instanceof jQuery)) {
            console.error("AdvanceTextSetting => targetParent should be a jQuery object");
            return;
        }
        if (typeof o === 'undefined' || typeof o.targetElem === 'undefined') {
            console.error("AdvanceTextSetting => missing option: targetElem");
            return;
        }
        let $self = this,
            maxFontSize = maxFontsize,
            targetParent = o.targetParent,
            targetElem = o.targetElem,
            targets = $(targetParent).find(targetElem),
            fontWidthTarget = false,
            $textChange = $(targets[0]),
            idSuffix = '_' + Math.floor((Math.random() * 1000) + 100),
            options = {
                size: true,
                lineheight: true,
                width: true,
                spacing: true,
                transform: true,
                family: true,
                weight: true,
                color: true,
                style: true,
                heading: false
            },
            callback = {

            };
        if (typeof o.fontWidthTarget !== 'undefined' && o.fontWidthTarget) {
            fontWidthTarget = o.fontWidthTarget;
        }
        if (typeof o.options !== 'undefined' && o.options) {
            options = $.extend(options, o.options);
        }
        if (typeof o.callback != "undefined") {
            callback = o.callback;
        }
        if (options.size && typeof (options.maxFontSize) === 'number')
            maxFontSize = options.maxFontSize > 1080 ? 1080 : options.maxFontSize;
        if (options.heading && targetParent.hasClass('heading'))
            options.heading = true;
        else options.heading = false;
        if (DeviceAlpha() !== '') {
            $.extend(options, {
                transform: false,
                family: false,
                weight: false,
                color: false,
                heading: false,
                style: false
            });
        }
        let AdvanceTextSetting = {
            updateTargets: function () {
                targets = $(targetParent).find(targetElem);
                if (targets.length == 0) {
                    console.error("AdvanceTextSetting => target does not exists");
                    return false;
                }
                return true;
            },
            appendSettingDom: function () {
                let dom = ExternalFileDoms.txtbasictab;
                dom = this.fixDomId(dom);
                dom = this.fixOptions(dom);
                $self.html(dom);
            },
            fixOptions: function (dom) {
                let $dom = $(dom);
                Object.keys(options).forEach((k) => {
                    if (!options[k]) {
                        $dom.find('#textSet_' + k).addClass('Dn');
                    }
                });
                return $dom;
            },
            fixDomId: function (dom) {
                let ids = ['fontsizeSlider', 'fontsizeHandle', 'fontWidthSlider', 'fontWidthHandle', 'lineheightslider', 'lineheighthandle', 'letterSpacingSlider', 'letterSpacingHandle',
                    'textTransform', 'textStyle', 'textHeading', 'fontfamily', 'fontWeight', 'chooseFontColor'
                ];
                let $dom = $(dom);
                for (let i = 0, j = ids.length; i < j; i++) {
                    $dom.find('#' + ids[i]).removeAttr('id').attr('id', ids[i] + idSuffix);
                }
                return $dom;
            },
            setupFontSize: function () {
                let self = this;
                let parentClasses = $(targets[0]).attr('class');
                let dAlpha = DeviceAlpha();
                let regex = new RegExp('\\b' + dAlpha + 'Fs-[0-9]{1,4}\\b', 'g');
                let fontSizeClass = parentClasses.match(regex);
                let fontSize = 0;
                if (fontSizeClass !== null) {
                    fontSize = fontSizeClass[0].replace(dAlpha + 'Fs-', '');
                }
                //fontsize = parseInt(fontsize.replace('px', ''));
                AdvanceSageSlider($self.find(`#fontsizeSlider${idSuffix}`), $self.find(`#fontsizeHandle${idSuffix}`), minFontSize, maxFontSize, fontSize, self['FontSizeChange'], targets, 'px', self);
            },
            FontSizeChange: function (space, $parent, ref) {
                if (ref && typeof ref['updateTargets'] === 'function') {
                    ref['updateTargets']();
                    $parent = targets;
                }
                let dAlpha = DeviceAlpha();
                let regex = new RegExp('\\b' + dAlpha + 'Fs-[0-9]{1,4}\\b', 'g');
                let fontClass = GetTargetsClasses($parent);;
                fontClass = fontClass.match(regex);
                if (fontClass !== null) {
                    $.each(fontClass, function (i, v) {
                        $parent.removeClass(v.trim());
                    });
                }
                let newClass = dAlpha + 'Fs-' + space;
                if (dAlpha === "") {
                    let devices = DeviceList($parent.attr('class'), '\\btFs-[0-9]{1,4}\\b', '\\bmFs-[0-9]{1,4}\\b');
                    let deviceLength = devices.length;
                    for (var i = 0; i < deviceLength; i++) {
                        $parent.addClass(devices[i] + 'Fs-' + space);
                    }
                } else {
                    $parent.addClass(newClass);
                }
                CallFunction(callback, {
                    size: [newClass, space]
                });
            },
            setupLineHeight: function () {
                let self = this;
                let $parent = $(targets[0]);
                AdvanceSageSlider($self.find(`#lineheightslider${idSuffix}`), $self.find(`#lineheighthandle${idSuffix}`), 5, 200,
                    GetValueByClassName($parent, 'Lh-[0-9]{1,4}', 'Lh-'), self['LineHeightChange'], targets, 'px', self);
            },
            LineHeightChange: function (space, $parent, ref) {
                if (ref && typeof ref['updateTargets'] === 'function') {
                    ref['updateTargets']();
                    $parent = targets;
                }
                ReplaceClassByPattern($parent, 'Lh-[0-9]{1,4}', 'Lh-' + space);
                let newClass = DeviceAlpha() + 'Lh-' + space;
                CallFunction(callback, {
                    lineheight: [newClass, space]
                });
            },
            setupLetterSpacing: function () {
                let self = this;
                let dAlpha = ViewDeviceAlpha();
                let letterSpace = 0;
                let removeClass = '';
                //let $textChange = $(targets[0]);
                if (typeof ($textChange.attr('class')) !== 'undefined') {
                    let regexNeg = new RegExp('\\b' + dAlpha + 'LtrSpc-n-[0-9]{1,2}\\b', 'g');
                    let letterSpacingNegClass = $textChange.attr('class').match(regexNeg);
                    if (letterSpacingNegClass !== null) {
                        removeClass = letterSpacingNegClass[0].trim();
                        letterSpace = -parseInt(removeClass.replace(dAlpha + 'LtrSpc-n-', ''));
                    } else {
                        let regexPos = new RegExp('\\b' + dAlpha + 'LtrSpc-[0-9]{1,2}\\b', 'g');
                        let letterSpacingPosClass = $textChange.attr('class').match(regexPos);
                        if (letterSpacingPosClass !== null) {
                            removeClass = letterSpacingPosClass[0].trim();
                            letterSpace = parseInt(removeClass.replace(dAlpha + 'LtrSpc-', ''));
                        }
                    }
                }
                AdvanceSageSlider($self.find(`#letterSpacingSlider${idSuffix}`), $self.find(`#letterSpacingHandle${idSuffix}`), -20, 20, letterSpace, self['LetterSpaceChange'], targetParent, 'px', self);
            },
            LetterSpaceChange: function (space, $parent, ref) {
                if (ref && typeof ref['updateTargets'] === 'function') {
                    ref['updateTargets']();
                    $parent = targets;
                }
                let dAlpha = DeviceAlpha();
                let addClass = '';
                let removeClass = '';
                let spacingClasses = [];
                let negClass = '';
                let posClass = '';
                $parent.each(function (i, o) {
                    let regexn = new RegExp('\\b' + dAlpha + 'LtrSpc-n-[0-9]{1,2}\\b', 'g');
                    negClass = $(o).attr('class').match(regexn);
                    if (negClass !== null) {
                        spacingClasses.push(negClass[0]);
                    } else {
                        let regex = new RegExp('\\b' + dAlpha + 'LtrSpc-[0-9]{1,2}\\b', 'g');
                        posClass = $textChange.attr('class').match(regex);
                        if (posClass !== null) {
                            spacingClasses.push(posClass[0]);
                        }
                    }
                });
                if (space >= 0) {
                    addClass = dAlpha + 'LtrSpc-' + space;
                } else {
                    space = Math.abs(space);
                    addClass = dAlpha + 'LtrSpc-n-' + space;
                }
                $parent.removeClass(spacingClasses.join(' ')).addClass(addClass);

                CallFunction(callback, {
                    spacing: [addClass, space]
                });
            },
            setupTransformation: function () {
                let self = this;
                let trasformValue = '';
                if ($textChange.hasClass('txU')) {
                    trasformValue = 'txU';
                } else if ($textChange.hasClass('txL')) {
                    trasformValue = 'txL';
                } else if ($textChange.hasClass('txC')) {
                    trasformValue = 'txC';
                }
                $self.find(`#textTransform${idSuffix}`).val(trasformValue);
                $self.find(`#textTransform${idSuffix}`).off().on('change', function () {
                    let tranformCase = $(this).val();
                    let addClass = '';
                    switch (tranformCase) {
                        case 'txU':
                            addClass = 'txU';
                            targets.removeClass('txC').removeClass('txL');
                            break;
                        case 'txL':
                            addClass = 'txL';
                            targets.removeClass('txC').removeClass('txU');
                            break;
                        case 'txC':
                            addClass = 'txC';
                            targets.removeClass('txL').removeClass('txU');
                            break;
                        case '':
                            targets.removeClass('txC').removeClass('txL').removeClass('txU');
                            break;

                    }
                    targets.addClass(addClass);
                    CallFunction(callback, {
                        transform: [addClass]
                    });
                });
            },
            setupFontStyle: function () {
                //loadStyleSetting('FwB');
                //loadStyleSetting('FsI');
                //loadStyleSetting('TdU');
                //loadStyleSetting('TdS');
                let fontStyleArray = ['FsI', 'TdU', 'TdS'];
                let removeFontStyle = ['FsN', 'TdN', 'TdN'];
                $.each(fontStyleArray, function (index, value) {
                    loadStyleSetting(value);
                });

                function loadStyleSetting(styleName) {
                    if ($textChange.hasClass(styleName))
                        $self.find(`#textStyle${idSuffix} [data-name="${styleName}"]`).addClass("selected");
                    else
                        $self.find(`#textStyle${idSuffix} [data-name="${styleName}"]`).removeClass("selected");
                }

                $self.find(`#textStyle${idSuffix} i`).off("click").on("click", function () {
                    let _this = $(this);
                    let fontStyleType = _this.attr("data-name");
                    checkExistingEle(fontStyleType);
                    _this.toggleClass("selected");
                    let indexOfStyle = fontStyleArray.indexOf(fontStyleType);
                    if (_this.hasClass("selected"))
                        targets.removeClass(removeFontStyle[indexOfStyle]).addClass(fontStyleArray[indexOfStyle]);
                    else targets.removeClass(fontStyleArray[indexOfStyle]).addClass(removeFontStyle[indexOfStyle]);
                    //targets.toggleClass(fontStyleType);
                    let addClass = '';
                    CallFunction(callback, {
                        textStyle: [addClass]
                    });
                });

                function checkExistingEle(dataClass) {
                    if (dataClass !== 'TdU' && dataClass !== 'TdS')
                        return;
                    let removeElement = '';
                    if (dataClass === 'TdU')
                        removeElement = 'TdS';
                    else if (dataClass === 'TdS')
                        removeElement = 'TdU';
                    targets.removeClass(removeElement);
                    $self.find(`#textStyle${idSuffix} [data-name=${removeElement}]`).removeClass('selected');
                }
            },
            setupHeadingTag: function () {
                let self = this;
                let dAlpha = ViewDeviceAlpha();
                let headingOption = o.options.headingEle;
                let headingTagColl = ["h1", "h2", "h3", "h4", "h5", "h6"];
                let fontSize = ["32", "24", "18", "16", "13", "12"];
                let tFontSize = ["24", "18", "13", "12", "10", "9"];
                let mFontSize = ["16", "12", "9", "8", "7", "6"];
                if (typeof (headingOption) !== "undefined" && headingOption.target !== undefined && $(targetParent).find(headingOption.target).length > 0) {
                    let headingTag = headingOption.tag;
                    let $targetEle = $(targetParent).find(headingOption.target);
                    let selectOptions = "";
                    if (headingTag !== undefined) {
                        selectOptions = self.createHeadingOption(headingTag, headingTagColl)
                    } else selectOptions = self.createHeadingOption(headingTagColl);
                    $(`#textHeading${idSuffix}`).html(selectOptions);

                    let currentHeading = $targetEle[0].nodeName.toLowerCase();
                    $(`#textHeading${idSuffix}`).val(currentHeading);

                    $(`#textHeading${idSuffix}`).off('change').on('change', function () {
                        let newHeading = $(this).val();
                        let addClass = '';
                        let indexOfNewTag = $.inArray(newHeading.toLowerCase(), headingTagColl);
                        if (indexOfNewTag > -1) {
                            let prevEle = $(targetParent).find(headingOption.target);
                            if (prevEle !== undefined)
                                $.each(prevEle, function (i, eleName) {
                                    let regex = new RegExp('\\b[a-z]{0,1}Fs-[0-9]{1,4}\\b', 'g');
                                    let fontSizeRegex = new RegExp('\\b' + dAlpha + 'Fs-[0-9]{1,4}\\b', 'g');
                                    let classes = $(eleName).attr("class").match(regex);
                                    if (classes !== null)
                                        $.each(classes, function (i, o) {
                                            $(eleName).removeClass(o);
                                        });
                                    addClass = `Fs-${fontSize[indexOfNewTag]} tFs-${tFontSize[indexOfNewTag]} mFs-${mFontSize[indexOfNewTag]}`
                                    let attributes = [];
                                    $.each(eleName.attributes, function (index, node) {
                                        attributes.push(`${node.nodeName}="${node.nodeValue}"`);
                                    });
                                    let html = $(targetParent).find(eleName).html();
                                    $(eleName).replaceWith(`<${newHeading} ${attributes.join(" ")}>${html}</${newHeading}>`);
                                    targets = $(targetParent).find(targetElem)
                                    targets.addClass(addClass);
                                    $('#textSet_size .manualSize').remove();
                                    self.setupFontSize();
                                    $(`#fontsizeHandle${idSuffix}`).text(parseInt(addClass.match(fontSizeRegex)[0].replace(dAlpha + 'Fs-', '')));
                                });
                        } else console.log("AdvanceTextSetting=> Heading=> target doesnot match");
                    });
                } else {
                    console.log("AdvanceTextSetting => Heading target doesn't exist");
                    return false;
                }

            },
            createHeadingOption: function (tegEle, tagList) {
                let DOM = "";
                $.each(tegEle, function (i, value) {
                    let tagName = value.toUpperCase();
                    if (typeof (tagList) !== "undefined") {
                        if ($.inArray(value.toLowerCase(), tagList) > -1)
                            DOM += `<option value="${value}">${tagName}</option>`;
                    } else
                        DOM += `<option value="${value}">${tagName}</option>`;
                });
                return DOM;
            },
            setupFontWidth: function () {
                let self = this;
                let fontWidth = 100;
                let $parent = $(targets[0]).parent();
                let dAlpha = DeviceAlpha();
                let reg = new RegExp('\\b' + dAlpha + 'sfCol_[0-9]{1,3}\\b', 'g');
                let $parentWidthClass = $parent.attr('class').match(reg);
                if ($parentWidthClass !== null) {
                    fontWidth = parseInt($parentWidthClass[0].replace(dAlpha + 'sfCol_', ''));
                    $self.find(`#fontWidthSlider${idSuffix}`).closest('.field-row').show();
                } else {
                    fontWidth = 100;
                    //$self.find(`#fontWidthSlider${idSuffix}`).closest('.field-row').hide();
                }
                AdvanceSageSlider($self.find(`#fontWidthSlider${idSuffix}`), $self.find(`#fontWidthHandle${idSuffix}`), 1, 100, fontWidth, self['FontWidthChange'], targets, '%', self);
            },
            FontWidthChange: function (space, $parent, ref) {
                if (ref && typeof ref['updateTargets'] === 'function') {
                    ref['updateTargets']();
                    $parent = targets;
                }
                let $widthTargets = $parent;
                if (fontWidthTarget) {
                    $widthTargets = $(fontWidthTarget);
                } else {
                    $widthTargets = $parent.parent();
                }
                let widthClasses = [];
                let $parentWidth = '';
                let dAlpha = DeviceAlpha();
                let reg = new RegExp('\\b' + dAlpha + 'sfCol_[0-9]{1,3}\\b', 'g');
                $widthTargets.each(function (i, o) {
                    $parentWidth = $(o).attr('class').match(reg);
                    if ($parentWidth !== null) {
                        widthClasses.push($parentWidth[0]);
                    }
                });
                $widthTargets.removeClass(widthClasses.join(' '));

                let newClass = DeviceAlpha() + 'sfCol_' + space;
                $widthTargets.addClass(newClass);

                CallFunction(callback, {
                    width: [newClass, space]
                });
            },
            setupFontFamilyWeight: function () {
                let self = this;
                let $fontFamily = $self.find(`#fontfamily${idSuffix}`);
                let $fontWeight = $self.find(`#fontWeight${idSuffix}`);

                $fontFamily.html(DOMFontAdvanceCollection());
                let defaultFontFamily = 'montserrat';
                let classesList = $textChange.attr('class');
                if (typeof (classesList) !== "undefined") {
                    //fonts
                    let fontClasses = classesList.match(/ff-(\w+)/g);
                    if (fontClasses !== null) {
                        defaultFontFamily = fontClasses[0].toLowerCase().replace('ff-', '');
                        if (defaultFontFamily === 'null') {
                            defaultFontFamily = 'montserrat';
                        }
                    }
                }
                $fontFamily.val(defaultFontFamily);
                self.fontWeight(defaultFontFamily);

                if (typeof (classesList) !== "undefined") {
                    //weight
                    let weightClasses = classesList.match(/f-weight-[0-9]{0,3}/g);
                    if (weightClasses !== null) {
                        $fontWeight.val(weightClasses[0].replace('f-weight-', ''));
                    }
                }
                $fontWeight.off().on('change', function () {
                    self.updateTargets();
                    let weightClasses = [];
                    targets.each(function (i, o) {
                        let weightClass = $(o).attr('class').match(/f-weight-[0-9]{0,3}/g);
                        if (weightClass !== null) {
                            weightClasses.push(weightClass[0]);
                        }
                    });
                    let wt = 'f-weight-' + $(this).val();
                    targets.removeClass(weightClasses.join(' ')).addClass(wt);

                    CallFunction(callback, {
                        weight: [wt]
                    });

                });
                $fontFamily.off().on('change', function () {
                    self.updateTargets();
                    //let classList = $textChange.attr('class');
                    //if (typeof (classesList) !== "undefined") {
                    //    let fontClass = classList.match(/ff-(\w+)/g);
                    //    if (fontClass !== null) {
                    //        targets.removeClass(fontClass[0]);
                    //    }
                    //}

                    //fix to apply font when target has own font setting
                    targets.each(function (i, t) {
                        let fontClass = $(t).attr('class').match(/ff-(\w+)/g);
                        if (fontClass !== null) {
                            $(t).removeClass(fontClass[0].toLowerCase());
                        }
                    });
                    let fam = 'ff-' + $(this).val().toLowerCase();
                    targets.addClass(fam);
                    self.fontWeight($(this).val());
                    $self.find(`#fontWeight${idSuffix}`).trigger('change');

                    CallFunction(callback, {
                        family: [fam]
                    })
                });
            },
            fontWeight: function (fontName) {
                let fontDOM = DOMFontWeight(fontName);
                if (fontDOM.length > 0) {
                    $self.find(`#fontWeight${idSuffix}`).html(fontDOM);
                }
            },
            setupColor: function () {
                let self = this;
                let $color = $self.find(`#chooseFontColor${idSuffix}`);
                $color.css('background-color', $textChange.css('color'));
                let colorPickerOption = ColorPickerOption({
                    renderCallback: function ($elm, toggled) {
                        let objColor = RenderCallBackColor(this);
                        if (typeof o.colorCallBack == 'function')
                            o.colorCallBack(objColor);
                        self.updateTargets();
                        targets.css({
                            'color': objColor.bgColor
                        });

                        CallFunction(callback, {
                            color: [objColor.bgColor]
                        })
                    }
                });
                $color.colorPicker(colorPickerOption);
            },
            init: function () {
                if (targets.length == 0) {
                    console.error("AdvanceTextSetting => target does not exist");
                    return false;
                }
                this.appendSettingDom();
                if (options.size)
                    this.setupFontSize();
                if (options.lineheight)
                    this.setupLineHeight();
                if (options.spacing)
                    this.setupLetterSpacing();
                if (options.transform)
                    this.setupTransformation();
                if (options.width)
                    this.setupFontWidth();
                if (options.weight)
                    this.setupFontFamilyWeight();
                if (options.color)
                    this.setupColor();
                if (options.style)
                    this.setupFontStyle();
                if (options.heading)
                    this.setupHeadingTag();
            }
        };
        AdvanceTextSetting.init();
    };
}(jQuery));
(function ($) {
    "use strict";
    $.fn.AdvanceAlignment = function (o) {
        if (typeof o === 'undefined' || typeof o.targetParent === 'undefined') {
            console.error("AdvanceAlignment => missing option: targetParent");
            return;
        }
        if (!(o.targetParent instanceof jQuery)) {
            console.error("AdvanceAlignment => targetParent should be a jQuery object");
            return;
        }
        if (typeof o === 'undefined' || typeof o.targetElem === 'undefined') {
            console.error("AdvanceAlignment => missing option: targetElem");
            return;
        }
        let $self = this,
            targetParent = o.targetParent,
            targetElem = o.targetElem,
            targets = $(targetParent).find(targetElem),
            labels = {
                'horizontal': 'Horizontal Alignment',
                'vertical': 'Vertical Alignment'
            },
            options = {
                'horizontal': ["left", "center", "right"],
                'vertical': ["top", "middle", "bottom"]
            };
        if (typeof o.options !== 'undefined' && o.options) {
            options = o.options;
        } else {
            options = {
                'horizontal': ["left", "center", "right"]
            };
        }
        if (typeof o.isvertical !== 'undefined' && o.isvertical === true) {
            options = {
                'vertical': ["top", "middle", "bottom"]
            };
        }
        if (typeof o.labels !== 'undefined' && o.labels) {
            Object.keys(labels).forEach((k) => {
                if (typeof o.labels[k] !== 'undefined') {
                    labels[k] = o.labels[k];
                }
            });
        }
        let AdvanceAlignment = {
            updateTargets: function () {
                let tar = UpdateTargets(targetParent, targetElem, 'AdvanceBackground');
                targets = tar.target;
                return tar.exists;
            },
            appendDOM: function () {
                let dom = this.getAlignmentDOM();
                $self.html(dom);
            },
            getAlignmentDOM: function () {
                let alignTotalDOM = '';
                if (EasyLibrary.IsDefined(options)) {
                    let alignDOM = '';
                    if (EasyLibrary.IsDefined(options.horizontal) && options.horizontal.length > 0) {
                        let optionLen = options.horizontal.length;
                        for (var i = 0; i < optionLen; i++) {
                            alignDOM += DOMCreate('i', '', 'cb-algn-' + options.horizontal[i].substring(0, 1), '', ['data-class="TxAl-' + options.horizontal[i].substring(0, 1) + '"']);
                        }
                        alignDOM += DOMCreate('i', '', 'cb-algn-n', '', ['data-class="TxAl-n"']);
                        alignDOM = DOMCreate('span', alignDOM, 'alignmentHWrapper');
                        alignDOM = FieldRowDOMCreateCol100(DOMCreate('label', labels.horizontal)) + FieldRowDOMCreateCol100(alignDOM);
                    }
                    alignTotalDOM = alignDOM;
                    alignDOM = '';
                    if (EasyLibrary.IsDefined(options.vertical) && options.vertical.length > 0) {
                        let optionLen = options.vertical.length;
                        for (var i = 0; i < optionLen; i++) {
                            alignDOM += DOMCreate('i', '', 'cb-v-algn-' + options.vertical[i].substring(0, 1), '', ['data-class="TxAl-' + options.vertical[i].substring(0, 1) + '"']);
                        }
                        alignDOM += DOMCreate('i', '', 'cb-v-algn-o', '', ['data-class="TxAl-o"']);
                        alignDOM = DOMCreate('span', alignDOM, 'alignmentVWrapper');
                        alignDOM = FieldRowDOMCreateCol100(DOMCreate('label', labels.vertical)) + FieldRowDOMCreateCol100(alignDOM);
                    }
                    alignTotalDOM = alignTotalDOM + alignDOM;
                }
                return alignTotalDOM;
            },
            setup: function () {
                let $parent = $(targets[0]);
                let parentClasses = $parent.attr('class');
                if (typeof (parentClasses) !== "undefined") {
                    let dAlpha = DeviceAlpha();
                    let regex = new RegExp('\\b' + dAlpha + 'TxAl-[a-z]\\b', 'g');
                    let alignmentClasses = parentClasses.match(regex);
                    if (alignmentClasses !== null) {
                        switch (alignmentClasses.length) {
                            case 2:
                                if (dAlpha.length > 0) {
                                    alignmentClasses[1] = alignmentClasses[1].slice(1);
                                }
                                $self.find('.alignmentHWrapper').find(`i[data-class="${alignmentClasses[1]}"]`).addClass('selected');
                                $self.find('.alignmentVWrapper').find(`i[data-class="${alignmentClasses[1]}"]`).addClass('selected');
                            //here is no break because if the length is 2 then first also need to be checked.
                            case 1:
                                if (dAlpha.length > 0) {
                                    alignmentClasses[0] = alignmentClasses[0].slice(1);
                                }
                                $self.find('.alignmentHWrapper').find(`i[data-class="${alignmentClasses[0]}"]`).addClass('selected');
                                $self.find('.alignmentVWrapper').find(`i[data-class="${alignmentClasses[0]}"]`).addClass('selected');
                                break;
                        }
                    }
                }
            },
            addEventListeners: function () {
                let self = this;
                $self.find('.alignmentHWrapper i').on('click', function () {
                    self.updateTargets();
                    let $this = $(this);
                    let dAlpha = DeviceAlpha();
                    targets.removeClass(dAlpha + 'TxAl-l').removeClass(dAlpha + 'TxAl-c').removeClass(dAlpha + 'TxAl-r').removeClass(dAlpha + 'TxAl-n');
                    targets.addClass(dAlpha + $this.attr('data-class'));
                    $self.find('.alignmentHWrapper i').removeClass('selected');
                    $this.addClass('selected');
                });
                $self.find('.alignmentVWrapper i').on('click', function () {
                    self.updateTargets();
                    let $this = $(this);
                    let dAlpha = DeviceAlpha();
                    targets.removeClass(dAlpha + 'TxAl-t').removeClass(dAlpha + 'TxAl-m').removeClass(dAlpha + 'TxAl-b').removeClass(dAlpha + 'TxAl-o');
                    targets.addClass(dAlpha + $this.attr('data-class'));
                    $self.find('.alignmentVWrapper i').removeClass('selected');
                    $this.addClass('selected');
                });
            },
            init: function () {
                this.appendDOM();
                this.setup();
                this.addEventListeners();
            }
        };
        AdvanceAlignment.init();
    };
}(jQuery));
(function ($) {
    "use strict";
    $.fn.AdvanceWidthSlider = function (o) {
        if (typeof o === 'undefined' || typeof o.targetParent === 'undefined') {
            console.error("AdvanceWidthSlider => missing option: targetParent");
            return;
        }
        if (!(o.targetParent instanceof jQuery)) {
            console.error("AdvanceWidthSlider => targetParent should be a jQuery object");
            return;
        }
        if (typeof o === 'undefined' || typeof o.targetElem === 'undefined') {
            console.error("AdvanceWidthSlider => missing option: targetElem");
            return;
        }
        let self = this;
        let sliderID = 'advWidthSlider_' + Math.floor((Math.random() * 100) + 1);
        let sliderHndlr = 'h_' + sliderID;
        let html = '<div class="field-row stElWrap col100">';
        html += '<span class="range__slider fCol" >';
        html += '<div id="' + sliderID + '" >';
        html += '<div title="Width" class="ui-slider-handle" id="' + sliderHndlr + '">100</div></div></span></div>';
        self.html(html);
        let targetParent = o.targetParent;
        let targetElem;
        if ((o.targetElem instanceof jQuery) && o.targetParent[0] == o.targetElem[0]) {
            targetElem = o.targetElem;
        } else {
            targetElem = targetParent.find(o.targetElem);
        }
        let parentClasses = targetElem.eq(0).attr('class');
        let dAlpha = DeviceAlpha();
        let regex = new RegExp('\\b' + dAlpha + 'sfCol_[0-9]{1,3}\\b', 'g');
        let sfWidth = parentClasses.match(regex);
        let width = 100;
        if (sfWidth !== null) {
            width = sfWidth[0].split('_')[1];
        }

        function ResponsiveWidth(space, targetElem) {
            regex = new RegExp('\\b' + dAlpha + 'sfCol_[0-9]{1,3}\\b', 'g');
            parentClasses = targetElem.attr('class');
            let sfWidth = parentClasses.match(regex);
            if (sfWidth !== null) {
                targetElem.removeClass(sfWidth[0]);
            }
            targetElem.addClass(dAlpha + 'sfCol_' + space);
        }
        AdvanceSageSlider($('#' + sliderID), $('#' + sliderHndlr), 1, 100, width, ResponsiveWidth, targetElem, 'px');
    };
}(jQuery));
(function ($) {
    "use strict";
    $.fn.AdvanceSorting = function (o) {
        if (typeof o === 'undefined' || typeof o.targetParent === 'undefined') {
            console.error("AdvanceSorting => missing option: targetParent");
            return;
        }
        if (!(o.targetParent instanceof jQuery)) {
            console.error("AdvanceSorting => targetParent should be a jQuery object");
            return;
        }
        if (typeof o === 'undefined' || typeof o.targetElem === 'undefined') {
            console.error("AdvanceSorting => missing option: targetElem");
            return;
        }
        let $this = this,
            targetParent = o.targetParent,
            targetElem = o.targetElem,
            def_sort_opt = {
                placeholder: "ui-state-highlight",
                forcePlaceholderSize: true,
                forceHelperSize: true,
                tolerance: "pointer"
            };
        let sortable_options = $.extend(def_sort_opt, o.sortableOptions);
        if (typeof sortable_options.start === 'undefined') {
            sortable_options.start = function (event, ui) {
                ui.item.startPos = ui.item.index();
            };
        } else {
            sortable_options.activate = function (event, ui) {
                ui.item.startPos = ui.item.index();
            };
        }
        //console.log("sortable_options ", sortable_options);
        if (typeof sortable_options.stop === 'undefined') {
            sortable_options.stop = function (event, ui) {
                let targetElems = targetElem;
                if (Object.prototype.toString.call(targetElem) !== '[object Array]') {
                    targetElems = [targetElem];
                }
                let oldPos = ui.item.startPos;
                let newPos = ui.item.index();
                if (oldPos != newPos) {
                    targetElems.forEach((elm) => {
                        let targets = $(targetParent).find(elm);
                        let $newPosEl = targets.eq(newPos);
                        let $oldPosEl = targets.eq(oldPos);
                        if (oldPos > newPos) {
                            $oldPosEl.insertBefore($newPosEl);
                        } else {
                            $oldPosEl.insertAfter($newPosEl);
                        }
                    });
                }
                if (typeof sortable_options.afterSort === 'function') {
                    sortable_options.afterSort();
                }
            };
        }
        $this.sortable(sortable_options);
    };
}(jQuery));
(function ($) {
    "use strict";
    $.fn.AdvanceBorder = function (o) {
        if (typeof o === 'undefined' || typeof o.targetParent === 'undefined') {
            console.error("AdvanceBorder => missing option: targetParent");
            return;
        }
        if (!(o.targetParent instanceof jQuery)) {
            console.error("AdvanceBorder => targetParent should be a jQuery object");
            return;
        }
        if (typeof o === 'undefined' || typeof o.targetElem === 'undefined') {
            console.error("AdvanceBorder => missing option: targetElem");
            return;
        }
        let $self = this,
            targetParent = o.targetParent,
            targetElem = o.targetElem,
            targets = $(targetParent).find(targetElem),
            idSuffix = '_' + Math.floor((Math.random() * 1000) + 100),
            options = {
                "max": 20,
                "min": 0,
                "times": 1,
                "position": ["all", "top", "right", "bottom", "left"],
            };
        let initialData = {
            on: 'none',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            tc: '',
            lc: '',
            bc: '',
            rc: '',
        };
        let borderSliderListLocal = [];
        if (typeof o.options !== 'undefined' && o.options) {
            options = o.options;
        }
        let AdvanceBorder = {
            updateTargets: function () {
                let tar = UpdateTargets(targetParent, targetElem, 'AdvanceBackground');
                targets = tar.target;
                return tar.exists;
            },
            appendDOM: function () {
                let bgChDom = this.GeneralBorderDOM(options);
                bgChDom = this.fixDomId(bgChDom);
                $self.html(bgChDom);
            },
            GeneralBorderDOM: function ($options) {
                let borderDOM = '';
                if (typeof ($options !== 'undefined')) {
                    borderDOM += DOMCreate('h4', 'Border', '', 'borderWrapper', ['data-min="' + $options['min'] + '"', 'data-max="' + $options['max'] + '"', 'data-times="' + $options['times'] + '"', "style='display:none;'"]);
                    let selectDOM = DOMCreate('label', 'Border Style', 'fCol') + '<span class="fCol TxAl-r select__box">' + SelectDOMCreate('borderStyle', 'BorderStyle', [
                        ['none', 'None'],
                        ['solid', 'Solid'],
                        ['dashed', 'Dashed'],
                        ['dotted', 'Dotted'],
                        ['double', 'Double']
                    ]) + '</span>';
                    borderDOM += FieldRowDOMCreateCol50_50(selectDOM);
                    let borderSliderCollection = '';
                    let positionList = $options['position'];
                    let positionLength = positionList.length;
                    for (let i = 0; i < positionLength; i++) {
                        switch (positionList[i].toLowerCase()) {
                            case 'all':
                                borderSliderCollection += CreateSliderWithColorDOM(borderSliderListLocal[0][0], borderSliderListLocal[0][1], 'Bulk Border', borderSliderListLocal[0][5], 'borderColorChoose');
                                borderSliderListLocal[0][2] = true;
                                break;
                            case 'top':
                                borderSliderCollection += CreateSliderWithColorDOM(borderSliderListLocal[1][0], borderSliderListLocal[1][1], 'Top Border', borderSliderListLocal[1][5], 'borderColorChoose');
                                borderSliderListLocal[1][2] = true;
                                break;
                            case 'right':
                                borderSliderCollection += CreateSliderWithColorDOM(borderSliderListLocal[2][0], borderSliderListLocal[2][1], 'Right Border', borderSliderListLocal[2][5], 'borderColorChoose');
                                borderSliderListLocal[2][2] = true;
                                break;
                            case 'bottom':
                                borderSliderCollection += CreateSliderWithColorDOM(borderSliderListLocal[3][0], borderSliderListLocal[3][1], 'Bottom Border', borderSliderListLocal[3][5], 'borderColorChoose');
                                borderSliderListLocal[3][2] = true;
                                break;
                            case 'left':
                                borderSliderCollection += CreateSliderWithColorDOM(borderSliderListLocal[4][0], borderSliderListLocal[4][1], 'Left Border', borderSliderListLocal[4][5], 'borderColorChoose');
                                borderSliderListLocal[4][2] = true;
                                break;
                        }
                    }
                    borderSliderCollection = DOMCreate('div', borderSliderCollection, 'borderSliderCollection', '', ['style="display:none;"']);
                    borderDOM = FieldRowDOMCreate(borderDOM + borderSliderCollection);
                }
                return borderDOM;
            },
            fixDomId: function (dom) {
                let ids = ['borderWrapper', 'borderStyle', 'bulkBorderSlider', 'borderTopSlider', 'borderRightSlider', 'borderBottomSlider', 'borderLeftSlider',
                    'bulkBorderHandler', 'borderTopHandler', 'borderRightHandler', 'borderBottomHandler', 'borderLeftHandler',
                    'bulkBorderColor', 'topBorderColor', 'rightBorderColor', 'bottomBorderColor', 'leftBorderColor'
                ];
                let $dom = $(dom);
                for (let i = 0, j = ids.length; i < j; i++) {
                    $dom.find('#' + ids[i]).removeAttr('id').attr('id', ids[i] + idSuffix);
                }
                return $dom[0];
            },
            setup: function () {
                if (typeof (targets[0]) !== "undefined") {
                    let $parent = $(targets[0]);
                    let prevhovereffect = $parent.attr('data-prevhovereffect');
                    if (typeof prevhovereffect !== 'undefined') {
                        let tmpEff = JSON.parse(prevhovereffect);
                        if (tmpEff.border) {
                            initialData = tmpEff.border;
                        }
                    } else if (typeof (targets[0].style) !== "undefined") {
                        let borderStyle = targets[0].style.borderStyle;
                        if (borderStyle.length == 0)
                            borderStyle = 'none';
                        initialData.on = borderStyle;
                        initialData.top = $parent.css('border-top-width');
                        initialData.left = $parent.css('border-left-width');
                        initialData.bottom = $parent.css('border-bottom-width');
                        initialData.right = $parent.css('border-right-width');
                        initialData.tc = $parent.css('border-top-color');
                        initialData.lc = $parent.css('border-left-color');
                        initialData.bc = $parent.css('border-bottom-color');
                        initialData.rc = $parent.css('border-right-color');
                    }
                    $self.find(`#borderStyle${idSuffix}`).val(initialData.on);
                    if (initialData.on == 'none') {
                        $self.find('.borderSliderCollection').hide();
                    } else {
                        $self.find('.borderSliderCollection').show();
                    }
                    this.LoadBorderInitialValue();
                    this.LoadBorderColor();
                }
            },
            addEventListeners: function () {
                let self = this;
                $self.find(`#borderStyle${idSuffix}`).on('change', function () {
                    self.updateTargets();
                    let style = $(this).val();
                    targets.css('border-style', style);
                    if (style === 'none') {
                        targets.css("border-width", '0px');
                        $self.find('.borderSliderCollection').hide();
                        for (let i = 0; i < 5; i++) {
                            $self.find(`#${borderSliderListLocal[i][0]}${idSuffix}`).slider('value', 0);
                            $self.find(`#${borderSliderListLocal[i][1]}${idSuffix}`).text(0);
                        }
                    } else {
                        let borderValue = $(targets[0]).css('border-width');
                        borderValue = parseInt(borderValue.replace('px', ''));
                        if (!borderValue) {
                            borderValue = 1;
                        }
                        targets.css("border-width", borderValue + 'px');
                        for (let i = 0; i < 5; i++) {
                            $self.find(`#${borderSliderListLocal[i][0]}${idSuffix}`).slider('value', borderValue);
                            $self.find(`#${borderSliderListLocal[i][1]}${idSuffix}`).text(borderValue);
                        }
                        $self.find('.borderSliderCollection').show();
                    }
                });
                this.BorderColorEvents();
                this.addSliderEvent();
            },
            addSliderEvent: function () {
                let self = this;
                let $borderWrapper = $self.find(`#borderWrapper${idSuffix}`);
                if (typeof ($borderWrapper.attr('data-max')) !== 'undefined' && typeof ($borderWrapper.attr('data-min')) !== 'undefined') {
                    let maxValue = parseInt($borderWrapper.attr('data-max'));
                    let minValue = parseInt($borderWrapper.attr('data-min'));
                    for (let i = 0; i < 5; i++) {
                        if (borderSliderListLocal[i][2]) {
                            AdvanceSageSlider($self.find(`#${borderSliderListLocal[i][0]}${idSuffix}`), $self.find(`#${borderSliderListLocal[i][1]}${idSuffix}`), minValue, maxValue, borderSliderListLocal[i][4], self[borderSliderListLocal[i][3]], targets, 'px', self);
                        }
                    }
                }
            },
            BorderColorEvents: function () {
                this.updateTargets();
                let self = this;
                let colorPickerOption = ColorPickerOption({
                    renderCallback: function ($elm, toggled) {
                        let objColor = RenderCallBackColor(this);
                        let colorPickerID = $elm.attr('id');
                        if (colorPickerID === borderSliderListLocal[0][5] + idSuffix) {
                            targets.css('border-top-color', objColor.bgColor);
                            targets.css('border-right-color', objColor.bgColor);
                            targets.css('border-bottom-color', objColor.bgColor);
                            targets.css('border-left-color', objColor.bgColor);
                            initialData.tc = objColor.bgColor;
                            initialData.bc = objColor.bgColor;
                            initialData.lc = objColor.bgColor;
                            initialData.rc = objColor.bgColor;
                            self.LoadBorderColor();
                        } else if (colorPickerID === borderSliderListLocal[1][5] + idSuffix) {
                            targets.css('border-top-color', objColor.bgColor);
                            initialData.tc = objColor.bgColor;
                        } else if (colorPickerID === borderSliderListLocal[2][5] + idSuffix) {
                            targets.css('border-right-color', objColor.bgColor);
                            initialData.rc = objColor.bgColor;
                        } else if (colorPickerID === borderSliderListLocal[3][5] + idSuffix) {
                            targets.css('border-bottom-color', objColor.bgColor);
                            initialData.bc = objColor.bgColor;
                        } else if (colorPickerID === borderSliderListLocal[4][5] + idSuffix) {
                            targets.css('border-left-color', objColor.bgColor);
                            initialData.lc = objColor.bgColor;
                        }
                    }
                });
                $self.find('.borderColorChoose').colorPicker(colorPickerOption);
            },
            LoadBorderInitialValue: function () {
                this.updateTargets();
                let times = 1;
                if (typeof ($self.find(`#borderWrapper${idSuffix}`).attr('data-times')) !== 'undefined')
                    times = parseInt($self.find(`#borderWrapper${idSuffix}`).attr('data-times'));
                if (times == 0)
                    times = 1;

                let topWidth = 0,
                    rightWidth = 0,
                    bottomWidth = 0,
                    leftWidth = 0;

                topWidth = initialData.top;
                if (typeof (topWidth) != 'undefined')
                    topWidth = parseInt(topWidth.replace('px', ''));
                topWidth = topWidth / times;
                borderSliderListLocal[1][4] = topWidth;

                rightWidth = initialData.right;
                if (typeof (rightWidth) != 'undefined')
                    rightWidth = parseInt(rightWidth.replace('px', ''));
                rightWidth = rightWidth / times;
                borderSliderListLocal[2][4] = rightWidth;

                bottomWidth = initialData.bottom;
                if (typeof (bottomWidth) != 'undefined')
                    bottomWidth = parseInt(bottomWidth.replace('px', ''));
                bottomWidth = bottomWidth / times;
                borderSliderListLocal[3][4] = bottomWidth;

                leftWidth = initialData.left;
                if (typeof (leftWidth) != 'undefined')
                    leftWidth = parseInt(leftWidth.replace('px', ''));
                leftWidth = leftWidth / times;
                borderSliderListLocal[4][4] = leftWidth;

                if (borderSliderListLocal[1][4] === borderSliderListLocal[2][4] &&
                    borderSliderListLocal[3][4] === borderSliderListLocal[4][4] &&
                    borderSliderListLocal[1][4] === borderSliderListLocal[4][4])
                    borderSliderListLocal[0][4] = borderSliderListLocal[1][4];
            },
            LoadBorderColor: function () {
                this.updateTargets();
                let borderTopColor = initialData.tc;
                let borderRightColor = initialData.rc;
                let borderBottomColor = initialData.bc;
                let borderLeftColor = initialData.lc;
                $self.find(`#${borderSliderListLocal[1][5]}${idSuffix}`).css('background-color', borderTopColor);
                $self.find(`#${borderSliderListLocal[2][5]}${idSuffix}`).css('background-color', borderRightColor);
                $self.find(`#${borderSliderListLocal[3][5]}${idSuffix}`).css('background-color', borderBottomColor);
                $self.find(`#${borderSliderListLocal[4][5]}${idSuffix}`).css('background-color', borderLeftColor);
                if (borderTopColor === borderRightColor && borderBottomColor === borderLeftColor && borderTopColor === borderLeftColor)
                    $self.find(`#${borderSliderListLocal[0][5]}${idSuffix}`).css('background-color', borderTopColor);
                else
                    $self.find(`#${borderSliderListLocal[0][5]}${idSuffix}`).css('background-color', '#000');
            },
            BorderBulk: function (space, $parent, ref) {
                if (ref && typeof ref['updateTargets'] === 'function') {
                    ref['updateTargets']();
                    $parent = targets;
                }
                if (borderSliderListLocal[1][2]) {
                    $parent.css({
                        "border-top-width": space
                    });
                    $self.find(`#${borderSliderListLocal[1][0]}${idSuffix}`).slider('value', space);
                    $self.find(`#${borderSliderListLocal[1][1]}${idSuffix}`).text(space);
                }
                if (borderSliderListLocal[2][2]) {
                    $parent.css({
                        "border-right-width": space
                    });
                    $self.find(`#${borderSliderListLocal[2][0]}${idSuffix}`).slider('value', space);
                    $self.find(`#${borderSliderListLocal[2][1]}${idSuffix}`).text(space);
                }
                if (borderSliderListLocal[3][2]) {
                    $parent.css({
                        "border-bottom-width": space
                    });
                    $self.find(`#${borderSliderListLocal[3][0]}${idSuffix}`).slider('value', space);
                    $self.find(`#${borderSliderListLocal[3][1]}${idSuffix}`).text(space);
                }
                if (borderSliderListLocal[4][2]) {
                    $parent.css({
                        "border-left-width": space
                    });
                    $self.find(`#${borderSliderListLocal[4][0]}${idSuffix}`).slider('value', space);
                    $self.find(`#${borderSliderListLocal[4][1]}${idSuffix}`).text(space);
                }
                if (!borderSliderListLocal[1][2] && !borderSliderListLocal[2][2] && !borderSliderListLocal[3][2] && !borderSliderListLocal[4][2]) {
                    $parent.css({
                        "border-width": space
                    });
                }
                if (typeof o.callback == 'function')
                    o.callback();
            },
            BorderTop: function (space, $parent, ref) {
                let refOK = false;
                if (ref && typeof ref['updateTargets'] === 'function') {
                    refOK = true;
                    ref['updateTargets']();
                    $parent = targets;
                }
                $parent.css({
                    "border-top-width": space
                });
                if (refOK) {
                    ref.BorderBulkNull();
                }
            },
            BorderRight: function (space, $parent, ref) {
                let refOK = false;
                if (ref && typeof ref['updateTargets'] === 'function') {
                    refOK = true;
                    ref['updateTargets']();
                    $parent = targets;
                }
                $parent.css({
                    "border-right-width": space
                });
                if (refOK) {
                    ref.BorderBulkNull();
                }
            },
            BorderBottom: function (space, $parent, ref) {
                let refOK = false;
                if (ref && typeof ref['updateTargets'] === 'function') {
                    refOK = true;
                    ref['updateTargets']();
                    $parent = targets;
                }
                $parent.css({
                    "border-bottom-width": space
                });
                if (refOK) {
                    ref.BorderBulkNull();
                }
            },
            BorderLeft: function (space, $parent, ref) {
                let refOK = false;
                if (ref && typeof ref['updateTargets'] === 'function') {
                    refOK = true;
                    ref['updateTargets']();
                    $parent = targets;
                }
                $parent.css({
                    "border-left-width": space
                });
                if (refOK) {
                    ref.BorderBulkNull();
                }
            },
            BorderBulkNull: function () {
                $self.find(`#${borderSliderListLocal[0][0]}${idSuffix}`).slider('value', 0);
                $self.find(`#${borderSliderListLocal[0][1]}${idSuffix}`).text(0);
                if (typeof o.callback == 'function') {
                    o.callback();
                }
            },
            init: function () {
                this.updateTargets();
                if (targets.length == 0) {
                    console.error("AdvanceBorder => target does not exist");
                    return false;
                }
                borderSliderListLocal = [
                    ['bulkBorderSlider', 'bulkBorderHandler', false, 'BorderBulk', 0, 'bulkBorderColor'],
                    ['borderTopSlider', 'borderTopHandler', false, 'BorderTop', 0, 'topBorderColor'],
                    ['borderRightSlider', 'borderRightHandler', false, 'BorderRight', 0, 'rightBorderColor'],
                    ['borderBottomSlider', 'borderBottomHandler', false, 'BorderBottom', 0, 'bottomBorderColor'],
                    ['borderLeftSlider', 'borderLeftHandler', false, 'BorderLeft', 0, 'leftBorderColor']
                ];
                this.appendDOM();
                this.setup();
                this.addEventListeners();
            }
        };
        AdvanceBorder.init();
    };
}(jQuery));
(function ($) {
    "use strict";
    $.fn.AdvanceBoxRadius = function (o) {
        if (typeof o === 'undefined' || typeof o.targetParent === 'undefined') {
            console.error("AdvanceBoxRadius => missing option: targetParent");
            return;
        }
        if (!(o.targetParent instanceof jQuery)) {
            console.error("AdvanceBoxRadius => targetParent should be a jQuery object");
            return;
        }
        if (typeof o === 'undefined' || typeof o.targetElem === 'undefined') {
            console.error("AdvanceBoxRadius => missing option: targetElem");
            return;
        }
        let $self = this,
            targetParent = o.targetParent,
            targetElem = o.targetElem,
            targets = $(targetParent).find(targetElem),
            idSuffix = '_' + Math.floor((Math.random() * 1000) + 100),
            options = {
                "max": 50,
                "min": 0,
                "times": 1,
                "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
            };
        if (typeof o.options !== 'undefined' && o.options) {
            options = o.options;
        }
        let boxRadiusSliderListLocal = [];
        let AdvanceBoxRadius = {
            updateTargets: function () {
                let tar = UpdateTargets(targetParent, targetElem, 'AdvanceBackground');
                targets = tar.target;
                return tar.exists;
            },
            appendDOM: function () {
                let bgChDom = this.GeneralBoxRadiusDOM(options);
                bgChDom = this.fixDomId(bgChDom);
                $self.html(bgChDom);
            },
            GeneralBoxRadiusDOM: function ($options) {
                let boxRadiusDOM = '';
                if (typeof ($options !== 'undefined')) {
                    boxRadiusDOM += DOMCreate('h4', 'Box Radius', '', 'boxRadiusWrapper', ['data-min="' + $options['min'] + '"', 'data-max="' + $options['max'] + '"', 'data-times="' + $options['times'] + '"', 'style="display:none;"']);
                    let boxRadiusSliderCollection = '';
                    let positionList = $options['position'];
                    let positionLength = positionList.length;
                    for (let i = 0; i < positionLength; i++) {
                        switch (positionList[i].toLowerCase()) {
                            case 'all':
                                boxRadiusSliderCollection += CreateSliderDOM(boxRadiusSliderListLocal[0][0], boxRadiusSliderListLocal[0][1], 'Bulk', boxRadiusSliderListLocal[0][5]);
                                boxRadiusSliderListLocal[0][2] = true;
                                break;
                            case 'top-left':
                                boxRadiusSliderCollection += CreateSliderDOM(boxRadiusSliderListLocal[1][0], boxRadiusSliderListLocal[1][1], 'Top-Left', boxRadiusSliderListLocal[1][5]);
                                boxRadiusSliderListLocal[1][2] = true;
                                break;
                            case 'top-right':
                                boxRadiusSliderCollection += CreateSliderDOM(boxRadiusSliderListLocal[2][0], boxRadiusSliderListLocal[2][1], 'Top- Right', boxRadiusSliderListLocal[2][5]);
                                boxRadiusSliderListLocal[2][2] = true;
                                break;
                            case 'bottom-left':
                                boxRadiusSliderCollection += CreateSliderDOM(boxRadiusSliderListLocal[3][0], boxRadiusSliderListLocal[3][1], 'Bottom-Left', boxRadiusSliderListLocal[3][5]);
                                boxRadiusSliderListLocal[3][2] = true;
                                break;
                            case 'bottom-right':
                                boxRadiusSliderCollection += CreateSliderDOM(boxRadiusSliderListLocal[4][0], boxRadiusSliderListLocal[4][1], 'Bottom-Right', boxRadiusSliderListLocal[4][5]);
                                boxRadiusSliderListLocal[4][2] = true;
                                break;
                        }
                    }
                    boxRadiusDOM = FieldRowDOMCreate(boxRadiusDOM + boxRadiusSliderCollection);
                }
                return boxRadiusDOM;
            },
            fixDomId: function (dom) {
                let ids = ['boxRadiusWrapper', 'bulkBoxRadiusSlider', 'boxRadiusTopLeftSlider', 'boxRadiusTopRightSlider', 'boxRadiusBottomLeftSlider', 'boxRadiusBottomRightSlider',
                    'bulkBoxRadiusHandler', 'boxRadiusTopLeftHandler', 'boxRadiusTopRightHandler', 'boxRadiusBottomLeftHandler', 'boxRadiusBottomRightHandler'
                ];
                let $dom = $(dom);
                for (let i = 0, j = ids.length; i < j; i++) {
                    $dom.find('#' + ids[i]).removeAttr('id').attr('id', ids[i] + idSuffix);
                }
                return $dom[0];
            },
            setup: function () {
                let self = this;
                let $boxRadiusWrapper = $self.find(`#boxRadiusWrapper${idSuffix}`);
                if (typeof ($boxRadiusWrapper.attr('data-max')) !== 'undefined' && typeof ($boxRadiusWrapper.attr('data-min')) !== 'undefined') {
                    let maxValue = parseInt($boxRadiusWrapper.attr('data-max'));
                    let minValue = parseInt($boxRadiusWrapper.attr('data-min'));
                    for (let i = 0; i < 5; i++) {
                        if (boxRadiusSliderListLocal[i][2]) {
                            AdvanceSageSlider($self.find(`#${boxRadiusSliderListLocal[i][0]}${idSuffix}`), $self.find(`#${boxRadiusSliderListLocal[i][1]}${idSuffix}`), minValue, maxValue, boxRadiusSliderListLocal[i][4], self[boxRadiusSliderListLocal[i][3]], targets, 'px', self);
                        }
                    }
                }
            },
            LoadBoxRadiusInitialValue: function () {
                let times = 1;
                if (typeof ($self.find(`#boxRadiusWrapper${idSuffix}`).attr('data-times')) !== 'undefined')
                    times = parseInt($self.find(`#boxRadiusWrapper${idSuffix}`).attr('data-times'));
                if (times == 0)
                    times = 1;

                let topleft = 0,
                    topRight = 0,
                    bottomLeft = 0,
                    bottomRight = 0;
                let $parent = $(targets[0]);

                topleft = $parent.css("border-top-left-radius");
                if (typeof (topleft) != 'undefined')
                    topleft = parseInt(topleft.replace('px', ''));
                topleft = topleft / times;
                boxRadiusSliderListLocal[1][4] = topleft;

                topRight = $parent.css("border-top-right-radius");
                if (typeof (topRight) != 'undefined')
                    topRight = parseInt(topRight.replace('px', ''));
                topRight = topRight / times;
                boxRadiusSliderListLocal[2][4] = topRight;

                bottomLeft = $parent.css("border-bottom-left-radius");
                if (typeof (bottomLeft) != 'undefined')
                    bottomLeft = parseInt(bottomLeft.replace('px', ''));
                bottomLeft = bottomLeft / times;
                boxRadiusSliderListLocal[3][4] = bottomLeft;

                bottomRight = $parent.css("border-bottom-right-radius");
                if (typeof (bottomRight) != 'undefined')
                    bottomRight = parseInt(bottomRight.replace('px', ''));
                bottomRight = bottomRight / times;
                boxRadiusSliderListLocal[4][4] = bottomRight;

                if (boxRadiusSliderListLocal[1][4] === boxRadiusSliderListLocal[2][4] && boxRadiusSliderListLocal[3][4] === boxRadiusSliderListLocal[4][4] && boxRadiusSliderListLocal[1][4] === boxRadiusSliderListLocal[4][4])
                    boxRadiusSliderListLocal[0][4] = boxRadiusSliderListLocal[1][4];
            },
            BoxRadiusBulk: function (space, $parent, ref) {
                if (ref && typeof ref['updateTargets'] === 'function') {
                    ref['updateTargets']();
                    $parent = targets;
                }
                if (boxRadiusSliderListLocal[1][2]) {
                    $parent.css({
                        "border-top-left-radius": space
                    });
                    $parent.find(' > .editor-row-shaded-layer').css({
                        "border-top-left-radius": space
                    });
                    $self.find(`#${boxRadiusSliderListLocal[1][0]}${idSuffix}`).slider('value', space);
                    $self.find(`#${boxRadiusSliderListLocal[1][1]}${idSuffix}`).text(space);
                }
                if (boxRadiusSliderListLocal[2][2]) {
                    $parent.css({
                        "border-top-right-radius": space
                    });
                    $parent.find(' > .editor-row-shaded-layer').css({
                        "border-top-right-radius": space
                    });
                    $self.find(`#${boxRadiusSliderListLocal[2][0]}${idSuffix}`).slider('value', space);
                    $self.find(`#${boxRadiusSliderListLocal[2][1]}${idSuffix}`).text(space);
                }
                if (boxRadiusSliderListLocal[3][2]) {
                    $parent.css({
                        "border-bottom-left-radius": space
                    });
                    $parent.find(' > .editor-row-shaded-layer').css({
                        "border-bottom-left-radius": space
                    });
                    $self.find(`#${boxRadiusSliderListLocal[3][0]}${idSuffix}`).slider('value', space);
                    $self.find(`#${boxRadiusSliderListLocal[3][1]}${idSuffix}`).text(space);
                }
                if (boxRadiusSliderListLocal[4][2]) {
                    $parent.css({
                        "border-bottom-right-radius": space
                    });
                    $parent.find(' > .editor-row-shaded-layer').css({
                        "border-bottom-right-radius": space
                    });
                    $self.find(`#${boxRadiusSliderListLocal[4][0]}${idSuffix}`).slider('value', space);
                    $self.find(`#${boxRadiusSliderListLocal[4][1]}${idSuffix}`).text(space);
                }
                if (!boxRadiusSliderListLocal[1][2] && !boxRadiusSliderListLocal[2][2] && !boxRadiusSliderListLocal[3][2] && !boxRadiusSliderListLocal[4][2]) {
                    $parent.css({
                        "border-radius": space
                    });
                }
                if (typeof o.callback == 'function')
                    o.callback();
            },
            BoxRadiusTopLeft: function (space, $parent, ref) {
                let refOK = false;
                if (ref && typeof ref['updateTargets'] === 'function') {
                    refOK = true;
                    ref['updateTargets']();
                    $parent = targets;
                }
                $parent.css({
                    "border-top-left-radius": space
                });
                $parent.find(' > .editor-row-shaded-layer').css({
                    "border-top-left-radius": space
                });
                if (refOK) {
                    ref.BoxRadiusBulkNull();
                }
            },
            BoxRadiusTopRight: function (space, $parent, ref) {
                let refOK = false;
                if (ref && typeof ref['updateTargets'] === 'function') {
                    refOK = true;
                    ref['updateTargets']();
                    $parent = targets;
                }
                $parent.css({
                    "border-top-right-radius": space
                });
                $parent.find(' > .editor-row-shaded-layer').css({
                    "border-top-right-radius": space
                });
                if (refOK) {
                    ref.BoxRadiusBulkNull();
                }
            },
            BoxRadiusBottomLeft: function (space, $parent, ref) {
                let refOK = false;
                if (ref && typeof ref['updateTargets'] === 'function') {
                    refOK = true;
                    ref['updateTargets']();
                    $parent = targets;
                }
                $parent.css({
                    "border-bottom-left-radius": space
                });
                $parent.find(' > .editor-row-shaded-layer').css({
                    "border-bottom-left-radius": space
                });
                if (refOK) {
                    ref.BoxRadiusBulkNull();
                }
            },
            BoxRadiusBottomRight: function (space, $parent, ref) {
                let refOK = false;
                if (ref && typeof ref['updateTargets'] === 'function') {
                    refOK = true;
                    ref['updateTargets']();
                    $parent = targets;
                }
                $parent.css({
                    "border-bottom-right-radius": space
                });
                $parent.find(' > .editor-row-shaded-layer').css({
                    "border-bottom-right-radius": space
                });
                if (refOK) {
                    ref.BoxRadiusBulkNull();
                }
            },
            BoxRadiusBulkNull: function () {
                $self.find(`#${boxRadiusSliderListLocal[0][0]}${idSuffix}`).slider('value', 0);
                $self.find(`#${boxRadiusSliderListLocal[0][1]}${idSuffix}`).text(0);
                if (typeof o.callback == 'function')
                    o.callback();
            },
            init: function () {
                this.updateTargets();
                if (targets.length == 0) {
                    console.error("AdvanceBoxRadius => target does not exist");
                    return false;
                }
                boxRadiusSliderListLocal = [
                    ['bulkBoxRadiusSlider', 'bulkBoxRadiusHandler', false, 'BoxRadiusBulk', 0],
                    ['boxRadiusTopLeftSlider', 'boxRadiusTopLeftHandler', false, 'BoxRadiusTopLeft', 0],
                    ['boxRadiusTopRightSlider', 'boxRadiusTopRightHandler', false, 'BoxRadiusTopRight', 0],
                    ['boxRadiusBottomLeftSlider', 'boxRadiusBottomLeftHandler', false, 'BoxRadiusBottomLeft', 0],
                    ['boxRadiusBottomRightSlider', 'boxRadiusBottomRightHandler', false, 'BoxRadiusBottomRight', 0]
                ];
                this.appendDOM();
                this.LoadBoxRadiusInitialValue();
                this.setup();
            }
        };
        AdvanceBoxRadius.init();
    };
}(jQuery));
(function ($) {
    "use strict";
    $.fn.AdvanceBoxShadow = function (o) {
        if (typeof o === 'undefined' || typeof o.targetParent === 'undefined') {
            console.error("AdvanceBoxShadow => missing option: targetParent");
            return;
        }
        if (!(o.targetParent instanceof jQuery)) {
            console.error("AdvanceBoxShadow => targetParent should be a jQuery object");
            return;
        }
        if (typeof o === 'undefined' || typeof o.targetElem === 'undefined') {
            console.error("AdvanceBoxShadow => missing option: targetElem");
            return;
        }
        let $self = this,
            $boxShadowEffects = null,
            targetParent = o.targetParent,
            targetElem = o.targetElem,
            targets = $(targetParent).find(targetElem),
            idSuffix = '_' + Math.floor((Math.random() * 1000) + 100),
            options = {};
        if (typeof o.options !== 'undefined' && o.options) {
            options = o.options;
        }
        let objBoxShadow = {
            'inset': 'false',
            'horizontal': '0',
            'vertical': '1',
            'blur': '5',
            'color': defaultColor,
        };
        let boxShadow = 'none';
        let horiLen = 0,
            verLen = 0,
            blurRadius = 0,
            lenCol = 0;
        let boxShadowSliderListLocal = [];
        let AdvanceBoxShadow = {
            updateTargets: function () {
                let tar = UpdateTargets(targetParent, targetElem, 'AdvanceBoxShadow');
                targets = tar.target;
                return tar.exists;
            },
            appendDOM: function () {
                let bgChDom = this.GeneralBoxShadowDOM(options);
                bgChDom = this.fixDomId(bgChDom);
                $self.html(bgChDom);
                $boxShadowEffects = $self.find('.boxShadowEffects');
            },
            GeneralBoxShadowDOM: function ($options) {
                let boxShadowDOM = '';
                //boxShadowDOM += DOMCreate('h4', 'Box Shadow', '', 'BoxShadowWrap');
                boxShadowDOM += CreateCheckboxDOM('Activate Box Shadow', 'ShowBoxShadowOption', 'ShowBoxShadowOption');
                let sliderDOM = '';
                let boxOptions = Object.keys($options);
                let boxOptionslen = boxOptions.length;
                sliderDOM = CreateSliderDOM(boxShadowSliderListLocal[0][0], boxShadowSliderListLocal[0][1], 'Horizontal Length');
                sliderDOM += CreateSliderDOM(boxShadowSliderListLocal[1][0], boxShadowSliderListLocal[1][1], 'Vertical Length');
                sliderDOM += CreateSliderDOM(boxShadowSliderListLocal[2][0], boxShadowSliderListLocal[2][1], 'Blur Radius');
                sliderDOM += CreateColorPickerDOM('Shadow Color', 'shadowColor', 'shadowColor');
                sliderDOM += CreateCheckboxDOM('Inset', 'boxshadowInset', 'boxshadowInset');
                sliderDOM = DOMCreate('div', sliderDOM, 'boxShadowEffects', '', ['style="display:none;"']);
                let horiMaxLen = 100,
                    horiMinLen = -100;
                let vertiMaxLen = 100,
                    vertiMinLen = -100;
                let blurMaxLen = 100,
                    blurMinLen = 0;
                sliderDOM += '<input type="hidden" id="boxShadowMinMax" data-hori-min="' + horiMinLen;
                sliderDOM += '" data-hori-max="' + horiMaxLen;
                sliderDOM += '" data-verti-min="' + vertiMinLen + '" data-verti-max="' + vertiMaxLen;
                sliderDOM += '" data-blur-min="' + blurMinLen + '" data-blur-max="' + blurMaxLen + '" />';
                boxShadowDOM += sliderDOM;
                boxShadowDOM = FieldRowDOMCreate(boxShadowDOM);
                return boxShadowDOM;
            },
            fixDomId: function (dom) {
                let ids = ['boxShadowHorizontalSlider', 'boxShadowVerticalSlider', 'boxShadowBlurSlider',
                    'boxShadowHorizontalHandler', 'boxShadowVerticalHandler', 'boxShadowBlurHandler',
                    'ShowBoxShadowOption', 'shadowColor', 'boxshadowInset', 'boxShadowMinMax'
                ];
                let $dom = $(dom);
                for (let i = 0, j = ids.length; i < j; i++) {
                    $dom.find('#' + ids[i]).removeAttr('id').attr('id', ids[i] + idSuffix);
                }
                $dom.find("label[for='ShowBoxShadowOption']").attr('for', 'ShowBoxShadowOption' + idSuffix);
                $dom.find("label[for='boxshadowInset']").attr('for', 'boxshadowInset' + idSuffix);
                return $dom[0];
            },
            setup: function () {
                let $parent = $(targets[0]);
                let prevhovereffect = $parent.attr('data-prevhovereffect');
                if (typeof prevhovereffect !== 'undefined') {
                    let tmpEff = JSON.parse(prevhovereffect);
                    if (tmpEff.boxShadowStyle) {
                        boxShadow = tmpEff.boxShadowStyle;
                    }
                } else if (typeof ($parent.attr('style')) !== 'undefined') {
                    boxShadow = $parent.css('box-shadow');
                }
                $self.find(`#shadowColor${idSuffix}`).css('background-color', '#000');
                if (typeof (boxShadow) !== "undefined" && boxShadow !== null && boxShadow !== 'none') {
                    //horiLen = objBoxShadow.horizontal;
                    //verLen = objBoxShadow.vertical;
                    //blurRadius = objBoxShadow.blur;
                    lenCol = boxShadow.match(/-?\d{1,3}px/g);
                    horiLen = parseInt(lenCol[0].replace('px', ''));
                    verLen = parseInt(lenCol[1].replace('px', ''));
                    blurRadius = parseInt(lenCol[2].replace('px', ''));
                    objBoxShadow.horizontal = horiLen;
                    objBoxShadow.vertical = verLen;
                    objBoxShadow.blur = blurRadius;
                    $boxShadowEffects.show();
                    $self.find(`#ShowBoxShadowOption${idSuffix}`).prop('checked', true);
                    let dropColor = boxShadow;
                    lenCol.forEach((l) => {
                        dropColor = dropColor.replace(l, '');
                    });
                    //let dropColor = boxShadow.replace(horiLen + 'px', '').replace(verLen + 'px', '').replace(blurRadius + 'px', '');
                    dropColor = dropColor.replace('inset', '').trim();
                    if (dropColor.length > 0) {
                        objBoxShadow.color = dropColor;
                        $self.find(`#shadowColor${idSuffix}`).css('background-color', dropColor);
                    }
                    let hasInset = boxShadow.match(/inset/);
                    if (hasInset !== null && hasInset.length > 0) {
                        $self.find(`#boxshadowInset${idSuffix}`).prop('checked', true);
                    } else {
                        $self.find(`#boxshadowInset${idSuffix}`).prop('checked', false);
                    }
                } else {
                    $self.find('.boxShadowEffects').hide();
                    $self.find(`#ShowBoxShadowOption${idSuffix}`).prop('checked', false);
                    $self.find(`#shadowColor${idSuffix}`).css('background-color', '#000');
                }
            },
            parentBoxShadow: function () {
                let shadowDOM = '';
                shadowDOM += objBoxShadow.color + ' ';
                shadowDOM += objBoxShadow.horizontal + 'px ';
                shadowDOM += objBoxShadow.vertical + 'px ';
                shadowDOM += objBoxShadow.blur + 'px ';
                if ($self.find(`#boxshadowInset${idSuffix}`).prop('checked')) {
                    shadowDOM += 'inset ';
                }
                targets.css({
                    'box-shadow': shadowDOM
                });
            },
            BoxShadowHoriLengthSlide: function (space, $parent, ref) {
                let refOK = false;
                if (ref && typeof ref['updateTargets'] === 'function') {
                    refOK = true;
                    ref['updateTargets']();
                    $parent = targets;
                }
                objBoxShadow.horizontal = space;
                if (refOK) {
                    ref.parentBoxShadow();
                }
            },
            BoxShadowVerticalLengthSlide: function (space, $parent, ref) {
                let refOK = false;
                if (ref && typeof ref['updateTargets'] === 'function') {
                    refOK = true;
                    ref['updateTargets']();
                    $parent = targets;
                }
                objBoxShadow.vertical = space;
                if (refOK) {
                    ref.parentBoxShadow();
                }
            },
            BoxShadowBlurSlide: function (space, $parent, ref) {
                let refOK = false;
                if (ref && typeof ref['updateTargets'] === 'function') {
                    refOK = true;
                    ref['updateTargets']();
                    $parent = targets;
                }
                objBoxShadow.blur = space;
                if (refOK) {
                    ref.parentBoxShadow();
                }
            },
            addEventListeners: function () {
                let self = this;
                $self.find(`#boxshadowInset${idSuffix}`).off().on('click', function () {
                    self.parentBoxShadow();
                });
                $self.find(`#ShowBoxShadowOption${idSuffix}`).off().on('click', function () {
                    if ($(this).is(':checked')) {
                        $boxShadowEffects.slideDown(400);
                        objBoxShadow.color = $self.find(`#shadowColor${idSuffix}`).css('background-color');
                        self.parentBoxShadow();
                    } else {
                        $boxShadowEffects.slideUp(400);
                        targets.css({
                            'box-shadow': ''
                        });
                    }
                });
                let colorPickerOption = ColorPickerOption({
                    renderCallback: function ($elm, toggled) {
                        let objColor = RenderCallBackColor(this);
                        objBoxShadow.color = objColor.bgColor;
                        self.parentBoxShadow();
                    }
                });
                $self.find(`#shadowColor${idSuffix}`).colorPicker(colorPickerOption);
                let $boxShadowMinMax = $self.find(`#boxShadowMinMax${idSuffix}`);
                let horiMaxLen = parseInt($boxShadowMinMax.attr('data-hori-max'));
                let horiMinLen = parseInt($boxShadowMinMax.attr('data-hori-min'));
                let vertiMaxLen = parseInt($boxShadowMinMax.attr('data-verti-max'));
                let vertiMinLen = parseInt($boxShadowMinMax.attr('data-verti-min'));
                let blurMaxLen = parseInt($boxShadowMinMax.attr('data-blur-max'));
                let blurMinLen = parseInt($boxShadowMinMax.attr('data-blur-min'));
                AdvanceSageSlider($self.find(`#${boxShadowSliderListLocal[0][0]}${idSuffix}`), $self.find(`#${boxShadowSliderListLocal[0][1]}${idSuffix}`), horiMinLen, horiMaxLen, horiLen, self['BoxShadowHoriLengthSlide'], targets, 'px', self);
                AdvanceSageSlider($self.find(`#${boxShadowSliderListLocal[1][0]}${idSuffix}`), $self.find(`#${boxShadowSliderListLocal[1][1]}${idSuffix}`), vertiMinLen, vertiMaxLen, verLen, self['BoxShadowVerticalLengthSlide'], targets, 'px', self);
                AdvanceSageSlider($self.find(`#${boxShadowSliderListLocal[2][0]}${idSuffix}`), $self.find(`#${boxShadowSliderListLocal[2][1]}${idSuffix}`), blurMinLen, blurMaxLen, blurRadius, self['BoxShadowBlurSlide'], targets, 'px', self);
            },
            init: function () {
                if (this.updateTargets()) { } else {
                    console.error("AdvanceBoxShadow => target does not exist");
                    return false;
                }
                boxShadowSliderListLocal = [
                    ['boxShadowHorizontalSlider', 'boxShadowHorizontalHandler', 'boxShadowHorizontal', 0],
                    ['boxShadowVerticalSlider', 'boxShadowVerticalHandler', 'boxShadowVertical', 0],
                    ['boxShadowBlurSlider', 'boxShadowBlurHandler', 'boxShadowBlur', 0]
                ];
                this.appendDOM();
                this.setup();
                this.addEventListeners();
            }
        };
        AdvanceBoxShadow.init();
    };
}(jQuery));
(function ($) {
    "use strict";
    $.fn.ManagePosition = function (o) {
        if (typeof o === 'undefined' || typeof o.targetParent === 'undefined') {
            console.error("ManagePosition => missing option: targetParent");
            return;
        }
        if (!(o.targetParent instanceof jQuery)) {
            console.error("ManagePosition => targetParent should be a jQuery object");
            return;
        }
        if (typeof o === 'undefined' || typeof o.targetElem === 'undefined') {
            console.error("ManagePosition => missing option: targetElem");
            return;
        }
        let $self = this,
            targetParent = o.targetParent,
            targets = UpdateTargets($(targetParent), o.targetElem, "Manage Position");
        targets = targets.target;
        let zPostion = {
            appendDOM: function () {
                let html = `<div class="field-row stElWrap col30-70">
                            <label class="fCol">Position</label>
                            <div class="fcol">
                            <span title="Send Back" class="iconSendBack btn btnSendBack">Send Back</span>
                            <span title="Bring Font" class="iconBringFront btn btnBringFront">Bring Font</span>
                            </div>
                             `;
                $self.html(html);
            },
            updatePostion: function (IsBack) {
                let preVal = targets.eq(0).attr('class').match(/zi-\d+/g);
                if (preVal != null) {
                    $.each(preVal, function (i, v) {
                        targets.removeClass(v);
                    });
                    preVal = parseInt(preVal[0].replace('zi-', ''));
                } else {
                    preVal = 0;
                }
                if (IsBack)
                    preVal -= 1;
                else
                    preVal += 1;
                if (preVal > 0 && preVal <= 9) {
                    $self.find('.btnSendBack').removeClass('disable');
                    $self.find('.btnBringFront').removeClass('disable');
                    targets.addClass('zi-' + preVal);
                } else if (preVal > 9) {
                    $self.find('.btnBringFront').addClass('disable');
                    targets.addClass('zi-9');
                } else {
                    $self.find('.btnSendBack').addClass('disable');
                }
            },
            addEventListeners: function () {
                let $this = this;
                if (targets.length == 0) {
                    console.error("ManagePosition => => target does not exists");
                    return;
                } else {
                    $self.find('.btnBringFront').off('click').on('click', function () {
                        $this.updatePostion(false);
                    });
                    $self.find('.btnSendBack').off('click').on('click', function () {
                        $this.updatePostion(true);
                    });
                }
            },
            init: function () {
                this.appendDOM();
                this.addEventListeners();
            }
        };
        zPostion.init();
    };
}(jQuery));
(function ($) {
    "use strict";
    $.fn.AdvanceVisibility = function (o) {
        if (typeof o === 'undefined' || typeof o.targetParent === 'undefined') {
            console.error("AdvanceVisibility => missing option: targetParent");
            return;
        }
        if (!(o.targetParent instanceof jQuery)) {
            console.error("AdvanceVisibility => targetParent should be a jQuery object");
            return;
        }
        if (typeof o === 'undefined' || typeof o.targetElem === 'undefined') {
            console.error("AdvanceVisibility => missing option: targetElem");
            return;
        }
        let $self = this,
            label = 'Visibility',
            targetParent = o.targetParent,
            targetElem = o.targetElem,
            targets = $(targetParent).find(targetElem),
            callbackFunc = false,
            showCls = 'Dib',
            idSuffix = '_' + Math.floor((Math.random() * 1000) + 100);
        if (typeof o.label !== 'undefined') {
            label = o.label;
        }
        if (typeof o.showCls !== 'undefined') {
            showCls = o.showCls;
        }
        if (typeof o.callbackFunc === 'function') {
            callbackFunc = o.callbackFunc;
        }
        let AdvanceVisibility = {
            appendDOM: function () {
                let dom = `<div class="field-row stElWrap col80-20" data-opt="visibility">
                                <label class="fCol">${label}</label>
                                <span class="fCol toggle_btn">
                                    <input id="deviceVisibility${idSuffix}" name="enable visibility" type="checkbox" />
                                    <label for="deviceVisibility${idSuffix}" class ="tgl_slider"></label>
                                </span>
                            </div>`;
                $self.html(dom);

            },
            addEventListeners: function () {
                let fld = $self.find(`#deviceVisibility${idSuffix}`);
                let parentClasses = $(targets[0]).attr('class');
                let dAlpha = DeviceAlpha();
                let regex = new RegExp('\\b' + dAlpha + 'Dn\\b', 'g');
                let visibilityClass = parentClasses.match(regex);
                if (visibilityClass !== null)
                    fld.prop('checked', false);
                else
                    fld.prop('checked', true);
                fld.off('click').on('click', function () {
                    dAlpha = DeviceAlpha();
                    let checked = $(this).is(':checked');
                    if (checked) {
                        targets.removeClass(dAlpha + 'Dn').addClass(dAlpha + showCls);
                    } else {
                        targets.addClass(dAlpha + 'Dn').removeClass(dAlpha + showCls);
                    }
                    if (typeof callbackFunc === 'function') {
                        callbackFunc(checked);
                    }
                });
            },
            init: function () {
                this.appendDOM();
                this.addEventListeners();
            }
        };
        AdvanceVisibility.init();
    };
}(jQuery));
(function ($) {
    "use strict";
    $.fn.AdvanceItemsPerRow = function (o) {
        if (typeof o === 'undefined' || typeof o.targetParent === 'undefined') {
            console.error("AdvanceItemsPerRow => missing option: targetParent");
            return;
        }
        if (!(o.targetParent instanceof jQuery)) {
            console.error("AdvanceItemsPerRow => targetParent should be a jQuery object");
            return;
        }
        if (typeof o === 'undefined' || typeof o.targetElem === 'undefined') {
            console.error("AdvanceItemsPerRow => missing option: targetElem");
            return;
        }
        let $self = this,
            label = 'Items per row',
            targetParent = o.targetParent,
            targetElem = o.targetElem,
            targets = $(targetParent).find(targetElem),
            idSuffix = '_' + Math.floor((Math.random() * 1000) + 100);
        if (typeof o.label !== 'undefined') {
            label = o.label;
        }
        let ItemsPerRow = {
            appendDOM: function () {
                let dom = `<div class="field-row stElWrap col50-50">
                        <label class ="fCol">${label}</label>
                        <span class="select__box fCol">
                            <select id="ItemPerRow${idSuffix}">
                                <option value="100">1</option>
                                <option value="50">2</option>
                                <option value="33">3</option>
                                <option value="25">4</option>
                                <option value="20">5</option>
                            </select>
                        </span>
                    </div>`;
                $self.html(dom);
            },
            addEventListeners: function () {
                let fld = $self.find(`#ItemPerRow${idSuffix}`);
                let parentClasses = $(targets[0]).attr('class');
                let dAlpha = DeviceAlpha();
                let regex = new RegExp('\\b' + dAlpha + 'sfCol_[0-9]{1,3}\\b', 'g');
                let itemsperrow = parentClasses.match(regex);
                if (itemsperrow !== null) {
                    let width = GetValueByClassName($(targets[0]), 'sfCol_[0-9]{1,3}', 'sfCol_');
                    fld.val(width);
                } else
                    fld.val(100);
                fld.off('change').on('change', function () {
                    dAlpha = DeviceAlpha();
                    targets.removeClass(dAlpha + 'Dn').addClass(dAlpha + 'Dib');
                    let changeVal = $(this).val();
                    ReplaceClassByPattern(targets, 'sfCol_[0-9]{1,3}', 'sfCol_' + changeVal);
                    if (typeof o.callback === 'function') {
                        o.callback(fld.find("option:selected").text()); //
                    }
                });
            },
            init: function () {
                this.appendDOM();
                this.addEventListeners();
            }
        };
        ItemsPerRow.init();
    };
}(jQuery));
//-------------------------------overlay----------------------------------------------------
(function ($) {
    "use strict";
    $.fn.AdvanceOverLayout = function (o) {
        if (typeof o === 'undefined' || typeof o.targetParent === 'undefined') {
            console.error("AdvanceOverLayout => misssing option:targetParent");
            return;
        }
        if (!(o.targetParent instanceof jQuery)) {
            console.error("AdvanceOverLayout=>targetParent should be a jQuery object");
            return;
        }
        if (typeof o === 'undefined' || typeof o.targetElem === 'undefined') {
            console.error("AdvanceOverLayout=>missing option:targetElement");
            return;
        }
        if (typeof o.options === 'undefined') {
            console.error("AdvanceDimension => missing option: targetElem");
            return;
        }
        let $self = this,
            $SettingDOM = "",
            $overLayclass = `<div class="overLay ${o.targetElem}" style="display:none" data-effectType="fade" data-effectsize="100"><div class='overlayStyle'><h1><a href='http://www.google.com'></a></h1></div></div>`,
            $overlayStyleOptions = "",
            $SettingSliderDOM = "",
            //   idSuffix = '_' + Math.floor((Math.random() * 1000) + 100),
            targetParent = o.targetParent;
        let AdvanceOverLayout = {
            updateTargets: function () {
                targets = $(targetParent);
                if (targets.length == 0) {
                    console.error("AdvanceOverEffect => target does not exists");
                    return false;
                }
                return true;
            },
            appendSettingDom: function () {
                $SettingDOM += CreateCheckboxDOM('Activate Over Layout', 'ShowOverLayoutEffectOption', 'ShowOverLayoutEffectOption');
                $SettingDOM += `<div class="field-row stElWrap contentPosition col50-50" style="display:none"><label class="fCol">Content Position</label><span class="fCol TxAl-r select__box"><select class="slcOverLayout"></select></span></div>`;
                $SettingDOM += `<div class="field-row stElWrap sliderEffectControl col100" style="display:none">
                                <span class="range__slider fCol">
                                <div id="effectControlSlider">
                                <div id="effectControlHandle" class="ui-slider-handle" title="Manage Effect Size">0</div>
                                </div></span>
                                </div>`;
                for (let i = 0; i < o.options.length; i++) {
                    $overlayStyleOptions += `<option value=${o.options[i]}>${o.options[i]}</option>`
                }
                $self.html($SettingDOM);
                $('.slcOverLayout').html($overlayStyleOptions);
            },
            clearStyle: function () {
                $(targetParent).find('.overLay').removeAttr('style');
            },
            manageStyle: function (effect) {
                AdvanceOverLayout.clearStyle();
                switch (effect.toLowerCase()) {
                    case 'fade':
                        $(targetParent).find('.overLay').css({
                            'border-radius': '10px',
                            'z-index': '2',
                            'display': 'none',
                            'position': 'absolute',
                            'background-color': 'rgba(0, 0, 0)',
                            'opacity': '0.7',
                            'top': '0%',
                            'bottom': '0%',
                            'left': '0%',
                            'right': '0%'
                        }, 'slow');
                        break;
                    case 'zoom-in':
                        $(targetParent).find('.overLay').css({
                            'border-radius': '10px',
                            'z-index': '2',
                            'display': 'none',
                            'position': 'absolute',
                            'background-color': 'rgba(0, 0, 0);',
                            'opacity': '0.7',
                            'top': '5%',
                            'bottom': '5%',
                            'left': '5%',
                            'right': '5%'
                        });
                        break;
                    case 'zoom-out':
                        $(targetParent).find('.overLay').css({
                            'border-radius': '10px',
                            "z-index": '2',
                            'display': 'none',
                            'position': 'absolute',
                            'background-color': 'rgba(0, 0, 0);',
                            'opacity': '0.7',
                            'top': '0%',
                            'bottom': '0%',
                            'left': '0%',
                            'right': '0%'
                        });
                        break;
                    case 'sweep-up':
                        $(targetParent).find('.overLay').css({
                            'border-radius': '10px',
                            'z-index': '2',
                            'display': 'none',
                            'position': 'absolute',
                            'background-color': 'rgba(0, 0, 0);',
                            'opacity': '0.7',
                            'bottom': '0%',
                            'width': '100%'
                        });
                        break;
                    case 'sweep-down':
                        $(targetParent).find('.overLay').css({
                            'border-radius': '10px',
                            'z-index': '2',
                            'display': 'none',
                            'position': 'absolute',
                            'background-color': 'rgba(0, 0, 0);',
                            'opacity': '0.7',
                            'top': '0%',
                            'width': '100%'
                        });
                        break;
                    case 'sweep-right':
                        $(targetParent).find('.overLay').css({
                            'border-radius': '10px',
                            'z-index': '2',
                            'display': 'none',
                            'position': 'absolute',
                            'background-color': 'rgba(0, 0, 0);',
                            'opacity': '0.7',
                            'top': '0%',
                            'height': '100%',
                            'left': '0%'
                        });
                        break;
                    case 'sweep-left':
                        $(targetParent).find('.overLay').css({
                            'border-radius': '10px',
                            'z-index': '2',
                            'display': 'none',
                            'position': 'absolute',
                            'background-color': 'rgba(0, 0, 0);',
                            'opacity': '0.7',
                            'top': '0px',
                            'right': '0%',
                            'height': '100%'
                        });
                        break;
                }
            },
            hoverInAnimate: function (effect, index) {
                let $overLayEffectSize = $(targetParent).find('.overLay').eq(index).attr('data-effectsize');
                switch (effect.toLowerCase()) {
                    case 'fade':
                        $(targetParent).find('.overLay').eq(index).fadeIn(300)
                        break;
                    case 'zoom-in':
                        $(targetParent).find('.overLay').eq(index).stop().animate({
                            'border-radius': '10px',
                            'opacity': '0.7',
                            'display': 'none',
                            'position': 'absolute',
                            'background-color': 'background-color: rgba(0, 0, 0);',
                            'opacity': '0.7',
                            'top': '0%',
                            'bottom': '0%',
                            'left': '0%',
                            'right': '0%'
                        }, 300);
                        break;
                    case 'zoom-out':
                        $(targetParent).find('.overLay').eq(index).stop().animate({
                            'top': '5%',
                            'bottom': '5%',
                            'opacity': '0.7',
                            'left': '5%',
                            'right': '5%'
                        }, 300);
                        break;
                    case 'sweep-up':
                        $(targetParent).find('.overLay').eq(index).stop().animate({
                            'top': (100 - $overLayEffectSize) + '%',
                            'opacity': '0.7'
                        }, 300);
                        break;
                    case 'sweep-down':
                        $(targetParent).find('.overLay').eq(index).stop().animate({
                            'bottom': (100 - $overLayEffectSize) + '%',
                            'opacity': '0.7'
                        }, 300);
                        break;
                    case 'sweep-right':
                        $(targetParent).find('.overLay').eq(index).stop().animate({
                            'right': (100 - $overLayEffectSize) + '%',
                            'opactiy': '0.7'
                        }, 300);
                        break;
                    case 'sweep-left':
                        $(targetParent).find('.overLay').eq(index).stop().animate({
                            'left': (100 - $overLayEffectSize) + '%'
                        }, 300);
                        break;
                }
            },

            hoverOutAnimate: function (effect, index) {
                let $overLayEffectSize = $(targetParent).find('.overLay').eq(index).attr('data-effectsize');
                switch (effect.toLowerCase()) {
                    case 'fade':
                        $(targetParent).find('.overLay').eq(index).fadeOut(300)
                        break;
                    case 'zoom-in':
                        $(targetParent).find('.overLay').eq(index).stop().animate({
                            'top': '5%',
                            'bottom': '5%',
                            'opacity': '0.7',
                            'left': '5%',
                            'right': '5%'
                        }, 300);
                        break;
                    case 'zoom-out':
                        $(targetParent).find('.overLay').eq(index).stop().animate({
                            'top': '0%',
                            'bottom': '0%',
                            'opactiy': '0.7',
                            'left': '0%',
                            'right': '0%'
                        }, 300);
                        break;
                    case 'sweep-up':
                        $(targetParent).find('.overLay').eq(index).stop().animate({
                            'top': '100%',
                            'opacity': '0.7'
                        }, 300);
                        break;
                    case 'sweep-down':
                        $(targetParent).find('.overLay').eq(index).stop().animate({
                            'bottom': '100%',
                            'opacity': '0.7'
                        }, 300);
                        break;
                    case 'sweep-right':
                        $(targetParent).find('.overLay').eq(index).stop().animate({
                            'right': '100%',
                            'opacity': '0.7'
                        }, 300);
                        break;
                    case 'sweep-left':
                        $(targetParent).find('.overLay').eq(index).stop().animate({
                            'left': '100%',
                            'opacity': '0.7'
                        }, 300);
                        break;
                }
            },

            overLayForSingleEffect: function () {
                let $hasOverlay = $(targetParent).attr('data-overlay');
                if (typeof ($hasOverlay) == 'undefined' || $hasOverlay == '0') {
                    $(targetParent).append($overLayclass);
                }
                $(targetParent).attr('data-overlay', '1');
                AdvanceOverLayout.manageStyle(o.options[0]);
                $(targetParent).find('.overLay').attr('data-effectType', o.options[0]);
                $(targetParent).find('.overLay').attr('data-effectsize', o.finalPosition);
            },

            overLayoutEvents: function () {
                let $hasOverlay = $(targetParent).attr('data-overlay');
                if (typeof ($hasOverlay) == 'undefined' || $hasOverlay == '0') {
                    $('#ShowOverLayoutEffectOption').prop('checked', false);
                } else {
                    $('#ShowOverLayoutEffectOption').prop('checked', true);
                    $('.contentPosition').fadeIn(500);
                    let $effectType = $(targetParent).find('.overLay').attr('data-effecttype');
                    if ($effectType == 'Sweep-Up' || $effectType == 'Sweep-Down' || $effectType == 'Sweep-Right' || $effectType == 'Sweep-Left') {
                        $('.sliderEffectControl').fadeIn(500);
                    }
                }
                $('#ShowOverLayoutEffectOption').off('click').on('click', function () {
                    if ($(this).is(':checked')) {
                        if (typeof ($hasOverlay) == 'undefined' || $hasOverlay == '0') {
                            $(targetParent).append($overLayclass);
                        }
                        $('.contentPosition').fadeIn(500);
                        $('.slcOverLayout').trigger('change');
                        $(targetParent).attr('data-overlay', '1');
                    } else {
                        $(targetParent).off('mouseover mouseleave');
                        $('.contentPosition').fadeOut(500);
                        $('.sliderEffectControl').fadeOut(500);;
                        $(targetParent.find('.overLay')).remove();
                        $(targetParent).attr('data-overlay', '0');
                    }
                });
                let $effectSize = '';
                if (targetParent.find('.overLay').length === 0) {
                    $effectSize = '100'
                } else {
                    $effectSize = $(targetParent).find('.oveLay').attr('data-effectsize');
                }

                function effectSizeSlider(space) {
                    $(targetParent).find('.overLay').attr('data-effectsize', space);
                }
                AdvanceSageSlider($('#effectControlSlider'), $('#effectControlHandle'), 20, 100, $effectSize, effectSizeSlider, targetParent, '%');

                $('.slcOverLayout').val($(targetParent).find('.overLay').attr('data-effecttype'))
                $('.slcOverLayout').off().on('change', function () {
                    let $overlayoutStyle = $(this).val();
                    if ($overlayoutStyle === 'Sweep-Up' || $overlayoutStyle === 'Sweep-Down' || $overlayoutStyle === 'Sweep-Right' || $overlayoutStyle === 'Sweep-Left') {
                        $('.sliderEffectControl').fadeIn(500);
                    } else {
                        $('.sliderEffectControl').fadeOut(500);
                    }
                    $(targetParent).find('.overLay').attr('data-effectType', $overlayoutStyle)
                    AdvanceOverLayout.manageStyle($overlayoutStyle);
                    AdvanceOverLayout.onComponentHover();
                });
            },

            onComponentHover: function () {
                let $overEffect = "";
                $(targetParent).off('mouseover mouseleave').on('mouseover mouseleave', function (e) {
                    if (e.type === 'mouseover') {
                        let $parentIndex = $(targetParent).index(this);
                        if ($('.slcOverLayout').val() !== 'Fade') {
                            $(targetParent).find('.overLay').eq($parentIndex).css({
                                'display': 'block'
                            });
                        }
                        $overEffect = $(targetParent).find('.overLay').attr('data-effectType');
                        AdvanceOverLayout.hoverInAnimate($overEffect, $parentIndex);
                    } else if (e.type === 'mouseleave') {
                        let $parentIndex = $(targetParent).index(this);
                        AdvanceOverLayout.hoverOutAnimate($overEffect, $parentIndex);
                        $(targetParent.find('.overLay')).fadeOut('fast');
                    }
                });
            },
            init: function () {
                if (o.options.length === 1) {
                    this.overLayForSingleEffect();
                    this.onComponentHover();
                } else {
                    this.appendSettingDom();
                    this.overLayoutEvents();
                }
            },
        }
        AdvanceOverLayout.init();
    }
}(jQuery));
//-----------------------overlay--------------------------
(function ($) {
    "use strict";
    $.fn.AdvanceHoverEffect = function (o) {
        if (typeof o === 'undefined' || typeof o.targetParent === 'undefined') {
            console.error("AdvanceHoverEffect => missing option: targetParent");
            return;
        }
        if (!(o.targetParent instanceof jQuery)) {
            console.error("AdvanceHoverEffect => targetParent should be a jQuery object");
            return;
        }
        if (typeof o === 'undefined' || typeof o.targetElem === 'undefined') {
            console.error("AdvanceHoverEffect => missing option: targetElem");
            return;
        }
        let $self = this,
            targetParent = o.targetParent,
            targetElem = o.targetElem,
            targets = $(targetParent).find(targetElem),
            idSuffix = '_' + Math.floor((Math.random() * 1000) + 100),
            $parent = $(targets[0]),
            options = {
                shadow: "on",
                border: {
                    "max": 20,
                    "min": 0,
                    "times": 1,
                    "position": ["all", "top", "right", "bottom", "left"],
                },
                zoom: "on"
            };
        let currentHoverEffect = {
            "bg": "none",
            "font": "#000",
            "box": {
                "on": "off",
                "hl": "0px",
                "vl": "0px",
                "br": "0px",
                "c": "#000",
                "i": "false",
            },
            "border": {
                "on": "none",
                "top": "0",
                "right": "0",
                "bottom": "0",
                "left": "0",
                "tc": "#000",
                "rc": "#000",
                "bc": "#000",
                "lc": "#000"
            },
            "zoom": "10",
            "delay": 0
        };
        let objBoxShadow = {
            'inset': '',
            'horizontal': '0',
            'vertical': '0',
            'blur': '0',
            'color': '#000',
        };
        let boxShadowEffectSliderListLocal = [];
        let borderHoverSliderListLocal = [];
        if (typeof o.options !== 'undefined' && o.options) {
            options = $.extend(options, o.options);
        }
        let hasbg = false;
        let AdvanceHoverEffect = {
            updateTargets: function () {
                let tar = UpdateTargets(targetParent, targetElem, 'AdvanceHoverEffect');
                targets = tar.target;
                return tar.exists;
            },
            appendSettingDom: function ($options) {
                let hoverDOM = '';
                hoverDOM += CreateCheckboxDOM('Activate Hover Effect', 'hoverEffectOption', 'hoverEffectOption');
                hoverDOM += '<div class="field-row" id="hoverEffectOptionWrap" style="display:none;">';
                let colorEffect = $options["color"];
                if (typeof (colorEffect) !== "undefined" && colorEffect.length > 0) {
                    let colorLength = colorEffect.length;
                    for (var i = 0; i < colorLength; i++) {
                        switch (colorEffect[i].toLowerCase()) {
                            case 'background':
                                currentHoverEffect.bg = "rgba(204, 204, 204, 0)";
                                hoverDOM += CreateColorPickerDOM('Background Color', 'hoverBGColor', 'hoverColor');
                                hasbg = true;
                                break;
                            case 'text':
                                hoverDOM += CreateColorPickerDOM('Text Color', 'hoverTextColor', 'hoverColor');
                        }
                    }
                }
                let showShadow = $options["shadow"];
                if (typeof (showShadow) !== "undefined" && showShadow === "on") {
                    hoverDOM += this.GeneralHoverEffectBoxShadowDOM($options);
                }
                let showHover = $options["border"];
                if (typeof (showHover) !== "undefined") {
                    hoverDOM += this.GeneralBorderHoverDOM($options);
                }
                let showZoom = $options["zoom"];
                if (typeof (showZoom) !== "undefined" && showZoom === "on") {
                    hoverDOM += CreateSliderDOM('HoverZoomSlider', 'HoverZoomSliderHandle', 'Zoom');
                }
                let zoomEffectSelectDOM = DOMCreate('label', 'Zoom Effect', 'fCol') +
                    DOMCreate('div', DOMCreate('span', SelectDOMCreate('hoverZoomEffect', 'hoverZoomEffect', [
                        ['external', 'External'],
                        ['internal', 'Internal']
                    ]), 'select__box'), 'fCol TxAl-r');
                hoverDOM += FieldRowDOMCreateCol50_50(zoomEffectSelectDOM);
                hoverDOM += '</div>';
                hoverDOM = FieldRowDOMCreate(hoverDOM);
                hoverDOM = this.fixDomId(hoverDOM);
                $self.html(hoverDOM);
            },
            fixDomId: function (dom) {
                let ids = ['hoverBGColor', 'hoverTextColor', 'hoverEffectOption', 'hoverEffectOptionWrap', 'ShowBoxShadowEffectOption', 'boxShadowEffectHorizontalSlider',
                    'boxShadowEffectHorizontalHandler', 'boxShadowEffectVerticalSlider', 'boxShadowEffectVerticalHandler',
                    'boxShadowEffectBlurSlider', 'boxShadowEffectBlurHandler', 'shadowEffectColor', 'boxshadowEffectInset',
                    'boxShadowEffectMinMax', 'borderHoverWrapper', 'borderHoverStyle', 'bulkBorderHoverSlider',
                    'bulkBorderHoverHandler', 'bulkBorderHoverColor', 'borderHoverTopSlider', 'borderHoverTopHandler',
                    'topBorderHoverColor', 'borderHoverRightSlider', 'borderHoverRightHandler', 'rightBorderHoverColor',
                    'borderHoverBottomSlider', 'borderHoverBottomHandler', 'bottomBorderHoverColor', 'borderHoverLeftSlider',
                    'borderHoverLeftHandler', 'leftBorderHoverColor', 'HoverZoomSlider', 'HoverZoomSliderHandle', 'hoverZoomEffect'
                ];
                let $dom = $(dom);
                for (let i = 0, j = ids.length; i < j; i++) {
                    $dom.find('#' + ids[i]).removeAttr('id').attr('id', ids[i] + idSuffix);
                }
                $dom.find("label[for='hoverEffectOption']").attr('for', 'hoverEffectOption' + idSuffix);
                $dom.find("label[for='ShowBoxShadowEffectOption']").attr('for', 'ShowBoxShadowEffectOption' + idSuffix);
                $dom.find("label[for='boxshadowEffectInset']").attr('for', 'boxshadowEffectInset' + idSuffix);
                return $dom[0];
            },
            GeneralHoverEffectBoxShadowDOM: function ($options) {
                let boxShadowDOM = '';
                //boxShadowDOM += CreateCheckboxDOM('Activate Box Shadow', 'ShowBoxShadowEffectOption', 'ShowBoxShadowShadowEffectOption');
                let sliderDOM = '';
                let boxOptions = Object.keys($options);
                let boxOptionslen = boxOptions.length;
                sliderDOM = CreateSliderDOM(boxShadowEffectSliderListLocal[0][0], boxShadowEffectSliderListLocal[0][1], 'Horizontal Length');
                sliderDOM += CreateSliderDOM(boxShadowEffectSliderListLocal[1][0], boxShadowEffectSliderListLocal[1][1], 'Vertical Length');
                sliderDOM += CreateSliderDOM(boxShadowEffectSliderListLocal[2][0], boxShadowEffectSliderListLocal[2][1], 'Blur Radius');
                sliderDOM += CreateColorPickerDOM('Shadow Color', 'shadowEffectColor', 'shadowEffectColor');
                sliderDOM += CreateCheckboxDOM('Inset', 'boxshadowEffectInset', 'boxshadowEffectInset');
                sliderDOM = DOMCreate('div', sliderDOM, 'boxShadowEffectWrappers', '', ['style="display:none;"']);
                let horiMaxLen = 100,
                    horiMinLen = -100;
                let vertiMaxLen = 100,
                    vertiMinLen = -100;
                let blurMaxLen = 100,
                    blurMinLen = 0;

                sliderDOM += '<input type="hidden" id="boxShadowEffectMinMax" data-hori-min="' + horiMinLen;
                sliderDOM += '" data-hori-max="' + horiMaxLen;
                sliderDOM += '" data-verti-min="' + vertiMinLen + '" data-verti-max="' + vertiMaxLen;
                sliderDOM += '" data-blur-min="' + blurMinLen + '" data-blur-max="' + blurMaxLen + '" />';
                boxShadowDOM += sliderDOM;
                boxShadowDOM = FieldRowDOMCreate(boxShadowDOM);
                return boxShadowDOM;
            },
            GeneralBorderHoverDOM: function ($border) {
                let borderHoverDOM = "";
                if (typeof ($border) !== 'undefined') {
                    let $options = $border['border'];
                    if (typeof ($options) !== 'undefined') {
                        borderHoverDOM += DOMCreate('h4', 'Border', '', 'borderHoverWrapper', ['data-min="' + $options['min'] + '"', 'data-max="' + $options['max'] + '"', "style=display:none;", 'data-times="' + $options['times'] + '"']);
                        let selectDOM = DOMCreate('label', 'Border Hover Style', 'fCol') +
                            DOMCreate('div', DOMCreate('span', SelectDOMCreate('borderHoverStyle', 'BorderHoverStyle', [
                                ['none', 'None'],
                                ['solid', 'Solid'],
                                ['dashed', 'Dashed'],
                                ['dotted', 'Dotted'],
                                ['double', 'Double']
                            ]), 'select__box'), 'fCol TxAl-r');
                        borderHoverDOM += FieldRowDOMCreateCol50_50(selectDOM);
                        let borderHoverSliderCollection = '';
                        let positionList = $options['position'];
                        if (typeof (positionList) !== "undefined") {
                            let positionLength = positionList.length;
                            for (var i = 0; i < positionLength; i++) {
                                switch (positionList[i].toLowerCase()) {
                                    case 'all':
                                        borderHoverSliderCollection += CreateSliderWithColorDOM(borderHoverSliderListLocal[0][0], borderHoverSliderListLocal[0][1], 'Bulk Border', borderHoverSliderListLocal[0][5], 'borderHoverColorChoosePlg');
                                        borderHoverSliderListLocal[0][2] = true;
                                        break;
                                    case 'top':
                                        borderHoverSliderCollection += CreateSliderWithColorDOM(borderHoverSliderListLocal[1][0], borderHoverSliderListLocal[1][1], 'Top Border', borderHoverSliderListLocal[1][5], 'borderHoverColorChoosePlg');
                                        borderHoverSliderListLocal[1][2] = true;
                                        break;
                                    case 'right':
                                        borderHoverSliderCollection += CreateSliderWithColorDOM(borderHoverSliderListLocal[2][0], borderHoverSliderListLocal[2][1], 'Right Border', borderHoverSliderListLocal[2][5], 'borderHoverColorChoosePlg');
                                        borderHoverSliderListLocal[2][2] = true;
                                        break;
                                    case 'bottom':
                                        borderHoverSliderCollection += CreateSliderWithColorDOM(borderHoverSliderListLocal[3][0], borderHoverSliderListLocal[3][1], 'Bottom Border', borderHoverSliderListLocal[3][5], 'borderHoverColorChoosePlg');
                                        borderHoverSliderListLocal[3][2] = true;
                                        break;
                                    case 'left':
                                        borderHoverSliderCollection += CreateSliderWithColorDOM(borderHoverSliderListLocal[4][0], borderHoverSliderListLocal[4][1], 'Left Border', borderHoverSliderListLocal[4][5], 'borderHoverColorChoosePlg');
                                        borderHoverSliderListLocal[4][2] = true;
                                        break;
                                }
                            }
                            borderHoverSliderCollection = DOMCreate('div', borderHoverSliderCollection, 'borderHoverSliderCollection', '', ['style="display:none;"']);
                            borderHoverDOM = FieldRowDOMCreate(borderHoverDOM + borderHoverSliderCollection);
                        }
                    }
                }
                return borderHoverDOM;
            },
            initEvents: function () {
                let self = this;
                this.GeneralBoxShadowEffectEvents();
                this.GeneralBorderHoverEvents();
                $self.find(`#hoverEffectOption${idSuffix}`).off('click').on('click', function () {
                    self.updateTargets();
                    if ($(this).is(':checked')) {
                        $self.find(`#hoverEffectOptionWrap${idSuffix}`).show();
                        targets.addClass('hovered');
                        self.MouseOverEffect();
                        self.UpdateEffect();
                        self.InitializeEffectValue();
                    } else {
                        $self.find(`#hoverEffectOptionWrap${idSuffix}`).hide();
                        self.RemoveMouseOverEffect(self);
                    }
                });
                let colorPickerOption = ColorPickerOption({
                    renderCallback: function ($elm, toggled) {
                        let objColor = RenderCallBackColor(this);
                        let colorPickerID = $elm.attr('id');
                        switch (colorPickerID) {
                            case 'hoverBGColor' + idSuffix:
                                currentHoverEffect.bg = objColor.bgColor;
                                break;
                            case 'hoverTextColor' + idSuffix:
                                currentHoverEffect.font = objColor.bgColor;
                                break;
                        }
                        self.UpdateEffect();
                    }
                });
                $self.find('.hoverColor').colorPicker(colorPickerOption);

                AdvanceSageSlider($self.find(`#HoverZoomSlider${idSuffix}`), $self.find(`#HoverZoomSliderHandle${idSuffix}`), 1, 19, 10, self['OnZoom'], $parent, '', self);
                if ($parent.hasClass('hovered')) {
                    self.InitializeEffectValue();
                    $self.find(`#hoverEffectOption${idSuffix}`).prop('checked', true);
                    $self.find(`#hoverEffectOptionWrap${idSuffix}`).show();
                    self.MouseOverEffect();
                } else {
                    $self.find(`#hoverEffectOption${idSuffix}`).prop('checked', false);
                    //self.RemoveMouseOverEffect(self);
                }
            },
            RemoveMouseOverEffect: function (self) {
                self.updateTargets();
                if (typeof (targets) !== "undefined") {
                    if (targets.hasClass('hovered')) {
                        targets.off('mouseover').off('mouseout').removeClass('hovered');
                    } else if (targets.find('.hovered').length > 0) {
                        let $selected = targets.find('.hovered');
                        $selected[0].off('mouseover').off('mouseout').removeClass('hovered');
                        $selected.each(function (i, v) {
                            v.off('mouseover').off('mouseout').removeClass('hovered');
                        });
                    }
                } else
                    $self.find('.hovered').off('mouseover').off('mouseout').removeClass('hovered');
            },
            MouseOverEffect: function () {
                let self = this;
                self.updateTargets();
                let $selected = $self.find('.hovered');
                if (typeof (targets) !== "undefined") {
                    if (targets.hasClass('hovered'))
                        $selected = targets;
                    else if (targets.find('.hovered').length > 0)
                        $selected = targets.find('.hovered').eq(0);
                }
                $selected.off('mouseout').on('mouseout', function () {
                    $(this).attr('hovered-mousein', 'out');
                    self.ResetPreviousEffect($(this));
                });
                $selected.off('mouseover').on('mouseover', function () {
                    $(this).attr('hovered-mousein', 'in');
                    self.ApplyEffects($(this));
                });
            },
            ResetPreviousEffect: function ($this) {
                let prevEff = $this.attr('data-prevhovereffect');
                if (typeof prevEff === 'undefined') {
                    return;
                }
                let hoverEffect = JSON.parse(prevEff);
                if (hasbg) {
                    $this.css({
                        'background-color': hoverEffect.bg
                    });
                    if ($this.find('.onhoverbgcolor').length > 0) {
                        $this.find('.onhoverbgcolor').css({
                            'background-color': hoverEffect.bg
                        });
                    } else {
                        $this.css({
                            'background-color': 'none'
                        });
                    }
                }
                if ($this.find('.onhovercolor').length > 0) {
                    $this.find('.onhovercolor').css({
                        'color': hoverEffect.font
                    });
                } else {
                    $this.css({
                        'color': hoverEffect.font
                    });
                }

                $this.removeAttr('data-prevhovereffect');
                let zoomClass = $this.attr('class').match(/scale-[0-1]-[0-9]/g);
                if (zoomClass !== null) {
                    $this.removeClass(zoomClass[0]);
                }
                if (typeof (hoverEffect.zoom) !== "undefined") {
                    $this.addClass(hoverEffect.zoom);
                }
                let $shadow = hoverEffect.box;
                if ($shadow.on === "on") {
                    let shadowDOM = '';
                    shadowDOM += $shadow.c;
                    shadowDOM += $shadow.hl;
                    shadowDOM += $shadow.vl;
                    shadowDOM += $shadow.br;
                    shadowDOM += $shadow.i;
                    $this.css({
                        'box-shadow': shadowDOM
                    });
                } else {
                    $this.css({
                        'box-shadow': hoverEffect.boxShadowStyle
                    });
                }
                let $border = hoverEffect.border;
                $this.css({
                    "border-style": $border.on,
                    "border-top-width": $border.top,
                    "border-right-width": $border.right,
                    "border-bottom-width": $border.bottom,
                    "border-left-width": $border.left,
                    'border-top-color': $border.tc,
                    'border-right-color': $border.rc,
                    'border-bottom-color': $border.bc,
                    'border-left-color': $border.lc
                });
            },
            ApplyEffects: function ($this) {
                let self = this;
                let boxShadowStyle = $this.css('box-shadow');
                let previousdata = {
                    "bg": $this.css('background-color'),
                    "font": "#000",
                    "box": {
                        "on": "off",
                        "hl": "0px",
                        "vl": "1px",
                        "br": "5px",
                        "c": "#000",
                        "i": "false",
                    },
                    "boxShadowStyle": boxShadowStyle,
                    "border": {
                        "on": "off",
                        "top": "0",
                        "right": "0",
                        "bottom": "0",
                        "left": "0",
                        "tc": "#000",
                        "rc": "#000",
                        "bc": "#000",
                        "lc": "#000"
                    },
                    "zoom": null
                };
                let hoverEffect = JSON.parse($this.attr('data-hovereffect'));
                if (hasbg) {
                    if ($this.find('.onhoverbgcolor').length > 0) {
                        previousdata.bg = $this.find('.onhoverbgcolor').eq(0).css('background-color');
                        $this.find('.onhoverbgcolor').css({
                            'background-color': hoverEffect.bg
                        });
                    } else {
                        previousdata.bg = $this.css('background-color');
                        $this.css({
                            'background-color': hoverEffect.bg
                        });
                    }
                }
                if ($this.find('.onhovercolor').length > 0) {
                    previousdata.font = $this.find('.onhovercolor').eq(0).css('color');
                    $this.find('.onhovercolor').css({
                        'color': hoverEffect.font
                    });
                } else {
                    previousdata.font = $this.css('color');
                    $this.css({
                        'color': hoverEffect.font
                    });
                }
                let zoomClass = $this.attr('class').match(/scale-[0-1]-[0-9]/g);
                if (zoomClass !== null) {
                    $this.removeClass(zoomClass[0]);
                    previousdata.zoom = zoomClass[0];
                }
                let zoom = hoverEffect.zoom;
                $this.addClass('scale-' + parseInt(zoom / 10) + '-' + (zoom % 10));
                let $shadow = hoverEffect.box;

                let $border = hoverEffect.border;

                self.ParentBoxShadowEff($this, previousdata, $shadow);
                self.BorderOnHover($this, previousdata, $border);
                $this.attr('data-prevhovereffect', JSON2.stringify(previousdata));
            },
            BorderOnHover: function ($this, previousdata, $border) {
                previousdata.border.on = $this.css("border-top-style");
                previousdata.border.top = $this.css("border-top-width");
                previousdata.border.right = $this.css("border-right-width");
                previousdata.border.bottom = $this.css("border-bottom-width");
                previousdata.border.left = $this.css("border-left-width");

                previousdata.border.tc = $this.css('border-top-color');
                previousdata.border.rc = $this.css('border-right-color');
                previousdata.border.bc = $this.css('border-bottom-color');
                previousdata.border.lc = $this.css('border-left-color');

                if ($border.on !== "none") {
                    $this.css({
                        "border-style": $border.on,
                        "border-top-width": $border.top,
                        "border-right-width": $border.right,
                        "border-bottom-width": $border.bottom,
                        "border-left-width": $border.left,
                        'border-top-color': $border.tc,
                        'border-right-color': $border.rc,
                        'border-bottom-color': $border.bc,
                        'border-left-color': $border.lc
                    });
                }
            },
            ParentBoxShadowEff: function ($this, previousdata, $shadow) {
                //previousdata.box.on = "off";
                if ($this.attr('hovered-mousein') === "in")
                    previousdata.box.on = "off";
                let boxShadow = $this.css('box-shadow');
                if (typeof (boxShadow) !== "undefined" && boxShadow !== null && boxShadow !== 'none') {
                    //previousdata.box.on = "on";
                    let lenCol = boxShadow.match(/-?\d{1,3}px/g);
                    previousdata.box.hl = lenCol[0] + ' ';
                    previousdata.box.vl = lenCol[1] + ' ';
                    previousdata.box.br = lenCol[2] + ' ';
                    let inset = '';
                    let hasInset = boxShadow.match(/inset/);
                    if (hasInset !== null && hasInset.length > 0) {
                        inset = ' inset ';
                    }
                    previousdata.box.i = inset;
                    let spreadDistace = '';
                    if (lenCol.length == 4)
                        spreadDistace = lenCol[3];
                    let dropColor = boxShadow.replace(previousdata.box.hl, '')
                        .replace(previousdata.box.vl, '')
                        .replace(previousdata.box.br, '')
                        .replace(spreadDistace, '')
                        .replace('inset', '').trim();
                    if (dropColor.length > 0) {
                        previousdata.box.c = dropColor;
                    }
                }
                if ($shadow.on === "on") {
                    let shadowDOM = '';
                    shadowDOM += $shadow.c;
                    shadowDOM += $shadow.hl;
                    shadowDOM += $shadow.vl;
                    shadowDOM += $shadow.br;
                    shadowDOM += $shadow.i;
                    $this.css({
                        'box-shadow': shadowDOM
                    });
                }
            },
            InitializeEffectValue: function () {
                let self = this;
                let initHoverEffect = $parent.attr('data-hovereffect');
                if (typeof initHoverEffect === 'undefined' || !initHoverEffect) {
                    console.error("No hover effect data found.");
                    return;
                }
                initHoverEffect = JSON.parse(initHoverEffect);
                $self.find(`#hoverBGColor${idSuffix}`).css('background-color', initHoverEffect.bg);
                $self.find(`#hoverTextColor${idSuffix}`).css('background-color', initHoverEffect.font);
                let effectZoom = initHoverEffect.zoom;
                ChangeSliderValue($self.find(`#HoverZoomSlider${idSuffix}`), effectZoom);
                let shadowon = initHoverEffect.box.on;
                self.ZoomType(effectZoom);
                if (shadowon == "on") {
                    $self.find('.boxShadowEffectWrappers').show();
                    $self.find(`#ShowBoxShadowEffectOption${idSuffix}`).prop('checked', true);
                } else {
                    $self.find('.boxShadowEffectWrappers').hide();
                    $self.find(`#ShowBoxShadowEffectOption${idSuffix}`).prop('checked', false);
                }
            },
            ZoomType: function (val) {
                if (val > 10)
                    $(`#hoverZoomEffect${idSuffix}`).closest('.stElWrap ').removeClass('Dn');
                else $(`#hoverZoomEffect${idSuffix}`).closest('.stElWrap ').removeClass('Dn').addClass('Dn');
            },
            OnZoom: function (space, $par, ref) {
                currentHoverEffect.zoom = space;
                AdvanceHoverEffect.ZoomType(space);
                ref.UpdateEffect();
            },
            GeneralBorderHoverEvents: function () {
                let self = this;
                $self.find(`#borderHoverStyle${idSuffix}`).on('change', function () {
                    let style = $(this).val();
                    let borderHoverEfffect = {
                        "top": "0px",
                        "right": "0px",
                        "bottom": "0px",
                        "left": "0px"
                    };
                    if (style === 'none') {
                        $self.find('.borderHoverSliderCollection').hide();
                        for (var i = 0; i < 5; i++) {
                            $self.find(`#${borderHoverSliderListLocal[i][0]}${idSuffix}`).slider('value', 0);
                            $self.find(`#${borderHoverSliderListLocal[i][1]}${idSuffix}`).text(0);
                        }
                        currentHoverEffect.border.on = style;
                        currentHoverEffect.border.top = "0px";
                        currentHoverEffect.border.right = "0px";
                        currentHoverEffect.border.bottom = "0px";
                        currentHoverEffect.border.left = "0px";
                        self.UpdateEffect();
                    } else {
                        currentHoverEffect.border.on = style;
                        currentHoverEffect.border.top = "1px";
                        currentHoverEffect.border.right = "1px";
                        currentHoverEffect.border.bottom = "1px";
                        currentHoverEffect.border.left = "1px";
                        for (var i = 0; i < 5; i++) {
                            $self.find(`#${borderHoverSliderListLocal[i][0]}${idSuffix}`).slider('value', 1);
                            $self.find(`#${borderHoverSliderListLocal[i][1]}${idSuffix}`).text(1);
                        }
                        self.UpdateEffect();
                        $self.find('.borderHoverSliderCollection').show();
                    }
                });
                if ($parent.parent().hasClass('ofH'))
                    $self.find(`#hoverZoomEffect${idSuffix}`).val('internal')
                else $self.find(`#hoverZoomEffect${idSuffix}`).val('external');
                $self.find(`#hoverZoomEffect${idSuffix}`).off('change').on('change', function () {
                    if ($(this).val() === 'internal')
                        $parent.parent().removeClass('ofH').addClass('ofH');
                    else $parent.parent().removeClass('ofH');

                });
                let domHoverEffect = $parent.attr('data-hovereffect');
                if (typeof (domHoverEffect) !== "undefined" && domHoverEffect !== null && domHoverEffect !== 'none') {
                    domHoverEffect = JSON.parse($parent.attr('data-hovereffect'));
                    let borderStyle = domHoverEffect.border.on;
                    if (borderStyle.length == 0)
                        borderStyle = 'none';
                    $self.find(`#borderHoverStyle${idSuffix}`).val(borderStyle);
                    if (borderStyle == 'none') {
                        $self.find('.borderHoverSliderCollection').hide();
                    } else {
                        $self.find('.borderHoverSliderCollection').show();
                    }
                } else {
                    //domHoverEffect = hoverEffect;
                    domHoverEffect = {
                        "bg": "#ccc",
                        "font": "#000",
                        "box": {
                            "on": "off",
                            "hl": "0px",
                            "vl": "1px",
                            "br": "5px",
                            "c": "#000",
                            "i": "false",
                        },
                        "border": {
                            "on": "none",
                            "top": "0",
                            "right": "0",
                            "bottom": "0",
                            "left": "0",
                            "tc": "#000",
                            "rc": "#000",
                            "bc": "#000",
                            "lc": "#000"
                        },
                        "zoom": "10",
                        "delay": 0
                    };
                }
                let $borderWrapper = $self.find(`#borderHoverWrapper${idSuffix}`);
                self.LoadBorderHoverInitialValue($borderWrapper, domHoverEffect);
                if (typeof ($borderWrapper) !== "undefined" && typeof ($borderWrapper.attr('data-max')) !== 'undefined' && typeof ($borderWrapper.attr('data-min')) !== 'undefined') {
                    let maxValue = parseInt($borderWrapper.attr('data-max'));
                    let minValue = parseInt($borderWrapper.attr('data-min'));
                    for (var i = 0; i < 5; i++) {
                        if (borderHoverSliderListLocal[i][2]) {
                            AdvanceSageSlider($self.find(`#${borderHoverSliderListLocal[i][0]}${idSuffix}`), $self.find(`#${borderHoverSliderListLocal[i][1]}${idSuffix}`), minValue, maxValue, borderHoverSliderListLocal[i][4], self[borderHoverSliderListLocal[i][3]], $parent, 'px', self);
                        }
                    }
                }
                self.LoadBorderHoverColor(domHoverEffect);
                self.BorderColorEvents();
            },
            BorderColorEvents: function () {
                let self = this;
                let colorPickerOption = ColorPickerOption({
                    renderCallback: function ($elm, toggled) {
                        let objColor = RenderCallBackColor(this);
                        let colorPickerID = $elm.attr('id');
                        if (colorPickerID === borderHoverSliderListLocal[0][5] + idSuffix) {
                            currentHoverEffect.border.tc = objColor.bgColor;
                            currentHoverEffect.border.rc = objColor.bgColor;
                            currentHoverEffect.border.bc = objColor.bgColor;
                            currentHoverEffect.border.lc = objColor.bgColor;
                            $self.find(`#${borderHoverSliderListLocal[1][5]}${idSuffix}`).css('background-color', objColor.bgColor);
                            $self.find(`#${borderHoverSliderListLocal[2][5]}${idSuffix}`).css('background-color', objColor.bgColor);
                            $self.find(`#${borderHoverSliderListLocal[3][5]}${idSuffix}`).css('background-color', objColor.bgColor);
                            $self.find(`#${borderHoverSliderListLocal[4][5]}${idSuffix}`).css('background-color', objColor.bgColor);
                        } else if (colorPickerID === borderHoverSliderListLocal[1][5] + idSuffix) {
                            currentHoverEffect.border.tc = objColor.bgColor;
                        } else if (colorPickerID === borderHoverSliderListLocal[2][5] + idSuffix) {
                            currentHoverEffect.border.rc = objColor.bgColor;
                        } else if (colorPickerID === borderHoverSliderListLocal[3][5] + idSuffix) {
                            currentHoverEffect.border.bc = objColor.bgColor;
                        } else if (colorPickerID === borderHoverSliderListLocal[4][5] + idSuffix) {
                            currentHoverEffect.border.lc = objColor.bgColor;
                        }
                        self.UpdateEffect();
                    }
                });
                $self.find('.borderHoverColorChoosePlg').colorPicker(colorPickerOption);
            },
            LoadBorderHoverColor: function (domHoverEffect) {
                let borderTopColor = blackColor,
                    borderRightColor = blackColor,
                    borderBottomColor = blackColor,
                    borderLeftColor = blackColor;
                if (typeof (domHoverEffect) !== "undefined") {
                    borderTopColor = domHoverEffect.border.tc;
                    borderRightColor = domHoverEffect.border.rc;
                    borderBottomColor = domHoverEffect.border.bc;
                    borderLeftColor = domHoverEffect.border.lc;
                }
                $self.find(`#${borderHoverSliderListLocal[1][5]}${idSuffix}`).css('background-color', borderTopColor);
                $self.find(`#${borderHoverSliderListLocal[2][5]}${idSuffix}`).css('background-color', borderRightColor);
                $self.find(`#${borderHoverSliderListLocal[3][5]}${idSuffix}`).css('background-color', borderBottomColor);
                $self.find(`#${borderHoverSliderListLocal[4][5]}${idSuffix}`).css('background-color', borderLeftColor);
                if (borderTopColor === borderRightColor && borderBottomColor === borderLeftColor && borderTopColor === borderLeftColor)
                    $self.find(`#${borderHoverSliderListLocal[0][5]}${idSuffix}`).css('background-color', borderTopColor);
                else
                    $self.find(`#${borderHoverSliderListLocal[0][5]}${idSuffix}`).css('background-color', '#000');
            },
            LoadBorderHoverInitialValue: function ($borderWrapper, domHoverEffect) {
                let times = 1;
                if (typeof ($borderWrapper.attr('data-times')) !== 'undefined')
                    times = parseInt($borderWrapper.attr('data-times'));
                if (times == 0)
                    times = 1;

                let topWidth = 0,
                    rightWidth = 0,
                    bottomWidth = 0,
                    leftWidth = 0;
                if (typeof (domHoverEffect) !== "undefined") {
                    topWidth = domHoverEffect.border.top;
                    if (typeof (topWidth) != 'undefined')
                        topWidth = parseInt(topWidth);
                    topWidth = topWidth / times;
                }
                borderHoverSliderListLocal[1][4] = topWidth;

                if (typeof (domHoverEffect) !== "undefined") {
                    rightWidth = domHoverEffect.border.right;
                    if (typeof (rightWidth) != 'undefined')
                        rightWidth = parseInt(rightWidth);
                    rightWidth = rightWidth / times;
                }
                borderHoverSliderListLocal[2][4] = rightWidth;

                if (typeof (domHoverEffect) !== "undefined") {
                    bottomWidth = domHoverEffect.border.bottom;
                    if (typeof (bottomWidth) != 'undefined')
                        bottomWidth = parseInt(bottomWidth);
                    bottomWidth = bottomWidth / times;
                }
                borderHoverSliderListLocal[3][4] = bottomWidth;

                if (typeof (domHoverEffect) !== "undefined") {
                    leftWidth = domHoverEffect.border.left;
                    if (typeof (leftWidth) != 'undefined')
                        leftWidth = parseInt(leftWidth);
                    leftWidth = leftWidth / times;
                }
                borderHoverSliderListLocal[4][4] = leftWidth;

                if (borderHoverSliderListLocal[1][4] === borderHoverSliderListLocal[2][4] &&
                    borderHoverSliderListLocal[3][4] === borderHoverSliderListLocal[4][4] &&
                    borderHoverSliderListLocal[1][4] === borderHoverSliderListLocal[4][4])
                    borderHoverSliderListLocal[0][4] = borderHoverSliderListLocal[1][4];
            },
            GeneralBoxShadowEffectEvents: function () {
                let self = this;
                $self.find(`#boxshadowEffectInset${idSuffix}`).off().on('click', function () {
                    self.parentBoxShadow();
                });
                $self.find(`#ShowBoxShadowEffectOption${idSuffix}`).off().on('click', function () {
                    if ($(this).is(':checked')) {
                        $self.find('.boxShadowEffectWrappers').slideDown(400);
                        currentHoverEffect.box.on = "on";
                        self.parentBoxShadow();
                    } else {
                        $self.find('.boxShadowEffectWrappers').slideUp(400);
                        currentHoverEffect.box.on = "off";
                        self.parentBoxShadow();
                    }
                });

                let boxShadow = $parent.attr('data-hovereffect');
                $self.find(`#shadowEffectColor${idSuffix}`).css('background-color', '#000');
                let horiLen = 0;
                let verLen = 0;
                let blurRadius = 0;
                if (typeof (boxShadow) !== "undefined" && boxShadow !== null && boxShadow !== 'none') {
                    let initHoverEffect = JSON.parse($parent.attr('data-hovereffect'));
                    let $shadow = initHoverEffect.box;
                    horiLen = $shadow.hl;
                    verLen = $shadow.vl;
                    blurRadius = $shadow.br;
                    horiLen = parseInt(horiLen.replace('px', ''));
                    verLen = parseInt(verLen.replace('px', ''));
                    blurRadius = parseInt(blurRadius.replace('px', ''));
                    objBoxShadow.horizontal = horiLen;
                    objBoxShadow.vertical = verLen;
                    objBoxShadow.blur = blurRadius;
                    $self.find('.boxShadowEffectWrappers').show();
                    $self.find(`#ShowBoxShadowEffectOption${idSuffix}`).prop('checked', true);
                    $self.find(`#shadowEffectColor${idSuffix}`).css('background-color', $shadow.c);
                    let inset = $shadow.i;
                    if (inset == "true" || inset.trim() == "inset") {
                        $self.find(`#boxshadowEffectInset${idSuffix}`).prop('checked', true);
                    } else {
                        $self.find(`#boxshadowEffectInset${idSuffix}`).prop('checked', false);
                    }
                } else {
                    $self.find('.boxShadowEffectWrappers').hide();
                    $self.find(`#ShowBoxShadowEffectOption${idSuffix}`).prop('checked', false);
                    $self.find(`#shadowEffectColor${idSuffix}`).css('background-color', '#000');
                }
                let horiMaxLen = parseInt($self.find(`#boxShadowEffectMinMax${idSuffix}`).attr('data-hori-max'));
                let horiMinLen = parseInt($self.find(`#boxShadowEffectMinMax${idSuffix}`).attr('data-hori-min'));
                let vertiMaxLen = parseInt($self.find(`#boxShadowEffectMinMax${idSuffix}`).attr('data-verti-max'));
                let vertiMinLen = parseInt($self.find(`#boxShadowEffectMinMax${idSuffix}`).attr('data-verti-min'));
                let blurMaxLen = parseInt($self.find(`#boxShadowEffectMinMax${idSuffix}`).attr('data-blur-max'));
                let blurMinLen = parseInt($self.find(`#boxShadowEffectMinMax${idSuffix}`).attr('data-blur-min'));

                AdvanceSageSlider($self.find(`#${boxShadowEffectSliderListLocal[0][0]}${idSuffix}`), $self.find(`#${boxShadowEffectSliderListLocal[0][1]}${idSuffix}`), horiMinLen, horiMaxLen, horiLen, self['BoxShadowHoriLengthSlide'], $parent, 'px', self);
                AdvanceSageSlider($self.find(`#${boxShadowEffectSliderListLocal[1][0]}${idSuffix}`), $self.find(`#${boxShadowEffectSliderListLocal[1][1]}${idSuffix}`), vertiMinLen, vertiMaxLen, verLen, self['BoxShadowVerticalLengthSlide'], $parent, 'px', self);
                AdvanceSageSlider($self.find(`#${boxShadowEffectSliderListLocal[2][0]}${idSuffix}`), $self.find(`#${boxShadowEffectSliderListLocal[2][1]}${idSuffix}`), blurMinLen, blurMaxLen, blurRadius, self['BoxShadowBlurSlide'], $parent, 'px', self);

                let colorPickerOption = ColorPickerOption({
                    renderCallback: function ($elm, toggled) {
                        let objColor = RenderCallBackColor(this);
                        objBoxShadow.color = objColor.bgColor;
                        self.parentBoxShadow();
                    }
                });
                $self.find(`#shadowEffectColor${idSuffix}`).colorPicker(colorPickerOption);
            },
            BoxShadowHoriLengthSlide: function (space, $par, ref) {
                objBoxShadow.horizontal = space;
                ref.parentBoxShadow();
            },
            BoxShadowVerticalLengthSlide: function (space, $par, ref) {
                objBoxShadow.vertical = space;
                ref.parentBoxShadow();
            },
            BoxShadowBlurSlide: function (space, $par, ref) {
                objBoxShadow.blur = space;
                ref.parentBoxShadow();
            },
            parentBoxShadow: function () {
                currentHoverEffect.box.c = objBoxShadow.color + ' ';
                currentHoverEffect.box.hl = objBoxShadow.horizontal + 'px ';
                currentHoverEffect.box.vl = objBoxShadow.vertical + 'px ';
                currentHoverEffect.box.br = objBoxShadow.blur + 'px ';
                if ($self.find(`#boxshadowEffectInset${idSuffix}`).prop('checked')) {
                    currentHoverEffect.box.i = ' inset ';
                } else {
                    currentHoverEffect.box.i = '';
                }
                this.UpdateEffect();
            },
            UpdateEffect: function () {
                targets.attr('data-hovereffect', JSON2.stringify(currentHoverEffect));
            },
            init: function () {
                this.updateTargets();
                if (targets.length == 0) {
                    console.error("AdvanceHoverEffect => target does not exist");
                    return false;
                }
                boxShadowEffectSliderListLocal = [
                    ['boxShadowEffectHorizontalSlider', 'boxShadowEffectHorizontalHandler', 'boxShadowEffectHorizontal', 0],
                    ['boxShadowEffectVerticalSlider', 'boxShadowEffectVerticalHandler', 'boxShadowEffectVertical', 0],
                    ['boxShadowEffectBlurSlider', 'boxShadowEffectBlurHandler', 'boxShadowEffectBlur', 0]
                ];
                borderHoverSliderListLocal = [
                    ['bulkBorderHoverSlider', 'bulkBorderHoverHandler', false, 'BorderHoverBulk', 1, 'bulkBorderHoverColor'],
                    ['borderHoverTopSlider', 'borderHoverTopHandler', false, 'BorderHoverTop', 1, 'topBorderHoverColor'],
                    ['borderHoverRightSlider', 'borderHoverRightHandler', false, 'BorderHoverRight', 1, 'rightBorderHoverColor'],
                    ['borderHoverBottomSlider', 'borderHoverBottomHandler', false, 'BorderHoverBottom', 1, 'bottomBorderHoverColor'],
                    ['borderHoverLeftSlider', 'borderHoverLeftHandler', false, 'BorderHoverLeft', 1, 'leftBorderHoverColor']
                ];
                this.appendSettingDom(options);
                let hoverdata = $parent.attr('data-hovereffect');
                if (typeof hoverdata !== 'undefined') {
                    try {
                        currentHoverEffect = JSON.parse(hoverdata);
                    } catch (e) {
                        console.log("invalid hovereffect data");
                    }
                }
                this.initEvents();
            },
            BorderHoverBulk: function (space, $parent, self) {
                if (borderHoverSliderListLocal[1][2]) {
                    currentHoverEffect.border.top = space;
                    $self.find(`#${borderHoverSliderListLocal[1][0]}${idSuffix}`).slider('value', space);
                    $self.find(`#${borderHoverSliderListLocal[1][1]}${idSuffix}`).text(space);
                }
                if (borderHoverSliderListLocal[2][2]) {
                    currentHoverEffect.border.right = space;
                    $self.find(`#${borderHoverSliderListLocal[2][0]}${idSuffix}`).slider('value', space);
                    $self.find(`#${borderHoverSliderListLocal[2][1]}${idSuffix}`).text(space);
                }
                if (borderHoverSliderListLocal[3][2]) {
                    currentHoverEffect.border.bottom = space;
                    $self.find(`#${borderHoverSliderListLocal[3][0]}${idSuffix}`).slider('value', space);
                    $self.find(`#${borderHoverSliderListLocal[3][1]}${idSuffix}`).text(space);
                }
                if (borderHoverSliderListLocal[4][2]) {
                    currentHoverEffect.border.left = space;
                    $self.find(`#${borderHoverSliderListLocal[4][0]}${idSuffix}`).slider('value', space);
                    $self.find(`#${borderHoverSliderListLocal[4][1]}${idSuffix}`).text(space);
                }
                self.UpdateEffect();
            },
            BorderHoverTop: function (space, $parent, self) {
                currentHoverEffect.border.top = space;
                self.BorderHoverBulkNull(self);
            },
            BorderHoverRight: function (space, $parent, self) {
                currentHoverEffect.border.right = space;
                self.BorderHoverBulkNull(self);
            },
            BorderHoverBottom: function (space, $parent, self) {
                currentHoverEffect.border.bottom = space;
                self.BorderHoverBulkNull(self);
            },
            BorderHoverLeft: function (space, $parent, self) {
                currentHoverEffect.border.left = space;
                self.BorderHoverBulkNull(self);
            },
            BorderHoverBulkNull: function (self) {
                $self.find(`#${borderHoverSliderListLocal[0][0]}${idSuffix}`).slider('value', 0);
                $self.find(`#${borderHoverSliderListLocal[0][1]}${idSuffix}`).text(0);
                self.UpdateEffect();
            }
        };
        AdvanceHoverEffect.init();
    };
}(jQuery));
(function ($) {
    "use strict";
    $.fn.AdvanceGutterSpace = function (o) {
        if (typeof o === 'undefined' || typeof o.targetParent === 'undefined') {
            console.error("AdvanceGutterSpace => missing option: targetParent");
            return;
        }
        if (!(o.targetParent instanceof jQuery)) {
            console.error("AdvanceGutterSpace => targetParent should be a jQuery object");
            return;
        }
        if (typeof o.targetElem === 'undefined') {
            console.error("AdvanceGutterSpace => missing option: targetElem");
            return;
        }
        if (typeof o.itemsperrow === 'undefined') {
            console.error("AdvanceGutterSpace => missing option: itemsperrow");
            return;
        }
        //if (o.itemsperrow < 2) {
        //    console.error("AdvanceGutterSpace => itemsperrow must be at least 2");
        //    return;
        //}
        let type = "all";
        if (typeof o.type === 'undefined') {
            type = "all";
        } else
            type = o.type;
        let label = ["horizontal", " vertical"];
        if (typeof o.label !== 'undefined') {
            label = o.label;
        }
        let spacing = "padding";
        var patterns = {
            "top": 'gPt-[0-9]{1,3}',
            "topreplace": 'gPt-',
        }
        if (typeof o.spacing !== 'undefined' && o.spacing === "margin") {
            patterns = {
                "top": 'gMt-[0-9]{1,3}',
                "topreplace": 'gMt-',
            }
        }
        if (typeof o.label !== 'undefined') {
            label = o.label;
        }
        if (typeof o.defaultValue !== 'undefined') {
            defaultValue = o.defaultValue;
        }
        let $self = this,
            targetParent = o.targetParent,
            targetElem = o.targetElem,
            targets = $(targetParent).find(targetElem),
            idSuffix = '_' + Math.floor((Math.random() * 1000) + 100),
            itemsperrow = o.itemsperrow;
        targetParent.attr('data-gutterItem', itemsperrow);
        let GutterSpace = {
            updateTargets: function () {
                targets = $(targetParent).find(targetElem);
                if (targets.length == 0) {
                    console.error("AdvanceGutterSpace => target does not exists");
                    return false;
                }
                return true;
            },
            ids: ["GutterHoriSlider" + idSuffix, "GutterHoriHandle" + idSuffix, "GutterVertiSlider" + idSuffix, "GutterVertiHandle" + idSuffix],
            InitDOM: function () {
                let Dom = this.DOM();
                $self.html(Dom);
            },
            DOM: function () {
                let dom = '';
                let _this = this;
                switch (type) {
                    case "all":
                        dom += CreateSliderDOM(_this.ids[0], _this.ids[1], label[0]);
                        dom += CreateSliderDOM(_this.ids[2], _this.ids[3], label[1]);
                        break;
                    case "horizontal":
                        dom += CreateSliderDOM(_this.ids[0], _this.ids[1], label[0]);
                        break;
                    case "vertical":
                        dom += CreateSliderDOM(_this.ids[2], _this.ids[3], label[1]);
                        break;
                }
                return dom;
            },
            addEventListeners: function () {
                let _this = this;

                let space = parseInt(GetValueByClassName($(targets[0]), 'gPr-[0-9]{1,3}', 'gPr-'));
                this.HorizontalChange(space, $(targets), this);
                space = parseInt(GetValueByClassName($(targets[0]), 'gPb-[0-9]{1,3}', 'gPb-'));
                this.VerticalChange(space, $(targets), this);

                switch (type) {
                    case "all":
                        _this.horizontalGutterEvent();
                        _this.VerticalGutterEvent();
                        break;
                    case "horizontal":
                        _this.horizontalGutterEvent();
                        break;
                    case "vertical":
                        _this.VerticalGutterEvent();
                        break;
                }
            },
            horizontalGutterEvent: function () {
                let _this = this;
                let initGutter = parseInt(GetValueByClassName($(targets[0]), 'gPr-[0-9]{1,3}', 'gPr-'));
                AdvanceSageSlider($(`#${_this.ids[0]}`), $(`#${_this.ids[1]}`), 0, 50,
                    initGutter, this.HorizontalChange, $(targets), 'px', this);
            },
            HorizontalChange: function (space, $par, ref) {
                let total = $par.length;
                let counter = 0;
                for (var i = 0; i < total; i++) {
                    ref.HoriApplyRight($(targets).eq(counter), space);
                    ref.HoriApplyLeft($(targets).eq(i), space);
                    counter++;
                }
                itemsperrow = parseInt(targetParent.attr('data-gutterItem'));
            },
            HoriApplyRight: function ($tar, space) {
                ReplaceClassByPattern($tar, 'gPr-[0-9]{1,3}', 'gPr-' + space);
            },
            HoriApplyLeft: function ($tar, space) {
                ReplaceClassByPattern($tar, 'gPl-[0-9]{1,3}', 'gPl-' + space);
            },
            VertiApplyTop: function ($tar, space) {
                ReplaceClassByPattern($tar, 'gPt-[0-9]{1,3}', 'gPt-' + space);
            },
            VertiApplyBottom: function ($tar, space) {
                ReplaceClassByPattern($tar, 'gPb-[0-9]{1,3}', 'gPb-' + space);
            },
            VerticalGutterEvent: function () {
                let _this = this;
                let initGutter = parseInt(GetValueByClassName($(targets[0]), 'gPb-[0-9]{1,3}', 'gPb-'));
                AdvanceSageSlider($(`#${_this.ids[2]}`), $(`#${_this.ids[3]}`), 1, 50,
                    initGutter, this.VerticalChange, $(targets), 'px', this);
            },
            VerticalChange: function (space, $par, ref) {
                let total = $par.length;
                let rows = Math.ceil(total / itemsperrow);
                let counter = 0;
                let newspace = space;
                for (var i = 0; i < rows; i++) {
                    for (var j = 0; j < itemsperrow; j++) {
                        //if (i == 0)
                        //    ref.VertiApplyBottom($(targets).eq(counter), newspace);
                        //else if (i == itemsperrow - 1)
                        //    ref.VertiApplyTop($(targets).eq(counter), newspace);
                        //else {
                        ref.VertiApplyBottom($(targets).eq(counter), space);
                        ref.VertiApplyTop($(targets).eq(counter), space);
                        //}
                        counter++;
                    }
                }
            },
            Init: function () {
                if (!this.updateTargets()) {
                    return;
                }
                this.InitDOM();
                this.addEventListeners();
            }
        };
        GutterSpace.Init();
    }
}(jQuery));
(function ($) {
    "use strict";
    $.fn.AdvanceDimension = function (o) {
        if (typeof o === 'undefined' || typeof o.targetParent === 'undefined') {
            console.error("AdvanceDimension => missing option: targetParent");
            return;
        }
        if (!(o.targetParent instanceof jQuery)) {
            console.error("AdvanceDimension => targetParent should be a jQuery object");
            return;
        }
        if (typeof o.targetElem === 'undefined') {
            console.error("AdvanceDimension => missing option: targetElem");
            return;
        }
        if (typeof o.type === 'undefined') {
            console.error("AdvanceDimension => missing option: targetElem");
            return;
        }

        let label = "Width";
        let types = ['sfwidth', 'height', 'width'];
        let defaultValue = 1;
        let dimension = {
            regex: "",
            replace: "",
            min: 1,
            max: 100,
            unit: 'px'
        }
        switch (o.type) {
            case types[0]:
                dimension.regex = 'sfCol_[0-9]{1,3}';
                dimension.replace = 'sfCol_';
                dimension.unit = '%';
                break;
            case types[1]:
                dimension.regex = 'H-[0-9]{1,4}';
                dimension.replace = 'H-';
                dimension.max = 1080;
                break;
            case types[2]:
                dimension.regex = 'W-[0-9]{1,4}';
                dimension.replace = 'W-';
                dimension.max = 1080;
                break;
        }
        if (typeof o.label !== 'undefined') {
            label = o.label;
        }
        if (typeof o.defaultValue !== 'undefined') {
            defaultValue = o.defaultValue;
        }
        if (typeof o.min !== 'undefined') {
            dimension.min = o.min;
        }
        if (typeof o.max !== 'undefined') {
            dimension.max = o.max;
        }
        let $self = this,
            targetParent = o.targetParent,
            targetElem = o.targetElem,
            targets = $(targetParent).find(targetElem),
            idSuffix = '_' + Math.floor((Math.random() * 1000) + 100);
        let Width = {
            updateTargets: function () {
                let tar = UpdateTargets(targetParent, targetElem, 'AdvanceDimension');
                targets = tar.target;
                return tar.exists;
            },
            ids: ["DimensionSlider" + idSuffix, "DimensionHandle" + idSuffix],
            InitDOM: function () {
                let Dom = this.DOM();
                $self.html(Dom);
            },
            DOM: function () {
                let dom = '';
                let _this = this;
                dom += CreateSliderDOM(_this.ids[0], _this.ids[1], label);
                return dom;
            },
            setupData: function () { },
            addEventListeners: function () {
                let _this = this;
                let width = GetValueByClassName($(targets[0]), dimension.regex, dimension.replace);
                width = width == 0 ? defaultValue : width;
                AdvanceSageSlider($(`#${_this.ids[0]}`), $(`#${_this.ids[1]}`), dimension.min, dimension.max, width, this.WidthChange, $(targets[0]), dimension.unit, this, this.Stopfunction);
            },
            Stopfunction: function (space, $par, ref) {
                if (typeof o.stopfunction === 'function') {
                    o.stopfunction(space);
                }
            },

            WidthChange: function (space, $par, ref) {
                ReplaceClassByPattern($(targets), dimension.regex, dimension.replace + space);
                if (typeof o.callback === 'function') {
                    o.callback(space);
                }
            },
            init: function () {
                if (!this.updateTargets()) {
                    return;
                }
                this.InitDOM();
                this.addEventListeners();
                this.setupData();
            }
        };
        Width.init();
    }
}(jQuery));
(function ($) {
    "use strict";
    $.fn.AdvanceItemPerView = function (o) {
        let options = {
            label: 'Item per view',
            min: 1,
            max: 5,
            value: 1
        };
        if (typeof o !== 'undefined') {
            options = $.extend(options, o);
        }
        let $self = this,
            idSuffix = '_' + Math.floor((Math.random() * 1000) + 100);
        let AdvanceItemPerView = {
            appendDOM: function () {
                let dom = `<div class="field-row stElWrap col50-50">
                                <label class="fCol">${options.label}</label>
                                <div class="fCol TxAl-r">
                                    <span class="select__box">
                                        <select id="itemsperslider${idSuffix}">
                                        </select>
                                    </span>
                                </div>
                            </div>`;
                $self.html(dom);
                let selectOpts = [];
                for (let i = options.min; i <= options.max; i++) {
                    selectOpts.push(`<option value="${i}">${i}</option>`);
                }
                $self.find('#itemsperslider' + idSuffix).append(selectOpts.join('')).val(options.value);
            },
            addEvents: function () {
                $self.find('#itemsperslider' + idSuffix).on('change', function () {
                    if (typeof options.onChange === 'function') {
                        options.onChange($(this).val());
                    }
                });
            },
            init: function () {
                this.appendDOM();
                this.addEvents();
            }
        };
        AdvanceItemPerView.init();
    }
}(jQuery));

function UpdateTargets(targetParent, targetElem, libraryname) {
    let targets = targetParent.is(targetElem) ? targetElem : $(targetParent).find(targetElem);
    if (targets.length == 0) {
        console.error(`${libraryname} => target does not exists`);
        return {
            exists: false,
            target: targets
        };
    }
    return {
        exists: true,
        target: targets
    };
}
(function ($) {
    "use strict";
    $.fn.AdvanceScrollEffect = function (o) {
        if (typeof o === 'undefined' || typeof o.targetParent === 'undefined') {
            console.error("AdvanceScrollEffect => missing option: targetParent");
            return;
        }
        if (!(o.targetParent instanceof jQuery)) {
            console.error("AdvanceScrollEffect => targetParent should be a jQuery object");
            return;
        }
        if (typeof o === 'undefined' || typeof o.targetElem === 'undefined') {
            console.error("AdvanceScrollEffect => missing option: targetElem");
            return;
        }
        let $self = this,
            targetParent = o.targetParent,
            targetElem = o.targetElem,
            targets = $(targetParent).find(targetElem),
            idSuffix = '_' + Math.floor((Math.random() * 1000) + 100);
        let AdvanceScrollEffect = {
            getDOM: function () {
                //let effectArray = [["none", "None"]];
                //$.each(customScrollEffectList, function (i, val) {
                //    effectArray.push(JSON.parse(val));
                //});
                //debugger

                //let DOM = CreateSelectGroupDOM('idsdfsfds', 'cadscsacas', selectOption);
                let effectDOM = FieldRowDOMCreateCol50_50(
                    DOMCreate('label', 'Scroll Effect', 'fCol') +
                    DOMCreate('div',
                        DOMCreate('span',
                            //SelectDOMCreate('scrolleffect' + idSuffix, 'scrolleffect', [['none', 'None'],['slide','slide'], ['fade-up', 'fade-up'], ['fade-down', 'fade-down'], ['fade-left', 'fade-left'], ['fade-right', 'fade-right']]),//['zoom-in', 'zoom-in'], ['zoom-out', 'zoom-out']
                            CreateSelectGroupDOM('scrolleffect' + idSuffix, 'scrolleffect', effectSelectOption),
                            'select__box'),
                        'fCol TxAl-r')
                );
                let delayDOM = DOMCreate('div',
                    DOMCreate('label', 'Delay', 'fCol') +
                    DOMCreate('div',
                        DOMCreate('span',
                            SelectDOMCreate('delayscrolleffect' + idSuffix, 'delayscrolleffect', [
                                ['0', '0'],
                                ['50', '50'],
                                ['100', '100'],
                                ['200', '200'],
                                ['300', '300'],
                                ['400', '400'],
                                ['800', '800'],
                                ['1200', '1200'],
                                ['1600', '1600'],
                                ['1200', '1200'],
                                ['2000', '2000'],
                                ['2400', '2400'],
                                ['2800', '2800'],
                                ['3200', '3200'],
                                ['3600', '3600'],
                                ['4000', '4000']
                            ]),
                            'select__box'),
                        'fCol TxAl-r'),
                    'field-row stElWrap col50-50 Dn', 'delayscrolleffectWrap' + idSuffix);
                let durationDOM = DOMCreate('div',
                    DOMCreate('label', 'Duration', 'fCol') +
                    DOMCreate('div',
                        DOMCreate('span',
                            SelectDOMCreate('durationScrolleffect' + idSuffix, 'durationScrolleffect', [
                                ['0', '0s'],
                                ['1000', '1s'],
                                ['2000', '2s'],
                                ['3000', '3s'],
                                ['4000', '4s'],
                                ['5000', '5s'],
                                ['6000', '6s'],
                                ['7000', '7s'],
                                ['8000', '8s'],
                                ['9000', '9s'],
                                ['10000', '10s'],
                                ['11000', '11s'],
                                ['12000', '12s']
                            ]),
                            'select__box'),
                        'fCol TxAl-r'),
                    'field-row stElWrap col50-50 Dn', 'durationScrolleffectWrap' + idSuffix);
                let previewDOM = DOMCreate('div', DOMCreate('div', DOMCreate('span', 'Preview', 'stngSmallBtn', 'btnPreviewEffect'),
                    'fCol TxAl-l'), 'field-row stElWrap col100');

                return FieldRowDOMCreate(effectDOM + delayDOM + durationDOM + previewDOM);
            },
            appendDOM: function () {
                $self.html(this.getDOM());
            },
            addEventListeners: function () {
                if (!this.updateTargets()) {
                    return;
                }
                $('#btnPreviewEffect').off().on('click', function () {
                    ApplyScrollEffect(targets, $('#scrolleffect' + idSuffix).val(), $('#durationScrolleffect' + idSuffix).val());
                });
                $self.find('#scrolleffect' + idSuffix).on('change', function () {
                    let value = $(this).val();
                    targets.attr('data-scroll', value);
                    if (value === "none") {
                        targets.removeClass('scroll-begin');
                        targets.removeAttr('data-scroll');
                        $self.find('#delayscrolleffectWrap' + idSuffix).addClass('Dn');
                        $self.find('#durationScrolleffectWrap' + idSuffix).addClass('Dn');
                    } else {
                        $self.find('#delayscrolleffectWrap' + idSuffix).removeClass('Dn');
                        $self.find('#durationScrolleffectWrap' + idSuffix).removeClass('Dn');
                        if (!targets.hasClass('scroll-begin'))
                            targets.addClass('scroll-begin');
                    }

                });

                $self.find('#delayscrolleffect' + idSuffix).on('change', function () {
                    let value = $(this).val();
                    targets.attr('data-scrolldelay', value);
                });
            },
            setup: function () {
                let scrollClass = 'none';
                let $selectedLayer = $(targets[0]);
                //$self.find('#delayscrolleffectWrap' + idSuffix).hide();
                if ($selectedLayer.hasClass('scroll-begin')) {
                    scrollClass = $selectedLayer.attr('data-scroll');
                    $self.find('#delayscrolleffectWrap' + idSuffix).removeClass('Dn');
                }
                $self.find('#scrolleffect' + idSuffix).val(scrollClass);
                let delayamount = '0';
                if ($selectedLayer.hasClass('scroll-begin') && typeof ($selectedLayer.attr('data-scrolldelay')) !== "undefined") {
                    delayamount = $selectedLayer.attr('data-scrolldelay');
                }
                $self.find('#delayscrolleffect' + idSuffix).val(delayamount);
            },
            updateTargets: function () {
                let tar = UpdateTargets(targetParent, targetElem, 'AdvanceScrollEffect');
                targets = tar.target;
                return tar.exists;
            },
            init: function () {
                this.appendDOM();
                this.setup();
                this.addEventListeners();
            }
        };
        AdvanceScrollEffect.init();
    }
}(jQuery));

function CallFunction(fn, value) {
    if (typeof (fn) === "function")
        fn(value);
}



function CreateSelectGroupDOM(selID, selClass, Array) {
    var selDOM = '<select';
    if (typeof (selID) !== 'undefined' && selID.length > 0) {
        selDOM += ' id="' + selID + '"';
    }
    if (selID !== 'undefined') {
        selDOM += ' class="' + selClass + '"';
    }
    selDOM += '>';
    if (typeof (Array) !== 'undefined') {
        $.each(Array, function (index, val) {
            selDOM += `<optgroup label="${index}">`
            $.each(val, function (i, v) {
                selDOM += `<option value="${v.effect}">${v.name}</option>`;
            });
            selDOM += '</optgroup>'
        });
    }
    selDOM += '</select>';
    return selDOM;
}


(function ($) {
    "use strict";

    function DynamicCmpItemsSetting(instance, options) {
        this.instance = instance;
        this.options = options;
        this.$el = $(this.instance);
        this.limit = 0;
        this.offset = 0;
        this.init();
    }
    DynamicCmpItemsSetting.prototype = {
        init: function () {
            let self = this;
            self.appendDOM();
            self.setup();
        },
        setup: function () {
            let self = this;
            let unlimit = $activeDOM.attr('data-unlimit');
            if (unlimit == 1) {
                $('#dynCmpAllItems').prop('checked', true);
                $('#dynCmpItemSlider').addClass('Dn');
            } else {
                $('#dynCmpAllItems').prop('checked', false);
                $('#dynCmpItemSlider').removeClass('Dn');
            }
            let limit = $activeDOM.attr('data-limit');
            let max = 100;
            if (typeof limit === 'undefined') {
                limit = 50;
            }
            let offset = $activeDOM.attr('data-offset');
            if (typeof offset === 'undefined') {
                offset = 0;
            }
            AdvanceSageSlider(self.$el.find('#dynCmpItemSlide'), self.$el.find('#dynCmpItemSlideHandler'), 1, max, limit, self.onLimitChange, $activeDOM, '', self);
            let $offsetInput = self.$el.find('#dynCmpItemOffset');
            $offsetInput.val(offset);
            $offsetInput.off().on('change', function () {
                let v = $offsetInput.val();
                if (v >= 0) {
                    $activeDOM.attr('data-offset', v);
                    self.bindOnChange(self);
                }
            });
            $('#dynCmpAllItems').off().on("click", function () {
                if ($(this).is(':checked')) {
                    $('#dynCmpItemSlider').addClass('Dn');
                    $activeDOM.attr('data-unlimit', 1);
                } else {
                    $('#dynCmpItemSlider').removeClass('Dn');
                    $activeDOM.attr('data-unlimit', 0);
                }
                self.bindOnChange(self);
            });
        },
        bindOnChange: function (self) {
            let p = self.options.bindOnChange;
            if (typeof p === 'undefined' || p !== true) {
                return;
            }
            let cmpName = $activeDOM.attr('data-type');
            let cmp = component[cmpName];
            if (typeof cmp === 'undefined') {
                return;
            }
            if (typeof cmp.inherits !== 'undefined') {
                cmp = component[cmp.inherits];
            }
            if (typeof cmp.library === 'undefined' || typeof cmp.library.populateData !== 'function') {
                return;
            }
            if (typeof cmp.library.beforeItemSettingChange === 'function') {
                cmp.library.beforeItemSettingChange($activeDOM);
            }
            if (typeof cmp.library.clearList === 'function') {
                cmp.library.clearList($activeDOM);
            }
            cmp.library.populateData(cmpName, $activeDOM);
            //reattach setting events
            if (typeof cmp.library.display !== 'undefined') {
                try {
                    let display = cmp.library.display.getDisplay($activeDOM);
                    cmp.library.display.options[display].setupSettings();
                } catch (e) {
                    //
                }
            }
        },
        onLimitChange: function (val, $target, self) {
            $target.attr('data-limit', val);
            self.bindOnChange(self);
        },
        appendDOM: function () {
            let self = this;
            self.$el.empty();
            if (self.optionHasValue('limit', true, true)) {
                self.$el.append(self.getLimitDOM());
            }
            if (self.optionHasValue('offset', true, true)) {
                self.$el.append(self.getOffsetDOM());
            }
        },
        optionHasValue: function (option, value, strict) {
            let self = this;
            if (typeof self.options[option] === 'undefined') {
                return false;
            }
            if (typeof strict !== 'undefined' && strict === true) {
                return self.options[option] === value;
            }
            return self.options[option] == value;
        },
        getLimitDOM: function () {
            return `<div class="field-row stElWrap col50-50">
                        <label class="fCol">Show all items</label>
                        <div class="fCol TxAl-r">
                            <span class="toggle_btn">
                                <input type="checkbox" id="dynCmpAllItems" name="dynCmpAllItems">
                                <label for="dynCmpAllItems" class ="tgl_slider"></label>
                            </span>
                        </div>
                    </div>
                    <div class="field-row stElWrap" id="dynCmpItemSlider">
                        <span class="range__slider fCol">
                            <div id="dynCmpItemSlide">
                                <div id="dynCmpItemSlideHandler" class ="ui-slider-handle" title="Display items"></div>
                            </div>
                        </span>
                    </div>`;
        },
        getOffsetDOM: function () {
            return `<div class="field-row stElWrap col50-50">
                        <label class="fCol">Total Skip Item</label>
                        <span class="fCol cb_input">
                            <input type="number" id="dynCmpItemOffset" min="0">
                            <span class="info">Skip number of first item</span>
                        </span>
                    </div>`;
        }
    };
    $.fn.DynamicCmpItemsSetting = function (options) {
        return this.each(function () {
            new DynamicCmpItemsSetting(this, options);
        });
    };
}(jQuery));

(function ($) {
    "use strict";
    $.fn.AdvanceSliderDots = function (o) {
        if (typeof o === 'undefined' || typeof o.targetParent === 'undefined') {
            console.error("AdvanceSliderDots => missing option: targetParent");
            return;
        }
        if (!(o.targetParent instanceof jQuery)) {
            console.error("AdvanceSliderDots => targetParent should be a jQuery object");
            return;
        }
        if (typeof o === 'undefined' || typeof o.targetElem === 'undefined') {
            console.error("AdvanceSliderDots => missing option: targetElem");
            return;
        }
        let $self = this,
            targetParent = o.targetParent,
            targetElem = o.targetElem,
            targetSliderWrap = o.targetSliderWrap,
            targets = $(targetParent).find(targetElem),
            targetActiveDot = $(targetParent).find(o.targetActiveDot),
            idSuffix = '_' + Math.floor((Math.random() * 1000) + 100),
            options = ["color"],
            callback = '';
        if (typeof o.options !== 'undefined' && o.options && o.options instanceof Array) {
            options = o.options;
        }
        if (typeof o.callback !== 'undefined')
            callback = o.callback;

        let AdvanceSliderDots = {
            updateTargets: function () {
                let tar = UpdateTargets(targetParent, targetElem, 'AdvanceSliderDots');
                targets = tar.target;
                return tar.exists;
            },
            appendBGChangerDOM: function () {
                let bgChDom = this.GeneralBackgroundDOM();
                let dotsShapeDOM = this.GeneralDotsShapeDOM();
                let dotsSizeDOM = this.GenerelDotsSizeDOM();
                bgChDom = this.fixDomId(bgChDom);
                $self.html(bgChDom);
                $self.append(dotsShapeDOM + dotsSizeDOM); // + dotsShapeDOM);
            },
            GeneralDotsShapeDOM: function () {
                let dotsDOM = '';
                if (o.sliderShape) {
                    dotsDOM = `<div class="field-row stElWrap col50-50">
                                    <label class="fCol">Slider Dots Shape</label>
                                         <div class="fCol TxAl-r"><span class="select__box">
                                            <select id="slcDotsShape${idSuffix}">
                                                <option value="50%">Round</option>
                                               <option value="0px">Square</option>                                   
                                   </select></span></div>
                                   </div>`;
                    return dotsDOM;
                }
            },
            GenerelDotsSizeDOM: function () {
                let sizeDOM = '';
                if (o.dotsSize) {
                    sizeDOM = `<div class="field-row stElWrap col100">
                                <div class="range__slider fCol">
                                    <div id="dotsSizeSlider${idSuffix}">
                                        <div id="dotsSizeHandle${idSuffix}" class="ui-slider-handle" title="Dots Size">0</div>
                                    </div>
                                </div>
                            </div>`;
                    return sizeDOM;
                }
            },
            GeneralBackgroundDOM: function () {
                let backGroundDOM = '';
                let optionLen = options.length;
                if (optionLen > 0) {
                    if (optionLen == 1) {
                        if (optionLen > 1)
                            backGroundDOM += DOMCreate('h4', 'Dots Background');
                        backGroundDOM += `<div class="field-row stElWrap col50-50" id="divBackColorChoose">
                                            <label class="fCol">Dots Color</label>
                                            <div class="fCol TxAl-r">
                                            <span class="color-picker-holder chooseBGColors selected" id="chooseColorColBG" style="background-color:rgba(247, 247, 247,.8);color:rgb(34, 34, 34);">
                                            </span></div></div>
                                            <div class="field-row stElWrap col50-50" id="divBackColorChoose">
                                            <label class="fCol">Active Dot Color</label>
                                            <div class="fCol TxAl-r">
                                            <span class="color-picker-holder chooseBGColors selected" id="activeDotsColBG" style="background-color:rgba(247, 247, 247,.8);color:rgb(34, 34, 34);">
                                            </span></div></div>`; //ExternalFileDoms.divbackcolorchoose;
                        backGroundDOM = FieldRowDOMCreate(backGroundDOM);
                    } else {
                        backGroundDOM += ExternalFileDoms.backgroundtab;
                    }
                }
                return backGroundDOM;
            },
            setupColorPicker: function () {
                let self = this;
                let colorPickerOption = ColorPickerOption({
                    renderCallback: function ($elm, toggled) {
                        let objColor = RenderCallBackColor(this);
                        if (typeof o.colorCallBack == 'function')
                            o.colorCallBack(objColor);
                        let colorPickerID = $elm.attr('id');
                        self.updateTargets();

                        switch (colorPickerID) {
                            case 'chooseColorColBG' + idSuffix:
                                $.each(targets.not($(targetParent).find(o.targetActiveDot)), function (i, target) {
                                    $(target).css({
                                        'background-color': objColor.bgColor
                                    });
                                });
                                $(targetSliderWrap).attr('data-dots-color', objColor.bgColor);
                                break;
                            case 'activeDotsColBG' + idSuffix:
                                $.each($(targetParent).find(o.targetActiveDot), function (i, target) {
                                    $(target).css({
                                        'background-color': objColor.bgColor
                                    });
                                    $(targets).css('border-color', objColor.bgColor);
                                });
                                $(targetSliderWrap).attr('data-activedot-color', objColor.bgColor);
                                break;
                        }
                    }
                });
                $self.find('.chooseBGColors').colorPicker(colorPickerOption);
            },
            addEventListeners: function () {
                if (!this.updateTargets()) {
                    return;
                }
                let self = this;
                let bgColor = $($(targets).not(o.targetActiveDot)[0]).css('background-color');
                let activeCol = $(targetActiveDot[0]).css('background-color');
                let txtColor = $(targets[0]).css('color');
                if (typeof ($(targets[0]).attr('style')) === 'undefined' || typeof (bgColor) === "undefined") {
                    bgColor = "rgba(255, 255, 255, 0)";
                }
                if (typeof ($(targetActiveDot[0]).attr('style')) === 'undefined' || typeof (activeCol) === "undefined") {
                    activeCol = "rgba(255, 255, 255, 0)";
                }
                if (typeof ($(targets[0]).attr('style')) === 'undefined' || typeof (txtColor) === "undefined") {
                    txtColor = "rgba(0, 0, 0, 0)";
                }
                let prevhovereffect = $(targets[0]).attr('data-prevhovereffect');
                if (typeof prevhovereffect !== 'undefined') {
                    let tmpEff = JSON.parse(prevhovereffect);
                    if (tmpEff.bg) {
                        bgColor = tmpEff.bg;
                    }
                    if (tmpEff.font) {
                        txtColor = tmpEff.font;
                    }
                }
                //final
                $self.find(`#chooseColorColBG${idSuffix}`).css({
                    'background-color': bgColor,
                    'color': txtColor
                });
                $self.find(`#activeDotsColBG${idSuffix}`).css({
                    'background-color': activeCol
                });

                let backgroundColor = $(targets[0]).attr('data-backgroundColor');

                let selected = 'none';
                if (typeof (backgroundColor) !== 'undefined' && backgroundColor.length > 0) {
                    selected = 'color';
                }
                $self.find(`#selBackround${idSuffix}`).val(selected);
                $self.find(`#selBackround${idSuffix}`).trigger('change');

                //Dots Shape
                $self.find(`#slcDotsShape${idSuffix}`).off("change").on("change", function () {
                    let val = $(this).val();
                    let $targEle = $(targetParent).find(targetElem);
                    if (val === 'round') {
                        $targEle.css({
                            "border-radius": "50%"
                        });

                    } else {
                        $targEle.css({
                            "border-radius": val
                        });
                    }
                    $(targetSliderWrap).attr('data-dots-shape', val);
                });
                this.dotsSizeEvents();

            },
            dotsSizeEvents: function () {

                function DotsWidthChange(space) {
                    ReplaceClassByPattern(targets, 'W-[0-9]{1,4}', 'W-' + space);
                }

                function DotsHeightChange(space) {
                    ReplaceClassByPattern(targets, 'H-[0-9]{1,4}', 'H-' + space);
                }

                function DotsHeightWidthChange(space) {
                    DotsHeightChange(space);
                    DotsWidthChange(space);
                    $(targetSliderWrap).attr('data-dot-size', `H-${space} W-${space}`);
                }

                function dotsHeightWidth() {
                    let dotSize = GetValueByClassName(targets, 'H-[0-9]{1,4}', 'H-');
                    dotSize = dotSize === 0 ? targets.height() : dotSize;
                    AdvanceSageSlider($(`#dotsSizeSlider${idSuffix}`), $(`#dotsSizeHandle${idSuffix}`), 1, 800, dotSize, DotsHeightWidthChange, $(targetParent), 'px'); //, this.addEventListeners());                    
                }
                dotsHeightWidth();
            },
            removeBGColor: function (bgColor, txtColor) {
                if (!this.updateTargets()) {
                    return;
                }
                $.each(targets, function (i, target) {
                    $(target).css({
                        'background-color': '',
                        'color': ''
                    });
                });
                $self.find(`#chooseColorColBG${idSuffix}`).css({
                    'background-color': bgColor,
                    'color': txtColor
                });
            },
            fixDomId: function (dom) {
                let ids = ['selBackround', 'divBackColorChoose', 'chooseColorColBG', 'activeDotsColBG'];
                let $dom = $(dom);
                for (let i = 0, j = ids.length; i < j; i++) {
                    $dom.find('#' + ids[i]).removeAttr('id').attr('id', ids[i] + idSuffix);
                }
                //$dom.find("label[for='shadedLayerActive']").attr('for', 'shadedLayerActive' + idSuffix);
                return $dom[0];
            },
            setSelectedSetting: function () {
                let dotShape = $(targetSliderWrap).attr("data-dots-shape");
                if (dotShape !== 'undefined')
                    $self.find(`#slcDotsShape${idSuffix}`).val($(targetSliderWrap).attr("data-dots-shape"));
            },
            init: function () {
                this.appendBGChangerDOM();
                this.addEventListeners();
                this.setupColorPicker();
                this.setSelectedSetting();
            }
        };
        AdvanceSliderDots.init();
    };
}(jQuery));