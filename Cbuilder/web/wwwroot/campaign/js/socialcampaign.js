(function ($) {
    $.SocialCampaign = function (p) {

        let localLabel = p.localLabel;
        var SocialCampaign = {
            config: {
                async: false,
                cache: false,
                type: 'POST',
                data: '{}',
                dataType: 'json',
                methodname: "",
                url: "",
                ajaxCallMode: 0,
                success: "",
                baseURL: CurrentHostURL + '/dashboard/Campaign',
                Id: 0,
                offset: 0,
                limit: 10,
                current: 0
            },


            ajaxCall: function (config, IsTraditional) {
                config.url = config.baseURL + "/" + config.methodname;
                config.success = config.ajaxSuccess;
                config.error = SocialCampaign.ajaxFailure;
                if (IsTraditional)
                    SecureAjaxCall.Call(config);
                else
                    SecureAjaxCall.PassObject(config);
            },

            ajaxSuccess: function (data) {
            },

            ajaxFailure: function (data) {
                var msg = data.statusText;
                if (data.status === 401)
                    msg = "not authorized";

                ActionMessage(msg, MessageType.Error, false);
            },


            init: function () {
                //define events for existing controls
                SocialCampaign.LoadUIEvents();
                SocialCampaign.LoadDataWithPagination(0, SocialCampaign.config.limit, 0);
            },

            LoadUIEvents: function () {


                $('#slcCampaignStatus').off('change').on('change', function () {

                    SocialCampaign.LoadDataWithPagination(0, SocialCampaign.config.limit, 0);
                });

                $('#btnSearchCampaign').off('click').on('click', function () {
                    SocialCampaign.LoadDataWithPagination(0, SocialCampaign.config.limit, 0);
                });

                $('.btnBacktoList').off('click').on('click', function () {
                    $('.campaign-container').show();
                    $('#divCampaignDetail').hide();
                });

                $('#btnRefreshData').off('click').on('click', function () {
                    $('#slcCampaignStatus').val(0);
                    $('#txtCampaignTitle').val('');
                    SocialCampaign.LoadDataWithPagination(0, SocialCampaign.config.limit, 0);
                });
            },


            LoadDataWithPagination: function (offset, limit, current) {
                SocialCampaign.config.offset = current * limit;
                SocialCampaign.config.current = current;

                let searchText = $('#txtCampaignTitle').val();
                let campaignType = 0;
                let statusID = $('#slcCampaignStatus option:selected').val();

                SocialCampaign.config.methodname = "GetCampaignList";
                SocialCampaign.config.data = {
                    offset: SocialCampaign.config.offset,
                    limit: limit,
                    searchText: searchText,
                    campaignType: campaignType,
                    statusID: parseInt(statusID)
                };
                SocialCampaign.config.ajaxSuccess = function (data) {
                    SocialCampaign.CampaignListResponse(data);
                }
                SocialCampaign.ajaxCall(SocialCampaign.config, true);

                //call function
            },

            CampaignListResponse: function (data) {
                if (data != null) {
                    var RowTotal = 0;
                    var itemList = data;
                    //itemList = JSON.parse(itemList.Result);
                    let html = '';
                    itemList = itemList.data;
                    if (itemList.length > 0) {

                        RowTotal = itemList[0].rowTotal;
                        $.each(itemList, function (index, item) {

                            let actionHtml = '';
                            if (item.status.toLowerCase() !== 'deleted') {
                                if (item.isEditable) {
                                    actionHtml += ` <li><a class="links camp-edit" data-id='${item.campaignID}'><i class="fa fa-edit"></i>${localLabel.Actions.Edit}</a></li>`;
                                    actionHtml += ` <li><a class="links camp-delete" data-id='${item.campaignID}'><i class="fa fa-trash-o"></i>${localLabel.Actions.Delete}</a></li>`;
                                }
                                else {
                                    actionHtml += ` <li><a class="links camp-view" data-id='${item.campaignID}'><i class="fa fa-eye"></i>${localLabel.Actions.View}</a></li>`;
                                }
                            }


                            actionHtml += `<li><a class="links camp-duplicate" data-id='${item.campaignID}'><i class="fa fa-copy"></i>${localLabel.Actions.RePost}</a></li>`;

                            if (actionHtml.length > 0) {
                                actionHtml = ` <div class="action-menu">
                                                    <div class="action-icon">
                                                        <i class="fa fa-ellipsis-h"></i>
                                                    </div>
                                                    <ul class="action-open">
                                                            ${actionHtml}
                                                    </ul>
                                                </div>`;
                            }
                            else {
                                actionHtml = '';
                            }

                            let platformIcons = item.campaignApps.split(',');
                            let platformHtml = '';
                            $.each(platformIcons, function (index, item) {
                                platformHtml += `<div class='${$.trim(item)} Mr-6'><span class="platform-icon grid-icon"><i class='fa fa-${$.trim(item)}'></i> </span></div>`;
                            });


                            html += `<div class="dg-col-wp">
                                        <div class="sfCol-sm-1">
                                            <div class="dg-group">
                                                <span class="ds-grd-tit"> ${item.rowNum}</span>
                                            </div>
                                        </div>
                                        <div class="sfCol-sm-6">
                                            <div class="dg-group-inline">
                                                <div class="dg-group">
                                                    <div class="dg-title"> ${item.campaignTitle}</div>
                                                </div>
                                                <div class="dg-group">
                                                    <div class="dg-group-inline campaign-post flex">
                                                        ${platformHtml}
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <div class="sfCol-sm-2 f-center">
                                            <div class="ds-group-inline">
                                                <div class="ds-group">
                                                   <span class="pills rounded pills-${item.status.toLowerCase() === 'draft' ? 'light' : 'success'}">${item.status}</span>
                                                
                                                
                                                   ${item.isEditable ? '' : ` <span class="Mt-10 d-block camp-apps gray-600 small fw-500">${item.publishedOn}</span>`}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="sfCol-sm-3 f-center">
                                            <div class="dg-group-inline">
                                                    ${actionHtml}
                                            </div>
                                        </div>
                                    </div>`;
                        });

                        SocialCampaign.BindPagination(RowTotal);


                    }
                    else {
                        html += ` <div class="dg-col-nodata" style="">
                                    <h5>${localLabel.Messages.NoData}</h5>
                                </div>`;
                    }

                    $('#campaign-data').html(html);
                    gridHelper.bindEvent({
                        onMenuClick: function ($ele) {

                        }
                    });
                    SocialCampaign.BindGridEvents();
                }
            },

            BindPagination: function (RowTotal) {
                if (RowTotal > SocialCampaign.config.limit) {
                    $('#pagination').show().pagination(RowTotal, {
                        items_per_page: SocialCampaign.config.limit,
                        current_page: SocialCampaign.config.current,
                        num_edge_entries: 1,
                        num_display_entries: 3,
                        show_pagination_number: true,
                        callfunction: true,
                        function_name: {
                            name: SocialCampaign.LoadDataWithPagination,
                            limit: SocialCampaign.config.limit,
                        },
                        prev_text: ' ',
                        next_text: ' '
                    });
                } else {
                    $('#pagination').hide();
                }
            },

            BindGridEvents: function () {
                $('.camp-edit').off('click').on('click', function () {
                    let campaignID = $(this).attr('data-id');
                    location.href = `/dashboard/campaign/create${CultureURL}/${campaignID}`;
                });

                $('.camp-duplicate').off('click').on('click', function () {
                    let campaignID = $(this).attr('data-id');
                    SocialCampaign.AddDuplicateCampaign(campaignID);
                });


                $('.camp-view').off('click').on('click', function () {
                    let campaignID = $(this).attr('data-id');
                    SocialCampaign.GetCampaignDetail(campaignID);
                });

                $('.camp-delete').off('click').on('click', function () {
                    let campaignID = $(this).attr('data-id');
                    SageConfirmDialog(localLabel.Messages.DeleteConfirmation).done(function () {
                        SocialCampaign.DeleteCampaign(campaignID);
                    });

                });
                //camp-duplicate
            },

            AddDuplicateCampaign: function (campaignID) {
                SocialCampaign.config.methodname = "AddDuplicateCampaign";
                SocialCampaign.config.data = { campaignID: campaignID };
                SocialCampaign.config.ajaxSuccess = function (data) {
                    SocialCampaign.AddDuplicateCampaignResponse(data);
                }
                SocialCampaign.ajaxCall(SocialCampaign.config, true);
            },

            AddDuplicateCampaignResponse: function (data) {
                if (data != null) {
                    var resultObj = data.Value;
                    resultObj = JSON.parse(resultObj);
                    let statusCode = resultObj.statusCode;
                    if (statusCode !== 1) {
                        ActionMessage(resultObj.message, MessageType.Error);
                    }
                    else {
                        let campaignID = resultObj.data;
                        location.href = `/dashboard/campaign/create${CultureURL}/${campaignID}`;
                    }
                }
            },

            GetCampaignDetail: function (campaignID) {
                SocialCampaign.config.methodname = "GetCampaignDetail";
                SocialCampaign.config.data = { campaignID: campaignID };
                SocialCampaign.config.ajaxSuccess = function (data) {
                    SocialCampaign.BindCampaignDetailResponse(data);
                }
                SocialCampaign.ajaxCall(SocialCampaign.config, true);

            },


            BindCampaignDetailResponse: function (data) {
                var resultObj = data.Value;
                resultObj = JSON.parse(resultObj);
                let statusCode = resultObj.statusCode;
                if (statusCode !== 1) {
                    ActionMessage(resultObj.message, MessageType.Error);
                }
                else {
                    let campaignObj = resultObj.data;
                    if (campaignObj != null) {

                        $('.campaign-container').hide();
                        $('#divCampaignDetail').show();

                        let html = '';

                        let apps = '';
                        apps = $.map(campaignObj.apps, function (obj) {
                            return obj.appName
                        }).join(', ');

                        html += `<div class="card-body">
                                    <div class='sfFormwrapper'>
                                       
                                        <h3 class='campaign-title gray-900 Mb-10 Mt-0 fw-400'>${campaignObj.campaignTitle}</h3>
                            
                                 <div class="sfFieldset">
                                            <span class="campaign-status ${campaignObj.status}">${campaignObj.status}</span> 
                                            <span class="fw-500  small gray-600 Pl-15"> ${campaignObj.scheduledOn}</span>
                                        </div>
                                        <div class='sfFieldset'>
                                            <span class='key'>Platform: </span>
                                            <span class='value'>${apps}</span>
                                        </div>`;

                        html += `<div class='campaign-post-list sfRow'>`;
                        $.each(campaignObj.apps, function (index, post) {
                            let postHtml = `<div class='campaign-post sfCol-6'>
                                                <div class="sfFieldset  ${post.appName}"><span class="platform-icon"><i class='fa fa-facebook'></i> </span>
                                                    <span>${post.pageName}</span>
                                                </div>
                                               `;
                            if (post.appName === 'twitter') {
                                postHtml += `
                                                <div class='campaign-info sfFieldset'>
                                                    <span class='info-title d-none'>Twitter activity is not available</span>
                                                    <span class='info-content'> <a href='https://twitter.com/i/web/status/${post.postID}' class="btn primary round" target='_blank'>View Post</a></span>
                                                </div>
                                            `;
                            }
                            else if (post.appName === 'facebook') {

                                let postID = post.postID;
                                let targetID = post.targetID;

                                postID = postID.replace(targetID + '_', '');

                                postHtml += `
                                                <div class='campaign-info sfFieldset'>
                                                    <span class='info-content'><a href='https://www.facebook.com/${targetID}/posts/${postID}'  class="btn primary round" target='_blank'>View Post</a></span>
                                                </div>
                                            `;


                            }
                            postHtml += `<div class='post-content'>
                                         <span>Content: ${post.postContent}</span>`;
                            if (post.images !== null) {
                                $.each(post.images, function (i, image) {
                                    postHtml += `<div class='campaign-img'>
                                                    <img src='${image.imageUrl}' />
                                                </div>`;
                                });
                            }
                            //campaign-post close
                            postHtml += `</div>`;
                            postHtml += `</div>`;

                            html += postHtml;
                        });
                        //campaign-postlist close
                        html += '</div>';

                        //html += '</div></div>';
                        html += `<div class='campaign-post-list'>`;
                        $.each(campaignObj.apps, function (index, post) {
                            let postHtml = `<div class='campaign-post'>`;

                            if (post.appName === 'facebook') {
                                let analytics = post.analytics;

                                postHtml += `<div class='campaign-analytics'> 
                                                <div class='section flex Mb-30 Mt-30'>`;


                                postHtml += ` <div class='campaign-info view-table Pt-15 Pb-25 sfCol fw-500'>
                                                
                                                <span class='value  d-block t-center'>${analytics.totalReach}</span>
                                                   <span class='key  d-block t-center'>Total Reach </span>
                                            </div>`;

                                postHtml += ` <div class=' view-table sfCol Pt-15 Pb-25 fw-500'>
                                              
                                                <span class='value d-block t-center'>${analytics.totalViews}</span>
                                                    <span class='key  d-block t-center'>Total Views </span>
                                            </div>`;

                                postHtml += ` <div class='impressions view-table Pt-15 Pb-25 sfCol fw-500'>
                                               
                                                    <span class='value  d-block t-center'>${analytics.impressionOrganic + analytics.impressionPaid}</span>
                                                    <span class='key  d-block t-center'>Total Impression </span>
                                                </div>
                                            </div></div>
                                            `;
                                postHtml += ` <div class="sfRow counters">
                                                <div class="impression-types sfCol-6"><div class='analytics-sub  sfFieldset'>
    
                                                    <span class='key'>Impression Organic </span>
                                                    <span class='value fw-500 gray-800 h3'>${analytics.impressionOrganic}</span>
                                               </div> `;

                                postHtml += ` <div class='analytics-sub sfFieldset'>
                                                <span class='key'>Impression Paid: </span>
                                                <span class='value fw-500 gray-800 h3'>${analytics.impressionPaid}</span>
                                            </div>`;
                                postHtml += `</div>`;

                                postHtml += ` <div class='reaction-types sfCol-6'>
                                               <div class='sfFieldset'>
                                                <span class='key'>Total Reactions: </span>
                                                <span class='value fw-500 gray-800 h3'>${analytics.likeTotal + analytics.loveTotal + analytics.wowTotal + analytics.hahaTotal + analytics.angerTotal + analytics.sorryTotal}</span></div>
                                            `;
                                postHtml += ` <div class='analytics-sub sfFieldset'>
                                                <span class='key'>Total Likes: </span>
                                                <span class='value fw-500 gray-800 h3'>${analytics.likeTotal}</span>
                                            </div>`;

                                postHtml += ` <div class='analytics-sub sfFieldset'>
                                                <span class='key'>Total Loves: </span>
                                                <span class='value fw-500 gray-800 h3'>${analytics.loveTotal}</span>
                                            </div>`;

                                postHtml += ` <div class='analytics-sub sfFieldset'>
                                                <span class='key'>Total Wow: </span>
                                                <span class='value fw-500 gray-800 h3'>${analytics.wowTotal}</span>
                                            </div>`;

                                postHtml += ` <div class='analytics-sub sfFieldset'>
                                                <span class='key'>Total Haha: </span>
                                                <span class='value fw-500 gray-800 h3'>${analytics.hahaTotal}</span>
                                            </div>`;

                                postHtml += ` <div class='analytics-sub sfFieldset'>
                                                <span class='key'>Total Anger: </span>
                                                <span class=' value fw-500 gray-800 h3'>${analytics.angerTotal}</span>
                                            </div>`;

                                postHtml += ` <div class='analytics-sub sfFieldset'>
                                                <span class='key'>Total Sorry: </span>
                                                <span class='value fw-500 gray-800 h3'>${analytics.sorryTotal}</span>
                                            </div>`;
                                postHtml += `</div>`;

                                postHtml += ` </div> `
                            }
                            postHtml += `</div>`;
                            html += postHtml;
                        });

                        html += '</div></div>';

                        html += '</div>';


                        $('.campaign-detail').html(html);
                    }
                }
            },

            DeleteCampaign: function (campaignID) {
                SocialCampaign.config.methodname = "DeleteCampaign";
                SocialCampaign.config.data = { campaignID: campaignID };
                SocialCampaign.config.ajaxSuccess = function (data) {
                    SocialCampaign.DeleteCampaignResponse(data);
                }
                SocialCampaign.ajaxCall(SocialCampaign.config, true);
            },
            DeleteCampaignResponse: function (data) {
                if (data != null) {
                    var resultObj = data.Value;
                    resultObj = JSON.parse(resultObj);
                    let statusCode = resultObj.statusCode;
                    if (statusCode !== 1) {
                        ActionMessage(resultObj.message, MessageType.Error);
                    }
                    else {
                        ActionMessage(localLabel.Messages.Deleted, MessageType.Success);
                        SocialCampaign.LoadDataWithPagination(0, SocialCampaign.config.limit, 0);
                    }
                }
            },

        };




        SocialCampaign.init();
    };


    $.fn.SocialCampaignManage = function (p) {
        $.SocialCampaign(p);
    };
})(jQuery);
