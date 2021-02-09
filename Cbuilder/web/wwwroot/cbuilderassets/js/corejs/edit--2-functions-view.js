/**/
function ScrollTopVisible() {
    if ($('body').find('#ScroolToTop').length > 0) {
        let top = GetScrollTop();
        if (ScreenDimension().height < top) {
            //if ((ScreenDimension().height + top) >= document.body.scrollHeight) {
            $('#ScroolToTop').show();
        }
        else {
            $('#ScroolToTop').hide();
        }
    }
}

function ScrollToTop() {
    let top = GetScrollTop();
    if (top > screenSize) {
        $('#chkScrollToTop').show(400);
    }
    else {
        $('#chkScrollToTop').hide(400);
    }
}
function FixMenuOnScroll() {
    //Build your website on your own  height
    if (typeof ($('.main-top-row').css('height')) !== "undefined") {
        let webbbuilderBar = parseInt($('.main-top-row').css('height').replace('px', ''));
        //scroll top 
        let $sticky = $('.edit-area').hasClass('hdr-stky');
        let scrollTop = GetScrollTop() + webbbuilderBar;
        if ($sticky || $('.edit-area').hasClass('hdr-fxd')) {
            $('.editor-componentWrapper').addClass('clearfix');
            $('.editor-site-header').addClass('clearfix');
            $('.editor-site-header').css('width', '');
            let extraHeight = 0;
            //if there is any extra field above the menu
            if ($('.rowaboveheader').length > 0)
                extraHeight = parseInt($('.rowaboveheader').css('height').replace('px', ''));
            // menu wrpper height +  extrafield 
            let topPos = $('.editor-site-header').offset().top + extraHeight;
            let $stickHeader = $('.editor-site-header > .cRow');
            $('.main-container').css('padding-top', '');
            if (scrollTop > topPos) {
                $('.edit-area').addClass('stick');
                let containerWidth = $('.editor-componentWrapper').css('width');
                $stickHeader.css('width', containerWidth);
                if ($sticky) {
                    // $('.main-container').css('padding-top', webbbuilderBar);
                    $('.main-container').css('padding-top', '');
                }
            } else {

                $('.editor-site-header > .cRow').removeClass('stick');

                $('.editor-componentWrapper').css('padding-top', '');
            }
        }
    }
}
function HeaderTopPadding() {
    if ($('.edit-area').hasClass('hdr-stky') || $('.edit-area').hasClass('hdr-fxd')) {
        let webbbuilderBar = 0;
        if ($('.main-top-row').length > 0)
            webbbuilderBar = parseInt($('.main-top-row').css('height').replace('px', ''));
        $('.editor-site-header').css('top', webbbuilderBar);
    }
    else {
        $('.main-container').css('padding-top', '');
    }
}
function FixMenuOnResize() {
    $('.editor-site-header > .cRow').css('width', '');
    $('.editor-site-header').css('width', '');
    if ($('.edit-area').hasClass('hdr-fxd')) {
        let containerWidth = $('.editor-componentWrapper').css('width');
        $('.editor-site-header').css('width', containerWidth);
        $('.editor-site-header > .cRow').css('width', '');
    }
    if ($('.edit-area').hasClass('hdr-stky')) {
        setTimeout(function () {
            let containerWidth = $('.editor-componentWrapper').css('width');
            $('.editor-site-header > .cRow').css('width', containerWidth);
            $('.editor-site-header').css('width', '');
        }, 1);
    }
}
function ScreenDimension() {
    let myWidth = 0, myHeight = 0;
    if (typeof (window.innerWidth) == 'number') {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }
    return { "height": myHeight, "width": myWidth };
}
function AdjustSize($appendLayer) {
    let d = ViewDeviceAlpha();
    let regex = new RegExp('\\b' + d + 'H-([0-9]{1,3})' + '\\b', 'g');
    let hCls = $appendLayer.attr('class').match(regex);
    if (hCls || $appendLayer.hasClass(d + 'adjustheight')) {
        //$appendLayer.css('height', '');
        return;
    }
    let height = ScreenDimension().height;
    $appendLayer.css('height', height + 'px');
    $appendLayer.find('.ImageSlider').css('height', height + 'px');
}
function RemoveCarouselHeight($appendLayer) {
    $appendLayer.css('height', '400px');
    let img = $appendLayer.find('.ImageSlider').find('img').eq(0);
    $appendLayer.find('.ImageSlider').css('height', '400px');
    setTimeout(function () {
        $appendLayer.find('.ImageSlider').css('height', '');
    }, 100);
}
function GetScrollTop() {
    let top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    return top;
}
function MenuChangeInstant($nav, primarycolor, secondarycolor, style) {
    let color = $nav.attr('data-textcolor');
    $nav.find('> li > a > span').css('color', color);
    $nav.find('> li > a').css('background-color', '');
    let $a = $nav.find('> li > a.active-page');
    let $span = $a.find('> span');
    $a.css('background-color', '');
    let textColor = $span.css('color');
    ApplyMenuHover(style, primarycolor, secondarycolor, $a, $span);
}
function ApplyMenuHover(navClass, primaryColor, secondary, $a, $span) {
    let navBorderWidth = $a.parents('ul:visible').attr('data-navBorderWidth');
    let navLinkBorCol = $a.parents('ul:visible').attr('data-navLinkBorCol');
    switch (navClass) {
        case 'nav-style-none':
            $span.css('color', secondary);
            break;
        case 'nav-style-fill':
        case 'nav-style-rounded':
            let navLinkBg = $a.parents('ul:visible').attr('data-navLinkTextCol');
            $span.css('color', secondary);
            $a.css('background-color', primaryColor);
            break;
        case 'nav-style-line':
        case 'nav-style-roundedline':
            $span.css('color', secondary);

            $a.css({
                'border-color': navLinkBorCol,
                'border-top-width': navBorderWidth,
                'border-right-width': navBorderWidth,
                'border-left-width': navBorderWidth,
                'border-bottom-width': navBorderWidth,
                'background-color': ''
            });
            break;
        case 'nav-style-underline':
            $span.css('color', secondary);
            $a.css({
                'border-bottom-width': navBorderWidth,
                'border-color': navLinkBorCol,
                'background-color': ''
            });
            break;
    }
}
function AdjustSizeFullpage($dom) {
    if (typeof $dom !== 'undefined') {
        AdjustSize($dom);
        return;
    }
    $('.fullpagebanner').each(function () {
        AdjustSize($(this));
    });
}
function OnePageMenuScrollEvent() {
    let $NavList = $('.editor-site-header').find('.onepagemenu>li');
    CheckSiglePageSectionExists($NavList);
    let $nav = $('.editor-site-header').find('.msty-ham').find('.onepagemenu').find('> li > a').eq(0);
    $nav.addClass('active-page');
    $nav = $('.editor-site-header').find('.msty-tred').find('.onepagemenu').find('> li > a').eq(0);
    $nav.addClass('active-page');
    let activedata = $nav.parent().attr('data-opscroll');
    currentOnePAge = activedata;
    ActiveOnepageMenu(activedata);
    MenuHover(webBuilderSettings.primaryColor, webBuilderSettings.secondaryColor);
    $('.oneMenu').off().on('click', function () {
        //$('.pagelink.onepage.active-page').removeClass('active-page');
        //$(this).find('.pagelink.onepage').addClass('active-page');
        let data = $(this).attr('data-opscroll');
        if (data != undefined) {
            currentOnePAge = data;
            let $scrollTo = $('.editor-componentWrapper > .cRow[data-opscroll="' + data + '"]');
            if ($scrollTo.length > 0) {
                let siteheader = $('.editor-site-header').height();
                if ($('.main-top-row').length > 0)
                    siteheader += $('.main-top-row').height();
                if ($('.edit-area ').hasClass('leftLayout') || $('.edit-area ').hasClass('leftRight')) {
                    siteheader = 0;
                }
                let top = $scrollTo.offset().top - siteheader;
                $('body,html').animate({
                    scrollTop: top + 'px'
                }, 400);
            }
        }
        ActiveOnepageMenu(data);
    });
    function CheckSiglePageSectionExists($NavList) {
        if (!EditorMode) {
            $.each($NavList, function () {
                let $ths = $(this);
                if ($('.editor-componentWrapper > .cRow[data-opscroll="' + $ths.attr('data-opscroll') + '"]').length == 0)
                    $ths.addClass('Dn');
            });
        }
    }
}

