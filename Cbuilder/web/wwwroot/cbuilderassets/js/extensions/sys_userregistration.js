var Compform = {

    "user registration": {
        "componentname": "user registration",
        "category": "basic",
        "icon": "fa fa-user-plus",
        "row": false,
        "hidden": false,
        "collection": false,
        "allowedpages": ['login', 'register'],
        "applicationName": "webbuilder",
        "defaultdata": EasyLibrary.ReadDOM("systempages/registerview"),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) { },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (dropped && $('.comp-registration').length > 1) {
                $appendLayer.remove();
                SageAlertDialog("Only one registration form component is allowed");
            } else if (typeof this.responsiveDOMs.tabs.Spacing === 'undefined') {
                this.responsiveDOMs.tabs.Spacing = this.settingDOMs.tabs.Spacing;
                this.responsiveDOMs.tabs.Text = this.settingDOMs.tabs.Text;
                this.responsiveDOMs.tabs.Alignment = this.settingDOMs.tabs.Alignment;
                this.responsiveDOMs.tabs.Size = this.settingDOMs.tabs.Size;
            }
            this.view.initCaptcha($('.comp-registration'));
        },
        "onsort": function (ui) { },

        "optionsDom": {
            'getDom': '',
            'createOptions': function ($slcID) {
                let html = `<option class="size" data-wrap=".comp-registration" value=".comp-registration">Component</option>
                        <option class="size text"  data-wrap=".fmHFld" value=".fmHFld  .heading">Form Heading</option>'
                        <option class="size"  data-wrap=".formWrp" value = ".formWrp">Form</option>
                        <option class="size"  data-wrap=".fmFld" value = ".fmFld">Fields</option>
                        <option class="size"  data-wrap=".btn-wrap" value=".btn-wrap">Button Field</option>
                        <option class="size text"  data-wrap=".fmLbl" value=".fmLbl label">Label</option>                         
                        <option class="text"  data-wrap="" value=".chkLabel">Checkbox</option>                         
                        <option class="text"  data-wrap="" value=".rdoLabel">Radio Button</option>                         
                        <option class="text" data-wrap=".fmInp" value=".cbvInpTxt">Input Box</option>
                        <option class="text" data-wrap=".fmInp" value=".cbvInpSlc">Select Box</option>
                        <option class="text" data-wrap=".fmInp" value=".cbvTxtArea">Text Area Box</option>
                        <option class="size" data-wrap=".fmInp" value=".fmInp">Input Section</option>
                        <option class="size"  data-wrap=".capImgFld" value=".capImgFld">Captcha Field</option>
                        <option class="text size" data-wrap=".CaptchaInp" value="#txtRegCaptchaValue">Captcha Input</option>     
                        <option class="size" data-wrap=".fldGetNewsLetter" value=".fldGetNewsLetter">Get Newsletter</option>
                        <option class="text" data-wrap=".btn-wrap" value=".btnSave ">Create button</option>`

                $slcID.html(html);

                this.getDom = $slcID.html();
            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": '<span class="info">In email verification,the user can login when he/she activate his account via verification email which is sent from the system.</span><div class="field-row" id="divEnDnField"></div>',
                    "settingKeys": [{ target: 'RegistrationEmailVerification', name: 'Email Verification', noUI: true }, { target: 'RegistrationCaptcha', name: '', noUI: false }],
                    "onload": function ($item) {
                        var _This = (this);
                        function GetSettingsEnDnDOM() {
                            var html = '';
                            _This.settingKeys.forEach(function (v, i) {
                                if (v.noUI)
                                    html += `<div class="field-row stElWrap col50-50">
                                         <label class="fCol">${v.name}</label>
                                             <div class="fCol TxAl-r">
                                                <span class="toggle_btn">
                                                    <input type="checkbox" data-db="true" data-name="${v.name}" data-key="${v.target}" class="chkEnDnEle" id="toggleMsgBtn${i}">
                                                    <label for="toggleMsgBtn${i}" class="tgl_slider"></label>
                                                 </span>
                                             </div>
                                         </div>`;
                            });
                            return html;
                        };
                        function EnableDisable() {
                            let html = '<h4>Form Fields</h4><div class="field-row" id="divEnDnFmFld">';
                            $activeDOM.find('.fldRegSrt').each(function (i, v) {
                                let $thisEle = $(this);
                                var name = $thisEle.attr('data-name');
                                html += `<div class="field-row stElWrap stSort">
                            <span class="sfCol_10 cPointer Mb-10 TxAl-c"><i class="fa fa-arrows-v regFormSort"></i></span>
                            <label class="sfCol_50">${name}</label><div class="sfCol_40 TxAl-r Dfx">`
                                if ($thisEle.hasClass('fldRegEnDn')) {
                                    html += `<div class="sfCol_80">
                                    <span class="toggle_btn">
                                        <input type="checkbox" data-name='${name}' data-key='Registration${name}' data-db='${$thisEle.attr('data-db')}' data-targetele=".fmFld[data-name='${name}']" class="chkEnDnEle" id="toggleBtn${i}">
                                        <label for="toggleButtonLabel" class="tgl_slider"></label>
                                     </span>
                                    </div>`
                                }
                                if ($thisEle.hasClass('req')) {
                                    html += `<span class="sfCol_20 Mr-5 TxAl-r"><span data-targetele=".fmFld[data-name='${$thisEle.attr('data-name')}']" class="cPointer fmFldRequired asterisk ${$thisEle.attr('data-required')}" style="color:rgb(175, 172, 172)" title="Turn On Required/ Off Required"><i class="fa fa-asterisk"></i></span></span>`;
                                } else {
                                    html += '<span class="sfCol_20 Mr-5 TxAl-r"></span>';
                                }
                                html += '</div></div>'
                            });
                            html += '</div>';
                            html = GetSettingsEnDnDOM() + html;
                            $('#divEnDnField').html(html);
                            $('input.chkEnDnEle').off('change').on('change', function () {
                                let $this = $(this);
                                let target = $this.attr('data-targetele');
                                if ($this.prop('checked')) {
                                    $activeDOM.find(target).removeClass('Dn');
                                }
                                else {
                                    $activeDOM.find(target).addClass('Dn');
                                }
                                if ($this.attr('data-db') === 'true') {
                                    var stng = JSON.parse($activeDOM.attr('data-setting'));
                                    stng[$this.attr('data-key')] = $this.prop('checked').toString();
                                    $activeDOM.attr('data-setting', JSON.stringify(stng))
                                }
                            });
                            $('input.chkEnDnEle').each(function () {
                                let $this = $(this);
                                $this.prop('checked', $($this.attr('data-targetele')).is(":visible"))
                            });
                            $('.fmFldRequired.required').css('color', 'rgb(255, 0, 0)');
                            $('.fmFldRequired').off('click').on('click', function () {
                                let $this = $(this);
                                let $target = $activeDOM.find($this.attr('data-targetele'));
                                let $input = $target.find('input,select,textarea');
                                if ($this.hasClass('required')) {
                                    $input.removeClass("reg_required");
                                    $target.find('.fmLbl span').remove();
                                    $this.css('color', 'rgb(175, 172, 172)');
                                    $this.removeClass('required');
                                } else {
                                    $input.addClass("reg_required");
                                    $this.addClass('required');
                                    $target.find('.fmLbl label').append('<span>*<span>');

                                    $this.css('color', 'rgb(255, 0, 0)');
                                }
                            });
                        }
                        function SortField() {
                            $("#divEnDnFmFld").AdvanceSorting({
                                targetParent: $activeDOM.find('.regFldWrap'),
                                targetElem: '.fldRegSrt',
                                sortableOptions: {
                                    items: ".stSort",
                                    handle: ".regFormSort",
                                    containment: '#divEnDnFmFld'
                                }
                            });
                        }
                        EnableDisable();
                        SortField();
                        _This.getSettings();
                    },
                    "getSettings": function () {
                        var keys = this.settingKeys.map(a => a.target).join(',')
                        var config = {
                            type: 'POST',
                            data: { 'keys': keys },
                            url: SageFrameHostURL + '/dashboard/adminsetting/GetSettingByKeys',
                            success: function (data) {
                                if (data !== null) {
                                    $.each(data, function (i, v) {

                                        $('input.chkEnDnEle[data-key="' + v.Key + '"]').prop('checked', v.Value === 'true');
                                    });
                                }
                            },
                        };
                        SecureAjaxCall.Call(config);
                    },

                    "active": function () {
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
                        component['user registration'].optionsDom.createOptions($('#slcSpcSettingAplyOn'));

                        $('#slcSpcSettingAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target === '.comp-registration') {
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
                        $('#slcTxtSettingAplyOn').html(component['user registration'].optionsDom.getDom);
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
                        $('#slcAignmentAplyOn').html(component['user registration'].optionsDom.getDom);
                        $('#slcAignmentAplyOn option').not('.size').remove();


                        $('#slcAignmentAplyOn').off('change').on('change', function () {
                            let target = $('#slcAignmentAplyOn option:selected').attr('data-wrap');
                            $('.actEle').removeClass('actEle');
                            if (target === '.comp-registration') {
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
                        $('#slcSizeSettingAplyOn').html(component['user registration'].optionsDom.getDom);
                        $('#slcSizeSettingAplyOn option').not('.size').remove();

                        $('#slcSizeSettingAplyOn').off('change').on('change', function () {
                            let target = $('#slcSizeSettingAplyOn option:selected').attr('data-wrap');
                            $('.actEle').removeClass('actEle');
                            if (target === '.comp-registration') {
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
                        component['user registration'].optionsDom.createOptions($('#slcBgAplyOn'));


                        $('#slcBgAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target === '.comp-registration') {
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
                        $('#slcBdrAplyOn').html(component['user registration'].optionsDom.getDom);

                        $('#slcBdrAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target === '.comp-registration') {
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
                        $('#slcBxRdsAplyOn').html(component['user registration'].optionsDom.getDom);

                        $('#slcBxRdsAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target === '.comp-registration') {
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
                        $('#slcBxSdoAplyOn').html(component['user registration'].optionsDom.getDom);

                        $('#slcBxSdoAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target === '.comp-registration') {
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
                        $('#slcHoverEftAplyOn').html(component['user registration'].optionsDom.getDom);
                        $('#slcHoverEftAplyOn').off('change').on('change', function () {
                            let target = $(this).val();
                            $('.actEle').removeClass('actEle');
                            if (target === '.comp-registration') {
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
        "responsiveDOMs": {
            "tabs": {}
        },
        "saveSettings": function ($pr) {
            var settings = new Array();
            var stng = JSON.parse($pr.attr('data-setting'))
            Object.keys(stng).forEach(function (v, i) {
                if (v!=='CaptchaType')
                settings.push({
                    'Key': v,
                    'Value': stng[v],
                    "Type": '0'
                });
            });
            var config = {
                type: 'POST',
                data: JSON.stringify(settings),
                url: SageFrameHostURL + '/dashboard/adminsetting/AddUpdate',
                success: function (data) {
                    console.log('registration setting saved');
                },
            };
            SecureAjaxCall.PassObject(config);
        },
        "removeEdit": function ($editDOM) {
            $editDOM.find('#RegisterCaptcha').html('');
        },
        "remove": function ($viewDom) {
            this.saveSettings($viewDom.find('#divUserRegComponent'));
            $viewDom.find('#btnRegCreateUser').attr('type', 'submit');
            $viewDom.find('#RegisterCaptcha').html('');
        },
        "view": {
            view: function () {
                $('#divReqVerToken').html($('input:hidden[name="__RequestVerificationToken"]')[0].outerHTML);
                var $pr = $('.comp-registration');
                this.initCaptcha($pr);
                this.eventListener($pr);
            },
            validator: {

                init: function ($pr) {
                    var _ThisLib = this;
                    $pr.find('.reg_required').off().on('keyup', function () {
                        var $this = $(this);
                        $this.next('.sfError').remove();
                        if ($this.val() === '') {
                            $this.after('<span class="sfError">Required Field</span>');
                        } else {
                            if ($this.attr('id') === "txtRegUserEmail") {
                                if (!_ThisLib.validemail($this.val())) {
                                    $this.after('<span class="sfError">Invalid Email</span>');
                                }
                            }
                        }
                    });
                },
                validemail: function (email) {
                    var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return reg.test(email)
                },
                form: function ($pr) {
                    var _ThisLib = this;
                    var valid = true;
                    $pr.find('.sfError').remove();
                    $pr.find('.reg_required:visible').each(function () {
                        var $this = $(this);
                        if ($this.val() === '') {
                            valid = false;
                            $this.after('<span class="sfError">Required Field</span>');
                        } else if ($this.attr('id') === "txtRegConfirmpassword" && $this.val() !== $('#txtRegUserPassword').val()) {
                            valid = false;
                            $this.after('<span class="sfError">Password Mismatch</span>');
                        }
                        else if ($this.attr('id') === "txtRegUserEmail" && !_ThisLib.validemail($this.val())) {
                            valid = false;
                            $this.after('<span class="sfError">Invalid Email</span>');
                        }
                    });
                    return valid;
                },
            },

            eventListener: function ($pr) {
                let _this = this;
                _this.validator.init($pr);
                $('#btnRegCreateUser').off('click').on('click', function (e) {
                    if (!_this.validator.form($pr)) {
                        e.preventDefault();
                    }
                });

            },

            initCaptcha: function ($pr) {
                var stng = JSON.parse($pr.attr('data-setting'));
                if (EditorMode || stng.RegistrationCaptcha === "true") {
                    $('#RegisterCaptcha').contentdercaptcha({
                        type: stng.CaptchaType,
                        siteKey: SitePublicKey,
                        secretKey: 'ss'
                    });
                }
            }

        }
    }
}

