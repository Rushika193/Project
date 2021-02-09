var container = {
    "container": {
        "componentname": "container",
        "category": "layout",
        "icon": "icon icon-comp-row",
        "info": "This component creates container within a row.",
        "row": false,
        "hidden": false,
        "eventlistner": function ($parent) {
            this.clickEvents();
        },
        "pageload": function () {
            this.clickEvents();
        },
        "defaultdata": EasyLibrary.ReadDOM("container/containerview", true),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            let $thisComp = this;
            if (dropped) {
                if ($appendLayer.parent().closest('[data-type="container"]').length > 0) {
                    $appendLayer.remove();
                    CloseFullPagePopup();
                    SageAlertDialog('You cannot add container inside container');
                }
                else {
                    $thisComp.manageColumns($appendLayer, dropped);
                    this.clickEvents();
                }
            }
            this.clickEvents();
        },
        "clickEvents": function ($parent) {
            let $this = this;
            $('.manage-container-col').off('click').on('click', function () {
                $this.manageColumns($(this).closest('.mComponent'), false);
            });
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
                htmls += '<li class="sfCol_20 selectData containerCol" data-cols=' + rowGrid[i] + '>';
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
                columnNote = "<p class='popupGuideMessage'>You can manage columns later from  <b>COntainer >> Manage Columns </b>.</p>";
            htmls = columnNote + htmls;
            FullPagePopup({
                data: htmls,
                heading: "Manage columns",
                showheading: true,
                width: "60%",
                onclose: function () {
                    if (dropped && IsNotSelect) {
                        $parent.remove();
                    }
                    if (!IsNotSelect)
                        ComponentHelper.draggableSortableEvents();
                }
            });
            $('.selectcolumns .selectData.containerCol').off('click').on('click', function () {
                let NewCols = $(this).attr('data-cols').split('-');
                let ColDoms = createColDoms(NewCols);
                if (dropped) {
                    $parent.find('.tblContainerCol').html(ColDoms);
                } else {
                    let oldData = [];
                    let oldColLen = 0;
                    $parent.find('.colCompAceptor.containerCol').each(function () {
                        let $thisCol = $(this);
                        if ($thisCol.find('.empty-col').length == 0) {
                            oldData.push($thisCol.html());
                        }
                        oldColLen++;
                    });
                    let oldDatalen = oldData.length;
                    if (oldColLen > NewCols.length && oldDatalen > 0) {
                        SageConfirmDialog(`You are going to choose less column.
                             all your data will be switch to the first column ? `).done(function () {
                                 $parent.find('.tblContainerCol').html(ColDoms);
                                 let oldHtml = oldData.join('');
                                 if (oldHtml !== '')
                                     $parent.find('.colCompAceptor.containerCol').eq(0).html(oldHtml);
                             });
                    }
                    else {
                        $parent.find('.tblContainerCol').html(ColDoms);
                        $parent.find('.colCompAceptor.containerCol').each(function (i, v) {
                            if (i <= oldDatalen)
                                $(this).html(oldData[i]);
                        });
                    }
                }
                IsNotSelect = false;
                $parent.find('.mComponent').each(function () {
                    ComponentHelper.bindSettingEvents($(this));
                });

                CloseFullPagePopup();
            });
            function createColDoms(colsArr) {
                let colDoms = '<tr style="width:100%">';
                $.each(colsArr, function (i, v) {
                    colDoms += '<td style="display:table-cell; width:' + v + '%" class="mComponent colCompAceptor containerCol"> <div class="empty-col"><h4>Container</h4><span> drag component here.</span></div></td>';
                });
                colDoms += '</tr>';
                return colDoms;
            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": `<div id="containerHeight"></div>`,
                    "onload": function ($ele) {
                        let $parent = $activeDOM;
                        $('#containerHeight').AdvanceDimension({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: {
                                types: ['height'],
                            }
                        });

                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": `<div id="imgMargin"></div>
                            <div id="imgPadding"></div>`,
                    "onload": function ($item) {
                        $('#imgPadding').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: {
                                "padding": {
                                    "max": 80,
                                    "min": 0,
                                    "times": 5,
                                    "position": ["all", "top", "left", "bottom", "right"]
                                }
                            }
                        });
                        $('#imgMargin').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: {
                                "margin": {
                                    "max": 40,
                                    "min": -40,
                                    "times": 5,
                                    "position": ["all", "top", "left", "bottom", "right"]
                                }
                            }
                        });
                    },
                },
                "alignment": {
                    "DOM": '<div id="containerAlignment"></div>',
                    "onload": function ($ele) {
                        let $a = $activeDOM.find('.containerCol');
                        $('#containerAlignment').AdvanceAlignment({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.containerCol,.empty-col'),
                            options: ['horizontal','vertical']
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
            },
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
        "onsort": function ($dom) {
        }
    }
}