function ActiveOnepageMenu(data) {
    let currentPage = data;
    let $ebTredMenu = $('.editor-site-header').find('.msty-ham').find('.onepagemenu');
    ActivateMenu($ebTredMenu, currentPage, true);
    let $ebHamMenu = $('.editor-site-header').find('.msty-tred').find('.onepagemenu');
    ActivateMenu($ebHamMenu, currentPage, true);
}
function ScrollOnePageMenu() {
    if ($('.editor-com-nav').attr('data-active') == 'onepagemenu') {
        let windtop = GetScrollTop();
        let siteheader = $('.editor-site-header').height();
        if ($('.main-top-row').length > 0)
            siteheader += $('.main-top-row').height();
        if ($('.edit-area').hasClass('leftLayout') || $('.edit-area ').hasClass('leftRight')) {
            siteheader = 0;
        }
        let winTop = windtop + siteheader;
        let $divs = $('div.editor-componentWrapper > .cRow');
        let top = $.grep($divs, function (item) {
            return ($(item).offset().top - siteheader) <= winTop;
        });
        let $topDiv;
        if (top.length >= 0) {
            $topDiv = $(top).eq(top.length - 1);
        }
        let data = $topDiv.attr('data-opscroll');
        if (data != undefined && data != currentOnePAge) {
            currentOnePAge = data;
            ActiveOnepageMenu(data);
        }
    }
}
function ParallexEffect() {
    let height = ScreenDimension().height;
    let width = ScreenDimension().width;
    let heightofscreen = ScreenDimension().height / 2;
    $('.background-effect-image-parallax').each(function () {
        $(this).css({
            'background-position-y': "0px",
            //'background-size': ' 120%',
            //'background-position':'center'
        });
    });
    window.addEventListener("scroll", function () {
        $('.background-effect-image-parallax').each(function () {
            parallexAsync($(this), heightofscreen);
        });
    });
}
async function parallexAsync($bgobj, heighofscreen) {
    let parallaxTop = $bgobj.offset().top;
    let parallaxStart = parallaxTop - heighofscreen;
    let scrollTOP = GetScrollTop();
    if (scrollTOP >= parallaxStart) {
        $bgobj.css({
            'background-position-y': -((scrollTOP - parallaxStart) / 10) + "px"
        });
    }
}

