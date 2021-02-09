using Cbuilder.Core.Helper.Models;
using SageFrame.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBuilder.SocialCampaign
{
    public class APIEndPoint
    {
        public static string HostUrl = GetAPIEndPoint();

        private static string GetAPIEndPoint()
        {
            string _AppURL = APIURL.CampaignBaseUri;

            _AppURL = _AppURL == "" ? "http://localhost:8001/" : _AppURL; //
            return _AppURL;
        }

        public static string Subscribe = HostUrl + "api/domain/subscribe";
        public static string UnSubscribe = HostUrl + "api/domain/unsubscribe";
        public static string ResetSecret = HostUrl + "api/domain/resetsecret";


        public static string GetApps = HostUrl + "api/domain/getapps";
        public static string ConnectFacebook = HostUrl + "api/domain/facebook/connect";
        public static string ConnectTwitter = HostUrl + "api/domain/twitter/connect";

        public static string CampaignList = HostUrl + "api/campaign/list";
        public static string CampaignDetail = HostUrl + "api/campaign/detail";
        public static string CampaignSummary = HostUrl + "api/campaign/campaignsummary";
        public static string CampaignPostDetail = HostUrl + "api/campaign/campaignpostdetail";
        public static string CampaignStatus = HostUrl + "api/campaign/campaignstatus";
        public static string CampaignApps = HostUrl + "api/campaign/campaignapps";
        public static string CampaignType = HostUrl + "api/campaign/campaigntype";
        public static string CampaignAdd = HostUrl + "api/campaign/campaignadd";
        public static string CampaignAddDuplicate = HostUrl + "api/campaign/duplicate";
        public static string CampaignAddPost = HostUrl + "api/campaign/campaignpost";
        public static string CampaignPostList = HostUrl + "api/campaign/post/list";
        public static string CampaignPostSave = HostUrl + "api/campaign/post/save";
        public static string CampaignProcess = HostUrl + "api/campaign/process";
        public static string CampaignSchedule = HostUrl + "api/campaign/schedule";
        public static string CampaignDelete = HostUrl + "api/campaign/delete";


    }

    
}
