(function ($) {
    var bucketComponent = '';
    var bucketComponentDemo = {
        "componentname": "",
        "category": "",
        "type": "",
        "collection": false,
        "version": "",
        "dependencies": "",
        "icon": "",
        "row": true,
        "hidden": false,
        "defaultdata": '',
        "onDrop": function ($appendLayer) {
        },
        "beforeDrop": function ($this) {
        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (dropped) {
                $appendedParent.parent().find('.editor-component').each(function (index, value) {
                    var $this = $(this);
                    var key = $this.find('.com-settings').attr('data-type');
                    var compo = component[key];
                    if (typeof compo !== "undefined" && typeof compo.afterdrop !== "undefined")
                        compo.afterdrop($this.parent(), $this, false, true);
                    ChangeIDWithParent($this);
                });
            }
        },
        "loadSetting": function ($item) {
        },
        "settingDOMs": {
        }
    };

    $.fn.addToBucket = function (options) {
        var settings = $.extend({
        }, options);
        let $this = $(this);
        //if ($(this).parents().hasClass('editor-componentWrapper')) {
        //    $(this).find('.add-to-bucket').remove();
        //    $(this).append(DOMCreate('i', '', 'cb-bucket add-to-bucket bucketCol', '', ['title="Add To Bucket"']));
        //}
        //else {
        //    $(this).find('.add-to-bucket').remove();
        //}
        BucketWebBuilder.InitializeAddButton($this);
    };
    var BucketWebBuilder = {
        InitializeAddButton: function ($this) {
            $this.off('click').on('click', function (e) {
                bucketComponent = bucketComponentDemo;
                // HidePopUpSetting();
                var $this = $(this);
                var $parent = $this.closest('.SetHdlr').parent();
                if ($parent.find('.column-data-empty').length > 0) {
                    SageAlertDialog("Please drop component in empty column");
                    return false;
                }
                if ($parent.find('.editor-component').length == 0) {
                    SageAlertDialog("Please drop component in empty column");
                    return false;
                }
                var title = $this.attr('title');
                $activeDOM.find('>.SetHdlr .setDrp').hide();
                var htmlContain = BucketWebBuilder.GenerateHtml();
                var $defaultData = $($this.closest('.SetHdlr').parent().get(0).outerHTML);
                var isaAllowed = true;
                var keyCom = [];
                $defaultData.find('.editor-component').each(function (index, value) {
                    var $this = $(this);
                    var key = $this.attr('data-type');//find(' > .SetHdlr > .com-settings').attr('data-type');
                    var compo = component[key];
                    if (typeof compo !== "undefined") {
                        if (typeof compo.bucket !== "undefined" && compo.bucket == false) {
                            keyCom.push(key);
                            isaAllowed = false;
                            return;
                        }
                    }
                });
                if (isaAllowed == false) {
                    let message = "" + keyCom.join(',') + " component cannot be added to bucket.Please remove component and add to bucket";
                    SageAlertDialog(message);
                    return false;
                }
                if ($(this).parent().parent().parent().parent().hasClass('cRow')) {
                    bucketComponent.row = true;
                    bucketComponent.defaultdata = $defaultData.get(0).outerHTML;
                }
                else {
                    bucketComponent.row = false;
                    $defaultData.find('div.SetHdlr').eq(0).remove();
                    // $defaultData.find('div.carries-options').eq(0).remove();
                    bucketComponent.defaultdata = $defaultData.html();
                }
                bucketComponent.category = 'bucket';
                bucketComponent.type = 'Bucket';
                FullPagePopup({
                    data: htmlContain,
                    heading: "Bucket",
                    showheading: true,
                    width: "40%",
                    height: "80%"
                });
                $('body').find("#fontIconbucket").html($("#fontIconCollection").html());
                $('body').on('keyup', '#searchIconbucket', function () {
                    var searchVal = $(this).val();
                    $('.fontIconCollection').find('li').each(function () {
                        var $this = $(this);
                        var dataClass = $this.find('i').attr('data-class');
                        var pos = dataClass.indexOf(searchVal);
                        if (pos < 0) {
                            $this.addClass('Dn');
                        }
                        else {
                            $this.removeClass('Dn');
                        }
                    });
                });
                $("body").find('.fontIconCollection').find('li').on('click', function () {
                    var chooseClass = $(this).find('i').attr('data-class');
                    $('.fontIconCollection').find('li').removeClass('selected');
                    $(this).addClass('selected');
                });
                $("#btnSavebucket").on("click", function () {
                    var name = $("#txtCompName").val().trim();
                    var componentIcon = $("body").find('.fontIconCollection').find('li.selected').find('i').attr('class');
                    if (name == "") {
                        SageAlertDialog("Please Enter Name");
                    }
                    else if (componentIcon == "" || componentIcon == null) {
                        SageAlertDialog("Please select icon");
                    }
                    else {
                        bucketComponent.componentname = name;
                        bucketComponent.icon = componentIcon;
                        bucketComponent.defaultdata = BucketWebBuilder.DefaultDataTitle(bucketComponent.defaultdata, name);
                        $.ajax({
                            isPostBack: false,
                            async: false,
                            crossOrigin: true,
                            cache: false,
                            type: 'POST',
                            contentType: "application/json; charset=utf-8",
                            data: JSON2.stringify({
                                componentValue: JSONStringify(bucketComponent),
                                bucketName: name,
                                portalID: SageFramePortalID,
                                userModuleID: webBuilderUserModuleID,
                                userName: SageFrameUserName,
                                secureToken: SageFrameSecureToken
                            }),
                            dataType: 'json',
                            crossDomain: true,
                            url: SageFrameHostURL + '/Builder/AddBucket',
                            success: function (data) {
                                if (data.d == 1) {
                                    SageAlertDialog("Bucket added successfully.");
                                    $('.fullpage-close-model').trigger('click');
                                    var $compo = bucketComponent;
                                    var comName = $compo['componentname'];
                                    var iconClass = $compo['icon'];
                                    var compo = DOMCreate('i', '', iconClass) + '<br />' + comName;
                                    var classes = 'comBasic comItemBlock ui-state-highlight';
                                    if ($compo['row'])
                                        classes = 'rowBasic heartBeat comItemBlock ui-state-highlight';
                                    compo = DOMCreate('span', compo, classes, '', ['draggable="true"', 'data-type="' + comName + '"']);
                                    var compoTab = $compo['category'];
                                    var $componentList = $('#componentCollection > .components-list-array');
                                    if ($componentList.find('> .' + compoTab).length == 0) {
                                        var comitems = DOMCreate('h4', compoTab + ' Components', '') + DOMCreate('div', '', 'comItems');
                                        comitems = DOMCreate('div', comitems, compoTab + ' components-list');
                                        $componentList.append(comitems);
                                    }
                                    $componentList.find('> .' + compoTab).find('.comItems').append(compo);
                                    var componentBuc = JSON2.stringify(bucketComponent);
                                    var value = JSONParse(componentBuc);
                                    var key = value.componentname;
                                    component[key] = value;
                                    DraggableSortable();
                                    var bucketcount = parseInt($("#btnMyBucket").find(".no-of-item").html()) + 1;
                                    $("#btnMyBucket").find(".no-of-item").html(bucketcount);
                                    $(".addComponent").trigger("click");
                                    $componentList.find('> .' + compoTab).find('h4').trigger('click');
                                    $(".my-bucket").show();
                                    ///
                                    $('.components-list-array h4').off('click').on('click', function () {
                                        let $this = $(this);
                                        if (!$this.parent().hasClass('activeAccordion')) {
                                            $('.components-list').removeClass('activeAccordion');
                                            $('.comItems').slideUp(400);
                                            $this.next().slideDown(400);
                                            $this.parent().addClass('activeAccordion');
                                        }
                                        else {
                                            $this.parent().removeClass('activeAccordion');
                                            $this.next().slideUp(400);
                                        }
                                    });
                                }
                                else if (data.d == -1) {
                                    SageAlertDialog("Duplicate Name.");
                                }
                            },
                            error: function () {
                            },
                        });
                    }
                });
                e.preventDefault();
            });
            $($this).trigger("click");
        },
        DefaultDataTitle: function (data, name) {
            let $tochange = $(data);
            $tochange.find('.SetHdlr').eq(0).find(' >.stng >.setDrp li').attr('data-title', name);
            return $tochange.get(0).outerHTML;
        },
        GenerateHtml: function () {
            var html = '';
            html += '<div class="bucketEditWrap" form="true" id="bucketEditWrap">';
            html += '<div class="field-row stElWrap col30-70">';
            html += '<label class="fCol">Name</label>';
            html += '<span class="fCol cb_input">';
            html += ' <input type="text" id="txtCompName" name="txtCompName" />';
            html += '</span></div> ';
            html += '<div class="field-row stElWrap col100">';
            html += '<h4>Select Icon</h4>';
            html += '  <div id="fontbucket">';
            html += '<div class="field-row stElWrap col40-60">';
            html += '<label class="fCol">Search Icons</label>';
            html += '<span class="fCol cb_input">';
            html += '<input type="text" id="searchIconbucket" />';
            html += '</span></div>';
            html += '       <div class="field-row stElWrap col80-20">';
            html += '           <ul id="fontIconbucket" class="fontIconCollection">';
            html += '           </ul>';
            html += '         </div>';
            html += '     </div>';
            html += '</div>';
            html += '<div class="sfCol_100 TxAl-r submitBtnRow">';
            html += '<input type="button" id="btnSavebucket" value="Save" class="stngSmallBtn" />';
            html += '</div> ';
            html += '</div> ';
            return html;
        },
        InitializeBucket: function () {
            var bucketcount = 0;
            if (typeof bucketComponents !== "undefined") {
                $.each(bucketComponents, function (i, v) {
                    v = v.ComponentValue;
                    var value = JSONParse(v);
                    var key = value.componentname;
                    component[key] = value;
                    bucketcount++;
                });
            }
            $("#btnMyBucket").find(".no-of-item").html(bucketcount);
            if (bucketcount > 0) {
                $(".my-bucket").show();
            }
            else {
                $(".my-bucket").hide();
            }
            $("#btnMyBucket").on("click", function () {
                var $componentList = $('#componentCollection > .components-list-array');
                $(".addComponent").trigger("click");
                $componentList.find('> .bucket').find('h4').trigger('click');
            });
        },
        init: function ($this) {
            BucketWebBuilder.InitializeBucket();
        }
    };

    //-----------------------------feedback---------------------------------------
    var Feedback = {
        InitializeFeedBackAddButton: function () {
            $('#Feedback').on('click', function (e) {
                var title = "Feedback";
                var htmlContain = Feedback.GenerateFeedBackhtml();
                FullPagePopup({
                    data: htmlContain,
                    heading: title,
                    showheading: true,
                    width: "40%",
                    height: "80%"
                });
                $('#btnResetFeedback').on("click", function () {
                    $("#ddcategory").prop('selectedIndex', 0);
                    $('#txttitle').val('');
                    $('#txtDiscription').val('');
                });
                $("#btnSaveFeedback").on("click", function () {
                    var Category = $("#ddcategory option:selected").text();
                    var Title = $("#txttitle").val();
                    var Description = $("#txtDiscription").val();
                    if (Title == "") {
                        SageAlertDialog("Please Enter Title", "Error");
                    }
                    else if (Description == "") {
                        SageAlertDialog("Please Enter Discription", "Error");
                    }
                    else {
                        var submit = {
                            Name: SageFrameUserName,
                            Category: Category,
                            Title: Title,
                            Description: Description,
                            Domain: SageFrameHostURL,
                            PortalID: SageFramePortalID,
                            UserModuleID: 1317,
                        };
                        $.ajax({
                            isPostBack: false,
                            async: false,
                            crossOrigin: true,
                            cache: false,
                            type: 'POST',
                            contentType: "application/json; charset=utf-8",
                            data: JSON2.stringify({
                                objFeedback: submit,
                                portalID: SageFramePortalID,
                                userModuleID: webBuilderUserModuleID,
                                userName: SageFrameUserName,
                                secureToken: SageFrameSecureToken,
                            }),
                            dataType: 'json',
                            crossDomain: true,
                            url: SageFrameHostURL + '/Builder/FeedBackFromClient',
                            success: function (data) {
                                if (data != null)
                                    var response = JSONParse(data.d);
                                if (response != null && response.Message === "Success") {
                                    CloseFullPagePopup();
                                    SageAlertDialog('Feedback Send Successfully !', "Success");
                                    $('#btnResetFeedback').trigger('click');
                                }
                            },
                            error: function () {
                                SageAlertDialog("Error !", "Error");
                            },
                        });
                    }
                });
                e.preventDefault();
            });
        },

        GenerateFeedBackhtml: function () {
            var html = '';
            html = `
                <div class="FeedbackWrap" form="true" id="feedbackwarp">
          <div class ="field-row stElWrap col30-70">
                   <label class ="fCol"> Category :</label>
                   <span class ="fCol TxAl-r select__box">
                       <select id="ddcategory">
                       <option data-type="sitefeedback" value="1">Like</option>
                          <option data-type="sitefeedback" value="2">Question</option>
                           <option data-type="sitefeedback" value="3">Suggestion</option>
                           <option data-type="sitefeedback" value="4">Problem</option>
                           <option data-type="sitefeedback" value="5">Complaint</option>
                       </select>
                   </span>
               </div>

           <div class="field-row stElWrap col30-70">
              <label class="fCol">Title :</label>
              <span class="fCol cb_input">
             <input type="text" id="txttitle" name="txttitle" />
            </span></div>
           <div class="field-row stElWrap col30-70">
           <label class="fCol">Description :</label>
           <div class="fCol TxAl-l text__area">
           <textarea id="txtDiscription"></textarea>
            </div>
            </div>
            <div class ="field-row clearfix">
                   <div class ="field-row stElWrap col100">
                       <span class ="cb-btn-green" id="btnSaveFeedback">Submit</span>
                       <span class ="cb-btn-red Ml-5" id="btnResetFeedback">Reset</span>
                   </div>
               </div>
             </div>`;
            return html;
        },
    };
    Feedback.InitializeFeedBackAddButton();
    //-----------------------------------end feedback------------------------------
    BucketWebBuilder.init();
}(jQuery));