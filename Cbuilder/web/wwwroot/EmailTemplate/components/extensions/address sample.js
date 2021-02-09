var address = {
    "address sample": {
        "componentname": "address sample",
        "category": "basic",
        "componentBlockDOM": "",
        "icon": "fa fa-file-text",
        "row": false,
        "info": "Ending line with richtext",
        "hidden": false,
        "collection": true,
        "type": "element",
        "pageload": function () {
            this.inheritSettings();
        },
        "inheritSettings": function () {
            let thisComp = this;
            let richText = mailcomponent['rich text'];
            thisComp['eventlistner'] = richText.eventlistner;
            thisComp['saveSelection'] = richText.saveSelection;
            thisComp['restoreSelection'] = richText.restoreSelection;
            thisComp['remove'] = richText.remove;
        },
        "defaultdata": EasyLibrary.ReadDOM('address/viewSample', false),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            this.inheritSettings();
            if (dropped) {
                $appendLayer.find('img[class=ml-logo]').each(function () {
                    $(this).attr('src', EmailBasicToken.SiteLogo.SampleValue)
                });
                $appendLayer.find('.mailRichText').LightTextEditor();
            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM('address/basic', false),
                    "onload": function ($item) {
                        let $parent = $activeDOM;
                        loadSetting();
                        changeSetting();
                        sortable();
                        function loadSetting() {
                            setItems();
                            checkSetting('#toggleLogo', '.logo');
                            checkSetting('#toggleaddress', '.address');
                            checkSetting('#togglesocial', '.sociallinkComp');
                            function checkSetting(ID, className) {
                                let css = $parent.find(className).css('display');
                                if (css == "none") {
                                    $(ID).prop('checked', false);
                                }
                                else {
                                    $(ID).prop('checked', true);
                                }
                            }
                        }
                        function setItems() {
                            $parent.find('.address-item').each(function (i,v) {
                                let $this = $(this);
                                let name=$this.attr('data-name');
                                let $setting = $('#addressSetting').find('.setting-item').eq(i);
                                $setting.find('.itemname').text("Show " + name)
                                         .end()
                                         .find('.toggleItem input').attr('id', "toggle" + name)
                                         .end()
                                         .find('.toggleItem label').attr('for', "toggle" + name)
                                         .end();
                            })
                        }
                        function changeSetting() {
                            Show('#toggleLogo', '.logo');
                            Show('#toggleaddress', '.address');
                            Show('#togglesocial', '.sociallinkComp');
                            function Show(ID, className) {
                                $(ID).off().on('change', function () {
                                    if ($(this).is(':checked')) {
                                        $parent.find(className).css('display', "");
                                    }
                                    else {
                                        $parent.find(className).css('display', "none");
                                    }
                                })
                            }
                        }
                        function sortable() {
                            $("#addressSetting").AdvanceSorting({
                                targetParent: $parent.closest('.addressSample'),
                                targetElem: '.address-item', //view
                                sortableOptions: {
                                    items: "> div.setting-item", //editor
                                    handle: ".sortHandle", //editor
                                    containment: '#addressSetting' //editor
                                }
                            });
                        }
                    }
                },
                "Spacing": {
                    "DOM": '<div id="addressSpacing"></div>',
                    "onload": function ($item) {
                        $('#addressSpacing').html('');
                        $('#addressSpacing').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Alignment": {
                    "DOM": '<div id="addressAlign"></div>',
                    "onload": function ($item) {
                        $('#addressAlign').AdvanceAlignment({
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
            },
        },
        "styleDOMs": {
            "tabs": {
                "Background": {
                    "DOM": "<div id='rchtxtbg'></div>",
                    "onload": function ($item) {
                        $('#rchtxtbg').AdvanceBackground({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: ['color']
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },

                "Border": {
                    "DOM": "<div id='rchtxtbdr'></div>",
                    "onload": function ($item) {
                        $('#rchtxtbdr').AdvanceBorder({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Box Radius": {
                    "DOM": '<div id="rchtxt-br"></div>',
                    "onload": function ($ele) {
                        $('#rchtxt-br').AdvanceBoxRadius({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Box Shadow": {
                    "DOM": '<div id="rchtxt-bs"></div>',
                    "onload": function ($ele) {
                        $('#rchtxt-bs').AdvanceBoxShadow({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },

            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
    }
}
