var heading = {
    "heading": {
        "componentname": "heading",
        "category": "basic",
        "icon": "icon icon-heading",
        "row": false,
        "type": "element",
        "hidden": false,
        "collection": true,
        "defaultdata": EasyLibrary.ReadDOM("starter/headingdefaultdata"),
        "afterdrop": function ($appendedParent, $appendLayer) {
            if (typeof ($appendLayer) !== "undefined") {
                var $textChange = $appendLayer.children().not('div').eq(0);
                $textChange.addClass('ff-' + $('#basicFonts').val());
                $textChange.addClass('f-weight-400');
            }
            $appendLayer.find('.editor-para').focus();
        },
        "inherits": "text"
    }
};