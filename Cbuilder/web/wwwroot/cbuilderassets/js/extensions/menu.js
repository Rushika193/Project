var menu = {
    "menu": {
        "componentname": "menu",
        "category": "basic",
        "icon": "fa fa-bars",
        "row": false,
        "hidden": false,
        "collection": false,
        "type": "element",
        "bucket": false,
        "defaultdata": '<div class="menuWrapper"></div>',
        "dom": {
            "menusettings": EasyLibrary.ReadDOM("menusettings")
        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            var html = this.dom.menusettings;
            if (dropped) {
                $appendLayer.html(html);
                $appendLayer.find('.webMenu').find('.menulist').html(EasyLibrary.PageListDOM());
                $appendLayer.find('.pageName').addClass('Fs-20 tFs-18 mFs-16');
                $appendLayer.find('.pagelink').addClass('mPl-5 Pl-10 tPr-5 mPr-5 Pr-10 tPl-5');
                SettingEvents();
                MenuHover(webBuilderSettings.primaryColor, webBuilderSettings.secondaryColor);
            }
        },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("sitemenubasic"),
                    "onload": function ($item) {
                        var type = $item.attr('data-menuType');
                        var $parent = $activeDOM;
                        var $nav = $parent.find('nav');
                        var onePAgeType = $nav.attr('data-active');
                        var $ebMenu;
                        if (onePAgeType === 'onepagemenu') {
                            $ebMenu = $nav.find('ul.onepagemenu');
                        } else {
                            $ebMenu = $nav.find('ul.eb-menu');
                        }
                        var $text = $ebMenu.find('.pageName');
                        var $hamIcon = $('.res-menu-trigger');
                        InitEvents();

                        function InitEvents() {
                            component["menu"].common.LogoWidth();
                            if ($parent.hasClass('menuHeader')) {
                                $('#MenuStyleWrapper').show();
                            } else {
                                $('#MenuStyleWrapper').hide();
                            }
                            if (!$activeDOM.hasClass('menuHeader')) {
                                $('#headerTypeMenu [data-class="msty-tred"]').attr('title', 'Horizontal');
                                $('#headerTypeMenu [data-class="msty-ham"]').attr('title', 'Vertical');
                            }
                            $('#menuTextColor').css('background-color', $parent.find('.pagelink').not('.active-page').find('.pageName').eq(0).css('color'));
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $parent.find('.pagelink').not('.active-page').find('.pageName').css('color', objColor.bgColor);
                                    $ebMenu.attr('data-textcolor', objColor.bgColor);
                                }
                            });
                            $('#menuTextColor').colorPicker(colorPickerOption);

                            $('#menuBackgroundColor').css('background-color', $parent.css('background-color'));
                            var menuBackgroundColor = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $parent.css('background-color', objColor.bgColor);
                                    $ebMenu.not(':eq(0)').css('background-color', objColor.bgColor);
                                }
                            });
                            $('#menuBackgroundColor').colorPicker(menuBackgroundColor);
                            $("#menuBorderRadius").html('');
                            $("#menuBorderRadius").AdvanceBoxRadius({
                                targetParent: $activeDOM,
                                targetElem: $text.parent(),
                                options: {
                                    "max": 100,
                                    "min": 0,
                                    "times": 1,
                                    "position": ["all"]
                                }
                            });
                            $('#menuTextBGColor').css('background-color', $parent.find('.pagelink').not('.active-page').eq(0).css('background-color'));
                            var txtcolorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $parent.find('.pagelink').not('.active-page').css('background-color', objColor.bgColor);
                                    $ebMenu.attr('data-textbgcolor', objColor.bgColor);
                                }
                            });
                            $('#menuTextBGColor').colorPicker(txtcolorPickerOption);

                            $('#menuTextBorColor').css('background-color', $parent.find('.pagelink').eq(0).css('border-color'));
                            var menuTextBorColor = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $parent.find('.pagelink').css('border-color', objColor.bgColor);
                                    $ebMenu.attr('data-textborcolor', objColor.bgColor);
                                }
                            });
                            $('#menuTextBorColor').colorPicker(menuTextBorColor);

                            $('#navLinkBGCol').css('background-color', $ebMenu.attr('data-navLinkBGCol'));
                            var navLinkBGCol = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $ebMenu.find('> li > a.active-page ').css('background-color', objColor.bgColor);
                                    $ebMenu.attr('data-navLinkBGCol', objColor.bgColor);
                                }
                            });
                            $('#navLinkBGCol').colorPicker(navLinkBGCol);

                            $('#navLinkTextCol').css('background-color', $ebMenu.attr('data-navLinkTextCol'));
                            var navLinkTextCol = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $ebMenu.find(' > li > a.active-page >span ').css('color', objColor.bgColor);
                                    $ebMenu.attr('data-navLinkTextCol', objColor.bgColor);
                                }
                            });
                            $('#navLinkTextCol').colorPicker(navLinkTextCol);

                            $('#hamIconColor').css('background-color', $hamIcon.find('span').eq(0).css('background-color'));
                            var hamIconColor = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $hamIcon.find('span').css('background-color', objColor.bgColor);
                                }
                            });
                            $('#hamIconColor').colorPicker(hamIconColor);
                            $("#menuTextSettings").html();
                            $("#menuTextSettings").AdvanceTextSetting({
                                targetParent: $parent,
                                targetElem: $text,
                                options: {
                                    width: false,
                                    color: false,
                                    maxFontSize: 100
                                }
                            });
                            //fontSize();
                            //letterSpacing();
                            //TextTranformCheck();
                            MenuTradHemStyle();
                            MenuHemStyle();
                            MenuStyle();
                            MenuLineBorderWidth();
                            MenuLineBorderColor();
                            NavLinkBorderColor();
                            if (!$activeDOM.hasClass('menuHeader'))
                                loadMenuStyle();
                        }
                        function MenuTradHemStyle() {
                            var menuSty = 'msty-tred';
                            $(".hamIconWrp").hide();
                            var parentClasses = $parent.parent().attr('class').match(/msty-[a-z]{1,20}/g);
                            if (parentClasses !== null) {
                                menuSty = parentClasses[0];
                            }
                            if (menuSty === 'msty-ham') {
                                $(".hamIconWrp").show();
                            }
                            $('#menuStyles').find('i').removeClass('selected');
                            $('#menuStyles').find('i[data-class="' + menuSty + '"]').addClass('selected');
                            $('#menuStyles > i').on('click', function () {
                                //$parent.parent().removeClass('msty-tred').removeClass('msty-ham');
                                var menuTStyle = $(this).attr('data-class');
                                let menuType = $activeDOM.hasClass('menuHeader');
                                $('#menuStyles').find('i').removeClass('selected');
                                $('#menuStyles').find('i[data-class="' + menuTStyle + '"]').addClass('selected');
                                switch (menuTStyle) {
                                    case 'msty-tred':
                                        if (menuType) {
                                            $('body').removeClass('offset-left').removeClass('offset-right').removeClass('offset-top');
                                            $(".msty-ham").addClass('Dn tDb mDb');
                                            $(".msty-tred").removeClass('Dn');
                                        } else changeMenuStyle('horizontal');
                                        break;
                                    case 'msty-ham':
                                        if (menuType) {
                                            $(".msty-tred").addClass('Dn');
                                            $(".msty-ham").removeClass('Dn tDb mDb');
                                            $parent.find('.res-menu-trigger').trigger('click');
                                            $('#hamMenuStyles > i.selected').trigger('click');
                                        } else changeMenuStyle('side');
                                        break;
                                    default:
                                        break;
                                }
                                if (menuType)
                                    $("." + menuTStyle).find('.com-settings[data-type="menu"]').trigger("click");
                            });
                        }
                        function changeMenuStyle(menuType) {
                            var $ebmenu = $parent.find('nav > ul');
                            $ebmenu.removeClass('horizontal').removeClass('side').removeClass('footer').removeClass('Dfx').removeClass('flxWrp');
                            if (menuType == 'horizontal') {
                                $ebmenu.addClass('Dfx').addClass('flxWrp');

                            } else if (menuType == 'side') { }

                            $ebmenu.attr('data-menu', menuType).addClass(menuType);

                        }
                        function MenuHemStyle() {
                            var hamSty = 'ham-right';
                            var parentClasses = $parent.parent().attr('class').match(/ham-[a-z]{1,20}/g);
                            if (parentClasses !== null) {
                                hamSty = parentClasses[0];
                            }
                            $('#hamMenuStyles').find('i').removeClass('selected');
                            $('#hamMenuStyles').find('i[data-class="' + hamSty + '"]').addClass('selected');
                            $('#hamMenuStyles > i').on('click', function () {
                                $parent.parent().removeClass('ham-left').removeClass('ham-right').removeClass('ham-top');
                                $('body').removeClass('offset-left').removeClass('offset-right').removeClass('offset-top');
                                var menuStyle = $(this).attr('data-class');
                                $ebMenu.attr('data-navHamType', menuStyle);
                                $parent.parent().not('.msty-tred').addClass(menuStyle);
                                $('#hamMenuStyles').find('i').removeClass('selected');
                                $('#hamMenuStyles').find('i[data-class="' + menuStyle + '"]').addClass('selected');
                                $(".res-menu-trigger").trigger("click");
                            });
                        }

                        function MenuLineBorderWidth() {
                            var menuLineBorderWidht = $ebMenu.attr('data-navBorderWidth');
                            if (typeof menuLineBorderWidht === 'undefined') {
                                menuLineBorderWidht = 0;
                            }
                            menuLineBorderWidht = parseInt(menuLineBorderWidht);

                            function MenuBorderWidthValue(space) {
                                var navClass = 'nav-style-none';
                                var navStyleClasses = $nav.attr('class').match(/nav-style-[a-z]{1,20}/g);
                                if (navStyleClasses !== null) {
                                    navClass = navStyleClasses[0];
                                }
                                if (navClass === 'nav-style-underline') {
                                    $text.parent().css('border-style', 'solid');
                                    $text.parent().css('border-top-width', '0px');
                                    $text.parent().css('border-right-width', '0px');
                                    $text.parent().css('border-left-width', '0px');
                                    $text.parent().css('border-bottom-width', space + 'px');
                                } else {
                                    $text.parent().css('border-style', 'solid');
                                    $text.parent().css('border-top-width', space + 'px');
                                    $text.parent().css('border-right-width', space + 'px');
                                    $text.parent().css('border-left-width', space + 'px');
                                    $text.parent().css('border-bottom-width', space + 'px');
                                }
                                $ebMenu.attr('data-navBorderWidth', space);
                            }
                            AdvanceSageSlider($('#menuBorderWidth'), $('#menuBorderWidthHandle'), 0, 100, menuLineBorderWidht, MenuBorderWidthValue, $parent, 'px');
                        }
                        function MenuLineBorderColor() {
                            $('#menuBorderColor').css('background-color', $ebMenu.attr('data-lineBorderColor'));
                            var menuBorderColor = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $text.parent().not('.active-page').css('border-color', objColor.bgColor);
                                    $ebMenu.attr('data-lineBorderColor', objColor.bgColor);
                                }
                            });
                            $('#menuBorderColor').colorPicker(menuBorderColor);
                        }
                        function NavLinkBorderColor() {
                            $('#navLinkBorderColor').css('background-color', $ebMenu.attr('data-navLinkBorCol'));
                            var navLinkBorderColor = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $ebMenu.attr('data-navLinkBorCol', objColor.bgColor);
                                    $ebMenu.find('.pagelink.active-page').css('border-color', objColor.bgColor);
                                }
                            });
                            $('#navLinkBorderColor').colorPicker(navLinkBorderColor);
                        }

                        function navFillRadius(styleType) {
                            $("#navStyleRadius").html("");
                            $(".navStyleRadius").hide();                            
                            if (styleType === "nav-style-fill") {
                                $(".navStyleRadius").show();
                                $("#navStyleRadius").AdvanceBoxRadius({
                                    targetParent: $activeDOM,
                                    targetElem: $ebMenu.find("li>a"),
                                    options: {
                                        "max": 50,
                                        "min": 0,
                                        "times": 1,
                                        "position": ["all"]
                                    }
                                });
                            }
                            else $ebMenu.find("li>a").css("border-radius", "");
                        }
                        function MenuStyle() {
                            var navClass = 'nav-style-none';
                            var navStyleClasses = $nav.attr('class').match(/nav-style-[a-z]{1,20}/g);
                            if (navStyleClasses !== null) {
                                navClass = navStyleClasses[0];
                            }
                            $('#menuStyle').val(navClass);
                            navFillRadius(navClass);
                            NavHideShow(navClass);
                            $('#menuStyle').on('change', function () {
                                var navStyleClasses = $nav.attr('class').match(/nav-style-[a-z]{1,20}/g);
                                if (navStyleClasses !== null) {
                                    $nav.removeClass(navStyleClasses[0]);
                                }
                                var style = $(this).val().trim();
                                NavHideShow(style);
                                $nav.addClass(style);
                                var navLinkBGCols = $ebMenu.attr('data-navLinkBGCol');
                                var navLinkTextCols = $ebMenu.attr('data-navLinkTextCol');
                                var navLinkBorCol = $ebMenu.attr('data-navLinkBorCol');
                                if (navLinkBGCols === undefined) {
                                    navLinkBGCols = webBuilderSettings.primaryColor;
                                }
                                if (navLinkTextCols === undefined) {
                                    navLinkTextCols = webBuilderSettings.secondaryColor;
                                }
                                if (style === 'nav-style-line' || style === 'nav-style-underline') {
                                    navLinkBGCols = navLinkBorCol;
                                }
                                navFillRadius(style);
                                MenuChangeInstant($ebMenu, navLinkBGCols, navLinkTextCols, style);
                                if (style === "nav-style-line") {
                                    let bdrWidth = parseInt($ebMenu.attr("data-navborderwidth"));
                                    $ebMenu.find("li>a").css("border-width", bdrWidth + "px");
                                }
                                if (style === "nav-style-underline") {
                                    let bdrWidth = parseInt($ebMenu.attr("data-navborderwidth"));
                                    $ebMenu.find("li>a").css("border-width", "0px 0px " + bdrWidth+"px");
                                }
                            });
                        }
                        function NavHideShow(style) {
                            $('.navBgHide').show();
                            if (style === 'nav-style-fill') {
                                $('.fillBG').show();
                                $('#roundness').show();
                                $('.lineroundness').hide();
                                $text.parent().css('border-style', '');
                                $text.parent().css('border-top-width', '0px');
                                $text.parent().css('border-right-width', '0px');
                                $text.parent().css('border-left-width', '0px');
                                $text.parent().css('border-bottom-width', '0px');

                            } else if (style === 'nav-style-rounded') {
                                $('.fillBG').hide();
                                $('#roundness').show();
                                $('.lineroundness').hide();
                                $ebMenu.attr('data-textbgcolor', '');
                            } else if (style === 'nav-style-line' || style === 'nav-style-roundedline') {
                                let menuLineBorderWidht = $text.parent().css('border-top-width');
                                $text.parent().css('border-style', 'solid');
                                $text.parent().css('border-top-width', menuLineBorderWidht);
                                $text.parent().css('border-right-width', menuLineBorderWidht);
                                $text.parent().css('border-left-width', menuLineBorderWidht);
                                $text.parent().css('border-bottom-width', menuLineBorderWidht);
                                $text.parent().css('background-color', '');
                                $ebMenu.attr('data-textbgcolor', '');
                                $('.fillBG').hide();
                                $('#roundness').show();
                                $('.lineroundness').show();
                                $('.navBgHide').hide();
                            } else if (style === 'nav-style-underline') {
                                //let menuLineBorderWidht = $text.parent().css('border-top-width');
                                let menuLineBorderWidht = $ebMenu.attr("data-navborderwidth");
                                $text.parent().css('border-style', 'solid');
                                $text.parent().css('border-top-width', '0px');
                                $text.parent().css('border-right-width', '0px');
                                $text.parent().css('border-left-width', '0px');
                                $text.parent().css('border-bottom-width', menuLineBorderWidht);
                                $text.parent().css('background-color', '');
                                $ebMenu.attr('data-textbgcolor', '');
                                $('.fillBG').hide();
                                // $('#roundness').hide();
                                $('.lineroundness').show();
                                $('.navBgHide').hide();
                            } else {
                                $('.fillBG').hide();
                                $('#roundness').hide();
                                $('.lineroundness').hide();
                                $text.parent().css('border-style', '');
                                $text.parent().css('border-top-width', '0px');
                                $text.parent().css('border-right-width', '0px');
                                $text.parent().css('border-left-width', '0px');
                                $text.parent().css('border-bottom-width', '0px');
                                $ebMenu.attr('data-textbgcolor', '');
                                $('.navBgHide').hide();
                            }
                        }
                        function loadMenuStyle() {
                            $('#menuStyles i').removeClass('selected');
                            if ($parent.find('.menulist').hasClass('horizontal'))
                                $('#menuStyles i[data-class="msty-tred"]').addClass('selected');
                            else
                                $('#menuStyles i[data-class="msty-ham"]').addClass('selected');

                        }
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM("menuspacing"),
                    "onload": function () {
                        component["menu"].common.Spacing();
                    }
                },
                "Alignment": {
                    "custom": true,
                    "DOM": '<div class="field-row"><div id="menuAlign"></div><div id="hamMenuAlign"></div></div>',
                    "onload": function ($item) {
                        component["menu"].common.alignment();
                    }
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            }
        },
        "remove": function ($cloneDom) { },
        "removeedit": function ($editDom) { },
        "common": {
            "LogoWidth": function () {
                $("#menuwidth").AdvanceDimension({
                    type: 'sfwidth',
                    targetParent: $activeDOM,
                    targetElem: $activeDOM,
                    label: 'Width',
                    defaultValue: 100,
                    callback: function (width) {
                        $holder = $activeDOM.parent().find('#menuholder');
                        ReplaceClassByPattern($holder, 'sfCol_[0-9]{1,3}', 'sfCol_' + (100 - parseInt(width)));
                    }
                });
            },
            "Spacing": function () {
                let $parent = $activeDOM;
                if ($activeDOM.closest('.siteheader').find('.msty-ham').hasClass('Dn'))
                    $('#slcMenuSpacingStng option[value=".msty-ham"]').remove();
                else if ($activeDOM.closest('.siteheader').find('.msty-ham').length > 0)
                    $('#slcMenuSpacingStng').append('<option value=".msty-ham">Hamburger</option>');
                let val = $('#slcMenuSpacingStng').val();
                $('#slcMenuSpacingStng').off().on('change', function () {
                    val = $(this).val();
                    $parent.find('.actEle').removeClass('actEle')
                        .end()
                        .find(val).addClass('actEle');
                    initSpacing();
                });

                function initSpacing() {
                    if (val === ".menuHeader")
                        val = $parent;
                    $("#slcMenuMSpacing,#slcMenuPSpacing").html('');
                    $("#slcMenuMSpacing").AdvanceSpacing({
                        targetParent: $activeDOM.parent(),
                        targetElem: val,
                        options: {
                            "margin": {
                                "max": 40,
                                "min": -40,
                                "times": 5,
                                "position": ["all", "top", "bottom", "left", "right"]
                            }
                        }
                    });
                    $("#slcMenuPSpacing").AdvanceSpacing({
                        targetParent: $activeDOM.parent(),
                        targetElem: val,
                        options: {
                            "padding": {
                                "max": 40,
                                "min": 0,
                                "times": 5,
                                "position": ["all", "top", "bottom", "left", "right"]
                            }
                        }
                    });
                }
                initSpacing();
            },
            "alignment": function () {
                $('#menuAlign,#hamMenuAlign').html('');
                $("#menuAlign").AdvanceAlignment({
                    targetParent: $activeDOM.parent(),
                    targetElem: $activeDOM
                });
            }
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "logowidth": {
                            "prepend": "true",
                            "DOM": EasyLibrary.ReadDOM('menuResponsive'),
                            "onload": function ($item) {
                                let $parent = $activeDOM;
                                if ($parent.parents(".msty-tred").length > 0) {
                                    $("#respMenuTyeWrap").hide();
                                    $parent = $(".msty-ham").find(".menuHeader");
                                }
                                component["menu"].common.LogoWidth();
                                let pageName = $parent.find('.pageName');
                                $('#fontSize').AdvanceTextSetting({
                                    targetElem: pageName,
                                    targetParent: $parent,
                                    options: {
                                        size: true,
                                        lineheight: true,
                                        width: false,
                                        spacing: true,
                                        transform: false,
                                        family: false,
                                        weight: true,
                                        color: false,
                                        style: false,
                                        maxFontSize: 100
                                    }
                                });

                                let da = DeviceAlpha();
                                const respClass = {
                                    default: 'menulist eb-menu',
                                    horizontal: `${da}horizontal ${da}Dfx ${da}flxWrp`,
                                    side: da + 'Db',
                                    footer: da + 'Db'
                                };
                                let respMenuSlc = document.getElementById('respMenuTye');
                                let menuList = $parent.find('.menulist');
                                let regExString = `\\b${da}\\w+`;
                                let regEx = new RegExp(regExString, 'gi');
                                $(respMenuSlc).val(menuList.attr(`data-${da}Menu`));
                                respMenuSlc.addEventListener("change", function () {
                                    menuList.removeClass(() => {
                                        let matchedClass = menuList.attr('class').match(regEx);
                                        if (matchedClass !== null)
                                            matchedClass = matchedClass.join(' ');
                                        return matchedClass;
                                    }).addClass(respClass.default);
                                    let selectedVal = respMenuSlc.options[respMenuSlc.selectedIndex].value;
                                    menuList.attr(`data-${da}Menu`, selectedVal);
                                    switch (selectedVal) {
                                        case "horizontal":
                                            menuList.addClass(respClass.horizontal);
                                            break;
                                        case "side":
                                            menuList.addClass(respClass.side);
                                            break;
                                        case "footer":
                                            menuList.addClass(respClass.footer);
                                            break;
                                    }
                                });
                            }
                        }
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM("menuspacing"),
                    "onload": function () {
                        component["menu"].common.Spacing();
                    }
                },
                "Alignment": {
                    "custom": true,
                    "DOM": '<div class="field-row"><div id="menuAlign"></div></div>',
                    "onload": function ($item) {
                        component["menu"].common.alignment();
                    }
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            }
        }
    }
};
