var bar_chart = {
    "bar chart": {
        "componentname": "bar chart",
        "category": "advance",
        "icon": "fa fa-bar-chart",
        "row": false,
        "bucket": true,
        "hidden": false,
        "collection": true,
        "type": "graph",
        "defaultdata": EasyLibrary.ReadDOM('barchart/barchartdom'),
        "beforeDrop": function ($this) {
        },
        "afterdrop": function ($appendedParent, $appendLayer) {

            this.view.view($appendLayer.find('.barChartWrapper').attr('data-barSize'));
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM('barchart/barchartbasicsettings') + CreateSliderDOM('barWidthID', 'barWidthHandlerID', 'Bar Width'),
                    "onload": function ($this) {
                        let $parent = $this.closest('.SetHdlr').parent();
                        var barAxesColor = $parent.find('.barChartWrapper').attr('data-axescolor');
                        var barFontColor = $parent.find('.barChartWrapper').attr('data-barfontcolor');
                        var barTitle = $parent.find('.barTitle').text();
                        var chartScale = $parent.find('.barChartWrapper').attr('data-scale');
                        $('#ddlBarChartScaling').val(chartScale);
                        $("#txtBarChartTitle").val(barTitle);
                        $("#txtBarChartTitle").off().on("keyup", function () {
                            var value = $(this).val().trim();
                            var $elm = $parent.find('.barTitle');
                            $elm.text(value);
                        });
                        $('#ddlBarChartScaling').on('change', function () {
                            var val = $(this).val();
                            $parent.find('.barChartWrapper').attr('data-scale', val);
                            component['bar chart'].afterdrop($parent.parent(), $parent);
                        });
                        component['bar chart'].common.textSetting();
                        var fontWidth = $parent.find('.barChartWrapper').attr('data-barfontsize').replace('px', '');
                        function ListIconSizeSlider(space) {
                            $parent.find('.barChartWrapper').attr('data-barfontsize', space);
                            component['bar chart'].afterdrop($parent.parent(), $parent);
                            $parent.find('.labelIcon').css('font-size', space);
                        }
                        AdvanceSageSlider($('#barfontsizeSlider'), $('#barfontsizeHandle'), 10, 40, fontWidth, ListIconSizeSlider, $parent, 'px');

                        let barSize = $parent.find('.barChartWrapper').attr('data-barSize');
                        function barSizeSlider(space) {
                            $parent.find('.barChartWrapper').attr('data-barSize', space);
                            component['bar chart'].view.view(space);
                            //$parent.find('.labelIcon').css('font-size', space);
                        }
                        AdvanceSageSlider($('#barWidthID'), $('#barWidthHandlerID'), 5, 50, barSize, barSizeSlider, $parent, 'px');
                    },
                },
                "Data": {
                    "DOM": EasyLibrary.ReadDOM('barchart/barchartdatawrapper'),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent().parent().parent();
                        var eleIndex = -1;
                        var $barChartWrapper = $parent.find('.barChartWrapper');
                        var barData = $barChartWrapper.attr('data-value');
                        var barDataArray = JSON.parse(barData);
                        LoadData();
                        function LoadData() {
                            var $items = $parent.find('.barChartWrapper').attr('data-value');
                            var $count = JSON.parse($items).length;
                            var html = '';
                            $("#barChartEditWrapper").html('');
                            $.each(barDataArray, function (index, item) {
                                html += '<div class="field-row data-row">';
                                html += '<div class="field-row stElWrap col100">';
                                html += '<span class="fcol cPointer sfCol_6"><i class="fa  fa-arrows-v barSort"></i></span>';
                                html += '<span class="fcol pkrWrp sfCol_7">';
                                html += '<span class="color-picker-holder chooseColor chooseBarFontColor" style="background-color: ' + item.color + '"></span>';
                                html += '</span>';
                                html += '<span class="sfCol_40 Ml-5 cb_input">';
                                html += '<input type="text" maxlength="15" class=" indBarName" value="' + item.name + '"/>';
                                html += '</span>';
                                html += '<span class="sfCol_35 Ml-5 cb_input">';
                                html += '<input type="text" class="indBarValue" value="' + item.value + '"/>';
                                html += '</span>';
                                if ($count > 1) {
                                    html += '<span class="sfCol_7 Ml-5">';
                                    html += '<i title="delete" class=" in-form-icon fa fa-trash-o delete-icon deleteBar"></i>';
                                    html += '</span>';
                                }
                                html += '</div>';
                                html += '</div>';
                            });
                            $("#barChartEditWrapper").html(html);

                            var colorPickerOption = ColorPickerOption({
                                renderCallback: function ($elm, toggled) {
                                    var objColor = RenderCallBackColor(this);
                                    var dataIndex = $('#barChartEditWrapper').find('.data-row').index($elm.parent().parent().parent());
                                    barDataArray[dataIndex].color = objColor.bgColor;
                                    var jsonData = JSON.stringify(barDataArray);
                                    $barChartWrapper.attr('data-value', jsonData);
                                    component['bar chart'].afterdrop($parent.parent(), $parent);
                                }
                            });
                            $('.chooseBarFontColor').colorPicker(colorPickerOption);
                            InitAddMoreBarEvent();
                            InitBarEvents();
                        }
                        function InitBarEvents() {
                            $("#barChartEditWrapper .indBarName").off('keyup').on('keyup', function () {
                                var value = $(this).val().trim();
                                var dataIndex = $('#barChartEditWrapper').find('.data-row').index($(this).parent().parent().parent());
                                barDataArray[dataIndex].name = value;
                                var jsonData = JSON.stringify(barDataArray);
                                $barChartWrapper.attr('data-value', jsonData);
                                component['bar chart'].afterdrop($parent.parent(), $parent);
                            });

                            $("#barChartEditWrapper .indBarValue").off('keyup').on('keyup', function () {
                                var value = $(this).val().trim();
                                var dataIndex = $('#barChartEditWrapper').find('.data-row').index($(this).parent().parent().parent());
                                if (value.length == 0) {
                                    value = 0;
                                    barDataArray[dataIndex].value = value;
                                    var jsonData = JSON.stringify(barDataArray);
                                    $barChartWrapper.attr('data-value', jsonData);
                                    component['bar chart'].afterdrop($parent.parent(), $parent);
                                    $(this).attr('value', value);
                                    $(this).val(value);
                                } else if (isNaN(value)) {
                                    $(this).attr('value', barDataArray[dataIndex].value);
                                    $(this).val(barDataArray[dataIndex].value);
                                } else if (parseFloat(value) < 0) {
                                    $(this).attr('value', barDataArray[dataIndex].value);
                                    $(this).val(barDataArray[dataIndex].value);
                                } else {
                                    barDataArray[dataIndex].value = value;
                                    var jsonData = JSON.stringify(barDataArray);
                                    $barChartWrapper.attr('data-value', jsonData);
                                    component['bar chart'].afterdrop($parent.parent(), $parent);
                                }
                            });

                            $("#barChartEditWrapper").off('click').on('click', '.deleteBar', function () {
                                var $parent = $this.parent().parent().parent().parent();
                                var dataIndex = $('#barChartEditWrapper').find('.data-row').index($(this).parent().parent().parent());
                                barDataArray.splice(dataIndex, 1);
                                var jsonData = JSON.stringify(barDataArray);
                                $barChartWrapper.attr('data-value', jsonData);
                                $(this).parent().parent().parent().remove();
                                component['bar chart'].afterdrop($parent.parent(), $parent);
                                LoadData();
                            });


                            // sortable
                            $("#barChartEditWrapper").AdvanceSorting({

                                targetParent: $parent,
                                targetElem: '.barChart',
                                sortableOptions: {
                                    items: "div.data-row",
                                    handle: ".barSort",
                                    containment: '#barChartEditWrapper',
                                    start: function (event, ui) {
                                        //hide color
                                    },
                                    stop: function (event, ui) {
                                        barDataArray = [];
                                        $("#barChartEditWrapper").find(".data-row").each(function (i, o) {
                                            let obj = {
                                                id: i + 1,
                                                name: $(o).find('.indBarName').val(),
                                                value: $(o).find('.indBarValue').val(),
                                                color: $(o).find('.chooseBarFontColor').css('background-color')
                                            };
                                            barDataArray.push(obj);
                                            var jsonData = JSON.stringify(barDataArray);
                                            $barChartWrapper.attr('data-value', jsonData);
                                            component['bar chart'].afterdrop($parent.parent(), $parent);
                                        });
                                    }
                                }
                            });
                        }
                        function InitAddMoreBarEvent() {
                            $("#btnAddMoreBarData").off().on("click", function () {
                                var count = 1;
                                var html = '';
                                var $editParent = $('#barChartEditWrapper');
                                if ($editParent.find('.data-row').length > 0) {
                                    var html = '';
                                    var duplicateData = barDataArray[0];
                                    var itemCount = barDataArray.length;
                                    var $firstDom = $editParent.find('.data-row').eq(0);
                                    var attrClass = $firstDom.attr('class');
                                    html += '<div class="field-row data-row">';
                                    html += '<div class="field-row stElWrap col100">';
                                    html += '<span class="fcol cPointer sfCol_6"><i class="fa  fa-arrows-v barSort"></i></span>';
                                    html += '<span class="fcol pkrWrp sfCol_7">';
                                    html += '<span class="color-picker-holder chooseColor chooseBarFontColor" style="background-color: ' + duplicateData.color + '"></span>';
                                    html += '</span>';
                                    html += '<span class="sfCol_40 Ml-5 cb_input">';
                                    html += '<input type="text" maxlength="15" class=" indBarName" value="' + duplicateData.name + '"/>';
                                    html += '</span>';
                                    html += '<span class="sfCol_35 Ml-5 cb_input">';
                                    html += '<input type="text" class="indBarValue" value="' + duplicateData.value + '"/>';
                                    html += '</span>';
                                    html += '<span class="sfCol_7 Ml-5">';
                                    html += '<i title="delete" class=" in-form-icon fa fa-trash-o delete-icon deleteBar"></i>';
                                    html += '</span>';
                                    html += '</div>';
                                    html += '</div>';
                                    $editParent.prepend(html);
                                    var newData = {
                                        "id": itemCount + 1,
                                        "name": duplicateData.name,
                                        "value": duplicateData.value,
                                        "color": duplicateData.color
                                    };
                                    barDataArray.unshift(newData);

                                } else {
                                    html += '<div class="field-row data-row">';
                                    html += '<div class="field-row stElWrap col100">';
                                    html += '<span class="fcol sfCol_6"><i class="fa  fa-arrows-v barSort"></i></span>';
                                    html += '<span class="fcol sfCol_7">';
                                    html += '<span class="color-picker-holder chooseColor chooseBarFontColor" style="background-color:#A55CA5"></span>';
                                    html += '</span>';
                                    html += '<span class="sfCol_40 Ml-5 cb_input">';
                                    html += '<input type="text" maxlength="15" class=" indBarName" value="data 1" aria-invalid="false" type="text"/>';
                                    html += '</span>';
                                    html += '<span class="sfCol_35 Ml-5 cb_input">';
                                    html += '<input type="text" class="indBarValue" value="10" type="text"/>';
                                    html += '</span>';
                                    html += '<span class="sfCol_7 Ml-5">';
                                    html += '<i title="delete" class=" in-form-icon fa fa-trash-o delete-icon deleteBar"></i>';
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
                                    barDataArray.unshift(defaultData);

                                }

                                var jsonData = JSON.stringify(barDataArray);
                                $barChartWrapper.attr('data-value', jsonData);
                                component['bar chart'].afterdrop($parent.parent(), $parent);
                                var colorPickerOption = ColorPickerOption({
                                    renderCallback: function ($elm, toggled) {
                                        var objColor = RenderCallBackColor(this);
                                        var dataIndex = $('#barChartEditWrapper').find('.data-row').index($elm.parent().parent().parent());
                                        barDataArray[dataIndex].color = objColor.bgColor;
                                        var jsonData = JSON.stringify(barDataArray);
                                        $barChartWrapper.attr('data-value', jsonData);
                                        component['bar chart'].afterdrop($parent.parent(), $parent);
                                    }
                                });
                                $('.chooseBarFontColor').colorPicker(colorPickerOption);
                                LoadData();
                                InitBarEvents();
                            });
                        }
                    },
                },

                "Alignment": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('barchart/alignment'),
                    "onload": function ($item) {
                        component['bar chart'].common.alignment();
                    },
                    "active": function () {
                        $('#barChartAlignment').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#barChartAlignment').trigger('change').addClass('slcActiveEleSetting');
                    }
                }

            }
        },

        "styleDOMs": {
            "tabs": {
                "Color": {
                    "DOM": EasyLibrary.ReadDOM('barchart/barchartcolor'),
                    "onload": function ($this) {
                        var $parent = $this.parent().parent().parent().parent();
                        var barAxesColor = $parent.find('.barChartWrapper').attr('data-axescolor');
                        $('#chooseBarAxesColor').css('background-color', barAxesColor);
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.barChartWrapper').attr('data-axescolor', objColor.bgColor);
                                component['bar chart'].afterdrop($parent.parent(), $parent);
                            }
                        });
                        $('#chooseBarAxesColor').colorPicker(colorPickerOption);

                        var barFontColor = $parent.find('.barChartWrapper').attr('data-barfontcolor');
                        $('#chooseBarFontColor').css('background-color', barFontColor);
                        var colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.find('.barChartWrapper').attr('data-barfontcolor', objColor.bgColor);
                                component['bar chart'].afterdrop($parent.parent(), $parent);
                            }
                        });
                        $('#chooseBarFontColor').colorPicker(colorPickerOption);
                    }
                }
            }
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM('barchart/responsivebasic'),
                    "custom": true,
                    "onload": function () {
                        let options = {
                            width: false,
                            spacing: false
                        }
                        let dAlpha = ViewDeviceAlpha();
                        IsVisible();
                        component['bar chart'].common.textSetting(options); 

                        $("#barchartVisibility").html('');
                        $('#barchartVisibility').AdvanceVisibility({
                            targetParent: $activeDOM.parent(),
                            targetElem: $activeDOM
                        });
                        $('#barchartVisibility').off().on('change', function () {
                            IsVisible();
                        });
                        function IsVisible() {
                            if ($activeDOM.hasClass(dAlpha + 'Dn'))
                                $('#barChartText').removeClass('Dn').addClass('Dn');
                            else
                                $('#barChartText').removeClass('Dn');
                        }
                    }
                },

                "Alignment": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('barchart/alignment'),
                    "onload": function ($item) {
                        component['bar chart'].common.alignment();
                    },
                    "active": function () {
                        $('#barChartAlignment').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#barChartAlignment').trigger('change').addClass('slcActiveEleSetting');
                    }
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            }
        },
        "common": {
            "alignment": function () {
                var $parent = $activeDOM;
                let targetEle = $('#ddlBarChartAlign').val();
                alignment();
                $('#ddlBarChartAlign').off('change').on('change', function () {
                    targetEle = $(this).val();
                    $parent.find('.actEle').removeClass('actEle')
                        .end()
                        .find(targetEle).addClass('actEle');
                    alignment();
                })
                function alignment() {
                    $('#barChartAlignment').html('');
                    $('#barChartAlignment').AdvanceAlignment({
                        targetParent: $parent,
                        targetElem: targetEle
                    });
                }
            },
            "textSetting": function (options) {
                $("#barChartText").html('');
                $("#barChartText").AdvanceTextSetting({
                    targetParent: $activeDOM,
                    targetElem: '.barTitle',
                    options: options
                });
            }
        },

        "onsort": function (ui) {
            this.view.view();
        },
        "view": {
            "view": function ($size) {
                var myCanvasList = document.querySelectorAll(".barCanvas");
                let $p = $(".barChartWrapper");
                if ($size == undefined)
                    $size = $p.attr('data-barSize');
                var _this = this;
                if (myCanvasList.length == 0) {

                } else {
                    $.each(myCanvasList, function (index, item) {
                        var myCanvas = item;
                        var parentWidth = item.parentNode.offsetWidth;

                        parentWidth = Math.max(parentWidth, 250);
                        myCanvas.height = 350 / parentWidth * parentWidth;
                        myCanvas.width = parentWidth * 0.75;

                        var barAxesColor = item.parentNode.getAttribute('data-axescolor');
                        var barFontColor = item.parentNode.getAttribute('data-barfontcolor');
                        var barFontSize = item.parentNode.getAttribute('data-barfontsize');
                        //console.log(barFontSize);
                        var barChartData = item.parentNode.getAttribute('data-value');
                        var barData = JSON.parse(barChartData);
                        var barScaleFactor = item.parentNode.getAttribute('data-scale');
                        //alert(JSON.stringify(barData));
                        var ctx = myCanvas.getContext("2d");

                        _this.library.BarChart({
                            canvas: myCanvas,
                            seriesName: "Bar Chart",
                            padding: 20,
                            gridScale: barScaleFactor,
                            barAxesColor: barAxesColor,
                            barFontColor: barFontColor,
                            data: barData,
                            barFontSize: barFontSize,
                            barSize: $size
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

                "DrawBar": function (ctx, upperLeftCornerX, upperLeftCornerY, width, height, color) {
                    ctx.save();
                    ctx.fillStyle = color;
                    ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
                    ctx.restore();
                },

                "BarChart": function (options) {
                    this.options = options;
                    this.canvas = options.canvas;
                    this.ctx = this.canvas.getContext("2d");
                    //this.colors = options.colors;
                    var _this = this;
                    this.draw = function () {
                        //console.log(this.options);
                        var maxValue = 0;
                        var maxWidth = 0;
                        $.each(this.options.data, function (index, categ) {
                            //console.log(categ);
                            maxValue = Math.max(maxValue, categ.value);
                            maxWidth = Math.max(maxWidth, _this.ctx.measureText(categ.name).width);
                        });

                        //console.log(maxValue);

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
                                this.options.barAxesColor
                            );

                            //y-axis
                            _this.DrawLine(
                                this.ctx,
                                0,
                                0,
                                0,
                                gridY,
                                this.options.barAxesColor
                            );

                            //writing grid markers
                            this.ctx.save();

                            gridValue += parseInt(this.options.gridScale);
                            //alert(gridValue + this.options.gridScale);
                        }

                        //drawing the bars
                        var barIndex = 0;
                        var numberOfBars = this.options.data.length;
                        var barSize = (canvasActualWidth) / numberOfBars;
                        let width = this.options.barSize;
                        var textWidth = 0;
                        $.each(this.options.data, function (index, categ) {
                            var val = categ.value;
                            var barHeight = Math.round(canvasActualHeight * val / maxValue);



                            _this.DrawBar(
                                _this.ctx,
                                _this.options.padding + barIndex * barSize,
                                _this.canvas.height - barHeight - _this.options.padding,
                                width,
                                barHeight,
                                categ.color
                            );
                            textWidth = _this.ctx.measureText(categ.name).width;
                            var valueWidth = _this.ctx.measureText(categ.value).width;
                            _this.ctx.fillStyle = _this.options.barFontColor;
                            var fontSize = _this.options.barFontSize;
                            //console.log(fontSize);
                            _this.ctx.font = "bold " + parseInt(fontSize) + "px Arial";
                            _this.ctx.fillText(categ.name, (_this.options.padding + barIndex * barSize + 15) - textWidth / 2, _this.canvas.height);
                            _this.ctx.fillText(val, _this.options.padding + barIndex * barSize + 15 - valueWidth / 2, _this.canvas.height - barHeight - 30);

                            barIndex++;
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