var imageLink = {
    "Image Link": {
        "componentname": "Image Link",
        "hidden": false,
        "row": false,
        "collection": false,
        "type": 'element',
        "bucket": true,
        "category": 'basic',
        "icon": "fa fa-external-link",
        "defaultdata": EasyLibrary.ReadDOM("imageLink/imageLinkDef"),
        "beforedrop": function () { },
        "afterdrop": function ($appendedParent, $appendedLayer, dropped) {
            if (dropped)
                $appendedLayer.find('.image-settings').trigger('click');
            anylinkstop();
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM('imageLink/imageLinkBasic') + "<div id='imagesettings'></div>",
                    "onload": function ($this) {
                        let noLink='javascript:void(0)';
                        let anchor = $activeDOM.children('a');
                        let link = anchor.attr('href');
                        let $openInnewTab=$('#openInnewTab');
                        $('#imagesettings').html(component['image'].settingDOMs.tabs.Basic.DOM);
                        component["image"].common.ImageInit($activeDOM);
                        $('#fitimagesettings').show();

                        let $linkTextURL = $('#linkTextURL');
                        let $selectLink = $('#selectLink');
                        let $anchorPageList = $("#anchorPageList");
                        let $messageContainer = $('#messageContainer');

                        loadLinkTabSetting();
                        LinkSettings();

                        function loadLinkTabSetting() {
                            let newOrSame = anchor.attr('target');
                            //if (!newOrSame) newOrSame = '_blank'
                            $openInnewTab.val(newOrSame);

                        }
                        
                        function LinkSettings() {
                            if (link === noLink) link = '';
                            var linkType = anchor.attr('data-link');
                            if (!linkType) linkType = 'external';
                            if (typeof linkType !== 'undefined') {
                                anchor.removeClass("redirectLink");
                                switch (linkType) {
                                    case 'external':
                                        $selectLink.val('ext');
                                        $linkTextURL.removeClass('Dn');
                                        $linkTextURL.val(link);
                                        anchor.removeClass('anchorpage');
                                        break;
                                    case 'internal':
                                        $selectLink.val('int');
                                        GetPageList();
                                        anchor.addClass('anchorpage').addClass("redirectLink");
                                        $messageContainer.html("");
                                        $anchorPageList.find('option').filter(function () {
                                            return this.text == link.replace(SageFrameHostURL + '/', '').replaceAll("-", " ");
                                        }).attr('selected', true);
                                        $anchorPageList.parent().removeClass('Dn');
                                        anchor.attr("data-pageName", $("#anchorPageList option:selected").text());
                                        break;
                                }
                            }


                            $openInnewTab.off().on('change', function () {
                                anchor.attr("target", $(this).val());
                            });

                            
                            $selectLink.off().on('change', function () {
                                var selected = $(this).val();
                                anchor.removeClass("redirectLink");
                                if (selected == 'ext') {
                                    anchor.attr('data-link', 'external').removeAttr('href');
                                    $linkTextURL.removeClass('Dn');
                                    $anchorPageList.parent().addClass('Dn');
                                    $linkTextURL.val('').focus();
                                    anchor.removeClass('anchorpage');
                                } else {
                                    $messageContainer.html('');
                                    ChnageMenulinkType();
                                    GetPageList();
                                    $linkTextURL.addClass('Dn');
                                    $anchorPageList.parent().removeClass('Dn');
                                    anchor.addClass("redirectLink");
                                    $anchorPageList.trigger('change');
                                    anchor.attr('data-onepage', $anchorPageList.find('option:selected').val());
                                    anchor.attr("data-pageName", $("#anchorPageList option:selected").text());
                                }
                            });

                            $linkTextURL.on('input', function () {
                                var $this = $(this);
                                var val = $this.val().trim();
                                if (val.length > 0) {
                                    link = val;
                                    var protocol = /^(https?):\/\/[^\s\/$.?#]*.[^\s]*$/i;
                                    if (!protocol.test(val)) {
                                        $this.css('border-color', 'red');
                                        $messageContainer.html('Invalid url. <br />Example of valid url: <br />http://www.contentder.com/ <br />https://www.contentder.com/');
                                        link = noLink;
                                    }
                                    else {

                                        $messageContainer.html('');
                                        $this.css('border-color', '');
                                    }
                                }
                                else
                                    $messageContainer.html('Enter a valid URL');
                                anchor.attr('href', link);
                            });

                            function ChnageMenulinkType() {
                                if ($('#chkOnePageMenu').is(':checked')) {
                                    anchor.attr('data-link', 'onepage');
                                    anchor.removeClass('anchorpage');
                                }
                                else {
                                    anchor.attr('data-link', 'internal');
                                    anchor.addClass('anchorpage');
                                }
                            }
                            function GetPageList() {
                             
                                $anchorPageList.html( EasyLibrary.GetPageOption());

                                $anchorPageList.off().on('change', function () {
                                    let $selectedOption = $anchorPageList.find('option:selected');
                                    anchor.attr("data-pageName", $selectedOption.text().replaceAll(" ", "-"));
                                    anchor.attr('href', SageFrameHostURL + '/' + $selectedOption.text().replaceAll(" ", "-"));
                                });
                            }
                        }
                    }
                },
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 80,
                            "min": -80,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"],
                            "selectLayer": function ($elem) {
                                return $activeDOM;
                            }
                        },
                        "padding": {
                            "max": 80,
                            "min": 0,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"],
                            "selectLayer": function ($elem) {
                                return $activeDOM;
                            }
                        }
                    },
                    "selectLayer": function ($elem) {
                        return $activeDOM;
                    }
                },
                "Hover Effect": {
                    "options": {
                        "shadow": "on",
                        "border": {
                            "max": 20,
                            "min": 0,
                            "times": 1,
                            "position": ["all", "top", "right", "bottom", "left"]
                        },
                        "zoom": "on"
                    },
                    "selectLayer": function ($elem) {
                        return $activeDOM.find("img");
                    },
                },
                "Scroll Effect": {
                    "options": [],
                    "selectLayer": function ($elem) {
                        return $activeDOM;
                    }
                }

            }
        },
        "styleDOMs": {
            "tabs": {
                "Box Radius": {
                    "options": {
                        "max": 500,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    },
                    "selectLayer": function ($elem) {
                        return $activeDOM.find('img');
                    },
                },
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    },
                    "selectLayer": function ($elem) {
                        return $activeDOM.find('img');
                    },
                },
                "Box Shadow": {
                    "options": {

                    },
                    "selectLayer": function ($elem) {
                        return $activeDOM.find('img');
                    },
                },
            }
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "imagerespo": {
                            "DOM": EasyLibrary.ReadDOM("imagebasictab"),
                            "prepend": "true",
                            "onload": function () {
                                component["image"].common.ImageInit($activeDOM);
                            }
                        },
                        "Visibility": {}
                    }
                },
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 80,
                            "min": -80,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"]
                        },
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
                return $activeDOM;
            },
        },
    }
};
