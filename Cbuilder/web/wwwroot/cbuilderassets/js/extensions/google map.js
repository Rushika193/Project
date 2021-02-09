var google_map = {
    "google map": {
        "componentname": "google map",
        "category": "advance",
        "icon": "fa fa-map-marker",
        "row": false,
        "hidden": false,
        "bucket": true,
        "collection": true,
        "type": "element",
        "defaultdata": EasyLibrary.ReadDOM("googlemapcom"),
        "beforeDrop": function ($this) { },
        "afterdrop": function ($appendedParent, $appendLayer) { },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("googlemapbasic"),
                    "onload": function ($item) {
                        var $parent = $item.parents('.googlemapContainer');
                        var googleMapUrl = 'https://www.google.com/maps/embed/v1/';
                        var url = '';
                        InitEvent();

                        function InitEvent() {
                            LoadSettings();
                            Events();
                        }

                        function LoadSettings() {
                            var $iframeSrc = $parent.find('iframe');
                            $("#txtMapApiKey").val($iframeSrc.attr("data-key"));
                            var mapType = $iframeSrc.attr("data-type");
                            ChangeType(mapType);
                            $("#slcMapType").val(mapType);
                            $("#txtMapStreet").val($iframeSrc.attr("data-street"));
                            $("#txtMapCity").val($iframeSrc.attr("data-city"));
                            $("#txtMapState").val($iframeSrc.attr("data-state"));
                            $("#txtMapCountry").val($iframeSrc.attr("data-country"));
                            $("#txtMapLongitude").val($iframeSrc.attr("data-longitude"));
                            $("#txtMapLatitude").val($iframeSrc.attr("data-latitude"));
                            $("#slcMapType").trigger("change");
                        }

                        function showViewForm() {
                            $("#divPlace").hide();
                            $("#divLocation").show();
                        }

                        function showPlaceForm() {
                            $("#divLocation").hide();
                            $("#divPlace").show();
                        }

                        function ChangeType(value) {
                            if (value == "place") {
                                showPlaceForm();
                            } else {
                                showViewForm();
                            }
                        }

                        function Events() {
                            $("#slcMapType").on("change", function () {
                                var value = $(this).val();
                                ChangeType(value);
                            });
                            $("#btnGenerateMap").on("click", function () {
                                var apiKey = $("#txtMapApiKey").val();
                                var mapType = $("#slcMapType").val();
                                var type = "";
                                var queryString = '';
                                var mapStreet = '';
                                var mapCity = '';
                                var mapState = '';
                                var mapCountry = '';
                                var longitude = '';
                                var latitude = '';
                                var zoom = 16;
                                var $iframeSrc = $parent.find('iframe');
                                $iframeSrc.attr("data-key", apiKey);
                                $iframeSrc.attr("data-type", mapType);
                                if (mapType == "place") {
                                    type = "place";
                                    mapStreet = $("#txtMapStreet").val().trim();
                                    mapCity = $("#txtMapCity").val().trim();
                                    mapState = $("#txtMapState").val().trim();
                                    mapCountry = $("#txtMapCountry").val().trim();

                                    $iframeSrc.attr("data-street", mapStreet);
                                    $iframeSrc.attr("data-city", mapCity);
                                    $iframeSrc.attr("data-state", mapState);
                                    $iframeSrc.attr("data-country", mapCountry);
                                    $iframeSrc.attr("data-longitude", "");
                                    $iframeSrc.attr("data-latitude", "");
                                    queryString = "q=";
                                    var locationArr = [];
                                    if (mapStreet != "") {
                                        mapStreet = mapStreet.replace(' ', '+');
                                        locationArr.push(mapStreet);
                                    }
                                    if (mapCity != "") {
                                        mapCity = mapCity.replace(' ', '+');
                                        locationArr.push(mapCity);
                                    }
                                    if (mapState != "") {
                                        mapState = mapState.replace(' ', '+');
                                        locationArr.push(mapState);
                                    }
                                    if (mapCountry != "") {
                                        mapCountry = mapCountry.replace(' ', '+');
                                        locationArr.push(mapCountry);
                                    }
                                    queryString = queryString + locationArr.join(',');

                                } else {
                                    type = "view";
                                    longitude = $("#txtMapLongitude").val().trim();
                                    latitude = $("#txtMapLatitude").val().trim();
                                    $iframeSrc.attr("data-street", '');
                                    $iframeSrc.attr("data-city", '');
                                    $iframeSrc.attr("data-state", '');
                                    $iframeSrc.attr("data-country", '');
                                    $iframeSrc.attr("data-longitude", longitude);
                                    $iframeSrc.attr("data-latitude", latitude);
                                    queryString = "center=" + latitude + "," + longitude;
                                    zoom = 10;
                                }
                                url = googleMapUrl + type + "?zoom=" + zoom + "&key=" + apiKey + "&" + queryString;
                                $iframeSrc.attr("src", url);
                            });
                        }
                    }
                },
                "Map Size": {
                    "DOM": EasyLibrary.ReadDOM("youtubeheight"),
                    "onload": function ($item) {
                        component['youtube video'].HeightSlider($activeDOM);
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
                    }
                },
                "Help": {
                    "DOM": EasyLibrary.ReadDOM("googlemaphelp"),
                    "onload": function ($item) { }
                }

            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "options": {
                        "visibility": {},
                        "Heighty": {
                            "custom": true,
                            "DOM": EasyLibrary.ReadDOM("youtubeheight"),
                            "onload": function () {
                                component['youtube video'].HeightSlider($activeDOM);
                            }
                        }
                    },
                },
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 80,
                            "min": -80,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"]
                        },

                    }
                },
            }
        }
    }
};