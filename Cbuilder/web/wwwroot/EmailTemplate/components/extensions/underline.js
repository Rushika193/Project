var underline = {
    "underline": {
        "componentname": "underline",
        "category": "basic",
        "componentBlockDOM": "",
        "icon": "fa fa-file-text",
        "row": false,
        "info": "underline component",
        "hidden": false,
        "collection": true,
        "type": "element",
        "pageload": function () {
            this.inheritSettings();
        },
        "defaultdata": EasyLibrary.ReadDOM('underline/data', false),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": '<div id="underlineWidth"></div><div id="underlineHeight"></div><div id="underlineClr"></div>',
                    "onload": function ($item) {
                        $('#underlineClr').AdvanceBackground({
                            targetParent: $activeDOM,
                            targetElem: '.mail-underline',
                            options: ["color"],
                        });
                        $('#underlineWidth').AdvanceDimension({
                            targetParent: $activeDOM,
                            targetElem: '.mail-underline',
                            options: {
                                wLabel: 'width',
                                max:100,
                                types: ['width'],
                                unit:'%'
                            }
                        });
                        $('#underlineHeight').AdvanceDimension({
                            targetParent: $activeDOM,
                            targetElem: '.mail-underline',
                            options: {
                                min: 1,
                                max:100,
                                hLabel: 'height',
                                types: ['height'],
                                unit: 'px'
                            }
                        });
                    }
                },
                "Spacing": {
                    "DOM": '<div id="underlineSpacing"></div>',
                    "onload": function ($ele) {
                        $('#underlineSpacing').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Alignment": {
                    "DOM": '<div id="underlineAlign"></div>',
                    "onload": function ($item) {
                        $('#underlineAlign').AdvanceAlignment({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: ['horizontal']
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                }
            }
        }
    }
};