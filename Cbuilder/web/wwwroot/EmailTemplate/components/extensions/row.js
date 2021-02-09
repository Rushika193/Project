var mailRow = {
    "row": {
        "componentname": "row",
        "category": "layout",
        "icon": " icon icon-comp-row",
        "row": true,
        "info": 'This component create new section having multiple columns for drop others component',
        "hidden": false,
        'onload': function ($parent) {
            let $thisComp = this;
            $('.manage-col').off('click').on('click', function () {
                $thisComp.manageColumns($(this).closest('.mComponent'), false);
            });
        },
        'defaultdata': EasyLibrary.ReadDOM("row/rowview", false),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            let $thisComp = this;
            if (dropped) {
                this.manageColumns($appendLayer, dropped);
                $appendLayer.find('.manage-col').off('click').on('click', function () {
                    $thisComp.manageColumns($(this).closest('.mComponent'), false);
                });
            }
        },
        "manageColumns": function ($parent, dropped) {
            let rowGrid = ['100', '80-20', '75-25', '70-30', '60-40',
                '50-50', '40-60', '30-70', '25-75', '20-80',
                '20-60-20', '25-50-25', '30-40-30', '33-33-33',
                '25-25-25-25', '20-20-20-20'
            ]
            let len = rowGrid.length;
            let htmls = '<ul class="selectDataWrapper selectcolumns sfCol_100">';
            for (var i = 0; i < len; i++) {
                htmls += '<li class="sfCol_20 selectData" data-cols=' + rowGrid[i] + '>';
                let cols = rowGrid[i].split('-');
                let colLen = cols.length;
                for (var j = 0; j < colLen; j++) {
                    htmls += '<div class="sfCol_' + cols[j] + ' column">' + cols[j] + '</div>'
                }
                htmls += '</li>';
            }
            htmls += '</ul>'
            var columnNote = '';
            let IsNotSelect = true;
            if (dropped)
                columnNote = "<p class='popupGuideMessage'>You can manage columns later from  <b>Row >> Manage Columns </b>.</p>";
            htmls = columnNote + htmls;
            FullPagePopup({
                data: htmls,
                heading: "Manage columns",
                showheading: true,
                width: "60%",
                onclose: function () {
                    if (dropped && IsNotSelect) {
                        $parent.remove();
                        ComponentHelper.checkRowExists();
                    }
                    if(!IsNotSelect)
                        ComponentHelper.draggableSortableEvents();
                }
            });
            $('.selectcolumns .selectData').off('click').on('click', function () {
                IsNotSelect = false;
                let NewCols = $(this).attr('data-cols').split('-');
                let ColDoms = createColDoms(NewCols);
                if (dropped) {
                    $parent.find('.tblColAceptor').html(ColDoms);
                    CloseFullPagePopup();
                } else {
                    let oldData = [];
                    let oldColLen = 0;
                    $parent.find('.colCompAceptor.rowCol').each(function () {
                        let $thisCol = $(this);
                        if ($thisCol.find('>.empty-col').length == 0) {
                            oldData.push($thisCol.html());
                        }
                        oldColLen++;
                    });
                    let oldDatalen = oldData.length;
                    if (oldColLen > NewCols.length && oldDatalen > 0) {
                        SageConfirmDialog(`You are going to choose less column. 
                             all your data will be switch to the first column ? `).done(function () {
                                $parent.find('.tblColAceptor').html(ColDoms);
                                let oldHtml = oldData.join('');
                                if (oldHtml !== '')
                                     $parent.find('.colCompAceptor.rowCol').eq(0).html(oldHtml);
                                 CloseFullPagePopup();
                            });
                    }
                    else {
                        $parent.find('.tblColAceptor').html(ColDoms);
                        $parent.find('.colCompAceptor.rowCol').each(function (i, v) {
                            if (i <= oldDatalen)
                                $(this).html(oldData[i]);
                        });
                        CloseFullPagePopup();
                    }
                }
             
                $parent.find('.mComponent').each(function () {
                    ComponentHelper.bindSettingEvents($(this));
                });

               
            });
            function createColDoms(colsArr) {
                let colDoms = '<tr style="width:100%">';
                let colStng = `<div class="SetHdlr"><span class="stng"><i class="cb-stng"></i><ul class="setDrp no_txt">
                                <li class="com-settings" data-type="column"><span class="text-wrp">Settings</span><i class="cb-mxr" title="Settings"></i></li>
                                <li class="s-style" data-type="column"><span class="text-wrp">Style</span><i class="cb-stl" title="Styles"></i></li>
                                <li class="copyData"><span class="text-wrp">Copy</span><i class="cb-cpy" title="copy data"></i></li>
                                <li class="pasteData"><span class="text-wrp">Paste</span><i class="cb-paste" title="paste data"></i></li>
                                <li class="delete_icon deletehelper"><span class="text-wrp">Delete</span><i class="cb-del deletehelper" title="Delete"></i></li>
                                </ul></span></div >`
                $.each(colsArr, function (i, v) {
                    colDoms += '<td style="display:table-cell; width:' + v + '%" class="colComp mComponent" data-type="column">' + colStng + '<div class="colCompAceptor rowCol"><div class="empty-col"><h4>This is column</h4><span> drag component here.</span></div></div></td>';
                });
                colDoms += '</tr>';
                return colDoms;
            }
        },
        "settingDOMs": {
            "tabs": {
                "spacing": {
                    "DOM": '<div id="divRowSpacing"></div>',
                    "onload": function ($ele) {
                        $('#divRowSpacing').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
               
                "height": {
                    "DOM": '<div id="divRowCompHeight"></div>',
                    "onload": function ($ele) {
                        $('#divRowCompHeight').AdvanceDimension({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: {
                                types: ['height'],
                            }
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
            }
        },
        "styleDOMs": {
            "tabs": {
                "background": {
                    "DOM": '<div id="divRowBgColor"></div>',
                    "onload": function ($ele) {
                        $('#divRowBgColor').AdvanceBackground({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: ["image", "color"],

                        })
                    }
                },
                "border": {
                    "DOM": '<div id="divRowBorders"></div>',
                    "onload": function ($ele) {
                        $('#divRowBorders').AdvanceBorder({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                        })
                    }
                },
                "box radius": {
                    "DOM": '<div id="divRowBxRadius"></div>',
                    "onload": function ($ele) {
                        $('#divRowBxRadius').AdvanceBoxRadius({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                        })
                    }
                },
                "box shadow": {
                    "DOM": '<div id="divRowBxShadow"></div>',
                    "onload": function ($ele) {
                        $('#divRowBxShadow').AdvanceBoxShadow({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                        })
                    }
                },


            }
        },
        "remove": function ($cloneDOM) {

        },

    }
}