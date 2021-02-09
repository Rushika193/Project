var sociallink = {
    "sociallink": {
        "componentname": "sociallink",
        "category": "basic",
        "icon": "fa fa-share-alt",
        "row": false,
        "info": "Social Share Component.",
        "hidden": false,
        "onload": function () { },
        "defaultdata": EasyLibrary.ReadDOM("sociallink/socialview", false),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (dropped) {
                $appendLayer.find('.sociallink').each(function () {
                    let $this = $(this).find('img');
                    let currentSrc = $this.attr('src');
                    $this.attr('src', CurrentHostURL + '/' + currentSrc);
                });
            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM('sociallink/basicSetting',false),
                    "onload": function ($item) {
                        let $parent = $activeDOM;
                        $('.actEle').removeClass('actEle');
                        Init();
                        function Init() {
                            setItems();
                            LoadSetting();
                            ChangeEvent();
                            sortable();
                        }
                        function setItems() {
                            let settingDOM = $('#socialSetting').html();
                            let htmlDOM = "";
                            $parent.find('.sociallink').each(function (index,value) {
                                let $this = $(this);
                                let name = $this.attr('data-name');
                                let id = name.split(" ").join("");
                                let $itemname = $('#socialSetting').find('.settingitem').eq(index);
                                if ($this.css('display')=="none") {
                                    $itemname.find('.linkURL ').hide();
                                }
                                $itemname.find('.itemname').text(name)
                                          .end()
                                          .find('.toggleItem input').attr('id', "toggle" + id)
                                          .end()
                                          .find('.toggleItem label').attr('for', "toggle" + id)
                                          .end()
                                          .find('.inputURL input').attr('id', id + "URL")
                                          .attr('placeholder', name + " URL")
                                          .end();
                            })
                        }
                        function LoadSetting() {
                            checkProp('#toggleFacebook', '.facebooklink', '#FacebookURL');
                            checkProp('#toggleGooglePlus', '.googleplus', '#GooglePlusURL');
                            checkProp('#toggleTwitter', '.twitterlink', '#TwitterURL');
                            checkProp('#toggleLinkedIn', '.linkedinlink', '#LinkedInURL');
                            checkProp('#toggleYoutube', '.youtube', '#YoutubeURL');
                            checkProp('#togglePinterest', '.pinterest', '#PinterestURL');
                            checkProp('#toggleInstagram', '.instagram', '#InstagramURL');
                            function checkProp(ID, className, InputID) {
                                $(InputID).val($parent.find(className).find('a').attr('href'));
                                if ($parent.find(className).css('display') == "none") {
                                    $(ID).prop('checked', false);
                                    $(ID).closest('.social-site').find('.linkURL').hide();
                                }
                                else {
                                    $(ID).prop('checked', true);
                                    $(ID).closest('.social-site').find('.linkURL').show();
                                }
                            }
                        }
                        function ChangeEvent() {
                            toogleProp('#toggleFacebook', '.facebooklink');
                            toogleProp('#toggleGooglePlus', '.googleplus');
                            toogleProp('#toggleTwitter', '.twitterlink');
                            toogleProp('#toggleLinkedIn', '.linkedinlink');
                            toogleProp('#toggleInstagram', '.instagram');
                            toogleProp('#toggleYoutube', '.youtube');
                            toogleProp('#togglePinterest', '.pinterest');
                            function toogleProp(ID, className) {
                                $(ID).off().on('click', function () {
                                    if ($(this).is(':checked')) {
                                        $(ID).closest('.setting-item').find('.linkURL').show();
                                        $parent.find(className).css('display','inline-block');
                                    }
                                    else {
                                        $(ID).closest('.setting-item').find('.linkURL').hide();
                                        $parent.find(className).css('display', 'none');
                                    }
                                })
                            }
                        }
                        setURL();
                        function setURL() {
                            url('.twitterlink a', '#TwitterURL');
                            url('.googleplus a', '#GooglePlusURL');
                            url('.facebooklink a', '#FacebookURL');
                            url('.linkedinlink a', '#LinkedInURL');
                            url('.youtube a', '#YoutubeURL');
                            url('.pinterest a', '#PinterestURL');
                            url('.instagram a', '#InstagramURL');
                            function url(className,ID) {
                                $(ID).off().on("change keyup paste click", function () {
                                    $parent.find(className).attr('href', $(this).val().trim());
                                });
                            }
                        }
                        function sortable() {
                            $("#socialSetting").AdvanceSorting({
                                targetParent: $parent.find('.sociallink-items'),
                                targetElem: '.sociallink', //view
                                sortableOptions: {
                                    items: "> div.setting-item", //editor
                                    handle: ".sortHandle", //editor
                                    containment: '#socialSetting' //editor
                                }
                            });
                        }
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Size": {
                    "DOM": '<div id="socialWidth"></div><div id="iconsetting"></div>',
                    "onload": function ($ele) {
                        let $parent = $activeDOM;
                        $('.actEle').removeClass('actEle');
                        let $img = $parent.find('.sociallink img');
                        $('#iconsetting,#socialWidth').html('');
                        $('#socialWidth').AdvanceDimension({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: {
                                types: ['width'],
                                max: 100,
                                unit:'%',
                                wLabel: 'component size',
                              
                            }
                        });
                        $('#iconsetting').AdvanceDimension({
                            targetParent: $activeDOM,
                            targetElem: '.sociallink ',
                            options: {
                                types: ['width'],
                                max: 100,
                                unit:'%',
                                wLabel: 'icon size',
                            }
                        });
                    },
                     "active": function () {
                         $('.actEle').removeClass('actEle');
                         $activeDOM.addClass('actEle');
                     }
                },
                "Spacing": {
                    "DOM": EasyLibrary.ReadDOM("sociallink/spacing"),
                    "onload": function ($ele) {
                        $($('#selSpacing').val()).addClass('actEle');
                        spacing();
                        $('#selSpacing').off().on('change', function () {
                            $('.actEle').removeClass('actEle');
                            $activeDOM.find($(this).val()).addClass('actEle');
                            spacing();
                        })
                        function spacing() {
                            $('#addressSpacing').html('');
                            $('#addressSpacing').AdvanceSpacing({
                                targetParent: $activeDOM,
                                targetElem: $('#selSpacing').val(),

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
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Alignment": {
                    "DOM": '<div id="socialAlign"></div>',
                    "onload": function ($ele) {
                        $('#socialAlign').AdvanceAlignment({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: ['horizontal']
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
            }
        },
        "styleDOMs": {
            "tabs": {
                "Background": {
                    "DOM": '<div id="socialBG"></div>',
                    "onload": function ($ele) {
                        $('#socialBG').AdvanceBackground({
                            targetParent: $activeDOM,
                            targetElem: '.sociallink-items',
                            options: ["color"],
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Border": {
                    "DOM": '<div id="socialBorder"></div>',
                    "onload": function ($ele) {
                        $('#socialBorder').AdvanceBorder({
                            targetParent: $activeDOM,
                            targetElem: '.sociallink-items',
                            options: {
                                "max": 20,
                                "min": 0,
                                "times": 1,
                                "position": ["all", "top", "right", "bottom", "left"],
                            }
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Box radius": {
                    "DOM": '<div id="socialradius"></div>',
                    "onload": function ($ele) {
                        $('#socialradius').AdvanceBoxRadius({
                            targetParent: $activeDOM,
                            targetElem: '.sociallink-items',
                            options: {
                                "max": 50,
                                "min": 0,
                                "times": 1,
                                "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                            }
                        })
                    }
                },
                "Box shadow": {
                    "DOM": '<div id="sociallinkSha"></div>',
                    "onload": function ($ele) {
                        $('#sociallinkSha').AdvanceBoxShadow({
                            targetParent: $activeDOM,
                            targetElem: '.sociallink-items',
                        })
                    }
                },
            }
        }
    }
}