function StickyHeader() {
    let headerHeight = $('.editor-site-header').height();
    if (GetScrollTop() > (headerHeight)) {
        if (!$('.editor-site-header').hasClass('scrolled')) {
            $('.editor-site-header').addClass('scrolled');
            let $header = $('.editor-site-header > .cRow');
            let $headerColor = $header.attr('data-mcolor');
            let bgcolor = '', color = '';
            if (typeof ($headerColor) !== "undefined") {
                $('.editor-site-header').attr('data-prevColor', $('.menuHeader:visible .eb-menu').find('.pagelink').not('.active-page').find('.pageName').css('color'));
                $('.menuHeader:visible .eb-menu').find('.pagelink').not('.active-page').find('.pageName').css('color', $headerColor);
            }
            $headerColor = $header.attr('data-mbgcolor');
            if (typeof ($headerColor) !== "undefined") {
                $('.editor-site-header').attr('data-prevBgColor', $('.editor-site-header > .cRow').css('background-color'));
                $('.editor-site-header > .cRow').css('background-color', $headerColor);
            }

            let stickyImage = $('.editor-site-header').find('#headerLogo').attr('data-stickyLogo');
            if (stickyImage != undefined) {
                stickyImage = stickyImage.trim();
                let oldsrc = $('#headerLogo').attr('src');
                $('#headerLogo').attr('data-stickyLogo', oldsrc);
                $('#headerLogo').attr('src', stickyImage);
            }

        }
    }
    else {
        if ($('.editor-site-header').hasClass('scrolled')) {
            $('.editor-site-header').removeClass('scrolled');
            let $header = $('.editor-site-header');
            let $headerColor = $header.attr('data-prevColor');
            let bgcolor = '', color = '';
            if (typeof ($headerColor) !== "undefined") {
                $('.menuHeader:visible .eb-menu').find('.pagelink').not('.active-page').find('.pageName').css('color', $headerColor);
            }
            $headerColor = $header.attr('data-prevBgColor');
            if (typeof ($headerColor) !== "undefined") {
                $('.editor-site-header > .cRow').css('background-color', $headerColor);
            }
            let stickyImage = $('.editor-site-header').find('#headerLogo').attr('data-stickyLogo');
            if (stickyImage != undefined) {
                stickyImage = stickyImage.trim();
                let oldsrc = $('#headerLogo').attr('src');
                $('#headerLogo').attr('data-stickyLogo', oldsrc);
                $('#headerLogo').attr('src', stickyImage);
            }
        }
    }
}
function MenuColor() {
    let clr = $('.editor-site-header .editor-com-nav:visible .eb-menu:visible').attr('data-textcolor');
    if (typeof clr !== "undefined") {
        $('.editor-site-header .editor-com-nav:visible .eb-menu:visible').find('.pagelink').not('.active-page').find('.pageName').css('color', clr);
    }
}
function MenuURL() {
    $('.eb-menu:visible li').each(function () {
        let $this = $(this);
        let href = $this.find(' > a').attr('href');
        href = href.replace('fakeMenuURL', SageFrameHostURL);
        $this.find(' > a').attr('href', href);
    });
    $('.anchorpage').each(function () {
        let $this = $(this);
        let href = $this.attr('href');
        href = href.replace('fakeMenuURL', SageFrameHostURL);
        $this.attr('href', href);
    });
}
function RemoveActiveDom($a) {
    $a.removeClass('active-page');
    let textbgcolor = $a.parent().parent().attr('data-textbgcolor');
    let textcolor = $a.parent().parent().attr('data-textcolor');
    let lineBorderWidth = $a.parent().parent().attr('data-navborderwidth');
    let textBordercolor = $nav.attr('data-lineBorderColor');
    let $span = $a.find('> span');
    if ($('.editor-site-header').hasClass('scrolled') && $a.parents('nav').hasClass('editor-com-nav')) {
        let $header = $('.editor-site-header').find('[data-type="siteheader"]');
        let $headerColor = $header.attr('data-mcolor');
        if ($headerColor != 'undefined' && $headerColor != '') {
            textcolor = $headerColor;
        }
    }
    $span.css('color', textcolor);
    $a.css({
        'background-color': textbgcolor,
        'border-color': textBordercolor
    });
}
function RemoveActiveMenu($a) {
    let $nav = $a.parent().parent();
    let textbgcolor = $nav.attr('data-textbgcolor');
    let textcolor = $nav.attr('data-textcolor');
    let lineBorderWidth = $nav.attr('data-navborderwidth');
    let textBordercolor = $nav.attr('data-lineBorderColor');
    if ($('.editor-site-header').hasClass('scrolled') && $a.parents('nav').hasClass('editor-com-nav')) {
        let $header = $('.editor-site-header').find('[data-type="siteheader"]');
        let $headerColor = $header.attr('data-mcolor');
        if ($headerColor != 'undefined' && $headerColor != '') {
            textcolor = $headerColor;
        }
    }
    if (!$a.hasClass('active-page')) {
        let $span = $a.find('> span');
        textbgcolor = typeof (textbgcolor) !== "undefined" ? textbgcolor : "";
        textBordercolor = typeof (textBordercolor) !== "undefined" ? textBordercolor : "";
        $span.css('color', textcolor);
        $a.css({
            'background-color': textbgcolor,
            'border-color': textBordercolor
        });
    }
}

function AddActiveMenu($a, isHover) {
    let $ebMenu = $a.parent().parent();
    let navLinkBGCol = $ebMenu.attr('data-navLinkBGCol');
    let navLinkTextCol = $ebMenu.attr('data-navLinkTextCol');
    let $span = $a.find('.pageName');
    if (!isHover) {
        $a.addClass('active-page');
    }
    let navClass = 'nav-style-none';
    let navStyleClasses = $ebMenu.parent().attr('class');
    if (navStyleClasses != undefined) {
        navStyleClasses = navStyleClasses.match(/nav-style-[a-z]{1,20}/g);
        if (navStyleClasses != null) {
            navClass = navStyleClasses[0];
        }
        let primaryColor = '';
        let secondary = '';
        if (navLinkBGCol != undefined) {
            primaryColor = navLinkBGCol;
        }
        else {
            primaryColor = webBuilderSettings.primaryColor;
        }
        if (navLinkTextCol != undefined) {
            secondary = navLinkTextCol;
        }
        else {
            secondary = webBuilderSettings.secondaryColor;
        }
        ApplyMenuHover(navClass, primaryColor, secondary, $a, $span);
    }
}

