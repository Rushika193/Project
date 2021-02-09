var tabs = {
    "tabs": {
        "componentname": "tabs",
        "category": "advance",
        "icon": "fa fa-th-list",
        "row": false,
        "hidden": false,
        "collection": false,
        "bucket": true,
        "type": "element",
        "defaultdata": EasyLibrary.ReadDOM('tab/tabview'),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) {

        },
        "afterdrop": function ($appendedParent, TabsViewDom, dropped) {
            if ($(document).find('#hdnTabSettingAttr').length <= 0)
                $('body').append('<div data-attribute="" style="display: none;" id="hdnTabSettingAttr"></div>');
            $(".tabsDiv .tabs li").click(function () {
                let tabContainer = $(this).parents('.tabsDiv');
                tabContainer.find(".tabs li").removeClass("selected");
                $(this).toggleClass("selected");
                let pos = tabContainer.find(".tabs li.selected").index();
                let obj = tabContainer.find(".tab-content-wrapper > .container:eq( " + pos + " )");
                tabContainer.find(".tab-content-wrapper > .container").hide();
                $(obj).css('display', 'block');
                let tabColor = $(this).parents('.customTab').attr('data-activecolor');
                let tabActiveTxtColor = $(this).parents('.customTab').attr('data-txtactivehovercolor');
                tabContainer.find(".tabs li").css("background-color", $(this).parents('.customTab').attr('data-backgroundcolor'));
                tabContainer.parents('.customTab').find('.tab-nav > .tabs > li.selected').css("background-color", tabColor);

                tabContainer.find(".tabs li").not('.selected').find('span').css("color", $(this).parents('.customTab').attr('data-txtcolor'));
                tabContainer.find(".tabs li.selected").find('span').css("color", tabActiveTxtColor);
            });

            $(".tab-nav .tabs").each(function () {
                $(this).find("li:first").click();
            });
            $(".tab-nav > .tabs > li").unbind("mouseover mouseout");
            $('.tab-nav > .tabs > li').on('mouseover mouseout', function (evt) {

                if (!$(this).hasClass('selected')) {
                    let masterContainer = $(this).parents('.customTab');
                    let hoverColor = masterContainer.attr('data-hovercolor');
                    let basicColor = masterContainer.attr('data-backgroundcolor');
                    let txtHoverColor = masterContainer.attr('data-txthovercolor');
                    let txtBasicColor = masterContainer.attr('data-txtcolor');

                    evt.type === 'mouseover' ? $(this).css("background-color", hoverColor) : $(this).css("background-color", basicColor);
                    evt.type === 'mouseover' ? $(this).find('span').css("color", txtHoverColor) : $(this).find('span').css("color", txtBasicColor);

                }
            });
            this.resize();
        },
        "onsort": function (ui) {

        },
        "resize": function (from, to) {
            let device = ViewDeviceAlpha();
            if (EditorMode && typeof from !== 'undefined' && (from == 'm' || from == 't')) {
                let self = this;
                let $tabsCmp = $('.customTab');
                $tabsCmp.each(function (i, t) {
                    self.view.library.syncTabsWithAccordion(t);
                });
            }
            if (device.length > 0 && (device == 't' || device == 'm')) {
                this.view.library.convertTabsToAccordion();
                $('.tabsAsAccordion').removeClass('Dn');
                $('.tabsAsTab').addClass('Dn');
            } else {
                this.view.library.initTab();
                $('.tabsAsAccordion').addClass('Dn');
                $('.tabsAsTab').removeClass('Dn');
            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic":
                {
                    "DOM": EasyLibrary.ReadDOM('tab/tabbasicsetting'),
                    "onload": function ($item) {
                        let CustomTab = {
                            parent: $item.closest('.SetHdlr').parent(),

                            init: function () {
                                let attr = $('#hdnTabSettingAttr').data('attribute');
                                if (attr != '') {
                                    $('#popupModel').attrs(attr);
                                    $('#hdnTabSettingAttr').data('attribute', '');
                                }
                                let tabs = CustomTab.parent.find('.tabs li.tabItem');
                                let tabLength = tabs.length;
                                let html = '';
                                $(tabs).each(function (index, element) {
                                    let TabName = $(this).find('span.tabItemTitle').text();
                                    html += '<div class="item field-row stElWrap col100">';
                                    html += '<span class="sfCol_10 cPointer TxAl-c"><i class="fa fa-arrows-v tabSort"></i></span>';
                                    html += '<span class="sfCol_80 TxAl-l cb_input"><input type="text" class="tabsTabName" value="' + TabName + '"></span>';
                                    if (tabLength != 1)
                                        html += '<span class="sfCol_10 TxAl-r"><i title="Delete" class="deleteTab fa fa-trash in-form-icon delete-icon"></i></span>';
                                    html += '</div>';
                                });
                                $('.tabListEdit').html(html);

                                if (CustomTab.parent.find('.tabsDiv').hasClass('hr-tab-mode')) {
                                    $("#tabMode").val(1);
                                }
                                else {
                                    $("#tabMode").val(2);
                                }
                                CustomTab.UIevent();
                            },
                            UIevent: function () {
                                //sorting
                                $(".tabListEdit").AdvanceSorting({
                                    targetParent: CustomTab.parent.find('.tabsDiv'),
                                    targetElem: ['.tabItem', '.tab-content-wrapper > .container'],
                                    sortableOptions: {
                                        items: "div.item",
                                        handle: ".tabSort",
                                        containment: 'div.tabListEdit'
                                    }
                                });
                                //tab name change
                                $('.tabsTabName').off().on('blur keyup', function () {
                                    let $pos = $('.tabListEdit .item').index($(this).closest('.item'));
                                    CustomTab.parent.find('.tabsDiv .tabs li.tabItem').eq($pos).find('span.tabItemTitle').text($(this).val());
                                });
                                $('.deleteTab').off().on("click", function (index, item) {
                                    let $this = $(this).parents('.item');
                                    let pos = $('.tabListEdit .item').index($(this).parents('.item'));
                                    CustomTab.parent.find('.tabsDiv .tab-content-wrapper > .container').eq(pos).remove();
                                    CustomTab.parent.find('.tabsDiv .tabs li.tabItem').eq(pos).remove();
                                    CustomTab.init();
                                });
                                $('.sfAddTab').off().on("click", function (index, item) {
                                    let lastTab = CustomTab.parent.find('.tabsDiv .tabs li.tabItem').last();
                                    let tab = document.createElement("li");
                                    $(tab).attrs(lastTab.attrs());
                                    $(tab).html(lastTab.html());
                                    let tabContainer = CustomTab.parent.find('.tabsDiv .tabs');
                                    tabContainer.prepend(tab);
                                    let lastContainer = CustomTab.parent.find('.tabsDiv .tab-content-wrapper > .container').last();
                                    let container = document.createElement("div");
                                    $(container).attrs(lastContainer.attrs());
                                    $(container).html(lastContainer.html());
                                    lastContainer.parent().prepend(container);
                                    component["tabs"].afterdrop();
                                    $('#hdnTabSettingAttr').data('attribute', $('#popupModel').attrs());
                                    SettingEvents();
                                    $item.trigger('click');
                                });
                                //display mode
                                $('#tabMode').on('change', function () {
                                    let tabContainer = CustomTab.parent;
                                    if (this.value === '1') {
                                        tabContainer.find('.tabsDiv').removeClass('vr-tab-mode').addClass('hr-tab-mode');
                                        tabContainer.find('.tabsDiv > .tab-nav > ul').removeClass('li-float-none').addClass('li-float-left');
                                    } else {
                                        tabContainer.find('.tabsDiv').removeClass('hr-tab-mode').addClass('vr-tab-mode');
                                        tabContainer.find('.tabsDiv > .tab-nav > ul').removeClass('li-float-left').addClass('li-float-none');
                                    }

                                });
                            }
                        };
                        CustomTab.init();
                    }
                },
                "Text": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('tab/tabtextsetting'),
                    "onload": function ($item) {
                        $('#settingsFor').off('change').on('change', function () {
                            let selected = $(this).val();
                            $('#titleSetting').addClass('Dn');
                            $('#headingSetting').addClass('Dn');
                            $('#contentSetting').addClass('Dn');
                            $(`#${selected}Setting`).removeClass('Dn');
                        });
                        $("#tabTitleSet").AdvanceTextSetting({
                            targetParent: $activeDOM,
                            targetElem: '.tabItemTitle',
                            options: {
                                color: false,
                                width: false,
                            }
                        });
                        $("#tabHeadingSet").AdvanceTextSetting({
                            targetParent: $activeDOM,
                            targetElem: 'h1.editor-para',
                            options: {
                                width: false,
                            }
                        });
                        $("#tabContentSet").AdvanceTextSetting({
                            targetParent: $activeDOM,
                            targetElem: 'p.editor-para',
                            options: {
                                width: false,
                            }
                        });
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": '<div id="tabMarginSet"></div><div id="tabPaddingSet"></div>',
                    "onload": function ($item) {
                        $('#tabMarginSet').AdvanceSpacing({
                            targetParent: $activeDOM.parent(),
                            targetElem: $activeDOM,
                            "options": {
                                "margin": {
                                    "max": 80,
                                    "min": -80,
                                    "times": 5,
                                    "position": ["all", "top", "left", "bottom", "right"]
                                },
                            },
                        });
                        $('#tabPaddingSet').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: 'li.tabItem',
                            saveClasses: true,
                            "options": {
                                "padding": {
                                    "max": 80,
                                    "min": 0,
                                    "times": 5,
                                    "position": ["all", "top", "left", "bottom", "right"]
                                }
                            }
                        });
                    },
                },
                "Alignment":
                {
                    "custom": true,
                    "DOM": '<div id="titleAlign"></div><div id="headAlign"></div><div id="contentAlign"></div>',
                    "onload": function ($item) {
                        $('#titleAlign').AdvanceAlignment({
                            targetParent: $activeDOM,
                            targetElem: 'li.tabItem',
                            labels: {
                                'horizontal': 'Title Alignment'
                            }
                        });
                        $('#headAlign').AdvanceAlignment({
                            targetParent: $activeDOM,
                            targetElem: '.com-heading',
                            labels: {
                                'horizontal': 'Heading Alignment'
                            }
                        });
                        $('#contentAlign').AdvanceAlignment({
                            targetParent: $activeDOM,
                            targetElem: '.paragraph',
                            labels: {
                                'horizontal': 'Content Alignment'
                            }
                        });
                    },
                },

                //"Display Mode": {
                //    "DOM": EasyLibrary.ReadDOM('tab/tabdisplaymode'),
                //    "onload": function ($elem) {
                //        $('input[type=radio][name=tabMode]').on('change', function () {
                //            let tabContainer = $elem.parents('.customTab');
                //            if (this.value === '1') {
                //                tabContainer.find('.tabsDiv').removeClass('vr-tab-mode').addClass('hr-tab-mode');
                //                tabContainer.find('.tabsDiv > .tab-nav > ul').removeClass('li-float-none').addClass('li-float-left');
                //            }
                //            else {

                //                tabContainer.find('.tabsDiv').removeClass('hr-tab-mode').addClass('vr-tab-mode');
                //                tabContainer.find('.tabsDiv > .tab-nav > ul').removeClass('li-float-left').addClass('li-float-none');
                //            }

                //        });
                //    }
                //},
            },
        },
        "styleDOMs": {
            "tabs": {
                "Color": {
                    "DOM": EasyLibrary.ReadDOM('tab/tabcolorsetting'),
                    "onload": function ($elem) {
                        let tabContainer = $elem.parents('.customTab');
                        $('.tabActiveClr').css('background-color', tabContainer.attr('data-activecolor'));
                        let colorPickerActive = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                let objColor = RenderCallBackColor(this);
                                tabContainer.attr('data-activecolor', objColor.bgColor);
                                tabContainer.find('.tab-nav > .tabs > li.selected').css("background-color", objColor.bgColor);

                            }
                        });
                        $('.tabActiveClr').colorPicker(colorPickerActive);

                        let colorPickerHover = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                let objColor = RenderCallBackColor(this);
                                tabContainer.attr('data-hovercolor', objColor.bgColor);
                            }
                        });
                        $('.tabHoverClr').css('background-color', tabContainer.attr('data-hovercolor'));
                        $('.tabHoverClr').colorPicker(colorPickerHover);

                        let colorPickerBg = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                let objColor = RenderCallBackColor(this);
                                tabContainer.attr('data-backgroundcolor', objColor.bgColor);
                                tabContainer.find('.tab-nav > .tabs > li:not(.selected)').css("background-color", objColor.bgColor);
                            }
                        });
                        $('.tabBgClr').css('background-color', tabContainer.attr('data-backgroundcolor'));
                        $('.tabBgClr').colorPicker(colorPickerBg);

                        let colorPickerTxtBasicColor = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                let objColor = RenderCallBackColor(this);
                                tabContainer.attr('data-txtcolor', objColor.bgColor);
                                tabContainer.find('.tab-nav > .tabs > li').not('.selected').find('span').css("color", objColor.bgColor);
                            }
                        });
                        $('.tabtxtBasicClr').css('background-color', tabContainer.attr('data-txtcolor'));
                        $('.tabtxtBasicClr').colorPicker(colorPickerTxtBasicColor);
                        let colorPickerTxtHover = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                let objColor = RenderCallBackColor(this);
                                tabContainer.attr('data-txthovercolor', objColor.bgColor);
                            }
                        });
                        $('.tabtxtHoverClr').css('background-color', tabContainer.attr('data-txthovercolor'));
                        $('.tabtxtHoverClr').colorPicker(colorPickerTxtHover);


                        let colorPickerActiveTxtHover = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                let objColor = RenderCallBackColor(this);
                                tabContainer.attr('data-txtactivehovercolor', objColor.bgColor);
                                tabContainer.find('.tab-nav > .tabs > li.selected >span').css("color", objColor.bgColor);
                            }
                        });
                        $('.tabActivetxtHoverClr').css('background-color', tabContainer.attr('data-txthovercolor'));
                        $('.tabActivetxtHoverClr').colorPicker(colorPickerActiveTxtHover);
                    }
                },
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    },
                    "selectLayer": function ($elem) {
                        return $elem.parents('.customTab').find('.tabsDiv > .tab-nav > ul > li');
                    },
                },
            }
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "title fontsize": {
                            "DOM": "<div class='field-row stElWrap'><label>Title</label></div><div id='resAccTitle'></div><div class='field-row stElWrap'><label>Heading</label></div><div id='resAccHead'></div><div class='field-row stElWrap'><label>Content</label></div><div id='resAccContent'></div>",
                            "prepend": true,
                            "onload": function ($item) {
                                $("#resAccTitle").AdvanceTextSetting({
                                    targetParent: $activeDOM,
                                    targetElem: '.tabItemTitle',
                                    options: {
                                        width: false,
                                        spacing: false,
                                        transform: false,
                                        family: false,
                                        weight: false,
                                        color: false
                                    }
                                });
                                $("#resAccHead").AdvanceTextSetting({
                                    targetParent: $activeDOM,
                                    targetElem: 'h1.editor-para',
                                    options: {
                                        width: false,
                                        spacing: false,
                                        transform: false,
                                        family: false,
                                        weight: false,
                                        color: false
                                    }
                                });
                                $("#resAccContent").AdvanceTextSetting({
                                    targetParent: $activeDOM,
                                    targetElem: 'p.editor-para',
                                    options: {
                                        width: false,
                                        spacing: false,
                                        transform: false,
                                        family: false,
                                        weight: false,
                                        color: false
                                    }
                                });
                            }
                        },
                        "visibility": {},
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": "<div id='accMarginSet'></div><div id='accPaddingSet'></div>",
                    "onload": function ($item) {
                        $('#accMarginSet').AdvanceSpacing({
                            targetParent: $activeDOM.parent(),
                            targetElem: $activeDOM,
                            "options": {
                                "margin": {
                                    "max": 80,
                                    "min": -80,
                                    "times": 5,
                                    "position": ["all", "top", "left", "bottom", "right"]
                                },
                            },
                        });
                        setTimeout(function () {
                            $('#accPaddingSet').AdvanceSpacing({
                                targetParent: $activeDOM,
                                targetElem: '.tabsAsAccordion > .sfCol_100:not(.Dn) > .tab_acc_title, li.tabItem',
                                saveClasses: true,
                                "options": {
                                    "padding": {
                                        "max": 80,
                                        "min": 0,
                                        "times": 5,
                                        "position": ["all", "top", "left", "bottom", "right"]
                                    }
                                }
                            });
                        }, 100);
                    }
                },
                "Alignment": {
                    "custom": true,
                    "DOM": '<div id="titleAlign"></div><div id="headingAlign"></div><div id="contentAlign"></div>',
                    "onload": function ($item) {
                        $('#titleAlign').AdvanceAlignment({
                            targetParent: $activeDOM,
                            targetElem: '.tabItem',
                            labels: {
                                'horizontal': 'Title Alignment'
                            }
                        });
                        $('#headingAlign').AdvanceAlignment({
                            targetParent: $activeDOM,
                            targetElem: '.com-heading',
                            labels: {
                                'horizontal': 'Heading Alignment'
                            }
                        });
                        $('#contentAlign').AdvanceAlignment({
                            targetParent: $activeDOM,
                            targetElem: '.paragraph',
                            labels: {
                                'horizontal': 'Content Alignment'
                            }
                        });
                    },
                },
            }
        },
        "remove": function($viewdom) {
            let device = ViewDeviceAlpha();
            if (device.length > 0 && (device == 't' || device == 'm')) {
                let self = component['tabs'];
                self.view.library.syncTabsWithAccordionBeforeSave($viewdom);
                $($viewdom).find('.tabsAsAccordion').addClass('Dn');
                $($viewdom).find('.tabsAsTab').removeClass('Dn');
            }
        },
        "removeedit": function ($editdom) {
            let device = ViewDeviceAlpha();
            if (device.length > 0 && (device == 't' || device == 'm')) {
                let self = component['tabs'];
                self.view.library.syncTabsWithAccordionBeforeSave($editdom);
                $($editdom).find('.tabsAsAccordion').addClass('Dn');
                $($editdom).find('.tabsAsTab').removeClass('Dn');
            }
        },
        "view": {
            "view": function () {
                let w = ScreenDimension().width;
                if (parseInt(w) <= 768) {
                    this.library.convertTabsToAccordion();
                    $('.tabsAsAccordion').removeClass('Dn');
                    $('.tabsAsTab').addClass('Dn');
                } else {
                    $('.tabsAsAccordion').addClass('Dn');
                    $('.tabsAsTab').removeClass('Dn');
                    this.library.initTab();
                }
            },
            "library":
            {
                syncTabsWithAccordionBeforeSave: function ($dom) {
                    let self = component['tabs'];
                    let $tabsCmp = $($dom).find('.customTab');
                    $tabsCmp.each(function (i, t) {
                        self.view.library.syncTabsWithAccordion(t);
                    });
                },
                "convertTabsToAccordion": function () {
                    let self = this;
                    $('.customTab').each(function (i, t) {
                        self._convertTabsToAccordion(t);
                    });
                },
                "_convertTabsToAccordion": function (TabsViewDom) {
                    let $tabsView = $(TabsViewDom).find('.tabsDiv');
                    let $tabsTitles = $tabsView.find('li.tabItem');
                    let $tabsContents = $tabsView.find('.tab-content-wrapper > .container');
                    let $tabAccTemplate = $(TabsViewDom).find('.tab_acc_tmp');
                    let $tabAccHolder = $(TabsViewDom).find('.tabsAsAccordion');
                    let $tabParent = $tabAccHolder.parent();
                    $tabAccHolder.find('>.sfCol_100:not(.Dn)').remove();
                    let $tmp, $tmpContainer, $titleHld, padclasses;
                    let $items = [];
                    $tabsTitles.each(function (i, t) {
                        $tmp = $tabAccTemplate.clone();
                        $tmp.removeClass('tab_acc_tmp Dn');
                        $titleHld = $tmp.find('.tab_acc_title');
                        $titleHld
                            .addClass($(t).attr('class'))
                            .removeClass('editor-component selected active')
                            .attr('style', $(t).attr('style'))
                            .css('background-color', $tabParent.attr('data-backgroundcolor'))
                            .html($(t).html());
                        $titleHld.find('span').css('color', $tabParent.attr('data-txtcolor'));
                        padclasses = $(TabsViewDom).attr('data-padclasses');
                        if (typeof padclasses != 'undefined' && padclasses) {
                            $titleHld.removeClass(function (i, cl) {
                                return (cl.match(/([a-z]?)P[a-z]-[0-9]{1,3}/g) || []).join(' ');
                            });
                            $titleHld.addClass(padclasses);
                        }
                        $tmp.find('.tab_acc_wrap')
                            .append($tabsContents.eq(i).find('> .editor-component').clone()
                                .removeClass('editor-component editor-col activeSetting ui-sortable ui-droppable'))
                            .css('display', 'none');
                        $items.push($tmp.wrapAll('<div />').parent().html());
                    });
                    $tabAccHolder.prepend($items.join(''));
                    if (typeof SettingEvents === 'function') {
                        SettingEvents($(TabsViewDom));
                    }
                    if (typeof MouseOverEffect === 'function') {
                        MouseOverEffect($(TabsViewDom));
                    }
                    //accordion events
                    let AccorSpeed = 500;
                    $('.tab_acc_title').off('click').on('click', function () {
                        let $this = $(this);
                        let $thisParent = $this.closest('.tabsAsAccordion').eq(0);
                        let AccorItems = $thisParent.find('>.sfCol_100:not(.Dn)');
                        let $currentActive = AccorItems.find('>.tab_acc_title.active');
                        $currentActive.next('.tab_acc_wrap').slideUp(AccorSpeed);
                        $currentActive.removeClass('active');
                        $currentActive.css('background-color', $thisParent.parent().attr('data-backgroundcolor'));
                        $currentActive.find('span').css('color', $thisParent.parent().attr('data-txtcolor'));
                        let activeAcor = $this.next('.tab_acc_wrap');
                        if (activeAcor.is(":hidden")) {
                            $this.addClass('active');
                            $this.css('background-color', $thisParent.parent().attr('data-activecolor'));
                            $this.find('span').css('color', $thisParent.parent().attr('data-txtactivehovercolor'));
                            activeAcor.slideDown(AccorSpeed);
                        } else {
                            $this.removeClass('active');
                            $this.css('background-color', $thisParent.parent().attr('data-backgroundcolor'));
                            $this.find('span').css('color', $thisParent.parent().attr('data-txtcolor'));
                            activeAcor.slideUp(AccorSpeed);
                        }
                    });
                    $('.tab_acc_title').off('mouseover mouseout').on('mouseover mouseout', function (evt) {
                        let $this = $(this);
                        let $thisParent = $this.closest('.tabsAsAccordion').eq(0).parent();
                        if (evt.type == 'mouseover') {
                            $this.find('span').css('color', $thisParent.attr('data-txthovercolor'));
                            $this.css('background-color', $thisParent.attr('data-hovercolor'));
                        } else if (evt.type == "mouseout") {
                            if ($this.hasClass('active')) {
                                $this.find('span').css('color', $thisParent.attr('data-txtactivehovercolor'));
                                $this.css('background-color', $thisParent.attr('data-activecolor'));

                            } else {
                                $this.find('span').css('color', $thisParent.attr('data-txtcolor'));
                                $this.css('background-color', $thisParent.attr('data-backgroundcolor'));
                            }
                        }
                    });
                    $tabAccHolder.find('>.sfCol_100:not(.Dn)').first().find('.tab_acc_title').trigger('click');
                },
                syncTabsWithAccordion: function(t) {
                    let $accItems = $(t).find('.tabsAsAccordion > .sfCol_100:not(.tab_acc_tmp)').find('.tab_acc_wrap > .holder');
                    if ($accItems.length == 0) {
                        return;
                    }
                    $accItems.each(function (i, v) {
                        let $tabContainer = $(t).find('.tab-content-wrapper > .container').eq(i);
                        let $tabHolder = $tabContainer.find('> .holder');
                        $tabHolder.attr('class', $(v).attr('class'));
                        $tabHolder.addClass('editor-component');
                        let $accCol = $(v).find('> .editor-col');
                        let $tabCol = $tabHolder.find('> .editor-col');
                        $tabCol.addClass($accCol.attr('class'));
                        $tabCol.html($accCol.html());
                    });
                    SettingEvents($(t));
                },
                "initTab": function () {
                    $(".tabsDiv .tabs li").click(function () {
                        let tabContainer = $(this).closest('.tabsDiv');
                        tabContainer.find(".tabs li").removeClass("selected");
                        $(this).toggleClass("selected");
                        let pos = tabContainer.find(".tabs li.selected").index();
                        let obj = tabContainer.find(".tab-content-wrapper > .container.container:eq( " + pos + " )");
                        tabContainer.find(".tab-content-wrapper > .container").hide();
                        $(obj).css('display', 'block');
                        let tabColor = $(this).parents('.customTab').attr('data-activecolor');
                        let tabActiveTxtColor = $(this).parents('.customTab').attr('data-txtactivehovercolor');
                        tabContainer.find(".tabs li").css("background-color", $(this).parents('.customTab').attr('data-backgroundcolor'));
                        tabContainer.parents('.customTab').find('.tab-nav > .tabs > li.selected').css("background-color", tabColor);

                        tabContainer.find(".tabs li").not('.selected').find('span').css("color", $(this).parents('.customTab').attr('data-txtcolor'));
                        tabContainer.find(".tabs li.selected").find('span').css("color", tabActiveTxtColor);
                    });

                    $(".tab-nav .tabs").each(function () {
                        $(this).find("li:first").click();
                    });
                    $(".tab-nav > .tabs > li").unbind("mouseover mouseout");
                    $('.tab-nav > .tabs > li').on('mouseover mouseout', function (evt) {

                        if (!$(this).hasClass('selected')) {
                            let masterContainer = $(this).parents('.customTab');
                            let hoverColor = masterContainer.attr('data-hovercolor');
                            let basicColor = masterContainer.attr('data-backgroundcolor');
                            let txtHoverColor = masterContainer.attr('data-txthovercolor');
                            let txtBasicColor = masterContainer.attr('data-txtcolor');
                            evt.type === 'mouseover' ? $(this).css("background-color", hoverColor) : $(this).css("background-color", basicColor);
                            evt.type === 'mouseover' ? $(this).find('span').css("color", txtHoverColor) : $(this).find('span').css("color", txtBasicColor);

                        }
                    });
                },

            }

        }
    }
};