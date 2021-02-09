/**
 * dependencies:
 * variables.js
 * functions.js
 */
function GenericRemove($ele) {
    $ele.find('.SetHdlr').remove();
    $ele.find('.ui-droppable').each(function () {
        $(this).removeClass('ui-droppable');
    });
    $ele.find('.ui-sortable').each(function () {
        $(this).removeClass('ui-sortable');
    });
    /*remove contenteditable*/
    $ele.find('.editor-para').removeAttr('contenteditable');
    $ele.find('.rowTitleHeading > h1').removeAttr('contenteditable');
    $ele.find('.rowTitleHeading > h1').removeAttr('contenteditable');
    $ele.find('.editor-component > h1').removeAttr('contenteditable');
    $ele.find('.editor-component span').removeAttr('contenteditable');
    $ele.find('.editor-component').removeClass('ui-sortable');
    $ele.find('.editor-component').removeClass('ui-droppable');
    $ele.find('.resizebar').remove();
    $ele.find('.noElement').remove();
    $ele.find('.pagelink.active-page').removeClass('active-page');
    /*to be remove at last*/
    $ele.find('.editor-col').each(function () {
        let $this = $(this);
        $this.removeAttr('data-width');
        $('.editor-col').css({ 'width': '' });
    });
}
function FontawesomeFonts() {
    let html = '';
    $.each(fontawesomeClasses, function (i, fontClass) {
        html += "<li><i class='fa " + fontClass + "' data-class='" + fontClass + "'></i>" + "</li>";
    });
    $('#fontIconCollection').html(html);
}
FontawesomeFonts();

function DOMFontBasicCollection() {
    let basicFontDOM = '';
    let keys = Object.keys(fontCollectionBasics);
    let len = keys.length;
    for (var k = 0; k < len; k++) {
        basicFontDOM += '<option class="f-weight-400 ff-' + fontCollectionBasics[keys[k]].Text.toLowerCase().replace(' ', '') + '" value="' + keys[k] + '" >' + fontCollectionBasics[keys[k]].Text + '</option>';
    }
    return basicFontDOM;
}
function DOMFontAdvanceCollection() {
    let basicFontDOM = '';
    let keys = Object.keys(fontCollectionBasics);
    let len = keys.length;
    for (var k = 0; k < len; k++) {
        basicFontDOM += '<option class="f-weight-400 ff-' + fontCollectionBasics[keys[k]].Text.toLowerCase().replace(' ', '') + '" value="' + keys[k] + '" >' + fontCollectionBasics[keys[k]].Text + '</option>';
    }
    keys = Object.keys(fontCollectionStyling);
    len = keys.length;
    for (var l = 0; l < len; l++) {
        basicFontDOM += '<option class="f-weight-400 ff-' + fontCollectionStyling[keys[l]].Text.toLowerCase().replace(' ', '') + '" value="' + keys[l] + '" >' + fontCollectionStyling[keys[l]].Text + '</option>';
    }
    return basicFontDOM;
}
function DOMFontWeight(fontName) {
    let fontWeightDOM = '';
    let weights = '';
    if (typeof (fontCollectionBasics[fontName.toLowerCase()]) !== "undefined") {
        weights = fontCollectionBasics[fontName.toLowerCase()].weight;
    }
    else {
        weights = fontCollectionStyling[fontName.toLowerCase()].weight;
    }
    let len = weights.length;
    for (var k = 0; k < len; k++) {
        fontWeightDOM += '<option value="' + weights[k] + '" >' + weights[k] + '</option>';
    }
    return fontWeightDOM;
}
function GeneralAlignment($par) {
    let alignmentClasses = $par.attr('class').match(/text-align-[a-z]{4,6}/g);
    let alignClass = '';
    if (alignmentClasses !== null) {
        alignClass = alignmentClasses[0];
    }
    $('.alignmentWrapper').find('i[data-class="' + alignClass + '"]').addClass('selected');
}
function GeneralAlignmentEvent($par) {
    $('.alignmentWrapper i').off().on('click', function () {
        let $this = $(this);
        let alignmentClasses = $par.attr('class').match(/text-align-[a-z]{4,6}/g);
        let alignClass = '';
        if (alignmentClasses !== null) {
            alignClass = alignmentClasses[0];
            $par.removeClass(alignClass);
        }
        $par.addClass($this.attr('data-class'));
        $('.alignmentWrapper i').removeClass('selected');
        $this.addClass('selected');
    });
}
function SageSlider($slider, $sliderHandler, min, max, initialValue, callbackFunction, $parent) {
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
                callbackFunction(space, $parent);
            }
            else if (typeof (callbackFunction) === 'string') {
                window[callbackFunction](space, $parent);
            }
        }
    });
}
function AdvanceSageSlider($slider, $sliderHandler, min, max, initialValue, callbackFunction, $parent, type, ref, stopfunction) {
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
        },
        stop: function (event, ui) {
            let space = ui.value;
            if (typeof (stopfunction) === 'function') {
                stopfunction(space, $parent, ref);
            }
        }
    });
    if (typeof (callbackFunction) === 'function') {
        tempFunction = callbackFunction;
    }
    else if (typeof (callbackFunction) === 'string') {
        tempFunction = window[callbackFunction];
    }
    BuildManualSize($slider, min, max, initialValue, type, tempFunction, $parent, ref, stopfunction);
}
function ChangeSliderValue($slider, newSize) {
    $slider.slider({
        value: newSize
    });
    $slider.slider('option', 'slide');
    $slider.find('> div.ui-slider-handle').text(newSize);
    $slider.slider("enable");
}
function BuildManualSize($sliders, min, max, initialValue, type, tempFunction, $parent, ref, stopfunction) {
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
            if (typeof (stopfunction) === 'function') {
                stopfunction(newSize, $parent, ref);
            }
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
            if (typeof (stopfunction) === 'function') {
                stopfunction(newSize, $parent, ref);
            }
        }
    };
    increaseSize.setAttribute('data-max', max);
    let $sliderHelper = $(DOMCreate('span', '', 'manualSize'));
    $sliderHelper.insertAfter($sliders);
    $sliderHelper.append(decreaseSize);
    $sliderHelper.append(increaseSize);
    $sliderHelper.append(DOMCreate('span', type, 'slider-type'));
}
function PagelinkStop() {
    $('.pagelink').not('.onepage').off().on('click', function (e) {
        let tempName = $(this).find('.pageName').text();
        e.preventDefault();
        SageConfirmDialog(`Are you sure you want to switch to “${tempName}”? All your unsaved data maybe lost.`).done(function () {
            ReloadPageNone();
            let href = SageFrameHostURL + '/WebBuilder' + webBuilderPageExtension + '/' + tempName.replace(/ /g, '-') + CultureURL;
            window.location = href;
        });
    });
    anylinkstop();
}
function anylinkstop() {
    $('.anylinkstop').off('click').on('click', function (e) {
        let $this = $(this);
        let message = $this.attr('data-message');
        e.preventDefault();
        //let href = $this.attr('href');
        //if (typeof href === 'undefined')
        //    href = $this.attr('data-href');
        //if (typeof href !== 'undefined') {
        //    SageConfirmDialog(message).done(function () {
        //        ReloadPageNone();
        //        window.location = href;
        //    });
        //}
    });
}
function ColorPickerOption($option) {
    let objColor = {};
    let colorPickerOption = {
        customBG: '#222',
        margin: '4px -2px 0',
        doRender: 'div div',
        buildCallback: function ($elm) {
            BuildColorPicker($elm, this);
        },
        renderCallback: function ($elm, toggled) {
            let objColor = RenderCallBackColor(this);
            /* Example of implementation*/
            /*var objColor = RenderCallBackColor(this);
            objColor.bgColor
            objColor.textColor
            apply the color logic here
            let colorPickerID = $elm.attr('id');*/
        },
        positionCallback: function ($elm) {

        },
    };
    return $.extend(colorPickerOption, $option);
}
function GetThemeColor() {
    let primaryColor = $('#primaryColor').css('background-color');
    let secondaryColor = $('#secondaryColor').css('background-color');
    let optionalColor = $('#optionalColor').css('background-color');
    let html = DOMCreate('div', '', 'themeColorpicker', '', ['style="background-color: #fff0;"']);
    html += DOMCreate('div', '', 'themeColorpicker', 'primaryChange', ['style="background-color: ' + primaryColor + ';"']);
    html += DOMCreate('div', '', 'themeColorpicker', 'secondaryChange', ['style="background-color: ' + secondaryColor + ';"']);
    html += DOMCreate('div', '', 'themeColorpicker', 'optionalChange', ['style="background-color: ' + optionalColor + ';"']);
    html += DOMCreate('div', '', 'themeColorpicker', '', ['style="background-color: #FFF;"']);
    html += DOMCreate('div', '', 'themeColorpicker', '', ['style="background-color: #000;"']);
    html += DOMCreate('div', '', 'themeColorpicker', '', ['style="background-color: #CCC;"']);
    //html += DOMCreate('div', '', 'themeColorpicker', '', ['style="background-color: #121212;"']);
    // html += DOMCreate('h6', 'Set Color Tranparency');
    html = DOMCreate('div', '<h6>Choose From Theme Colors</h6>' + html, 'themeColorpickerWrapper');
    return html;
}

function BuildColorPicker($element, $thisElem) {
    let colorInstance = $thisElem.color,
        colorPicker = $thisElem;
    /* original DOM
    $element.prepend('<div class="cp-panel">' +
        'R <input type="text" class="cp-r" /><br>' +
        'G <input type="text" class="cp-g" /><br>' +
        'B <input type="text" class="cp-b" /><hr>' +
        'H <input type="text" class="cp-h" /><br>' +
        'S <input type="text" class="cp-s" /><br>' +
        'B <input type="text" class="cp-v" /><hr>' +
        'Paste color code<br>' +
        '<input type="text" class="cp-HEX" />' +
        '</div>').on('change', 'input', function (e) {
            let value = this.value,
                className = this.className,
                type = className.split('-')[1],
                color = {};
            color[type] = value;
            colorInstance.setColor(type === 'HEX' ? value : color,
                type === 'HEX' ? 'HEX' : /(?:r|g|b)/.test(type) ? 'rgb' : 'hsv');
            colorPicker.render();
            this.blur();
        }); */
    $element.append('<div class="cp-panel">' +
        ' <input type="text" class="cp-r Dn" />' +
        ' <input type="text" class="cp-g Dn" />' +
        ' <input type="text" class="cp-b Dn" />' +
        ' <input type="text" class="cp-h Dn" />' +
        ' <input type="text" class="cp-s Dn" />' +
        ' <input type="text" class="cp-v Dn" />' +
        'Paste color code<br>' +
        '<input type="text" class="cp-HEX" />' +
        '</div>').on('change', 'input', function (e) {
            let value = this.value,
                className = this.className,
                type = className.split('-')[1],
                color = {};
            color[type] = value;
            colorInstance.setColor(type === 'HEX' ? value : color,
                type === 'HEX' ? 'HEX' : /(?:r|g|b)/.test(type) ? 'rgb' : 'hsv');
            colorPicker.render();
            this.blur();
        });
    $element.prepend(GetThemeColor());
    $('.themeColorpicker').off().on('click', function () {
        $('.cp-HEX').val($(this).css('background-color'));
        $('.cp-HEX').trigger('change');
    });
}
function RenderCallBackColor($thisElem) {
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
    return colorObj;
}
var sagemedia;
$(function () {
    sagemedia = $(this).SageMedia({
        userModuleID: webBuilderUserModuleID,
        onSelect: function (src, response, type, filename, extension) {

        },
        success: function (resposne) {
            $image.attr('src', resposne.filePath).attr('alt', resposne.alt);
        },
        mediaType: 'image',
        extension: 'png,jpeg,jpg,ico,svg,gif,webp'
    });
});
//function SageMedia($image) {
//    $image.SageMedia({
//        userModuleID: webBuilderUserModuleID,
//        onSelect: function (src, response, type, filename, extension) {

