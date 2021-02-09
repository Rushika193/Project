using Cbuilder.Core;
using Cbuilder.Core.API.Models;
using Cbuilder.Core.Bundle;
using Cbuilder.Core.Constants;
using Cbuilder.Core.Controllers;
using Cbuilder.Core.Helper;
using Cbuilder.Core.Helper.Models;
using Cbuilder.Core.Pages;
using Cbuilder.Webbuilder;
using Cbuilder.Webbuilder.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Cbuilder.WebBuilder;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.AspNetCore.Authorization;
using Cbuilder.Core.Permissions.Filters;
using Cbuilder.Core.Helper.Helper;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Hosting;

namespace Web.Controllers
{
    [Authorize]
    [TypeFilter(typeof(AuthorizedAdmin))]
    public class BuilderController : CommonController
    {
        #region "Private variable declaration"
        private readonly bool isUnderConstruction = false;
        CbuilderView cbuilderView;
        readonly CommonCbuilder commonCbuilder;
        ReuseableParams objReuseableParams = new ReuseableParams();
        Dictionary<string, string> settingValues = new Dictionary<string, string>();
        private readonly IHostApplicationLifetime _appLifetime;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private string underConstruction = "Under Construction";
        private const string cbuilderAssestPath = "/cbuilderassets/";
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMemoryCache _memoryCache;
        #endregion
        public BuilderController(IHttpContextAccessor httpContextAccessor, IMemoryCache memoryCache, IHostApplicationLifetime appLifetime, IWebHostEnvironment webHostEnvironment) : base(httpContextAccessor)
        {
            httpContextAccessor.HttpContext.Items[HttpContextKey.UserArea] = UserArea.Editor;
            httpContextAccessor.HttpContext.Items[HttpContextKey.layoutName] = CbuilderLayout.Cbuilder;
            cbuilderView = new CbuilderView();
            commonCbuilder = new CommonCbuilder();
            _httpContextAccessor = httpContextAccessor;
            _memoryCache = memoryCache;
            _appLifetime = appLifetime;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {

            objReuseableParams = GetReuseableParams(_memoryCache);
            cbuilderView = await LoadData();
            AssignSettings();
            cbuilderView.TempPageName = PageName;
            await LoadPages(cbuilderView.PageList, cbuilderView.DashboardPages);
            InitData();
            cbuilderView.IsDevelopmentMode = CurrentHostEnvironment.IsDevelopment;
            await CombineFiles();
            cbuilderView.Applicationname = string.Empty;
            cbuilderView.EnableHeader = "true";
            //cbuilderView.TempPageName = "webbuildertemppagename";
            cbuilderView.Version = string.Empty;
            cbuilderView.Webbuildermodulepath = "/modules/webbuilder";
            cbuilderView.HostURL = HostUrl;
            cbuilderView.ParamString = QueryParamString;
            cbuilderView.Culture = GetCurrentCulture;
            cbuilderView.CultureURL = CultureURL;
            cbuilderView.CultureLanguage = settingValues[SettingKeys.CultureLanguage];
            LoadAssets();
            return View(cbuilderView);
        }

        void AssignSettings()
        {
            SettingHelper settingHelper = new SettingHelper();
            settingValues = settingHelper.GetSettingValuesByKeys(string.Format("{0},{1},{2},{3},{4},{5}",
                SettingKeys.OnlineStore,
                SettingKeys.DigiSphereApi,
                SettingKeys.ComponentVersion,
                SettingKeys.DefaultPage,
                SettingKeys.EditorTheme,
                SettingKeys.CultureLanguage
                ));
            cbuilderView.OnlineStoreURL = settingValues[SettingKeys.OnlineStore];
            cbuilderView.DigiSphereApi = settingValues[SettingKeys.DigiSphereApi];
            //PortalAPI portalAPI = new PortalAPI(_IHttpContextAccessor);
            cbuilderView.PortalDefaultPage = settingValues[SettingKeys.DefaultPage]; //portalAPI.DefaultPageURL;
            cbuilderView.DarkMode = settingValues[SettingKeys.EditorTheme] == "skin__dark" ? "checked=\"checked\"" : string.Empty;
            ViewBag.EditorTheme = settingValues[SettingKeys.EditorTheme];
        }

        public void InitData()
        {
            #region "Set default variables"
            underConstruction = "Under Construction";
            cbuilderView.UnderConstruction = cbuilderView.PortalDefaultPage.ToLower() == underConstruction.ToLower();
            #endregion
            if (cbuilderView.EnableHeader == "true")
                CheckPageName();
        }

        void LoadAssets()
        {
            if (CurrentHostEnvironment.IsDevelopment)
            {
                AddJS(new AssetLocation() { FileName = "extensionjs", FilePath = cbuilderAssestPath + "js/extensions.js", Position = AssetPosition.FooterBottom });
            }
            AddJS("packagesjs", cbuilderAssestPath + "js/packages.js");
        }
        private void CheckPageName()
        {
            cbuilderView.TempPageName = PageName;
            if (PageName == null || PageName?.Length == 0)
            {
                //Response.Redirect(HostUrl + "/Webbuilder" + cbuilderView.PortalDefaultPage);
            }
        }

        #region "Js combine"
        public async Task CombineFiles()
        {
            try
            {
                Task combineJs = commonCbuilder.CombineWebbuilderLibrary("edit*.js", "webbuilderEdit.js");
                Task combinePackagejs = CombinePackagesJs();
                Task combinejs = CombineComponentFiles();
                await Task.WhenAll(combineJs, combinePackagejs, combinejs);
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }
        }



        /// <summary>
        /// Combines multiple js files from application packages and create a single packages.js file
        /// </summary>
        public async Task CombinePackagesJs()
        {
            try
            {
                string packageDirLocation = Path.Combine(CurrentHostEnvironment.WebRootPath, FolderName.ContentderPackages);
                string packagejsPath = Path.Combine(CurrentHostEnvironment.WebRootPath, FolderName.CbuilderAssets, FolderName.JS, "packages.js");
                if (CurrentHostEnvironment.IsDevelopment)
                {
                    await commonCbuilder.CombineFiles(packageDirLocation, packagejsPath);
                }
                else if (!System.IO.File.Exists(packagejsPath) || new FileInfo(packagejsPath).Length == 0)
                {
                    await commonCbuilder.CombineFiles(packageDirLocation, packagejsPath);
                }
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }
        }

        /// <summary>
        /// Combines multiple js files and create a single extension.js file
        /// </summary>
        public async Task CombineComponentFiles()
        {
            if (CurrentHostEnvironment.IsDevelopment)
            {
                try
                {
                    string extensionPath = CurrentHostEnvironment.WebRootPath + cbuilderAssestPath + "js/extensions.js";
                    string fullpath = CurrentHostEnvironment.WebRootPath + cbuilderAssestPath + "js/extensions";

                    if (Directory.Exists(fullpath))
                    {
                        List<string> files = new List<string>();
                        files.AddRange(Directory.GetFiles(fullpath, "*.js"));
                        string[] packagesDir = Directory.GetDirectories(fullpath);
                        foreach (string pacDir in packagesDir)
                        {
                            files.AddRange(Directory.GetFiles(pacDir, "*.js"));
                        }
                        if (files.Count > 0)
                        {
                            System.IO.File.WriteAllText(extensionPath, String.Empty);
                            await using StreamWriter writeToFile = new StreamWriter(System.IO.File.Open(extensionPath, FileMode.OpenOrCreate));
                            writeToFile.WriteLine("var extendedComps = {");
                            foreach (var file in files)
                            {
                                using StreamReader readFrom = new StreamReader(file);
                                while (!readFrom.EndOfStream)
                                {
                                    string line = await readFrom.ReadLineAsync();
                                    if (!line.StartsWith("var") && !line.StartsWith("}"))
                                    {
                                        writeToFile.WriteLine(line);
                                    }
                                }
                                writeToFile.Write(',');
                            }
                            await writeToFile.WriteLineAsync("}");

                        }
                    }
                }
                catch (Exception ex)
                {
                    ProcessException(ex);
                }
            }
        }

        #endregion

        public async Task<CbuilderView> LoadData()
        {
            WebBuilderController objWebController = new WebBuilderController(_memoryCache);
            WebBuilderInfo objWebInfo = new WebBuilderInfo
            {
                Culture = GetCurrentCulture,
                PageName = PageName,
                SiteID = GetSiteID
            };
            return await objWebController.GetEditDOMByID(objWebInfo, objReuseableParams, LocalizationEnabled);
        }
        public async Task LoadPages(IList<WebBuilderPages> objPageList, IList<WebBuilderPages> objDashboardPageList)
        {
            //list all the pages here
            (string pageDOM, bool exists) = await commonCbuilder.BindPages(objPageList, HostUrl, cbuilderView.TempPageName);
            cbuilderView.PagesDOM = pageDOM;
            bool pageNotExists = exists;
            //if (pageNotExists && cbuilderView.TempPageName.ToLower() != "under construction" && cbuilderView.TempPageName.ToLower() != "unsubscribe" && cbuilderView.TempPageName.ToLower() != "searchresult")
            //    Response.Redirect(HostUrl + "/Webbuilder" + cbuilderView.PortalDefaultPage);
            (pageDOM, exists) = await commonCbuilder.BindPages(objDashboardPageList, HostUrl, cbuilderView.TempPageName);
            cbuilderView.DashboardPagesDOM = pageDOM;
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<int> AddUpdate([FromBody] WebBuilderInfo objWebBuilderInfo)
        {
            WebBuilderController webBuilderController = new WebBuilderController(_memoryCache);
            objWebBuilderInfo.UserName = GetUsername;
            return await webBuilderController.AddUpdate(objWebBuilderInfo, CurrentHostEnvironment.WebRootPath);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<int> AddUpdatePublish([FromBody] WebBuilderInfo objWebBuilderInfo)
        {
            WebBuilderController webBuilderController = new WebBuilderController(_memoryCache);
            objWebBuilderInfo.UserName = GetUsername;
            return await webBuilderController.AddUpdatePublished(objWebBuilderInfo, CurrentHostEnvironment.WebRootPath);

        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<OperationStatus> Savepage([FromBody] WebbuilderPage webbuilderPage)
        {
            OperationStatus operationStatus = new OperationStatus();
            string pageid = string.Empty;
            if (ModelState.IsValid)
            {
                WebBuilderController webBuilderController = new WebBuilderController(_memoryCache);
                int pageExists = await webBuilderController.CheckPage(webbuilderPage.PageName, webbuilderPage.PageID, GetSiteID);
                switch (pageExists)
                {
                    case -1:
                        operationStatus.StatusCode = Cbuilder.Core.API.Enum.StatusCode.DuplicateItem;
                        operationStatus.Message = "PageName already exists";
                        operationStatus.Result = new string[] { "0", webbuilderPage.WebBuilderID.ToString() };
                        break
                            ;
                    case -2:
                        operationStatus.StatusCode = Cbuilder.Core.API.Enum.StatusCode.Unauthorized;
                        operationStatus.Message = "This page is system reserve page";
                        operationStatus.Result = new string[] { "0", webbuilderPage.WebBuilderID.ToString() };
                        break;
                    case 0:
                        pageid = await CreatePage(webbuilderPage);
                        Guid.TryParse(pageid, out Guid _pageid);
                        if (webbuilderPage.PageID == _pageid)
                        {
                            int rowseffected = await webBuilderController.UpdatePageName(webbuilderPage.PageName, webbuilderPage.WebBuilderID, webbuilderPage.CloneWebBuilderID, webbuilderPage.Culture);
                            operationStatus.StatusCode = Cbuilder.Core.API.Enum.StatusCode.Updated;
                            operationStatus.Result = new string[] { webbuilderPage.PageID.ToString(), webbuilderPage.WebBuilderID.ToString() };
                        }
                        if (webbuilderPage.Mode == "A")
                        {
                            WebBuilderInfo webBuilderInfo = new WebBuilderInfo
                            {
                                CloneWebBuilderID = webbuilderPage.CloneWebBuilderID,
                                PageComponent = webbuilderPage.PageComponent,
                                HeaderFooterComponent = webbuilderPage.HeaderFooterComponent,
                                PageName = webbuilderPage.PageName,
                                Culture = webbuilderPage.Culture
                            };
                            int webBuilderID = await webBuilderController.AddUpdate(webBuilderInfo, CurrentHostEnvironment.WebRootPath);
                            operationStatus.StatusCode = Cbuilder.Core.API.Enum.StatusCode.Created;
                            operationStatus.Result = new string[] { _pageid.ToString(), webBuilderID.ToString() };
                        }
                        break;
                    default:
                        break;
                }


                //SEOController seocontroller = new SEOController();
                //seocontroller.SaveSEOMetaTag(pageID, objTagValue, portalID, userName);


                //WebBuilderController webBuilderController = new WebBuilderController(_memoryCache);
                //objWebBuilderInfo.UserName = GetUsername;
                //objWebBuilderInfo.Extra = "";
            }
            return operationStatus;
        }

        private async Task<string> CreatePage(WebbuilderPage webbuilderPage)
        {
            //OperationStatus operationStatus = new OperationStatus();

            Guid pageid_;
            if (webbuilderPage.Mode == "A")
                pageid_ = Guid.Empty;
            else
                pageid_ = webbuilderPage.PageID;
            PortalPage portalPage = new PortalPage()
            {
                PageID = pageid_,
                Title = webbuilderPage.Title,
                PageName = webbuilderPage.PageName,
                KeyWords = webbuilderPage.KeyWords,
                Description = webbuilderPage.Description,
                IsActive = true
            };
            List<PageRolePermission> RolePermissions = new List<PageRolePermission>();
            RolePermissions.Add(new PageRolePermission()
            {
                RoleName = "admin",
                SelectedPageActions = "EC55BF7A-D977-4198-9BDF-12B6FA7AD4F7"
            });
            RolePermissions.Add(new PageRolePermission()
            {
                RoleName = "Super Admin",
                SelectedPageActions = "EC55BF7A-D977-4198-9BDF-12B6FA7AD4F7"
            });
            PageController pageController = new PageController();
            string pageid = await pageController.AddUpdatePages(portalPage, RolePermissions, HostUrl, GetSiteID, GetUsername);
            return pageid;
        }
        private void UpdatePageName(string pageName, int portalID, int userModuleID, int webbuilderID, int cloneWebBuilderID, string culture)
        {

        }

        [HttpPost]
        public async Task<int> UpdateComponents([FromBody]BuilderComponent builderComponent)
        {
            WebBuilderController objController = new WebBuilderController(_memoryCache);
            return await objController.UpdateComponents(builderComponent);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public object DownloadComponent([FromBody] BuilderComponent objBuilComponent)
        {
            SettingHelper settingHelper = new SettingHelper(_memoryCache);
            string version = settingHelper.GetCachedSettingValue(SettingKeys.Cbuilderversion);
            WebBuilderController cont = new WebBuilderController(_memoryCache);
            var resultobj = cont.InstallComponent(objBuilComponent.ComponentID, objBuilComponent.DownloadType, objBuilComponent.Version, GetUsername, objBuilComponent.SecureToken, version);
            WBCachehelper wBCachehelper = new WBCachehelper(_appLifetime);
            wBCachehelper.RemoveAllCachedFile(_webHostEnvironment);
            wBCachehelper.RecycleApplicationPool();
            return resultobj;
        }
        //[HttpGet]
        //public async Task UpdateComponents(string componentNames)
        //{
        //    string extensionjsFile = CurrentHostEnvironment.WebRootPath + cbuilderAssestPath + "js/extensions.js";
        //    byte[] result;

        //    using (FileStream SourceStream = System.IO.File.Open(extensionjsFile, FileMode.Open))
        //    {
        //        result = new byte[SourceStream.Length];
        //        await SourceStream.ReadAsync(result, 0, (int)SourceStream.Length);
        //    }
        //    string components = System.Text.Encoding.ASCII.GetString(result).Trim();
        //    components = components.Replace("var extendedComps = {", string.Empty);
        //    components = components.Remove(components.Length - 1);

        //    Dictionary<string, string> componentsList = JsonSerializer.Deserialize<Dictionary<string, string>>(components);
        //    string[] componenttoUpdate = new string[] { "text" };
        //    if (componentsList != null)
        //    {
        //        for (int i = 0, length = componenttoUpdate.Length; i < length; i++)
        //        {
        //            if (componentsList.ContainsKey(componenttoUpdate[i]))
        //            {
        //                string component = componentsList[componenttoUpdate[i]];
        //                //Component objComponent = JsonSerializer.Deserialize<Component>(component);
        //                object objComponent = JsonSerializer.Deserialize<object>(component);

        //            }
        //        }
        //    }
        //}

        #region "Pages"
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<int> DeletePages([FromBody] DeletePage deletePage)
        {
            WebBuilderController cont = new WebBuilderController(_memoryCache);
            return await cont.DeletePage(deletePage);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<PageDetail> GetPageDetails([FromBody] Guid pageID)
        {
            WebBuilderController cont = new WebBuilderController(_memoryCache);
            return await cont.GetPageDetails(pageID);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<int> SetDefaultPage([FromBody] WebBuilderInfo webBuilderInfo)
        {
            try
            {
                SettingKeyValue settingKeyValue = new SettingKeyValue
                {
                    Key = SettingKeys.DefaultPage,
                    Value = webBuilderInfo.PageName
                };

                _ = await UpdateSettings(settingKeyValue);
                SettingHelper settingHelper = new SettingHelper();
                settingHelper.UpdateCachedSettingValue(settingKeyValue.Key, settingKeyValue.Value);
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return 0;
            }
            return 1;
        }

        //this must be reachable and common to all

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<int> UpdateSettings([FromBody] SettingKeyValue settingKeyValue)
        {
            try
            {
                SettingHelper settingHelper = new SettingHelper();
                await settingHelper.SettingValueUpdate(settingKeyValue.Key, settingKeyValue.Value); settingHelper.UpdateCachedSettingValue(settingKeyValue.Key, settingKeyValue.Value);
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return 0;
            }
            return 1;
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<int> EnableHeadFoot([FromBody] HeaderFooter headerFooter)
        {
            try
            {
                WebBuilderController webBuilderController = new WebBuilderController(_memoryCache);
                return await webBuilderController.EnableHeadFoot(headerFooter);
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return 0;
            }
        }
        #endregion

        [HttpGet]
        public async Task FontAwesomeClasses()
        {
            if (CurrentHostEnvironment.IsDevelopment)
            {
                string cssFilePath = Path.Combine(CurrentHostEnvironment.WebRootPath, "lib", "css", "font-awesome.min.css");
                string jsFilePath = CurrentHostEnvironment.WebRootPath + cbuilderAssestPath + Path.Combine("js", "corejs", "edit--1-fontclass-view.js");
                if (System.IO.File.Exists(cssFilePath))
                    await new FontHelper().SaveFontClass(cssFilePath, jsFilePath);
                else
                    throw new FileNotFoundException("font-awesome css not available at: " + cssFilePath);
            }
        }

        #region "Design Prediction"

        [HttpPost]
        [ValidateAntiForgeryToken]
        public object GetDesignList([FromBody] DesignParam designParam)
        {
            //SettingHelper settingHelper = new SettingHelper(_memoryCache);
            //string version = settingHelper.GetCachedSettingValue(SettingKeys.Cbuilderversion);
            WebBuilderController objController = new WebBuilderController(_memoryCache);
            return objController.GetDesignList(designParam.Param);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public object ApplyDesign([FromBody] DesignParam designParam)
        {
            //SettingHelper settingHelper = new SettingHelper(_memoryCache);
            //string version = settingHelper.GetCachedSettingValue(SettingKeys.Cbuilderversion);
            WebBuilderController objController = new WebBuilderController(_memoryCache);
            return objController.ApplyDesign(designParam.Param);
        }
        #endregion

        #region Api Call
        private static string secureToken = "12345456abcd";

        [HttpPost]
        [ValidateAntiForgeryToken]
        public object GetPurchasedComponents([FromBody]OnlineApiInfo onlineApiInfo)
        {
            SettingHelper settingHelper = new SettingHelper(_memoryCache);
            string version = settingHelper.GetCachedSettingValue(SettingKeys.Cbuilderversion);
            WebBuilderController objController = new WebBuilderController(_memoryCache);
            return objController.GetPurchasedComponents(onlineApiInfo.Offset, onlineApiInfo.Limit, onlineApiInfo.SearchText, onlineApiInfo.Type, onlineApiInfo.Category, onlineApiInfo.ApplicationName, secureToken, GetUsername, version);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public object GetInstalledComponents([FromBody] OnlineApiInfo onlineApiInfo)
        {
            SettingHelper settingHelper = new SettingHelper(_memoryCache);
            string version = settingHelper.GetCachedSettingValue(SettingKeys.Cbuilderversion);
            WebBuilderController objController = new WebBuilderController(_memoryCache);
            return objController.GetInstalledComponents(onlineApiInfo.Offset, onlineApiInfo.Limit, onlineApiInfo.SearchText, onlineApiInfo.Type, onlineApiInfo.Category, onlineApiInfo.ApplicationName, secureToken, GetUsername, version);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public object GetPurchasedSites([FromBody] OnlineApiInfo onlineApiInfo)
        {
            SettingHelper settingHelper = new SettingHelper(_memoryCache);
            string version = settingHelper.GetCachedSettingValue(SettingKeys.Cbuilderversion);
            WebBuilderController objController = new WebBuilderController(_memoryCache);
            return objController.GetPurchasedSites(onlineApiInfo.Offset, onlineApiInfo.Limit, onlineApiInfo.ThemeName, onlineApiInfo.SectorID, onlineApiInfo.SiteCategoryID, onlineApiInfo.BusinessTypeID, onlineApiInfo.ApplicationName, secureToken, GetUsername, version);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public object GetInstalledSites([FromBody] OnlineApiInfo onlineApiInfo)
        {
            SettingHelper settingHelper = new SettingHelper(_memoryCache);
            string version = settingHelper.GetCachedSettingValue(SettingKeys.Cbuilderversion);
            WebBuilderController objController = new WebBuilderController(_memoryCache);
            return objController.GetInstalledSites(onlineApiInfo.Offset, onlineApiInfo.Limit, onlineApiInfo.ThemeName, onlineApiInfo.SectorID, onlineApiInfo.SiteCategoryID, onlineApiInfo.BusinessTypeID, onlineApiInfo.ApplicationName, secureToken, GetUsername, version);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public object GetOnlineComponentsByVersion([FromBody] OnlineApiInfo onlineApiInfo)
        {
            SettingHelper settingHelper = new SettingHelper(_memoryCache);
            string configCode = settingHelper.GetCachedSettingValue(SettingKeys.Cbuilderversion);
            WebBuilderController objController = new WebBuilderController(_memoryCache);
            return objController.GetOnlineComponents(onlineApiInfo.Offset, onlineApiInfo.Limit, onlineApiInfo.SearchText, onlineApiInfo.Type, onlineApiInfo.Category, onlineApiInfo.ApplicationName, secureToken, GetUsername, configCode);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public object GetComponentTemplate([FromBody] OnlineApiInfo onlineApiInfo)
        {
            WebBuilderController objController = new WebBuilderController(_memoryCache);
            return objController.GetComponentTemplate(onlineApiInfo.ComponentName, onlineApiInfo.Offset, onlineApiInfo.Limit, onlineApiInfo.SearchText, onlineApiInfo.TagIDs, secureToken, GetUsername);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public object GetCompTemplateTags([FromBody] OnlineApiInfo onlineApiInfo)
        {
            WebBuilderController objController = new WebBuilderController(_memoryCache);
            return objController.GetCompTemplateTags(onlineApiInfo.ComponentName, secureToken, GetUsername);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public object GetRowOnlineComponents([FromBody] OnlineApiInfo onlineApiInfo)
        {
            SettingHelper settingHelper = new SettingHelper(_memoryCache);
            string version = settingHelper.GetCachedSettingValue(SettingKeys.Cbuilderversion);
            WebBuilderController objController = new WebBuilderController(_memoryCache);
            return objController.GetRowOnlineComponents(onlineApiInfo.Offset, onlineApiInfo.Limit, onlineApiInfo.SearchText, onlineApiInfo.Type, onlineApiInfo.Category, onlineApiInfo.ApplicationName, secureToken, GetUsername, version);

        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public object OnlineCompoSearchFilters([FromBody] OnlineApiInfo onlineApiInfo)
        {
            WebBuilderController objController = new WebBuilderController(_memoryCache);
            return objController.OnlineCompoSearchFilters(secureToken, GetUsername);

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public object GetOnlineSites([FromBody] OnlineApiInfo onlineApiInfo)
        {
            SettingHelper settingHelper = new SettingHelper(_memoryCache);
            string version = settingHelper.GetCachedSettingValue(SettingKeys.Cbuilderversion);
            WebBuilderController objController = new WebBuilderController(_memoryCache);
            return objController.GetOnlineSites(onlineApiInfo.Offset, onlineApiInfo.Limit, onlineApiInfo.ThemeName, onlineApiInfo.SectorID, onlineApiInfo.SiteCategoryID, onlineApiInfo.BusinessTypeID, onlineApiInfo.ApplicationName, secureToken, GetUsername, version);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public object GetOnlineThemeFile([FromBody] ThemeDetail themeDetail)
        {
            SettingHelper settingHelper = new SettingHelper(_memoryCache);
            string version = settingHelper.GetCachedSettingValue(SettingKeys.Cbuilderversion);
            WebBuilderController objController = new WebBuilderController(_memoryCache);
            object returnVaue = objController.GetOnlineTheme(themeDetail.ThemeID, GetUsername, secureToken, version);
            WBCachehelper wBCachehelper = new WBCachehelper(_appLifetime);
            wBCachehelper.RemoveAllCachedFile(_webHostEnvironment);
            wBCachehelper.RecycleApplicationPool();
            return returnVaue;

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public object FeedBackFromClient([FromBody] FeedbackDetails objFeedback)
        {
            WebBuilderController objController = new WebBuilderController(_memoryCache);
            return objController.FeedBackFromClient(objFeedback, objFeedback.SecureToken, GetUsername);
        }
        #endregion

    }
}