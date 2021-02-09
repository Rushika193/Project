var loginForm = {
    "login form": {
        "componentname": "login form",
        "category": "basic",
        "icon": "fa fa-sign-in",
        "row": false,
        "hidden": false,
        "collection": false,
        "defaultdata": EasyLibrary.ReadDOM('SystemPages/loginform', false),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) { },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {

            if (dropped && $appendedParent.find('.comp-loginform').length > 1) {
                SageAlertDialog("Only one login form component is allowed");
                $appendLayer.remove();
            }
            this.view.initCaptcha({ captcha: 'true', type: 'number' });
            this.view.getExternalLogin();
        },
        "onsort": function (ui) {

        },
        "optionsDom": {
            'getDom': '',
            'createOptions': function ($slcID) {
                let html = `<option class="size" data-wrap=".comp-loginform" value=".comp-loginform">Component</option>
                        <option class="size" data-wrap=".formMainWrap" value=".formMainWrap">Login Form</option>                       
                        <option class="size text"  data-wrap=".fmHFld" value=".heading">Heading</option >
                        <option class="size"  data-wrap=".fmFld" value = ".fmFld">Field</option >
                        <option class="size"  data-wrap=".btn-wrap" value=".btn-wrap">Button Field</option>
                        <option class="size text"  data-wrap=".fmLbl" value=".fmLbl label">Label</option>   
                        <option class="text" data-wrap=".fmInp" value=".cbvInpTxt">Input Box</option>                        
                        <option class="text" data-wrap=".btn-wrap" value=".btnLogin">Login button</option>
                        <option class="size"  data-wrap=".imgCaptcha" value=".imgCaptcha">Captcha Image</option>
                        <option class="size"  data-wrap=".captchaField" value=".captchaField">Captcha Field</option>
                        <option class="text" data-wrap=".btn-wrap" value=".btnRefreshCapcha">Refresh Captcha</option>
                        <option class="text size"  data-wrap=".errorMsg" value=".errorMsg">Error Message</option>
                        <option class="size text"  data-wrap=".fldPassForgot" value=".lnkPassForgot">Forgot Password</option>
                        <option class="size"  data-wrap=".fldOID" value=".fldOID">OpenID Field</option>
                        <option class="text size"  data-wrap=".fldOIDTxt" value=".fldOIDTxt">OpenID Label</option>
                        <option class="size btnOID"  data-wrap=".oIdBtn" value=".oIdBtn">OpenID Button</option>
                        <option class="size"  data-wrap=".FldAlreadyLogin" value=".FldAlreadyLogin">Already Login Field</option>
                        <option class="text"  data-wrap=".loginStatMsg" value=".loginStatMsg">Already Login Text</option>
                        <option class="size"  data-wrap=".alrdyLogBtn" value=".alrdyLogBtn">Logged in Button Field</option>
                        <option class="size text"  data-wrap=".alrdyLogBtn" value=".lnkCountinue">Contiue Button</option>
                        <option class="text"  data-wrap=".alrdyLogBtn" value=".logOutBtn">Logout Button</option>`
                $slcID.html(html);
                if ($slcID.attr('id') === 'slcBgAplyOn')
                    $slcID.find('.btnOID').remove();
                this.getDom = $slcID.html();
            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "custom": true,
                    "DOM": `<h4>Hide Show Field For Design</h4>
                        <span class="info">In view page these field are automatically hide/show by the system.</span>
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
                                    <input type="checkbox" data-name="${$thisEle.attr('data-name')}" data-targetele=".fldEnDn[data-name='${$thisEle.attr('data-name')}']" class="chkEnDnEle" id="toggleBtn${i}">
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
                            let name = $this.attr('data-name');
                            if ($this.prop('checked')) {
                                if (name === 'Login Form' || name === "Error Message") {
                                    $('.FldAlreadyLogin').addClass('Dn');
                                    $('input.chkEnDnEle[data-name="Already Login Status"]').prop('checked', false);
                                } else if (name === 'Already Login Status') {
                                    $('#divLoginMainForm').addClass('Dn');
                                    $('#divLoginErrorMsg').addClass('Dn');
                                    $('input.chkEnDnEle[data-name="Login Form"]').prop('checked', false);
                                    $('input.chkEnDnEle[data-name="Error Message"]').prop('checked', false);
                                }
                                $target.removeClass('Dn');
                            }
                            else {
                                $target.addClass('Dn');
                            }

                        });
                        $('input.chkEnDnEle').each(function () {
                            let $this = $(this);
                            $this.prop('checked', $($this.attr('data-targetele')).is(":visible"))
                        });
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
                        component['login form'].optionsDom.createOptions($('#slcSpcSettingAplyOn'));
                        let $parent = $activeDOM;
                        $('#slcSpcSettingAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target === '.comp-loginform') {
                                $parent.addClass('actEle');
                                target = $parent;
                            } else {
                                $parent.find(target).addClass('actEle');
                            }

                            InitSpacing(target);
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
                        $('#slcTxtSettingAplyOn').html(component['login form'].optionsDom.getDom);
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
                        $('#slcAignmentAplyOn').html(component['login form'].optionsDom.getDom);
                        $('#slcAignmentAplyOn option').not('.size').remove();

                        let $parent = $activeDOM;
                        $('#slcAignmentAplyOn').off('change').on('change', function () {
                            let target = $('#slcAignmentAplyOn option:selected').attr('data-wrap');
                            $('.actEle').removeClass('actEle');
                            if (target === '.comp-loginform') {
                                $parent.addClass('actEle');
                                target = $parent;
                            } else {
                                $parent.find(target).addClass('actEle');
                            }
                            initAlignment(target);
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
                        $('#slcSizeSettingAplyOn').html(component['login form'].optionsDom.getDom);
                        $('#slcSizeSettingAplyOn option').not('.size').remove();
                        let $parent = $activeDOM;
                        $('#slcSizeSettingAplyOn').off('change').on('change', function () {
                            let target = $('#slcSizeSettingAplyOn option:selected').attr('data-wrap');
                            $('.actEle').removeClass('actEle');
                            if (target === '.comp-loginform') {
                                $parent.addClass('actEle');
                                target = $parent;
                            } else {
                                $parent.find(target).addClass('actEle');
                            }
                            init(target);
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
                        component['login form'].optionsDom.createOptions($('#slcBgAplyOn'));

                        let $parent = $activeDOM;
                        $('#slcBgAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target === '.comp-loginform') {
                                $parent.addClass('actEle');
                                target = $parent;
                            } else {
                                $parent.find(target).addClass('actEle');
                            }
                            InitBackground(target);
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
                        $('#slcBdrAplyOn').html(component['login form'].optionsDom.getDom);
                        let $parent = $activeDOM;
                        $('#slcBdrAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target === '.comp-loginform') {
                                $parent.addClass('actEle');
                                target = $parent;
                            } else {
                                $parent.find(target).addClass('actEle');
                            }
                            Init(target);
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
                        $('#slcBxRdsAplyOn').html(component['login form'].optionsDom.getDom);
                        let $parent = $activeDOM;
                        $('#slcBxRdsAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target === '.comp-loginform') {
                                $parent.addClass('actEle');
                                target = $parent;
                            } else {
                                $parent.find(target).addClass('actEle');
                            }
                            Init(target);
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
                        $('#slcBxSdoAplyOn').html(component['login form'].optionsDom.getDom);
                        let $parent = $activeDOM;
                        $('#slcBxSdoAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target === '.comp-loginform') {
                                $parent.addClass('actEle');
                                target = $parent;
                            } else {
                                $parent.find(target).addClass('actEle');
                            }
                            Init(target);
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
                        $('#slcHoverEftAplyOn').html(component['login form'].optionsDom.getDom);
                        $('#slcHoverEftAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target === '.comp-loginform') {
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
        "complete": function () {
            this.responsiveDOMs = this.settingDOMs;
        },
        "removeEdit": function ($editDOM) {
            $editDOM.find('#LoginCaptcha').html('');
        },
        "remove": function ($viewDOM) {
            $viewDOM.find('#btnSignIn').attr('type', 'submit');
            $viewDOM.find('#btnLogOutFrmSystem').attr('type', 'submit');
            $viewDOM.find('#lnkForgotPassword').attr('href', '/forgotpassword');
            $viewDOM.find('#LoginCaptchaWrap').addClass('Dn');
            $('.FldAlreadyLogin ').addClass('Dn');
            $('.login-form').removeClass('Dn');
            $viewDOM.find('#LoginCaptcha').html('');

        },
        "view": {
            view: function () {
                var $form = $('#divLoginMainForm');
                if (SageFrameUserName === '') {
                    $form.removeClass('Dn tDn mDn');
                }
                else {
                    $form.addClass('Dn tDn mDn');
                    $('#divAlreadyLogin').removeClass('Dn mDn tDn');
                }
                var objUrl = GetSearchQuery();
                $('#divReqVerToken').html($('input:hidden[name="__RequestVerificationToken"]')[0].outerHTML);

                $('#hdnReturnURL').val(objUrl.returnurl);
                this.getExternalLogin();
                this.eventListener($form);
                this.validation($form);
                this.initCaptcha(objUrl);
            },
            getExternalLogin: function () {
                var conf = {
                    type: 'GET',
                    async: true,
                    url: '/account/GetExternalLogin',
                    success: function (data) {
                        var btnOID = $('#dvOpenIDField').find('.oIdBtn')[0].outerHTML;
                        var btnHTML = '';
                        if (data.length > 0) {
                            var rtnURL = $('#hdnReturnURL').val();
                            $('#dvOpenIDField').removeClass('Dn tDn mDn');
                            $.each(data, function (i, v) {
                                var $btnOID = $(btnOID);
                                $btnOID.attr('data-provider', v.LoginProvider);
                                $btnOID.find('img').attr('src', v.ProviderLogo);
                                if (!EditorMode) {
                                    var url = '/account/externallogin?provider=' + v.LoginProvider + '&returnurl='+rtnURL 
                                    $btnOID.attr('href', url);
                                }
                                btnHTML += $btnOID[0].outerHTML;
                            });
                            $('#divOpenIDBtnWrp').html(btnHTML);
                        }
                    }
                }
                SecureAjaxCall.Call(conf);
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
                var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return reg.test(email);
            },
            validateForm: function ($pr) {
                var self = this;
                $pr.find('.sfError').remove();
                var valid = true;
                $pr.find('.requiredFld:visible').each(function () {
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
            eventListener: function ($pr) {
                var self = this;
                $pr.find('#btnSignIn').off('click').on('click', function (e) {
                    if (!self.validateForm($pr)) {
                        e.preventDefault();
                    }
                });
                $('#hypLnkCountinue').off('click').on('click', function (e) {
                    window.history.back();
                });
               
            },
            initCaptcha: function (p) {
                if (p.captcha === 'true') {
                    try {
                        $('#LoginCaptchaWrap').removeClass('Dn');
                        $('#LoginCaptcha').contentdercaptcha({
                            type: p.type,
                            siteKey: SitePublicKey,
                            secretKey: 'ss'
                        });
                    } catch{
                        console.error('Captcha not working');
                    }
                }
            }
        }

    }
}
