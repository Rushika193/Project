var mailPlainText = {
    "plain text": {
        "componentname": "plain text",
        "category": "basic",
        "icon": "fa fa-text-width",
        "row": false,
        "hidden": false,
        "info": 'This component creates an editable textbox which can only be changed in editor mode.',
        "onload": function () {

        },
        "defaultdata": EasyLibrary.ReadDOM("plainText/textView", false),        
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
           
        },
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
                    /*var $txtarea = $parent.find('.txt-wrp');                    
                    var textAreaTxt = $txtarea.html();                           
                    $txtarea.html((textAreaTxt.substring(0, range.startOffset).replace(/&/g, '') + ' ' + $this.attr('data-val') + ' ' + textAreaTxt.substring(range.startOffset)).replace(/nbsp;/g, '').replace(/&/g, ''));                   
                    mailcomponent[compName].restoreSelection(range);                    
                    */
                    document.getElementById('txt_area');
                    insertToken($this.attr('data-val'),range);

                },
                menuItem: menuArr
            });
           // $parent.find('.txt-wrp').LineBreakOverride();

            function insertToken(html,range) {
                var sel;
                if (window.getSelection) {
                    // IE9 and non-IE
                    sel = window.getSelection();
                    if (sel.getRangeAt && sel.rangeCount) {                       
                        range.deleteContents();
                        // Range.createContextualFragment() would be useful here but is
                        // non-standard and not supported in all browsers (IE9, for one)
                        var el = document.createElement("div");
                        el.innerHTML = html;
                        var frag = document.createDocumentFragment(), node, lastNode;
                        while ((node = el.firstChild)) {
                            lastNode = frag.appendChild(node);
                        }
                        range.insertNode(frag);

                        // Preserve the selection
                        if (lastNode) {
                            range = range.cloneRange();
                            range.setStartAfter(lastNode);
                            range.collapse(true);
                            sel.removeAllRanges();
                            sel.addRange(range);
                        }
                    }
                } else if (document.selection && document.selection.type != "Control") {
                    // IE < 9
                    document.selection.createRange().pasteHTML(html);
                }
            }
        },

        "saveSelection": function () {
            var range = null;
            if (window.getSelection) {
                sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                   return sel.getRangeAt(0);
                }
            } else if (document.selection && document.selection.createRange) {
                return document.selection.createRange();
            }
            return null;
        },
		 
        "restoreSelection": function (range) {
            if (range) {
                if (window.getSelection) {
                    sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                } else if (document.selection && range.select) {
                    range.select();
                }
            }
        },
        "settingDOMs": {
            "tabs": {
                "Basic": {
                    "DOM": '<div id="compWidth"></div><div id="txtbasicstng"></div>',
                    "onload": function ($item) {
                        $('#txtbasicstng').AdvanceTextSetting({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.txt-wrp'),
                            label: 'Font Size',
                        });
                        $('#compWidth').AdvanceDimension({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM,
                            options: {
                                max: 100,
                                types: ['width'],
                                unit: '%',
                                label: 'Entire Component Width'
                            }
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Spacing": {
                    "DOM": '<div id="txtspc"></div>',
                    "onload": function ($item) {
                        $('#txtspc').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.txt-wrp')
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Alignment": {
                    "DOM": '<div id="txtalgn"></div>',
                    "onload": function ($item) {
                        $('#txtalgn').AdvanceAlignment({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.txt-wrp'),
                            options: ['horizontal']
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                }

            }
        },
        "styleDOMs": {
            "tabs": {
                "Background": {
                    "DOM": "<div id='txtbg'></div>",
                    "onload": function ($item) {
                        $('#txtbg').AdvanceBackground({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.txt-wrp'),
                            options: ['color']
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },

                "Border": {
                    "DOM": "<div id='txtbdr'></div>",
                    "onload": function ($item) {
                        $('#txtbdr').AdvanceBorder({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.txt-wrp')
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Box Radius": {
                    "DOM": '<div id="txt-br"></div>',
                    "onload": function ($ele) {
                        $('#txt-br').AdvanceBoxRadius({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.txt-wrp')
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Box Shadow": {
                    "DOM": '<div id="txt-bs"></div>',
                    "onload": function ($ele) {
                        $('#txt-bs').AdvanceBoxShadow({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.txt-wrp')
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
            },
            "selectLayer": function ($elem) {
                return $activeDOM;
            },
        },
    }
}
