/*!
 * Cropper.js v0.8.1
 * https://github.com/fengyuanchen/cropperjs
 *
 * Copyright (c) 2015-2016 Fengyuan Chen
 * Released under the MIT license
 *
 The MIT License (MIT)

Copyright (c) 2014-2016 Fengyuan Chen and contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

 * Date: 2016-09-03T04:55:16.458Z
 */



(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define([], factory);
    else {
        var a = factory();
        for (var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
    }
})(this, function () {
    return /******/ (function (modules) { // webpackBootstrap
        /******/ 	// The module cache
        /******/ 	var installedModules = {};
        /******/
        /******/ 	// The require function
        /******/ 	function __webpack_require__(moduleId) {
            /******/
            /******/ 		// Check if module is in cache
            /******/ 		if (installedModules[moduleId])
                /******/ 			return installedModules[moduleId].exports;
            /******/
            /******/ 		// Create a new module (and put it into the cache)
            /******/ 		var module = installedModules[moduleId] = {
                /******/ 			exports: {},
                /******/ 			id: moduleId,
                /******/ 			loaded: false
                /******/
            };
            /******/
            /******/ 		// Execute the module function
            /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/
            /******/ 		// Flag the module as loaded
            /******/ 		module.loaded = true;
            /******/
            /******/ 		// Return the exports of the module
            /******/ 		return module.exports;
            /******/
        }
        /******/
        /******/
        /******/ 	// expose the modules object (__webpack_modules__)
        /******/ 	__webpack_require__.m = modules;
        /******/
        /******/ 	// expose the module cache
        /******/ 	__webpack_require__.c = installedModules;
        /******/
        /******/ 	// __webpack_public_path__
        /******/ 	__webpack_require__.p = "";
        /******/
        /******/ 	// Load entry module and return exports
        /******/ 	return __webpack_require__(0);
        /******/
    })
    /************************************************************************/
    /******/([
    /* 0 */
    /***/ function (module, exports, __webpack_require__) {

        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

        var _defaults = __webpack_require__(1);

        var _defaults2 = _interopRequireDefault(_defaults);

        var _template = __webpack_require__(2);

        var _template2 = _interopRequireDefault(_template);

        var _render = __webpack_require__(3);

        var _render2 = _interopRequireDefault(_render);

        var _preview = __webpack_require__(5);

        var _preview2 = _interopRequireDefault(_preview);

        var _events = __webpack_require__(6);

        var _events2 = _interopRequireDefault(_events);

        var _handlers = __webpack_require__(7);

        var _handlers2 = _interopRequireDefault(_handlers);

        var _change = __webpack_require__(8);

        var _change2 = _interopRequireDefault(_change);

        var _methods = __webpack_require__(9);

        var _methods2 = _interopRequireDefault(_methods);

        var _utilities = __webpack_require__(4);

        var $ = _interopRequireWildcard(_utilities);

        function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        // Constants
        var NAMESPACE = 'cropper';

        // Classes
        var CLASS_HIDDEN = NAMESPACE + '-hidden';

        // Events
        var EVENT_ERROR = 'error';
        var EVENT_LOAD = 'load';
        var EVENT_READY = 'ready';
        var EVENT_CROP = 'crop';

        // RegExps
        var REGEXP_DATA_URL = /^data:/;
        var REGEXP_DATA_URL_JPEG = /^data:image\/jpeg.*;base64,/;

        var AnotherCropper = void 0;

        var Cropper = function () {
            function Cropper(element, options) {
                _classCallCheck(this, Cropper);

                var self = this;

                self.element = element;
                self.options = $.extend({}, _defaults2.default, $.isPlainObject(options) && options);
                self.loaded = false;
                self.ready = false;
                self.complete = false;
                self.rotated = false;
                self.cropped = false;
                self.disabled = false;
                self.replaced = false;
                self.limited = false;
                self.wheeling = false;
                self.isImg = false;
                self.originalUrl = '';
                self.canvasData = null;
                self.cropBoxData = null;
                self.previews = null;
                self.init();
            }

            _createClass(Cropper, [{
                key: 'init',
                value: function init() {
                    var self = this;
                    var element = self.element;
                    var tagName = element.tagName.toLowerCase();
                    var url = void 0;

                    if ($.getData(element, NAMESPACE)) {
                        return;
                    }

                    $.setData(element, NAMESPACE, self);

                    if (tagName === 'img') {
                        self.isImg = true;

                        // e.g.: "img/picture.jpg"
                        self.originalUrl = url = element.getAttribute('src');

                        // Stop when it's a blank image
                        if (!url) {
                            return;
                        }

                        // e.g.: "http://example.com/img/picture.jpg"
                        url = element.src;
                    } else if (tagName === 'canvas' && window.HTMLCanvasElement) {
                        url = element.toDataURL();
                    }

                    self.load(url);
                }
            }, {
                key: 'load',
                value: function load(url) {
                    var self = this;
                    var options = self.options;
                    var element = self.element;

                    if (!url) {
                        return;
                    }

                    self.url = url;
                    self.imageData = {};

                    if (!options.checkOrientation || !window.ArrayBuffer) {
                        self.clone();
                        return;
                    }

                    // XMLHttpRequest disallows to open a Data URL in some browsers like IE11 and Safari
                    if (REGEXP_DATA_URL.test(url)) {
                        if (REGEXP_DATA_URL_JPEG) {
                            self.read($.dataURLToArrayBuffer(url));
                        } else {
                            self.clone();
                        }
                        return;
                    }

                    var xhr = new XMLHttpRequest();

                    xhr.onerror = xhr.onabort = function () {
                        self.clone();
                    };

                    xhr.onload = function () {
                        self.read(xhr.response);
                    };

                    if (options.checkCrossOrigin && $.isCrossOriginURL(url) && element.crossOrigin) {
                        url = $.addTimestamp(url);
                    }

                    xhr.open('get', url);
                    xhr.responseType = 'arraybuffer';
                    xhr.send();
                }
            }, {
                key: 'read',
                value: function read(arrayBuffer) {
                    var self = this;
                    var options = self.options;
                    var orientation = $.getOrientation(arrayBuffer);
                    var imageData = self.imageData;
                    var rotate = 0;
                    var scaleX = 1;
                    var scaleY = 1;

                    if (orientation > 1) {
                        self.url = $.arrayBufferToDataURL(arrayBuffer);

                        switch (orientation) {

                            // flip horizontal
                            case 2:
                                scaleX = -1;
                                break;

                                // rotate left 180°
                            case 3:
                                rotate = -180;
                                break;

                                // flip vertical
                            case 4:
                                scaleY = -1;
                                break;

                                // flip vertical + rotate right 90°
                            case 5:
                                rotate = 90;
                                scaleY = -1;
                                break;

                                // rotate right 90°
                            case 6:
                                rotate = 90;
                                break;

                                // flip horizontal + rotate right 90°
                            case 7:
                                rotate = 90;
                                scaleX = -1;
                                break;

                                // rotate left 90°
                            case 8:
                                rotate = -90;
                                break;
                        }
                    }

                    if (options.rotatable) {
                        imageData.rotate = rotate;
                    }

                    if (options.scalable) {
                        imageData.scaleX = scaleX;
                        imageData.scaleY = scaleY;
                    }

                    self.clone();
                }
            }, {
                key: 'clone',
                value: function clone() {
                    var self = this;
                    var element = self.element;
                    var url = self.url;
                    var crossOrigin = void 0;
                    var crossOriginUrl = void 0;
                    var start = void 0;
                    var stop = void 0;

                    if (self.options.checkCrossOrigin && $.isCrossOriginURL(url)) {
                        crossOrigin = element.crossOrigin;

                        if (crossOrigin) {
                            crossOriginUrl = url;
                        } else {
                            crossOrigin = 'anonymous';

                            // Bust cache when there is not a "crossOrigin" property
                            crossOriginUrl = $.addTimestamp(url);
                        }
                    }

                    self.crossOrigin = crossOrigin;
                    self.crossOriginUrl = crossOriginUrl;

                    var image = $.createElement('img');

                    if (crossOrigin) {
                        image.crossOrigin = crossOrigin;
                    }

                    image.src = crossOriginUrl || url;
                    self.image = image;
                    self.onStart = start = $.proxy(self.start, self);
                    self.onStop = stop = $.proxy(self.stop, self);

                    if (self.isImg) {
                        if (element.complete) {
                            self.start();
                        } else {
                            $.addListener(element, EVENT_LOAD, start);
                        }
                    } else {
                        $.addListener(image, EVENT_LOAD, start);
                        $.addListener(image, EVENT_ERROR, stop);
                        $.addClass(image, 'cropper-hide');
                        element.parentNode.insertBefore(image, element.nextSibling);
                    }
                }
            }, {
                key: 'start',
                value: function start(event) {
                    var self = this;
                    var image = self.isImg ? self.element : self.image;

                    if (event) {
                        $.removeListener(image, EVENT_LOAD, self.onStart);
                        $.removeListener(image, EVENT_ERROR, self.onStop);
                    }

                    $.getImageSize(image, function (naturalWidth, naturalHeight) {
                        $.extend(self.imageData, {
                            naturalWidth: naturalWidth,
                            naturalHeight: naturalHeight,
                            aspectRatio: naturalWidth / naturalHeight
                        });

                        self.loaded = true;
                        self.build();
                    });
                }
            }, {
                key: 'stop',
                value: function stop() {
                    var self = this;
                    var image = self.image;

                    $.removeListener(image, EVENT_LOAD, self.onStart);
                    $.removeListener(image, EVENT_ERROR, self.onStop);

                    $.removeChild(image);
                    self.image = null;
                }
            }, {
                key: 'build',
                value: function build() {
                    var self = this;
                    var options = self.options;
                    var element = self.element;
                    var image = self.image;
                    var container = void 0;
                    var cropper = void 0;
                    var canvas = void 0;
                    var dragBox = void 0;
                    var cropBox = void 0;
                    var face = void 0;

                    if (!self.loaded) {
                        return;
                    }

                    // Unbuild first when replace
                    if (self.ready) {
                        self.unbuild();
                    }

                    var template = $.createElement('div');
                    template.innerHTML = _template2.default;

                    // Create cropper elements
                    self.container = container = element.parentNode;
                    self.cropper = cropper = $.getByClass(template, 'cropper-container')[0];
                    self.canvas = canvas = $.getByClass(cropper, 'cropper-canvas')[0];
                    self.dragBox = dragBox = $.getByClass(cropper, 'cropper-drag-box')[0];
                    self.cropBox = cropBox = $.getByClass(cropper, 'cropper-crop-box')[0];
                    self.viewBox = $.getByClass(cropper, 'cropper-view-box')[0];
                    self.face = face = $.getByClass(cropBox, 'cropper-face')[0];

                    $.appendChild(canvas, image);

                    // Hide the original image
                    $.addClass(element, CLASS_HIDDEN);

                    // Inserts the cropper after to the current image
                    container.insertBefore(cropper, element.nextSibling);

                    // Show the image if is hidden
                    if (!self.isImg) {
                        $.removeClass(image, 'cropper-hide');
                    }

                    self.initPreview();
                    self.bind();

                    options.aspectRatio = Math.max(0, options.aspectRatio) || NaN;
                    options.viewMode = Math.max(0, Math.min(3, Math.round(options.viewMode))) || 0;

                    if (options.autoCrop) {
                        self.cropped = true;

                        if (options.modal) {
                            $.addClass(dragBox, 'cropper-modal');
                        }
                    } else {
                        $.addClass(cropBox, CLASS_HIDDEN);
                    }

                    if (!options.guides) {
                        $.addClass($.getByClass(cropBox, 'cropper-dashed'), CLASS_HIDDEN);
                    }

                    if (!options.center) {
                        $.addClass($.getByClass(cropBox, 'cropper-center'), CLASS_HIDDEN);
                    }

                    if (options.background) {
                        $.addClass(cropper, 'cropper-bg');
                    }

                    if (!options.highlight) {
                        $.addClass(face, 'cropper-invisible');
                    }

                    if (options.cropBoxMovable) {
                        $.addClass(face, 'cropper-move');
                        $.setData(face, 'action', 'all');
                    }

                    if (!options.cropBoxResizable) {
                        $.addClass($.getByClass(cropBox, 'cropper-line'), CLASS_HIDDEN);
                        $.addClass($.getByClass(cropBox, 'cropper-point'), CLASS_HIDDEN);
                    }

                    self.setDragMode(options.dragMode);
                    self.render();
                    self.ready = true;
                    self.setData(options.data);

                    // Call the "ready" option asynchronously to keep "image.cropper" is defined
                    self.completing = setTimeout(function () {
                        if ($.isFunction(options.ready)) {
                            $.addListener(element, EVENT_READY, options.ready, true);
                        }

                        $.dispatchEvent(element, EVENT_READY);
                        $.dispatchEvent(element, EVENT_CROP, self.getData());

                        self.complete = true;
                    }, 0);
                }
            }, {
                key: 'unbuild',
                value: function unbuild() {
                    var self = this;

                    if (!self.ready) {
                        return;
                    }

                    if (!self.complete) {
                        clearTimeout(self.completing);
                    }

                    self.ready = false;
                    self.complete = false;
                    self.initialImageData = null;

                    // Clear `initialCanvasData` is necessary when replace
                    self.initialCanvasData = null;
                    self.initialCropBoxData = null;
                    self.containerData = null;
                    self.canvasData = null;

                    // Clear `cropBoxData` is necessary when replace
                    self.cropBoxData = null;
                    self.unbind();

                    self.resetPreview();
                    self.previews = null;

                    self.viewBox = null;
                    self.cropBox = null;
                    self.dragBox = null;
                    self.canvas = null;
                    self.container = null;

                    $.removeChild(self.cropper);
                    self.cropper = null;
                }
            }], [{
                key: 'noConflict',
                value: function noConflict() {
                    window.Cropper = AnotherCropper;
                    return Cropper;
                }
            }, {
                key: 'setDefaults',
                value: function setDefaults(options) {
                    $.extend(_defaults2.default, $.isPlainObject(options) && options);
                }
            }]);

            return Cropper;
        }();

        $.extend(Cropper.prototype, _render2.default);
        $.extend(Cropper.prototype, _preview2.default);
        $.extend(Cropper.prototype, _events2.default);
        $.extend(Cropper.prototype, _handlers2.default);
        $.extend(Cropper.prototype, _change2.default);
        $.extend(Cropper.prototype, _methods2.default);

        if (typeof window !== 'undefined') {
            AnotherCropper = window.Cropper;
            window.Cropper = Cropper;
        }

        exports.default = Cropper;

        /***/
    },
    /* 1 */
    /***/ function (module, exports) {

        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = {
            // Define the view mode of the cropper
            viewMode: 0, // 0, 1, 2, 3

            // Define the dragging mode of the cropper
            dragMode: 'crop', // 'crop', 'move' or 'none'

            // Define the aspect ratio of the crop box
            aspectRatio: NaN,

            // An object with the previous cropping result data
            data: null,

            // A selector for adding extra containers to preview
            preview: '',

            // Re-render the cropper when resize the window
            responsive: true,

            // Restore the cropped area after resize the window
            restore: true,

            // Check if the current image is a cross-origin image
            checkCrossOrigin: true,

            // Check the current image's Exif Orientation information
            checkOrientation: true,

            // Show the black modal
            modal: true,

            // Show the dashed lines for guiding
            guides: true,

            // Show the center indicator for guiding
            center: true,

            // Show the white modal to highlight the crop box
            highlight: true,

            // Show the grid background
            background: true,

            // Enable to crop the image automatically when initialize
            autoCrop: true,

            // Define the percentage of automatic cropping area when initializes
            autoCropArea: 0.8,

            // Enable to move the image
            movable: true,

            // Enable to rotate the image
            rotatable: true,

            // Enable to scale the image
            scalable: true,

            // Enable to zoom the image
            zoomable: true,

            // Enable to zoom the image by dragging touch
            zoomOnTouch: true,

            // Enable to zoom the image by wheeling mouse
            zoomOnWheel: true,

            // Define zoom ratio when zoom the image by wheeling mouse
            wheelZoomRatio: 0.1,

            // Enable to move the crop box
            cropBoxMovable: true,

            // Enable to resize the crop box
            cropBoxResizable: true,

            // Toggle drag mode between "crop" and "move" when click twice on the cropper
            toggleDragModeOnDblclick: true,

            // Size limitation
            minCanvasWidth: 0,
            minCanvasHeight: 0,
            minCropBoxWidth: 0,
            minCropBoxHeight: 0,
            minContainerWidth: 200,
            minContainerHeight: 100,

            // Shortcuts of events
            ready: null,
            cropstart: null,
            cropmove: null,
            cropend: null,
            crop: null,
            zoom: null
        };

        /***/
    },
    /* 2 */
    /***/ function (module, exports) {

        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = '<div class="cropper-container">' + '<div class="cropper-wrap-box">' + '<div class="cropper-canvas"></div>' + '</div>' + '<div class="cropper-drag-box"></div>' + '<div class="cropper-crop-box">' + '<span class="cropper-view-box"></span>' + '<span class="cropper-dashed dashed-h"></span>' + '<span class="cropper-dashed dashed-v"></span>' + '<span class="cropper-center"></span>' + '<span class="cropper-face"></span>' + '<span class="cropper-line line-e" data-action="e"></span>' + '<span class="cropper-line line-n" data-action="n"></span>' + '<span class="cropper-line line-w" data-action="w"></span>' + '<span class="cropper-line line-s" data-action="s"></span>' + '<span class="cropper-point point-e" data-action="e"></span>' + '<span class="cropper-point point-n" data-action="n"></span>' + '<span class="cropper-point point-w" data-action="w"></span>' + '<span class="cropper-point point-s" data-action="s"></span>' + '<span class="cropper-point point-ne" data-action="ne"></span>' + '<span class="cropper-point point-nw" data-action="nw"></span>' + '<span class="cropper-point point-sw" data-action="sw"></span>' + '<span class="cropper-point point-se" data-action="se"></span>' + '</div>' + '</div>';

        /***/
    },
    /* 3 */
    /***/ function (module, exports, __webpack_require__) {

        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _utilities = __webpack_require__(4);

        var $ = _interopRequireWildcard(_utilities);

        function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

        exports.default = {
            render: function render() {
                var self = this;

                self.initContainer();
                self.initCanvas();
                self.initCropBox();

                self.renderCanvas();

                if (self.cropped) {
                    self.renderCropBox();
                }
            },
            initContainer: function initContainer() {
                var self = this;
                var options = self.options;
                var element = self.element;
                var container = self.container;
                var cropper = self.cropper;
                var containerData = void 0;

                $.addClass(cropper, 'cropper-hidden');
                $.removeClass(element, 'cropper-hidden');

                self.containerData = containerData = {
                    width: Math.max(container.offsetWidth, Number(options.minContainerWidth) || 200),
                    height: Math.max(container.offsetHeight, Number(options.minContainerHeight) || 100)
                };

                $.setStyle(cropper, {
                    width: containerData.width,
                    height: containerData.height
                });

                $.addClass(element, 'cropper-hidden');
                $.removeClass(cropper, 'cropper-hidden');
            },


            // Canvas (image wrapper)
            initCanvas: function initCanvas() {
                var self = this;
                var viewMode = self.options.viewMode;
                var containerData = self.containerData;
                var imageData = self.imageData;
                var rotated = Math.abs(imageData.rotate) === 90;
                var naturalWidth = rotated ? imageData.naturalHeight : imageData.naturalWidth;
                var naturalHeight = rotated ? imageData.naturalWidth : imageData.naturalHeight;
                var aspectRatio = naturalWidth / naturalHeight;
                var canvasWidth = containerData.width;
                var canvasHeight = containerData.height;

                if (containerData.height * aspectRatio > containerData.width) {
                    if (viewMode === 3) {
                        canvasWidth = containerData.height * aspectRatio;
                    } else {
                        canvasHeight = containerData.width / aspectRatio;
                    }
                } else if (viewMode === 3) {
                    canvasHeight = containerData.width / aspectRatio;
                } else {
                    canvasWidth = containerData.height * aspectRatio;
                }

                var canvasData = {
                    naturalWidth: naturalWidth,
                    naturalHeight: naturalHeight,
                    aspectRatio: aspectRatio,
                    width: canvasWidth,
                    height: canvasHeight
                };

                canvasData.oldLeft = canvasData.left = (containerData.width - canvasWidth) / 2;
                canvasData.oldTop = canvasData.top = (containerData.height - canvasHeight) / 2;

                self.canvasData = canvasData;
                self.limited = viewMode === 1 || viewMode === 2;
                self.limitCanvas(true, true);
                self.initialImageData = $.extend({}, imageData);
                self.initialCanvasData = $.extend({}, canvasData);
            },
            limitCanvas: function limitCanvas(sizeLimited, positionLimited) {
                var self = this;
                var options = self.options;
                var viewMode = options.viewMode;
                var containerData = self.containerData;
                var canvasData = self.canvasData;
                var aspectRatio = canvasData.aspectRatio;
                var cropBoxData = self.cropBoxData;
                var cropped = self.cropped && cropBoxData;
                var minCanvasWidth = void 0;
                var minCanvasHeight = void 0;
                var newCanvasLeft = void 0;
                var newCanvasTop = void 0;

                if (sizeLimited) {
                    minCanvasWidth = Number(options.minCanvasWidth) || 0;
                    minCanvasHeight = Number(options.minCanvasHeight) || 0;

                    if (viewMode > 1) {
                        minCanvasWidth = Math.max(minCanvasWidth, containerData.width);
                        minCanvasHeight = Math.max(minCanvasHeight, containerData.height);

                        if (viewMode === 3) {
                            if (minCanvasHeight * aspectRatio > minCanvasWidth) {
                                minCanvasWidth = minCanvasHeight * aspectRatio;
                            } else {
                                minCanvasHeight = minCanvasWidth / aspectRatio;
                            }
                        }
                    } else if (viewMode > 0) {
                        if (minCanvasWidth) {
                            minCanvasWidth = Math.max(minCanvasWidth, cropped ? cropBoxData.width : 0);
                        } else if (minCanvasHeight) {
                            minCanvasHeight = Math.max(minCanvasHeight, cropped ? cropBoxData.height : 0);
                        } else if (cropped) {
                            minCanvasWidth = cropBoxData.width;
                            minCanvasHeight = cropBoxData.height;

                            if (minCanvasHeight * aspectRatio > minCanvasWidth) {
                                minCanvasWidth = minCanvasHeight * aspectRatio;
                            } else {
                                minCanvasHeight = minCanvasWidth / aspectRatio;
                            }
                        }
                    }

                    if (minCanvasWidth && minCanvasHeight) {
                        if (minCanvasHeight * aspectRatio > minCanvasWidth) {
                            minCanvasHeight = minCanvasWidth / aspectRatio;
                        } else {
                            minCanvasWidth = minCanvasHeight * aspectRatio;
                        }
                    } else if (minCanvasWidth) {
                        minCanvasHeight = minCanvasWidth / aspectRatio;
                    } else if (minCanvasHeight) {
                        minCanvasWidth = minCanvasHeight * aspectRatio;
                    }

                    canvasData.minWidth = minCanvasWidth;
                    canvasData.minHeight = minCanvasHeight;
                    canvasData.maxWidth = Infinity;
                    canvasData.maxHeight = Infinity;
                }

                if (positionLimited) {
                    if (viewMode) {
                        newCanvasLeft = containerData.width - canvasData.width;
                        newCanvasTop = containerData.height - canvasData.height;

                        canvasData.minLeft = Math.min(0, newCanvasLeft);
                        canvasData.minTop = Math.min(0, newCanvasTop);
                        canvasData.maxLeft = Math.max(0, newCanvasLeft);
                        canvasData.maxTop = Math.max(0, newCanvasTop);

                        if (cropped && self.limited) {
                            canvasData.minLeft = Math.min(cropBoxData.left, cropBoxData.left + (cropBoxData.width - canvasData.width));
                            canvasData.minTop = Math.min(cropBoxData.top, cropBoxData.top + (cropBoxData.height - canvasData.height));
                            canvasData.maxLeft = cropBoxData.left;
                            canvasData.maxTop = cropBoxData.top;

                            if (viewMode === 2) {
                                if (canvasData.width >= containerData.width) {
                                    canvasData.minLeft = Math.min(0, newCanvasLeft);
                                    canvasData.maxLeft = Math.max(0, newCanvasLeft);
                                }

                                if (canvasData.height >= containerData.height) {
                                    canvasData.minTop = Math.min(0, newCanvasTop);
                                    canvasData.maxTop = Math.max(0, newCanvasTop);
                                }
                            }
                        }
                    } else {
                        canvasData.minLeft = -canvasData.width;
                        canvasData.minTop = -canvasData.height;
                        canvasData.maxLeft = containerData.width;
                        canvasData.maxTop = containerData.height;
                    }
                }
            },
            renderCanvas: function renderCanvas(changed) {
                var self = this;
                var canvasData = self.canvasData;
                var imageData = self.imageData;
                var rotate = imageData.rotate;
                var aspectRatio = void 0;
                var rotatedData = void 0;

                if (self.rotated) {
                    self.rotated = false;

                    // Computes rotated sizes with image sizes
                    rotatedData = $.getRotatedSizes({
                        width: imageData.width,
                        height: imageData.height,
                        degree: rotate
                    });

                    aspectRatio = rotatedData.width / rotatedData.height;

                    if (aspectRatio !== canvasData.aspectRatio) {
                        canvasData.left -= (rotatedData.width - canvasData.width) / 2;
                        canvasData.top -= (rotatedData.height - canvasData.height) / 2;
                        canvasData.width = rotatedData.width;
                        canvasData.height = rotatedData.height;
                        canvasData.aspectRatio = aspectRatio;
                        canvasData.naturalWidth = imageData.naturalWidth;
                        canvasData.naturalHeight = imageData.naturalHeight;

                        // Computes rotated sizes with natural image sizes
                        if (rotate % 180) {
                            rotatedData = $.getRotatedSizes({
                                width: imageData.naturalWidth,
                                height: imageData.naturalHeight,
                                degree: rotate
                            });

                            canvasData.naturalWidth = rotatedData.width;
                            canvasData.naturalHeight = rotatedData.height;
                        }

                        self.limitCanvas(true, false);
                    }
                }

                if (canvasData.width > canvasData.maxWidth || canvasData.width < canvasData.minWidth) {
                    canvasData.left = canvasData.oldLeft;
                }

                if (canvasData.height > canvasData.maxHeight || canvasData.height < canvasData.minHeight) {
                    canvasData.top = canvasData.oldTop;
                }

                canvasData.width = Math.min(Math.max(canvasData.width, canvasData.minWidth), canvasData.maxWidth);
                canvasData.height = Math.min(Math.max(canvasData.height, canvasData.minHeight), canvasData.maxHeight);

                self.limitCanvas(false, true);

                canvasData.oldLeft = canvasData.left = Math.min(Math.max(canvasData.left, canvasData.minLeft), canvasData.maxLeft);
                canvasData.oldTop = canvasData.top = Math.min(Math.max(canvasData.top, canvasData.minTop), canvasData.maxTop);

                $.setStyle(self.canvas, {
                    width: canvasData.width,
                    height: canvasData.height,
                    left: canvasData.left,
                    top: canvasData.top
                });

                self.renderImage();

                if (self.cropped && self.limited) {
                    self.limitCropBox(true, true);
                }

                if (changed) {
                    self.output();
                }
            },
            renderImage: function renderImage(changed) {
                var self = this;
                var canvasData = self.canvasData;
                var imageData = self.imageData;
                var newImageData = void 0;
                var reversedData = void 0;
                var reversedWidth = void 0;
                var reversedHeight = void 0;

                if (imageData.rotate) {
                    reversedData = $.getRotatedSizes({
                        width: canvasData.width,
                        height: canvasData.height,
                        degree: imageData.rotate,
                        aspectRatio: imageData.aspectRatio
                    }, true);

                    reversedWidth = reversedData.width;
                    reversedHeight = reversedData.height;

                    newImageData = {
                        width: reversedWidth,
                        height: reversedHeight,
                        left: (canvasData.width - reversedWidth) / 2,
                        top: (canvasData.height - reversedHeight) / 2
                    };
                }

                $.extend(imageData, newImageData || {
                    width: canvasData.width,
                    height: canvasData.height,
                    left: 0,
                    top: 0
                });

                var transform = $.getTransform(imageData);

                $.setStyle(self.image, {
                    width: imageData.width,
                    height: imageData.height,
                    marginLeft: imageData.left,
                    marginTop: imageData.top,
                    WebkitTransform: transform,
                    msTransform: transform,
                    transform: transform
                });

                if (changed) {
                    self.output();
                }
            },
            initCropBox: function initCropBox() {
                var self = this;
                var options = self.options;
                var aspectRatio = options.aspectRatio;
                var autoCropArea = Number(options.autoCropArea) || 0.8;
                var canvasData = self.canvasData;
                var cropBoxData = {
                    width: canvasData.width,
                    height: canvasData.height
                };

                if (aspectRatio) {
                    if (canvasData.height * aspectRatio > canvasData.width) {
                        cropBoxData.height = cropBoxData.width / aspectRatio;
                    } else {
                        cropBoxData.width = cropBoxData.height * aspectRatio;
                    }
                }

                self.cropBoxData = cropBoxData;
                self.limitCropBox(true, true);

                // Initialize auto crop area
                cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
                cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight);

                // The width/height of auto crop area must large than "minWidth/Height"
                cropBoxData.width = Math.max(cropBoxData.minWidth, cropBoxData.width * autoCropArea);
                cropBoxData.height = Math.max(cropBoxData.minHeight, cropBoxData.height * autoCropArea);
                cropBoxData.oldLeft = cropBoxData.left = canvasData.left + (canvasData.width - cropBoxData.width) / 2;
                cropBoxData.oldTop = cropBoxData.top = canvasData.top + (canvasData.height - cropBoxData.height) / 2;

                self.initialCropBoxData = $.extend({}, cropBoxData);
            },
            limitCropBox: function limitCropBox(sizeLimited, positionLimited) {
                var self = this;
                var options = self.options;
                var aspectRatio = options.aspectRatio;
                var containerData = self.containerData;
                var canvasData = self.canvasData;
                var cropBoxData = self.cropBoxData;
                var limited = self.limited;
                var minCropBoxWidth = void 0;
                var minCropBoxHeight = void 0;
                var maxCropBoxWidth = void 0;
                var maxCropBoxHeight = void 0;

                if (sizeLimited) {
                    minCropBoxWidth = Number(options.minCropBoxWidth) || 0;
                    minCropBoxHeight = Number(options.minCropBoxHeight) || 0;

                    // The min/maxCropBoxWidth/Height must be less than containerWidth/Height
                    minCropBoxWidth = Math.min(minCropBoxWidth, containerData.width);
                    minCropBoxHeight = Math.min(minCropBoxHeight, containerData.height);
                    maxCropBoxWidth = Math.min(containerData.width, limited ? canvasData.width : containerData.width);
                    maxCropBoxHeight = Math.min(containerData.height, limited ? canvasData.height : containerData.height);

                    if (aspectRatio) {
                        if (minCropBoxWidth && minCropBoxHeight) {
                            if (minCropBoxHeight * aspectRatio > minCropBoxWidth) {
                                minCropBoxHeight = minCropBoxWidth / aspectRatio;
                            } else {
                                minCropBoxWidth = minCropBoxHeight * aspectRatio;
                            }
                        } else if (minCropBoxWidth) {
                            minCropBoxHeight = minCropBoxWidth / aspectRatio;
                        } else if (minCropBoxHeight) {
                            minCropBoxWidth = minCropBoxHeight * aspectRatio;
                        }

                        if (maxCropBoxHeight * aspectRatio > maxCropBoxWidth) {
                            maxCropBoxHeight = maxCropBoxWidth / aspectRatio;
                        } else {
                            maxCropBoxWidth = maxCropBoxHeight * aspectRatio;
                        }
                    }

                    // The minWidth/Height must be less than maxWidth/Height
                    cropBoxData.minWidth = Math.min(minCropBoxWidth, maxCropBoxWidth);
                    cropBoxData.minHeight = Math.min(minCropBoxHeight, maxCropBoxHeight);
                    cropBoxData.maxWidth = maxCropBoxWidth;
                    cropBoxData.maxHeight = maxCropBoxHeight;
                }

                if (positionLimited) {
                    if (limited) {
                        cropBoxData.minLeft = Math.max(0, canvasData.left);
                        cropBoxData.minTop = Math.max(0, canvasData.top);
                        cropBoxData.maxLeft = Math.min(containerData.width, canvasData.left + canvasData.width) - cropBoxData.width;
                        cropBoxData.maxTop = Math.min(containerData.height, canvasData.top + canvasData.height) - cropBoxData.height;
                    } else {
                        cropBoxData.minLeft = 0;
                        cropBoxData.minTop = 0;
                        cropBoxData.maxLeft = containerData.width - cropBoxData.width;
                        cropBoxData.maxTop = containerData.height - cropBoxData.height;
                    }
                }
            },
            renderCropBox: function renderCropBox() {
                var self = this;
                var options = self.options;
                var containerData = self.containerData;
                var cropBoxData = self.cropBoxData;

                if (cropBoxData.width > cropBoxData.maxWidth || cropBoxData.width < cropBoxData.minWidth) {
                    cropBoxData.left = cropBoxData.oldLeft;
                }

                if (cropBoxData.height > cropBoxData.maxHeight || cropBoxData.height < cropBoxData.minHeight) {
                    cropBoxData.top = cropBoxData.oldTop;
                }

                cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
                cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight);

                self.limitCropBox(false, true);

                cropBoxData.oldLeft = cropBoxData.left = Math.min(Math.max(cropBoxData.left, cropBoxData.minLeft), cropBoxData.maxLeft);
                cropBoxData.oldTop = cropBoxData.top = Math.min(Math.max(cropBoxData.top, cropBoxData.minTop), cropBoxData.maxTop);

                if (options.movable && options.cropBoxMovable) {
                    // Turn to move the canvas when the crop box is equal to the container
                    $.setData(self.face, 'action', cropBoxData.width === containerData.width && cropBoxData.height === containerData.height ? 'move' : 'all');
                }

                $.setStyle(self.cropBox, {
                    width: cropBoxData.width,
                    height: cropBoxData.height,
                    left: cropBoxData.left,
                    top: cropBoxData.top
                });

                if (self.cropped && self.limited) {
                    self.limitCanvas(true, true);
                }

                if (!self.disabled) {
                    self.output();
                }
            },
            output: function output() {
                var self = this;

                self.preview();

                if (self.complete) {
                    $.dispatchEvent(self.element, 'crop', self.getData());
                }
            }
        };

        /***/
    },
    /* 4 */
    /***/ function (module, exports) {

        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

        exports.typeOf = typeOf;
        exports.isNumber = isNumber;
        exports.isUndefined = isUndefined;
        exports.isObject = isObject;
        exports.isPlainObject = isPlainObject;
        exports.isFunction = isFunction;
        exports.isArray = isArray;
        exports.toArray = toArray;
        exports.trim = trim;
        exports.each = each;
        exports.extend = extend;
        exports.proxy = proxy;
        exports.setStyle = setStyle;
        exports.hasClass = hasClass;
        exports.addClass = addClass;
        exports.removeClass = removeClass;
        exports.toggleClass = toggleClass;
        exports.hyphenate = hyphenate;
        exports.getData = getData;
        exports.setData = setData;
        exports.removeData = removeData;
        exports.removeListener = removeListener;
        exports.dispatchEvent = dispatchEvent;
        exports.getEvent = getEvent;
        exports.getOffset = getOffset;
        exports.getTouchesCenter = getTouchesCenter;
        exports.getByTag = getByTag;
        exports.getByClass = getByClass;
        exports.createElement = createElement;
        exports.appendChild = appendChild;
        exports.removeChild = removeChild;
        exports.empty = empty;
        exports.isCrossOriginURL = isCrossOriginURL;
        exports.addTimestamp = addTimestamp;
        exports.getImageSize = getImageSize;
        exports.getTransform = getTransform;
        exports.getRotatedSizes = getRotatedSizes;
        exports.getSourceCanvas = getSourceCanvas;
        exports.getStringFromCharCode = getStringFromCharCode;
        exports.getOrientation = getOrientation;
        exports.dataURLToArrayBuffer = dataURLToArrayBuffer;
        exports.arrayBufferToDataURL = arrayBufferToDataURL;
        // RegExps
        var REGEXP_DATA_URL_HEAD = /^data:([^;]+);base64,/;
        var REGEXP_HYPHENATE = /([a-z\d])([A-Z])/g;
        var REGEXP_ORIGINS = /^(https?:)\/\/([^:\/\?#]+):?(\d*)/i;
        var REGEXP_SPACES = /\s+/;
        var REGEXP_SUFFIX = /^(width|height|left|top|marginLeft|marginTop)$/;
        var REGEXP_TRIM = /^\s+(.*)\s+$/;
        var REGEXP_USERAGENT = /(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i;
        var navigator = window.navigator;
        var IS_SAFARI_OR_UIWEBVIEW = navigator && REGEXP_USERAGENT.test(navigator.userAgent);

        // Utilities
        var objectProto = Object.prototype;
        var toString = objectProto.toString;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var slice = Array.prototype.slice;
        var fromCharCode = String.fromCharCode;

        function typeOf(obj) {
            return toString.call(obj).slice(8, -1).toLowerCase();
        }

        function isNumber(num) {
            return typeof num === 'number' && !isNaN(num);
        }

        function isUndefined(obj) {
            return typeof obj === 'undefined';
        }

        function isObject(obj) {
            return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null;
        }

        function isPlainObject(obj) {
            if (!isObject(obj)) {
                return false;
            }

            try {
                var _constructor = obj.constructor;
                var prototype = _constructor.prototype;

                return _constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
            } catch (e) {
                return false;
            }
        }

        function isFunction(fn) {
            return typeOf(fn) === 'function';
        }

        function isArray(arr) {
            return Array.isArray ? Array.isArray(arr) : typeOf(arr) === 'array';
        }

        function toArray(obj, offset) {
            offset = offset >= 0 ? offset : 0;

            if (Array.from) {
                return Array.from(obj).slice(offset);
            }

            return slice.call(obj, offset);
        }

        function trim(str) {
            if (typeof str === 'string') {
                str = str.trim ? str.trim() : str.replace(REGEXP_TRIM, '$1');
            }

            return str;
        }

        function each(obj, callback) {
            if (obj && isFunction(callback)) {
                var i = void 0;

                if (isArray(obj) || isNumber(obj.length) /* array-like */) {
                    var length = obj.length;

                    for (i = 0; i < length; i++) {
                        if (callback.call(obj, obj[i], i, obj) === false) {
                            break;
                        }
                    }
                } else if (isObject(obj)) {
                    Object.keys(obj).forEach(function (key) {
                        callback.call(obj, obj[key], key, obj);
                    });
                }
            }

            return obj;
        }

        function extend() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var deep = args[0] === true;
            var data = deep ? args[1] : args[0];

            if (args.length > 1) {
                // if (Object.assign) {
                //   return Object.assign.apply(Object, args);
                // }

                args.shift();

                args.forEach(function (arg) {
                    if (isObject(arg)) {
                        Object.keys(arg).forEach(function (key) {
                            if (deep && isObject(data[key])) {
                                extend(true, data[key], arg[key]);
                            } else {
                                data[key] = arg[key];
                            }
                        });
                    }
                });
            }

            return data;
        }

        function proxy(fn, context) {
            for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
                args[_key2 - 2] = arguments[_key2];
            }

            return function () {
                for (var _len3 = arguments.length, args2 = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                    args2[_key3] = arguments[_key3];
                }

                return fn.apply(context, args.concat(args2));
            };
        }

        function setStyle(element, styles) {
            var style = element.style;

            each(styles, function (value, property) {
                if (REGEXP_SUFFIX.test(property) && isNumber(value)) {
                    value += 'px';
                }

                style[property] = value;
            });
        }

        function hasClass(element, value) {
            return element.classList ? element.classList.contains(value) : element.className.indexOf(value) > -1;
        }

        function addClass(element, value) {
            if (isNumber(element.length)) {
                each(element, function (elem) {
                    addClass(elem, value);
                });
                return;
            }

            if (element.classList) {
                element.classList.add(value);
                return;
            }

            var className = trim(element.className);

            if (!className) {
                element.className = value;
            } else if (className.indexOf(value) < 0) {
                element.className = className + ' ' + value;
            }
        }

        function removeClass(element, value) {
            if (isNumber(element.length)) {
                each(element, function (elem) {
                    removeClass(elem, value);
                });
                return;
            }

            if (element.classList) {
                element.classList.remove(value);
                return;
            }

            if (element.className.indexOf(value) >= 0) {
                element.className = element.className.replace(value, '');
            }
        }

        function toggleClass(element, value, added) {
            if (isNumber(element.length)) {
                each(element, function (elem) {
                    toggleClass(elem, value, added);
                });
                return;
            }

            // IE10-11 doesn't support the second parameter of `classList.toggle`
            if (added) {
                addClass(element, value);
            } else {
                removeClass(element, value);
            }
        }

        function hyphenate(str) {
            return str.replace(REGEXP_HYPHENATE, '$1-$2').toLowerCase();
        }

        function getData(element, name) {
            if (isObject(element[name])) {
                return element[name];
            } else if (element.dataset) {
                return element.dataset[name];
            }

            return element.getAttribute('data-' + hyphenate(name));
        }

        function setData(element, name, data) {
            if (isObject(data)) {
                element[name] = data;
            } else if (element.dataset) {
                element.dataset[name] = data;
            } else {
                element.setAttribute('data-' + hyphenate(name), data);
            }
        }

        function removeData(element, name) {
            if (isObject(element[name])) {
                delete element[name];
            } else if (element.dataset) {
                delete element.dataset[name];
            } else {
                element.removeAttribute('data-' + hyphenate(name));
            }
        }

        function removeListener(element, type, handler) {
            var types = trim(type).split(REGEXP_SPACES);

            if (types.length > 1) {
                each(types, function (t) {
                    removeListener(element, t, handler);
                });
                return;
            }

            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent) {
                element.detachEvent('on' + type, handler);
            }
        }

        function addListener(element, type, _handler, once) {
            var types = trim(type).split(REGEXP_SPACES);
            var originalHandler = _handler;

            if (types.length > 1) {
                each(types, function (t) {
                    addListener(element, t, _handler);
                });
                return;
            }

            if (once) {
                _handler = function handler() {
                    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                        args[_key4] = arguments[_key4];
                    }

                    removeListener(element, type, _handler);

                    return originalHandler.apply(element, args);
                };
            }

            if (element.addEventListener) {
                element.addEventListener(type, _handler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on${type}', _handler);
            }
        }

        exports.addListener = addListener;
        function dispatchEvent(element, type, data) {
            if (element.dispatchEvent) {
                var event = void 0;

                // Event and CustomEvent on IE9-11 are global objects, not constructors
                if (isFunction(Event) && isFunction(CustomEvent)) {
                    if (isUndefined(data)) {
                        event = new Event(type, {
                            bubbles: true,
                            cancelable: true
                        });
                    } else {
                        event = new CustomEvent(type, {
                            detail: data,
                            bubbles: true,
                            cancelable: true
                        });
                    }
                } else if (isUndefined(data)) {
                    event = document.createEvent('Event');
                    event.initEvent(type, true, true);
                } else {
                    event = document.createEvent('CustomEvent');
                    event.initCustomEvent(type, true, true, data);
                }

                // IE9+
                return element.dispatchEvent(event);
            } else if (element.fireEvent) {
                // IE6-10 (native events only)
                return element.fireEvent('on' + type);
            }

            return true;
        }

        function getEvent(event) {
            var e = event || window.event;

            // Fix target property (IE8)
            if (!e.target) {
                e.target = e.srcElement || document;
            }

            if (!isNumber(e.pageX) && isNumber(e.clientX)) {
                var eventDoc = event.target.ownerDocument || document;
                var doc = eventDoc.documentElement;
                var body = eventDoc.body;

                e.pageX = e.clientX + ((doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0));
                e.pageY = e.clientY + ((doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0));
            }

            return e;
        }

        function getOffset(element) {
            var doc = document.documentElement;
            var box = element.getBoundingClientRect();

            return {
                left: box.left + ((window.scrollX || doc && doc.scrollLeft || 0) - (doc && doc.clientLeft || 0)),
                top: box.top + ((window.scrollY || doc && doc.scrollTop || 0) - (doc && doc.clientTop || 0))
            };
        }

        function getTouchesCenter(touches) {
            var length = touches.length;
            var pageX = 0;
            var pageY = 0;

            if (length) {
                each(touches, function (touch) {
                    pageX += touch.pageX;
                    pageY += touch.pageY;
                });

                pageX /= length;
                pageY /= length;
            }

            return {
                pageX: pageX,
                pageY: pageY
            };
        }

        function getByTag(element, tagName) {
            return element.getElementsByTagName(tagName);
        }

        function getByClass(element, className) {
            return element.getElementsByClassName ? element.getElementsByClassName(className) : element.querySelectorAll('.' + className);
        }

        function createElement(tagName) {
            return document.createElement(tagName);
        }

        function appendChild(element, elem) {
            element.appendChild(elem);
        }

        function removeChild(element) {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }

        function empty(element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }

        function isCrossOriginURL(url) {
            var parts = url.match(REGEXP_ORIGINS);

            return parts && (parts[1] !== location.protocol || parts[2] !== location.hostname || parts[3] !== location.port);
        }

        function addTimestamp(url) {
            var timestamp = 'timestamp=' + new Date().getTime();

            return url + (url.indexOf('?') === -1 ? '?' : '&') + timestamp;
        }

        function getImageSize(image, callback) {
            // Modern browsers (ignore Safari)
            if (image.naturalWidth && !IS_SAFARI_OR_UIWEBVIEW) {
                callback(image.naturalWidth, image.naturalHeight);
                return;
            }

            // IE8: Don't use `new Image()` here
            var newImage = createElement('img');

            newImage.onload = function load() {
                callback(this.width, this.height);
            };

            newImage.src = image.src;
        }

        function getTransform(data) {
            var transforms = [];
            var rotate = data.rotate;
            var scaleX = data.scaleX;
            var scaleY = data.scaleY;

            // Rotate should come first before scale to match orientation transform
            if (isNumber(rotate) && rotate !== 0) {
                transforms.push('rotate(' + rotate + 'deg)');
            }

            if (isNumber(scaleX) && scaleX !== 1) {
                transforms.push('scaleX(' + scaleX + ')');
            }

            if (isNumber(scaleY) && scaleY !== 1) {
                transforms.push('scaleY(' + scaleY + ')');
            }

            return transforms.length ? transforms.join(' ') : 'none';
        }

        function getRotatedSizes(data, reversed) {
            var deg = Math.abs(data.degree) % 180;
            var arc = (deg > 90 ? 180 - deg : deg) * Math.PI / 180;
            var sinArc = Math.sin(arc);
            var cosArc = Math.cos(arc);
            var width = data.width;
            var height = data.height;
            var aspectRatio = data.aspectRatio;
            var newWidth = void 0;
            var newHeight = void 0;

            if (!reversed) {
                newWidth = width * cosArc + height * sinArc;
                newHeight = width * sinArc + height * cosArc;
            } else {
                newWidth = width / (cosArc + sinArc / aspectRatio);
                newHeight = newWidth / aspectRatio;
            }

            return {
                width: newWidth,
                height: newHeight
            };
        }

        function getSourceCanvas(image, data) {
            var canvas = createElement('canvas');
            var context = canvas.getContext('2d');
            var dstX = 0;
            var dstY = 0;
            var dstWidth = data.naturalWidth;
            var dstHeight = data.naturalHeight;
            var rotate = data.rotate;
            var scaleX = data.scaleX;
            var scaleY = data.scaleY;
            var scalable = isNumber(scaleX) && isNumber(scaleY) && (scaleX !== 1 || scaleY !== 1);
            var rotatable = isNumber(rotate) && rotate !== 0;
            var advanced = rotatable || scalable;
            var canvasWidth = dstWidth * Math.abs(scaleX || 1);
            var canvasHeight = dstHeight * Math.abs(scaleY || 1);
            var translateX = void 0;
            var translateY = void 0;
            var rotated = void 0;

            if (scalable) {
                translateX = canvasWidth / 2;
                translateY = canvasHeight / 2;
            }

            if (rotatable) {
                rotated = getRotatedSizes({
                    width: canvasWidth,
                    height: canvasHeight,
                    degree: rotate
                });

                canvasWidth = rotated.width;
                canvasHeight = rotated.height;
                translateX = canvasWidth / 2;
                translateY = canvasHeight / 2;
            }

            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            if (advanced) {
                dstX = -dstWidth / 2;
                dstY = -dstHeight / 2;

                context.save();
                context.translate(translateX, translateY);
            }

            // Rotate should come first before scale as in the "getTransform" function
            if (rotatable) {
                context.rotate(rotate * Math.PI / 180);
            }

            if (scalable) {
                context.scale(scaleX, scaleY);
            }

            context.drawImage(image, Math.floor(dstX), Math.floor(dstY), Math.floor(dstWidth), Math.floor(dstHeight));

            if (advanced) {
                context.restore();
            }

            return canvas;
        }

        function getStringFromCharCode(dataView, start, length) {
            var str = '';
            var i = start;

            for (length += start; i < length; i++) {
                str += fromCharCode(dataView.getUint8(i));
            }

            return str;
        }

        function getOrientation(arrayBuffer) {
            var dataView = new DataView(arrayBuffer);
            var length = dataView.byteLength;
            var orientation = void 0;
            var exifIDCode = void 0;
            var tiffOffset = void 0;
            var firstIFDOffset = void 0;
            var littleEndian = void 0;
            var endianness = void 0;
            var app1Start = void 0;
            var ifdStart = void 0;
            var offset = void 0;
            var i = void 0;

            // Only handle JPEG image (start by 0xFFD8)
            if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
                offset = 2;

                while (offset < length) {
                    if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
                        app1Start = offset;
                        break;
                    }

                    offset++;
                }
            }

            if (app1Start) {
                exifIDCode = app1Start + 4;
                tiffOffset = app1Start + 10;

                if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
                    endianness = dataView.getUint16(tiffOffset);
                    littleEndian = endianness === 0x4949;

                    if (littleEndian || endianness === 0x4D4D /* bigEndian */) {
                        if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
                            firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);

                            if (firstIFDOffset >= 0x00000008) {
                                ifdStart = tiffOffset + firstIFDOffset;
                            }
                        }
                    }
                }
            }

            if (ifdStart) {
                length = dataView.getUint16(ifdStart, littleEndian);

                for (i = 0; i < length; i++) {
                    offset = ifdStart + i * 12 + 2;

                    if (dataView.getUint16(offset, littleEndian) === 0x0112 /* Orientation */) {
                        // 8 is the offset of the current tag's value
                        offset += 8;

                        // Get the original orientation value
                        orientation = dataView.getUint16(offset, littleEndian);

                        // Override the orientation with its default value for Safari
                        if (IS_SAFARI_OR_UIWEBVIEW) {
                            dataView.setUint16(offset, 1, littleEndian);
                        }

                        break;
                    }
                }
            }

            return orientation;
        }

        function dataURLToArrayBuffer(dataURL) {
            var base64 = dataURL.replace(REGEXP_DATA_URL_HEAD, '');
            var binary = atob(base64);
            var length = binary.length;
            var arrayBuffer = new ArrayBuffer(length);
            var dataView = new Uint8Array(arrayBuffer);
            var i = void 0;

            for (i = 0; i < length; i++) {
                dataView[i] = binary.charCodeAt(i);
            }

            return arrayBuffer;
        }

        // Only available for JPEG image
        function arrayBufferToDataURL(arrayBuffer) {
            var dataView = new Uint8Array(arrayBuffer);
            var length = dataView.length;
            var base64 = '';
            var i = void 0;

            for (i = 0; i < length; i++) {
                base64 += fromCharCode(dataView[i]);
            }

            return 'data:image/jpeg;base64,' + btoa(base64);
        }

        /***/
    },
    /* 5 */
    /***/ function (module, exports, __webpack_require__) {

        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _utilities = __webpack_require__(4);

        var $ = _interopRequireWildcard(_utilities);

        function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

        var DATA_PREVIEW = 'preview';

        exports.default = {
            initPreview: function initPreview() {
                var self = this;
                var preview = self.options.preview;
                var image = $.createElement('img');
                var crossOrigin = self.crossOrigin;
                var url = crossOrigin ? self.crossOriginUrl : self.url;

                if (crossOrigin) {
                    image.crossOrigin = crossOrigin;
                }

                image.src = url;
                $.appendChild(self.viewBox, image);
                self.image2 = image;

                if (!preview) {
                    return;
                }

                var previews = document.querySelectorAll(preview);

                self.previews = previews;

                $.each(previews, function (element) {
                    var img = $.createElement('img');

                    // Save the original size for recover
                    $.setData(element, DATA_PREVIEW, {
                        width: element.offsetWidth,
                        height: element.offsetHeight,
                        html: element.innerHTML
                    });

                    if (crossOrigin) {
                        img.crossOrigin = crossOrigin;
                    }

                    img.src = url;

                    /**
                     * Override img element styles
                     * Add `display:block` to avoid margin top issue
                     * Add `height:auto` to override `height` attribute on IE8
                     * (Occur only when margin-top <= -height)
                     */

                    img.style.cssText = 'display:block;' + 'width:100%;' + 'height:auto;' + 'min-width:0!important;' + 'min-height:0!important;' + 'max-width:none!important;' + 'max-height:none!important;' + 'image-orientation:0deg!important;"';

                    $.empty(element);
                    $.appendChild(element, img);
                });
            },
            resetPreview: function resetPreview() {
                $.each(this.previews, function (element) {
                    var data = $.getData(element, DATA_PREVIEW);

                    $.setStyle(element, {
                        width: data.width,
                        height: data.height
                    });

                    element.innerHTML = data.html;
                    $.removeData(element, DATA_PREVIEW);
                });
            },
            preview: function preview() {
                var self = this;
                var imageData = self.imageData;
                var canvasData = self.canvasData;
                var cropBoxData = self.cropBoxData;
                var cropBoxWidth = cropBoxData.width;
                var cropBoxHeight = cropBoxData.height;
                var width = imageData.width;
                var height = imageData.height;
                var left = cropBoxData.left - canvasData.left - imageData.left;
                var top = cropBoxData.top - canvasData.top - imageData.top;
                var transform = $.getTransform(imageData);
                var transforms = {
                    WebkitTransform: transform,
                    msTransform: transform,
                    transform: transform
                };

                if (!self.cropped || self.disabled) {
                    return;
                }

                $.setStyle(self.image2, $.extend({
                    width: width,
                    height: height,
                    marginLeft: -left,
                    marginTop: -top
                }, transforms));

                $.each(self.previews, function (element) {
                    var data = $.getData(element, DATA_PREVIEW);
                    var originalWidth = data.width;
                    var originalHeight = data.height;
                    var newWidth = originalWidth;
                    var newHeight = originalHeight;
                    var ratio = 1;

                    if (cropBoxWidth) {
                        ratio = originalWidth / cropBoxWidth;
                        newHeight = cropBoxHeight * ratio;
                    }

                    if (cropBoxHeight && newHeight > originalHeight) {
                        ratio = originalHeight / cropBoxHeight;
                        newWidth = cropBoxWidth * ratio;
                        newHeight = originalHeight;
                    }

                    $.setStyle(element, {
                        width: newWidth,
                        height: newHeight
                    });

                    $.setStyle($.getByTag(element, 'img')[0], $.extend({
                        width: width * ratio,
                        height: height * ratio,
                        marginLeft: -left * ratio,
                        marginTop: -top * ratio
                    }, transforms));
                });
            }
        };

        /***/
    },
    /* 6 */
    /***/ function (module, exports, __webpack_require__) {

        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _utilities = __webpack_require__(4);

        var $ = _interopRequireWildcard(_utilities);

        function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

        // Events
        var EVENT_MOUSE_DOWN = 'mousedown touchstart pointerdown MSPointerDown';
        var EVENT_MOUSE_MOVE = 'mousemove touchmove pointermove MSPointerMove';
        var EVENT_MOUSE_UP = 'mouseup touchend touchcancel pointerup pointercancel' + ' MSPointerUp MSPointerCancel';
        var EVENT_WHEEL = 'wheel mousewheel DOMMouseScroll';
        var EVENT_DBLCLICK = 'dblclick';
        var EVENT_RESIZE = 'resize';
        var EVENT_CROP_START = 'cropstart';
        var EVENT_CROP_MOVE = 'cropmove';
        var EVENT_CROP_END = 'cropend';
        var EVENT_CROP = 'crop';
        var EVENT_ZOOM = 'zoom';

        exports.default = {
            bind: function bind() {
                var self = this;
                var options = self.options;
                var element = self.element;
                var cropper = self.cropper;

                if ($.isFunction(options.cropstart)) {
                    $.addListener(element, EVENT_CROP_START, options.cropstart);
                }

                if ($.isFunction(options.cropmove)) {
                    $.addListener(element, EVENT_CROP_MOVE, options.cropmove);
                }

                if ($.isFunction(options.cropend)) {
                    $.addListener(element, EVENT_CROP_END, options.cropend);
                }

                if ($.isFunction(options.crop)) {
                    $.addListener(element, EVENT_CROP, options.crop);
                }

                if ($.isFunction(options.zoom)) {
                    $.addListener(element, EVENT_ZOOM, options.zoom);
                }

                $.addListener(cropper, EVENT_MOUSE_DOWN, self.onCropStart = $.proxy(self.cropStart, self));

                if (options.zoomable && options.zoomOnWheel) {
                    $.addListener(cropper, EVENT_WHEEL, self.onWheel = $.proxy(self.wheel, self));
                }

                if (options.toggleDragModeOnDblclick) {
                    $.addListener(cropper, EVENT_DBLCLICK, self.onDblclick = $.proxy(self.dblclick, self));
                }

                $.addListener(document, EVENT_MOUSE_MOVE, self.onCropMove = $.proxy(self.cropMove, self));
                $.addListener(document, EVENT_MOUSE_UP, self.onCropEnd = $.proxy(self.cropEnd, self));

                if (options.responsive) {
                    $.addListener(window, EVENT_RESIZE, self.onResize = $.proxy(self.resize, self));
                }
            },
            unbind: function unbind() {
                var self = this;
                var options = self.options;
                var element = self.element;
                var cropper = self.cropper;

                if ($.isFunction(options.cropstart)) {
                    $.removeListener(element, EVENT_CROP_START, options.cropstart);
                }

                if ($.isFunction(options.cropmove)) {
                    $.removeListener(element, EVENT_CROP_MOVE, options.cropmove);
                }

                if ($.isFunction(options.cropend)) {
                    $.removeListener(element, EVENT_CROP_END, options.cropend);
                }

                if ($.isFunction(options.crop)) {
                    $.removeListener(element, EVENT_CROP, options.crop);
                }

                if ($.isFunction(options.zoom)) {
                    $.removeListener(element, EVENT_ZOOM, options.zoom);
                }

                $.removeListener(cropper, EVENT_MOUSE_DOWN, self.onCropStart);

                if (options.zoomable && options.zoomOnWheel) {
                    $.removeListener(cropper, EVENT_WHEEL, self.onWheel);
                }

                if (options.toggleDragModeOnDblclick) {
                    $.removeListener(cropper, EVENT_DBLCLICK, self.onDblclick);
                }

                $.removeListener(document, EVENT_MOUSE_MOVE, self.onCropMove);
                $.removeListener(document, EVENT_MOUSE_UP, self.onCropEnd);

                if (options.responsive) {
                    $.removeListener(window, EVENT_RESIZE, self.onResize);
                }
            }
        };

        /***/
    },
    /* 7 */
    /***/ function (module, exports, __webpack_require__) {

        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.REGEXP_ACTIONS = undefined;

        var _utilities = __webpack_require__(4);

        var $ = _interopRequireWildcard(_utilities);

        function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

        var REGEXP_ACTIONS = exports.REGEXP_ACTIONS = /^(e|w|s|n|se|sw|ne|nw|all|crop|move|zoom)$/;

        exports.default = {
            resize: function resize() {
                var self = this;
                var restore = self.options.restore;
                var container = self.container;
                var containerData = self.containerData;

                // Check `container` is necessary for IE8
                if (self.disabled || !containerData) {
                    return;
                }

                var ratio = container.offsetWidth / containerData.width;
                var canvasData = void 0;
                var cropBoxData = void 0;

                // Resize when width changed or height changed
                if (ratio !== 1 || container.offsetHeight !== containerData.height) {
                    if (restore) {
                        canvasData = self.getCanvasData();
                        cropBoxData = self.getCropBoxData();
                    }

                    self.render();

                    if (restore) {
                        self.setCanvasData($.each(canvasData, function (n, i) {
                            canvasData[i] = n * ratio;
                        }));
                        self.setCropBoxData($.each(cropBoxData, function (n, i) {
                            cropBoxData[i] = n * ratio;
                        }));
                    }
                }
            },
            dblclick: function dblclick() {
                var self = this;

                if (self.disabled) {
                    return;
                }

                self.setDragMode($.hasClass(self.dragBox, 'cropper-crop') ? 'move' : 'crop');
            },
            wheel: function wheel(event) {
                var self = this;
                var e = $.getEvent(event);
                var ratio = Number(self.options.wheelZoomRatio) || 0.1;
                var delta = 1;

                if (self.disabled) {
                    return;
                }

                e.preventDefault();

                // Limit wheel speed to prevent zoom too fast (#21)
                if (self.wheeling) {
                    return;
                }

                self.wheeling = true;

                setTimeout(function () {
                    self.wheeling = false;
                }, 50);

                if (e.deltaY) {
                    delta = e.deltaY > 0 ? 1 : -1;
                } else if (e.wheelDelta) {
                    delta = -e.wheelDelta / 120;
                } else if (e.detail) {
                    delta = e.detail > 0 ? 1 : -1;
                }

                self.zoom(-delta * ratio, e);
            },
            cropStart: function cropStart(event) {
                var self = this;
                var options = self.options;
                var e = $.getEvent(event);
                var touches = e.touches;
                var touchesLength = void 0;
                var touch = void 0;
                var action = void 0;

                if (self.disabled) {
                    return;
                }

                if (touches) {
                    touchesLength = touches.length;

                    if (touchesLength > 1) {
                        if (options.zoomable && options.zoomOnTouch && touchesLength === 2) {
                            touch = touches[1];
                            self.startX2 = touch.pageX;
                            self.startY2 = touch.pageY;
                            action = 'zoom';
                        } else {
                            return;
                        }
                    }

                    touch = touches[0];
                }

                action = action || $.getData(e.target, 'action');

                if (REGEXP_ACTIONS.test(action)) {
                    if ($.dispatchEvent(self.element, 'cropstart', {
                        originalEvent: e,
                        action: action
                    }) === false) {
                        return;
                    }

                    e.preventDefault();

                    self.action = action;
                    self.cropping = false;

                    self.startX = touch ? touch.pageX : e.pageX;
                    self.startY = touch ? touch.pageY : e.pageY;

                    if (action === 'crop') {
                        self.cropping = true;
                        $.addClass(self.dragBox, 'cropper-modal');
                    }
                }
            },
            cropMove: function cropMove(event) {
                var self = this;
                var options = self.options;
                var e = $.getEvent(event);
                var touches = e.touches;
                var action = self.action;
                var touchesLength = void 0;
                var touch = void 0;

                if (self.disabled) {
                    return;
                }

                if (touches) {
                    touchesLength = touches.length;

                    if (touchesLength > 1) {
                        if (options.zoomable && options.zoomOnTouch && touchesLength === 2) {
                            touch = touches[1];
                            self.endX2 = touch.pageX;
                            self.endY2 = touch.pageY;
                        } else {
                            return;
                        }
                    }

                    touch = touches[0];
                }

                if (action) {
                    if ($.dispatchEvent(self.element, 'cropmove', {
                        originalEvent: e,
                        action: action
                    }) === false) {
                        return;
                    }

                    e.preventDefault();

                    self.endX = touch ? touch.pageX : e.pageX;
                    self.endY = touch ? touch.pageY : e.pageY;

                    self.change(e.shiftKey, action === 'zoom' ? e : null);
                }
            },
            cropEnd: function cropEnd(event) {
                var self = this;
                var options = self.options;
                var e = $.getEvent(event);
                var action = self.action;

                if (self.disabled) {
                    return;
                }

                if (action) {
                    e.preventDefault();

                    if (self.cropping) {
                        self.cropping = false;
                        $.toggleClass(self.dragBox, 'cropper-modal', self.cropped && options.modal);
                    }

                    self.action = '';

                    $.dispatchEvent(self.element, 'cropend', {
                        originalEvent: e,
                        action: action
                    });
                }
            }
        };

        /***/
    },
    /* 8 */
    /***/ function (module, exports, __webpack_require__) {

        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _utilities = __webpack_require__(4);

        var $ = _interopRequireWildcard(_utilities);

        function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

        // Actions
        var ACTION_EAST = 'e';
        var ACTION_WEST = 'w';
        var ACTION_SOUTH = 's';
        var ACTION_NORTH = 'n';
        var ACTION_SOUTH_EAST = 'se';
        var ACTION_SOUTH_WEST = 'sw';
        var ACTION_NORTH_EAST = 'ne';
        var ACTION_NORTH_WEST = 'nw';

        exports.default = {
            change: function change(shiftKey, originalEvent) {
                var self = this;
                var options = self.options;
                var containerData = self.containerData;
                var canvasData = self.canvasData;
                var cropBoxData = self.cropBoxData;
                var aspectRatio = options.aspectRatio;
                var action = self.action;
                var width = cropBoxData.width;
                var height = cropBoxData.height;
                var left = cropBoxData.left;
                var top = cropBoxData.top;
                var right = left + width;
                var bottom = top + height;
                var minLeft = 0;
                var minTop = 0;
                var maxWidth = containerData.width;
                var maxHeight = containerData.height;
                var renderable = true;
                var offset = void 0;

                // Locking aspect ratio in "free mode" by holding shift key
                if (!aspectRatio && shiftKey) {
                    aspectRatio = width && height ? width / height : 1;
                }

                if (self.limited) {
                    minLeft = cropBoxData.minLeft;
                    minTop = cropBoxData.minTop;
                    maxWidth = minLeft + Math.min(containerData.width, canvasData.width, canvasData.left + canvasData.width);
                    maxHeight = minTop + Math.min(containerData.height, canvasData.height, canvasData.top + canvasData.height);
                }

                var range = {
                    x: self.endX - self.startX,
                    y: self.endY - self.startY
                };

                if (aspectRatio) {
                    range.X = range.y * aspectRatio;
                    range.Y = range.x / aspectRatio;
                }

                switch (action) {
                    // Move crop box
                    case 'all':
                        left += range.x;
                        top += range.y;
                        break;

                        // Resize crop box
                    case ACTION_EAST:
                        if (range.x >= 0 && (right >= maxWidth || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
                            renderable = false;
                            break;
                        }

                        width += range.x;

                        if (aspectRatio) {
                            height = width / aspectRatio;
                            top -= range.Y / 2;
                        }

                        if (width < 0) {
                            action = ACTION_WEST;
                            width = 0;
                        }

                        break;

                    case ACTION_NORTH:
                        if (range.y <= 0 && (top <= minTop || aspectRatio && (left <= minLeft || right >= maxWidth))) {
                            renderable = false;
                            break;
                        }

                        height -= range.y;
                        top += range.y;

                        if (aspectRatio) {
                            width = height * aspectRatio;
                            left += range.X / 2;
                        }

                        if (height < 0) {
                            action = ACTION_SOUTH;
                            height = 0;
                        }

                        break;

                    case ACTION_WEST:
                        if (range.x <= 0 && (left <= minLeft || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
                            renderable = false;
                            break;
                        }

                        width -= range.x;
                        left += range.x;

                        if (aspectRatio) {
                            height = width / aspectRatio;
                            top += range.Y / 2;
                        }

                        if (width < 0) {
                            action = ACTION_EAST;
                            width = 0;
                        }

                        break;

                    case ACTION_SOUTH:
                        if (range.y >= 0 && (bottom >= maxHeight || aspectRatio && (left <= minLeft || right >= maxWidth))) {
                            renderable = false;
                            break;
                        }

                        height += range.y;

                        if (aspectRatio) {
                            width = height * aspectRatio;
                            left -= range.X / 2;
                        }

                        if (height < 0) {
                            action = ACTION_NORTH;
                            height = 0;
                        }

                        break;

                    case ACTION_NORTH_EAST:
                        if (aspectRatio) {
                            if (range.y <= 0 && (top <= minTop || right >= maxWidth)) {
                                renderable = false;
                                break;
                            }

                            height -= range.y;
                            top += range.y;
                            width = height * aspectRatio;
                        } else {
                            if (range.x >= 0) {
                                if (right < maxWidth) {
                                    width += range.x;
                                } else if (range.y <= 0 && top <= minTop) {
                                    renderable = false;
                                }
                            } else {
                                width += range.x;
                            }

                            if (range.y <= 0) {
                                if (top > minTop) {
                                    height -= range.y;
                                    top += range.y;
                                }
                            } else {
                                height -= range.y;
                                top += range.y;
                            }
                        }

                        if (width < 0 && height < 0) {
                            action = ACTION_SOUTH_WEST;
                            height = 0;
                            width = 0;
                        } else if (width < 0) {
                            action = ACTION_NORTH_WEST;
                            width = 0;
                        } else if (height < 0) {
                            action = ACTION_SOUTH_EAST;
                            height = 0;
                        }

                        break;

                    case ACTION_NORTH_WEST:
                        if (aspectRatio) {
                            if (range.y <= 0 && (top <= minTop || left <= minLeft)) {
                                renderable = false;
                                break;
                            }

                            height -= range.y;
                            top += range.y;
                            width = height * aspectRatio;
                            left += range.X;
                        } else {
                            if (range.x <= 0) {
                                if (left > minLeft) {
                                    width -= range.x;
                                    left += range.x;
                                } else if (range.y <= 0 && top <= minTop) {
                                    renderable = false;
                                }
                            } else {
                                width -= range.x;
                                left += range.x;
                            }

                            if (range.y <= 0) {
                                if (top > minTop) {
                                    height -= range.y;
                                    top += range.y;
                                }
                            } else {
                                height -= range.y;
                                top += range.y;
                            }
                        }

                        if (width < 0 && height < 0) {
                            action = ACTION_SOUTH_EAST;
                            height = 0;
                            width = 0;
                        } else if (width < 0) {
                            action = ACTION_NORTH_EAST;
                            width = 0;
                        } else if (height < 0) {
                            action = ACTION_SOUTH_WEST;
                            height = 0;
                        }

                        break;

                    case ACTION_SOUTH_WEST:
                        if (aspectRatio) {
                            if (range.x <= 0 && (left <= minLeft || bottom >= maxHeight)) {
                                renderable = false;
                                break;
                            }

                            width -= range.x;
                            left += range.x;
                            height = width / aspectRatio;
                        } else {
                            if (range.x <= 0) {
                                if (left > minLeft) {
                                    width -= range.x;
                                    left += range.x;
                                } else if (range.y >= 0 && bottom >= maxHeight) {
                                    renderable = false;
                                }
                            } else {
                                width -= range.x;
                                left += range.x;
                            }

                            if (range.y >= 0) {
                                if (bottom < maxHeight) {
                                    height += range.y;
                                }
                            } else {
                                height += range.y;
                            }
                        }

                        if (width < 0 && height < 0) {
                            action = ACTION_NORTH_EAST;
                            height = 0;
                            width = 0;
                        } else if (width < 0) {
                            action = ACTION_SOUTH_EAST;
                            width = 0;
                        } else if (height < 0) {
                            action = ACTION_NORTH_WEST;
                            height = 0;
                        }

                        break;

                    case ACTION_SOUTH_EAST:
                        if (aspectRatio) {
                            if (range.x >= 0 && (right >= maxWidth || bottom >= maxHeight)) {
                                renderable = false;
                                break;
                            }

                            width += range.x;
                            height = width / aspectRatio;
                        } else {
                            if (range.x >= 0) {
                                if (right < maxWidth) {
                                    width += range.x;
                                } else if (range.y >= 0 && bottom >= maxHeight) {
                                    renderable = false;
                                }
                            } else {
                                width += range.x;
                            }

                            if (range.y >= 0) {
                                if (bottom < maxHeight) {
                                    height += range.y;
                                }
                            } else {
                                height += range.y;
                            }
                        }

                        if (width < 0 && height < 0) {
                            action = ACTION_NORTH_WEST;
                            height = 0;
                            width = 0;
                        } else if (width < 0) {
                            action = ACTION_SOUTH_WEST;
                            width = 0;
                        } else if (height < 0) {
                            action = ACTION_NORTH_EAST;
                            height = 0;
                        }

                        break;

                        // Move canvas
                    case 'move':
                        self.move(range.x, range.y);
                        renderable = false;
                        break;

                        // Zoom canvas
                    case 'zoom':
                        self.zoom(function (x1, y1, x2, y2) {
                            var z1 = Math.sqrt(x1 * x1 + y1 * y1);
                            var z2 = Math.sqrt(x2 * x2 + y2 * y2);

                            return (z2 - z1) / z1;
                        }(Math.abs(self.startX - self.startX2), Math.abs(self.startY - self.startY2), Math.abs(self.endX - self.endX2), Math.abs(self.endY - self.endY2)), originalEvent);
                        self.startX2 = self.endX2;
                        self.startY2 = self.endY2;
                        renderable = false;
                        break;

                        // Create crop box
                    case 'crop':
                        if (!range.x || !range.y) {
                            renderable = false;
                            break;
                        }

                        offset = $.getOffset(self.cropper);
                        left = self.startX - offset.left;
                        top = self.startY - offset.top;
                        width = cropBoxData.minWidth;
                        height = cropBoxData.minHeight;

                        if (range.x > 0) {
                            action = range.y > 0 ? ACTION_SOUTH_EAST : ACTION_NORTH_EAST;
                        } else if (range.x < 0) {
                            left -= width;
                            action = range.y > 0 ? ACTION_SOUTH_WEST : ACTION_NORTH_WEST;
                        }

                        if (range.y < 0) {
                            top -= height;
                        }

                        // Show the crop box if is hidden
                        if (!self.cropped) {
                            $.removeClass(self.cropBox, 'cropper-hidden');
                            self.cropped = true;

                            if (self.limited) {
                                self.limitCropBox(true, true);
                            }
                        }

                        break;

                        // No default
                }

                if (renderable) {
                    cropBoxData.width = width;
                    cropBoxData.height = height;
                    cropBoxData.left = left;
                    cropBoxData.top = top;
                    self.action = action;

                    self.renderCropBox();
                }

                // Override
                self.startX = self.endX;
                self.startY = self.endY;
            }
        };

        /***/
    },
    /* 9 */
    /***/ function (module, exports, __webpack_require__) {

        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _utilities = __webpack_require__(4);

        var $ = _interopRequireWildcard(_utilities);

        function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

        function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length) ; i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

        exports.default = {
            // Show the crop box manually
            crop: function crop() {
                var self = this;

                if (self.ready && !self.disabled) {
                    if (!self.cropped) {
                        self.cropped = true;
                        self.limitCropBox(true, true);

                        if (self.options.modal) {
                            $.addClass(self.dragBox, 'cropper-modal');
                        }

                        $.removeClass(self.cropBox, 'cropper-hidden');
                    }

                    self.setCropBoxData(self.initialCropBoxData);
                }

                return self;
            },


            // Reset the image and crop box to their initial states
            reset: function reset() {
                var self = this;

                if (self.ready && !self.disabled) {
                    self.imageData = $.extend({}, self.initialImageData);
                    self.canvasData = $.extend({}, self.initialCanvasData);
                    self.cropBoxData = $.extend({}, self.initialCropBoxData);

                    self.renderCanvas();

                    if (self.cropped) {
                        self.renderCropBox();
                    }
                }

                return self;
            },


            // Clear the crop box
            clear: function clear() {
                var self = this;

                if (self.cropped && !self.disabled) {
                    $.extend(self.cropBoxData, {
                        left: 0,
                        top: 0,
                        width: 0,
                        height: 0
                    });

                    self.cropped = false;
                    self.renderCropBox();

                    self.limitCanvas();

                    // Render canvas after crop box rendered
                    self.renderCanvas();

                    $.removeClass(self.dragBox, 'cropper-modal');
                    $.addClass(self.cropBox, 'cropper-hidden');
                }

                return self;
            },


            /**
             * Replace the image's src and rebuild the cropper
             *
             * @param {String} url
             * @param {Boolean} onlyColorChanged (optional)
             */
            replace: function replace(url, onlyColorChanged) {
                var self = this;

                if (!self.disabled && url) {
                    if (self.isImg) {
                        self.element.src = url;
                    }

                    if (onlyColorChanged) {
                        self.url = url;
                        self.image.src = url;

                        if (self.ready) {
                            self.image2.src = url;

                            $.each(self.previews, function (element) {
                                $.getByTag(element, 'img')[0].src = url;
                            });
                        }
                    } else {
                        if (self.isImg) {
                            self.replaced = true;
                        }

                        // Clear previous data
                        self.options.data = null;
                        self.load(url);
                    }
                }

                return self;
            },


            // Enable (unfreeze) the cropper
            enable: function enable() {
                var self = this;

                if (self.ready) {
                    self.disabled = false;
                    $.removeClass(self.cropper, 'cropper-disabled');
                }

                return self;
            },


            // Disable (freeze) the cropper
            disable: function disable() {
                var self = this;

                if (self.ready) {
                    self.disabled = true;
                    $.addClass(self.cropper, 'cropper-disabled');
                }

                return self;
            },


            // Destroy the cropper and remove the instance from the image
            destroy: function destroy() {
                var self = this;
                var element = self.element;
                var image = self.image;

                if (self.loaded) {
                    if (self.isImg && self.replaced) {
                        element.src = self.originalUrl;
                    }

                    self.unbuild();
                    $.removeClass(element, 'cropper-hidden');
                } else if (self.isImg) {
                    $.removeListener(element, 'load', self.start);
                } else if (image) {
                    $.removeChild(image);
                }

                $.removeData(element, 'cropper');

                return self;
            },


            /**
             * Move the canvas with relative offsets
             *
             * @param {Number} offsetX
             * @param {Number} offsetY (optional)
             */
            move: function move(offsetX, offsetY) {
                var self = this;
                var canvasData = self.canvasData;

                return self.moveTo($.isUndefined(offsetX) ? offsetX : canvasData.left + Number(offsetX), $.isUndefined(offsetY) ? offsetY : canvasData.top + Number(offsetY));
            },


            /**
             * Move the canvas to an absolute point
             *
             * @param {Number} x
             * @param {Number} y (optional)
             */
            moveTo: function moveTo(x, y) {
                var self = this;
                var canvasData = self.canvasData;
                var changed = false;

                // If "y" is not present, its default value is "x"
                if ($.isUndefined(y)) {
                    y = x;
                }

                x = Number(x);
                y = Number(y);

                if (self.ready && !self.disabled && self.options.movable) {
                    if ($.isNumber(x)) {
                        canvasData.left = x;
                        changed = true;
                    }

                    if ($.isNumber(y)) {
                        canvasData.top = y;
                        changed = true;
                    }

                    if (changed) {
                        self.renderCanvas(true);
                    }
                }

                return self;
            },


            /**
             * Zoom the canvas with a relative ratio
             *
             * @param {Number} ratio
             * @param {Event} _originalEvent (private)
             */
            zoom: function zoom(ratio, _originalEvent) {
                var self = this;
                var canvasData = self.canvasData;

                ratio = Number(ratio);

                if (ratio < 0) {
                    ratio = 1 / (1 - ratio);
                } else {
                    ratio = 1 + ratio;
                }

                return self.zoomTo(canvasData.width * ratio / canvasData.naturalWidth, _originalEvent);
            },


            /**
             * Zoom the canvas to an absolute ratio
             *
             * @param {Number} ratio
             * @param {Event} _originalEvent (private)
             */
            zoomTo: function zoomTo(ratio, _originalEvent) {
                var self = this;
                var options = self.options;
                var canvasData = self.canvasData;
                var width = canvasData.width;
                var height = canvasData.height;
                var naturalWidth = canvasData.naturalWidth;
                var naturalHeight = canvasData.naturalHeight;
                var newWidth = void 0;
                var newHeight = void 0;
                var offset = void 0;
                var center = void 0;

                ratio = Number(ratio);

                if (ratio >= 0 && self.ready && !self.disabled && options.zoomable) {
                    newWidth = naturalWidth * ratio;
                    newHeight = naturalHeight * ratio;

                    if ($.dispatchEvent(self.element, 'zoom', {
                        originalEvent: _originalEvent,
                        oldRatio: width / naturalWidth,
                        ratio: newWidth / naturalWidth
                    }) === false) {
                        return self;
                    }

                    if (_originalEvent) {
                        offset = $.getOffset(self.cropper);
                        center = _originalEvent.touches ? $.getTouchesCenter(_originalEvent.touches) : {
                            pageX: _originalEvent.pageX,
                            pageY: _originalEvent.pageY
                        };

                        // Zoom from the triggering point of the event
                        canvasData.left -= (newWidth - width) * ((center.pageX - offset.left - canvasData.left) / width);
                        canvasData.top -= (newHeight - height) * ((center.pageY - offset.top - canvasData.top) / height);
                    } else {
                        // Zoom from the center of the canvas
                        canvasData.left -= (newWidth - width) / 2;
                        canvasData.top -= (newHeight - height) / 2;
                    }

                    canvasData.width = newWidth;
                    canvasData.height = newHeight;
                    self.renderCanvas(true);
                }

                return self;
            },


            /**
             * Rotate the canvas with a relative degree
             *
             * @param {Number} degree
             */
            rotate: function rotate(degree) {
                var self = this;

                return self.rotateTo((self.imageData.rotate || 0) + Number(degree));
            },


            /**
             * Rotate the canvas to an absolute degree
             * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#rotate()
             *
             * @param {Number} degree
             */
            rotateTo: function rotateTo(degree) {
                var self = this;

                degree = Number(degree);

                if ($.isNumber(degree) && self.ready && !self.disabled && self.options.rotatable) {
                    self.imageData.rotate = degree % 360;
                    self.rotated = true;
                    self.renderCanvas(true);
                }

                return self;
            },


            /**
             * Scale the image
             * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#scale()
             *
             * @param {Number} scaleX
             * @param {Number} scaleY (optional)
             */
            scale: function scale(scaleX, scaleY) {
                var self = this;
                var imageData = self.imageData;
                var changed = false;

                // If "scaleY" is not present, its default value is "scaleX"
                if ($.isUndefined(scaleY)) {
                    scaleY = scaleX;
                }

                scaleX = Number(scaleX);
                scaleY = Number(scaleY);

                if (self.ready && !self.disabled && self.options.scalable) {
                    if ($.isNumber(scaleX)) {
                        imageData.scaleX = scaleX;
                        changed = true;
                    }

                    if ($.isNumber(scaleY)) {
                        imageData.scaleY = scaleY;
                        changed = true;
                    }

                    if (changed) {
                        self.renderImage(true);
                    }
                }

                return self;
            },


            /**
             * Scale the abscissa of the image
             *
             * @param {Number} scaleX
             */
            scaleX: function scaleX(_scaleX) {
                var self = this;
                var scaleY = self.imageData.scaleY;

                return self.scale(_scaleX, $.isNumber(scaleY) ? scaleY : 1);
            },


            /**
             * Scale the ordinate of the image
             *
             * @param {Number} scaleY
             */
            scaleY: function scaleY(_scaleY) {
                var self = this;
                var scaleX = self.imageData.scaleX;

                return self.scale($.isNumber(scaleX) ? scaleX : 1, _scaleY);
            },


            /**
             * Get the cropped area position and size data (base on the original image)
             *
             * @param {Boolean} rounded (optional)
             * @return {Object} data
             */
            getData: function getData(rounded) {
                var self = this;
                var options = self.options;
                var imageData = self.imageData;
                var canvasData = self.canvasData;
                var cropBoxData = self.cropBoxData;
                var ratio = void 0;
                var data = void 0;

                if (self.ready && self.cropped) {
                    data = {
                        x: cropBoxData.left - canvasData.left,
                        y: cropBoxData.top - canvasData.top,
                        width: cropBoxData.width,
                        height: cropBoxData.height
                    };

                    ratio = imageData.width / imageData.naturalWidth;

                    $.each(data, function (n, i) {
                        n /= ratio;
                        data[i] = rounded ? Math.round(n) : n;
                    });
                } else {
                    data = {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0
                    };
                }

                if (options.rotatable) {
                    data.rotate = imageData.rotate || 0;
                }

                if (options.scalable) {
                    data.scaleX = imageData.scaleX || 1;
                    data.scaleY = imageData.scaleY || 1;
                }

                return data;
            },


            /**
             * Set the cropped area position and size with new data
             *
             * @param {Object} data
             */
            setData: function setData(data) {
                var self = this;
                var options = self.options;
                var imageData = self.imageData;
                var canvasData = self.canvasData;
                var cropBoxData = {};
                var rotated = void 0;
                var scaled = void 0;
                var ratio = void 0;

                if ($.isFunction(data)) {
                    data = data.call(self.element);
                }

                if (self.ready && !self.disabled && $.isPlainObject(data)) {
                    if (options.rotatable) {
                        if ($.isNumber(data.rotate) && data.rotate !== imageData.rotate) {
                            imageData.rotate = data.rotate;
                            self.rotated = rotated = true;
                        }
                    }

                    if (options.scalable) {
                        if ($.isNumber(data.scaleX) && data.scaleX !== imageData.scaleX) {
                            imageData.scaleX = data.scaleX;
                            scaled = true;
                        }

                        if ($.isNumber(data.scaleY) && data.scaleY !== imageData.scaleY) {
                            imageData.scaleY = data.scaleY;
                            scaled = true;
                        }
                    }

                    if (rotated) {
                        self.renderCanvas();
                    } else if (scaled) {
                        self.renderImage();
                    }

                    ratio = imageData.width / imageData.naturalWidth;

                    if ($.isNumber(data.x)) {
                        cropBoxData.left = data.x * ratio + canvasData.left;
                    }

                    if ($.isNumber(data.y)) {
                        cropBoxData.top = data.y * ratio + canvasData.top;
                    }

                    if ($.isNumber(data.width)) {
                        cropBoxData.width = data.width * ratio;
                    }

                    if ($.isNumber(data.height)) {
                        cropBoxData.height = data.height * ratio;
                    }

                    self.setCropBoxData(cropBoxData);
                }

                return self;
            },


            /**
             * Get the container size data
             *
             * @return {Object} data
             */
            getContainerData: function getContainerData() {
                var self = this;

                return self.ready ? self.containerData : {};
            },


            /**
             * Get the image position and size data
             *
             * @return {Object} data
             */
            getImageData: function getImageData() {
                var self = this;

                return self.loaded ? self.imageData : {};
            },


            /**
             * Get the canvas position and size data
             *
             * @return {Object} data
             */
            getCanvasData: function getCanvasData() {
                var self = this;
                var canvasData = self.canvasData;
                var data = {};

                if (self.ready) {
                    $.each(['left', 'top', 'width', 'height', 'naturalWidth', 'naturalHeight'], function (n) {
                        data[n] = canvasData[n];
                    });
                }

                return data;
            },


            /**
             * Set the canvas position and size with new data
             *
             * @param {Object} data
             */
            setCanvasData: function setCanvasData(data) {
                var self = this;
                var canvasData = self.canvasData;
                var aspectRatio = canvasData.aspectRatio;

                if ($.isFunction(data)) {
                    data = data.call(self.element);
                }

                if (self.ready && !self.disabled && $.isPlainObject(data)) {
                    if ($.isNumber(data.left)) {
                        canvasData.left = data.left;
                    }

                    if ($.isNumber(data.top)) {
                        canvasData.top = data.top;
                    }

                    if ($.isNumber(data.width)) {
                        canvasData.width = data.width;
                        canvasData.height = data.width / aspectRatio;
                    } else if ($.isNumber(data.height)) {
                        canvasData.height = data.height;
                        canvasData.width = data.height * aspectRatio;
                    }

                    self.renderCanvas(true);
                }

                return self;
            },


            /**
             * Get the crop box position and size data
             *
             * @return {Object} data
             */
            getCropBoxData: function getCropBoxData() {
                var self = this;
                var cropBoxData = self.cropBoxData;
                var data = void 0;

                if (self.ready && self.cropped) {
                    data = {
                        left: cropBoxData.left,
                        top: cropBoxData.top,
                        width: cropBoxData.width,
                        height: cropBoxData.height
                    };
                }

                return data || {};
            },


            /**
             * Set the crop box position and size with new data
             *
             * @param {Object} data
             */
            setCropBoxData: function setCropBoxData(data) {
                var self = this;
                var cropBoxData = self.cropBoxData;
                var aspectRatio = self.options.aspectRatio;
                var widthChanged = void 0;
                var heightChanged = void 0;

                if ($.isFunction(data)) {
                    data = data.call(self.element);
                }

                if (self.ready && self.cropped && !self.disabled && $.isPlainObject(data)) {
                    if ($.isNumber(data.left)) {
                        cropBoxData.left = data.left;
                    }

                    if ($.isNumber(data.top)) {
                        cropBoxData.top = data.top;
                    }

                    if ($.isNumber(data.width)) {
                        widthChanged = true;
                        cropBoxData.width = data.width;
                    }

                    if ($.isNumber(data.height)) {
                        heightChanged = true;
                        cropBoxData.height = data.height;
                    }

                    if (aspectRatio) {
                        if (widthChanged) {
                            cropBoxData.height = cropBoxData.width / aspectRatio;
                        } else if (heightChanged) {
                            cropBoxData.width = cropBoxData.height * aspectRatio;
                        }
                    }

                    self.renderCropBox();
                }

                return self;
            },


            /**
             * Get a canvas drawn the cropped image
             *
             * @param {Object} options (optional)
             * @return {HTMLCanvasElement} canvas
             */
            getCroppedCanvas: function getCroppedCanvas(options) {
                var self = this;

                if (!self.ready || !window.HTMLCanvasElement) {
                    return null;
                }

                // Return the whole canvas if not cropped
                if (!self.cropped) {
                    return $.getSourceCanvas(self.image, self.imageData);
                }

                if (!$.isPlainObject(options)) {
                    options = {};
                }

                var data = self.getData();
                var originalWidth = data.width;
                var originalHeight = data.height;
                var aspectRatio = originalWidth / originalHeight;
                var scaledWidth = void 0;
                var scaledHeight = void 0;
                var scaledRatio = void 0;

                if ($.isPlainObject(options)) {
                    scaledWidth = options.width;
                    scaledHeight = options.height;

                    if (scaledWidth) {
                        scaledHeight = scaledWidth / aspectRatio;
                        scaledRatio = scaledWidth / originalWidth;
                    } else if (scaledHeight) {
                        scaledWidth = scaledHeight * aspectRatio;
                        scaledRatio = scaledHeight / originalHeight;
                    }
                }

                // The canvas element will use `Math.floor` on a float number, so floor first
                var canvasWidth = Math.floor(scaledWidth || originalWidth);
                var canvasHeight = Math.floor(scaledHeight || originalHeight);

                var canvas = $.createElement('canvas');
                var context = canvas.getContext('2d');

                canvas.width = canvasWidth;
                canvas.height = canvasHeight;

                //if (options.fillColor) {
                context.fillStyle = "white";
                context.fillRect(0, 0, canvasWidth, canvasHeight);
                //}

                // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.drawImage
                var parameters = function () {
                    var source = $.getSourceCanvas(self.image, self.imageData);
                    var sourceWidth = source.width;
                    var sourceHeight = source.height;
                    var canvasData = self.canvasData;
                    var params = [source];

                    // Source canvas
                    var srcX = data.x + canvasData.naturalWidth * (Math.abs(data.scaleX || 1) - 1) / 2;
                    var srcY = data.y + canvasData.naturalHeight * (Math.abs(data.scaleY || 1) - 1) / 2;
                    var srcWidth = void 0;
                    var srcHeight = void 0;

                    // Destination canvas
                    var dstX = void 0;
                    var dstY = void 0;
                    var dstWidth = void 0;
                    var dstHeight = void 0;

                    if (srcX <= -originalWidth || srcX > sourceWidth) {
                        srcX = srcWidth = dstX = dstWidth = 0;
                    } else if (srcX <= 0) {
                        dstX = -srcX;
                        srcX = 0;
                        srcWidth = dstWidth = Math.min(sourceWidth, originalWidth + srcX);
                    } else if (srcX <= sourceWidth) {
                        dstX = 0;
                        srcWidth = dstWidth = Math.min(originalWidth, sourceWidth - srcX);
                    }

                    if (srcWidth <= 0 || srcY <= -originalHeight || srcY > sourceHeight) {
                        srcY = srcHeight = dstY = dstHeight = 0;
                    } else if (srcY <= 0) {
                        dstY = -srcY;
                        srcY = 0;
                        srcHeight = dstHeight = Math.min(sourceHeight, originalHeight + srcY);
                    } else if (srcY <= sourceHeight) {
                        dstY = 0;
                        srcHeight = dstHeight = Math.min(originalHeight, sourceHeight - srcY);
                    }

                    params.push(Math.floor(srcX), Math.floor(srcY), Math.floor(srcWidth), Math.floor(srcHeight));

                    // Scale destination sizes
                    if (scaledRatio) {
                        dstX *= scaledRatio;
                        dstY *= scaledRatio;
                        dstWidth *= scaledRatio;
                        dstHeight *= scaledRatio;
                    }

                    // Avoid "IndexSizeError" in IE and Firefox
                    if (dstWidth > 0 && dstHeight > 0) {
                        params.push(Math.floor(dstX), Math.floor(dstY), Math.floor(dstWidth), Math.floor(dstHeight));
                    }

                    return params;
                }();

                context.drawImage.apply(context, _toConsumableArray(parameters));

                return canvas;
            },


            /**
             * Change the aspect ratio of the crop box
             *
             * @param {Number} aspectRatio
             */
            setAspectRatio: function setAspectRatio(aspectRatio) {
                var self = this;
                var options = self.options;

                if (!self.disabled && !$.isUndefined(aspectRatio)) {
                    // 0 -> NaN
                    options.aspectRatio = Math.max(0, aspectRatio) || NaN;

                    if (self.ready) {
                        self.initCropBox();

                        if (self.cropped) {
                            self.renderCropBox();
                        }
                    }
                }

                return self;
            },


            /**
             * Change the drag mode
             *
             * @param {String} mode (optional)
             */
            setDragMode: function setDragMode(mode) {
                var self = this;
                var options = self.options;
                var dragBox = self.dragBox;
                var face = self.face;
                var croppable = void 0;
                var movable = void 0;

                if (self.loaded && !self.disabled) {
                    croppable = mode === 'crop';
                    movable = options.movable && mode === 'move';
                    mode = croppable || movable ? mode : 'none';

                    $.setData(dragBox, 'action', mode);
                    $.toggleClass(dragBox, 'cropper-crop', croppable);
                    $.toggleClass(dragBox, 'cropper-move', movable);

                    if (!options.cropBoxMovable) {
                        // Sync drag mode to crop box when it is not movable
                        $.setData(face, 'action', mode);
                        $.toggleClass(face, 'cropper-crop', croppable);
                        $.toggleClass(face, 'cropper-move', movable);
                    }
                }

                return self;
            }
        };

        /***/
    }
    /******/])
});
;
//# sourceMappingURL=cropper.js.map
$.fn.InitCropper = function () {
    'use strict';

    var Cropper = window.Cropper;
    var container = document.querySelector('.img-container');
    var image = container.getElementsByTagName('img').item(0);
    //var download = document.getElementById('download');
    var actions = document.getElementById('actions');
    var dataX = document.getElementById('dataX');
    var dataY = document.getElementById('dataY');
    var dataHeight = document.getElementById('dataHeight');
    var dataWidth = document.getElementById('dataWidth');
    var dataRotate = document.getElementById('dataRotate');
    var dataScaleX = document.getElementById('dataScaleX');
    var dataScaleY = document.getElementById('dataScaleY');
    var options = {
        aspectRatio: NaN,
        preview: '.img-media-preview',
        ready: function (e) {
            //console.log(e.type);
        },
        cropstart: function (e) {
            //console.log(e.type, e.detail.action);
        },
        cropmove: function (e) {
            //console.log(e.type, e.detail.action);
        },
        cropend: function (e) {
            //console.log(e.type, e.detail.action);
        },
        crop: function (e) {
            var data = e.detail;

            //console.log(e.type);
            dataX.value = Math.round(data.x);
            dataY.value = Math.round(data.y);
            dataHeight.value = Math.round(data.height);
            dataWidth.value = Math.round(data.width);
            dataRotate.value = typeof data.rotate !== 'undefined' ? data.rotate : '';
            dataScaleX.value = typeof data.scaleX !== 'undefined' ? data.scaleX : '';
            dataScaleY.value = typeof data.scaleY !== 'undefined' ? data.scaleY : '';
        },
        zoom: function (e) {
            //console.log(e.type, e.detail.ratio);
        }
    };


    var cropper = new Cropper(image, options);

    var blobURL = image.src;
    cropper.reset().replace(blobURL);
    //inputImage.value = null;

    //cropper.reset();
    //cropper.clear();
    //cropper.destroy();

    $('#backtoMediaList').off().on('click', function () {
        $('.right-side').show();
        $('.right-right-side').hide();

        //cropper.clear();
        //cropper.destroy();
        $('.cropper-container.cropper-bg').remove();
    });
    // Tooltip
    //$('[data-toggle="tooltip"]').tooltip();


    // Buttons
    if (!document.createElement('canvas').getContext) {
        $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
    }

    if (typeof document.createElement('cropper').style.transition === 'undefined') {
        $('button[data-method="rotate"]').prop('disabled', true);
        $('button[data-method="scale"]').prop('disabled', true);
    }


    // Download
    //if (typeof download.download === 'undefined') {
    //    download.className += ' disabled';
    //}


    // Options
    actions.querySelector('.docs-toggles').onchange = function (event) {
        var e = event || window.event;
        var target = e.target || e.srcElement;
        var cropBoxData;
        var canvasData;
        var isCheckbox;
        var isRadio;

        if (!cropper) {
            return;
        }

        if (target.tagName.toLowerCase() === 'label') {
            target = target.querySelector('input');
        }

        isCheckbox = target.type === 'checkbox';
        isRadio = target.type === 'radio';

        if (isCheckbox || isRadio) {
            if (isCheckbox) {
                options[target.name] = target.checked;
                cropBoxData = cropper.getCropBoxData();
                canvasData = cropper.getCanvasData();

                options.ready = function () {
                    //console.log('ready');
                    cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
                };
            } else {
                options[target.name] = target.value;
                options.ready = function () {
                    //console.log('ready');
                };
            }

            // Restart
            cropper.destroy();
            cropper = new Cropper(image, options);

            setTimeout(function () {
                $('.sr-only:checked').closest('.btn.btn-primary').addClass('active');
            }, 100);
        }
    };


    // Methods
    actions.querySelector('.docs-buttons').onclick = function (event) {
        var e = event || window.event;
        var target = e.target || e.srcElement;
        var result;
        var input;
        var data;

        if (!cropper) {
            return;
        }

        while (target !== this) {
            if (target.getAttribute('data-method')) {
                break;
            }

            target = target.parentNode;
        }

        if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
            return;
        }

        data = {
            method: target.getAttribute('data-method'),
            target: target.getAttribute('data-target'),
            option: target.getAttribute('data-option'),
            secondOption: target.getAttribute('data-second-option')
        };

        if (data.method) {
            if (typeof data.target !== 'undefined') {
                input = document.querySelector(data.target);

                if (!target.hasAttribute('data-option') && data.target && input) {
                    try {
                        data.option = JSON.parse(input.value);
                    } catch (e) {
                        console.log(e.message);
                    }
                }
            }

            if (data.method === 'getCroppedCanvas') {
                data.option = JSON.parse(data.option);
            }

            result = cropper[data.method](data.option, data.secondOption);

            switch (data.method) {
                case 'scaleX':
                case 'scaleY':
                    target.setAttribute('data-option', -data.option);
                    break;

                case 'getCroppedCanvas':
                    if (result) {
                        $('#clientImage').attr('src', result.toDataURL('image/jpeg'));
                        //if (!download.disabled) {
                        //    download.href = result.toDataURL('image/jpeg');
                        //}
                    }

                    break;

                case 'destroy':
                    cropper = null;
                    break;
            }

            if (typeof result === 'object' && result !== cropper && input) {
                try {
                    input.value = JSON.stringify(result);
                } catch (e) {
                    // console.log(e.message);
                }
            }

        }
    };

    document.body.onkeydown = function (event) {
        var e = event || window.event;

        if (!cropper || this.scrollTop > 300) {
            return;
        }

        switch (e.charCode || e.keyCode) {
            case 37:
                e.preventDefault();
                cropper.move(-1, 0);
                break;

            case 38:
                e.preventDefault();
                cropper.move(0, -1);
                break;

            case 39:
                e.preventDefault();
                cropper.move(1, 0);
                break;

            case 40:
                e.preventDefault();
                cropper.move(0, 1);
                break;
        }
    };


    // Import image
    //var inputImage = document.getElementById('inputImage');
    //var URL = window.URL || window.webkitURL;
    //var blobURL;

    //if (URL) {
    //    inputImage.onchange = function () {
    //        var files = this.files;
    //        var file;

    //        if (cropper && files && files.length) {
    //            file = files[0];

    //            if (/^image\/\w+/.test(file.type)) {
    //                blobURL = URL.createObjectURL(file);
    //                cropper.reset().replace(blobURL);
    //                inputImage.value = null;
    //            } else {
    //                window.alert('Please choose an image file.');
    //            }
    //        }
    //    };
    //} else {
    //    inputImage.disabled = true;
    //    inputImage.parentNode.className += ' disabled';
    //}
};
/*
	jQuery flexImages v1.0.4
    Copyright (c) 2014 Simon Steinberger / Pixabay
    GitHub: https://github.com/Pixabay/jQuery-flexImages
	License: http://www.opensource.org/licenses/mit-license.php
*/

