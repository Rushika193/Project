var passwordrecover = {
    "password recover": {
        "componentname": "password recover",
        "category": "basic",
        "icon": "fa fa-undo",
        "row": false,
        "hidden": false,
        "collection": false,
        "defaultdata": EasyLibrary.ReadDOM('systempages/passwordrecoverview', false),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) { },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            this.responsiveDOMs = this.settingDOMs;
            if ($appendedParent.find('.comp-passwordrecover').length > 1) {
                SageAlertDialog("Only one password recover component is allowed");
                $appendLayer.remove();
            }
            this.view.view();
        },
        "onsort": function (ui) {

        },
        "optionsDom": {
            'getDom': '',
            'createOptions': function ($slcID) {
                let html = `<option class="size" data-wrap=".comp-passwordrecover" value=".comp-passwordrecover">Component</option>       
                        <option class="size text"  data-wrap=".fmHFld" value=".heading">Heading</option >
                        <option class="size"  data-wrap=".fmFld" value = ".fmFld">Field</option >           
                        <option class="size text"  data-wrap=".fmLbl" value=".fmLbl label">Label</option>                                                                                         
                        <option class="text" data-wrap=".fmInp" value=".cbvInpTxt">Input Box</option>                        
                        <option class="text size" data-wrap=".btn-wrap" value=".btnResetPassword">Change Password Button</option>
                     `
                $slcID.html(html);
                this.getDom = $slcID.html();
            }
        },
        "settingDOMs": {
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
                        component['password recover'].optionsDom.createOptions($('#slcSpcSettingAplyOn'));

                        $('#slcSpcSettingAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target === '.comp-passwordrecover') {
                                $activeDOM.addClass('actEle');
                                target = $activeDOM;
                            } else {
                                $activeDOM.find(target).addClass('actEle');
                            }

                            InitSpacing(target);
                        });
                        function InitSpacing(target) {
                            $("#divSpcSetting").AdvanceSpacing({
                                targetParent: $activeDOM,
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
                        $('#slcTxtSettingAplyOn').html(component['password recover'].optionsDom.getDom);
                        $('#slcTxtSettingAplyOn option').not('.text').remove();

                        $('#slcTxtSettingAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            $activeDOM.find(target).addClass('actEle');
                            InitTextSetting(target);
                        });
                        function InitTextSetting(target) {

                            $("#divTxtSetting").AdvanceTextSetting({
                                targetParent: $activeDOM,
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
                        $('#slcAignmentAplyOn').html(component['password recover'].optionsDom.getDom);
                        $('#slcAignmentAplyOn option').not('.size').remove();


                        $('#slcAignmentAplyOn').off('change').on('change', function () {
                            let target = $('#slcAignmentAplyOn option:selected').attr('data-wrap');
                            $('.actEle').removeClass('actEle');
                            if (target === '.comp-passwordrecover') {
                                $activeDOM.addClass('actEle');
                                target = $activeDOM;
                            } else {
                                $activeDOM.find(target).addClass('actEle');
                            }
                            initAlignment(target);
                        });
                        function initAlignment(target) {
                            $('#divAlignSetting').AdvanceAlignment({
                                targetParent: $activeDOM,
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
                        $('#slcSizeSettingAplyOn').html(component['password recover'].optionsDom.getDom);
                        $('#slcSizeSettingAplyOn option').not('.size').remove();

                        $('#slcSizeSettingAplyOn').off('change').on('change', function () {
                            let target = $('#slcSizeSettingAplyOn option:selected').attr('data-wrap');
                            $('.actEle').removeClass('actEle');
                            if (target === '.comp-passwordrecover') {
                                $activeDOM.addClass('actEle');
                                target = $activeDOM;
                            } else {
                                $activeDOM.find(target).addClass('actEle');
                            }
                            init(target);
                        });
                        function init(target) {
                            $("#divWidthSetting").AdvanceWidthSlider({
                                targetParent: $activeDOM,
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
                        component['password recover'].optionsDom.createOptions($('#slcBgAplyOn'));


                        $('#slcBgAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target === '.comp-passwordrecover') {
                                $activeDOM.addClass('actEle');
                                target = $activeDOM;
                            } else {
                                $activeDOM.find(target).addClass('actEle');
                            }
                            InitBackground(target);
                        });
                        function InitBackground(target) {

                            $("#divBgSetting").AdvanceBackground({
                                targetParent: $activeDOM,
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
                        $('#slcBdrAplyOn').html(component['password recover'].optionsDom.getDom);

                        $('#slcBdrAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target === '.comp-passwordrecover') {
                                $activeDOM.addClass('actEle');
                                target = $activeDOM;
                            } else {
                                $activeDOM.find(target).addClass('actEle');
                            }
                            Init(target);
                        });
                        function Init(target) {
                            $("#divBdrSetting").AdvanceBorder({
                                targetParent: $activeDOM,
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
                        $('#slcBxRdsAplyOn').html(component['password recover'].optionsDom.getDom);

                        $('#slcBxRdsAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target === '.comp-passwordrecover') {
                                $activeDOM.addClass('actEle');
                                target = $activeDOM;
                            } else {
                                $activeDOM.find(target).addClass('actEle');
                            }
                            Init(target);
                        });
                        function Init(target) {

                            $("#divBxRdsSetting").AdvanceBoxRadius({
                                targetParent: $activeDOM,
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
                        $('#slcBxSdoAplyOn').html(component['password recover'].optionsDom.getDom);

                        $('#slcBxSdoAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target === '.comp-passwordrecover') {
                                $activeDOM.addClass('actEle');
                                target = $activeDOM;
                            } else {
                                $activeDOM.find(target).addClass('actEle');
                            }
                            Init(target);
                        });
                        function Init(target) {
                            $("#divBxSdoSetting").AdvanceBoxShadow({
                                targetParent: $activeDOM,
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
                        $('#slcHoverEftAplyOn').html(component['password recover'].optionsDom.getDom);
                        $('#slcHoverEftAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target === '.comp-passwordrecover') {
                                target = $activeDOM;
                            }
                            Init(target);
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
        "remove": function ($viewDOM) {
            $viewDOM.find('#btnResetPassword').attr('type', 'submit');
        },
        "view": {
            "view": function () {
                var $pr = $('.comp-passwordrecover');
                $('#divReqVerToken').html($('input:hidden[name="__RequestVerificationToken"]')[0].outerHTML);
                $('#hdnRecoveryCode').val(GetSearchQuery().code);
                this.event($pr);
            },
            "validate": function ($pr) {
                var valid = true;
                $pr.find('.sfError').remove();
                $pr.find('.requiredFld').each(function () {
                    var $this = $(this);
                    if ($this.val() === '') {
                        valid = false;
                        $this.after('<span class="sfError">Required Field</span>');
                    }
                    else if ($this.attr('id') === 'txtConfirmPassword' && $this.val() !== $('#txtNewPassword').val()) {
                        valid = false;
                        $this.after('<span class="sfError">Password Mismatch</span>');
                    }
                });
                return valid;
            },
            "event": function ($pr) {
                var _this = this;
                $pr.find('.requiredFld').off('keyup').on('keyup', function () {
                    var $ths = $(this);
                    $ths.next('.sfError').remove();
                    if ($ths.val() === '')
                        $ths.after('<span class="sfError">Required Field</span>');
                });
                $('#btnResetPassword').off('click').on('click', function (e) {
                    if (!_this.validate($pr))
                        e.preventDefault();
                });
            }
        }

    }
}
