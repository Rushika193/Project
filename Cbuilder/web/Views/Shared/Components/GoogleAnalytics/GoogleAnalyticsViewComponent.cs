using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using Cbuilder.Assets;
using Cbuilder.Core.Bundle;
using Cbuilder.Core.Constants;
using Cbuilder.Core.Helper;
using Cbuilder.Core.ViewComponents;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Hosting;

namespace Cbuilder.ViewComponents
{
    public class GoogleAnalyticsViewComponent : CommonViewComponent
    {
        public readonly IMemoryCache _memoryCache;
        public GoogleAnalyticsViewComponent(IHttpContextAccessor httpContextAccessor, IMemoryCache memoryCache) : base(httpContextAccessor)
        {
            _memoryCache = memoryCache;
        }
        public async Task<IViewComponentResult> InvokeAsync()
        {
            SettingHelper settingHelper = new SettingHelper(_memoryCache);
            string code = await settingHelper.GetCachedSettingValueAsync(SettingKeys.GoogleAnalyticsCode);
            code = HttpUtility.HtmlDecode(code);
            ViewData["GoogleAnalytics"] = code;
            return View();
        }
    }
}
