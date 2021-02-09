var accordion = {
    "accordion": {
        "componentname": "accordion",
        "category": "advance",
        "icon": "fa fa-archive",
        "row": false,
        "hidden": false,
        "bucket": true,
        "type": "element",
        "defaultdata": EasyLibrary.ReadDOM('accordion/accordionview'),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) {
        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if ($(document).find('#hdnAccordianSettingAttr').length <= 0)
                $('body').append('<div data-attribute="" style="display: none;" id="hdnAccordianSettingAttr"></div>');
            let AccorSpeed = 500;
            $('.accordianTitle').off('click').on('click', function () {
                let $this = $(this);
                let $thisParent = $this.parents('.accordianWrap').eq(0);
                let AccorItems = $thisParent.find('>.acordianItem');
                AccorItems.find('>.accordianTitle.active').css('background-color', $thisParent.attr('data-titlebgcolor'));
                AccorItems.find('>.accordianTitle.active h2').css('color', $thisParent.attr('data-titlecolor'));
                AccorItems.find('>.accordianTitle.active .accordian-icon .dis-table i').css('color', $thisParent.attr('data-iconcolor'));
                AccorItems.find('>.accordianTitle.active').next('.acordianContent').slideUp(AccorSpeed);
                AccorItems.find('>.accordianTitle .accordian-icon.static .dis-table i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
                AccorItems.find('>.accordianTitle').removeClass('active');
                let activeAcor = $this.next('.acordianContent');
                if (activeAcor.is(":hidden")) {
                    $this.addClass('active');
                    $this.find('.accordian-icon.static .dis-table i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
                    $this.css('background-color', $thisParent.attr('data-activecolor'));
                    $this.find('h2').css('color', $thisParent.attr('data-activetitle'));
                    $this.find('.accordian-icon .dis-table i').css('color', $thisParent.attr('data-activeicon'));
                    activeAcor.slideDown(AccorSpeed);
                } else {
                    $this.removeClass('active');
                    activeAcor.slideUp(AccorSpeed);
                }
            });
            $('.accordianTitle').off('mouseover mouseout').on('mouseover mouseout', function (evt) {
                let $this = $(this);
                let $thisParent = $this.parents('.accordianWrap').eq(0);
                if (evt.type === 'mouseover') {
                    $this.find('h2').css('color', $thisParent.attr('data-activetitle'));
                    $this.find('.accordian-icon i').css('color', $thisParent.attr('data-activeicon'));
                    $this.css('background-color', $thisParent.attr('data-hovercolor'));
                } else if (evt.type === "mouseout") {
                    if ($this.hasClass('active')) {
                        $this.find('h2').css('color', $thisParent.attr('data-activetitle'));
                        $this.find('.accordian-icon .dis-table i').css('color', $thisParent.attr('data-activeicon'));
                        $this.css('background-color', $thisParent.attr('data-activecolor'));

                    } else {
                        $this.find('h2').css('color', $thisParent.attr('data-titlecolor'));
                        $this.find('.accordian-icon  i').css('color', $thisParent.attr('data-iconcolor'));
                        $this.css('background-color', $thisParent.attr('data-titlebgcolor'));
                    }
                }
            });
        },
        "onsort": function (ui) { },
        "settingDOMs": {
            "tabs": {
                "Data": {
                    "DOM": EasyLibrary.ReadDOM('accordion/accordiondatasetting'),
                    "onload": function ($item) {
                        let attr = $('#hdnAccordianSettingAttr').data('attribute');
                        if (attr !== '') {
                            $('#popupModel').attrs(attr);
                            $('#hdnAccordianSettingAttr').data('attribute', '');
                        }
                        let AccordianDataSetting = {
                            IconClassReg: /fa-\w+(\-*\w*)*/g,
                            SettingButton: $item,
                            Position: 0,
                            Container: $activeDOM,
                            init: function () {
                                let $ItemList = AccordianDataSetting.Container.find('.accordianWrap').eq(0).find('>.acordianItem');
                                let html = '';
                                let AcorLen = $ItemList.length;
                                $ItemList.each(function () {
                                    let $this = $(this);
                                    let Title = $this.find('.accordian-head h2').text();
                                    let $Icon = $this.find('.accordian-icon').not('.accordian-icon.static').find('.dis-table i').attr('class').match(AccordianDataSetting.IconClassReg);
                                    html += '<div class="field-row item accordionItem">';
                                    html += '<div class="field-row stElWrap col100">';
                                    //html += '<span class="fCol">';
                                    html += '<span class="sfCol_10 cPointer TxAl-c"><i class="fa fa-arrows-v accorSort"></i></span>';
                                    html += '<span class="sfCol_10 TxAl-c"><i class="iconChooser in-form-icon fa ' + $Icon + '" title="Click to change icon"></i></span>';
                                    html += '<span class="sfCol_70 cb_input"><input type="text" class="title accordianInput" placeholder="Title" value="' + Title + '" ></span>';
                                    if (AcorLen > 1)
                                        html += '<span class="sfCol_10 TxAl-r"><i title="Delete" class="deleteAccordian fa fa-trash in-form-icon delete-icon"></i></span>';
                                    html += '</div></div>';
                                });
                                $('.accordianEditList').html(html);
                                AccordianDataSetting.UIEvents();
                            },
                            UIEvents: function () {
                                $('.addMoreAccordian').off().on('click', function () {
                                    let LastItem = AccordianDataSetting.Container.find('.acordianItem').last();
                                    let NewDom = document.createElement("div");
                                    $(NewDom).attrs(LastItem.attrs());
                                    $(NewDom).html(LastItem.html());
                                    $(NewDom).find('.acordianContent').css('display', 'none');
                                    AccordianDataSetting.Container.find('.accordianWrap').eq(0).prepend(NewDom);
                                    $('#hdnAccordianSettingAttr').data('attribute', $('#popupModel').attrs());
                                    SettingEvents();
                                    component["accordion"].afterdrop();
                                    AccordianDataSetting.SettingButton.trigger('click');
                                });

                                $('.deleteAccordian').off().on('click', function () {
                                    let $this = $(this);
                                    SageConfirmDialog('Are you sure?').done(function () {
                                        let pos = $('.accordianEditList .item').index($this.closest('.item'));
                                        AccordianDataSetting.Container.find('.accordianWrap').eq(0).find('>.acordianItem').eq(pos).remove();
                                        AccordianDataSetting.init();
                                    });
                                });
                                $('.accordianInput').off().on('keyup', function () {
                                    let $this = $(this);
                                    let $Val = $this.val();
                                    let $pos = $('.accordianEditList .item').index($this.closest('.item'));
                                    let ActiveItem = AccordianDataSetting.Container.find('.accordianWrap').eq(0).find('>.acordianItem').eq($pos);
                                    ActiveItem.find('.accordian-head h2').text($Val);
                                });
                                $('#AccorfontIconCollection').html($('ul#fontIconCollection').html());

                                $('.accordianEditList .iconChooser').off('click').on('click', function () {
                                    let $this = $(this);
                                    $this.parent().parent().parent().after($('.tabcontent .accorIconList'));
                                    AccordianDataSetting.Position = $('.accordianEditList .item').index($this.closest('.item'));
                                    $('.accorIconList').removeClass('Dn');
                                    $('#AccorfontIconCollection').find('li').removeClass('selected');
                                    let CurrentClass = $this.attr('class').match(AccordianDataSetting.IconClassReg)[0];
                                    $('#AccorfontIconCollection').find('li i[data-class="' + CurrentClass + '"]').parent().addClass('selected');

                                });
                                $('.accorIconList .closeIconChooser').off().on('click', function () {
                                    $('.accorIconList').addClass('Dn').insertAfter($('.accordianEditList'));
                                });
                                $('#AccorSearchIcon').on('keyup', function () {
                                    let searchVal = $(this).val();
                                    $('#AccorfontIconCollection').find('li').each(function () {
                                        let $this = $(this);
                                        let dataClass = $this.find('i').attr('data-class');
                                        let pos = dataClass.indexOf(searchVal);
                                        if (pos < 0) {
                                            $this.addClass('Dn');
                                        } else {
                                            $this.removeClass('Dn');
                                        }
                                    });
                                });
                                $('#AccorfontIconCollection').find('li').on('click', function () {

                                    let chooseClass = $(this).find('i').attr('data-class');
                                    $('#AccorfontIconCollection').find('li').removeClass('selected');
                                    $('#AccorfontIconCollection').find('li i[data-class="' + chooseClass + '"]').parent().addClass('selected');
                                    let $FormIcon = $('.accordianEditList .item').eq(AccordianDataSetting.Position).find('i.iconChooser');
                                    let PrevClass = $FormIcon.attr('class').match(AccordianDataSetting.IconClassReg)[0];
                                    $FormIcon.removeClass(PrevClass);
                                    $FormIcon.addClass(chooseClass);
                                    let $ViewIcon = AccordianDataSetting.Container.find('.accordianWrap').eq(0).find('>.acordianItem').eq(AccordianDataSetting.Position).find('.accordian-icon').not('.accordian-icon.static').find('i');
                                    $ViewIcon.removeClass(PrevClass);
                                    $ViewIcon.addClass(chooseClass);
                                    $(".accorIconList .closeIconChooser").trigger("click");
                                });
                                //sortable
                                $('.accorSort').on('mousedown', function () {
                                    $('.accorIconList').find('.closeIconChooser').trigger('click');
                                });
                                $(".accordianEditList").AdvanceSorting({
                                    targetParent: $item.closest('.SetHdlr').parent().find(".accordianWrap"),
                                    targetElem: '.acordianItem',
                                    sortableOptions: {
                                        items: "> div.accordionItem",
                                        handle: ".accorSort",
                                        containment: 'div.accordianEditList'
                                    }
                                });
                            }
                        };
                        AccordianDataSetting.init();
                    }
                },
                "Icon": {
                    "DOM": EasyLibrary.ReadDOM('accordion/accordioniconsetting'),
                    "onload": function ($item) {
                        let AccordianIconSetting = {
                            Container: $activeDOM.find('.accordianWrap'),
                            init: function () {
                                $('.accordianColorPicker.accrIcon').css('background-color', AccordianIconSetting.Container.attr('data-iconcolor'));
                                $('.accordianColorPicker.accrActiveIcon').css('background-color', AccordianIconSetting.Container.attr('data-activeicon'));

                                AccordianIconSetting.UIEvents();
                            },
                            UIEvents: function () {
                                let AccorItems = AccordianIconSetting.Container.find('>.acordianItem');
                                let firstItem = AccorItems.find('.accordian-icon').first();
                                if (firstItem.css('display') !== 'none') {
                                    $('#chkIsActiveAccordianIcon').prop('checked', true);
                                } else {
                                    $('.accordionIconSettings').find('.iconAttributes').addClass('Dn');
                                }
                                $('#chkIsActiveAccordianIcon').off().on('click', function () {
                                    let IconWrap = AccorItems.find('.accordian-icon').not('.accordian-icon.static');
                                    if ($(this).is(':checked')) {
                                        IconWrap.show();
                                        $('.accordionIconSettings').find('.iconAttributes').removeClass('Dn');
                                    } else {
                                        IconWrap.hide();
                                        $('.accordionIconSettings').find('.iconAttributes').addClass('Dn');
                                    }
                                });

                                let CurrentIconSize = AccorItems.first().find('>.accordianTitle .accordian-icon .dis-table i').css('font-size').replace('px', '');

                                function IconFontSize(space) {
                                    AccorItems.find('>.accordianTitle .accordian-icon .dis-table i').css('font-size', space + 'px');
                                    IconHolderWidth(space + 5);
                                }
                                AdvanceSageSlider($('#accorTitleIconSlider'), $('#accorTitleIconSliderHandle'), 10, 40, CurrentIconSize, IconFontSize, '', 'px');

                                let IconHolder = AccorItems.find('>.accordianTitle .accordian-icon');

                                function IconHolderWidth(space) {
                                    IconHolder.css('width', space + 'px');
                                    IconHolder.css('height', space + 'px');
                                }

                                let coloraccordinOption = ColorPickerOption({
                                    renderCallback: function ($elm, toggled) {
                                        let objColor = RenderCallBackColor(this);
                                        if ($elm.hasClass('accrIcon')) {
                                            AccordianIconSetting.Container.attr('data-iconcolor', objColor.bgColor);
                                            AccorItems.find('>.accordianTitle .accordian-icon .dis-table i').css('color', objColor.bgColor);
                                        } else if ($elm.hasClass('accrActiveIcon')) {
                                            AccordianIconSetting.Container.attr('data-activeicon', objColor.bgColor);
                                            AccorItems.find('>.accordianTitle.active .dis-table i').css('color', objColor.bgColor);
                                        }
                                    }
                                });
                                $('.accordianColorPicker').colorPicker(coloraccordinOption);
                            }
                        };
                        AccordianIconSetting.init();
                    }
                },
                "Text": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('accordion/accordiontextsetting'),
                    "onload": function ($item) {
                        $('#settingsFor').off('change').on('change', function () {
                            let selected = $(this).val();
                            $('#titleSetting').addClass('Dn');
                            $('#contentSetting').addClass('Dn');
                            $(`#${selected}Setting`).removeClass('Dn');
                        });
                        //let $parent = $item.parents('.SetHdlr').parent();
                        $("#accTitleSet").AdvanceTextSetting({
                            targetParent: $activeDOM,
                            targetElem: '.accordian-head > h2',
                            options: {
                                color: false,
                                width: false
                            }
                        });
                        let $accWrap = $activeDOM.find('.accordianWrap');
                        let $accItems = $accWrap.find('>.acordianItem');
                        $('.accTitleColorPicker.accrTitle').css('background-color', $accWrap.attr('data-titlecolor'));
                        $('.accTitleColorPicker.accrTitleBg').css('background-color', $accWrap.attr('data-titlebgcolor'));
                        $('.accTitleColorPicker.accrActiveColor').css('background-color', $accWrap.attr('data-activecolor'));
                        $('.accTitleColorPicker.accrHoverColor').css('background-color', $accWrap.attr('data-hovercolor'));
                        $('.accTitleColorPicker.accrActiveTitleText').css('background-color', $accWrap.attr('data-activetitle'));
                        let colorOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                let objColor = RenderCallBackColor(this);
                                if ($elm.hasClass('accrTitle')) {
                                    $accWrap.attr('data-titlecolor', objColor.bgColor);
                                    $accItems.find('>.accordianTitle h2').css('color', objColor.bgColor);
                                } else if ($elm.hasClass('accrTitleBg')) {
                                    $accWrap.attr('data-titlebgcolor', objColor.bgColor);
                                    $accItems.find('>.accordianTitle').not('.accordianTitle.active').css('background-color', objColor.bgColor);
                                } else if ($elm.hasClass('accrActiveColor')) {
                                    $accWrap.attr('data-activecolor', objColor.bgColor);
                                    $accItems.find('>.accordianTitle.active').css('background-color', objColor.bgColor);
                                } else if ($elm.hasClass('accrActiveTitleText')) {
                                    $accWrap.attr('data-activetitle', objColor.bgColor);
                                    $accItems.find('>.accordianTitle.active h2').css('color', objColor.bgColor);
                                } else if ($elm.hasClass('accrHoverColor')) {
                                    $accWrap.attr('data-hovercolor', objColor.bgColor);
                                }
                            }
                        });
                        $('.accTitleColorPicker').colorPicker(colorOption);
                        $("#accContentSet").AdvanceTextSetting({
                            targetParent: $activeDOM,
                            targetElem: '.acordianContent p.editor-para'
                        });
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM("accordion/accordionCommon"),
                    "onload": function ($item) {
                        let $parent = $activeDOM;
                        $("#slcAccordionSetting").off("change").on("change", function () {
                            let $this = $(this);
                            $parent.find('.actEle').removeClass('actEle');
                            $parent.find($this.val()).addClass('actEle');
                            InitSpacing($this.val());
                        });
                        function InitSpacing(target) {
                            if (target === ".editor-component.accordian")
                                $parent = $parent.parent();
                            else
                                $parent = $activeDOM;
                            $('#accMarginSet').AdvanceSpacing({
                                targetParent: $parent,
                                targetElem: target,
                                "options": {
                                    "margin": {
                                        "max": 80,
                                        "min": -80,
                                        "times": 5,
                                        "position": ["all", "top", "left", "bottom", "right"]
                                    }
                                }
                            });
                            $('#accPaddingSet').AdvanceSpacing({
                                targetParent: $parent,
                                targetElem: target,// '.accordianTitle',
                                "options": {
                                    "padding": {
                                        "max": 80,
                                        "min": 0,
                                        "times": 5,
                                        "position": ["all", "top", "left", "bottom", "right"]
                                    }
                                }
                            });
                        }
                    },
                    "active": function () {
                        $('#slcAccordionSetting').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#slcAccordionSetting').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
                "Alignment": {
                    "custom": true,
                    "DOM": '<div id="titleAlign"></div><div id="contentAlign"></div>',
                    "onload": function ($item) {
                        $('#titleAlign').AdvanceAlignment({
                            targetParent: $activeDOM.parent(),
                            targetElem: '.accordianTitle',
                            labels: {
                                'horizontal': 'Title Alignment'
                            }
                        });
                        $('#contentAlign').AdvanceAlignment({
                            targetParent: $activeDOM.parent(),
                            targetElem: '.acordianContent .paragraph',
                            labels: {
                                'horizontal': 'Content Alignment'
                            }
                        });
                    }
                }
            }
        },
        "styleDOMs": {
            "tabs": {
                //"Colors": {
                //    "DOM": EasyLibrary.ReadDOM('accordion/accordioncolorsetting'),
                //    "onload": function ($item) {
                //        let AccordianColor = {
                //            Container: $item.parents('.accordian').eq(0).find('.accordianWrap').eq(0),
                //            init: function () {
                //                $('.accordianColorPicker.accrTitle').css('background-color', AccordianColor.Container.attr('data-titlecolor'));
                //                $('.accordianColorPicker.accrIcon').css('background-color', AccordianColor.Container.attr('data-iconcolor'));
                //                $('.accordianColorPicker.accrTitleBg').css('background-color', AccordianColor.Container.attr('data-titlebgcolor'));

                //                $('.accordianColorPicker.accrActiveColor').css('background-color', AccordianColor.Container.attr('data-activecolor'))
                //                $('.accordianColorPicker.accrHoverColor').css('background-color', AccordianColor.Container.attr('data-hovercolor'));
                //                $('.accordianColorPicker.accrActiveIcon').css('background-color', AccordianColor.Container.attr('data-activeicon'));
                //                $('.accordianColorPicker.accrActiveTitleText').css('background-color', AccordianColor.Container.attr('data-activetitle'));

                //                AccordianColor.UIEvents();
                //            },
                //            UIEvents: function () {
                //                let AccorItems = AccordianColor.Container.find('>.acordianItem');

                //                let coloraccordinOption = ColorPickerOption({
                //                    renderCallback: function ($elm, toggled) {
                //                        let objColor = RenderCallBackColor(this);
                //                        if ($elm.hasClass('accrTitle')) {
                //                            AccordianColor.Container.attr('data-titlecolor', objColor.bgColor);
                //                            AccorItems.find('>.accordianTitle h2').css('color', objColor.bgColor);
                //                        } else if ($elm.hasClass('accrIcon')) {
                //                            AccordianColor.Container.attr('data-iconcolor', objColor.bgColor);
                //                            AccorItems.find('>.accordianTitle .accordian-icon .dis-table i').css('color', objColor.bgColor);
                //                        } else if ($elm.hasClass('accrTitleBg')) {
                //                            AccordianColor.Container.attr('data-titlebgcolor', objColor.bgColor);
                //                            AccorItems.find('>.accordianTitle').not('.accordianTitle.active').css('background-color', objColor.bgColor);
                //                        } else if ($elm.hasClass('accrActiveColor')) {
                //                            AccordianColor.Container.attr('data-activecolor', objColor.bgColor);
                //                            AccorItems.find('>.accordianTitle.active').css('background-color', objColor.bgColor);
                //                        } else if ($elm.hasClass('accrActiveTitleText')) {
                //                            AccordianColor.Container.attr('data-activetitle', objColor.bgColor);
                //                            AccorItems.find('>.accordianTitle.active h2').css('color', objColor.bgColor);
                //                        } else if ($elm.hasClass('accrActiveIcon')) {
                //                            AccordianColor.Container.attr('data-activeicon', objColor.bgColor);
                //                            AccorItems.find('>.accordianTitle.active .dis-table i').css('color', objColor.bgColor);
                //                        } else if ($elm.hasClass('accrHoverColor')) {
                //                            AccordianColor.Container.attr('data-hovercolor', objColor.bgColor);
                //                        }
                //                    }
                //                });
                //                $('.accordianColorPicker').colorPicker(coloraccordinOption);
                //            },
                //        }
                //        AccordianColor.init();
                //    }
                //},
                "Border": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM("accordion/accordionCommon"),//"<div id='accorBorderSet'></div>",
                    "onload": function ($item) {
                        let $parent = $item.closest('.SetHdlr').parent();
                        $("#slcAccordionSetting").off("change").on("change", function () {
                            let $this = $(this);
                            $parent.find('.actEle').removeClass('actEle');
                            $parent.find($this.val()).addClass('actEle');
                            InitBorder($this.val());
                        });

                        function InitBorder(target) {
                            if (target === ".editor-component.accordian")
                                $parent = $parent.parent();
                            else
                                $parent = $activeDOM;

                            $('#accorBorderSet').AdvanceBorder({
                                targetParent: $parent,
                                targetElem: target,
                                options: {
                                    "max": 20,
                                    "min": 0,
                                    "times": 1,
                                    "position": ["all", "top", "right", "bottom", "left"]
                                }
                            });
                        }
                    },
                    "active": function () {
                        $('#slcAccordionSetting').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#slcAccordionSetting').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
                "Box Radius": {
                    "custom": true,
                    "DOM": "<div id='accorBoxRadSet'></div>",
                    "onload": function ($item) {
                        let $parent = $item.closest('.SetHdlr').parent();
                        $('#accorBoxRadSet').AdvanceBoxRadius({
                            targetParent: $parent,
                            targetElem: '.accordianTitle',
                            options: {
                                "max": 50,
                                "min": 0,
                                "times": 1,
                                "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                            }
                        });
                    }
                },
                "Box Shadow": {
                    "custom": true,
                    "DOM": "<div id='accorBoxShadowSet'></div>",
                    "onload": function ($item) {
                        let $parent = $item.closest('.SetHdlr').parent();
                        $('#accorBoxShadowSet').AdvanceBoxShadow({
                            targetParent: $parent,
                            targetElem: '.accordianTitle'
                        });
                    }
                }
            }
        },
        "selectLayer": function ($elem) {
            let $parent = $elem.parents('.accordian').eq(0).find('.accordianWrap:first >.acordianItem');
            return $parent;
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "title fontsize": {
                            "DOM": "<div class='field-row stElWrap'><label>Title</label></div><div id='resAccTitle'></div><div class='field-row stElWrap'><label>Content</label></div><div id='resAccContent'></div>",
                            "prepend": true,
                            "onload": function ($item) {
                                $("#resAccTitle").AdvanceTextSetting({
                                    targetParent: $activeDOM,
                                    targetElem: '.accordian-head > h2',
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
                                    targetElem: '.acordianContent .editor-para',
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
                        "visibility": {}
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM("accordion/accordionCommon"),//"<div id='accMarginSet'></div><div id='accPaddingSet'></div>",
                    "onload": function ($item) {
                        component[$activeDOM.attr("data-type")].settingDOMs.tabs.Spacing.onload($item);
                    }
                },
                "Alignment": {
                    "custom": true,
                    "DOM": '<div id="titleAlign"></div><div id="contentAlign"></div>',
                    "onload": function ($item) {
                        $('#titleAlign').AdvanceAlignment({
                            targetParent: $activeDOM.parent(),
                            targetElem: '.accordianTitle',
                            labels: {
                                'horizontal': 'Title Alignment'
                            }
                        });
                        $('#contentAlign').AdvanceAlignment({
                            targetParent: $activeDOM.parent(),
                            targetElem: '.acordianContent .paragraph',
                            labels: {
                                'horizontal': 'Content Alignment'
                            }
                        });
                    }
                }
            }
        },
        "remove": function ($cloneViewDom) { },
        "view": {
            "view": function () {
                this.library.initAcordian();
            },
            "library": {
                "initAcordian": function () {
                    let AccorSpeed = 500;
                    $('.accordianTitle').off('click').on('click', function () {
                        let $this = $(this);

                        let $thisParent = $this.parents('.accordianWrap').eq(0);
                        let AccorItems = $thisParent.find('>.acordianItem');
                        AccorItems.find('>.accordianTitle.active').css('background-color', $thisParent.attr('data-titlebgcolor'));
                        AccorItems.find('>.accordianTitle.active h2').css('color', $thisParent.attr('data-titlecolor'));
                        AccorItems.find('>.accordianTitle.active .accordian-icon .dis-table i').css('color', $thisParent.attr('data-iconcolor'));
                        AccorItems.find('>.accordianTitle.active').next('.acordianContent').slideUp(AccorSpeed);
                        AccorItems.find('>.accordianTitle .accordian-icon.static .dis-table i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
                        AccorItems.find('>.accordianTitle').removeClass('active');
                        let activeAcor = $this.next('.acordianContent');
                        if (activeAcor.is(":hidden")) {
                            $this.addClass('active');
                            $this.find('.accordian-icon.static .dis-table i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
                            $this.css('background-color', $thisParent.attr('data-activecolor'));
                            $this.find('h2').css('color', $thisParent.attr('data-activetitle'));
                            $this.find('.accordian-icon .dis-table i').css('color', $thisParent.attr('data-activeicon'));
                            activeAcor.slideDown(AccorSpeed);
                        } else {
                            $this.removeClass('active');
                            activeAcor.slideUp(AccorSpeed);
                        }
                    });
                    $('.accordianTitle').off('mouseover mouseout').on('mouseover mouseout', function (evt) {
                        let $this = $(this);
                        let $thisParent = $this.parents('.accordianWrap').eq(0);
                        if (evt.type === 'mouseover') {
                            $this.find('h2').css('color', $thisParent.attr('data-activetitle'));
                            $this.find('.accordian-icon i').css('color', $thisParent.attr('data-activeicon'));
                            $this.css('background-color', $thisParent.attr('data-hovercolor'));
                        } else if (evt.type === "mouseout") {
                            if ($this.hasClass('active')) {
                                $this.find('h2').css('color', $thisParent.attr('data-activetitle'));
                                $this.find('.accordian-icon .dis-table i').css('color', $thisParent.attr('data-activeicon'));
                                $this.css('background-color', $thisParent.attr('data-activecolor'));

                            } else {
                                $this.find('h2').css('color', $thisParent.attr('data-titlecolor'));
                                $this.find('.accordian-icon  i').css('color', $thisParent.attr('data-iconcolor'));
                                $this.css('background-color', $thisParent.attr('data-titlebgcolor'));
                            }
                        }
                    });
                }
            }
        }
    }
};