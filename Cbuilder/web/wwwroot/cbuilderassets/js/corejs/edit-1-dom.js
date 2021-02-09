/*DOM functions*/
function GeneralOptionDOM(optionClass, label, dataType, isdraggable, dragHandle, canDuplicate, duplicateClass, canPaste, pasteClass, showBurgerMenu, showstyle, styleLabel) {
    var optionDOM = '';
    //text to know the option
    if (typeof (showBurgerMenu) !== "undefined" && showBurgerMenu) {
        optionDOM += DOMCreate('i', '', 'fa fa-bars showhideColumns', '', []);
    }
    //optionDOM += DOMCreate('i', label, 'opt-name', '', ['title="option name"']);
    //paste option
    if (typeof (canPaste) !== "undefined" && canPaste)
        optionDOM += DOMCreate('i', 'Paste', 'inactivePaste ' + pasteClass, '', ['title="paste"']);
    //setting options
    optionDOM += DOMCreate('i', 'Settings', 'com-settings', '', ['title="' + label + ' settings"', 'data-type="' + dataType + '"']);
    //copy option
    if (typeof (canDuplicate) !== "undefined" && canDuplicate)
        optionDOM += DOMCreate('i', 'Duplicate', duplicateClass, '', ['title="duplicate"']);
    //setting options
    if (typeof (showstyle) !== "undefined" && showstyle) {
        var stylelbl = 'Style';
        if (typeof (styleLabel) !== "undefined") {
            stylelbl = styleLabel;
        }
        optionDOM += DOMCreate('i', stylelbl, 'com-style', '', ['title="' + stylelbl + ' settings"', 'data-type="' + dataType + '"']);
    }
    //delete  options
    optionDOM += DOMCreate('i', 'Delete', 'deletehelper', '', ['title="delete"']);
    //Wrap options in carries-options
    //drag option
    var tooglereplace = '';
    if (isdraggable)
        tooglereplace += DOMCreate('i', '', 'icon-icon-drag ' + dragHandle, '', ['title="drag"']);
    tooglereplace += label + DOMCreate('i', '', 'tooglesettings fa fa-bars');
    optionDOM = DOMCreate('div', tooglereplace, 'carrier-open-option', '') + DOMCreate('div', optionDOM, 'hide-element  carries-options ' + optionClass);
    return optionDOM;
}
function GeneralColOptionDOM(optionClass, label, dataType, isdraggable, dragHandle, canDuplicate, duplicateClass, canPaste, pasteClass) {
    var optionDOM = '';
    //text to know the option
    if (typeof (showBurgerMenu) !== "undefined") {
        optionDOM += DOMCreate('i', '', 'fa fa-bars showhideColumns', '', []);
    }
    //optionDOM += DOMCreate('i', label, 'opt-name', '', ['title="option name"']);
    //copy option
    if (typeof (canDuplicate) !== "undefined" && canDuplicate)
        optionDOM += DOMCreate('i', 'Copy Components', duplicateClass, '', ['title="duplicate"']);
    //paste option
    if (typeof (canPaste) !== "undefined" && canPaste)
        optionDOM += DOMCreate('i', 'Paste Components', 'inactivePaste ' + pasteClass, '', ['title="paste"']);
    //setting options
    optionDOM += DOMCreate('i', 'Settings', 'com-settings', '', ['title="' + label + ' settings"', 'data-type="' + dataType + '"']);
    //delete  options
    optionDOM += DOMCreate('i', 'Empty Column', 'deletehelper', '', ['title="delete"']);
    //Wrap options in carries-options
    //drag option
    var tooglereplace = '';
    if (isdraggable)
        tooglereplace += DOMCreate('i', '', 'icon-icon-drag ' + dragHandle, '', ['title="drag"']);
    tooglereplace += label + DOMCreate('i', '', 'fa fa-bars');
    optionDOM = DOMCreate('div', tooglereplace, 'carrier-open-option', '') + DOMCreate('div', optionDOM, 'hide-element  carries-options ' + optionClass);
    return optionDOM;
}

