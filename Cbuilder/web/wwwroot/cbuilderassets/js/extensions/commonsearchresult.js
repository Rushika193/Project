var searchresult = {
    "search result": {
        "componentname": "search result",
        "category": "advance",
        "icon": "fa fa-list",
        "row": false,
        "hidden": false,
        "collection": true,
        "type": "element",
        "defaultdata": EasyLibrary.ReadDOM("commonsearch/result/viewdom", false),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) { },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (dropped) {
                if ($('.editor-component.srch-rslt').length > 1) {
                    SageAlertDialog("You can drop only one search result component", "Warining");
                    $appendLayer.remove();
                } else {
                    this.view.getData($appendLayer);
                }
            }
        },
        "getSettingsOptions": EasyLibrary.ReadDOM("commonsearch/result/commonoptions", false),
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('commonsearch/result/basic', false),
                    "onload": function ($item) {
                        var $pr = $activeDOM;
                        var thsComp = component[$pr.attr('data-type')];
                        function NoOfItemHandler(space) {
                            $pr.attr("data-limit", space);
                            thsComp.createTemplate($pr);
                            thsComp.view.getData($pr);
                        }
                        AdvanceSageSlider($('#divNsItmSlide'), $('#divNsItmSlideHandler'), 1, 30, $pr.attr('data-limit'), NoOfItemHandler, $pr, '');
                        var chkDOM = $('#hdnChkStDOM').html();
                        $pr.find('.rslt-wrp').eq(0).find('.ele').each(function (i, v) {
                            var $chk = $(chkDOM);
                            var $ths = $(this);
                            var id = "chkEnDn" + i;
                            var tar = '.ele[data-title="' + $ths.attr('data-title') + '"]';
                            $chk.find('.tgl_slider').attr('for', id);
                            $chk.find('.fLbl').text($ths.attr('data-title'));
                            $chk.find('input').attr('id',id).attr('data-target', tar).prop('checked', $ths.is(':visible'));
                            $('#divStEnDnEle').append($chk);
                        });
                        var alFa = DeviceAlpha();
                        $('.chkEnDnDevEle').off('change').on('change', function () {
                            var $ths = $(this);
                            var $tar = $pr.find($ths.attr('data-target'));
                            if ($ths.prop('checked')) {
                                $tar.removeClass(alFa + "Dn");
                            }
                            else {
                                $tar.addClass(alFa + "Dn");
                            }
                        });
                    },
                    'active': function () {
                    }
                },
                'Spacing': {
                    'custom': true,
                    'DOM': '<div id="divDynSpcStDOM"></div>',
                    'onload': function () {
                        var $mainCont = $('#divDynSpcStDOM');
                        $mainCont.html(component[$activeDOM.attr('data-type')].getSettingsOptions);
                        var $stSlc = $mainCont.find('.slcDynSettingAplyOn');
                        var $stCont = $mainCont.find('.dynStngContainer');
                        $stSlc.off().on('change', function () {
                            var val = $(this).val();
                            var target = $activeDOM;
                            $('.actEle').removeClass('actEle');
                            if (val !== "") {
                                target = val;
                                $activeDOM.find(target).addClass('actEle');
                            } else {
                                $activeDOM.addClass("actEle");
                            }
                            init(target);
                        });
                        function init(target) {
                            $stCont.AdvanceSpacing({
                                targetParent: $activeDOM,
                                targetElem: target,
                                options: {
                                    "margin": {
                                        "max": 40,
                                        "min": -40,
                                        "times": 5,
                                        "position": ["all", "top", "bottom", "left", "right"]
                                    },
                                    "padding": {
                                        "max": 40,
                                        "min": 0,
                                        "times": 5,
                                        "position": ["all", "top", "bottom", "left", "right"]
                                    }
                                }
                            });

                        };

                    },
                    'active': function () {
                        var $stSlc = $('#divDynSpcStDOM').find('.slcDynSettingAplyOn');
                        $stSlc.val($('.slcDynSettingAplyOn.active').val()).trigger('change');
                        $('.slcDynSettingAplyOn.active').removeClass('active');
                        $stSlc.addClass('active');
                    }
                },
                'Text': {
                    'custom': true,
                    'DOM': '<div id="divDynTxtStDOM"></div>',
                    'onload': function () {
                        var $mainCont = $('#divDynTxtStDOM');
                        $mainCont.html(component[$activeDOM.attr('data-type')].getSettingsOptions);
                        var $stSlc = $mainCont.find('.slcDynSettingAplyOn');
                        var $stCont = $mainCont.find('.dynStngContainer');
                        $stSlc.find('option').not('.tx').remove();
                        $stSlc.off().on('change', function () {
                            var val = $(this).val();
                            $('.actEle').removeClass('actEle');
                            $activeDOM.find(val).addClass('actEle');
                            init(val);
                        });
                        function init(target) {
                            $stCont.AdvanceTextSetting({
                                targetParent: $activeDOM,
                                targetElem: target,
                                options: {
                                    width: false,
                                }
                            });
                        };
                    },
                    'active': function () {
                        var $stSlc = $('#divDynTxtStDOM').find('.slcDynSettingAplyOn');
                        $stSlc.val($('.slcDynSettingAplyOn.active').val()).trigger('change');
                        $('.slcDynSettingAplyOn.active').removeClass('active');
                        $stSlc.addClass('active');
                    }
                },
                'Alignment': {
                    'custom': true,
                    'DOM': '<div id="divDynAlignStDOM"></div>',
                    'onload': function () {
                        var $mainCont = $('#divDynAlignStDOM');
                        $mainCont.html(component[$activeDOM.attr('data-type')].getSettingsOptions);
                        var $stSlc = $mainCont.find('.slcDynSettingAplyOn');
                        var $stCont = $mainCont.find('.dynStngContainer');
                        $stSlc.find('option').not('.sz').remove();
                        $stSlc.off().on('change', function () {
                            var val = $(this).val();
                            var target = $activeDOM;
                            $('.actEle').removeClass('actEle');
                            if (val !== "") {
                                target = val;
                                $activeDOM.find(target).addClass('actEle');
                            } else {
                                $activeDOM.addClass("actEle");
                            }
                            init(target);
                        });
                        function init(target) {
                            $stCont.AdvanceAlignment({
                                targetParent: $activeDOM,
                                targetElem: target,
                                options: {
                                    'horizontal': ["left", "center", "right"],
                                    'vertical': ["top", "middle", "bottom"]
                                }
                            });
                        };
                    },
                    'active': function () {
                        var $stSlc = $('#divDynAlignStDOM').find('.slcDynSettingAplyOn');
                        $stSlc.val($('.slcDynSettingAplyOn.active').val()).trigger('change');
                        $('.slcDynSettingAplyOn.active').removeClass('active');
                        $stSlc.addClass('active');
                    }
                },
                'Size': {
                    'custom': true,
                    'DOM': EasyLibrary.ReadDOM("commonsearch/result/sizeSettings", false),
                    'onload': function () {
                        var $mainCont = $('#divDynSizeStDOM');
                        $mainCont.html(component[$activeDOM.attr('data-type')].getSettingsOptions);
                        var $stSlc = $mainCont.find('.slcDynSettingAplyOn');
                        var $stCont = $mainCont.find('.dynStngContainer');
                        $stSlc.find('option').not('.sz').remove();
                        $stSlc.off().on('change', function () {
                            $('#divDynHeightStWrp').addClass('Dn');
                            var val = $(this).val();
                            var target = $activeDOM;
                            $('.actEle').removeClass('actEle');
                            if (val !== "") {
                                if (val === ".rslt")
                                    val += "-wrp";
                                target = $activeDOM.find(val);
                                if (val === ".rsImg") {
                                    $('#divDynHeightStWrp').removeClass('Dn');
                                    initHeight(target);
                                }
                                target.addClass('actEle');
                            }
                            else {
                                $activeDOM.addClass("actEle");
                            }
                            init(target);
                        });
                        function init(target) {
                            $stCont.AdvanceWidthSlider({
                                targetParent: $activeDOM,
                                targetElem: target
                            });
                        };
                        function initHeight(targets) {
                            $('#divDynHeightStWrp').removeClass('Dn');
                            $('#divDynHeightSt').AdvanceDimension({
                                targetParent: $activeDOM,
                                targetElem: targets,
                                label: 'Image Height',
                                type: 'height',
                                defaultValue: targets.eq(0).height(),
                            });
                            $('#btnRefreshImageWidth').off().on('click', function () {
                                ReplaceClassByPattern(targets, 'H-[0-9]{1,4}', '');
                                setTimeout(function () {
                                    ChangeSliderValue($('#divDynHeightSt .ui-slider'), targets.eq(0).height());
                                }, 100);
                            });
                            $('#chkImgFittoCover').off().on('click', function () {
                                if ($(this).prop('checked'))
                                    targets.parent().addClass('fit-image');
                                else
                                    targets.parent().removeClass('fit-image');
                            });
                            $('#chkImgFittoCover').prop('checked', targets.eq(0).parent().hasClass('fit-image'));
                        }

                    },
                    'active': function () {
                        var $stSlc = $('#divDynSizeStDOM').find('.slcDynSettingAplyOn');
                        $stSlc.val($('.slcDynSettingAplyOn.active').val()).trigger('change');
                        $('.slcDynSettingAplyOn.active').removeClass('active');
                        $stSlc.addClass('active');
                    }
                },
                "DOM": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('commonsearch/result/advance', false),
                    "onload": function ($item) {
                        var $parent = $activeDOM;
                        function manageElementOrder() {
                            var newsItem = $parent.find('.rslt-wrp').eq(0);
                            newsItem.find('.ele').each(function () {
                                var thisEle = $(this);
                                var html = '<span class="st-com-element cb-stdrg" data-tarele=".ele[data-title=' + thisEle.attr('data-title') + ']"><span>' + thisEle.attr('data-title') + '</span><span class="mv-ctl"><i data-up="true" title="Move up" class="btnSrtProductEle fa fa-angle-up"></i><i data-up="false" title="Move down" class="btnSrtProductEle fa fa-angle-down"></i></span></span>';
                                if (thisEle.parent().hasClass('cont-1')) {
                                    $('#divContainer1').append(html);
                                } else
                                    $('#divContainer2').append(html);

                            });
                            $(".st-com-element").draggable({
                                helper: "clone",
                                revert: false,
                                cursor: 'pointer',
                                connectWith: '.targetContainer',
                                containment: '.manage-content',
                                start: function (event, ui) {

                                }
                            });
                            $('.targetContainer').droppable({
                                accept: ".st-com-element",
                                greedy: true,
                                hoverClass: "ui-state-row-hover ui-hover-state",
                                drop: function (event, ui) {
                                    var $this = $(this);
                                    var item = $(ui.draggable);
                                    $this.append(item);
                                    var tarCont = $this.attr('data-tarcontain');
                                    $parent.find(item.attr('data-tarele')).each(function () {
                                        $(this).parent().parent().find(tarCont).append($(this));
                                    });
                                    $parent.find('.st-cont').each(function () {
                                        if ($(this).find('.com-ele').length === 1) {
                                            $(this).find('.com-ele .srt.ele').addClass('hide');
                                        } else {
                                            $(this).find('.com-ele .srt-ele').removeClass('hide');
                                        }
                                    });
                                }
                            });
                            $('.btnSrtProductEle').off('click').on('click', function () {
                                var $this = $(this);
                                var isUp = $this.attr('data-up') === 'true' ? true : false;
                                var ldom = $this.closest('.targetContainer').find('.st-com-element');
                                var wrpEle = $this.closest('.st-com-element');
                                var dIndex = ldom.index(wrpEle);
                                sortElement(isUp, dIndex, ldom);
                                $parent.find(wrpEle.attr('data-tarele')).each(function () {
                                    var oDom = $(this).parent().children();
                                    sortElement(isUp, dIndex, oDom);
                                });
                            });
                            function sortElement(isUp, dIndex, oDom) {
                                if (isUp && dIndex > 0) {
                                    oDom[dIndex].parentNode.insertBefore(oDom[dIndex], oDom[dIndex - 1]);
                                } else if (!isUp && dIndex < oDom.length - 1) {
                                    oDom[dIndex].parentNode.insertBefore(oDom[dIndex + 1], oDom[dIndex]);
                                }
                            }
                        }
                        manageElementOrder();
                    }
                }

            }
        },
        "styleDOMs": {
            "tabs": {
                "Background": {
                    "custom": true,
                    "DOM": '<div id="divDynBgStDOM"></div>',
                    'onload': function () {
                        var $mainCont = $('#divDynBgStDOM');
                        $mainCont.html(component[$activeDOM.attr('data-type')].getSettingsOptions);
                        var $stSlc = $mainCont.find('.slcDynSettingAplyOn');
                        var $stCont = $mainCont.find('.dynStngContainer');
                        $stSlc.off().on('change', function () {
                            var val = $(this).val();
                            var target = $activeDOM;
                            $('.actEle').removeClass('actEle');
                            if (val !== "") {
                                target = val;
                                $activeDOM.find(target).addClass('actEle');
                            } else {
                                $activeDOM.addClass("actEle");
                            }
                            init(target);
                        });
                        function init(target) {
                            $stCont.AdvanceBackground({
                                targetParent: $activeDOM,
                                targetElem: target,
                                options: ["color"]
                            });
                        };
                    },
                    'active': function () {
                        var $stSlc = $('#divDynBgStDOM').find('.slcDynSettingAplyOn');
                        $stSlc.val($('.slcDynSettingAplyOn.active').val()).trigger('change');
                        $('.slcDynSettingAplyOn.active').removeClass('active');
                        $stSlc.addClass('active');
                    }
                },
                "Border": {
                    "custom": true,
                    "DOM": `<div id="divDynBrdrStDOM"></div>
                             <div class="field-row stElWrap col50-50" id="lstItmBdr" style="">
                            <label class="fCol">Disable on Last Item</label>
                            <div class="fCol TxAl-r"><span class="toggle_btn">
                            <input type="checkbox"   name="tglBtnBdr">
                            <label for="tglBtnBdr" class="tgl_slider"></label>
                            </span></div></div>
                    `,
                    'onload': function () {
                        var $mainCont = $('#divDynBrdrStDOM');
                        $mainCont.html(component[$activeDOM.attr('data-type')].getSettingsOptions);
                        var $stSlc = $mainCont.find('.slcDynSettingAplyOn');
                        var $stCont = $mainCont.find('.dynStngContainer');

                        $stSlc.off().on('change', function () {
                            var val = $(this).val();
                            var target = $activeDOM;
                            $('.actEle').removeClass('actEle');
                            if (val !== "") {
                                target = val;
                                $activeDOM.find(target).addClass('actEle');
                            } else {
                                $activeDOM.addClass("actEle");
                            }
                            if (target === '.dynItem') {
                                if ($('input[name="tglBtnBdr"]').prop('checked'))
                                    target = $activeDOM.find(target).not($activeDOM.find('.dynItem').last());
                                $('#lstItmBdr').show();
                            } else {
                                $('#lstItmBdr').hide();
                            }
                            init(target);
                        });
                        function init(target) {
                            $stCont.AdvanceBorder({
                                targetParent: $activeDOM,
                                targetElem: target,
                                options: {
                                    "max": 20,
                                    "min": 0,
                                    "times": 1,
                                    "position": ["all", "top", "right", "bottom", "left"],
                                }
                            });
                        };
                        function eventLastItemBorder() {
                            $('input[name="tglBtnBdr"]').on('change', function () {
                                $stSlc.trigger('change');
                                if ($(this).prop("checked")) {
                                    $activeDOM.find('.dynItem').last().css('border', 'none');
                                    $activeDOM.attr('data-borderlast-none', "true");
                                } else {
                                    $activeDOM.attr('data-borderlast-none', "false");
                                    $activeDOM.find('.dynItem').attr('style', $activeDOM.find('.dynItem').first().attr('style'));
                                }
                            });
                            $('input[name="tglBtnBdr"]').attr('checked', $activeDOM.attr('data-borderlast-none') === "true");
                        }
                        eventLastItemBorder();
                    },
                    'active': function () {
                        var $stSlc = $('#divDynBrdrStDOM').find('.slcDynSettingAplyOn');
                        $stSlc.val($('.slcDynSettingAplyOn.active').val()).trigger('change');
                        $('.slcDynSettingAplyOn.active').removeClass('active');
                        $stSlc.addClass('active');
                    }
                },
                "Box Radius": {
                    "custom": true,
                    "DOM": '<div id="divDynBxRdsStDOM"></div>',
                    'onload': function () {
                        var $mainCont = $('#divDynBxRdsStDOM');
                        $mainCont.html(component[$activeDOM.attr('data-type')].getSettingsOptions);
                        var $stSlc = $mainCont.find('.slcDynSettingAplyOn');
                        var $stCont = $mainCont.find('.dynStngContainer');

                        $stSlc.off().on('change', function () {
                            var val = $(this).val();
                            var target = $activeDOM;
                            $('.actEle').removeClass('actEle');
                            if (val !== "") {
                                target = val;
                                $activeDOM.find(target).addClass('actEle');
                            } else {
                                $activeDOM.addClass("actEle");
                            }
                            init(target);
                        });
                        function init(target) {
                            $stCont.AdvanceBoxRadius({
                                targetParent: $activeDOM,
                                targetElem: target,
                                "options": {
                                    "max": 200,
                                    "min": 0,
                                    "times": 1,
                                    "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                                }
                            });
                        };
                    },
                    'active': function () {
                        var $stSlc = $('#divDynBxRdsStDOM').find('.slcDynSettingAplyOn');
                        $stSlc.val($('.slcDynSettingAplyOn.active').val()).trigger('change');
                        $('.slcDynSettingAplyOn.active').removeClass('active');
                        $stSlc.addClass('active');
                    }
                },
                "Box Shadow": {
                    "custom": true,
                    "DOM": '<div id="divDynBxShdStDOM"></div>',
                    'onload': function () {
                        var $mainCont = $('#divDynBxShdStDOM');
                        $mainCont.html(component[$activeDOM.attr('data-type')].getSettingsOptions);
                        var $stSlc = $mainCont.find('.slcDynSettingAplyOn');
                        var $stCont = $mainCont.find('.dynStngContainer');

                        $stSlc.off().on('change', function () {
                            var val = $(this).val();
                            var target = $activeDOM;
                            $('.actEle').removeClass('actEle');
                            if (val !== "") {
                                target = val;
                                $activeDOM.find(target).addClass('actEle');
                            } else {
                                $activeDOM.addClass("actEle");
                            }
                            init(target);
                        });
                        function init(target) {
                            $stCont.AdvanceBoxShadow({
                                targetParent: $activeDOM,
                                targetElem: target
                            });
                        };
                    },
                    'active': function () {
                        var $stSlc = $('#divDynBxShdStDOM').find('.slcDynSettingAplyOn');
                        $stSlc.val($('.slcDynSettingAplyOn.active').val()).trigger('change');
                        $('.slcDynSettingAplyOn.active').removeClass('active');
                        $stSlc.addClass('active');
                    }
                },
                "Hover Effect": {
                    "custom": true,
                    "DOM": '<div id="divDynHvrEffStDOM"></div>',
                    'onload': function () {
                        var $mainCont = $('#divDynHvrEffStDOM');
                        $mainCont.html(component[$activeDOM.attr('data-type')].getSettingsOptions);
                        var $stSlc = $mainCont.find('.slcDynSettingAplyOn');
                        var $stCont = $mainCont.find('.dynStngContainer');

                        $stSlc.off().on('change', function () {
                            var val = $(this).val();
                            var target = $activeDOM;
                            $('.actEle').removeClass('actEle');
                            if (val !== "") {
                                target = val;
                                $activeDOM.find(target).addClass('actEle');
                            } else {
                                $activeDOM.addClass("actEle");
                            }
                            init(target);
                        });
                        function init(target) {
                            $stCont.AdvanceHoverEffect({
                                targetParent: $activeDOM,
                                targetElem: target,
                                options: {
                                    "color": ["background", "text"],
                                    "shadow": "on",
                                    "border": {
                                        "max": 20,
                                        "min": 0,
                                        "times": 1,
                                        "position": ["all", "top", "right", "bottom", "left"]
                                    }
                                }
                            });
                        };
                    },
                    'active': function () {
                        var $stSlc = $('#divDynHvrEffStDOM').find('.slcDynSettingAplyOn');
                        $stSlc.val($('.slcDynSettingAplyOn.active').val()).trigger('change');
                        $('.slcDynSettingAplyOn.active').removeClass('active');
                        $stSlc.addClass('active');
                    }
                },
            },
            "selectLayer": function ($elem) {
                var $parent = $elem.closest(".news-list");
                return $parent;
            }
        },
        "responsiveDOMs": {
            "tabs": {}
        },
        "complete": function () {
            var thsComp = this;
            for (var p in thsComp.settingDOMs.tabs) {
                if ( p !== "DOM")
                    thsComp.responsiveDOMs.tabs[p] = thsComp.settingDOMs.tabs[p];
            }            
        },
        "remove": function ($cloneDOM) {
            let ths = this;
            $('.editor-component.srch-rslt').each(function () {
                ths.createTemplate($(this));
            });
            $cloneDOM.find('.editor-component.srch-rslt').each(function () {
                let $pr = $(this);
                var compName = $pr.attr('data-type');
                let sparam = $pr.attr("data-limit") + ",%SiteID%";
                ths.apiInvoker(compName, "Search", "1", sparam, EasyLibrary.GetComponenetID($pr), "URL");
            });
        },
        "apiInvoker": function (comName, methodName, params, sParams, componentId, type) {
            var apiCtrl = new APIController();
            apiCtrl.ComponentName = comName;
            apiCtrl.NameSpace = "Cbuilder.CommonSearch";
            apiCtrl.ClassNames = "SearchController";
            apiCtrl.MethodNames = methodName;
            apiCtrl.Parameters = params;
            if (sParams !== "")
                apiCtrl.StaticParameters = sParams;
            apiCtrl.ComponentID = componentId;
            apiCtrl.Type = type;
            EasyLibrary.SetAPI(apiCtrl);
        },
        "createTemplate": function ($pr) {
            if ($pr.find('.rslt-wrp').length > 0) {
                var $temp = $pr.find('.compTemplate');
                $temp.html($pr.find('.rslt-wrp')[0].outerHTML);
                $temp.find('.rsTit,.rsDesc').text('');
                $temp.text($temp.html());
                if ($pr.closest('#WebBuilderWrapperClone').length > 0) {
                    $pr.find('.resultItems').empty();
                    $pr.addClass('Dn tDn mDn');
                }
            }
        },
        "removeedit": function ($editDOM) {
            $editDOM.find('.btnLoadMore.btnRslt').addClass("Dn tDn mDn");
        },

        "binddata": function ($parent, response) {
            try {
                if (!EditorMode) {
                    $parent.attr('data-total', response.TotalResult);
                    this.view.bindData($parent, response);
                }
            } catch (err) {
                console.error(err.message);
            }
        },
        "binddataerror": function ($parent, response) {
            console.log(response);
        },
        "view": {
            view: function () {
                var ths = this;
                $('.btnLoadMore.btnRslt').off('click').on('click', function () {
                    var $pr = $(this).closest('.editor-component');
                    $pr.attr('data-append', true);
                    var newOffset = parseInt($pr.attr('data-offset')) + parseInt($pr.attr('data-limit'));
                    $pr.attr('data-offset', newOffset);
                    ths.getData($pr);
                });
            },
            evtLst: function ($pr) {
                $('.viewMoreDevices').off('click').on('click', function () {
                    var $ths = $(this);
                    var url = WbHostURL + '/' + $pr.attr('data-detailspage') + '/device/' + $ths.attr('data-devtype') + "/category/" + $ths.attr('data-catid') + "/capacity/all/warranty/all";
                    if (EditorMode) {
                        SageConfirmDialog("Are you sure you want to switch to another page? All your unsaved data maybe lost.").done(function () {
                            ReloadPageNone();
                            window.location = url;
                        });
                    } else {
                        window.location = url;
                    }
                });
            },
            getData: function ($pr) {
                var ths = this;
                var config = {
                    data: {
                        siteID: GetSiteID,
                        offset: $pr.attr("data-offset"),
                        limit: $pr.attr("data-limit"),
                        keywords: 'lorem',
                        mode: EditorMode,
                    },
                    method: "SearchMoreResult",
                    dataType: "json",
                    url: '/Modules/CommonSearch/CommonSearchService.asmx',
                    ajaxSuccess: function (data) {
                         data = data.d;
                        if (data.TotalResult === 0)
                            data.TotalResult = $pr.attr('data-total');
                        ths.bindData($pr, data);
                    },
                    ajaxFailure: function () {
                        alert("Server Error.", "Error");
                    }
                };
                CommonLibrary.AjaxCall(config);
            },

            bindData: function ($pr, data) {
                var total = data.TotalResult;
                $pr.find('.rsHdng').text(total + ' Result Found');
                if (total > 0) {
                    var html = $pr.find('.compTemplate').text();
                    var allItems = '';
                    $.each(data.Result, function (i, v) {
                        $html = $(html);
                       
                        v.ImagePath = v.ImagePath.replace('/MediaThumb/large', '').replace('/MediaThumb/medium', '').replace('/MediaThumb/orginal', '');
                        $html.find('.rsImg').attr('src', v.ImagePath);
                        v.URL = EditorMode ? 'javascript:void(0);' : v.URL;
                        $html.find('.rsTit').text(v.Title).attr('href', v.URL);
                        $html.find('.rsDesc').html(v.Description);
                        $html.find('.rsTypeV').text(v.Applications);
                        $html.find('.rsImg-wrp').attr('href', v.URL);
                        allItems += $html[0].outerHTML;
                    });
                    if ($pr.attr('data-append') === 'true')
                        $pr.find('.resultItems').append(allItems);
                    else
                        $pr.find('.resultItems').html(allItems);
                    this.evtLst($pr);
                } else {
                    $pr.find('.resultItems').html(`<p style="padding:15px 0;text-align: center;width: 100%;font-family: 'Open Sans', sans-serif !important;text-transform: uppercase;color: red;font-weight: 600;"><i class="fa fa-exclamation-triangle" style=" margin-right: 10px;display: block;margin-bottom: 15px;font-size: 45px;"></i>Sorry content you are searching not found!</p>`)
                }
                if (EditorMode || total > parseInt($pr.attr("data-limit")) + parseInt($pr.attr("data-offset"))) {
                    $pr.find('.btnLoadMore').removeClass("Dn tDn mDn");

                } else {
                    $pr.find('.btnLoadMore').addClass("Dn tDn mDn");
                }
                $pr.removeClass('Dn tDn mDn');
            }
        }
    }
}