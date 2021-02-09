var mailBody = {
    "mail body": {
        "componentname": "mail body",
        "category": "layout",
        "icon": "",
        "row": true,
        "hidden": true,
        "defaultdata": "",
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
        },
        "settingDOMs": {
            "tabs": {
                "spacing": {
                    "DOM": '<div id="divBdySpacing"></div>',
                    "onload": function ($ele) {
                        $('#divBdySpacing').AdvanceSpacing({
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
            }
        },
        "styleDOMs": {
            "tabs": {
                "background": {
                    "DOM": '<div id="divBdyBgColor"></div>',
                    "onload": function ($ele) {
                        $('#divBdyBgColor').AdvanceBackground({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: ["color"],
                        })
                    }
                },
                "border": {
                    "DOM": '<div id="divBdyBorders"></div>',
                    "onload": function ($ele) {
                        $('#divBdyBorders').AdvanceBorder({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                        })
                    }
                },
                "box radius": {
                    "DOM": '<div id="divBdyBxRadius"></div>',
                    "onload": function ($ele) {
                        $('#divBdyBxRadius').AdvanceBoxRadius({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                        })
                    }
                },
            }
        },

    }
}