//        },
//        success: function (resposne) {
//            $image.attr('src', resposne.filePath).attr('alt', resposne.alt);
//        },
//        mediaType: 'image',
//        extension: 'png,jpeg,jpg,ico,svg,gif,webp'
//    });
//}
function InitTab() {
    AppendArrowEvent();
    $('.content').hide().filter(':first').show();
    $('#tabs li[data-tabs]').on('click', function () {
        $('#tabs li[data-tabs]').removeClass('active');
        $('.tabcontent').hide();
        let tab = $(this).data('tabs');
        $(this).addClass('active');
        $('#' + tab).fadeIn().show();
        let datatype = $activeDOM.attr("data-type");
        let tabName = $(this).text();
        let settings = $('#tabs').attr("data-settingtype");
        if (EasyLibrary.IsDefined(component[datatype])
            && EasyLibrary.IsDefined(component[datatype][settings])
            && EasyLibrary.IsDefined(component[datatype][settings].tabs)
            && EasyLibrary.IsDefined(component[datatype][settings].tabs[tabName])
            && EasyLibrary.IsDefined(component[datatype][settings].tabs[tabName].active)
        )
            component[datatype][settings].tabs[tabName].active();
    });
    $(".tabs li").click(function () {
        let cur = $(".tabs li").index(this);
        let elm = $('.tabcontent:eq(' + cur + ')');
        elm.addClass("pulse");
        setTimeout(function () {
            elm.removeClass("pulse");
        }, 220);
    });
    $('#tabs li[data-tabs]').eq(0).trigger('click');
}
function SettingEvents($elem) {
    let $comsettings = $('.com-settings');
    let $comStyle = $('.com-style');
    let $comTemp = $('.com-temp');
    let $settingStyle = $('.s-style');
    let $imagesettings = $('.image-settings');
    let $duplicateHolder = $('.duplicateHolder');
    let $manageData = $('.manageData');
    let $settingList = $('.SetHdlr > .stng >.cb-stng');
    let $addtobucket = $('.holder-bucket');
    let $extrasettings = $('.extra-settings');
    if (typeof $elem !== "undefined") {
        $comsettings = $elem.find('.com-settings');
        $comStyle = $elem.find('.com-style');
        $comTemp = $elem.find('.com-temp');
        $settingStyle = $elem.find('.s-style');
        $imagesettings = $elem.find('.image-settings');
        $duplicateHolder = $elem.find('.duplicateHolder');
        $manageData = $elem.find('.manageData');
        $settingList = $elem.find('.SetHdlr > .stng >.cb-stng');
        $addtobucket = $elem.find('.holder-bucket');
        $extrasettings = $elem.find('.extra-settings');
    }
    $extrasettings.off().on('click', function () {
        HidePopUpSetting();
        let $this = $(this);
        let $offset = $this.offset();
        let top = $offset.top;
        let left = $offset.left;
        let height = $this.height();
        $('.activeSetting').removeClass('activeSetting');
        let $parent = $this.closest('.SetHdlr').parent();
        $parent.addClass('activeSetting');
        $activeDOM = $parent;
        let componentType = $this.attr('data-type');
        let type = "extraSettingDOMs";
        let title = componentType;
        if (EasyLibrary.IsDefined($this.attr('data-title')))
            title = $this.attr('data-title');
        PopUpSetting(title, '50%', left, 0, 0, componentType, type, $parent, $this);
        $('.collapse').trigger('click');
    });
    $comsettings.off().on('click', function () {
        HidePopUpSetting();
        let $this = $(this);
        let $offset = $this.offset();
        let top = $offset.top;
        let left = $offset.left;
        let height = $this.height();
        $('.activeSetting').removeClass('.activeSetting');
        let $parent = $this.closest('.SetHdlr').parent();
        $parent.addClass('activeSetting');
        $activeDOM = $parent;
        let componentType = $this.attr('data-type');
        if (EasyLibrary.IsDefined(component[componentType]) && EasyLibrary.IsDefined(component[componentType].inherits)) {
            componentType = component[componentType].inherits;
        }
        let title = componentType;
        if (EasyLibrary.IsDefined($this.attr('data-title')))
            title = $this.attr('data-title');
        let type = "settingDOMs";
        PopUpSetting(title, '50%', left, 0, 0, componentType, type, $parent, $this);
        $('.collapse').trigger('click');
    });
    $settingStyle.off().on('click', function () {
        HidePopUpSetting();
        let $this = $(this);
        let $offset = $this.offset();
        let top = $offset.top;
        let left = $offset.left;
        let height = $this.height();
        $('.activeSetting').removeClass('activeSetting');
        let $parent = $this.closest('.SetHdlr').parent();
        $parent.addClass('activeSetting');
        $activeDOM = $parent;
        let componentType = $this.attr('data-type');
        if (EasyLibrary.IsDefined(component[componentType]) && EasyLibrary.IsDefined(component[componentType].inherits)) {
            componentType = component[componentType].inherits;
        }
        let type = "styleDOMs";
        let title = componentType;
        if (EasyLibrary.IsDefined($this.attr('data-title')))
            title = $this.attr('data-title');
        PopUpSetting(title, '50%', left, 0, 0, componentType, type, $parent, $this);
        $('.collapse').trigger('click');
    });

    $comStyle.off().on('click', function () {
        let $this = $(this);
        let dataType = $this.attr('data-type');
        $('.activeSetting').removeClass('activeSetting');
        let $parent = $this.closest('.SetHdlr').parent();
        $parent.addClass('activeSetting');
        $activeDOM = $parent;
        //var $element = $this.parent().parent();
        //if ($element.hasClass('editor-row-container')) {
        //    if ($element.parent().hasClass('editor-row-shaded-layer')) {
        //        $element = $element.parent().parent();
        //    }
        //    else if ($element.parent().hasClass('editor-row ')) {
        //        $element = $element.parent();
        //    }
        //}
        //else if ($element.hasClass('editor-row-shaded-layer')) {
        //    if ($element.parent().hasClass('editor-row ')) {
        //        $element = $element.parent();
        //    }
        //}
        if (typeof (component[dataType].beforedrop) !== 'undefined') {
            component[dataType].beforedrop($activeDOM.parent(), $activeDOM, false);
        }
    });

    $comTemp.off('click').on('click', function () {
        EasyLibrary.ComponentTemplate($(this).closest('.editor-component'), false);
    });
    $imagesettings.off().on('click', function () {
        let $image = $(this).closest('.editor-component').find('img');
        let media = $image.SageMedia({
            userModuleID: webBuilderUserModuleID,
            onSelect: function (src, response, type, filename, extension) {

            },
            success: function (resposne) {
                $image.attr('src', resposne.filePath.replace(/\/{2,}/g, '/')).attr('alt', resposne.alt);
            },
            mediaType: 'image',
            extension: 'png,jpeg,jpg,ico,svg,gif,webp'
        });
        media.Show();
    });
    $duplicateHolder.off().on('click', function () {
        let $this = $(this);
        $('.activeSetting').removeClass('activeSetting');
        let $parent = $this.closest('.SetHdlr').parent();
        $parent.addClass('activeSetting');
        $activeDOM = $parent;
        //var $copyParent = $this.closest('.editor-component');
        //if ($copyParent.hasClass('editor-row-shaded-layer')) {
        //    $copyParent = $copyParent.parent();
        //}
        let copyAttrs = $activeDOM.attrs();
        let $html = $(DOMCreate('div', $activeDOM.html()));
        $html.insertAfter($activeDOM);
        $html.attrs(copyAttrs);
        $html.removeAttr('data-opscroll').removeClass('activeSetting');
        RowEvents();
        DraggableSortable();
        BindColumnEvents($html);
        CopyPasteEvents($html);
        ChangeIDWithParent($html);
        // $html.find(".holder-bucket").addToBucket();
    });
    EditableSetBreak($elem);
    $settingList.off().on('click', function () {
        $('.activeSetting').removeClass('activeSetting');
        var $this = $(this);
        let $parent = $this.closest('.SetHdlr').parent();
        $parent.addClass('activeSetting');
        $activeDOM = $parent;
        $('.main-left , #popupModel').hide();
        if ($('.active.changePort').hasClass('desktop')) {
            let $this = $(this).parent().parent();
            if ($this.hasClass('active')) {
                $this.removeClass('active');
                $this.find('.setDrp').hide();
            }
            else {
                $('.SetHdlr').removeClass('active');
                $this.addClass('active');
                $('.setDrp').hide();
                $this.find('.setDrp').show();
            }
        }
        else {
            //in other device 
            let componentType = $activeDOM.attr('data-type');
            if (EasyLibrary.IsDefined(component[componentType])) {
                if (EasyLibrary.IsDefined(component[componentType].inherits)) {
                    componentType = component[componentType].inherits;
                }
                let title = componentType;
                if (EasyLibrary.IsDefined($this.attr('data-title')))
                    title = $this.attr('data-title');
                let type = "responsiveDOMs";
                $('#tabs').attr("data-settingtype", type);
                if (component[componentType].row && !EasyLibrary.IsDefined(component[componentType].settingDOMs) && !EasyLibrary.IsDefined(component[componentType].styleDOMs))
                    componentType = 'row';
                PopUpSettingResponsive(title, 0, 0, 0, 0, componentType, type, $activeDOM);
            }
        }
    });
    $manageData.off().on('click', function () {
        let $href = $(this).attr('data-href');
        if (EasyLibrary.IsDefined($href)) {
            window.location = $href;
        }
        else {
            HidePopUpSetting();
            $('.activeSetting').removeClass('activeSetting');
            let $parent = $(this).closest('.SetHdlr').parent();
            $parent.addClass('activeSetting');
            $activeDOM = $parent;
            let $this = $activeDOM;
            let componentType = $this.attr('data-type');
            if (EasyLibrary.IsDefined(component[componentType]) && EasyLibrary.IsDefined(component[componentType].inherits)) {
                componentType = component[componentType].inherits;
            }
            if (EasyLibrary.IsDefined(component[componentType]) && EasyLibrary.IsDefined(component[componentType].managedata)) {
                let option = {
                    heading: "Manage Data",
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
                if (EasyLibrary.IsDefined(component[componentType].managedata.option)) {
                    option = $.extend(option, component[componentType].managedata.option);
                }
                FullPagePopup(option);
            }
        }
    });
    $('.SetHdlr >.mvUp').off().on('click', function () {
        let $child = $(this).parents('.cRow');
        let $parent = $child.parent();
        let total = $parent.find('> .cRow').length;
        let index = $parent.find('> .cRow').index($child);
        if (index > 0 && index < total) {
            $child.insertBefore($child.prev()).animate({}, 5000);
        }
    });
    $('.SetHdlr >.mvDn').off().on('click', function () {
        let $child = $(this).closest('.cRow');
        let $parent = $child.parent();
        let total = $parent.find('> .cRow').length;
        let index = $parent.find('> .cRow').index($child);
        if (index => 0 && index < total) {
            $child.insertAfter($child.next()).animate({}, 5000);
        }
    });
    CopyPlaneText();
    $addtobucket.off('click').on('click', function () {
        $(this).addToBucket();
    });
    DeleteComponent($elem);
}
function ChangeIDWithParent($changeParent) {
    EasyLibrary.GenerateAndAppendID($changeParent);
    $changeParent.find("div[data-id]").each(function ($i, $v) {
        EasyLibrary.GenerateAndAppendID($(this));
    });
}


function UpdateSettingKeyValue(key, value) {
    SecureAjaxCall.PassObject({
        async: false,
        url: `${SageFrameHostURL}/webbuilder/UpdateSettings`,
        data: JSON.stringify({
            Key: key,
            Value: value,
        }),
        success: function () {
            return 1;
        }
    });

}
function PopUpSetting(title, top, left, height, width, componentType, type, $parentRow, $this) {
    let $popUpModel = $('#popupModel');
    $popUpModel.find('.pTitle').text(title);
    if (EasyLibrary.Pinned()) {
        let siteWidth = ScreenDimension().width - $('#popupModel').width();
        $popUpModel.css({ 'top': '0px', 'left': `${siteWidth}px` }).fadeIn(400);
    }
    else {
        let sidebarWidth = $('.editor-box').offset().left;
        let screenWidth = ($('.editor-box').width() - sidebarWidth) / 2;
        let scrPer = screenWidth * 0.1;
        if (left < screenWidth)
            $popUpModel.css({ top: '0%', left: 'auto', right: scrPer + 'px', 'position': 'fixed' }).fadeIn(400);
        else
            $popUpModel.css({ top: '0%', left: (sidebarWidth + scrPer) + 'px', 'position': 'fixed' }).fadeIn(400);
    }
    if (typeof (component[componentType]) === 'undefined') {
        $popUpModel.find('.popup-model-body').html(easyMessageList.componentSettingNotexists);
    }
    else {
        if (typeof (component[componentType][type]) !== 'undefined') {
            BuildSettingDOM(component[componentType], $this, type);
        }
        else if (typeof (component[componentType][type]) !== 'undefined') {
            $popUpModel.find('.popup-model-body').html(component[componentType][type]);
        }
        if (typeof (component[componentType].loadSetting) !== 'undefined') {
            component[componentType].loadSetting($this);
        }
        /* remove the tab there is only one */
        let tabs = $popUpModel.find('#tabs').find('.tabs li').length;
        if (tabs == 1) {
            width = $popUpModel.find('#tabs').find('.tabsWrapper').width();
            $popUpModel.find('#tabs').find('.tabs').remove();
            $('.popup-model').css({ 'width': width });
        }
        else {
            $('.popup-model').css({ 'width': '' });
        }
    }
}
function PopUpSettingResponsive(title, top, left, height, width, componentType, type, $par) {
    let $popUpModel = $('#popupModel');
    $popUpModel.find('.pTitle').text(title);
    let $compo = component[componentType];
    let appendData = '';
    if (EasyLibrary.IsDefined($compo[type]) && EasyLibrary.IsDefined($compo[type].tabs)) {
        let $tabResponsiveComponent = $compo[type].tabs;
        let tabKeys = Object.keys($tabResponsiveComponent);
        let tabLength = tabKeys.length;
        let tabs = '';
        let tabData = '';
        let tab = '';
        //var $selectedLayer = $this.closest('.SetHdlr').parent();
        for (let j = 0; j < tabLength; j++) {
            let $tabCompo = tabKeys[j];
            tab = 'tab' + (j + 1);
            let showTab = true;
            if (typeof ($tabResponsiveComponent[$tabCompo].show) !== "undefined") {
                showTab = $tabResponsiveComponent[$tabCompo].show;
            }
            if (showTab === true)
                tabs += DOMCreate('li', $tabCompo, '', '', ['data-tabs="' + tab + '"']);

            if ($tabResponsiveComponent[$tabCompo].custom) {
                if (typeof ($tabResponsiveComponent[$tabCompo].DOM) !== 'undefined') {
                    appendData = $tabResponsiveComponent[$tabCompo].DOM;
                }
            }
            else {
                switch ($tabCompo.toLowerCase()) {
                    case 'basic':
                        if (typeof ($tabResponsiveComponent[$tabCompo].options) !== 'undefined') {
                            appendData = '<div class="field-row" id="responsiveBasic">' + staticDOMs.responsivebasic + '</div>';
                        }
                        break;
                    case 'spacing':
                        if (typeof ($tabResponsiveComponent[$tabCompo].options) !== 'undefined') {
                            appendData = '<div class="field-row" id="responsiveSpace"></div>';
                        }
                        break;
                    case 'alignment':
                        if (typeof ($tabResponsiveComponent[$tabCompo].options) !== 'undefined') {
                            appendData = GeneralAlignMentDOM($tabResponsiveComponent[$tabCompo].options);
                        }
                        break;
                    default:
                        if (typeof ($compo[type].tabs[$tabCompo].DOM) !== 'undefined') {
                            appendData = $compo[type].tabs[$tabCompo].DOM;
                        }
                        break;
                }
            }
            //appendData = ScrollBarDOM() + appendData.WrapScroller();
            if (j === 0) {
                tabData += DOMCreate('div', appendData, 'tabcontent scroll__parent', tab);
            }
            else {
                tabData += DOMCreate('div', appendData, 'tabcontent scroll__parent', tab, ['style="display: none;"']);
            }
        }
        let settingTabDOM = DOMCreate('ul', tabs, 'tabs');
        settingTabDOM = Appendleftright(settingTabDOM);
        settingTabDOM += DOMCreate('div', tabData, 'tabsWrapper');
        settingTabDOM = DOMCreate('div', settingTabDOM, '', 'tabs');
        $('#popupModel .popup-model-body').html(settingTabDOM);
        $('#tabs').attr("data-settingtype", type);
        InitTab();
        for (let j = 0; j < tabLength; j++) {
            let $tabCompo = tabKeys[j];
            if ($tabResponsiveComponent[$tabCompo].custom) {
                if (typeof ($tabResponsiveComponent[$tabCompo].onload) !== 'undefined') {
                    $tabResponsiveComponent[$tabCompo].onload($par);
                }
            }
            else {
                switch ($tabCompo.toLowerCase()) {
                    case 'basic':
                        if (typeof ($tabResponsiveComponent[$tabCompo].options) !== 'undefined') {
                            ResponsiveBasicEvents($tabResponsiveComponent[$tabCompo].options);
                        }
                        break;
                    case 'spacing':
                        {
                            let $selectedLayer = $activeDOM;
                            if (typeof ($tabResponsiveComponent[$tabCompo].selectLayer) !== 'undefined') {
                                $selectedLayer = $tabResponsiveComponent[$tabCompo].selectLayer($activeDOM);
                            }
                            if (typeof ($tabResponsiveComponent[$tabCompo].options) !== 'undefined') {
                                $("#responsiveSpace").AdvanceSpacing({
                                    targetParent: $selectedLayer.parent(),
                                    targetElem: $selectedLayer,
                                    options: $tabResponsiveComponent[$tabCompo].options
                                });
                            }
                        }
                        break;
                    case 'alignment':
                        {
                            let $selectedLayer = $activeDOM;
                            if (typeof ($tabResponsiveComponent[$tabCompo].selectLayer) !== 'undefined') {
                                $selectedLayer = $tabResponsiveComponent[$tabCompo].selectLayer($activeDOM);
                            }
                            if (typeof ($tabResponsiveComponent[$tabCompo].options) !== 'undefined') {
                                GeneralAlignMentEvents($selectedLayer);
                            }
                        }
                        break;
                    default:
                        if (typeof ($tabResponsiveComponent[$tabCompo].onload) !== 'undefined') {
                            $tabResponsiveComponent[$tabCompo].onload($par);
                        }
                        break;
                }
            }
            //appendData = ScrollBarDOM() + appendData.WrapScroller();
            if (j === 0) {
                tabData += DOMCreate('div', appendData, 'tabcontent scroll__parent', tab);
            }
            else {
                tabData += DOMCreate('div', appendData, 'tabcontent scroll__parent', tab, ['style="display: none;"']);
            }
        }
    }
    else {
        $('#popupModel .popup-model-body').html("This component doenot have responsive settings ");
    }
    $('#popupModel').css({
        'right': 0,
        'left': 'auto',
        'top': 0,
        'position': 'fixed'
    }).fadeIn(400);
}
function Appendleftright(tabs) {
    return DOMCreate('span', '<i class="fa fa-chevron-left"></i>', 'tabmoveleft', 'tabmoveleft') + DOMCreate('div', tabs, 'tabHeadWrap', 'tabHeadWrap') + DOMCreate('span', '<i class="fa fa-chevron-right"></i>', 'tabmoveright', 'tabmoveright');
}
function AppendArrowEvent() {
    let wrapperWidth = $('#tabHeadWrap').width();
    let innerWrapperWidth = 0;
    $('#tabHeadWrap > .tabs li').each(function () {
        innerWrapperWidth += $(this).width() + 16;//left right padding of each li
    });
    innerWrapperWidth = innerWrapperWidth + 17;//padding left of last child
    $('#tabHeadWrap > .tabs').css({ 'width': innerWrapperWidth + 'px' });
    if (innerWrapperWidth <= wrapperWidth) {
        $('.tabmoveleft').hide();
        $('.tabmoveright').hide();
        $('#tabHeadWrap > .tabs').addClass('nothing');
    }
    else {
        $('.tabmoveleft').on('click', function () {
            document.getElementById('tabHeadWrap').scrollLeft -= 70;
        });
        $('.tabmoveright').on('click', function () {
            document.getElementById('tabHeadWrap').scrollLeft += 70;
        });
    }
}
function ResponsiveBasicEvents($option) {
    Load();
    function Load() {
        let optionKeys = Object.keys($option);
        let optionLength = optionKeys.length;
        let $impactLayer = $activeDOM;
        for (var i = 0; i < optionLength; i++) {
            let $optionKeys = optionKeys[i];
            $impactLayer = $activeDOM;
            if (EasyLibrary.IsDefined($option[$optionKeys].selectLayer)) {
                $impactLayer = $option[$optionKeys].selectLayer();
            }
            switch ($optionKeys.toLowerCase()) {
                case 'height':
                    HeightInit($impactLayer, $option[$optionKeys].callback);
                    $('#responsiveBasicDOM > div[data-opt="height"]').removeClass('Dn');
                    break;
                case 'lineheight':
                    LineHeightInit($impactLayer, $option[$optionKeys].callback);
                    $('#responsiveBasicDOM > div[data-opt="lineheight"]').removeClass('Dn');
                    break;
                case 'width':
                    WidthInit($impactLayer, $option[$optionKeys].callback);
                    $('#responsiveBasicDOM > div[data-opt="width"]').removeClass('Dn');
                    break;
                case 'fontsize':
                    FontSizeInit($impactLayer, $option[$optionKeys].callback);
                    $('#responsiveBasicDOM > div[data-opt="fontsize"]').removeClass('Dn');
                    break;
                case 'visibility':
                    Visibility($impactLayer);
                    $('#responsiveBasicDOM > div[data-opt="visibility"]').removeClass('Dn');
                    break;
                case 'ordering':
                    Ordering($impactLayer);
                    $('#responsiveBasicDOM > div[data-opt="ordering"]').removeClass('Dn');
                    break;
                default:
                    if (typeof ($option[$optionKeys].DOM) !== 'undefined') {
                        if (typeof ($option[$optionKeys].prepend) !== 'undefined') {
                            $('#responsiveBasicDOM').prepend($option[$optionKeys].DOM);
                        }
                        else {
                            $('#responsiveBasicDOM').append($option[$optionKeys].DOM);
                        }
                    }
                    if (typeof ($option[$optionKeys].onload) !== 'undefined') {
                        $option[$optionKeys].onload();
                    }
                    break;
            }
        }
        $('#responsiveBasicDOM > div.Dn').remove();
    }
    function HeightInit($selectDOM, callback) {
        let parentClasses = $selectDOM.attr('class');
        let dAlpha = DeviceAlphaSpace();
        let regex = new RegExp(dAlpha + 'H-[0-9]{1,4}', 'g');
        let HeightClass = parentClasses.match(regex);
        let height = $selectDOM.height();
        if (HeightClass !== null) {
            height = HeightClass[0].replace(dAlpha + 'H-', '');
        }
        function ResponsiveHeight(space, $parent) {
            dAlpha = DeviceAlphaSpace();
            parentClasses = $selectDOM.attr('class');
            regex = new RegExp(dAlpha + 'H-[0-9]{1,4}', 'g');
            let HeightClass = parentClasses.match(regex);
            let height = 0;
            if (HeightClass !== null) {
                $selectDOM.removeClass(HeightClass[0]);
            }
            $selectDOM.addClass(dAlpha + 'H-' + space);
        }
        if (EasyLibrary.IsDefined(callback)) {
            ResponsiveHeight = callback;
        }
        AdvanceSageSlider($('#boxHeightSlider'), $('#boxHeightHandle'), 1, 1000, height, ResponsiveHeight, $selectDOM, 'px');
    }
    function LineHeightInit($selectDOM, callback) {
        let $parent = $selectDOM;
        function LineHeightChange(space) {
            ReplaceClassByPattern($parent, 'Lh-[0-9]{1,4}', 'Lh-' + space);
        }
        AdvanceSageSlider($('#respoLineHeightSizeSlider'), $('#respolineHeightHandle'), 5, 200,
            GetValueByClassName($parent, 'Lh-[0-9]{1,4}', 'Lh-'), LineHeightChange, $parent, 'px');
    }
    function WidthInit($selectDOM, callback) {
        let parentClasses = $selectDOM.attr('class');
        let dAlpha = DeviceAlphaSpace();
        let regex = new RegExp(dAlpha + 'sfCol_[0-9]{1,3}', 'g');
        let sfWidth = parentClasses.match(regex);
        let width = 100;
        if (sfWidth !== null) {
            width = sfWidth[0].split('_')[1];
        }
        function ResponsiveWidth(space, $parent) {
            dAlpha = DeviceAlphaSpace();
            regex = new RegExp(dAlpha + 'sfCol_[0-9]{1,3}', 'g');
            parentClasses = $selectDOM.attr('class');
            let sfWidth = parentClasses.match(regex);
            if (sfWidth !== null) {
                $selectDOM.removeClass(sfWidth[0]);
            }
            $selectDOM.addClass(dAlpha + 'sfCol_' + space);
        }
        if (EasyLibrary.IsDefined(callback)) {
            ResponsiveWidth = callback;
        }
        AdvanceSageSlider($('#boxWidthSlider'), $('#boxWidthHandle'), 1, 100, width, ResponsiveWidth, $selectDOM, 'px');
    }
    function FontSizeInit($selectDOM, callback) {
        let parentClasses = $selectDOM.attr('class');
        let dAlpha = DeviceAlphaSpace();
        let regex = new RegExp(dAlpha + 'Fs-[0-9]{1,4}', 'g');
        let fontSizeClass = parentClasses.match(regex);
        let fontSize = 0;
        if (fontSizeClass !== null) {
            fontSize = fontSizeClass[0].replace(dAlpha + 'Fs-', '');
        }
        function ResponsiveFontSize(space, $parent) {
            dAlpha = DeviceAlphaSpace();
            parentClasses = $selectDOM.attr('class');
            regex = new RegExp(dAlpha + 'Fs-[0-9]{1,4}', 'g');
            let fontClass = parentClasses.match(regex);
            if (fontClass !== null) {
                $selectDOM.removeClass(fontClass[0]);
            }
            $selectDOM.addClass(dAlpha + 'Fs-' + space);
        }
        if (EasyLibrary.IsDefined(callback)) {
            ResponsiveFontSize = callback;
        }
        AdvanceSageSlider($('#fontSizeSlider'), $('#fontSizeHandle'), 1, 100, fontSize, ResponsiveFontSize, $selectDOM, 'px');
    }
    function Visibility($selectDOM) {
        let parentClasses = $selectDOM.attr('class');
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
                $selectDOM.removeClass(dAlpha + 'Dn').addClass(dAlpha + 'Dib');
            }
            else {
                $selectDOM.addClass(dAlpha + 'Dn').removeClass(dAlpha + 'Dib');
            }
        });
    }
    function Ordering($selectDOM) {
        let cols = $selectDOM.find('.cGrid').eq(0).find('>.editor-col');
        let len = cols.length;
        let list = '';
        let dAlpha = DeviceAlphaSpace();
        let oldOrder = [];
        if (len > 1) {
            cols.each(function (i, v) {
                let $this = $(this);
                let regex = new RegExp(dAlpha + 'Odr-[0-9]', 'g');
                let colClasses = $this.attr('class');
                let OrderClasses = colClasses.match(regex);
                if (OrderClasses != null) {
                    oldOrder.push(OrderClasses[0].replace(dAlpha + 'Odr-', ''));
                }
                else
                    oldOrder.push(i + 1);
            });
            for (var j = 0; j < len; j++) {
                let ord = oldOrder[j];
                list += `<span class="items colOrder" data-order="${ord}">Col ${ord}</span>`;
            }
            $('#sortedData').html(list);
            $("#sortedData").sortable({
                revert: 0,
                delay: 150,
                items: '.colOrder',
                containment: '.RearrangeColumnWrapper',
                //handle: ".colOrder",
                //helper: function () {
                //    return $('<div class="comhelperBox" style="height:40px;width:100px;"></div>');
                //},
                connectWith: '.colOrder',
                cursorAt: { left: 5, top: 5 },
                placeholder: 'ui-state-com-sortable-hover ui-hover-state',
                stop: function (event, ui) {
                    dAlpha = DeviceAlphaSpace();
                    let order = [];
                    $('#sortedData span').each(function () {
                        order.push($(this).attr('data-order'));
                    });
                    let length = order.length;
                    for (var i = 0; i < length; i++) {
                        let $this = $activeDOM.find('.cGrid').eq(0).find('>.editor-col').eq(parseInt(order[i]) - 1);
                        let regex = new RegExp(dAlpha + 'Odr-[0-9]', 'g');
                        let colClasses = $this.attr('class');
                        let OrderClasses = colClasses.match(regex);
                        if (OrderClasses != null) {
                            $this.removeClass(OrderClasses[0]);
                        }
                        $this.addClass(dAlpha + 'Odr-' + (i + 1));
                    }
                },
                receive: function (event, ui) {

                }
            });
        }
    }
}
function SimplePopup($opt) {
    let popupOption = {
        Title: 'simplePopup',
        Top: '100',
        Left: '221',
        Height: '200',
        Data: '',
        Minimize: true,
        Width: '200',
        Position: 'absolute',
        ShowClose: true,
        ShowTitle: true,
        Draggable: false,
        CallbackBeforePopup: function () { },
        CallbackaftePopUp: function () { }
    };
    popupOption = $.extend(popupOption, $opt);
    let $popUpModel = $('#simplePopupModel');
    if (popupOption.ShowTitle) {
        $popUpModel.find('.simple-popup-title').text(popupOption.Title).show();
    }
    else {
        $popUpModel.find('.simple-popup-title').hide();
    }
    $popUpModel.find('.simple-popup-header').show();
    let popUpwidth = $popUpModel.width();
    let $editorBox = $('.editor-box');
    let $editorBoxOffset = $editorBox.offset();
    let editorTop = $editorBoxOffset.top;
    let editorLeft = $editorBoxOffset.left;
    let popUpModelLeft = 0;
    let leftThreshold = 0;
    let rightthreshHold = 10;
    let popUpModelTop = (top + rightthreshHold);
    if ((popupOption.Left - editorLeft) > popUpwidth) {
        popUpModelLeft = popupOption.Left - popUpwidth - leftThreshold;
    }
    else {
        popUpModelLeft = popupOption.Left - leftThreshold;
    }
    if (popupOption.Height > 0) {
        $popUpModel.css({ height: popupOption.Height });
    }
    if (popupOption.Width > 0) {
        $popUpModel.css({ width: popupOption.Width });
    }
    if (popupOption.ShowClose)
        $('.simple-close-model').show();
    else
        $('.simple-close-model').hide();
    $popUpModel.css({ 'position': popupOption.Position });
    $('.simple-popup-model-body').html(popupOption.Data);
    popupOption.CallbackBeforePopup($('.simple-popup-model-body'));
    $popUpModel.css({
        top: popupOption.top,
        left: popUpModelLeft
    }).fadeIn(400);
    if (popupOption.Draggable) {
        $popUpModel.draggable({
            handle: '.simple-popup-header',
            containment: '.WebBuilderWrapper',
            start: function (e, ui) {
                $(ui.helper).css({
                    "position": "fixed"
                });
            },
            stop: function (event, ui) {
                //AutoAlignDragger(ui.helper);
            }
        });
    }
    popupOption.CallbackaftePopUp();
    $('.simple-close-model').off().on('click', function () {
        FadeSimplePopUp();
    });
}
function HideSimplePopUp() {
    $('#simplePopupModel').hide().css({ 'position': 'absolute' });
}
function FadeSimplePopUp() {
    $('#simplePopupModel').fadeOut(400).css({ 'position': 'absolute' });
}
function Messages(title, message, type) {

}
function BuildSettingDOM($compo, $this, type) {
    marginSliderList = [
        ['bulkMarginSlider', 'bulkMarginHandler', false, 'BulkMargin', 0],
        ['marginTopSlider', 'marginTopHandler', false, 'MarginTop', 0],
        ['marginRightSlider', 'marginRightHandler', false, 'MarginRight', 0],
        ['marginBottomSlider', 'marginBottomHandler', false, 'MarginBottom', 0],
        ['marginLeftSlider', 'marginLeftHandler', false, 'MarginLeft', 0]
    ];
    paddingSliderList = [
        ['bulkPaddingSlider', 'bulkPaddingHandler', false, 'BulkPadding', 0],
        ['paddingTopSlider', 'paddingTopHandler', false, 'PaddingTop', 0],
        ['paddingRightSlider', 'paddingRightHandler', false, 'PaddingRight', 0],
        ['paddingBottomSlider', 'paddingBottomHandler', false, 'PaddingBottom', 0],
        ['paddingLeftSlider', 'paddingLeftHandler', false, 'PaddingLeft', 0]
    ];
    /*initializing border slider with unused values*/
    /* sliderID, sliderHandlerID, used, sliderFunction, initialvalue, colorPickerID*/
    borderSliderList = [
        ['bulkBorderSlider', 'bulkBorderHandler', false, 'BorderBulk', 1, 'bulkBorderColor'],
        ['borderTopSlider', 'borderTopHandler', false, 'BorderTop', 1, 'topBorderColor'],
        ['borderRightSlider', 'borderRightHandler', false, 'BorderRight', 1, 'rightBorderColor'],
        ['borderBottomSlider', 'borderBottomHandler', false, 'BorderBottom', 1, 'bottomBorderColor'],
        ['borderLeftSlider', 'borderLeftHandler', false, 'BorderLeft', 1, 'leftBorderColor']
    ];

    borderHoverSliderList = [
        ['bulkBorderHoverSlider', 'bulkBorderHoverHandler', false, 'BorderHoverBulk', 1, 'bulkBorderHoverColor'],
        ['borderHoverTopSlider', 'borderHoverTopHandler', false, 'BorderHoverTop', 1, 'topBorderHoverColor'],
        ['borderHoverRightSlider', 'borderHoverRightHandler', false, 'BorderHoverRight', 1, 'rightBorderHoverColor'],
        ['borderHoverBottomSlider', 'borderHoverBottomHandler', false, 'BorderHoverBottom', 1, 'bottomBorderHoverColor'],
        ['borderHoverLeftSlider', 'borderHoverLeftHandler', false, 'BorderHoverLeft', 1, 'leftBorderHoverColor']
    ];

    boxRadiusSliderList = [
        ['bulkBoxRadiusSlider', 'bulkBoxRadiusHandler', false, 'BoxRadiusBulk', 0],
        ['boxRadiusTopLeftSlider', 'boxRadiusTopLeftHandler', false, 'BoxRadiusTopLeft', 0],
        ['boxRadiusTopRightSlider', 'boxRadiusTopRightHandler', false, 'BoxRadiusTopRight', 0],
        ['boxRadiusBottomLeftSlider', 'boxRadiusBottomLeftHandler', false, 'BoxRadiusBottomLeft', 0],
        ['boxRadiusBottomRightSlider', 'boxRadiusBottomRightHandler', false, 'BoxRadiusBottomRight', 0]
    ];

    boxShadowSliderList = [
        ['boxShadowHorizontalSlider', 'boxShadowHorizontalHandler', 'boxShadowHorizontal', 0],
        ['boxShadowVerticalSlider', 'boxShadowVerticalHandler', 'boxShadowVertical', 0],
        ['boxShadowBlurSlider', 'boxShadowBlurHandler', 'boxShadowBlur', 0]
    ];
    boxShadowEffectSliderList = [
        ['boxShadowEffectHorizontalSlider', 'boxShadowEffectHorizontalHandler', 'boxShadowEffectHorizontal', 0],
        ['boxShadowEffectVerticalSlider', 'boxShadowEffectVerticalHandler', 'boxShadowEffectVertical', 0],
        ['boxShadowEffectBlurSlider', 'boxShadowEffectBlurHandler', 'boxShadowEffectBlur', 0]
    ];
    let settingDOM = '';
    if (typeof ($compo[type].tabs) !== undefined) {
        let $tabComponent = $compo[type].tabs;
        let tabKeys = Object.keys($tabComponent);
        let tabLength = tabKeys.length;
        let tabs = '';
        let tabData = '';
        for (var j = 0; j < tabLength; j++) {
            let $tabCompo = tabKeys[j];
            let tab = 'tab' + (j + 1);
            let showTab = true;
            if (typeof ($tabComponent[$tabCompo].show) !== "undefined") {
                showTab = $tabComponent[$tabCompo].show;
            }
            if (showTab === true)
                tabs += DOMCreate('li', $tabCompo, '', '', ['data-tabs="' + tab + '"']);
            let appendData = '';
            if ($tabComponent[$tabCompo].custom) {
                if (typeof ($tabComponent[$tabCompo].DOM) !== 'undefined') {
                    appendData = $tabComponent[$tabCompo].DOM;
                }
            }
            else {
                switch ($tabCompo.toLowerCase()) {
                    case 'background':
                        if (typeof ($tabComponent[$tabCompo].options) !== 'undefined') {
                            //appendData = GeneralBackgroundDOM($tabComponent[$tabCompo].options);
                            appendData = '<div class="field-row" id="cbBgDOM"></div>';
                        }
                        break;
                    case 'spacing':
                        if (typeof ($tabComponent[$tabCompo].options) !== 'undefined') {
                            appendData = '<div class="field-row" id="cbspacingDOM"></div>';
                        }
                        break;
                    case 'alignment':
                        if (typeof ($tabComponent[$tabCompo].options) !== 'undefined') {
                            //appendData = GeneralAlignMentDOM($tabComponent[$tabCompo].options);
                            appendData = '<div class="field-row" id="cbAlignDOM"></div>';
                        }
                        break;
                    case 'border':
                        if (typeof ($tabComponent[$tabCompo].options) !== 'undefined') {
                            //appendData = GeneralBorderDOM($tabComponent[$tabCompo].options);
                            appendData = '<div class="field-row" id="cbBorderDOM"></div>';
                        }
                        break;
                    case 'box radius':
                        if (typeof ($tabComponent[$tabCompo].options) !== 'undefined') {
                            //appendData = GeneralBoxRadiusDOM($tabComponent[$tabCompo].options);
                            appendData = '<div class="field-row" id="cbBoxRadDOM"></div>';
                        }
                        break;
                    case 'box shadow':
                        if (typeof ($tabComponent[$tabCompo].options) !== 'undefined') {
                            //appendData = GeneralBoxShadowDOM($tabComponent[$tabCompo].options);
                            appendData = '<div class="field-row" id="cbBoxShadowDOM"></div>';
                        }
                        break;
                    case 'hover effect':
                        if (typeof ($tabComponent[$tabCompo].options) !== 'undefined') {
                            //appendData = GeneralHoverEffectDOM($tabComponent[$tabCompo].options);
                            appendData = '<div class="field-row" id="cbHoverEffectDOM"></div>';
                        }
                        break;
                    case 'scroll effect':
                        appendData = '<div class="field-row" id="cbScrollEffectDOM"></div>';
                        //if (typeof ($tabComponent[$tabCompo].options) !== 'undefined') {
                        //    appendData = GeneralScrolleffect($tabComponent[$tabCompo].options);
                        //}
                        break;
                    default:
                        if (typeof ($tabComponent[$tabCompo].DOM) !== 'undefined') {
                            appendData = $tabComponent[$tabCompo].DOM;
                        }
                        break;
                }
            }
            //appendData = ScrollBarDOM() + appendData.WrapScroller();
            if (j === 0) {
                tabData += DOMCreate('div', appendData, 'tabcontent scroll__parent', tab);
            }
            else {
                tabData += DOMCreate('div', appendData, 'tabcontent scroll__parent', tab, ['style="display: none;"']);
            }
        }
        let settingTabDOM = DOMCreate('ul', tabs, 'tabs');
        settingTabDOM = Appendleftright(settingTabDOM);
        settingTabDOM += DOMCreate('div', tabData, 'tabsWrapper');
        settingTabDOM = DOMCreate('div', settingTabDOM, '', 'tabs');
        $('#popupModel .popup-model-body').html(settingTabDOM);
        $('#tabs').attr("data-settingtype", type);
        for (var k = 0; k < tabLength; k++) {
            let $tabCompo = tabKeys[k];
            if ($tabComponent[$tabCompo].custom) {
                if (typeof ($tabComponent[$tabCompo].onload) !== 'undefined') {
                    $tabComponent[$tabCompo].onload($this);
                }
            }
            else {
                switch ($tabCompo.toLowerCase()) {
                    case 'background':
                        {
                            let $selectedLayer = GetSelectedLayer($this, $compo, $tabComponent[$tabCompo].selectLayer, type);
                            if (typeof ($tabComponent[$tabCompo].options) !== 'undefined') {
                                $("#cbBgDOM").AdvanceBackground({
                                    targetParent: $selectedLayer.parent(),
                                    targetElem: $selectedLayer,
                                    options: $tabComponent[$tabCompo].options
                                });
                            }
                            //GeneralBackgroundEvents($selectedLayer);
                        }
                        break;
                    case 'alignment':
                        {
                            let $selectedLayer = GetSelectedLayer($this, $compo, $tabComponent[$tabCompo].selectLayer, type);
                            if (typeof ($tabComponent[$tabCompo].options) !== 'undefined') {
                                let alignParams = {
                                    targetParent: $selectedLayer.parent(),
                                    targetElem: $selectedLayer,
                                    options: $tabComponent[$tabCompo].options
                                };
                                if (typeof ($tabComponent[$tabCompo].labels) !== 'undefined') {
                                    alignParams.labels = $tabComponent[$tabCompo].labels;
                                }
                                $("#cbAlignDOM").AdvanceAlignment(alignParams);
                            }
                        }
                        //GeneralAlignMentEvents($selectedLayer);
                        break;
                    case 'spacing':
                        {
                            let $selectedLayer = GetSelectedLayer($this, $compo, $tabComponent[$tabCompo].selectLayer, type);
                            if (typeof ($tabComponent[$tabCompo].options) !== 'undefined') {
                                $("#cbspacingDOM").AdvanceSpacing({
                                    targetParent: $selectedLayer.parent(),
                                    targetElem: $selectedLayer,
                                    options: $tabComponent[$tabCompo].options
                                });
                            }
                        }
                        break;
                    case 'border':
                        {
                            let $selectedLayer = GetSelectedLayer($this, $compo, $tabComponent[$tabCompo].selectLayer, type);
                            if (typeof ($tabComponent[$tabCompo].options) !== 'undefined') {
                                $("#cbBorderDOM").AdvanceBorder({
                                    targetParent: $selectedLayer.parent(),
                                    targetElem: $selectedLayer,
                                    options: $tabComponent[$tabCompo].options
                                });
                            }
                        }
                        //GeneralBorderEvents($selectedLayer);
                        break;
                    case 'box radius':
                        {
                            let $selectedLayer = GetSelectedLayer($this, $compo, $tabComponent[$tabCompo].selectLayer, type);
                            if (typeof ($tabComponent[$tabCompo].options) !== 'undefined') {
                                $("#cbBoxRadDOM").AdvanceBoxRadius({
                                    targetParent: $selectedLayer.parent(),
                                    targetElem: $selectedLayer,
                                    options: $tabComponent[$tabCompo].options
                                });
                            }
                        }
                        //GeneralBoxRadiusEvents($selectedLayer);
                        break;
                    case 'box shadow':
                        {
                            let $selectedLayer = GetSelectedLayer($this, $compo, $tabComponent[$tabCompo].selectLayer, type);
                            if (typeof ($tabComponent[$tabCompo].options) !== 'undefined') {
                                $("#cbBoxShadowDOM").AdvanceBoxShadow({
                                    targetParent: $selectedLayer.parent(),
                                    targetElem: $selectedLayer,
                                    options: $tabComponent[$tabCompo].options
                                });
                            }
                        }
                        //GeneralBoxShadowEvents($selectedLayer);
                        break;
                    case 'hover effect':
                        {
                            let $selectedLayer = GetSelectedLayer($this, $compo, $tabComponent[$tabCompo].selectLayer, type);
                            //GeneralIconHoverEffectEvent($selectedLayer);
                            if (typeof ($tabComponent[$tabCompo].options) !== 'undefined') {
                                $("#cbHoverEffectDOM").AdvanceHoverEffect({
                                    targetParent: $selectedLayer.parent(),
                                    targetElem: $selectedLayer,
                                    options: $tabComponent[$tabCompo].options
                                });
                            }
                        }
                        break;
                    case 'scroll effect':
                        {
                            let $selectedLayer = GetSelectedLayer($this, $compo, $tabComponent[$tabCompo].selectLayer, type);
                            //GeneralScrollEffectEvent($selectedLayer); 
                            $("#cbScrollEffectDOM").AdvanceScrollEffect({
                                targetParent: $selectedLayer.parent(),
                                targetElem: $selectedLayer
                            });
                        }
                        break;
                    default:
                        if (typeof ($tabComponent[$tabCompo].onload) !== 'undefined') {
                            $tabComponent[$tabCompo].onload($this);
                        }
                }
            }
        }
        InitTab();
        DeleteComponent();
    }
}