function ActiveMenu() {
    let $ebTredMenu = $('.eb-menu');
    ActivateMenu($ebTredMenu, currentpageName, false);
    //let $ebHAmMenu = $('.editor-site-header').find('.msty-ham').find('.eb-menu');
    //ActivateMenu($ebHAmMenu, currentpageName, false);
}
function ActivateMenu($ebMenu, currentPage, isOnePage) {
    let textColor = 'white';
    let achorBGClor = 'white';
    let achBorderWidth = '';
    let achLinkBorCol = '';
    let achBorderStype = '';
    let navLinkBGCol = $ebMenu.attr('data-navLinkBGCol');
    let navLinkTextCol = $ebMenu.attr('data-navLinkTextCol');
    achorBGClor = $ebMenu.attr('data-textbgcolor');
    $ebMenu.find('.pagelink.active-page').removeClass('active-page');
    $ebMenu.find('.pageName').each(function () {
        let activePage = '';
        if (isOnePage) {
            activePage = $(this).parent().parent().attr('data-opscroll').toLowerCase();
        }
        else {
            activePage = $(this).text().toLowerCase();
        }
        if (activePage === currentPage.toLowerCase()) {
            let $a = $(this).parent();
            AddActiveMenu($a, false);
        }
        else {
            let $a = $(this).parent();
            RemoveActiveMenu($a);
        }
    });
}
function MenuHover(primaryColor, secondary) {
    let textColor = 'white';
    let achorBGClor = 'white';
    let achBorderWidth = '';
    let achLinkBorCol = '';
    let achBorderStype = '';
    $('.editor-com-nav  ul  li  a ').off('mouseover').on('mouseover', function () {
        let $a = $(this);
        if (!$a.hasClass('active-page')) {
            AddActiveMenu($a, true);
        }
    }).off('mouseout').on('mouseout', function () {
        let $a = $(this);
        if (!$a.hasClass('active-page'))
            RemoveActiveMenu($a);
    });

    $('.menus  ul  li  a ').off('mouseover').on('mouseover', function () {
        let $a = $(this);
        if (!$a.hasClass('active-page')) {
            AddActiveMenu($a, true);
        }
    }).off('mouseout').on('mouseout', function () {
        let $a = $(this);
        if (!$a.hasClass('active-page'))
            RemoveActiveMenu($a);
    });
}

