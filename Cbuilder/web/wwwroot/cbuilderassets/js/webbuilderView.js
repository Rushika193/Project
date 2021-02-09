
var SecureAjaxCall = (function (config) {

    //$.extend(_config, config);
    let Ajax = function (c) {
        $.ajax(c);
    };
    let extendConfig = function (c) {
        c = $.extend(
            {
                async: false,
                cache: false,
                type: 'POST',
                traditional: true,
                data: {},
                dataType: 'json',
                method: '',
                contentType: "application/x-www-form-urlencoded",
                url: '',
                beforeSend: function (xhr) { },
                success: function (data, textStatus, jqXHR) {
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            }, c);
        return c;
    };
    return {
        PassObject: function (config) {
            //data needed to be stringify
            config = extendConfig(config);
            config.traditional = false;
            config.contentType = "application/json; charset=utf-8";
            config.beforeSend = function (xhr) {
                xhr.setRequestHeader("XSRF-TOKEN", $('input:hidden[name="__RequestVerificationToken"]').val());
            };
            Ajax(config);
        },
        Call: function (config) {
            config = extendConfig(config);
            config.data = $.extend({ __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val() }, config.data);
            Ajax(config);
        }
    };
})();

setTimeout(function () {
    $('#divActionMessage').hide(100);
}, 5000);
var MessageType = {
    Error: 'Error',
    Success: 'Success',
    Warning: 'Warning',
    Info: 'Info'
};
function ActionMessage(message, type) {
    let msg = `<div id="divActionMessage" class="act-message ${type}">
        <span>${message}
    </div>`;
    $('#divClientActionMessage').html(msg);
    setTimeout(function () {
        $('#divActionMessage').slideUp(300);
    }, 5000);
}

function CheckPermission(area, controller, action) {
    area = area.toLowerCase();
    controller = controller.toLowerCase();
    action = action.toLowerCase();
    var len = AllowPermission.length;
    for (var i = 0; i < len; i++) {
        var el = AllowPermission[i];
        if ((el.AreaName === area || el.AreaName === "all") && (el.Controller === controller || el.Controller === "all") && (el.ActionName === action || el.ActionName === "all")) {
            return true;
        }
    };
    return false;
}
function PushIntoURL(obj, title, holdPrev) {
    if (holdPrev) {
        var prevObj = GetSearchQuery();
        obj = $.extend(prevObj, obj);
    }
    var param = decodeURIComponent($.param(obj));
    var winLoc = window.location;
    var newURL = winLoc.origin + winLoc.pathname
    if (param !== '')
        newURL = newURL + '?' + param;
    window.history.pushState(obj, title, newURL);
}
function GetSearchQuery(caseSensitive = false) {
    var srch = window.location.search.substr(1).split('&');
    var sParam = {};
    srch.forEach(function (v, i) {
        var item = v.split('=');
        if (item.length > 1) {
            if (caseSensitive)
                sParam[item[0]] = decodeURIComponent(item[1]);
            else
                sParam[item[0].toLowerCase()] = decodeURIComponent(item[1]);
        }
    });
    return sParam;
}var fontawesomeClasses= ['fa-glass','fa-music','fa-search','fa-envelope-o','fa-heart','fa-star','fa-star-o','fa-user','fa-film','fa-th-large','fa-th','fa-th-list','fa-check','fa-remove','fa-close','fa-times','fa-search-plus','fa-search-minus','fa-power-off','fa-signal','fa-gear','fa-cog','fa-trash-o','fa-home','fa-file-o','fa-clock-o','fa-road','fa-download','fa-inbox','fa-play-circle-o','fa-rotate-right','fa-repeat','fa-refresh','fa-list-alt','fa-lock','fa-flag','fa-headphones','fa-volume-off','fa-volume-down','fa-volume-up','fa-qrcode','fa-barcode','fa-tag','fa-tags','fa-book','fa-bookmark','fa-print','fa-camera','fa-font','fa-bold','fa-italic','fa-text-height','fa-text-width','fa-align-left','fa-align-center','fa-align-right','fa-align-justify','fa-list','fa-dedent','fa-outdent','fa-indent','fa-video-camera','fa-photo','fa-image','fa-picture-o','fa-pencil','fa-map-marker','fa-adjust','fa-tint','fa-edit','fa-pencil-square-o','fa-share-square-o','fa-check-square-o','fa-arrows','fa-step-backward','fa-fast-backward','fa-backward','fa-play','fa-pause','fa-stop','fa-forward','fa-fast-forward','fa-step-forward','fa-eject','fa-chevron-left','fa-chevron-right','fa-plus-circle','fa-minus-circle','fa-times-circle','fa-check-circle','fa-question-circle','fa-info-circle','fa-crosshairs','fa-times-circle-o','fa-check-circle-o','fa-ban','fa-arrow-left','fa-arrow-right','fa-arrow-up','fa-arrow-down','fa-mail-forward','fa-share','fa-expand','fa-compress','fa-plus','fa-minus','fa-asterisk','fa-exclamation-circle','fa-gift','fa-leaf','fa-fire','fa-eye','fa-eye-slash','fa-warning','fa-exclamation-triangle','fa-plane','fa-calendar','fa-random','fa-comment','fa-magnet','fa-chevron-up','fa-chevron-down','fa-retweet','fa-shopping-cart','fa-folder','fa-folder-open','fa-arrows-v','fa-arrows-h','fa-bar-chart-o','fa-bar-chart','fa-twitter-square','fa-facebook-square','fa-camera-retro','fa-key','fa-gears','fa-cogs','fa-comments','fa-thumbs-o-up','fa-thumbs-o-down','fa-star-half','fa-heart-o','fa-sign-out','fa-linkedin-square','fa-thumb-tack','fa-external-link','fa-sign-in','fa-trophy','fa-github-square','fa-upload','fa-lemon-o','fa-phone','fa-square-o','fa-bookmark-o','fa-phone-square','fa-twitter','fa-facebook-f','fa-facebook','fa-github','fa-unlock','fa-credit-card','fa-feed','fa-rss','fa-hdd-o','fa-bullhorn','fa-bell','fa-certificate','fa-hand-o-right','fa-hand-o-left','fa-hand-o-up','fa-hand-o-down','fa-arrow-circle-left','fa-arrow-circle-right','fa-arrow-circle-up','fa-arrow-circle-down','fa-globe','fa-wrench','fa-tasks','fa-filter','fa-briefcase','fa-arrows-alt','fa-group','fa-users','fa-chain','fa-link','fa-cloud','fa-flask','fa-cut','fa-scissors','fa-copy','fa-files-o','fa-paperclip','fa-save','fa-floppy-o','fa-square','fa-navicon','fa-reorder','fa-bars','fa-list-ul','fa-list-ol','fa-strikethrough','fa-underline','fa-table','fa-magic','fa-truck','fa-pinterest','fa-pinterest-square','fa-google-plus-square','fa-google-plus','fa-money','fa-caret-down','fa-caret-up','fa-caret-left','fa-caret-right','fa-columns','fa-unsorted','fa-sort','fa-sort-down','fa-sort-desc','fa-sort-up','fa-sort-asc','fa-envelope','fa-linkedin','fa-rotate-left','fa-undo','fa-legal','fa-gavel','fa-dashboard','fa-tachometer','fa-comment-o','fa-comments-o','fa-flash','fa-bolt','fa-sitemap','fa-umbrella','fa-paste','fa-clipboard','fa-lightbulb-o','fa-exchange','fa-cloud-download','fa-cloud-upload','fa-user-md','fa-stethoscope','fa-suitcase','fa-bell-o','fa-coffee','fa-cutlery','fa-file-text-o','fa-building-o','fa-hospital-o','fa-ambulance','fa-medkit','fa-fighter-jet','fa-beer','fa-h-square','fa-plus-square','fa-angle-double-left','fa-angle-double-right','fa-angle-double-up','fa-angle-double-down','fa-angle-left','fa-angle-right','fa-angle-up','fa-angle-down','fa-desktop','fa-laptop','fa-tablet','fa-mobile-phone','fa-mobile','fa-circle-o','fa-quote-left','fa-quote-right','fa-spinner','fa-circle','fa-mail-reply','fa-reply','fa-github-alt','fa-folder-o','fa-folder-open-o','fa-smile-o','fa-frown-o','fa-meh-o','fa-gamepad','fa-keyboard-o','fa-flag-o','fa-flag-checkered','fa-terminal','fa-code','fa-mail-reply-all','fa-reply-all','fa-star-half-empty','fa-star-half-full','fa-star-half-o','fa-location-arrow','fa-crop','fa-code-fork','fa-unlink','fa-chain-broken','fa-question','fa-info','fa-exclamation','fa-superscript','fa-subscript','fa-eraser','fa-puzzle-piece','fa-microphone','fa-microphone-slash','fa-shield','fa-calendar-o','fa-fire-extinguisher','fa-rocket','fa-maxcdn','fa-chevron-circle-left','fa-chevron-circle-right','fa-chevron-circle-up','fa-chevron-circle-down','fa-anchor','fa-unlock-alt','fa-bullseye','fa-ellipsis-h','fa-ellipsis-v','fa-rss-square','fa-play-circle','fa-ticket','fa-minus-square','fa-minus-square-o','fa-level-up','fa-level-down','fa-check-square','fa-pencil-square','fa-external-link-square','fa-share-square','fa-compass','fa-toggle-down','fa-toggle-up','fa-toggle-right','fa-euro','fa-eur','fa-gbp','fa-dollar','fa-usd','fa-rupee','fa-inr','fa-cny','fa-rmb','fa-yen','fa-jpy','fa-ruble','fa-rouble','fa-rub','fa-won','fa-krw','fa-bitcoin','fa-btc','fa-file','fa-file-text','fa-sort-alpha-asc','fa-sort-alpha-desc','fa-sort-amount-asc','fa-sort-amount-desc','fa-sort-numeric-asc','fa-sort-numeric-desc','fa-thumbs-up','fa-thumbs-down','fa-youtube-square','fa-youtube','fa-xing','fa-xing-square','fa-youtube-play','fa-dropbox','fa-stack-overflow','fa-instagram','fa-flickr','fa-adn','fa-bitbucket','fa-bitbucket-square','fa-tumblr','fa-tumblr-square','fa-long-arrow-down','fa-long-arrow-up','fa-long-arrow-left','fa-long-arrow-right','fa-apple','fa-windows','fa-android','fa-linux','fa-dribbble','fa-skype','fa-foursquare','fa-trello','fa-female','fa-male','fa-gittip','fa-gratipay','fa-sun-o','fa-moon-o','fa-archive','fa-bug','fa-vk','fa-weibo','fa-renren','fa-pagelines','fa-stack-exchange','fa-toggle-left','fa-dot-circle-o','fa-wheelchair','fa-vimeo-square','fa-turkish-lira','fa-try','fa-plus-square-o','fa-space-shuttle','fa-slack','fa-envelope-square','fa-wordpress','fa-openid','fa-institution','fa-bank','fa-university','fa-mortar-board','fa-graduation-cap','fa-yahoo','fa-google','fa-reddit','fa-reddit-square','fa-stumbleupon-circle','fa-stumbleupon','fa-delicious','fa-digg','fa-pied-piper-pp','fa-pied-piper-alt','fa-drupal','fa-joomla','fa-language','fa-fax','fa-building','fa-child','fa-paw','fa-spoon','fa-cube','fa-cubes','fa-behance','fa-behance-square','fa-steam','fa-steam-square','fa-recycle','fa-automobile','fa-car','fa-cab','fa-taxi','fa-tree','fa-spotify','fa-deviantart','fa-soundcloud','fa-database','fa-file-pdf-o','fa-file-word-o','fa-file-excel-o','fa-file-powerpoint-o','fa-file-photo-o','fa-file-picture-o','fa-file-image-o','fa-file-zip-o','fa-file-archive-o','fa-file-sound-o','fa-file-audio-o','fa-file-movie-o','fa-file-video-o','fa-file-code-o','fa-vine','fa-codepen','fa-jsfiddle','fa-life-bouy','fa-life-buoy','fa-life-saver','fa-support','fa-life-ring','fa-circle-o-notch','fa-ra','fa-resistance','fa-rebel','fa-ge','fa-empire','fa-git-square','fa-git','fa-y-combinator-square','fa-yc-square','fa-hacker-news','fa-tencent-weibo','fa-qq','fa-wechat','fa-weixin','fa-send','fa-paper-plane','fa-send-o','fa-paper-plane-o','fa-history','fa-circle-thin','fa-header','fa-paragraph','fa-sliders','fa-share-alt','fa-share-alt-square','fa-bomb','fa-soccer-ball-o','fa-futbol-o','fa-tty','fa-binoculars','fa-plug','fa-slideshare','fa-twitch','fa-yelp','fa-newspaper-o','fa-wifi','fa-calculator','fa-paypal','fa-google-wallet','fa-cc-visa','fa-cc-mastercard','fa-cc-discover','fa-cc-amex','fa-cc-paypal','fa-cc-stripe','fa-bell-slash','fa-bell-slash-o','fa-trash','fa-copyright','fa-at','fa-eyedropper','fa-paint-brush','fa-birthday-cake','fa-area-chart','fa-pie-chart','fa-line-chart','fa-lastfm','fa-lastfm-square','fa-toggle-off','fa-toggle-on','fa-bicycle','fa-bus','fa-ioxhost','fa-angellist','fa-cc','fa-shekel','fa-sheqel','fa-ils','fa-meanpath','fa-buysellads','fa-connectdevelop','fa-dashcube','fa-forumbee','fa-leanpub','fa-sellsy','fa-shirtsinbulk','fa-simplybuilt','fa-skyatlas','fa-cart-plus','fa-cart-arrow-down','fa-diamond','fa-ship','fa-user-secret','fa-motorcycle','fa-street-view','fa-heartbeat','fa-venus','fa-mars','fa-mercury','fa-intersex','fa-transgender','fa-transgender-alt','fa-venus-double','fa-mars-double','fa-venus-mars','fa-mars-stroke','fa-mars-stroke-v','fa-mars-stroke-h','fa-neuter','fa-genderless','fa-facebook-official','fa-pinterest-p','fa-whatsapp','fa-server','fa-user-plus','fa-user-times','fa-hotel','fa-bed','fa-viacoin','fa-train','fa-subway','fa-medium','fa-yc','fa-y-combinator','fa-optin-monster','fa-opencart','fa-expeditedssl','fa-battery','fa-battery-full','fa-battery-three-quarters','fa-battery-half','fa-battery-quarter','fa-battery-empty','fa-mouse-pointer','fa-i-cursor','fa-object-group','fa-object-ungroup','fa-sticky-note','fa-sticky-note-o','fa-cc-jcb','fa-cc-diners-club','fa-clone','fa-balance-scale','fa-hourglass-o','fa-hourglass-start','fa-hourglass-half','fa-hourglass-end','fa-hourglass','fa-hand-grab-o','fa-hand-rock-o','fa-hand-stop-o','fa-hand-paper-o','fa-hand-scissors-o','fa-hand-lizard-o','fa-hand-spock-o','fa-hand-pointer-o','fa-hand-peace-o','fa-trademark','fa-registered','fa-creative-commons','fa-gg','fa-gg-circle','fa-tripadvisor','fa-odnoklassniki','fa-odnoklassniki-square','fa-get-pocket','fa-wikipedia-w','fa-safari','fa-chrome','fa-firefox','fa-opera','fa-internet-explorer','fa-tv','fa-television','fa-contao','fa-amazon','fa-calendar-plus-o','fa-calendar-minus-o','fa-calendar-times-o','fa-calendar-check-o','fa-industry','fa-map-pin','fa-map-signs','fa-map-o','fa-map','fa-commenting','fa-commenting-o','fa-houzz','fa-vimeo','fa-black-tie','fa-fonticons','fa-reddit-alien','fa-edge','fa-credit-card-alt','fa-codiepie','fa-modx','fa-fort-awesome','fa-usb','fa-product-hunt','fa-mixcloud','fa-scribd','fa-pause-circle','fa-pause-circle-o','fa-stop-circle','fa-stop-circle-o','fa-shopping-bag','fa-shopping-basket','fa-hashtag','fa-bluetooth','fa-bluetooth-b','fa-percent','fa-gitlab','fa-wpbeginner','fa-wpforms','fa-envira','fa-universal-access','fa-wheelchair-alt','fa-question-circle-o','fa-blind','fa-audio-description','fa-volume-control-phone','fa-braille','fa-assistive-listening-systems','fa-asl-interpreting','fa-deafness','fa-hard-of-hearing','fa-deaf','fa-glide','fa-glide-g','fa-signing','fa-sign-language','fa-low-vision','fa-viadeo','fa-viadeo-square','fa-snapchat','fa-snapchat-ghost','fa-snapchat-square','fa-pied-piper','fa-first-order','fa-yoast','fa-themeisle','fa-google-plus-circle','fa-google-plus-official','fa-fa','fa-font-awesome','fa-handshake-o','fa-envelope-open','fa-envelope-open-o','fa-linode','fa-address-book','fa-address-book-o','fa-vcard','fa-address-card','fa-vcard-o','fa-address-card-o','fa-user-circle','fa-user-circle-o','fa-user-o','fa-id-badge','fa-drivers-license','fa-id-card','fa-drivers-license-o','fa-id-card-o','fa-quora','fa-free-code-camp','fa-telegram','fa-thermometer','fa-thermometer-full','fa-thermometer-three-quarters','fa-thermometer-half','fa-thermometer-quarter','fa-thermometer-empty','fa-shower','fa-bathtub','fa-bath','fa-podcast','fa-window-maximize','fa-window-minimize','fa-window-restore','fa-times-rectangle','fa-window-close','fa-times-rectangle-o','fa-window-close-o','fa-bandcamp','fa-grav','fa-etsy','fa-imdb','fa-ravelry','fa-eercast','fa-microchip','fa-snowflake-o','fa-superpowers','fa-wpexplorer','fa-meetup',];var sel, range;
"use strict";
const WbGlobal = {};
let webBuilderSettings = {
    "primaryColor": 'rgb(69, 83, 252)',
    "secondaryColor": '#ccc',
    "optionalColor": "#ccc",
    "defaultLayout": 'fullwidth',
    "defaultFontFamily": "Montserrat",
    "SiteHeaderEffect": "hdr-nml",
    "body": {
        "class": "editor-box activeSetting background-effect-image-parallax",
        "data-backgroundcolor": "",
        "data-backgroundimage": "image",
        "style": ""
    },
    "shadedLayer": "",
    "temporaryBackgroundcolor": '#FFF',
    "temporaryWidth": '100',
    "scrolltotop": false,
    "idcount": 0,
    "isunderconstruction": false
};
let screenWidth = $(window).width();
let screenSize = ScreenDimension();
let Website = {
    "Name": "Personal",
    "PageList": [],
    "DefaultPage": "",
    "Components": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,1,1,1",
    "UserModuleID": 0,
    "Culture": null,
    "SecureToken": null,
    "UserName": null,
    "PortalID": 0,
    "HostURL": SageFrameHostURL,
    "HeaderView": "",
    "HeaderEdit": "",
    "FooterEdit": "",
    "FooterView": ""
};
let autoSlideInterval = {};
let currentOnePAge = '';

let WbHostURL = '';
if (typeof EditorMode === "undefined") {
    EditorMode = false;
}
if (typeof isPreview === "undefined") {
    isPreview = false;
}
if (GetSiteID === "0") {
    if (EditorMode)
        WbHostURL = SageFrameHostURL + '/webbuilder';
    else if (isPreview) {
        WbHostURL = SageFrameHostURL + '/webbuilderpreview';
    } else {
        WbHostURL = SageFrameHostURL;
    }
} else {
    if (EditorMode)
        WbHostURL = SageFrameHostURL + '/webbuilder/' + GetSiteID;
    else if (isPreview) {
        WbHostURL = SageFrameHostURL + '/webbuilderpreview/' + GetSiteID;
    } else {
        WbHostURL = SageFrameHostURL;
    }
}
let FakeImageURL = 'https://cdn.contentder.com/img/fakeimg.jpg';/**/
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
}/**
 * dependencies:
 * functions.js
 * dom.js
 */
//$(window).resize(function () {
//    $imageSlider.removeClass('binded');
//    ImageSlider();
//});
String.prototype.replaceAll = function (search, replacement) {
      return this.replace(new RegExp(search, 'g'), replacement);
};
String.prototype.removeScript = function () {
    return this.replaceAll('<[^>]*>','');
};

$(window).resize(function () {
    FixMenuOnResize();
    screenSize = ScreenDimension();
});

window.addEventListener("orientationchange", function () {
    let removeCompo = [];
    $('.editor-component, .cRow').each(function () {
        let $me = $(this);
        let dataType = $me.attr('data-type');
        if (typeof (dataType) === 'undefined') {
            dataType = $me.find('> .SetHdlr > .com-settings').attr('data-type');
        }
        if (typeof (dataType) !== 'undefined') {
            let index = removeCompo.indexOf(dataType);
            if (index == -1) {
                if (typeof (component[dataType]) !== 'undefined' && typeof (component[dataType].resize) === 'function') {
                    try {
                        setTimeout(function () {
                            component[dataType].resize();
                        }, 200);
                    }
                    catch (error) {
                        WriteLog(error);
                    }
                    removeCompo.push(dataType);
                }
            }
        }
    });
}, false);

$('.fullpagebanner').resize(function () {
    let $this = $(this);
    $this.find('.ImageSliderWrapper').removeClass('binded');
    InitCarouselSlider($this.find('.ImageSliderWrapper'));
    AdjustSize($this);
});
window.addEventListener("scroll", ScrollToTop);
window.addEventListener("scroll", function () {
    if ($('.edit-area.site-body').hasClass('hdr-stky')) {
        StickyHeader();
    }
});
window.addEventListener("scroll", ScrollTopVisible);
window.addEventListener("scroll", ScrollOnePageMenu);
//$(window).on("scroll", function (e) {
//    let top = GetScrollTop();
//    //FixMenuOnScroll();
//    ScrollToTop(top);

//    if ($('.edit-area.site-body').hasClass('hdr-stky')) {
//        StickyHeader();
//    }
//    ScrollTopVisible(top);
//    ScrollOnePageMenu(top);
//});
//AdjustSize of full page slider
//AdjustSizeFullpage();
$(function () {
    AdjustSizeFullpage();
    MenuColor();
    MenuURL();
   // HamMenu();
    //HeaderTopPadding();
    OnePageMenuScrollEvent();
    $('.onepagemenu > li > .pagelink.onepage.active-page').removeClass('active-page');
    $('.onepagemenu').find('.pagelink.onepage').eq(0).addClass('active-page');
    //change  primary color in menu
    let style = '';
    let tempSettings = $('.site-body').attr('data-settings');
    if (typeof tempSettings !== "undefined" && tempSettings.length > 0) {
        tempSettings = JSON.parse(tempSettings);
    } else {
        tempSettings = webBuilderSettings;
    }
    $('body').attr('data-count', tempSettings.idcount);
    let navStyleClasses = $('.editor-com-nav:visible').attr('class');
    if (navStyleClasses != undefined) {
        navStyleClasses = navStyleClasses.match(/nav-style-[a-z]{1,20}/g);
        if (navStyleClasses != null) {
            style = navStyleClasses[0];
        }
        if (typeof (tempSettings) !== 'undefined' && tempSettings.length > 0) {
            MenuChangeInstant($('.editor-com-nav:visible > .onepagemenu'), tempSettings.primaryColor, tempSettings.secondaryColor, style);
        }
    }
    ParallexEffect();
});
var CommonLibrary = {
    AjaxCall: function (config) {
        let auth = {
            UserModuleID: webBuilderUserModuleID,
            UserName: SageFrameUserName,
            PortalID: SageFramePortalID,
            SecureToken: SageFrameSecureToken,
            CultureCode: SageFrameCurrentCulture,
        };
        config = $.extend({
            async: false,
            cache: false,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: {},
            method: '',
            dataType: 'json',
            url: '',
            ajaxSuccess: '',
            ajaxFailure: function () {
                alert("Server Error.", "Error");
            }
        }, config);
        config.data = $.extend({ auth: auth }, config.data);
        config.data = JSON2.stringify(config.data);
        $.ajax({
            type: config.type,
            contentType: config.contentType,
            cache: config.cache,
            async: config.async,
            url: `${config.url}/${config.method}`,
            data: config.data,
            dataType: config.dataType,
            success: config.ajaxSuccess,
            error: config.ajaxFailure,
        });
    },
};
(function ($) {
    // Attrs
    $.fn.attrs = function (attrs) {
        let t = $(this);
        if (attrs) {
            // Set attributes
            t.each(function (i, e) {
                let j = $(e);
                for (var attr in attrs) {
                    j.attr(attr, attrs[attr]);
                }
            });
            return t;
        } else {
            // Get attributes
            let a = {},
                r = t.get(0);
            if (r) {
                r = r.attributes;
                for (var i in r) {
                    let p = r[i];
                    if (typeof p.nodeValue !== 'undefined') a[p.nodeName] = p.nodeValue;
                }
            }
            return a;
        }
    };
})(jQuery);
var ScrollJS = /** @class */ (function () {
    function ScrollJS(objScroller) {
        this.scroller = {
            container: null,
            scrollbar: null,
            content: null
        };
        this.doc = $(document);
        this.scroller = $.extend(this.scroller, objScroller);
        this.InitScroll();
    }
    ScrollJS.prototype.InitScroll = function () {
        let _scroller = this.scroller;
        let _doc = this.doc;
        //console.log(_scroller.content.height(), _scroller.container.height())
        _scroller.content.off('scroll').on('scroll', function (e) {
            let height = Math.pow(_scroller.container.height(), 2) / _scroller.content[0].scrollHeight;
            let top = _scroller.content.height() * _scroller.content[0].scrollTop / _scroller.content[0].scrollHeight + 5;
            _scroller.scrollbar.stop(true).css({
                opacity: 0.7,
                height: height,
                top: top
            }); //.delay(2000).animate({opacity: 0});
            window.pageYOffset = top;
            window.height = height;
            $(window).trigger('scroll');
        });
        // $(window).off('resize').on('resize', _scroller.container.trigger.bind(_scroller.container, 'scroll'));
        _scroller.content.trigger('scroll');
        _scroller.scrollbar.off('mousedown').on('mousedown', function (e) {
            e.preventDefault();
            let y = _scroller.scrollbar[0].offsetTop;
            let y1 = e.originalEvent.pageY;
            _doc.off('mousemove').on('mousemove', function (e) {
                let y2 = e.originalEvent.pageY;
                _scroller.scrollbar.css('top', Math.min(_scroller.content.height() - _scroller.scrollbar.height() + 5, Math.max(5, y + y2 - y1)));
                _scroller.content[0].scrollTop = (_scroller.content[0].scrollHeight * _scroller.scrollbar[0].offsetTop / _scroller.content.height());
            });
            _doc.off('mouseup').on('mouseup', function () {
                _doc.off('mousemove');
            });
        });
    };
    return ScrollJS;
}());

//$(function () {
//    $('.hasChild').on('mouseover', function () {
//        $(this).find('> ul').slideDown(200);
//    });
//    $('.hasChild').on('mouseout', function () {
//        $(this).find('> ul').slideUp(200);
//    });
//});

function ChangeRangeSliderValue($slider, minVal, maxVal) {
    $slider.slider({
        values: [minVal, maxVal]
    });
    $slider.slider('option', 'slide');
    $slider.find('.minHndl').text(minVal);
    $slider.find('.maxHndl').text(maxVal);
    $slider.slider("enable");
}
(function ($) {  
    $.fn.createRangeSlider = function rangeSlider(min, max, initMinVal, initMaxVal, callbackFunction, $parent) {
        let $slider = $(this);
        $slider.css('position', 'relative');
        $slider.find('.ui-slider-range').remove();
        if (!$slider.hasClass('cb-view-slider')) {
            $slider.addClass('cb-rng-slider cb-view-slider');
            $slider.html('<span class="minHndl ui-slider-handle"></span><span class="maxHndl ui-slider-handle"></span>');
        }
        let $minHandler = $slider.find('.minHndl');
        let $maxHandler = $slider.find('.maxHndl');
        return $slider.slider({
            range: true,
            min: min,
            max: max,
            values: [initMinVal, initMaxVal],
            create: function () {
                $minHandler.text($(this).slider("values")[0]);
                $maxHandler.text($(this).slider("values")[1]);
            },
            slide: function (event, ui) {
                $minHandler.text(ui.values[0]);
                $maxHandler.text(ui.values[1]);
                if (typeof (callbackFunction) === 'function') {
                    callbackFunction(ui.values[0], ui.values[1], $parent);
                }
                else if (typeof (callbackFunction) === 'string') {
                    window[callbackFunction](ui.values[0], ui.values[1], $parent);
                }
            }
        });
    };
})(jQuery);

