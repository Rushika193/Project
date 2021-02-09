var managepages = {
    "managepages": {
        "componentname": "managepages",
        "category": "page",
        "icon": "icon-icon-row",
        "row": false,
        "hidden": true,
        "collection": false,
        "type": "hidden",
        "defaultdata": '',
        "afterdrop": function ($appendLayer) { },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Pages": {
                    "DOM": EasyLibrary.ReadDOM("sitemenupages"),
                    "onload": function ($item) {
                        var $parent = $('.editor-site-header');
                        InitEvents();

                        function InitEvents() {
                            ClearPageError();
                            $('#pageAddPanel').on('click', function () {
                                ClearPageError();
                                $('#pageCreateArea').attr('data-pageid', 0);
                                $('#pageCreateArea').attr('data-webbuilderid', 0);
                                $('#pageCreateArea').show();
                                $('#pageListArea').hide();
                                $('#hdnPageID').val('');
                                $('#txtPageName').val('');
                                $('#txtPageTitle').val('');
                                $('#txtPageDescription').val('');
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
                                }
                                else {
                                    $(".clonePageList").hide();
                                }
                            });
                            $('#btnSavePage').on('click', function () {
                                var $pageName = $('#txtPageName');
                                var $title = $('#txtPageTitle');
                                var $description = $('#txtPageDescription');
                                var pageName = $pageName.val().trim();
                                var pageID = parseInt($('#pageCreateArea').attr('data-pageid'));
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
                                        var pageIDs = AddUpdatePage(pageID, pageName, '', title, description, webbuilderID, cloneWebBuilderID);
                                        //changing
                                        var newPageID = pageIDs.pageID;
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
                                                $div.find('> .activedefalutPage ').attr('data-pagename', pageName);

                                                var $cloneOption = $('option[data-type="clonepage"][data-pageid="' + newPageID + '"]');
                                                $cloneOption.text(pageName);
                                            } else { //added
                                                var addedMenu = '<div data-type="page" data-webbuilderid="' + pageIDs.webbuilderID + '" data-pageid="' + newPageID + '" class="panel panel-info form-elements element field-row stElWrap col60-40">';
                                                addedMenu += '<label class="fCol title">' + pageName + '</label>';
                                                addedMenu += '<span class="fCol TxAl-r">';
                                                addedMenu += '<span class="cb-tick activedefalutPage " title="set as starup page"data-pageName="' + pageName + '"></span>';
                                                addedMenu += '<span class="deleteWebPage  cb-del"></span>';
                                                addedMenu += '<span class="editWebPage fa fa-pencil-square-o"></span>';
                                                addedMenu += "</span>";
                                                $('#headerMenuList').append(addedMenu);

                                                var clonePageAdded = '<option data-type="clonepage" value="' + pageIDs.webbuilderID + '" data-pageid="' + newPageID + '">';
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
                                                        $li.attr('data-webbuilderID', pageIDs.webbuilderID);
                                                        $li.find('a').removeClass("redirectLink").addClass("redirectLink");
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
                                            if (cloneWebBuilderID > 0 && Oriname === oldPageName) {
                                            }
                                            else {
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
                                html += '<div data-type="page" data-webbuilderid="' + webbuilderID + '" data-pageid="' + pageID + '" class="panel panel-info form-elements element field-row stElWrap col60-40">';
                                html += '<label class="fCol title">';
                                html += pageName;
                                html += '</label>';
                                var currentPage = false;
                                var activeCurrent = '';
                                if (pageName === portalDefaultPage) {
                                    currentPage = true;
                                    activeCurrent = "active";
                                }
                                html += '<span class="fCol TxAl-r">';
                                html += '<span class="cb-tick activedefalutPage ' + activeCurrent + '" title="set as starup page" data-pageName="' + pageName + '"></span>';
                                if (!currentPage) {
                                    html += '<span class="deleteWebPage cb-del" title="delete page"></span>';
                                    html += '<span class="editWebPage  fa fa-pencil-square-o" title="edit page"></span>';
                                }
                                html += "</span>";
                                if ($item.find('> ul > li').length > 0) {
                                    html += '<div class="sortable panel-body ">';
                                    html += BindMenuItem($item.find('> ul > li'), item.MenuItemID);
                                    html += "</div>";
                                }
                                html += "</div>";
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
                                var $this = $(this);
                                var tempName = $this.parent().parent().find('label').text();
                                SageConfirmDialog('Do you want to delete "' + tempName + '" page? All the data on the page will also be deleted.').done(function () {
                                    var pageID = $this.parent().parent().attr('data-pageid');
                                    var pageName = tempName;
                                    DeletePage(pageID, $this.parent().parent(), pageName);
                                });
                            });
                            $('.editWebPage ').off().on('click', function () {
                                var pageID = $(this).parent().parent().attr('data-pageid');
                                var webbuilderID = $(this).parent().parent().attr('data-webbuilderid');
                                $.ajax({
                                    isPostBack: false,
                                    async: false,
                                    cache: false,
                                    type: 'POST',
                                    contentType: "application/json; charset=utf-8",
                                    data: JSON2.stringify({
                                        pageID: pageID,
                                        portalID: parseInt(SageFramePortalID),
                                        userName: SageFrameUserName,
                                        userModuleID: webBuilderUserModuleID,
                                        secureToken: SageFrameSecureToken
                                    }),
                                    dataType: 'json',
                                    crossDomain: true,
                                    url: SageFrameHostURL + '/Modules/Pages/Services/PagesWebService.asmx/GetPageDetails',
                                    success: function (data) {
                                        var pageDetail = data.d;
                                        $('#txtPageName').val(pageDetail.PageName);
                                        $('#txtPageName').attr('data-pname', pageDetail.PageName);
                                        $('#txtPageTitle').val(pageDetail.Title);
                                        $('#txtPageDescription').val(pageDetail.Description);
                                        var pID = pageDetail.PageID;
                                        $('#pageCreateArea').attr('data-pageid', pID);
                                        $('#pageCreateArea').attr('data-webbuilderid', webbuilderID);
                                        $('#pageCreateArea').show();
                                        $('#pageListArea').hide();
                                    },
                                    error: function () {
                                    },
                                });
                            });

                            $('.activedefalutPage').not('.active').on('click', function () {
                                var pageName = $(this).attr('data-pagename');
                                SageConfirmDialog('Do you want to set ' + pageName + ' as default startup page?').done(function () {
                                    SetDefaultPage(pageName, portalDefaultPage);
                                });
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

                        function AddUpdatePage(pageID, pageName, caption, title, description, webbuilderID, cloneWebBuilderID) {
                            var newPageID = 0;
                            var Mode = pageID > 0 ? "E" : "A";
                            var UpdateLabel = '';
                            var checks = $('div.divPermission tr:gt(0), #dvUser tr').find('input.sfCheckbox:checked');
                            lstPagePermission = [];
                            var beforeID = 0;
                            var afterID = 0;
                            if ($('#rdbBefore').prop('checked') == true) {
                                beforeID = $('#cboPositionTab').val();
                            } else if ($('#rdbAfter').prop('checked') == true) {
                                afterID = $('#cboPositionTab').val();
                            }
                            var MenuSelected = 0;
                            var _IsVisible = $('#rdbAdmin').prop('checked') ? $('#chkShowInDashboard').prop("checked") : true;
                            //var lstPagePermission = [];
                            //lstPagePermission[0] = {
                            //    "PermissionID": 1,
                            //    "RoleID": 'cd3ca2e2-7120-44ad-a520-394e76aac552',
                            //    "Username": "",
                            //    "AllowAccess": true
                            //};
                            //lstPagePermission[1] = {
                            //    "PermissionID": 2,
                            //    "RoleID": 'cd3ca2e2-7120-44ad-a520-394e76aac552',
                            //    "Username": "",
                            //    "AllowAccess": true
                            //};
                            //lstPagePermission[2] = {
                            //    "PermissionID": 1,
                            //    "RoleID": 'a87e850f-14c8-4c89-86f4-4598ff27da72',
                            //    "Username": "",
                            //    "AllowAccess": true
                            //};
                            //var PageDetails = {
                            //    PageEntity: {
                            //        Mode: Mode,
                            //        Caption: caption,
                            //        PageID: pageID,
                            //        PageName: pageName,
                            //        IsVisible: true,
                            //        IconFile: '',
                            //        Title: title,
                            //        Description: description,
                            //        KeyWords: "",
                            //        Url: "",
                            //        StartDate: '',
                            //        EndDate: '',
                            //        RefreshInterval: 0,
                            //        PageHeadText: "SageFrame",
                            //        IsSecure: false,
                            //        IsActive: true,
                            //        AddedBy: SageFrameUserName,
                            //        IsAdmin: false,
                            //        LstPagePermission: lstPagePermission,
                            //        MenuList: MenuSelected,
                            //        UpdateLabel: ''
                            //    }
                            //};
                            var objTagValue = GetSeoValue('easybuilder', title, description);
                            SaveMessageShow(pageName + ' page adding');
                            SecureAjaxCall.PassObject({
                                data: JSON2.stringify({
                                    PageName: pageName,
                                    DisplayName: pageName,
                                    WebbuilderID: webbuilderID,
                                    CloneWebBuilderID: cloneWebBuilderID,
                                    KeyWords: '',
                                    //KeyWords: objTagValue,
                                    PageComponent: '',
                                    HeaderFooterComponent: 'pageadded',
                                    Mode: Mode,
                                    Culture:'en-US'
                                }),
                                url: SageFrameHostURL + '/webbuilder/Savepage',
                                success: function (response) {

                                    switch (response.StatusCode) {

                                        case 1:
                                            {
                                                let result = response.Result;
                                                newPageID = { 'pageID': result[0], 'webbuilderID': result[1] };
                                                SaveMessageRemove();
                                            }
                                            break;
                                        case 7:
                                            {
                                                let result = response.Result;
                                                newPageID = { 'pageID': result[0], 'webbuilderID': result[1] };
                                                SaveMessageRemove();
                                            }
                                            break;
                                        default:
                                    }
                                    //var response = data.d;
                                    //if (response !== null)
                                    //    response = response.split(',');
                                    
                                },
                            })
                            //$.ajax({
                            //    isPostBack: false,
                            //    async: false,
                            //    cache: false,
                            //    type: 'POST',
                            //    contentType: "application/json; charset=utf-8",
                            //    data: JSON2.stringify({
                            //        "objPageInfo": PageDetails.PageEntity,
                            //        Culture: 'en-US',
                            //        portalID: parseInt(SageFramePortalID),
                            //        userName: SageFrameUserName,
                            //        userModuleID: webBuilderUserModuleID,
                            //        secureToken: SageFrameSecureToken,
                            //        webbuilderID: webbuilderID,
                            //        cloneWebBuilderID: cloneWebBuilderID,
                            //        objTagValue: objTagValue,
                            //        PageComponent: '',
                            //        HeaderFooterComponent: 'pageadded'
                            //    }),
                            //    dataType: 'json',
                            //    crossDomain: true,
                            //    url: SageFrameHostURL + '/Builder/AddUpdatePages',
                            //    success: function (data) {
                            //        var response = data.d;
                            //        if (response !== null)
                            //            response = response.split(',');
                            //        newPageID = { 'pageID': response[0], 'webbuilderID': response[1] };
                            //        SaveMessageRemove();
                            //    },
                            //    error: function () {

                            //    },
                            //});
                            return newPageID;
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
                            $.ajax({
                                isPostBack: false,
                                async: false,
                                cache: false,
                                type: 'POST',
                                contentType: "application/json; charset=utf-8",
                                data: JSON2.stringify({
                                    pageID: pageID,
                                    deletedBY: SageFrameUserName,
                                    portalID: parseInt(SageFramePortalID),
                                    userName: SageFrameUserName,
                                    userModuleID: webBuilderUserModuleID,
                                    secureToken: SageFrameSecureToken
                                }),
                                dataType: 'json',
                                crossDomain: true,
                                url: SageFrameHostURL + '/Builder/DeleteChildPages',
                                success: function () {
                                    $item.remove();
                                    $("#clonePageList option").filter(function () {
                                        return $.trim($(this).text()) == pageName;
                                    }).remove();
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
                                error: function () { },
                            });
                        }

                        function SetDefaultPage(newPageName, oldPageName) {
                            $.ajax({
                                isPostBack: false,
                                async: false,
                                cache: false,
                                type: 'POST',
                                contentType: "application/json; charset=utf-8",
                                data: JSON2.stringify({
                                    PageName: newPageName,
                                    OldPageName: oldPageName,
                                    ActiveTemplateName: SageFrameActiveTemplate,
                                    portalID: parseInt(SageFramePortalID),
                                    userName: SageFrameUserName,
                                    userModuleID: webBuilderUserModuleID,
                                    secureToken: SageFrameSecureToken
                                }),
                                dataType: 'json',
                                crossDomain: true,
                                url: SageFrameHostURL + '/Modules/Pages/Services/PagesWebService.asmx/UpdSettingKeyValue',
                                success: function () {
                                    portalDefaultPage = newPageName;
                                    ReadMenu();
                                    $('#chkUnderConstruction').removeClass('active');
                                    $('#underConstructionNote').hide();
                                    webBuilderSettings.isunderconstruction = false;
                                    //UpdateSettings();
                                    UpdateSettingKeyValue("defaultPage", newPageName);
                                },
                                error: function () { },
                            });
                        }
                    }
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        }
    }
};