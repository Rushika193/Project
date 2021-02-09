var image_slider = {
    "image slider": {
        "componentname": "image slider",
        "category": "advance",
        "icon": "fa fa-image",
        "row": false,
        "hidden": false,
        "collection": false,
        "bucket": true,
        "type": "carousel",
        "defaultdata": EasyLibrary.ReadDOM("carouseldata"),
        "afterdrop": function ($appendedParent, $appendLayer, dropped, duplicated) {
            if ($appendedParent.hasClass('site-body')) {
                var $imageSlider = $('.ImageSliderWrapper');
                $imageSlider.removeClass('binded');
                $imageSlider.each(function (index, value) {
                    var carousel = new CarouselInit($(this));
                });
            } else {
                let $slider = $appendLayer.find('.ImageSliderWrapper');
                $slider.removeClass('binded');
                var carousel = new CarouselInit($slider);
            }
        },
        "loadSetting": function ($item) { },
        "inherits": "carousel"
    }
};