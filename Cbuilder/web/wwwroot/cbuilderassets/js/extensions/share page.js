var share_page = {
    "share page": {
        "componentname": "share page",
        "category": "advance",
        "icon": "fa fa-share",
        "row": false,
        "bucket": true,
        "hidden": false,
        "collection": true,
        "type": "element",
        "defaultdata": EasyLibrary.ReadDOM("sharepage/sharepagedefault"),
        "beforeDrop": function ($this) { },
        "afterdrop": function ($appendparent, $appendLayer, dropped) {
            if (dropped) {
                //this.view.library.clickShareButton();
            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("sharepage/basicsetting"),
                    "onload": function ($this) {
                        var $parent = $this.closest('.SetHdlr').parent();
                        LoadSetting();
                        InitEvent();

                        function LoadSetting() {
                            let loadsetting = ["normal", "fixleft", "fixright"];
                            for (var i = 0; i < loadsetting.length; i++) {
                                let $hasposclass = $this.closest('.SetHdlr').parent().hasClass(loadsetting[i]);
                                if ($hasposclass == true) {
                                    $("#pageshareorintation").prop('selectedIndex', i);
                                    break;
                                }
                            }
                        }
                        function InitEvent() {
                            $('#pageshareorintation').on('change', function () {
                                let $orintation = $(this).val();
                                $this.closest('.SetHdlr').parent().removeClass('normal').removeClass('fixleft').removeClass('fixright');
                                switch ($orintation) {
                                    case "Normal": {
                                        $this.closest('.SetHdlr').parent().addClass("normal");
                                        break;
                                    }
                                    case "Fix-left": {
                                        $this.closest('.SetHdlr').parent().addClass("fixleft");
                                        break;
                                    }
                                    case "Fix-right": {
                                        $this.closest('.SetHdlr').parent().addClass("fixright");
                                        break;
                                    }
                                }
                            });
                            FontWrapperSize();
                            FontSize();
                            function FontWrapperSize() {
                                component["share page"].fontLib.fontwrapper();
                            }

                            function FontSize() {
                                component["share page"].fontLib.fontsize();
                            }
                        }
                    }
                },

                "Display": {
                    "DOM": EasyLibrary.ReadDOM("sharepage/hideshowsharepage"),
                    "onload": function ($this) {
                        var $parent = $this.closest('.pageshare');
                        var $sharebuttoncollection = $parent.find('.sharebuttoncollection');
                        InitEvent();
                        displaysetting();
                        function displaysetting() {
                            var isfacebookhidden = $sharebuttoncollection.find('.facebook').hasClass('Dn');
                            $('#showfacebook').prop('checked', !isfacebookhidden);

                            var istwitterhidden = $parent.find('.twitter').hasClass('Dn');
                            $('#showtwitter').prop('checked', !istwitterhidden);

                            var isgooglehidden = $parent.find('.google').hasClass('Dn');
                            $('#showgoogle').prop('checked', !isgooglehidden);

                            var ismailhidden = $parent.find('.mail').hasClass('Dn');
                            $('#showmail').prop('checked', !ismailhidden);

                            var ispinteresthidden = $parent.find('.pinterest').hasClass('Dn');
                            $('#showpinterest').prop('checked', !ispinteresthidden);

                            var islinkinhidden = $parent.find('.linkedin').hasClass('Dn');
                            $('#Showlinkedin').prop('checked', !islinkinhidden);
                        }

                        function InitEvent() {
                            var orderedSetDOM = [];
                            var $items = $parent.find('.sharepage');
                            $.each($items, function (index, value) {
                                orderedSetDOM.push($('.' + $(value).attr('data-ForSort')));
                            });
                            $('.ShareComponentsControl').html('');
                            $('.ShareComponentsControl').append(orderedSetDOM);

                            $('#showfacebook').on('change', function () {
                                var checked = $(this).prop('checked');
                                if (checked === true) {
                                    $parent.find('.facebook').addClass("Dib");
                                    $parent.find('.facebook').removeClass("Dn");
                                }
                                else {
                                    $parent.find('.facebook').removeClass("Dib");
                                    $parent.find('.facebook').addClass("Dn");
                                }
                            });

                            $('#showtwitter').on('change', function () {
                                var checked = $(this).prop('checked');
                                if (checked === true) {

                                    $parent.find('.twitter').addClass("Dib");
                                    $parent.find('.twitter').removeClass("Dn");
                                }
                                else {
                                    $parent.find('.twitter').removeClass("Dib");
                                    $parent.find('.twitter').addClass("Dn");

                                }


                            });

                            $('#showgoogle').on('click', function () {
                                var checked = $(this).prop('checked');
                                if (checked === true) {
                                    $parent.find('.google').addClass("Dib");
                                    $parent.find('.google').removeClass("Dn");
                                }
                                else {
                                    $parent.find('.google').removeClass("Dib");
                                    $parent.find('.google').addClass("Dn");
                                }
                            });
                            $('#showmail').on('click', function () {
                                var checked = $(this).prop('checked');
                                if (checked === true) {
                                    $parent.find('.mail').addClass("Dib");
                                    $parent.find('.mail').removeClass("Dn");
                                }

                                else {
                                    $parent.find('.mail').removeClass("Dib");
                                    $parent.find('.mail').addClass("Dn");
                                }
                            });
                            $('#showpinterest').on('click', function () {
                                var checked = $(this).prop('checked');

                                if (checked === true) {
                                    $parent.find('.pinterest').addClass("Dib");
                                    $parent.find('.pinterest').removeClass("Dn");
                                }
                                else {
                                    $parent.find('.pinterest').removeClass("Dib");
                                    $parent.find('.pinterest').addClass("Dn");
                                }
                            });

                            $('#Showlinkedin').on('click', function () {
                                var checked = $(this).prop('checked');

                                if (checked === true) {
                                    $parent.find('.linkedin').addClass("Dib");
                                    $parent.find('.linkedin').removeClass("Dn");
                                }
                                else {
                                    $parent.find('.linkedin').removeClass("Dib");
                                    $parent.find('.linkedin').addClass("Dn");
                                }
                            });

                            $(".ShareComponentsControl").AdvanceSorting({
                                targetParent: $parent,
                                targetElem: '.sharepage',
                                sortableOptions: {
                                    items: "div.SiteShare",
                                    handle: ".sortHandle",
                                    containment: 'div.ShareComponentsControl'
                                }
                            });
                        }
                    }
                },


                "Spacing": {
                    "custom": true,
                    "DOM": "<div id='marginForContainer'></div><div id='marginForIcons'></div>",
                    "onload": function ($item) {
                        let $parent = $item.closest('.SetHdlr').parent();
                        $("#marginForContainer").AdvanceSpacing({
                            targetParent: $parent,
                            targetElem: '.sharebuttoncollection',
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
                            targetElem: '.fonticon',
                            options: {
                                "margin": {
                                    "label": "Icon Margin",
                                    "max": 80,
                                    "min": 0,
                                    "times": 5,
                                    "position": ["top", "left", "bottom", "right"]
                                }
                            }
                        });
                    }
                }
            },
            "selectLayer": function ($elem) {
                return $elem.closest('.pageshare');
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
                    }
                },
                "Background": {
                    "options": ["color"]
                },
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"]
                    }
                }
            },
            "selectLayer": function ($elem) {
                return $elem.closest(".pageshare");
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
                        "Visibility": {},
                        "CustomVisibility": {
                            "custom": true,
                            "DOM": '<div class="componentVisibility"><div id="rtwitter"></div><div id="rfacebook"></div><div id="rgoogle"></div><div id="rmail"></div><div id="rpinterest"></div><div id="rlinkedin"></div></div>',
                            onload: function () {
                                Visibility();
                                function Visibility() {
                                    let parentClasses = $activeDOM.attr('class');
                                    let dAlpha = DeviceAlphaSpace();
                                    let regex = new RegExp(dAlpha + 'Dn', 'g');
                                    let visibilityClass = parentClasses.match(regex);
                                    if (visibilityClass !== null)
                                        $('#deviceVisibility').prop('checked', false);
                                    else
                                        $('#deviceVisibility').prop('checked', true);

                                    $('#deviceVisibility').off().on('click', function () {
                                        dAlpha = DeviceAlphaSpace();
                                        if ($(this).is(':checked')) {
                                            $activeDOM.removeClass(dAlpha + 'Dn').addClass(dAlpha + 'Dib');
                                            $('.componentVisibility').show();
                                        }
                                        else {
                                            $activeDOM.addClass(dAlpha + 'Dn').removeClass(dAlpha + 'Dib');
                                            $('.componentVisibility').hide();
                                        }
                                    });
                                }

                                $('#rtwitter').AdvanceVisibility({
                                    targetParent: $activeDOM,
                                    targetElem: '.twitter',
                                    label: 'Twitter'
                                });
                                $('#rfacebook').AdvanceVisibility({
                                    targetParent: $activeDOM,
                                    targetElem: '.facebook',
                                    label: 'Facebook'
                                });
                                $('#rgoogle').AdvanceVisibility({
                                    targetParent: $activeDOM,
                                    targetElem: '.google',
                                    label: 'Google'
                                });
                                $('#rmail').AdvanceVisibility({
                                    targetParent: $activeDOM,
                                    targetElem: '.mail',
                                    showCls: "Db",
                                    label: 'Email'
                                });
                                $('#rpinterest').AdvanceVisibility({
                                    targetParent: $activeDOM,
                                    targetElem: '.pinterest',
                                    showCls: "Db",
                                    label: 'Pinterest'
                                });
                                $('#rlinkedin').AdvanceVisibility({
                                    targetParent: $activeDOM,
                                    targetElem: '.linkedin',
                                    showCls: "Db",
                                    label: 'Linkedin'
                                });
                            }
                        }
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": "<div id='marginForContainer'></div><div id='marginForIcons'></div>",
                    "onload": function ($item) {
                        $("#marginForContainer").AdvanceSpacing({
                            targetParent: $item,
                            targetElem: '.sharebuttoncollection',
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
                            targetElem: '.fonticon',
                            options: {
                                "margin": {
                                    "label": "Icons Gotter Spacing",
                                    "max": 80,
                                    "min": 0,
                                    "times": 5,
                                    "position": ["all", "top", "left", "bottom", "right"]
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
        "fontLib": {
            "fontsize": function () {
                let $parent = $activeDOM;
                let $icon = $parent.find('.font-icon');
                function LineHeightChange(space) {
                    ReplaceClassByPattern($icon, 'Fs-[0-9]{1,4}', 'Fs-' + space);
                }
                AdvanceSageSlider($('#fontIconHeightSlider'), $('#fontIconHeightHandle'), 5, 1080, GetValueByClassName($icon, 'Fs-[0-9]{1,4}', 'Fs-'), LineHeightChange, $parent, 'px');
            },

            "fontwrapper": function () {
                let $parent = $activeDOM;
                let fonticon = $parent.find('.sharepage');

                function LineHeightChange(space) {
                    ReplaceClassByPattern(fonticon, 'H-[0-9]{1,4}', 'H-' + space);
                    ReplaceClassByPattern(fonticon, 'W-[0-9]{1,4}', 'W-' + space);
                }
                AdvanceSageSlider($('#fontIconbackHeightSlider'), $('#fontIconbackHeightHandle'), 5, 1080, GetValueByClassName(fonticon, 'H-[0-9]{1,4}', 'H-'), LineHeightChange, fonticon, 'px');
            }
        },


        "view": {
            "view": function () {
                this.library.clickShareButton();
            },
            "library": {
                "clickShareButton": function () {
                    $('.pageshare').find(".sharepage").on("click", function () {
                        var sharer = $(this).attr("data-sharer");
                        switch (sharer) {
                            case "facebook":
                                {
                                    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL) + '&t=' + encodeURIComponent(document.URL), 'Facebook-Popup', 'height=350,width=600');
                                }
                                break;

                            case "twitter":
                                {
                                    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.URL), 'Twitter-Popup', 'height=350,width=600');
                                }
                                break;

                            case "google":
                                {
                                    window.open('https://plus.google.com/share?url=' + encodeURIComponent(document.URL), 'Google-Popup', 'height=350,width=600');
                                }
                                break;

                            case "mail":
                                {
                                    window.open('mailto:?subject=' + encodeURIComponent(document.title) + '&body=' + encodeURIComponent(document.URL), 'Gmail-popup', 'height=350,width=600');
                                }
                                break;

                            case "pinterest":
                                {
                                    window.open('http://pinterest.com/pin/create/button/?url=' + encodeURIComponent(document.URL) + '&description=' + encodeURIComponent(document.title), 'LinkedIn-popup', 'height=350,width=600');
                                }
                                break;

                            case "linkedin":
                                {
                                    window.open('http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(document.URL) + '&title=' + encodeURIComponent(document.title), 'LinkedIn-popup', 'height=500,width=1000');
                                }
                                break;

                            case "default":

                                {
                                    alert('Please Choose Valid Social Site');
                                }
                        }
                    });


                }
            }
        }
    }
};