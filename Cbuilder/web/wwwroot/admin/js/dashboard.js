// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.


String.prototype.ToBoolean = function () {

    try {
        return this.toLowerCase() === 'true';
    }
    catch (err) {
        //ActionMessage(err.message, MessageType.Error);
        return;
    }
};

String.prototype.removeScript = function () {
    if (typeof (this) === "string")
        return this.replaceAll('<[^>]*>', '');
};

function ConvertUTCDateToLocalDate(date) {
    date = new Date(date);
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);
    return newDate.toLocaleString();
}

function ConvertLocalDateToUTCDate(date) {
    date = new Date(date);
    var newUtcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    return newUtcDate.toLocaleString();
}


(function ($) {
    $.fn.CreatePagination = function (p) {
        p = $.extend({ total: 0, limit: 10, currentpage: 0 }, p);
        var $ths = $(this);
        $ths.addClass('sfPagination');
        var objParam = GetSearchQuery();
        if (typeof objParam['offset'] !== 'undefined') {
            p.currentpage = objParam.offset / p.limit;
        }
        if (p.total > p.limit) {
            $ths.show().pagination(p.total, {
                items_per_page: p.limit,
                current_page: p.currentpage,
                num_edge_entries: 2,
                callfunction: true,
                function_name: {
                    name: RedirectToPage,
                    limit: p.limit
                },
                prev_text: ' ',
                next_text: ' '
            });
        } else {
            $ths.hide();
        }
    };
    function RedirectToPage(offset, limit, current) {
        var param = $.extend(GetSearchQuery(), {
            offset: current * limit,
            limit: limit
        });
        var query = decodeURIComponent($.param(param));
        var winLoc = window.location;
        winLoc.href = winLoc.origin + winLoc.pathname + '?' + query;
    }

})(jQuery);

$(function () {
    if ($('body').find('.form-header-top').length > 0) {
        var top = $('nav.navbar').height();
        $(document).scroll(function () {
            if ($(window).scrollTop() >= top) {
                $('.form-header-top').addClass('sticky').css('top', top);
                $('.form-header-top').removeClass('sfRow');
            } else {
                $('.form-header-top').removeClass('sticky');
                $('.form-header-top').addClass('sfRow');
            }
        });
    }
});