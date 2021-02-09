using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cbuilder.Core.Helper.Interfaces;
using Cbuilder.Webbuilder;
using Cbuilder.Webbuilder.Helper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace web.Controllers
{
    public class WebbuilderpreviewController : CbuilderViewHelper
    {
        public WebbuilderpreviewController(IHttpContextAccessor httpContextAccessor, IMemoryCache memoryCache) : base(httpContextAccessor, memoryCache)
        {

        }
        public async Task<IActionResult> Index()
        {
            WebbuilderViewInfo webbuilderViewInfo = await ShowData(true);
            if (webbuilderViewInfo != null)
                return View("~/Views/CbuilderDynamicPage/Index.cshtml", webbuilderViewInfo);
            else
                return View("~/Views/CbuilderDynamicPage/PageNotFound.cshtml");
        }
    }
}