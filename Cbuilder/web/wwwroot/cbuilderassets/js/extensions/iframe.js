var iframe = {
    "iFrame": {
        "componentname": "iFrame",
        "category": "advance",
        "icon": "fa fa-window-maximize",
        "row": false,
        "hidden": false,
        "type": "element",
        "bucket": true,
        "defaultdata": EasyLibrary.ReadDOM("iFrame/iFrame"),
        "beforeDrop": function ($this) {
        },
        "afterdrop": function () {
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("iFrame/iFrameBasic") + EasyLibrary.ReadDOM("youtubeheight"),
                    "onload": function ($item) {
                        var $parent = $item.parents('.iFrame');
                        var $iframeSrc = $parent.find('iframe');
                        var url = $iframeSrc.attr('src');
                        let $txtiFrameLink = $("#txtiFrameLink");
                        $txtiFrameLink.val(url);
                        InitEvent();
                        function InitEvent() {
                            Events();
                            component['youtube video'].HeightSlider($activeDOM);
                        }
                        function Events() {
                            $txtiFrameLink.on("change", function () {
                                var link = $(this).val().trim();
                                if (link == "") {
                                    SageAlertDialog("Please enter the Link", 'Alert');
                                }
                                else {
                                    url = link;
                                    var iframe = '';
                                    iframe += '<iframe style="width:100%;height:100%;border:none;"';
                                    iframe += ' src="' + url + '"';
                                    iframe += ' >';
                                    iframe += '</iframe>';
                                    $parent.find(".iFrameWrap").html(iframe);
                                }
                            });
                        }
                    }
                },
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 80,
                            "min": -80,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"]
                        }
                    }
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            }
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "Visibility": {},
                        "Height_": {
                            "DOM": EasyLibrary.ReadDOM("youtubeheight"),
                            "onload": function () {
                                component['youtube video'].HeightSlider($activeDOM);
                            }
                        }
                    },
                },
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 80,
                            "min": -80,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"]
                        }
                    }
                }
            }
        },
    }

};