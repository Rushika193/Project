using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Cbuilder.Assets;
using Cbuilder.Core;
using Cbuilder.Core.Bundle;
using Cbuilder.Core.Constants;
using Cbuilder.Core.ViewComponents;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Cbuilder.Core.Helper;

namespace Cbuilder.ViewComponents
{
    public class BundleViewComponent : CommonViewComponent
    {
        private IWebHostEnvironment _env;
        string jsExtension = ".js";
        string cssExtension = ".css";
        private readonly IMemoryCache _cache;
        private ExcessModes excessMode;
        string _hostURL = string.Empty;

        public BundleViewComponent(IWebHostEnvironment env, IMemoryCache memoryCache, IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
            _env = env;
            _cache = memoryCache;
            excessMode = _env.IsProduction() ? ExcessModes.live : ExcessModes.local;
            _hostURL = HostUrl;
        }
        public string UsersRoles
        {
            get
            {
                var user = this.HttpContext.User;
                string role = user.FindFirst(ClaimTypes.Role)?.Value.ToLower();
                if (string.IsNullOrEmpty(role))
                    role = "none";
                return role;
            }
        }
        public async Task<IViewComponentResult> InvokeAsync()
        {
            if (Application != null)
                await MinifyAssets(PageName);
            return await Task.FromResult<IViewComponentResult>(Content(string.Empty));
        }

        private async Task MinifyAssets(string pageName)
        {
            string role = UsersRoles;
            SettingHelper settingHelper = new SettingHelper(_cache);
            string fileName = role.Replace(" ", "_") + "_" + pageName;
            string headerCSS = "css_" + fileName;
            string headerJS = "jsHeader_" + fileName;
            string footerJS = "jsFooter_" + fileName;
            string rootPath = _env.WebRootPath;
            string cssLink = string.Empty;
            string jsScriptHeader = string.Empty;
            string jsScriptFooter = string.Empty;
            bool optimizeAssets = settingHelper.GetCachedSettingBoolValue(SettingKeys.OptimizeAssets);
            if (optimizeAssets)
            {
                string optimizecssFilePath = ShorternPath(Path.Combine(FolderName.Optimize, headerCSS + cssExtension));
                string optimizeJsTopFilePath = ShorternPath(Path.Combine(FolderName.Optimize, headerJS + jsExtension));
                string optimizeJsFilePath = ShorternPath(Path.Combine(FolderName.Optimize, footerJS + jsExtension));
                BundleController bundleController = new BundleController();
                if (File.Exists(Path.Combine(_env.WebRootPath, optimizecssFilePath)))
                {
                    AssetCollection assetCollection = await bundleController.GetAssetCollection(pageName, role);
                    cssLink = assetCollection.CssLink;
                    jsScriptHeader = assetCollection.JSHeaderLink;
                    jsScriptFooter = assetCollection.JSFooterLink;

                }
                else
                {
                    if (excessMode == ExcessModes.local)
                    {
                        DeleteFile(optimizecssFilePath);
                        DeleteFile(optimizeJsTopFilePath);
                        DeleteFile(optimizeJsFilePath);
                    }
                    if (!Directory.Exists(Path.Combine(rootPath, FolderName.Optimize)))
                        Directory.CreateDirectory(Path.Combine(rootPath, FolderName.Optimize));
                    AssetResult assetResult = await GetFileList(pageName, role);
                    Task<bool> bundlejsTop = BundleAsset(optimizeJsTopFilePath, assetResult.JSHeader, AssetType.Js);
                    Task<bool> bundlejsFooterTop = BundleAsset(optimizeJsFilePath, assetResult.JSFooter, AssetType.Js);
                    Task<bool> bundleCss = BundleAsset(optimizecssFilePath, assetResult.CSS, AssetType.Css);
                    await Task.WhenAll(bundlejsTop, bundlejsFooterTop, bundleCss);
                    jsScriptHeader = assetResult.JsHeaderCDN;
                    jsScriptHeader += string.Format("<script  src='{0}'></script>", _hostURL + "/" + optimizeJsTopFilePath.Replace("\\", "/"));
                    jsScriptFooter = assetResult.JsFooterTopCDN;
                    jsScriptFooter += string.Format("<script  src='{0}'></script>", _hostURL + "/" + optimizeJsFilePath.Replace("\\", "/"));
                    jsScriptFooter += assetResult.JsFooterBottomCDN;
                    cssLink = assetResult.CssCDN;
                    cssLink += string.Format("<link href='{0}' rel='stylesheet' type='text/css' />", _hostURL + "/" + optimizecssFilePath.Replace("\\", "/"));

                    AssetCollection assetCollection = new AssetCollection()
                    {
                        PageName = pageName,
                        RoleName = role,
                        CssLink = cssLink,
                        JSHeaderLink = jsScriptHeader,
                        JSFooterLink = jsScriptFooter,
                        Name = string.Empty
                    };
                    await bundleController.SaveAssetCollection(assetCollection);
                }
            }
            else
            {
                AssetResult assetCollection = await GetFileList(pageName, role);
                jsScriptHeader = assetCollection.JsHeaderCDN + CombineLinks(assetCollection.JSHeader, AssetType.Js);
                jsScriptFooter = assetCollection.JsFooterTopCDN + CombineLinks(assetCollection.JSFooter, AssetType.Js) + assetCollection.JsFooterBottomCDN;
                cssLink = assetCollection.CssCDN + CombineLinks(assetCollection.CSS, AssetType.Css);
            }
            TempData["cssHeader"] = cssLink;
            TempData["jsHeader"] = jsScriptHeader;
            TempData["jsFooter"] = jsScriptFooter;
        }

