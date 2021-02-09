using Cbuilder.Core.Constants;
using Cbuilder.Core.Helper;
using Cbuilder.Core.Helper.Models;
using Cbuilder.Webbuilder.Helper;
using Cbuilder.WebBuilder;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Cbuilder.Webbuilder
{
    public class WebBuilderController
    {
        public WebBuilderController()
        {

        }
        public readonly IMemoryCache _memoryCache;
        public WebBuilderController(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }
        public async Task<int> AddUpdate(WebBuilderInfo webBuilderInfo, string rootPath)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            WBCachehelper objCache = new WBCachehelper();
            objCache.RemoveCacheByPageName(webBuilderInfo.PageName.ToLower(), false, rootPath);
            return await objDataProvider.AddUpdate(webBuilderInfo);
        }

        public async Task<int> AddUpdatePublished(WebBuilderInfo webBuilderInfo, string rootPath)
        {
            int webBuilderID = await AddUpdate(webBuilderInfo, rootPath);
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            if (webBuilderID > 0)
            {
                await objDataProvider.AddUpdatePublished(webBuilderID, webBuilderInfo.SiteID);
                WBCachehelper objCache = new WBCachehelper();
                objCache.RemoveCacheByPageName(webBuilderInfo.PageName.ToLower(), true, rootPath);
            }
            return webBuilderID;
        }

        public async Task<CbuilderView> GetEditDOMByID(WebBuilderInfo webBuilderInfo, ReuseableParams reuseableParams, bool localizationEnabled)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            CbuilderView cbuilderView = await objDataProvider.GetEditDOMByID(webBuilderInfo);
            if (cbuilderView != null)
            {
                Task<IList<WebBuilderPages>> pagesList = objDataProvider.GetPageList(webBuilderInfo.SiteID);
                Task<IList<WebBuilderPages>> dashboardPages = objDataProvider.GetDashboardPageList(webBuilderInfo.SiteID);
                Task<IList<WebBuilderPages>> forbiddenPages = objDataProvider.GetForbiddenPageList(webBuilderInfo.SiteID);
                Task<string> componentList = GetComponent(objDataProvider, webBuilderInfo.SiteID);
                Task<string> bucketComponents = GetBucketCompoent(objDataProvider, webBuilderInfo.SiteID);
                Task<IList<ApplicationDetail>> applicationNames = objDataProvider.GetApplicationNames(webBuilderInfo.SiteID);
                Task<string> apiResultString = InitializeAPI(webBuilderInfo.PageName, reuseableParams, webBuilderInfo.SiteID);
                Task<IList<LanguageList>> languages = null;
                if (localizationEnabled)
                    languages = GetLanguageLists(webBuilderInfo.SiteID);
                //  await Task.WhenAll(pagesList, dashboardPages, componentList, bucketComponents, applicationNames, apiResultString, forbiddenPages, languages);
                cbuilderView.PageList = await pagesList;
                cbuilderView.DashboardPages = await dashboardPages;
                cbuilderView.ComponentList = await componentList;
                cbuilderView.BucketComponents = await bucketComponents;
                //cbuilderView.ApplicationName = await objDataProvider.GetApplicationName().ApplicationName;
                cbuilderView.ApplicationNames = await applicationNames;
                cbuilderView.APIResultString = await apiResultString;
                cbuilderView.ForbiddenPage = await forbiddenPages;
                if (localizationEnabled)
                    cbuilderView.Languages = await languages;
            }
            return cbuilderView;
        }

        public async Task<IList<WebBuilderPages>> GetAllPageList(int siteID)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return await objDataProvider.GetAllPageList(siteID);
        }
        private async Task<string> GetBucketCompoent(WebBuilderDataProvider objDataProvider, int siteID)
        {
            IList<BuilderComponentJson> objComponentList = await objDataProvider.GetBucketComponents(siteID);
            string componentList = JsonSerializer.Serialize(objComponentList);
            componentList = componentList.Length == 0 ? "{}" : componentList;
            return componentList;
        }

        private async Task<string> InitializeAPI(string tempPageName, ReuseableParams reuseableParams, int siteID)
        {
            ControllerInoker objCntrlInvoker = new ControllerInoker();
            List<ControllerDetail> lstApsExtraCompsInvoker = new List<ControllerDetail>();
            Dictionary<string, ControllerDetail> objAPIResult = await objCntrlInvoker.EditLoadAPI(tempPageName, reuseableParams, lstApsExtraCompsInvoker, siteID);
            Newtonsoft.Json.JsonSerializerSettings jss = new Newtonsoft.Json.JsonSerializerSettings
            {
                ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            };
            return Newtonsoft.Json.JsonConvert.SerializeObject(objAPIResult, jss);
        }

        private async Task<string> GetComponent(WebBuilderDataProvider objDataProvider, int siteID)
        {
            IList<BuilderComponentJson> objComponentList = await objDataProvider.GetComponentValue(siteID);
            string componentList = JsonSerializer.Serialize(objComponentList);
            componentList = componentList.Length == 0 ? "{}" : componentList;
            return componentList;
        }
        public async Task<int> CheckPage(string pageName, Guid pageID, int siteID)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return await objDataProvider.CheckPage(pageName, pageID, siteID);
        }
        public async Task<int> DeletePage(DeletePage deletePage)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return await objDataProvider.DeletePage(deletePage);
        }
        public async Task<IList<LanguageList>> GetLanguageLists(int siteID)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return await objDataProvider.GetLanguageLists(siteID);
        }
        public async Task<PageDetail> GetPageDetails(Guid pageID)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return await objDataProvider.GetPageDetails(pageID);
        }
        public async Task<int> UpdatePageName(string pageName, int webbuilderID, int cloneWebBuilderID, string culture)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return await objDataProvider.UpdatePageName(pageName, webbuilderID, cloneWebBuilderID, culture);
        }

        public async Task<IList<BuilderComponentJson>> GetComponentViewValue(string pageName, bool isPublished, int siteID)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return await objDataProvider.GetComponentViewValue(pageName, isPublished, siteID);
        }

        public async Task<int> UpdateComponents(BuilderComponent builderComponent)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return await objDataProvider.UpdateComponents(builderComponent);
        }

        public async Task<WebbuilderViewInfo> GetPageViewDOM(WebbuilderViewGetInfo webbuilderViewGetInfo, ReuseableParams reuseableParams, int siteID)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            WebbuilderViewInfo webbuilderViewInfo = await objDataProvider.GetPageViewDOM(webbuilderViewGetInfo);
            if (webbuilderViewInfo != null)
            {
                List<ControllerDetail> lstApsExtraCompsInvoker = new List<ControllerDetail>();
                Task<string> apiResultString = APIStringResult(webbuilderViewGetInfo.PreviewMode, webbuilderViewGetInfo.PageName, reuseableParams, lstApsExtraCompsInvoker, siteID);
                Task<string> appsExtraComponent = GetAppsExtraComponent(lstApsExtraCompsInvoker, webbuilderViewGetInfo.PageName, siteID);
                //await Task.WhenAll(apiResultString, appsExtraComponent);
                webbuilderViewInfo.APIResultString = await apiResultString;
                webbuilderViewInfo.AppsExtraComponent = await appsExtraComponent;
            }
            return webbuilderViewInfo;
        }

        private async Task<string> APIStringResult(bool isPreview, string pageName, ReuseableParams objReuseableParams, List<ControllerDetail> lstApsExtraCompsInvoker, int siteID)
        {
            ControllerInoker objCntrlInvoker = new ControllerInoker();
            Dictionary<string, ControllerDetail> objAPIResult;
            if (isPreview)
            {
                objAPIResult = await objCntrlInvoker.ViewLoadAPI(pageName, objReuseableParams, lstApsExtraCompsInvoker, siteID);
            }
            else
            {
                objAPIResult = await objCntrlInvoker.ViewLoadAPIPublished(pageName, objReuseableParams, lstApsExtraCompsInvoker, siteID);
            }
            Newtonsoft.Json.JsonSerializerSettings jss = new Newtonsoft.Json.JsonSerializerSettings
            {
                ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            };
            return Newtonsoft.Json.JsonConvert.SerializeObject(objAPIResult, jss);
        }

        public async Task<string> GetAppsExtraComponent(List<ControllerDetail> lstApsCompsInvoker, string PageName, int siteID)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            string InvokeParam = AppsExtraInvokeParam(lstApsCompsInvoker);
            List<BuilderComponentJson> appsExtraComponent = new List<BuilderComponentJson>();
            if (!string.IsNullOrEmpty(InvokeParam))
                appsExtraComponent = (List<BuilderComponentJson>)await objDataProvider.GetAppsExtraComponent(InvokeParam, PageName, siteID);

            return JsonSerializer.Serialize(appsExtraComponent);
        }
        private string AppsExtraInvokeParam(List<ControllerDetail> lstApscompsInvoker)
        {
            try
            {
                if (lstApscompsInvoker.Count > 0)
                {
                    StringBuilder xml = new StringBuilder();
                    xml.Append("<params>");
                    foreach (ControllerDetail info in lstApscompsInvoker)
                    {
                        xml.AppendFormat("<param><id>{0}</id><compname>{1}</compname></param>", info.Args[0], info.Args[1]);
                    }
                    xml.Append("</params>");
                    return xml.ToString();
                }
            }
            catch (Exception)
            {
                return string.Empty;
            }
            return string.Empty;
        }
        public async Task<int> EnableHeadFoot(HeaderFooter headerFooter)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return await objDataProvider.EnableHeadFoot(headerFooter);
        }

        public async Task<IList<ControllerDetail>> GetMethodDetails(string invokeOn, int siteID)
        {
            WebBuilderDataProvider objDataProvider = new WebBuilderDataProvider();
            return await objDataProvider.GetMethodDetails(invokeOn, siteID);
        }

        #region "API CALL for online"
        /// <summary>
        /// 
        /// </summary>
        /// <param name="url">Eg. something.contentder.com</param>
        /// <param name="type">options:component, theme, package</param>
        /// <param name="id">id of respective type</param>
        /// <returns></returns>
        public object GetOnlineComponents(int offset, int limit, string searchText, string type, string category, string applicationName, string secureToken, string userName, string version)
        {
            SettingHelper sfConfig = new SettingHelper();
            string onlineStorePath = sfConfig.GetSettingValueByIndividualKey(SettingKeys.OnlineStore).Result;
            Dictionary<string, object> objCollection = new Dictionary<string, object>
            {
                { "Offset", offset },
                { "Limit", limit },
                { "SearchText", searchText },
                { "Version", version },
                { "Type", type },
                { "Category", category },
                { "ApplicationName", applicationName }
            };
            APIToken objToken = new APIToken(_memoryCache);
            object objResult = objToken.WebClientInvokerPOST("CbuilderApis/GetOnlineComponents", objCollection, secureToken, userName);
            return objResult;
        }
        public object GetRowOnlineComponents(int offset, int limit, string searchText, string type, string category, string applicationName, string secureToken, string userName, string version)
        {
            SettingHelper sfConfig = new SettingHelper();
            string onlineStorePath = sfConfig.GetSettingValueByIndividualKey(SettingKeys.OnlineStore).Result;
            Dictionary<string, object> objCollection = new Dictionary<string, object>
            {
                { "Offset", offset },
                { "Limit", limit },
                { "SearchText", searchText },
                { "Version", version },
                { "Type", type },
                { "Category", category },
                { "ApplicationName", applicationName }
            };
            APIToken objToken = new APIToken(_memoryCache);
            object objResult = objToken.WebClientInvokerPOST("CbuilderApis/GetRowOnlineComponents", objCollection, secureToken, userName);
            return objResult;
        }
        public object GetOnlineSites(int offset, int limit, string themeName, int sectorID, int siteCategoryID, int businessTypeID, string applicationName, string authToken, string userName, string version)
        {
            Dictionary<string, object> args = new Dictionary<string, object>
            {
                { "Offset", offset },
                { "Limit", limit },
                { "ThemeName", themeName },
                { "SectorID", sectorID },
                { "SiteCategoryID", siteCategoryID },
                { "BusinessTypeID", businessTypeID },
                { "Version", version },
                { "ApplicationName", applicationName }
            };

            APIToken token = new APIToken(_memoryCache);
            object result = token.WebClientInvokerPOST("CbuilderApis/GetOnlineSites", args, authToken, userName);
            return result;
        }
        public object GetOnlineTheme(int themeID, string userName, string secureToken, string version)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            param.Add("themeID", themeID);
            param.Add("cbuilderVersion", version);
            param.Add("userName", userName);
            APIToken token = new APIToken(_memoryCache);
            return token.WebClientInvokerPOST("CbuilderApis/InstallThemeFile", param, secureToken, userName);
        }
        public object GetOnlineHelp(int offset, int limit, string searchText, string secureToken, string userName)
        {
            Dictionary<string, object> param = new Dictionary<string, object>
            {
                { "Offset", offset },
                { "Limit", limit },
                { "SearchText", searchText }
            };
            APIToken token = new APIToken(_memoryCache);
            return token.WebClientInvokerPOST("CbuilderApis/GetOnlineWebHelp", param, secureToken, userName);
        }
        public object FeedBackFromClient(FeedbackDetails feedBack, string secureToken, string userName)
        {
            Dictionary<string, object> param = new Dictionary<string, object>
            {
                { "Category", feedBack.Category },
                { "Description", feedBack.Description },
                { "Domain", feedBack.Domain },
                { "EmailID", feedBack.EmailID },
                { "Keyword", feedBack.Keyword },
                { "Name", feedBack.Name },
                { "Rating", feedBack.Rating },
                { "Title", feedBack.Title },
                { "UserName", feedBack.Username }
            };
            APIToken token = new APIToken(_memoryCache);
            return token.WebClientInvokerPOST("CbuilderApis/FeedBackFromClient", param, secureToken, userName).ToString();
        }
        public object OnlineCompoSearchFilters(string secureToken, string userName)
        {
            Dictionary<string, object> dict = new Dictionary<string, object>();
            APIToken token = new APIToken(_memoryCache);
            object objResult = token.WebClientInvokerPOST("CbuilderApis/GetComponentCatAndTypes", dict, secureToken, userName);
            return objResult;
        }
        public object GetFooterData(string secureToken, string userName)
        {
            Dictionary<string, object> param = new Dictionary<string, object>();
            APIToken token = new APIToken(_memoryCache);
            return token.WebClientInvokerPOST("CbuilderApis/GetFooterData", param, secureToken, userName);
        }
        public object GetUpgradeData(string userName, string secureToken)
        {
            APIToken apiToken = new APIToken(_memoryCache);
            return apiToken.WebClientInvokerPOST("CbuilderApis/GetUpgradeData", new Dictionary<string, object>(), secureToken, userName);
        }
        public object ReviewFromClient(ReviewEntity review, string url, string secureToken, string userName)
        {
            Dictionary<string, object> param = new Dictionary<string, object>
            {
                { "UserName", review.UserName },
                { "Password", review.Password },
                { "Review", review.Review },
                { "Url", url }
            };
            APIToken token = new APIToken(_memoryCache);
            return token.WebClientInvokerPOST("CbuilderApis/ReviewFromClient", param, secureToken, userName);
        }
        public object InstallComponent(int componentID, string downloadType, decimal version, string userName, string secureToken, string systemversion)
        {
            Dictionary<string, object> param = new Dictionary<string, object>
            {
                { "ComponentID", componentID },
                { "DownloadType", downloadType },
                { "Version",version  },
                { "CbuilderVersion", systemversion },
                { "UserName", userName }
            };
            APIToken token = new APIToken(_memoryCache);
            object result = token.WebClientInvokerPOST("CbuilderApis/InstallComponent", param, secureToken, userName);
            return result;
        }

        public object PaymentSuccessful(string url, string secureToken, string userName, string tranitToken, string version)
        {
            Dictionary<string, object> param = new Dictionary<string, object>
            {
                { "Url", url },
                { "Tranittoken", tranitToken },
                { "UserName", userName }
            };
            APIToken token = new APIToken(_memoryCache);
            return token.WebClientInvokerPOST("CbuilderApis/PaymentSuccessful", param, secureToken, userName);
        }

        public object GetPurchasedComponents(int offset, int limit, string searchText, string type, string category, string applicationName, string secureToken, string userName, string version)
        {
            Dictionary<string, object> param = new Dictionary<string, object>
            {
                { "Offset", offset },
                { "Limit", limit },
                { "SearchText", searchText },
                { "Version", version },
                { "Type", type },
                { "Category", category },
                { "ApplicationName", applicationName }
            };
            APIToken token = new APIToken(_memoryCache);
            return token.WebClientInvokerPOST("CbuilderApis/GetPurchasedComponents", param, secureToken, userName);
        }
        public object GetComponentTemplate(string componentName, int offset, int limit, string searchText, string tagIDs, string secureToken, string userName)
        {
            Dictionary<string, object> param = new Dictionary<string, object>
            {
                { "Offset", offset },
                { "Limit", limit },
                { "ComponentName", componentName },
                { "SearchText", searchText },
                { "TagIDs", tagIDs }
            };
            APIToken token = new APIToken(_memoryCache);
            return token.WebClientInvokerPOST("CbuilderApis/GetComponentTemplate", param, secureToken, userName);
        }
        public object GetCompTemplateTags(string componentName, string secureToken, string userName)
        {
            Dictionary<string, object> param = new Dictionary<string, object>
            {
                { "ComponentName", componentName }
            };
            APIToken token = new APIToken(_memoryCache);
            return token.WebClientInvokerPOST("CbuilderApis/GetCompTemplateTags", param, secureToken, userName);
        }
        public object GetInstalledComponents(int offset, int limit, string searchText, string type, string category, string applicationName, string secureToken, string userName, string version)
        {
            Dictionary<string, object> param = new Dictionary<string, object>
            {
                { "Offset", offset },
                { "Limit", limit },
                { "SearchText", searchText },
                { "Version", version },
                { "Type", type },
                { "Category", category },
                { "ApplicationName", applicationName }
            };
            APIToken token = new APIToken(_memoryCache);
            return token.WebClientInvokerPOST("CbuilderApis/GetInstalledComponents", param, secureToken, userName);
        }
        public object GetPurchasedSites(int offset, int limit, string themeName, int sectorID, int siteCategoryID, int businessTypeID, string applicationName, string authToken, string userName, string version)
        {
            Dictionary<string, object> args = new Dictionary<string, object>
            {
                { "Offset", offset },
                { "Limit", limit },
                { "ThemeName", themeName },
                { "sectorID", sectorID },
                { "SiteCategoryID", siteCategoryID },
                { "BusinessTypeID", businessTypeID },
                { "Version", version },
                { "ApplicationName", applicationName }
            };

            APIToken token = new APIToken(_memoryCache);
            return token.WebClientInvokerPOST("CbuilderApis/GetPurchasedSites", args, authToken, userName);
        }
        public object GetInstalledSites(int offset, int limit, string themeName, int sectorID, int siteCategoryID, int businessTypeID, string applicationName, string authToken, string userName, string version)
        {
            Dictionary<string, object> args = new Dictionary<string, object>
            {
                { "Offset", offset },
                { "Limit", limit },
                { "ThemeName", themeName },
                { "SectorID", sectorID },
                { "SiteCategoryID", siteCategoryID },
                { "BusinessTypeID", businessTypeID },
                { "Version", version },
                { "ApplicationName", applicationName }
            };
            APIToken token = new APIToken(_memoryCache);
            return token.WebClientInvokerPOST("CbuilderApis/GetInstalledSites", args, authToken, userName);
        }
        #endregion

        #region "API for Design Drepdiction"   
        public object GetDesignList(string dataToSend)
        {
            string aiAPI = "http://52.170.3.135:9222/webscrapper";
            //string aiAPI = sfConfig.GetSettingValueByIndividualKey(SettingKeys.AIAPI).Result;
            APIToken objToken = new APIToken(_memoryCache);
            return objToken.APICall(aiAPI + "/recommenddesign", dataToSend);
        }
        public object ApplyDesign(string dataToSend)
        {
            string aiAPI = "http://52.170.3.135:9222/webscrapper";
            //string aiAPI = sfConfig.GetSettingValueByIndividualKey(SettingKeys.AIAPI).Result;
            APIToken objToken = new APIToken(_memoryCache);
            return objToken.APICall(aiAPI + "/gettemplate", dataToSend);
        }
        #endregion
    }
}
