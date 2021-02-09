using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Cbuilder.Core.Constants;
using Cbuilder.Core.Constants.Enum;
using Cbuilder.Core.Controllers;
using Cbuilder.Core.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace Cbuilder.Areas.Dashboard.Controllers
{
    [Area("Dashboard")]
    public class GoogleAnalyticsController : AdminController
    {
        public readonly IMemoryCache _memoryCache;
        public GoogleAnalyticsController(IHttpContextAccessor httpContextAccessor, IMemoryCache memoryCache) : base(httpContextAccessor)
        {
            _memoryCache = memoryCache;
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            SettingHelper settingHelper = new SettingHelper(_memoryCache);
            string code = await settingHelper.GetCachedSettingValueAsync(SettingKeys.GoogleAnalyticsCode);
            code = HttpUtility.HtmlDecode(code);
            SettingKeyValue settingKeyValue = new SettingKeyValue()
            {
                Key = SettingKeys.GoogleAnalyticsCode,
                Value = code
            };
            return View(settingKeyValue);
        }

        [HttpPost]
        public async Task<IActionResult> Index(SettingKeyValue settingKeyValue)
        {
            settingKeyValue.Value = HttpUtility.HtmlEncode(settingKeyValue.Value);
            SettingHelper settingHelper = new SettingHelper(_memoryCache);
            await settingHelper.SettingValueUpdate(SettingKeys.GoogleAnalyticsCode, settingKeyValue.Value);
            await Task.Run(() =>
            {
                return settingHelper.UpdateCachedSettingValue(SettingKeys.GoogleAnalyticsCode, settingKeyValue.Value);
            });
            settingKeyValue.Key = SettingKeys.GoogleAnalyticsCode;
            ActionMessage("Google analytic code updated Succesfully", MessageType.Success);
            return View(settingKeyValue);
        }
    }
}