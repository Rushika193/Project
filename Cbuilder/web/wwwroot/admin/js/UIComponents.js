(function () {
    /*Side Bar Panel*/
    $.fn.SideBarPanel = function (o) {
        var $this = $(this);

        o = $.extend({
            direction: 'right',//left,right,up,down
            speed: 500,
            title: 'Side Panel',
            openButton: '',
            closeButton: '',
            ready: '',
            defaultOpen: true,
            onClose: function () {

            }
        }, o);
        $this.removeClass('up right left down');
        $this.addClass('filter-slide scrollable ' + o.direction);
        var Panel = {
            init: function () {
                let header = '';
                if ($this.find('.filter-head').length === 0) {
                    header = `<div class="filter-head">
                                <label>${o.title}</label>
                                <span class="fa fa-close closePnl"></span>
                            </div>`;
                }
                else {
                    header = $this.find('.filter-head')[0].outerHTML;
                    $this.find('.filter-head').remove();
                }

                var footer = '';
                if ($this.find('.filter-footer').length === 0) {
                    footer = '';
                }
                else {
                    footer = $this.find('.filter-footer')[0].outerHTML;
                    $this.find('.filter-footer').remove();
                }

                var body = '';
                if ($this.find('.filter-body').length === 0) {
                    body = `<div class="filter-body">
                                ${$this.html()}
                            </div>`;
                }
                else {
                    body = $this.find('.filter-body')[0].outerHTML;
                }
                var html = header + body + footer;

                $this.html(html);
                Panel.BindControl();
            },

            BindControl: function () {
                $(o.openButton).off('click').on('click', function () {
                    Panel.Show();
                });
                $this.find('.closePnl').off('click').on('click', function () {
                    Panel.Close();
                });

                $(o.closeButton).off('click').on('click', function () {
                    $this.find('.closePnl').trigger('click');
                });
                $('.filter-body input[type="text"],.filter-body textarea').on('change', function () {
                    var $this = $(this);
                    if ($this.val().match(/<script[\s\S]*?>[\s\S]*?<\/script>/gi)) {
                        $this.val('');
                    }
                });
                if (typeof (o.ready) === 'function') {
                    o.ready($this);
                }
            },
            Show: function () {
                $this.show("slide", { direction: o.direction }, o.speed);
                $('body').addClass("o-hidden");
                $('body').append('<div class="filter-overlay"></div>');
                $('.filter-overlay').off('click').on('click', function () {
                    Panel.Close();
                });
            },
            Close: function () {
                if (typeof o.onClose === 'function')
                    o.onClose();
                $('.filter-slide').hide("slide", { direction: o.direction }, o.speed);
                $this.removeClass('active');
                $('body').removeClass('o-hidden').find('.filter-overlay').remove();
            }
        }

        Panel.init();

        return Panel;
    };


    $.fn.ModalAdvanced = function (o) {
        var $this = $(this);

        o = $.extend({
            title: 'Advanced Model',
            header: '',
            body: '',
            footer: '',
            closeButton: '',
            onOpen: function ($wrapper) {

            },
            onClose: function ($wrapper) {

            }
        }, o);

        var Modal = {
            init: function () {
                let header = '';
                if ($this.find('.modal-header').length === 0) {
                    if (o.header)
                        header = `<div class="modal-header">
                                <h5 class="modal-title">${o.header}</h5>
                                <button id="btnCloseModel" type="button" class="close"><i class="fa fa-close"></i></button>
                            </div>`;
                }
                else {
                    header = $this.find('.modal-header')[0].outerHTML;
                }

                var footer = '';
                if ($this.find('.modal-footer').length === 0) {
                    if (o.footer.length > 0)
                        footer = `<div class="modal-footer">${o.footer}</div>`;
                }
                else {
                    footer = $this.find('.modal-footer')[0].outerHTML;
                }

                var body = '';
                if ($this.find('.modal-body').length === 0) {
                    body = `<div class="modal-body">
                                ${o.body}
                            </div>`;
                }
                else {
                    body = $this.find('.modal-body')[0].outerHTML;
                }
                var html = '';

                if ($this.find('form').length > 0) {
                    html = $this.find('form')[0].outerHTML;
                }
                else {
                    html = `    ${header}
                                ${ body}
                                ${ footer}
                                    
                            `;
                }

                let modalHtml = `<div id="divCustomModel" style="opacity:0; display:none;"  class="modal ${o.advClass}">
                                    <div  class="modal-dialog   ${o.sizeClass}">
                                        <div class="modal-content ">
                                            ${html}
                                        </div>
                                    </div>
                                </div>`;

                $('body').append(modalHtml);

                Modal.BindControl();
            },

            BindControl: function () {

                $('.modal').find('#btnCloseModel').off('click').on('click', function () {
                    Modal.Close();
                });

                // to stop popup close on content click
                $('.modal-content').off('click').on('click', function (e) {
                    e.stopPropagation();
                });

                $('#divCustomModel').off('click').on('click', function () {
                    Modal.Close();
                });
            },

            Open: function () {
                var $pr = $('#divCustomModel');
                $('body').addClass("o-hidden");
                $('body').append('<div class="modal-backdrop"></div>');
                $pr.fadeTo(400, 1);

                o.onOpen($pr);
            },

            Close: function () {
                var $pr = $('#divCustomModel');
                o.onClose($pr);

                $pr.hide(200);
                $('body').removeClass('o-hidden')
                $('.modal-backdrop').remove();

            }
        }

        Modal.init();

        return Modal;
    }
})();


