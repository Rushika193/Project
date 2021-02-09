var mailColumn = {
    "column": {
        "componentname": "column",
        "category": "layout",
        "icon": " icon icon-comp-row",
        "row": false,
        "hidden": true,
        'defaultdata':'',
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
        },
        "settingDOMs": {
            "tabs": {           
                "spacing": {
                    "DOM": '<div id="divColumnSpacing"></div>',
                    "onload": function ($ele) {
                        $('#divColumnSpacing').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: {
                                 "padding": {
                                    "max": 100,
                                    "min": 0,
                                    "times": 1,
                                    "position": ["all", "top", "left", "bottom", "right"]
                                }
                            }
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "alignment": {
                    "DOM": '<div id="divColumnAlignment"></div>',
                    "onload": function ($ele) {
                        $('#divColumnAlignment').AdvanceAlignment({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: ['horizontal', 'vertical']                           
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "height": {
                    "DOM": '<div id="divColCompHeight"></div>',
                    "onload": function ($ele) {
                        $('#divColCompHeight').AdvanceDimension({
                            targetParent: $activeDOM.parent(),
                            targetElem: $activeDOM.parent().find('>.colComp'),
                            options: {
                                types: ['height'],
                            }
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.parent().find('>.colComp').addClass('actEle');
                    }
                },
            }
        },
        "styleDOMs": {
            "tabs": {
                "background": {
                    "DOM": '<div id="divColBgColor"></div>',
                    "onload": function ($ele) {
                        $('#divColBgColor').AdvanceBackground({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: ["image", "color"],

                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "border": {
                    "DOM": '<div id="divColumnBorders"></div>',
                    "onload": function ($ele) {
                        $('#divColumnBorders').AdvanceBorder({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "box radius": {
                    "DOM": '<div id="divColumnBxRadius"></div>',
                    "onload": function ($ele) {
                        $('#divColumnBxRadius').AdvanceBoxRadius({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "box shadow": {
                    "DOM": '<div id="columShadow"></div>',
                    "onload": function ($ele) {
                        $('#columShadow').html('');
                        $('#columShadow').AdvanceBoxShadow({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                        })
                    }
                },
            }
        },
        "remove": function ($cloneDOM) {

        },

    }
}