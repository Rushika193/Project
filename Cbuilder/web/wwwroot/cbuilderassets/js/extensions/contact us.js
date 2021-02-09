var contact_us = {
    "contact us": {
        "componentname": "contact us",
        "category": "advance",
        "icon": "fa fa-envelope-o",
        "row": false,
        "hidden": true,
        "collection": false,
        "bucket": true,
        "type": "form",
        "defaultdata": EasyLibrary.ReadDOM("contactus"),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) {

        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if ($('.site-body').find('.editor-component.contactus').length > 1) {
                $appendLayer.remove();
                SageAlertDialog('You cannot add two contact us component in same page');
            }
            if (dropped)
                this.view.view();
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("contactusbasic"),
                    "onload": function ($item) {
                        let $parent = $item.closest('.SetHdlr').parent();
                        InitEvent();
                        function InitEvent() {
                            LoadSettings();
                            Events();
                        }
                        function LoadSettings() {
                            let contactuslink = SageFrameHostURL + '/dashboard/manage-contact-us';
                            $('#contactuslink').attr('href', contactuslink);
                            let layout = $parent.attr('data-layout');
                            $("#slcCULayout").val(layout);
                        }
                        function Events() {
                            $(".asterisk").on("click", function () {
                                let isChecked = false;
                                if ($(this).hasClass('required')) {
                                    $(this).css('color', 'white');
                                    $(this).removeClass('required');
                                    isChecked = false;
                                } else {
                                    $(this).css('color', 'red');
                                    $(this).addClass('required');
                                    isChecked = true;
                                }
                                let className = $(this).closest('.cuField').find('input[type="checkbox"]').attr('data-class');
                                if (isChecked) {
                                    $("." + className).find('.contacttextBox').addClass('required');
                                    $("." + className).find('.reqstar').html('*');
                                } else {
                                    $("." + className).find('.contacttextBox').removeClass('required');
                                    $("." + className).find('.reqstar').html('');
                                }
                            });
                            $("#slcCULayout").on("change", function () {
                                let layout = $(this).val();
                                $parent.removeClass('Msnry1Col-l Msnry1Col-r Msnry1Col-c Msnry2Col-l Msnry2Col-r Msnry2Col-c');
                                $parent.addClass(layout);
                                $parent.attr('data-layout', layout);
                            });
                        }
                    }
                },
                "Heading": {
                    "DOM": EasyLibrary.ReadDOM("contactusheadingtab"),
                    "onload": function ($item) {
                        let $parent = $activeDOM;
                        $("#headingtext").AdvanceTextSetting({
                            targetParent: $parent,
                            targetElem: '.cuHeading'
                        });
                        ManualEntryEvents();
                        function ManualEntryEvents() {
                            $(".cuChangeText").on("keyup", function () {
                                let value = $(this).val().trim();
                                //if (value == "") {
                                //    SageAlertDialog("Required Field", 'Please enter some text');
                                //} else {
                                let className = $(this).attr('data-class');
                                //alert(className);
                                //console.log($parent);
                                //$parent.find("." + className).text(value);
                                //$parent.text(value);
                                //}
                                $("." + className).text(value);
                            });
                            $(".cuCheckbox").on("change", function () {
                                let className = $(this).attr('data-class');
                                let isChecked = $(this).prop("checked");
                                if (isChecked) {
                                    if (className == 'cuHeading') {
                                        $('.contactHeadingSetting').show(400);
                                    }
                                    $("." + className).show(400);
                                } else {
                                    $("." + className).hide(400);
                                    if (className == 'cuHeading') {
                                        $('.contactHeadingSetting').hide(400);
                                    }
                                }
                            });

                            $(".cuChangeText").each(function (index, item) {
                                let className = $(this).attr('data-class');
                                let text = '';
                                text = $("." + className).html();
                                let isVisible = $("." + className).is(":visible");
                                let $fld = $(this).closest('.cuField');
                                if (isVisible) {
                                    $fld.find(".cuCheckbox").prop("checked", true);
                                    //$('.contactHeadingSetting').show(400);
                                } else {
                                    $fld.find(".cuCheckbox").prop("checked", false);
                                    //$('.contactHeadingSetting').hide();
                                }
                                let $ele = $("." + className).parent().find('.contacttextBox');
                                if ($ele.hasClass('required')) {
                                    $fld.find(".asterisk").addClass("required").css('color', 'red');
                                } else {
                                    $fld.find(".asterisk").removeClass("required").css('color', 'white');
                                }
                                $(this).val('');
                                $(this).val(text);
                            });
                            let isVisible = $(".cuHeading").is(":visible");
                            if (isVisible) {
                                $("#chkcuHeading").prop("checked", true);
                                //$('.contactHeadingSetting').show(400);
                            } else {
                                $("#chkcuHeading").prop("checked", false);
                                //$('.contactHeadingSetting').hide();
                            }
                        }
                    }
                },
                "Labels": {
                    "DOM": "<div id='contactlabelchange'></div>",
                    "onload": function ($item) {

                        $("#contactlabelchange").AdvanceTextSetting({
                            targetParent: $activeDOM,
                            targetElem: '.cuLabel'
                        });
                    }
                },
                "Text Box": {
                    "DOM": "<div id='contacttextboxchange'></div><div id='textboxbg'></div> <div id='accorBorderSet'></div>",
                    "onload": function ($item) {
                        let $parent = $activeDOM;
                        $("#contacttextboxchange").AdvanceTextSetting({
                            targetParent: $parent,
                            targetElem: '.contacttextBox '
                        });

                        $("#textboxbg").AdvanceBackground({
                            targetParent: $parent,
                            targetElem: '.contacttextBox',
                            options: ["color"]
                        });
                        $('#accorBorderSet').AdvanceBorder({
                            targetParent: $parent,
                            targetElem: '.contacttextBox',
                            options: {
                                "max": 20,
                                "min": 0,
                                "times": 1,
                                "position": ["all", "top", "right", "bottom", "left"],
                            }
                        });
                    }
                }
            },
            "selectLayer": function ($elem) {
                return $elem.closest('.SetHdlr').parent();
            },
        },
        "styleDOMs": {
            "tabs": {
                "Background": {
                    "options": ["color"],
                },
                "Spacing": {
                    "options": {
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
                    }
                },
            },
            "selectLayer": function ($elem) {
                return $elem.closest('.SetHdlr').parent();
            }
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "itemsperrow": {
                            "DOM": `
                                <div class="field-row stElWrap col50-50">
                                    <label class="fCol">Layout</label>
                                    <div class="fCol TxAl-r">
                                        <span class="select__box">
                                             ${SelectDOMCreate('slcCULayout', 'slcCULayout', [
                                                            ['Msnry1Col-l', '1 Col-Left'],
                                                            ['Msnry1Col-r', '1 Col-Right'],
                                                            ['Msnry1Col-c', '1 Col-Center'],
                                                            ['Msnry2Col-l', '2 Col-Left'],
                                                            ['Msnry2Col-r', '2 Col-Right'],
                                                            ['Msnry2Col-c', '2 Col-Center'],
                            ])}
                                        </span>
                                    </div>
                                </div>`,
                            "prepend": "true",
                            "onload": function () {
                                let classname = GetValueByClassName($activeDOM, 'Msnry([0-5])Col-[a-z]', '');
                                $("#slcCULayout").val(classname);
                                $("#slcCULayout").on("change", function () {
                                    let layout = $(this).val();
                                    ReplaceClassByPattern($activeDOM, 'Msnry([0-5])Col-[a-z]', layout);
                                    let classname = GetValueByClassName($activeDOM, 'Msnry([0-5])Col-[a-z]', '');
                                });
                            }
                        },
                        "Visibility": {}
                    }
                },

                "Spacing": {
                    "options": {
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
                            "position": ["all", "left", "right"]
                        }
                    }
                },
                "Misc": {
                    "DOM": `<div class="field-row stElWrap">
                        <label class ="fCol">Heading</label>
                        </div>
                        <div id='conHeadSet'></div>
                        <div class ="field-row stElWrap">
                        <label class ="fCol">Label</label>
                        </div>
                        <div id='conLblSet'></div>
                        <div class ="field-row stElWrap">
                        <label class ="fCol">Text Box</label>
                        </div>
                        <div id='conFldSet'></div>`,
                    "onload": function () {
                        $('#conHeadSet').AdvanceTextSetting({
                            targetParent: $activeDOM,
                            targetElem: '.cuHeading',
                            options: {
                                size: true,
                                lineheight: true,
                                width: false,
                                spacing: false,
                                transform: false,
                                family: false,
                                weight: false,
                                color: false
                            }
                        });
                        $('#conLblSet').AdvanceTextSetting({
                            targetParent: $activeDOM,
                            targetElem: '.cuLabel',
                            options: {
                                size: true,
                                lineheight: true,
                                width: false,
                                spacing: false,
                                transform: false,
                                family: false,
                                weight: false,
                                color: false
                            }
                        });
                        $('#conFldSet').AdvanceTextSetting({
                            targetParent: $activeDOM,
                            targetElem: '.contacttextBox',
                            options: {
                                size: true,
                                lineheight: true,
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
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "onsave": function () {

        },
        "remove": function ($view) {
            $view.find('.contacttextBox').val('');
        },
        "view": {
            "view": function () {
                $(function () {
                    function DrawCaptcha() {
                        let a = Math.ceil(Math.random() * 10) + '';
                        let b = Math.ceil(Math.random() * 10) + '';
                        let firstCode = a;
                        let secondCode = b;
                        $("#spnFirstCaptcha").html(firstCode);
                        $("#spnSecondCaptcha").html(secondCode);
                    }

                    // Validate the Entered input aganist the generated security code function
                    function ValidCaptcha() {
                        let firstCode = parseInt(removeSpaces($('#spnFirstCaptcha').html()));
                        let secondCode = parseInt(removeSpaces($('#spnSecondCaptcha').html()));
                        let str2 = removeSpaces($('#txtCapchaInput').val());
                        if ((firstCode + secondCode) == str2) return true;
                        return false;
                    }
                    // Remove the spaces from the entered and generated code
                    function removeSpaces(string) {
                        return string.split(' ').join('');
                    }
                    var $validatorcu = $("#form1").validate({
                        rules: {
                            firstName: {
                                maxlength: 50
                            },
                            lastName: {
                                maxlength: 50
                            },
                            email: {
                                email: true,
                                maxlength: 50
                            },
                            address: {
                                maxlength: 50
                            },
                            telephone: {
                                maxlength: 50
                            },
                            subject: {
                                maxlength: 50
                            },
                            message: {
                                maxlength: 1000
                            },
                            website: {
                                maxlength: 50
                            }
                        },
                        messages: {
                            firstName: {
                                required: "* Required Field"
                            },
                            lastName: {
                                required: "* Required Field"
                            },
                            message: {
                                required: "* Required Field"
                            },
                            email: {
                                required: "* Required Field",
                                email: "Please enter valid email"
                            },
                        },
                        ignore: ':hidden, :disabled'
                    });
                    $validatorcu = $(".contactus").validate({});
                    $(".btncuSave").off("click").on("click", function () {
                        if ($('.site-body').find('.editor-component.contactus > .SetHdlr').length == 0) {
                            if ($validatorcu.form()) {
                                if (ValidCaptcha()) {
                                    let $parent = $(this).parents(".cuWrapper");
                                    let firstName = $parent.find(".firstName").val();
                                    let lastName = $parent.find(".lastName").val();
                                    let email = $parent.find(".email").val();
                                    let message = $parent.find(".message").val();
                                    let telephone = $parent.find(".telephone").val();
                                    let subject = $parent.find(".subject").val();
                                    let address = $parent.find(".address").val();
                                    let website = $parent.find(".website").val();
                                    let objBuilComponent = {
                                        portalID: parseInt(SageFramePortalID),
                                        userName: SageFrameUserName,
                                        secureToken: SageFrameSecureToken
                                    };
                                    let objContactUs = {
                                        FirstName: firstName,
                                        LastName: lastName,
                                        Email: email,
                                        Message: message,
                                        Telephone: telephone,
                                        Subject: subject,
                                        Address: address,
                                        Website: website
                                    };
                                    $.ajax({
                                        isPostBack: false,
                                        async: false,
                                        cache: false,
                                        type: 'POST',
                                        contentType: "application/json; charset=utf-8",
                                        data: JSON2.stringify({
                                            objBuilComponent: objBuilComponent,
                                            objContactUs: objContactUs
                                        }),
                                        dataType: 'json',
                                        crossDomain: true,
                                        url: SageFrameHostURL + '/Builder/SaveContactUsData',
                                        success: function (data) {
                                            $('.conMessage').text("").removeClass("eb-block-error");//.addClass("eb-block-success");
                                            SageAlertDialog("Information Save Successfully", 'Success');
                                            ClearForm();
                                        },
                                        error: function () {
                                            $('.conMessage').text("Error Occured").removeClass("eb-block-success").addClass("eb-block-error");
                                        },
                                    });
                                } else {
                                    SageAlertDialog("Wrong Captcha", 'Alert');
                                    DrawCaptcha();
                                    $("#txtCapchaInput").val();
                                }
                            }
                        }
                    });
                    $(".btncuReset").off().on("click", function () {
                        ClearForm();
                    });

                    function ClearForm() {
                        let $parent = $(".contactFromWrap");
                        $parent.find(".firstName").val('');
                        $parent.find(".lastName").val('');
                        $parent.find(".email").val('');
                        $parent.find(".message").val('');
                        $parent.find(".telephone").val('');
                        $parent.find(".subject").val('');
                        $parent.find(".address").val('');
                        $parent.find(".website").val('');
                        $validatorcu.resetForm();
                        $("#txtCapchaInput").val('');
                        DrawCaptcha();
                    }
                    DrawCaptcha();
                });
            },
            "library": {

            }
        }
    }
};