var UIComponent = (function () {
    $(function () {
        $(window).resize(function () {
            ResponsiveUI();
        });
        function ResponsiveUI() {
            var size = $(window).width();
            if (size < 768)
                $('.tab').addClass('accordion tabToAccor').removeClass('tab');
            else
                $('.tabToAccor').addClass('tab').removeClass('accordion');
            UIComponent.tabs();
            UIComponent.accordion();
        };
        UIComponent.tabs();
        UIComponent.accordion();
    });
    return {
        tabs: function () {
            $('.tab .card-header').off('click').on('click', function () {
                var $ths = $(this);
                var $pr = $ths.parent();
                $pr.find('>.active').removeClass('active');
                $pr.find('>.show').removeClass('show');
                $ths.addClass('active');
                $ths.next('.collapse').addClass('show');
            });
        },
        accordion: function () {
            $('.accordion .card-header').off('click').on('click', function () {
                var $ths = $(this);
                var $pr = $ths.parent();
                $pr.find('>.active').not($ths).removeClass('active');
                var $tar = $ths.next('.collapse');
                $pr.find('>.collapse').not($tar).slideUp(350);
                $ths.toggleClass('active');
                $tar.slideToggle(350);
            });
        },
    }
})();
function CustomModel(o) {
    $('#divCustomModel').remove();
    $('.modal-backdrop').remove();
    o = $.extend({
        heading: '',
        body: "no data",
        footer: '',
        sizeClass: '',
        advClass: '',
        onOpen: function ($wrapper) {

        },
        onClose: function ($wrapper) {

        }
    }, o);
    var html = `<div id="divCustomModel" style="opacity:0"  class="modal ${o.advClass}">
                 <div  class="modal-dialog  ${o.sizeClass}">
                   <div class="modal-content">`;
    if (o.heading !== '')
        html += `<div class="modal-header">
                    <h5 class="modal-title">${o.heading}</h5>
                    <button id="btnCloseModel" type="button" class="close btnCloseModel"><i class="fa fa-close"></i></button>
                 </div>`;
    html += '<div class="modal-body">' + o.body + '</div>';
    if (o.footer !== '') {
        html += '<div class="modal-footer">' + o.footer + '</div>';
    }
    html += '</div></div></div></div><div class="modal-backdrop"></div>';
    $('body').append(html);
    var $pr = $('#divCustomModel');
    $pr.fadeTo(400, 1);
    $('.btnCloseModel:visible').off('click').on('click', function () {
        CloseModel();
    });
    function CloseModel() {
        o.onClose($pr);
        $('#divCustomModel').hide(200).remove();
        $('.modal-backdrop').remove();
    }
    o.onOpen($pr);

}
(function () {
    $.fn.createRangeSlider = function rangeSlider(min, max, initMinVal, initMaxVal, callbackFunction) {
        let $slider = $(this);
        $slider.css('position', 'relative');
        $slider.find('.ui-slider-range').remove();
        if (!$slider.hasClass('cus-range-slider')) {
            $slider.addClass('cus-rng-slider cus-range-slider');
            $slider.html('<span class="minHndl ui-slider-handle"><span></span></span><span class="maxHndl ui-slider-handle"><span></span></span>');
        }
        let $minHandler = $slider.find('.minHndl>span');
        let $maxHandler = $slider.find('.maxHndl>span');
        return $slider.slider({
            range: true,
            min: min,
            max: max,
            values: [initMinVal, initMaxVal],
            create: function () {
                $minHandler.text($(this).slider("values")[0]);
                $maxHandler.text($(this).slider("values")[1]);
            },
            slide: function (event, ui) {
                $minHandler.text(ui.values[0]);
                $maxHandler.text(ui.values[1]);
                if (typeof callbackFunction === 'function') {
                    callbackFunction(ui.values[0], ui.values[1]);
                }
                else if (typeof callbackFunction === 'string') {
                    window[callbackFunction](ui.values[0], ui.values[1]);
                }
            }
        });
    };
    $.fn.ChangeSliderValue = function (minVal, maxVal) {
        var $slider = $(this);
        $slider.slider({
            values: [minVal, maxVal]
        });
        $slider.slider('option', 'slide');
        $slider.find('.minHndl>span').text(minVal);
        $slider.find('.maxHndl>span').text(maxVal);
        $slider.slider("enable");
    }
})();

