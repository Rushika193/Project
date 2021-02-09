var mailImage = {
    "image": {
        "componentname": "image",
        "category": "basic",
        "icon": "icon icon-img-1",
        "row": false,
        "info": "This component will add images on template.",
        "hidden": false,
        "onload": () => { },
        "defaultdata": EasyLibrary.ReadDOM("image/imageview", false),
        "afterdrop": ($appendedParent, $appendLayer, dropped) => {
            if (dropped)
                $appendLayer.find('.image-settings').trigger('click');
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": `<div id="imgWidth"></div>
                            <div id="imgHeight"></div>
                            <div class="field-row stElWrap col50-50">
                                <label class="fCol">Fit Image</label>
                                <div class="fCol TxAl-r">
                                    <span class="toggle_btn">
                                        <input id="fitImg" type="checkbox">
                                        <label class="tgl_slider" for="fitImg"></label>
                                    </span>
                                </div>
                            </div>
                            `,
                    "onload": ($ele) => {
                        $('#imgWidth').AdvanceDimension({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: {
                                max: 100,
                                types: ['width'],
                                unit: '%'
                            }
                        });
                        $('#imgHeight').AdvanceDimension({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('img'),
                            options: {
                                types: ['height'],
                                unit: 'px'
                            }
                        });
                        $('#fitImg').on('change', () => {
                            if ($('#fitImg').prop('checked')) {
                                $activeDOM.find('img').css("object-fit", "cover");
                            } else {
                                $activeDOM.find('img').css("object-fit", "");
                            }
                        });
                    },
                    "active": () => {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": `<div id="imgMargin"></div>
                            <div id="imgPadding"></div>`,
                    "onload": ($item) => {
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
                    "active": () => {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Box Shadow": {
                    "custom": true,
                    "DOM": `<div id="imgBoxShadow"></div>`,
                    "onload": ($item) => {
                        $('#imgBoxShadow').AdvanceBoxShadow({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('img'),
                            options: {
                            },
                        });
                    },
                    "active": () => {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
            },
        },
        "remove": ($cloneDOM) => {
        }
    }
}