(function ($) {
    "use strict";
    $.fn.AdvanceHoverOverlay = function (o) {
        if (typeof o === 'undefined') {
            console.error("AdvanceHoverOverlay => missing options");
            return;
        }
        if (typeof o.targetElem === 'undefined') {
            console.error("AdvanceHoverOverlay => missing option: targetElem");
            return;
        }
        if (typeof o.overlayElem === 'undefined') {
            console.error("AdvanceHoverOverlay => missing option: overlayElem");
            return;
        }
        if (!(o.targetElem instanceof jQuery)) {
            console.error("AdvanceHoverOverlay => targetElem should be a jQuery object");
            return;
        }
        if (!(o.overlayElem instanceof jQuery)) {
            console.error("AdvanceHoverOverlay => overlayElem should be a jQuery object");
            return;
        }
        let $self = this,
            $settingsElem = false,
            forceActivate = false,
            responsiveSettings = false,
            $targetElem = o.targetElem,
            $overlayElem = o.overlayElem;
        if (typeof o.settingsElem !== 'undefined') {
            if (!(o.settingsElem instanceof jQuery)) {
                console.error("AdvanceHoverOverlay => settingsElem should be a jQuery object");
                return;
            } else {
                $settingsElem = o.settingsElem;
            }
        }
        if (typeof o.forceActivate !== 'undefined') {
            forceActivate = o.forceActivate;
        }
        if (typeof o.responsiveSettings !== 'undefined') {
            responsiveSettings = o.responsiveSettings;
        }
        //let clickDOM = `<div class="lhTrigger Dn Fs-20"><i class="fa fa-expand"></i></div>`;
        let settingsDOM = `<div class ="l-h-basic-set">
    <div class ="field-row stElWrap col50-50">
        <label class ="fCol">Enable hover effect</label>
        <div class ="fCol TxAl-r">
            <span class ="toggle_btn">
                <input type="checkbox" id="enableHoverEffect" name="toggleButton">
                <label for="toggleButton" class ="tgl_slider"></label>
            </span>
        </div>
    </div>
    <div class ="field-row">
        <div class ="field-row stElWrap col40-60">
            <label class ="fCol">Animation</label>
            <span class ="fCol TxAl-r select__box">
                <select id="lhAnimation">
                    <option value="fade">Fade</option>
                    <option value="zoom">Zoom</option>
                    <option value="slide-left">Slide from left</option>
                    <option value="slide-right">Slide from right</option>
                    <option value="slide-top">Slide from top</option>
                    <option value="slide-bottom">Slide from bottom</option>
                </select>
            </span>
        </div>
    </div>
    <div class ="field-row stElWrap col50-50">
        <label class ="fCol">Inverse effect</label>
        <div class ="fCol TxAl-r">
            <span class ="toggle_btn">
                <input type="checkbox" id="enableInverseEffect" name="toggleButton">
                <label for="toggleButton" class ="tgl_slider"></label>
            </span>
        </div>
    </div>
    <div class ="field-row stElWrap col100">
        <label class ="fCol">Before editing layer, please disable hover effect.</label>
    </div>
    <div id="lhLayerEditor">
        <div class ="field-row">
            <div class ="field-row stElWrap col40-60">
                <label class ="fCol">Edit Layer</label>
                <span class ="fCol TxAl-r select__box">
                    <select id="lhEditLayer">
                        <option value="lhFront" data-editcls="lh-front-edit">Front Layer</option>
                        <option value="lhOver" data-editcls="lh-over-edit">Hover Layer</option>
                    </select>
                </span>
            </div>
        </div>
        <div class ="field-row stElWrap col100" id="lhFrontLayerHeightHld">
            <span class ="range__slider fCol">
                <div id="lhFrontLayerHeight">
                    <div title="Height" id="lhFrontLayerHeightHandle" class ="ui-slider-handle">100</div>
                </div>
            </span>
        </div>
        <div class ="field-row stElWrap col100" id="lhFrontLayerWidthHld">
            <span class ="range__slider fCol">
                <div id="lhFrontLayerWidth">
                    <div title="Width" id="lhFrontLayerWidthHandle" class ="ui-slider-handle">100</div>
                </div>
            </span>
        </div>
        <div class ="field-row stElWrap col100" id="lhOverLayerHeightHld">
            <span class ="range__slider fCol">
                <div id="lhOverLayerHeight">
                    <div title="Height" id="lhOverLayerHeightHandle" class ="ui-slider-handle">100</div>
                </div>
            </span>
        </div>
        <div class ="field-row stElWrap col100" id="lhOverLayerWidthHld">
            <span class ="range__slider fCol">
                <div id="lhOverLayerWidth">
                    <div title="Width" id="lhOverLayerWidthHandle" class ="ui-slider-handle">100</div>
                </div>
            </span>
        </div>
        <div class ="field-row stElWrap col50-50" id="lhOverFHHld">
            <label class ="fCol">Full Height</label>
            <div class ="fCol TxAl-r">
                <span class ="toggle_btn">
                    <input type="checkbox" id="lhOverFH" name="toggleButton">
                    <label for="toggleButton" class ="tgl_slider"></label>
                </span>
            </div>
        </div>
    </div>
</div>`;

        let responsiveDOM = `<div class ="l-h-basic-set">
    <div class ="field-row">
        <div class ="field-row stElWrap col40-60">
            <label class ="fCol">Edit Layer</label>
            <span class ="fCol TxAl-r select__box">
                <select id="lhEditLayer">
                    <option value="lhFront" data-editcls="lh-front-edit">Front Layer</option>
                    <option value="lhOver" data-editcls="lh-over-edit">Hover Layer</option>
                </select>
            </span>
        </div>
    </div>
    <div class ="field-row stElWrap col100" id="lhFrontLayerHeightHld">
        <span class ="range__slider fCol">
            <div id="lhFrontLayerHeight">
                <div title="Height" id="lhFrontLayerHeightHandle" class ="ui-slider-handle">100</div>
            </div>
        </span>
    </div>
    <div class ="field-row stElWrap col100" id="lhFrontLayerWidthHld">
        <span class ="range__slider fCol">
            <div id="lhFrontLayerWidth">
                <div title="Width" id="lhFrontLayerWidthHandle" class ="ui-slider-handle">100</div>
            </div>
        </span>
    </div>
    <div class ="field-row stElWrap col100" id="lhOverLayerHeightHld">
        <span class ="range__slider fCol">
            <div id="lhOverLayerHeight">
                <div title="Height" id="lhOverLayerHeightHandle" class ="ui-slider-handle">100</div>
            </div>
        </span>
    </div>
    <div class ="field-row stElWrap col100" id="lhOverLayerWidthHld">
        <span class ="range__slider fCol">
            <div id="lhOverLayerWidth">
                <div title="Width" id="lhOverLayerWidthHandle" class ="ui-slider-handle">100</div>
            </div>
        </span>
    </div>
    <div class ="field-row stElWrap col50-50" id="lhOverFHHld">
        <label class ="fCol">Full Height</label>
        <div class ="fCol TxAl-r">
            <span class ="toggle_btn">
                <input type="checkbox" id="lhOverFH" name="toggleButton">
                <label for="toggleButton" class ="tgl_slider"></label>
            </span>
        </div>
    </div>

</div>`;

        let AdvanceHoverOverlay = {
            init: function () {
                let activated = $self.attr('data-activated');
                if ((activated == 1 || forceActivate) && $settingsElem === false) {
                    this.prepareDOMs();
                    this.addOverlayEvents();
                } else if ($settingsElem !== false) {
                    if (!$self.hasClass('lh-is-edit')) {
                        $self.addClass('lh-is-edit lh-front-edit');
                    }
                    if (responsiveSettings) {
                        this.responsive.appendSettingsDOM();
                    } else {
                        this.appendSettingsDOM();

                    }
                    this.setupLayerDimension();
                    this.addSettingsEvents();
                    this.removeOverlayEvents();
                    this.loadSettings();
                }
            },
            appendSettingsDOM: function () {
                if (!$settingsElem) {
                    return;
                }
                $settingsElem.html(settingsDOM);
            },
            setupLayerDimension: function () {
                let d = ViewDeviceAlpha();
                //front height
                function FrontHeightChange(space) {
                    ReplaceClassByPattern($targetElem, 'H-(([0-9]{1,4})|a)', 'H-' + space);
                }
                let fh = GetValueByClassName($targetElem, 'H-(([0-9]{1,4})|a)', 'H-');
                fh = (fh == 0 || fh == "a") ? $targetElem.height() : fh;
                AdvanceSageSlider($('#lhFrontLayerHeight'), $('#lhFrontLayerHeightHandle'), 1, 1080, fh, FrontHeightChange, $targetElem, 'px');
                //over height
                function OverHeightChange(space) {
                    ReplaceClassByPattern($overlayElem, 'H-(([0-9]{1,4})|a)', 'H-' + space);
                }
                let oh = GetValueByClassName($overlayElem, 'H-(([0-9]{1,4})|a)', 'H-');
                oh = (oh == 0 || oh == "a") ? $overlayElem.height() : oh;
                AdvanceSageSlider($('#lhOverLayerHeight'), $('#lhOverLayerHeightHandle'), 1, 1080, oh, OverHeightChange, $overlayElem, 'px');
                //front width
                function FrontWidthChange(space) {
                    ReplaceClassByPattern($targetElem, 'sfCol_[0-9]{1,3}', 'sfCol_' + space);
                }
                AdvanceSageSlider($('#lhFrontLayerWidth'), $('#lhFrontLayerWidthHandle'), 1, 100, GetValueByClassName($targetElem, 'sfCol_[0-9]{1,3}', 'sfCol_'), FrontWidthChange, $targetElem, '%');
                //over width
                function OverWidthChange(space) {
                    ReplaceClassByPattern($overlayElem, 'sfCol_[0-9]{1,3}', 'sfCol_' + space);
                }
                AdvanceSageSlider($('#lhOverLayerWidth'), $('#lhOverLayerWidthHandle'), 1, 100, GetValueByClassName($overlayElem, 'sfCol_[0-9]{1,3}', 'sfCol_'), OverWidthChange, $overlayElem, '%');

                //over full height
                $('#lhOverFH').off('click').on('click', function () {
                    if ($(this).is(':checked')) {
                        $('#lhOverLayerHeightHld').addClass('Dn');
                        let regex = new RegExp('\\b' + d + 'H-(([0-9]{1,4})|a)' + '\\b', 'g');
                        $overlayElem.addClass(d + 'H-f').removeClass(function (index, className) {
                            return (className.match(regex) || []).join(' ');
                        });
                    } else {
                        $overlayElem.removeClass(d + 'H-f').removeClass('H-a');
                        $('#lhOverLayerHeightHld').removeClass('Dn');
                    }
                });
            },
            addSettingsEvents: function () {
                $('#lhEditLayer').off('change').on('change', function () {
                    let activated = $self.attr('data-activated');
                    if (activated == 1) {
                        SageAlertDialog('Please disable hover effect before editing.');
                        return;
                    }
                    let v = $(this).val();
                    let d = ViewDeviceAlpha();
                    let cls = $(this).find(':selected').attr('data-editcls');
                    //$self.find('.lh_layer').removeClass('lh-front-edit lh-over-edit');
                    //$self.find('.' + v).addClass(cls);
                    $self.removeClass('lh-front-edit lh-over-edit');
                    $self.addClass(cls);
                    $('#lhFrontLayerWidthHld, #lhFrontLayerHeightHld, #lhOverLayerWidthHld, #lhOverLayerHeightHld, #lhOverFHHld').addClass('Dn');

                    if (v == 'lhOver') {
                        $('#' + v + 'LayerWidthHld').removeClass('Dn');
                        $('#' + v + 'FHHld').removeClass('Dn');
                        if ($overlayElem.hasClass(d + 'H-f')) {
                            $('#lhOverFH').prop("checked", true);
                            $('#lhOverLayerHeightHld').addClass('Dn');
                        } else {
                            $('#lhOverFH').prop("checked", false);
                            $('#lhOverLayerHeightHld').removeClass('Dn');
                        }
                    } else {
                        $('#' + v + 'LayerWidthHld').removeClass('Dn');
                        $('#' + v + 'LayerHeightHld').removeClass('Dn');
                    }
                });
                $('#enableHoverEffect').off('click').on('click', function () {
                    if ($(this).is(':checked')) {
                        $self.attr('data-activated', 1);
                        AdvanceHoverOverlay.prepareDOMs();
                        AdvanceHoverOverlay.addOverlayEvents();
                        $('#lhLayerEditor').addClass('Dn');
                    } else {
                        AdvanceHoverOverlay.removeOverlayEvents($activeDOM);
                        $('#lhLayerEditor').removeClass('Dn');
                    }
                });
                $('#lhAnimation').off('change').on('change', function () {
                    let animation = $(this).val();
                    $self.attr('data-animation', animation);
                    let activated = $self.attr('data-activated');
                    if (activated == 1) {
                        AdvanceHoverOverlay.prepareDOMs();
                        AdvanceHoverOverlay.addOverlayEvents();
                    }
                });
                $('#enableInverseEffect').off('click').on('click', function () {
                    if ($(this).is(':checked')) {
                        $self.attr('data-inverse', 1);
                        $self.addClass('lh-anim-inverse');
                    } else {
                        $self.attr('data-inverse', 0);
                        $self.removeClass('lh-anim-inverse');
                    }
                    let activated = $self.attr('data-activated');
                    if (activated == 1) {
                        $self.removeClass('lh_animating');
                        AdvanceHoverOverlay.prepareDOMs();
                    }
                });
            },
            loadSettings: function () {
                let activated = $self.attr('data-activated');
                if (activated == 1) {
                    $('#enableHoverEffect').prop("checked", true);
                } else {
                    $('#enableHoverEffect').prop("checked", false);
                }
                let animation = $self.attr('data-animation');
                $('#lhAnimation').val(animation).trigger('change');
                let inverse = $self.attr('data-inverse');
                if (inverse == 1) {
                    $('#enableInverseEffect').prop("checked", true);
                } else {
                    $('#enableInverseEffect').prop("checked", false);
                }
            },
            removeOverlayEvents: function () {
                //$self.addClass('lh-is-edit');
                $self.off('mouseenter mouseleave');
                $self.attr('data-activated', 0);
                $overlayElem.removeClass(function (index, className) {
                    return (className.match(/\blh-anim-([a-zA-Z0-9\-]+)\b/g) || []).join(' ');
                });
                let currentEdit = 'lhFront';
                if ($self.hasClass('lh-over-edit')) {
                    currentEdit = 'lhOver';
                }
                $('#lhEditLayer').val(currentEdit).trigger('change');
            },
            getAnimation: function () {
                let animation = $self.attr('data-animation');
                if (typeof animation === 'undefined') {
                    animation = 'slide-right';
                }
                return animation;
            },
            isInverse: function () {
                let inverse = $self.attr('data-inverse');
                return (typeof inverse !== 'undefined' && inverse == 1);
            },
            prepareDOMs: function () {
                $targetElem.removeClass('Dn');
                $overlayElem.removeClass('Dn');
            },
            addOverlayEvents: function () {
                $self.removeClass('lh-is-edit lh-over-edit').addClass('lh-front-edit');
                $targetElem.removeClass('lh-front-edit');
                let animation = AdvanceHoverOverlay.getAnimation();
                $overlayElem.removeClass('Dn').removeClass(function (index, className) {
                    return (className.match(/\blh-anim-([a-zA-Z0-9\-]+)\b/g) || []).join(' ');
                }).addClass('lh-anim-' + animation);
            },
            responsive: {
                appendSettingsDOM: function () {
                    if (!$settingsElem) {
                        return;
                    }
                    $settingsElem.html(responsiveDOM);
                }
            }
        };
        AdvanceHoverOverlay.init();
    };
}(jQuery));

