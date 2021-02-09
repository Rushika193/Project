var search = {
    "search": {
        "componentname": "search",
        "category": "advance",
        "icon": "fa fa-search",
        "row": false,
        "hidden": false,
        "collection": true,
        "type": "element",
        "defaultdata": EasyLibrary.ReadDOM("commonsearch/search/viewdom", false),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) { },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            var ths = this;
            if (dropped)
                EasyLibrary.ComponentTemplate($appendLayer, dropped);
            else
                ths.view.evntListener();
        },
       
        "tempItemsClass": "sfCol_33 tsfCol_50 msfCol_100 Pa-15",
        "applyTemplate": function ($parent, $temp, dropped) {
            $parent.attr('class', $temp.attr('class')).attr('data-formtype', $temp.attr('data-formtype'));
            $parent.find('.btnOpnComnSrch,.srch-cont,.srch-wrp').remove();
            $parent.find('.btnOpnComnSrch,.srch-cont').remove();
            $parent.append($temp.find('.btnOpnComnSrch'));
            var $cont = $temp.find('.srch-cont');
            if ($cont.length === 0) {
                $cont = $temp.find('.srch-wrp');
            }
            $parent.append($cont);
            this.view.evntListener();
        },
        "getSettingsOptions": function () {
            var $dom;
            var typ = $activeDOM.attr('data-formtype');
            if (typ === 'normal' || typ === 'leftpush') {
                $dom = $('<div/>').html(this.SettingsOptions);
                $dom.find('.adv').remove();
                return $dom.html();
            } else if (typ === 'Ldropdown' || typ === 'Rdropdown') {
                $dom = $('<div/>').html(this.SettingsOptions);
                $dom.find('.noDrp').remove();
                $dom.find('.opn').text('Open/Close Button');
                return $dom.html();
            } else {
                $dom = $('<div/>').html(this.SettingsOptions);
                if ($activeDOM.hasClass('fOpen')) {
                    $dom.find('.comp').remove();
                    $dom.find('.opn').remove();
                } else {
                    $dom.find('.opn').text('Open Button');
                }
                return $dom.html();
            }
        },
        "SettingsOptions": EasyLibrary.ReadDOM("commonsearch/search/commonoptions", false),
        "settingDOMs": {
            "tabs": {
                'Basic': {
                    'custom': true,
                    'DOM': EasyLibrary.ReadDOM("commonsearch/search/basic", false),
                    'onload': function () {
                        var $pr = $activeDOM;
                        var $tarInp = $pr.find('.txtCommonSrch');
                        $('#txtSrchPlcHldr').val($tarInp.attr('placeholder'));
                        $('#txtSrchPlcHldr').off().on('keyup', function () {
                            $tarInp.attr('placeholder', $(this).val());
                        }); 
                        let $anchorPageList = $("#anchorPageList");
                        GetPageList();
                        //$anchorPageList.find('option').filter(function () {
                        //    return this.text == link.replace(SageFrameHostURL + '/', '').replaceAll("-", " ");
                        //}).attr('selected', true);
                       // $anchorPageList.parent().removeClass('Dn');
                        var alFa = ViewDeviceAlpha();
                        $('.chkEnDnDevEle').off('change').on('change', function () {
                            var $ths = $(this);
                            if ($ths.prop('checked'))
                                $pr.find($ths.attr('data-target')).removeClass(alFa + "Dn");
                            else
                                $pr.find($ths.attr('data-target')).addClass(alFa + "Dn");
                            checkState();
                        });
                        function checkState() {
                            $('.chkEnDnDevEle').each(function () {
                                var $ths = $(this);
                                $ths.prop('checked', $pr.find($ths.attr('data-target')).is(":visible"));
                            });
                        }
                        checkState();



                        var type = $pr.attr('data-formtype');
                        if (type === "Ldropdown" || type === "Rdropdown") {
                            $('#divStDrpType').removeClass('Dn');
                            $('#slcStSrchStyle').val(type);
                            $('#slcStSrchStyle').off().on('change', function () {
                                var val = $(this).val();
                                $pr.attr('data-formtype', val);
                                ApplyFormTypes(val);
                            });
                        } else if (type === "topfixed" || type === "fullpage") {
                            var $tar = $activeDOM.find('.srch-wrp');
                            $('#slcStContainer').val($tar.attr('data-cont'));
                            $('#divStDrpContainer').removeClass('Dn');
                            $('#slcStContainer').off().on('change', function () {
                                $tar.removeClass($tar.attr('data-cont'));
                                $tar.addClass($(this).val());
                                $tar.attr('data-cont', $(this).val());
                            });
                        }
                        function ApplyFormTypes(type) {
                            var open = false;
                            $pr.find('.btnOpnComnSrch,.btnCloseComnSrch,.srch-cont').hide();
                            $pr.find('.txtCommonSrch').show().val('');
                            switch (type) {
                                case 'normal':
                                    $pr.find('.srch-cont').show();
                                    break;
                                case 'leftpush':
                                    $pr.find('.btnCommonSrch').trigger('click');
                                    $pr.find('.srch-cont').show();
                                    break;
                                case 'Ldropdown':
                                case 'Rdropdown':
                                case 'fullpage':
                                case 'topfixed':
                                    $pr.find('.btnOpnComnSrch').show();
                                    open = true;
                                    break;
                            }
                            $pr.find('.btnCloseComnSrch').trigger('click');
                            if (open) {
                                $pr.find('.btnOpnComnSrch').trigger('click');
                            }
                        }

                        function GetPageList() {
                            $anchorPageList.html(EasyLibrary.GetPageOption());                            
                            var detailpage = $pr.attr("data-page");
                            if (detailpage != undefined) {
                                $anchorPageList.find('option').filter(function () {
                                    return this.text == detailpage.replaceAll("-", " ");
                                }).attr('selected', true);
                            }                            
                            $anchorPageList.off().on('change', function () {
                                let $selectedOption = $anchorPageList.find('option:selected');
                                $pr.attr('data-page', $selectedOption.text().replaceAll(" ", "-"));
                            });
                        }
                    }
                },
                'Spacing': {
                    'custom': true,
                    'DOM': '<div id="divDynSpcStDOM"></div>',
                    'onload': function () {
                        var $mainCont = $('#divDynSpcStDOM');
                        $mainCont.html(component[$activeDOM.attr('data-type')].getSettingsOptions());
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

                        }

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
                        $mainCont.html(component[$activeDOM.attr('data-type')].getSettingsOptions());
                        var $stSlc = $mainCont.find('.slcDynSettingAplyOn');
                        var $stCont = $mainCont.find('.dynStngContainer');
                        $stSlc.find('option').not('.tx').remove();
                        $stSlc.off().on('change', function () {
                            var val = $(this).val();
                            $('.actEle').removeClass('actEle');
                            $activeDOM.find(val).addClass('actEle');
                            var opt = {
                                width: false
                            };
                            if (val === ".srchBtn i" || val === ".btnOpnComnSrch" || val === ".btnCloseComnSrch") {
                                opt = {
                                    width: false,
                                    size: true,
                                    spacing: false,
                                    transform: false,
                                    family: false,
                                    weight: false,
                                    color: true,
                                    style: false
                                };
                                if (val === ".srchBtn i")
                                    opt.color = false;
                            }
                            init(val, opt);
                        });
                        function init(target, opt) {
                            $stCont.AdvanceTextSetting({
                                targetParent: $activeDOM,
                                targetElem: target,
                                options: opt
                            });
                        }
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
                        $mainCont.html(component[$activeDOM.attr('data-type')].getSettingsOptions());
                        var $stSlc = $mainCont.find('.slcDynSettingAplyOn');
                        var $stCont = $mainCont.find('.dynStngContainer');
                        $stSlc.find('option').not('.sz').remove();
                        $stSlc.find('.nAl').remove();
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
                        }
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
                    'DOM': EasyLibrary.ReadDOM("commonsearch/search/sizeSettings", false),
                    'onload': function () {
                        var $mainCont = $('#divDynSizeStDOM');
                        $mainCont.html(component[$activeDOM.attr('data-type')].getSettingsOptions());
                        var $stSlc = $mainCont.find('.slcDynSettingAplyOn');
                        var $stCont = $mainCont.find('.dynStngContainer');
                        $stSlc.find('option').not('.sz').remove();
                        var typ = $activeDOM.attr('data-formtype');
                        if (typ === "topfixed" || typ === "fullpage") {
                            $stSlc.find('.fm').remove();
                        }
                        var alfa = DeviceAlpha();
                        $stSlc.off().on('change', function () {
                            typ = $activeDOM.attr('data-formtype');
                            $('#divDynHeightSt').hide();
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
                            var wTyp = 'sfwidth';
                            var max = 100;
                            if ((typ === "Ldropdown" || typ === "Rdropdown") && val === ".srch-cont") {
                                wTyp = 'width';
                                ReplaceClassByPattern(target, 'sfCol_[0-9]{1,3}', '');
                            } else if (val === ".srch-cont") {
                                ReplaceClassByPattern(target, 'W-[0-9]{1,3}', '');
                            } else if (val === ".btnOpnComnSrch") {
                                wTyp = 'width';
                                initHeight(target);
                            }
                            if (wTyp === 'width') {
                                if (alfa === 'm')
                                    max = 320;
                                else if (alfa === 't')
                                    max = 768;
                                else
                                    max = 1080;
                            }
                            init(target, wTyp, max);
                        });
                        function init(target, type, max) {
                            $stCont.AdvanceDimension({
                                targetParent: $activeDOM,
                                targetElem: target,
                                type: type,
                                max: max,
                                callback: function () {
                                    if (typ === "Ldropdown" || typ === "Rdropdown")
                                        calcPos()
                                }
                            });
                        }
                        function initHeight(target) {

                            $('#divDynHeightSt').show().AdvanceDimension({
                                targetParent: $activeDOM,
                                targetElem: target,
                                type: 'height',
                                label: 'height'
                            });
                        }
                        var $cont = $activeDOM.find('.srch-cont');
                        var $opnBtn = $activeDOM.find('.btnOpnComnSrch');
                        function calcPos() {

                            var left = $opnBtn.offset().left - $activeDOM.offset().left;
                            if (typ === "Ldropdown")
                                left = left + $opnBtn.outerWidth() - $cont.outerWidth();
                            $cont.css('left', left + "px");
                        }
                    },
                    'active': function () {
                        var $stSlc = $('#divDynSizeStDOM').find('.slcDynSettingAplyOn');
                        $stSlc.val($('.slcDynSettingAplyOn.active').val()).trigger('change');
                        $('.slcDynSettingAplyOn.active').removeClass('active');
                        $stSlc.addClass('active');
                    }
                },
                'Sort': {
                    'custom': true,
                    'DOM': EasyLibrary.ReadDOM("commonsearch/search/sorting", false),
                    'onload': function () {
                        var typ = $activeDOM.attr('data-formtype');
                        if (typ === "topfixed") {
                            $("#divSortSearchItems").html('');
                            var html = $('#hdnDivSortEle').html();
                            $activeDOM.find(".srch-wrp .ele").each(function () {
                                var $html = $(html);
                                $html.find('label').text($(this).attr('data-title'));
                                $("#divSortSearchItems").append($html);
                            });
                            $("#divSortSearchItems").AdvanceSorting({
                                targetParent: $activeDOM.find(".srch-wrp"), //view
                                targetElem: '.ele', //view
                                sortableOptions: {
                                    items: "> div.stElWrap", //editor
                                    handle: ".accorSort", //editor
                                    containment: '#divSortSearchItems' //editor
                                }
                            });
                        } else {
                            $('#tabHeadWrap li[data-tabs="tab6"]').hide();
                        }
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
                        $mainCont.html(component[$activeDOM.attr('data-type')].getSettingsOptions());
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
                        }
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
                        $mainCont.html(component[$activeDOM.attr('data-type')].getSettingsOptions());
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
                                    "position": ["all", "top", "right", "bottom", "left"]
                                }
                            });
                        }
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
                        $mainCont.html(component[$activeDOM.attr('data-type')].getSettingsOptions());
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
                        }
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
                        $mainCont.html(component[$activeDOM.attr('data-type')].getSettingsOptions());
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
                        }
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
                        $mainCont.html(component[$activeDOM.attr('data-type')].getSettingsOptions());
                        var $stSlc = $mainCont.find('.slcDynSettingAplyOn');
                        var $stCont = $mainCont.find('.dynStngContainer');
                        $stSlc.find('option').not('.hvr').remove();
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
                        }
                    },
                    'active': function () {
                        var $stSlc = $('#divDynHvrEffStDOM').find('.slcDynSettingAplyOn');
                        $stSlc.val($('.slcDynSettingAplyOn.active').val()).trigger('change');
                        $('.slcDynSettingAplyOn.active').removeClass('active');
                        $stSlc.addClass('active');
                    }
                }
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
                if (p !== "Sort")
                    thsComp.responsiveDOMs.tabs[p] = thsComp.settingDOMs.tabs[p];
            }
        },
        "remove": function ($cloneDOM) {
            this.view.view();
            $cloneDOM.find('.btnCloseComnSrch').trigger('click');
        },
        "removeedit": function ($editDOM) {
            $editDOM.find('.btnCloseComnSrch').trigger('click');
        },
        "binddata": function ($parent, response) {

        },
        "binddataerror": function ($parent, response) {
            console.log(response);
        },
        "view": {
            view: function () {

                this.evntListener();
            },
            stringToSlug: function (v) {
                return v.toLowerCase().trim()
                    .replace(/\s+/g, '-')
                    .replace(/&/g, '-and-')
                    .replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'‘’<>,.\/? ])+/g, '-')
                    .replace(/\-\-+/g, '-');
            },
            search: function (val, detailpage) {
                if (detailpage == undefined || detailpage == '') {
                    return false;
                }
                var url = WbHostURL + '/' + detailpage+'/keyword/' + this.stringToSlug(val);
                if (!EditorMode) {
                    window.location = url;
                } else {
                    SageConfirmDialog('Are you sure you want to switch to "search result" page? All your unsaved data will be lost.').done(function () {
                        window.location = url;
                    });
                }
            },
            evntListener: function () {
                var ths = this;
                $('.btnCommonSrch').off('click').on('click', function () {
                    var $pr = $(this).closest('.editor-component');
                    var $inp = $pr.find('.txtCommonSrch');
                    var val = $inp.val();
                    var typ = $pr.attr('data-formtype');
                    
                    var detailpage = $pr.attr("data-page");
                    if (val !== '' && typ !== 'leftpush') {
                        ths.search(val, detailpage);
                    } else if ($pr.hasClass('fBoxOpen') && val !== '') {
                        ths.search(val, detailpage);
                    } else if (typ === 'leftpush') {
                        if ($pr.hasClass('fBoxOpen') && val === '') {
                            $pr.find('.txtCommonSrch').hide("slide", { direction: "right" }, 0);
                            $pr.removeClass('fBoxOpen');
                        } else {
                            $pr.addClass('fBoxOpen');
                            $pr.find('.txtCommonSrch').show("slide", { direction: "right" }, 0);
                        }
                    }
                });
                $('.txtCommonSrch').off('keyup').on('keyup', function (e) {

                    if (e.keyCode === 13 && $(this).val() !== '') {
                        $(this).closest('.editor-component').find('.btnCommonSrch').trigger('click');
                    }
                });
                $('.btnOpnComnSrch').off('click').on('click', function () {

                    var $pr = $(this).closest('.editor-component');
                    if ($pr.hasClass('fOpen')) {
                        $('.btnCloseComnSrch').trigger('click');
                    }
                    else {
                        $pr.find('.btnOpnComnSrch').addClass('fa-close').removeClass('fa-search');
                        ths.formTypes($pr);
                    }
                });
                $('.btnCloseComnSrch').off('click').on('click', function () {
                    var $pr = $(this).closest('.editor-component');
                    if ($pr.hasClass('fOpen')) {
                        $(this).hide();
                        var typ = $pr.attr('data-formtype');
                        if (typ !== 'normal' && typ !== 'leftpush') {
                            $pr.find('.srch-cont').hide();
                            $pr.find('.btnOpnComnSrch').removeClass('fa-close').addClass('fa-search').show();
                        }
                        ths.clearAll($pr);
                    }
                });
                if (!EditorMode) {
                    $('body').on('click', function (e) {
                        var $tar = $(e.target);
                        if ($tar.parents('.srch-cont').length === 0 && !$tar.hasClass('btnOpnComnSrch'))
                            $('.btnCloseComnSrch').trigger('click');
                    });
                }
            },
            clearAll: function ($pr) {
                $pr.css({ 'top': '', 'left': '', 'bottom': '', 'height': '', 'z-index': '' });
                $cont = $pr.find('.srch-cont');
                $cont.css({ 'top': '', 'left': '', 'height': '' }).removeClass('PosA zi-9');
                if ($pr.hasClass("PosF")) {
                    $pr.removeClass(ViewDeviceAlpha() + 'sfCol_100');
                    $pr.addClass($pr.attr('data-prev-state'));
                }
                var cls = ['zi-9', 'fOpen', 'PosF', 'PosA', 'Mclr', 'Pclr'];
                cls.forEach(function (v, i) {
                    $pr.removeClass(v);
                });
                $pr.find('.btnCloseComnSrch').hide();
                $pr.show();
            },
            makeFixed: function ($pr, top, left, bottom, height) {
                var alFa = ViewDeviceAlpha();
                $pr.hide();
                var reg = new RegExp('\\bs' + alFa + 'fCol_[0-9]{1,3}\\b', 'g');
                var prevCls = $pr.attr('class').match(reg);
                if (prevCls !== null) {
                    prevCls.forEach(function (v, i) {
                        $pr.removeClass(v);
                    });
                    $pr.attr('data-prev-state', prevCls.join(' '));
                } else {
                    $pr.attr('data-prev-state', '');
                }
                $pr.addClass('PosF Mclr Pclr').removeClass('PosR').addClass(alFa + 'sfCol_100');
                $pr.find('.srch-cont').show().css('height', height);
                $pr.css({ 'top': top, 'left': left, 'bottom': bottom, 'height': height, 'z-index': '9991' });
                $pr.find('.btnCloseComnSrch').show();
                $pr.find('.btnOpnComnSrch').hide();
                $pr.show(300);
                if (EditorMode)
                    $pr.find('.com-settings').trigger('click');
            },
            makeDropDown: function ($pr, type) {
                this.clearAll($pr);
                var $cont = $pr.find('.srch-cont');
                var $opn = $pr.find('.btnOpnComnSrch');
                $cont.addClass('PosA zi-9').show(200);
                $pr.addClass("PosR").removeClass("PosF");
                var ofst = $opn.offset();
                $cont.css('top', (ofst.top - $pr.offset().top) + $opn.outerHeight() + 5);
                var left = ofst.left - $pr.offset().left;
                if (type === "L")
                    left = left + $opn.outerWidth() - $cont.outerWidth();
                $cont.css('left', left + "px");
            },
            formTypes: function ($pr) {
                var ths = this;
                $pr.addClass('fOpen');
                switch ($pr.attr('data-formtype')) {
                    case 'Ldropdown':
                        ths.makeDropDown($pr, "L");
                        break;
                    case 'Rdropdown':
                        ths.makeDropDown($pr, "R");
                        break;
                    case 'fullpage':
                        ths.makeFixed($pr, '0', '0', '', '100vh');
                        break;
                    case 'topfixed':
                        ths.makeFixed($pr, '0', '0', '', '');
                        break;
                }
                $pr.addClass('fOpen');
            }
        }
    }
};