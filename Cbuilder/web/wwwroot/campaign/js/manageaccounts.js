(function ($) {


    $.ManageAccounts = function (p) {

        let localLabel = p.localLabel;
        var ManageAccounts = {
            config: {
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                methodname: "",
                url: "",
                ajaxCallMode: 0,
                success: "",
                baseURL: CurrentHostURL + '/dashboard/Campaign',
            },


            ajaxCall: function (config, IsTraditional) {
                config.url = config.baseURL + "/" + config.methodname;
                config.success = config.ajaxSuccess;
                config.error = ManageAccounts.ajaxFailure;
                if (IsTraditional)
                    SecureAjaxCall.Call(config);
                else
                    SecureAjaxCall.PassObject(config);
            },

            ajaxSuccess: function (data) {
            },

            ajaxFailure: function (data) {
                var msg = data.statusText;
                if (data.status === 401)
                    msg = "not authorized";

                ActionMessage(msg, MessageType.Error, false);
            },


            init: function () {
                ManageAccounts.LoadUIEvents();
                ManageAccounts.LoadData();
            },

            LoadUIEvents: function () {
            },


            LoadData: function () {
                ManageAccounts.config.methodname = "GetCampaignApps";
                ManageAccounts.config.data = {};
                ManageAccounts.config.ajaxSuccess = function (data) {
                    ManageAccounts.LoadDataSuccessMessage(data);
                }
                ManageAccounts.ajaxCall(ManageAccounts.config, true);
                //call function
            },

            LoadDataSuccessMessage: function (data) {
                if (data != null) {
                    var itemList = data;
                    if (itemList.Data.length > 0) {
                        let html = '';
                        $.each(itemList.Data, function (index, item) {

                            html += `<div class="sfCol-12 sfCol-sm-6 Mb-25 sm-Mb-0">
                                        <div class="card  t-center f-middle f-wrap f-center">
                                            <div class="t-center f-a-s-end Mb-10 ${item.isConnected ? 'connected' : ''}" data-type='${item.title}'>
                                            
                                                <div class="card-icon"><i class="fa ${item.icon}"></i></div>
                                              
                                            </div>
                                        
                                                <div class="sfButtonwrapper f-a-s-start f-center w-100">
                                                    <a class="btn  success-outline round linkAccount ${item.isConnected ? 'connected' : ''}" data-type='${item.title}'>${item.isConnected ? localLabel.Actions.Reconnect : localLabel.Actions.Connect}</a>
                                                </div>
                                           
                                        </div>
                                    </div>`;



                        });
                        $('.app-data').html(html);
                        ManageAccounts.BindGridEvents();

                    }
                }
            },

            BindGridEvents: function () {
                $('.linkAccount').off('click').on('click', function () {

                    let $this = $(this);
                    let linkType = $(this).attr('data-type');
                    let requestUrl = window.location.origin + window.location.pathname;

                    if ($this.hasClass('connected')) {
                        SageConfirmDialog(localLabel.Messages.ReconnectConfirmation).done(function () {
                            ManageAccounts.config.methodname = "LinkAccount";
                            ManageAccounts.config.data = { type: linkType, redirectUrl: requestUrl };
                            ManageAccounts.config.ajaxSuccess = function (data) {
                                ManageAccounts.LinkAccountResponse(data);
                            }
                            ManageAccounts.ajaxCall(ManageAccounts.config, true);
                        });
                    }
                    else {
                        ManageAccounts.config.methodname = "LinkAccount";
                        ManageAccounts.config.data = { type: linkType, redirectUrl: requestUrl };
                        ManageAccounts.config.ajaxSuccess = function (data) {
                            ManageAccounts.LinkAccountResponse(data);
                        }
                        ManageAccounts.ajaxCall(ManageAccounts.config, true);
                    }
                });
            },
            LinkAccountResponse: function (data) {
                if (data !== null) {
                    if (data.Value.length > 0) {
                        location.href = data.Value;
                    }
                }
            }

        };


        ManageAccounts.init();
    };


    $.fn.ManageAccountsManage = function (p) {
        $.ManageAccounts(p);
    };
})(jQuery);