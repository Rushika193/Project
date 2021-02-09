using Cbuilder.Core.ViewComponents;
using Cbuilder.DashboardMenu;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Cbuilder.Webbuilder;
using Cbuilder.Core.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Cbuilder.Core.Constants;
using Microsoft.Extensions.Caching.Memory;
using Cbuilder.Core.Helper;
using System.IO;
using Cbuilder.Core.Helper.Models;
using System.Drawing;

namespace Cbuilder.ViewComponents
{
    public class NavbarViewComponent : CommonViewComponent
    {
        private readonly IMemoryCache _memoryCache;
        public NavbarViewComponent(IHttpContextAccessor accessor, IMemoryCache memoryCache) : base(accessor)
        {
            _memoryCache = memoryCache;
        }
        public async Task<IViewComponentResult> InvokeAsync()
        {
            string imageURL = HttpContextCommons.HostURL + "/images/logos/dashboard/Contentder.jpg";
            string dashboardImageFolder = Path.Combine(CurrentHostEnvironment.WebRootPath, "images", "logos", "dashboard");

            if (Directory.Exists(dashboardImageFolder) && Directory.GetFiles(dashboardImageFolder).Length > 0)
            {
                string imagePath = Directory.GetFiles(dashboardImageFolder)[0];
                imagePath = imagePath.Replace(CurrentHostEnvironment.WebRootPath, string.Empty).Replace("\\", "/");
                imageURL = HttpContextCommons.HostURL + imagePath;
            }

            if (HttpContextCommons.LocalizationEnabled)
            {
                WebBuilderController webBuilderController = new WebBuilderController();
                ViewBag.Languages = await webBuilderController.GetLanguageLists(SiteID);
                SettingHelper settingHelper = new SettingHelper(_memoryCache);
                ViewBag.DefaultLanguage = settingHelper.GetCachedSettingValue(SettingKeys.CultureLanguage);
            }
            ViewBag.DropdownURL = HostUrl + "/dashboard/" + PageName + "/" + ActionName + "/";
            ViewBag.ImageURL = imageURL;
            return await Task.FromResult((IViewComponentResult)View("Default"));
        }
    }
}
