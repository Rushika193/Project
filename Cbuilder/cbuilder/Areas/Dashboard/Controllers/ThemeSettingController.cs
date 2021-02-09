using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cbuilder.Core.Controllers;
using Cbuilder.Theme;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Cbuilder.Core.Bundle;
using Microsoft.AspNetCore.Hosting;

namespace Cbuilder.Areas.Dashboard.Controllers
{
    [Area("Dashboard")]
    [AutoValidateAntiforgeryToken]
    public class ThemeSettingController : AdminController
    {
        IWebHostEnvironment _hostingEnvironment;
        public ThemeSettingController(IHttpContextAccessor httpContextAccessor, IWebHostEnvironment hostingEnvironment) : base(httpContextAccessor)
        {
            _hostingEnvironment = hostingEnvironment;
        }


        [HttpGet]
        public ActionResult Index()
        {

            AddJS("TinyColorPicker", "/cbuilderassets/js/corejs/edit-2-tinyColorPicker.js");
            AddJS("ColorPicker", "/cbuilderassets/js/corejs/edit-2-colors.js");
            AddJS("UIComponent", "/admin/js/UIComponents.js");
            AddJS("ThemeSettings", "/admin/js/themesettings.js");
            //AddJS("ColorPicker", "/lib/js/colorpicker.js");
            //AddCSS("ColorPicker", "/lib/css/colorpicker.css");


            string themeCSSPath = System.IO.Path.Combine(_hostingEnvironment.WebRootPath, "admin", "css", "theme.css");
            string cssText = System.IO.File.ReadAllText(themeCSSPath);

            CssParser parser = new CssParser();
            List<CssParserRule> rules = parser.ParseAll(cssText).ToList();

            ThemeManagement themeManagement = new ThemeManagement();
            List<MainComponentSettings> lstComponents = themeManagement.MapRulesToComponent(rules);

            List<MainComponentSettings> lstOtherComponents = lstComponents.FindAll(x => !x.IsPredefinedThemeSelector);

            List<MainComponentSettings> lstButtonComponents = lstComponents.FindAll(x => Array.IndexOf(PredefinedCSS.buttonSelectors, x.Rules.FirstOrDefault().Selectors.FirstOrDefault()) > -1);
            List<MainComponentSettings> lstTextColorComponents = lstComponents.FindAll(x => Array.IndexOf(PredefinedCSS.textColorSelectors, x.Rules.FirstOrDefault().Selectors.FirstOrDefault()) > -1);
            List<MainComponentSettings> lstLinkComponents = lstComponents.FindAll(x => Array.IndexOf(PredefinedCSS.linkSelectors, x.Rules.FirstOrDefault().Selectors.FirstOrDefault()) > -1);
            List<MainComponentSettings> lstBackgroundComponents = lstComponents.FindAll(x => Array.IndexOf(PredefinedCSS.backgroundSelectors, x.Rules.FirstOrDefault().Selectors.FirstOrDefault()) > -1);
            List<MainComponentSettings> lstPillComponents = lstComponents.FindAll(x => Array.IndexOf(PredefinedCSS.pillsSelectors, x.Rules.FirstOrDefault().Selectors.FirstOrDefault()) > -1);
            List<MainComponentSettings> lstCapsuleComponents = lstComponents.FindAll(x => Array.IndexOf(PredefinedCSS.capsuleSelectors, x.Rules.FirstOrDefault().Selectors.FirstOrDefault()) > -1);
            List<MainComponentSettings> lstAlertBoxComponents = lstComponents.FindAll(x => Array.IndexOf(PredefinedCSS.alertBoxSelectors, x.Rules.FirstOrDefault().Selectors.FirstOrDefault()) > -1);
            List<MainComponentSettings> lstBadgeComponents = lstComponents.FindAll(x => Array.IndexOf(PredefinedCSS.badgeSelectors, x.Rules.FirstOrDefault().Selectors.FirstOrDefault()) > -1);


            ThemeSettingsViewModel themeSettingsViewModel = new ThemeSettingsViewModel();
            themeSettingsViewModel.OtherComponents = lstOtherComponents;
            themeSettingsViewModel.ButtonComponents = lstButtonComponents;
            themeSettingsViewModel.TextColorComponents = lstTextColorComponents;
            themeSettingsViewModel.LinkComponents = lstLinkComponents;
            themeSettingsViewModel.BackgroundComponents = lstBackgroundComponents;
            themeSettingsViewModel.PillComponents = lstPillComponents;
            themeSettingsViewModel.AlertBoxComponents = lstAlertBoxComponents;
            themeSettingsViewModel.BadgeComponents = lstBadgeComponents;

            return View(themeSettingsViewModel);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public int SaveThemeSettings([FromBody]List<CSSRuleInfo> lstRules)
        {

            string themeCSSPath = System.IO.Path.Combine(_hostingEnvironment.WebRootPath, "admin", "css", "theme.css");

            ThemeManagement themeManagement = new ThemeManagement();
            return themeManagement.SaveCSSFile(lstRules, themeCSSPath);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public int ResetThemeSettings()
        {
            string backupCSSPath = System.IO.Path.Combine(_hostingEnvironment.WebRootPath, "admin", "css", "theme_reset.css");
            string themeCSSPath = System.IO.Path.Combine(_hostingEnvironment.WebRootPath, "admin", "css", "theme.css"); ;

            ThemeManagement themeManagement = new ThemeManagement();
            return themeManagement.ResetThemeSettings(backupCSSPath, themeCSSPath);


        }




    }
}
