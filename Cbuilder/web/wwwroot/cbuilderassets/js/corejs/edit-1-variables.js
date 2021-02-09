var rowOption = GeneralOptionDOM('row-options', 'Row', 'row', true, 'dragRow', true, 'copyRow', false, '', false, true, 'Manage Columns');
var textOption = `<div class="SetHdlr">
    <span class="stng">
        <i class="cb-stng" title="Text settings"></i>
        <ul class="setDrp no_txt">
            <li class="com-settings" data-type="text">
                <span class="text-wrp">Text Settings</span>
                <i class="cb-mxr" title="Text Settings"></i>
            </li>
            <li class="s-style" data-type="text">
                <span class="text-wrp">Style</span>
                <i class="cb-stl" title="Style"></i>
            </li>
            <li class="deletehelper delete_icon">
                <i class="cb-del" title="Delete"></i>
            </li>
        </ul>
    </span>
    <span class="sortComponent"><i class="cb-drg" title="Drag Up and down"></i></span>
</div>`;
//var textOption = GeneralOptionDOM('text-options', 'Text', 'text', true, 'sortComponent');
var colortextOption = GeneralOptionDOM('colortext-options', 'Text', 'color text', true, 'sortComponent');
var imageOption = GeneralOptionDOM('img-options', 'Image', 'image', true, 'sortComponent');
var fontOption = GeneralOptionDOM('font-options', 'Icon', 'paragraph', true, 'sortComponent');
var holderOption = GeneralOptionDOM('holder-options', 'Holder', 'holder', true, 'sortComponent', true, 'duplicateHolder', false, '', false, '');
//var colOption = GeneralColOptionDOM('col-options', 'Col', 'column', false, '', true, 'copyData', true, 'pasteData', 'showBurgerMenu');
var rowSeparatorOption = GeneralOptionDOM('seperator-options', 'Separator', 'row separator', true, 'dragRow');
var underlineOption = GeneralOptionDOM('underline-options', 'UnderLine', 'row separator', true, 'sortComponent');
var fontIconOption = GeneralOptionDOM('font-icon-options', 'icon', 'font icon', true, 'sortComponent', false, '', false, '', false, true, 'Manage Style');
var linkbuttonIcon = GeneralOptionDOM('button-options', 'link', 'button', true, 'sortComponent', false, '', false, '', false, true, 'Manage Style');
var divEnd = DOMCreateEnd('div');
var spanEnd = '</span>';
var rowInitStart = '<div class="editor-row sfCol_100">';
var rowInitEnd = '</div>';
var divHolderStart = '<div class="editor-component">';
var rawImage = divHolderStart + '<img src="' + webbuildermodulepath + '/img/def5.jpg" style="width:100%" class="editor-image"/>' + divEnd;
var rawParaGraph = divHolderStart + '<p class="editor-para">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>' + divEnd;
var rawHeading = divHolderStart + '<h1 class="editor-heading">Lorem Ipsum<h1>' + divEnd;
var absoluteBar = '<div class="resizebar"></resizebar>';
var noElement = '<div class="noElement"><span class="startnew">Drag a row here</span></div>';
var noColumnElem = '<div class="noColumn">Create column<i class="fa fa-plus" aria-hidden="true"></i></div>';

