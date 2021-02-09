(function ($) {
    $.ManageLanguage = function (p) {
        p = $.extend
            ({
                enabled: 0
            }, p);


        let Lang = {
            config: {
                baseURL: SageFrameHostURL + "/Dashboard/Localization/",
            },
            ChangeLocalization: function (check) {
                let this_ = this;
                let ajaxConfig = {
                    url: this_.config.baseURL + "LocalizationToggle",
                    type: "Post",
                    async: false,
                    data: JSON.stringify({ check: check }),
                    success: function (result) {
                        let message = "Localization disabled successfully";
                        if (check)
                            message = "Localization enabled successfully";
                        ActionMessage(message, MessageType.Success);
                        window.location = window.location.href;
                    }
                };
                SecureAjaxCall.PassObject(ajaxConfig);
            },
            InitEvents: function () {
                let this_ = this;
                $('#localizationToggler').on('click', function () {
                    this_.ChangeLocalization($(this).is(':checked'));
                });
            },
            init: function () {
                this.InitEvents();
            }
        };
        Lang.init();
    };
    $.fn.Language = function (p) {
        $.ManageLanguage(p);
    };
})(jQuery);