function JSONStringify(componentValue) {
    let $key = '';
    let $value = '';
    try {
        return JSON.stringify(componentValue, function (key, value) {
            $key = key;
            $value = value;
            return (typeof value === 'function') ? value.toString() : value;
        });
    } catch (e) {
        WriteLog(`Error occured while JSON parsing. key: ${$key}, value: ${$value} ,error message: ${e}`);
    }
}
function JSONParse(str) {
    let $key = '';
    let $value = '';
    try {
        return JSON.parse(str, function (key, value) {
            if (typeof value != 'string') return value;
            $key = key;
            $value = value;
            return (value.substring(0, 8) == 'function') ? eval(`(${value})`) : value;
        });
    } catch (e) {
        WriteLog(`Error occured while JSON parsing. key: ${$key}, value: ${$value} ,error message: ${e}`);
    }
}
function WriteLog(msg) {
    console.log(msg);
}
function StringToFunction(value) {
    //return (value.substring(0, 8) == 'function') ? eval('function()' + value) : value;
    if (value.substring(0, 8) == 'function') {
        value = value.slice(15, value.length - 1);
        //value = value.slice(0, -1);
    }
    let myFunction = new Function("", value);
    return myFunction();
}
function FullPagePopup(fullpageOption) {
    //WBPopup.init(fullpageOption);
    $('.fullpagepopupWrapper').remove();
    let option = {
        heading: "popup header title",
        data: "no data",
        showheading: true,
        width: "80%",
        height: "80%",
        advance: false,
        onappend: function ($wrapper) {
        },
        onclose: function ($wrapper) {
        }
    };
    option = $.extend(option, fullpageOption);
    let classes = {
        'header': 'fullpage-popup-header',
        'title': 'fullpage-popup-title',
        'body': 'fullpage-popup-model-body',
        'innerwrapper': 'fullpagepopup',
    };
    if (typeof option.advance !== "undefined" && option.advance) {
        classes = {
            'header': 'popupfullpage_model_header',
            'title': 'header_title',
            'body': 'popupfullpage_model_body',
            'innerwrapper': 'fullpagepopup',
        };
    }
    option.classes = classes;
    let fullpageHeader = '';
    if (option.showheading) {
        fullpageHeader = DOMCreate('div', DOMCreate('span', option.heading, option.classes.title + ' txC') + DOMCreate('span', '<i class="fa fa-times"></i>', ' f-right fullpage-close-model'), option.classes.header, 'fullpagePopup');
    }
    //var body = DOMCreate('div', '', 'scrollbar') + DOMCreate('div', option.data, option.classes.body + ' scrollable__child');
    let body = DOMCreate('div', option.data, option.classes.body);
    //body = DOMCreate('div', body);
    let fullpagPopup = DOMCreate('div', fullpageHeader + body, option.classes.innerwrapper, '', ['style="width:' + option.width + ';max-height:' + option.height + '"']);
    fullpagPopup = DOMCreate('div', fullpagPopup, 'v-align');
    fullpagPopup = DOMCreate('div', fullpagPopup, 'fullpagepopupWrapper');
    $('body').append(fullpagPopup);
    if (typeof (option.onappend) !== "undefined") {
        option.onappend($('.fullpagepopupWrapper'));
    }
    $('.fullpage-close-model').on('click', function () {
        $('.fullpagepopupWrapper').remove();
        if (typeof option.onclose !== "undefined")
            option.onclose($('.fullpagepopupWrapper'));
    });
    $('.main-left , #popupModel').hide();
}
function CloseFullPagePopup() {
    $('.fullpage-close-model').trigger('click');
}
function InvokeAPI() {
    if (typeof apiResultString !== "undefined") {
        $.each(apiResultString, function (i, v) {
            try {
                let id = v.ComponentID;
                let $childCompo = $('[data-id="' + id + '"]');
                id = parseInt(id);
                if (!isNaN(id)) {
                    if (v.ErrorOccured)
                        component[v.ComponentName].binddataerror($childCompo, v.Error === null ? v.Error : v.Error[0]);
                    else
                        component[v.ComponentName].binddata($childCompo, v.Result === null ? v.Result : v.Result[0]);
                }
            } catch (error) {
                WriteLog(error);
            }
        });
    }
}
function APIController() {
    this.ComponentID = 1,
        this.ComponentName = "",
        this.NameSpace = "SageFrame.WebBuilder",
        this.ClassNames = "WebBuilderController",
        this.MethodNames = "GetComponentByIDAndVersions",
        this.PageName = "home",
        this.Parameters = "1,1.1",
        this.StaticParameters = "",//fixed components
        this.Type = "URL"; //options: URL, method
    this.PageName = "";
}
function GetSingleAPIResult(key) {
    if (typeof apiResultString !== "undefined" && typeof apiResultString[key] !== "undefined" && apiResultString[key].Result !== null)
        return apiResultString[key].Result[0];
    else
        return null;
}
function SetSEOValues(Title, Description, ImageURL, Type) {
    let metaHtml = '';
    let metaTags = {
        type: ['property="og:type"', 'name="twitter:card"', 'name="type"'],
        image: ['name="image"', 'name="twitter:image"', 'property="og:image"'],
        title: ['property="og:title"', 'name="twitter:title"', 'name="title"'],
        description: ['name="description"', 'name="twitter:description"', 'property="og:description"']
    };
    if (typeof Description != undefined && Description != '')
        SetMetatagValue(metaTags.description, Description);
    if (typeof Title != undefined && Title != '') {
        SetMetatagValue(metaTags.title, Title);
        $('title').text(Title);
    }
    if (typeof ImageURL != undefined && ImageURL != '')
        SetMetatagValue(metaTags.image, ImageURL);
    if (typeof Type != undefined && Type != '')
        SetMetatagValue(metaTags.type, Type);

    function SetMetatagValue(attrArr, seoValue) {
        let len = attrArr.length;
        for (var i = 0; i < len; i++) {
            let ele = $('meta[' + attrArr[i] + ']');
            if (ele.length > 0)
                ele.attr('content', seoValue);
            else {
                metaHtml += '<meta ' + attrArr[i] + 'content="' + seoValue + '">';
            }
        }
    }
    $('head#head').append(metaHtml);
}
function ObjectToString(object) {
    let str = '';
    for (var p in object) {
        if (object.hasOwnProperty(p)) {
            if (typeof object[p] === "number")
                str += '"' + p + '":' + object[p] + ', \n';
            else if (typeof object[p] === "boolean")
                str += '"' + p + '":' + object[p] + ', \n';
            else if (typeof object[p] === "string")
                str += '"' + p + '":' + JSON.stringify(object[p]) + ', \n';
            else if (typeof object[p] === "function")
                str += '"' + p + '" :' + object[p] + ', \n';
            else if (Array.isArray(object[p])) {
                str += '"' + p + '":' + JSON.stringify(object[p]) + ', \n';
            }
            else if (typeof object[p] === "object") {
                str += '"' + p + '" :{ \n \t' + ObjectToString(object[p]) + '}, \n';
            }
        }
    }
    return str;
}
function CarouselInit($this) {
    InitCarouselSlider($this);
}
function InitCarouselSlider($this) {
    let componentId = $this.parent().attr('data-id');
    autoSlideInterval[componentId] = (typeof autoSlideInterval[componentId] != 'undefined' && autoSlideInterval[componentId] instanceof Array) ? autoSlideInterval[componentId] : [];

    if (!$this.hasClass('binded')) {
        $this.addClass('binded');

        // clear set interval
        if (autoSlideInterval[componentId].length > 0) {
            stopAutoSlider();
        }
        let $parWrap = $this.parent();
        //let perSlider = 1;
        //if (typeof ($parWrap.attr('data-perslider')) !== "undefined") {
        //    perSlider = parseInt($parWrap.attr('data-perslider'));
        //}
        let perSlider = DeviceItemPerView($parWrap.attr('data-perslider'));

        // to slide by one slide
        let isSingleSlide = '0';
        if (typeof ($this.parent().attr('data-singleslide')) !== "undefined") {
            isSingleSlide = $parWrap.attr('data-singleslide');
        }

        //width of the viewport (carousel parent container width)
        let viewportwidth = $this.find('.ImageSlider').width();

        //per item width    
        let itemsWidth = viewportwidth / perSlider;
        let items = $this.find('.itemWrapper').length;
        $this.find('.itemWrapper').width(itemsWidth);
        let totalwidth = (viewportwidth * items) / perSlider;
        $this.find('.itemsWrapper').width(totalwidth);

        let slidewidth = 0;
        let currentFrame = 1;
        let prevFrame = 0;
        let totalFrame = isSingleSlide === '1' ? (items - (perSlider - 1)) : Math.ceil(items / perSlider);
        totalFrame = totalFrame == 0 ? 1 : totalFrame;
        let firstLoad = true;
        let isTransition = false;

        function Animate() {
            let transType = "slide";
            if (typeof ($parWrap.attr('data-transition')) !== "undefined") {
                transType = $parWrap.attr('data-transition');
            }

            let animateCss = { "margin-left": slidewidth + "px" };
            let enableFade = false;
            switch (transType.toLowerCase()) {
                case "slide":
                    isTransition = true;
                    $this.find('.itemsWrapper > .itemWrapper').css({ "opacity": 1 });
                    $this.find('.itemsWrapper').animate(
                        animateCss, 'slow', function () {
                            firstLoad = false;
                            isTransition = false;
                            DisableButtons();
                            ActivateDot();
                        });
                    break;
                case "fade":
                    isTransition = true;
                    let c1 = prevFrame;
                    let c2 = currentFrame;
                    if (firstLoad) {
                        c1 = currentFrame;
                        c2 = currentFrame + 1;
                    }
                    let cIn = getSlideIndices(c1);
                    let cur = $this.find('.itemsWrapper > .itemWrapper').slice(cIn[0], cIn[1]);
                    let nIn = getSlideIndices(c2);
                    let nex = $this.find('.itemsWrapper > .itemWrapper').slice(nIn[0], nIn[1]);
                    if (nex.length == 0) {
                        cur.css('opacity', 1);
                        return;
                    }
                    //console.log("current frame ", c1, "next frame", c2);
                    //console.log("current slides ", cur, "next", nex);
                    $.when(cur.fadeTo(0.4, 1000)).done(function () {
                        firstLoad = false;
                        HideSlides(nex);
                        $this.find('.itemsWrapper').css(animateCss);
                        DisableButtons();
                        FadeSuccess(nex);
                        ActivateDot();
                    });
                    break;
                default:
            }
        }
        function getSlideIndices(frame) {
            let start = (frame * perSlider) - perSlider;
            let end = start + perSlider;
            return [start, end];
        }
        function HideSlides(nex) {
            nex.css('opacity', 0.4);
        }
        function FadeSuccess(nex) {
            $.when(nex.animate({ "opacity": '1' }, 1000, 'swing')).done(function () {
                isTransition = false;
            });
        }

        function slideRight() {
            if (isTransition) {
                return;
            }
            slidewidth -= (isSingleSlide === '1') ? itemsWidth : viewportwidth;
            prevFrame = currentFrame;
            currentFrame++;
            Animate();
        }

        function slideLeft() {
            if (isTransition) {
                return;
            }
            slidewidth += (isSingleSlide === '1') ? itemsWidth : viewportwidth;
            prevFrame = currentFrame;
            currentFrame--;
            Animate();
        }

        $this.find('.prev-btn').off().on('click', function () {
            if (currentFrame !== 1)
                slideLeft();
        });
        $this.find('.next-btn').off().on('click', function () {
            if (currentFrame !== totalFrame)
                slideRight();
        });
        function DisableButtons() {
            $this.find('.prev-btn').removeClass('disable');
            $this.find('.next-btn').removeClass('disable');
            if (currentFrame == 1)
                $this.find('.prev-btn').addClass('disable');
            if (currentFrame === totalFrame)
                $this.find('.next-btn').addClass('disable');
        }
        CreateBalls();
        Animate();
        DisableButtons();
        ActivateDot();
        function CreateBalls() {
            let dots = '';
            let limit = (isSingleSlide === '1') ? (items - (perSlider - 1)) : Math.ceil(items / perSlider);

            for (var balls = 0; balls < limit; balls++) {
                dots += '<span class="dots" style="display: inline-block; margin: 0 2px; height: 10px; width: 10px; border-radius: 50%; background-color: rgba(0,0,0,0.6);"></span>';
            }
            $this.find('.pager-dot').html(dots);
            $this.find('.pager-dot span').on('click', function () {
                if (isTransition) {
                    return;
                }
                let index = $this.find('.dots').index($(this));
                let clickIndex = index + 1;
                prevFrame = currentFrame;
                currentFrame = clickIndex;
                slidewidth = 0;
                slidewidth = (isSingleSlide === '1') ? -(itemsWidth * index) : -(viewportwidth * index);
                ActivateDot();
                Animate();
            });
        }

        function ActivateDot() {
            $this.find('.pager-dot').find('.dots').removeClass('active-dot').css("background-color", "rgba(0,0,0,0.6)");
            $this.find('.pager-dot').find('.dots').eq(currentFrame - 1).addClass('active-dot').css("background-color", "rgba(0,0,0,1)");

            SetDefaultDotSetting();
        }

        function SetDefaultDotSetting() {
            //  let $sliderWrap = $slider.closest('.layerSliderWrap');
            //dots color
            let dotscolor = $this.attr('data-dots-color');
            let dotsShape = $this.attr('data-dots-shape');
            let $dots = $this.find(".dots");
            let $activeDot = $this.find(".active-dot");
            let activeDotColor = $this.attr("data-activedot-color");
            let dotsize = $this.attr("data-dot-size");

            if (typeof dotsShape === 'undefined')
                dotsShape = '50%';
            if (typeof activeDotColor === 'undefined')
                activeDotColor = '#000000';
            if (typeof dotscolor === 'undefined') {
                dotscolor = '#ffffff';
            }
            //dots size
            if (typeof dotsize === 'undefined')
                dotsize = 'H-10 W-10';

            //$dots.removeClass(function (index, className) {
            //    return (className.match(/.*H-[0-9]{1,3}/g) || []).join(' ');
            //}).
            $dots.addClass(dotsize);

            $dots.css({
                'background-color': dotscolor,
                'border-radius': dotsShape
            });
            $activeDot.css('background-color', activeDotColor);
        }
        LoadLoop();
        //MouseEventOnAutoSlider();

        function LoadLoop() {
            let $par = $this.parent();
            let looperValue = $par.attr('data-loop');
            if (typeof looperValue !== "undefined" && looperValue === 'loop') {
                startAutoSlider();
            } else {
                stopAutoSlider();
            }
        }

        function startAutoSlider() {
            let $Interval = setInterval(function () {
                AutoSlide();
            }, 5000);
            autoSlideInterval[componentId].push($Interval);
        }

        function stopAutoSlider() {
            $.each(autoSlideInterval[componentId], function (i, v) {
                clearInterval(v);
            });
            autoSlideInterval[componentId] = [];
        }

        function AutoSlide() {
            if (currentFrame === totalFrame) {
                prevFrame = currentFrame;
                currentFrame = 1;
                slidewidth = 0;
                ActivateDot();
                Animate();
            } else {
                slideRight();
            }
        }
    }
}
function TriggerView($html) {
    $html.find('.editor-component').each(function () {
        let $this = $(this);
        let key = $this.find(' > .carries-options > .com-settings').attr('data-type');
        let compo = component[key];
        if (typeof compo !== "undefined" && typeof compo.afterdrop !== "undefined")
            compo.afterdrop($this.parent(), $this, false, true);
    });
}
function findSelectedLayer($elem) {
    let $editcontainer = $elem.find('> .editor-row-shaded-layer');
    if ($editcontainer.length > 0) {
        let $shadedLayer = $editcontainer.find('> .editor-row-container');
        if ($shadedLayer.length > 0) {
            return $shadedLayer;
        }
        else {
            return $editcontainer;
        }
    }
    else if ($elem.find('> .editor-row-container').length > 0) {
        return $elem.find('> .editor-row-container');
    }
    else {
        return $elem;
    }
}

