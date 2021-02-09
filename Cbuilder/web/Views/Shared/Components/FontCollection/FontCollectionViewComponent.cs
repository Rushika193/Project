using Cbuilder.Core.Helper.Models;
using Cbuilder.Core.ViewComponents;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Cbuilder.ViewComponents
{
    public class FontCollectionViewComponent : CommonViewComponent
    {
        [Parameter]
        public string SearchText { get; set; } = "";

        public FontCollectionViewComponent(IHttpContextAccessor accessor) : base(accessor)
        {

        }

        public async Task<IViewComponentResult> InvokeAsync(string controlID = "", string extraClass = "")
        {

            // AddJS("DashboardMenu", "/admin/js/dashboardMenu.js");
            ViewBag.ControlID = controlID;
            ViewBag.ExtraClass = extraClass;
            IList<string> fontList = GetFonList();
            return await Task.FromResult((IViewComponentResult)View("Default", fontList));
            //return View();
        }

        private void CheckChanged()
        {

        }

        private IList<string> GetFonList()
        {
            MatchCollection matches = GetFontMatchesList();
            int len = matches.Count;

            IList<string> fonts = new List<string>();
            for (int i = 0; i < len; i++)
            {
                string fontClass = matches[i].ToString().Replace(":before", string.Empty);

                fonts.Add(fontClass);
            }
            return fonts;
        }

        public MatchCollection GetFontMatchesList()
        {
            string cssFilePath = CurrentHostEnvironment.WebRootPath + "/lib/css/font-awesome.min.css";
            string fontAwesome = System.IO.File.ReadAllText(cssFilePath);
            string value = ("fa(-[a-z]{1,20}){0,1}(-[a-z]{1,20}){0,1}(-[a-z]{0,20}){0,1}:before");
            return Regex.Matches(fontAwesome, value);
        }
    }
}
