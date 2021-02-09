var TextEditor = {
    "Text editor": {
        "componentname": "Text editor",
        "category": "advance",
        "icon": "fa fa-file-text",
        "row": false,
        "hidden": false,
        "type": "element",
        "defaultdata": EasyLibrary.ReadDOM("document editor/documenteditor"),
        "beforeDrop": function ($this) {
        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            var _this = this;
            _this.common.mouseleave();
            var thisMain;
            var $parent = $appendLayer.find('.documenteditorWrap');
            if (dropped) {
                var TextEditor = MainFuntion($parent);
            }
            else {
                if ($appendLayer.hasClass('site-body')) {
                    $parent.each(function (index, value) {
                        var $thisMain = $(this);
                        thisMain = this;
                        var TextEditor = MainFuntion($thisMain);
                    });
                }
                else {
                    var $parent = $appendLayer.find('.documenteditorWrap');
                    $parent.each(function (index, value) {
                        var TextEditor = new MainFuntion($appendLayer);
                    });
                }

            }
            function MainFuntion($thisMain) {
                var $divCompForm = $thisMain.find('.divCompForm');
                var $documenttext = $thisMain.find('.documenttext');

                var flagb = isActiveFlag = false;
                var flagu = flagi = flagColor = flagfontFam = flagJustify = false;
                var fcolor = flagfontFamVal = flagJustifyValue = '';
                var FontUse = '14px';
                var arr = [];

                $(document).on('click', function (e) {
                    var $this = $(this);
                    if (!$(e.target).parents().hasClass('documenteditorWrap')) {
                        $('.text-deitor-toolsbar').hide();
                        $('.toobar-drop-element').css('display', 'none');
                    }
                });
                $(document).on('click', '.documenttext', function () {
                    $('.text-deitor-toolsbar').hide();
                    $('.toobar-drop-element').hide();
                    var $this = $(this);
                    $this.parent().find('.text-deitor-toolsbar').show();
                    range = saveSelection();
                });
                $(document).on('keyup', '.documenttext', function (event) {
                    range = saveSelection();

                    $('.text-deitor-toolsbar').hide();
                    $('.toobar-drop-element').hide();
                    var $this = $(this);
                    $this.parent().find('.text-deitor-toolsbar').show();
                    range = saveSelection();

                    var $this = $(this);
                    if (event.keyCode == 8 || event.keyCode == 46) {
                        $this.find('blockquote span').css('background-color', '');
                        $this.find('span').css('background-color', '');
                    }
                    if (range.startOffset == range.endOffset) {
                        var fontElements = document.getElementsByTagName("font");

                        for (var i = 0, len = fontElements.length; i < len; ++i) {
                            if (fontElements[i].size == "2") {
                                fontElements[i].removeAttribute("size");
                                fontElements[i].style.fontSize = $this.prev().find('.fontValueC').text();
                                fontElements[i].className = 'f-weight-' + $this.prev().find('.cFontWeight').val();
                                fontElements[i].style.fontFamily = $this.prev().find('.cFontFamily').val();
                            }
                        }
                    }
                });
                $thisMain.find('.text-deitor-toolsbar').on('click', function () {
                    $('.text-deitor-toolsbar').hide();
                    var $this = $(this);
                    $this.show();
                });
                $thisMain.find('.createlinkC').off().on('change', function () {

                    var $this = $(this);
                    restoreSelection(range);
                    var url = '';

                    url = $this.parent().find('.createlinkC').val();
                    if (url.includes('http://')) {
                        url = url.replace(/http:\/\/http:\/\//, "http://");
                    }
                    else if (url.includes('https://')) {
                        url = url.replace(/https:\/\/https:\/\//, "https://");
                    }
                    else {
                        url = "https://" + $this.parent().find('.createlinkC').val();
                    }
                    if (url == "http://" || url == "https://") {
                        SageAlertDialog('Please enter the link.');
                    }
                    else {
                        var selection = document.getSelection();
                        document.execCommand('createlink', false, url);
                        var $targetvalue = $this.parent().find('.targetTypeC  option:selected').attr('title');
                        selection.anchorNode.parentElement.target = $targetvalue;
                        $('.createlinkC').val('');
                        $('.dropElement').hide();
                        $this.parent().prev().removeClass('active');
                    }
                });
                function hideDropChild() {
                    $('.has-drop-child').find('button').removeClass('active');
                    $('.toobar-drop-element').css('display', 'none');
                }

                $thisMain.find('.boldC').off().on('click', function () {
                    var $this = $(this);
                    hideDropChild();
                    if ($this.hasClass('active')) {
                        $this.removeClass('active');
                        isActiveFlag = true;
                        flagb = false;
                    }
                    else {
                        $this.addClass('active');
                        isActiveFlag = false;
                        flagb = true;
                    }
                    document.execCommand('bold', false, null);
                    range = saveSelection();
                });
                $thisMain.find('.underlineC').off().on('click', function () {
                    var $this = $(this);
                    hideDropChild();
                    if ($this.hasClass('active')) {
                        $this.removeClass('active');
                        isActiveFlag = true;
                        flagu = false;
                    }
                    else {
                        $this.addClass('active');
                        isActiveFlag = false;
                        flagu = true;
                    }
                    document.execCommand('underline', false, null);
                    range = saveSelection();
                });
                $thisMain.find('.italicC').off().on('click', function () {
                    var $this = $(this);
                    hideDropChild();
                    if ($this.hasClass('active')) {
                        $this.removeClass('active');
                        isActiveFlag = true;
                        flagi = false;
                    }
                    else {
                        $this.addClass('active');
                        isActiveFlag = false;
                        flagi = true;
                    }
                    document.execCommand('italic', false, null);
                    selection = document.getSelection();
                    selection.anchorNode.parentElement.style.display = 'inline';
                    range = saveSelection();
                    if (flagu == true) {
                        selection.anchorNode.parentElement.style.textDecoration = 'underline';
                    }
                });
                $thisMain.find('.tCase').off().on('click', function () {
                    var $this = $(this);
                    addfont();
                });
                function addfont() {
                    restoreSelection(range);
                    if (range.startOffset == range.endOffset) {
                        $('.fontValueC').text();
                    }
                    else {
                        $('.fontValueC').text(GetFont().split('px')[0] + "px");
                    }
                }
                $thisMain.find('.minusC').off().on('click', function () {
                    var $this = $(this);
                    var sCmd = $this.attr('title');
                    restoreSelection(range);
                    getfontSize(sCmd, $this);

                });
                function getfontSize(sCmd, $this) {
                    if (sCmd == 'fontsize') {
                        var FontCalc = '';
                        var FontCalc = $this.attr('id');
                        changeFont(FontCalc, $this);
                    }
                }
                $thisMain.find('.plusC').off().on('click', function () {
                    var $this = $(this);
                    var sCmd = $this.attr('title');
                    restoreSelection(range);
                    getfontSize(sCmd, $this);
                });
                $thisMain.find('.tindentC').off().on('click', function () {
                    restoreSelection(range);
                    document.execCommand('indent', false, null);
                });
                $thisMain.find('.toutdentC').off().on('click', function () {
                    restoreSelection(range);
                    document.execCommand('outdent', false, null);
                });
                $thisMain.find('.listC').off().on('click', function () {
                    restoreSelection(range);
                    var $this = $(this);
                });
                $thisMain.find('.formatblockC').off().on('click', function () {
                    var $this = $(this);
                    hideDropChild();
                    selection = document.getSelection();
                    var selectquote = selection.anchorNode.parentElement;
                    var $selectquote = $(selectquote).find('blockquote').children().length;

                    if ($this.hasClass('active')) {
                        if ($selectquote == 0) {
                            if ($documenttext.find('blockquote')) {
                                document.execCommand('formatBlock', false, 'p');
                                if (!$(selection.anchorNode.parentElement).hasClass('pClass')) {
                                    $(selection.anchorNode.parentElement).addClass('pClass');
                                }
                            }
                        }
                        else {
                            document.execCommand('formatBlock', false, 'p');
                        }
                        $this.removeClass('active');
                    }
                    else {
                        document.execCommand('formatBlock', false, 'blockquote');
                        $this.addClass('active');
                    }
                });
                $thisMain.find('.btnlinkC').off().on('click', function () {
                    restoreSelection(range);
                });
                $thisMain.find('.leftalignC').off().on('click', function () {
                    restoreSelection(range);
                    document.execCommand('justifyLeft', false, null);
                    flagJustify = true;
                    flagJustifyValue = 'justifyLeft';
                    CommandALL();
                });
                $thisMain.find('.centeralignC').off().on('click', function () {
                    restoreSelection(range);
                    document.execCommand('justifyCenter', false, null);
                    flagJustify = true;
                    flagJustifyValue = 'justifyCenter';
                    CommandALL();
                });
                $thisMain.find('.rightalignC').off().on('click', function () {
                    restoreSelection(range);
                    document.execCommand('justifyRight', false, null);
                    flagJustify = true;
                    flagJustifyValue = 'justifyRight';
                    CommandALL();
                });
                $thisMain.find('.fullalignC').off().on('click', function () {
                    restoreSelection(range);
                    document.execCommand('justifyFull', false, null);
                    flagJustify = true;
                    flagJustifyValue = 'justifyFull';
                    CommandALL();
                });
                $thisMain.find('.ullistC').off().on('click', function () {
                    var $this = $(this);
                    restoreSelection(range);
                    document.execCommand('insertunorderedlist');
                    $this.parent().prev().removeClass('active');

                    selection = document.getSelection();
                    var fontsizelist = $this.parent().parent().parent().parent().find('.fontValueC').text();
                    var fontweightlist = $this.parent().parent().parent().parent().find('.cFontWeight').val();
                    selection.anchorNode.parentElement.style.fontSize = fontsizelist;
                    selection.anchorNode.parentElement.style.fontWeight = fontweightlist;

                    CommandALL();
                });
                $thisMain.find('.ollistC').off().on('click', function () {
                    var $this = $(this);
                    restoreSelection(range);
                    document.execCommand('insertorderedlist');
                    $this.parent().prev().removeClass('active');

                    selection = document.getSelection();
                    var fontsizelist = $this.parent().parent().parent().parent().find('.fontValueC').text();
                    var fontweightlist = $this.parent().parent().parent().parent().find('.cFontWeight').val();
                    selection.anchorNode.parentElement.style.fontSize = fontsizelist;
                    selection.anchorNode.parentElement.style.fontWeight = fontweightlist;
                    CommandALL();
                });
                $thisMain.find('.alloptionC').off().on('click', function () {
                    var $this = $(this);
                    if ($this.hasClass('rotate')) {
                        $this.removeClass('rotate');
                    }
                    else {
                        $this.addClass('rotate');
                    }
                    if ($this.parent().parent().parent().parent().find('.text-deitor-toolsbar').hasClass('all')) {
                        $this.parent().parent().parent().parent().find('.text-deitor-toolsbar').removeClass('all');
                    }
                    else {
                        $this.parent().parent().parent().parent().find('.text-deitor-toolsbar').addClass('all');
                    }
                });
                $thisMain.find('.cFontFamily').html(DOMFontAdvanceCollection());
                $thisMain.find('.cFontFamily').off().on('change', function () {
                    var $this = $(this);
                    range = saveSelection();
                    restoreSelection(range);
                    fontWeight($this.val());
                    document.execCommand('fontName', false, $this.val());
                    selection = document.getSelection();
                    if (selection.anchorNode.parentElement.tagName == 'FONT') {
                        if ($this.parent().next().children().val() == "0") {
                            var fontElements = document.getElementsByTagName("font");
                            document.execCommand('fontSize', false, 2);

                            for (var i = 0, len = fontElements.length; i < len; ++i) {
                                if (fontElements[i].size == "2") {
                                    fontElements[i].removeAttribute("size");
                                    fontElements[i].style.fontSize = $this.prev().find('.fontValueC').text();
                                    $(fontElements[i]).children().each(function () {
                                        if (typeof $(this).attr('class') != 'undefined') {
                                            var fontWeightValue = '';
                                            fontWeightValue = 'f-weight-' + $this.parent().next().find('.cFontWeight').val();
                                            if (typeof $(this).attr('class') != 'undefined') {
                                                matches = $(this).attr('class').match(/\bf-weight-\S+/g);
                                                $(this).removeClass(matches.toString());
                                                if (typeof $(this).children().attr('class') == 'undefined') {
                                                    $(this).contents().unwrap();
                                                }
                                                CheckChildren(this);
                                            }
                                            if (typeof $(this).children().children().attr('class') != 'undefined') {
                                                matches = $(this).children().children().attr('class').match(/\bf-weight-\S+/g);
                                                $(this).children().children().removeClass(matches.toString());
                                                $(this).children().children().parent().html($(this).children().children().html());
                                            }
                                            if (typeof $(this).children().attr('class') != 'undefined') {
                                                matches = $(this).children().attr('class').match(/\bf-weight-\S+/g);
                                                $(this).children().removeClass(matches.toString());
                                                $(this).html($(this).contents().text());
                                            }
                                        }
                                    });
                                }
                            }
                        }
                        else {
                            if (typeof selection.anchorNode.parentElement.className != 'undefined') {
                                var matches = selection.anchorNode.parentElement.className.match(/\bf-weight-\S+/g);
                                if (matches != null) {
                                    $(selection.anchorNode.parentElement).removeClass(matches.toString());
                                }
                            }
                        }
                    }
                    else if (selection.anchorNode.parentElement.tagName == 'B') {
                        selection.anchorNode.parentElement.className = '';
                        $(selection.anchorNode.parentElement).parent().html($(selection.anchorNode.parentElement).html());
                    }
                    else if (selection.anchorNode.parentElement.tagName == 'P') {
                        selection.anchorNode.parentElement.className = 'f-weight-' + $this.parent().next().children().val();
                    }
                    else if (selection.anchorNode.parentElement.tagName == 'SPAN') {
                        $(selection.anchorNode.parentElement).children().each(function () {
                            var matches = $(this).attr('class').match(/\bf-weight-\S+/g);
                            if (matches != null) {
                                $(this).removeClass(matches.toString());

                                if (typeof $(this).children().attr('class') == 'undefined') {
                                    $(this).contents().unwrap();
                                }
                            }
                            CheckChildren(this, matches);
                        });
                    }
                    else if (selection.anchorNode.parentElement.nextElementSibling != null) {
                        if (selection.anchorNode.parentElement.nextElementSibling.tagName == 'FONT') {
                            var matches = selection.anchorNode.parentElement.nextElementSibling.className.match(/\bf-weight-\S+/g);
                            if (matches != null) {
                                $(selection.anchorNode.parentElement.nextElementSibling).removeClass(matches.toString());
                            }
                            selection.anchorNode.parentElement.nextElementSibling.className = selection.anchorNode.parentElement.nextElementSibling.className + ' f-weight-' + $this.parent().next().children().val();
                        }
                    }
                    flagfontFam = true;
                    flagfontFamVal = $this.val();
                    $this.val(flagfontFamVal);
                    CommandALL();
                });
                function removematchClass(child, matches) {
                    child.parentNode.removeClass(matches);
                }
                function CheckChildren(node, matches) {
                    for (var i = 0; i < node.childNodes.length; i++) {
                        var child = node.childNodes[i];
                        CheckChildren(child, matches);
                        removematchClass(child, matches);
                    }
                }
                $thisMain.find('.cFontFamily').on('click', function () {
                    var $this = $(this);
                    hideDropChild();
                    if (range.collapsed == false) {
                        $this.val(GetFontFamily($this));
                    }
                    fontWeight($this.val());
                });
                $thisMain.find('.cFontWeight').off().on('change', function () {
                    var $this = $(this);
                    addfont();
                    restoreSelection(range);
                    hideDropChild();
                    var sCmd = $this.attr('id');
                    if (range.endOffset == range.startOffset) {
                        document.execCommand("fontSize", false, "2");

                        var doc = document.querySelector(".documenteditor");
                        var fontElements = doc.getElementsByTagName("font");
                        var DefaultFontweight = $this.val();
                        for (var fontElement = 0, len = fontElements.length; fontElement < len; ++fontElement) {
                            if (fontElements[fontElement].size == '2') {
                                if (fontElements[fontElement].style.fontWeight != '') {
                                    DefaultFontweight = fontElements[fontElement].style.fontWeight;
                                }
                                $(fontElements[fontElement]).children().each(function () {
                                    if (typeof $(this).attr('class') != 'undefined' || typeof $(this).children().attr('class') != 'undefined') {
                                        var matches = '';
                                        if (typeof $(this).children().attr('class') != 'undefined') {
                                            matches = $(this).children().attr('class').match(/\bf-weight-\S+/g);
                                            $(this).children().removeClass($(this).children().attr('class'));
                                        }
                                        else if (typeof $(this).attr('class') != 'undefined') {
                                            matches = $(this).attr('class').match(/\bf-weight-\S+/g);
                                            $(this).removeClass($(this).attr('class'));
                                        }
                                    }
                                });
                                fontElements[fontElement].className = 'f-weight-' + DefaultFontweight;
                            }
                        }

                    }
                    else {
                        var $parentWeight = $this.parent().parent();
                        var fontexitval = '';

                        selection = document.getSelection();
                        var startOffset = range.startOffset;
                        var endOffset = range.endOffset;
                        document.execCommand('bold', false, null);
                        range = saveSelection();
                        var fontElements = $documenttext.find("b");

                        var DefaultFontweight = $this.val();
                        for (var fontElement = 0, len = fontElements.length; fontElement < len; ++fontElement) {
                            if (fontElements[fontElement].style.fontWeight != '') {
                                DefaultFontweight = fontElements[fontElement].style.fontWeight;
                            }
                            $(fontElements[fontElement]).children().each(function () {
                                if (typeof $(this).attr('class') != 'undefined' || typeof $(this).children().children().attr('class') != 'undefined' || typeof $(this).children().attr('class') != 'undefined') {
                                    var matches = '';
                                    if (typeof $(this).children().children().attr('class') != 'undefined') {
                                        matches = $(this).children().children().attr('class').match(/\bf-weight-\S+/g);
                                        $(this).children().children().removeClass(matches.toString()).addClass('f-weight-' + DefaultFontweight);
                                    }
                                    else if (typeof $(this).attr('class') != 'undefined') {
                                        matches = $(this).attr('class').match(/\bf-weight-\S+/g);
                                        $(this).removeClass(matches.toString()).addClass('f-weight-' + DefaultFontweight);
                                    }
                                    else if (typeof $(this).children().attr('class') != 'undefined') {
                                        matches = $(this).children().attr('class').match(/\bf-weight-\S+/g);
                                        $(this).children().removeClass(matches.toString()).addClass('f-weight-' + DefaultFontweight);
                                    }
                                }
                                $(this).parent().find('font').each(function () {
                                    if (typeof $(this).attr('class') != 'undefined') {
                                        matches = $(this).attr('class').match(/\bf-weight-\S+/g);
                                        $(this).removeClass(matches.toString()).addClass('f-weight-' + DefaultFontweight);
                                    }
                                });
                            });
                            if (range.startOffset != 1 && range.endOffset != 1) {
                                selection.anchorNode.parentElement.className = 'f-weight-' + DefaultFontweight;
                            }
                            if (selection.anchorNode.parentElement.parentElement.tagName == 'SPAN') {
                                var NewElement = $("<b />");
                                $.each(selection.anchorNode.parentElement.attributes, function (i, attrib) {
                                    $(NewElement).attr(attrib.name, attrib.value);
                                });
                            }
                        }
                        if (selection.anchorNode.parentElement.parentElement.tagName == "SPAN") {
                            if (typeof selection.anchorNode.parentElement.parentElement.tagName != 'undefined') {
                                $(selection.anchorNode.parentElement.parentElement).removeAttr('style');
                                $(selection.anchorNode.parentElement.parentElement).children().each(function () {
                                    if (typeof $(this).attr('class') != 'undefined') {
                                        matches = $(this).attr('class').match(/\bf-weight-\S+/g);
                                        $(this).removeClass(matches.toString()).addClass('f-weight-' + DefaultFontweight);
                                    }
                                });
                                var NewElement = $("<b />");
                                $.each(selection.anchorNode.parentElement.parentElement.attributes, function (i, attrib) {
                                    $(NewElement).attr(attrib.name, attrib.value);
                                });
                            }
                            else {
                                $(selection.anchorNode.parentElement).removeAttr('style');
                                $(selection.anchorNode.parentElement).attr('class', 'f-weight-' + DefaultFontweight);
                                var NewElement = $("<b />");
                                $.each(selection.anchorNode.parentElement.attributes, function (i, attrib) {
                                    $(NewElement).attr(attrib.name, attrib.value);
                                });
                            }
                        }
                        if (selection.anchorNode.parentElement.parentElement.tagName == "P") {
                            var $selectionParent = $(selection.anchorNode.parentElement.parentElement);
                            $selectionParent.children().each(function (index, value) {
                                if ($(this).is('font')) {
                                    var thisHTML = (this).outerHTML;
                                    var $$this = $(this);
                                    if (typeof $selectionParent.children().eq(index).attr('style') != 'undefined')
                                        arr[index] = $selectionParent.children().eq(index).css('font-size');
                                }
                            });
                        }
                        if (selection.anchorNode.parentElement.tagName == "SPAN") {
                            $(selection.anchorNode.parentElement).removeAttr('style');
                            $(selection.anchorNode.parentElement).attr('class', 'f-weight-' + DefaultFontweight);
                            var NewElement = $("<b />");
                            $.each(selection.anchorNode.parentElement.attributes, function (i, attrib) {
                                $(NewElement).attr(attrib.name, attrib.value);
                            });
                        }

                        var fontsizelist = $(selection.anchorNode.parentElement).css('font-size');

                        if (selection.anchorNode.parentElement.parentElement.tagName == 'FONT') {
                            selection.anchorNode.parentElement.parentElement.style.fontSize = fontsizelist;
                            selection.anchorNode.parentElement.parentElement.className = 'f-weight-' + DefaultFontweight;
                        }
                        else if (selection.anchorNode.parentElement.parentElement.tagName == 'LI') {
                            selection.anchorNode.parentElement.parentElement.className = 'f-weight-' + DefaultFontweight;
                            selection.anchorNode.parentElement.parentElement.style.fontSize = fontsizelist;
                        }
                        else if (selection.anchorNode.parentElement.parentElement.tagName == 'B') {
                            selection.anchorNode.parentElement.parentElement.className = 'f-weight-' + DefaultFontweight;
                            selection.anchorNode.parentElement.parentElement.style.fontSize = fontsizelist;
                        }
                        else {
                            selection.anchorNode.parentElement.style.fontSize = fontsizelist;
                            var $selectionParent = $(selection.anchorNode.parentElement.parentElement);
                            $selectionParent.children().each(function (index, value) {
                                if ($(this).is('font')) {
                                    var $$this = $(this);
                                    if (typeof arr[index] != 'undefined') {
                                        $selectionParent.children().eq(index).css('font-size', arr[index]);
                                    }
                                }
                            });
                        }
                    }
                });
                $thisMain.find('.cFontCase').off().on('change', function () {
                    var $this = $(this);
                    var trasformValue = '';
                    document.execCommand('fontsize', null, 2);
                    var fontElements = document.getElementsByTagName("font");
                    var FontCaseVal = $this.val();

                    for (var fontElement = 0, len = fontElements.length; fontElement < len; ++fontElement) {
                        if (fontElements[fontElement].size == "2") {
                            fontElements[fontElement].removeAttribute("size");
                            if (FontCaseVal == 'uppercase') {
                                fontElements[fontElement].className = 'editor-text-transform-uppercase';
                            }
                            else if (FontCaseVal == "lowercase") {
                                fontElements[fontElement].className = 'editor-text-transform-lowercase';
                            }
                            else if (FontCaseVal == "capitalize") {
                                fontElements[fontElement].className = 'editor-text-transform-capitalize';
                            }
                            else {
                                fontElements[fontElement].className = '';
                            }
                            fontElements[fontElement].style.fontSize = $this.parent().parent().parent().parent().find('.fontValueC').text();
                            fontElements[fontElement].className = fontElements[fontElement].className + ' f-weight-' + $this.parent().parent().parent().parent().find('.cFontWeight').val();
                        }
                    }
                });
                $thisMain.find('.has-drop-child').find('button').on('click', function () {
                    var $this = $(this);
                    if ($this.hasClass('active')) {
                        $this.removeClass('active');
                        $this.parent().find('.toobar-drop-element').css('display', 'none');
                    }
                    else {
                        $('.has-drop-child').find('button').removeClass('active');
                        $('.toobar-drop-element').css('display', 'none');
                        $this.addClass('active');
                        $this.parent().find('.toobar-drop-element').css('display', 'block');
                        LoadSettingsLineHeightSize($this);
                        LoadSettingsLetterSpacingSize($this);
                    }
                });
                $thisMain.find('.has-drop-child').find('span').on('click', function () {
                    var $this = $(this);
                    range = saveSelection();
                    $this.parent().css('display', 'block');
                });

                function LoadSettingsLineHeightSize($this) {
                    var pClasslen = $this.parent().parent().parent().parent().find('.pClass').length;
                    var blockquotelen = $this.parent().parent().parent().parent().find('blockquote').length;
                    var LineHeight = '';
                    if (pClasslen >= 1) {
                        LineHeight = parseInt($this.parent().parent().parent().parent().find('.pClass').css('line-height'));
                    }
                    if (blockquotelen >= 1) {
                        LineHeight = parseInt($this.parent().parent().parent().parent().find('blockquote').css('line-height'));
                    }
                    function EditorLineHeightSlider(space) {
                        if (pClasslen >= 1) {
                            $this.parent().parent().parent().parent().find('.pClass').css('line-height', space + 'px');
                        }
                        if (blockquotelen >= 1) {
                            $this.parent().parent().parent().parent().find('blockquote').css('line-height', space + 'px');
                        }
                    }
                    AdvanceSageSlider($this.parent().parent().parent().find('.LineHeightSizeC'), $this.parent().parent().parent().find('.LineHeightSizeHandleC'), 10, 100, LineHeight, EditorLineHeightSlider, $parent, '');
                }

                function LoadSettingsLetterSpacingSize($this) {
                    var pClasslen = $this.parent().parent().parent().parent().find('.pClass').length;
                    var blockquotelen = $this.parent().parent().parent().parent().find('blockquote').length;
                    var LetterSpacing = '';
                    if (pClasslen >= 1) {
                        LetterSpacing = parseInt($this.parent().parent().parent().parent().find('.pClass').css('letter-spacing'));
                    }
                    if (blockquotelen >= 1) {
                        LetterSpacing = parseInt($this.parent().parent().parent().parent().find('blockquote').css('letter-spacing'));
                    }
                    function EditorLetterSpacingSlider(space) {
                        if (pClasslen >= 1) {
                            $this.parent().parent().parent().parent().find('.pClass').css('letter-spacing', space + 'px');
                        }
                        if (blockquotelen >= 1) {
                            $this.parent().parent().parent().parent().find('blockquote').css('letter-spacing', space + 'px');
                        }
                    }
                    AdvanceSageSlider($this.parent().parent().parent().find('.LetterSpaceSizec'), $this.parent().parent().parent().find('.LetterSpaceSizeSizeHandleC'), -10, 10, LetterSpacing, EditorLetterSpacingSlider, $parent, '');
                }

                LoadFontFamily();
                function LoadFontFamily() {
                    var defaultFontFamily = 'montserrat';
                    fontWeight(defaultFontFamily);
                    $thisMain.find('.cFontWeight').val('400');
                }
                function fontWeight(fontName, $this) {
                    var fontDOM = DOMFontWeight(fontName);
                    if (fontDOM.length > 0) {
                        $thisMain.find('.cFontWeight').html(fontDOM);
                        if (fontName == 'montserrat') {
                            $thisMain.find('.cFontWeight').val('400');
                        }
                    }
                }
                function GetFontWeight($this) {
                    var getParentName = '';
                    getParentName = document.getSelection().anchorNode.parentElement.tagName;
                }
                function changeFont(FontCalc, $this) {
                    restoreSelection(range);
                    var font = '';
                    if (FontCalc == 'btnPlusFontSize') {
                        font = $this.prev().text().split('px')[0];
                        if (font < 150) {
                            font++;
                        }
                    }
                    else {
                        font = $this.next().text().split('px')[0];
                        if (font > 10) {
                            font--;
                        }
                    }
                    document.execCommand("fontSize", false, "2");
                    var fontElements = document.getElementsByTagName("font");
                    for (var i = 0, len = fontElements.length; i < len; ++i) {
                        if (fontElements[i].size == "2") {
                            fontElements[i].removeAttribute("size");
                            fontElements[i].style.fontSize = font + "px";

                            selection = document.getSelection();
                            if (selection.anchorNode.parentElement.parentElement.tagName == 'LI') {
                                var fontsizelist = $this.parent().parent().parent().parent().find('.fontValueC').text();
                                selection.anchorNode.parentElement.parentElement.style.fontSize = fontsizelist;
                            }
                        }
                    }
                    if ($documenttext.text() == '') {
                        $documenttext.find('.pClass').css('font-size', font + 'px');
                    }
                    if (FontCalc == 'btnPlusFontSize') {
                        $this.prev().text(font + "px");
                    }
                    else {
                        $this.next().text(font + "px");
                    }
                    FontUse = font + 'px';
                }
                function GetFont() {
                    var font = '14px';
                    var getParentName = '';
                    if ($documenttext.text() == '') {
                        getParentName = window.getSelection().anchorNode.tagName;
                        if (getParentName == 'P') {
                            getParentName = window.getSelection().anchorNode;
                            font = $(getParentName).css('font-size');
                        }
                    }
                    else {
                        getParentName = window.getSelection().anchorNode.parentElement.tagName;
                        if (getParentName == 'FONT' || getParentName == 'LI' || getParentName == 'A' || getParentName == 'P' || getParentName == 'U' || getParentName == 'I' || getParentName == 'B' || getParentName == 'SPAN') {
                            getParentName = window.getSelection().anchorNode.parentNode;
                            font = $(getParentName).css('font-size');
                        }
                    }
                    return font;
                }
                function GetFontFamily($this) {
                    var getParentName = '';
                    var getChildName = '';
                    var fontfamily = 'montserrat';

                    getParentName = document.getSelection().anchorNode.parentElement.tagName;
                    if (getParentName == 'FONT') {
                        fontfamily = $(document.getSelection().anchorNode.parentElement).attr('face');
                        if (typeof fontfamily == 'undefined') {
                            fontfamily = 'montserrat';
                        }
                    }
                    else if (getParentName == 'P') {
                        fontfamily = $this.val();
                    }
                    else if (document.getSelection().anchorNode.parentElement.nextElementSibling.tagName == 'FONT') {
                        fontfamily = $(document.getSelection().anchorNode.parentElement.parentElement).attr('face');
                    }
                    return fontfamily;
                }

                FontColor();

                function FontColor() {
                    var colordocEditOption = ColorPickerOption({
                        renderCallback: function ($elm, toggled) {
                            hideDropChild();
                            var objColor = '';
                            objColor = RenderCallBackColor(this);
                            if ($elm.hasClass('doceditcolor')) {
                                restoreSelection(range);
                                objColor.bgColor = rgb2hex(objColor.bgColor);

                                document.execCommand("forecolor", false, objColor.bgColor);
                                if (range.collapsed == true) {
                                    if (flagb == true) {
                                        if (isActiveFlag == true) {
                                            document.execCommand("bold", false, null);
                                        }
                                    }
                                    if (flagi == true) {
                                        if (isActiveFlag == true) {
                                            document.execCommand('italic', false, null);
                                        }
                                    }
                                    if (flagb == true) {
                                        if (isActiveFlag == true) {
                                            document.execCommand('underline', false, null);
                                        }
                                    }
                                }
                                fcolor = objColor.bgColor;
                                range = saveSelection();
                            }
                            else if ($elm.hasClass('doceditcolorBG')) {
                                restoreSelection(range);
                                objColor.bgColor = rgb2hex(objColor.bgColor);

                                document.execCommand("backColor", false, objColor.bgColor);
                                range = saveSelection();
                            }
                            flagColor = true;
                        }
                    });
                    $('.DocEditorColorPicker').colorPicker(colordocEditOption);
                }
                function CommandALL() {
                    if (flagb == true) {
                        if (isActiveFlag == true) {
                            document.execCommand("bold", false, null);
                        }
                    }
                    if (flagu == true) {
                        if (isActiveFlag == true) {
                            document.execCommand("underline", false, null);
                        }
                    }
                    if (flagi == true) {
                        if (isActiveFlag == true) {
                            document.execCommand("italic", false, null);
                        }
                    }
                    flagb = flagu = flagi = flagfontFam = '';
                }
                function rgb2hex(rgb) {
                    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
                    return (rgb && rgb.length === 4) ? "#" +
                     ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
                     ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
                     ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
                }

                function makeInitialTextReadOnly(input) {
                    var readOnlyLength = input.value.length;
                    input.addEventListener('keydown', function (event) {
                        var which = event.which;
                        if (((which == 8) && (input.selectionStart <= readOnlyLength))
                                || ((which == 46) && (input.selectionStart < readOnlyLength))) {
                            event.preventDefault();
                        }
                    });
                    input.addEventListener('keypress', function (event) {
                        var which = event.which;
                        if ((event.which != 0) && (input.selectionStart < readOnlyLength)) {
                            event.preventDefault();
                        }
                    });
                    input.addEventListener('cut', function (event) {
                        if (input.selectionStart < readOnlyLength) {
                            event.preventDefault();
                        }
                    });
                    input.addEventListener('paste', function (event) {
                        if (input.selectionStart < readOnlyLength) {
                            event.preventDefault();
                        }
                    });
                }
                if (typeof $('.createlinkC').val() != 'undefined') {
                    makeInitialTextReadOnly(document.getElementById('txtCreateLink'));
                }

                function saveSelection() {
                    if (window.getSelection) {
                        sel = window.getSelection();
                        if (sel.getRangeAt && sel.rangeCount) {
                            return sel.getRangeAt(0);
                        }
                    } else if (document.selection && document.selection.createRange) {
                        return document.selection.createRange();
                    }
                    return null;
                }

                function restoreSelection(range) {
                    if (range) {
                        if (window.getSelection) {
                            sel = window.getSelection();
                            sel.removeAllRanges();
                            sel.addRange(range);
                        } else if (document.selection && range.select) {
                            range.select();
                        }
                    }
                }
                $thisMain.find('.text-deitor-toolsbar').draggable(
                     { handle: ' .dragbutton' }
                 );


            }
        },
        "settingDOMs": {
            "tabs": {
                "Spacing": {
                    "options": {
                        "margin": {
                            "max": 80,
                            "min": -80,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"]
                        },
                        "padding": {
                            "max": 80,
                            "min": 0,
                            "times": 5,
                            "position": ["all", "top", "left", "bottom", "right"]
                        }
                    },
                },
            },
            "selectLayer": function ($elem) {
                return $elem.parent().parent();
            },
        },
        "common": {
            "mouseleave": function () {
                $(document).on('mouseleave', '.documenttext', function () {
                    range = saveSelection();
                });

                function saveSelection() {
                    if (window.getSelection) {
                        sel = window.getSelection();
                        if (sel.getRangeAt && sel.rangeCount) {
                            return sel.getRangeAt(0);
                        }
                    } else if (document.selection && document.selection.createRange) {
                        return document.selection.createRange();
                    }
                    return null;
                }
            }
        },
        "remove": function (clonedom) {
            clonedom.find('.text-deitor-toolsbar').remove();
        }
    }


};