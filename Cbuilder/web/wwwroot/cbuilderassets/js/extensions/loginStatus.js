var loginStatus = {
    "login status": {
        "componentname": "login status",
        "category": "basic",
        "icon": "fa fa-sign-in",
        "row": false,
        "hidden": false,
        "collection": false,
        "type": 'element',
        "defaultdata": EasyLibrary.ReadDOM('loginStatus/loginStatus'),
        "beforeDrop": function ($this) {
        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (dropped) {
                $appendLayer.attr('data-pagename', EasyLibrary.GetCurrentPageName);
            }
            this.view.library.viewEvents();
        },

        "onsort": function (ui) { },
        "settingDOMs": {
            "tabs": {

                "Basic": {
                    "DOM": EasyLibrary.ReadDOM('loginStatus/loginStatusBasic'),
                    "onload": function ($item) {
                        let $parent = $activeDOM;
                        let $logStatBasic = $('.logStatBasic');
                        let $logStatEditList = $logStatBasic.find('.logStatEditList');
                        let IconClassReg = /fa-\w+(\-*\w*)*/g;
                        let $position = 0;
                        let $globVar = 'false';
                        let $globDataId = 0;
                        let $logStatMenu = $parent.find('.logStatMenu');
                        loadBasicFunc();
                        outrSrtDiv();
                        UIEvents();
                        linkFunctions();
                        if ($parent.find(".registerSet").hasClass("Dn")) {
                            $('#chkIsAnUsrBasic').prop("checked", false);
                            $('#divLogoutStateEle').addClass('Dn');
                            $('#divLogInStateEle').removeClass('Dn');
                        }
                        else {
                            $('#chkIsAnUsrBasic').prop("checked", true);
                            $('#divLogoutStateEle').removeClass('Dn');
                            $('#divLogInStateEle').addClass('Dn');
                        }
                        if ($parent.find(".logStatUImg").hasClass("Dn"))
                            $("#show-image").prop("checked", false);
                        else $("#show-image").prop("checked", true);
                        function loadBasicFunc() {
                            try {
                                let $ItemList = $logStatMenu.find('.logStat');
                                let html = CreateCheckboxDOM('Show Icons', 'show-icons', 'showMenu') + CreateCheckboxDOM('Show Text', 'show-text', 'showMenu'), htmlAuth = '', i = 0, logStatLen = $ItemList.length;
                                $('#divLogInStateEle').prepend(CreateCheckboxDOM('Show Image', 'show-image', '') + CreateCheckboxDOM('Show Welcome and username', 'show-welcome-username', '') + CreateCheckboxDOM('Show Menu Icons', 'show-menu-icons', '') + CreateCheckboxDOM('Show Menu Text', 'show-menu-text', ''))
                                $ItemList.each(function (k, v) {
                                    let $this = $(this);
                                    let $logstatitemid = $this.attr('data-logstatitemid');
                                    let $Title = $this.find('.logStatRef a').not('.drop-item, .logStatLnksAuth').text();
                                    let $dropTitleLen = $this.find('.logStatRef').find('.dropdown-content a').length;
                                    let $Icon = $this.find('.logStatIcon i').attr('class').match(IconClassReg);
                                    if ($logstatitemid === '0' || $logstatitemid === '1') {
                                        html += `<div class="field-row logStatItem Mt-10 Ml-10 Mb-10 sfCol_100" data-logstatitemid="${$logstatitemid}" >
                                                    <div class="field-row stElWrap col100">
                                                        <span class="sfCol_10 cPointer TxAl-c">
                                                            <i class=" fa fa-arrows-v logStatSort"></i>
                                                        </span>
                                                        <span class="sfCol_10 TxAl-c">
                                                            <i class="iconChooser in-form-icon fa ${$Icon}" title="Click to change icon"></i>
                                                        </span>
                                                        <span class="sfCol_80 cb_input">
                                                            <input type="text" class="title logStatInput" placeholder="Title" value="${$Title}"></span>
                                                     </div>
                                                </div>`;
                                    } else {
                                        htmlAuth += `<div class="field-row logStatItem" data-logstatitemid="${$logstatitemid}" >
                                                        <div class ="field-row stElWrap col100">
                                                            <label class ="sfCol_100 Pb-10 hidable">Welcome Message</label>

                                                            <span class ="sfCol_100 cb_input hidable">
                                                                <input type="text" class="title logStatInput" placeholder="Title" value="${$Title}">
                                                            </span>
                                                     <span class ="Pt-10 sfCol_100">
<label class ="sfCol_80">Drop Down options</label>
<i title="Add" class ="sfCol_60 TxAl-r Fs-20 addsLogStat  fa fa-plus-circle in-form-icon add-icon" style="cursor:pointer;"></i>
</span>
                                                         </div>
                                                   </div>`;
                                        if ($dropTitleLen > 0) {
                                            for (var i = 0; i < $dropTitleLen; i++) {
                                                let $dropId = $this.find('.logStatRef').find('.dropdown-content .drop-cont').eq(i).attr('data-dropitemid');
                                                let $dropTitle = $this.find('.logStatRef').find('.dropdown-content a').eq(i).text();
                                                let $dropIcn = $this.find('.logStatRef').find('.dropdown-content .logStatIcon i').eq(i).attr('class').match(IconClassReg);
                                                let prevSelected = $this.find()
                                                let ddl = '', clas = '';
                                                if ($dropId > 2) {

                                                    if (EasyLibrary.IsDefined($this.attr("data-required")) && $this.attr("data-required") === "true") {

                                                    }
                                                    else {
                                                        clas = 'Mt-30';
                                                        ddl = `
                                                             <span class ="sfCol_20 cPointer TxAl-c"></span>
                                                                    <span class ="sfCol_10 TxAl-c fa fa-link"></span>
                                                                    <span class ="select__box sfCol_60 logStatPgLstHldr">
                                                                            <select class ="logStatPgLst sfCol_100"></select>
                                                                    </span>
                                                                    <span class ="sfCol_5 TxAl-r Ml-10">
                                                                            <i title="Delete" class ="deleteLogStatInr  fa fa-trash in-form-icon delete-icon cpointer"></i>
                                                                    </span>
                                                            `;
                                                    }

                                                    htmlAuth += `<div class="field-row logStatItemInr stElWrap sfCol_100"  data-dropitemdvid="${$dropId}">
                                                                    <span class ="sfCol_20 cPointer TxAl-c">
                                                                        <i class=" fa fa-arrows-v logStatSort ${clas}"></i>
                                                                    </span>
                                                                    <span class="sfCol_10 TxAl-c">
                                                                        <i class ="iconChooserInr cPointer in-form-icon fa ${$dropIcn}" title="Click to change icon"></i>
                                                                    </span>
                                                                    <span class ="sfCol_70 cb_input">
                                                                        <input type="text" class ="title logStatInputInr" placeholder="Title" value="${$dropTitle}">
                                                                     </span>
                                                                     ${ddl}
                                                                </span>
                                                        </div>`;
                                                } else {
                                                    htmlAuth += `<div class="field-row logStatItemInr stElWrap sfCol_100"  data-dropitemdvid="${$dropId}">
                                                                    <span class ="sfCol_20 cPointer TxAl-c">
                                                                         <i class =" fa fa-arrows-v logStatSort ${clas}"></i>
                                                                    </span>
                                                                    <span class="sfCol_10 TxAl-c">
                                                                        <i class ="iconChooserInr cPointer in-form-icon fa ${$dropIcn}" title="Click to change icon"></i>
                                                                    </span>
                                                                    <span class ="sfCol_70 cb_input">
                                                                        <input type="text" class ="title logStatInputInr" placeholder="Title" value="${$dropTitle}">
                                                                    </span>
                                                                  ${ddl}
                                                                 </div>`;
                                                }
                                            }
                                        }
                                        htmlAuth += '</div>';
                                    }
                                });


                                $('#logoutStateEle').html(html);
                                $('#logInStateEle').html(htmlAuth);

                                let $anIcons = $('#show-icons');
                                let $anTexts = $('#show-text');

                                let $menuIcons = $('#show-menu-icons');
                                let $menuTexts = $('#show-menu-text');

                                if ($activeDOM.attr('data-fontIcons') == 'show')
                                    $anIcons.prop('checked', true);
                                else {
                                    $anIcons.prop('checked', false);
                                }
                                if ($activeDOM.attr('data-anTextOnly') == 'show')
                                    $anTexts.prop('checked', true);
                                else {
                                    $anTexts.prop('checked', false);
                                }
                                $anIcons.off().on('change', function () {
                                    let $target = $activeDOM.find('.logStatUIcns');
                                    if ($(this).prop('checked')) {
                                        $target.removeClass('Dn');
                                        $activeDOM.attr('data-fontIcons', 'show');
                                    }
                                    else {
                                        $target.addClass('Dn');
                                        $activeDOM.attr('data-fontIcons', 'hide');
                                        $anTexts.prop('checked', true);
                                        $anTexts.trigger('change');

                                    }
                                    component['login status'].common.reloadAllSettingTabs('settingDOMs', ['Basic'])
                                });
                                $anTexts.off().on('change', function () {
                                    let $target = $activeDOM.find('.logStatAn .logStatRef')
                                    if ($(this).prop('checked')) {
                                        $target.removeClass('Dn');
                                        $activeDOM.attr('data-anTextOnly', 'show');
                                    }
                                    else {
                                        $target.addClass('Dn');
                                        $activeDOM.attr('data-anTextOnly', 'hide');
                                        $anIcons.prop('checked', true);
                                        $anIcons.trigger('change');
                                    }
                                    component['login status'].common.reloadAllSettingTabs('settingDOMs', ['Basic'])
                                });

                                $menuIcons.parents('.field-row').add($menuTexts.parents('.field-row')).hover(function () {
                                    $activeDOM.find('.logStatMIcn').trigger('mouseover');
                                }, function () {
                                    $activeDOM.find('.logStatMIcn').trigger('mouseout')
                                });


                                if ($activeDOM.attr('data-menuIcons') == 'show')
                                    $menuIcons.prop('checked', true);
                                else {
                                    $menuIcons.prop('checked', false);
                                }
                                if ($activeDOM.attr('data-menuText') == 'show')
                                    $menuTexts.prop('checked', true);
                                else {
                                    $menuTexts.prop('checked', false);
                                }
                                $menuIcons.off().on('change', function () {
                                    let $target = $activeDOM.find('.logStatSMIcns');
                                    if ($(this).prop('checked')) {
                                        $target.removeClass('Dn');
                                        $activeDOM.attr('data-menuIcons', 'show');
                                    }
                                    else {
                                        $target.addClass('Dn');
                                        $activeDOM.attr('data-menuIcons', 'hide');
                                        $menuTexts.prop('checked', true);
                                        $menuTexts.trigger('change');

                                    }
                                    component['login status'].common.reloadAllSettingTabs('settingDOMs', ['Basic'])
                                });
                                $menuTexts.off().on('change', function () {
                                    let $target = $activeDOM.find('.drop-cont .drop-itemDv')
                                    if ($(this).prop('checked')) {
                                        $target.removeClass('Dn');
                                        $activeDOM.attr('data-menuText', 'show');
                                    }
                                    else {
                                        $target.addClass('Dn');
                                        $activeDOM.attr('data-menuText', 'hide');
                                        $menuIcons.prop('checked', true);
                                        $menuIcons.trigger('change');
                                    }
                                    component['login status'].common.reloadAllSettingTabs('settingDOMs', ['Basic'])
                                });

                                //show hide welcome and username
                                component['login status'].common.showHideUernameWelcome()

                            } catch (e) {
                                console.log(e.message);
                            }
                        }
                        function UIEvents() {
                            if ($parent.find('.logStatAn').hasClass('Dn')) {
                                $('.chkIsAnUsr').prop('checked', false);
                            }
                            $('#chkIsAnUsrBasic').off('change').on('change', function () {
                                let $this = $(this);
                                if ($this.prop('checked')) {
                                    $('#divLogoutStateEle').removeClass('Dn');
                                    $('#divLogInStateEle').addClass('Dn');
                                    $parent.find('.logStatAn').removeClass('Dn');
                                    $parent.find('.logStatAuth').addClass('Dn');
                                } else {
                                    $('#divLogoutStateEle').addClass('Dn');
                                    $('#divLogInStateEle').removeClass('Dn');
                                    $parent.find('.logStatAn').addClass('Dn');
                                    $parent.find('.logStatAuth').removeClass('Dn');
                                }
                                $('.chkIsAnUsr').prop('checked', $this.prop('checked'));
                            });
                            $("#show-image").off().on("change", function () {
                                let $this = $(this);
                                if ($this.is(':checked')) {
                                    $parent.find(".logStatUImg").removeClass("Dn");
                                }
                                else
                                    $parent.find(".logStatUImg").addClass("Dn");
                            })
                            $logStatBasic.on('click', '.addsLogStat', function () {
                                let firstDropCont = $activeDOM.find('.drop-cont').eq(0);
                                try {
                                    let count = 1;
                                    let $thisPar = $(this).parent().parent().parent();
                                    let $dropId = getHighId();
                                    if (typeof ($dropId) !== 'undefined') {
                                        count = parseInt($dropId) + 1;
                                    }
                                    $thisPar.find('.authSrtOutr').append(`<div class="field-row stElWrap logStatItemInr sfCol_100"  data-dropitemdvid="${count}">
                                                                            <span class="sfCol_20 cPointer TxAl-c">
                                                                                <i class =" fa fa-arrows-v logStatSort Mt-30"></i>
                                                                            </span>
                                                                            <span class="sfCol_10 TxAl-c">
                                                                                <i class ="iconChooserInr cPointer  in-form-icon fa fa-users" title="Click to change icon"></i>
                                                                            </span>
                                                                            <span class ="sfCol_70 cb_input">
                                                                                <input type="text" class="title logStatInputInr" placeholder="Title" value="New Link">
                                                                            </span>
                                                                            <span class ="sfCol_20 cPointer TxAl-c"></span>
                                                                            <span class ="sfCol_10 TxAl-c fa fa-link"></span>
                                                                             <span class ="select__box sfCol_60" class ="logStatPgLstHldr">
                                                                                   <select class="logStatPgLst sfCol_100"></select>
                                                                              </span>
                                                                              <span class ="sfCol_5 TxAl-r Ml-10">
                                                                                    <i title="Delete" class="deleteLogStatInr  cpointer fa fa-trash in-form-icon delete-icon"></i>
                                                                              </span>
                                                                        </div>`);
                                    let $pos = $('.logStatEditList .logStatItem').index($(this).closest('.logStatItem'));
                                    let ActiveItem = $parent.find('.logStatMenu').eq(0).find('>.logStat').eq($pos);
                                    let $dropCont = ActiveItem.find('.logStatRef').find('.dropdown-content');
                                    let $dropContFirst = $dropCont.find('.drop-cont').first();
                                    let $textClass = $dropContFirst.find('.drop-itemDv a').attr('class');
                                    if ((/\bprofileurl/).test($textClass))
                                        $textClass = $textClass.replace(/\bprofileurl/, '')
                                    let $textStyle = $dropContFirst.find('.drop-itemDv a').attr('style');
                                    let $iconClass = $dropContFirst.find('.logStatSMIcn i').attr('class');
                                    let $iconStyle = $dropContFirst.find('.logStatSMIcn i').attr('style');
                                    //$dropCont.append(`<div class="${clas}" data-dropitemid="${count}" data-hovereffect='${hoverEffect}' hovered-mousein="out" style="${styl}">
                                    //                    <div class="logStatIcon logStatSMIcn">
                                    //                         <i class="${$iconClass}" style="${$iconStyle}"></i>
                                    //                    </div>
                                    //                    <div class="drop-itemDv Dib">
                                    //                        <a href="http://172.18.12.13:8010/Home" data-link="internal" class="${$textClass}" style="${$textStyle}">Link 1</a>
                                    //                    </div>
                                    //                  </div>`);
                                    let $cloned = $dropContFirst.clone(true);
                                    $cloned.find('a').removeClass('profileurl').text("New Link");
                                    $cloned.attr('data-dropitemid', count);
                                    $cloned.removeAttr('data-required');
                                    $cloned.find('a').attr('href', 'javascript:void(0)');
                                    $dropCont.append($cloned)
                                    linkFunctions();
                                } catch (e) {
                                    console.log(e.message);
                                }
                                component['login status'].settingDOMs.tabs['Hover Effect'].onload(true);
                            });
                            $logStatBasic.on('click', '.deleteLogStatInr', function (e) {
                                try {
                                    let $thisPar = $(this).parent().parent();
                                    let $countId = $thisPar.attr('data-dropitemdvid');
                                    let $pos = $('.logStatEditList .logStatItem').index($(this).closest('.logStatItem'));
                                    let ActiveItem = $parent.find('.logStatMenu').eq(0).find('>.logStat').eq($pos);
                                    ActiveItem.find('.dropdown-content').find("[data-dropitemid='" + $countId + "']").remove();
                                    $thisPar.remove();
                                } catch (e) {
                                    console.log(e.message);
                                }
                            });
                            $logStatEditList.on('input', '.logStatInput', function () {
                                try {
                                    let $this = $(this);
                                    let $Val = $this.val().trim();
                                    let $pos = $('.logStatEditList .logStatItem').index($this.closest('.logStatItem'));
                                    let ActiveItem = $parent.find('.logStatMenu').eq(0).find('>.logStat').eq($pos);
                                    ActiveItem.find('.logStatRef a').eq(0).text($Val);
                                } catch (e) {
                                    console.log(e.message);
                                }
                            });
                            $logStatEditList.on('input', '.logStatInputInr', function () {
                                try {
                                    let $this = $(this);
                                    let $Val = $this.val();
                                    let $dropID = $this.parent().parent().attr('data-dropitemdvid');
                                    let $pos = $('.logStatEditList .logStatItem').index($this.closest('.logStatItem'));
                                    let ActiveItem = $parent.find('.logStatMenu').eq(0).find('>.logStat').eq($pos);
                                    ActiveItem.find('.dropdown-content').find('[data-dropitemid="' + $dropID + '"] a').text($Val);
                                } catch (e) {
                                    console.log(e.message);
                                }
                            });
                            $('#logStatfontIconCollection').html($('ul#fontIconCollection').html());
                            $logStatEditList.on('click', '.iconChooser', function () {
                                let $this = $(this);
                                let $par = $this.parent().parent().parent();
                                let $dataID = $par.attr('data-logstatitemid');
                                if ($dataID > 1) {
                                    $this.parent().parent().after($('.tabcontent .logStatIconList'));
                                } else {
                                    $par.after($('.tabcontent .logStatIconList'));
                                }
                                $position = $('.logStatEditList .logStatItem').index($this.closest('.logStatItem'));
                                $('.logStatIconList').removeClass('Dn');
                                $('#logStatfontIconCollection').find('li').removeClass('selected');
                                let CurrentClass = $this.attr('class').match(IconClassReg)[0];
                                $('#logStatfontIconCollection').find('li i[data-class="' + CurrentClass + '"]').parent().addClass('selected');
                            });
                            $logStatEditList.on('click', '.iconChooserInr', function () {
                                let $this = $(this);
                                let $par = $this.parent().parent();
                                $globDataId = $par.attr('data-dropitemdvid');
                                $par.after($('.tabcontent .logStatIconList'));
                                $position = $('.logStatEditList .logStatItem').index($this.closest('.logStatItem'));
                                $globVar = 'true';
                                $('.logStatIconList').removeClass('Dn');
                                $('#logStatfontIconCollection').find('li').removeClass('selected');
                                let CurrentClass = $this.attr('class').match(IconClassReg)[0];
                                $('#logStatfontIconCollection').find('li i[data-class="' + CurrentClass + '"]').parent().addClass('selected');
                            });
                            $('.logStatIconList .closeIconChooser').off().on('click', function () {
                                $('.logStatIconList').addClass('Dn').insertAfter($('.logStatEditList'));
                            });
                            $('#logStatSearchIcon').on('input', function () {
                                let searchVal = $(this).val();
                                $('#logStatfontIconCollection').find('li').each(function () {
                                    let $this = $(this);
                                    let dataClass = $this.find('i').attr('data-class');
                                    let pos = dataClass.indexOf(searchVal);
                                    if (pos < 0) {
                                        $this.addClass('Dn');
                                    } else {
                                        $this.removeClass('Dn');
                                    }
                                });
                            });
                            $('#logStatfontIconCollection').find('li').on('click', function () {
                                let $iconChooser = '', $FormIcon = '', $ViewIcon = '';
                                if ($globVar === 'true') {
                                    $iconChooser = 'i.iconChooserInr';
                                    $FormIcon = $('.logStatEditList .logStatItem').eq($position).find('[data-dropitemdvid="' + $globDataId + '"]').find($iconChooser);
                                    $ViewIcon = $parent.find('.logStatMenu').eq(0).find('>.logStat').eq($position).find('[data-dropitemid="' + $globDataId + '"]').find('.logStatIcon i').eq(0);
                                } else {
                                    $iconChooser = 'i.iconChooser';
                                    $FormIcon = $('.logStatEditList .logStatItem').eq($position).find($iconChooser);
                                    $ViewIcon = $parent.find('.logStatMenu').eq(0).find('>.logStat').eq($position).find('.logStatIcon i').eq(0);
                                }
                                let chooseClass = $(this).find('i').attr('data-class');
                                $('#logStatfontIconCollection').find('li').removeClass('selected');
                                $('#logStatfontIconCollection').find('li i[data-class="' + chooseClass + '"]').parent().addClass('selected');
                                let PrevClass = $FormIcon.attr('class').match(IconClassReg)[0];
                                $FormIcon.removeClass(PrevClass);
                                $FormIcon.addClass(chooseClass);
                                $ViewIcon.removeClass(PrevClass);
                                $ViewIcon.addClass(chooseClass);
                                $(".logStatIconList .closeIconChooser").trigger("click");
                            });
                            $('.logStatSort').on('mousedown', function () {
                                try {
                                    $('.logStatIconList').find('.closeIconChooser').trigger('click');
                                } catch (e) {
                                    console.log(e.message);
                                }
                            });
                            $logStatEditList.find('.ananSrt').AdvanceSorting({
                                targetParent: $item.closest('.SetHdlr').parent().find(".logStatMenu"),
                                targetElem: '.logStatAn',
                                sortableOptions: {
                                    items: "> div.logStatItem",
                                    handle: ".logStatSort",
                                    containment: 'div.ananSrt'
                                }
                            });
                            function getHighId() {
                                var num = $(".logStatItemInr").map(function () {
                                    return $(this).attr('data-dropitemdvid');
                                }).get();
                                var highest = Math.max.apply(Math, num);
                                return highest;
                            }
                        }
                        function linkFunctions() {
                            loadLinks();
                            var linklist = {
                                'internal': 'internal',
                                'external': 'external',
                                'onepage': 'onepage'
                            };
                            function loadLinks() {
                                try {
                                    var options = '';
                                    if ($('#chkOnePageMenu').is(':checked'))
                                        $('.menuHeader .onepagemenu  li').each(function (index, item) {
                                            var $item = $(this);
                                            options += '<option  value="' + $item.attr('data-opscroll') + '">' + $item.find(' > a > .pageName').text() + '</option>';
                                        });
                                    else {
                                        options += '<option value="select" disabled>Select a link</option>';
                                        options += '<option data-dashboard="true" value="2127">User profile</option>';
                                        options += EasyLibrary.GetPageOption();
                                        options += EasyLibrary.GetDasboardPageOption();
                                    }
                                    //$('.logStatPgLst').html(options);
                                    let $allLinkDropdowns = $('.logStatPgLst');
                                    $allLinkDropdowns.each(function () {

                                        let $this = $(this);
                                        let $dropIds = $this.parent().parent().attr('data-dropitemdvid');
                                        let $anchor = $activeDOM.find('.logStatAuth').find('[data-dropitemid="' + $dropIds + '"]').find('a');
                                        let prevSelected = $anchor.attr('data-prev');
                                        $this.html(options);
                                        if (prevSelected != undefined)
                                            $this.val(prevSelected);
                                        else
                                            $this.val('select');
                                    });
                                } catch (e) {
                                    console.log(e.message);
                                }
                            }
                            $('.logStatPgLst').on('change', function () {
                                let $this = $(this);
                                let $selected = $this.find('option:selected');
                                let isDashboardLink = $selected.attr('data-dashboard');
                                if (isDashboardLink) isDashboardLink = '/dashboard/';
                                else isDashboardLink = '/'
                                let urlText = $selected.text();
                                urlText = (urlText.trim()).replace(/ /g, '-');
                                let urlVal = $selected.val();
                                let $dropIds = $this.parent().parent().attr('data-dropitemdvid');
                                let $anchor = $logStatMenu.find('.logStatAuth').find('[data-dropitemid="' + $dropIds + '"]').find('a');
                                $anchor.attr('data-prev', urlVal);
                                if ($('#chkOnePageMenu').is(':checked')) {
                                    $anchor.removeClass('anchorpage');
                                    $anchor.attr({ 'data-link': linklist.onepage, 'data-onepage': urlVal, 'href': urlVal });
                                } else {
                                    $anchor.addClass('anchorpage');
                                    $anchor.attr({ 'data-link': linklist.internal, 'href': SageFrameHostURL + isDashboardLink + urlText });
                                }
                            });
                        }
                        function outrSrtDiv() {
                            $('.authSrt').children().children().first().after('<div class="authSrtOutr"></div>');
                            $('.logStatItemInr').appendTo('.authSrtOutr');
                            //$('.authSrtOutr').insertAfter('.ddwrap')
                            $logStatEditList.find('.authSrtOutr').AdvanceSorting({
                                targetParent: $item.closest('.SetHdlr').parent().find(".logStatMenu").find(".dropdown-content"),
                                targetElem: '.drop-cont',
                                sortableOptions: {
                                    items: "div.logStatItemInr",
                                    handle: ".logStatSort",
                                    containment: 'div.authSrtOutr'
                                }
                            });
                        }
                        function imageOrTextOrBoth() {
                        }
                    },
                    "active": function () {
                        $('#chkIsAnUsrBasic').trigger('change');
                    }
                },
                "Image": {
                    "DOM": '<div class="imageLogin"></div>',
                    "onload": function ($item) {
                        let $imageParent = $activeDOM.find('.logStatUImg');
                        (function ($) {
                            let imageDefault = {
                                height: 'H-50',
                                width: 'W-50',
                                shape: 'rectangle'
                            }
                            $.fn.ImageDimensions = function ($applyOn) {
                                let $img = $applyOn.find('img');
                                let da = DeviceAlpha();
                                let hasDn = $applyOn.hasClass(da + 'Dn');
                                let $dom = this;
                                let heightSlider = CreateSliderDOM('height-slider', 'height-handle', 'Height');
                                let widthSlider = CreateSliderDOM('width-slider', 'width-handle', 'Width');
                                let sizeSlider = CreateSliderDOM('size-slider', 'size-handle', 'Size');
                                //let imageVisibility = CreateCheckboxDOM('Visibility', 'show-image', '');
                                let imageVisibility = '';
                                let imageShape = '<div class="field-row"><div class="field-row stElWrap col60-40"><label class="fCol">Image Display</label><span class="fCol select__box txAl-r">' + SelectDOMCreate('slc-image-shape', '', [['round', 'Round'], ['rect', 'Rectangle']]) + '</span></div></div>';
                                let dom = imageVisibility;
                                if (!hasDn)
                                    dom += `<div class='image-dimension'>${imageShape}
                                                <div class ="forRect">${heightSlider}${widthSlider}</div>
                                                <div class="forRound">
                                                    ${sizeSlider}
                                                </div>
                                                </div>`

                                $dom.html(dom)
                                let functions = {
                                    controllers: {
                                        shape: $('#slc-image-shape'),
                                        visibility: $('#show-image'),
                                        sliders: $('.image-dimension')
                                    },
                                    imageWidth: function () {
                                        AdvanceSageSlider($('#width-slider'), $('#width-handle'), 1, 100, GetValueByClassName($applyOn, 'H-[0-9]{1,3}', 'H-'), this.heightChange, $applyOn, 'px');
                                    },
                                    imageHeight: function () {
                                        AdvanceSageSlider($('#height-slider'), $('#height-handle'), 1, 100, GetValueByClassName($applyOn, 'W-[0-9]{1,3}', 'W-'), this.widthChange, $applyOn, 'px');
                                    },
                                    widthChange: function (space, $par) {
                                        ReplaceClassByPattern($par, 'W-[0-9]{1,3}', 'W-' + space);
                                    },
                                    heightChange: function (space, $par) {
                                        ReplaceClassByPattern($par, 'H-[0-9]{1,3}', 'H-' + space);
                                    },
                                    heightWidthChange: function (space, $par) {
                                        ReplaceClassByPattern($par, 'W-[0-9]{1,3}', 'W-' + space);
                                        ReplaceClassByPattern($par, 'H-[0-9]{1,3}', 'H-' + space);
                                    },
                                    roundImageSize: function () {
                                        AdvanceSageSlider($('#size-slider'), $('#size-handle'), 1, 100, GetValueByClassName($applyOn, 'W-[0-9]{1,3}', 'W-'), this.heightWidthChange, $applyOn, 'px');
                                    },
                                    visibilityChange: function () {
                                        let $this = $(this);
                                        if ($this.prop('checked')) {
                                            $applyOn.removeClass(da + 'Dn');
                                            $(functions.controllers.sliders).fadeIn();
                                        }
                                        else {
                                            $applyOn.addClass(da + 'Dn');
                                            $(functions.controllers.sliders).fadeOut();
                                        }
                                    },
                                    shapeChange: function () {
                                        let selected = $(this).val();
                                        if (selected == 'round') {
                                            $img.css('border-radius', '50%');
                                            $('.forRound').show();
                                            $('.forRect').hide();
                                        }
                                        else if (selected == 'rect') {
                                            $img.css('border-radius', '0');
                                            $('.forRect').show();
                                            $('.forRound').hide();
                                        }
                                    },
                                    bindEvents: function () {
                                        let _this = this;
                                        let $shapeSelect = _this.controllers.shape;
                                        let $showImage = _this.controllers.visibility;
                                        $shapeSelect.off('change').on('change', _this.shapeChange);
                                        $showImage.off().on('click', _this.visibilityChange);
                                    },
                                    loadSettings: function () {
                                        let $shapeSelect = this.controllers.shape;
                                        let $showImage = this.controllers.visibility;
                                        let bordeRadius = $img.css('border-radius');
                                        let shape = 'rect'
                                        if (bordeRadius != '0px')
                                            shape = 'round';
                                        $shapeSelect.val(shape);
                                        $showImage.prop('checked', $applyOn.hasClass(da + 'Dn'));
                                        $showImage.trigger('click');
                                        $shapeSelect.trigger('change');
                                        this.imageHeight();
                                        this.imageWidth();
                                        this.roundImageSize();
                                    },
                                    init: function () {
                                        this.bindEvents();
                                        this.loadSettings();
                                    }
                                }
                                functions.init();
                            }
                        })(jQuery)
                        $('.imageLogin').ImageDimensions($imageParent);
                    }
                },
                "Text": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM("loginstatus/loginSize"),
                    "onload": function () {
                        function handleDDChange(val) {
                            let options = {}
                            let tORf = !(/\b(logStatUIcns)|(logStatSMIcns)|(logStatMIcns)/g).test(val);
                            $.extend(options, {
                                size: true,
                                width: false,
                                spacing: tORf,
                                transform: tORf,
                                family: tORf,
                                weight: tORf,
                                color: true
                            })
                            $("#sizeDOM").AdvanceTextSetting({
                                targetParent: $activeDOM,
                                targetElem: $activeDOM.find(val),
                                options
                            });

                        }
                        let $checkloginStatus = $('#chkIsAnUsrSize');
                        let $dropDown = $('#logStatSizeAplyOn');
                        let comm = component["login status"].common
                        comm.loginStateChange($checkloginStatus, $dropDown)
                        comm.dropdownChange($dropDown, handleDDChange)

                    },
                    "active": function () {

                        $('#chkIsAnUsrSize').trigger('change');
                        $('#logStatSizeAplyOn').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#logStatSizeAplyOn').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM("loginstatus/loginStatusSpacing"),
                    "onload": function () {
                        function handleDDChange(val) {
                            $("#logStatAllSpacing").AdvanceSpacing({
                                targetParent: $activeDOM,
                                targetElem: $activeDOM.find(val),
                                options: {
                                    "margin": {
                                        "max": 40,
                                        "min": -40,
                                        "times": 5,
                                        "position": ["all", "top", "bottom", "left", "right"]
                                    },
                                    "padding": {
                                        "max": 40,
                                        "min": -40,
                                        "times": 5,
                                        "position": ["all", "top", "bottom", "left", "right"]
                                    },
                                }
                            });
                        }
                        let $checkloginStatus = $('#chkIsAnUsrSpc');
                        let $dropDown = $('#logStatSpcAplyOn');
                        let comm = component["login status"].common
                        comm.loginStateChange($checkloginStatus, $dropDown)
                        comm.dropdownChange($dropDown, handleDDChange)
                    },
                    "active": function () {
                        $('#chkIsAnUsrSpc').trigger('change');
                        $('#logStatSpcAplyOn').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#logStatSpcAplyOn').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
                "Hover Effect": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM("loginstatus/loginHover"),
                    "onload": function (param) {
                        function handleDDChange(val) {

                            $('#hoverDOM').AdvanceHoverEffect({
                                targetParent: $activeDOM,
                                targetElem: val,
                                options: {
                                    shadow: "on",
                                    border: {
                                        "max": 20,
                                        "min": 0,
                                        "times": 1,
                                        "position": ["all", "top", "right", "bottom", "left"],
                                    },
                                    zoom: "on",
                                    color: ['background', 'text']
                                }
                            });
                        }
                        let $checkloginStatus = $('#hoverLoginCheck');
                        let $dropDown = $('#hoverApplyOn');

                        let comm = component["login status"].common
                        comm.loginStateChange($checkloginStatus, $dropDown);
                        comm.dropdownChange($dropDown, handleDDChange, param);
                    },
                    "active": function () {
                        $('#hoverLoginCheck').trigger('change');
                        $('#hoverApplyOn').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#hoverApplyOn').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
            },
        },
        "styleDOMs": {
            "tabs": {
                "Background": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM('loginStatus/loginStatusBackground'),
                    "onload": function ($item) {
                        function InitBackground(val) {
                            $("#logStatBGrnd").empty();
                            $("#logStatBGrnd").AdvanceBackground({
                                targetParent: $activeDOM,
                                targetElem: $activeDOM.find(val),
                                options: ["color"]
                            });
                        }
                        let $checkloginStatus = $('#chkIsAnUsrBg');
                        let $dropDown = $('#logStatBGrndAplyOn');
                        let comm = component["login status"].common
                        comm.loginStateChange($checkloginStatus, $dropDown)
                        comm.dropdownChange($dropDown, InitBackground)
                    },
                    "active": function () {
                        $('#logStatBGrndAplyOn').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#logStatBGrndAplyOn').trigger('change').addClass('slcActiveEleSetting');
                        $('#chkIsAnUsrBg').trigger('change');
                    }
                },
                "Border": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM("loginstatus/borderDOM"),
                    "onload": function () {
                        function handleDDChange(val) {
                            $('#borderDOM').AdvanceBorder({
                                targetParent: $activeDOM,
                                targetElem: $activeDOM.find(val),
                                options: {
                                    "max": 20,
                                    "min": 0,
                                    "times": 1,
                                    "position": ["all", "top", "right", "bottom", "left"],
                                }
                            });
                        }
                        let $checkloginStatus = $('#chkLoginStatus');
                        let $dropDown = $('#slcApplyBorderOn');
                        let comm = component["login status"].common
                        comm.loginStateChange($checkloginStatus, $dropDown)
                        comm.dropdownChange($dropDown, handleDDChange)
                    },
                    'active': function () {
                        $('#chkLoginStatus').trigger('change')
                        $('#slcApplyBorderOn').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#slcApplyBorderOn').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
                "Box Radius": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM("loginstatus/borderRadiusDOM"),
                    "onload": function () {
                        function handleDDChange(val) {
                            $('#borderRadiusDOM').AdvanceBoxRadius({
                                targetParent: $activeDOM,
                                targetElem: $activeDOM.find(val),
                                options: {
                                    "max": 50,
                                    "min": 0,
                                    "times": 1,
                                    "position": ["all", "top-left", "top-right", "bottom-left", "bottom-right"]
                                }
                            });
                        }
                        let $checkloginStatus = $('#chkLoginStatu');
                        let $dropDown = $('#slcApplyBorderRadiusOn');
                        let comm = component["login status"].common
                        comm.loginStateChange($checkloginStatus, $dropDown)
                        comm.dropdownChange($dropDown, handleDDChange)
                    },
                    'active': function () {
                        $('#chkLoginStatu').trigger('change');
                        $('#slcApplyBorderRadiusOn').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#slcApplyBorderRadiusOn').trigger('change').addClass('slcActiveEleSetting');
                    }
                },
                "Box Shadow": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM("loginstatus/shadowDOM"),
                    "onload": function () {
                        function handleDDChange(val) {
                            $('#shadowDOM').AdvanceBoxShadow({
                                targetParent: $activeDOM,
                                targetElem: $activeDOM.find(val),
                            });
                        }
                        let $checkloginStatus = $('#chkLoginStatusShadow');
                        let $dropDown = $('#slcApplyShadowOn');
                        let comm = component["login status"].common
                        comm.loginStateChange($checkloginStatus, $dropDown)
                        comm.dropdownChange($dropDown, handleDDChange)
                    },
                    'active': function () {
                        $('#chkLoginStatusShadow').trigger('change')
                        $('#slcApplyShadowOn').val($('.slcActiveEleSetting').eq(0).val());
                        $('.slcActiveEleSetting').removeClass('slcActiveEleSetting');
                        $('#slcApplyShadowOn').trigger('change').addClass('slcActiveEleSetting');
                    }
                }
            }
        },
        "responsiveDOMs": {
            "tabs": {
                "Image": {
                    'DOM': EasyLibrary.ReadDOM("loginstatus/loginBasicRes"),
                    'onload': function () {
                        let device = ViewDeviceAlpha();
                        let regex = new RegExp("\\b" + device + "Dn", "g");
                        let classes = $activeDOM.attr("class").match(regex);
                        if (typeof (classes) !== "undefined" && classes !== null) 
                            $("#profileVisibility").prop("checked", false);
                        else $("#profileVisibility").prop("checked", true);
                        $("#profileVisibility").off().on("change", function () {
                            if ($(this).is(":checked"))
                                $activeDOM.removeClass(device + "Dn").removeClass(device + "Dib").addClass(device + "Dib");
                            else $activeDOM.removeClass(device + "Dib").addClass(device + "Dn");
                        });
                        component['login status'].settingDOMs.tabs.Image.onload();
                    }
                },
                'Text': {
                    'DOM': EasyLibrary.ReadDOM("loginstatus/loginSize"),
                    'onload': function () {
                        component['login status'].settingDOMs.tabs.Text.onload();
                    },
                    "active": function () {
                        component['login status'].settingDOMs.tabs.Text.active();
                    }
                },
                "Spacing": {
                    "custom": true,
                    "DOM": EasyLibrary.ReadDOM("loginstatus/loginStatusSpacing"),
                    "onload": function () {
                        component['login status'].settingDOMs.tabs.Spacing.onload();
                    },
                    "active": function () {
                        component['login status'].settingDOMs.tabs.Spacing.active();
                    }
                },

            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
        "view": {
            "view": function () {
                try {
                    this.library.viewEvents();
                } catch (e) {
                    console.log(e.message);
                }
            },
            "library":
            {
                "viewEvents": function () {
                    let $thisView = this;
                    let $logStatWrap = $('.loginStatus').find('.logStatMenu');
                    let $actDrop = $('.logStatActCnt');
                    try {
                        chkLogStat();
                        $logStatWrap.on('mouseover', '.logStatAuth', function (e) {
                            try {
                                var $this = $(this);
                                $this.find('.dropdown-content').removeClass('Dn').addClass('Dfx');

                            } catch (e) {
                                console.log(e.message);
                            }
                        });
                        $logStatWrap.on('mouseleave', function (e) {
                            try {
                                var $this = $(this);
                                $this.find('.dropdown-content').removeClass('Dfx').addClass('Dn');

                            } catch (e) {
                                console.log(e.message);
                            }
                        });
                        $logStatWrap.on('mouseover mouseout', '.drop-cont', function (e) {
                            try {
                                var $this = $(this);
                                if (e.type === 'mouseover') {
                                    $this.parent().removeClass('Dn').addClass('Dfx');

                                } else if (e.type === 'mouseout') {
                                    $this.parent().removeClass('Dfx').addClass('Dn');

                                }
                            } catch (e) {
                                console.log(e.message);
                            }
                        });

                        function chkLogStat() {
                            try {
                                var config = {
                                    method: '',
                                    url: SageFrameHostURL + '/Builder',
                                    data: '',
                                    ajaxSuccess: '',
                                    ajaxFailure: ''
                                };
                                config.method = "GetProfile";

                                config.ajaxSuccess = chkLogStatSuccess;
                                CommonLibrary.AjaxCall(config);
                            } catch (e) {
                                console.log(e.message);
                            }
                        }
                        function chkLogStatSuccess(data) {
                            let $response = data.d;
                            if ($response === null) {
                                $logStatWrap.find('.logStatAuth').removeClass('Dfx').addClass('Dn');
                                $logStatWrap.find('.logStatAn').removeClass('Dn').addClass('Dfx');
                                $logStatWrap.find('.logStatAuth').find('.logStatUImg img').attr('src', '/Modules/Admin/UserManagement/UserPic/NoImage.png');
                            } else {
                                $logStatWrap.find('.logStatAuth').removeClass('Dn').addClass('Dfx');
                                $logStatWrap.find('.logStatAn').removeClass('Dfx').addClass('Dn');
                                $logStatWrap.find('.logStatAuth').find('.logStatRef').find('.logStatLnk a').css('cursor', 'context-menu').text($response.UserName);
                                if ($response.Image == null || $response.Image == '') $response.Image = 'NoImage.png';
                                $logStatWrap.find('.logStatAuth').find('.logStatUImg img').attr('src', '/Modules/Admin/UserManagement/UserPic/' + $response.Image);
                            }
                        };
                        $('.logoutpage').on('click', function () {
                            $('.logoutConfirm')[0].click();
                        });
                        $('.profileurl').attr('href', SageFrameHostURL + '/dashboard/user-profile');
                    } catch (e) {
                        console.log(e.message);
                    }
                },
                "messageDisplay": function (message, msgType) {
                    try {
                        var msgSec = $("#messageSection");
                        var msgLbl = $("#mgdLabel");;
                        if (msgType === 'success') {
                            msgSec.css({ 'margin': '10px 0px', 'padding': '12px', 'color': '#4F8A10', 'background-color': '#DFF2BF' });
                            msgLbl.css({ 'color': '#4F8A10', 'background-color': '#DFF2BF' });
                        } else if (msgType === 'warning') {
                            msgSec.css({ 'margin': '10px 0px', 'padding': '12px', 'color': '#9F6000', 'background-color': '#FEEFB3' });
                            msgLbl.css({ 'color': '#9F6000', 'background-color': '#FEEFB3' });
                        } else if (msgType === 'error') {
                            msgSec.css({ 'margin': '10px 0px', 'padding': '12px', 'color': '#D8000C', 'background-color': '#FFD2D2' });
                            msgLbl.css({ 'color': '#D8000C', 'background-color': '#FFD2D2' });
                        }
                        msgLbl.text(message);
                        msgSec.fadeIn('fast');
                    } catch (e) {
                        console.log(e.message);
                    }
                },
            }
        },
        "common": {
            reloadAllSettingTabs: function (setOrStyleDOM, excludeThis) {
                if (Object.prototype.toString.call(excludeThis) !== '[object Array]') {
                    excludeThis = $.map(excludeThis.split(','), $.trim);
                }
                let componentName = $activeDOM.attr('data-type');
                let tabArray = Object.keys(component[componentName][setOrStyleDOM].tabs);
                $.each(excludeThis, function (i, val) {
                    let ii = tabArray.indexOf(val);
                    if (ii >= 0) {
                        tabArray.splice(tabArray.indexOf(val), 1);
                    }
                });
                tabArray.forEach(function (val) {
                    component[componentName][setOrStyleDOM].tabs[val].onload();
                });

            },
            showHideUernameWelcome: function () {
                let $usernameWelcome = $('#show-welcome-username');
                let da = DeviceAlpha();
                let dadn = da + 'Dn';
                let $welcomeUser = $activeDOM.find('.logStatAuth  .logStatRef>span');
                let showUserWelcom = $welcomeUser.hasClass(da + 'Dn');
                let $hidable = $('.logStatItem .hidable');
                if (!showUserWelcom) {
                    $usernameWelcome.prop('checked', true);
                    $hidable.removeClass(dadn);
                }
                else {
                    $usernameWelcome.prop('checked', false);
                    $hidable.addClass(dadn);
                }

                $usernameWelcome.off().on('change', function () {
                    if ($(this).prop('checked')) {
                        $hidable.removeClass(dadn);
                        $welcomeUser.removeClass(dadn);
                    }
                    else {
                        $welcomeUser.addClass(dadn);
                        $hidable.addClass(dadn);
                    }

                });
            },
            showHideIconOptions: function ($all) {
                let showOrHideIcons = $activeDOM.attr('data-fonticons');
                let showOrHideText = $activeDOM.attr('data-anTextOnly');

                if (showOrHideIcons === 'show') {
                    $('.ddlAn.hideable').removeClass('Dn').addClass('Db');
                }
                else if (showOrHideIcons === 'hide') {
                    $('.ddlAn.hideable').removeClass('Db').addClass('Dn');
                }

                if (showOrHideText === 'show') {
                    $('.ddlAn.hideableText').removeClass('Dn').addClass('Db');
                }
                else if (showOrHideText === 'hide') {
                    $('.ddlAn.hideableText').removeClass('Db').addClass('Dn');
                }
            },
            menuHideShow: function () {
                let menuShowHideIcons = $activeDOM.attr('data-menuIcons');
                let menuShowHideText = $activeDOM.attr('data-menuText');
                if (menuShowHideIcons === 'show') {
                    $('.ddlAuth.hideMenuIcon').removeClass('Dn').addClass('Db');
                }
                else if (menuShowHideIcons === 'hide') {
                    $('.ddlAuth.hideMenuIcon').removeClass('Db').addClass('Dn');
                }

                if (menuShowHideText === 'show') {
                    $('.ddlAuth.hideMenuText').removeClass('Dn').addClass('Db');
                }
                else if (menuShowHideText === 'hide') {
                    $('.ddlAuth.hideMenuText').removeClass('Db').addClass('Dn');
                }
            },
            loginStateChange: function ($checbox, $ddSelect) {
                $checbox.prop('checked', $activeDOM.find('.logStatAuth').hasClass('Dn'));
                $checbox.off().on('change', function () {
                    let $this = $(this);

                    if ($this.prop('checked')) {//annonymous
                        $activeDOM.find('.logStatAn').removeClass('Dn');
                        $activeDOM.find('.logStatAuth').addClass('Dn');
                        $ddSelect.find('.ddlAuth').removeClass('Db').addClass('Dn');
                        $ddSelect.find('.ddlAn').removeClass('Dn').addClass('Db').eq(0).prop('selected', 'selected').trigger('change');
                        component['login status'].common.showHideIconOptions();
                    }
                    else {//authenticated
                        $activeDOM.find('.logStatAn').addClass('Dn');
                        $activeDOM.find('.logStatAuth').removeClass('Dn');
                        $ddSelect.find('.ddlAn').removeClass('Db').addClass('Dn');
                        $ddSelect.find('.ddlAuth').removeClass('Dn').addClass('Db').eq(0).prop('selected', 'selected').trigger('change');
                        component['login status'].common.menuHideShow();
                    }

                    $('.chkIsAnUsr').prop('checked', $this.prop('checked'));
                });

            },

            dropdownChange: function ($dropDown, callback, param) {
                if (param) $dropDown.trigger('change');
                $dropDown.off().on('change', function () {

                    let $selected = $(this).find('option:selected').val();
                    if ($selected === '.dropdown-content' || $selected === '.logStatSMIcns' || $selected === '.drop-item' || $selected === '.drop-cont') {
                        $('.logStatMIcn').trigger('mouseover');
                    }
                    else {
                        $('.logStatMIcn').trigger('mouseout');
                    }
                    $activeDOM.find('.actEle').removeClass('actEle');
                    $activeDOM.find($selected).addClass('actEle');
                    if (typeof callback == 'function')
                        callback($selected);
                });
            }
        },
        "removeedit": function ($editDOM) {
            //$editDOM.find('#logoutStateEle').html('');
            //$editDOM.find('#logInStateEle').html('');
            $editDOM.find('.logStatLnksAuth').html('');
            $editDOM.find('.logStatAuth').find('.logStatUImg img').attr('src', '/Modules/Admin/UserManagement/UserPic/NoImage.png');
        },
        "remove": function ($cloneDOM) {
            $cloneDOM.find('.logStatLnksAuth').html('');
            $cloneDOM.find('.logStatAuth').find('.logStatUImg img').attr('src', '/Modules/Admin/UserManagement/UserPic/NoImage.png');
        }
    }
}