$(function () {
    var EmailAnalytics = {
        config: {
            url: "/Dashboard/EmailAnalytics/"
        },
        Init: function () {
            this.Event();
            this.GetAllAnalytics();
        },
        Event: function () {
            $('#startDate').datepicker({
                dateFormat: "yy/mm/dd",
                numberOfMonths: 2,
                onClose: function (selectedDate) {
                    $("#endDate").datepicker("option", "minDate", selectedDate);
                }
            });
            $("#startDate").datepicker("setDate", "-1y");
            $('#endDate').datepicker({
                dateFormat: "yy/mm/dd",
                numberOfMonths: 2,
                onClose: function (selectedDate) {
                    $("#startDate").datepicker("option", "maxDate", selectedDate);
                }
            });
            $("#endDate").datepicker("setDate", new Date());
            $('#ui-datepicker-div').hide();
            $('#btnShowData').off('click').on('click', function () {
                EmailAnalytics.GetAllAnalytics();
            });
        },
        GetAllAnalytics: function () {
            var param = {
                StartDate: $("#startDate").val(),
                EndDate: $("#endDate").val()
            }
            var config = {
                data: param,
                url: EmailAnalytics.config.url + "GetAllAnalytics",
                async: false,
                success: function (data) {
                    EmailAnalytics.BindData(data);
                }
            };
            SecureAjaxCall.Call(config);
        },
        BindData: function (data) {
            let scheduledEmail = data.ScheduledMail;
            let deliveredEmail = data.DeliveredMail;
            EmailAnalytics.Counter(data);
            EmailAnalytics.SubscriberChart(data.SubscribedUsers, data.UnsubscribedUsers);
            EmailAnalytics.EmailMarkettingChart(deliveredEmail, scheduledEmail);
            EmailAnalytics.TopInterestChart(data.Interest);
        },
        SubscriberChart: function (subscribedUsers, unsubscribedUsers) {
            let monthlySubs = [];
            let monthlyUnSubs = [];
            if (subscribedUsers.length !== 0) {
                $.each(subscribedUsers, function (index, item) {
                    arrData = [];
                    arrData.push(item.Date.replace(/T00:00:00/g, ""));
                    arrData.push(item.Count);
                    monthlySubs.push(arrData);
                });
            } else {
                arrData = [];
                arrData.push(new Date());
                arrData.push(0);
                monthlySubs.push(arrData);
            }
            if (unsubscribedUsers.length !== 0) {
                $.each(unsubscribedUsers, function (index, item) {
                    arrData1 = [];
                    arrData1.push(item.Date.replace(/T00:00:00/g, ""));
                    arrData1.push(item.Count);
                    monthlyUnSubs.push(arrData1);
                });
            } else {
                arrData = [];
                arrData.push(new Date());
                arrData.push(0);
                monthlyUnSubs.push(arrData);
            }
            if (monthlySubs.length !== 0 || monthlyUnSubs.length !== 0) {
                $('#userChart').html('');
                var colorSubs = "#7CFC00";
                var colorUnSubs = "#8B0000";
                $('.color.subscribed-users').css('background', colorSubs);
                $('.color.unsubscribed-users').css('background', colorUnSubs);
                plot1 = $.jqplot('userChart', [monthlySubs, monthlyUnSubs], {
                    seriesDefaults: {
                        showMarker: true,
                        rendererOptions: {
                            smooth: true
                        },
                        pointLabels: { show: false }
                    },
                    axes: {
                        xaxis: {
                            renderer: $.jqplot.DateAxisRenderer,
                            tickOptions: {
                                formatString: '%b&nbsp;%#d'
                            }
                        },
                        yaxis: {
                            tickInterval: 5,
                            tickOptions: {
                                formatString: ''
                            }
                        }
                    },
                    cursor: {
                        show: true,
                        tooltipLocation: 'sw'
                    },
                    highlighter: { show: false },
                    legend: {
                        show: false,
                        location: 's',
                        placement: 'outside'
                    },
                    series: [
                        { lineWidth: 4, markerOptions: { style: 'square' } },
                        { label: 'Subscribed Users', color: colorSubs },
                        { label: 'Unsubscribed Users', color: colorUnSubs },
                    ],
                });
                $('.chart-legend').show();
            }
            else {
                $('#userChart').html('Data Not Found!');
                $('.chart-legend').hide();
            }
        },
        EmailMarkettingChart: function (deliveredEmail, scheduleEmail) {
            let monthlyDeliveredMail = [];
            if (deliveredEmail.length !== 0) {
                $.each(deliveredEmail, function (index, item) {
                    arrData = [];
                    arrData.push(item.Date.replace(/T00:00:00/g, ""));
                    arrData.push(item.Count);
                    monthlyDeliveredMail.push(arrData);
                });
            } else {
                arrData = [];
                arrData.push(new Date());
                arrData.push(0);
                monthlyDeliveredMail.push(arrData);
            }
            if (monthlyDeliveredMail !== 0) {
                $('#emailChart').html('');
                var plot1 = $.jqplot('emailChart', [monthlyDeliveredMail], {
                    title: '',
                    axes: {
                        xaxis: {
                            renderer: $.jqplot.DateAxisRenderer,
                            tickOptions: {
                                formatString: '%b&nbsp;%#d'
                            }
                        },
                        yaxis: {
                            tickInterval: 5,
                            tickOptions: {
                                formatString: ''
                            }
                        }
                    },
                    highlighter: {
                        show: false
                    },
                    cursor: {
                        show: true,
                        tooltipLocation: 'sw'
                    }
                });
            }
            else {
                $('#emailChart').html('Data Not Found!');
            }
        },
        TopInterestChart: function (interests) {
            let interestLst = [];
            let interestCount = [];
            if (interests.length !== 0) {
                $.each(interests, function (index, item) {
                    interestLst.push(item.Interest);
                    interestCount.push(item.Count);
                });
            }
            if (interestCount.length !== 0) {
                $('#interestId').html('');
                //$.jqplot.config.enablePlugins = true;
                plot1 = $.jqplot('interestId', [interestCount], {
                    // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
                    animate: !$.jqplot.use_excanvas,
                    seriesDefaults: {
                        renderer: $.jqplot.BarRenderer,
                        rendererOptions: {
                            varyBarColor: true
                        },
                        pointLabels: { show: true }
                    },
                    axes: {
                        xaxis: {
                            renderer: $.jqplot.CategoryAxisRenderer,
                            ticks: interestLst
                        }
                    },
                    highlighter: { show: false }
                });
                $('#interestId').bind('jqplotDataClick',
                    function (ev, seriesIndex, pointIndex, data) {
                        $('#info1').html('series: ' + seriesIndex + ', point: ' + pointIndex + ', data: ' + data);
                    }
                );
            } else {
                $('#interestId').html('Data Not Found!');
            }
        },
        Counter: function (countData) {
            let $count = $('.counts_values');
            $count.eq(0).html(EmailAnalytics.GetCountForCounter(countData.DeliveredMail));
            $count.eq(1).html(EmailAnalytics.GetCountForCounter(countData.ScheduledMail));
            $count.eq(2).html(EmailAnalytics.GetCountForCounter(countData.SubscribedUsers));
            $count.eq(3).html(EmailAnalytics.GetCountForCounter(countData.SubscribedUsers));
            $count.eq(4).html(EmailAnalytics.GetCountForCounter(countData.UnsubscribedUsers));
            $count.eq(5).html(countData.ImportedUsers[0].Count);
            EmailAnalytics.initAnimatCounter();
        },
        GetCountForCounter: function (count) {
            let cnt = 0;
            $.each(count, function (index, item) {
                cnt += parseInt(item.Count);
            });
            return cnt;
        },
        initAnimatCounter: function () {
            function animateCounter() {
                $(this).attr('data-animate', 1);
                $('.counts_values').each(function () {
                    $(this).prop('Counters', 0).animate({
                        Counters: $(this).text()
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text(Math.ceil(now));
                        }
                    });
                });
            }
            animateCounter();
        },
    }
    EmailAnalytics.Init();
});