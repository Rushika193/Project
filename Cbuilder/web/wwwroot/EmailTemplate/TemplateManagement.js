(function ($) {
    $.EmailTemplateManage = function (p) {

        var validator;
        let tokens;
        var TempMgr = {
            config: {
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                methodname: "",
                url: "",
                ajaxSuccess: '',
                offset: 0,
                limit: 6,
                current: 0,
                IsEdit: true,
                screenshot: '',
                baseURL: CurrentHostURL + '/dashboard/emailtemplate'
            },
            init: function () {
                try {
                    this.getAllTemplate(0, this.config.limit, 0);
                    this.getAllCategory();
                    this.screenShotUploader();
                    $('#divTemplateFilter').SideBarPanel({
                        title: localLabel.FilterHeading,
                        openButton: '#btnOpenFltr',
                        closeButton: '#btnCloseSidePnl'
                    });
                    this.addEventListner();
                } catch (ex) {
                    console.error(ex);
                }
            },
            addEventListner: function () {
                $('#btnNextToTempInfo').off().on('click', function () {
                    let data = EmailEditorsHelper.GetData();
                    if (data.ViewDOM !== "")
                        TempMgr.hideShowControl(false);
                    else
                        ActionMessage(localLabel.NoMailTemplateNextError, MessageType.Error);
                });
                $('#btnBackToEditor').off().on('click', function () {
                    TempMgr.hideShowControl(true);
                });
                $('#btnExitFromTempForm').off().on('click', function () {
                    TempMgr.clearForm();
                    TempMgr.hideShowControl(true);
                    TempMgr.getAllTemplate(TempMgr.config.offset, TempMgr.config.limit, TempMgr.config.current);
                    $('#divTemplateList').show();
                    $('#divMailTempForm').hide();
                });
                $('#btnAddUpdateTemplate').off().on('click', function () {
                    $(this).attr('data-editor');
                    if (validator.form()) {
                        TempMgr.addUpdateTemplate($(this).attr('data-editor'));
                    }
                });
                $('#btnPreviewTemplate').off().on('click', function () {
                    let data = EmailEditorsHelper.GetData();
                    if (data.ViewDOM !== "") {
                        data.ViewDOM = EmailEditorsHelper.ReplaceTokenBySample(data.ViewDOM);
                        EmailEditorsHelper.PreviewTemplate(data.ViewDOM, 'Email Template Preview');
                    }
                    else {
                        ActionMessage(localLabel.NoMailTemplatePreviewError, MessageType.Info);
                    }
                });
                $('#btnAddNewTemp').off().on('click', function () {
                    TempMgr.clearForm();
                    TempMgr.hideShowControl(true);
                    $('#divTemplateList').hide();
                    $('#divMailTempForm').show();
                });
                $(document).on('click', function (e) {
                    if (!$(e.target).parents().hasClass('action-list') && !$(e.target).parents().hasClass('btnOpenTempAction') && !$(e.target).hasClass('btnOpenTempAction')) {
                        $('.action-list').hide(100);
                    }
                });
                $('#btnAddTempCat').off().on('click', function () {
                    $('#divTempCategoryManage').show();
                });
                $('#btnCloseCatList').off().on('click', function () {
                    $('#divTempCategoryManage').hide();
                });
                $('#btnAddNewTempCat').off().on('click', function () {
                    let count = $('#divTempCategoryManage>ul>li').length + 1;
                    let html = `<li><input type="text" data-id="0"class="tempCat" value="category ${count}" ><span data-issystem="false" data-id="0" class="deleteTempCat iconDel"></span>
                               </li>`;
                    $('#divTempCategoryManage ul').append(html);
                    TempMgr.categoryEventListner();
                });
                $('#btnSendTestEmail').off().on('click', function () {
                    let data = EmailEditorsHelper.GetData();
                    if (data.ViewDOM !== "") {
                        FullPagePopup({
                            data: `<div class="sfFormwrapper">
                               <div class="sfFieldset">
                                <span class="formValue">
                                 <input type="email" id="txtTestMailEmail" placeholder="Enter Your Email"/>
                                 </span></div></div>
                                <div class="sfButtonWrapper">
                                 <button type="button"  id="btnSendSampleMail" class="sfBtn smlbtn-succ icon-paper-plane">${localLabel.SendLbl}</button>
                                 </div></div>`,
                            heading: localLabel.SendTestMailTitle,
                            showheading: true,
                            width: "30%",
                            height: "200px",
                            onappend: function ($parent) {
                                $parent.addClass('m-popup');
                                $('#btnSendSampleMail').off().on('click', function () {
                                    $parent.find('.sfError').remove();
                                    let email = $('#txtTestMailEmail').val();
                                    if (email !== '') {
                                        if (validEmail(email)) {
                                            TempMgr.sendTestMail(data.ViewDOM, email);
                                            CloseFullPagePopup();
                                        } else {
                                            $('#txtTestMailEmail').after('<span class="sfError">Invalid Email Address</span>');
                                        }
                                    } else {
                                        $('#txtTestMailEmail').after(`<span class="sfError">${localLabel.Required}</span>`);
                                    }
                                });
                                function validEmail(email) {
                                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                    return re.test(String(email).toLowerCase());
                                }
                            }
                        });
                    } else {
                        ActionMessage(localLabel.NoMailTemplateNextError, MessageType.Error);
                    }
                });
                $('#btnSearchTemplate').off('click').on('click', function () {
                    TempMgr.getAllTemplate(0, TempMgr.config.limit, 0);
                });
                $('#btnResetSearch').off().on('click', function () {
                    $('#txtTemplateSearch').val('');
                    $('#fltrCatListing li').removeClass('active');
                    $('#fltrCatListing li').eq(0).addClass('active');
                    TempMgr.getAllTemplate(0, TempMgr.config.limit, 0);
                });
                $('#fltrCatListing').off('click').on('click', 'li', function () {
                    $('#fltrCatListing li').removeClass('active');
                    $(this).addClass('active');
                    TempMgr.getAllTemplate(0, TempMgr.config.limit, 0);
                });
                $('#txtTemplateSearch').off('keyup').on('keyup', function (e) {
                    if (e.keyCode === 13)
                        TempMgr.getAllTemplate(0, TempMgr.config.limit, 0);
                });
            },

            listEvents: function () {
                $('.btnOpenTempAction').off().on('click', function () {
                    let $thisAction = $(this).prev('.action-list');
                    $('.action-list').not($thisAction).hide(100);
                    $thisAction.toggle(100);
                });
                $('.action-list a').off().on('click', function () {
                    let $this = $(this);
                    let action = $this.attr('data-action');
                    let ID = $this.attr('data-tempid');
                    switch (action) {
                        case 'edit':
                            TempMgr.config.IsEdit = true;
                            TempMgr.getTemplateByID(ID);
                            break;
                        case 'delete':

                            TempMgr.delTemplateByID(ID);
                            break;
                        case 'view':
                            TempMgr.previewTemplate($this);
                            break;
                        case 'clone':
                            TempMgr.cloneTemplate(ID);
                            break;
                    }
                });
            },
            screenShotUploader: function () {
                $('#divScreenShootUpload').CustomFileUploader({
                    url: "/File/FileUploader?destination=" + encodeURIComponent($("#path").val()) + "&isCrop=true&isRename=false",
                    allowExt: ["jpg", "png", "jpeg", "gif"],
                    success: function (data) {
                        if (data.status === 1) {
                            data = data.files;
                            let filePath = $.isArray(data) ? "/MediaThumb/medium/" + data[0] : "/MediaThumb/medium/" + data;
                            $("#LogoPath").val(filePath);
                            let html = '<img src="' + filePath + '"/>';
                            $('#divImagePreview').html(html);
                            //$('#hdnScreenShoot').val(filePath).focus().focusOut();
                        }
                    },
                    name: 'Choose File'
                });
            },

            hideShowControl: function (editor) {
                $('#btnAddUpdateTemplate').attr('data-editor', editor);
                let form = 'none';
                if (editor) {
                    editor = 'inline-block';
                    $('#divTemplateInfo').hide();
                    $('.template-controls').removeClass('full');
                    $('#divMailTempEditor').show("slide", { direction: "left" }, 500);
                }
                else {
                    $('.template-controls').addClass('full');
                    editor = 'none';
                    form = 'inline-block';
                    $('#divMailTempEditor').hide();
                    $('#divTemplateInfo').show("slide", { direction: "right" }, 500);
                }
                $('#btnBackToEditor').css('display', form);
                if ($('#hdnEmailTemplateID').val() === '0')
                    $('#btnAddUpdateTemplate').css('display', form);
                else
                    $('#btnAddUpdateTemplate').css('display', 'inline-block');
                $('#btnExitFromTempForm').css('display', editor);
                $('#btnNextToTempInfo').css('display', editor);

            },
            clearForm: function () {
                $('#hdnScreenShoot').val('');
                $('#hdnEmailTemplateID').val(0);
                $('#txtTemplateName').val('');
                $('#txtEmailSubject').val('');
                $('#slcTemplateCategory').val('none');
                $('#txtMailTempIdentifier').val('');
                $('#divTemplateIdenfier').hide();
                $('#divMailTempEditor').show();
                $('#divTemplateInfo').hide();
                $('#divImagePreview').html('');
                EmailEditorsHelper.ClearEditor();
                $('#divTemplateHeading').text(localLabel.AddFormHeading);
            },
            cloneTemplate: function (ID) {
                this.config.IsEdit = false;
                this.getTemplateByID(ID);
            },
            sendTestMail: function (mailBody, email) {
                TempMgr.config.methodname = "SendTestMail";
                TempMgr.config.data = JSON.stringify({
                    MailBody: mailBody,
                    Email: email
                });
                TempMgr.config.ajaxSuccess = function (data) {

                    if (data === "Success") {
                        ActionMessage(localLabel.TestMailSuccess, MessageType.Success);
                    } else {
                        ActionMessage(localLabel.TestMailFail + data, MessageType.Error);
                    }
                };
                TempMgr.ajaxCall(TempMgr.config, false);
            },
            previewTemplate: function ($thatButton) {
                let html = $thatButton.closest('.eTemp-thumb').find('.eTemplate').html();
                EmailEditorsHelper.PreviewTemplate(html, 'Email Template Preview');
            },
            getAllTemplate: function (offset, limit, current) {
                let cat = $('#fltrCatListing .active').attr('data-id');
                if (typeof cat === 'undefined')
                    cat = '';
                this.config.methodname = "GetAllTemplate";
                this.config.data = JSON.stringify({
                    offSet: current * limit,
                    limit: limit,
                    category: cat,
                    keywords: $('#txtTemplateSearch').val()
                });
                this.config.ajaxSuccess = function (data) {
                    TempMgr.bindTempList(data);
                };
                this.ajaxCall(this.config, false);

            },
            bindTempList: function (data) {
                let html = '';
                let totalItems = 0;
                if (data !== null && data.length > 0) {
                    totalItems = data[0].RowTotal;
                    $.each(data, function (i, v) {
                        let style = '';
                        let tempThumb = '';
                        if (v.ScreenShot !== '' && v.ScreenShot !== null) {
                            style = 'display:none;';
                            tempThumb = '<div class="eTemp-thumb-img"><img src="' + v.ScreenShot.replace('/small/', '/medium/') + '"/></div>';
                        }

                        html += `<div class="sfCol-12 sfCol-sm-12 sfCol-md-6 sfCol-lg-4 sfCol-xl-3 Mb-30">
                            <div class="eTemp-thumb no-overlay">
                            <div class="eThumb">
                                <div class="eTemplate p-relative" style="${style}">
                                    ${EmailEditorsHelper.ReplaceTokenBySample(v.ViewDOM)}
                                </div>
                                ${tempThumb}
                                <div class="eTemp-Info">
                                <div class="temp-title">
                                    <h3>${v.Name}</h3>
                                </div>
                              <div class="action-list" style="display:none">
                                 ${getActionDOM('iconClone', v.TemplateID, 'clone', v.IsSystem, localLabel.Clone)}
                                ${getActionDOM('iconEdit', v.TemplateID, 'edit', v.IsSystem, localLabel.Edit)}
                                ${getActionDOM('iconPreview', v.TemplateID, 'view', v.IsSystem, localLabel.Preview)}
                                ${getActionDOM('iconDel', v.TemplateID, 'delete', v.IsSystem, localLabel.Delete)}
                               </div >
                                <span class="btn-action btnOpenTempAction">
                                    <a><i class="fa fa-ellipsis-v"></i></a>
                                </span>
                            </div >
                            </div>
                            
                        </div ></div > `;
                    });
                    $('#eTemplateList').html(html);
                    TempMgr.listEvents();
                } else {
                    $('#eTemplateList').html(`<div class="empty-template"><p>${localLabel.NoData}</p></div>`);
                }
                function getActionDOM(iconClass, id, action, isSystem, actionText) {
                    if (isSystem && action === 'delete')
                        return '';
                    return '<a class="eTempAction ' + iconClass + '" data-tempid="' + id + '" data-action="' + action + '">' + actionText + '</a>';
                }
                TempMgr.bindPagination(totalItems);
            },
            bindPagination: function (RowTotal) {
                if (RowTotal > TempMgr.config.limit) {
                    $('#divETempPagination').show().pagination(RowTotal, {
                        items_per_page: TempMgr.config.limit,
                        current_page: TempMgr.config.current,
                        num_edge_entries: 2,
                        callfunction: true,
                        function_name: {
                            name: TempMgr.getAllTemplate,
                            limit: TempMgr.config.limit,
                        },
                        prev_text: ' ',
                        next_text: ' '
                    });
                } else {
                    $('#divETempPagination').hide();
                }
            },
            getTemplateByID: function (ID) {
                ID = parseInt(ID);
                var config = {
                    data: {
                        TemplateID: ID
                    },
                    url: TempMgr.config.baseURL + "/GetTemplateByID",
                    async: false,
                    success: function (data) {
                        TempMgr.bindTemplateToForm(data);
                    }
                };
                SecureAjaxCall.Call(config);
            },
            bindTemplateToForm: function (data) {
                TempMgr.clearForm();
                if (TempMgr.config.IsEdit) {
                    $('#hdnEmailTemplateID').val(data.TemplateID);
                    $('#divTemplateIdenfier').show();
                    $('#btnAddUpdateTemplate').show();
                    $('#divTemplateHeading').text(localLabel.EditFormHeading);
                    $('#txtMailTempIdentifier').val(data.Identifier);
                }
                EmailEditorsHelper.SetEditData(data.EditDOM);
                $('#txtTemplateName').val(data.Name);
                $('#txtEmailSubject').val(data.Subject);
                $('#slcCultureCode').val(data.CultureCode);
                $('#slcTemplateCategory').val(data.CategoryID);
                $('#divTemplateList').hide();
                $('#divMailTempForm').show();
                TempMgr.hideShowControl(true);
                if (data.Screenshot !== '' && data.Screenshot !== null) {
                    $('#hdnScreenShoot').val(data.ScreenShot);
                    let html = '<img src="' + data.ScreenShot + '"/>';
                    $('#divImagePreview').html(html);
                }
            },
            delTemplateByID: function (ID) {
                SageConfirmDialog("Are you sure").done(function () {

                    var config = {
                        data: {
                            TemplateID: ID
                        },
                        url: TempMgr.config.baseURL + "/RemoveTemplateByID",
                        async: false,
                        success: function (data) {
                            ActionMessage(data.Message, MessageType.Success);
                            TempMgr.getAllTemplate(0, TempMgr.config.limit, 0);
                        }
                    };
                    SecureAjaxCall.Call(config);
                });
            },
            addUpdateTemplate: function (IsEditor) {
                let data = EmailEditorsHelper.GetData();
                let Name = $.trim($('#txtTemplateName').val());
                let Sub = $.trim($('#txtEmailSubject').val());
                let cat = $('#slcTemplateCategory').val();
                if (Name === '') {
                    ActionMessage(localLabel.EmptyThemeName, MessageType.Error);
                    return;
                } else if (Sub === '') {
                    ActionMessage(localLabel.EmptySub, MessageType.Error);
                    return;
                } else if (cat === 'none') {
                    ActionMessage(localLabel.NoTemplateCat, MessageType.Error);
                    return;
                }
                this.config.methodname = "AddUpdateTemplate";
                this.config.contentType = "application/x-www-form-urlencoded",
                    this.config.data = {
                        TemplateID: $('#hdnEmailTemplateID').val(),
                        EditDOM: data.EditorDOM,
                        ViewDOM: data.ViewDOM,
                        ScreenShot: $('#hdnScreenShoot').val(),
                        Name: $.trim($('#txtTemplateName').val()),
                        Subject: $.trim($('#txtEmailSubject').val()),
                        CultureCode: $.trim($('#slcCultureCode').val()),
                        CategoryID: $('#slcTemplateCategory').val(),

                    };

                this.config.ajaxSuccess = function (data) {
                    if (data.Status === 1) {
                        ActionMessage(localLabel.AddSuccess, MessageType.Success);
                        $('#hdnEmailTemplateID').val(data.TemplateID);
                    } else {
                        ActionMessage(localLabel.UpdateSuccess, MessageType.Success);
                    }
                    if (IsEditor === 'false') {
                        html = `<div class="cont-action"><p>${localLabel.ConfirmationMessageTxt}</p><div class="buttonWrapper"><button type="button" class="btnTmpAfterSave sfBtn smlbtn-succ icon-edit" data-action="continue">${localLabel.ConfContinueEditingLbl}</button>
                                <button type="button" class="btnTmpAfterSave sfBtn smlbtn-primary  icon-addnew" data-action="addnew">${localLabel.ConfCreateAnotherLbl}</button>
                                <button type="button" class="btnTmpAfterSave sfBtn smlbtn-danger exitBtn" data-action="exit">${localLabel.ConfExitLbl}</button></div></div>`;
                        FullPagePopup({
                            data: html,
                            heading: localLabel.ConfirmationTitle,
                            showheading: true,
                            width: "auto",
                            height: "30%",
                            onappend: function ($parent) {
                                $parent.css('background-color', 'rgba(0, 0, 0, 0.28)');
                                $parent.find('.fullpage-popup-model-body').css('background', '#fff');
                                $('.btnTmpAfterSave').off('click').on('click', function () {
                                    let action = $(this).attr('data-action');
                                    if (action === 'continue') {
                                        $('#btnBackToEditor').trigger('click');
                                    } else if (action === 'addnew') {
                                        $('#btnAddNewTemp').trigger('click');
                                    } else {
                                        $('#btnExitFromTempForm').trigger('click');
                                    }
                                    CloseFullPagePopup();
                                });
                            }
                        });
                    }
                };
                this.ajaxCall(this.config, true);
            },
            delCategoryByID: function (ID) {
                this.config.methodname = "RemoveCategoryByID";

                this.config.contentType = "application/x-www-form-urlencoded";
                this.config.data = {
                    CategoryID: ID,

                };
                this.config.ajaxSuccess = function (data) {
                    if (data > 0) {
                        ActionMessage(localLabel.CategoryDeleteSucces, MessageType.Success);
                        TempMgr.getAllCategory();
                    }
                };
                this.ajaxCall(this.config, true);
            },
            getAllCategory: function () {
                this.config.methodname = "GetAllCategory";
                this.config.data = JSON.stringify({
                    offSet: 0,
                    limit: 200
                });
                this.config.ajaxSuccess = this.bindCategory;
                this.ajaxCall(this.config, false);
            },
            bindCategory: function (data) {
                let html = '';
                let options = '<option value="none">Select Category</option>';
                let fltrHtml = '<li data-id="" class="active sfCol-12 Px-20">All Template</li>';

                if (data !== null) {
                    $.each(data, function (i, v) {
                        html += '<li>';
                        html += '<input disabled="' + v.IsSystem + '" type="text" data-id="' + v.CategoryID + '"  class="tempCat" value="' + v.CategoryName + '" /><span data-id="' + v.CategoryID + '" data-issystem="' + v.IsSystem + '" class="deleteTempCat iconDel"></span>';
                        html += '</li>';
                        fltrHtml += '<li class="sfCol-12 Px-20" data-id="' + v.CategoryID + '">';
                        fltrHtml += v.CategoryName;
                        fltrHtml += '</li>';
                        options += '<option value="' + v.CategoryID + '">' + v.CategoryName + '</option>';
                    });
                }
                $('#ulTempCatList').html(html);
                $('#slcTemplateCategory').html(options);
                $('#fltrCatListing').html(fltrHtml);
                TempMgr.categoryEventListner();
            },
            categoryEventListner: function () {
                $('input.tempCat').off('change').on('change', function () {
                    TempMgr.addUpdateCategory($(this));
                });
                $('input.tempCat').off('keydown').on('keydown', function (e) {
                    if (e.which === 13) {
                        TempMgr.addUpdateCategory($(this));
                    }
                });
                $('.deleteTempCat').off('click').on('click', function () {
                    let $this = $(this);

                    if ($this.attr('data-issystem') === 'false') {
                        SageConfirmDialog('Are you sure?').done(function () {
                            if ($this.attr('data-id') > 0) {
                                TempMgr.delCategoryByID($this.attr('data-id'));
                            } else {
                                $this.parent().remove();
                            }
                        });
                    } else {
                        ActionMessage(localLabel.SytemReservedCatDeleteError, MessageType.Error);
                    }
                });
            },
            addUpdateCategory: function ($this) {
                if ($this.val() !== '') {
                    $this.closest('UL').find('.sfError').remove();

                    this.config.methodname = "AddUpdateCategory";
                    this.config.contentType = "application/x-www-form-urlencoded",
                        this.config.data = {
                            id: $this.attr('data-id'),
                            name: $.trim($this.val()),
                        };
                    this.config.ajaxSuccess = function (data) {
                        if (data === 1) {
                            TempMgr.getAllCategory();
                            ActionMessage(localLabel.CategoryAddSuccess, MessageType.Success);
                        } else if (data === 2)
                            ActionMessage(localLabel.CategoryUpdateSuccess, MessageType.Success);
                        else
                            ActionMessage(localLabel.CategoryAlreadyExistError, MessageType.Error);
                    };
                    this.ajaxCall(this.config, true);
                } else {
                    $this.parent().after(`<span class="sfError">${localLabel.Required}</span>`);
                }
            },
            ajaxCall: function (config, IsTraditional) {
                config.url = config.baseURL + "/" + config.methodname;
                config.success = config.ajaxSuccess;
                config.error = TempMgr.ajaxFailure;
                if (IsTraditional)
                    SecureAjaxCall.Call(config);
                else
                    SecureAjaxCall.PassObject(config);
                TempMgr.config.type = 'POST';
            },
            ajaxFailure: function (data) {
                var msg = data.statusText;
                if (data.status === 401)
                    msg = localLabel.InvalidRequest;
                ActionMessage(msg, MessageType.Error, false);
            },
        };
        TempMgr.init();
        $.validator.addMethod('notNone', function (value, element) {
            return (value !== 'none');
        }, 'select an option.');
        validator = $("#formEmailTemplate").validate({
            ignore: ":hidden",
            rules: {
                TemplateName: {
                    required: true
                },
                TemplateCategory: {
                    notNone: true
                },
                EmailSubject: {
                    required: true,
                }
            },
            messages: {
                TemplateName: {
                    required: localLabel.Required,
                },
                EmailSubject: {
                    required: localLabel.Required,
                }
            }
        });
    };

    $.fn.EmailTemplateManager = function (p) {
        $.EmailTemplateManage(p);
    };
}(jQuery));