function DeleteComponent($elem) {
    let $deleteHelper = $('.deletehelper');
    if (typeof $elem !== "undefined") {
        $deleteHelper = $elem.find('.deletehelper');
    }
    $deleteHelper.off('click').on('click', function () {
        $('.activeSetting').removeClass('activeSetting');
        let $parent = $(this).parents('.SetHdlr').parent();
        $parent.addClass('activeSetting');
        $activeDOM = $parent;
        var dataScroll = $activeDOM.attr('data-opscroll');
        if (!EasyLibrary.IsUndefined(dataScroll)) {
            $(".editor-site-header").find('.onepagemenu').find('li[data-opscroll="' + dataScroll + '"]').remove();
        }
        if ($parent.not('.holder').hasClass('editor-col')) {
            SageConfirmDialog(easyMessageList.emptycolumn).done(function () {
                let $nodata = $parent.find('> .column-data-empty');
                let $tooglemenu = $parent.find('> .SetHdlr');
                $parent.find(' > div').not($nodata).not($tooglemenu).remove();
            });
        }
        else {
            SageConfirmDialog(easyMessageList.deletehelper).done(function () {
                //if ($parent.hasClass('editor-row-container')) {
                //    if ($parent.parent().hasClass('editor-row-shaded-layer')) {
                //        $parent.parent().parent().remove();
                //    }
                //    else {
                //        $parent.parent().remove();
                //    }
                //}
                //else if ($parent.hasClass('editor-row-shaded-layer')) {
                //    $parent.parent().remove();
                //}
                //else {
                //}
                $parent.remove();
                CheckNoRow();
            });

            function CheckNoRow() {
                if ($('.editor-componentWrapper').find('.cRow').length === 0
                    && $('.editor-componentWrapper').find('.noElement').length === 0
                ) {
                    $('.editor-componentWrapper').append('<div class="noElement"><span class="startnew">Drag a row here</span></div>');
                    StartNewEvent();
                }
                if ($('.editor-site-header').find('.cRow').length === 0) {
                    $('.editor-site-header').addClass('emptydata');
                }
                if ($('.editor-site-footer').find('.cRow').length === 0) {
                    $('.editor-site-footer').addClass('emptydata');
                }
            }
        }
    });
}
function StartNewEvent() {
    $('.startnew').off('click').on('click', function () {
        //$('.addPro.headeradd').trigger('click');
        proLoadingAppend($(this));
    });
}
function GetSelectedLayer($this, $compo, $compoOption, type) {
    let $selectedLayer = '';
    if (typeof ($compoOption) !== 'undefined') {
        $selectedLayer = $compoOption($this);
    }
    else if (typeof ($compo[type].selectLayer) !== 'undefined') {
        $selectedLayer = $compo[type].selectLayer($this);
    }
    else {
        $selectedLayer = $this.parent().parent();
    }
    return $selectedLayer;
}
function HidePopUpSetting() {
    if (!EasyLibrary.Pinned()) {
        $('#popupModel').hide();
        $('.actEle').removeClass('actEle');
        $('#popupModel').css({ 'position': 'absolute' });
    }
    $('.headerControls').removeClass('clicked');
    //$('.activeSetting').removeClass('activeSetting');
    //$activeDOM = $('.activeSetting');
}
function FadeOutPopUpSetting() {
    $('#popupModel').fadeOut(400);
    $('.actEle').removeClass('actEle');
    $('#popupModel').css({ 'position': 'absolute' });
    $('.headerControls').removeClass('clicked');
    $('.activeSetting').removeClass('activeSetting');
    $activeDOM = $('.activeSetting');
}
function GeneralBackgroundDOM(options) {
    let backGroundDOM = '';
    let optionLen = options.length;
    if (optionLen > 0) {
        if (optionLen == 1) {
            backGroundDOM += DOMCreate('h4', 'Background');
            let optionValue = options[0];
            switch (optionValue) {
                case 'color':
                    backGroundDOM += staticDOMs.divbackcolorchoose;
                    break;
                case 'image':
                    backGroundDOM += staticDOMs.divbackimagechoose;
                    break;
            }
            backGroundDOM = FieldRowDOMCreate(backGroundDOM);
        }
        else {
            backGroundDOM += staticDOMs.backgroundtab;
        }
    }
    return backGroundDOM;
}
function GeneralBackgroundEvents($parent) {
    let $shadedlayer = $parent.find(' > .editor-row-shaded-layer');
    if ($parent.hasClass('editor-row-shaded-layer')) {
        $shadedlayer = $parent;
        $parent = $parent.parent();
    }
    loadSettings();
    InitEvents();
    function loadSettings() {
        BGImage();
        function BGImage() {
            let parentBgImage = $parent.css('background-image');
            if (typeof (parentBgImage) === 'undefined' || parentBgImage === 'none') {
                parentBgImage = webbuildermodulepath + '/img/tiger.jpg';
            }
            parentBgImage = parentBgImage.replace('url(', '').replace(')', '').replace(/\"/gi, "");
            $('#RowBGImageSrc').attr('src', parentBgImage);
        }
    }
    function InitEvents() {
        let bgColor = $parent.css('background-color');
        let txtColor = $parent.css('color');
        if (typeof ($parent.attr('style')) === 'undefined' || typeof (bgColor) === "undefined") {
            bgColor = "rgba(255, 255, 255, 1)";
        }
        if (typeof ($parent.attr('style')) === 'undefined' || typeof (txtColor) === "undefined") {
            txtColor = "rgba(0, 0, 0, 1)";
        }
        let prevhovereffect = $parent.attr('data-prevhovereffect');
        if (typeof prevhovereffect !== 'undefined') {
            let tmpEff = JSON.parse(prevhovereffect);
            if (tmpEff.bg) {
                bgColor = tmpEff.bg;
            }
            if (tmpEff.font) {
                txtColor = tmpEff.font;
            }
        }
        $('#selBackround').off().on('change', function () {
            let select = $(this).val();
            let backgroundColor = '';
            let backgroundImage = '';
            switch (select) {
                case 'none':
                    $('#divBackColorChoose').hide();
                    $('#divBackImageChoose').hide();
                    backgroundColor = '';
                    backgroundImage = '';
                    removeImageBG();
                    removeColorBG();
                    break;
                case 'image':
                    $('#divBackColorChoose').hide();
                    $('#divBackImageChoose').show();
                    backgroundColor = '';
                    backgroundImage = 'image';
                    removeColorBG();
                    break;
                case 'color':
                    $('#divBackColorChoose').show();
                    $('#divBackImageChoose').hide();
                    backgroundColor = 'color';
                    backgroundImage = '';
                    removeImageBG();
                    break;
            }
            $parent.attr('data-backgroundColor', backgroundColor);
            $parent.attr('data-backgroundImage', backgroundImage);
        });
        $('#bgImageEffect').off().on('change', function () {
            let newEffectClass = $(this).val();
            let effectClass = 'background-effect-size-contain';
            let sfEffect = $parent.attr('class').match(/background-effect-[a-z]{1,10}-[a-z]{1,10}/g);
            if (sfEffect !== null) {
                effectClass = sfEffect[0];
            }
            $parent.removeClass(effectClass).addClass(newEffectClass);
        });
        /*for shaded layer */
        if ($shadedlayer.length > 0) {
            $('#shadedLayerActive').prop('checked', true);
            let conClass = $shadedlayer.attr('class').replace('editor-row-container', '').trim();
            $('#selContainerWidth').val(conClass);
            $('#divPickShaded').fadeIn(400);
            $('#chooseColorShadedCol').css({ 'background-color': $shadedlayer.css('background-color') });
        }
        else {
            $('#shadedLayerActive').prop('checked', false);
        }

        let backgroundColor = $parent.attr('data-backgroundColor');
        let backgroundImage = $parent.attr('data-backgroundImage');
        let selected = 'none';
        if (typeof (backgroundColor) !== 'undefined' && backgroundColor.length > 0) {
            selected = 'color';
        }
        else if (typeof (backgroundImage) !== 'undefined' && backgroundImage.length > 0) {
            selected = 'image';
            BackImageSetting();
        }
        $('#selBackround').val(selected);
        $('#selBackround').trigger('change');

        $('#RowBGImage').on('click', function () {
            let media = $(this).SageMedia({
                onSelect: function (src, response, type, filename, extension) {

                },
                success: function (resposne) {
                    src = resposne.filePath.replace(/\\/g, '/');
                    $("#RowBGImageSrc").attr('src', src).attr('alt', resposne.alt);
                    $parent.css({
                        'background-image': 'url("' + src + '")'
                    });
                },
                mediaType: 'image',
                extension: 'png,jpeg,jpg,ico,svg,gif,webp',
            });
            media.Show();
        });
        $('#shadedLayerActive').off().on('click', function () {
            if ($(this).is(':checked')) {
                let shadedDiv = '<div class="editor-row-shaded-layer" style="height:100%;"></div>';
                //var appendElem = $parent.children();
                //$parent.append(shadedDiv);
                $parent.children().not(".SetHdlr, .addPro").wrapAll(shadedDiv);
                $('#divPickShaded').fadeIn(400);
                //$parent.find(' > .editor-row-shaded-layer').append(appendElem).css({ 'background-color': 'rgba(37, 113, 211, 0.38)' });
                $parent.find(' > .editor-row-shaded-layer').css({ 'background-color': $("#chooseColorShadedCol").css('background-color') });
                let parentClasses = $parent.attr('class');
                let paddingClass = parentClasses.match(/P[a-z]{0,1}-[0-9]{1,3}/g);
                if (paddingClass !== null) {
                    $(paddingClass).each(function (i, v) {
                        $parent.find(' > .editor-row-shaded-layer').addClass(v);
                        $parent.removeClass(v);
                    });
                }
            }
            else {
                /* removing and adding padding between shaded and row */
                let parentClasses = $parent.find('.editor-row-shaded-layer').attr('class');
                let paddingClass = parentClasses.match(/P[a-z]{0,1}-[0-9]{1,3}/g);
                if (paddingClass !== null) {
                    $(paddingClass).each(function (i, v) {
                        $parent.find('.editor-row-shaded-layer').removeClass(v);
                        $parent.addClass(v);
                    });
                }
                RemoveShadedLayer();
            }
        });

        $('#chooseColorColBG').css({
            'background-color': bgColor,
            'color': txtColor
        });
        let extracolor = GetUsedBgColor();
        if (extracolor.length > 0) {
            $(extracolor).insertAfter('#chooseColorBG');
            $('.obtainColor').on('click', function () {
                let bgnewColor = $(this).css('background-color');
                $('#chooseColorBG').css({
                    'background-color': bgnewColor,
                });
                $parent.css({
                    'background-color': bgnewColor,
                });

            });
        }
        let $shadedObject = $parent.find('.editor-row-shaded-layer');
        if (typeof ($shadedObject) !== "undefined") {
            let shadedBGColor = $shadedObject.css('background-color');
            let txtshadedColor = $shadedObject.css('color');
            if (typeof (shadedBGColor) === "undefined") {
                shadedBGColor = "rgba(37, 113, 211, 0.38)";
            }
            if (typeof (txtshadedColor) === "undefined") {
                txtshadedColor = "rgb(0, 0, 0, 1)";
            }
            $('#chooseColorShaded').css({
                'background-color': shadedBGColor,
                'color': txtshadedColor
            });
        }

        let colorPickerOption = {
            customBG: '#222',
            margin: '4px -2px 0',
            doRender: 'div div',
            buildCallback: function ($elm) {
                BuildColorPicker($elm, this);
            },
            renderCallback: function ($elm, toggled) {
                let colors = this.color.colors.RND,
                    modes = {
                        r: colors.rgb.r, g: colors.rgb.g, b: colors.rgb.b,
                        h: colors.hsv.h, s: colors.hsv.s, v: colors.hsv.v,
                        HEX: this.color.colors.HEX
                    };
                $('input', '.cp-panel').each(function () {
                    this.value = modes[this.className.substr(3)];
                });
                colors = this.color.colors;
                let colorsRGB = colors.RND.rgb;
                let alpha = colors.alpha;
                let textColor = '';
                if (colors.RGBLuminance > 0.22) {
                    textColor = '#222';
                }
                else {
                    textColor = '#ddd';
                }
                let colorPickerID = $elm.attr('id');
                switch (colorPickerID) {
                    case 'chooseColorShadedCol':
                        $parent.find(' > .editor-row-shaded-layer').css({
                            'background-color': 'rgb(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')',
                            'color': textColor
                        });
                        break;
                    case 'chooseColorColBG':
                        $parent.css({
                            'background-color': 'rgb(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')',
                            'color': textColor
                        });
                        break;
                }
            }
        };
        $('.chooseBGColors').colorPicker(colorPickerOption);

        function GetUsedBgColor() {
            let extracolor = '';
            $('.editor-row').each(function () {
                extracolor += '<span class="obtainColor  color-picker-holder" style="background-color: ' + $(this).css('background-color') + ';"></span>';
            });
            extracolor = '<span><i>Used colors :</i> ' + extracolor + '</span>';
            return extracolor;
        }
        function removeImageBG() {
            RemoveShadedLayer();
            $parent.removeClass('editor-row-bg-image-parallax');
            $parent.css({
                'background-image': ''
            });
        }
        function RemoveShadedLayer() {
            //var appendElem = $parent.find(' > .editor-row-shaded-layer').children();
            //$parent.append(appendElem);
            //$parent.find(' > .editor-row-shaded-layer').remove();
            $parent.find(' > .editor-row-shaded-layer').children().unwrap();
            $('#divPickShaded').fadeOut(100);
            $('#shadedLayerActive').prop('checked', false);
        }
        function removeColorBG() {
            $parent.css({ 'background-color': '', 'color': '' });
            $('#chooseColorColBG').css({ 'background-color': bgColor, 'color': txtColor });
        }
        function BackImageSetting() {
            let effectClass = 'background-effect-size-contain';
            let sfEffect = $parent.attr('class').match(/background-effect-[a-z]{1,10}-[a-z]{1,10}/g);
            if (sfEffect !== null) {
                effectClass = sfEffect[0];
            }
            $('#bgImageEffect').val(effectClass);
        }
    }
}
function GeneralAlignMentDOM(options) {
    let alignTotalDOM = '';
    if (EasyLibrary.IsDefined(options)) {
        let alignDOM = '';
        if (EasyLibrary.IsDefined(options.horizontal) && options.horizontal.length > 0) {
            let optionLen = options.horizontal.length;
            for (let i = 0; i < optionLen; i++) {
                alignDOM += DOMCreate('i', '', 'cb-algn-' + options.horizontal[i].substring(0, 1), '', ['data-class="TxAl-' + options.horizontal[i].substring(0, 1) + '"']);
            }
            alignDOM += DOMCreate('i', '', 'cb-algn-n', '', ['data-class="TxAl-n"']);
            alignDOM = DOMCreate('span', alignDOM, 'alignmentHWrapper');
            alignDOM = FieldRowDOMCreateCol100(DOMCreate('label', 'Horizontal Alignment')) + FieldRowDOMCreateCol100(alignDOM);
        }
        alignTotalDOM = alignDOM;
        alignDOM = '';
        if (EasyLibrary.IsDefined(options.vertical) && options.vertical.length > 0) {
            let optionLen = options.vertical.length;
            for (let i = 0; i < optionLen; i++) {
                alignDOM += DOMCreate('i', '', 'cb-v-algn-' + options.vertical[i].substring(0, 1), '', ['data-class="TxAl-' + options.vertical[i].substring(0, 1) + '"']);
            }
            alignDOM += DOMCreate('i', '', 'cb-v-algn-o', '', ['data-class="TxAl-o"']);
            alignDOM = DOMCreate('span', alignDOM, 'alignmentVWrapper');
            alignDOM = FieldRowDOMCreateCol100(DOMCreate('label', 'Vertical Alignment')) + FieldRowDOMCreateCol100(alignDOM);
        }
        alignTotalDOM = alignTotalDOM + alignDOM;
    }
    return alignTotalDOM;
}
function GeneralAlignMentEvents($parent) {
    if (typeof $parent.attr('data-alignCollection') !== "undefined") {
        $parent = $('.' + $parent.attr('data-alignCollection'));
    }
    LoadSetting();
    function LoadSetting() {
        let parentClasses = $parent.attr('class');
        if (typeof (parentClasses) !== "undefined") {
            let dAlpha = DeviceAlpha();
            let regex = new RegExp(dAlpha + 'TxAl-[a-z]', 'g');
            let alignmentClasses = parentClasses.match(regex);
            if (alignmentClasses !== null) {
                switch (alignmentClasses.length) {
                    case 2:
                        if (dAlpha.length > 0) {
                            alignmentClasses[1] = alignmentClasses[1].slice(1);
                        }
                        $('.alignmentHWrapper').find(`i[data-class="${alignmentClasses[1]}"]`).addClass('selected');
                        $('.alignmentVWrapper').find('i[data-class="' + alignmentClasses[1] + '"]').addClass('selected');
                    //here is no break because if the length is 2 then first also need to be checked.
                    case 1:
                        if (dAlpha.length > 0) {
                            alignmentClasses[0] = alignmentClasses[0].slice(1);
                        }
                        $('.alignmentHWrapper').find('i[data-class="' + alignmentClasses[0] + '"]').addClass('selected');
                        $('.alignmentVWrapper').find('i[data-class="' + alignmentClasses[0] + '"]').addClass('selected');
                        break;
                }
            }
        }
    }
    InitEvent();
    function InitEvent() {
        $('.alignmentHWrapper i').on('click', function () {
            let $this = $(this);
            let dAlpha = DeviceAlpha();
            $parent.removeClass(dAlpha + 'TxAl-l').removeClass(dAlpha + 'TxAl-c').removeClass(dAlpha + 'TxAl-r').removeClass(dAlpha + 'TxAl-n');
            $parent.addClass(dAlpha + $this.attr('data-class'));
            $('.alignmentHWrapper i').removeClass('selected');
            $this.addClass('selected');
        });
        $('.alignmentVWrapper i').on('click', function () {
            let $this = $(this);
            let dAlpha = DeviceAlpha();
            $parent.removeClass(dAlpha + 'TxAl-t').removeClass(dAlpha + 'TxAl-m').removeClass(dAlpha + 'TxAl-b').removeClass(dAlpha + 'TxAl-o');
            $parent.addClass(dAlpha + $this.attr('data-class'));
            $('.alignmentVWrapper i').removeClass('selected');
            $this.addClass('selected');
        });
    }
}
function GeneralSpacingDOM($options) {
    let outerDOM = '';
    let innerDOM = '';
    if (typeof ($options) !== 'undefined') {
        let spaceOption = Object.keys($options);
        let spaceOptionLength = spaceOption.length;
        for (var j = 0; j < spaceOptionLength; j++) {
            let $sp = spaceOption[j];
            switch ($sp) {
                case 'margin':
                    outerDOM += DOMCreate('h4', 'Outer Spacing / Margin', '', 'OuterSpacingWrap', ['data-min="' + $options['margin']['min'] + '"', 'data-max="' + $options['margin']['max'] + '"', 'data-times="' + $options['margin']['times'] + '"']);
                    if (typeof ($options['margin']['position'] !== 'undefined')) {
                        let positionList = $options['margin']['position'];
                        let positionListLen = positionList.length;
                        for (let i = 0; i < positionListLen; i++) {
                            switch (positionList[i].toLowerCase()) {
                                case 'all':
                                    outerDOM += CreateSliderDOM(marginSliderList[0][0], marginSliderList[0][1], 'Bulk');
                                    marginSliderList[0][2] = true;
                                    break;
                                case 'top':
                                    outerDOM += CreateSliderDOM(marginSliderList[1][0], marginSliderList[1][1], 'Top');
                                    marginSliderList[1][2] = true;
                                    break;
                                case 'right':
                                    outerDOM += CreateSliderDOM(marginSliderList[2][0], marginSliderList[2][1], 'Right');
                                    marginSliderList[2][2] = true;
                                    break;
                                case 'bottom':
                                    outerDOM += CreateSliderDOM(marginSliderList[3][0], marginSliderList[3][1], 'Bottom');
                                    marginSliderList[3][2] = true;
                                    break;
                                case 'left':
                                    outerDOM += CreateSliderDOM(marginSliderList[4][0], marginSliderList[4][1], 'Left');
                                    marginSliderList[4][2] = true;
                                    break;
                            }
                        }
                    }
                    outerDOM = FieldRowDOMCreate(outerDOM);
                    break;
                case 'padding':
                    innerDOM += DOMCreate('h4', 'Inner Spacing / Padding', '', 'InnerSpacingWrap', ['data-min="' + $options['padding']['min'] + '"', 'data-max="' + $options['padding']['max'] + '"', 'data-times="' + $options['padding']['times'] + '"']);
                    if (typeof ($options['padding']['position'] !== 'undefined')) {
                        let positionList = $options['padding']['position'];
                        let positionListLen = positionList.length;
                        for (let i = 0; i < positionListLen; i++) {
                            switch (positionList[i].toLowerCase()) {
                                case 'all':
                                    innerDOM += CreateSliderDOM(paddingSliderList[0][0], paddingSliderList[0][1], 'Bulk');
                                    paddingSliderList[0][2] = true;
                                    break;
                                case 'top':
                                    innerDOM += CreateSliderDOM(paddingSliderList[1][0], paddingSliderList[1][1], 'Top');
                                    paddingSliderList[1][2] = true;
                                    break;
                                case 'right':
                                    innerDOM += CreateSliderDOM(paddingSliderList[2][0], paddingSliderList[2][1], 'Right');
                                    paddingSliderList[2][2] = true;
                                    break;
                                case 'bottom':
                                    innerDOM += CreateSliderDOM(paddingSliderList[3][0], paddingSliderList[3][1], 'Bottom');
                                    paddingSliderList[3][2] = true;
                                    break;
                                case 'left':
                                    innerDOM += CreateSliderDOM(paddingSliderList[4][0], paddingSliderList[4][1], 'Left');
                                    paddingSliderList[4][2] = true;
                                    break;
                            }
                        }
                    }
                    innerDOM = FieldRowDOMCreate(innerDOM);
                    break;
            }
        }
    }
    return outerDOM + innerDOM;
}
function GeneralBorderDOM($options) {
    let borderDOM = '';
    if (typeof ($options !== 'undefined')) {
        borderDOM += DOMCreate('h4', 'Border', '', 'borderWrapper', ['data-min="' + $options['min'] + '"', 'data-max="' + $options['max'] + '"', 'data-times="' + $options['times'] + '"', "style='display:none;'"]);
        let selectDOM = DOMCreate('label', 'Border Style', 'fCol') + '<span class="fCol TxAl-r select__box">' + SelectDOMCreate('borderStyle', 'BorderStyle', [['none', 'None'], ['solid', 'Solid'], ['dashed', 'Dashed'], ['dotted', 'Dotted'], ['double', 'Double']]) + '</span>';
        borderDOM += FieldRowDOMCreateCol50_50(selectDOM);
        let borderSliderCollection = '';
        let positionList = $options['position'];
        let positionLength = positionList.length;
        for (var i = 0; i < positionLength; i++) {
            switch (positionList[i].toLowerCase()) {
                case 'all':
                    borderSliderCollection += CreateSliderWithColorDOM(borderSliderList[0][0], borderSliderList[0][1], 'Bulk Border', borderSliderList[0][5], 'borderColorChoose');
                    borderSliderList[0][2] = true;
                    break;
                case 'top':
                    borderSliderCollection += CreateSliderWithColorDOM(borderSliderList[1][0], borderSliderList[1][1], 'Top Border', borderSliderList[1][5], 'borderColorChoose');
                    borderSliderList[1][2] = true;
                    break;
                case 'right':
                    borderSliderCollection += CreateSliderWithColorDOM(borderSliderList[2][0], borderSliderList[2][1], 'Right Border', borderSliderList[2][5], 'borderColorChoose');
                    borderSliderList[2][2] = true;
                    break;
                case 'bottom':
                    borderSliderCollection += CreateSliderWithColorDOM(borderSliderList[3][0], borderSliderList[3][1], 'Bottom Border', borderSliderList[3][5], 'borderColorChoose');
                    borderSliderList[3][2] = true;
                    break;
                case 'left':
                    borderSliderCollection += CreateSliderWithColorDOM(borderSliderList[4][0], borderSliderList[4][1], 'Left Border', borderSliderList[4][5], 'borderColorChoose');
                    borderSliderList[4][2] = true;
                    break;
            }
        }
        borderSliderCollection = DOMCreate('div', borderSliderCollection, 'borderSliderCollection', '', ['style="display:none;"']);
        borderDOM = FieldRowDOMCreate(borderDOM + borderSliderCollection);
    }
    return borderDOM;
}
function BorderBulk(space, $parent) {

    if (borderSliderList[1][2]) {
        $parent.css({ "border-top-width": space });
        $('#' + borderSliderList[1][0]).slider('value', space);
        $('#' + borderSliderList[1][1]).text(space);
    }
    if (borderSliderList[2][2]) {
        $parent.css({ "border-right-width": space });
        $('#' + borderSliderList[2][0]).slider('value', space);
        $('#' + borderSliderList[2][1]).text(space);
    }
    if (borderSliderList[3][2]) {
        $parent.css({ "border-bottom-width": space });
        $('#' + borderSliderList[3][0]).slider('value', space);
        $('#' + borderSliderList[3][1]).text(space);
    }
    if (borderSliderList[4][2]) {
        $parent.css({ "border-left-width": space });
        $('#' + borderSliderList[4][0]).slider('value', space);
        $('#' + borderSliderList[4][1]).text(space);
    }
    if (!borderSliderList[1][2] && !borderSliderList[2][2] && !borderSliderList[3][2] && !borderSliderList[4][2]) {
        $parent.css({ "border-width": space });
    }
}
function BorderTop(space, $parent) {
    $parent.css({ "border-top-width": space });
    BorderBulkNull();
}
function BorderRight(space, $parent) {
    $parent.css({ "border-right-width": space });
    BorderBulkNull();
}
function BorderBottom(space, $parent) {
    $parent.css({ "border-bottom-width": space });
    BorderBulkNull();
}
function BorderLeft(space, $parent) {
    $parent.css({ "border-left-width": space });
    BorderBulkNull();
}
function BorderBulkNull() {
    $('#' + borderSliderList[0][0]).slider('value', 0);
    $('#' + borderSliderList[0][1]).text(0);
}

