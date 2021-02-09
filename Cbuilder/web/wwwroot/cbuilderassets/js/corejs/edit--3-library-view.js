/**
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