        private async Task<AssetResult> GetFileList(string pageName, string role)
        {
            List<string> jsFilePaths = new List<string>();
            List<string> cssFilePaths = new List<string>();
            List<BundleAsset> objLocatedAssets = new List<BundleAsset>();
            //get all the items from the httpContext
            IDictionary<object, object> items = HttpContext.Items;
            foreach (KeyValuePair<object, object> item in items)
            {
                if (item.Key.ToString().Contains("_jsPlacement"))
                {
                    AssetLocation assetLocation = (AssetLocation)item.Value;
                    objLocatedAssets.Add(new BundleAsset()
                    {
                        Position = assetLocation.Position,
                        AssetType = AssetType.Js,
                        IsExternal = false,
                        FilePath = assetLocation.FilePath
                    });
                }
                else if (item.Key.ToString().Contains("_cssPlacement"))
                {
                    AssetLocation assetLocation = (AssetLocation)item.Value;
                    objLocatedAssets.Add(new BundleAsset()
                    {
                        Position = assetLocation.Position,
                        AssetType = AssetType.Css,
                        IsExternal = false,
                        FilePath = assetLocation.FilePath
                    });
                }
                else if (item.Key.ToString().Contains("_js"))
                {
                    string url = item.Value.ToString();
                    if (!jsFilePaths.Contains(url))
                    {
                        jsFilePaths.Add(url);
                    }
                }
                else if (item.Key.ToString().Contains("_css"))
                {
                    string url = item.Value.ToString();
                    if (!cssFilePaths.Contains(url))
                    {
                        cssFilePaths.Add(url);
                    }
                }
            }

            List<BundleAsset> objBundleList = (List<BundleAsset>)await AssestsList(pageName, role);
            objBundleList.AddRange(objLocatedAssets);

            string cssCDN = string.Empty;
            string jsHeaderCDN = string.Empty;
            string jsFooterTopCDN = string.Empty;
            string jsFooterBottomCDN = string.Empty;
            List<string> cssTop = new List<string>();
            List<string> cssBottom = new List<string>();
            List<string> jsHeader = new List<string>();
            List<string> jsHeaderBottom = new List<string>();
            List<string> jsFooterTop = new List<string>();
            List<string> jsFooterBottom = new List<string>();
            foreach (BundleAsset bundle in objBundleList)
            {
                if (bundle.AssetType == AssetType.Css)
                {
                    if (bundle.IsExternal)
                    {
                        cssCDN += string.Format("<link href='{0}' rel='stylesheet' type='text/css' />", bundle.FilePath);
                    }
                    else
                    {
                        switch (bundle.Position)
                        {
                            case AssetPosition.HeaderTop:
                                cssTop.Add(bundle.FilePath);
                                break;
                            case AssetPosition.HeaderBottom:
                                cssBottom.Add(bundle.FilePath);
                                break;
                        }
                    }
                }
                else
                {
                    if (bundle.IsExternal)
                    {
                        string link = string.Format("<script   src='{0}'></script>", bundle.FilePath);
                        switch (bundle.Position)
                        {
                            case AssetPosition.Header:
                                jsHeaderCDN += link;
                                break;
                            case AssetPosition.FooterTop:
                                jsFooterTopCDN += link;
                                break;
                            case AssetPosition.FooterBottom:
                                jsFooterBottomCDN += link;
                                break;
                        }
                    }
                    else
                    {
                        switch (bundle.Position)
                        {
                            case AssetPosition.Header:
                                jsHeader.Add(bundle.FilePath);
                                break;
                            case AssetPosition.HeaderBottom:
                                jsHeaderBottom.Add(bundle.FilePath);
                                break;
                            case AssetPosition.FooterTop:
                                jsFooterTop.Add(bundle.FilePath);
                                break;
                            case AssetPosition.FooterBottom:
                                jsFooterBottom.Add(bundle.FilePath);
                                break;
                        }
                    }
                }
            }
            cssTop.AddRange(cssFilePaths);
            cssTop.AddRange(cssBottom);
            jsHeader.AddRange(jsHeaderBottom);
            jsFooterTop.AddRange(jsFilePaths);
            jsFooterTop.AddRange(jsFooterBottom);

            AssetResult assetCollection = new AssetResult()
            {
                CSS = cssTop,
                JSHeader = jsHeader,
                JSFooter = jsFooterTop,
                CssCDN = cssCDN,
                JsHeaderCDN = jsHeaderCDN,
                JsFooterTopCDN = jsFooterTopCDN,
                JsFooterBottomCDN = jsFooterBottomCDN
            };
            return assetCollection;
        }

