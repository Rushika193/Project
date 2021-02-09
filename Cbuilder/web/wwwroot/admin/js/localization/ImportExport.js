(function ($) {
    $.ImportExport = function (p) {
        p = $.extend
            ({
                Path: '',
                Extensions: ''
            }, p);


        let ImpExp = {
            config: {
                baseURL: SageFrameHostURL + "/Dashboard/Localization/",
                path: p.Path,
                Extensions: p.Extensions
            },
            Export: function (check) {
                let this_ = this;
                let ajaxConfig = {
                    url: this_.config.baseURL + "Export",
                    type: "Post",
                    async: false,
                    dataType: "text",
                    data: JSON.stringify({ Value: $('.hdnAppIDs').val() }),
                    success: function (result) {
                        setTimeout(function () {
                            window.location = SageFrameHostURL + "/Temp/languages.zip"
                        }, 2000);
                    }
                };
                SecureAjaxCall.PassObject(ajaxConfig);
            },
            Import: function (fileName) {
                let this_ = this;
                debugger;
                let ajaxConfig = {
                    url: this_.config.baseURL + "Import",
                    type: "Post",
                    async: false,
                    data: JSON.stringify({ Value: fileName }),
                    success: function (results) {
                        console.log(results);

                        if (results != null) {
                            let html = '';
                            let noerror = true;
                            let length = results.length;
                            for (var i = 0; i < length; i++) {
                                let res = results[i].Result;
                                let comment = res.Equal ? "okayfile" : "notokayfile";
                                html += `<tr class ><td>${res.FilePath}</td></tr>`;
                            }
                        }

                        if (html.length > 0) {
                            let header = "<thead><tr><th>FileName</th><th>FilePath</th><th>Condition</th></tr></thead>";
                            html = header + html;
                        }
                    }
                };
                SecureAjaxCall.PassObject(ajaxConfig);
            },
            submit_click: function (e) {
                let val = $('.hdnAppIDs').val();
                if (val.length == 0 || val == "-1") {
                    e.preventDefault();
                    alert('clicked submit');
                    SageAlertDialog("Please choose at least one application", "Error");
                    return false;
                }
                return true;
            },
            InitEvents: function () {
                let _this = this;
                $('#uploadJsons').CustomFileUploader({
                    uploadpath: _this.config.path,
                    allowExt: _this.config.Extensions,
                    success: function (result) {
                        if (result.status == 1)
                            _this.Import(result.files[0]);
                    },
                    renamefile: false,
                    crop: false,
                    size: 25600,
                    name: 'Upload localization zip'
                });
                $('.selectedApplication').off().on('click', function () {
                    UpdateAppID();
                });
                $('.selectedApplicationall').on('click', function () {
                    let checked = false;
                    if ($(this).prop("checked")) {
                        checked = true;
                    }
                    $('.selectedApplication').each(function () {
                        $(this).prop('checked', checked);
                    });
                    UpdateAppID();
                });
                function UpdateAppID() {
                    let val = '-1';
                    if ($('.selectedApplication:checked').length == $('.selectedApplication').length) {
                        $('.selectedApplicationall').prop('checked', true);
                    }
                    else {
                        $('.selectedApplicationall').prop('checked', false);
                    }
                    if ($('.selectedApplicationall').prop("checked")) {
                        val = '0';
                    }
                    else {
                        let vals = [];
                        $('.selectedApplication:checked').each(function () {
                            vals.push($(this).val());
                        });
                        val = vals.join(",");
                    }
                    $('.hdnAppIDs').val(val);
                }
                function CheckAppID() {
                    let val = $('.hdnAppIDs').val();
                    return val.lenght != 0;
                }

                $('#exportLocalization').on('click', function (e) {
                    if (_this.submit_click(e)) {
                        _this.Export();
                    }
                });
            },
            init: function () {
                this.InitEvents();
            }
        };
        ImpExp.init();
    };
    $.fn.ImportExportLanguage = function (p) {
        $.ImportExport(p);
    };
})(jQuery);