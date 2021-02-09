var unsubscribe = {
    "unsubscribe form": {
        "componentname": "unsubscribe form",
        "category": "advance",
        "icon": "fa fa-ban",
        "row": false,
        "hidden": false,
        "type": "element",
        "collection": false,
        "bucket": false,
        "defaultdata": EasyLibrary.ReadDOM("unsubscribe/unsubcribedefault", false),
        "beforedrop": function ($appendedParent, $appendLayer, dropped) { },
        "pageload": function () {
            this.inheritForm();
            this.view.view();
            
        },
        "afterdrop": function ($appendedParent, $appendLayer, dropped) {
            if (dropped) {
                this.inheritForm();
                this.view.view();
                
            }
        },

        "inheritForm": function () {
            let thiscomp = this;
            let formComp = component['form'];
            let mySetting = thiscomp.settingDOMs.tabs;
            mySetting['Spacing'] = formComp.settingDOMs.tabs.Spacing;
            mySetting['Text'] = formComp.settingDOMs.tabs.Text;
            mySetting['Alignment'] = formComp.settingDOMs.tabs.Alignment;
            mySetting['Size'] = formComp.settingDOMs.tabs.Size;
            thiscomp['styleDOMs'] = formComp.styleDOMs;
            thiscomp['responsiveDOMs'] = formComp.responsiveDOMs;
        },
        "settingDOMs": {
            "tabs": {
                "basic": {
                    "DOM": '<div id="divUnSubsBasic" class="field-row "></div>',
                    "onload": function ($this) {
                        function createSettingDOM() {
                            let $lstChk = $activeDOM.find('.chkFld');
                            let html = '<h4>Feed Back List</h4><div id="divFeedBackList" class="ui-sortable">';
                            $lstChk.each(function (i, v) {
                                let $chkFld = $(v);
                                let delHtml = '';
                                if (i > 0) {
                                    delHtml = `<i title="Delete" class="delFeedBackLst cPointer fa fa-trash in-form-icon delete-icon"></i>`;
                                }
                                html += `<div class='field-row stElWrap feedBkItem sfCol_100'>
                                        <span class="sfCol_10 cPointer TxAl-c srtFedBk"><i class="fa fa-arrows-v "></i></span>
                                         <span class="sfCol_80 cb_input">
                                             <input class="chkFldLabelVal"  type="text" value="${$chkFld.find('.chkLabel').text()}">
                                         </span>
                                        <span class="sfCol_10 TxAl-r">${delHtml}</span>
                                        </div>`;

                            });
                            html += '</div><div class="sfCol_100"><span class="stngSmallBtn " id="addMoreFdBkLst">Add more</span></div>';
                            $('#divUnSubsBasic').html(html);
                            $activeDOM.find('.chkUnsubsReason').each(function (i, v) {
                                let $this = $(v);
                                $this.attr('id', 'chkUnsubsReason' + i);
                                $this.next('label').attr('for', 'chkUnsubsReason' + i);
                            });

                            SortItem();
                            eventListner();
                        }
                        function SortItem() {
                            $("#divFeedBackList").AdvanceSorting({
                                targetParent: $activeDOM.find('.feedBackChkLst'),
                                targetElem: '.chkFld',
                                sortableOptions: {
                                    items: ".feedBkItem",
                                    handle: ".srtFedBk",
                                    containment: '#divFeedBackList'
                                }
                            });
                        }
                        function eventListner() {

                            $('#addMoreFdBkLst').off().on('click', function () {
                                let frsItem = $activeDOM.find('.feedBackChkLst .chkFld')[0].outerHTML;
                                $activeDOM.find('.feedBackChkLst').append(frsItem);
                                createSettingDOM();
                            });
                            $('.chkFldLabelVal').off('keyup').on('keyup', function () {
                                let $lst = $('#divFeedBackList .feedBkItem');
                                let $stngItem = $(this).closest('.feedBkItem');
                                let index = $lst.index($stngItem);
                                let val = $(this).val();
                                if (val !== '')
                                    $activeDOM.find('.feedBackChkLst .chkLabel').eq(index).text(val);
                            });
                            $('.delFeedBackLst').off().on('click', function () {
                                let $lst = $('#divFeedBackList .feedBkItem');
                                let $stngItem = $(this).closest('.feedBkItem');
                                let index = $lst.index($stngItem);
                                SageConfirmDialog('Are you sure').done(function () {
                                    $stngItem.remove();
                                    $activeDOM.find('.feedBackChkLst .chkFld').eq(index).remove();
                                });
                            });

                        }
                        createSettingDOM();
                    }
                }
            }
        },
        "remove": function () {
            $('.comp-unsubscribe .sfError').remove();
            $('#divUnsubscribeSuccess').hide();
            $('.unsubs-form,.feedBackChkLst').show();
        },
        "view": {
            "view": function () {
                try {
                    var pathArray = window.location.pathname.toLowerCase().split('/');
                    var indexOfunSubs = pathArray.indexOf("user");
                    if (indexOfunSubs > 0) {
                        var subscribeId = pathArray[indexOfunSubs + 1];
                        if (typeof subscribeId !== 'undefined' || subscribeId) {
                            if (this.library.guidValidate(subscribeId)) {
                                $('#btnSubmitunsubscribe').attr('data-id', subscribeId);
                                this.library.eventLister();
                            } else {
                                SageAlertDialog("oops! unsubscription link is not correct", "Error");
                            }
                        } else {
                            SageAlertDialog("oops! unsubscription link is not correct.", "Error");
                        }
                    }
                } catch (e) {
                    console.log(e.message);
                }
            },

            "library": {
                eventLister: function () {
                    let thisLib = this;
                    $('#btnSubmitunsubscribe').off('click').on('click', function () {
                        let feedBacks = '';
                        $('.comp-unsubscribe .sfError').remove();
                        $('.chkUnsubsReason:checked').each(function (i, v) {
                            feedBacks += $(v).next('label').text() + '#';
                        });
                        if (feedBacks != '') {
                            feedBacks = feedBacks.substring(0, feedBacks.length - 1);
                            thisLib.unSubscribtion($(this).attr('data-id'), feedBacks);
                        } else {
                            $(this).before('<p class="sfError"style="width:100%;margin-bottom:5px;">Please check at least one option.</p>')
                        }
                    });
                },
                "unSubscribtion": function (subscribeID, feedBack) {
                    try {
                        let reason = "";
                        var thisLib = this;
                        var config = {
                            method: '',
                            url: SageFrameAppPath + "/Modules/WBMailTemplate/services/NewsLetterService.asmx/",
                            data: '',
                            ajaxSuccess: '',
                            ajaxFailure: ''
                        };
                        config.data = {
                            token: subscribeID,
                            reason: feedBack
                        };
                        config.method = "UnsubscribeUser";
                        config.ajaxSuccess = function (data) {
                            if (data.d > 0) {
                              
                                $('#divUnsubscribeSuccess').show();
                                $('.unsubs-form,.feedBackChkLst').hide();
                            
                            } else {
                                SageAlertDialog("You are not in our news letter subscriber list.", "Error");
                            }
                        }
                        CommonLibrary.AjaxCall(config);
                    } catch (e) {
                        console.log(e.message);
                    }
                },
                

                "guidValidate": function (guid) {
                    var pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
                    if (pattern.test(guid)) {
                        return true;
                    } else {
                        return false;
                    }
                },
            }
        },
    }
}