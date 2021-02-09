String.Format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
};
//TO  be call from serverside for confirmation
var dialogConfirmed = false;
function ConfirmDialog(obj, title, dialogText) {
    if (!dialogConfirmed) {
        $('body').append(String.Format("<div id='dialog-confirm' title='{0}'><p>{1}</p></div>",
            title, dialogText));
        $('#dialog-confirm').dialog
            ({
                height: 110,
                modal: true,
                resizable: false,
                draggable: false,
                close: function (event, ui) { $('body').find('#dialog-confirm').remove(); },
                buttons:
                {
                    "Yes": {
                        click: function () {
                            $(this).dialog('close');
                            dialogConfirmed = true;
                            if (obj) obj.click();
                        },
                        text: 'Yes',
                        class: 'btn primary'
                    },
                    "No": {
                        click: function () {
                            $(this).dialog("close");
                        },
                        text: 'No',
                        class: 'btn light'
                    }
                },
                open: function (event, ui) {
                    $('.ui-dialog-title').before('<i class="fa fa-check-square-o" aria-hidden="true"></i>');
                }
            });
    }
    return dialogConfirmed;
}
//TO  be call from cientSide to alert message with title
function SageAlertDialog(dialogText, title) {
    if (typeof (title) == 'undefined' || title.length == 0) {
        title = 'Alert';
    }
    $('body').append(String.Format("<div id='dialog-confirm' title='{0}'><p>{1}</p></div>",
        title, dialogText));
    $('#dialog-confirm').dialog
        ({
            height: 110,
            modal: true,
            resizable: false,
            draggable: false,
            close: function (event, ui) { $('body').find('#dialog-confirm').remove(); },
            buttons:
            {
                "OK": {
                    click: function () {
                        $(this).dialog('close');
                    },
                    text: 'OK',
                    class: 'btn success'
                },
            },
            open: function (event, ui) {
                $('.ui-dialog-title').before('<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>');
            }
        });
}
//TO  be call from cientSide to confirm
function SageConfirmDialog(dialogText, title, closeCallback) {
    if (typeof (title) === 'undefined' || title.length === 0) {
        title = 'Confirmation';
    }
    var def = $.Deferred();
    $('body').append(`<div class='sagedialog-confirm' title='${title}'><p>${dialogText}</p></div>`);
    $('.sagedialog-confirm').dialog
        ({
            height: 110,
            modal: true,
            resizable: false,
            draggable: false,
            close: function (event, ui) {
                $('body').find('.sagedialog-confirm').remove();
                if (typeof closeCallback !== "undefined" && typeof closeCallback === "function")
                    closeCallback();
            },
            buttons:
            {
                "Yes": {
                    click: function () {
                        $(this).dialog('close');
                        def.resolve();
                    },
                    text: 'Yes',
                    class: 'btn primary'
                },
                "No": {
                    click: function () {
                        $(this).dialog("close");
                        def.reject();
                    },
                    text: 'No',
                    class: 'btn light'
                }
            },
            open: function (event, ui) {
                $('.ui-dialog-title').before('<i class="fa fa-check-square-o" aria-hidden="true"></i>');
            }
        });
    return def.promise();
}
//To be call when default Dialog box is needed
$.fn.SimpleDialog = function (option, dialogExtendOptions) {
    var screen_res = screen.width;
    var align = (screen_res - 800) / 2;
    var options = $.extend(
        {
            "title": "title",
            "width": 400,
            "height": 600,
            "resizable": false,
            "modal": true,
            "position": [align, 150],
            "z-index": 500,
            "close": function () {

            },
            "appendTo": "form",
            "open": function () {
            }
        }, option);

    var dialogOptions = {
        "title": options.title,
        "width": options.width,
        "height": options.height,
        "modal": options.modal,
        "resizable": options.resizable,
        //"position": options.position,
        "z-index": options["z-index"],
        "close": options.close,
        "appendTo": options.appendTo
    };
    //dialog-extend options
    //var dialogExtendOptions = {
    //    "maximize": true,
    //    "minimize": false
    //};
    //open dialog
    if (typeof (dialogExtendOptions) !== 'undefined' && dialogExtendOptions.length > 0) {
        $(this).dialog(dialogOptions).dialogExtend(dialogExtendOptions);
    }
    else {
        $(this).dialog(dialogOptions);
    }
    //$('div.ui-dialog').css("z-index", "3000");
    //$('div.ui-dialog').resizable('destroy');

};

