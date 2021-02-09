var mailRichText = {
    "rich text": {
        "componentname": "rich text",
        "category": "basic",
        "componentBlockDOM": "",
        "icon": "fa fa-file-text",
        "row": false,
        "info":"This component creates text area with text editor toolbar. The settings are applicable to selected text.",
        "hidden": false,
        "collection": true,
        "type": "element",
        "defaultdata": EasyLibrary.ReadDOM('richtext/view', false),      
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
            $parent.find('.mailRichText').LightTextEditor();
            $parent.find('.documenttext').CreateContextMenu({
                title: 'Mail Merge Tags',
                onMenuClick: function ($this, range) {
                  /*  mailcomponent[compName].restoreSelection(range);
                    var $txtarea = $parent.find('.documenttext');
                    var textAreaTxt = $txtarea.html();                                        
                    $txtarea.html((textAreaTxt.substring(0, range.startOffset).replace(/&/g, '') + ' ' + $this.attr('data-val') + ' ' + textAreaTxt.substring(range.startOffset)).replace(/nbsp;/g, ''));*/
                    document.getElementsByClassName('documenttext');
                    insertToken($this.attr('data-val'), range);
                },
                menuItem: menuArr
            });
            //$parent.find('.documenttext').LineBreakOverride();

            function insertToken(html, range) {
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
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (dropped) {
                $appendLayer.find('.mailRichText').LightTextEditor();                
            }                    
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
                "Spacing": {
                    "DOM": '<div id="rchtxtspc"></div>',
                    "onload": function ($item) {
                        $('#rchtxtspc').AdvanceSpacing({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.documenttext')
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },            

            }
        },
        "styleDOMs": {
            "tabs": {
                "Background": {
                    "DOM": "<div id='rchtxtbg'></div>",
                    "onload": function ($item) {
                        $('#rchtxtbg').AdvanceBackground({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.documenttext'),
                            options: ['color']
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },

                "Border": {
                    "DOM": "<div id='rchtxtbdr'></div>",
                    "onload": function ($item) {
                        $('#rchtxtbdr').AdvanceBorder({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.documenttext')
                        })
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Box Radius": {
                    "DOM": '<div id="rchtxt-br"></div>',
                    "onload": function ($ele) {
                        $('#rchtxt-br').AdvanceBoxRadius({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.documenttext')
                        });
                    },
                    "active": function () {
                        $('.actEle').removeClass('actEle');
                        $activeDOM.addClass('actEle');
                    }
                },
                "Box Shadow": {
                    "DOM": '<div id="rchtxt-bs"></div>',
                    "onload": function ($ele) {
                        $('#rchtxt-bs').AdvanceBoxShadow({
                            targetParent: $activeDOM,
                            targetElem: $activeDOM.find('.documenttext')
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
        "remove": function ($viewDom) {
            $('.alloptionC.rotate').trigger('click');
            $viewDom.find('.text-editor-toolsbar').remove();
        },
    }
};