function GeneralBorderEvents($parent) {
    $('#borderStyle').on('change', function () {
        let style = $(this).val();
        $parent.css('border-style', style);
        if (style === 'none') {
            $parent.css("border-width", '0px');
            $('.borderSliderCollection').hide();
            for (let i = 0; i < 5; i++) {
                $(`#${borderSliderList[i][0]}`).slider('value', 0);
                $('#' + borderSliderList[i][1]).text(0);
            }
        }
        else {
            $parent.css("border-width", '1px');
            for (let i = 0; i < 5; i++) {
                $('#' + borderSliderList[i][0]).slider('value', 1);
                $('#' + borderSliderList[i][1]).text(1);
            }
            $('.borderSliderCollection').show();
        }
    });
    let initialData = {
        on: 'none',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        tc: '',
        lc: '',
        bc: '',
        rc: '',
    };
    if (typeof ($parent[0]) !== "undefined") {
        let prevhovereffect = $parent.attr('data-prevhovereffect');
        if (typeof prevhovereffect !== 'undefined') {
            let tmpEff = JSON.parse(prevhovereffect);
            if (tmpEff.border) {
                //Object.keys(tmpEff.border).forEach((k) => {
                //    initialData[k] = tmpEff.border[k];
                //});
                initialData = tmpEff.border;
            }
        } else if (typeof ($parent[0].style) !== "undefined") {
            let borderStyle = $parent[0].style.borderStyle;
            if (borderStyle.length == 0)
                borderStyle = 'none';
            initialData.on = borderStyle;
            initialData.top = $parent.css('border-top-width');
            initialData.left = $parent.css('border-left-width');
            initialData.bottom = $parent.css('border-bottom-width');
            initialData.right = $parent.css('border-right-width');
            initialData.tc = $parent.css('border-top-color');
            initialData.lc = $parent.css('border-left-color');
            initialData.bc = $parent.css('border-bottom-color');
            initialData.rc = $parent.css('border-right-color');
        }
        $('#borderStyle').val(initialData.on);
        if (initialData.on == 'none') {
            $('.borderSliderCollection').hide();
        } else {
            $('.borderSliderCollection').show();
        }
    }
    LoadBorderInitialValue();
    let $borderWrapper = $('#borderWrapper');
    if (typeof ($borderWrapper.attr('data-max')) !== 'undefined' && typeof ($borderWrapper.attr('data-min')) !== 'undefined') {
        let maxValue = parseInt($borderWrapper.attr('data-max'));
        let minValue = parseInt($borderWrapper.attr('data-min'));
        for (var i = 0; i < 5; i++) {
            if (borderSliderList[i][2]) {
                AdvanceSageSlider($('#' + borderSliderList[i][0]), $('#' + borderSliderList[i][1]), minValue, maxValue, borderSliderList[i][4], borderSliderList[i][3], $parent, 'px');
            }
        }
    }
    function LoadBorderInitialValue() {
        let times = 1;
        if (typeof ($('#borderWrapper').attr('data-times')) !== 'undefined')
            times = parseInt($('#borderWrapper').attr('data-times'));
        if (times == 0)
            times = 1;

        let topWidth = 0, rightWidth = 0, bottomWidth = 0, leftWidth = 0;

        topWidth = initialData.top;
        if (typeof (topWidth) != 'undefined')
            topWidth = parseInt(topWidth.replace('px', ''));
        topWidth = topWidth / times;
        borderSliderList[1][4] = topWidth;


        rightWidth = initialData.right;
        if (typeof (rightWidth) != 'undefined')
            rightWidth = parseInt(rightWidth.replace('px', ''));
        rightWidth = rightWidth / times;
        borderSliderList[2][4] = rightWidth;

        bottomWidth = initialData.bottom;
        if (typeof (bottomWidth) != 'undefined')
            bottomWidth = parseInt(bottomWidth.replace('px', ''));
        bottomWidth = bottomWidth / times;
        borderSliderList[3][4] = bottomWidth;

        leftWidth = initialData.left;
        if (typeof (leftWidth) != 'undefined')
            leftWidth = parseInt(leftWidth.replace('px', ''));
        leftWidth = leftWidth / times;
        borderSliderList[4][4] = leftWidth;

        if (borderSliderList[1][4] === borderSliderList[2][4] &&
            borderSliderList[3][4] === borderSliderList[4][4] &&
            borderSliderList[1][4] === borderSliderList[4][4])
            borderSliderList[0][4] = borderSliderList[1][4];
    }
    LoadBorderColor();
    BorderColorEvents();
    function BorderColorEvents() {
        let colorPickerOption = ColorPickerOption({
            renderCallback: function ($elm, toggled) {
                let objColor = RenderCallBackColor(this);
                let colorPickerID = $elm.attr('id');
                if (colorPickerID === borderSliderList[0][5]) {
                    $parent.css('border-top-color', objColor.bgColor);
                    $parent.css('border-right-color', objColor.bgColor);
                    $parent.css('border-bottom-color', objColor.bgColor);
                    $parent.css('border-left-color', objColor.bgColor);

                    LoadBorderColor();
                }
                else if (colorPickerID === borderSliderList[1][5]) {
                    $parent.css('border-top-color', objColor.bgColor);
                }
                else if (colorPickerID === borderSliderList[2][5]) {
                    $parent.css('border-right-color', objColor.bgColor);
                }
                else if (colorPickerID === borderSliderList[3][5]) {
                    $parent.css('border-bottom-color', objColor.bgColor);
                }
                else if (colorPickerID === borderSliderList[4][5]) {
                    $parent.css('border-left-color', objColor.bgColor);
                }
            }
        });
        $('.borderColorChoose').colorPicker(colorPickerOption);
    }
    function LoadBorderColor() {
        let borderTopColor = initialData.tc;
        let borderRightColor = initialData.rc;
        let borderBottomColor = initialData.bc;
        let borderLeftColor = initialData.lc;
        $('#' + borderSliderList[1][5]).css('background-color', borderTopColor);
        $('#' + borderSliderList[2][5]).css('background-color', borderRightColor);
        $('#' + borderSliderList[3][5]).css('background-color', borderBottomColor);
        $('#' + borderSliderList[4][5]).css('background-color', borderLeftColor);
        if (borderTopColor === borderRightColor && borderBottomColor === borderLeftColor && borderTopColor === borderLeftColor)
            $('#' + borderSliderList[0][5]).css('background-color', borderTopColor);
        else
            $('#' + borderSliderList[0][5]).css('background-color', '#000');

    }
}
function GeneralBoxRadiusDOM($options) {
    let boxRadiusDOM = '';
    if (typeof ($options !== 'undefined')) {
        boxRadiusDOM += DOMCreate('h4', 'Box Radius', '', 'boxRadiusWrapper', ['data-min="' + $options['min'] + '"', 'data-max="' + $options['max'] + '"', 'data-times="' + $options['times'] + '"', 'style="display:none;"']);
        let boxRadiusSliderCollection = '';
        let positionList = $options['position'];
        let positionLength = positionList.length;
        for (var i = 0; i < positionLength; i++) {
            switch (positionList[i].toLowerCase()) {
                case 'all':
                    boxRadiusSliderCollection += CreateSliderDOM(boxRadiusSliderList[0][0], boxRadiusSliderList[0][1], 'Bulk', boxRadiusSliderList[0][5]);
                    boxRadiusSliderList[0][2] = true;
                    break;
                case 'top-left':
                    boxRadiusSliderCollection += CreateSliderDOM(boxRadiusSliderList[1][0], boxRadiusSliderList[1][1], 'Top-Left', boxRadiusSliderList[1][5]);
                    boxRadiusSliderList[1][2] = true;
                    break;
                case 'top-right':
                    boxRadiusSliderCollection += CreateSliderDOM(boxRadiusSliderList[2][0], boxRadiusSliderList[2][1], 'Top- Right', boxRadiusSliderList[2][5]);
                    boxRadiusSliderList[2][2] = true;
                    break;
                case 'bottom-left':
                    boxRadiusSliderCollection += CreateSliderDOM(boxRadiusSliderList[3][0], boxRadiusSliderList[3][1], 'Bottom-Left', boxRadiusSliderList[3][5]);
                    boxRadiusSliderList[3][2] = true;
                    break;
                case 'bottom-right':
                    boxRadiusSliderCollection += CreateSliderDOM(boxRadiusSliderList[4][0], boxRadiusSliderList[4][1], 'Bottom-Right', boxRadiusSliderList[4][5]);
                    boxRadiusSliderList[4][2] = true;
                    break;
            }
        }
        boxRadiusDOM = FieldRowDOMCreate(boxRadiusDOM + boxRadiusSliderCollection);
    }
    return boxRadiusDOM;
}
function BoxRadiusBulk(space, $parent) {

    if (boxRadiusSliderList[1][2]) {
        $parent.css({ "border-top-left-radius": space });
        $parent.find(' > .editor-row-shaded-layer').css({ "border-top-left-radius": space });
        $('#' + boxRadiusSliderList[1][0]).slider('value', space);
        $('#' + boxRadiusSliderList[1][1]).text(space);
    }
    if (boxRadiusSliderList[2][2]) {
        $parent.css({ "border-top-right-radius": space });
        $parent.find(' > .editor-row-shaded-layer').css({ "border-top-right-radius": space });
        $('#' + boxRadiusSliderList[2][0]).slider('value', space);
        $('#' + boxRadiusSliderList[2][1]).text(space);
    }
    if (boxRadiusSliderList[3][2]) {
        $parent.css({ "border-bottom-left-radius": space });
        $parent.find(' > .editor-row-shaded-layer').css({ "border-bottom-left-radius": space });
        $('#' + boxRadiusSliderList[3][0]).slider('value', space);
        $('#' + boxRadiusSliderList[3][1]).text(space);
    }
    if (boxRadiusSliderList[4][2]) {
        $parent.css({ "border-bottom-right-radius": space });
        $parent.find(' > .editor-row-shaded-layer').css({ "border-bottom-right-radius": space });
        $('#' + boxRadiusSliderList[4][0]).slider('value', space);
        $('#' + boxRadiusSliderList[4][1]).text(space);
    }
    if (!boxRadiusSliderList[1][2] && !boxRadiusSliderList[2][2] && !boxRadiusSliderList[3][2] && !boxRadiusSliderList[4][2]) {
        $parent.css({ "border-radius": space });
    }
}
function BoxRadiusTopLeft(space, $parent) {
    $parent.css({ "border-top-left-radius": space });
    $parent.find(' > .editor-row-shaded-layer').css({ "border-top-left-radius": space });
    BoxRadiusBulkNull();
}
function BoxRadiusTopRight(space, $parent) {
    $parent.css({ "border-top-right-radius": space });
    $parent.find(' > .editor-row-shaded-layer').css({ "border-top-right-radius": space });
    BoxRadiusBulkNull();
}
function BoxRadiusBottomLeft(space, $parent) {
    $parent.css({ "border-bottom-left-radius": space });
    $parent.find(' > .editor-row-shaded-layer').css({ "border-bottom-left-radius": space });
    BoxRadiusBulkNull();
}
function BoxRadiusBottomRight(space, $parent) {
    $parent.css({ "border-bottom-right-radius": space });
    $parent.find(' > .editor-row-shaded-layer').css({ "border-bottom-right-radius": space });
    BoxRadiusBulkNull();
}
function BoxRadiusBulkNull() {
    $('#' + boxRadiusSliderList[0][0]).slider('value', 0);
    $('#' + boxRadiusSliderList[0][1]).text(0);
}

