var pie_chart = {
    "pie chart": {
        "componentname": "pie chart",
        "category": "advance",
        "icon": "fa fa-pie-chart",
        "row": false,
        "hidden": false,
        "bucket": true,
        "collection": true,
        "type": "graph",
        "defaultdata": EasyLibrary.ReadDOM('piechart/piechartdom'),
        "beforeDrop": function ($this) {

        },
        "afterdrop": function ($appendedParent, $appendLayer) {
            this.view.view();
        },
        "onsort": function (ui) {
            this.view.view();
        },
        "settingDOMs": {
            "tabs": {
                "Title": {
                    "DOM": `<div id="titleTextWrap"></div>`,
                    "onload": function ($item) {
                        let $parent = $item.closest('.SetHdlr').parent();
                        $("#titleTextWrap").AdvanceTextSetting({
                            targetParent: $parent,
                            targetElem: '.pieTitle',
                            options: {
                                size: true,
                                width: true,
                                spacing: true,
                                transform: true,
                                family: true,
                                weight: true,
                                color: true
                            }
                        });
                        $('#titleTextWrap').prepend(EasyLibrary.ReadDOM('piechart/piechartbasicsettings'));
                        let barTitle = $parent.find('.pieTitle').text();
                        $("#txtPieChartTitle").val(barTitle);
                        $("#txtPieChartTitle").off('keyup').on("keyup", function () {
                            let value = $(this).val().trim();

                            let $elm = $parent.find('.pieTitle');
                            $elm.text(value);
                        });
                    }
                },
                "Data": {
                    "DOM": EasyLibrary.ReadDOM('piechart/pieChartDataWrapper'),
                    "onload": function ($item) {
                        var $parent = $item.parents('.pieChart');
                        var eleIndex = -1;

                        var $pieChartWrapper = $parent.find('.pieChartWrapper');
                        var pieData = $pieChartWrapper.attr('data-value');

                        var pieDataArray = JSON.parse(pieData);

                        LoadData();
                        InitPieEvents();
                        InitAddMorePieEvent();

                        function LoadData() {
                            var html = '';
                            $("#pieChartEditWrapper").html('');

                            $.each(pieDataArray, function (index, item) {
                                html += '<div class="field-row data-row">';
                                html += '<div class="field-row stElWrap col100">';
                                html += '<span class="sfCol_6 TxAl-l cPointer"><i class="fa fa-arrows-v sortHandle"></i></span>';
                                html += '<span class="sfCol_2"></span>';
                                html += '<span class="fcol sfCol_10"> ';
                                html += '<span class="color-picker-holder chooseColor choosePieFontColor" style="background-color: ' + item.color + '"></span>';
                                html += '</span>';
                                html += '<span class="sfCol_40  cb_input">';
                                html += '<input type="text" maxlength="15" class=" indPieName" value="' + item.name + '"/>';
                                html += '</span>';
                                html += '<span class="sfCol_2"></span>';
                                html += '<span class="sfCol_30 cb_input">';
                                html += '<input type="text" class="indPieValue" value="' + item.value + '"/>';
                                html += '</span>';
                                html += '<span class="sfCol_10 deletePieContainer TxAl-r">';
                                html += '<i title="delete" class=" in-form-icon fa fa-trash-o delete-icon deletePie"></i>';
                                html += '</span>';
                                html += '</div>';
                                html += '</div>';
                            });
                            $("#pieChartEditWrapper").html(html);

                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    var dataIndex = $('#pieChartEditWrapper').find('.data-row').index($elm.parent().parent().parent());

                                    pieDataArray[dataIndex].color = objColor.bgColor;
                                    var jsonData = JSON.stringify(pieDataArray);
                                    $pieChartWrapper.attr('data-value', jsonData);
                                    component['pie chart'].afterdrop($parent.parent(), $parent);
                                }
                            });
                            $('.choosePieFontColor').colorPicker(colorPickerOption);

                        }


                        function InitPieEvents() {

                            $("#pieChartEditWrapper .indPieName").off('keyup').on('keyup', function () {
                                var value = $(this).val().trim();
                                var dataIndex = $('#pieChartEditWrapper').find('.data-row').index($(this).parent().parent().parent());

                                pieDataArray[dataIndex].name = value;
                                var jsonData = JSON.stringify(pieDataArray);
                                $pieChartWrapper.attr('data-value', jsonData);
                                component['pie chart'].afterdrop($parent.parent(), $parent);
                            });

                            $("#pieChartEditWrapper .indPieValue").off('keyup').on('keyup', function () {
                                var value = $(this).val().trim();
                                var dataIndex = $('#pieChartEditWrapper').find('.data-row').index($(this).parent().parent().parent());

                                if (value.length == 0) {
                                    value = 0;
                                    pieDataArray[dataIndex].value = value;
                                    var jsonData = JSON.stringify(pieDataArray);
                                    $pieChartWrapper.attr('data-value', jsonData);
                                    component['pie chart'].afterdrop($parent.parent(), $parent);
                                    $(this).attr('value', value);
                                    $(this).val(value);
                                } else if (isNaN(value)) {
                                    $(this).attr('value', pieDataArray[dataIndex].value);
                                    $(this).val(pieDataArray[dataIndex].value);
                                } else if (parseFloat(value) < 0) {
                                    $(this).attr('value', pieDataArray[dataIndex].value);
                                    $(this).val(pieDataArray[dataIndex].value);
                                } else {
                                    pieDataArray[dataIndex].value = value;
                                    var jsonData = JSON.stringify(pieDataArray);
                                    $pieChartWrapper.attr('data-value', jsonData);
                                    component['pie chart'].afterdrop($parent.parent(), $parent);
                                }
                            });

                            $("#pieChartEditWrapper .deletePie").off('click').on('click', function () {
                                let childrenCount = $('#pieChartEditWrapper').children().length;
                                if (--childrenCount < 2)
                                    $('.deletePie').hide();
                                var dataIndex = $('#pieChartEditWrapper').find('.data-row').index($(this).parent().parent().parent());

                                pieDataArray.splice(dataIndex, 1);
                                var jsonData = JSON.stringify(pieDataArray);
                                $pieChartWrapper.attr('data-value', jsonData);
                                $(this).parent().parent().parent().remove();
                                component['pie chart'].afterdrop($parent.parent(), $parent);
                            });

                            var sortParams = {
                                targetParent: $parent,
                                targetElem: '.pieChart',
                                sortableOptions: {
                                    items: 'div.data-row',
                                    handle: '.sortHandle',
                                    containment: "#pieChartEditWrapper",
                                    start: function (event, ui) { },
                                    stop: function (event, ui) {
                                        pieDataArray = [];
                                        $('#pieChartEditWrapper').find('.data-row').each(function (index, object) {
                                            let obj = {
                                                id: index + 1,
                                                name: $(object).find('.indPieName').val(),
                                                value: $(object).find('.indPieValue').val(),
                                                color: $(object).find('.choosePieFontColor').css('background-color')
                                            };
                                            pieDataArray.push(obj);
                                            var jsonData = JSON.stringify(pieDataArray);
                                            $pieChartWrapper.attr('data-value', jsonData);
                                            component['pie chart'].afterdrop($parent.parent(), $parent);
                                        });
                                    }
                                }
                            };
                            $('#pieChartEditWrapper').AdvanceSorting(sortParams);
                        }
                        function getRandomColor() {
                            let colors = [];
                            for (let i = 0; i < 3; i++) {
                                colors.push(Math.floor(Math.random() * Math.floor(256)));
                            }
                            return `rgb(${colors})`;
                        }

                        function InitAddMorePieEvent() {
                            $("#btnAddMorePieData").off().on("click", function () {
                                let randomColor = getRandomColor();
                                var html = '';
                                var $editParent = $('#pieChartEditWrapper');

                                if ($editParent.find('.data-row').length > 0) {
                                    var $editHtml = '';
                                    var duplicateData = pieDataArray[0];
                                    var itemCount = pieDataArray.length;
                                    var $firstDom = $editParent.find('.data-row').eq(0);
                                    var attrClass = $firstDom.attr('class');
                                    $editHtml += '<div class="' + attrClass + '">';
                                    $editHtml += '<div class="field-row stElWrap col100">';
                                    $editHtml += '<span class="sfCol_6 TxAl-l cPointer"><i class="fa fa-arrows-v sortHandle"></i></span>';
                                    $editHtml += '<span class="sfCol_2"></span>';
                                    $editHtml += '<span class="fcol sfCol_10"> ';
                                    $editHtml += '<span class="color-picker-holder chooseColor choosePieFontColor" style="background-color: ' + randomColor + '"></span>';
                                    $editHtml += '</span>';
                                    $editHtml += '<span class="sfCol_40  cb_input">';
                                    $editHtml += '<input type="text" maxlength="15" class="indPieName valid" value="' + duplicateData.name + '"/>';
                                    $editHtml += '</span>';
                                    $editHtml += '<span class="sfCol_2"></span>';
                                    $editHtml += '<span class="sfCol_30 cb_input">';
                                    $editHtml += '<input type="text" class="indPieValue" value="' + duplicateData.value + '"/>';
                                    $editHtml += '</span>';
                                    $editHtml += '<span class="sfCol_10 deletePieContainer TxAl-r">';
                                    $editHtml += '<i title="delete" class="in-form-icon fa fa-trash-o delete-icon deletePie"></i>';
                                    $editHtml += '</span>';
                                    $editHtml += '</div>';
                                    $editHtml += '</div>';
                                    $editParent.prepend($editHtml);
                                    var $deleteContainer = $('.deletePieContainer');
                                    $.each($deleteContainer, function (i, val) {
                                        $(val).children().show();
                                    });

                                    var newData = {
                                        "id": itemCount + 1,
                                        "name": duplicateData.name,
                                        "value": duplicateData.value,
                                        "color": randomColor
                                    };



                                    pieDataArray.unshift(newData);
                                } else {
                                    html += '<div class="field-row data-row">';
                                    html += '<div class="field-row stElWrap col100">';
                                    html += '<span class="sfCol_6 TxAl-l cPointer"><i class="fa fa-arrows-v sortHandle"></i></span>';
                                    html += '<span class="sfCol_2"></span>';
                                    html += '<span class="sfCol_10">';
                                    html += '<span class="color-picker-holder chooseColor choosePieFontColor" style="background-color: #A55CA5;"></span>';
                                    html += '</span>';
                                    html += '<span class="sfCol_40  cb_input">';
                                    html += '<input type="text" maxlength="15" class="indPieName valid" value="data 1"  />';
                                    html += '</span>';
                                    html += '<span class="sfCol_2"></span>';
                                    html += '<span class="sfCol_30 cb_input">';
                                    html += '<input class=" indPieValue" value="10" type="text"/>';
                                    html += '</span>';
                                    html += '<span class="sfCol_10 deletePieContainer TxAl-r">';
                                    html += '<i title="delete" class="  in-form-icon fa fa-trash-o delete-icon deletePie"></i>';
                                    html += '</span>';
                                    html += '</div>';
                                    html += '</div>';
                                    $editParent.prepend(html);

                                    var defaultData = {
                                        "id": 1,
                                        "name": "data 1",
                                        "value": 10,
                                        "color": "#A55CA5"
                                    };
                                    pieDataArray.unshift(defaultData);
                                }

                                var jsonData = JSON.stringify(pieDataArray);
                                $pieChartWrapper.attr('data-value', jsonData);
                                component['pie chart'].afterdrop($parent.parent(), $parent);

                                var colorPickerOption = ColorPickerOption({
                                    renderCallback: function ($elm, toggled) {
                                        var objColor = RenderCallBackColor(this);
                                        var dataIndex = $('#pieChartEditWrapper').find('.data-row').index($elm.parent().parent().parent());

                                        pieDataArray[dataIndex].color = objColor.bgColor;
                                        var jsonData = JSON.stringify(pieDataArray);
                                        $pieChartWrapper.attr('data-value', jsonData);
                                        component['pie chart'].afterdrop($parent.parent(), $parent);
                                    }
                                });
                                $('.choosePieFontColor').colorPicker(colorPickerOption);


                                InitPieEvents();

                            });
                        }

                    }
                },
                "Legend": {
                    "DOM": `<div id="legendTextWrap"></div>` + CreateColorPickerDOM("Font Color",'labelColor',''),
                    "onload": function ($item) {
                        let $parent = $item.closest('.SetHdlr').parent();
                        $("#legendTextWrap").AdvanceTextSetting({
                            targetParent: $parent,
                            targetElem: '.pieLegend>.cGrid>.Dib',
                            options: {
                                size: true,
                                width: true,
                                spacing: true,
                                transform: true,
                                family: true,
                                weight: true,
                                color: false
                            }
                        });
                        let $colorCircle = $('#labelColor');
                        let $pieWrap=$parent.find('.pieChartWrapper');
                        let legends = $parent.find('.pieLegend>.cGrid>.Dib');
                        let color = $pieWrap.attr('data-labelColor');
                        $colorCircle.css('background-color', color)
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                legends.css({ 'color': objColor.bgColor });
                                $pieWrap.attr('data-labelColor', objColor.bgColor)
                            }
                        });
                        $colorCircle.colorPicker(colorPickerOption);

                        
                    }
                },
                "Alignment": {
                    "custom": true,
                    "DOM": `<div>
                            <div id="titleAlignDOM"></div>
                            <div id="canvasAlignDOM"></div>
                            <div id="legendAlignDOM"></div>
                            </div>`,
                    "onload": function ($item) {
                        let $parent = $item.closest('.SetHdlr').parent();


                        $('#titleAlignDOM').AdvanceAlignment({
                            targetParent: $parent,
                            targetElem: $('.pieTitle').parent(),
                            options: {
                                "horizontal": ["left", "center", "right"]
                            },
                            labels: {
                                'horizontal': 'Title'
                            }
                        });

                        $('#canvasAlignDOM').AdvanceAlignment({
                            targetParent: $parent,
                            targetElem: '.pieChartWrapper ',
                            options: {
                                "horizontal": ["left", "center", "right"]
                            },
                            labels: {
                                'horizontal': 'Chart'
                            }
                        });

                        $('#legendAlignDOM').AdvanceAlignment({
                            targetParent: $parent,
                            targetElem: '.pieLegend',
                            options: {
                                "horizontal": ["left", "center", "right"]
                            },
                            labels: {
                                'horizontal': 'Legend'
                            }
                        });

                    }
                }
            }
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "Visibility": {}
                    }
                }
            }
        },
        "view": {
            "view": function () {
                
                var myCanvasList = document.querySelectorAll(".pieCanvas");

                var _this = this;
                if (myCanvasList.length == 0) {

                } else {
                    $.each(myCanvasList, function (index, item) {
                        var myCanvas = item;//pieCanvas
                        let piWrapper = item.parentNode;
                        var parentWidth = piWrapper.offsetWidth;//border+padding+netWidth
                        parentWidth = Math.max(parentWidth, 250);
                        myCanvas.height = parentWidth * 0.6;
                        myCanvas.width = parentWidth * 0.6;

                        var pieFontColor = piWrapper.getAttribute('data-piefontcolor');
                        var pieChartData = piWrapper.getAttribute('data-value');
                        var pieChartFont = piWrapper.getAttribute('data-piefontsize');
                        let labelColor = piWrapper.getAttribute('data-labelColor');
                        var pieData = JSON.parse(pieChartData);

                        var ctx = myCanvas.getContext("2d");
                        
                        var myLegend = piWrapper.children[2];

                        _this.library.PieChart({
                            canvas: myCanvas,
                            seriesName: "Pie Chart",
                            padding: 20,
                            pieFontColor: pieFontColor,
                            data: pieData,
                            legend: myLegend,
                            width: parentWidth,
                            pieChartFont: pieChartFont,
                            labelColor
                        });
                    });
                }
            },
            "library": {
                "DrawLine": function (ctx, startX, startY, endX, endY, color) {
                    ctx.save();
                    ctx.strokeStyle = color;
                    ctx.beginPath();
                    ctx.moveTo(startX, startY);
                    ctx.lineTo(endX, endY);
                    ctx.stroke();
                    ctx.restore();
                },

                "DrawArc": function (ctx, centerX, centerY, radius, startAngle, endAngle, color) {
                    ctx.save();
                    ctx.strokeStyle = color;
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
                    ctx.stroke();
                    ctx.restore();
                },

                "DrawPieSlice": function (ctx, centerX, centerY, radius, startAngle, endAngle, color) {
                    ctx.fillStyle = color;
                    ctx.beginPath();
                    ctx.moveTo(centerX, centerY);
                    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
                    ctx.closePath();
                    ctx.fill();
                },

                "PieChart": function (options) {
                    this.options = options;
                    this.canvas = options.canvas;
                    this.ctx = this.canvas.getContext("2d");
                    //this.colors = options.colors;
                    var _this = this;
                    this.draw = function () {
                        var total_value = 0;
                        var maxValue = 0;
                        var maxWidth = 0;
                        $.each(this.options.data, function (index, categ) {
                            //console.log(categ);
                            total_value += parseFloat(categ.value);
                        });

                        var start_angle = 0;

                        var textWidth = 0;
                        $.each(this.options.data, function (index, categ) {
                            var val = parseFloat(categ.value);

                            var slice_angle = 2 * Math.PI * val / total_value;
                            _this.DrawPieSlice(
                                _this.ctx,
                                _this.canvas.width / 2,
                                _this.canvas.height / 2,
                                Math.min(_this.canvas.width / 2, _this.canvas.height / 2),
                                start_angle,
                                start_angle + slice_angle,
                                categ.color
                            );


                            var pieRadius = Math.min(_this.canvas.width / 2, _this.canvas.height / 2);
                            var labelX = _this.canvas.width / 2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
                            var labelY = _this.canvas.height / 2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);


                            var labelText = Math.round(100 * val / total_value);
                            _this.ctx.fillStyle = _this.options.pieFontColor;

                            var fontSize = _this.options.pieChartFont;
                            //console.log("bold " + parseInt(fontSize) + "px Arial");
                            _this.ctx.font = "bold " + parseInt(fontSize) + "px Arial";
                            _this.ctx.fillText(labelText + "%", labelX, labelY);


                            start_angle += slice_angle;


                        });

                        if (_this.options.legend) {
                            var legendHTML = "";
                            var fontSize = _this.options.width / 500 * 12;
                            
                            let labelColor = _this.options.labelColor;

                            var html = '<div class="cGrid position-absolute" style="top: 20px; right:20px;">';
                            if ((_this.options.width * 0.6) < 250) {
                                html = '<div  style="top: 20px; left:20px;">';
                            }
                            $.each(this.options.data, function (index, categ) {
                                html += `<div class="Pa-5 Dib sfCol_25 Fs-17" style="color:${labelColor};"><span style="display:inline-block; width:20px; background-color:${categ.color};">&nbsp;</span>${categ.name}</div>`;
                            });

                            html += '</div>';
                            _this.options.legend.innerHTML = html;
                        }

                    };

                    this.draw();
                }
            }
        },
        "resize": function () {
            this.view.view();
        }
    }
};