var columnCreateDOM = '<div class="column-empty">';
columnCreateDOM += '<h4>This is ROW</h4>';
columnCreateDOM += '<p>You can choose given column setup inside ROW or you can create by your own</p>';
columnCreateDOM += '<span class="col-select">';
columnCreateDOM += '<span><img class="imgCreateCol" data-col="1" src="' + webbuildermodulepath + '/img/col1.png"><span>1 column</span></span>';
columnCreateDOM += '<span><img class="imgCreateCol" data-col="2" src="' + webbuildermodulepath + '/img/col2.png"><span>2 columns</span></span>';
columnCreateDOM += '<span><img class="imgCreateCol" data-col="3" src="' + webbuildermodulepath + '/img/col3.png"><span>3 columns</span></span>';
columnCreateDOM += '<span><img class="imgCreateCol" data-col="4" src="' + webbuildermodulepath + '/img/col4.png"><span>4 columns</span></span>';
//columnCreateDOM += '</span>';
columnCreateDOM += spanEnd;
columnCreateDOM += '<div class="clearfix set-custom-col">';
columnCreateDOM += '<label>Set Custom Column</label>';
columnCreateDOM += '<span class="value">';
columnCreateDOM += '<input type="text" class="txtColumNo"> Column(s)';
columnCreateDOM += '<span class="sfCreateRow sfBtn smlbtn-succ icon-icon-tick">Create</span>';
columnCreateDOM += spanEnd;
columnCreateDOM += divEnd;
columnCreateDOM += divEnd;
var rowBasicDOM = '';
var onlineComponentArr = [];
var sageFrameFakeURL = 'fakeHostURL';
var defaultColor = 'rgb(221, 221, 221)';
var blackColor = "#000";
var dragcomponetwidth = '2';
var dragComponetWidth = dragcomponetwidth + 'px';
var fontCollectionBasics = {
    "montserrat": {
        "Text": "Montserrat",
        "weight": [100, 200, 300, 400, 500, 600, 700, 800]
    },
    "opensans": {
        "Text": "Open Sans",
        "weight": [300, 400, 600, 700, 800]
    },
    "rubik": {
        "Text": "Rubik",
        "weight": [300, 400, 500, 700, 900]
    },
    "quicksand": {
        "Text": "Quick Sand",
        "weight": [300, 400, 500, 700]
    },
    "robotoslab": {
        "Text": "Roboto Slab",
        "weight": [100, 200, 400, 700]
    },
    "poppins": {
        "Text": "Poppins",
        "weight": [100, 200, 300, 400, 500, 600, 700, 800, 900]
    },
    "raleway": {
        "Text": "Raleway",
        "weight": [100, 200, 300, 400, 500, 600, 700, 800, 900]
    },
    "oswald": {
        "Text": "Oswald",
        "weight": [200, 300, 400, 500, 600, 700]
    },
    "lato": {
        "Text": "lato",
        "weight": [100, 300, 500, 700, 900]
    },
    "playfair": {
        "Text": "Playfair",
        "weight": [400, 700, 900]
    },
    "sourcesans": {
        "Text": "sourcesans",
        "weight": [200, 300, 400, 600, 700, 900]
    },
    "merriweather": {
        "Text": "Merriweather",
        "weight": [300, 400, 700, 900]
    },

};
var fontCollectionStyling = {
    "kaushan": {
        "Text": "Kaushan",
        "weight": [0]
    },
    "prata": {
        "Text": "Prata",
        "weight": [0]
    },
    "cookie": {
        "Text": "Cookie",
        "weight": [0]
    },
    "abrilfatface": {
        "Text": "Abril Fatface",
        "weight": [0]
    },
    "lobster": {
        "Text": "Lobster",
        "weight": [0]
    },
    "satisfy": {
        "Text": "Satisfy",
        "weight": [0]
    }
};
var marginSliderList = [];
var paddingSliderList = [];
var borderSliderList = [];
var borderHoverSliderList = [];
var boxRadiusSliderList = [];
var boxShadowSliderList = [];
var boxShadowEffectSliderList = [];
var hoverEffect = {
    "bg": "rgba(204, 204, 204, 0)",
    "font": "#000",
    "box": {
        "on": "off",
        "hl": "0px",
        "vl": "1px",
        "br": "5px",
        "c": "#000",
        "i": "false",
    },
    "border": {
        "on": "none",
        "top": "0",
        "right": "0",
        "bottom": "0",
        "left": "0",
        "tc": "#000",
        "rc": "#000",
        "bc": "#000",
        "lc": "#000"
    },
    "zoom": "10",
    "delay": 0
};
var CompenentCreateDOM = '<div class="column-data-empty">';
CompenentCreateDOM += '<h4>This is Column</h4>';
CompenentCreateDOM += '<p>You can Drag and drop Components here</p>';
CompenentCreateDOM += divEnd;
let DropComponent = `<div class="column-data-empty">
                                <h4>This is Container</h4>
                                <p>You can Drag and drop Components here</p>
                         </div>`;
var minFontSize = 1;
var maxFontsize = 1080;
var minImagesize = 1;
var maxImagesize = 1080;
var extentComponent = {};
var option =
    `<div class="setting__handler">
    <span class="settings">
        <i class="fas fa-cog"></i>
        <ul class="setting__drop--menu">
            <li><span class="text-wrp">Settings</span><i class="fas fa-sliders-h" title="Settings"></i></li>
            <li><span class="text-wrp">Background</span> <i class="far fa-edit" title="Styles"></i></li>
            <li class="delete_icon"><span class="text-wrp">Delete</span><i class="far fa-trash-alt" title="Delete"></i></li>
        </ul>
    </span>
</div>`;
//addded
var colOption = `<div class="SetHdlr">
                <span class="stng">
                    <i class="cb-stng"></i>
                    <ul class="setDrp no_txt">
                      <li class ="com-settings" data-type="column"><span class ="text-wrp">Settings</span><i class="cb-mxr" title="Settings"></i></li>
                        <li class ="s-style" data-type="column"><span class ="text-wrp">Style</span><i class="cb-stl" title="Styles"></i></li>
                        <li class ="copyData"><span class ="text-wrp">Copy</span><i class="cb-cpy" title="copy data"></i></li>
                        <li class ="pasteData"><span class ="text-wrp">Copy</span><i class="cb-paste" title="paste data"></i></li>
                        <li class ="holder-bucket"><span class ="text-wrp">Add to Bucket</span><i class="cb-bucket add-to-bucket bucketCol" title="Add To Bucket"></i></li>
                        <li class ="delete_icon deletehelper"><span class ="text-wrp">Delete</span><i class="cb-del deletehelper" title="Delete"></i></li>
                    </ul>
                </span>
            </div>`;