(function ($) {
    "use strict";
    function WordRotator(instance, opt) {
        this.instance = instance;
        let defaults = {
            words: [],
            delay: 3000,
            holder: '.word'
        };
        this.uTimer = null;
        this.iTimer = null;
        this.rTimer = null;
        this.options = $.extend({}, defaults, opt);
        this.$el = $(this.instance);
        this.$holder = this.$el.find(this.options.holder);
        this.animate();
    }

    WordRotator.prototype = {
        animate: function () {
            let self = this;
            if (self.uTimer) {
                clearTimeout(self.uTimer);
                self.uTimer = null;
            }
            self.uTimer = setTimeout(function () {
                self.update(0);
            }, this.options.delay);
        },
        update: function (f) {
            let self = this;
            //console.log("utimer", self.uTimer);
            if (self.uTimer) {
                clearTimeout(self.uTimer);
                self.uTimer = null;
            }
            self.remove(self.$holder.html().length, function () {
                self.insert(self.options.words[f], 0, function () {
                    self.update((f + 1) % self.options.words.length);
                });
            });
        },
        remove: function (t, i) {
            let self = this;
            //console.log("rtimer", self.rTimer);
            if (self.rTimer) {
                clearTimeout(self.rTimer);
                self.rTimer = null;
            }
            if (t > 0) {
                self.$holder.html(self.$holder.html().substring(0, t - 1));
                self.rTimer = setTimeout(function () {
                    self.remove(t - 1, i);
                }, 100);
            } else {
                typeof i === 'function' && (self.iTimer = setTimeout(i, 100));
            }
        },
        insert: function (t, r, u) {
            let self = this;
            //console.log("itimer", self.iTimer);
            if (self.iTimer) {
                clearTimeout(self.iTimer);
                self.iTimer = null;
            }
            if (r < t.length) {
                self.$holder.html(t.substring(0, r + 1));
                self.iTimer = setTimeout(function () {
                    self.insert(t, r + 1, u);
                }, 100);
            } else {
                typeof u == "function" && (self.uTimer = setTimeout(u, self.options.delay));
            }
        },
        clearTimers: function () {
            let self = this;
            //console.log("clear ", self.iTimer, self.uTimer, self.rTimer);
            if (self.iTimer) {
                clearTimeout(self.iTimer);
            }
            if (self.uTimer) {
                clearTimeout(self.uTimer);
            }
            if (self.rTimer) {
                clearTimeout(self.rTimer);
            }
            self.uTimer = null;
            self.iTimer = null;
            self.rTimer = null;
        },
        destroy: function () {
            let self = this;
            self.clearTimers();
            //self.$el.removeData('wordrotator');
            self.$el.removeData();
            self.$el = null;
            self.$holder = null;
            self.options = {};
        },
        setDelay: function (delay) {
            this.options.delay = delay;
        }
    };
    $.fn.wordRotator = function (options) {
        let args = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            let $el = $(this);
            if (typeof $el.data('wordrotator') === 'undefined') {
                if (typeof options == 'string' || options instanceof String) {
                    throw "invalid option '" + options + "' passed while creating new instance.";
                }
                let p = new WordRotator(this, options);
                $el.data('wordrotator', p);
            } else if (typeof options !== 'undefined') {
                let currentInstance = $(this).data('wordrotator');
                //console.log("wr inst", currentInstance);
                if (typeof currentInstance[options] === 'function') {
                    currentInstance[options].apply(currentInstance, args);
                } else {
                    //throw "Unrecognized option " + options;
                }
            }
        });
    };
}(jQuery));
!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],b):"object"==typeof exports?module.exports=b(require("jquery")):a.lightbox=b(a.jQuery)}(this,function(a){function b(b){this.album=[],this.currentImageIndex=void 0,this.init(),this.options=a.extend({},this.constructor.defaults),this.option(b)}return b.defaults={albumLabel:"Image %1 of %2",alwaysShowNavOnTouchDevices:!1,fadeDuration:600,fitImagesInViewport:!0,imageFadeDuration:600,positionFromTop:50,resizeDuration:700,showImageNumberLabel:!0,wrapAround:!1,disableScrolling:!1,sanitizeTitle:!1},b.prototype.option=function(b){a.extend(this.options,b)},b.prototype.imageCountLabel=function(a,b){return this.options.albumLabel.replace(/%1/g,a).replace(/%2/g,b)},b.prototype.init=function(){var b=this;a(document).ready(function(){b.enable(),b.build()})},b.prototype.enable=function(){var b=this;a("body").on("click","a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]",function(c){return b.start(a(c.currentTarget)),!1})},b.prototype.build=function(){if(!(a("#lightbox").length>0)){var b=this;a('<div id="lightboxOverlay" class="lightboxOverlay"></div><div id="lightbox" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" /><div class="lb-nav"><a class="lb-prev" href="" ></a><a class="lb-next" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo(a("body")),this.$lightbox=a("#lightbox"),this.$overlay=a("#lightboxOverlay"),this.$outerContainer=this.$lightbox.find(".lb-outerContainer"),this.$container=this.$lightbox.find(".lb-container"),this.$image=this.$lightbox.find(".lb-image"),this.$nav=this.$lightbox.find(".lb-nav"),this.containerPadding={top:parseInt(this.$container.css("padding-top"),10),right:parseInt(this.$container.css("padding-right"),10),bottom:parseInt(this.$container.css("padding-bottom"),10),left:parseInt(this.$container.css("padding-left"),10)},this.imageBorderWidth={top:parseInt(this.$image.css("border-top-width"),10),right:parseInt(this.$image.css("border-right-width"),10),bottom:parseInt(this.$image.css("border-bottom-width"),10),left:parseInt(this.$image.css("border-left-width"),10)},this.$overlay.hide().on("click",function(){return b.end(),!1}),this.$lightbox.hide().on("click",function(c){return"lightbox"===a(c.target).attr("id")&&b.end(),!1}),this.$outerContainer.on("click",function(c){return"lightbox"===a(c.target).attr("id")&&b.end(),!1}),this.$lightbox.find(".lb-prev").on("click",function(){return 0===b.currentImageIndex?b.changeImage(b.album.length-1):b.changeImage(b.currentImageIndex-1),!1}),this.$lightbox.find(".lb-next").on("click",function(){return b.currentImageIndex===b.album.length-1?b.changeImage(0):b.changeImage(b.currentImageIndex+1),!1}),this.$nav.on("mousedown",function(a){3===a.which&&(b.$nav.css("pointer-events","none"),b.$lightbox.one("contextmenu",function(){setTimeout(function(){this.$nav.css("pointer-events","auto")}.bind(b),0)}))}),this.$lightbox.find(".lb-loader, .lb-close").on("click",function(){return b.end(),!1})}},b.prototype.start=function(b){function c(a){d.album.push({alt:a.attr("data-alt"),link:a.attr("href"),title:a.attr("data-title")||a.attr("title")})}var d=this,e=a(window);e.on("resize",a.proxy(this.sizeOverlay,this)),a("select, object, embed").css({visibility:"hidden"}),this.sizeOverlay(),this.album=[];var f,g=0,h=b.attr("data-lightbox");if(h){f=a(b.prop("tagName")+'[data-lightbox="'+h+'"]');for(var i=0;i<f.length;i=++i)c(a(f[i])),f[i]===b[0]&&(g=i)}else if("lightbox"===b.attr("rel"))c(b);else{f=a(b.prop("tagName")+'[rel="'+b.attr("rel")+'"]');for(var j=0;j<f.length;j=++j)c(a(f[j])),f[j]===b[0]&&(g=j)}var k=e.scrollTop()+this.options.positionFromTop,l=e.scrollLeft();this.$lightbox.css({top:k+"px",left:l+"px"}).fadeIn(this.options.fadeDuration),this.options.disableScrolling&&a("html").addClass("lb-disable-scrolling"),this.changeImage(g)},b.prototype.changeImage=function(b){var c=this;this.disableKeyboardNav();var d=this.$lightbox.find(".lb-image");this.$overlay.fadeIn(this.options.fadeDuration),a(".lb-loader").fadeIn("slow"),this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide(),this.$outerContainer.addClass("animating");var e=new Image;e.onload=function(){var f,g,h,i,j,k;d.attr({alt:c.album[b].alt,src:c.album[b].link}),a(e),d.width(e.width),d.height(e.height),c.options.fitImagesInViewport&&(k=a(window).width(),j=a(window).height(),i=k-c.containerPadding.left-c.containerPadding.right-c.imageBorderWidth.left-c.imageBorderWidth.right-20,h=j-c.containerPadding.top-c.containerPadding.bottom-c.imageBorderWidth.top-c.imageBorderWidth.bottom-120,c.options.maxWidth&&c.options.maxWidth<i&&(i=c.options.maxWidth),c.options.maxHeight&&c.options.maxHeight<i&&(h=c.options.maxHeight),(e.width>i||e.height>h)&&(e.width/i>e.height/h?(g=i,f=parseInt(e.height/(e.width/g),10),d.width(g),d.height(f)):(f=h,g=parseInt(e.width/(e.height/f),10),d.width(g),d.height(f)))),c.sizeContainer(d.width(),d.height())},e.src=this.album[b].link,this.currentImageIndex=b},b.prototype.sizeOverlay=function(){this.$overlay.width(a(document).width()).height(a(document).height())},b.prototype.sizeContainer=function(a,b){function c(){d.$lightbox.find(".lb-dataContainer").width(g),d.$lightbox.find(".lb-prevLink").height(h),d.$lightbox.find(".lb-nextLink").height(h),d.showImage()}var d=this,e=this.$outerContainer.outerWidth(),f=this.$outerContainer.outerHeight(),g=a+this.containerPadding.left+this.containerPadding.right+this.imageBorderWidth.left+this.imageBorderWidth.right,h=b+this.containerPadding.top+this.containerPadding.bottom+this.imageBorderWidth.top+this.imageBorderWidth.bottom;e!==g||f!==h?this.$outerContainer.animate({width:g,height:h},this.options.resizeDuration,"swing",function(){c()}):c()},b.prototype.showImage=function(){this.$lightbox.find(".lb-loader").stop(!0).hide(),this.$lightbox.find(".lb-image").fadeIn(this.options.imageFadeDuration),this.updateNav(),this.updateDetails(),this.preloadNeighboringImages(),this.enableKeyboardNav()},b.prototype.updateNav=function(){var a=!1;try{document.createEvent("TouchEvent"),a=!!this.options.alwaysShowNavOnTouchDevices}catch(a){}this.$lightbox.find(".lb-nav").show(),this.album.length>1&&(this.options.wrapAround?(a&&this.$lightbox.find(".lb-prev, .lb-next").css("opacity","1"),this.$lightbox.find(".lb-prev, .lb-next").show()):(this.currentImageIndex>0&&(this.$lightbox.find(".lb-prev").show(),a&&this.$lightbox.find(".lb-prev").css("opacity","1")),this.currentImageIndex<this.album.length-1&&(this.$lightbox.find(".lb-next").show(),a&&this.$lightbox.find(".lb-next").css("opacity","1"))))},b.prototype.updateDetails=function(){var b=this;if(void 0!==this.album[this.currentImageIndex].title&&""!==this.album[this.currentImageIndex].title){var c=this.$lightbox.find(".lb-caption");this.options.sanitizeTitle?c.text(this.album[this.currentImageIndex].title):c.html(this.album[this.currentImageIndex].title),c.fadeIn("fast").find("a").on("click",function(b){void 0!==a(this).attr("target")?window.open(a(this).attr("href"),a(this).attr("target")):location.href=a(this).attr("href")})}if(this.album.length>1&&this.options.showImageNumberLabel){var d=this.imageCountLabel(this.currentImageIndex+1,this.album.length);this.$lightbox.find(".lb-number").text(d).fadeIn("fast")}else this.$lightbox.find(".lb-number").hide();this.$outerContainer.removeClass("animating"),this.$lightbox.find(".lb-dataContainer").fadeIn(this.options.resizeDuration,function(){return b.sizeOverlay()})},b.prototype.preloadNeighboringImages=function(){if(this.album.length>this.currentImageIndex+1){(new Image).src=this.album[this.currentImageIndex+1].link}if(this.currentImageIndex>0){(new Image).src=this.album[this.currentImageIndex-1].link}},b.prototype.enableKeyboardNav=function(){a(document).on("keyup.keyboard",a.proxy(this.keyboardAction,this))},b.prototype.disableKeyboardNav=function(){a(document).off(".keyboard")},b.prototype.keyboardAction=function(a){var b=a.keyCode,c=String.fromCharCode(b).toLowerCase();27===b||c.match(/x|o|c/)?this.end():"p"===c||37===b?0!==this.currentImageIndex?this.changeImage(this.currentImageIndex-1):this.options.wrapAround&&this.album.length>1&&this.changeImage(this.album.length-1):"n"!==c&&39!==b||(this.currentImageIndex!==this.album.length-1?this.changeImage(this.currentImageIndex+1):this.options.wrapAround&&this.album.length>1&&this.changeImage(0))},b.prototype.end=function(){this.disableKeyboardNav(),a(window).off("resize",this.sizeOverlay),this.$lightbox.fadeOut(this.options.fadeDuration),this.$overlay.fadeOut(this.options.fadeDuration),a("select, object, embed").css({visibility:"visible"}),this.options.disableScrolling&&a("html").removeClass("lb-disable-scrolling")},new b});
/**
 * Slick carousel
 * https://github.com/kenwheeler/slick/
 */
(function (i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
})(function (i) {
    "use strict";
    var e = window.Slick || {};
    e = function () {
        function e(e, o) {
            var s, n = this;
            n.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: i(e),
                appendDots: i(e),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function (e, t) {
                    return i('<button type="button" />').text(t + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3,
                customOnChange: null
            }, n.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(e), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(e).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, "undefined" != typeof document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = t++ , n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
        }
        var t = 0;
        return e
    }(), e.prototype.activateADA = function () {
        var i = this;
        i.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, e.prototype.addSlide = e.prototype.slickAdd = function (e, t, o) {
        var s = this;
        if ("boolean" == typeof t) o = t, t = null;
        else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : o === !0 ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function (e, t) {
            i(t).attr("data-slick-index", e)
        }), s.$slidesCache = s.$slides, s.reinit()
    }, e.prototype.animateHeight = function () {
        var i = this;
        if (1 === i.options.slidesToShow && i.options.adaptiveHeight === !0 && i.options.vertical === !1) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.animate({
                height: e
            }, i.options.speed)
        }
    }, e.prototype.animateSlide = function (e, t) {
        var o = {},
            s = this;
        s.animateHeight(), s.options.rtl === !0 && s.options.vertical === !1 && (e = -e), s.transformsEnabled === !1 ? s.options.vertical === !1 ? s.$slideTrack.animate({
            left: e
        }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
            top: e
        }, s.options.speed, s.options.easing, t) : s.cssTransitions === !1 ? (s.options.rtl === !0 && (s.currentLeft = -s.currentLeft), i({
            animStart: s.currentLeft
        }).animate({
            animStart: e
        }, {
                duration: s.options.speed,
                easing: s.options.easing,
                step: function (i) {
                    i = Math.ceil(i), s.options.vertical === !1 ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o))
                },
                complete: function () {
                    t && t.call()
                }
            })) : (s.applyTransition(), e = Math.ceil(e), s.options.vertical === !1 ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function () {
                s.disableTransition(), t.call()
            }, s.options.speed))
    }, e.prototype.getNavTarget = function () {
        var e = this,
            t = e.options.asNavFor;
        return t && null !== t && (t = i(t).not(e.$slider)), t
    }, e.prototype.asNavFor = function (e) {
        var t = this,
            o = t.getNavTarget();
        null !== o && "object" == typeof o && o.each(function () {
            var t = i(this).slick("getSlick");
            t.unslicked || t.slideHandler(e, !0)
        })
    }, e.prototype.applyTransition = function (i) {
        var e = this,
            t = {};
        e.options.fade === !1 ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, e.prototype.autoPlay = function () {
        var i = this;
        i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
    }, e.prototype.autoPlayClear = function () {
        var i = this;
        i.autoPlayTimer && clearInterval(i.autoPlayTimer)
    }, e.prototype.autoPlayIterator = function () {
        var i = this,
            e = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (i.options.infinite === !1 && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 === 0 && (i.direction = 1))), i.slideHandler(e))
    }, e.prototype.buildArrows = function () {
        var e = this;
        e.options.arrows === !0 && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), e.options.infinite !== !0 && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, e.prototype.buildDots = function () {
        var e, t, o = this;
        if (o.options.dots === !0 && o.slideCount > o.options.slidesToShow) {
            for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
            o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active")
        }
    }, e.prototype.buildOut = function () {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function (e, t) {
            i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "")
        }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), e.options.centerMode !== !0 && e.options.swipeToSlide !== !0 || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.options.draggable === !0 && e.$list.addClass("draggable")
    }, e.prototype.buildRows = function () {
        var i, e, t, o, s, n, r, l = this;
        if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 0) {
            for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
                var d = document.createElement("div");
                for (e = 0; e < l.options.rows; e++) {
                    var a = document.createElement("div");
                    for (t = 0; t < l.options.slidesPerRow; t++) {
                        var c = i * r + (e * l.options.slidesPerRow + t);
                        n.get(c) && a.appendChild(n.get(c))
                    }
                    d.appendChild(a)
                }
                o.appendChild(d)
            }
            l.$slider.empty().append(o), l.$slider.children().children().children().css({
                width: 100 / l.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, e.prototype.checkResponsive = function (e, t) {
        var o, s, n, r = this,
            l = !1,
            d = r.$slider.width(),
            a = window.innerWidth || i(window).width();
        if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            s = null;
            for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (r.originalSettings.mobileFirst === !1 ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
            null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || l === !1 || r.$slider.trigger("breakpoint", [r, l])
        }
    }, e.prototype.changeSlide = function (e, t) {
        var o, s, n, r = this,
            l = i(e.currentTarget);
        switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll !== 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
            case "previous":
                s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
                break;
            case "next":
                s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
                break;
            case "index":
                var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
                r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
                break;
            default:
                return
        }
    }, e.prototype.checkNavigable = function (i) {
        var e, t, o = this;
        if (e = o.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1];
        else
            for (var s in e) {
                if (i < e[s]) {
                    i = t;
                    break
                }
                t = e[s]
            }
        return i
    }, e.prototype.cleanUpEvents = function () {
        var e = this;
        e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), e.options.accessibility === !0 && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), e.options.accessibility === !0 && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), e.options.accessibility === !0 && e.$list.off("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.cleanUpSlideEvents = function () {
        var e = this;
        e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }, e.prototype.cleanUpRows = function () {
        var i, e = this;
        e.options.rows > 0 && (i = e.$slides.children().children(), i.removeAttr("style"), e.$slider.empty().append(i))
    }, e.prototype.clickHandler = function (i) {
        var e = this;
        e.shouldClick === !1 && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault())
    }, e.prototype.destroy = function (e) {
        var t = this;
        t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
            i(this).attr("style", i(this).data("originalStyling"))
        }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
    }, e.prototype.disableTransition = function (i) {
        var e = this,
            t = {};
        t[e.transitionType] = "", e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, e.prototype.fadeSlide = function (i, e) {
        var t = this;
        t.cssTransitions === !1 ? (t.$slides.eq(i).css({
            zIndex: t.options.zIndex
        }), t.$slides.eq(i).animate({
            opacity: 1
        }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
            opacity: 1,
            zIndex: t.options.zIndex
        }), e && setTimeout(function () {
            t.disableTransition(i), e.call()
        }, t.options.speed))
    }, e.prototype.fadeSlideOut = function (i) {
        var e = this;
        e.cssTransitions === !1 ? e.$slides.eq(i).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }, e.prototype.filterSlides = e.prototype.slickFilter = function (i) {
        var e = this;
        null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit())
    }, e.prototype.focusHandler = function () {
        var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick", "*", function (t) {
            var o = i(this);
            setTimeout(function () {
                e.options.pauseOnFocus && o.is(":focus") && (e.focussed = !0, e.autoPlay())
            }, 0)
        }).on("blur.slick", "*", function (t) {
            i(this);
            e.options.pauseOnFocus && (e.focussed = !1, e.autoPlay())
        })
    }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
        var i = this;
        return i.currentSlide
    }, e.prototype.getDotCount = function () {
        var i = this,
            e = 0,
            t = 0,
            o = 0;
        if (i.options.infinite === !0)
            if (i.slideCount <= i.options.slidesToShow)++o;
            else
                for (; e < i.slideCount;)++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else if (i.options.centerMode === !0) o = i.slideCount;
        else if (i.options.asNavFor)
            for (; e < i.slideCount;)++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
        return o - 1
    }, e.prototype.getLeft = function (i) {
        var e, t, o, s, n = this,
            r = 0;
        return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), n.options.infinite === !0 ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, n.options.vertical === !0 && n.options.centerMode === !0 && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll !== 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), n.options.centerMode === !0 && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : n.options.centerMode === !0 && n.options.infinite === !0 ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : n.options.centerMode === !0 && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = n.options.vertical === !1 ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, n.options.variableWidth === !0 && (o = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = n.options.rtl === !0 ? o[0] ? (n.$slideTrack.width() - o[0].offsetLeft - o.width()) * -1 : 0 : o[0] ? o[0].offsetLeft * -1 : 0, n.options.centerMode === !0 && (o = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = n.options.rtl === !0 ? o[0] ? (n.$slideTrack.width() - o[0].offsetLeft - o.width()) * -1 : 0 : o[0] ? o[0].offsetLeft * -1 : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e
    }, e.prototype.getOption = e.prototype.slickGetOption = function (i) {
        var e = this;
        return e.options[i]
    }, e.prototype.getNavigableIndexes = function () {
        var i, e = this,
            t = 0,
            o = 0,
            s = [];
        for (e.options.infinite === !1 ? i = e.slideCount : (t = e.options.slidesToScroll * -1, o = e.options.slidesToScroll * -1, i = 2 * e.slideCount); t < i;) s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return s
    }, e.prototype.getSlick = function () {
        return this
    }, e.prototype.getSlideCount = function () {
        var e, t, o, s, n = this;
        return s = n.options.centerMode === !0 ? Math.floor(n.$list.width() / 2) : 0, o = n.swipeLeft * -1 + s, n.options.swipeToSlide === !0 ? (n.$slideTrack.find(".slick-slide").each(function (e, s) {
            var r, l, d;
            if (r = i(s).outerWidth(), l = s.offsetLeft, n.options.centerMode !== !0 && (l += r / 2), d = l + r, o < d) return t = s, !1
        }), e = Math.abs(i(t).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
    }, e.prototype.goTo = e.prototype.slickGoTo = function (i, e) {
        var t = this;
        t.changeSlide({
            data: {
                message: "index",
                index: parseInt(i)
            }
        }, e)
    }, e.prototype.init = function (e) {
        var t = this;
        i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), t.options.accessibility === !0 && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
    }, e.prototype.initADA = function () {
        var e = this,
            t = Math.ceil(e.slideCount / e.options.slidesToShow),
            o = e.getNavigableIndexes().filter(function (i) {
                return i >= 0 && i < e.slideCount
            });
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (t) {
            var s = o.indexOf(t);
            if (i(this).attr({
                role: "tabpanel",
                id: "slick-slide" + e.instanceUid + t,
                tabindex: -1
            }), s !== -1) {
                var n = "slick-slide-control" + e.instanceUid + s;
                i("#" + n).length && i(this).attr({
                    "aria-describedby": n
                })
            }
        }), e.$dots.attr("role", "tablist").find("li").each(function (s) {
            var n = o[s];
            i(this).attr({
                role: "presentation"
            }), i(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + e.instanceUid + s,
                "aria-controls": "slick-slide" + e.instanceUid + n,
                "aria-label": s + 1 + " of " + t,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(e.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) e.options.focusOnChange ? e.$slides.eq(s).attr({
            tabindex: "0"
        }) : e.$slides.eq(s).removeAttr("tabindex");
        e.activateADA()
    }, e.prototype.initArrowEvents = function () {
        var i = this;
        i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, i.changeSlide), i.options.accessibility === !0 && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)))
    }, e.prototype.initDotEvents = function () {
        var e = this;
        e.options.dots === !0 && e.slideCount > e.options.slidesToShow && (i("li", e.$dots).on("click.slick", {
            message: "index"
        }, e.changeSlide), e.options.accessibility === !0 && e.$dots.on("keydown.slick", e.keyHandler)), e.options.dots === !0 && e.options.pauseOnDotsHover === !0 && e.slideCount > e.options.slidesToShow && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }, e.prototype.initSlideEvents = function () {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)))
    }, e.prototype.initializeEvents = function () {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), e.options.accessibility === !0 && e.$list.on("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition)
    }, e.prototype.initUI = function () {
        var i = this;
        i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), i.options.dots === !0 && i.slideCount > i.options.slidesToShow && i.$dots.show()
    }, e.prototype.keyHandler = function (i) {
        var e = this;
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && e.options.accessibility === !0 ? e.changeSlide({
            data: {
                message: e.options.rtl === !0 ? "next" : "previous"
            }
        }) : 39 === i.keyCode && e.options.accessibility === !0 && e.changeSlide({
            data: {
                message: e.options.rtl === !0 ? "previous" : "next"
            }
        }))
    }, e.prototype.lazyLoad = function () {
        function e(e) {
            i("img[data-lazy]", e).each(function () {
                var e = i(this),
                    t = i(this).attr("data-lazy"),
                    o = i(this).attr("data-srcset"),
                    s = i(this).attr("data-sizes") || r.$slider.attr("data-sizes"),
                    n = document.createElement("img");
                n.onload = function () {
                    e.animate({
                        opacity: 0
                    }, 100, function () {
                        o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({
                            opacity: 1
                        }, 200, function () {
                            e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }), r.$slider.trigger("lazyLoaded", [r, e, t])
                    })
                }, n.onerror = function () {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, e, t])
                }, n.src = t
            })
        }
        var t, o, s, n, r = this;
        if (r.options.centerMode === !0 ? r.options.infinite === !0 ? (s = r.currentSlide + (r.options.slidesToShow / 2 + 1), n = s + r.options.slidesToShow + 2) : (s = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), n = 2 + (r.options.slidesToShow / 2 + 1) + r.currentSlide) : (s = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, n = Math.ceil(s + r.options.slidesToShow), r.options.fade === !0 && (s > 0 && s-- , n <= r.slideCount && n++)), t = r.$slider.find(".slick-slide").slice(s, n), "anticipated" === r.options.lazyLoad)
            for (var l = s - 1, d = n, a = r.$slider.find(".slick-slide"), c = 0; c < r.options.slidesToScroll; c++) l < 0 && (l = r.slideCount - 1), t = t.add(a.eq(l)), t = t.add(a.eq(d)), l-- , d++;
        e(t), r.slideCount <= r.options.slidesToShow ? (o = r.$slider.find(".slick-slide"), e(o)) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? (o = r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow), e(o)) : 0 === r.currentSlide && (o = r.$slider.find(".slick-cloned").slice(r.options.slidesToShow * -1), e(o))
    }, e.prototype.loadSlider = function () {
        var i = this;
        i.setPosition(), i.$slideTrack.css({
            opacity: 1
        }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
    }, e.prototype.next = e.prototype.slickNext = function () {
        var i = this;
        i.changeSlide({
            data: {
                message: "next"
            }
        })
    }, e.prototype.orientationChange = function () {
        var i = this;
        i.checkResponsive(), i.setPosition()
    }, e.prototype.pause = e.prototype.slickPause = function () {
        var i = this;
        i.autoPlayClear(), i.paused = !0
    }, e.prototype.play = e.prototype.slickPlay = function () {
        var i = this;
        i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1
    }, e.prototype.postSlide = function (e) {
        var t = this;
        if (!t.unslicked && (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), t.options.accessibility === !0 && (t.initADA(), t.options.focusOnChange))) {
            var o = i(t.$slides.get(t.currentSlide));
            o.attr("tabindex", 0).focus()
        }
    }, e.prototype.prev = e.prototype.slickPrev = function () {
        var i = this;
        i.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, e.prototype.preventDefault = function (i) {
        i.preventDefault()
    }, e.prototype.progressiveLazyLoad = function (e) {
        e = e || 1;
        var t, o, s, n, r, l = this,
            d = i("img[data-lazy]", l.$slider);
        d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), r = document.createElement("img"), r.onload = function () {
            s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), l.options.adaptiveHeight === !0 && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad()
        }, r.onerror = function () {
            e < 3 ? setTimeout(function () {
                l.progressiveLazyLoad(e + 1)
            }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad())
        }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l])
    }, e.prototype.refresh = function (e) {
        var t, o, s = this;
        o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, {
            currentSlide: t
        }), s.init(), e || s.changeSlide({
            data: {
                message: "index",
                index: t
            }
        }, !1)
    }, e.prototype.registerBreakpoints = function () {
        var e, t, o, s = this,
            n = s.options.responsive || null;
        if ("array" === i.type(n) && n.length) {
            s.respondTo = s.options.respondTo || "window";
            for (e in n)
                if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) {
                    for (t = n[e].breakpoint; o >= 0;) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
                    s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings
                } s.breakpoints.sort(function (i, e) {
                    return s.options.mobileFirst ? i - e : e - i
                })
        }
    }, e.prototype.reinit = function () {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), e.options.focusOnSelect === !0 && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
    }, e.prototype.resize = function () {
        var e = this;
        i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function () {
            e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
        }, 50))
    }, e.prototype.removeSlide = e.prototype.slickRemove = function (i, e, t) {
        var o = this;
        return "boolean" == typeof i ? (e = i, i = e === !0 ? 0 : o.slideCount - 1) : i = e === !0 ? --i : i, !(o.slideCount < 1 || i < 0 || i > o.slideCount - 1) && (o.unload(), t === !0 ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, void o.reinit())
    }, e.prototype.setCSS = function (i) {
        var e, t, o = this,
            s = {};
        o.options.rtl === !0 && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, o.transformsEnabled === !1 ? o.$slideTrack.css(s) : (s = {}, o.cssTransitions === !1 ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s)))
    }, e.prototype.setDimensions = function () {
        var i = this;
        i.options.vertical === !1 ? i.options.centerMode === !0 && i.$list.css({
            padding: "0px " + i.options.centerPadding
        }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), i.options.centerMode === !0 && i.$list.css({
            padding: i.options.centerPadding + " 0px"
        })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), i.options.vertical === !1 && i.options.variableWidth === !1 ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : i.options.variableWidth === !0 ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
        var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
        i.options.variableWidth === !1 && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
    }, e.prototype.setFade = function () {
        var e, t = this;
        t.$slides.each(function (o, s) {
            e = t.slideWidth * o * -1, t.options.rtl === !0 ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            }) : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            })
        }), t.$slides.eq(t.currentSlide).css({
            zIndex: t.options.zIndex - 1,
            opacity: 1
        })
    }, e.prototype.setHeight = function () {
        var i = this;
        if (1 === i.options.slidesToShow && i.options.adaptiveHeight === !0 && i.options.vertical === !1) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.css("height", e)
        }
    }, e.prototype.setOption = e.prototype.slickSetOption = function () {
        var e, t, o, s, n, r = this,
            l = !1;
        if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : "undefined" != typeof arguments[1] && (n = "single")), "single" === n) r.options[o] = s;
        else if ("multiple" === n) i.each(o, function (i, e) {
            r.options[i] = e
        });
        else if ("responsive" === n)
            for (t in s)
                if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]];
                else {
                    for (e = r.options.responsive.length - 1; e >= 0;) r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
                    r.options.responsive.push(s[t])
                } l && (r.unload(), r.reinit())
    }, e.prototype.setPosition = function () {
        var i = this;
        i.setDimensions(), i.setHeight(), i.options.fade === !1 ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i])
    }, e.prototype.setProps = function () {
        var i = this,
            e = document.body.style;
        i.positionProp = i.options.vertical === !0 ? "top" : "left",
            "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || i.options.useCSS === !0 && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && i.animType !== !1 && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && i.animType !== !1
    }, e.prototype.setSlideClasses = function (i) {
        var e, t, o, s, n = this;
        if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), n.options.centerMode === !0) {
            var r = n.options.slidesToShow % 2 === 0 ? 1 : 0;
            e = Math.floor(n.options.slidesToShow / 2), n.options.infinite === !0 && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center")
        } else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = n.options.infinite === !0 ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
    }, e.prototype.setupInfinite = function () {
        var e, t, o, s = this;
        if (s.options.fade === !0 && (s.options.centerMode = !1), s.options.infinite === !0 && s.options.fade === !1 && (t = null, s.slideCount > s.options.slidesToShow)) {
            for (o = s.options.centerMode === !0 ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1) t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < o + s.slideCount; e += 1) t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
            s.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
                i(this).attr("id", "")
            })
        }
    }, e.prototype.interrupt = function (i) {
        var e = this;
        i || e.autoPlay(), e.interrupted = i
    }, e.prototype.selectHandler = function (e) {
        var t = this,
            o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
            s = parseInt(o.attr("data-slick-index"));
        return s || (s = 0), t.slideCount <= t.options.slidesToShow ? void t.slideHandler(s, !1, !0) : void t.slideHandler(s)
    }, e.prototype.slideHandler = function (i, e, t) {
        var o, s, n, r, l, d = null,
            a = this;
        if (e = e || !1, !(a.animating === !0 && a.options.waitForAnimate === !0 || a.options.fade === !0 && a.currentSlide === i)) return e === !1 && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, a.options.infinite === !1 && a.options.centerMode === !1 && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll) ? void (a.options.fade === !1 && (o = a.currentSlide, t !== !0 && a.slideCount > a.options.slidesToShow ? a.animateSlide(r, function () {
            a.postSlide(o)
        }) : a.postSlide(o))) : a.options.infinite === !1 && a.options.centerMode === !0 && (i < 0 || i > a.slideCount - a.options.slidesToScroll) ? void (a.options.fade === !1 && (o = a.currentSlide, t !== !0 && a.slideCount > a.options.slidesToShow ? a.animateSlide(r, function () {
            a.postSlide(o)
        }) : a.postSlide(o))) : (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll !== 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll !== 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = a.getNavTarget(), l = l.slick("getSlick"), l.slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide)), a.updateDots(), a.updateArrows(), a.options.fade === !0 ? (t !== !0 ? (a.fadeSlideOut(n), a.fadeSlide(s, function () {
            a.postSlide(s)
        })) : a.postSlide(s), void a.animateHeight()) : void (t !== !0 && a.slideCount > a.options.slidesToShow ? a.animateSlide(d, function () {
            a.postSlide(s)
        }) : a.postSlide(s)))
    }, e.prototype.startLoad = function () {
        var i = this;
        i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), i.options.dots === !0 && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading")
    }, e.prototype.swipeDirection = function () {
        var i, e, t, o, s = this;
        return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), o = Math.round(180 * t / Math.PI), o < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? s.options.rtl === !1 ? "left" : "right" : o <= 360 && o >= 315 ? s.options.rtl === !1 ? "left" : "right" : o >= 135 && o <= 225 ? s.options.rtl === !1 ? "right" : "left" : s.options.verticalSwiping === !0 ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
    }, e.prototype.swipeEnd = function (i) {
        var e, t, o = this;
        if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1;
        if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
        if (o.touchObject.edgeHit === !0 && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (t = o.swipeDirection()) {
                case "left":
                case "down":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
            }
            "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]))
        } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
    }, e.prototype.swipeHandler = function (i) {
        var e = this;
        if (!(e.options.swipe === !1 || "ontouchend" in document && e.options.swipe === !1 || e.options.draggable === !1 && i.type.indexOf("mouse") !== -1)) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, e.options.verticalSwiping === !0 && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
            case "start":
                e.swipeStart(i);
                break;
            case "move":
                e.swipeMove(i);
                break;
            case "end":
                e.swipeEnd(i)
        }
    }, e.prototype.swipeMove = function (i) {
        var e, t, o, s, n, r, l = this;
        return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (l.options.verticalSwiping === !0 && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (l.options.rtl === !1 ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), l.options.verticalSwiping === !0 && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, l.options.infinite === !1 && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), l.options.vertical === !1 ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, l.options.verticalSwiping === !0 && (l.swipeLeft = e + o * s), l.options.fade !== !0 && l.options.touchMove !== !1 && (l.animating === !0 ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft))))
    }, e.prototype.swipeStart = function (i) {
        var e, t = this;
        return t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow ? (t.touchObject = {}, !1) : (void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, void (t.dragging = !0))
    }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
        var i = this;
        null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit())
    }, e.prototype.unload = function () {
        var e = this;
        i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, e.prototype.unslick = function (i) {
        var e = this;
        e.$slider.trigger("unslick", [e, i]), e.destroy()
    }, e.prototype.updateArrows = function () {
        var i, e = this;
        i = Math.floor(e.options.slidesToShow / 2), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && e.options.centerMode === !1 ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && e.options.centerMode === !0 && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, e.prototype.updateDots = function () {
        var i = this;
        null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"));
        if (i.options.customOnChange !== null) {
            i.options.customOnChange.call();
        }
    }, e.prototype.visibility = function () {
        var i = this;
        i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
    }, i.fn.slick = function () {
        var i, t, o = this,
            s = arguments[0],
            n = Array.prototype.slice.call(arguments, 1),
            r = o.length;
        for (i = 0; i < r; i++)
            if ("object" == typeof s || "undefined" == typeof s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), "undefined" != typeof t) return t;
        return o
    }
});/**
 * jQuery.marquee - scrolling text like old marquee element
 * @author Aamir Afridi - aamirafridi(at)gmail(dot)com / http://aamirafridi.com/jquery/jquery-marquee-plugin
 */;
