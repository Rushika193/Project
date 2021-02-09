(function ($) {


    $.CreateCampaign = function (p) {
        let localLabel = p.localLabel;
        var $validator;
        //declare global variables here
        let campaignTypeID = 2;
        let currentStep = -1;
        let campaignID = null;

        var CreateCampaign = {
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
                currentStep: p.currentStep,
                campaignID: p.campaignID,
                defaultPostImage: '/campaign/images/default-img.png',
                defaultGuid: '00000000-0000-0000-0000-000000000000'
            },


            ajaxCall: function (config, IsTraditional) {
                config.url = config.baseURL + "/" + config.methodname;
                config.success = config.ajaxSuccess;
                config.error = CreateCampaign.ajaxFailure;
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
                campaignID = CreateCampaign.config.campaignID;
                if (campaignID !== CreateCampaign.config.defaultGuid) {
                    CreateCampaign.GetCampaignStatus();
                }
                CreateCampaign.LoadUIEvents();
                CreateCampaign.BindBreadCrumbEvents();
                CreateCampaign.BindControl();
            },
            BindBreadCrumbEvents: function () {
                $('.step-1').off('click').on('click', function () {
                    CreateCampaign.config.currentStep = 0;
                    CreateCampaign.BindControl();
                    CreateCampaign.GetCampaignSummary();
                });

                $('.step-2').off('click').on('click', function () {
                    SageConfirmDialog(localLabel.Messages.ComposeConfirm, localLabel.Messages.ComposeConfirmTitle).done(function () {
                        CreateCampaign.config.currentStep = 1;
                        CreateCampaign.BindControl();
                    });
                  
                   
                });
            },

            GetCampaignSummary: function () {
                CreateCampaign.config.methodname = "GetCampaignSummary";
                CreateCampaign.config.data = { campaignID: campaignID };
                CreateCampaign.config.ajaxSuccess = function (data) {
                    if (data != null) {
                        var resultObj = data.Value;
                        resultObj = JSON.parse(resultObj);
                        let statusCode = resultObj.statusCode;
                        if (statusCode !== 1) {
                            ActionMessage(resultObj.message, MessageType.Error);
                            CreateCampaign.config.currentStep = -2;
                        }
                        else {
                            let title = resultObj.data;
                            $('#txtCampaignTitle').val(title);
                            $('#btnAddCampaign').text('Update Campaign');
                        }
                    }
                }
                CreateCampaign.ajaxCall(CreateCampaign.config, true);
            },

            GetCampaignPostDetail: function () {
                CreateCampaign.config.methodname = "GetCampaignPostDetail";
                CreateCampaign.config.data = { campaignID: campaignID };
                CreateCampaign.config.ajaxSuccess = function (data) {
                    if (data != null) {
                        var resultObj = data.Value;
                        resultObj = JSON.parse(resultObj);
                        let statusCode = resultObj.statusCode;
                        if (statusCode !== 1) {
                            ActionMessage(resultObj.message, MessageType.Error);
                            CreateCampaign.config.currentStep = -2;
                        }
                        else {
                            //debugger;
                            //let title = resultObj.data;
                            //$('#txtCampaignTitle').val(title);
                            //$('#btnAddCampaign').text('Update Campaign');
                        }
                    }
                }
                CreateCampaign.ajaxCall(CreateCampaign.config, true);
            },

            GetCampaignStatus: function () {
                CreateCampaign.config.methodname = "GetCampaignStatus";
                CreateCampaign.config.data = { campaignID: campaignID };
                CreateCampaign.config.ajaxSuccess = function (data) {
                    CreateCampaign.CampaignStatusResponse(data);
                }
                CreateCampaign.ajaxCall(CreateCampaign.config, true);
            },

            CampaignStatusResponse: function (data) {
                if (data != null) {
                    var resultObj = data.Value;
                    resultObj = JSON.parse(resultObj);
                    let statusCode = resultObj.statusCode;
                    if (statusCode !== 1) {
                        ActionMessage(resultObj.message, MessageType.Error);
                        CreateCampaign.config.currentStep = -2;
                    }
                    else {
                        let stat = resultObj.data;
                        if (stat == 0) stat = -1;
                        CreateCampaign.config.currentStep = stat;
                    }
                }
            },

            BindControl: function () {
                $('#divCampaignTypeWrapper').hide();
                $('#divCampaignTitleWrapper').hide();
                $('#divCampaignComposeWrapper').hide();
                $('#divCampaignPostWrapper').hide();
                $('#divCampaignPostPublish').hide();
                $('.breadcrumb-item').removeClass('active');
                //$('#divCampaignPublsished').hide();
                switch (parseInt(CreateCampaign.config.currentStep)) {
                    case -1:
                        CreateCampaign.LoadCampaigns();
                        $('#divCampaignTypeWrapper').show();
                        break;
                    case 0:
                        $('.breadcrumb-item.step-1').addClass('active');
                        $('.breadcrumb-item.step-1').removeClass('disabled');
                        $('#divCampaignTitleWrapper').show();
                        break;
                    case 1:
                        $('.breadcrumb-item.step-1').removeClass('disabled');
                        $('.breadcrumb-item.step-2').removeClass('disabled');
                        $('.breadcrumb-item.step-2').addClass('active');
                        CreateCampaign.GetCampaignApps();
                        CreateCampaign.BindComposeEvents();
                        $('#divCampaignComposeWrapper').show();
                        break;
                    case 2:
                    case 3:
                        $('.breadcrumb-item.step-1').removeClass('disabled');
                        $('.breadcrumb-item.step-2').removeClass('disabled');
                        $('.breadcrumb-item.step-3').removeClass('disabled');

                        $('.breadcrumb-item.step-3').addClass('active');
                        CreateCampaign.GetCampaignPostList();
                        CreateCampaign.BindPublishEvents();
                        $('#divCampaignPostWrapper').show();
                        break;
                    //case 3:
                    //    $('.breadcrumb-item').removeClass('disabled');
                    //    $('.breadcrumb-item.step-5').addClass('disabled');

                    //    $('.breadcrumb-item.step-4').addClass('active');
                    //    CreateCampaign.BindPublishEvents();
                    //    $('#divCampaignPostPublish').show();
                    //    break;
                    case 4:
                       $('.breadcrumb-item.step-5').removeClass('disabled');

                        $('.breadcrumb-item.step-5').addClass('active');
                        $('.camp-content').text(localLabel.Messages.PostScheduled);
                        $('#divCampaignPublsished').show();
                        break;
                    case 5:
                        $('.breadcrumb-item.step-5').removeClass('disabled');

                        $('.breadcrumb-item.step-5').addClass('active');
                        $('.camp-content').text(localLabel.Messages.PostComplete);
                        $('#divCampaignPublsished').show();
                        break;

                    default:
                }
            },


            LoadCampaigns: function () {
                let searchText = "";
                CreateCampaign.config.methodname = "GetCampaignTypes";
                CreateCampaign.config.data = { searchText: searchText };
                CreateCampaign.config.ajaxSuccess = function (data) {
                    CreateCampaign.LoadDataSuccessMessage(data);
                }
                CreateCampaign.ajaxCall(CreateCampaign.config, true);
            },

            LoadDataSuccessMessage: function (data) {
                if (data != null) {
                    var itemList = data;
                    if (itemList.Data.length > 0) {
                        let html = '';
                        $.each(itemList.Data, function (index, item) {
                            html += `<div class="campaignType sfCol-12 sfCol-sm-6 Mb-25 sm-Mb-0" data-type=${item.campaignTypeID}>
                                      <div class='card flex f-middle f-center f-wrap'><div class="campaign-title w-100"> ${item.title} </div></div>
                                    </div>`;

                        });
                        $('#divCampaignType').html(html);
                        CreateCampaign.BindCampaignTypeEvents();

                    }
                }
            },

            BindCampaignTypeEvents: function () {
                $('.campaignType').off('click').on('click', function () {
                    campaignTypeID = $(this).attr('data-type');
                    CreateCampaign.config.currentStep = 0;
                    CreateCampaign.BindControl();
                });
            },

            LoadUIEvents: function () {

                $('.btnCancel').off('click').on('click', function () {
                    location.href = "/dashboard/campaign/index";
                });

                $('#btnAddCampaign').off('click').on('click', function () {

                    if ($validator.form()) {
                        let title = $.trim($('#txtCampaignTitle').val());

                        var campaignInfo = {
                            CampaignID: campaignID,
                            CampaignType: parseInt(campaignTypeID),
                            CampaignTitle: title
                        }

                        CreateCampaign.config.methodname = "CampaignAdd";
                        CreateCampaign.config.data = JSON2.stringify(campaignInfo);
                        CreateCampaign.config.ajaxSuccess = function (data) {
                            CreateCampaign.CampaignAddResponse(data);
                        }
                        CreateCampaign.ajaxCall(CreateCampaign.config);
                    }
                });


            },

            isEmptyOrSpaces: function (str) {
                return str === null || str.match(/^ *$/) !== null;
            },

            CampaignAddResponse: function (data) {
                if (data != null) {
                    var resultObj = data;
                    let statusCode = resultObj.StatusCode;
                    if (statusCode !== 1) {
                        ActionMessage(resultObj.Message, MessageType.Error);
                    }
                    else {
                        campaignID = resultObj.Data.campaignID;
                        location.href = `/dashboard/campaign/create${CultureURL}/${campaignID}`;
                    }
                }
            },

            GetCampaignApps: function () {
                CreateCampaign.config.methodname = "GetCampaignApps";
                CreateCampaign.config.data = {};
                CreateCampaign.config.ajaxSuccess = function (data) {
                    CreateCampaign.LoadCampaignAppResponse(data);
                }
                CreateCampaign.ajaxCall(CreateCampaign.config, true);
            },

            LoadCampaignAppResponse: function (data) {
                if (data != null) {
                    var itemList = data;
                    if (itemList.Data.length > 0) {
                        let html = '';
                        $.each(itemList.Data, function (index, item) {
                            html += `<div class="camp-app">
                                        <div class="checkbox-label">
                                            <input class="chkCampapp" id="chkCampapp-${item.appID}" type="checkbox" value="${item.appID}">
                                            <label for="chkCampapp-${item.appID}"><i class="fa ${item.icon}"></i> </label>
                                        </div>
                                          </div>
                                       
                                    </div>`;

                        });
                        $('#divCampaignApps').html(html);

                        $('.chkCampapp').off('click').on('click', function () {
                            if ($('.chkCampapp:checked').length === 0) {
                                $('#chckError').val('');
                            }
                            else {
                                $('#chckError').val('checked');
                            }
                        });

                        CreateCampaign.BindCampaignTypeEvents();

                    }
                }
            },

            BindComposeEvents: function () {
                $('#postLogo').attr('src', CreateCampaign.config.defaultPostImage);
                $('.browsePostLogo').off("click").on("click", function () {

                    var sagemedia = $('#btnBrowseMedia').SageMedia({
                        onSelect: function (src, response, type, filename, extension) {
                            $.each(src, function (i, img) {
                                if ($('#postLogo').attr('src') === CreateCampaign.config.defaultPostImage) {
                                    $('#postLogo').attr('src', img.filePath);
                                    $('.postImagePrimary .deleteImage').show();
                                }
                                else {
                                    let imageHtml = ` <div class="Px-10">
                                                        <div class="thumb md round postImageSecondary p-relative o-visible Mb-10">
                                                            <img class="secondaryImage postImage img-contain" src="${img.filePath}" alt=""/>
                                                            <div class="btn sq round dark deleteImage"><i class="fa fa-trash-o"></i></div>
                                                            </div> </div>`;
                                    $('.secondaryImages').append(imageHtml);

                                    $('.postImageSecondary .deleteImage').off('click').on('click', function () {
                                        let $parent = $(this).closest('.postImageSecondary');
                                        $parent.remove();
                                    });
                                }
                            });
                        },
                        mediaType: 'image',
                        multipleselect: true
                    });
                    sagemedia.Show();


                });

                $('.postImagePrimary .deleteImage').off('click').on('click', function () {
                    let $parent = $(this).closest('.postImagePrimary');
                    if ($('.secondaryImages').find('.postImageSecondary').length === 0) {
                        $('#postLogo').attr('src', CreateCampaign.config.defaultPostImage);
                        $('.postImagePrimary .deleteImage').hide();
                    }
                    else {
                        let $firstChild = $('.secondaryImages').find('.postImageSecondary:first');
                        let firstChildSrc = $firstChild.find('.secondaryImage').attr('src');
                        $('#postLogo').attr('src', firstChildSrc);
                        $firstChild.remove();
                    }
                    // $parent.remove();
                });


                $('#btnAddCampaignContent').off('click').on('click', function () {

                    if ($validator.form()) {
                        let content = $.trim($('#txtCampaignContent').val());
                        var checkedData = $(".chkCampapp:checked").map(function () {
                            return this.value;
                        }).get();
                        let appIds = checkedData.join(',');


                        var uploadedImageArray = $(".postImage").map(function () {
                            return $(this).attr('src') === CreateCampaign.config.defaultPostImage ? '' : SageFrameHostURL + $(this).attr('src');
                        }).get();
                        let images = $.trim(uploadedImageArray.join(','));

                        let imageArray = [];

                        if (images.length > 0) {
                            imageArray = images.split(',');
                        }
                        var campaignInfo = {
                            CampaignID: campaignID,
                            PostContent: content,
                            AppIDs: appIds,
                            ImageUrls: imageArray
                        }

                        CreateCampaign.config.methodname = "CampaignAddPost";
                        CreateCampaign.config.data = JSON2.stringify(campaignInfo);
                        CreateCampaign.config.ajaxSuccess = function (data) {
                            CreateCampaign.CampaignPostResponse(data);
                        }
                        CreateCampaign.ajaxCall(CreateCampaign.config);
                    }
                });
            },

            CampaignPostResponse: function (data) {
                if (data != null) {
                    var resultObj = data.Value;
                    resultObj = JSON.parse(resultObj);
                    let statusCode = resultObj.StatusCode;
                    if (statusCode !== 1) {
                        ActionMessage(resultObj.Message, MessageType.Error);
                    }
                    else {
                        CreateCampaign.config.currentStep = 2;
                        CreateCampaign.BindControl();
                    }
                }
            },

            GetCampaignPostList: function () {
                CreateCampaign.config.methodname = "GetCampaignPostList";
                CreateCampaign.config.data = { campaignID: campaignID };
                CreateCampaign.config.ajaxSuccess = function (data) { CreateCampaign.CampaignPostListResponse(data); }
                CreateCampaign.ajaxCall(CreateCampaign.config, true);
            },

            CampaignPostListResponse: function (data) {
                if (data != null) {
                    var resultObj = data;
                    let statusCode = resultObj.statusCode;
                    if (statusCode !== 1) {
                        ActionMessage(resultObj.message, MessageType.Error);
                        CreateCampaign.config.currentStep = -2;
                    }
                    else {
                        let itemList = resultObj.data;
                        if (itemList.length > 0) {
                            let html = '';
                            $.each(itemList, function (index, item) {

                                let defaultAccount = null;
                                let defaultImage = CreateCampaign.config.defaultPostImage;
                                let defaultImageID = CreateCampaign.config.defaultGuid;
                                if (item.images.length > 0) {
                                    defaultImage = item.images[0].imageUrl;
                                    defaultImageID = item.images[0].imageID;
                                }

                                if (item.hasLinkedAccount)
                                    defaultAccount = item.pages[0];
                                else {
                                    defaultAccount = {
                                        imageUrl: '',
                                        pageID: ''
                                    }
                                }

                                if (item.targetID.length > 0) {
                                    if (item.pages != null) {
                                        defaultAccount = $.grep(item.pages, function (a) {
                                            return a.pageID === item.targetID;
                                        })[0];
                                    }
                                }


                                html += `<div class="main-left campaignPost ${item.appName}" data-campaignID='${item.campaignID}' data-targetID='${item.targetID}' data-campaignPostID='${item.campaignPostID}'>
                                            <div class="block is-default">
                                                <div class="sfFormwrapper">
                                                    <div class="card">
                                                        <div class="card-body">
                                                    <div class="sfFieldset Mx-N-20 campaign-post-title">
                                                      
                                                            <div class="postHeader flex Px-20 Mb-20">
                                                            <div class="profileImageWrapper thumb sm round"><img src="${defaultAccount.imageUrl.length === 0 ? CreateCampaign.config.defaultPostImage : defaultAccount.imageUrl}" class="profileImage img-contain br-none" alt="Profile name">
															</div>
                                                                <div class="platformMeta formvalue sfCol Pr-0 Mt-0 gray-800">
                                                                    <div>
                                                                        <span class="platformName fw-600 Mb-8 d-block h6">${item.appName}</span>
																		<div>
                                                                            <div class="foriegnProfileIdField ">`;

                                if (item.hasLinkedAccount) {

                                    html += `                                       <div class="text small gray-700  fw-500 Mb-8">Publish to your page</div>
																				<div class="fieldWrapper select Input ">
																					<div class="select d-i-block">
																						<select class='postPageSelect sfFormcontrol' data-linked='${item.hasLinkedAccount}'>`;
                                    if (item.pages !== null && item.pages.length > 0)
                                        $.each(item.pages, function (i, page) {
                                            if (page.pageID === defaultAccount.pageID) {
                                                html += `<option selected value='${page.pageID}' data-obj='${JSON.stringify(page)}'>${page.pageName}</option>`;
                                            }
                                            else
                                                html += `<option value='${page.pageID}' data-obj='${JSON.stringify(page)}'>${page.pageName}</option>`;
                                        });
                                    html += `                                               </select>
																							
																					</div>
																				</div>`;
                                }
                                else {
                                    html += ` <span class="btn sml-btn primary-btn linkAccount" data-type='${item.appName}' >Connect Account</span>`;
                                }
                                html += `                                   </div>
																		</div>
																	</div>
																</div>
                                                          <div class="platformIcons f-middle f-center ml-auto"><i class="fa ${item.icon}"></i></div>
                                                        </div>
                                                        </div>
												

                                                    <div class="sfFieldset mr-0 mb-0">
                                                        <div class="formValue campaign-post">
                                                            <textarea name="campaignContent" id='post-content-${item.campaignPostID}' class="sfFormcontrol area post-content" placeholder="write something....">${item.postContent}</textarea>
                                                        </div>
                                                    </div>
                                                    <div class="image sfFieldset">
                                                        <div class="thumb  postImagePrimary">
                                                            <img class="imgPrimary img-cover postImage" src="${defaultImage.replace(SageFrameHostURL, '')}" data-imageid="${defaultImageID}" alt="">
                                                            <div class="btn sq round dark deleteImage"  style="${defaultImage === CreateCampaign.config.defaultPostImage ? "display:none" : ''}"><i class="fa fa-trash-o"></i></div>
                                                        </div >
                                                    </div >
                                                    <div class="sfFormGroup sfFieldset">
                                                        <div class="secondaryImageWrapper flex ">
                                                             <div class="post-upload-image Pr-15">
                                                                <div class="browseDynamicPostLogo">
                                                                    <div class="action-wrapper"><span class="media-upload productmedia postDynamicImageIcon"><i class="ct-ios-plus-outline"></i> </span></div>
                                                                </div>
                                                            </div>
                                                            <div class="secondaryImages flex f-wrap">`
                                $.each(item.images, function (i, img) {
                                    if (i !== 0)
                                        html += `<div class="Px-10">
                                                     <div class="thumb md round postImageSecondary p-relative o-visible Mb-10">
                                                                    <img class="secondaryImage postImage img-contain" src="${img.imageUrl.replace(SageFrameHostURL, '')}" alt="" data-imageid="${img.imageID}" />
                                                                    <div class="btn sq round dark deleteImage"><i class="fa fa-trash-o"></i></div>
                                                           </div></div>`;
                                });
                                html += `</div>
                                                           
                                                        </div>
                                                    </div>
                                                </div >
                                            </div >
 </div >
 </div >
                                        </div > `;

                            });
                            $('#divCampaignPost').html(html);
                            CreateCampaign.BindCampaignPostEvents();
                            $('.campaignPostList').find('.postPageSelect').each(function () {
                                let $parent = $(this).closest('.campaignPost');
                                let targetID = $parent.attr('data-targetID');
                                let linked = $(this).attr('data-linked');
                                if (targetID.length === 0 && linked.toLowerCase() === 'true')
                                    $(this).trigger('change');
                            });

                        }
                    }
                }
            },

            BindCampaignPostEvents: function () {

                $('.linkAccount').off('click').on('click', function () {

                    let linkType = $(this).attr('data-type');
                    let requestUrl = window.location.origin + window.location.pathname + `${CultureURL}/${campaignID}`;
                    CreateCampaign.config.methodname = "LinkAccount";
                    CreateCampaign.config.data = { type: linkType, redirectUrl: requestUrl };
                    CreateCampaign.config.ajaxSuccess = function (data) {
                        CreateCampaign.LinkAccountResponse(data);
                    }
                    CreateCampaign.ajaxCall(CreateCampaign.config, true);

                });

                $('#btnProcessCampaign').off('click').on('click', function () {
                    if ($validator.form()) {
                        CreateCampaign.config.methodname = "ProcessCampaignPost";
                        CreateCampaign.config.data = { campaignID: campaignID };
                        CreateCampaign.config.ajaxSuccess = function (data) {
                            CreateCampaign.ProcessCampaignResponse(data);
                        }
                        CreateCampaign.ajaxCall(CreateCampaign.config, true);
                    }
                });

                $('.campaignPostList').find('.postPageSelect').off('change').on('change', function () {
                    let $option = $(this).find(":selected");
                    let pageObj = JSON.parse($option.attr('data-obj'));
                    let $parent = $(this).closest('.campaignPost');

                    $parent.find('.profileImageWrapper img').attr('src', pageObj.imageUrl.length === 0 ? CreateCampaign.config.defaultPostImage : pageObj.imageUrl)
                    $parent.find('.platformName').text(pageObj.pageName);
                    CreateCampaign.UpdateIndividualPost($parent);


                });

                $('.campaignPostList').find('.post-content').off('focusout').on('focusout', function () {
                    let $parent = $(this).closest('.campaignPost');
                    CreateCampaign.UpdateIndividualPost($parent);
                });

                $('.browseDynamicPostLogo').off("click").on("click", function () {
                    let $parentCampaign = $(this).closest('.campaignPost');

                    var sagemedia = $('#addImage').SageMedia({
                        onSelect: function (src, response, type, filename, extension) {
                            $.each(src, function (i, img) {
                                if ($parentCampaign.find('.imgPrimary').attr('src') === CreateCampaign.config.defaultPostImage) {
                                    $parentCampaign.find('.imgPrimary').attr('src', img.filePath);
                                    $parentCampaign.find('.postImagePrimary .deleteImage').show();
                                }
                                else {
                                    let imageHtml = ` <div class="Px-10">
                                                        <div class="thumb md round postImageSecondary p-relative o-visible Mb-10">
                                                            <img class="secondaryImage postImage img-contain" src="${img.filePath}" alt=""/>
                                                            <div class="btn sq round dark deleteImage"><i class="fa fa-trash-o"></i></div>
                                                           </div>  </div>`;
                                    $parentCampaign.find('.secondaryImages').append(imageHtml);

                                    $parentCampaign.find('.postImageSecondary .deleteImage').off('click').on('click', function () {
                                        let $parent = $(this).closest('.postImageSecondary');
                                        let $parentCampaign = $(this).closest('.campaignPost');
                                        $parent.remove();
                                        CreateCampaign.UpdateIndividualPost($parentCampaign);
                                    });
                                }

                                CreateCampaign.UpdateIndividualPost($parentCampaign);
                            });
                        },
                        mediaType: 'image',
                        multipleselect: true
                    });
                    sagemedia.Show();
                });


                $('.postImageSecondary .deleteImage').off('click').on('click', function () {
                    let $parent = $(this).closest('.postImageSecondary');

                    let $parentCampaign = $(this).closest('.campaignPost');
                    $parent.remove();
                    CreateCampaign.UpdateIndividualPost($parentCampaign);

                });

                $('.postImagePrimary .deleteImage').off('click').on('click', function () {

                    let $parent = $(this).closest('.postImagePrimary');
                    let $parentCampaign = $(this).closest('.campaignPost');
                    if ($parentCampaign.find('.secondaryImages').find('.postImageSecondary').length === 0) {
                        $parentCampaign.find('.imgPrimary').attr('src', CreateCampaign.config.defaultPostImage);
                        $parentCampaign.find('.postImagePrimary .deleteImage').hide();
                    }
                    else {
                        let $firstChild = $parentCampaign.find('.secondaryImages').find('.postImageSecondary:first');
                        let firstChildSrc = $firstChild.find('.secondaryImage').attr('src');
                        $parentCampaign.find('.imgPrimary').attr('src', firstChildSrc);
                        $firstChild.remove();
                    }

                    CreateCampaign.UpdateIndividualPost($parentCampaign);
                    // $parent.remove();
                });
                //post-content
            },

            LinkAccountResponse: function (data) {
                if (data !== null) {
                    data = data.d;
                    if (data.length > 0) {
                        location.href = data;
                    }
                }
            },

            UpdateIndividualPost: function ($parent) {

                if ($validator.form()) {
                    var uploadedImageArray = $parent.find(".postImage").map(function () {

                        return $(this).attr('src') === CreateCampaign.config.defaultPostImage ? {} :
                            { imageID: $(this).attr('data-imageid'), imageUrl: SageFrameHostURL + $(this).attr('src') };
                    }).get();


                    let campaignID = $parent.attr('data-campaignid');
                    let campaignPostID = $parent.attr('data-campaignpostid');
                    let campaignConent = $parent.find('.post-content').val();

                    let $option = $parent.find(".postPageSelect option:selected");
                    let pageObj = JSON.parse($option.attr('data-obj'));

                    var campaignInfo = {
                        campaignID: campaignID,
                        campaignPostID: campaignPostID,
                        appID: pageObj.appID,
                        postContent: campaignConent,
                        targetID: pageObj.pageID,
                        images: uploadedImageArray
                    }

                    CreateCampaign.config.methodname = "CampaignPostSave";
                    CreateCampaign.config.data = JSON2.stringify(campaignInfo);
                    CreateCampaign.config.ajaxSuccess = function (data) {
                        CreateCampaign.CampaignPostSaveResponse(data);
                    }
                    CreateCampaign.ajaxCall(CreateCampaign.config);
                }
            },

            CampaignPostSaveResponse: function (data) {
                if (data != null) {
                    var resultObj = data.Value;
                    resultObj = JSON.parse(resultObj);
                    let statusCode = resultObj.StatusCode;
                    if (statusCode !== 1) {
                        ActionMessage(resultObj.Message, MessageType.Error);
                    }
                    else {
                        //CreateCampaign.config.currentStep = 2;
                        //CreateCampaign.BindControl();
                    }
                }
            },

            ProcessCampaignResponse: function (data) {
                if (data != null) {
                    var resultObj = data.Value;
                    resultObj = JSON.parse(resultObj);
                    let statusCode = resultObj.statusCode;
                    if (statusCode !== 1) {
                        ActionMessage(resultObj.message, MessageType.Error);
                    }
                    else {
                        CreateCampaign.config.currentStep = 3;
                        CreateCampaign.BindControl();
                    }
                }
            },

            BindPublishEvents: function () {
                $('#txtSchedule').datetimepicker({
                    dateFormat: "yy-mm-dd",
                    timeFormat: "hh:mm:ss",
                    defaultValue: Date.now(),
                    minDate: Date.now(),
                    timepickerScrollbar: false
                });

                $('.rbSchedule').off('change').on('change', function () {
                    var val = $('.rbSchedule:checked').val();
                    if (val == 1) {
                        $('#divScheduleForm').hide();
                    } else {

                        $('#divScheduleForm').show();
                    }
                });

                $('#btnPublishCampaign').off('click').on('click', function () {

                    if ($validator.form()) {
                        var val = $('.rbSchedule:checked').val();
                        let isInstant = false;
                        let scheduleOn = '';
                        if (val === '1') {
                            isInstant = true;
                        }
                        else {
                            scheduleOn = $('#txtSchedule').val();
                            scheduleOn = ConvertLocalDateToUTCDate(scheduleOn);
                        }
                        let obj = {
                            campaignid: campaignID,
                            publish: isInstant,
                            scheduleOn: scheduleOn
                        }

                        CreateCampaign.config.methodname = "ScheduleCampaign";
                        CreateCampaign.config.data = obj;
                        CreateCampaign.config.ajaxSuccess = function (data) {
                            CreateCampaign.ScheduleCampaignResponse(data);
                        }
                        CreateCampaign.ajaxCall(CreateCampaign.config, true);
                    }
                });

                $('#btnPublishCampaignInline').off('click').on('click', function () {

                    if ($validator.form()) {
                        CreateCampaign.config.methodname = "ProcessCampaignPost";
                        CreateCampaign.config.data = { campaignID: campaignID };
                        CreateCampaign.config.ajaxSuccess = function (data) {

                            if (data != null) {
                                var resultObj = data.Value;
                                resultObj = JSON.parse(resultObj);
                                let statusCode = resultObj.statusCode;
                                if (statusCode !== 1) {
                                    ActionMessage(resultObj.message, MessageType.Error);
                                }
                                else {
                                    var val = $('.rbSchedule:checked').val();
                                    let isInstant = false;
                                    let scheduleOn = '';
                                    if (val === '1') {
                                        isInstant = true;
                                    }
                                    else {
                                        scheduleOn = $('#txtSchedule').val();

                                        scheduleOn = ConvertLocalDateToUTCDate(scheduleOn);
                                    }
                                    let obj = {
                                        campaignid: campaignID,
                                        publish: isInstant,
                                        scheduleOn: scheduleOn
                                    }

                                    CreateCampaign.config.methodname = "ScheduleCampaign";
                                    CreateCampaign.config.data = obj;
                                    CreateCampaign.config.ajaxSuccess = function (data) {
                                        CreateCampaign.ScheduleCampaignResponse(data);
                                    }
                                    CreateCampaign.ajaxCall(CreateCampaign.config, true);
                                }
                            }

                            //CreateCampaign.ProcessCampaignResponse(data);
                        }
                        CreateCampaign.ajaxCall(CreateCampaign.config, true);
                    }

                });
            },

            ScheduleCampaignResponse: function (data) {
                if (data != null) {
                    var resultObj = data.Value;
                    resultObj = JSON.parse(resultObj);
                    let statusCode = resultObj.statusCode;
                    if (statusCode !== 1) {
                        ActionMessage(resultObj.message, MessageType.Error);
                    }
                    else {
                        //ActionMessage(resultObj.message, "Success");
                        CreateCampaign.config.currentStep = 5;
                        CreateCampaign.BindControl();
                    }
                }
            },

            getUrlParameter: function (name) {
                name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
                var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
                var results = regex.exec(location.search);
                return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
            }


        };

        $validator = $('#form1').validate({
            rules: {
                campaignTitle: { required: true },
                campaignContent: { required: true },
                chckError: { required: true },
                scheduleOn: { required: true }
            },
            messages: {
                campaignTitle: { required: "* please enter title" },
                campaignContent: { required: "* required field" },
                chckError: { required: "* please check at least one app" },
                scheduleOn: { required: "* please add date" },
            },
            ignore: ':hidden, :disabled'
        });


        jQuery.validator.addMethod('selectcheck', function (value) {
            return (value != '0');
        }, "*");

        CreateCampaign.init();
    };


    $.fn.CreateCampaignManage = function (p) {
        $.CreateCampaign(p);
    };
})(jQuery);
$(function () {
    if ($('body').find('.form-header-top').length > 0) {
        var top = $('nav.navbar').height();
        $(document).scroll(function () {
            if ($(window).scrollTop() >= top) {
                $('.form-header-top').addClass('sticky').css('top', top);
                $('.form-header-top').removeClass('sfRow');
                $('.form-header-top').removeClass('is-default');

            } else {
                $('.form-header-top').removeClass('sticky');
                $('.form-header-top').addClass('sfRow');
                $('.form-header-top').addClass('is-default');
            }
        });
    }
});