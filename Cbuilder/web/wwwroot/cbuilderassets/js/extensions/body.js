var body = {
    "body": {
        "componentname": "body",
        "category": "layout",
        "icon": "icon-icon-row",
        "row": false,
        "hidden": true,
        "collection": false,
        "defaultdata": '',
        "type": "hidden",
        "afterdrop": function ($appendLayer) { },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Background": {
                    "options": ["image", "color"]
                },
                "Spacing": {
                    "options": {
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
                $(".editor-box").removeClass("activeSetting");
                var $parent = $(".editor-box");
                $parent.addClass("activeSetting");
                return $parent;
            },
        },
        "responsiveDOMs": {
            "tabs": {
                "Spacing": {
                    "options": {
                        "padding": {
                            "max": 80,
                            "min": 0,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"]
                        }
                    },
                    "selectLayer": function ($elem) {
                        $(".editor-box").removeClass("activeSetting");
                        var $parent = $(".editor-box");
                        $parent.addClass("activeSetting");
                        return $parent;
                    },
                },
            },
        }
    }
};