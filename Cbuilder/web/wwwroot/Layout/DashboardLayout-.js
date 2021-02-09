(function () {
    $.PageLayout = function ($pr, p) {
        p = $.extend({
            pageName: 'dashboard'
        }, p);
        var Layout = {
            init: function () {
                this.eventListener();
                this.dynamicEvents();
            },
            eventListener: function () {
               
                var self = this;
                $('#btnAddNewRow').off('click').on('click', function () {
                    var $ths = $(this);
                    if ($ths.attr('data-open') === '0') {
                        $('#divLayoutSample').slideDown(100);
                        $ths.attr('data-open', 1);
                    }
                    else {
                        $('#divLayoutSample').slideUp(100);
                        $ths.attr('data-open', 0);
                    }
                });
                $('#btnSaveLayout').off('click').on('click', function () {
                    self.saveLayout();
                });
                //$('#btnCloseLayout').off('click').on('click', function () {
                //    $('#divLayoutSample').slideUp(100);
                //});
                $('#divLayoutSample .selectData').off('click').on('click', function () {
                    var rowStng = '<ul class="rowStng stng"><li><span class="sortRow"><i class="fa fa-drag"></span></li><li><span class="removeRow c-pointer fa fa-trash"></span></li></ul>';
                    var colStng = '<ul class="colStng stng"><li><span class="addModule c-pointer " title="add module"><i class="fa fa-cog"></i></span></li></ul>';
                    var $dom = $($(this).html());
                    $dom.prepend(rowStng);
                    setLayoutElement($dom)
                    $dom.find('.col').each(function (i, v) {
                        var $ths = $(v);
                        setLayoutElement($ths);
                        $ths.html(colStng);
                    });
                    $('#divLayoutEditor').append($dom);
                    $('#btnAddNewRow').trigger('click');
                    self.dynamicEvents();
                });
                function setLayoutElement($ths) {
                    var id = $ths.attr('data-eletype') + Math.random().toString().substr(-5);
                    $ths.attr('id', id);
                    $ths.attr('data-id', 0);
                    $ths.addClass('ele');
                }
            },
            dynamicEvents: function () {
                var self = this;
                $("#divLayoutEditor .col").sortable({
                    revert: true,
                    items: '.modules',
                    handle: '.sortComp',
                    connectWith: ".col",
                    cursorAt: { left: 5, top: 5 },
                    helper: function (event, ui) {
                        return $('<div class="rowhelperBox" style="height:40px;width:200px;"></div>');
                    },
                    placeholder: 'ui-state-Sortablerow-hover ui-hover-state',
                    containment: '.layout-editor',
                    stop: function (event, ui) {

                    }
                });
                $("#divLayoutEditor").sortable({
                    revert: true,
                    items: '.sfRow',
                    handle: '.sortRow',
                    connectWith: ".sfRow",
                    cursorAt: { left: 5, top: 5 },
                    helper: function (event, ui) {
                        return $('<div class="rowhelperBox" style="height:40px;width:200px;"></div>');
                    },
                    placeholder: 'ui-state-Sortablerow-hover ui-hover-state',
                    containment: '.layout-editor',
                    stop: function (event, ui) {

                    }
                });
                $pr.find('.addModule').off('click').on('click', function () {
                    self.openModuleList($(this).closest('.col'), null);
                });
                $pr.find('.editComp').off('click').on('click', function () {
                    var $ths = $(this);
                    self.openModuleList($ths.closest('.col'), $ths.closest('.modules'));
                });
                
                $pr.find('.removeComp').off('click').on('click', function () {
                    var $pr = $(this).closest('.modules');
                    SageConfirmDialog("Are you sure to delete?", "Delete Confirmation").done(function () {
                        $pr.remove();
                    });
                });
                $pr.find('.removeRow').off('click').on('click', function () {
                    var $pr = $(this).closest('.sfRow');
                    SageConfirmDialog("Are you sure to delete?", "Delete Confirmation").done(function () {
                        $pr.remove();
                    });
                });

            },
            openModuleList: function ($col, $active) {
                var self = this;
                CustomModel({
                    heading: "Choose Module",
                    body: $('#divModuleForm').html(),
                    footer: '<button type="button" class="btn primary round" id="btnUseThisModule">Done</button>',
                    sizeClass: 'modal-dialog-centered modal-md',
                    advClass: '',
                    onOpen: function ($pr) {
                        var prevParam = {};
                        var IsEdit = false;
                        if ($active !== null && $active.length > 0) {
                            prevParam = JSON.parse($active.attr('data-param'));
                            IsEdit = true;
                        }
                        $pr.find('#slcModuleList').off('change').on('change', function () {
                            var $opt = $(this).find('option:selected');
                            var objProb = JSON.parse($opt.attr('data-param'));
                            var objKeys = Object.keys(objProb);
                            var html = '';
                            objKeys.forEach(function (k, i) {
                                var val = prevParam[k];
                                if (typeof val === 'undefined')
                                    val = objProb[k];
                                html += `<div class="sfFieldset sfCol-6  Px-15">
                                        <div class="formkey">
                                            <span class="sfFormlabel">${k}</span>
                                        </div>
                                        <div class="formvalue">
                                            <input data-key="${k}" type="text" value=${val} class="sfFormcontrol moduleParam">
                                        </div>
                                    </div>`
                            });
                            if (html !== '') {
                                $pr.find('#divInvokeParam').html(html);
                                $pr.find('#fldParam').show();
                            }
                            else
                                $pr.find('#fldParam').hide();
                            var tit = $opt.text();
                            if (IsEdit) {
                                tit = $active.attr('data-title');
                                $pr.find('#txtModuleCssClass').val($active.attr('data-cssclass'));
                            }
                            $pr.find('#txtModuleTitle').val(tit);

                        });
                        $('#btnUseThisModule').off('click').on('click', function () {
                          

                                self.appendModule($pr.find('#slcModuleList option:selected'), $pr, $col, $active);
                            self.dynamicEvents();
                          
                            $('#btnCloseModel').trigger('click');
                        });
                        $pr.find('#slcModuleList').trigger('change');


                    },
                    onClose: function ($wrapper) {

                    }
                });

            },
            appendModule: function ($opt, $frm, $col, $active) {
                var mCls = $frm.find('#txtModuleCssClass').val();
                var title = $frm.find('#txtModuleTitle').val();
                var stng = '<ul class="compStng stng"><li><span class="sortComp fa fa-arrows"></span></li><li><span class="editComp fa fa-pencil-square-o"></span></li><li class="delComp"><span class="removeComp c-pointer fa fa-trash"></span></li></ul>';
                var param = {};
                $frm.find('.moduleParam').each(function () {
                    var $inp = $(this);
                    param[$inp.attr('data-key')] = $inp.val();
                });
                param = JSON.stringify(param);
                if ($active === null) {
                    var mHtml = '<div data-id="0" data-moduleid="' + $opt.attr('data-moduleid') + '" class="modules w-100' + mCls + '" data-title="' + title + '" data-cssclass="' + mCls + '" data-param="' + param + '">' + stng + '<span class="info">Module render here</span></div>';
                    $col.append(mHtml);
                    ActionMessage("Module Added Successfully. Save and Refresh to Load Module.", MessageType.Success);
                } else {
                    $active.attr('data-title', title).attr('data-param', param).attr('data-cssclass', mCls).attr('class', 'modules w-100 ' + mCls);
                }
            },
            saveLayout: function () {
                var _ths = this;
                var layout = new Array();
                var modules = new Array();
                var $editor = $('#divLayoutEditor');
                $editor.find('.col').removeClass('ui-sortable');
                $editor.find('.ele').each(function (j, c) {
                    var $ele = $(this);
                    $ele.removeClass('.ui-sortable');
                    layout.push({
                        ID: parseInt($ele.attr('data-id')),
                        ElementID: $ele.attr('id'),
                        ParentID: $ele.parent().attr('id'),
                        DisplayOrder: j,
                        HasInnerElement: $ele.find('>.ele').length > 0 ? true : false,
                        HasModules: $ele.find('>.modules').length > 0 ? true : false,
                        EleType: $ele.attr('data-eletype'),
                        Attributes: _ths.getAttributes($ele)
                    });
                });
                $editor.find('.col').addClass('ui-sortable');
                $editor.find('.modules').each(function (k, m) {
                    var $mod = $(m);
                    modules.push({
                        ID: parseInt($mod.attr('data-id')),
                        ElementID: $mod.closest('.col').attr('id'),
                        ModuleID: $mod.attr('data-moduleid'),
                        DisplayOrder: k,
                        InvokeParam: $mod.attr('data-param'),
                        Title: $mod.attr('data-title'),
                        CssClass: $mod.attr('data-cssclass')
                    });
                });
                var config = {
                    type: 'POST',
                    url: '/dashboard/dashboard/layout',
                    data: JSON.stringify({
                        Elements: layout,
                        Modules: modules,
                        PageName: p.pageName
                    }),
                    success: function (data) {
                        var msgTyp = MessageType.Error;
                        if (data.IsSuccess)
                            msgTyp = MessageType.Success;
                        ActionMessage(data.Message, msgTyp);
                    }
                };
                SecureAjaxCall.PassObject(config);
            },
            getAttributes: function ($ele) {

               

                let a = '';
                let resAttr = ['id', 'data-id', 'data-eletype'];
                var r = $ele.get(0);
                if (r) {
                    r = r.attributes;
                    for (var i in r) {
                        let p = r[i];
                        if (typeof p.nodeValue !== 'undefined' && resAttr.indexOf(p.nodeName) < 0)
                            a += ' ' + p.nodeName + '="' + p.nodeValue + '"';
                    }
                }
                return a;
            }

        }
        Layout.init();
    };
    $.fn.ManagePageLayout = function (p) {
        $.PageLayout($(this), p);
    }
})();