function GeneralBoxRadiusEvents($parent) {
    function LoadBoxRadiusInitialValue() {
        let times = 1;
        if (typeof ($('#boxRadiusWrapper').attr('data-times')) !== 'undefined')
            times = parseInt($('#boxRadiusWrapper').attr('data-times'));
        if (times == 0)
            times = 1;


        let topleft = 0, topRight = 0, bottomLeft = 0, bottomRight = 0;

        topleft = $parent.css("border-top-left-radius");
        if (typeof (topleft) != 'undefined')
            topleft = parseInt(topleft.replace('px', ''));
        topleft = topleft / times;
        boxRadiusSliderList[1][4] = topleft;

        topRight = $parent.css("border-top-right-radius");
        if (typeof (topRight) != 'undefined')
            topRight = parseInt(topRight.replace('px', ''));
        topRight = topRight / times;
        boxRadiusSliderList[2][4] = topRight;

        bottomLeft = $parent.css("border-bottom-left-radius");
        if (typeof (bottomLeft) != 'undefined')
            bottomLeft = parseInt(bottomLeft.replace('px', ''));
        bottomLeft = bottomLeft / times;
        boxRadiusSliderList[3][4] = bottomLeft;

        bottomRight = $parent.css("border-bottom-right-radius");
        if (typeof (bottomRight) != 'undefined')
            bottomRight = parseInt(bottomRight.replace('px', ''));
        bottomRight = bottomRight / times;
        boxRadiusSliderList[4][4] = bottomRight;

        if (boxRadiusSliderList[1][4] === boxRadiusSliderList[2][4] && boxRadiusSliderList[3][4] === boxRadiusSliderList[4][4] && boxRadiusSliderList[1][4] === boxRadiusSliderList[4][4])
            boxRadiusSliderList[0][4] = boxRadiusSliderList[1][4];
    }

    LoadBoxRadiusInitialValue();
    let $boxRadiusWrapper = $('#boxRadiusWrapper');
    if (typeof ($boxRadiusWrapper.attr('data-max')) !== 'undefined' && typeof ($boxRadiusWrapper.attr('data-min')) !== 'undefined') {
        let maxValue = parseInt($boxRadiusWrapper.attr('data-max'));
        let minValue = parseInt($boxRadiusWrapper.attr('data-min'));
        for (var i = 0; i < 5; i++) {
            if (boxRadiusSliderList[i][2]) {
                AdvanceSageSlider($('#' + boxRadiusSliderList[i][0]), $('#' + boxRadiusSliderList[i][1]), minValue, maxValue, boxRadiusSliderList[i][4], boxRadiusSliderList[i][3], $parent, 'px');
            }
        }
    }
}
function GeneralBoxShadowDOM($options) {
    let boxShadowDOM = '';
    //boxShadowDOM += DOMCreate('h4', 'Box Shadow', '', 'BoxShadowWrap');
    boxShadowDOM += CreateCheckboxDOM('Activate Box Shadow', 'ShowBoxShadowOption', 'ShowBoxShadowOption');
    let sliderDOM = '';
    let boxOptions = Object.keys($options);
    let boxOptionslen = boxOptions.length;
    sliderDOM = CreateSliderDOM(boxShadowSliderList[0][0], boxShadowSliderList[0][1], 'Horizontal Length');
    sliderDOM += CreateSliderDOM(boxShadowSliderList[1][0], boxShadowSliderList[1][1], 'Vertical Length');
    sliderDOM += CreateSliderDOM(boxShadowSliderList[2][0], boxShadowSliderList[2][1], 'Blur Radius');
    sliderDOM += CreateColorPickerDOM('Shadow Color', 'shadowColor', 'shadowColor');
    sliderDOM += CreateCheckboxDOM('Inset', 'boxshadowInset', 'boxshadowInset');
    sliderDOM = DOMCreate('div', sliderDOM, 'boxShadowEffects', '', ['style="display:none;"']);
    let horiMaxLen = 100, horiMinLen = -100;
    let vertiMaxLen = 100, vertiMinLen = -100;
    let blurMaxLen = 100, blurMinLen = 0;
    sliderDOM += '<input type="hidden" id="boxShadowMinMax" data-hori-min="' + horiMinLen;
    sliderDOM += '" data-hori-max="' + horiMaxLen;
    sliderDOM += '" data-verti-min="' + vertiMinLen + '" data-verti-max="' + vertiMaxLen;
    sliderDOM += '" data-blur-min="' + blurMinLen + '" data-blur-max="' + blurMaxLen + '" />';
    boxShadowDOM += sliderDOM;
    boxShadowDOM = FieldRowDOMCreate(boxShadowDOM);
    return boxShadowDOM;
}
function GeneralBoxShadowEvents($parent) {

    let objBoxShadow = {
        'inset': 'false',
        'horizontal': '0',
        'vertical': '1',
        'blur': '5',
        'color': defaultColor,
    };
    let boxShadow = 'none';
    let prevhovereffect = $parent.attr('data-prevhovereffect');
    if (typeof prevhovereffect !== 'undefined') {
        let tmpEff = JSON.parse(prevhovereffect);
        if (tmpEff.boxShadowStyle) {
            boxShadow = tmpEff.boxShadowStyle;
        }
    } else if (typeof ($parent.attr('style')) !== 'undefined') {
        boxShadow = $parent.css('box-shadow');
    }
    $('#shadowColor').css('background-color', '#000');
    let horiLen = 0, verLen = 0, blurRadius = 0, lenCol = 0;
    if (typeof (boxShadow) !== "undefined" && boxShadow !== null && boxShadow !== 'none') {
        horiLen = objBoxShadow.horizontal;
        verLen = objBoxShadow.vertical;
        blurRadius = objBoxShadow.blur;
        lenCol = boxShadow.match(/-?\d{1,3}px/g);
        horiLen = parseInt(lenCol[0].replace('px', ''));
        verLen = parseInt(lenCol[1].replace('px', ''));
        blurRadius = parseInt(lenCol[2].replace('px', ''));
        objBoxShadow.horizontal = horiLen;
        objBoxShadow.vertical = verLen;
        objBoxShadow.blur = blurRadius;
        $('.boxShadowEffects').show();
        $('#ShowBoxShadowOption').prop('checked', true);
        let dropColor = boxShadow;
        lenCol.forEach((l) => {
            dropColor = dropColor.replace(l, '');
        });
        //let dropColor = boxShadow.replace(horiLen + 'px', '').replace(verLen + 'px', '').replace(blurRadius + 'px', '');
        dropColor = dropColor.replace('inset', '').trim();
        if (dropColor.length > 0) {
            objBoxShadow.color = dropColor;
            $('#shadowColor').css('background-color', dropColor);
        }
        let hasInset = boxShadow.match(/inset/);
        if (hasInset !== null && hasInset.length > 0) {
            $('#boxshadowInset').prop('checked', true);
        }
        else {
            $('#boxshadowInset').prop('checked', false);
        }
    }
    else {
        $('.boxShadowEffects').hide();
        $('#ShowBoxShadowOption').prop('checked', false);
        $('#shadowColor').css('background-color', '#000');
    }
    function parentBoxShadow() {
        let shadowDOM = '';
        shadowDOM += objBoxShadow.color + ' ';
        shadowDOM += objBoxShadow.horizontal + 'px ';
        shadowDOM += objBoxShadow.vertical + 'px ';
        shadowDOM += objBoxShadow.blur + 'px ';
        if ($('#boxshadowInset').prop('checked')) {
            shadowDOM += 'inset ';
        }
        $parent.css({ 'box-shadow': shadowDOM });
    }
    $('#boxshadowInset').off().on('click', function () {
        parentBoxShadow();
    });
    $('#ShowBoxShadowOption').off().on('click', function () {
        if ($(this).is(':checked')) {
            $('.boxShadowEffects').slideDown(400);
            objBoxShadow.color = $('#shadowColor').css('background-color');
            parentBoxShadow();
        }
        else {
            $('.boxShadowEffects').slideUp(400);
            $parent.css({ 'box-shadow': '' });
        }
    });
    let horiMaxLen = parseInt($('#boxShadowMinMax').attr('data-hori-max'));
    let horiMinLen = parseInt($('#boxShadowMinMax').attr('data-hori-min'));
    let vertiMaxLen = parseInt($('#boxShadowMinMax').attr('data-verti-max'));
    let vertiMinLen = parseInt($('#boxShadowMinMax').attr('data-verti-min'));
    let blurMaxLen = parseInt($('#boxShadowMinMax').attr('data-blur-max'));
    let blurMinLen = parseInt($('#boxShadowMinMax').attr('data-blur-min'));
    function BoxShadowHoriLengthSlide(space, $parent) {
        objBoxShadow.horizontal = space;
        parentBoxShadow();
    }
    AdvanceSageSlider($('#' + boxShadowSliderList[0][0]), $('#' + boxShadowSliderList[0][1]), horiMinLen, horiMaxLen, horiLen, BoxShadowHoriLengthSlide, $parent, 'px');

    function BoxShadowVerticalLengthSlide(space) {
        objBoxShadow.vertical = space;
        parentBoxShadow();
    }
    AdvanceSageSlider($('#' + boxShadowSliderList[1][0]), $('#' + boxShadowSliderList[1][1]), vertiMinLen, vertiMaxLen, verLen, BoxShadowVerticalLengthSlide, $parent, 'px');

    function BoxShadowBlurSlide(space) {
        objBoxShadow.blur = space;
        parentBoxShadow();
    }
    AdvanceSageSlider($('#' + boxShadowSliderList[2][0]), $('#' + boxShadowSliderList[2][1]), blurMinLen, blurMaxLen, blurRadius, BoxShadowBlurSlide, $parent, 'px');

    let colorPickerOption = ColorPickerOption({
        renderCallback: function ($elm, toggled) {
            let objColor = RenderCallBackColor(this);
            objBoxShadow.color = objColor.bgColor;
            parentBoxShadow();
        }
    });
    $('#shadowColor').colorPicker(colorPickerOption);
}
function GeneralHoverEffectDOM($options) {
    let hoverDOM = '';
    //hoverDOM += DOMCreate('h4', 'Hover Effect', '', 'hoverEffectWrap');
    hoverDOM += CreateCheckboxDOM('Activate Hover Effect', 'hoverEffectOption', 'hoverEffectOption');
    hoverDOM += '<div class="field-row" id="hoverEffectOptionWrap" style="display:none;">';
    let colorEffect = $options["color"];
    if (typeof (colorEffect) !== "undefined" && colorEffect.length > 0) {
        let colorLength = colorEffect.length;
        for (var i = 0; i < colorLength; i++) {
            switch (colorEffect[i].toLowerCase()) {
                case 'background':
                    hoverDOM += CreateColorPickerDOM('Background Color', 'hoverBGColor', 'hoverColor');
                    break;
                case 'text':
                    hoverDOM += CreateColorPickerDOM('Text Color', 'hoverTextColor', 'hoverColor');
            }
        }
    }
    let showShadow = $options["shadow"];
    if (typeof (showShadow) !== "undefined" && showShadow === "on") {
        hoverDOM += GeneralHoverEffectBoxShadowDOM($options);
    }
    let showHover = $options["border"];
    if (typeof (showHover) !== "undefined") {
        hoverDOM += GeneralBorderHoverDOM($options);
    }
    let showZoom = $options["zoom"];
    if (typeof (showZoom) !== "undefined" && showZoom === "on") {
        hoverDOM += CreateSliderDOM('HoverZoomSlider', 'HoverZoomSliderHandle', 'Zoom');
    }
    hoverDOM += '</div>';
    hoverDOM = FieldRowDOMCreate(hoverDOM);

    function GeneralHoverEffectBoxShadowDOM($options) {
        let boxShadowDOM = '';
        boxShadowDOM += CreateCheckboxDOM('Activate Box Shadow', 'ShowBoxShadowEffectOption', 'ShowBoxShadowShadowEffectOption');
        let sliderDOM = '';
        let boxOptions = Object.keys($options);
        let boxOptionslen = boxOptions.length;
        sliderDOM = CreateSliderDOM(boxShadowEffectSliderList[0][0], boxShadowEffectSliderList[0][1], 'Horizontal Length');
        sliderDOM += CreateSliderDOM(boxShadowEffectSliderList[1][0], boxShadowEffectSliderList[1][1], 'Vertical Length');
        sliderDOM += CreateSliderDOM(boxShadowEffectSliderList[2][0], boxShadowEffectSliderList[2][1], 'Blur Radius');
        sliderDOM += CreateColorPickerDOM('Shadow Color', 'shadowEffectColor', 'shadowEffectColor');
        sliderDOM += CreateCheckboxDOM('Inset', 'boxshadowEffectInset', 'boxshadowEffectInset');
        sliderDOM = DOMCreate('div', sliderDOM, 'boxShadowEffectWrappers', '', ['style="display:none;"']);
        let horiMaxLen = 100, horiMinLen = -100;
        let vertiMaxLen = 100, vertiMinLen = -100;
        let blurMaxLen = 100, blurMinLen = 0;

        sliderDOM += '<input type="hidden" id="boxShadowEffectMinMax" data-hori-min="' + horiMinLen;
        sliderDOM += '" data-hori-max="' + horiMaxLen;
        sliderDOM += '" data-verti-min="' + vertiMinLen + '" data-verti-max="' + vertiMaxLen;
        sliderDOM += '" data-blur-min="' + blurMinLen + '" data-blur-max="' + blurMaxLen + '" />';
        boxShadowDOM += sliderDOM;
        boxShadowDOM = FieldRowDOMCreate(boxShadowDOM);
        return boxShadowDOM;
    }

    function GeneralBorderHoverDOM($border) {
        let borderHoverDOM = "";
        if (typeof ($border) !== 'undefined') {
            let $options = $border['border'];
            if (typeof ($options) !== 'undefined') {
                borderHoverDOM += DOMCreate('h4', 'Border', '', 'borderHoverWrapper', ['data-min="' + $options['min'] + '"', 'data-max="' + $options['max'] + '"', "style=display:none;", 'data-times="' + $options['times'] + '"']);
                let selectDOM = DOMCreate('label', 'Border Hover Style', 'fCol') +
                    DOMCreate('div', DOMCreate('span', SelectDOMCreate('borderHoverStyle', 'BorderHoverStyle', [['none', 'None'], ['solid', 'Solid'], ['dashed', 'Dashed'], ['dotted', 'Dotted'], ['double', 'Double']]), 'select__box'), 'fCol TxAl-r');
                borderHoverDOM += FieldRowDOMCreateCol50_50(selectDOM);
                let borderHoverSliderCollection = '';
                let positionList = $options['position'];
                if (typeof (positionList) !== "undefined") {
                    let positionLength = positionList.length;
                    for (var i = 0; i < positionLength; i++) {
                        switch (positionList[i].toLowerCase()) {
                            case 'all':
                                borderHoverSliderCollection += CreateSliderWithColorDOM(borderHoverSliderList[0][0], borderHoverSliderList[0][1], 'Bulk Border', borderHoverSliderList[0][5], 'borderHoverColorChoose');
                                borderHoverSliderList[0][2] = true;
                                break;
                            case 'top':
                                borderHoverSliderCollection += CreateSliderWithColorDOM(borderHoverSliderList[1][0], borderHoverSliderList[1][1], 'Top Border', borderHoverSliderList[1][5], 'borderHoverColorChoose');
                                borderHoverSliderList[1][2] = true;
                                break;
                            case 'right':
                                borderHoverSliderCollection += CreateSliderWithColorDOM(borderHoverSliderList[2][0], borderHoverSliderList[2][1], 'Right Border', borderHoverSliderList[2][5], 'borderHoverColorChoose');
                                borderHoverSliderList[2][2] = true;
                                break;
                            case 'bottom':
                                borderHoverSliderCollection += CreateSliderWithColorDOM(borderHoverSliderList[3][0], borderHoverSliderList[3][1], 'Bottom Border', borderHoverSliderList[3][5], 'borderHoverColorChoose');
                                borderHoverSliderList[3][2] = true;
                                break;
                            case 'left':
                                borderHoverSliderCollection += CreateSliderWithColorDOM(borderHoverSliderList[4][0], borderHoverSliderList[4][1], 'Left Border', borderHoverSliderList[4][5], 'borderHoverColorChoose');
                                borderHoverSliderList[4][2] = true;
                                break;
                        }
                    }
                    borderHoverSliderCollection = DOMCreate('div', borderHoverSliderCollection, 'borderHoverSliderCollection', '', ['style="display:none;"']);
                    borderHoverDOM = FieldRowDOMCreate(borderHoverDOM + borderHoverSliderCollection);
                }
            }
        }
        return borderHoverDOM;
    }
    return hoverDOM;
}
function MouseOverEffect($parent) {
    function ApplyEffects($this) {
        let boxShadowStyle = $this.css('box-shadow');
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
            "boxShadowStyle": boxShadowStyle,
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
        hoverEffect = JSON.parse($this.attr('data-hovereffect'));
        if ($this.find('.onhoverbgcolor').length > 0) {
            previousdata.bg = $this.find('.onhoverbgcolor').eq(0).css('background-color');
            $this.find('.onhoverbgcolor').css({ 'background-color': hoverEffect.bg });
        }
        else {
            previousdata.bg = $this.css('background-color');
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
            //previousdata.box.on = "off";
            if ($this.attr('hovered-mousein') === "in")
                previousdata.box.on = "off";
            let boxShadow = $this.css('box-shadow');
            if (typeof (boxShadow) !== "undefined" && boxShadow !== null && boxShadow !== 'none') {
                //previousdata.box.on = "on";
                let lenCol = boxShadow.match(/-?\d{1,3}px/g);
                previousdata.box.hl = lenCol[0] + ' ';
                previousdata.box.vl = lenCol[1] + ' ';
                previousdata.box.br = lenCol[2] + ' ';
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
        //if ($this.attr('hovered-mousein') === "in")
        //previousdata.box.on = 'off';
        $this.attr('data-prevhovereffect', JSON2.stringify(previousdata));
    }

    function ResetPreviousEffect($this) {
        let prevEff = $this.attr('data-prevhovereffect');
        if (typeof prevEff === 'undefined') {
            return;
        }
        let hoverEffect = JSON.parse(prevEff);
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
            $this.css({ 'box-shadow': hoverEffect.boxShadowStyle });
        }
        let $border = hoverEffect.border;
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
    let $selected = $('.hovered');
    if (typeof ($parent) !== "undefined") {
        if ($parent.hasClass('hovered')) {
            $selected = $parent;
            effect($selected);
        }
        else if ($parent.find('.hovered').length > 0) {
            $selected = $parent.find('.hovered');
            $selected.each(function () {
                effect($(this));
            });
        }
    }

    function effect($sel) {
        $sel.off('mouseout').on('mouseout', function () {
            $(this).attr('hovered-mousein', 'out');
            ResetPreviousEffect($(this));
        });
        $sel.off('mouseover').on('mouseover', function () {
            $(this).attr('hovered-mousein', 'in');
            ApplyEffects($(this));
        });
    }
}
function RemoveMouseOverEffect($parent) {
    if (typeof ($parent) !== "undefined") {
        if ($parent.hasClass('hovered')) {
            $parent.off('mouseover').off('mouseout').removeClass('hovered');
        }
        else if ($parent.find('.hovered').length > 0) {
            let $selected = $parent.find('.hovered');
            $selected[0].off('mouseover').off('mouseout').removeClass('hovered');
            $selected.each(function (i, v) {
                v.off('mouseover').off('mouseout').removeClass('hovered');
            });
        }
    }
    else
        $('.hovered').off('mouseover').off('mouseout').removeClass('hovered');
}
function BorderHoverBulk(space, $parent) {
    if (borderHoverSliderList[1][2]) {
        currentHoverEffect.border.top = space;
        $('#' + borderHoverSliderList[1][0]).slider('value', space);
        $('#' + borderHoverSliderList[1][1]).text(space);
    }
    if (borderHoverSliderList[2][2]) {
        currentHoverEffect.border.right = space;
        $('#' + borderHoverSliderList[2][0]).slider('value', space);
        $('#' + borderHoverSliderList[2][1]).text(space);
    }
    if (borderHoverSliderList[3][2]) {
        currentHoverEffect.border.bottom = space;
        $('#' + borderHoverSliderList[3][0]).slider('value', space);
        $('#' + borderHoverSliderList[3][1]).text(space);
    }
    if (borderHoverSliderList[4][2]) {
        currentHoverEffect.border.left = space;
        $('#' + borderHoverSliderList[4][0]).slider('value', space);
        $('#' + borderHoverSliderList[4][1]).text(space);
    }
    UpdateEffect($parent);
}
function BorderHoverTop(space, $parent) {
    currentHoverEffect.border.top = space;
    BorderHoverBulkNull($parent);
}
function BorderHoverRight(space, $parent) {
    currentHoverEffect.border.right = space;
    BorderHoverBulkNull($parent);
}
function BorderHoverBottom(space, $parent) {
    currentHoverEffect.border.bottom = space;
    BorderHoverBulkNull($parent);
}
function BorderHoverLeft(space, $parent) {
    currentHoverEffect.border.left = space;
    BorderHoverBulkNull($parent);
}
function BorderHoverBulkNull($parent) {
    $('#' + borderHoverSliderList[0][0]).slider('value', 0);
    $('#' + borderHoverSliderList[0][1]).text(0);
    UpdateEffect($parent);
}
function UpdateEffect($parent) {
    $parent.attr('data-hovereffect', JSON2.stringify(currentHoverEffect));
}
let currentHoverEffect = {
    "bg": "#ccc",
    "font": "#000",
    "box": {
        "on": "off",
        "hl": "0px",
        "vl": "0px",
        "br": "0px",
        "c": "#000",
        "i": "false",
    },
    "border": {
        "on": "none",
        "top": "0",
        "right": "0",
        "bottom": "0",
        "left": "0",
        "tc": "#000",
        "rc": "#000",
        "bc": "#000",
        "lc": "#000"
    },
    "zoom": "10",
    "delay": 0
};
function GeneralIconHoverEffectEvent($parent) {
    let hoverdata = $parent.attr('data-hovereffect');
    if (typeof hoverdata !== 'undefined') {
        try {
            currentHoverEffect = JSON.parse(hoverdata);
        } catch (e) {
            console.log("invalid hovereffect data");
        }
    }
    InitEvents();
    function InitEvents() {
        GeneralBoxShadowEffectEvents($parent);
        GeneralBorderHoverEvents($parent);
        $('#hoverEffectOption').off().on('click', function () {
            if ($(this).is(':checked')) {
                $('#hoverEffectOptionWrap').show();
                $parent.addClass('hovered');
                //currentHoverEffect = {
                //    "bg": "#ccc",
                //    "font": "#000",
                //    "box": {
                //        "on": "off",
                //        "hl": "0px",
                //        "vl": "1px",
                //        "br": "5px",
                //        "c": "#000",
                //        "i": "false",
                //    },
                //    "border": {
                //        "on": "none",
                //        "top": "0",
                //        "right": "0",
                //        "bottom": "0",
                //        "left": "0",
                //        "tc": "#000",
                //        "rc": "#000",
                //        "bc": "#000",
                //        "lc": "#000"
                //    },
                //    "zoom": "10",
                //    "delay": 0
                //};
                MouseOverEffect($parent);
                UpdateEffect($parent);
                InitializeEffecValue();
            }
            else {
                $('#hoverEffectOptionWrap').hide();
                RemoveMouseOverEffect($parent);
            }
        });
        let colorPickerOption = ColorPickerOption({
            renderCallback: function ($elm, toggled) {
                let objColor = RenderCallBackColor(this);
                let colorPickerID = $elm.attr('id');
                switch (colorPickerID) {
                    case 'hoverBGColor':
                        currentHoverEffect.bg = objColor.bgColor;
                        break;
                    case 'hoverTextColor':
                        currentHoverEffect.font = objColor.bgColor;
                        break;
                }
                UpdateEffect($parent);
            }
        });
        $('.hoverColor').colorPicker(colorPickerOption);
        function OnZoom(space) {
            currentHoverEffect.zoom = space;
            UpdateEffect($parent);
        }
        AdvanceSageSlider($('#HoverZoomSlider'), $('#HoverZoomSliderHandle'), 1, 20, 10, OnZoom, $parent, '');
        if ($parent.hasClass('hovered')) {
            InitializeEffecValue();
            $('#hoverEffectOption').prop('checked', true);
            $('#hoverEffectOptionWrap').show();
        }
        else {
            $('#hoverEffectOption').prop('checked', false);
        }
    }

    function InitializeEffecValue() {
        let initHoverEffect = JSON.parse($parent.attr('data-hovereffect'));
        $('#hoverBGColor').css('background-color', initHoverEffect.bg);
        $('#hoverTextColor').css('background-color', initHoverEffect.font);
        let effectZoom = initHoverEffect.zoom;
        ChangeSliderValue($('#HoverZoomSlider'), effectZoom);
        let shadowon = initHoverEffect.box.on;
        if (shadowon == "on") {
            $('.boxShadowEffectWrappers').show();
            $('#ShowBoxShadowEffectOption').prop('checked', true);
        }
        else {
            $('.boxShadowEffectWrappers').hide();
            $('#ShowBoxShadowEffectOption').prop('checked', false);
        }
    }

    function GeneralBoxShadowEffectEvents($parent) {

        $('#boxshadowEffectInset').off().on('click', function () {
            parentBoxShadow();
        });
        $('#ShowBoxShadowEffectOption').off().on('click', function () {
            if ($(this).is(':checked')) {
                $('.boxShadowEffectWrappers').slideDown(400);
                currentHoverEffect.box.on = "on";
                parentBoxShadow();
            }
            else {
                $('.boxShadowEffectWrappers').slideUp(400);
                currentHoverEffect.box.on = "off";
                parentBoxShadow();
            }
        });
        let objBoxShadow = {
            'inset': '',
            'horizontal': '0',
            'vertical': '0',
            'blur': '0',
            'color': '#000',
        };
        let boxShadow = $parent.attr('data-hovereffect');
        $('#shadowEffectColor').css('background-color', '#000');
        let horiLen = 0;
        let verLen = 0;
        let blurRadius = 0;
        if (typeof (boxShadow) !== "undefined" && boxShadow !== null && boxShadow !== 'none') {
            let initHoverEffect = JSON.parse($parent.attr('data-hovereffect'));
            let $shadow = initHoverEffect.box;
            horiLen = $shadow.hl;
            verLen = $shadow.vl;
            blurRadius = $shadow.br;
            horiLen = parseInt(horiLen.replace('px', ''));
            verLen = parseInt(verLen.replace('px', ''));
            blurRadius = parseInt(blurRadius.replace('px', ''));
            objBoxShadow.horizontal = horiLen;
            objBoxShadow.vertical = verLen;
            objBoxShadow.blur = blurRadius;
            $('.boxShadowEffectWrappers').show();
            $('#ShowBoxShadowEffectOption').prop('checked', true);
            $('#shadowEffectColor').css('background-color', $shadow.c);
            let inset = $shadow.i;
            if (inset == "true" || inset.trim() == "inset") {
                $('#boxshadowEffectInset').prop('checked', true);
            }
            else {
                $('#boxshadowEffectInset').prop('checked', false);
            }
        }
        else {
            $('.boxShadowEffectWrappers').hide();
            $('#ShowBoxShadowEffectOption').prop('checked', false);
            $('#shadowEffectColor').css('background-color', '#000');
        }
        function parentBoxShadow() {
            currentHoverEffect.box.c = objBoxShadow.color + ' ';
            currentHoverEffect.box.hl = objBoxShadow.horizontal + 'px ';
            currentHoverEffect.box.vl = objBoxShadow.vertical + 'px ';
            currentHoverEffect.box.br = objBoxShadow.blur + 'px ';
            if ($('#boxshadowEffectInset').prop('checked')) {
                currentHoverEffect.box.i = ' inset ';
            }
            else
                currentHoverEffect.box.i = '';
            UpdateEffect($parent);
        }
        let horiMaxLen = parseInt($('#boxShadowEffectMinMax').attr('data-hori-max'));
        let horiMinLen = parseInt($('#boxShadowEffectMinMax').attr('data-hori-min'));
        let vertiMaxLen = parseInt($('#boxShadowEffectMinMax').attr('data-verti-max'));
        let vertiMinLen = parseInt($('#boxShadowEffectMinMax').attr('data-verti-min'));
        let blurMaxLen = parseInt($('#boxShadowEffectMinMax').attr('data-blur-max'));
        let blurMinLen = parseInt($('#boxShadowEffectMinMax').attr('data-blur-min'));
        function BoxShadowHoriLengthSlide(space, $parent) {
            objBoxShadow.horizontal = space;
            parentBoxShadow();
        }
        AdvanceSageSlider($('#' + boxShadowEffectSliderList[0][0]), $('#' + boxShadowEffectSliderList[0][1]), horiMinLen, horiMaxLen, horiLen, BoxShadowHoriLengthSlide, $parent, 'px');

        function BoxShadowVerticalLengthSlide(space) {
            objBoxShadow.vertical = space;
            parentBoxShadow();
        }
        AdvanceSageSlider($('#' + boxShadowEffectSliderList[1][0]), $('#' + boxShadowEffectSliderList[1][1]), vertiMinLen, vertiMaxLen, verLen, BoxShadowVerticalLengthSlide, $parent, 'px');

        function BoxShadowBlurSlide(space) {
            objBoxShadow.blur = space;
            parentBoxShadow();
        }
        AdvanceSageSlider($('#' + boxShadowEffectSliderList[2][0]), $('#' + boxShadowEffectSliderList[2][1]), blurMinLen, blurMaxLen, blurRadius, BoxShadowBlurSlide, $parent, 'px');

        let colorPickerOption = ColorPickerOption({
            renderCallback: function ($elm, toggled) {
                let objColor = RenderCallBackColor(this);
                objBoxShadow.color = objColor.bgColor;
                parentBoxShadow();
            }
        });
        $('#shadowEffectColor').colorPicker(colorPickerOption);
    }

    function GeneralBorderHoverEvents($parent) {
        $('#borderHoverStyle').on('change', function () {
            let style = $(this).val();
            let borderHoverEfffect = {
                "top": "0px",
                "right": "0px",
                "bottom": "0px",
                "left": "0px"
            };
            if (style === 'none') {
                $('.borderHoverSliderCollection').hide();
                for (var i = 0; i < 5; i++) {
                    $('#' + borderHoverSliderList[i][0]).slider('value', 0);
                    $('#' + borderHoverSliderList[i][1]).text(0);
                }
                currentHoverEffect.border.on = style;
                currentHoverEffect.border.top = "0px";
                currentHoverEffect.border.right = "0px";
                currentHoverEffect.border.bottom = "0px";
                currentHoverEffect.border.left = "0px";
                UpdateEffect($parent);
            }
            else {
                currentHoverEffect.border.on = style;
                currentHoverEffect.border.top = "1px";
                currentHoverEffect.border.right = "1px";
                currentHoverEffect.border.bottom = "1px";
                currentHoverEffect.border.left = "1px";
                for (var i = 0; i < 5; i++) {
                    $('#' + borderHoverSliderList[i][0]).slider('value', 1);
                    $('#' + borderHoverSliderList[i][1]).text(1);
                }
                UpdateEffect($parent);
                $('.borderHoverSliderCollection').show();
            }
        });

        let domHoverEffect = $parent.attr('data-hovereffect');
        if (typeof (domHoverEffect) !== "undefined" && domHoverEffect !== null && domHoverEffect !== 'none') {
            domHoverEffect = JSON.parse($parent.attr('data-hovereffect'));
            let borderStyle = domHoverEffect.border.on;
            if (borderStyle.length == 0)
                borderStyle = 'none';
            $('#borderHoverStyle').val(borderStyle);
            if (borderStyle == 'none') {
                $('.borderHoverSliderCollection').hide();
            } else {
                $('.borderHoverSliderCollection').show();
            }
        }
        else {
            domHoverEffect = hoverEffect;
        }
        let $borderWrapper = $('#borderHoverWrapper');
        LoadBorderHoverInitialValue();
        if (typeof ($borderWrapper) !== "undefined" && typeof ($borderWrapper.attr('data-max')) !== 'undefined' && typeof ($borderWrapper.attr('data-min')) !== 'undefined') {
            let maxValue = parseInt($borderWrapper.attr('data-max'));
            let minValue = parseInt($borderWrapper.attr('data-min'));
            for (var i = 0; i < 5; i++) {
                if (borderHoverSliderList[i][2]) {
                    AdvanceSageSlider($('#' + borderHoverSliderList[i][0]), $('#' + borderHoverSliderList[i][1]), minValue, maxValue, borderHoverSliderList[i][4], borderHoverSliderList[i][3], $parent, 'px');
                }
            }
        }
        function LoadBorderHoverInitialValue() {
            let times = 1;
            if (typeof ($borderWrapper.attr('data-times')) !== 'undefined')
                times = parseInt($borderWrapper.attr('data-times'));
            if (times == 0)
                times = 1;

            let topWidth = 0, rightWidth = 0, bottomWidth = 0, leftWidth = 0;
            if (typeof (domHoverEffect) !== "undefined") {
                topWidth = domHoverEffect.border.top;
                if (typeof (topWidth) != 'undefined')
                    topWidth = parseInt(topWidth);
                topWidth = topWidth / times;
            }
            borderHoverSliderList[1][4] = topWidth;

            if (typeof (domHoverEffect) !== "undefined") {
                rightWidth = domHoverEffect.border.right;
                if (typeof (rightWidth) != 'undefined')
                    rightWidth = parseInt(rightWidth);
                rightWidth = rightWidth / times;
            }
            borderHoverSliderList[2][4] = rightWidth;

            if (typeof (domHoverEffect) !== "undefined") {
                bottomWidth = domHoverEffect.border.bottom;
                if (typeof (bottomWidth) != 'undefined')
                    bottomWidth = parseInt(bottomWidth);
                bottomWidth = bottomWidth / times;
            }
            borderHoverSliderList[3][4] = bottomWidth;

            if (typeof (domHoverEffect) !== "undefined") {
                leftWidth = domHoverEffect.border.left;
                if (typeof (leftWidth) != 'undefined')
                    leftWidth = parseInt(leftWidth);
                leftWidth = leftWidth / times;
            }
            borderHoverSliderList[4][4] = leftWidth;

            if (borderHoverSliderList[1][4] === borderHoverSliderList[2][4] &&
                borderHoverSliderList[3][4] === borderHoverSliderList[4][4] &&
                borderHoverSliderList[1][4] === borderHoverSliderList[4][4])
                borderHoverSliderList[0][4] = borderHoverSliderList[1][4];
        }
        LoadBorderHoverColor();
        BorderColorEvents();
        function BorderColorEvents() {
            let colorPickerOption = ColorPickerOption({
                renderCallback: function ($elm, toggled) {
                    let objColor = RenderCallBackColor(this);
                    let colorPickerID = $elm.attr('id');
                    if (colorPickerID === borderHoverSliderList[0][5]) {
                        currentHoverEffect.border.tc = objColor.bgColor;
                        currentHoverEffect.border.rc = objColor.bgColor;
                        currentHoverEffect.border.bc = objColor.bgColor;
                        currentHoverEffect.border.lc = objColor.bgColor;
                        $('#' + borderHoverSliderList[1][5]).css('background-color', objColor.bgColor);
                        $('#' + borderHoverSliderList[2][5]).css('background-color', objColor.bgColor);
                        $('#' + borderHoverSliderList[3][5]).css('background-color', objColor.bgColor);
                        $('#' + borderHoverSliderList[4][5]).css('background-color', objColor.bgColor);
                    }
                    else if (colorPickerID === borderHoverSliderList[1][5]) {
                        currentHoverEffect.border.tc = objColor.bgColor;
                    }
                    else if (colorPickerID === borderHoverSliderList[2][5]) {
                        currentHoverEffect.border.rc = objColor.bgColor;
                    }
                    else if (colorPickerID === borderHoverSliderList[3][5]) {
                        currentHoverEffect.border.bc = objColor.bgColor;
                    }
                    else if (colorPickerID === borderHoverSliderList[4][5]) {
                        currentHoverEffect.border.lc = objColor.bgColor;
                    }
                    UpdateEffect($parent);
                }
            });
            $('.borderHoverColorChoose').colorPicker(colorPickerOption);
        }

        function LoadBorderHoverColor() {

            let borderTopColor = blackColor, borderRightColor = blackColor, borderBottomColor = blackColor, borderLeftColor = blackColor;
            if (typeof (domHoverEffect) !== "undefined") {
                borderTopColor = domHoverEffect.border.tc;
                borderRightColor = domHoverEffect.border.rc;
                borderBottomColor = domHoverEffect.border.bc;
                borderLeftColor = domHoverEffect.border.lc;
            }
            $('#' + borderHoverSliderList[1][5]).css('background-color', borderTopColor);
            $('#' + borderHoverSliderList[2][5]).css('background-color', borderRightColor);
            $('#' + borderHoverSliderList[3][5]).css('background-color', borderBottomColor);
            $('#' + borderHoverSliderList[4][5]).css('background-color', borderLeftColor);
            if (borderTopColor === borderRightColor && borderBottomColor === borderLeftColor && borderTopColor === borderLeftColor)
                $('#' + borderHoverSliderList[0][5]).css('background-color', borderTopColor);
            else
                $('#' + borderHoverSliderList[0][5]).css('background-color', '#000');
        }
    }

}
function GeneralScrolleffect($option) {
    let effectDOM = FieldRowDOMCreateCol50_50(
        DOMCreate('label', 'Scroll Effect', 'fCol') +
        DOMCreate('div',
            DOMCreate('span',
                SelectDOMCreate('scrolleffect', 'scrolleffect', [['none', 'None'], ['fade-up', 'fade-up'], ['fade-down', 'fade-down'], ['fade-left', 'fade-left'], ['fade-right', 'fade-right']]),//['zoom-in', 'zoom-in'], ['zoom-out', 'zoom-out']
                'select__box'),
            'fCol TxAl-r')
    );
    let delayDOM = DOMCreate('div',
        DOMCreate('label', 'Delay', 'fCol') +
        DOMCreate('div',
            DOMCreate('span',
                SelectDOMCreate('delayscrolleffect', 'delayscrolleffect', [['0', '0'], ['50', '50'], ['100', '100'], ['200', '200'], ['300', '300'], ['400', '400'], ['800', '800'], ['1200', '1200'], ['1600', '1600'], ['1200', '1200'], ['2000', '2000'], ['2400', '2400'], ['2800', '2800'], ['3200', '3200'], ['3600', '3600'], ['4000', '4000']]),
                'select__box'),
            'fCol TxAl-r'),
        'field-row stElWrap col50-50', 'delayscrolleffectWrap');
    //var previewScroll = FieldRowDOMCreateCol100()

    return FieldRowDOMCreate(effectDOM + delayDOM);
}
function GeneralScrollEffectEvent($selectedLayer) {
    InitEvents();
    function InitEvents() {
        let scrollClass = 'none';
        $('#delayscrolleffectWrap').hide();
        if ($selectedLayer.hasClass('scroll-begin')) {
            scrollClass = $selectedLayer.attr('data-scroll');
            $('#delayscrolleffectWrap').show();
        }
        $('#scrolleffect').val(scrollClass);
        let delayamount = '0';
        if ($selectedLayer.hasClass('scroll-begin') && typeof ($selectedLayer.attr('data-scrolldelay')) !== "undefined") {
            delayamount = $selectedLayer.attr('data-scrolldelay');
        }
        $('#delayscrolleffect').val(delayamount);

        $('#scrolleffect').on('change', function () {
            let value = $(this).val();
            $selectedLayer.attr('data-scroll', value);
            if (value === "none") {
                $selectedLayer.removeClass('scroll-begin');
                $selectedLayer.removeAttr('data-scroll');
                $('#delayscrolleffectWrap').hide();
            }
            else {
                $('#delayscrolleffectWrap').show();
                if (!$selectedLayer.hasClass('scroll-begin'))
                    $selectedLayer.addClass('scroll-begin');
            }

        });

        $('#delayscrolleffect').on('change', function () {
            let value = $(this).val();
            $selectedLayer.attr('data-scrolldelay', value);
        });
    }
}
function CalculateWidth($parent) {
    /*$parent.find('.editor-col').each(function () {
        let $this = $(this);
        let width = $this.width();
        let sfColVal = $this.attr('class').match(/sfCol_[0-9]{1,3}/g);
        if (sfColVal !== null) {
            let sfColPer = sfColVal[0].split('_')[1];
            $this.attr('data-width', width);
            $this.css({ 'width': 'calc( ' + sfColPer + '% - ' + dragComponetWidth + ' )' });
        }
    });*/
}
function InitComponentStyle($currentComponent, manipulateSelector, dropped, iconStyles, defaultdata, displayStyle, $title) {
    let option = {
        "ulClass": "sfCol_100 ",
        "liClass": "",
        "ulStyle": "",
        "liStyle": ""
    };
    option = $.extend(option, displayStyle);
    let selectDOM = '';
    $.each(iconStyles, function (title, $section) {
        let totalStyle = Object.keys($section).length;
        let list = DOMCreate('li', title, 'title sfCol_100 Dn');
        for (var i = 0; i < totalStyle; i++) {
            list += DOMCreate('li', defaultdata, 'selectData ' + option.liClass, '', ['style="' + option.liStyle + '"', 'data-title="' + title + '"', 'data-style="' + i + '"']);
        }
        selectDOM += DOMCreate('ul', list, 'selectDataWrapper Dfx flxWrp ' + option.ulClass, '', ['style="' + option.ulStyle + '"']);
    });
    //if (typeof (dropped) !== "undefined") {
    //    if (dropped) {
    //        selectDOM = selectDOM;
    //    }
    //}
    InitComponentStyleWithdata($currentComponent, manipulateSelector, iconStyles, selectDOM, $title);
}
/* dropped component, component to be manipulate, stylesm, PopoupDOM*/
function InitComponentStyleWithdata($currentComponent, manipulateSelector, iconStyles, selectDOM, $title) {
    FullPagePopup({
        data: selectDOM,
        heading: $title,
        showheading: true,
        width: '40%'
    });
    let count = 0;
    $.each(iconStyles, function (title, $section) {
        let totalStyle = Object.keys($section).length;
        for (var i = 0; i < totalStyle; i++) {
            let icon = $section[i];
            SetStyleAttribute($('.selectDataWrapper').eq(count).find('.selectData').eq(i).find(manipulateSelector), icon);
        }
        count++;
    });
    $('.selectDataWrapper').find('.SetHdlr').remove();
    $('.selectData').off().on('click', function () {
        let $this = $(this);
        let icon = iconStyles[$this.attr('data-title')][$this.attr('data-style')];
        SetStyleAttribute($currentComponent, icon);
        CloseFullPagePopup();
    });
}
function SetStyleAttribute($component, $attributes) {
    let attributesKeyList = Object.keys($attributes);
    let attributeLength = attributesKeyList.length;

    for (var i = 0; i < attributeLength; i++) {
        let key = attributesKeyList[i];
        let value = $attributes[key];
        if (typeof (value) === "string")
            $component.attr(key, $attributes[key]);
        else if (typeof (value) === "function") {
            value($component);
        }
    }
}
let slickSliderList = {};
function DraggableSortable() {
    $(".editor-col").sortable({
        revert: 0,
        delay: 150,
        items: 'div.editor-component',
        cancel: '.col-options',
        handle: ".sortComponent",
        helper: function () {
            return $('<div class="comhelperBox" style="height:40px;width:100px;"></div>');
        },
        connectWith: '.editor-col',
        cursorAt: { left: 5, top: 5 },
        placeholder: 'ui-state-com-sortable-hover ui-hover-state',
        stop: function (event, ui) {
            let dataType = $(ui.item[0]).find('> .SetHdlr').find('.com-settings').attr('data-type');
            if (dataType !== "undefined") {
                if (typeof component[dataType].onsort !== "undefined") {
                    component[dataType].onsort($(ui.item[0]));
                }
            }
        },
        receive: function (event, ui) {
            $(this).find("> .column-data-empty").remove();
        }
    }).droppable({
        accept: ".comBasic",
        greedy: true,
        tolerance: 'pointer',
        hoverClass: "ui-state-com-droppable-hover ui-hover-state",
        drop: function (event, ui) {
            $('.ui-hover-state').removeClass('ui-state-com-droppable-hover ui-hover-state ui-state-row-hover');
            let $slickSlide = $(this).parents('.slick-slide');
            if ($slickSlide.length == 1 && $slickSlide.css("z-index") != "auto") {
                let $contentsliderDom = $slickSlide.parents('.contentsliderDom');
                let $dataId = $contentsliderDom.attr('data-id');
                //console.log($dataId, slickSliderList, slickSliderList[$dataId]);
                let cList = slickSliderList[$dataId];
                //find element with highest z-index
                let highest = 0;
                let topEl;
                for (let i = 0; i < cList.length; i++) {
                    let el = $contentsliderDom.find('.slide-c-' + cList[i]).parents('.slick-slide');
                    let zi = $(el).css('z-index');
                    //console.log("current ", highest, "new ", zi, " c = ", cList[i]);
                    if (zi > highest) {
                        highest = zi;
                        topEl = '.slide-c-' + cList[i];
                    }
                }
                //console.log("top el ", topEl);
                if ($(this).parents(topEl).length === 0) {
                    return;
                }
            }
            let $this = $(this);
            let item = $(ui.draggable);
            let dataType = item.attr('data-type');
            let appendDOM = '';

            if (typeof (component[dataType].defaultdata) !== 'undefined') {
                appendDOM = component[dataType].defaultdata;
            }
            let $appendLayer = $(appendDOM);
            let $appendedParent = $this;
            let $shadedLayer = $this.find(' > .editor-row-shaded-layer');
            if (typeof ($shadedLayer) === 'undefined' || $shadedLayer.length == 0) {
            }
            else {
                $appendedParent = $shadedLayer;
            }
            /*beforedrop callbackfunction*/
            if (typeof (component[dataType].beforedrop) !== 'undefined') {
                component[dataType].beforedrop($appendedParent, $appendLayer, true);
            }
            if ($this.find(" > .column-data-empty").length > 0) /*add first element when cart is empty*/ {
                $this.find(" > .column-data-empty").remove();
                $appendedParent.append($appendLayer);
            } else {
                let i = 0; /*used as flag to find out if element added or not*/
                $appendedParent.children('.editor-component').each(function () {
                    if ($(this).offset().top >= ui.offset.top) {
                        $appendLayer.insertBefore($(this));
                        i = 1;
                        return false;
                    }
                });
                if (i !== 1) /*if element dropped at the end of cart*/ {
                    $appendedParent.append($appendLayer);
                }
            }
            DraggableSortable();
            SettingEvents($appendLayer);
            MouseOverEffect($appendLayer);
            EasyLibrary.GenerateAndAppendID($appendLayer, 'row');
            if (component[dataType].type != "Bucket" &&
                !(EasyLibrary.IsDefined(component[dataType].customComponent) && component[dataType].customComponent)) {
                dataType = EasyLibrary.GenerateAndAppendDataType($appendLayer, dataType);
            }
            /*afterDrop callbackfunction*/
            if (typeof (component[dataType].afterdrop) !== 'undefined') {
                component[dataType].afterdrop($appendedParent, $appendLayer, true);
            }
            /*afterDrop callbackfunction*/
            if (typeof (component[dataType].dropstop) !== 'undefined') {
                component[dataType].dropstop($appendedParent, $appendLayer, true);
            }
            AfterDropRecursive($appendLayer);
            BindCopyEvents($appendLayer);
            DeleteComponent($appendLayer);
        },
        over: function (event, ui) {
            let $slickSlide = $(this).parents('.slick-slide');
            if ($slickSlide.length == 1 && $slickSlide.css("z-index") != "auto") {
                let $contentsliderDom = $slickSlide.parents('.contentsliderDom');
                let $dataId = $contentsliderDom.attr('data-id');
                if (typeof slickSliderList[$dataId] === 'undefined') {
                    slickSliderList[$dataId] = [];
                }
                let $c = $slickSlide.find('.anim-slide').attr('data-c');
                if (slickSliderList[$dataId].indexOf($c) === -1) {
                    slickSliderList[$dataId].push($c);
                }
            }
            /*$(".editor-col").not($(this)).droppable("disable");
            $(".editor-col").droppable("disable");
            $(this).droppable("enabled");
            ui.draggable.attr('drg_time', this.drg_time = evt.timeStamp);
            $(this).is(':visible')*/
        },
        out: function (event, ui) {
        }
    });
    let i = 0;
    $(".editor-componentWrapper, .editor-site-header, .editor-site-footer").sortable({
        //$(".cRow-sort").sortable({
        revert: true,
        items: '.cRow',
        handle: '.drag',
        connectWith: ".cRow-sort",
        cursorAt: { left: 5, top: 5 },
        helper: function (event, ui) {
            return $('<div class="rowhelperBox" style="height:40px;width:100%;"></div>');
        },
        placeholder: 'ui-state-Sortablerow-hover ui-hover-state',
        containment: '.edit-area',
        stop: function (event, ui) {

        }
    }).droppable({
        accept: ".rowBasic",
        greedy: true,
        hoverClass: "ui-state-row-hover ui-hover-state",
        drop: function (event, ui) {
            $('.ui-hover-state').removeClass('ui-state-com-droppable-hover ui-hover-state ui-state-row-hover');
            let $this = $(this);
            let item = $(ui.draggable);
            let dataType = item.attr('data-type');
            AppendComponent(dataType, $this, ui);
            if (!EasyLibrary.Pinned())
                closeComponentPopup();
        }
    });
    $(".comBasic").draggable({
        helper: "clone",
        revert: true,
        cursor: 'pointer',
        connectWith: '.editor-col',
        containment: '.main-container',
        start: function (event, ui) {
            slickSliderList = {};
            HideSimplePopUp();
        }
    });
    $(".rowBasic").draggable({
        helper: "clone",
        revert: true,
        cursor: 'pointer',
        connectWith: '.editor-componentWrapper',
        containment: '.main-container',
        start: function (event, ui) {
            HideSimplePopUp();
        }
    });
}
function BindCopyEvents($parentCol) {
    $parentCol.find('.copyData').off().on('click', function () {

        let $this = $activeDOM;
        $('body').find('.readyCopy').removeClass('readyCopy');
        $this.addClass('readyCopy');
        if ($this.find('> .column-data-empty').length == 0) {
            $('.pasteData').removeClass('inactivePaste').addClass('activePaste');
        }
        let html = `<div id="copytoclipboard" class="editor-component paragraph sfFixed TxAl-n Dib tDib tTxAl-n mDib mTxAl-n sfCol_48" data-id="511" data-type="heading" style="background-color: rgb(208, 170, 41); border-radius: 65px; box-shadow: rgb(238, 150, 6) 0px 0px 16px;width: 208px;min-width: 208px !important;text-align: center;position: fixed;top: 50%;left: calc(50% - 100px);left: -webkit-calc(50% - 100px);z-index: 99999999;">
                    <h1 style="color: rgb(255, 255, 255);" class="editor-para ff-montserrat Mt-0 Mr-0 Mb-0 Ml-0 Pr-0 Pl-0 LtrSpc-0 tFs-18 tMt-0 tMr-0 tMb-0 tMl-0 tPt-0 tPr-0 tPb-0 tPl-0 mFs-16 mMt-0 mMr-0 mMb-0 mMl-0 mPt-0 mPr-0 mPb-0 mPl-0 Lh-24 tLh-22 mLh-20 Pt-10 Pb-10 Fs-16 f-weight-600" contenteditable="true">Copied to clipboard !</h1>
                </div>`;
        if ($('#copytoclipboard').length > 0) {
            $('#copytoclipboard').remove();
        }
        $('body').append(html);
        setTimeout(function () {
            $('#copytoclipboard').fadeOut(2000, function () {
                $(this).remove();
            });
        });
    });
}
function AfterDropRecursive($appendLayer) {
    let afterDropList = [];
    $appendLayer.find('.editor-component').each(function (index, value) {
        let $this = $(this);
        let key = $this.find('.com-settings').attr('data-type');
        if (EasyLibrary.IsDefined(key)) {
            if (jQuery.inArray(key, afterDropList) == -1) {
                afterDropList.push(key);
                let compo = component[key];
                if (EasyLibrary.IsDefined(compo.afterdrop))
                    compo.afterdrop($this.parent(), $this, false, true);

                if (EasyLibrary.IsDefined(compo.dropstop))
                    compo.dropstop($this.parent(), $this, false, true);
            }
        }
    });
}
function BindColumnEvents($parentCol) {
    BindCopyEvents($parentCol);
    $parentCol.find('.pasteData').off().on('click', function () {
        let $pasteParent = $activeDOM;
        let $copyParent = $('.readyCopy');
        if ($copyParent.find('>.column-data-empty').length == 0) {
            let html = '';
            if ($copyParent.hasClass('editor-component')) {
                html = $copyParent.get(0).outerHTML;
            }
            else {
                html = $copyParent.html();
            }
            let html_ = $(html);
            html_.find('.readyCopy').removeClass('readyCopy');
            let $isColEmpty = $pasteParent.find('>.column-data-empty');
            $pasteParent.append(html_);
            $pasteParent.find(' > .SetHdlr').eq(1).remove();
            $isColEmpty.remove();
            CopyPasteEvents($pasteParent);
            //            $pasteParent.find('.readyCopy').removeClass('readyCopy');
        }
    });
    $parentCol.find('.emptyColumnData').off().on('click', function () {
        let $this = $(this);
        SageConfirmDialog(easyMessageList.emptycolumn).done(function () {
            let $myCol = $this.parent().parent();
            $myCol.find('div').not('.col-options').not('.column-data-empty').remove();
        });
    });
    $parentCol.find('.showhideColumns').off().on('click', function () {

        let $parent = $(this).parent();
        if ($parent.hasClass('activeOption')) {
            $parent.removeClass('activeOption');
        }
        else {
            $('.SetHdlr.col-options').removeClass('activeOption');
            $parent.addClass('activeOption');
        }

    });
}
function RowEvents() {
    $('.copyRow').off().on('click', function () {
        let $this = $(this);
        let $copyParent = $this.parents('.cRow');
        let copyAttrs = $copyParent.attrs();
        let $html = $(DOMCreate('div', $copyParent.html(), 'cRow sfCol_100'));
        $html.insertAfter($copyParent);
        $html.find('>.SetHdlr .setDrp').hide();
        $html.attrs(copyAttrs);
        $html.removeAttr('data-opscroll').removeClass('activeSetting');
        RowEvents();
        DraggableSortable();
        BindColumnEvents($html);
        TriggerView($html);
        ChangeIDWithParent($html);
        RowAddBindEvent($html);
        CopyPasteEvents($html);
    });
    $('.requestAI').off().on('click', function () {
        PredictionPopUp($(this));
    });
}
function CopyPasteEvents($pasteParent) {
    SettingEvents($pasteParent);
    DeleteComponent($pasteParent);
    MouseOverEffect($pasteParent);
    BindCopyEvents($pasteParent);
    $pasteParent.find('.editor-component').each(function (index, value) {
        let $this = $(this);
        let $skipid = $this.attr('data-skipid');
        if (typeof $skipid === 'undefined') {
            ChangeIDWithParent($this);
        }
        let key = $this.find('.com-settings').attr('data-type');
        let compo = component[key];
        if (typeof compo !== "undefined" && typeof compo.afterdrop !== "undefined")
            compo.afterdrop($this.parent(), $this, false, true);
        //ChangeIDWithParent($this);
        CopyPasteEvents($this);
    });
}
function AutoAlignDragger($helper) {
    let offsets = $helper.position();
    let top = offsets.top;
    let screenHeight = ScreenDimension().height;
    if ((screenHeight - 100) < top) {
        $helper.css('top', (screenHeight - 100) + "px");
    }
    else if ($('.main-top-row').height() > top) {
        $helper.css('top', $('.main-top-row').height() + 10 + "px");
    }
}
function EditableSetBreak() {
    $('[contenteditable]').not('.nobreak').off().on('keydown', function (e) {
        /* trap the return key being pressed */
        if (e.keyCode === 13) {
            /* insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)*/
            document.execCommand('insertHTML', false, '<br /><br />');
            /* prevent the default behaviour of return key pressed*/
            return false;
        }
    });
    /* document.body.addEventListener("paste", function (e) {
         e.preventDefault();
         var text = e.clipboardData.getData("text/plain");
         document.execCommand("insertHTML", false, text);
     });*/
}
function TextSetting($parent, $textChange) {
    InitEvents();
    LoadSettings();
    function InitEvents() {
        TextTranformCheck();
        FontWidth();
    }
    function FontWidth() {
        let fontWidth = 100;
        let $parentWidthClass = $parent.attr('class').match(/sfCol_[0-9]{1,3}/g);
        if ($parentWidthClass !== null) {
            fontWidth = parseInt($parentWidthClass[0].replace('sfCol_', ''));
            $('#fontWidthSlider').show();
        }
        else {
            $('#fontWidthSlider').hide();
        }
        function fonstWidthSlider(space) {
            let $parentWidth = $parent.attr('class').match(/sfCol_[0-9]{1,3}/g);
            if ($parentWidth !== null) {
                $parent.removeClass($parentWidth[0]).addClass('sfCol_' + space);
            }
            else {
                $parent.addClass('sfCol_' + space);
            }
        }
        AdvanceSageSlider($('#fontWidthSlider'), $('#fontWidthHandle'), 1, 100, fontWidth, fonstWidthSlider, $parent, '%');
    }
    function TextTranformCheck() {
        let trasformValue = '';
        if ($textChange.hasClass('txU')) {
            trasformValue = 'txU';
        } else if ($textChange.hasClass('txL')) {
            trasformValue = 'txL';
        }
        else if ($textChange.hasClass('txC')) {
            trasformValue = 'txC';
        }
        $('#textTransform').val(trasformValue);
        $('#textTransform').off().on('change', function () {
            let tranformCase = $(this).val();
            switch (tranformCase) {
                case 'txU':
                    $textChange.removeClass('txC').removeClass('txL').addClass('txU');
                    break;
                case 'txL':
                    $textChange.removeClass('txC').removeClass('txU').addClass('txL');
                    break;
                case 'txC':
                    $textChange.removeClass('txL').removeClass('txU').addClass('txC');
                    break;
                case '':
                    $textChange.removeClass('txC').removeClass('txL').removeClass('txU');
                    break;
            }
        });
    }
    function LoadSettings() {
        let fontsize = $textChange.css('font-size');
        if (typeof (fontsize) === 'undefined') {
            fontsize = minFontSize;
        }
        fontsize = parseInt(fontsize.replace('px', ''));
        $('.changeFontSize').val(fontsize);
        function FontSize(space) {
            let handleFontSize = $("#fontsizeHandle");
            handleFontSize.parent().next().find('.changeFontSize').val(space);
            $textChange.css('font-size', space + 'px');
        }
        AdvanceSageSlider($('#fontsizeSlider'), $('#fontsizeHandle'), minFontSize, maxFontsize, fontsize, FontSize, $parent, 'px');
        let letteSpace = 0;
        let removeClass = '';
        if (typeof ($textChange.attr('class')) !== 'undefined') {
            let letterSpacingNegClass = $textChange.attr('class').match(/LtrSpc-n-[0-9]{1,2}/g);
            if (letterSpacingNegClass !== null) {
                removeClass = letterSpacingNegClass[0].trim();
                letteSpace = parseInt(removeClass.replace('LtrSpc-n-', ''));
            }
            else {
                let letterSpacingPosClass = $textChange.attr('class').match(/LtrSpc-[0-9]{1,2}/g);
                if (letterSpacingPosClass !== null) {
                    removeClass = letterSpacingPosClass[0].trim();
                    letteSpace = parseInt(removeClass.replace('LtrSpc-', ''));
                }
            }
        }

        function LetteSpaceChange(space) {
            let addClass = '';
            let removeClass = '';
            if (typeof ($textChange.attr('class')) !== 'undefined') {
                let negClass = $textChange.attr('class').match(/LtrSpc-n-[0-9]{1,2}/g);
                if (negClass !== null) {
                    removeClass = negClass[0].trim();
                }
                else {
                    let posClass = $textChange.attr('class').match(/LtrSpc-[0-9]{1,2}/g);
                    if (posClass !== null) {
                        removeClass = posClass[0].trim();
                    }
                }
            }
            if (space >= 0) {
                addClass = 'LtrSpc-' + space;
            }
            else {
                space = Math.abs(space);
                addClass = 'LtrSpc-n-' + space;
            }
            $textChange.removeClass(removeClass).addClass(addClass);
        }
        AdvanceSageSlider($('#letterSpacingSlider'), $('#letterSpacingHandle'), -10, 10, letteSpace, LetteSpaceChange, $parent, 'px');
        loadColorPicker();
        LoadFontFamily();
    }
    function loadColorPicker() {
        $('#chooseFontColor').css('background-color', $textChange.css('color'));
        let colorPickerOption = ColorPickerOption({
            renderCallback: function ($elm, toggled) {
                let objColor = RenderCallBackColor(this);
                $textChange.css({ 'color': objColor.bgColor });
            }
        });
        $('#chooseFontColor').colorPicker(colorPickerOption);

    }
    function LoadFontFamily() {
        $('#fontfamily').html(DOMFontAdvanceCollection());

        let defaultFontFamily = 'montserrat';
        let classesList = $textChange.attr('class');
        if (typeof (classesList) !== "undefined") {
            let fontClasses = classesList.match(/ff-(\w+)/g);
            if (fontClasses !== null) {
                defaultFontFamily = fontClasses[0].replace('ff-', '');
            }
        }
        $('#fontfamily').val(defaultFontFamily);
        fontWeight(defaultFontFamily);
        if (typeof (classesList) !== "undefined") {
            let weightClasses = classesList.match(/f-weight-[0-9]{0,3}/g);
            if (weightClasses !== null) {
                $('#fontWeight').val(weightClasses[0].replace('f-weight-', ''));
            }
        }
        $('#fontWeight').off().on('change', function () {
            let classList = $textChange.attr('class');
            if (typeof (classesList) !== "undefined") {
                let familyClass = classList.match(/f-weight-[0-9]{0,3}/g);
                if (familyClass !== null) {
                    $textChange.removeClass(familyClass[0]);
                }
            }
            $textChange.addClass('f-weight-' + $(this).val());
        });

        $('#fontfamily').off().on('change', function () {
            let classList = $textChange.attr('class');
            if (typeof (classesList) !== "undefined") {
                let fontClass = classList.match(/ff-(\w+)/g);
                if (fontClass !== null) {
                    $textChange.removeClass(fontClass[0]);
                }
            }
            $textChange.addClass('ff-' + $(this).val());
            fontWeight($(this).val());
            $('#fontWeight').trigger('change');
        });
        function fontWeight(fontName) {
            let fontDOM = DOMFontWeight(fontName);
            if (fontDOM.length > 0) {
                $('#fontWeight').html(fontDOM);
            }
        }
    }
}
function SaveMessageShow(message, iconClass) {
    if (typeof iconClass === "undefined")
        iconClass = 'fa fa-spinner fa-spin fa-3x fa-fw';
    let html = '<div class="fullpage-layer-pop savingLayer dis-table" style="display:none;" >';
    html += '<div class="inner-content dis-table-cell" id="message">';
    html += '<span><i class="' + iconClass + '"></i></span>';
    html += '<span>' + message + '</span>';
    html += '</div>';
    html += '</div>';
    $('body').append(html);
    $('.fullpage-layer-pop.savingLayer.dis-table').fadeIn(1);
}
function SaveMessageRemove() {
    let html = '<span><i class="fa fa-check" aria-hidden="true"></i></span>';
    $('.fullpage-layer-pop.savingLayer.dis-table').find('#message').html(html);
    $('.fullpage-layer-pop.savingLayer.dis-table').fadeOut(400);
    $('.fullpage-layer-pop.savingLayer.dis-table').remove();
}
/*Fixed header case showing options =============================*/
function SetToggleValueBasedOnHideElement($element, $toggleBoxID) {
    if (!$element.hasClass('Dn')) $($toggleBoxID).prop('checked', true);
}
function SetEventToShowHideElement($item, $toggleButton, $effectedElement) {
    $toggleButton.off().on('click', function () {
        let isChecked = $(this).is(':checked');
        if (!isChecked) {
            $effectedElement.addClass('Dn');
            SettingEvents();
        }
        else {
            $effectedElement.each(function () {
                let $im = $(this);
                $(this).removeClass('Dn');
            });
        }
        //component.carousel.settingDOMs.tabs.Data.onload($item);
    });
}
//function UpdateSettings() {
//    let objWebBuilderInfo = {
//        WebBuilderID: 0,
//        EditDOM: "",
//        ViewDOM: "",
//        PortalID: SageFramePortalID,
//        UserModuleID: webBuilderUserModuleID,
//        UserName: SageFrameUserName,
//        SecureToken: SageFrameSecureToken,
//        Culture: SageFrameCurrentCulture,
//        Extra: '',
//        Settings: JSON2.stringify(webBuilderSettings),
//        PageName: currentpageName,
//        Header: "",
//        HeaderEdit: "",
//        Footer: "",
//        FooterEdit: "",
//        PackageXML: ""
//    };
//    $.ajax({
//        isPostBack: false,
//        async: false,
//        cache: false,
//        type: 'POST',
//        contentType: "application/json; charset=utf-8",
//        data: JSON2.stringify({
//            objWebBuilderInfo: objWebBuilderInfo
//        }),
//        dataType: 'json',
//        crossDomain: true,
//        url: SageFrameHostURL + '/Builder/UpdateSettings',
//        success: function () {
//        },
//        error: function () {
//        },
//    });
//}

function proLoadingAppend($this, $add) {

    function ReadProComponent() {
        $('.proItemsList').html('');
        $('.components-list >.comItems').find('>.rowBasic').each(function () {
            let $this = $(this);
            let category = $this.attr('data-type');
            if (EasyLibrary.IsDefined(category)) {
                if (EasyLibrary.IsDefined(component[category].type) && EasyLibrary.IsDefined(component[category].typeicon)) {
                    let type = component[category].type;
                    let icon = component[category].typeicon;
                    BindProComponent(icon, type);
                }
            }
        });
    }
    function BindProComponent(icon, type) {
        let $proList = $('.proItemsList');
        let compo = DOMCreate('span', '<i class="' + icon + '"></i><br>' + type, 'comItemBlocks', '', ['category-type="' + type + '"']);
        if ($proList.find('span[category-type="' + type + '"]').length == 0) {
            $proList.append(compo);
        }
    }
    function ProItemlistEvent() {
        $('.proItemsList').find('.comItemBlocks').off('click').on('click', function () {
            $('.proItemsList > .comItemBlocks').removeClass('active');
            let $this = $(this);
            $this.addClass('active');
            let categoryType = $this.attr('category-type');
            let imageList = '';
            let componentlist = component;
            if (IsOnline())
                componentlist = onlinecomponentprolist;
            $.each(componentlist, function (key, value) {
                if (EasyLibrary.IsDefined(componentlist[key].row)
                    && componentlist[key].row
                    && EasyLibrary.IsDefined(componentlist[key].type)
                    && componentlist[key].type == categoryType
                    //&& EasyLibrary.IsDefined(componentlist[key].Screenshot)
                    && EasyLibrary.IsDefined(componentlist[key].description)
                    && componentlist[key].description.length > 0
                ) {
                    let screen = EasyLibrary.NoScreenshotImagePath();
                    if (EasyLibrary.IsDefined(componentlist[key].Screenshot))
                        screen = componentlist[key].Screenshot;
                    let url = EasyLibrary.GetAdminURL();
                    screen = screen.includes(url) ? screen : url + screen;
                    let text = `<div class="compodesc">
                            <div class="sfFixed sfCol_100 Dib TxAl-c" data-id="280" data-type="heading">
                                <h1 style="color: rgb(116, 119, 122);" class =" Mt-0 Mr-0 Ml-0 Pt-0 Pr-0 Pb-0 Pl-0 Fs-20 LtrSpc-0 tFs-18 tMt-0 tMr-0 tMb-0 tMl-0 tPt-0 tPr-0 tPb-0 tPl-0 mFs-16 mMt-0 mMr-0 mMb-0 mMl-0 mPt-0 mPr-0 mPb-0 mPl-0 Lh-24 tLh-22 mLh-20 Mb-20 ff-null" >${key}</h1>
                            </div>
                            <div class="sfFixed sfCol_100 Dib TxAl-c mDib tDib" data-id="281" data-type="text">
                                <p style="color: rgb(157, 157, 157);" class ="LtrSpc-0 Mt-0 Mr-0 Mb-0 Ml-0 Pt-0 Pr-0 Pb-0 Pl-0 tFs-18 tMt-0 tMr-0 tMb-0 tMl-0 tPt-0 tPr-0 tPb-0 tPl-0 mFs-16 mMt-0 mMr-0 mMb-0 mMl-0 mPt-0 mPr-0 mPb-0 mPl-0 tLh-22 mLh-20  Lh-20 Fs-14">${componentlist[key].description}</p>
                            </div>
                        </div>`;
                    imageList += DOMCreate('li', ' <img src="' + screen + '" />' + text, 'itemWrapper', '', ['data-type="' + key + '"']);
                }
            });
            $('.proLoaderArea').find('.ImageSliderWrapper .itemsWrapper').html(imageList);
            Slide();
        });

    }
    function Slide() {
        let $imageSlider = $('.proLoaderArea').find('.ImageSliderWrapper');
        $imageSlider.removeClass('binded');
        let carousel = new CarouselInit($imageSlider);
    }
    function IsOnline() {
        if ($('.proLoader').attr('data-online') === "false")
            return false;
        else
            return true;
    }
    function SetOnline() {
        $('.proLoader').attr('data-online', "true");
    }
    function SetOffline() {
        $('.proLoader').attr('data-online', "false");
    }

    function CalcFalseHeight() {
        let height = $('.editor-site-header').height();
        $('.editor-componentWrapper > div').each(function () {
            let $this = $(this);
            if ($this.hasClass('proLoader')) {
                return false;
            }
            height += $(this).height();
        });
        return height;
    }
    function CategoryEvents() {
        ProItemlistEvent();
        $('.proLoader').find('.cb-close').off('click').on('click', function () {
            $('.proLoader').addClass('Dn');
            $('.addPro.active').removeClass('active');
            $('body').removeClass('ofH');
        });
        $('.proLoader').find('#ApplyProComponent').off('click').on('click', function () {
            let activeDots = $('.proLoader').find('.pager-dot > .dots.active-dot');
            let dots = $('.proLoader').find('.pager-dot > .dots');
            let index = dots.index(activeDots);
            let compoType = $('.proLoaderArea').find('.ImageSliderWrapper .itemsWrapper .itemWrapper').eq(index).attr('data-type');
            if (IsOnline()) {
                if (EasyLibrary.IsDefined(component[compoType])) {
                    AppendComponentChange();
                }
                else {
                    if (EasyLibrary.IsDefined(onlinecomponentprolist[compoType])) {
                        let compo = onlinecomponentprolist[compoType];
                        let downLoadtype = "component";
                        let downLoadtypeID = compo.ComponentID;
                        function downloadSuccess(data) {
                            component[compoType] = compo;
                            //UpdateComponentDownloadCount(compo.ComponentID, downLoadtype);
                            AppendComponentChange();
                            SilentSave();
                            ReloadPageNone();
                            window.location.reload(true);
                        }
                        //function UpdateComponent(componentName, UniversalComponentID, version, downLoadtype, downLoadtypeID, callback)
                        //let success = UpdateComponent(compo.componentname, compo, compo.ComponentID, compo.category, compo.icon, '', compo.dependencies, 1.0, downLoadtype, downLoadtypeID, downloadSuccess);
                        let success = UpdateComponent(compo.componentname, compo.ComponentID, compo.version, downLoadtype, downLoadtypeID, downloadSuccess);
                    }
                }
            }
            else {
                AppendComponentChange();
            }
            function AppendComponentChange() {
                AppendComponent(compoType, undefined, undefined, function ($appendLayer) {
                    $appendLayer.insertAfter($('.proLoader'));
                    $('.proLoader').find('.cb-close').trigger('click');
                });
            }
        });
        $('#procomponentSearch').focus();
        $('#procomponentSearch').on('keyup', function () {
            let searchVal = $(this).val().trim();
            if (searchVal.length == 0) {
                RecycleSearch();
            }
            else {
                $('.comItemBlocks').each(function () {
                    let $this = $(this);
                    let name = $this.text().toLowerCase();
                    let pos = name.indexOf(searchVal.toLowerCase());
                    if (pos < 0) {
                        $this.addClass('Dn');
                    }
                    else {
                        $this.removeClass('Dn');
                    }
                });
            }
        });
        $('#refreshProSearch').on('click', function () {
            $('#procomponentSearch').val('');
            RecycleSearch();
        });
        function RecycleSearch() {
            $('.comItemBlocks').each(function () {
                $(this).removeClass('Dn');
            });
        }
        $('#getOnlCompo').off('click').on('click', function () {
            let $this = $(this);
            if (IsOnline()) {
                SetOffline();
                ReadProComponent();
                CategoryEvents();
                $this.text("online component");
                $('.proItemsList > .comItemBlocks').eq(0).trigger('click');
                $('.proLoader').find('#ApplyProComponent').show();
            }
            else {
                $this.text("installed component");
                GetOnlineComponents(0, 10, $('#procomponentSearch').val());
            }
        });
        function GetOnlineComponents(offset, limit, searchText) {
            $.ajax({
                isPostBack: false,
                async: false,
                crossOrigin: true,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: JSON2.stringify({
                    offset: parseInt(offset * limit) + 1,
                    limit: limit,
                    searchText: searchText,
                    portalID: SageFramePortalID,
                    userModuleID: webBuilderUserModuleID,
                    userName: SageFrameUserName,
                    secureToken: SageFrameSecureToken,
                    version: '',
                    type: '',
                    category: 'pro',
                    applicationName: '',
                }),
                dataType: 'json',
                crossDomain: true,
                url: `${SageFrameHostURL}/Builder/GetRowOnlineComponents`,
                success: function (data) {
                    SetOnline();
                    BindOnlineComponents(data);
                },
                error: function () {
                },
            });
        }

        function BindOnlineComponents(data) {
            if (data !== null) {
                let prolist = JSONParse(data.d);
                $('.proItemsList').html('');
                $('.proLoaderArea').find('.ImageSliderWrapper .itemsWrapper').html('');
                $('.proLoader').find('#ApplyProComponent').hide();
                if (prolist != null) {
                    let newCompo = false;
                    $.each(prolist, function (i, $this) {
                        if (!$this.PackageType) {
                            let componentData = JSONParse($this.ComponentValue);
                            componentData.ComponentID = $this.ComponentID;
                            let category = componentData.componentname;
                            if (EasyLibrary.IsDefined(category) && EasyLibrary.IsUndefined(component[category])) {
                                if (EasyLibrary.IsDefined(componentData.type) && EasyLibrary.IsDefined(componentData.typeicon)) {
                                    onlinecomponentprolist[componentData.componentname] = componentData;
                                    let type = componentData.type;
                                    let icon = componentData.typeicon;
                                    BindProComponent(icon, type);
                                    newCompo = true;
                                }
                            }
                        }
                    });
                    if (newCompo) {
                        ProItemlistEvent();
                        $('.proItemsList > .comItemBlocks').eq(0).trigger('click');
                        $('.proLoader').find('#ApplyProComponent').show();
                    }
                    else {
                        let li = '<li class="noitemsin">Seems like you have all pro components installed in your site :) Come back to use more. </li>.';
                        $('.proLoaderArea').find('.ImageSliderWrapper .itemsWrapper').html(li);
                        Slide();
                    }
                }
            }
            else {

            }
        }
    }
    if (!$this.hasClass('active')) {
        let $parentRow;
        if (EasyLibrary.IsDefined($add))
            $parentRow = $add.closest('.cRow');
        //if ($this.hasClass('headeradd'))
        closeComponentPopup();
        $('.addPro').removeClass('active');
        $(this).addClass('active');
        let displayHeight = ScreenDimension().height - $('.main-top-row').height();
        //if (!$parentRow.next().hasClass('.proLoader')) {
        if ($('.proLoader').length == 0) {
            let div = staticDOMs.rowadd;
            if ($this.hasClass('startnew'))
                $('.editor-componentWrapper').prepend($(div));
            else
                $(div).insertAfter($parentRow);
            ReadProComponent();
        }
        else {
            $('.proLoader').css({
                'height': '0px',
                'overflow': 'hidden'
            });
            $('.proLoader >.proLoaderArea').height(displayHeight);
            if ($this.hasClass('startnew'))
                $('.editor-componentWrapper').prepend($('.proLoader'));
            else
                $('.proLoader').insertAfter($parentRow);
        }
        CategoryEvents();
        //let top = CalcFalseHeight();
        //let top = $('.proLoader').offset().top;
        //let scrollTop = $(window).scrollTop(),
        //    elementOffset = $('.proLoader').offset().top,
        //    top = (elementOffset - scrollTop);
        let delay = 400;
        let top = window.pageYOffset || document.documentElement.scrollTop;
        let diff = $('.proLoader').position().top - top;
        if (diff < 300)
            delay = 0;
        let toAnimate = true;
        $('html, body').animate({
            scrollTop: $('.proLoader').position().top
        }, 400, function () {
            if (toAnimate) {
                toAnimate = false;
                setTimeout(function () {
                    $('.proLoader').removeClass('Dn').animate({
                        'height': displayHeight
                    }, 400, function () {
                        if ($('.proItemsList > .comItemBlocks').length > 0) {
                            $('.proItemsList > .comItemBlocks').eq(0).trigger('click');
                        }
                        let toAnimate = true;
                        $('html, body').animate({
                            scrollTop: $('.proLoader').position().top
                        }, 400, function () {
                            if (toAnimate) {
                                toAnimate = false;
                                $('body').addClass('ofH');
                            }
                        });
                    });
                }, 100);
            }
        });
        //}
    }
}

function RowAddBindEvent($parent) {
    let $add = $parent.find('.addPro');
    $add.off('click').on('click', function () {
        let $this = $(this);
        proLoadingAppend($this, $add);
    });
}
let onlinecomponentprolist = {};
function AppendComponent(dataType, $this, ui, callback) {
    //drop: function (event, ui) {
    //var item = $(ui.draggable);
    //var dataType = item.attr('data-type');
    let rowDOM = '';
    if (typeof (dataType) !== 'undefined') {
        if (typeof (component[dataType].defaultdata !== 'undefined')) {
            rowDOM = component[dataType].defaultdata.trim();
        }
    }
    let $selectedRow = $(rowDOM);
    /*beforedrop callbackfunction*/
    let $parentWrapper = $('.editor-componentWrapper');
    if (EasyLibrary.IsDefined($this)) {
        let classes = $this.attr('class').split(' ');
        if (classes.indexOf('editor-site-header') > -1)
            $parentWrapper = $('.editor-site-header');
        else if (classes.indexOf('editor-site-footer') > -1)
            $parentWrapper = $('.editor-site-footer');
    }
    if (EasyLibrary.IsDefined(component[dataType].beforedrop)) {
        component[dataType].beforedrop($parentWrapper, $selectedRow, true);
    }
    $(".noElement").remove();
    $parentWrapper.removeClass('emptydata');
    if (EasyLibrary.IsDefined($this) && $this.find(".noElement").length > 0) /*add first element when cart is empty*/ {
        $('.rowBasic').removeClass('heartBeat');
        $parentWrapper.append($selectedRow);
    } else {
        if (EasyLibrary.IsDefined(ui)) {
            let i = 0;
            $this.find('.cRow').each(function () {
                if ($(this).offset().top >= ui.offset.top) {
                    $selectedRow.insertBefore($(this));
                    i = 1;
                    return false;
                }
            });
            if (i !== 1) {
                $parentWrapper.append($selectedRow);
            }
        }
        else {
            if (EasyLibrary.IsDefined(callback) && typeof callback === "function")
                callback($selectedRow);
        }
    }
    DraggableSortable();
    RowEvents();
    DeleteComponent($selectedRow);
    SettingEvents($selectedRow);
    MouseOverEffect($selectedRow);
    BindColumnEvents($selectedRow);
    RowAddBindEvent($selectedRow);
    EasyLibrary.GenerateAndAppendID($selectedRow, 'row');
    if (component[dataType].type != "Bucket" &&
        !(EasyLibrary.IsDefined(component[dataType].customComponent) && component[dataType].customComponent)) {
        dataType = EasyLibrary.GenerateAndAppendDataType($selectedRow, dataType);
    }
    if (typeof (component[dataType].afterdrop) !== 'undefined') {
        component[dataType].afterdrop($parentWrapper, $selectedRow, true);
    }
    if (typeof (component[dataType].dropstop) !== 'undefined') {
        component[dataType].dropstop($parentWrapper, $selectedRow, true);
    }
    AfterDropRecursive($selectedRow);
    ScrollToTop();
    function ScrollToTop() {
        let top = $selectedRow.offset().top - 100;
        $('body, html').animate({
            scrollTop: top + 'px'
        }, 1000, function () {
            //$selectedRow.addClass('focuscompo');
            //setTimeout(function () {
            //    $selectedRow.removeClass('focuscompo');
            //}, 1000);
        });
    }
}
function closeComponentPopup() {
    $('.collapse.heademarControls > .icClose').trigger('click');
}//function Scroller() {
//    $('.scroll__parent').each(function () {
//        let $this = $(this);
//        let scrollers = new ScrollJS({
//            container: $this,
//            scrollbar: $this.find('> .scrollbar'),
//            content: $this.find('> .scrollable__child')
//        });
//    });
//}
//String.prototype.WrapScroller = function WrapScroller() {
//    return "<div class='scrollable__child'>" + this + "</div>";
//};
//function ScrollBarDOM() {
//    return "<div class='scrollbar'></div>";
//}

function DeviceAlpha() {
    return $('#viewPorts').find('.active').attr('data-shorthand');
}
//returns a space for device
function DeviceAlphaSpace() {
    let shortHand = $('#viewPorts').find('.active').attr('data-shorthand');
    shortHand = shortHand.length === 0 ? " " : shortHand;
    return shortHand;
}
function ReloadPage() {
    window.onbeforeunload = function (e) {
        return easyMessageList.reloadpage;
    };
}
function ReloadPageNone() {
    window.onbeforeunload = null;
}
function ConfirmLogout() {
    SageConfirmDialog(easyMessageList.logout, 'Logout').done(function () {
        $('.logoutConfirm')[0].click();
    });
}
function CopyPlaneText() {
    //let contenteditable = document.querySelector("[contenteditable]");
    //if (contenteditable !== null) {
    //    contenteditable.removeEventListener('paste').addEventListener("paste", onkeydown);
    //    contenteditable.removeEventListener('keydown').addEventListener("keydown", function (e) {
    //        if (event.ctrlKey === true && e.key==="c") {
    //            onkeydown(e);
    //        }
    //    });
    //}
}
function onkeydown(e) {
    // cancel paste
    e.preventDefault();
    // get text representation of clipboard
    var text = e.clipboardData.getData("text/plain");
    // insert text manually
    document.execCommand("insertHTML", false, text);
}

function GetValueByClassName($par, regexPattern, replacePattern) {
    let parentClasses = $par.attr('class');
    let dAlpha = DeviceAlpha();
    let regex = new RegExp('\\b' + dAlpha + regexPattern + '\\b', 'g');
    let classes = parentClasses.match(regex);
    let val = 0;
    if (classes !== null) {
        val = classes[0].replace(dAlpha + replacePattern, '');
    }
    return val;
}
function ReplaceClassByPattern($par, regexPattern, replaceClass) {
    let parentClasses = [];
    let dAlpha = DeviceAlpha();
    let regex = new RegExp('\\b' + dAlpha + regexPattern + '\\b', 'g');
    $par.each(function (i, o) {
        let classes = $(o).attr('class').match(regex);
        if (classes !== null) {
            classes.forEach(function (v, i) {
                parentClasses.push(v);
            });
        }
    });
    parentClasses.forEach(function (v, i) {
        $par.removeClass(v);
    });
    $par.addClass(dAlpha + replaceClass);
}
function RemoveClassByPattern($par, regexPattern) {
    let parentClasses = [];
    let dAlpha = DeviceAlpha();
    let regex = new RegExp('\\b' + dAlpha + regexPattern + '\\b', 'g');
    $par.each(function (i, o) {
        let classes = $(o).attr('class').match(regex);
        if (classes !== null) {
            parentClasses.push(classes.join(' '));
        }
    });
    $par.removeClass(parentClasses.join(' '));
}

function GetDemoComponent() {
    let democomponent = {};
    let keys = Object.keys(component);
    let length = keys.length;
    for (var i = 0; i < length; i++) {
        democomponent = $.extend(democomponent, component[keys[0]]);
    }
    console.log(democomponent);
}

function SilentSave() {
    $('#SaveWebhidden').trigger('click');
}
function SavePromtPublish() {
    $('#SaveWeb').trigger('click');
}

function FullPageLoading(message) {
    $('body').addClass('actvLoader');
    $('.WebBuilderWrapper').addClass('loading').attr('title', message);
}
function RemoveFullPageLoading() {
    $('body').addClass('actvLoader');
    $('.WebBuilderWrapper').removeClass('loading').removeAttr('title');
}
$(function () {
    $.fn.hideElement = function () {
        let $this = $(this);
        let DAlfa = DeviceAlpha();
        $this.removeClass(DAlfa + 'Db');
        $this.removeClass(DAlfa + 'Dib');
        $this.addClass(DAlfa + 'Dn');
    };
    $.fn.showElement = function (isBlock) {
        let $this = $(this);
        let DAlfa = DeviceAlpha();
        $this.removeClass(DAlfa + 'Dn');
        if (isBlock)
            DAlfa = DAlfa + 'Db';
        else
            DAlfa = DAlfa + 'Dib';
        $this.addClass(DAlfa);
    };
});
function MenuDropEvents() {
    HammenuEvent();
}
function DeviceList(parentClasses, regexTPattern, regexMPattern) {
    let devices = [];
    devices.push("");
    let regex = new RegExp(regexTPattern, 'g');
    let paddingClass = parentClasses.match(regex);
    if (paddingClass === null) {
        devices.push("t");
    }
    regex = new RegExp(regexMPattern, 'g');
    paddingClass = parentClasses.match(regex);
    if (paddingClass === null) {
        devices.push("m");
    }
    return devices;
}


function SetFakeImage($this) {
    let src = $this.attr('src');
    $this.attr('src', FakeImageURL);
    $this.attr('data-cimage', src);
}
function SetFakeBGImage($this) {
    let parentBgImage = $this.css('background-image');
    if (typeof (parentBgImage) !== 'undefined' && parentBgImage !== 'none') {
        $this.attr('data-cimage', parentBgImage.replace(SageFrameHostURL, '').trim());
        $this.css('background-image', '').css('background-image', "url('" + FakeImageURL + "')");
    }
}
function GetTargetsClasses($targets) {
    let clsArr = [];
    $targets.each(function (i, v) {
        let $tar = $(v);
        let cls = $tar.attr('class').split(" ");
        $.each(cls, function (i, v) {
            if (clsArr.indexOf(v) < 0)
                clsArr.push(v);
        });
    });
    return clsArr.join(" ");
}
