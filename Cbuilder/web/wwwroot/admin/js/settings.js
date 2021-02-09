(function ($) {
    $.createSettings = function (p) {
        p = $.extend
            ({
                StatusID: 0
            }, p);


        var Settings = {
            config: {
                baseURL: "/Dashboard/Settings/",
                StatusID: p.StatusID

            },
            SaveSettings: function (lstSettings) {
                let ajaxConfig = {
                    url: Settings.config.baseURL + 'SaveSettingKeys',
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    datatype: "json",
                    traditional: true,
                    async: true,
                    data: JSON.stringify(lstSettings),
                    success: function (result) {
                        if (result == 1)
                            SageAlertDialog("Saved successfully", "Success")
                        else
                            SageAlertDialog("Some error occured", "Error")
                    },
                    error: function (jqXHR) {

                    },
                    complete: function (jqXHR, status) {

                    }
                };
                SecureAjaxCall.PassObject(ajaxConfig);

            },
            RefreshCache: function () {

                let ajaxConfig = {
                    url: Settings.config.baseURL + 'RefreshCache',
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    datatype: "json",
                    traditional: true,
                    async: true,
                    data: JSON.stringify({}),
                    success: function (result) {
                        SageAlertDialog("Cache Refreshed successfully", "Success")
                    },
                    error: function (jqXHR) {

                    },
                    complete: function (jqXHR, status) {

                    }
                };
                SecureAjaxCall.PassObject(ajaxConfig);
            },
            BindClickEvents: function () {

                $(".btnSaveSettings").off('click').on('click', function () {
                    var lstSettings = [];

                    var me = this;
                    var wrapper = $(me).closest('.divSectionWrapper');

                    var ele,
                        setting;
                    var keyName, keyValue, isCacheable;
                    $(wrapper).find('.divItemWrapper').each(function () {
                        ele = this;
                        keyName = $(ele).attr('data-keyname');

                        if ($(ele).find('.settingInput').length > 0) {
                            isCacheable = $(ele).find('.settingInput').attr("data-iscache") == "True";

                            if ($(ele).find('.settingInput').hasClass('txtSettingValue')) {
                                keyValue = $.trim($(ele).find('.settingInput').val());
                            }
                            else if ($(ele).find('.settingInput').hasClass('chkSettingValue')) {
                                keyValue = $(ele).find('.chkSettingValue').prop("checked").toString();
                            }


                            setting = {
                                Key: keyName,
                                Value: keyValue,
                                IsCacheable: isCacheable
                            }

                            lstSettings.push(setting);
                        }
                    });

                    Settings.SaveSettings(lstSettings);
                });

                $("#btnSaveAndTestSMTP").off('click').on('click', function () {
                    var lstSettings = [];

                    var me = this;
                    var wrapper = $(me).closest('.divSectionWrapper');

                    var ele,
                        setting;
                    var keyName, keyValue, isCacheable;
                    $(wrapper).find('.divItemWrapper').each(function () {
                        ele = this;
                        keyName = $(ele).attr('data-keyname');

                        if ($(ele).find('.settingInput').length > 0) {

                            isCacheable = $(ele).find('.settingInput').attr("data-iscache") == "True";

                            if ($(ele).find('.settingInput').hasClass('txtSettingValue')) {
                                keyValue = $.trim($(ele).find('.settingInput').val());
                            }
                            else if ($(ele).find('.settingInput').hasClass('chkSettingValue')) {
                                keyValue = $(ele).find('.chkSettingValue').prop("checked").toString();
                            }


                            setting = {
                                Key: keyName,
                                Value: keyValue,
                                IsCacheable: isCacheable
                            }

                            lstSettings.push(setting);
                        }
                    });

                    let ajaxConfig = {
                        url: Settings.config.baseURL + 'SaveAndTestSMTP',
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        datatype: "json",
                        traditional: true,
                        async: true,
                        data: JSON.stringify(lstSettings),
                        success: function (result) {
                            if (result == 1)
                                SageAlertDialog("Test email sent successfully", "Success")
                            else
                                SageAlertDialog("Some error occured", "Error")
                        },
                        error: function (jqXHR) {

                        },
                        complete: function (jqXHR, status) {

                        }
                    };
                    SecureAjaxCall.PassObject(ajaxConfig);
                });



                /*o auth events*/
                var self = this;
                $('#btnSaveOauthSetting').off('click').on('click', function () {
                    self.SaveOauthSetting();
                });
                $('.chkAuthUseCont').off('change').on('change', function () {
                    var $ths = $(this);
                    var $fmInp = $ths.closest('.fmSection').find('.authcred');
                    if ($ths.prop('checked'))
                        $fmInp.hide();
                    else
                        $fmInp.show();
                });
                $('.chkAuthUseCont').trigger('change');
                /*o auth events end */


            },


            //SaveBasicSettings: function () {
            //    var lstSettings = [];

            //    var optCSS = {
            //        Key: $("#chkOptCSS").attr("data-keyname"),
            //        Value: $("#chkOptCSS").prop("checked").toString(),
            //        IsCacheable: $("#chkOptCSS").attr("data-iscache") == "True"
            //    };

            //    var optJS = {
            //        Key: $("#chkOptJS").attr("data-keyname"),
            //        Value: $("#chkOptJS").prop("checked").toString(),
            //        IsCacheable: $("#chkOptJS").attr("data-iscache") == "True"
            //    };


            //    lstSettings.push(optCSS);
            //    lstSettings.push(optJS);

            //    Settings.SaveSettings(lstSettings);


            //},
            //SaveEmailSettings: function () {
            //    var lstSettings = [];

            //    var adminEmail = {
            //        Key: $("#txtAdminEmail").attr("data-keyname"),
            //        Value: $.trim($("#txtAdminEmail").val()),
            //        IsCacheable: $("#txtAdminEmail").attr("data-iscache") == "True"
            //    };


            //    lstSettings.push(adminEmail);

            //    Settings.SaveSettings(lstSettings);


            //},
            //SaveFTPSettings: function () {
            //    var lstSettings = [];

            //    var ftpServer = {
            //        Key: $("#txtFTPServer").attr("data-keyname"),
            //        Value: $.trim($("#txtFTPServer").val()),
            //        IsCacheable: $("#txtFTPServer").attr("data-iscache") == "True"
            //    };

            //    var ftpPort = {
            //        Key: $("#txtFTPPort").attr("data-keyname"),
            //        Value: $.trim($("#txtFTPPort").val()),
            //        IsCacheable: $("#txtFTPPort").attr("data-iscache") == "True"
            //    };

            //    var ftpUserName = {
            //        Key: $("#txtFTPUsername").attr("data-keyname"),
            //        Value: $.trim($("#txtFTPUsername").val()),
            //        IsCacheable: $("#txtFTPUsername").attr("data-iscache") == "True"
            //    };


            //    var ftpPassword = {
            //        Key: $("#txtFTPPassword").attr("data-keyname"),
            //        Value: $.trim($("#txtFTPPassword").val()),
            //        IsCacheable: $("#txtFTPPassword").attr("data-iscache") == "True"
            //    };


            //    lstSettings.push(ftpServer);
            //    lstSettings.push(ftpPort);
            //    lstSettings.push(ftpUserName);
            //    lstSettings.push(ftpPassword);

            //    Settings.SaveSettings(lstSettings);


            //},
            //SaveSMTPSettings: function () {
            //    var lstSettings = [];

            //    var server = {
            //        Key: $("#txtSMTPServer").attr("data-keyname"),
            //        Value: $.trim($("#txtSMTPServer").val()),
            //        IsCacheable: $("#txtSMTPServer").attr("data-iscache") == "True"
            //    };

            //    var port = {
            //        Key: $("#txtSMTPPort").attr("data-keyname"),
            //        Value: $.trim($("#txtSMTPPort").val()),
            //        IsCacheable: $("#txtSMTPPort").attr("data-iscache") == "True"
            //    };

            //    var userName = {
            //        Key: $("#txtSMTPUsername").attr("data-keyname"),
            //        Value: $.trim($("#txtSMTPUsername").val()),
            //        IsCacheable: $("#txtSMTPUsername").attr("data-iscache") == "True"
            //    };


            //    var password = {
            //        Key: $("#txtSMTPPassword").attr("data-keyname"),
            //        Value: $.trim($("#txtSMTPPassword").val()),
            //        IsCacheable: $("#txtSMTPPassword").attr("data-iscache") == "True"
            //    };

            //    var isSSL = {
            //        Key: $("#chkSSLEnabled").attr("data-keyname"),
            //        Value: $("#chkSSLEnabled").prop("checked").toString(),
            //        IsCacheable: $("#chkSSLEnabled").attr("data-iscache") == "True"
            //    };

            //    lstSettings.push(server);
            //    lstSettings.push(port);
            //    lstSettings.push(userName);
            //    lstSettings.push(password);
            //    lstSettings.push(isSSL);


            //    Settings.SaveSettings(lstSettings);


            //},
            //SaveClientSettings: function () {
            //    var lstSettings = [];

            //    var clientID = {
            //        Key: $("#txtClientID").attr("data-keyname"),
            //        Value: $.trim($("#txtClientID").val()),
            //        IsCacheable: $("#txtClientID").attr("data-iscache") == "True"
            //    };

            //    var secret = {
            //        Key: $("#txtClientSecret").attr("data-keyname"),
            //        Value: $.trim($("#txtClientSecret").val()),
            //        IsCacheable: $("#txtClientSecret").attr("data-iscache") == "True"
            //    };



            //    lstSettings.push(clientID);
            //    lstSettings.push(secret);

            //    Settings.SaveSettings(lstSettings);


            //},
            //SaveSecuritySettings: function () {
            //    var lstSettings = [];

            //    var encKey = {
            //        Key: $("#txtEncKey").attr("data-keyname"),
            //        Value: $.trim($("#txtEncKey").val()),
            //        IsCacheable: $("#txtEncKey").attr("data-iscache") == "True"
            //    };

            //    var guid = {
            //        Key: $("#txtGUID").attr("data-keyname"),
            //        Value: $.trim($("#txtGUID").val()),
            //        IsCacheable: $("#txtGUID").attr("data-iscache") == "True"
            //    };

            //    var cookieExp = {
            //        Key: $("#txtCookieExp").attr("data-keyname"),
            //        Value: $.trim($("#txtCookieExp").val()),
            //        IsCacheable: $("#txtCookieExp").attr("data-iscache") == "True"
            //    };




            //    lstSettings.push(encKey);
            //    lstSettings.push(guid);
            //    lstSettings.push(cookieExp);


            //    Settings.SaveSettings(lstSettings);


            //},

            SaveOauthSetting: function () {
                var self = this;
                var lstSetting = new Array();
                $('#divOauthSetting .fmSection').each(function () {
                    var $ths = $(this);
                    var stng = {};
                    $ths.find('input').each(function () {
                        var $inp = $(this);
                        if ($inp.attr('type') === 'checkbox')
                            stng[$inp.attr('name')] = $inp.prop('checked');
                        else
                            stng[$inp.attr('name')] = $inp.val();
                    });
                    lstSetting.push(stng);
                });
                var ajaxConf = {
                    data: JSON.stringify(lstSetting),
                    url: self.config.baseURL + 'Oauth',
                    success: function (data) {
                        var msgTyp = MessageType.Error;
                        if (data.IsSuccess)
                            msgTyp = MessageType.Success;
                        ActionMessage(data.Message, msgTyp);
                    }
                }
                SecureAjaxCall.PassObject(ajaxConf);

            },

            //SaveAPISettings: function () {
            //    var lstSettings = [];

            //    var idURL = {
            //        Key: $("#txtIdentityURL").attr("data-keyname"),
            //        Value: $.trim($("#txtIdentityURL").val()),
            //        Type: $("#txtIdentityURL").attr("data-iscache") == "True"
            //    };

            //    lstSettings.push(idURL);


            //    var loggerURL = {
            //        Key: $("#txtLoggerURL").attr("data-keyname"),
            //        Value: $.trim($("#txtLoggerURL").val()),
            //        Type: $("#txtLoggerURL").attr("data-iscache") == "True"
            //    };
            //    lstSettings.push(loggerURL);


            //    var jsCDNView = {
            //        Key: $("#txtJSCDNView").attr("data-keyname"),
            //        Value: $.trim($("#txtJSCDNView").val()),
            //        Type: $("#txtJSCDN").attr("data-iscache") == "True"
            //    };

            //    lstSettings.push(jsCDNView);


            //    var jsCDNEdit = {
            //        Key: $("#txtJSCDNEdit").attr("data-keyname"),
            //        Value: $.trim($("#txtJSCDNEdit").val()),
            //        Type: $("#txtJSCDNEdit").attr("data-iscache") == "True"
            //    };
            //    lstSettings.push(jsCDNEdit);



            //    var cssCDNView = {
            //        Key: $("#txtCSSCDNView").attr("data-keyname"),
            //        Value: $.trim($("#txtCSSCDNView").val()),
            //        Type: $("#txtCSSCDNView").attr("data-iscache") == "True"
            //    };
            //    lstSettings.push(cssCDNView);


            //    var cssCDNEdit = {
            //        Key: $("#txtCSSCDNEdit").attr("data-keyname"),
            //        Value: $.trim($("#txtCSSCDNEdit").val()),
            //        Type: $("#txtCSSCDNEdit").attr("data-iscache") == "True"
            //    };
            //    lstSettings.push(cssCDNEdit);



            //    var dashCSSCDNView = {
            //        Key: $("#txtDashCSSCDNView").attr("data-keyname"),
            //        Value: $.trim($("#txtDashCSSCDNView").val()),
            //        Type: $("#txtDashCSSCDNView").attr("data-iscache") == "True"
            //    };
            //    lstSettings.push(dashCSSCDNView);


            //    var apkURL = {
            //        Key: $("#txtAPKURL").attr("data-keyname"),
            //        Value: $.trim($("#txtAPKURL").val()),
            //        Type: $("#txtAPKURL").attr("data-iscache") == "True"
            //    };
            //    lstSettings.push(apkURL);



            //    var onlineStore = {
            //        Key: $("#txtOnlineStore").attr("data-keyname"),
            //        Value: $.trim($("#txtOnlineStore").val()),
            //        Type: $("#txtOnlineStore").attr("data-iscache") == "True"
            //    };
            //    lstSettings.push(onlineStore);


            //    var digiSphereAPI = {
            //        Key: $("#txtDigiSphereAPI").attr("data-keyname"),
            //        Value: $.trim($("#txtDigiSphereAPI").val()),
            //        Type: $("#txtOnlineStore").attr("data-iscache") == "True"
            //    };
            //    lstSettings.push(digiSphereAPI);



            //    Settings.SaveSettings(lstSettings);


            //},



            init: function () {
                Settings.BindClickEvents();

            }
        };
        Settings.init();
    };
    $.fn.Settings = function (p) {
        $.createSettings(p);
    };
})(jQuery);