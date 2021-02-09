(function ($) {
    $.fn.ImageDimensions = function ($applyOn) {
        let da = DeviceAlpha();
        let hasDn = $applyOn.hasClass(da + 'Dn');
        let $dom = this;
        let $img = $applyOn;
        let $imgWrap = $img.closest('div.editor-component');
        const heightSlider = Core_CreateSliderDOM('height-slider', 'height-handle', 'Height');
        const widthSlider = Core_CreateSliderDOM('width-slider', 'width-handle', 'Width');
        const roundSizeSlider = Core_CreateSliderDOM('hw-slider', 'hw-handle', 'Size');
        const imageShape = '<div class="field-row tDn mDn"><div class="field-row stElWrap col60-40"><label class="fCol">Shape</label><span class="fCol select__box txAl-r">' + SelectDOMCreate('slc-image-shape', '', [['round', 'Round'], ['rect', 'Rectangle']]) + '</span></div></div>';
        let dom = '';
        if (!hasDn)
            dom += `<div class='image-dimension'>${imageShape}
                                                <div class ="forRect">${widthSlider}${heightSlider}</div>
                                                <div class="forRound">${roundSizeSlider}</div>
<div class="field-row stElWrap forRect">
    <span class="fa fa-refresh" id="resetHeight" style="cursor: pointer;"></span>
    <label>Reset Height</label>
</div>
                                                
<div class="field-row stElWrap col80-20 tDn mDn" id="fitimagesettings" style="">
                       <label class="fCol TxAl-l">Fit Image</label>
                            <span class="fCol TxAl-r toggle_btn">
                                <input type="checkbox" id="imageFittoCover" name="toggleButton">
                                <label for="toggleButton" class="tgl_slider"></label>
                            </span>
                    </div>
                                                </div>`;

        $dom.html(dom);
        let $heightSlider = $dom.find('#height-slider');
        let $hwSlider = $dom.find('#hw-slider');
        let $forRect = $dom.find('.forRect');
        let $forRound = $dom.find('.forRound');
        let functions = {
            controllers: {
                shape: $('#slc-image-shape'),
                sliders: $('.image-dimension'),
                fitImage: $('#imageFittoCover')
            },
            imageWidth: function () {
                AdvanceSageSlider($('#width-slider'), $('#width-handle'), 1, 100, GetValueByClassName($imgWrap, 'sfCol_[0-9]{1,3}', 'sfCol_'), this.widthChange, $imgWrap, '%');
            },
            imageHeight: function () {
                AdvanceSageSlider($heightSlider, $('#height-handle'), 1, 1000, GetValueByClassName($applyOn, 'H-[0-9]{1,4}', 'H-'), this.heightChange, $applyOn, 'px');
            },
            imageHeightWidth: function () {
                AdvanceSageSlider($hwSlider, $('#hw-handle'), 1, 1000, GetValueByClassName($applyOn, 'H-[0-9]{1,4}', 'H-'), this.heightWidthChange, $applyOn, 'px');
            },
            widthChange: function (space, $par) {
                ReplaceClassByPattern($par, 'sfCol_[0-9]{1,3}', 'sfCol_' + space);
            },
            heightChange: function (space, $par) {
                ReplaceClassByPattern($par, 'H-[0-9]{1,4}', 'H-' + space);
            },
            heightWidthChange: function (space, $par) {
                ReplaceClassByPattern($par, 'H-[0-9]{1,4}', 'H-' + space);
                ReplaceClassByPattern($par, 'W-[0-9]{1,3}', 'W-' + space);
            },
            shapeChange: function () {

                let selected = $(this).val();
                if (selected == 'round') {
                    $activeDOM.addClass('round-image');
                    $forRect.hide();
                    $forRound.show();
                    $img.css('border-radius', '50%');
                    let curHeight = GetValueByClassName($img, 'H-[0-9]{1,4}', 'H-');
                    if (curHeight === 0) {
                        curHeight = $img.height();
                        $img.addClass(da + 'W-' + curHeight);
                        $img.addClass(da + 'H-' + curHeight );
                    }
                    $img.addClass(da + 'W-' + curHeight);
                    ChangeSliderValue($hwSlider, curHeight);
                }
                else if (selected == 'rect') {
                    $activeDOM.removeClass('round-image');
                    $forRect.show();
                    $forRound.hide();
                    RemoveClassByPattern($img, 'W-[0-9]{1,3}');
                    $img.css('border-radius', '0');
                }
            },
            bindEvents: function () {
                let thi = this;
                let $shapeSelect = thi.controllers.shape;
                $shapeSelect.off('change').on('change', thi.shapeChange);
                thi.controllers.fitImage.off().on('change', function () {
                    $img.parent().toggleClass('fit-image', $(this).prop('checked'));
                });
                $('#resetHeight').off('click').on('click', function () {
                    RemoveClassByPattern($img, 'H-[0-9]{1,4}');
                    setTimeout(function () {
                        ChangeSliderValue($heightSlider, $img.height());
                    }, 100);
                });
            },
            loadSettings: function () {
                let $shapeSelect = this.controllers.shape;
                this.controllers.fitImage.prop('checked', $img.parent().hasClass('fit-image'));
                $shapeSelect.val($activeDOM.hasClass('round-image') ? 'round' : 'rect');
                $shapeSelect.trigger('change');
                this.imageHeight();
                this.imageWidth();
                this.imageHeightWidth();
                ChangeSliderValue($heightSlider, $img.height());
            },
            init: function () {
                this.bindEvents();
                this.loadSettings();
            }
        };
        functions.init();
    };
})(jQuery);

