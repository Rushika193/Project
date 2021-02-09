var verticalcollector = {
    "verticalcollector": {
        "componentname": "verticalcollector",
        "row": false,
        "hidden": true,
        "type": "element",
        "category": "advance",
        "collection": true,
        "icon": "fa fa-angellist",
        "bucket": true,
        "defaultdata": EasyLibrary.ReadDOM('verticalCollector/default'),
        "beforedrop": function () { },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            let c = this.collectorCommon;
            let $layers = $(document).find('.vertical-collector-layer');//.not('.vertical-binded');
            $layers.each(function (ind, l) {
                //$(l).addClass('vertical-binded');
                c.deleteComponent($(l).find('.buttonWrapper'));
                c.deleteComponent($(l).find('.fontIconWrapper'));
                $(l).find('li.DeleteThis').each(function (i, j) {
                    c.deleteComponent($(this).closest('.sortableItem'));
                });
            });

            c.getSetDataType.setType($appendLayer);
            c.dataType = c.getSetDataType.getType();
            c.fillDropDown($appendLayer);
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": `
                        <div class="field-row stElWrap sfCol_100">
                                <span class ="sfCol_50 TxAl-l select__box">
                                    <select id="addCompoSelect">
                                        <option value="Image Link">Image Link</option>
                                        <option value="button">button</option>
                                        <option value="font icon">font icon</option>
                                        <option value="underline">underline</option>
                                        <option value="heading">heading</option>
                                        <option value="text">text</option>
                                        <option value="social link">social link</option>
                                        <option value="text link">text link</option>
                                    </select>
                                </span>
                                <span class ="sfCol_50 TxAl-r">
                                <span class =" btn cb-btn-primary" id="addCompo">Add</span>
                                </span>
                            </div><div class="eldestSetParent"></div>`,

                    "onload": function ($el, pro) {
                        
                        //if (typeof pro == 'undefined') pro = false;
                        let comm = component["verticalcollector"].collectorCommon;
                        //comm.isPro = pro;
                        let $wrapper = $activeDOM.find('.componentWrap');

                        comm.fillDropDown();
                        comm.sort($(".eldestSetParent"), $wrapper, '.sortableItem');
                        $('#addCompo').off().on('click', function () {
                            comm.addComponent($('#addCompoSelect').val());
                        });
                    }
                },
                "Size": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM("verticalCollector/size"),
                    "onload": function ($ele) {
                        let comm = component['verticalcollector'].collectorCommon;
                        comm.settingController($('#slcSize'), $('.sizeDOM'), comm.sizeController, 'size');
                    },
                    "active": function () {
                        $('#slcSize').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#slcSize').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('verticalCollector/spaceSetting'),
                    "onload": function (includeCollection) {
                        let comm = component['verticalcollector'].collectorCommon;
                        comm.settingController($('#slcSpace'), $('.spacingDOM'), comm.spacingController, includeCollection)
                    },
                    "active": function () {
                        $('#slcSpace').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#slcSpace').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
                "Alignment": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('verticalCollector/alignmentSetting'),
                    "onload": function ($item) {
                        component['verticalcollector'].collectorCommon.settingController($('#slcAlign'), $('.alignwrap'), component['verticalcollector'].collectorCommon.alignmentController)
                    },
                    "active": function () {
                        $('#slcAlign').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#slcAlign').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
                "Scroll Effect": {
                    "options": [],
                    "selectLayer": function ($elem) {
                        return $activeDOM;
                    }
                }
            }
        },
        "styleDOMs": {
            "tabs": {
                "Border": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM("verticalCollector/border"),
                    "onload": function ($ele, pro) {
                        if (typeof pro == 'undefined') pro = false;
                        let comm = component['verticalcollector'].collectorCommon;
                        comm.isPro = pro;
                        //let $wrapper = $activeDOM.find('.componentWrap');
                        comm.fillDropDown($activeDOM);
                        comm.settingController($('#slcBorder'), $('.borderDOM'), comm.borderHandler, 'border')
                    },
                    "active": function () {
                        $('#slcBorder').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#slcBorder').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
                "Border Radius": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM("verticalCollector/borderRadius"),
                    "onload": function ($ele) {
                        let comm = component['verticalcollector'].collectorCommon;
                        comm.settingController($('#slcBorderRadius'), $('.borderRadiusDOM'), comm.borderRadiusHandler, 'rad')
                    },
                    "active": function () {
                        $('#slcBorderRadius').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcBorderRadius').removeClass('slcActiveEleSetting');
                        $('#slcBorderRadius').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
                "Box Shadow": {
                    custom: true,
                    DOM: EasyLibrary.ReadDOM("verticalCollector/shadow"),
                    onload: function () {
                        let comm = component['verticalcollector'].collectorCommon;
                        comm.settingController($('#selectShadow'),$('#shadowDOM'),comm.boxShadowHandler);
                    },
                    "active": function () {
                        $('#selectShadow').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#selectShadow').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
                "Color": {
                    "DOM": EasyLibrary.ReadDOM('verticalCollector/colorDOM'),
                    "onload": function ($elem) {
                        let comm = component['verticalcollector'].collectorCommon;
                        comm.colorHandler();
                    },
                    "active": function () {
                        $('#slcColor').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#slcColor').trigger('change').addClass('slcActiveEleSetting');
                    }
                }
            },

        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "Visibility": {},
                        "CustomVisibility": {
                            "custom": true,
                            "DOM": EasyLibrary.ReadDOM('verticalCollector/customVisibility'),
                            "onload": function () {
                                component['verticalcollector'].collectorCommon.getSetDataType.setType($activeDOM);
                                component['verticalcollector'].collectorCommon.fillDropDown();
                                component['verticalcollector'].collectorCommon.customVisibility();
                            }
                        }
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('verticalCollector/spaceSetting'),
                    "onload": function ($item) {
                        component['verticalcollector'].settingDOMs.tabs.Spacing.onload();
                    },
                    "active": function () {
                        component['verticalcollector'].settingDOMs.tabs.Spacing.active();
                    }
                },
                "Alignment": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('verticalCollector/alignmentSetting'),
                    "onload": function ($item) {
                        component['verticalcollector'].settingDOMs.tabs.Alignment.onload();
                    },
                    "active": function () {
                        component['verticalcollector'].settingDOMs.tabs.Alignment.active();
                    }
                }
            }
        },
        "collectorCommon": {
            dataType: '',
            sort: function ($sortDOM, $targetParent, $targetElem) {
                $sortDOM.AdvanceSorting({
                    targetParent: $targetParent,
                    targetElem: $targetElem,
                    sortableOptions: {
                        items: '.draggable',
                        handle: ".sortHandle",
                        containment: $('.eldestSetParent'),
                    }
                });
            },
            fillDropDown: function ($apendLayer) {
                let $parent = $apendLayer;
                if ($apendLayer == undefined)
                    $parent = $activeDOM;
                let $wrapper = $parent.find('.componentWrap');
                let comm = this;
                let $wrpChildren = $wrapper.first().children();
                let $eldestSetParent = $('.eldestSetParent');
                let $slcAddCompo = $('#addCompoSelect');

                $eldestSetParent.html('');
                comm.dropdown.add = '';
                comm.dropdown.common = '';
                comm.dropdown.size = '';
                comm.dropdown.color = '';
                comm.dropdown.rad = '';
                comm.dropdown.size_t = '';
                comm.dropdown.size_m = '';
                comm.dropdown.common_t = '';
                comm.dropdown.common_m = '';

                let dt = comm.dataType;
                let eOpts = '';
                if ($wrapper.length > 1) {
                    eOpts = `<option value=".activeSetting" data-target=".activeSetting" data-back=".cRow" data-ClassValue=".cRow">verticalcollectors</option><option value=".componentWrap" data-target=".componentWrap" data-back=".componentWrap" data-ClassValue=".componentWrap">${dt} cards</option>`;
                }
                else {
                    eOpts = `<option value=".componentWrap" data-target=".componentWrap" data-back=".componentWrap" data-ClassValue=".componentWrap">${dt} card</option>`;
                }
                comm.dropdown.common_t += eOpts;
                comm.dropdown.common_m += eOpts;
                comm.dropdown.common += eOpts;
                comm.dropdown.color += eOpts;
                comm.dropdown.rad += eOpts;
                let visibleOnly = []
                $wrpChildren.each(function (i) {
                    let $component = $(this);
                    let $comSetting = $component.find('.com-settings');
                    comm.getSetDataType.setType($component);
                    let atr = comm.getSetDataType.getType();
                    let val = '.' + $component.attr('data-val');
                    let targetVal = val.substring(1);
                    let tmp = $component.attr('data-grpcls');
                    let defaultComp = true;
                    if (typeof tmp !== 'undefined') {
                        targetVal = tmp;
                        defaultComp = false;
                    }
                    if ($comSetting.attr('data-title'))
                        atr = $comSetting.attr('data-title')
                    if ($component.hasClass('underline'))
                        atr = 'underline';

                    //create DD options if visible
                    let checked = '';
                    let hasClassDN = $component.hasClass(DeviceAlpha() + 'Dn');
                    if (!hasClassDN) {
                        comm.CreateOptionDOM(defaultComp, atr, targetVal);
                        checked = 'checked';
                    }
                    
                    //let random = comm.randomUnique.generate;
                    let random = comm.ran();
                    let set = `<div class="draggable field-row stElWrap col100">
                                            <span class="sfCol_15 TxAl-l cPointer"><i class="fa fa-arrows-v sortHandle"></i></span>
                                            <label class="sfCol_60">${atr}</label>
                                            <span class="sfCol_25 TxAl-r toggle_btn">
                                                <input id="${random}" data-toggle="${val}" class="toggleCompo" name="enable buttonLink" type="checkbox" ${checked} />
                                                <label for="${random}" class="tgl_slider"></label>
                                            </span>
                                       </div>`;

                    $eldestSetParent.append(set);
                    comm.CreateOptionDOM(defaultComp, atr, targetVal, true);
                    //if (comm.dataType == 'verticalcollector');

                    //$slcAddCompo.html(comm.dropdown.add);

                    //visibility
                    $('#' + random).click(function () {
                        let $el = $wrapper.find($(this).attr('data-toggle'));
                        if ($(this).prop('checked'))
                            $el.removeClass('Dn');
                        else
                            $el.addClass('Dn');
                        comm.reloadAllSettingTabs('settingDOMs', ["Scroll Effect"]);
                    });
                });
            },

            CreateOptionDOM: function (defaultComp, dataType, val, addDOMOnly) {
                let html = '';
                let option = this.option[dataType];
                let dd = this.dropdown;
                if (addDOMOnly) {
                    if (option.add) {
                        html = `<option value="${dataType}">${dataType}</option>`;
                        //dd.add = dd.add + html;
                    }
                }
                else {
                    let da = DeviceAlpha();
                    if (option.size) {
                        html = `<option value=".${val}">${dataType}</option>`;
                        if (DeviceAlpha() != '') {
                            dd['size_' + da] += html;
                        }
                        else
                            dd.size = dd.size + html;
                    }
                    if (option.color) {
                        let colorInfo = option.color;
                        if (defaultComp) {
                            html = `<option value=".${val}" data-back="${colorInfo.back}" data-font="${colorInfo.font}" data-wrap="${colorInfo.wrap}">${dataType}</option>`;
                        } else {
                            let tmp_f = colorInfo.font;
                            //font target may be class or element
                            if (typeof tmp_f != 'undefined' && tmp_f != 'undefined' && tmp_f.indexOf('.') == 0) {
                                tmp_f = colorInfo.font + '_' + val;
                            }
                            let tmp_w = colorInfo.wrap;
                            if (typeof tmp_w != 'undefined' && tmp_w != 'undefined' && tmp_w.indexOf('.') == 0) {
                                tmp_w = colorInfo.wrap + '_' + val;
                            }
                            let tmp_b = colorInfo.back;
                            if (typeof tmp_b != 'undefined' && tmp_b != 'undefined' && tmp_b.indexOf('.') == 0) {
                                tmp_b = colorInfo.back + '_' + val;
                            }
                            html = `<option value=".${val}" data-back="${tmp_b}" data-font="${tmp_f}" data-wrap="${tmp_w}">${dataType}</option>`;
                        }
                        dd.color = dd.color + html;
                    }
                    if (option.rad) {
                        if (option.radTarget.length > 0) {
                            html = `<option value=".${val}" data-target=".${val} > ${option.radTarget}">${dataType}</option>`;
                        } else {
                            html = `<option value=".${val}" data-target=".${val}">${dataType}</option>`;
                        }
                        dd.rad = dd.rad + html;
                    }
                    html = `<option value=".${val}">${dataType}</option>`;
                    if (da != '') {
                        dd['common_' + da] += html;
                    }
                    else
                        dd.common = dd.common + html;
                }

            },

            boxShadowHandler:function($applyOn, domSelector){
                $(domSelector).AdvanceBoxShadow({
                    targetParent: $activeDOM,
                    targetElem: $applyOn
                });
            },
            "customVisibility": function () {
                let dAlpha = DeviceAlpha();
                LoadVisibility();
                function LoadVisibility() {
                    let parentClasses = $activeDOM.attr('class');
                    let regex = new RegExp(dAlpha + 'Dn', 'g');
                    let visibilityClass = parentClasses.match(regex);
                    if (visibilityClass !== null)
                        $('#deviceVisibility').prop('checked', false);
                    else
                        $('#deviceVisibility').prop('checked', true);
                    hideShowCom();
                }

                $('#deviceVisibility').off().on('click', hideShowCom);

                function hideShowCom() {
                    if ($('#deviceVisibility').is(':checked')) {
                        $activeDOM.removeClass(dAlpha + 'Dn');
                        $('.componentVisibility').fadeIn(400);
                    }
                    else {
                        $activeDOM.addClass(dAlpha + 'Dn');
                        $('.componentVisibility').fadeOut(400);
                    }
                }
                if ($activeDOM.find('.imageLink').length)
                    $('#imageLink').AdvanceVisibility({
                        targetParent: $activeDOM,
                        targetElem: '.imageLink',
                        label: 'Image',
                        showCls: "Db",
                        callbackFunc: function () {
                            component['verticalcollector'].collectorCommon.reloadAllSettingTabs('responsiveDOMs', 'Basic')
                        }
                    });
                if ($activeDOM.find('.heading').length)
                    $('#heading').AdvanceVisibility({
                        targetParent: $activeDOM,
                        targetElem: '.heading',
                        label: 'Heading',
                        showCls: "Db",
                        callbackFunc: function (sdsdsd) {
                            component['verticalcollector'].collectorCommon.reloadAllSettingTabs('responsiveDOMs', 'Basic')
                        }
                    });
                if ($activeDOM.find('.text').length)
                    $('#text').AdvanceVisibility({
                        targetParent: $activeDOM,
                        targetElem: '.text',
                        label: 'Text',
                        showCls: "Db",
                        callbackFunc: function (sdsdsd) {
                            component['verticalcollector'].collectorCommon.reloadAllSettingTabs('responsiveDOMs', 'Basic')
                        }
                    });

                if ($activeDOM.find('.buttonWrapper').length)
                    $('#button').AdvanceVisibility({
                        targetParent: $activeDOM,
                        targetElem: '.buttonWrapper',
                        showCls: "Db",
                        label: 'Button',
                        callbackFunc: function (sdsdsd) {
                            component['verticalcollector'].collectorCommon.reloadAllSettingTabs('responsiveDOMs', 'Basic')
                        }
                    });

                if ($activeDOM.find('.sociallink').length)
                    $('#sociallink').AdvanceVisibility({
                        targetParent: $activeDOM,
                        targetElem: '.sociallink',
                        showCls: "Db",
                        label: 'Social Links',
                        callbackFunc: function (sdsdsd) {
                            component['verticalcollector'].collectorCommon.reloadAllSettingTabs('responsiveDOMs', 'Basic')
                        }
                    });

                if ($activeDOM.find('.textlink').length)
                    $('#textlink').AdvanceVisibility({
                        targetParent: $activeDOM,
                        targetElem: '.textlink',
                        showCls: "Db",
                        label: 'Text Link',
                        callbackFunc: function (sdsdsd) {
                            component['verticalcollector'].collectorCommon.reloadAllSettingTabs('responsiveDOMs', 'Basic')
                        }
                    });

                if ($activeDOM.find('.fontIconWrapper').length)
                    $('#fonticonComponent').AdvanceVisibility({
                        targetParent: $activeDOM,
                        targetElem: '.fontIconWrapper',
                        showCls: "Db",
                        label: 'Icon',
                        callbackFunc: function (sdsdsd) {
                            component['verticalcollector'].collectorCommon.reloadAllSettingTabs('responsiveDOMs', 'Basic')
                        }
                    });

                if ($activeDOM.find('.underline').length)
                    $('#underline').AdvanceVisibility({
                        targetParent: $activeDOM,
                        targetElem: '.underline',
                        showCls: "Db",
                        label: 'Underline',
                        callbackFunc: function (sdsdsd) {
                            component['verticalcollector'].collectorCommon.reloadAllSettingTabs('responsiveDOMs', 'Basic')
                        }
                    });
            },
            "sizeController": function ($applyOn, domSelector) {
                let dataType = $applyOn.attr('data-type');
                switch (dataType) {
                    case 'Image Link':
                        imageChange($applyOn);
                        break;
                    case 'underline':
                        underlineSize($applyOn, domSelector);
                        break;
                    case 'button':
                        buttonSize($applyOn, domSelector);
                        break;
                    case 'font icon':
                    case 'social link':
                        fonticonSize($applyOn, domSelector);
                        break;
                    default:
                        let finalClass = '';
                        let classes = $applyOn.attr('class');
                        let regex1 = new RegExp('\\bheading_[a-z0-9_]+\\b', 'g');
                        let m1 = classes.match(regex1);
                        let regex2 = new RegExp('\\btext_[a-z0-9_]+\\b', 'g');
                        let m2 = classes.match(regex2);
                        let regex3 = new RegExp('\\btextlink_[a-z0-9_]+\\b', 'g');
                        let m3 = classes.match(regex3);
                        if ($applyOn.hasClass('text')) {
                            finalClass = 'text';
                        } else if ($applyOn.hasClass('heading')) {
                            finalClass = 'heading';
                        } else if ($applyOn.hasClass('textlink')) {
                            finalClass = 'textlink';
                        } else if (m1 != null) {
                            finalClass = m1[0];
                        } else if (m2 != null) {
                            finalClass = m2[0];
                        } else if (m3 != null) {
                            finalClass = m3[0];
                        }
                        if ($applyOn.hasClass('text') || $applyOn.hasClass('heading') || m1 != null || m2 != null) {
                            $applyOn = $applyOn.parent().find(`.${finalClass}`).find('.editor-para');
                        }
                        else if ($applyOn.hasClass('textlink') || m3 != null) {
                            $applyOn = $applyOn.parent().find(`.${finalClass}`).find('a');
                        }
                        initText($applyOn, domSelector);
                }

                function initText($applyOn, domSelector) {
                    $(domSelector).AdvanceTextSetting({
                        targetParent: $activeDOM,
                        targetElem: $applyOn,
                        options: {
                            size: true,
                            width: true,
                            spacing: true,
                            transform: true,
                            family: true,
                            weight: true,
                            color: true
                        }
                    });
                }
                function imageChange($target) {
                    $(domSelector).html(component['image'].settingDOMs.tabs.Basic.DOM);
                    component["verticalcollector"].commonImageSize.ImageInit($activeDOM.find($target));
                }
                function underlineSize($underline, domSelector) {
                    let heightDOM = CreateSliderDOM('heightSlider', 'heightHandle', "Height");
                    let widthDOM = CreateSliderDOM('widthSlider', 'widthHandle', "Width");
                    $(domSelector).html(widthDOM);
                    $(domSelector).append(heightDOM);

                    let $sep = $underline.find('.rowSeparator');
                    HeightInit();
                    Width();
                    function HeightInit() {
                        var parentClasses = $sep.attr('class');
                        var dAlpha = DeviceAlphaSpace();
                        var regex = new RegExp(dAlpha + 'H-[0-9]{1,4}', 'g');
                        var HeightClass = parentClasses.match(regex);
                        var height = 0;
                        if (HeightClass !== null) {
                            height = HeightClass[0].replace(dAlpha + 'H-', '');
                        }
                        AdvanceSageSlider($('#heightSlider'), $('#heightHandle'), 1, 100, height, component["row separator"].common.HeightChange, $sep, 'px');
                    }
                    function Width() {
                        //var sepWidth = 100;
                        //var parentClasses = $sep.attr('class');
                        //var dAlpha = DeviceAlphaSpace();
                        //var regex = new RegExp(dAlpha + 'sfCol_[0-9]{1,3}', 'g');
                        //var sfWidth = parentClasses.match(regex);
                        //if (sfWidth !== null) {
                        //    sepWidth = parseInt(dAlpha + sfWidth[0].split('_')[1]);
                        //}

                        let width = GetValueByClassName($sep, 'sfCol_[0-9]{1,3}', 'sfCol_');
                        function RowSepWidth(space) {
                            parentClasses = $sep.attr('class');
                            dAlpha = DeviceAlphaSpace();
                            regex = new RegExp(dAlpha + 'sfCol_[0-9]{1,3}', 'g');
                            var sfColVal = parentClasses.match(regex);
                            if (sfColVal !== null) {
                                sepWidth = $sep.removeClass(sfColVal[0]);
                            }
                            $sep.addClass(dAlpha + 'sfCol_' + space);
                        }
                        AdvanceSageSlider($('#widthSlider'), $('#widthHandle'), 1, 100, width, RowSepWidth, $sep, '%');
                    }
                }
                function buttonSize($button, domSelector) {
                    $(domSelector).html(CreateSliderDOM('buttonWrapperSizeSlider', 'buttonWrapperSizeHandle', 'Width') + '<div id="btnText"></div>');
                    let $parent = $activeDOM.find('.button');
                    $("#btnText").AdvanceTextSetting({
                        targetParent: $activeDOM,
                        targetElem: $parent,
                        options: {
                            size: true,
                            lineheight: true,
                            width: false,
                            spacing: true,
                            transform: true,
                            family: true,
                            weight: true,
                            color: false
                        }
                    });
                    let $Icon = $parent.find('a > i');
                    let $text = $parent.find('a > span');
                    let $anchor = $parent.find('a');
                    buttonWidth();
                    function buttonWidth() {
                        function WidthChange(space) {
                            ReplaceClassByPattern($parent, 'W-[0-9]{1,4}', 'W-' + space);
                        }
                        AdvanceSageSlider($('#buttonWrapperSizeSlider'), $('#buttonWrapperSizeHandle'), 5, 1080,
                            GetValueByClassName($parent, 'W-[0-9]{1,4}', 'W-'), WidthChange, $parent, 'px');
                    }

                }
                function fonticonSize($fontIcon, domSelector) {
                    let sizeSet = {
                        fontsize: function () {
                            let $parent = $fontIcon;
                            let $icon = $parent.find('.font-icon');
                            function LineHeightChange(space) {
                                ReplaceClassByPattern($icon, 'Fs-[0-9]{1,4}', 'Fs-' + space);
                            }
                            AdvanceSageSlider($('#fontIconHeightSlider'), $('#fontIconHeightHandle'), 5, 1080, GetValueByClassName($icon, 'Fs-[0-9]{1,4}', 'Fs-'), LineHeightChange, $parent, 'px');
                        },
                        fontwrapper: function () {
                            let $parent = $fontIcon.find('.editor-component')
                            function LineHeightChange(space) {
                                ReplaceClassByPattern($parent, 'H-[0-9]{1,4}', 'H-' + space);
                                ReplaceClassByPattern($parent, 'W-[0-9]{1,4}', 'W-' + space);
                            }
                            AdvanceSageSlider($('#fontIconbackHeightSlider'), $('#fontIconbackHeightHandle'), 5, 1080, GetValueByClassName($parent, 'H-[0-9]{1,4}', 'H-'), LineHeightChange, $parent, 'px');
                        },
                        init: function () {
                            let wrapperDOM = CreateSliderDOM('fontIconHeightSlider', 'fontIconHeightHandle', ' Font Icon Size');
                            let iconDOM = CreateSliderDOM('fontIconbackHeightSlider', 'fontIconbackHeightHandle', 'WrapperSize');
                            $(domSelector).html(wrapperDOM + iconDOM);
                            this.fontsize();
                            this.fontwrapper();
                        }
                    }
                    sizeSet.init();

                }
            },
            "spacingController": function ($applyOn, domSelector) {
                $(domSelector).AdvanceSpacing({
                    targetParent: $activeDOM,
                    targetElem: $applyOn,
                    options: {
                        "margin": {
                            "max": 40,
                            "min": -40,
                            "times": 5,
                            "position": ["all", "top", "bottom", "left", "right"]
                        },
                        "padding": {
                            "max": 40,
                            "min": 0,
                            "times": 5,
                            "position": ["all", "top", "bottom", "left", "right"]
                        },
                    }
                });
            },
            "alignmentController": function ($applyOn, domSelector) {
                function removeAlignmentClass($par) {
                    let $target = $par.children();
                    $target.each(function (index) {
                        $(this).attr('class', $(this).attr('class').replace(/TxAl-[rlnc]/g, ''));
                    });
                }
                if ($applyOn.hasClass('componentWrap')) {
                    removeAlignmentClass($applyOn)
                }
                else if ($applyOn.hasClass('activeSetting')) {
                    let colHead = $applyOn.find('.collectionHeading');
                    let colSubHead = $applyOn.find('.topSubHeading ');
                    ReplaceClassByPattern(colHead, '/TxAl-[rlnc]/g', '');
                    ReplaceClassByPattern(colSubHead, '/TxAl-[rlnc]/g', '');
                    removeAlignmentClass($applyOn.find('.componentWrap'));
                }
                else if ($applyOn.hasClass('button') || $applyOn.hasClass('fonticonComponent')) {
                    $applyOn = $applyOn.parent();
                }
                $(domSelector).AdvanceAlignment({
                    targetParent: $activeDOM,
                    targetElem: $applyOn,
                    labels: {
                        'horizontal': 'Horizontal',
                    },
                    options: {
                        "horizontal": ["left", "center", "right"],
                    }
                });
            },
            "borderHandler": function ($applyOn, domSelector) {
                $(domSelector).AdvanceBorder({
                    targetParent: $activeDOM,
                    targetElem: $applyOn,
                    options: {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    }
                });
            },
            "borderRadiusHandler": function ($applyOn, domSelector) {
                $(domSelector).AdvanceBoxRadius({
                    targetParent: $activeDOM,
                    targetElem: $applyOn,
                    options: {
                        "max": 200,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"],
                    }
                });
            },
            "colorHandler": function ($par) {
                $('#slcColor').html(this.dropdown.color);

                $('#slcColor').off('change').on('change', function () {
                    let $selectedOpt = $(this).find('option:selected');
                    let selectedOptVal = $selectedOpt.val();
                    let back = 'undefined', font = 'undefined';
                    let wrap = $selectedOpt.attr('data-wrap');

                    if (typeof wrap != 'undefined' && wrap != 'undefined') {
                        wrap = $activeDOM.find(wrap);
                        back = wrap.find($selectedOpt.attr('data-back'));
                        font = wrap.find($selectedOpt.attr('data-font'));
                    }
                    else {
                        back = $activeDOM.find(selectedOptVal);
                        if (typeof $selectedOpt.attr('data-back') !== 'undefined') {
                            back = $selectedOpt.attr('data-back');
                        }
                        if (typeof $selectedOpt.attr('data-font') !== 'undefined') {
                            font = $selectedOpt.attr('data-font');
                        }
                    }

                    let selected = $selectedOpt.text();
                    let colorParam = { back, font, wrap };

                    $activeDOM.find('.actEle').removeClass('actEle');
                    $activeDOM.find(selectedOptVal).addClass('actEle');

                    $('#genBgSetWrap').html('');
                    $('#genBgSet').html('');
                    $('#fontColorHolder').html('');
                    colorChanger(colorParam, selected, selectedOptVal);
                });

                function colorChanger(colorParam, selected, selectedOptVal) {
                    if (selected == "underline")
                        changeColor("Line Color", `${selectedOptVal} .rowSeparator`, "background-color");
                    else {
                        $.each(colorParam, function (key, val) {
                            if (typeof val != 'undefined' && val != 'undefined') {
                                if (key == 'wrap') {
                                    $("#genBgSetWrap").AdvanceBackground({
                                        targetParent: $activeDOM,
                                        targetElem: val,
                                        options: ["color", "image"]
                                    });
                                    $("#genBgSetWrap").prepend(`<h4 style="border-bottom: 1px solid rgb(72, 70, 70); padding-bottom: 3px;">${selected} Wrapper</h4>`);
                                }
                                if (key == 'back') {
                                    let destVal = $activeDOM.find(val);
                                    if (val === ".cRow") {
                                        destVal = $activeDOM;
                                    }
                                    $("#genBgSet").AdvanceBackground({
                                        targetParent: $activeDOM,
                                        targetElem: destVal,
                                        options: ["color", "image"]
                                    });
                                    $("#genBgSet").prepend(`<h4 style="border-bottom: 1px solid rgb(72, 70, 70); padding-bottom: 3px;">${selected}</h4>`);
                                }
                                if (key == 'font') {
                                    changeColor('Font Color', $activeDOM.find(selectedOptVal).find(val), "color")
                                }
                            }
                        });
                    }
                    function changeColor(name, selector, bgOrFont) {
                        $('#fontColorHolder').append(`<div class="field-row stElWrap col90-10">
                                                            <span class="fCol TxAl-r">
                                                                <span class="color-picker-holder chooseColor" id="Font"></span>
                                                            </span>
                                                            </div>`);
                        $("#fontColorHolder").children().prepend(`<label class="fCol">${name}</label>`);


                        let $element = $activeDOM.find(selector);
                        if (bgOrFont == "background-color") {
                            $('#Font').css('background-color', $element.css('background-color'));
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $element.css({ "background-color": objColor.bgColor });
                                }
                            });
                        }
                        else {
                            $('#Font').css('background-color', $element.css('color'));
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $element.css({ "color": objColor.bgColor });
                                }
                            });
                        }
                        $('#Font').colorPicker(colorPickerOption);
                    }
                }

            },
            "deleteComponent": function ($element) {
                $element.find('.deletehelper').off('click').addClass("DeleteThis").removeClass('deletehelper');
                $element.find('.DeleteThis').off('click').on('click', function () {
                    SageConfirmDialog(easyMessageList.deletehelper).done(function () {
                        let isPro = $element.attr('data-ispro');
                        if (typeof isPro !== 'undefined' && (isPro === true || isPro === "true")) {
                            let delcls = $element.attr('data-delcls');
                            $element.closest('.verticalcollector').find('.' + delcls).remove();
                        } else {
                            $element.remove();
                        }
                    });
                });
            },
            "getSetDataType": (function (dataType) {
                return {
                    getType: function () {
                        return dataType;
                    },
                    setType: function ($app) {
                        dataType = $app.attr('data-type');
                        if (dataType == undefined) {
                            dataType = $app.find('.com-settings').attr('data-type');
                        }
                        this.dataType = dataType;
                    }
                }
            })(),
            "settingController": function ($DDselector, $setDOMSelector, callback, dropdown, includeCol) {
                let da = DeviceAlpha();
                let options = this.dropdown.common;
                if (dropdown == 'size') {
                    options = this.dropdown.size;
                }
                if (da != '') {
                    options = this.dropdown['common_' + da]
                    if (dropdown == 'size') {
                        options = this.dropdown['size_' + da];
                    }
                }
                if (dropdown == 'rad' || dropdown == 'border') {
                    options = this.dropdown.rad;
                }
                $DDselector.html(options);
                //if (dropdown != 'size')
                //this.renameDDoptions($DDselector, includeCol)
                $DDselector.off('change').on('change', function () {
                    $activeDOM.find('.actEle').removeClass('actEle');
                    let selected = $(this).val();
                    if (dropdown == 'rad' || dropdown == 'border') {
                        selected = $('option:selected', this).attr('data-target');
                    }
                    let targetElement;
                    if (selected === ".activeSetting") {
                        targetElement = $activeDOM;
                    }
                    else {
                        targetElement = $activeDOM.find(selected);
                    }

                    targetElement.addClass('actEle');

                    if (typeof callback == 'function')
                        callback(targetElement, $setDOMSelector);

                });
            },
            "reloadAllSettingTabs": function (setOrStyleDOM, excludeThis) {
                
                this.fillDropDown();
                if (Object.prototype.toString.call(excludeThis) !== '[object Array]') {
                    excludeThis = $.map(excludeThis.split(','), $.trim);
                }
                let componentName = $activeDOM.attr('data-type');
                let tabArray = Object.keys(component[componentName][setOrStyleDOM].tabs);
                $.each(excludeThis, function (i, val) {
                    let ii = tabArray.indexOf(val);
                    if (ii >= 0) {
                        tabArray.splice(tabArray.indexOf(val), 1);
                    }
                });
                tabArray.forEach(function (val) {
                    component[componentName][setOrStyleDOM].tabs[val].onload();
                });

            },
            "addComponent": function (dataType) {
                let $dom = $(component[dataType].defaultdata);
                let val = this.option[dataType].val;
                let self = this;
                switch (dataType) {
                    case 'button':
                        $dom = $dom.removeClass('hovered').wrap("<div class='buttonWrapper' data-val='buttonWrapper'></div>").parent();
                        break;
                    case 'font icon':
                        $dom = $dom.removeClass('fonticon').addClass('fonticonComponent').wrap("<div class='fontIconWrapper' data-val='fontIconWrapper'></div>").parent();
                        break;
                    default:
                        $dom.attr('data-val', val);
                }

                $dom.addClass('sortableItem').attr('data-type', dataType);
                let $compWrap = $activeDOM.find('.componentWrap');
                //let grpCls = val + this.randomUnique.generate;
                let grpCls = val + self.ran();
                let grpDelCls = grpCls + '_del';
                let clones = [];
                let isPro = this.isPro;
                let randomClass = self.ran();
                let random = val + randomClass;
                $compWrap.each(function () {
                    let $eachComp = $(this);
                    let $prevCount = $eachComp.find('[data-val="' + val + '"]');
                    let $cloned = $dom.clone();
                    $cloned.attr('data-ispro', isPro);
                    $cloned.attr('data-delcls', grpDelCls);
                    $cloned.attr('data-grpcls', grpCls);
                    $cloned.removeClass(val).addClass(grpDelCls).addClass(grpCls);
                    //test
                    //let randomClass = self.randomUnique.generate;
                    
                    $cloned.addClass(random).attr('data-val', random);
                    $cloned = self.fixSettingClass($cloned, dataType, grpCls);
                    clones.push($cloned);
                    $eachComp.append($cloned);
                });
                SettingEvents($activeDOM);
                let $this = this;
                $.each(clones, function (i, v) {
                    $this.deleteComponent($(v));
                });
                this.reloadAllSettingTabs('settingDOMs', ["Scroll Effect"]);
            },
            fixSettingClass: function ($dom, type, grpCls) {
                let self = this;
                let cls = self.option[type].color;
                if (typeof cls === 'undefined') {
                    return $dom;
                }
                $.each(cls, function (k, v) {
                    let $t = $dom.find(v);
                    if ($t.length > 0) {
                        $dom.find(v).addClass(v.substring(1) + '_' + grpCls);
                    } else {
                        $dom.addClass(v.substring(1) + '_' + grpCls);
                    }
                });
                return $dom;
            },
            "randomUnique": {
                get generate() {
       
                    //random
                    let idSuffix = '_' + Math.floor((Math.random() * 1000) + 100);
                    return 'rndm' + idSuffix;
                },
                get getRandClass() {
                    return this.randomClass;
                },
                get getRandDataForSort() {
                    return this.randomForSort;
                }
            },
            "ran": function () {
   
                //random
                let idSuffix = '_' + Math.floor((Math.random() * 1000) + 100);
                return 'rndm' + idSuffix;
            },

            "option": {
                "Image Link": { size: true, add: true, val: 'imagelink', rad: true, radTarget: 'a > img' },
                "button": {
                    size: true,
                    add: true,
                    color: {
                        wrap: '.buttonWrapper',
                        back: '.button',
                        font: '.com-button-text'
                    },
                    val: 'buttonWrapper',
                    rad: true,
                    radTarget: 'div.button'
                },
                "font icon": {
                    size: true, add: true,
                    color: {
                        wrap: '.fontIconWrapper',
                        back: '.fonticonComponent',
                        font: '.fa'
                    },
                    val: 'fontIconWrapper',
                    rad: true,
                    radTarget: 'div.fonticonComponent'
                },
                "heading": {
                    size: true,
                    add: true,
                    color: {
                        back: '.heading',
                        font: 'h1'
                    },
                    val: 'heading',
                    rad: true,
                    radTarget: ''
                },
                "text": {
                    size: true,
                    add: true,
                    color: {
                        back: '.text',
                        font: 'p'
                    },
                    val: 'text',
                    rad: true,
                    radTarget: ''
                },
                "underline": {
                    size: true,
                    add: true,
                    color: {},
                    val: 'underline',
                    rad: true,
                    radTarget: ''
                },
                "social link": {
                    size: true,
                    add: true,
                    color: {
                        back: '.fonticon',
                        font: '.fa',
                        wrap: '.sociallink'
                    },
                    val: 'sociallink',
                    rad: true,
                    radTarget: ''
                },
                "text link": {
                    size: true,
                    add: true,
                    color: {
                        back: '.textlink',
                        font: 'a'
                    },
                    val: 'textlink',
                    rad: true,
                    //radTarget: 'div.anchorWrapper',
                    radTarget: ''
                }
            },
            "dropdown": {
                "size": "",
                "add": "",
                "common": "",
                "color": '',
                "rad": '',
                'size_t': '',
                'size_m': '',
                common_t: '',
                common_m: ''
            },

        },
        "commonImageSize": {
            "$parent": function () {
                return $activeDOM.find($('#slcSize option:selected').val());
            },
            "$image": function () {
                return this.$parent().find('img');
            },
            "ImageWidthChange": function (space, $par, ref) {
                ReplaceClassByPattern(ref.$image(), 'W-[0-9]{1,4}', 'W-' + space);
                ReplaceClassByPattern(ref.$parent(), 'W-[0-9]{1,4}', 'W-' + space);
            },
            "ImageHeightChange": function (space, $par, ref) {
                ReplaceClassByPattern(ref.$image(), 'H-[0-9]{1,4}', 'H-' + space);
                ReplaceClassByPattern(ref.$parent(), 'H-[0-9]{1,4}', 'H-' + space);
            },
            "ImageHeightWidthChange": function (space, $par, ref) {
                ref.ImageHeightChange(space, $par, ref);
                ref.ImageWidthChange(space, $par, ref);
            },
            "imageheight": function () {
                let imageHeight = GetValueByClassName(this.$image(), 'H-[0-9]{1,4}', 'H-');
                imageHeight = imageHeight == 0 ? this.$image().height() : imageHeight;
                AdvanceSageSlider($('#imageHeightSlider'), $('#imageHeightHandle'), 1, 1080, imageHeight, this.ImageHeightChange, this.$parent(), 'px', this);
            },
            "imageheightWidth": function () {
                let imageWidth = GetValueByClassName(this.$image(), 'H-[0-9]{1,4}', 'H-');
                imageWidth = imageWidth == 0 ? this.$image().height() : imageWidth;
                AdvanceSageSlider($('#imageRoundSlider'), $('#imageRoundHandle'), 1, 1080, imageWidth, this.ImageHeightWidthChange, this.$parent(), 'px', this);
            },
            "RemoveImageHeightWidth": function () {
                this.RemoveImageHeight();
                this.RemoveImageWidth();
            },
            "RemoveImageHeight": function () {
                ReplaceClassByPattern(this.$image(), 'H-[0-9]{1,4}', '');
                ReplaceClassByPattern(this.$parent(), 'H-[0-9]{1,4}', '');
            },
            "RemoveImageWidth": function () {
                ReplaceClassByPattern(this.$image(), 'W-[0-9]{1,4}', '');
                ReplaceClassByPattern(this.$parent(), 'W-[0-9]{1,4}', '');
            },
            "SFImageWidthChange": function (space, $par, ref) {
                ReplaceClassByPattern(ref.$parent(), 'sfCol_[0-9]{1,3}', 'sfCol_' + space);
            },
            "imagewidth": function () {
                AdvanceSageSlider($('#imagesizeSlider'), $('#imagesizeHandle'), 1, 100, GetValueByClassName(this.$parent(), 'sfCol_[0-9]{1,3}', 'sfCol_'), this.SFImageWidthChange, this.$parent(), '%', this);
            },
            "ImageInit": function ($parent) {
                var $image = $parent.find('img');
                LoadSettings();
                function LoadSettings() {
                    ImageDisplay();
                    ImageWidthEvent();
                    //ImageBorder();
                    ImageFitCover();
                }
                function ImageDisplay() {
                    var imageHeight = $parent.height();
                    var imageWidth = $parent.width();
                    var imageRadius = parseInt($parent.css('border-top-left-radius').replace('%', ''));
                    if (imageRadius > 0) {
                        $('.rectangleOption').hide();
                        $('.roundOption').show();
                        $('#imageDisplay').val('round');
                    } else {
                        $('.rectangleOption').show();
                        $('.roundOption').hide();
                        $('#imageDisplay').val('rectangle');
                    }
                    $('#imageDisplay').on('change', function () {
                        var $this = $(this);
                        var val = $this.val();
                        switch (val) {
                            case 'round':
                                $('.rectangleOption').hide();
                                $('.roundOption').show();
                                ChangeRoundImageWidth();
                                $parent.addClass('round-image');
                                break;
                            case 'rectangle':
                                let height = $image.height();
                                $('.rectangleOption').show();
                                $('.roundOption').hide();
                                $image.css({ 'border-radius': '' });
                                $parent.css({ 'border-radius': '' });
                                $('#imageRadiusSlider').slider('value', 0);
                                $('#imageRadiusHandle').text(0);
                                $parent.removeClass('round-image');
                                ChangeSliderValue($('#imageHeightSlider'), height);
                                let regex = new RegExp('\\b[a-z]{0,1}W-[0-9]{1,4}\\b', 'g');
                                let classes = $image.eq(0).attr('class').match(regex);
                                if (classes.length > 0) {
                                    $.each(classes, function (i, o) {
                                        $image.removeClass(o);
                                        $parent.removeClass(o);
                                    });
                                    ReplaceClassByPattern($image, 'H-[0-9]{1,4}', 'H-' + height);
                                    ReplaceClassByPattern($parent, 'H-[0-9]{1,4}', 'H-' + height);
                                }
                                break;
                        }
                    });

                    ManualHeightEntryEvents();
                    ImageBoxRadius();
                    RoundImageWidth();
                }
                function ManualHeightEntryEvents() {
                    $('#refresImageWidth').on('click', function () {
                        component["verticalcollector"].commonImageSize.RemoveImageHeightWidth();
                        setTimeout(function () {
                            var holderheights = $image.height();
                            ChangeSliderValue($('#imageHeightSlider'), holderheights);
                        }, 100);
                    });
                    component["verticalcollector"].commonImageSize.imageheight();
                }
                function ImageBoxRadius() {
                    //'border-radius'
                    var boxRadius = 0;
                    boxRadius = $parent.attr('border-radius');

                    function ImageBoxRadius(space) {
                        $parent.css({ 'border-radius': space + 'px' });
                        $image.css({ 'border-radius': space + 'px' });
                    }
                    AdvanceSageSlider($('#imageRadiusSlider'), $('#imageRadiusHandle'), 0, 100, boxRadius, ImageBoxRadius, $parent, 'px');
                }

                function RoundImageWidth() {
                    component["verticalcollector"].commonImageSize.imageheightWidth();
                }

                function ChangeRoundImageWidth() {
                    var roundImageWidth = 0;
                    var imgHeight = parseInt($parent.width());
                    var imgWidth = parseInt($parent.height());
                    roundImageWidth = imgWidth;
                    if (imgHeight < imgWidth) {
                        roundImageWidth = imgHeight;
                    }
                    let _common = component["verticalcollector"].commonImageSize;
                    _common.ImageHeightWidthChange(roundImageWidth, $parent, _common);
                    $image.css({
                        'border-radius': '50%'
                    });
                    $parent.css({
                        'border-radius': '50%'
                    });
                    $('#imageRoundSlider').slider('value', roundImageWidth);
                    $('#imageRoundHandle').text(roundImageWidth);
                }
                function ImageWidthEvent() {
                    component["verticalcollector"].commonImageSize.imagewidth();
                }
                function ImageBorder() {
                    var imageBorderStyle = $parent[0].style.borderStyle; //.css('border-style');
                    $('#imgBorderStyle').val(imageBorderStyle);
                    if (imageBorderStyle.length === 0 || imageBorderStyle === 'none') {
                        $('.imgborder').hide();
                    } else {
                        $('.imgborder').show();
                    }

                    $('#imgBorderStyle').on('change', function () {
                        var style = $(this).val();
                        $parent.css('border-style', style);
                        if (style === 'none') {
                            $('.imgborder').hide();
                            $parent.css("border-width", '0px');
                            $('#imgBorderSlider').slider('value', 0);
                            $('#imgBorderHandle').text(0);
                        } else {
                            $('.imgborder').show();
                            var imgBordeVal = parseInt($('#imgBorderHandle').text());
                            if (imgBordeVal == 0)
                                imgBordeVal = 1;
                            $parent.css("border-width", imgBordeVal + 'px');
                            $('#imgBorderSlider').slider('value', imgBordeVal);
                            $('#imgBorderHandle').text(imgBordeVal);
                        }
                    });

                    var imgBorderWidth = $parent[0].style.borderWidth; // $parent.css("border-width");
                    if (imgBorderWidth.length > 0) {
                        imgBorderWidth = parseInt(imgBorderWidth.replace('px', ''));
                    } else {
                        imgBorderWidth = 1;
                    }

                    function RowSepHeight(space) {
                        $parent.css("border-width", space + 'px');
                    }
                    AdvanceSageSlider($('#imgBorderSlider'), $('#imgBorderHandle'), 1, 10, imgBorderWidth, RowSepHeight, $parent, 'px');
                    ImgBorderColor();
                }
                function ImgBorderColor() {
                    $('#imgBorderColor').css('background-color', $parent[0].style.borderColor);
                    var colorPickerOption = ColorPickerOption({
                        renderCallback: function ($elm, toggled) {
                            var objColor = RenderCallBackColor(this);
                            $parent.css({ 'border-color': objColor.bgColor });
                        }
                    });
                    $('#imgBorderColor').colorPicker(colorPickerOption);
                }
                function ImageFitCover() {
                    if ($parent.hasClass('fit-image')) {
                        $('#imageFittoCover').prop('checked', true);
                    } else {
                        $('#imageFittoCover').prop('checked', false);
                    }

                    $('#imageFittoCover').off().on('click', function () {
                        if ($(this).is(':checked')) {
                            $parent.addClass('fit-image');
                        } else {
                            $parent.removeClass('fit-image');
                        }
                    });
                }
            }
        },
    }
}