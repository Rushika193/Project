var button = {
    "button": {
        "componentname": "button",
        "category": "basic",
        "icon": "icon icon-buton",
        "row": false,
        "hidden": false,
        "collection": true,
        "type": "element",
        "DOM": {
            buttonstyle: EasyLibrary.ReadDOM('starter/button/buttonStyles')
        },
        "defaultdata": EasyLibrary.ReadDOM("starter/button/defaultbutton"),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) {
            let _this = this;
            let allButtonStyles = BtnCollection();

            function BtnCollection() {
                let btncoll = _this.DOM.buttonstyle;
                let $btn = $(btncoll);
                let html = '';
                $btn.find('> .editor-component.button').each(function ($index, $val) {
                    html += liWrap($($val).wrap('<p/>').parent().html());
                });

                function liWrap(elem) {
                    let li = '<li class="selectData  Mt-10 Mr-10 Mb-10 Ml-10" style="" data-title="Simple button style" data-style="5">'
                    li += elem;
                    li += "</li>";
                    return li;
                }
                if (html.length > 0) {
                    html = `<ul class="selectDataWrapper Dfx flxWrp TxAl-c " style="height:100%">
                                    <li class ="title sfCol_100 Dn">Simple button style</li>
                                    ${html}
                                </ul>
                            `;
                }
                return html;
            }
            FullPagePopup({
                data: allButtonStyles,
                heading: "Button Styles",
                showheading: true,
                width: '70%'
            });

            $('.selectData').off().on('click', function () {
                component['button'].common.copyAttributes($appendLayer, $(this));
                CloseFullPagePopup();
            });

            return 'no data to show';
        },
        "afterdrop ": function ($appendedParent, $appendLayer, dropped) {
            $appendLayer.find('.com-style').removeClass('com-style').addClass('com-temp');
            if (dropped) {
                SetDefaultFont(
                    options = {
                        targetParent: $appendedParent,
                        targetElem: $appendLayer
                    });
            }
            anylinkstop();
        },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("starter/button/defaultbuttonbasic", false),
                    "onload": function ($item) {
                        var $parent = $activeDOM;
                        $("#txtbasictab").AdvanceTextSetting({
                            targetParent: $activeDOM.parent(),
                            targetElem: $activeDOM,
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
                        var $Icon = $parent.find('a > i');
                        var $text = $parent.find('a > span');
                        var $anchor = $parent.find('a');
                        let enableButtonText = "#enableButtonText";
                        let enableButtonIcon = "#enableButtonIcon";
                        InitEvents();
                        checkIconBeforeText();

                        function InitEvents() {
                            //FontSize();
                            WrapperSize();
                            WrapperHeight();
                            FontIconColor();
                            // TextTranformCheck();

                            EnableText();
                            EnableIcon();
                            FontIcon();
                            //LineHeight();
                        }
                        //function FontSize() {
                        //    component["button"].common.fontsize();
                        //}
                        function WrapperSize() {
                            component["button"].common.width();
                        }
                        //function LineHeight() {
                        //    component["button"].common.lineheight();
                        //}
                        function WrapperHeight() {
                            var buttonHeight = $parent.css('height').replace('px', '');

                            function ButtonHeightChange(space) {
                                $parent.css('height', space + 'px');
                            }
                            AdvanceSageSlider($('#buttonWrapperHeightSlider'), $('#buttonWrapperHeightHandle'), 5, 500, buttonHeight, ButtonHeightChange, $parent, 'px');
                        }

                        function FontIconColor() {
                            $('#buttonColor').css('background-color', $anchor.css('color'));
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $Icon.css({
                                        'color': objColor.bgColor
                                    });
                                    $text.css({
                                        'color': objColor.bgColor
                                    });
                                    $anchor.css({
                                        'color': objColor.bgColor
                                    });
                                }
                            });
                            $('#buttonColor').colorPicker(colorPickerOption);
                        }

                        //function TextTranformCheck() {
                        //    var trasformValue = '';
                        //    if ($parent.hasClass('txU')) {
                        //        trasformValue = 'txU';
                        //    } else if ($parent.hasClass('txL')) {
                        //        trasformValue = 'txL';
                        //    }
                        //    $('#buttonTextTransform').val(trasformValue);
                        //    $('#buttonTextTransform').on('change', function () {
                        //        var tranformCase = $(this).val();
                        //        switch (tranformCase) {
                        //            case 'txU':
                        //                $parent.removeClass('txL').removeClass('txC').addClass('txU');
                        //                break;
                        //            case 'txL':
                        //                $parent.removeClass('txU').removeClass('txC').addClass('txL');
                        //                break;
                        //            case 'txC':
                        //                $parent.removeClass('txU').removeClass('txL').addClass('txC');
                        //                break;
                        //            case '':
                        //                $parent.removeClass('txU').removeClass('txL').removeClass('txU');
                        //                break;
                        //        }
                        //    });
                        //}

                        function ChnageMenulinkType() {
                            if ($('#chkOnePageMenu').is(':checked')) {
                                $anchor.attr('data-link', linklist.onepage);
                                $anchor.removeClass('anchorpage');
                            } else {
                                $anchor.attr('data-link', linklist.internal);
                                $anchor.addClass('anchorpage');
                            }
                        }

                        function EnableText() {
                            if ($text.length > 0) {
                                var text = $text.text().trim();
                                $(enableButtonText).prop('checked', true);
                                $('#buttonText').val(text);
                                $('#divEnableText').show();
                            } else {
                                $(enableButtonText).prop('checked', false);
                            }
                            $(enableButtonText).on('click', function () {
                                if ($(this).is(':checked')) {
                                    $('#buttonText').val('').focus();
                                    $('#divEnableText').slideDown(400);
                                    if ($parent.find('a > span').length == 0) {
                                        if ($('#linkBeforeText').is(':checked')) {
                                            $parent.find('a').append('<span class="com-button-text c" contenteditable="true">default text</span>');
                                        } else {
                                            $parent.find('a').prepend('<span class="com-button-text onhovercolor" contenteditable="true">default text</span>');
                                        }
                                        $('#buttonText').val('default text');
                                        $text = $parent.find('a > span');
                                    }
                                    checkIconBeforeText();
                                } else {
                                    $('#divEnableText').slideUp(400);
                                    $parent.find('a > span').remove();
                                    IsChecked(enableButtonIcon);
                                }
                            });
                            $('#buttonText').on('keyup', function () {
                                var $this = $(this);
                                var val = $this.val().trim();
                                var text = 'default text';
                                if (val.length > 0) {
                                    text = val;
                                }
                                $text.text(text);
                            });
                        }

                        function IsChecked(elementID) {
                            if (!$(elementID).is(":checked")) {
                                $(elementID).trigger("click");
                            }
                            checkIconBeforeText();
                        }

                        function EnableIcon() {
                            if ($Icon.length > 0) {
                                var iconClass = $Icon.attr('class').replace('fa ', '').replace('onhovercolor', '');
                                $(enableButtonIcon).prop('checked', true);
                                $('#buttonIcon').show();
                            } else {
                                $(enableButtonIcon).prop('checked', false);
                            }
                            $(enableButtonIcon).on('click', function () {
                                if ($(this).is(':checked')) {
                                    $('#buttonIcon').slideDown(400);
                                    var iconClass = 'fa-arrow-right';
                                    if ($('#buttonfontIconCollection').find('li.selected').length > 0) {
                                        iconClass = $('#buttonfontIconCollection').find('li.selected').find('i').attr('data-class');
                                    } else {
                                        $('#buttonfontIconCollection').find('li').parent().addClass('selected');
                                        $('#buttonfontIconCollection').find('li i[data-class="fa-arrow-right"]').parent().addClass('selected');
                                    }
                                    if ($parent.find('a > i').length == 0) {
                                        if ($('#linkBeforeText').is(':checked')) {
                                            $parent.find('a').prepend('<i class="fa ' + iconClass + ' onhovercolor"></i>');
                                        } else {
                                            $parent.find('a').append('<i class="fa ' + iconClass + ' onhovercolor"></i>');
                                        }
                                        $Icon = $parent.find('a > i');
                                    }
                                    checkIconBeforeText();

                                } else {
                                    $('#buttonIcon').slideUp(400);
                                    $('#linkBeforeText').prop('checked', false);
                                    $parent.find('a > i').remove();
                                    IsChecked(enableButtonText);
                                }
                            });
                            $('#linkBeforeText').on('click', function () {
                                var $i = $parent.find('a > i');
                                var $s = $parent.find('a > span');
                                if ($(this).is(':checked')) {
                                    if ($i.length > 0 && $s.length > 0) {
                                        $anchor.append($i);
                                        $anchor.append($s);
                                    }
                                } else {
                                    if ($i.length > 0 && $s.length > 0) {
                                        $anchor.append($s);
                                        $anchor.append($i);
                                    }
                                }
                            });
                        }

                        function checkIconBeforeText() {
                            if ($(enableButtonIcon).is(":checked") && $(enableButtonText).is(":checked"))
                                $("#iconBeforeTextToggle").show();
                            else $("#iconBeforeTextToggle").hide();
                        }

                        function FontIcon() {
                            $('#buttonfontIconCollection').html(EasyLibrary.FontCollectionList());
                            SearchFontIcon();
                        }

                        function SearchFontIcon() {
                            $('#buttonSearchIcon').on('keyup', function () {
                                var searchVal = $(this).val();
                                $('#buttonfontIconCollection').find('li').each(function () {
                                    var $this = $(this);
                                    var dataClass = $this.find('i').attr('data-class');
                                    var pos = dataClass.indexOf(searchVal);
                                    if (pos < 0) {
                                        $this.addClass('Dn');
                                    } else {
                                        $this.removeClass('Dn');
                                    }
                                });
                            });
                            if ($Icon.length > 0) {
                                var fontClasses = $Icon.attr('class').replace('fa ', '').replace('onhovercolor', '').trim();
                                $('#buttonfontIconCollection').find('li i[data-class="' + fontClasses + '"]').parent().addClass('selected');
                            }
                            $('#buttonfontIconCollection').find('li').on('click', function () {
                                var chooseClass = $(this).find('i').attr('data-class');
                                $Icon.attr('class', 'onhovercolor fa ' + chooseClass);
                                $('#buttonfontIconCollection').find('li').removeClass('selected');
                                $(this).addClass('selected');
                            });
                        }

                    }
                },
                "Action": {
                    DOM: EasyLibrary.ReadDOM("starter/button/buttonaction", false),
                    onload: function () {
                        let $anchor = $activeDOM.find('a.com-button');
                        commonEvent();

                        function EnableLink() {
                            var linklist = {
                                'internal': 'internal',
                                'external': 'external'
                            };
                            let linkType = $activeDOM.find('.com-button').attr('data-link');
                            let $linkTextURL = $('#linkTextURL');
                            let $selectLink = $("#enableExternalLink");
                            $selectLink.val(linkType);
                            let $anchorPageList = $("#anchorPageList");
                            var link = $anchor.attr('data-href');
                            let $messageContainer = $('#messageContainer');
                            $anchorPageList.off().on('change', function () {
                                var url = $('#anchorPageList option:selected').text().replaceAll(" ", "-");
                                $anchor.attr('href', SageFrameHostURL + '/' + url).replaceAll("-", " ");
                                $anchor.addClass('anchorpage');
                            });
                            if (typeof linkType !== "undefined") {
                                if (linkType == linklist.external) {
                                    $selectLink.val(linklist.external);
                                    $linkTextURL.removeClass('Dn');
                                    $linkTextURL.val(link);
                                    $('#anchorPageListHolder').addClass("Dn");
                                    $anchor.removeClass('anchorpage');
                                    $linkTextURL.focus();
                                } else {
                                    $selectLink.val(linklist.internal);
                                    GetPageList();
                                    $messageContainer.html('');
                                    $anchor.addClass('anchorpage');
                                    $anchor.addClass("redirectLink");
                                    $('#anchorPageListHolder').removeClass("Dn");
                                    $anchorPageList.find('option').filter(function () {
                                        return this.text == link.replace(SageFrameHostURL + '/', '').replaceAll("-", " ");
                                    }).attr('selected', true);
                                    $anchor.attr("data-pageName", $("#anchorPageList option:selected").text());
                                    $('#anchorPageListHolder').removeClass('Dn');
                                }
                            } else {
                                $('#anchorPageListHolder').show();
                            }

                            if (typeof $anchor.attr('target') !== "undefined") {
                                $('#targetFrame').val($anchor.attr('target'));
                            }

                            $('#targetFrame').on('change', function () {
                                $anchor.attr('target', $(this).val());
                            });
                            $('#enableExternalLink').off().on('change', function () {
                                var selected = $(this).val();
                                $anchor.removeClass("redirectLink");
                                if (selected == linklist.external) {
                                    $anchor.attr('data-link', linklist.external);
                                    $linkTextURL.val(link);
                                    $linkTextURL.removeClass('Dn');
                                    $('#anchorPageListHolder').addClass("Dn");
                                    $linkTextURL.val('').focus();
                                    $anchor.removeClass('anchorpage');
                                } else {
                                    $messageContainer.html('');
                                    $anchor.attr('data-link', linklist.internal);
                                    GetPageList();
                                    $linkTextURL.addClass('Dn');
                                    $('#anchorPageListHolder').removeClass('Dn');
                                    $anchor.addClass("redirectLink");
                                    $anchorPageList.trigger('change');
                                }
                            });

                            function GetPageList() {
                                $anchorPageList.html(EasyLibrary.GetPageOption());

                                $anchorPageList.off().on('change', function () {
                                    let $selectedOption = $anchorPageList.find('option:selected');
                                    $anchor.attr('href', SageFrameHostURL + '/' + $selectedOption.text().replaceAll(" ", "-"));
                                    $anchor.attr("data-pageName", $selectedOption.text().replaceAll(" ", "-"));
                                });
                            }

                            $linkTextURL.on('input focusout', function () {
                                var $this = $(this);
                                let externalURL = "";
                                var val = $this.val().trim();
                                if (val.length > 0) {
                                    externalURL = val;
                                    var protocol = /^(https?):\/\/[^\s\/$.?#]*.[^\s]*$/i;
                                    if (!protocol.test(val)) {
                                        $this.css('border-color', 'red');
                                        $messageContainer.html('Invalid url. <br />Example of valid url: <br />http://www.contentder.com/ <br />https://www.contentder.com/');
                                    } else {

                                        $messageContainer.html('');
                                        $this.css('border-color', '');
                                    }
                                } else
                                    $messageContainer.html('Enter a valid URL');
                                $anchor.attr('href', externalURL);
                                component["button"].view.library.buttonlick();
                            });
                        }

                        function OpenPopUpEvent() {
                            let $slcPopup = $('#slcBtnStpopup');
                            let optHtml = '';
                            $('.edit-area .btnlinked-popup').each(function () {
                                let $ths = $(this);
                                optHtml += '<option value="' + $ths.attr('data-id') + '">' + $ths.attr('data-name') + '</option>';
                            });
                            $slcPopup.html(optHtml);
                            $slcPopup.off().on('change', function () {
                                $anchor.attr('data-modalid', $(this).val());
                            });
                            $slcPopup.val($anchor.attr('data-modalid')).trigger('change');
                        }

                        function GotoSecEvnt() {
                            let $slcSection = $('#slcBtnStSection');
                            var ophtml = '';
                            let allsections = [];
                            $('.edit-area .cRow').not('.popupidentity,.btnlinked-popup').each(function () {
                                let $this = $(this);
                                let secNm = $this.find('h1').length > 0 ? $this.find('h1').eq(0).text() : $this.attr('data-type');
                                secNm = secNm.toLowerCase();
                                if (secNm.length > 20)
                                    secNm = secNm.substring(0, 20) + "...";
                                var count = 0;
                                allsections.forEach(function (v, i) {
                                    if (v == secNm) {
                                        count++;
                                    };
                                });
                                allsections.push(secNm);
                                if (count > 0)
                                    secNm = secNm + '-' + count;
                                ophtml += '<option value="' + $this.attr('data-id') + '">' + secNm + '</option>';
                            });
                            $slcSection.html(ophtml);
                            $slcSection.off().on('change', function () {
                                let val = $(this).val();
                                let $tar = $('.edit-area .cRow[data-id="' + val + '"]');
                                $anchor.attr('data-sectionid', val);
                                if ($tar.length > 0) {
                                    $('html, body').animate({
                                        scrollTop: $tar.offset().top - 80,
                                    }, 500);
                                }
                            });
                            $slcSection.val($anchor.attr('data-sectionid')).trigger('change');

                        }

                        function DownloadFileEvnt() {
                            let attch = $anchor.attr('data-attachment');
                            if (EasyLibrary.IsDefined(attch)) {
                                $('#btnStActDwnFileName').text(attch.split('/').pop());
                            }
                            $('#btnStActChooseFile').SageMedia({
                                userModuleID: webBuilderUserModuleID,
                                onSelect: function (src, response, type, filename, extension, alt) {
                                    $anchor.attr('data-attachment', src);
                                    $('#btnStActDwnFileName').text(filename);
                                },
                                mediaType: '*'
                            });
                        }

                        function commonEvent() {
                            $('#anchorPageList').html(EasyLibrary.GetPageOption());
                            $('#slcBtnStActionType').off('change').on('change', function () {
                                let val = $(this).val();
                                $('.btnActionTypes').addClass('Dn');
                                $('.btnActionTypes.' + val).removeClass('Dn');
                                $anchor.removeClass("redirectLink");
                                $anchor.attr('data-actiontype', val);
                                let href = $anchor.attr('href');
                                if (typeof href !== 'undefined') {
                                    $anchor.attr('data-href', href);
                                    $anchor.removeAttr('href');
                                    $anchor.removeClass('anchorpage');
                                }
                                switch (val) {
                                    case 'Actlink':
                                        EnableLink();
                                        break;
                                    case 'ActPopup':
                                        OpenPopUpEvent();
                                        break;
                                    case 'ActSection':
                                        GotoSecEvnt();
                                        break;
                                    case 'ActflDownload':
                                        DownloadFileEvnt();
                                        break;
                                }
                            });
                            $('#slcBtnStActionType').val($anchor.attr('data-actiontype')).trigger('change');
                        };
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": "<div id='customouterspacing'></div> <div id='custominnerspacing'></div>",
                    "onload": function ($item) {
                        $('#customouterspacing').AdvanceSpacing({
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
                        $('#custominnerspacing').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('a'),
                            "options": {
                                "padding": {
                                    "max": 80,
                                    "min": 0,
                                    "times": 5,
                                    "position": ["all", "top", "left", "bottom", "right"]
                                },
                            },
                        });
                    }
                },
                "Hover Effect": {
                    "options": {
                        "color": ["all", "background", "text"],
                        "shadow": "on",
                        "border": {
                            "max": 20,
                            "min": 0,
                            "times": 1,
                            "position": ["all", "top", "right", "bottom", "left"],
                            "selectLayer": function ($elem) {
                                //return $parent;
                            },
                        }
                    },
                    "Scroll Effect": {
                        "options": [],
                        "selectLayer": function ($elem) {
                            return $elem.parent().parent();
                        }
                    }
                },
                "Scroll Effect": {
                    "options": [],
                    "selectLayer": function ($elem) {
                        return $activeDOM;
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
                    "options": ["color"]
                },
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    }
                },
                "Box Radius": {
                    "options": {
                        "max": 200,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    }
                },
                "Box Shadow": {
                    "options": {

                    }
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "Line Height": {
                            "DOM": CreateSliderDOM('LineHeightSizeSlider', 'LineHeightSizeHandle', 'Line Height'),
                            "prepend": "true",
                            "onload": function () {
                                LineHeight();

                                function LineHeight() {
                                    component["button"].common.lineheight();
                                }
                            }
                        },
                        //"Height": {
                        //    "callback": function (space, $elem) {
                        //        let $parent = $activeDOM;
                        //        let parentClasses = $parent.attr('class');
                        //        let dAlpha = DeviceAlphaSpace();
                        //        let regex = new RegExp(dAlpha + 'Lh-[0-9]{1,4}', 'g');
                        //        let lineHeightClass = parentClasses.match(regex);
                        //        if (lineHeightClass !== null) {
                        //            $parent.removeClass(lineHeightClass[0]);
                        //        }
                        //        $parent.addClass(dAlpha + 'Lh-' + space);
                        //    }
                        //},
                        "Widths": {
                            "DOM": CreateSliderDOM('buttonWrapperSizeSlider', 'buttonWrapperSizeHandle', 'Width'),
                            "prepend": "true",
                            "onload": function () {
                                LineHeight();

                                function LineHeight() {
                                    component["button"].common.width();
                                }
                            }
                        },
                        "FontSize": {},
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
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "removeedit": function ($editDOM) {
            $editDOM.find('div[data-type="button"]').find('a').removeClass('anchorpage').addClass('anchorpage');
        },
        "view": {
            "view": function () {
                this.library.buttonlick();
            },
            "library": {
                "buttonlick": function () {
                    let _ths = this;
                    if (!EditorMode)
                        $('.editor-component.button').find('.com-button').off().on('click', function (e) {
                            var $this = $(this);
                            switch ($this.attr('data-actiontype')) {
                                case 'ActSection':
                                    _ths.gotoSection($this);
                                    break;
                                case 'ActPopup':
                                    _ths.openPopUp($this);
                                    break;
                                case 'ActflDownload':
                                    _ths.downloadFile($this);
                                    break;
                            }
                        });
                },
                "gotoSection": function ($this) {
                    let $tar = $('.cRow[data-id="' + $this.attr('data-sectionid') + '"]');
                    if ($tar.length > 0) {
                        $('html, body').animate({
                            scrollTop: $tar.offset().top - 80,
                        }, 500);
                    }
                },
                "openPopUp": function ($this) {
                    let $targetModel = $('.btnlinked-popup[data-id="' + $this.attr('data-modalid') + '"]');
                    if ($targetModel.length > 0) {
                        $targetModel.fadeIn();
                    }
                },
                "downloadFile": function ($this) {
                    let attch = $this.attr('data-attachment');
                    if (typeof attch !== 'undefined' && attch.length > 0) {
                        window.location.href = SageFrameHostURL + attch;
                    }
                },
            }
        },
        "common": {
            "width": function () {
                let $parent = $activeDOM;

                function WidthChange(space) {
                    ReplaceClassByPattern($parent, 'W-[0-9]{1,4}', 'W-' + space);
                }
                AdvanceSageSlider($('#buttonWrapperSizeSlider'), $('#buttonWrapperSizeHandle'), 5, 1080,
                    GetValueByClassName($parent, 'W-[0-9]{1,4}', 'W-'), WidthChange, $parent, 'px');
            },
            "lineheight": function () {
                let $parent = $activeDOM;

                function LineHeightChange(space) {
                    ReplaceClassByPattern($parent, 'Lh-[0-9]{1,4}', 'Lh-' + space);
                }
                AdvanceSageSlider($('#LineHeightSizeSlider'), $('#LineHeightSizeHandle'), 5, 200,
                    GetValueByClassName($parent, 'Lh-[0-9]{1,4}', 'Lh-'), LineHeightChange, $parent, 'px');
            },
            "fontsize": function () {
                let $parent = $activeDOM;

                function LineHeightChange(space) {
                    ReplaceClassByPattern($parent, 'Fs-[0-9]{1,4}', 'Fs-' + space);
                }
                AdvanceSageSlider($('#buttonSizeSlider'), $('#buttonSizeHandle'), 5, 200,
                    GetValueByClassName($parent, 'Fs-[0-9]{1,4}', 'Fs-'), LineHeightChange, $parent, 'px');
            },
            "copyAttributes": function ($dropped, $choosen) {
                let $selected = $choosen.children('.editor-component');
                $selected.each(function () {
                    $.each(this.attributes, function () {
                        if (this.specified) {
                            $dropped.attr(this.name, this.value);
                        }
                    });
                });
            }
        }
    }
};