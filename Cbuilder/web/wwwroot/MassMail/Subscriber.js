$(function () {
    var validator;
    var Subscriber = {
        config: {
            url: "/Dashboard/Subscriber/",
            limit: 10,
            current: 0
        },
        Init: function () {
            this.GetAllSubscriber(0, this.config.limit, this.config.current);
            this.GetAllGroups();
            this.Event();
        },
        Event: function () {
            let $this = this;
            $("#btnAdd").off("click").on("click", function () {
                $("#grid").hide();
                $("#addForm").show();
                $this.GetInterest();
            });
            $('#divSideBarPanelDemo').SideBarPanel({
                title: 'Group Management',
                openButton: '#btnOpenPanel',
                closeButton: '#btnCloseSidePnl',
                ready: function () {

                },
            });
            $("#btnSaveSubscriber").off("click").on("click", function () {
                if (validator.form()) {
                    $this.AddUpdate();
                }
            });
            $("#importExcel").off('click').on('click', function () {
                CustomModel({
                    heading: "Import Excel",
                    body: `<div class="sfRow" >
                <div class="sfCol-12 sfCol-sm-6">
                     <div class="card none">
                        <div class="card-body t-center">
                            <div class="import-excel xls">
                            </div>
                            <h4 class="fw-400 Mb-15 ">Get Started</h4>
                            <p class="fw-400 gray-400">Download a sampl's content.</p>
                            <div class="sfButtonwrapper">
                                <button class="btn primary-outline round"><i class="fa fa-download Mr-10"></i>View</button>
                            </div>
                         </div>
                     </div>
                </div>
                   <div class="sfCol-12 sfCol-sm-6">
                     <div class="card none">
                        <div class="card-body t-center">
                            <div class="import-excel upload">
                                
                            </div>
                            <h4 class="fw-400 Mb-15">Upload a file</h4>
                            <p class="fw-400 gray-400">Download a sample's content.</p>
                            <div class="sfButtonwrapper ">
                                <button class="btn success round"><i class="fa fa-file-archive-o Mr-10"></i>Choose file</button>
                                <button class="btn success-outline round">Next</button>
                            </div>
                         </div>
                     </div>
                </div>
            </div>`,
                    footer: '<button type="button" class="btn primary">ok</button>',
                    showheading: true,
                    sizeClass: 'modal-dialog-centered modal-lg primary import-modal',
                    advClass: '',
                    onOpen: function ($wrap) {

                    },
                    onClose: function ($wrap) {

                    }
                });
            });
            $("#addNewGroup").off("click").on("click", function () {
                let html = `<li class="sfFieldset sfRow">
                                <div class="formvalue formvalue Mt-0 f-fill Pr-0">
                                    <input type="text" data-id="0" aria-invalid="false" class="inpGroup valid sfFormcontrol">
                                </div>
                                <div class="sfButtonwrapper Mt-0  f-a-s-stretch Pl-0">
                                    <button class="btn danger" type="button" data-id="">
                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </li>`;
                if ($("#ulGroupList").find("li").length > 0) {
                    $(html).insertAfter($("#ulGroupList").find("li").last());
                } else {
                    $("#ulGroupList").html(html);
                }
                addUpdateEvent();
            });
            $('#cbAllGroup').off('change').on('change', function () {
                if ($('#cbAllGroup').prop('checked')) {
                    $('.cbSlcGroup').prop('checked', true);
                    $('#txtVdGroup').val('selected');
                }
                else {
                    $('.cbSlcGroup').prop('checked', false);
                    $('#txtVdGroup').val('');
                }
            });
            function addUpdateEvent() {
                $('input.inpGroup').off('change').on('change', function () {
                    Subscriber.AddUpdateGroup($(this));
                });
                $('input.inpGroup').off('keydown').on('keydown', function (e) {
                    if (e.which == 13) {
                        Subscriber.AddUpdateGroup($(this));
                    }
                });
            }
            addUpdateEvent();
            $('#deleteChkd').off('click').on('click', function () {
                var subscriberIDs = $("input.chkGrdItem:checked").map(function () {
                    return $(this).val();
                }).get().join(',');
                if (subscriberIDs !== "") {
                    SageConfirmDialog("Are you sure you want to delete selected Imported Users?", function () { }).done(function () {
                        Subscriber.DeleteMultImportUser(subscriberIDs);
                    })
                }
            });

            $('#fltrSubType').off('change').on('change', function () {
                let $this = $(this);
                if ($this.val() != 2)
                    $('#fltrSubStatus').removeClass("d-none");
                else
                    $('#fltrSubStatus').addClass("d-none");
                $this.attr('IsImport', $this.val());
                Subscriber.GetAllSubscriber(0, Subscriber.config.limit, 0);
            });
            $('#fltrSubStatus').off('change').on('change', function () {
                let $this = $(this);
                $this.attr('IsSubscribed', $this.val());
                Subscriber.GetAllSubscriber(0, Subscriber.config.limit, 0);
            });
        },
        GetAllSubscriber: function (offset, limit, current) {
            Subscriber.config.current = current;
            var param = {
                Keyword: $("#keywords").val(),
                Offset: Subscriber.config.limit * Subscriber.config.current,
                Limit: Subscriber.config.limit,
                IsImported: $('#fltrSubType').val(),
                IsSubscribed: $('#fltrSubStatus').val()
            }
            var config = {
                data: param,
                url: Subscriber.config.url + "GetAllSubscriber",
                async: false,
                success: function (data) {
                    Subscriber.BindSubscriber(data);
                }
            };
            SecureAjaxCall.Call(config);
        },
        BindSubscriber: function (data) {
            let $this = this;
            var html = "";
            let total = 0;
            if (data !== null && data.length > 0) {
                $.each(data, function (i, v) {
                    html += `
                <div class="dg-col-wp">
                    <div class="sfCol-12 sfCol-sm-6 ">
                        <div class="dg-group-inline checkbox">
                            <div class="sfCheckbox">
                                <input class="chkGrdItem" type="checkbox" id="chk${v.SubscriberID}" value="${v.SubscriberID}">
                                <label for="chk${v.SubscriberID}" class="onlylabel"></label>
                            </div>
                        </div>
                        <div class="dg-group-inline">
                            <div class="dg-group">
                                <div class="dg-title">${v.FirstName} ${v.LastName}</div>
                            </div>
                            <div class="dg-group">
                                <div class="dg-group-inline">
                                    <span class="grd-key">Location: </span>
                                    <span class="grd-value">${v.Location}</span>
                                </div>
                                <div class="dg-group-inline">
                                    <span class="grd-key">Gender: </span>
                                    <span class="grd-value">${v.UserSex}</span>
                                </div>
                            </div>
                            <div class="dg-group">
                                <div class="dg-group-inline">
                                    <span class="grd-key">Profession: </span>
                                    <span class="grd-value">${Subscriber.CheckExists(v.Profession, "Profession")}</span >
                                </div>
                                <div class="dg-group-inline">
                                    <span class="grd-key">Company: </span>
                                    <span class="grd-value">${Subscriber.CheckExists(v.CompanyName, "Profession")}</span>
                                </div>
                            </div>
                            <div class="dg-group">
                                <div class="dg-group-inline">
                                    <span class="grd-key">Phone No.: </span>
                                    <span class="grd-value">${Subscriber.CheckExists(v.PhoneNumber, "Profession")}</span >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sfCol-12 sfCol-sm-3 sm-f-center Pl-45 sm-Pl-0">
                        <div class="dg-group-inline">
                            <div class="dg-group">
                                <span class="grd-value">
                                    ${v.SubscriberEmail}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="sfCol-12 sfCol-sm-3 sm-f-center Mt-20 sm-Mt-0 Pl-45 sm-Pl-0">
                        <div class="ds-group-inline">
                            <div class="action-menu">
                                <div class="action-icon">
                                    <i class="fa fa-ellipsis-h"></i>
                                </div>
                                <ul class="action-open">
                                    <li><a class="links" href="Javascript:void(0);" data-customMailId="${v.SubscriberID}" data-action="edit"><i class="fa fa-edit"></i>Edit</a></li>
                                    <li><a class="links" href="href="Javascript:void(0);" data-customMailId="${v.SubscriberID}" data-action="delete"><i class="fa fa-trash"></i>Delete</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>`;
                });
                total = data[0].TotalRow;
                $this.BindPagination(total);
            } else {
                html = `<div class="dg-col-nodata">
                    <h5>No Data To Display.</h5>
                </div>`;
            }
            $('#divGridBody').html(html);
            gridHelper.bindEvent({
                onMenuClick: function ($ele) {

                }
            });
        },
        CheckExists: function (value, type) {
            if (value === null || value === '' || value === ' ') {
                return type + "Not Available";
            }
            return value;
        },
        BindPagination: function (RowTotal) {
            if (RowTotal >= Subscriber.config.current * Subscriber.config.limit) {
                $('#divPagination').show().pagination(RowTotal, {
                    items_per_page: Subscriber.config.limit,
                    current_page: Subscriber.config.current,
                    num_edge_entries: 2,
                    callfunction: true,
                    function_name: {
                        name: Subscriber.GetAllMenu,
                        limit: Subscriber.config.limit,
                    },
                    prev_text: ' ',
                    next_text: ' '
                });
            } else {
                $('#menuPagi').hide();
            }
        },
        GetAllGroups: function () {
            var config = {
                url: Subscriber.config.url + "GetAllGroups",
                success: function (data) {
                    Subscriber.BindGroups(data);
                }
            };
            SecureAjaxCall.Call(config);
        },
        BindGroups: function (data) {
            if (data !== null && data.length > 0) {
                let filterhtml = "";
                let SubFormHtml = `<div class="checkbox-label ">
                            <input type="checkbox" id="cbAllGroup">
                            <label class="chk" for="cbAllGroup">All</label>
                        </div>`;
                let groupForm = "";
                $.each(data, function (i, v) {
                    filterhtml += `<li class=" group-item group-item-link-bg">
                            <div class="sfCheckbox">
                                <input type="checkbox" id="cb${v.GroupID}" value="${v.Name}">
                                <label for="cb${v.GroupID}">${v.Name}</label>
                            </div>
                        </li>`;
                    SubFormHtml += `<div class="checkbox-label">
                                    <input type="checkbox" class="cbSlcGroup" data-id="${v.GroupID}" id="cbGrp${v.GroupID}" value="${v.Name}">
                                    <label class="chk" for="cbGrp${v.GroupID}">${v.Name}</label>
                                </div>`;
                    groupForm += `<li class="sfFieldset sfRow">
                                <div class="formvalue Mt-0 f-fill Pr-0">
                                    <input type="text" value="${v.Name}" data-id="${v.GroupID}" aria-invalid="false" class="inpGroup valid sfFormcontrol">
                                </div>
                                <div class="sfButtonwrapper Mt-0  f-a-s-stretch Pl-0">
                                    <button class="btn danger" type="button" data-id="${v.GroupID}">
                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </li>`;
                });
                $("#subsGroup").html(filterhtml);
                $(".chkGroupList").html(SubFormHtml);
                $("#ulGroupList").html(groupForm);
            }
        },
        GetInterest: function () {
            var config = {
                url: Subscriber.config.url + "GetUserInterest",
                success: function (data) {
                    Subscriber.BindInterest(data);
                }
            };
            SecureAjaxCall.Call(config);
        },
        BindInterest: function (data) {
            let html = '';
            let chkInterestAll = `<div class="checkbox-label">
                                    <input type="checkbox" id="cbAll">
                                    <label class="chk" for="cbAll">All</label>
                                 </div>`;
            if (data.length !== 0) {
                $.each(data, function (i, v) {
                    html += `<div class="checkbox-label">
                                <input type="checkbox" interest="${v}" class ="cbSlcInterests">
                                <label class ="chkLabel" for="cbSlcInterests">${v}</label>
                            </div>`;
                });
                $('.interestGroup').show();
            } else {
                $('.interestGroup').hide();
            }
            $('.chkInterestsList').html(html).prepend(chkInterestAll);
            $('.cbSlcInterests').each(function () {
                let $this = $(this);
                $this.attr({
                    'id': $this.attr('interest')
                });
            });
            $('.chkLabel').each(function () {
                let $this = $(this);
                $this.attr({
                    'for': $this.prev('.cbSlcInterests').attr('interest')
                });
            });
        },
        AddUpdate: function () {
            var objUser = {
                SubscriberID: $('#hdnSubscriberID').val(),
                SubscriberEmail: $('#txtEmail').val(),
                FirstName: $('#txtFName').val(),
                LastName: $('#txtLName').val(),
                Interest: SelectedInterest(),
                Location: $('#txtLocation').val(),
                InterestInAll: CheckInterest(),
                Gender: CheckGender(),
                PhoneNumber: $("#txtPhoneNumber").val(),
                Profession: $("#txtProfession").val(),
                CompanyName: $("#txtCompany").val(),
                RecipientGroup: SelectedGroup(),
                ClientIP: null,
                AddedBy: SageFrameUserName,
            };
            function CheckInterest() {
                if ($('#cbAll').prop('checked')) {
                    return true;
                }
                else
                    return false;
            }
            function SelectedInterest() {
                let interests = '';
                if (!$('#cbAll').prop('checked')) {
                    $('.cbSlcInterests').each(function () {
                        let $this = $(this);
                        if ($this.prop('checked')) {
                            if (interests !== '') {
                                interests = $this.attr('interest') + ',' + interests;
                            } else {
                                interests = $this.attr('interest');
                            }
                        }
                    });
                }
                return interests;
            }
            function SelectedGroup() {
                let groups = '';
                $('.cbSlcGroup').each(function () {
                    let $this = $(this);
                    if ($this.prop('checked')) {
                        if (groups !== '') {
                            groups = $this.attr('data-id') + ',' + groups;
                        } else {
                            groups = $this.attr('data-id');
                        }
                    }
                });
                return groups;
            }
            function CheckGender() {
                if ($('#rbMale').prop('checked'))
                    return "Male";
                else if ($('#rbFemale').prop('checked'))
                    return "Female";
                else
                    return "Others";
            }
            var config = {
                data: objUser,
                url: Subscriber.config.url + "AddUpdateSubscribeUser",
                success: function (data) {
                    console.log(data);
                }
            };
            SecureAjaxCall.Call(config);
        },
        AddUpdateGroup: function ($elem) {
            var config = {
                data: { GroupID: $elem.attr("data-id"), Name: $.trim($elem.val()) },
                url: Subscriber.config.url + "AddUpdateGroup",
                success: function (data) {
                    console.log(data);
                }
            };
            SecureAjaxCall.Call(config);
        },
        DeleteMultImportUser(subscriberIDs) {
            var config = {
                data: { subscriberIDs: subscriberIDs },
                url: Subscriber.config.url + "DeleteMultImportedUser",
                async: false,
                success: function (data) {
                    if (data > 0) {
                        Subscriber.GetAllSubscriber(0, Subscriber.config.limit, 0);
                        $(".chkAllGrdItem").prop('checked', false);
                    }
                }
            };
            SecureAjaxCall.Call(config);
        },
    };
    validator = $("#addSubForm").validate({
        ignore: ":hidden",
        rules: {
            email: {
                required: true,
                email: true
            },
            firstname: {
                required: true
            },
            lastname: {
                required: true,
            },
            interest: {
                required: true,
            },
            location: {
                required: true
            },
            vdInterest: {
                required: true
            },
            vdGroup: {
                required: true
            }
        },
        messages: {
            email: {
                required: "* Required",
            },
            firstname: {
                required: "* Required"
            },
            lastname: {
                required: "* Required",
            },
            interest: {
                required: "* Required",
            },
            location: {
                required: "* Required"
            },
            vdInterest: {
                required: "*Select Interest.*"
            },
            vdGroup: {
                required: "*Select Group*"
            }
        }
    });
    Subscriber.Init();
});