var siteheadermenu = {
    "siteheadermenu": {
        "componentname": "siteheadermenu",
        "category": "basic",
        "icon": "icon-icon-row",
        "row": false,
        "hidden": true,
        "collection": false,
        "type": "hidden",
        "defaultdata": "",
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {

        },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("sitemenubasic"),
                    "onload": function ($item) {
                        var $parent = $activeDOM;
                        var $text = $parent.find('.pageName');
                        var $nav = $parent.find('nav');
                        InitEvents();

                        function InitEvents() {
                            $('#menuTextColor').css('background-color', $parent.find('.pagelink').not('.active-page').find('.pageName').eq(0).css('color'));
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $parent.find('.pagelink').not('.active-page').find('.pageName').css('color', objColor.bgColor);
                                    $parent.find('.eb-menu').attr('data-textcolor', objColor.bgColor);
                                }
                            });
                            $('#menuTextColor').colorPicker(colorPickerOption);
                            fontSize();
                            letterSpacing();
                            TextTranformCheck();
                            MenuStyle();
                            LoadFontFamily();
                        }

                        function fontSize() {
                            var fontsize = $text.css('font-size');
                            if (typeof fontsize === 'undefined') {
                                fontsize = minFontSize;
                            }
                            fontsize = parseInt(fontsize.replace('px', ''));

                            function FontSize(space) {
                                $text.css('font-size', space + 'px');
                            }
                            AdvanceSageSlider($('#menuFontSLider'), $('#menuFontHandle'), minFontSize, maxFontsize, fontsize, FontSize, $parent, 'px');
                        }

                        function letterSpacing() {

                            var letteSpace = 0;
                            var removeClass = '';
                            if (typeof $text.attr('class') !== 'undefined') {
                                var letterSpacingNegClass = $text.attr('class').match(/LtrSpc-n-[0-9]{1,2}/g);
                                if (letterSpacingNegClass !== null) {
                                    removeClass = letterSpacingNegClass[0].trim();
                                    letteSpace = parseInt(removeClass.replace('LtrSpc-n-', ''));
                                } else {
                                    var letterSpacingPosClass = $text.attr('class').match(/LtrSpc-[0-9]{1,2}/g);
                                    if (letterSpacingPosClass !== null) {
                                        removeClass = letterSpacingPosClass[0].trim();
                                        letteSpace = parseInt(removeClass.replace('LtrSpc-', ''));
                                    }
                                }
                            }

                            function LetteSpaceChange(space) {
                                var addClass = '';
                                var removeClass = '';
                                if (typeof $text.attr('class') !== 'undefined') {
                                    var negClass = $text.attr('class').match(/LtrSpc-n-[0-9]{1,2}/g);
                                    if (negClass !== null) {
                                        removeClass = negClass[0].trim();
                                    } else {
                                        var posClass = $text.attr('class').match(/LtrSpc-[0-9]{1,2}/g);
                                        if (posClass !== null) {
                                            removeClass = posClass[0].trim();
                                        }
                                    }
                                }
                                if (space >= 0) {
                                    addClass = 'LtrSpc-' + space;
                                } else {
                                    space = Math.abs(space);
                                    addClass = 'LtrSpc-n-' + space;
                                }
                                $text.removeClass(removeClass).addClass(addClass);
                            }
                            AdvanceSageSlider($('#menuletterSpacingSlider'), $('#menuletterSpacingHandle'), -10, 10, letteSpace, LetteSpaceChange, $parent, 'px');
                        }

                        function TextTranformCheck() {
                            var trasformValue = '';
                            if ($text.hasClass('editor-text-transform-uppercase')) {
                                trasformValue = 'editor-text-transform-uppercase';
                            } else if ($text.hasClass('editor-text-transform-lowercase')) {
                                trasformValue = 'editor-text-transform-lowercase';
                            }
                            $('#menutextTransform').val(trasformValue);
                            $('#menutextTransform').on('change', function () {
                                var tranformCase = $(this).val();
                                switch (tranformCase) {
                                    case 'editor-text-transform-uppercase':
                                        $text.removeClass('editor-text-transform-lowercase').addClass('editor-text-transform-uppercase');
                                        break;
                                    case 'editor-text-transform-lowercase':
                                        $text.removeClass('editor-text-transform-uppercase').addClass('editor-text-transform-lowercase');
                                        break;
                                    case '':
                                        $text.removeClass('editor-text-transform-uppercase').removeClass('editor-text-transform-lowercase');
                                        break;
                                }
                            });
                        }

                        function MenuStyle() {
                            var navClass = 'nav-style-none';
                            var navStyleClasses = $nav.attr('class').match(/nav-style-[a-z]{1,20}/g);
                            if (navStyleClasses !== null) {
                                navClass = navStyleClasses[0];
                            }
                            $('#menuStyle').val(navClass);
                            $('#menuStyle').on('change', function () {
                                var navStyleClasses = $nav.attr('class').match(/nav-style-[a-z]{1,20}/g);
                                if (navStyleClasses !== null) {
                                    $nav.removeClass(navStyleClasses[0]);
                                }
                                var style = $(this).val().trim();
                                $nav.addClass(style);
                                MenuChangeInstant($nav.find('.eb-menu'), webBuilderSettings.primaryColor, webBuilderSettings.secondaryColor, style);
                            });
                        }

                        function LoadFontFamily() {
                            $('#fontfamilymenu').html(DOMFontAdvanceCollection());
                            var defaultFontFamily = 'montserrat';
                            var classesList = $text.eq(0).attr('class');
                            if (typeof classesList !== "undefined") {
                                var fontClasses = classesList.match(/ff-(\w+)/g);
                                if (fontClasses !== null) {
                                    defaultFontFamily = fontClasses[0].replace('ff-', '');
                                }
                            }
                            $('#fontfamilymenu').val(defaultFontFamily);
                            fontWeight(defaultFontFamily);
                            if (typeof classesList !== "undefined") {
                                var weightClasses = classesList.match(/f-weight-[0-9]{0,3}/g);
                                if (weightClasses !== null) {
                                    $('#fontWeightmenu').val(weightClasses[0].replace('f-weight-', ''));
                                }
                            }
                            $('#fontWeightmenu').on('change', function () {
                                var classList = $text.eq(0).attr('class');
                                if (typeof classesList !== "undefined") {
                                    var familyClass = classList.match(/f-weight-[0-9]{0,3}/g);
                                    if (familyClass !== null) {
                                        $text.removeClass(familyClass[0]);
                                    }
                                }
                                $text.addClass('f-weight-' + $(this).val());
                            });

                            $('#fontfamilymenu').on('change', function () {
                                var classList = $text.eq(0).attr('class');
                                if (typeof classesList !== "undefined") {
                                    var fontClass = classList.match(/ff-(\w+)/g);
                                    if (fontClass !== null) {
                                        $text.removeClass(fontClass[0]);
                                    }
                                }
                                $text.addClass('ff-' + $(this).val());
                                fontWeight($(this).val());
                                $('#fontWeightmenu').trigger('change');
                            });

                            function fontWeight(fontName) {
                                var fontDOM = DOMFontWeight(fontName);
                                if (fontDOM.length > 0) {
                                    $('#fontWeightmenu').html(fontDOM);
                                }
                            }
                        }
                    }
                },

                "Background": {
                    "options": ["image", "color"]
                },
                "Spacing": {
                    "options": {
                        "padding": {
                            "max": 80,
                            "min": 0,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"]
                        }
                    }
                },
                "Alignment": {
                    "options": ["left", "center", "right"]
                }
            },
            "selectLayer": function ($elem) {
                var $parent = $activeDOM;
                $('.editor-component').find('.activeSetting').removeClass('activeSetting');
                $('.editor-component.activeSetting').removeClass('activeSetting');
                $parent.addClass('activeSetting');
                return $parent;
            }
        }
    }
};