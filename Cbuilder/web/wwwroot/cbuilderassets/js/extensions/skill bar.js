var skill_bar = {
    "skill bar": {
        "componentname": "skill bar",
        "category": "advance",
        "icon": "fa fa-bars",
        "row": false,
        "hidden": false,
        "type": "element",
        "collection": false,
        "bucket": true,
        "defaultdata": EasyLibrary.ReadDOM('skillbar/skillbarviewdom'),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) {
        },
        "pageload": function () {
            component["skill bar"].view.library.initAnimation();
        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            component["skill bar"].view.library.initAnimation();
        },
        "onsort": function (ui) {
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": '<div id="sperow"></div><h4 style="font-size: 12px;">Gutter Spacing</h4><div id="gutterDOM"></div><h4 style="font-size: 12px;">Text</h4><div id="txtbasictab"></div>',
                    "onload": function ($elem) {
                        let SkillContainer = $elem.closest('.skillBar');
                        let SkillItem = SkillContainer.find('.skill-ltem');
                        $("#sperow").AdvanceItemsPerRow({
                            targetParent: SkillContainer,
                            targetElem: SkillItem,
                            label: 'Skill Bars Per Row',
                            callback: function (itemperrow) {
                                callGutter(itemperrow);
                            }
                        });

                        $("#txtbasictab").AdvanceTextSetting({
                            targetParent: SkillContainer,
                            targetElem: '.barlabel'
                        });

                        let itemperrow = $('#sperow').find('select option:selected').text();
                        callGutter(itemperrow);
                        function callGutter(itemperrow) {
                                $('#gutterDOM').AdvanceGutterSpace({
                                    targetParent: SkillContainer,
                                    targetElem: SkillItem,
                                    itemsperrow: itemperrow
                                });
                                if (itemperrow < 2) {
                                    $('#gutterDOM').children('div').first().hide();
                                }
                        }
                    }
                },
                "Data": {
                    "DOM": EasyLibrary.ReadDOM('skillbar/skillbarbasicsetting'),
                    "onload": function ($item) {
                        var SkillBar = {
                            settingButton: $item,
                            SkillContainer: $item.parent().parent().parent().parent(),
                            init: function () {
                                var attr = $('#hdnSkillSettingAttr').data('attribute');
                                if (attr != '') {
                                    $('#popupModel').attrs(attr);
                                    $('#hdnSkillSettingAttr').data('attribute', '');
                                }
                                var SkillItem = SkillBar.SkillContainer.find('.skill-ltem');
                                var html = '';
                                var count = SkillItem.length;
                                SkillItem.each(function () {
                                    let $this = $(this);
                                    let $field = $this.children('.bar-label').find('p').text();
                                    let $skill = $this.find('.bar-element').attr('data-skill');
                                    let $barColor = $this.find('.bar-element').css('background-color');
                                    html += '<div class="field-row  data-row item">';
                                    html += '<div class="field-row stElWrap  col100">';
                                    html += '<span class="fcol cPointer sfCol_6"><i class="fa fa-arrows-v barSort"></i></span>';
                                    html += '<span class="fcol pkrWrp sfCol_6">';
                                    html += '<span class="color-picker-holder skillColors" style="background-color:' + $barColor + '"></span>';
                                    html += '</span>';
                                    html += '<span class="sfCol_40 Ml-5 cb_input">';
                                    html += '<input type="text"  value="' + $field + '"  class="skillInput skLabel" aria-invalid="false">';
                                    html += '</span>';
                                    html += '<span class="sfCol_35 Ml-5 cb_input">';
                                    html += '<input type="text"  maxlength="3"  data-class="skData" value="' + $skill + '" class="skillInput skData xsml-box" aria-invalid="false">';
                                    html += '</span>';
                                    html += '<span class="sfCol_4 Ml-10">';
                                    if (count > 1)
                                        html += '<i class="in-form-icon fa fa-trash delete-icon deleteBar" aria-hidden="true"></i>';
                                    html += '</span>';
                                    html += '</div>';
                                    html += '</div>';
                                });
                                $('.skillsList').html(html);
                                SkillBar.SkillDynamicEvents();
                            },
                            SkillDynamicEvents: function () {


                                $('.addSkill').off().on('click', function () {
                                    let $BarItem = SkillBar.SkillContainer.find('.skill-ltem').last();
                                    var NewDom = document.createElement("div");
                                    $(NewDom).attrs($BarItem.attrs());
                                    $(NewDom).html($BarItem.html());
                                    $BarContainer = SkillBar.SkillContainer.find('.skillBar-wrap');
                                    $BarContainer.prepend(NewDom);
                                    $(NewDom).find('.bar-element').width('0');
                                    SkillBar.animateBar($(NewDom).find('.bar-element'));
                                    $('#hdnSkillSettingAttr').data('attribute', $('#popupModel').attrs());
                                    SkillBar.settingButton.trigger('click');
                                });
                                $('.deleteBar').off().on('click', function () {
                                    let $this = $(this);
                                    let $pos = $('.skillsList .item').index($this.parents('.item'));
                                    let $text = SkillBar.SkillContainer.find('.skill-ltem').eq($pos);
                                    SkillBar.SkillContainer.find('.skill-ltem').eq($pos).remove();
                                    SkillBar.init();
                                });
                                var colorPickerOption = ColorPickerOption({
                                    renderCallback: function ($elm, toggled) {
                                        var objColor = RenderCallBackColor(this);
                                        let $pos = $('.skillsList .item').index($elm.parents('.item'));
                                        var SkItem = SkillBar.SkillContainer.find('.skill-ltem').eq($pos);
                                        $barItem = SkItem.find('.bar-element');
                                        $barItem.css('background-color', objColor.bgColor);
                                    }
                                });
                                $('.skillColors').colorPicker(colorPickerOption);
                                $('.skillInput').off().on('keyup', function () {
                                    let $this = $(this);
                                    let $Val = $this.val();
                                    let $pos = $('.skillsList .item').index($this.closest('.item'));
                                    var SkItem = SkillBar.SkillContainer.find('.skill-ltem').eq($pos);

                                    if ($this.hasClass('skLabel')) {
                                        SkItem.find('p').text($Val);
                                    }

                                    if ($this.hasClass('skData')) {
                                        if ($Val == '')
                                            $Val = 0;
                                        if ($Val >= 0 && $Val <= 100) {
                                            $('#SkillErrorMessage').hide();
                                            let $barItem = SkItem.find('.bar-element');
                                            $barItem.attr('data-skill', $Val);
                                            $barItem.width(0);
                                            SkillBar.animateBar($barItem);
                                        } else {
                                            let $value = $(this).val();
                                            let $val = $value.substring(0, 2);
                                            $(this).val($val);
                                            $('#SkillErrorMessage').show();
                                            $('#SkillErrorMessage').text('Enter Number 0-100 Only');
                                        }
                                    }
                                });
                            },
                            animateBar: function ($barItem) {
                                let $skill = $barItem.attr('data-skill');
                                $barItem.next().text($skill + " %");
                                $barItem.animate({
                                    'width': $skill + '%'
                                });
                            }
                        };
                        SkillBar.init();
                        //----------------------------------------- sortable------                    
                        var $parent = $item.closest('.editor-component');
                        $(".skillsList").AdvanceSorting({
                            targetParent: $parent,
                            targetElem: '.skill-ltem',
                            sortableOptions: {
                                items: "div.data-row",
                                handle: ".barSort",
                                containment: 'div.skillsList'
                            }
                        });
                        //------------------sortable---------------------
                    }
                },
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 80,
                            "min": -80,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"]
                        },
                        "padding": {
                            "max": 80,
                            "min": 0,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"]
                        }
                    }
                },

                "Alignment": {
                    "options": {
                        "horizontal": ["left", "center", "right"]
                    },
                    "selectLayer": function ($elem) {
                        var $parent = $elem.closest('.skillBar').find('.skillBar-wrap');
                        return $parent;
                    }
                }
            },
            "selectLayer": function ($elem) {
                var $parent = $elem.parents().parent().parent().parent().find('.skillBar-wrap');
                return $parent;
            }
        },
        "styleDOMs": {
            "tabs": {
                "Color": {
                    "DOM": EasyLibrary.ReadDOM('skillbar/skillbarbackgroundsetting'),
                    "onload": function ($item) {
                        let $parent = $item.parent().parent().parent().parent();

                        var $barpercent = $item.parent().parent().parent().parent().find('.bar-progress span');
                        $('.barPercentColor').css('background-color', $barpercent.first().css('color'));
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $barpercent.css('color', objColor.bgColor);
                            }
                        });
                        $('.barPercentColor').colorPicker(colorPickerOption);
                        function loadColorPicker($parent) {
                            $('#barlabelColorPic').css('background-color', $parent.find('.bar-label').css('background-color'));
                            var colorPickerOption1 = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $parent.find('.bar-label').css('background-color', objColor.bgColor);
                                }
                            });
                            $('#barlabelColorPic').colorPicker(colorPickerOption1);
                            $('#barItemColorPic').css('background-color', $parent.find('.bar-progress').css('background-color'));
                            var colorPickerOption2 = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $parent.find('.bar-progress').css('background-color', objColor.bgColor);
                                }
                            });
                            $('#barItemColorPic').colorPicker(colorPickerOption2);
                        }
                        loadColorPicker($parent);
                    }
                },

                "Size": {
                    "DOM": EasyLibrary.ReadDOM('skillbar/skillbarpercentsetting'),
                    "onload": function ($this) {
                        component["skill bar"].barLib.barpercentfontsize();
                        component["skill bar"].barLib.barheight();
                    }
                },
                "Box Radius": {
                    "options": {
                        "max": 50,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    },
                    "selectLayer": function ($elem) {
                        var $parent = $elem.closest('.skillBar').find('.bar-progress');
                        return $parent;
                    }
                },

                "Box Shadow": {
                    "options": {},
                    "selectLayer": function ($elem) {
                        var $parent = $elem.closest('.skillBar').find('.bar-progress');
                        return $parent;
                    }
                }
            }
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "Font Size": {
                            "DOM": CreateSliderDOM('barPercentSlider', 'barPercentHandle', '%-Size'),
                            "prepend": "true",
                            "onload": function () {
                                component["skill bar"].barLib.barpercentfontsize();
                            }
                        },

                        "Bar Heading": {
                            "DOM": CreateSliderDOM('barHeadingSlider', 'barHeadingHandle', 'Heading-Size'),
                            "prepend": "true",
                            "onload": function () {
                                component["skill bar"].barLib.barheadingfontsize();
                            }
                        },
                        "Bar Height": {
                            "DOM": CreateSliderDOM('barHeightSlider', 'barHeightHandle', 'Bar-Height'),
                            "prepend": "true",
                            "onload": function () {
                                component["skill bar"].barLib.barheight();
                            }
                        },
                        "lineheight": {
                            "selectLayer": function () {
                                return $activeDOM.find('.editor-para');
                            }
                        },
                        "labelWidth": {
                            "DOM": `<div id="respLabelWidth"></div>`,
                            "prepend": true,
                            "onload": function () {
                                $('#respLabelWidth').AdvanceTextSetting({
                                    targetParent: $activeDOM,
                                    targetElem: $activeDOM.find('.barlabel'),
                                    options: {
                                        size: false,
                                        width: true,
                                        spacing: false,
                                        transform: false,
                                        family: false,
                                        weight: false,
                                        color: true,
                                        lineheight: false
                                    }
                                });
                            }
                        },
                        "Visibility": {}
                    }
                },
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 80,
                            "min": -80,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"]
                        },
                        "padding": {
                            "max": 80,
                            "min": 0,
                            "times": 5,
                            "position": ["all", "left", "right"]
                        }
                    }
                },
                "Alignment": {
                    "custom": true,
                    "DOM": '<div id="barAlignment"></div><div id="titleAlignment"></div>',
                    "onload": function ($item) {
                        $('#barAlignment').AdvanceAlignment({
                            targetParent: $item,
                            targetElem: '.barlabel',
                            labels: {
                                'horizontal': 'Bar Heading'
                            }
                        });
                    }
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            }
        },
        "remove": function ($view) {
            $view.find('.bar-label p').attr('contenteditable', false);
            $view.find('.bar-element').width('0');
        },
        "removeedit": function ($editDOM) {
            $editDOM.find('.bar-element').width('0');
        },
        "revertedit": function () {
            component["skill bar"].view.library.initAnimation();
        },

        //-------------------------------------------
        "barLib": {
            "barheadingfontsize": function () {
                let $parent = $activeDOM;
                let $barheadingfontsize = $parent.find('.barlabel');
                function barheadingfontsize(space) {
                    ReplaceClassByPattern($barheadingfontsize, 'Fs-[0-9]{1,4}', 'Fs-' + space);
                }
                AdvanceSageSlider($('#barHeadingSlider'), $('#barHeadingHandle'), 5, 40, GetValueByClassName($barheadingfontsize, 'Fs-[0-9]{1,4}', 'Fs-'), barheadingfontsize, $parent, 'px');
            },

            "barpercentfontsize": function () {
                let $parent = $activeDOM;
                let $barpercentfontsize = $parent.find('.bar-progress span');
                function barpercentfontsize(space) {
                    ReplaceClassByPattern($barpercentfontsize, 'Fs-[0-9]{1,4}', 'Fs-' + space);
                }
                AdvanceSageSlider($('#barPercentSlider'), $('#barPercentHandle'), 5, 40, GetValueByClassName($barpercentfontsize, 'Fs-[0-9]{1,4}', 'Fs-'), barpercentfontsize, $parent, 'px');
            },

            "barheight": function () {
                let $parent = $activeDOM;
                let $skillbar = $parent.find('.bar-progress');
                function BarHeightChange(space) {
                    ReplaceClassByPattern($skillbar, 'H-[0-9]{1,4}', 'H-' + space);
                }
                AdvanceSageSlider($('#barHeightSlider'), $('#barHeightHandle'), 5, 40, GetValueByClassName($skillbar, 'H-[0-9]{1,4}', 'H-'), BarHeightChange, $parent, 'px');
            }
        },

        "view": {
            "view": function () {
                this.library.initAnimation();
            },
            "library": {
                "animateSkillBar": function () {
                    $('.skillBar-wrap').each(function () {
                        let $SkillWrap = $(this);
                        if ($SkillWrap.attr('data-animate') == 0 && IsInVisibleSection($SkillWrap)) {
                            $SkillWrap.attr('data-animate', 1);
                            let $barElement = $SkillWrap.find('.bar-element');
                            $barElement.each(function () {
                                let $this = $(this);
                                let $skill = $this.data('skill');
                                $this.next().text($skill + " %");
                                $this.animate({
                                    'width': $skill + '%'
                                }, 3000);
                            });
                        }
                    });
                    function IsInVisibleSection($SkillComponent) {
                        let winHeight = $(window).height() - 80;
                        let winScroll = $(window).scrollTop();
                        let $SkillComPos = $SkillComponent.offset().top - winScroll;
                        if (0 <= $SkillComPos && $SkillComPos < winHeight)
                            return true;
                        else
                            return false;
                    }
                },
                "initAnimation": function () {
                    $('.skillBar-wrap').attr('data-animate', 0);
                    let animateSkillbar = this.animateSkillBar;
                    $(window).scroll(function () {
                        animateSkillbar();
                    });
                    animateSkillbar();
                }
            }
        }
    }
};