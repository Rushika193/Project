var menupages = {
    "menupages": {
        "componentname": "menupages",
        "category": "page",
        "icon": "icon-icon-row",
        "row": false,
        "hidden": true,
        "collection": false,
        "defaultdata": '',
        "type": "hidden",
        "afterdrop": function ($appendLayer) { },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Pages": {
                    "DOM": EasyLibrary.ReadDOM("sitemenu"),
                    "onload": function ($item) {
                        var $parent = $activeDOM;
                        var $ebmenu = $parent.find('nav > ul');
                        ReadMenu();
                        if ($parent.hasClass('menuHeader')) {
                            $('#pagemenutype').hide();
                        } else {
                            $('#pagemenutype').show();
                        }

                        function ReadMenu() {
                            var $ebbindMenu = $parent.find('.eb-menu');
                            var $menu = $ebbindMenu.find('> li');
                            $('#headerMenuLists').html(BindMenuItem($menu));
                            SortableMenu();
                            SortEvents();
                            var menuType = $ebmenu.attr('data-menu');
                            $('#selMenutype').val(menuType);
                            $('#selMenutype').on('change', function () {
                                $ebmenu.removeClass('horizontal').removeClass('side').removeClass('footer').removeClass('Dfx').removeClass('flxWrp');
                                var menuType = $(this).val();
                                if (menuType == 'horizontal') {
                                    $ebmenu.addClass('Dfx').addClass('flxWrp');

                                } else if (menuType == 'side') {
                                }
                                else if (menuType == 'footer') {

                                }

                                $ebmenu.attr('data-menu', $(this).val()).addClass($(this).val());
                            });
                        }

                        function BindMenuItem($menu) {
                            var html = '';
                            $.each($menu, function (index, item) {
                                var $item = $(this);
                                var pageID = $item.attr('data-pageid');
                                var pageName = $item.find(' > a > .pageName').text();
                                html += '<div data-type="page" data-pageid="' + pageID + '" class="panel panel-info form-elements element">';
                                html += '<div  class="field-row stElWrap col60-40 ">';
                                html += '<div class="fCol">';
                                html += '<span class="panel-heading fCol"><i class="fa fa-arrows" aria-hidden="true"></i></span>';
                                html += '<span class="title fCol">';
                                html += pageName;
                                html += '</span>';
                                html += "</div>";
                                html += '<div class="fCol TxAl-r">';
                                html += '<div class="showinmenu checkbx">';
                                var checked = "checked='checked'";
                                if ($item.hasClass('Dn'))
                                    checked = "";
                                html += '<input id="page_' + pageID + '" class="showpageinmenu" type="checkbox" ' + checked + '>';
                                html += '<label for="page_' + pageID + '" class="chBox"></label>';
                                html += '</div>';
                                html += '<span class="previewhere fa fa-eye fCol" title="preview page"></span>';
                                html += '<span class="gotoeditor fa fa-outdent fCol" title="go to editor"></span>';
                                html += "</div>";
                                html += "</div>";
                                if ($item.find('> ul > li').length > 0) {
                                    html += '<div class="sortable panel-body">';
                                    html += BindMenuItem($item.find('> ul > li'), item.MenuItemID);
                                    html += "</div>";
                                } else {
                                    html += '<div class="sortable panel-body">&nbsp;</div>';
                                }
                                html += "</div>";
                            });
                            return html;
                        }

                        function SortableMenu() {
                            var $panelList = $('.sortable');
                            $panelList.sortable({
                                start: function (event, ui) { },
                                handle: '.panel-heading',
                                connectWith: '.sortable',
                                placeholder: 'ui-hover-state',
                                receive: function (event, ui) { },
                                beforeStop: function (ev, ui) { },
                                stop: function (event, ui) {
                                    RebindMenu();
                                }
                            });
                        }
                        function ReArrange($panelList, $item) {
                            var $index = $item.index($panelList);
                            console.log($index);
                            var $pageid = $item.attr("data-pageid");
                            $ebmenu.find('div[data-pageid="' + pageid + '"]');
                            var $destinationMenu = $ebmenu.find();
                        }
                        function MoveMenuItems() {

                        }
                        function RebindMenu() {
                            var $menu = $('#headerMenuLists > div.panel-info');
                            //var $ebMenus= $parent.parent().parent().find('.eb-menu');
                            //$.each($ebMenus, function (index, item) {
                            //    var $ebMenuList = $ebMenus[index];
                            //    $ebMenuList.html(ReBindMenuItem($menu));
                            //});
                            if ($activeDOM.hasClass('menuHeader')) {
                                $(".msty-tred").find('.eb-menu').html(ReBindMenuItem($menu));
                                $(".msty-ham").find('.eb-menu').html(ReBindMenuItem($menu));
                            }
                            else
                            {
                                $activeDOM.find('nav > ul').html(ReBindMenuItem($menu));
                            }                            
                            if ($('#headerMenuLists > div.panel-info').length == 1) {
                                $('#headerMenuLists > div.panel-info > .deleteWebPage').remove(0);
                            }
                            PagelinkStop();
                            ActiveMenu();
                            MenuHover($('#primaryColor').css('background-color'), $('#secondaryColor').css('background-color'));
                        }
                        function SortEvents() {
                            $('.showpageinmenu').off().on('click', function () {
                                if ($('#headerMenuLists > .panel').find('.showpageinmenu:checked').length > 0) {
                                    var $this = $(this);
                                    var index = $(".showpageinmenu").index($this);
                                    if ($this.is(':checked')) {
                                        $ebmenu.find('li').eq(index).removeClass('Dn');
                                    } else {
                                        $ebmenu.find('li').eq(index).addClass('Dn');
                                    }
                                } else {
                                    SageAlertDialog('At least a page must be visible in menu');
                                    $(this).prop('checked', true);
                                }
                            });
                            $('.previewhere').on('click', function () {
                                var name = $(this).parent().parent().find('.title').text();
                                window.open(WbHostURL + '/' + name.replaceAll(" ", '-'), '_blank');
                            });
                            $('.gotoeditor').on('click', function () {
                                var name = $(this).parent().parent().find('.title').text();
                                window.location = WbHostURL + '/' + name.replaceAll(" ", '-');
                            });
                        }
                        function ReBindMenuItem($menu) {
                            var html = '';
                            var color = 'rgb(0,0,0)';
                            var fontSize = '';
                            if ($ebmenu.find('li a').not('.active-page').length == 0) {
                                color = 'rgb(0,0,0)';
                                fontSize = '12';
                            } else {
                                var $item = $ebmenu.find('li a').not('.active-page').eq(0);
                                color = $item.find('span').css('color');
                                fontSize = $item.find('span').css('font-size');
                            }
                            $.each($menu, function (index, item) {
                                var isChild = false;
                                var $item = $(this);
                                var pageID = $item.attr('data-pageid');
                                var pageName = $item.find('.title').eq(0).text();
                                var addliclass = 'Dn';
                                if ($item.find('.showinmenu').find('.showpageinmenu').is(':checked')) {
                                    addliclass = '';
                                }
                                var $li = $ebmenu.find("li[data-pageid='" + pageID + "']").eq(0);
                                var liClass = '';
                                var liStyle = '';
                                liClass = $li.attr('class');
                                if (liClass === undefined) {
                                    liClass = '';
                                }
                                liStyle = $li.attr('style');
                                if (liStyle === undefined) {
                                    liStyle = '';
                                }
                                var webbuilderID = $li.attr('data-webbuilderid');

                                var $a = $li.find('a');
                                var $span = $a.find('span');

                                var aClass = '';
                                var aStyle = '';
                                aClass = $a.attr('class');
                                if (aClass === undefined) {
                                    aClass = '';
                                }
                                aStyle = $a.attr('style');
                                if (aStyle == undefined) {
                                    aStyle = '';
                                }

                                var spanClass = '';
                                var spanStyle = '';
                                spanClass = $span.attr('class');
                                if (spanClass == undefined) {
                                    spanClass = '';
                                }
                                spanStyle = $span.attr('style');
                                if (spanStyle == undefined) {
                                    spanStyle = '';
                                }
                                var href = SageFrameHostURL + '/' + pageName.replace(/ /g, '-') + webBuilderPageExtension;
                                if ($item.find(' > div.panel-body > div.panel-info').length > 0) {
                                    isChild = true;
                                }
                                if (liClass.indexOf('hasChild') == -1 && isChild) {
                                    liClass = liClass + ' hasChild';
                                    // href = 'javascript:void(0)';
                                }
                                html += '<li data-pageid="' + pageID + '" data-webbuilderid="' + webbuilderID + '" class="' + liClass + '"  style="' + liStyle + '">';
                                html += '<a href="' + href + '" data-pageName=' + pageName.replace(/ /g, '-')+' class="redirectLink ' + aClass + '" style="' + aStyle + '"><span class="' + spanClass + '" style="' + spanStyle + '">' + pageName + '';
                                if (isChild) {
                                    html += '<i class="cb-arw-d"></i>';
                                }
                                html += '</span ></a > ';
                                if (isChild) {
                                    var backgroundcolor = $ebmenu.parents('nav').css('background-color');
                                    if (backgroundcolor == 'rgba(0, 0, 0, 0)') {
                                        backgroundcolor = 'rgba(255, 255, 255, 1)';
                                    }
                                    html += '<ul style="background-color:' + backgroundcolor + '" class="TxAL-l">';
                                    html += ReBindMenuItem($item.find(' > div.panel-body > div.panel-info'), isChild);
                                    html += "</ul>";
                                }
                                html += "</li>";
                            });
                            return html;
                        }
                    }
                },
            },
            "selectLayer": function ($elem) {
            },
        }
    }
};