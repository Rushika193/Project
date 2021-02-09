var mailbtnrecovery = {
    "user activation": {
        "componentname": "user activation",
        "category": "basic",
        "icon": "fa fa-check",
        "row": false,
        "hidden": false,
        "info": 'This component create the user activation link.',
        "onload": function () { },
        "defaultdata": EasyLibrary.ReadDOM("activateuser/view", false),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (dropped) {

            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("activateuser/basic", false),
                    "onload": function ($item) {
                        ButtonText();
                        function ButtonText() {
                            let $text = $activeDOM.find('.btnActRegUser')
                            let text = $text.text();
                            $('#recoveryText').val(text);
                            $('#recoveryText').off().on("change keyup paste click", function () {
                                let $this = $(this);
                                text = $this.val();
                                $text.text(text);
                                $this.val(text);
                            });
                            $('#recoveryText').on('blur', function () {
                                if (text.trim() == "") {
                                    text = 'Enter Text';
                                    $text.text(text);
                                    $(this).val(text);
                                }
                            });
                        }
                        $('#lnkbtnwidth').AdvanceDimension({
                            targetParent: $activeDOM,
                            targetElem: '.btn-link-wrap',
                            options: {
                                max: 100,
                                types: ['width'],
                                unit: '%',
                                wLabel: 'component width'
                            }
                        });
                        $('#divTextStng').AdvanceTextSetting({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btnActRegUser'),

                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Spacing": {
                    "DOM": '<div id="lnk-btn-spc"></div>',
                    "onload": function ($ele) {
                        $('#lnk-btn-spc').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btn-link-wrap'),
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Alignment": {
                    "DOM": '<div id="divCompAlignment"></div>',
                    "onload": function ($item) {
                        $('#divCompAlignment').AdvanceAlignment({
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
        },
        "styleDOMs": {
            "tabs": {
                "Background": {
                    "DOM": "<div id='lnk-btn-bg'></div>",
                    "onload": function ($item) {
                        $('#lnk-btn-bg').AdvanceBackground({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btn-link-wrap'),
                            options: ["color"],
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Border": {
                    "DOM": "<div id='lnk-btn-bdr'></div>",
                    "onload": function ($item) {
                        $('#lnk-btn-bdr').AdvanceBorder({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btn-link-wrap')
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Box Radius": {
                    "DOM": '<div id="lnk-btn-br"></div>',
                    "onload": function ($ele) {
                        $('#lnk-btn-br').AdvanceBoxRadius({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btn-link-wrap')
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Box Shadow": {
                    "DOM": '<div id="lnk-btn-bs"></div>',
                    "onload": function ($ele) {
                        $('#lnk-btn-bs').AdvanceBoxShadow({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btn-link-wrap')
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },

            }
        },
        "remove": function ($cloneDOM) {
            let pageName = "user-verification?activationcode=";
            $cloneDOM.find('.btnActRegUser').attr('href', CurrentHostURL + "/" + pageName + EmailBasicToken.UserActivationCode.Token);
        }
    }
}