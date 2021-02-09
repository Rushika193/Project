using Cbuilder.Core.Localization;
using Cbuilder.Core.ViewComponents;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cbuilder.ViewComponents
{
    public class LanguageViewComponent : CommonViewComponent
    {
        public LanguageViewComponent(IHttpContextAccessor accessor) : base(accessor)
        {

        }

        public async Task<IViewComponentResult> InvokeAsync(string controlID, string extraClass)
        {

            // AddJS("DashboardMenu", "/admin/js/dashboardMenu.js");
            ViewBag.ControlID = controlID;
            ViewBag.ExtraClass = extraClass;
            IList<LanguageMiniInfo> objLanguages = await GetLanguages();
            return await Task.FromResult((IViewComponentResult)View("Default", objLanguages));
            //return View();
        }

        public async Task<IList<LanguageMiniInfo>> GetLanguages()
        {
            LocalizationManager manager = new LocalizationManager();
            IList<LanguageMiniInfo> langauges = await manager.GetLanguageForViewComponent();
            return langauges;
        }
    }
}