function SelectDOMCreate(selID, selClass, optionArray) {
    var selDOM = '<select';
    if (typeof (selID) !== 'undefined' && selID.length > 0) {
        selDOM += ' id="' + selID + '"';
    }
    if (selID !== 'undefined') {
        selDOM += ' class="' + selClass + '"';
    }
    selDOM += '>';
    if (typeof (optionArray) !== 'undefined') {
        var optionArrayLen = optionArray.length;
        for (var i = 0; i < optionArrayLen; i++) {
            selDOM += '<option value="' + optionArray[i][0] + '">' + optionArray[i][1] + '</option>';
        }
    }
    selDOM += '</select>';
    return selDOM;
}
function FieldRowDOMCreate(data) {
    return '<div class="field-row">' + data + '</div>';
}
function FieldRowDOMCreateCol100(data) {
    return '<div class="field-row stElWrap col100">' + data + '</div>';
}
function FieldRowDOMCreateCol90_10(data) {
    return '<div class="field-row stElWrap col90-10">' + data + '</div>';
}
function FieldRowDOMCreateCol80_20(data) {
    return '<div class="field-row stElWrap col80-20">' + data + '</div>';
}
function FieldRowDOMCreateCol70_30(data) {
    return '<div class="field-row stElWrap col70-30">' + data + '</div>';
}
function FieldRowDOMCreateCol50_50(data) {
    return '<div class="field-row stElWrap col50-50">' + data + '</div>';
}

function CreateSliderDOM(sliderID, sliderHandlerID, label) {
    var sliderDOM = '';
    if (typeof (sliderHandlerID) !== 'undefined' && typeof (sliderID) !== 'undefined' && sliderID.length > 0 && sliderHandlerID.length > 0) {
        sliderDOM = DOMCreate('div', '0', 'ui-slider-handle', sliderHandlerID, ['title ="' + label + '"']);
        sliderDOM = DOMCreate('div', sliderDOM, '', sliderID);
        sliderDOM = DOMCreate('span', sliderDOM, 'range__slider fCol');
        sliderDOM = FieldRowDOMCreateCol100(sliderDOM);
    }
    return sliderDOM;
}
function CreateSliderWithColorDOM(sliderID, sliderHandlerID, label, colorID, colorClass) {
    var sliderDOM = '';
    if (typeof (sliderHandlerID) !== 'undefined' && typeof (sliderID) !== 'undefined' && sliderID.length > 0 && sliderHandlerID.length > 0) {
        sliderDOM = DOMCreate('div', '0', 'ui-slider-handle', sliderHandlerID, ['title ="' + label + '"']);
        sliderDOM = DOMCreate('div', sliderDOM, '', sliderID);
        sliderDOM = DOMCreate('span', sliderDOM, 'range__slider fCol') + DOMCreate('span', '', 'color-picker-holder fCol Tx-A-r ' + colorClass, colorID);
        sliderDOM = FieldRowDOMCreateCol90_10(sliderDOM);
    }
    return sliderDOM;
}
function CreateColorPickerDOM(label, colorID, colorClass) {
    var clrDOM = '';
    if (typeof (colorID) !== 'undefined' && typeof (colorClass)) {
        clrDOM = DOMCreate('span', '', 'color-picker-holder ' + colorClass, colorID);
        clrDOM = DOMCreate('label', label, 'fCol') + DOMCreate('div', clrDOM, 'fCol TxAl-r');
        clrDOM = FieldRowDOMCreateCol50_50(clrDOM);
    }
    return clrDOM;
}
function CreateCheckboxDOM(label, chkID, chkCLass) {
    var chkDOM = '';
    if (typeof (chkID) !== 'undefined' && typeof (chkCLass)) {
        chkDOM = ' <input id="' + chkID + '" class="' + chkCLass + '" type="checkbox" />';
        chkDOM += '<label for="' + chkID + '" class="tgl_slider"></label>';
        chkDOM = DOMCreate('label', label, 'fCol') + DOMCreate('div', DOMCreate('span', chkDOM, 'toggle_btn'), 'fCol TxAl-r');
        chkDOM = FieldRowDOMCreateCol50_50(chkDOM);
    }
    return chkDOM;
}