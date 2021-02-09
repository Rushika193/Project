var image = {
    "image": {
        "componentname": "image",
        "category": "basic",
        "componentBlockDOM": "",
        "icon": "icon icon-img-1",
        "row": false,
        "hidden": false,
        "type": "element",
        "bucket": true,
        "collection": true,
        "defaultdata": EasyLibrary.ReadDOM('image/basic'),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (dropped)
                $appendLayer.find('.image-settings').trigger('click');
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("imagebasictab"),
                    "onload": function ($this) {
                        $('#fitimagesettings').show();
                        component["image"].common.ImageInit($activeDOM);

                        let $image = $activeDOM.find('img');
                        $('.manageImgPos').off().on('click', function () {
                            let val = $(this).attr('data-name');
                          
                        });
                    },
                },
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 80,
                            "min": -80,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"],
                            "selectLayer": function ($elem) {
                                return $elem.parent().parent();
                            }
                        },
                        "padding": {
                            "max": 80,
                            "min": 0,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"],
                            "selectLayer": function ($elem) {
                                return $elem.parent().parent().not('div').eq(0);
                            }
                        }
                    },
                    "selectLayer": function ($elem) {
                        return $elem.closest('.editor-component'); //.children().not('div').eq(0);
                        //return $elem.parent().parent().find('.image');//.not('div').eq(0);
                        //return $elem.parent().parent();//.children().not('div').eq(0);
                    },
                },
                "Hover Effect": {
                    "options": {
                        "shadow": "on",
                        "border": {
                            "max": 20,
                            "min": 0,
                            "times": 1,
                            "position": ["all", "top", "right", "bottom", "left"],
                        },
                        "zoom": "on",
                    },
                    "selectLayer": function ($elem) {
                        return $activeDOM.find("img");
                    },
                },
                "Scroll Effect": {
                    "options": [],
                    "selectLayer": function ($elem) {
                        return $elem.closest('.editor-component');
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
                    "DOM":'<div id="imgBgColor"></div>',
                    "custom": true,
                    "onload": function () {
                        $('#imgBgColor').html('');
                        $('#imgBgColor').AdvanceBackground({
                            targetParent: $activeDOM.parent(),
                            targetElem: $activeDOM,
                            options: ["color"]
                        });
                    }
                },
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    },
                    "selectLayer": function ($elem) {
                        return $activeDOM.find('img');
                    }
                },
                "Box Radius": {
                    "options": {
                        "max": 500,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    },
                    "selectLayer": function ($elem) {
                        return $elem.closest('.editor-component').find("img");
                    },
                },
                "Box Shadow": {
                    "options": {

                    },
                    "selectLayer": function ($elem) {
                        return $elem.closest('.editor-component').find("img");
                    },
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            }
        },
        "view": {
            "view": function () {
                this.library.one();
            },
            "library": {
                "one": function () {

                }
            }
        },
        "common": {
            "$parent": function () {
                return $activeDOM;
            },
            "$image": function () {
                return this.$parent().find('img');
            },
            "ImageWidthChange": function (space, $par, ref) {
                ReplaceClassByPattern(ref.$image(), 'W-[0-9]{1,4}', 'W-' + space);
                ReplaceClassByPattern(ref.$parent(), 'W-[0-9]{1,4}', 'W-' + space);
            },
            "ImageHeightChange": function (space, $par, ref) {
                ReplaceClassByPattern(ref.$image(), 'H-[0-9]{1,4}', 'H-' + space);
                ReplaceClassByPattern(ref.$parent(), 'H-[0-9]{1,4}', 'H-' + space);
            },
            "ImageHeightWidthChange": function (space, $par, ref) {
                ref.ImageHeightChange(space, $par, ref);
                ref.ImageWidthChange(space, $par, ref);
            },
            "imageheight": function () {
                let imageHeight = GetValueByClassName(this.$image(), 'H-[0-9]{1,4}', 'H-');
                imageHeight = imageHeight == 0 ? this.$image().height() : imageHeight;
                AdvanceSageSlider($('#imageHeightSlider'), $('#imageHeightHandle'), 1, 1080, imageHeight, this.ImageHeightChange, this.$parent(), 'px', this);
            },
            "imageheightWidth": function () {
                let imageWidth = GetValueByClassName(this.$image(), 'H-[0-9]{1,4}', 'H-');
                imageWidth = imageWidth == 0 ? this.$image().height() : imageWidth;
                AdvanceSageSlider($('#imageRoundSlider'), $('#imageRoundHandle'), 1, 1080, imageWidth, this.ImageHeightWidthChange, this.$parent(), 'px', this);
            },
            "RemoveImageHeightWidth": function () {
                this.RemoveImageHeight();
                this.RemoveImageWidth();
            },
            "RemoveImageHeight": function () {
                ReplaceClassByPattern(this.$image(), 'H-[0-9]{1,4}', '');
                ReplaceClassByPattern(this.$parent(), 'H-[0-9]{1,4}', '');
            },
            "RemoveImageWidth": function () {
                ReplaceClassByPattern(this.$image(), 'W-[0-9]{1,4}', '');
                ReplaceClassByPattern(this.$parent(), 'W-[0-9]{1,4}', '');
            },
            "SFImageWidthChange": function (space, $par, ref) {
                ReplaceClassByPattern(ref.$parent(), 'sfCol_[0-9]{1,3}', 'sfCol_' + space);
            },
            "imagewidth": function () {
                AdvanceSageSlider($('#imagesizeSlider'), $('#imagesizeHandle'), 1, 100, GetValueByClassName(this.$parent(), 'sfCol_[0-9]{1,3}', 'sfCol_'), this.SFImageWidthChange, this.$parent(), '%', this);
            },
            "ImageInit": function ($parent) {
                var $image = $parent.find('img');
                LoadSettings();
                function LoadSettings() {
                    ImageDisplay();
                    ImageWidthEvent();
                    //ImageBorder();
                    ImageFitCover();
                }
                function ImageDisplay() {
                    var imageHeight = $parent.height();
                    var imageWidth = $parent.width();
                    var imageRadius = parseInt($parent.css('border-top-left-radius').replace('%', ''));
                    if (imageRadius > 0) {
                        $('.rectangleOption').hide();
                        $('.roundOption').show();
                        $('#imageDisplay').val('round');
                    } else {
                        $('.rectangleOption').show();
                        $('.roundOption').hide();
                        $('#imageDisplay').val('rectangle');
                    }
                    $('#imageDisplay').on('change', function () {
                        var $this = $(this);
                        var val = $this.val();
                        switch (val) {
                            case 'round':
                                $('.rectangleOption').hide();
                                $('.roundOption').show();
                                ChangeRoundImageWidth();
                                $parent.addClass('round-image');
                                let sfRegex = new RegExp('\\b[a-z]{0,1}sfCol_[0-9]{1,4}\\b', 'g');
                                let sfClasses = $parent.attr('class').match(sfRegex);
                                if (sfClasses !== undefined && sfClasses.length > 0)
                                    $parent.attr('data-width', sfClasses.join(' '));
                                $.each(sfClasses, function (i, o) {
                                    $parent.removeClass(o);
                                });
                                break;
                            case 'rectangle':
                                let height = $image.height();
                                $('.rectangleOption').show();
                                $('.roundOption').hide();
                                $image.css({ 'border-radius': '' });
                                $parent.css({ 'border-radius': '' });
                                $('#imageRadiusSlider').slider('value', 0);
                                $('#imageRadiusHandle').text(0);
                                $parent.removeClass('round-image');
                                ChangeSliderValue($('#imageHeightSlider'), height);
                                let regex = new RegExp('\\b[a-z]{0,1}W-[0-9]{1,4}\\b', 'g');
                                let classes = $parent.attr('class').match(regex);
                                $.each(classes, function (i, o) {
                                    $image.removeClass(o);
                                    $parent.removeClass(o);
                                });
                                let imgWidth = $parent.attr('data-width');
                                if (imgWidth !== undefined)
                                    $parent.addClass(imgWidth);
                                ReplaceClassByPattern($image, 'H-[0-9]{1,4}', 'H-' + height);
                                ReplaceClassByPattern($parent, 'H-[0-9]{1,4}', 'H-' + height);
                                break;
                        }
                    });

                    ManualHeightEntryEvents();
                    ImageBoxRadius();
                    RoundImageWidth();
                }
                function ManualHeightEntryEvents() {
                    $('#refresImageWidth').on('click', function () {
                        component["image"].common.RemoveImageHeightWidth();
                        setTimeout(function () {
                            var holderheights = $image.height();
                            ChangeSliderValue($('#imageHeightSlider'), holderheights);
                        }, 100);
                    });
                    component["image"].common.imageheight();
                }
                function ImageBoxRadius() {
                    //'border-radius'
                    var boxRadius = 0;
                    boxRadius = $parent.attr('border-radius');

                    function ImageBoxRadius(space) {
                        $parent.css({ 'border-radius': space + 'px' });
                        $image.css({ 'border-radius': space + 'px' });
                    }
                    AdvanceSageSlider($('#imageRadiusSlider'), $('#imageRadiusHandle'), 0, 100, boxRadius, ImageBoxRadius, $parent, 'px');
                }

                function RoundImageWidth() {
                    component["image"].common.imageheightWidth();
                }

                function ChangeRoundImageWidth() {
                    var roundImageWidth = 0;
                    var imgHeight = parseInt($parent.width());
                    var imgWidth = parseInt($parent.height());
                    roundImageWidth = imgWidth;
                    if (imgHeight < imgWidth) {
                        roundImageWidth = imgHeight;
                    }
                    let _common = component["image"].common;
                    _common.ImageHeightWidthChange(roundImageWidth, $parent, _common);
                    $image.css({
                        'border-radius': '50%'
                    });
                    $parent.css({
                        'border-radius': '50%'
                    });
                    $('#imageRoundSlider').slider('value', roundImageWidth);
                    $('#imageRoundHandle').text(roundImageWidth);
                }
                function ImageWidthEvent() {
                    component["image"].common.imagewidth();
                }
                function ImageBorder() {
                    var imageBorderStyle = $parent[0].style.borderStyle; //.css('border-style');
                    $('#imgBorderStyle').val(imageBorderStyle);
                    if (imageBorderStyle.length === 0 || imageBorderStyle === 'none') {
                        $('.imgborder').hide();
                    } else {
                        $('.imgborder').show();
                    }

                    $('#imgBorderStyle').on('change', function () {
                        var style = $(this).val();
                        $parent.css('border-style', style);
                        if (style === 'none') {
                            $('.imgborder').hide();
                            $parent.css("border-width", '0px');
                            $('#imgBorderSlider').slider('value', 0);
                            $('#imgBorderHandle').text(0);
                        } else {
                            $('.imgborder').show();
                            var imgBordeVal = parseInt($('#imgBorderHandle').text());
                            if (imgBordeVal == 0)
                                imgBordeVal = 1;
                            $parent.css("border-width", imgBordeVal + 'px');
                            $('#imgBorderSlider').slider('value', imgBordeVal);
                            $('#imgBorderHandle').text(imgBordeVal);
                        }
                    });

                    var imgBorderWidth = $parent[0].style.borderWidth; // $parent.css("border-width");
                    if (imgBorderWidth.length > 0) {
                        imgBorderWidth = parseInt(imgBorderWidth.replace('px', ''));
                    } else {
                        imgBorderWidth = 1;
                    }

                    function RowSepHeight(space) {
                        $parent.css("border-width", space + 'px');
                    }
                    AdvanceSageSlider($('#imgBorderSlider'), $('#imgBorderHandle'), 1, 10, imgBorderWidth, RowSepHeight, $parent, 'px');
                    ImgBorderColor();
                }
                function ImgBorderColor() {
                    $('#imgBorderColor').css('background-color', $parent[0].style.borderColor);
                    var colorPickerOption = ColorPickerOption({
                        renderCallback: function ($elm, toggled) {
                            var objColor = RenderCallBackColor(this);
                            $parent.css({ 'border-color': objColor.bgColor });
                        }
                    });
                    $('#imgBorderColor').colorPicker(colorPickerOption);
                }
                function ImageFitCover() {
                    if ($parent.hasClass('fit-image')) {
                        $('#imageFittoCover').prop('checked', true);
                    } else {
                        $('#imageFittoCover').prop('checked', false);
                    }

                    $('#imageFittoCover').off().on('click', function () {
                        if ($(this).is(':checked')) {
                            $parent.addClass('fit-image');
                        } else {
                            $parent.removeClass('fit-image');
                        }
                    });
                }
            }
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "imagerespo": {
                            "DOM": EasyLibrary.ReadDOM("imagebasictab"),
                            "prepend": "true",
                            "onload": function () {
                                component["image"].common.ImageInit($activeDOM);
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
    }
};