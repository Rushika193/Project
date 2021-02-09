var text = {
    "text": {
        "componentname": "text",
        "category": "basic",
        "componentBlockDOM": "",
        "icon": "icon icon-text",
        "row": false,
        "hidden": false,
        "collection": false,
        "type": "element",
        "defaultdata": EasyLibrary_ReadDOM("/cbuilderassets/js/html/starter/textdefaultdata"),
        "pageload": function () {
        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (typeof ($appendLayer) !== "undefined" && dropped) {
                var $textChange = $appendLayer.children().not('div').eq(0);
                $textChange.addClass('ff-' + $('#basicFonts').val());
                $textChange.addClass('f-weight-400');
                $appendLayer.find('.editor-para').focus();
            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": "<div id='txtbasictab'></div>",
                    "onload": function ($item) {
                        let $parent = $item.parents('.SetHdlr').parent();
                        $("#txtbasictab").AdvanceTextSetting({
                            targetParent: $parent,
                            targetElem: '.editor-para'
                        });
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
                    },
                    "selectLayer": function ($elem) {
                        //var $parent = $elem.parents('.SetHdlr').parent();
                        //var $text = $parent.find('.editor-para');
                        return $activeDOM;
                    },

                },
                "Alignment": {
                    "options": {
                        "horizontal": ["left", "center", "right"]
                    }
                },
                "Scroll Effect": {
                    "options": [],
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
                        "position": ["all", "top", "right", "bottom", "left"],
                    }
                },
                "Box Radius": {
                    "options": {
                        "max": 200,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    }
                },
                "Box Shadow":
                    {
                        "options": {

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
                        "fontsize": {
                            "selectLayer": function () {
                                return $activeDOM.find('.editor-para');
                            }
                        },
                        "lineheight": {
                            "selectLayer": function () {
                                return $activeDOM.find('.editor-para');
                            }
                        },
                        "visibility": {},
                        "width": {}
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
                    },
                    "selectLayer": function ($elem) {
                        return $activeDOM;
                    },
                },
                "Alignment": {
                    "options": {
                        "horizontal": ["left", "center", "right"],
                    },
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        }
    }
};