
using Cbuilder.Core.Constants;
using Cbuilder.Core.SEO;
using Cbuilder.Core.ViewComponents;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Cbuilder.Areas.Dashboard.Views.Shared.Components.Checkboxlist
{
    public class SEOMetaViewComponent : CommonViewComponent
    {
        public SEOMetaViewComponent(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }
        public async Task<IViewComponentResult> InvokeAsync()
        {
            string MetaTag = this.HttpContext?.Items[HttpContextKey.SEOMeta]?.ToString();
            if (string.IsNullOrEmpty(MetaTag))
            {
                SEOController seoController = new SEOController();
                MetaTag = await seoController.GetSEOMetaValuesByPageName(PageName, SiteID);
            }
            ViewData["SEOMeta"] = MetaTag;
            return View();
        }
    }
}
