(function ($) {
    var $validator;
    var selectedUsers = [];
    var userList = [];
    var limit = 10;
    var massMailID = 0;
    var currentPage, reportCurrentPage = 0;
    let templateOffSet = 0;
    let templateLimit = 10;
    let blnkTemp = `<div class="sfCol-12 sfCol-md-4 sfCol-xl-3">
                        <div class="eTemp-thumb">
                                    <div class="eThumb">
                                        <div class="eTemplate p-relative">
                                            <img src="/emailtemplate/images/document-empty.png" />
                                            <div class="sfButtonWrapper p-absolute">
                                                <button type="button" class="btn primary round btnUseTemp" data-id="0">Use this</button>
                                            </div>
                                        </div>
                                        <div class="eTemp-Info">
                                            <div class="temp-title">
                                                <h3>Blank Template</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
    let isLoadMoreClick = false;
    $.MassMailManage = function (p) {
        p = $.extend({ modulePath: '', DataObj: '', userModuleID: '' }, p);
        let MassMailManage = {
            config: {
                MassMailLimit: 10,
                url: '/Dashboard/MassMail/',
                templateURL: "/dashboard/emailtemplate/",
            },
            init: function () {
                MassMailManage.InitEvents();
                MassMailManage.RefreshData();
                MassMailManage.GetAllTemplate();
                MassMailManage.GetTimeZone();
                MassMailManage.GetFilterValue();
            },
            ajaxCall: function (config, IsTraditional) {
                config.error = MassMailManage.ajaxFailure;
                if (IsTraditional)
                    SecureAjaxCall.Call(config);
                else
                    SecureAjaxCall.PassObject(config);
                MassMailManage.config.type = 'POST';
            },
            ajaxFailure: function (data) {
                var msg = data.statusText;
                if (data.status === 401)
                    msg = "You are not authorized from system. Please do refresh or contact to admin for permission.";
                ActionMessage(msg, MessageType.Error, false);
            },
            RefreshData: function () {
                massMailID = 0;
                $('#cbAll, .mailFilter-container input').prop('checked', false);
                $("#txtMassMailTitle").val('');
                offset = 1;
                limit = 10;
                MassMailManage.GetMailList(0, limit, 0);
            },
            GetMailList: function (offset, limit, current) {
                var param = {
                    offset: current * limit,
                    limit: MassMailManage.config.MassMailLimit,
                    filterTypeID: (typeof $('input[name="categoryType"]:checked').val() === "undefined") ? 0 : parseInt($('input[name="categoryType"]:checked').val()),
                    status: (typeof $('input[name="categoryStatus"]:checked').val() === "undefined") ? 0 : parseInt($('input[name="categoryStatus"]:checked').val()),
                    mailTitle: $.trim($('#txtMassMailTitle').val())
                };
                var config = {
                    data: param,
                    url: MassMailManage.config.url + "GetMassMailList",
                    success: function (data) {
                        MassMailManage.GetMailListSuccessCall(data);
                    }
                };
                SecureAjaxCall.Call(config);
            },
            GetMailListSuccessCall: function (data) {
                var html = ``;
                var TotalRow = 0;
                var statusClass = "";
                if (data !== null && data.length > 0) {
                    $.each(data, function (index, item) {
                        switch (item.StatusID) {
                            case 1:
                                statusClass = 'capsule-primary';
                                break;
                            case 2:
                                statusClass = 'secondary-cps';
                                break;
                            case 3:
                                statusClass = 'capsule-success';
                                break;
                            case 4:
                                statusClass = 'capsule-danger';
                                break;
                            default:
                                statusClass = 'capsule-light';
                                break;
                        }

                        TotalRow = item.RowTotal;
                        let sDate = item.ScheduledOn.split(' ');
                        let sTime = sDate[1];
                        sDate = sDate[0];
                        if (item.IsInstant === true) {
                            schType = `Instant`;
                            if (item.StatusID === 1)
                                item.Status = 'Queue';
                        } else {
                            schType = `Custom`;
                        }
                        html += `<div class="dg-col-wp">
                                    <div class="sfCol-sm-6">
                                        <div class="dg-group-inline checkbox">
                                            <div class="sfCheckbox">
                                                <input class="chkGrdItem" name="cbMailList" type="checkbox" id="chk${index}" value="${item.MassMailID}">
                                                <label for="chk${index}" class="onlylabel"></label>
                                            </div>
                                        </div>
                                        <div class="dg-group-inline">
                                            <div class="dg-group">
                                                <div class="dg-title gray-800">${item.Subject}</div>
                                            </div>
                                            <div class="dg-group">
                                                <span class="capsule rounded ${statusClass}">${item.Status}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="sfCol-12 sfCol-sm-3 sm-f-center Pl-45 sm-Pa-0 Mt-20 sm-Mt-0">
                                        <div class="dg-group-inline">
                                            <div class="dg-group Mb-10">
                                                <div class="color-black">
                                                    ${schType}
                                                </div>
                                            </div>
                                            <div class="dg-group Mb-6">
                                                    <span class="grd-value">${sDate}</span>
                                            </div>
                                            <div class="dg-group "> 
                                                    <span class="grd-value">${sTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="sfCol-12 sfCol-sm-3 sm-f-center Pl-45 sm-Pa-0 Mt-10 sm-Mt-0" >
                                        <div class="ds-group-inline">
                                            <div class="action-menu">
                                                <div class="action-icon">
                                                    <i class="fa fa-ellipsis-h"></i>
                                                </div>
                                                <ul class="action-open">`;
                        if (item.StatusID > 1)
                            html += `<li><a href="Javascript:void(0);" data-mailid="${item.MassMailID}" data-action="report" class="report massMailReport links"><i class="fa fa-file"></i>Report</a></li>`;
                        if (!item.IsAddedByApp) {
                            html += `<li><a href="Javascript:void(0);" data-mailid="${item.MassMailID}" data-action="edit" class="edit editMassMail links"><i class="fa fa-edit"></i>Edit</a></li>
                                    <li><a href="Javascript:void(0);" data-mailid="${item.MassMailID}" data-action="delete" class="delete deleteMassMail links"><i class="fa fa-trash"></i>Delete</a></li>`;
                        }
                        html += '</ul></div></div></div></div>';
                    });
                } else {
                    html += `<div class="dg-col-nodata">
                    <h5>No Data To Display.</h5>
                </div>`;
                }
                $('#divMailGridBdy').html(html);
                MassMailManage.GridEvent();
                gridHelper.bindEvent({
                    onMenuClick: function ($ele) {
                    }
                });
                if (TotalRow > limit) {
                    $('#divMailPagination').show().pagination(TotalRow, {
                        items_per_page: limit,
                        current_page: currentPage,
                        num_edge_entries: 2,
                        callfunction: true,
                        function_name: {
                            name: MassMailManage.GetMailList,
                            limit: limit,
                        },
                        callback: MassMailManage.PaginationCallBack,
                        prev_text: false,
                        next_text: false
                    });
                } else {
                    $('#divMailPagination').hide();
                }
            },
            PaginationCallBack: function () {
                $('input#cbAll').prop('checked', false);
            },
            EditMail: function (MailID) {
                var config = {
                    data: { massmailID: MailID },
                    url: MassMailManage.config.url + "GetMassMailDetailForEdit",
                    success: function (data) {
                        MassMailManage.GetMailDetailSuccessCall(data);
                    }
                };
                SecureAjaxCall.Call(config);
            },
            GetMailDetailSuccessCall: function (data) {
                if (data !== null) {
                    MassMailManage.ClearAddDetail();
                    MassMailManage.ToogleMassMailContainers(1);
                    let obj = data;
                    let objMail = obj.Mails[0];
                    $('#txtSubject').val(objMail.Subject);
                    EmailEditorsHelper.ClearEditor();
                    EmailEditorsHelper.SetEditData(objMail.MessageEditDOM);
                    $.each(obj.RecipientGroup, function (i, v) {
                        $('#chkRecipient' + v.GroupID).prop("checked", true);
                    });
                    if (obj.Genders.length > 0) {
                        $.each(obj.Genders, function (i, v) {
                            $(`input[name="gender"][value="${v.GenderID}"]`).prop("checked", true);
                        });
                        if ($('input[type="checkbox"][name="gender"]:not(:checked)').length < 1) {
                            $('#cbGndrAll').prop('checked', true);
                        }
                    }
                    $('.chkMailRcpt.subscribe-users').prop('checked', objMail.IsSubscribeUser);
                    $('#txtSchedule').val(objMail.ScheduledOn);
                    $('#ddTimeZone').val(objMail.TimeZoneOffset);
                    if (objMail.IsInstant) {
                        $('#rbInstant').prop('checked', true);
                    } else {
                        $('#rbCustom').prop('checked', true);
                    }
                    $('#rbInstant').trigger('change');
                    if (obj.Users.length > 0) {
                        var html = '';
                        $.each(obj.Users, function (index, item) {
                            html += `<div>
                                        <span class="userLabel" data-users='${item.TypeID}'>${item.TypeName}</span>
                                        <i  class="fa fa-times canceluser"></i>
                                     </div>`;
                        });
                        $('#divSelectedUsers').html(html);
                    }
                    if (obj.Interests.length > 0) {
                        let html = "";
                        $.each(obj.Interests, function (index, item) {
                            html += `<div class='selectedinterest'>
                                        <span class="interestlabel" data-interest='${item.InterestID}'> ${item.Interest}</span>
                                        <i  class="fa fa-times cancelinterest"></i>
                                    </div>`;
                        });
                        $('.interest-list').append(html);
                        $('.cancelinterest').off('click').on('click', function () {
                            let $this = $(this);
                            SageConfirmDialog('Are you sure you want to delete this?').done(function () {
                                $this.closest('.selectedinterest').remove();
                                MassMailManage.CheckForAudienceValidity();
                            });
                        });
                    }
                    if (obj.AdvanceFilters.length > 0) {
                        let html = "";
                        $.each(obj.AdvanceFilters, function (index, item) {
                            let dataType = item.AppName + '$' + item.Category;
                            html += `<div class="selectedfilter" data-app="${item.AppName}" data-category="${item.Category}" data-type="${dataType}">
                                <label>${item.AppName + ' > ' + item.Category} :</label>`;
                            let filterValues = item.FilterValue.split(',');
                            let filterValue = dataType + '$';
                            if (item.InputType !== 'checkbox')
                                filterValue = '';
                            $.each(filterValues, function (i, v) {
                                html += ` <div class="selectedfilterData" filter-type="${item.InputType}" data-type="${dataType}">
                                        <span class="filterlabel" data-filter="${filterValue + v}">${v}</span> 
                                              <i class="fa fa-times cancelfilter"></i>
                                            </div>`;
                            });
                            html += `</div>`;
                        });
                        $('.advance-list').html(html);
                        $('.cancelfilter').off('click').on('click', function () {
                            let $this = $(this);
                            SageConfirmDialog('Are you sure you want to delete this?').done(function () {
                                let $filterParent = $this.parent().parent();
                                $this.closest('.selectedfilterData').remove();
                                if ($filterParent.find('.selectedfilterData').length === 0) {
                                    $filterParent.remove();
                                }
                                MassMailManage.CheckForAudienceValidity();
                            });
                        });
                    }
                    MassMailManage.CheckForAudienceValidity();
                }
            },
            DeleteMail: function (MailID) {
                var config = {
                    data: { massmailID: MailID },
                    url: MassMailManage.config.url + "DeleteMassMail",
                    success: function (data) {
                        MassMailManage.DeleteMassMailSuccessCall(data);
                    }
                };
                SecureAjaxCall.Call(config);
            },
            DeleteMassMailSuccessCall: function (data) {
                if (data === 1) {
                    ActionMessage("Mail deleted Successfully", MessageType.Success);
                    MassMailManage.ToogleMassMailContainers(false);
                    MassMailManage.RefreshData();
                } else if (data === -2) {
                    ActionMessage("Exception occured!!", MessageType.Error)
                } else if (data === -1) {
                    ActionMessage("User not authorized to perform the task", MessageType.Warning);
                } else {
                    ActionMessage("Error Occured while deleting mail.", MessageType.Error);
                }
            },
            GetReport: function (MailID) {
                var config = {
                    data: { massmailID: MailID },
                    url: MassMailManage.config.url + "GetReportByID",
                    success: function (data) {
                        MassMailManage.GetReportSuccess(data);
                    }
                };
                SecureAjaxCall.Call(config);
            },
            GetReportSuccess: function (data) {
                if (data !== null) {
                    reports = data;
                    MassMailManage.ToogleMassMailContainers(4);
                    let successMailPercentage = Math.floor((reports.SuccessMail / reports.TotalAudience) * 100) + '%';
                    let failureMailPercentage = Math.floor((reports.FailureMail / reports.TotalAudience) * 100) + '%';
                    $('#divTotalStat .counter_amount').text(reports.TotalAudience);
                    $("#successValues .counter_value").text(successMailPercentage);
                    $("#successValues .counter_title").text('Delivery Success');
                    $("#successValues .mail-stats").attr('data-percent', successMailPercentage);
                    $("#successValues .counter_amount").text(reports.SuccessMail);

                    $("#failureValues .counter_value").text(failureMailPercentage);
                    $("#failureValues .counter_title").text('Delivery Failure');
                    $("#failureValues .mail-stats").attr('data-percent', failureMailPercentage);

                    $("#failureValues .counter_amount").text(reports.FailureMail);
                    $(".mail-stats .stat-bar").css('width', '0px');
                    MassMailManage.animateStat();
                }
            },
            animateStat: function () {
                $('.mail-stats').each(function () {
                    $(this).find('.stat-bar').animate({
                        width: $(this).attr("data-percent")
                    }, 6000);
                });
            },
            GetEmailUserReport: function (offset, limit, current) {
                var config = {
                    data: {
                        MailID: massMailID,
                        OffSet: current * limit,
                        Limit: 10,
                        Types: $('#fltrDeliverStatus').val(),
                    },
                    url: MassMailManage.config.url + "GetAudienceReportByID",
                    success: function (data) {
                        MassMailManage.GetEmailUserReportSuccess(data);
                    }
                };
                SecureAjaxCall.Call(config);
            },
            GetEmailUserReportSuccess: function (data) {
                let html = ``;
                if (data !== null && data.length > 0) {
                    let reportList = data;
                    let TotalRow = reportList[0].TotalRow;
                    let statusCls = '';
                    $.each(reportList, function (k, v) {
                        let statID = v.DeliverStatus;
                        if (statID === 1)
                            statusCls = 'capsule-success';
                        else if (statID === 3 || statID === 0)
                            statusCls = 'capsule-danger';
                        else
                            statusCls = 'capsule-danger';
                        html += `<div class="dg-col-wp">
                                    <div class="sfCol-sm-2">
                                        <div class="dg-group">
                                            <div class="dg-group-inline">
                                                <span class="grd-key">${v.RowNum} </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="sfCol-sm-7">
                                        <div class="dg-group">
                                            <div class="dg-group-inline">
                                                <span class="grd-key">${v.EmailAddress} </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="sfCol-sm-7">
                                        <div class="dg-group">
                                            <span class="pills ${statusCls} rounded">${v.Status}</span>
                                        </div>
                                    </div>
                                </div>`;
                    });
                    if (TotalRow > limit) {
                        $('#reportPagination').show().pagination(TotalRow, {
                            items_per_page: limit,
                            current_page: reportCurrentPage,
                            num_edge_entries: 2,
                            callfunction: true,
                            function_name: {
                                name: MassMailManage.GetEmailUserReport,
                                limit: limit
                            },
                            prev_text: false,
                            next_text: false
                        });
                    } else {
                        $('#reportPagination').hide();
                    }
                } else {
                    html += `<div class="dg-col-nodata"><h5>NO DATA TO DISPLAY</h5></div>`;
                }
                $("#delFailList").html(html);
            },
            SelectFirstItem: function (selectID) {
                $("#" + selectID).val($("#" + selectID + " option:first").val());
            },
            InitEvents: function () {
                $('#btnSearchMail').on('click', function () {
                    MassMailManage.GetMailList(0, MassMailManage.config.limit, 0);
                });

                $('#btnRefreshData').on('click', function () {
                    MassMailManage.RefreshData();
                });

                $('#deleteChkd').off("click").on('click', function () {
                    var mailIDs = $("input:checkbox[name='cbMailList']:checked").map(function () {
                        return $(this).val();
                    }).get().join(',');
                    if (mailIDs !== "") {
                        SageConfirmDialog('Are you sure you want to delete selected mails?').done(function () {
                            MassMailManage.DeleteMail(mailIDs);
                        });
                    }
                });

                $('#btnNewMassMail').on('click', function () {
                    $validator.resetForm();
                    massMailID = 0;
                    MassMailManage.ClearAddDetail();
                    MassMailManage.ToogleMassMailContainers(2);
                });

                $('input[name="categoryStatus"]').on('click', function () {
                    $('input[name="categoryStatus"]').not(this).prop('checked', false);
                    offset = 1;
                    limit = 10;
                    MassMailManage.GetMailList(0, limit, 0);
                });
                // event on select template page
                $("#btnLoadMore").off('click').on('click', function () {
                    isLoadMoreClick = true;
                    templateOffSet = templateOffSet + 1 * templateLimit;
                    MassMailManage.GetAllTemplate();
                });

                $('#btnBack, #btnReportBack').on('click', function () {
                    MassMailManage.ToogleMassMailContainers(3);
                });

                $('#btnSearchTemplate').off("click").on('click', function () {
                    isLoadMoreClick = false;
                    templateOffSet = 0;
                    MassMailManage.GetAllTemplate();
                });
                $('#btnResetSearch').off("click").on('click', function () {
                    $('#txtTemplateSearch').val('');
                    $('#fltrCatListing li').removeClass('active');
                    $('#fltrCatListing li').eq(0).addClass('active');
                    templateOffSet = 0;
                    isLoadMoreClick = false;
                    MassMailManage.GetAllTemplate();
                });
                $('#fltrCatListing').off('click').on('click', 'li', function () {

                    $('#fltrCatListing li').removeClass('active');
                    $(this).addClass('active');
                    templateOffSet = 0;
                    isLoadMoreClick = false;
                    MassMailManage.GetAllTemplate();
                });
                $('#txtTemplateSearch').off('keyup').on('keyup', function (e) {
                    if (e.keyCode == 13) {
                        templateOffSet = 0;
                        isLoadMoreClick = false;
                        MassMailManage.GetAllTemplate();
                    }
                });
                $('#divTempFltr').SideBarPanel({
                    title: 'Filter Template',
                    openButton: '#btnOpenFltr',
                    closeButton: '#btnCloseSidePnl',
                    ready: function () {
                        MassMailManage.GetAllCategory(MassMailManage.BindCategory);
                    },
                });
                $('#btnFltrClose').off('click').on('click', function () {
                    $('#divTempFltr').hide("slide", { direction: "right" }, 500);
                    $('.filter-overlay').remove();
                });

                $('#chooseTemplate').off("click", ".btnUseTemp").on('click', ".btnUseTemp", function () {
                    MassMailManage.ToogleMassMailContainers(1);
                    if ($(this).attr('data-ID') !== "0")
                        MassMailManage.GetTemplateByID($(this).attr('data-ID'));
                    $("#btnSaveTempPopup").show();
                });

                $('#chooseTemplate').off('click', '.btnUseBlnkTemp').on('click', '.btnUseBlnkTemp', function () {
                    MassMailManage.ToogleMassMailContainers(1);
                    $("#btnSaveTempPopup").show();
                });
                $('input.chkMailRcpt').off("change").on('change', function () {
                    MassMailManage.ValidateRecipient();
                });
                $('#txtAdditionalUsers').off('focusout').on('focusout', function () {
                    MassMailManage.ValidateRecipient();
                });
                // event on compose page
                $('#cbGndrAll').off('click').on('click', function () {
                    $('input[type="checkbox"][name="gender"]').prop('checked', this.checked);
                    MassMailManage.CheckForAudienceValidity();
                });

                $('input[type="checkbox"][name="gender"]').off('click').on('click', function () {
                    if ($('input[type="checkbox"][name="gender"]:not(:checked)').length > 0) {
                        $('#cbGndrAll').prop('checked', false);
                    } else {
                        $('#cbGndrAll').prop('checked', true);
                    }
                    MassMailManage.CheckForAudienceValidity();
                });
                $('#txtSchedule').datetimepicker({
                    dateFormat: "yy-mm-dd",
                    timeFormat: "hh:mm:ss",
                    defaultValue: Date.now(),
                    minDate: Date.now(),
                    timepickerScrollbar: false
                });
                $('.rbSchedule').off('change').on('change', function () {
                    var val = $('.rbSchedule:checked').val();
                    if (val == 1) {
                        $('#divScheduleForm').fadeOut();
                        $('#btnSaveMassMail').text('Send')
                            .removeClass('icon-save')
                            .addClass('icon-plane');
                        $("#timeZone").fadeOut();
                    } else {
                        $('#divScheduleForm').fadeIn();
                        $('#btnSaveMassMail').text('Save')
                            .removeClass('icon-plane')
                            .addClass('icon-save');
                        $("#timeZone").fadeIn();
                    }
                });
                $('#btnCancelMassMailManage').off("click").on('click', function () {
                    EmailEditorsHelper.ClearEditor();
                    MassMailManage.ToogleMassMailContainers(3);
                    MassMailManage.ClearAddDetail();
                });
                $('#btnPreview').off("click").on('click', function () {
                    let data = EmailEditorsHelper.GetData();
                    let Tokens = Object.keys(EmailBasicToken);
                    $.each(Tokens, function (i, v) {
                        data.ViewDOM = data.ViewDOM.replaceAll(EmailBasicToken[v].Token, EmailBasicToken[v].SampleValue);
                    });
                    if (data.ViewDOM == "") {
                        SageAlertDialog("Email cannot be empty.", "Mass Mail Alert");
                    } else {
                        var viewdom = EmailEditorsHelper.ReplaceTokenBySample(data.ViewDOM);
                        EmailEditorsHelper.PreviewTemplate(viewdom, "Email Preview");
                    }
                });
                $("#btnSaveTempPopup").off('click').on('click', function () {
                    if (EmailEditorsHelper.GetData().ViewDOM != "") {
                        MassMailManage.GetAllCategory(MassMailManage.SaveTemplatePopup);
                    } else {
                        SageAlertDialog("Email Body cannot be empty.", "Mass Mail Alert");
                    }
                });
                $('#divMailManage').off('click', '.canceluser').on('click', '.canceluser', function () {
                    $(this).parent().remove();
                    MassMailManage.ValidateRecipient();
                });
                $('#divMailManage').off('click', '.cancel-intrs').on('click', '.cancel-intrs', function () {
                    $(this).parent().remove();
                });
                $("#txtAdditionalUsers").autocomplete({
                    minLength: 2,
                    source: function (request, response) {
                        MassMailManage.GetAllUsers(request, response);
                    },
                    change: function (event, ui) {
                        var terms = split(this.value);
                        var itemsToRemove = [];
                        for (var i = 0; i < terms.length; i++) {
                            var currentTerm = terms[i];
                            var ok = false;
                            for (var j = 0; j < selectedUsers.length; j++) {
                                if (selectedUsers[j].label === currentTerm)
                                    ok = true;
                            }
                            if (!ok)
                                itemsToRemove.push(currentTerm);
                        }
                        if (itemsToRemove.length) {
                            for (var i = 0; i < itemsToRemove.length; i++) {
                                removeArrayItem(terms, itemsToRemove[i]);
                            }
                            $(this).val(terms.join(", "));
                        }
                    },
                    focus: function (event, ui) {
                        return false;
                    },
                    select: function (event, ui) {
                        var IsDuplicate = false;
                        $('#divSelectedUsers').children('div').each(function () {
                            if ($(this).children('span').data('users') == ui.item.value)
                                IsDuplicate = true;
                        });
                        if (!IsDuplicate) {
                            var html = '<div><span class="userLabel" data-users=' + ui.item.value + '>' + ui.item.label + '</span> <i  class="fa fa-times canceluser"></i></div> ';
                            $('.selectedUers').append(html);
                        }
                        $(this).val('');
                        return false;
                    }
                });

                //********************************************************************************************//
                //****************************** interest events *********************************************//


                MassMailManage.InterestEvents();


                //********************************************************************************************//
                //****************************** advance filter events *********************************************//
                MassMailManage.AdvanceFilterEvents();

                //AdvanceFilterEvents

                $('#btnSaveMassMail').off('click').on('click', function () {
                    let data = EmailEditorsHelper.GetData();
                    var msgBody = data.ViewDOM;
                    var valid = true;
                    if ($validator.form() && msgBody !== "") {
                        valid = true;
                    } else {
                        valid = false;
                    }
                    if (msgBody === "") {
                        valid = false;
                        $("#divMailComposer").after('<label class="sfError" id="lblErrorBody" style="display: inline;"><br/>* Required Field</label>');
                    } else {
                        if ($('#lblErrorBody').length > 0)
                            $('#lblErrorBody').remove();
                    }
                    if (valid === true) {
                        MassMailManage.SaveMailDetail();
                    }
                });
                $('#fltrDeliverStatus').off('change').on('change', function () {
                    MassMailManage.GetEmailUserReport(0, limit, 0);
                });
            },
            GridEvent: function () {
                $('#divMailGridBdy').off('click', '.editMassMail').on('click', '.editMassMail', function () {
                    var ID = $(this).data('mailid');
                    MassMailManage.EditMail(ID);
                });
                $('#divMailGridBdy').off('click', '.deleteMassMail').on('click', '.deleteMassMail', function () {
                    let ID = $(this).data('mailid');
                    SageConfirmDialog('Are you sure you want to delete this mail?').done(function () {
                        MassMailManage.DeleteMail(ID);
                    });
                });
                $('#divMailGridBdy').off('click', '.massMailReport').on('click', '.massMailReport', function () {
                    massMailID = $(this).data('mailid');
                    MassMailManage.GetReport(massMailID);
                    MassMailManage.GetEmailUserReport(0, limit, 0);
                });
            },
            ValidateRecipient: function () {
                MassMailManage.CheckForAudienceValidity();
                $('#txtValidateAudience').focus().focusout();
            },
            SaveTemplatePopup: function (data) {
                let catList = data;
                let catOption = '<option value="none">Select Category</option>';
                $.each(catList, function (i, v) {
                    catOption += `<option value="${v.CategoryID}">${v.CategoryName}</option>`;
                });
                let templateForm = `<div class="templateForm_body" id="divTemplateInfo" style="">
                                            <div class="sfFormwrapper">
                                                <input id="hdnEmailTemplateID" value="0" type="hidden">
                                                <div class="sfFieldset" style="display: none;" id="divTemplateIdenfier">
                                                    <div class="formKey textType">
                                                        <label>Identifier</label>
                                                    </div>
                                                    <div class="formValue">
                                                        <input disabled="disabled" readonly="readonly" id="txtMailTempIdentifier" class="sfInputbox " placeholder="To uniquely identify this template" type="text">
                                                    </div>
                                                </div>
                                                <div class="sfFieldset">
                                                    <div class="formKey textType">
                                                        <label>Name*</label>
                                                    </div>
                                                    <div class="formValue">
                                                        <input id="txtTemplateName" name="TemplateName" class="sfInputbox " placeholder="Mail Template Name" type="text">
                                                    </div>
                                                </div>
                                                <div class="sfFieldset">
                                                    <div class="formKey textType">
                                                        <label>Subject*</label>
                                                    </div>
                                                <div class="formValue">
                                                    <input id="txtEmailSubject" name="EmailSubject" class="sfInputbox " placeholder="Subject" type="text">
                                                </div>
                                            </div>
                                            <div class="sfFieldset">
                                                <div class="formKey selectKey">
                                                    <label>Category*</label>
                                                </div>
                                                <div class="formValue categorySelect" id="divTempCategorySelect">
                                                    <select id="slcTemplateCategory" name="TemplateCategory">
                                                        ${catOption}
                                                    </select>
                                                </div>
                                            </div>
                                            <button type="button" id="btnSaveTemplate" class="btn sml-btn primary-btn pull-right">Save Template</button>
                                        </div>
                                    </div>`;
                FullPagePopup({
                    data: templateForm,
                    heading: "Save Template",
                    showheading: true,
                    width: "60%",
                    onClose: function () { },
                    onappend: function ($parent) {
                        $parent.find('.fullpage-popup-model-body').css({ "background-color": "#FFF" });
                    }
                });
                $('#btnSaveTemplate').off('click').on('click', function () {
                    let templateName = $('#txtTemplateName').val();
                    let subject = $('#txtEmailSubject').val();
                    let category = $('#slcTemplateCategory').val();
                    if (templateName.trim() === "") {
                        $("#txtTemplateName").parent().after('<label class="sfError" id="lblErrorBody" style="display: inline;"><br/>* Required Field</label>');
                    }
                    if (subject.trim() === "") {
                        $("#txtEmailSubject").parent().after('<label class="sfError" id="lblErrorBody" style="display: inline;"><br/>* Required Field</label>');
                    }
                    if (category.trim() === "none") {
                        $("#divTempCategorySelect").after('<label class="sfError" id="lblErrorBody" style="display: inline;"><br/>* Required Field</label>');
                    }
                    if (templateName.trim() !== "" && subject.trim() !== "" && category.trim() !== "none") {
                        MassMailManage.SaveTemplate();
                    }
                });
            },
            GetAllCategory: function (successfunction) {
                var config = {
                    data: JSON.stringify({
                        OffSet: 0,
                        Limit: 200,
                        SiteID: GetSiteID
                    }),
                    url: MassMailManage.config.templateURL + "GetAllCategory",
                    success: successfunction
                };
                MassMailManage.ajaxCall(config, false);
            },
            GetAllTemplate: function () {
                let cat = $('#fltrCatListing .active').attr('data-id');
                if (typeof cat === 'undefined')
                    cat = '';
                let param = {
                    OffSet: templateOffSet,
                    Limit: templateLimit,
                    SiteID: GetSiteID,
                    Category: cat,
                    IsMassMail: true,
                    SearchKey: $('#txtTemplateSearch').val()
                };
                var config = {
                    data: param,
                    url: MassMailManage.config.templateURL + "GetAllTemplate",
                    success: function (data) {
                        MassMailManage.BindChooseTemplate(data);
                    }
                };
                SecureAjaxCall.Call(config);
            },
            GetTemplateByID: function (templateID) {
                var config = {
                    data: { TemplateID: templateID },
                    url: MassMailManage.config.templateURL + "GetTemplateByID",
                    success: function (data) {
                        MassMailManage.BindTemplate(data);
                    }
                };
                SecureAjaxCall.Call(config);
            },
            BindTemplate: function (data) {
                EmailEditorsHelper.ClearEditor();
                EmailEditorsHelper.SetEditData(data.EditDOM);
            },
            SaveTemplate: function () {
                let data = EmailEditorsHelper.GetData();
                var config = {
                    data: {
                        TemplateID: 0,
                        EditDOM: data.EditorDOM,
                        ViewDOM: data.ViewDOM,
                        Name: $.trim($('#txtTemplateName').val()),
                        Subject: $.trim($('#txtEmailSubject').val()),
                        ScreenShot: '',
                        CatID: $('#slcTemplateCategory').val(),
                        SiteID: GetSiteID
                    },
                    url: MassMailManage.config.templateURL + "AddUpdateTemplate",
                    success: MassMailManage.SaveTemplateSuccess
                };
                SecureAjaxCall.Call(config);
            },
            SaveTemplateSuccess: function (data) {
                if (data.Status == 1) {
                    CloseFullPagePopup();
                    ActionMessage("Template Saved Successfully.", MessageType.Success);
                }
            },
            SaveMailDetail: function () {
                let data = EmailEditorsHelper.GetData();
                let mailTitle = "";
                let roles = $('.chkMailRcpt.users-roles:checked').map(function () {
                    return $(this).val();
                }).get().join(',');
                let isRole = (roles === "") ? false : true;
                let CustomRcpt = $('.chkMailRcpt.custom-subscriber:checked').map(function () {
                    return $(this).val();
                }).get().join(',');
                let isCustomRcpt = CustomRcpt === "" ? false : true;
                let interests = $('.interest-list').find('.interestlabel').map(function () {
                    return $(this).attr('data-interest');
                }).get().join(',');
                let advFiltersValue = $('.advance-list').find('.selectedfilter').map(function () {
                    return ($(this).attr('data-app') + '#' + $(this).attr('data-category') + '#' + $(this).attr('control-type') + '#' + $(this).find('.filterlabel').map(function () { return $(this).text(); }).get().join(','));
                }).get().join('^');
                let hasTarget = (interests === "") ? false : true;
                let genders = $('input[name="gender"]:checked').map(function () {
                    return $(this).val();
                }).get().join(',');
                let additionUsers = '';
                $('#divSelectedUsers').children('div').each(function () {
                    additionUsers += $(this).children('span').data('users') + ',';
                });
                if (additionUsers != '')
                    additionUsers = additionUsers.substring(0, additionUsers.length - 1);
                let isInstant = $('input[name="schedule"]:checked').val() === "1" ? true : false;
                let timeZone = isInstant ? MassMailManage.GetClientTimeZone() : $('#ddTimeZone').val();
                let schdeuleOn = $.trim($('#txtSchedule').val());
                let subject = $.trim($('#txtSubject').val());
                let msgBody = data.ViewDOM;
                let msgEditDOM = data.EditorDOM;
                let IsSubscribeUser = false;
                var objMassMail = {
                    MassMailID: massMailID,
                    MessageTitle: mailTitle,
                    IsRolesUsers: isRole,
                    IsCustomMailList: isCustomRcpt,
                    CustomRecipientGroup: CustomRcpt,
                    IsSubscribeUser: $('.chkMailRcpt.subscribe-users').prop('checked'),
                    HasTargetUserInterest: hasTarget,
                    Gender: genders,
                    ToAllGender: $('#cbGndrAll').prop('checked'),
                    Roles: roles,
                    Interests: interests,
                    AdditionalUser: additionUsers,
                    Subject: subject,
                    MessageBody: msgBody,
                    MessageEditDOM: msgEditDOM,
                    IsInstant: isInstant,
                    ScheduledOn: schdeuleOn,
                    TimeZoneOffset: timeZone,
                    AdvanceFilters: advFiltersValue
                };
                var config = {
                    data: objMassMail,
                    url: MassMailManage.config.url + "AddUpdateMassMail",
                    error: function () {
                        ActionMessage("oops! Server Error.Contact your system admin", MessageType.Error)
                    },
                    success: function (data) {
                        MassMailManage.AddUpdateMassMailSuccessMsg(data);
                    }
                };
                SecureAjaxCall.Call(config);
            },
            AddUpdateMassMailSuccessMsg: function (data) {
                if (data.Result == 1) {
                    ActionMessage("Mail generated Successfully.", MessageType.Success);
                    MassMailManage.ToogleMassMailContainers(3);
                    MassMailManage.RefreshData();
                } else if (data.Result == 2) {
                    ActionMessage("Mail updated Successfully.", MessageType.Success);
                    MassMailManage.ToogleMassMailContainers(3);
                    MassMailManage.RefreshData();
                } else if (data.Result == 3) {
                    ActionMessage("Mail re-generated Successfully.", MessageType.Success);
                    MassMailManage.ToogleMassMailContainers(3);
                    MassMailManage.RefreshData();
                } else if (data.Result == -2) {
                    ActionMessage("Exception occured!!", MessageType.Error);
                } else if (data.Result == -1) {
                    ActionMessage("User not authorized to perform the task", MessageType.Warning);
                } else {
                    ActionMessage("Error Occured while generating mail", MessageType.Error);
                }
                EmailEditorsHelper.ClearEditor();
            },
            GetFilterValueSuccessCall: function (data) {
                var filterValues = '';
                $.each(data, function (index, item) {
                    if (item.TypeID !== "CD3CA2E2-7120-44AD-A520-394E76AAC552") {
                        filterValues += `<option value="${item.TypeID}">${item.TypeName}</option>`;
                    }
                });
                $('#ddlFormFilterValue').html(filterValues);
            },
            BindChooseTemplate: function (data) {
                if (data !== null && data.length > 0) {
                    let templates = data;
                    let RowTotal = templates[0].RowTotal;
                    let templateDom = ``;
                    $.each(templates, function (key, value) {
                        templateDom += `<div class="sfCol-12 sfCol-md-4 sfCol-xl-3">
                                            <div class="eTemp-thumb">
                                        <div class="eThumb">
                                            <div class="eTemplate p-relative">
                                                ${EmailEditorsHelper.ReplaceTokenBySample(value.ViewDOM)}
                                                <div class="sfButtonWrapper p-absolute">
                                                    <button type="button" class="btn primary round btnUseTemp" data-id="${value.TemplateID}">Use this</button>
                                                </div>
                                            </div>
                                            <div class="eTemp-Info">
                                                <div class="temp-title">
                                                    <h3>${value.Name}</h3>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>`;
                    });
                    if (isLoadMoreClick) {
                        $('.eTemp-list').append(`${templateDom}`);
                    } else {
                        $('.eTemp-list').html(`${blnkTemp}${templateDom}`);
                    }
                    if (RowTotal > limit) {
                        $('#btnLoadMore').show();
                    }
                    if (templateOffSet > RowTotal - limit) {
                        $('#btnLoadMore').hide();
                    }
                } else {
                    $('.eTemp-list').html(`<h1>Template Not Found.</h1>`);
                    $('#btnLoadMore').hide();
                }
            },
            BindCategory: function (data) {
                let fltrHtml = '<li data-id="" class="active sfCol-12  Px-20">All Template</li>';
                $.each(data, function (i, v) {
                    if (v.CategoryName.toLowerCase() != 'system') {
                        fltrHtml += `<li data-id="${v.CategoryID}" class="sfCol-12 Px-20">${v.CategoryName}</li>`;
                    }
                });
                $('#fltrCatListing').html(fltrHtml);
            },
            ClearAddDetail: function () {
                templateOffSet = 0;
                $('#txtValidateAudience').val('');
                $('#txtMailTitle').val('');
                $('#divSelectedUsers').html('');
                $('.interest-list').html('');
                $('.advance-list').html('');
                $('#txtSchedule').val('');
                $('.chkMailRcpt').prop('checked', false);
                $('input[type="checkbox"][name="gender"], #cbGndrAll').prop('checked', false);
                $('#ddlFormFilterValue').prop("selectedIndex", -1);
                $('#btnSaveTempPopup').hide();
                $('#filterValue').hide();
                $('#txtSubject').val('');
                $('#rbInstant').prop('checked', true);
                $('.selectedUers').html('');
                $('#divScheduleForm').fadeOut();
                $('#timeZone').fadeOut();
                $('#ddTimeZone').val(MassMailManage.GetClientTimeZone());
            },
            GetInterest: function (request, response) {
                let lastItem = extractLast(request.term);
                var config = {
                    data: { Keyword: lastItem },
                    url: MassMailManage.config.url + "GetInterest",
                    success: function (data) {
                        response($.ui.autocomplete.filter(
                            $.map(data, function (item) {
                                var obj = data;
                                interestList = [];
                                $.each(obj, function (index, item) {
                                    var itemExists = false;
                                    $('.interest-list').children('div').each(function () {
                                        if ($(this).children('span').data('intid') == item.InterestID)
                                            itemExists = true;
                                    });
                                    if (!itemExists)
                                        interestList.push({
                                            "value": item.InterestID,
                                            "label": item.Interest
                                        });
                                });
                                return interestList;
                            }), lastItem));
                    }
                };
                SecureAjaxCall.Call(config);
            },
            GetAllUsers: function (request, response) {
                var lastItem = extractLast(request.term);
                var config = {
                    data: { username: lastItem },
                    url: MassMailManage.config.url + "GetAllUsers",
                    success: function (data) {
                        response($.ui.autocomplete.filter(
                            $.map(data, function (item) {
                                var obj = data;
                                userList = [];
                                $.each(obj, function (index, item) {
                                    var itemExists = false;
                                    $('#divSelectedUsers').children('div').each(function () {
                                        if ($(this).children('span').data('users') == item.TypeID)
                                            itemExists = true;
                                    });
                                    if (!itemExists)
                                        userList.push({ "value": item.TypeID, "label": item.TypeName });
                                });
                                return userList;
                            }), lastItem));
                    }
                };
                SecureAjaxCall.Call(config);
            },
            GetTimeZone: function () {
                var config = {
                    url: MassMailManage.config.url + "GetAllTimeZone",
                    success: function (data) {
                        MassMailManage.BindTimeZone(data);
                    }
                };
                SecureAjaxCall.Call(config);
            },
            GetClientTimeZone: function () {
                var TmZone = Date().toString().match(/([-\+][0-9]+)\s/)[1];
                TmZone = TmZone.substring(0, 3) + ":" + TmZone.substring(3, 5);
                return TmZone;
            },
            BindTimeZone: function (data) {
                let dropDown = $('#ddTimeZone');
                $.each(data, function (key, value) {
                    dropDown.append(
                        $('<option></option>').val(value.TimeZoneOffset).html(value.TimeZoneRegoin)
                    );
                });
            },
            ToogleMassMailContainers: function (tglEvent) {
                /**
                 * 1 to open composer
                 * 2 to open template list
                 * 3 to open grid
                 */
                switch (tglEvent) {
                    case 1:
                        $('#divMailManage').toggle(true);
                        $('#divMassMailList, #chooseTemplate, #mailReport').toggle(false);
                        break;
                    case 2:
                        $('#divMassMailList, #divGridMailLst, #divMailManage, #mailReport').toggle(false);
                        $('#chooseTemplate').toggle(true);
                        break;
                    case 3:
                        $('#divMailManage, #chooseTemplate, #mailReport').toggle(false);
                        $('#divMassMailList, #divFilters,  #divGridMailLst ').toggle(true);
                        break;
                    case 4:
                        $('#divMailManage, #chooseTemplate, #divMassMailList, #divFilters,  #divGridMailLst').toggle(false);
                        $('#mailReport').toggle(true);
                        break;
                    default:
                        break;
                }
            },
            CheckForAudienceValidity: function () {
                if ($('input.chkMailRcpt:checked').length > 0 || $('#divSelectedUsers .userLabel').length > 0 || $('.selectedinterest').length > 0 || $('.selectedfilterData').length > 0 || $('input[name="gender"]:checked').length > 0) {
                    $('#txtValidateAudience').val('valid');
                }
                else {
                    $('#txtValidateAudience').val('');
                }
                $('#txtValidateAudience').focus().focusout();
            },
            InterestEvents: function () {
                $("#divTempInterest").SideBarPanel({
                    title: 'Choose Interest ',
                    openButton: '#btnSelectInterest',
                    closeButton: '#btnCloseSidePnl',
                    ready: function () {
                        //MassMailManage.getUserInterests();
                        $('.selectedinterest').each(function () {
                            let value = $(this).find('.interestlabel').attr('data-interest');
                            $('input.cbSlcInterests[interest="' + value + '"').trigger('click');
                        });
                    },
                });
                $('#btnSearchInterest').off('click').on('click', function () {
                    let searchText = $.trim($('#txtInterestSearch').val());
                    MassMailManage.SearchInterest(searchText);
                });
                $('#txtInterestSearch').off('input').on('input', function () {
                    let searchText = $.trim($('#txtInterestSearch').val());
                    MassMailManage.SearchInterest(searchText);
                });
                $('#btnResetIntSearch').off('click').on('click', function () {
                    $('#txtInterestSearch').val('');
                    MassMailManage.SearchInterest('');
                });
                $('#btnChooseInterest').off('click').on('click', function () {
                    $('.interest-list').html('');
                    $('input.cbSlcInterests:checked').each(function () {
                        let $this = $(this);
                        let value = $this.attr('interest');
                        let label = $.trim($this.parent().find('.chkLabel').html());
                        let interestDom = `<div class='selectedinterest'>
                                              <span class="interestlabel" data-interest="${value}">${label}</span> 
                                              <i class="fa fa-times cancelinterest"></i>
                                            </div>`;
                        $('.interest-list').append(interestDom);
                    });
                    MassMailManage.CheckForAudienceValidity();
                    $('.cancelinterest').off('click').on('click', function () {
                        let $this = $(this);
                        SageConfirmDialog('Are you sure you want to delete this?').done(function () {
                            $this.closest('.selectedinterest').remove();
                            MassMailManage.CheckForAudienceValidity();
                        });
                    });
                    $('.filter-overlay').trigger('click');
                });
            },
            getUserInterests: function () {
                var config = {
                    url: MassMailManage.config.url + "GetUserInterest",
                    success: function (data) {
                        //MassMailManage.bindUserInterests(data);
                    }
                };
                SecureAjaxCall.Call(config);
            },
            bindUserInterests: function (data) {
                let htmlDOM = '';
                let chkInterestAll = ` <div class="checkbox-label">
                            <input type="checkbox" id="cbAll">
                            <label class="chk" for="cbAll">All</label>
                        </div>`;
                if (data.length !== 0) {
                    let appName = '';
                    let len = data.length;
                    for (let i = 0; i < len; i++) {
                        let interest = data[i];
                        let keywords = interest.KeyWordList;
                        if (interest.AppName !== appName) {
                            if (appName !== '')
                                htmlDOM += '</div>';
                            htmlDOM += `<div class="app sfCol_100"> 
                                         <div class="sfCol_100">
                                         <i class="fa fa-angle-right"></i>
                                         <span> ${interest.AppName}</span></div>`;
                            appName = interest.AppName;
                        }
                        htmlDOM += `<div class="category">
                                               <div class="sfCol_100">
                                               <i class="fa fa-angle-right"></i>
                                               <span> ${interest.CategoryName} </span></div>`;

                        htmlDOM += '<div class="sfCol_100 category-content">';
                        for (k = 0; k < keywords.length; k++) {
                            htmlDOM += `<div class="checkbox-label sfCol_50">
                                <input type="checkbox" interest="${appName + '$' + interest.CategoryName + '$' + keywords[k]}" class="cbSlcInterests" id="lg${appName + '$' + interest.CategoryName + '$' + keywords[k]}">
                                <label class ="chkLabel" for="lg${appName + '$' + interest.CategoryName + '$' + keywords[k]}">${keywords[k]}</label>
                            </div>`;
                        }
                        htmlDOM += `</div>`;
                        htmlDOM += `</div>`;
                    }
                    htmlDOM += '</div>';
                    $('.interestGroup').show();
                } else {
                    $('.interestGroup').hide();
                    htmlDOM += `<div class="noData"><h3>NO DATA TO DISPLAY</h3></div>`;
                }
                $('.chkInterestsList').html(htmlDOM);
                $('.category').off('click').on('click', function (event) {
                    let $this = $(this);
                    event.stopPropagation();
                    if ($this.hasClass('active')) {
                        $this.removeClass('active');
                        $this.find('.category-content').slideUp(400);
                    } else {
                        let siblings = $(this).siblings();
                        $(this).find('.category-content').slideDown(400);
                        siblings.find('.category-content').slideUp(400);
                        if (siblings.hasClass('active')) siblings.removeClass('active');
                        $this.addClass('active');
                    }
                });
                $('.app').off('click').on('click', function () {
                    let $this = $(this);
                    if ($this.hasClass('active')) {
                        if ($this.find('.category').hasClass('active')) $this.find('.category').removeClass('active');
                        $this.find('.category').slideUp(400);
                        $this.find('.category-content').slideUp(400);
                        $this.removeClass('active');
                    } else {
                        $(this).find('.category').slideDown(100);
                        $(this).find('.category').first().trigger('click');

                        let siblings = $(this).siblings();
                        if (siblings.hasClass('active')) siblings.removeClass('active');
                        siblings.find('.category').slideUp(400).prev();

                        if (siblings.find('.category').hasClass('active')) siblings.find('.category').removeClass('active');

                        siblings.find('.category-content').slideUp(400).prev();
                        $this.addClass('active');
                    }
                });
                $('.category-content').off('click').on('click', function (e) {
                    e.stopPropagation();
                });
                $('.chkInterestsList').find('.app').first().trigger('click');

            },
            SearchInterest: function (searchText) {
                if (searchText.length === 0) {
                    $('.checkbox-label').show();
                    $('#divTempInterest').find('.app').removeClass('active');
                    $('#divTempInterest').find('.category').removeClass('active');
                    $('.chkInterestsList').find('.app').first().trigger('click');
                } else {
                    $('#divTempInterest').find('.app').addClass('active');
                    $('#divTempInterest').find('.category').addClass('active');
                    $('#divTempInterest').find('.checkbox-label').hide();
                    $('#divTempInterest').find('.category').show(200);
                    $('#divTempInterest').find('.category-content').show(200);
                    $('[interest*="' + searchText + '" i]').parent().show();
                }
            },
            AdvanceFilterEvents: function () {
                $("#divAdvanceFilter").SideBarPanel({
                    title: 'Choose Filter',
                    openButton: '#btnAdvanceFilter',
                    closeButton: '#btnCloseSidePnl',
                    ready: function () {
                        //MassMailManage.getAdvanceFilters();
                        $('.selectedfilterData').each(function () {
                            let filterType = $(this).attr('filter-type');
                            let dataType = $(this).attr('data-type');
                            let value = $(this).find('.filterlabel').attr('data-filter');
                            if (filterType === 'checkbox') {
                                $('input.cbSlcFilter[filter="' + value + '"').trigger('click');
                            } else if (filterType === 'numrange') {
                                let minValue = parseFloat(value.split('-')[0]);
                                let maxValue = parseFloat(value.split('-')[1]);
                                let $slider = $('.category-content[data-type="' + dataType + '"]').find('.slider-range');
                                $slider.slider('values', 0, minValue);
                                $slider.slider('values', 1, maxValue);
                                let $amount = $slider.parent().find('.amount');
                                $amount.val(minValue + " - " + maxValue);
                            } else if (filterType === 'daterange') {
                                let startDate = value.split('-')[0];
                                let endDate = value.split('-')[1];
                                $('.category-content[data-type="' + dataType + '"]').find('.inpStartDate').val(startDate);
                                $('.category-content[data-type="' + dataType + '"]').find('.inpEndDate').val(endDate);
                            }
                        });
                    },
                });
                $('#btnChooseFilter').off('click').on('click', function () {
                    let advFilters = MassMailManage.ExtractAdvanceSelectedFilters();
                    MassMailManage.BindSelectedAdvanceFilters(advFilters);
                    MassMailManage.CheckForAudienceValidity();
                });

                $('#btnAdvanceClose').off('click').on('click', function () {
                    $('#divAdvanceFilter').hide("slide", { direction: "right" }, 500);
                    $('.filter-overlay').remove();
                    $('body').css('overflow', 'auto');
                });

            },
            ExtractAdvanceSelectedFilters: function () {
                let advFilters = [];
                $('#divAdvanceFilter').find('.category-content').each(function () {
                    let $this = $(this);
                    let controlType = $this.attr('control-type');
                    let appName = $this.attr('data-app');
                    let category = $this.attr('data-category');
                    if (controlType === 'checkbox') {
                        var cbValues = $this.find('input.cbSlcFilter:checked').map(function () {
                            return $(this).attr('data-keyword');
                        }).get().join(',');

                        if (cbValues.length > 0) {
                            var val = { type: controlType, appName: appName, category: category, value: cbValues };
                            advFilters.push(val);
                        }
                    } else if (controlType === 'daterange') {
                        let startDate = $.trim($this.find('.inpStartDate').val());
                        let endDate = $.trim($this.find('.inpEndDate').val());
                        if (startDate.length > 0 || endDate.length > 0) {
                            var date = { type: controlType, appName: appName, category: category, value: startDate + '-' + endDate, startDate: startDate, endDate: endDate };
                            advFilters.push(date);
                        }
                    } else if (controlType === 'numrange') {
                        let $slider = $this.find('.slider-range');
                        let maxValue = 0;
                        let minValue = 0;
                        maxValue = $slider.slider("values", 1);
                        minValue = $slider.slider("values", 0);
                        let lowerlimit = $slider.slider("option", "min");
                        let upperlimit = $slider.slider("option", "max");

                        if (maxValue < upperlimit || minValue > lowerlimit) {
                            var range = { type: controlType, appName: appName, category: category, value: minValue + '-' + maxValue, minValue: minValue, maxValue: maxValue };
                            advFilters.push(range);
                        }
                    }
                });

                return advFilters;
            },
            BindSelectedAdvanceFilters: function (advFilters) {
                if (advFilters.length > 0) {
                    let html = '';
                    $.each(advFilters, function (i, v) {
                        let dom = '';
                        let filter = v;
                        let filterType = filter.type;

                        let appName = filter.appName;
                        let category = filter.category;
                        let dataType = appName + '$' + category;
                        dom = `<div class="selectedfilter" control-type='${filterType}' data-app='${appName}' data-category='${category}' data-type='${dataType}'>
                                <label>${appName + ' > ' + category + ' :'}</label>`;

                        if (filterType === 'checkbox') {
                            let cbValue = filter.value.split(',');
                            $.each(cbValue, function (i, v) {

                                v = appName + '$' + category + '$' + v;

                                let text = v.split('$')[2];
                                dom += `<div class="selectedfilterData" filter-type='${filterType}' data-type='${dataType}'>
                                        <span class="filterlabel" data-filter="${v}">${text}</span> 
                                              <i class="fa fa-times cancelfilter"></i>
                                            </div>`;
                            });
                            dom += ' </div>';

                        }

                        else if (filterType === 'numrange') {
                            let maxValue = filter.maxValue;
                            let minValue = filter.minValue;

                            dom += `<div class="selectedfilterData" filter-type='${filterType}' data-type='${dataType}'>
                                        <span class="filterlabel" data-filter="${minValue + '-' + maxValue}">${minValue + '-' + maxValue}</span> 
                                              <i class="fa fa-times cancelfilter"></i>
                                            </div>`;

                            dom += ' </div>';

                        }

                        else if (filterType === 'daterange') {
                            let startDate = filter.startDate;
                            let endDate = filter.endDate;

                            dom += `<div class="selectedfilterData" filter-type='${filterType}' data-type='${dataType}'>
                                        <span class="filterlabel" data-filter="${startDate + '-' + endDate}">${startDate + '-' + endDate}</span> 
                                              <i class="fa fa-times cancelfilter"></i>
                                            </div>`;

                            dom += ' </div>';

                        }

                        html += dom;
                    });
                    $('.advance-list').html(html);

                    $('.filter-overlay').trigger('click');

                    $('.cancelfilter').off('click').on('click', function () {
                        let $this = $(this);
                        SageConfirmDialog('Are you sure you want to delete this?').done(function () {
                            let $filterParent = $this.parent().parent();
                            $this.closest('.selectedfilterData').remove();
                            if ($filterParent.find('.selectedfilterData').length === 0) {
                                $filterParent.remove();
                            }
                            MassMailManage.CheckForAudienceValidity();
                        });
                    });

                }
            },
            getAdvanceFilters: function () {
                var config = {
                    url: MassMailManage.config.url + "GetAdvanceFilters",
                    success: MassMailManage.bindAdvanceFilters
                };
                SecureAjaxCall.Call(config);
            },
            bindAdvanceFilters: function (data) {
                let htmlDOM = '';
                let chkInterestAll = `<div class="checkbox-label">
                            <input type="checkbox" id="cbAll">
                            <label class="chk" for="cbAll">All</label>
                        </div>`;
                if (data.length !== 0) {
                    let appName = '';
                    let len = data.length;
                    for (let i = 0; i < len; i++) {
                        let filter = data[i];
                        let keywords = filter.FilterList;
                        if (filter.AppName !== appName) {
                            if (appName !== '')
                                htmlDOM += '</div>';
                            htmlDOM += `<div class="app sfCol_100"> 
                                         <div class="sfCol_100">
                                         <i class="fa fa-angle-right"></i>
                                         <span> ${filter.AppName}</span></div>`;
                            appName = filter.AppName;
                        }
                        htmlDOM += `<div class="category">
                                               <div class="sfCol_100">
                                               <i class="fa fa-angle-right"></i>
                                               <span> ${filter.CategoryName} </span></div>`;
                        let inputType = filter.InputType;
                        let filterHtml = MassMailManage.GetFilterDom(appName, filter.CategoryName, inputType, keywords);
                        htmlDOM += filterHtml;
                        htmlDOM += `</div>`;
                    }
                    htmlDOM += '</div>';
                    $('.divAdvanceManage').show();
                } else {
                    $('.divAdvanceManage').hide();
                    htmlDOM += `<div class="noData"><h3>NO DATA TO DISPLAY</h3></div>`;
                }
                $('.filterDataList').html(htmlDOM);
                $('.category').off('click').on('click', function (event) {
                    let $this = $(this);
                    event.stopPropagation();
                    if ($this.hasClass('active')) {
                        $this.removeClass('active');
                        $this.find('.category-content').slideUp(400);
                    } else {
                        let siblings = $(this).siblings();
                        $(this).find('.category-content').slideDown(400);
                        siblings.find('.category-content').slideUp(400);
                        if (siblings.hasClass('active')) siblings.removeClass('active');
                        $this.addClass('active');
                    }
                });
                $('.app').off('click').on('click', function () {
                    let $this = $(this);
                    if ($this.hasClass('active')) {
                        if ($this.find('.category').hasClass('active')) $this.find('.category').removeClass('active');
                        $this.find('.category').slideUp(400);
                        $this.find('.category-content').slideUp(400);
                        $this.removeClass('active');
                    } else {
                        $(this).find('.category').slideDown(100);
                        $(this).find('.category').first().trigger('click');
                        let siblings = $(this).siblings();
                        if (siblings.hasClass('active')) siblings.removeClass('active');
                        siblings.find('.category').slideUp(400).prev();
                        if (siblings.find('.category').hasClass('active')) siblings.find('.category').removeClass('active');
                        siblings.find('.category-content').slideUp(400).prev();
                        $this.addClass('active');
                    }
                });

                $('.category-content').off('click').on('click', function (e) {
                    e.stopPropagation();
                });

                $('.filterDataList').find('.inpDateRange').each(function () {
                    let filter = $(this).attr('filter');
                    let filterData = $(this).attr('filter-data');
                    if (filter === "start") {
                        $(this).datetimepicker({
                            dateFormat: "yy-mm-dd",
                            timeFormat: "hh:mm:ss",
                            defaultValue: Date.now(),
                            minDate: new Date(filterData),
                            timepickerScrollbar: false
                        });
                    } else if (filter === "end") {
                        $(this).datetimepicker({
                            dateFormat: "yy-mm-dd",
                            timeFormat: "hh:mm:ss",
                            defaultValue: Date.now(),
                            maxDate: new Date(filterData),
                            timepickerScrollbar: false
                        });
                    }
                });

                $('.filterDataList').find('.inpNumRange').each(function () {
                    let filterData = $(this).attr('filter-data');
                    let values = filterData.split(',');
                    let min = parseFloat(values[0]);
                    let max = parseFloat(values[1]);
                    let $slider = $(this).parent().find('.slider-range');
                    let $amount = $(this).parent().find('.amount');
                    $slider.slider({
                        range: true,
                        min: min,
                        max: max,
                        values: [min, max],
                        slide: function (event, ui) {
                            $amount.val(ui.values[0] + " - " + ui.values[1]);
                        }
                    });
                    $amount.val($slider.slider("values", 0) + " - " + $slider.slider("values", 1));
                });
                $('.filterDataList').find('.app').first().trigger('click');
            },
            GetFilterDom: function (appName, category, inputType, keywords) {
                let html = '';

                switch (inputType.toLowerCase()) {
                    case 'checkbox':
                        html = MassMailManage.GetCheckboxDom(appName, category, keywords);
                        break;
                    case 'daterange':
                        html = MassMailManage.GetDateDom(appName, category, keywords);
                        break;
                    case 'numrange':
                        html = MassMailManage.GetSliderDom(appName, category, keywords);
                        break;
                    default:
                        break;
                }
                return html;
            },
            GetCheckboxDom: function (appName, category, keywords) {
                let html = '';
                html += `<div control-type="checkbox" data-app="${appName}" data-category="${category}" data-type="${appName + '$' + category}" class="sfCol_100 category-content">`;
                for (k = 0; k < keywords.length; k++) {
                    html += `<div class="checkbox-label sfCol_50">
                                <input type="checkbox" data-keyword="${keywords[k]}" filter="${appName + '$' + category + '$' + keywords[k]}" class="cbSlcFilter" id="lg${appName + '$' + category + '$' + keywords[k]}">
                                <label class ="chkLabel" for="lg${appName + '$' + category + '$' + keywords[k]}">${keywords[k]}</label>
                            </div>`;
                }
                html += `</div>`;
                return html;
            },
            GetDateDom: function (appName, category, keywords) {
                let html = '';
                var dates = [];
                html += `<div control-type="daterange" data-app="${appName}" data-category="${category}" data-type="${appName + '$' + category}" class="sfCol_100 category-content">`;
                for (k = 0; k < keywords.length; k++) {
                    dates = keywords[k].split(',');
                    html += `<div class="sfFieldset sfCol_48">
                               <div class="formKey">
                                   <label class="sfFormlabel">From</label>
                                 </div>
                                <div class="formValue ">                                                                
                                  <input type="text" filter='start' filtertype='daterange' filter-data='${dates[0]}' class="filter_field input inpDateRange inpStartDate" id="txt${appName + '$' + category.replace(' ', '_')}from">
                                </div>
                            </div>
                            <div class="sfFieldset sfCol_48" style="float:right;">
                                <div class="formKey">
                                   <label class="sfFormlabel">To</label>
                                 </div>
                                <div class="formValue">                                
                                   <input type="text" filter='end' filtertype='daterange' filter-data='${dates[1]}' class="filter_field input inpDateRange inpEndDate" id="txt${appName + '$' + category.replace(' ', '_')}to">
                                </div> 
                            </div>`;
                }
                html += `</div>`;
                return html;
            },
            GetSliderDom: function (appName, category, keywords) {
                let html = '';
                html += `<div control-type="numrange" data-app="${appName}" data-category="${category}" data-type="${appName + '$' + category}" class="sfCol_100 category-content">`;
                for (k = 0; k < keywords.length; k++) {
                    html += `<div class="checkbox-label sfCol_90">                                
                                <input type="text" filtertype='numrange' filter-data='${keywords}' class="input inpNumRange" style='display:none;'>
                                <div class="slider-range"></div>
                                <div class="sfFieldset">
                                <div class="formValue">
                                <input type="text" class="amount" readonly>
                                </div>
                                </div>

                            </div>
                            `;
                }
                html += `</div>`;

                return html;
            },
            GetFilterValue: function () {
                var config = {
                    url: MassMailManage.config.url + "GetFilterValue",
                    success: MassMailManage.BindFilterValue
                };
                MassMailManage.ajaxCall(config, false);
            },
            BindFilterValue: function (data) {
                var prevType = "";
                var filterValues = "";
                if (data.length > 0) {
                    $.each(data, function (i, v) {
                        if (prevType != v.Type) {
                            if (prevType !== "")
                                filterValues += "</div>";
                            filterValues += "<div class='sfFieldset'><div class='formkey Mb-10'><span class='grp-title'>";
                            filterValues += v.Type;
                            filterValues += "</span></div>";
                            filterValues += "<div class='rcpt-subgrp formvalue Mb-20'>";
                        }
                        var ID = "chkRecipient" + v.TypeID;
                        filterValues += "<div class='checkbox-label sfCheckbox'>";
                        filterValues += "<input class='chkMailRcpt";
                        filterValues += v.Category;
                        filterValues += "'id ='";
                        filterValues += ID;
                        filterValues += "' type='checkbox' value='";
                        filterValues += v.TypeID;
                        filterValues += "'>";
                        filterValues += "<label for='";
                        filterValues += ID;
                        filterValues += "'>";
                        filterValues += v.TypeName;
                        filterValues += "</label>";
                        filterValues += "</div>";
                        prevType = v.Type;
                    });
                    filterValues += "</div></div>";
                }
                $("#divFilterValue").html(filterValues);
            }
        };
        $validator = $("#divMailManage").validate({
            rules: {
                subject: {
                    required: true
                },
                body: {
                    required: true
                },
                scheduleOn: {
                    required: true
                },
                targetAudience: {
                    required: true
                },
                mandrillApiKey: {
                    required: true
                }
            },
            messages: {
                subject: {
                    required: "*Required Field"
                },
                body: {
                    required: "*Required Field"
                },
                scheduleOn: {
                    required: "*Required Field"
                },
                mandrillApiKey: {
                    required: "*Required Field"
                },
                targetAudience: {
                    required: "*Please select at least one recipient group"
                }
            },
            errorPlacement: function (error, element) {
                $(error).insertAfter($(`[name='${element.attr("name")}']`).last().parent());
            },
            ignore: ':hidden, :disabled',
        });
        jQuery.validator.addMethod('selectcheck', function (value) {
            return (value != '0');
        }, "*");
        var manageSettings = {
            config: MassMailManage.config,
            key: {
                MandrilAPI: 'MandrilAPIKey',
                Gateway: 'EMailGateWay',
            },
            init: function () {
                this.eventListner();
            },
            eventListner: function () {
                $('#divMailGtWayStng').SideBarPanel({
                    title: 'Email Settings ',
                    openButton: '#btnOpenMailStng',
                    closeButton: '#btnCloseSidePnl',
                    ready: function () {
                        manageSettings.getAllSettings();
                    },
                });
                $('#btnSaveEsettings').off('click').on('click', function () {
                    let val = $('.rdoEmailGateway:checked').val();
                    if (val == 'contentder') {
                        manageSettings.addUpdateSettings();
                    } else {
                        if ($("#txtMandrilAPIKey").val().trim() !== "") {
                            manageSettings.addUpdateSettings();
                        } else {
                            $("#txtMandrilAPIKey").next(".sfError").removeClass("d-none");
                        }
                    }
                });
                $("#txtMandrilAPIKey").off("input").on("input", function () {
                    $(this).next(".sfError").addClass("d-none");
                });
                $('.rdoEmailGateway').off('change').on('change', function () {
                    let val = $('.rdoEmailGateway:checked').val();
                    if (val == 'contentder') {
                        $('#divMandrilSettings').hide();
                    } else {
                        $('#divMandrilSettings').show();
                    }
                });
            },
            getAllSettings: function () {
                var config = {
                    url: MassMailManage.config.url + "GetAllSettings",
                    success: function (data) {
                        manageSettings.bindSettings(data);
                    }
                };
                SecureAjaxCall.Call(config);
            },
            bindSettings: function (data) {
                let Keys = manageSettings.key;
                if (data != null) {
                    $.each(data, function (i, v) {
                        if (v.SettingKey == Keys.MandrilAPI) {
                            $('#txtMandrilAPIKey').val(v.SettingValue);
                        } else if (v.SettingKey == Keys.Gateway) {
                            $('.rdoEmailGateway').prop('checked', false);
                            $('.rdoEmailGateway[value="' + v.SettingValue + '"]').prop('checked', true);
                            if (v.SettingValue == 'mandrill')
                                $('#divMandrilSettings').show();
                            else
                                $('#divMandrilSettings').hide();
                        }
                    });
                }
            },
            addUpdateSettings: function () {
                let Keys = this.key;
                let stngList = [];
                let gateway = $('.rdoEmailGateway:checked').val();
                let MandrilKey = $.trim($('#txtMandrilAPIKey').val());
                if (MandrilKey !== '') {
                    MandrilKey += Math.random().toFixed(2) * 100;
                }
                stngList.push({ Key: Keys.MandrilAPI, Value: MandrilKey });
                stngList.push({ Key: Keys.Gateway, Value: gateway });
                var config = {
                    data: { settings: stngList },
                    url: MassMailManage.config.url + "AddUpdateSettings",
                    success: function (data) {
                        ActionMessage("Email Settings Saved Successfully.", MessageType.Success)
                        $('#btnMlStngClose').trigger('click');
                    }
                };
                SecureAjaxCall.Call(config);
            }
        };
        MassMailManage.init();
        manageSettings.init();
    };
    $.fn.MassMailManage = function (p) {
        $.MassMailManage(p);
    };
})(jQuery);


function split(val) {
    return val.split(/,\s*/);
}
function extractLast(term) {
    return split(term).pop();
}
function removeArrayItem(arr, what) {
    var found = arr.indexOf(what);

    while (found !== -1) {
        arr.splice(found, 1);
        found = arr.indexOf(what);
    }
}

removeDuplicatesFromObjArray = function (arr, field) {
    var u = [];
    arr.reduce(function (a, b) {
        if (a[field] !== b[field]) u.push(b);
        return b;
    }, []);
    return u;
};