var row = {
    "row": {
        "componentname": "row",
        "category": "pro",
        "icon": " icon icon-comp-row",
        "row": true,
        "hidden": false,
        "collection": false,
        "type": "Empty Row",
        "typeicon": "fa fa-th",
        "description": "Create a row and manage columns where you can drop components of your choice.",
        "Screenshot": "https://easybuilder.contentder.com/ComponentScreenshot/row.jpg",
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
                    var columnNote = "<p class='popupGuideMessage'>You can manage columns later from  <b>Row >> Manage Columns </b>.</p>";
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
                            col += divStart('editor-col cCol ui-state-default sfFixed  ui-sortable ui-droppable sfCol_40 tsfCol_100 msfCol_100 mMt-0 mMb-0 mPt-0 mPr-0 mPb-0 mPl-0 mTxAl-n mTxAl-o mDib tDib tMt-0 tMb-0 tPt-0 tPr-0 tPb-0 tPl-0 tTxAl-n tTxAl-o Pt-0 Pr-0 Pb-0 Pl-0 TxAl-n TxAl-o') + colOption + CompenentCreateDOM + divEnd;
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
                        if ($editcontainer.find('> .cGrid > .editor-col').length % 2 == 0)
                            tWidth = 50;
                        $editcontainer.find('> .cGrid > .editor-col').each(function (i, v) {
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
                        var $editcontainer = $row.find(' > .editor-row-container');
                        var $removeContainer = '';
                        if ($editcontainer.length > 0) {
                            $removeContainer = $editcontainer.find('> .cGrid > .editor-col');
                        } else {
                            var $shadedLayer = $row.find('>.editor-row-shaded-layer');
                            if ($shadedLayer.length > 0) {
                                $removeContainer = $shadedLayer.find('>.cGrid > .editor-col');
                            } else {
                                $removeContainer = $row.find('>.cGrid > .editor-col');
                            }
                        }
                        for (var i = rowColLength - 1; i >= choosedCol; i--) {
                            $removeContainer.eq(i).find('>.editor-component').each(function () {
                                $removeContainer.eq(0).append($(this));
                                $removeContainer.eq(0).find(">.column-data-empty").remove();
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
        'defaultdata': EasyLibrary.ReadDOM("row/row"),
        "DOMS": {
            "headeradd": EasyLibrary.ReadDOM("starter/headingdefaultdata") + EasyLibrary.ReadDOM("starter/textdefaultdata")
        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            RowAddBindEvent($appendLayer);
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("row/basic"),
                    "onload": function ($this) {
                        LoadSettings();
                        InitEvents();
                        function InitEvents() {
                            $('#showTitle').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    var $rowTitle = RowHeadingDOM();
                                    $rowTitle.insertAfter(ShadedParent());
                                    $rowTitle.find('h1').addClass('ff-' + $('#basicFonts').val());
                                    $rowTitle.find('h1').addClass('f-weight-400');
                                    $rowTitle.find('p').addClass('ff-' + $('#basicFonts').val());
                                    $rowTitle.find('p').addClass('f-weight-400');
                                    SettingEvents();
                                } else {
                                    $activeDOM.find('.rowTitle').remove();
                                }
                            });
                            $('#autoheightAdjustRow').off('click').on('click', function () {
                                if ($(this).is(':checked')) {
                                    $('#adJustHeight').prop('checked', false);
                                    $('#adjustHeightCheck').addClass('Dn');
                                    $activeDOM.removeClass(function (i, cl) {
                                        return (cl.match(/\bH-[0-9]{1,3}\b/g) || []).join(' ');
                                    });
                                    $activeDOM.css({ 'height': '' });
                                    $activeDOM.removeClass('adjustheight').addClass('fullpagebanner');
                                    AdjustSizeFullpage($activeDOM);
                                    $('#adjustHeaderHolder').hide();
                                } else {
                                    $activeDOM.removeClass('fullpagebanner');
                                    $activeDOM.css({ 'height': '' });
                                    $('#adjustHeightCheck').removeClass('Dn');
                                }
                            });
                            $('#askContainer').off().on('click', function () {
                                if ($(this).is(':checked')) {
                                    var containerDiv = divStart('editor-row-container container-medium') + divEnd;
                                    var appendElem = '';
                                    //if ($activeDOM.find('> .editor-row-shaded-layer').length === 0) {
                                    //    appendElem = $activeDOM.children();
                                    //    $activeDOM.append(containerDiv);
                                    //} else {
                                    //    appendElem = $activeDOM.find('> .editor-row-shaded-layer').children();
                                    //    $activeDOM.find('> .editor-row-shaded-layer').append(containerDiv);
                                    //}
                                    //$activeDOM.find('.editor-row-container').append(appendElem);
                                    $activeDOM.find('.cGrid').first().wrap(containerDiv);
                                    $('#selContainerWidth').val('container-medium');
                                    $('#additionalContainer').fadeIn(400);

                                } else {
                                    //var appendElem = $activeDOM.find('.editor-row-container').children();
                                    //if ($activeDOM.find('> .editor-row-shaded-layer').length === 0) {
                                    //    $activeDOM.append(appendElem);
                                    //} else {
                                    //    $activeDOM.find('> .editor-row-shaded-layer').append(appendElem);
                                    //}
                                    //$activeDOM.find('.editor-row-container').remove();
                                    if ($activeDOM.find('.cGrid').first().parent().hasClass('editor-row-container')) {
                                        $activeDOM.find('.cGrid').first().unwrap();
                                        $('#additionalContainer').fadeOut(400);
                                    }
                                }
                                //CalculateWidth($activeDOM.find('.colWrapper'));
                                TriggerView($activeDOM);
                            });
                            $('#selContainerWidth').off().on('change', function () {
                                var containWidth = $(this).val();
                                var $container = $activeDOM.find('.editor-row-container');
                                $container.removeClass('container-small').removeClass('container-medium').removeClass('container-large').removeClass('container-extralarge');
                                $container.addClass(containWidth);
                                //CalculateWidth($activeDOM.find('.colWrapper'));
                            });
                            component["row"].common.heightInit();
                            RearrangeColumn();
                        }
                        function ShadedParent() {
                            if ($activeDOM.find('> .SetHdlr').length == 0) {
                                if ($activeDOM.find('> div > .SetHdlr').length == 0) {
                                    if ($activeDOM.find('> div > div > .SetHdlr').length == 0) { } else
                                        return $activeDOM.find('> div > div > .SetHdlr');
                                } else
                                    return $activeDOM.find('> div > .SetHdlr');
                            } else
                                return $activeDOM.find('> .SetHdlr');
                        }
                        function LoadSettings() {
                            if ($activeDOM.hasClass('fullpagebanner')) {
                                $('#autoheightAdjustRow').prop('checked', true);
                                $('#adjustHeightCheck').addClass('Dn');
                            } else {
                                $('#adjustHeightCheck').removeClass('Dn');
                            }
                            var $container = $activeDOM.find('div.rowTitle');
                            if ($container.length > 0) {
                                $('#showTitle').prop('checked', true);
                            } else {
                                $('#showTitle').prop('checked', false);
                            }
                            if ($activeDOM.hasClass('adjustheight')) {
                                $('#adJustHeight').prop('checked', true);
                                $('#adjustHeaderHolder').show();
                            } else {
                                $('#adJustHeight').prop('checked', false);
                            }
                            $container = $activeDOM.find('.cGrid').first().parent();
                            if ($container.hasClass('editor-row-container')) {
                                $('#askContainer').prop('checked', true);
                                var conClass = $container.attr('class').replace('editor-row-container', '').trim();
                                $('#selContainerWidth').val(conClass);
                                $('#additionalContainer').fadeIn(400);
                            } else {
                                $('#askContainer').prop('checked', false);
                            }
                        }
                        function RowHeadingDOM() {
                            var rowHeadingDOM = '';
                            rowHeadingDOM = DOMCreate('div', component["row"].DOMS.headeradd, 'rowTitle sfCol_100');
                            var $rowHeading = $(rowHeadingDOM);
                            $rowHeading.find('.sortComponent').remove();
                            return $rowHeading;
                        }
                        function RearrangeColumn() {
                            let cols = $activeDOM.find('.cGrid').eq(0).find('> .editor-col ');
                            if (cols.length > 1) {
                                let html = '';
                                cols.each(function (i, v) {
                                    html += `<span class="items" data-no="${i}"> Col ${i + 1}</span>`;
                                });
                                $("#RearrangeColumnWrapper").html(html);
                                $('#rearrangeColumn').show();
                                $("#RearrangeColumnWrapper").AdvanceSorting({
                                    targetParent: $activeDOM,
                                    targetElem: $activeDOM.find('.cGrid > .editor-col '),
                                    sortableOptions: {
                                        items: ".items",
                                        containment: '#RearrangeColumnWrapper',
                                        stop: function (event, ui) {
                                            let order = [];
                                            $('#RearrangeColumnWrapper span').each(function () {
                                                order.push($(this).attr('data-no'));
                                            });
                                            let $colss = $activeDOM.find('.cGrid').eq(0).find('> .editor-col');
                                            $colss.each(function (i, v) {
                                                $(this).addClass('c-' + i);
                                            });
                                            let length = $colss.length;
                                            for (var i = 0; i < length; i++) {
                                                let $col = $activeDOM.find('.cGrid > .editor-col.c-' + order[i]);
                                                $activeDOM.find('.cGrid').eq(0).append($col);
                                                $col.removeClass('c-' + order[i]);
                                                $('#RearrangeColumnWrapper span').eq(i).attr('data-no', i).text((' Col ' + (i + 1)));
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    },
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
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "common": {
            "heightInit": function () {
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
                        $activeDOM.removeClass(dAlpha + 'fullpagebanner').addClass(dAlpha + 'adjustheight');
                        $('#adjustHeaderHolder').fadeIn(400);
                        var rowHeight = $activeDOM.css('height').replace('px', '');
                        $activeDOM.addClass(dAlpha + 'H-' + rowHeight);
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
                       // AdjustSizeFullpage($activeDOM);
                    }
                });
                RowHeight();
                function RowHeight() {
                    let $parent = $activeDOM;
                    function rowHeightChange(space) {
                        ReplaceClassByPattern($parent, 'H-[0-9]{1,4}', 'H-' + space);
                    }
                    AdvanceSageSlider($('#rowHeightSlider'), $('#rowHeightHandle'), 30, 1080,
                        GetValueByClassName($parent, 'H-[0-9]{1,4}', 'H-'), rowHeightChange, $parent, 'px');
                }
            }
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
                                $("#itemsperow").AdvanceItemsPerRow({
                                    targetParent: $activeDOM,
                                    targetElem: $activeDOM.find('.cGrid > .editor-col'),
                                    label: 'Items per row',
                                });
                            }
                        },
                        "resheight": {
                            "prepend": "true",
                            "DOM": EasyLibrary.ReadDOM('row/resheight'),
                            "onload": function () {
                                let d = ViewDeviceAlpha();
                                if ($activeDOM.hasClass(d + 'adjustheight')) {
                                    $('#adJustHeight').prop('checked', true);
                                    $('#adjustHeaderHolder').show();
                                } else {
                                    $('#adJustHeight').prop('checked', false);
                                    $('#adjustHeaderHolder').hide();
                                }
                                component["row"].common.heightInit();
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
        "remove": function ($cloneDOM) {
            $cloneDOM.find('.addPro').remove();
        },
        "removeedit": function ($editDOM) {
            $editDOM.find('.addPro.active').removeClass('active');
        },
        resize: function () {
            AdjustSizeFullpage();
        }
    }
};