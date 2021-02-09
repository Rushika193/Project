var mailbtnrecovery = {
    "password recovery": {
        "componentname": "password recovery",
        "category": "basic",
        "icon": "fa fa-link",
        "row": false,
        "hidden": false,
        "info": 'This component is for redirecting to the link that is manually inserted from the setting.',
        "onload": function () { },
        "defaultdata": EasyLibrary.ReadDOM("btnrecovery/view", false),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (dropped) {

            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("btnrecovery/basic", false),
                    "onload": function ($item) {
                        ButtonText();
                        function ButtonText() {
                            let $text = $activeDOM.find('.btn-recovery')
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
                            targetElem: $activeDOM.find('.btn-recovery'),

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
            let pageName = "password-recovery?recoveringcode=";
            let $this = $cloneDOM.find('[data-type="password recovery"]');
            $this.find('.btn-recovery').attr('href', CurrentHostURL + "/" + pageName + EmailBasicToken.UserActivationCode.Token);
        }
    }
}