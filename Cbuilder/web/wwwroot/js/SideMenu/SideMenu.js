$(function () {
    var DashboardSideBar = {
        Init: function () {
            let $this = this;
            let areaId = area === "00000000-0000-0000-0000-000000000000" ? $("#area").val() : area;
            $this.GetModule(areaId);
            let moduleId = controller === "00000000-0000-0000-0000-000000000000" ? $("#controller").val() : controller;
            $this.GetAction(moduleId);
            let menuId = $("#MenuID").val();
            $this.Events();
            if ($("#IsParent").is(":checked")) {
                $(".link-section").hide();
            }
            if (menuId > 0) {
                $this.GetModuleAndAction(menuId);
            }
        },
        Events: function () {
            let $this = this;
            $("#area").off("change").on("change", function () {
                let areaId = $(this).val();
                $this.GetModule(areaId);
                $("#controller").trigger("change");
                $("#AreaName").val($("#Area>:selected").text());
            });
            $("#controller").off("change").on("change", function () {
                let moduleId = $(this).val();
                $this.GetAction(moduleId);
                $("#ModuleName").val($("#Module>:selected").text());
            });
            $("#Actions").off("change").on("change", function () {
                $("#ActionName").val($("#Actions>:selected").text());
            });
            $("#IsParent").off("click").on("click", function () {
                $(".link-section").toggle(!$(this).is(":checked"));
            });
        },
        ajaxCall: function (method, param, success, failure) {
            param = $.extend({ __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val() }, param);
            $.ajax({
                async: false,
                cache: false,
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                url: "/Dashboard/SideMenu/" + method,
                dataType: "JSON",
                data: param,
                success: function (data) {
                    success(data);
                },
                error: failure
            });
        },
        GetModule: function (areaId) {
            let $this = this;
            $this.ajaxCall("GetPages", { "AreaID": areaId }, $this.GetModuleSuccess, function () { console.log("Error while getting module.") })
        },
        GetModuleSuccess: function (data) {
            let html = "";
            $.each(data, function (i, v) {
                html += `<option value='${v.PageID}'>${v.DisplayName}</option>`;
            });
            $("#controller").html(html);
            $("#controller").val(controller);
        },
        GetAction: function (moduleId) {
            let $this = this;
            $this.ajaxCall("GetActions", { "PageID": moduleId }, $this.GetActionSuccess, function () { console.log("Error while getting actions.") })
        },
        GetActionSuccess: function (data) {
            let html = "";
            $.each(data, function (i, v) {
                html += `<option value='${v.PageActionID}'>${v.ActionName}</option>`;
            });
            $("#actions").html(html);
            $("#actions").val(action);
        },
        GetModuleAndAction: function (menuId) {
            let $this = this;
            $this.ajaxCall("GetActions", { PageID: menuId }, $this.BindModuleAction, function () { console.log("Error while getting module action.") })
        },
        BindModuleAction: function (data) {
            $("#Module").val(data.Module).trigger("change");
            $("#Action").val(data.Action);
        }
    }
    DashboardSideBar.Init();
});