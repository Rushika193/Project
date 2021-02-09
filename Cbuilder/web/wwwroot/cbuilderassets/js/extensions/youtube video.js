var youtube_video = {
    "youtube video": {
        "componentname": "youtube video",
        "category": "advance",
        "icon": "fa fa-youtube",
        "row": false,
        "hidden": false,
        "collection": true,
        "bucket": true,
        "type": "video",
        "defaultdata": EasyLibrary.ReadDOM("youtubecom"),
        "beforeDrop": function ($this) { },
        "afterdrop": function ($appendedParent, $appendLayer) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("youtubebasic") + EasyLibrary.ReadDOM("youtubeheight"),
                    "onload": function ($item) {
                        var $parent = $item.parents('.youtubevideo');
                        var youTubeurl = 'https://www.youtube.com/embed/';
                        var url = '';
                        InitEvent();

                        function InitEvent() {
                            LoadSettings();
                            Events();
                        }

                        function LoadSettings() {
                            var $iframeSrc = $parent.find('iframe');
                            var url = $iframeSrc.attr('src');
                            var id = GetYouTubeID(url);
                            $("#txtYoutubeLink").val(youTubeurl + id);
                            var isAllowFull = $iframeSrc.attr("data-fullscreen");
                            if (parseInt(isAllowFull) == 1) {
                                $("#chkYouTubeAllowFullScreen").prop("checked", true);
                            } else {
                                $("#chkYouTubeAllowFullScreen").prop("checked", false);
                            }
                            var controls = getParameterByName("controls", url);
                            if (parseInt(controls) == 1) {
                                $("#chkYouTubeControls").prop("checked", true);
                            } else {
                                $("#chkYouTubeControls").prop("checked", false);
                            }

                            var autoPlay = getParameterByName("autoplay", url);
                            if (parseInt(autoPlay) == 1) {
                                $("#chkYouTubeAutoplay").prop("checked", true);
                            } else {
                                $("#chkYouTubeAutoplay").prop("checked", false);
                            }

                        }

                        function Events() {
                            $("#txtYoutubeLink").on("blur", generateLink);
                            $('#chkYouTubeAutoplay').off().on('change', generateLink);
                            $('#chkYouTubeControls').off().on('change', generateLink);
                            function generateLink() {
                                var link = $("#txtYoutubeLink").val().trim();
                                if (link == "") {
                                    SageAlertDialog("Please enter the YouTube Link", 'Alert');
                                } else {
                                    var id = GetYouTubeID(link);
                                    url = youTubeurl + id;
                                    var iframe = '<iframe style="width:100%;height:100%;border:none;"';
                                    iframe += ' src="' + url + '?';
                                    iframe += 'controls=';
                                    if ($("#chkYouTubeControls").prop("checked")) {
                                        iframe += 1;
                                    } else {
                                        iframe += 0;
                                    }
                                    iframe += '&autoplay=';
                                    if ($("#chkYouTubeAutoplay").prop("checked")) {
                                        iframe += 1;
                                    } else {
                                        iframe += 0;
                                    }
                                    iframe += '"';
                                    if ($("#chkYouTubeAllowFullScreen").prop("checked")) {
                                        iframe += ' allowfullscreen data-fullscreen="1"';
                                    } else {
                                        iframe += ' data-fullscreen="0"';
                                    }
                                    iframe += ' >';
                                    iframe += '</iframe>';
                                    $parent.find(".youtubeVideoWrap").html(iframe);
                                }
                            }
                        }


                        function getParameterByName(name, url) {
                            name = name.replace(/[\[\]]/g, "\\$&");
                            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                                results = regex.exec(url);
                            if (!results) return null;
                            if (!results[2]) return '';
                            return decodeURIComponent(results[2].replace(/\+/g, " "));
                        }

                        function GetYouTubeID(url) {
                            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                            var match = url.match(regExp);

                            if (match && match[2].length == 11) {
                                return match[2];
                            } else {
                                return 'error';
                            }
                        }
                        component['youtube video'].HeightSlider($activeDOM);
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
                "Help": {
                    "DOM": EasyLibrary.ReadDOM('ytPlayList/ytPlItemsHelp'),
                    "onload": function ($item) {
                    }
                }
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

                    }
                },
            }
        },
        "HeightSlider": function ($wrapper) {

            let Height = GetValueByClassName($wrapper, 'H-[0-9]{1,4}', 'H-');
            let curWidth = GetValueByClassName($wrapper, 'sfCol_[0-9]{1,4}', 'sfCol_');
            function MapWidthChange(space) {
                ReplaceClassByPattern($wrapper, 'sfCol_[0-9]{1,4}', 'sfCol_' + space);
            }
            AdvanceSageSlider($('#youtubeWidthSlider'), $('#youtubeWidthHandle'), 1, 100, curWidth, MapWidthChange, $wrapper, '%');

            function MapHeightChange(space) {
                ReplaceClassByPattern($wrapper, 'H-[0-9]{1,4}', 'H-' + space);
            }
            AdvanceSageSlider($('#youtubeHeightSlider'), $('#youtubeHeightHeightHandle'), 200, 1000, Height, MapHeightChange, $wrapper, 'px');

            $('#refresYouTubeWidth').on('click', function () {
                ReplaceClassByPattern($wrapper, 'H-[0-9]{1,4}', 'H-' + 200);
                ChangeSliderValue($('#youtubeHeightSlider'), 200);
                ReplaceClassByPattern($wrapper, 'sfCol_[0-9]{1,4}', 'sfCol_-' + 100);
                ChangeSliderValue($('#youtubeWidthSlider'), 100);
            });
        }
    }
};