(function ($) {
    $.fn.flexImages = function (options) {
        var o = $.extend({ container: '.item', object: 'img', rowHeight: 180, maxRows: 0, truncate: 0 }, options);
        return this.each(function () {
            var grid = $(this), containers = $(grid).find(o.container), items = [], t = new Date().getTime(),
                s = window.getComputedStyle ? getComputedStyle(containers[0], null) : containers[0].currentStyle;
            o.margin = (parseInt(s.marginLeft) || 0) + (parseInt(s.marginRight) || 0) + (Math.round(parseFloat(s.borderLeftWidth)) || 0) + (Math.round(parseFloat(s.borderRightWidth)) || 0);
            for (j = 0; j < containers.length; j++) {
                var c = containers[j],
                    w = parseInt(c.getAttribute('data-w')),
                    norm_w = w * (o.rowHeight / parseInt(c.getAttribute('data-h'))), // normalized width
                    obj = $(c).find(o.object);
                items.push([c, w, norm_w, obj, obj.data('src')]);
            }
            makeGrid(grid, items, o);
            $(window).off('resize.flexImages' + grid.data('flex-t'));
            $(window).on('resize.flexImages' + t, function () { makeGrid(grid, items, o); });
            grid.data('flex-t', t)
        });
    }

    function makeGrid(grid, items, o, noresize) {
        var x, new_w, ratio = 1, rows = 1, max_w = grid.width() - 2, row = [], row_width = 0, row_h = o.rowHeight;
        if (!max_w) max_w = grid.width() - 2; // IE < 8 bug

        // define inside makeGrid to access variables in scope
        function _helper(lastRow) {
            if (o.maxRows && rows > o.maxRows || o.truncate && lastRow && rows > 1) row[x][0].style.display = 'none';
            else {
                if (row[x][4]) { row[x][3].attr('src', row[x][4]); row[x][4] = ''; }
                row[x][0].style.width = new_w + 'px';
                row[x][0].style.height = row_h + 'px';
                row[x][0].style.display = 'block';
            }
        }

        for (i = 0; i < items.length; i++) {
            row.push(items[i]);
            row_width += items[i][2] + o.margin;
            if (row_width >= max_w) {
                var margins_in_row = row.length * o.margin;
                ratio = (max_w - margins_in_row) / (row_width - margins_in_row), row_h = Math.ceil(o.rowHeight * ratio), exact_w = 0, new_w;
                for (x = 0; x < row.length; x++) {
                    new_w = Math.ceil(row[x][2] * ratio);
                    exact_w += new_w + o.margin;
                    if (exact_w > max_w) new_w -= exact_w - max_w;
                    _helper();
                }
                // reset for next row
                row = [], row_width = 0;
                rows++;
            }
        }
        // layout last row - match height of last row to previous row
        for (x = 0; x < row.length; x++) {
            new_w = Math.floor(row[x][2] * ratio), h = Math.floor(o.rowHeight * ratio);
            _helper(true);
        }

        // scroll bars added or removed during rendering new layout?
        if (!noresize && max_w != grid.width()) makeGrid(grid, items, o, true);
    }
}(jQuery));
//---
//layout: demo
//title: 'HTML5 drag and drop demo'
//---
//<style type="text/css">
//  .demo-droppable {
//    background: #08c;
//    color: #fff;
//    padding: 100px 0;
//    text-align: center;
//  }
//  .demo-droppable.dragover {
//    background: #00CC71;
//  }
//</style>
//<div class="demo-droppable">
//  <p>Drag files here or click to upload</p>
//</div>
//<div class="output"></div>
//<div><a href="http://bitwiser.in/2015/08/08/creating-dropzone-for-drag-drop-file.html" class="mui-btn mui-btn-primary mui-btn-lg">Back to Tutorial</a></div>
//<script type="text/javascript">
(function (window) {
    function triggerCallback(e, callback) {
        if (!callback || typeof callback !== 'function') {
            return;
        }
        var files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        callback.call(null, files);
    }
    function makeDroppable(ele, callback, fileSelector) {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('multiple', true);  //multiple Upload 
        input.className += fileSelector;
        input.style.display = 'none';
        if (input.removeEventListener) {                   // For all major browsers, except IE 8 and earlier
            input.removeEventListener("change", function () { });
        } else if (input.detachEvent) {                    // For IE 8 and earlier versions
            input.detachEvent("onchange", function () { });
        }

        input.addEventListener('change', function (e) {
            triggerCallback(e, callback);
        });
        ele.appendChild(input);

        ele.addEventListener('dragover', function (e) {
            e.preventDefault();
            e.stopPropagation();
            ele.parentElement.classList.add('parentdragover');
            ele.classList.add('dragover');
        });

        ele.addEventListener('dragleave', function (e) {
            e.preventDefault();
            e.stopPropagation();
            ele.classList.remove('dragover');
            ele.parentElement.classList.remove('parentdragover');
        });

        ele.addEventListener('drop', function (e) {
            e.preventDefault();
            e.stopPropagation();
            ele.classList.remove('dragover');
            ele.parentElement.classList.remove('parentdragover');
            triggerCallback(e, callback);
        });

        ele.addEventListener('click', function () {
            input.value = null;
            input.click();
        });
    }
    window.makeDroppable = makeDroppable;
})(this);
(function (window) {
    $.Uploader = function (p, parent) {
        var order = 0;
        var level = 0;
        var mulFile = '';
        p = $.extend
            ({
                extension: '',
                response: '',
                outputMessageID: '#messages',
                fileClassName: "",
                path: "",
                dragZone: "",
                savaPath: "",
                callback: "",
                UploadHandlerPath: "",
                encodeQuality: "",
                mediaType: "*",
            }, p);
        var Uploader = {
            config: {
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: '{}',
                dataType: 'json',
                method: "",
                url: "",
                categoryList: "",
                ajaxCallMode: 0,
                arr: [],
                arrModules: [],
                baseURL: '/MediaManagement/',//SageFrameAppPath + '/MediaManagement/',
                Path: p.UploadHandlerPath,
                UserName: SageFrameUserName,
                path: p.path
            },

            // file selection
            ParseFile: function (file) {
                var dt = new Date();
                var time = dt.getFullYear() + '_' + dt.getMonth() + '_' + dt.getDate() + '_' + dt.getHours() + '_' + dt.getMinutes() + '_' + dt.getSeconds();
                Uploader.Output(
                    "<li><span class='spnFileName'>" + file + "</span><span class='deleteIcon'><label class='sfBtn icon-close'></label></span></li>"
                );
            },
            DeleteIcon: function (IconPath) {
                $.ajax({
                    type: Uploader.config.type,
                    contentType: Uploader.config.contentType,
                    cache: Uploader.config.cache,
                    url: Uploader.config.baseURL + "DeleteIcon",
                    data: JSON2.stringify({ IconPath: IconPath }),
                    dataType: Uploader.config.dataType,
                    success: function (msg) {
                    }
                });
            },
            //get browser name
            get_browser_info: function () {
                var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                if (/trident/i.test(M[1])) {
                    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                    return { name: 'IE ', version: (tem[1] || '') };
                }
                if (M[1] === 'Chrome') {
                    tem = ua.match(/\bOPR\/(\d+)/);
                    if (tem != null) { return { name: 'Opera', version: tem[1] }; }
                }
                M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
                if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
                return {
                    name: M[0],
                    version: M[1]
                };
            },
            UploadFile: function (response) {
                Uploader.FileSelectHandler(response);

            },
            init: function () {
                var element = document.querySelector(p.dragZone);
                makeDroppable(element, Uploader.callback, p.fileClassName);
            },
            callback: function (files) {
                for (var i = 0, f; f = files[i]; i++) {
                    
                    var formData = new FormData();
                    formData.append("files", f);

                    //$.ajax({
                    //    url: Uploader.config.Path + 'UploadHandler.ashx?userModuleId=' + p.userModuleID + '&portalID=' + Uploader.config.PortalID + '&userName=' + Uploader.config.UserName + '&sageFrameSecureToken=' + SageFrameSecureToken + '&fileExtension=' + p.extension + '&savaPath=' + p.savaPath + '&encodeQuality=' + p.encodeQuality + '&mediaType=' + p.mediaType,
                    //    method: 'post',
                    //    data: formData,
                    //    processData: false,
                    //    contentType: false,
                    //    async: true,
                    //    success: function (response) {
                    //        p.callback(response);
                    //    }
                    //});
                    var _url = "/MediaManagement/FileUpload?fileextension=" + p.extension + "&rootPath=" + encodeURI($('#CategoryListing').attr('data-rootfolder')) + "&quality=" + p.encodeQuality + "@type=" + p.mediaType;
                    $.ajax({
                        url: _url,
                        type: 'POST',
                        data: formData, //JSON.stringify(mediaFileInfo),

                        processData: false,  // tell jQuery not to process the data
                        contentType: false,  // tell jQuery not to set contentType
                        success: function (result) {
                            p.callback(result);
                        },
                        error: function (jqXHR) {
                        },
                        complete: function (jqXHR, status) {
                        }
                    });
                }
            },
        }
        Uploader.init();
    }
    $.fn.DragUploader = function (p) {
        $.Uploader(p, $(this));
    };
})(this);




