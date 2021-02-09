var subscribe = {
    "subscribe": {
        "componentname": "subscribe",
        "category": "advance",
        "icon": "fa fa-envelope-square",
        "dependent": ["form"],
        "inheritform": function () {
            let myComp = this;
            let formComp = component['form'];
            let mySetting = myComp.settingDOMs.tabs;
            let styles = formComp.styleDOMs.tabs;
            myComp.styleDOMs['tabs'] = $.extend(styles, myComp.extend);
            myComp['responsiveDOMs'] = formComp.responsiveDOMs;
            mySetting['Spacing'] = formComp.settingDOMs.tabs.Spacing;
            mySetting['Text'] = formComp.settingDOMs.tabs.Text;
            mySetting['Alignment'] = formComp.settingDOMs.tabs.Alignment;
            mySetting['Size'] = formComp.settingDOMs.tabs.Size;
            mySetting['Help'] = myComp.Help;
        },
        "Help": {
            "DOM": EasyLibrary.ReadDOM('newsletter/help', false),
            "onload": function ($item) { }
        },


        "pageload": function () {
            this.library.subscribePopup();
        },
        "extend": {
            "Popup": {
                "custom": true,
                "DOM": '<div class="popupBGColor"></div><div id="selpopBG"></div>',
                "onload": function ($item) {
                    let id = 'li[data-tabs="' + $('.popupBGColor').parent().attr('id') + '"]';
                    let $parent = $activeDOM;
                    if ($parent.find('.subscribeForm-wrp').hasClass('enabled') || $parent.find('.formonly').hasClass('Dn')) {
                        $('#tabs').find(id).show();
                    } else {
                        $('#tabs').find(id).hide();
                    }
                    initBGClr();

                    function initBGClr() {
                        $("#selpopBG").AdvanceBackground({
                            targetParent: $parent,
                            targetElem: $parent.find('.popup-window'),
                            options: ["color"]
                        });
                    }
                }
            }
        },
        "collection": false,
        "defaultdata": EasyLibrary.ReadDOM("newsletter/viewDOM", false),
        "afterdrop": function ($appendedlayer, $appendlayer, dropped) {
            let _this = this;
            if (dropped) {
                if ($('div[data-type="subscribe"]').length > 1) {
                    $appendlayer.remove();
                    SageAlertDialog('Subscribe Component is already Dropped');
                } else {
                    _this.library.subscribePopup();
                }
                let data = _this.view.library.getInterest();
                if (!data) {
                    $appendlayer.find('.subscribeForm-wrp').removeClass('enabled');
                }
            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("newsletter/basic"),
                    "onload": function ($item) {
                        let $parent = $activeDOM;
                        let data = component['subscribe'].view.library.CheckInterest();
                        if (!data)
                            $parent.find('.subscribeForm-wrp').removeClass('enabled');
                        let $text = $parent.find('.subscribe-button.btnFmSave');
                        $('#basicStngField').find('.field-row').css('border', '0 none');
                        $('#basicStngField').find('.sortHandle').css('width', '100%');

                        $('.fmFldRequired').each(function () {
                            let data_target = $(this).attr('data-targetEle');
                            let data_class = $(this).attr('class');
                            if (typeof ($parent.find(data_target).find('input').attr('name')) !== "undefined") {
                                $(this).css('color', 'rgb(243, 11, 11');
                            }
                        });
                        let basicSetting = {
                            Init: function () {
                                basic();

                                function basic() {
                                    $activeDOM.find('.com-ele').each(function (item, val) {
                                        let $this = $(this);
                                        let dataName = $this.attr('data-name');
                                        let dataTitle = $this.attr('data-title');
                                        let datatargetEle = $(this).attr('data-targetEle');
                                        $('#basicStngField').find('.itemname').eq(item).text(dataTitle);
                                        $('#basicStngField').find('.fmFldRequired').eq(item).attr('data-targetEle', datatargetEle);
                                        $('#basicStngField').find('.toggleItem').eq(item).find('input').attr('id', 'btnShow' + dataName);
                                        $('#basicStngField').find('.toggleItem').eq(item).find('label').attr('for', 'btnShow' + dataName);
                                    });
                                    $('#btnShowemail').closest('.toggletter').remove();
                                    $('.fmFldRequired').each(function () {
                                        let data_target = $(this).attr('data-targetEle');
                                        let data_class = $(this).attr('class');
                                        if (typeof ($parent.find(data_target).find('input').attr('name')) !== "undefined") {
                                            $(this).css('color', 'rgb(243, 11, 11');
                                        } else {
                                            $(this).css('color', 'rgb(255, 0, 0)');
                                        }
                                    });
                                }
                                loadsetting();
                                changeEvent();

                                function loadsetting() {
                                    checkAttr('#btnShowfName', '.ns-fname');
                                    checkAttr('#btnShowlName', '.ns-lname');
                                    checkAttr('#btnShowgender', '.ns-gender-wrp');
                                    checknext('#enablePlacehoder', '.fmLbl');
                                    checknext('#enablePopupform', '.formonly');

                                    function checknext(ID, DClass) {
                                        if ($parent.find(DClass).hasClass('Dn')) {
                                            $(ID).prop('checked', true);
                                        } else {
                                            $('#enablePopupform').prop('checked', false);
                                        }
                                    }

                                    function checkAttr(ID, DOMClass) {
                                        if ($parent.find(DOMClass).hasClass('Dn')) {
                                            $(ID).prop('checked', false);
                                            $(ID).closest('.field-row').find('.fmFldRequired ').addClass('Dn');
                                        } else {
                                            $(ID).prop('checked', true);
                                            $(ID).closest('.field-row').find('.fmFldRequired ').removeClass('Dn');
                                        }
                                    }
                                    if ($parent.find('.subscribeForm-wrp').hasClass('enabled') && data) {
                                        $('#enablePopup').prop('checked', true);
                                        $('.interestlist').show();
                                    } else {
                                        $('#enablePopup').prop('checked', false);
                                        $('.interestlist').hide();
                                    }
                                    checkAsterik();

                                    function checkAsterik() {
                                        $('#basicStngField').find('.fmFldRequired ').each(function () {
                                            let $this = $(this);
                                            let target = $this.attr('data-targetele');
                                            if ($parent.find(target).find('input').attr('name') === "value")
                                                $this.css('color', 'rgb(175, 172, 172)');
                                            else
                                                $this.css('color', 'rgb(243, 11, 11)');
                                        });
                                    }
                                }

                                function changeEvent() {
                                    changeAttr('#btnShowfName', '.ns-fname', 'activefName');
                                    changeAttr('#btnShowlName', '.ns-lname', 'activelName');
                                    changeAttr('#btnShowgender', '.ns-gender-wrp', 'activeGender');

                                    function changeAttr(ID, DOMClass, activeClass) {
                                        $(ID).off().on('click', function () {
                                            let $this = $(this);
                                            if ($(this).is(':checked')) {
                                                $parent.find(DOMClass).removeClass('Dn').addClass(activeClass + " Dfx");
                                                $this.closest('.field-row').find('.fmFldRequired ').removeClass('Dn');
                                            } else {
                                                $parent.find(DOMClass).addClass('Dn').removeClass(activeClass + " Dfx");
                                                $this.closest('.field-row').find('.fmFldRequired ').addClass('Dn');
                                            }
                                        });
                                    }
                                    placeHolder();

                                    function placeHolder() {
                                        $('#enablePlacehoder').off().on('click', function () {
                                            if ($(this).is(':checked')) {
                                                $activeDOM.find('.fmLbl').addClass('Dn');
                                                $activeDOM.find('.fmLbl label').each(function () {
                                                    let text = $(this).text();
                                                    $(this).closest('.fmFld').find('input').attr('placeholder', text);
                                                });
                                            } else {
                                                $activeDOM.find('.fmLbl').removeClass('Dn');
                                                $parent.find('input').attr('placeholder', '');
                                            }
                                        });
                                    }
                                    if (typeof ($parent.find('.ns-gender-wrp').find('input')) !== "undefined") {
                                        $('#asterik-gender').css('position', 'right');
                                    }
                                    required();

                                    function required() {
                                        $('.fmFldRequired').off().on('click', function () {
                                            let $this = $(this);
                                            let target = $parent.find($this.attr('data-targetEle'));
                                            if ($(this).attr('data-targetEle') === ".ns-gender-wrp") {
                                                let attr = target.find('.fmInp').attr('name');
                                                let name = 'value';
                                                if (attr !== "value") {
                                                    target.find('.fmInp').attr('name', name);
                                                } else {
                                                    target.find('.fmInp').attr('name', target.find('.fmInp').attr('data-title'));
                                                }
                                            }
                                            target.find('input').each(function () {
                                                let attr = $(this).attr('name');
                                                let name = "value";
                                                if (attr !== "value") {
                                                    $(this).attr('name', name);
                                                    $this.css('color', 'rgb(175, 172, 172)');

                                                } else {
                                                    $(this).attr('name', $(this).attr('data-name'));
                                                    $this.css('color', 'rgb(255, 0, 0)');
                                                }
                                            });
                                        });
                                    }
                                    $('#enablePopupform').off('click').on('click', function () {
                                        if ($(this).is(':checked')) {
                                            $parent.find('.formonly').removeClass("Dfx").addClass('Dn');
                                        } else {
                                            $parent.find('.formonly').removeClass('Dn').addClass("Dfx");
                                        }
                                    });
                                    $('#enablePopup').off().on('click', function () {
                                        let $this = $(this);
                                        if ($this.is(':checked')) {
                                            if (!data) {
                                                $("#message").html('');
                                                $this.prop('checked', false);
                                                $parent.find('.subscribeForm-wrp').removeClass('enabled').removeClass('Dn');
                                                $this.closest('.field-row').after('<div id="message" class="field-row stElWrap col100" style="color: #f00;opacity: 1;margin: 0;padding: 0;border: 0 none;min-height: 0;"><label class="fCol">*** Interest Unavailable ***</label><div></div></div>');
                                                $("#message").fadeIn('slow').animate({
                                                    opacity: 1.0
                                                }, 1500).effect("pulsate", {
                                                    times: 1
                                                }, 800).fadeOut('slow');
                                            } else {
                                                $parent.find('.subscribeForm-wrp').addClass('enabled');
                                                loadsetting();
                                            }
                                        } else {
                                            $parent.find('.subscribeForm-wrp').removeClass('enabled');
                                        }
                                    });
                                }
                                SortItem();

                                function SortItem() {
                                    $("#basicStngField").AdvanceSorting({
                                        targetParent: $parent.find('.formWrap'),
                                        targetElem: '.com-ele',
                                        sortableOptions: {
                                            items: ".settingitem",
                                            handle: ".sortHandle",
                                            containment: '#basicStngField'
                                        }
                                    });
                                }
                                ButtonText();

                                function ButtonText() {
                                    var text = $text.text();
                                    $('#subscribeText').val(text);
                                    $('#subscribeText').off().on("change keyup paste click", function () {
                                        let $this = $(this);
                                        text = $this.val();
                                        $text.text(text);
                                        $this.val(text);
                                    });
                                    $('#subscribeText').on('blur', function () {
                                        if (text.trim() === "") {
                                            text = 'Enter Text';
                                            $text.text(text);
                                            $(this).val(text);
                                        }
                                    });
                                }
                            }
                        };
                        basicSetting.Init();
                    }
                },

            }
        },
        "styleDOMs": {},
        "view": {
            "view": function () {
                component['subscribe'].library.subscribePopup();

            },
            "library": {
                "viewEvents": function () { },
                "clearForm": function () {
                    $('input[type=text]').val('');
                    $('input[type=email]').val('');
                    $('#fName-error').remove();
                    $('#lName-error').remove();
                    $('#email-error').remove();
                    $("input[name='gender']:checked").prop('checked', false);
                },
                "getInterest": function () {
                    let responseData;
                    let config = {
                        url: SageFrameHostURL + "/NewsLetter/GetUserInterest",
                        data: { SiteID: parseInt(GetSiteID) },
                        success: function (data) {
                            responseData = data;
                        }
                    }
                    SecureAjaxCall.Call(config);
                    return responseData;
                },
                "CheckInterest": function () {
                    let responseData = false;
                    let config = {
                        url: SageFrameHostURL + "/NewsLetter/GetUserInterest",
                        data: { SiteID: parseInt(GetSiteID) },
                        success: function (data) {
                            if (data.length > 0) {
                                responseData = true;
                            } else {
                                responseData = false;
                            }
                        }
                    }
                    SecureAjaxCall.Call(config);
                    return responseData;
                },
                "addSubscriber": function (email, firstName, lastName, gender, interest, isAll) {
                    let _this = this;
                    if (typeof gender === "undefined" || gender === '') {
                        gender = 2;
                    }
                    let config = {
                        url: SageFrameHostURL + "/NewsLetter/AddSubscribeUser",
                        data: {
                            Email: email,
                            FName: firstName,
                            Lname: lastName,
                            Location: "",
                            Gender: gender,
                            InterestInAll: isAll,
                            Interest: interest
                        },
                        success: function (data) {
                            $('#nsSuccess').remove();
                            if (data.d === 1) {
                                $('.subscribe-button').after('<div class="Mt-10 Mb-10" id="nsSuccess" style="color: rgb(51, 204, 51);">Subscribed Sucessfully</div>');
                                $("#nsSuccess").fadeIn('slow').animate({
                                    opacity: 1.0
                                }, 1500).effect("pulsate", {
                                    times: 1
                                }, 800).fadeOut('slow');
                            } else {
                                $('.subscribe-button').after('<div class="Mt-10 Mb-10" id="nsSuccess" style="color: rgb(51, 204, 51);">Subscription Updated Sucessfully</div>');
                                $("#nsSuccess").fadeIn('slow').animate({
                                    opacity: 1.0
                                }, 1500).effect("pulsate", {
                                    times: 1
                                }, 800).fadeOut('slow');
                            }
                            _this.clearForm();
                        }
                    }
                    SecureAjaxCall.Call(config);
                }
            }
        },
        "library": {
            "popupDOM": EasyLibrary.ReadDOM("newsletter/popupView"),
            "interest": function ($parent) {
                let self = component["subscribe"];
                let data = self.view.library.getInterest();
                let windowColor = $parent.find('.popup-window').css('background-color');
                let buttonColor = $parent.find('.btn-popup').css('background-color');
                let buttonText = $parent.find('.subscribe-button').css('color');
                let len;
                let header = "Choose your interest";
                if (typeof data !== "undefined") {
                    len = data.length;
                } else {
                    $('.interestlist').addClass('Dn');
                }
                if ($parent.find('.formonly').hasClass('Dn')) {
                    header = 'Subscribe us';
                }
                let htmlDOM = '';
                let option = {
                    heading: header,
                    data: self.library.popupDOM,
                    showheading: true,
                    width: "50%",
                    advance: false,
                    onappend: function ($wrap) {
                        let submitButton = $parent.find('.btn-submit').get(0).outerHTML;
                        $wrap.find('.btn_subscribe').replaceWith(submitButton);
                        $wrap.find('.btn-submit').removeClass('Dn')
                            .find('button').text('Submit');
                        $('.fullpagepopupWrapper .fullpage-popup-header').css({
                            'background-color': windowColor,
                            'color': buttonText
                        });
                        if ($parent.find('.formonly').hasClass('Dn')) {
                            let formDOM = $parent.find('.formonly').html();
                            $wrap.find('.nsletter-popup').prepend(formDOM);
                        }

                        let IconClassReg = /fa-\w+(\-*\w*)*/g;
                        let $proFltWrp = $('.editor-component.subscribe');
                        let inactiveClr = webBuilderSettings.secondaryColor;//$proFltWrp.attr('data-inactclr');
                        let unchkdIconClass = $proFltWrp.attr('data-unchkdIconClass');

                        let html = '';
                        html += `<div class="selectAll sfCol_33 Dib Mb-15">
                             
                            <input class="checkAll Dn" type="checkbox" id="lg0">
                            <i class="fa chk-icn-all Mr-5 mFs-19 Fs-20 Lh-20 tFs-20 tLh-30 tMr-5 mMr-5 ${unchkdIconClass}" style="color: ${inactiveClr}"></i>
                               <label class ="chkLabelAll  ff-poppins txC tFs-14 tLh-15 mFs-12 mLh-15 cPointer f-weight-200 Lh-21 Fs-16"" style="color:#000" for="lg0">All</label>
                                </div>`;
                        if (len > 0) {

                            let appName = '';

                            for (let i = 0; i < len; i++) {

                                let interest = data[i];
                                let keywords = interest.KeyWordList;

                                if (interest.AppName !== appName) {

                                    if (appName !== '')
                                        htmlDOM += '</div>';
                                    htmlDOM += `<div class="app Mb-15" style="border:1px solid rgb(208, 208, 208)"> 
                                           <div class="sfCol_100 Pt-10 Pr-15 Pb-10 Pl-15 tPt-10 tPr-15 tPb-10 tPl-15 mPt-10 mPr-15 mPb-10 mPl-15" style="background-color: #e1e1e1;">
                                           <i class="fa fa-angle-right Fs-16 Lh-24 tFs-16 tLh-24 mFs-16 mLh-24" style="color: rgb(153, 153, 153); cursor: pointer;"></i>
                                           <span class="ff-poppins txC Lh-24 f-weight-400 Fs-14 Ml-5 tMl-5 mMl-5" style="color:#111;cursor: pointer;"> ${interest.AppName}</span>
                                           </div>`;
                                    appName = interest.AppName;
                                }
                                htmlDOM += `<div class="category" style="display:none">
                                               <div class="sfCol_100 Pt-10 Pr-15 Pb-10 Pl-30 tPt-10 tPr-15 tPb-10 tPl-30 mPt-10 mPr-15 mPb-10 mPl-30" style="background-color:rgb(244, 246, 246);border-top:1px solid rgb(208, 208, 208);">
                                               <i class="fa fa-angle-right Fs-16 Lh-24 tFs-16 tLh-24  mFs-16 mLh-24" style="color: rgb(153, 153, 153); cursor: pointer;"></i>
                                               <span class="ff-poppins txC Lh-24 f-weight-400 Fs-14 Ml-5 tMl-5 mMl-5" style="color:#111;cursor: pointer;"> ${interest.CategoryName} </span></div>`;

                                htmlDOM += '<div class="sfCol_100 category-content Pt-15 Pr-15 Pb-15 Pl-50 tPt-15 tPr-15 tPb-15 tPl-50 mPt-15 mPr-15 mPb-15 mPl-50" style="display:none;background-color:rgb(244, 246, 246);border-top:1px solid rgb(208, 208, 208);">';
                                for (k = 0; k < keywords.length; k++) {
                                    //debugger;
                                    htmlDOM += `<div class="sfCol_33 item Dib Mb-10 tMb-10 mMb-5">
                                            <input class ="checkInterest Dn" type="checkbox" data-value="${appName + '$' + interest.CategoryName + '$' + keywords[k]}" id="lg${appName + '$' + interest.CategoryName + '$' + keywords[k]}">
                                            <i class="fa chk-icn Mr-5 Fs-18 tFs-18 mFs-18 Lh-20 tFs-20 tLh-30 tMr-5 mMr-5 ${unchkdIconClass}" style="color: ${inactiveClr}"></i>

                                            <label class ="chkLabel ff-poppins txC tFs-14 tLh-20 mFs-14 mLh-20 cPointer f-weight-400 Lh-20 Fs-14" style="color:#000" for="lg${appName + '$' + interest.CategoryName + '$' + keywords[k]}">
                                            ${keywords[k]}
                                            </label>
                                            </div>`;
                                }

                                htmlDOM += `</div>`;
                                htmlDOM += `</div>`;
                            }
                            htmlDOM += '</div>';

                            if ($parent.find('.formMainWrap').hasClass('enabled')) {
                                $wrap.find('.btn-submit').before('<div class="interestlist Mt-25 Db"><div class="itemList">' + html + htmlDOM + '</div></div>');
                            }
                        }

                        if (SageFrameUserName !== 'anonymoususer') {
                            $wrap.find('.ns-email-wrp').find('.value').val(SageFrameUserName);
                            //$('.ns-email-wrp').find('.value').prop('text', SageFrameUserName);
                        }

                        $('.chkLabelAll,.chk-icn-all').off('click').on('click', function () {
                            //if ($(this).hasClass('chkLabel')) { e.preventDefault(); }
                            let $this = $(this).parent().find('.chk-icn-all');
                            let $checkInp = $(this).parent().find('.checkAll');
                            if (!$this.hasClass('checked')) {
                                self.library.ChangeIcon($this, true);
                                $checkInp.attr('checked', true);
                            } else {
                                self.library.ChangeIcon($this, false);
                                $checkInp.attr('checked', false);
                            }

                            if ($checkInp.is(':checked')) {
                                $('input.checkInterest').prop('checked', true);
                                //$('input[class=checkAll]').prop('checked', true);
                                $wrap.find('.interest-error').remove();
                                $wrap.find('.app').addClass('Dn');
                            } else {
                                $('input.checkInterest').prop('checked', false);
                                //$('input[class=checkInterest]').prop('checked', false);
                                //$('input[class=checkAll]').prop('checked', false);
                                $wrap.find('.app').removeClass('Dn');
                            }
                        });
                        $('.checkInterest').off('click').on('click', function (e) {
                            e.stopPropagation();
                            if ($('input.checkInterest:checked').length >= 1) {
                                $wrap.find('.interest-error').remove();
                                if ($('input.checkInterest:unchecked').length === 0) {
                                    $('input.checkAll').prop('checked', true);
                                }
                            } else {
                                $('input.checkAll').prop('checked', false);
                            }
                        });

                        $('.chkLabel,.chk-icn').off('click').on('click', function (e) {
                            if ($(this).hasClass('chkLabel')) { e.preventDefault(); }

                            e.stopPropagation();

                            let $checkInp = $(this).parent().find('.checkInterest');
                            let $this = $(this).parent().find('.chk-icn');
                            if (!$this.hasClass('checked')) {
                                self.library.ChangeIcon($this, true);
                                $checkInp.prop('checked', true);
                            } else {
                                self.library.ChangeIcon($this, false);
                                $checkInp.prop('checked', false);
                            }
                            // if (ViewDeviceAlpha() == '') { library.filterProduct(); }
                        });

                        $('.category').off('click').on('click', function (event) {

                            let $this = $(this);

                            //debugger;
                            event.stopPropagation();
                            if ($this.hasClass('active')) {
                                $this.removeClass('active');
                                $this.find('.category-content').slideUp(400);
                            }
                            else {
                                let siblings = $(this).siblings();
                                $(this).find('.category-content').slideDown(400);
                                siblings.find('.category-content').slideUp(400);
                                if (siblings.hasClass('active')) siblings.removeClass('active');
                                $this.addClass('active');
                            }


                            //event.stopPropagation();


                        });

                        $('.app').off('click').on('click', function () {

                            let $this = $(this);
                            if ($this.hasClass('active')) {
                                if ($this.find('.category').hasClass('active')) $this.find('.category').removeClass('active');
                                $this.find('.category').slideUp(400);
                                $this.find('.category-content').slideUp(400);
                                $this.removeClass('active');
                            }
                            else {
                                $(this).find('.category').slideDown(100);
                                $(this).find('.category').first().trigger('click');

                                let siblings = $(this).siblings();
                                if (siblings.hasClass('active')) siblings.removeClass('active');
                                siblings.find('.category').slideUp(400).prev();

                                if (siblings.find('.category').hasClass('active')) siblings.find('.category').removeClass('active');

                                siblings.find('.category-content').slideUp(400).prev();
                                $this.addClass('active');
                            }


                        });

                        $wrap.find('.category-content').off('click').on('click', function (e) {
                            e.stopPropagation();
                        });

                        $wrap.find('.app').first().trigger('click');


                        onSubmit();

                        function onSubmit() {
                            $wrap.find('.btnSubmitnsletter').off('click').on('click', function () {
                                let $validator = $('#subscribeform').validate({
                                    ignore: ":hidden",
                                    rules: {
                                        fName: {
                                            required: true
                                        },
                                        lName: {
                                            required: true
                                        },
                                        email: {
                                            required: true,
                                            email: true
                                        },
                                        gender: {
                                            required: true
                                        }
                                    },
                                    messages: {
                                        fName: {
                                            required: "First name is Required!!!"
                                        },
                                        lName: {
                                            required: "Last name is Required"
                                        },
                                        email: {
                                            required: "Email is Required!!!",
                                            email: "Please Enter valid email"
                                        },
                                        gender: {
                                            required: "Gender is Required!!!"
                                        }
                                    },
                                    errorPlacement: function (error, element) {
                                        if (element.is(":radio")) {
                                            error.appendTo(element.parents('.ns-gender-wrp'));
                                        } else {
                                            /* This is the default behavior */
                                            error.insertAfter(element);
                                        }
                                    }
                                });
                                let email = '';
                                let firstName = '';
                                let lastName = '';
                                let gender = '';
                                email = self.library.data($parent, $wrap, '.ns-email-wrp', '.activeEmail .inpWrp .value');
                                firstName = self.library.data($parent, $wrap, '.ns-fname', '.activefName .inpWrp .value ');
                                lastName = self.library.data($parent, $wrap, '.ns-lname', '.activelName  .inpWrp .value');
                                gender = self.library.data($parent, $wrap, '.ns-gender-wrp', 'input[data-name=gender]:checked');
                                let interestList = $('input.checkInterest:checked').map(function () {
                                    return $(this).attr('data-value');
                                }).get().join(',');
                                let interestAll = isInterestAll();

                                function isInterestAll() {
                                    if ($('input[class=checkAll]').prop("checked")) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                }
                                if (interestAll === 'true') {
                                    interestList = '';
                                }
                                if ($parent.find('.formonly').hasClass('Dn')) {
                                    if ($validator.form()) {
                                        add();
                                    }
                                } else {
                                    add();
                                }

                                function add() {
                                    if ($parent.find('.subscribeForm-wrp').hasClass('enabled')) {
                                        if ($('input.checkInterest:checked').length >= 1) {
                                            self.view.library.addSubscriber(email, firstName, lastName, gender, interestList, interestAll);
                                            CloseFullPagePopup();
                                        } else {
                                            $wrap.find('.interest-error').remove();
                                            $wrap.find('.interestlist').before('<label class="interest-error" style="color: rgb(243, 6, 6);"> Please Select Interest from Interest List</label>');
                                        }
                                    } else {
                                        self.view.library.addSubscriber(email, firstName, lastName, gender, '', true);
                                        CloseFullPagePopup();
                                    }
                                }
                            });
                        }
                        $wrap.find('#nsSuccess').remove();
                        /*call Mouse hover effect on full popup*/
                        ViewMouseOverEffect();
                    },
                    onclose: function ($wrap) { }
                };



                FullPagePopup(option);
            },
            "subscribePopup": function () {
                let self = component["subscribe"];
                if (EditorMode)
                    self.inheritform();
                self.view.library.clearForm();
                //debugger;
                $('.ns-email-wrp').find('.value').val(SageFrameUserName);
                let $validator = $('.subscribe').validate({
                    ignore: ":hidden",
                    rules: {
                        fName: {
                            required: true,
                        },
                        lName: {
                            required: true
                        },
                        email: {
                            required: true,
                            email: true
                        },
                        gender: {
                            required: true,
                        }
                    },
                    messages: {
                        fName: {
                            required: "First name is Required!!!"
                        },
                        lName: {
                            required: "Last name is Required"
                        },
                        email: {
                            required: "Email is Required!!!",
                            email: "Please Enter valid email"
                        },
                        gender: {
                            required: "Gender is Required!!!"
                        }
                    },
                });
                $validator = $('.subscribe').validate({
                    errorPlacement: function (error, element) {
                        if (element.is(":radio")) {
                            error.appendTo(element.parents('.ns-gender-wrp'));
                        } else {
                            /* This is the default behavior */
                            error.insertAfter(element);
                        }
                    }
                });
                if (EditorMode) {
                    $('.btn_subscribe').off().on('click', function () {
                        let $this = $(this).closest('.subscribe');
                        let _this = $this.find('.subscribeForm-wrp ');
                        if (_this.hasClass('enabled') || _this.find('.formonly').hasClass('Dn')) {
                            if (_this.find('.formonly').hasClass('Dn')) {
                                $validator.resetForm();
                                self.library.interest($this);
                            } else {
                                if ($validator.form()) {
                                    self.library.interest($this);
                                }
                            }
                        } else {
                            let email = self.library.data($this, $this, '.ns-email-wrp', '.activeEmail .inpWrp .value');
                            let firstName = self.library.data($this, $this, '.ns-fname', '.activefName .inpWrp .value ');
                            let lastName = self.library.data($this, $this, '.ns-lname', '.activelName .inpWrp .value');
                            let gender = '';
                            if (!$this.find('.formonly').hasClass('Dn') && !$this.find('.ns-gender-wrp').hasClass('Dn')) {
                                gender = $this.find("input[data-name='gender']:checked").val();
                            }
                            if ($validator.form()) {
                                self.view.library.addSubscriber(email, firstName, lastName, gender, '', true);
                            }
                        }
                    });
                }

                //if (SageFrameUserName !== 'anonymoususer') {
                // $('.ns-email-wrp').find('.value').val(SageFrameUserName);
                //}
            },
            "data": function ($parent, $wrap, checkClass, inputClass) {
                let value = '';
                if (!$parent.find('.formonly').hasClass('Dn') && !$parent.find(checkClass).hasClass('Dn')) {
                    value = $parent.find(inputClass).val();
                } else if ($parent.find('.formonly').hasClass('Dn') && !$parent.find(checkClass).hasClass('Dn')) {
                    value = $wrap.find(inputClass).val();
                } else {
                    value = '';
                }
                return value;
            },
            "ChangeIcon": function (target, checked) {
                let IconClassReg = /fa-\w+(\-*\w*)*/g;
                let $proFltWrp = $('.editor-component.subscribe');
                let activeClr = webBuilderSettings.secondaryColor;//$proFltWrp.attr('data-actclr');
                let inactiveClr = webBuilderSettings.secondaryColor;//$proFltWrp.attr('data-inactclr');
                let unchkdIconClass = $proFltWrp.attr('data-unchkdIconClass');
                let chkdIconClass = $proFltWrp.attr('data-chkdIconClass');
                if (checked) {
                    let $Icon = target.attr('class').match(IconClassReg);
                    if ($Icon != null) {
                        target.css('color', activeClr);
                        target.removeClass($Icon[0]).addClass(chkdIconClass)
                            .addClass('checked');
                    }
                } else {
                    let $Icon = target.attr('class').match(IconClassReg);
                    if ($Icon != null) {
                        target.css('color', inactiveClr);
                        target.removeClass($Icon[0]).addClass(unchkdIconClass)
                            .removeClass('checked');
                    }
                }
            }
        },
        "remove": function ($item) {
            $('[data-type="subscribe"]').find('#message').remove();
            $('label.sfError').remove();
        },
    }
};