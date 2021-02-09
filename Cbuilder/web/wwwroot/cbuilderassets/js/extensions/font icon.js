var font_icon = {
    "font icon": {
        "componentname": "font icon",
        "category": "basic",
        "icon": "fa fa-star",
        "row": false,
        "collection": true,
        "type": "element",
        "hidden": false,
        "defaultdata": EasyLibrary.ReadDOM("starter/fonticon/defaultdata"),
        "allFontIconStyles": EasyLibrary.ReadDOM('starter/fonticon/fontIconStyles'),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) {
            //let allFontIconStyles = EasyLibrary.ReadDOM('starter/fonticon/fontIconStyles');
            let allFontIconStyles = component["font icon"].allFontIconStyles;
            FullPagePopup({
                data: allFontIconStyles,
                heading: "Font Icon Styles",
                showheading: true,
                width: '40%'
            });

            $('.selectData').off().on('click', function () {
                component['button'].common.copyAttributes($appendLayer, $(this));
                CloseFullPagePopup();
            });
            return 'no data to show';
        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) { },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("starter/fonticon/fonticonbasictab"),
                    "onload": function ($item) {
                        var $parent = $activeDOM;
                        var $fontIcon = $parent.find('.font-icon');
                        InitEvents();
                        function InitEvents() {
                            $('.fontIconCollection').html(EasyLibrary.FontCollectionList());
                            FontWrapperSize();
                            FontSize();
                            FontIconColor();
                            SearchFontIcon();
                        }
                        function FontWrapperSize() {
                            component["font icon"].common.fontwrapper();
                        }

                        function FontSize() {
                            component["font icon"].common.fontsize();
                        }

                        function FontIconColor() {
                            $('#fontIconColor').css('background-color', $fontIcon.css('color'));
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $fontIcon.css({ 'color': objColor.bgColor });
                                }
                            });
                            $('#fontIconColor').colorPicker(colorPickerOption);
                        }

                        function SearchFontIcon() {
                            $('#searchIcons').on('keyup', function () {
                                var searchVal = $(this).val();
                                $('.fontIconCollection').find('li').each(function () {
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
                            var fontClasses = $fontIcon.attr('class').replace('fa ', '').replace('onhovercolor', '').replace('font-icon', '').trim();
                            $('.fontIconCollection').find('li i[data-class="' + fontClasses + '"]').parent().addClass('selected');
                            $('.fontIconCollection').find('li').on('click', function () {
                                let chooseClass = $(this).find('i').attr('data-class');
                                let parentClasses = $fontIcon.attr('class');
                                let regex = new RegExp('fa-[a-z]{1,20}((-)[a-z]{0,20}){0,10}', 'g');
                                let classes = parentClasses.match(regex);
                                if (classes !== null) {
                                    $fontIcon.removeClass(classes[0]);
                                }
                                $fontIcon.addClass(chooseClass);
                                $('.fontIconCollection').find('li').removeClass('selected');
                                $(this).addClass('selected');
                            });
                        }
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
                "Hover Effect": {
                    "options": {
                        "color": ["background", "text"],
                        "shadow": "on",
                        "border": {
                            "max": 20,
                            "min": 0,
                            "times": 1,
                            "position": ["all", "top", "right", "bottom", "left"],
                            "selectLayer": function ($elem) {

                            },
                        },
                        "zoom": "on"
                    },
                },
                "Scroll Effect": {
                    "options": [],
                    "selectLayer": function ($elem) {
                        return $elem.parent().parent();
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
                        "position": ["all"],
                    }
                },
                "Box Radius": {
                    "options": {
                        "max": 200,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"],
                    }
                },
                "Box Shadow": {
                    "options": ["all", "color", "zoom", "Inherit"]
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
                        "Font Size": {
                            "DOM": CreateSliderDOM('fontIconHeightSlider', 'fontIconHeightHandle', 'Font Size'),
                            "prepend": "true",
                            "onload": function () {
                                component["font icon"].common.fontsize();
                            }
                        },
                        "Icon Wrapper Size": {
                            "DOM": CreateSliderDOM('fontIconbackHeightSlider', 'fontIconbackHeightHandle', 'Icon Wrapper Size'),
                            "prepend": "true",
                            "onload": function () {
                                component["font icon"].common.fontwrapper();
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
                            "position": ["all", "top", "left", "bottom", "right"]
                        }
                    }
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "common":
            {
                "fontsize": function () {
                    let $parent = $activeDOM;
                    let $icon = $parent.find('.font-icon');
                    function LineHeightChange(space) {
                        ReplaceClassByPattern($icon, 'Fs-[0-9]{1,4}', 'Fs-' + space);
                    }
                    AdvanceSageSlider($('#fontIconHeightSlider'), $('#fontIconHeightHandle'), 5, 1080, GetValueByClassName($icon, 'Fs-[0-9]{1,4}', 'Fs-'), LineHeightChange, $parent, 'px');
                },
                "fontwrapper": function () {
                    let $parent = $activeDOM;
                    function LineHeightChange(space) {
                        ReplaceClassByPattern($parent, 'H-[0-9]{1,4}', 'H-' + space);
                        ReplaceClassByPattern($parent, 'W-[0-9]{1,4}', 'W-' + space);
                    }
                    AdvanceSageSlider($('#fontIconbackHeightSlider'), $('#fontIconbackHeightHandle'), 5, 1080, GetValueByClassName($parent, 'H-[0-9]{1,4}', 'H-'), LineHeightChange, $parent, 'px');
                }
            }
    }
};