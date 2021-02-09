var mailLinkButton = {
    "link button": {
        "componentname": "link button",
        "category": "basic",
        "icon": "fa fa-link",
        "row": false,
        "hidden": false,
        "info": 'This component is for redirecting to the link that is manually inserted from the setting.',
        "onload": function () { },
        "defaultdata": EasyLibrary.ReadDOM("linkbutton/linkbtnview", false),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (dropped) {

            }
        },
        "getPortalPages": function ($parent) {
            var auth = {
                UserName: SageFrameUserName,
                PortalID: SageFramePortalID,
                SecureToken: SageFrameSecureToken,
                CultureCode: SageFrameCurrentCulture
            }
            let pageList = '';
            $.ajax({
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                async: false,
                url: SageFrameAppPath + "/Modules/WbPagesDesign/services/PageDesignWebService.asmx/GetPortalPages",
                dataType: 'json',
                data: JSON.stringify({
                    authParam: auth,
                    SiteID: GetSiteID
                }),
                success: function (data) {
                    pageList = data.d;
                },
                error: function () {
                    alert("Portal Pages Fetch Unsuccessfull!!");
                }
            });
            return pageList;
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": EasyLibrary.ReadDOM("linkbutton/linkbtnbasic", false),
                    "onload": function ($item) {
                        let $anchor = $activeDOM.find('a');
                        let $parent = $activeDOM;
                        $('#txtbasicstng').AdvanceTextSetting({
                            "targetParent": $activeDOM,
                            "targetElem": $activeDOM.find('a')
                        });
                        $('#linkTextURL').val($anchor.attr('href'));
                        function lnkSetup() {
                            $('#linkTextURL').off('keyup').on('keyup', function () {
                                var $this = $(this);
                                var val = $this.val().trim();
                                $anchor.attr('href', val);
                            });
                        }
                        ButtonText();
                        SetLinkType();
                        function hideshowelements(val) {
                            if (val === 'ext') {
                                $('.link_input').show();
                                $anchor.attr('data-link', 'external');
                                $('#linkTextURL').focus();
                                $('.divInternalLinkOptions').hide();
                                $parent.attr('link-type', 'ext');
                            }
                            else {
                                InternalLinkSetup();
                                $('.link_input').hide();
                                $anchor.attr('data-link', 'internal');
                                $('.divInternalLinkOptions').show();
                                $parent.attr('link-type', 'int');
                            }
                        }


                        function SetLinkType() {
                            $('#selectLink').val($parent.attr('link-type')).prop('selected', true);
                            hideshowelements($('#selectLink').val());
                            $('#linkTextURL').off('keyup').on('keyup', function () {
                                var $this = $(this);
                                var val = $this.val().trim();
                                $anchor.attr('href', val);
                            });
                            $('#selectLink').off('change').on('change', function () {
                                let $this = $(this);
                                hideshowelements($this.val());
                            });
                        }
                        function InternalLinkSetup() {
                            let defaultOption = `<option value="Default" disabled selected>Select Page</option>`
                            let pageList = mailcomponent[$activeDOM.attr('data-type')].getPortalPages($activeDOM);
                            if (pageList.length !== 0) {
                                let options = '';
                                $.each(pageList, function (index, item) {
                                    options += `<option value=${item.PageName}>${item.PageName}</option>`
                                });
                                $('#slcInternalLinkOptions').html(options);
                                $('#slcInternalLinkOptions').prepend(defaultOption);
                            }
                            $('#slcInternalLinkOptions').val($parent.attr('data-page')).prop('selected', true);
                            $('#slcInternalLinkOptions').off('change').on('change', function () {
                                let $this = $(this);
                                let link = '';
                                link = CurrentHostURL +'/'+ $this.val();
                                $parent.attr('data-page', $this.val());
                                $anchor.attr('href', link);
                               /* if ($this.val() === 'home') {
                                    link = + $this.val();
                                    $parent.attr('data-page', $this.val());
                                } else {
                                    link = CurrentHostURL + $this.val();
                                    $parent.attr('data-page', $this.val());
                                }
                                //let thau = '';
                                //thau = $this.val() === 'home' ? '/Webbuilder/' : '/dashboard/';
                                //console.log(thau);
                                //$anchor.attr('href', WbHostURL + thau + $this.val());
                                $anchor.attr('href', link);
                                */
                            });
                        }
                        function ButtonText() {
                            let $text = $activeDOM.find('.link-btn');
                            let text = $text.text();
                            $('#btnlinkText').val(text);
                            $('#btnlinkText').off().on("change keyup paste click", function () {
                                let $this = $(this);
                                text = $this.val();
                                $text.text(text);
                                $this.val(text);
                            });
                            $('#btnlinkText').on('blur', function () {
                                if (text.trim() == ""){
                                    text = 'Enter Text';
                                    $text.text(text);
                                    $(this).val(text);
                                }
                            });
                        }
                        $('#lnkbtnwidth').AdvanceDimension({
                            targetParent: $activeDOM,
                            targetElem: '.btn-link-wrap',
                            options: {
                                max: 100,
                                types: ['width'],
                                unit: '%',
                                wLabel: 'component width'
                            }
                        });

                      //  lnkSetup();

                        $('#divTextStng').AdvanceTextSetting({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.link-btn'),

                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Spacing": {
                    "DOM": '<div id="lnk-btn-spc"></div>',
                    "onload": function ($ele) {
                        $('#lnk-btn-spc').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btn-link-wrap'),
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Alignment": {
                    "DOM": '<div id="divCompAlignment"></div>',
                    "onload": function ($item) {
                        $('#divCompAlignment').AdvanceAlignment({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: ['horizontal']
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                }

            }
        },
        "styleDOMs": {
            "tabs": {
                "Background": {
                    "DOM": "<div id='lnk-btn-bg'></div>",
                    "onload": function ($item) {
                        $('#lnk-btn-bg').AdvanceBackground({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btn-link-wrap'),
                            options: ["color"],
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Border": {
                    "DOM": "<div id='lnk-btn-bdr'></div>",
                    "onload": function ($item) {
                        $('#lnk-btn-bdr').AdvanceBorder({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btn-link-wrap')
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Box Radius": {
                    "DOM": '<div id="lnk-btn-br"></div>',
                    "onload": function ($ele) {
                        $('#lnk-btn-br').AdvanceBoxRadius({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btn-link-wrap')
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Box Shadow": {
                    "DOM": '<div id="lnk-btn-bs"></div>',
                    "onload": function ($ele) {
                        $('#lnk-btn-bs').AdvanceBoxShadow({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.btn-link-wrap')
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },

            }
        },
        "remove": function ($cloneDOM) {

        }
    }
}