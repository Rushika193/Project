var component_template = {
    sage_text: {
        componentname: 'sage_text',
        category: "basic",
        icon: "fa fa-font",
        row: false,
        hidden: true,
        defaultdata: '',
        valuekey: null,
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary_ReadDOM("/DynamicPost/PostTemplate/Assets/js/component/html/sagetext/sagetext"),
                    "onload": function () {
                        let $showIconBefore = $('#showIconBeforeTxt');
                        let $iconStng = $('.iconStng');
                        let $dyncmpfldval = $activeDOM.find('.dyncmpfldval');
                        function checkIconExistance() {
                            return $dyncmpfldval.siblings('i.fa').length == 1;
                        }
                        function getIconClass($icon) {
                            let PatStng = '\\bfa-[a-z-]*';
                            return $icon.attr('class').match(new RegExp(PatStng))[0];
                        }
                        function showOrHideIcon(isChecked) {
                            if (isChecked) {
                                $iconStng.show();

                                let $iconList = $('#iconList');
                                $iconList.html(EasyLibrary.FontCollectionList());

                                let $iconSearch = $('#iconSearch');
                                $iconSearch.off('keyup').on('keyup', function () {
                                    let searchVal = $(this).val();
                                    $iconList.find('li').each(function () {
                                        let $this = $(this);
                                        let dataClass = $this.find('i').attr('data-class');
                                        let pos = dataClass.indexOf(searchVal);
                                        if (pos < 0) {
                                            $this.addClass('Dn');
                                        } else {
                                            $this.removeClass('Dn');
                                        }
                                    });
                                });
                                
                                //select icon
                                $iconList.children('li').off('click').on('click', function () {
                                    let $icon = $dyncmpfldval.siblings('i.fa');
                                    $iconList.find('.selected').removeClass();
                                    let $selected = $(this);
                                    RemoveClassByPattern($icon, 'fa-[a-z-]*');
                                    $icon.addClass(getIconClass($selected.children('i')));
                                    $selected.addClass('selected');
                                });

                                if (checkIconExistance()) {
                                    $iconList.find('.' + getIconClass($dyncmpfldval.siblings('i.fa'))).parent('li').addClass('selected');
                                }
                                else {
                                    let $firstIcon = $iconList.find('li:first-child > i.fa');
                                    $firstIcon.parent().addClass('selected');
                                    $(`<i class="fa ${getIconClass($firstIcon)}"></i>`).insertBefore($dyncmpfldval);
                                }

                                function fontSizeChange(space) {
                                    ReplaceClassByPattern($dyncmpfldval.siblings('i.fa'), 'Fs-[0-9]{1,3}', 'Fs-' + space);
                                }
                                AdvanceSageSlider($('#fsSlider'), $('#fsHandle'), 1, 100, GetValueByClassName($dyncmpfldval.siblings('i.fa'), 'Fs-[0-9]{1,3}', 'Fs-'), fontSizeChange, $dyncmpfldval.siblings('i.fa'), 'px');

                                var colorPickerOption = ColorPickerOption({
                                    renderCallback: function ($elm, toggled) {
                                        var objColor = RenderCallBackColor(this);
                                        $dyncmpfldval.siblings('i.fa').css('color', objColor.bgColor);
                                    }
                                });
                                $('#iconColor').colorPicker(colorPickerOption);
                                $('#gutterDOM').AdvanceGutterSpace({
                                    targetParent: $activeDOM,
                                    targetElem: $dyncmpfldval.siblings('i.fa'),
                                    itemsperrow: 2,
                                    type: 'horizontal',
                                    label: ['Icon Text Spacing'],
                                    spacing : "margin"
                                });
                            }
                            else {
                                $iconStng.hide();
                                let $manualSliders = $('#fsSlider').siblings('.manualSize');
                                if ($manualSliders.length > 0) {
                                    $('#fsSlider').siblings('.manualSize').remove();
                                }
                                $dyncmpfldval.siblings('i.fa').remove();
                            }
                        }

                        $showIconBefore.off('click').on('click', function () {
                            showOrHideIcon( $(this).prop('checked'));
                        });


                        //load default state for showing icon
                        if (checkIconExistance()) {
                            $showIconBefore.prop('checked', true);
                            showOrHideIcon(true);
                        }
                        else {
                            $showIconBefore.prop('checked', false);
                            showOrHideIcon(false);
                        }
                       

                        $("#txtbasictab").AdvanceTextSetting({
                            targetParent: $activeDOM,
                            targetElem: $dyncmpfldval
                        });
                        $('#detailPageLink').DynamicCmpDetailLink({ target: $activeDOM });
                        $('#hideEmptyDOM').HideIfEmpty();
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
                    },
                    "selectLayer": function ($elem) {
                        return $activeDOM;
                    },

                },
                "Alignment": {
                    "options": {
                        "horizontal": ["left", "center", "right"]
                    }
                },
                "Hover Effect": {
                    "options": {
                        "color": ["background", "text"],
                        "shadow": "on",
                        "border": {
                            "max": 20,
                            "min": 0,
                            "times": 1,
                            "position": ["all", "top", "right", "bottom", "left"]
                        },
                        "zoom": "on"
                    }
                },
                "Scroll Effect": {
                    "options": [],
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            }
        },
        "styleDOMs": {
            "tabs": {
                "Background": {
                    "options": ["color"]
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
                        "max": 200,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    }
                },
                "Box Shadow":
                {
                    "options": {

                    }
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            }
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "iconSize": {
                            'custom': true,
                            'prepend':true,
                            'DOM': Core_CreateSliderDOM('fsSlide', 'fsHand', 'Icon Size'),
                            'onload': function () {
                                let $dyncmpfldval = $('.dyncmpfldval');
                                function fontSizeChange(space) {
                                    ReplaceClassByPattern($dyncmpfldval.siblings('i.fa'), 'Fs-[0-9]{1,3}', 'Fs-' + space);
                                }
                                if ($dyncmpfldval.siblings('i.fa').length == 1)
                                    AdvanceSageSlider($('#fsSlide'), $('#fsHand'), 1, 100, GetValueByClassName($dyncmpfldval.siblings('i.fa'), 'Fs-[0-9]{1,3}', 'Fs-'), fontSizeChange, $dyncmpfldval.siblings('i.fa'), 'px');
                                else
                                    $('#fsSlide').closest('.field-row').remove();
                            }
                        },
                        "fontsize": {
                            "selectLayer": function () {
                                return $activeDOM.find('.editor-para');
                            }
                        },
                        "lineheight": {
                            "selectLayer": function () {
                                return $activeDOM.find('.editor-para');
                            }
                        },
                        "visibility": {},
                        "width": {}
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
                    },
                    "selectLayer": function ($elem) {
                        return $activeDOM;
                    },
                },
                "Alignment": {
                    "options": {
                        "horizontal": ["left", "center", "right"],
                    },
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        }
    },
    textarea: {
        componentname: 'textarea',
        category: "basic",
        icon: "fa fa-text-height",
        row: false,
        hidden: true,
        defaultdata: '',
        valuekey: null,
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": "<div id='txtbasictab'></div><div id='detailPageLink'></div><div id='hideIfEmptyDOM'></div>",
                    "onload": function () {
                        $("#txtbasictab").AdvanceTextSetting({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.dyncmpfldval')
                        });
                        $('#detailPageLink').DynamicCmpDetailLink({ target: $activeDOM });
                        $('#hideIfEmptyDOM').HideIfEmpty();
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
                    },
                    "selectLayer": function ($elem) {
                        return $activeDOM;
                    },

                },
                "Alignment": {
                    "options": {
                        "horizontal": ["left", "center", "right"]
                    }
                },
                "Hover Effect": {
                    "options": {
                        "color": ["background", "text"],
                        "shadow": "on",
                        "border": {
                            "max": 20,
                            "min": 0,
                            "times": 1,
                            "position": ["all", "top", "right", "bottom", "left"]
                        },
                        "zoom": "on"
                    }
                },
                "Scroll Effect": {
                    "options": [],
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            }
        },
        "styleDOMs": {
            "tabs": {
                "Background": {
                    "options": ["color"]
                },
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    }
                },
                "Box Radius": {
                    "options": {
                        "max": 200,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    }
                },
                "Box Shadow":
                {
                    "options": {

                    }
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "fontsize": {
                            "selectLayer": function () {
                                return $activeDOM.find('.editor-para');
                            }
                        },
                        "lineheight": {
                            "selectLayer": function () {
                                return $activeDOM.find('.editor-para');
                            }
                        },
                        "visibility": {},
                        "width": {}
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
                    },
                    "selectLayer": function ($elem) {
                        return $activeDOM;
                    },
                },
                "Alignment": {
                    "options": {
                        "horizontal": ["left", "center", "right"],
                    },
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        }
    },
    "checkbox-group": {
        componentname: 'checkbox-group',
        category: "basic",
        icon: "fa fa-check-square",
        row: false,
        hidden: true,
        defaultdata: "",
        settingDOMs: {
            "tabs": {
                "Basic": {
                    "DOM": `<div id="listDOM"></div><div id="detailPageLink"></div><div id="textSettingDOM"></div><div id="hideEmpty"></div>`,
                    "onload": function () {
                        $('#listDOM').ListDisplay();
                        $('#textSettingDOM').AdvanceTextSetting({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.dyncmpfldval')
                        });
                        $('#detailPageLink').DynamicCmpDetailLink({ target: $activeDOM });
                        $('#hideEmpty').HideIfEmpty();
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
                    },
                    "selectLayer": function ($elem) {
                        return $activeDOM;
                    },

                },
                "Alignment": {
                    "options": {
                        "horizontal": ["left", "center", "right"]
                    }
                },
                "Hover Effect": {
                    "options": {
                        "color": ["background", "text"],
                        "shadow": "on",
                        "border": {
                            "max": 20,
                            "min": 0,
                            "times": 1,
                            "position": ["all", "top", "right", "bottom", "left"]
                        },
                        "zoom": "on"
                    }
                },
                "Scroll Effect": {
                    "options": [],
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            }
        },
        styleDOMs: {
            "tabs": {
                "Background": {
                    "options": ["color"]
                },
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    }
                },
                "Box Radius": {
                    "options": {
                        "max": 200,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    }
                },
                "Box Shadow":
                {
                    "options": {

                    }
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        responsiveDOMs: {
            "tabs": {
                "Basic": {
                    "options": {
                        "Basic_": {
                            "DOM": `<div id="respText"></div>`,
                            "prepend": "true",
                            "onload": function () {
                                $('#respText').AdvanceTextSetting({
                                    targetParent: $activeDOM,
                                    targetElem: $activeDOM.find('.dyncmpfldval'),
                                    option: {
                                        color: false
                                    }
                                });
                            }
                        }
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
            },
            "selectLayer": function ($elem) {
                return $activeDOM.find('.dyncmpfldval');
            }
        }
    },
    "select": {
        componentname: 'select',
        category: "basic",
        icon: "fa fa-caret-down",
        row: false,
        hidden: true,
        defaultdata: "",
        settingDOMs: {
            "tabs": {
                "Basic": {
                    "DOM": `<div id="listDOM"></div><div id="detailPageLink"></div><div id="textSettingDOM"></div><div id="hideEmpty"></div>`,
                    "onload": function () {
                        $('#listDOM').ListDisplay();
                        $('#textSettingDOM').AdvanceTextSetting({
                            targetParent: $activeDOM,
                            targetElem: '.dyncmpfldval',
                            option: {
                            }
                        });
                        $('#detailPageLink').DynamicCmpDetailLink({ target: $activeDOM });
                        $('#hideEmpty').HideIfEmpty();
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
                    }
                },
                "Hover Effect": {
                    "options": {
                        "color": ["background", "text"],
                        "shadow": "on",
                        "border": {
                            "max": 20,
                            "min": 0,
                            "times": 1,
                            "position": ["all", "top", "right", "bottom", "left"]
                        },
                        "zoom": "on"
                    }
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM.find('.dyncmpfldval');
            },
        },
        styleDOMs: {
            "tabs": {
                "Background": {
                    "options": ["color"]
                },
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    }
                },
                "Box Radius": {
                    "options": {
                        "max": 500,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    }
                },
                "Box Shadow": {
                    "options": {

                    }
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM.find('.dyncmpfldval');
            },
        },
        responsiveDOMs: {
            "tabs": {
                "Basic": {
                    "options": {
                        "Basic_": {
                            "DOM": `<div id="respText"></div>`,
                            "prepend": "true",
                            "onload": function () {
                                $('#respText').AdvanceTextSetting({
                                    targetParent: $activeDOM,
                                    targetElem: $activeDOM.find('.dyncmpfldval'),
                                    option: {
                                        color: false
                                    }
                                });
                            }
                        }
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
            },
            "selectLayer": function ($elem) {
                return $activeDOM.find('.dyncmpfldval');
            },
        }
    },
    "radio-group": {
        componentname: 'radio-group',
        category: "basic",
        icon: "fa fa-stop-circle",
        row: false,
        hidden: true,
        defaultdata: "",
        settingDOMs: {
            "tabs": {
                "Basic": {
                    "DOM": `<div id="radioStngWrap"></div><div id="detailPageLink"></div><div id="hideEmpty"></div>`,
                    "onload": function () {
                        $('#radioStngWrap').AdvanceTextSetting({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('p.dyncmpfldval')
                        });
                        $('#detailPageLink').DynamicCmpDetailLink({ target: $activeDOM });
                        $('#hideEmpty').HideIfEmpty();
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
                    }
                },
                "Hover Effect": {
                    "options": {
                        "color": ["background", "text"],
                        "shadow": "on",
                        "border": {
                            "max": 20,
                            "min": 0,
                            "times": 1,
                            "position": ["all", "top", "right", "bottom", "left"]
                        },
                        "zoom": "on"
                    }
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            }
        },
        styleDOMs: {
            "tabs": {
                "Background": {
                    "options": ["color"]
                },
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    }
                },
                "Box Radius": {
                    "options": {
                        "max": 500,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    }
                },
                "Box Shadow": {
                    "options": {

                    }
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM.find('.dyncmpfldval');
            },
        },
        responsiveDOMs: {
            "tabs": {
                "Basic": {
                    "options": {
                        "_Basic": {
                            "DOM": `<div id="radioTxtResp"></div>`,
                            "onload": function () {
                                $('#radioTxtResp').AdvanceTextSetting({
                                    targetParent: $activeDOM,
                                    targetElem: $activeDOM.find('p.dyncmpfldval'),
                                });
                            }
                        }
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
                    },
                    "selectLayer": function ($elem) {
                        return $activeDOM;
                    }
                }
            }
        }
    },
    richtext: {
        componentname: 'richtext',
        category: "basic",
        icon: "fa fa-paragraph",
        row: false,
        hidden: true,
        defaultdata: '',
        valuekey: null,
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": `<div id="detailPageLink"></div><div id="hideEmpty"></div>`,
                    "onload": function () {
                        $('#detailPageLink').DynamicCmpDetailLink({ target: $activeDOM });
                        $('#hideEmpty').HideIfEmpty();
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
                    },
                    "selectLayer": function ($elem) {
                        return $activeDOM;
                    },

                },
                "Alignment": {
                    "options": {
                        "horizontal": ["left", "center", "right"]
                    }
                },
                "Scroll Effect": {
                    "options": [],
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "styleDOMs": {
            "tabs": {
                "Background": {
                    "options": ["color"]
                },
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    }
                },
                "Box Radius": {
                    "options": {
                        "max": 200,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    }
                },
                "Box Shadow":
                {
                    "options": {

                    }
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "fontsize": {
                            "selectLayer": function () {
                                return $activeDOM.find('.editor-para');
                            }
                        },
                        "lineheight": {
                            "selectLayer": function () {
                                return $activeDOM.find('.editor-para');
                            }
                        },
                        "visibility": {},
                        "width": {}
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
                    },
                    "selectLayer": function ($elem) {
                        return $activeDOM;
                    },
                },
                "Alignment": {
                    "options": {
                        "horizontal": ["left", "center", "right"],
                    },
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        }
    },
    sageMedia: {
        componentname: 'sageMedia',
        category: "basic",
        icon: "fa fa-image",
        row: false,
        hidden: true,
        defaultdata: "",
        settingDOMs: {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary_ReadDOM("/DynamicPost/PostTemplate/Assets/js/component/html/sagemedia/sagemedia"),
                    "onload": function () {
                        let $img = $activeDOM.find('img');
                        $('#changeImage').off().on('click', function () {
                            $(this).SageMedia({
                                userModuleID: webBuilderUserModuleID,
                                onSelect: function (src, response, type, filename, extension) {
                                    $activeDOM.attr('data-default-value', src);
                                },
                                mediaType: 'image',
                                success: function (resposne) {
                                    $img.attr('src', resposne.filePath).attr('alt', resposne.alt);
                                }
                            });
                        });

                        $('#templateBuilderImage').ImageDimensions($img);
                        $('#detailPageLink').Link($activeDOM.find('a'));
                        $('#hideEmpty').HideIfEmpty();
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
                "Hover Effect": {
                    "options": {
                        "shadow": "on",
                        "border": {
                            "max": 20,
                            "min": 0,
                            "times": 1,
                            "position": ["all", "top", "right", "bottom", "left"]
                        },
                        "zoom": "on"
                    }
                },
                "Scroll Effect": {
                    "options": []
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM.find('img');
            }
        },
        styleDOMs: {
            "tabs": {
                "Box Radius": {
                    "options": {
                        "max": 500,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    },
                    "selectLayer": function ($elem) {
                        return $activeDOM.find('img');
                    },
                },
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    },
                    "selectLayer": function ($elem) {
                        return $activeDOM.find('img');
                    },
                },
                "Box Shadow": {
                    "options": {

                    },
                    "selectLayer": function ($elem) {
                        return $activeDOM.find('img');
                    },
                },
            }
        },
        responsiveDOMs: {
            "tabs": {
                "Basic": {
                    "options": {
                        "imagerespo": {
                            "DOM": EasyLibrary_ReadDOM("/DynamicPost/PostTemplate/Assets/js/component/html/sagemedia/sagemedia"),
                            "prepend": "true",
                            "onload": function () {
                                component["sageMedia"].settingDOMs.tabs.Basic.onload();
                            }
                        }
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
            },
            "selectLayer": function ($elem) {
                return $activeDOM.find('img');
            },
        },
    },
    sageIcon: {
        componentname: 'sageIcon',
        category: "basic",
        icon: "fa fa-fonticons",
        row: false,
        hidden: true,
        defaultdata: "",
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary_ReadDOM("/DynamicPost/PostTemplate/Assets/js/component/html/fonticon/fonticonbasictab"),
                    "onload": function ($item) {
                        var $parent = $activeDOM;
                        var $fontIcon = $parent.find('.font-icon');
                        InitEvents();
                        function InitEvents() {
                            FontWrapperSize();
                            FontSize();
                            FontIconColor();
                        }
                        function FontWrapperSize() {
                            component["sageIcon"].common.fontwrapper();
                        }

                        function FontSize() {
                            component["sageIcon"].common.fontsize();
                        }

                        function FontIconColor() {
                            $('#fontIconColor').css('background-color', $fontIcon.css('color'));
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $fontIcon.css({ 'color': objColor.bgColor });
                                }
                            });
                            $('#fontIconColor').colorPicker(colorPickerOption);
                        }
                        $('#detailPageLink').DynamicCmpDetailLink({ target: $activeDOM });
                        $('#hideEmpty').HideIfEmpty();
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
                "Hover Effect": {
                    "options": {
                        "color": ["background", "text"],
                        "shadow": "on",
                        "border": {
                            "max": 20,
                            "min": 0,
                            "times": 1,
                            "position": ["all", "top", "right", "bottom", "left"],
                            "selectLayer": function ($elem) {

                            },
                        },
                        "zoom": "on"
                    },
                },
                "Scroll Effect": {
                    "options": [],
                    "selectLayer": function ($elem) {
                        return $elem.parent().parent();
                    }
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "styleDOMs": {
            "tabs": {
                "Background": {
                    "options": ["color"]
                },
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all"],
                    }
                },
                "Box Radius": {
                    "options": {
                        "max": 200,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"],
                    }
                },
                "Box Shadow": {
                    "options": ["all", "color", "zoom", "Inherit"]
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "Font Size": {
                            "DOM": Core_CreateSliderDOM('fontIconHeightSlider', 'fontIconHeightHandle', 'Font Size'),
                            "prepend": "true",
                            "onload": function () {
                                component["sageIcon"].common.fontsize();
                            }
                        },
                        "Icon Wrapper Size": {
                            "DOM": Core_CreateSliderDOM('fontIconbackHeightSlider', 'fontIconbackHeightHandle', 'Icon Wrapper Size'),
                            "prepend": "true",
                            "onload": function () {
                                component["sageIcon"].common.fontwrapper();
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
                            "position": ["all", "top", "left", "bottom", "right"]
                        }
                    }
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "common": {
            "fontsize": function () {
                let $parent = $activeDOM;
                let $icon = $parent.find('.font-icon');
                function LineHeightChange(space) {
                    ReplaceClassByPattern($icon, 'Fs-[0-9]{1,4}', 'Fs-' + space);
                }
                AdvanceSageSlider($('#fontIconHeightSlider'), $('#fontIconHeightHandle'), 5, 1080, GetValueByClassName($icon, 'Fs-[0-9]{1,4}', 'Fs-'), LineHeightChange, $parent, 'px');
            },
            "fontwrapper": function () {
                let $parent = $activeDOM;
                function LineHeightChange(space) {
                    ReplaceClassByPattern($parent, 'H-[0-9]{1,4}', 'H-' + space);
                    ReplaceClassByPattern($parent, 'W-[0-9]{1,4}', 'W-' + space);
                }
                AdvanceSageSlider($('#fontIconbackHeightSlider'), $('#fontIconbackHeightHandle'), 5, 1080, GetValueByClassName($parent, 'H-[0-9]{1,4}', 'H-'), LineHeightChange, $parent, 'px');
            }
        }
    },
    "detail button": {
        "componentname": "detail button",
        "category": "basic",
        "icon": "fa fa-link",
        "row": false,
        "hidden": true,
        "collection": true,
        "type": "element",
        "DOM": {
            buttonstyle: EasyLibrary_ReadDOM('/DynamicPost/PostTemplate/Assets/js/component/html/detail_button/buttonStyles')
        },
        "defaultdata": EasyLibrary_ReadDOM("/DynamicPost/PostTemplate/Assets/js/component/html/detail_button/defaultbutton"),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) {
            let _this = this;
            let allButtonStyles = BtnCollection();
            function BtnCollection() {
                let btncoll = _this.DOM.buttonstyle;
                let $btn = $(btncoll);
                let html = '';
                $btn.find('> .editor-component.dyndetail_button').each(function ($index, $val) {
                    html += liWrap($($val).wrap('<p/>').parent().html());
                });
                function liWrap(elem) {
                    let li = '<li class="selectData  Mt-10 Mr-10 Mb-10 Ml-10" style="" data-title="Simple button style" data-style="5">';
                    li += elem;
                    li += "</li>";
                    return li;
                }
                if (html.length > 0) {
                    html = `<ul class="selectDataWrapper Dfx flxWrp TxAl-c " style="height:100%">
                                    <li class ="title sfCol_100 Dn">Simple button style</li>
                                    ${html}
                                </ul>
                            `;
                }
                return html;
            }
            FullPagePopup({
                data: allButtonStyles,
                heading: "Button Styles",
                showheading: true,
                width: '70%'
            });

            $('.selectData').off().on('click', function () {
                component["detail button"].common.copyAttributes($appendLayer, $(this));
                CloseFullPagePopup();
            });

            return 'no data to show';
        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (!$appendLayer.hasClass('site-body')) {
                $appendLayer.addClass('ff-' + $('#basicFonts').val());
                $appendLayer.addClass('f-weight-400');
            }
        },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary_ReadDOM("/DynamicPost/PostTemplate/Assets/js/component/html/detail_button/defaultbuttonbasic"),
                    "onload": function ($item) {
                        var $parent = $activeDOM;
                        $("#txtbasictab").AdvanceTextSetting({
                            targetParent: $activeDOM.parent(),
                            targetElem: $activeDOM,
                            options: {
                                size: true,
                                lineheight: true,
                                width: false,
                                spacing: true,
                                transform: true,
                                family: true,
                                weight: true,
                                color: false
                            }
                        });
                        var $Icon = $parent.find('a > i');
                        var $text = $parent.find('a > span');
                        var $anchor = $parent.find('a');
                        InitEvents();
                        function InitEvents() {
                            //FontSize();
                            WrapperSize();
                            WrapperHeight();
                            FontIconColor();
                            TextTranformCheck();
                            //EnableLink();
                            EnableText();
                            EnableIcon();
                            FontIcon();
                            LineHeight();
                        }
                        function FontSize() {
                            component["detail button"].common.fontsize();
                        }
                        function WrapperSize() {
                            component["detail button"].common.width();
                        }
                        function LineHeight() {
                            component["detail button"].common.lineheight();
                        }
                        function WrapperHeight() {
                            var buttonHeight = $parent.css('height').replace('px', '');

                            function ButtonHeightChange(space) {
                                $parent.css('height', space + 'px');
                            }
                            AdvanceSageSlider($('#buttonWrapperHeightSlider'), $('#buttonWrapperHeightHandle'), 5, 500, buttonHeight, ButtonHeightChange, $parent, 'px');
                        }
                        function FontIconColor() {
                            $('#buttonColor').css('background-color', $anchor.css('color'));
                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    $Icon.css({ 'color': objColor.bgColor });
                                    $text.css({ 'color': objColor.bgColor });
                                    $anchor.css({ 'color': objColor.bgColor });
                                }
                            });
                            $('#buttonColor').colorPicker(colorPickerOption);
                        }

                        function TextTranformCheck() {
                            var trasformValue = '';
                            if ($parent.hasClass('txU')) {
                                trasformValue = 'txU';
                            } else if ($parent.hasClass('txL')) {
                                trasformValue = 'txL';
                            }
                            $('#buttonTextTransform').val(trasformValue);
                            $('#buttonTextTransform').on('change', function () {
                                var tranformCase = $(this).val();
                                switch (tranformCase) {
                                    case 'txU':
                                        $parent.removeClass('txL').removeClass('txC').addClass('txU');
                                        break;
                                    case 'txL':
                                        $parent.removeClass('txU').removeClass('txC').addClass('txL');
                                        break;
                                    case 'txC':
                                        $parent.removeClass('txU').removeClass('txL').addClass('txC');
                                        break;
                                    case '':
                                        $parent.removeClass('txU').removeClass('txL').removeClass('txU');
                                        break;
                                }
                            });
                        }
                        var linklist = {
                            'internal': 'internal',
                            'external': 'external',
                            'onepage': 'onepage'
                        };
                        function EnableLink() {
                            var linkType = $anchor.attr('data-link');

                            var link = $anchor.attr('href');
                            //link !== "javascript:void(0);"
                            if (typeof linkType !== "undefined") {
                                $('#enableButtonLink').prop('checked', true);
                                $('#divEnableLink').show();
                                switch (linkType) {
                                    case 'external':
                                        $('#enableExternalLink').prop('checked', true);
                                        $('#linkTextURLHolder').show();
                                        $('#linkTextURL').val(link);
                                        $anchor.removeClass('anchorpage');
                                        break;
                                    case 'internal':
                                        GetPageList();
                                        $anchor.addClass('anchorpage');
                                        $("#anchorPageList option").filter(function () {
                                            return this.text == link.replace(SageFrameHostURL + '/', '');
                                        }).attr('selected', true);
                                        $('#anchorPageListHolder').show();
                                        $('#enableExternalLink').prop('checked', false);
                                        break;
                                    case 'onepage':
                                        GetPageList();
                                        $("#anchorPageList").val(link);
                                        $('#anchorPageListHolder').show();
                                        $('#enableExternalLink').prop('checked', false);
                                        $anchor.removeClass('anchorpage');
                                        break;
                                }
                            }
                            else {
                                $('#enableButtonLink').prop('checked', false);
                            }
                            if (typeof $anchor.attr('target') !== "undefined") {
                                $('#targetFrame').val($anchor.attr('target'));
                            }
                            $('#enableButtonLink').off().on('click', function () {
                                $anchor.removeClass('anchorpage');
                                if ($(this).is(':checked')) {
                                    $anchor.attr('data-link', linklist.external);
                                    $anchor.attr('href', '#');
                                    $('#linkTextURL').val('').focus();
                                    $('#divEnableLink').slideDown(400);
                                    $anchor.attr('target', $('#targetFrame').val());
                                    $('#enableExternalLink').prop('checked', true);
                                    $('#linkTextURLHolder').show();
                                    $('#anchorPageListHolder').hide();
                                } else {
                                    $anchor.attr('href', 'javascript:void(0);');
                                    $('#divEnableLink').slideUp(400);
                                    $anchor.removeAttr('data-link', linklist.external);
                                    $anchor.removeAttr('target');
                                }
                            });
                            $('#targetFrame').on('change', function () {
                                $anchor.attr('target', $('#targetFrame').val());
                            });
                            $('#enableExternalLink').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    $anchor.attr('data-link', linklist.external);
                                    $('#linkTextURLHolder').show();
                                    $('#anchorPageListHolder').hide();
                                    $('#linkTextURL').val('').focus();
                                    $anchor.attr('href', '#');
                                    $anchor.removeClass('anchorpage');
                                } else {
                                    ChnageMenulinkType();
                                    GetPageList();
                                    $('#linkTextURLHolder').hide();
                                    $('#anchorPageListHolder').show();
                                    $('#anchorPageList').trigger('change');
                                    $anchor.attr('data-onepage', $('#anchorPageList option:selected').val());
                                }
                            });


                            $('#linkTextURL').on('keyup', function () {
                                var $this = $(this);
                                var val = $this.val().trim();
                                var link = '#';
                                if (val.length > 0) {
                                    link = val;
                                }
                                $anchor.attr('href', link);
                                component["detail button"].view.library.buttonlick();
                            });
                        }
                        function ChnageMenulinkType() {
                            if ($('#chkOnePageMenu').is(':checked')) {
                                $anchor.attr('data-link', linklist.onepage);
                                $anchor.removeClass('anchorpage');
                            }
                            else {
                                $anchor.attr('data-link', linklist.internal);
                                $anchor.addClass('anchorpage');
                            }
                        }
                        function GetPageList() {
                            var options = '';
                            if ($('#chkOnePageMenu').is(':checked'))
                                $('.menuHeader .onepagemenu  li').each(function (index, item) {
                                    var $item = $(this);
                                    options += '<option  value="' + $item.attr('data-opscroll') + '">' + $item.find(' > a > .pageName').text() + '</option>';
                                });
                            else {
                                options = EasyLibrary.GetPageOption();
                            }
                            $('#anchorPageList').html(options);
                            //$('#linkTextURL').val($('#anchorPageList selected:option').text());
                            $('#anchorPageList').off().on('change', function () {
                                var $this = $(this);
                                var url = $('#anchorPageList option:selected').text();
                                ChnageMenulinkType();
                                if ($('#chkOnePageMenu').is(':checked')) {
                                    $anchor.attr('href', $('#anchorPageList option:selected').val());
                                    $anchor.attr('data-onepage', $('#anchorPageList option:selected').val());
                                }
                                else
                                    $anchor.attr('href', SageFrameHostURL + '/' + url);
                            });
                        }
                        function EnableText() {
                            if ($text.length > 0) {
                                var text = $text.text();
                                $('#enableButtonText').prop('checked', true);
                                $('#buttonText').val(text);
                                $('#divEnableText').show();
                            } else {
                                $('#enableButtonText').prop('checked', false);
                            }
                            $('#enableButtonText').on('click', function () {
                                if ($(this).is(':checked')) {
                                    $('#buttonText').val('').focus();
                                    $('#divEnableText').slideDown(400);
                                    if ($parent.find('a > span').length == 0) {
                                        if ($('#linkBeforeText').is(':checked')) {
                                            $parent.find('a').append('<span class="com-button-text c" contenteditable="true">default text</span>');
                                        } else {
                                            $parent.find('a').prepend('<span class="com-button-text onhovercolor" contenteditable="true">default text</span>');
                                        }
                                        $('#buttonText').val('default text');
                                        $text = $parent.find('a > span');
                                    }
                                } else {
                                    $('#divEnableText').slideUp(400);
                                    $parent.find('a > span').remove();
                                }
                            });
                            $('#buttonText').on('keyup', function () {
                                var $this = $(this);
                                var val = $this.val().trim();
                                var text = 'default text';
                                if (val.length > 0) {
                                    text = val;
                                }
                                $text.text(text);
                            });
                        }

                        function EnableIcon() {
                            if ($Icon.length > 0) {
                                var iconClass = $Icon.attr('class').replace('fa ', '').replace('onhovercolor', '');
                                $('#enableButtonIcon').prop('checked', true);
                                $('#buttonIcon').show();
                            } else {
                                $('#enableButtonIcon').prop('checked', false);
                            }
                            $('#enableButtonIcon').on('click', function () {
                                if ($(this).is(':checked')) {
                                    $('#buttonIcon').slideDown(400);
                                    var iconClass = 'fa-arrow-right';
                                    if ($('#buttonfontIconCollection').find('li.selected').length > 0) {
                                        iconClass = $('#buttonfontIconCollection').find('li.selected').find('i').attr('data-class');
                                    } else {
                                        $('#buttonfontIconCollection').find('li').parent().addClass('selected');
                                        $('#buttonfontIconCollection').find('li i[data-class="fa-arrow-right"]').parent().addClass('selected');
                                    }
                                    if ($parent.find('a > i').length == 0) {
                                        if ($('#linkBeforeText').is(':checked')) {
                                            $parent.find('a').prepend('<i class="fa ' + iconClass + ' onhovercolor"></i>');
                                        } else {
                                            $parent.find('a').append('<i class="fa ' + iconClass + ' onhovercolor"></i>');
                                        }
                                        $Icon = $parent.find('a > i');
                                    }

                                } else {
                                    $('#buttonIcon').slideUp(400);
                                    $('#linkBeforeText').prop('checked', false);
                                    $parent.find('a > i').remove();
                                }
                            });
                            $('#linkBeforeText').on('click', function () {
                                var $i = $parent.find('a > i');
                                var $s = $parent.find('a > span');
                                if ($(this).is(':checked')) {
                                    if ($i.length > 0 && $s.length > 0) {
                                        $anchor.append($i);
                                        $anchor.append($s);
                                    }
                                } else {
                                    if ($i.length > 0 && $s.length > 0) {
                                        $anchor.append($s);
                                        $anchor.append($i);
                                    }
                                }
                            });
                        }

                        function FontIcon() {
                            $('#buttonfontIconCollection').html(EasyLibrary.FontCollectionList());
                            SearchFontIcon();
                        }

                        function SearchFontIcon() {
                            $('#buttonSearchIcon').on('keyup', function () {
                                var searchVal = $(this).val();
                                $('#buttonfontIconCollection').find('li').each(function () {
                                    var $this = $(this);
                                    var dataClass = $this.find('i').attr('data-class');
                                    var pos = dataClass.indexOf(searchVal);
                                    if (pos < 0) {
                                        $this.addClass('Dn');
                                    } else {
                                        $this.removeClass('Dn');
                                    }
                                });
                            });
                            if ($Icon.length > 0) {
                                var fontClasses = $Icon.attr('class').replace('fa ', '').replace('onhovercolor', '').trim();
                                $('#buttonfontIconCollection').find('li i[data-class="' + fontClasses + '"]').parent().addClass('selected');
                            }
                            $('#buttonfontIconCollection').find('li').on('click', function () {
                                var chooseClass = $(this).find('i').attr('data-class');
                                $Icon.attr('class', 'onhovercolor fa ' + chooseClass);
                                $('#buttonfontIconCollection').find('li').removeClass('selected');
                                $(this).addClass('selected');
                            });
                        }
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": "<div id='customouterspacing'></div> <div id='custominnerspacing'></div>",
                    "onload": function ($item) {
                        $('#customouterspacing').AdvanceSpacing({
                            targetParent: $activeDOM.parent(),
                            targetElem: $activeDOM,
                            "options": {
                                "margin": {
                                    "max": 80,
                                    "min": -80,
                                    "times": 5,
                                    "position": ["all", "top", "left", "bottom", "right"]
                                },
                            },
                        });
                        $('#custominnerspacing').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('a'),
                            "options": {
                                "padding": {
                                    "max": 80,
                                    "min": 0,
                                    "times": 5,
                                    "position": ["all", "top", "left", "bottom", "right"]
                                },
                            },
                        });
                    }
                },
                "Hover Effect": {
                    "options": {
                        "color": ["all", "background", "text"],
                        "shadow": "on",
                        "border": {
                            "max": 20,
                            "min": 0,
                            "times": 1,
                            "position": ["all", "top", "right", "bottom", "left"],
                            "selectLayer": function ($elem) {
                                //return $parent;
                            },
                        }
                    },
                    "Scroll Effect": {
                        "options": [],
                        "selectLayer": function ($elem) {
                            return $elem.parent().parent();
                        }
                    }
                },
                "Scroll Effect": {
                    "options": [],
                    "selectLayer": function ($elem) {
                        return $activeDOM;
                    }
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "styleDOMs": {
            "tabs": {
                "Background": {
                    "options": ["color"]
                },
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    }
                },
                "Box Radius": {
                    "options": {
                        "max": 200,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    }
                },
                "Box Shadow": {
                    "options": {

                    }
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "Line Height": {
                            "DOM": Core_CreateSliderDOM('LineHeightSizeSlider', 'LineHeightSizeHandle', 'Line Height'),
                            "prepend": "true",
                            "onload": function () {
                                LineHeight();
                                function LineHeight() {
                                    component["detail button"].common.lineheight();
                                }
                            }
                        },
                        //"Height": {
                        //    "callback": function (space, $elem) {
                        //        let $parent = $activeDOM;
                        //        let parentClasses = $parent.attr('class');
                        //        let dAlpha = DeviceAlphaSpace();
                        //        let regex = new RegExp(dAlpha + 'Lh-[0-9]{1,4}', 'g');
                        //        let lineHeightClass = parentClasses.match(regex);
                        //        if (lineHeightClass !== null) {
                        //            $parent.removeClass(lineHeightClass[0]);
                        //        }
                        //        $parent.addClass(dAlpha + 'Lh-' + space);
                        //    }
                        //},
                        "Widths": {
                            "DOM": Core_CreateSliderDOM('buttonWrapperSizeSlider', 'buttonWrapperSizeHandle', 'Width'),
                            "prepend": "true",
                            "onload": function () {
                                LineHeight();
                                function LineHeight() {
                                    component["detail button"].common.width();
                                }
                            }
                        },
                        "fontsize": {
                            "DOM": Core_CreateSliderDOM('buttonSizeSlider', 'buttonSizeHandle', 'Width'),
                            "prepend": "true",
                            "onload": function () {
                                LineHeight();
                                function LineHeight() {
                                    component["detail button"].common.fontsize();
                                }
                            }
                        },
                        "FontSize": {},
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
                            "position": ["all", "top", "left", "bottom", "right"]
                        }
                    }
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "view": {
            "view": function () {
                this.library.buttonlick();
            },
            "library": {
                "buttonlick": function () {
                    $('.editor-component.dyndetail_button').find('.com-button').off().on('click', function (e) {
                        var $this = $(this);
                        var onePage = $this.attr('data-link');
                        var href = $this.attr('data-onepage');
                        if (typeof onePage !== "undefined" && typeof href !== "undefined") {
                            if (onePage === "onepage") {
                                e.preventDefault();
                                $('.menuHeader .onepagemenu  li[data-opscroll="' + href + '"]').trigger('click');
                            }
                        }
                    });
                }
            }
        },
        "common": {
            "width": function () {
                let $parent = $activeDOM;
                function WidthChange(space) {
                    ReplaceClassByPattern($parent, 'W-[0-9]{1,4}', 'W-' + space);
                }
                AdvanceSageSlider($('#buttonWrapperSizeSlider'), $('#buttonWrapperSizeHandle'), 5, 1080,
                    GetValueByClassName($parent, 'W-[0-9]{1,4}', 'W-'), WidthChange, $parent, 'px');
            },
            "lineheight": function () {
                let $parent = $activeDOM;
                function LineHeightChange(space) {
                    ReplaceClassByPattern($parent, 'Lh-[0-9]{1,4}', 'Lh-' + space);
                }
                AdvanceSageSlider($('#LineHeightSizeSlider'), $('#LineHeightSizeHandle'), 5, 200,
                    GetValueByClassName($parent, 'Lh-[0-9]{1,4}', 'Lh-'), LineHeightChange, $parent, 'px');
            },
            "fontsize": function () {
                let $parent = $activeDOM;
                function LineHeightChange(space) {
                    ReplaceClassByPattern($parent, 'Fs-[0-9]{1,4}', 'Fs-' + space);
                }
                AdvanceSageSlider($('#buttonSizeSlider'), $('#buttonSizeHandle'), 5, 200,
                    GetValueByClassName($parent, 'Fs-[0-9]{1,4}', 'Fs-'), LineHeightChange, $parent, 'px');
            },
            "copyAttributes": function ($dropped, $choosen) {
                let $selected = $choosen.children('.editor-component');
                $selected.each(function () {
                    $.each(this.attributes, function () {
                        if (this.specified) {
                            $dropped.attr(this.name, this.value);
                        }
                    });
                });
            }
        }
    },
    sageVideo: {
        componentname: 'sageVideo',
        category: "basic",
        icon: "fa fa-play-circle",
        row: false,
        hidden: true,
        defaultdata: '',
        valuekey: null,
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary_ReadDOM("/DynamicPost/PostTemplate/Assets/js/component/html/sagevideo/sagevideo"),
                    "onload": function () {
                        let $wrapper = $activeDOM;
                        let Height = GetValueByClassName($wrapper, 'H-[0-9]{1,4}', 'H-');
                        let curWidth = GetValueByClassName($wrapper, 'sfCol_[0-9]{1,4}', 'sfCol_');
                        function MapWidthChange(space) {
                            ReplaceClassByPattern($wrapper, 'sfCol_[0-9]{1,4}', 'sfCol_' + space);
                        }
                        AdvanceSageSlider($('#sageVideoWidthSlider'), $('#sageVideoWidthHandle'), 1, 100, curWidth, MapWidthChange, $wrapper, '%');

                        function MapHeightChange(space) {
                            ReplaceClassByPattern($wrapper, 'H-[0-9]{1,4}', 'H-' + space);
                        }
                        AdvanceSageSlider($('#sageVideoHeighthSlider'), $('#sageVideoHeighthHandle'), 200, 1000, Height, MapHeightChange, $wrapper, 'px');

                        $('#resetSageVideo').on('click', function () {
                            ReplaceClassByPattern($wrapper, 'H-[0-9]{1,4}', 'H-' + 200);
                            ChangeSliderValue($('#sageVideoHeighthSlider'), 200);
                            ReplaceClassByPattern($wrapper, 'sfCol_[0-9]{1,4}', 'sfCol_' + 100);
                            ChangeSliderValue($('#sageVideoWidthSlider'), 100);
                        });
                        $('#hideEmpty').HideIfEmpty();

                        //default url change
                        let $defURLinput = $('#defaultURL');
                        let $vidWrap = $activeDOM.find('.dyncmpfldval');
                        let $iframe = $vidWrap.children('iframe');

                        //load URL
                        $defURLinput.val($activeDOM.attr('data-default-value'));
                        let urlFormat = 'https://www.youtube.com/embed/***?controls=0&autoplay=0';
                        let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

                        $defURLinput.focus(function () { $(this).select(); }).off('blur').on('blur', function () {
                            let url = $(this).val();
                            let match = url.match(regExp);
                            if (match && match[2].length === 11) {
                                $activeDOM.attr('data-default-value', url);
                                $iframe.attr('src', urlFormat.replace('***', match[2]));
                                $vidWrap.html($iframe);
                            }
                        });
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
                    },
                    "selectLayer": function ($elem) {
                        return $activeDOM;
                    }

                },
                "Alignment": {
                    "options": {
                        "horizontal": ["left", "center", "right"]
                    }
                },
                "Scroll Effect": {
                    "options": []
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            }
        },
        "styleDOMs": {
            "tabs": {
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    }
                },
                "Box Radius": {
                    "options": {
                        "max": 200,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    }
                },
                "Box Shadow":
                {
                    "options": {

                    }
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            }
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "_Basic": {
                            "DOM": EasyLibrary_ReadDOM("/DynamicPost/PostTemplate/Assets/js/component/html/sagevideo/sagevideo"),
                            "onload": function () {
                                component["sageVideo"].settingDOMs.tabs.Basic.onload();
                            }
                        }
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
                    },
                    "selectLayer": function ($elem) {
                        return $activeDOM;
                    },
                },
                "Alignment": {
                    "options": {
                        "horizontal": ["left", "center", "right"],
                    },
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            }
        }
    },
    "sageUrl": {
        componentname: 'sageUrl',
        category: "basic",
        icon: "fa fa-chain",
        row: false,
        hidden: true,
        defaultdata: '',
        valuekey: null,
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary_ReadDOM("/DynamicPost/PostTemplate/Assets/js/component/html/sageurl/sageurl"),
                    "onload": function () {
                        let $slcLinkOn = $('#slcLinkOn');
                        let $txtStng = $('.txtStng');
                        let $iconStng = $('.iconStng');
                        let $linkTextInputWrap = $('#linkTextInputWrap');
                        let $linkTextInput = $linkTextInputWrap.find('input');
                        let $openInnewTab = $('#openInnewTab');
                        let $anchor = $activeDOM.find('.dyncmpfldval');


                        $openInnewTab.prop('checked', function () {
                            switch ($anchor.attr('target')) {
                                case '_blank':
                                    return true;
                                case undefined:
                                case '_self':
                                    return false;
                            }
                        });
                        $linkTextInput.off('keyup').on('keyup', function () {
                            let inputVal = $(this).val();
                            $anchor.text(function () {
                                return inputVal === "" ? $anchor.attr('href') : inputVal;
                            });
                        });
                        $openInnewTab.off('click').on('click', function () {
                            $anchor.attr('target', $(this).prop('checked') ? '_blank' : '_self');
                        });

                        $('#textStngDOM').AdvanceTextSetting({
                            targetParent: $activeDOM,
                            targetElem: $anchor,
                            fontWidthTarget: $activeDOM
                        });

                        $('#hideEmpty').HideIfEmpty();

                        $slcLinkOn.off().on('change', function () {
                            switch ($(this).val()) {
                                case 'link_txt':
                                    $txtStng.show();
                                    $iconStng.hide();
                                    let text = $anchor.text();
                                    text = $anchor.text() == '' ? $activeDOM.attr('data-default-value') : $anchor.text();
                                    $anchor.html(text);
                                    $linkTextInput.val(text);
                                    break;
                                case 'link_ico':
                                    $iconStng.show();
                                    $txtStng.hide();
                                    let $iconList = $('#iconList');
                                    $iconList.html(EasyLibrary.FontCollectionList());
                                    let $iconStngDOM = $('#iconStngDOM');
                                    $iconStngDOM.AdvanceTextSetting({
                                        targetParent: $activeDOM,
                                        targetElem: $anchor,
                                        options: {
                                            size: true,
                                            width: false,
                                            spacing: false,
                                            transform: false,
                                            family: false,
                                            weight: false,
                                            color: true,
                                            lineheight: false
                                        }
                                    });
                                    $iconStngDOM.find('.ui-slider-handle').attr('title', 'Icon Size');
                                    $iconStngDOM.find('.textSet_color').children('label').text('Icon Color');
                                    //search font icon
                                    $('#iconSearch').off().on('keyup', function () {
                                        let searchVal = $(this).val();
                                        $iconList.find('li').each(function () {
                                            let $this = $(this);
                                            let dataClass = $this.find('i').attr('data-class');
                                            let pos = dataClass.indexOf(searchVal);
                                            if (pos < 0) {
                                                $this.addClass('Dn');
                                            } else {
                                                $this.removeClass('Dn');
                                            }
                                        });
                                    });

                                    let PatStng = 'fa-[a-z-]*';

                                    //select icon
                                    $iconList.children('li').off('click').on('click', function () {
                                        $iconList.find('.selected').removeClass();
                                        let $selected = $(this);
                                        let $i = $anchor.find('i');
                                        RemoveClassByPattern($i, PatStng);
                                        $i.addClass($selected.children('i').attr('class').match(new RegExp('\\b' + PatStng))[0]);
                                        $selected.addClass('selected');
                                    });
                                    
                                    $linkTextInputWrap.hide();

                                    //load selected icon
                                    if ($anchor.find('i.fa').length > 0) {
                                        $iconList.find('.' + $anchor.find('i').attr('class').match(new RegExp('\\b' + PatStng))[0]).parent().addClass('selected');
                                    }
                                    else {
                                        $anchor.empty().html(`<i class="fa ${$iconList.find('li').first().children().attr('class').match(new RegExp('\\b' + PatStng))[0]}"></i>`);
                                        $iconList.find('li').first().addClass('selected');
                                    }
                                    break;
                            }
                        });
                        //load link type
                        let isIconMode = $anchor.find('i.fa').length > 0;
                        $slcLinkOn.val(isIconMode ? 'link_ico' : 'link_txt');
                        $slcLinkOn.trigger('change');
                    },
                    "active": function () {

                    }
                },
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 80,
                            "min": -80,
                            "times": 5,
                            "position": ["top", "bottom"]
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
                },
                "Hover Effect": {
                    "options": {
                        "color": ["background", "text"]
                    },
                    "selectLayer": function ($elem) {
                        return $activeDOM;
                    }
                },
                "Scroll Effect": {
                    "options": []
                }
            },
            "selectLayer": function ($elem) {
                var $parent = $elem.closest('.editor-component');
                return $parent;
            }
        },
        "styleDOMs": {
            "tabs": {
                "Background":
                {
                    "options": ["image", "color"]
                },
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    }
                },
                "Box Radius":
                {
                    "options": {
                        "max": 50,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    }
                },
                "Box Shadow":
                {
                    "options": {

                    }
                }
            },
            "selectLayer": function ($elem) {
                return $elem.closest('.editor-component');
            }
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "fontsize": {
                            "selectLayer": function () {
                                return $activeDOM.find('.anchorWrapper > a');
                            }
                        },
                        "lineheight": {
                            "selectLayer": function () {
                                return $activeDOM.find('.anchorWrapper > a');
                            }
                        },
                        "width": {
                            "selectLayer": function () {
                                return $activeDOM;
                            }
                        },
                        "visibility": {}
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
                    }
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            }
        }
    }
};