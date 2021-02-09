using Cbuilder.Core.Constants;
using Cbuilder.Core.Constants.Enum;
using Cbuilder.Core.CoreHelpers;
using Cbuilder.Core.Helper;
using Cbuilder.Core.Helper.Extensions;
using Cbuilder.Core.Helper.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Cbuilder.Core.Controllers
{
    /// <summary>
    /// This class servers a common library needed for cbuilder controller
    /// </summary>
    public class CommonController : Controller
    {
        #region "Private Variables"
        private readonly IHttpContextAccessor _httpContextAccessor;
        private CoreHelper _coreHelper = new CoreHelper();
        private string hostUrl { get; set; }
        private string pageName { get; set; }
        private string culture { get; set; } = "en-US";
        private bool localizedEnabled = false;

        private string queryParamString { get; set; }
        private string[] queryParameters { get; set; }
        private string actionName { get; set; } = string.Empty;
        private string areaName { get; set; } = string.Empty;

        #endregion


        public Dictionary<string, string> settingValuesList = new Dictionary<string, string>();


        public CommonController(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            if (httpContextAccessor.HttpContext.Items[HttpContextKey.IsPageRequest].ToString() == "True")
                InitializePage();
            else
                InitializeAPI();
        }

        #region "Private methods"
        private void InitializeAPI()
        {
            // GetSettingValues();
            ParseURL(false);
            hostUrl = _coreHelper.HostUrl(_httpContextAccessor);
            AssignCommonValue();
        }
        private void InitializePage()
        {
            GetSettingValues();
            ParseURL(true);
            SetUserArea(UserArea.Front);
            SetLayout(CbuilderLayout.Default);
            SetApplication(ApplicationName.Cbuilder);
            hostUrl = _coreHelper.HostUrl(_httpContextAccessor);
            RegisterJSGlobalVariable();
            AssignCommonValue();
        }

        private void AssignCommonValue()
        {
            HttpContextCommons.HostURL = HostUrl;
            HttpContextCommons.LocalizationEnabled = LocalizationEnabled;
            _coreHelper.SetHttpContextItem(HttpContextKey.CultureURL, CultureURL, _httpContextAccessor);
            _coreHelper.SetHttpContextItem(HttpContextKey.CultureCode, GetCurrentCulture, _httpContextAccessor);
            _coreHelper.SetHttpContextItem(HttpContextKey.PageName, PageName, _httpContextAccessor);
            _coreHelper.SetHttpContextItem(HttpContextKey.QueryParameters, QueryParameters, _httpContextAccessor);
            _coreHelper.SetHttpContextItem(HttpContextKey.QueryParamString, QueryParamString, _httpContextAccessor);
            _coreHelper.SetHttpContextItem(HttpContextKey.SiteID, GetSiteID, _httpContextAccessor);
            _coreHelper.SetHttpContextItem(HttpContextKey.ActionName, ActionName, _httpContextAccessor);
            _coreHelper.SetHttpContextItem(HttpContextKey.AreaName, AreaName, _httpContextAccessor);
        }
        private void GetSettingValues()
        {
            SettingHelper settingHelper = new SettingHelper();
            settingValuesList = settingHelper.GetSettingValuesByKeys(string.Format("{0},{1},{2},{3},{4}",
                SettingKeys.Localization,
                SettingKeys.DefaultCulture,
                SettingKeys.ComponentVersion,
                SettingKeys.CultureLanguage,
                SettingKeys.DefaultPage));
        }
        private void ParseURL(bool IsPage)
        {
            RouteValueDictionary routes = _httpContextAccessor.HttpContext.Request.RouteValues;
            if (routes != null)
            {
                if (routes["Page"] != null)
                {
                    pageName = routes["Page"].ToString();
                }
                else if (routes["controller"] != null)
                {
                    pageName = routes["controller"].ToString();
                }
                if ((pageName.ToLower() == "builder" || pageName.ToLower() == "cbuilderdynamicpage") && _httpContextAccessor.HttpContext.Request.Method == "GET")
                    pageName = settingValuesList[SettingKeys.DefaultPage];
                string paramList = routes["Params"]?.ToString();
                if (routes["action"] != null)
                {
                    actionName = routes["action"].ToString();
                }
                if (routes["area"] != null)
                {
                    areaName = routes["area"].ToString();
                }
                if (IsPage && _httpContextAccessor.HttpContext.Request.Method == "GET")
                {
                    string localize = settingValuesList[SettingKeys.Localization];
                    culture = settingValuesList[SettingKeys.DefaultCulture];
                    bool.TryParse(localize, out localizedEnabled);
                    if (paramList?.Length > 0)
                    {
                        try
                        {
                            string[] param = paramList.Split('/');

                            int paramLen = param.Length;
                            if (LocalizationEnabled)
                            {

                                if (paramLen > 0)
                                {
                                    culture = param[0];
                                    param = param.Skip(1).ToArray();
                                    paramList = string.Join("/", param);

                                }
                            }


                            queryParameters = param;
                            queryParamString = paramList;
                        }
                        catch
                        {
                            ActionMessage("Routing value not supported", MessageType.Error);
                        }
                    }
                    _coreHelper.SetCookie(_httpContextAccessor, CookiesKey.LocalizedEnabled, localize);
                    _coreHelper.SetCookie(_httpContextAccessor, CookiesKey.CurrentCulture, culture);
                }
                else
                {
                    if (paramList?.Length > 0)
                    {
                        queryParameters = paramList.Split("/").ToArray();
                        queryParamString = paramList;
                    }
                    bool.TryParse(_coreHelper.GetCookieValue(_httpContextAccessor, CookiesKey.LocalizedEnabled), out localizedEnabled);
                    culture = _coreHelper.GetCookieValue(_httpContextAccessor, CookiesKey.CurrentCulture);
                }
            }
        }
        private void RegisterJSGlobalVariable()
        {
            try
            {
                StringBuilder clientScript = new StringBuilder();
                clientScript.Append("var SageFrameAppPath='");
                clientScript.Append(string.Empty);
                clientScript.Append("';");
                clientScript.Append("var SageFramePortalID='");
                clientScript.Append(0);
                clientScript.Append("';");
                clientScript.Append(" var SageFrameCurrentCulture='");
                clientScript.Append(GetCurrentCulture);
                clientScript.Append("';");
                clientScript.Append(" var CultureURL='");
                clientScript.Append(CultureURL);
                clientScript.Append("';");
                clientScript.Append(" var SageFrameHostURL='");
                clientScript.Append(HostUrl);
                clientScript.Append("';");
                clientScript.Append(" var GetSiteID='");
                clientScript.Append(GetSiteID);
                clientScript.Append("';");
                clientScript.Append(" var SageFrameSecureToken='");
                clientScript.Append(SageFrameSecureToken);
                clientScript.Append("';");
                clientScript.Append(" var SitePublicKey='");
                clientScript.Append(Common.ClientID);
                clientScript.Append("';");
                clientScript.Append(" var QueryParams='");
                if (QueryParamString == null)
                    clientScript.Append(string.Empty);
                else
                    clientScript.Append(QueryParamString?.Length == 0 ? string.Empty : "/" + QueryParamString);
                clientScript.Append("';");
                clientScript.Append(" var JSON2 = JSON;");
                AppendHttpContextItem(HttpContextKey.JSVariable, clientScript.ToString());
            }
            catch { }
        }

        public void JSVariablesFromAction(string variable, string value)
        {
            string jsvariable = string.Format(" var {0} = '{1}';", variable, value);
            AppendHttpContextItem(HttpContextKey.JSVariable, jsvariable);
        }
        public void JSVariablesFromAction(Dictionary<string, string> variables)
        {
            StringBuilder clientScript = new StringBuilder();
            foreach (KeyValuePair<string, string> keyValue in variables)
            {
                clientScript.AppendFormat(" var {0} = '{1}';", keyValue.Key, keyValue.Value);
            }
            AppendHttpContextItem(HttpContextKey.JSVariable, clientScript.ToString());
        }
     
        #endregion

        #region "Public Methods"

        /// <summary>
        /// Logs the exception 
        /// </summary>
        /// <param name="ex">Exception object</param>
        /// <param name="urlPath"></param>
        public void ProcessException(Exception ex)
        {
            try
            {
                _httpContextAccessor.ProcessException(ex, "");
            }
            catch (Exception exception)
            {
                _httpContextAccessor.ProcessExceptionsToFile(exception);
            }
        }
        /// <summary>
        /// Stores and process the message of a context. 
        /// Note: The latest messsge ass
        /// </summary>
        /// <param name="message"></param>
        /// <param name="type"></param>
        public void ActionMessage(string message, MessageType type)
        {
            TempData["ActionMessage"] = message;
            TempData["ActionMessageType"] = type.ToString();
        }
        public void ShowModelStateErorr()
        {
            IEnumerable<ModelError> modelErrors = ModelState.Values.SelectMany(v => v.Errors);
            string msg = string.Join(" ", modelErrors.Select(e => e.ErrorMessage));
            ActionMessage(msg, MessageType.Error);
        }
        public string GetModelStateErorr()
        {
            IEnumerable<ModelError> modelErrors = ModelState.Values.SelectMany(v => v.Errors);
            string msg = string.Join(" ", modelErrors.Select(e => e.ErrorMessage));
            return msg;
        }
        //public IdentityAPIInvoker IdentityAPIInvoker(string baseEndpoint)
        //{
        //    return new IdentityAPIInvoker(baseEndpoint, HttpContext);
        //}
        /// <summary>
        /// Adds JS to the current httpcontext for bundling and minifying
        /// </summary>
        /// <param name="name">unique name of the js</param>
        /// <param name="filePath">Js file path which is inside wwwroot folder. Eg: "/js/foldername/index.js"</param>
        public void AddJS(string name, string filePath)
        {
            AddJS(_httpContextAccessor, name, filePath);
        }
        /// <summary>
        ///  Adds JS to the httpcontext passed for bundling and minifying.
        /// </summary>
        /// <param name="httpContext">httpcontext where the  js to be added.</param>
        /// <param name="name">unique name of the js</param>
        /// <param name="filePath">Js file path which is inside wwwroot folder. Eg: "/js/foldername/index.js"</param>
        public void AddJS(IHttpContextAccessor httpContextAccessor, string name, string filePath)
        {
            _coreHelper.AddJS(httpContextAccessor, name, filePath);
        }
        public void AddJS(IHttpContextAccessor httpContextAccessor, AssetLocation assetLocation)
        {
            _coreHelper.AddJS(httpContextAccessor, assetLocation);
        }
        public void AddJS(AssetLocation assetLocation)
        {
            _coreHelper.AddJS(_httpContextAccessor, assetLocation);
        }
        /// <summary>
        /// Adds CSS to the current httpcontext for bundling and minifying
        /// </summary>
        /// <param name="name">Unique name of the css file.</param>
        /// <param name="filePath">CSS file path which is inside wwwroot folder. Eg: "/css/foldername/index.css."</param>
        public void AddCSS(string name, string filePath)
        {
            _coreHelper.AddCSS(_httpContextAccessor, name, filePath);
        }
        /// <summary>
        ///  Adds CSS to the current httpcontext for bundling and minifying
        /// </summary>
        /// <param name="httpContext">httpcontext where the  css to be added.</param>
        /// <param name="name">unique name of the css.</param>
        /// <param name="filePath">CSS file path which is inside wwwroot folder. Eg: "/js/foldername/index.js."</param>
        public void AddCSS(IHttpContextAccessor httpContextAccessor, AssetLocation assetLocation)
        {
            _coreHelper.AddCSS(httpContextAccessor, assetLocation);
        }
        public void AddCSS(IHttpContextAccessor httpContextAccessor, string name, string filePath)
        {
            _coreHelper.AddCSS(httpContextAccessor, name, filePath);
        }
        public void AddCSS(AssetLocation assetLocation)
        {
            _coreHelper.AddJS(_httpContextAccessor, assetLocation);
        }

        public void SetLayout(string layout)
        {
            SetLayout(layout, _httpContextAccessor);
        }
        public void SetLayout(string layout, IHttpContextAccessor httpContextAccessor)
        {
            _coreHelper.SetHttpContextItem(HttpContextKey.layoutName, layout, httpContextAccessor);
        }

        public void SetUserArea(string userArea)
        {
            SetUserArea(userArea, _httpContextAccessor);
        }
        public void SetUserArea(string userArea, IHttpContextAccessor httpContextAccessor)
        {
            _coreHelper.SetHttpContextItem(HttpContextKey.UserArea, userArea, httpContextAccessor);
        }

        public void SetApplication(string name)
        {
            SetApplication(name, _httpContextAccessor);
        }
        public void SetApplication(string name, IHttpContextAccessor httpContextAccessor)
        {
            _coreHelper.SetHttpContextItem(HttpContextKey.Application, name, httpContextAccessor);
        }
        public void AppendHttpContextItem(string key, string value)
        {
            _coreHelper.AppendHttpContextItem(key, value, _httpContextAccessor);
        }

        /// <summary>
        /// returns the localized value of  from a file path
        /// </summary>
        /// <param name="hostingEnvironment"></param>
        /// <param name="filePath">filepath : eg Dashboard/Role/roleindex where  dashboard and role are folder name and roldeindex is prefix of filename </param>
        /// <returns>Returns a collection of  keys values</returns>
        public async Task<Dictionary<string, string>> LocalizeData(IWebHostEnvironment hostingEnvironment, string filePath)
        {
            return await Localize(Path.Combine(CurrentHostEnvironment.WebRootPath, filePath));
        }
        /// <summary>
        /// Localize your messaging and display field properties of class 
        /// </summary>
        /// <typeparam name="T">ClassName having messaging and UI element text properties</typeparam>
        /// <param name="filePath"></param>
        public async Task<T> Localize<T>(string filePath)
        {
            filePath = Path.Combine(CurrentHostEnvironment.WebRootPath, filePath);
            filePath.WriteLOG();
            string filelocation = string.Format("{0}.{1}.json", filePath, GetCurrentCulture);
            if (System.IO.File.Exists(filelocation))
                return JsonSerializer.Deserialize<T>(await ReadJSONFile(filelocation));
            else
            {
                filelocation = string.Format("{0}.{1}.json", filePath, "en-us");
                if (System.IO.File.Exists(filelocation))
                    return JsonSerializer.Deserialize<T>(await ReadJSONFile(filelocation));
            }
            return default(T);
        }
        public async Task<string> ReadJSONFile(string filelocation)
        {
            string json = string.Empty;
            using (StreamReader reader = System.IO.File.OpenText(filelocation))
            {
                json = await reader.ReadToEndAsync();
            }
            return json;
        }
        /// <summary>
        /// returns the localized value of  from a file path
        /// </summary>
        /// <param name="filePath">filepath : eg Dashboard/Role/roleindex where  dashboard and role are folder name and roldeindex is prefix of filename </param>
        /// <returns>Returns a collection of  keys values</returns>
        public async Task<Dictionary<string, string>> LocalizeData(string filePath)
        {
            //return await Localize(string.Format("{0}/{1}", CurrentHostEnvironment.WebRootPath, filePath));
            return await Localize(Path.Combine(CurrentHostEnvironment.WebRootPath, filePath));
        }
        /// <summary>
        /// /// returns the localized value of  from a file path
        /// </summary>
        /// <param name="filePath">filepath : eg Dashboard/Role/roleindex where  dashboard and role are folder name and roldeindex is prefix of filename </param>
        /// <returns>Returns a collection of  keys values</returns>
        private async Task<Dictionary<string, string>> Localize(string fullfilePath)
        {
            string filelocation = string.Format("{0}.{1}.json", fullfilePath, GetCurrentCulture);
            Dictionary<string, string> localizeValue = new Dictionary<string, string>();
            if (System.IO.File.Exists(filelocation))
                localizeValue = await JsonFileToDictionary(filelocation);
            else
            {
                filelocation = string.Format("{0}.{1}.json", fullfilePath, settingValuesList[SettingKeys.DefaultCulture]);
                if (System.IO.File.Exists(filelocation))
                    localizeValue = await JsonFileToDictionary(filelocation);
            }
            return localizeValue;
        }

        /// <summary>
        /// Reads json file and converts that into  a collection of  keys values
        /// </summary>
        /// <param name="filelocation"></param>
        /// <returns>Returns a collection of  keys values</returns>
        public async Task<Dictionary<string, string>> JsonFileToDictionary(string filelocation)
        {
            return JsonSerializer.Deserialize<Dictionary<string, string>>(await ReadJSONFile(filelocation));
        }

        /// <summary>
        /// /// returns the localized value of  from a file path
        /// </summary>
        /// <param name="filePath">filepath : eg Dashboard/Role/roleindex where  dashboard and role are folder name and roldeindex is prefix of filename </param>
        /// <returns>Returns a json string for localize values</returns>
        public async Task<JObject> LocalizeJson(string filePath)
        {
            filePath = Path.Combine(CurrentHostEnvironment.WebRootPath, filePath);
            string filelocation = string.Format("{0}.{1}.json", filePath, GetCurrentCulture);
            string localizeValue = string.Empty;
            if (System.IO.File.Exists(filelocation))
                localizeValue = await ReadJSONFile(filelocation);
            else
            {
                filelocation = string.Format("{0}.{1}.json", filePath, settingValuesList[SettingKeys.DefaultCulture]);
                if (System.IO.File.Exists(filelocation))
                    localizeValue = await ReadJSONFile(filelocation);
            }
            return JObject.Parse(localizeValue);
        }
        #endregion

        #region "Public Readonly properties"

        /// <summary>
        /// Returns the user's access token
        /// </summary>
        public string UserAccessToken
        {
            get
            {
                return User.FindFirst(ConstantString.AccessToken)?.Value;
            }
        }
        /// <summary>
        /// Returns the user's userID
        /// </summary>
        public string UserID
        {
            get
            {
                return User.FindFirst(ConstantString.UserID)?.Value;
            }
        }
        /// <summary>
        /// Returns the user's GUID
        /// </summary>
        public Guid UserGUID
        {
            get
            {
                Guid.TryParse(User.FindFirst(ConstantString.UserID)?.Value, out Guid userID);
                return userID;
            }
        }
        /// <summary>
        /// Returns the user's current role
        /// </summary>
        public string UsersRoles
        {
            get
            {
                return User.FindFirst(ClaimTypes.Role)?.Value;
            }
        }

        /// <summary>
        /// Returns the current hosted url, Example "www.contentder.com"
        /// </summary>
        public string HostUrl
        {
            get
            {
                return hostUrl;
            }
        }
        /// <summary>
        /// Returns currenst siteID
        /// </summary>
        public virtual int GetSiteID
        {
            get
            {
                return 0;
            }
        }
        /// <summary>
        /// Returns the user name using the system
        /// </summary>
        public string GetUsername
        {
            get
            {
                return User?.Identity?.Name;
            }
        }
        public string SageFrameSecureToken
        {
            get
            {
                //string authToken = string.Empty;
                //SecurityPolicy objSecurity = new SecurityPolicy();
                //authToken = objSecurity.FormsCookieName(GetPortalID);
                //return authToken;
                return "";
            }
        }
        public string GetCurrentRoleIDs
        {
            get
            {
                string UserRoles = string.Empty;
                //if (HttpContext.Current.Session[SessionKeys.SageUserRoles] != null)
                //    UserRoles = HttpContext.Current.Session[SessionKeys.SageUserRoles].ToString();
                return UserRoles;
            }
        }
        /// <summary>
        /// Returns the current  pagename
        /// </summary>
        public string PageName
        {
            get
            {
                return pageName;
            }
        }
        /// <summary>
        /// Retuns the query parameters as it is in url
        /// </summary>
        public string QueryParamString
        {
            get
            {
                return queryParamString;
            }
        }
        /// <summary>
        /// Returns the queryparameters in array
        /// </summary>
        public string[] QueryParameters
        {
            get
            {
                return queryParameters;
            }
        }
        /// <summary>
        /// Returns the current culture of the system
        /// </summary>
        public string GetCurrentCulture
        {
            get
            {
                return culture;
            }
        }
        /// <summary>
        /// Returns the current culture along with  "/" for Url concat purpose
        /// </summary>
        public string CultureURL
        {
            get
            {
                return LocalizationEnabled ? Constant.FS + culture : string.Empty;
            }
        }

        /// <summary>
        /// Returns true if localization is on 
        /// </summary>
        public bool LocalizationEnabled
        {
            get
            {
                return localizedEnabled;
            }
        }
        public string ActionName
        {
            get
            {
                return actionName;
            }
        }
        public string AreaName
        {
            get
            {
                return areaName;
            }
        }

        public ReuseableParams GetReuseableParams(IMemoryCache _memoryCache)
        {
            return new ReuseableParams
            {
                UserName = GetUsername,
                HostURL = HostUrl,
                SiteID = GetSiteID,
                CurrentRoleIDs = UsersRoles,
                UrlParameters = QueryParameters,
                Culture = GetCurrentCulture,
                HttpContextAccessor = _httpContextAccessor,
                MemoryCache = _memoryCache
            };
        }
        #endregion
    }
}