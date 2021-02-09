var sel, range;
"use strict";
const WbGlobal = {};
let webBuilderSettings = {
    "primaryColor": 'rgb(69, 83, 252)',
    "secondaryColor": '#ccc',
    "optionalColor": "#ccc",
    "defaultLayout": 'fullwidth',
    "defaultFontFamily": "Montserrat",
    "SiteHeaderEffect": "hdr-nml",
    "body": {
        "class": "editor-box activeSetting background-effect-image-parallax",
        "data-backgroundcolor": "",
        "data-backgroundimage": "image",
        "style": ""
    },
    "shadedLayer": "",
    "temporaryBackgroundcolor": '#FFF',
    "temporaryWidth": '100',
    "scrolltotop": false,
    "idcount": 0,
    "isunderconstruction": false
};
let screenWidth = $(window).width();
let screenSize = ScreenDimension();
let Website = {
    "Name": "Personal",
    "PageList": [],
    "DefaultPage": "",
    "Components": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,1,1,1",
    "UserModuleID": 0,
    "Culture": null,
    "SecureToken": null,
    "UserName": null,
    "PortalID": 0,
    "HostURL": SageFrameHostURL,
    "HeaderView": "",
    "HeaderEdit": "",
    "FooterEdit": "",
    "FooterView": ""
};
let autoSlideInterval = {};
let currentOnePAge = '';

let WbHostURL = '';
if (typeof EditorMode === "undefined") {
    EditorMode = false;
}
if (typeof isPreview === "undefined") {
    isPreview = false;
}
if (GetSiteID === "0") {
    if (EditorMode)
        WbHostURL = SageFrameHostURL + '/webbuilder';
    else if (isPreview) {
        WbHostURL = SageFrameHostURL + '/webbuilderpreview';
    } else {
        WbHostURL = SageFrameHostURL;
    }
} else {
    if (EditorMode)
        WbHostURL = SageFrameHostURL + '/webbuilder/' + GetSiteID;
    else if (isPreview) {
        WbHostURL = SageFrameHostURL + '/webbuilderpreview/' + GetSiteID;
    } else {
        WbHostURL = SageFrameHostURL;
    }
}
let FakeImageURL = 'https://cdn.contentder.com/img/fakeimg.jpg';