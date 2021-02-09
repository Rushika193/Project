(function ($) {
    "use strict";
    $.WebBuilder = function (p) {
        p = $.extend({
            modulePath: '',
            DataObj: '',
            userModuleID: '',
            enableHeader: "false",
            onlinestoreURL: '',
            digisphereURL: '',
            portalDefaultPage: '',
            isDeveloperMode: false,
            version: '1.0',
            applicationname: '',
            core: false,
        }, p);
        let WebManagement = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                crossDomain: true,
                baseURL: `${p.modulePath}Services/webservice.asmx/`,
                method: "",
                url: "",
                ajaxCallMode: "",
                userModuleID: p.userModuleID,
                enableHeader: p.enableHeader,
                tempPageName: p.tempPageName,
                pageExtension: p.pageExtension,
                OnlineOffset: 0,
                OnlineLimit: 12,
                OnlineSiteOffset: 0,
                OnlineSiteLimit: 10,
                OnlineHelpOffset: 0,
                OnlineHelpLimit: 10,
                DigisphereAPI: `${SageFrameHostURL}/Modules/Admin/Advision/Services/SocialMarketing.asmx/`,
                OnlinestoreURL: `${p.onlinestoreURL}/`,
                portalDefaultPage: p.portalDefaultPage,
                isDeveloperMode: p.isDeveloperMode,
                version: p.version,
                applicationname: p.applicationname,
                core: p.core
            },
            Init: function () {
                let this_ = this;
                try {
                    /*if in developer mode extend the workin*/
                    if (WebManagement.config.isDeveloperMode.toLowerCase() == "true" && typeof extendedComps !== "undefined") {
                        component = $.extend(component, extendedComps);
                    } else {
                        ReloadPage();
                    }
                    //ReloadPage();
                    WebManagement.AsyncLoad();
                    /* after drop of the component is initialized here */
                    this_.TaskbarEvents();
                    if (this.config.core) {
                        this_.LoadHeader();
                        this_.OnlineEvents();
                        this_.SiteSettings();
                    }
                    WebManagement.InitEvents();
                    WebManagement.CreateSidebar(); // obsolete
                    /*API invoked and BindData of component is executed */
                    InvokeAPI();
                    WebManagement.LoadDetail();
                    WebManagement.RebindMenuID();
                    WebManagement.TopStickEvents();
                    //WebManagement.FooterInit(); obsolete
                    //MouseOverEffect();
                    //WebManagement.ScrollDynamicBind();
                    WebManagement.OnlineEvents();
                    WebManagement.DragComponentSettings();
                    MenuHover($('#primaryColor').css('background-color'), $('#secondaryColor').css('background-color'));
                    $('body').append($('#simplePopupModel'));
                    EditableSetBreak();
                    WebManagement.MenuType();
                    WebManagement.SiteHeader();
                    //$(window).resize(function () {
                    //    WebManagement.ScreenSizeLimit();
                    //});
                    //WebManagement.ScreenSizeLimit();
                    WebManagement.RevertMenu($('body'));
                    MouseOverEffect($('body'));
                    //WebManagement.InitScrollBar();
                    $('body,html').animate({
                        scrollTop: '0px'
                    }, 1);
                    $('body').on('paste', '[contenteditable]', function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        var cd = e.originalEvent.clipboardData;
                        var text = cd.getData("text/plain");
                        document.execCommand("insertHTML", false, text);
                    });
                    ChangeRedirectURL();
                    SetSessionLogout();

                    if (WebManagement.config.isDeveloperMode.toLowerCase() == "true") {
                        WebManagement.UpdateComponentManually();
                    }
                } catch (error) {
                    WriteLog(error);
                }
            },
            TaskbarEvents: function () {
                $('.taskbarAction').on('click', function () {
                    let $this = $(this);
                    if ($this.hasClass('active')) {
                        $this.removeClass('active');
                        $this.next('.taskbarActionMenu').addClass('Dn');
                    } else {
                        $('.taskbarAction').removeClass('active');
                        $('.taskbarActionMenu').addClass('Dn');
                        $this.addClass('active');
                        $this.next('.taskbarActionMenu').removeClass('Dn');
                    }
                });
                $('#sitesettings').on('click', function () {
                    //$('.dragHeader').text('Site Settings');
                    WebManagement.ShowStickeyHeaderOption('showsidebar');
                    $('.content-3').hide();
                    $('.content-1').show();
                    //$(this).addClass('clicked');
                    //$('#sidebarcontrol').find('input').eq(0).trigger('click');
                    $('.main-left').find('.pTitle').text('Site Settings');
                });
                $('#viewPorts > .changePort').on('click', function () {
                    hidePanel();
                    let $this = $(this);
                    if (!$this.hasClass('active')) {
                        let currentView = $('.changePort.active').attr('data-shorthand');
                        let newView = $this.attr('data-shorthand');
                        $('.setDrp').hide();
                        $('.changePort').removeClass('active');
                        $this.addClass('active');
                        let dAlpha = DeviceAlpha();
                        let bodyClasses = $('body').attr('class');
                        let regex = new RegExp('[a-z]{0,1}device', 'g');
                        let bodyClass = bodyClasses.match(regex);
                        if (bodyClass != null) {
                            $('body').removeClass(bodyClass[0]);
                        }
                        $('body').addClass(`${dAlpha}device`);
                        let shortCut = $this.attr("data-shorthand");
                        let siteWidth = $this.attr("data-width");
                        let siteHeight = $this.attr("data-height");
                        $('.main-left,#popupModel').css({
                            'right': 0,
                            'left': 'auto',
                            'top': 0
                        });
                        let remainingSpace = ScreenDimension().width - $('#popupModel').width();
                        if (remainingSpace < siteWidth)
                            siteWidth = remainingSpace;
                        if (EasyLibrary.Pinned() && dAlpha.length === 0)
                            siteWidth = remainingSpace;
                        $('.devicewrap').css({
                            "width": siteWidth,
                            "height": siteHeight
                        });
                        if (shortCut.length === 0) {
                            //if (!EasyLibrary.Pinned())
                            //    WebManagement.ShowForPopUp(true);
                            $('.main-left .right_actions >.pin__right, #popupModel .right_actions >.pin__right').show();
                            $activeDOM.find('> .SetHdlr > .stng > .setDrp').show();
                            $('.addPro, .drag, .sortComponent').removeClass('Dn');
                        } else {
                            //WebManagement.HideForPopUp(false);
                            $('.main-left .right_actions >.pin__right, #popupModel .right_actions >.pin__right').hide();
                            $activeDOM.find('> .SetHdlr > .stng > .setDrp').hide();
                            $('.addPro, .drag, .sortComponent').addClass('Dn');
                        }
                        if (EasyLibrary.IsDefined($activeDOM)) {
                            if (shortCut.length === 0)
                                $activeDOM.find('>.SetHdlr >.stng > .setDrp >li').eq(0).trigger('click');
                            else
                                $activeDOM.find('>.SetHdlr >.stng >.cb-stng').trigger('click');
                        }
                        if ($(".activeSetting").hasClass('editor-box')) {
                            $('#manageBody').trigger('click');
                        }
                        let removeCompo = [];
                        //call for resize function
                        $('.editor-component, .cRow').each(function () {
                            let $me = $(this);
                            let dataType = $me.attr('data-type');
                            if (EasyLibrary.IsUndefined(dataType)) {
                                dataType = $me.find('> .SetHdlr > .com-settings').attr('data-type');
                            }
                            if (EasyLibrary.IsDefined(dataType) && EasyLibrary.IsDefined(component[dataType])) {
                                if (EasyLibrary.IsDefined(component[dataType].inherits)) {
                                    dataType = component[dataType].inherits;
                                }
                                let index = removeCompo.indexOf(dataType);
                                if (index == -1) {
                                    if (EasyLibrary.IsDefined(component[dataType].resize)) {
                                        try {
                                            setTimeout(function () {
                                                component[dataType].resize(currentView, newView);
                                            }, 200);
                                        } catch (error) {
                                            WriteLog(error);
                                        }
                                        removeCompo.push(dataType);
                                    }
                                }
                            }
                        });
                    }
                });
                $('#SaveWebhidden').on('click', function () {
                    hidePanel();
                    WebManagement.SaveWebData(true);
                });
                $('#SaveWeb').on('click', function () {
                    hidePanel();
                    SageConfirmDialog(easyMessageList.saveandpublish, easyMessageList.savetitle, nopublish()).done(function () {
                        $('#SaveWebhidden').trigger('click');
                    }).fail(function () {
                        WebManagement.SaveWebData(false);
                    });
                    setTimeout(function () {
                        var $wrapper = $('.ui-dialog-buttonset');
                        $wrapper.find('.fa.smlbtn-succ').text('Save and Publish');
                        $wrapper.find('.fa.smlbtn-danger').text('Save');
                    }, 10);
                });
                $('#btnPublishedWeb').on('click', function () {
                    hidePanel();
                    SageConfirmDialog(easyMessageList.publish, easyMessageList.publishtitle).done(function () {
                        WebManagement.SaveWebData(true);
                    });
                });
                $('.addComponent').on('click', function () {
                    hidePanel();
                    //$('.dragHeader').text('Component List');
                    WebManagement.ShowStickeyHeaderOption('showsidebar');
                    $('.content-1').hide();
                    $('.content-3').show();
                    //$(this).addClass('clicked');
                    //$('#sidebarcontrol').find('input').eq(1).trigger('click');
                    $('.main-left').find('.pTitle').text('Component List');
                    $('#componentSearch').val('');
                    $('#refreshComSearch').trigger('click');
                });

                function nopublish() {
                    // WebManagement.SaveWebData(false);
                }


                //let previewPage = `${WebManagement.GeneratePreviewLink('webbuilder', window.location.href)}/preview`;
                //let queryParams = window.location.href.toLowerCase().replaceAll(`${SageFrameHostURL}/webbuilder/${currentpageName.replaceAll(' ', '-')}`.toLowerCase(), '');
                let previewPage = `${SageFrameHostURL}/webbuilderpreview/${currentpageName.replaceAll(' ', '-')}` + CultureURL + QueryParams;
                $('#btnNexitWebbuilder').attr('href', previewPage);
                $('#previewURL').attr('href', previewPage);


                PageAddEvents();

                function PageAddEvents() {
                    var $parent = $('.editor-site-header');
                    InitEvents();

                    function InitEvents() {
                        ClearPageError();
                        $('#pageAddPanel').on('click', function () {
                            ClearPageError();
                            $('#pageCreateArea').attr('data-pageid', '00000000-0000-0000-0000-000000000000');
                            $('#pageCreateArea').attr('data-webbuilderid', 0);
                            $('#pageCreateArea').show();
                            $('#pageListArea').hide();
                            $('#hdnPageID').val('');
                            $('#txtPageName').val('');
                            $('#txtPageTitle').val('');
                            $('#txtPageDescription').val('');
                            $('#clonePageDiv').show();
                        });
                        $('#btnCancelPageAdd').on('click', function () {
                            $('#pageCreateArea').attr('data-pageid', 0);
                            $('#pageCreateArea').hide();
                            $('#pageListArea').show();
                            ClearPageError();
                        });
                        $("#chkClonePage").on('click', function () {
                            var isChk = $(this).prop("checked");
                            if (isChk) {
                                $(".clonePageList").show();
                            } else {
                                $(".clonePageList").hide();
                            }
                        });
                        $('#btnSavePage').on('click', function () {
                            var $pageName = $('#txtPageName');
                            var $title = $('#txtPageTitle');
                            var $description = $('#txtPageDescription');
                            var pageName = $pageName.val().trim();
                            var pageID = $('#pageCreateArea').attr('data-pageid');
                            var webbuilderID = parseInt($('#pageCreateArea').attr('data-webbuilderid'));
                            var description = $description.val().trim();
                            var title = $title.val().trim();
                            if (pageName.length == 0) {
                                SetPageError("Page Name can't be empty");
                            } else {
                                if (!ValidatePageName(pageName)) {
                                    SetPageError("Page Name not accepted");
                                } else if (CheckDuplicate(pageName, pageID)) {
                                    SetPageError("Page Name duplicated");
                                } else {
                                    description = description.length == 0 ? pageName : description;
                                    title = title.length == 0 ? pageName : title;
                                    var cloneWebBuilderID = 0;
                                    if ($("#chkClonePage").prop("checked")) {
                                        cloneWebBuilderID = $("#clonePageList").val();
                                    }

                                    //changing
                                    let resultObj = AddUpdatePage(pageID, pageName, '', title, description, webbuilderID, cloneWebBuilderID);
                                    //changing
                                    var newPageID = resultObj.pageID;
                                    var oldPageName = currentpageName;
                                    if (newPageID == 0) {
                                        SetPageError("Page Name Already Exists.");
                                        return false;
                                    } else if (newPageID != 0) {
                                        currentpageName = pageName;
                                        if (pageID == newPageID) { //updated
                                            var $li = $('li[data-pageid="' + newPageID + '"]');
                                            $li.find(' >a > .pageName').text(pageName);
                                            $li.find('> a').attr('href', SageFrameHostURL + '/' + pageName.replace(/ /g, '-'));
                                            var $div = $('div[data-pageid="' + newPageID + '"]');
                                            $div.find('label.title').text(pageName);
                                            $div.find('> .activedefaultPage ').attr('data-pagename', pageName);
                                            $('#headerMenuList > div[data-pageid="' + pageID + '"] ').find('.page-name.title').text(pageName);
                                            var $cloneOption = $('option[data-type="clonepage"][data-pageid="' + newPageID + '"]');
                                            $cloneOption.text(pageName);
                                        } else { //added
                                            var addedMenu = '<div data-type="page" data-webbuilderid="' + resultObj.webbuilderID + '" data-pageid="' + newPageID + '" class="panel panel-info form-elements element field-row stElWrap col60-40">';
                                            addedMenu += '<label class="fCol title">' + pageName + '</label>';
                                            addedMenu += '<span class="fCol TxAl-r">';
                                            addedMenu += '<span class="cb-tick activedefaultPage " title="set as starup page"data-pageName="' + pageName + '"></span>';
                                            addedMenu += '<span class="deleteWebPage  cb-del"></span>';
                                            addedMenu += '<span class="editWebPage fa fa-pencil-square-o"></span>';
                                            addedMenu += "</span>";
                                            //$('#headerMenuList').append(addedMenu);
                                            $('#headerMenuList').append(PageDOM(resultObj.webbuilderID, newPageID, pageName, true));


                                            var clonePageAdded = '<option data-type="clonepage" value="' + resultObj.webbuilderID + '" data-pageid="' + newPageID + '">';
                                            clonePageAdded += pageName;
                                            clonePageAdded += "</option>";
                                            $("#clonePageList").append(clonePageAdded);
                                            $("#chkClonePage").prop("checked", false);
                                            $(".clonePageList").hide();
                                            $('.eb-menu').each(function () {
                                                var $this = $(this);
                                                var isHeading = false;
                                                if ($this.closest('.editor-site-header').length == 1)
                                                    isHeading = true;
                                                var color = 'rgb(0,0,0)';
                                                var fontSize = '';
                                                var $menuAnchor = '';
                                                var $span = '';
                                                var $menuA = '';
                                                if ($this.find('li').not('.Dn').find('a').not('.active-page').length == 0) {
                                                    color = 'rgb(0,0,0)';
                                                    fontSize = '12';
                                                } else {
                                                    var $item = $this.find('li a').not('.active-page').eq(0);
                                                    color = $item.find('span').css('color');
                                                    fontSize = $item.find('span').css('font-size');
                                                    $menuAnchor = $item.parent();
                                                    $span = $item.find('span');
                                                    $menuA = $item;

                                                }
                                                var hide = 'Dn';
                                                var href = SageFrameHostURL + '/' + pageName.replace(/ /g, '-');
                                                var li = '<li data-pageid="' + newPageID + '" >';
                                                li += '<a href="' + href + '" class="pagelink">';
                                                li += '<span class="pageName LtrSpc-0" style="font-size: ' + fontSize + '; color: ' + color + ';">';
                                                li += pageName;
                                                li += '</span>';
                                                li += '</a>';
                                                li += '</li>';
                                                var $li = $(li);
                                                $this.append($li);
                                                if ($menuAnchor.length > 0) {
                                                    $li.attrs($menuAnchor.attrs());
                                                    $li.find('span').attrs($span.attrs());
                                                    $li.find('a').attrs($menuA.attrs());
                                                    $li.find('a').attr('href', href);
                                                    $li.attr('data-pageid', newPageID);
                                                    $li.attr('data-webbuilderID', resultObj.webbuilderID);
                                                    //$li.find('a').removeClass("redirectLink").addClass("redirectLink");
                                                    $li.find("a").attr("data-PageName", pageName.replace(/ /g, '-'));
                                                    if (isHeading) {
                                                        $li.removeClass('Dn');
                                                    } else {
                                                        if (!$li.hasClass('Dn'))
                                                            $li.addClass('Dn');
                                                    }
                                                }
                                            });
                                            SortEvents();
                                            PagelinkStop();
                                            MenuHover($('#primaryColor').css('background-color'), $('#secondaryColor').css('background-color'));
                                        }
                                        $('#pageCreateArea').hide();
                                        $('#pageListArea').show();
                                        currentpageName = oldPageName;
                                        var Oriname = $('#txtPageName').attr('data-pname');
                                        if (cloneWebBuilderID > 0 && Oriname === oldPageName) { } else {
                                            SilentSave();
                                        }

                                        if (typeof Oriname !== "undefined" && Oriname === oldPageName) {
                                            window.location = SageFrameHostURL + '/WebBuilder/' + pageName.replace(" ", '-');
                                        }
                                    }

                                }
                            }
                        });
                    }


                    function ValidatePageName(pageName) {
                        var validPageaName = (/^[A-Za-z\s]+$/).test(pageName);
                        if (validPageaName)
                            return true;
                        else
                            return false;
                    }
                    ReadMenu();
                    ClonePageBind();

                    function ReadMenu() {
                        var $menu = $('#innerPageList  li');
                        $('#headerMenuList').html(BindMenuItem($menu));
                        SortEvents();
                    }

                    function ClonePageBind() {
                        var $menu = $('#innerPageList  li');
                        $("#clonePageList").html(BindCloneMenuItem($menu));

                    }

                    function BindMenuItem($menu) {
                        var html = '';
                        $.each($menu, function (index, item) {
                            var $item = $(this);
                            var pageID = $item.attr('data-pageid');
                            var webbuilderID = $item.attr('data-webbuilderid');
                            var pageName = $item.find(' > a > .pageName').text();


                            var currentPage = false;
                            var activeCurrent = '';
                            if (pageName === portalDefaultPage) {
                                currentPage = true;
                                activeCurrent = "active";
                            }

                            html += PageDOM(webbuilderID, pageID, pageName, true, currentPage, activeCurrent);
                            //html += '<div data-type="page" data-webbuilderid="' + webbuilderID + '" data-pageid="' + pageID + '" class="panel panel-info form-elements element field-row stElWrap col60-40">';
                            //html += '<label class="fCol title">';
                            //html += pageName;
                            //html += '</label>';
                            //var currentPage = false;
                            //var activeCurrent = '';
                            //if (pageName === portalDefaultPage) {
                            //    currentPage = true;
                            //    activeCurrent = "active";
                            //}
                            //html += '<span class="fCol TxAl-r">';
                            //html += '<span class="cb-tick activedefalutPage ' + activeCurrent + '" title="set as starup page" data-pageName="' + pageName + '"></span>';
                            //if (!currentPage) {
                            //    html += '<span class="deleteWebPage cb-del" title="delete page"></span>';
                            //    html += '<span class="editWebPage  fa fa-pencil-square-o" title="edit page"></span>';
                            //}

                            //html += "</span>";
                            //if ($item.find('> ul > li').length > 0) {
                            //    //html += '<div class="sortable panel-body ">';
                            //    html += BindMenuItem($item.find('> ul > li'), item.MenuItemID);
                            //    //html += "</div>";
                            //}
                            //html += "</div>";
                        });
                        return html;
                    }

                    function BindCloneMenuItem($menu) {
                        var html = '';
                        html += '<option data-type="clonepage" value="0" data-pageid="0">Select Page</option>';
                        $.each($menu, function (index, item) {
                            var $item = $(this);
                            var pageID = $item.attr('data-pageid');
                            var webbuilderID = $item.attr('data-webbuilderid');
                            var pageName = $item.find(' > a > .pageName').text();
                            html += '<option data-type="clonepage" value="' + webbuilderID + '" data-pageid="' + pageID + '">';
                            html += pageName;
                            html += "</option>";
                        });
                        return html;
                    }

                    function CheckDuplicate(newPage, pageID) {
                        var duplicate = false;
                        $parent.find('.eb-menu li').not('li[data-pageid="' + pageID + '"]').each(function (i, v) {
                            if ($(this).text().trim().toLowerCase() === newPage.toLowerCase()) {
                                duplicate = true;
                                return true;
                            }
                        });
                        return duplicate;
                    }

                    function ClearPageError() {
                        $('#pageError').text('');
                    }

                    function SetPageError(error) {
                        $('#pageError').text(error);
                    }

                    function RebindMenu() {
                        var $menu = $('#headerMenuList > div.panel-info');
                        var menuSpan = $('.eb-menu li a span').eq(0).attrs();
                        $('.eb-menu').html(ReBindMenuItem($menu));
                        if ($('#headerMenuList > div.panel-info').length == 1) {
                            $('#headerMenuList > div.panel-info > .deleteWebPage').remove(0);
                        }
                        $('.eb-menu span').each(function () {
                            $(this).attrs(menuSpan);
                        });
                        PagelinkStop();
                    }

                    function SortEvents() {
                        $('.deleteWebPage').off().on('click', function () {
                            let $this = $(this);
                            let $contentbox = $this.parents('.content-box');
                            let pageName = $contentbox.find('.title.page-name').text().trim();
                            SageConfirmDialog('Do you want to delete "' + pageName + '" page? All the data on the page will also be deleted.').done(function () {
                                let pageID = $contentbox.attr('data-pageid');
                                DeletePage(pageID, $this.parent().parent(), pageName);
                            });
                        });
                        $('.editWebPage').off().on('click', function () {
                            let $this = $(this);
                            let $contentbox = $this.parents('.content-box');
                            let pageID = $contentbox.attr('data-pageid');
                            let webbuilderID = $contentbox.attr('data-webbuilderid');
                            SecureAjaxCall.PassObject({
                                url: `${SageFrameHostURL}/webbuilder/GetPageDetails`,
                                data: JSON.stringify(pageID),
                                success: function (pageDetail) {
                                    $('#txtPageName').val(pageDetail.PageName).attr('data-pname', pageDetail.PageName);
                                    $('#txtPageTitle').val(pageDetail.Title);
                                    $('#txtPageDescription').val(pageDetail.Description);
                                    $('#pageCreateArea').attr('data-pageid', pageID).attr('data-webbuilderid', webbuilderID).show();
                                    $('#pageListArea').hide();
                                    $('#clonePageDiv').hide();
                                }
                            });
                        });

                        $('.activedefaultPage').not('.active').on('click', function () {
                            let pageName = $(this).attr('data-pagename');
                            SageConfirmDialog('Do you want to set ' + pageName + ' as default startup page?').done(function () {
                                WebManagement.SetDefaultPage(pageName, portalDefaultPage);
                            });
                        });

                        $('.pageAction').off().on('click', function () {
                            let this_ = $(this);
                            let $panel = this_.find('.page-setting-panel');
                            $('.content-box').removeClass('active');
                            $('.pageAction').removeClass('active');
                            if ($panel.hasClass('Dn')) {
                                $('.page-setting-panel').addClass('Dn');
                                $panel.removeClass('Dn');
                                this_.parents('.content-box').addClass('active');
                                this_.addClass('active');
                            } else {
                                $panel.addClass('Dn');
                            }
                        });

                        $('.enableheaderfooter').off().on('click', function () {
                            let $this = $(this);
                            let checked = $this.prop("checked");
                            UpdateHeaderFooter($this.attr('data-pagename'), $this.attr('data-section'), checked);

                        });

                    }

                    function UpdateHeaderFooter(pagename, section, enabled) {
                        SecureAjaxCall.PassObject({
                            data: JSON2.stringify({
                                PageName: pagename,
                                Section: section,
                                Enabled: enabled,
                                SiteID: GetSiteID
                            }),
                            url: SageFrameHostURL + '/webbuilder/EnableHeadFoot',
                            success: function (response) {

                            },
                        });
                    }

                    function ReBindMenuItem($menu) {
                        var html = '';
                        $.each($menu, function (index, item) {
                            var $item = $(this);
                            var pageID = $item.attr('data-pageid');
                            var pageName = $item.find('> .title').text();
                            var addliclass = 'Dn';
                            if ($item.find('> .showinmenu').find('.showpageinmenu').is(':checked')) {
                                addliclass = '';
                            }
                            html += '<li data-pageid="' + pageID + '" class="' + addliclass + '" >';
                            html += '<a href="' + SageFrameHostURL + '/' + pageName.replace(/ /g, '-') + webBuilderPageExtension + '" class="pagelink"><span class="pageName">' + pageName + '</span></a>';
                            if ($item.find(' > div.panel-body > div.panel-info').length > 0) {
                                html += '<ul>';
                                html += ReBindMenuItem($item.find(' > div.panel-body > div.panel-info'));
                                html += "</ul>";
                            }
                            html += "</li>";
                        });
                        return html;
                    }

                    function PageDOM(webbuilderid, pageid, pageName, setasdefault, currentPage, activeCurrent) {
                        let previewPageURL = `${SageFrameHostURL}/webbuilderpreview/${pageName.replaceAll(' ', '-')}` + CultureURL + QueryParams;
                        let editPageURL = `${SageFrameHostURL}/webbuilder/${pageName.replaceAll(' ', '-')}` + CultureURL + QueryParams;
                        let editdeleteDom = ` <li class="editWebPage" data-pageid="${pageid}" data-webbuilderid="${webbuilderid}"><i class="fa fa-edit"></i>Edit</li>
                                                            <li class="deleteWebPage"><i class="fa fa-trash"></i>Delete</li>`;
                        if (currentPage)
                            editdeleteDom = '';
                        return `
                                <div class="content-box panel-links Dfx PosR TxAl-m" data-type="page" data-webbuilderid="${webbuilderid}" data-pageid="${pageid}">
                                    <div class="page-name title">${pageName}</div>
                                    <div class="page-settings">
                                        <div class="page-settings__containers  Dfx TxAl-m">
                                            <div class=" page-stng view pagepreview">
                                                <a href="${previewPageURL}" target="_blank"><i class="fa fa-eye"></i></a>
                                            </div>
                                            <div class="page-stng page-preview pageEdit" >
                                               <a href="${editPageURL}"> <i class="fa fa-share-square-o"></i></a>
                                            </div>
                                            <div class="page-stng action pageAction">
                                                <i class="fa fa-ellipsis-h"></i>
                                                <div class="page-setting-panel Dn">
                                                    <div class="page-setting-container ">
                                                        <ul>
                                                            <li class="activedefaultPage ${activeCurrent}" data-pagename="${pageName}"><i class="fa fa-home"></i>Set as startup page</li>
                                                                ${editdeleteDom}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                `;
                    }

                    function AddUpdatePage(pageID, pageName, caption, title, description, webbuilderID, cloneWebBuilderID) {
                        let resultObj = {
                            'pageID': 0,
                            'webbuilderID': 0
                        };
                        var Mode = pageID == "00000000-0000-0000-0000-000000000000" ? "A" : "E";
                        var UpdateLabel = '';
                        var checks = $('div.divPermission tr:gt(0), #dvUser tr').find('input.sfCheckbox:checked');
                        //lstPagePermission = [];
                        var beforeID = 0;
                        var afterID = 0;
                        if ($('#rdbBefore').prop('checked') == true) {
                            beforeID = $('#cboPositionTab').val();
                        } else if ($('#rdbAfter').prop('checked') == true) {
                            afterID = $('#cboPositionTab').val();
                        }
                        var MenuSelected = 0;
                        var _IsVisible = $('#rdbAdmin').prop('checked') ? $('#chkShowInDashboard').prop("checked") : true;
                        var objTagValue = GetSeoValue('easybuilder', title, description);
                        SaveMessageShow(pageName + ' page adding');
                        SecureAjaxCall.PassObject({
                            data: JSON2.stringify({
                                PageID: pageID,
                                PageName: pageName,
                                DisplayName: pageName,
                                WebbuilderID: webbuilderID,
                                CloneWebBuilderID: cloneWebBuilderID,
                                KeyWords: '',
                                Title: title,
                                Description: description,
                                PageComponent: '',
                                HeaderFooterComponent: 'pageadded',
                                Mode: Mode,
                                Culture: 'en-US'
                            }),
                            url: SageFrameHostURL + '/webbuilder/Savepage',
                            success: function (response) {

                                switch (response.StatusCode) {

                                    case 1: {
                                        let result = response.Result;
                                        resultObj = {
                                            'pageID': result[0],
                                            'webbuilderID': result[1]
                                        };
                                        SaveMessageRemove();
                                    }
                                        break;
                                    case 3: { //updated
                                        let result = response.Result;
                                        resultObj = {
                                            'pageID': result[0],
                                            'webbuilderID': result[1]
                                        };
                                        SaveMessageRemove();
                                    }
                                        break;
                                    case 7: {
                                        let result = response.Result;
                                        resultObj = {
                                            'pageID': result[0],
                                            'webbuilderID': result[1]
                                        };
                                        SaveMessageRemove();
                                    }
                                        break;
                                    default:
                                }
                                //var response = data.d;
                                //if (response !== null)
                                //    response = response.split(',');

                            },
                        });
                        return resultObj;
                    }

                    function GetSeoValue(type, title, desciption) {
                        var objTagValue = [];
                        var tagValue = [type, title, desciption];
                        var tagID = [1, 2, 4];
                        $.each(tagValue, function (index, value) {
                            var objTag = {
                                SEOMetaTagTypeID: parseInt(tagID[index]),
                                MetaTagContent: tagValue[index]
                            };
                            objTagValue.push(objTag);
                        });
                        return objTagValue;
                    }

                    function DeletePage(pageID, $item, pageName) {
                        SecureAjaxCall.PassObject({
                            url: `${SageFrameHostURL}/webbuilder/DeletePages`,
                            data: JSON.stringify({
                                pageID: pageID,
                                userName: SageFrameUserName,
                            }),
                            success: function () {
                                $item.remove();
                                $("#clonePageList option").filter(function () {
                                    return $.trim($(this).text()) == pageName;
                                }).remove();

                                $('#headerMenuList > div').each(function () {
                                    let $this = $(this);
                                    if ($this.find('.page-name.title').text().trim() == pageName)
                                        $this.remove();
                                });

                                $('.eb-menu').each(function () {
                                    var $this = $(this);
                                    $this.find('li').each(function () {
                                        var $me = $(this);
                                        var newPagename = $me.find('> a > span').text();
                                        if (newPagename === pageName) {
                                            if ($me.find(' > ul').length > 0) {
                                                $this.append($me.find('> ul >li'));
                                            }
                                            var $ul = $me.parent().parent('li.hasChild');
                                            $me.remove();
                                            if ($ul.find('li').length == 0) {
                                                $ul.find('i').remove();
                                                $ul.removeClass('hasChild');
                                            }
                                        }
                                    });
                                });
                                SilentSave();
                                if (pageName === currentpageName) {
                                    window.location = window.location.href;
                                }
                            },
                        });
                    }
                }

                //$('#managePagePanel').on('click', function () {
                //    WebManagement.ShowStickeyHeaderOption('pagesettingshow');
                //    $('.headerControls').removeClass('clicked');
                //    $(this).addClass('clicked');
                //    let type = "settingDOMs";
                //    PopUpSetting('manage pages', 0, 500, 0, 0, 'managepages', type, $('.editor-site-header'), $(this));
                //});
                $('.pagetype').on('click', function () {
                    let this_ = $(this);
                    $('.tabs__content > div ').hide();
                    $('#' + this_.attr('data-open')).show();

                    $('.pagetype').removeClass('active');
                    this_.addClass('active');
                });

                function hidePanel() {
                    $('.taskbarAction').removeClass('active');
                    $('.taskbarActionMenu').addClass('Dn');
                }
            },
            SiteSettings: function () {
                let this_ = this;
                this_.SetThemeColor();
                $('#basicFonts').html(DOMFontBasicCollection());
                $('#basicFonts').on('change', function () {
                    let $body = $('.site-body');
                    let classList = $body.attr('class');
                    let fontClass = classList.match(/ff-(\w+)/g);
                    if (fontClass !== null) {
                        $body.removeClass(fontClass[0]);
                    }
                    let fontFamily = $(this).val();
                    $body.addClass('ff-' + fontFamily.toLowerCase());
                    $('#fontPreview').attr('class', 'ff-' + fontFamily.toLowerCase());
                    webBuilderSettings.defaultFontFamily = fontFamily;
                });
                let classesList = $('.site-body').attr('class');
                let fontClasses = classesList.match(/ff-(\w+)/g);
                if (fontClasses !== null) {
                    $('#basicFonts').val(fontClasses[0].replace('ff-', ''));
                    $('#fontPreview').attr('class', fontClasses[0].replace('ff-', ''));
                }

                if ($('.editor-com-nav:visible').attr('data-active') === "onepagemenu") {
                    $('#chkOnePageMenu').prop('checked', true);
                    $('#pagesSelector').hide();
                    $('#limanageonepage').show();
                } else {
                    $('#chkOnePageMenu').prop('checked', false);
                    $('#pagesSelector').show();
                    $('#limanageonepage').hide();
                }
                $('#chkOnePageMenu').on('click', function () {
                    if ($(this).is(':checked')) {
                        $('.editor-com-nav').attr('data-active', 'onepagemenu');
                        $('.editor-com-nav > .onepagemenu').show();
                        $('.editor-com-nav > .eb-menu').hide();
                        $('#pagesSelector').hide();
                        $('#limanageonepage').show();
                        WebManagement.OnePageMenuEvent();
                        //$('#limanageonepage').trigger('click');
                        var parentClasses_ = $('.site-body').attr('class').match(/hdr-[a-z]{1,20}/g);
                        if (parentClasses_ !== null) {
                            $('.site-body').removeClass(parentClasses_[0]);
                        }
                        $('.site-body').addClass('hdr-fxd');
                        webBuilderSettings.SiteHeaderEffect = 'hdr-fxd';
                        if (portalDefaultPage.toLowerCase() != currentpageName.toLowerCase()) {
                            WebManagement.SetDefaultPage(currentpageName);
                            //  $('.activedefalutPage[data-pagename="' + currentpageName + '"]').trigger('click');
                            // let $activeDivDom= $("#headerMenuList").find('.panel-info').find('.activedefalutPage[data-pagename="' + currentpageName + '"]');
                        }
                        //UpdateSettings();                        
                        SilentSave();
                    } else {
                        $('.editor-com-nav').attr('data-active', 'mutiplepage');
                        $('.editor-com-nav > .onepagemenu').hide();
                        $('.editor-com-nav > .eb-menu').show();
                        $('#pagesSelector').show();
                        $('#managePagePanel').trigger('click');
                        $('#limanageonepage').hide();
                        $('.site-body').removeClass('hdr-fxd');
                        webBuilderSettings.SiteHeaderEffect = 'hdr-nml';
                    }
                    UpdateSettingKeyValue("SinglePage", $(this).is(':checked').toString());
                });

                $('#darkMode').on('click', function () {
                    let changedvalue = 'skin__dark';
                    if ($(this).is(':checked')) {
                        changedvalue = 'skin__dark';
                        $('body').addClass('skin__dark').removeClass('skin__light');
                    } else {
                        changedvalue = 'skin__light';
                        $('body').addClass('skin__light').removeClass('skin__dark');
                    }
                    UpdateSettingKeyValue('EditorTheme', changedvalue);
                });
                $('.builder-options-array h2').on('click', function () {
                    if (!$(this).parent().hasClass('activeAccordion')) {
                        $('.builder-options').removeClass('activeAccordion');
                        $('.OptionItems').slideUp(400);
                        $(this).next().slideDown(400);
                        $(this).parent().addClass('activeAccordion');
                    }
                });

            },
            SiteHeader: function () {
                let parentClasses = $('.site-body').attr('class').match(/hdr-[a-z]{1,20}/g);
                let headerEffect = 'hdr-nml';
                if (parentClasses !== null) {
                    headerEffect = parentClasses[0];
                }
                $('#SitemenuHeaderStyle').find('i').removeClass('selected');
                $('#SitemenuHeaderStyle').find('i[data-class="' + headerEffect + '"]').addClass('selected');
                if (headerEffect === "hdr-stky")
                    $('.StickyOptions').show();
                else
                    $('.StickyOptions').hide();
                $('#SitemenuHeaderStyle > i').on('click', function () {
                    let parentClasses_ = $('.site-body').attr('class').match(/hdr-[a-z]{1,20}/g);
                    if (parentClasses_ !== null) {
                        $('.site-body').removeClass(parentClasses_[0]);
                    }
                    let menuStyle = $(this).attr('data-class');
                    $('.site-body').addClass(menuStyle);
                    $('#SitemenuHeaderStyle').find('i').removeClass('selected');
                    $('#SitemenuHeaderStyle').find('i[data-class="' + menuStyle + '"]').addClass('selected');
                    webBuilderSettings.SiteHeaderEffect = menuStyle;
                    switch (menuStyle) {
                        case 'hdr-fxd':
                            //var containerWidth = $('.editor-componentWrapper').css('width');
                            //$('.editor-site-header').css('width', containerWidth);
                            $('.StickyOptions').hide();
                            $('.edit-area').removeClass('stick');
                            break;
                        case 'hdr-stky':
                            //$('.editor-site-header').css('width', '');
                            $('.StickyOptions').show();
                            $('.edit-area').removeClass('stick');
                            break;
                        case 'hdr-abs':
                            //$('.editor-site-header').css('width', '');
                            $('.StickyOptions').hide();
                            $('.edit-area').removeClass('stick');
                            break;
                        default:
                            $('.editor-site-header > .cRow').removeClass('stick');
                            $('.editor-componentWrapper').css('padding-top', '');
                            $('.StickyOptions').hide();
                            $('.editor-site-header').css('width', '');
                            break;
                    }
                    // HeaderTopPadding();
                });
            },
            AsyncLoad: function () {
                let left = $('.SettingsUpperBody').first().width();
                $('.SettingsUpperBody').css({
                    'height': parseInt(ScreenDimension().height) - parseInt($('.main-top-row').height()),
                    'left': `-${left}px`
                });
                $('#settingCancel').off('click').on('click', function () {
                    closeComponentPopup();
                });
                $('#settingSave').off('click').on('click', function () {
                    $('#SaveWeb').trigger('click');
                });
                CopyPlaneText();
                RowAddBindEvent($('body'));
                //if (this.config.core)
                //    WebManagement.OnlineCompoSearchFilters();
            },

            //obsolete start
            InitScrollBar: function () {
                let scroller = new ScrollJS({
                    container: $('.main-container'),
                    scrollbar: $('.main-container').find('>.scrollbar'),
                    content: $('.edit-area')
                });
                Scroller();
            },
            ComparePageAndHideIfNotExists: function () {
                let actualPages = EasyLibrary.GetPageArray();
                let actualPagesLen = actualPages.length;
                let domPageLength = $('.editor-site-header').find('.menuHeader:visible .eb-menu > li').length;
                if (actualPages !== domPageLength) {
                    for (p = 0; p < actualPages; p++) {
                        for (pd = 0; pd < domPageLength; pd++) {
                            let pageDOM = '<li data-pageid="2130" data-webbuilderid="2" class="hide-element"><a href="http://172.18.12.40:9181/abcd" class="pagelink"><span class="pageName eLtrSpc-0" style="font-size: 14px; color: rgb(217, 217, 217);">abcd</span></a></li>';
                            $('.editor-site-header').find('.menuHeader:visible .eb-menu').append(pageDOM);
                        }
                    }
                }
            },
            ScreenSizeLimit: function () {
                let width = ScreenDimension().width;
                if (width < 1024)
                    SaveMessageShow("coming soon for screen less than 1024 px");
                else
                    SaveMessageRemove();
            },
            FooterInit: function () {
                $('.ManageFooter').on('click', function () {
                    let $parent = $(this).parent().parent();
                    let footers = ['FooterThree', 'FooterTwo'];
                    let footerLength = footers.length;
                    let selectDOM = DOMCreate('li', 'Footer styles', 'title');
                    for (var i = 0; i < footerLength; i++) {
                        let html = $(`#${footers[i]}`).html();
                        selectDOM += DOMCreate('li', html, 'selectData  sfCol_100');
                    }
                    selectDOM = DOMCreate('ul', selectDOM, 'selectDataWrapper clearfix footerStyles');
                    FullPagePopup({
                        data: selectDOM,
                        heading: "FooterStyle",
                        showheading: true
                    });
                    ReadMenu();

                    function ReadMenu() {
                        let $menu = $('.editor-site-header').find('.menuHeader:visible .eb-menu > li');
                        $('.fullpagepopupWrapper').find('.automenucreate').html($('.editor-site-header').find('.menuHeader:visible .eb-menu').html());
                    }
                });
            },
            ScrollDynamicBind: function () {
                let dynamicScroll = 'var scroolHeight = document.body.scrollTop;';
                $('.scroll-begin').each(function (i, v) {
                    let scrollClass = 'scroll_' + i;
                    let $this = $(this);
                    let top = $this.offset().top;
                    let height = $this.height();
                    $this.addClass(scrollClass);
                    dynamicScroll += "if (scroolHeight > " + top + " && scroolHeight < " + (top + height) + ")";
                    dynamicScroll += "{";
                    let delay = 0;
                    if (typeof ($this.attr('data-scrolldelay') !== "undefined")) {
                        delay = parseInt($this.attr('data-scrolldelay'));
                    }
                    dynamicScroll += "setTimeout(function () {";
                    dynamicScroll += "$('." + scrollClass + "').addClass('scroll-end');";
                    dynamicScroll += "}, " + delay + ");";
                    dynamicScroll += "}";
                });
                let ScrollWindow = new Function('param', dynamicScroll);
                //window.onscroll = function () {
                //    /*ScrollWindow();*/
                //};
            },
            GeneratePreviewLink: function (key, sourceURL) {
                let params_arr = sourceURL.split("/");
                for (var i = params_arr.length - 1; i >= 0; i -= 1) {
                    let param = params_arr[i].split("=")[0];
                    if (param.toLowerCase() == key.toLowerCase()) {
                        params_arr.splice(i, 1);
                    }
                }
                let rtn = params_arr.join("/");
                return rtn;
            },
            //end obsolete


            UpdateComponentManually: function () {
                let count = 0;
                $.each(component, function (i, v) {
                    /*updateComponent variable is in webbuilderEdit*/
                    let name = v.componentname;
                    let componentValue = v;
                    let type = typeof v.type === "undefined" ? "" : v.type;
                    if (updateComponent.indexOf(name) >= 0) {
                        WebManagement.UpdateComponentForDev(name, componentValue, count, type);
                        console.log(name + ' Updated');
                        count++;
                    }
                });
            },
            RebindMenuID: function () {
                $('#innerPageList > li ').each(function () {
                    let $this = $(this);
                    $('.eb-menu > li').each(function () {
                        let $ebList = $(this);
                        if ($ebList.find('> a > span').text().toLowerCase() === $this.find('> a > span').text().toLowerCase()) {
                            $ebList.attr('data-pageid', $this.attr('data-pageid'));
                            $ebList.attr('data-webbuilderid', $this.attr('data-webbuilderid'));
                        }
                    });
                });
                $('.eb-menu').each(function () {
                    let $tempPage = $(this);
                    $tempPage.find('li > a > span').each(function () {
                        let $temp = $(this);
                        $('#innerPageList li > a > span').each(function () {
                            let $this = $(this);
                            if ($this.text().toLowerCase() === $temp.text().toLowerCase()) {
                                $this.attr('data-pageid', $tempPage.attr('data-pageid'));
                                $this.attr('data-webbuilderid', $tempPage.attr('data-webbuilderid'));
                            }
                        });
                    });
                });
            },
            MenuType: function () {
                if ($('.editor-com-nav:visible').attr('data-active') === "onepagemenu") {
                    $('.editor-com-nav:visible > .onepagemenu').show();
                    $('.editor-com-nav:visible > .eb-menu').hide();
                } else {
                    $('.editor-com-nav:visible > .onepagemenu').hide();
                    $('.editor-com-nav:visible > .eb-menu').show();
                }
                //WebManagement.OnePageMenuEvent();
            },
            OnePageMenuEvent: function () {
                //$('#limanageonepage').on('click', function () {
                let htmlDOM = '';
                htmlDOM += '<span class="note">Section title will be in the place of menu and leaving it empty will not be included in the menu. Clicking on the title will take you to that section.</span>';
                $('.editor-componentWrapper > .cRow').each(function (i, v) {
                    let $this = $(this);
                    let name = typeof ($this.attr('data-menuname')) === "undefined" ? "" : $this.attr('data-menuname');
                    let dom = DOMCreate('span', `<label>Section title</label><input type="text" class="sectionname" value="${name}" />`);
                    let DOM = $this.wrap('<p/>').parent().html();
                    $this.unwrap();
                    dom += DOMCreate('div', DOM, 'onepagedata');
                    htmlDOM += DOMCreate('li', dom);
                });
                htmlDOM = DOMCreate('ul', htmlDOM, 'onepagelist clearfix');
                let saveBtn = '<span>Single Page Sections</span><span class="pop-header-btn" id="btnOnePage">Save</span>';
                FullPagePopup({
                    data: htmlDOM,
                    heading: saveBtn,
                    showheading: true,
                    onappend: function ($wrapper) {
                        $('#btnOnePage').on('click', function () {
                            $('.onepagemenu').each(function (index, item) {
                                let html = "";
                                let $a = $(this).find('li > a').not('.active-page');
                                let aStyle = '';
                                let pStyle = '';
                                let liStyle = '';
                                if ($a.length > 0) {
                                    let $span = $a.find('.pageName');
                                    let $li = $a.parent();
                                    let $Style = $a.attrs();
                                    aStyle = $Style.style;
                                    if (aStyle == undefined) {
                                        aStyle = '';
                                    }
                                    let $spanStyle = $span.attrs();
                                    pStyle = $spanStyle.style;
                                    if (pStyle == undefined) {
                                        pStyle = '';
                                    }

                                    let $liStyle = $li.attrs();
                                    liStyle = $liStyle.style;
                                    if (liStyle == undefined) {
                                        liStyle = '';
                                    }
                                }
                                $('.editor-componentWrapper > .cRow').each(function (i, v) {
                                    let $this = $(this);
                                    let $name = $('.sectionname').eq(i);
                                    let $val = $name.val().trim();
                                    if ($val.length > 0) {
                                        let opVal = 'opclass_' + i;
                                        html += `<li class="sfFirst oneMenu"  data-opscroll="${opVal}" style="${liStyle}">
                                                     <a href="javascript:void(0);" class="pagelink onepage"  style="${aStyle}">
                                                        <span class="pageName"  style="${pStyle}">${$val}</span>
                                                     </a>
                                                 </li>`;
                                        $this.attr({
                                            'data-opscroll': opVal,
                                            'data-menuname': $val
                                        });
                                    }

                                });
                                $(this).html(html);
                            });
                            OnePageMenuScrollEvent();
                            CloseFullPagePopup();
                        });
                    }
                });
                //});
            },
            DragComponentSettings: function () {
                $('.main-left').draggable({
                    containment: '.main-container',
                    handle: '.dragComponentSettings',
                    start: function (e, ui) {
                        $(ui.helper).css({
                            "position": "fixed"
                        });
                    },
                    stop: function (event, ui) {
                        //AutoAlignDragger(ui.helper);
                    }
                });
            },

            OnlineEvents: function () {
                $(".plusBtn").on("click", function () {
                    if ($("#pagesSelector").is(':visible')) {
                        $('.taskbarAction').removeClass('active');
                        $('.taskbarActionMenu').addClass('Dn');
                        $('#pagesSelector').addClass('active');
                        $('#pagesSelector').next('.taskbarActionMenu').removeClass('Dn');
                    }
                    else {
                        WebManagement.OnePageMenuEvent();
                    }
                });
                $("body").on("click", "#btnCompLoadMore", function () {
                    let searchText = $("#onlinecomponentSearch").val();
                    WebManagement.config.OnlineOffset = WebManagement.config.OnlineOffset + 1;
                    WebManagement.GetOnlineComponents(true, WebManagement.config.OnlineOffset, WebManagement.config.OnlineLimit, searchText, true);
                });
                $("#onlinecomponentSearch").on("keyup", function (e) {
                    if (e.keyCode == 13)
                        SearchOnlineComponent();
                });
                $('#btnComponentSearch').on('click', function () {
                    SearchOnlineComponent();
                });
                $('#refreshOnlineCompoSearch').on('click', function () {
                    $('#compoTypesearch').val(0);
                    $("#onlinecomponentSearch").val('');
                    $('#compoCategorysearch').val(0);
                    $('#slccompoApplicationName').val(0);
                    SearchOnlineComponent();
                });

                function SearchOnlineComponent() {
                    let searchText = $("#onlinecomponentSearch").val().trim();
                    WebManagement.config.OnlineOffset = 0;
                    onlineComponentArr = [];
                    WebManagement.GetOnlineComponents(true, WebManagement.config.OnlineOffset, WebManagement.config.OnlineLimit, searchText, true, true);
                }

                $("body").on("click", "#btnSiteLoadMore", function () {
                    let searchText = $("#onlineSiteSearch").val();
                    WebManagement.config.OnlineSiteOffset = WebManagement.config.OnlineSiteOffset + 1;
                    WebManagement.GetOnlineSites(false, WebManagement.config.OnlineSiteOffset, WebManagement.config.OnlineSiteLimit, searchText, true);
                });
                //$("#onlineSiteSearch").on("change", function () {
                //    SearchOnlineSite();
                //});
                $("#onlineSiteSearch").on("keyup", function (e) {
                    if (e.keyCode == 13)
                        SearchOnlineSite();
                });

                function SearchOnlineSite() {
                    let searchText = $("#onlineSiteSearch").val();
                    if (searchText != "") {
                        WebManagement.config.OnlineSiteOffset = 0;
                        WebManagement.GetOnlineSites(false, WebManagement.config.OnlineSiteOffset, WebManagement.config.OnlineSiteLimit, searchText, true, true);
                    }
                }
                $('#slcSectors').on('change', function () {
                    let sectorID = $('#slcSectors option:selected').val();
                    if (sectorID > 0)
                        WebManagement.GetSiteCategories(sectorID);
                    else
                        WebManagement.ClearBusinessControls(1);
                });
                $('#slcSiteCategory').on('change', function () {
                    let sectorID = $('#slcSectors option:selected').val();
                    let siteCatID = $('#slcSiteCategory option:selected').val();
                    if (siteCatID > 0)
                        WebManagement.GetBusinessType(sectorID, siteCatID);
                    else
                        WebManagement.ClearBusinessControls(2);
                });
                $("#btnSiteSearch").on("click", function () {
                    $("#siteOnline").html('');
                    WebManagement.config.OnlineSiteOffset = 0;
                    WebManagement.GetOnlineSites(false, WebManagement.config.OnlineSiteOffset, WebManagement.config.OnlineSiteLimit, $('#onlineSiteSearch').val(), true);
                });
                $("#btnShowAdvance").on("click", function () {
                    $("#divSimpleSearch").hide();
                    $("#divAdvSearch").show();
                });
                $("#btnSiteCancel").on("click", function () {
                    $("#divAdvSearch").hide();
                    $("#divSimpleSearch").show();
                });
                $("#divSiteList").on("click", ".btnUsethis", function () {
                    let themeid = parseInt($(this).data("themeid"));
                    let id = $(this).data("id");
                    SageConfirmDialog(easyMessageList.themeinstall, easyMessageList.themeinstalltitle).done(function () {
                        ReloadPageNone();
                        FullPageLoading(easyMessageList.themewaiting);
                        WebManagement.GetOnlineThemeFile(themeid);
                    });
                });
                $("#divSiteList").on("click", ".btnDemo", function () {
                    let id = $(this).data("id");
                    let themeid = parseInt($(this).data("themeid"));
                    let demoURL = $(this).attr('data-previewurl');
                    let url = '';
                    if (themeid > 0) {
                        url = demoURL; //`${demoURL}/${id}/${themeid}`;
                        window.open(url, '_blank');
                    }
                });
                $('#onlineHelpSearch').on('change', function (e) {
                    WebManagement.config.OnlineHelpOffset = 0;
                    WebManagement.GetWebHelp(false, WebManagement.config.OnlineHelpOffset, WebManagement.config.OnlineHelpLimit, $('#onlineHelpSearch').val().trim());
                });
                $('#onlineHelpSearch').on('keyup', function (e) {
                    WebManagement.config.OnlineHelpOffset = 0;
                    if (e.keyCode == 13)
                        WebManagement.GetWebHelp(false, WebManagement.config.OnlineHelpOffset, WebManagement.config.OnlineHelpLimit, $('#onlineHelpSearch').val().trim());
                });
            },
            OnlineCompoSearchFilters: function () {
                let data = {
                    SecureToken: SageFrameSecureToken
                };
                let config = {
                    async: false,
                    url: `${SageFrameHostURL}/Builder/OnlineCompoSearchFilters`,
                    data: JSON.stringify(data),
                    success: function (data) {
                        WebManagement.BindOnlineCategoryFilter(data);
                    },
                }
                SecureAjaxCall.PassObject(config);
            },
            BindOnlineCategoryFilter: function (data) {
                if (data !== null && data != null) {
                    let response = data; //JSONParse(data);
                    if (response.length === 3) {
                        let type = '';
                        let cat = '';
                        let types = response[0];
                        $('#compoTypesearch').html(bindoption(types.length, types, "Select component Type", ""));
                        types = response[1];
                        $('#compoCategorysearch').html(bindoption(types.length, types, "Select component Category", ""));
                        types = response[2];
                        $('#slcApplicationName').html(bindoption(types.length, types, "Select Application", "webbuilder"));
                        $('#slccompoApplicationName').html(bindoption(types.length, types, "Select Application", "webbuilder"));

                        function bindoption(length, arr, selectText, selectValue) {
                            let res = '';
                            res += `<option value="${selectValue}">${selectText}</option>`;
                            for (var i = 0; i < length; i++) {
                                res += `<option value=${arr[i].Value}>${arr[i].Value}</option>`;
                            }
                            return res;
                        }
                    }
                    $('#slcApplicationName').val(this.config.applicationname);
                    $('#slcApplicationName').attr('data-appname', this.config.applicationname);
                }

            },

            GetOnlineComponents: function (async, offset, limit, searchText, simulateClick, isSearchMode) {

                let tabTitleWrap = $('.tabTitleWrapp');
                let tabTitles = tabTitleWrap.children('li.tabTitle');
                let tabDetails = $('.tabDetails');
                let searchBar = $('#searchForCompo');

                function tabSwitcher(clickedTab, loadMore) {
                    let isSearchModeClone = isSearchMode;
                    let targetAttr = clickedTab.attr('data-target');
                    let targetContent = tabDetails.find(targetAttr);
                    clickedTab.addClass('active').siblings('li').removeClass('active');
                    targetContent.removeClass('Dn').siblings('li').addClass('Dn')
                    if (targetAttr == '#targetOnline')
                        searchBar.show();
                    else
                        searchBar.hide();

                    if (targetContent.find('ul').children().length == 0 || loadMore) {
                        EasyLibrary.EnableLoader(targetContent); //loading animation
                        let webMethod;
                        switch (targetAttr) {
                            case '#targetOnline':
                                webMethod = "GetOnlineComponentsByVersion"
                                break;
                            case '#targetPurchased':
                                webMethod = "GetPurchasedComponents"
                                break;
                            case '#targetInstalled':
                                webMethod = "GetInstalledComponents"
                                break;
                        }

                        let data = {
                            Offset: parseInt(offset * limit) + 1,
                            Limit: parseInt(limit),
                            SearchText: searchText,
                            SecureToken: SageFrameSecureToken,
                            Version: WebManagement.config.version,
                            Type: $('#compoTypesearch').val(),
                            Category: $('#compoCategorysearch').val(),
                            ApplicationName: $('#slccompoApplicationName option:selected').val()
                        };
                        let config = {
                            async: false,
                            url: `${SageFrameHostURL}/Builder/${webMethod}`,
                            data: JSON.stringify(data),
                            success: function (data) {
                                if (isSearchModeClone)
                                    targetContent.children('ul').html('');
                                let firstTemplate = targetContent.children().children().first();
                                let height = targetContent.height() - firstTemplate.outerHeight();
                                WebManagement.BindOnlineComponents(data, targetContent);
                                if (loadMore) {
                                    tabDetails.animate({
                                        'scrollTop': height
                                    }, 1000, 'swing');
                                }
                            },
                            error: function () { }
                        }
                        SecureAjaxCall.PassObject(config);
                    }
                }
                tabTitles.off('click').on('click', function () {
                    tabSwitcher($(this))
                });

                if (simulateClick == true) {
                    tabSwitcher(tabTitles.filter('.active'), simulateClick);
                } else {
                    tabSwitcher(tabTitles.first());
                }
            },
            BindOnlineComponents: function (data, targetContent) {
                EasyLibrary.RemoveLoader(targetContent);
                let html = '';
                let loadMore = false;

                // id attribute values of destination <li> elements
                const target = {
                    online: 'targetOnline',
                    purchased: 'targetPurchased',
                    installed: 'targetInstalled'
                };

                if (data != null && data.length > 0) {
                    let response = data;
                    if (response.length > WebManagement.config.OnlineLimit) {
                        loadMore = true;
                        response.splice(-1, 1);
                    }
                    let targetID = targetContent.attr('id');
                    if (targetID == target.online)
                        //onlineComponentArr = $.extend(onlineComponentArr, response);
                        onlineComponentArr = onlineComponentArr.concat(response);

                    $.each(response, function (index, item) {
                        let download = '';

                        function setHoverDOM(includePrice) {
                            if (includePrice === true) {
                                html += `<li class="compodownload" data-downloadtype=${item.DownloadType} data-ids=${item.ComponentID}>
                                     <div class="header">
                                         <span class="componentName">
                                            ${item.ComponentName}
                                         </span>
                                        <div class="download-count Pb-5">
                                            <span class="Fs-11">${item.DownloadCount} downloads</span>
                                        </div>
                                         ${download}
                                      </div>
                                      <div class="divComponentWrap">
                                         <img src=${item.Screenshot} />
                                     </div>
                                 </li>`;
                            } else {
                                html += `<li class="compodownload" data-downloadtype=${item.DownloadType} data-ids=${item.ComponentID}>
                                     <div class="header">
                                         <span class="componentName">
                                            ${item.ComponentName}
                                         </span>
                                         ${download}
                                      </div>
                                      <div class="divComponentWrap">
                                         <img src=${item.Screenshot} />
                                     </div>
                                 </li>`;
                            }
                        }
                        switch (targetID) {
                            case target.online:
                                if (parseFloat(item.Price) !== 0.0) {
                                    download = `<span>
                                        <div class="price-wrapper">
                                            <span class="Fs-13">${item.Currency} ${item.Price - item.Discount}</span>
                                            <span class="Fs-10 Ml-10"><s>${parseFloat(item.Discount) === 0.0 ? '' : item.Currency + item.Price}</s></span>
                                        </div>
                                        <div class="downloadcompo">Purchase</div>
                                    </span>`;
                                } else {
                                    download = `<span class="downloadcompo">Download</span>`;
                                }
                                setHoverDOM(true);
                                break;
                            case target.purchased:
                                download = `<span class="downloadcompo">Download</span>`;
                                setHoverDOM();
                                break;
                            case target.installed:
                                download = '<span class="Installed">Installed</span>';
                                setHoverDOM();
                                break;
                        }
                    });
                } else {
                    html += '<span class="noData">No Component Found!</span>';
                }
                let appendTo = targetContent.children('ul');
                appendTo.append(html);
                appendTo.find(".divCompSeeMore").remove();
                let htmlMore = '';
                if (loadMore) {
                    htmlMore += `<div class='divCompSeeMore'>
                                <a id='btnCompLoadMore' class='btn primary' href='javascript:void(0);'>Load More</a>
                                </div>`;
                    appendTo.append(htmlMore);
                }
                WebManagement.CompoBindEvent();
            },
            CheckOnlineComponetExistance: function (onlineID) {
                let exists = false;
                $.each(componentID, function (i, v) {
                    if (parseInt(v) === parseInt(onlineID))
                        exists = true;
                });
                return exists;
            },
            CheckOnlinePackageExistance: function (packageIDs) {
                let comIDs = packageIDs.trim().split(',');
                let finalPackage = [];
                $.each(comIDs, function (index, item) {
                    $.each(componentID, function (i, v) {
                        if (parseInt(v) === parseInt(item))
                            finalPackage.push(v);
                    });
                });
                let exists = (packageIDs == finalPackage.join(',')) ? true : false;
                return exists;
            },
            GetOnlineThemeFile: function (themeID) {
                let data = {
                    ThemeID: parseInt(themeID),
                };
                let config = {
                    async: false,
                    url: `${SageFrameHostURL}/Builder/GetOnlineThemeFile`,
                    data: JSON.stringify(data),
                    success: function (data) {
                        FullPageLoading(easyMessageList.themewaiting);
                        
                        setTimeout(function () {
                            ReloadPageNone();
                            location.reload();
                        }, 30000);
                        //if (data == null) {
                        //    ReloadPageNone();
                        //    window.location.href = message;
                        //} else {
                        //    let respose = data;
                        //    if (respose != null) {
                        //        let message = respose.Message;
                        //        let code = respose.Code;
                        //        if (code != null) {
                        //            let res = parseInt(code);
                        //            if (res == -1) {
                        //                SageAlertDialog("EasyBuilder verson is less than required verison.Go to upgrader to update first.");
                        //            } else if (res == -2) {
                        //                ReloadPageNone();
                        //                window.location.href = message;
                        //            } else if (res > 0) {
                        //                //UpdateComponentDownloadCount(UniversalComponentID, downLoadtype);
                        //                ReloadPageNone();
                        //                window.location.href = window.location;
                        //            } else {
                        //                SageAlertDialog("Error Occurred.");
                        //            }
                        //        }
                        //    } else {
                        //        ReloadPageNone();
                        //        window.location.href = message;
                        //    }
                        //}
                    },
                }
                SecureAjaxCall.PassObject(config);
            },
            GetOnlineSites: function (async, siteOffset, siteLimit, searchText, loadMore, isSiteSearch) {
                let sectorID = $('#slcSectors option:selected').val();
                let siteCategoryID = $('#slcSiteCategory option:selected').val();
                let businessTypeID = $('#slcBusinessType option:selected').val();
                let searchKey = $('#onlineSiteSearch').val();
                let applicationName = $('#slcApplicationName option:selected').val();

                //tab Functionality
                let siteTabTitleWrapp = $('.siteTabTitleWrapp');
                let siteTabTitles = siteTabTitleWrapp.children('li');
                let siteTabDetails = $('.siteTabDetails');
                let searchBar = $('#divAdvSearch');

                function tabSiteLoader(clickedTab, loadMoreEvent) {
                    let isSiteSearchClone = isSiteSearch;
                    let targetAttr = clickedTab.attr('data-target');
                    if (targetAttr == '#siteOnline')
                        searchBar.show();
                    else
                        searchBar.hide();
                    let targetContent = siteTabDetails.find(targetAttr);
                    clickedTab.addClass('active').siblings('li').removeClass('active');
                    targetContent.removeClass('Dn').siblings('li').addClass('Dn')
                    if (targetContent.children().length == 0 || loadMoreEvent) {
                        EasyLibrary.EnableLoader(targetContent);
                        let webMethod;
                        switch (targetAttr) {
                            case '#siteOnline':
                                webMethod = "GetOnlineSites";

                                break;
                            case '#sitePurchased':
                                webMethod = "GetPurchasedSites";

                                break;
                            case '#siteInstalled':
                                webMethod = "GetInstalledSites";
                                break;
                        }
                        let data = {
                            SectorID: parseInt(sectorID),
                            siteCategoryID: parseInt(siteCategoryID),
                            BusinessTypeID: parseInt(businessTypeID),
                            Offset: parseInt(siteOffset * siteLimit) + 1,
                            Limit: parseInt(siteLimit),
                            ThemeName: searchKey,
                            SecureToken: SageFrameSecureToken,
                            ApplicationName: applicationName
                        };
                        let config = {
                            async: false,
                            url: `${SageFrameHostURL}/Builder/${webMethod}`,
                            data: JSON.stringify(data),
                            success: function (data) {
                                if (isSiteSearchClone)
                                    targetContent.html('');
                                let height = targetContent.height() - targetContent.children().first().height();
                                WebManagement.BindOnlineSites(data, targetContent);
                                if (loadMore) {
                                    siteTabDetails.animate({
                                        'scrollTop': height
                                    }, 1000, 'swing');
                                }
                            },
                            error: function () { }
                        }
                        SecureAjaxCall.PassObject(config);
                    }
                }
                siteTabTitles.off('click').on('click', function () {
                    tabSiteLoader($(this));
                });
                if (loadMore == true)
                    tabSiteLoader(siteTabTitles.filter('.active'), loadMore);
                else
                    tabSiteLoader(siteTabTitles.first());
            },
            BindOnlineSites: function (data, onlineSiteWrapper) {
                EasyLibrary.RemoveLoader(onlineSiteWrapper);
                let html = '';
                let loadMore = false;
                let response = data; //JSONParse(data.d);
                if (response != null && response.length > 0) {
                    if (response.length > WebManagement.config.OnlineSiteLimit) {
                        loadMore = true;
                        response.splice(-1, 1);
                    }
                    $.each(response, function (index, item) {
                        if (onlineSiteWrapper.attr('id') === 'siteOnline') {
                            if (parseFloat(item.Price) !== 0.0) {
                                var priceInfo = `
                                                <div class="price-wrapper">
                                                    <span class="Fs-13">${item.Currency} ${item.Price - item.Discount}</span>
                                                    <span class="Fs-10 Ml-10"><s>${parseFloat(item.Discount) === 0.0 ? '' : item.Currency + item.Price}</s></span>
                                                </div>`;
                                var action = "Purchase"
                            } else {
                                priceInfo = '';
                                action = "Use This"
                            }
                            html += `<div class='tempThumb'>
                                    <div class='tempImgWrap compodownload'>
                                       <img src=${item.Screenshot} />
                                        <div class="header">
                                          <div class="componentName">${item.ThemeName}</div>
                                          <div class="download-count Pb-5"><span class="Fs-11">${item.DownloadCount} downloads</span></div>
                                           ${priceInfo}
                                          <div class='tempBtns'>
                                             <a class='btn btn-dark btnDemo' data-id=${item.ProductID} data-themeid=${item.ThemeID} data-previewurl=${item.DemoUrl} href='javascript:void(0);'>Preview</a>
                                             <a class='btn btn-default btnUsethis' data-id= ${item.ProductID} data-themeid=${item.ThemeID} href='javascript:void(0);'>${action}</a>
                                          </div>
                                       </div>
                                    </div>
                                    </div>`;
                        } else {
                            html += `<div class='tempThumb'>
                                    <div class='tempImgWrap compodownload'>
                                       <img src=${item.Screenshot} />
                                        <div class="header">
                                          <div class="componentName">${item.ThemeName}</div>
                                          <div class='tempBtns'>
                                             <a class='btn btn-dark btnDemo' data-id=${item.ProductID} data-themeid=${item.ThemeID} data-previewurl=${item.DemoUrl} href='javascript:void(0);'>Preview</a>
                                             <a class='btn btn-default btnUsethis' data-id= ${item.ProductID} data-themeid=${item.ThemeID} href='javascript:void(0);'>Use This</a>
                                          </div>
                                       </div>
                                    </div>
                                    </div>`;
                        }

                    });
                } else {
                    onlineSiteWrapper.html('');
                    html = "<span class='noData'>No Site Found!</span>";
                }
                onlineSiteWrapper.append(html);
                //$(".divSiteSeeMore").remove();
                onlineSiteWrapper.parent().find(".divSiteSeeMore").remove();
                let htmlMore = '';
                if (loadMore) {
                    htmlMore += `<div class='divSiteSeeMore'>
                                    <a id='btnSiteLoadMore' class='btn primary' href='javascript:void(0);'>Load More</a>
                                </div>`;
                    onlineSiteWrapper.parent().append(htmlMore);
                }

            },
            ClearBusinessControls: function (type) {
                if (type < 2) {
                    $('.site_category_select').addClass('disabled');
                    $('#slcSiteCategory').html('<option value="0">Select a Category</option>');
                }
                if (type < 3) {
                    $('.site_business_select').addClass('disabled');
                    $('#slcBusinessType').html('<option value="0">Select Business Type</option>');
                }
                if (type < 4) {
                    $('.business_keywords_select').addClass('disabled');
                    $('#slcBusinessKeywords').html('<option value="0">Select a keyword</option>');
                }
            },
            GetSectors: function (async) {
                let data = {
                    portalID: 1,
                    userModuleID: p.userModuleID,
                    userName: SageFrameUserName,
                    secureToken: SageFrameSecureToken
                };
                let config = {
                    async: false,
                    url: `${WebManagement.config.DigisphereAPI}GetSectorType`,
                    data: JSON.stringify(data),
                    success: function (data) {
                        WebManagement.GetSectorsSuccessCall(data);
                    },
                    error: function () { }
                }
                SecureAjaxCall.PassObject(config);
            },
            GetSectorsSuccessCall: function (data) {
                if (data.d != null) {
                    let sectorList = data.d;
                    let html = '';
                    html += '<option value="0">Select a Sector</option>';
                    $.each(sectorList, function (index, item) {
                        html += `<option value="${item.SectorTypeID}">${item.TypeName}</option>`;
                    });
                    $('#slcSectors').html(html);
                    $('#slcSectors').val(0);
                }
            },
            GetSiteCategories: function (sectorID) {
                let data = {
                    sectorID: sectorID,
                    portalID: 1,
                    userModuleID: p.userModuleID,
                    userName: SageFrameUserName,
                    secureToken: SageFrameSecureToken
                };
                let config = {
                    async: false,
                    url: `${WebManagement.config.DigisphereAPI}GetSiteTypes`,
                    data: JSON.stringify(data),
                    success: function (data) {
                        WebManagement.GetSiteCategoriesSuccessCall(data);
                    },
                    error: function () { }
                }
                SecureAjaxCall.PassObject(config);
            },
            GetSiteCategoriesSuccessCall: function (data) {
                if (data.d != null) {
                    $('.site_category_select').removeClass('disabled');
                    let sectorList = data.d;
                    let html = '';
                    html += '<option value="0">Select a Category</option>';
                    $.each(sectorList, function (index, item) {
                        html += '<option value="' + item.SiteTypeID + '">' + item.TypeName + '</option>';
                    });
                    $('#slcSiteCategory').html(html);
                    $('#slcSiteCategory').val(0);
                }
            },
            GetBusinessType: function (sectorID, siteCatID) {
                let data = {
                    sectorID: sectorID,
                    siteCatID: siteCatID,
                    portalID: 1,
                    userModuleID: p.userModuleID,
                    userName: SageFrameUserName,
                    secureToken: SageFrameSecureToken
                };
                let config = {
                    async: false,
                    url: `${WebManagement.config.DigisphereAPI}GetBusinessType`,
                    data: JSON.stringify(data),
                    success: function (data) {
                        WebManagement.GetBusinessTypeSuccessCall(data);
                    },
                    error: function () { }
                }
                SecureAjaxCall.PassObject(config);
            },
            GetBusinessTypeSuccessCall: function (data) {
                if (data.d != null) {
                    $('.site_business_select').removeClass('disabled');
                    let sectorList = data.d;
                    let html = '';
                    html += '<option value="0">Select a Business Type</option>';
                    $.each(sectorList, function (index, item) {
                        html += '<option value="' + item.BusinessTypeID + '">' + item.TypeName + '</option>';
                    });
                    $('#slcBusinessType').html(html);
                    $('#slcBusinessType').val(0);
                }
            },
            CompoBindEvent: function () {
                $('.downloadcompo').off().on('click', function () {
                    let $this = $(this);
                    FullPageLoading(easyMessageList.componentwaiting);
                    let $parent = $this.closest('.compodownload');
                    let downLoadtype = $parent.attr('data-downLoadtype');
                    let downLoadtypeID = $parent.attr('data-ids');
                    let index = $('.tabContent:not(.Dn) > ul.tabContentList > .compodownload').index($parent);
                    let compo = onlineComponentArr[index];

                    let dependencies = compo.Dependencies;
                    let version = compo.Version;
                    let success = UpdateComponent(compo.ComponentName, compo.ComponentID, version, downLoadtype, downLoadtypeID);
                    //if (success) {
                    //    $parent.addClass('installed');
                    //    let installed = '<span class="Installed">Installed</span>';
                    //    $(installed).insertAfter($this);
                    //    $this.remove();
                    //    UpdateComponentDownloadCount(compo.ComponentID, downLoadtype);
                    //}
                    //}
                });
            },


            CreateSidebar: function () {
                WebManagement.LayoutSet();
                let componentCollection = '';
                let componentList = Object.keys(component);
                let componentListLen = componentList.length;
                let layoutDOM = '';
                let basicDOM = '';
                let advanceDOM = '';
                let proDOM = '';
                let removeCompo = [];
                /*invoking the afterdrop of used components*/
                $('.editor-component, .cRow').each(function () {
                    let $me = $(this);
                    let dataType = $me.attr('data-type');
                    if (EasyLibrary.IsUndefined(dataType)) {
                        dataType = $me.find('> .SetHdlr > .com-settings').attr('data-type');
                    }
                    if (EasyLibrary.IsDefined(dataType) && EasyLibrary.IsDefined(component[dataType])) {
                        if (EasyLibrary.IsDefined(component[dataType].inherits)) {
                            dataType = component[dataType].inherits;
                        }
                        let index = removeCompo.indexOf(dataType);
                        if (index == -1) {
                            if (EasyLibrary.IsDefined(component[dataType]) && EasyLibrary.IsDefined(component[dataType].pageload)) {
                                try {
                                    component[dataType].pageload($('.site-body'), $me);
                                } catch (error) {
                                    WriteLog(dataType + " : " + error);
                                }
                                removeCompo.push(dataType);
                            } else if (EasyLibrary.IsDefined(component[dataType].afterdrop)) {
                                try {
                                    component[dataType].afterdrop($('.site-body'), $me);
                                } catch (error) {
                                    WriteLog(dataType + " : " + error);
                                }
                                removeCompo.push(dataType);
                            }
                        }
                    }
                });
                let $componentList = $('#componentCollection > .components-list-array');
                for (var i = 0; i < componentListLen; i++) {
                    let $compo = component[componentList[i]];
                    /*calling after drop of used component*/
                    if (!$compo['hidden']) {
                        let comName = $compo['componentname'];
                        let iconClass = $compo['icon'];
                        let compo = DOMCreate('i', '', iconClass) + '<br />' + comName;
                        let classes = 'comBasic comItemBlock ui-state-highlight';
                        if ($compo['row'])
                            classes = 'rowBasic heartBeat comItemBlock ui-state-highlight';
                        compo = DOMCreate('span', compo, classes, '', ['draggable="true"', 'data-type="' + comName + '"']);
                        let compoTab = $compo['category'].replace(/\s+/g, "_").toLowerCase();
                        if ($componentList.find('> .' + compoTab).length == 0) {
                            let comitems = DOMCreate('h4', $compo['category'] + ' Components', '') + DOMCreate('div', '', 'comItems');
                            comitems = DOMCreate('div', comitems, compoTab + ' components-list');
                            $componentList.append(comitems);
                        }
                        $componentList.find('> .' + compoTab).find('.comItems').append(compo);
                    }
                    if (EasyLibrary.IsDefined($compo) && EasyLibrary.IsDefined($compo.pageinit)) {
                        try {
                            $compo.pageinit();
                        } catch (error) {
                            //WriteLog(dataType + " : " + error);
                        }
                    }
                }
                $componentList.prepend($componentList.find('> .basic'));
                $('.comItems').hide();
                $('.components-list-array h4').on('click', function () {
                    let $this = $(this);
                    if (!$this.parent().hasClass('activeAccordion')) {
                        $('.components-list').removeClass('activeAccordion');
                        $('.comItems').slideUp(400);
                        $this.next().slideDown(400);
                        $this.parent().addClass('activeAccordion');
                    } else {
                        $this.parent().removeClass('activeAccordion');
                        $this.next().slideUp(400);
                    }
                });
                $('.components-list-array h4').eq(0).trigger('click');



                $('.comBasic , .rowBasic').each(function () {
                    GenericRemove($(this));
                });
                WebManagement.SideBarEvents();

                /*take side bar to right onload*/
                //var right = $(window).width() - $('.components').offset().left;
                /*var bottom = $(window).height() - $('.components').offset().top - $('.components').height();*/
                //$('.main-left').css({
                //    'right': 0,
                //    'left': 'auto',
                //});
                $('#dashboardLink').attr('href', SageFrameHostURL + '/dashboard/dashboard');

                $('.main-left .right_actions >.pin__right, #popupModel .right_actions >.pin__right').on('click', function () {
                    const $this = $(this);
                    let siteWidth = '';
                    if ($this.hasClass('pinned')) {
                        if ($('.fullpagepopupWrapper').length > 0) {
                            $('.fullpage-close-model').trigger('click');
                        }
                        //WebManagement.ShowForPopUp(true);
                    } else {
                        //WebManagement.HideForPopUp(true);
                        siteWidth = ScreenDimension().width - $('.main-left').width();
                        $('.main-left').css({
                            'top': '0px',
                            'left': siteWidth + 'px'
                        });
                        $('#popupModel').css({
                            'top': '0px',
                            'left': siteWidth + 'px'
                        });
                    }
                    $('.devicewrap').css({
                        "width": siteWidth
                    });
                });

                for (var key in component) {
                    if (component.hasOwnProperty(key)) {
                        let $this = component[key];
                        if (EasyLibrary.IsDefined($this.complete)) {
                            $this.complete();
                        }
                    }
                }
            },

            HideForPopUp: function (pinned) {
                // $('.main-left .drag_icon').hide();
                //$('.main-left .right_actions >.heademarControls').hide();
                // $('.main-left').draggable('disable');
                //$('#popupModel .drag_icon').hide();
                //$('#popupModel .right_actions >.heademarControls').hide();
                //$('#popupModel').draggable('disable');
                if (EasyLibrary.IsDefined(pinned) && pinned) {
                    $('.main-left .right_actions >.pin__right').addClass('pinned');
                    $('#popupModel .right_actions >.pin__right').addClass('pinned');
                }
            },
            ShowForPopUp: function (removePinned) {
                if (EasyLibrary.IsDefined(removePinned) && removePinned) {
                    $('.main-left .right_actions >.pin__right').removeClass('pinned');
                    $('#popupModel .right_actions >.pin__right').removeClass('pinned');
                }
                $('.main-left .drag_icon').show();
                $('.main-left .right_actions >.heademarControls').show();
                $('.main-left').draggable('enable');
                $('#popupModel .drag_icon').show();
                $('#popupModel .right_actions >.heademarControls').show();
                $('#popupModel').draggable('enable');
            },
            SideBarEvents: function () {
                $('.collapse').on('click', function () {
                    $('.main-left').hide();
                    $('.headerControls').removeClass('clicked');
                    $('.activeSetting').removeClass('.activeSetting');
                });

                $('#refreshComSearch').on('click', function () {
                    $('#componentSearch').val('');
                    WebManagement.RecycleSearch();
                });

                $('#componentSearch').on('keyup', function () {
                    let searchVal = $(this).val().trim();
                    if (searchVal.length == 0) {
                        WebManagement.RecycleSearch();
                    } else {
                        $('.components-list div').slideDown(400);
                        $('.comItemBlock').each(function () {
                            let $this = $(this);
                            let name = $this.text().toLowerCase();
                            let pos = name.indexOf(searchVal.toLowerCase());
                            if (pos < 0) {
                                $this.addClass('Dn');
                            } else {
                                $this.removeClass('Dn');
                            }
                        });
                    }
                });



                if ($('#ScroolToTop').length > 0) {
                    $('#chkScrollToTopBox').prop('checked', true);
                } else {
                    $('#chkScrollToTopBox').prop('checked', false);
                }
                $('#chkScrollToTopBox').on('click', function () {
                    if ($(this).is(':checked')) {
                        let scrollToTop = '';
                        webBuilderSettings.scrolltotop = true;
                        scrollToTop = DOMCreate("div", staticDOMs.scrolltotop, "scrolltotop", "ScroolToTop", ['style="display:none;"']);
                        $('.site-body').append(scrollToTop);
                        $('#ScroolToTop').on('click', function () {
                            $('body,html').animate({
                                scrollTop: '0px'
                            }, 1000);
                        });
                    } else {
                        $('#ScroolToTop').remove();
                        webBuilderSettings.scrolltotop = false;
                    }
                });
            },
            RecycleSearch: function () {
                $('.components-list').not('.activeAccordion').find('div').slideUp(400);
                $('.comItemBlock').each(function () {
                    $(this).removeClass('Dn');
                });
            },




            InitEvents: function () {
                let self = this
                InitTab();

                let tableDOM = `<table><tr><th rowspan="2">S.N</th><th colspan="3">Translate</th><th colspan="3">Rotate</th><th colspan="3">Skew</th><th colspan="3">Scale</th><th rowspan="2">Opacity</th><th rowspan="2">Keyframe</th></tr><tr><td> X</td><td> Y</td><td> Z</td><td> X</td><td> Y</td><td> Z</td><td> X</td><td> Y</td><td> Z</td><td> X</td><td> Y</td><td> Z</td></tr><tr class="effectState"><td><span class="addState"><i class="fa fa-plus addEffectState" aria-hidden="true"></i></span><span class="removeState Dn"><i class="fa fa-close removeEffectState" aria-hidden="true"></i></span></td><td><input type="number" value="100" /></td><td><input type="number" value="100" /></td><td><input type="number" value="100" /></td><td><input type="number" value="100" /></td><td><input type="number" value="100" /></td><td><input type="number" value="100" /></td><td><input type="number" value="100" /></td><td><input type="number" value="100" /></td><td><input type="number" value="100" /></td><td><input type="number" value="100" /></td><td><input type="number" value="100" /></td><td><input type="number" value="100" /></td><td><input type="number" value="100" /></td><td><input type="number" value="0" name="keyframe" /></td></tr></table><style>
    table {
        border-collapse: collapse;
        width: 100%;
        text-align: center;
    }
    
    table,
    tbody,
    tr,
    td,
    th {
        border: 1px solid black;
    }
    
    td {
        text-align: center;
    }
    
    th {
        vertical-align: top;
    }
    
    input {
        border: none;
        width: 90%;
    }
</style>`;
                $('#animEffects').on('click', function () {
                    let selectDOM = DOMCreate('div',
                        DOMCreate('span',
                            //SelectDOMCreate('scrolleffect' + idSuffix, 'scrolleffect', [['none', 'None'],['slide','slide'], ['fade-up', 'fade-up'], ['fade-down', 'fade-down'], ['fade-left', 'fade-left'], ['fade-right', 'fade-right']]),//['zoom-in', 'zoom-in'], ['zoom-out', 'zoom-out']
                            CreateSelectGroupDOM('scrollEffects', 'scrolleffect', effectSelectOption),
                            'select__box'),
                        'fCol TxAl-r');
                    let d = `<div class="animation-wrapper Dfx sfCol_100 Pt-20">

    <div id="animationEffectsWrap" class="animationEffectsWrap leftSide sfCol_70 Dib">
        <div class="sideTitle Pl-10 Pr-10">Animations</div>
        <div id="animationEffects" class="animationEffects"></div>
    </div>
    <div id="customEffEditor" class="customEffEditor leftSide Dib sfCol_70 Dn">
    </div>
    <div class="rightSide sfCol_30"> 
    <div class="sideTitle ">Preview</div>  
        <div class="rightSide-wrap Pt-20">
            <div class="Dfx whole">
                <div class="viewbox Dfx TxAl-m elements Pl-20 Pr-20">
                        <div class="previewWrap">
                            <div id="mainPreview" class="mainPreview">
                                <div class="circle element Dib"></div>
                            </div>
                        </div>    
                </div>   
                <div class="field-row controlSide">
                    <div class="manageCustomeEffect" id="manageCustomEffect"></div>
                     <div class="fCol T saveAnimation   Pt-25 Pb-15 Pl-25 Pr-25" id="btnSaveCancel">
	                    <span class="btn-outline Mr-10" id="applyEffect">Apply</span>
	                    <span class="btn-create" id="saveCustomEffect">Save</span>
                    </div>
                </div> 
            </div>
        </div>
    </div>
</div>`;
                    let dom = `${d}`;
                    let option = {
                        heading: "Animation Effects",
                        data: dom,
                        showheading: true,
                        width: "90%",
                        advance: false,
                        onappend: function ($wrap) {
                            $('#customEffEditor').html(tableDOM);
                            $('.fullpagepopup').css({
                                'height': '90%',
                                'max-height': ''
                            });
                            $('.fullpagepopup').addClass('animation-window');
                            $('.fullpagepopupWrapper').addClass('lightSch');
                            let IsKeyframeChanged = false;
                            createEffectDOM();
                            changeEvent();
                            eventListener();
                            if ($('.animEffectThumb').length > 0)
                                $('.animEffectThumb').eq(0).trigger('click');

                            function eventListener() {
                                //$('#createCustomEffect').off().on('click', function () {
                                //    $('#manageCustomEffect').removeClass('Dn');
                                //});
                                $('.addframes').off().on('click', function () {
                                    let $this = $(this);
                                    let keyframe = calcKeyframe($this, true);
                                    $($this.closest('.effectState')[0].outerHTML).insertAfter($this.parent());
                                    if ($this.parent().find('input[name="keyframe"]').val() == 100)
                                        $this.parent().find('input[name="keyframe"]').val(keyframe);
                                    else
                                        $this.parent().next('.effectState').find('input[name="keyframe"]').val(keyframe);
                                    //updateKeyframe($this, true);
                                    changeEvent();
                                    $parent.next('.effectState').find('input').eq(0).focus();
                                    $('#customEffEditor .effectState:last').find('input[name="keyframe"]').val(100);
                                });
                                $('.addState').off().on('click', function () {
                                    let $this = $(this);
                                    let $parent = $this.closest('.effectState');
                                    let keyframe = calcKeyframe($this, true);
                                    $($parent[0].outerHTML).insertAfter($parent);
                                    if ($parent.find('input[name="keyframe"]').val() == 100)
                                        $parent.find('input[name="keyframe"]').val(keyframe);
                                    else
                                        $parent.next('.effectState').find('input[name="keyframe"]').val(keyframe);
                                    changeEvent();
                                    //updateKeyframe($this, true);
                                    $('#manageCustomEffect .effectState:last').find('input[name="keyframe"]').val(100);
                                    $parent.next('.effectState').find('input').eq(0).focus();
                                    eventListener();
                                });
                                $('#manageCustomEffect input').off().on('keyup, click', function (event) {
                                    IsKeyframeChanged = true;
                                    let $this = $(this);
                                    let max = $this.attr('max');
                                    console.log(max);
                                    if ($this.val() > 100)
                                        $this.val(100);
                                    else if ($this.val() < 0)
                                        $this.val(0);
                                });
                                $('.removeEffectState').off().on('click', function () {
                                    let $this = $(this).closest('.effectState')[0];
                                    SageConfirmDialog('Are you sure to delete remove this?').done(function () {
                                        $this.remove();
                                        eventListener();
                                    });
                                });
                                //$(".thumbIcon").click(function () {
                                //    var $this = $(this);
                                //    $('targetEle').removeClass('selected');
                                //    if ($this.data('clicked')) {
                                //        $this.addClass('selected');
                                //    }
                                //});
                                $('.animEffectThumb').off().on('click', function () {
                                    let $this = $(this);
                                    //ApplyScrollEffect($wrap.find('.element'), $this.attr('animation-effect'));
                                    $('.animEffectThumb').removeClass('selected');
                                    $this.addClass('selected');
                                    dataEvent($this.attr('animation-effect'))
                                    changeEvent();
                                    eventListener();
                                    // $(`#effectList li[data-animation="${animType}"]`);
                                    // $(`#effectList li[data-animation="${animType}"]`).trigger('click');
                                    //$('#btnCustomEffect').removeClass('Dn');
                                });

                                $('.preview').off().on('click', function () {
                                    ApplyScrollEffect($wrap.find('.element'), $(this).closest('.animEffectThumb').attr('animation-effect'));
                                });
                                //$('.fullpage-popup-model-body>div:not(.animEffectThumb)').off().on('click', function () {
                                //    console.log($(this).closest('.animEffectThumb').length);
                                //    if ($(this).closest('.animEffectThumb').length < 1) {
                                //        $('.animEffectThumb').removeClass('selected');
                                //        $('#btnCustomEffect').addClass('Dn');
                                //    }
                                //});
                                //$('div').off().on('click', function () {
                                //    if (!$(this).hasClass('animEffectThumb')) {
                                //        console.log('dfdsd');
                                //        $('.animEffectThumb').removeClass('selected');
                                //        $('#btnCustomEffect').addClass('Dn');
                                //    }
                                //});
                                //$('#btnCustomEffect').off().on('click', function () {
                                //    //$("#animationEffects,.effectWrappers").removeClass('Dn').addClass('Dn');
                                //    //$(this).addClass('Dn');
                                //    let $this = $(this);


                                //    //$("#manageCustomEffect,#btnSaveCancel").removeClass('Dn');
                                //    //let effectType = $('#animationEffects .selected').attr('animation-type').toLowerCase();
                                //    //$(`#${effectType}Effects`).removeClass('Dn').addClass('customAnim');
                                //    let effectsList = createAnimationList();
                                //    $('#effectList').html(effectsList);
                                //    $(`<div class="fCol Pl-20 Pr-20"><span class="lai btn-create" id="btnBackToEff">Back</span></div>`).appendTo('#effectList');
                                //    $('#effectList,#btnBackToEff').removeClass('Dn');
                                //    $('#animationEffects').addClass('Dn');
                                //    $this.addClass('Dn');
                                //    eventListener();
                                //    if ($('.animEffectThumb.selected').length > 0) {
                                //        let animType = $('.animEffectThumb.selected').attr('animation-effect');
                                //        $(`#effectList li[data-animation="${animType}"]`);
                                //        $(`#effectList li[data-animation="${animType}"]`).trigger('click');

                                //    }

                                //    //$(`#${effectType}Effects`).attr('animation-type', effectType);
                                //});
                                //$('#btnBackToEff').off().on('click', function () {
                                //    $('#effectList,#manageCustomEffect').addClass('Dn');
                                //    $('#animationEffects,#btnCustomEffect').removeClass('Dn');
                                //});
                                //$('#cancelCustom').off().on('click', function () {
                                //    $("#manageCustomEffect,#btnSaveCancel, .effectWrappers").removeClass('Dn').removeClass('customAnim').addClass('Dn');
                                //    $("#animationEffects").removeClass('Dn');
                                //});
                                $('#btnCustomEffect').off().on('click', function () {
                                    $('#animationEffectsWrap').addClass('Dn');
                                    $('#customEffEditor').removeClass('Dn');
                                });
                                $("#applyEffect").off().on('click', function () {
                                    var values = [];
                                    $(`#manageCustomEffect .effectData`).each(function () {
                                        let value = {};
                                        $(this).find('input').each(function (i, v) {
                                            value[v.name] = v.value;
                                        });
                                        values.push(value);
                                    });
                                    console.log(values);
                                    ApplyScrollEffect($wrap.find('.element'), $('#animationEffects .selected').attr('animation-effect'), 1000, true, values);
                                });
                                //$('#effectList li').off().on('click', function () {
                                //    let $this = $(this);
                                //    $('#effectList').find('.selected').removeClass('selected');
                                //    $this.addClass('selected');
                                //    let animationName = $this.attr('data-animation');
                                //    $('#manageCustomEffect').removeClass('Dn');
                                //    $('#manageCustomEffect').append('	<div class="customEffectHeader" id="customEffectHeader"><span>X-axis</span><span>Y-Axis</span><span>Z-Axis</span><span>Rotation</span><span>Skew</span><span>Opacity</span><span>Keyframe</span></div>');
                                //    //$('<div class="customEffectVal effectState"><input type="number" value=0 name="translateX" min="-500" max="500"/><input type="number" value=0 name="translateY" min="-500" max="500"/><input type="number" value=0 name="translateZ" min="-500" max="500"/><input type="number" value=0 name="rotateX" min="-500" max="500"/><input type="number" value=0 name="skewX" min="-500" max="500"/><input type="number" name="opacity" min="0" max="1"/><input type="number" value=0 name="keyframe" min="-0" max="100"/><i class="fa fa-plus-circle addEffectState" aria-hidden="true"></i><i class="fa fa-minus-circle removeEffectState Dn" aria-hidden="true"></i></div>').insertAfter('#customEffectHeader');


                                //});
                            }

                            function dataEvent(animationName) {
                                let effectDataDOM = '';
                                if (animationName !== undefined && animationName !== null)
                                    $.each(effectList[animationName].values, function (i, v) {
                                        effectDataDOM += `<div class="customEffectVal effectState Pt-20 Pb-20">
	                                    <div class="effectData">
                                            <div class="DataWrapper Dfx TxAl-m">
                                                <div class="keylabel">
                                                    <label>X-axis</label>
                                                </div>
                                                <div class="keyvalue">
                                                    <input type="number" value="${v.translateX == undefined ? 0 : v.translateX}" name="translateX" min="-500" max="500"/>
                                                </div>
                                            </div>

                                            <div class="DataWrapper Dfx TxAl-m">
                                                <div class="keylabel">
                                                    <label>Y-axis</label>
                                                </div>
                                                <div class="keyvalue">
                                                    <input type="number" value="${v.translateY == undefined ? 0 : v.translateY}" name="translateY" min="-500" max="500"/>
                                                </div>
                                            </div>

                                            <div class="DataWrapper Dfx TxAl-m">
                                                <div class="keylabel">
                                                    <label>Z-axis</label>
                                                </div>
                                                <div class="keyvalue">
                                                    <input type="number" value="${v.translateZ == undefined ? 0 : v.translateZ}" name="translateZ" min="-500" max="500"/>
                                                </div>
                                            </div>

                                            <div class="DataWrapper Dfx TxAl-m">
                                                <div class="keylabel">
                                                    <label>Rotation</label>
                                                </div>
                                                <div class="keyvalue">
                                                     <input type="number" value="${v.rotateX == undefined ? 0 : v.rotateX}" name="rotateX" min="-500" max="500"/>
                                                </div>
                                            </div>

                                             <div class="DataWrapper Dfx TxAl-m">
                                                <div class="keylabel">
                                                    <label>Skew</label>
                                                </div>
                                                <div class="keyvalue">
                                                     <input type="number" value="${v.skewX == undefined ? 0 : v.skewX}" name="skewX" min="-500" max="500"/>
                                                </div>
                                            </div>
                                            <div class="DataWrapper Dfx TxAl-m">
                                                <div class="keylabel">
                                                    <label>Scale</label>
                                                </div>
                                                <div class="keyvalue">
                                                     <input type="number" value="${v.scaleX == undefined ? 1 : v.scaleX}" name="scaleX" min="-500" max="500"/>
                                                </div>
                                            </div>

                                            <div class="DataWrapper Dfx TxAl-m">
                                                <div class="keylabel">
                                                    <label>Opacity</label>
                                                </div>
                                                <div class="keyvalue">
                                                     <input type="number" value="${v.opacity == undefined ? 1 : v.opacity}" name="opacity" min="0" max="1"/>
                                                </div>
                                            </div>
                                            <div class="DataWrapper Dfx TxAl-m">
                                                <div class="keylabel">
                                                    <label>Keyframe</label>
                                                </div>
                                                <div class="keyvalue">
                                                     <input type="number" value="${v.keyframe == undefined ? 0 : v.keyframe}" name="keyframe" min="-0" max="100"/>
                                                </div>
                                            </div>
	                                   </div>
                                    <span class="addframes"><i class="fa fa-plus addEffectState" aria-hidden="true"></i></span>
                                    <span class="removeFrames"><i class="fa fa-close removeEffectState" aria-hidden="true"></i></span>
                                    </div>`
                                    });
                                $('#manageCustomEffect').html(effectDataDOM);
                                eventListener();
                                //$(`<div class="fCol T saveAnimation   Pt-25 Pb-15" id="btnSaveCancel"><span class="btn-create Mr-10" id="applyEffect">Apply</span><span class="btn-create" id="saveCustomEffect">Save</span></div>`).appendTo('.controlSide');
                            }

                            //function createAnimationList() {
                            //    let listDOM = '<ul>';
                            //    $.each(animationEffectList, function (i, v) {
                            //        listDOM += `<li data-animation="${v.effect}">${v.name}</li>`;
                            //    });
                            //    listDOM += '</ul>';
                            //    return listDOM;
                            //}
                            function createEffectDOM() {
                                let DOM = '';
                                $.each(effectSelectOption, function (index, effGrp) {
                                    DOM += `<div class="effectgroup"> 
                                              <label>${effGrp[0].group}</label>`;
                                    $.each(effGrp, function (index, val) {
                                        DOM += DOMCreate('div', DOMCreate('span', `<img src="/MediaThumb/medium/Media/animation-thumb.png"><span class="preview"> <i class="fa fa-play"></i></span>`, 'effectIcon') + DOMCreate('span', val.name, 'effectName'), 'sfCol_50 Dib animEffectThumb', '', [`animation-type="${val.group}"`, `animation-effect="${val.effect}"`]);
                                    });
                                    DOM += '</div>';
                                });
                                if (typeof (DOM) !== "undefined" && DOM !== '') {
                                    $("#animationEffects").html(DOM);
                                    $(`<div class="fCol Pl-10 Pr-10"><span class="lai btn-create" id="btnCustomEffect">Custom</span></div>`).insertAfter('#animationEffects');
                                }
                                eventListener();
                            }

                            //function nextKeyframeState($this) {
                            //    return $this.parent().next().is('.effectState');
                            //}

                            //function calcKeyframe($this, isAdded) {
                            //    let _thisElement = $this.parent();
                            //    let keyframe = 'input[name="keyframe"]';
                            //    let initial = _thisElement.find(keyframe).val();
                            //    let finalVal = 100;
                            //    if (!isAdded || initial == 100) {
                            //        if (_thisElement.prev().is('.effectState'))
                            //            initial = _thisElement.prev('.effectState').find(keyframe).val();
                            //    }
                            //    if (_thisElement.next().is('.effectState')) {
                            //        finalVal = _thisElement.next('.effectState').find(keyframe).val();
                            //        return Number(Number(initial) + Number((finalVal - initial) / 2));
                            //    } else {
                            //        return Number(Number(initial) + Number((finalVal - initial) / 2));
                            //    }
                            //}


                            function calcKeyframe($this, isAdded) {
                                let _thisElement = $this.closest('tr');
                                let keyframe = 'input[name="keyframe"]';
                                let initial = _thisElement.find(keyframe).val();
                                let finalVal = 100;
                                if (!isAdded || initial == 100) {
                                    if (_thisElement.prev().is('.effectState'))
                                        initial = _thisElement.prev('.effectState').find(keyframe).val();
                                }
                                if (_thisElement.next().is('.effectState')) {
                                    finalVal = _thisElement.next('.effectState').find(keyframe).val();
                                    return Number(Number(initial) + Number((finalVal - initial) / 2));
                                } else {
                                    return Number(Number(initial) + Number((finalVal - initial) / 2));
                                }
                            }


                            //function updateKeyframe($this, isAdded) {
                            //    let _thisElem = $this.parent();
                            //    let keyframe = 'input[name="keyframe"]';
                            //    let initValue = Number(_thisElem.find(keyframe).val());
                            //}

                            function changeEvent() {
                                //let $parentEle = $('#manageCustomEffect');
                                //$parentEle.find('.removeFrames').removeClass('Dn');
                                //$parentEle.find('.removeFrames').eq(0).addClass('Dn');
                                let $parentEle = $('#customEffEditor');
                                $parentEle.find('.removeState').removeClass('Dn');
                                $parentEle.find('.removeState').eq(0).addClass('Dn');
                                eventListener();
                            }

                            //$('#btnShowEffects').off().on('click', function () {
                            //    ApplyScrollEffect($wrap.find('#mainPreview'), $('#scrollEffects').val());
                            //    eventListener();

                            //});
                            //$('#scrollEffects').on('change', function () {
                            //    let $this = $(this);
                            //    $('.effectWrappers').addClass('Dn');
                            //    let val = $this.val();
                            //    val = $(`option[value="${val}"]`).parent().attr('data-effect');
                            //    $('#' + val + 'Effects').removeClass('Dn');
                            //    eventListener();
                            //});
                            // CloseFullPagePopup();
                        },
                        onclose: function ($wrap) {
                            $('.fullpagepopup').css('height', '');
                            $('.fullpagepopup').removeClass('animation-window');
                        }
                    };
                    FullPagePopup(option);
                });

                if (typeof webBuilderSettings.isunderconstruction !== "undefined" && webBuilderSettings.isunderconstruction) {
                    $('#chkUnderConstruction').addClass('active');
                    $('#chkUnderConstruction').attr('checked', "checked");
                    $('#underConstructionNote').show();
                }
                $('#chkUnderConstruction').on('click', function () {
                    let $this = $(this);
                    if ($this.hasClass('active')) {
                        $('#managePagePanel').trigger('click');
                    } else {
                        SageConfirmDialog(easyMessageList.underconstruction, easyMessageList.underconstructiontitle).done(function () {
                            let pageUName = 'Under Construction';
                            WebManagement.SetDefaultPage(pageUName);
                            $this.addClass('active');
                        })
                            .fail(function () {
                                $this.removeClass('active');
                                $this.removeAttr('checked');
                            });
                    }
                });
                $('.btnSystemPages').on('click', function () {
                    let pgName = $(this).attr('data-pages');
                    SageConfirmDialog(' All your unsaved data will be lost. Are you sure you want to edit "' + pgName + '" page?').done(function () {
                        let href = WbHostURL + '/' + pgName.replace(/ /g, '-');
                        window.location = href;
                    });
                });
                $('.close-model').on('click', function () {
                    FadeOutPopUpSetting();
                });
                $('#ui-draggable').removeClass('ui-draggable');
                $('#popupModel').draggable({
                    containment: '.main-container',
                    handle: '.popup-header',
                    start: function (e, ui) {
                        $(ui.helper).css({
                            "position": "fixed"
                        });
                    },
                    stop: function (event, ui) {
                        //AutoAlignDragger(ui.helper);
                    }
                });

                PagelinkStop();
                $('#manageBody').on('click', function () {
                    $activeDOM = $('.editor-box');
                    let attrs = $('#element').attrs();
                    let type = "settingDOMs";
                    if ($('.active.changePort').hasClass('desktop')) {
                        PopUpSetting('Body Settings', 50, 200, 0, 0, 'body', type, $('.editor-box'), $(this));
                    } else {
                        PopUpSettingResponsive('Body Settings', 0, 0, 0, 0, 'body', 'responsiveDOMs', $('.editor-box'));
                    }
                });

                $('#UpdateComponent').on('click', function () {
                    SageConfirmDialog(easyMessageList.updatecomponent, easyMessageList.updatecomponenttitle).done(function () {
                        let data = {
                            SecureToken: SageFrameSecureToken,
                            ComponentIDs: componentID.join(','),
                            Version: WebManagement.config.version
                        };
                        let config = {
                            async: false,
                            url: `${SageFrameHostURL}/Builder/UpdateExistingComponent`,
                            data: JSON.stringify(data),
                            success: function (data) {
                                window.location.href = window.location.href;
                            },
                        }
                        SecureAjaxCall.PassObject(config);
                    });
                });
                /*to be update at after everything is called*/
                DraggableSortable();
                SettingEvents();
                WebManagement.SetbackgroundColor();
                WebManagement.SetbackgroundWidth();
                FixMenuOnResize();
                $('#ExportWebsite').on('click', function () {
                    $('.exportsiteeasily').trigger('click');
                });
            },
            SetDefaultPage: function (newPageName) {
                SecureAjaxCall.PassObject({
                    url: `${SageFrameHostURL}/webbuilder/SetDefaultPage`,
                    data: JSON.stringify({
                        PageName: newPageName
                    }),
                    success: function (data) {
                        if (data == 1) {
                            if (pageName = 'Under Construction') {
                                $('#underConstructionNote').show();
                                webBuilderSettings.isunderconstruction = true;
                            } else {
                                ReadMenu();
                                $('#chkUnderConstruction').removeClass('active');
                                $('#underConstructionNote').hide();
                                webBuilderSettings.isunderconstruction = false;
                            }
                            portalDefaultPage = newPageName;
                            //UpdateSettings();
                            UpdateSettingKeyValue("defaultPage", newPageName);
                        }
                    },
                });
            },
            SaveWebData: function (isPreview) {
                let $cloneDOM = $('#WebBuilderWrapperClone');
                let $editHtml = $('#WebBuilderWrapperEditClone');
                $cloneDOM.html($('.edit-area').html());
                $editHtml.html($('.edit-area').html());
                $('.actEle').removeClass('actEle');
                $.each(component, function (componentname, v) {
                    if (EasyLibrary.IsDefined(component[componentname]["package"]) &&
                        EasyLibrary.IsDefined(component[componentname]["package"]["API"])) {
                        component[componentname]["package"]["API"] = [];
                    }
                    if ($cloneDOM.find(`.cRow[data-type="${componentname}"]`).length > 0) {
                        if (typeof v.remove !== "undefined") {
                            v.remove($cloneDOM);
                        }
                    }
                    if ($cloneDOM.find(`.editor-component[data-type="${componentname}"]`).length > 0) {
                        if (typeof v.remove !== "undefined") {
                            v.remove($cloneDOM);
                        }
                    }
                    if ($editHtml.find(`.editor-component[data-type="${componentname}"],  .cRow[data-type="${componentname}"]`).length > 0) {
                        if (typeof v.removeedit !== "undefined") {
                            v.removeedit($editHtml);
                        }
                    }
                });
                $cloneDOM.find('.SetHdlr').remove();
                $cloneDOM.find('.proLoader').remove();
                $editHtml.find('.proLoader').remove();
                $cloneDOM.find('.column-data-empty').remove();
                // $cloneDOM.find('.carrier-open-option').remove();
                $cloneDOM.find('.ui-droppable').each(function () {
                    $(this).removeClass('ui-droppable');
                });
                $cloneDOM.find('.ui-sortable').each(function () {
                    $(this).removeClass('ui-sortable');
                });
                /*remove contententeditable*/
                $cloneDOM.find('[contenteditable="true"]').removeAttr('contenteditable');
                $cloneDOM.find('.editor-component').removeClass('ui-sortable');
                $cloneDOM.find('.editor-component').removeClass('ui-droppable');
                $cloneDOM.find('.activeOption').removeClass('activeOption');
                $cloneDOM.find('.resizebar').remove();
                $cloneDOM.find('.noElement').remove();
                $cloneDOM.find('.pagelink.active-page').removeClass('active-page');
                /*to be remove at last*/
                $('.cGrid').each(function () {
                    let $this = $(this);
                    $this.removeAttr('data-width');
                    $('.cGrid').css({
                        'width': ''
                    });
                });

                /*apply header with fake URL*/
                let $header = $('.editor-site-header').find('.menuHeader:visible .eb-menu');
                let $headerColor = $header.attr('data-textcolor');
                let $cloneHeader = $cloneDOM.find('> .editor-site-header');
                $editHtml.find('.SetHdlr > .stng > .setDrp').hide();
                $editHtml.find('.addPro, .drag, .sortComponent').removeClass('Dn');
                $cloneDOM.find('.eb-menu li').find('a').each(function () {
                    let $this = $(this);
                    let href = $this.attr('href');
                    if (typeof href !== "undefined") {
                        href = WebManagement.ReturnHref(href);
                        $this.attr('href', href);
                    }
                });
                $cloneDOM.find('.menuHeader:visible .eb-menu li').find('a').each(function () {
                    let $this = $(this);
                    $this.removeClass('active-page');
                    $this.css({
                        'background-color': '',
                        'border-color': ''
                    });
                    $this.find('span').css({
                        'color': $headerColor
                    });
                });
                $cloneDOM.find('.anchorpage').each(function () {
                    let $this = $(this);
                    let href = $this.attr('href');
                    href = WebManagement.ReturnHref(href);
                    $this.attr('href', href);
                });
                let $activePage = $cloneDOM.find('.menuHeader:visible .eb-menu li > a.active-page');
                let $activeBG = $activePage.css('background-color');

                let $color = $activePage.find('span').css('color');
                $activePage.removeClass('active-page').css('background-color', '');
                $activePage.find('span').css('color', $headerColor);
                let $border = $activePage.css('border');
                $activePage.css('border', '');

                $cloneHeader.find('> .cRow').removeClass('stick');
                $editHtml.find('.editor-site-header > .cRow').removeClass('stick');

                $cloneHeader.css('width', '');
                $cloneHeader.find(' > .cRow').css('width', '');

                $editHtml.find('.editor-site-header').css('width', '');
                $editHtml.find('.editor-site-header > .cRow').css('width', '');

                $editHtml.find('.copyData').removeClass('readyCopy');
                $editHtml.find('.pasteData').removeClass('activePaste');


                //$cloneDOM.find('img').each(function () {
                //    ChangeImgToFakeURL($(this));
                //});

                //$cloneDOM.find('div').each(function () {
                //    let $this = $(this);
                //    ChangeBGToFakeURL($this);
                //});

                //$editHtml.find('img').each(function () {
                //    ChangeImgToFakeURL($(this));
                //});

                //$editHtml.find('div').each(function () {
                //    let $this = $(this);
                //    ChangeBGToFakeURL($this);
                //});
                $editHtml.find('.eb-menu li').find('a').each(function () {
                    let $this = $(this);
                    let href = $this.attr('href');
                    href = WebManagement.ReturnHref(href);
                    $this.attr('href', href);
                });
                $editHtml.find('.anchorpage').each(function () {
                    let $achor = $(this);
                    let href = $achor.attr('href');
                    href = WebManagement.ReturnHref(href);
                    $achor.attr('href', href);
                });
                $editHtml = WebManagement.RemoveStickyHeader($editHtml);
                $cloneDOM = WebManagement.RemoveStickyHeader($cloneDOM);
                $cloneHeader = WebManagement.RemoveActiveHeader($cloneHeader);
                $header = WebManagement.RemoveActiveHeader($header);

                function ChangeImgToFakeURL($elem) {
                    let src = $elem.attr('src');
                    if (typeof src !== "undefined" && src.indexOf("http://") === -1 && src.indexOf("https://") === -1) {
                        let backslash = src.substring(0, 1) === "/" ? "" : "/";
                        $elem.attr('src', `${SageFrameHostURL}${backslash}${src}`);
                    }
                }

                function ChangeBGToFakeURL($elem) {
                    let parentBgImage = $elem.css('background-image');
                    if (typeof (parentBgImage) !== 'undefined' && parentBgImage !== 'none') {
                        parentBgImage = parentBgImage.replace('url(', '').replace(')', '').replace(/\"/gi, "");
                        if (typeof parentBgImage !== "undefined") {
                            /*for chrome it absolute path for relative path For eg.'/Media/mainbanner_2017_07_19_15_46_49.png it gives 'http://172.18.12.40:9181/Media/mainbanner_2017_07_19_15_46_49.png'*/
                            parentBgImage = parentBgImage.replace(SageFrameHostURL, '').trim();
                            if (parentBgImage.indexOf("http://") === -1 && parentBgImage.indexOf("https://") === -1) {
                                let backslash = parentBgImage.substring(0, 1) === "/" ? "" : "/";
                                let url = `url('${SageFrameHostURL}${backslash}${parentBgImage}')`;
                                $elem.css('background-image', '').css('background-image', url);
                            }
                        }
                    }
                }

                $cloneDOM.find('img').each(function () {
                    SetFakeImage($(this));
                });
                $cloneDOM.find('[data-backgroundimage="image"]').each(function () {
                    SetFakeBGImage($(this));
                });
                let editHtml = $('<div/>').text($editHtml.find('> .editor-componentWrapper').html()).html().replace(/\>\s+\</g, '><').trim();
                let viewHtml = $('<div/>').text($('#WebBuilderWrapperClone > .editor-componentWrapper').html()).html().replace(/\>\s+\</g, '><').trim();
                /*header*/
                let header = $('<div/>').text($('#WebBuilderWrapperClone > .editor-site-header').html()).html().trim();
                let headerEdit = $('<div/>').text($editHtml.find('> .editor-site-header').html()).html().trim();
                webBuilderSettings.body = $('.editor-box').attrs();
                let paddingCls = webBuilderSettings.body.class.match(/([a-z]?)P([a-z])-[0-9]{1,3}/g);
                let bgEffectCls = webBuilderSettings.body.class.match(/background-effect-([a-z]+)-([a-z]+)/g);
                let removeDeviceClass = webBuilderSettings.body.class.replace('main-container', '').replace('editor-box', '').trim();
                webBuilderSettings.body.class = webBuilderSettings.body.class.replace(removeDeviceClass, '').trim();
                if (paddingCls && paddingCls.length > 0) {
                    webBuilderSettings.body.class += ' ' + paddingCls.join(' ');
                }
                if (bgEffectCls && bgEffectCls.length > 0) {
                    webBuilderSettings.body.class += ' ' + bgEffectCls.join(' ');
                }
                let footer = $('<div/>').text($('#WebBuilderWrapperClone > .editor-site-footer').html()).html().trim();
                let footerEdit = $('<div/>').text($editHtml.find('> .editor-site-footer').html()).html().trim();

                /*revert highlight menu color*/
                $activePage.addClass('active-page').css('background-color', $activeBG);
                $activePage.find('span').css('color', $color);
                $activePage.css('border', $border);
                if ($('.editor-box > .editor-row-shaded-layer').length > 0) {
                    webBuilderSettings.shadedLayer = $('.editor-box > .editor-row-shaded-layer').attrs();
                } else {
                    webBuilderSettings.shadedLayer = null;
                }
                let pageName = 'webbuildertemppagename';
                if (WebManagement.config.enableHeader == "true") {
                    pageName = WebManagement.config.tempPageName;
                }

                /*save the API detail if any present in the component*/
                let packageXML = '';

                let componentNames = Object.keys(component);
                let message = '';
                $.each(component, function (index, $compo) {
                    let $this = $(this);
                    let componentName = index;
                    if ($cloneDOM.find(`[data-type="${componentName}"]`).length > 0) {
                        let apiDuplicate = [];
                        if (EasyLibrary.IsDefined($compo.package)) {
                            if (EasyLibrary.IsDefined($compo.package.API)) {
                                if ($compo.package.API.length > 0) {
                                    $.each($compo.package.API, function (index, api) {
                                        let APICntrl = new APIController();
                                        APICntrl.ComponentName = componentName;
                                        APICntrl.NameSpace = api.NameSpace;
                                        APICntrl.ClassNames = api.ClassNames;
                                        APICntrl.MethodNames = api.MethodNames;
                                        APICntrl.Parameters = api.Parameters;
                                        APICntrl.StaticParameters = api.StaticParameters;
                                        APICntrl.ComponentID = api.ComponentID;
                                        APICntrl.Type = api.Type;
                                        let pagename = currentpageName;
                                        let $eachCompo = $(`[data-id="${api.ComponentID}"]`);
                                        if ($eachCompo.parents('.editor-site-header').length > 0) {
                                            pagename = 'webbuilderheaderdata';
                                        }
                                        if ($eachCompo.parents('.editor-site-footer').length > 0) {
                                            pagename = 'webbuilderfooterdata';
                                        }
                                        APICntrl.PageName = pagename;
                                        if (apiDuplicate.indexOf(api.ComponentID) > -1)
                                            message += `<br />Component name: ${APICntrl.ComponentName}, APIInvokeKey: ${api.ComponentID}`;
                                        else {
                                            apiDuplicate.push(api.ComponentID);
                                            packageXML += EasyLibrary.APICollector(APICntrl);
                                        }
                                    });
                                }
                            }
                        }
                    }
                });


                function componentConcat(compoName) {
                    componentAddedList.push(compoName);
                    if (EasyLibrary.IsDefined(component[compoName]) &&
                        EasyLibrary.IsDefined(component[compoName].dependent)) {
                        let dependent = component[compoName].dependent;
                        componentAddedList = componentAddedList.concat(dependent);
                    }
                }

                function GetCompoXML(lists) {
                    const distinctComponent = (value, index, self) => {
                        return self.indexOf(value) === index;
                    };
                    lists = lists.filter(distinctComponent);
                    let compoList = '';
                    compoList = lists.reduce((compoList, v) => {
                        return compoList + "<c>" + v + "</c>";
                    }, compoList);
                    return compoList;
                }
                let componentAddedList = [];
                $cloneDOM.find('.editor-site-header, .editor-site-footer').find('div[data-type]').each(function () {
                    componentConcat($(this).attr('data-type'));
                });
                let headerFooterComponent = GetCompoXML(componentAddedList);
                componentAddedList = [];
                $cloneDOM.find('.editor-componentWrapper').find('div[data-type]').each(function () {
                    componentConcat($(this).attr('data-type'));
                });
                let pageComponent = GetCompoXML(componentAddedList);
                if (message.length > 0) {
                    message = `<p>Page Contains components with same API invoke keys as below:</p>${message}`;
                    SageAlertDialog(message);
                } else {
                    if (packageXML.length > 0)
                        packageXML = `<package>${packageXML}</package>`;
                    $('.scanned').removeClass('scanned');
                    let objWebBuilderInfo = {
                        WebBuilderID: 0,
                        EditDOM: editHtml,
                        ViewDOM: viewHtml,
                        UserName: SageFrameUserName,
                        SecureToken: SageFrameSecureToken,
                        Culture: SageFrameCurrentCulture,
                        Extra: 'none',
                        /*this is extra field if neede use in future*/
                        Settings: JSON2.stringify(webBuilderSettings),
                        PageName: currentpageName,
                        Header: header,
                        HeaderEdit: headerEdit,
                        Footer: footer,
                        FooterEdit: footerEdit,
                        PackageXML: packageXML,
                        PageComponent: pageComponent,
                        HeaderFooterComponent: headerFooterComponent
                    };
                    if (isPreview) {
                        WebManagement.PublishedWeb(objWebBuilderInfo, $editHtml, $cloneDOM);
                    } else {
                        WebManagement.SaveWeb(objWebBuilderInfo, $editHtml, $cloneDOM);
                    }
                }
            },
            ApplyStickyHeader: function ($view) {
                setTimeout(function () {
                    $(window).trigger('scroll');
                }, 1000);
            },
            RemoveStickyHeader: function ($view) {
                if ($view.find('.editor-site-header').hasClass('scrolled')) {
                    $view.find('.editor-site-header').removeClass('scrolled');
                    let $header = $view.find('.editor-site-header');
                    let $headerColor = $header.attr('data-prevColor');
                    let bgcolor = '',
                        color = '';
                    if (typeof ($headerColor) !== "undefined") {
                        $view.find('.pagelink').not('.active-page').find('.pageName').css('color', $headerColor);
                    }
                    $headerColor = $header.attr('data-prevBgColor');
                    if (typeof ($headerColor) !== "undefined") {
                        $view.find('.editor-site-header > .cRow').css('background-color', $headerColor);
                    }
                    let stickyImage = $view.find('.editor-site-header').find('#headerLogo').attr('data-stickyLogo');
                    if (stickyImage != undefined) {
                        stickyImage = stickyImage.trim();
                        let oldsrc = $view.find('#headerLogo').attr('src');
                        $view.find('#headerLogo').attr('data-stickyLogo', oldsrc);
                        $view.find('#headerLogo').attr('src', stickyImage);
                    }
                }
                return $view;
            },
            RemoveActiveHeader: function ($view) {
                if ($view.find('.res-menu-trigger').parent().find('.menuHeader').hasClass('show-menu')) {
                    // $('.res-menu-trigger').trigger("click");
                    $('.menuHeader').removeClass('show-menu');
                    $('.res-menu-trigger').removeClass("close-menu");
                    $('.responsivefade').remove();
                    $('body').removeClass('offset-left').removeClass('offset-right').removeClass('offset-top');
                }
                $view.find('.eb-menu').find('.active-page').each(function () {
                    let $a = $(this);
                    RemoveActiveDom($a);
                });
                $view.find('.onepagemenu').find('.active-page').each(function () {
                    let $a = $(this);
                    RemoveActiveDom($a);
                });
                return $view;
            },
            SaveWeb: function (objWebBuilderInfo, $editHtml, $cloneDOM) {
                $('.save-site').addClass('loading-fill');
                $('#SaveWeb').text('Saving');
                SecureAjaxCall.PassObject({
                    url: `${SageFrameHostURL}/webbuilder/AddUpdate`,
                    data: JSON.stringify(objWebBuilderInfo),
                    dataType: 'text',
                    success: function (data, textStatus, jqXHR) {
                        $('#SaveWeb').text('Saved');
                        $('.save-site').addClass('saved');
                        window.setTimeout(function () {
                            $('#SaveWeb').text('Save');
                            $('.save-site').removeClass('saved').removeClass('loading-fill');
                        }, 1000);
                        //WebManagement.RevertMenu($editHtml);
                        //WebManagement.RevertEdit($editHtml);
                        WebManagement.ApplyStickyHeader($editHtml);
                        $cloneDOM.html('');
                        $editHtml.html('');
                    }
                });
            },
            PublishedWeb: function (objWebBuilderInfo, $editHtml, $cloneDOM) {
                $('.publish-site').addClass('loading-fill');
                $('#btnPublishedWeb > span').text('Publishing');
                SecureAjaxCall.PassObject({
                    url: `${SageFrameHostURL}/webbuilder/AddUpdatePublish`,
                    data: JSON.stringify(objWebBuilderInfo),
                    dataType: 'text',
                    success: function (data) {
                        $('#WebBuilderWrapperClone').html('');
                        $('#btnPublishedWeb> span').text('Published');
                        $('.publish-site').addClass('saved');
                        window.setTimeout(function () {
                            $('#btnPublishedWeb > span').text('Publish');
                            $('.publish-site').removeClass('saved').removeClass('loading-fill');
                        }, 1000);
                        WebManagement.RevertMenu($editHtml);
                        WebManagement.ApplyStickyHeader($editHtml);
                        $cloneDOM.html('');
                        $editHtml.html('');
                    }
                });
            },
            RevertMenu: function ($editHtml) {
                $editHtml.find('.eb-menu li').find('a').each(function () {
                    let $this = $(this);
                    let href = $this.attr('href');
                    href = href.replace('fakeMenuURL', SageFrameHostURL);
                    $this.attr("href", href);
                });
                $editHtml.find('.anchorpage').each(function () {
                    let $this = $(this);
                    let href = $this.attr('href');
                    href = href.replace('fakeMenuURL', SageFrameHostURL);
                    $this.attr("href", href);
                });
            },
            RevertEdit: function ($editHtml) {
                let row = $editHtml.find('.cRow[data-type="row"]');
                if (row.length > 0) {
                    if (typeof row.revertedit !== "undefined") {
                        row.revertedit($editHtml);
                    }
                }
                $.each(component, function (componentname, v) {
                    if ($editHtml.find(`.editor-component[data-type="${componentname}"]`).length > 0) {
                        if (typeof v.revertedit !== "undefined") {
                            v.revertedit($editHtml);
                        }
                    }
                });
            },
            ReturnHref: function (path) {
                if (typeof path === "undefined") {
                    return "";
                } else {
                    path = path.replace('http://', '');
                    path = path.replace('https://', '');
                    path = path.replace(`:${window.location.port}`, '');
                    path = path.replace(window.location.hostname, 'fakeMenuURL');
                    return path;
                }
            },
            GetWebHelp: function (async, offset, limit, searchText) {
                let data = {
                    Offset: parseInt(offset * limit) + 1,
                    Limit: parseInt(limit),
                    SearchText: searchText,
                    SecureToken: SageFrameSecureToken
                };
                let config = {
                    async: async,
                    url: `${SageFrameHostURL}/Builder/GetOnlineWebHelp`,
                    data: JSON.stringify(data),
                    success: function (data) {
                        WebManagement.BindWebHelp(data);
                    },
                }
                SecureAjaxCall.PassObject(config);
            },
            BindWebHelp: function (data) {
                $('#youtubeList').html('');
                let html = '';
                let loadMore = false;
                let response = JSONParse(data);
                if (response != null && response.length > 0) {
                    if (response.length > WebManagement.config.OnlineHelpLimit) {
                        loadMore = true;
                        response.splice(-1, 1);
                    }
                    $.each(response, function (index, item) {
                        switch (item.Type) {
                            case 'video':
                                let helpID = item.HelpLink;
                                html += `<li class="imageLink cPointer" data-youtube="${helpID}">
                                            <img src="http://img.youtube.com/vi/${helpID}/0.jpg" />
                                            <span class ="youtubetitle">${item.Title}</span>
                                        </li>`;
                                break;
                        }
                    });
                    $('#youtubeList').append(html);
                } else {
                    html += `<li class="noresult">No result found</li>`;
                    $('#youtubeList').html(html);
                }

                $("#divHelpSeeMore").remove();
                WebManagement.config.OnlineHelpOffset = WebManagement.config.OnlineHelpOffset + WebManagement.config.OnlineHelpLimit;
                WebManagement.BindYoutubeEvent();
                let htmlMore = '';
                if (loadMore) {
                    htmlMore += `<div class='divSiteSeeMore'>
                                    <a id='divHelpSeeMore' class='btn primary' href='javascript:void(0);'>Load More</a>
                                 </div>`;
                    $("#loadmoreHelp").append(htmlMore);
                    $('#divHelpSeeMore').on('click', function () {
                        WebManagement.GetWebHelp(true, WebManagement.config.OnlineHelpOffset, WebManagement.config.OnlineHelpLimit, $('#onlineHelpSearch').val().trim());
                    });
                }
            },
            BindYoutubeEvent: function () {
                $('.imageLink').off().on('click', function () {
                    let $popUpModel = $('#simplePopupModel');
                    let videoID = $(this).attr('data-youtube');
                    let youtube = '';
                    let YTheader = `<div class="popheader simple-popup-title panel__head txC">
                                        <span class ="drag_icon cb-drg"></span>
                                        <span id="backtohelp cPointer" class="backtohelp">Back to help</span>
                                        <div class="iconList right_actions"><i class="fa fa-window-maximize resizeyt big Mr-10 cPointer" style="font-size:24px;"  data-size="big" aria-hidden="true"></i>
                                        <i class="fa fa-window-maximize resizeyt medium Mr-10 cPointer" style="font-size:18px;"   data-size="medium" aria-hidden="true"></i>
                                        <i class="fa fa-window-maximize resizeyt small active Mr-10 cPointer"  data-size="small" aria-hidden="true" style="font-size: 14px; color: rgb(35, 235, 143); text-shadow: rgb(35, 235, 143) 0px 0px 14px;"></i>
                                        <span class="icClose"><i data-icon="d" class="youtube-close-model"></i></span></div>
                                    </div>`;
                    let videosrc = `https://www.youtube.com/embed/${videoID}?autoplay=1&loop=1&playlist=${videoID}`;
                    youtube += `<iframe id="youtubePlayer" width="400" height="300" src="${videosrc}" frameborder="0" allowfullscreen></iframe>`;
                    let popupOption = {
                        Title: 'simplePopup',
                        Top: '100',
                        Left: '100',
                        Height: '300',
                        Data: youtube,
                        Width: '400',
                        Draggable: false,
                        Position: 'absolute',
                        ShowClose: false,
                        Minimize: true,
                        ShowTitle: false,
                        CallbackBeforePopup: function () { },
                        CallbackaftePopUp: function () { }
                    };
                    ClearPopUp();
                    SimplePopup(popupOption);
                    $popUpModel.css('top', `${$('.main-top-row').height() + 10}px`);
                    $popUpModel.find('.simple-popup-header').hide();
                    $(YTheader).insertAfter($popUpModel.find('.simple-popup-header'));
                    $popUpModel.draggable({
                        containment: '.main-container',
                        handle: '.popheader',
                        start: function (e, ui) {
                            $(ui.helper).css({
                                "position": "fixed"
                            });
                        },
                        stop: function (event, ui) {
                            AutoAlignDragger(ui.helper);
                        }
                    });
                    $('.resizeyt').off().on('click', function () {
                        let $this = $(this);
                        $('.resizeyt.active').css({
                            'color': '',
                            'text-shadow': ''
                        });
                        $('.resizeyt.active').removeClass('active');
                        $this.addClass('active');
                        $this.css({
                            'color': '#23eb8f',
                            'text-shadow': '#23eb8f 0 0 14px'
                        });
                        let size = $this.attr('data-size');
                        let height = 200;
                        let width = 300;
                        switch (size) {
                            case 'big':
                                height = 500;
                                width = 600;
                                break;
                            case 'medium':
                                height = 400;
                                width = 500;
                                break;
                            case 'small':
                                height = 300;
                                width = 400;
                                break;
                        }

                        $('#youtubePlayer').attr({
                            height: `${height}px`,
                            width: `${width}px`
                        });
                        $popUpModel.css({
                            height: `${height}px`,
                            width: `${width}px`
                        });
                    });
                    $('.backtohelp').on('click', function () {
                        HideSimplePopUp();
                        ClearPopUp();
                        $('.dropOverlay[data-pull="online help"]').trigger('click');
                    });

                    $popUpModel.addClass('helpVideo');
                    $('.hideOverlay').trigger('click');
                    $('.youtube-close-model').on('click', function () {
                        ClearPopUp();
                        HideSimplePopUp();
                    });

                    function ClearPopUp() {
                        $('.popheader').remove();
                        $popUpModel.removeClass('helpVideo').removeClass('ui-draggable');
                        $('.simple-popup-model-body').html('');
                    }
                });
            },
            TopStickEvents: function () {

                function GetCompoSearchData() {

                }

                $('.dropOverlay').on('click', function () {
                    let $this = $(this);
                    if ($this.hasClass('clicked')) {
                        $('.SettingsUpperBody.active').find('.hideOverlay').trigger('click');
                    } else {
                        let $tochoose = $(this).attr('data-pull');
                        let $upper = $(`.SettingsUpperBody[data-pull="${$tochoose}"]`);
                        let $active = $('.SettingsUpperBody.active');
                        let left = $active.width();
                        if ($active.length > 0) {
                            $('.SettingsUpperBody.active').animate({
                                'left': `-${left}px`
                            }, 300, function () {
                                $upper.animate({
                                    'left': '0px'
                                }, 300, function () {
                                    EasyLibrary.RemoveLoader($this);
                                });
                            });
                        } else {
                            $upper.animate({
                                'left': '0px'
                            }, 300, function () {
                                EasyLibrary.RemoveLoader($this);
                            });
                        }
                        EasyLibrary.EnableLoader($this);
                        $('.SettingsUpperBody.active').removeClass('active');
                        $upper.show().addClass('active');
                        WebManagement.ShowStickeyHeaderOption('showoverlay');
                        $('.headerControls').removeClass('clicked');
                        $this.addClass('clicked');
                        switch ($tochoose) {
                            case "online component":
                                if (!$this.hasClass('called'))
                                    WebManagement.GetOnlineComponents(true, WebManagement.config.OnlineOffset, WebManagement.config.OnlineLimit, '');
                                break;
                            case "online site":
                                if (!$this.hasClass('called')) {
                                    WebManagement.GetOnlineSites(true, WebManagement.config.OnlineSiteOffset, WebManagement.config.OnlineSiteLimit, '');
                                    WebManagement.GetSectors(true);
                                }
                                break;
                            case "online help":
                                if (!$this.hasClass('called')) {
                                    WebManagement.GetWebHelp(true, WebManagement.config.OnlineHelpOffset, WebManagement.config.OnlineHelpLimit, $('#onlineHelpSearch').val().trim());
                                }
                                break;
                        }
                        $this.addClass('called');
                    }
                });
                $('.hideOverlay').on('click', function () {
                    let $upper = $('.SettingsUpperBody.active');
                    let left = $('.SettingsUpperBody.active').width();
                    $upper.animate({
                        'left': `-${left}px`
                    }, 400).removeClass('active');
                    $('.headerControls').removeClass('clicked');
                    $upper.removeClass('.active');
                });

                $('#refreshOnlineThemeSearch').on('click', function () {
                    $('#slcSectors').val(0);
                    $('#slcSiteCategory').val(0);
                    $('#slcBusinessType').val(0);
                    if (EasyLibrary.IsDefined($('#slcApplicationName').attr('data-appname')))
                        $('#slcApplicationName').val($('#slcApplicationName').attr('data-appname'));
                    else
                        $('#slcApplicationName').val(0);
                    $('#onlineSiteSearch').val('');
                    let searchText = $("#onlineSiteSearch").val();
                    WebManagement.config.OnlineSiteOffset = 1;
                    WebManagement.GetOnlineSites(false, WebManagement.config.OnlineSiteOffset, WebManagement.config.OnlineSiteLimit, searchText, true, true);
                });
                WebManagement.AdjustTopSitckyPadding();
            },
            AdjustTopSitckyPadding: function () {
                //if ($('.edit-area').hasClass('hdr-stky') || $('.edit-area').hasClass('hdr-fxd')) {
                //    let $stickHeader = $('.editor-site-header');
                //    let newPadding = parseInt($stickHeader.css('height').replace('px', ''));
                //    $('.editor-componentWrapper').find('.cRow:eq(0)').find('.cGrid').css('padding-top', newPadding);
                //}
            },
            BindeOnlineComponets: function ($upper) {
                let listCompo = '';
                for (var i = 0; i < 10; i++) {
                    DOMCreate();
                    listCompo += DOMCreate('li', '', 'componentList', 'ComponentListOnline');
                }
                $upper.append(DOMCreate('ul', listCompo, 'componentList', 'ComponentListOnline'));
            },
            LayoutSet: function () {
                $(".layoutChange").on('click', function () {
                    let layoutClass = $(this).attr('data-layout');
                    WebManagement.RemoveHeaderClass();
                    $('.site-body').addClass(layoutClass);
                    webBuilderSettings.defaultLayout = layoutClass;
                    FixMenuOnResize();
                });
                $('.OptionItems > span > i').on('click', function () {
                    $(this).next().next().find('.layoutChange').trigger('click');
                });
                $('.OptionItems >  span > .itemname').on('click', function () {
                    $(this).next().find('.layoutChange').trigger('click');
                });
            },
            RemoveHeaderClass: function () {
                $('.site-body').removeClass('fullWidth').removeClass('boxed').removeClass('leftLayout').removeClass('rightLayout');
            },
            SetbackgroundColor: function () {
                $('#chooseBGcolor').css('background-color', webBuilderSettings.temporaryBackgroundcolor);
                let colorPickerOption = ColorPickerOption({
                    renderCallback: function ($elm, toggled) {
                        let objColor = RenderCallBackColor(this);
                        $('.edit-area').css('background-color', objColor.bgColor);
                        webBuilderSettings.temporaryBackgroundcolor = objColor.bgColor;
                    }
                });
                $('#chooseBGcolor').colorPicker(colorPickerOption);
            },
            SetbackgroundWidth: function () {
                let $par = $('.edit-area');
                let sfBGWidth = $par.attr('class').match(/sfCol_[0-9]{1,3}/g);
                let bgWidth = 100;
                if (sfBGWidth !== null) {
                    bgWidth = sfBGWidth[0].split('_')[1];
                }

                function ChangeBackgroundWidth(space) {
                    let imageWidthClass = $par.attr('class').match(/sfCol_[0-9]{1,3}/g);
                    if (imageWidthClass !== null) {
                        $par.removeClass(imageWidthClass[0]);
                    }
                    $par.addClass(`sfCol_${space}`);
                    webBuilderSettings.temporaryWidth = `sfCol_${space}`;
                }
                AdvanceSageSlider($('#pageWidthSlider'), $('#pageWidthHandle'), 0, 100, bgWidth, ChangeBackgroundWidth, $par, '%');
            },
            SetThemeColor: function () {
                let colorPickerOption = ColorPickerOption({
                    renderCallback: function ($elm, toggled) {
                        let objColor = RenderCallBackColor(this);
                        let colorPickerID = $elm.attr('id');
                        switch (colorPickerID) {
                            case 'primaryColor': {
                                webBuilderSettings.primaryColor = objColor.bgColor;
                                /*changing the color in color pallet*/
                                $('#primaryChange').css('background-color', objColor.bgColor);
                                /*change  primary color in menu*/
                                let style = '';
                                if ($('.editor-com-nav').length > 0) {
                                    let navStyleClasses = $('.editor-com-nav').attr('class').match(/nav-style-[a-z]{1,20}/g);
                                    if (navStyleClasses != null) {
                                        style = navStyleClasses[0];
                                    }
                                    MenuHover($('#primaryColor').css('background-color'), $('#secondaryColor').css('background-color'));
                                }
                            }
                                break;
                            case 'secondaryColor': {
                                /*changing the color in color pallet*/
                                webBuilderSettings.secondaryColor = objColor.bgColor;
                                $('#secondaryChange').css('background-color', objColor.bgColor);
                                let style = '';
                                let navStyleClasses = $('.editor-com-nav').attr('class').match(/nav-style-[a-z]{1,20}/g);
                                if (navStyleClasses != null) {
                                    style = navStyleClasses[0];
                                }
                                MenuHover($('#primaryColor').css('background-color'), $('#secondaryColor').css('background-color'));
                            }
                                break;
                            case 'optionalColor':
                                /*changing the color in color pallet*/
                                webBuilderSettings.optionalColor = objColor.bgColor;
                                $('#optionalChange').css('background-color', objColor.bgColor);
                                break;
                        }
                    }
                });
                $('.chooseThemeColor').colorPicker(colorPickerOption);
            },
            RemoveExtra: function () {
                let $editArea = $('.edit-area');
                $editArea.find('.editor-component').removeClass('ui-sortable');
                $editArea.find('.editor-component').removeClass('ui-droppable');
                $editArea.find('.resizebar').remove();
                $editArea.find('.noElement').remove();
            },
            RemoveForModule: function () {
                $('.editor-site-header').remove();
                $('#managePagePanel').remove();
                $('.viewports').remove();
                $('#previewURL').remove();
                $('#btnNexitWebbuilder').remove();
                $('#manageBody').remove();
                $('.HeaderOption').remove();
                $('.theme-color').remove();
                $('#tab-3').prop('checked', true);
                $('.moduleHidden').hide();
                $('#pageHandleHolder').show();
                $('#componentCollection').show();
            },
            RemoveForPage: function () {
                $('.box-title').text('Build your website on your own ');
            },
            LoadHeader: function () {
                if (WebManagement.config.enableHeader === "true" && this.config.core) {
                    let htmlLength = $('.edit-area > .editor-site-header').length;
                    if (htmlLength > 0) {
                        let $siteHeaderSection = $('.editor-site-header');
                        htmlLength = $('.edit-area > .editor-site-header > div').length;
                        if (htmlLength > 0) {
                            /*comparing the pages from database and in the frontend.*/
                            /*removing pages in the menu if any pages has been deleted from admin\pages.*/
                            $('.edit-area > .editor-site-header').find('.eb-menu li > a > span').each(function () {
                                let $tempPage = $(this);
                                let pageNotFound = true;
                                $('#innerPageList li > a > span').each(function () {
                                    if ($(this).text().toLowerCase() === $tempPage.text().toLowerCase()) {
                                        pageNotFound = false;
                                    }
                                });
                                if (pageNotFound) {
                                    $tempPage.parent().parent().remove();
                                }
                            });

                            $('#innerPageList li > a > span').each(function () {
                                let $tempPage = $(this);
                                let pageNotFound = true;
                                $('.eb-menu').eq(0).find('li > a > span').each(function () {
                                    if ($(this).text().toLowerCase() === $tempPage.text().toLowerCase()) {
                                        pageNotFound = false;
                                    }
                                });
                                if (pageNotFound) {
                                    let newPageID = 0;
                                    let pageName = $tempPage.text();
                                    let pageWebbuilderID = 0;
                                    $('.eb-menu').not('#innerPageList').each(function () {
                                        var $this = $(this);
                                        var isHeading = false;
                                        if ($this.closest('.editor-site-header').length == 1)
                                            isHeading = true;
                                        var color = 'rgb(0,0,0)';
                                        var fontSize = '';
                                        var $menuAnchor = '';
                                        var $span = '';
                                        var $menuA = '';
                                        if ($this.find('li').not('.Dn').find('a').not('.active-page').length == 0) {
                                            color = 'rgb(0,0,0)';
                                            fontSize = '12';
                                        } else {
                                            var $item = $this.find('li a').not('.active-page').eq(0);
                                            color = $item.find('span').css('color');
                                            fontSize = $item.find('span').css('font-size');
                                            $menuAnchor = $item.parent();
                                            $span = $item.find('span');
                                            $menuA = $item;
                                        }
                                        var href = SageFrameHostURL + '/' + pageName.replace(/ /g, '-');
                                        var li = '<li data-pageid="' + newPageID + '" class="Dn">';
                                        li += '<a href="' + href + '" class="pagelink">';
                                        li += '<span class="pageName LtrSpc-0" style="font-size: ' + fontSize + '; color: ' + color + ';">';
                                        li += pageName;
                                        li += '</span>';
                                        li += '</a>';
                                        li += '</li>';
                                        var $li = $(li);
                                        $this.append($li);
                                        if ($menuAnchor.length > 0) {
                                            $li.attrs($menuAnchor.attrs());
                                            $li.find('span').attrs($span.attrs());
                                            $li.find('a').attrs($menuA.attrs());
                                            $li.find('a').attr('href', href);
                                            $li.attr('data-pageid', newPageID);
                                            $li.attr('data-webbuilderID', pageWebbuilderID);
                                            //$li.find('a').removeClass("redirectLink").addClass("redirectLink");
                                            $li.find("a").attr("data-PageName", pageName.replace(/ /g, '-'));
                                            //if (isHeading) {
                                            //$li.removeClass('Dn');
                                            //} else {
                                            //    if (!$li.hasClass('Dn'))
                                            $li.addClass('Dn');
                                            //}
                                        }
                                    });
                                }
                            });
                        } else {
                            $('.editor-site-header').addClass('emptydata');
                            //$('.editor-site-header').append(staticDOMs.siteheadertab);
                            //$(".layoutChange").eq(0).trigger('click');
                            //SettingEvents();
                            //$('#setlayoutOptions').show();
                            //$('.editor-site-header .editor-com-nav .eb-menu').html(EasyLibrary.PageListDOM());
                        }
                    } else {
                        $('.editor-site-header').addClass('emptydata');
                        //$('.edit-area').prepend(staticDOMs.siteheadertab);
                        //$(".layoutChange").eq(0).trigger('click');
                        //SettingEvents();
                        //$('#setlayoutOptions').show();
                        //$('.editor-site-header .editor-com-nav .eb-menu').html(EasyLibrary.PageListDOM());
                    }
                } else {
                    WebManagement.RemoveForModule();
                }
                if ($('.edit-area > .editor-site-footer > div').length === 0) {
                    $('.editor-site-footer').addClass('emptydata');
                }
                ActiveMenu();
                OnePageMenuScrollEvent();
            },
            LoadDetail: function () {
                WebManagement.RemoveExtra();
                let data = '';
                if ($('.editor-componentWrapper').length > 0) {
                    let htmlLength = $('.editor-componentWrapper > div').length;
                    if (htmlLength > 0) {
                        /*load data in content-area*/
                        $('.heartBeat').each(function () {
                            $(this).removeClass('heartBeat');
                        });
                        $('.cGrid').each(function () {
                            BindColumnEvents($(this));
                        });
                    } else {
                        $('.editor-componentWrapper').append(noElement);
                        StartNewEvent();
                    }
                } else {
                    $('.edit-area').append(DOMCreate('div', '', 'editor-componentWrapper clearfix'));
                    $('.editor-componentWrapper').append(noElement);
                }
                RowEvents();
                SettingEvents();
                DeleteComponent();
                DraggableSortable();
            },
            UpdateComponentForDev: function (componentName, $componentValue, UniversalComponentID, type) {
                let componentValue = JSONStringify($componentValue).replace(/\s+/g, " ");
                let componentViewValue = JSONStringify(WebManagement.ChangeComponentForView($componentValue)).replace(/\s+/g, " ");
                let success = false;

                SecureAjaxCall.PassObject({
                    url: `${SageFrameHostURL}/webbuilder/UpdateComponents`,
                    data: JSON.stringify({
                        ComponentName: componentName,
                        UniversalComponentID: UniversalComponentID,
                        ComponentValue: componentValue,
                        componentViewValue: componentViewValue,
                        portalID: 1,
                        userName: SageFrameUserName,
                        userModuleID: webBuilderUserModuleID,
                        secureToken: SageFrameSecureToken,
                        Type: type,
                        SiteID: parseInt(GetSiteID)
                    }),
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) { }
                });
            },
            ChangeComponentForView($componentValue) {
                let Compo = $componentValue;
                let properties = ['componentname', 'view', 'binddata', 'binddataerror', 'resize', 'library', 'common'];
                let result = Object.keys($componentValue).reduce(function (obj, k) {
                    if (properties.indexOf(k) > -1)
                        obj[k] = $componentValue[k];
                    return obj;
                }, {});
                return result;
                //JSONStringify($componentValue).replace(/\s+/g, " ");
            },
            UpdateComponentOnly: function (componentName, $componentValue, UniversalComponentID) {
                let componentValue = JSONStringify($componentValue);
                let success = false;
                let data = {
                    objBuilComponent: {
                        ComponentName: componentName,
                        UniversalComponentID: UniversalComponentID,
                        ComponentValue: componentValue,
                        portalID: 1,
                        userName: SageFrameUserName,
                        userModuleID: webBuilderUserModuleID,
                        secureToken: SageFrameSecureToken
                    }
                };
                let config = {
                    async: async,
                    url: `${SageFrameHostURL}/Builder/UpdateComponent`,
                    data: JSON.stringify(data),
                    success: function (data) { },
                }
                SecureAjaxCall.PassObject(config);
                return success;
            },
            DuplicateComponent: function (componentName) {
                let unique = true;
                $.each(component, function (i, v) {
                    let name = v.componentname;
                    if (name === componentName) {
                        unique = false;
                    }
                });
                return unique;
            },
            Installpage: function () {
                $.ajax({
                    isPostBack: false,
                    async: false,
                    cache: false,
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    data: JSON2.stringify({
                        objWebsite: Website
                    }),
                    dataType: 'json',
                    crossDomain: true,
                    url: `${SageFrameHostURL}/Builder/CreateSite`,
                    success: function (data) {

                    },
                    error: function () { },
                });
            },
            ShowStickeyHeaderOption: function (cases) {
                switch (cases) {
                    case 'showsidebar':
                        $('.headerControls').removeClass('clicked');
                        $('.main-left').show();
                        $('#popupModel').hide();
                        $('#popupModel').css({
                            'position': 'absolute'
                        });
                        $('.hideOverlay').trigger('click');
                        break;
                    case 'showoverlay':
                        //$('.main-left').hide();
                        HidePopUpSetting();
                        break;
                    case 'pagesettingshow':
                        $('.hideOverlay').trigger('click');
                        break;
                    default:
                }
            },
            ExtractSite: function () {
                Website.PortalID = 1;
                Website.UserModuleID = WebManagement.config.userModuleID;
                Website.UserName = SageFrameUserName;
                Website.SecureToken = SageFrameSecureToken;
                Website.Culture = SageFrameCurrentCulture;
                $.ajax({
                    isPostBack: false,
                    async: false,
                    cache: false,
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    data: JSON2.stringify({
                        objWebsite: Website
                    }),
                    dataType: 'json',
                    crossDomain: true,
                    url: `${SageFrameHostURL}/Builder/ExtractSite`,
                    success: function (data) {
                        if (data != null && data.d != null) {
                            let respose = data.d;
                            respose.__type = "WebbuilderSite";
                            let dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(respose))}`;
                            let dlAnchorElem = document.getElementById('downloadAnchorElem');
                            dlAnchorElem.setAttribute("href", dataStr);
                            dlAnchorElem.setAttribute("download", "one.json");
                            dlAnchorElem.click();
                        }
                    },
                    error: function () { },
                });
            }
        };
        WebManagement.Init();
    };
    $.fn.SageWebBuilder = function (p) {
        $.WebBuilder(p);
    };
})(jQuery);

function UpdateComponent(componentName, UniversalComponentID, version, downLoadtype, downLoadtypeID, callback) {

    let success = false;

    let data = {
        ComponentName: componentName,
        UniversalComponentID: UniversalComponentID,
        Version: version,
        secureToken: SageFrameSecureToken,
        DownLoadType: downLoadtype,
        ComponentID: parseInt(downLoadtypeID)
    };
    let config = {
        async: false,
        url: `${SageFrameHostURL}/Builder/DownloadComponent`,
        data: JSON.stringify(data),
        success: function (data) {
            FullPageLoading(easyMessageList.componentwaiting);
            
            setTimeout(function () {
                ReloadPageNone();
                location.reload();
            }, 30000);
            //if (typeof callback === "function") {
            //    callback(data);
            //} else {
            //    let respose = data; //JSON.parse(data.d);
            //    let message = respose.Message;
            //    let code = respose.Code;
            //    if (message != null && message.length > 0) {
            //        ReloadPageNone();
            //        window.location.href = message; ///success
            //    } else {
            //        if (code != null) {
            //            let res = parseInt(code);
            //            if (res == -1) {
            //                SageAlertDialog("EasyBuilder verson is less than required verison.Go to upgrader to update first.");
            //            } else if (res == -2) {
            //                ReloadPageNone();
            //                window.location.href = message;
            //            } else if (res > 0) {
            //                //UpdateComponentDownloadCount(UniversalComponentID, downLoadtype);
            //                ReloadPageNone();
            //                window.location.href = window.location;
            //            } else {
            //                SageAlertDialog("Error Occurred.");
            //            }
            //        } else {
            //            ReloadPageNone();
            //            window.location.href = message;
            //        }
            //    }
            //}
            //RemoveFullPageLoading();
        },
    }
    SecureAjaxCall.PassObject(config);
    return success;
}

function UpdateComponentDownloadCount(compoID, downLoadtype) {
    $.ajax({
        isPostBack: false,
        async: false,
        crossOrigin: true,
        cache: false,
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON2.stringify({
            portalID: 1,
            userName: SageFrameUserName,
            userModuleID: webBuilderUserModuleID,
            secureToken: SageFrameSecureToken,
            compoID: compoID,
            downLoadtype: downLoadtype
        }),
        dataType: 'json',
        crossDomain: true,
        url: SageFrameHostURL + '/Builder/UpdateComponentDownloadCount',
        success: function (data) {

        },
        error: function () { },
    });

    function fade(opacity) {

        element.style.opacity = parseFloat(element.style.opacity) + opacity;
    }

    function applyEffects(values) {
        let sizeInPixel = 'px';
        let angleInDegree = 'deg';
        let translate3d = `translate3d(${values.translateX + sizeInPixel}, ${values.translateY + sizeInPixel}, ${values.translateZ + sizeInPixel})`;
        let opacity = values.opacity == undefined ? 1 : parseFloat(values.opacity);
        let rotate = `rotate(${values.rotateX + angleInDegree})`;
        let scale = `scale(${values.scaleX})`;
        //$domStyle.WebkitTransform = translate3d;
        //// Code for IE9
        //$domStyle.msTransform = translate3d;
        //// Standard syntax
        //$domStyle.transform = translate3d;
        $dom.opacity = opacity;
        $domStyle.WebkitTransform = translate3d + ' ' + rotate + ' ' + scale;
        // Code for IE9
        $domStyle.msTransform = translate3d + ' ' + rotate + ' ' + scale;
        // Standard syntax
        $domStyle.transform = translate3d + ' ' + rotate + ' ' + scale;
    }

    function Rotate(x, y, z, deg) {
        let rotate3d = "rotate3d(" + x + "," + y + "," + z + "," + deg + "deg)";
        $domStyle.WebkitTransform = rotate3d;
        // Code for IE9
        $domStyle.msTransform = rotate3d;
        // Standard syntax
        $domStyle.transform = rotate3d;
    }

    function showTranslate(translateX, translateY) {
        $domStyle.WebkitTransform = translateX + " " + translateY;
        // Code for IE9
        $domStyle.msTransform = translateX + " " + translateY;
        // Standard syntax
        $domStyle.transform = translateX + " " + translateY;
    }

    function TransitionTime(time) {
        let initTime = "all " + time + "s";
        console.log(initTime);
        $domStyle.WebkitTransition = initTime; // Code for Safari 3.1 to 6.0
        $domStyle.transition = initTime; // Standard syntax
    }
}