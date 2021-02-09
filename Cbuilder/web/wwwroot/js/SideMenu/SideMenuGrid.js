$(function () {
    var SideMenuGrid = {
        config: {
            url: "/Dashboard/SideMenu/",
            limit: 10,
            current: 0
        },
        Init: function () {
            this.GetAllMenu(0, this.config.limit, this.config.current);
            this.Event();
        },
        Event: function () {
            $("#btnSearch").off("click").on("click", function () {
                SideMenuGrid.GetAllMenu(0, SideMenuGrid.config.limit, 0);
            });
            $("#keywords").off("input").on("input", function () {
                if ($(this).val().length < 1) {
                    SideMenuGrid.GetAllMenu(0, SideMenuGrid.config.limit, 0);
                }
            });
        },
        GetAllMenu: function (offset, limit, current) {
            SideMenuGrid.config.current = current;
            var param = {
                Keyword: $("#keywords").val(),
                Offset: SideMenuGrid.config.limit * SideMenuGrid.config.current,
                Limit: SideMenuGrid.config.limit
            }
            var config = {
                data: param,
                url: SideMenuGrid.config.url + "GetAllMenu",
                async: false,
                success: function (data) {
                    SideMenuGrid.BindMenu(data);
                }
            };
            SecureAjaxCall.Call(config);
        },
        BindMenu: function (data) {
            let $this = this;
            var html = "";
            let total = 0;
            if (data !== null && data.length > 0) {
                $.each(data, function (i, v) {
                    html += `
                <div class="dg-col-wp">
                    <div class="sfCol-sm-9">
                        <div class="dg-group-inline">
                            <div class="dg-group">
                                <div class="dg-title">${v.LinkTitle}</div>
                            </div>
                            <div class="dg-group">
                                <div class="dg-group-inline">
                                    <span class="grd-key">${localLabel.AreaLabel}: </span>
                                    <span class="grd-value">${v.Area}</span>
                                </div>
                            </div>
                            <div class="dg-group">
                                <div class="dg-group-inline">
                                    <span class="grd-key">${localLabel.ControllerLabel}: </span>
                                    <span class="grd-value">${v.Controller}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sfCol-sm-3 f-center">
                        <div class="ds-group-inline">
                            <div class="action-menu">
                                <div class="action-icon">
                                    <i class="fa fa-ellipsis-h"></i>
                                </div>
                                <ul class="action-open">
                                    <li><a class="links" href="/dashboard/SideMenu/Edit${CultureURL}/${v.LinkID}"><i class="fa fa-edit"></i>${localLabel.EditLabel}</a></li>
                                    <li><a class="links deleteMenu" href="/dashboard/SideMenu/Delete${CultureURL}/${v.LinkID}" data-id=${v.LinkID}><i class="fa fa-trash"></i>${localLabel.DeleteLabel}</a></li>
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
                    <h5>${localLabel.NoData}</h5>
                </div>`;
            }
            $('#divGridBody').html(html);
            gridHelper.bindEvent({
                onMenuClick: function ($ele) {
                }
            });
            $('#divGridBody').find(".deleteMenu").off("click").on("click", function (e) {
                e.preventDefault();
                let $this = $(this);
                SageConfirmDialog("Are you sure.You want to delete?", "Delete Confimation", function () { }).done(function () {
                    window.location.href = $this.attr("href");
                })
            });
        },
        BindPagination: function (RowTotal) {
            if (RowTotal >= SideMenuGrid.config.current * SideMenuGrid.config.limit) {
                $('#divPagination').show().pagination(RowTotal, {
                    items_per_page: SideMenuGrid.config.limit,
                    current_page: SideMenuGrid.config.current,
                    num_edge_entries: 2,
                    callfunction: true,
                    function_name: {
                        name: SideMenuGrid.GetAllMenu,
                        limit: SideMenuGrid.config.limit,
                    },
                    prev_text: ' ',
                    next_text: ' '
                });
            } else {
                $('#divPagination').hide();
            }
        }
    }
    SideMenuGrid.Init();
});