        private async Task<bool> BundleAsset(string destinationFilePath, List<string> files, string assetType)
        {
            bool noError = false;
            try
            {
                StringBuilder text = new StringBuilder();
                foreach (string srcFileName in files)
                {
                    string file = Path.Combine(_env.WebRootPath, srcFileName.TrimStart('/'));
                    if (file.Contains("?"))
                        file = file.Split("?")[0];
                    if (File.Exists(file))
                    {
                        text.AppendFormat("/*-----{0}----*/\n", srcFileName);
                        string fileValue = string.Empty;
                        using (StreamReader srcStream = File.OpenText(file))
                        {
                            fileValue = await srcStream.ReadToEndAsync();
                        }
                        if (assetType == AssetType.Css)
                            fileValue = CssMinifierHelper.RewriteCssImagePath(fileValue, Path.GetDirectoryName(srcFileName), string.Empty, "/images");
                        text.Append(fileValue);
                        text.Append("\n");
                    }
                }
                await using (StreamWriter destStream = new StreamWriter(Path.Combine(_env.WebRootPath, destinationFilePath)))
                {
                    if (assetType == AssetType.Css)
                    {
                        await destStream.WriteAsync(CssMinifierHelper.ImportTextCombine(text.ToString()));
                    }
                    else
                        await destStream.WriteAsync(text);
                }
                noError = true;
            }
            catch (Exception)
            {
                throw;
            }
            return noError;
        }

        private string CombineLinks(List<string> files, string assetType)
        {
            StringBuilder links = new StringBuilder();
            try
            {
                foreach (string srcFileName in files)
                {
                    if (assetType == AssetType.Css)
                        links.AppendFormat("<link href='{0}' rel='stylesheet' type='text/css' />", _hostURL + "/" + srcFileName.TrimStart('/'));
                    else
                        links.AppendFormat("<script  src='{0}'></script>", _hostURL + "/" + srcFileName.TrimStart('/'));
                }
            }
            catch (Exception)
            {
                throw;
            }
            return links.ToString();
        }

        private string ShorternPath(string path)
        {
            return path.Replace(" ", "").Replace(",", "");
        }
        private void DeleteFile(string filePath)
        {
            if (File.Exists(Path.Combine(_env.WebRootPath, filePath)))
            {
                File.Delete(Path.Combine(_env.WebRootPath, filePath));
            }
        }

        private async Task<IList<BundleAsset>> AssestsList(string pageName, string role)
        {
            BundleAsset bundleAsset = new BundleAsset();
            bundleAsset.Roles = role;
            bundleAsset.ExcessMode = excessMode;
            bundleAsset.Application = Application;
            bundleAsset.UserArea = UserArea;
            bundleAsset.PageName = pageName;
            AssestController assestController = new AssestController();
            IList<BundleAsset> bundleAssets = await assestController.GetAssets(bundleAsset);
            return bundleAssets;
        }
    }
}
