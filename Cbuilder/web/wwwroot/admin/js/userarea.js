(function ($) {
    $.createUserArea = function (p) {
        p = $.extend
            ({
                LocalLabel: {}
            }, p);


        var UserArea = {
            config: {
                baseURL: "/Dashboard/Assets/",
                areaID: 0,
                StatusID: p.StatusID,
                footerButtons: `<button type="button" id="btnSaveUserArea" class="btn primary">Save</button>
                                <button type="button" id="btnCancelUserArea" class="btn danger">Cancel</button>`,
                dialogMarkup: `<div class="sfFormwrapper">
                                    <div class="sfFieldset">
                                        <div class="formkey">
                                            <span class="sfFormLabel">Area</span>
                                        </div>
                                        <div class="formvalue">
                                            <input type="text" id="txtAreaName" class="sfFormcontrol" />
                                            <span class="color-danger" id="errAreaName" style="display:none"></span>
                                        </div>
                                    </div>
                                </div>`
            },
            LocalLabel: p.LocalLabel,
            BindAreaClickEvents: function () {
                $("#btnAddUserArea").off().on('click', function () {
                    UserArea.config.areaID = 0;

                    CustomModel({
                        heading: "Add Area",
                        body: UserArea.config.dialogMarkup,
                        footer: UserArea.config.footerButtons,
                        sizeClass: 'modal-dialog-centered modal-md',
                        advClass: '',
                        onOpen: function ($wrapper) {
                            UserArea.BindModalEvents();
                        },
                        onClose: function ($wrapper) {

                        }
                    });
                });

                $(".btnEditArea").on('click', function () {
                    var areaName = $(this).attr('data-area');
                    var areaID = $(this).attr('data-id');
                    UserArea.config.areaID = parseInt(areaID);

                    CustomModel({
                        heading: "Edit Area",
                        body: UserArea.config.dialogMarkup,
                        footer: UserArea.config.footerButtons,
                        sizeClass: 'modal-dialog-centered modal-md',
                        advClass: '',
                        onOpen: function ($wrapper) {
                            $("#txtAreaName").val(areaName);
                            UserArea.BindModalEvents();
                        },
                        onClose: function ($wrapper) {

                        }
                    });

                });

                $(".btnDeleteArea").on('click', function () {
                    var areaID = parseInt($(this).attr('data-id'));

                    //var isConfirm = ConfirmBox('Deleting this area will also remove all the assets associated with it. Are you sure?');
                    //if (isConfirm != false)

                        SageConfirmDialog("Are you sure?", "Delete Confirmation", function () {
                            console.log("Close");
                        }).done(function () {
                            UserArea.DeleteUserArea(areaID);
                        });
                       

                });


            },

            BindModalEvents: function () {
                $("#btnSaveUserArea").off('click').on('click', function () {
                    UserArea.SaveUserArea();
                });

                $("#btnCancelUserArea").off('click').on('click', function () {
                    $("#btnCloseModel").click();
                });

                $("#txtAreaName").off('keypress').on('keypress', function () {
                    $("#errAreaName").text("").hide();
                });

            },
            GetAreas: function () {
                $.ajax({
                    url: this.config.baseURL+'GetAreaList',
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    datatype: "json",
                    async: true,
                    success: function (result) {
                        UserArea.BindAreaList(result);
                    },
                    error: function (jqXHR) {

                    },
                    complete: function (jqXHR, status) {

                    }


                });
            },
            BindAreaList: function (lstArea) {

                var lstHTML = "";
                var area, id;

                
                $.each(lstArea, function (index, item) {
                    area = item.UserArea;
                    id = item.UserAreaID;
                    lstHTML += `<div class="dg-col-wp">
                                    <div class="sfCol-9">
                                        <div class="dg-group">
                                            <span class="ds-grd-tit">${area}</span>
                                        </div>
                                    </div>
                                    <div class="sfCol-3 f-center">
                                                <div class="dg-group-inline">
                                                    <div class="action-menu">
                                                        <div class="action-icon">
                                                            <i class="fa fa-ellipsis-h"></i>
                                                        </div>
                                                        <ul class="action-open">
                                                            <li>
                                                                <button type="button" data-area="${area}" data-id="${id}" class="btnEditArea links" title="${UserArea.LocalLabel.Edit}"><i class="fa fa-pencil"></i>${UserArea.LocalLabel.Edit}</button>
                                                                 
                                                            </li>
                                                            <li>
                                                                <button type="button" data-id="${id}" class="btnDeleteArea   links" title="${UserArea.LocalLabel.Delete}"><i class="fa fa-trash"></i>${UserArea.LocalLabel.Delete}</button>
                                                               
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                       
                                       
                                    </div>
                                </div>`

                });

                $("#divAreaList").html(lstHTML);
                gridHelper.bindEvent();
                UserArea.BindAreaClickEvents();


            },
            SaveUserArea: function () {
                var userAreaID = UserArea.config.areaID,
                    areaName = $.trim($("#txtAreaName").val());

                if (areaName.length == 0) {
                    $("#errAreaName").text("Enter area").show();
                }
                else {

                    var objUserArea = {
                        UserAreaID: userAreaID,
                        UserArea: areaName
                    };

                    $.ajax({
                        url: this.config.baseURL+'SaveUserArea',
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        datatype: "json",
                        traditional: true,
                        async: true,
                        data: JSON.stringify(objUserArea),
                        success: function (result) {
                            if (result >= 0) {
                                $('#divCustomModel').remove();
                                UserArea.config.areaID = 0;
                                UserArea.GetAreas();
                            }
                            else if (result == -1) {
                                $("#errAreaName").text("Area already exists").show();
                            }

                        },
                        error: function (jqXHR) {

                        },
                        complete: function (jqXHR, status) {

                        }


                    });
                }
            },
            DeleteUserArea: function (areaID) {

                
                $.ajax({
                    url: this.config.baseURL+'DeleteUserArea?AreaID=' + areaID,
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    datatype: "JSON",
                    async: true,
                    success: function (result) {
                        UserArea.GetAreas();
                    },
                    error: function (jqXHR) {

                    },
                    complete: function (jqXHR, status) {

                    }


                });
            },

            init: function () {
                UserArea.BindAreaClickEvents();
                UserArea.GetAreas();
            }
        };
        UserArea.init();
    };
    $.fn.UserArea = function (p) {
        $.createUserArea(p);
    };
})(jQuery);