var unsubscribe = {
    "unsubscribe link": {
        "componentname": "unsubscribe link",
        "category": "basic",
        "icon": "fa fa-ban",
        "row": false,
        "hidden": false,
        "info": 'This component provide unsubscribe links in email.',
        "onload": function () {
            this.inheritSettings()
        },
        "defaultdata": EasyLibrary.ReadDOM("unsubscribe/view", false),        
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (dropped) {
                this.inheritSettings();
                $appendLayer.find('.txt-wrp').attr('href', CurrentHostURL+'/unsubscribe/user/'+ EmailBasicToken['UnsubscribeLink'].Token);
            }
        },
        "inheritSettings": function () {
            let thisComp = this;
            let plainText = mailcomponent['plain text'];
            thisComp['settingDOMs'] = plainText.settingDOMs;
            thisComp['restoreSelection'] = plainText.restoreSelection;
            thisComp['styleDOMs'] = plainText.styleDOMs;            
            //thisComp['eventlistner'] = plainText.eventlistner;
        },
        "remove": function () {
            $('.unsubscribelink-comp a').attr('href', CurrentHostURL + '/unsubscribe/user/' + EmailBasicToken['UnsubscribeLink'].Token);
        }
    }
}
