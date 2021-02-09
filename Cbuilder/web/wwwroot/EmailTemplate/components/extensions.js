var extendedMailComps = {
    "address sample": {
        "componentname": "address sample",
        "category": "basic",
        "componentBlockDOM": "",
        "icon": "fa fa-file-text",
        "row": false,
        "info": "Ending line with richtext",
        "hidden": false,
        "collection": true,
        "type": "element",
        "pageload": function () {
            this.inheritSettings();
        },
        "inheritSettings": function () {
            let thisComp = this;
            let richText = mailcomponent['rich text'];
            thisComp['eventlistner'] = richText.eventlistner;
            thisComp['saveSelection'] = richText.saveSelection;
            thisComp['restoreSelection'] = richText.restoreSelection;
            thisComp['remove'] = richText.remove;
        },
        "defaultdata": EasyLibrary.ReadDOM('address/viewSample', false),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            this.inheritSettings();
            if (dropped) {
                $appendLayer.find('img[class=ml-logo]').each(function () {
                    $(this).attr('src', EmailBasicToken.SiteLogo.SampleValue)
                });
                $appendLayer.find('.mailRichText').LightTextEditor();
            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM('address/basic', false),
                    "onload": function ($item) {
                        let $parent = $activeDOM;
                        loadSetting();
                        changeSetting();
                        sortable();
                        function loadSetting() {
                            setItems();
                            checkSetting('#toggleLogo', '.logo');
                            checkSetting('#toggleaddress', '.address');
                            checkSetting('#togglesocial', '.sociallinkComp');
                            function checkSetting(ID, className) {
                                let css = $parent.find(className).css('display');
                                if (css == "none") {
                                    $(ID).prop('checked', false);
                                }
                                else {
                                    $(ID).prop('checked', true);
                                }
                            }
                        }
                        function setItems() {
                            $parent.find('.address-item').each(function (i,v) {
                                let $this = $(this);
                                let name=$this.attr('data-name');
                                let $setting = $('#addressSetting').find('.setting-item').eq(i);
                                $setting.find('.itemname').text("Show " + name)
                                         .end()
                                         .find('.toggleItem input').attr('id', "toggle" + name)
                                         .end()
                                         .find('.toggleItem label').attr('for', "toggle" + name)
                                         .end();
                            })
                        }
                        function changeSetting() {
                            Show('#toggleLogo', '.logo');
                            Show('#toggleaddress', '.address');
                            Show('#togglesocial', '.sociallinkComp');
                            function Show(ID, className) {
                                $(ID).off().on('change', function () {
                                    if ($(this).is(':checked')) {
                                        $parent.find(className).css('display', "");
                                    }
                                    else {
                                        $parent.find(className).css('display', "none");
                                    }
                                })
                            }
                        }
                        function sortable() {
                            $("#addressSetting").AdvanceSorting({
                                targetParent: $parent.closest('.addressSample'),
                                targetElem: '.address-item', //view
                                sortableOptions: {
                                    items: "> div.setting-item", //editor
                                    handle: ".sortHandle", //editor
                                    containment: '#addressSetting' //editor
                                }
                            });
                        }
                    }
                },
                "Spacing": {
                    "DOM": '<div id="addressSpacing"></div>',
                    "onload": function ($item) {
                        $('#addressSpacing').html('');
                        $('#addressSpacing').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Alignment": {
                    "DOM": '<div id="addressAlign"></div>',
                    "onload": function ($item) {
                        $('#addressAlign').AdvanceAlignment({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: ['horizontal']
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                }
            },
        },
        "styleDOMs": {
            "tabs": {
                "Background": {
                    "DOM": "<div id='rchtxtbg'></div>",
                    "onload": function ($item) {
                        $('#rchtxtbg').AdvanceBackground({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: ['color']
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },

                "Border": {
                    "DOM": "<div id='rchtxtbdr'></div>",
                    "onload": function ($item) {
                        $('#rchtxtbdr').AdvanceBorder({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Box Radius": {
                    "DOM": '<div id="rchtxt-br"></div>',
                    "onload": function ($ele) {
                        $('#rchtxt-br').AdvanceBoxRadius({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Box Shadow": {
                    "DOM": '<div id="rchtxt-bs"></div>',
                    "onload": function ($ele) {
                        $('#rchtxt-bs').AdvanceBoxShadow({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },

            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
    }
,    "column": {
        "componentname": "column",
        "category": "layout",
        "icon": " icon icon-comp-row",
        "row": false,
        "hidden": true,
        'defaultdata':'',
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
        },
        "settingDOMs": {
            "tabs": {           
                "spacing": {
                    "DOM": '<div id="divColumnSpacing"></div>',
                    "onload": function ($ele) {
                        $('#divColumnSpacing').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: {
                                 "padding": {
                                    "max": 100,
                                    "min": 0,
                                    "times": 1,
                                    "position": ["all", "top", "left", "bottom", "right"]
                                }
                            }
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "alignment": {
                    "DOM": '<div id="divColumnAlignment"></div>',
                    "onload": function ($ele) {
                        $('#divColumnAlignment').AdvanceAlignment({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: ['horizontal', 'vertical']                           
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "height": {
                    "DOM": '<div id="divColCompHeight"></div>',
                    "onload": function ($ele) {
                        $('#divColCompHeight').AdvanceDimension({
                            targetParent: $activeDOM.parent(),
                            targetElem: $activeDOM.parent().find('>.colComp'),
                            options: {
                                types: ['height'],
                            }
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.parent().find('>.colComp').addClass('actEle');
                    }
                },
            }
        },
        "styleDOMs": {
            "tabs": {
                "background": {
                    "DOM": '<div id="divColBgColor"></div>',
                    "onload": function ($ele) {
                        $('#divColBgColor').AdvanceBackground({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: ["image", "color"],

                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "border": {
                    "DOM": '<div id="divColumnBorders"></div>',
                    "onload": function ($ele) {
                        $('#divColumnBorders').AdvanceBorder({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "box radius": {
                    "DOM": '<div id="divColumnBxRadius"></div>',
                    "onload": function ($ele) {
                        $('#divColumnBxRadius').AdvanceBoxRadius({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "box shadow": {
                    "DOM": '<div id="columShadow"></div>',
                    "onload": function ($ele) {
                        $('#columShadow').html('');
                        $('#columShadow').AdvanceBoxShadow({
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
,    "container": {
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
,    "ending line": {
        "componentname": "ending line",
        "category": "basic",
        "componentBlockDOM": "",
        "icon": "fa fa-file-text",
        "row": false,
        "info": "Ending line with richtext",
        "hidden": false,
        "collection": true,
        "type": "element",
        "pageload": function () {
            this.inheritSettings();
        },
        "inheritSettings": function () {
            let thisComp = this;
            let richText = mailcomponent['rich text'];
            thisComp['settingDOMs'] = richText.settingDOMs;
            thisComp['restoreSelection'] = richText.restoreSelection;
            thisComp['styleDOMs'] = richText.styleDOMs;
            thisComp['remove'] = richText.remove;
            thisComp['eventlistner'] = richText.eventlistner;
        },
        "defaultdata": EasyLibrary.ReadDOM('endingline/view', false),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            this.inheritSettings();
            if (dropped) {
                $appendLayer.find('.mailRichText').LightTextEditor();
            }
        },
    }
,    "image": {
        "componentname": "image",
        "category": "basic",
        "icon": "icon icon-img-1",
        "row": false,
        "info": "This component will add images on template.",
        "hidden": false,
        "onload": () => { },
        "defaultdata": EasyLibrary.ReadDOM("image/imageview", false),
        "afterdrop": ($appendedParent, $appendLayer, dropped) => {
            if (dropped)
                $appendLayer.find('.image-settings').trigger('click');
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": `<div id="imgWidth"></div>
                            <div id="imgHeight"></div>
                            <div class="field-row stElWrap col50-50">
                                <label class="fCol">Fit Image</label>
                                <div class="fCol TxAl-r">
                                    <span class="toggle_btn">
                                        <input id="fitImg" type="checkbox">
                                        <label class="tgl_slider" for="fitImg"></label>
                                    </span>
                                </div>
                            </div>
                            `,
                    "onload": ($ele) => {
                        $('#imgWidth').AdvanceDimension({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: {
                                max: 100,
                                types: ['width'],
                                unit: '%'
                            }
                        });
                        $('#imgHeight').AdvanceDimension({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('img'),
                            options: {
                                types: ['height'],
                                unit: 'px'
                            }
                        });
                        $('#fitImg').on('change', () => {
                            if ($('#fitImg').prop('checked')) {
                                $activeDOM.find('img').css("object-fit", "cover");
                            } else {
                                $activeDOM.find('img').css("object-fit", "");
                            }
                        });
                    },
                    "active": () => {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": `<div id="imgMargin"></div>
                            <div id="imgPadding"></div>`,
                    "onload": ($item) => {
                        $('#imgMargin').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.image-wrap'),
                            options: {
                                "margin": {
                                    "max": 80,
                                    "min": -80,
                                    "times": 5,
                                    "position": ["all", "top", "left", "bottom", "right"],
                                }
                            }
                        });
                        $('#imgPadding').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.image-wrap'),
                            options: {
                                "padding": {
                                    "max": 80,
                                    "min": 0,
                                    "times": 5,
                                    "position": ["all", "top", "left", "bottom", "right"]
                                }
                            }
                        });
                    },
                    "active": () => {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Box Shadow": {
                    "custom": true,
                    "DOM": `<div id="imgBoxShadow"></div>`,
                    "onload": ($item) => {
                        $('#imgBoxShadow').AdvanceBoxShadow({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('img'),
                            options: {
                            },
                        });
                    },
                    "active": () => {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
            },
        },
        "remove": ($cloneDOM) => {
        }
    }
,    "link button": {
        "componentname": "link button",
        "category": "basic",
        "icon": "fa fa-link",
        "row": false,
        "hidden": false,
        "info": 'This component is for redirecting to the link that is manually inserted from the setting.',
        "onload": function () { },
        "defaultdata": EasyLibrary.ReadDOM("linkbutton/linkbtnview", false),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (dropped) {

            }
        },
        "getPortalPages": function ($parent) {
            var auth = {
                UserName: SageFrameUserName,
                PortalID: SageFramePortalID,
                SecureToken: SageFrameSecureToken,
                CultureCode: SageFrameCurrentCulture
            }
            let pageList = '';
            $.ajax({
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                async: false,
                url: SageFrameAppPath + "/Modules/WbPagesDesign/services/PageDesignWebService.asmx/GetPortalPages",
                dataType: 'json',
                data: JSON.stringify({
                    authParam: auth,
                    SiteID: GetSiteID
                }),
                success: function (data) {
                    pageList = data.d;
                },
                error: function () {
                    alert("Portal Pages Fetch Unsuccessfull!!");
                }
            });
            return pageList;
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("linkbutton/linkbtnbasic", false),
                    "onload": function ($item) {
                        let $anchor = $activeDOM.find('a');
                        let $parent = $activeDOM;
                        $('#txtbasicstng').AdvanceTextSetting({
                            "targetParent": $activeDOM,
                            "targetElem": $activeDOM.find('a')
                        });
                        $('#linkTextURL').val($anchor.attr('href'));
                        function lnkSetup() {
                            $('#linkTextURL').off('keyup').on('keyup', function () {
                                var $this = $(this);
                                var val = $this.val().trim();
                                $anchor.attr('href', val);
                            });
                        }
                        ButtonText();
                        SetLinkType();
                        function hideshowelements(val) {
                            if (val === 'ext') {
                                $('.link_input').show();
                                $anchor.attr('data-link', 'external');
                                $('#linkTextURL').focus();
                                $('.divInternalLinkOptions').hide();
                                $parent.attr('link-type', 'ext');
                            }
                            else {
                                InternalLinkSetup();
                                $('.link_input').hide();
                                $anchor.attr('data-link', 'internal');
                                $('.divInternalLinkOptions').show();
                                $parent.attr('link-type', 'int');
                            }
                        }


                        function SetLinkType() {
                            $('#selectLink').val($parent.attr('link-type')).prop('selected', true);
                            hideshowelements($('#selectLink').val());
                            $('#linkTextURL').off('keyup').on('keyup', function () {
                                var $this = $(this);
                                var val = $this.val().trim();
                                $anchor.attr('href', val);
                            });
                            $('#selectLink').off('change').on('change', function () {
                                let $this = $(this);
                                hideshowelements($this.val());
                            });
                        }
                        function InternalLinkSetup() {
                            let defaultOption = `<option value="Default" disabled selected>Select Page</option>`
                            let pageList = mailcomponent[$activeDOM.attr('data-type')].getPortalPages($activeDOM);
                            if (pageList.length !== 0) {
                                let options = '';
                                $.each(pageList, function (index, item) {
                                    options += `<option value=${item.PageName}>${item.PageName}</option>`
                                });
                                $('#slcInternalLinkOptions').html(options);
                                $('#slcInternalLinkOptions').prepend(defaultOption);
                            }
                            $('#slcInternalLinkOptions').val($parent.attr('data-page')).prop('selected', true);
                            $('#slcInternalLinkOptions').off('change').on('change', function () {
                                let $this = $(this);
                                let link = '';
                                link = CurrentHostURL +'/'+ $this.val();
                                $parent.attr('data-page', $this.val());
                                $anchor.attr('href', link);
                               /* if ($this.val() === 'home') {
                                    link = + $this.val();
                                    $parent.attr('data-page', $this.val());
                                } else {
                                    link = CurrentHostURL + $this.val();
                                    $parent.attr('data-page', $this.val());
                                }
                                //let thau = '';
                                //thau = $this.val() === 'home' ? '/Webbuilder/' : '/dashboard/';
                                //console.log(thau);
                                //$anchor.attr('href', WbHostURL + thau + $this.val());
                                $anchor.attr('href', link);
                                */
                            });
                        }
                        function ButtonText() {
                            let $text = $activeDOM.find('.link-btn');
                            let text = $text.text();
                            $('#btnlinkText').val(text);
                            $('#btnlinkText').off().on("change keyup paste click", function () {
                                let $this = $(this);
                                text = $this.val();
                                $text.text(text);
                                $this.val(text);
                            });
                            $('#btnlinkText').on('blur', function () {
                                if (text.trim() == ""){
                                    text = 'Enter Text';
                                    $text.text(text);
                                    $(this).val(text);
                                }
                            });
                        }
                        $('#lnkbtnwidth').AdvanceDimension({
                            targetParent: $activeDOM,
                            targetElem: '.btn-link-wrap',
                            options: {
                                max: 100,
                                types: ['width'],
                                unit: '%',
                                wLabel: 'component width'
                            }
                        });

                      //  lnkSetup();

                        $('#divTextStng').AdvanceTextSetting({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.link-btn'),

                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Spacing": {
                    "DOM": '<div id="lnk-btn-spc"></div>',
                    "onload": function ($ele) {
                        $('#lnk-btn-spc').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btn-link-wrap'),
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Alignment": {
                    "DOM": '<div id="divCompAlignment"></div>',
                    "onload": function ($item) {
                        $('#divCompAlignment').AdvanceAlignment({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: ['horizontal']
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                }

            }
        },
        "styleDOMs": {
            "tabs": {
                "Background": {
                    "DOM": "<div id='lnk-btn-bg'></div>",
                    "onload": function ($item) {
                        $('#lnk-btn-bg').AdvanceBackground({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btn-link-wrap'),
                            options: ["color"],
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Border": {
                    "DOM": "<div id='lnk-btn-bdr'></div>",
                    "onload": function ($item) {
                        $('#lnk-btn-bdr').AdvanceBorder({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btn-link-wrap')
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Box Radius": {
                    "DOM": '<div id="lnk-btn-br"></div>',
                    "onload": function ($ele) {
                        $('#lnk-btn-br').AdvanceBoxRadius({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btn-link-wrap')
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Box Shadow": {
                    "DOM": '<div id="lnk-btn-bs"></div>',
                    "onload": function ($ele) {
                        $('#lnk-btn-bs').AdvanceBoxShadow({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btn-link-wrap')
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },

            }
        },
        "remove": function ($cloneDOM) {

        }
    }
,    "logo": {        
        "componentname": "logo",
        "category": "basic",
        "icon": "fa fa-joomla",
        "info":"This component creates a default logo which will be replaced by the logo of your website.",
        "row": false,
        "hidden": false,
        "onload": function () { },
        "defaultdata": EasyLibrary.ReadDOM("logo/logoview", true),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (dropped)
            {
                $appendLayer.find('img').attr('src', EmailBasicToken.SiteLogo.SampleValue);
            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": `<div id="logoWidth"></div>
                            <div id="logoHeight"></div>`,
                    "onload": function ($ele) {                        
                        $('#logoWidth').AdvanceDimension({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: {
                                max: 100,
                                types: ['width'],
                                unit: '%'
                            }
                        });
                        $('#logoHeight').AdvanceDimension({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('img'),
                            options: {
                                types: ['height'],
                                unit: 'px'
                            }
                        });
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": `<div id="imgMargin"></div>
                            <div id="imgPadding"></div>`,
                    "onload": function ($item) {
                        $('#imgMargin').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.image-wrap'),
                            options: {
                                "margin": {
                                    "max": 80,
                                    "min": -80,
                                    "times": 5,
                                    "position": ["all", "top", "left", "bottom", "right"],
                                }
                            }
                        });
                        $('#imgPadding').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.image-wrap'),
                            options: {
                                "padding": {
                                    "max": 80,
                                    "min": 0,
                                    "times": 5,
                                    "position": ["all", "top", "left", "bottom", "right"]
                                }
                            }
                        });
                    },
                },
                "Box Shadow": {
                    "custom": true,
                    "DOM": `<div id="imgBoxShadow"></div>`,
                    "onload": function ($item) {
                        $('#imgBoxShadow').AdvanceBoxShadow({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('img'),
                            options: {
                            },
                        });
                    }
                },
            },
        },

        "remove": function ($cloneDOM) {
            $cloneDOM.find('.ml-logo').attr('src', EmailBasicToken.SiteLogo.Token);
        }
    }
,    "mail body": {
        "componentname": "mail body",
        "category": "layout",
        "icon": "",
        "row": true,
        "hidden": true,
        "defaultdata": "",
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
        },
        "settingDOMs": {
            "tabs": {
                "spacing": {
                    "DOM": '<div id="divBdySpacing"></div>',
                    "onload": function ($ele) {
                        $('#divBdySpacing').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: {
                                "padding": {
                                    "max": 100,
                                    "min": 0,
                                    "times": 1,
                                    "position": ["all", "top", "left", "bottom", "right"]
                                }
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
                    "DOM": '<div id="divBdyBgColor"></div>',
                    "onload": function ($ele) {
                        $('#divBdyBgColor').AdvanceBackground({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: ["color"],
                        })
                    }
                },
                "border": {
                    "DOM": '<div id="divBdyBorders"></div>',
                    "onload": function ($ele) {
                        $('#divBdyBorders').AdvanceBorder({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                        })
                    }
                },
                "box radius": {
                    "DOM": '<div id="divBdyBxRadius"></div>',
                    "onload": function ($ele) {
                        $('#divBdyBxRadius').AdvanceBoxRadius({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                        })
                    }
                },
            }
        },

    }
,    "password recovery": {
        "componentname": "password recovery",
        "category": "basic",
        "icon": "fa fa-link",
        "row": false,
        "hidden": false,
        "info": 'This component is for redirecting to the link that is manually inserted from the setting.',
        "onload": function () { },
        "defaultdata": EasyLibrary.ReadDOM("btnrecovery/view", false),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (dropped) {

            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("btnrecovery/basic", false),
                    "onload": function ($item) {
                        ButtonText();
                        function ButtonText() {
                            let $text = $activeDOM.find('.btn-recovery')
                            let text = $text.text();
                            $('#recoveryText').val(text);
                            $('#recoveryText').off().on("change keyup paste click", function () {
                                let $this = $(this);
                                text = $this.val();
                                $text.text(text);
                                $this.val(text);
                            });
                            $('#recoveryText').on('blur', function () {
                                if (text.trim() == "") {
                                    text = 'Enter Text';
                                    $text.text(text);
                                    $(this).val(text);
                                }
                            });
                        }
                        $('#lnkbtnwidth').AdvanceDimension({
                            targetParent: $activeDOM,
                            targetElem: '.btn-link-wrap',
                            options: {
                                max: 100,
                                types: ['width'],
                                unit: '%',
                                wLabel: 'component width'
                            }
                        });
                        $('#divTextStng').AdvanceTextSetting({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btn-recovery'),

                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Spacing": {
                    "DOM": '<div id="lnk-btn-spc"></div>',
                    "onload": function ($ele) {
                        $('#lnk-btn-spc').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btn-link-wrap'),
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Alignment": {
                    "DOM": '<div id="divCompAlignment"></div>',
                    "onload": function ($item) {
                        $('#divCompAlignment').AdvanceAlignment({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: ['horizontal']
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                }

            }
        },
        "styleDOMs": {
            "tabs": {
                "Background": {
                    "DOM": "<div id='lnk-btn-bg'></div>",
                    "onload": function ($item) {
                        $('#lnk-btn-bg').AdvanceBackground({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btn-link-wrap'),
                            options: ["color"],
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Border": {
                    "DOM": "<div id='lnk-btn-bdr'></div>",
                    "onload": function ($item) {
                        $('#lnk-btn-bdr').AdvanceBorder({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btn-link-wrap')
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Box Radius": {
                    "DOM": '<div id="lnk-btn-br"></div>',
                    "onload": function ($ele) {
                        $('#lnk-btn-br').AdvanceBoxRadius({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btn-link-wrap')
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Box Shadow": {
                    "DOM": '<div id="lnk-btn-bs"></div>',
                    "onload": function ($ele) {
                        $('#lnk-btn-bs').AdvanceBoxShadow({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btn-link-wrap')
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },

            }
        },
        "remove": function ($cloneDOM) {
            let pageName = "password-recovery?recoveringcode=";
            let $this = $cloneDOM.find('[data-type="password recovery"]');
            $this.find('.btn-recovery').attr('href', CurrentHostURL + "/" + pageName + EmailBasicToken.UserActivationCode.Token);
        }
    }
,    "plain text": {
        "componentname": "plain text",
        "category": "basic",
        "icon": "fa fa-text-width",
        "row": false,
        "hidden": false,
        "info": 'This component creates an editable textbox which can only be changed in editor mode.',
        "onload": function () {

        },
        "defaultdata": EasyLibrary.ReadDOM("plainText/textView", false),        
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
           
        },
        "eventlistner": function ($parent) {          
            let menuArr = new Array();
            let Tokens = Object.keys(EmailBasicToken);
            let len = Tokens.length;
            for (let i = 0; i < len; i++) {
                let token = EmailBasicToken[Tokens[i]];
                if (token.Type == 'basic') {
                    menuArr.push({ text: Tokens[i], attr: 'data-val="' + token.Token + '"' });
                }
            }
            let compName = $parent.attr('data-type');
            $parent.find('.txt-wrp').CreateContextMenu({
                title: 'Mail Merge Tags',
                onMenuClick: function ($this, range) {
                    /*var $txtarea = $parent.find('.txt-wrp');                    
                    var textAreaTxt = $txtarea.html();                           
                    $txtarea.html((textAreaTxt.substring(0, range.startOffset).replace(/&/g, '') + ' ' + $this.attr('data-val') + ' ' + textAreaTxt.substring(range.startOffset)).replace(/nbsp;/g, '').replace(/&/g, ''));                   
                    mailcomponent[compName].restoreSelection(range);                    
                    */
                    document.getElementById('txt_area');
                    insertToken($this.attr('data-val'),range);

                },
                menuItem: menuArr
            });
           // $parent.find('.txt-wrp').LineBreakOverride();

            function insertToken(html,range) {
                var sel;
                if (window.getSelection) {
                    // IE9 and non-IE
                    sel = window.getSelection();
                    if (sel.getRangeAt && sel.rangeCount) {                       
                        range.deleteContents();
                        // Range.createContextualFragment() would be useful here but is
                        // non-standard and not supported in all browsers (IE9, for one)
                        var el = document.createElement("div");
                        el.innerHTML = html;
                        var frag = document.createDocumentFragment(), node, lastNode;
                        while ((node = el.firstChild)) {
                            lastNode = frag.appendChild(node);
                        }
                        range.insertNode(frag);

                        // Preserve the selection
                        if (lastNode) {
                            range = range.cloneRange();
                            range.setStartAfter(lastNode);
                            range.collapse(true);
                            sel.removeAllRanges();
                            sel.addRange(range);
                        }
                    }
                } else if (document.selection && document.selection.type != "Control") {
                    // IE < 9
                    document.selection.createRange().pasteHTML(html);
                }
            }
        },

        "saveSelection": function () {
            var range = null;
            if (window.getSelection) {
                sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                   return sel.getRangeAt(0);
                }
            } else if (document.selection && document.selection.createRange) {
                return document.selection.createRange();
            }
            return null;
        },
		 
        "restoreSelection": function (range) {
            if (range) {
                if (window.getSelection) {
                    sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                } else if (document.selection && range.select) {
                    range.select();
                }
            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": '<div id="compWidth"></div><div id="txtbasicstng"></div>',
                    "onload": function ($item) {
                        $('#txtbasicstng').AdvanceTextSetting({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.txt-wrp'),
                            label: 'Font Size',
                        });
                        $('#compWidth').AdvanceDimension({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: {
                                max: 100,
                                types: ['width'],
                                unit: '%',
                                label: 'Entire Component Width'
                            }
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Spacing": {
                    "DOM": '<div id="txtspc"></div>',
                    "onload": function ($item) {
                        $('#txtspc').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.txt-wrp')
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Alignment": {
                    "DOM": '<div id="txtalgn"></div>',
                    "onload": function ($item) {
                        $('#txtalgn').AdvanceAlignment({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.txt-wrp'),
                            options: ['horizontal']
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                }

            }
        },
        "styleDOMs": {
            "tabs": {
                "Background": {
                    "DOM": "<div id='txtbg'></div>",
                    "onload": function ($item) {
                        $('#txtbg').AdvanceBackground({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.txt-wrp'),
                            options: ['color']
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },

                "Border": {
                    "DOM": "<div id='txtbdr'></div>",
                    "onload": function ($item) {
                        $('#txtbdr').AdvanceBorder({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.txt-wrp')
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Box Radius": {
                    "DOM": '<div id="txt-br"></div>',
                    "onload": function ($ele) {
                        $('#txt-br').AdvanceBoxRadius({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.txt-wrp')
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Box Shadow": {
                    "DOM": '<div id="txt-bs"></div>',
                    "onload": function ($ele) {
                        $('#txt-bs').AdvanceBoxShadow({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.txt-wrp')
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
    }
,    "rich text": {
        "componentname": "rich text",
        "category": "basic",
        "componentBlockDOM": "",
        "icon": "fa fa-file-text",
        "row": false,
        "info":"This component creates text area with text editor toolbar. The settings are applicable to selected text.",
        "hidden": false,
        "collection": true,
        "type": "element",
        "defaultdata": EasyLibrary.ReadDOM('richtext/view', false),      
        "eventlistner": function ($parent) {
           
            let menuArr = new Array();
            let Tokens = Object.keys(EmailBasicToken);
            let len = Tokens.length;
            for (let i = 0; i < len; i++) {
                let token = EmailBasicToken[Tokens[i]];
                if (token.Type == 'basic') {
                    menuArr.push({ text: Tokens[i], attr: 'data-val="' + token.Token + '"' });
                }
            }
			 
            let compName = $parent.attr('data-type');
            $parent.find('.mailRichText').LightTextEditor();
            $parent.find('.documenttext').CreateContextMenu({
                title: 'Mail Merge Tags',
                onMenuClick: function ($this, range) {
                  /*  mailcomponent[compName].restoreSelection(range);
                    var $txtarea = $parent.find('.documenttext');
                    var textAreaTxt = $txtarea.html();                                        
                    $txtarea.html((textAreaTxt.substring(0, range.startOffset).replace(/&/g, '') + ' ' + $this.attr('data-val') + ' ' + textAreaTxt.substring(range.startOffset)).replace(/nbsp;/g, ''));*/
                    document.getElementsByClassName('documenttext');
                    insertToken($this.attr('data-val'), range);
                },
                menuItem: menuArr
            });
            //$parent.find('.documenttext').LineBreakOverride();

            function insertToken(html, range) {
                var sel;
                if (window.getSelection) {
                    // IE9 and non-IE
                    sel = window.getSelection();
                    if (sel.getRangeAt && sel.rangeCount) {
                        
                        range.deleteContents();
                        // Range.createContextualFragment() would be useful here but is
                        // non-standard and not supported in all browsers (IE9, for one)
                        var el = document.createElement("div");
                        el.innerHTML = html;
                        var frag = document.createDocumentFragment(), node, lastNode;
                        while ((node = el.firstChild)) {
                            lastNode = frag.appendChild(node);
                        }
                        range.insertNode(frag);

                        // Preserve the selection
                        if (lastNode) {
                            range = range.cloneRange();
                            range.setStartAfter(lastNode);
                            range.collapse(true);
                            sel.removeAllRanges();
                            sel.addRange(range);
                        }
                    }
                } else if (document.selection && document.selection.type != "Control") {
                    // IE < 9
                    document.selection.createRange().pasteHTML(html);
                }
            }
        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (dropped) {
                $appendLayer.find('.mailRichText').LightTextEditor();                
            }                    
        },
        "restoreSelection": function (range) {
            if (range) {
                if (window.getSelection) {
                    sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                } else if (document.selection && range.select) {
                    range.select();
                }
            }
        },
        "settingDOMs": {
            "tabs": {
                "Spacing": {
                    "DOM": '<div id="rchtxtspc"></div>',
                    "onload": function ($item) {
                        $('#rchtxtspc').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.documenttext')
                        })
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
                "Background": {
                    "DOM": "<div id='rchtxtbg'></div>",
                    "onload": function ($item) {
                        $('#rchtxtbg').AdvanceBackground({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.documenttext'),
                            options: ['color']
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },

                "Border": {
                    "DOM": "<div id='rchtxtbdr'></div>",
                    "onload": function ($item) {
                        $('#rchtxtbdr').AdvanceBorder({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.documenttext')
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Box Radius": {
                    "DOM": '<div id="rchtxt-br"></div>',
                    "onload": function ($ele) {
                        $('#rchtxt-br').AdvanceBoxRadius({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.documenttext')
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Box Shadow": {
                    "DOM": '<div id="rchtxt-bs"></div>',
                    "onload": function ($ele) {
                        $('#rchtxt-bs').AdvanceBoxShadow({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.documenttext')
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },

            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "remove": function ($viewDom) {
            $('.alloptionC.rotate').trigger('click');
            $viewDom.find('.text-editor-toolsbar').remove();
        },
    }
,    "row": {
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
,    "salutations": {
        "componentname": "salutations",
        "category": "basic",
        "icon": "fa fa-file-text",
        "row": false,
        "hidden": false,
        "info": 'Salutations Component',
        "onload": function () {

        },
        "pageload": function () {
            this.inheritSettings();
        },
        "inheritSettings": function () {
            let salutations = this;
            let text = mailcomponent['plain text'];
            salutations['settingDOMs'] = text.settingDOMs;
            salutations['styleDOMs'] = text.styleDOMs;
            salutations['eventlistner'] = text.eventlistner;
            salutations['saveSelection'] = text.saveSelection;
            salutations['restoreSelection'] = text.restoreSelection;
        },
        "defaultdata": EasyLibrary.ReadDOM("salutations/viewDOM", false),
        "eventlistner": function ($parent) {
            let menuArr = new Array();
            let Tokens = Object.keys(EmailBasicToken);
            let len = Tokens.length;
            for (let i = 0; i < len; i++) {
                let token = EmailBasicToken[Tokens[i]];
                if (token.Type == 'basic') {
                    menuArr.push({ text: Tokens[i], attr: 'data-val="' + token.Token + '"' });
                }
            }
            let compName = $parent.attr('data-type');
            $parent.find('.txt-wrp').CreateContextMenu({
                title: 'Mail Merge Tags',
                onMenuClick: function ($this, range) {
                    var $txtarea = $parent.find('.txt-wrp');
                    var textAreaTxt = $txtarea.html();
                    $txtarea.html((textAreaTxt.substring(0, range.startOffset).replace(/&/g, '') + ' ' + $this.attr('data-val') + ' ' + textAreaTxt.substring(range.startOffset)).replace(/nbsp;/g, ''));
                    mailcomponent[compName].restoreSelection(range);
                },
                menuItem: menuArr
            });
        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            this.inheritSettings();
        },
    }
,    "sociallink": {
        "componentname": "sociallink",
        "category": "basic",
        "icon": "fa fa-share-alt",
        "row": false,
        "info": "Social Share Component.",
        "hidden": false,
        "onload": function () { },
        "defaultdata": EasyLibrary.ReadDOM("sociallink/socialview", false),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (dropped) {
                $appendLayer.find('.sociallink').each(function () {
                    let $this = $(this).find('img');
                    let currentSrc = $this.attr('src');
                    $this.attr('src', CurrentHostURL + '/' + currentSrc);
                });
            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM('sociallink/basicSetting',false),
                    "onload": function ($item) {
                        let $parent = $activeDOM;
                        $('.actEle').removeClass('actEle');
                        Init();
                        function Init() {
                            setItems();
                            LoadSetting();
                            ChangeEvent();
                            sortable();
                        }
                        function setItems() {
                            let settingDOM = $('#socialSetting').html();
                            let htmlDOM = "";
                            $parent.find('.sociallink').each(function (index,value) {
                                let $this = $(this);
                                let name = $this.attr('data-name');
                                let id = name.split(" ").join("");
                                let $itemname = $('#socialSetting').find('.settingitem').eq(index);
                                if ($this.css('display')=="none") {
                                    $itemname.find('.linkURL ').hide();
                                }
                                $itemname.find('.itemname').text(name)
                                          .end()
                                          .find('.toggleItem input').attr('id', "toggle" + id)
                                          .end()
                                          .find('.toggleItem label').attr('for', "toggle" + id)
                                          .end()
                                          .find('.inputURL input').attr('id', id + "URL")
                                          .attr('placeholder', name + " URL")
                                          .end();
                            })
                        }
                        function LoadSetting() {
                            checkProp('#toggleFacebook', '.facebooklink', '#FacebookURL');
                            checkProp('#toggleGooglePlus', '.googleplus', '#GooglePlusURL');
                            checkProp('#toggleTwitter', '.twitterlink', '#TwitterURL');
                            checkProp('#toggleLinkedIn', '.linkedinlink', '#LinkedInURL');
                            checkProp('#toggleYoutube', '.youtube', '#YoutubeURL');
                            checkProp('#togglePinterest', '.pinterest', '#PinterestURL');
                            checkProp('#toggleInstagram', '.instagram', '#InstagramURL');
                            function checkProp(ID, className, InputID) {
                                $(InputID).val($parent.find(className).find('a').attr('href'));
                                if ($parent.find(className).css('display') == "none") {
                                    $(ID).prop('checked', false);
                                    $(ID).closest('.social-site').find('.linkURL').hide();
                                }
                                else {
                                    $(ID).prop('checked', true);
                                    $(ID).closest('.social-site').find('.linkURL').show();
                                }
                            }
                        }
                        function ChangeEvent() {
                            toogleProp('#toggleFacebook', '.facebooklink');
                            toogleProp('#toggleGooglePlus', '.googleplus');
                            toogleProp('#toggleTwitter', '.twitterlink');
                            toogleProp('#toggleLinkedIn', '.linkedinlink');
                            toogleProp('#toggleInstagram', '.instagram');
                            toogleProp('#toggleYoutube', '.youtube');
                            toogleProp('#togglePinterest', '.pinterest');
                            function toogleProp(ID, className) {
                                $(ID).off().on('click', function () {
                                    if ($(this).is(':checked')) {
                                        $(ID).closest('.setting-item').find('.linkURL').show();
                                        $parent.find(className).css('display','inline-block');
                                    }
                                    else {
                                        $(ID).closest('.setting-item').find('.linkURL').hide();
                                        $parent.find(className).css('display', 'none');
                                    }
                                })
                            }
                        }
                        setURL();
                        function setURL() {
                            url('.twitterlink a', '#TwitterURL');
                            url('.googleplus a', '#GooglePlusURL');
                            url('.facebooklink a', '#FacebookURL');
                            url('.linkedinlink a', '#LinkedInURL');
                            url('.youtube a', '#YoutubeURL');
                            url('.pinterest a', '#PinterestURL');
                            url('.instagram a', '#InstagramURL');
                            function url(className,ID) {
                                $(ID).off().on("change keyup paste click", function () {
                                    $parent.find(className).attr('href', $(this).val().trim());
                                });
                            }
                        }
                        function sortable() {
                            $("#socialSetting").AdvanceSorting({
                                targetParent: $parent.find('.sociallink-items'),
                                targetElem: '.sociallink', //view
                                sortableOptions: {
                                    items: "> div.setting-item", //editor
                                    handle: ".sortHandle", //editor
                                    containment: '#socialSetting' //editor
                                }
                            });
                        }
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Size": {
                    "DOM": '<div id="socialWidth"></div><div id="iconsetting"></div>',
                    "onload": function ($ele) {
                        let $parent = $activeDOM;
                        $('.actEle').removeClass('actEle');
                        let $img = $parent.find('.sociallink img');
                        $('#iconsetting,#socialWidth').html('');
                        $('#socialWidth').AdvanceDimension({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: {
                                types: ['width'],
                                max: 100,
                                unit:'%',
                                wLabel: 'component size',
                              
                            }
                        });
                        $('#iconsetting').AdvanceDimension({
                            targetParent: $activeDOM,
                            targetElem: '.sociallink ',
                            options: {
                                types: ['width'],
                                max: 100,
                                unit:'%',
                                wLabel: 'icon size',
                            }
                        });
                    },
                     "active": function () {
                         $('.actEle').removeClass('actEle');
                         $activeDOM.addClass('actEle');
                     }
                },
                "Spacing": {
                    "DOM": EasyLibrary.ReadDOM("sociallink/spacing"),
                    "onload": function ($ele) {
                        $($('#selSpacing').val()).addClass('actEle');
                        spacing();
                        $('#selSpacing').off().on('change', function () {
                            $('.actEle').removeClass('actEle');
                            $activeDOM.find($(this).val()).addClass('actEle');
                            spacing();
                        })
                        function spacing() {
                            $('#addressSpacing').html('');
                            $('#addressSpacing').AdvanceSpacing({
                                targetParent: $activeDOM,
                                targetElem: $('#selSpacing').val(),

                                options: {
                                    "margin": {
                                        "max": 100,
                                        "min": -100,
                                        "times": 1,
                                        "position": ["all", "top", "left", "bottom", "right"]
                                    },
                                    "padding": {
                                        "max": 100,
                                        "min": 0,
                                        "times": 1,
                                        "position": ["all", "top", "left", "bottom", "right"]
                                    },
                                }
                            });
                        }
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Alignment": {
                    "DOM": '<div id="socialAlign"></div>',
                    "onload": function ($ele) {
                        $('#socialAlign').AdvanceAlignment({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: ['horizontal']
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
                "Background": {
                    "DOM": '<div id="socialBG"></div>',
                    "onload": function ($ele) {
                        $('#socialBG').AdvanceBackground({
                            targetParent: $activeDOM,
                            targetElem: '.sociallink-items',
                            options: ["color"],
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Border": {
                    "DOM": '<div id="socialBorder"></div>',
                    "onload": function ($ele) {
                        $('#socialBorder').AdvanceBorder({
                            targetParent: $activeDOM,
                            targetElem: '.sociallink-items',
                            options: {
                                "max": 20,
                                "min": 0,
                                "times": 1,
                                "position": ["all", "top", "right", "bottom", "left"],
                            }
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Box radius": {
                    "DOM": '<div id="socialradius"></div>',
                    "onload": function ($ele) {
                        $('#socialradius').AdvanceBoxRadius({
                            targetParent: $activeDOM,
                            targetElem: '.sociallink-items',
                            options: {
                                "max": 50,
                                "min": 0,
                                "times": 1,
                                "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                            }
                        })
                    }
                },
                "Box shadow": {
                    "DOM": '<div id="sociallinkSha"></div>',
                    "onload": function ($ele) {
                        $('#sociallinkSha').AdvanceBoxShadow({
                            targetParent: $activeDOM,
                            targetElem: '.sociallink-items',
                        })
                    }
                },
            }
        }
    }
,    "underline": {
        "componentname": "underline",
        "category": "basic",
        "componentBlockDOM": "",
        "icon": "fa fa-file-text",
        "row": false,
        "info": "underline component",
        "hidden": false,
        "collection": true,
        "type": "element",
        "pageload": function () {
            this.inheritSettings();
        },
        "defaultdata": EasyLibrary.ReadDOM('underline/data', false),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": '<div id="underlineWidth"></div><div id="underlineHeight"></div><div id="underlineClr"></div>',
                    "onload": function ($item) {
                        $('#underlineClr').AdvanceBackground({
                            targetParent: $activeDOM,
                            targetElem: '.mail-underline',
                            options: ["color"],
                        });
                        $('#underlineWidth').AdvanceDimension({
                            targetParent: $activeDOM,
                            targetElem: '.mail-underline',
                            options: {
                                wLabel: 'width',
                                max:100,
                                types: ['width'],
                                unit:'%'
                            }
                        });
                        $('#underlineHeight').AdvanceDimension({
                            targetParent: $activeDOM,
                            targetElem: '.mail-underline',
                            options: {
                                min: 1,
                                max:100,
                                hLabel: 'height',
                                types: ['height'],
                                unit: 'px'
                            }
                        });
                    }
                },
                "Spacing": {
                    "DOM": '<div id="underlineSpacing"></div>',
                    "onload": function ($ele) {
                        $('#underlineSpacing').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Alignment": {
                    "DOM": '<div id="underlineAlign"></div>',
                    "onload": function ($item) {
                        $('#underlineAlign').AdvanceAlignment({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: ['horizontal']
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                }
            }
        }
    }
,    "unsubscribe link": {
        "componentname": "unsubscribe link",
        "category": "basic",
        "icon": "fa fa-ban",
        "row": false,
        "hidden": false,
        "info": 'This component provide unsubscribe links in email.',
        "onload": function () {
            this.inheritSettings()
        },
        "defaultdata": EasyLibrary.ReadDOM("unsubscribe/view", false),        
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (dropped) {
                this.inheritSettings();
                $appendLayer.find('.txt-wrp').attr('href', CurrentHostURL+'/unsubscribe/user/'+ EmailBasicToken['UnsubscribeLink'].Token);
            }
        },
        "inheritSettings": function () {
            let thisComp = this;
            let plainText = mailcomponent['plain text'];
            thisComp['settingDOMs'] = plainText.settingDOMs;
            thisComp['restoreSelection'] = plainText.restoreSelection;
            thisComp['styleDOMs'] = plainText.styleDOMs;            
            //thisComp['eventlistner'] = plainText.eventlistner;
        },
        "remove": function () {
            $('.unsubscribelink-comp a').attr('href', CurrentHostURL + '/unsubscribe/user/' + EmailBasicToken['UnsubscribeLink'].Token);
        }
    }
,    "user activation": {
        "componentname": "user activation",
        "category": "basic",
        "icon": "fa fa-check",
        "row": false,
        "hidden": false,
        "info": 'This component create the user activation link.',
        "onload": function () { },
        "defaultdata": EasyLibrary.ReadDOM("activateuser/view", false),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (dropped) {

            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("activateuser/basic", false),
                    "onload": function ($item) {
                        ButtonText();
                        function ButtonText() {
                            let $text = $activeDOM.find('.btnActRegUser')
                            let text = $text.text();
                            $('#recoveryText').val(text);
                            $('#recoveryText').off().on("change keyup paste click", function () {
                                let $this = $(this);
                                text = $this.val();
                                $text.text(text);
                                $this.val(text);
                            });
                            $('#recoveryText').on('blur', function () {
                                if (text.trim() == "") {
                                    text = 'Enter Text';
                                    $text.text(text);
                                    $(this).val(text);
                                }
                            });
                        }
                        $('#lnkbtnwidth').AdvanceDimension({
                            targetParent: $activeDOM,
                            targetElem: '.btn-link-wrap',
                            options: {
                                max: 100,
                                types: ['width'],
                                unit: '%',
                                wLabel: 'component width'
                            }
                        });
                        $('#divTextStng').AdvanceTextSetting({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btnActRegUser'),

                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Spacing": {
                    "DOM": '<div id="lnk-btn-spc"></div>',
                    "onload": function ($ele) {
                        $('#lnk-btn-spc').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btn-link-wrap'),
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Alignment": {
                    "DOM": '<div id="divCompAlignment"></div>',
                    "onload": function ($item) {
                        $('#divCompAlignment').AdvanceAlignment({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: ['horizontal']
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                }

            }
        },
        "styleDOMs": {
            "tabs": {
                "Background": {
                    "DOM": "<div id='lnk-btn-bg'></div>",
                    "onload": function ($item) {
                        $('#lnk-btn-bg').AdvanceBackground({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btn-link-wrap'),
                            options: ["color"],
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Border": {
                    "DOM": "<div id='lnk-btn-bdr'></div>",
                    "onload": function ($item) {
                        $('#lnk-btn-bdr').AdvanceBorder({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btn-link-wrap')
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Box Radius": {
                    "DOM": '<div id="lnk-btn-br"></div>',
                    "onload": function ($ele) {
                        $('#lnk-btn-br').AdvanceBoxRadius({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btn-link-wrap')
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Box Shadow": {
                    "DOM": '<div id="lnk-btn-bs"></div>',
                    "onload": function ($ele) {
                        $('#lnk-btn-bs').AdvanceBoxShadow({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btn-link-wrap')
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },

            }
        },
        "remove": function ($cloneDOM) {
            let pageName = "user-verification?activationcode=";
            $cloneDOM.find('.btnActRegUser').attr('href', CurrentHostURL + "/" + pageName + EmailBasicToken.UserActivationCode.Token);
        }
    }
,}
