var verticalcollectors = {
    "verticalcollectors": {
        "componentname": "verticalcollectors",
        "category": "pro",
        "icon": "fa fa-star",
        "row": true,
        "type": "collection",
        "typeicon": "fa fa-th",
        "hidden": true,
        "description": "Make the most out of Contentder’s website builder by reusing similar components across multiple sections with simple copy paste function, saving you a lot of time and effort of working on the same components again and again. Also, combine various dynamic components to make a new one with complete customizable features and present them in various styles.",
        "Screenshot": "https://easybuilder.contentder.com/ComponentScreenshot/row.jpg",
        "collection": false,
        "pageload": function () {
            this.commonStng.removeDeleteEvent($('.verticalcollector'));
            this.commonStng.createcomponent();
        },
        "defaultdata": EasyLibrary.ReadDOM("verticalcollectors/groupdefault"),
        "afterdrop": function ($appendedParent, $appendLayer, dropped, init) {
            let _this = this;
            var cardiconContainer = $appendLayer.find('.verticalcollector');
            if (dropped) {
                if ($appendLayer.find('.collectorItem').length === 0) {
                    var dataType = cardiconContainer.attr('data-type');
                    var defaultCount = parseInt(cardiconContainer.attr('data-cardperrow'));
                    var updatedDefaultData = component[dataType].defaultdata;
                    let compArr = [
                    { el: 'div.imagelink', cls: 'imagelink' },
                    { el: 'div.buttonWrapper', cls: 'buttonWrapper' },
                    { el: 'div.fontIconWrapper', cls: 'fontIconWrapper' },
                    { el: 'div.underline', cls: 'underline' },
                    { el: 'div.heading', cls: 'heading' },
                    { el: 'div.text', cls: 'text' },
                    { el: 'div.sociallink', cls: 'sociallink' },
                    { el: 'div.textlink', cls: 'textlink' }];
                    $.each(compArr, function (i, v) {
                        updatedDefaultData = $(updatedDefaultData).find(v.el).attr('data-ispro', true).attr('data-delcls', v.cls).end().wrapAll('<div />').parent().html();
                    });
                    //updatedDefaultData = $(updatedDefaultData).children('div.SetHdlr').remove().end().wrapAll('<div />').parent().html();
                    //updatedDefaultData = $(updatedDefaultData).children('div.SetHdlr').css('display', 'none').end().wrapAll('<div />').parent().html();
                    updatedDefaultData = $(updatedDefaultData).find('li.copyData').css('display','none').end().wrapAll('<div />').parent().html();
                    var itemsCount = cardiconContainer.attr('data-total');
                    let html = '';
                    if (init == undefined || typeof init == undefined) init = true;
                    if (init) {
                        for (var times = 0; times < itemsCount; times++) {
                            html += '<div class="sfFixed sfCol_33 tsfCol_50 msfCol_100 collectorItem">' + updatedDefaultData + '</div>';
                        }
                    }
                    cardiconContainer.append(html);
                    $appendLayer.find('.cGrid .sortComponent').remove();
                    $appendLayer.find('.verticalcollector .SetHdlr').addClass('no-drag');
                    //BindCopyEvents(cardiconContainer);
                    //let vcItems = $appendLayer.find('.collectorItem');
                    //vcItems.each(function (i) {
                    //    //component['verticalcollector'].afterdrop(cardiconContainer, $(this), true);
                    //});
                }
            }
            _this.commonStng.createcomponent();
            DeleteComponent($appendLayer);
            SettingEvents($appendLayer);
            _this.commonStng.removeDeleteEvent($appendLayer);
            component['verticalcollector'].afterdrop(cardiconContainer.parent(), cardiconContainer, true);
            let collectorCommon = component['verticalcollector'].collectorCommon;
            collectorCommon.deleteComponent($appendLayer.find('.buttonWrapper'));
            collectorCommon.deleteComponent($appendLayer.find('.fontIconWrapper'));
            collectorCommon.deleteComponent($appendLayer.find('.imagelink'));
            collectorCommon.deleteComponent($appendLayer.find('.underline'));
            collectorCommon.deleteComponent($appendLayer.find('.heading'));
            collectorCommon.deleteComponent($appendLayer.find('.text'));
            collectorCommon.deleteComponent($appendLayer.find('.sociallink'));
            collectorCommon.deleteComponent($appendLayer.find('.textlink'));
            //collectorCommon.getSetDataType.setType($appendLayer);
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM('verticalcollectors/basicAddOn') + `
                        <div class ="field-row stElWrap sfCol_100 addNewComp">
                                <span class ="sfCol_50 TxAl-l select__box">
                                    <select id="addCompoSelect">
                                        <option value="Image Link">Image Link</option>
                                        <option value="button">button</option>
                                        <option value="font icon">font icon</option>
                                        <option value="underline">underline</option>
                                        <option value="heading">heading</option>
                                        <option value="text">text</option>
                                        <option value="social link">social link</option>
                                        <option value="text link">text link</option>
                                    </select>
                                </span>
                                <span class ="sfCol_50 TxAl-r">
                                <span class =" btn cb-btn-primary" id="addCompo">Add</span>
                                </span>
                            </div>
                            <div class ="field-row stElWrap col100">
                                <label class ="fCol">Manage items position by dragging and manage visbility using toggle button below </label>
                            </div>
                            <div class ="eldestSetParent"></div>`,

                    "onload": function ($item) {
                        let dataTitle = $activeDOM.attr('data-title');
                        if (dataTitle !== undefined && dataTitle !== "verticalcollectors") {
                            $('.addNewComp').remove();
                        }
                        let $wrapper = $activeDOM.find('.verticalcollector');
                        let $eachWrapper = $wrapper.find('.componentWrap');
                        component['verticalcollector'].settingDOMs.tabs.Basic.onload('',true);
                        
                        $(".eldestSetParent").AdvanceSorting({
                            targetParent: $eachWrapper,
                            targetElem: '.sortableItem',
                            sortableOptions: {
                                items: '.draggable',
                                handle: ".sortHandle",
                                containment: $('.eldestSetParent'),
                                stop: function (event, ui) {
                                    let oldPos = ui.item.startPos;
                                    let newPos = ui.item.index();
                                    if (oldPos != newPos) {
                                        $eachWrapper.each(function (i) {
                                            let targets = $(this).find('.sortableItem');
                                            let $newPosEl = targets.eq(newPos);
                                            let $oldPosEl = targets.eq(oldPos);
                                            if (oldPos > newPos) {
                                                $oldPosEl.insertBefore($newPosEl);
                                            } else {
                                                $oldPosEl.insertAfter($newPosEl);
                                            }
                                        });
                                    }

                                }
                            },
                        });


                        let $topWrap = $activeDOM.find('.cGrid');
                        let $container = $activeDOM.find('div.editor-row-container');
                        let containerDiv = divStart('editor-row-container container-medium') + divEnd;
                        if ($container.length > 0) {
                            var conClass = $container.attr('class').replace('editor-row-container', '').trim();
                            $('#selContainerWidth').val(conClass);
                            $('#wrapContainer').prop('checked', true);
                            $('#additionalContainer').removeClass('Dn');
                        } else {
                            $('#wrapContainer').prop('checked', false);
                            $('#additionalContainer').addClass('Dn');
                        }
                        let collectionHeading = $activeDOM.find('.collectionHeading');
                        let topSubHeading = $activeDOM.find('.topSubHeading');
                        if (collectionHeading.hasClass('Dn')) {
                            $('#showTitle').prop('checked', false);
                        } else {
                            $('#showTitle').prop('checked', true);
                        }
                        if (topSubHeading.hasClass('Dn')) {
                            $('#showDescription').prop('checked', false);
                        } else {
                            $('#showDescription').prop('checked', true);
                        }

                        $('#showTitle').off('click').on('click', function () {
                            if ($(this).prop('checked'))
                                collectionHeading.removeClass('Dn');
                            else
                                collectionHeading.addClass('Dn');
                        });
                        $('#showDescription').off('click').on('click', function () {
                            if ($(this).prop('checked'))
                                topSubHeading.removeClass('Dn');
                            else
                                topSubHeading.addClass('Dn');
                        });
                        $('#wrapContainer').off('click').on('click', function () {
                            if ($(this).prop('checked')) {
                                $topWrap.wrapAll(containerDiv);
                                $('#additionalContainer').removeClass('Dn');
                                $('#selContainerWidth').val('container-medium');
                            } else {
                                $topWrap.unwrap();
                                $('#additionalContainer').addClass('Dn');
                            }
                        });
                        
                        $('#selContainerWidth').off('change').on('change', function () {
                            let v = $(this).val();
                            var $container = $activeDOM.find('.editor-row-container');
                            $container.removeClass('container-small').removeClass('container-medium').removeClass('container-large').removeClass('container-extralarge');
                            $container.addClass(v);
                        });
                    }
                },
                "Layout": {
                    "DOM": EasyLibrary.ReadDOM("verticalcollectors/layout"),
                    "onload": function ($item) {
                        let $allWrapper = $activeDOM.find('.verticalcollector');
                        let $targetElements = $allWrapper.children();
                        $('#totalcounter').text($targetElements.length);
                        $('#perRowDOM').AdvanceItemsPerRow({
                            targetParent: $allWrapper,
                            targetElem: $targetElements,
                            label: "Items Per Row",
                            callback: function (itemperrow) {
                                callGutter(itemperrow);
                            }
                        });
                        let itemperrow = $('#perRowDOM').find('select option:selected').text();
                        callGutter(itemperrow);
                        function callGutter(itemperrow) {
                            $('#gutterDOM').AdvanceGutterSpace({
                                targetParent: $allWrapper,
                                targetElem: $targetElements,
                                itemsperrow: itemperrow,
                            });
                        }
                        $('#addMore').off('click').on('click', Reasign);
                        $('#deleteLast').off('click').on('click', deleteLast);
                        function Reasign() {
                            $allWrapper.append($targetElements.eq(0).clone(true));
                            let cur = $('#totalcounter').text();
                            $('#totalcounter').text(parseInt(cur) + 1);
                            let setDOM = component['verticalcollectors'].settingDOMs.tabs;
                            setDOM.Basic.onload();
                            setDOM.Layout.onload();
                            setDOM.Size.onload();
                            setDOM.Spacing.onload();
                            setDOM.Alignment.onload();
                        }
                        function deleteLast() {
                            let $deleteThis = $activeDOM.find('.collectorItem');
                            let siblingsCount = $deleteThis.length;
                            if (siblingsCount > 1) {
                                SageConfirmDialog('This will remove the last data. Do you want to proceed ?').done(function () {
                                    $('#totalcounter').text(siblingsCount - 1);
                                    $deleteThis.last().remove();
                                });
                            }
                            else {
                                SageAlertDialog("You can't delete all items.");
                            }
                        }
                    }
                },
                "Size": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM("verticalcollector/size"),
                    "onload": function ($ele) {
                        component['verticalcollector'].settingDOMs.tabs.Size.onload();
                    },
                    "active": function () {
                        component['verticalcollector'].settingDOMs.tabs.Size.active();
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('verticalcollector/spaceSetting'),
                    "onload": function ($item) {
                        component['verticalcollector'].settingDOMs.tabs.Spacing.onload(1);
                    },
                    "active": function () {
                        component['verticalcollector'].settingDOMs.tabs.Spacing.active();
                    }
                },
                "Alignment": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('verticalcollector/alignmentSetting'),
                    "onload": function ($item) {
                        component['verticalcollector'].settingDOMs.tabs.Alignment.onload();
                    },
                    "active": function () {
                        component['verticalcollector'].settingDOMs.tabs.Alignment.active();
                    }
                },
            }
        },
        "styleDOMs": {
            "tabs": {
                "Border": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM("verticalcollector/border"),
                    "onload": function ($ele) {
                        component['verticalcollector'].styleDOMs.tabs.Border.onload('', true);
                    },
                    "active": function () {
                        component['verticalcollector'].styleDOMs.tabs.Border.active();
                    }
                },
                "Border Radius": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM("verticalcollector/borderRadius"),
                    "onload": function ($ele) {
                        component['verticalcollector'].styleDOMs.tabs['Border Radius'].onload();
                    },
                    "active": function () {
                        component['verticalcollector'].styleDOMs.tabs['Border Radius'].active();
                    }
                },
                "Box Shadow": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM("verticalcollector/shadow"),
                    "onload": function ($ele) {
                        component['verticalcollector'].styleDOMs.tabs['Box Shadow'].onload();
                    },
                    "active": function () {
                        component['verticalcollector'].styleDOMs.tabs['Box Shadow'].active();
                    }
                },
                "Color": {
                    "DOM": EasyLibrary.ReadDOM('verticalCollector/colorDOM'),
                    "onload": function ($elem) {
                        component['verticalcollector'].collectorCommon.colorHandler();
                    },
                    "active": function () {
                        component['verticalcollector'].styleDOMs.tabs.Color.active();
                    }
                }

            }

        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "Visibility": {},
                        "CustomVisibility": {
                            "custom": true,
                            "DOM": EasyLibrary.ReadDOM('verticalcollector/customVisibility'),
                            "onload": function () {
                                //component['verticalcollector'].responsiveDOMs.tabs.Basic.options.CustomVisibility.onload();
                                component['verticalcollector'].collectorCommon.getSetDataType.setType($activeDOM);
                                component['verticalcollector'].collectorCommon.fillDropDown();
                                component['verticalcollector'].collectorCommon.customVisibility();
                            }
                        }
                    }
                },
                "Layout": {
                    "DOM": EasyLibrary.ReadDOM("verticalcollectors/layout"),
                    "onload": function ($item) {
                        component['verticalcollectors'].settingDOMs.tabs.Layout.onload()
                    }
                },
                "Size": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM("verticalcollector/size"),
                    "onload": function ($ele) {
                        component['verticalcollector'].settingDOMs.tabs.Size.onload();
                    },
                    "active": function () {
                        component['verticalcollector'].settingDOMs.tabs.Size.active();
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('verticalcollector/spaceSetting'),
                    "onload": function ($item) {
                        component['verticalcollector'].settingDOMs.tabs.Spacing.onload()
                    },
                    "active": function () {
                        component['verticalcollector'].settingDOMs.tabs.Spacing.active();
                    }
                },
                "Alignment": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('verticalcollector/alignmentSetting'),
                    "onload": function ($item) {
                        component['verticalcollector'].settingDOMs.tabs.Alignment.onload();
                    },
                    "active": function () {
                        component['verticalcollector'].settingDOMs.tabs.Alignment.active();
                    }
                }
            }
        },
        "commonStng": {
            "createcomponent": function () {
                initevents();
                function initevents() {

                    $('.CreateComponent').off('click').on('click', function () {
                        $('.activeSetting').removeClass('.activeSetting');
                        let $parent = $(this).closest('.SetHdlr').parent();
                        $parent.addClass('activeSetting');
                        $activeDOM = $parent;
                        FullPagePopup({
                            data: EasyLibrary.ReadDOM("verticalcollectors/comoponentadd"),
                            heading: "Create a component",
                            showheading: true,
                            width: "60%",
                            height: "80%"
                        });
                        createcompo();
                    });
                }
                function createcompo() {
                    let newComponent = {
                        "componentname": "",
                        "category": "pro",
                        "type": "collection",
                        "collection": false,
                        "version": "2.0",
                        "dependencies": "",
                        "icon": "fa fa-star",
                        "row": true,
                        "hidden": false,
                        "defaultdata": '',
                        "typeicon": "fa fa-th",
                        "description": "Make the most out of Contentder’s website builder by reusing similar components across multiple sections with simple copy paste function, saving you a lot of time and effort of working on the same components again and again. Also, combine various dynamic components to make a new one with complete customizable features and present them in various styles.",
                        "Screenshot": "https://easybuilder.contentder.com/ComponentScreenshot/row.jpg",
                        "onDrop": function ($appendLayer) {
                        },
                        "beforeDrop": function ($this) {
                        },
                        "afterdrop": function ($appendedParent, $appendLayer, dropped, init) { },
                        "loadSetting": function ($item) {
                        },
                        "settingDOMs": {
                        },
                        "responsiveDOMs": component["verticalcollectors"].responsiveDOMs,

                    };
                    $("#btnCreateComponent").off('click').on("click", function () {                                            
                        newComponent.componentname = $('#txtCompName').val().trim();
                        newComponent.type = $('#txtCompType').val().trim();
                        newComponent.description = $('#txtCompDesc').val().trim();
                        newComponent.defaultdata = GetDefaultData(newComponent.componentname);
                        if (Validate()) {
                            $.ajax({
                                isPostBack: false,
                                async: false,
                                crossOrigin: true,
                                cache: false,
                                type: 'POST',
                                contentType: "application/json; charset=utf-8",
                                data: JSON2.stringify({
                                    componentValue: JSONStringify(newComponent),
                                    bucketName: newComponent.componentname,
                                    portalID: SageFramePortalID,
                                    userModuleID: webBuilderUserModuleID,
                                    userName: SageFrameUserName,
                                    secureToken: SageFrameSecureToken
                                }),
                                dataType: 'json',
                                crossDomain: true,
                                url: SageFrameHostURL + '/Builder/AddBucket',
                                success: function (data) {
                                    SageAlertDialog("Component added successfully.");
                                },
                                error: function () {
                                },
                            });
                        }
                        function Validate() {
                            if ($('#txtCompName').val().trim().length > 0 &&
                                $('#txtCompType').val().trim().length > 0 &&
                                $('#txtCompDesc').val().trim().length > 0)
                                return true;
                            else {
                                SageAlertDialog("something went wrong");
                                return false;
                            }
                        }
                        function GetDefaultData(componentName) {
                            let $data = $activeDOM;
                            let $addCompoHolder = $('#activecomponentclone');
                            $addCompoHolder.html($data).show();
                            let removeArr = ['.CreateComponent', '.cGrid .sortComponent', '.cGrid .sortComponent', '.verticalcollector .deletehelper'];
                            let length = removeArr.length;
                            for (var i = 0; i < length; i++) {
                                $addCompoHolder.find(removeArr[i]).remove();
                            }
                            $('.setDrp').hide();
                            $addCompoHolder.find('[data-type="verticalcollectors"]').attr('data-title', componentName);
                            $addCompoHolder.find('[data-type="verticalcollector"]').attr('data-title', componentName + " card");
                            $addCompoHolder.find('.SetHdlr.active').removeClass('active');
                            $addCompoHolder.find('.verticalcollector .SetHdlr').addClass('no-drag');
                            $addCompoHolder.find('.verticalcollector .SetHdlr').addClass('no-drag');
                            return $addCompoHolder.html();
                        }
                    });
                }
            },
            "deleteEvents": function ($par) {
                $par.find('.collectorItem >.editor-component >.SetHdlr .collectordelete').on('click', function () {
                    let $vc = $(this).closest('.verticalcollector');
                    if ($vc.find('.collectorItem').length == 1) {
                        SageAlertDialog('Atleast one item is required.');
                        return;
                    }
                    let $this = $(this);
                    SageConfirmDialog(easyMessageList.deletehelper).done(function () {
                        $('#totalcounter').text($this.closest('.collectorItem').siblings().length);
                        $this.closest('.collectorItem').remove();
                    });
                });
            },
            "removeDeleteEvent": function ($par) {
                $par.find('.collectorItem >.editor-component >.SetHdlr .deletehelper').off('click').addClass('collectordelete').removeClass('deletehelper');
                this.deleteEvents($par);
            }
        }
    }

};