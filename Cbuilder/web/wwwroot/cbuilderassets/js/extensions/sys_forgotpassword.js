var forgotPassword = {
    "forgot password": {
        "componentname": "forgot password",
        "category": "basic",
        "icon": "fa fa-lock",
        "row": false,
        "hidden": false,
        "collection": false,

        "defaultdata": EasyLibrary.ReadDOM('SystemPages/forgotpassword', false),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) { },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
           
            this.responsiveDOMs = this.settingDOMs;
            if ($appendedParent.find('.comp-forgotpassword').length > 1) {
                SageAlertDialog("Only one login form component is allowed");
                $appendLayer.remove();
            }
            this.view.initCaptcha($('.comp-forgotpassword'));
        },
        "onsort": function (ui) {
            //$('.deletehelper,.dltRw').show();
            //$('.comp-forgotpassword').parents('.cRow').find('.dltRw').hide();
            //$('.comp-forgotpassword').parents('.editor-col').find('>.SetHdlr .deletehelper').hide();
            //$('.comp-forgotpassword').parents('.container').find('>.SetHdlr .deletehelper').hide();
        },
        "optionsDom": {
            'getDom': '',
            'createOptions': function ($slcID) {
                let html = `<option class="size" data-wrap=".comp-forgotpassword" value=".comp-forgotpassword">Component</option>       
                        <option class="size text"  data-wrap=".fmHFld" value=".heading">Heading</option >
                        <option class="size"  data-wrap=".fmFld" value = ".fmFld">Field</option >
                        <option class="size"  data-wrap=".btn-wrap" value=".btn-wrap">Button Field</option>
                        <option class="size text"  data-wrap=".fmLbl" value=".fmLbl label">Label</option>                                                                                         
                        <option class="text" data-wrap=".fmInp" value=".cbvInpTxt">Input Box</option>                        
                        <option class="text" data-wrap=".btn-wrap" value=".btnRecoveredPass">Button</option>
                        <option class="size"  data-wrap=".imgCaptcha" value=".imgCaptcha">Captcha Image</option>
                        <option class="size"  data-wrap=".captchaField" value=".captchaField">Captcha Field</option>
                        <option class="text" data-wrap=".btn-wrap" value=".btnRefreshCapcha">Refresh Captcha</option>
                        <option class="text size"  data-wrap=".msg" value=".msg">Success Message</option>
                        <option class="text size"  data-wrap=".ErrorMsg" value=".ErrorMsg">Error Message</option>`
                $slcID.html(html);

                this.getDom = $slcID.html();
            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "custom": true,
                    "DOM": `<h4>Hide Show Field For Design</h4>
                        <span class="info">In Implementation these field are automatically hide/show by the system.</span>
                        <div class="field-row" id="divEnDnField"></div>`,
                    "onload": function ($item) {
                        let $parent = $activeDOM;
                        let html = '';
                        $parent.find('.fldEnDn').each(function (i, v) {
                            let $thisEle = $(this);
                            html += `<div class="field-row stElWrap col50-50">
                            <label class="fCol">${$thisEle.attr('data-name')}</label>
                            <div class="fCol TxAl-r Dfx">
                                <div class="sfCol_80">
                                <span class="toggle_btn">
                                    <input type="checkbox" data-targetele=".fldEnDn[data-name='${$thisEle.attr('data-name')}']" class="chkEnDnEle" id="toggleBtn${i}">
                                    <label for="toggleButtonLabel" class="tgl_slider"></label>
                                 </span>
                                 </div>                            
                            </div>
                            </div>`
                        });
                        $('#divEnDnField').html(html);
                        $('input.chkEnDnEle').off('change').on('change', function () {
                            let $this = $(this);
                            let $target = $parent.find($this.attr('data-targetele'));
                            if ($this.prop('checked')) {
                                $target.removeClass('Dn');
                                $activeDOM.find($target.attr('data-alterfld')).addClass('Dn');
                                $activeDOM.find($target.attr('data-samefld')).removeClass('Dn');
                            }
                            else {
                                $target.addClass('Dn');
                            }
                            checkState()
                        });
                        function checkState() {
                            $('input.chkEnDnEle').each(function () {
                                let $this = $(this);
                                $this.prop('checked', $($this.attr('data-targetele')).is(":visible"))
                            });
                        }
                        checkState();
                    },

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
                        component['forgot password'].optionsDom.createOptions($('#slcSpcSettingAplyOn'));
                        $('#slcSpcSettingAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target == '.comp-forgotpassword') {
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
                        $('#slcTxtSettingAplyOn').html(component['forgot password'].optionsDom.getDom);
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
                        $('#slcAignmentAplyOn').html(component['forgot password'].optionsDom.getDom);
                        $('#slcAignmentAplyOn option').not('.size').remove();

                        $('#slcAignmentAplyOn').off('change').on('change', function () {
                            let target = $('#slcAignmentAplyOn option:selected').attr('data-wrap');
                            $('.actEle').removeClass('actEle');
                            if (target == '.comp-forgotpassword') {
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
                        $('#slcSizeSettingAplyOn').html(component['forgot password'].optionsDom.getDom);
                        $('#slcSizeSettingAplyOn option').not('.size').remove();

                        $('#slcSizeSettingAplyOn').off('change').on('change', function () {
                            let target = $('#slcSizeSettingAplyOn option:selected').attr('data-wrap');
                            $('.actEle').removeClass('actEle');
                            if (target == '.comp-forgotpassword') {
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
                        component['forgot password'].optionsDom.createOptions($('#slcBgAplyOn'));

                        $('#slcBgAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target == '.comp-forgotpassword') {
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
                        $('#slcBdrAplyOn').html(component['forgot password'].optionsDom.getDom);

                        $('#slcBdrAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target == '.comp-forgotpassword') {
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
                        $('#slcBxRdsAplyOn').html(component['forgot password'].optionsDom.getDom);

                        $('#slcBxRdsAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target == '.comp-forgotpassword') {
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
                        $('#slcBxSdoAplyOn').html(component['forgot password'].optionsDom.getDom);

                        $('#slcBxSdoAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target == '.comp-forgotpassword') {
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
                        $('#slcHoverEftAplyOn').html(component['forgot password'].optionsDom.getDom);
                        $('#slcHoverEftAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target === '.comp-forgotpassword') {
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
        "removeEdit": function ($editDOM) {
            $editDOM.find('#ForgotPasswordCaptcha').html('');
        },
        "remove": function ($viewDOM) {
            $viewDOM.find('#ForgotPasswordCaptcha').html('');
            $viewDOM.find('#divForgotPasswordForm').removeClass('Dn mDn tDn');
            $viewDOM.find('#divStatusMessage,#divErrorMessage').addClass('Dn');
        },
        view: {
            view: function () {
                var $pr = $('.comp-forgotpassword');
                this.evntListen($pr);
                this.validation($pr);
                this.initCaptcha($pr);
            },
            validation: function ($pr) {
                var self = this;
                $pr.find('.requiredFld').on('keyup', function () {
                    let $this = $(this);
                    $this.next('.sfError').remove();
                    if ($this.val() === '') {
                        $this.after('<span class="sfError">Required Field</span>');
                    }
                    else if ($this.attr('data-email') === 'true' && !self.validEmail($this.val())) {
                        $this.after('<span class="sfError">Invalid Email</span>');
                    } else {
                        $this.next('.sfError').remove();
                    }
                });
            },
            validEmail: function (email) {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            },
            validateForm: function ($pr) {
                var self = this;
                $pr.find('.sfError').remove();
                var valid = true;
                $pr.find('.requiredFld').each(function () {
                    var $inp = $(this);
                    if ($inp.val() === '') {
                        $inp.after('<span class="sfError">Required Field</span>');
                        valid = false;
                    } else if ($inp.attr('data-email') === 'true' && !self.validEmail($inp.val())) {
                        $inp.after('<span class="sfError">Invalid Email</span>');
                        valid = false;
                    }
                });
                return valid;
            },
            evntListen: function ($pr) {
                var self = this;
                $('#btnRecoverPassword').off('click').on('click', function () {
                    if (self.validateForm($pr))
                    self.sendRequest($pr);
                });
            },
            sendRequest: function ($pr) { 
                var self = this;
                let config = {
                    url: '/account/forgotpassword',
                    data: JSON.stringify({
                        UserName: $('#txtUserEmail').val(),
                        CaptchaValue: $('#txtCaptchaValue').val(),
                        CaptchaResponse: $pr.find('input[name="cbuildercaptcharesponse"]').val()
                    }),
                    success: function (data) {
                        if (data.IsSuccess) {
                            $pr.find('#divStatusMessage').text(data.Message).removeClass('Dn');
                            $pr.find('#divForgotPasswordForm,#divErrorMessage').addClass('Dn');
                        } else {
                            $pr.find('#divErrorMessage').text(data.Message).removeClass('Dn');
                            $pr.find('#divForgotPasswordForm').removeClass('Dn');
                            $pr.find('#divStatusMessage').addClass('Dn');
                            self.initCaptcha($pr);
                        }
                    },
                }
                SecureAjaxCall.PassObject(config);
            },
            initCaptcha: function ($pr) {
                    $('#ForgotPasswordCaptcha').contentdercaptcha({
                        type: 'number',
                        siteKey: SitePublicKey,
                        secretKey: 'ss'
                    });
            }

        }

    }
}
