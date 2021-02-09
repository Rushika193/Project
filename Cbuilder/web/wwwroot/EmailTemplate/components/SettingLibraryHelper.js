// here is sample of how to use library in your settings tabs
// by default all options available if you need default remove options
var yourSettingTabs = {
    "text": {
        "DOM": '<div id="divTextSettings"></div>',
        "onload": function ($ele) {
            $('#divTextSettings').AdvanceTextSetting({
                targetParent: $activeDOM,
                targetElem: $activeDOM,
                options: {
                    size: true,
                    lineheight: true,
                    spacing: true,
                    transform: true,
                    family: true,
                    color: true
                }
            });
        }
    },
    "spacing": {
        "DOM": '<div id="divColumnSpacing"></div>',
        "onload": function ($ele) {
            $('#divColumnSpacing').AdvanceSpacing({
                targetParent: $activeDOM,
                targetElem: $activeDOM,

                options: {
                    "margin": {
                        "max": 100,
                        "min": -100,
                        "times": 1,
                        "position": ["all", "top", "left", "bottom", "right"]
                    },
                    "padding": {
                        "max": 100,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "left", "bottom", "right"]
                    },
                }
            });
        }
    },
    "background": {
        "DOM": '<div id="divColBgColor"></div>',
        "onload": function ($ele) {
            $('#divColBgColor').AdvanceBackground({
                targetParent: $activeDOM,
                targetElem: $activeDOM,
                options: ["image", "color"],
            })
        }
    },
    "border": {
        "DOM": '<div id="divColumnBorders"></div>',
        "onload": function ($ele) {
            $('#divColumnBorders').AdvanceBorder({
                targetParent: $activeDOM,
                targetElem: $activeDOM,
                options: {
                    "max": 20,
                    "min": 0,
                    "times": 1,
                    "position": ["all", "top", "right", "bottom", "left"],
                }
            })
        }
    },
    "box radius": {
        "DOM": '<div id="divColumnBxRadius"></div>',
        "onload": function ($ele) {
            $('#divColumnBxRadius').AdvanceBoxRadius({
                targetParent: $activeDOM,
                targetElem: $activeDOM,
                options: {
                    "max": 50,
                    "min": 0,
                    "times": 1,
                    "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                }
            })
        }
    },
    "box shadow": {
        "DOM": '<div id="divRowBxShadow"></div>',
        "onload": function ($ele) {
            $('#divRowBxShadow').AdvanceBoxShadow({
                targetParent: $activeDOM,
                targetElem: $activeDOM,
            })
        }
    },
    "size": {
        "DOM": '<div id="divRowCompHeight"></div>',
        "onload": function ($ele) {
            $('#divRowCompHeight').AdvanceDimension({
                targetParent: $activeDOM,
                targetElem: $activeDOM,
                options: {
                    types: ['width', 'height'],
                }
            });
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
}
//creating contextmenu
/* 
 $('#yourID').CreateContextMenu({       
        onMenuClick: function ($this,range) {
       
        },
        menuItem: [
            { text: 'UserName', attr: 'data-val="myval"' },
            { text: 'Full Name', attr: 'data-val="myval"' },
        ]
    });
 */