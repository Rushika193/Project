var social_link = {
    "social link": {
        "componentname": "social link",
        "category": "advance",
        "icon": "fa fa-share-alt",
        "row": false,
        "hidden": false,
        "collection": true,
        "bucket": true,
        "type": "element",
        "defaultdata": EasyLibrary.ReadDOM("sociallinkcom"),
        "beforeDrop": function ($this) { },
        "afterdrop": function ($appendLayer) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("sociallinkbasic"),
                    "DOMS": {
                        socialicon: EasyLibrary.ReadDOM("socialfontIconList")
                    },
                    "onload": function ($item) {
                        let _this = this;
                        var $ele = '';
                        var $parent = $item.closest('.sociallink');
                        var eleClasses = '';
                        var eleIndex = -1;
                        InitEvent();
                        function InitEvent() {
                            LoadSettings();
                            Events();
                            FontIcon();
                            SearchFontIcon();
                        }

                        function LoadSettings() {
                            var html = '';
                            $(".sociallinkWrapper").html('');
                            let count = $parent.find('.socialAchor').length;
                            $parent.find(".socialAchor").each(function (index, item) {
                                var className = $(this).attr('data-class');
                                var href = $(this).attr('data-href');
                                var iconClass = $(this).find('i').attr('class');
                                html += '<div class="field-row data-row item">';
                                html += '<div class="field-row stElWrap col100">';
                                html += '<span class="fcol sfCol_8"><i class="fa fa-arrows-v Ml-5 SocialLinkSort"></i></span>';
                                html += '<span class="fcol sfCol_8">';
                                html += '<div class="socialLinkIcon" data-class="' + className + '">';
                                let $fonticon = "fa " + className + " onhovercolor font-icon";
                                html += '<i class="' + $fonticon + '"></i>';
                                html += '</div>';
                                html += '</span>';
                                html += '<span class="sfCol_70 Ml-5 cb_input">';
                                html += '<input type="text"  value="' + href + '"  class="sociallinkHrefText">';
                                html += '</span>';
                                if (count > 1) {
                                    html += '<span class="sfCol_6 Ml-10">';
                                    html += '<i class="in-form-icon fa fa-trash delete-icon deleteSocialLink" aria-hidden="true"></i>';
                                    html += '</span>';
                                }
                                html += '</div>';
                                html += '</div>';
                            });
                            $(".sociallinkWrapper").html(html);
                            FormEvent();
                            //-------------------------------sortable----------                          
                            $(".sociallinkWrapper").AdvanceSorting({
                                targetParent: $parent,
                                targetElem: '.fonticon',
                                sortableOptions: {
                                    items: "div.data-row",
                                    handle: ".SocialLinkSort",
                                    containment: 'div.sociallinkWrapper'
                                }
                            });
                        }
                        function FormEvent() {
                            $(".deleteSocialLink").off().on("click", function () {
                                var dataClass = $(this).parent().find('.socialLinkIcon').attr('data-class');
                                var index = $('.sociallinkWrapper .item').index($(this).parents('.item'));
                                $parent.find(".socialLink").children().eq(index).remove();
                                $(this).parent().parent().parent().remove();
                                LoadSettings();
                            });
                            $(".socialLinkIcon").off().on("click", function () {
                                var $iconParent = $(this).parent().parent().parent().parent();
                                eleIndex = $iconParent.find('.socialLinkIcon').index($(this));
                                eleClasses = $(this).attr('data-class');
                                var $iconListHolder = $(this).closest('.data-row');
                                if ($iconListHolder.find(".socialLinkIconList").length == 0) {
                                    var fontHtml = '';
                                    fontHtml += '<div class="socialLinkIconList col100">';
                                    fontHtml += _this.DOMS.socialicon;
                                    fontHtml += '</div>';
                                    $iconListHolder.after(fontHtml);
                                }
                                FontIcon();
                                $('#SocialLinkSearchIcon').find('li').removeClass('selected');
                                $('#SocialLinkSearchIcon').find('li i[data-class="' + eleClasses + '"]').parent().addClass('selected');
                            });

                            $(".sociallinkHrefText").off().on("keyup", function () {
                                var value = $(this).val().trim();
                                if (value == "") {
                                    value = "#";
                                }
                                var textBoxIndex = $(".sociallinkHrefText").index(this);
                                var $socilLink = $parent.find('.fonticon').eq(textBoxIndex);
                                $socilLink.find(".socialAchor").attr("data-href", value);
                            });
                        }

                        function Events() {
                            $("#btnAddMore").on("click", function () {
                                $(".hideSocialIcon").trigger("click");
                                var html = '';
                                var iconClass = 'fa fa-navicon';
                                var dataClass = 'fa-navicon';
                                let $parent = $item.closest('.sociallink');
                                let $lastItem = $parent.find('.fonticon').last();
                                let $fontIcon = $lastItem.find('.font-icon');
                                html += '<div class="field-row data-row item">';
                                html += '<div class="field-row stElWrap col100">';
                                html += '<span class="fcol sfCol_8"><i class="fa fa-arrows-v SocialLinkSort"></i></span>';
                                html += '<span class="fcol sfCol_8">';
                                html += '<div class="socialLinkIcon" data-class="' + dataClass + '">';
                                html += '<i class="' + iconClass + '" style="color: rgb(255, 255, 255);" ></i>';
                                html += '</div>';
                                html += '</span>';
                                html += '<span class="sfCol_70 Ml-5 cb_input">';
                                html += '<input type="text"  value="#"  data-href="#"  class="sociallinkHrefText">';
                                html += '</span>';
                                html += '<span class="sfCol_6 Ml-10">';
                                //if (count > 1)
                                html += '<i class="in-form-icon fa fa-trash delete-icon deleteSocialLink" aria-hidden="true"></i>';
                                html += '</span>';
                                html += '</div>';
                                html += '</div>';
                                $(this).parent().parent().find(".sociallinkWrapper").prepend(html);
                                var comHtml = '';
                                var addedsociallink = $parent.find('.fonticon').eq(0).attr('class');
                                // comHtml += '<div class="editor-component groupSetting fonticon Dib  tH-50 mH-40 tW-50 mW-40  H-60 W-60  tMt-5 tMr-5 tMb-5 tMl-5 tPt-5 tPr-5 tPb-5 tPl-5 mMt-5 mMr-5 mMb-5 mMl-5 mPt-5 mPr-5 mPb-5 mPl-5   Mt-10 Mr-10 Mb-10 Ml-10 Pt-10 Pr-10 Pb-10 Pl-10" style="height: 50px; width: 50px; color: rgb(221, 221, 221); background-color: rgba(7, 104, 217, 0.918); border-radius: 61px;" data-backgroundcolor="color" data-backgroundimage="" data-id="17" data-type="font icon">';
                                comHtml += '<div class="' + addedsociallink + '" style="height: 50px; width: 50px; color: rgb(221, 221, 221); background-color: ' + $lastItem.css('backgroundColor') + '; border-radius: 61px;" data-backgroundcolor="color" data-backgroundimage="" data-id="17" data-type="font icon">';
                                //comHtml += '<div class="' + addedsociallink + '" style="height: 50px; width: 50px; color: ' + $lastItem.css('backgroundColor'); + '; background-color: rgba(7, 104, 217, 0.918); border-radius: 61px;" data-backgroundcolor="color" data-backgroundimage="" data-id="17" data-type="font icon">';
                                comHtml += '<div class="SetHdlr no-drag">';
                                comHtml += '<span class="stng">';
                                comHtml += '<i class="cb-stng" title="Settings" data-title="Social Link"></i>';
                                comHtml += '<ul class="setDrp no_txt" style="display: none;">';
                                comHtml += '<li class="com-settings" data-type="font icon" data-title="Social Link">';
                                comHtml += '<span class="text-wrp">Settings</span>';
                                comHtml += '<i class="cb-mxr" title="Settings"></i>';
                                comHtml += '</li>';
                                comHtml += '<li class="s-style" data-type="font icon" data-title="Social Link">';
                                comHtml += ' <span class="text-wrp">Style</span>';
                                comHtml += '<i class="cb-stl" title="Styles"></i>';
                                comHtml += '</li>';
                                comHtml += '</ul>';
                                comHtml += '</span>';
                                comHtml += '</div>';
                                comHtml += '<a class="socialAchor Dfx TxAl-c tTxAl-c mTxAl-c TxAl-m tTxAl-c mTxAl-c H-f" data-class="fa-navicon"  href="javascript:void(0)" data-href="#">';
                                //let regString = '\\bFs-[0-9]{1,2}\\b';
                                //let regx = new RegExp(regString, 'gi');
                                //let fontSize = $fontIcon.attr('class').match(regx);
                                let parentClasses = $fontIcon.attr('class');
                                let dAlpha = DeviceAlphaSpace();
                                let regex = new RegExp(dAlpha + 'Fs-[0-9]{1,4}', 'g');
                                let fontSizeClass = parentClasses.match(regex);
                                let fontSize = 0;
                                if (fontSizeClass !== null) {
                                    fontSize = fontSizeClass[0].replace(dAlpha + 'Fs-', '');
                                }

                                //  comHtml += '<i class="fa fa-navicon Fs-40 tFs-30 mFs-25 onhovercolor font-icon" style="color: rgb(255, 255, 255); font-size: 35px;"></i>';
                                comHtml += '<i class= "per ' + dAlpha + 'Fs-' + fontSize + ' tFs-30 mFs-25  fa fa-navicon  onhovercolor font-icon" style="color: ' + $fontIcon.css('color') + '; font-size: 35px;"></i>';
                                comHtml += '</a>';
                                comHtml += '</div>';
                                $parent.find(".socialLink").prepend(comHtml);
                                LoadSettings();
                                FormEvent();
                                SettingEvents();
                            });
                        }
                        function FontIcon() {
                            $('.fontIconCollection').html(EasyLibrary.FontCollectionList());
                            SearchFontIcon();
                        }
                        function SearchFontIcon() {
                            $('#SocialLinkSearchIcon').on('keyup', function () {
                                var searchVal = $(this).val();
                                $('#socialfontIconCollection').find('li').each(function () {
                                    var $this = $(this);
                                    var dataClass = $this.find('i').attr('data-class');
                                    var pos = dataClass.indexOf(searchVal);
                                    if (pos < 0) {
                                        $this.addClass('Dn');
                                    } else {
                                        $this.removeClass('Dn');
                                    }
                                });
                            });
                            $(".hideSocialIcon").on("click", function () {
                                $(this).closest(".socialLinkIconList").remove();
                            });
                            $('#socialfontIconCollection').find('li').on('click', function () {
                                var chooseClass = $(this).find('i').attr('data-class');
                                var $achorIcon = $parent.find('.socialAchor').eq(eleIndex);
                                var $editIcon = $('.sociallinkWrapper .item').eq(eleIndex).find('.socialLinkIcon');
                                $editIcon.attr('data-class', chooseClass);
                                $editIcon.find("i").eq(0).attr('class', 'fa ' + chooseClass);
                                $achorIcon.attr('data-class', chooseClass);
                                //$achorIcon.find("i").attr('class', 'fa ' + chooseClass);
                               //$achorIcon.find("i").attr('class', 'fa ' + chooseClass + ' onhovercolor' + ' font-icon');
                                $i = $achorIcon.find("i");
                                $i.remove('fa');
                                let faRegex = new RegExp('fa(-[a-z]{1,20}){0,6}', 'g');
                                let faClass = $i.attr('class').match(faRegex);
                                if (faClass !== null) {
                                    $(faClass).each(function (i, v) {
                                        $i.removeClass(v);
                                    });
                                }
                                $i.addClass('fa ' + chooseClass);
                                $('#socialfontIconCollection').find('li').removeClass('selected');
                                $(this).addClass('selected');
                                eleClasses = chooseClass;
                                $(".hideSocialIcon").trigger("click");
                            });
                        }
                    }
                },
                "Size": {
                    "DOM": EasyLibrary.ReadDOM("sociallinksize"),
                    "onload": function ($this) {
                        component["social link"].fontwrapper();
                        component["social link"].fontsize();
                    }
                },
                "Color": {
                    "DOM": EasyLibrary.ReadDOM('sociallinkcolor'),
                    "onload": function ($item) {
                        let $parent = $item.closest('.SetHdlr').parent();
                        var $backgroundcolor = $parent.find('.socialLink');
                        function loadColorPicker($parent) {
                            $('.backgroundcolor').css('background-color', $parent.css('background-color'));
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $parent.css('background-color', objColor.bgColor);
                                }
                            });
                            $('.backgroundcolor').colorPicker(colorPickerOption);
                            $('.wrapperbackgroundcolor').css('background-color', $parent.find('.fonticon').css('background-color'));
                            var colorPickerOption1 = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $parent.find('.fonticon').css('background-color', objColor.bgColor);
                                }
                            });
                            $('.wrapperbackgroundcolor').colorPicker(colorPickerOption1);
                            $('.fontcolor').css('background-color', $parent.find('.font-icon').css('color'));
                            var colorPickerOption2 = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $parent.find('.font-icon').css('color', objColor.bgColor);
                                }
                            });
                            $('.fontcolor').colorPicker(colorPickerOption2);
                        }
                        loadColorPicker($parent);
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": "<div id='marginForContainer'></div><div id='marginForIcons'></div>",
                    "onload": function ($item) {
                        let $parent = $item.closest('.SetHdlr').parent();
                        $("#marginForContainer").AdvanceSpacing({
                            targetParent: $parent,
                            targetElem: '.socialLink',
                            options: {
                                "margin": {
                                    "label": "Container Margin",
                                    "max": 80,
                                    "min": -80,
                                    "times": 5,
                                    "position": ["all", "top", "left", "bottom", "right"]
                                }
                            }
                        });
                        $("#marginForIcons").AdvanceSpacing({
                            targetParent: $parent,
                            targetElem: '.groupSetting',
                            options: {
                                "margin": {
                                    "label": "Icons Gotter Spacing",
                                    "max": 80,
                                    "min": 0,
                                    "times": 5,
                                    "position": ["left", "right"]
                                }
                            }
                        });
                    }
                },
                "Alignment": {
                    "options": {
                        "horizontal": ["left", "center", "right"]
                    }
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            }
        },

        "styleDOMs": {
            "tabs": {
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all"]
                    }
                },
                "Box Radius": {
                    "options": {
                        "max": 200,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    }
                },
                "Box Shadow":
                {
                    "options": {}
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
                        "fontwrapper": {
                            "DOM": CreateSliderDOM('fontIconbackHeightSlider', 'fontIconbackHeightHandle', 'font-wrapper'),
                            "prepend": "true",
                            "onload": function () {
                                component["social link"].fontwrapper();
                            }
                        },
                        "Font Size": {
                            "DOM": CreateSliderDOM('fontIconHeightSlider', 'fontIconHeightHandle', 'font-size'),
                            "prepend": "true",
                            "onload": function () {
                                component["social link"].fontsize();
                            }
                        },
                        "Visibility": {}
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": "<div id='marginForContainer'></div><div id='marginForIcons'></div>",
                    "onload": function ($item) {
                        $("#marginForContainer").AdvanceSpacing({
                            targetParent: $item,
                            targetElem: '.socialLink',
                            options: {
                                "margin": {
                                    "label": "Container Margin",
                                    "max": 80,
                                    "min": -80,
                                    "times": 5,
                                    "position": ["all", "top", "left", "bottom", "right"]
                                }
                            }
                        });
                        $("#marginForIcons").AdvanceSpacing({
                            targetParent: $item,
                            targetElem: '.groupSetting',
                            options: {
                                "margin": {
                                    "label": "Icons Gotter Spacing",
                                    "max": 80,
                                    "min": 0,
                                    "times": 5,
                                    "position": ["left", "right"]
                                }
                            }
                        });
                    }
                },
                "Alignment": {
                    "options": {
                        "horizontal": ["left", "center", "right"]
                    }
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            }
        },
        "fontsize": function () {
            let $parent = $activeDOM;
            let $icon = $parent.find('.font-icon');
            function LineHeightChange(space) {
                $icon = $parent.find('.font-icon');
                ReplaceClassByPattern($icon, 'Fs-[0-9]{1,4}', 'Fs-' + space);
            }
            AdvanceSageSlider($('#fontIconHeightSlider'), $('#fontIconHeightHandle'), 5, 1080, GetValueByClassName($icon, 'Fs-[0-9]{1,4}', 'Fs-'), LineHeightChange, $parent, 'px');
        },
        "fontwrapper": function () {
            let $parent = $activeDOM;
            let fonticon = $parent.find('.fonticon');
            function LineHeightChange(space) {
                fonticon = $parent.find('.fonticon');
                ReplaceClassByPattern(fonticon, 'H-[0-9]{1,4}', 'H-' + space);
                ReplaceClassByPattern(fonticon, 'W-[0-9]{1,4}', 'W-' + space);
            }
            AdvanceSageSlider($('#fontIconbackHeightSlider'), $('#fontIconbackHeightHandle'), 5, 1080, GetValueByClassName(fonticon, 'H-[0-9]{1,4}', 'H-'), LineHeightChange, fonticon, 'px');
        },
        "remove": function ($cloneDOM) {
            $cloneDOM.find('div[data-type="font icon"] .socialAchor').each(function () {
                $(this).attr("href", $(this).attr("data-href"));
            });
        }
    }
};