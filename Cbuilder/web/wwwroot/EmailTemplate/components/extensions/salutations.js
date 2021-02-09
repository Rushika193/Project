var salutations = {
    "salutations": {
        "componentname": "salutations",
        "category": "basic",
        "icon": "fa fa-file-text",
        "row": false,
        "hidden": false,
        "info": 'Salutations Component',
        "onload": function () {

        },
        "pageload": function () {
            this.inheritSettings();
        },
        "inheritSettings": function () {
            let salutations = this;
            let text = mailcomponent['plain text'];
            salutations['settingDOMs'] = text.settingDOMs;
            salutations['styleDOMs'] = text.styleDOMs;
            salutations['eventlistner'] = text.eventlistner;
            salutations['saveSelection'] = text.saveSelection;
            salutations['restoreSelection'] = text.restoreSelection;
        },
        "defaultdata": EasyLibrary.ReadDOM("salutations/viewDOM", false),
        "eventlistner": function ($parent) {
            let menuArr = new Array();
            let Tokens = Object.keys(EmailBasicToken);
            let len = Tokens.length;
            for (let i = 0; i < len; i++) {
                let token = EmailBasicToken[Tokens[i]];
                if (token.Type == 'basic') {
                    menuArr.push({ text: Tokens[i], attr: 'data-val="' + token.Token + '"' });
                }
            }
            let compName = $parent.attr('data-type');
            $parent.find('.txt-wrp').CreateContextMenu({
                title: 'Mail Merge Tags',
                onMenuClick: function ($this, range) {
                    var $txtarea = $parent.find('.txt-wrp');
                    var textAreaTxt = $txtarea.html();
                    $txtarea.html((textAreaTxt.substring(0, range.startOffset).replace(/&/g, '') + ' ' + $this.attr('data-val') + ' ' + textAreaTxt.substring(range.startOffset)).replace(/nbsp;/g, ''));
                    mailcomponent[compName].restoreSelection(range);
                },
                menuItem: menuArr
            });
        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            this.inheritSettings();
        },
    }
}
