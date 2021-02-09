using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cbuilder.Block;
using Cbuilder.Block.Entities;
using Cbuilder.Core.API.Models;
using Cbuilder.Core.Controllers;
using Cbuilder.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace cbuilder.Areas.Dashboard.Controllers
{
    [Area("Dashboard")]
    public class DashboardController : AdminController
    {
        public DashboardController(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {

        }
        public async Task<IActionResult> Index()
        {
            BlockController blockController = new BlockController();
            var model = await blockController.GetLayoutElement(PageName, GetSiteID);
            return View(model);
        }
        [HttpGet]
        public async Task<IActionResult> Layout(string PageName = "dashboard")
        {
            string test = HostUrl;
            AddJS("DashboardPageLayoutJs", "/layout/DashboardLayout.js");
            AddCSS("DashboardPageLayoutCss", "/layout/DashboardLayout.css");
          
            ViewData["PageName"] = PageName;
            BlockController blockController = new BlockController();

            var model = await blockController.GetLayoutElement(PageName, GetSiteID);
            model.AvailableModules = await blockController.GetAvailableModule();
            return View(model);
        }
        [HttpGet]
        public IActionResult RenderModule(string module, string type, string param)
        {
            ViewModule model = new ViewModule()
            {
                InvokeName = module,
                ModuleType = type,
                InvokeParam = param,
            };
            return View(model);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Layout([FromBody] DashboardLayout layout)
        {
            BlockController con = new BlockController();
            layout.SiteID = GetSiteID;
            await con.SaveLayout(layout);
            return new ObjectResult(new OperationStatus() { IsSuccess = true, Message = "Layout Save Successfully." });
        }
    }
}