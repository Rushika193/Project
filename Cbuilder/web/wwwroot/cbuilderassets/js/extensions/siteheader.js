var siteheader = {
    "siteheader": {
        "componentname": "siteheader",
        "category": "pro",
        "icon": "fa fa-bars",
        "row": true,
        "hidden": false,
        "collection": false,
        "defaultdata": EasyLibrary.ReadDOM('siteheadertab'),
        "type": "Header",
        "typeicon": "fa fa-bars",
        "description": "Site header which consists of logo and menu",
        "Screenshot": "https://easybuilder.contentder.com/ComponentScreenshot/row.jpg",
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (dropped) {
                if ($appendLayer.parents(".editor-site-header").length === 0) {
                    SageAlertDialog("Site Header component must be dropped in the header!", "Alert");
                    $appendLayer.remove();
                } else {
                    if ($(".siteheader.customMenu").length > 1) {
                        SageAlertDialog("You cannot drop multiple site header components in the same page!", "Alert");
                        $appendLayer.remove();
                    } else {
                        //MenuHover($('#primaryColor').css('background-color'), $('#secondaryColor').css('background-color'));
                        let $ebmenu = $appendLayer.find('.editor-com-nav .eb-menu');
                        $ebmenu.html(EasyLibrary.PageListDOM());
                        $ebmenu.find('li span').addClass('Fs-20 mFs-18 tFs-16 Pr-15 Pl-15');
                        //$ebmenu.find('li span').css({ 'padding-right': '15px', 'padding-left': '15px', 'font-size': '16px', 'color': 'rgba(1, 1, 3, 0.95)' });
                        $ebmenu.find('li span').attr('style', '');
                        $ebmenu.find('li span').css('color', 'rgba(1, 1, 3, 0.95)');
                        $ebmenu.find('li').css({ 'line-height': '58px' });
                        $ebmenu.attr('data-navlinktextcol', 'rgba(1, 1, 3, 0.95)');
                    }
                }
                MenuHover(webBuilderSettings.primaryColor, webBuilderSettings.secondaryColor);
            }
            PagelinkStop();
            MenuDropEvents();
        },
        "beforedrop": function ($appendedParent, $appendLayer, dropped) {

        },
        "onsort": function ($ui) {
            if ($ui.parents(".editor-site-header").length === 0) {
                SageAlertDialog("Site Header component must be dropped in the header!", "Alert");
                $ui.remove();
            }
        },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("sitemenudetail"),
                    "DOMS": {
                        onecol: $(EasyLibrary.ReadDOM("onecolumnrow")),
                        onecol2: $(EasyLibrary.ReadDOM("onecolumnrow"))
                    },
                    "onload": function ($item) {
                        let _this = this;
                        var $parent = $activeDOM;
                        if ($parent.hasClass('editor-row-container')) {
                            $parent = $parent.parent();
                        }
                        InitEvents();

                        function InitEvents() {
                            component["siteheader"].common.LogoWidth();
                            ContainerWide();
                            HeaderStyle();
                            ArrangeItem();
                            ExtraSpace();
                            ExtraSpaceBelow();
                            StickyColor();
                            StickyImage();
                        }

                        function StickyImage() {
                            var logoSrc = $('.editor-site-header').find('#headerLogo').attr('data-stickyLogo');
                            if (logoSrc !== undefined && logoSrc.trim() !== "") {
                                $('#stickyLogo').attr("src", logoSrc);
                            }
                            $('#stickBGImage').on('click', function () {
                                var $this = $(this);
                                $this.SageMedia({
                                    userModuleID: webBuilderUserModuleID,
                                    onSelect: function (src, response, type, filename, extension) {
                                        src = src.replace(/\\/g, '/');
                                        //$this.attr('src', src);
                                        var $header = $('.editor-site-header').find('#headerLogo');
                                        $("#stickyLogo").attr('src', src);
                                        $header.attr('data-stickyLogo', src);
                                        //$parent.css({
                                        //    'background-image': 'url("' + src + '")'
                                        //});
                                    },
                                    mediaType: 'image'
                                });
                            });
                        }

                        function ContainerWide() {
                            var $container = $parent.find('div.editor-row-container');
                            if ($container.length > 0) {
                                $('#menuContainer').prop('checked', true);
                                $('#additionalMenuContainer').show(400);
                                var conClass = $container.attr('class').replace('editor-row-container', '').trim();
                                $('#menuContainerWidth').val(conClass);
                            } else {
                                $('#menuContainer').prop('checked', false);
                            }
                            $('#menuContainer').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    var containerDiv = divStart('editor-row-container container-medium') + divEnd;
                                    var $appendElem = '';
                                    $appendElem = $parent.find('.cGrid');
                                    $parent.append(containerDiv);
                                    $parent.find('.editor-row-container').append($appendElem);
                                    $('#menuContainerWidth').val('container-medium');
                                    $('#additionalMenuContainer').fadeIn(400);
                                } else {
                                    var appendElem = $parent.find('.editor-row-container').children();
                                    $parent.append(appendElem);
                                    $parent.find('.editor-row-container').remove();
                                    $('#additionalMenuContainer').fadeOut(400);
                                }
                            });

                            $('#menuContainerWidth').off().on('change', function () {
                                var containWidth = $(this).val();
                                var $container = $parent.find('.editor-row-container');
                                $container.removeClass('container-small').removeClass('container-medium').removeClass('container-large').removeClass('container-extralarge').removeClass('container-fluid');
                                $container.addClass(containWidth);
                            });
                        }

                        function HeaderStyle() {
                            var parentClasses = $('.site-body').attr('class').match(/hdr-[a-z]{1,20}/g);
                            var headerEffect = 'hdr-nml';
                            if (parentClasses !== null) {
                                headerEffect = parentClasses[0];
                            }
                            $('#menuHeaderStyle').find('i').removeClass('selected');
                            $('#menuHeaderStyle').find('i[data-class="' + headerEffect + '"]').addClass('selected');
                            if (headerEffect === "hdr-stky")
                                $('.StickyOptions').show();
                            else
                                $('.StickyOptions').hide();
                            $('#menuHeaderStyle > i').on('click', function () {
                                var parentClasses_ = $('.site-body').attr('class').match(/hdr-[a-z]{1,20}/g);
                                if (parentClasses_ !== null) {
                                    $('.site-body').removeClass(parentClasses_[0]);
                                }
                                var menuStyle = $(this).attr('data-class');
                                $('.site-body').addClass(menuStyle);
                                $('#menuHeaderStyle').find('i').removeClass('selected');
                                $('#menuHeaderStyle').find('i[data-class="' + menuStyle + '"]').addClass('selected');
                                webBuilderSettings.SiteHeaderEffect = menuStyle;
                                switch (menuStyle) {
                                    case 'hdr-fxd':
                                        //var containerWidth = $('.editor-componentWrapper').css('width');
                                        //$('.editor-site-header').css('width', containerWidth);
                                        $('.StickyOptions').hide();
                                        $('.edit-area').removeClass('stick');
                                        break;
                                    case 'hdr-stky':
                                        //$('.editor-site-header').css('width', '');
                                        $('.StickyOptions').show();
                                        $('.edit-area').removeClass('stick');
                                        break;
                                    case 'hdr-abs':
                                        //$('.editor-site-header').css('width', '');
                                        $('.StickyOptions').hide();
                                        $('.edit-area').removeClass('stick');
                                        break;
                                    default:
                                        $('.editor-site-header > .cRow').removeClass('stick');
                                        $('.editor-componentWrapper').css('padding-top', '');
                                        $('.StickyOptions').hide();
                                        $('.editor-site-header').css('width', '');
                                        break;
                                }
                                // HeaderTopPadding();
                            });
                        }

                        function StickyColor() {
                            var $header = $('.editor-site-header > .cRow');
                            var $headerColor = $header.attr('data-mbgcolor');
                            if (typeof $headerColor !== "undefined") {
                                $('#chooseBGColorMenumove').css('background-color', $headerColor);
                            }
                            $headerColor = $header.attr('data-mcolor');
                            if (typeof $headerColor !== "undefined") {
                                $('#chooseColorMenumove').css('background-color', $headerColor);
                            }
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    var colorPickerID = $elm.attr('id');
                                    switch (colorPickerID) {
                                        case 'chooseBGColorMenumove':
                                            $header.attr('data-mbgcolor', objColor.bgColor);
                                            break;
                                        case 'chooseColorMenumove':
                                            $header.attr('data-mcolor', objColor.bgColor);
                                            break;
                                    }
                                }
                            });
                            $('.chooseHeadMenuColor').colorPicker(colorPickerOption);
                        }

                        function ArrangeItem() {
                            var headerType = $parent.attr("data-headertype");
                            $('.menuHeaderLogoStyle').find('i').removeClass('selected');
                            $('.menuHeaderLogoStyle').find('i[data-class="' + headerType + '"]').addClass('selected');
                            $('.menuHeaderLogoStyle > i').on('click', function () {
                                // var $logo = $parent.find('#headerLogo').parent().parent();
                                // var $menu = $parent.find('div.menuHeader').parent();                                                              
                                var value = $(this).attr('data-class');
                                $('.menuHeaderLogoStyle').find('i').removeClass('selected');
                                $('.menuHeaderLogoStyle').find('i[data-class="' + value + '"]').addClass('selected');
                                switch (value) {
                                    case 'lLogo':
                                    case 'lMenu':
                                        $('#menuwidth').show();
                                        break;
                                    case 'logotop':
                                        $('#menuwidth').hide();
                                        break;
                                }
                                // if (value == "lLogo")
                                // {
                                //     $logo.insertBefore($menu);
                                //     $logo.hasClass('sfCol_100')
                                //     {
                                //         $logo.removeClass('sfCol_100');
                                //         $logo.addClass('sfCol_20');
                                //     }
                                //     $menu.hasClass('sfCol_100')
                                //     {
                                //         $menu.removeClass('sfCol_100');
                                //         $menu.addClass('sfCol_80');
                                //     }                                    

                                // } else if (value == "lMenu") {
                                //     $menu.insertBefore($logo);
                                //     $logo.hasClass('sfCol_100')
                                //     {
                                //         $logo.removeClass('sfCol_100');
                                //         $logo.addClass('sfCol_20');
                                //     }
                                //     $menu.hasClass('sfCol_100')
                                //     {
                                //         $menu.removeClass('sfCol_100');
                                //         $menu.addClass('sfCol_80');
                                //     }
                                // }
                                // else if (value == "logotop") {
                                //     $logo.insertBefore($menu);
                                //     $logo.removeClass('sfCol_20');
                                //     $logo.addClass('sfCol_100');
                                //     $menu.addClass('sfCol_100');
                                // }
                                $parent.attr("data-headertype", value);

                            });
                        }


                        //function ArrangeItem() {
                        //    var $menuPosition = $parent.find('div.editor-col').eq(0).find('.editor-component.menuHeader');
                        //    var menu = DOMCreate('span', 'Menu', 'menuSwiper', 'menuSwiper');
                        //    var logo = DOMCreate('span', 'Logo', 'logoSwiper', 'logoSwiper');

                        //    var lefticon = DOMCreate('i', '', 'fa fa-arrow-left');
                        //    var righticon = DOMCreate('i', '', 'fa fa-arrow-right');
                        //    var swiper = DOMCreate('span', lefticon + 'Swipe' + righticon, 'logoMenuSwiper', 'logoMenuSwiper')
                        //    var $swiper = '';
                        //    if ($menuPosition.length == 0) {
                        //        $swiper = logo + swiper + menu;
                        //    } else {
                        //        $swiper = menu + swiper + logo;
                        //    }
                        //    $('#menuSwiperWrapper').html($swiper);
                        //    HeaderSwiperEvents();
                        //}

                        //function HeaderSwiperEvents() {
                        //    $('#logoMenuSwiper').off().on('click', function () {
                        //        var $menuPosition = $parent.find('div.editor-col').eq(0).find('.editor-component.menuHeader');
                        //        var $menu = $parent.find('div.editor-col').find('.editor-component.menuHeader');
                        //        if ($menuPosition.length == 0) {
                        //            $parent.find('.colWrapper').prepend($menu.parent());
                        //        } else {
                        //            $parent.find('.colWrapper').append($menu.parent());
                        //        }
                        //        ArrangeItem();
                        //    });
                        //}

                        function ExtraSpace() {
                            if ($('.editor-site-header').find('.rowaboveheader').length === 1) {
                                $('#menuUpperContainer').prop('checked', true);
                            } else {
                                $('#menuUpperContainer').prop('checked', false);
                            }
                            $('#menuUpperContainer').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    var $rowAbove = _this.DOMS.onecol;
                                    $rowAbove.insertBefore($parent);
                                    SettingEvents();
                                    DeleteComponent();
                                    DraggableSortable();
                                    RowEvents();
                                    DeleteComponent();
                                    SettingEvents();
                                    $rowAbove.addClass('rowaboveheader');
                                    $rowAbove.find('.drag').remove();
                                    $rowAbove.find('.copyRow').remove();
                                    $rowAbove.find('.dltRw').remove();
                                    $rowAbove.find('.mvDn').remove();
                                    BindColumnEvents($rowAbove);
                                } else {
                                    $('.rowaboveheader').remove();
                                }
                            });
                        }

                        function ExtraSpaceBelow() {
                            if ($('.editor-site-header').find('.rowbelowheader').length === 1) {
                                $('#menuBelowContainer').prop('checked', true);
                            } else {
                                $('#menuBelowContainer').prop('checked', false);
                            }
                            $('#menuBelowContainer').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    var $rowAbove = _this.DOMS.onecol2;
                                    $rowAbove.insertAfter($parent);
                                    SettingEvents();
                                    DeleteComponent();
                                    DraggableSortable();
                                    RowEvents();
                                    DeleteComponent();
                                    SettingEvents();
                                    $rowAbove.addClass('rowbelowheader');
                                    $rowAbove.find('.drag').remove();
                                    $rowAbove.find('.copyRow').remove();
                                    $rowAbove.find('.dltRw').remove();
                                    $rowAbove.find('.mvDn').remove();
                                    BindColumnEvents($rowAbove);
                                } else {
                                    $('.rowbelowheader').remove();
                                }
                            });
                        }
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": '<div class="field-row"><div id="siteHeaderMSpacing"></div><div id="siteHeaderPSpacing"></div></div>',
                    onload: function () {
                        component["siteheader"].common.spacing();
                    }
                },
                "Alignment": {
                    "custom": true,
                    "DOM": '<div class="field-row"><div id="siteHeaderAlign"></div></div>',
                    "onload": function ($item) {
                        component["siteheader"].common.alignment();
                    }
                }
            },
            "selectLayer": function ($elem) {
                var $parent = $activeDOM;
                return $parent;
            }
        },
        "styleDOMs": {
            "tabs": {
                "Background": {
                    "options": ["image", "color"]
                },
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"]
                    }
                },
                "Box Radius": {
                    "options": {
                        "max": 50,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    }
                },
                "Box Shadow": {
                    "options": {},
                    "selectLayer": function ($elem) {
                        return $activeDOM;
                    }
                }
            },
            "selectLayer": function ($elem) {
                var $parent = $activeDOM;
                return $parent;
            }
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "ordering": {},
                        "logowidth": {
                            "prepend": "true",
                            "DOM": "<div id='menuwidth'></div>",
                            "onload": function ($item) {
                                component["siteheader"].common.LogoWidth();
                            }
                        },
                        "Height": {}
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": '<div class="field-row"><div id="siteHeaderMSpacing"></div><div id="siteHeaderPSpacing"></div></div>',
                    onload: function () {
                        component["siteheader"].common.spacing();
                    }
                },
                "Alignment": {
                    "custom": true,
                    "DOM": '<div class="field-row"><div id="siteHeaderAlign"></div></div>',
                    "onload": function ($item) {
                        component["siteheader"].common.alignment();
                    }
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            }
        },
        "common": {
            "LogoWidth": function () {
                var $imageCol = $activeDOM.find('#headerLogo').parent().parent().parent();
                $("#menuwidth").AdvanceDimension({
                    type: 'sfwidth',
                    targetParent: $imageCol,
                    targetElem: $imageCol,
                    label: 'Logo Width',
                    defaultValue: 100,
                    callback: function (width) {
                        $holder = $activeDOM.find('.menuHeader').parent();
                        ReplaceClassByPattern($holder, 'sfCol_[0-9]{1,3}', 'sfCol_' + (100 - parseInt(width)));
                    }
                });
            },
            "spacing": function () {
                $("#siteHeaderMSpacing,#siteHeaderPSpacing").html('');
                $("#siteHeaderMSpacing").AdvanceSpacing({
                    targetParent: $activeDOM,
                    targetElem: $activeDOM,
                    options: {
                        "margin": {
                            "max": 40,
                            "min": -40,
                            "times": 5,
                            "position": ["all", "top", "bottom", "left", "right"]
                        }
                    }
                });
                $("#siteHeaderPSpacing").AdvanceSpacing({
                    targetParent: $activeDOM,
                    targetElem: $activeDOM,
                    options: {
                        "padding": {
                            "max": 40,
                            "min": 0,
                            "times": 5,
                            "position": ["all", "top", "bottom", "left", "right"]
                        }
                    }
                });
            },
            "alignment": function () {
                $('#siteHeaderAlign').html('');
                $("#siteHeaderAlign").AdvanceAlignment({
                    targetParent: $activeDOM.parent(),
                    targetElem: $activeDOM
                });
            }
        },
        "remove": function ($view) {
            $view.find(".plusBtn").remove();
        }
    }
};