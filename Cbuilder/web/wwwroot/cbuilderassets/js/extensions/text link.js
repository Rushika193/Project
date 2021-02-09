var text_link = {
    "text link": {
        "componentname": "text link",
        "category": "basic",
        "icon": "icon-text-link",
        "row": false,
        "hidden": false,
        "type": "element",
        "bucket": true,
        "collection": true,
        "defaultdata": EasyLibrary.ReadDOM("anchordom"),
        "beforeDrop": function ($this) { },
        "afterdrop": function ($appendedParent, $appendLayer) {
            anylinkstop();
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("imageLink/imageLinkBasic"),
                    "onload": function ($this) {
                        //$('.linkSettingWrapper').prepend(`<div class="field-row stElWrap col20-80">
                        //                                    <label class="fCol">Link text</label>
                        //                                    <div class="fCol TxAl-l text__area">
                        //                                        <textarea id="txtAnchorHolder"></textarea>
                        //                                     </div>
                        //                                 </div>`);
                        var parent = $this.closest('.editor-component');
                        var anchor = parent.find('.anchorWrapper').find('a');
                        //var linkText = anchor.text().trim();
                        //var $anchorHolderInSet = $('#txtAnchorHolder');
                        //$anchorHolderInSet.text(linkText);
                        var link = anchor.attr('href');
                        if (link == '#') link = '';
                        var linkType = anchor.attr('data-link');
                        if (!linkType) linkType = 'external';
                        if (typeof linkType !== 'undefined') {
                            switch (linkType) {
                                case 'external':
                                    $('#selectLink').val('ext');
                                    $('#linkTextURL').removeClass('Dn');
                                    $('#linkTextURL').val(link);
                                    anchor.removeClass('anchorpage').removeClass("redirectLink");
                                    break;
                                case 'internal':
                                    $('#selectLink').val('int');
                                    GetPageList();
                                    anchor.addClass('anchorpage').addClass("redirectLink");
                                    $("#anchorPageList option").filter(function () {
                                        return this.text == link.replace(SageFrameHostURL + '/', '').replaceAll("-", " ");
                                    }).attr('selected', true);
                                    $('#anchorPageList').parent().removeClass('Dn');
                                    anchor.attr("data-pageName", $("#anchorPageList option:selected").text().trim());
                                    break;
                            }

                            let newOrSame = anchor.attr('target');
                            //if (!newOrSame) newOrSame = '_blank'
                            if (typeof (newOrSame) !== "undefined|" && newOrSame !== null)
                                $("#openInnewTab").val(newOrSame);

                            $("#openInnewTab").off().on('change', function () {
                                anchor.attr("target", $(this).val());
                            });

                            $('#selectLink').off().on('change', function () {
                                var selected = $(this).val();
                                if (selected == 'ext') {
                                    anchor.attr('data-link', 'external');
                                    $('#linkTextURL').removeClass('Dn');
                                    $('#anchorPageList').parent().addClass('Dn');
                                    $('#linkTextURL').val('').focus();
                                    anchor.removeClass('anchorpage').removeClass("redirectLink");
                                } else {
                                    ChnageMenulinkType();
                                    GetPageList();
                                    $('#messageContainer').html('');
                                    $('#linkTextURL').addClass('Dn');
                                    $('#anchorPageList').parent().removeClass('Dn');
                                    $('#anchorPageList').trigger('change');
                                    anchor.addClass("redirectLink");
                                    let pageName = $('#anchorPageList option:selected').val().replaceAll(" ", "-");
                                    anchor.attr('data-onepage', pageName);
                                    anchor.attr('data-pageName', $('#anchorPageList option:selected').text().trim());
                                }
                            });
                            $('#linkTextURL').on('blur', function () {
                                var $this = $(this);
                                var val = $this.val().trim();
                                var link = '#';
                                if (val.length > 0) {
                                    link = val;

                                    var protocol = /^(https?):\/\/[^\s\/$.?#]*.[^\s]*$/i;
                                    if (!protocol.test(val)) {
                                        $this.css('border-color', 'red');
                                        $('#messageContainer').html('Invalid url. <br />Example of valid url: <br />http://www.contentder.com/ <br />https://www.contentder.com/');
                                        link = '#';
                                    }
                                    else {

                                        $('#messageContainer').html('');
                                        $this.css('border-color', '');
                                    }
                                }
                                else
                                    $('#messageContainer').html('Enter a valid URL');
                                anchor.attr('href', link);
                            });
                            //$anchorHolderInSet.on('keyup', function () {
                            //    anchor.text($anchorHolderInSet.val());
                            //    if (anchor.text() == '') anchor.text('Insert some text in \'link Text\' and set it as a link to an internal or external page.');
                            //});
                            function ChnageMenulinkType() {
                                if ($('#chkOnePageMenu').is(':checked')) {
                                    anchor.attr('data-link', 'onepage');
                                    anchor.removeClass('anchorpage');
                                }
                                else {
                                    anchor.attr('data-link', 'internal');
                                    anchor.addClass('anchorpage');
                                }
                            }
                            function GetPageList() {
                                var options = '';
                                if ($('#chkOnePageMenu').is(':checked'))
                                    $('.menuHeader .onepagemenu  li').each(function (index, item) {
                                        var $item = $(this);
                                        options += '<option  value="' + $item.attr('data-opscroll') + '">' + $item.find(' > a > .pageName').text() + '</option>';
                                    });
                                else {
                                    options = EasyLibrary.GetPageOption();
                                }
                                $('#anchorPageList').html(options);

                                $('#anchorPageList').off().on('change', function () {
                                    var $this = $(this);
                                    var url = $('#anchorPageList option:selected').text().replaceAll(" ", "-");
                                    ChnageMenulinkType();
                                    if ($('#chkOnePageMenu').is(':checked')) {
                                        anchor.attr('href', $('#anchorPageList option:selected').val().replaceAll(" ", "-"));
                                        anchor.attr('data-onepage', $('#anchorPageList option:selected').val());
                                    }
                                    else
                                        anchor.attr('href', SageFrameHostURL + '/' + url);
                                });
                            }
                        }
                        component['text link'].common.textSetting();

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
                        "horizontal": ["left", "center", "right"]
                    },
                },
                "Hover Effect": {
                    "options": {
                        "color": ["text", "background"]
                    },
                    "selectLayer": function ($elem) {
                        //return $elem.closest('.editor-component').find('.anchorWrapper').find('a');
                        return $activeDOM;
                    }
                },
                "Scroll Effect": {
                    "options": []
                }
            },
            "selectLayer": function ($elem) {
                var $parent = $elem.closest('.editor-component');

                return $parent;
            },
        },
        "common": {
            "textSetting": function () {
                $("#textLinkSet").html('');
                $("#textLinkSet").AdvanceTextSetting({
                    targetParent: $activeDOM,
                    targetElem: '.anchorWrapper > a',
                    fontWidthTarget: $activeDOM
                });
            }
        },
        "styleDOMs": {
            "tabs": {
                "Background":
                {
                    "options": ["image", "color"]
                },
                "Border": {
                    "options": {
                        "max": 20,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top", "right", "bottom", "left"],
                    }
                },
                "Box Radius":
                {
                    "options": {
                        "max": 50,
                        "min": 0,
                        "times": 1,
                        "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                    }
                },
                "Box Shadow":
                {
                    "options": {

                    }
                },
            },
            "selectLayer": function ($elem) {
                return $elem.closest('.editor-component');
            },
        },
        "responsiveDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": '<div id="textLinkSet"></div><div id="textLinkVisibility"></div>',
                    "custom": true,
                    "onload": function () {
                        component['text link'].common.textSetting();
                        IsVisible(true);
                        $("#textLinkVisibility").html('');
                        $('#textLinkVisibility').AdvanceVisibility({
                            targetParent: $activeDOM.parent(),
                            targetElem: $activeDOM
                        });

                        $('#textLinkVisibility').off('change').on('change', function () {
                            let val = $(this).find('input').is(":checked");
                            IsVisible(val);
                        });
                        function IsVisible(checked) {
                            if ($activeDOM.hasClass(ViewDeviceAlpha() + 'Dn') || !checked)
                                $("#textLinkSet").addClass('Dn')
                            else $("#textLinkSet").removeClass('Dn');
                        }
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
                        "horizontal": ["left", "center", "right"]
                    },
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            }
        }
    }
};