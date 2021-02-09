var Compform = {
    "form": {
        "componentname": "form",
        "category": "basic",
        "icon": "fa fa-form",
        "row": false,
        "hidden": true,
        "collection": false,
        "type": "store",
        "defaultdata": '',
        "beforedrop": function ($appendedParent, $appendLayer, dropped) { },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
           
        },
        "onsort": function (ui) { },
        
        "optionsDom": {
            'getDom': '',
            'createOptions': function ($slcID) {
                let html = `<option class="size" data-wrap="editor-component" value="editor-component">Entire Component</option>
                        <option class="size"  data-wrap=".formWrap" value=".formWrap">Form</option>'
                        <option class="size text"  data-wrap=".fmHead" value=".fmHead .hdng">Form Heading</option>'
                        <option class="size"  data-wrap=".fmFld" value = ".fmFld"> Field</option >
                        <option class="size"  data-wrap=".btn-wrap" value=".btn-wrap">Button Field</option>
                        <option class="size text"  data-wrap=".fmLbl" value=".fmLbl label">Label</option>                         
                        <option class="text"  data-wrap="" value=".chkLabel">Checkbox</option>                         
                        <option class="text"  data-wrap="" value=".rdoLabel">Radio Button</option>                         
                        <option class="text" data-wrap=".fmInp" value=".cbvInpTxt">Input Box</option>
                        <option class="text" data-wrap=".fmInp" value=".fmInp .slc">Dropdown</option>                      
                        <option data-wrap=".fmInp" value=".fmInp .chk">Checkbox</option>
                        <option class="size" data-wrap=".fmInp" value=".fmInp">Input Section</option>
                        <option class="text size" data-wrap=".btnFmSave" value=".btnFmSave">${$activeDOM.find('.btnFmSave').text()} button</option>
                        <option class="text size" data-wrap=".btnFmCancel" value=".btnFmCancel">${$activeDOM.find('.btnFmCancel').text()} button</option>`
                $slcID.html(html);
                $.each($slcID.find('option'), function () {
                    let val = $(this).val();
                    if (val !== 'editor-component') {
                        let $targetEle = $activeDOM.find(val);
                        if ($targetEle.length <= 0)
                            $(this).remove();
                    }
                });
                this.getDom = $slcID.html();
            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": '<div class="field-row" id="divEnDnField"></div>',
                    "onload": function ($item) {
                        let $parent = $activeDOM;
                        let html = '';
                        $parent.find('.fmFld').each(function (i, v) {
                            let $thisEle = $(this);
                            if (typeof $thisEle.attr('data-required') == 'undefined')
                                $thisEle.attr('data-required', 'non');
                            if (typeof $thisEle.attr('data-name') == 'undefined')
                                $thisEle.attr('data-name', $thisEle.find('.fmLbl label').text());
                            html += `<div class="field-row stElWrap col50-50">
                            <label class="fCol">${$thisEle.attr('data-name')}</label>
                            <div class="fCol TxAl-r Dfx">
                                <div class="sfCol_80">
                                <span class="toggle_btn">
                                    <input type="checkbox" data-targetele=".fmFld[data-name='${$thisEle.attr('data-name')}']" class="chkEnDnEle" id="toggleBtn${i}">
                                    <label for="toggleButtonLabel" class="tgl_slider"></label>
                                 </span>
                                 </div>
                                <span class="sfCol_20 TxAl-r"><span  data-targetele=".fmFld[data-name='${$thisEle.attr('data-name')}']" class="cPointer fmFldRequired asterisk ${$thisEle.attr('data-required')}" style="color:rgb(175, 172, 172)"  title="Turn On Required/ Off Required"><i class="fa fa-asterisk"></i></span></span>
                            </div>
                            </div>`
                        });
                        $('#divEnDnField').html(html);
                        $('input.chkEnDnEle').off('change').on('change', function () {
                            let $this = $(this);
                            if ($this.prop('checked'))
                                $parent.find($this.attr('data-targetele')).removeClass('Dn');
                            else
                                $parent.find($this.attr('data-targetele')).addClass('Dn');
                        });
                        $('input.chkEnDnEle').each(function () {
                            let $this = $(this);
                            $this.prop('checked', $($this.attr('data-targetele')).is(":visible"))
                        });
                        $('.fmFldRequired.required').css('color', 'rgb(255, 0, 0)');
                        $('.fmFldRequired').off('click').on('click', function () {
                            let $this = $(this);
                            let target = $parent.find($this.attr('data-targetele'));
                            let input = target.find('input,select');
                            if ($this.hasClass('required')) {
                                target.attr('data-required', 'non');
                                input.attr('data-name', input.attr('name'));
                                input.removeAttr('name');
                                target.find('.fmLbl span').remove();
                                $this.css('color', 'rgb(175, 172, 172)');
                                $this.removeClass('required');
                            } else {
                                target.attr('data-required', 'required');
                                $this.addClass('required');
                                target.find('.fmLbl label').append('<span>*<span>');
                                input.attr('name', input.attr('data-name'));
                                $this.css('color', 'rgb(255, 0, 0)');

                            }
                        });
                    },
                    "active": function () {
                        if (typeof ($activeDOM.attr('data-basic')) === 'undefined' || $activeDOM.attr('data-basic') == 'true') {
                            $('#tabs>ul>li').eq(0).removeClass('Dn');
                        }
                        else {
                            $('#tabs>ul>li').eq(0).addClass('Dn');
                            $('#tabs>ul>li').eq(1).trigger('click');
                        }
                        $('.actEle').removeClass('actEle');
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": `<div class="field-row stElWrap col50-50">
                                <label class="fCol">Apply Spacing on </label>
                                <span class="fCol TxAl-r select__box">
                                    <select id="slcSpcSettingAplyOn">                                                                                                       
                                    </select>
                                </span>
                            </div>
                            <div class="field-row">
                                <div id="divSpcSetting"></div>
                            </div>`,
                    "onload": function ($item) {
                        component['form'].optionsDom.createOptions($('#slcSpcSettingAplyOn'));
                        let $parent = $activeDOM;
                        $('#slcSpcSettingAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target == 'editor-component') {
                                $activeDOM.addClass('actEle');
                                InitSpacing($activeDOM);
                            } else {
                                $parent.find(target).addClass('actEle');
                                InitSpacing(target);
                            }
                        });
                        function InitSpacing(target) {
                            $("#divSpcSetting").AdvanceSpacing({
                                targetParent: $parent,
                                targetElem: target,
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
                        }
                    },
                    "active": function () {
                        $('#slcSpcSettingAplyOn').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#slcSpcSettingAplyOn').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
                "Text": {
                    "custom": true,
                    "DOM": `<div class="field-row stElWrap col50-50">
                                <label class="fCol">Apply Text Setting on </label>
                                <span class="fCol TxAl-r select__box">
                                    <select id="slcTxtSettingAplyOn">                                                             
                                    </select>
                                </span>
                            </div>
                            <div class="field-row">
                                <div id="divTxtSetting"></div>
                            </div>`,
                    "onload": function ($item) {
                        $('#slcTxtSettingAplyOn').html(component['form'].optionsDom.getDom);
                        $('#slcTxtSettingAplyOn option').not('.text').remove();
                        let $parent = $activeDOM;
                        $('#slcTxtSettingAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            $parent.find(target).addClass('actEle');
                            InitTextSetting(target);
                        });
                        function InitTextSetting(target) {

                            $("#divTxtSetting").AdvanceTextSetting({
                                targetParent: $parent,
                                targetElem: target,
                                options: {
                                    size: true,
                                    lineheight: true,
                                    width: false,
                                    spacing: true,
                                    transform: true,
                                    family: true,
                                    weight: true,
                                    color: true
                                },
                            });
                        }
                    },
                    "active": function () {
                        $('#slcTxtSettingAplyOn').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#slcTxtSettingAplyOn').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
                "Alignment": {
                    "custom": true,
                    "DOM": `<div class="field-row stElWrap col50-50">
                                <label class="fCol">Apply Alignment on </label>
                                <span class="fCol TxAl-r select__box">
                                    <select id="slcAignmentAplyOn">                                                                                                                                             
                                    </select>
                                </span>
                            </div>
                            <div class="field-row">
                                <div id="divAlignSetting"></div>
                            </div>`,
                    "onload": function ($item) {
                        $('#slcAignmentAplyOn').html(component['form'].optionsDom.getDom);
                        $('#slcAignmentAplyOn option').not('.size').remove();

                        let $parent = $activeDOM;
                        $('#slcAignmentAplyOn').off('change').on('change', function () {
                            let target = $('#slcAignmentAplyOn option:selected').attr('data-wrap');
                            $('.actEle').removeClass('actEle');
                            if (target == 'editor-component') {
                                $activeDOM.addClass('actEle');
                                initAlignment($activeDOM);
                            } else {
                                $parent.find(target).addClass('actEle');
                                initAlignment(target);
                            }
                          
                        });
                        function initAlignment(target) {
                            $('#divAlignSetting').AdvanceAlignment({
                                targetParent: $parent,
                                targetElem: target,
                                options: {
                                    'horizontal': ["left", "center", "right"],
                                    'vertical': ["top", "middle", "bottom"],

                                }
                            });

                        }

                    },
                    "active": function () {
                        $('#slcAignmentAplyOn').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#slcAignmentAplyOn').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
                "Size": {
                    "custom": true,
                    "DOM": `<div class="field-row stElWrap col50-50">
                                <label class="fCol">Apply width on </label>
                                <span class="fCol TxAl-r select__box">
                                    <select id="slcSizeSettingAplyOn">        
                                     </select>
                                </span>
                            </div>
                            <div class="field-row">
                                <div id="divWidthSetting"></div>
                            </div>                                       
                                `,
                    "onload": function ($item) {
                        $('#slcSizeSettingAplyOn').html(component['form'].optionsDom.getDom);
                        $('#slcSizeSettingAplyOn option').not('.size').remove();
                        let $parent = $activeDOM;
                        $('#slcSizeSettingAplyOn').off('change').on('change', function () {
                            let target = $('#slcSizeSettingAplyOn option:selected').attr('data-wrap');
                            $('.actEle').removeClass('actEle');
                            if (target == 'editor-component') {
                                $activeDOM.addClass('actEle');
                                init($activeDOM);
                            } else {
                                $parent.find(target).addClass('actEle');
                                init(target);
                            }
                        });
                        function init(target) {
                            $("#divWidthSetting").AdvanceWidthSlider({
                                targetParent: $parent,
                                targetElem: target,
                            });
                        }
                    },
                    "active": function () {
                        $('#slcSizeSettingAplyOn').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#slcSizeSettingAplyOn').trigger('change').addClass('slcActiveEleSetting');
                    }
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "styleDOMs": {
            "tabs": {
                "Background": {
                    "custom": true,
                    "DOM": `<div class="field-row stElWrap col50-50">
                                <label class="fCol">Apply Background on </label>
                                <span class="fCol TxAl-r select__box">
                                    <select id="slcBgAplyOn">                                    
                                    </select>
                                </span>
                            </div>
                            <div class="field-row">
                                <div id="divBgSetting"></div>
                            </div>`,
                    "onload": function ($item) {
                        component['form'].optionsDom.createOptions($('#slcBgAplyOn'));

                        let $parent = $activeDOM;
                        $('#slcBgAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target == 'editor-component') {
                                $activeDOM.addClass('actEle');
                                InitBackground($activeDOM);
                            } else {
                                $parent.find(target).addClass('actEle');
                                InitBackground(target);
                            }
                        });
                        function InitBackground(target) {

                            $("#divBgSetting").AdvanceBackground({
                                targetParent: $parent,
                                targetElem: target,
                                options: ["color"]
                            });
                        }
                    },
                    "active": function () {

                        $('#slcBgAplyOn').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#slcBgAplyOn').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
                "Border": {
                    "custom": true,
                    "DOM": `<div class="field-row stElWrap col50-50">
                                <label class="fCol">Apply Border on </label>
                                <span class="fCol TxAl-r select__box">
                                    <select id="slcBdrAplyOn">                                       
                                    </select>
                                </span>
                            </div>
                            <div class="field-row">
                                <div id="divBdrSetting"></div>
                            </div>`,
                    "onload": function ($item) {
                        $('#slcBdrAplyOn').html(component['form'].optionsDom.getDom);
                        let $parent = $activeDOM;
                        $('#slcBdrAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target == 'editor-component') {
                                $activeDOM.addClass('actEle');
                                Init($activeDOM);
                            } else {
                                $parent.find(target).addClass('actEle');
                                Init(target);
                            }
                        });
                        function Init(target) {
                            $("#divBdrSetting").AdvanceBorder({
                                targetParent: $parent,
                                targetElem: target,
                                options: {
                                    "max": 20,
                                    "min": 0,
                                    "times": 1,
                                    "position": ["all", "top", "right", "bottom", "left"],
                                }
                            });

                        }

                    },
                    "active": function () {

                        $('#slcBdrAplyOn').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#slcBdrAplyOn').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
                "Box Radius": {
                    "custom": true,
                    "DOM": `<div class="field-row stElWrap col50-50">
                                <label class="fCol">Apply Border on </label>
                                <span class="fCol TxAl-r select__box">
                                    <select id="slcBxRdsAplyOn">
                                    </select>
                                </span>
                            </div>
                            <div class="field-row">
                                <div id="divBxRdsSetting"></div>
                            </div>`,
                    "onload": function ($item) {
                        $('#slcBxRdsAplyOn').html(component['form'].optionsDom.getDom);
                        let $parent = $activeDOM;
                        $('#slcBxRdsAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target == 'editor-component') {
                                $activeDOM.addClass('actEle');
                                Init($activeDOM);
                            } else {
                                $parent.find(target).addClass('actEle');
                                Init(target);
                            }
                        });
                        function Init(target) {

                            $("#divBxRdsSetting").AdvanceBoxRadius({
                                targetParent: $parent,
                                targetElem: target,
                                "options": {
                                    "max": 200,
                                    "min": 0,
                                    "times": 1,
                                    "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                                }
                            });

                        }

                    },
                    "active": function () {

                        $('#slcBxRdsAplyOn').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#slcBxRdsAplyOn').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
                "Box Shadow": {
                    "custom": true,
                    "DOM": `<div class="field-row stElWrap col50-50">
                                <label class="fCol">Apply Box Shadow on </label>
                                <span class="fCol TxAl-r select__box">
                                    <select id="slcBxSdoAplyOn">
                                    
                                    </select>
                                </span>
                            </div>
                            <div class="field-row">
                                <div id="divBxSdoSetting"></div>
                            </div>`,
                    "onload": function ($item) {
                        $('#slcBxSdoAplyOn').html(component['form'].optionsDom.getDom);
                        let $parent = $activeDOM;
                        $('#slcBxSdoAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target == 'editor-component') {
                                $activeDOM.addClass('actEle');
                                Init($activeDOM);
                            } else {
                                $parent.find(target).addClass('actEle');
                                Init(target);
                            }
                        });
                        function Init(target) {
                            $("#divBxSdoSetting").AdvanceBoxShadow({
                                targetParent: $parent,
                                targetElem: target,

                            });
                        }

                    },
                    "active": function () {

                        $('#slcBxSdoAplyOn').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#slcBxSdoAplyOn').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
                "Hover Effect": {
                    "custom": true,
                    "DOM": `<div class="field-row stElWrap col50-50">
                                <label class="fCol">Apply Hover Effect on </label>
                                <span class="fCol TxAl-r select__box">
                                    <select id="slcHoverEftAplyOn">
                                    </select>
                                </span>
                            </div>
                            <div class="field-row">
                                <div id="divHoverEftAplyOn"></div>
                            </div>`,
                    "onload": function ($item) {
                        $('#slcHoverEftAplyOn').html(component['form'].optionsDom.getDom);
                        $('#slcHoverEftAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target == 'editor-component') {
                                $activeDOM.addClass('actEle');
                                Init($activeDOM);
                            } else {
                                $activeDOM.find(target).addClass('actEle');
                                Init(target);
                            }
                        });
                        function Init(target) {
                            $("#divHoverEftAplyOn").AdvanceHoverEffect({
                                targetParent: $activeDOM,
                                targetElem: target,
                                options: {
                                    "color": ["all", "background", "text"],
                                    "shadow": "on",
                                    "border": {
                                        "max": 20,
                                        "min": 0,
                                        "times": 1,
                                        "position": ["all", "top", "right", "bottom", "left"]
                                    }
                                }
                            });
                        }
                    },
                    "active": function () {

                        $('#slcHoverEftAplyOn').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#slcHoverEftAplyOn').trigger('change').addClass('slcActiveEleSetting');
                    }
                },

            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "responsiveDOMs": {
            "tabs": {
                "Spacing": {
                    "custom": true,
                    "DOM": `<div class="field-row stElWrap col50-50">
                                <label class="fCol">Apply Spacing on </label>
                                <span class="fCol TxAl-r select__box">
                                    <select id="slcSpcSettingAplyOn">                                                                                                       
                                    </select>
                                </span>
                            </div>
                            <div class="field-row">
                                <div id="divSpcSetting"></div>
                            </div>`,
                    "onload": function ($item) {
                        component['form'].optionsDom.createOptions($('#slcSpcSettingAplyOn'));
                        let $parent = $activeDOM;
                        $('#slcSpcSettingAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target == 'editor-component') {
                                $activeDOM.addClass('actEle');
                                InitSpacing($activeDOM);
                            } else {
                                $parent.find(target).addClass('actEle');
                                InitSpacing(target);
                            }
                        });
                        function InitSpacing(target) {
                            $("#divSpcSetting").AdvanceSpacing({
                                targetParent: $parent,
                                targetElem: target,
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
                        }
                    },
                    "active": function () {
                        $('#slcSpcSettingAplyOn').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#slcSpcSettingAplyOn').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
                "Text": {
                    "custom": true,
                    "DOM": `<div class="field-row stElWrap col50-50">
                                <label class="fCol">Apply Text Setting on </label>
                                <span class="fCol TxAl-r select__box">
                                    <select id="slcTxtSettingAplyOn">                                                             
                                    </select>
                                </span>
                            </div>
                            <div class="field-row">
                                <div id="divTxtSetting"></div>
                            </div>`,
                    "onload": function ($item) {
                        $('#slcTxtSettingAplyOn').html(component['form'].optionsDom.getDom);
                        $('#slcTxtSettingAplyOn option').not('.text').remove();
                        let $parent = $activeDOM;
                        $('#slcTxtSettingAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            $parent.find(target).addClass('actEle');
                            InitTextSetting(target);
                        });
                        function InitTextSetting(target) {

                            $("#divTxtSetting").AdvanceTextSetting({
                                targetParent: $parent,
                                targetElem: target,
                                options: {
                                    size: true,
                                    lineheight: true,
                                    width: false,
                                    spacing: true,
                                    transform: true,
                                    family: true,
                                    weight: true,
                                    color: true
                                },
                            });
                        }
                    },
                    "active": function () {
                        $('#slcTxtSettingAplyOn').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#slcTxtSettingAplyOn').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
                "Alignment": {
                    "custom": true,
                    "DOM": `<div class="field-row stElWrap col50-50">
                                <label class="fCol">Apply Alignment on </label>
                                <span class="fCol TxAl-r select__box">
                                    <select id="slcAignmentAplyOn">                                                                                                                                             
                                    </select>
                                </span>
                            </div>
                            <div class="field-row">
                                <div id="divAlignSetting"></div>
                            </div>`,
                    "onload": function ($item) {
                        $('#slcAignmentAplyOn').html(component['form'].optionsDom.getDom);
                        $('#slcAignmentAplyOn option').not('.size').remove();

                        let $parent = $activeDOM;
                        $('#slcAignmentAplyOn').off('change').on('change', function () {
                            let target = $('#slcAignmentAplyOn option:selected').attr('data-wrap');
                            $('.actEle').removeClass('actEle');
                            if (target == 'editor-component') {
                                $activeDOM.addClass('actEle');
                                initAlignment($activeDOM);
                            } else {
                                $parent.find(target).addClass('actEle');
                                initAlignment(target);
                            }

                        });
                        function initAlignment(target) {
                            $('#divAlignSetting').AdvanceAlignment({
                                targetParent: $parent,
                                targetElem: target,
                                options: {
                                    'horizontal': ["left", "center", "right"],
                                    'vertical': ["top", "middle", "bottom"],

                                }
                            });

                        }

                    },
                    "active": function () {
                        $('#slcAignmentAplyOn').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#slcAignmentAplyOn').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
                "Size": {
                    "custom": true,
                    "DOM": `<div class="field-row stElWrap col50-50">
                                <label class="fCol">Apply width on </label>
                                <span class="fCol TxAl-r select__box">
                                    <select id="slcSizeSettingAplyOn">        
                                     </select>
                                </span>
                            </div>
                            <div class="field-row">
                                <div id="divWidthSetting"></div>
                            </div>                                       
                                `,
                    "onload": function ($item) {
                        $('#slcSizeSettingAplyOn').html(component['form'].optionsDom.getDom);
                        $('#slcSizeSettingAplyOn option').not('.size').remove();
                        let $parent = $activeDOM;
                        $('#slcSizeSettingAplyOn').off('change').on('change', function () {
                            let target = $('#slcSizeSettingAplyOn option:selected').attr('data-wrap');
                            $('.actEle').removeClass('actEle');
                            if (target == 'editor-component') {
                                $activeDOM.addClass('actEle');
                                init($activeDOM);
                            } else {
                                $parent.find(target).addClass('actEle');
                                init(target);
                            }
                        });
                        function init(target) {
                            $("#divWidthSetting").AdvanceWidthSlider({
                                targetParent: $parent,
                                targetElem: target,
                            });
                        }
                    },
                    "active": function () {
                        $('#slcSizeSettingAplyOn').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#slcSizeSettingAplyOn').trigger('change').addClass('slcActiveEleSetting');
                    }
                }
            },

        },

    }
}
