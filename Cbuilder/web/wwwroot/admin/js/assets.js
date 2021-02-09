(function ($) {
    $.createAssetMgmt = function (p) {
        p = $.extend
            ({
                LocalLabel: {}
            }, p);


        var AssetMgmt = {
            config: {
                baseURL: "/Dashboard/Assets/",
                areaID: 0,
                lstLocalJSFiles: [],
                lstLocalCSSFiles: []
            },
            LocalLabel: p.LocalLabel,
            GetAreaWiseAssets: function () {

                var applicationID = $("#ddlApplicationName").val();
                //assetType = $("#ddlFilterAssetType").val(),
                //excessMode = $("#ddlFilterExcessMode").val();


                var arrAssetTypes = [];
                $("#assetTypeList").find('input[name="chkAssetType"]:checked').each(function () {
                    arrAssetTypes.push($(this).val());
                });


                var arrExcessModes = [];
                $("#assetModeList").find('input[name="chkAssetMode"]:checked').each(function () {
                    arrExcessModes.push($(this).val());
                });


                var assetTypes = arrAssetTypes.join(",");
                var excessModes = arrExcessModes.join(",");


                $.ajax({
                    url: this.config.baseURL + `GetAreaWiseAssets?applicationID=${applicationID}&assetType=${assetTypes}&excessMode=${excessModes}`,
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    datatype: "json",
                    async: true,
                    success: function (result) {
                        AssetMgmt.BindAreaWiseAccordion(result);
                    },
                    error: function (jqXHR) {

                    },
                    complete: function (jqXHR, status) {

                    }


                });
            },
            GetAssetsByAreaID: function (areaID) {

                var applicationID = $("#ddlApplicationName").val();
                //assetType = $("#ddlFilterAssetType").val(),
                //excessMode = $("#ddlFilterExcessMode").val();

                var arrAssetTypes = [];
                $("#assetTypeList").find('input[name="chkAssetType"]:checked').each(function () {
                    arrAssetTypes.push($(this).val());
                });


                var arrExcessModes = [];
                $("#assetModeList").find('input[name="chkAssetMode"]:checked').each(function () {
                    arrExcessModes.push($(this).val());
                });


                var assetTypes = arrAssetTypes.join(",");
                var excessModes = arrExcessModes.join(",");


                $.ajax({
                    url: this.config.baseURL + `GetAssetSettingsByArea?applicationID=${applicationID}&areaID=${areaID}&assetType=${assetTypes}&excessMode=${excessModes}`,
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    datatype: "json",
                    async: true,
                    success: function (result) {
                        var lstAssets = result;

                        var assetsHTML = AssetMgmt.BindAssetList(lstAssets);
                        var selector = `#divAssetGrid_${areaID}`;
                        $(selector).html(assetsHTML);
                        gridHelper.bindEvent();
                        AssetMgmt.BindButtonEvents();
                        AssetMgmt.InitializeOrder();
                    },
                    error: function (jqXHR) {

                    },
                    complete: function (jqXHR, status) {

                    }


                });
            },
            BindAreaWiseAccordion: function (lstResult) {

                var lstHTML = "";
                var lstAssets;
                var active = "";
                var show = "";

                lstHTML += "<div class='card'>";
                $.each(lstResult, function (index, item) {
                    lstAssets = item.Assets;

                    active = "";
                    show = "";
                    if (index == 0) {
                        active = "active";
                        show = "show";
                    }

                    lstHTML += `<div class="divAreaAssets card-header ${active}" data-area="${item.UserAreaID}">
                                        <h5>
                                            ${item.UserArea}<i class="fa fa-chevron-up"></i>
                                        </h5>
                                    </div>
                                    <div class="collapse ${show}">
                                        <div class="card-body">
                                            <div class="add-asset Mb-20 ">
                                                <button type="button" data-areaid="${item.UserAreaID}" class="btnAddAsset btn primary-outline round ">
                                                 ${AssetMgmt.LocalLabel.AddNew}
                                                </button>
                                            </div>
                                            <div id="divAssetGrid_${item.UserAreaID}" class="divAssetGrid" data-area="${item.UserAreaID}">
                                                ${AssetMgmt.BindAssetList(lstAssets)}
                                            </div>
                                        </div>
                                    </div>`;

                });
                lstHTML += "</div>";

                $("#divAssetsAccordion").html(lstHTML);
                gridHelper.bindEvent();
                UIComponent.accordion();
                AssetMgmt.InitializeOrder();
                AssetMgmt.BindButtonEvents();

            },
            BindAssetList: function (lstAssets) {
                var assetHTML = '';


                assetHTML += `<div class="sfDatagrid-title d-none md-d-block">
                                <div class="dg-col-wp">
                                    <div class="sfCol-12 sfCol-md-8">Name</div>
                                    
                                    <div class="sfCol-12 sfCol-md-2">${AssetMgmt.LocalLabel.AssetType}</div>
                                   
                                    <div class="sfCol-12 sfCol-md-2 f-center">${AssetMgmt.LocalLabel.Action}</div>
                                </div>
                              </div>`;

                assetHTML += '<div class="sfDatagrid-body divAssetSortList" >';


                if (lstAssets.length > 0) {

                    var clsExcessMode,roles;

                    $.each(lstAssets, function (index, item) {

                        clsExcessMode = AssetMgmt.GetExcessModeClass(item.ExcessMode);
                        roles = item.Roles == "" ? "All" : item.Roles;

                        assetHTML += `<div class="dg-col-wp divSortAsset" data-assetid="${item.BundleID}">
                                            <div class="sfCol-12 sfCol-md-8 d-block">
                                                <div class="dg-group">
                                                    <div class="dg-title">${item.Names}</div>
                                                </div>
                                                <div class="dg-group">
                                                    <div class="dg-group-inline">
                                                        <span class="grd-key">  ${AssetMgmt.LocalLabel.AssetType}: </span>
                                                        <span class="grd-value">${item.AssetType}</span>
                                                    </div> 
                                                </div>
                                                <div class="dg-group">
                                                    <div class="dg-group-inline flex">
                                                        <span class="grd-key">  ${AssetMgmt.LocalLabel.Path}: </span>
                                                        <span class="grd-value t-truncate">${item.FilePath}</span>
                                                    </div> 
                                                </div>
                                                <div class="dg-group">
                                                    <div class="dg-group-inline flex">
                                                        <span class="grd-key">  ${AssetMgmt.LocalLabel.Role}: </span>
                                                        <span class="grd-value t-truncate">${roles}</span>
                                                    </div> 
                                                </div>
                                            </div>
                                            
                                             <div class="sfCol-12 sfCol-md-2">
                                                <div class="dg-group">
                                                    <span class="${clsExcessMode} pills rounded">${item.ExcessMode}</span>
                                                </div>
                                            </div>
                                           
                                            <div class="sfCol-12 sfCol-md-2 t-left md-f-center divAssetButtons">
                                                <div class="dg-group-inline">
                                                    <div class="action-menu">
                                                        <div class="action-icon">
                                                            <i class="fa fa-ellipsis-h"></i>
                                                        </div>
                                                        <ul class="action-open">
                                                            <li>
                                                                <button type="button" title="Edit" class="links btnEditAsset"><i class="fa fa-pencil"></i>${AssetMgmt.LocalLabel.Edit}</button>
                                                            </li>
                                                            <li>
                                                                <button type="button" title="Delete" class="links btnDeleteAsset"><i class="fa fa-trash"></i>${AssetMgmt.LocalLabel.Delete}</button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                      </div>`;
                    });
                }
                else {
                    assetHTML += `<div class="dg-col-wp divNoAssets">
                                    <div class="sfCol-12">
                                     <div class="dg-group">
                                        There are no assets in this area. You can either add assets or clone from exisitng application.                                    
                                        <div class="sfButtonwrapper">
                                            <button type="button" class="btnCloneAssets btn success round">Clone</button>
                                        </div>
                                      </div>
                                    </div>
                                 </div>`
                }

                assetHTML += '</div>'

                return assetHTML;

            },
            GetExcessModeClass: function (excessMode) {
                excessMode = excessMode.toLowerCase();

                var clsExcessMode = '';

                switch (excessMode) {
                    case 'live':
                        clsExcessMode = "pills-success";
                        break;

                    case 'local':
                        clsExcessMode = "pills-secondary"
                        break;

                    case 'both':
                        clsExcessMode = "pills-primary";
                        break;

                    default:
                        clsExcessMode = "";

                }


                return clsExcessMode;

            },
            InitializeOrder: function () {
                $(".divAssetSortList").sortable({
                    placeholder: "ui-state-highlight",
                    update: function (e, ui) {
                        var item = ui.item;
                       
                        var areaID = $(item).closest('.divAssetGrid').attr('data-area');
                        var sortWrapper = $(item).closest('.divAssetGrid').find('.divAssetSortList');

                        var lstOrderList = [];
                        var assetID, order;

                        $(sortWrapper).find(".divSortAsset").each(function (i, elm) {
                            $elm = $(elm);
                            assetID = parseInt($(elm).attr('data-assetid'));
                            order = i + 1;

                            var objOrder = {
                                AssetID: assetID,
                                Order: order
                            };

                            lstOrderList.push(objOrder);

                        });

                        AssetMgmt.SaveAssetsOrder(areaID, lstOrderList);


                    },
                });

                $(".divAssetSortList").disableSelection();
            },
            GetLocalFiles: function () {



                //$.ajax({
                //    url: this.config.baseURL + "GetLocalAssets",
                //    type: "GET",
                //    contentType: "application/json; charset=utf-8",
                //    datatype: "json",
                //    async: true,
                //    success: function (result) {
                //        var lstAssets = result;

                //        var lstJSFiles = lstAssets.filter(file => file.substr(file.length - 2) == "js");
                //        var lstCSSFiles = lstAssets.filter(file => file.substr(file.length - 3) == "css");

                //        AssetMgmt.config.lstLocalCSSFiles = lstCSSFiles;
                //        AssetMgmt.config.lstLocalJSFiles = lstJSFiles;

                //    },
                //    error: function (jqXHR) {

                //    },
                //    complete: function (jqXHR, status) {

                //    }


                //});


                let ajaxConfig = {
                    url: this.config.baseURL + "GetLocalAssets",
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    datatype: "json",
                    async: true,
                    success: function (result) {
                        var lstAssets = result;

                        var lstJSFiles = lstAssets.filter(file => file.substr(file.length - 2) == "js");
                        var lstCSSFiles = lstAssets.filter(file => file.substr(file.length - 3) == "css");

                        AssetMgmt.config.lstLocalCSSFiles = lstCSSFiles;
                        AssetMgmt.config.lstLocalJSFiles = lstJSFiles;

                    },
                    error: function (jqXHR) {

                    },
                    complete: function (jqXHR, status) {

                    }


                };
                SecureAjaxCall.PassObject(ajaxConfig);
            },
            BindLocalFiles: function () {
                var isExternal = $("#chkIsExternal").prop("checked");

                var fileType = $("#ddlAssetType").val();

                if (!isExternal) {
                    var lstFiles = [];

                    if (fileType == "css")
                        lstFiles = AssetMgmt.config.lstLocalCSSFiles;
                    else
                        lstFiles = AssetMgmt.config.lstLocalJSFiles;

                    var ddlHTML = '<option value="" >Select File</option>';
                    $.each(lstFiles, function (index, item) {
                        ddlHTML += `<option value="${item}">${item}</option>`;
                    });

                    $("#ddlLocalFiles").html(ddlHTML);
                }


            },
            BindButtonEvents: function () {
                $(".btnEditAsset").off('click').on('click', function () {
                    var me = this;

                    $("#btnCancelAsset").click();
                    AssetMgmt.ClearAssetsForm();
                    $("#assetFormTitle").text(AssetMgmt.LocalLabel.Edit);
                    var parent = $(me).closest('.divSortAsset');
                    var buttonWrapper = $(me).closest('.divAssetButtons');
                    $(buttonWrapper).hide();

                    var assetID = $(parent).attr('data-assetid');
                    var areaID = $(parent).closest('.divAssetGrid').attr('data-area');
                    $("#hdnAssetID").val(assetID);
                    $("#hdnAreaID").val(areaID);

                    AssetMgmt.GetAssetSettings(assetID);
                    $("#divAssetAddUpdate").detach().appendTo($(parent)).slideDown();

                });

                $(".btnAddAsset").off('click').on('click', function () {
                    $("#btnCancelAsset").click();
                    AssetMgmt.ClearAssetsForm();
                    $('.chkRole').prop('checked', true);
                    $("#assetFormTitle").text(AssetMgmt.LocalLabel.AddNew);
                    var parent = $(this).closest('div');
                    $("#divAssetAddUpdate").detach().prependTo($(parent)).slideDown();
                    $(this).hide();

                    var areaID = $(this).attr("data-areaid");

                    $("#hdnAreaID").val(areaID);
                    $("#hdnAssetID").val(0);


                });



                $(".btnDeleteAsset").off('click').on('click', function () {
                    var parent = $(this).closest('.divSortAsset');
                    var assetID = $(parent).attr('data-assetid');
                    var areaID = $(parent).closest('.divAssetGrid').attr('data-area');
                    
                    //var isConfirm = ConfirmBox('Are you sure you want to delete?');
                    //if (isConfirm != false)

                    SageConfirmDialog("Are you sure?", "Delete Confirmation", function () {
                        console.log("Close");
                    }).done(function () {
                        AssetMgmt.DeleteAsset(assetID, areaID);
                    });

                });

                $("#btnSaveAsset").off('click').on('click', function () {
                    var assetID = $("#hdnAssetID").val();
                    var areaID = $("#hdnAreaID").val();
                    AssetMgmt.SaveAsset(assetID, areaID);

                });

                $("#btnCancelAsset").off('click').on('click', function () {
                    $("#divAssetAddUpdate").slideUp();
                    $(".btnAddAsset").show();
                    $(".divAssetButtons").show();
                });

                $(".btnCloneAssets").off('click').on('click', function () {
                    $("#btnCancelClone").click();
                    var parent = $(this).closest(".divAssetSortList");
                    $("#divCloneDialog").detach().prependTo($(parent)).slideDown();
                    $(this).closest(".divNoAssets").hide();

                });


                $("#btnSaveClone").off('click').on('click', function () {
                    var areaID = $(this).closest(".divAssetGrid").attr('data-area');
                    AssetMgmt.CloneAssets(areaID);
                });

                $("#btnCancelClone").off('click').on('click', function () {
                    $("#divCloneDialog").slideUp();
                    $(".divNoAssets").show();
                });



            },

            GetAssetSettings: function (assetID) {

                assetID = parseInt(assetID);

                $.ajax({
                    url: this.config.baseURL + `GetAssetSettingByID?bundleAssetID=${assetID}`,
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    datatype: "json",
                    async: true,
                    success: function (result) {
                        AssetMgmt.BindAssetSettings(result);
                    },
                    error: function (jqXHR) {

                    },
                    complete: function (jqXHR, status) {

                    }


                });


            },
            BindAssetSettings: function (objAsset) {
                $("#txtAssetName").val(objAsset.Names);
                $("#ddlAssetType").val(objAsset.AssetType);
                $("#ddlAssetPosition").val(objAsset.Position);
                $("#ddlExcessMode").val(objAsset.ExcessMode);
                $("#chkIsExternal").prop("checked", objAsset.IsExternal);




                if (objAsset.IsExternal) {
                    $("#divFilePathExternal").show();
                    $("#divFilePathLocal").hide();
                    $("#txtFilePath").val(objAsset.FilePath);

                }
                else {
                    $("#divFilePathExternal").hide();
                    $("#divFilePathLocal").show();
                    AssetMgmt.BindLocalFiles();
                    $("#ddlLocalFiles").val(objAsset.FilePath);
                }


                var roles = objAsset.Roles;
                if (roles == "")
                    $(".chkRole").prop('checked', true);
                else {

                    $(".chkRole").prop('checked', false);


                    var arrRoles = roles.split(",");
                    console.log(arrRoles);
                    
                    $.each(arrRoles, function (index, item) {
                        $('#rolesList').find('.chkIndividualRole[value="' + item + '"]').prop('checked', true);
                    });
                }



            },
            SaveAsset: function (assetID, areaID) {

                var _name = $.trim($("#txtAssetName").val()),
                    _assetType = $("#ddlAssetType").val(),
                    _position = $("#ddlAssetPosition").val(),
                    _excessMode = $("#ddlExcessMode").val(),
                    _isExternal = $("#chkIsExternal").prop('checked');

                var _roles = "";
                if ($("#chkAllRoles").prop('checked'))
                    _roles = "";
                else {
                    var arrRoles = [];
                    $("#rolesList").find('.chkIndividualRole:checked').each(function () {
                        arrRoles.push($(this).val());
                    });

                    _roles = arrRoles.join(",");
                }


                var application = $("#ddlApplicationName").find("option:selected").text();
                var _filePath;


                var isValid = true;

                if (_name.length == 0) {
                    isValid = false;
                    $("#errAssetName").text("Enter name").show();
                }

                if (_isExternal) {

                    _filePath = $("#txtFilePath").val();
                    if (_filePath.length == 0) {
                        isValid = false;
                        $("#errAssetPath").text("Enter path").show();
                    }
                }
                else {
                    _filePath = $("#ddlLocalFiles").val();
                    if (_filePath.length == 0) {
                        isValid = false;
                        $("#errLocalAssetPath").text(AssetMgmt.LocalLabel.FileSelectError).show();
                    }
                }


                if (isValid) {

                    var objSave = {
                        AssetID: parseInt(assetID),
                        Names: _name,
                        AssetType: _assetType,
                        Position: _position,
                        FilePath: _filePath,
                        IsExternal: _isExternal,
                        ExcessMode: _excessMode,
                        Application: application,
                        UserAreaID: parseInt(areaID),
                        Roles: _roles
                    };



                    //$.ajax({
                    //    url: this.config.baseURL + 'SaveAssetSettings',
                    //    type: "POST",
                    //    contentType: "application/json; charset=utf-8",
                    //    datatype: "json",
                    //    traditional: true,
                    //    async: true,
                    //    data: JSON.stringify(objSave),
                    //    success: function (result) {
                    //        $("#divAssetAddUpdate").detach().appendTo("#divAssetsAccordion").slideUp();
                    //        AssetMgmt.GetAssetsByAreaID(areaID);

                    //    },
                    //    error: function (jqXHR) {

                    //    },
                    //    complete: function (jqXHR, status) {

                    //    }
                    //});

                    let ajaxConfig = {
                        url: this.config.baseURL + 'SaveAssetSettings',
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        datatype: "json",
                        traditional: true,
                        async: true,
                        data: JSON.stringify(objSave),
                        success: function (result) {
                            $("#divAssetAddUpdate").detach().appendTo("#divAssetsAccordion").slideUp();
                            AssetMgmt.GetAssetsByAreaID(areaID);

                        },
                        error: function (jqXHR) {

                        },
                        complete: function (jqXHR, status) {

                        }
                    };
                    SecureAjaxCall.PassObject(ajaxConfig);

                }



            },
            DeleteAsset: function (assetID, areaID) {
                assetID = parseInt(assetID);

                $.ajax({
                    url: this.config.baseURL + `DeleteAsset?AssetID=${assetID}`,
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    datatype: "json",
                    async: true,
                    success: function (result) {
                        AssetMgmt.GetAssetsByAreaID(areaID);
                    },
                    error: function (jqXHR) {

                    },
                    complete: function (jqXHR, status) {

                    }


                });

            },
            SaveAssetsOrder: function (areaID, lstOrders) {

                var objSaveInfo = {
                    AreaID: parseInt(areaID),
                    OrderList: lstOrders
                };

                $.ajax({
                    url: this.config.baseURL + 'SaveAssetsOrder',
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    datatype: "json",
                    traditional: true,
                    async: true,
                    data: JSON.stringify(objSaveInfo),
                    success: function (result) {

                    },
                    error: function (jqXHR) {

                    },
                    complete: function (jqXHR, status) {

                    }
                });

            },
            CloneAssets: function (areaID) {
                var sourceAppID = $("#ddlCloneApplication").val(),
                    destinationAppID = $("#ddlApplicationName").val();

                if (sourceAppID == destinationAppID) {
                    $("#errCloneApp").text("Clone source and destination applications are same").show();
                }
                else {

                    $.ajax({
                        url: this.config.baseURL + `CloneAssets?sourceApplicationID=${sourceAppID}&destinationApplicationID=${destinationAppID}&areaID=${areaID}`,
                        type: "GET",
                        contentType: "application/json; charset=utf-8",
                        datatype: "json",
                        async: true,
                        success: function (result) {
                            $("#divCloneDialog").detach().appendTo("#divAssetsAccordion").slideUp();
                            AssetMgmt.GetAssetsByAreaID(areaID);
                        },
                        error: function (jqXHR) {

                        },
                        complete: function (jqXHR, status) {

                        }


                    });

                }

            },
            ClearAssetsForm: function () {
                $("#txtAssetName").val("");
                $("#txtFilePath").val("");
                $("#chkIsExternal").prop("checked", true);
                $("#divFilePathExternal").show();
                $("#divFilePathLocal").hide();
                $("#errAssetPath").hide();
                $("#errLocalAssetPath").hide();

            },
            BindEvents: function () {

                $("#txtAssetName").on('keyup', function () {
                    $("#errAssetName").hide();
                });

                $("#txtFilePath").on('keyup', function () {
                    $("#errAssetPath").hide();
                });

                $("#ddlLocalFiles").on('change', function () {
                    $("#errLocalAssetPath").hide();
                });

                //$("#ddlFilterAssetType").on('change', function () {
                //    AssetMgmt.GetAreaWiseAssets();
                //});

                //$("#ddlFilterAssetType").on('change', function () {
                //    AssetMgmt.GetAreaWiseAssets();
                //});
                $("input[name='chkAssetType']").on('change', function () {
                    AssetMgmt.GetAreaWiseAssets();
                });

                $("input[name='chkAssetMode']").on('change', function () {
                    AssetMgmt.GetAreaWiseAssets();
                });



                $("#ddlFilterExcessMode").on('change', function () {
                    AssetMgmt.GetAreaWiseAssets();
                });

                $("#ddlApplicationName").on('change', function () {
                    AssetMgmt.GetAreaWiseAssets();
                });

                $("#ddlCloneApplication").on('change', function () {
                    $("#errCloneApp").hide();
                });

                $("#chkIsExternal").on('change', function () {
                    var isExternal = $("#chkIsExternal").prop("checked");

                    if (isExternal) {
                        $("#divFilePathExternal").show();
                        $("#divFilePathLocal").hide();
                    }
                    else {
                        $("#divFilePathExternal").hide();
                        $("#divFilePathLocal").show();
                        AssetMgmt.BindLocalFiles();
                    }
                });


                $("#ddlAssetType").on('change', function () {
                    AssetMgmt.BindLocalFiles();
                });


                $("#chkAllRoles").on('change', function () {
                    var isChecked = $(this).prop('checked');
                    if (isChecked)
                        $('.chkRole').prop('checked', true);
                });


                $(".chkIndividualRole").on('change', function () {
                    var isChecked = $(this).prop('checked');
                    if (!isChecked)
                        $('#chkAllRoles').prop('checked', false);

                    if (isChecked) {
                        var length = $("#rolesList").find('.chkIndividualRole:not(:checked)').length;
                        if (length == 0)
                            $('#chkAllRoles').prop('checked', true);
                    }

                });



            },
            init: function () {
                AssetMgmt.GetLocalFiles();
                AssetMgmt.BindEvents();
                AssetMgmt.GetAreaWiseAssets();


            }
        };
        AssetMgmt.init();
    };
    $.fn.AssetMgmt = function (p) {
        $.createAssetMgmt(p);
    };
})(jQuery);