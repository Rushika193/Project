(function ($) {
    $.createAnalyticsMgmt = function (p) {
        p = $.extend
            ({
                StatusID: 0
            }, p);

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var AnalyticsMgmt = {
            config: {
                baseURL: "/Dashboard/Analytics/",
                areaID: 0,
                StatusID: p.StatusID

            },
            RenderAnalyticsActivePages: function (data) {
                $("#tbodyActivepage").children().remove();
                var htmlActivePages = '';
                $.each(data, function (key, item) {
                    htmlActivePages += '<tr>';
                    htmlActivePages += '<td>' + (key + 1) + '</td>';
                    htmlActivePages += '<td>' + item.PageName + '</td>';
                    htmlActivePages += '<td>' + item.TotalView + '</td>';
                    htmlActivePages += '/<tr>';
                });
                $("#tbodyActivepage").html(htmlActivePages);

            },
            RenderAnalyticsUserChart: function (data) {
                var dateLabels = [];
                var userCounts = [];

                const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                if (data != null) {
                    $.each(data, function (key, item) {

                        dateLabels.push(item.AddedOn)
                        userCounts.push(item.CurrentUserCount)
                    });
                }
                var ctx = document.getElementById('divAnalyticsUser').getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: dateLabels,
                        datasets: [{
                            label: 'Current User',
                            data: userCounts,
                            backgroundColor: "#f7b500",
                            borderColor: "#f7b500",
                            fill: false
                        }]
                    },
                    options: {

                        scales: {
                            xAxes: [{
                                ticks: {
                                    // Include a dollar sign in the ticks
                                    callback: function (value, index, values) {

                                        var today = new Date(value);
                                        return monthNames[today.getMonth()] + ' ' + today.getDate();
                                    }
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
            },
            GetUserCountryValue: function (data, country) {
                var currentValues = $.grep(data, function (v) {
                    return v.Country != null && v.Country.toLowerCase() === country.toLowerCase();
                });

                if (currentValues.length > 0)
                    return currentValues[0].CurrentUserCount;
                else
                    return 0;

            },
            RenderAnalyticsUserDeviceChart: function (userDatas) {


                var deviceLabels = [];
                var userCounts = [];
                if (userDatas != null) {
                    $.each(userDatas, function (key, item) {
                        deviceLabels.push(item.Browser)
                        userCounts.push(item.CurrentUserCount)
                    });
                }

                var ctx = document.getElementById('divAnalyticsUserDevice').getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: deviceLabels,
                        datasets: [{
                            label: 'Current User By device',
                            data: userCounts,
                            backgroundColor: "#727cf5",
                            borderColor: "#727cf5",
                            fill: false
                        }]
                    },
                });

            },
            RenderAnalyticsTotalHeaderChart: function (data) {
                $("#spanTotalVisit").text(data.TotalVisit);
                $("#spanTotalBounceRate").text(data.BounceRate);
                $("#spanTotalSession").text(data.TotalSession);
                var xLabels = [];
                var yValueTotalSiteVisits = [], yValueTotalSiteSessions = [];

                if (data.TotalVisits != null) {
                    $.each(data.TotalVisits, function (key, item) {
                        xLabels.push(item.XLabel);
                        yValueTotalSiteVisits.push(item.Value);
                    });
                }

                var ctxTotalVisit = document.getElementById('canvasTotalVisit').getContext('2d');
                var myChartTotalVisit = new Chart(ctxTotalVisit, {
                    type: 'line',
                    data: {
                        labels: xLabels,
                        datasets: [{
                            //label: 'Current User By Country',
                            data: yValueTotalSiteVisits,
                            backgroundColor: "#0acf97",
                            borderColor: "#0acf97",
                            fill: true,
                        }]
                    },
                    options: {
                        scales: {
                            display: false,
                            yAxes: [
                                {
                                    gridLines: {
                                        lineWidth: 0
                                    },
                                    display: false
                                }
                            ],
                            xAxes: [
                                {
                                    gridLines: {
                                        lineWidth: 0
                                    },
                                    display: false
                                }
                            ]
                        },
                        legend: {
                            display: false
                        }
                    }
                });

                if (data.TotalSessions != null) {
                    $.each(data.TotalSessions, function (key, item) {
                        //  xLabels.push(item.XLabel);
                        yValueTotalSiteSessions.push(item.Value);
                    });
                }


                var ctxTotalSession = document.getElementById('canvasTotalSession').getContext('2d');
                var myChartTotalSessions = new Chart(ctxTotalSession, {
                    type: 'line',
                    data: {
                        labels: xLabels,
                        datasets: [{
                            data: yValueTotalSiteSessions,
                            backgroundColor: "#53a4ff",
                            borderColor: "#53a4ff",
                            fill: true,
                        }]
                    },
                    options: {
                        scales: {
                            display: false,
                            yAxes: [
                                {
                                    gridLines: {
                                        lineWidth: 0
                                    },
                                    display: false
                                }
                            ],
                            xAxes: [
                                {
                                    gridLines: {
                                        lineWidth: 0
                                    },
                                    display: false
                                }
                            ]
                        },
                        legend: {
                            display: false
                        }
                    }
                });


            },

            RenderAnalyticsBounceRateChart: function (bounceDatas) {
                var mainlabels = [], subLabels = [], values = [];
                $.each(bounceDatas, function (key, item) {

                    mainlabels.push(item.PageName);
                    var currentValue = [];
                    if (key == 0) {
                        $.each(item.analyticsBounceCategories, function (key1, item1) {
                            subLabels.push(item1.CategoryName);
                            //  currentValue.push(item1.BounceRate);
                            currentValue.push(key1 + 90);
                        });
                    }
                    else {
                        $.each(item.analyticsBounceCategories, function (key1, item1) {
                            //currentValue.push(item1.BounceRate);
                            currentValue.push(key1 + 5);
                        });
                    }
                    values.push(currentValue);
                });
                console.log(subLabels);
                var bounceDaa =

                {
                    //labels: ['Impressions', 'Add To Cart', 'Buy'],
                    labels: mainlabels,
                    //subLabels: ['Direct', 'Social Media'],
                    subLabels: subLabels,
                    colors: [
                        ['#FFB178', '#FF78B1', '#FF3C8E'],
                        ['#A0BBFF', '#EC77FF'],
                        ['#A0F9FF', '#7795FF']
                    ],
                    //    values: [
                    //        [500, 2500],
                    //        [3300, 1400],
                    //        [600, 200]
                    //]
                    values: values
                };

                var graphs = [];



                var graph = new FunnelGraph({
                    container: '#divAnalyticsBounceRate',
                    gradientDirection: 'horizontal',
                    data: bounceDaa,
                    displayPercent: true,
                    direction: 'horizontal',
                    width: 800,
                    height: 300,
                    subLabelValue: 'percent'
                });

                graph.draw();
                //  graphs.push(graph);


            },
            RenderAnalyticsUserCountryChart: function (userDatas) {

                fetch('https://unpkg.com/world-atlas/countries-50m.json')
                    .then((r) => r.json())
                    .then((data) => {
                        const countries = ChartGeo.topojson.feature(data, data.objects.countries).features;
                        const chart = new Chart(document.getElementById('divAnalyticsUserByCountry').getContext('2d'), {
                            type: 'choropleth',
                            data: {
                                labels: countries.map((d) => d.properties.name),
                                datasets: [
                                    {
                                        label: 'Countries',
                                        data: countries.map((d) => ({

                                            feature: d,
                                            value: AnalyticsMgmt.GetUserCountryValue(userDatas, d.properties.name),
                                        })),
                                    },
                                ],
                            },
                            options: {
                                showOutline: false,
                                showGraticule: false,
                                legend: {
                                    display: true,
                                },
                                scale: {
                                    projection: 'mercator',
                                },
                                onClick: (evt, elems) => {
                                    // console.log(elems.map((elem) => elem.feature.properties.name));
                                },
                                geo: {
                                    colorScale: {
                                        display: true,
                                    },
                                },
                            },
                        });
                    });
                //var countryLabels = [];
                //var userCounts = [];
                //for (var i = 0; i < data.length; i++) {
                //    countryLabels.push(data[i].Country)
                //    userCounts.push(data[i].CurrentUserCount)
                //}
                //var ctx = document.getElementById('divAnalyticsUserCountry').getContext('2d');
                //var myChart = new Chart(ctx, {
                //    type: 'bar',
                //    data: {
                //        labels: countryLabels,
                //        datasets: [{
                //            label: 'Current User By Country',
                //            data: userCounts,
                //            backgroundColor: "#5663ff",
                //            borderColor: "#5663ff",
                //            fill: false
                //        }]
                //    },
                //});

            },
            GetAnalyticsActivePages: function () {
                // console.log($("#dtFromCurrentUser").val());
                var analyticsUser = {
                    Type: 3,
                    UserMedium: "Normal",
                    FromDate: $("#dtFromCurrentUser").val(),
                    ToDate: $("#dtToCurrentUser").val()
                };
                $.ajax({
                    url: this.config.baseURL + `GetAnalyticsActivePages`,
                    type: "Post",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(analyticsUser),
                    datatype: "json",
                    success: function (result) {

                        AnalyticsMgmt.RenderAnalyticsActivePages(result);
                    },
                    error: function (jqXHR) {

                    },
                    complete: function (jqXHR, status) {

                    }


                });
            },
            GetAnalyticsUsers: function () {
                // console.log($("#dtFromCurrentUser").val());
                var analyticsUser = {
                    Type: 1,
                    UserMedium: "Normal",
                    FromDate: $("#dtFromCurrentUser").val(),
                    ToDate: $("#dtToCurrentUser").val()
                };
                $.ajax({
                    url: this.config.baseURL + `GetAnalyticsUser`,
                    type: "Post",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(analyticsUser),
                    datatype: "json",
                    success: function (result) {

                        AnalyticsMgmt.RenderAnalyticsUserChart(result);
                    },
                    error: function (jqXHR) {

                    },
                    complete: function (jqXHR, status) {

                    }


                });
            },
            GetAnalyticsUserDevice: function () {

                var analyticsUser = {
                    Type: 2,
                    UserMedium: "Device",
                    FromDate: $("#dtFromCurrentUserDevice").val(),
                    ToDate: $("#dtToCurrentUserDevice").val()

                };
                $.ajax({
                    url: this.config.baseURL + `GetAnalyticsUserDevice`,
                    type: "Post",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(analyticsUser),
                    datatype: "json",
                    success: function (result) {

                        AnalyticsMgmt.RenderAnalyticsUserDeviceChart(result);
                    },
                    error: function (jqXHR) {

                    },
                    complete: function (jqXHR, status) {

                    }


                });
            },
            GetAnalyticsUserCountry: function () {

                var analyticsUser = {
                    Type: 3,
                    UserMedium: "country",
                    FromDate: $("#dtFromCurrentUserCountry").val(),
                    ToDate: $("#dtToCurrentUserCountry").val()

                };
                $.ajax({
                    url: this.config.baseURL + `GetAnalyticsUserCountry`,
                    type: "Post",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(analyticsUser),
                    datatype: "json",
                    success: function (result) {

                        AnalyticsMgmt.RenderAnalyticsUserCountryChart(result);
                    },
                    error: function (jqXHR) {

                    },
                    complete: function (jqXHR, status) {

                    }


                });
            },
            GetAnalyticsHeaderCount: function () {
                var analyticsUser = {
                    Type: 2,
                    FromDate: "2020-01-01",
                    ToDate: "2020-01-01"

                };
                $.ajax({
                    url: this.config.baseURL + `GetTotalHeaderAnalyticsValues`,
                    type: "Post",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(analyticsUser),
                    datatype: "json",
                    success: function (result) {

                        AnalyticsMgmt.RenderAnalyticsTotalHeaderChart(result);
                    },
                    error: function (jqXHR) {

                    },
                    complete: function (jqXHR, status) {

                    }


                });
            },
            GetAnalyticsBounceRate: function () {
                var analyticsUser = {
                    Type: 1,
                    FromDate: $("#dtFromCurrentUserBounceRate").val(),
                    ToDate: $("#dtToCurrentUserBounceRate").val(),
                    PageName: $("#ddlBouncePageName").val()
                };
                $.ajax({
                    url: this.config.baseURL + `GetAnalyticsBounceRate`,
                    type: "Post",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(analyticsUser),
                    datatype: "json",
                    success: function (result) {

                        AnalyticsMgmt.RenderAnalyticsBounceRateChart(result);
                    },
                    error: function (jqXHR) {

                    },
                    complete: function (jqXHR, status) {

                    }


                });
            },
            LoadDatePicker: function () {
                //  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                var currentUserDate = "MM/dd/yy",
                    from = $("#dtFromCurrentUser")
                        .datepicker({
                            //   defaultDate: "+1d",
                            changeMonth: true,
                            numberOfMonths: 2
                        })
                        .on("change", function () {
                            to.datepicker("option", "minDate", getDate(this));
                        }),
                    to = $("#dtToCurrentUser").datepicker({
                        //defaultDate: "+1w",
                        changeMonth: true,
                        numberOfMonths: 2
                    })
                        .on("change", function () {
                            from.datepicker("option", "maxDate", getDate(this));
                        });

                var currentUserDeviceDate = "MM/dd/yy",
                    from = $("#dtFromCurrentUserDevice")
                        .datepicker({
                            defaultDate: "+1w",
                            changeMonth: true,
                            numberOfMonths: 2
                        })
                        .on("change", function () {
                            to.datepicker("option", "minDate", getDate(this));
                        }),
                    to = $("#dtToCurrentUserDevice").datepicker({
                        defaultDate: "+1w",
                        changeMonth: true,
                        numberOfMonths: 2
                    })
                        .on("change", function () {
                            from.datepicker("option", "maxDate", getDate(this));
                        });

                var currentUserCountryDate = "MM/dd/yy",
                    from = $("#dtFromCurrentUserCountry")
                        .datepicker({
                            defaultDate: "+1w",
                            changeMonth: true,
                            numberOfMonths: 2
                        })
                        .on("change", function () {
                            to.datepicker("option", "minDate", getDate(this));
                        }),
                    to = $("#dtToCurrentUserCountry").datepicker({
                        defaultDate: "+1w",
                        changeMonth: true,
                        numberOfMonths: 2
                    })
                        .on("change", function () {
                            from.datepicker("option", "maxDate", getDate(this));
                        });


                var currentBounceRateDate = "MM/dd/yy",
                    from = $("#dtFromCurrentUserBounceRate")
                        .datepicker({
                            defaultDate: "+1w",
                            changeMonth: true,
                            numberOfMonths: 2
                        })
                        .on("change", function () {
                            to.datepicker("option", "minDate", getDate(this));
                        }),
                    to = $("#dtToCurrentUserBounceRate").datepicker({
                        defaultDate: "+1w",
                        changeMonth: true,
                        numberOfMonths: 2
                    })
                        .on("change", function () {
                            from.datepicker("option", "maxDate", getDate(this));
                        });

                function getDate(element) {
                    var date;
                    try {
                        date = $.datepicker.parseDate(dateFormat, element.value);
                    } catch (error) {
                        date = null;
                    }

                    return date;
                };
                debugger;
                var last7Days = new Date();
                last7Days.setDate(last7Days.getDate() - 30);
                var today = new Date();

                var dtFrom = $.datepicker.formatDate('mm/dd/yy', last7Days);
                var dtTo = $.datepicker.formatDate('mm/dd/yy', today);
                console.log(dtFrom);
                var currentUserFrom = months[last7Days.getMonth()] + ' ' + last7Days.getDate();
                var currentUserto = months[today.getMonth()] + ' ' + today.getDate();

                $('#dtFromCurrentUser').datepicker("setDate", dtFrom);
                $('#dtToCurrentUser').datepicker('setDate', dtTo);

                $("#spanCurrentUserDateView").text(currentUserFrom + " - " + currentUserto);

                $('#dtFromCurrentUserDevice').datepicker('setDate', dtFrom);
                $('#dtToCurrentUserDevice').datepicker('setDate', dtTo);
                $("#spanCurrentUserDeviceDateView").text(currentUserFrom + " - " + currentUserto);

                $('#dtFromCurrentUserCountry').datepicker('setDate', dtFrom);
                $('#dtToCurrentUserCountry').datepicker('setDate', dtTo);
                $("#spanCurrentUserCountryDateView").text(currentUserFrom + " - " + currentUserto);

                $('#dtFromCurrentUserBounceRate').datepicker('setDate', dtFrom);
                $('#dtToCurrentUserBounceRate').datepicker('setDate', dtTo);
                $("#spanCurrentUserBounceRateDateView").text(currentUserFrom + " - " + currentUserto);
                $("#ui-datepicker-div").hide();
            },
            BindEvents: function () {
                AnalyticsMgmt.LoadDatePicker();

                $(document).on("click", "#btnCurrentUserApply", function () {
                    var fromDate = $("#dtFromCurrentUser").val();
                    var toDate = $("#dtToCurrentUser").val();
                    var dtFrom = new Date(fromDate);
                    var dtTo = new Date(toDate);
                    var currentUserFrom = months[dtFrom.getMonth()] + ' ' + dtFrom.getDate();
                    var currentUserto = months[dtTo.getMonth()] + ' ' + dtTo.getDate();
                    $("#spanCurrentUserDateView").text(currentUserFrom + " - " + currentUserto);
                    AnalyticsMgmt.GetAnalyticsUsers();
                    $("#divMainUserChart").removeClass('enable');
                });
                $(document).on("click", ".clscurrentuser", function () {

                    $("#divDatePickerCurrentUser").hide();
                    var self = this;
                    var fromDate = new Date(), toDate = new Date();
                    var aid = $(self).attr('aid');
                    if (aid == 'today') {
                        fromDate = new Date();
                        toDate = new Date();
                    }
                    else if (aid == 'yesterday') {
                        fromDate = new Date();
                        fromDate.setDate(fromDate.getDate() - 1);
                        toDate = new Date();
                    }
                    else if (aid == 'last7') {
                        fromDate = new Date();
                        fromDate.setDate(fromDate.getDate() - 7);
                        toDate = new Date();
                    }
                    else if (aid == 'last30') {
                        fromDate = new Date();
                        fromDate.setDate(fromDate.getDate() - 30);
                        toDate = new Date();
                    }
                    else if (aid == 'custom') {
                        $("#divDatePickerCurrentUser").show();
                    }

                    var dtFrom = $.datepicker.formatDate('mm/dd/yy', fromDate);
                    var dtTo = $.datepicker.formatDate('mm/dd/yy', toDate);

                    $('#dtFromCurrentUser').datepicker('setDate', dtFrom);
                    $('#dtToCurrentUser').datepicker('setDate', dtTo);

                    var currentUserFrom = months[fromDate.getMonth()] + ' ' + fromDate.getDate();
                    var currentUserto = months[toDate.getMonth()] + ' ' + toDate.getDate();
                    $("#spanCurrentUserDateView").text(currentUserFrom + " - " + currentUserto);
                    AnalyticsMgmt.GetAnalyticsUsers();
                    $("#divMainUserChart").removeClass('enable');
                });


                $(document).on("click", "#btnCurrentUserDeviceApply", function () {
                    var fromDate = $("#dtFromCurrentUserDevice").val();
                    var toDate = $("#dtToCurrentUserDevice").val();
                    var dtFrom = new Date(fromDate);
                    var dtTo = new Date(toDate);

                    var currentUserFrom = months[dtFrom.getMonth()] + ' ' + dtFrom.getDate();
                    var currentUserto = months[dtTo.getMonth()] + ' ' + dtTo.getDate();
                    $("#spanCurrentUserDeviceDateView").text(currentUserFrom + " - " + currentUserto);
                    AnalyticsMgmt.GetAnalyticsUserDevice();
                    $("#divMainUserDeviceChart").removeClass("enable");
                });
                $(document).on("click", ".clscurrentuserdevice", function () {
                    debugger;
                    $("#divDatePickerCurrentUserDevice").hide();
                    var self = this;
                    var fromDate = new Date(), toDate = new Date();
                    var aid = $(self).attr('aid');
                    if (aid == 'today') {
                        fromDate = new Date();
                        toDate = new Date();
                    }
                    else if (aid == 'yesterday') {
                        fromDate = new Date();
                        fromDate.setDate(fromDate.getDate() - 1);
                        toDate = new Date();
                    }
                    else if (aid == 'last7') {
                        fromDate = new Date();
                        fromDate.setDate(fromDate.getDate() - 7);
                        toDate = new Date();
                    }
                    else if (aid == 'last30') {
                        fromDate = new Date();
                        fromDate.setDate(fromDate.getDate() - 30);
                        toDate = new Date();
                    }
                    else if (aid == 'custom') {
                        $("#divDatePickerCurrentUserDevice").show();
                    }
                    var dtFrom = $.datepicker.formatDate('mm/dd/yy', fromDate);
                    var dtTo = $.datepicker.formatDate('mm/dd/yy', toDate);

                    $('#dtFromCurrentUserDevice').datepicker('setDate', dtFrom);
                    $('#dtToCurrentUserDevice').datepicker('setDate', dtTo);

                    var currentUserFrom = months[fromDate.getMonth()] + ' ' + fromDate.getDate();
                    var currentUserto = months[toDate.getMonth()] + ' ' + toDate.getDate();
                    $("#spanCurrentUserDeviceDateView").text(currentUserFrom + " - " + currentUserto);
                    AnalyticsMgmt.GetAnalyticsUserDevice();
                    $("#divMainUserDeviceChart").removeClass("enable");
                });


                $(document).on("click", "#btnCurrentUserCountryApply", function () {
                    var fromDate = $("#dtFromCurrentUserCountry").val();
                    var toDate = $("#dtToCurrentUserCountry").val();
                    var dtFrom = new Date(fromDate);
                    var dtTo = new Date(toDate);
                    var currentUserFrom = months[dtFrom.getMonth()] + ' ' + dtFrom.getDate();
                    var currentUserto = months[dtTo.getMonth()] + ' ' + dtTo.getDate();
                    $("#spanCurrentUserCountryDateView").text(currentUserFrom + " - " + currentUserto);
                    AnalyticsMgmt.GetAnalyticsUserCountry();
                    $("#divMainUserCountryChart").removeClass("enable");
                });
                $(document).on("click", ".clscurrentusercountry", function () {

                    $("#divDatePickerCurrentUserCountry").hide();
                    var self = this;
                    var fromDate = new Date(), toDate = new Date();
                    var aid = $(self).attr('aid');
                    if (aid == 'today') {
                        fromDate = new Date();
                        toDate = new Date();
                    }
                    else if (aid == 'yesterday') {
                        fromDate = new Date();
                        fromDate.setDate(fromDate.getDate() - 1);
                        toDate = new Date();
                    }
                    else if (aid == 'last7') {
                        fromDate = new Date();
                        fromDate.setDate(fromDate.getDate() - 7);
                        toDate = new Date();
                    }
                    else if (aid == 'last30') {
                        fromDate = new Date();
                        fromDate.setDate(fromDate.getDate() - 30);
                        toDate = new Date();
                    }
                    else if (aid == 'custom') {
                        $("#divDatePickerCurrentUserCountry").show();
                    }
                    var dtFrom = $.datepicker.formatDate('mm/dd/yy', fromDate);
                    var dtTo = $.datepicker.formatDate('mm/dd/yy', toDate);

                    $('#dtFromCurrentUserCountry').datepicker('setDate', dtFrom);
                    $('#dtToCurrentUserCountry').datepicker('setDate', dtTo);

                    var currentUserFrom = months[fromDate.getMonth()] + ' ' + fromDate.getDate();
                    var currentUserto = months[toDate.getMonth()] + ' ' + toDate.getDate();
                    $("#spanCurrentUserCountryDateView").text(currentUserFrom + " - " + currentUserto);
                    AnalyticsMgmt.GetAnalyticsUserCountry();
                    $("#divMainUserCountryChart").removeClass("enable");
                });

                $(document).on("click", "#btnCurrentUserBounceRateApply", function () {
                    var fromDate = $("#dtFromCurrentUserBounceRate").val();
                    var toDate = $("#dtToCurrentUserBounceRate").val();
                    var dtFrom = new Date(fromDate);
                    var dtTo = new Date(toDate);
                    var currentUserFrom = months[dtFrom.getMonth()] + ' ' + dtFrom.getDate();
                    var currentUserto = months[dtTo.getMonth()] + ' ' + dtTo.getDate();
                    $("#spanCurrentUserBounceRateDateView").text(currentUserFrom + " - " + currentUserto);
                    AnalyticsMgmt.GetAnalyticsBounceRate();
                    $("#divMainBounceRateChart").removeClass("enable");
                });
                $(document).on("click", ".clscurrentuserbouncerate", function () {

                    $("#divDatePickerCurrentUserBounceRate").hide();
                    var self = this;
                    var fromDate = new Date(), toDate = new Date();
                    var aid = $(self).attr('aid');
                    if (aid == 'today') {
                        fromDate = new Date();
                        toDate = new Date();
                    }
                    else if (aid == 'yesterday') {
                        fromDate = new Date();
                        fromDate.setDate(fromDate.getDate() - 1);
                        toDate = new Date();
                    }
                    else if (aid == 'last7') {
                        fromDate = new Date();
                        fromDate.setDate(fromDate.getDate() - 7);
                        toDate = new Date();
                    }
                    else if (aid == 'last30') {
                        fromDate = new Date();
                        fromDate.setDate(fromDate.getDate() - 30);
                        toDate = new Date();
                    }
                    else if (aid == 'custom') {
                        $("#divDatePickerCurrentUserBounceRate").show();
                    }

                    var dtFrom = $.datepicker.formatDate('mm/dd/yy', fromDate);
                    var dtTo = $.datepicker.formatDate('mm/dd/yy', toDate);

                    $('#dtFromCurrentUserBounceRate').datepicker('setDate', dtFrom);
                    $('#dtToCurrentUserBounceRate').datepicker('setDate', dtTo);

                    var currentUserFrom = months[fromDate.getMonth()] + ' ' + fromDate.getDate();
                    var currentUserto = months[toDate.getMonth()] + ' ' + toDate.getDate();
                    $("#spanCurrentUserBounceRateDateView").text(currentUserFrom + " - " + currentUserto);
                    AnalyticsMgmt.GetAnalyticsBounceRate();
                    $("#divMainBounceRateChart").removeClass("enable");
                });

            },
            init: function () {
                AnalyticsMgmt.BindEvents();
                AnalyticsMgmt.GetAnalyticsUsers();
                AnalyticsMgmt.GetAnalyticsHeaderCount();
                AnalyticsMgmt.GetAnalyticsUserDevice();
                AnalyticsMgmt.GetAnalyticsUserCountry();
                AnalyticsMgmt.GetAnalyticsBounceRate();
                AnalyticsMgmt.GetAnalyticsActivePages();
            }
        };
        AnalyticsMgmt.init();
    };
    $.fn.AnalyticsMgmt = function (p) {
        $.createAnalyticsMgmt(p);
    };
})(jQuery);