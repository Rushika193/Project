(function ($) {
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