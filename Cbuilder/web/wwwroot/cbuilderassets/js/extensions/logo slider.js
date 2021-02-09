var logo_slider = {
    "logo slider": {
        "componentname": "logo slider",
        "category": "advance",
        "icon": "fa fa-image",
        "row": false,
        "hidden": false,
        "type": "carousel",
        "bucket": true,
        "defaultdata": EasyLibrary.ReadDOM("logoslider/logoslider"),
        "onDrop": function ($appendLayer) { },

        "onsort": function (ui) {
            var sliderContainer = ui.find('.LogoSliderWrapper');
            sliderContainer.removeClass('binded');
            var carousel = new CarouselInit(sliderContainer);
        },

        "loadSetting": function ($item) { },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            $appendLayer.find('div.logoslider').attr('data-id', 'sl_' + Math.floor((Math.random() * 1000) + 100));
            var sliderContainer = $appendLayer.find('.LogoSliderWrapper');
            if (dropped) {
                var sliderLib = this.view.library;
                sliderLib.ReAssignViewItems(sliderContainer);
                this.common.InitalizeEvents(sliderContainer, sliderContainer.attr('data-type'));
                sliderContainer.removeClass('binded');
                var carousel = new CarouselInit(sliderContainer);
                this.view.library.SetCustomEvents();
                SettingEvents();
            }
            else {
                this.resize();
            }

        },
        "settingDOMs": {
            "tabs": {
                "Basic":
                {
                    "DOM": EasyLibrary.ReadDOM("logoslider/logosliderbasic"),
                    "onload": function ($item) {
                        var $parent = $item.closest('.SetHdlr').parent();
                        var sliderContainer = $parent.find('.LogoSliderWrapper');
                        var sliderHeading = $parent.find('.sliderHeading');
                        var navigationArrows = $parent.find('.arrows-wrapper');

                        var pagerDot = $parent.find('.pager-dot');

                        LoadSettings();
                        TriggerEvents();

                        function LoadSettings() {

                            var perView = DeviceItemPerView(sliderContainer.attr('data-itemsperview'));
                            if (!perView) perView = "3";

                            if ($parent.hasClass('fullpagebanner')) {
                                $('#heightAdjustCarousel').prop('checked', true);
                            } else {
                                $('#heightAdjustCarousel').prop('checked', false);
                            }

                            $('#slcSliderItemsPerView').val(perView);
                            $('#slcSliderAnimation').val(sliderContainer.parent().attr('data-transition'));

                            var loop = sliderContainer.parent().attr('data-loop');
                            if (typeof loop !== "undefined" && loop.length > 0)
                                $('#sliderAutoSlide').prop('checked', true);


                            SetToggleValueBasedOnHideElement(sliderHeading, '#showSliderHeading');
                            SetToggleValueBasedOnHideElement(navigationArrows, '#showNavigationalArrows');
                            SetToggleValueBasedOnHideElement(pagerDot, '#showSliderDots');

                            //function ChangeCaroselHeight(space) {
                            //    $parent.children().eq(1).height(space);
                            //}

                            component["logo slider"].common.sliderHeight();
                            component["logo slider"].common.sliderImageHeight();

                            //function ChangeItemsHeight(space) {
                            //    var childItems = sliderContainer.find('.itemWrapper').children();
                            //    childItems.each(function (index) {
                            //        $(this).find('img').height(space);
                            //    });
                            //}


                            // var firstItemHeight = sliderContainer.find('.itemWrapper').children().first().height();
                            //AdvanceSageSlider($('#logoSliderHeightSlider'), $('#logoSliderHeightHandle'), 0, 1000, $parent.children().eq(1).height(), ChangeCaroselHeight, $parent, 'px');
                            // AdvanceSageSlider($('#logoSliderItemHeightSlider'), $('#logoSliderItemHeightHandle'), 0, 1000, firstItemHeight, ChangeItemsHeight, $parent, 'px');
                        }

                        function TriggerEvents() {
                            var gutterSpaceControl = $('#sliderHvrGutterSpace');

                            var horGutterSpace = sliderContainer.attr('data-horzspacing');

                            var currentMarginRight = 0;
                            if (!horGutterSpace) currentMarginRight = 0; else currentMarginRight = horGutterSpace;

                            var sliderLib = component["logo slider"]["view"]["library"];
                            var changeRightSpace = sliderLib.ChangeRightSpacing;

                            function ReDefineGutter(space, $par) {
                                changeRightSpace(space, $par, '.LogoSliderWrapper', '.itemWrapper');
                            }

                            AdvanceSageSlider($('#sliderHorGutterSpaceSlider'), $('#sliderHorGutterSpaceHandle'), gutterSpaceControl.data('slidemin'), gutterSpaceControl.data('slidemax'), currentMarginRight, ReDefineGutter, $parent, 'px');

                            function ReAssignLiItems(count, $par) {
                                sliderLib.ReAssignViewItems(sliderContainer, count);
                            }

                            var currentTotal = sliderContainer.find('.itemWrapper').children().length;

                            EasyLibrary.NumberCounter($('.manualNumCounter'), 1, 50, 1, currentTotal, $parent, ReAssignLiItems);


                            $('#sliderAutoSlide').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    sliderContainer.parent().attr('data-loop', "loop");
                                } else {
                                    sliderContainer.parent().attr('data-loop', "");
                                }
                                sliderContainer.removeClass('binded');
                                InitCarouselSlider(sliderContainer);
                            });


                            $('#heightAdjustCarousel').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    $parent.addClass('fullpagebanner');
                                    AdjustSizeFullpage($parent);
                                } else {
                                    RemoveCarouselHeight($parent);
                                    $parent.removeClass('fullpagebanner');
                                }
                            });

                            $('#slcSliderItemsPerView').off().on('change', function () {
                                var totalRequired = $('.totalNumCount').text();
                                sliderLib.ReAssignViewItems(sliderContainer, totalRequired);

                                SettingEvents();

                            });

                            $('#slcSliderAnimation').off().on('change', function () {

                                var transition = $(this).find('option:selected').text().toLowerCase();

                                sliderContainer.parent().attr('data-transition', transition);

                                sliderContainer.removeClass('binded');
                                InitCarouselSlider(sliderContainer);
                            });

                            SetEventToShowHideElement($item, $('#showSliderHeading'), sliderHeading);
                            SetEventToShowHideElement($item, $('#showNavigationalArrows'), navigationArrows);
                            SetEventToShowHideElement($item, $('#showSliderDots'), pagerDot);

                        }
                    }
                },
              
                "Spacing":
                    {
                        "options": {
                            "margin": {
                                "max": 80,
                                "min": -80,
                                "times": 5,
                                "position": ["all", "top", "left", "bottom", "right"]
                            },
                        }
                    },               

            },
            "selectLayer": function ($elem) {
                return $elem.closest('.SetHdlr').parent();

                //$(".editor-row").removeClass("activeSetting");
                //var $parent = $elem.parents(".editor-row");
                //$parent.addClass("activeSetting");
                //return $parent;
            },
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
                return $elem.closest('.SetHdlr').parent();
            }
        },

        //-------------------------------------------------
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "Slider Height": {
                            "DOM": CreateSliderDOM('logoSliderHeightSlider', 'logoSliderHeightHandle', 'Logo Slider Height'),
                            "prepend": "true",
                            "onload": function () {
                                component["logo slider"].common.sliderHeight();
                            }
                        },
                        "Image Height": {
                            "DOM": CreateSliderDOM('logoSliderItemHeightSlider', 'logoSliderItemHeightHandle', 'Logo Image Height'),
                            "prepend": "true",
                            "onload": function () {
                                component["logo slider"].common.sliderImageHeight();
                            }
                        },
                        "Visibility": {},
                        "Per slider": {
                            "DOM": "<div id='logoPerSlide'></div>",
                            "onload": function () {
                                let $slider = $activeDOM.find('.LogoSliderWrapper');
                                $('#logoPerSlide').AdvanceItemPerView({
                                    label: 'Items per view',
                                    min: 1,
                                    max: 5,
                                    value: DeviceItemPerView($slider.attr('data-itemsperview')),
                                    onChange: function (val) {
                                        $slider.attr('data-itemsperview', SetDeviceItemPerView($slider.attr('data-itemsperview'), val));
                                        let lib = component["logo slider"]["view"]["library"];
                                        lib.ReDrawSliderItems($slider, val, false);
                                        lib.UpdateWidthAttribute($slider, val);
                                        let dev = ViewDeviceAlpha();
                                        let $spaceAttr = 'data-' + dev + 'horzspacing';
                                        lib.ChangeRightSpacing($slider.attr($spaceAttr), $slider.parent(), '.LogoSliderWrapper', '.itemWrapper');
                                    }
                                });
                            }
                        },
                        "Gutter Spacing": {
                            custom: true,
                            DOM: `<div class="field-row">
                                    <h4 id="logoGutterSpaceWrap" data-times="5">Gutter Spacing</h4>
                                    <div class="field-row stElWrap col100" id="logoGutterSpace">
                                        <div class="range__slider fCol">
                                            <div id="logoGutterSpaceSlider">
                                                <div id="logoGutterSpaceHandle" class="ui-slider-handle" title="Horizontal">0</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`,
                            onload: function () {
                                let dev = ViewDeviceAlpha();
                                let sliderLib = component["logo slider"]["view"]["library"];
                                let changeRightSpace = sliderLib.ChangeRightSpacing;
                                let currentMarginRight = $activeDOM.find('.LogoSliderWrapper').attr('data-' + dev + 'horzspacing');

                                function ReDefineGutter(space, $par) {
                                    changeRightSpace(space, $par, '.LogoSliderWrapper', '.itemWrapper');
                                }

                                AdvanceSageSlider($('#logoGutterSpaceSlider'), $('#logoGutterSpaceHandle'), 0, 40, currentMarginRight, ReDefineGutter, $activeDOM, 'px');
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
                            "position": ["all", "left", "right"]
                        }
                    }
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            }
        },

        //---------------------------------------------

        resize: function () {
            this.view.view();
        },
        "view": {
            "view": function () {
                let dev = ViewDeviceAlpha();
                let $container = $('.LogoSliderWrapper');
                let self = this;
                let isView = (typeof SettingEvents === 'undefined');
                $container.each(function () {
                    var $this = $(this);
                    //$this.removeClass('binded');
                    //var carousel = new CarouselInit($this);
                    let perView = DeviceItemPerView($this.attr('data-itemsperview'));
                    self.library.ReDrawSliderItems($this, perView, isView);
                    self.library.UpdateWidthAttribute($this, perView);
                    let $spaceAttr = 'data-' + dev + 'horzspacing';
                    self.library.ChangeRightSpacing($this.attr($spaceAttr), $this.parent(), '.LogoSliderWrapper', '.itemWrapper');
                    //if (dev == 'm') {
                    //    self.library.ReDrawSliderItems($this, 1, isView);
                    //}
                    //else if (dev == 't') {
                    //    self.library.ReDrawSliderItems($this, 2, isView);
                    //} else {
                    //    self.library.ReDrawSliderItems($this, $this.attr('data-itemsperview'), isView);
                    //}
                });
            },

            "library": {

                "ReAssignViewItems": function ($container, $newtotalItems) {
                    var currentCount = 0;
                    var dataType = $container.attr('data-type');

                    var $totalItems = parseInt($container.attr('data-totalcount'));
                    var $perView = parseInt(DeviceItemPerView($container.attr('data-itemsperview')));

                    var liItem = $container.find('.itemWrapper'); // CHECK FOR EXISTING ITEMS

                    if (liItem.length <= 0) {
                        // IF FIRST TIME
                        var itemsWrapper = $container.find('.itemsWrapper');

                        var updatedDefaultData = this.FindReplaceDeleteHelper(component[dataType].defaultdata);
                        updatedDefaultData = this.DisableDragging(updatedDefaultData);
                        updatedDefaultData = this.EnableComponentSettings(updatedDefaultData);
                        var compHTML = '<div class="Ml-0 Mr-0 Mb-0 Mt-0 sfFixed Pt-0 Pr-0 Pb-0 Pl-0 tMl-0 tMr-0 tMb-0 tMt-0 mMl-0 mMr-0 mMb-0 mMt-0" style="display: flex !important; height: 100%; align-items: center; justify-content: center;"> ' + updatedDefaultData + '</div>';

                        this.UpdateWidthAttribute($container, $perView);

                        var itemsAdded = 0;
                        while (itemsAdded !== $totalItems) {
                            var itemHTML = '';
                            for (var i = 0; i < $perView; i++) {
                                itemHTML += compHTML;
                                itemsAdded++;
                            }
                            itemsWrapper.append('<li class="itemWrapper" style="display: inline-flex; height: 100%; background-repeat: no-repeat; background-size: cover; position: relative; justify-content: center; align-items: center;">' + itemHTML + '</li>');
                        }

                        var space = $container.attr('data-horzspacing');
                        if (!space) space = 0;
                        this.ChangeRightSpacing(space, $container.parent(), '.LogoSliderWrapper', '.itemWrapper');
                        this.SetCustomEvents();

                    } else {

                        var newPerView = $('#slcSliderItemsPerView').find("option:selected").text();
                        var itemsPerView = parseInt(newPerView);

                        //var liChildren = liItem.children();

                        if (itemsPerView !== $perView) { // [ ITEMS PER VIEW CHANGE ]
                            this.ReDrawSliderItems($container, itemsPerView, false);
                        }
                        else {
                            var liChildren = liItem.children();
                            var currentItemsCount = liChildren.length;

                            var totalItems = parseInt($newtotalItems);

                            var addComponent = true;
                            var itemDiff = Math.abs(currentItemsCount - totalItems);
                            if (totalItems < currentItemsCount) addComponent = false;

                            if (!addComponent) { // REMOVE COMPONENT

                                SageConfirmDialog(' Taking this step will result in some data loss. Do you wish to continue ?').done(function () {

                                    var lastli = liItem.last(); // liItem.eq(liItem.length - 1);
                                    lastli.children().last().remove();

                                    if (lastli.children().length <= 0) {
                                        liItem.last().remove();
                                        $container.removeClass('binded');
                                        InitCarouselSlider($container);
                                    }

                                }).fail(function () {
                                    $('#numCounterTotal').html($container.find('.itemWrapper').children().length);
                                });

                            }
                            else {  // ADD COMPONENT
                                var itemCopy = liChildren.eq(0).clone(true);
                                var lastliItem = liItem.last();
                                if (lastliItem.children().length < $perView) { // LESS THAN REQUIRED
                                    lastliItem.append(itemCopy);
                                    component["logo slider"]["common"].InitalizeEvents(itemCopy, $container.attr('data-type'));
                                } else {
                                    // [ ADD NEW LI ITEM ( REQUIRES RE-INIT ) ]
                                    $container.find('.itemsWrapper').append('<li class="itemWrapper" style="display: inline-block; height: 100%; background-repeat: no-repeat; background-size: cover; position: relative;"></li>');
                                    $container.find('.itemWrapper').last().append(itemCopy);
                                    $container.removeClass('binded');
                                    InitCarouselSlider($container);
                                    component["logo slider"]["common"].InitalizeEvents(itemCopy, $container.attr('data-type'));
                                }
                            }
                        }

                        //$container.attr('data-itemsperview', newPerView);
                        $container.attr('data-itemsperview', SetDeviceItemPerView($container.attr('data-itemsperview'), newPerView));

                        this.UpdateWidthAttribute($container, itemsPerView);

                        var horizonalGutterSpace = $('#sliderHorGutterSpaceHandle').text();
                        this.ChangeRightSpacing(horizonalGutterSpace, $container.parent(), '.LogoSliderWrapper', '.itemWrapper');

                    }
                },

                "ReDrawSliderItems": function ($container, itemsPerView, isView) {

                    var liItem = $container.find('.itemWrapper'); // CHECK FOR EXISTING ITEMS

                    var liChildren = liItem.children();

                    var liChildrenhtmlArray = [];
                    liChildren.each(function () {
                        liChildrenhtmlArray.push($(this)[0].outerHTML);
                    });

                    var itemsWrapper = $container.find('.itemsWrapper');
                    itemsWrapper.empty();

                    var childCount = liChildrenhtmlArray.length;

                    var itemsAdded = 0;

                    while (itemsAdded < childCount) {
                        var itemHTML = '';
                        for (var i = 0; i < itemsPerView; i++) {

                            if (liChildrenhtmlArray.length === itemsAdded) break;
                            itemHTML += liChildrenhtmlArray[itemsAdded];
                            itemsAdded++;
                        }
                        itemsWrapper.append('<li class="itemWrapper" style="display: inline-block; height: 100%; background-repeat: no-repeat; background-size: cover; position: relative;">' + itemHTML + '</li>');
                    }

                    $container.removeClass('binded');
                    InitCarouselSlider($container);

                    if (typeof isView !== "undefined" && !isView) {
                        SettingEvents();
                        GetLibrary("logo slider").SetCustomEvents();
                    }
                },

                "FindReplaceDeleteHelper": function (editorComponentContainer) {

                    //var newHTML = $(editorComponentContainer)
                    //    .find('div').eq(1)
                    //    .find('.deletehelper').eq(0)
                    //    .removeClass('deletehelper')
                    //    .addClass('deleteSliderItem sfError')
                    //    .parents('.editor-component').eq(0)[0].outerHTML;
                    var newHTML = $(editorComponentContainer).attr('data-type', 'Image Link').find("li.copyData").remove().end().find(".deletehelper").removeClass('deletehelper').addClass("deleteSliderItem").end().addClass('H-200 tH-100 mH-100');
                    return newHTML[0].outerHTML;
                },

                "DisableDragging": function (editorComponentContainer) {
                    //var newHTML = $(editorComponentContainer)
                    //  .find('div').eq(0)
                    //  .find('.icon-icon-drag').eq(0)
                    //  .removeClass('icon-icon-drag')
                    //  .removeClass('sortComponent')

                    //  .parents('.editor-component').eq(0)[0].outerHTML;
                    var newHTML = $(editorComponentContainer).find("span.sortComponent").remove().end().find(".SetHdlr").addClass("no-drag").end();
                    return newHTML[0].outerHTML;
                },

                "SetCustomEvents": function () {

                    var redrawItem = this.ReDrawSliderItems;
                    $('.deleteSliderItem').off().on('click', function () {

                        var itemToDelete = $(this).closest('.SetHdlr').parent().parent();
                        var $container = itemToDelete.parents('.LogoSliderWrapper');

                        var perView = DeviceItemPerView($container.attr('data-itemsperview'));
                        if (!perView) perView = "3";

                        var itemsPerView = parseInt(perView);

                        var liItem = $container.find('.itemWrapper'); // CHECK FOR EXISTING ITEMS
                        var liChildren = liItem.children();
                        var siblingsCount = liChildren.length;


                        if (siblingsCount > 1) {

                            SageConfirmDialog(' Do you want to delete this item ?').done(function () {
                                itemToDelete.remove();
                                $('#numCounterTotal').text(siblingsCount - 1);

                                redrawItem($container, itemsPerView, false);
                                // RE INIT ITEMS
                            });
                        } else {
                            SageAlertDialog("Atleast one item is required", 'Alert');
                        }

                    });

                },

                "EnableComponentSettings": function (editorComponentContainer) {
                    var newHTML = $(editorComponentContainer).addClass('options-display-inside')[0].outerHTML;
                    return newHTML;
                },

                "UpdateWidthAttribute": function ($sliderContainer, newColCount) {
                    newColCount = parseInt(newColCount);
                    var widthPercentage = "";
                    switch (newColCount) {
                        case 2: widthPercentage = "50%"; break;
                        case 3: widthPercentage = "33%"; break;
                        case 4: widthPercentage = "25%"; break;
                        case 5: widthPercentage = "20%"; break;
                        case 1: widthPercentage = "100%"; break;
                    }
                    let dev = ViewDeviceAlpha();
                    $colAttr = 'data-' + dev + 'colwidth';
                    $sliderContainer.attr($colAttr, widthPercentage);
                },

                "ChangeRightSpacing": function (space, $mainWrapperParent, $mainWrapperID, $effectedItemsParentID) {

                    if (space !== 'undefined' && typeof (space) !== 'undefined') {
                        space = parseInt(space);
                        let dev = ViewDeviceAlpha();
                        var times = 5;
                        var itemsContainer = $mainWrapperParent.find($effectedItemsParentID);
                        var childComp = itemsContainer.children();

                        let rReg = new RegExp('\\b' + dev + 'Mr-[0-9]{1,3}\\b', 'g');;
                        let lReg = new RegExp('\\b' + dev + 'Ml-[0-9]{1,3}\\b', 'g');;
                        
                        var marginRightClass = childComp.attr('class').match(rReg);
                        var marginLeftClass = childComp.attr('class').match(lReg);

                        if (marginRightClass !== null) {

                            var mainWrapper = $mainWrapperParent.find($mainWrapperID);

                            childComp.each(function () {
                                var $me = $(this);
                                $me.removeClass(marginRightClass[0].trim());
                                $me.removeClass(marginLeftClass[0].trim());
                            });

                            var compOuterSpace = space * times;


                            var className = '';
                            var leftSpaceClassName = '';
                            if (space >= 0) {
                                className = dev + 'Mr-' + compOuterSpace;
                                leftSpaceClassName = dev + 'Ml-' + compOuterSpace;
                            }
                            else {
                                space = Math.abs(space);
                                className = dev + 'MrN-' + compOuterSpace;
                                leftSpaceClassName = dev + 'MlN-' + compOuterSpace;

                            }

                            childComp.addClass(className);
                            childComp.addClass(leftSpaceClassName);
                            childComp.addClass('display-inline-block');
                            $colAttr = 'data-' + dev + 'colwidth';
                            var widthPercentage = mainWrapper.attr($colAttr);
                            if (typeof widthPercentage === 'undefined') {
                                widthPercentage = '20%';
                                console.error("No width percent attr found");
                            }

                            mainWrapper.attr('data-' + dev + 'horzspacing', space);
                            var newWidthAttr = "calc(" + widthPercentage + " - " + (compOuterSpace * 2) + "px)";
                            childComp.each(function (i, v) {
                                var $me = $(this);
                                $me.css(
                                    {
                                        "width": newWidthAttr,
                                        "float": "left"
                                    });
                            });
                        }


                    }

                },

            }

        },

        "common": {
            "InitalizeEvents": function ($sender, componentName) {
                var compo = component[componentName];
                if (typeof compo !== "undefined" && typeof compo.afterdrop !== "undefined") {
                    compo.afterdrop($sender.parent(), $sender, true, false);
                }
            },

            //-----------------------------
            "sliderHeight": function () {
                let $parent = $activeDOM;
                let $logoslider = $parent.find('.logoslider');
                function SliderHeightChange(space) {
                    ReplaceClassByPattern($activeDOM.find('.logoslider'), 'H-[0-9]{1,4}', 'H-' + space);
                }
                AdvanceSageSlider($('#logoSliderHeightSlider'), $('#logoSliderHeightHandle'), 0, 1000, GetValueByClassName($logoslider, 'H-[0-9]{1,4}', 'H-'), SliderHeightChange, $parent, 'px');
            },

            "sliderImageHeight": function () {
                let $parent = $activeDOM;
                let $logoimages = $parent.find('div.image');
                function BarHeightChange(space) {
                    ReplaceClassByPattern($activeDOM.find('div.image'), 'H-[0-9]{1,4}', 'H-' + space);
                }
                AdvanceSageSlider($('#logoSliderItemHeightSlider'), $('#logoSliderItemHeightHandle'), 50, 1000, GetValueByClassName($logoimages, 'H-[0-9]{1,4}', 'H-'), BarHeightChange, $parent, 'px');
            }
            //-----------------------------------
        },

    }
};