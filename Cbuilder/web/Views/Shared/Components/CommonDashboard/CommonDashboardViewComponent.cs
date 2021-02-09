using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
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
    public class CommonDashboardViewComponent : CommonViewComponent
    {
        private readonly IMemoryCache _memoryCache;
        public CommonDashboardViewComponent(IHttpContextAccessor httpContextAccessor, IMemoryCache memoryCache) : base(httpContextAccessor)
        {
            _memoryCache = memoryCache;
        }
        public async Task<IViewComponentResult> InvokeAsync()
        {
            SettingHelper settingHelper = new SettingHelper(_memoryCache);
            bool adminSidebarCollapse = settingHelper.GetCachedSettingBoolValue(SettingKeys.AdminSidebar);
            TempData["sidebarCollapse"] = adminSidebarCollapse ? "is-open" : string.Empty;
            return await Task.FromResult<IViewComponentResult>(Content(string.Empty));
        }
    }
}
