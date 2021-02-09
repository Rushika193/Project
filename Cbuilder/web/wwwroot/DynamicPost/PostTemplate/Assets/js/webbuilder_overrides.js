function EasyLibrary_ReadDOM(fileName, Cache) {
    var oRequest = new XMLHttpRequest();
    try {

        var postFix = '';
        if (typeof Cache !== 'undefined' || !Cache)
            postFix = '?t=' + Math.random() * 100;
        //var URL = `${SageFrameHostURL}/${fileName}.html${postFix}`;
        var URL = SageFrameHostURL + '/' + fileName + '.html' + postFix;
        oRequest.open("GET", URL, false);
        //oRequest.setRequestHeader("User-Agent", navigator.userAgent);
        oRequest.send(null);
    }
    catch (message) {

    }
    if (oRequest.status == 200)
        return EasyLibrary_RemoveSpaceFromDOM(oRequest.responseText);
    else
        alert("Error executing XMLHttpRequest call!");
}

function EasyLibrary_RemoveSpaceFromDOM(data) {
    if (data != null) {
        return data.replace(/\>\s+\</g, '><').trim();//.replace(/(\r\n|\n|\r)/gm, "").trim();
    }
}
function Core_CreateSliderDOM(sliderID, sliderHandlerID, label) {
    var sliderDOM = '';
    if (typeof (sliderHandlerID) !== 'undefined' && typeof (sliderID) !== 'undefined' && sliderID.length > 0 && sliderHandlerID.length > 0) {
        sliderDOM = Core_DOMCreate('div', '0', 'ui-slider-handle', sliderHandlerID, ['title ="' + label + '"']);
        sliderDOM = Core_DOMCreate('div', sliderDOM, '', sliderID);
        sliderDOM = Core_DOMCreate('span', sliderDOM, 'range__slider fCol');
        sliderDOM = Core_FieldRowDOMCreateCol100(sliderDOM);
    }
    return sliderDOM;
}
function Core_CreateCheckboxDOM(label, chkID, chkCLass) {
    var chkDOM = '';
    if (typeof (chkID) !== 'undefined' && typeof (chkCLass)) {
        chkDOM = ' <input id="' + chkID + '" class="' + chkCLass + '" type="checkbox" />';
        chkDOM += '<label for="' + chkID + '" class="tgl_slider"></label>';
        chkDOM = Core_DOMCreate('label', label, 'fCol') + Core_DOMCreate('div', Core_DOMCreate('span', chkDOM, 'toggle_btn'), 'fCol TxAl-r');
        chkDOM = FieldRowDOMCreateCol50_50(chkDOM);
    }
    return chkDOM;
}
function Core_FieldRowDOMCreateCol100(data) {
    return '<div class="field-row stElWrap col100">' + data + '</div>';
}

function Core_DOMCreateStart(tag, className, id, extra) {
    var returnDOM = '';
    if (tag !== undefined) {
        returnDOM += '<' + tag;
        if (className !== undefined && className.length > 0)
            returnDOM += ' class="' + className + '"';
        if (id !== undefined && id.length > 0)
            returnDOM += ' id="' + id + '" ';

        if (extra !== undefined && extra.length > 0) {
            var extraLength = extra.length;
            var dType = '';
            for (var extraItem = 0; extraItem < extraLength; extraItem++) {
                dType += ' ' + extra[extraItem];
            }
            returnDOM += dType;
        }
        returnDOM += '>';
    }
    return returnDOM;
}
function Core_DOMCreateEnd(tag) {
    return '</' + tag + '>';
}
function Core_DOMCreate(tag, appendData, className, id, extra) {
    return Core_DOMCreateStart(tag, className, id, extra) + appendData + Core_DOMCreateEnd(tag);
}