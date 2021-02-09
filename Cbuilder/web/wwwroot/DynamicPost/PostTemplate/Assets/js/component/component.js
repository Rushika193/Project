var extendedComps = {
    "button": {
        "componentname": "button",
        "category": "basic",
        "icon": "icon icon-buton",
        "row": false,
        "hidden": false,
        "collection": true,
        "type": "element",
        "DOM": {
            buttonstyle: EasyLibrary_ReadDOM('/DynamicPost/PostTemplate/Assets/js/component/html/button/buttonStyles')
        },
        "defaultdata": EasyLibrary_ReadDOM("/DynamicPost/PostTemplate/Assets/js/component/html/button/defaultbutton"),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) {
            let _this = this;
            let allButtonStyles = BtnCollection();
            function BtnCollection() {
                let btncoll = _this.DOM.buttonstyle;
                let $btn = $(btncoll);
                let html = '';
                $btn.find('> .editor-component.dynbut').each(function ($index, $val) {
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

            $('.selectData').off().on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                component['button'].common.copyAttributes($appendLayer, $(this));
                CloseFullPagePopup();
            });

            return 'no data to show';
        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (!$appendLayer.hasClass('site-body')) {
                $appendLayer.addClass('ff-' + $('#basicFonts').val());
                $appendLayer.addClass('f-weight-400');
            }
        },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary_ReadDOM("/DynamicPost/PostTemplate/Assets/js/component/html/button/defaultbuttonbasic"),
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
                        $anchor.attr('data-link', 'external');
                        InitEvents();
                        function InitEvents() {
                            //FontSize();
                            WrapperSize();
                            WrapperHeight();
                            FontIconColor();
                            TextTranformCheck();
                            EnableLink();
                            EnableText();
                            EnableIcon();
                            FontIcon();
                            LineHeight();
                        }
                        function FontSize() {
                            component["button"].common.fontsize();
                        }
                        function WrapperSize() {
                            component["button"].common.width();
                        }
                        function LineHeight() {
                            component["button"].common.lineheight();
                        }
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
                                    $Icon.css({ 'color': objColor.bgColor });
                                    $text.css({ 'color': objColor.bgColor });
                                    $anchor.css({ 'color': objColor.bgColor });
                                }
                            });
                            $('#buttonColor').colorPicker(colorPickerOption);
                        }

                        function TextTranformCheck() {
                            var trasformValue = '';
                            if ($parent.hasClass('txU')) {
                                trasformValue = 'txU';
                            } else if ($parent.hasClass('txL')) {
                                trasformValue = 'txL';
                            }
                            $('#buttonTextTransform').val(trasformValue);
                            $('#buttonTextTransform').on('change', function () {
                                var tranformCase = $(this).val();
                                switch (tranformCase) {
                                    case 'txU':
                                        $parent.removeClass('txL').removeClass('txC').addClass('txU');
                                        break;
                                    case 'txL':
                                        $parent.removeClass('txU').removeClass('txC').addClass('txL');
                                        break;
                                    case 'txC':
                                        $parent.removeClass('txU').removeClass('txL').addClass('txC');
                                        break;
                                    case '':
                                        $parent.removeClass('txU').removeClass('txL').removeClass('txU');
                                        break;
                                }
                            });
                        }
                        function EnableLink() {
                            $('#enableButtonLink').closest('.field-row').addClass('Dn');
                            $('#enableExternalLink').closest('.field-row').addClass('Dn');
                            $('#anchorPageListHolder').addClass('Dn');
                            $('#divEnableLink').removeClass('Dn').show();
                            $('#linkTextURLHolder').removeClass('Dn').show();
                            
                            var link = $anchor.attr('href');
                            $('#linkTextURL').val(link);
                            if (typeof $anchor.attr('target') !== "undefined") {
                                $('#targetFrame').val($anchor.attr('target'));
                            } else {
                                $('#targetFrame').val('_self');
                            }
                            $('#targetFrame').on('change', function () {
                                $anchor.attr('target', $('#targetFrame').val());
                            });
                            $('#linkTextURL').on('keyup', function () {
                                var $this = $(this);
                                var val = $this.val().trim();
                                var link = '#';
                                if (val.length > 0) {
                                    link = val;
                                }
                                $anchor.attr('href', link);
                                component["button"].view.library.buttonlick();
                            });
                        }
                        
                        function EnableText() {
                            if ($text.length > 0) {
                                var text = $text.text();
                                $('#enableButtonText').prop('checked', true);
                                $('#buttonText').val(text);
                                $('#divEnableText').show();
                            } else {
                                $('#enableButtonText').prop('checked', false);
                            }
                            $('#enableButtonText').on('click', function () {
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
                                } else {
                                    $('#divEnableText').slideUp(400);
                                    $parent.find('a > span').remove();
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

                        function EnableIcon() {
                            if ($Icon.length > 0) {
                                var iconClass = $Icon.attr('class').replace('fa ', '').replace('onhovercolor', '');
                                $('#enableButtonIcon').prop('checked', true);
                                $('#buttonIcon').show();
                            } else {
                                $('#enableButtonIcon').prop('checked', false);
                            }
                            $('#enableButtonIcon').on('click', function () {
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

                                } else {
                                    $('#buttonIcon').slideUp(400);
                                    $('#linkBeforeText').prop('checked', false);
                                    $parent.find('a > i').remove();
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
                            "DOM": Core_CreateSliderDOM('LineHeightSizeSlider', 'LineHeightSizeHandle', 'Line Height'),
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
                            "DOM": Core_CreateSliderDOM('buttonWrapperSizeSlider', 'buttonWrapperSizeHandle', 'Width'),
                            "prepend": "true",
                            "onload": function () {
                                LineHeight();
                                function LineHeight() {
                                    component["button"].common.width();
                                }
                            }
                        },
                        "fontsize": {
                            "DOM": Core_CreateSliderDOM('buttonSizeSlider', 'buttonSizeHandle', 'Width'),
                            "prepend": "true",
                            "onload": function () {
                                LineHeight();
                                function LineHeight() {
                                    component["button"].common.fontsize();
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
                            "position": ["all", "top", "left", "bottom", "right"]
                        }
                    }
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "view": {
            "view": function () {
                this.library.buttonlick();
            },
            "library": {
                "buttonlick": function () {
                    $('.editor-component.dynbut').find('.com-button').off().on('click', function (e) {
                        var $this = $(this);
                        var onePage = $this.attr('data-link');
                        var href = $this.attr('data-onepage');
                        if (typeof onePage !== "undefined" && typeof href !== "undefined") {
                            if (onePage === "onepage") {
                                e.preventDefault();
                                $('.menuHeader .onepagemenu  li[data-opscroll="' + href + '"]').trigger('click');
                            }
                        }
                    });
                }
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
,    "text": {
        "componentname": "text",
        "category": "basic",
        "componentBlockDOM": "",
        "icon": "icon icon-text",
        "row": false,
        "hidden": false,
        "collection": false,
        "type": "element",
        "defaultdata": EasyLibrary_ReadDOM("/cbuilderassets/js/html/starter/textdefaultdata"),
        "pageload": function () {
        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (typeof ($appendLayer) !== "undefined" && dropped) {
                var $textChange = $appendLayer.children().not('div').eq(0);
                $textChange.addClass('ff-' + $('#basicFonts').val());
                $textChange.addClass('f-weight-400');
                $appendLayer.find('.editor-para').focus();
            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": "<div id='txtbasictab'></div>",
                    "onload": function ($item) {
                        let $parent = $item.parents('.SetHdlr').parent();
                        $("#txtbasictab").AdvanceTextSetting({
                            targetParent: $parent,
                            targetElem: '.editor-para'
                        });
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
                            "position": ["all", "top", "left", "bottom", "right"]
                        }
                    },
                    "selectLayer": function ($elem) {
                        //var $parent = $elem.parents('.SetHdlr').parent();
                        //var $text = $parent.find('.editor-para');
                        return $activeDOM;
                    },

                },
                "Alignment": {
                    "options": {
                        "horizontal": ["left", "center", "right"]
                    }
                },
                "Scroll Effect": {
                    "options": [],
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
                "Box Shadow":
                    {
                        "options": {

                        }
                    },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "fontsize": {
                            "selectLayer": function () {
                                return $activeDOM.find('.editor-para');
                            }
                        },
                        "lineheight": {
                            "selectLayer": function () {
                                return $activeDOM.find('.editor-para');
                            }
                        },
                        "visibility": {},
                        "width": {}
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
                            "position": ["all", "top", "left", "bottom", "right"]
                        }
                    },
                    "selectLayer": function ($elem) {
                        return $activeDOM;
                    },
                },
                "Alignment": {
                    "options": {
                        "horizontal": ["left", "center", "right"],
                    },
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        }
    }
,}
