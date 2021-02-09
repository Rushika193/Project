(function ($) {
    $.createThemeSettings = function (p) {
        p = $.extend
            ({
                StatusID: 0
            }, p);


        var ThemeSettings = {
            config: {
                baseURL: "/Dashboard/ThemeSetting/",
                StatusID: p.StatusID,
                commonCSSVals: ["auto", "inherit", "initial", "unset"],
                sizeCSSProps: ["font-size", "margin-top", "margin-bottom", "margin-left", "margin-right", "padding-top", "padding-bottom", "padding-left", "padding-right"]

            },
            SaveThemeSettings: function () {
                var lstCSSSelectors = [];


                var isValid = true;

                $(".divCSSSelector").each(function () {
                    var selector = this;
                    var selectorName = $(selector).attr("data-selector");

                    var objSelector = {
                        SelectorName: selectorName,
                        CSSProperties: []
                    };

                    var cssProp, cssVal;

                    $(selector).find(".divCSSProperty").each(function () {
                        cssProp = $(this).attr("data-property");
                        cssVal = $(this).attr("data-value");

                        var isValidValue = ThemeSettings.ValidateCSSProperty(cssProp, cssVal);

                        if (isValidValue) {

                            var objRule = {
                                CSSProperty: cssProp,
                                CSSValue: cssVal
                            };

                            objSelector.CSSProperties.push(objRule);
                        }
                        else {
                            isValid = false;
                            $(selector).find(".errInvalidValue").show();
                            console.log("Invalid" + cssProp + " " + cssVal);
                        }
                    });

                    lstCSSSelectors.push(objSelector);

                });
               

                


                let ajaxConfig = {
                    url: this.config.baseURL + 'SaveThemeSettings',
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    datatype: "json",
                    traditional: true,
                    async: true,
                    data: JSON.stringify(lstCSSSelectors),
                    success: function (result) {
                        if (result == 1) {
                            ActionMessage("Theme saved successfully", "Success");
                            setTimeout(function () { window.location.reload(true); }, 2000);
                        }
                        else
                            ActionMessage("Some error occureed", "Error");
                    },
                    error: function (jqXHR) {

                    },
                    complete: function (jqXHR, status) {

                    }
                };


                if (isValid)
                    SecureAjaxCall.PassObject(ajaxConfig);


            },
            ResetThemeSettings: function () {
                let ajaxConfig = {
                    url: this.config.baseURL + 'ResetThemeSettings',
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    datatype: "json",
                    traditional: true,
                    async: true,
                    data: "",
                    success: function (result) {
                        if (result == 1)
                            location.reload();

                    },
                    error: function (jqXHR) {

                    },
                    complete: function (jqXHR, status) {

                    }
                };



                SecureAjaxCall.PassObject(ajaxConfig);
            },
            ValidateCSSProperty: function (cssProp, cssVal) {
                var isValid = true;
                const sizeRegex = /\d+(px|rem|em|%)$/;

                var isNameProperty = cssProp.startsWith("--");
                var isColorProp = (cssProp == "background-color" || cssProp == "color");
                var isSizeProp = (ThemeSettings.config.sizeCSSProps.indexOf(cssProp) > -1);
                var isValidValue = (isNameProperty || isColorProp);

                if (isSizeProp) {
                    cssVal = cssVal.replace(/\s/g, '');
                    isValid = (ThemeSettings.config.commonCSSVals.indexOf(cssVal) > -1);

                    if (!isValid)
                        isValid = sizeRegex.test(cssVal);
                }
                else if (!isValid && !isNameProperty && !isColorProp && !isSizeProp)
                    isValid = ThemeSettings.IsValidCSS(cssProp, cssVal);

                return isValid;

            },
            IsValidCSS: function (property, value) {
                var $el = $("<div></div>");
                $el.css(property, value);
                return ($el.css(property) == value);
            },
            BindEvents: function () {
                $("#btnSaveThemeSettings").on('click', function () {

                    //var isConfirm = ConfirmBox('Are you sure you want to save changes?');

                    //if (isConfirm != false)
                    SageConfirmDialog("Are you sure?", "Confirmation", function () {
                        console.log("Close");
                    }).done(function () {
                        ThemeSettings.SaveThemeSettings();
                    });
                });

                $("#btnResetThemeSettings").on('click', function () {
                    //var isConfirm = ConfirmBox('Are you sure you want to reset settings?');
                    //if (isConfirm != false)

                    SageConfirmDialog("Are you sure you want to reset?", "Confirmation", function () {
                        console.log("Close");
                    }).done(function () {
                        ThemeSettings.ResetThemeSettings();
                    });
                    
                });


                $(".ddlAlignment").on('change', function () {
                    var elem = this;
                    var value = $(elem).val();
                    $(elem).closest(".divCSSProperty").attr("data-value", value);
                });


                $(".txtCSSProp").on('keyup', function () {
                    var elem = this;
                    var value = $(elem).val();
                    $(elem).closest(".divCSSProperty").attr("data-value", value);
                    $(this).next(".errInvalidValue").hide();
                });

                $(".txtCSSProp").on('focusout', function () {
                    var ele = this;
                    var parentSelector = $(this).closest(".divCSSProperty");
                    var cssProp = $(parentSelector).attr("data-property");
                    var cssVal = $(parentSelector).attr("data-value");
                    var isValid = ThemeSettings.ValidateCSSProperty(cssProp, cssVal);

                    if (!isValid)
                        $(ele).next(".errInvalidValue").show();


                });



            },
            init: function () {
                ThemeSettings.BindEvents();
            }
        };
        ThemeSettings.init();
    };
    $.fn.ThemeSettings = function (p) {
        $.createThemeSettings(p);
    };
})(jQuery);



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
    //$element.prepend(GetThemeColor());
    //$('.themeColorpicker').off().on('click', function () {
    //    $('.cp-HEX').val($(this).css('background-color'));
    //    $('.cp-HEX').trigger('change');
    //});
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

        $elm.closest(".divCSSProperty").attr("data-value", 'rgba(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')');

      
        if ($elm.closest(".divCSSSelector").attr("data-selector") == ".leftContent") {
            var subMenu = $(".divCSSSelector[data-selector='.sub-menu']");
            subMenu.find(".divColorView").css("background", 'rgba(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')');
            var subMenuBg = subMenu.find(".divCSSProperty[data-property='background-color']");
            subMenuBg.attr("data-value", 'rgba(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')');
          
        }

        if ($elm.closest(".divCSSSelector").attr("data-selector") == ".sub-menu") {
            var leftContent = $(".divCSSSelector[data-selector='.leftContent']");
            leftContent.find(".divColorView").css("background", 'rgba(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')');
            var leftContentBg = leftContent.find(".divCSSProperty[data-property='background-color']");
            leftContentBg.attr("data-value", 'rgba(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')');
        }


        //let colorPickerID = $elm.attr('id');
        //switch (colorPickerID) {
        //    case 'chooseColorShadedCol':
        //        $parent.find(' > .editor-row-shaded-layer').css({
        //            'background-color': 'rgb(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')',
        //            'color': textColor
        //        });


        //        break;
        //    case 'chooseColorColBG':
        //        $parent.css({
        //            'background-color': 'rgb(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')',
        //            'color': textColor
        //        });
        //        break;
        //}
    }
};
//$('.divColorView').colorPicker(colorPickerOption);
$(".divColorWrapper").each(function () {
    var wrapper = this;
    $(wrapper).find('.divColorView').colorPicker(colorPickerOption);
});

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