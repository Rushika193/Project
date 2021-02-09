$(function () {
    $('.changesimage').on('click', function () {
        var $this = $(this);
        var folderName = $this.attr('data-dirName')
        var sagemedia = $(this).SageMedia({
            onSelect: function (src, response, type, filename, extension) {
                $('#hdnFolderName').val(folderName);
                $('#hdnImagePath').val(src);

            },
            success: ChangeLogo,
            mediaType: 'image'
        });
        sagemedia.Show();

    });
    $('#btnChangeFavicon').on('click', function () {
        var $this = $(this);
        var sagemedia = $(this).SageMedia({
            onSelect: function (src, response, type, filename, extension) {
                if (extension === "ico") {
                    $('#hdnImagePath').val(src);
                }
                else {
                    SageAlertDialog("Favicon must have extension .ico", "Error!!!");
                }
            },
            mediaType: 'image'
        });
        sagemedia.Show(ChangeFavicon);

    });
    function ChangeLogo(response) {
        debugger;
        var folderName = $("#hdnFolderName").val();
        var imageFilePath = response.filePath;
        var objChange = {
            FolderName: folderName,
            ImagePath: imageFilePath
        };
        let ajaxConfig = {
            url: '/Dashboard/LogoSetting/ChangeLogo',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            traditional: true,
            async: true,
            data: JSON.stringify(objChange),
            success: function (result) {
                if (result == 1) {
                    window.location.reload();
                }
                else {
                    SageAlertDialog("Oops! something went wrong", "Internal Server Error");
                }

            },
            error: function (jqXHR) {

            },
            complete: function (jqXHR, status) {

            }
        };
        SecureAjaxCall.PassObject(ajaxConfig);
    }
    function ChangeFavicon(response) {
        var imageFilePath = response.filePath;
        var objChange = {
            FolderName: "",
            ImagePath: imageFilePath
        };
        let ajaxConfig = {
            url: '/Dashboard/LogoSetting/ChangeFavicon',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            traditional: true,
            async: true,
            data: JSON.stringify(objChange),
            success: function (result) {
                if (result == 1) {
                    SageAlertDialog("Due to Browser Cache it may take take some time to reflect the favicon", "Favicon changed");

                }
                else {
                    SageAlertDialog("Oops! something went wrong", "Internal Server Error");
                }
            },
            error: function (jqXHR) {

            },
            complete: function (jqXHR, status) {

            }
        };
        SecureAjaxCall.PassObject(ajaxConfig);
    }
});