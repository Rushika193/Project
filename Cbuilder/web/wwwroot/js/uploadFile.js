//import { rename } from "fs";

$.fn.CustomFileUploader = function (opt) {
    opt = $.extend({
        url: "",
        success: function (data) {
        },
        allowExt: '', // send encrypted extension list
        size: 5000,
        name: "Choose file",
        uploadpath: "",
        crop: false,
        renamefile: true
    }, opt);

    var uploader = {
        init: function ($prnt) {
            $prnt.html('<input type="file" class="customfileUploder"/><button type="button" class="thumbUpload btn primary round">' + opt.name + '</button>');
            $prnt.find('.customfileUploder').off('change').on('change', function () {
                uploader.upload($(this));
            });
            $prnt.find('.thumbUpload').off().on('click', function () {
                $prnt.find('.customfileUploder').trigger('click');
            });
        },
        upload: function ($inp) {
            var formData = new FormData();
            if ($inp[0].files.length > 0) {
                $.each($inp[0].files, function (i, v) {
                    if (uploader.checkfile(v)) {
                        formData.append("files", v);
                    }
                    else return false;
                });
                config = {
                    type: 'POST',
                    contentType: false,
                    processData: false,
                    url: (opt.url === undefined || opt.url === "") ? `/File/FileUploader?destination=${opt.uploadpath}&isCrop=${opt.crop}&allowExt=${opt.allowExt}` : opt.url,
                    data: formData,
                    //dataType: 'application/x-www-form-urlencoded',
                    success: function (data) {
                        if (typeof opt.success === "function") {
                            opt.success(data);
                        }
                    },
                    error: function (data) {
                        console.error(data);
                    }
                };
                $.ajax(config);
            }
        },
        checkfile: function (file) {
            //var ext = file.name.split('.')[1].toLowerCase();
            //if (opt.allowExt.indexOf(ext) < 0) {
            //    console.log("file not allowed.");
            //    return false;
            //}
            var size = file.size / 1024;
            if (size > opt.size) {
                console.log("too large file.");
                return false;
            }
            return true;
        },
    };
    uploader.init($(this));

};