var $activeDOM = $('.activeSettings');
let easyMessageList = {
    "reloadpage": "Changes you made may not be saved. Click Cancel and save the changes",
    "logout": "Did you save your data ? Do you want to Logout?",
    "deletehelper": "Are you sure you want to delete?",
    "publish": " Do you want to publish the site? This will update your live site.",
    "publishtitle": "Publish",
    "savetitle": "Save and Publish",
    "saveandpublish": " Your site is automatically saved. Click on Yes if you also want to update and publish your site instantly.",
    "underconstruction": "Are you sure you want to set site Under Construction ?",
    "underconstructiontitle": "Under Construction",
    "updatecomponent": "Updating component may take a while. Are you sure you want to proceed ?",
    "updatecomponenttitle": "Update Component",
    "emptycolumn": "Do you want to empty column ?",
    "message": "message",
    "themeinstall": "Your current site will all be changed by this Site. You cannot revert the lost data. Do you want to change? ",
    "themeinstalltitle": "Site Install Confirm",
    "themewaiting": "Your theme is being installed. Please have some patience.",
    "componentwaiting": "Your component is being installed. Please have some patience.",
    "componentSettingNotexists": "It seems like component is either renamed or deleted. "
};
var staticDOMs = {
    divbackcolorchoose: '<div class="field-row stElWrap col50-50" id="divBackColorChoose"><label class="fCol">Background Color</label><div class="fCol TxAl-r"><span class="color-picker-holder chooseBGColors selected" id="chooseColorColBG" style="background-color:rgba(247, 247, 247,.8);color:rgb(34, 34, 34);"></span></div></div>',
    //divbackimagechoose: '<div class="field-row stElWrap col100"><div class="img-preview"><img id="RowBGImageSrc" src="/modules/webbuilder/img/tiger.jpg" class="imageBG"></div><span id="RowBGImage" class="change_image">Change Image</span></div><div class="field-row stElWrap col50-50"><label class="fCol">Background Style</label><div class="fCol TxAl-r"><span class="select__box"><select id="bgImageEffect"><option value="background-effect-size-contain">None</option><option value="background-effect-image-parallax">Parallax</option><option value="background-effect-size-cover">Cover</option></select></span></div></div><div class="field-row stElWrap col50-50 setting__has--child"><label class="fCol">Shaded Layer</label><div class="fCol TxAl-r"><span class="toggle_btn"><input type="checkbox" id="shadedLayerActive" name="toggleButton"><label for="toggleButton" class="tgl_slider"></label></span></div></div><div class="child__setting--wrap" id="divPickShaded" style="display: none;"><div class="field-row stElWrap col50-50"><label class="fCol">Layer Color</label><div class="fCol TxAl-r"><span class="color-picker-holder chooseBGColors selected" id="chooseColorShadedCol" style="background-color:rgba(247, 247, 247,.8);color:rgb(34, 34, 34);"></span></div></div></div>',
    divbackimagechoose: '<div class="field-row stElWrap col100"><div class="img-preview"><img id="RowBGImageSrc" src="/modules/webbuilder/img/tiger.jpg" class="imageBG"></div><span id="RowBGImage" class="change_image">Change Image</span></div><div class="field-row stElWrap col50-50"><label class="fCol">Background Style</label><div class="fCol TxAl-r"><span class="select__box"><select id="bgImageEffect"><option value="background-effect-size-contain">None</option><option value="background-effect-image-parallax">Parallax</option><option value="background-effect-size-cover">Cover</option></select></span></div></div><div class="field-row stElWrap col50-50" id="divBackgroundPositionTab" style="display:none;"><label class="fCol">Background Position</label><div class="fCol TxAl-r"><span class="select__box"><select id="bgImagePosition"><option value="bgp-p-left">left</option><option value="bgp-p-center">center</option><option value="bgp-p-right">right</option></select></span></div></div><div class="field-row stElWrap col50-50" id="divBackgroundPositionCover" style="display:none;"><label class="fCol">Background Position</label><div class="fCol TxAl-r"><span class="select__box"><select id="bgImageCoverPosition"><option value="bgp-c-left-top">left top</option><option value="bgp-c-left-center">left center</option><option value="bgp-c-left-bottom">left bottom</option><option value="bgp-c-right-top">right top</option><option value="bgp-c-right-center">right center</option><option value="bgp-c-right-bottom">right bottom</option><option value="bgp-c-center-top">center top</option><option value="bgp-c-center-center">center center</option><option value="bgp-c-center-bottom">center bottom</option></select></span></div></div><div class="field-row stElWrap col50-50 setting__has--child"><label class="fCol">Shaded Layer</label><div class="fCol TxAl-r"><span class="toggle_btn"><input type="checkbox" id="shadedLayerActive" name="toggleButton"><label for="toggleButton" class="tgl_slider"></label></span></div></div><div class="child__setting--wrap" id="divPickShaded" style="display: none;"><div class="field-row stElWrap col50-50"><label class="fCol">Layer Color</label><div class="fCol TxAl-r"><span class="color-picker-holder chooseBGColors selected" id="chooseColorShadedCol" style="background-color:rgba(247, 247, 247,.8);color:rgb(34, 34, 34);"></span></div></div></div>',
    //backgroundtab: '<div class="field-row"><div class="field-row stElWrap col50-50"><label class="fCol">Background</label><div class="fCol TxAl-r"><span class="select__box"><select id="selBackround"><option value="none">None</option><option value="color">Color</option><option value="image">Image</option></select></span></div></div><div class="field-row stElWrap col50-50" id="divBackColorChoose" style="display: none;"><label class="fCol">Background Color</label><div class="fCol TxAl-r"><span class="color-picker-holder chooseBGColors selected" id="chooseColorColBG" style="background-color:rgba(247, 247, 247,.8);color:rgb(34, 34, 34);"></span></div></div><div class="hidden-div field-row" id="divBackImageChoose" style="display: none;"><div class="field-row stElWrap col100"><div class="img-preview"><img id="RowBGImageSrc" src="/modules/webbuilder/img/tiger.jpg" class="imageBG"></div><span id="RowBGImage" class="change_image">Change Image</span></div><div class="field-row stElWrap col50-50"><label class="fCol">Background Style</label><div class="fCol TxAl-r"><span class="select__box"><select id="bgImageEffect"><option value="background-effect-size-contain">None</option><option value="background-effect-image-parallax">Parallax</option><option value="background-effect-size-cover">Cover</option></select></span></div></div><div class="field-row stElWrap col50-50 setting__has--child"><label class="fCol">Shaded Layer</label><div class="fCol TxAl-r"><span class="toggle_btn"><input type="checkbox" id="shadedLayerActive" name="toggleButton"><label for="toggleButton" class="tgl_slider"></label></span></div></div><div class="child__setting--wrap" id="divPickShaded" style="display: none;"><div class="field-row stElWrap col50-50"><label class="fCol">Layer Color</label><div class="fCol TxAl-r"><span class="color-picker-holder chooseBGColors selected" id="chooseColorShadedCol" style="background-color:rgba(247, 247, 247,.8);color:rgb(34, 34, 34);"></span></div></div></div></div></div>',
    backgroundtab: '<div class="field-row"><div class="field-row stElWrap col50-50"><label class="fCol">Background</label><div class="fCol TxAl-r"><span class="select__box"><select id="selBackround"><option value="none">None</option><option value="color">Color</option><option value="image">Image</option></select></span></div></div><div class="field-row stElWrap col50-50" id="divBackColorChoose" style="display: none;"><label class="fCol">Background Color</label><div class="fCol TxAl-r"><span class="color-picker-holder chooseBGColors selected" id="chooseColorColBG" style="background-color:rgba(247, 247, 247,.8);color:rgb(34, 34, 34);"></span></div></div><div class="hidden-div field-row" id="divBackImageChoose" style="display: none;"><div class="field-row stElWrap col100"><div class="img-preview"><img id="RowBGImageSrc" src="/modules/webbuilder/img/tiger.jpg" class="imageBG"></div><span id="RowBGImage" class="change_image">Change Image</span></div><div class="field-row stElWrap col50-50"><label class="fCol">Background Style</label><div class="fCol TxAl-r"><span class="select__box"><select id="bgImageEffect"><option value="background-effect-size-contain">None</option><option value="background-effect-image-parallax">Parallax</option><option value="background-effect-size-cover">Cover</option></select></span></div></div><div class="field-row stElWrap col50-50" id="divBackgroundPositionTab" style="display:none;"><label class="fCol">Background Position</label><div class="fCol TxAl-r"><span class="select__box"><select id="bgImagePosition"><option value="bgp-p-left">left</option><option value="bgp-p-center">center</option><option value="bgp-p-right">right</option></select></span></div></div><div class="field-row stElWrap col50-50" id="divBackgroundPositionCover" style="display:none;"><label class="fCol">Background Position</label><div class="fCol TxAl-r"><span class="select__box"><select id="bgImageCoverPosition"><option value="bgp-c-left-top">left top</option><option value="bgp-c-left-center">left center</option><option value="bgp-c-left-bottom">left bottom</option><option value="bgp-c-right-top">right top</option><option value="bgp-c-right-center">right center</option><option value="bgp-c-right-bottom">right bottom</option><option value="bgp-c-center-top">center top</option><option value="bgp-c-center-center">center center</option><option value="bgp-c-center-bottom">center bottom</option></select></span></div></div><div class="field-row stElWrap col50-50 setting__has--child"><label class="fCol">Shaded Layer</label><div class="fCol TxAl-r"><span class="toggle_btn"><input type="checkbox" id="shadedLayerActive" name="toggleButton"><label for="toggleButton" class="tgl_slider"></label></span></div></div><div class="child__setting--wrap" id="divPickShaded" style="display: none;"><div class="field-row stElWrap col50-50"><label class="fCol">Layer Color</label><div class="fCol TxAl-r"><span class="color-picker-holder chooseBGColors selected" id="chooseColorShadedCol" style="background-color:rgba(247, 247, 247,.8);color:rgb(34, 34, 34);"></span></div></div></div></div></div>',
    txtbasictab: '<div class="field-row"><div class="field-row stElWrap col100" id="textSet_width"><span class="range__slider fCol"><div id="fontWidthSlider"><div id="fontWidthHandle" class="ui-slider-handle" title="Width">0</div></div></span></div><div class="field-row stElWrap col100" id="textSet_size"><span class="range__slider fCol"><div id="fontsizeSlider"><div id="fontsizeHandle" class="ui-slider-handle" title="Font Size">0</div></div></span></div><div class="field-row stElWrap col100" id="textSet_lineheight"><span class="range__slider fCol"><div id="lineheightslider"><div id="lineheighthandle" class="ui-slider-handle" title="Line Height">0</div></div></span></div><div class="field-row stElWrap col100" id="textSet_spacing"><span class="range__slider fCol"><div id="letterSpacingSlider"><div id="letterSpacingHandle" class="ui-slider-handle" title="Letter Spacing">0</div></div></span></div><div class="field-row stElWrap col50-50" id="textSet_style"><label class="fCol">Text Style </label><span id="textStyle" class="textSWrapper"><i class="fa fa-italic" data-name="FsI" aria-hidden="true"></i><i class="fa fa-underline" data-name="TdU" aria-hidden="true"></i><i class="fa fa-strikethrough" data-name="TdS" aria-hidden="true"></i></span></div><div class="field-row stElWrap col50-50" id="textSet_heading"><label class="fCol">Heading Tag</label><span class="fCol TxAl-r select__box"><select id="textHeading"></select></span></div><div class="field-row stElWrap col50-50" id="textSet_transform"><label class="fCol">Text Transform </label><span class="fCol TxAl-r select__box"><select id="textTransform"><option value="">None</option><option value="txU">UPPERCASE</option><option value="txL">lowercase</option><option value="txC">Captitalize</option></select></span></div><div class="field-row stElWrap col50-50" id="textSet_family"><label class="fCol">Font Family </label><span class="fCol TxAl-r select__box"><select id="fontfamily"><option value="">Coming soon...</option></select></span></div><div class="field-row stElWrap col50-50" id="textSet_weight"><label class="fCol">Font Weight </label><span class="fCol TxAl-r select__box"><select id="fontWeight"><option value="">Coming soon...</option></select></span></div><div class="field-row stElWrap col50-50" id="textSet_color"><label class="fCol">Font Color </label><span class="fCol TxAl-r"><span class="color-picker-holder chooseColor" id="chooseFontColor"></span></span></div></div>',
    scrolltotop: '<div class="scrolltotop" id="ScroolToTop"><div class="ScrollToTop editor-component"><div class="scrollDOM"><i class="fa fa-arrow-up" aria-hidden="true"></i></div></div></div>',
    siteheadertab: '<div data-type="siteheader" data-headertype="lLogo" class="cRow sfCol_100 Pr-0 Pl-0 TxAl-l Pt-20 Pb-20" data-backgroundcolor="color" data-backgroundimage="" style="color: rgb(34, 34, 34); background-color: rgba(255, 255, 255, 0.506);" data-mbgcolor="rgba(46, 90, 232,1)" data-mcolor="rgba(255, 255, 255,0.79)"><div class="SetHdlr"><span class="stng"><i class="cb-stng" title="Settings"></i><ul class="setDrp no_txt" style="display: none;"><li class="com-settings" data-type="siteheader" title="setting"><span class="text-wrp">settings</span><i class="cb-mxr" title="setting"></i></li><li class="s-style" data-type="siteheader" title="style"><span class="text-wrp">style</span><i class="cb-stl" title="style"></i></li></ul></span></div><div class="editor-row-container container-extralarge"><div class="cGrid "><div class="editor-col ui-sortable ui-droppable cCol sfCol_20" data-type="column"><div class="editor-component sfCol_100 tsfCol_100 msfCol_100 Dib" data-type="Image Link"><div class="SetHdlr no-drag"><span class="stng"><i class="cb-stng" title="Settings"></i><ul class="setDrp no_txt"><li class="com-settings" data-type="Image Link"><span class="text-wrp">Settings</span><i class="cb-mxr" title="Settings"></i></li><li class="s-style" data-type="Image Link"><span class="text-wrp">Style</span><i class="cb-stl" title="Styles"></i></li><li class="image-settings" data-type="image"><span class="text-wrp">Change Image</span><i class="cb-img" title="Change Image"></i></li></ul></span></div><a><img id="headerLogo" src="/cbuilderassets/img/logo.png" class="editor-image sfCol_100 tsfCol_100 msfCol_100" data-stickylogo="/cbuilderassets/img/logo2.png"></a></div></div><div data-type="column" style="display: block;" class="editor-col cCol ui-state-default ui-sortable ui-droppable sfCol_80 msty-tred"><div class="editor-component menuHeader sfCol_100 text-align-right Pt-0 Pr-0 Pb-0 Pl-0 TxAl-r activeSetting  mDn tDn" data-backgroundcolor="color" data-backgroundimage="" style="float:left; background-color: rgba(143, 170, 211, 0); color: rgb(34, 34, 34);" data-mcolor="rgba(0, 0, 0,1)" data-mbgcolor="rgba(255, 255, 255,1)" data-type="menu"><div class="SetHdlr no-drag"><span class="stng"><i class="cb-stng" title="MenuSetings"></i><ul class="setDrp no_txt" style="display: none;"><li class="com-settings" data-type="menu" data-menutype="1" title="menu"><span class="text-wrp">menu</span><i class="cb-menu" title="menu"></i></li><li class="com-settings" data-type="menupages" title="pages"><span class="text-wrp">pages</span><i class="cb-add-page" title="pages"></i></li></ul></span></div><nav class="editor-com-nav nav-style-fill" data-active="mutiplepage"><ul class="eb-menu sfDropdown clearfix sf-js-enabled" style="" data-textcolor="rgba(90, 90, 90,1)" data-navhamtype="ham-right" data-navlinkbgcol="rgba(46, 90, 232,1)"></ul><ul class="onepagemenu sfDropdown clearfix sf-js-enabled" style="display: none;" data-textcolor="rgba(54, 58, 63,1)"></ul></nav><span class="plusBtn"><i class="fa fa-plus-circle"></i></span></div><div id="menuholder" class="editor-component sfFixed holder sfCol_100 tsfCol_100 tDib msfCol_100"  data-type="holder" style="float:left;"><div class="SetHdlr no-drag"><span class="stng"><i class="cb-stng" title="Settings"></i><ul class="setDrp no_txt"><li class="com-settings" data-type="holder"><span class="text-wrp">Settings</span><i class="cb-mxr" title="Settings"></i></li><li class="s-style" data-type="holder"><span class="text-wrp">Style</span><i class="cb-stl" title="Style"></i></li></ul></span></div><div class="editor-col ui-state-default sfFixed sfCol_100 ui-sortable ui-droppable"></div></div></div><div class="editor-col cCol ui-state-default ui-sortable ui-droppable sfCol_80 msty-ham ham-right Dn tDb mDb" data-type="column" style=""><div class="res-menu-trigger"><span></span><span></span><span></span></div><div class="editor-component menuHeader sfCol_100 text-align-right TxAl-l Pt-20 Pr-20 Pb-20 Pl-20" data-backgroundcolor="color" data-backgroundimage="" style="background-color: rgb(231, 231, 231); color: rgb(34, 34, 34);" data-mcolor="rgba(0, 0, 0,1)" data-mbgcolor="rgba(255, 255, 255,1)" data-type="menu"><div class="SetHdlr no-drag"><span class="stng"><i class="cb-stng" title="MenuSetings"></i><ul class="setDrp no_txt" style="display: none;"><li class="com-settings" data-type="menu" data-menutype="1" title="menu"><span class="text-wrp">menu</span><i class="cb-menu" title="menu"></i></li><li class="com-settings" data-type="menupages" title="pages"><span class="text-wrp">pages</span><i class="cb-add-page" title="pages"></i></li></ul></span></div><nav class="editor-com-nav nav-style-fill" data-active="mutiplepage"><ul class="eb-menu sfDropdown clearfix sf-js-enabled" style="" data-textcolor="rgba(54, 58, 63,1)" data-navhamtype="ham-right"></ul><ul class="onepagemenu sfDropdown clearfix sf-js-enabled" style="display: none;" data-textcolor="rgba(54, 58, 63,1)"></ul></nav><span class="plusBtn"><i class="fa fa-plus-circle"></i></span></div></div></div><span class="addPro headeradd"><i class="fa fa-plus"></i></span></div></div>',
    onecolumnfooter: '<div class="cRow TxAl-c" data-type="row"><div class="SetHdlr"><span class="stng" ><i class="cb-stng" title="Settings" data-title="footer"></i><ul class="setDrp"><li class="com-settings" data-type="row" data-title="footer"><span>Settings</span><i class="cb-mxr"></i></li><li class="s-style" data-type="row" data-title="footer"><span>Style</span><i class="cb-stl"></i></li><li class="com-style" data-type="row" data-title="footer\'s column"><span>Column</span><i class="cb-col"></i></li></ul></span></div><div class="cGrid "><div class="editor-col cCol ui-state-default sfFixed  ui-sortable ui-droppable sfCol_100 tsfCol_100 msfCol_100 mMt-0 mMb-0 mPt-0 mPr-0 mPb-0 mPl-0 mTxAl-n mTxAl-o mDib tDib tMt-0 tMb-0 tPt-0 tPr-0 tPb-0 tPl-0 tTxAl-n tTxAl-o Pt-0 Pr-0 Pb-0 Pl-0 TxAl-n TxAl-o" data-type="column"><div class="SetHdlr"><span class="stng"><i class="cb-stng"></i><ul class="setDrp no_txt"><li class="com-settings" data-type="column"><span class="text-wrp">Settings</span><i class="cb-mxr" title="Settings"></i></li><li class="s-style" data-type="column"><span class="text-wrp">Style</span><i class="cb-stl" title="Styles"></i></li><li class="copyData"><span class="text-wrp">Copy</span><i class="cb-cpy" title="copy data"></i></li><li class="pasteData"><span class="text-wrp">Paste</span><i class="cb-paste" title="paste data"></i></li><li class="delete_icon deletehelper"><span class="text-wrp">Delete</span><i class="cb-del deletehelper" title="Delete"></i></li></ul></span></div><div class="column-data-empty"><h4>This is Column</h4><p>You can Drag and drop Components here</p></div></div></div></div>',
    responsivebasic: '<div class="field-row" id="responsiveBasicDOM"><div class="field-row stElWrap col100 Dn" data-opt="height"><span class="range__slider fCol"><div id="boxHeightSlider"><div id="boxHeightHandle" class="ui-slider-handle" title="Height">0</div></div></span></div><div class="field-row stElWrap col100 Dn" data-opt="lineheight"><span class="range__slider fCol"><div id="respoLineHeightSizeSlider"><div id="respolineHeightHandle" class="ui-slider-handle" title="Line Height">0</div></div></span></div><div class="field-row stElWrap col100  Dn" data-opt="width"><span class="range__slider fCol"><div id="boxWidthSlider"><div id="boxWidthHandle" class="ui-slider-handle" title="Width">0</div></div></span></div><div class="field-row stElWrap col100 Dn" data-opt="fontsize"><span class="range__slider fCol"><div id="fontSizeSlider"><div id="fontSizeHandle" class="ui-slider-handle" title="Font Size">0</div></div></span></div><div class="field-row stElWrap col80-20 Dn" data-opt="visibility"><label class="fCol">Visibility</label><span class="fCol toggle_btn"><input id="deviceVisibility" name="enable visibility" type="checkbox" /><label for="deviceVisibility" class="tgl_slider"></label></span></div><div class="Dn" data-opt="ordering"><div class="field-row stElWrap col100"><label class="fCol">Rearrange Columns </label></div><div class="field-row stElWrap col100"><div class="orderWrappers PosR RearrangeColumnWrapper " id="sortedData"></div></div></div></div>',
    rowadd: '<div class=\'proLoader\' data-online="false"><div class="proLoaderArea cGrid "><div class=\'sfCol_25 compoLists\'><h2>Please choose what you want to place in this Row Section.</h2><!-- Search --><div class="module-search"><input type="text" placeholder="Search components" id="procomponentSearch"><i class="fa fa-refresh" id="refreshProSearch"></i></div><!--Ends Search--><!-- All Pro Components List --><div class="proItemsList"></div><!-- Ends Component wrapper --><span class="getOnlCompo" id="getOnlCompo">Online Components</span></div><div class=\'sfCol_75 compoOptions PosR\'><div class="actionBtns"><a href="#" class="smlBtn Dn">Help Video</a><div class="applyArea"><span id="ApplyProComponent" class="sfBtn smlbtn-succ"><i class="cb-tick"></i>Apply</span></div><span class="cb-close"></span></div><div class="proLoaderArea cGrid "><div class="ImageSliderDOM sfCol_80 overflow-hidden options-display-inside" data-id="" data-delay="5000" data-loop="" style="height: 400px; width:80%" data-transition="slide"><div class="ImageSliderWrapper SliderWrapper"><div class="ImageSlider"><ul class="itemsWrapper"></ul></div><!--Next-prev--><div class="arrows-wrapper"><span class="prev-btn"><i class="fa fa-chevron-left" aria-hidden="true"></i></span><span class="next-btn"><i class="fa fa-chevron-right" aria-hidden="true"></i></span></div><!--Pager dot--><div class="pager-dot"><span class="active-dot"></span><span></span><span></span><span></span></div></div></div></div></div></div></div>',
};
var customEffects = {
    skew: {
        group: "Custom",
        effect: "skew",
        name: 'Skew In',
        values: [
            { keyframe: 0, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: 0, translateY: 0, translateZ: 0 },
            { keyframe: 25, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: -10, translateY: -20, translateZ: 0 },
            { keyframe: 50, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: -40, translateY: -60, translateZ: 0 },
            { keyframe: 75, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: -100, translateY: -100, translateZ: 0 },
            { keyframe: 100, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: 0, translateY: 0, translateZ: 0 },
        ]
    }
};


