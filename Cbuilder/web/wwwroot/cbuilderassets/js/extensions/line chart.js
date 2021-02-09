var line_chart = {
    "line chart": {
        "componentname": "line chart",
        "category": "advance",
        "icon": "fa fa-line-chart",
        "row": false,
        "hidden": false,
        "collection": true,
        "type": "graph",
        "bucket": true,
        "defaultdata": EasyLibrary.ReadDOM('linechart/linechartdom'),
        "beforeDrop": function ($this) {

        },
        "afterdrop": function ($appendedParent, $appendLayer) {
            this.view.view();
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM('linechart/linechartbasicsettings'),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent().parent().parent();
                        var lineTitle = $parent.find('.lineTitle').text();
                        var chartScale = $parent.find('.lineChartWrapper').attr('data-scale');


                        $('#ddlLineChartScaling').val(chartScale);
                        $("#txtLineChartTitle").val(lineTitle);
                        $("#txtLineChartTitle").off().on("keyup", function () {
                            var value = $(this).val().trim();
                            var $elm = $parent.find('.lineTitle');
                            $elm.text(value);
                        });

                        $('#ddlLineChartScaling').on('change', function () {
                            var val = $(this).val();
                            $parent.find('.lineChartWrapper').attr('data-scale', val);
                            component['line chart'].afterdrop($parent.parent(), $parent);
                        });


                    }
                },
                "Title": {
                    "DOM": "<div id='textLinkSet'></div>",
                    "onload": function ($item) {
                        let $parent = $item.closest('.SetHdlr').parent();
                        $("#textLinkSet").AdvanceTextSetting({
                            targetParent: $parent,
                            targetElem: '.lineTitle',
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
                    }

                },
                "Data": {
                    "DOM": EasyLibrary.ReadDOM('linechart/linechartdatawrapper'),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent().parent().parent();
                        var eleIndex = -1;

                        var $lineChartWrapper = $parent.find('.lineChartWrapper');
                        var lineData = $lineChartWrapper.attr('data-value');
                        var lineDataArray = JSON.parse(lineData);

                        LoadData();
                        InitLineEvents();
                        InitAddMoreLineEvent();

                        function LoadData() {
                            var html = '';
                            $("#lineChartEditWrapper").html('');

                            $.each(lineDataArray, function (index, item) {
                                html += '<div class="field-row data-row">';
                                html += '<div class="field-row stElWrap sfCol_100">';

                                html += '<span class="fcol sfCol_6 cPointer TxAl-l"><i class="fa fa-arrows-v barSort"></i></span>';
                                html += '<span class="sfCol_2"></span>';
                                html += '<span class="sfCol_50  cb_input ">';
                                html += '<input type="text" maxlength="15" class=" indLineName" value="' + item.name + '"/>';
                                html += '</span>';
                                html += '<span class="sfCol_2"></span>';
                                html += '<span class="sfCol_30  cb_input">';
                                html += '<input type="text" class=" indLineValue" value="' + item.value + '"/>';
                                html += '</span>';

                                html += '<span class="sfCol_10 deleteLineContainer TxAl-r">';
                                html += '<i title="delete" class=" in-form-icon fa fa-trash-o delete-icon deleteLine"></i>';
                                html += '</span>';

                                html += '</div>';
                                html += '</div>';
                            });
                            $("#lineChartEditWrapper").html(html);

                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    var dataIndex = $('#lineChartEditWrapper').find('.data-row').index($elm.parent().parent().parent());

                                    lineDataArray[dataIndex].color = objColor.bgColor;

                                    var jsonData = JSON.stringify(lineDataArray);
                                    $lineChartWrapper.attr('data-value', jsonData);
                                    component['line chart'].afterdrop($parent.parent(), $parent);
                                }
                            });
                            $('.chooseLineFontColor').colorPicker(colorPickerOption);

                        }


                        function InitLineEvents() {
                            $("#lineChartEditWrapper .indLineName").off('keyup').on('keyup', function () {
                                var value = $(this).val().trim();
                                var dataIndex = $('#lineChartEditWrapper').find('.data-row').index($(this).parent().parent().parent());

                                lineDataArray[dataIndex].name = value;
                                var jsonData = JSON.stringify(lineDataArray);
                                $lineChartWrapper.attr('data-value', jsonData);
                                component['line chart'].afterdrop($parent.parent(), $parent);
                            });

                            $("#lineChartEditWrapper .indLineValue").off('keyup').on('keyup', function () {
                                var value = $(this).val().trim();
                                var dataIndex = $('#lineChartEditWrapper').find('.data-row').index($(this).parent().parent().parent());

                                if (value.length == 0) {
                                    value = 0;
                                    lineDataArray[dataIndex].value = value;

                                    var jsonData = JSON.stringify(lineDataArray);
                                    $lineChartWrapper.attr('data-value', jsonData);
                                    component['line chart'].afterdrop($parent.parent(), $parent);
                                    $(this).attr('value', value);
                                    $(this).val(value);
                                } else if (isNaN(value)) {
                                    $(this).attr('value', lineDataArray[dataIndex].value);
                                    $(this).val(lineDataArray[dataIndex].value);
                                } else if (parseFloat(value) < 0) {
                                    $(this).attr('value', lineDataArray[dataIndex].value);
                                    $(this).val(lineDataArray[dataIndex].value);
                                } else {
                                    lineDataArray[dataIndex].value = value;

                                    var jsonData = JSON.stringify(lineDataArray);
                                    $lineChartWrapper.attr('data-value', jsonData);
                                    component['line chart'].afterdrop($parent.parent(), $parent);
                                }
                            });

                            $("#lineChartEditWrapper").off('click').on('click', '.deleteLine', function () {
                                let childrenCount = $('#lineChartEditWrapper').children().length;
                                if (--childrenCount < 2)
                                    $('.deleteLine').hide();

                                var dataIndex = $('#lineChartEditWrapper').find('.data-row').index($(this).parent().parent().parent());

                                lineDataArray.splice(dataIndex, 1);

                                var jsonData = JSON.stringify(lineDataArray);
                                $lineChartWrapper.attr('data-value', jsonData);
                                $(this).parent().parent().parent().remove();
                                component['line chart'].afterdrop($parent.parent(), $parent);
                            });

                            $("#lineChartEditWrapper").AdvanceSorting({
                                targetParent: $parent,
                                targetElem: '.lineChartWrapper',
                                sortableOptions: {
                                    items: "div.data-row",
                                    handle: ".barSort",
                                    containment: '#lineChartEditWrapper',
                                    stop: function (event, ui) {
                                        lineDataArray = [];
                                        $("#lineChartEditWrapper").find(".data-row").each(function (i, o) {
                                            let obj = {
                                                id: i + 1,
                                                name: $(o).find('.indLineName').val(),
                                                value: $(o).find('.indLineValue').val(),
                                                color: $(o).find('.chooseLineFontColor').css('background-color')
                                            };
                                            lineDataArray.unshift(obj);

                                            var jsonData = JSON.stringify(lineDataArray);
                                            $lineChartWrapper.attr('data-value', jsonData);
                                            component['line chart'].afterdrop($parent.parent(), $parent);
                                        });

                                    }
                                }
                            });
                        }

                        function InitAddMoreLineEvent() {

                            $("#btnAddMoreLineData").off('click').on("click", function () {
                                var html = '';
                                var $editParent = $('#lineChartEditWrapper');
                                if ($editParent.find('.data-row').length > 0) {
                                    var $editHtml = '';
                                    var duplicateData = lineDataArray[0];
                                    var itemCount = lineDataArray.length;
                                    var $firstDom = $editParent.find('.data-row').eq(0);
                                    var attrClass = $firstDom.attr('class');
                                    $editHtml += '<div class="' + attrClass + '">';
                                    $editHtml += '<div class="field-row stElWrap col100">';
                                    $editHtml += '<span class="fcol sfCol_6 cPointer TxAl-l"><i class="fa fa-arrows-v barSort"></i></span>';
                                    $editHtml += '<span class="sfCol_2"></span>';
                                    $editHtml += '<span class="sfCol_50  cb_input ">';
                                    $editHtml += '<input type="text" maxlength="15" class="indLineName" value="' + duplicateData.name + '"/>';
                                    $editHtml += '</span>';
                                    $editHtml += '<span class="sfCol_2"></span>';
                                    $editHtml += '<span class="sfCol_30 cb_input">';
                                    $editHtml += '<input type="text"  class="indLineValue" value="' + duplicateData.value + '"/>';
                                    $editHtml += '</span>';
                                    $editHtml += '<span class="TxAl-r deleteLineContainer sfCol_10">';
                                    $editHtml += '<i title="delete" class="in-form-icon fa fa-trash-o delete-icon deleteLine"></i>';
                                    $editHtml += '</span>';
                                    $editHtml += '</div>';
                                    $editHtml += '</div>';
                                    $editParent.prepend($editHtml);
                                    var $deleteContainer = $('.deleteLineContainer');
                                    $.each($deleteContainer, function (i, val) {
                                        $(val).children().show();
                                    });

                                    var newData = {
                                        "id": itemCount + 1,
                                        "name": duplicateData.name,
                                        "value": duplicateData.value,
                                        "color": duplicateData.color
                                    };

                                    lineDataArray.unshift(newData);
                                } else {
                                    html += '<div class="field-row data-row">';
                                    html += '<div class="field-row stElWrap col100">';
                                    html += '<span class="fcol sfCol_6 cPointer TxAl-l"><i class="fa fa-arrows-v barSort"></i></span>';
                                    html += '<span class="sfCol_2"></span>';
                                    html += '<span class="sfCol_50  cb_input ">';
                                    html += '<input type="text" maxlength="15" class="indLineName" value="data 1"/>';
                                    html += '</span>';
                                    html += '<span class="sfCol_2"></span>';
                                    html += '<span class="sfCol_30 cb_input">';
                                    html += '<input type="text"  class="indLineValue" value="10" />';
                                    html += '</span>';
                                    html += '<span class="TxAl-r deleteLineContainer sfCol_10">';
                                    html += '<i title="delete" class="in-form-icon fa fa-trash-o delete-icon deleteLine"></i>';
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
                                    lineDataArray.unshift(defaultData);
                                }

                                var jsonData = JSON.stringify(lineDataArray);
                                $lineChartWrapper.attr('data-value', jsonData);
                                component['line chart'].afterdrop($parent.parent(), $parent);

                                var colorPickerOption = ColorPickerOption({
                                    renderCallback: function ($elm, toggled) {
                                        var objColor = RenderCallBackColor(this);
                                        var dataIndex = $('#lineChartEditWrapper').find('.data-row').index($elm.parent().parent().parent());

                                        lineDataArray[dataIndex].color = objColor.bgColor;

                                        var jsonData = JSON.stringify(lineDataArray);
                                        $lineChartWrapper.attr('data-value', jsonData);
                                        component['line chart'].afterdrop($parent.parent(), $parent);
                                    }
                                });
                                $('.chooseLineFontColor').colorPicker(colorPickerOption);
                                InitLineEvents();
                            });
                        }
                    }
                },
                "Alignment": {
                    "custom": true,
                    "DOM": `<div>
                            <div id="titleAlignDOM"></div>
                            <div id="canvasAlignDOM"></div>
                            </div>`,
                    "onload": function ($item) {
                        let $parent = $item.closest('.SetHdlr').parent();


                        $('#titleAlignDOM').AdvanceAlignment({
                            targetParent: $parent,
                            targetElem: $('.lineTitle').parent(),
                            labels: {
                                'horizontal': 'Title'
                            }
                        });

                        $('#canvasAlignDOM').AdvanceAlignment({
                            targetParent: $parent,
                            targetElem: '.lineChartWrapper ',
                            labels: {
                                'horizontal': 'Chart'
                            }
                        });

                    }
                }
            }
        },
        "styleDOMs": {
            "tabs": {
                "Style": {
                    "DOM": EasyLibrary.ReadDOM('linechart/lineChartColor'),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent().parent().parent();
                        var fontWidth = $parent.find('.lineChartWrapper').attr('data-linefontsize').replace('px', '');
                        var titleFontColor = $parent.find('.lineTitle').css('color');
                        var gridColor = $parent.find('.lineChartWrapper').attr('data-lineaxescolor');
                        var lineColor = $parent.find('.lineChartWrapper').attr('data-linecolor');
                        var labelFontColor = $parent.find('.lineChartWrapper').attr('data-linefontcolor');


                        function ListIconSizeSlider(space) {
                            $parent.find('.lineChartWrapper').attr('data-linefontsize', space);
                            component['line chart'].afterdrop($parent.parent(), $parent);
                            $parent.find('.labelIcon').css('font-size', space);
                        }
                        AdvanceSageSlider($('#linefontsizeSlider'), $('#linefontsizeHandle'), 10, 40, fontWidth, ListIconSizeSlider, $parent, 'px');

                        $('#chooseLinetitleColor').css('background-color', titleFontColor);
                        var colorPickerOptionTitleFont = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.lineTitle').css('color', objColor.bgColor);
                            }
                        });
                        $('#chooseLinetitleColor').colorPicker(colorPickerOptionTitleFont);


                        $('#chooseAxesLineColor').css('background-color', gridColor);
                        var colorPickerOptionGrid = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.lineChartWrapper').attr('data-lineaxescolor', objColor.bgColor);
                                component['line chart'].afterdrop($parent.parent(), $parent);
                            }
                        });
                        $('#chooseAxesLineColor').colorPicker(colorPickerOptionGrid);

                        $('#chooseLineColor').css('background-color', lineColor);
                        var colorPickerOptionLine = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.lineChartWrapper').attr('data-linecolor', objColor.bgColor);
                                component['line chart'].afterdrop($parent.parent(), $parent);
                            }
                        });
                        $('#chooseLineColor').colorPicker(colorPickerOptionLine);

                        $('#chooseLineFontColor').css('background-color', labelFontColor);
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.lineChartWrapper').attr('data-linefontcolor', objColor.bgColor);
                                component['line chart'].afterdrop($parent.parent(), $parent);
                            }
                        });
                        $('#chooseLineFontColor').colorPicker(colorPickerOption);

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
        "onsort": function (ui) {
            this.view.view();
        },
        "view": {
            "view": function () {
                var myCanvasList = document.querySelectorAll(".lineCanvas");
                var _this = this;
                if (myCanvasList.length == 0) {

                } else {
                    $.each(myCanvasList, function (index, item) {
                        var myCanvas = item;
                        var parentWidth = item.parentNode.offsetWidth;

                        parentWidth = Math.max(parentWidth, 250);
                        myCanvas.height = 350 / parentWidth * parentWidth;
                        myCanvas.width = parentWidth * 0.75;

                        var lineColor = item.parentNode.getAttribute('data-linecolor');
                        var lineaxesColor = item.parentNode.getAttribute('data-lineaxescolor');
                        var lineFontColor = item.parentNode.getAttribute('data-linefontcolor');
                        var lineFontSize = item.parentNode.getAttribute('data-linefontsize');
                        //console.log(barFontSize);
                        var lineChartData = item.parentNode.getAttribute('data-value');
                        var lineData = JSON.parse(lineChartData);
                        var lineScaleFactor = item.parentNode.getAttribute('data-scale');
                        //alert(JSON.stringify(barData));


                        var ctx = myCanvas.getContext("2d");

                        _this.library.LineChart({
                            canvas: myCanvas,
                            seriesName: "Line Chart",
                            padding: 20,
                            gridScale: lineScaleFactor,
                            lineColor: lineColor,
                            lineaxesColor: lineaxesColor,
                            lineFontColor: lineFontColor,
                            data: lineData,
                            lineFontSize: lineFontSize
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

                "LineChart": function (options) {
                    this.options = options;
                    this.canvas = options.canvas;
                    this.ctx = this.canvas.getContext("2d");
                    var _this = this;
                    this.draw = function () {
                        var maxValue = 0;
                        var maxWidth = 0;
                        $.each(this.options.data, function (index, categ) {
                            maxValue = Math.max(maxValue, categ.value);
                            maxWidth = Math.max(maxWidth, _this.ctx.measureText(categ.name).width);
                        });
                        var canvasActualHeight = this.canvas.height - this.options.padding * 2;
                        var canvasActualWidth = this.canvas.width - this.options.padding * 2;

                        //drawing the grid lines
                        var gridValue = 0;
                        var entered = 0;
                        while (gridValue <= maxValue) {
                            entered++;
                            var gridY = canvasActualHeight * (1 - gridValue / maxValue) + this.options.padding;

                            //x-axis
                            _this.DrawLine(
                                this.ctx,
                                0,
                                gridY,
                                this.canvas.width,
                                gridY,
                                this.options.lineaxesColor
                            );

                            //y-axis
                            _this.DrawLine(
                                this.ctx,
                                0,
                                0,
                                0,
                                gridY,
                                this.options.lineaxesColor
                            );

                            //writing grid markers
                            this.ctx.save();

                            gridValue += parseInt(this.options.gridScale);
                        }

                        //drawing the lines
                        var lineIndex = 0;
                        var numberOfLines = this.options.data.length;
                        var lineSize = (canvasActualWidth) / numberOfLines;

                        var textWidth = 0;


                        _this.ctx.beginPath();
                        _this.ctx.strokeStyle = _this.options.lineColor;


                        $.each(this.options.data, function (index, categ) {
                            var val = categ.value;
                            var lineHeight = Math.round(canvasActualHeight * val / maxValue);

                            var xaxis = _this.options.padding + lineIndex * lineSize;
                            var yaxis = _this.canvas.height - lineHeight - _this.options.padding;

                            _this.ctx.lineTo(xaxis, yaxis);
                            _this.ctx.stroke();

                            textWidth = _this.ctx.measureText(categ.name).width;
                            var valueWidth = _this.ctx.measureText(categ.value).width;
                            _this.ctx.fillStyle = _this.options.lineFontColor;
                            var fontSize = _this.options.lineFontSize;
                            _this.ctx.font = "bold " + parseInt(fontSize) + "px Arial";
                            _this.ctx.fillText(categ.name, (xaxis + 15) - textWidth / 2, _this.canvas.height);
                            _this.ctx.fillText(val, xaxis - 5, _this.canvas.height - lineHeight - 30);

                            lineIndex++;
                        });
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