//dom
function DOMCreateStart(tag, className, id, extra) {
    var returnDOM = '';
    if (tag !== undefined) {
        returnDOM += '<' + tag;
        if (className !== undefined && className.length > 0)
            returnDOM += ' class="' + className + '"';
        if (id !== undefined && id.length > 0)
            returnDOM += ' id="' + id + '" ';

        if (extra !== undefined && extra.length > 0) {
            var extraLength = extra.length;
            var dType = '';
            for (var extraItem = 0; extraItem < extraLength; extraItem++) {
                dType += ' ' + extra[extraItem];
            }
            returnDOM += dType;
        }
        returnDOM += '>';
    }
    return returnDOM;
}
function DOMCreateEnd(tag) {
    return '</' + tag + '>';
}
function DOMCreate(tag, appendData, className, id, extra) {
    return DOMCreateStart(tag, className, id, extra) + appendData + DOMCreateEnd(tag);
}
function DivCreate(className, id, datatype, style) {
    return DOMCreateStart('div', className, id, datatype, style);
}
function divStart(divClass) {
    return '<div class="' + divClass + '">';
}

//Responsive menu
function HammenuEvent() {
    $('.res-menu-trigger').off().on('click', function () {
        let $this = $(this);
        $('body').removeClass('offset-right').removeClass('offset-left').removeClass('offset-top');
        if ($this.parent().find('.menuHeader').hasClass('show-menu')) {
            $this.parent().find('.menuHeader').removeClass('show-menu');
            $this.removeClass('close-menu');
            $('.responsivefade').remove();
        }
        else {
            $this.parent().find('.menuHeader').addClass('show-menu');
            $this.addClass('close-menu');
            $('body').toggleClass('offset-menu');
            $this.parent().append('<div class="responsivefade"></div>');
            $('.responsivefade').off().on('click', function () {
                $('.res-menu-trigger').trigger('click');
            });
            if ($this.parent().hasClass('ham-right')) {
                $('body').addClass('offset-right');
            }
            else if ($this.parent().hasClass('ham-left')) {
                $('body').addClass('offset-left');
            }
            else if ($this.parent().hasClass('ham-top')) {
                $('body').addClass('offset-top');
            }
        }
    });
}
HammenuEvent();
//$('.responsivefade').off().on('click', function () {
//    $(this).siblings('nav').toggleClass('show-menu');
//    $(this).toggleClass('close-menu');
//    $('body').toggleClass('offset-menu');
//    $('body').append('<div class="responsivefade"></div>');
//});

