var milestone = {
    "milestone": {
        "componentname": "milestone",
        "category": "advance",
        "icon": "fa fa-500px",
        "row": false,
        "hidden": false,
        "bucket": true,
        "collection": false,
        "type": "countdown",
        "defaultdata": EasyLibrary.ReadDOM('milestone/milestoneview'),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) { },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if ($(document).find('#hdnMilestoneSettingAttr').length <= 0)
                $('body').append('<div data-attribute="" style="display: none;" id="hdnMilestoneSettingAttr"></div>');
            if (!dropped)
                $('.mileStone-wrap').attr('data-animate', 0);
            component['milestone'].common.animateMilestone();
        },
        "onsort": function (ui) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM('milestone/milestoneComp') + `<div id="MileItemsperow"></div><h4 style="font-size: 12px;">Gutter Spacing</h4><div id="gutterDOM"></div><div id="AlignDOM"></div>`,
                    "onload": function ($item) {
                        let $eachMilestone = $activeDOM.find('.milestone-item');
                        let $counters = $eachMilestone.find('.milestone-counter');
                        let $icons = $eachMilestone.find('.milestone-icon');
                        let $title = $eachMilestone.find('.milestone-title');
                        let $checkCounter = $('#ShowCounter');
                        let $checkTitle = $('#ShowTitle');
                        let $checkIcon = $('#ShowIcon');
                        let dAlpha = ViewDeviceAlpha();
                        let visible = dAlpha + 'Dn';
                        $checkCounter.prop('checked', !$counters.hasClass(visible));
                        $checkTitle.prop('checked', !$title.hasClass(visible));
                        $checkIcon.prop('checked', !$icons.hasClass(visible));

                        toggleVisibility($checkCounter, $counters, 'counter');
                        toggleVisibility($checkTitle, $title, 'title');
                        toggleVisibility($checkIcon, $icons, 'icon');

                        function toggleVisibility($checkbox, $target, _dataItem) {

                            $checkbox.off().on('change', function () {
                                let $this = $(this);
                                if ($this.prop('checked')) {
                                    $target.removeClass(visible);
                                }
                                else
                                    $target.addClass(visible);
                                dropdownEvent($target, _dataItem);
                            });
                        }

                        dropdownEvent($icons, 'icon');
                        dropdownEvent($title, 'title');
                        function dropdownEvent(_item, _itemName) {
                            if ($(_item[0]).hasClass('Dn'))
                                $(`option[data-item="${_itemName}"]`).addClass('Dn');
                            else $(`option[data-item="${_itemName}"]`).removeClass('Dn');
                        }
                        component['milestone'].editLib.perRowAndGutter('#MileItemsperow', '#gutterDOM', $activeDOM.find('.milestone-item'));

                    }
                },
                "Data": {
                    "DOM": EasyLibrary.ReadDOM('milestone/milestoneDatasetting'),
                    "onload": function ($item) {
                        var attr = $('#hdnMilestoneSettingAttr').data('attribute');
                        if (attr != '') {
                            $('#popupModel').attrs(attr);
                            $('#hdnMilestoneSettingAttr').data('attribute', '');
                        }

                        var MileStoneBasic = {
                            IconClassReg: /fa-\w+(\-*\w*)*/g,
                            Position: 0,
                            Container: $activeDOM,
                            init: function () {

                                let $MileStoneItem = MileStoneBasic.Container.find('.milestone-item');
                                var html = '';
                                var mLength = $MileStoneItem.length;
                                $MileStoneItem.each(function () {
                                    let $This = $(this);
                                    let $Mcount = $This.find('.milestone-counter h1').text();
                                    let $MTitle = $This.find('.milestone-title h1').text();
                                    let $MIcon = $This.find('.milestone-icon .mile-icon i').attr('class').match(MileStoneBasic.IconClassReg);
                                    html += '<div class="field-row data-row">';
                                    html += '<div class="item field-row stElWrap cPointer col100">';
                                    html += '<span class="sfCol_6 TxAl-l"><i class="fa fa-arrows-v sortHandle"></i></span>';
                                    html += '<span class="sfCol_2"></span>';
                                    html += '<span class=" sfCol_10 TxAl-c">';
                                    html += '<i class="iconChooser in-form-icon fa ' + $MIcon + '"></i>';
                                    html += '</span>';
                                    html += '<span class="sfCol_40  cb_input">';
                                    html += '<input type="text" class="title mileStoneInput" placeholder="Title" value="' + $MTitle + '" >';
                                    html += '</span>';
                                    html += '<span class="sfCol_2"></span>';
                                    html += '<span class="sfCol_30  cb_input">';
                                    html += '<input class="xsml-box counter mileStoneInput"  type="text" value="' + $Mcount + '">';
                                    html += '</span>';
                                    if (mLength > 1)
                                        html += '<span class=" sfCol_10 TxAl-r">';
                                    html += '<i title="Delete" class="deleteMilestone fa fa-trash in-form-icon delete-icon"></i>';
                                    html += '</span></div></div>';

                                });
                                $('.mileStoneForm').html(html);

                                if ($('.mileStoneForm').children().length < 2)
                                    $('.deleteMilestone').hide();

                                MileStoneBasic.UIEvents();
                            },
                            UIEvents: function () {
                                var firstItem = MileStoneBasic.Container.find('.milestone-icon').first();
                                if (firstItem.css('display') != 'none')
                                    $('#chkIsActiveMileIcon').prop('checked', true);
                                $('#chkIsActiveMileIcon').off().on('click', function () {
                                    var IconWrap = MileStoneBasic.Container.find('.milestone-icon');
                                    if ($(this).is(':checked')) {
                                        IconWrap.show();
                                    } else {
                                        IconWrap.hide();
                                    }
                                });

                                $('.addMoreMilestone').off().on('click', function () {
                                    let $MItem = MileStoneBasic.Container.find('.milestone-item').last();
                                    var NewDom = document.createElement("div");
                                    $(NewDom).attrs($MItem.attrs());
                                    $(NewDom).html($MItem.html());
                                    let $MContainer = MileStoneBasic.Container.find('.mileStone-wrap');
                                    $MContainer.prepend(NewDom);

                                    $('#hdnMilestoneSettingAttr').data('attribute', $('#popupModel').attrs());
                                    SettingEvents($activeDOM);
                                    component['milestone'].editLib.reloadAllSettingTabs('settingDOMs');
                                    //MileStoneBasic.SettingButton.trigger('click');
                                });

                                $('.deleteMilestone').off().on('click', function () {
                                    $this = $(this);
                                    SageConfirmDialog('Are you sure?').done(function () {
                                        let $pos = $('.mileStoneForm .item').index($this.parents('.item'));
                                        MileStoneBasic.Container.find('.milestone-item').eq($pos).remove();
                                        MileStoneBasic.init();
                                    });
                                });
                                $('.mileStoneInput').off().on('keyup', function () {
                                    let $this = $(this);
                                    let $Val = $this.val();
                                    let $pos = $('.mileStoneForm .item').index($this.parents('.item'));
                                    var mileStoneItem = MileStoneBasic.Container.find('.milestone-item').eq($pos);
                                    if ($this.hasClass('title')) {
                                        mileStoneItem.find('.milestone-title h1').text($Val);
                                    } else {
                                        if ($Val == '')
                                            $Val = 0;
                                        if (parseInt($Val) >= 0)
                                            mileStoneItem.find('.milestone-counter h1').text($Val);
                                    }
                                });

                                $('#MilestonefontIconCollection').html($('ul#fontIconCollection').html());

                                $('.iconChooser').off('click').on('click', function () {
                                    let $this = $(this);
                                    $this.parent().parent().parent().next($('.milestoneIconList'));
                                    MileStoneBasic.Position = $('.mileStoneForm .item').index($this.parents('.item'));
                                    //$('.milestoneIconList').removeClass('hide-element');
                                    $('.milestoneIconList').insertAfter($this.parents('.data-row'));
                                    $('.milestoneIconList').show();

                                    $('#MilestonefontIconCollection').find('li').removeClass('selected');
                                    var CurrentClass = $this.attr('class').match(MileStoneBasic.IconClassReg)[0];
                                    $('#MilestonefontIconCollection').find('li i[data-class="' + CurrentClass + '"]').parent().addClass('selected');

                                });
                                $('.closeIconChooser').off().on('click', function () {
                                    $('.milestoneIconList').hide();
                                    $('.mileStoneForm').parent().append($('.milestoneIconList'));
                                });
                                $('#MilestoneSearchIcon').on('keyup', function () {
                                    var searchVal = $(this).val();
                                    $('#MilestonefontIconCollection').find('li').each(function () {
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
                                $('#MilestonefontIconCollection').find('li').on('click', function () {

                                    var chooseClass = $(this).find('i').attr('data-class');
                                    $('#MilestonefontIconCollection').find('li').removeClass('selected');
                                    $('#MilestonefontIconCollection').find('li i[data-class="' + chooseClass + '"]').parent().addClass('selected');
                                    let $FormIcon = $('.mileStoneForm .item').eq(MileStoneBasic.Position).find('.iconChooser ');
                                    var PrevClass = $FormIcon.attr('class').match(MileStoneBasic.IconClassReg)[0];
                                    //console.log(PrevClass);
                                    $FormIcon.removeClass(PrevClass);
                                    $FormIcon.addClass(chooseClass);
                                    $ViewIcon = MileStoneBasic.Container.find('.milestone-item').eq(MileStoneBasic.Position).find('.mile-icon i');
                                    $ViewIcon.removeClass(PrevClass);
                                    $ViewIcon.addClass(chooseClass);
                                    $(".closeIconChooser").trigger("click");
                                });
                            },
                        };
                        $('.mileStoneForm').parent().append($('.milestoneIconList'));
                        MileStoneBasic.init();

                        $(".mileStoneForm").AdvanceSorting({
                            targetParent: $('.mileStone-wrap'),
                            targetElem: ".milestone-item",
                            sortableOptions: {
                                items: "div.data-row",
                                handle: ".sortHandle",
                                containment: "div.mileStoneForm",
                                start: function (event, ui) {
                                    $('.closeIconChooser').trigger('click');
                                }
                            }
                        });
                    }
                },
                "Spacing": {
                    "DOM": EasyLibrary.ReadDOM('milestone/spacing', false),
                    "custom": true,
                    "onload": function ($item) {
                        component['milestone'].common.spacing();
                    }
                },
                "Text": {
                    "DOM": EasyLibrary.ReadDOM('milestone/textSetting', false),
                    "custom": true,
                    "onload": function () {
                        component['milestone'].common.textSetting();
                    }
                },
                "Alignment": {
                    "DOM": EasyLibrary.ReadDOM('milestone/alignment', false),
                    "custom": true,
                    "onload": function () {
                        component['milestone'].common.alignment();
                    }
                }

            }

        },
        "styleDOMs": {
            "tabs": {
                "Background": {
                    "DOM": EasyLibrary.ReadDOM('milestone/background', false),
                    "custom": true,
                    "onload": function ($item) {
                        let val = $('#slcMilestoneBgColor').val();
                        dropdownEvent($activeDOM.find('.milestone-icon'), 'icon');
                        dropdownEvent($activeDOM.find('.milestone-title'), 'title');
                        function dropdownEvent(_item, _itemName) {
                            if ($(_item[0]).hasClass('Dn'))
                                $(`option[data-item="${_itemName}"]`).addClass('Dn');
                            else $(`option[data-item="${_itemName}"]`).removeClass('Dn');
                        }
                        backgroundColor();
                        $('#slcMilestoneBgColor').off().on('change', function () {
                            val = $(this).val();
                            $activeDOM.find('.actEle').removeClass('actEle').end().find(val).addClass('actEle');
                            backgroundColor();
                        });
                        function backgroundColor() {
                            $("#milestoneBackground").html('');
                            $("#milestoneBackground").AdvanceBackground({
                                targetParent: $activeDOM.parent(),
                                targetElem: val,
                                options: ["color"]
                            });
                        }
                    }
                },

                "Border": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('milestone/border', false),
                    "onload": function ($item) {
                        let val = $('#slcMilestoneBorder').val();
                        milestoneBorder();
                        $('#slcMilestoneBorder').off().on('change', function () {
                            val = $(this).val();
                            $activeDOM.find('.actEle').removeClass('actEle').end().find(val).addClass('actEle');
                            milestoneBorder();
                        });
                        function milestoneBorder() {
                            $("#milestoneBorder").html('');
                            $("#milestoneBorder").AdvanceBorder({
                                targetParent: $activeDOM.parent(),
                                targetElem: val,
                                options: {
                                    "max": 20,
                                    "min": 0,
                                    "times": 1,
                                    "position": ["all", "top", "right", "bottom", "left"],
                                }
                            });
                        }
                    }
                },

                "Border Radius": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('milestone/borderradius',false),
                    "onload": function ($item) {
                        let val = $('#slcMilestoneBdrRadius').val();
                        milestoneBdrRadius();
                        $('#slcMilestoneBdrRadius').off().on('change', function () {
                            val = $(this).val();
                            $activeDOM.find('.actEle').removeClass('actEle').end().find(val).addClass('actEle');
                            milestoneBdrRadius();
                        });
                        function milestoneBdrRadius() {
                            $("#milestoneBdrRadius").html('');
                            $("#milestoneBdrRadius").AdvanceBoxRadius({
                                targetParent: $activeDOM.parent(),
                                targetElem: val,
                                options: {
                                    "max": 50,
                                    "min": 0,
                                    "times": 1,
                                    "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"],
                                }
                            });
                        }
                    }
                },

                "Box Shadow": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('milestone/shadow', false),
                    "onload": function ($item) {
                        let val = $('#slcMilestoneShadow').val();
                        milestoneShadow();
                        $('#slcMilestoneShadow').off().on('change', function () {
                            val = $(this).val();
                            $activeDOM.find('.actEle').removeClass('actEle').end().find(val).addClass('actEle');
                            milestoneShadow();
                        });
                        function milestoneShadow() {
                            $("#milestoneBdrShadow").html('');
                            $("#milestoneBdrShadow").AdvanceBoxShadow({
                                targetParent: $activeDOM.parent(),
                                targetElem: val,
                            });
                        }
                    }
                }
            }
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "Visibility": {},
                        "PerRow": {
                            "cusotom": true,
                            "DOM": `<div id="Resp"></div><div id="AlignDOMResp"></div>`,
                            "prepend": true,
                            "onload": function ($item) {
                                $('#Resp').append(component['milestone'].settingDOMs.tabs.Basic.DOM);
                                component['milestone'].settingDOMs.tabs.Basic.onload();
                            }
                        }
                    }
                },
                "Spacing": {
                    "DOM": EasyLibrary.ReadDOM('milestone/spacing', false),
                    "custom": true,
                    "onload": function ($item) {
                        component['milestone'].common.spacing();
                    }
                },
                "Text": {
                    "DOM": EasyLibrary.ReadDOM('milestone/textSetting', false),
                    "custom": true,
                    "onload": function () {
                        component['milestone'].common.textSetting();
                    }
                },
                "Alignment": {
                    "DOM": EasyLibrary.ReadDOM('milestone/alignment', false),
                    "custom": true,
                    "onload": function () {
                        component['milestone'].common.alignment();
                    }
                }

            }
        },
        'editLib': {
            "perRowAndGutter": function (perRowDOM, gutterDOM, targetEle) {
                $(perRowDOM).AdvanceItemsPerRow({
                    targetParent: $activeDOM,
                    targetElem: targetEle,
                    label: 'Items per row',
                    callback: function (itemperrow) {
                        callGutter(itemperrow);
                    }
                });

                let itemperrow = $(perRowDOM).find('select option:selected').text();
                callGutter(itemperrow);
                function callGutter(itemperrow) {
                    $(gutterDOM).AdvanceGutterSpace({
                        targetParent: $activeDOM,
                        targetElem: targetEle,
                        itemsperrow: itemperrow,
                    });
                    if (itemperrow < 2) {
                        $(gutterDOM).children('div').first().hide();
                    }
                }

            },
            "reloadAllSettingTabs": function (setOrStyleDOM, excludeThis) {
                let componentName = 'milestone';
                if (componentName == undefined || componentName == '') {
                    this.getSetDataType.setType($activeDOM);
                    componentName = this.getSetDataType.getType();
                }
                let tabArray = Object.keys(component[componentName][setOrStyleDOM].tabs);
                if (excludeThis) {
                    $.each(excludeThis, function (i, val) {
                        tabArray.splice(tabArray.indexOf(val), 1);
                    });
                }

                tabArray.forEach(function (val) {
                    component[componentName][setOrStyleDOM].tabs[val].onload();
                });

            },
            "allWrapperSize": function () {
                let $parent = $activeDOM.find('.fonticon');
                function LineHeightChange(space) {
                    ReplaceClassByPattern($parent, 'H-[0-9]{1,4}', 'H-' + space);
                    ReplaceClassByPattern($parent, 'W-[0-9]{1,4}', 'W-' + space);
                }
                AdvanceSageSlider($('#mileIconSizeSlider'), $('#mileIconSizeHandle'), 5, 1080, GetValueByClassName($parent, 'H-[0-9]{1,4}', 'H-'), LineHeightChange, $parent, 'px');
            }
        },
        "common": {
            "animateMilestone": function () {
                $(window).scroll(function () {
                    initAnimation();
                });
                var winHeight = $(window).height() - 80;

                function IsInVisibleSection($Component) {
                    var winScroll = $(window).scrollTop();
                    var diff = $Component.offset().top - winScroll;
                    if (0 <= diff && diff < winHeight)
                        return true;
                    else
                        return false;
                }
                initAnimation();
                function initAnimation() {
                    $('.mileStone-wrap').each(function () {
                        if (IsInVisibleSection($(this)) && $(this).attr('data-animate') == 0) {
                            $(this).attr('data-animate', 1);
                            $(this).find('.milestone-counter h1').each(function () {
                                let $mileValue = $(this);
                                let valString = $mileValue.text();
                                let num = valString.match(/[\d]+/);
                                num = parseInt(num[0]);
                                $(this).prop('Counters', 0).animate({
                                    Counters: num
                                }, {
                                        duration: 4000,
                                        easing: 'swing',
                                        step: function (now) {
                                            $(this).text(Math.ceil(now));
                                        },
                                        progress: function (animation, progress, msRemaining) {
                                            let reg = RegExp('\\+', 'gi');
                                            if (reg.test(valString))
                                                $mileValue.append('+');
                                        }
                                    });
                            });
                        }
                    });
                }
            },
            "textSetting": function () {
                let val = $('#milestoneTxtSett').val();
                advanceText();
                $('#milestoneTxtSett').off().on('change', function () {
                    val = $(this).val();
                    $activeDOM.find('.actEle').removeClass('actEle').end().find(val).addClass('actEle');
                    advanceText();
                });
                function advanceText() {
                    $("#milestoneTxtSetting,#milestoneSize").html('');
                    if (val === '.fonticon') {
                        val = '.font-icon';
                        let options = {
                            size: true,
                            lineheight: false,
                            width: false,
                            spacing: false,
                            transform: false,
                            family: false,
                            weight: false,
                            color: true,
                            style: false,
                            heading: false
                        };
                        $('#milestoneWrapSize').removeClass('Dn');
                        text(options, true);
                    }
                    else {
                        $('#milestoneWrapSize').removeClass('Dn').addClass('Dn').find('.manualSize').remove();
                        text();
                    }

                }
                function text(options) {
                    $("#milestoneTxtSetting").AdvanceTextSetting({
                        targetParent: $activeDOM,
                        targetElem: val,
                        options: options
                    });
                    if (options !== undefined) {
                        component['milestone'].editLib.allWrapperSize();
                    }
                    //$("#milestoneSize").AdvanceDimension({
                    //    type: 'sfwidth',
                    //    targetParent: $activeDOM,
                    //    targetElem: ".fonticon",
                    //    label: 'Width',
                    //});
                }
            },
            "spacing": function () {
                let val = $('#slcMilestoneSpacing').val();
                spacing();
                $('#slcMilestoneSpacing').off().on('change', function () {
                    val = $(this).val();
                    $activeDOM.find('.actEle').removeClass('actEle').end().find(val).addClass('actEle');
                    spacing();
                });
                function spacing() {
                    $("#milestoneMSpacing,#milestonePSpacing").html('');
                    $("#milestoneMSpacing").AdvanceSpacing({
                        targetParent: $activeDOM.parent(),
                        targetElem: val,
                        options: {
                            "margin": {
                                "max": 40,
                                "min": -40,
                                "times": 5,
                                "position": ["all", "top", "bottom", "left", "right"]
                            },
                        },
                    });
                    $("#milestonePSpacing").AdvanceSpacing({
                        targetParent: $activeDOM.parent(),
                        targetElem: val,
                        options: {
                            "padding": {
                                "max": 40,
                                "min": 0,
                                "times": 5,
                                "position": ["all", "top", "bottom", "left", "right"]
                            }
                        },
                    });
                }
            },
            "alignment": function () {
                let val = $('#slcMilestoneAlign').val();
                alignment();
                $('#slcMilestoneAlign').off().on('change', function () {
                    val = $(this).val();
                    $activeDOM.find('.actEle').removeClass('actEle').end().find(val).addClass('actEle');
                    alignment();
                });
                function alignment() {
                    $("#milestoneAlignment").html('');
                    $("#milestoneAlignment").AdvanceAlignment({
                        targetParent: $activeDOM.parent(),
                        targetElem: val
                    });
                }
            }
        },
        "remove": function () {
        },
        "view": {
            "view": function () {
                this.library.initAnimatCounter();
            },
            "library": {
                "initAnimatCounter": function () {
                    $('.mileStone-wrap').attr('data-animate', 0);
                    component['milestone'].common.animateMilestone();
                }
            }
        }
    }
};