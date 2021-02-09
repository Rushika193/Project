var icon_text = {
    "icon text": {
        "componentname": "icon text",
        "category": "basic",
        "icon": "icon-text-icon-list",
        "row": false,
        "hidden": false,
        "collection": true,
        "bucket": true,
        "type": "element",
        "defaultdata": EasyLibrary.ReadDOM("iconText/icontext"),
        "beforeDrop": function ($this) { },
        "afterdrop": function ($appendedParent, $appendLayer) { },

        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("orderlistbasic"),
                    "onload": function ($this) {
                        let _thisComp = component["icon text"];
                        let $parent = $this.closest('.editor-component');
                        let dataClass = $parent.find('.ListData').attr('data-class');
                        let showIcon = $parent.find('.ListData').attr('data-showicon');
                        $('#itemsperow').val(dataClass);
                        if (showIcon == "true") {
                            $('#iconshown').show();
                            $('#showListIcon').prop('checked', true);
                        }
                        else {
                            $('#iconshown').hide();
                            $('#showListIcon').prop('checked', false);
                        }
                        InitEvent();
                        Icon();
                        //textSetting();
                        //gutterSpace();
                        _thisComp.common.textSetting();
                        //_thisComp.common.gutterSpace();
                        function InitEvent() {
                            $('#itemsperow').on('change', function () {
                                let $this = $(this);
                                let colClass = $this.val();
                                let $listData = $parent.find('.ListData');
                                let $listDataItem = $listData.find('li');
                                let dataClass = $listData.attr('data-class');
                                $listDataItem.removeClass(dataClass);
                                $listDataItem.addClass(colClass);
                                $parent.find('.ListData').attr('data-class', colClass);
                                //gutterSpace();
                                //_thisComp.common.gutterSpace();

                            });
                            $('#showListIcon').off('change').on('change', function () {
                                if ($(this).is(":checked")) {
                                    $parent.find('.labelIcon').show();
                                    $('#iconshown').show();
                                    $parent.find('.ListData').attr('data-showicon', true);
                                }
                                else {
                                    $parent.find('.labelIcon').hide();
                                    $('#iconshown').hide();
                                    $parent.find('.ListData').attr('data-showicon', false);
                                }

                            });
                            $("#icontextWidth").AdvanceDimension({
                                type: 'sfwidth',
                                targetParent: $activeDOM,
                                targetElem: $activeDOM,
                                label: 'Width',
                                defaultValue: 100,
                            });
                        }
                        function Icon() {
                            let $parent = $this.closest('.editor-component');
                            let backgroundColor = $parent.find('.labelIcon').eq(0).css('color');
                            let fontWidth = $parent.find('.labelIcon').eq(0).css('font-size').replace('px', '');

                            let prevhovereffect = $parent.attr('data-prevhovereffect');
                            if (typeof prevhovereffect !== 'undefined') {
                                let tmpEff = JSON.parse(prevhovereffect);
                                if (tmpEff.font) {
                                    backgroundColor = tmpEff.font;
                                }
                            }

                            $('#chooseFontColorForListIcon').css('background-color', backgroundColor);
                            let colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    let objColor = RenderCallBackColor(this);
                                    $parent.find('.labelIcon').css('color', objColor.bgColor);
                                }
                            });
                            $('#chooseFontColorForListIcon').colorPicker(colorPickerOption);
                            component["icon text"].common.iconsize();
                        }
                    }
                },

                "Data": {
                    "DOM": EasyLibrary.ReadDOM("iconText/icontextdatawrap"),
                    "staticDOM": {
                        linklabelionresetlist: EasyLibrary.ReadDOM("linklabelionresetlist"),
                        linklabelionlist: EasyLibrary.ReadDOM("linklabelionlist")
                    },
                    "onload": function ($this) {
                        let _this = this;
                        let $parent = $this.closest('.editor-component');
                        let eleClasses = '';
                        let eleIndex = -1;
                        InitEvent();
                        function InitEvent() {
                            LoadSettings();
                            FormEvent();
                        }
                        function LoadSettings() {
                            let html = '';
                            $(".iconTextDataWrapper").html('');
                            let defaultIcon = "fa-check";
                            let $iconTextWrap = $parent.find(".iconTextWrap");
                            if ($iconTextWrap.length > 0) {
                                defaultIcon = $iconTextWrap.eq(0).find('i').attr('data-class');
                            }
                            //for changing all font
                            html += '<div class="field-row">';
                            html += '<div class="field-row stElWrap col50-50">';
                            html += '<label class="fCol">Bulk icon change</label>';
                            html += '<span class="fCol TxAl-r">';
                            html += '<i class="in-form-icon fa ' + defaultIcon + '" id="resetlabelicon" data-class="' + defaultIcon + '"></i>';
                            html += '</span>';
                            html += '</div>';
                            html += '</div>';
                            html += '<div id="iconChHolder"></div>';

                            html += '<div class="iconTextContentWrapper field-row Mb-30">';
                            $iconTextWrap.each(function (index, item) {
                                let $labelText = $(this).find('.labelText').text();
                                let className = $(this).find('i').attr('data-class');
                                //let iconClass = $(this).find('i').attr('class');
                                //iconClass = iconClass.replaceAll(/([a-z]?)Fs-([0-9]+)/g, "");
                                //iconClass += " Fs-16 ";
                                html += '<div class="field-row data-row stElWrap col100">';
                                html += '<span class="sfCol_10 TxAl-c"><i class="fa fa-arrows-v iconTextSort"></i></span>';
                                html += '<span class="sfCol_10 TxAl-c"><i class="in-form-icon fa ' + className + ' labelIconEdit iconChooser" data-class="' + className + '"></i></span>';
                                html += '<span class="sfCol_70 cb_input"><input type="text" class="listLabelText required" value="' + $labelText + '" /></span>';
                                html += '<span class="sfCol_10 TxAl-r"><i title="delete" class="in-form-icon fa fa-trash-o delete-icon deleteLabel' + ($iconTextWrap.length > 1 ? '' : ' Dn') + '"></i></span>';
                                html += '</div>';
                            });
                            html += '</div>';
                            $(".iconTextDataWrapper").html(html);
                        }

                        function FormEvent() {
                            LabelSettings();
                            FontIcon();
                            SearchFontIcon();
                            $('#resetlabelicon').on('click', function () {
                                let $iconChHolder = $('#iconChHolder');
                                $('.data-row').find('.hideLabelIcon').trigger('click');
                                let fontHtml = '';
                                fontHtml += '<div class="LinkLabelResetIconList" style="display: none;">';
                                fontHtml += _this.staticDOM.linklabelionresetlist;
                                fontHtml += '</div>';
                                if ($iconChHolder.find('.LinkLabelResetIconList').length == 0)
                                    $iconChHolder.append(fontHtml);

                                FontResetIcon();
                                ResetFontIcon();

                                $iconChHolder.find(".LinkLabelResetIconList").show();
                                $('#fontResetIconCollection').find('li').removeClass('selected');
                                $('#fontResetIconCollection').find('li i[data-class="' + eleClasses + '"]').parent().addClass('selected');


                            });

                            $("#btnAddMoreLabel").off().on("click", function () {
                                $(".hideLabelIcon").trigger("click");
                                let html = '';
                                let $editHtml = '';
                                let $editParent = $(this).parent().parent().find('.iconTextDataWrapper');

                                if ($editParent.find('.data-row').length > 0) {
                                    let $editHtml = '';
                                    let $editParentObj = $editParent.find('.data-row').eq(0).clone();
                                    $editParentObj.find().removeClass('Dn');
                                    let attrClass = $editParentObj.attr('class');
                                    $editHtml += '<div class="' + attrClass + '">';
                                    $editHtml += $editParentObj.html();
                                    $editHtml += '</div>';
                                    $editParent.find('.iconTextContentWrapper').prepend($editHtml);
                                    //let $editRows = $editParent.find('.iconTextContentWrapper > .data-row');
                                    //$editRows.eq($editRows.length - 1).find("input").val($editParentObj.find("input").val());

                                    let $viewHtml = '';
                                    let $viewObj = $parent.find('.iconTextWrap').eq(0);
                                    $viewHtml += '<li class="' + $viewObj.attr("class") + '">';
                                    $viewHtml += $viewObj.html();
                                    $viewHtml += '</li>';
                                    $parent.find('.ListData').prepend($viewHtml);
                                    $("#iconTextEditWrapper .listLabelText:first").val($(".iconTextWrap:first").text().trim());
                                } else {
                                    let dataClass = $('#resetlabelicon').attr('data-class');
                                    let iconClass = 'fa ' + dataClass;
                                    let defaultText = 'your text here';
                                    html += '<div class="field-row data-row stElWrap col100">';
                                    html += '<span class="sfCol_10 TxAl-c"><i class="fa fa-arrows iconTextSort"></i></span>';
                                    html += '<span class="sfCol_10 TxAl-c"><i class="in-form-icon ' + iconClass + ' labelIcon labelIconEdit iconChooser" data-class="' + dataClass + '"></i></span>';
                                    html += '<span class="sfCol_70 cb_input"><input type="text" class="listLabelText required" value="' + defaultText + '" /></span>';
                                    html += '<span class="sfCol_10 TxAl-r"><i title="delete" class="in-form-icon fa fa-trash-o delete-icon deleteLabel Dn"></i></span>';
                                    html += '</div>';
                                    $editParent.find('.iconTextContentWrapper').prepend(html);

                                    let comHtml = '';
                                    comHtml += '<li class="iconTextWrap Mb-10 sfCol_100 sfFixed">';
                                    comHtml += ' <i class="fa onhovercolor labelIcon ' + iconClass + '" style="font-size: 18px; color: rgb(95, 96, 106); margin-right: 5px;" data-class="' + dataClass + '"></i>';
                                    comHtml += ' <label class="labelText" contenteditable="true">' + defaultText + '</label>';
                                    comHtml += '</li>';
                                    $parent.find('.ListData').prepend(comHtml);
                                }
                                $editParent.find('.deleteLabel').removeClass('Dn');
                                LabelSettings();
                                SettingEvents();
                            });
                        }

                        function FontIcon() {
                            $('#labelfontIconCollection').html(EasyLibrary.FontCollectionList());
                        }

                        function LabelSettings() {
                            //sortable
                            $('.iconTextSort').on('mousedown', function () {
                                $('.field-row').find('.hideLabelIcon').trigger('click');
                            });
                            $(".iconTextContentWrapper").AdvanceSorting({
                                targetParent: $parent,
                                targetElem: '.iconTextWrap',
                                sortableOptions: {
                                    items: "div.data-row",
                                    handle: ".iconTextSort",
                                    containment: 'div.iconTextContentWrapper'
                                }
                            });
                            //$(".iconTextContentWrapper").sortable({
                            //    placeholder: "ui-state-highlight",
                            //    items: "div.data-row",
                            //    handle: "i.iconTextSort",
                            //    containment: 'div.iconTextContentWrapper',
                            //    forcePlaceholderSize: true,
                            //    forceHelperSize: true,
                            //    tolerance: "pointer",
                            //    start: function (event, ui) {
                            //        //ui.placeholder.height(ui.item.height());
                            //        $('.field-row').find('.hideLabelIcon').trigger('click');
                            //        ui.item.startPos = ui.item.index();
                            //    },
                            //    stop: function (event, ui) {
                            //        let oldPos = ui.item.startPos;
                            //        let newPos = ui.item.index();
                            //        //console.log("Start position: " + oldPos);
                            //        //console.log("New position: " + newPos);
                            //        if (oldPos != newPos) {
                            //            let $newPosEl = $parent.find('.iconTextWrap').eq(newPos);
                            //            let $oldPosEl = $parent.find('.iconTextWrap').eq(oldPos);
                            //            if (oldPos > newPos) {
                            //                $oldPosEl.insertBefore($newPosEl);
                            //            } else {
                            //                $oldPosEl.insertAfter($newPosEl);
                            //            }
                            //        }
                            //    }
                            //});
                            $(".deleteLabel").off().on("click", function () {
                                let dataClass = $(this).parent().parent().find('.labelIcon').attr('data-class');
                                let index = $('.iconTextContentWrapper').find('.data-row').index($(this).parent().parent());
                                $parent.find('.iconTextWrap').eq(index).remove();
                                $(this).parent().parent().remove();
                                if ($('.iconTextContentWrapper').find('.data-row').length == 1) {
                                    $('.iconTextContentWrapper').find('.deleteLabel').addClass('Dn');
                                }
                            });

                            $(".listLabelText").off().on("blur keyup", function () {
                                let value = $(this).val().trim();
                                let $iconParent = $(this).parent().parent().parent().parent();
                                let index = $iconParent.find('.listLabelText').index($(this));
                                let $comEle = $parent.find('.labelText').eq(index);
                                $comEle.text(value);
                            });

                            $(".labelIconEdit").off().on("click", function () {
                                $('.field-row').find('.hideLabelIcon').trigger('click');

                                let $iconParent = $(this).parent().parent().parent().parent();
                                eleIndex = $iconParent.find('.labelIconEdit').index($(this));
                                eleClasses = $(this).attr('data-class');
                                let $iconListHolder = $(this).closest('.data-row');

                                if ($iconListHolder.find(".LinkLabelIconList").length == 0) {
                                    let fontHtml = '';
                                    fontHtml += '<div class="LinkLabelIconList col100">';
                                    fontHtml += _this.staticDOM.linklabelionlist;
                                    fontHtml += '</div>';
                                    $iconListHolder.after(fontHtml);
                                }
                                FontIcon();
                                $('#labelfontIconCollection').find('li').removeClass('selected');
                                $('#labelfontIconCollection').find('li i[data-class="' + eleClasses + '"]').parent().addClass('selected');
                                SearchFontIcon();
                            });
                        }

                        function FontResetIcon() {
                            $('#fontResetIconCollection').html(EasyLibrary.FontCollectionList());
                            ResetFontIcon();
                        }

                        function ResetFontIcon() {
                            $('#iconLabelResetSearch').on('keyup', function () {
                                let searchVal = $(this).val();
                                $('#fontResetIconCollection').find('li').each(function () {
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
                            $('#fontResetIconCollection').find('li').on('click', function () {
                                let chooseClass = $(this).find('i').attr('data-class');
                                let $bulkIcon = $('.iconTextDataWrapper').find('#resetlabelicon');
                                let dataClass = $bulkIcon.attr('data-class');
                                $bulkIcon.attr('data-class', chooseClass);
                                $bulkIcon.removeClass(dataClass);
                                $bulkIcon.addClass(chooseClass);
                                //let viewIcon = $parent.find('.labelIcon');
                                $parent.find('.ListData').find(".labelIcon").each(function (index, item) {
                                    let dataClass = $(this).attr('data-class');
                                    $(this).attr('data-class', chooseClass);
                                    $(this).removeClass(dataClass);
                                    $(this).addClass(chooseClass);
                                });
                                $('.iconTextDataWrapper .field-row').find('.labelIconEdit').each(function (index, item) {
                                    let dataClass = $(this).attr('data-class');
                                    $(this).attr('data-class', chooseClass);
                                    $(this).removeClass(dataClass);
                                    $(this).addClass(chooseClass);
                                });
                                $('#fontResetIconCollection').find('li').removeClass('selected');
                                $(this).addClass('selected');
                                eleClasses = chooseClass;
                                $(".hideLabelIcon").trigger("click");
                            });

                            $(".hideLabelIcon").on("click", function () {
                                $(this).closest(".LinkLabelResetIconList").hide();
                            });
                        }

                        function SearchFontIcon() {
                            $('#iconLabelSearchIcon').on('keyup', function () {
                                let searchVal = $(this).val();
                                $('#labelfontIconCollection').find('li').each(function () {
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
                            $('#labelfontIconCollection').find('li').on('click', function () {
                                let chooseClass = $(this).find('i').attr('data-class');
                                let $achorIcon = $parent.find('.labelIcon').eq(eleIndex);
                                let dataClass = $achorIcon.attr('data-class');
                                let $editIcon = $('.iconTextDataWrapper .data-row').eq(eleIndex).find('.labelIconEdit');
                                $editIcon.attr('data-class', chooseClass);
                                $editIcon.removeClass(dataClass);
                                $editIcon.addClass(chooseClass);
                                $achorIcon.attr('data-class', chooseClass);
                                $achorIcon.removeClass(dataClass);
                                $achorIcon.addClass(chooseClass);
                                $('#labelfontIconCollection').find('li').removeClass('selected');
                                $(this).addClass('selected');
                                eleClasses = chooseClass;
                                $(".hideLabelIcon").trigger("click");
                            });

                            $(".hideLabelIcon").on("click", function () {
                                $(this).closest(".LinkLabelIconList").remove();
                            });
                        }
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": '<div class="field-row"><div class="field-row stElWrap col50-50"><label class="fCol">Apply Spacing on</label><span class="fCol TxAl-r select__box"><select id="iconTextSpacing"><option value=".ListData">Entire Component</option><option value=".iconTextWrap">Item</option><option value=".labelIcon">Icon</option><option value=".labelText">Text</option></select></span></div></div><div id="icontextMSpacing"></div><div id="icontextPSpacing"></div>',
                    "onload": function ($item) {
                        component["icon text"].common.spacing();
                    },
                },
                "Alignment": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('iconText/alignment'),
                    "onload": function ($item) {
                        component["icon text"].common.alignment();
                    }
                },
                "Hover Effect": {
                    "custom": true,
                    "DOM": '<div class="field-row"><div class="field-row stElWrap col50-50"><label class="fCol">Apply Hover Effect on</label><span class="fCol TxAl-r select__box"><select id="iconTextHoverSetting"><option value=".ListData">Entire Component</option><option value=".iconTextWrap ">Item</option></select></span></div></div><div id="iconTextHover"></div>',
                    "onload": function ($item) {
                        let val = $("#iconTextHoverSetting").val();
                        hoverEffect();
                        $("#iconTextHoverSetting").off().on("change", function () {
                            val = $(this).val();
                            hoverEffect();
                        })
                        function hoverEffect() {
                            $("#iconTextHover").html("");
                            $("#iconTextHover").AdvanceHoverEffect({
                                targetParent: $activeDOM,
                                targetElem: val,
                                options: {
                                    "color": ["background"],
                                    "shadow": "on",
                                    "border": {
                                        "max": 20,
                                        "min": 0,
                                        "times": 1,
                                        "position": ["all", "top", "right", "bottom", "left"]
                                    }
                                }
                            });
                        }
                    },
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
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('iconText/background'),
                    "onload": function () {
                        let targetEle = $('#iconTextBgColor').val();
                        background();
                        $('#iconTextBgColor').off().on('change', function () {
                            targetEle = $(this).val();
                            $activeDOM.find('.actEle').removeClass('actEle')
                                .end()
                                .find(targetEle).addClass('actEle');
                            background();
                        });
                        function background() {
                            $('#iconTextBackground').html('');
                            $("#iconTextBackground").AdvanceBackground({
                                targetParent: $activeDOM.parent(),
                                targetElem: targetEle,
                                options: ["color"]
                            });
                        }
                    },
                    "active": function () {
                        $('#iconTextBackground').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#iconTextBackground').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
                "Border": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('iconText/border'),
                    "onload": function () {
                        let targetEle = $('#iconTextBdr').val();
                        border();
                        $('#iconTextBdr').off().on('change', function () {
                            targetEle = $(this).val();
                            $activeDOM.find('.actEle').removeClass('actEle')
                                .end()
                                .find(targetEle).addClass('actEle');
                            border();
                        });
                        function border() {
                            $('#iconTextBorder').html('');
                            $("#iconTextBorder").AdvanceBorder({
                                targetParent: $activeDOM.parent(),
                                targetElem: targetEle,
                                options: {
                                    "max": 20,
                                    "min": 0,
                                    "times": 1,
                                    "position": ["all", "top", "right", "bottom", "left"],
                                }
                            });
                        }
                    },
                    "active": function () {
                        $('#iconTextBorder').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#iconTextBorder').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
                "Box Radius":
                {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('iconText/borderRadius'),
                    "onload": function () {
                        let targetEle = $('#iconTextBdrRadius').val();
                        boxRadius();
                        $('#iconTextBdrRadius').off().on('change', function () {
                            targetEle = $(this).val();
                            $activeDOM.find('.actEle').removeClass('actEle')
                                .end()
                                .find(targetEle).addClass('actEle');
                            boxRadius();
                        });
                        function boxRadius() {
                            $('#iconTextRadius').html('');
                            $("#iconTextRadius").AdvanceBoxRadius({
                                targetParent: $activeDOM.parent(),
                                targetElem: targetEle,
                                options: {
                                    "max": 50,
                                    "min": 0,
                                    "times": 1,
                                    "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"],
                                }
                            });
                        }
                    },
                    "active": function () {
                        $('#iconTextRadius').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#iconTextRadius').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
                "Box Shadow":
                {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('iconText/shadow'),
                    "onload": function () {
                        let targetEle = $('#iconTextShadow').val();
                        shadow();
                        $('#iconTextShadow').off().on('change', function () {
                            targetEle = $(this).val();
                            $activeDOM.find('.actEle').removeClass('actEle')
                                .end()
                                .find(targetEle).addClass('actEle');
                            shadow();
                        });
                        function shadow() {
                            $('#iconTextSha').html('');
                            $("#iconTextSha").AdvanceBoxShadow({
                                targetParent: $activeDOM.parent(),
                                targetElem: targetEle,
                            });
                        }
                    },
                    "active": function () {
                        $('#iconTextSha').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#iconTextSha').trigger('change').addClass('slcActiveEleSetting');
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
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('iconText/iconTextResponsive'),
                    "onload": function () {
                        let _thisComp = component["icon text"];
                        let device = ViewDeviceAlpha();
                        let iconVisibility = $activeDOM.find(".ListData").attr("data-showicon");
                        if (iconVisibility === "true") {
                            $('#iconTextSetting option[value=".labelIcon"]').show();
                            $('#iconTextSpacing option[value=".labelIcon"]').show();
                        }
                        else {
                            $('#iconTextSetting option[value=".labelIcon"]').hide();
                            $('#iconTextSpacing option[value=".labelIcon"]').hide();
                        }
                        $("#iconTxtWidth").AdvanceDimension({
                            type: 'sfwidth',
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            label: 'Width',
                            defaultValue: 100,
                        });
                        $("#itemsperow").AdvanceItemsPerRow({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.iconTextWrap'),
                            label: 'Items per row',
                        });
                        _thisComp.common.textSetting();
                        //_thisComp.common.gutterSpace();
                        $('#itemsperow').on('change', function () {
                            let $this = $(this);
                            let colClass = $this.val();
                            let $listData = $activeDOM.find('.ListData');
                            let $listDataItem = $listData.find('li');
                            let dataClass = $listData.attr('data-class');
                            $listDataItem.removeClass(dataClass);
                            $listDataItem.addClass(colClass);
                            $activeDOM.find('.ListData').attr('data-class', colClass);
                            //_thisComp.common.gutterSpace();

                        });
                        $("#iconTextVisibility").html('');
                        $('#iconTextVisibility').AdvanceVisibility({
                            targetParent: $activeDOM.parent(),
                            targetElem: $activeDOM
                        });
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": '<div class="field-row"><div class="field-row stElWrap col50-50"><label class="fCol">Apply Spacing on</label><span class="fCol TxAl-r select__box"><select id="iconTextSpacing"><option value=".iconTextWrap">Item</option><option value=".labelIcon">Icon</option><option value=".labelText">Text</option></select></span></div></div><div id="icontextMSpacing"></div><div id="icontextPSpacing"></div>',
                    "onload": function ($item) {
                        component["icon text"].common.spacing();
                    },
                },
                "Alignment": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('iconText/alignment'),
                    "onload": function ($item) {
                        component["icon text"].common.alignment();
                    }
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "common": {
            "iconsize": function () {
                function WidthChange(space) {
                    ReplaceClassByPattern($activeDOM.find('.labelIcon'), 'Fs-[0-9]{1,4}', 'Fs-' + space);
                }
                AdvanceSageSlider($('#listfontsizeSlider'), $('#listfontsizeHandle'), 5, 1080,
                    GetValueByClassName($activeDOM.find('.labelIcon'), 'Fs-[0-9]{1,4}', 'Fs-'), WidthChange, $activeDOM, 'px');
            },
            "spacing": function () {
                let val = $("#iconTextSpacing").val();
                AdvanceSpacing();
                $("#iconTextSpacing").off().on("change", function () {
                    val = $(this).val();
                    $activeDOM.find('.actEle').removeClass('actEle')
                        .end()
                        .find(val).addClass('actEle');
                    AdvanceSpacing();
                });
                function AdvanceSpacing() {
                    $("#icontextPSpacing,#icontextMSpacing").html('');
                    $("#icontextMSpacing").AdvanceSpacing({
                        targetParent: $activeDOM,
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
                    $("#icontextPSpacing").AdvanceSpacing({
                        targetParent: $activeDOM,
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
                let val = $('#iconTextAlignment').val();
                alignment();
                $('#iconTextAlignment').off().on('change', function () {
                    val = $(this).val();
                    $activeDOM.find('.actEle').removeClass('actEle')
                        .end()
                        .find(val).addClass('actEle');
                    alignment();
                });
                function alignment() {
                    $("#iconTextAlign").html("");
                    $("#iconTextAlign").AdvanceAlignment({
                        targetParent: $activeDOM.parent(),
                        targetElem: val
                    });
                }
            },
            "textSetting": function () {
                let _this = this;
                let advanceTextVal = $("#iconTextSetting").val();
                textSetting();
                $("#iconTextSetting").off('change').on('change', function () {
                    advanceTextVal = $(this).val();
                    textSetting();
                    //_this.gutterSpace();
                });
                function textSetting() {
                    $("#iconTextSet").html("");
                    let options = {
                        width: false,
                    }
                    if (advanceTextVal === '.labelIcon') {
                        options = {
                            width: false,
                            style: false,
                            family: false,
                            weight: false,
                            transform: false,
                            spacing: false,
                            lineheight: false
                        };
                    }
                    if (advanceTextVal !== ".iconTextWrap ")
                        $("#iconTextSet").AdvanceTextSetting({
                            targetParent: $activeDOM,
                            targetElem: advanceTextVal,
                            options: options
                        });
                    if (advanceTextVal === '.labelIcon') {
                        $("#textSet_size .ui-slider-handle").attr("title", "Icon Size");
                        $("#textSet_color label:first").text("Icon Color");
                    };
                }

            },
            //"gutterSpace": function () {
            //    let advanceTextVal = $("#iconTextSetting").val();
            //    let itemsPerRow = parseInt($("#itemsperow option:selected").text())
            //    $("#iconTextGutter").html("");
            //    if (typeof (itemsPerRow) !== "undefined" && itemsPerRow > 1) {
            //        $("#gutterSpacing").show();
            //        $('#iconTextGutter').AdvanceGutterSpace({
            //            targetParent: $activeDOM,
            //            targetElem: advanceTextVal,
            //            itemsperrow: itemsPerRow,
            //            label: ["Horizontal", "Vertical"]
            //        });
            //    }
            //    else $("#gutterSpacing").hide();
            //}

        }
    }
};