function ViewDeviceAlpha() {
    let device = '';
    if (typeof DeviceAlpha === 'function') {
        device = DeviceAlpha();
    } else {
        let dim = ScreenDimension();
        if (dim.width <= 767) {
            device = 'm';
        } else if (dim.width <= 1023) {
            device = 't';
        }
    }
    return device;
}

function DeviceItemPerView(perViewData) {
    let perView = 1;
    if (typeof (perViewData) !== "undefined") {
        if (!isNaN(perViewData)) {
            perView = parseInt(perViewData);
        } else {
            try {
                let jsonD = JSON.parse(perViewData);
                let dev = ViewDeviceAlpha();
                if (dev.length == 0) dev = "d";
                if (typeof jsonD[dev] !== 'undefined' && !isNaN(jsonD[dev])) {
                    perView = parseInt(jsonD[dev]);
                }
            } catch (e) {
                console.error("Invalid Per view data ", perViewData);
            }
        }
    }
    return perView;
}

function SetDeviceItemPerView(prevData, value) {
    let dev = ViewDeviceAlpha();
    if (dev.length == 0) dev = "d";
    let jsonD = {};
    jsonD[dev] = value;
    if (typeof prevData !== 'undefined') {
        try {
            let tmp = JSON.parse(prevData);
            jsonD = $.extend({}, tmp, jsonD);
        } catch (e) {
            console.log("Prev data is not in JSON format ", prevData);
        }
    }
    return JSON.stringify(jsonD);
}

