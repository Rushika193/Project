var policyinfo = {
    "Policy Info": {
        "componentname": "Policy Info",
        "category": "advance",
        "icon": "fa fa-exclamation",
        "bucket": true,
        "hidden": false,
        "dependent": ["rich text", "button"],
        "defaultdata": EasyLibrary.ReadDOM("policyinfo/view", false),
        "onsort": function (ui) { },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (dropped) {
                $appendLayer.find('.divRichText').LightTextEditor();
            }
            this.inheritSettings();
        },
        "settingDOMs": {
            "tabs": {
                "Basics": {
                    "DOM": EasyLibrary.ReadDOM("policyinfo/basic", false),
                    "onload": function ($item) {
                        let $parent = $activeDOM;
                        let rDn = ViewDeviceAlpha() + "Dn";
                        let rDib = ViewDeviceAlpha() + "Dib";
                        forResponsive();
                        if (!$parent.find(".paBtn").hasClass(rDn)) {
                            $("#showHideButton").prop("checked", true);
                        }
                        if (!$parent.find(".closePAlert").hasClass(rDn)) {
                            $("#showHideIcon").prop("checked", true);
                        } else {
                            $("#closeIconColor").hide();
                            $("#closeBtn").hide();
                        }
                        var posType = $parent.attr("data-posType");
                        if (posType !== "fixed") {
                            $(".fixCompPos").hide();
                        }
                        if (posType !== "popup") {
                            $("#pbgcolor").closest(".field-row").hide();
                        }
                        $("#posType").val(posType);
                        $("#posType").off("change").on("change", function () {
                            var posType = $(this).val();
                            $parent.attr("data-posType", posType);
                            if (posType === "fixed") {
                                $(".fixCompPos").show();
                                $("#pbgcolor").closest(".field-row").hide();
                            } else if (posType === "popup") {
                                $("#pbgcolor").closest(".field-row").show();
                                $(".fixCompPos").hide();
                            } else {
                                $("#pbgcolor").closest(".field-row").hide();
                                $(".fixCompPos").hide();
                            }
                        });
                        $(`#alertPos>i[title="${$parent.attr("data-pos")}"]`).addClass("selected");
                        $("#alertPos>i").off("click").on("click", function () {
                            $(this).siblings().removeClass("selected");
                            $(this).addClass("selected");
                            $parent.attr("data-pos", $(this).attr("title"));
                        });
                        $("#showHideIcon").off("click").on("click", function () {
                            let isChecked = $(this).is(":checked");
                            $parent.find(".closePAlert").toggleClass(rDn, !isChecked).toggleClass(rDib, isChecked);
                            $("#closeIconColor").toggle(isChecked);
                            $("#closeBtn").toggle(isChecked);
                        });
                        $("#showHideButton").off("click").on("click", function () {
                            let isChecked = $(this).is(":checked");
                            $parent.find(".paBtn").toggleClass(rDn, !isChecked).toggleClass(rDib, isChecked);
                        });
                        $("#width").AdvanceWidthSlider({
                            targetParent: $parent,
                            targetElem: ".policy-alert.wrapper"
                        });
                        $("#width").find(".ui-slider-handle").attr("title", "Policy Message Width");
                        $("#rTWidth").AdvanceWidthSlider({
                            targetParent: $parent,
                            targetElem: $parent.find(".editor-component.richText")
                        });
                        $("#rTWidth").find(".ui-slider-handle").attr("title", "Text Width");

                        $("#compHeight").AdvanceDimension({
                            targetParent: $parent,
                            targetElem: ".policy-alert.wrapper",
                            label: "Component Height",
                            type: "height",
                            min: 20,
                            max: 1080,
                            defaultValue: $parent.height()
                        });
                        $('#color').css('background-color', $(".closePAlert").css('color'));
                        let colorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $(".closePAlert").css({ "color": objColor.bgColor });
                            }
                        });
                        $('#color').colorPicker(colorPickerOption);

                        $('#pbgcolor').css('background-color', $parent.attr("data-pbg"));
                        let pcolorPickerOption = ColorPickerOption({
                            renderCallback: function ($elm, toggled) {
                                var objColor = RenderCallBackColor(this);
                                $parent.attr("data-pbg", objColor.bgColor);
                            }
                        });
                        $('#pbgcolor').colorPicker(pcolorPickerOption);

                        $('#closeBtn').AdvanceTextSetting({
                            targetParent: $parent,
                            targetElem: ".closePAlert",
                            options: {
                                size: true,
                                width: false,
                                spacing: false,
                                transform: false,
                                family: false,
                                weight: false,
                                color: false,
                                lineheight: false
                            }
                        });
                        $('#closeBtn .ui-slider-handle').attr('title', 'Close Button Size');
                        function forResponsive() {
                            if (ViewDeviceAlpha() !== "") {
                                $("#posType").closest(".field-row").hide();
                                $("#color").closest(".field-row").hide();
                                $("#pbgcolor").closest(".field-row").hide();
                                $(".field-row.fixCompPos").hide();
                            }
                        }
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": "<div id='paMr'></div><div id='paPd'></div>",
                    "onload": function ($this) {
                        var $parent = $activeDOM;
                        $("#paMr").AdvanceSpacing({
                            targetParent: $parent,
                            targetElem: $parent,
                            options: {
                                "margin": {
                                    "max": 40,
                                    "min": -40,
                                    "times": 5,
                                    "position": ["all", "top", "bottom", "left", "right"]
                                }
                            }
                        });
                        $("#paPd").AdvanceSpacing({
                            targetParent: $parent,
                            targetElem: ".policy-alert.wrapper",
                            options: {
                                "padding": {
                                    "max": 40,
                                    "min": -40,
                                    "times": 5,
                                    "position": ["all", "top", "bottom", "left", "right"]
                                }
                            }
                        });
                    }
                },
                "Alignment": {
                    "custom": true,
                    "DOM": "<div id='paAl'></div>",
                    "onload": function ($this) {
                        var $parent = $activeDOM;
                        $("#paAl").AdvanceAlignment({
                            targetParent: $parent,
                            targetElem: $parent,
                            "options": {
                                "horizontal": ["left", "center", "right"]
                            }
                        });
                    }
                },
                "Text": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM("policyinfo/text"),
                    "onload": function () {
                        var $parent = $activeDOM;
                        $("#applyTxtOn").off("change").on("change", function () {
                            txtStng($($(this).val()));
                        });
                        function txtStng($target) {
                            $("#txtSetting").AdvanceTextSetting({
                                targetParent: $parent,
                                targetElem: $target,
                                options: {
                                    size: true,
                                    lineheight: true,
                                    width: false,
                                    spacing: true,
                                    transform: true,
                                    family: true,
                                    weight: true,
                                    color: true
                                }
                            });
                        }
                    },
                    "active": function () {
                        $("#applyTxtOn").val($(".slcActiveEleSetting").eq(0).val());
                        $(".slcActiveEleSetting").removeClass("slcActiveEleSetting");
                        $("#applyTxtOn").trigger("change").addClass("slcActiveEleSetting");
                    }
                }
            }
        },
        "styleDOMs": {
            "tabs": {
                "Background": {
                    "custom": true,
                    "DOM": "<div id='paBg'></div>",
                    "onload": function (item) {
                        var $parent = $activeDOM;
                        $("#paBg").AdvanceBackground({
                            targetParent: $parent,
                            targetElem: ".policy-alert.wrapper",
                            options: ["image", "color"]
                        });
                    }
                },
                "Border": {
                    "custom": true,
                    "DOM": "<div id='paBdr'></div>",
                    "onload": function (item) {
                        var $parent = $activeDOM;
                        $("#paBdr").AdvanceBorder({
                            targetParent: $parent,
                            targetElem: ".policy-alert.wrapper",
                            options: {
                                "max": 20,
                                "min": 0,
                                "times": 1,
                                "position": ["all", "top", "right", "bottom", "left"]
                            }
                        });
                    }
                },
                "Box Radius": {
                    "custom": true,
                    "DOM": "<div id='paBr'></div>",
                    "onload": function (item) {
                        var $parent = $activeDOM;
                        $("#paBr").AdvanceBoxRadius({
                            targetParent: $parent,
                            targetElem: ".policy-alert.wrapper",
                            "options": {
                                "max": 200,
                                "min": 0,
                                "times": 1,
                                "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                            }
                        });
                    }
                },
                "Box Shadow": {
                    "custom": true,
                    "DOM": "<div id='paBs'></div>",
                    "onload": function () {
                        var $parent = $activeDOM;
                        $("#paBs").AdvanceBoxShadow({
                            targetParent: $parent,
                            targetElem: ".policy-alert.wrapper"
                        });
                    }
                }
            }
        },
        "inheritSettings": function () {
            this.responsiveDOMs = this.settingDOMs;
        },
        "view": {
            "view": function () {
                $(".paBtn, .closePAlert").off("click").on("click", function () {
                    var thisComp = $(this).closest(".policy-alert-comp");
                    thisComp.hide();
                    var id = thisComp.attr("data-id");
                    localStorage.setItem("IsPolicyAccept" + id, true);
                });
                $.each($(".policy-alert-comp"), function () {
                    var $this = $(this);
                    var id = $this.attr("data-id");
                    if (!localStorage["IsPolicyAccept" + id]) {
                        $this.removeClass("Dn");
                    }
                });

            }
        },
        "remove": function ($viewDOM) {
            let $policyinfoComp = $viewDOM.find(".editor-component.policy-alert-comp");
            $.each($policyinfoComp, function () {
                var $this = $(this);
                var type = $this.attr("data-posType");
                if (type === "popup") {
                    $this.css({
                        "top": "0px",
                        "z-index": "9991",
                        "position": "fixed",
                        "left": "0px",
                        "width": "100%",
                        "height": "100%",
                        "overflow": "auto",
                        "background-color": $this.attr("data-pbg")
                    });
                    $this.find(".policy-alert.wrapper").css({
                        "transform": "translate(-50%, -50%)",
                        "top": "50%",
                        "left": "50%"
                    });
                } else {
                    $this.css($this.attr("data-pos").toLowerCase(), 0)
                        .css("z-index", 9991);
                    if (type === "fixed") {
                        $this.css("position", $this.attr("data-posType"));
                    }
                }
                $this.addClass("Dn");
                $this.find(".rich-link").removeAttr("data-linktype").removeAttr("data-pageid").removeClass("rich-link");
                $this.find(".policy-alert.wrapper").css({
                    "position": "relative"
                });
            });
        }
    }
};