var definedEffects = {
    slideup: {
        group: 'slide',
        effect: 'slideup',
        name: 'Slide-Up',
        values: [
            { keyframe: 0, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: 0, translateY: 0, translateZ: 0 },
            { keyframe: 25, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: -10, translateY: -20, translateZ: 0 },
            { keyframe: 50, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: -40, translateY: -60, translateZ: 0 },
            { keyframe: 75, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: -100, translateY: -100, translateZ: 0 },
            { keyframe: 100, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: 0, translateY: 0, translateZ: 0 },
        ]
    },
    slidedown: {
        group: 'slide',
        effect: 'slidedown',
        name: 'Slide-Down',
        values:[
            { keyframe: 0, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: 0, translateY: 0, translateZ: 0 },
            { keyframe: 25, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: -10, translateY: -20, translateZ: 0 },
            { keyframe: 50, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: -40, translateY: -60, translateZ: 0 },
            { keyframe: 75, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: -100, translateY: -100, translateZ: 0 },
            { keyframe: 100, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: 0, translateY: 0, translateZ: 0 },
        ]
    },
    fadein: {
        group: 'fade',
        effect: 'fadein',
        name: 'Fade In',
        values:[
            { keyframe: 0, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: 0, translateY: 0, translateZ: 0 },
            { keyframe: 25, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: -10, translateY: -20, translateZ: 0 },
            { keyframe: 50, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: -40, translateY: -60, translateZ: 0 },
            { keyframe: 75, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: -100, translateY: -100, translateZ: 0 },
            { keyframe: 100, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: 0, translateY: 0, translateZ: 0 },
        ]
    },
    fadeout: {
        group: 'fade',
        effect: 'fadeout',
        name: 'Fade Out',
        values:[
            { keyframe: 0, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: 0, translateY: 0, translateZ: 0 },
            { keyframe: 25, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: -10, translateY: -20, translateZ: 0 },
            { keyframe: 50, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: -40, translateY: -60, translateZ: 0 },
            { keyframe: 75, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: -100, translateY: -100, translateZ: 0 },
            { keyframe: 100, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: 0, translateY: 0, translateZ: 0 },
        ]
    },
    rotateout: {
        group: "rotate",
        effect: "rotateout",
        name: 'Rotate Out',
        values:[
            { keyframe: 0, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: 0, translateY: 0, translateZ: 0 },
            { keyframe: 25, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: -10, translateY: -20, translateZ: 0 },
            { keyframe: 50, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: -40, translateY: -60, translateZ: 0 },
            { keyframe: 75, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: -100, translateY: -100, translateZ: 0 },
            { keyframe: 100, opacity: 1, rotateX: 0, scaleX: 1, skewX: 0, translateX: 0, translateY: 0, translateZ: 0 },
        ]
    },

};






var effectList = $.extend(definedEffects,customEffects);

function groupEffects(obj, key, removeItem) {
    obj = JSON.parse(JSON.stringify(obj));
    obj = $.map(obj, function (value, index) {
        delete value[removeItem];
        return [value];
    });
    return obj.reduce(function (result, currentValue) {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
            currentValue
        );
        return result;
    }, {});
}

function getEffectList(obj, removeItem) {
    obj = JSON.parse(JSON.stringify(obj));
    obj = $.map(obj, function (value, index) {
        delete value[removeItem];
        return [value];
    });
    return obj;
}
var effectSelectOption = groupEffects(effectList, 'group', "values");
var animationEffectList = getEffectList(effectList, "values");