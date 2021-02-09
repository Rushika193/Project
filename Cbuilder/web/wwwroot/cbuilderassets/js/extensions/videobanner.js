var VideoBanner = {
    "videobanner": {
        "componentname": "videobanner",
        "category": "pro",
        "icon": "fa fa-play-circle-o",
        "row": true,
        "hidden": false,
        "type": "video",
        "description": "You can auto play video of your choice as background with text, description and button over it ",
        "typeicon": "fa fa-th",
        "Screenshot": "https://easybuilder.contentder.com/ComponentScreenshot/videobanner.jpg",
        "defaultdata": EasyLibrary.ReadDOM("videobanner/youtubecom"),
        "beforeDrop": function ($this) {
        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            let _this = this;
            _this.view.library.playbutton();
            if (dropped) {
                //let $parent = $appendLayer.find('.youtubeVideoWrap');
                //let $youtubeVideoTextMain = $parent.find('.youtubeVideoTextMain');

                //let iframe = $parent.find('iframe');
                //let url = iframe.attr('src');
                //let urlAuto;
                //if (url.includes("autoplay")) {
                //    let position = url.indexOf("autoplay");
                //    let substring = url.substr(position, url.length);
                //    urlAuto = url.replace(substring, "autoplay=1");

                //    $parent.find("iframe").attr('src', urlAuto + "&loop=1&showinfo=0&modestbranding=1&rel=0&mute=1&iv_load_policy=3&playlist=64N14KQaUZw");
                //}
                //else {
                //    url = url + "&autoplay=1";
                //}
                //let $totalHeight = ($parent.height() - $parent.find('.youtubeVideoTextMain').height()) / 2;
                //let textColor = $parent.find('.youtubeVideoTextMain').find('p').css('color', 'rgb(255, 255, 255)');
                _this.view.library.fullpagedisplay($appendLayer);
            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic":
                {
                    "DOM": EasyLibrary.ReadDOM("videobanner/youtubebasic"),
                    "onload": function ($item) {
                        let $parent = $activeDOM;
                        let youTubeurl = 'https://www.youtube.com/embed/';
                        let url = '';
                        InitEvent();
                        function InitEvent() {
                            LoadSettings();
                            Events();
                            LoadSettingsOpacitySize();
                            OpacityColor();
                        }
                        function LoadSettings() {
                            let $iframeSrc = $parent.find('iframe');
                            let url = $iframeSrc.attr('src');
                            let id = GetYouTubeID(url);
                            $("#txtYoutubeLink").val(youTubeurl + id);
                            if ($parent.find('.playiconwrapper').hasClass('Dn')) {
                                $('#EnablePlayButton').prop('checked', false);
                            }
                            else {
                                $('#EnablePlayButton').prop('checked', true);
                            }
                        }
                        function Events() {
                            $("#txtYoutubeLink").on("change", function () {
                                let link = $("#txtYoutubeLink").val().trim();
                                if (link == "") {
                                    SageAlertDialog("Please enter the YouTube Link", 'Alert');
                                }
                                else {
                                    let id = GetYouTubeID(link);
                                    url = youTubeurl + id + '?autoplay=1&loop=1&controls=0&showinfo=0autohide=0&modestbranding=1&rel=0&mute=1&iv_load_policy=3&playlist=64N14KQaUZw';

                                    //let iframe = '';
                                    //iframe += '<iframe style="width:100%;height:100%;border:none;"';
                                    //iframe += ' src="' + url + '?';
                                    //iframe += 'controls=';
                                    //if ($("#chkYouTubeControls").prop("checked")) {
                                    //    iframe += 1;
                                    //}
                                    //else {
                                    //    iframe += 0;
                                    //}
                                    //iframe += '&autoplay=1';
                                    //iframe += '&loop=1';
                                    //iframe += '&controls=0';
                                    //iframe += '&showinfo=0';
                                    //iframe += '&autohide=0';
                                    //iframe += '&modestbranding=1';
                                    //iframe += '&rel=0';
                                    //iframe += '&mute=1'
                                    //iframe += '&iv_load_policy=3';
                                    //iframe += '&playlist=64N14KQaUZw';
                                    //iframe += '"';
                                    //if ($("#chkYouTubeAllowFullScreen").prop("checked")) {
                                    //    iframe += ' allowfullscreen data-fullscreen="1"';
                                    //}
                                    //else {
                                    //    iframe += ' data-fullscreen="1"';
                                    //}
                                    //iframe += ' >';
                                    //iframe += '</iframe>';
                                    //$parent.find(".youtubeVideoWrap").find('iframe').remove();
                                    //$parent.find(".youtubeVideoWrap").find('.youtubeVideoTextMain').prepend(iframe);
                                    //$parent.find('.youtubeVideoWrap').css('height', '100%');
                                    $parent.find(".youtubeVideoWrap").find('iframe').attr('src', url);
                                    if ($parent.hasClass('enableplaybuttonvideobanner')) {
                                        $parent.find('.fonticon').parent().css('display', 'block');
                                    }
                                    else {
                                        $parent.find('.fonticon').parent().css('display', 'none');
                                    }

                                    component['videobanner'].view.library.playbutton();
                                }
                            });
                            $('#EnablePlayButton').off('click').on('click', function () {
                                if ($(this).is(':checked')) {
                                    $parent.find('.playiconwrapper').removeClass('Dn');
                                }
                                else {
                                    $parent.find('.playiconwrapper').addClass('Dn');
                                }
                            });
                        }
                        function getParameterByName(name, url) {
                            name = name.replace(/[\[\]]/g, "\\$&");
                            let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                                results = regex.exec(url);
                            if (!results) return null;
                            if (!results[2]) return '';
                            return decodeURIComponent(results[2].replace(/\+/g, " "));
                        }
                        function GetYouTubeID(url) {
                            let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                            let match = url.match(regExp);

                            if (match && match[2].length == 11) {
                                return match[2];
                            } else {
                                return 'error';
                            }
                        }
                        function LoadSettingsOpacitySize() {
                            let opacity = parseInt($parent.find('iframe').css('opacity') * 10);
                            function videobannerOpacitySlider(space) {
                                $parent.find('iframe').css('opacity', space / 10);
                            }
                            AdvanceSageSlider($('#opacitySize'), $('#opacitySizeHandle'), 1, 10, opacity, videobannerOpacitySlider, $parent, '');
                        }
                        function OpacityColor() {
                            $('#VidBannerBgColorPic').css('background-color', $parent.css('background-color'));

                            let objColor = '';
                            let colorOpacVidOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    objColor = RenderCallBackColor(this);
                                    //if ($elm.hasClass('resOpacBg')) {
                                    $parent.css('background-color', objColor.bgColor);
                                    //}
                                }
                            });
                            $('#VidBannerBgColorPic').colorPicker(colorOpacVidOption);
                        }
                    },
                    "selectLayer": function ($elem) {
                        return $activeDOM;
                    }
                },
                "Height": {
                    "DOM": EasyLibrary.ReadDOM("videobanner/youtubeheight"),
                    "onload": function ($item) {
                        component["videobanner"].common.videoHeight();
                    }
                },
                "Spacing":
                   {
                       "options": {
                           "margin": {
                               "max": 80,
                               "min": -80,
                               "times": 5,
                               "position": ["all", "top", "bottom"]
                           }
                       }
                   },
                "Alignment": {
                    "options": {
                        "horizontal": ["left", "center", "right"]
                    }
                },

            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "view": {
            "view": function () {
                this.library.playbutton();
            },
            "library":
                {
                    "playbutton": function () {
                        let _this = this;
                        $('.VideoBanner').find('.font-icon').off('click').on('click', function () {
                            let $this = $(this);
                            let displayElement = $this.parents('.VideoBanner').find('.youtubeVideoWrap').find('iframe')[0].outerHTML;
                            _this.displaycontent(displayElement);
                        });
                    },
                    "displaycontent": function ($content) {
                        let videoheight = ScreenDimension().height * .6;
                        FullPagePopup({
                            data: `<div class="sfCol_100" style="height:${videoheight}px" >${$content}</div>`,
                            heading: "Preview",
                            height: '90%',
                            width: '60%',
                            showheading: true,
                            onappend: function ($wrapper) {
                                $wrapper.find('iframe').css({ "height": "100%", "width": "100%", "opacity": "1" });
                            }
                        });
                    },
                    "fullpagedisplay": function ($wrappper) {
                        let dAlpha = ViewDeviceAlpha();
                        if ($wrappper.find('.youtubeVideoWrap').hasClass(dAlpha + 'enablevideoheight')) {
                            let height = ScreenDimension().height;
                            $wrappper.addClass(dAlpha + 'H-' + height);
                            $wrappper.find('.youtubeVideoWrap').addClass(dAlpha + 'H-' + height);
                        }
                    }
                }
        },
        "resize": function () {
            let _this = this;
            $('[data-type="videobanner"]').each(function () {
                _this.view.library.fullpagedisplay($(this));
            });
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "heights": {
                            "DOM": EasyLibrary.ReadDOM("videobanner/youtubeheight"),
                            "onload": function () {
                                component["videobanner"].common.videoHeight();
                            }
                        },
                        "visibility": {},
                    }
                },
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 80,
                            "min": -80,
                            "times": 5,
                            "position": ["all", "top", "bottom"]
                        }
                    }
                },
                "Alignment": {
                    "options": {
                        "horizontal": ["left", "center", "right"]
                    }
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "common":
           {
               "videoHeight": function ($par) {
                   let $parent = $activeDOM.find('.youtubeVideoWrap');
                   let $MainParent = $activeDOM;
                   init();
                   LoadSettings();
                   function init() {
                       let dAlpha = DeviceAlpha();
                       if ($parent.hasClass(dAlpha + 'enablevideoheight')) {
                           $('#EnableVideoHeight').prop('checked', false);
                           $('#VideoHeight').hide();
                       }
                       else {
                           $('#EnableVideoHeight').prop('checked', true);
                           $('#VideoHeight').show();
                       }
                   }
                   function LoadSettings() {
                       function RowHeight(space) {
                           ReplaceClassByPattern($MainParent, 'H-[0-9]{1,4}', 'H-' + space);
                           ReplaceClassByPattern($MainParent.find('.youtubeVideoWrap'), 'H-[0-9]{1,4}', 'H-' + space);
                       }
                       let videoHeight = 0;
                       videoHeight = GetValueByClassName($parent, 'H-[0-9]{1,4}', 'H-');
                       if (videoHeight == 0)
                           videoHeight = parseInt($MainParent.css('height').replace('px', ''));
                       AdvanceSageSlider($('#youtubeVideoHeightSlider'), $('#youtubeVideoHeightHandle'), 5, 1080,
                          videoHeight, RowHeight, $parent, 'px');
                   }
                   $('#refresYouTubeWidth').on('click', function () {
                       $MainParent.css({ 'height': '' });
                   });
                   let tempvalue = '';
                   $('#EnableVideoHeight').off().on('click', function () {
                       var dAlpha = DeviceAlpha();
                       if ($(this).is(':checked')) {
                           $('#VideoHeight').show();
                           $activeDOM.find('.youtubeVideoWrap').removeClass(dAlpha + 'enablevideoheight');
                           let videoHeight = 0;
                           videoHeight = GetValueByClassName($parent, 'H-[0-9]{1,4}', 'H-');
                           if (videoHeight == 0)
                               videoHeight = parseInt($MainParent.css('height').replace('px', ''));
                           //$activeDOM.css("height", videoheights);
                           //$activeDOM.find('.youtubeVideoWrap').css("height", videoheights);
                           ChangeSliderValue($('#youtubeVideoHeightSlider'), videoHeight);
                       } else {
                           $('#VideoHeight').hide();
                           $activeDOM.find('.youtubeVideoWrap').addClass(dAlpha + 'enablevideoheight');
                           let height = ScreenDimension().height;
                           ReplaceClassByPattern($activeDOM, 'H-[0-9]{1,4}', 'H-' + height);
                           ReplaceClassByPattern($activeDOM.find('.youtubeVideoWrap'), 'H-[0-9]{1,4}', 'H-' + height);
                       }
                   });
               }
           }
    }
};