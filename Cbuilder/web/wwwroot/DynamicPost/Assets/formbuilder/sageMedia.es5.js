'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (!window.fbControls) window.fbControls = [];
window.fbControls.push(function (controlClass) {
    /**
     * Sage Media class
     */
    var controlSageMedia = function (_controlClass) {
        _inherits(controlSageMedia, _controlClass);

        function controlSageMedia() {
            _classCallCheck(this, controlSageMedia);

            return _possibleConstructorReturn(this, (controlSageMedia.__proto__ || Object.getPrototypeOf(controlSageMedia)).apply(this, arguments));
        }

        _createClass(controlSageMedia, [{
            key: 'configure',


            /**
             * javascript & css to load
             */
            value: function configure() { }
            //if (typeof $.fn.SageMedia == 'undefined') {
            //    this.js = '/js/SageMediaManagement.js';
            //}
            //this.css = '//';


            /**
             * build a text DOM element, supporting other jquery text form-control's
             * @return {Object} DOM Element to be injected into the form.
             */

        }, {
            key: 'build',
            value: function build() {
                this.imgPlHld = '<img src="/DynamicPost/Assets/images/image_placeholder.png" class="imgPlHld" />';
                var btn = '<input type="button" value="Select Image" class="smbtn" id="smbtn-' + this.config.name + '">';
                var imgHolder = '<div class="smimghld" id="smimg-' + this.config.name + '">' + this.imgPlHld + '</div>';
                var imgDel = '<a href="#" style="display:none" class="smimgdel" id="smimgdel-' + this.config.name + '">Remove</a>';
                this.input = this.markup('input', null, { type: 'hidden', name: this.config.name, id: this.config.name });
                this.wrapper = this.markup('div', btn + imgHolder + imgDel, { id: this.config.name + '-wrapper', class: 'smwrapper' });
                return [this.input, this.wrapper];
            }

            /**
             * onRender callback
             */

        }, {
            key: 'onRender',
            value: function onRender() {
                var imgPlHld = this.imgPlHld;
                var $del = $('#smimgdel-' + this.config.name);
                var $btn = $('#smbtn-' + this.config.name);
                var $img = $('#smimg-' + this.config.name);
                var $val = $('#' + this.config.name);
                var value = this.config.value;
                try {
                    var vJSON = JSON.parse(value);
                    $img.html(vJSON.html);
                    $val.val(value);
                    $del.show();
                } catch (e) {
                    //console.log("sage media no value");
                }
                $btn.off('click').on('click', function () {
                    let sagemedia = $(this).SageMedia({
                        userModuleID: dynCmpUserModuleID,
                        onSelect: function (src, response, type, filename, extension) {
                            //
                        },
                    mediaType: 'image',
                    extension: 'png,jpeg,jpg,ico,svg,gif,webp'
                       
                  });   
                  sagemedia.Show(function (r) {
                    $img.html(r.html);
                    $val.val(JSON.stringify(r));
                    $val.trigger('change');
                    $del.show();
                  });
                });
                $del.off('click').on('click', function (e) {
                    e.preventDefault();
                    SageConfirmDialog('Are you sure?').done(function () {
                        $img.html(imgPlHld);
                        $val.val('');
                        $val.trigger('change');
                        $del.hide();
                    });
                });
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
                        default: 'Image'
                    }
                };
            }
        }]);

        return controlSageMedia;
    }(controlClass);

    // register this control for the following types & text subtypes


    controlClass.register('sageMedia', controlSageMedia);
    return controlSageMedia;
});