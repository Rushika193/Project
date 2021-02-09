var dynamic_cmp_detail = {
    dynamic_cmp_detail: {
        componentname: 'dynamic_cmp_detail',
        category: "advance",
        icon: "fa fa-file-text-o",
        row: false,
        hidden: true,
        collection: false,
        bucket: false,
        type: "dynamic_post",
        defaultdata: "",
        beforedrop: function ($appendedParent, $appendLayer, dropped, cmpName) {
            //let cmpName = this.componentname;
            let self = this;
            if (typeof dropped !== 'undefined' && dropped === false) {
                self.library.showTemplateChooser(cmpName, $appendedParent, $appendLayer);
            }
        },
        afterdrop: function ($appendedParent, $appendLayer, dropped, cmpName) {
            if ($('.site-body').find('.editor-component.dynamic-component-detail').length > 1) {
                $appendLayer.remove();
                SageAlertDialog('You cannot add two dynamic detail components on same page.');
                return;
            }
            let self = this;
            if (typeof dropped !== 'undefined' && dropped === true) {
                self.library.showTemplateChooser(cmpName, $appendedParent, $appendLayer);
            }
            if (typeof cmpName === 'undefined') {
                cmpName = $appendLayer.attr('data-type');
            }
            if (dropped !== true) {
                self.view.view({ dataType: cmpName });
            }
            //if multiple detail components is to be allowed in same page, uncomment lines below
            //if (dropped !== true) {
            //    let $detailCmps = $('.dynamic-component-detail');
            //    $.each($detailCmps, function (i, c) {
            //        self.view.view({ dataType: $(c).attr('data-type') });
            //    });
            //}
        },
        settingDOMs: {
            "tabs": {
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
                        return $activeDOM.find('.dynamicComponentDetailItem');
                    },

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
                    "options": ["color", "image"]
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
                        "max": 200,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    }
                },
                "Box Shadow":
                    {
                        "options": {

                        }
                    },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            }
        },
        responsiveDOMs: {
            "tabs": {
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
            let $itemTemplate = $layer.find('.dynamicComponentDetailItemTmp');

            if ($itemTemplate.find('.dyn_no_tmp').length > 0) {
                $layer.find('.dynamicComponentDetailWrap').html($itemTemplate.eq(0).clone().removeClass('Dn tDn mDn dynamicComponentDetailItemTmp').addClass('dynamicComponentDetailItem'));
                return;
            }

            let jsonData = {};
            try {
                jsonData = JSON.parse(apiResponse.JsonData);
                let postId = $layer.attr('data-post-type-id');
                if (typeof apiResponse.PostKey !== 'undefined' && apiResponse.PostKey != postId) {
                    if (!EditorMode) {
                        return;
                    }
                    console.log("post type mismatch");
                    jsonData = {};
                }
            } catch (e) {
                if (!EditorMode) {
                    return;
                }
                console.log("API response error");
            }
            let $template = $itemTemplate.eq(0).clone().removeClass('Dn tDn mDn dynamicComponentDetailItemTmp').addClass('dynamicComponentDetailItem');
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
                                component["dynamic_cmp_detail"].library.displayMultipleValues($target, value);
                                break;
                            case 'sageVideo':
                                try {
                                    let vid = JSON.parse(value.value);
                                    if (typeof vid.url !== 'undefined' && vid.url && vid.url.trim().length > 0) {
                                        component["dynamic_cmp_detail"].library.displayVideo($target, vid);
                                    } else {
                                        throw "no video url";
                                    }
                                } catch (e) {
                                    if ($target.find('.dyn-hide-no-val').length > 0) {
                                        $target.addClass('Dn tDn mDn').removeClass('Dib tDib mDib');
                                        break;
                                    }
                                    if (defval) {
                                        component["dynamic_cmp_detail"].library.displayVideo($target, { provider: 'youtube', url: defval });
                                        //$target.find('.dyncmpfldval > iframe').attr('src', defval);
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
            $layer.find('.dynamicComponentDetailWrap').append($template);
            ViewMouseOverEffect();
            //$itemTemplate.remove();
        },
        binddataerror: function ($layer, response) {
            if (EditorMode) {
                component["dynamic_cmp_detail"].binddata($layer, { JsonData: "{}" });
                component["dynamic_cmp_detail"].library.fillDefaultValues($layer);
            }
        },
        removeedit: function ($editDOM, comName) {
            $editDOM.find('.editor-component[data-type="' + comName + '"]').each(function () {
                var $this = $(this);

                let $detailWrapper = $this.find('.dynamicComponentDetailWrap');
                //append one hidden list template
                let hdnTmp = $detailWrapper.find('.dynamicComponentDetailItem').eq(0).clone().addClass('Dn tDn mDn dynamicComponentDetailItemTmp').removeClass('dynamicComponentDetailItem').wrapAll('<div>').parent().html();
                hdnTmp = $(hdnTmp).find('.editor-component.dyncmpfld').removeAttr('data-type').end().wrapAll('<div />').parent().html();
                $this.find('.dynamicComponentDetailItemTmp').remove();
                $this.append(hdnTmp);
                $detailWrapper.empty();
            });
        },
        remove: function ($cloneDOM, comName) {
            $cloneDOM.find('.editor-component[data-type="' + comName + '"]').each(function () {
                var $this = $(this);

                let $detailWrapper = $this.find('.dynamicComponentDetailWrap');
                //append one hidden list template
                let hdnTmp = $detailWrapper.find('.dynamicComponentDetailItem').eq(0).clone().addClass('Dn dynamicComponentDetailItemTmp').removeClass('dynamicComponentDetailItem').wrapAll('<div>').parent().html();
                hdnTmp = $(hdnTmp).find('.editor-component.dyncmpfld').removeAttr('data-type').end().wrapAll('<div />').parent().html();
                $this.find('.dynamicComponentDetailItemTmp').remove();
                $this.append(hdnTmp);
                $detailWrapper.empty();

                let APICntrl = new APIController();
                APICntrl.ComponentName = comName;
                APICntrl.NameSpace = "Cbuilder.Core.DynamicPost";
                APICntrl.ClassNames = "DynamicComponentController";
                APICntrl.MethodNames = "GetPostDataById";
                //index of parameter
                APICntrl.Parameters = "0";
                //your componentID here
                APICntrl.ComponentID = EasyLibrary.GetComponenetID($this);
                APICntrl.Type = "URL";
                EasyLibrary.SetAPI(APICntrl);
            });
        },
        library: {
            populateData: function (cmpName, $layer) {
                if (EditorMode) {
                    component[cmpName].binddata($layer, { JsonData: "{}" });
                    component["dynamic_cmp_detail"].library.fillDefaultValues($layer);
                }
            },
            displayVideo: function($target, vid) {
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
            },
            displayMultipleValues: function($target, value) {
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
                if (typeof setting['display'] !== 'undefined') {
                    display = setting['display'];
                }
                let cls = '';
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
            },
            fillDefaultValues: function($layer) {
                let $targets = $layer.find('.dynamicComponentDetailWrap .dyncmpfld');
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
                            value =  title;
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
                                //$target.find('.dyncmpfldval').html(value);
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
            getPostDataId: function () {
                let parts = window.location.href.split("/");
                let id = parts.pop();
                if (isNaN(id) || id == null || id.length == 0) {
                    return 0;
                }
                return parseInt(id);
            },
            appendTemplate: function (cmpName, $appendedParent, $appendLayer, template) {
                if (template != "") {
                    $appendLayer.find('.dynamicComponentDetailWrap').empty();
                    $appendLayer.find('.dynamicComponentDetailItemTmp').remove();
                    $appendLayer.append(template);
                }
                component["dynamic_cmp_detail"].library.populateData(cmpName, $appendLayer);
            },
            showTemplateChooser: function (cmpName, $appendedParent, $appendLayer) {
                if ($('.site-body').find('.editor-component.dynamic-component-detail').length > 1) {
                    return;
                }
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
                    data: JSON.stringify({ PostKey: postTypeId, Type: 'detail' }),
                    success: function (res) {
                        CloseFullPagePopup();
                        if (!res) {
                            SageAlertDialog("Error fetching templates", "Error");
                            return;
                        }
                        let lst = [];
                        let templateMapper = {
                            '0': ""
                        };
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
                            $appendLayer.find('.dynamicComponentDetailWrap').empty().html('<div class="dynamicComponentDetailItem">' + emptymsg2 + '</div>');
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
                                tmp = '<div class="dynamicComponentDetailItemTmp Dn tDn mDn sfCol_100 tsfCol_100 msfCol_100">' + tmp + '</div>';
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
                    //component["dynamic_cmp_detail"].library.populateData(dataType, $(this));
                    $this.off('click', '.dyncmp-url-link')
                        .on('click', '.dyncmp-url-link', function (e) {
                            let href = $(this).attr('href');
                            if (EditorMode || href.length == 0 || href == '#' || href == 'javascript:void(0)') {
                                e.preventDefault();
                            }
                        });
                });
            }
        }
    }
};