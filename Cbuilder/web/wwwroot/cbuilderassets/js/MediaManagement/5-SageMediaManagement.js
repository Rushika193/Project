



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