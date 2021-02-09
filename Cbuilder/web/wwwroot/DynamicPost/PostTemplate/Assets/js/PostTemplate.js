(function () {
    "use strict";
    function PostTemplate(instance, options) {
        this.instance = instance;
        this.$el = $(this.instance);
        this.$postTypeSelect = this.$el.find('#postTypeSelect');
        this.options = options;
        this.currentPostTypeId = null;
        this.templateTable = null;
        this.postTypes = [];
        this.filterType = ['list', 'detail'];
        this.templateBuilderPage = `${SageFrameHostURL}/dashboard/DynamicPost/TemplateBuilder` + CultureURL + '/';
        this.init();
    }
    PostTemplate.prototype = {
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
            this.currentPostTypeId = parseInt(window.location.href.match(/\d+$/));
            if (isNaN(this.currentPostTypeId)) {
                return;
            }
            this.addEventHandlers();
        },
        deleteTemplate: function (id, self) {
            let deleteInfo = id;
            SageConfirmDialog('Are you sure you want to delete?').done(function () {
                self.ajaxCall("DeleteTemplate", function () {
                    self.populateTemplateTable();
                }, deleteInfo);
            });
        },
        addEventHandlers: function () {
            let self = this;
            self.populateTemplateTable();

            $('input:checkbox[name="templateTypeFilter"]').off('click').on('click', function () {
                self.populateTemplateTable();
            });

            let $templateTable = self.$el.find('#templateTable');
            self.$el.find('#btnSearch').on('click', function () {
                self.populateTemplateTable();
            });
            $templateTable.on('click', 'a.action-edit', function () {
                let tempId = parseInt($(this).attr('data-id'));
                window.location.href = self.templateBuilderPage + "edit/" + tempId;
            });
            $templateTable.on('click', 'a.action-delete', function () {
                let tempId = parseInt($(this).attr('data-id'));
                self.deleteTemplate(tempId, self);
            });

            $templateTable.on('click', 'a.action-clone', function () {
                let tempId = parseInt($(this).attr('data-id'));
                SageConfirmDialog('Are you sure you want to clone?').done(function () {
                    let data = tempId;
                    self.ajaxCall("CloneTemplate", function () {
                        self.populateTemplateTable();
                    }, data);
                });
            });
            $('#addListTypeTemplate').off('click').on('click', function () {
                window.location.href = self.templateBuilderPage + "list/" + self.currentPostTypeId;
            });
            $('#addDetailTypeTemplate').off('click').on('click', function () {
                window.location.href = self.templateBuilderPage + "detail/" + self.currentPostTypeId;
            });
        },
        populateTemplateTable: function () {
            let self = this;
            var searchKey = $('#templateSearchInput').val().trim();
            var type = null;
            var isList = false;
            var isDetail = false;
            if ($("#tt1").prop("checked")) {
                isList = true;
                type = 'list';
            }
            if ($("#tt2").prop("checked")) {
                isDetail = true;
                type = 'detail';
            }
            if (isList && isDetail) {
                type = null;
            }
            if (!isList && !isDetail) {
                type = 'none';
            }
            let data = {
                TemplateName: searchKey,
                PostId: self.currentPostTypeId,
                Type: type
            };

            self.ajaxCall("ListTemplatesByPostId", function (res) {
                self.bindTemplateData(self, res);
            }, data);
        },
        bindTemplateData: function (self, data) {
            var html = '';
            if (data != null && data.length > 0) {
                $.each(data, function (index, item) {
                    html += '<div class="dg-col-wp">';
                    html += '<div class="sfCol-12 sfCol-sm-6 d-block" >';
                    html += '<div class="dg-group Mb-10 sm-Mb-0">';
                    html += '<div class="dg-title">';
                    html += item.TemplateName;
                    html += '</div>';
                    html += '</div>'
                    html += '<div class="dg-group Mb-10 sm-Mb-0">';
                    html += '<div class="dg-group-inline">';
                    html += '<span class="grd-key">Type:</span>';
                    html += '<span class="grd-value">';
                    html += item.Type;
                    html += '</span>';
                    html += '</div>';

                    html += '</div>';;
                    html += '</div>';

                    html += '<div class="sfCol-6 sfCol-sm-3 sm-f-center">';
                    html += '<div class="dg-group">';
                    var src = item.Screenshot;
                    html += src == "" ? '' : `<a href="${src}" target="_blank" class="ssLightBox" title="${item.TemplateName}"><i class="fa fa-link"></i><span class="tooltiptext">View screenshot</span></a>`;;
                    html += '</div>';
                    html += '</div>';
                    html += '<div class="sfCol-6 sfCol-sm-3 f-end sm-f-center">';
                    html += '<div class="dg-group-inline">';
                    html += self.bindTemplateAction(item.TemplateId);
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                });
            }
            else {
                html += '<div class="dg-col-nodata"><h5>No Data To Display.</h5></div >';
            }
            $("#templateTable").html(html);
            gridHelper.bindEvent({
                onMenuClick: function ($ele) {

                }
            });
            let lightboxPath = '/DynamicPost/Assets/lightbox/';
            $(document).find('.ssLightBox').each(function (i, j) {
                $(j).lightBox({
                    imageBtnClose: lightboxPath + "images/lightbox-btn-close.gif",
                    imageLoading: lightboxPath + "images/lightbox-ico-loading.gif",
                    imageBtnNext: lightboxPath + "images/lightbox-btn-next.gif",
                    imageBtnPrev: lightboxPath + "images/lightbox-btn-prev.gif",
                    imageBlank: lightboxPath + "images/lightbox-blank.gif"
                });
            });
        },
        bindTemplateAction: function (TemplateId) {
            let edit = '<li><a data-id="' + TemplateId + '" class="action-edit links" title="Edit"><i class="fa fa-edit"></i>Edit</a></li>';
            let del = '<li><a data-id="' + TemplateId + '" class="action-delete links" title="Delete"><i class="fa fa-trash"></i>Delete</a></li>';
            let clone = '<li><a data-id="' + TemplateId + '" class="action-clone links" title="Clone"><i class="fa fa-clone"></i>Clone</a></li>';
            let actions = '';
            actions = edit + clone + del;

            let actionDOM = `<div class="action-menu">
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
    $.fn.PostTemplate = function (options) {
        let args = Array.prototype.slice.call(arguments, 1);
        return new PostTemplate(this, options);
    };
}(jQuery));