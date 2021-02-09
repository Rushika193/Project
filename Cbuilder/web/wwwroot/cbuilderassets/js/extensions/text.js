var text = {
    "text": {
        "componentname": "text",
        "category": "basic",
        "componentBlockDOM": "",
        "icon": "icon icon-text",
        "row": false,
        "hidden": false,
        "collection": true,
        "type": "element",
        "defaultdata": EasyLibrary.ReadDOM("starter/textdefaultdata"),
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
                    "custom": true,
                    "DOM": "<div id='txtbasictab'></div>",
                    "onload": function ($item) {
                        let options = {
                            width: true,
                            spacing: true,
                            transform: true,
                            family: true,
                            weight: true,
                            color: true,
                            heading: true,
                            headingEle: {
                                "target": '.editor-para',
                                //"tag": ["h1","h2"]
                            }
                        }
                        component["text"].commonSetting.text(options);
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": '<div class="field-row"><div id="textMSpacing"></div><div id="textPSpacing"></div></div>',
                    onload: function () {
                        component["text"].commonSetting.spacing();
                    },
                    "selectLayer": function ($elem) {
                        //var $parent = $elem.parents('.SetHdlr').parent();
                        //var $text = $parent.find('.editor-para');
                        return $activeDOM;
                    },

                },
                "Alignment": {
                    "custom": true,
                    "DOM": '<div class="field-row"><div id="textAlign"></div></div>',
                    "onload": function ($item) {
                        component["text"].commonSetting.alignment();
                    },
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
                    "custom": true,
                    "DOM": "<div id='txtbasictab'></div><div id='textVisibility'></div>",
                    "onload": function ($item) {
                        $("#textVisibility").html('');
                        $('#textVisibility').AdvanceVisibility({
                            targetParent: $activeDOM.parent(),
                            targetElem: $activeDOM
                        });
                        let options = {
                            width: true,
                            spacing: true,
                            transform: false,
                            family: false,
                            weight: false,
                            color: false,
                            style: false
                        }
                        component["text"].commonSetting.text(options);
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": '<div class="field-row"><div id="textMSpacing"></div><div id="textPSpacing"></div></div>',
                    onload: function () {
                        component["text"].commonSetting.spacing();
                    },
                    "selectLayer": function ($elem) {
                        return $activeDOM;
                    },
                },
                "Alignment": {
                    "custom": true,
                    "DOM": '<div class="field-row"><div id="textAlign"></div></div>',
                    "onload": function ($item) {
                        component["text"].commonSetting.alignment();
                    },
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "commonSetting": {
            "text": function (options) {
                let $parent = $activeDOM;
                $("#txtbasictab").AdvanceTextSetting({
                    targetParent: $parent,
                    targetElem: '.editor-para',
                    options: options
                });
            },
            "spacing": function () {
                $("#textMSpacing,#textPSpacing").html('');
                $("#textMSpacing").AdvanceSpacing({
                    targetParent: $activeDOM,
                    targetElem: $activeDOM,
                    options: {
                        "margin": {
                            "max": 40,
                            "min": -40,
                            "times": 5,
                            "position": ["all", "top", "bottom", "left", "right"]
                        },
                    },
                });
                $("#textPSpacing").AdvanceSpacing({
                    targetParent: $activeDOM,
                    targetElem: $activeDOM,
                    options: {
                        "padding": {
                            "max": 40,
                            "min": 0,
                            "times": 5,
                            "position": ["all", "top", "bottom", "left", "right"]
                        }
                    },
                });
            },
            "alignment": function () {
                $('#textAlign').html('');
                $("#textAlign").AdvanceAlignment({
                    targetParent: $activeDOM.parent(),
                    targetElem: $activeDOM
                });
            }
        }
    }
};