/*Media management Main js start */

var MediaLibrary = {
    ReadDOM: function (fileName) {
        var oRequest = new XMLHttpRequest();
        try {
            var URL = SageFrameHostURL + "//cbuilderassets/js/MediaManagement/html/" + fileName + ".html";
            oRequest.open("GET", URL, false);
            //oRequest.setRequestHeader("User-Agent", navigator.userAgent);
            oRequest.send(null);
        }
        catch (message) {
        }
        if (oRequest.status == 200)
            return this.RemoveSpaceFromDOM(oRequest.responseText);
        else
            console.log("Error executing XMLHttpRequest call!");
    },
    RemoveSpaceFromDOM: function (data) {
        if (data != null) {
            return data.replace(/\>\s+\</g, '><').trim();//.replace(/(\r\n|\n|\r)/gm, "").trim();
        }
    },
}

//use MediaLibrary.ReadDOM("mediapopup") to access the necessary change
var MediaDOMS = {
    docaction: `<ul class="flex-box actionLists"><li class="chooseMedia actions"><span><i class="fa fa-check" aria-hidden="true"></i> Use This</span></li><li class="move actions" style="display:none;"><span class="move-to-folder"><i class="fa fa-arrows" aria-hidden="true"></i> Move to</span><ul class="move-target-wrap" style="display:none;"><li>While moving, same named folders will be merged and same named files will be replaced. </li><li class="opened"><span class="folderherarchy" data-path="Media">Media</span><ul><li><span class="folderherarchy" data-path="Media/one">one</span></li></ul></li></ul></li><li class="renameFile actions"><span><i class="fa fa-font" aria-hidden="true"></i>Rename</span></li><li class="deleteMedia actions"><span class="delete-item"><i class="fa fa-trash-o" aria-hidden="true"></i> </span></li></ul>`,
    effect: `<div class="btn-row flex-box"><div id="backtoMediaList" class="back-to-btn"><i class="fa fa-chevron-left" aria-hidden="true"></i>Back
    </div><div class="crop-n-save"><span id="btnSaveCroppedImage" class="btn btn-primary"><span class="crop-and-save"><span><span class="fa fa-crop"></span>Crop &amp; save
                </span></span></span></div></div><div id="imagemanipulate" class="imagemanipulate"><div id="CropImageWrapper" class="sfCol_100"><div class="container"><div class="row flex-box"><div class="docs-preview clearfix"><div class="img-media-preview preview-lg" style="width: 45px; height: 25.3125px;"><img src="" style="display: block; width: 56.25px; height: 31.6406px; min-width: 0px !important; min-height: 0px !important; max-width: none !important; max-height: none !important; margin-left: -5.625px; margin-top: -3.16406px; transform: none;"></div></div><div class="crop-area"><div class="img-container"><img id="imgCropping" src="" alt="Picture"></div></div><div class="crop-tools"><div class="tools-bg"><div class="mysite" style="width: 254.222px; height: 143px; display: none;"><img id="clientImage" src="" style="display: block; width: 409.185px; height: 230.167px; min-width: 0px ! important; min-height: 0px ! important; max-width: none ! important; max-height: none ! important; image-orientation: 0deg ! important; margin-left: -111.869px; margin-top: -45.902px; transform: none;"></div><div class="docs-data" style="display: none;"><div class="input-group input-group-sm"><label class="input-group-addon" for="dataX">X</label><input class="form-control" id="dataX" placeholder="x" value="350" type="text"><span class="input-group-addon">px</span></div><div class="input-group input-group-sm"><label class="input-group-addon" for="dataY">Y</label><input class="form-control" id="dataY" placeholder="y" value="144" type="text"><span class="input-group-addon">px</span></div><div class="input-group input-group-sm"><label class="input-group-addon" for="dataWidth">Width</label><input class="form-control" id="dataWidth" placeholder="width" value="795" type="text"><span class="input-group-addon">px</span></div><div class="input-group input-group-sm"><label class="input-group-addon" for="dataHeight">Height</label><input class="form-control" id="dataHeight" placeholder="height" value="447" type="text"><span class="input-group-addon">px</span></div><div class="input-group input-group-sm"><label class="input-group-addon" for="dataRotate">Rotate</label><input class="form-control" id="dataRotate" placeholder="rotate" value="0" type="text"><span class="input-group-addon">deg</span></div><div class="input-group input-group-sm"><label class="input-group-addon" for="dataScaleX">ScaleX</label><input class="form-control" id="dataScaleX" placeholder="scaleX" value="1" type="text"></div><div class="input-group input-group-sm"><label class="input-group-addon" for="dataScaleY">ScaleY</label><input class="form-control" id="dataScaleY" placeholder="scaleY" value="1" type="text"></div></div><div class="row" id="actions"><div class="acp-ratios docs-toggles" style="display:none;"><div class="btn-group docs-aspect-ratios" data-toggle="buttons"><h2>Aspect Ratios</h2><label class="btn btn-primary active"><input class="sr-only" id="aspectRatio1" name="aspectRatio" value="1.7777777777777777" type="radio"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="aspectRatio: 16 / 9">16:9</span></label><label class="btn btn-primary"><input class="sr-only" id="aspectRatio2" name="aspectRatio" value="1.3333333333333333" type="radio"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="aspectRatio: 4 / 3">4:3</span></label><label class="btn btn-primary"><input class="sr-only" id="aspectRatio3" name="aspectRatio" value="1" type="radio"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="aspectRatio: 1 / 1">1:1</span></label><label class="btn btn-primary"><input class="sr-only" id="aspectRatio4" name="aspectRatio" value="0.6666666666666666" type="radio"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="aspectRatio: 2 / 3">2:3</span></label><label class="btn btn-primary"><input class="sr-only" id="aspectRatio5" name="aspectRatio" value="NaN" type="radio"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="aspectRatio: NaN">Free</span></label></div></div><div class="docs-buttons"><h2>Cropping Options</h2><div class="btn-group"><button type="button" class="btn btn-primary" data-method="zoom" data-option="0.1" title="Zoom In"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.zoom(0.1)"><span class="fa fa-search-plus"></span></span></button><button type="button" class="btn btn-primary" data-method="zoom" data-option="-0.1" title="Zoom Out"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.zoom(-0.1)"><span class="fa fa-search-minus"></span></span></button></div><div class="btn-group"><button type="button" class="btn btn-primary" data-method="move" data-option="-10" data-second-option="0" title="Move Left"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.move(-10, 0)"><span class="fa fa-arrow-left"></span></span></button><button type="button" class="btn btn-primary" data-method="move" data-option="10" data-second-option="0" title="Move Right"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.move(10, 0)"><span class="fa fa-arrow-right"></span></span></button><button type="button" class="btn btn-primary" data-method="move" data-option="0" data-second-option="-10" title="Move Up"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.move(0, -10)"><span class="fa fa-arrow-up"></span></span></button><button type="button" class="btn btn-primary" data-method="move" data-option="0" data-second-option="10" title="Move Down"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.move(0, 10)"><span class="fa fa-arrow-down"></span></span></button></div><div class="btn-group"><button type="button" class="btn btn-primary" data-method="rotate" data-option="-45" title="Rotate Left"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.rotate(-45)"><span class="fa fa-rotate-left"></span></span></button><button type="button" class="btn btn-primary" data-method="rotate" data-option="45" title="Rotate Right"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.rotate(45)"><span class="fa fa-rotate-right"></span></span></button></div><div class="btn-group"><button type="button" class="btn btn-primary" data-method="scaleX" data-option="-1" title="Flip Horizontal"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.scaleX(-1)"><span class="fa fa-arrows-h"></span></span></button><button type="button" class="btn btn-primary" data-method="scaleY" data-option="-1" title="Flip Vertical"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.scaleY(-1)"><span class="fa fa-arrows-v"></span></span></button></div><div class="btn-group"><button type="button" class="btn btn-primary" data-method="reset" title="Reset"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.reset()"><span class="fa fa-refresh"></span></span></button></div><div class="btn-group btn-group-crop"><button id="btnCropped" style="display: none;" type="button" class="btn btn-primary" data-method="getCroppedCanvas"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.getCroppedCanvas()">Crop</span></button></div></div></div></div></div></div></div></div></div>`,
    videoaction: `<ul class="flex-box actionLists"><li class="chooseMedia actions"><span><i class="fa fa-check" aria-hidden="true"></i> Use This</span></li><li class="previewVideo actions"><span><i class="fa fa-eye" aria-hidden="true"></i> Preview</span></li><li class="move actions" style="display:none;"><span class="move-to-folder"><i class="fa fa-arrows" aria-hidden="true"></i> Move to</span><ul class="move-target-wrap" style="display:none;"><li>While moving, same named folders will be merged and same named files will be replaced. </li><li class="opened"><span class="folderherarchy" data-path="Media">Media</span><ul><li><span class="folderherarchy" data-path="Media/one">one</span></li></ul></li></ul></li><li class="renameFile actions"><span><i class="fa fa-font" aria-hidden="true"></i>Rename</span></li><li class="deleteMedia actions"><span class="delete-item"><i class="fa fa-trash-o" aria-hidden="true"></i> </span></li></ul>`,
    folder: `<div class="frame type-folder" data-type="category"><span><i class="fa fa-folder-open"></i></span><span class="chkmedia"><input type="Checkbox" class="checkboximage normalchk"><label></label></span><span class="openSettings fa fa-ellipsis-h" style="display:none;"></span></div><span class="openfolder folderName">New Folder</span><span class="editableFolderName" style="display:none;"><input value="New Folder" type="text" class="txtEditableFolderName" /></span>`,
    imgaction: `<ul class="flex-box actionLists"><li class="altinput"><label>Alt <input type="text" class="imgalt" /></label></li><li data-tpath="" class="chooseImagesize actions no-tm"><span><i class="fa fa-check" aria-hidden="true"></i>Use Image</span><ul class="image-size-wrap" style="display:none;"><li data-tpath="/MediaThumb/original" class="chooseMedia actions tm"><span> Use ExtraLarge</span></li><li data-tpath="/MediaThumb/large" class="chooseMedia actions tm"><span> Use Large</span></li><li data-tpath="/MediaThumb/medium" class="chooseMedia actions tm"><span> Use Medium</span></li><li data-tpath="" class="chooseMedia actions tm"><span>Use Small</span></li></ul></li><li class="previewMedia actions"><span><i class="fa fa-eye" aria-hidden="true"></i> Preview</span></li><li class="move actions" style="display:none;"><span class="move-to-folder"><i class="fa fa-arrows" aria-hidden="true"></i> Move to</span><ul class="move-target-wrap" style="display:none;"></ul></li><li class="selectimage actions"><span><i class="fa fa-sliders" aria-hidden="true"></i> Effects</span></li><li class="renameFile actions"><span><i class="fa fa-font" aria-hidden="true"></i> Rename</span></li><li class="deleteMedia actions"><span class="delete-item"><i class="fa fa-trash-o" aria-hidden="true"></i></span></li></ul>`,
    mediaPopup: `<input type="hidden" value="0" id="hdnMediaSettingID" /><div class="popup-fade-bg popup-model-wrap PopupContents"><div class="popup-model media-pop-model"><div class="model-header flex-box"><h2 class="model-title"><i class="fa fa-picture-o" aria-hidden="true"></i> Media Store</h2><span class="close-model  closemediapop"><i class="fa fa-times" aria-hidden="true"></i></span></div><!--ends--><!--Search media--><div class="media-search-model flex-box"><div class="search-box local-search"><input id="localsearch" type="text" placeholder="Search from local" /><span class="search-btn" id="btnLocalSearch"><i class="fa fa-search" aria-hidden="true"></i></span></div><div class="search-box online-search"><input id="onlinesearch" type="text" placeholder="Search from online" /><span class="search-btn" id="btnOnlineSearch"><i class="fa fa-search" aria-hidden="true"></i></span></div><span class="fa fa-refresh" id="refreshSearch"></span><div class="settingWrapper"><span class="fa fa-cog" id="showSettings"></span><div class="mediaSettingList" style="display:none;"><span id="closeSettings"><i class="fa fa-times" aria-hidden="true"></i></span><ul><li><label>
                                APIKEY:
                                <input id="pixabayApikey" type="text" placeholder="pixabay API key"></label><span class="action-btns btn-row"><span class="saveapikey" id="saveapikey">Save</span></span><span class="notelink"><ul><li>Sign Up in <a href="https://pixabay.com/en/accounts/register/" target="_blank">pixabay</a></li><li>and then get<a href="https://pixabay.com/api/docs/#api_key" target="_blank">API Key</a>.</li><li>Paste the key in the textbox. And enjoy Online high quality images for free from <a href="https://pixabay.com/" target="_blank">Pixbay</a></li></ul></span></li></ul></div></div><span class="action-btns btn-row"><span class="create-folder" id="CreateFolder">Create Folder</span></span></div><!--Ends--><div class="model-body flex-box"><div class="left-side"><h2>Folders</h2><div class="root-branch"></div></div><div class="right-side"><div class="divBreadcrumb"></div><div class="drop-media flex-box"><div class="fileUploader"></div><div class="uploadError"><span class="notValidExtension" style="display:none;">Not a valid Extension</span></div><!--<i class="fa fa-upload" aria-hidden="true"></i>  Drop your file here or<span class="btn-row"><input type="file" class="up-file-input" id="upFile" placeholder="Upload File" /><label for="upFile" class="up-file">Upload File</label></span>--></div><!--Ends--><!--Media file wrap--><div class="imageaction"><span class="choosefiles">Select document below</span></div><div class="media-wrap CategoryListing" id="CategoryListing"></div></div><div class="right-right-side" style="display: none;"><div class="btn-row flex-box"><div id="backtoMediaList" class="back-to-btn"><i class="fa fa-chevron-left" aria-hidden="true"></i>Back
                    </div><div class="crop-n-save"><span id="btnSaveCroppedImage" class="btn btn-primary"><span class="crop-and-save"><span><span class="fa fa-crop"></span>Crop &amp; save
                                </span></span></span></div></div><div id="imagemanipulate" class="imagemanipulate"><div id="CropImageWrapper" class="sfCol_100"><div class="container"><div class="row flex-box"><div class="docs-preview clearfix"><div class="img-media-preview preview-lg" style="width: 45px; height: 25.3125px;"><img src="" style="display: block; width: 56.25px; height: 31.6406px; min-width: 0px !important; min-height: 0px !important; max-width: none !important; max-height: none !important; margin-left: -5.625px; margin-top: -3.16406px; transform: none;"></div></div><div class="crop-area"><div class="img-container"><img id="imgCropping" src="" alt="Picture"></div></div><div class="crop-tools"><div class="tools-bg"><div class="mysite" style="width: 254.222px; height: 143px; display: none;"><img id="clientImage" src="" style="display: block; width: 409.185px; height: 230.167px; min-width: 0px ! important; min-height: 0px ! important; max-width: none ! important; max-height: none ! important; image-orientation: 0deg ! important; margin-left: -111.869px; margin-top: -45.902px; transform: none;"></div><div class="docs-data" style="display: none;"><div class="input-group input-group-sm"><label class="input-group-addon" for="dataX">X</label><input class="form-control" id="dataX" placeholder="x" value="350" type="text"><span class="input-group-addon">px</span></div><div class="input-group input-group-sm"><label class="input-group-addon" for="dataY">Y</label><input class="form-control" id="dataY" placeholder="y" value="144" type="text"><span class="input-group-addon">px</span></div><div class="input-group input-group-sm"><label class="input-group-addon" for="dataWidth">Width</label><input class="form-control" id="dataWidth" placeholder="width" value="795" type="text"><span class="input-group-addon">px</span></div><div class="input-group input-group-sm"><label class="input-group-addon" for="dataHeight">Height</label><input class="form-control" id="dataHeight" placeholder="height" value="447" type="text"><span class="input-group-addon">px</span></div><div class="input-group input-group-sm"><label class="input-group-addon" for="dataRotate">Rotate</label><input class="form-control" id="dataRotate" placeholder="rotate" value="0" type="text"><span class="input-group-addon">deg</span></div><div class="input-group input-group-sm"><label class="input-group-addon" for="dataScaleX">ScaleX</label><input class="form-control" id="dataScaleX" placeholder="scaleX" value="1" type="text"></div><div class="input-group input-group-sm"><label class="input-group-addon" for="dataScaleY">ScaleY</label><input class="form-control" id="dataScaleY" placeholder="scaleY" value="1" type="text"></div></div><div class="row" id="actions"><div class="acp-ratios docs-toggles" style="display:none;"><div class="btn-group docs-aspect-ratios" data-toggle="buttons"><h2>Aspect Ratios</h2><label class="btn btn-primary active"><input class="sr-only" id="aspectRatio1" name="aspectRatio" value="1.7777777777777777" type="radio"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="aspectRatio: 16 / 9">16:9</span></label><label class="btn btn-primary"><input class="sr-only" id="aspectRatio2" name="aspectRatio" value="1.3333333333333333" type="radio"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="aspectRatio: 4 / 3">4:3</span></label><label class="btn btn-primary"><input class="sr-only" id="aspectRatio3" name="aspectRatio" value="1" type="radio"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="aspectRatio: 1 / 1">1:1</span></label><label class="btn btn-primary"><input class="sr-only" id="aspectRatio4" name="aspectRatio" value="0.6666666666666666" type="radio"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="aspectRatio: 2 / 3">2:3</span></label><label class="btn btn-primary"><input class="sr-only" id="aspectRatio5" name="aspectRatio" value="NaN" type="radio"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="aspectRatio: NaN">Free</span></label></div></div><div class="docs-buttons"><h2>Cropping Options</h2><div class="btn-group"><button type="button" class="btn btn-primary" data-method="zoom" data-option="0.1" title="Zoom In"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.zoom(0.1)"><span class="fa fa-search-plus"></span></span></button><button type="button" class="btn btn-primary" data-method="zoom" data-option="-0.1" title="Zoom Out"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.zoom(-0.1)"><span class="fa fa-search-minus"></span></span></button></div><div class="btn-group"><button type="button" class="btn btn-primary" data-method="move" data-option="-10" data-second-option="0" title="Move Left"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.move(-10, 0)"><span class="fa fa-arrow-left"></span></span></button><button type="button" class="btn btn-primary" data-method="move" data-option="10" data-second-option="0" title="Move Right"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.move(10, 0)"><span class="fa fa-arrow-right"></span></span></button><button type="button" class="btn btn-primary" data-method="move" data-option="0" data-second-option="-10" title="Move Up"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.move(0, -10)"><span class="fa fa-arrow-up"></span></span></button><button type="button" class="btn btn-primary" data-method="move" data-option="0" data-second-option="10" title="Move Down"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.move(0, 10)"><span class="fa fa-arrow-down"></span></span></button></div><div class="btn-group"><button type="button" class="btn btn-primary" data-method="rotate" data-option="-45" title="Rotate Left"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.rotate(-45)"><span class="fa fa-rotate-left"></span></span></button><button type="button" class="btn btn-primary" data-method="rotate" data-option="45" title="Rotate Right"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.rotate(45)"><span class="fa fa-rotate-right"></span></span></button></div><div class="btn-group"><button type="button" class="btn btn-primary" data-method="scaleX" data-option="-1" title="Flip Horizontal"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.scaleX(-1)"><span class="fa fa-arrows-h"></span></span></button><button type="button" class="btn btn-primary" data-method="scaleY" data-option="-1" title="Flip Vertical"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.scaleY(-1)"><span class="fa fa-arrows-v"></span></span></button></div><div class="btn-group"><button type="button" class="btn btn-primary" data-method="reset" title="Reset"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.reset()"><span class="fa fa-refresh"></span></span></button></div><div class="btn-group btn-group-crop"><button id="btnCropped" style="display: none;" type="button" class="btn btn-primary" data-method="getCroppedCanvas"><span class="docs-tooltip" data-toggle="tooltip" title="" data-original-title="cropper.getCroppedCanvas()">Crop</span></button></div></div></div></div></div></div></div></div></div></div></div><!--ends--></div></div><div class="media-pop-input" style="display:none;"><div class="input_wrp"><label>Image Description</label><input type="text" class="c_input txtMediaImageAltTag" placeholder="Enter Image description" /><p>This is used for search engine</p></div><div class="btn-wrp"><button type="button" class="btn-alt btnImageAltOK">OK</button></div></div><!--customize responsive popup for image preview--><div class="pop-up-parent-bg flex-box" style="display:none;"><span class="close-model" id="closePreviewImage"><i class="fa fa-times" aria-hidden="true"></i></span><div class="view-wrap"></div></div><!--ends-->`
    , checkbox: `<span class="chkmedia"><input type="Checkbox" class="checkboximage normalchk" / ><label></label></span>`,
    folderaction: `<ul class="flex-box actionLists"><li class="selectFolder actions"><span><i class="fa fa-folder-open-o" aria-hidden="true"></i>Open
        </span></li><li class ="move actions" style="display:none;"><span class ="move-to-folder"><i class ="fa fa-arrows" aria-hidden="true"></i> Move to</span><ul class ="move-target-wrap" style="display:none;"><li>While moving, same named folders will be merged and same named files will be replaced.</li><li class="opened"><span class="folderherarchy" data-path="Media">Media</span><ul><li><span class ="folderherarchy" data-path="Media/one">one</span></li></ul></li></ul></li><li class ="renamefolder actions"><span><i class ="fa fa-font" aria-hidden="true"></i>Rename</span></li><li class="deleteMedia actions"><span class="delete-item"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete
        </span></li></ul>`,
    nomultiple: `<ul class="flex-box actionLists"><li class="deleteMedia actions"><span class="delete-item"><i class="fa fa-trash-o" aria-hidden="true"></i></span></li></ul>`,
};



