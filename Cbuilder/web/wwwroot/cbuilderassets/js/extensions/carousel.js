var carousel = {
    "carousel": {
        "componentname": "carousel",
        "category": "advance",
        "icon": "icon-icon-row",
        "row": false,
        "hidden": true,
        "collection": false,
        "bucket": true,
        "type": "carousel",
        "defaultdata": EasyLibrary.ReadDOM("carouseldata"),
        "pageload": function () {
            let $imageSlider = $('.ImageSliderWrapper');
            $imageSlider.removeClass('binded');
            $imageSlider.each(function (index, value) {
                let carousel = new CarouselInit($(this));
            });
        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            let $slider = $appendLayer.find('.ImageSliderWrapper');
            $slider.removeClass('binded');
            //$slider.parent().attr('data-id', 'sl_' + Math.floor((Math.random() * 1000) + 100));
            var carousel = new CarouselInit($slider);
        },
        "onsort": function (ui) {
            let $imageSlider = ui.find('.ImageSliderWrapper');
            $imageSlider.removeClass('binded');
            let carousel = new CarouselInit($imageSlider);
        },
        "loadSetting": function ($item) { },
        "common": {
            "InitHeading": function ($item, $parent) {
                $('#showHeadingCarousel').off().on('click', function () {
                    let $imageWrapper = $parent.find('.itemWrapper');
                    if ($(this).is(':checked')) {
                        $imageWrapper.find('.carouselheading').removeClass('Dn');
                        SettingEvents();
                    } else {
                        $imageWrapper.find('.carouselheading').addClass('Dn');

                    }
                    // component.carousel.settingDOMs.tabs.Data.onload($item);
                    component.carousel.managedata.option.onappend($item);
                });
                $('#showParagraphCarousel').off().on('click', function () {
                    let $imageWrapper = $parent.find('.itemWrapper');
                    if ($(this).is(':checked')) {
                        $imageWrapper.find('.carouselParagraph').removeClass('Dn');
                        SettingEvents();
                    } else {
                        $imageWrapper.find('.carouselParagraph').addClass('Dn');
                    }
                    //component.carousel.settingDOMs.tabs.Data.onload($item);
                    component.carousel.managedata.option.onappend($item);
                });

                $('#showrReadMoreCarousel').off().on('click', function () {
                    let $imageWrapper = $parent.find('.itemWrapper');
                    if ($(this).is(':checked')) {
                        $imageWrapper.find('.button').removeClass('Dn');
                    } else {
                        $imageWrapper.find('.button').addClass('Dn');
                    }
                    component.carousel.managedata.option.onappend($item);

                });
            },
            "selectedLayer": function () {
                let $parent = $activeDOM;
                if ($activeDOM.hasClass('cRow')) {
                    $parent = $activeDOM.find('.ImageSliderDOM');
                }
                return $parent;
            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("carouselbasic"),
                    "onload": function ($item) {
                        let $parent = component["carousel"].common.selectedLayer();

                        if ($parent.hasClass('.editor-row-shaded-layer'))
                            $parent = $parent.parent();
                        let $imageWrapper = $parent.find('.itemWrapper');
                        LoadSettings();
                        InitEvents();

                        function LoadSettings() {
                            let $firstSlider = $imageWrapper.eq(0);
                            let c = $firstSlider.find('.textWrapper').attr('class').match(/container-(\w+)/g);
                            if (c != null) {
                                $('#carContainerWidth').val(c[0]);
                            }

                            if ($parent.hasClass('fullpagebanner')) {
                                $('#heightAdjustCarousel').prop('checked', true);
                                $('#heightadjust').hide();
                            } else {
                                $('#heightAdjustCarousel').prop('checked', false);
                                $('#heightadjust').show();
                            }
                            if ($parent.find('.arrows-wrapper').hasClass('Dn')) {
                                $('#showArrowCarousel').prop('checked', false);
                            } else {
                                $('#showArrowCarousel').prop('checked', true);
                            }
                            if ($parent.find('.pager-dot').hasClass('Dn')) {
                                $('#showDotsCarousel').prop('checked', false);
                                $('#sliderDotsGeneric').addClass('Dn');
                            } else {
                                $('#showDotsCarousel').prop('checked', true);
                                $('#sliderDotsGeneric').removeClass('Dn');
                            }

                            let tranType = $parent.attr('data-transition');
                            if (typeof (tranType) !== "undefined")
                                $('#carouselAnimation').val(tranType);
                            let loop = $parent.attr('data-loop');
                            if (typeof loop !== "undefined" && loop.length > 0) {
                                $('#AutoSlideCarousel').prop('checked', true);
                            } else {
                                $('#AutoSlideCarousel').prop('checked', false);
                            }
                            if ($firstSlider.find(".carousel-shade").length > 0) {
                                $('#carouselShadedLayer').prop('checked', true);
                                $('.caroselShadeCP').removeClass('Dn');
                            } else {
                                $('#carouselShadedLayer').prop('checked', false);
                                $('.caroselShadeCP').addClass('Dn');
                            }
                            loadShadePicker();

                            //Slider dots setting init
                            $("#sliderDotsGeneric").AdvanceSliderDots({
                                targetParent: $activeDOM,
                                targetElem: '.dots',
                                targetSliderWrap: '.ImageSliderWrapper',
                                targetActiveDot: '.active-dot',
                                sliderShape: true,
                                dotsSize: true,
                                callback: {

                                }
                            });
                        }

                        function InitEvents() {
                            $('#carContainerWidth').off('change').on('change', function () {
                                let v = $(this).val();
                                let $textWrapper = $imageWrapper.find('.textWrapper');
                                $textWrapper.removeClass('editor-row-container').removeClass('container-small').removeClass('container-medium').removeClass('container-large').removeClass('container-extralarge').removeClass('container-fluid');
                                if (v.length > 0) {
                                    $textWrapper.addClass('editor-row-container').addClass(v);
                                }
                            });

                            $('#heightAdjustCarousel').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    //remove height classes
                                    $parent.removeClass(function (i, cl) {
                                        return (cl.match(/\bH-[0-9]{1,3}\b/g) || []).join(' ');
                                    });
                                    $parent.find('.ImageSlider').removeClass(function (i, cl) {
                                        return (cl.match(/\bH-[0-9]{1,3}\b/g) || []).join(' ');
                                    });
                                    $parent.addClass('fullpagebanner');
                                    AdjustSizeFullpage($parent);
                                    $('#heightadjust').hide();
                                } else {
                                    RemoveCarouselHeight($parent);
                                    let d = ViewDeviceAlpha();
                                    let regex = new RegExp('\\b' + d + 'H-([0-9]{1,3})' + '\\b', 'g');
                                    let hCls = $parent.attr('class').match(regex);
                                    let h = 620;
                                    if (hCls !== null && hCls[0]) {
                                        h = hCls[0].replaceAll(d + 'H-', '');
                                    }
                                    ChangeSliderValue($('#carouselHeightSlider'), h);
                                    $parent.removeClass('fullpagebanner');
                                    $('#heightadjust').show();
                                }
                            });

                            component["carousel"].common.InitHeading($item, $parent);
                            $('#showArrowCarousel').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    $parent.find('.arrows-wrapper').removeClass('Dn');
                                } else {
                                    $parent.find('.arrows-wrapper').addClass('Dn');
                                }
                            });
                            $('#showDotsCarousel').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    $parent.find('.pager-dot').removeClass('Dn');
                                    $('#sliderDotsGeneric').removeClass('Dn');
                                } else {
                                    $parent.find('.pager-dot').addClass('Dn');
                                    $('#sliderDotsGeneric').addClass('Dn');
                                }
                            });
                            $('#carouselAnimation').off().on('change', function () {
                                let type = $(this).val();
                                $parent.attr('data-transition', type);
                                $parent.find('.ImageSliderWrapper').removeClass('binded');
                                InitCarouselSlider($parent.find('.ImageSliderWrapper'));
                            });
                            $('#AutoSlideCarousel').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    $parent.attr('data-loop', "loop");
                                } else {
                                    $parent.attr('data-loop', "");
                                }
                                $parent.find('.ImageSliderWrapper').removeClass('binded');
                                InitCarouselSlider($parent.find('.ImageSliderWrapper'));
                            });
                            let itemsPerSlider = DeviceItemPerView($parent.attr('data-perslider'));
                            //if (typeof ($parent.attr('data-perslider')) !== "undefined") {
                            //    itemsPerSlider = parseInt($parent.attr('data-perslider'));
                            //}
                            $('#itemsperslider').val(itemsPerSlider);
                            $('#itemsperslider').on('change', function () {
                                let $this = $(this);
                                let perSlider = $this.val();
                                $parent.attr('data-perslider', SetDeviceItemPerView($parent.attr('data-perslider'), perSlider));
                                $parent.find('.ImageSliderWrapper').removeClass('binded');
                                InitCarouselSlider($parent.find('.ImageSliderWrapper'));
                            });
                            component["carousel"].common1.sliderheight();
                            $("#carouselShadedLayer").off().on("click", function () {
                                if ($(this).is(':checked')) {
                                    $('.caroselShadeCP').removeClass('Dn');
                                    addShade();
                                } else {
                                    $('.caroselShadeCP').addClass('Dn');
                                    removeShade();
                                }
                            });
                        }

                        function loadShadePicker() {
                            $('#carouselShadeColor').css('background-color', getDefaultShadeColor());
                            let colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    let objColor = RenderCallBackColor(this);
                                    $parent.find('.carousel-shade').css({ 'background-color': objColor.bgColor });
                                    $parent.attr('data-shadecolor', objColor.bgColor);
                                }
                            });
                            $('#carouselShadeColor').colorPicker(colorPickerOption);
                        }

                        function getDefaultShadeColor() {
                            let defColor = $parent.attr('data-shadecolor');
                            if (typeof defColor === 'undefined') {
                                defColor = 'rgba(255,255,255,0.5)';
                            }
                            return defColor;
                        }

                        function addShade() {
                            let defColor = getDefaultShadeColor();
                            $parent.find('.itemWrapper').each(function () {
                                $(this).find('.carousel-shade').remove();
                                $(this).prepend('<div class="carousel-shade" style="width: 100%;height: 100%; position:absolute; background-color: ' + defColor + ';">');
                            });
                            $parent.attr('data-shadecolor', defColor);
                        }

                        function removeShade() {
                            $parent.find(".carousel-shade").remove();
                        }
                    }
                },
                "Text": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('carouseltext'),
                    "onload": function ($item) {
                        let $parent = component["carousel"].common.selectedLayer();
                        $('#settingsFor').off('change').on('change', function () {
                            let selected = $(this).val();
                            $('#headSetting').addClass('Dn');
                            $('#paraSetting').addClass('Dn');
                            $(`#${selected}Setting`).removeClass('Dn');
                        });
                        $("#carHeadSet").AdvanceTextSetting({
                            targetParent: $parent,
                            targetElem: '.carouselheading > h1.editor-para',
                        });
                        $("#carParaSet").AdvanceTextSetting({
                            targetParent: $parent,
                            targetElem: '.carouselParagraph > p.editor-para'
                        });
                    }
                },

                "Spacing": {
                    "custom": true,
                    "DOM": `<div class="field-row">
                                <div class="field-row stElWrap col40-60">
                                    <label class="fCol">Settings for</label>
                                    <span class="fCol select__box">
                                        <select id="spacingFor">
                                            <option value="car">Carousel</option>
                                            <option value="head">Heading</option>
                                            <option value="para">Paragraph</option>
                                            <option value="button">Button</option>
                                        </select>
                                    </span>
                                </div>
                            </div>
                            <div id="carSpacing">
                                <div id='carMarSet'></div>
                                <div id='carPadSet'></div>
                            </div>
                            <div id="headSpacing" class ="Dn">
                                <div id='headMarSet'></div>
                            </div>
                            <div id="paraSpacing" class ="Dn">
                                <div id='paraMarSet'></div>
                            </div>
                            <div id="buttonSpacing" class ="Dn">
                                <div id='buttonMarSet'></div>
                            </div>`,
                    "onload": function () {
                        $('#spacingFor').off('change').on('change', function () {
                            let selected = $(this).val();
                            $('#carSpacing').addClass('Dn');
                            $('#headSpacing').addClass('Dn');
                            $('#paraSpacing').addClass('Dn');
                            $('#buttonSpacing').addClass('Dn');
                            $(`#${selected}Spacing`).removeClass('Dn');
                        });
                        let $parent = component["carousel"].common.selectedLayer();
                        $('#carMarSet').AdvanceSpacing({
                            targetParent: $parent.parent(),
                            targetElem: $parent,
                            options: {
                                "margin": {
                                    "max": 80,
                                    "min": -80,
                                    "times": 5,
                                    "position": ["all", "top", "left", "bottom", "right"]
                                },
                            }
                        });
                        $('#carPadSet').AdvanceSpacing({
                            targetParent: $parent,
                            targetElem: '.itemWrapper',
                            options: {
                                "padding": {
                                    "max": 80,
                                    "min": 0,
                                    "times": 5,
                                    "position": ["all", "top", "left", "bottom", "right"]
                                }
                            }
                        });
                        //head
                        $('#headMarSet').AdvanceSpacing({
                            targetParent: $parent,
                            targetElem: '.carHeadChild',
                            options: {
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
                        });
                        //para
                        $('#paraMarSet').AdvanceSpacing({
                            targetParent: $parent,
                            targetElem: '.carParaChild',
                            options: {
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
                        });
                        //button
                        $('#buttonMarSet').AdvanceSpacing({
                            targetParent: $parent,
                            targetElem: '.button',
                            options: {
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
                        });
                    }
                },

                "Alignment": {
                    custom: true,
                    DOM: '<div id="carAlign"></div>',
                    onload: function () {
                        let $parent = component["carousel"].common.selectedLayer();
                        $('#carAlign').AdvanceAlignment({
                            targetParent: $parent,
                            targetElem: 'li.itemWrapper, .carouselheading, .carouselParagraph',
                            options: {
                                "horizontal": ["left", "center", "right"],
                                "vertical": ["top", "middle", "bottom"]
                            }
                        });
                    }
                },
            },
            "selectLayer": function ($elem) {
                return component["carousel"].common.selectedLayer();
            },
        },
        "styleDOMs": {
            "tabs": {
                "Box Shadow": {
                    "options": {}
                },

                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    }
                }
            },
            "selectLayer": function ($elem) {
                return component["carousel"].common.selectedLayer();
            },
        },
        "managedata": {
            "option": {
                heading: "Manage Image Slider",
                data: EasyLibrary.ReadDOM("carouseltabdom"),
                carouselbtnDOM: EasyLibrary.ReadDOM("carouselbtn"),
                showheading: true,
                width: "50%",
                height: "80%",
                advance: false,
                onappend: function ($wrapper) {
                    let carBtnTmp = this.carouselbtnDOM;
                    let $parent = component["carousel"].common.selectedLayer();
                    if ($parent.length == 0) {
                        console.error("no activedom ", $parent);
                    }
                    let $imageWrapper = $parent.find('.itemWrapper');
                    let deleteIcon = '<div class="Remove" style="position: absolute; left: 0; top: 0; padding: 5px; font-size: 12px; cursor: pointer; color: white; background-color: #e14a4a;">' + '<i class="fa fa-trash deleteCarouselItem" style="display: inline-block; vertical-align: middle;" title="delete"></i>' + divEnd;
                    let DragIcon = '<span class="fcol cPointer sfCol_6"><i class="fa Ml-5 Fs-20  ImageSort fa fa-arrows-v"></i></span>';
                    let $item = $(this);
                    LoadSettings();
                    initImages();
                    initEvents();
                    InitEvent();
                    //-------------------------------------loadsetting---------------------------------------
                    function LoadSettings() {
                        if ($parent.hasClass('.editor-row-shaded-layer'))
                            $parent = $parent.parent();

                        let $firstSlider = $imageWrapper.eq(0);
                        let contains = $firstSlider.find('img');
                        if (contains.length > 0) {
                            $('#showImageCarousel').prop('checked', true);
                        } else {
                            $('#showImageCarousel').prop('checked', false);
                        }
                        carouselheading = $firstSlider.find('.carouselheading').hasClass('Dn');
                        $('#showHeadingCarousel').prop('checked', !carouselheading);
                        carouseParagraph = $firstSlider.find('.carouselParagraph').hasClass('Dn');
                        $('#showParagraphCarousel').prop('checked', !carouseParagraph);
                        carouseButton = $firstSlider.find('.button').hasClass('Dn');
                        $('#showrReadMoreCarousel').prop('checked', !carouseButton);
                    }
                    //--------------------------------------initEvent--------------------------------------
                    function InitEvent() {
                        $('#showImageCarousel').off().on('click', function () {
                            if ($(this).is(':checked')) {
                                $parent.find('.itemWrapper').each(function (i, o) {
                                    if ($(o).hasClass('hideimage')) {
                                        $(o).removeClass('hideimage');
                                        let src = $(o).attr('data-imgsrc');
                                        $(o).prepend('<img src="' + src + '" style="width: 100%; height: 100%; object-fit: cover;">');
                                    } else {
                                        let image = '<img  src="' + webbuildermodulepath + '/cbuilderassets/img/def1.jpg" style="width: 100%; height: 100%; object-fit: cover;">';
                                        $(o).prepend(image);
                                    }
                                });
                                //if ($parent.find('.hideimage').length > 0) {
                                //    $parent.find('.hideimage').each(function () {
                                //        $(this).removeClass('hideimage');
                                //        let src = $(this).attr('data-imgsrc');
                                //        $(this).prepend('<img src="' + src + '" style="width: 100%; height: 100%; object-fit: cover;">');
                                //    });
                                //} else {
                                //    let image = '<img  src="' + webbuildermodulepath + '/img/def1.jpg" style="width: 100%; height: 100%; object-fit: cover;">';
                                //    $imageWrapper.prepend(image);
                                //}
                            } else {
                                $parent.find('img').each(function () {
                                    let $im = $(this);
                                    $im.parent().attr('data-imgsrc', $im.attr('src')).addClass('hideimage');
                                    $im.remove();
                                });
                            }
                            component.carousel.managedata.option.onappend($item);
                        });
                        component["carousel"].common.InitHeading($item, $parent);
                    }
                    //-------------------------------------------------------------------------------------

                    function initImages() {
                        let $imageSliderWrapper = $parent.find('.itemsWrapper');
                        let $carousels = $imageSliderWrapper.find('.itemWrapper');
                        let items = $carousels.length;
                        if (items < 1) {
                            console.log("No items ", $parent, $imageSliderWrapper);
                        }
                        orderSerttingDOM();
                        let sort_pos = [];
                        $('.sortablecomponent > .popup-item-sort').each(function () {
                            sort_pos.push($(this).attr('data-sort'));
                        });
                        let carouselDOM = '<ul class="Dfx flxWrp" style="position: relative; padding: 0; margin: 0; list-style: none;">';
                        for (let i = 0; i < items; i++) {
                            let $elem = $carousels.eq(i);
                            carouselDOM += '<li class="sfCol_100 item-image" style="padding: 0; margin: 0; list-style: none;width: 100%; margin-right: 3%; margin-bottom: 25px; position: relative;">';
                            carouselDOM += '<div class="carouselItem">';
                            carouselDOM += '<div class="imgWrapper"><img src="' + $elem.find('img').attr('src') + ' " />';
                            if ($("#showImageCarousel").is(':checked')) {
                                carouselDOM += '<span class="caro_img_ch" style="cursor:pointer; font-size:12px;">Change Image</span>';
                            }
                            carouselDOM += '</div><div class="textWrapper">';

                            sort_pos.forEach(function (d, i) {
                                let t = d.toLowerCase();
                                switch (t) {
                                    case 'carheading':
                                        if ($("#showHeadingCarousel").is(':checked'))
                                            carouselDOM += '<h1 contenteditable="true" class="carheading" style="position: relative;font-size: 14px;font-weight: 700;padding: 0 10px; height: 48px; line-height: 150%; border: solid 1px rgba(0,0,0,0.2); overflow: hidden; margin: 0; margin-bottom: 5px;">' + $elem.find('h1').text() + ' </h1>';
                                        break;
                                    case 'carparagraph':
                                        if ($("#showParagraphCarousel").is(':checked'))
                                            carouselDOM += '<p contenteditable="true" class="carparagraph" style="position: relative;font-size: 12px;font-weight: 300;padding: 0 10px; height: 48px; line-height: 150%; border: solid 1px rgba(0,0,0,0.2); overflow: hidden; margin: 0; margin-bottom: 5px;">' + $elem.find('p').text() + ' </p>';
                                        break;
                                }
                            });

                            carouselDOM += divEnd;
                            carouselDOM += DragIcon;
                            carouselDOM += divEnd;
                            carouselDOM += deleteIcon;
                            carouselDOM += '</li>';
                        }
                        $('#imagecollection').html(carouselDOM);
                        DeleteRow();
                        $('#imagecollection').find('img').each(function () {
                            let $this = $(this);
                            $this.on('click', function () {
                                let media = $this.SageMedia({
                                    onSelect: function (src, response, type, filename, extension) {
                                        src = typeof (src) !== "undefined" && src !== "" ? src.replace(/\/{2,}/g, '/') : src;
                                        $this.attr('src', src);
                                        let index = $('#imagecollection').find('img').index($this);
                                        $parent.find('.itemWrapper').find('img').eq(index).attr('src', src);
                                    },
                                    mediaType: 'image',
                                    extension: 'png,jpeg,jpg,ico,svg,gif,webp'
                                });
                                media.Show();
                            });
                        });
                        $(document).off("click", ".caro_img_ch").on("click", ".caro_img_ch", function () {
                            let $this = $(this);
                            let media = $this.SageMedia({
                                onSelect: function (src, response, type, filename, extension) {
                                    src = typeof (src) !== "undefined" && src !== "" ? src.replace(/\/{2,}/g, '/') : src;
                                    $this.prev('img').attr('src', src);
                                    let index = $('#imagecollection').find('.caro_img_ch').index($this);
                                    let $row = $parent.find('.itemWrapper').eq(index);
                                    let $img = $row.find('img');
                                    if ($img.length > 0) {
                                        $img.attr('src', src);
                                    } else {
                                        $row.append('<img src="' + src + '" style="width: 100%; height: 100%; object-fit: cover;">');
                                    }
                                },
                                mediaType: 'image',
                                extension: 'png,jpeg,jpg,ico,svg,gif,webp'
                            });
                            media.Show();
                        });
                        $('#imagecollection').find('li').each(function () {
                            initTextEdit($(this));
                        });
                    }

                    function initEvents() {
                        $('#btnAddnewCarousel').off().on('click', function () {
                            let $imageSliderWrapper = $parent.find('.itemsWrapper');
                            let $carousels = $('#imagecollection').find('ul li');
                            let slider = '';
                            if ($("#showImageCarousel").is(':checked')) {
                                let media = $(this).SageMedia({
                                    onSelect: function (src, response, type, filename, extension) {
                                        src = typeof (src) !== "undefined" && src !== "" ? src.replace(/\/{2,}/g, '/') : src;
                                        AppendImage(src);
                                    },
                                    mediaType: 'image',
                                    extension: 'png,jpeg,jpg,ico,svg,gif,webp'
                                });
                                media.Show();
                            }
                            else {
                                AppendImage('');
                            }
                            function AppendImage(src) {
                                let newHtml = '';
                                let img = '', img2 = '';
                                if ($('#carouselShadedLayer').is(':checked')) {
                                    img += '<div class="carousel-shade" style="width: 100%;height: 100%; position:absolute; background-color: ' + getDefaultShadeColor() + ';"></div>';
                                }
                                if (src.length > 0) {
                                    img += '<img src="' + src + '" style="width: 100%; height: 100%; object-fit: cover;">';
                                    img2 += '<img src="' + src + '">';
                                }
                                let text = '';
                                let data = '';
                                let s_align = 'TxAl-l TxAl-m';
                                let s_head_style = 'editor-para carHeadChild Mt-0 Mb-0 ff-montserrat f-weight-100 Fs-96 mFs-20 tFs-20';
                                let s_para_style = 'editor-para carParaChild slidercom Mt-0 Mb-0 tFs-16 mFs-15 Lh-47 Fs-25 ff-montserrat f-weight-100';
                                let textWrapStyle = 'textWrapper editor-row-container container-extralarge';
                                let tmpSlides = $imageSliderWrapper.find('.itemWrapper');
                                let tmpHead = false;
                                let tmpPara = false;
                                let _textOptionClone = $(textOption).clone();
                                _textOptionClone.find('li.deletehelper').remove();
                                _textOptionClone.find('span.sortComponent').remove();
                                _textOptionClone.addClass("no-drag");
                                let _textOption = _textOptionClone.wrapAll('<div />').parent().html();
                                if (tmpSlides.length > 0) {
                                    let $first = tmpSlides.eq(0);
                                    let tmpClass = $first.attr('class').match(/([a-z]?)TxAl-([a-z])/g);
                                    if (tmpClass.length > 0) {
                                        s_align = tmpClass.join(' ');
                                    }
                                    s_head_style = $first.find('h1.carHeadChild').attr('class');
                                    s_para_style = $first.find('p.carParaChild').attr('class');
                                    textWrapStyle = $first.find('div.textWrapper').attr('class');
                                    carBtnTmp = $first.find('div.button').clone().wrapAll('<div/>').parent().html();
                                }

                                let data_pos = [];
                                $('.sortablecomponent > .item-sort ').each(function () {
                                    data_pos.push($(this).attr('data-refer'));
                                });
                                data_pos.forEach(function (d, i) {
                                    let t = d.toLowerCase();
                                    switch (t) {
                                        case 'carouselheading':
                                            if ($("#showHeadingCarousel").is(':checked')) {
                                                data += '<h1 contenteditable="true" style="position: relative;font-size: 14px; font-weight: 700; padding: 0 10px; height: 48px; line-height: 150%; border: solid 1px rgba(0,0,0,0.2); overflow: hidden; margin: 0; margin-bottom: 5px;">This is heading</h1>';
                                                text += DOMCreate('div', _textOption + '<h1 contenteditable="true" data-spacecollection="carHeadChild" class="' + s_head_style + '" style="color: rgb(255, 255, 255);">This is heading </h1>', 'editor-component com-heading carouselheading slidercom sfCol_100 carHeadPar ' + s_align + ' carHeadPar', '', ['data-childCollection="carHeadChild"', 'data-parCollection="carHeadPar"', 'data-alignCollection="carHeadPar"', 'data-ForSort="caroheading"', 'data-type="text"']);
                                            }
                                            else {
                                                data += '<h1 class="Dn" contenteditable="true" style="position: relative;font-size: 14px; font-weight: 700; padding: 0 10px; height: 48px; line-height: 150%; border: solid 1px rgba(0,0,0,0.2); overflow: hidden; margin: 0; margin-bottom: 5px;">This is heading</h1>';
                                                text += DOMCreate('div', _textOption + '<h1 contenteditable="true" data-spacecollection="carHeadChild" class="' + s_head_style + '" style="color: rgb(255, 255, 255);">This is heading </h1>', 'editor-component Dn com-heading carouselheading slidercom sfCol_100  carHeadPar ' + s_align + ' carHeadPar', '', ['data-childCollection="carHeadChild"', 'data-parCollection="carHeadPar"', 'data-alignCollection="carHeadPar"', 'data-ForSort="caroheading"', 'data-type="text"']);
                                            }
                                            break;
                                        case 'carouselparagraph':
                                            if ($("#showParagraphCarousel").is(':checked')) {
                                                data += '<p contenteditable="true" style="position: relative;font-size: 12px; font-weight: 300; padding: 0 10px; height: 48px; line-height: 150%; border: solid 1px rgba(0,0,0,0.2); overflow: hidden; margin: 0; margin-bottom: 5px;">Lorem Ipsums is simply dummy text of the printing and typesetting industry</p>';
                                                text += DOMCreate('div', _textOption + '<p contenteditable="true" data-spacecollection="carParaChild" class="' + s_para_style + '" style="color: rgb(255, 255, 255);">Lorem Ipsums is simply dummy text of the printing and typesetting industry</p>', 'editor-component com-heading carouselParagraph sfCol_100 ' + s_align + ' carParaPar', '', ['data-childCollection="carParaChild"', 'data-parCollection="carParaPar"', 'data-alignCollection="carParaPar"', 'data-ForSort="caroparagraph"', 'data-type="text"']);
                                            }
                                            else {
                                                data += '<p class="Dn" contenteditable="true" style="position: relative;font-size: 12px; font-weight: 300; padding: 0 10px; height: 48px; line-height: 150%; border: solid 1px rgba(0,0,0,0.2); overflow: hidden; margin: 0; margin-bottom: 5px;">Lorem Ipsums is simply dummy text of the printing and typesetting industry</p>';
                                                text += DOMCreate('div', _textOption + '<p contenteditable="true" data-spacecollection="carParaChild" class="' + s_para_style + '" style="color: rgb(255, 255, 255);">Lorem Ipsums is simply dummy text of the printing and typesetting industry</p>', 'editor-component com-heading carouselParagraph sfCol_100 ' + s_align + ' carParaPar Dn', '', ['data-childCollection="carParaChild"', 'data-parCollection="carParaPar"', 'data-alignCollection="carParaPar"', 'data-ForSort="caroparagraph"', 'data-type="text"']);
                                            }
                                            break;
                                        case 'button':
                                            if ($("#showrReadMoreCarousel").is(':checked')) {
                                                text += $(carBtnTmp).clone().removeClass('Dn').wrapAll('<div />').parent().html();
                                            }
                                            else {
                                                text += $(carBtnTmp).clone().addClass('Dn').wrapAll('<div />').parent().html();
                                            }
                                            break;
                                    }
                                });

                                slider = img;
                                if (text.length > 0) {
                                    slider += DOMCreate('div', text, textWrapStyle, '', ['style="position: absolute;top: 15%;left: 0;width: 100%;padding: 40px 15%;"']);
                                }
                                newHtml = '<div style="width: 20%; float: left;">' + img2;
                                if (src.length > 0) {
                                    newHtml += '<span class="caro_img_ch" style="cursor:pointer; font-size:12px;">Change Image</span>';
                                }
                                newHtml += '</div>' + DOMCreate('div', data, 'textWrapper', '', ['class="width: 80%; float: left; padding: 0 15px;"']);
                                newHtml = divStart("carouselItem") + newHtml + divEnd + DragIcon + deleteIcon;


                                $('#imagecollection').find('ul').append('<li class="sfCol_100" style="padding: 0; margin: 0; list-style: none;width: 100%; margin-right: 3%; margin-bottom: 25px; position: relative;">' + newHtml + '</li>');

                                $imageSliderWrapper.append(`<li class="itemWrapper ${s_align}" style="display: inline-block; height: 100%; background-repeat: no-repeat; background-size: cover; position: relative;">${slider}</li>`);
                                $parent.find('.ImageSliderWrapper').removeClass('binded');
                                InitCarouselSlider($parent.find('.ImageSliderWrapper'));

                                let $lastchild = $('#imagecollection').find('img').last();
                                $lastchild.on('click', function () {
                                    let media = $lastchild.SageMedia({
                                        onSelect: function (src, response, type, filename, extension) {
                                            src = typeof (src) !== "undefined" && src !== "" ? src.replace(/\/{2,}/g, '/') : src;
                                            $lastchild.attr('src', src);
                                            let index = $('#imagecollection').find('img').index($lastchild);
                                            $parent.find('.itemWrapper').find('img').eq(index).attr('src', src);
                                        },
                                        mediaType: 'image',
                                        extension: 'png,jpeg,jpg,ico,svg,gif,webp'
                                    });
                                    media.Show();
                                });
                                setTimeout(function () {
                                    $('#imagecollection').find('li').each(function () {
                                        initTextEdit($(this));
                                    });
                                });
                                component.carousel.managedata.option.onappend($item);
                                component["carousel"].common.InitHeading($item, $parent);
                                DeleteRow();
                                SettingEvents();
                                LoadSettings();
                            }
                        });
                        //orderSerttingDOM();
                    }
                    function initTextEdit($this) {
                        $this.find("h1").off().on('blur keyup', function () {
                            let index = $('#imagecollection').find('h1').index($this.find("h1"));
                            $parent.find('.itemWrapper').find('h1').eq(index).text($(this).text());
                        });

                        $this.find("p").off().on('blur keyup', function () {
                            let index = $('#imagecollection').find('p').index($this.find("p"));
                            $parent.find('.itemWrapper').find('p').eq(index).text($(this).text());
                        });
                    }

                    function DeleteRow() {
                        $('.deleteCarouselItem').off().on('click', function () {
                            let $this = $(this);
                            SageConfirmDialog('Do you want to delete.').done(function () {
                                let $slider = $this.parent().parent();
                                let index = $('#imagecollection').find('ul li').index($slider);
                                $slider.remove();
                                $parent.find('.itemWrapper').eq(index).remove();
                                $parent.find('.ImageSliderWrapper').removeClass('binded');
                                InitCarouselSlider($parent.find('.ImageSliderWrapper'));
                            });
                        });
                    }
                    function getDefaultShadeColor() {
                        let defColor = $parent.attr('data-shadecolor');
                        if (typeof defColor === 'undefined') {
                            defColor = 'rgba(255,255,255,0.5)';
                        }
                        return defColor;
                    }

                    function orderSerttingDOM() {
                        let orderedSetDOM = [];
                        let $slidertext = $parent.find(".textWrapper");
                        let $items = "";
                        for (let i = 0; i <= $slidertext.length; i++) {
                            let $searchitem = $slidertext.eq(i).find('.editor-component').attr('data-ForSort');
                            if ($searchitem !== undefined) {
                                $items = $slidertext.eq(i).find('.editor-component');
                                break;
                            }
                        }
                        let $itemcount = $items.length;
                        if ($itemcount > 0) {
                            $.each($items, function (index, value) {
                                var classN = $(value).attr('data-ForSort');
                                var ddd = $('.' + classN);
                                orderedSetDOM.push(ddd);
                            });
                            $('.sortablecomponent').html('');
                            $('.sortablecomponent').append(orderedSetDOM);
                        }
                    }

                    //-----------------------------heading text sort----------------------------------
                    let $SortHeadingParent = $parent.find('.textWrapper');
                    $(".carouselsort").AdvanceSorting({
                        targetParent: $SortHeadingParent,
                        targetElem: '.slidercom',
                        sortableOptions: {
                            items: "div.item-sort",
                            handle: ".sorter",
                            containment: 'div.carouselsort',
                            stop: function (event, ui) {
                                SortElement();
                                SortElementPopup();
                            }
                        }
                    });

                    function SortElement() {
                        let position = [];
                        $('.sortablecomponent > .item-sort ').each(function () {
                            position.push($(this).attr('data-refer'));
                        });
                        $parent.find('.itemWrapper >.textWrapper').each(function () {
                            let $this = $(this);
                            let length = position.length;
                            for (var i = 0; i < length; i++) {
                                $this.append($this.find(`.${position[i]}`));
                            }
                        });
                    }
                    function SortElementPopup() {
                        let position1 = [];
                        $('.sortablecomponent > .popup-item-sort').each(function () {
                            position1.push($(this).attr('data-sort'));
                        });
                        //$test = $('.fullpagepopup').find('.textWrapper');
                        $('.fullpagepopup').find('.textWrapper').each(function () {
                            let $this1 = $(this);
                            let length1 = position1.length;
                            for (var i = 0; i < length1; i++) {
                                $this1.append($this1.find(`.${position1[i]}`));
                            }
                        });
                    }
                    //--------------------------------------------------------------------------------

                    let $sortimages = $parent.find('.SliderWrapper');
                    $("#imagecollection").AdvanceSorting({
                        targetParent: $sortimages,
                        targetElem: '.itemWrapper',
                        sortableOptions: {
                            items: ".item-image",
                            handle: ".ImageSort",
                            containment: '#imagecollection'
                        }
                    });
                },

                onclose: function ($wrapper) {
                }
            }
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "CustomVisibility": {
                            custom: true,
                            "DOM": '<div id="imageSliderVis"></div>',
                            "onload": function () {
                                let $parent = component["carousel"].common.selectedLayer();
                                $('#imageSliderVis').AdvanceVisibility({
                                    targetParent: $parent.parent(),
                                    targetElem: $parent,
                                    label: 'Visibility',
                                    showCls: "Db",
                                });
                            }
                        },
                        "Slider Height": {
                            "DOM": '<div class="field-row stElWrap"><label>Slider Height</label></div>' + CreateSliderDOM('carouselHeightSlider', 'carouselHeightHandle', 'Height'),
                            "prepend": "true",
                            "onload": function () {
                                component["carousel"].common1.sliderheight();
                            }
                        },
                        "Content Fontsize": {
                            custom: true,
                            "DOM": "<div class='field-row stElWrap'><label>Heading</label></div><div id='resCarHead'></div><div class='field-row stElWrap'><label>Paragraph</label></div><div id='resCarPara'></div>",
                            "prepend": true,
                            "onload": function ($item) {
                                let $parent = component["carousel"].common.selectedLayer();
                                $("#resCarHead").AdvanceTextSetting({
                                    targetParent: $parent,
                                    targetElem: '.carouselheading > h1.editor-para',
                                    options: {
                                        width: false,
                                        spacing: false,
                                        transform: false,
                                        family: false,
                                        weight: false,
                                        color: false
                                    }
                                });
                                $("#resCarPara").AdvanceTextSetting({
                                    targetParent: $parent,
                                    targetElem: '.carouselParagraph > p.editor-para',
                                    options: {
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
                        "Per slider": {
                            "DOM": "<div id='carItemPerSlide'></div>",
                            "onload": function () {
                                let $parent = component["carousel"].common.selectedLayer();
                                $('#carItemPerSlide').AdvanceItemPerView({
                                    label: 'Item per slider',
                                    min: 1,
                                    max: 4,
                                    value: DeviceItemPerView($parent.attr('data-perslider')),
                                    onChange: function (val) {
                                        $parent.attr('data-perslider', SetDeviceItemPerView($parent.attr('data-perslider'), val));
                                        $parent.find('.ImageSliderWrapper').removeClass('binded');
                                        InitCarouselSlider($parent.find('.ImageSliderWrapper'));
                                    }
                                });
                            }
                        }

                    }
                },

                "Spacing": {
                    "custom": true,
                    "DOM": `<div class="field-row">
                                <div class="field-row stElWrap col40-60">
                                    <label class="fCol">Settings for</label>
                                    <span class="fCol select__box">
                                        <select id="resSpacingFor">
                                            <option value="car">Carousel</option>
                                            <option value="head">Heading</option>
                                            <option value="para">Paragraph</option>
                                            <option value="button">Button</option>
                                        </select>
                                    </span>
                                </div>
                            </div>
                            <div id="carResSpacing">
                                <div id='carResMarSet'></div>
                                <div id='carResPadSet'></div>
                            </div>
                            <div id="headResSpacing" class ="Dn">
                                <div id='headResMarSet'></div>
                            </div>
                            <div id="paraResSpacing" class ="Dn">
                                <div id='paraResMarSet'></div>
                            </div>
                            <div id="buttonResSpacing" class ="Dn">
                                <div id='buttonResMarSet'></div>
                            </div>`,
                    "onload": function () {
                        $('#resSpacingFor').off('change').on('change', function () {
                            let selected = $(this).val();
                            $('#carResSpacing').addClass('Dn');
                            $('#headResSpacing').addClass('Dn');
                            $('#paraResSpacing').addClass('Dn');
                            $('#buttonResSpacing').addClass('Dn');
                            $(`#${selected}ResSpacing`).removeClass('Dn');
                        });
                        let $parent = component["carousel"].common.selectedLayer();
                        $('#carResMarSet').AdvanceSpacing({
                            targetParent: $parent.parent(),
                            targetElem: $parent,
                            options: {
                                "margin": {
                                    "max": 80,
                                    "min": -80,
                                    "times": 5,
                                    "position": ["all", "top", "left", "bottom", "right"]
                                },
                            }
                        });
                        $('#carResPadSet').AdvanceSpacing({
                            targetParent: $parent,
                            targetElem: '.itemWrapper',
                            options: {
                                "padding": {
                                    "max": 80,
                                    "min": 0,
                                    "times": 5,
                                    "position": ["all", "top", "left", "bottom", "right"]
                                }
                            }
                        });
                        //head
                        $('#headResMarSet').AdvanceSpacing({
                            targetParent: $parent,
                            targetElem: '.carHeadChild',
                            options: {
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
                        });
                        //para
                        $('#paraResMarSet').AdvanceSpacing({
                            targetParent: $parent,
                            targetElem: '.carParaChild',
                            options: {
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
                        });
                        //button
                        $('#buttonResMarSet').AdvanceSpacing({
                            targetParent: $parent,
                            targetElem: '.button',
                            options: {
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
                        });
                    }
                },
            },
            "selectLayer": function ($elem) {
                return component["carousel"].common.selectedLayer();
            }
        },

        "common1": {
            "sliderheight": function () {
                let $parent = component["carousel"].common.selectedLayer();
                let $ImageSlider = $parent.find('.ImageSlider');
                function LineHeightChange(space) {
                    ReplaceClassByPattern($parent, 'H-[0-9]{1,4}', 'H-' + space);
                    ReplaceClassByPattern($ImageSlider, 'H-[0-9]{1,4}', 'H-' + space);
                }
                AdvanceSageSlider($('#carouselHeightSlider'), $('#carouselHeightHandle'), 5, 800, GetValueByClassName($parent, 'H-[0-9]{1,4}', 'H-'), LineHeightChange, $parent, 'px');
            }
        },
        "resize": function () {
            this.pageload();
        }
        //----------------------------------
    }
};