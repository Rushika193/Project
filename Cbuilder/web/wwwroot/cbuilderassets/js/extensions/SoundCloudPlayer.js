var SoundCloudPlayer = {
    "SoundCloudPlayer": {
        "componentname": "SoundCloudPlayer",
        "category": "advance",
        "icon": "fa fa-play-circle-o",
        "row": false,
        "bucket": true,
        "type": "sound",
        "defaultdata": EasyLibrary.ReadDOM('soundcloudplayer/soundCloudView'),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) {
        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
        },
        "onsort": function (ui) {
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM('soundcloudplayer/SoundCloudBasic') + EasyLibrary.ReadDOM("youtubeheight"),
                    "onload": function ($item) {
                        const regex = /src="[\s\S]*"/g;
                        var SoundCloud = {

                            container: $item.parents('.component-sound-cloud'),
                            init: function () {
                                var temp = ' <iframe class="cloud-iframe" width="100%" height="150" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/53187186&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false&amp;visual=true"></iframe>';
                                $('#txtScloudLink').val(temp);
                                $('.sCloudColorPicker').css('background-color', SoundCloud.container.attr('data-background'));
                                $('.sCloudColorPicker').attr('data-bgcolor', SoundCloud.container.attr('data-background'));
                                var currentIframe = SoundCloud.container.find('.cloud-iframe');

                                $('#refresSoundHgt').on('click', function () {
                                    ReplaceClassByPattern($('iframe'), 'H-[0-9]{1,4}', 'H-' + 200);
                                    ChangeSliderValue($('#iframeHeightSlider'), 200);
                                });
                                $('#txtScloudLink').off().on('blur', function () {
                                    var autoplay = $('#chkScAutoplay').prop('checked');
                                    var IFsrc = $('#txtScloudLink').val();
                                    IFsrc = IFsrc.match(regex);
                                    if (typeof (IFsrc) != 'undefined' && IFsrc != null) {
                                        IFsrc = IFsrc[0];
                                        IFsrc = IFsrc.match(/"[\s\S]*"/g)[0];
                                        IFsrc = IFsrc.replace(/\"/g, '');
                                        IFsrc = IFsrc.replace(/auto_play=[\s\S]*&/g, 'auto_play=' + autoplay + '&');
                                        currentIframe.attr('src', IFsrc);

                                    }
                                });
                                component['youtube video'].HeightSlider($activeDOM);
                            }
                            
                        };
                        SoundCloud.init();
                    }
                },
                "Spacing": {
                    "options": {
                        "margin": {
                            "min": "-40",
                            "max": "40",
                            "times": "5",
                            "position": ["all", "top", "left", "right", "bottom"]
                        },
                        "padding": {
                            "min": "0",
                            "max": "40",
                            "times": "5",
                            "position": ["all", "top", "left", "right", "bottom"]
                        }
                    },
                    "selectLayer": function () {
                        return $activeDOM;
                    }
                },
                "Help": {
                    "DOM": EasyLibrary.ReadDOM('soundcloudplayer/SoundCloudHelp'),
                    "onload": function ($item) {
                    }
                }
            }
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "visibility": {},
                        "Heighty": {
                            "custom": true,
                            "DOM": EasyLibrary.ReadDOM("youtubeheight"),
                            "onload": function () {
                                component['youtube video'].HeightSlider($activeDOM);
                            }
                        }
                    }
                }
            }
        },
        "view": {
            "view": function () {
                this.library.myfunction();
            },
            "library": {
                "myfunction": function () {
                    var value = "abed";
                }
            }
        },
        "remove": function ($viewDom) {
        }
    }
};