var $MediaHelper = '';
//var script = document.createElement('script');
//var scriptCropper = document.createElement('script');
//var scriptCropperMain = document.createElement('script');
//var script = document.createElement('script');
var fontScript = document.createElement('link');
var styleLink = document.createElement('link');
$.fn.SageMedia = function (options) {
    $MediaHelper = $(this);
    var eventType = $MediaHelper.attr('data-event');
    if (typeof eventType != "undefined" && eventType == 'click') {
        $MediaHelper.off().on('click', function () {
            return $MediaHelper.ManageMedia(options);
        });
    }
    else {
        return $MediaHelper.ManageMedia(options);
    }
};
var popUpState = null;
//$.fn.MediaPopUP = function (data) {
//    //$('body').append($('.mediamanagementwrapper').html());
//    $('.mediapopups').show();
//    //$('.PopupContents').append($('#message').find('.sfMessagewrapper'));
//    $('.closemediapop').off().on('click', function () {
//        $(this).CancelMediaPopUP();

//    });
//};
$.fn.CancelMediaPopUP = function () {
    $('.mediapopups').hide();
    //$('#message').append($('.PopupContents').find('.sfMessagewrapper'));
    //$('body').find('.fade').remove();
    //$('body').find('.PopupContents').remove();
    //$('body').find('.pop-up-parent-bg.flex-box').remove();
    //$('.media-pop-input').remove();
    //$('#hdnMediaSettingID').remove();
    //document.body.removeChild(script);
    //document.body.removeChild(scriptCropper);
    //document.body.removeChild(scriptCropperMain);
    //if (styleLink.length > 0)
    //    document.getElementsByTagName('head')[0].removeChild(styleLink);
    //if (fontScript.length > 0)
    //    document.getElementsByTagName('head')[0].removeChild(fontScript);
};
var objMediaSettings = {
    'FolderName': '',
    'MediaVisibility': '',
    'MediaReadLocation': '',
    'MediaIgnoreFolders': '',
    'AllowCategory': '',
    'ImageExtension': '',
    'VideoExtension': '',
    'DocumentExtension': '',
    'PixabayApiKey': '7145932-45a1d0cf51843b04a49f8e52a'
};
var globalMediaSetings = {};
var mediaConfig = {
    modulePath: '/',
    userModuleID: '',
    culture: 'en-US',
    defaultCSS: true,
    fullPath: false, //fullpath includes the hostURL
    mediaType: "*", // image, document, video,*
    SaveLocation: "",
    success: function () { },
    onSelect: function () { },
    multipleselect: false
};
$.fn.ManageMedia = function (options) {
    var $input = $(this);
    var pageSize = 40;
    var pageCount = 1;
    var p = $.extend({
        modulePath: '/',
        userModuleID: '',
        culture: 'en-US',
        defaultCSS: true,
        fullPath: false, //fullpath includes the hostURL
        mediaType: "*", // image, document, video,*
        SaveLocation: "",
        success: '',
        onSelect: '',
        multipleselect: false
    }, options);
    //var action = MediaLibrary.ReadDOM("imgaction");
    //var documentAction = MediaLibrary.ReadDOM("doc-action");
    //var videoAction = MediaLibrary.ReadDOM("video-action");
    //var folderDOM = MediaLibrary.ReadDOM('folder');
    let Media = {
        config: {
            isPostBack: false,
            async: false,
            cache: false,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: '{}',
            dataType: 'json',
            crossDomain: true,
            //baseURL: p.modulePath + 'Services/webservice.asmx/',
            baseURL: p.modulePath + 'MediaManagement/',
            method: "",
            url: "",
            ajaxCallMode: "",
            userModuleID: p.userModuleID,
            mediaType: p.mediaType,
            onSelect: p.onSelect,
            success: p.success,
            multipleselect: p.multipleselect
        },
        init: function () {
            this.Events();
        },
        SearchLocal: function ($this, e) {
            $this.attr('data-search', 'ongoing');
            var rootFolderPath = $('#CategoryListing').attr('data-rootfolder');
            var filterFile = $('#localsearch').val().trim();
            if (filterFile.length > 0) {
                if (rootFolderPath.length > 0 && filterFile.length > 0) {
                    if (typeof e === 'undefined') {
                        $this.attr('data-search', 'searched');
                        //Media.FilterMediaByPath(rootFolderPath, filterFile);
                        Media.GetmediaCategoryByPath(rootFolderPath, filterFile);
                        Media.ShowImageList();
                    }
                    else {
                        if (e.keyCode == 13) {
                            $this.attr('data-search', 'searched');
                            //Media.FilterMediaByPath(rootFolderPath, filterFile);
                            Media.GetmediaCategoryByPath(rootFolderPath, filterFile);
                            Media.ShowImageList();
                        }
                    }
                }
            }
        },
        SearchOnline: function ($this, e) {
            pageCount = 1;
            $this.attr('data-search', 'ongoing');
            var filterFile = $('#onlinesearch').val().trim().replace(/' '/g, '+');
            if (filterFile.length > 0) {
                if (typeof e === 'undefined') {
                    $("#CategoryListing").html('');
                    $this.attr('data-search', 'searched');
                    Media.RequestImage(pageCount, filterFile);
                }
                else {
                    if (e.keyCode == 13) {
                        $("#CategoryListing").html('');
                        $this.attr('data-search', 'searched');
                        Media.RequestImage(pageCount, filterFile);
                    }
                }
            }
        },
        PopUpEvents: function () {

            $('#localsearch').on('keyup', function (e) {
                $('#onlinesearch').val('');
                Media.SearchLocal($(this), e);
            });
            $('#btnLocalSearch').on('click', function (e) {
                Media.SearchLocal($(this));
            });
            $('#onlinesearch').on('keyup', function (e) {
                $('#localsearch').val('');
                Media.SearchOnline($(this), e);
            });
            $('#btnOnlineSearch').on('click', function (e) {
                Media.SearchOnline($(this));
            });
            $('#refreshSearch').on('click', function () {
                $('#onlinesearch').val('');
                $('#localsearch').val('');
                //Media.FilterMediaByPath($('#CategoryListing').attr('data-rootfolder'), '*');
                Media.GetmediaCategoryByPath($('#CategoryListing').attr('data-rootfolder'), '*');
                Media.CreateBreadcrumb();
                Media.ShowDroppableZone();
            });
            $('#CreateFolder').off().on('click', function () {
                var rootfolderPath = $('#CategoryListing').attr('data-rootfolder');
                var name = Media.GetUniqueName('New Folder');
                var $folderDOM = $('<div class="items noimage" data-path="' + rootfolderPath + '\\' + name + '">' + MediaDOMS.folder + '</div>');
                $('#CategoryListing').prepend($folderDOM);
                $folderDOM.find('.editableFolderName').show();
                $folderDOM.find('.openfolder.folderName').hide().text(name);
                Media.AddCategory(name, rootfolderPath);
                $folderDOM.find('.txtEditableFolderName').focus().select().val(name);
                $folderDOM.find('.txtEditableFolderName').attr('data-oldname', name);
                $folderDOM.find('.txtEditableFolderName').attr('data-changed', 'ongoing');
                //Media.GetFolderHerarchy();
                //Media.CloseFolders($('.mediaCategoryHierrarchy').find('span[data-path="' + rootfolderPath.replace(/\\/g, '/') + '"]'));
                //Media.FolderMoveList();
                //Media.MediaBindEvents();
            });
            Media.ClosePreviewPopUp();
            $('#showSettings').off().on('click', function () {
                $('.mediaSettingList').show();
            });
            $('#closeSettings').off().on('click', function () {
                $('.mediaSettingList').hide();
            });
            $('#saveapikey').off().on('click', function () {
                globalMediaSetings.MediaSetting.PixabayApiKey = $('#pixabayApikey').val().trim();
                Media.SaveSettings(globalMediaSetings);
            });
            $('body').on('click', function (e) {

            });
        },
        ClosePreviewPopUp: function () {
            $('#closePreviewImage').off('click').on('click', function () {
                $('.pop-up-parent-bg.flex-box').hide();
                $('.view-wrap').html('');
                $('.pop-up-parent-bg .ImagDetails').remove();
                $('.media-pop-input').hide();
            });
        },
        ImageCropEvent: function () {
            $('#btnSaveCroppedImage').off().on('click', function () {
                $('#btnCropped').trigger('click');
                var imageCropping = $('#imgCropping');
                var folderPath = imageCropping.attr('data-imagepath');
                var image64 = $('#clientImage').attr('src');
                if (folderPath != null && folderPath.length > 0) {
                    Media.SaveCroppedImage(folderPath, image64);
                }
            });
        },
        GetUniqueName: function (name) {
            $('.folderName').each(function (i, v) {
                var fName = $(this).text().trim();
                if (fName.trim().toLowerCase() === name.trim().toLowerCase()) {
                    var names = name.split('_');
                    if (names.length > 1) {
                        count = parseInt(names[1]);
                        count++;
                    }
                    else {
                        count = 1;
                    }
                    name = names[0] + "_" + count;
                    name = Media.GetUniqueName(name);
                }
            });
            return name;
        },

        //online Image
        //https://pixabay.com/api/docs/
        RequestImage: function (pageCount, request, callback) {
            var self = this;
            request = encodeURIComponent(request.trim());
            //Media.PixabayGet(pageCount, request, callback);
            Media.CommonPixaBayGet(pageCount, request, callback);
        },
        PixabayGet: function (pageCount, request, callback) {

            var self = this;
            var ajaxRequest = $.ajax({
                url: "https://pixabay.com/api/?&key=" + globalMediaSetings.MediaSetting.PixabayApiKey + "&q=" + request
                    + "&image_type=photo&response_group=image_details"
                    + "&per_page=" + pageSize
                    + "&page=" + pageCount
                ,
                success: function (response) {
                    Media.ParseResponse(response);
                },
                error: function (response) {
                    var html = '<div class="apierror">Something went wrong.</div>';
                    $("#CategoryListing").append(html);
                }
            });
            ajaxRequest.then(function () {
                if (callback) {
                    callback();
                }
            });
        },
        CommonPixaBayGet: function (pageCount, request, callback) {
            var apiKey = globalMediaSetings.MediaSetting.PixabayApiKey;

            $.ajax({
                type: 'GET',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', apiKey);
                },
                url: 'http://52.170.3.135:9207/api/Search?query=' + request + '&page=' + pageCount + '&perPage=' + pageSize,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (result) {
                    // logic here
                    Media.ParseCommonPixaBayResponse(result);
                }
            });



        },

        ParseCommonPixaBayResponse: function (response) {
            var self = this;
            var html = '';
            var onlineResultCount = response.totalHits;
            $.each(response.photos, function (index, value) {
                var downloadLink = value.largeImageURL;//.replace('_640', '_960');
                var src = value.previewURL;
                var alt = value.tags;
                html += `<div class="items makeitgood" data-path="${downloadLink}"  data-w="${value.previewWidth}" data-h="${value.previewHeight}">
                            <div data-type="image" class="frame type-img">
                                <img  src="${src}" alt="${alt}" title="${alt}" />
                            <div class ="type-action" style="display:none;">
                               <ul class ="type-action-list">
                                    <li class ="viewImage actions"><span><i class ="fa fa-eye" aria-hidden="true"></i>View</span></li>
                                    <li class ="downloadImage actions"><span class ="download"><i class ="fa fa-download" aria-hidden="true"></i> Download</span></li>
                                </ul>
                            </div>
                            <span class ="openSettings fa fa-ellipsis-h"></span>
                            </div>
                         </div>`;
            });
            if (html.length === 0)
                html += '<li class="nomediaData"></li>';
            $("#CategoryListing").append(html);
            if ($('#CategoryListing .creditpixabay').length == 0) {
                var html = '<div class="creditpixabay">';
                html += '<a href="https://pixabay.com/" target="_blank" class="credit"> Free Images From';
                html += '<img height="30px" src="/Modules/Admin/MediaManagement/img/logo.png" />';
                html += '</a></div>';
                $("#CategoryListing").append(html);
            }
            Media.SettingOpenEvent();
            Media.OnlineImageEvents();
            Media.ShowImageList();
            Media.HideDroppableZone();
            Media.InitMasonary();
            $('#CategoryListing').parent().off('scroll').on('scroll', function (e) {
                var elem = $(e.currentTarget);
                if (elem[0].scrollHeight - elem.scrollTop() < elem.outerHeight() + 20) {
                    if (pageCount * pageSize < onlineResultCount) {
                        pageCount = pageCount + 1;
                        var filterFile = $('#onlinesearch').val().trim().replace(/' '/g, '+');
                        Media.RequestImage(pageCount, filterFile);
                    }
                }
            });
        },
        ParseResponse: function (response) {
            var self = this;
            var html = '';
            var onlineResultCount = response.totalHits;
            $.each(response.hits, function (index, value) {
                var downloadLink = value.webformatURL;//.replace('_640', '_960');
                var src = value.previewURL;
                var alt = value.tags;
                html += `<div class="items makeitgood" data-path="${downloadLink}"  data-w="${value.previewWidth}" data-h="${value.previewHeight}">
                            <div data-type="image" class="frame type-img">
                                <img  src="${src}" alt="${alt}" title="${alt}" />
                            <div class ="type-action" style="display:none;">
                               <ul class ="type-action-list">
                                    <li class ="viewImage actions"><span><i class ="fa fa-eye" aria-hidden="true"></i>View</span></li>
                                    <li class ="downloadImage actions"><span class ="download"><i class ="fa fa-download" aria-hidden="true"></i> Download</span></li>
                                </ul>
                            </div>
                            <span class ="openSettings fa fa-ellipsis-h"></span>
                            </div>
                         </div>`;
            });
            if (html.length === 0)
                html += '<li class="nomediaData"></li>';
            $("#CategoryListing").append(html);
            if ($('#CategoryListing .creditpixabay').length == 0) {
                var html = '<div class="creditpixabay">';
                html += '<a href="https://pixabay.com/" target="_blank" class="credit"> Free Images From';
                html += '<img height="30px" src="/Modules/Admin/MediaManagement/img/logo.png" />';
                html += '</a></div>';
                $("#CategoryListing").append(html);
            }
            Media.SettingOpenEvent();
            Media.OnlineImageEvents();
            Media.ShowImageList();
            Media.HideDroppableZone();
            Media.InitMasonary();
            $('#CategoryListing').parent().off('scroll').on('scroll', function (e) {
                var elem = $(e.currentTarget);
                if (elem[0].scrollHeight - elem.scrollTop() < elem.outerHeight() + 20) {
                    if (pageCount * pageSize < onlineResultCount) {
                        pageCount = pageCount + 1;
                        var filterFile = $('#onlinesearch').val().trim().replace(/' '/g, '+');
                        Media.RequestImage(pageCount, filterFile);
                    }
                }
            });
        },
        HideDroppableZone: function () {
            $('.drop-media.flex-box').hide();
            $('.divBreadcrumb').hide();
            $('#CategoryListing').addClass('onlinedata');
        },
        ShowDroppableZone: function () {
            $('.drop-media.flex-box').show();
            $('.divBreadcrumb').show();
            $('#CategoryListing').removeClass('onlinedata');
        },
        BindOnlineImages: function (data) {
            var html = '';
            if (data.images.length > 0) {
                onlineResultCount = data.result_count;
                for (var i = 0; i < data.images.length; i++) {
                    var title = data.images[i].title.trim();
                    title = title.replace(/[^a-zA-Z0-9]/g, '-');
                    title = title.replace(/\-+/g, '-');
                    var id = data.images[i].id;
                    var downloadLink = 'http://media.gettyimages.com/photos/' + title + '-picture-id' + id + '';
                    var src = data.images[i].display_sizes[0].uri;
                    html += `<div class="items" data-path="${downloadLink}">
                                <div data-type="image" class="frame type-img">
                                    <img height="100px" src="${src}" />
                                <div class ="type-action">
                                    <ul>
                                        <li class ="viewImage actions"><span><i class ="fa fa-eye" aria-hidden="true"></i>View</span></li>
                                        <li class ="downloadImage actions"><span class ="download"><i class ="fa fa-download" aria-hidden="true"></i> Download</span></li>
                                    </ul>
                                </div>
                                </div>
                            </div>`;
                }
            }
            else {
                html += '<li class="nomediaData"></li>';
            }
            $("#CategoryListing").append(html);

        },
        OnlineImageEvents: function () {
            $('.viewImage').off().on('click', function () {
                $('.ImagDetails').remove();
                var $this = $(this);
                var $parent = $this.parents('.items');
                var href = $parent.attr('data-path');
                var html = '<img id="onlineImagePreview" src="' + href + '" />';
                //dialog pop up
                $('.view-wrap').html(html);

                var height = $parent.attr('data-h');
                var width = $parent.attr('data-w');
                var imageName = $parent.find('.fileName').text();
                var imageDetail = `<div class="ImagDetails">
                            <div class="call-to-actions flex-box">
                                <div class="img-size">
                                    Image Size: <span class ="img-actual-size"><i class ="fa-li fa fa-spinner fa-spin"></i></span>
                                </div>
                                <span class ="btn-on-prevw downloadthisimage"><i class ="fa fa-download" aria-hidden="true"></i>Download</span>
                            </div>
                        </div>`;
                $(imageDetail).insertBefore($('.view-wrap'));
                $("#onlineImagePreview").load(function () {
                    var height = $(this)[0].naturalHeight;
                    var width = $(this)[0].naturalWidth;
                    $('.img-actual-size').text(width + 'X' + height);
                });
                $('.downloadthisimage').on('click', function () {
                    $parent.find('.downloadImage').trigger('click');
                });
                $('.pop-up-parent-bg.flex-box').show();
            });
            $("img.imgOnline").off().on("click", function () {
                var $this = $(this);
                var href = $this.parents('li.liCategory').data('path');
                var html = '<div class="imageOnline"><img src="' + href + '" /></div>';
                $('body').append(html);
                $('.imageOnline').SimpleDialog({
                    "title": "Online Image",
                    "width": 700,
                    "height": 800,
                    "top": 0,
                    "close":
                        function (event, ui) {
                            $('body').find('.imageOnline').remove();
                        }
                });
            });
            $(".downloadImage").off().on("click", function () {
                var downloadImgUrl = $(this).parents('.items').attr('data-path');
                downloadPath = objMediaSettings.FolderName + "/Downloads";
                //SageConfirmDialog('Are you sure you want to download image? The downloaded image will be saved in "Downloads" folder.').done(function () {
                Media.DownloadAndSaveImage(downloadImgUrl, downloadPath);
                //});
            });
            $('.frame.type-img').off('dblclick').on('dblclick', function () {
                $(this).parents('.items').find('.viewImage').trigger('click');
            });
        },
        DownloadAndSaveImage: function (downloadUrl, downloadPath) {

            var downLoadInfo = {
                DownloadURL: downloadUrl,
                DownloadPath: downloadPath
            };

            $.ajax({
                url: '/MediaManagement/DownloadAndSaveImage',
                type: "POST",
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                traditional: true,
                async: true,
                data: JSON.stringify(downLoadInfo),
                success: function (result) {
                    if (result == 1) {
                        var rootDowmloadPath = '';
                        rootDowmloadPath = objMediaSettings.FolderName; //+ '/Downloads';
                        if (objMediaSettings.MediaVisibility == "userwise") {
                            rootDowmloadPath = rootDowmloadPath + '/' + SageFrameUserName;
                        }
                        rootDowmloadPath = rootDowmloadPath + "/Downloads";
                        Media.GetmediaCategoryByPath(rootDowmloadPath, '*');
                        $('#CategoryListing').attr('data-rootfolder', downloadPath);
                        Media.CreateBreadcrumb();
                        Media.GetFolderHerarchy();
                        Media.CloseFolders($('.mediaCategoryHierrarchy').find('span[data-path="' + downloadPath + '"]'));
                        Media.ShowDroppableZone();
                        $('#closePreviewImage').trigger('click');
                    }

                },
                error: function (jqXHR) {

                },
                complete: function (jqXHR, status) {

                }


            });


            //this.config.method = "DownloadAndSaveImage";
            //this.config.url = this.config.baseURL + this.config.method;
            //this.config.data = JSON2.stringify({
            //    downloadUrl: downloadUrl,
            //    downloadPath: downloadPath
            //});
            //this.config.ajaxCallMode = 6;
            //this.ajaxCall(this.config);
        },

        //FilterMediaByPath: function (baseCategoryPath, filter) {
        //    var objMedaicategory =
        //    {
        //        //PortalID: 1,
        //        PortalID: parseInt(1),
        //        UserModuleID: p.userModuleID,
        //        UserName: SageFrameUserName,
        //        secureToken: SageFrameSecureToken,
        //        BaseCategory: baseCategoryPath,
        //        Filter: "*" + filter + "*"
        //    };
        //    this.config.method = "FilterMediaByPath";
        //    this.config.url = this.config.baseURL + this.config.method;
        //    this.config.data = JSON2.stringify({
        //        objMedaicategory: objMedaicategory,
        //    });
        //    this.config.ajaxCallMode = 4;
        //    this.ajaxCall(this.config);
        //},
        fileUpload: function (filePath) {
            var html = '<div class="droppable" id="dvUploadWrapperDrop"><p>Drag files here or click to upload</p></div>';
            $('.fileUploader').html(html);
            Media.FileUploader('MediaFile',
                "#dvUploadWrapperDrop",
                '.productList',
                'png,jpg,gif,jpeg,ico,svg',
                filePath + '/',
                Media.FileUploaded);
        },
        FileUploader: function (fileClassName, dragZone, outputMessageID, extension, savaPath, callback) {
            $(this).DragUploader({
                extension: extension,
                response: '',
                outputMessageID: outputMessageID,
                fileClassName: fileClassName,
                UserName: SageFrameUserName,
                path: p.componentPath,
                dragZone: dragZone,
                savaPath: savaPath,
                callback: callback,
                mediaType: Media.config.mediaType,
                UploadHandlerPath: "" //SageFrameAppPath + '/'
            });
        },
        FileUploaded: function (response) {
            $('.notValidExtension').hide();
            if (response != null) {
                var resp = response.split("###");
                if (resp[0] == "1") {
                    var rootFolderPath = $('#CategoryListing').attr('data-rootfolder');
                    Media.GetmediaCategoryByPath(rootFolderPath, '');
                }
                else {
                    $('.notValidExtension').show();
                    setTimeout(function () {
                        $('.notValidExtension').hide();
                    }, 5000);
                }
            }
        },
        //Show: function (options) {
        //    let config = this.config;
        //    console.log(config);
        //    //console.log(this);
        //    mediaConfig = $.extend(config, mediaConfig);
        //    $('.mediapopups').show();
        //},
        Events: function () {
            //$(this).MediaPopUP();
            $('.closemediapop').off().on('click', function () {
                $(this).CancelMediaPopUP();
            });
            Media.GetSettings(1, 2);
        },
        BindFolderHirarchy: function (data, path) {
            $('.root-branch').html(data);
            if (typeof path === 'undefined')
                path = $('.mediaCategoryHierrarchy').find('span[data-path="' + objMediaSettings.FolderName.replace(/\\/g, '/') + '"]');
            Media.CloseFolders(path);
            $('.mediaCategoryHierrarchy').show();
            Media.FolderEvent();
        },
        CloseFolders: function ($root) {
            $('.mediaCategoryHierrarchy > li > ul').each(function () {
                $(this).find('ul').addClass('hide-folder');
            });
            $root.siblings().each(function () {
                $(this).removeClass('hide-folder');
            });
            $root.parents('ul').each(function () {
                $(this).removeClass('hide-folder');
            });
            $('.mediaCategoryHierrarchy li.opened').removeClass('opened');
            $root.parent().addClass('opened');
        },
        FolderEvent: function () {
            $('.mediaCategoryHierrarchy').show();

            $('#CreateFolder').off().on('click', function () {
                var rootfolderPath = $('#CategoryListing').attr('data-rootfolder');
                var name = Media.GetUniqueName('New Folder');
                var $folderDOM = $('<div class="items noimage" data-path="' + rootfolderPath + '\\' + name + '">' + folderDOM + '</div>');
                $('#CategoryListing').prepend($folderDOM);
                $folderDOM.find('.editableFolderName').show();
                $folderDOM.find('.openfolder.folderName').hide().text(name);
                Media.AddCategory(name, rootfolderPath);
                $folderDOM.find('.txtEditableFolderName').focus().select().val(name);
                $folderDOM.find('.txtEditableFolderName').attr('data-oldname', name);
                $folderDOM.find('.txtEditableFolderName').attr('data-changed', 'ongoing');
                //Media.GetFolderHerarchy();
                //Media.CloseFolders($('.mediaCategoryHierrarchy').find('span[data-path="' + rootfolderPath.replace(/\\/g, '/') + '"]'));
                //Media.FolderMoveList();
                //Media.MediaBindEvents();
            });

            $('.mediaCategoryHierrarchy .folderherarchy').off().on('click', function () {
                $this = $(this);
                $('.mediaCategoryHierrarchy .folderherarchy').parent().removeClass('opened');
                $this.parent().addClass('opened');
                var rootPath = $this.attr('data-path');
                $('#CategoryListing').attr('data-rootfolder', rootPath);
                Media.GetmediaCategoryByPath(rootPath, '');
                var $selected = Media.FolderStatus($('#CategoryListing').attr('data-rootfolder'));
                Media.CloseFolders($this);
                Media.ShowImageList();
                Media.ShowDroppableZone();
            });
        },
        FolderStatus: function (checkPath) {
            $('.mediaCategoryHierrarchy > li').each(function () {
                var $this = $(this);
                var path = $this.find(' > span').attr('data-media');
                if (path == checkPath) {
                    return $this;
                }
            });
        },
        ShowSettings: function () {
            $('#dvMediaList').hide();
            $('#dvSettings').show();
        },
        ShowMediaList: function () {
            $('#dvMediaList').show();
            $('#dvSettings').hide();
        },
        SaveSettings: function (objSetting) {

            var objMediaSetting =
            {
                MediaSettingID: parseInt($('#hdnMediaSettingID').val()),
                SettingKeyValue: JSON.stringify(objSetting)
            };


            $.ajax({
                url: '/MediaManagement/AddUpdate',
                type: "POST",
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                traditional: true,
                async: true,
                data: JSON.stringify(objMediaSetting),
                success: function (result) {
                    var mediaSettingID = result;
                    $('#hdnMediaSettingID').val(mediaSettingID);

                },
                error: function (jqXHR) {

                },
                complete: function (jqXHR, status) {

                }


            });

            //this.config.method = "AddUpdate";
            //this.config.url = this.config.baseURL + this.config.method;
            //this.config.data = JSON2.stringify({
            //    objMediaSetting: objMediaSetting,
            //    userName: SageFrameUserName,
            //    secureToken: SageFrameSecureToken
            //});
            //this.config.ajaxCallMode = 0;
            //this.ajaxCall(this.config);
        },
        GetSettings: function (MediaSettingID, ajaxCallMode) {
            var objMediaSetting =
            {
                MediaSettingID: MediaSettingID
            };


            $.ajax({
                url: '/MediaManagement/GetSettings',
                type: "POST",
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                traditional: true,
                async: true,
                data: JSON.stringify(objMediaSetting),
                success: function (result) {
                    var objMediaSetting = result;
                    if (objMediaSetting != null && objMediaSetting.MediaSettingID > 0) {
                        $('#hdnMediaSettingID').val(objMediaSetting.MediaSettingID);
                        var settingKeyValue = JSON.parse(objMediaSetting.SettingKeyValue);
                        var objsettings = {
                        };
                        objsettings.FolderName = settingKeyValue.MediaSetting.FolderName;
                        objsettings.MediaVisibility = settingKeyValue.MediaSetting.MediaVisibility;
                        objsettings.MediaReadLocation = settingKeyValue.MediaSetting.MediaReadLocation;
                        objsettings.MediaIgnoreFolders = settingKeyValue.MediaSetting.MediaIgnoreFolders;
                        objsettings.AllowCategory = settingKeyValue.MediaSetting.AllowCategory;
                        objsettings.ImageExtension = settingKeyValue.MediaSetting.ImageExtension;
                        objsettings.VideoExtension = settingKeyValue.MediaSetting.VideoExtension;
                        objsettings.DocumentExtension = settingKeyValue.MediaSetting.DocumentExtension;
                        if (typeof (settingKeyValue.MediaSetting.PixabayApiKey) === "undefined" || settingKeyValue.MediaSetting.PixabayApiKey.trim().length == 0) {
                            settingKeyValue.MediaSetting.PixabayApiKey = "";
                        }
                        objsettings.PixabayApiKey = settingKeyValue.MediaSetting.PixabayApiKey;
                        globalMediaSetings.MediaSetting = objsettings;

                        Media.BindEvents(objsettings);
                    }

                },
                error: function (jqXHR) {

                },
                complete: function (jqXHR, status) {

                }
            });
        },
        GetmediaCategoryByPath: function (baseCategoryPath, filter) {

            if (filter != undefined && filter != null && filter.length > 0)
                filter = "*" + filter + "*";
            else
                filter = "*";


            var _url = '/MediaManagement/GetMediaByPath?basePath=' + encodeURIComponent(baseCategoryPath) + '&filter=' + encodeURIComponent(filter);

            $("#CategoryListing").load(_url, function () {
                Media.FolderMoveList();
                Media.MediaBindEvents();
                Media.SelectImage();
                Media.NoselectMessage();
                Media.NoselectMessage();

            });


            Media.FolderMoveList();

        },
        BindEvents: function (objSettings) {
            objMediaSettings = $.extend(objMediaSettings, objSettings);
            // object details here
            //objMediaSettings.FolderName 
            //objMediaSettings.MediaVisibility 
            //objMediaSettings.MediaReadLocation  
            //objMediaSettings.MediaIgnoreFolders 
            //objMediaSettings.AllowCategory
            //objMediaSettings.ImageExtension
            //objMediaSettings.VideoExtension
            //objMediaSettings.DocumentExtension             
            var rootfolder = '';
            if (objMediaSettings.MediaReadLocation == "system") {
                rootfolder = '';
            }
            else {
                rootfolder = objMediaSettings.FolderName;
            }
            if (objMediaSettings.MediaVisibility == "userwise") {
                rootfolder += "/" + SageFrameUserName;
            }
            $('#CategoryListing').attr('data-rootfolder', rootfolder);
            $('#CategoryListing').attr('data-MediaReadLocation', objMediaSettings.MediaReadLocation);
            $('#CategoryListing').attr('data-Parentfolder', "");

            if (objMediaSettings.AllowCategory) {
                $('#categorycreator').show();
                $('#btnAddCategory').on('click', function () {
                    var categoryName = $('#txtCategoryname').val().trim();
                    if (categoryName != "") {
                        var rootfolderPath = $('#CategoryListing').attr('data-rootfolder');
                        //Check category if exists here
                        if (categoryName.length > 0) {
                            Media.AddCategory(categoryName, rootfolderPath);
                        }
                    }
                    else {
                        SageAlertDialog("Please enter category name", "Category name required");
                    }
                });
            }
            else {
                $('#categorycreator').hide();
            }
            $('#pixabayApikey').val(objMediaSettings.PixabayApiKey);
            //Media.GetFolderHerarchy();
            //Media.GetmediaCategory();
            Media.FolderEvent();
            Media.CreateBreadcrumb();
            Media.SelectImage();
            Media.FolderMoveList();
            Media.MediaBindEvents();
            Media.PopUpEvents();
        },
        SelectImage: function () {
            $('.chooseMedia, .usethisvideo').off().on('click', function () {
                let $me = $(this);
                //if(multipleselect
                let selectedMedia = [];
                $('.normalchk:checked').each(function () {
                    var $this = $(this);
                    var tPath = $me.attr('data-tpath');
                    var dataType = $this.parents('.frame').attr('data-type');
                    var html = '';
                    var filePath = $this.parents('.items').attr('data-path');
                    filePath = (p.fullPath ? SageFrameHostURL : "") + (typeof tPath === "undefined" ? "" : tPath) + '/' + filePath;
                    var fileName = Media.GetFolderName(filePath);
                    var fileExtension = Media.GetFileExtension(fileName);
                    if (dataType == "image") {
                        var alt = $('.imgalt').val();
                        html += '<img height="100px" src="' + filePath + '" alt="' + alt + '"/>';
                        //Media.ReponseChoosenMedia(filePath, html, dataType, fileName, fileExtension, alt);
                    } else {
                        switch (dataType) {
                            case "video":
                                html += '<div class="video">';
                                html += '<video class="videos" width="100">';
                                html += '<source src="' + filePath + '" type="video/' + fileExtension + '">';
                                html += '</source>Your browser does not support HTML5 video.</video>';
                                html += '</div>';
                                break;
                            case "category":
                                confirmmessage = 'Do you want to delete this Folder ? It may contain files or Folders.';
                                break;
                            case "document":
                                confirmmessage = 'do you want to delete this document ?';
                                break;
                        }
                    }
                    //$this.parents('.type-action').removeClass('open');
                    selectedMedia.push({
                        filePath,
                        html,
                        dataType,
                        fileName,
                        fileExtension,
                        alt
                    });
                });
                Media.ReponseChoosenMedia(selectedMedia);
            });
        },
        ReponseChoosenMedia: function (selectedMedia) {

            if (p.multipleselect) {
                if (typeof (mediaConfig.onSelect) === 'function') {
                    mediaConfig.onSelect(selectedMedia);
                }
                if (typeof (mediaConfig.success) === 'function') {
                    mediaConfig.success(selectedMedia);
                }
            }
            else {
                response = selectedMedia[0];
                //ancient convention of returning 
                if (typeof (mediaConfig.onSelect) === 'function') {
                    mediaConfig.onSelect(response.filePath, response.html, response.dataType, response.fileName, response.fileExtension, response.alt);
                }
                //modern convention of returning success
                if (typeof (mediaConfig.success) === 'function') {
                    var response = {
                        'filePath': response.filePath,
                        'html': response.html,
                        'desc': response.alt,
                        'dataType': response.dataType,
                        'fileName': response.fileName,
                        'fileExtension': response.fileExtension,
                        'alt': response.alt
                    };
                    mediaConfig.success(response);
                }
            }
            $(this).CancelMediaPopUP();
        },
        AddCategory: function (categoryName, rootfolderPath) {
            var objMediaCategory =
            {
                BaseCategory: categoryName,
                ParentCategory: $('#CategoryListing').attr('data-rootfolder'),
                MediaSettingID: 1, //$('#hdnMediaSettingID').val(),
                userName: SageFrameUserName,
                secureToken: "" //SageFrameSecureToken
            };

            //this.config.method = "CreateCategory";
            //this.config.url = this.config.baseURL + this.config.method;
            //this.config.data = JSON2.stringify({
            //    objMediaCategory: objMediaCategory,
            //});
            //this.config.ajaxCallMode = 3;
            //this.ajaxCall(this.config);

            $.ajax({
                url: '/MediaManagement/CreateCategory',
                type: "POST",
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                traditional: true,
                async: true,
                data: JSON.stringify(objMediaCategory),
                success: function (result) {
                    $('.spnDupCategory').hide();
                    if (!result || result == 'false') {
                        var rootFolderPath = $('#CategoryListing').attr('data-rootfolder');
                        if (rootFolderPath.length > 0) {
                            Media.SelectImage();
                            $('#ulCategory').remove();
                            Media.CalculateDimension();
                        }
                    }
                    else {
                        $('.spnDupCategory').show();
                    }

                    var rootfolderPath = $('#CategoryListing').attr('data-rootfolder');
                    Media.GetmediaCategoryByPath(rootFolderPath, "");
                    Media.GetFolderHerarchy();
                    Media.CloseFolders($('.mediaCategoryHierrarchy').find('span[data-path="' + rootfolderPath.replace(/\\/g, '/') + '"]'));
                    Media.FolderMoveList();
                    Media.MediaBindEvents();


                },
                error: function (jqXHR) {

                },
                complete: function (jqXHR, status) {

                }


            });



        },
        ajaxSuccess: function (data) {
            switch (mediaConfig.ajaxCallMode) {
                //case 0:
                //    var mediaSettingID = data.d;
                //    $('#hdnMediaSettingID').val(mediaSettingID);
                //    break;
                case 1:
                    var objMediaSetting = data.d;
                    if (objMediaSetting != null && objMediaSetting.MediaSettingID > 0) {
                        $('#hdnMediaSettingID').val(objMediaSetting.MediaSettingID);
                        var settingKeyValue = JSON.parse(objMediaSetting.SettingKeyValue);
                        var objsettings = {
                        };
                        objsettings.FolderName = settingKeyValue.MediaSetting.FolderName;
                        objsettings.MediaVisibility = settingKeyValue.MediaSetting.MediaVisibility;
                        objsettings.MediaReadLocation = settingKeyValue.MediaSetting.MediaReadLocation;
                        objsettings.MediaIgnoreFolders = settingKeyValue.MediaSetting.MediaIgnoreFolders;
                        objsettings.AllowCategory = settingKeyValue.MediaSetting.AllowCategory;
                        objsettings.ImageExtension = settingKeyValue.MediaSetting.ImageExtension;
                        objsettings.VideoExtension = settingKeyValue.MediaSetting.VideoExtension;
                        objsettings.DocumentExtension = settingKeyValue.MediaSetting.DocumentExtension;

                        $('#txtfolderName').val(objsettings.FolderName);
                        if (objsettings.MediaVisibility == "reuse") {
                            $('#rdReuseable').attr('checked', true);
                        }
                        else {
                            $('#rdUserWise').attr('checked', true);
                        }
                        if (objsettings.MediaReadLocation == "system") {
                            $('#rdFromSytem').attr('checked', true);
                        }
                        else {
                            $('#rdFromMediaLocation').attr('checked', true);
                        }
                        $('#txtIgnoreFolder').val(objsettings.MediaIgnoreFolders);
                        $('#chkAllowCategory').attr('checked', objsettings.AllowCategory);
                        $('#txtImageExtension').val(objsettings.ImageExtension);
                        $('#txtvideoExtension').val(objsettings.VideoExtension);
                        $('#txtdocumentExtension').val(objsettings.DocumentExtension);
                    }
                    break;
                //case 2:
                //    var objMediaSetting = data.d;
                //    if (objMediaSetting != null && objMediaSetting.MediaSettingID > 0) {
                //        $('#hdnMediaSettingID').val(objMediaSetting.MediaSettingID);
                //        var settingKeyValue = JSON.parse(objMediaSetting.SettingKeyValue);
                //        var objsettings = {
                //        };
                //        objsettings.FolderName = settingKeyValue.MediaSetting.FolderName;
                //        objsettings.MediaVisibility = settingKeyValue.MediaSetting.MediaVisibility;
                //        objsettings.MediaReadLocation = settingKeyValue.MediaSetting.MediaReadLocation;
                //        objsettings.MediaIgnoreFolders = settingKeyValue.MediaSetting.MediaIgnoreFolders;
                //        objsettings.AllowCategory = settingKeyValue.MediaSetting.AllowCategory;
                //        objsettings.ImageExtension = settingKeyValue.MediaSetting.ImageExtension;
                //        objsettings.VideoExtension = settingKeyValue.MediaSetting.VideoExtension;
                //        objsettings.DocumentExtension = settingKeyValue.MediaSetting.DocumentExtension;
                //        if (typeof (settingKeyValue.MediaSetting.PixabayApiKey) === "undefined" || settingKeyValue.MediaSetting.PixabayApiKey.trim().length == 0) {
                //            settingKeyValue.MediaSetting.PixabayApiKey = "";
                //        }
                //        objsettings.PixabayApiKey = settingKeyValue.MediaSetting.PixabayApiKey;
                //        globalMediaSetings.MediaSetting = objsettings;
                //        Media.BindEvents(objsettings);
                //    }
                //    break;
                //case 3:
                //    $('.spnDupCategory').hide();
                //    if (!data.d || data.d == 'false') {
                //        var rootFolderPath = $('#CategoryListing').attr('data-rootfolder');
                //        if (rootFolderPath.length > 0) {
                //            Media.SelectImage();
                //            $('#ulCategory').remove();
                //            Media.CalculateDimension();
                //        }
                //    }
                //    else {
                //        $('.spnDupCategory').show();
                //    }
                //    break;
                //case 4:
                //    var category = data.d;
                //    if (category != null && category.length > 0) {
                //        var length = category.length;
                //        var html = '';
                //        for (var i = 0; i < length; i++) {
                //            var filePath = category[i];
                //            if (filePath != null && filePath.length > 0) {
                //                filePath = filePath.replace(/\\/g, '/');
                //                var outPut = Media.GetFileDOM(filePath);
                //                html += outPut;
                //            }
                //        }
                //        $('#CategoryListing').html(html);
                //        Media.FolderMoveList();
                //    }
                //    else {
                //        var html = '';
                //        html += '<ul id="ulCategory">';
                //        html += '<li class="nomediaData"></li>';
                //        html += '</ul>';
                //        $('#CategoryListing').html(html);
                //    }
                //    setTimeout(function () {
                //        Media.CalculateDimension();
                //        Media.InitMasonary();
                //    }, 1000);
                //    //for large images continuosly init.
                //    setTimeout(function () {
                //        Media.CalculateDimension();
                //        Media.InitMasonary();
                //    }, 2000);
                //    setTimeout(function () {
                //        Media.CalculateDimension();
                //        Media.InitMasonary();
                //    }, 3000);
                //    Media.MediaBindEvents();
                //    Media.SelectImage();
                //    break;
                //case 5:
                //    var respose = data.d;
                //    var $imageCrop = $('#imgCropping');
                //    $imageCrop.removeClass('cropper-hidden');
                //    $('.img-container > .cropper-container.cropper-bg').remove();
                //    $imageCrop.attr('data-imagePath', respose);
                //    $imageCrop.attr('src', SageFrameHostURL + '/' + respose);
                //    $(this).InitCropper();
                //    $('.mediaCategoryHierrarchy').find('li.opened').find('> .folderherarchy').trigger('click');
                //    $('#backtoMediaList').trigger('click');
                //    break;
                case 6:
                    if (data.d == 1) {
                        var rootDowmloadPath = '';
                        rootDowmloadPath = objMediaSettings.FolderName + '/Downloads';
                        Media.GetmediaCategoryByPath(rootDowmloadPath, '');
                    }
                    else {
                    }
                    break;
                //case 7:
                //    Media.BindFolderHirarchy(data.d);
                //    break;
                //case 8:
                //    var response = data.d;
                //    if (response === '') {
                //        var rootFolderPath = $('#CategoryListing').attr('data-rootfolder');
                //        Media.GetmediaCategoryByPath(rootFolderPath);
                //        Media.GetFolderHerarchy();
                //        Media.CloseFolders($('.mediaCategoryHierrarchy').find('span[data-path="' + rootFolderPath.replace(/\\/g, '/') + '"]'));
                //    } else {
                //        //SageFrame.messaging.show(data.d, "alert");
                //    }
                //    $('.divCategoryList').dialog("close");
                //    break;
                case 9:
                    var response = data.d;
                    if (response === '') {
                        //SageFrame.messaging.show("Media copied succesfully", "success");
                        var rootFolderPath = $('#CategoryListing').attr('data-rootfolder');
                        Media.GetmediaCategoryByPath(rootFolderPath, '');
                    } else {
                        //SageFrame.messaging.show(data.d, "alert");
                    }
                    $('.divCategoryList').dialog("close");
                    break;
                case 10:
                    var response = data.d;
                    if (response === '') {
                        //SageFrame.messaging.show("Media moved succesfully", "success");
                        var rootFolderPath = $('#CategoryListing').attr('data-rootfolder');
                        Media.GetmediaCategoryByPath(rootFolderPath, '');
                    } else {
                        //SageFrame.messaging.show(data.d, "alert");
                    }
                    $('.divCategoryList').dialog("close");
                    break;
                case 11:
                    if (data.d == 'true' || data.d) {
                        Media.GetFolderHerarchy();
                        //Media.MediaBindEvents();
                        //Media.SelectImage();
                    }
                    break;
                case 12:
                    if (data.d == 'true' || data.d) {
                        //Media.GetFolderHerarchy();
                        //Media.MediaBindEvents();
                        //Media.SelectImage();
                    }
                    break;
            }
        },
        CalculateDimension: function () {
            $('.CategoryListing .items').each(function (i, v) {
                var $this = $(this);
                var type = $this.find('.frame').attr('data-type');
                if (type === "image") {
                    $this.addClass('makeitgood');
                    $this.attr('data-w', $this.find('img')[0].naturalWidth);
                    $this.attr('data-h', $this.find('img')[0].naturalHeight);
                    $('.CategoryListing').append($this);
                }
                else {
                }
            });
            var perRow = 5;
            var length = $('.noimage').length;
            var remaining = length % perRow;
            var width = $('.noimage').width();
            var margin = 0;
            if (remaining != 0)
                margin = (perRow - remaining) * width;
            $('.noimage').last().css({
                'margin-right': margin
            });
        },
        FolderMoveList: function () {
            var html = $('.mediaCategoryHierrarchy').html();
            var message = '<li>While moving, same named folders will be merged and same named files will be replaced. </li>';
            $('#CategoryListing').find('.frame').find('.move-target-wrap').html('').append(message + html);
            $('#CategoryListing').find('.frame').find('.move-target-wrap .hide-folder').removeClass('hide-folder');
            Media.MoveEvents();
        },
        MediaBindEvents: function () {
            let this_ = this;
            $('#CategoryListing').parent().off('scroll');
            $('.normalchk').off().on('click', function () {
                let $this = $(this);
                let chkLength = $('.normalchk:checked').length;
                let datatype = $('.normalchk:checked').parents('.frame').attr('data-type');
                if (!mediaConfig.multipleselect && chkLength > 1) {
                    datatype = "nomultiple";
                }
                if (chkLength === 0) {
                    Media.NoselectMessage();
                    ShowOtherCheck();
                }
                switch (datatype) {
                    case "image":
                        ImageCheck();
                        break;
                    case "video":
                        VideoCheck();
                        break;
                    case "category":
                        CategoryCheck();
                        break;
                    case "document":
                        DocCheck();
                        break;
                    case "nomultiple":
                        NoMultiple();
                        break;
                }

                function ImageCheck() {
                    switch (chkLength) {
                        case 0:
                            $('.imgalt').val('');
                            Media.NoselectMessage();
                            ImageAction('.previewMedia, .selectimage ,.renameFile', true);
                            ShowOtherCheck();
                            alert();
                            break;
                        case 1:
                            $('.imageaction').html(MediaDOMS.imgaction);
                            mediaActions();
                            $('.imgalt').val($('.normalchk:checked').closest('.items').find('.fileName').text());
                            ImageAction('.previewMedia, .selectimage ,.renameFile', true);
                            HideOtherCheck();
                            break;
                        default:
                            ImageAction('.previewMedia, .selectimage ,.renameFile', false);
                            HideOtherCheck();
                            break;
                    }
                }
                function CategoryCheck() {
                    switch (chkLength) {
                        case 0:
                            Media.NoselectMessage();
                            ImageAction('.selectFolder, .renamefolder', true);
                            ShowOtherCheck();
                            break;
                        case 1:
                            $('.imageaction').html(MediaDOMS.folderaction);
                            mediaActions();
                            ImageAction('.selectFolder, .renamefolder', true);
                            HideOtherCheck();
                            break;
                        default:
                            ImageAction('.selectFolder, .renamefolder', false);
                            HideOtherCheck();
                            break;
                    }
                }
                function DocCheck() {
                    switch (chkLength) {
                        case 0:
                            Media.NoselectMessage();
                            ImageAction('.chooseMedia, .renameFile', true);
                            ShowOtherCheck();
                            break;
                        case 1:
                            $('.imageaction').html(MediaDOMS.docaction);
                            mediaActions();
                            ImageAction('.chooseMedia, .renameFile', true);
                            HideOtherCheck();
                            break;
                        default:
                            ImageAction('.chooseMedia, .renameFile', false);
                            HideOtherCheck();
                            break;
                    }
                }
                function VideoCheck() {
                    switch (chkLength) {
                        case 0:
                            Media.NoselectMessage();
                            ImageAction('.chooseMedia, .renameFile', true);
                            ShowOtherCheck();
                            break;
                        case 1:
                            $('.imageaction').html(MediaDOMS.videoaction);
                            mediaActions();
                            ImageAction('.chooseMedia, .renameFile', true);
                            HideOtherCheck();
                            break;
                        default:
                            ImageAction('.chooseMedia, .renameFile', false);
                            HideOtherCheck();
                            break;
                    }
                }
                function NoMultiple() {
                    $('.imageaction').html(MediaDOMS.nomultiple);
                    mediaActions();
                }

                function HideOtherCheck() {
                    if (p.multipleselect) {
                        $('.CategoryListing .items').find('[data-type!="' + datatype + '"]').find('.chkmedia').hide();
                    }
                }
                function ShowOtherCheck() {
                    if (p.multipleselect) {
                        $('.CategoryListing .items').find('.chkmedia').show();
                    }
                }
                function ImageAction(classes, show) {
                    if (show)
                        $('.imageaction').find(classes).show();
                    else
                        $('.imageaction').find(classes).hide();
                }
            });

            function mediaActions() {
                Media.SelectImage();
                $('.chooseImagesize').off().on('click', function () {
                    let $this = $(this);
                    if ($this.hasClass('open')) {
                        $this.removeClass('open');
                        $this.find('.image-size-wrap').hide();
                    }
                    else {
                        $this.addClass('open');
                        $this.find('.image-size-wrap').show();
                    }
                });
                $('.previewMedia').off('click').on('click', function () {
                    PreviewImage($('.normalchk:checked'));
                });
                $('.selectimage').off().on('click', function () {
                    var $this = $('.normalchk:checked');
                    Media.ShowImageDetailList();
                    var imagePath = $this.parents('.items').attr('data-path');
                    $('#imgCropping').removeClass('cropper-hidden');
                    $('.img-container > .cropper-container.cropper-bg').remove();
                    $('#imgCropping').attr('data-imagePath', imagePath);
                    //if ($this.closest('.frame.type-img').attr('data-thumbnails') == 'true')
                    imagePath = '/MediaThumb/original/' + imagePath;
                    //$('#imgCropping').attr('src', SageFrameHostURL + '/' + imagePath);
                    $('#imgCropping').attr('src', imagePath);
                    $(this).InitCropper();
                });
                $('.renameFile').off('click').on('click', function () {
                    var $this = $('.normalchk:checked');
                    RenameFile($this);
                });
                $('.move-to-folder').off('click').on('click', function () {
                    $('.items').removeClass('movealign');
                    var $this = $('.normalchk:checked');
                    $('.move-target-wrap').hide();
                    var listLeft = $('#CategoryListing').offset().left;
                    var width = $('#CategoryListing').width() / 2 + listLeft;
                    var windowsWidth = $this.offset().left;
                    var $parent = $this.parents('.items');
                    if (width < windowsWidth) {
                        $parent.addClass('movealign');
                    }
                    $this.next().show();
                });
                $('.deleteMedia').off().on('click', function () {
                    Media.RemoveActiveAction();
                    var $this = $('.normalchk:checked');
                    var objMediaCategoryList = [];
                    let dataType = "";
                    $('.normalchk:checked').each(function (i, v) {
                        let $me = $(this);
                        dataType = $me.parents('.frame').attr('data-type');
                        objMediaCategoryList.push({
                            BaseCategory: $me.parents('.items').attr('data-path'),
                            UploadType: dataType,
                        });
                    });
                    var confirmmessage = 'Do you want to delete selected media?';
                    //if (objMediaCategoryList.length === 1) {
                    switch (dataType) {
                        case "image":
                            confirmmessage = 'Do you want to delete this image ?';
                            break;
                        case "video":
                            confirmmessage = 'Do you want to delete this video ?';
                            break;
                        case "category":
                            confirmmessage = 'Do you want to delete this Folder ? It may contain files or Folders.';
                            break;
                        case "document":
                            confirmmessage = 'Do you want to delete this document ?';
                            break;
                    }
                    //}
                    SageConfirmDialog(confirmmessage).done(function () { //confirm dialog commented now
                        Media.DeleteMedia(objMediaCategoryList);
                        Media.NoselectMessage();
                    });
                });
                $('.selectFolder').off('click').on('click', function () {
                    OpenFolder($('.normalchk:checked'));
                });
                Media.RenameCategoryEvent();
                $('.renamefolder').off('click').on('click', function () {
                    var $this = $('.normalchk:checked');
                    RenameFolder($this);
                });
                $('.previewVideo').off('click').on('click', function () {
                    PreviewVideo($('.normalchk:checked'));
                });
            }
            function RenameFile($this) {
                var dataType = $this.parents('.frame').attr('data-type');
                let message = `Are you sure you want to rename? This ${dataType} file may already be in use in the website. By renaming, the ${dataType} may be lost and you will have to change the ${dataType} manually where needed.`;
                SageConfirmDialog(message).done(function () { //Commented temporarily
                    var $fileDOM = $this.parents('.items');
                    var fileName = $fileDOM.find('.openfolder.fileName').text().trim();
                    $('.editableFileName').hide();
                    $('.openfolder.fileName').show();
                    $fileDOM.find('.editableFileName').show();
                    $fileDOM.find('.openfolder.fileName').hide();
                    var $txtEditableFile = $fileDOM.find('.txtEditableFileName');
                    $txtEditableFile.attr('data-oldname', fileName);
                    $txtEditableFile.attr('data-changed', 'ongoing');
                    $txtEditableFile.val(fileName);
                    Media.RenameFileEvent();
                    $('.type-action.open').removeClass('open');
                    $('.openSettings.open').removeClass('open');
                    setTimeout(function () {
                        $txtEditableFile.focus();
                        $txtEditableFile.select();
                    }, 500);
                });
            }
            function RenameFolder($this) {
                Media.RemoveActiveAction();

                SageConfirmDialog('This Folder may be  in use. By renaming you have to change the media manually where needed').done(function () {
                    $('.renamefolder').removeClass('inuse');
                    $this.addClass('inuse');
                    var $folderDOM = $this.parents('.items');
                    var folderName = $folderDOM.find('.openfolder.folderName').text().trim();
                    $('.editableFolderName').hide();
                    $('.openfolder.folderName').show();
                    $folderDOM.find('.editableFolderName').show();
                    $folderDOM.find('.openfolder.folderName').hide();
                    //$("input:text").focus(function () { $(this).select(); });
                    var $txtEditableFolder = $folderDOM.find('.txtEditableFolderName');
                    $txtEditableFolder.attr('data-oldname', folderName);
                    $txtEditableFolder.attr('data-changed', 'ongoing');
                    $txtEditableFolder.val(folderName);
                    $('.type-action.open').removeClass('open');
                    $('.openSettings.open').removeClass('open');
                    Media.RenameCategoryEvent();
                    setTimeout(function () {
                        $txtEditableFolder.focus();
                        $txtEditableFolder.select();
                    }, 500);


                });

            }
            function OpenFolder($this) {
                var dataPath = $this.parents('.items').attr('data-path');
                $('#CategoryListing').attr('data-rootfolder', dataPath);
                Media.GetmediaCategoryByPath(dataPath, '');
                Media.CreateBreadcrumb();
                Media.GetFolderHerarchy();
                Media.CloseFolders($('.mediaCategoryHierrarchy').find('span[data-path="' + dataPath.replace(/\\/g, '/') + '"]'));
            }
            function PreviewImage($this) {
                $('.ImagDetails').remove();
                let $parent = $this.parents('.items');
                var isThumb = $parent.find('>.frame').attr('data-thubnails') == 'true' ? true : false;
                var $img = '';
                if (isThumb)
                    $img = '<img src="/MediaThumb/large/' + $parent.attr('data-path') + '"/>';
                else $img = $parent.find('img').clone();
                $('.view-wrap').html($img);
                var height = $parent.attr('data-h');
                var width = $parent.attr('data-w');
                var imageName = $parent.find('.fileName').text() + '.' + $parent.find('.txtEditableFileName').attr('data-extension');
                var imageDetail = `<div class="ImagDetails">
                            <div class="call-to-actions flex-box">`;
                if (isThumb) {
                    imageDetail += `<span data-tpath="/MediaThumb/original" class="btn-on-prevw usethisimage"><i class="fa fa-check" aria-hidden="true"></i>Use Extra Large</span>
                            <span data-tpath="/MediaThumb/large" class="btn-on-prevw usethisimage"><i class="fa fa-check" aria-hidden="true"></i>Use Large</span>
                                 <span data-tpath="/MediaThumb/medium" class="btn-on-prevw usethisimage"><i class="fa fa-check" aria-hidden="true"></i>Use Medium</span>
                                 <span data-tpath="" class="btn-on-prevw usethisimage"><i class="fa fa-check" aria-hidden="true"></i>Use Small</span>`;
                } else {
                    imageDetail += '<span data-tpath="" class="btn-on-prevw usethisimage"><i class="fa fa-check" aria-hidden="true"></i>Use This</span>';
                }
                imageDetail += `</div>
                            <div class="import-img-name">
                                <span class="file-name">${imageName}</span>
                            </div>
                        </div>`;
                $(imageDetail).insertBefore($('.view-wrap'));
                $('.pop-up-parent-bg.flex-box').show();
                $('.usethisimage').on('click', function () {
                    $('.popup-model').find('.chooseMedia[data-tpath="' + $(this).attr('data-tpath') + '"]').trigger('click');
                });
            }
            function PreviewVideo($this) {
                $('.ImagDetails').remove();
                var $parent = $this.parents('.items');
                var $vid = $parent.find('video').clone().attr({ 'height': '500', 'width': '500', 'autoplay': '' });
                var control = '<i class="videoControl  fa fa-pause-circle-o" title="video player"  data-type="video"></i>';
                $('.view-wrap').html(control);
                $('.view-wrap').append($vid);
                var imageName = $parent.find('.fileName').text() + '.' + $parent.find('.txtEditableFileName').attr('data-extension');
                var imageDetail = `<div class="ImagDetails">
                            <div class="call-to-actions flex-box">
                                <span class="btn-on-prevw usethisvideo"><i class="fa fa-check" aria-hidden="true"></i>Use This</span>
                            </div>
                            <div class="import-img-name">
                                <span class="file-name">${imageName}</span>
                            </div>
                        </div>`;


                $('.videos').each(function () {
                    var $me = $(this);
                    $me.get(0).pause();
                    $me.prev().removeClass('fa-pause-circle-o').addClass('fa-play-circle-o');
                });
                $(imageDetail).insertBefore($('.view-wrap'));
                Media.VideoControlEvent();
                Media.SelectImage();
                $('.pop-up-parent-bg.flex-box').show();
                $('.usethisvideo').on('click', function () {
                    $parent.find('.chooseMedia').attr('data-tpath', '').trigger('click');
                });
            }
            Media.VideoControlEvent();
            Media.fileUpload($('#CategoryListing').attr('data-rootfolder'));
            $('#ulCategory li .catName').off().on('click', function () {
                var $this = $(this).parent();
                $('.MediaFile').remove();
                if ($this.attr('data-path') != null && $this.attr('data-path').length > 0) {
                    var rooFolderPath = $this.attr('data-path');
                    $('#btnCategoryBack').attr('data-rootfolder', $('#CategoryListing').attr('data-rootfolder'));
                    $('#CategoryListing').attr('data-rootfolder', rooFolderPath);
                    Media.GetmediaCategoryByPath(rooFolderPath, '');
                    Media.CreateBreadcrumb();
                }
            });
            Media.MoveEvents();
            Media.CreateBreadcrumb();

            $('.openfolder').off('dblclick').on('dblclick', function () {
                var $this = $(this).parents('.items').find('.normalchk');
                RenameFolder($this);
            });
            $('.fileName').off('dblclick').on('dblclick', function () {
                var $this = $(this).parents('.items').find('.normalchk');
                RenameFile($this);
            });
            $('.frame.type-folder').off('dblclick').on('dblclick', function () {
                var $this = $(this).parents('.items').find('.normalchk');
                OpenFolder($this);
            });
            $('.frame.type-img').off('dblclick').on('dblclick', function () {
                var $this = $(this).parents('.items').find('.normalchk');
                $this.trigger('click');
                PreviewImage($this);
            });
            $('.frame.type-video').off('dblclick').on('dblclick', function () {
                var $this = $(this).parents('.items').find('.normalchk');
                PreviewVideo($this);
            });
            Media.SettingOpenEvent();
        },
        NoselectMessage: function () {
            $('.imageaction').html('<span class="choosefiles">Select document above</span>');
        },
        VideoControlEvent: function () {
            $('.videoControl').off('click').on('click', function () {
                var $this = $(this);
                $('.videos').not($this.next()).each(function () {
                    var $me = $(this);
                    $me.get(0).pause();
                    $me.prev().removeClass('fa-pause-circle-o').addClass('fa-play-circle-o');
                });
                var video = $(this).parent().parent().find('.videos').get(0);
                if (video.paused) {
                    $this.addClass('fa-pause-circle-o').removeClass('fa-play-circle-o');
                    video.play();
                }
                else {
                    $this.removeClass('fa-pause-circle-o').addClass('fa-play-circle-o');
                    video.pause();
                }
                video.addEventListener('ended', myHandler, false);
                function myHandler(e) {
                    $this.removeClass('fa-pause-circle-o').addClass('fa-play-circle-o');
                }
            });
        },
        InitMasonary: function () {
            if ($('#CategoryListing .makeitgood').length > 0) {
                $('#CategoryListing').flexImages({
                    rowHeight: 200,
                    container: '.makeitgood'
                });
            }
        },
        RecursiveHeightAdjustment: function (startIndex, endIndex, containerWidth) {
            var $images = [];
            var upperHeight = 0;
            for (var i = startIndex; i < endIndex; i++) {
                var width = $container.find('.items').eq(i).attr('data-w');
                var height = $container.find('.items').eq(i).attr('data-h');
                var ratio = height / width;
                if (maxHeight < height)
                    maxHeight = height;
            }
            function IncreaseWidth() {

            }

            function DecreaseWidth() {

            }
        },
        SettingOpenEvent: function () {
            $('.openSettings').off().on('click', function () {
                var $this = $(this);
                $('.move-target-wrap').hide();
                if ($this.hasClass('open')) {
                    $('.type-action').removeClass('open');
                    $('.type-action.open').hide();
                    $('.openSettings').removeClass('open');
                }
                else {
                    $('.type-action.open').hide();
                    $('.type-action').removeClass('open');
                    $('.openSettings').removeClass('open');
                    var $prev = $this.prev();
                    $prev.show().addClass('open');
                    $this.addClass('open');
                }
            });
        },
        MoveEvents() {
            $('.move-target-wrap .folderherarchy').off().on('click', function () {
                var $this = $(this);
                var $item = $this.parents('.items');
                var src = $item.attr('data-path');
                var destParent = $this.attr('data-path');
                var dataType = $this.parents('.frame').attr('data-type');
                var destPath = $item.find('.folderName').text();
                if (dataType !== "category") {
                    destPath = $item.find('.fileName').text() + '.' + $item.find('.txtEditableFileName').attr('data-extension');
                }
                var destination = destParent + "/" + destPath;
                if (src !== destination);
                {
                    Media.MoveMedia(src, destination, dataType, destParent);
                }
            });
        },
        RenameCategoryEvent: function () {
            $('.txtEditableFolderName').off('keyup').on('keyup', function (e) {
                var $this = $(this);
                $this.focus();
                $this.attr('data-changed', 'ongoing');
                Media.RenameFolder($this, e);
            });
            $('.txtEditableFolderName').off('blur').on('blur', function (e) {
                var $this = $(this);
                var changed = $this.attr('data-changed');
                if (changed === 'ongoing') {
                    var $this = $(this);
                    e.keyCode = 13;
                    Media.RenameFolder($this, e);
                }
            });
        },
        RenameFileEvent: function () {
            $('.txtEditableFileName').off('keyup').on('keyup', function (event) {
                var $this = $(this);
                $this.focus();
                $this.attr('data-changed', 'ongoing');
                var extension = $this.attr('data-extension');
                Media.RenameFile($this, event, extension);
            });
            $('.txtEditableFileName').off('blur').on('blur', function (e) {
                var $this = $(this);
                var changed = $this.attr('data-changed');
                if (changed === 'ongoing') {
                    e.keyCode = 13;
                    var extension = $this.attr('data-extension');
                    Media.RenameFile($this, e, extension);
                }
            });
        },
        RenameFolder: function ($this, e) {
            var newName = $this.val().trim();
            var oldName = $this.attr('data-oldname').trim();
            if (newName.length === 0) {
                newName = oldName;
            }
            var $folderDOM = $this.parents('.items');
            var $excludeSelector = $folderDOM.find('.folderName');
            if (e.keyCode == 13) {

                if (Media.CheckWindowsFolder(newName)) {
                    if (!Media.CheckSiblingName(newName, $excludeSelector)) {
                        Media.RenameCategory(oldName, newName);
                        Media.ShowFolder($folderDOM, newName);
                        Media.GetFolderHerarchy();
                        var newPath = $('#CategoryListing').attr('data-rootfolder').replace(/\\/g, '/');
                        Media.CloseFolders($('.mediaCategoryHierrarchy').find('span[data-path="' + newPath + '"]'));
                        newPath = newPath + '/' + newName;
                        $this.parents('.items').attr('data-path', newPath);
                        $this.attr('data-changed', 'changed');
                        Media.FolderMoveList();
                    }
                    else {
                        $this.val(oldName);
                        Media.ShowFolder($folderDOM, oldName);
                    }
                }
                else {
                    $this.val(oldName);
                    Media.ShowFolder($folderDOM, oldName);
                }
            }
            $('.renamefolder').removeClass('inuse');
        },
        RenameFile: function ($this, event, extension) {
            var newName = $this.val().trim();
            var oldName = $this.attr('data-oldname').trim();
            if (newName.length === 0) {
                newName = oldName;
            }
            var $fileDOM = $this.parents('.items');
            if (event.keyCode == 13) {
                if (Media.CheckWindowsFolder(newName)) {
                    if (!Media.CheckSiblingFileName(newName, extension)) {
                        Media.RenameFileName(oldName + '.' + extension, newName + '.' + extension);
                        Media.CheckSiblingFileName(oldName, newName);
                        Media.ShowFileEdit($fileDOM, newName);
                        $this.attr('data-changed', 'changed');
                        $fileDOM.attr('data-path', $fileDOM.attr('data-path').replace(oldName + '.' + extension, newName + '.' + extension));
                    }
                    else {
                        $this.val(oldName);
                        Media.ShowFileEdit($fileDOM, oldName);
                    }
                }
                else {
                    $this.val(oldName);
                    Media.ShowFileEdit($fileDOM, oldName);
                }
            }
            $('.renamefile').removeClass('inuse');
        },
        CheckSiblingName: function (newName, excludeSelector) {
            var exists = false;
            $('#CategoryListing .items .folderName').not(excludeSelector).each(function (i, v) {
                if ($(this).text().trim().toLowerCase() === newName.toLowerCase()) {
                    exists = true;
                }
            });
            return exists;
        },
        CheckSiblingFileName: function (newName, extension) {
            var exists = false;
            $('#CategoryListing .items').each(function (i, v) {
                var $this = $(this);
                if ($this.find('.fileName').text().trim().toLowerCase() === newName.toLowerCase()) {
                    if ($this.find('.txtEditableFileName').attr('data-extension').trim().toLowerCase() === extension.toLowerCase())
                        exists = true;
                }
            });
            return exists;
        },
        CheckWindowsFolder: function (name) {
            var re = /^([a-zA-Z0-9 _-]+)$/;//Alphnumeric with space , underscore and dash.
            if (!re.test(name)) {
                return false;
            }
            return true;
        },
        ShowFolder: function ($folderDOM, newName) {
            $folderDOM.find('.editableFolderName').hide();
            $folderDOM.find('.openfolder.folderName').css('display', 'inline-block').text(newName);
        },
        ShowFileEdit: function ($FileDOM, newName) {
            $FileDOM.find('.editableFileName').hide();
            $FileDOM.find('.openfolder.fileName').css('display', 'inline-block').text(newName);
        },
        RenameCategory: function (oldCategory, newCategory) {
            var objMediaCategory =
            {
                BaseCategory: oldCategory,
                ParentCategory: $('#CategoryListing').attr('data-rootfolder'),
                MediaSettingID: parseInt($('#hdnMediaSettingID').val()),
                userName: "", //SageFrameUserName,
                secureToken: "",//SageFrameSecureToken
                NewCategory: newCategory
            };

            $.ajax({
                url: '/MediaManagement/RenameCategory',
                type: "POST",
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                traditional: true,
                async: true,
                data: JSON.stringify(objMediaCategory),
                success: function (result) {
                    if (result == 'true' || result) {
                        Media.GetFolderHerarchy();
                    }

                },
                error: function (jqXHR) {

                },
                complete: function (jqXHR, status) {

                }


            });


            //this.config.method = "RenameCategory";
            //this.config.url = this.config.baseURL + this.config.method;
            //this.config.data = JSON2.stringify({
            //    objMediaCategory: objMediaCategory,
            //    newCategory: newCategory
            //});
            //this.config.async = false;
            //this.config.ajaxCallMode = 11;
            //this.ajaxCall(this.config);
        },
        RenameFileName: function (oldFileName, newFileName) {
            var objMediaCategory =
            {
                BaseCategory: oldFileName,
                ParentCategory: $('#CategoryListing').attr('data-rootfolder'),
                MediaSettingID: parseInt($('#hdnMediaSettingID').val()),
                NewCategory: newFileName,
                userName: "", //SageFrameUserName,
                secureToken: "" //SageFrameSecureToken
            };


            $.ajax({
                url: '/MediaManagement/RenameFileName',
                type: "POST",
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                traditional: true,
                async: true,
                data: JSON.stringify(objMediaCategory),
                success: function (result) {


                },
                error: function (jqXHR) {

                },
                complete: function (jqXHR, status) {

                }


            });

        },
        RemoveActiveAction: function () {
            $('.actions').removeClass('active');
            $('.move-target-wrap').hide();
        },
        DeleteMedia: function (objMediaCategoryList) {


            $.ajax({
                url: '/MediaManagement/DeleteMedia',
                type: "POST",
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                traditional: true,
                async: true,
                data: JSON.stringify(objMediaCategoryList),
                success: function (result) {
                    if (result === '') {
                        var rootFolderPath = $('#CategoryListing').attr('data-rootfolder');
                        Media.GetmediaCategoryByPath(rootFolderPath, '');
                        Media.GetFolderHerarchy();
                        Media.CloseFolders($('.mediaCategoryHierrarchy').find('span[data-path="' + rootFolderPath.replace(/\\/g, '/') + '"]'));
                    } else {
                        //SageFrame.messaging.show(data.d, "alert");
                    }

                    //$('.divCategoryList').dialog("close"); dialog not ready now


                },
                error: function (jqXHR) {

                },
                complete: function (jqXHR, status) {

                }


            });


        },
        CopyMedia: function (srcdataPath, destDataPath, dataType) {
            var objMediaCategory =
            {
                BaseCategory: srcdataPath,
                ParentCategory: destDataPath,
                UploadType: dataType,
                UserName: "",//SageFrameUserName,
                secureToken: "" //SageFrameSecureToken
            };
            this.config.method = "CopyMedia";
            this.config.url = this.config.baseURL + this.config.method;
            this.config.data = JSON2.stringify({
                objMediaCategory: objMediaCategory
            });
            this.config.ajaxCallMode = 9;
            this.ajaxCall(this.config);
        },
        MoveMedia: function (srcdataPath, destDataPath, dataType, destParent) {
            var objMediaCategory =
            {
                BaseCategory: srcdataPath,
                ParentCategory: destDataPath,
                UploadType: dataType,
                UserName: "",//SageFrameUserName,
                secureToken: "" //SageFrameSecureToken
            };
            $.ajax({
                type: Media.config.type,
                contentType: Media.config.contentType,
                async: Media.config.async,
                cache: Media.config.cache,
                url: Media.config.baseURL + "MoveMedia",
                data: JSON2.stringify({
                    objMediaCategory: objMediaCategory
                }),
                dataType: Media.config.dataType,
                success: function (data) {
                    $('#CategoryListing').attr('data-rootfolder', destParent);
                    Media.GetFolderHerarchy();
                    //Media.FilterMediaByPath(destParent, '*');
                    Media.GetmediaCategoryByPath(destParent, '*');
                    Media.CreateBreadcrumb();
                    Media.CloseFolders($('.mediaCategoryHierrarchy').find('span[data-path="' + destParent + '"]'));
                },
                error: Media.ajaxFailure
            });
        },
        ShowImageDetailList: function () {
            $('.right-side').hide();
            $('.right-right-side').show();

            //$('.right-right-side').html(MediaLibrary.ReadDOM('effect')).show();
            Media.ImageCropEvent();
        },
        ShowImageList: function () {
            $('.right-side').show();
            $('.right-right-side').hide();
        },
        SaveCroppedImage: function (folderPath, image64Bit) {
            var objImageInfo =
            {
                Image64Bit: image64Bit,
                ImageFullPath: folderPath,
                UserName: "",//SageFrameUserName,
                secureToken: "" //SageFrameSecureToken
            };
            //this.config.method = "SaveCroppedImage";
            //this.config.url = this.config.baseURL + this.config.method;
            //this.config.data = JSON2.stringify({
            //    objImageInfo: objImageInfo
            //});
            //this.config.ajaxCallMode = 5;
            //this.ajaxCall(this.config);

            $.ajax({
                url: '/MediaManagement/SaveCroppedImage',
                type: "POST",
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                traditional: true,
                async: true,
                data: JSON.stringify(objImageInfo),
                success: function (result) {
                    var respose = result;
                    var $imageCrop = $('#imgCropping');
                    $imageCrop.removeClass('cropper-hidden');
                    $('.img-container > .cropper-container.cropper-bg').remove();
                    $imageCrop.attr('data-imagePath', respose);
                    //$imageCrop.attr('src', SageFrameHostURL + '/' + respose);
                    var imgURL = window.location.protocol + '//' + window.location.host + '/' + respose;
                    $imageCrop.attr('src', "");
                    $imageCrop.attr('src', imgURL);
                    $(this).InitCropper();
                    $('.mediaCategoryHierrarchy').find('li.opened').find('> .folderherarchy').trigger('click');
                    $('#backtoMediaList').trigger('click');
                    Media.NoselectMessage();
                    var rootFolderPath = $('#CategoryListing').attr('data-rootfolder');
                    Media.GetmediaCategoryByPath(rootFolderPath);

                },
                error: function (jqXHR) {

                },
                complete: function (jqXHR, status) {

                }


            });




        },

        CreateBreadcrumb: function () {
            var rootFolderPath = $('#CategoryListing').attr('data-rootfolder').replace(/\\/g, '/');
            var list = '<ul id="navigateurl">';
            var link = '';
            if ($('#CategoryListing').attr('data-MediaReadLocation') == "system")
                list += '<li><span class="liNavigate navigatecategory" data-rootfolder="">Home</li>';
            if (rootFolderPath.length > 0) {
                var paths = rootFolderPath.split('/');
                $(paths).each(function (index, value) {
                    link += value;
                    list += '<li><span class="liNavigate navigatecategory" data-rootfolder="' + link + '">' + value + '</li>';
                    link += '/';
                });
            }
            list += '</ul>';
            $('.divBreadcrumb').html(list);
            $('#navigateurl li:last-child').find('.navigatecategory').removeClass('liNavigate');
            $('.liNavigate').off().on('click', function () {
                var $this = $(this);
                var rootFolderPath = $this.attr('data-rootfolder');
                $('#CategoryListing').attr('data-rootfolder', rootFolderPath);
                Media.GetmediaCategoryByPath(rootFolderPath, '');
                Media.GetFolderHerarchy();
                Media.CloseFolders($('.mediaCategoryHierrarchy').find('span[data-path="' + rootFolderPath + '"]'));
                Media.ShowImageList();
                Media.ShowDroppableZone();
            });
        },
        IsThumbnails: function (fileExtension) {
            if (fileExtension == 'jpg' || fileExtension == 'png' || fileExtension == 'jpeg')
                return true;
            return false;
        },
        GetFileDOM: function (filePath) {
            var fileExtensionNotMatched = true;
            var fileName = Media.GetFolderName(filePath);
            var html = '';
            var chooseMedia = '<i class="chooseMedia fa fa-check-circle-o" data-tpath=""></i>';
            var iconSelect = '';
            if (fileName.indexOf('.') > 0) {
                var fileExtension = Media.GetFileExtension(fileName);
                var isThumbnails = Media.IsThumbnails(fileExtension);
                var extenstions = objMediaSettings.ImageExtension.split(',');
                $(extenstions).each(function (index, value) {
                    if (value == fileExtension) {
                        var dom = '<div data-type="image" class="frame type-img ' + isThumbnails + '" data-thubnails=' + isThumbnails + ' >';
                        dom += '<img  src="' + SageFrameHostURL + '/' + filePath + '" />';
                        dom += MediaDOMS.checkbox;
                        dom += '</div>';
                        var fName = Media.GetFileNameOnly(fileName);
                        dom += '<span class="openfolder fileName">' + fName + '</span>';
                        dom += '<span class="editableFileName" style="display:none;">';
                        dom += '<input value="' + fName + '" type="text" class="txtEditableFileName" data-extension="' + fileExtension + '" />';
                        dom += '</span>';
                        html += '<div class="items" data-path="' + filePath + '">' + dom + '</div>';
                        fileExtensionNotMatched = false;
                    }
                });
                if (fileExtensionNotMatched) {
                    extenstions = objMediaSettings.VideoExtension.split(',');
                    $(extenstions).each(function (index, value) {
                        if (value == fileExtension) {
                            var dom = '<div data-type="video" class="frame type-video" >';
                            dom += '<i class="videoControl  fa fa-play-circle-o" title="video player"  data-type="video"></i>';
                            dom += '<video class="videos" width="100">';
                            dom += '<source src="' + SageFrameHostURL + '/' + filePath + '" type="video/' + fileExtension + '">';
                            dom += 'Your browser does not support HTML5 video.';
                            dom += '</video>';
                            dom += MediaDOMS.checkbox;
                            dom += '</div>';
                            var fName = Media.GetFileNameOnly(fileName);
                            dom += '<span class="openfolder fileName">' + fName + '</span>';
                            dom += '<span class="editableFileName" style="display:none;">';
                            dom += '<input value="' + fName + '" type="text" class="txtEditableFileName" data-extension="' + fileExtension + '" />';
                            dom += '</span>';
                            html += '<div class="items noimage" data-path="' + filePath + '">' + dom + '</div>';
                            fileExtensionNotMatched = false;
                        }
                    });
                    if (fileExtensionNotMatched) {
                        extenstions = objMediaSettings.DocumentExtension.split(',');
                        $(extenstions).each(function (index, value) {
                            if (value == fileExtension) {
                                var dom = '<div data-type="document" class="frame type-document" >';
                                dom += '<span><i class="fa fa-file-text-o"></i></span>';
                                dom += MediaDOMS.checkbox;
                                dom += '</div>';
                                var fName = Media.GetFileNameOnly(fileName);
                                dom += '<span class="openfolder fileName">' + fName + '</span>';
                                dom += '<span class="editableFileName" style="display:none;">';
                                dom += '<input value="' + fName + '" type="text" class="txtEditableFileName" data-extension="' + fileExtension + '" />';
                                dom += '</span>';
                                html += '<div class="items noimage" data-path="' + filePath + '">' + dom + '</div>';
                                fileExtensionNotMatched = false;
                            }
                        });
                    }
                }
            }
            else {
                var $folderDOM = $('<div>' + MediaDOMS.folder + '</div>');
                var dom = $('.mediaCategoryHierrarchy').html();
                $folderDOM.find('.openfolder.folderName').css('display', 'inline-block').text(fileName);
                $folderDOM.find('.txtEditableFolderName').val(fileName);
                dom = $folderDOM.html();
                html += '<div class="items noimage" data-path="' + filePath + '">' + dom + '</div>';
            }
            return html;
        },
        GetFolderHerarchy: function (categoryName, rootfolderPath) {
            var objMediaCategory =
            {
                BaseCategory: categoryName,
                ParentCategory: $('#CategoryListing').attr('data-rootfolder'),
                MediaSettingID: 1, //$('#hdnMediaSettingID').val(),
                userName: "",//SageFrameUserName,
                secureToken: ""//SageFrameSecureToken
            };
            //this.config.method = "GetMediaFolderList";
            //this.config.url = this.config.baseURL + this.config.method;
            //this.config.data = JSON2.stringify({
            //    objMediaCategory: objMediaCategory,
            //});
            //this.config.async = false;
            //this.config.ajaxCallMode = 7;
            //this.ajaxCall(this.config);

            $.ajax({
                url: '/MediaManagement/GetMediaFolderList',
                type: "POST",
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                traditional: true,
                async: true,
                data: JSON.stringify(objMediaCategory),
                success: function (result) {
                    Media.BindFolderHirarchy(result);

                },
                error: function (jqXHR) {

                },
                complete: function (jqXHR, status) {

                }


            });

        },
        FolderHerarchy: function (data) {
            var popupdata = '<div class="divCategoryList">';
            popupdata += '<div class="copyHeader">';
            popupdata += '<div id="tempMediaHolder"></div>';
            popupdata += '<div class="sfRadiobutton sfRadioTab">';
            popupdata += '<span class="sfBtn smlbtn-succ">';
            popupdata += '<span class="icon-copy"></span>';
            popupdata += '<input id="rdCopy" name="movemode" style="display:none;" type="radio">';
            popupdata += '<label for="rdCopy" class=" movecopy">Copy To</label>';
            popupdata += '</span>';
            popupdata += '<span class="sfBtn smlbtn-succ">';
            popupdata += '<span class="icon-copy"></span>';
            popupdata += '<input id="rdMove" name="movemode" style="display:none;" type="radio">';
            popupdata += '<label for="rdMove" class=" movecopy">Move To</label>';
            popupdata += '</span>';
            popupdata += '</div>';
            popupdata += '</div>';
            popupdata += data;
            popupdata += '<div class="sfButtonwrapper" style="display:none;">';
            popupdata += '<span class="sfBtn  sfHighlightBtn smlbtn-succ" title="Create group" id="spnCopy"><i class="fa fa-clipboard"></i>Copy to</span>';
            popupdata += '<span class="sfBtn  sfHighlightBtn smlbtn-danger" title="Cancel group" id="spnMove"><i class="fa fa-arrows"></i>Move to</span>';
            popupdata += '</div>';
            popupdata += '<div class="SelectedFolder" style="display:none;">';
            popupdata += '<label>Destination category: </label><span class="selFolderPath" data-path Src="">';
            popupdata += '</span>';
            popupdata += '</div>';
            popupdata += '<div class="sfButtonwrapper buttonClick">';
            popupdata += '<span class="sfBtn  sfHighlightBtn smlbtn-succ" style="display:none;" id="spnSave"><i class="icon-save"></i>Save</span>';
            popupdata += '</div>';
            popupdata += '</div>';
            $('#CategoryListing').append(popupdata);
            $('.divCategoryList').SimpleDialog({
                "title": "Folder Herarchy",
                "width": 500,
                "height": 600,
                "top": 0,
                "close":
                    function (event, ui) {
                        $('body').find('.divCategoryList').remove();
                    }
            });
            $('html, body').animate({ scrollTop: 0 }, 'slow');
            var $activeMove = $('.move.active');
            var $dataType = $activeMove.attr('data-type');
            var $srcDataPath = $activeMove.parents('.liCategory').attr('data-path');
            var srcFile = Media.GetFolderName($srcDataPath);
            switch ($dataType) {
                case "image":
                    $datatype = $activeMove.parents('.liCategory').find('img');
                    break;
                case "video":
                    $datatype = $activeMove.parents('.liCategory').find('video');
                    break;
                case "category":
                    $datatype = $activeMove.parents('.liCategory').find('span.catName');
                    break;
                case "document":
                    $datatype = $activeMove.parents('.liCategory').find('span.document');
                    break;
            }
            $('#tempMediaHolder').append($datatype.clone());
            $('.divCategoryList ul li span').on('click', function () {
                var folderPath = $(this).attr('data-path');
                $('.selFolderPath').text(folderPath);
            });

            $('.movecopy').on('click', function () {
                $('.mediaCategoryHierrarchy').fadeIn(400, function () {
                    $('.divCategoryList ul li span').eq(0).trigger('click');
                    $('.SelectedFolder').show();
                    $('#spnSave').show();
                });
            });
            $('#spnSave').on('click', function () {
                var $desDataPath = $('.selFolderPath').text() + '/' + srcFile;
                if ($('#rdCopy').is(':checked')) {
                    Media.CopyMedia($srcDataPath, $desDataPath, $dataType);
                }
                else {
                    Media.MoveMedia($srcDataPath, $desDataPath, $dataType);
                }
            });
        },
        GetFileExtension: function (fileName) {
            return fileName.split('.')[1];
        },
        GetFileNameOnly: function (fileName) {
            return fileName.split('.')[0];
        },
        GetFolderName: function (filePath) {
            if (filePath != null && filePath.length > 0) {
                var fileSplited = filePath.split('/');
                var length = fileSplited.length;
                return fileSplited[length - 1];
            }
            else
                return '';
        },
        ajaxFailure: function () {
        },
        ajaxCall: function (config) {

            $.ajax({
                type: Media.config.type,
                contentType: Media.config.contentType,
                async: Media.config.async,
                cache: Media.config.cache,
                url: Media.config.url,
                data: Media.config.data,
                dataType: Media.config.dataType,
                success: Media.ajaxSuccess,
                error: Media.ajaxFailure
            });
        }
    };
    //var authInfo = {
    //    UserModuleID: p.userModuleID,
    //    PortalID: 1,
    //    Username: SageFrameUserName,
    //    SecureToken: SageFrameSecureToken
    //};
    Media.init();
    return {
        Show: function () {
            let config = this.Configs;
            mediaConfig = config;
            $(".normalchk").prop("checked", false);
            $('.mediapopups').show();
            let $trigger = $('.mediaCategoryHierrarchy .folderherarchy').eq(0);
            if (!$trigger.parent().hasClass('opened'))
                $trigger.trigger('click');
        },
        Configs: Media.config
    }

};
/*Media management Main js end */
