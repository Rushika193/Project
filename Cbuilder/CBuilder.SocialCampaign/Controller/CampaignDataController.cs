using Cbuilder.Core.API.Enum;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CBuilder.SocialCampaign
{
    public class CampaignDataController
    {
        public async Task InitSetting(string username)
        {
            CampaignProvider provider = new CampaignProvider();
            await provider.InitSetting(username);
        }

        public async Task<CampaignSetting> GetCampaignSetting()
        {
            CampaignProvider provider = new CampaignProvider();
            return await provider.GetCampaignSetting();
        }

        public async Task<string> GetCampaignList(int offset, int limit, int campaignType, int statusID, string searchText)
        {
            CampaignSetting settingObj = await GetCampaignSetting();

            Dictionary<string, string> headers = new Dictionary<string, string>();
            headers.Add("secret", settingObj.APISecret);
            headers.Add("domainsecret", settingObj.DomainSecret);

            var data = new
            {
                offset = offset,
                limit = limit,
                searchText = searchText,
                campaignType = campaignType,
                statusID = statusID
            };

            var jsonData = JsonConvert.SerializeObject(data);


            Invoker invoker = new Invoker();
            string result = await invoker.PostAsync("POST", APIEndPoint.CampaignList, headers, jsonData);

            return result;
        }

        public async Task<string> AddDuplicateCampaign(string campaignID)
        {
            CampaignSetting settingObj = await GetCampaignSetting();

            Dictionary<string, string> headers = new Dictionary<string, string>();
            headers.Add("secret", settingObj.APISecret);
            headers.Add("domainsecret", settingObj.DomainSecret);

            var data = new
            {
                campaignID = campaignID
            };

            var jsonData = JsonConvert.SerializeObject(data);


            Invoker invoker = new Invoker();
            string result = await invoker.PostAsync("POST", APIEndPoint.CampaignAddDuplicate, headers, jsonData);

            return result;
        }
        public async Task<string> GetCampaignDetail(string campaignID)
        {
            CampaignSetting settingObj = await GetCampaignSetting();

            Dictionary<string, string> headers = new Dictionary<string, string>();
            headers.Add("secret", settingObj.APISecret);
            headers.Add("domainsecret", settingObj.DomainSecret);

            var data = new
            {
                campaignID = campaignID
            };

            var jsonData = JsonConvert.SerializeObject(data);


            Invoker invoker = new Invoker();
            string result = await invoker.PostAsync("POST", APIEndPoint.CampaignDetail, headers, jsonData);

            return result;
        }

        public async Task<string> DeleteCampaign(string campaignID)
        {
            CampaignSetting settingObj = await GetCampaignSetting();

            Dictionary<string, string> headers = new Dictionary<string, string>();
            headers.Add("secret", settingObj.APISecret);
            headers.Add("domainsecret", settingObj.DomainSecret);

            var data = new
            {
                campaignID = campaignID
            };

            var jsonData = JsonConvert.SerializeObject(data);


            Invoker invoker = new Invoker();
            string result = await invoker.PostAsync("POST", APIEndPoint.CampaignDelete, headers, jsonData);

            return result;
        }

        public async Task<ResponseInfo> SubscribeService(string hostUrl, string username)
        {
            CampaignSetting settingObj = await GetCampaignSetting();

            Dictionary<string, string> headers = new Dictionary<string, string>();
            headers.Add("secret", settingObj.APISecret);

            var data = new
            {
                DomainType = settingObj.DomainType,
                DomainName = hostUrl,
                DomainSecret = settingObj.DomainSecret
            };

            var jsonData = JsonConvert.SerializeObject(data);

            Invoker invoker = new Invoker();
            ResponseInfo info = await invoker.PostAsync<ResponseInfo>("POST", APIEndPoint.Subscribe, headers, jsonData);

            if (info.StatusCode == StatusCode.Created)
            {
                CampaignProvider provider = new CampaignProvider();
                await provider.UpdateCampaignSetting(subscribe: true, username);
            }

            return info;
        }


        public async Task<ResponseInfo> UnSubscribeService(string username)
        {
            CampaignSetting settingObj = await GetCampaignSetting();

            Dictionary<string, string> headers = new Dictionary<string, string>();
            headers.Add("secret", settingObj.APISecret);

            var data = new
            {
                DomainType = settingObj.DomainType,
                DomainSecret = settingObj.DomainSecret
            };

            var jsonData = JsonConvert.SerializeObject(data);

            Invoker invoker = new Invoker();
            ResponseInfo info = await invoker.PostAsync<ResponseInfo>("POST", APIEndPoint.UnSubscribe, headers, jsonData);

            if (info.StatusCode == StatusCode.Created)
            {
                CampaignProvider provider = new CampaignProvider();
                await provider.UpdateCampaignSetting(subscribe: false, username);
            }

            return info;
        }

        public async Task<string> LinkAccount(string type, string redirectUrl)
        {
            switch (type.ToLower())
            {
                case "facebook": return await ConnectFacebook(redirectUrl);
                case "twitter": return await ConnectTwitter(redirectUrl);
                default: return string.Empty;
            }
        }

        public async Task<string> ConnectFacebook(string redirectUrl)
        {
            CampaignSetting settingObj = await GetCampaignSetting();
            string url = APIEndPoint.ConnectFacebook + $"?ret_url={redirectUrl}&appsecret={settingObj.APISecret}&domainsecret={settingObj.DomainSecret}";

            return url;

        }

        public async Task<string> ConnectTwitter(string redirectUrl)
        {
            CampaignSetting settingObj = await GetCampaignSetting();
            string url = APIEndPoint.ConnectTwitter + $"?ret_url={redirectUrl}&appsecret={settingObj.APISecret}&domainsecret={settingObj.DomainSecret}";

            return url;

        }

        public async Task<string> GetCampaignApps()
        {
            CampaignSetting settingObj = await GetCampaignSetting();

            Dictionary<string, string> headers = new Dictionary<string, string>();
            headers.Add("secret", settingObj.APISecret);
            headers.Add("domainsecret", settingObj.DomainSecret);

            Invoker invoker = new Invoker();
            ResponseInfo info = await invoker.PostAsync<ResponseInfo>("GET", APIEndPoint.CampaignApps, headers);

            return JsonConvert.SerializeObject(info);
        }

        public async Task<string> GetCampaignType(string searchText)
        {
            CampaignSetting settingObj = await GetCampaignSetting();

            Dictionary<string, string> headers = new Dictionary<string, string>();
            headers.Add("secret", settingObj.APISecret);
            headers.Add("domainsecret", settingObj.DomainSecret);

            var data = new
            {
                searchText = searchText
            };

            var jsonData = JsonConvert.SerializeObject(data);

            Invoker invoker = new Invoker();
            ResponseInfo info = await invoker.PostAsync<ResponseInfo>("POST", APIEndPoint.CampaignType, headers, jsonData);

            return JsonConvert.SerializeObject(info);
        }

        public async Task<string> CampaignAdd(CampaignInfo campaignInfo)
        {
            CampaignSetting settingObj = await GetCampaignSetting();

            Dictionary<string, string> headers = new Dictionary<string, string>();
            headers.Add("secret", settingObj.APISecret);
            headers.Add("domainsecret", settingObj.DomainSecret);

            var data = new
            {
                campaignID = campaignInfo.CampaignID,
                campaignType = campaignInfo.CampaignType,
                campaignTitle = campaignInfo.CampaignTitle,
            };

            var jsonData = JsonConvert.SerializeObject(data);

            Invoker invoker = new Invoker();
            ResponseInfo info = await invoker.PostAsync<ResponseInfo>("POST", APIEndPoint.CampaignAdd, headers, jsonData);

            return JsonConvert.SerializeObject(info);
        }

        public async Task<string> GetCampaignSummary(string campaignID)
        {
            CampaignSetting settingObj = await GetCampaignSetting();

            Dictionary<string, string> headers = new Dictionary<string, string>();
            headers.Add("secret", settingObj.APISecret);
            headers.Add("domainsecret", settingObj.DomainSecret);

            var data = new
            {
                campaignid = campaignID
            };

            var jsonData = JsonConvert.SerializeObject(data);

            Invoker invoker = new Invoker();
            string info = await invoker.PostAsync("POST", APIEndPoint.CampaignSummary, headers, jsonData);

            return info;
        }
        
        public async Task<string> GetCampaignPostDetail(string campaignID)
        {
            CampaignSetting settingObj = await GetCampaignSetting();

            Dictionary<string, string> headers = new Dictionary<string, string>();
            headers.Add("secret", settingObj.APISecret);
            headers.Add("domainsecret", settingObj.DomainSecret);

            var data = new
            {
                campaignid = campaignID
            };

            var jsonData = JsonConvert.SerializeObject(data);

            Invoker invoker = new Invoker();
            string info = await invoker.PostAsync("POST", APIEndPoint.CampaignPostDetail, headers, jsonData);

            return info;
        }
        
        public async Task<string> GetCampaignStatus(string campaignID)
        {
            CampaignSetting settingObj = await GetCampaignSetting();

            Dictionary<string, string> headers = new Dictionary<string, string>();
            headers.Add("secret", settingObj.APISecret);
            headers.Add("domainsecret", settingObj.DomainSecret);

            var data = new
            {
                campaignid = campaignID
            };

            var jsonData = JsonConvert.SerializeObject(data);

            Invoker invoker = new Invoker();
            string info = await invoker.PostAsync("POST", APIEndPoint.CampaignStatus, headers, jsonData);

            return info;
        }


        public async Task<string> CampaignAddPost(CampaignPostInfo campaignInfo)
        {
            CampaignSetting settingObj = await GetCampaignSetting();

            Dictionary<string, string> headers = new Dictionary<string, string>();
            headers.Add("secret", settingObj.APISecret);
            headers.Add("domainsecret", settingObj.DomainSecret);

            var data = new
            {
                campaignID = campaignInfo.CampaignID,
                postContent = campaignInfo.PostContent,
                appIDs = campaignInfo.AppIDs,
                imageUrls = campaignInfo.ImageUrls.ToArray()
            };

            var jsonData = JsonConvert.SerializeObject(data);

            Invoker invoker = new Invoker();
            ResponseInfo info = await invoker.PostAsync<ResponseInfo>("POST", APIEndPoint.CampaignAddPost, headers, jsonData);

            return JsonConvert.SerializeObject(info);
        }

        public async Task<string> GetCampaignPostList(string campaignID)
        {
            CampaignSetting settingObj = await GetCampaignSetting();

            Dictionary<string, string> headers = new Dictionary<string, string>();
            headers.Add("secret", settingObj.APISecret);
            headers.Add("domainsecret", settingObj.DomainSecret);

            var data = new
            {
                campaignid = campaignID
            };

            var jsonData = JsonConvert.SerializeObject(data);

            Invoker invoker = new Invoker();
            string info = await invoker.PostAsync("POST", APIEndPoint.CampaignPostList, headers, jsonData);

            return info;
        }

        public async Task<string> CampaignPostSave(CampaignPostDTO campaignInfo)
        {
            CampaignSetting settingObj = await GetCampaignSetting();

            Dictionary<string, string> headers = new Dictionary<string, string>();
            headers.Add("secret", settingObj.APISecret);
            headers.Add("domainsecret", settingObj.DomainSecret);

            var data = new
            {
                campaignID = campaignInfo.CampaignID,
                campaignPostID = campaignInfo.CampaignPostID,
                campaignType = campaignInfo.PostContent,
                appID = campaignInfo.AppID,
                postContent = campaignInfo.PostContent,
                targetID = campaignInfo.TargetID,
                images = campaignInfo.Images.ToArray()
            };

            var jsonData = JsonConvert.SerializeObject(data);

            Invoker invoker = new Invoker();
            ResponseInfo info = await invoker.PostAsync<ResponseInfo>("POST", APIEndPoint.CampaignPostSave, headers, jsonData);

            return JsonConvert.SerializeObject(info);
        }

        public async Task<string> ProcessCampaignPost(string campaignID)
        {
            CampaignSetting settingObj = await GetCampaignSetting();

            Dictionary<string, string> headers = new Dictionary<string, string>();
            headers.Add("secret", settingObj.APISecret);
            headers.Add("domainsecret", settingObj.DomainSecret);

            var data = new
            {
                campaignid = campaignID
            };

            var jsonData = JsonConvert.SerializeObject(data);

            Invoker invoker = new Invoker();
            string info = await invoker.PostAsync("POST", APIEndPoint.CampaignProcess, headers, jsonData);

            return info;
        }
        public async Task<string> ScheduleCampaign(string campaignID, bool publish, string scheduleOn)
        {
            CampaignSetting settingObj = await GetCampaignSetting();

            Dictionary<string, string> headers = new Dictionary<string, string>();
            headers.Add("secret", settingObj.APISecret);
            headers.Add("domainsecret", settingObj.DomainSecret);

            var data = new
            {
                campaignid = campaignID,
                publish = publish,
                scheduleOn = scheduleOn
            };

            var jsonData = JsonConvert.SerializeObject(data);

            Invoker invoker = new Invoker();
            string info = await invoker.PostAsync("POST", APIEndPoint.CampaignSchedule, headers, jsonData);

            return info;
        }
    }
}