(function ($) {
    $.fn.marquee = function (options) {
        return this.each(function () {
            // Extend the options if any provided
            var o = $.extend({}, $.fn.marquee.defaults, options),
                $this = $(this),
                $marqueeWrapper, containerWidth, animationCss, verticalDir, elWidth,
                loopCount = 3,
                playState = 'animation-play-state',
                css3AnimationIsSupported = false,

                // Private methods
                _prefixedEvent = function (element, type, callback) {
                    var pfx = ["webkit", "moz", "MS", "o", ""];
                    for (var p = 0; p < pfx.length; p++) {
                        if (!pfx[p]) type = type.toLowerCase();
                        element.addEventListener(pfx[p] + type, callback, false);
                    }
                },

                _objToString = function (obj) {
                    var tabjson = [];
                    for (var p in obj) {
                        if (obj.hasOwnProperty(p)) {
                            tabjson.push(p + ':' + obj[p]);
                        }
                    }
                    tabjson.push();
                    return '{' + tabjson.join(',') + '}';
                },

                _startAnimationWithDelay = function () {
                    $this.timer = setTimeout(animate, o.delayBeforeStart);
                },

                // Public methods
                methods = {
                    pause: function () {
                        if (css3AnimationIsSupported && o.allowCss3Support) {
                            $marqueeWrapper.css(playState, 'paused');
                        } else {
                            // pause using pause plugin
                            if ($.fn.pause) {
                                $marqueeWrapper.pause();
                            }
                        }
                        // save the status
                        $this.data('runningStatus', 'paused');
                        // fire event
                        $this.trigger('paused');
                    },

                    resume: function () {
                        // resume using css3
                        if (css3AnimationIsSupported && o.allowCss3Support) {
                            $marqueeWrapper.css(playState, 'running');
                        } else {
                            // resume using pause plugin
                            if ($.fn.resume) {
                                $marqueeWrapper.resume();
                            }
                        }
                        // save the status
                        $this.data('runningStatus', 'resumed');
                        // fire event
                        $this.trigger('resumed');
                    },

                    toggle: function () {
                        methods[$this.data('runningStatus') == 'resumed' ? 'pause' : 'resume']();
                    },

                    destroy: function () {
                        // Clear timer
                        clearTimeout($this.timer);
                        // Unbind all events
                        $this.find("*").addBack().unbind();
                        // Just unwrap the elements that has been added using this plugin
                        $this.html($this.find('.js-marquee:first').html());
                    }
                };

            // Check for methods
            if (typeof options === 'string') {
                if ($.isFunction(methods[options])) {
                    // Following two IF statements to support public methods
                    if (!$marqueeWrapper) {
                        $marqueeWrapper = $this.find('.js-marquee-wrapper');
                    }
                    if ($this.data('css3AnimationIsSupported') === true) {
                        css3AnimationIsSupported = true;
                    }
                    methods[options]();
                }
                return;
            }

            /* Check if element has data attributes. They have top priority
               For details https://twitter.com/aamirafridi/status/403848044069679104 - Can't find a better solution :/
               jQuery 1.3.2 doesn't support $.data().KEY hence writting the following */
            var dataAttributes = {},
            attr;
            $.each(o, function (key, value) {
                // Check if element has this data attribute
                attr = $this.attr('data-' + key);
                if (typeof attr !== 'undefined') {
                    // Now check if value is boolean or not
                    switch (attr) {
                        case 'true':
                            attr = true;
                            break;
                        case 'false':
                            attr = false;
                            break;
                    }
                    o[key] = attr;
                }
            });

            // Reintroduce speed as an option. It calculates duration as a factor of the container width
            // measured in pixels per second.
            if (o.speed) {
                o.duration = parseInt($this.width(), 10) / o.speed * 1000;
            }

            // Shortcut to see if direction is upward or downward
            verticalDir = o.direction == 'up' || o.direction == 'down';

            // no gap if not duplicated
            o.gap = o.duplicated ? parseInt(o.gap) : 0;

            // wrap inner content into a div
            $this.wrapInner('<div class="js-marquee"></div>');

            // Make copy of the element
            var $el = $this.find('.js-marquee').css({
                'margin-right': o.gap,
                'float': 'left'
            });

            if (o.duplicated) {
                $el.clone(true).appendTo($this);
            }

            // wrap both inner elements into one div
            $this.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>');

            // Save the reference of the wrapper
            $marqueeWrapper = $this.find('.js-marquee-wrapper');

            // If direction is up or down, get the height of main element
            if (verticalDir) {
                var containerHeight = $this.height();
                $marqueeWrapper.removeAttr('style');
                $this.height(containerHeight);

                // Change the CSS for js-marquee element
                $this.find('.js-marquee').css({
                    'float': 'none',
                    'margin-bottom': o.gap,
                    'margin-right': 0
                });

                // Remove bottom margin from 2nd element if duplicated
                if (o.duplicated) $this.find('.js-marquee:last').css({
                    'margin-bottom': 0
                });

                var elHeight = $this.find('.js-marquee:first').height() + o.gap;

                // adjust the animation duration according to the text length
                if (o.startVisible && !o.duplicated) {
                    // Compute the complete animation duration and save it for later reference
                    // formula is to: (Height of the text node + height of the main container / Height of the main container) * duration;
                    o._completeDuration = ((parseInt(elHeight, 10) + parseInt(containerHeight, 10)) / parseInt(containerHeight, 10)) * o.duration;

                    // formula is to: (Height of the text node / height of the main container) * duration
                    o.duration = (parseInt(elHeight, 10) / parseInt(containerHeight, 10)) * o.duration;
                } else {
                    // formula is to: (Height of the text node + height of the main container / Height of the main container) * duration;
                    o.duration = ((parseInt(elHeight, 10) + parseInt(containerHeight, 10)) / parseInt(containerHeight, 10)) * o.duration;
                }

            } else {
                // Save the width of the each element so we can use it in animation
                elWidth = $this.find('.js-marquee:first').width() + o.gap;

                // container width
                containerWidth = $this.width();

                // adjust the animation duration according to the text length
                if (o.startVisible && !o.duplicated) {
                    // Compute the complete animation duration and save it for later reference
                    // formula is to: (Width of the text node + width of the main container / Width of the main container) * duration;
                    o._completeDuration = ((parseInt(elWidth, 10) + parseInt(containerWidth, 10)) / parseInt(containerWidth, 10)) * o.duration;

                    // (Width of the text node / width of the main container) * duration
                    o.duration = (parseInt(elWidth, 10) / parseInt(containerWidth, 10)) * o.duration;
                } else {
                    // formula is to: (Width of the text node + width of the main container / Width of the main container) * duration;
                    o.duration = ((parseInt(elWidth, 10) + parseInt(containerWidth, 10)) / parseInt(containerWidth, 10)) * o.duration;
                }
            }

            // if duplicated then reduce the duration
            if (o.duplicated) {
                o.duration = o.duration / 2;
            }

            if (o.allowCss3Support) {
                var
                elm = document.body || document.createElement('div'),
                    animationName = 'marqueeAnimation-' + Math.floor(Math.random() * 10000000),
                    domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
                    animationString = 'animation',
                    animationCss3Str = '',
                    keyframeString = '';

                // Check css3 support
                if (elm.style.animation !== undefined) {
                    keyframeString = '@keyframes ' + animationName + ' ';
                    css3AnimationIsSupported = true;
                }

                if (css3AnimationIsSupported === false) {
                    for (var i = 0; i < domPrefixes.length; i++) {
                        if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
                            var prefix = '-' + domPrefixes[i].toLowerCase() + '-';
                            animationString = prefix + animationString;
                            playState = prefix + playState;
                            keyframeString = '@' + prefix + 'keyframes ' + animationName + ' ';
                            css3AnimationIsSupported = true;
                            break;
                        }
                    }
                }

                if (css3AnimationIsSupported) {
                    animationCss3Str = animationName + ' ' + o.duration / 1000 + 's ' + o.delayBeforeStart / 1000 + 's infinite ' + o.css3easing;
                    $this.data('css3AnimationIsSupported', true);
                }
            }

            var _rePositionVertically = function () {
                $marqueeWrapper.css('transform', 'translateY(' + (o.direction == 'up' ? containerHeight + 'px' : '-' + elHeight + 'px') + ')');
            },
            _rePositionHorizontally = function () {
                $marqueeWrapper.css('transform', 'translateX(' + (o.direction == 'left' ? containerWidth + 'px' : '-' + elWidth + 'px') + ')');
            };

            // if duplicated option is set to true than position the wrapper
            if (o.duplicated) {
                if (verticalDir) {
                    if (o.startVisible) {
                        $marqueeWrapper.css('transform', 'translateY(0)');
                    } else {
                        $marqueeWrapper.css('transform', 'translateY(' + (o.direction == 'up' ? containerHeight + 'px' : '-' + ((elHeight * 2) - o.gap) + 'px') + ')');
                    }
                } else {
                    if (o.startVisible) {
                        $marqueeWrapper.css('transform', 'translateX(0)');
                    } else {
                        $marqueeWrapper.css('transform', 'translateX(' + (o.direction == 'left' ? containerWidth + 'px' : '-' + ((elWidth * 2) - o.gap) + 'px') + ')');
                    }
                }

                // If the text starts out visible we can skip the two initial loops
                if (!o.startVisible) {
                    loopCount = 1;
                }
            } else if (o.startVisible) {
                // We only have two different loops if marquee is duplicated and starts visible
                loopCount = 2;
            } else {
                if (verticalDir) {
                    _rePositionVertically();
                } else {
                    _rePositionHorizontally();
                }
            }

            // Animate recursive method
            var animate = function () {
                if (o.duplicated) {
                    // When duplicated, the first loop will be scroll longer so double the duration
                    if (loopCount === 1) {
                        o._originalDuration = o.duration;
                        if (verticalDir) {
                            o.duration = o.direction == 'up' ? o.duration + (containerHeight / ((elHeight) / o.duration)) : o.duration * 2;
                        } else {
                            o.duration = o.direction == 'left' ? o.duration + (containerWidth / ((elWidth) / o.duration)) : o.duration * 2;
                        }
                        // Adjust the css3 animation as well
                        if (animationCss3Str) {
                            animationCss3Str = animationName + ' ' + o.duration / 1000 + 's ' + o.delayBeforeStart / 1000 + 's ' + o.css3easing;
                        }
                        loopCount++;
                    }
                        // On 2nd loop things back to normal, normal duration for the rest of animations
                    else if (loopCount === 2) {
                        o.duration = o._originalDuration;
                        // Adjust the css3 animation as well
                        if (animationCss3Str) {
                            animationName = animationName + '0';
                            keyframeString = $.trim(keyframeString) + '0 ';
                            animationCss3Str = animationName + ' ' + o.duration / 1000 + 's 0s infinite ' + o.css3easing;
                        }
                        loopCount++;
                    }
                }

                if (verticalDir) {
                    if (o.duplicated) {

                        // Adjust the starting point of animation only when first loops finishes
                        if (loopCount > 2) {
                            $marqueeWrapper.css('transform', 'translateY(' + (o.direction == 'up' ? 0 : '-' + elHeight + 'px') + ')');
                        }

                        animationCss = {
                            'transform': 'translateY(' + (o.direction == 'up' ? '-' + elHeight + 'px' : 0) + ')'
                        };
                    } else if (o.startVisible) {
                        // This loop moves the marquee out of the container
                        if (loopCount === 2) {
                            // Adjust the css3 animation as well
                            if (animationCss3Str) {
                                animationCss3Str = animationName + ' ' + o.duration / 1000 + 's ' + o.delayBeforeStart / 1000 + 's ' + o.css3easing;
                            }
                            animationCss = {
                                'transform': 'translateY(' + (o.direction == 'up' ? '-' + elHeight + 'px' : containerHeight + 'px') + ')'
                            };
                            loopCount++;
                        } else if (loopCount === 3) {
                            // Set the duration for the animation that will run forever
                            o.duration = o._completeDuration;
                            // Adjust the css3 animation as well
                            if (animationCss3Str) {
                                animationName = animationName + '0';
                                keyframeString = $.trim(keyframeString) + '0 ';
                                animationCss3Str = animationName + ' ' + o.duration / 1000 + 's 0s infinite ' + o.css3easing;
                            }
                            _rePositionVertically();
                        }
                    } else {
                        _rePositionVertically();
                        animationCss = {
                            'transform': 'translateY(' + (o.direction == 'up' ? '-' + ($marqueeWrapper.height()) + 'px' : containerHeight + 'px') + ')'
                        };
                    }
                } else {
                    if (o.duplicated) {

                        // Adjust the starting point of animation only when first loops finishes
                        if (loopCount > 2) {
                            $marqueeWrapper.css('transform', 'translateX(' + (o.direction == 'left' ? 0 : '-' + elWidth + 'px') + ')');
                        }

                        animationCss = {
                            'transform': 'translateX(' + (o.direction == 'left' ? '-' + elWidth + 'px' : 0) + ')'
                        };

                    } else if (o.startVisible) {
                        // This loop moves the marquee out of the container
                        if (loopCount === 2) {
                            // Adjust the css3 animation as well
                            if (animationCss3Str) {
                                animationCss3Str = animationName + ' ' + o.duration / 1000 + 's ' + o.delayBeforeStart / 1000 + 's ' + o.css3easing;
                            }
                            animationCss = {
                                'transform': 'translateX(' + (o.direction == 'left' ? '-' + elWidth + 'px' : containerWidth + 'px') + ')'
                            };
                            loopCount++;
                        } else if (loopCount === 3) {
                            // Set the duration for the animation that will run forever
                            o.duration = o._completeDuration;
                            // Adjust the css3 animation as well
                            if (animationCss3Str) {
                                animationName = animationName + '0';
                                keyframeString = $.trim(keyframeString) + '0 ';
                                animationCss3Str = animationName + ' ' + o.duration / 1000 + 's 0s infinite ' + o.css3easing;
                            }
                            _rePositionHorizontally();
                        }
                    } else {
                        _rePositionHorizontally();
                        animationCss = {
                            'transform': 'translateX(' + (o.direction == 'left' ? '-' + elWidth + 'px' : containerWidth + 'px') + ')'
                        };
                    }
                }

                // fire event
                $this.trigger('beforeStarting');

                // If css3 support is available than do it with css3, otherwise use jQuery as fallback
                if (css3AnimationIsSupported) {
                    // Add css3 animation to the element
                    $marqueeWrapper.css(animationString, animationCss3Str);
                    var keyframeCss = keyframeString + ' { 100%  ' + _objToString(animationCss) + '}',
                         $styles = $marqueeWrapper.find('style');

                    // Now add the keyframe animation to the marquee element
                    if ($styles.length !== 0) {
                        // Bug fixed for jQuery 1.3.x - Instead of using .last(), use following
                        $styles.filter(":last").html(keyframeCss);
                    } else {
                        $('head').append('<style>' + keyframeCss + '</style>');
                    }

                    // Animation iteration event
                    _prefixedEvent($marqueeWrapper[0], "AnimationIteration", function () {
                        $this.trigger('finished');
                    });
                    // Animation stopped
                    _prefixedEvent($marqueeWrapper[0], "AnimationEnd", function () {
                        animate();
                        $this.trigger('finished');
                    });

                } else {
                    // Start animating
                    $marqueeWrapper.animate(animationCss, o.duration, o.easing, function () {
                        // fire event
                        $this.trigger('finished');
                        // animate again
                        if (o.pauseOnCycle) {
                            _startAnimationWithDelay();
                        } else {
                            animate();
                        }
                    });
                }
                // save the status
                $this.data('runningStatus', 'resumed');
            };

            // bind pause and resume events
            $this.bind('pause', methods.pause);
            $this.bind('resume', methods.resume);

            if (o.pauseOnHover) {
                $this.bind('mouseenter', methods.pause);
                $this.bind('mouseleave', methods.resume);
            }

            // If css3 animation is supported than call animate method at once
            if (css3AnimationIsSupported && o.allowCss3Support) {
                animate();
            } else {
                // Starts the recursive method
                _startAnimationWithDelay();
            }

        });
    }; // End of Plugin
    // Public: plugin defaults options
    $.fn.marquee.defaults = {
        // If you wish to always animate using jQuery
        allowCss3Support: true,
        // works when allowCss3Support is set to true - for full list see http://www.w3.org/TR/2013/WD-css3-transitions-20131119/#transition-timing-function
        css3easing: 'linear',
        // requires jQuery easing plugin. Default is 'linear'
        easing: 'linear',
        // pause time before the next animation turn in milliseconds
        delayBeforeStart: 1000,
        // 'left', 'right', 'up' or 'down'
        direction: 'left',
        // true or false - should the marquee be duplicated to show an effect of continues flow
        duplicated: false,
        // duration in milliseconds of the marquee in milliseconds
        duration: 5000,
        // gap in pixels between the tickers
        gap: 20,
        // on cycle pause the marquee
        pauseOnCycle: false,
        // on hover pause the marquee - using jQuery plugin https://github.com/tobia/Pause
        pauseOnHover: false,
        // the marquee is visible initially positioned next to the border towards it will be moving
        startVisible: false
    };
})(jQuery);/*!
*  - v1.4.0
* Homepage: http://bqworks.com/slider-pro/
* Author: bqworks
* Author URL: http://bqworks.com/
*/
!function (a, b) { "use strict"; b.SliderPro = { modules: [], addModule: function (a, c) { this.modules.push(a), b.extend(d.prototype, c) } }; var c = b.SliderPro.namespace = "SliderPro", d = function (a, c) { this.instance = a, this.$slider = b(this.instance), this.$slides = null, this.$slidesMask = null, this.$slidesContainer = null, this.slides = [], this.slidesOrder = [], this.options = c, this.settings = {}, this.originalSettings = {}, this.originalGotoSlide = null, this.selectedSlideIndex = 0, this.previousSlideIndex = 0, this.middleSlidePosition = 0, this.supportedAnimation = null, this.vendorPrefix = null, this.transitionEvent = null, this.positionProperty = null, this.sizeProperty = null, this.isIE = null, this.slidesPosition = 0, this.slidesSize = 0, this.averageSlideSize = 0, this.slideWidth = 0, this.slideHeight = 0, this.previousSlideWidth = 0, this.previousSlideHeight = 0, this.previousWindowWidth = 0, this.previousWindowHeight = 0, this.allowResize = !0, this.uniqueId = (new Date).valueOf(), this.breakpoints = [], this.currentBreakpoint = -1, this.shuffledIndexes = [], this._init() }; d.prototype = { _init: function () { var d = this; this.supportedAnimation = f.getSupportedAnimation(), this.vendorPrefix = f.getVendorPrefix(), this.transitionEvent = f.getTransitionEvent(), this.isIE = f.checkIE(), this.$slider.removeClass("sp-no-js"), a.navigator.userAgent.match(/(iPad|iPhone|iPod)/g) && this.$slider.addClass("ios"); var e = /(msie) ([\w.]+)/, g = e.exec(a.navigator.userAgent.toLowerCase()); this.isIE && this.$slider.addClass("ie"), null !== g && this.$slider.addClass("ie" + parseInt(g[2], 10)), this.$slidesContainer = b('<div class="sp-slides-container"></div>').appendTo(this.$slider), this.$slidesMask = b('<div class="sp-mask"></div>').appendTo(this.$slidesContainer), this.$slides = this.$slider.find(".sp-slides").appendTo(this.$slidesMask), this.$slider.find(".sp-slide").appendTo(this.$slides); var h = b.SliderPro.modules; if ("undefined" != typeof h) for (var i = 0; i < h.length; i++) { var j = h[i].substring(0, 1).toLowerCase() + h[i].substring(1) + "Defaults"; "undefined" != typeof this[j] && b.extend(this.defaults, this[j]) } if (this.settings = b.extend({}, this.defaults, this.options), "undefined" != typeof h) for (var k = 0; k < h.length; k++) "undefined" != typeof this["init" + h[k]] && this["init" + h[k]](); if (this.originalSettings = b.extend({}, this.settings), this.originalGotoSlide = this.gotoSlide, null !== this.settings.breakpoints) { for (var l in this.settings.breakpoints) this.breakpoints.push({ size: parseInt(l, 10), properties: this.settings.breakpoints[l] }); this.breakpoints = this.breakpoints.sort(function (a, b) { return a.size >= b.size ? 1 : -1 }) } if (this.selectedSlideIndex = this.settings.startSlide, this.settings.shuffle === !0) { var m = this.$slides.find(".sp-slide"), n = []; m.each(function (a) { d.shuffledIndexes.push(a) }); for (var o = this.shuffledIndexes.length - 1; o > 0; o--) { var p = Math.floor(Math.random() * (o + 1)), q = this.shuffledIndexes[o]; this.shuffledIndexes[o] = this.shuffledIndexes[p], this.shuffledIndexes[p] = q } b.each(this.shuffledIndexes, function (a, b) { n.push(m[b]) }), this.$slides.empty().append(n) } b(a).on("resize." + this.uniqueId + "." + c, function () { var c = b(a).width(), e = b(a).height(); d.allowResize === !1 || d.previousWindowWidth === c && d.previousWindowHeight === e || (d.previousWindowWidth = c, d.previousWindowHeight = e, d.allowResize = !1, setTimeout(function () { d.resize(), d.allowResize = !0 }, 200)) }), this.on("update." + c, function () { d.previousSlideWidth = 0, d.resize() }), this.update(), this.$slides.find(".sp-slide").eq(this.selectedSlideIndex).addClass("sp-selected"), this.trigger({ type: "init" }), b.isFunction(this.settings.init) && this.settings.init.call(this, { type: "init" }) }, update: function () { var a = this; "horizontal" === this.settings.orientation ? (this.$slider.removeClass("sp-vertical").addClass("sp-horizontal"), this.$slider.css({ height: "", "max-height": "" }), this.$slides.find(".sp-slide").css("top", "")) : "vertical" === this.settings.orientation && (this.$slider.removeClass("sp-horizontal").addClass("sp-vertical"), this.$slides.find(".sp-slide").css("left", "")), this.settings.rightToLeft === !0 ? this.$slider.addClass("sp-rtl") : this.$slider.removeClass("sp-rtl"), this.positionProperty = "horizontal" === this.settings.orientation ? "left" : "top", this.sizeProperty = "horizontal" === this.settings.orientation ? "width" : "height", this.gotoSlide = this.originalGotoSlide; for (var d = this.slides.length - 1; d >= 0; d--) if (0 === this.$slider.find('.sp-slide[data-index="' + d + '"]').length) { var e = this.slides[d]; e.off("imagesLoaded." + c), e.destroy(), this.slides.splice(d, 1) } this.slidesOrder.length = 0, this.$slider.find(".sp-slide").each(function (c) { var d = b(this); "undefined" == typeof d.attr("data-init") ? a._createSlide(c, d) : a.slides[c].setIndex(c), a.slidesOrder.push(c) }), this.middleSlidePosition = parseInt((a.slidesOrder.length - 1) / 2, 10), this.settings.loop === !0 && this._updateSlidesOrder(), this.trigger({ type: "update" }), b.isFunction(this.settings.update) && this.settings.update.call(this, { type: "update" }) }, _createSlide: function (a, d) { var f = this, g = new e(b(d), a, this.settings); this.slides.splice(a, 0, g), g.on("imagesLoaded." + c, function (a) { f.settings.autoSlideSize === !0 && (f.$slides.hasClass("sp-animated") === !1 && f._resetSlidesPosition(), f._calculateSlidesSize()), f.settings.autoHeight === !0 && a.index === f.selectedSlideIndex && f._resizeHeightTo(g.getSize().height) }) }, _updateSlidesOrder: function () { var a, c, d = b.inArray(this.selectedSlideIndex, this.slidesOrder) - this.middleSlidePosition; if (0 > d) for (a = this.slidesOrder.splice(d, Math.abs(d)), c = a.length - 1; c >= 0; c--) this.slidesOrder.unshift(a[c]); else if (d > 0) for (a = this.slidesOrder.splice(0, d), c = 0; c <= a.length - 1; c++) this.slidesOrder.push(a[c]) }, _updateSlidesPosition: function () { var a, b, c, d, e, f = parseInt(this.$slides.find(".sp-slide").eq(this.selectedSlideIndex).css(this.positionProperty), 10), g = f; if (this.settings.autoSlideSize === !0) if (this.settings.rightToLeft === !0 && "horizontal" === this.settings.orientation) { for (c = this.middleSlidePosition; c >= 0; c--) a = this.getSlideAt(this.slidesOrder[c]), b = a.$slide, b.css(this.positionProperty, g), g = parseInt(b.css(this.positionProperty), 10) + a.getSize()[this.sizeProperty] + this.settings.slideDistance; for (g = f, c = this.middleSlidePosition + 1; c < this.slidesOrder.length; c++) a = this.getSlideAt(this.slidesOrder[c]), b = a.$slide, b.css(this.positionProperty, g - (a.getSize()[this.sizeProperty] + this.settings.slideDistance)), g = parseInt(b.css(this.positionProperty), 10) } else { for (c = this.middleSlidePosition - 1; c >= 0; c--) a = this.getSlideAt(this.slidesOrder[c]), b = a.$slide, b.css(this.positionProperty, g - (a.getSize()[this.sizeProperty] + this.settings.slideDistance)), g = parseInt(b.css(this.positionProperty), 10); for (g = f, c = this.middleSlidePosition; c < this.slidesOrder.length; c++) a = this.getSlideAt(this.slidesOrder[c]), b = a.$slide, b.css(this.positionProperty, g), g = parseInt(b.css(this.positionProperty), 10) + a.getSize()[this.sizeProperty] + this.settings.slideDistance } else for (d = this.settings.rightToLeft === !0 && "horizontal" === this.settings.orientation ? -1 : 1, e = "horizontal" === this.settings.orientation ? this.slideWidth : this.slideHeight, c = 0; c < this.slidesOrder.length; c++) b = this.$slides.find(".sp-slide").eq(this.slidesOrder[c]), b.css(this.positionProperty, f + d * (c - this.middleSlidePosition) * (e + this.settings.slideDistance)) }, _resetSlidesPosition: function () { var a, b, c, d, e, f, g = 0; if (this.settings.autoSlideSize === !0) { if (this.settings.rightToLeft === !0 && "horizontal" === this.settings.orientation) for (c = 0; c < this.slidesOrder.length; c++) a = this.getSlideAt(this.slidesOrder[c]), b = a.$slide, b.css(this.positionProperty, g - (a.getSize()[this.sizeProperty] + this.settings.slideDistance)), g = parseInt(b.css(this.positionProperty), 10); else for (c = 0; c < this.slidesOrder.length; c++) a = this.getSlideAt(this.slidesOrder[c]), b = a.$slide, b.css(this.positionProperty, g), g = parseInt(b.css(this.positionProperty), 10) + a.getSize()[this.sizeProperty] + this.settings.slideDistance; d = this.getSlideAt(this.selectedSlideIndex).getSize()[this.sizeProperty] } else { for (e = (this.settings.rightToLeft === !0 && "horizontal" === this.settings.orientation) == !0 ? -1 : 1, f = "horizontal" === this.settings.orientation ? this.slideWidth : this.slideHeight, c = 0; c < this.slidesOrder.length; c++) b = this.$slides.find(".sp-slide").eq(this.slidesOrder[c]), b.css(this.positionProperty, e * c * (f + this.settings.slideDistance)); d = f } var h = this.settings.centerSelectedSlide === !0 ? Math.round((parseInt(this.$slidesMask.css(this.sizeProperty), 10) - d) / 2) : 0, i = -parseInt(this.$slides.find(".sp-slide").eq(this.selectedSlideIndex).css(this.positionProperty), 10) + h; this._moveTo(i, !0) }, _calculateSlidesSize: function () { if (this.settings.autoSlideSize === !0) { var a = this.$slides.find(".sp-slide").eq(this.slidesOrder[0]), b = parseInt(a.css(this.positionProperty), 10), c = this.$slides.find(".sp-slide").eq(this.slidesOrder[this.slidesOrder.length - 1]), d = parseInt(c.css(this.positionProperty), 10) + (this.settings.rightToLeft === !0 && "horizontal" === this.settings.orientation ? -1 : 1) * parseInt(c.css(this.sizeProperty), 10); this.slidesSize = Math.abs(d - b), this.averageSlideSize = Math.round(this.slidesSize / this.slides.length) } else this.slidesSize = (("horizontal" === this.settings.orientation ? this.slideWidth : this.slideHeight) + this.settings.slideDistance) * this.slides.length - this.settings.slideDistance, this.averageSlideSize = "horizontal" === this.settings.orientation ? this.slideWidth : this.slideHeight }, resize: function () { var c = this; if (null !== this.settings.breakpoints && this.breakpoints.length > 0) if (b(a).width() > this.breakpoints[this.breakpoints.length - 1].size && -1 !== this.currentBreakpoint) this.currentBreakpoint = -1, this._setProperties(this.originalSettings, !1); else for (var d = 0, e = this.breakpoints.length; e > d; d++) if (b(a).width() <= this.breakpoints[d].size) { if (this.currentBreakpoint !== this.breakpoints[d].size) { var f = { type: "breakpointReach", size: this.breakpoints[d].size, settings: this.breakpoints[d].properties }; this.trigger(f), b.isFunction(this.settings.breakpointReach) && this.settings.breakpointReach.call(this, f), this.currentBreakpoint = this.breakpoints[d].size; var g = b.extend({}, this.originalSettings, this.breakpoints[d].properties); return void this._setProperties(g, !1) } break } this.settings.responsive === !0 ? "fullWidth" !== this.settings.forceSize && "fullWindow" !== this.settings.forceSize || "auto" !== this.settings.visibleSize && ("auto" === this.settings.visibleSize || "vertical" !== this.settings.orientation) ? this.$slider.css({ width: "100%", "max-width": this.settings.width, marginLeft: "" }) : (this.$slider.css("margin", 0), this.$slider.css({ width: b(a).width(), "max-width": "", marginLeft: -this.$slider.offset().left })) : this.$slider.css({ width: this.settings.width }), -1 === this.settings.aspectRatio && (this.settings.aspectRatio = this.settings.width / this.settings.height), this.slideWidth = this.$slider.width(), "fullWindow" === this.settings.forceSize ? this.slideHeight = b(a).height() : this.slideHeight = isNaN(this.settings.aspectRatio) ? this.settings.height : this.slideWidth / this.settings.aspectRatio, (this.previousSlideWidth !== this.slideWidth || this.previousSlideHeight !== this.slideHeight || "auto" !== this.settings.visibleSize || this.$slider.outerWidth() > this.$slider.parent().width() || this.$slider.width() !== this.$slidesMask.width()) && (this.previousSlideWidth = this.slideWidth, this.previousSlideHeight = this.slideHeight, this._resizeSlides(), this.$slidesMask.css({ width: this.slideWidth, height: this.slideHeight }), this.settings.autoHeight === !0 ? setTimeout(function () { c._resizeHeight() }, 1) : this.$slidesMask.css(this.vendorPrefix + "transition", ""), "auto" !== this.settings.visibleSize && ("horizontal" === this.settings.orientation ? ("fullWidth" === this.settings.forceSize || "fullWindow" === this.settings.forceSize ? (this.$slider.css("margin", 0), this.$slider.css({ width: b(a).width(), "max-width": "", marginLeft: -this.$slider.offset().left })) : this.$slider.css({ width: this.settings.visibleSize, "max-width": "100%", marginLeft: 0 }), this.$slidesMask.css("width", this.$slider.width())) : ("fullWindow" === this.settings.forceSize ? this.$slider.css({ height: b(a).height(), "max-height": "" }) : this.$slider.css({ height: this.settings.visibleSize, "max-height": "100%" }), this.$slidesMask.css("height", this.$slider.height()))), this._resetSlidesPosition(), this._calculateSlidesSize(), this.trigger({ type: "sliderResize" }), b.isFunction(this.settings.sliderResize) && this.settings.sliderResize.call(this, { type: "sliderResize" })) }, _resizeSlides: function () { var a = this.slideWidth, c = this.slideHeight; this.settings.autoSlideSize === !0 ? "horizontal" === this.settings.orientation ? a = "auto" : "vertical" === this.settings.orientation && (c = "auto") : this.settings.autoHeight === !0 && (c = "auto"), b.each(this.slides, function (b, d) { d.setSize(a, c) }) }, _resizeHeight: function () { var a = this.getSlideAt(this.selectedSlideIndex); this._resizeHeightTo(a.getSize().height) }, gotoSlide: function (a) { if (a !== this.selectedSlideIndex && "undefined" != typeof this.slides[a]) { var c = this; this.previousSlideIndex = this.selectedSlideIndex, this.selectedSlideIndex = a, this.$slides.find(".sp-selected").removeClass("sp-selected"), this.$slides.find(".sp-slide").eq(this.selectedSlideIndex).addClass("sp-selected"), this.settings.loop === !0 && (this._updateSlidesOrder(), this._updateSlidesPosition()), this.settings.autoHeight === !0 && this._resizeHeight(); var d = this.settings.centerSelectedSlide === !0 ? Math.round((parseInt(this.$slidesMask.css(this.sizeProperty), 10) - this.getSlideAt(this.selectedSlideIndex).getSize()[this.sizeProperty]) / 2) : 0, e = -parseInt(this.$slides.find(".sp-slide").eq(this.selectedSlideIndex).css(this.positionProperty), 10) + d; this._moveTo(e, !1, function () { c._resetSlidesPosition(), c.trigger({ type: "gotoSlideComplete", index: a, previousIndex: c.previousSlideIndex }), b.isFunction(c.settings.gotoSlideComplete) && c.settings.gotoSlideComplete.call(c, { type: "gotoSlideComplete", index: a, previousIndex: c.previousSlideIndex }) }), this.trigger({ type: "gotoSlide", index: a, previousIndex: this.previousSlideIndex }), b.isFunction(this.settings.gotoSlide) && this.settings.gotoSlide.call(this, { type: "gotoSlide", index: a, previousIndex: this.previousSlideIndex }) } }, nextSlide: function () { var a = this.selectedSlideIndex >= this.getTotalSlides() - 1 ? 0 : this.selectedSlideIndex + 1; this.gotoSlide(a) }, previousSlide: function () { var a = this.selectedSlideIndex <= 0 ? this.getTotalSlides() - 1 : this.selectedSlideIndex - 1; this.gotoSlide(a) }, _moveTo: function (a, b, c) { var d = this, e = {}; if (a !== this.slidesPosition) if (this.slidesPosition = a, "css-3d" !== this.supportedAnimation && "css-2d" !== this.supportedAnimation || this.isIE !== !1) e["margin-" + this.positionProperty] = a, "undefined" != typeof b && b === !0 ? this.$slides.css(e) : (this.$slides.addClass("sp-animated"), this.$slides.animate(e, this.settings.slideAnimationDuration, function () { d.$slides.removeClass("sp-animated"), "function" == typeof c && c() })); else { var f, g = "horizontal" === this.settings.orientation ? a : 0, h = "horizontal" === this.settings.orientation ? 0 : a; "css-3d" === this.supportedAnimation ? e[this.vendorPrefix + "transform"] = "translate3d(" + g + "px, " + h + "px, 0)" : e[this.vendorPrefix + "transform"] = "translate(" + g + "px, " + h + "px)", "undefined" != typeof b && b === !0 ? f = "" : (this.$slides.addClass("sp-animated"), f = this.vendorPrefix + "transform " + this.settings.slideAnimationDuration / 1e3 + "s", this.$slides.on(this.transitionEvent, function (a) { a.target === a.currentTarget && (d.$slides.off(d.transitionEvent), d.$slides.removeClass("sp-animated"), "function" == typeof c && c()) })), e[this.vendorPrefix + "transition"] = f, this.$slides.css(e) } }, _stopMovement: function () { var a = {}; if ("css-3d" !== this.supportedAnimation && "css-2d" !== this.supportedAnimation || this.isIE !== !1) this.$slides.stop(), this.slidesPosition = parseInt(this.$slides.css("margin-" + this.positionProperty), 10); else { var b = this.$slides.css(this.vendorPrefix + "transform"), c = -1 !== b.indexOf("matrix3d") ? "matrix3d" : "matrix", d = b.replace(c, "").match(/-?[0-9\.]+/g), e = "matrix3d" === c ? parseInt(d[12], 10) : parseInt(d[4], 10), f = "matrix3d" === c ? parseInt(d[13], 10) : parseInt(d[5], 10); "css-3d" === this.supportedAnimation ? a[this.vendorPrefix + "transform"] = "translate3d(" + e + "px, " + f + "px, 0)" : a[this.vendorPrefix + "transform"] = "translate(" + e + "px, " + f + "px)", a[this.vendorPrefix + "transition"] = "", this.$slides.css(a), this.$slides.off(this.transitionEvent), this.slidesPosition = "horizontal" === this.settings.orientation ? e : f } this.$slides.removeClass("sp-animated") }, _resizeHeightTo: function (a) { var c = this, d = { height: a }; "css-3d" === this.supportedAnimation || "css-2d" === this.supportedAnimation ? (d[this.vendorPrefix + "transition"] = "height " + this.settings.heightAnimationDuration / 1e3 + "s", this.$slidesMask.off(this.transitionEvent), this.$slidesMask.on(this.transitionEvent, function (a) { a.target === a.currentTarget && (c.$slidesMask.off(c.transitionEvent), c.trigger({ type: "resizeHeightComplete" }), b.isFunction(c.settings.resizeHeightComplete) && c.settings.resizeHeightComplete.call(c, { type: "resizeHeightComplete" })) }), this.$slidesMask.css(d)) : this.$slidesMask.stop().animate(d, this.settings.heightAnimationDuration, function (a) { c.trigger({ type: "resizeHeightComplete" }), b.isFunction(c.settings.resizeHeightComplete) && c.settings.resizeHeightComplete.call(c, { type: "resizeHeightComplete" }) }) }, destroy: function () { this.$slider.removeData("sliderPro"), this.$slider.removeAttr("style"), this.$slides.removeAttr("style"), this.off("update." + c), b(a).off("resize." + this.uniqueId + "." + c); var d = b.SliderPro.modules; if ("undefined" != typeof d) for (var e = 0; e < d.length; e++) "undefined" != typeof this["destroy" + d[e]] && this["destroy" + d[e]](); b.each(this.slides, function (a, b) { b.destroy() }), this.slides.length = 0, this.$slides.prependTo(this.$slider), this.$slidesContainer.remove() }, _setProperties: function (a, b) { for (var c in a) this.settings[c] = a[c], b !== !1 && (this.originalSettings[c] = a[c]); this.update() }, on: function (a, b) { return this.$slider.on(a, b) }, off: function (a) { return this.$slider.off(a) }, trigger: function (a) { return this.$slider.triggerHandler(a) }, getSlideAt: function (a) { return this.slides[a] }, getSelectedSlide: function () { return this.selectedSlideIndex }, getTotalSlides: function () { return this.slides.length }, defaults: { width: 500, height: 300, responsive: !0, aspectRatio: -1, imageScaleMode: "cover", centerImage: !0, allowScaleUp: !0, autoHeight: !1, autoSlideSize: !1, startSlide: 0, shuffle: !1, orientation: "horizontal", forceSize: "none", loop: !0, slideDistance: 10, slideAnimationDuration: 700, heightAnimationDuration: 700, visibleSize: "auto", centerSelectedSlide: !0, rightToLeft: !1, breakpoints: null, init: function () { }, update: function () { }, sliderResize: function () { }, gotoSlide: function () { }, gotoSlideComplete: function () { }, resizeHeightComplete: function () { }, breakpointReach: function () { } } }; var e = function (a, b, c) { this.$slide = a, this.$mainImage = null, this.$imageContainer = null, this.hasMainImage = !1, this.isMainImageLoaded = !1, this.isMainImageLoading = !1, this.hasImages = !1, this.areImagesLoaded = !1, this.areImagesLoading = !1, this.width = 0, this.height = 0, this.settings = c, this.setIndex(b), this._init() }; e.prototype = { _init: function () { this.$slide.attr("data-init", !0), this.$mainImage = 0 !== this.$slide.find(".sp-image").length ? this.$slide.find(".sp-image") : null, null !== this.$mainImage && (this.hasMainImage = !0, this.$imageContainer = b('<div class="sp-image-container"></div>').prependTo(this.$slide), 0 !== this.$mainImage.parent("a").length ? this.$mainImage.parent("a").appendTo(this.$imageContainer) : this.$mainImage.appendTo(this.$imageContainer)), this.hasImages = 0 !== this.$slide.find("img").length ? !0 : !1 }, setSize: function (a, b) { this.width = a, this.height = b, this.$slide.css({ width: this.width, height: this.height }), this.hasMainImage === !0 && (this.$imageContainer.css({ width: this.settings.width, height: this.settings.height }), "undefined" == typeof this.$mainImage.attr("data-src") && this.resizeMainImage()) }, getSize: function () { var a, b = this; if (this.hasImages === !0 && this.areImagesLoaded === !1 && this.areImagesLoading === !1) { this.areImagesLoading = !0; var d = f.checkImagesStatus(this.$slide); if ("complete" !== d) return f.checkImagesComplete(this.$slide, function () { b.areImagesLoaded = !0, b.areImagesLoading = !1, b.trigger({ type: "imagesLoaded." + c, index: b.index }) }), { width: this.settings.width, height: this.settings.height } } return a = this.calculateSize(), { width: a.width, height: a.height } }, calculateSize: function () { var a = this.$slide.width(), c = this.$slide.height(); return this.$slide.children().each(function (d, e) { var f = b(e); if (f.is(":hidden") !== !0) { var g = e.getBoundingClientRect(), h = f.position().top + (g.bottom - g.top), i = f.position().left + (g.right - g.left); h > c && (c = h), i > a && (a = i) } }), { width: a, height: c } }, resizeMainImage: function (a) { var b = this; return a === !0 && (this.isMainImageLoaded = !1, this.isMainImageLoading = !1), this.isMainImageLoaded === !1 && this.isMainImageLoading === !1 ? (this.isMainImageLoading = !0, void f.checkImagesComplete(this.$mainImage, function () { b.isMainImageLoaded = !0, b.isMainImageLoading = !1, b.resizeMainImage(), b.trigger({ type: "imagesLoaded." + c, index: b.index }) })) : (this.$imageContainer.css({ width: this.width, height: this.height }), this.settings.allowScaleUp === !1 && (this.$mainImage.css({ width: "", height: "", maxWidth: "", maxHeight: "" }), this.$mainImage.css({ maxWidth: this.$mainImage.width(), maxHeight: this.$mainImage.height() })), void (this.settings.autoSlideSize === !0 ? "horizontal" === this.settings.orientation ? (this.$mainImage.css({ width: "auto", height: "100%" }), this.$slide.css("width", this.$mainImage.width())) : "vertical" === this.settings.orientation && (this.$mainImage.css({ width: "100%", height: "auto" }), this.$slide.css("height", this.$mainImage.height())) : this.settings.autoHeight === !0 ? this.$mainImage.css({ width: "100%", height: "auto" }) : ("cover" === this.settings.imageScaleMode ? this.$mainImage.width() / this.$mainImage.height() <= this.width / this.height ? this.$mainImage.css({ width: "100%", height: "auto" }) : this.$mainImage.css({ width: "auto", height: "100%" }) : "contain" === this.settings.imageScaleMode ? this.$mainImage.width() / this.$mainImage.height() >= this.width / this.height ? this.$mainImage.css({ width: "100%", height: "auto" }) : this.$mainImage.css({ width: "auto", height: "100%" }) : "exact" === this.settings.imageScaleMode && this.$mainImage.css({ width: "100%", height: "100%" }), this.settings.centerImage === !0 && this.$mainImage.css({ marginLeft: .5 * (this.$imageContainer.width() - this.$mainImage.width()), marginTop: .5 * (this.$imageContainer.height() - this.$mainImage.height()) })))) }, destroy: function () { this.$slide.removeAttr("style"), this.$slide.removeAttr("data-init"), this.$slide.removeAttr("data-index"), this.$slide.removeAttr("data-loaded"), this.hasMainImage === !0 && (this.$slide.find(".sp-image").removeAttr("style").appendTo(this.$slide), this.$slide.find(".sp-image-container").remove()) }, getIndex: function () { return this.index }, setIndex: function (a) { this.index = a, this.$slide.attr("data-index", this.index) }, on: function (a, b) { return this.$slide.on(a, b) }, off: function (a) { return this.$slide.off(a) }, trigger: function (a) { return this.$slide.triggerHandler(a) } }, a.SliderPro = d, a.SliderProSlide = e, b.fn.sliderPro = function (a) { var c = Array.prototype.slice.call(arguments, 1); return this.each(function () { if ("undefined" == typeof b(this).data("sliderPro")) { var e = new d(this, a); b(this).data("sliderPro", e) } else if ("undefined" != typeof a) { var f = b(this).data("sliderPro"); if ("function" == typeof f[a]) f[a].apply(f, c); else if ("undefined" != typeof f.settings[a]) { var g = {}; g[a] = c[0], f._setProperties(g) } else "object" == typeof a ? f._setProperties(a) : b.error(a + " does not exist in sliderPro.") } }) }; var f = { supportedAnimation: null, vendorPrefix: null, transitionEvent: null, isIE: null, getSupportedAnimation: function () { if (null !== this.supportedAnimation) return this.supportedAnimation; var a = document.body || document.documentElement, b = a.style, c = "undefined" != typeof b.transition || "undefined" != typeof b.WebkitTransition || "undefined" != typeof b.MozTransition || "undefined" != typeof b.OTransition; if (c === !0) { var d = document.createElement("div"); if (("undefined" != typeof d.style.WebkitPerspective || "undefined" != typeof d.style.perspective) && (this.supportedAnimation = "css-3d"), "css-3d" === this.supportedAnimation && "undefined" != typeof d.styleWebkitPerspective) { var e = document.createElement("style"); e.textContent = "@media (transform-3d),(-webkit-transform-3d){#test-3d{left:9px;position:absolute;height:5px;margin:0;padding:0;border:0;}}", document.getElementsByTagName("head")[0].appendChild(e), d.id = "test-3d", document.body.appendChild(d), (9 !== d.offsetLeft || 5 !== d.offsetHeight) && (this.supportedAnimation = null), e.parentNode.removeChild(e), d.parentNode.removeChild(d) } null !== this.supportedAnimation || "undefined" == typeof d.style["-webkit-transform"] && "undefined" == typeof d.style.transform || (this.supportedAnimation = "css-2d") } else this.supportedAnimation = "javascript"; return this.supportedAnimation }, getVendorPrefix: function () { if (null !== this.vendorPrefix) return this.vendorPrefix; var a = document.createElement("div"), b = ["Webkit", "Moz", "ms", "O"]; if ("transform" in a.style) return this.vendorPrefix = "", this.vendorPrefix; for (var c = 0; c < b.length; c++) if (b[c] + "Transform" in a.style) { this.vendorPrefix = "-" + b[c].toLowerCase() + "-"; break } return this.vendorPrefix }, getTransitionEvent: function () { if (null !== this.transitionEvent) return this.transitionEvent; var a = document.createElement("div"), b = { transition: "transitionend", WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd" }; for (var c in b) if (c in a.style) { this.transitionEvent = b[c]; break } return this.transitionEvent }, checkImagesComplete: function (a, b) { var c = this, d = this.checkImagesStatus(a); if ("loading" === d) var e = setInterval(function () { d = c.checkImagesStatus(a), "complete" === d && (clearInterval(e), "function" == typeof b && b()) }, 100); else "function" == typeof b && b(); return d }, checkImagesStatus: function (a) { var c = "complete"; return a.is("img") && a[0].complete === !1 ? c = "loading" : a.find("img").each(function (a) { var d = b(this)[0]; d.complete === !1 && (c = "loading") }), c }, checkIE: function () { if (null !== this.isIE) return this.isIE; var b = a.navigator.userAgent; b.indexOf("MSIE"); return -1 !== b.indexOf("MSIE") || b.match(/Trident.*rv\:11\./) ? this.isIE = !0 : this.isIE = !1, this.isIE } }; a.SliderProUtils = f }(window, jQuery), function (a, b) {
    "use strict"; var c = "Thumbnails." + b.SliderPro.namespace, d = {
        $thumbnails: null, $thumbnailsContainer: null, thumbnails: null, selectedThumbnailIndex: 0, thumbnailsSize: 0, thumbnailsContainerSize: 0, thumbnailsPosition: 0, thumbnailsOrientation: null, thumbnailsPositionProperty: null, isThumbnailScroller: !1, initThumbnails: function () { var a = this; this.thumbnails = [], this.on("update." + c, b.proxy(this._thumbnailsOnUpdate, this)), this.on("sliderResize." + c, b.proxy(this._thumbnailsOnResize, this)), this.on("gotoSlide." + c, function (b) { a._gotoThumbnail(b.index) }) }, _thumbnailsOnUpdate: function () { var a = this; if (0 === this.$slider.find(".sp-thumbnail").length && 0 === this.thumbnails.length) return void (this.isThumbnailScroller = !1); if (this.isThumbnailScroller = !0, null === this.$thumbnailsContainer && (this.$thumbnailsContainer = b('<div class="sp-thumbnails-container"></div>').insertAfter(this.$slidesContainer)), null === this.$thumbnails) if (0 !== this.$slider.find(".sp-thumbnails").length) { if (this.$thumbnails = this.$slider.find(".sp-thumbnails").appendTo(this.$thumbnailsContainer), this.settings.shuffle === !0) { var c = this.$thumbnails.find(".sp-thumbnail"), d = []; b.each(this.shuffledIndexes, function (a, e) { var f = b(c[e]); 0 !== f.parent("a").length && (f = f.parent("a")), d.push(f) }), this.$thumbnails.empty().append(d) } } else this.$thumbnails = b('<div class="sp-thumbnails"></div>').appendTo(this.$thumbnailsContainer); this.$slides.find(".sp-thumbnail").each(function (c) { var d = b(this), e = d.parents(".sp-slide").index(), f = a.$thumbnails.find(".sp-thumbnail").length - 1; 0 !== d.parent("a").length && (d = d.parent("a")), e > f ? d.appendTo(a.$thumbnails) : d.insertBefore(a.$thumbnails.find(".sp-thumbnail").eq(e)) }); for (var e = this.thumbnails.length - 1; e >= 0; e--) if (0 === this.$thumbnails.find('.sp-thumbnail[data-index="' + e + '"]').length) { var f = this.thumbnails[e]; f.destroy(), this.thumbnails.splice(e, 1) } this.$thumbnails.find(".sp-thumbnail").each(function (c) { var d = b(this); "undefined" == typeof d.attr("data-init") ? a._createThumbnail(d, c) : a.thumbnails[c].setIndex(c) }), this.$thumbnailsContainer.removeClass("sp-top-thumbnails sp-bottom-thumbnails sp-left-thumbnails sp-right-thumbnails"), "top" === this.settings.thumbnailsPosition ? (this.$thumbnailsContainer.addClass("sp-top-thumbnails"), this.thumbnailsOrientation = "horizontal") : "bottom" === this.settings.thumbnailsPosition ? (this.$thumbnailsContainer.addClass("sp-bottom-thumbnails"), this.thumbnailsOrientation = "horizontal") : "left" === this.settings.thumbnailsPosition ? (this.$thumbnailsContainer.addClass("sp-left-thumbnails"), this.thumbnailsOrientation = "vertical") : "right" === this.settings.thumbnailsPosition && (this.$thumbnailsContainer.addClass("sp-right-thumbnails"), this.thumbnailsOrientation = "vertical"), this.settings.thumbnailPointer === !0 ? this.$thumbnailsContainer.addClass("sp-has-pointer") : this.$thumbnailsContainer.removeClass("sp-has-pointer"), this.selectedThumbnailIndex = this.selectedSlideIndex, this.$thumbnails.find(".sp-thumbnail-container").eq(this.selectedThumbnailIndex).addClass("sp-selected-thumbnail"), this.thumbnailsSize = 0, b.each(this.thumbnails, function (b, c) { c.setSize(a.settings.thumbnailWidth, a.settings.thumbnailHeight), a.thumbnailsSize += "horizontal" === a.thumbnailsOrientation ? c.getSize().width : c.getSize().height }), "horizontal" === this.thumbnailsOrientation ? (this.$thumbnails.css({ width: this.thumbnailsSize, height: this.settings.thumbnailHeight }), this.$thumbnailsContainer.css("height", ""), this.thumbnailsPositionProperty = "left") : (this.$thumbnails.css({ width: this.settings.thumbnailWidth, height: this.thumbnailsSize }), this.$thumbnailsContainer.css("width", ""), this.thumbnailsPositionProperty = "top"), this.trigger({ type: "thumbnailsUpdate" }), b.isFunction(this.settings.thumbnailsUpdate) && this.settings.thumbnailsUpdate.call(this, { type: "thumbnailsUpdate" }) }, _createThumbnail: function (a, b) { var d = this, f = new e(a, this.$thumbnails, b); f.on("thumbnailClick." + c, function (a) { d.gotoSlide(a.index) }), this.thumbnails.splice(b, 0, f) }, _thumbnailsOnResize: function () { if (this.isThumbnailScroller !== !1) { var c; "horizontal" === this.thumbnailsOrientation ? (this.thumbnailsContainerSize = Math.min(this.$slidesMask.width(), this.thumbnailsSize), this.$thumbnailsContainer.css("width", this.thumbnailsContainerSize), "fullWindow" === this.settings.forceSize && (this.$slidesMask.css("height", this.$slidesMask.height() - this.$thumbnailsContainer.outerHeight(!0)), this.slideHeight = this.$slidesMask.height(), this._resizeSlides(), this._resetSlidesPosition())) : "vertical" === this.thumbnailsOrientation && (this.$slidesMask.width() + this.$thumbnailsContainer.outerWidth(!0) > this.$slider.parent().width() && ("fullWidth" === this.settings.forceSize || "fullWindow" === this.settings.forceSize ? this.$slider.css("max-width", b(a).width() - this.$thumbnailsContainer.outerWidth(!0)) : this.$slider.css("max-width", this.$slider.parent().width() - this.$thumbnailsContainer.outerWidth(!0)), this.$slidesMask.css("width", this.$slider.width()), "vertical" === this.settings.orientation && (this.slideWidth = this.$slider.width(), this._resizeSlides()), this._resetSlidesPosition()), this.thumbnailsContainerSize = Math.min(this.$slidesMask.height(), this.thumbnailsSize), this.$thumbnailsContainer.css("height", this.thumbnailsContainerSize)), c = this.thumbnailsSize <= this.thumbnailsContainerSize || 0 === this.$thumbnails.find(".sp-selected-thumbnail").length ? 0 : Math.max(-this.thumbnails[this.selectedThumbnailIndex].getPosition()[this.thumbnailsPositionProperty], this.thumbnailsContainerSize - this.thumbnailsSize), "top" === this.settings.thumbnailsPosition ? this.$slider.css({ paddingTop: this.$thumbnailsContainer.outerHeight(!0), paddingLeft: "", paddingRight: "" }) : "bottom" === this.settings.thumbnailsPosition ? this.$slider.css({ paddingTop: "", paddingLeft: "", paddingRight: "" }) : "left" === this.settings.thumbnailsPosition ? this.$slider.css({ paddingTop: "", paddingLeft: this.$thumbnailsContainer.outerWidth(!0), paddingRight: "" }) : "right" === this.settings.thumbnailsPosition && this.$slider.css({ paddingTop: "", paddingLeft: "", paddingRight: this.$thumbnailsContainer.outerWidth(!0) }), this._moveThumbnailsTo(c, !0) } }, _gotoThumbnail: function (a) {
            if (this.isThumbnailScroller !== !1 && "undefined" != typeof this.thumbnails[a]) {
                var c = this.selectedThumbnailIndex, d = this.thumbnailsPosition; if (this.selectedThumbnailIndex = a, this.$thumbnails.find(".sp-selected-thumbnail").removeClass("sp-selected-thumbnail"), this.$thumbnails.find(".sp-thumbnail-container").eq(this.selectedThumbnailIndex).addClass("sp-selected-thumbnail"), this.settings.rightToLeft === !0 && "horizontal" === this.thumbnailsOrientation) {
                    if (this.selectedThumbnailIndex >= c) {
                        var e = this.selectedThumbnailIndex === this.thumbnails.length - 1 ? this.selectedThumbnailIndex : this.selectedThumbnailIndex + 1, f = this.thumbnails[e];
                        f.getPosition().left < -this.thumbnailsPosition && (d = -f.getPosition().left)
                    } else if (this.selectedThumbnailIndex < c) { var g = 0 === this.selectedThumbnailIndex ? this.selectedThumbnailIndex : this.selectedThumbnailIndex - 1, h = this.thumbnails[g], i = -this.thumbnailsPosition + this.thumbnailsContainerSize; h.getPosition().right > i && (d = this.thumbnailsPosition - (h.getPosition().right - i)) }
                } else if (this.selectedThumbnailIndex >= c) { var j = this.selectedThumbnailIndex === this.thumbnails.length - 1 ? this.selectedThumbnailIndex : this.selectedThumbnailIndex + 1, k = this.thumbnails[j], l = "horizontal" === this.thumbnailsOrientation ? k.getPosition().right : k.getPosition().bottom, m = -this.thumbnailsPosition + this.thumbnailsContainerSize; l > m && (d = this.thumbnailsPosition - (l - m)) } else if (this.selectedThumbnailIndex < c) { var n = 0 === this.selectedThumbnailIndex ? this.selectedThumbnailIndex : this.selectedThumbnailIndex - 1, o = this.thumbnails[n], p = "horizontal" === this.thumbnailsOrientation ? o.getPosition().left : o.getPosition().top; p < -this.thumbnailsPosition && (d = -p) } this._moveThumbnailsTo(d), this.trigger({ type: "gotoThumbnail" }), b.isFunction(this.settings.gotoThumbnail) && this.settings.gotoThumbnail.call(this, { type: "gotoThumbnail" })
            }
        }, _moveThumbnailsTo: function (a, c, d) { var e = this, f = {}; if (a !== this.thumbnailsPosition) if (this.thumbnailsPosition = a, "css-3d" === this.supportedAnimation || "css-2d" === this.supportedAnimation) { var g, h = "horizontal" === this.thumbnailsOrientation ? a : 0, i = "horizontal" === this.thumbnailsOrientation ? 0 : a; "css-3d" === this.supportedAnimation ? f[this.vendorPrefix + "transform"] = "translate3d(" + h + "px, " + i + "px, 0)" : f[this.vendorPrefix + "transform"] = "translate(" + h + "px, " + i + "px)", "undefined" != typeof c && c === !0 ? g = "" : (this.$thumbnails.addClass("sp-animated"), g = this.vendorPrefix + "transform 0.7s", this.$thumbnails.on(this.transitionEvent, function (a) { a.target === a.currentTarget && (e.$thumbnails.off(e.transitionEvent), e.$thumbnails.removeClass("sp-animated"), "function" == typeof d && d(), e.trigger({ type: "thumbnailsMoveComplete" }), b.isFunction(e.settings.thumbnailsMoveComplete) && e.settings.thumbnailsMoveComplete.call(e, { type: "thumbnailsMoveComplete" })) })), f[this.vendorPrefix + "transition"] = g, this.$thumbnails.css(f) } else f["margin-" + this.thumbnailsPositionProperty] = a, "undefined" != typeof c && c === !0 ? this.$thumbnails.css(f) : this.$thumbnails.addClass("sp-animated").animate(f, 700, function () { e.$thumbnails.removeClass("sp-animated"), "function" == typeof d && d(), e.trigger({ type: "thumbnailsMoveComplete" }), b.isFunction(e.settings.thumbnailsMoveComplete) && e.settings.thumbnailsMoveComplete.call(e, { type: "thumbnailsMoveComplete" }) }) }, _stopThumbnailsMovement: function () { var a = {}; if ("css-3d" === this.supportedAnimation || "css-2d" === this.supportedAnimation) { var b = this.$thumbnails.css(this.vendorPrefix + "transform"), c = -1 !== b.indexOf("matrix3d") ? "matrix3d" : "matrix", d = b.replace(c, "").match(/-?[0-9\.]+/g), e = "matrix3d" === c ? parseInt(d[12], 10) : parseInt(d[4], 10), f = "matrix3d" === c ? parseInt(d[13], 10) : parseInt(d[5], 10); "css-3d" === this.supportedAnimation ? a[this.vendorPrefix + "transform"] = "translate3d(" + e + "px, " + f + "px, 0)" : a[this.vendorPrefix + "transform"] = "translate(" + e + "px, " + f + "px)", a[this.vendorPrefix + "transition"] = "", this.$thumbnails.css(a), this.$thumbnails.off(this.transitionEvent), this.thumbnailsPosition = "horizontal" === this.thumbnailsOrientation ? parseInt(d[4], 10) : parseInt(d[5], 10) } else this.$thumbnails.stop(), this.thumbnailsPosition = parseInt(this.$thumbnails.css("margin-" + this.thumbnailsPositionProperty), 10); this.$thumbnails.removeClass("sp-animated") }, destroyThumbnails: function () { var d = this; this.off("update." + c), this.isThumbnailScroller !== !1 && (this.off("sliderResize." + c), this.off("gotoSlide." + c), b(a).off("resize." + this.uniqueId + "." + c), this.$thumbnails.find(".sp-thumbnail").each(function () { var a = b(this), e = parseInt(a.attr("data-index"), 10), f = d.thumbnails[e]; f.off("thumbnailClick." + c), f.destroy() }), this.thumbnails.length = 0, this.$thumbnails.appendTo(this.$slider), this.$thumbnailsContainer.remove(), this.$slider.css({ paddingTop: "", paddingLeft: "", paddingRight: "" })) }, thumbnailsDefaults: { thumbnailWidth: 100, thumbnailHeight: 80, thumbnailsPosition: "bottom", thumbnailPointer: !1, thumbnailsUpdate: function () { }, gotoThumbnail: function () { }, thumbnailsMoveComplete: function () { } }
    }, e = function (a, b, c) { this.$thumbnail = a, this.$thumbnails = b, this.$thumbnailContainer = null, this.width = 0, this.height = 0, this.isImageLoaded = !1, this.setIndex(c), this._init() }; e.prototype = { _init: function () { var a = this; this.$thumbnail.attr("data-init", !0), this.$thumbnailContainer = b('<div class="sp-thumbnail-container"></div>').appendTo(this.$thumbnails), 0 !== this.$thumbnail.parent("a").length ? this.$thumbnail.parent("a").appendTo(this.$thumbnailContainer) : this.$thumbnail.appendTo(this.$thumbnailContainer), this.$thumbnailContainer.on("click." + c, function () { a.trigger({ type: "thumbnailClick." + c, index: a.index }) }) }, setSize: function (a, b) { this.width = a, this.height = b, this.$thumbnailContainer.css({ width: this.width, height: this.height }), this.$thumbnail.is("img") && "undefined" == typeof this.$thumbnail.attr("data-src") && this.resizeImage() }, getSize: function () { return { width: this.$thumbnailContainer.outerWidth(!0), height: this.$thumbnailContainer.outerHeight(!0) } }, getPosition: function () { return { left: this.$thumbnailContainer.position().left + parseInt(this.$thumbnailContainer.css("marginLeft"), 10), right: this.$thumbnailContainer.position().left + parseInt(this.$thumbnailContainer.css("marginLeft"), 10) + this.$thumbnailContainer.outerWidth(), top: this.$thumbnailContainer.position().top + parseInt(this.$thumbnailContainer.css("marginTop"), 10), bottom: this.$thumbnailContainer.position().top + parseInt(this.$thumbnailContainer.css("marginTop"), 10) + this.$thumbnailContainer.outerHeight() } }, setIndex: function (a) { this.index = a, this.$thumbnail.attr("data-index", this.index) }, resizeImage: function () { var a = this; if (this.isImageLoaded === !1) return void SliderProUtils.checkImagesComplete(this.$thumbnailContainer, function () { a.isImageLoaded = !0, a.resizeImage() }); this.$thumbnail = this.$thumbnailContainer.find(".sp-thumbnail"); var b = this.$thumbnail.width(), c = this.$thumbnail.height(); b / c <= this.width / this.height ? this.$thumbnail.css({ width: "100%", height: "auto" }) : this.$thumbnail.css({ width: "auto", height: "100%" }), this.$thumbnail.css({ marginLeft: .5 * (this.$thumbnailContainer.width() - this.$thumbnail.width()), marginTop: .5 * (this.$thumbnailContainer.height() - this.$thumbnail.height()) }) }, destroy: function () { this.$thumbnailContainer.off("click." + c), this.$thumbnail.removeAttr("data-init"), this.$thumbnail.removeAttr("data-index"), 0 !== this.$thumbnail.parent("a").length ? this.$thumbnail.parent("a").insertBefore(this.$thumbnailContainer) : this.$thumbnail.insertBefore(this.$thumbnailContainer), this.$thumbnailContainer.remove() }, on: function (a, b) { return this.$thumbnailContainer.on(a, b) }, off: function (a) { return this.$thumbnailContainer.off(a) }, trigger: function (a) { return this.$thumbnailContainer.triggerHandler(a) } }, b.SliderPro.addModule("Thumbnails", d)
}(window, jQuery), function (a, b) { "use strict"; var c = "ConditionalImages." + b.SliderPro.namespace, d = { previousImageSize: null, currentImageSize: null, isRetinaScreen: !1, initConditionalImages: function () { this.currentImageSize = this.previousImageSize = "default", this.isRetinaScreen = "undefined" != typeof this._isRetina && this._isRetina() === !0, this.on("update." + c, b.proxy(this._conditionalImagesOnUpdate, this)), this.on("sliderResize." + c, b.proxy(this._conditionalImagesOnResize, this)) }, _conditionalImagesOnUpdate: function () { b.each(this.slides, function (a, c) { var d = c.$slide; d.find("img:not([ data-default ])").each(function () { var a = b(this); "undefined" != typeof a.attr("data-src") ? a.attr("data-default", a.attr("data-src")) : a.attr("data-default", a.attr("src")) }) }) }, _conditionalImagesOnResize: function () { if (this.slideWidth <= this.settings.smallSize ? this.currentImageSize = "small" : this.slideWidth <= this.settings.mediumSize ? this.currentImageSize = "medium" : this.slideWidth <= this.settings.largeSize ? this.currentImageSize = "large" : this.currentImageSize = "default", this.previousImageSize !== this.currentImageSize) { var a = this; b.each(this.slides, function (c, d) { var e = d.$slide; e.find("img").each(function () { var c = b(this), e = ""; a.isRetinaScreen === !0 && "undefined" != typeof c.attr("data-retina" + a.currentImageSize) ? (e = c.attr("data-retina" + a.currentImageSize), "undefined" != typeof c.attr("data-retina") && c.attr("data-retina") !== e && c.attr("data-retina", e)) : (a.isRetinaScreen === !1 || a.isRetinaScreen === !0 && "undefined" == typeof c.attr("data-retina")) && "undefined" != typeof c.attr("data-" + a.currentImageSize) && (e = c.attr("data-" + a.currentImageSize), "undefined" != typeof c.attr("data-src") && c.attr("data-src") !== e && c.attr("data-src", e)), "" !== e && "undefined" == typeof c.attr("data-src") && c.attr("src") !== e && a._loadConditionalImage(c, e, function (a) { a.hasClass("sp-image") && (d.$mainImage = a, d.resizeMainImage(!0)) }) }) }), this.previousImageSize = this.currentImageSize } }, _loadConditionalImage: function (a, c, d) { var e = b(new Image); e.attr("class", a.attr("class")), e.attr("style", a.attr("style")), b.each(a.data(), function (a, b) { e.attr("data-" + a, b) }), "undefined" != typeof a.attr("width") && e.attr("width", a.attr("width")), "undefined" != typeof a.attr("height") && e.attr("height", a.attr("height")), "undefined" != typeof a.attr("alt") && e.attr("alt", a.attr("alt")), "undefined" != typeof a.attr("title") && e.attr("title", a.attr("title")), e.attr("src", c), e.insertAfter(a), a.remove(), a = null, "function" == typeof d && d(e) }, destroyConditionalImages: function () { this.off("update." + c), this.off("sliderResize." + c) }, conditionalImagesDefaults: { smallSize: 480, mediumSize: 768, largeSize: 1024 } }; b.SliderPro.addModule("ConditionalImages", d) }(window, jQuery), function (a, b) { "use strict"; var c = "Retina." + b.SliderPro.namespace, d = { initRetina: function () { this._isRetina() !== !1 && (this.on("sliderResize." + c, b.proxy(this._checkRetinaImages, this)), 0 !== this.$slider.find(".sp-thumbnail").length && this.on("update.Thumbnails." + c, b.proxy(this._checkRetinaThumbnailImages, this))) }, _isRetina: function () { return a.devicePixelRatio >= 2 ? !0 : a.matchMedia && a.matchMedia("(-webkit-min-device-pixel-ratio: 2),(min-resolution: 2dppx)").matches ? !0 : !1 }, _checkRetinaImages: function () { var a = this; b.each(this.slides, function (c, d) { var e = d.$slide; "undefined" == typeof e.attr("data-retina-loaded") && (e.attr("data-retina-loaded", !0), e.find("img[data-retina]").each(function () { var c = b(this); "undefined" != typeof c.attr("data-src") ? c.attr("data-src", c.attr("data-retina")) : a._loadRetinaImage(c, function (a) { a.hasClass("sp-image") && (d.$mainImage = a, d.resizeMainImage(!0)) }) })) }) }, _checkRetinaThumbnailImages: function () { var a = this; b.each(this.thumbnails, function (c, d) { var e = d.$thumbnailContainer; "undefined" == typeof e.attr("data-retina-loaded") && (e.attr("data-retina-loaded", !0), e.find("img[data-retina]").each(function () { var c = b(this); "undefined" != typeof c.attr("data-src") ? c.attr("data-src", c.attr("data-retina")) : a._loadRetinaImage(c, function (a) { a.hasClass("sp-thumbnail") && d.resizeImage() }) })) }) }, _loadRetinaImage: function (a, c) { var d = !1, e = ""; if ("undefined" != typeof a.attr("data-retina") && (d = !0, e = a.attr("data-retina")), "undefined" != typeof a.attr("data-src") && (d === !1 && (e = a.attr("data-src")), a.removeAttr("data-src")), "" !== e) { var f = b(new Image); f.attr("class", a.attr("class")), f.attr("style", a.attr("style")), b.each(a.data(), function (a, b) { f.attr("data-" + a, b) }), "undefined" != typeof a.attr("width") && f.attr("width", a.attr("width")), "undefined" != typeof a.attr("height") && f.attr("height", a.attr("height")), "undefined" != typeof a.attr("alt") && f.attr("alt", a.attr("alt")), "undefined" != typeof a.attr("title") && f.attr("title", a.attr("title")), f.insertAfter(a), a.remove(), a = null, f.attr("src", e), "function" == typeof c && c(f) } }, destroyRetina: function () { this.off("update." + c), this.off("update.Thumbnails." + c) } }; b.SliderPro.addModule("Retina", d) }(window, jQuery), function (a, b) { "use strict"; var c = "LazyLoading." + b.SliderPro.namespace, d = { allowLazyLoadingCheck: !0, initLazyLoading: function () { this.on("sliderResize." + c, b.proxy(this._lazyLoadingOnResize, this)), this.on("gotoSlide." + c, b.proxy(this._checkAndLoadVisibleImages, this)), this.on("thumbnailsUpdate." + c + " thumbnailsMoveComplete." + c, b.proxy(this._checkAndLoadVisibleThumbnailImages, this)) }, _lazyLoadingOnResize: function () { var a = this; this.allowLazyLoadingCheck !== !1 && (this.allowLazyLoadingCheck = !1, this._checkAndLoadVisibleImages(), 0 !== this.$slider.find(".sp-thumbnail").length && this._checkAndLoadVisibleThumbnailImages(), setTimeout(function () { a.allowLazyLoadingCheck = !0 }, 500)) }, _checkAndLoadVisibleImages: function () { if (0 !== this.$slider.find(".sp-slide:not([ data-loaded ])").length) { var a = this, c = this.settings.loop === !0 ? this.middleSlidePosition : this.selectedSlideIndex, d = Math.ceil((parseInt(this.$slidesMask.css(this.sizeProperty), 10) - this.averageSlideSize) / 2 / this.averageSlideSize), e = this.settings.centerSelectedSlide === !0 ? Math.max(c - d - 1, 0) : Math.max(c - 1, 0), f = this.settings.centerSelectedSlide === !0 ? Math.min(c + d + 1, this.getTotalSlides() - 1) : Math.min(c + 2 * d + 1, this.getTotalSlides() - 1), g = this.slidesOrder.slice(e, f + 1); b.each(g, function (c, d) { var e = a.slides[d], f = e.$slide; "undefined" == typeof f.attr("data-loaded") && (f.attr("data-loaded", !0), f.find("img[ data-src ]").each(function () { var c = b(this); a._loadImage(c, function (a) { a.hasClass("sp-image") && (e.$mainImage = a, e.resizeMainImage(!0)) }) })) }) } }, _checkAndLoadVisibleThumbnailImages: function () { if (0 !== this.$slider.find(".sp-thumbnail-container:not([ data-loaded ])").length) { var a = this, c = this.thumbnailsSize / this.thumbnails.length, d = Math.floor(Math.abs(this.thumbnailsPosition / c)), e = Math.floor((-this.thumbnailsPosition + this.thumbnailsContainerSize) / c), f = this.thumbnails.slice(d, e + 1); b.each(f, function (c, d) { var e = d.$thumbnailContainer; "undefined" == typeof e.attr("data-loaded") && (e.attr("data-loaded", !0), e.find("img[ data-src ]").each(function () { var c = b(this); a._loadImage(c, function () { d.resizeImage() }) })) }) } }, _loadImage: function (a, c) { var d = b(new Image); d.attr("class", a.attr("class")), d.attr("style", a.attr("style")), b.each(a.data(), function (a, b) { d.attr("data-" + a, b) }), "undefined" != typeof a.attr("width") && d.attr("width", a.attr("width")), "undefined" != typeof a.attr("height") && d.attr("height", a.attr("height")), "undefined" != typeof a.attr("alt") && d.attr("alt", a.attr("alt")), "undefined" != typeof a.attr("title") && d.attr("title", a.attr("title")), d.attr("src", a.attr("data-src")), d.removeAttr("data-src"), d.insertAfter(a), a.remove(), a = null, "function" == typeof c && c(d) }, destroyLazyLoading: function () { this.off("update." + c), this.off("gotoSlide." + c), this.off("sliderResize." + c), this.off("thumbnailsUpdate." + c), this.off("thumbnailsMoveComplete." + c) } }; b.SliderPro.addModule("LazyLoading", d) }(window, jQuery), function (a, b) { "use strict"; var c = "Layers." + b.SliderPro.namespace, d = { layersGotoSlideReference: null, waitForLayersTimer: null, initLayers: function () { this.on("update." + c, b.proxy(this._layersOnUpdate, this)), this.on("sliderResize." + c, b.proxy(this._layersOnResize, this)), this.on("gotoSlide." + c, b.proxy(this._layersOnGotoSlide, this)) }, _layersOnUpdate: function (a) { var c = this; b.each(this.slides, function (a, c) { c.$slide; this.$slide.find(".sp-layer:not([ data-layer-init ])").each(function () { var a = new f(b(this)); "undefined" == typeof c.layers && (c.layers = []), c.layers.push(a), b(this).hasClass("sp-static") === !1 && ("undefined" == typeof c.animatedLayers && (c.animatedLayers = []), c.animatedLayers.push(a)) }) }), this.settings.waitForLayers === !0 && (clearTimeout(this.waitForLayersTimer), this.waitForLayersTimer = setTimeout(function () { c.layersGotoSlideReference = c.gotoSlide, c.gotoSlide = c._layersGotoSlide }, 1)), setTimeout(function () { c.showLayers(c.selectedSlideIndex) }, 1) }, _layersOnResize: function () { var a, c, d = this, e = this.settings.autoScaleLayers; this.settings.autoScaleLayers !== !1 && (-1 === this.settings.autoScaleReference ? "string" == typeof this.settings.width && -1 !== this.settings.width.indexOf("%") ? e = !1 : a = parseInt(this.settings.width, 10) : a = this.settings.autoScaleReference, c = e === !0 && this.slideWidth < a ? d.slideWidth / a : 1, b.each(this.slides, function (a, d) { "undefined" != typeof d.layers && b.each(d.layers, function (a, b) { b.scale(c) }) })) }, _layersGotoSlide: function (a) { var b = this, d = this.slides[this.selectedSlideIndex].animatedLayers; this.$slider.hasClass("sp-swiping") || "undefined" == typeof d || 0 === d.length ? this.layersGotoSlideReference(a) : (this.on("hideLayersComplete." + c, function () { b.off("hideLayersComplete." + c), b.layersGotoSlideReference(a) }), this.hideLayers(this.selectedSlideIndex)) }, _layersOnGotoSlide: function (a) { this.previousSlideIndex !== this.selectedSlideIndex && this.hideLayers(this.previousSlideIndex), this.showLayers(this.selectedSlideIndex) }, showLayers: function (a) { var c = this, d = this.slides[a].animatedLayers, e = 0; "undefined" != typeof d && b.each(d, function (a, f) { f.isVisible() === !0 ? (e++, e === d.length && (c.trigger({ type: "showLayersComplete", index: a }), b.isFunction(c.settings.showLayersComplete) && c.settings.showLayersComplete.call(c, { type: "showLayersComplete", index: a }))) : f.show(function () { e++, e === d.length && (c.trigger({ type: "showLayersComplete", index: a }), b.isFunction(c.settings.showLayersComplete) && c.settings.showLayersComplete.call(c, { type: "showLayersComplete", index: a })) }) }) }, hideLayers: function (a) { var c = this, d = this.slides[a].animatedLayers, e = 0; "undefined" != typeof d && b.each(d, function (a, f) { f.isVisible() === !1 ? (e++, e === d.length && (c.trigger({ type: "hideLayersComplete", index: a }), b.isFunction(c.settings.hideLayersComplete) && c.settings.hideLayersComplete.call(c, { type: "hideLayersComplete", index: a }))) : f.hide(function () { e++, e === d.length && (c.trigger({ type: "hideLayersComplete", index: a }), b.isFunction(c.settings.hideLayersComplete) && c.settings.hideLayersComplete.call(c, { type: "hideLayersComplete", index: a })) }) }) }, destroyLayers: function () { this.off("update." + c), this.off("sliderResize." + c), this.off("gotoSlide." + c), this.off("hideLayersComplete." + c) }, layersDefaults: { waitForLayers: !1, autoScaleLayers: !0, autoScaleReference: -1, showLayersComplete: function () { }, hideLayersComplete: function () { } } }, e = a.SliderProSlide.prototype.destroy; a.SliderProSlide.prototype.destroy = function () { "undefined" != typeof this.layers && (b.each(this.layers, function (a, b) { b.destroy() }), this.layers.length = 0), "undefined" != typeof this.animatedLayers && (this.animatedLayers.length = 0), e.apply(this) }; var f = function (a) { this.$layer = a, this.visible = !1, this.styled = !1, this.data = null, this.position = null, this.horizontalProperty = null, this.verticalProperty = null, this.horizontalPosition = null, this.verticalPosition = null, this.scaleRatio = 1, this.supportedAnimation = SliderProUtils.getSupportedAnimation(), this.vendorPrefix = SliderProUtils.getVendorPrefix(), this.transitionEvent = SliderProUtils.getTransitionEvent(), this.delayTimer = null, this.stayTimer = null, this._init() }; f.prototype = { _init: function () { this.$layer.attr("data-layer-init", !0), this.$layer.hasClass("sp-static") ? this._setStyle() : this.$layer.css({ visibility: "hidden" }) }, _setStyle: function () { this.styled = !0, this.data = this.$layer.data(), "undefined" != typeof this.data.width && this.$layer.css("width", this.data.width), "undefined" != typeof this.data.height && this.$layer.css("height", this.data.height), "undefined" != typeof this.data.depth && this.$layer.css("z-index", this.data.depth), this.position = this.data.position ? this.data.position.toLowerCase() : "topleft", -1 !== this.position.indexOf("right") ? this.horizontalProperty = "right" : -1 !== this.position.indexOf("left") ? this.horizontalProperty = "left" : this.horizontalProperty = "center", -1 !== this.position.indexOf("bottom") ? this.verticalProperty = "bottom" : -1 !== this.position.indexOf("top") ? this.verticalProperty = "top" : this.verticalProperty = "center", this._setPosition(), this.scale(this.scaleRatio) }, _setPosition: function () { var a = this.$layer.attr("style"); this.horizontalPosition = "undefined" != typeof this.data.horizontal ? this.data.horizontal : 0, this.verticalPosition = "undefined" != typeof this.data.vertical ? this.data.vertical : 0, "center" === this.horizontalProperty ? (this.$layer.is("img") === !1 && ("undefined" == typeof a || "undefined" != typeof a && -1 === a.indexOf("width")) && (this.$layer.css("white-space", "nowrap"), this.$layer.css("width", this.$layer.outerWidth(!0))), this.$layer.css({ marginLeft: "auto", marginRight: "auto", left: this.horizontalPosition, right: 0 })) : this.$layer.css(this.horizontalProperty, this.horizontalPosition), "center" === this.verticalProperty ? (this.$layer.is("img") === !1 && ("undefined" == typeof a || "undefined" != typeof a && -1 === a.indexOf("height")) && (this.$layer.css("white-space", "nowrap"), this.$layer.css("height", this.$layer.outerHeight(!0))), this.$layer.css({ marginTop: "auto", marginBottom: "auto", top: this.verticalPosition, bottom: 0 })) : this.$layer.css(this.verticalProperty, this.verticalPosition) }, scale: function (a) { if (!this.$layer.hasClass("sp-no-scale") && (this.scaleRatio = a, this.styled !== !1)) { var b = "center" === this.horizontalProperty ? "left" : this.horizontalProperty, c = "center" === this.verticalProperty ? "top" : this.verticalProperty, d = {}; d[this.vendorPrefix + "transform-origin"] = this.horizontalProperty + " " + this.verticalProperty, d[this.vendorPrefix + "transform"] = "scale(" + this.scaleRatio + ")", "string" != typeof this.horizontalPosition && (d[b] = this.horizontalPosition * this.scaleRatio), "string" != typeof this.verticalPosition && (d[c] = this.verticalPosition * this.scaleRatio), "string" == typeof this.data.width && -1 !== this.data.width.indexOf("%") && (d.width = (parseInt(this.data.width, 10) / this.scaleRatio).toString() + "%"), "string" == typeof this.data.height && -1 !== this.data.height.indexOf("%") && (d.height = (parseInt(this.data.height, 10) / this.scaleRatio).toString() + "%"), this.$layer.css(d) } }, show: function (a) { if (this.visible !== !0) { this.visible = !0, this.styled === !1 && this._setStyle(); var b = this, c = "undefined" != typeof this.data.showOffset ? this.data.showOffset : 50, d = "undefined" != typeof this.data.showDuration ? this.data.showDuration / 1e3 : .4, e = "undefined" != typeof this.data.showDelay ? this.data.showDelay : 10, f = "undefined" != typeof b.data.stayDuration ? parseInt(b.data.stayDuration, 10) : -1; if ("javascript" === this.supportedAnimation) this.$layer.stop().delay(e).css({ opacity: 0, visibility: "visible" }).animate({ opacity: 1 }, 1e3 * d, function () { -1 !== f && (b.stayTimer = setTimeout(function () { b.hide(), b.stayTimer = null }, f)), "undefined" != typeof a && a() }); else { var g = { opacity: 0, visibility: "visible" }, h = { opacity: 1 }, i = ""; g[this.vendorPrefix + "transform"] = "scale(" + this.scaleRatio + ")", h[this.vendorPrefix + "transform"] = "scale(" + this.scaleRatio + ")", h[this.vendorPrefix + "transition"] = "opacity " + d + "s", "undefined" != typeof this.data.showTransition && ("left" === this.data.showTransition ? i = c + "px, 0" : "right" === this.data.showTransition ? i = "-" + c + "px, 0" : "up" === this.data.showTransition ? i = "0, " + c + "px" : "down" === this.data.showTransition && (i = "0, -" + c + "px"), g[this.vendorPrefix + "transform"] += "css-3d" === this.supportedAnimation ? " translate3d(" + i + ", 0)" : " translate(" + i + ")", h[this.vendorPrefix + "transform"] += "css-3d" === this.supportedAnimation ? " translate3d(0, 0, 0)" : " translate(0, 0)", h[this.vendorPrefix + "transition"] += ", " + this.vendorPrefix + "transform " + d + "s"), this.$layer.on(this.transitionEvent, function (c) { c.target === c.currentTarget && (b.$layer.off(b.transitionEvent).css(b.vendorPrefix + "transition", ""), -1 !== f && (b.stayTimer = setTimeout(function () { b.hide(), b.stayTimer = null }, f)), "undefined" != typeof a && a()) }), this.$layer.css(g), this.delayTimer = setTimeout(function () { b.$layer.css(h) }, e) } } }, hide: function (a) { if (this.visible !== !1) { var c = this, d = "undefined" != typeof this.data.hideOffset ? this.data.hideOffset : 50, e = "undefined" != typeof this.data.hideDuration ? this.data.hideDuration / 1e3 : .4, f = "undefined" != typeof this.data.hideDelay ? this.data.hideDelay : 10; if (this.visible = !1, null !== this.stayTimer && clearTimeout(this.stayTimer), "javascript" === this.supportedAnimation) this.$layer.stop().delay(f).animate({ opacity: 0 }, 1e3 * e, function () { b(this).css("visibility", "hidden"), "undefined" != typeof a && a() }); else { var g = "", h = { opacity: 0 }; h[this.vendorPrefix + "transform"] = "scale(" + this.scaleRatio + ")", h[this.vendorPrefix + "transition"] = "opacity " + e + "s", "undefined" != typeof this.data.hideTransition && ("left" === this.data.hideTransition ? g = "-" + d + "px, 0" : "right" === this.data.hideTransition ? g = d + "px, 0" : "up" === this.data.hideTransition ? g = "0, -" + d + "px" : "down" === this.data.hideTransition && (g = "0, " + d + "px"), h[this.vendorPrefix + "transform"] += "css-3d" === this.supportedAnimation ? " translate3d(" + g + ", 0)" : " translate(" + g + ")", h[this.vendorPrefix + "transition"] += ", " + this.vendorPrefix + "transform " + e + "s"), this.$layer.on(this.transitionEvent, function (b) { b.target === b.currentTarget && (c.$layer.off(c.transitionEvent).css(c.vendorPrefix + "transition", ""), c.visible === !1 && c.$layer.css("visibility", "hidden"), "undefined" != typeof a && a()) }), this.delayTimer = setTimeout(function () { c.$layer.css(h) }, f) } } }, isVisible: function () { return this.visible === !1 || this.$layer.is(":hidden") ? !1 : !0 }, destroy: function () { this.$layer.removeAttr("style"), this.$layer.removeAttr("data-layer-init"), clearTimeout(this.delayTimer), clearTimeout(this.stayTimer), this.delayTimer = null, this.stayTimer = null } }, b.SliderPro.addModule("Layers", d) }(window, jQuery), function (a, b) { "use strict"; var c = "Fade." + b.SliderPro.namespace, d = { fadeGotoSlideReference: null, initFade: function () { this.on("update." + c, b.proxy(this._fadeOnUpdate, this)) }, _fadeOnUpdate: function () { this.settings.fade === !0 && (this.fadeGotoSlideReference = this.gotoSlide, this.gotoSlide = this._fadeGotoSlide) }, _fadeGotoSlide: function (a) { if (a !== this.selectedSlideIndex) if (this.$slider.hasClass("sp-swiping")) this.fadeGotoSlideReference(a); else { var c, d, e = this, f = a; b.each(this.slides, function (a, b) { var g = b.getIndex(), h = b.$slide; g === f ? (h.css({ opacity: 0, left: 0, top: 0, "z-index": 20, visibility: "visible" }), c = h) : g === e.selectedSlideIndex ? (h.css({ opacity: 1, left: 0, top: 0, "z-index": 10, visibility: "visible" }), d = h) : h.css({ opacity: 1, visibility: "hidden", "z-index": "" }) }), this.previousSlideIndex = this.selectedSlideIndex, this.selectedSlideIndex = a, this.$slides.find(".sp-selected").removeClass("sp-selected"), this.$slides.find(".sp-slide").eq(this.selectedSlideIndex).addClass("sp-selected"), e.settings.loop === !0 && e._updateSlidesOrder(), this._moveTo(0, !0), this._fadeSlideTo(c, 1, function () { var c = !0; b.each(e.slides, function (a, b) { "undefined" != typeof b.$slide.attr("data-transitioning") && (c = !1) }), c === !0 && (b.each(e.slides, function (a, b) { var c = b.$slide; c.css({ visibility: "", opacity: "", "z-index": "" }) }), e._resetSlidesPosition()), e.trigger({ type: "gotoSlideComplete", index: a, previousIndex: e.previousSlideIndex }), b.isFunction(e.settings.gotoSlideComplete) && e.settings.gotoSlideComplete.call(e, { type: "gotoSlideComplete", index: a, previousIndex: e.previousSlideIndex }) }), this.settings.fadeOutPreviousSlide === !0 && this._fadeSlideTo(d, 0), this.settings.autoHeight === !0 && this._resizeHeight(), this.trigger({ type: "gotoSlide", index: a, previousIndex: this.previousSlideIndex }), b.isFunction(this.settings.gotoSlide) && this.settings.gotoSlide.call(this, { type: "gotoSlide", index: a, previousIndex: this.previousSlideIndex }) } }, _fadeSlideTo: function (a, b, c) { var d = this; 1 === b && a.attr("data-transitioning", !0), "css-3d" === this.supportedAnimation || "css-2d" === this.supportedAnimation ? (setTimeout(function () { var c = { opacity: b }; c[d.vendorPrefix + "transition"] = "opacity " + d.settings.fadeDuration / 1e3 + "s", a.css(c) }, 100), a.on(this.transitionEvent, function (b) { b.target === b.currentTarget && (a.off(d.transitionEvent), a.css(d.vendorPrefix + "transition", ""), a.removeAttr("data-transitioning"), "function" == typeof c && c()) })) : a.stop().animate({ opacity: b }, this.settings.fadeDuration, function () { a.removeAttr("data-transitioning"), "function" == typeof c && c() }) }, destroyFade: function () { this.off("update." + c), null !== this.fadeGotoSlideReference && (this.gotoSlide = this.fadeGotoSlideReference) }, fadeDefaults: { fade: !1, fadeOutPreviousSlide: !0, fadeDuration: 500 } }; b.SliderPro.addModule("Fade", d) }(window, jQuery), function (a, b) { "use strict"; var c = "TouchSwipe." + b.SliderPro.namespace, d = { touchStartPoint: { x: 0, y: 0 }, touchEndPoint: { x: 0, y: 0 }, touchDistance: { x: 0, y: 0 }, touchStartPosition: 0, isTouchMoving: !1, touchSwipeEvents: { startEvent: "", moveEvent: "", endEvent: "" }, allowOppositeScrolling: !0, initTouchSwipe: function () { var a = this; this.settings.touchSwipe !== !1 && (this.touchSwipeEvents.startEvent = "touchstart." + c + " mousedown." + c, this.touchSwipeEvents.moveEvent = "touchmove." + c + " mousemove." + c, this.touchSwipeEvents.endEvent = "touchend." + this.uniqueId + "." + c + " mouseup." + this.uniqueId + "." + c, this.$slidesMask.on(this.touchSwipeEvents.startEvent, b.proxy(this._onTouchStart, this)), this.$slidesMask.on("dragstart." + c, function (a) { a.preventDefault() }), this.$slidesMask.find("a").on("click." + c, function (b) { "undefined" == typeof b.originalEvent.touches && a.$slider.hasClass("sp-swiping") && b.preventDefault() }), this.$slidesMask.addClass("sp-grab")) }, _onTouchStart: function (a) { if (!(b(a.target).closest(".sp-selectable").length >= 1)) { var c = "undefined" != typeof a.originalEvent.touches ? a.originalEvent.touches[0] : a.originalEvent; this.touchStartPoint.x = c.pageX || c.clientX, this.touchStartPoint.y = c.pageY || c.clientY, this.touchStartPosition = this.slidesPosition, this.touchDistance.x = this.touchDistance.y = 0, this.$slides.hasClass("sp-animated") && (this.isTouchMoving = !0, this._stopMovement(), this.touchStartPosition = this.slidesPosition), b(document).on(this.touchSwipeEvents.moveEvent, b.proxy(this._onTouchMove, this)), b(document).on(this.touchSwipeEvents.endEvent, b.proxy(this._onTouchEnd, this)), this.$slidesMask.removeClass("sp-grab").addClass("sp-grabbing"), this.$slider.addClass("sp-swiping") } }, _onTouchMove: function (a) { var b = "undefined" != typeof a.originalEvent.touches ? a.originalEvent.touches[0] : a.originalEvent; this.isTouchMoving = !0, this.touchEndPoint.x = b.pageX || b.clientX, this.touchEndPoint.y = b.pageY || b.clientY, this.touchDistance.x = this.touchEndPoint.x - this.touchStartPoint.x, this.touchDistance.y = this.touchEndPoint.y - this.touchStartPoint.y; var c = "horizontal" === this.settings.orientation ? this.touchDistance.x : this.touchDistance.y, d = "horizontal" === this.settings.orientation ? this.touchDistance.y : this.touchDistance.x; Math.abs(c) > Math.abs(d) && (this.allowOppositeScrolling = !1), this.allowOppositeScrolling !== !0 && (a.preventDefault(), this.settings.loop === !1 && (this.slidesPosition > this.touchStartPosition && 0 === this.selectedSlideIndex || this.slidesPosition < this.touchStartPosition && this.selectedSlideIndex === this.getTotalSlides() - 1) && (c = .2 * c), this._moveTo(this.touchStartPosition + c, !0)) }, _onTouchEnd: function (a) { var c = this, d = "horizontal" === this.settings.orientation ? this.touchDistance.x : this.touchDistance.y; if (b(document).off(this.touchSwipeEvents.moveEvent), b(document).off(this.touchSwipeEvents.endEvent), this.allowOppositeScrolling = !0, this.$slidesMask.removeClass("sp-grabbing").addClass("sp-grab"), (this.isTouchMoving === !1 || this.isTouchMoving === !0 && Math.abs(this.touchDistance.x) < 10 && Math.abs(this.touchDistance.y) < 10) && this.$slider.removeClass("sp-swiping"), setTimeout(function () { c.$slider.removeClass("sp-swiping") }, 1), this.isTouchMoving !== !1) { this.isTouchMoving = !1; var e = this.settings.centerSelectedSlide === !0 ? Math.round((parseInt(this.$slidesMask.css(this.sizeProperty), 10) - this.getSlideAt(this.selectedSlideIndex).getSize()[this.sizeProperty]) / 2) : 0, f = -parseInt(this.$slides.find(".sp-slide").eq(this.selectedSlideIndex).css(this.positionProperty), 10) + e; if (Math.abs(d) < this.settings.touchSwipeThreshold) this._moveTo(f); else { var g = (this.settings.rightToLeft === !0 && "horizontal" === this.settings.orientation ? -1 : 1) * d / (this.averageSlideSize + this.settings.slideDistance); g = parseInt(g, 10) + (g > 0 ? 1 : -1); var h = this.slidesOrder[b.inArray(this.selectedSlideIndex, this.slidesOrder) - g]; this.settings.loop === !0 ? this.gotoSlide(h) : "undefined" != typeof h ? this.gotoSlide(h) : this._moveTo(f) } } }, destroyTouchSwipe: function () { this.$slidesMask.off("dragstart." + c), this.$slidesMask.find("a").off("click." + c), this.$slidesMask.off(this.touchSwipeEvents.startEvent), b(document).off(this.touchSwipeEvents.moveEvent), b(document).off(this.touchSwipeEvents.endEvent), this.$slidesMask.removeClass("sp-grab") }, touchSwipeDefaults: { touchSwipe: !0, touchSwipeThreshold: 50 } }; b.SliderPro.addModule("TouchSwipe", d) }(window, jQuery), function (a, b) {
    "use strict"; var c = "Caption." + b.SliderPro.namespace, d = {
        $captionContainer: null, captionContent: "", initCaption: function () { this.on("update." + c, b.proxy(this._captionOnUpdate, this)), this.on("gotoSlide." + c, b.proxy(this._updateCaptionContent, this)) }, _captionOnUpdate: function () {
            this.$captionContainer = this.$slider.find(".sp-caption-container"),
            this.$slider.find(".sp-caption").length && 0 === this.$captionContainer.length && (this.$captionContainer = b('<div class="sp-caption-container"></div>').appendTo(this.$slider), this._updateCaptionContent()), this.$slides.find(".sp-caption").each(function () { b(this).css("display", "none") })
        }, _updateCaptionContent: function () { var a = this, b = this.$slider.find(".sp-slide").eq(this.selectedSlideIndex).find(".sp-caption"), c = 0 !== b.length ? b.html() : ""; this.settings.fadeCaption === !0 ? "" !== this.captionContent ? (0 === parseFloat(this.$captionContainer.css("opacity"), 10) && (this.$captionContainer.css(this.vendorPrefix + "transition", ""), this.$captionContainer.css("opacity", 1)), this._fadeCaptionTo(0, function () { a.captionContent = c, "" !== c ? (a.$captionContainer.html(a.captionContent), a._fadeCaptionTo(1)) : a.$captionContainer.empty() })) : (this.captionContent = c, this.$captionContainer.html(this.captionContent), this.$captionContainer.css("opacity", 0), this._fadeCaptionTo(1)) : (this.captionContent = c, this.$captionContainer.html(this.captionContent)) }, _fadeCaptionTo: function (a, b) { var c = this; "css-3d" === this.supportedAnimation || "css-2d" === this.supportedAnimation ? (setTimeout(function () { var b = { opacity: a }; b[c.vendorPrefix + "transition"] = "opacity " + c.settings.captionFadeDuration / 1e3 + "s", c.$captionContainer.css(b) }, 1), this.$captionContainer.on(this.transitionEvent, function (a) { a.target === a.currentTarget && (c.$captionContainer.off(c.transitionEvent), c.$captionContainer.css(c.vendorPrefix + "transition", ""), "function" == typeof b && b()) })) : this.$captionContainer.stop().animate({ opacity: a }, this.settings.captionFadeDuration, function () { "function" == typeof b && b() }) }, destroyCaption: function () { this.off("update." + c), this.off("gotoSlide." + c), this.$captionContainer.remove(), this.$slider.find(".sp-caption").each(function () { b(this).css("display", "") }) }, captionDefaults: { fadeCaption: !0, captionFadeDuration: 500 }
    }; b.SliderPro.addModule("Caption", d)
}(window, jQuery), function (a, b) { "use strict"; var c = "DeepLinking." + b.SliderPro.namespace, d = { initDeepLinking: function () { var d = this; this.on("init." + c, function () { d._gotoHash(a.location.hash) }), this.on("gotoSlide." + c, function (b) { if (d.settings.updateHash === !0) { var c = d.$slider.find(".sp-slide").eq(b.index).attr("id"); "undefined" == typeof c && (c = b.index), a.location.hash = d.$slider.attr("id") + "/" + c } }), b(a).on("hashchange." + this.uniqueId + "." + c, function () { d._gotoHash(a.location.hash) }) }, _parseHash: function (a) { if ("" !== a) { a = a.substring(1); var b = a.split("/"), c = b.pop(), d = a.slice(0, -c.toString().length - 1); if (this.$slider.attr("id") === d) return { sliderID: d, slideId: c } } return !1 }, _gotoHash: function (a) { var b = this._parseHash(a); if (b !== !1) { var c = b.slideId, d = parseInt(c, 10); if (isNaN(d)) { var e = this.$slider.find(".sp-slide#" + c).index(); -1 !== e && e !== this.selectedSlideIndex && this.gotoSlide(e) } else d !== this.selectedSlideIndex && this.gotoSlide(d) } }, destroyDeepLinking: function () { this.off("init." + c), this.off("gotoSlide." + c), b(a).off("hashchange." + this.uniqueId + "." + c) }, deepLinkingDefaults: { updateHash: !1 } }; b.SliderPro.addModule("DeepLinking", d) }(window, jQuery), function (a, b) { "use strict"; var c = "Autoplay." + b.SliderPro.namespace, d = { autoplayTimer: null, isTimerRunning: !1, isTimerPaused: !1, initAutoplay: function () { this.on("update." + c, b.proxy(this._autoplayOnUpdate, this)) }, _autoplayOnUpdate: function (a) { this.settings.autoplay === !0 ? (this.on("gotoSlide." + c, b.proxy(this._autoplayOnGotoSlide, this)), this.on("mouseenter." + c, b.proxy(this._autoplayOnMouseEnter, this)), this.on("mouseleave." + c, b.proxy(this._autoplayOnMouseLeave, this)), this.startAutoplay()) : (this.off("gotoSlide." + c), this.off("mouseenter." + c), this.off("mouseleave." + c), this.stopAutoplay()) }, _autoplayOnGotoSlide: function (a) { this.isTimerRunning === !0 && this.stopAutoplay(), this.isTimerPaused === !1 && this.startAutoplay() }, _autoplayOnMouseEnter: function (a) { !this.isTimerRunning || "pause" !== this.settings.autoplayOnHover && "stop" !== this.settings.autoplayOnHover || (this.stopAutoplay(), this.isTimerPaused = !0) }, _autoplayOnMouseLeave: function (a) { this.settings.autoplay === !0 && this.isTimerRunning === !1 && "stop" !== this.settings.autoplayOnHover && (this.startAutoplay(), this.isTimerPaused = !1) }, startAutoplay: function () { var a = this; this.isTimerRunning = !0, this.autoplayTimer = setTimeout(function () { "normal" === a.settings.autoplayDirection ? a.nextSlide() : "backwards" === a.settings.autoplayDirection && a.previousSlide() }, this.settings.autoplayDelay) }, stopAutoplay: function () { this.isTimerRunning = !1, this.isTimerPaused = !1, clearTimeout(this.autoplayTimer) }, destroyAutoplay: function () { clearTimeout(this.autoplayTimer), this.off("update." + c), this.off("gotoSlide." + c), this.off("mouseenter." + c), this.off("mouseleave." + c) }, autoplayDefaults: { autoplay: !0, autoplayDelay: 5e3, autoplayDirection: "normal", autoplayOnHover: "pause" } }; b.SliderPro.addModule("Autoplay", d) }(window, jQuery), function (a, b) { "use strict"; var c = "Keyboard." + b.SliderPro.namespace, d = { initKeyboard: function () { var a = this, d = !1; this.settings.keyboard !== !1 && (this.$slider.on("focus." + c, function () { d = !0 }), this.$slider.on("blur." + c, function () { d = !1 }), b(document).on("keydown." + this.uniqueId + "." + c, function (b) { if (a.settings.keyboardOnlyOnFocus !== !0 || d !== !1) if (37 === b.which) a.previousSlide(); else if (39 === b.which) a.nextSlide(); else if (13 === b.which) { var c = a.$slider.find(".sp-slide").eq(a.selectedSlideIndex).find(".sp-image-container a"); 0 !== c.length && c[0].click() } })) }, destroyKeyboard: function () { this.$slider.off("focus." + c), this.$slider.off("blur." + c), b(document).off("keydown." + this.uniqueId + "." + c) }, keyboardDefaults: { keyboard: !0, keyboardOnlyOnFocus: !1 } }; b.SliderPro.addModule("Keyboard", d) }(window, jQuery), function (a, b) { "use strict"; var c = "FullScreen." + b.SliderPro.namespace, d = { isFullScreen: !1, $fullScreenButton: null, sizeBeforeFullScreen: {}, initFullScreen: function () { (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) && this.on("update." + c, b.proxy(this._fullScreenOnUpdate, this)) }, _fullScreenOnUpdate: function () { this.settings.fullScreen === !0 && null === this.$fullScreenButton ? this._addFullScreen() : this.settings.fullScreen === !1 && null !== this.$fullScreenButton && this._removeFullScreen(), this.settings.fullScreen === !0 && (this.settings.fadeFullScreen === !0 ? this.$fullScreenButton.addClass("sp-fade-full-screen") : this.settings.fadeFullScreen === !1 && this.$fullScreenButton.removeClass("sp-fade-full-screen")) }, _addFullScreen: function () { this.$fullScreenButton = b('<div class="sp-full-screen-button"></div>').appendTo(this.$slider), this.$fullScreenButton.on("click." + c, b.proxy(this._onFullScreenButtonClick, this)), document.addEventListener("fullscreenchange", b.proxy(this._onFullScreenChange, this)), document.addEventListener("mozfullscreenchange", b.proxy(this._onFullScreenChange, this)), document.addEventListener("webkitfullscreenchange", b.proxy(this._onFullScreenChange, this)), document.addEventListener("MSFullscreenChange", b.proxy(this._onFullScreenChange, this)) }, _removeFullScreen: function () { null !== this.$fullScreenButton && (this.$fullScreenButton.off("click." + c), this.$fullScreenButton.remove(), this.$fullScreenButton = null, document.removeEventListener("fullscreenchange", this._onFullScreenChange), document.removeEventListener("mozfullscreenchange", this._onFullScreenChange), document.removeEventListener("webkitfullscreenchange", this._onFullScreenChange), document.removeEventListener("MSFullscreenChange", this._onFullScreenChange)) }, _onFullScreenButtonClick: function () { this.isFullScreen === !1 ? this.instance.requestFullScreen ? this.instance.requestFullScreen() : this.instance.mozRequestFullScreen ? this.instance.mozRequestFullScreen() : this.instance.webkitRequestFullScreen ? this.instance.webkitRequestFullScreen() : this.instance.msRequestFullscreen && this.instance.msRequestFullscreen() : document.exitFullScreen ? document.exitFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen() }, _onFullScreenChange: function () { this.isFullScreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement ? !0 : !1, this.isFullScreen === !0 ? (this.sizeBeforeFullScreen = { forceSize: this.settings.forceSize, autoHeight: this.settings.autoHeight }, this.$slider.addClass("sp-full-screen"), this.settings.forceSize = "fullWindow", this.settings.autoHeight = !1) : (this.$slider.css("margin", ""), this.$slider.removeClass("sp-full-screen"), this.settings.forceSize = this.sizeBeforeFullScreen.forceSize, this.settings.autoHeight = this.sizeBeforeFullScreen.autoHeight), this.resize() }, destroyFullScreen: function () { this.off("update." + c), this._removeFullScreen() }, fullScreenDefaults: { fullScreen: !1, fadeFullScreen: !0 } }; b.SliderPro.addModule("FullScreen", d) }(window, jQuery), function (a, b) { "use strict"; var c = "Buttons." + b.SliderPro.namespace, d = { $buttons: null, initButtons: function () { this.on("update." + c, b.proxy(this._buttonsOnUpdate, this)) }, _buttonsOnUpdate: function () { this.$buttons = this.$slider.find(".sp-buttons"), this.settings.buttons === !0 && this.getTotalSlides() > 1 && 0 === this.$buttons.length ? this._createButtons() : this.settings.buttons === !0 && this.getTotalSlides() !== this.$buttons.find(".sp-button").length && 0 !== this.$buttons.length ? this._adjustButtons() : (this.settings.buttons === !1 || this.getTotalSlides() <= 1 && 0 !== this.$buttons.length) && this._removeButtons() }, _createButtons: function () { var a = this; this.$buttons = b('<div class="sp-buttons"></div>').appendTo(this.$slider); for (var d = 0; d < this.getTotalSlides() ; d++) b('<div class="sp-button"></div>').appendTo(this.$buttons); this.$buttons.on("click." + c, ".sp-button", function () { a.gotoSlide(b(this).index()) }), this.$buttons.find(".sp-button").eq(this.selectedSlideIndex).addClass("sp-selected-button"), this.on("gotoSlide." + c, function (b) { a.$buttons.find(".sp-selected-button").removeClass("sp-selected-button"), a.$buttons.find(".sp-button").eq(b.index).addClass("sp-selected-button") }), this.$slider.addClass("sp-has-buttons") }, _adjustButtons: function () { this.$buttons.empty(); for (var a = 0; a < this.getTotalSlides() ; a++) b('<div class="sp-button"></div>').appendTo(this.$buttons); this.$buttons.find(".sp-selected-button").removeClass("sp-selected-button"), this.$buttons.find(".sp-button").eq(this.selectedSlideIndex).addClass("sp-selected-button") }, _removeButtons: function () { this.$buttons.off("click." + c, ".sp-button"), this.off("gotoSlide." + c), this.$buttons.remove(), this.$slider.removeClass("sp-has-buttons") }, destroyButtons: function () { this._removeButtons(), this.off("update." + c) }, buttonsDefaults: { buttons: !0 } }; b.SliderPro.addModule("Buttons", d) }(window, jQuery), function (a, b) { "use strict"; var c = "Arrows." + b.SliderPro.namespace, d = { $arrows: null, $previousArrow: null, $nextArrow: null, initArrows: function () { this.on("update." + c, b.proxy(this._arrowsOnUpdate, this)), this.on("gotoSlide." + c, b.proxy(this._checkArrowsVisibility, this)) }, _arrowsOnUpdate: function () { var a = this; this.settings.arrows === !0 && null === this.$arrows ? (this.$arrows = b('<div class="sp-arrows"></div>').appendTo(this.$slidesContainer), this.$previousArrow = b('<div class="sp-arrow sp-previous-arrow"></div>').appendTo(this.$arrows), this.$nextArrow = b('<div class="sp-arrow sp-next-arrow"></div>').appendTo(this.$arrows), this.$previousArrow.on("click." + c, function () { a.previousSlide() }), this.$nextArrow.on("click." + c, function () { a.nextSlide() }), this._checkArrowsVisibility()) : this.settings.arrows === !1 && null !== this.$arrows && this._removeArrows(), this.settings.arrows === !0 && (this.settings.fadeArrows === !0 ? this.$arrows.addClass("sp-fade-arrows") : this.settings.fadeArrows === !1 && this.$arrows.removeClass("sp-fade-arrows")) }, _checkArrowsVisibility: function () { this.settings.arrows !== !1 && this.settings.loop !== !0 && (0 === this.selectedSlideIndex ? this.$previousArrow.css("display", "none") : this.$previousArrow.css("display", "block"), this.selectedSlideIndex === this.getTotalSlides() - 1 ? this.$nextArrow.css("display", "none") : this.$nextArrow.css("display", "block")) }, _removeArrows: function () { null !== this.$arrows && (this.$previousArrow.off("click." + c), this.$nextArrow.off("click." + c), this.$arrows.remove(), this.$arrows = null) }, destroyArrows: function () { this._removeArrows(), this.off("update." + c), this.off("gotoSlide." + c) }, arrowsDefaults: { arrows: !1, fadeArrows: !0 } }; b.SliderPro.addModule("Arrows", d) }(window, jQuery), function (a, b) { "use strict"; var c = "ThumbnailTouchSwipe." + b.SliderPro.namespace, d = { thumbnailTouchStartPoint: { x: 0, y: 0 }, thumbnailTouchEndPoint: { x: 0, y: 0 }, thumbnailTouchDistance: { x: 0, y: 0 }, thumbnailTouchStartPosition: 0, isThumbnailTouchMoving: !1, isThumbnailTouchSwipe: !1, thumbnailTouchSwipeEvents: { startEvent: "", moveEvent: "", endEvent: "" }, initThumbnailTouchSwipe: function () { this.on("update." + c, b.proxy(this._thumbnailTouchSwipeOnUpdate, this)) }, _thumbnailTouchSwipeOnUpdate: function () { this.isThumbnailScroller !== !1 && (this.settings.thumbnailTouchSwipe === !0 && this.isThumbnailTouchSwipe === !1 && (this.isThumbnailTouchSwipe = !0, this.thumbnailTouchSwipeEvents.startEvent = "touchstart." + c + " mousedown." + c, this.thumbnailTouchSwipeEvents.moveEvent = "touchmove." + c + " mousemove." + c, this.thumbnailTouchSwipeEvents.endEvent = "touchend." + this.uniqueId + "." + c + " mouseup." + this.uniqueId + "." + c, this.$thumbnails.on(this.thumbnailTouchSwipeEvents.startEvent, b.proxy(this._onThumbnailTouchStart, this)), this.$thumbnails.on("dragstart." + c, function (a) { a.preventDefault() }), this.$thumbnails.addClass("sp-grab")), b.each(this.thumbnails, function (a, b) { b.off("thumbnailClick") })) }, _onThumbnailTouchStart: function (a) { if (!(b(a.target).closest(".sp-selectable").length >= 1)) { var d = "undefined" != typeof a.originalEvent.touches ? a.originalEvent.touches[0] : a.originalEvent; "undefined" == typeof a.originalEvent.touches && a.preventDefault(), b(a.target).parents(".sp-thumbnail-container").find("a").one("click." + c, function (a) { a.preventDefault() }), this.thumbnailTouchStartPoint.x = d.pageX || d.clientX, this.thumbnailTouchStartPoint.y = d.pageY || d.clientY, this.thumbnailTouchStartPosition = this.thumbnailsPosition, this.thumbnailTouchDistance.x = this.thumbnailTouchDistance.y = 0, this.$thumbnails.hasClass("sp-animated") && (this.isThumbnailTouchMoving = !0, this._stopThumbnailsMovement(), this.thumbnailTouchStartPosition = this.thumbnailsPosition), this.$thumbnails.on(this.thumbnailTouchSwipeEvents.moveEvent, b.proxy(this._onThumbnailTouchMove, this)), b(document).on(this.thumbnailTouchSwipeEvents.endEvent, b.proxy(this._onThumbnailTouchEnd, this)), this.$thumbnails.removeClass("sp-grab").addClass("sp-grabbing"), this.$thumbnailsContainer.addClass("sp-swiping") } }, _onThumbnailTouchMove: function (a) { var b = "undefined" != typeof a.originalEvent.touches ? a.originalEvent.touches[0] : a.originalEvent; this.isThumbnailTouchMoving = !0, this.thumbnailTouchEndPoint.x = b.pageX || b.clientX, this.thumbnailTouchEndPoint.y = b.pageY || b.clientY, this.thumbnailTouchDistance.x = this.thumbnailTouchEndPoint.x - this.thumbnailTouchStartPoint.x, this.thumbnailTouchDistance.y = this.thumbnailTouchEndPoint.y - this.thumbnailTouchStartPoint.y; var c = "horizontal" === this.thumbnailsOrientation ? this.thumbnailTouchDistance.x : this.thumbnailTouchDistance.y, d = "horizontal" === this.thumbnailsOrientation ? this.thumbnailTouchDistance.y : this.thumbnailTouchDistance.x; if (Math.abs(c) > Math.abs(d)) { if (a.preventDefault(), this.thumbnailsPosition >= 0) { var e = -this.thumbnailTouchStartPosition; c = e + .2 * (c - e) } else if (this.thumbnailsPosition <= -this.thumbnailsSize + this.thumbnailsContainerSize) { var f = this.thumbnailsSize - this.thumbnailsContainerSize + this.thumbnailTouchStartPosition; c = -f + .2 * (c + f) } this._moveThumbnailsTo(this.thumbnailTouchStartPosition + c, !0) } }, _onThumbnailTouchEnd: function (a) { var d = this; "horizontal" === this.thumbnailsOrientation ? this.thumbnailTouchDistance.x : this.thumbnailTouchDistance.y; if (this.$thumbnails.off(this.thumbnailTouchSwipeEvents.moveEvent), b(document).off(this.thumbnailTouchSwipeEvents.endEvent), this.$thumbnails.removeClass("sp-grabbing").addClass("sp-grab"), this.isThumbnailTouchMoving === !1 || this.isThumbnailTouchMoving === !0 && Math.abs(this.thumbnailTouchDistance.x) < 10 && Math.abs(this.thumbnailTouchDistance.y) < 10) { var e = b(a.target).hasClass("sp-thumbnail-container") ? b(a.target) : b(a.target).parents(".sp-thumbnail-container"), f = e.index(); return void (0 !== b(a.target).parents("a").length ? (b(a.target).parents("a").off("click." + c), this.$thumbnailsContainer.removeClass("sp-swiping")) : f !== this.selectedThumbnailIndex && -1 !== f && this.gotoSlide(f)) } this.isThumbnailTouchMoving = !1, b(a.target).parents(".sp-thumbnail").one("click", function (a) { a.preventDefault() }), setTimeout(function () { d.$thumbnailsContainer.removeClass("sp-swiping") }, 1), this.thumbnailsPosition > 0 ? this._moveThumbnailsTo(0) : this.thumbnailsPosition < this.thumbnailsContainerSize - this.thumbnailsSize && this._moveThumbnailsTo(this.thumbnailsContainerSize - this.thumbnailsSize), this.trigger({ type: "thumbnailsMoveComplete" }), b.isFunction(this.settings.thumbnailsMoveComplete) && this.settings.thumbnailsMoveComplete.call(this, { type: "thumbnailsMoveComplete" }) }, destroyThumbnailTouchSwipe: function () { this.off("update." + c), this.isThumbnailScroller !== !1 && (this.$thumbnails.off(this.thumbnailTouchSwipeEvents.startEvent), this.$thumbnails.off(this.thumbnailTouchSwipeEvents.moveEvent), this.$thumbnails.off("dragstart." + c), b(document).off(this.thumbnailTouchSwipeEvents.endEvent), this.$thumbnails.removeClass("sp-grab")) }, thumbnailTouchSwipeDefaults: { thumbnailTouchSwipe: !0 } }; b.SliderPro.addModule("ThumbnailTouchSwipe", d) }(window, jQuery), function (a, b) { "use strict"; var c = "ThumbnailArrows." + b.SliderPro.namespace, d = { $thumbnailArrows: null, $previousThumbnailArrow: null, $nextThumbnailArrow: null, initThumbnailArrows: function () { var a = this; this.on("update." + c, b.proxy(this._thumbnailArrowsOnUpdate, this)), this.on("sliderResize." + c + " thumbnailsMoveComplete." + c, function () { a.isThumbnailScroller === !0 && a.settings.thumbnailArrows === !0 && a._checkThumbnailArrowsVisibility() }) }, _thumbnailArrowsOnUpdate: function () { var a = this; this.isThumbnailScroller !== !1 && (this.settings.thumbnailArrows === !0 && null === this.$thumbnailArrows ? (this.$thumbnailArrows = b('<div class="sp-thumbnail-arrows"></div>').appendTo(this.$thumbnailsContainer), this.$previousThumbnailArrow = b('<div class="sp-thumbnail-arrow sp-previous-thumbnail-arrow"></div>').appendTo(this.$thumbnailArrows), this.$nextThumbnailArrow = b('<div class="sp-thumbnail-arrow sp-next-thumbnail-arrow"></div>').appendTo(this.$thumbnailArrows), this.$previousThumbnailArrow.on("click." + c, function () { var b = Math.min(0, a.thumbnailsPosition + a.thumbnailsContainerSize); a._moveThumbnailsTo(b) }), this.$nextThumbnailArrow.on("click." + c, function () { var b = Math.max(a.thumbnailsContainerSize - a.thumbnailsSize, a.thumbnailsPosition - a.thumbnailsContainerSize); a._moveThumbnailsTo(b) })) : this.settings.thumbnailArrows === !1 && null !== this.$thumbnailArrows && this._removeThumbnailArrows(), this.settings.thumbnailArrows === !0 && (this.settings.fadeThumbnailArrows === !0 ? this.$thumbnailArrows.addClass("sp-fade-thumbnail-arrows") : this.settings.fadeThumbnailArrows === !1 && this.$thumbnailArrows.removeClass("sp-fade-thumbnail-arrows"), this._checkThumbnailArrowsVisibility())) }, _checkThumbnailArrowsVisibility: function () { 0 === this.thumbnailsPosition ? this.$previousThumbnailArrow.css("display", "none") : this.$previousThumbnailArrow.css("display", "block"), this.thumbnailsPosition === this.thumbnailsContainerSize - this.thumbnailsSize ? this.$nextThumbnailArrow.css("display", "none") : this.$nextThumbnailArrow.css("display", "block") }, _removeThumbnailArrows: function () { null !== this.$thumbnailArrows && (this.$previousThumbnailArrow.off("click." + c), this.$nextThumbnailArrow.off("click." + c), this.$thumbnailArrows.remove(), this.$thumbnailArrows = null) }, destroyThumbnailArrows: function () { this._removeThumbnailArrows(), this.off("update." + c), this.off("sliderResize." + c), this.off("thumbnailsMoveComplete." + c) }, thumbnailArrowsDefaults: { thumbnailArrows: !1, fadeThumbnailArrows: !0 } }; b.SliderPro.addModule("ThumbnailArrows", d) }(window, jQuery), function (a, b) { "use strict"; var c = "Video." + b.SliderPro.namespace, d = { firstInit: !1, initVideo: function () { this.on("update." + c, b.proxy(this._videoOnUpdate, this)), this.on("gotoSlideComplete." + c, b.proxy(this._videoOnGotoSlideComplete, this)) }, _videoOnUpdate: function () { var a = this; this.$slider.find(".sp-video").not("a, [data-video-init]").each(function () { var c = b(this); a._initVideo(c) }), this.$slider.find("a.sp-video").not("[data-video-preinit]").each(function () { var c = b(this); a._preinitVideo(c) }), this.firstInit === !1 && (this.firstInit = !0, this._videoOnGotoSlideComplete({ index: this.selectedSlideIndex, previousIndex: -1 })) }, _initVideo: function (a) { var d = this; a.attr("data-video-init", !0).videoController(), a.on("videoPlay." + c, function () { "stopAutoplay" === d.settings.playVideoAction && "undefined" != typeof d.stopAutoplay && (d.stopAutoplay(), d.settings.autoplay = !1); var c = { type: "videoPlay", video: a }; d.trigger(c), b.isFunction(d.settings.videoPlay) && d.settings.videoPlay.call(d, c) }), a.on("videoPause." + c, function () { "startAutoplay" === d.settings.pauseVideoAction && "undefined" != typeof d.startAutoplay && (d.startAutoplay(), d.settings.autoplay = !0); var c = { type: "videoPause", video: a }; d.trigger(c), b.isFunction(d.settings.videoPause) && d.settings.videoPause.call(d, c) }), a.on("videoEnded." + c, function () { "startAutoplay" === d.settings.endVideoAction && "undefined" != typeof d.startAutoplay ? (d.startAutoplay(), d.settings.autoplay = !0) : "nextSlide" === d.settings.endVideoAction ? d.nextSlide() : "replayVideo" === d.settings.endVideoAction && a.videoController("replay"); var c = { type: "videoEnd", video: a }; d.trigger(c), b.isFunction(d.settings.videoEnd) && d.settings.videoEnd.call(d, c) }) }, _preinitVideo: function (a) { var d = this; a.attr("data-video-preinit", !0), a.on("click." + c, function (c) { if (!d.$slider.hasClass("sp-swiping")) { c.preventDefault(); var e, f, g, h, i, j, k, l = a.attr("href"), m = a.children("img").attr("width") || a.children("img").width(), n = a.children("img").attr("height") || a.children("img").height(); -1 !== l.indexOf("youtube") || -1 !== l.indexOf("youtu.be") ? f = "youtube" : -1 !== l.indexOf("vimeo") && (f = "vimeo"), g = "youtube" === f ? /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/ : /http:\/\/(www\.)?vimeo.com\/(\d+)/, h = l.match(g), i = h[2], j = "youtube" === f ? "//www.youtube.com/embed/" + i + "?enablejsapi=1&wmode=opaque" : "//player.vimeo.com/video/" + i + "?api=1", k = l.split("?")[1], "undefined" != typeof k && (k = k.split("&"), b.each(k, function (a, b) { -1 === b.indexOf(i) && (j += "&" + b) })), e = b("<iframe></iframe>").attr({ src: j, width: m, height: n, "class": a.attr("class"), frameborder: 0, allowfullscreen: "allowfullscreen" }).insertBefore(a), d._initVideo(e), e.videoController("play"), a.css("display", "none") } }) }, _videoOnGotoSlideComplete: function (a) { var b = this.$slides.find(".sp-slide").eq(a.previousIndex).find(".sp-video[data-video-init]"); if (-1 !== a.previousIndex && 0 !== b.length && ("stopVideo" === this.settings.leaveVideoAction ? b.videoController("stop") : "pauseVideo" === this.settings.leaveVideoAction ? b.videoController("pause") : "removeVideo" === this.settings.leaveVideoAction && (0 !== b.siblings("a.sp-video").length ? (b.siblings("a.sp-video").css("display", ""), b.videoController("destroy"), b.remove()) : b.videoController("stop"))), "playVideo" === this.settings.reachVideoAction) { var d = this.$slides.find(".sp-slide").eq(a.index).find(".sp-video[data-video-init]"), e = this.$slides.find(".sp-slide").eq(a.index).find(".sp-video[data-video-preinit]"); 0 !== d.length ? d.videoController("play") : 0 !== e.length && e.trigger("click." + c) } }, destroyVideo: function () { this.$slider.find(".sp-video[ data-video-preinit ]").each(function () { var a = b(this); a.removeAttr("data-video-preinit"), a.off("click." + c) }), this.$slider.find(".sp-video[ data-video-init ]").each(function () { var a = b(this); a.removeAttr("data-video-init"), a.off("Video"), a.videoController("destroy") }), this.off("update." + c), this.off("gotoSlideComplete." + c) }, videoDefaults: { reachVideoAction: "none", leaveVideoAction: "pauseVideo", playVideoAction: "stopAutoplay", pauseVideoAction: "none", endVideoAction: "none", videoPlay: function () { }, videoPause: function () { }, videoEnd: function () { } } }; b.SliderPro.addModule("Video", d) }(window, jQuery), function (a) {
    "use strict"; var b = window.navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? !0 : !1, c = function (b, c) { this.$video = a(b), this.options = c, this.settings = {}, this.player = null, this._init() }; c.prototype = { _init: function () { this.settings = a.extend({}, this.defaults, this.options); var b = this, c = a.VideoController.players, d = this.$video.attr("id"); for (var e in c) if ("undefined" != typeof c[e] && c[e].isType(this.$video)) { this.player = new c[e](this.$video); break } if (null !== this.player) { var f = ["ready", "start", "play", "pause", "ended"]; a.each(f, function (c, e) { var f = "video" + e.charAt(0).toUpperCase() + e.slice(1); b.player.on(e, function () { b.trigger({ type: f, video: d }), a.isFunction(b.settings[f]) && b.settings[f].call(b, { type: f, video: d }) }) }) } }, play: function () { b === !0 && this.player.isStarted() === !1 || "playing" === this.player.getState() || this.player.play() }, stop: function () { b === !0 && this.player.isStarted() === !1 || "stopped" === this.player.getState() || this.player.stop() }, pause: function () { b === !0 && this.player.isStarted() === !1 || "paused" === this.player.getState() || this.player.pause() }, replay: function () { (b !== !0 || this.player.isStarted() !== !1) && this.player.replay() }, on: function (a, b) { return this.$video.on(a, b) }, off: function (a) { return this.$video.off(a) }, trigger: function (a) { return this.$video.triggerHandler(a) }, destroy: function () { this.player.isStarted() === !0 && this.stop(), this.player.off("ready"), this.player.off("start"), this.player.off("play"), this.player.off("pause"), this.player.off("ended"), this.$video.removeData("videoController") }, defaults: { videoReady: function () { }, videoStart: function () { }, videoPlay: function () { }, videoPause: function () { }, videoEnded: function () { } } }, a.VideoController = { players: {}, addPlayer: function (a, b) { this.players[a] = b } }, a.fn.videoController = function (b) { var d = Array.prototype.slice.call(arguments, 1); return this.each(function () { if ("undefined" == typeof a(this).data("videoController")) { var e = new c(this, b); a(this).data("videoController", e) } else if ("undefined" != typeof b) { var f = a(this).data("videoController"); "function" == typeof f[b] ? f[b].apply(f, d) : a.error(b + " does not exist in videoController.") } }) }; var d = function (b) { this.$video = b, this.player = null, this.ready = !1, this.started = !1, this.state = "", this.events = a({}), this._init() }; d.prototype = { _init: function () { }, play: function () { }, pause: function () { }, stop: function () { }, replay: function () { }, isType: function () { }, isReady: function () { return this.ready }, isStarted: function () { return this.started }, getState: function () { return this.state }, on: function (a, b) { return this.events.on(a, b) }, off: function (a) { return this.events.off(a) }, trigger: function (a) { return this.events.triggerHandler(a) } }; var e = { youtubeAPIAdded: !1, youtubeVideos: [] }, f = function (b) { this.init = !1; var c = window.YT && window.YT.Player; if ("undefined" != typeof c) d.call(this, b); else if (e.youtubeVideos.push({ video: b, scope: this }), e.youtubeAPIAdded === !1) { e.youtubeAPIAdded = !0; var f = document.createElement("script"); f.src = "//www.youtube.com/player_api"; var g = document.getElementsByTagName("script")[0]; g.parentNode.insertBefore(f, g), window.onYouTubePlayerAPIReady = function () { a.each(e.youtubeVideos, function (a, b) { d.call(b.scope, b.video) }) } } }; f.prototype = new d, f.prototype.constructor = f, a.VideoController.addPlayer("YoutubeVideo", f), f.isType = function (a) { if (a.is("iframe")) { var b = a.attr("src"); if (-1 !== b.indexOf("youtube.com") || -1 !== b.indexOf("youtu.be")) return !0 } return !1 }, f.prototype._init = function () { this.init = !0, this._setup() }, f.prototype._setup = function () { var a = this; this.player = new YT.Player(this.$video[0], { events: { onReady: function () { a.trigger({ type: "ready" }), a.ready = !0 }, onStateChange: function (b) { switch (b.data) { case YT.PlayerState.PLAYING: a.started === !1 && (a.started = !0, a.trigger({ type: "start" })), a.state = "playing", a.trigger({ type: "play" }); break; case YT.PlayerState.PAUSED: a.state = "paused", a.trigger({ type: "pause" }); break; case YT.PlayerState.ENDED: a.state = "ended", a.trigger({ type: "ended" }) } } } }) }, f.prototype.play = function () { var a = this; if (this.ready === !0) this.player.playVideo(); else var b = setInterval(function () { a.ready === !0 && (clearInterval(b), a.player.playVideo()) }, 100) }, f.prototype.pause = function () { b === !0 ? this.stop() : this.player.pauseVideo() }, f.prototype.stop = function () { this.player.seekTo(1), this.player.stopVideo(), this.state = "stopped" }, f.prototype.replay = function () { this.player.seekTo(1), this.player.playVideo() }, f.prototype.on = function (a, b) { var c = this; if (this.init === !0) d.prototype.on.call(this, a, b); else var e = setInterval(function () { c.init === !0 && (clearInterval(e), d.prototype.on.call(c, a, b)) }, 100) }; var g = { vimeoAPIAdded: !1, vimeoVideos: [] }, h = function (b) { if (this.init = !1, "undefined" != typeof window.Froogaloop) d.call(this, b); else if (g.vimeoVideos.push({ video: b, scope: this }), g.vimeoAPIAdded === !1) { g.vimeoAPIAdded = !0; var c = document.createElement("script"); c.src = "//a.vimeocdn.com/js/froogaloop2.min.js"; var e = document.getElementsByTagName("script")[0]; e.parentNode.insertBefore(c, e); var f = setInterval(function () { "undefined" != typeof window.Froogaloop && (clearInterval(f), a.each(g.vimeoVideos, function (a, b) { d.call(b.scope, b.video) })) }, 100) } }; h.prototype = new d, h.prototype.constructor = h, a.VideoController.addPlayer("VimeoVideo", h), h.isType = function (a) { if (a.is("iframe")) { var b = a.attr("src"); if (-1 !== b.indexOf("vimeo.com")) return !0 } return !1 }, h.prototype._init = function () { this.init = !0, this._setup() }, h.prototype._setup = function () { var a = this; this.player = $f(this.$video[0]), this.player.addEvent("ready", function () { a.ready = !0, a.trigger({ type: "ready" }), a.player.addEvent("play", function () { a.started === !1 && (a.started = !0, a.trigger({ type: "start" })), a.state = "playing", a.trigger({ type: "play" }) }), a.player.addEvent("pause", function () { a.state = "paused", a.trigger({ type: "pause" }) }), a.player.addEvent("finish", function () { a.state = "ended", a.trigger({ type: "ended" }) }) }) }, h.prototype.play = function () { var a = this; if (this.ready === !0) this.player.api("play"); else var b = setInterval(function () { a.ready === !0 && (clearInterval(b), a.player.api("play")) }, 100) }, h.prototype.pause = function () { this.player.api("pause") }, h.prototype.stop = function () { this.player.api("seekTo", 0), this.player.api("pause"), this.state = "stopped" }, h.prototype.replay = function () { this.player.api("seekTo", 0), this.player.api("play") }, h.prototype.on = function (a, b) { var c = this; if (this.init === !0) d.prototype.on.call(this, a, b); else var e = setInterval(function () { c.init === !0 && (clearInterval(e), d.prototype.on.call(c, a, b)) }, 100) }; var i = function (a) { d.call(this, a) }; i.prototype = new d, i.prototype.constructor = i, a.VideoController.addPlayer("HTML5Video", i), i.isType = function (a) { return a.is("video") && a.hasClass("video-js") === !1 && a.hasClass("sublime") === !1 ? !0 : !1 }, i.prototype._init = function () { var a = this; this.player = this.$video[0]; var b = setInterval(function () { 4 === a.player.readyState && (clearInterval(b), a.ready = !0, a.trigger({ type: "ready" }), a.player.addEventListener("play", function () { a.started === !1 && (a.started = !0, a.trigger({ type: "start" })), a.state = "playing", a.trigger({ type: "play" }) }), a.player.addEventListener("pause", function () { a.state = "paused", a.trigger({ type: "pause" }) }), a.player.addEventListener("ended", function () { a.state = "ended", a.trigger({ type: "ended" }) })) }, 100) }, i.prototype.play = function () { var a = this; if (this.ready === !0) this.player.play(); else var b = setInterval(function () { a.ready === !0 && (clearInterval(b), a.player.play()) }, 100) }, i.prototype.pause = function () { this.player.pause() }, i.prototype.stop = function () { this.player.currentTime = 0, this.player.pause(), this.state = "stopped" }, i.prototype.replay = function () { this.player.currentTime = 0, this.player.play() }; var j = function (a) { d.call(this, a) }; j.prototype = new d, j.prototype.constructor = j, a.VideoController.addPlayer("VideoJSVideo", j), j.isType = function (a) { return "undefined" == typeof a.attr("data-videojs-id") && !a.hasClass("video-js") || "undefined" == typeof videojs ? !1 : !0 }, j.prototype._init = function () {
        var a = this, b = this.$video.hasClass("video-js") ? this.$video.attr("id") : this.$video.attr("data-videojs-id"); this.player = videojs(b), this.player.ready(function () {
            a.ready = !0, a.trigger({ type: "ready" }), a.player.on("play", function () { a.started === !1 && (a.started = !0, a.trigger({ type: "start" })), a.state = "playing", a.trigger({ type: "play" }) }), a.player.on("pause", function () { a.state = "paused", a.trigger({ type: "pause" }) }), a.player.on("ended", function () {
                a.state = "ended", a.trigger({ type: "ended" })
            })
        })
    }, j.prototype.play = function () { this.player.play() }, j.prototype.pause = function () { this.player.pause() }, j.prototype.stop = function () { this.player.currentTime(0), this.player.pause(), this.state = "stopped" }, j.prototype.replay = function () { this.player.currentTime(0), this.player.play() }; var k = function (a) { d.call(this, a) }; k.prototype = new d, k.prototype.constructor = k, a.VideoController.addPlayer("SublimeVideo", k), k.isType = function (a) { return a.hasClass("sublime") && "undefined" != typeof sublime ? !0 : !1 }, k.prototype._init = function () { var a = this; sublime.ready(function () { a.player = sublime.player(a.$video.attr("id")), a.ready = !0, a.trigger({ type: "ready" }), a.player.on("play", function () { a.started === !1 && (a.started = !0, a.trigger({ type: "start" })), a.state = "playing", a.trigger({ type: "play" }) }), a.player.on("pause", function () { a.state = "paused", a.trigger({ type: "pause" }) }), a.player.on("stop", function () { a.state = "stopped", a.trigger({ type: "stop" }) }), a.player.on("end", function () { a.state = "ended", a.trigger({ type: "ended" }) }) }) }, k.prototype.play = function () { this.player.play() }, k.prototype.pause = function () { this.player.pause() }, k.prototype.stop = function () { this.player.stop() }, k.prototype.replay = function () { this.player.stop(), this.player.play() }; var l = function (a) { d.call(this, a) }; l.prototype = new d, l.prototype.constructor = l, a.VideoController.addPlayer("JWPlayerVideo", l), l.isType = function (a) { return "undefined" == typeof a.attr("data-jwplayer-id") && !a.hasClass("jwplayer") && 0 === a.find("object[data*='jwplayer']").length || "undefined" == typeof jwplayer ? !1 : !0 }, l.prototype._init = function () { var a, b = this; this.$video.hasClass("jwplayer") ? a = this.$video.attr("id") : "undefined" != typeof this.$video.attr("data-jwplayer-id") ? a = this.$video.attr("data-jwplayer-id") : 0 !== this.$video.find("object[data*='jwplayer']").length && (a = this.$video.find("object").attr("id")), this.player = jwplayer(a), this.player.onReady(function () { b.ready = !0, b.trigger({ type: "ready" }), b.player.onPlay(function () { b.started === !1 && (b.started = !0, b.trigger({ type: "start" })), b.state = "playing", b.trigger({ type: "play" }) }), b.player.onPause(function () { b.state = "paused", b.trigger({ type: "pause" }) }), b.player.onComplete(function () { b.state = "ended", b.trigger({ type: "ended" }) }) }) }, l.prototype.play = function () { this.player.play(!0) }, l.prototype.pause = function () { this.player.pause(!0) }, l.prototype.stop = function () { this.player.stop(), this.state = "stopped" }, l.prototype.replay = function () { this.player.seek(0), this.player.play(!0) }
}(jQuery);//on scroll image visible
function ImageLazyLoader() {
    var imageLoader = MakeImageVisible;
    var bgImageLoader = MakeBgImageVisible;
    ImageAsyncLoaderOpen();
    BgImageAsyncLoaderOpen();
    MakeImageVisible();
    MakeBgImageVisible();
    function ImageAsyncLoaderOpen() {
        window.addEventListener("scroll", imageLoader);
        document.addEventListener('touchmove', imageLoader, { passive: true });
    }
    function ImageAsyncLoaderclose() {
        window.removeEventListener("scroll", imageLoader);
        document.removeEventListener('touchmove', imageLoader, { passive: true });
    }
    function BgImageAsyncLoaderOpen() {
        window.addEventListener("scroll", bgImageLoader);
        document.addEventListener('touchmove', bgImageLoader, { passive: true });
    }
    function BgImageAsyncLoaderclose() {
        window.removeEventListener("scroll", bgImageLoader);
        document.removeEventListener('touchmove', bgImageLoader, { passive: true });
    }
    function MakeImageVisible() {
        $('img[data-cimage]').not('.visProceed').each(function () {
            let $this = $(this);
            //if ($this.is(':visible')) {
            ViewImage($this);
            //}
        });
        if ($('img[data-cimage]').length === $('img.visProceed').length)
            ImageAsyncLoaderclose();
    }
    function MakeBgImageVisible() {
        $('[data-backgroundimage="image"]').not('.BgImgProceed').each(function () {
            let $this = $(this);
            //if ($this.is(':visible')) {
            ViewBgImage($this);
            //}

        });
        if ($('[data-backgroundimage="image"]').length === $('.BgImgProceed').length)
            BgImageAsyncLoaderclose();
    }
    function ViewImage($this) {
        if (inView($this, 1000)) {
            let imageSrc = $this.attr('data-cimage');
            if (imageSrc != "undefined") {
                $this.attr('src', ReplaceSrc(imageSrc));
            }
            $this.addClass('visProceed');
        }
    }
    function ViewBgImage($this) {
        if (inView($this, 1000)) {
            let imageSrc = $this.attr('data-cimage');
            if (imageSrc != "undefined") {
                $this.css('background-image', ReplaceSrc(imageSrc));
                $this.addClass('BgImgProceed');
            }
        }
    }
    function ReplaceSrc($imageSrc) {
        var DeviceAlphaValue = ViewDeviceAlpha();
        switch (DeviceAlphaValue) {
            case "m":
                return $imageSrc.replace('/MediaThumb/original', '/MediaThumb/medium').replace('/MediaThumb/large', '/MediaThumb/medium');//.replace('/MediaThumb/medium', '');
            case "t":
                return $imageSrc.replace('/MediaThumb/original', '/MediaThumb/large').replace('/MediaThumb/large', '/MediaThumb/medium');
            case "":
                return $imageSrc;
        }
    }

}
function inView(elem, nearThreshold) {
    var viewportHeight = getViewportHeight();
    var scrollTop = (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    var elemTop = elem.offset().top;
    var elemHeight = elem.height();
    nearThreshold = nearThreshold || 0;
    return (scrollTop + viewportHeight + nearThreshold) > (elemTop + elemHeight);
}

function getViewportHeight() {
    if (window.innerHeight) {
        return window.innerHeight;
    }
    else if (document.body && document.body.offsetHeight) {
        return document.body.offsetHeight;
    }
    else {
        return 0;
    }
}(function ($) {
    $.WebBuilderViews = function (p) {
        p = $.extend({
            modulePath: '',
            pageName: 'default'
        }, p);
        let WebBuilderManage = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                crossDomain: true,
                baseURL: p.modulePath + 'Services/webservice.asmx/',
                method: "",
                url: "",
                ajaxCallMode: "",
                userModuleID: p.userModuleID,
                pageName: p.pageName
            },
            init: function () {
                let removeCompo = [];
                InvokeAPI();
                ImageLazyLoader();
                $('.editor-component, .cRow').each(function () {
                    let $me = $(this);
                    let dataType = $me.attr('data-type');
                    if (typeof dataType !== "undefined") {
                        let index = removeCompo.indexOf(dataType);
                        if (index == -1) {
                            let v = component[dataType];
                            try {
                                if (typeof v.view !== "undefined" && typeof v.view.view !== "undefined") {
                                    //v.view.view();
                                    v.view.view({ dataType: dataType });
                                    removeCompo.push(dataType);
                                }
                            } catch (error) {
                                WriteLog(dataType + " : " + error);
                            }
                        }
                    }
                });
                let $body = $('.site-body');
                let tempSettings = $body.attr('data-settings');
                if (typeof (tempSettings) !== 'undefined' && tempSettings.length > 0) {
                    tempSettings = JSON.parse(tempSettings);
                    $body.addClass(tempSettings.defaultLayout);
                    $body.addClass('ff-' + tempSettings.defaultFontFamily.toLowerCase());
                    $body.addClass('f-weight-400');
                    $body.addClass(tempSettings.SiteHeaderEffect);
                    $('body').css({ 'background-color': tempSettings.bodybackgroundColor });
                    $('body').attrs(tempSettings.body);
                    currentpageName = WebBuilderManage.config.pageName.toLowerCase();
                    ActiveMenu();
                    OnePageMenuScrollEvent();
                    if (tempSettings.scrolltotop) {
                        let scroll = '<div class="scrolltotop" style="display:none;" id="ScroolToTop"><div class="ScrollToTop editor-component"><div class="scrollDOM"><i class="fa fa-arrow-up" aria-hidden="true"></i></div></div></div>';
                        $('body').append(scroll);
                        $('#ScroolToTop').on('click', function () {
                            $('body,html').animate({
                                scrollTop: '0px'
                            }, 1000);
                        });
                    }
                    if (typeof (tempSettings.shadedLayer) !== "undefined" && tempSettings.shadedLayer !== null) {
                        let shadedDiv = '<div class="editor-row-shaded-layer"></div>';
                        let appendElem = $('body').children();
                        $('body').append(shadedDiv);
                        $('body').find(' > .editor-row-shaded-layer').append(appendElem).attrs(tempSettings.shadedLayer);
                    }
                    MenuHover(tempSettings.primaryColor, tempSettings.secondaryColor);
                }
                ViewMouseOverEffect();
                WebBuilderManage.ScrollDynamicBind();
                //init carousel 
                let $imageSlider = $('.ImageSliderWrapper');
                $imageSlider.removeClass('binded');
                $imageSlider.each(function (index, value) {
                    let carousel = new CarouselInit($(this));
                });
                if ($('.edit-area').hasClass('hdr-fxd')) {
                    let containerWidth = $('.editor-componentWrapper').css('width');
                    $('.editor-site-header').css('width', containerWidth);
                }
                if ($('.edit-area').hasClass('hdr-stky')) {
                    let containerWidth = $('.editor-componentWrapper').css('width');
                    $('.editor-site-header > .editor-row').css('width', containerWidth);
                }
                //Responsive();
                $(window).resize(function () {
                    //Responsive();
                    if ($(window).width() != screenWidth) {
                        screenWidth = $(window).width();
                        WebBuilderManage.WindowResize();
                    }
                });
                $.each(storedComponent, function (i, v) {
                    v = v.ComponentValue;
                    let value = JSONParse(v);
                    if (typeof value !== "undefined" && typeof value.view !== "undefined" && typeof value.view.oncomplete !== "undefined")
                        value.view.oncomplete();
                });
                $('#ajaxBusy').hide();
                this.heightLightSearch();
                ChangeRedirectURL();
            },
            heightLightSearch: function () {
                $.expr[":"].contains = $.expr.createPseudo(function (arg) {
                    return function (elem) {
                        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
                    };
                });
                const urlParams = new URLSearchParams(window.location.search);
                var keyword = urlParams.get("keywords");
                if (keyword!==null && keyword !== "") {
                    keyword = keyword.replaceAll("-", " ");
                    keyword = keyword.replaceAll("%20", " ");
                    let regexKeyword = '(?![^<>]*>)(' + keyword + ')';
                    let regex = new RegExp(regexKeyword, 'gmi');
                    $(".editor-component:contains('" + keyword + "')").html(function (_, html) {
                        return html.replace(regex, '<span class="highlight">$1</span>');
                    });
                }
            },
            WindowResize: function () {
                let removeCompo = [];
                $('.editor-component, .cRow').each(function () {
                    let $me = $(this);
                    let dataType = $me.attr('data-type');
                    if (typeof component[dataType] !== "undefined" && typeof component[dataType].inherits !== "undefined") {
                        dataType = component[dataType].inherits;
                    }
                    if (typeof dataType !== "undefined") {
                        let index = removeCompo.indexOf(dataType);
                        if (index == -1) {
                            if (typeof component[dataType] !== "undefined" && typeof component[dataType].resize !== "undefined") {
                                try {
                                    setTimeout(function () {
                                        component[dataType].resize();
                                    }, 20);
                                }
                                catch (error) {
                                    //WriteLog(error);
                                }
                                removeCompo.push(dataType);
                            }
                        }
                    }
                });
            },
            ScrollDynamicBind: function () {
                let screenheight = getViewportHeight();
                let dynamicScroll = "if($('.scroll-begin').length>0){";
                dynamicScroll += 'var scroolHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;';
                $('.scroll-begin').each(function (i, v) {
                    let count = i;
                    let scrollClass = 'scroll_' + count;
                    let $this = $(this);
                    let top = $this.offset().top;
                    $this.addClass(scrollClass);
                    //let height = $('.' + scrollClass).height();
                    // let screenheight = getViewportHeight();
                    //dynamicScroll += "console.log(scroolHeight);";
                    //dynamicScroll += "console.log(" + top + ");";
                    //dynamicScroll += "console.log(" + screenheight + ");";
                    dynamicScroll += "var endofPage_" + count + " = false;";
                    //dynamicScroll += `if ((window.innerHeight + window.scrollY ) >= document.body.offsetHeight) {
                    dynamicScroll += `if ((window.innerHeight + window.scrollY  + ${screenheight / 4}) >= document.body.offsetHeight) {
                                        endofPage_${count} = true;
                                    }`;
                    //dynamicScroll += " let heights = $('." + scrollClass + "').height();";
                    //dynamicScroll += "let webHeight = document.body.scrollHeight;";
                    dynamicScroll += "if (scroolHeight > $('.scroll_" + count + "').offset().top - (" + screenheight / 2 + ") || endofPage_" + i + ")";
                    dynamicScroll += "{";
                    let delay = 0;
                    if (typeof ($this.attr('data-scrolldelay') !== "undefined")) {
                        delay = parseInt($this.attr('data-scrolldelay'));
                    }
                    let newDelay = delay + 450;
                    if (top < screen.height) {
                        setTimeout(function () {
                            $this.addClass('scroll-end');
                            setTimeout(function () {
                                $this.removeClass('scroll-begin');
                            }, newDelay);
                        }, delay);
                    }
                    dynamicScroll += "setTimeout(function () {";
                    dynamicScroll += "$('." + scrollClass + "').addClass('scroll-end');";
                    dynamicScroll += "setTimeout(function () {";
                    dynamicScroll += "$('." + scrollClass + "').removeClass('scroll-begin');";
                    dynamicScroll += "},'" + newDelay + "');";
                    dynamicScroll += "}, " + delay + ");";
                    dynamicScroll += "}";
                });
                dynamicScroll += "}";
                //console.log(dynamicScroll)
                let ScrollWindow = new Function('name', dynamicScroll);
                window.onscroll = function () {
                    ScrollWindow();
                };
            },
            ajaxSuccess: function (data) {
                switch (WebBuilderManage.config.ajaxCallMode) {
                }
            },
            ajaxFailure: function () {
            },
            ajaxCall: function (config) {
                $.ajax({
                    type: WebBuilderManage.config.type,
                    contentType: WebBuilderManage.config.contentType,
                    async: WebBuilderManage.config.async,
                    cache: WebBuilderManage.config.cache,
                    url: WebBuilderManage.config.url,
                    data: WebBuilderManage.config.data,
                    dataType: WebBuilderManage.config.dataType,
                    success: WebBuilderManage.ajaxSuccess,
                    error: WebBuilderManage.ajaxFailure
                });
            }
        };
        WebBuilderManage.init();
    };
    $.fn.WebBuilderView = function (p) {
        $.WebBuilderViews(p);
    };
})(jQuery);