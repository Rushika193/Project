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