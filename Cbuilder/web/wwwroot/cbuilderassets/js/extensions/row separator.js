var row_separator = {
    "row separator": {
        "componentname": "row separator",
        "category": "pro",
        "icon": "fa fa-minus",
        "row": true,
        "hidden": false,
        "collection": false,
        "type": "element",
        "description": "This component helps to create a separator between two row type components.",
        "typeicon": "fa fa-th",
        "Screenshot": "https://easybuilder.contentder.com/ComponentScreenshot/row_separator.jpg",
        "defaultdata": EasyLibrary.ReadDOM("starter/rowseparator/data"),
        "afterdrop": function ($appendLayer) { },
        "styleDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("starter/rowseparator/basic"),
                    "onload": function ($item) {
                        var $parent = $activeDOM;
                        var $sep = $parent.find('.rowSeparator');
                        InitEvents();
                        function InitEvents() {
                            HeightInit();
                            Width();
                            Style();
                            SepColor();
                        }
                        function HeightInit() {
                            var parentClasses = $sep.attr('class');
                            var dAlpha = DeviceAlphaSpace();
                            var regex = new RegExp(dAlpha + 'H-[0-9]{1,4}', 'g');
                            var HeightClass = parentClasses.match(regex);
                            var height = 0;
                            if (HeightClass !== null) {
                                height = HeightClass[0].replace(dAlpha + 'H-', '');
                            }
                            AdvanceSageSlider($('#sepHeightSlider'), $('#sepHeightHandle'), 1, 100, height, component["row separator"].common.HeightChange, $sep, 'px');
                        }
                        function Width() {
                            var sepWidth = 100;
                            var parentClasses = $sep.attr('class');
                            var dAlpha = DeviceAlphaSpace();
                            var regex = new RegExp(dAlpha + 'sfCol_[0-9]{1,3}', 'g');
                            var sfWidth = parentClasses.match(regex);
                            if (sfWidth !== null) {
                                sepWidth = parseInt(dAlpha + sfWidth[0].split('_')[1]);
                            }

                            function RowSepWidth(space) {
                                parentClasses = $sep.attr('class');
                                dAlpha = DeviceAlphaSpace();
                                regex = new RegExp(dAlpha + 'sfCol_[0-9]{1,3}', 'g');
                                var sfColVal = parentClasses.match(regex);
                                if (sfColVal !== null) {
                                    sepWidth = $sep.removeClass(sfColVal[0]);
                                }
                                $sep.addClass(dAlpha + 'sfCol_' + space);
                            }
                            AdvanceSageSlider($('#sepWidthSlider'), $('#sepWidthHandle'), 1, 100, sepWidth, RowSepWidth, $parent, '%');
                        }

                        function Style() {
                            var style = $sep.css('border-top-style');
                            $('#rowSepLine').val(style);

                            $('#rowSepLine').on('change', function () {
                                var selStyle = $(this).val();
                                $sep.css('border-top-style', selStyle);
                            });
                        }

                        function SepColor() {
                            $('#rowSepColor').css('background-color', $sep.css('background-color'));
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $sep.css({ 'background-color': objColor.bgColor });
                                }
                            });
                            $('#rowSepColor').colorPicker(colorPickerOption);
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
                        }
                    }
                },
                "Alignment": {
                    "options": {
                        "horizontal": ["left", "center", "right"]
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
                        "Height": {
                            "selectLayer": function () {
                                return $activeDOM.find('.rowSeparator');
                            },
                            "callback": function (space, $elem) {
                                //$elem.css("border-top-width", space + 'px');
                                component["row separator"].common.HeightChange(space, $elem);
                            }
                        },
                        "Width": {
                            "selectLayer": function () {
                                return $activeDOM.find('.rowSeparator');
                            }
                        },
                        "Visibility": {},
                    }
                },
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 80,
                            "min": -80,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"]
                        }
                    }
                },
                "Alignment": {
                    "options": {
                        "horizontal": ["left", "center", "right"]
                    }
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "common": {
            "HeightChange": function (space, $parent) {
                var dAlpha = DeviceAlphaSpace();
                var parentClasses = $parent.attr('class');
                let regex = new RegExp(dAlpha + 'H-[0-9]{1,4}', 'g');
                var HeightClass = parentClasses.match(regex);
                var height = 0;
                if (HeightClass !== null) {
                    $parent.removeClass(HeightClass[0]);
                }
                $parent.addClass(dAlpha + 'H-' + space);
            }
        }
    }
};