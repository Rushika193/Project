var imagebanner = {
    imagebanner: {
        "componentname": "imagebanner",
        "category": "pro",
        "icon": "fa fa-image",
        "row": true,
        "hidden": false,
        "type": "banner",
        "typeicon": "fa fa-th",
        "description": "Banner with slider images that can contain header, description or button.",
        "typeicon": "fa fa-th",
        "inherits": "carousel",
        "Screenshot": "https://easybuilder.contentder.com/ComponentScreenshot/videobanner.jpg",
        "defaultdata": EasyLibrary.ReadDOM("imagebanner"),
        "beforeDrop": function ($this) {
        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            let $slider = $appendLayer.find('.ImageSliderWrapper');
            $slider.removeClass('binded');
            let $pId = $slider.parent().attr('data-id');
            if (typeof autoSlideInterval[$pId] !== 'undefined') {
                $.each(autoSlideInterval[$pId], function (i, v) {
                    clearInterval(v);
                });
                autoSlideInterval[$pId] = [];
            }
            $slider.parent().attr('data-id', 'sl_' + Math.floor((Math.random() * 1000) + 100));
            var carousel = new CarouselInit($slider);
        }
    }
}