using Cbuilder.Core.API.Models;
using Cbuilder.Core.Constants.Enum;
using Cbuilder.Core.Controllers;
using Cbuilder.Core.Pages;
using Cbuilder.Core.Permissions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cbuilder.Areas.Dashboard.Controllers
{
    [Area("Dashboard")]
    public class PagesController: AdminController
    {
        public PagesController(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
            //  GetAllVM();
        }

        [HttpGet]
        public async Task<IActionResult> Index(string areaName = "", string keyword = "", int offset = 0, int limit = 10)
        {
            if (areaName == null)
                areaName = string.Empty;
            if (keyword == null)
                keyword = string.Empty;
            
            AddJS("Pagination", "/js/pagination.js");
            ViewBag.AreaList = await GetAreaList();
            PageController pageAction = new PageController();
            IList<AdminPage> pageList = await pageAction.GetAdminPages(areaName, keyword, offset, limit);
            ViewData["Keyword"] = keyword;
            ViewData["AreaName"] = areaName;
            return View(pageList);
        }


        [HttpGet]
        public async Task<IActionResult> ManagePortalPage(string keyword = "", int offset = 0, int limit = 10)
        {           
            if (keyword == null)
                keyword = string.Empty;

            AddJS("Pagination", "/js/pagination.js");
            ViewBag.AreaList = await GetAreaList();
            PageController pageAction = new PageController();
            IList<PortalPage> pageList = await pageAction.GetPortalPages(keyword,GetSiteID, offset, limit);
            ViewData["Keyword"] = keyword;           
            return View(pageList);
        }

        [HttpGet]
        public async Task<ActionResult> ManageAdminPermission(string id)
        {
            AddJS("ManageAdminPermission", "/admin/js/Pages/ManageAdminPermission.js");

            
            return View("ManageAdminPermission");
        }

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<ActionResult> ManageAdminPermission(ServiceActionBind serviceActionBind)
        //{
        //    string redirectURI = "ManageAdminPermission";
        //    try
        //    {
        //        PageActionManager pageActionMage = new PageActionManager();
        //        OperationStatus response = await pageActionMage.ManageService(serviceActionBind, GetUsername);
        //        if (Convert.ToBoolean(response.StatusCode))
        //        {
        //            ActionMessage(response.Message, MessageType.Success);
        //        }
        //        else
        //        {
        //            ActionMessage(response.Message, MessageType.Error);

        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        ProcessException(ex);
        //        ActionMessage(ex.Message, MessageType.Error);
        //    }
        //    redirectURI = nameof(ManageAdminPermission);
        //    return RedirectToAction(redirectURI);
        //}

        private async Task<List<SelectListItem>> GetAreaList()
        {
            List<SelectListItem> lst = new List<SelectListItem>();
            PermissionManager permission = new PermissionManager();
            IList<PageArea> pageArea = await permission.GetAllArea();
            foreach (PageArea area in pageArea)
            {
                lst.Add(new SelectListItem(area.DisplayName, area.AreaName));
            }
            return lst;
        }
    }
}