(function ($) {
    "use strict";
    function DynamicCmpDetailLink(instance, options) {
        this.linkClass = 'dyncmp-detail-link';
        this.instance = instance;
        this.options = options;
        this.$el = $(this.instance);
        this.linkToggler = null;
        this.init();
    }
    DynamicCmpDetailLink.prototype = {
        init: function () {
            let self = this;
            self.$el.empty();
            self.$el.html(self.getDOM());
            self.linkToggler = self.$el.find('.DynamicCmpDetailLink');
            if (!self.linkToggler || self.linkToggler.length == 0) {
                return;
            }
            self.setup();
        },
        setup: function () {
            let self = this;
            if ($activeDOM.hasClass(self.linkClass)) {
                self.linkToggler.prop("checked", true);
            } else {
                self.linkToggler.prop("checked", false);
            }
            self.addEventListeners();
        },
        addEventListeners: function () {
            let self = this;
            self.$el.find('.DynamicCmpDetailLink').off().on('click', function () {
                let yes = $(this).is(':checked');
                if (yes) {
                    $activeDOM.addClass(self.linkClass);
                } else {
                    $activeDOM.removeClass(self.linkClass);
                }
            });
        },
        getDOM: function () {
            return `<div class="field-row stElWrap col80-20">
                        <label class ="fCol">Link to detail page</label>
                        <span class ="fCol TxAl-r toggle_btn">
                            <input type="checkbox" class ="DynamicCmpDetailLink" name="toggleButton">
                            <label for="toggleButton" class ="tgl_slider"></label>
                        </span>
                    </div>`;
        }
    };
    $.fn.DynamicCmpDetailLink = function (options) {
        if (typeof templateType !== 'undefined' && templateType == 'detail') {
            return this;
        }
        if (typeof hasDetail !== 'undefined' && hasDetail == 0) {
            return this;
        }
        return this.each(function () {
            new DynamicCmpDetailLink(this, options);
        });
    };
}(jQuery));

(function ($) {
    "use strict";
    function HideIfEmpty(caller, dynCmpVal) {
        this.$caller = $(caller);
        this.$caller.addClass('tDn mDn');
        this.$dynCmpVal = $activeDOM.find('.dyncmpfldval');
        this.noValClass = 'dyn-hide-no-val';
        this.init();
    }
    HideIfEmpty.prototype = {
        init: function () {
            this.createDOM();
            this.handleEvents();
        },
        createDOM: function () {
            let $wrapper = this.$caller;
            $wrapper.html(Core_CreateCheckboxDOM("Hide if empty", 'hideIfEmpty'));
            this.$toggle = $wrapper.find('input#hideIfEmpty');
        },
        handleEvents: function () {
            let _this = this;
            _this.$toggle.prop('checked', _this.$dynCmpVal.hasClass(_this.noValClass));
            _this.$toggle.off('click').on('click', function () {
                _this.$dynCmpVal.toggleClass(_this.noValClass, $(this).prop('checked'));
            });
        }
    };
    $.fn.HideIfEmpty = function (dynCmpVal) {
        return this.each(function () {
            new HideIfEmpty(this, dynCmpVal);
        });
    };
})(jQuery);