var countdownTimer;
$(function () {
    SetSessionLogout()
});

let totalsessionTime = 2;
let alertTime = 1;// 
let time = totalsessionTime - alertTime;//in min    
let expiryTimeInSec = time * 60;//
function SetSessionLogout() {
    var d = new Date();
    d.setTime(d.getTime() + (expiryTimeInSec * 1000));
    localStorage.setItem("timeInSec", d.toUTCString());
    SetExpiryTime(expiryTimeInSec);
}
function SetExpiryTime(expiryTime) {
    setTimeout(function () {
        CalculateExpiry();
    }, expiryTime * 1000);
}
function CheckTimeToExpire() {
    let timeInSec = localStorage.getItem("timeInSec");
    console.log(timeInSec);
    var expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + (expiryTimeInSec * 1000));
    var cookieDate = new Date(timeInSec);
    if (timeInSec !== "undefined" && timeInSec.length > 0) {

        return expiryDate - cookieDate;
    }
    let expiryMin = expiryDate.getMinutes(), expirySec = expiryDate.getSeconds();
    let cachedMin = cookieDate.getMinutes(), cachedSec = cookieDate.getSeconds();
    debugger;
    console.log(expiryMin + '' + expirySec + '' + cachedMin + '' + cachedSec);
    if (expiryMin >= cachedMin && expirySec >= cachedMin)
        return 0;
    return ((expiryMin - cachedMin) * 60 + expirySec - cachedMin);
}
function CalculateExpiry() {
    let timeDiff = CheckTimeToExpire();
    console.log(timeDiff);
    if (timeDiff == 0) {
        RemainingTime();
        SessionOutDialogue();
    }
    else if (timeDiff > 0)
        SetExpiryTime(timeDiff);
}
function SessionOutDialogue() {
    let dialogText = '<span id="countdown" class="timer"></span>';
    let title = 'Session Expiry';
    var def = $.Deferred();
    $('body').append(`<div class='sagedialog-confirm' title='${title}'><p>${dialogText}</p></div>`);
    $('.sagedialog-confirm').dialog
        ({
            height: 110,
            modal: true,
            resizable: false,
            draggable: false,
            close: function (event, ui) {
                $('body').find('.sagedialog-confirm').remove();
            },
            buttons:
            {
                "Yes": {
                    click: function () {
                        $(this).dialog('close');
                        clearInterval(countdownTimer);
                        window.location = window.location.href;
                        def.resolve();
                    },
                    text: 'Reload',
                    class: 'btn primary'
                },
                "No": {
                    click: function () {
                        $(this).dialog("close");
                        clearInterval(countdownTimer);
                        def.reject();
                    },
                    text: 'Cancel',
                    class: 'btn light'
                }
            },
            open: function (event, ui) {
                $('.ui-dialog-title').before('<i class="fa fa-check-square-o" aria-hidden="true"></i>');
            }
        });
    return def.promise();
}
function RemainingTime() {
    function timer() {
        let seconds = expiryTimeInSec;
        var days = Math.floor(seconds / 24 / 60 / 60);
        var hoursLeft = Math.floor((seconds) - (days * 86400));
        var hours = Math.floor(hoursLeft / 3600);
        var minutesLeft = Math.floor((hoursLeft) - (hours * 3600));
        var minutes = Math.floor(minutesLeft / 60);
        var remainingSeconds = seconds % 60;
        function pad(n) {
            return (n < 10 ? "0" + n : n);
        }
        // pad(days) + ":" + pad(hours) + ":" + pad(minutes) + ":" + pad(remainingSeconds);
        $('#countdown').text("You are going to logout in " + pad(minutes) + " min :" + pad(remainingSeconds) + ' sec');
        if (seconds == 0) {
            clearInterval(countdownTimer);

            $('#countdown').text("You session has been Expired");


        } else {
            seconds--;
        }
    }
    countdownTimer = setInterval(timer, 1000);
}
