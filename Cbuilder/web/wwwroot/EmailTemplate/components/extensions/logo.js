var mailLogo = {
    "logo": {        
        "componentname": "logo",
        "category": "basic",
        "icon": "fa fa-joomla",
        "info":"This component creates a default logo which will be replaced by the logo of your website.",
        "row": false,
        "hidden": false,
        "onload": function () { },
        "defaultdata": EasyLibrary.ReadDOM("logo/logoview", true),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (dropped)
            {
                $appendLayer.find('img').attr('src', EmailBasicToken.SiteLogo.SampleValue);
            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": `<div id="logoWidth"></div>
                            <div id="logoHeight"></div>`,
                    "onload": function ($ele) {                        
                        $('#logoWidth').AdvanceDimension({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: {
                                max: 100,
                                types: ['width'],
                                unit: '%'
                            }
                        });
                        $('#logoHeight').AdvanceDimension({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('img'),
                            options: {
                                types: ['height'],
                                unit: 'px'
                            }
                        });
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": `<div id="imgMargin"></div>
                            <div id="imgPadding"></div>`,
                    "onload": function ($item) {
                        $('#imgMargin').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.image-wrap'),
                            options: {
                                "margin": {
                                    "max": 80,
                                    "min": -80,
                                    "times": 5,
                                    "position": ["all", "top", "left", "bottom", "right"],
                                }
                            }
                        });
                        $('#imgPadding').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.image-wrap'),
                            options: {
                                "padding": {
                                    "max": 80,
                                    "min": 0,
                                    "times": 5,
                                    "position": ["all", "top", "left", "bottom", "right"]
                                }
                            }
                        });
                    },
                },
                "Box Shadow": {
                    "custom": true,
                    "DOM": `<div id="imgBoxShadow"></div>`,
                    "onload": function ($item) {
                        $('#imgBoxShadow').AdvanceBoxShadow({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('img'),
                            options: {
                            },
                        });
                    }
                },
            },
        },

        "remove": function ($cloneDOM) {
            $cloneDOM.find('.ml-logo').attr('src', EmailBasicToken.SiteLogo.Token);
        }
    }
}