(function ($) {
    "use strict";
    function Link(instance, target) {
        this.target = target;
        this.detailLinkClass = 'dyncmp-detail-link';
        this.extLinkClass = "dyncmp-url-link";
        this.linkTypeAttr = 'data-linkType';
        this.pageTargetAttr = 'target';
        this.linkDisableClass = "dyncmp-disable-link";
        this.sameWindow = '_self';
        this.newWindow = '_blank';
        this.extLinkOnly = templateType === 'detail' || (typeof hasDetail !== 'undefined' && hasDetail == 0);
        this.caller = $(instance);
        this.caller.addClass('tDn mDn');
        this.init();
    }
    Link.prototype = {
        init: function () {
            this.caller.empty().html(this.getDOM());
            this.setLinkEvents();
        },
        getDOM: function () {
            const tglEnableLink = Core_CreateCheckboxDOM("Enable Link", 'tglEnableLink', '');

            let pageLinkArray = [[this.detailLinkClass, 'Detail Page'],[this.extLinkClass, 'External Page']];
            if (this.extLinkOnly) {
                pageLinkArray.shift();
            }

            const slcLinkType = this.getSelectDOM('Link To', pageLinkArray, 'slcLinkType', '', this.extLinkOnly ?'Dn tDn mDN':'');
            const slcPageTarget = this.getSelectDOM('Open Link In', [[this.sameWindow, 'Same Window'], [this.newWindow, 'New Window']], 'slcPageTarget');
            const urlInput = Core_DOMCreate('div', ` <label class="fCol TxAl-l">URL</label>
                            <span class="fCol cb_input TxAl-r">
                                <input type="text" required="" id="urlInput">
                            </span>`, 'field-row stElWrap col100');
            this.caller.html(tglEnableLink + Core_DOMCreate('div', slcLinkType + urlInput + slcPageTarget, 'linkStngWrap'));
            this.tglEnableLink = this.caller.find('#tglEnableLink');
            this.linkStngWrap = this.caller.find('.linkStngWrap');
            this.slcLinkType = this.linkStngWrap.find('#slcLinkType');
            this.slcLinkTypeWrap = this.slcLinkType.closest('div');
            this.slcPageTarget = this.linkStngWrap.find('#slcPageTarget');
            this.slcPageTargetWrap = this.slcPageTarget.closest('div');
            this.urlInput = this.linkStngWrap.find('#urlInput');
            this.urlInputWrap = this.urlInput.closest('div');
        },
        getSelectDOM: function (slcLabel, optionArray, slcID, wrapperId = '', wrapperClass = '') {
            if (optionArray.length !== 0) {
                const label = Core_DOMCreate('label', slcLabel, 'fCol');
                const span = Core_DOMCreate('span', SelectDOMCreate(slcID, '', optionArray), 'fCol select__box TxAl-r');
                return Core_DOMCreate('div', label +span, 'field-row stElWrap col50-50 ' + wrapperClass, wrapperId);
            }
        },
        setLinkEvents: function () {
            //load Existing
            let _this = this;
            //link disable toggle
            _this.tglEnableLink.off('click').on('click', function () {
                let isEnabled = $(this).prop('checked');
                $activeDOM.toggleClass(_this.linkDisableClass, !isEnabled);
                if (isEnabled) {
                    _this.linkStngWrap.show();
                    if (_this.extLinkOnly) _this.slcLinkType.val(_this.extLinkClass);
                    _this.slcLinkType.trigger('change');
                    _this.slcPageTarget.trigger('change');
                }
                else {
                    _this.linkStngWrap.hide();
                    _this.urlInput.val('');
                    _this.target.attr('href', 'javascript:void(0)');
                }
            });

            //bind link select settings
            _this.slcLinkType.off().on('change', function () {
                let type = $(this).val();
                _this.target.removeClass(type === _this.extLinkClass ? _this.detailLinkClass : _this.detailLinkClass).addClass(type);
                if (type === _this.extLinkClass) {
                    _this.urlInputWrap.show();
                }
                else {
                    _this.urlInputWrap.hide();
                }
            });

            //url input
            _this.urlInput.off().on('keyup', function () {
                let url = $(this).val();
                if (url !== "") {
                    _this.target.attr('href', /\s/.test(url) ? 'javascript:void(0)' : /:\/\//.test(url) ? url : 'http://' + url);
                }
                else _this.target.attr('href','javascript:void(0)');
            });

            // new or same tab??
            _this.slcPageTarget.off().on('change', function () {
                _this.target.attr(_this.pageTargetAttr, $(this).val());
            });

            //load Existing
            this.tglEnableLink.prop('checked', function () {
                let hideSettings = $activeDOM.hasClass(_this.linkDisableClass);
                if (hideSettings) {
                    _this.linkStngWrap.hide();
                }
                else {
                    _this.linkStngWrap.show();
                    _this.slcLinkType.val(_this.target.attr('class'));
                    _this.slcLinkType.trigger('change');
                    _this.slcPageTarget.val(_this.target.attr(_this.pageTargetAttr));
                }
                return !hideSettings;
            });
            let prevUrl = _this.target.attr('href');
            _this.urlInput.val(prevUrl === 'javascript:void(0)' ? '' : prevUrl);

        }
    };
    $.fn.Link = function (target) {
        return this.each(function () {
            new Link(this, target);
        });
    };
})(jQuery);

function getSelectDOM(slcLabel, optionArray, slcID, wrapperId = '', wrapperClass = '') {
    if (optionArray.length !== 0) {
        const label = Core_DOMCreate('label', slcLabel, 'fCol');
        const span = Core_DOMCreate('span', SelectDOMCreate(slcID, '', optionArray), 'fCol select__box TxAl-r');
        return Core_DOMCreate('div', label + span, 'field-row stElWrap col50-50 ' + wrapperClass, wrapperId);
    }
}

(function ($) {
    function ListDisplay(caller) {
        this.caller = $(caller);
        this.dynStngAttr = 'data-dynamic-setting';
        this.target = $activeDOM.find('.dyncmpfldval');
        this.defaultData = JSONParse($activeDOM.attr('data-default-value'));
        this.listSubType = 'listSubTypeWrap';
        this.ol = 'ordered_list';
        this.ul = 'unordered_list';
        this.cl = 'comma_list';
        
        this.olList = [
            ['number', '1 2 3...'],
            ['alphaSmall', 'a b c...'],
            ['alphaCaps', 'A B C...'],
            ['romanSmall', 'i ii iii...'],
            ['romanCaps', 'I II III...']
        ];
        this.ulList = [
            ['circle','Circle'],
            ["disc",'Disc'],
            ['square','Square'],
            ['none','None']
        ];
        this.storedStng = this.getSetting();
        this.init();
    }
    ListDisplay.prototype = {
        init: function () {
            this.createDOM();
            this.settingEvents();
        },
        createDOM: function () {
            const slcListType = getSelectDOM("Data Presentation", [
                [this.cl, 'Comma Separated'],
                [this.ol, 'Ordered List'],
                [this.ul, 'Unordered List']
            ], 'slcPresentation');
            const slcOlType = getSelectDOM("Order Type", this.olList, 'slcOlType', '', this.listSubType);
            const slcUlType = getSelectDOM("Order Type", this.ulList, 'slcUlType', '', this.listSubType);
            this.caller.html(slcListType + slcOlType + slcUlType);
            this.slcListType = this.caller.find('#slcPresentation');
            this.listSubTypeWrap = this.caller.find('.listSubTypeWrap');
            this.slcOlType = this.listSubTypeWrap.find('#slcOlType');
            this.slcOlTypeWrap = this.slcOlType.closest('.listSubTypeWrap');
            this.slcUlType = this.listSubTypeWrap.find('#slcUlType');
            this.slcUlTypeWrap = this.slcUlType.closest('.listSubTypeWrap');
        },
        getSetting: function () {
            let currentStng = $activeDOM.attr(this.dynStngAttr);
            let parsedStng = {};
            if (currentStng !== undefined)
                parsedStng = JSON.parse(currentStng);
            return parsedStng;
        },
        storeSettings: function (newStng) {
            $activeDOM.attr(this.dynStngAttr, JSON.stringify($.extend({}, this.getSetting(), newStng)));
        },
        settingEvents: function () {
            let _this = this;
            function commaToList(listType,subType) {
                let li = '';
                for (let v of _this.defaultData) {
                    li += `<li>${v}</li>`;
                }
                _this.target.html('<' + listType + ' class="' + subType + '">' + li + '</' + listType + '>');
            }
            //setting Events
            _this.slcOlType.off('change').on('change', function () {
                let Type = $(this).val();
                _this.storeSettings({ Type });
                commaToList('ol', Type);
            });
            _this.slcUlType.off('change').on('change', function () {
                let Type = $(this).val();
                _this.storeSettings({ Type });
                commaToList('ul', Type);
            });

            _this.slcListType.off('change').on('change', function (e, currentSetting) {
                let cType = '';
                if(typeof e.isTrigger !== 'undefined' && e.isTrigger && typeof currentSetting !== 'undefined' && typeof currentSetting.Type !== 'undefined') {
                    cType = currentSetting.Type;
                }
                let display = $(this).val();
                _this.storeSettings({ display });
                switch (display) {
                    case _this.cl:
                        _this.listSubTypeWrap.hide();
                        _this.target.text(_this.defaultData.join(', '));
                        break;
                    case _this.ul:
                        if(cType.length > 0) {
                            _this.slcUlType.val(cType);
                        }
                        _this.slcUlType.trigger('change');
                        _this.slcOlTypeWrap.hide();
                        _this.slcUlTypeWrap.fadeIn();
                        break;
                    case _this.ol:
                        if(cType.length > 0) {
                            _this.slcOlType.val(cType);
                        }
                        _this.slcOlType.trigger('change');
                        _this.slcUlTypeWrap.hide();
                        _this.slcOlTypeWrap.fadeIn();
                        break;
                }
            });
            let currentSetting = _this.getSetting();
            _this.slcListType.val(currentSetting.display);
            _this.slcListType.trigger('change', currentSetting);
        }
    };
    $.fn.ListDisplay = function () {
        if ($activeDOM.attr('data-multiple') == 0)
            return this;
        return this.each(function () {
            new ListDisplay(this);
        });
    };
})(jQuery);