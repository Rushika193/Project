'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (!window.fbControls) window.fbControls = [];
window.fbControls.push(function (controlClass) {
    /**
     * Sage Video class
     */
    var controlSageVideo = function (_controlClass) {
        _inherits(controlSageVideo, _controlClass);

        function controlSageVideo() {
            _classCallCheck(this, controlSageVideo);

            return _possibleConstructorReturn(this, (controlSageVideo.__proto__ || Object.getPrototypeOf(controlSageVideo)).apply(this, arguments));
        }

        _createClass(controlSageVideo, [{
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
                var videoHolder = '<div id="sagevideo-' + this.config.name + '"></div>';
                var providerDD = '<div class="form-group">\n\t                            <label for="sagevideo-provider-' + this.config.name + '">Provider</label>\n\t                            <div class="input-wrap">\n\t\t                            <select id="sagevideo-provider-' + this.config.name + '" name="sagevideo-provider" class="form-control">\n\t\t\t                            <option label="Youtube" value="youtube">Youtube</option>\n\t\t                            </select>\n\t                            </div>\n                            </div>';
                var input = '<div class="form-group">\n\t                            <label for="sagevideo-url-' + this.config.name + '">Url</label>\n\t                            <div class="input-wrap">\n\t\t                            <input type="text" id="sagevideo-url-' + this.config.name + '" name="sagevideo-url" class ="form-control">\n\t                            </div>\n                            </div>';
                this.input = this.markup('input', null, { type: 'hidden', name: this.config.name, id: this.config.name });
                this.wrapper = this.markup('div', videoHolder + providerDD + input, { id: this.config.name + '-wrapper' });
                return [this.input, this.wrapper];
            }

            /**
             * onRender callback
             */

        }, {
            key: 'onRender',
            value: function onRender() {
                var $videoHolder = $('#sagevideo-' + this.config.name);
                var $input = $('#sagevideo-url-' + this.config.name);
                var $val = $('#' + this.config.name);
                var $providerDD = $('#sagevideo-provider-' + this.config.name);
                var value = this.config.value;
                try {
                    var vJSON = JSON.parse(value);
                    $providerDD.val(vJSON.provider);
                    $videoHolder.html(this.getVideoCode(vJSON));
                    $input.val(vJSON.url);
                    $val.val(value);
                } catch (e) {
                    //
                }
                $input.off().on('blur', function () {
                    var r = {
                        provider: $providerDD.val(),
                        url: $input.val().trim()
                    };
                    $val.val(JSON.stringify(r));
                    $val.trigger('change');
                });
            }
        }, {
            key: 'getVideoCode',
            value: function getVideoCode(data) {
                var code = "";
                switch (data.provider) {
                    case 'youtube':
                        var url = 'https://www.youtube.com/embed/';
                        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                        var match = data.url.trim().match(regExp);
                        if (match && match[2].length == 11) {
                            url += match[2];
                            code = '<iframe style="width: 200px; height: 200px; border: none;" src="' + url + '"></iframe>';
                        }
                        break;
                }
                return code;
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
                        default: 'Video'
                    }
                };
            }
        }]);

        return controlSageVideo;
    }(controlClass);

    // register this control for the following types & text subtypes


    controlClass.register('sageVideo', controlSageVideo);
    return controlSageVideo;
});