using System.Threading.Tasks;
using Cbuilder.Core.Helper.Extensions;
using Cbuilder.Webbuilder;
using Cbuilder.Webbuilder.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Hosting;
using Microsoft.Web.Administration;

namespace Web.Controllers
{
    /// <summary>
    /// cbuilderDynamic page default controller
    /// </summary>
    public class CbuilderDynamicPageController : CbuilderViewHelper
    {
        public CbuilderDynamicPageController(IHttpContextAccessor httpContextAccessor, IMemoryCache memoryCache) : base(httpContextAccessor, memoryCache)
        {

        }

        /// <summary>
        ///  cbuilderDynamic page default action
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> Index()
        {
            WebbuilderViewInfo webbuilderViewInfo = await ShowData(false);
            if (webbuilderViewInfo != null)
                return View(webbuilderViewInfo);
            else
                return View("PageNotFound");
        }
    }
}