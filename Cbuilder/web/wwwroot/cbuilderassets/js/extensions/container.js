var row = {
    "container": {
        "componentname": "container",
        "category": "advance",
        "icon": " icon icon-comp-row",
        "row": false,
        "hidden": false,
        "collection": false,
        "type": "Empty Row",
        "typeicon": "fa fa-th",
        "Screenshot": "https://blog.contentder.com/Modules/SmartBlog/SummaryIcon/medium/blog.png",
        "beforedrop": function ($appendedParent, $row, dropped) {
            var ColumnDOM = "";
            var col100 = DOMCreate('div', '100', 'sfCol_100 column');
            var col80 = DOMCreate('div', '80', 'sfCol_80 column');
            var col75 = DOMCreate('div', '75', 'sfCol_75 column');
            var col70 = DOMCreate('div', '70', 'sfCol_70 column');
            var col60 = DOMCreate('div', '60', 'sfCol_60 column');
            var col50 = DOMCreate('div', '50', 'sfCol_50 column');
            var col40 = DOMCreate('div', '40', 'sfCol_40 column');
            var col30 = DOMCreate('div', '30', 'sfCol_30 column');
            var col33 = DOMCreate('div', '33', 'sfCol_33 sfFixed column');
            var col25 = DOMCreate('div', '25', 'sfCol_25 column');
            var col20 = DOMCreate('div', '20', 'sfCol_20 column');
            ColumnDOM = '<ul class="selectDataWrapper selectcolumns sfCol_100">';
            ColumnDOM += DOMCreate('li', col100, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col80 + col20, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col75 + col25, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col70 + col30, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col60 + col40, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col50 + col50, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col40 + col60, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col30 + col70, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col25 + col75, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col20 + col80, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col20 + col60 + col20, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col25 + col50 + col25, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col30 + col40 + col30, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col33 + col33 + col33, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col25 + col25 + col25 + col25, 'sfCol_20 selectData');
            ColumnDOM += DOMCreate('li', col20 + col20 + col20 + col20 + col20, 'sfCol_20 selectData');
            ColumnDOM += '</ul>';
            if (typeof (dropped) !== "undefined") {
                if (dropped) {
                    var columnNote = "<p class='popupGuideMessage'>You can manage columns later from  <b>Container >> Manage Columns </b>.</p>";
                    ColumnDOM = columnNote + ColumnDOM;
                }
            }
            FullPagePopup({
                data: ColumnDOM,
                heading: "Manage columns",
                showheading: true,
                width: "60%",
            });
            ColEvents();
            function ColEvents() {
                $('.selectData').on('click', function () {
                    var $this = $(this);
                    var $editcontainer = findSelectedLayer($row);
                    var rowColLength = $editcontainer.find('>.cGrid >.editor-col').length;
                    var choosedCol = $this.find('> .column').length;
                    var width = [];
                    $this.find('> .column').each(function () {
                        width.push($(this).text());
                    });
                    var addedCol = choosedCol - rowColLength;
                    if (addedCol > 0) {
                        var col = '';
                        for (var i = 0; i < addedCol; i++) {
                            //var colspacing = 'editor-com-innerSpacing-top-35 editor-com-innerSpacing-right-35 editor-com-innerSpacing-bottom-35 editor-com-innerSpacing-left-35';
                            col += divStart('editor-col cCol ui-state-default sfFixed  ui-sortable ui-droppable sfCol_40 tsfCol_100 msfCol_100') + DropComponent + divEnd;
                        }
                        $editcontainer.find('> .cGrid').append(col);
                        //if ($editcontainer.length > 0) {
                        //    $editcontainer.find('.colWrapper').append(col);
                        //} else {
                        //    var $shadedLayer = $row.find('.editor-row-shaded-layer');
                        //    if ($shadedLayer.length > 0) {
                        //        $shadedLayer.find('.colWrapper').append(col);
                        //    } else {
                        //        $row.find('.colWrapper').append(col);
                        //    }
                        //}
                        DraggableSortable();
                        SettingEvents();
                        BindColumnEvents($row);
                        ManageWidth();
                        TriggerView($row);
                    } else if (addedCol < 0) {
                        if (typeof (dropped) !== "undefined" && dropped) {
                            if (dropped) {
                                //no need to because it the drop event and  by defaut there is one column
                                // if basic changes then
                            }
                        } else {
                            SageConfirmDialog('You are going to choose  less column. all your data will be switch to the first column ?').done(function () {
                                RemoveColumn();
                                ManageWidth();
                            });
                        }

                    } else if (addedCol == 0) {
                        ManageWidth();
                    }

                    function ManageWidth() {
                        var mWidth = 100;
                        var tWidth = 100;
                        if ($row.find('> .cGrid > .editor-col').length % 2 == 0)
                            tWidth = 50;
                        $row.find('> .cGrid > .editor-col').each(function (i, v) {
                            var $me = $(this);
                            $me.attr('data-type', 'column');
                            var $classes = $me.attr('class').match(/[a-z]{0,1}sfCol_[0-9]{1,3}/g);
                            if ($classes != null) {
                                var length = $classes.length;
                                //use no break in this condition beacause if the length =2 then it must remove 2 class
                                switch (length) {
                                    case 3:
                                        $me.removeClass($classes[2]);
                                    case 2:
                                        $me.removeClass($classes[1]);
                                    case 1:
                                        $me.removeClass($classes[0]);
                                }
                                $me.removeClass($classes[0]);
                            }
                            $me.addClass('sfCol_' + width[i]);
                            var tClass = 'tsfCol_' + tWidth;
                            var mClass = 'msfCol_' + mWidth;
                            $me.addClass(tClass + ' ' + mClass);
                        });
                        CloseFullPagePopup();
                    }
                    function RemoveColumn() {
                        var $editcontainer = $row.find('.editor-row-container');
                        var $removeContainer = '';
                        if ($editcontainer.length > 0) {
                            $removeContainer = $editcontainer.find('> .cGrid > .editor-col');
                        } else {
                            var $shadedLayer = $row.find('.editor-row-shaded-layer');
                            if ($shadedLayer.length > 0) {
                                $removeContainer = $shadedLayer.find('>.cGrid > .editor-col');
                            } else {
                                $removeContainer = $row.find('>.cGrid > .editor-col');
                            }
                        }
                        for (var i = rowColLength - 1; i >= choosedCol; i--) {
                            $removeContainer.eq(i).find('>.editor-component').each(function () {
                                $removeContainer.eq(0).append($(this));
                                $removeContainer.eq(0).find(".column-data-empty").remove();
                            });
                            $removeContainer.eq(i).remove();
                        }
                        TriggerView($row);
                    }
                });
            }
        },
        'pageload': function () {
            $('.cRow').each(function () {
                RowAddBindEvent($(this));
            });
        },
        'defaultdata': EasyLibrary.ReadDOM("container/row"),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if ($appendLayer.parent().closest('[data-type="container"]').length > 0) {
                $appendLayer.remove();
                CloseFullPagePopup();
                SageAlertDialog('You cannot add container inside container');
            }
            else {
                RowAddBindEvent($appendLayer);
            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("container/basic"),
                    "onload": function () {
                        component["container"].common.onload("horizontal");
                        component["container"].common.heightInit();
                    }
                },
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 80,
                            "min": -80,
                            "times": 5,
                            "position": ["all", "top", "bottom"]
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
                        "horizontal": ["left", "center", "right"],
                        "vertical": ["top", "middle", "bottom"]
                    }
                },
                "Scroll Effect": {
                    "options": []
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "styleDOMs": {
            "tabs": {
                "Background": {
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
                "Box Radius": {
                    "options": {
                        "max": 50,
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
                        "visibility": {},
                        "ordering": {},
                        "itemsperrow": {
                            "prepend": "true",
                            "DOM": "<div id='itemsperow'></div>",
                            "onload": function ($item) {
                                $parent = $activeDOM;
                                let $targetElem = $activeDOM.find('>.cGrid >.editor-col');
                                let $shaded = $activeDOM.find('>.editor-row-shaded-layer');
                                if ($shaded.length > 0) {
                                    $targetElem = $activeDOM.find('>.editor-row-shaded-layer >.cGrid >.editor-col');
                                }
                                $("#itemsperow").AdvanceItemsPerRow({
                                    targetParent: $activeDOM,
                                    targetElem: $targetElem,
                                    label: 'Items per row',
                                });
                            }
                        },
                        "Basic": {
                            "DOM": EasyLibrary.ReadDOM("container/basic"),
                            "onload": function () {
                                component["container"].common.onload("all");
                                component["container"].common.heightInit();

                            },
                            "prepend": "true",
                        },
                    }
                },
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 80,
                            "min": -80,
                            "times": 5,
                            "position": ["all", "top", "bottom"]
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
                        "horizontal": ["left", "center", "right"],
                        "vertical": ["top", "middle", "bottom"]
                    }
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "common": {
            "heightInit": function () {
                let dAlpha = DeviceAlpha();
                if ($activeDOM.hasClass(dAlpha + 'adjustheight')) {
                    $('#adJustHeight').prop('checked', true);
                    $('#adjustHeaderHolder').show();
                } else {
                    $('#adJustHeight').prop('checked', false);
                }
                $('#adJustHeight').off().on('click', function () {
                    if ($(this).is(':checked')) {
                        $('#autoheightAdjustRow').prop('checked', false);
                        let parentClasses = $activeDOM.attr('class');
                        let dAlpha = DeviceAlphaSpace();
                        let regex = new RegExp(dAlpha + 'H-[0-9]{1,4}', 'g');
                        let rowHeightClass = parentClasses.match(regex);
                        if (rowHeightClass !== null) {
                            $activeDOM.removeClass(rowHeightClass[0]);
                        }
                        $activeDOM.css({ 'height': '' });
                        $activeDOM.removeClass('fullpagebanner').addClass(dAlpha + 'adjustheight');
                        $('#adjustHeaderHolder').fadeIn(400);
                        var rowHeight = $activeDOM.css('height').replace('px', '');
                        ChangeSliderValue($('#rowHeightSlider'), rowHeight);
                    } else {
                        let parentClasses = $activeDOM.attr('class');
                        let dAlpha = DeviceAlphaSpace();
                        let regex = new RegExp(dAlpha + 'H-[0-9]{1,4}', 'g');
                        let rowHeightClass = parentClasses.match(regex);
                        if (rowHeightClass !== null) {
                            $activeDOM.removeClass(rowHeightClass[0]);
                        }
                        $activeDOM.removeClass(dAlpha + 'adjustheight');
                        $activeDOM.css({ 'height': '' });
                        $('#adjustHeaderHolder').fadeOut(400);
                    }
                });
                RowHeight();
                function RowHeight() {
                    let $parent = $activeDOM;
                    function rowHeightChange(space) {
                        ReplaceClassByPattern($parent, 'H-[0-9]{1,4}', 'H-' + space);
                    }
                    AdvanceSageSlider($('#rowHeightSlider'), $('#rowHeightHandle'), 50, 1080,
                        GetValueByClassName($parent, 'H-[0-9]{1,4}', 'H-'), rowHeightChange, $parent, 'px');
                }
            },
            "onload": function (type) {
                $("#containerHeight").AdvanceDimension({
                    type: 'height',
                    targetParent: $activeDOM,
                    targetElem: $activeDOM,
                    label: 'Height',
                    defaultValue: 100
                });
                $("#containerWidth").AdvanceDimension({
                    type: 'sfwidth',
                    targetParent: $activeDOM,
                    targetElem: $activeDOM,
                    label: 'Width',
                    defaultValue: 100,
                });
                $('#containergutterspace').AdvanceGutterSpace({
                    targetParent: $activeDOM,
                    targetElem: $activeDOM.find('.cGrid > div'),
                    type: type,
                    itemsperrow: $activeDOM.find('.cGrid > div').length,
                });
            },
        }
    }
};