var dynamic_cmp_list = {
    dynamic_cmp_list: {
        componentname: 'dynamic_cmp_list',
        category: "advance",
        aaa: "aaa",
        icon: "fa fa-th-list",
        row: false,
        hidden: true,
        collection: false,
        bucket: false,
        type: "dynamic_post",
        defaultdata: "",
        beforedrop: function ($appendedParent, $appendLayer, dropped, cmpName) {
            //let cmpName = 'dynamic_cmp_list';
            let self = this;
            self.library.showTemplateChooser(cmpName, $appendedParent, $appendLayer);
        },
        afterdrop: function ($parent, $layer, dropped, cmpName) {
            if (typeof cmpName === 'undefined') {
                cmpName = $layer.attr('data-type');
            }
            if (dropped) {
                //
            } else {
                //this.library.populateData(cmpName, $layer);
            }
            //fix manage data link
            this.library.fixManageDataLink();
            this.view.view({ dataType: cmpName, dropped: dropped, layer: $layer });
        },
        settingDOMs: {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM('dynamic_cmp/list_setting_basic'),
                    "onload": function ($item) {
                        let templateId = $activeDOM.attr('data-post-template-id');
                        if (typeof templateId === 'undefined' || templateId == '0') {
                            $('#dymcmpSetTmpMsg').removeClass('Dn');
                            $('#cmpListBasicSet').addClass('Dn');
                            return;
                        }
                        if ($activeDOM.find('.dyn_no_data').length > 0) {
                            $('#dymcmpSetDataMsg').removeClass('Dn');
                            $('#cmpListBasicSet').addClass('Dn');
                            return;
                        }
                        $('#dymcmpSetTmpMsg').addClass('Dn');
                        $('#dymcmpSetDataMsg').addClass('Dn');
                        $('#cmpListBasicSet').removeClass('Dn');
                        //set manage data url
                        //let postTypeId = $activeDOM.attr('data-post-type-id');
                        //let manageUrl = SageFrameHostURL + '/dashboard/Post-Data/' + postTypeId;
                        //$('#dyncmpManageData').attr('href', manageUrl);

                        //display options
                        let options = [];
                        $.each(Object.keys(component["dynamic_cmp_list"].library.display.options), function (i, o) {
                            if (component["dynamic_cmp_list"].library.display.options[o].enabled) {
                                options.push("<option value='" + o + "'>" + component["dynamic_cmp_list"].library.display.options[o].name + "</option>");
                            }
                        });
                        $('#dyncmpDisplay').html(options.join(''));
                        $('#dyncmpDisplay').off().on('change', function (e) {
                            let display = $(this).val();
                            component["dynamic_cmp_list"].library.display.displayChange(e, $activeDOM, display);
                        });
                        let display = component["dynamic_cmp_list"].library.display.getDisplay($activeDOM);
                        $('#dyncmpDisplay').val(display).trigger('change');

                        //general item setting
                        $('#itemSetting').DynamicCmpItemsSetting({
                            limit: true,
                            offset: true,
                            bindOnChange: true
                        });

                        //detail page
                        let hasDetail = $activeDOM.attr('data-post-has-detail');
                        if (typeof hasDetail !== 'undefined' && hasDetail == 1) {
                            $('#postDetailPageLink').removeClass('Dn');
                            let $pagelistSelect = $('#postDetailPageList');
                            let options = EasyLibrary.GetPageOption();
                            $pagelistSelect.append(options);
                            let detailPage = $activeDOM.attr('data-post-detail-page');
                            if (typeof detailPage !== 'undefined') {
                                $("#postDetailPageList option").filter(function () {
                                    return this.text == detailPage;
                                }).attr('selected', true);
                            }
                            $pagelistSelect.off().on('change', function () {
                                let $this = $(this);
                                let $selected = $pagelistSelect.find('option:selected');
                                let url = $selected.text();
                                $activeDOM.attr('data-post-detail-pageid', $selected.val());
                                $activeDOM.attr('data-post-detail-page', url);
                            });
                        }
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": "<div id='cmpSpacing'></div>",
                    "onload": function ($item) {
                        $('#cmpSpacing').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM
                        });
                    }

                },
                "Alignment": {
                    "options": {
                        "horizontal": ["left", "center", "right"]
                    }
                },
                "Scroll Effect": {
                    "options": [],
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        styleDOMs: {
            "tabs": {
                "Background": {
                    "custom": true,
                    "DOM": "<div id='cmpBG'></div>",
                    "onload": function () {
                        $('#cmpBG').AdvanceBackground({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM
                        });
                    }
                },
                "Border": {
                    "custom": true,
                    "DOM": "<div id='cmpBorder'></div>",
                    "onload": function () {
                        $('#cmpBorder').AdvanceBorder({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM
                        });
                    }
                },
                "Box Radius": {
                    "custom": true,
                    "DOM": "<div id='cmpBoxRad'></div>",
                    "onload": function () {
                        $('#cmpBoxRad').AdvanceBoxRadius({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM
                        });
                    }
                },
                "Box Shadow": {
                    "custom": true,
                    "DOM": "<div id='cmpBoxShadow'></div>",
                    "onload": function () {
                        $('#cmpBoxShadow').AdvanceBoxShadow({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM
                        });
                    }
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            }
        },
        responsiveDOMs: {
            "tabs": {
                "Basic": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('dynamic_cmp/list_setting_basic_res'),
                    "onload": function ($item) {
                        let display = component["dynamic_cmp_list"].library.display.getDisplay($activeDOM);
                        //component["dynamic_cmp_list"].library.display.options[display].init($activeDOM);
                        //setup settings after init, since settings read dom
                        component["dynamic_cmp_list"].library.display.options[display].setupResponsiveSettings();
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
                            "position": ["all", "top", "left", "bottom", "right"]
                        }
                    },
                    "selectLayer": function ($elem) {
                        return $activeDOM;
                    },
                },
                "Alignment": {
                    "options": {
                        "horizontal": ["left", "center", "right"],
                    },
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        binddata: function ($layer, apiResponse) {
            //destroy used display plugin
            let display = component["dynamic_cmp_list"].library.display.getDisplay($layer);
            if (typeof display === 'undefined') {
                display = 'list';
            }
            try {
                component["dynamic_cmp_list"].library.display.options[display].destroy($layer);
                component["dynamic_cmp_list"].library.clearList($layer);
            } catch (e) {
                //
            }
            let $itemTemplate = $layer.find('.dynamicComponentListItemTmp');

            if ($itemTemplate.find('.dyn_no_tmp').length > 0) {
                $layer.find('.dynamicComponentListWrap').html($itemTemplate.eq(0).clone().removeClass('Dn tDn mDn dynamicComponentListItemTmp').addClass('dynamicComponentListItem Dib tDib mDib'));
                return;
            }

            if (apiResponse.length == 0) {
                let no_data = '<div class="dynamicComponentListItem"><p class="dyn_no_data">No data</p></div>';
                if (EditorMode) {
                    $layer.find('.dynamicComponentListWrap').html(no_data);
                    //let $template = $itemTemplate.eq(0).clone().removeClass('Dn dynamicComponentListItemTmp').addClass('dynamicComponentListItem');
                    //$layer.find('.dynamicComponentListWrap').html($template);
                } else {
                    $layer.find('.dynamicComponentListWrap').html(no_data);
                }
                return;
            }
            $layer.data('apiResponse', apiResponse);
            $.each(apiResponse, function (i, v) {
                let jsonData = JSON.parse(this.JsonData);
                let $template = $itemTemplate.eq(0).clone().removeClass('Dn tDn mDn dynamicComponentListItemTmp').addClass('dynamicComponentListItem Dib tDib mDib').attr('data-postdata-id', v.PostDataId);
                $.each(jsonData, function (index, value) {
                    let $targets = $template.find('div[data-value-key="' + value.name + '"]');
                    if ($targets.length > 0) {
                        $.each($targets, function (i, target) {
                            let $target = $(target);
                            $target.removeClass('Dn tDn mDn').addClass('Dib tDib mDib');
                            let fldval = '';
                            let defval = $target.attr('data-default-value');
                            if (typeof defval === 'undefined') {
                                defval = '';
                            }
                            switch (value.type) {
                                case 'sageIcon':
                                    fldval = value.value.trim();
                                    if (fldval.length == 0) {
                                        if ($target.find('.dyn-hide-no-val').length > 0) {
                                            $target.addClass('Dn tDn mDn').removeClass('Dib tDib mDib');
                                            break;
                                        }
                                        fldval = defval;
                                    }
                                    $target.find('.dyncmpfldval').removeClass(function (index, className) {
                                        return (className.match(/\bfa-([^\s]+)\b/g) || []).join(' ');
                                    }).addClass(fldval);
                                    break;
                                case 'text':
                                case 'textarea':
                                    fldval = value.value.trim();
                                    if (fldval.length == 0) {
                                        if ($target.find('.dyn-hide-no-val').length > 0) {
                                            $target.addClass('Dn tDn mDn').removeClass('Dib tDib mDib');
                                            break;
                                        }
                                        fldval = defval;
                                    }
                                    $target.find('.dyncmpfldval').text(fldval);
                                    break;
                                case 'richtext':
                                    if (value.value.trim().length == 0 && $target.find('.dyn-hide-no-val').length > 0) {
                                        $target.addClass('Dn tDn mDn').removeClass('Dib tDib mDib');
                                        break;
                                    }
                                    $target.find('.dyncmpfldval').html(value.value);
                                    $target.find('.documenttext').removeAttr('contenteditable');
                                    break;
                                case 'sageMedia':
                                    try {
                                        let val = JSON.parse(value.value);
                                        if (EditorMode) {
                                            $target.find('.dyncmpfldval').attr('src', val.filePath).attr('alt', val.alt);
                                        } else if (typeof FakeImageURL !== 'undefined' && typeof ImageLazyLoader === 'function') {
                                            $target.find('.dyncmpfldval').attr('data-cimage', val.filePath).attr('src', FakeImageURL).attr('alt', val.alt);
                                        } else {
                                            $target.find('.dyncmpfldval').attr('src', val.filePath).attr('alt', val.alt);
                                        }
                                    } catch (e) {
                                        if ($target.find('.dyn-hide-no-val').length > 0) {
                                            $target.addClass('Dn tDn mDn').removeClass('Dib tDib mDib');
                                            break;
                                        }
                                        if (defval) {
                                            if (EditorMode) {
                                                $target.find('.dyncmpfldval').attr('src', defval).attr('alt', value.label);
                                            } else if (typeof FakeImageURL !== 'undefined' && typeof ImageLazyLoader === 'function') {
                                                $target.find('.dyncmpfldval').attr('data-cimage', defval).attr('src', FakeImageURL).attr('alt', value.label);
                                            } else {
                                                $target.find('.dyncmpfldval').attr('src', defval).attr('alt', value.label);
                                            }
                                        }
                                    }
                                    break;
                                case 'checkbox-group':
                                case 'select':
                                case 'radio-group':
                                    displayMultipleValues($target, value);
                                    break;
                                case 'sageVideo':
                                    try {
                                        let vid = JSON.parse(value.value);
                                        if (typeof vid.url !== 'undefined' && vid.url && vid.url.trim().length > 0) {
                                            displayVideo($target, vid);
                                        } else {
                                            throw "no video url";
                                        }
                                    } catch (e) {
                                        if ($target.find('.dyn-hide-no-val').length > 0) {
                                            $target.addClass('Dn tDn mDn').removeClass('Dib tDib mDib');
                                            break;
                                        }
                                        if (defval) {
                                            displayVideo($target, { provider: 'youtube', url: defval });
                                        }
                                    }
                                    break;
                                case 'sageUrl':
                                    fldval = value.value.trim();
                                    if (fldval.length == 0) {
                                        if ($target.find('.dyn-hide-no-val').length > 0) {
                                            $target.addClass('Dn tDn mDn').removeClass('Dib tDib mDib');
                                            break;
                                        }
                                        fldval = defval;
                                    }
                                    if (fldval.length > 0 && fldval != '#' && fldval.indexOf('://') == -1) {
                                        fldval = 'http://' + fldval;
                                    }
                                    $target.find('.dyncmpfldval').attr('href', fldval);
                                    break;
                            }
                        });
                    }
                });
                $layer.find('.dynamicComponentListWrap').append($template);
            });
            ViewMouseOverEffect();
            component["dynamic_cmp_list"].library.setDetailPageLink($layer);
            component["dynamic_cmp_list"].library.display.display($layer);

            //$itemTemplate.remove();

            function displayVideo($target, vid) {
                switch (vid.provider) {
                    case 'youtube':
                        let ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                        let yt = vid.url.trim().match(ytRegExp);

                        if (yt && yt[2].length == 11) {
                            let youTubeurl = 'https://www.youtube.com/embed/';
                            let ytUrl = youTubeurl + yt[2];
                            $target.find('.dyncmpfldval > iframe').attr('src', ytUrl);
                        }
                        break;
                }
            }

            function displayMultipleValues($target, value) {
                let valuesObj = value.values.filter(function (v) {
                    return v.selected == true;
                });
                let values = valuesObj.map(function (v) {
                    return v.label;
                });
                if (values.length == 0) {
                    if ($target.find('.dyn-hide-no-val').length > 0) {
                        $target.addClass('Dn tDn mDn').removeClass('Dib tDib mDib');
                        return;
                    }
                    try {
                        let defval = $target.attr('data-default-value');
                        values = JSON.parse(defval);
                    } catch (e) {
                        //
                    }
                }
                let setting = $target.attr('data-dynamic-setting');
                try {
                    setting = JSON.parse(setting);
                } catch (e) {
                    setting = {};
                }
                let display = 'comma_list';
                let cls = '';
                if (typeof setting['display'] !== 'undefined') {
                    display = setting['display'];
                }
                if (typeof setting['type'] !== 'undefined') {
                    cls = setting['type'];
                }
                if (typeof setting['Type'] !== 'undefined') {
                    cls = setting['Type'];
                }
                let $li = "";
                for (let v of values) {
                    $li += "<li>" + v + "</li>";
                }
                switch (display) {
                    case 'comma_list':
                        $target.find('.dyncmpfldval').text(values.join(', '));
                        break;
                    case 'unordered_list':
                        let $ul = "<ul class='" + cls + "'>" + $li + "</ul>";
                        $target.find('.dyncmpfldval').html($ul);
                        break;
                    case 'ordered_list':
                        let $ol = "<ol class='" + cls + "'>" + $li + "</ol>";
                        $target.find('.dyncmpfldval').html($ol);
                        break;
                    default:
                        $target.find('.dyncmpfldval').text(display + ' display not implemented');
                }
            }
        },
        binddataerror: function ($parent, response) { },
        removeedit: function ($editDOM, cmpName) {
            $editDOM.find('.editor-component[data-type="' + cmpName + '"]').each(function () {
                var $this = $(this);

                let $listWrapper = $this.find('.dynamicComponentListWrap');
                //append one hidden list template
                let $listItems = $listWrapper.find('.dynamicComponentListItem');
                if ($listItems.length > 0 && $listItems.find('.dyn_no_data').length == 0) {
                    let hdnTmp = $listItems.eq(0).clone().removeAttr('data-postdata-id').addClass('Dn tDn mDn dynamicComponentListItemTmp').removeClass('dynamicComponentListItem Dib tDib mDib').wrapAll('<div>').parent().html();
                    hdnTmp = $(hdnTmp).find('.editor-component.dyncmpfld').removeAttr('data-type').end().wrapAll('<div />').parent().html();
                    $this.find('.dynamicComponentListItemTmp').remove();
                    $this.append(hdnTmp);
                    component["dynamic_cmp_list"].library.fillDefaultValues($this.find('.dynamicComponentListItemTmp'));
                }
                $listWrapper.empty();
                $listWrapper.removeClass(function (index, className) {
                    return (className.match(/slick-[\w]+/g) || []).join(' ');
                });
            });
        },
        remove: function ($cloneDOM, cmpName) {
            $cloneDOM.find('.editor-component[data-type="' + cmpName + '"]').each(function () {
                let $this = $(this);

                let $listWrapper = $this.find('.dynamicComponentListWrap');
                //append one hidden list template
                let $listItems = $listWrapper.find('.dynamicComponentListItem');
                if ($listItems.length > 0 && $listItems.find('.dyn_no_data').length == 0) {
                    let hdnTmp = $listItems.eq(0).clone().removeAttr('data-postdata-id').addClass('Dn tDn mDn dynamicComponentListItemTmp').removeClass('dynamicComponentListItem Dib tDib mDib').wrapAll('<div>').parent().html();
                    hdnTmp = $(hdnTmp).find('.editor-component.dyncmpfld').removeAttr('data-type').end().wrapAll('<div />').parent().html();
                    $this.find('.dynamicComponentListItemTmp').remove();
                    $this.append(hdnTmp);
                    component["dynamic_cmp_list"].library.fillDefaultValues($this.find('.dynamicComponentListItemTmp'));
                }
                $listWrapper.empty();
                $listWrapper.removeClass(function (index, className) {
                    return (className.match(/slick-[\w]+/g) || []).join(' ');
                });
                let APICntrl = new APIController();
                APICntrl.ComponentName = cmpName;
                APICntrl.NameSpace = "Cbuilder.Core.DynamicPost";
                APICntrl.ClassNames = "DynamicComponentController";
                APICntrl.MethodNames = "GetPostDataByKey";
                //you need to set params here according to the logic
                let offset = component["dynamic_cmp_list"].library.getOffset($this);
                let limit = component["dynamic_cmp_list"].library.getLimit($this);
                let params = [
                    $this.attr('data-post-type-id'),
                    offset,
                    limit,
                    '%SiteID%'
                ];
                APICntrl.Parameters = params.join(',');
                //your componentID here
                APICntrl.ComponentID = EasyLibrary.GetComponenetID($this);
                APICntrl.Type = "method";
                EasyLibrary.SetAPI(APICntrl);
            });
        },
        library: {
            populateData: function (cmpName, $layer) {
                let id = $layer.attr('data-post-type-id');
                let offset = component["dynamic_cmp_list"].library.getOffset($layer);
                let limit = component["dynamic_cmp_list"].library.getLimit($layer);
                $.ajax({
                    url: `${SageFrameHostURL}/Dashboard/DynamicPost/GetPostDataByKey`,
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("XSRF-TOKEN", $('input:hidden[name="__RequestVerificationToken"]').val());
                    },
                    traditional: true,
                    type: 'POST',
                    data: JSON.stringify({
                        PostKey: id,
                        offset: parseInt(offset),
                        limit: parseInt(limit)
                    }),
                    async: false,
                    success: function (data) {
                        component[cmpName].binddata($layer, data);
                    },
                    error: function () {
                        console.log("Error fetching list data.");
                    }
                });
            },
            display: {
                displayChange: function (e, $layer, display) {
                    let templateId = $layer.attr('data-post-template-id');
                    if (typeof templateId === 'undefined' || templateId == '0' || $layer.find('.dyn_no_data').length > 0) {
                        return;
                    }
                    let prevDisplay = component["dynamic_cmp_list"].library.display.getDisplay($layer);
                    component["dynamic_cmp_list"].library.display.options[prevDisplay].destroy($layer);
                    $layer.attr('data-display', display);
                    $('.dyncmpDisplaySet').addClass('Dn');
                    $('#' + display + 'Setting').removeClass('Dn');
                    if (e.isTrigger === 'undefined' || !e.isTrigger) {
                        component["dynamic_cmp_list"].library.display.options[display].beforeInit($layer);
                    }
                    component["dynamic_cmp_list"].library.display.options[display].init($layer);
                    //setup settings after init, since settings read dom
                    component["dynamic_cmp_list"].library.display.options[display].setupSettings();
                },
                getDisplay: function ($layer) {
                    let display = $layer.attr('data-display');
                    if (typeof display === 'undefined' || component["dynamic_cmp_list"].library.display.options[display] === 'undefined') {
                        display = 'list';
                    }
                    return display;
                },
                display: function ($layer) {
                    let display = component["dynamic_cmp_list"].library.display.getDisplay($layer);
                    component["dynamic_cmp_list"].library.display.options[display].init($layer);
                },
                options: {
                    accordion: {
                        name: 'Accordion',
                        enabled: false,
                        DOM: EasyLibrary.ReadDOM('dynamic_cmp/list_setting_basic_accordion'),
                        responsiveDOM: EasyLibrary.ReadDOM('dynamic_cmp/list_setting_basic_accordion'),
                        init: function ($layer) {
                            let $wrapper = $layer.find('.dynamicComponentListWrap');
                            let d = ViewDeviceAlpha();
                            this.library.resize(d, $wrapper, $layer);
                        },
                        beforeInit: function ($layer) {
                            let $wrapper = $layer.find('.dynamicComponentListWrap');
                            let $items = $wrapper.find('.dynamicComponentListItem');
                            let listClasses = [];
                            let $item = $items.first();
                            if ($item) {
                                let sfPat = /\b([a-z]?)sfCol_([0-9]{1,3})\b/g;
                                let gPat = /\b([a-z]?)gP([a-z])-([0-9]{1,3})\b/g;
                                listClasses = $item.attr('class').match(sfPat) || [];
                                let gutterClasses = $item.attr('class').match(gPat) || [];
                                $.merge(listClasses, gutterClasses);
                            }

                            $layer.attr('data-list-classes', listClasses.join(' '));
                            $items.removeClass(listClasses.join(' '));
                            this.library.fixDOM($wrapper, $items);
                        },
                        resize: function (d, $listWrapper, $dataHolder) {
                            this.library.resize(d, $listWrapper, $dataHolder);
                        },
                        setupSettings: function () {
                            $('#displaySetting').off().empty().html(this.DOM);
                            let apiResponse = $activeDOM.data('apiResponse');
                            console.log('apiResponse ', apiResponse);
                            if (typeof apiResponse !== 'undefined' && apiResponse.length > 0) {
                                try {
                                    let data = JSON.parse(apiResponse[0].JsonData);
                                    let txtFlds = data.filter(function (i) {
                                        return i.type == 'text';
                                    });
                                    let titleOptions = ['<option value="">Choose Field</option>'];
                                    $.each(txtFlds, function (i, o) {
                                        titleOptions.push("<option value='" + o.name + "'>" + o.label + "</option>");
                                    });
                                    $('#accTitleField').html(titleOptions.join(''));
                                } catch (e) {
                                    //
                                }
                            }
                            let $listWrapper = $activeDOM.find('.accordianWrap');
                            let $items = $activeDOM.find('.acordianItem');
                            $('#accTitleField').off('change').on('change', function () {
                                let v = $(this).val();
                                $listWrapper.attr('data-acctitlefld', v);
                                component["dynamic_cmp_list"].library.display.options.accordion.library.setAccordionTitle($activeDOM, $items, v);
                            });
                        },
                        setupResponsiveSettings: function () {
                            //$('#cmpListBasicSetRes').off().empty().html(this.responsiveDOM);
                            //console.log('apiResponse ', $activeDOM.data('apiResponse'));
                        },
                        destroy: function ($layer) {
                            let $listWrapper = $layer.find('.dynamicComponentListWrap');
                            let $items = $listWrapper.find('.dynamicComponentListItem');
                            $.each($items, function (i, el) {
                                $listWrapper.append($(el));
                            });
                            $listWrapper.find('.acordianItem').remove();
                            $listWrapper.removeClass('accordianWrap');
                        },
                        library: {
                            fixDOM: function ($listWrapper, $items) {
                                if ($listWrapper.find('.accordianTitle').length > 0) {
                                    return;
                                }
                                let accTitleTmp = `<div class="accordianTitle sfCol_100 edit-border TxAl-l mTxAl-l Mb-0 Mt-0 tPr-5 tPl-5 tPb-10 tPt-10 tMb-0 tMt-0 mPr-5 mPl-5 mPb-10 mPt-10 mMb-0 mMt-0 ff-montserrat f-weight-400 Pt-0 Pb-0 Pl-20 Pr-20 tTxAl-l active" style="cursor: pointer; background-color: rgb(36, 175, 178); border-radius: 0px; border-style: solid; border-width: 0px 0px 2px; border-bottom-color: rgb(212, 212, 212); justify-content: center;">
			<div class="accordian-icon display-inline-block" style="width: 20px; height: 20px; display: inline-block; vertical-align:top;">
				<div class="dis-table" style="display:table;">
					<div class="dis-table-cell TxAl-c tTxAl-c mTxAl-c" style="display:table-cell;vertical-align:middle;">
						<i class="onhovercolor fa fa-heart" style="font-size: 15px; color: rgb(255, 255, 255);"></i>
					</div>
				</div>
			</div>
			<div class="accordian-head edit-border display-inline-block" style="min-width:15px; display:inline-block; vertical-align:top;">
				<h2 class="Mb-0 tMb-0 mMb-0 mFs-14 Fs-17 ff-montserrat f-weight-400 txU Lh-54 tFs-16 tLh-26 mLh-24" style="color: rgb(255, 255, 255); margin: 0px;">Title</h2>
			</div>
			<div class="accordian-icon static float-right" style="display: block; width: 20px; height: 20px; float:right;">
				<div class="dis-table" style="display:table;">
					<div class="dis-table-cell TxAl-c tTxAl-c mTxAl-c" style="display:table-cell;vertical-align:middle;">
						<i class="onhovercolor fa fa-chevron-up" style="font-size: 15px; color: rgb(255, 255, 255);"></i>
					</div>
				</div>
			</div>
		</div>`;
                                $listWrapper.addClass('accordianWrap');
                                $listWrapper.attr("data-activecolor", "rgba(36, 175, 178, 1)");
                                $listWrapper.attr("data-hovercolor", "rgba(0, 0, 0, 1)");
                                $listWrapper.attr("data-titlebgcolor", "rgba(109, 109, 109, 1)");
                                $listWrapper.attr("data-titlecolor", "rgba(247, 247, 247, 1)");
                                $listWrapper.attr("data-iconcolor", "rgba(255, 255, 255, 1)");
                                $listWrapper.attr("data-activetitle", "rgba(255, 255, 255, 1)");
                                $listWrapper.attr("data-activeicon", "rgba(255, 255, 255, 1)");
                                $.each($items, function (i, el) {
                                    let accTitle = $(accTitleTmp).find('.accordian-head > h2').text('Item ' + i).end().wrapAll('<div />').parent().html();
                                    $(el).wrapAll("<div class='acordianItem edit-border sfCol_100'>").before($(accTitle)).wrapAll("<div class='acordianContent sfCol_100'>");
                                });
                                //console.log('apiResponse ' , $listWrapper.closest('.dynamic-component-list').data('apiResponse'));
                            },
                            setAccordionTitle: function ($layer, $items, field) {
                                let apiResponse = $layer.data('apiResponse');
                                $.each($items, function (i, el) {
                                    let postDataID = $(el).find('.dynamicComponentListItem').attr('data-postdata-id');
                                    let data = apiResponse.find(function (x) {
                                        return x.PostDataId == postDataID;
                                    });
                                    if (typeof data !== 'undefined' && data) {
                                        let jsonData = JSON.parse(data.JsonData);
                                        let title = jsonData.find(function (y) {
                                            return y.name == field;
                                        });
                                        if (typeof title !== 'undefined') {
                                            $(el).find('.accordian-head > h2').text(title.value);
                                        } else {
                                            $(el).find('.accordian-head > h2').text('Item ' + i);
                                        }
                                    }
                                });
                            },
                            resize: function (d, $listWrapper, $layer) {
                                let $items = $layer.find('.dynamicComponentListItem');
                                let titleField = $listWrapper.attr('data-acctitlefld');
                                this.fixDOM($listWrapper, $items);
                                let accItems = $layer.find('.acordianItem');
                                this.setAccordionTitle($layer, accItems, titleField);
                                this.initAccordion();
                            },
                            initAccordion: function () {
                                let AccorSpeed = 500;
                                $('.accordianTitle').off('click').on('click', function () {
                                    let $this = $(this);

                                    let $thisParent = $this.closest('.accordianWrap').eq(0);
                                    let AccorItems = $thisParent.find('>.acordianItem');
                                    AccorItems.find('>.accordianTitle.active').css('background-color', $thisParent.attr('data-titlebgcolor'));
                                    AccorItems.find('>.accordianTitle.active h2').css('color', $thisParent.attr('data-titlecolor'));
                                    AccorItems.find('>.accordianTitle.active .accordian-icon .dis-table i').css('color', $thisParent.attr('data-iconcolor'));
                                    AccorItems.find('>.accordianTitle.active').next('.acordianContent').slideUp(AccorSpeed);
                                    AccorItems.find('>.accordianTitle .accordian-icon.static .dis-table i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
                                    AccorItems.find('>.accordianTitle').removeClass('active');
                                    let activeAcor = $this.next('.acordianContent');
                                    if (activeAcor.is(":hidden")) {
                                        $this.addClass('active');
                                        $this.find('.accordian-icon.static .dis-table i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
                                        $this.css('background-color', $thisParent.attr('data-activecolor'));
                                        $this.find('h2').css('color', $thisParent.attr('data-activetitle'));
                                        $this.find('.accordian-icon .dis-table i').css('color', $thisParent.attr('data-activeicon'));
                                        activeAcor.slideDown(AccorSpeed);
                                    } else {
                                        $this.removeClass('active');
                                        activeAcor.slideUp(AccorSpeed);
                                    }
                                });
                                $('.accordianTitle').off('mouseover mouseout').on('mouseover mouseout', function (evt) {
                                    let $this = $(this);
                                    let $thisParent = $this.parents('.accordianWrap').eq(0);
                                    if (evt.type == 'mouseover') {
                                        $this.find('h2').css('color', $thisParent.attr('data-activetitle'));
                                        $this.find('.accordian-icon i').css('color', $thisParent.attr('data-activeicon'));
                                        $this.css('background-color', $thisParent.attr('data-hovercolor'));
                                    } else if (evt.type == "mouseout") {
                                        if ($this.hasClass('active')) {
                                            $this.find('h2').css('color', $thisParent.attr('data-activetitle'));
                                            $this.find('.accordian-icon .dis-table i').css('color', $thisParent.attr('data-activeicon'));
                                            $this.css('background-color', $thisParent.attr('data-activecolor'));

                                        } else {
                                            $this.find('h2').css('color', $thisParent.attr('data-titlecolor'));
                                            $this.find('.accordian-icon  i').css('color', $thisParent.attr('data-iconcolor'));
                                            $this.css('background-color', $thisParent.attr('data-titlebgcolor'));
                                        }
                                    }
                                });
                            }
                        }
                    },
                    list: {
                        name: 'List',
                        enabled: true,
                        DOM: EasyLibrary.ReadDOM('dynamic_cmp/list_setting_basic_list'),
                        responsiveDOM: EasyLibrary.ReadDOM('dynamic_cmp/list_setting_basic_res_list'),
                        init: function ($layer) {
                            //
                        },
                        beforeInit: function ($layer) {
                            let $wrapper = $layer.find('.dynamicComponentListWrap');
                            let $items = $wrapper.find('.dynamicComponentListItem');
                            let classes = $layer.attr('data-list-classes');
                            if (typeof classes !== 'undefined') {
                                let sfPat = /\b([a-z]?)sfCol_([0-9]{1,3})\b/g;
                                let gPat = /\b([a-z]?)gP([a-z])-([0-9]{1,3})\b/g;
                                $items.removeClass(function (index, className) {
                                    return (className.match(sfPat) || []).join(' ');
                                }).removeClass(function (index, className) {
                                    return (className.match(gPat) || []).join(' ');
                                }).addClass(classes);
                            }
                        },
                        resize: function (d, $slider, $dataHolder) {
                            $dataHolder.removeAttr('data-list-classes');
                        },
                        setupSettings: function () {
                            $('#displaySetting').off().empty().html(this.DOM);
                            $("#itemPerRow").off().AdvanceItemsPerRow({
                                targetParent: $activeDOM,
                                targetElem: '.dynamicComponentListItem',
                                callback: function (itemperrow) {
                                    itemGutter(itemperrow);
                                }
                            });
                            let itemperrow = $('#itemPerRow').find('select option:selected').text();
                            itemGutter(itemperrow);
                            function itemGutter(itemperrow) {
                                $("#itemGutter").off().AdvanceGutterSpace({
                                    targetParent: $activeDOM,
                                    targetElem: '.dynamicComponentListItem',
                                    itemsperrow: itemperrow
                                });
                            }
                        },
                        setupResponsiveSettings: function () {
                            $('#cmpListBasicSetRes').off().empty().html(this.responsiveDOM);
                            $("#resItemPerRow").off().AdvanceItemsPerRow({
                                targetParent: $activeDOM,
                                targetElem: '.dynamicComponentListItem',
                                callback: function (itemperrow) {
                                    itemGutter(itemperrow);
                                }
                            });
                            let itemperrow = $('#resItemPerRow').find('select option:selected').text();
                            itemGutter(itemperrow);
                            function itemGutter(itemperrow) {
                                $("#itemGutter").off().AdvanceGutterSpace({
                                    targetParent: $activeDOM,
                                    targetElem: '.dynamicComponentListItem',
                                    itemsperrow: itemperrow
                                });
                            }
                        },
                        destroy: function ($layer) {
                            //
                        }
                    },
                    slider: {
                        name: 'Slider',
                        enabled: true,
                        DOM: EasyLibrary.ReadDOM('dynamic_cmp/list_setting_basic_slider'),
                        responsiveDOM: EasyLibrary.ReadDOM('dynamic_cmp/list_setting_basic_res_slider'),
                        arrows: {
                            1: {
                                id: 1,
                                prev: '<div class="slick-prev cs-arrow-s1" aria-label="Previous" type="button">Previous</div>',
                                next: '<div class="slick-next cs-arrow-s1" aria-label="Next" type="button">Next</div>'
                            },
                            2: {
                                id: 2,
                                prev: '<div class="slick-prev cs-arrow-s2" aria-label="Previous" type="button">Previous</div>',
                                next: '<div class="slick-next cs-arrow-s2" aria-label="Next" type="button">Next</div>'
                            },
                            3: {
                                id: 3,
                                prev: '<div class="slick-prev cs-arrow-s3" aria-label="Previous" type="button">Previous</div>',
                                next: '<div class="slick-next cs-arrow-s3" aria-label="Next" type="button">Next</div>'
                            },
                            4: {
                                id: 4,
                                prev: '<div class="slick-prev cs-arrow-s4" aria-label="Previous" type="button">Previous</div>',
                                next: '<div class="slick-next cs-arrow-s4" aria-label="Next" type="button">Next</div>'
                            },
                            5: {
                                id: 5,
                                prev: '<div class="slick-prev cs-arrow-s5" aria-label="Previous" type="button">Previous</div>',
                                next: '<div class="slick-next cs-arrow-s5" aria-label="Next" type="button">Next</div>'
                            },
                            6: {
                                id: 6,
                                prev: '<div class="slick-prev cs-arrow-s6" aria-label="Previous" type="button">Previous</div>',
                                next: '<div class="slick-next cs-arrow-s6" aria-label="Next" type="button">Next</div>'
                            }
                        },
                        init: function ($layer) {
                            let $wrapper = $layer.find('.dynamicComponentListWrap');
                            let d = ViewDeviceAlpha();
                            this.library.resize(d, $wrapper, $layer);
                        },
                        beforeInit: function ($layer) {
                            let $wrapper = $layer.find('.dynamicComponentListWrap');
                            let $items = $wrapper.find('.dynamicComponentListItem');
                            let listClasses = [];
                            let $item = $items.first();
                            if ($item) {
                                let sfPat = /\b([a-z]?)sfCol_([0-9]{1,3})\b/g;
                                let gPat = /\b([a-z]?)gP([a-z])-([0-9]{1,3})\b/g;
                                listClasses = $item.attr('class').match(sfPat) || [];
                                let gutterClasses = $item.attr('class').match(gPat) || [];
                                $.merge(listClasses, gutterClasses);
                            }

                            $layer.attr('data-list-classes', listClasses.join(' '));
                            $items.removeClass(listClasses.join(' '));
                        },
                        resize: function (d, $slider, $dataHolder) {
                            this.library.resize(d, $slider, $dataHolder);
                        },
                        library: {
                            toggleAdaptiveHeightCls: function ($slider, adaptive, d, height) {
                                let self = this;
                                if (adaptive) {
                                    self.removeHeightClass($slider);
                                } else {
                                    self.addHeightClass(d, $slider, height);
                                }
                            },
                            addHeightClass: function (d, $slider, height) {
                                let $slides = $slider.find('.dynamicComponentListItem');
                                //let $editorCols = $slider.find('.dynamicComponentListItem > .webEditorCol');
                                $slides.addClass(d + 'H-' + height);
                                //$editorCols.addClass(d + 'H-' + height);
                            },
                            removeHeightClass: function ($slider) {
                                let $slides = $slider.find('.dynamicComponentListItem');
                                //let $editorCols = $slider.find('.dynamicComponentListItem > .webEditorCol');
                                RemoveClassByPattern($slides, 'H-[0-9]{1,4}');
                                //RemoveClassByPattern($editorCols, 'H-[0-9]{1,4}');
                            },
                            getArrowStyleJSON: function ($dataHolder) {
                                let arrow_json = {
                                    id: 1,
                                    top: 50,
                                    side: 25,
                                    //bgcolor: 'rgba(236, 228, 76, 1)',
                                    bgcolor: '#1fb6ff',
                                    color: '#ffffff',
                                    posCls: 'cs-arrow-pos-1'
                                };
                                let arrow_data = $dataHolder.attr('data-arrowstyle');
                                if (typeof arrow_data != 'undefined') {
                                    try {
                                        let tmp = JSON.parse(arrow_data);
                                        arrow_json = tmp;
                                        if (typeof tmp.id === 'undefined') {
                                            arrow_json.id = 1;
                                        }
                                    } catch (e) {
                                        console.error("Slider: Error in arrow data");
                                    }
                                }
                                return arrow_json;
                            },
                            getArrowStyle: function ($dataHolder) {
                                let self = component["dynamic_cmp_list"].library.display.options.slider;
                                let arrow_json = self.library.getArrowStyleJSON($dataHolder);
                                if (typeof self.arrows[arrow_json.id] === 'undefined') {
                                    arrow_json.id = 1;
                                }
                                let arrow = self.arrows[arrow_json.id];
                                let cssTextPrev = [];
                                let cssTextNext = [];
                                if (typeof arrow_json.top !== 'undefined') {
                                    //cssTextPrev.push('top: ' + arrow_json.top + '% !important;');
                                    //cssTextNext.push('top: ' + arrow_json.top + '% !important;'); 
                                }
                                if (typeof arrow_json.side !== 'undefined') {
                                    //cssTextPrev.push('left: ' + arrow_json.side + 'px !important;');
                                    //cssTextNext.push('right: ' + arrow_json.side + 'px !important;');
                                }
                                if (typeof arrow_json.bgcolor !== 'undefined' && arrow_json.bgcolor) {
                                    arrow.bgcolor = arrow_json.bgcolor;
                                    cssTextPrev.push('background-color: ' + arrow_json.bgcolor + ' !important;');
                                    cssTextNext.push('background-color: ' + arrow_json.bgcolor + ' !important;');
                                }
                                if (typeof arrow_json.color !== 'undefined' && arrow_json.color) {
                                    arrow.color = arrow_json.color;
                                    cssTextPrev.push('color: ' + arrow_json.color + ' !important;');
                                    cssTextNext.push('color: ' + arrow_json.color + ' !important;');
                                }
                                if (cssTextPrev.length > 0) {
                                    arrow.prev = $(arrow.prev).css('cssText', cssTextPrev.join(' ')).wrapAll('<div />').parent().html();
                                }
                                if (cssTextNext.length > 0) {
                                    arrow.next = $(arrow.next).css('cssText', cssTextNext.join(' ')).wrapAll('<div />').parent().html();
                                }
                                //pos class
                                arrow.prev = $(arrow.prev)
                                    .removeClass(function (index, className) {
                                        return (className.match(/\bcs-arrow-pos-([0-9]+)\b/g) || []).join(' ');
                                    })
                                    .addClass(arrow_json.posCls).wrapAll('<div />').parent().html();
                                arrow.next = $(arrow.next)
                                    .removeClass(function (index, className) {
                                        return (className.match(/\bcs-arrow-pos-([0-9]+)\b/g) || []).join(' ');
                                    })
                                    .addClass(arrow_json.posCls).wrapAll('<div />').parent().html();
                                return arrow;
                            },
                            getDefaultOptions: function () {
                                return {
                                    infinite: false,//causes issue with videos
                                    dots: true,
                                    arrows: true,
                                    fade: false,
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    autoplay: true,
                                    autoplaySpeed: 5000,
                                    touchMove: true,
                                    adaptiveHeight: true,
                                    dotsClass: 'slick-dots cs-dots-pos-1'
                                };
                            },
                            getUserOptions: function ($dataHolder) {
                                let opt = {};
                                let infinite = $dataHolder.attr('data-infinite');
                                let arrows = $dataHolder.attr('data-arrows');
                                let dots = $dataHolder.attr('data-dots');
                                let fade = $dataHolder.attr('data-fade');
                                let autoplay = $dataHolder.attr('data-autoplay');
                                let autoplayspeed = $dataHolder.attr('data-autoplayspeed');
                                let perview = DeviceItemPerView($dataHolder.attr('data-perview'));
                                let slidescroll = DeviceItemPerView($dataHolder.attr('data-slidescroll'));
                                let adaptiveheight = $dataHolder.attr('data-adaptiveheight');
                                let dotsclass = $dataHolder.attr('data-dotsclass');
                                let dotsBGColor = $dataHolder.attr('data-dotsbgcolor');
                                let dotsPosCls = $dataHolder.attr('data-dotsposclass');
                                if (typeof infinite !== 'undefined') {
                                    opt.infinite = !!+infinite;
                                }
                                if (typeof arrows !== 'undefined') {
                                    opt.arrows = !!+arrows;
                                }
                                if (typeof dots !== 'undefined') {
                                    opt.dots = !!+dots;
                                }
                                if (typeof fade !== 'undefined') {
                                    opt.fade = !!+fade;
                                }
                                if (typeof autoplay !== 'undefined') {
                                    opt.autoplay = !!+autoplay;
                                }
                                if (typeof autoplayspeed !== 'undefined') {
                                    opt.autoplaySpeed = +autoplayspeed;
                                }
                                if (typeof perview !== 'undefined') {
                                    opt.slidesToShow = +perview;
                                }
                                if (typeof slidescroll !== 'undefined') {
                                    opt.slidesToScroll = +slidescroll;
                                }
                                if (typeof adaptiveheight !== 'undefined') {
                                    opt.adaptiveHeight = !!+adaptiveheight;
                                }
                                if (typeof dotsclass !== 'undefined') {
                                    opt.dotsClass = dotsclass;
                                }
                                let arrowStyle = this.getArrowStyle($dataHolder);
                                opt.prevArrow = arrowStyle.prev;
                                opt.nextArrow = arrowStyle.next;
                                //dots color
                                let customPaging = '<button type="button" class="cs-slick-dots-btn" />';
                                if (typeof dotsBGColor !== 'undefined') {
                                    customPaging = $(customPaging).css('background-color', dotsBGColor).wrapAll('<div />').parent().html();
                                }
                                if (typeof dotsPosCls !== 'undefined') {
                                    if (typeof opt.dotsClass === 'undefined') {
                                        opt.dotsClass = 'slick-dots ' + dotsPosCls;
                                    } else {
                                        opt.dotsClass += ' ' + dotsPosCls;
                                    }
                                }
                                opt.customPaging = function (slider, i) {
                                    return $(customPaging).text(i + 1);
                                };
                                return opt;
                            },
                            resetSlider: function ($slider, options) {
                                this.unSlick($slider);
                                this.initSlider($slider, options);
                            },
                            initSlider: function (elem, userOptions) {
                                let self = this;
                                let isEdit = $('.SetHdlr').length > 0;
                                let options = self.getDefaultOptions();
                                if (typeof userOptions !== 'undefined') {
                                    options = $.extend(options, userOptions);
                                }
                                if (isEdit) {
                                    //options.touchMove = false;
                                    //options.autoplay = false;
                                }
                                if (options.fade) {
                                    options.slidesToShow = 1;
                                    options.slidesToScroll = 1;
                                }
                                //fix boolean and integer type
                                options.arrows = !!+options.arrows;
                                options.dots = !!+options.dots;
                                options.infinite = !!+options.infinite;
                                options.fade = !!+options.fade;
                                options.touchMove = !!+options.touchMove;
                                options.autoplay = !!+options.autoplay;
                                options.autoplaySpeed = +options.autoplaySpeed;
                                options.slidesToShow = +options.slidesToShow;
                                options.slidesToScroll = +options.slidesToScroll;
                                options.adaptiveHeight = !!+options.adaptiveHeight;
                                //fix slidesToShow
                                if ($(elem).find('.dynamicComponentListItem').length == 1) {
                                    options.slidesToShow = 1;
                                }
                                $(elem).slick(options);
                            },
                            unSlick: function (elem) {
                                if ($(elem).hasClass('slick-initialized')) {
                                    try {
                                        $(elem).slick('unslick');
                                    } catch (e) {
                                        $(elem).find('.slick-arrow').remove();
                                        $(elem).find('.slick-dots').remove();
                                        $(elem).find('.cs-slick-dots-btn').closest('ul').remove();
                                        $(elem).append($(elem).find('.slick-slide:not(.slick-cloned)').find('.dynamicComponentListItem'));
                                        $(elem).find('.slick-list').remove();
                                        $(elem).removeClass(function (index, className) {
                                            return (className.match(/\bslick-([a-z0-9\.]+)\b/g) || []).join(' ');
                                        });
                                        $(elem).find('> ul').remove();
                                    }
                                }
                            },
                            getResponsiveSettings: function (d, $dataHolder) {
                                let self = this;
                                let fade = $dataHolder.attr('data-fade');
                                if (typeof fade === 'undefined') {
                                    fade = false;
                                } else {
                                    fade = !!+fade;
                                }
                                let k = self.deviceResolution[d];
                                let res_data = $dataHolder.attr('data-res');
                                let res_json = {};
                                if (typeof res_data !== 'undefined') {
                                    try {
                                        res_json = JSON.parse(res_data);
                                    } catch (e) {
                                        res_json = false;
                                        console.error("Slider: Error in responsive data");
                                    }
                                }
                                if (!res_json || typeof res_json[k] === 'undefined') {
                                    let userOptions = self.getUserOptions($dataHolder);
                                    let defOpts = self.getDefaultOptions();
                                    userOptions = $.extend(defOpts, userOptions);
                                    //res_json[k] = userOptions;
                                    res_json[k] = {};
                                    res_json[k].arrows = userOptions.arrows;
                                    res_json[k].dots = userOptions.dots;
                                    res_json[k].autoplay = userOptions.autoplay;
                                    res_json[k].autoplaySpeed = userOptions.autoplaySpeed;
                                    res_json[k].slidesToShow = userOptions.slidesToShow;
                                    res_json[k].slidesToScroll = userOptions.slidesToScroll;
                                    res_json[k].adaptiveHeight = userOptions.adaptiveHeight;
                                } else {
                                    //convert to boolean
                                    res_json[k].arrows = !!+res_json[k].arrows;
                                    res_json[k].dots = !!+res_json[k].dots;
                                    res_json[k].autoplay = !!+res_json[k].autoplay;
                                    res_json[k].adaptiveHeight = !!+res_json[k].adaptiveHeight;
                                }
                                res_json[k].fade = fade;
                                return res_json;
                            },
                            resize: function (d, $slider, $dataHolder) {
                                let self = this;
                                let userOptions = self.getUserOptions($dataHolder);
                                if (d.length > 0 && (d == 't' || d == 'm')) {
                                    let resSet = self.getResponsiveSettings(d, $dataHolder);
                                    let options = resSet[self.deviceResolution[d]];
                                    //extend with desktop options for common props
                                    options = $.extend(userOptions, options);
                                    self.resetSlider($slider, options);
                                } else {
                                    self.resetSlider($slider, userOptions);
                                }
                            },
                            deviceResolution: {
                                t: 1023,
                                m: 767,
                            },
                        },
                        setupSettings: function () {
                            $('#displaySetting').off().empty().html(this.DOM);
                            let compCS = component["dynamic_cmp_list"].library.display.options.slider;
                            let $slider = $activeDOM.find('.dynamicComponentListWrap');
                            let $dataHolder = $activeDOM;

                            let $heightElem = $slider.find('.dynamicComponentListItem');
                            let height = GetValueByClassName($heightElem.first(), 'H-[0-9]{1,4}', 'H-');
                            if (height == 0) {
                                height = 400;
                            }
                            AdvanceSageSlider($('#csSliderHeight'), $('#csSliderHeightHandle'), 400, 1000, height, CSHeightChange, $heightElem, 'px');
                            function CSHeightChange(space, $elem) {
                                ReplaceClassByPattern($elem, 'H-[0-9]{1,4}', 'H-' + space);
                                //ReplaceClassByPattern($elem.find('> .webEditorCol'), 'H-[0-9]{1,4}', 'H-' + space);
                                height = space;
                            }
                            let $heightSlider = $('#csSliderHeight').closest('.field-row');

                            loadSettings();
                            basicSettingEvents();

                            function loadSettings() {
                                let userOpts = compCS.library.getUserOptions($dataHolder);
                                let defOpts = compCS.library.getDefaultOptions();
                                let options = $.extend(defOpts, userOpts);
                                if (options.arrows) {
                                    $('#showArrowsCS').prop("checked", true);
                                    $('#arrowsStyleHld').removeClass('Dn');
                                    $('#arrowsPosHld').removeClass('Dn');
                                    $('#arrowsBGHld').removeClass('Dn');
                                    $('#arrowsColorHld').removeClass('Dn');
                                } else {
                                    $('#showArrowsCS').prop("checked", false);
                                    $('#arrowsStyleHld').addClass('Dn');
                                    $('#arrowsPosHld').addClass('Dn');
                                    $('#arrowsBGHld').addClass('Dn');
                                    $('#arrowsColorHld').addClass('Dn');
                                }
                                if (options.dots) {
                                    $('#showDotsCS').prop("checked", true);
                                    $('#dotsStyleHld').removeClass('Dn');
                                    $('#dotsColorHld').removeClass('Dn');
                                    $('#dotsPosHld').removeClass('Dn');
                                } else {
                                    $('#showDotsCS').prop("checked", false);
                                    $('#dotsStyleHld').addClass('Dn');
                                    $('#dotsColorHld').addClass('Dn');
                                    $('#dotsPosHld').addClass('Dn');
                                }
                                if (options.fade) {
                                    $('#transitionCS').val("fade");
                                    $('#fadeTranMsg').removeClass('Dn');
                                    $('#slidesPerViewCS').closest('.field-row').addClass('Dn');
                                    $('#slidesScrollCS').closest('.field-row').addClass('Dn');
                                } else {
                                    $('#transitionCS').val("slide");
                                    $('#fadeTranMsg').addClass('Dn');
                                    $('#slidesPerViewCS').closest('.field-row').removeClass('Dn');
                                    $('#slidesScrollCS').closest('.field-row').removeClass('Dn');
                                }
                                if (options.autoplay) {
                                    $('#autoPlayCS').prop("checked", true);
                                    $('#autoPlaySpeedCS').closest('.field-row').removeClass('Dn');
                                } else {
                                    $('#autoPlayCS').prop("checked", false);
                                    $('#autoPlaySpeedCS').closest('.field-row').addClass('Dn');
                                }
                                if (options.autoplaySpeed) {
                                    $('#autoPlaySpeedCS').val(options.autoplaySpeed);
                                }
                                if (options.slidesToShow) {
                                    $('#slidesPerViewCS').val(options.slidesToShow);
                                }
                                if (options.slidesToScroll) {
                                    $('#slidesScrollCS').val(options.slidesToScroll);
                                }
                                if (options.adaptiveHeight) {
                                    $('#adaptiveHeightCS').prop("checked", true);
                                    $heightSlider.addClass('Dn');
                                } else {
                                    $('#adaptiveHeightCS').prop("checked", false);
                                    $heightSlider.removeClass('Dn');
                                }
                                if (options.infinite) {
                                    $('#infiniteSliderCS').prop("checked", true);
                                    $('#infiniteSliderMsg').removeClass('Dn');
                                } else {
                                    $('#infiniteSliderCS').prop("checked", false);
                                    $('#infiniteSliderMsg').addClass('Dn');
                                }
                                //dots style
                                let regs = new RegExp('\\bslick-dots-([0-9]+)\\b', 'g');
                                let dStCls = options.dotsClass.match(regs);
                                if (dStCls !== null) {
                                    $('#dotsStyleCS').val(dStCls);
                                }
                                //dots position
                                let regp = new RegExp('\\bcs-dots-pos-([0-9]+)\\b', 'g');
                                let dPosCls = options.dotsClass.match(regp);
                                if (dPosCls !== null) {
                                    $('#dotsPosCS').val(dPosCls);
                                }
                                //dots color
                                let dotsBGColor = $dataHolder.attr('data-dotsbgcolor');
                                if (typeof dotsBGColor === 'undefined') {
                                    //let $slickDots = $activeDOM.find('.slick-dots > li:not(.slick-active) > button');
                                    let $slickDots = $activeDOM.find('.cs-slick-dots-btn');
                                    if ($slickDots.length > 0) {
                                        dotsBGColor = $slickDots.css('background-color');
                                    } else {
                                        dotsBGColor = 'rgb(135, 128, 128)';
                                    }
                                }
                                $('#dotsBGColor').css('background-color', dotsBGColor);
                                //arrows
                                let arrowJSON = compCS.library.getArrowStyleJSON($dataHolder);
                                $('#arrowsStyleCS').val(arrowJSON.id);
                                $('#arrowsBGColor').css('background-color', arrowJSON.bgcolor);
                                $('#arrowsFColor').css('background-color', arrowJSON.color);
                                $('#arrowsPosCS').val(arrowJSON.posCls);
                            }

                            function basicSettingEvents() {
                                $('#showArrowsCS').off('click').on('click', function () {
                                    if ($(this).is(':checked')) {
                                        $dataHolder.attr('data-arrows', 1);
                                        $('#arrowsStyleHld').removeClass('Dn');
                                        $('#arrowsBGHld').removeClass('Dn');
                                        $('#arrowsColorHld').removeClass('Dn');
                                        $('#arrowsPosHld').removeClass('Dn');
                                    } else {
                                        $dataHolder.attr('data-arrows', 0);
                                        $('#arrowsStyleHld').addClass('Dn');
                                        $('#arrowsBGHld').addClass('Dn');
                                        $('#arrowsColorHld').addClass('Dn');
                                        $('#arrowsPosHld').addClass('Dn');
                                    }
                                    resetSlider();
                                });
                                $('#showDotsCS').off('click').on('click', function () {
                                    if ($(this).is(':checked')) {
                                        $dataHolder.attr('data-dots', 1);
                                        $('#dotsStyleHld').removeClass('Dn');
                                        $('#dotsColorHld').removeClass('Dn');
                                        $('#dotsPosHld').removeClass('Dn');
                                    } else {
                                        $dataHolder.attr('data-dots', 0);
                                        $('#dotsStyleHld').addClass('Dn');
                                        $('#dotsColorHld').addClass('Dn');
                                        $('#dotsPosHld').addClass('Dn');
                                    }
                                    resetSlider();
                                });
                                $('#transitionCS').off('change').on('change', function () {
                                    let v = $(this).val();
                                    if (v === "fade") {
                                        $dataHolder.attr('data-fade', 1);
                                        $('#slidesPerViewCS').val(1);
                                        $dataHolder.attr('data-perview', SetDeviceItemPerView($dataHolder.attr('data-perview'), 1));
                                        $('#slidesPerViewCS').closest('.field-row').addClass('Dn');
                                        $('#slidesScrollCS').closest('.field-row').addClass('Dn');
                                        $('#fadeTranMsg').removeClass('Dn');
                                        // OR
                                        //$('#slidesPerViewCS').val(1).trigger("change");
                                    } else {
                                        $dataHolder.attr('data-fade', 0);
                                        $('#slidesPerViewCS').closest('.field-row').removeClass('Dn');
                                        $('#slidesScrollCS').closest('.field-row').removeClass('Dn');
                                        $('#fadeTranMsg').addClass('Dn');
                                    }
                                    resetSlider();
                                });
                                $('#autoPlayCS').off('click').on('click', function () {
                                    if ($(this).is(':checked')) {
                                        $dataHolder.attr('data-autoplay', 1);
                                        $('#autoPlaySpeedCS').closest('.field-row').removeClass('Dn');
                                    } else {
                                        $dataHolder.attr('data-autoplay', 0);
                                        $('#autoPlaySpeedCS').closest('.field-row').addClass('Dn');
                                    }
                                    resetSlider();
                                });
                                $('#autoPlaySpeedCS').off('change').on('change', function () {
                                    let v = $(this).val();
                                    $dataHolder.attr('data-autoplayspeed', v);
                                    resetSlider();
                                });
                                $('#slidesPerViewCS').on('change', function () {
                                    let $this = $(this);
                                    let v = $this.val();
                                    if ($('#transitionCS').val() == "fade" && v > 1) {
                                        SageAlertDialog("Fade transition works only with 1 slide per view.");
                                        $this.val(1);
                                        return;
                                    }
                                    $dataHolder.attr('data-perview', SetDeviceItemPerView($dataHolder.attr('data-perview'), v));
                                    resetSlider();
                                });
                                $('#slidesScrollCS').on('change', function () {
                                    let $this = $(this);
                                    let v = $this.val();
                                    if ($('#transitionCS').val() == "fade" && v > 1) {
                                        SageAlertDialog("Fade transition works only with 1 slide scroll.");
                                        $this.val(1);
                                        return;
                                    }
                                    $dataHolder.attr('data-slidescroll', SetDeviceItemPerView($dataHolder.attr('data-slidescroll'), v));
                                    resetSlider();
                                });
                                $('#adaptiveHeightCS').off('click').on('click', function () {
                                    let adaptive = $(this).is(':checked');
                                    if (adaptive) {
                                        $heightSlider.addClass('Dn');
                                        $dataHolder.attr('data-adaptiveheight', 1);
                                    } else {
                                        $heightSlider.removeClass('Dn');
                                        $dataHolder.attr('data-adaptiveheight', 0);
                                    }
                                    compCS.library.toggleAdaptiveHeightCls($slider, adaptive, '', height);
                                    resetSlider();
                                });
                                $('#infiniteSliderCS').off('click').on('click', function () {
                                    if ($(this).is(':checked')) {
                                        $dataHolder.attr('data-infinite', 1);
                                        $('#infiniteSliderMsg').removeClass('Dn');
                                    } else {
                                        $dataHolder.attr('data-infinite', 0);
                                        $('#infiniteSliderMsg').addClass('Dn');
                                    }
                                    resetSlider();
                                });

                                //dots
                                $('#dotsStyleCS').off('change').on('change', function () {
                                    let v = $(this).val();
                                    $dataHolder.attr('data-dotsclass', v);
                                    resetSlider();
                                });
                                //dots pos
                                $('#dotsPosCS').off('change').on('change', function () {
                                    let v = $(this).val();
                                    $dataHolder.attr('data-dotsposclass', v);
                                    resetSlider();
                                });
                                //arrows
                                $('#arrowsStyleCS').off('change').on('change', function () {
                                    let v = $(this).val();
                                    let arrow_json = compCS.library.getArrowStyleJSON($dataHolder);
                                    arrow_json.id = v;
                                    $dataHolder.attr('data-arrowstyle', JSON.stringify(arrow_json));
                                    resetSlider();
                                });
                                //arrows pos
                                $('#arrowsPosCS').off('change').on('change', function () {
                                    let v = $(this).val();
                                    let arrow_json = compCS.library.getArrowStyleJSON($dataHolder);
                                    arrow_json.posCls = v;
                                    $dataHolder.attr('data-arrowstyle', JSON.stringify(arrow_json));
                                    resetSlider();
                                });
                                //arrow bg color
                                let arrowsColorPickerOpt = ColorPickerOption({
                                    renderCallback: function ($elm, toggled) {
                                        let objColor = RenderCallBackColor(this);
                                        let colorPickerID = $elm.attr('id');
                                        let arrow_json = compCS.library.getArrowStyleJSON($dataHolder);
                                        switch (colorPickerID) {
                                            case 'arrowsBGColor':
                                                $activeDOM.find('.slick-arrow').css('background-color', objColor.bgColor);
                                                arrow_json.bgcolor = objColor.bgColor;
                                                $dataHolder.attr('data-arrowstyle', JSON.stringify(arrow_json));
                                                break;
                                            case 'arrowsFColor':
                                                $activeDOM.find('.slick-arrow').css('color', objColor.bgColor);
                                                arrow_json.color = objColor.bgColor;
                                                $dataHolder.attr('data-arrowstyle', JSON.stringify(arrow_json));
                                                break;
                                            case 'dotsBGColor':
                                                $dataHolder.attr('data-dotsbgcolor', objColor.bgColor);
                                                //$activeDOM.find('.slick-dots > li > button').css('background-color', objColor.bgColor);
                                                $activeDOM.find('.cs-slick-dots-btn').css('background-color', objColor.bgColor);
                                                break;
                                        }
                                    }
                                });
                                $('.arrowsColorPicker').colorPicker(arrowsColorPickerOpt);
                            }

                            function resetSlider() {
                                compCS.library.resetSlider($slider, compCS.library.getUserOptions($dataHolder));
                            }
                        },
                        setupResponsiveSettings: function () {
                            $('#cmpListBasicSetRes').off().empty().html(this.responsiveDOM);
                            let compCS = component["dynamic_cmp_list"].library.display.options.slider;
                            let $slider = $activeDOM.find('.dynamicComponentListWrap');
                            let $dataHolder = $activeDOM;

                            let d = ViewDeviceAlpha();
                            let k = compCS.library.deviceResolution[d];
                            let resSettings = compCS.library.getResponsiveSettings(d, $dataHolder);

                            let $heightElem = $slider.find('.dynamicComponentListItem');
                            let height = GetValueByClassName($heightElem.first(), 'H-[0-9]{1,4}', 'H-');

                            //re-check for adaptive height (it might have been set from desktop settings)
                            if (resSettings[k].adaptiveHeight) {
                                //there should not be height value
                                if (height > 0) {
                                    resSettings[k].adaptiveHeight = false;
                                }
                            }

                            if (height == 0) {
                                height = 400;
                            }
                            AdvanceSageSlider($('#csSliderHeightRes'), $('#csSliderHeightResHandle'), 400, 1000, height, CSHeightChange, $heightElem, 'px');
                            function CSHeightChange(space, $elem) {
                                $slider.find('.slick-list').css('height', '');
                                ReplaceClassByPattern($elem, 'H-[0-9]{1,4}', 'H-' + space);
                                //ReplaceClassByPattern($elem.find('> .webEditorCol'), 'H-[0-9]{1,4}', 'H-' + space);
                                height = space;
                            }

                            let $heightSlider = $('#csSliderHeightRes').closest('.field-row');

                            loadSettings();
                            addEvents();

                            function loadSettings() {
                                if (resSettings[k].arrows) {
                                    $('#showArrowsCSRes').prop("checked", true);
                                } else {
                                    $('#showArrowsCSRes').prop("checked", false);
                                }
                                if (resSettings[k].dots) {
                                    $('#showDotsCSRes').prop("checked", true);
                                } else {
                                    $('#showDotsCSRes').prop("checked", false);
                                }

                                if (resSettings[k].autoplay) {
                                    $('#autoPlayCSRes').prop("checked", true);
                                    $('#autoPlaySpeedCSRes').closest('.field-row').removeClass('Dn');
                                } else {
                                    $('#autoPlayCSRes').prop("checked", false);
                                    $('#autoPlaySpeedCSRes').closest('.field-row').addClass('Dn');
                                }
                                if (resSettings[k].autoplaySpeed) {
                                    $('#autoPlaySpeedCSRes').val(resSettings[k].autoplaySpeed);
                                }
                                if (resSettings[k].slidesToShow) {
                                    $('#slidesPerViewCSRes').val(resSettings[k].slidesToShow);
                                }
                                if (resSettings[k].slidesToScroll) {
                                    $('#slidesScrollCSRes').val(resSettings[k].slidesToScroll);
                                }
                                if (resSettings[k].fade) {
                                    $('#slidesPerViewCSRes').closest('.field-row').addClass('Dn');
                                    $('#slidesScrollCSRes').closest('.field-row').addClass('Dn');
                                }

                                if (resSettings[k].adaptiveHeight) {
                                    $('#adaptiveHeightCSRes').prop("checked", true);
                                    $heightSlider.addClass('Dn');
                                } else {
                                    $('#adaptiveHeightCSRes').prop("checked", false);
                                    $heightSlider.removeClass('Dn');
                                }
                            }

                            function addEvents() {
                                $('#showArrowsCSRes').off('click').on('click', function () {
                                    if ($(this).is(':checked')) {
                                        resSettings[k].arrows = 1;
                                    } else {
                                        resSettings[k].arrows = 0;
                                    }
                                    save();
                                    resetSlider();
                                });
                                $('#showDotsCSRes').off('click').on('click', function () {
                                    if ($(this).is(':checked')) {
                                        resSettings[k].dots = 1;
                                    } else {
                                        resSettings[k].dots = 0;
                                    }
                                    save();
                                    resetSlider();
                                });
                                $('#autoPlayCSRes').off('click').on('click', function () {
                                    if ($(this).is(':checked')) {
                                        resSettings[k].autoplay = 1;
                                        $('#autoPlaySpeedCSRes').closest('.field-row').removeClass('Dn');
                                    } else {
                                        resSettings[k].autoplay = 0;
                                        $('#autoPlaySpeedCSRes').closest('.field-row').addClass('Dn');
                                    }
                                    save();
                                    resetSlider();
                                });
                                $('#autoPlaySpeedCSRes').off('change').on('change', function () {
                                    let v = $(this).val();
                                    resSettings[k].autoplaySpeed = +v;
                                    save();
                                    resetSlider();
                                });
                                $('#slidesPerViewCSRes').on('change', function () {
                                    let $this = $(this);
                                    let v = $this.val();
                                    resSettings[k].slidesToShow = +v;
                                    save();
                                    resetSlider();
                                });
                                $('#slidesScrollCSRes').on('change', function () {
                                    let $this = $(this);
                                    let v = $this.val();
                                    resSettings[k].slidesToScroll = +v;
                                    save();
                                    resetSlider();
                                });

                                $('#adaptiveHeightCSRes').off('click').on('click', function () {
                                    let adaptive = $(this).is(':checked');
                                    if (adaptive) {
                                        $heightSlider.addClass('Dn');
                                        resSettings[k].adaptiveHeight = 1;
                                    } else {
                                        $heightSlider.removeClass('Dn');
                                        resSettings[k].adaptiveHeight = 0;
                                    }
                                    save();
                                    compCS.library.toggleAdaptiveHeightCls($slider, adaptive, d, height);
                                    resetSlider();
                                });
                            }

                            function save() {
                                $dataHolder.attr('data-res', JSON.stringify(resSettings));
                            }

                            function resetSlider() {
                                //extend with desktop options for common props
                                let userOptions = compCS.library.getUserOptions($dataHolder);
                                let options = $.extend(userOptions, resSettings[k]);
                                compCS.library.resetSlider($slider, options);
                            }
                        },
                        destroy: function ($layer) {
                            let $wrapper = $layer.find('.dynamicComponentListWrap');
                            this.library.unSlick($wrapper);
                            $wrapper.find('.dynamicComponentListItem').removeClass(function (i, className) {
                                return (className.match(/\bH-[0-9]{1,4}\b/g) || []).join(' ');
                            });
                        }
                    }
                }
            },
            setDetailPageLink: function ($layer) {
                let detail_anchors = $layer.find('.dyndetail_button > a.com-button, a.dyncmp-detail-link');
                $.each(detail_anchors, function (i, da) {
                    let $anchor = $(da);
                    let id = $anchor.closest('.dynamicComponentListItem').attr('data-postdata-id');
                    let url = $layer.attr('data-post-detail-page');
                    if (typeof url !== 'undefined' && url.length > 0 && typeof id !== 'undefined') {
                        url = url.split(" ").join("-");
                        let redirectTo = WbHostURL + '/' + url + '/' + id;
                        $anchor.attr('href', redirectTo);
                    } else {
                        $anchor.attr('href', 'javascript:void(0)');
                    }
                });
            },
            fillDefaultValues: function (layer) {
                let $targets = $(layer).find('.dyncmpfld');
                if ($targets.length > 0) {
                    $.each($targets, function (i, target) {
                        let $target = $(target);
                        let type = $target.attr('data-dynfldtype');
                        let value = $target.attr('data-default-value');
                        let title = $target.attr('data-title');
                        if (typeof title === 'undefined') {
                            title = "value";
                        }
                        if (typeof value === 'undefined') {
                            value = title;
                        }
                        switch (type) {
                            case 'sageIcon':
                                $target.find('.dyncmpfldval').removeClass(function (index, className) {
                                    return (className.match(/\bfa-([^\s]+)\b/g) || []).join(' ');
                                }).addClass(value);
                                break;
                            case 'text':
                            case 'textarea':
                                $target.find('.dyncmpfldval').text(value);
                                break;
                            case 'checkbox-group':
                            case 'select':
                            case 'radio-group':
                                let _values = JSON.parse(value);
                                let valueObjects = _values.map(function (i) {
                                    return { label: i, value: i, selected: 1 };
                                });
                                component["dynamic_cmp_detail"].library.displayMultipleValues($target, { values: valueObjects });
                                break;
                            case 'richtext':
                                $target.find('.dyncmpfldval').html(value);
                                $target.find('.documenttext').removeAttr('contenteditable');
                                break;
                            case 'sageMedia':
                                $target.find('.dyncmpfldval').attr('src', value).attr('alt', 'No value');
                                break;
                            case 'sageVideo':
                                let $vidHld = $target.find('.dyncmpfldval');
                                let $oldIframe = $vidHld.find('iframe');
                                let attrs = $oldIframe.attrs();
                                $oldIframe.remove();
                                $newIframe = $('<iframe></iframe>');
                                for (let a in attrs) {
                                    $newIframe.attr(a, attrs[a]);
                                }
                                $newIframe.attr('src', value).appendTo($vidHld);
                                break;
                            case 'sageUrl':
                                $target.find('.dyncmpfldval').attr('href', value);
                                break;
                        }
                    });
                }
            },
            fixManageDataLink: function () {
                let dynCmps = $('.dynamic-component-list');
                $.each(dynCmps, function (i, cmp) {
                    let postTypeId = $(cmp).attr('data-post-type-id');
                    let manageUrl = SageFrameHostURL + "/dashboard/Post-Data/" + GetSiteID + "/" + postTypeId;
                    $(cmp).find('.manage-data > a').attr('href', manageUrl);
                });
            },
            beforeItemSettingChange: function ($layer) {
                let $listWrapper = $layer.find('.dynamicComponentListWrap');
                let $listItems = $listWrapper.find('.dynamicComponentListItem');
                if ($listItems.length == 0 || $listItems.find('.dyn_no_data').length > 0) {
                    return;
                }
                let hdnTmp = $listItems.eq(0).clone().addClass('Dn tDn mDn dynamicComponentListItemTmp').removeClass('dynamicComponentListItem Dib tDib mDib').wrapAll('<div>').parent().html();
                $layer.find('.dynamicComponentListItemTmp').remove();
                $layer.append(hdnTmp);
            },
            clearList: function ($layer) {
                $layer.find('.dynamicComponentListWrap').off().empty();
            },
            getOffset: function ($dataHolder) {
                let offset = $dataHolder.attr('data-offset');
                if (typeof offset === 'undefined') {
                    return 0;
                }
                return offset;
            },
            getLimit: function ($dataHolder) {
                let unlimit = $dataHolder.attr('data-unlimit');
                if (typeof unlimit === 'undefined') {
                    unlimit = 0;
                }
                if (unlimit == 1) {
                    return 100;
                }
                let limit = $dataHolder.attr('data-limit');
                if (typeof limit === 'undefined') {
                    return 50;
                }
                return limit;
            },
            appendTemplate: function (cmpName, $appendedParent, $appendLayer, template) {
                if (template != "") {
                    $appendLayer.find('.dynamicComponentListWrap').off().empty();
                    let $listItemTmp = $appendLayer.find('.dynamicComponentListItemTmp');
                    let sfClasses = [];
                    let gutterClasses = [];
                    if ($listItemTmp.length > 0) {
                        let sfPat = /\b([a-z]?)sfCol_([0-9]{1,3})\b/g;
                        let gPat = /\b([a-z]?)gP([a-z])-([0-9]{1,3})\b/g;
                        sfClasses = $listItemTmp.attr('class').match(sfPat) || [];
                        gutterClasses = $listItemTmp.attr('class').match(gPat) || [];
                        template = $(template).removeClass(function (index, className) {
                            return (className.match(sfPat) || []).join(' ');
                        }).addClass(sfClasses.join(' ')).removeClass(function (index, className) {
                            return (className.match(gPat) || []).join(' ');
                        }).addClass(gutterClasses.join(' ')).wrapAll('<div />').parent().html();
                    }
                    $listItemTmp.remove();
                    $appendLayer.append(template);
                }
                component["dynamic_cmp_list"].library.populateData(cmpName, $appendLayer);
            },
            showTemplateChooser: function (cmpName, $appendedParent, $appendLayer) {
                FullPagePopup({
                    data: "Fetching templates. Please wait...",
                    heading: "Choose template",
                    showheading: true,
                    width: "50%",
                    onclose: function ($fullpage) {
                        //
                    }
                });
                let postTypeId = $appendLayer.attr('data-post-type-id');
                let self = this;
                let html = `<div class="field-row stElWrap dynamic-template-chooser col100">
                            <div class="field-row">
                                <div class="field-row stElWrap col100">
                                    <div id="dynamic-templates"></div>
                                    <div class="sfCol_100">
                                        <span class="stngSmallBtn" id="btnDynamicTmp">Done</span>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                $.ajax({
                    url: `${SageFrameHostURL}/Dashboard/DynamicPost/GetAllPostTemplatesByKey`,
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("XSRF-TOKEN", $('input:hidden[name="__RequestVerificationToken"]').val());
                    },
                    traditional: true,
                    type: 'POST',
                    data: JSON.stringify({ PostKey: postTypeId, Type: 'list' }),
                    success: function (res) {
                        CloseFullPagePopup();
                        if (!res) {
                            SageAlertDialog("Error fetching templates", "Error")
                            return;
                        }
                        let lst = [];
                        let templateMapper = {
                            '0': ""
                        };
                        //lst.push(`<label><span class="dyn-tmp-choice">
                        //            <img src="/Media/bnr1.jpg" width="100" height="100" />
                        //            <input type="radio" name="deftmp" value="0">Default
                        //        </span></label>`);
                        let postTemplateId = $appendLayer.attr('data-post-template-id');
                        if (typeof postTemplateId === 'undefined') {
                            postTemplateId = '0';
                        }
                        $.each(res, function (i, d) {
                            templateMapper[d.TemplateKey] = d.TemplateViewDom;
                            let checked = "";
                            if (postTemplateId == '0') {
                                postTemplateId = d.TemplateKey;
                            }
                            if (d.TemplateKey == postTemplateId) {
                                checked = " checked='checked'";
                            }
                            let parts = [];
                            parts.push('<label><span class="dyn-tmp-choice">');
                            if (d.Screenshot) {
                                parts.push(`<img src="${d.Screenshot}" alt="${d.TemplateName} screenshot" width="100" height="100" />`);
                            } else {
                                parts.push(`<img src="/Media/bnr1.jpg" alt="${d.TemplateName} screenshot" width="100" height="100" />`);
                            }
                            parts.push(`<input type="radio" name="deftmp" value="${d.TemplateKey}" ${checked}>${d.TemplateName}`);
                            parts.push('</span></label>');
                            lst.push(parts.join(''));
                        });
                        if (lst.length == 0) {
                            let emptymsg = "<p>You have not created any template for this component.</p>";
                            let emptymsg2 = "<p class='dyn_no_tmp'>No template selected.</p>";
                            lst.push(emptymsg);
                            html = $(html).find('#btnDynamicTmp').addClass('Dn').end().wrapAll('<div />').parent().html();
                            $appendLayer.find('.dynamicComponentListWrap').empty().html('<div class="dynamicComponentListItem">' + emptymsg2 + '</div>');
                        }
                        let chData = $(html).find('#dynamic-templates').html(lst.join('')).end().wrapAll('<div />').parent().html();
                        let clickedDone = false;
                        FullPagePopup({
                            data: chData,
                            heading: "Choose template",
                            showheading: true,
                            width: "50%",
                            onclose: function ($fullpage) {
                                if (!clickedDone) {
                                    //
                                }
                            }
                        });
                        $('#btnDynamicTmp').off('click').on('click', function () {
                            clickedDone = true;
                            let tmp = "";
                            let v = $("input:radio[name=deftmp]:checked").val();
                            if (v != '0' && typeof templateMapper[v] !== 'undefined') {
                                let deftemp = templateMapper[v];
                                tmp = $("<div />").html(deftemp).text();
                                tmp = $(tmp).find('.editor-component.dyncmpfld').removeAttr('data-type').end().wrapAll('<div />').parent().html();
                                tmp = '<div class="dynamicComponentListItemTmp Dn tDn mDn sfCol_100 tsfCol_100 msfCol_100">' + tmp + '</div>';
                            }
                            $appendLayer.attr('data-post-template-id', v);
                            self.appendTemplate(cmpName, $appendedParent, $appendLayer, tmp);
                            CloseFullPagePopup();
                        });
                    },
                    error: function (e) {
                        console.log(e);
                    }
                });
            }
        },
        view: {
            view: function (param) {
                let dataType = param['dataType'];
                $('.editor-component[data-type="' + dataType + '"]').each(function () {
                    let $this = $(this);
                    $this.off('click', '.dyndetail_button > .com-button, .dyncmp-detail-link')
                        .on('click', '.dyndetail_button > .com-button, .dyncmp-detail-link', function (e) {
                            if (EditorMode) {
                                return false;
                            }
                            if (e.currentTarget.tagName.toLowerCase() === 'a') {
                                return true;
                            }
                            e.preventDefault();
                            let $btn = $(this);
                            let id = $btn.closest('.dynamicComponentListItem').attr('data-postdata-id');
                            let url = $this.attr('data-post-detail-page');
                            if (typeof url !== 'undefined' && url.length > 0 && typeof id !== 'undefined') {
                                url = url.split(" ").join("-");
                                let redirectTo = WbHostURL + '/' + url + '/' + id;
                                window.location.href = redirectTo;
                            }
                        });
                    $this.off('click', '.dyncmp-url-link')
                        .on('click', '.dyncmp-url-link', function (e) {
                            let href = $(this).attr('href');
                            if (EditorMode || href.length == 0 || href == '#' || href == 'javascript:void(0)') {
                                return false;
                                //e.preventDefault();
                            }
                        });
                });
                let dropped = param['dropped'];
                if (typeof dropped === 'undefined' || !dropped) {
                    let $layer = param['layer'];
                    //if duplicated dynamicComponentListWrap will contain dynamicComponentListItem
                    if (typeof $layer !== 'undefined') {
                        let $listWrapper = $layer.find('.dynamicComponentListWrap');
                        let items = $listWrapper.find('.dynamicComponentListItem');
                        if (items.length > 0) {
                            let display = component["dynamic_cmp_list"].library.display.getDisplay($layer);
                            if (display != 'list') {
                                let d = ViewDeviceAlpha();
                                component["dynamic_cmp_list"].library.display.options[display].resize(d, $listWrapper, $layer);
                            }
                        }
                    }
                }
            }
        },
        resize: function () {
            let self = this;
            let d = ViewDeviceAlpha();
            let $slider = null;
            let $dataHolder = null;
            let $listWrappers = $('.dynamicComponentListWrap');
            $.each($listWrappers, function (i, s) {
                $dataHolder = $(s).closest('.dynamic-component-list');
                let display = component["dynamic_cmp_list"].library.display.getDisplay($dataHolder);
                component["dynamic_cmp_list"].library.display.options[display].resize(d, $(s), $dataHolder);
            });
        }
    }
};