(function ($) {
    "use strict";
    function PostType(instance, options) {
        this.instance = instance;
        this.$el = $(this.instance);
        this.$list = this.$el.find('#postTypeListWrapper');
        this.$form = this.$el.find('#postTypeFormWrapper');
        this.$nameField = this.$form.find('#cmp-name');
        this.$hasDetailField = this.$form.find('#cmp-detail');
        this.$idField = this.$form.find('#cmp-id');
        this.$keyField = this.$form.find('#cmp-key');
        this.$formView = this.$el.find('#postTypeFormViewWrapper');
     
        this.postTemplatePage = `${SageFrameHostURL}/dashboard/DynamicPost/PostTemplate` + CultureURL+'/';
        this.postDataPage = `${SageFrameHostURL}/dashboard/DynamicPost/PostData/` + CultureURL+'/';
        this.postDataPage = `${SageFrameHostURL}/dashboard/DynamicPost/PostData` + CultureURL+'/';
        this.postTypeNames = {};
        this.options = options;
        this.isProcessing = false;
        this.init();
    }
    PostType.prototype = {
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
            }
            SecureAjaxCall.PassObject(config);
        },
        init: function () {
            this.populateDataTable();
            this.addEventHandlers();
        },
        addEventHandlers: function () {
            let self = this;
            $('body').on('click', function (e) {
                let actionMenu = $('.actionLinkClass');
                let actionMenuItem = $('.actiononClickShow');
                if (!actionMenu.is(e.target) && actionMenu.has(e.target).length === 0) {
                    actionMenuItem.hide();
                }
            });
            //$('#typeSearchInput').off('keyup change input').on('keyup change input', function () {
            //    self.postTypeDataTable.search($(this).val()).draw();
            //});
            self.$el.find('#btnSearch').on('click', function () {
                self.populateDataTable();
            });
            $(self.$el).off('click', '.actionLinkClass').on('click', '.actionLinkClass', function () {
                $('.actiononClickShow').hide();
                $(this).siblings('.actiononClickShow').show();
            });
            self.$el.find('#createNewPostType').on('click', function () {
                self.$nameField.prop("disabled", false);
                self.$hasDetailField.prop("disabled", false);
                self.$nameField.val('');
                self.$idField.val('');
                self.$keyField.val('');
                self.$hasDetailField.prop("checked", false);
                self.showForm('add');
            });
            let $postTypeList = self.$el.find('#postTypeList');
            $postTypeList.on('click', 'a.action-view', function () {
                let postid = parseInt($(this).attr('data-id'));
                let data = postid;
                self.ajaxCall("GetPostById", function (res) {
                    self.bindViewPostData(self, res);
                }, data);
            });
            $postTypeList.on('click', 'a.action-edit', function () {

                let postid = parseInt($(this).attr('data-id'));
                let data = postid;
                self.ajaxCall("GetPostById", function (res) {
                    self.bindEditPostData(self, res);
                }, data);
            });
            $postTypeList.on('click', 'a.action-delete', function () {
                let postId = parseInt($(this).attr('data-id'));
                let deleteInfo = {
                    PostId: postId,
                    SiteId: self.options.SageSetting.SiteId,
                    DeletedBy: SageFrameUserName
                };

                SageConfirmDialog('Are you sure you want to delete post type?').done(function () {

                    self.ajaxCall("DeletePost", function (data) {
                        if (data == 1) {
                            self.populateDataTable();
                            SageAlertDialog("Post Type Deleted Successfully", "Success");
                        }
                        else {
                            SageAlertDialog("Error Occurred while deleting.", "Error");
                        }
                    }, deleteInfo);
                });
            });
            $postTypeList.on('click', '.post-type-publish', function () {
                let $statusCol = $(this);
                let postid = parseInt($(this).attr('data-id'));
                SageConfirmDialog('You cannot edit the post type once it is published. Are you sure you want to publish post type?').done(function () {

                    let dataPost = postid;
                    self.ajaxCall("GetPostById", function (res) {
                        $statusCol.removeClass('red-btn').addClass('primary-btn').text("Publishing. Please wait...");
                        let data = {
                            PostId: res.PostId,
                            SiteId: self.options.SageSetting.SiteId
                        };
                        let fields = JSON.parse(res.Form);
                        let componentDataListObject = self.webbuilder.getListComponentData(res.Name, res.PostKey, fields, res.HasDetail);
                        data.ComponentDataList = self.webbuilder.jsonStringify(componentDataListObject).replace(/\s+/g, " ").replace(/(\r\n|\n|\r)/gm, "");
                        data.ComponentDataListView = self.webbuilder.jsonStringify(self.webbuilder.ChangeComponentForView(componentDataListObject)).replace(/\s+/g, " ").replace(/(\r\n|\n|\r)/gm, "");
                        if (res.HasDetail) {
                            let componentDataDetailObject = self.webbuilder.getDetailComponentData(res.Name, res.PostKey, fields);
                            data.ComponentDataDetail = self.webbuilder.jsonStringify(componentDataDetailObject).replace(/\s+/g, " ").replace(/(\r\n|\n|\r)/gm, "");
                            data.ComponentDataDetailView = self.webbuilder.jsonStringify(self.webbuilder.ChangeComponentForView(componentDataDetailObject)).replace(/\s+/g, " ").replace(/(\r\n|\n|\r)/gm, "");
                        } else {
                            data.ComponentDataDetail = '';
                            data.ComponentDataDetailView = '';
                        }
                        self.ajaxCall("PublishPostType", function () {
                            self.populateDataTable();
                        }, data);
                    }, dataPost);
                });
            });
            $postTypeList.on('click', 'a.action-template', function () {
                let postId = parseInt($(this).attr('data-id'));
                window.location.href = self.postTemplatePage + postId;
            });
            $postTypeList.on('click', 'a.action-clone', function () {
                let postId = parseInt($(this).attr('data-id'));
                SageConfirmDialog('Are you sure you want to clone?').done(function () {
                    let data = postId;
                    self.ajaxCall("ClonePostType", function () {
                        self.populateDataTable();
                    }, data);
                });
            });
            $postTypeList.on('click', 'a.action-managedata', function () {
                let postId = parseInt($(this).attr('data-id'));
                window.location.href = self.postDataPage + postId;
            });
            self.$form.find('#gotoList').on('click', function () {
                self.showList();
                if (typeof self.formBuilder.formBuilderInst !== 'undefined') {
                    self.formBuilder.formBuilderInst.actions.clearFields();
                }
            });
            self.$formView.find('#gotoListView').on('click', function () {
                self.showList();
            });
            $(document).on('blur keyup input paste change', '.documenttext[contenteditable]', function (e) {
                let $field = $(e.target).closest('li.form-field');
                self.richtextContents[$field.attr('id')] = e.target;
            });
            $(document).on('blur keyup input paste change', '.fb-textarea > textarea', function (e) {
                let $field = $(e.target).closest('li.form-field');
                self.fbTextAreas[$field.attr('id')] = e.target;
            });
            self.$el.find('#savePostType').off().on('click', function (e) {
                e.preventDefault();
                if (typeof self.formBuilder.formBuilderInst !== 'undefined') {
                    self.formBuilder.save(self);
                }
            });
            self.$el.find('#cancelPostType').off().on('click', function (e) {
                e.preventDefault();
                self.showList();
            });
        },
        richtextContents: {},
        fbTextAreas: {},
        showList: function () {
            this.$form.css('display', 'none');
            this.$list.css('display', 'block');
            this.$formView.css('display', 'none');
        },
        showForm: function (action, data, readOnly) {
            this.$list.css('display', 'none');
            this.$form.css('display', 'block');
            this.$formView.css('display', 'none');
            this.formBuilder.initialize(this, action, data, readOnly);
        },
        showFormView: function (formData) {
            this.$list.css('display', 'none');
            this.$form.css('display', 'none');
            this.$formView.css('display', 'block');
            this.renderForm(formData);
        },
        populateDataTable: function () {
            let self = this;
            var searchKey = $('#typeSearchInput').val().trim();
            let data = searchKey;

            self.ajaxCall("GetPost", function (res) {
                self.bindPostData(self, res);
            }, data);
        },
        bindPostData: function (self, data) {
            var html = '';
            if (data != null && data.length > 0) {
                $.each(data, function (index, item) {
                    html += '<div class="dg-col-wp">';
                    html += '<div class="sfCol-12 sfCol-sm-6 d-block" >';
                    html += '<div class="dg-group">';
                    html += '<div class="dg-title">';
                    html += item.Name;
                    html += '</div>';
                    html += '</div>';
                    html += '<div class="dg-group">';
                    html += '<div class="dg-group-inline">'
                    html += '<span class="grd-key">Detail view: </span>'
                    if (item.HasDetail) {
                        html += '<span class="grd-key color-success Ml-10"><i class="fa fa-check"></i><span>'

                    }
                    else {
                        html += '<span class="grd-key color-danger Ml-10" ><i class="fa fa-times"></i><span>'

                    }
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                    html += '<div class="sfCol-8 sfCol-sm-3  sm-t-center ">';
                    html += '<div class="dg-group">';
                    html += self.getDataTableStatusContent(item.IsPublished, item.PostId);
                    html += '</div>';
                    html += '</div>';
                    html += '<div class="sfCol-4 sfCol-sm-3 f-end sm-f-center">';
                    html += '<div class="dg-group-inline">';
                    html += self.bindPostAction(item.IsPublished, item.PostId);
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                });
            }
            else {
                html += '<div class="dg-col-nodata"><h5>No Data To Display.</h5></div >';
            }
            $("#postTypeList").html(html);
            gridHelper.bindEvent({
                onMenuClick: function ($ele) {

                }
            });
        },
        bindPostAction: function (IsPublished, postid) {
            let view = '<li><a data-id="' + postid + '" class="action-view links" title="View Form"><i class="fa fa-eye"></i>View Form</a></li>';
            let edit = '<li><a data-id="' + postid + '" class="action-edit links" title="Edit"><i class="fa fa-edit"></i>Edit</a></li>';
            let del = '<li><a data-id="' + postid + '" class="action-delete links" title="Delete"><i class="fa fa-trash"></i>Delete</a></li>';
            let temp = '<li><a data-id="' + postid + '" class="action-template links" title="Templates"><i class="fa fa-columns"></i>Templates</a></li>';
            let clone = '<li><a data-id="' + postid + '" class="action-clone links" title="Clone"><i class="fa fa-clone"></i>Clone</a></li>';
            let manageData = '<li><a data-id="' + postid + '" class="action-managedata links" title="Manage Data"><i class="fa fa-clipboard"></i>Manage Data</a></li>';
            let actions = '';
            if (IsPublished) {
                actions = view + edit + temp + manageData + clone;
            } else {
                actions = view + edit + temp + manageData + clone + del;
            }

            let actionDOM = `<div class="action-menu">
                                <span class="action-icon">
                                    <i class="fa fa-ellipsis-h"></i>
                                </span>
                                <ul class="action-open">
                                 ${actions}
                                </ul>
                            </div>`;
            return actionDOM;
        },
        bindViewPostData: function (self, data) {
            if (data != null) {
                let formData = JSON.parse(data.Form);
                self.$formView.find('#formPreviewTitle').text(data.Name + ' (Preview)');
                self.showFormView(formData);
            }
        },
        bindEditPostData: function (self, data) {
            if (data != null) {
                self.$form.data('postType', data);
                self.$nameField.val(data.Name);
                self.$idField.val(data.PostId);
                self.$keyField.val(data.PostKey);
                if (data.HasDetail) {
                    self.$hasDetailField.prop("checked", "checked");
                } else {
                    self.$hasDetailField.prop("checked", false);
                }
                self.$nameField.prop("disabled", false);
                self.$hasDetailField.prop("disabled", false);
                if (data.IsPublished) {
                    self.$nameField.prop("disabled", true);
                    self.$hasDetailField.prop("disabled", true);
                }
                let formData = JSON.parse(data.Form);
                self.showForm('edit', formData, data.IsPublished);
            }
        },
        //dataTableLoaded: function (self, json) {
        //    if (typeof json !== 'undefined' && json) {
        //        if (json.length == 1) {
        //            self.$el.find('#postTypeList tbody > tr').addClass('dtSingleRow');
        //        } else if (json.length == 0) {
        //            self.$el.find('#postTypeList tbody > tr').addClass('dtEmptyRow');
        //        }
        //    }
        //},
        getDataTableStatusContent: function (ispublished, postid) {
            let html = "<span data-id='" + postid + "' class='btn primary round post-type-publish'>Publish Now</span>";
            if (ispublished) {
                html = "<span class='btn link-success'>Published</span>";
            }
            return html;
        },
        webbuilder: {
            ChangeComponentForView($componentValue) {
                let Compo = $componentValue;
                let properties = ['componentname', 'view', 'binddata', 'binddataerror', 'resize', 'library', 'common'];
                let result = Object.keys($componentValue).reduce(function (obj, k) {
                    if (properties.indexOf(k) > -1)
                        obj[k] = $componentValue[k];
                    return obj;
                }, {});
                return result;
            },
            jsonStringify: function (json) {
                let $key = '';
                let $value = '';
                try {
                    return JSON.stringify(json, function (key, value) {
                        $key = key;
                        $value = value;
                        return (typeof value === 'function') ? value.toString() : value;
                    });
                } catch (e) {
                    //
                }
            },
            getListComponentData: function (name, post_type_id, fields, hasDetail) {
                let data = list_component.template;
                let component_name = name + ' list';
                data.componentname = component_name;
                data.dependent = ["dynamic_cmp_list"];
                data.defaultdata = this.getListDefaultData(component_name, post_type_id, fields, hasDetail);
                //data.settingDOMs.tabs.Basic.DOM = Handlebars.templates.list_basic_setting();
                return data;
            },
            getDetailComponentData: function (name, post_type_id, fields) {
                let data = detail_component.template;
                let component_name = name + ' detail';
                data.componentname = component_name;
                data.dependent = ["dynamic_cmp_detail"];
                data.defaultdata = this.getDetailDefaultData(component_name, post_type_id, fields);
                return data;
            },
            getListDefaultData: function (component_name, post_type_id, f, hasDetail) {
                let fields = JSON.parse(f);
                return Handlebars.templates.list({
                    component_name: component_name,
                    post_type_id: post_type_id,
                    fields: fields,
                    has_detail: hasDetail ? 1 : 0
                }).trim();
            },
            getDetailDefaultData: function (component_name, post_type_id, f) {
                let fields = JSON.parse(f);
                return Handlebars.templates.detail({
                    component_name: component_name,
                    post_type_id: post_type_id,
                    fields: fields
                }).trim();
            }
        },
        renderForm: function (formData) {
            let self = this;
            self.renderedForm = self.$formView.find('#wb-fb-render').formRender({
                formData: formData,
                dataType: 'json'
            });
            self.$formView.find('input[type="text"], textarea, select').addClass('form-control');
        },
        formBuilder: {
            customFields: [],
            controlConfig: {
                'file.fineuploader': {
                    js: '/DynamicPost/Assets/fineuploader/jquery.fine-uploader.min.js',
                    css: '/DynamicPost/Assets/fineuploader/fine-uploader-gallery.min.css',
                    handler: `${SageFrameHostURL}/Dashboard/DynamicPost/FileUpload`,
                    validation: {
                        allowedExtensions: ['jpeg', 'jpg', 'gif', 'png']
                    }
                }
            },
            controlOrder: [
                'text',
                'textarea',
                'checkbox-group',
                'select',
                'radio-group',
                'sageUrl',
                'richtext',
                'sageIcon',
                'sageMedia',
                'sageVideo'
            ],
            fixSelectPropForField: function (fld, fieldName) {
                let $select = $(".fld-" + fieldName, fld);
                let fldData = $(fld).data('fieldData');
                if (typeof fldData === 'undefined' || typeof fldData[fieldName] === 'undefined') {
                    $select.val('1');
                } else if (typeof fldData !== 'undefined' && typeof fldData[fieldName] !== 'undefined' && fldData[fieldName] == '1') {
                    $select.val('1');
                } else {
                    $select.val('0');
                }
            },
            fixCheckedPropForField: function (fld, fieldName) {
                let $checkbox = $(".fld-" + fieldName, fld);
                let fldData = $(fld).data('fieldData');
                if (typeof fldData !== 'undefined' && typeof fldData[fieldName] !== 'undefined' && fldData[fieldName] === true) {
                    $checkbox.attr("checked", true);
                } else {
                    $checkbox.attr("checked", false);
                }
            },
            optionInput: {
                setOptionValue: function (evt) {
                    evt.target.nextSibling.value = evt.target.value;
                },
                applyOptionChanges: function (option) {
                    let self = this;
                    option.removeEventListener("input", self.setOptionValue, false);
                    option.addEventListener("input", self.setOptionValue, false);
                    option.nextSibling.style.display = "none";
                    option.placeholder = "";
                },
                selectOptions: function (fld) {
                    let self = this;
                    const optionLabelInputs = fld.querySelectorAll(".option-label");
                    for (let i = 0; i < optionLabelInputs.length; i++) {
                        self.applyOptionChanges(optionLabelInputs[i]);
                    }
                },
                createObserver: function (fld) {
                    let self = this;
                    const callback = function (mutationsList) {
                        for (let mutation of mutationsList) {
                            self.selectOptions(fld);
                        }
                    };
                    const observer = new MutationObserver(callback);
                    observer.observe(fld.querySelector(".sortable-options"), { childList: true });
                    return observer;
                },
                onAddOptionInput: function (fld) {
                    let self = this;
                    self.selectOptions(fld);
                    const observer = self.createObserver(fld);
                }
            },
            initialize: function (root, fbAxn, fbData, readOnly) {
                if (typeof readOnly === 'undefined') {
                    readOnly = false;
                }
                if (typeof root.formBuilder.formBuilderInst !== 'undefined') {
                    switch (fbAxn) {
                        case 'add':
                            root.formBuilder.formBuilderInst.actions.clearFields();
                            break;
                        case 'edit':
                            root.formBuilder.formBuilderInst.actions.setData(JSON.parse(fbData));
                            break;
                    }
                    return;
                }
                let formData = [];
                if (typeof fbData !== 'undefined') {
                    try {
                        formData = JSON.parse(fbData);
                    } catch (e) {
                        formData = [];
                    }
                }
                let self = this;
                let typeUserAttrs = {};
                let typeUserEvents = {};
                let disabledActionButtons = ['data', 'clear', 'save'];
                if (readOnly) {
                    //disabledActionButtons = ['data', 'clear', 'save'];
                }
                let disabledFieldButtons = {};
                $.each(self.controlOrder, function (i, f) {
                    if ($.inArray(f, ['file', 'textarea', 'richtext', 'sageVideo']) === -1) {
                        typeUserAttrs[f] = {
                            showInGrid: {
                                label: 'Show in grid',
                                value: '1',
                                options: {
                                    '1': 'Yes',
                                    '0': 'No'
                                }
                            }
                        };
                        typeUserEvents[f] = {
                            onadd: function (fld) {
                                self.fixSelectPropForField(fld, "showInGrid");
                                if ($.inArray(f, ['checkbox-group', 'radio-group', 'select']) !== -1) {
                                    self.optionInput.onAddOptionInput(fld);
                                }
                            }
                        };
                    }
                    disabledFieldButtons[f] = ['copy'];
                    if (readOnly) {
                        //disabledFieldButtons[f] = ['remove', 'edit', 'copy'];
                    }
                });
                self.formBuilderInst = root.$form.find('#wb-fb-editor').formBuilder({
                    formData: formData,
                    controlConfig: self.controlConfig,
                    disableHTMLLabels: true,
                    //disableInjectedStyle: true,
                    fieldRemoveWarn: true,
                    onOpenFieldEdit: function (editPanel) {
                        let $field = $(editPanel).closest('li.form-field');
                        let fld = $field.attr('type');
                        $(editPanel).find('.value-wrap').css('display', 'none');
                        if (fld == 'richtext') {
                            let val = root.richtextContents[$field.attr('id')];
                            if (val) {
                                val = $(val).wrapAll('<div />').parent().html();
                                $field.find('input:hidden').filter(function () {
                                    return this.name.match(/^richtext-[0-9A-Za-z]+-preview$/);
                                }).val(val).trigger('change');
                            }
                        } else if (fld == 'textarea') {
                            let t = root.fbTextAreas[$field.attr('id')];
                            if (t) {
                                $field.find('textarea').filter(function () {
                                    return this.name.match(/^textarea-[0-9A-Za-z]+-preview$/);
                                }).val(t.value).trigger('change');
                            }
                        }
                    },
                    onCloseFieldEdit: function (editPanel) {
                        let $field = $(editPanel).closest('li.form-field');
                        let type = $field.attr('type');
                        if (type == 'textarea') {
                            let t = root.fbTextAreas[$field.attr('id')];
                            if (t) {
                                $field.find('textarea').filter(function () {
                                    return this.name.match(/^textarea-[0-9A-Za-z]+-preview$/);
                                }).val(t.value).trigger('change');
                            }
                        }
                    },
                    onAddField: function (fieldId) {
                        //
                    },
                    disabledActionButtons: disabledActionButtons,
                    disabledFieldButtons: disabledFieldButtons,
                    disabledSubtypes: {
                        textarea: ['quill', 'tinymce'],
                        text: ['email', 'tel', 'password', 'color']
                        //file: ['fineuploader'],
                    },
                    fields: self.customFields,
                    disableFields: ['autocomplete', 'button', 'date', 'header', 'hidden', 'paragraph', 'number', 'file'],
                    controlOrder: self.controlOrder,
                    typeUserAttrs: typeUserAttrs,
                    typeUserEvents: typeUserEvents,
                    typeUserDisabledAttrs: {
                        'file': [
                            'multiple'
                        ],
                        'select': [
                            'className',
                            'placeholder',
                            'multiple'
                        ],
                        'checkbox-group': [
                            'toggle',
                            'other',
                            'className'
                        ],
                        'radio-group': [
                            'other',
                            'className'
                        ],
                        'text': [
                            'subtype',
                            'maxlength',
                            'className'
                        ],
                        'textarea': [
                            'subtype',
                            'maxlength',
                            'className'
                        ],
                        'sageMedia': [
                            'placeholder',
                            //'value',
                            'className'
                        ],
                        'sageIcon': [
                            'placeholder',
                            //'value',
                            'className'
                        ],
                        'richtext': [
                            'placeholder',
                            //'value',
                            'className'
                        ],
                        'sageVideo': [
                            'placeholder',
                            //'value',
                            'className'
                        ],
                        'sageUrl': [
                            //'value',
                            'className'
                        ]
                    },
                    disabledAttrs: [
                        'access',
                        'name'
                    ],
                    onSave: function () {
                        self.save(root);
                    }
                });
                self.formBuilderInst.promise.then(function (fb) {
                    let $ctrlList = $('#wb-fb-editor').find('.frmb-control');
                    let custom = ['sageUrl', 'richtext', 'sageIcon', 'sageMedia', 'sageVideo'];
                    $.each(custom, function (i, c) {
                        $ctrlList.find('li[data-type="' + c + '"]').addClass('system');
                    });
                });
            },
            save: function (root) {
                if (root.isProcessing) {
                    return;
                }
                let fields = root.formBuilder.formBuilderInst.actions.getData('json', true);
                //richtext fix
                let _fields = JSON.parse(fields);
                let _updatedFields = _fields.map(function (f, i) {
                    if (f.type == 'richtext') {
                        f.value = $('#richtext-' + f.name + '-preview').find('.documenttext').wrapAll('<div />').parent().html();
                    } else if (f.type == 'textarea') {
                        f.value = $('#' + f.name + '-preview').val();
                    }
                    return f;
                });
                fields = JSON.stringify(_updatedFields);
                //end richtext fix
                let cmpName = root.$nameField.val();
                cmpName = cmpName.trim();
                if (cmpName.length < 1) {
                    SageAlertDialog("Please enter post type name", "Error");
                    return;
                }
                //name should be alphanumeric
                if (!(/^[a-zA-Z0-9\s]+$/i.test(cmpName))) {
                    SageAlertDialog("Post type should contain only alphabets, numbers and space.", "Error");
                    return;
                }
                let hasDetail = root.$hasDetailField.is(':checked');
                let id = root.$idField.val();
                let key = root.$keyField.val();
                let ptId = root.postTypeNames[cmpName.toLowerCase()];
                let ptAvail = typeof ptId === "undefined";
                if ((id == 0 && !ptAvail) ||
                    (id > 0 && !ptAvail && ptId != id)) {
                    SageAlertDialog("Post type name should be unique. '" + cmpName + "' exists.", "Error");
                    return;
                }
                let urlMethod = 'AddNewPost';
                let componentDataListObject = root.webbuilder.getListComponentData(cmpName, key, fields, hasDetail);
                let data = {};
                data = {
                    Name: cmpName,
                    Form: JSON.stringify(fields),
                    HasDetail: hasDetail,
                    SiteId: root.options.SageSetting.SiteId,
                    AddedBy: SageFrameUserName,
                    IsActive: true,
                    ComponentDataList: root.webbuilder.jsonStringify(componentDataListObject).replace(/\s+/g, " ").replace(/(\r\n|\n|\r)/gm, ""),
                    ComponentDataListView: root.webbuilder.jsonStringify(root.webbuilder.ChangeComponentForView(componentDataListObject)).replace(/\s+/g, " ").replace(/(\r\n|\n|\r)/gm, "")
                };

                if (hasDetail) {
                    let componentDataDetailObject = root.webbuilder.getDetailComponentData(cmpName, key, fields);
                    data.ComponentDataDetail = root.webbuilder.jsonStringify(componentDataDetailObject).replace(/\s+/g, " ").replace(/(\r\n|\n|\r)/gm, "");
                    data.ComponentDataDetailView = root.webbuilder.jsonStringify(root.webbuilder.ChangeComponentForView(componentDataDetailObject)).replace(/\s+/g, " ").replace(/(\r\n|\n|\r)/gm, "");
                } else {
                    data.ComponentDataDetail = '';
                    data.ComponentDataDetailView = '';
                }
                if (id > 0) {
                    let postTypeData = root.$form.data('postType');
                    if (postTypeData.IsPublished) {
                        data.Name = postTypeData.Name;
                        data.HasDetail = postTypeData.HasDetail;
                    }
                    data.PostId = parseInt(id);
                    data.UpdatedBy = SageFrameUserName;
                    urlMethod = 'UpdatePost';
                }
                let fieldCount = JSON.parse(fields);
                if (fieldCount.length > 0) {
                    root.isProcessing = true;
                    root.ajaxCall(urlMethod, function () {
                        root.isProcessing = false;
                        root.$nameField.prop("disabled", false);
                        root.$hasDetailField.prop("disabled", false);
                        root.$form.removeData('postType');
                        root.populateDataTable();
                        root.showList();
                    }, data);
                } else {
                    SageAlertDialog("Please add some fields", "Error");
                }
            }
        }
    };
    $.fn.PostType = function (options) {
        let args = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            let $el = $(this);
            if (typeof $el.data('postType') === 'undefined') {
                if (typeof options == 'string' || options instanceof String) {
                    throw "invalid option '" + options + "' passed while creating new instance.";
                }
                let p = new PostType(this, options);
                $el.data('postType', p);
            }
        });
    };
}(jQuery));