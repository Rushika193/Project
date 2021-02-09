using Cbuilder.Core.Constants;
using Cbuilder.Core.Controllers;
using Cbuilder.Core.Helper;
using Cbuilder.Core.Helper.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;

namespace Cbuilder.Webbuilder.Helper
{
    public class CbuilderViewHelper : FrontController
    {
        public static string anonymousUser = "anonymoususer";
        public bool DevelopmentMode { get; set; }
        public Dictionary<string, string> settingValues = new Dictionary<string, string>();

        public string PageName_ { get; set; } = string.Empty;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMemoryCache _memoryCache;
        public CbuilderViewHelper(IHttpContextAccessor httpContextAccessor, IMemoryCache memoryCache) : base(httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _memoryCache = memoryCache;
            AssignSettings();
            //objReuseableParams = GetReuseableParams(_memoryCache);
            PageName_ = PageName;
            string defaultPageName = settingValues?[SettingKeys.DefaultPage].ToString();
            if (string.IsNullOrEmpty(PageName))
            {
                PageName_ = defaultPageName;
            }
        }

        private async Task GetComponent(bool isPublished)
        {
            string compoFileName = (isPublished ? "components_pub_" + PageName_.ToLower() : "components_" + PageName_.ToLower()) + ".js";
            string compoFilePath = Path.Combine(FolderName.CbuilderAssets, "js", "PageComponent", compoFileName);
            string compoFileAbsPath = Path.Combine(CurrentHostEnvironment.WebRootPath, compoFilePath);
            if (!System.IO.File.Exists(compoFileAbsPath) || CurrentHostEnvironment.IsDevelopment)
            {
                WebBuilderController objWebbuilderController = new WebBuilderController();
                var objComponentList = await objWebbuilderController.GetComponentViewValue(PageName_, isPublished, GetSiteID);
                string componentList = JsonSerializer.Serialize(objComponentList);
                await SaveComponentToJS("var storedComponent=" + componentList + ";", compoFileAbsPath);
            }
            string componentversion = settingValues?[SettingKeys.ComponentVersion];
            AddJS("webbuilderPagecomponentJs", compoFilePath.Replace("\\", "/") + "?v=" + componentversion);
        }
        private async Task SaveComponentToJS(string components, string componentPath)
        {
            try
            {
                if (!Directory.Exists(Path.GetDirectoryName(componentPath)))
                    Directory.CreateDirectory(Path.GetDirectoryName(componentPath));
                await using var streamWriter = new StreamWriter(componentPath);
                await streamWriter.WriteAsync(components);
            }
            catch (Exception ex)
            {
                ProcessException(ex);
            }
        }
        private async Task CombinePackagejs()
        {
            CommonCbuilder commonCbuilder = new CommonCbuilder();
            string packageDirLocation = Path.Combine(CurrentHostEnvironment.WebRootPath, FolderName.ContentderPackages);
            string packagejsPath = Path.Combine(CurrentHostEnvironment.WebRootPath, FolderName.CbuilderAssets, FolderName.JS, "packages.js");
            if (!System.IO.File.Exists(packagejsPath))
                await commonCbuilder.CombineFiles(packageDirLocation, packagejsPath);
        }

        public async Task<WebbuilderViewInfo> ShowData(bool isPreview)
        {

            WebBuilderController objWebController = new WebBuilderController();
            WebbuilderViewGetInfo webbuilderViewGetInfo = new WebbuilderViewGetInfo()
            {
                Culture = GetCurrentCulture,
                PageName = PageName_,
                PreviewMode = isPreview
            };
            ReuseableParams objReuseableParams = GetReuseableParams(_memoryCache);
            WebbuilderViewInfo webbuilderViewInfo = await objWebController.GetPageViewDOM(webbuilderViewGetInfo, objReuseableParams, GetSiteID);
            if (webbuilderViewInfo != null)
            {
                webbuilderViewInfo.PageName = PageName_;
                webbuilderViewInfo.HostURL = HostUrl;
                webbuilderViewInfo.PreviewMode = isPreview;
                CommonCbuilder commonCbuilder = new CommonCbuilder();
                Task loadComponents = GetComponent(!isPreview);
                Task loadpackages = CombinePackagejs();
                Task loadlibraries = commonCbuilder.CombineWebbuilderLibrary("*-view.js", "webbuilderView.js");
                await Task.WhenAll(loadComponents, loadpackages, loadlibraries);
            }
            AddJS("packagesjs", FolderName.CbuilderAssets + "/js/packages.js");
            return webbuilderViewInfo;
        }
        private void AssignSettings()
        {
            SettingHelper settingHelper = new SettingHelper();
            settingValues = settingHelper.GetSettingValuesByKeys(string.Format("{0},{1},{2},{3}",
                SettingKeys.ComponentVersion,
                SettingKeys.DigiSphereApi,
                SettingKeys.ComponentVersion,
                SettingKeys.DefaultPage));
        }
    }
}
