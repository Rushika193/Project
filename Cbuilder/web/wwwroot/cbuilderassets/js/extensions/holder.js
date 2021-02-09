var holder = {
    "holder": {
        "componentname": "holder",
        "category": "basic",
        "icon": "fa fa-briefcase",
        "row": false,
        "hidden": false,
        "type": "element",
        "collection": true,
        'defaultdata': '<div class="editor-component sfFixed holder sfCol_100 tsfCol_100 tDib msfCol_100 mDib">' + EasyLibrary.ReadDOM("holderoption") + '<div class="editor-col ui-state-default sfFixed sfCol_100" style="min-height:100px;"><div class="column-data-empty"><h5 class="Ml-0 Mr-0 Mt-0 Mb-0">This is Holder</h5><p>You can drag and drop components here.</p></div></div></div>',
        "beforedrop": function ($appendedParent, $holder, dropped) { },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {

        },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("holderbasic"),
                    "onload": function ($item) {
                        component["holder"].common.onload();
                    }
                },
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 80,
                            "min": -80,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"]
                        },
                        "padding": {
                            "max": 80,
                            "min": 0,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"]
                        }
                    }
                },
                "Alignment": {
                    "options": {
                        "horizontal": ["left", "center", "right"],
                        "vertical": ["top", "middle", "bottom"]
                    },
                },
                "Scroll Effect": {
                    "options": [],
                    "selectLayer": function ($elem) {
                        return $elem.closest(".editor-component");
                    }
                }
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "styleDOMs": {
            "tabs": {
                "Background": {
                    "options": ["image", "color"],
                    "selectLayer": function ($elem) {
                        return $elem.closest(".editor-component");
                    }
                },
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    }
                },
                "Box Radius": {
                    "options": {
                        "max": 50,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    }
                },
                "Box Shadow": {
                    "options": {

                    }
                }                
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            }
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "Basic": {
                            "DOM": EasyLibrary.ReadDOM("holderbasic"),
                            "onload": function ($item) {
                                component["holder"].common.onload();
                            },
                            "prepend": "true"
                        },
                        "Visibility": {}
                    }
                },
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 80,
                            "min": -80,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"]
                        },
                        "padding": {
                            "max": 80,
                            "min": 0,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"]
                        }
                    }
                },
                "Alignment": {
                    "options": {
                        "horizontal": ["left", "center", "right"],
                        "vertical": ["top", "middle", "bottom"]
                    }
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "common": {
            "$parent": function () {
                return $activeDOM;
            },
            "height": function () {
                let imageHeight = GetValueByClassName(this.$parent(), 'H-(([0-9]{1,4})|a)', 'H-');
                imageHeight = (imageHeight == 0 || imageHeight == "a") ? this.$parent().height() : imageHeight;
                AdvanceSageSlider($('#holderHeightSlider'), $('#holderHeightHandle'), 1, 1080, imageHeight, this.HeightChange, this.$parent(), 'px', this);
            },
            "HeightChange": function (space, $par, ref) {
                ReplaceClassByPattern(ref.$parent(), 'H-(([0-9]{1,4})|a)', 'H-' + space);
            },
            "SFWidthChange": function (space, $par, ref) {
                ReplaceClassByPattern(ref.$parent(), 'sfCol_[0-9]{1,3}', 'sfCol_' + space);
            },
            "imagewidth": function () {
                AdvanceSageSlider($('#holderWidthSlider'), $('#holderWidthHandle'), 1, 100, GetValueByClassName(this.$parent(), 'sfCol_[0-9]{1,3}', 'sfCol_'), this.SFWidthChange, this.$parent(), '%', this);
            },
            "onload": function ($item) {
                let _this = this;
                var $parent = $activeDOM;
                Init();
                function Init() {
                    _this.imagewidth();
                    _this.height();
                    $('#refreshHolderHeight').on('click', function () {
                        ReplaceClassByPattern($activeDOM, 'H-(([0-9]{1,4})|a)', 'H-a');
                        var holderheights = $parent.css('height').replace('px', '');
                        holderheights = holderheights == 0 ? 50 : holderheights;
                        ChangeSliderValue($('#holderHeightSlider'), holderheights);
                        //$activeDOM.addClass('H-' + holderheights);
                    });
                }
            }
        }
    }
};