let gridHelper = (function (config) {
    $(function () {
        $('body').on('click', function (e) {
            let $tar = $(e.target);
            if ($tar.closest('.action-menu').length === 0) {
                $('.action-open').hide();
            }
            if ($tar.closest('.dropdown-group').length === 0) {
                $('.dropdown-group').removeClass('enable');
            }
            if ($tar.closest('.flyer').length === 0)
                $('.flyer-group').removeClass('active');
        });
        $('.dropdown-link').off('click').on('click', function () {
            var $pr = $(this).closest('.dropdown-group');
            $('.dropdown-group').not($pr).removeClass('enable');
            $pr.toggleClass('enable');
        });
        $('.btnOpenFlyer').off('click').on('click', function () {
            $(this).next('.flyer-group').toggleClass('active');
        });
        $('.btnCloseFlyer').off('click').on('click', function () {
            $(this).closest('.flyer-group').removeClass('active')
        });
        gridHelper.bindEvent();
    });
    return {
        bindEvent: function (o) {
            var $pr = $('.sfDatagrid,.sfDatagrid-body');
            if (typeof o !== 'undefined' && typeof o.parent === 'object')
                $pr = o.parent;
            $pr.find('.action-menu .action-icon').off('click').on('click', function () {
                var $ctxMenu = $(this).next('.action-open');
                $('.action-open').not($ctxMenu).hide();
                if ($ctxMenu.css("display") === "none")
                    $ctxMenu.show(50);
                else
                    $ctxMenu.hide(50);
            });
            $pr.find('.action-open li').off('click').on('click', function () {
                if (typeof o !== 'undefined' && typeof o.onMenuClick === 'function')
                    o.onMenuClick($(this));
            });
            $pr.find('.dropdown-link').off('click').on('click', function () {
                var $pr = $(this).closest('.dropdown-group');
                $('.dropdown-group').not($pr).removeClass('enable');
                $pr.toggleClass('enable');
            });
            $pr.find('.chkAllGrdItem').off('change').on('change', function () {
                $pr.find('.chkGrdItem').prop('checked', $(this).prop('checked'));
                if (typeof o.onItemChecked === 'function')
                    o.onItemChecked($pr.find('.chkGrdItem:checked'));
            });
            $pr.find('.chkGrdItem').off('change').on('change', function () {
                var $chked = $pr.find('.chkGrdItem:checked');
                var IsAll = false;
                if ($pr.find('.chkGrdItem').length === $chked.length)
                    IsAll = true;
                $pr.find('.chkAllGrdItem').prop('checked', IsAll);
                if (typeof o.onItemChecked === 'function')
                    o.onItemChecked($chked);
            });

            $pr.find('.dropdown-group').find('.no-multiple').off('click').on('click', function () {
                var $pr = $(this).closest('.dropdown-group');
                var label = $(this).find('span').text();
                var $prLabel = $pr.find('.dropdown-link');
                $prLabel[0].firstChild.nodeValue = label;
                $pr.toggleClass('enable');

            });

        },
    }
})();
