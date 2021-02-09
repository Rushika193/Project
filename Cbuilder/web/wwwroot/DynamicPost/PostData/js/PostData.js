(function ($) {
    "use strict";
    function PostData(instance, options) {
        this.instance = instance;
        this.$el = $(this.instance);
        this.$list = this.$el.find('#postDataListWrapper');
        this.$form = this.$el.find('#postDataFormWrapper');
        this.$postTypeSelect = this.$el.find('#postTypeSelect');
        this.options = options;
        this.currentPostTypeId = null;
        this.currentPostTypeKey = null;
        if (options.currentPostTypeId) {
            this.currentPostTypeId = options.currentPostTypeId;
        }
        this.postDataTable = null;
        this.renderedForm = null;
        this.postTypes = [];
        this.isPostDataEdit = false;
        this.currentPostDataId = null;
        this.isProcessing = false;
        this.postTypePage = `${SageFrameHostURL}/dashboard/DynamicPost/Index` + CultureURL;
        this.init();
    }
    PostData.prototype = {
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
                }
            }
            SecureAjaxCall.PassObject(config);
        },
        init: function () {
            let data = '';
            this.ajaxCall("GetPost", this.populatePostTypeSelect, data);
        },
        populatePostTypeSelect: function (data, self) {
            if (!data || data.length == 0) {
                self.$el.find('#postTypeSelectWrapper').css('display', 'none');
                self.$el.find('#postDataTableWrapper').empty().html("<div>You have not created any post types.<div>");
                self.$list.css('display', 'block');
                return;
            }
            self.$list.css('display', 'block');
            self.postTypes = data;
            $.each(data, function (k, v) {
                $('<option>').val(v.PostId).text(v.Name).attr('data-key', v.PostKey).attr('data-form', v.Form).appendTo(self.$postTypeSelect);
            });
            self.addEventHandlers();
            if (data.length > 0) {
                if (self.currentPostTypeId) {
                    self.$postTypeSelect.val(self.currentPostTypeId);
                }
                self.$postTypeSelect.trigger("change");
            }
        },
        addEventHandlers: function () {
            let self = this;
            self.$postTypeSelect.on("change", function () {
                self.currentPostTypeId = $(this).val();
                self.currentPostTypeKey = $(this).find('option:selected').attr('data-key');
                self.$el.find('.page-title.title').text($(this).find('option:selected').text());
                self.populatePostDataTable(self);
            });
            self.$el.find('#addPostData').on('click', function () {
                self.$form.find('#submitPostData').text("Add");
                let formData = JSON.parse(JSON.parse(self.$postTypeSelect.find("option:selected").attr('data-form')));
                //self.setFormHeading('Add');
                self.isPostDataEdit = false;
                self.currentPostDataId = null;
                self.clearValues(formData);
                self.showForm(formData);
            });
            let $postDataTable = self.$el.find('#postDataTable');
            $postDataTable.on('click', 'a.action-edit', function () {
                let PostDataId = $(this).attr('data-id');
                self.$form.find('#submitPostData').text("Update");
                let postType = self.postTypes.filter(function (r) {
                    return r.PostId == self.currentPostTypeId;
                });
                let postFields = JSON.parse(JSON.parse(postType[0].Form));


                let data = PostDataId;
                self.ajaxCall("GetPostDataById", function (res) {
                    let data = JSON.parse(res.JsonData);
                    let updatedFields = self.getUpdatedFieldData(data, postFields);
                    self.isPostDataEdit = true;
                    self.currentPostDataId = res.PostDataId;
                    self.showForm(JSON.stringify(updatedFields));
                }, data);

            });
            //bind clone PostData
            $postDataTable.on('click', 'a.action-clone', function () {
                let PostDataId = parseInt($(this).attr('data-id'));
                self.clonePostData(self, PostDataId);
            });

            $postDataTable.on('click', 'a.action-delete', function () {
                let PostDataId = parseInt($(this).attr('data-id'));
                self.deletePostData(PostDataId, self);
            });
            self.$form.find('#gotoList').on('click', function () {
                self.showList();
            });
            self.$form.find('#submitPostData').on('click', function () {
                self.savePostData(self);
            });
            self.$form.find('#cancelPostData').on('click', function () {
                self.showList();
            });
            self.$el.find('#gotoPTList').off('click').on('click', function () {
                window.location.href = self.postTypePage;
            });
        },
        convertUtcToLocal: function (date) {
            return new Date(parseInt(date.substr(6))).toLocaleString().split(',')[0];
        },
        tableDataDetailFormatter: function (d, self) {
            let format = `<table>
                            <tr>
                            <td><strong>Added By:</strong></td>
                            <td>${d.AddedBy}</td>
                            </tr>
                            <tr>
                            <td><strong>Added On:</td>
                            <td>${self.convertUtcToLocal(d.AddedOn)}</td>
                            </tr>`;

            if (d.UpdatedBy != "") {
                format += `<tr>
                            <td><strong>Updated By:</strong></td>
                            <td>${d.UpdatedBy}</td>
                            </tr>
                            <tr>
                            <td><strong>Updated On:</strong></td>
                            <td>${self.convertUtcToLocal(d.UpdatedOn)}</td>
                            </tr>`;
            }
            format += `</table >`;
            return format;
        },
        isUserDataValid: function (fields) {
            let valid = true;
            for (let i = 0, j = fields.length; i < j; i++) {
                if (typeof fields[i].required !== 'undefined' &&
                    fields[i].required === true &&
                    !this.fieldHasValue(fields[i])) {
                    valid = false;
                    SageAlertDialog(fields[i].label + " is required.", "Error");
                    break;
                }
                if (!this.fieldHasValidValue(fields[i])) {
                    valid = false;
                    SageAlertDialog(fields[i].label + " has invalid value.", "Error");
                    break;
                }
            }
            return valid;
        },
        fieldHasValidValue: function (field) {
            let valid = true;
            switch (field.type) {
                case 'sageUrl':
                    if (field.value.trim().length > 0) {
                        valid = /^((?:https?:\/\/)?[^./]+(?:\.[^./]+)+(?:\/.*)?)$/i.test(field.value);
                    }
                    break;
                case 'sageVideo':
                    try {
                        let video = JSON.parse(field.value);
                        if (typeof video.url !== 'undefined' && video.url.trim().length > 0) {
                            valid = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/.test(video.url);
                        }
                    } catch (e) {
                        //
                    }
                    break;
            }
            return valid;
        },
        fieldHasValue: function (field) {
            let has = true;
            switch (field.type) {
                case 'text':
                case 'textarea':
                case 'sageMedia':
                case 'sageIcon':
                case 'sageUrl':
                    has = field.value.trim().length > 0;
                    break;
                case 'richtext':
                    has = $(field.value).html().trim().length > 0;
                    break;
                case 'select':
                case 'radio-group':
                case 'checkbox-group':
                    let sel = field.values.filter(function (o) {
                        return o.selected !== 'undefined' && o.selected === true;
                    });
                    if (!sel || sel.length == 0) {
                        has = false;
                    }
                    break;
                case 'sageVideo':
                    has = false;
                    try {
                        let video = JSON.parse(field.value);
                        has = (typeof video.url !== 'undefined' && video.url.trim().length > 0);
                    } catch (e) {
                        has = false;
                    }
                    break;
            }
            return has;
        },
        savePostData: function (self) {
            if (self.isProcessing) {
                return;
            }
            let fbUserData = $('#form1').fbUserData(self.renderedForm.options);
            if (!this.isUserDataValid(fbUserData)) {
                return;
            }
            let data = {
                PostId: parseInt(self.currentPostTypeId),
                PostKey: self.currentPostTypeKey,
                JsonData: JSON.stringify(fbUserData)
            };
            let method = "AddNewPostData";
            if (self.isPostDataEdit) {
                method = 'UpdatePostData';
                data.PostDataId = parseInt(self.currentPostDataId);
            } else {
                data.IsActive = true;
                data.Order = 1;
            }
            self.isProcessing = true;
            self.ajaxCall(method, function () {
                self.isProcessing = false;
                self.showList(true);
            }, data);
        },
        deletePostData: function (id, self) {
            let deleteInfo = parseInt(id);
            SageConfirmDialog('Are you sure you want to delete?').done(function () {
                self.ajaxCall("DeletePostData", function () {
                    self.populatePostDataTable(self);
                }, deleteInfo);
            });
        },
        clonePostData: function (self, PostDataId) {
            SageConfirmDialog('Are you sure you want to clone this data?').done(function () {
                let data = PostDataId;
                self.ajaxCall("ClonePostData", function () {
                    self.populatePostDataTable(self);
                }, data);
            });

        },
        setFormHeading: function (axn) {
            let type = this.$postTypeSelect.find("option:selected").text();
            let txt = type;
            this.$form.find("#postDataHead").text(txt);
        },
        getUpdatedFieldData: function (oldData, newFields) {
            let updatedFields = [];
            for (let i = 0, j = newFields.length; i < j; i++) {
                let newField = newFields[i];
                let oldF = oldData.filter(function (o) {
                    return o.name == newField.name;
                });
                if (oldF.length > 0) {
                    let oldField = oldF[0];
                    if (['select', 'checkbox-group', 'radio-group'].indexOf(oldField.type) !== -1) {
                        for (var newFieldOption of newField.values) {
                            let oldFOption = oldField.values.filter(function (o) {
                                return o.value == newFieldOption.value;
                            });
                            if (oldFOption.length > 0) {
                                let oldFieldOption = oldFOption[0];
                                if (typeof oldFieldOption.selected != 'undefined' && oldFieldOption.selected === true) {
                                    newFieldOption.selected = true;
                                } else {
                                    delete newFieldOption.selected;
                                }
                            }
                        }
                    } else {
                        newField.value = oldField.value;
                    }
                }
                updatedFields.push(newField);
            }
            return updatedFields;
        },
        showList: function (refresh) {
            let self = this;
            self.$form.css('display', 'none');
            self.$list.css('display', 'block');
            self.$form.find('#postDataForm').empty();
            if (typeof refresh !== 'undefined' && refresh) {
                self.populatePostDataTable(self);
            }
        },
        clearValues: function (formData) {
            let self = this;
            for (let i = 0, j = formData.length; i < j; i++) {
                switch (formData[i].type) {
                    case 'select':
                    case 'radio-group':
                    case 'checkbox-group':
                        for (let k = 0, l = formData[i].values.length; k < l; k++) {
                            formData[i].values[k].selected = false;
                        }
                        break;
                    default:
                        formData[i].value = '';
                }
            }
        },
        showForm: function (formData) {
            let self = this;
            self.$list.css('display', 'none');
            self.$form.css('display', 'block');

            self.renderedForm = self.$form.find('#postDataForm').formRender({
                formData: formData,
                dataType: 'json'
            });
            self.$form.find('input[type="text"], textarea, select').addClass('form-control');
        },
        populatePostDataTable: function (self) {
            let fields = JSON.parse(JSON.parse(self.$postTypeSelect.find("option:selected").attr('data-form')));
            var col = '';
            fields = fields.filter(function (item) {
                return item.showInGrid == '1'
            });
            var classWidth = Math.round((12) / (fields.length + 1));
            $.each(fields, function (i, field) {
                if (field.showInGrid == '1') {
                    col += `<th>`;
                    col += field.label;
                    col += '</th > ';
                }
            });
            col += `<th class="sfCol f-center">Action</th>`;
            $('#gridDynamicColum').html(col);

            let data = {
                offset: 0,
                limit: 100,
                PostId: parseInt(self.currentPostTypeId)
            };
            self.ajaxCall("GetPostDataByPostId", function (res) {
                self.bindPostData(self, res, classWidth);
            }, data);
        },
        bindPostData: function (self, data, classWidth) {
            var html = '';
            let post = data;
            if (post != null && post.length > 0) {
                $.each(post, function (index, postRow) {
                    html += '<tr class=" ui-state-default" data-id="' + postRow.PostDataId + '">';
                    let dataArr = JSON.parse(postRow.JsonData);
                    $.each(dataArr, function (x, y) {
                        var value = '';
                        if (typeof y.value !== 'undefined') {
                            if (y.type == 'sageMedia') {
                                try {
                                    let sageJSON = JSON.parse(y.value);
                                    value = sageJSON.html;
                                } catch (e) {
                                    value = y.value;
                                }
                            } else if (y.type == 'sageIcon') {
                                value = '<i class="fa ' + y.value + '"></i>';
                            } else {
                                value = y.value;
                            }
                        } else if (typeof y.values !== 'undefined') {
                            let values = [];
                            $.each(y.values, function (u, v) {
                                if (v.selected) {
                                    values.push(v.label);
                                }
                            });
                            value = values.join(', ');
                        } else {
                            value = "";
                        }
                        html += '<td >';
                        html += '<div class="dg-group Mb-10 sm-Mb-0">';
                        html += '<span class="ds-grd-tit">';
                        html += value;
                        html += '</span>';
                        html += '</div>';
                        html += '</td>';

                    });
                    html += '<td class="t-center">';
                    html += '<div class="dg-group-inline p-relative">';
                    html += self.bindPostDataAction(data[index].PostDataId);
                    html += '</div>';
                    html += '</td>';
                    html += '</tr>';
                });
            }
            else {
                html += '<tr><td class="dg-col-nodata"><h5>No Data To Display.</h5></td ></tr>';
            }
            $("#postDataTable").html(html);
            gridHelper.bindEvent({
                onMenuClick: function ($ele) {

                }
            });
            $("#postDataTable").sortable({
                update: function () {
                    let newOrderObj = {};
                    $('.ui-state-default').each(function (i, obj) {
                        let id = parseInt($(this).attr('data-id'));
                        let newOrder = i + 1;
                        newOrderObj[id] = newOrder;
                    });
                    self.ajaxCall("UpdatePostDataOrder", function (res) {
                    }, JSON.stringify(newOrderObj));
                }
            });
            $("#postDataTable").disableSelection();
        },

        bindPostDataAction: function (PostDataId) {
            let edit = '<li><a data-id="' + PostDataId + '" class="action-edit links" title="Edit"><i class="fa fa-edit"></i>Edit</a></li>';
            let del = '<li><a data-id="' + PostDataId + '" class="action-delete links" title="Delete"><i class="fa fa-trash"></i>Delete</a></li>';
            let clone = '<li><a data-id="' + PostDataId + '" class="action-clone links" title="Clone"><i class="fa fa-clone"></i>Clone</a></li>';
            let actions = '';
            actions = edit + clone + del;

            let actionDOM = `<div class="action-menu p-relative">
                                <span class="action-icon">
                                    <i class="fa fa-ellipsis-h"></i>
                                </span>
                                <ul class="action-open">
                                 ${actions}
                                </ul>
                            </div>`;
            return actionDOM;
        }
    };
    $.fn.PostData = function (options) {
        let args = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            let $el = $(this);
            if (typeof $el.data('postData') === 'undefined') {
                if (typeof options == 'string' || options instanceof String) {
                    throw "invalid option '" + options + "' passed while creating new instance.";
                }
                let p = new PostData(this, options);
                $el.data('postData', p);
            }
        });
    };
}(jQuery));