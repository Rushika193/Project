(function ($) {
    $.CreateContextMenu = function (option, $parent) {
        let range = null;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
            }
        } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
        }

        let op = {
            title: 'menu',
            left: '100',
            top: '100',
            onMenuClick: function ($this, range) {
            },
            menuItem: [
                { text: 'UserName', attr: '' },
                { text: 'Full Name', attr: '' },
            ]
        };
        op = $.extend(op, option);

        let len = op.menuItem.length;
        if (len <= 0) {
            console.error('Please defined menu item in context menu.');
            return;
        }
        let html = `<div id="customContextMenu"  class="customContextMenu" style="position:absolute;display:none;top:${op.top}px;left:${op.left}px;">
         <span>${op.title}</span>
        <ul>`;
        for (let i = 0; i < len; i++) {
            html += `<li ${op.menuItem[i].attr}>${op.menuItem[i].text}</li>`;
        }
        html += '</ul></li>';
        $('#customContextMenu').remove();
        $('body').append(html);
        $('body').css('postion', 'relative');
        $('#customContextMenu li').off('click').on('click', function () {
            let $this = $(this);
            if (typeof op.onMenuClick == 'function') {
                op.onMenuClick($this, range);
                $('#customContextMenu').hide(100);
                $('#customContextMenu').remove();
            }
        });
        $('#customContextMenu').show(100);
        $(document).on('click', function (e) {
            let $target = $(e.target);
            if (!$target.hasClass('.customContextMenu') || $target.parents('.customContextMenu').length == 0) {
                $('#customContextMenu').hide(100);
                $('#customContextMenu').remove();
            }
        });
    };
    $.fn.CreateContextMenu = function (option) {
        let $parent = $(this);
        $parent.off('contextmenu').on("contextmenu", function (e) {
            option.left = e.pageX;
            option.top = e.pageY;
            $.CreateContextMenu(option, $parent);
            return false;
        });
    };
    $.fn.LineBreakOverride = function () {
        $(this).on("keypress", function (e) {
            if (e.which == 13) {
                if (window.getSelection) {
                    var selection = window.getSelection(),
                        range = selection.getRangeAt(0),
                        br = document.createElement("br");
                    range.deleteContents();
                    range.insertNode(br);
                    range.setStartAfter(br);
                    range.setEndAfter(br);
                    range.collapse(false);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    return false;
                }
            }
        });
    };
})(jQuery);
function ChangeSliderValue($slider, newSize) {
    $slider.slider({
        value: newSize
    });
    $slider.slider('option', 'slide');
    $slider.find('> div.ui-slider-handle').text(newSize);
    $slider.slider("enable");
}

(function ($) {
    function BuildManualSize($sliders, min, max, initialValue, type, tempFunction, $parent, ref) {
        let decreaseSize = document.createElement('i');
        decreaseSize.className = 'decreaseSliderSize fa fa-chevron-left';
        decreaseSize.onclick = function () {
            let $this = $(this);
            let $slider = $this.parent().prev();
            let newSize = parseInt($slider.find('> div.ui-slider-handle').text());
            let limit = parseInt($this.attr('data-min'));
            if (newSize > limit) {
                newSize = newSize - 1;
                ChangeSliderValue($slider, newSize);
                tempFunction(newSize, $parent, ref);
            }
        };
        decreaseSize.setAttribute('data-min', min);
        let increaseSize = document.createElement('i');
        increaseSize.className = 'increaseSliderSize fa fa-chevron-right';
        increaseSize.onclick = function () {
            let $this = $(this);
            let $slider = $this.parent().prev();
            let newSize = parseInt($slider.find('> div.ui-slider-handle').text());
            let limit = parseInt($this.attr('data-max'));
            if (newSize < limit) {
                newSize = newSize + 1;
                ChangeSliderValue($slider, newSize);
                tempFunction(newSize, $parent, ref);
            }
        };
        increaseSize.setAttribute('data-max', max);
        //debugger;
        let $sliderHelper = $(DOMCreate('span', '', 'manualSize'));
        $sliders.find('.manualSize').remove();
        $sliderHelper.insertAfter($sliders);
        $sliderHelper.append(decreaseSize);
        $sliderHelper.append(increaseSize);
        $sliderHelper.append(DOMCreate('span', type, 'slider-type'));
    }
    $.fn.AdvanceSageSlider = function (min, max, label, initialValue, callbackFunction, $parent, type, ref) {

        let $slider = $(this);
        $slider.wrap('<span class="range__slider fCol"></span>');
        $slider.html('<div title="' + label + '" class="custom-handle ui-slider-handle ui-state-default ui-corner-all"></div>');
        let $sliderHandler = $slider.find('.custom-handle');
        if (typeof ref === 'undefined') {
            ref = null;
        }
        let tempFunction = function () { };
        $slider.slider({
            range: "max",
            min: min,
            max: max,
            value: initialValue,
            create: function () {
                $sliderHandler.text($(this).slider("value"));
            },
            slide: function (event, ui) {
                let space = ui.value;
                $sliderHandler.text(space);
                if (typeof (callbackFunction) === 'function') {
                    /*callbackFunction(space, $parent);*/
                    tempFunction = callbackFunction;
                }
                else if (typeof (callbackFunction) === 'string') {
                    /* window[callbackFunction](space, $parent);*/
                    tempFunction = window[callbackFunction];
                }
                tempFunction(space, $parent, ref);
            }
        });
        if (typeof (callbackFunction) === 'function') {
            tempFunction = callbackFunction;
        }
        else if (typeof (callbackFunction) === 'string') {
            tempFunction = window[callbackFunction];
        }
        BuildManualSize($slider, min, max, initialValue, type, tempFunction, $parent, ref);
    };
}(jQuery));


function ColorPickerOption($option) {
    let objColor = {};
    let colorPickerOption = {
        customBG: '#222',
        margin: '4px -2px 0',
        doRender: 'div div',
        buildCallback: function ($element) {
            colorPicker = this;
            var colorInstance = colorPicker.color;
            $element.append('<div class="cp-panel">' +
                'Paste color code<br>' +
                '<input type="text" class="cp-HEX" />' +
                '</div>').on('change', 'input', function (e) {
                    var value = this.value,
                        className = this.className,
                        type = className.split('-')[1],
                        color = {};
                    color[type] = value;
                    colorInstance.setColor(type === 'HEX' ? value : color,
                        type === 'HEX' ? 'HEX' : /(?:r|g|b)/.test(type) ? 'rgb' : 'hsv');
                    colorPicker.render();
                    this.blur();
                });
            if ($option.isThemeColor) {
                $element.append(GetThemeColor());
                $('.themeColorpicker').off().on('click', function () {
                    $('.cp-HEX').val($(this).css('background-color'));
                    $('.cp-HEX').trigger('change');
                });
            }

        },
        renderCallback: function ($ele, toggled) {
            $thisElem = this;
            let colors = $thisElem.color.colors.RND,
                modes = {
                    r: colors.rgb.r, g: colors.rgb.g, b: colors.rgb.b,
                    h: colors.hsv.h, s: colors.hsv.s, v: colors.hsv.v,
                    HEX: $thisElem.color.colors.HEX
                };
            $('input', '.cp-panel').each(function () {
                this.value = modes[this.className.substr(3)];
            });

            colors = $thisElem.color.colors;
            let colorsRGB = colors.RND.rgb;
            let alpha = colors.alpha;
            let textColor = '';
            if (colors.RGBLuminance > 0.22) {
                textColor = '#222';
            }
            else {
                textColor = '#ddd';
            }
            let bgColor = 'rgba(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')';
            let colorObj = {
                'bgColor': bgColor,
                'textColor': textColor
            };
            if (typeof $option.onColorChange == 'function')
                $option.onColorChange($ele, colorObj);
        },
        onColorChange: function ($ele, colorObj) {

        },
        positionCallback: function ($elm) {

        },
    };
    return $.extend(colorPickerOption, $option);
}

const ExternalFileDoms = {
    backgroundtab: EasyLibrary.ReadDOM("setting/backgroundtab", false),
};
function UpdateTargets(targetParent, targetElem, libraryname) {
    let targets = targetParent.is(targetElem) ? targetElem : $(targetParent).find(targetElem);
    if (targets.length == 0) {
        console.error(`${libraryname} => target does not exists`);
        return { exists: false, target: targets };
    }
    return { exists: true, target: targets };
}

