'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (!window.fbControls) window.fbControls = [];
window.fbControls.push(function (controlClass) {
    /**
     * Rich text class
     */
    var controlRichtext = function (_controlClass) {
        _inherits(controlRichtext, _controlClass);

        function controlRichtext() {
            _classCallCheck(this, controlRichtext);

            return _possibleConstructorReturn(this, (controlRichtext.__proto__ || Object.getPrototypeOf(controlRichtext)).apply(this, arguments));
        }

        _createClass(controlRichtext, [{
            key: 'configure',


            /**
             * javascript & css to load
             */
            value: function configure() { }
            //


            /**
             * build a text DOM element, supporting other jquery text form-control's
             * @return {Object} DOM Element to be injected into the form.
             */

        }, {
            key: 'build',
            value: function build() {
                var html = ['<input type="hidden" name="' + this.config.name + '" id="' + this.config.name + '" />', '<div class="divRichText" id="richtext-' + this.config.name + '">', '<div class="documenttext">', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean posuere, eros quis ullamcorper commodo, est nulla rhoncus velit, in pellentesque metus felis nec justo.', '</div>', '</div>'];
                return html.join('');
            }

            /**
             * onRender callback
             */

        }, {
            key: 'onRender',
            value: function onRender() {
                var $val = $('#' + this.config.name);
                var value = this.config.value;
                if (value) {
                    $('#richtext-' + this.config.name).html(value);
                    //$val.val(value);
                    //$val.trigger('change');
                }
                var $target = $('#richtext-' + this.config.name);
                //$target.on('blur keyup paste input', '[contenteditable]', function () {
                //    $val.val($target.find('.documenttext').wrapAll('<div />').parent().html());
                //    $val.trigger('change');
                //});
                $target.LightTextEditor();
            }
        }, {
            key: 'on',
            value: function on(eventType) {
                var _this2 = this;

                if (eventType == 'prerender' && this.preview) {
                    return function (element) {
                        if (_this2.field) {
                            element = _this2.field;
                        }

                        // if this is a preview, stop events bubbling up so the editor preview is clickable (and not draggable)
                        $(element).on('mousedown', function (e) {
                            e.stopPropagation();
                        });
                    };
                }
                return _get(controlRichtext.prototype.__proto__ || Object.getPrototypeOf(controlRichtext.prototype), 'on', this).call(this, eventType);
            }
        }], [{
            key: 'definition',


            /**
             * Class configuration - return the icons & label related to this control
             * @returndefinition object
             */
            get: function get() {
                return {
                    icon: '',
                    i18n: {
                        default: 'Rich text'
                    }
                };
            }
        }]);

        return controlRichtext;
    }(controlClass);

    // register this control for the following types & text subtypes


    controlClass.register('richtext', controlRichtext);
    return controlRichtext;
});