var endingline = {
    "ending line": {
        "componentname": "ending line",
        "category": "basic",
        "componentBlockDOM": "",
        "icon": "fa fa-file-text",
        "row": false,
        "info": "Ending line with richtext",
        "hidden": false,
        "collection": true,
        "type": "element",
        "pageload": function () {
            this.inheritSettings();
        },
        "inheritSettings": function () {
            let thisComp = this;
            let richText = mailcomponent['rich text'];
            thisComp['settingDOMs'] = richText.settingDOMs;
            thisComp['restoreSelection'] = richText.restoreSelection;
            thisComp['styleDOMs'] = richText.styleDOMs;
            thisComp['remove'] = richText.remove;
            thisComp['eventlistner'] = richText.eventlistner;
        },
        "defaultdata": EasyLibrary.ReadDOM('endingline/view', false),
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            this.inheritSettings();
            if (dropped) {
                $appendLayer.find('.mailRichText').LightTextEditor();
            }
        },
    }
};