function ViewMouseOverEffect() {
    function ApplyEffects($this) {
        let previousdata = {
            "bg": $this.css('background-color'),
            "font": "#000",
            "box": {
                "on": "off",
                "hl": "0px",
                "vl": "1px",
                "br": "5px",
                "c": "#000",
                "i": "false",
            },
            "border": {
                "on": "off",
                "top": "0",
                "right": "0",
                "bottom": "0",
                "left": "0",
                "tc": "#000",
                "rc": "#000",
                "bc": "#000",
                "lc": "#000"
            },
            "zoom": null
        };
        let hoverEffect = JSON.parse($this.attr('data-hovereffect'));
        if ($this.find('.onhoverbgcolor').length > 0) {
            previousdata.bg = $this.find('.onhoverbgcolor').eq(0).css('background-color');
            $this.find('.onhoverbgcolor').css({ 'background-color': hoverEffect.bg });
        }
        else {
            previousdata.bg = $this.css('background-color');
            if (hoverEffect.bg !== 'none')
                $this.css({ 'background-color': hoverEffect.bg });
        }
        if ($this.find('.onhovercolor').length > 0) {
            previousdata.font = $this.find('.onhovercolor').eq(0).css('color');
            $this.find('.onhovercolor').css({ 'color': hoverEffect.font });
        }
        else {
            previousdata.font = $this.css('color');
            $this.css({ 'color': hoverEffect.font });
        }
        let zoomClass = $this.attr('class').match(/scale-[0-1]-[0-9]/g);
        if (zoomClass !== null) {
            $this.removeClass(zoomClass[0]);
            previousdata.zoom = zoomClass[0];
        }
        let zoom = hoverEffect.zoom;
        $this.addClass('scale-' + parseInt(zoom / 10) + '-' + (zoom % 10));
        let $shadow = hoverEffect.box;
        function ParentBoxShadow() {
            previousdata.box.on = "off";
            let boxShadow = $this.css('box-shadow');
            if (typeof (boxShadow) !== "undefined" && boxShadow !== null && boxShadow !== 'none') {
                previousdata.box.on = "on";
                let lenCol = boxShadow.match(/-?\d{1,3}px/g);
                previousdata.box.hl = lenCol[0] + ' ';// parseInt(lenCol[0].replace('px', ''));
                previousdata.box.vl = lenCol[1] + ' ';//parseInt(lenCol[1].replace('px', ''));
                previousdata.box.br = lenCol[2] + ' ';// parseInt(lenCol[2].replace('px', ''));
                let inset = '';
                let hasInset = boxShadow.match(/inset/);
                if (hasInset !== null && hasInset.length > 0) {
                    inset = ' inset ';
                }
                previousdata.box.i = inset;
                let spreadDistace = '';
                if (lenCol.length == 4)
                    spreadDistace = lenCol[3];
                let dropColor = boxShadow.replace(previousdata.box.hl, '')
                    .replace(previousdata.box.vl, '')
                    .replace(previousdata.box.br, '')
                    .replace(spreadDistace, '')
                    .replace('inset', '').trim();
                if (dropColor.length > 0) {
                    previousdata.box.c = dropColor;
                }
            }
            if ($shadow.on === "on") {
                let shadowDOM = '';
                shadowDOM += $shadow.c;
                shadowDOM += $shadow.hl;
                shadowDOM += $shadow.vl;
                shadowDOM += $shadow.br;
                shadowDOM += $shadow.i;
                $this.css({ 'box-shadow': shadowDOM });
            }
        }
        let $border = hoverEffect.border;
        function BorderOnHover() {
            previousdata.border.on = $this.css("border-top-style");
            previousdata.border.top = $this.css("border-top-width");
            previousdata.border.right = $this.css("border-right-width");
            previousdata.border.bottom = $this.css("border-bottom-width");
            previousdata.border.left = $this.css("border-left-width");

            previousdata.border.tc = $this.css('border-top-color');
            previousdata.border.rc = $this.css('border-right-color');
            previousdata.border.bc = $this.css('border-bottom-color');
            previousdata.border.lc = $this.css('border-left-color');

            if ($border.on !== "none") {
                $this.css({
                    "border-style": $border.on,
                    "border-top-width": $border.top,
                    "border-right-width": $border.right,
                    "border-bottom-width": $border.bottom,
                    "border-left-width": $border.left,
                    'border-top-color': $border.tc,
                    'border-right-color': $border.rc,
                    'border-bottom-color': $border.bc,
                    'border-left-color': $border.lc
                });
            }
        }
        ParentBoxShadow();
        BorderOnHover();
        $this.attr('data-prevhovereffect', JSON2.stringify(previousdata));
    }

    function ResetPreviousEffect($this) {
        let hoverEffect = JSON.parse($this.attr('data-prevhovereffect'));
        $this.css({ 'background-color': hoverEffect.bg });
        if ($this.find('.onhoverbgcolor').length > 0) {
            $this.find('.onhoverbgcolor').css({ 'background-color': hoverEffect.bg });
        }
        else {
            $this.css({ 'background-color': hoverEffect.bg });
        }
        if ($this.find('.onhovercolor').length > 0) {
            $this.find('.onhovercolor').css({ 'color': hoverEffect.font });
        }
        else {
            $this.css({ 'color': hoverEffect.font });
        }

        $this.removeAttr('data-prevhovereffect');
        let zoomClass = $this.attr('class').match(/scale-[0-1]-[0-9]/g);
        if (zoomClass !== null) {
            $this.removeClass(zoomClass[0]);
        }
        if (typeof (hoverEffect.zoom) !== "undefined") {
            $this.addClass(hoverEffect.zoom);
        }
        let $shadow = hoverEffect.box;
        if ($shadow.on === "on") {
            let shadowDOM = '';
            shadowDOM += $shadow.c;
            shadowDOM += $shadow.hl;
            shadowDOM += $shadow.vl;
            shadowDOM += $shadow.br;
            shadowDOM += $shadow.i;
            $this.css({ 'box-shadow': shadowDOM });
        }
        else {
            $this.css({ 'box-shadow': '' });
        }
        let $border = hoverEffect.border;
        //if ($border.on !== "none") {
        $this.css({
            "border-style": $border.on,
            "border-top-width": $border.top,
            "border-right-width": $border.right,
            "border-bottom-width": $border.bottom,
            "border-left-width": $border.left,
            'border-top-color': $border.tc,
            'border-right-color': $border.rc,
            'border-bottom-color': $border.bc,
            'border-left-color': $border.lc
        });
        //}
    }
    $('.hovered').off('mouseover').on('mouseover', function () {
        ApplyEffects($(this));
    });
    $('.hovered').off('mouseout').on('mouseout', function () {
        ResetPreviousEffect($(this));
    });
}

function ChangeRedirectURL($selector) {
    if (typeof ($selector) == "undefined")
        $selector = $('.redirectLink');
    $selector.off().on('click', function (e) {
        let $this = $(this);
        e.preventDefault();
        let param = $this.attr('data-param');
        if (typeof (param) == "undefined")
            param = QueryParams;
        let viewMode = EditorMode ? "/webbuilder" : "";
        let url = SageFrameHostURL + viewMode + "/" + $this.attr('data-pageName') + CultureURL + param;
        window.location = url;
    });
}