(function ($) {
    "use strict";
    $.fn.AdvanceBackground = function (o) {
        if (typeof o === 'undefined' || typeof o.targetParent === 'undefined') {
            console.error("AdvanceBackground => missing option: targetParent");
            return;
        }
        if (!(o.targetParent instanceof jQuery)) {
            console.error("AdvanceBackground => targetParent should be a jQuery object");
            return;
        }
        if (typeof o === 'undefined' || typeof o.targetElem === 'undefined') {
            console.error("AdvanceBackground => missing option: targetElem");
            return;
        }
        let $self = this,
            targetParent = o.targetParent,
            targetElem = o.targetElem,
            targets = $(targetParent).find(targetElem),
            idSuffix = '_' + Math.floor((Math.random() * 1000) + 100),
            options = ["color", "image"];
        if (typeof o.options !== 'undefined' && o.options && o.options instanceof Array) {
            options = o.options;
        }
        let AdvanceBackground = {
            updateTargets: function () {
                let tar = UpdateTargets(targetParent, targetElem, 'AdvanceBackground');
                targets = tar.target;
                return tar.exists;
            },
            appendBGChangerDOM: function () {
                let bgChDom = ExternalFileDoms.backgroundtab;
                bgChDom = this.fixDomId(bgChDom);
                $self.html(bgChDom);
                let len = options.length;
                for (var i = 0; i < len; i++) {
                    switch (options[i]) {
                        case 'color':
                            AdvanceBackground.setupColorPicker();
                            $('#selBackround' + idSuffix).append('<option value="color">Color</option>');
                            break;
                        case 'image':
                            //AdvanceBackground.setupLayerColorPicker();
                            $('#selBackround' + idSuffix).append('<option value="image">Image</option>');
                            break;
                    }
                }
            },
            setupData: function () {
                this.setupBGImage();
                this.setupBGImageEffect();
                /*this.setShLayer();*/
            },
            setShLayer: function () {
                let $shLayer = targets.eq(0).prev('.shLayer');
                if ($shLayer.length > 0) {
                    $('#chooseColorShaded').css('background-color', $shLayer.css('background-color'));
                    $('#shadedLayerActive' + idSuffix).prop('checked', true);
                    $('#divPickShaded' + idSuffix).show();
                }
            },
            setupBGImage: function () {
                if (!this.updateTargets()) { return; }
                let parentBgImage = $(targets[0]).css('background-image');
                if (typeof (parentBgImage) === 'undefined' || parentBgImage === 'none') {
                    parentBgImage = `${ComposerModulePath}/img/def1.jpg`;
                }
                parentBgImage = parentBgImage.replace('url(', '').replace(')', '').replace(/\"/gi, "");
                $self.find(`#RowBGImageSrc${idSuffix}`).attr('src', parentBgImage);
            },
            setupBGImageEffect: function () {

                let sfEffect = $(targets[0]).attr('data-effect');
                if (typeof sfEffect !== 'undefined') {
                    $self.find(`#bgImageEffect${idSuffix}`).find('option[data-val=' + sfEffect + ']').prop('selected', true);
                }

            },

            setupColorPicker: function () {
                let self = this;
                let colorPickerOption = ColorPickerOption({
                    onColorChange: function ($elm, objColor) {
                        if (typeof o.colorCallBack == 'function')
                            o.colorCallBack(objColor);
                        let colorPickerID = $elm.attr('id');

                        $.each(targets, function (i, target) {
                            $(target).css({
                                'background-color': objColor.bgColor,
                                //'color': objColor.textColor
                            });
                        });

                    }
                });
                $self.find('#chooseColorColBG' + idSuffix).colorPicker(colorPickerOption);
            },
            setupLayerColorPicker: function () {
                let self = this;
                let colorPickerOption = ColorPickerOption({
                    onColorChange: function ($elm, objColor) {
                        let ShTargets;
                        if (targets.hasClass('rowComp')) {
                            ShTargets = targets.find('.shLayerAceptor >.shLayer');
                        } else {
                            ShTargets = targets.find('>.shLayer');
                        }

                        ShTargets.css({
                            'background-color': objColor.bgColor,
                        });


                    }
                });
                $self.find('#chooseColorShaded').colorPicker(colorPickerOption);
            },
            addEventListeners: function () {

                let self = this;
                let bgColor = $(targets[0]).css('background-color');
                let txtColor = $(targets[0]).css('color');
                if (typeof ($(targets[0]).attr('style')) === 'undefined' || typeof (bgColor) === "undefined") {
                    bgColor = "rgba(255, 255, 255, 0)";
                }
                if (typeof ($(targets[0]).attr('style')) === 'undefined' || typeof (txtColor) === "undefined") {
                    txtColor = "rgba(0, 0, 0, 0)";
                }


                //background type
                $self.find(`#selBackround${idSuffix}`).off().on('change', function () {

                    let select = $(this).val();
                    let backgroundColor = '';
                    let backgroundImage = '';
                    switch (select) {
                        case 'none':
                            $self.find(`#divBackColorChoose${idSuffix}`).hide();
                            $self.find(`#divBackImageChoose${idSuffix}`).hide();
                            backgroundColor = '';
                            backgroundImage = '';
                            self.removeBGImage();
                            self.removeBGColor(bgColor, txtColor);
                            break;
                        case 'image':
                            $self.find(`#divBackColorChoose${idSuffix}`).hide();
                            $self.find(`#divBackImageChoose${idSuffix}`).show();

                            backgroundColor = '';
                            backgroundImage = 'image';
                            self.removeBGColor(bgColor, txtColor);
                            break;
                        case 'color':
                            $self.find(`#divBackColorChoose${idSuffix}`).show();
                            $self.find(`#divBackImageChoose${idSuffix}`).hide();
                            backgroundColor = 'color';
                            backgroundImage = '';
                            self.removeBGImage();
                            break;
                    }
                    $.each(targets, function (i, target) {
                        $(target).attr('data-backgroundColor', backgroundColor);
                        $(target).attr('data-backgroundImage', backgroundImage);
                    });
                });
                //image change event
                $self.find(`#RowBGImage${idSuffix}`).off().on('click', function () {

                    let $this = $(this);
                    $this.SageMedia({
                        userModuleID: MailEditorUserModuleID,
                        onSelect: function (src, response, type, filename, extension) {
                            src = src.replace(/\\/g, '/');
                            //$this.attr('src', src);
                            $self.find(`#RowBGImageSrc${idSuffix}`).attr('src', src);
                            $.each(targets, function (i, target) {
                                $(target).css({
                                    'background-image': 'url("' + CurrentHostURL + src + '")'
                                });
                            });
                        },
                        mediaType: 'image'
                    });
                });
                //image effects
                $self.find(`#bgImageEffect${idSuffix}`).off().on('change', function () {
                    self.updateTargets();
                    let effectType = $(`#bgImageEffect${idSuffix}`).find('option:selected').attr('data-val');
                    let newEffect = JSON.parse($(this).val());
                    $.each(targets, function (i, target) {
                        $(target).css(newEffect).attr('data-effect', effectType);
                    });
                });
                //shaded layer
                $self.find(`#shadedLayerActive${idSuffix}`).off().on('change', function () {
                    if ($(this).is(':checked')) {
                        self.addShaddedLayer();
                    } else {
                        self.removeShaddedLayer();
                    }
                });

                $self.find(`#chooseColorColBG${idSuffix}`).css({
                    'background-color': bgColor,
                    'color': txtColor
                });
                let backgroundColor = $(targets[0]).attr('data-backgroundColor');
                let backgroundImage = $(targets[0]).attr('data-backgroundImage');
                let selected = 'none';
                if (typeof (backgroundColor) !== 'undefined' && backgroundColor.length > 0) {
                    selected = 'color';
                }
                else if (typeof (backgroundImage) !== 'undefined' && backgroundImage.length > 0) {
                    selected = 'image';
                    self.setupBGImageEffect();
                }
                $self.find(`#selBackround${idSuffix}`).val(selected);
                $self.find(`#selBackround${idSuffix}`).trigger('change');
            },
            addShaddedLayer: function () {
                /* $('#divPickShaded' + idSuffix).show();*/
                let ShLayerDOM = '<div class="shLayer" style="position:absolute;width:100%;height:100%;background-color:#06060642;left:0;top:0;"></div>';
                if (targets.find('.shLayer').length == 0 && !targets.hasClass('mailTemplateBody')) {
                    if (targets.hasClass('rowComp'))
                        targets.find('>.shLayerAceptor').css('position', 'relative').prepend(ShLayerDOM);
                    else
                        targets.css('position', 'relative').prepend(ShLayerDOM);
                }
            },
            removeShaddedLayer: function () {
                $('#divPickShaded' + idSuffix).hide();
                if (!targets.hasClass('mailTemplateBody')) {
                    if (targets.hasClass('rowComp')) {
                        targets.find('.shLayerAceptor >.shLayer').remove();
                        targets.find('.shLayerAceptor').css('position', '');
                    } else {
                        targets.find('>.shLayer').remove();
                        targets.css('position', '');
                    }
                }

            },
            removeBGImage: function () {
                $.each(targets, function (i, target) {
                    $(target).css({
                        'background-image': '',
                        'background-size': '',
                        'background-attachment': '',
                        'background-repeat': ''
                    }).attr('data-effect', 'None');
                });
                this.removeShaddedLayer();
            },
            removeBGColor: function (bgColor, txtColor) {

                $.each(targets, function (i, target) {
                    $(target).css({ 'background-color': '', 'color': '' });
                });
                $self.find(`#chooseColorColBG${idSuffix}`).css({ 'background-color': bgColor, 'color': txtColor });
            },

            fixDomId: function (dom) {
                let ids = ['selBackround', 'divBackColorChoose', 'chooseColorColBG', 'divBackImageChoose', 'RowBGImage', 'bgImageEffect', 'shadedLayerActive', 'divPickShaded', 'RowBGImageSrc'];
                let $dom = $(dom);
                for (let i = 0, j = ids.length; i < j; i++) {
                    $dom.find('#' + ids[i]).removeAttr('id').attr('id', ids[i] + idSuffix);
                }
                $dom.find("label[for='shadedLayerActive']").attr('for', 'shadedLayerActive' + idSuffix);
                return $dom[0];
            },
            init: function () {
                this.appendBGChangerDOM();
                this.updateTargets();
                this.setupData();
                this.addEventListeners();

            }
        };
        AdvanceBackground.init();
    };
}(jQuery));
(function ($) {
    "use strict";
    $.fn.AdvanceSpacing = function (o) {
        if (typeof o === 'undefined' || typeof o.targetParent === 'undefined') {
            console.error("AdvanceSpacing => missing option: targetParent");
            return;
        }
        if (!(o.targetParent instanceof jQuery)) {
            console.error("AdvanceSpacing => targetParent should be a jQuery object");
            return;
        }
        if (typeof o === 'undefined' || typeof o.targetElem === 'undefined') {
            console.error("AdvanceSpacing => missing option: targetElem");
            return;
        }
        let $self = this,
            targetParent = o.targetParent,
            targetElem = o.targetElem,
            targets = $(targetParent).find(targetElem),
            saveClasses = false,
            idSuffix = '_' + Math.floor((Math.random() * 1000) + 100),
            options = {
                "margin": {
                    "max": 100,
                    "min": 0,
                    "times": 1,
                    "position": ["all", "top", "left", "bottom", "right"]
                },
                "padding": {
                    "max": 100,
                    "min": 0,
                    "times": 1,
                    "position": ["all", "top", "left", "bottom", "right"]
                }
            };

        if (typeof o.options !== 'undefined' && o.options) {
            options = o.options;
            if (typeof options.margin !== 'undefined' && options.margin.min < 0)
                options.margin.min = 0;

        }

        if (options.margin && Object.keys(options.margin).indexOf("label") == -1) {
            options.margin.label = 'Outer Spacing/Margin';
        }
        if (options.padding && Object.keys(options.padding).indexOf("label") == -1) {
            options.padding.label = 'Inner Spacing/Padding';
        }
        let tar = UpdateTargets(targetParent, targetElem, 'AdvanceBackground');
        targets = tar.target;
        if (!tar.exists)
            return;
        let $target0 = targets.eq(0);
        let marginHelper = {
            top: {
                id: 'mrTopSlider' + idSuffix,
                initVal: getInitVal('margin-top'),
                present: false,
                onChange: function (space) {
                    advSpacing.changeStyle('margin-top', space, false, true);
                }
            },
            bottom: {
                id: 'mrBottomSlider' + idSuffix,
                present: false,
                initVal: getInitVal('margin-bottom'),
                onChange: function (space) {
                    advSpacing.changeStyle('margin-bottom', space, false, true);
                }
            },
            left: {
                id: 'mrLeftSlider' + idSuffix,
                initVal: getInitVal('margin-left'),
                present: false,
                onChange: function (space) {
                    advSpacing.changeStyle('margin-left', space, false, true);
                }
            },
            right: {
                id: 'mrRightSlider' + idSuffix,
                present: false,
                initVal: getInitVal('margin-right'),
                onChange: function (space) {
                    advSpacing.changeStyle('margin-right', space, false, true);
                }
            },
            bulk: {
                id: 'mrBulkSlider' + idSuffix,
                present: false,
                initVal: getInitVal('margin'),
                onChange: function (space) {
                    if (marginHelper.top.present) {
                        advSpacing.changeStyle('margin-top', space, false, false);
                        ChangeSliderValue($('#' + marginHelper.top.id), space);
                    }
                    if (marginHelper.bottom.present) {
                        advSpacing.changeStyle('margin-bottom', space, false, false);
                        ChangeSliderValue($('#' + marginHelper.bottom.id), space);
                    }
                    if (marginHelper.left.present) {
                        advSpacing.changeStyle('margin-left', space, false, false);
                        ChangeSliderValue($('#' + marginHelper.left.id), space);
                    }
                    if (marginHelper.right.present) {
                        advSpacing.changeStyle('margin-right', space, false, false);
                        ChangeSliderValue($('#' + marginHelper.right.id), space);
                    }
                }
            }
        };
        let paddingHelper = {
            top: {
                id: 'padTopSlider' + idSuffix,
                initVal: getInitVal('padding-top'),
                present: false,
                onChange: function (space) {
                    advSpacing.changeStyle('padding-top', space, true, true);
                }
            },
            bottom: {
                id: 'padBottomSlider' + idSuffix,
                present: false,
                initVal: getInitVal('padding-bottom'),
                onChange: function (space) {
                    advSpacing.changeStyle('padding-bottom', space, true, true);
                }
            },
            left: {
                id: 'padLeftSlider' + idSuffix,
                initVal: getInitVal('padding-left'),
                present: false,
                onChange: function (space) {
                    advSpacing.changeStyle('padding-left', space, true, true);
                }
            },
            right: {
                id: 'padRightSlider' + idSuffix,
                present: false,
                initVal: getInitVal('padding-right'),
                onChange: function (space) {
                    advSpacing.changeStyle('padding-right', space, true, true);
                }
            },
            bulk: {
                id: 'padBulkSlider' + idSuffix,
                present: false,
                initVal: getInitVal('padding'),
                onChange: function (space) {

                    if (paddingHelper.top.present) {
                        advSpacing.changeStyle('padding-top', space, true, false);
                        ChangeSliderValue($('#' + paddingHelper.top.id), space);
                    }
                    if (paddingHelper.bottom.present) {
                        advSpacing.changeStyle('padding-bottom', space, true, false);
                        ChangeSliderValue($('#' + paddingHelper.bottom.id), space);
                    }
                    if (paddingHelper.left.present) {
                        advSpacing.changeStyle('padding-left', space, true, false);
                        ChangeSliderValue($('#' + paddingHelper.left.id), space);
                    }
                    if (paddingHelper.right.present) {
                        advSpacing.changeStyle('padding-right', space, true, false);
                        ChangeSliderValue($('#' + paddingHelper.right.id), space);
                    }
                }
            }
        };
        function getInitVal(cssKey) {
            let val = $target0.css(cssKey).replace('px', '');
            if (val.match(/\s/g))
                return 0;
            else
                return val;
        }
        let advSpacing = {
            init: function () {
                this.createSpacingDOM();
                this.createMarginSliders();
                this.createPaddingSliders();
            },
            changeStyle: function (CssKey, Value, IsPadding, IsNotBulk) {
                if (IsPadding) {
                    if (paddingHelper.bulk.present && IsNotBulk) {
                        ChangeSliderValue($('#' + paddingHelper.bulk.id), 0);
                    }
                    Value = (Value * options.padding.times) + 'px';

                } else {
                    if (marginHelper.bulk.present && IsNotBulk) {
                        ChangeSliderValue($('#' + marginHelper.bulk.id), 0);
                    }
                    Value = (Value * options.margin.times) + 'px';
                }

                targets.css(CssKey, Value);
            },
            wrapByFldRowDOM: function (dom) {
                return `<div class="field-row stElWrap col100">${dom}</div>`;
            },
            createSpacingDOM: function () {
                let outerDOM = '';
                let innerDOM = '';
                if (typeof (options) !== 'undefined') {
                    let $options = options;
                    let spaceOption = Object.keys($options);
                    let spaceOptionLength = spaceOption.length;
                    for (let j = 0; j < spaceOptionLength; j++) {
                        let $sp = spaceOption[j];
                        switch ($sp) {
                            case 'margin':
                                outerDOM += DOMCreate('label', $options.margin.label, '', 'OuterSpacingWrap', '');
                                outerDOM = `<div class="field-row stElWrap col100">${outerDOM}</div>`;
                                if (typeof ($options['margin']['position'] !== 'undefined')) {
                                    let positionList = $options['margin']['position'];
                                    let positionListLen = positionList.length;
                                    for (let i = 0; i < positionListLen; i++) {
                                        switch (positionList[i].toLowerCase()) {
                                            case 'all':
                                                outerDOM += this.wrapByFldRowDOM(`<div id="${marginHelper.bulk.id}"></div>`);
                                                marginHelper.bulk.present = true;
                                                break;
                                            case 'top':
                                                outerDOM += this.wrapByFldRowDOM(`<div id="${marginHelper.top.id}"></div>`);
                                                marginHelper.top.present = true;
                                                break;
                                            case 'right':
                                                outerDOM += this.wrapByFldRowDOM(`<div id="${marginHelper.right.id}"></div>`);
                                                marginHelper.right.present = true;
                                                break;
                                            case 'bottom':
                                                outerDOM += this.wrapByFldRowDOM(`<div id="${marginHelper.bottom.id}"></div>`);
                                                marginHelper.bottom.present = true;
                                                break;
                                            case 'left':
                                                outerDOM += this.wrapByFldRowDOM(`<div id="${marginHelper.left.id}"></div>`);
                                                marginHelper.left.present = true;
                                                break;
                                        }
                                    }
                                }
                                outerDOM = FieldRowDOMCreate(outerDOM);
                                break;
                            case 'padding':
                                innerDOM += DOMCreate('label', $options.padding.label, '', 'InnerSpacingWrap', '');
                                innerDOM = `<div class="field-row stElWrap col100">${innerDOM}</div>`;
                                if (typeof ($options['padding']['position'] !== 'undefined')) {
                                    let positionList = $options['padding']['position'];
                                    let positionListLen = positionList.length;
                                    for (let i = 0; i < positionListLen; i++) {
                                        switch (positionList[i].toLowerCase()) {
                                            case 'all':
                                                innerDOM += this.wrapByFldRowDOM(`<div id="${paddingHelper.bulk.id}"></div>`);
                                                paddingHelper.bulk.present = true;
                                                break;
                                            case 'top':
                                                innerDOM += this.wrapByFldRowDOM(`<div id="${paddingHelper.top.id}"></div>`);
                                                paddingHelper.top.present = true;
                                                break;
                                            case 'right':
                                                innerDOM += this.wrapByFldRowDOM(`<div id="${paddingHelper.right.id}"></div>`);
                                                paddingHelper.right.present = true;
                                                break;
                                            case 'bottom':
                                                innerDOM += this.wrapByFldRowDOM(`<div id="${paddingHelper.bottom.id}"></div>`);
                                                paddingHelper.bottom.present = true;
                                                break;
                                            case 'left':
                                                innerDOM += this.wrapByFldRowDOM(`<div id="${paddingHelper.left.id}"></div>`);
                                                paddingHelper.left.present = true;
                                                break;
                                        }
                                    }
                                }
                                innerDOM = FieldRowDOMCreate(innerDOM);
                                break;
                        }
                    }
                }
                $($self).html(outerDOM + innerDOM);
            },
            createMarginSliders: function () {
                let pos = Object.keys(marginHelper);
                $.each(pos, function (i, v) {
                    let helper = marginHelper[v];
                    if (helper.present) {
                        $('#' + helper.id).AdvanceSageSlider(options.margin.min, options.margin.max, v, helper.initVal, helper.onChange, $self, 'px', null);
                    }
                });
            },
            createPaddingSliders: function () {
                let pos = Object.keys(paddingHelper);
                $.each(pos, function (i, v) {
                    let helper = paddingHelper[v];
                    if (helper.present) {
                        $('#' + helper.id).AdvanceSageSlider(options.padding.min, options.padding.max, v, helper.initVal, helper.onChange, $self, 'px', null);
                    }
                });
            }
        };
        advSpacing.init();
    };
}(jQuery));
(function ($) {
    "use strict";
    $.fn.AdvanceBorder = function (o) {
        if (typeof o === 'undefined' || typeof o.targetParent === 'undefined') {
            console.error("AdvanceBorder => missing option: targetParent");
            return;
        }
        if (!(o.targetParent instanceof jQuery)) {
            console.error("AdvanceBorder => targetParent should be a jQuery object");
            return;
        }
        if (typeof o === 'undefined' || typeof o.targetElem === 'undefined') {
            console.error("AdvanceBorder => missing option: targetElem");
            return;
        }
        let $self = this,
            targetParent = o.targetParent,
            targetElem = o.targetElem,
            targets = $(targetParent).find(targetElem),
            saveClasses = false,
            idSuffix = '_' + Math.floor((Math.random() * 1000) + 100),
            options = {
                "max": 20,
                "min": 0,
                "times": 1,
                "position": ["all", "top", "right", "bottom", "left"],
            };

        if (typeof o.options !== 'undefined' && o.options) {
            options = $.extend(options, o.options);
        }

        let tar = UpdateTargets(targetParent, targetElem, 'AdvanceBackground');
        targets = tar.target;
        if (!tar.exists)
            return;
        let $target0 = targets.eq(0);

        let borderHelper = {
            top: {
                id: 'brdrTopSlider' + idSuffix,
                val: getInitVal('border-top-width'),
                present: false,
                onChange: function (space) {
                    borderHelper.top.val = space * options.times;
                    advBorder.changeStyle(true);
                }
            },
            bottom: {
                id: 'brdrBottomSlider' + idSuffix,
                present: false,
                val: getInitVal('border-bottom-width'),
                onChange: function (space) {
                    borderHelper.bottom.val = space * options.times;
                    advBorder.changeStyle(true);
                }
            },
            left: {
                id: 'brdrLeftSlider' + idSuffix,
                val: getInitVal('border-left-width'),
                present: false,
                onChange: function (space) {
                    borderHelper.left.val = space * options.times;
                    advBorder.changeStyle(true);
                }
            },
            right: {
                id: 'brdrRightSlider' + idSuffix,
                present: false,
                val: getInitVal('border-right-width'),
                onChange: function (space) {
                    borderHelper.right.val = space * options.times;
                    advBorder.changeStyle(true);
                }
            },
            bulk: {
                id: 'brdrBulkSlider' + idSuffix,
                present: false,
                val: getInitVal('border-width'),
                onChange: function (space) {
                    let brdr = space * options.times;
                    borderHelper.top.val = brdr;
                    borderHelper.bottom.val = brdr;
                    borderHelper.left.val = brdr;
                    borderHelper.right.val = brdr;
                    if (borderHelper.top.present) {
                        ChangeSliderValue($('#' + borderHelper.top.id), space);
                    }
                    if (borderHelper.bottom.present) {
                        ChangeSliderValue($('#' + borderHelper.bottom.id), space);
                    }
                    if (borderHelper.left.present) {
                        ChangeSliderValue($('#' + borderHelper.left.id), space);
                    }
                    if (borderHelper.right.present) {
                        ChangeSliderValue($('#' + borderHelper.right.id), space);
                    }
                    advBorder.changeStyle(false);
                }
            }
        };

        function getInitVal(cssKey) {
            let val = $target0.css(cssKey).replace('px', '');
            if (val.match(/\s/g))
                return 0;
            else
                return val;
        }
        let advBorder = {
            borderStyleID: `borderStyles${idSuffix}`,
            init: function () {
                this.createDOM();
                this.createBorderSliders();
                this.createColorPicker();
                this.bindBorderStylesEvent();
            },
            changeStyle: function (IsNotBulk) {
                if (borderHelper.bulk.present && IsNotBulk) {
                    ChangeSliderValue($(borderHelper.bulk.id), 0);
                }
                targets.css({
                    'border-top-width': borderHelper.top.val + 'px',
                    'border-right-width': borderHelper.right.val + 'px',
                    'border-bottom-width': borderHelper.bottom.val + 'px',
                    'border-left-width': borderHelper.left.val + 'px',
                });
            },
            createDOM: function () {
                let borderDOM = '';
                if (typeof (options) !== 'undefined') {
                    if (typeof (options['position'] !== 'undefined')) {
                        borderDOM = `<div class="field-row stElWrap col50-50">
                               <label class="fCol">Border Style</label>
                               <span class="fCol TxAl-r select__box">
                                  <select class="BorderStyle" id="${this.borderStyleID}">
                                     <option value="none">None</option>
                                     <option value="solid">Solid</option>
                                     <option value="dashed">Dashed</option>
                                     <option value="dotted">Dotted</option>
                                     <option value="double">Double</option>
                                  </select>
                               </span>
                          </div><div id="advBordersCollections" style="display:none">`;

                        let positionList = options['position'];
                        let positionListLen = positionList.length;
                        for (let i = 0; i < positionListLen; i++) {
                            switch (positionList[i].toLowerCase()) {
                                case 'all':
                                    borderDOM += this.getBorderSliderDOM(borderHelper.bulk.id, 'bulk');
                                    borderHelper.bulk.present = true;
                                    break;
                                case 'top':
                                    borderDOM += this.getBorderSliderDOM(borderHelper.top.id, 'top');
                                    borderHelper.top.present = true;
                                    break;
                                case 'right':
                                    borderDOM += this.getBorderSliderDOM(borderHelper.right.id, 'right');
                                    borderHelper.right.present = true;
                                    break;
                                case 'bottom':
                                    borderDOM += this.getBorderSliderDOM(borderHelper.bottom.id, 'bottom');
                                    borderHelper.bottom.present = true;
                                    break;
                                case 'left':
                                    borderDOM += this.getBorderSliderDOM(borderHelper.left.id, 'left');
                                    borderHelper.left.present = true;
                                    break;
                            }
                        }
                        borderDOM += '</div>';
                    }
                }
                $($self).html(borderDOM);
            },
            getBorderSliderDOM: function (id, type) {
                return `<div class="field-row stElWrap col90-10">
                        <div id="${id}"></div>
                        <span class="color-picker-holder fCol Tx-A-r advBorderColorChoose" data-type="${type}"></span>
                        </div>`;
            },
            createBorderSliders: function () {
                let pos = Object.keys(borderHelper);
                $.each(pos, function (i, v) {
                    let helper = borderHelper[v];
                    if (helper.present) {
                        $('#' + helper.id).AdvanceSageSlider(options.min, options.max, v + ' border', helper.val, helper.onChange, $self, 'px', null);
                    }
                });
            },
            createColorPicker: function () {
                let types = Object.keys(borderHelper);
                $.each(types, function (i, v) {
                    if (borderHelper[v].present)
                        advBorder.initColorValue(v);
                });
                let $colorsPickers = $self.find('.advBorderColorChoose');
                if ($colorsPickers.length > 0) {
                    let colorPickerOption = ColorPickerOption({
                        onColorChange: function ($elm, objColor) {
                            if (typeof o.colorCallBack == 'function')
                                o.colorCallBack(objColor);
                            let type = $elm.attr('data-type');
                            if (type == 'bulk') {
                                targets.css('border-color', objColor.bgColor);
                                $colorsPickers.css('background-color', objColor.bgColor);
                            } else {
                                targets.css('border-' + type + '-color', objColor.bgColor);
                            }
                        }
                    });
                    $colorsPickers.each(function () {
                        $(this).colorPicker(colorPickerOption);
                    });

                }
            },
            initColorValue: function (type) {
                if (type == 'bulk')
                    $('.advBorderColorChoose[data-type="' + type + '"]').css('background-color', $target0.css('border-color'));
                else
                    $('.advBorderColorChoose[data-type="' + type + '"]').css('background-color', $target0.css('border-' + type + '-color'));
            },
            bindBorderStylesEvent: function () {
                $('#' + this.borderStyleID).off('change').on('change', function () {
                    let val = $(this).val();
                    targets.css('border-style', val);
                    advBorder.changeStyle(true);
                    if (val == 'none') {
                        $('#advBordersCollections').hide();
                    } else {
                        $('#advBordersCollections').show();
                    }
                });
                $('#' + this.borderStyleID).val($target0.css('border-style')).trigger('change');
            },
        };
        advBorder.init();
    };
}(jQuery));
(function ($) {
    "use strict";
    $.fn.AdvanceBoxRadius = function (o) {
        if (typeof o === 'undefined' || typeof o.targetParent === 'undefined') {
            console.error("Advance Box Radius => missing option: targetParent");
            return;
        }
        if (!(o.targetParent instanceof jQuery)) {
            console.error("Advance Box Radius => targetParent should be a jQuery object");
            return;
        }
        if (typeof o === 'undefined' || typeof o.targetElem === 'undefined') {
            console.error("Advance Box Radius => missing option: targetElem");
            return;
        }
        let $self = this,
            targetParent = o.targetParent,
            targetElem = o.targetElem,
            targets = $(targetParent).find(targetElem),
            saveClasses = false,
            idSuffix = '_' + Math.floor((Math.random() * 1000) + 100),
            options = {
                "max": 50,
                "min": 0,
                "times": 1,
                "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
            };

        if (typeof o.options !== 'undefined' && o.options) {
            options = o.options;
        }

        let tar = UpdateTargets(targetParent, targetElem, 'AdvanceBackground');
        targets = tar.target;
        if (!tar.exists)
            return;
        let $target0 = targets.eq(0);
        let bxRdsHelper = {
            top_left: {
                id: 'top_leftBoxRSlider' + idSuffix,
                initVal: getInitVal('border-top-left-radius'),
                present: false,
                onChange: function (space) {
                    advBxRadius.changeStyle('border-top-left-radius', space, true);
                }
            },
            top_right: {
                id: 'top_rightBoxRSlider' + idSuffix,
                present: false,
                initVal: getInitVal('border-top-right-radius'),
                onChange: function (space) {
                    advBxRadius.changeStyle('border-top-right-radius', space, true);
                }
            },
            bottom_left: {
                id: 'bottom_leftBoxRSlider' + idSuffix,
                initVal: getInitVal('border-bottom-left-radius'),
                present: false,
                onChange: function (space) {
                    advBxRadius.changeStyle('border-bottom-left-radius', space, true);
                }
            },
            bottom_right: {
                id: 'bottom_rightBoxRSlider' + idSuffix,
                present: false,
                initVal: getInitVal('border-bottom-right-radius'),
                onChange: function (space) {
                    advBxRadius.changeStyle('border-bottom-right-radius', space, true);
                }
            },
            bulk: {
                id: 'bulkBoxRSlider' + idSuffix,
                present: false,
                initVal: getInitVal('border-radius'),
                onChange: function (space) {
                    if (bxRdsHelper.top_left.present) {
                        advBxRadius.changeStyle('border-top-left-radius', space, false);
                        ChangeSliderValue($('#' + bxRdsHelper.top_left.id), space);
                    }
                    if (bxRdsHelper.top_right.present) {
                        advBxRadius.changeStyle('border-top-right-radius', space, false);
                        ChangeSliderValue($('#' + bxRdsHelper.top_right.id), space);
                    }
                    if (bxRdsHelper.bottom_left.present) {
                        advBxRadius.changeStyle('border-bottom-left-radius', space, false);
                        ChangeSliderValue($('#' + bxRdsHelper.bottom_left.id), space);
                    }
                    if (bxRdsHelper.bottom_right.present) {
                        advBxRadius.changeStyle('border-bottom-right-radius', space, false);
                        ChangeSliderValue($('#' + bxRdsHelper.bottom_right.id), space);
                    }
                }
            }
        };

        function getInitVal(cssKey) {
            let val = $target0.css(cssKey).replace('px', '');
            if (val.match(/\s/g))
                return 0;
            else
                return val;
        }
        let advBxRadius = {
            init: function () {
                this.createDOM();
                this.createSliders();
            },
            changeStyle: function (CssKey, Value, IsNotBulk) {
                if (bxRdsHelper.bulk.present && IsNotBulk) {
                    ChangeSliderValue($(bxRdsHelper.bulk.id), 0);
                }
                Value = (Value * options.times) + 'px';
                targets.css(CssKey, Value);
            },
            createDOM: function () {
                let borderDOM = '';
                if (typeof (options) !== 'undefined') {
                    if (typeof (options['position'] !== 'undefined')) {
                        let positionList = options['position'];
                        let positionListLen = positionList.length;
                        for (let i = 0; i < positionListLen; i++) {
                            switch (positionList[i].toLowerCase()) {
                                case 'all':
                                    borderDOM += this.getSliderDOM(bxRdsHelper.bulk.id);
                                    bxRdsHelper.bulk.present = true;
                                    break;
                                case 'top-left':
                                    borderDOM += this.getSliderDOM(bxRdsHelper.top_left.id);
                                    bxRdsHelper.top_left.present = true;
                                    break;
                                case 'top-right':
                                    borderDOM += this.getSliderDOM(bxRdsHelper.top_right.id);
                                    bxRdsHelper.top_right.present = true;
                                    break;
                                case 'bottom-left':
                                    borderDOM += this.getSliderDOM(bxRdsHelper.bottom_left.id);
                                    bxRdsHelper.bottom_left.present = true;
                                    break;
                                case 'bottom-right':
                                    borderDOM += this.getSliderDOM(bxRdsHelper.bottom_right.id);
                                    bxRdsHelper.bottom_right.present = true;
                                    break;
                            }
                        }

                    }
                }
                $($self).html(borderDOM);
            },
            getSliderDOM: function (id) {
                return `<div class="field-row stElWrap col100">
                         <div id="${id}"></div>
                        </div>`;
            },
            createSliders: function () {
                let pos = Object.keys(bxRdsHelper);
                $.each(pos, function (i, v) {
                    let helper = bxRdsHelper[v];
                    if (helper.present) {
                        $('#' + helper.id).AdvanceSageSlider(options.min, options.max, v.replace('_', '-'), helper.initVal, helper.onChange, $self, 'px', null);
                    }
                });
            },

        };
        advBxRadius.init();
    };
}(jQuery));
(function ($) {
    "use strict";
    $.fn.AdvanceBoxShadow = function (o) {
        if (typeof o === 'undefined' || typeof o.targetParent === 'undefined') {
            console.error("Advance Box Shadow => missing option: targetParent");
            return;
        }
        if (!(o.targetParent instanceof jQuery)) {
            console.error("Advance Box Shadow => targetParent should be a jQuery object");
            return;
        }
        if (typeof o === 'undefined' || typeof o.targetElem === 'undefined') {
            console.error("Advance Box Shadow => missing option: targetElem");
            return;
        }
        let $self = this,
            targetParent = o.targetParent,
            targetElem = o.targetElem,
            targets = $(targetParent).find(targetElem),
            saveClasses = false,
            idSuffix = '_' + Math.floor((Math.random() * 1000) + 100);

        let tar = UpdateTargets(targetParent, targetElem, 'advance box shadow');
        targets = tar.target;
        if (!tar.exists)
            return;
        let $target0 = targets.eq(0);
        let objBoxShadow = {
            'inset': false,
            'horizontal': '0px',
            'vertical': '1px',
            'blur': '5px',
            'color': 'rgb(0, 0, 0)',
        };
        let bxShHelper = {
            horizontal_length: {
                min: -100,
                max: 100,
                initVal: 0,
                id: 'bxhorizontal_length' + idSuffix,
                onChange: function (space) {
                    objBoxShadow.horizontal = space + 'px';
                    advBxShadow.changeStyle();
                }
            },
            vertical_length: {
                min: -100,
                max: 100,
                initVal: 1,
                id: 'bxvertical_length' + idSuffix,
                onChange: function (space) {
                    objBoxShadow.vertical = space + 'px';
                    advBxShadow.changeStyle();
                }
            },
            blur_radius: {
                min: 0,
                max: 100,
                initVal: 5,
                id: 'bxblur_radius' + idSuffix,
                onChange: function (space) {
                    objBoxShadow.blur = space + 'px';
                    advBxShadow.changeStyle();
                }
            },
        };

        let advBxShadow = {
            init: function () {
                this.getInitValue();
                this.createDOM();
                this.createSliders();
                this.addEventListeners();
                this.createColorPicker();
            },
            getInitValue: function () {
                let bxShadow = $target0.css('box-shadow');
                if (bxShadow !== 'none') {

                    let colorMath = bxShadow.match(/^rgba{0,1}\(.+?\)/g);
                    if (colorMath != null)
                        objBoxShadow.color = colorMath[0];
                    bxShadow = bxShadow.replace(/^rgba{0,1}\(.+?\)/g, '');
                    bxShadow = $.trim(bxShadow).split(' ');
                    objBoxShadow.length = bxShadow[0];
                    objBoxShadow.vertical = bxShadow[1];
                    objBoxShadow.blur = bxShadow[2];
                    if (bxShadow.length == 5)
                        objBoxShadow.inset = true;
                    bxShHelper.blur_radius.initVal = objBoxShadow.blur.replace('px', '');
                    bxShHelper.horizontal_length.initVal = objBoxShadow.length.replace('px', '');
                    bxShHelper.vertical_length.initVal = objBoxShadow.vertical.replace('px', '');

                }
            },
            changeStyle: function () {
                let insetVal = '';
                if (objBoxShadow.inset)
                    insetVal = ' inset';
                targets.css('box-shadow', objBoxShadow.color + ' ' + objBoxShadow.horizontal + ' ' + objBoxShadow.vertical + ' ' + objBoxShadow.blur + insetVal);
            },
            createDOM: function () {
                let DOM = '';
                let sliders = Object.keys(bxShHelper);
                DOM += GetToggleSwitchDom('Activate Box Shadow', 'chkActiveAdvanceBxShadow');
                DOM += '<div id="divBxShadowCollections" style="display:none;">';
                $.each(sliders, function (i, v) {
                    DOM += `<div class="field-row stElWrap col100">
                                 <div id="${bxShHelper[v].id}"></div>
                           </div>`;
                });
                DOM += `<div class="field-row stElWrap col50-50">
                        <label class="fCol">Shadow Color</label>
                        <div class="fCol TxAl-r">
                        <span class="color-picker-holder shadowColor" id="advBxshadowColor" ></span>
                        </div></div>`;
                DOM += GetToggleSwitchDom('Inset', 'chkActiveBxShadowInset');
                DOM += '</div>';
                $($self).html(DOM);
            },
            createSliders: function () {
                let pos = Object.keys(bxShHelper);
                $.each(pos, function (i, v) {
                    let helper = bxShHelper[v];
                    $('#' + helper.id).AdvanceSageSlider(helper.min, helper.max, v.replace('_', ' '), helper.initVal, helper.onChange, $self, 'px', null);
                });
            },
            createColorPicker: function () {
                let colorOptions = ColorPickerOption({
                    onColorChange: function ($ele, objColor) {
                        objBoxShadow.color = objColor.bgColor;
                        advBxShadow.changeStyle();
                    }
                });
                $('#advBxshadowColor').css('background-color', objBoxShadow.color);
                $('#advBxshadowColor').colorPicker(colorOptions);
            },
            addEventListeners: function () {
                $('#chkActiveAdvanceBxShadow').off().on('change', function () {
                    if ($(this).prop('checked')) {
                        $('#divBxShadowCollections').show();
                        advBxShadow.changeStyle();
                    } else {
                        targets.css('box-shadow', '');
                        $('#divBxShadowCollections').hide();
                    }
                });
                if ($target0.css('box-shadow') === 'none')
                    $('#chkActiveAdvanceBxShadow').prop('checked', false).trigger('change');
                else
                    $('#chkActiveAdvanceBxShadow').prop('checked', true).trigger('change');
                $('#chkActiveBxShadowInset').off().on('change', function () {
                    if ($(this).prop('checked')) {
                        objBoxShadow.inset = true;
                        advBxShadow.changeStyle();
                    } else {
                        objBoxShadow.inset = false;
                        advBxShadow.changeStyle();
                    }
                });
                $('#chkActiveBxShadowInset').prop('checked', objBoxShadow.inset);
            }

        };
        advBxShadow.init();
    };
}(jQuery));
(function ($) {
    "use strict";
    $.fn.AdvanceDimension = function (o) {
        if (typeof o === 'undefined' || typeof o.targetParent === 'undefined') {
            console.error("Advance Dimension => missing option: targetParent");
            return;
        }
        if (!(o.targetParent instanceof jQuery)) {
            console.error("Advance Dimension => targetParent should be a jQuery object");
            return;
        }
        if (typeof o === 'undefined' || typeof o.targetElem === 'undefined') {
            console.error("Advance Dimension => missing option: targetElem");
            return;
        }

        let $self = this,
            targetParent = o.targetParent,
            targetElem = o.targetElem,
            targets = $(targetParent).find(targetElem),
            saveClasses = false,
            idSuffix = '_' + Math.floor((Math.random() * 1000) + 100),
            options = {
                min: 0,
                max: 600,
                types: ['width', 'height'],
                wLabel: 'width',
                hLabel: 'height',
                unit: 'px'
            };
        if (typeof o.options !== 'undefined' && o.options)
            options = $.extend(options, o.options);

        let tar = UpdateTargets(targetParent, targetElem, 'Advance Dimension');
        targets = tar.target;
        if (!tar.exists)
            return;
        let $target0 = targets.eq(0);

        let dimensionHelper = {
            width: {
                initVal: getInitVal('width'),
                id: 'advWidthSlider' + idSuffix,
                label: options.wLabel,
                present: false,
                onChange: function (space) {
                    targets.css('width', space + options.unit);
                }
            },
            height: {
                initVal: getInitVal('height'),
                id: 'advHeightSlider' + idSuffix,
                label: options.hLabel,
                present: false,
                onChange: function (space) {
                    targets.css('height', space + options.unit);
                }
            },
        };
        function getInitVal(cssKey) {
            let width = $target0.css(cssKey).replace('px', '');
            if (options.unit == '%') {
                let parentWidth = $target0.parent().css(cssKey).replace('px', '');
                width = parseInt((width / parentWidth) * 100);
            }
            return width;
        }
        let advDimension = {
            ids: {
                ButtonResetHeight: 'btnResetAdvHeight' + idSuffix,
            },
            init: function () {
                this.createDOM();
                this.createSliders();
                this.addEventListeners();
            },

            createDOM: function () {
                let DOM = '';
                let types = options.types;
                if (typeof types !== 'undefined') {
                    $.each(types, function (i, v) {
                        switch (v) {
                            case "height":
                                DOM += `<div class="field-row stElWrap col100">
                                     <div id="${dimensionHelper.height.id}"></div>
                                   </div>`;
                                dimensionHelper.height.present = true;
                                break;
                            case "width":
                                DOM += `<div class="field-row stElWrap col100">
                                      <div id="${dimensionHelper.width.id}"></div>
                                   </div>`;
                                dimensionHelper.width.present = true;
                                break;
                        }
                    });
                    if (dimensionHelper.height.present) {
                        DOM += `<div class="field-row stElWrap col100">
                               <span class="btn-reset" id="${this.ids.ButtonResetHeight}"><i class="fa fa-refresh"></i>Reset Height</div>
                           </div>`;
                    }
                }
                $($self).html(DOM);
            },
            createSliders: function () {
                let pos = Object.keys(dimensionHelper);
                $.each(pos, function (i, v) {
                    let helper = dimensionHelper[v];
                    if (helper.present)
                        $('#' + helper.id).AdvanceSageSlider(options.min, options.max, helper.label, helper.initVal, helper.onChange, $self, options.unit, null);
                });
            },
            addEventListeners: function () {
                if (dimensionHelper.height.present) {

                    $('#' + this.ids.ButtonResetHeight).off().on('click', function () {
                        targets.css('height', '');
                        ChangeSliderValue($('#' + dimensionHelper.height.id), getInitVal('height'));
                    });
                }
            },

        };
        advDimension.init();
    };
}(jQuery));
(function ($) {
    "use strict";
    $.fn.AdvanceTextSetting = function (o) {
        try {
            if (typeof o === 'undefined' || typeof o.targetParent === 'undefined') {
                console.error("Advance Text Setting => missing option: targetParent");
                return;
            }
            if (!(o.targetParent instanceof jQuery)) {
                console.error("Advance Text Setting => targetParent should be a jQuery object");
                return;
            }
            if (typeof o === 'undefined' || typeof o.targetElem === 'undefined') {
                console.error("Advance Text Setting => missing option: targetElem");
                return;
            }
            let $self = this,
                targetParent = o.targetParent,
                targetElem = o.targetElem,
                targets = $(targetParent).find(targetElem),
                saveClasses = false,
                idSuffix = '_' + Math.floor((Math.random() * 1000) + 100),
                options = {
                    size: true,
                    lineheight: true,
                    spacing: true,
                    transform: true,
                    family: true,
                    color: true,
                    style: true,
                    weight: true
                };
            if (typeof o.options !== 'undefined' && o.options)
                options = $.extend(options, o.options);

            let tar = UpdateTargets(targetParent, targetElem, 'Advance Text Setting');
            targets = tar.target;
            if (!tar.exists)
                return;
            let $target0 = targets.eq(0);

            let textHelper = {
                size: {
                    initVal: getInitVal('font-size'),
                    id: 'advFontSizeSlider' + idSuffix,
                    present: false,
                    label: 'font size',
                    min: 5,
                    max: 100,
                    onChange: function (space) {
                        targets.css('font-size', space + 'px');
                    }
                },
                lineheight: {
                    min: 1,
                    max: 100,
                    label: 'line height',
                    initVal: getInitVal('line-height'),
                    id: 'advLineHeightSlider' + idSuffix,
                    present: false,
                    onChange: function (space) {
                        targets.css('line-height', space + 'px');
                    }
                },
                spacing: {
                    min: 0,
                    max: 100,
                    label: 'letter spacing',
                    initVal: getInitVal('letter-spacing'),
                    id: 'advLetterSpaceSlider' + idSuffix,
                    present: false,
                    onChange: function (space) {
                        targets.css('letter-spacing', space + 'px');
                    }
                },

            };
            function getInitVal(cssKey) {
                let val = String($target0.css(cssKey));
                if (val == 'normal')
                    return 1;
                return val.replace('px', '');

            }
            let advTextSetting = {
                ids: {
                    FontFamily: 'slcAdvFontFamily' + idSuffix,
                    TextTransform: 'slcAdvTextTransform' + idSuffix,
                    FontWeight: 'slcAdvFontWeight' + idSuffix,
                    FontStyle: 'slcAdvFontStyle' + idSuffix,
                    TextColor: 'btnAdvTextColor' + idSuffix,
                },
                init: function () {
                    this.createDOM();
                    this.createSliders();
                    this.createColorPicker();
                    this.addEventListeners();
                },

                createDOM: function () {
                    let DOM = '';
                    let sliders = Object.keys(textHelper);
                    $.each(sliders, function (i, v) {
                        if (options[v]) {
                            switch (v) {
                                case "size":
                                    DOM += advTextSetting.getSliderDOM(textHelper.size.id);
                                    textHelper.size.present = true;
                                    break;
                                case "lineheight":
                                    DOM += advTextSetting.getSliderDOM(textHelper.lineheight.id);
                                    textHelper.lineheight.present = true;
                                    break;
                                case "spacing":
                                    DOM += advTextSetting.getSliderDOM(textHelper.spacing.id);
                                    textHelper.spacing.present = true;
                                    break;
                            }
                        }
                    });
                    if (options.transform) {
                        let opt = [{ text: 'None', val: 'none' },
                        { text: 'UPPERCASE', val: 'uppercase' },
                        { text: 'lowercase ', val: 'lowercase' },
                        { text: 'Capitalize', val: 'capitalize' }];
                        DOM += GetSelectDOM(this.ids.TextTransform, 'Text Transform', opt);
                    }
                    if (options.family) {
                        let opt = [];
                        let len = EmailBasicFonts.length;
                        for (let i = 0; i < len; i++) {
                            opt.push({ text: EmailBasicFonts[i].text, val: EmailBasicFonts[i].val, attrs: 'style="font-family:' + EmailBasicFonts[i].val + '"' });
                        }

                        DOM += GetSelectDOM(this.ids.FontFamily, 'Font Family', opt);
                    }
                    if (options.weight) {
                        let opt = [{ text: 'Normal', val: 'normal' },
                        { text: 'Bold', val: 'bold' },
                        { text: 'Lighter', val: 'lighter' }
                        ];
                        DOM += GetSelectDOM(this.ids.FontWeight, 'Font Weight', opt, '');
                    }
                    if (options.style) {
                        let opt = [{ text: 'Normal', val: 'normal' },
                        { text: 'Italic', val: 'italic' },
                        ];
                        DOM += GetSelectDOM(this.ids.FontStyle, 'Font Style', opt, '');
                    }
                    if (options.color) {
                        DOM += `<div class="field-row stElWrap col50-50">
                             <label class="fCol">Font Color </label>
                            <span class="fCol TxAl-r">
                                <span class="color-picker-holder chooseColor" id="${this.ids.TextColor}"></span>
                            </span></div>`;
                    }
                    $($self).html(DOM);
                    $('#' + this.ids.FontFamily).addClass('fonts_select');
                },
                getSliderDOM: function (id) {
                    return `<div class="field-row stElWrap col100">
                                 <div id="${id}"></div>
                          </div>`;
                },

                createSliders: function () {
                    let pos = Object.keys(textHelper);
                    $.each(pos, function (i, v) {
                        let helper = textHelper[v];

                        if (helper.present)
                            $('#' + helper.id).AdvanceSageSlider(helper.min, helper.max, helper.label, helper.initVal, helper.onChange, $self, 'px', null);
                    });
                },
                createColorPicker: function () {
                    if (options.color) {
                        let colorPickerOption = ColorPickerOption({
                            onColorChange: function ($elm, objColor) {
                                if (typeof o.colorCallBack == 'function')
                                    o.colorCallBack(objColor);
                                targets.css('color', objColor.bgColor);
                            }
                        });
                        $('#' + this.ids.TextColor).css('background-color', $target0.css('color'));
                        $('#' + this.ids.TextColor).colorPicker(colorPickerOption);
                    }
                },
                addEventListeners: function () {
                    $('#' + this.ids.FontWeight).off().on('change', function () {
                        targets.css('font-weight', $(this).val());
                    });
                    $('#' + this.ids.FontStyle).off().on('change', function () {
                        targets.css('font-style', $(this).val());
                    });
                    $('#' + this.ids.TextTransform).off().on('change', function () {
                        targets.css('text-transform', $(this).val());
                    });
                    $('#' + this.ids.FontFamily).off().on('change', function () {
                        targets.css('font-family', $(this).val());
                    });
                    $('#' + this.ids.FontWeight).val($target0.css('font-weight'));
                    $('#' + this.ids.FontStyle).val($target0.css('font-style'));
                    $('#' + this.ids.TextTransform).val($target0.css('text-transform'));
                    $('#' + this.ids.FontFamily).val($target0.css('font-family'));

                },

            };
            advTextSetting.init();
        } catch (ex) {
            console.log('Text Setting ' + ex.message);
        }
    };
}(jQuery));
(function ($) {
    "use strict";
    $.fn.AdvanceAlignment = function (o) {
        try {
            if (typeof o === 'undefined' || typeof o.targetParent === 'undefined') {
                console.error("Advance Alignment => missing option: targetParent");
                return;
            }
            if (!(o.targetParent instanceof jQuery)) {
                console.error("Advance Alignment => targetParent should be a jQuery object");
                return;
            }
            if (typeof o === 'undefined' || typeof o.targetElem === 'undefined') {
                console.error("Advance Alignment => missing option: targetElem");
                return;
            }
            let $self = this,
                targetParent = o.targetParent,
                targetElem = o.targetElem,
                targets = $(targetParent).find(targetElem),
                saveClasses = false,
                idSuffix = '_' + Math.floor((Math.random() * 1000) + 100),
                options = ['vertical', 'horizontal'],
                label = { vertical: 'Vertical Alignment', horizontal: 'Horizontal Alignment' };
            if (typeof o.options !== 'undefined' && o.options)
                options = o.options;
            if (typeof o.label !== 'undefined' && o.label)
                label = o.label;
            let tar = UpdateTargets(targetParent, targetElem, 'Advance Alignment');
            targets = tar.target;
            if (!tar.exists)
                return;
            let $target0 = targets.eq(0);
            let alignHelper = {
                horizontal: {
                    id: 'advHorizontalAlign' + idSuffix,
                    present: false,
                    option: [{ class: 'left', cssVal: '"text-align":"left"' },
                    { class: 'center', cssVal: '"text-align":"center"' },
                    { class: 'right', cssVal: '"text-align":"right"' }]
                },
                vertical: {
                    id: 'advVerticalAlign' + idSuffix,
                    present: false,
                    option: [{ class: 'top', cssVal: '"vertical-align":"top"' },
                    { class: 'middle', cssVal: '"vertical-align": "middle"' },
                    { class: 'bottom', cssVal: '"vertical-align":"bottom"' }]
                },
            };

            let advAlignment = {

                init: function () {
                    this.createDOM();
                    this.addEventListeners();
                },

                createDOM: function () {
                    let DOM = '';
                    $.each(options, function (i, v) {
                        switch (v) {
                            case "horizontal":
                                DOM += advAlignment.getAlignToolsDOM(alignHelper.horizontal.id, alignHelper.horizontal.option, label.horizontal);
                                alignHelper.horizontal.present = true;
                                break;
                            case "vertical":
                                DOM += advAlignment.getAlignToolsDOM(alignHelper.vertical.id, alignHelper.vertical.option, label.vertical);
                                alignHelper.vertical.present = true;
                                break;
                        }
                    });
                    $($self).html(DOM);
                },
                getAlignToolsDOM: function (id, alignOpt, label) {
                    let html = `<div class='field-row stElWrap col100'>
                        <label>${label}</label>
                     </div>
                     <div class='field-row stElWrap col100'>
                     <div id='${id}' class='alignSettings'>`;
                    $.each(alignOpt, function (i, v) {
                        html += `<i class='cb-align ${v.class}' data-val='{${v.cssVal}}'></i>`;
                    });
                    html += '</div></div>';
                    return html;
                },
                addEventListeners: function () {
                    if (alignHelper.horizontal.present) {
                        $('#' + alignHelper.horizontal.id + ' i').off().on('click', function () {
                            $('#' + alignHelper.horizontal.id + ' i').removeClass('selected');
                            applyStyle($(this));
                        });
                        let align = $target0.css('text-align');
                        $('#' + alignHelper.horizontal.id).find('i.' + align).addClass('selected');
                    }
                    if (alignHelper.vertical.present) {
                        $('#' + alignHelper.vertical.id + ' i').off().on('click', function () {
                            $('#' + alignHelper.vertical.id + ' i').removeClass('selected');
                            applyStyle($(this));
                        });
                        let align = $target0.css('vertical-align');
                        $('#' + alignHelper.vertical.id).find('i.' + align).addClass('selected');

                    }
                    function applyStyle($this) {
                        $this.addClass('selected');
                        let objStyles = JSON.parse($this.attr('data-val'));
                        targets.css(objStyles);
                    }
                },

            };
            advAlignment.init();
        } catch (ex) {
            console.error('Alignment ' + ex.message);
        }
    };
}(jQuery));
(function ($) {
    "use strict";
    $.fn.AdvanceSorting = function (o) {
        if (typeof o === 'undefined' || typeof o.targetParent === 'undefined') {
            console.error("AdvanceSorting => missing option: targetParent");
            return;
        }
        if (!(o.targetParent instanceof jQuery)) {
            console.error("AdvanceSorting => targetParent should be a jQuery object");
            return;
        }
        if (typeof o === 'undefined' || typeof o.targetElem === 'undefined') {
            console.error("AdvanceSorting => missing option: targetElem");
            return;
        }
        let $this = this,
            targetParent = o.targetParent,
            targetElem = o.targetElem,
            def_sort_opt = {
                placeholder: "ui-state-highlight",
                forcePlaceholderSize: true,
                forceHelperSize: true,
                tolerance: "pointer"
            };
        let sortable_options = $.extend(def_sort_opt, o.sortableOptions);
        if (typeof sortable_options.start === 'undefined') {
            sortable_options.start = function (event, ui) {
                ui.item.startPos = ui.item.index();
            };
        } else {
            sortable_options.activate = function (event, ui) {
                ui.item.startPos = ui.item.index();
            };
        }
        //console.log("sortable_options ", sortable_options);
        if (typeof sortable_options.stop === 'undefined') {
            sortable_options.stop = function (event, ui) {
                let targetElems = targetElem;
                if (Object.prototype.toString.call(targetElem) !== '[object Array]') {
                    targetElems = [targetElem];
                }
                let oldPos = ui.item.startPos;
                let newPos = ui.item.index();
                if (oldPos != newPos) {
                    targetElems.forEach((elm) => {
                        let targets = $(targetParent).find(elm);
                        let $newPosEl = targets.eq(newPos);
                        let $oldPosEl = targets.eq(oldPos);
                        if (oldPos > newPos) {
                            $oldPosEl.insertBefore($newPosEl);
                        } else {
                            $oldPosEl.insertAfter($newPosEl);
                        }
                    });
                }
            };
        }
        $this.sortable(sortable_options);
    };
}(jQuery));
