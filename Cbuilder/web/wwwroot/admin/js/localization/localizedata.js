(function ($) {
    $.ManageLocalizeData = function (p) {
        p = $.extend({ enabled: 0 }, p);
        let Localize = {
            config: {
                baseURL: SageFrameHostURL + "/Dashboard/Localization/",
            },
            ReadJsonData: function (check) {


            },
            ToogleDisplay: function (listshow) {
                if (listshow) {
                    $('#localizeDataList').show();
                    $('#jsondatalist').hide();
                    $('#backtoindex').show();
                }
                else {
                    $('#localizeDataList').hide();
                    $('#jsondatalist').show();
                    $('#backtoindex').hide();
                }
            },
            JsonEvent: function () {
                let this_ = this;
                $('#backtolist').off().on('click', function () {
                    this_.ToogleDisplay(true);
                });
            },
            InitEvents: function () {
                let this_ = this;
                $('.action-open').on('click', '.lnk-file', function () {
                    let FilePath = $(this).data("path");
                    let LanguageCode = $(this).data("language");
                    $("#hdnFilePath").val(FilePath);
                    $("#hdnLang").val(LanguageCode);
                    let lang = {
                        FilePath: FilePath,
                        LanguageCode: LanguageCode
                    };

                    SecureAjaxCall.PassObject({
                        url: `${SageFrameHostURL}/Dashboard/Localization/GetJsonData`,
                        data: JSON.stringify(lang),
                        success: function (data) {
                            $('#divjson').html('');
                            var html = '';
                            html += '<div class=" sfFormwrapper Mt-10x">';
                            $.each(data, function (key, value) {
                                html += '<div class="jsonKeyValue sfRow Mb-3x">'
                                html += '<div class="sfCol-12 sfCol-sm-4 formvalue Mb-5">';
                                html += '<span class="sfFormlabel key">' + key + '</span>';
                                html += '</div>';
                                html += '<div class="sfCol-12 sfCol-sm-8 formvalue  Mb-5">';
                                html += '<textarea class="sfFormcontrol area value" placeholder="Value">' + value + '</textarea>';
                                html += '</div>';
                                html += '</div>';
                            });
                            html += '<div class="sfRow Mt-2x">';
                            html += '<div class="sfButtonwrapper sfCol-12 offset-sfCol-sm-4 sfCol-sm-8">';
                            html += '<input type="button" id="btnSaveJson" class="btn primary round" value="Save" />';
                            html += '<span class="btn light round" id="backtolist">Back</span>';
                            html += '</div>';
                            html += '</div>';
                            html += '</div>';
                            $('#divjson').html(html);
                            this_.ToogleDisplay(false);
                            this_.JsonEvent();
                        }
                    });
                });

                $('#divjson').on('click', '#btnSaveJson', function () {
                    var value = {};
                    $('#divjson').find('.jsonKeyValue').each(function (index, element) {
                        let $this = $(this);
                        value[$this.find(".key").text()] = $this.find(".value").val();
                    });
                    var localizedData = {
                        Value: JSON.stringify(value),
                        FilePath: $("#hdnFilePath").val(),
                        Culture: $('#hdnLang').val()
                    }
                    SecureAjaxCall.PassObject({
                        url: `${SageFrameHostURL}/Dashboard/Localization/SaveJsonData`,
                        dataType: 'json',
                        data: JSON.stringify(localizedData),
                        success: function (data) {
                            if (data != "") {
                                //window.setTimeout(function () {
                                //    window.location.href = `${SageFrameHostURL}/Dashboard/Localization`
                                //}, 2000);
                            }
                            SageAlertDialog("Update Successfully", "Success");
                            this_.ToogleDisplay(true);
                        }
                    });

                });
            },
            init: function () {
                this.InitEvents();
            }
        };
        Localize.init();
    };
    $.fn.LocalizeData = function (p) {
        $.ManageLocalizeData(p);
    };
})(jQuery);