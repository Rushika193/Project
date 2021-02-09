(function ($) {
    "use strict";
    function TemplateBuilder(instance, options) {
        this.instance = instance;
        this.$el = $(this.instance);
        this.options = options;
        this.$saveBtn = this.$el.find('#saveTemplate');
        this.$cancelBtn = this.$el.find('#cancelTemplate');
        this.postTemplatePage = `${SageFrameHostURL}/dashboard/DynamicPost/PostTemplate` + CultureURL+'/';
        this.templateBuilderPage = `${SageFrameHostURL}/dashboard/DynamicPost/TemplateBuilder` + CultureURL+'/';
        this.isProcessing = false;
        this.isSavingEl = this.$el.find('#postTemplateSaving');
        this.init();
    }
    TemplateBuilder.prototype = {
        ajaxCall: function (method, successCallBack, obj) {
            let self = this;
            let config = {
                async: false,
                url: `${SageFrameHostURL}/Dashboard/DynamicPost/${method}`,
                data: JSON.stringify(obj),
                success: function (receivedData) {
                    if (typeof successCallBack == 'function') {
                        successCallBack(receivedData, self);
                    }
                },
                error: function (req, status, error) {
                    SageAlertDialog(error, "Error");
                    self.isProcessing = false;
                    templateBuilderDirty = false;
                }
            }
            SecureAjaxCall.PassObject(config);
        },
        init: function () {
            this.setupWBEditor();
            this.addEventHandler();
            this.setupEdit();
        },
        setupWBEditor: function () {
            let self = this;
            let $wrapper = self.$el.find('#WebBuilderEditorWrapper');
            let $wbEditor = $('#divAdminWebEditor');
            let $editorArea = $('#divWebEditArea');
            $wbEditor.addClass('device_d');
            $wbEditor.find('#viewPorts').removeClass('Dn');
            $wbEditor.find('.btnDeviceViewOpen').remove();
            $wbEditor.find('#viewPorts > .changePort').on('click', function () {
                let d = $wbEditor.find('#viewPorts').find('.active').attr('data-shorthand');
                if (typeof d === 'undefined' || d.length == 0) {
                    d = 'd';
                }
                $wbEditor.removeClass('device_d device_m device_t').addClass('device_' + d);
            });
            if (self.options.templateType == 'list') {
                self.injectLayoutSelector($wbEditor);
                $wbEditor.find('#viewPorts > .changePort').on('click', function () {
                    let d = $wbEditor.find('#viewPorts').find('.active').attr('data-shorthand');
                    if (typeof d === 'undefined') {
                        d = '';
                    }
                    let $target = $('#divWebEditArea').find('.editor-componentWrapper > .cRow');
                    let cls = $target.attr('class');
                    let regex = new RegExp('\\b' + d + 'sfCol_[0-9]{1,3}' + '\\b', 'g');
                    let rowCls = cls.match(regex);
                    if (rowCls !== null) {
                        rowCls = rowCls[0];
                        if (d.length > 0) {
                            rowCls = rowCls.substring(1);
                        }
                        $wbEditor.find('#wbEditorLayout').val(rowCls);
                    }
                });
            }
            let $target = $editorArea.find('.editor-componentWrapper > .cRow');
            $target.addClass('sfCol_100 tsfCol_100 msfCol_100');
            $wrapper.show();
        },
        injectLayoutSelector: function ($wbEditor) {
            let dom = `<span class="sfFieldset">
                        <span class="formKey textType">
                            <span class="sfFormlabel">Layout</span>
                        </span>
                        <span class="formValue">
                            <select name="wbEditorLayout" id="wbEditorLayout" class ="wbEditorLayout">
                                <option value="sfCol_100">1 column</option>
                                <option value="sfCol_50">2 column</option>
                                <option value="sfCol_33">3 column</option>
                                <option value="sfCol_25">4 column</option>
                                <option value="sfCol_20">5 column</option>
                            </select>
                        </span>
                    </span>`;
            $wbEditor.find('.deviceView').addClass('layoutChooser').attr('title', 'Layout').append(dom);
            $wbEditor.find('#wbEditorLayout').off('change').on('change', function () {
                let d = $wbEditor.find('#viewPorts').find('.active').attr('data-shorthand');
                if (typeof d === 'undefined') {
                    d = '';
                }
                let $target = $('#divWebEditArea').find('.editor-componentWrapper > .cRow');
                let v = $(this).val();
                let regex = new RegExp('\\b' + d + 'sfCol_[0-9]{1,3}' + '\\b', 'g');
                $target.removeClass(function (index, className) {
                    return (className.match(regex) || []).join(' ');
                }).addClass(d + v);
            });
        },
        setupEdit: function () {
            let self = this;
            if (!self.options.isEdit) {
                return;
            }
            self.$el.find('#templateName').val(self.options.postTemplate.TemplateName);
            self.$el.find('#templateId').val(self.options.postTemplate.TemplateId);
            self.$el.find('#postTypeId').val(self.options.postTemplate.PostId);
            let editorDOM = $('<div />').html(self.options.postTemplate.TemplateEditDom).text();
            editorDOM = self.validateTemplateElement(editorDOM);
            if (self.options.templateType == 'list') {
                let $cRow = $(editorDOM).find('.cRow').first();
                let cls = $cRow.attr('class');
                let rowCls = cls.match(/\bsfCol_[0-9]{1,3}\b/g);
                if (rowCls !== null) {
                    $('#wbEditorLayout').val(rowCls[0]);
                } else {
                    $cRow.addClass('sfCol_100');
                }
            }
            WebEditorHelper.SetEditDOM(editorDOM);
            MouseOverEffect($('.webEditorCol'));
        },
        validateTemplateElement: function (editorDOM) {
            let obsoleteFld = [];
            let ptValueKeys = postTypeFields.map(function (f) {
                return f.name;
            });
            let flds = $(editorDOM).find('.dyncmpfld');
            $.each(flds, function (i, f) {
                let vk = $(f).attr('data-value-key');
                if ($.inArray(vk, ptValueKeys) === -1) {
                    let t = $(editorDOM).find('[data-value-key="' + vk + '"]');
                    editorDOM = t.find('.com-settings, .s-style').remove().end().addClass('dynObsoleteFld').end().wrapAll('<div />').parent().html();
                    obsoleteFld.push({
                        title: $(f).attr('data-title'),
                        type: $(f).attr('data-type'),
                        valueKey: vk
                    });
                }
            });
            return $(editorDOM).wrapAll('<div />').parent().html();
        },
        addEventHandler: function () {
            let self = this;
            self.$saveBtn.off().on('click', function (e) {
                e.preventDefault();
                self.saveTemplate();
            });
            self.$cancelBtn.off().on('click', function (e) {
                e.preventDefault();
                if (self.isProcessing) {
                    return;
                }
                self.isProcessing = true;
                window.location.href = self.postTemplatePage + self.options.postTypeId;
            });
            self.$el.find('#gotoListView').off().on('click', function () {
                window.location.href = self.postTemplatePage + self.options.postTypeId;
            });
        },
        saveTemplate: function () {
            let self = this;
            if (self.options.postTypeId == 0) {
                SageAlertDialog("Post Type not found.", "Error");
                return;
            }
            if (self.isProcessing) {
                return;
            }
            let $ed = $('#divAdminWebEditor');
            if ($ed.hasClass('device_t') || $ed.hasClass('device_m')) {
                SageAlertDialog("Please go to desktop view to save the template.", "Info");
                return;
            }
            let templateData = self.getTemplateData();
            if (templateData === false) {
                return;
            }
            let method = "AddNewTemplate";
            let data = {
                SiteId: self.options.SageSetting.SiteId,
                PostId: parseInt(self.options.postTypeId),
                PostKey: self.options.postTypeKey,
                Type: self.options.templateType
            };
            data = $.extend(data, templateData);
            if (self.options.isEdit) {
                method = 'UpdateTemplate';
                data.TemplateId = parseInt(self.$el.find('#templateId').val());
                data.UpdatedBy = self.options.SageSetting.AuthObj.UserName;
            } else {
                data.AddedBy = self.options.SageSetting.AuthObj.UserName;
                data.IsActive = true;
            }
            self.isProcessing = true;
            templateBuilderDirty = true;
            self.isSavingEl.show();
            let cH = $('.webEditorCol').height();
            let cW = $('.webEditorCol').width();
            //add height class for proper screenshot
            let containers = $('.webEditorCol').find('.container');
            containers.each(function (i, c) {
                let cCls = $(c).attr('class');
                let hCls = cCls.match(/\bH-[0-9]{1,4}\b/g);
                if (!hCls) {
                    //$(c).css({ 'height': '' }).addClass('adjustheight');
                    let h = $(c).height();
                    //$(c).addClass('H-' + h);
                    $(c).attr('data-hch', h);
                }
            });
            html2canvas(document.querySelector(".webEditorCol"), {
                height: cH,
                width: cW,
                onclone: function (doc) {
                    const settings = doc.getElementsByClassName('SetHdlr');
                    while (settings.length > 0) {
                        settings[0].remove();
                    }
                    let videos = doc.getElementsByClassName('youtubevideo');
                    for (let i = 0, j = videos.length; i < j; i++) {
                        let v = videos[i];
                        let h = v.offsetHeight;
                        let iframe = v.querySelector('iframe');
                        if (iframe) {
                            iframe.parentNode.removeChild(iframe);
                        }
                        v.style.height = (h > 0) ? h + 'px' : '200px';
                        v.style.background = '#000000';
                        v.style.color = '#ffffff';
                        v.innerHTML = 'Youtube video';
                    }
                    containers = doc.getElementsByClassName('container');
                    for (let i = 0, j = containers.length; i < j; i++) {
                        let container = containers[i];
                        container.classList.add('H-' + container.getAttribute('data-hch'));
                        container.style.height = container.offsetHeight;
                    }
                    return doc;
                }
            }).then(function (canvas) {
                let dataURL = canvas.toDataURL();
                data.ScreenshotBase64 = dataURL;
                self._save(method, data);
            }).catch(function (err) {
                data.ScreenshotBase64 = '';
                self._save(method, data);
            });
            
        },
        _save: function (method, data) {
            data.SiteId = 0;
            let self = this;
            self.ajaxCall(method, function (res) {
                if (!self.options.isEdit) {
                    if (typeof res !== 'undefined' && typeof res.d !== 'undefined' && res.d > 0) {
                        window.location.href = self.templateBuilderPage + 'edit/' + res.d;
                        return;
                    } else {
                        window.location.href = self.postTemplatePage + self.options.postTypeId;
                        return;
                    }
                }
                self.isProcessing = false;
                templateBuilderDirty = false;
                self.isSavingEl.hide();
            }, data);
        },
        getTemplateData: function () {
            let self = this;
            let TemplateName = self.$el.find('#templateName').val().trim();
            if (TemplateName.length < 1) {
                SageAlertDialog("Template name is required.", "Alert");
                return false;
            }
            let templateDOMs = WebEditorHelper.GetData();
            let TemplateViewDom = templateDOMs.ViewDOM;
            if (TemplateViewDom == '') {
                SageAlertDialog("Template data is required.", "Alert");
                return false;
            }
            return {
                TemplateName: TemplateName,
                TemplateViewDom: TemplateViewDom,
                TemplateEditDom: templateDOMs.EditorDOM,
                Screenshot: self.options.postTemplate.Screenshot
            };
        }
    };
    $.fn.TemplateBuilder = function (options) {
        return this.each(function () {
            let $el = $(this);
            if (typeof $el.data('templateBuilder') === 'undefined') {
                if (typeof options == 'string' || options instanceof String) {
                    throw "invalid option '" + options + "' passed while creating new instance.";
                }
                let p = new TemplateBuilder(this, options);
                $el.data('templateBuilder', p);
            }
        });
    };
}(jQuery));