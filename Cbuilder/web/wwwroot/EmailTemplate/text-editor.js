(function ($) {
    $.TextEditor = function (op, $Parent) {
        var option = $.extend({
            isThemeColor: false,
        }, op);
        var EditorMgr = {
            init: function () {
                $Parent.each(function () {
                    let $this = $(this);
                    EditorMgr.createToolBar($this);
                    EditorMgr.toolBarEvent($this);
                    EditorMgr.documentEvent($this);
                });
            },
            createToolBar: function (parent) {
                var hasToolBar = parent.attr('data-texteditor');
                if (typeof hasToolBar == 'undefined' || hasToolBar.toLowerCase() == 'false') {
                    let DocText = '';
                    let clases = '';
                    let styles = '';
                    if (parent.find('.documenttext').length > 0) {
                        let $DocText = parent.find('.documenttext');
                        DocText = $DocText.html();
                        clases = $DocText.attr('class');
                        styles = $DocText.attr('style');
                    }

                    parent.html(EditorMgr.toolBarDom());
                    let $DocText = parent.find('.documenttext');
                    $DocText.html(DocText);
                    $DocText.addClass(clases);
                    $DocText.attr('style', styles);

                }
                parent.find('.documenttext').focus();

                var basicFontDOM = '';


                var len = EmailBasicFonts.length;
                for (var k = 0; k < len; k++) {
                    basicFontDOM += '<option  style="font-family:' + EmailBasicFonts[k].val + ';" value="' + EmailBasicFonts[k].val + '" >' + EmailBasicFonts[k].text + '</option>';
                }
                parent.find('.cFontFamily').html(basicFontDOM);
                /* EditorMgr.setFontWeightDom(parent.find('.cFontFamily').val(), parent.find('.cFontWeight'));*/
                let Tokens = Object.keys(EmailBasicToken);
                let TokensLen = Tokens.length;
                let MergeTagsHtml = '';
                for (let i = 0; i < TokensLen; i++) {
                    let token = EmailBasicToken[Tokens[i]];
                    MergeTagsHtml += '<span class ="tokenLst" val="' + token.Token + '" title="' + Tokens[i] + '">' + Tokens[i] + '</span>';
                }
                parent.find('.token-list').html();

                var colorPickerOption = {
                    customBG: '#222',
                    margin: '4px -2px 0',
                    doRender: 'div div',
                    buildCallback: function ($elm) {
                        EditorMgr.helper.buildColorPicker($elm, this);
                    },
                    renderCallback: function ($elm, toggled) {
                        EditorMgr.helper.restoreSelection(range);
                        var objColor = EditorMgr.helper.renderCallBackColor(this);
                        EditorMgr.changeTextColor(EditorMgr.helper.rgb2hex(objColor.bgColor));
                        /* Example of implementation*/
                        /*var objColor = RenderCallBackColor(this);
                        objColor.bgColor
                        objColor.textColor
                        apply the color logic here
                        var colorPickerID = $elm.attr('id');*/
                    },
                    positionCallback: function ($elm) {

                    },
                };
                parent.find('.doceditcolor').colorPicker(colorPickerOption);
                /*create slider*/
                var docEdit = parent.find('.documenttext');

                function lineHeightChange(space, $parEle) {
                    docEdit.css('line-height', space + 'px');
                    docEdit.find('*').css('line-height', '');

                }
                var $slider = parent.find('.LineHeightSizeC');
                var $handler = $slider.find('.ui-slider-handle');

                $handler.text(docEdit.css('line-height').replace('px', ''));
                EditorMgr.helper.createSlider($slider, $handler, 10, 100, $handler.text(), lineHeightChange, parent);

                function letterSpaceChange(space, $parEle) {
                    docEdit.css('letter-spacing', space + 'px');
                    docEdit.find('*').css('letter-spacing', '');
                }
                $slider = parent.find('.LetterSpaceSizec');
                $handler = $slider.find('.ui-slider-handle');
                $handler.text(docEdit.css('letter-spacing'));
                EditorMgr.helper.createSlider($slider, $handler, 0, 10, $handler.text(), letterSpaceChange, parent);
                parent.attr('data-texteditor', true);

            },
            toolBarEvent: function (parent) {
                $('.text-editor-toolsbar').hide();
                function hideDropChild() {
                    $('.has-drop-child').find('button').removeClass('active').attr('data-clicked', false);
                    $('.toobar-drop-element').css('display', 'none');
                }
                parent.find('.op-options').hide();
                parent.find('.text-editor-toolsbar').off('click').on('click', function () {
                    $('.text-editor-toolsbar').hide();
                    $(this).show();
                });
                parent.find('.alloptionC').off('click').on('click', function () {
                    var $this = $(this);
                    if ($this.hasClass('rotate')) {
                        $this.removeClass('rotate');
                        $this.attr('title', 'Expand Tools');
                        $('.op-options').hide();
                    }
                    else {
                        $this.addClass('rotate');
                        $('.op-options').show();
                        $this.attr('title', ' Shrink Tools');
                    }

                });
                parent.find('.has-drop-child').find('button').off('click').on('click', function () {
                    var $this = $(this);
                    if ($this.attr('data-clicked') == 'true') {
                        $this.attr('data-clicked', false);
                        $this.next('.toobar-drop-element').hide();
                    }
                    else {
                        $this.attr('data-clicked', true);
                        $('.has-drop-child').find('button').removeClass('active');
                        $('.toobar-drop-element').hide();
                        $this.next('.toobar-drop-element').css('display', 'block');
                    }
                });
                if (typeof jQuery.ui !== 'undefined') {
                    parent.find('.text-editor-toolsbar').draggable(
                        {
                            handle: ' .dragbutton',
                            containment: '.WebBuilderWrapper',
                        }
                    );
                }

                parent.find('.createlinkC').off('focusout').on('focusout', function () {
                    EditorMgr.createLink(parent);
                });
                parent.find('.createlinkC').off('keyup').on('keyup', function () {
                    if ($(this).val() == '')
                        EditorMgr.removeLink(range.endContainer.parentElement);
                });
                parent.find('.boldC').off('click').on('click', function () {
                    $(this).toggleClass('active');
                    hideDropChild();
                    EditorMgr.createBold(parent);
                });
                parent.find('.underlineC').off('click').on('click', function () {
                    $(this).toggleClass('active');
                    hideDropChild();
                    EditorMgr.createUnderline(parent);

                });
                parent.find('.btn-hline').off('click').on('click', function () {
                    hideDropChild();
                    range.insertNode(document.createElement('hr'));
                });

                parent.find('.italicC').off('click').on('click', function () {
                    $(this).toggleClass('active');
                    hideDropChild();
                    EditorMgr.createItalic(parent);
                });
                /*parent.find('.fntIncDec').off().on('click', function () {
                    $('.fontValueC').text($(window.getSelection().anchorNode).css('font-size'));
                });*/
                parent.find('.minusC').off('click').on('click', function () {
                    EditorMgr.changeFontSize(parent, $(this));
                });
                parent.find('.plusC').off('click').on('click', function () {
                    EditorMgr.changeFontSize(parent, $(this));
                });
                parent.find('.ollistC').off('click').on('click', function () {
                    EditorMgr.createList('insertorderedlist', $(this));
                });
                parent.find('.ullistC').off('click').on('click', function () {
                    EditorMgr.createList('insertunorderedlist', $(this));
                });
                parent.find('.formatblockC').off('click').on('click', function () {
                    hideDropChild();
                    EditorMgr.createBlockQuote($(this));
                });
                parent.find('.tool-align').off('click').on('click', 'span', function () {
                    EditorMgr.changeAlignment($(this).attr('title'));
                });
                parent.find('.cFontFamily').off('click').on('change', function () {
                    /*fontWeight($this.val());*/
                    EditorMgr.changeFontFace(parent, $(this).val());
                });
                /*
                parent.find('.cFontWeight').off('click').on('change', function () {
                    EditorMgr.changeFontWeight(parent, $(this).val())
                });*/
                parent.find('.cFontCase').off('click').on('change', function () {
                    EditorMgr.changeTextTransform(parent, $(this).val());
                });
                /*parent.find('.tindentC').off().on('click', function () {
                    EditorMgr.helper.restoreSelection(range);
                    document.execCommand('indent', false, null);
                });
                parent.find('.toutdentC').off().on('click', function () {
                    EditorMgr.helper.restoreSelection(range);
                    document.execCommand('outdent', false, null);
                });
                //parent.find('.has-drop-child').find('span').on('click', function () {
                //                      range = saveSelection();
                //    $(this).parent().css('display', 'block');
                //});*/

                parent.find('.tokenLst').off('click').on('click', function () {
                    EditorMgr.insertToken(parent, $(this).attr('val'));
                });
            },
            createLink: function (parentEle) {
                EditorMgr.helper.restoreSelection(range);
                if (!range.collapsed) {
                    var url = '';

                    url = parentEle.find('.createlinkC').val();
                    if (url.includes('http://')) {
                        url = url.replace(/http:\/\/http:\/\//, "http://");
                    }
                    else if (url.includes('https://')) {
                        url = url.replace(/https:\/\/https:\/\//, "https://");
                    }
                    else if (url == "http://" || url == "https://") {
                        url = '';
                    }
                    else {
                        url = "https://" + parentEle.find('.createlinkC').val();
                    }
                    if (url == "https://" || url == '') {
                        EditorMgr.removeLink(range.endContainer.parentElement);
                    }
                    else {
                        var selection = document.getSelection();
                        document.execCommand('createlink', false, url);
                        var $targetvalue = parentEle.find('.targetTypeC  option:selected').attr('title');
                        selection.anchorNode.parentElement.target = $targetvalue;
                        /*$('.createlinkC').val('');*/
                        $('.dropElement').hide();
                        parentEle.prev().removeClass('active');
                    }
                }

            },
            removeLink: function (ele) {
                if (ele.tagName == 'A') {
                    ele.replaceWith(ele.innerHTML);
                }
                if (ele.tagName != 'P' && ele.parentElement != null) {
                    EditorMgr.removeLink(ele.parentElement);
                }
            },
            createBold: function (parent) {
                document.execCommand('bold');
                range = EditorMgr.helper.saveSelection();
            },
            createItalic: function (parent) {
                document.execCommand('italic', false, null);
                selection = document.getSelection();
                selection.anchorNode.parentElement.style.display = 'inline';
                range = EditorMgr.helper.saveSelection();
                /*if (flagu == true) {
                //    selection.anchorNode.parentElement.style.textDecoration = 'underline';
                //}*/
            },
            createUnderline: function (parent) {
                document.execCommand('underline', false, null);
                range = EditorMgr.helper.saveSelection();
            },
            changeFontSize: function (parent, $this) {
                EditorMgr.helper.restoreSelection(range);

                var font = '';
                if ($this.hasClass('plusC')) {
                    font = $this.prev().text().split('px')[0];
                    if (font < 150)
                        font++;
                    $this.prev().text(font + "px");
                }
                else {
                    font = $this.next().text().split('px')[0];
                    if (font > 10)
                        font--;
                    $this.next().text(font + "px");
                }
                if (!range.collapsed)
                    EditorMgr.helper.applyfontStyle(parent, font, '', '');


            },
            changeFontFace: function (parent, font) {

                /*    EditorMgr.setFontWeightDom(parent.find('.cFontFamily').val(), parent.find('.cFontWeight'));*/

                document.execCommand('fontName', false, font);

            },/*
            changeFontWeight: function (parent, weight) {
                if (!range.collapsed)
                    EditorMgr.helper.applyfontStyle(parent, '', weight, '');
            },*/
            changeTextColor: function (color) {
                document.execCommand('styleWithCSS', false, true);
                document.execCommand("forecolor", false, color);
                var ele = $(range.endContainer.parentElement).parents('ul').eq(0);
                if (ele.length == 0)
                    ele = $(range.endContainer.parentElement).parents('ol').eq(0);
                if (ele.length > 0)
                    ele.attr('style', ele.attr('data-style'));
                range = EditorMgr.helper.saveSelection();
            },
            changeTextTransform: function (parent, value) {
                if (!range.collapsed)
                    EditorMgr.helper.applyfontStyle(parent, '', '', value);
            },
            insertToken: function (parent, text) {
                EditorMgr.helper.restoreSelection(range);
                var txtarea = parent.find('.documenttext');
                var post = EditorMgr.helper.saveSelection();
                var textAreaTxt = txtarea.html();
                txtarea.html((textAreaTxt.substring(0, post.startOffset) + ' ' + text + ' ' + textAreaTxt.substring(post.startOffset)).replace(/&nbsp;/g, ''));
            },
            createList: function (type, $this) {
                EditorMgr.helper.restoreSelection(range);
                document.execCommand(type);
                var selection = document.getSelection();
                $this.parent().prev().removeClass('active');
                var crntTools = $this.parent().parent().parent().parent();
                var rcntTag = selection.anchorNode.parentElement.parentElement;
                if ($(rcntTag).parents('.documenttext').length > 0) {
                    rcntTag.style.fontSize = crntTools.find('.fontValueC').text();
                    /*  rcntTag.style.fontWeight = crntTools.find('.cFontWeight').val();*/
                    rcntTag.style.color = crntTools.find('.DocEditorColorPicker').css('background-color');
                    $(rcntTag).css('font-family', crntTools.find('.cFontFamily').val());

                    if (rcntTag.tagName == 'UL' || rcntTag.tagName == 'OL') {
                        $(rcntTag).attr('data-style', $(rcntTag).attr('style'));
                        var parentP = rcntTag.parentElement;

                        EditorMgr.helper.changePtoDiv($(parentP));
                    }
                }
                range = EditorMgr.helper.saveSelection();

            },
            createBlockQuote: function ($this) {
                selection = document.getSelection();
                var selectquote = selection.anchorNode.parentElement;
                var qlen = $(selectquote).find('blockquote').children().length;
                if ($this.hasClass('active')) {
                    if (selectquote.tagName == 'LI' || $(selectquote).parents('li').length > 0) {
                        var blockquote = $(selectquote).parents('blockquote');
                        blockquote.replaceWith(blockquote.html());
                    } else {

                        if (qlen == 0) {
                            document.execCommand('formatBlock', false, 'p');
                            if (!$(selection.anchorNode.parentElement).hasClass('pClass')) {
                                $(selection.anchorNode.parentElement).addClass('pClass');

                            }
                            else {
                                document.execCommand('formatBlock', false, 'p');
                            }
                        }

                    }
                    $this.removeClass('active');
                }
                else {
                    document.execCommand('formatBlock', false, 'blockquote');
                    $this.addClass('active');
                }
            },
            changeAlignment: function (type) {
                EditorMgr.helper.restoreSelection(range);
                document.execCommand(type, false, null);
            },
            documentEvent: function (parent) {
                $(document).on('click', function (e) {
                    if (!$(e.target).parents().hasClass('documenteditorWrap') && document.getSelection().isCollapsed && !$(e.target).parents().hasClass('cp-color-picker') && !$(e.target).hasClass('cp-color-picker')) {
                        $('.text-editor-toolsbar').fadeOut(200);
                        $('.toobar-drop-element').css('display', 'none');
                        $('.has-drop-child button').attr('data-clicked', false);
                        if (!$(e.target).hasClass('color-picker-holder'))
                            $('.cp-color-picker').hide();
                    }
                });
                parent.find('.documenttext').off('click').on('click', function () {
                    range = EditorMgr.helper.saveSelection();
                    var currentToolBar = $(this).parent().find('.text-editor-toolsbar');
                    $('.text-editor-toolsbar').not(currentToolBar).hide();
                    $('.toobar-drop-element').hide();
                    $('.has-drop-child button').attr('data-clicked', false);
                    currentToolBar.css({
                        /*'top': -currentToolBar.height() + 'px',*/
                        'top': '-40px',
                        'left': '0px'
                    });
                    currentToolBar.fadeIn(200, function () {
                        $(this).css({ 'display': 'block' });
                    });
                    EditorMgr.setToolSettingValue(range.endContainer.parentElement, true, parent.find('.text-editor-toolsbar'));
                });
                parent.find('.documenttext').off('keyup').on('keyup', function (event) {
                    range = EditorMgr.helper.saveSelection();
                    var $this = $(this);
                    var thisToolsBar = $this.parent().find('.text-editor-toolsbar');
                    $('.text-editor-toolsbar').hide();
                    $('.toobar-drop-element').hide();
                    thisToolsBar.show();
                    range = EditorMgr.helper.saveSelection();
                    if (event.keyCode == 8 || event.keyCode == 46) {
                        $this.find('blockquote span').css('background-color', '');
                        $this.find('span').css('background-color', '');
                    }
                    //if (range.startOffset == range.endOffset) {
                    //    EditorMgr.helper.applyfontStyle(parent, thisToolsBar.find('.fontValueC').text(), '', '');
                    //}
                    if (event.keyCode >= 37 && event.keyCode <= 40) {
                        EditorMgr.setToolSettingValue(range.endContainer.parentElement, true, parent.find('.text-editor-toolsbar'));
                    }
                });
                $('.cp-color-picker').on('click', function () {
                    EditorMgr.helper.restoreSelection(range);
                });
            },
            /*   setFontWeightDom: function (fontName, slcFwt) {
                   var fontWeightDOM = '';
                   var weights = EditorMgr.fontCollectionBasics[fontName].weight;
                   var len = weights.length;
                   for (var k = 0; k < len; k++) {
                       fontWeightDOM += '<option value="' + weights[k] + '" >' + weights[k] + '</option>';
                   }
                   slcFwt.html(fontWeightDOM);
               },*/


            setToolSettingValue: function (ele, IsClear, activeToolbar) {

                if (ele != null) {
                    ele = $(ele);
                    if (IsClear) {

                        activeToolbar.find('.boldC,.underlineC,.italicC,.btnlinkC,.tCase,.btn-hline,.formatblockC,.ullistC,.ollistC').removeClass('active');
                        activeToolbar.find('.createlinkC').val('');
                        var style = ele.attr('style');
                        var font = ele.css('font-family').toLowerCase().replace(new RegExp('"', 'g'), '');
                        activeToolbar.find('.cFontFamily').val(font);
                        /* EditorMgr.setFontWeightDom(activeToolbar.find('.cFontFamily').val(), activeToolbar.find('.cFontWeight'))
                         activeToolbar.find('.cFontWeight').val($(ele).css('font-weight'));
                         if (ele.css('font-weight') == '700')
                             activeToolbar.find('.boldC').addClass('active');*/
                        if (ele.css('font-style') === 'italic')
                            activeToolbar.find('.italicC').addClass('active');
                        activeToolbar.find('.DocEditorColorPicker').css('background-color', $(ele).css('color'));
                        activeToolbar.find('.cFontCase').val($(ele).css('text-transform'));
                        activeToolbar.find('.fontValueC').text($(ele).css('font-size'));
                        if (ele.css('text-decoration-line') === 'underline')
                            activeToolbar.find('.underlineC').addClass('active');
                    }


                    switch (ele.prop('tagName')) {
                        case 'B':
                            $('.boldC').addClass('active');
                            break;
                        case 'I':
                            $('.italicC').addClass('active');

                            break;
                        case 'U':
                            $('.underlineC').addClass('active');
                            break;
                        case 'A':
                            activeToolbar.find('.btnlinkC').addClass('active');
                            activeToolbar.find('.createlinkC').val(ele.attr('href'));
                            activeToolbar.find('.targetTypeC').val(ele.attr('target'));
                            break;
                            //case 'P':
                            //    if ($(ele).next().hasClass('underline'))
                            //        $('.btn-hline').addClass('active');
                            //    break;
                            //case 'LI':
                            //    if ($(ele).next().hasClass('underline'))
                            //        $('.btn-hline').addClass('active');
                            //    break;
                            //case 'DIV':
                            //    if ($(ele).next().hasClass('underline'))
                            //        $('.btn-hline').addClass('active');
                            //    break;
                        case 'BLOCKQUOTE':
                            activeToolbar.find('.formatblockC').addClass('active');
                            break;
                        case 'UL':
                            EditorMgr.helper.changePtoDiv(ele.parent());
                            ele.attr('style', ele.attr('data-style'));
                            activeToolbar.find('.listC ').addClass('active');
                            break;
                        case 'OL':
                            EditorMgr.helper.changePtoDiv(ele.parent());
                            ele.attr('style', ele.attr('data-style'));
                            activeToolbar.find('.listC ').addClass('active');
                            break;

                    }

                    /*call recursivly all level of parent until p tag arrived*/
                    if (typeof ele.prop('tagName') != 'undefined' && ele.prop('tagName') != 'P' || ele.prop('tagName') == 'DIV') {
                        EditorMgr.setToolSettingValue(ele.parent(), false, activeToolbar);
                    }
                }
            },
            helper: {
                createSlider: function ($slider, $sliderHandler, min, max, initialValue, callbackFunction, $parent) {
                    $slider.slider({
                        range: "max",
                        min: min,
                        max: max,
                        value: initialValue,
                        create: function () {
                            $sliderHandler.text($(this).slider("value"));
                        },
                        slide: function (event, ui) {
                            var space = ui.value;
                            $sliderHandler.text(space);
                            if (typeof (callbackFunction) === 'function') {
                                callbackFunction(space, $parent);
                            }
                            else if (typeof (callbackFunction) === 'string') {
                                window[callbackFunction](space, $parent);
                            }
                        }
                    });
                },
                applyfontStyle: function (parent, fontsize, weight, texttransform) {
                    let thisLib = this;
                    document.execCommand('fontsize', null, 1);
                    range = EditorMgr.helper.saveSelection();
                    var activeEle = parent.find('font[size="1"]');
                    applyStyle(activeEle);
                    var affectParent = parent.find('.documenttext');
                    if (range.commonAncestorContainer.nodeName == "#text")
                        applyStyle($(range.commonAncestorContainer.parentElement));
                    affectParent.find('span').each(function () {
                        if ($(this).css('font-size') == '10px')
                            applyStyle($(this));
                    });
                    /*affectParent.find('*[data-fontrecover="1"]').each(function () {
                    //    if (fontsize == '' && typeof $(this).attr('data-fontsize') != 'undefined')
                    //        $(this).css('font-size', $(this).attr('data-fontsize'));
                    //});*/

                    function applyStyle(activeEle) {

                        if (activeEle.parents('.documenttext').length > 0) {
                            activeEle.removeAttr('size');
                            if (fontsize != '') {
                                activeEle.css('font-size', fontsize + 'px');
                                activeEle.attr('data-fontsize', fontsize);
                                activeEle.attr('data-fontrecover', 1);
                                activeEle.find('*').each(function () {
                                    $(this).css('font-size', '');
                                });
                            }
                            else {
                                if (activeEle.attr('data-fontsize') != 'undefined') {

                                    activeEle.css('font-size', activeEle.attr('data-fontsize'));
                                }
                                else
                                    activeEle.css('font-size', '');
                            }
                            if (weight !== '') {
                                activeEle.css('font-weight', weight);
                                activeEle.find('*').each(function () {
                                    $(this).css('font-weight', '');
                                });
                            }
                            if (texttransform !== '') {
                                activeEle.css('text-transform', texttransform);
                                activeEle.find('*').each(function () {
                                    $(this).css('text-transform', '');
                                });
                            }

                        }
                    }
                    /*range = EditorMgr.helper.saveSelection();*/

                },
                changePtoDiv: function (ele) {
                    if (ele.prop('tagName') == "P") {
                        var newDiv = document.createElement("div");
                        /*Copy the attributes*/
                        var attributes = $(ele).prop("attributes");
                        $.each(attributes, function () {
                            $(newDiv).attr(this.name, this.value);
                        });
                        newDiv.innerHTML = ele.html();
                        ele.replaceWith(newDiv);
                    }
                },
                wrapBySpan: function (ele) {
                    var selection = window.getSelection().getRangeAt(0);
                    var selectedText = selection.extractContents();
                    var span = document.createElement("span");
                    span.appendChild(selectedText);
                    selection.insertNode(span);
                    return span;
                },
                restoreSelection: function (range) {
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
                saveSelection: function () {
                    var range = null;
                    if (window.getSelection) {
                        sel = window.getSelection();
                        if (sel.getRangeAt && sel.rangeCount) {
                            range = sel.getRangeAt(0);
                        }
                    } else if (document.selection && document.selection.createRange) {
                        range = document.selection.createRange();
                    }
                    return range;
                },
                buildColorPicker: function ($element, $thisElem) {
                    var colorInstance = $thisElem.color,
                        colorPicker = $thisElem;
                    /* original DOM
                    $element.prepend('<div class="cp-panel">' +
                        'R <input type="text" class="cp-r" /><br>' +
                        'G <input type="text" class="cp-g" /><br>' +
                        'B <input type="text" class="cp-b" /><hr>' +
                        'H <input type="text" class="cp-h" /><br>' +
                        'S <input type="text" class="cp-s" /><br>' +
                        'B <input type="text" class="cp-v" /><hr>' +
                        'Paste color code<br>' +
                        '<input type="text" class="cp-HEX" />' +
                        '</div>').on('change', 'input', function (e) {
                            var value = this.value,
                                className = this.className,
                                type = className.split('-')[1],
                                color = {};
                            color[type] = value;
                            colorInstance.setColor(type === 'HEX' ? value : color,
                                type === 'HEX' ? 'HEX' : /(?:r|g|b)/.test(type) ? 'rgb' : 'hsv');
                            colorPicker.render();
                            this.blur();
                        }); */
                    $element.append('<div class="cp-panel">' +
                        /*' <input type="text" class="cp-r Dn" />' +
                        //' <input type="text" class="cp-g Dn" />' +
                        //' <input type="text" class="cp-b Dn" />' +
                        //' <input type="text" class="cp-h Dn" />' +
                        //' <input type="text" class="cp-s Dn" />' +
                        //' <input type="text" class="cp-v Dn" />' +*/
                        'Paste color code<br>' +
                        '<input type="text" class="cp-HEX" />' +
                        '</div>').on('change', 'input', function (e) {
                            var value = this.value,
                                className = this.className,
                                type = className.split('-')[1],
                                color = {};
                            color[type] = value;
                            colorInstance.setColor(type === 'HEX' ? value : color,
                                type === 'HEX' ? 'HEX' : /(?:r|g|b)/.test(type) ? 'rgb' : 'hsv');
                            colorPicker.render();
                            this.blur();
                        });
                    if (option.isThemeColor) {
                        $element.append(GetThemeColor());
                        $('.themeColorpicker').off().on('click', function () {
                            $('.cp-HEX').val($(this).css('background-color'));
                            $('.cp-HEX').trigger('change');
                        });
                    }

                },
                rgb2hex: function (rgb) {
                    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
                    return (rgb && rgb.length === 4) ? "#" +
                        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
                        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
                        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
                },
                renderCallBackColor: function ($thisElem) {
                    var colors = $thisElem.color.colors.RND,
                        modes = {
                            r: colors.rgb.r, g: colors.rgb.g, b: colors.rgb.b,
                            h: colors.hsv.h, s: colors.hsv.s, v: colors.hsv.v,
                            HEX: $thisElem.color.colors.HEX
                        };
                    $('input', '.cp-panel').each(function () {
                        this.value = modes[this.className.substr(3)];
                    });

                    colors = $thisElem.color.colors;
                    var colorsRGB = colors.RND.rgb;
                    var alpha = colors.alpha;
                    var textColor = '';
                    if (colors.RGBLuminance > 0.22) {
                        textColor = '#222';
                    }
                    else {
                        textColor = '#ddd';
                    }
                    var bgColor = 'rgba(' + colorsRGB.r + ', ' + colorsRGB.g + ', ' + colorsRGB.b + ',' + alpha + ')';
                    var colorObj = {
                        'bgColor': bgColor,
                        'textColor': textColor
                    };
                    return colorObj;
                },


                /*makeInitialTextReadOnly: function (input) {
                //    var readOnlyLength = input.value.length;
                //    input.addEventListener('keydown', function (event) {
                //        var which = event.which;
                //        if (((which == 8) && (input.selectionStart <= readOnlyLength))
                //            || ((which == 46) && (input.selectionStart < readOnlyLength))) {
                //            event.preventDefault();
                //        }
                //    });
                //    input.addEventListener('keypress', function (event) {
                //        var which = event.which;
                //        if ((event.which != 0) && (input.selectionStart < readOnlyLength)) {
                //            event.preventDefault();
                //        }
                //    });
                //    input.addEventListener('cut', function (event) {
                //        if (input.selectionStart < readOnlyLength) {
                //            event.preventDefault();
                //        }
                //    });
                //    input.addEventListener('paste', function (event) {
                //        if (input.selectionStart < readOnlyLength) {
                //            event.preventDefault();
                //        }
                //    });
                //}*/

            },

            toolBarDom: function () {
                var html = `<div class="documenteditorWrap">
                   <div class="text-editor-toolsbar">
                      <span>
                      <span class="fa fa-arrows dragbutton" style="line-height:35px"></span>
                      </span>
                      <span class="tool-wrap mDn tDn">
                      <button type="button" class="fa fa-bold boldC" title="bold"></button>
                      </span>
                      <span class="tool-wrap mDn tDn">
                      <button type="button" class="fa fa-italic italicC" title="italic"></button>
                      </span>
                      <span class="tool-wrap mDn tDn">
                      <button type="button" class="fa fa-underline underlineC" title="Underline"></button>
                      </span>
                      <span class="tool-font-color tool-wrap">
                      <span class="color-picker-holder DocEditorColorPicker doceditcolor"></span>
                      </span>
                      <span class="tool-font-family slcwrap" style="width:110px">
                      <select class="cFontFamily">
                      </select>
                      </span>
                      </span>
                      </span>
                      <span class="tool-wrap transform-text has-drop-child op-options mDn tDn">
                         <button type="button" class="tCase" title="Text cases">T<span>T</span></button>
                         <div class="toobar-drop-element  fontcase">
                           <span class="slcwrap"> <select class="cFontCase">
                               <option title="none">None</option>
                               <option title="uppercase">uppercase</option>
                               <option title="lowercase">lowercase</option>
                               <option title="capitalize">capitalize</option>
                            </select></span>
                         </div>
                      </span>
                       <span class ="tool-wrap has-drop-child mDn tDn">
                         <button type="button" class ="btnlistToken" title="Listings">Merge Tags</button>
                         <div class ="toobar-drop-element ul-li token-list"  style="min-width:65px">
                                                     </div>
                      </span>
                      <span class="tool-wrap font-size-text has-drop-child">
                         <button type="button" class="fntIncDec" title="Font Sizes">A<span>a</span></button>
                         <div class="toobar-drop-element fontAddless">
                            <span class="fa fa-minus minusC" title="fontsize" style="border:none"></span>
                            <label id="fontValue" class="fontValueC">14px</label>
                            <span class="fa fa-plus plusC" title="fontsize"></span>
                         </div>
                      </span>
                      <span class="tool-wrap has-drop-child mDn tDn">
                         <button type="button" class="fa fa-align-left" title="Text Aligns"></button>
                         <div class="toobar-drop-element" style="min-width:112px">
                            <div class="tool-align">
                               <span class="fa fa-align-left leftalignC" title="justifyleft"></span>
                               <span class="fa fa-align-center centeralignC" title="justifycenter"></span>
                               <span class="fa fa-align-right rightalignC" title="justifyright"></span>
                               <span class="fa fa-align-justify fullalignC" title="justifyFull"></span>
                            </div>
                         </div>
                      </span>
                      <span class="tool-wrap line-height-text has-drop-child op-options">
                         <button type="button" class="fa fa-text-height" title="line Height Text"></button>
                         <div class="toobar-drop-element tool-slide">
                            <div class="LineHeightSizeC">
                               <div class="ui-slider-handle LineHeightSizeHandleC">0</div>
                            </div>
                         </div>
                      </span>
                      <span class="tool-wrap letter-space-text has-drop-child op-options mDn tDn">
                         <button type="button" class="fa fa-text-width" title="letter Space Text"></button>
                         <div class="toobar-drop-element tool-slide">
                            <div class="LetterSpaceSizec">
                               <div class="ui-slider-handle LetterSpaceSizeSizeHandleC">0</div>
                            </div>
                         </div>
                      </span>
                      <span class="tool-wrap has-drop-child mDn tDn">
                         <button type="button" class="fa fa-ellipsis-v listC" title="Listings"></button>
                         <div class="toobar-drop-element ul-li" style="min-width:65px">
                            <span class="fa fa-list-ul ullistC" title="Unorder list"></span>
                            <span class="fa fa-list-ol ollistC" title="Order list"></span>
                         </div>
                      </span>
                      <span class="tool-wrap  op-options mDn tDn">
                      <button type="button" class="fa fa-minus btn-hline" title="Insert horizontal line"></button>
                      </span>
                      <span class="tool-wrap">
                      <button type="button" class="fa fa-quote-left formatblockC" title="Block Quotes"></button>
                      </span>
                      <span class="tool-wrap has-drop-child">
                         <button type="button" class="fa fa-link btnlinkC" title="Create link"></button>
                         <div id="dropElement" class="toobar-drop-element">
                            <input type="text" class="createlinkC" title="externalLink" required="">
                           <span class="slcwrap"  style="display:none"> <select title="InternalPagesLink" class="internalPagesC"></select></span>
                            <span class="slcwrap"> <select title="targetLink" class="targetTypeC">
                               <option title="_self">Same window</option>
                               <option title="_blank">New window tab</option>
                            </select></span>
                         </div>
                      </span>
                      <span class="tool-wrap show-all">
                      <button type="button" class="fa fa-plus alloptionC" title="Expand Tools"></button>
                      </span>
                   </div>
                   <div class="documenttext" contenteditable="true" style="font-family:montserrat;line-height:20px;font-size:15px;" >
                      <p class="pClass">Your text </p>
                   </div>
                </div>`;
                return html;
            },
            dataHelper: {
                getData: function () {
                    var docEdit = ($Parent).find('.documenttext');
                    var html = '<div class="editor-data-extract documenttext">';
                    html += docEdit.html();
                    html += '</div>';
                    return html;
                },
                setData: function (data) {
                    var docEdit = $($Parent).find('.documenttext');
                    docEdit.html(data);
                    docEdit.html(docEdit.html());
                    var extractData = docEdit.find('.editor-data-extract');
                    if (extractData.length > 0) {
                        docEdit.attr('style', extractData.attr('style'));
                        docEdit.html(extractData.html());
                    }
                    if (docEdit.children().length === 0) {
                        docEdit.html('<p>' + docEdit.html() + '</p>');
                    }
                }
            }
        };
        EditorMgr.init();
        return EditorMgr.dataHelper;
    };
    $.fn.LightTextEditor = function (op) {
        return $.TextEditor(op, this);
    };
})(jQuery);