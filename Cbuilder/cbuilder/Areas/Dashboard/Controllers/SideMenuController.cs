using Cbuilder.Core.API.Models;
using Cbuilder.Core.Constants;
using Cbuilder.Core.Controllers;
using Cbuilder.Core.Helper;
using Cbuilder.DashboardMenu;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Cbuilder.Areas.Dashboard.Controllers
{
    [Area("Dashboard")]
    public class SideMenuController : AdminController
    {
        private string LocalizePathGrid = Path.Combine("Localization", "sidemenu", "sidemenu");
        private string LocalizePathForm = Path.Combine("Localization", "sidemenu", "sidemenuForm");
        private readonly IMemoryCache _memoryCache;
        public SideMenuController(IHttpContextAccessor httpContextAccessor, IMemoryCache memoryCache) : base(httpContextAccessor)
        {
            _memoryCache = memoryCache;
        }
        public async Task<IActionResult> Index()
        {
            AddJS("pagination", "/js/pagination.js");
            AddJS("SideMenuGrid", "/js/SideMenu/SideMenuGrid.js");
            ViewData["CultureURL"] = $"{HostUrl}{Constant.BS}Dashboard/SideMenu/{nameof(Create)}{CultureURL}";

            SideMenuGridLabel _localLabel = await Localize<SideMenuGridLabel>(LocalizePathGrid);
            ViewBag.LocalLabel = _localLabel;
            return View();
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        public async Task<IActionResult> GetAllMenu(string Keyword = "", int Offset = 0, int Limit = 10)
        {
            try
            {

                SideMenuManager mgr = new SideMenuManager();
                var menus = await mgr.GetAllwithPagi(Keyword, GetCurrentCulture, Offset, Limit, GetSiteID);
                return new ObjectResult(menus);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<IActionResult> Create()
        {
            try
            {
                AddJS("SideMenu", "/js/SideMenu/SideMenu.js");
                SideMenuFormLabel _localLabel = await Localize<SideMenuFormLabel>(LocalizePathForm);
                ViewBag.LocalLabel = _localLabel;
                ViewData["Title"] = _localLabel.CreateTitle;
                ViewData["BtnValue"] = _localLabel.AddBtnLabel;
                await SetDropDown();
                return View(new DashboardSideMenu());
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<IActionResult> Edit()
        {
            try
            {
                if (QueryParameters.Length > 0)
                {
                    Guid id = Guid.Parse(QueryParameters[0]);
                    if (id !=null)
                    {
                        SideMenuFormLabel _localLabel = await Localize<SideMenuFormLabel>(LocalizePathForm);
                        ViewBag.LocalLabel = _localLabel;
                        ViewData["Title"] = _localLabel.UpdateTitle;
                        ViewData["BtnValue"] = _localLabel.UpdateBtnLabel;
                        AddJS("SideMenu", "/js/SideMenu/SideMenu.js");
                        await SetDropDown();
                        SideMenuManager mgr = new SideMenuManager();
                        var menu = await mgr.GetByID(id, GetSiteID);
                        return View("Create", menu);
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<IActionResult> AddUpdate(DashboardSideMenu SideMenu)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    SideMenuManager mgr = new SideMenuManager();
                    OperationStatus status = await mgr.AddUpdateMenu(SideMenu, GetUsername, GetSiteID);
                    if (status.IsSuccess)
                    {
                        return RedirectToAction(nameof(Index));
                    }
                }
                SideMenuFormLabel _localLabel = await Localize<SideMenuFormLabel>(LocalizePathForm);
                ViewBag.LocalLabel = _localLabel;
                if (SideMenu.LinkID == null)
                {
                    ViewData["Title"] = _localLabel.CreateTitle;
                    ViewData["BtnValue"] = _localLabel.AddBtnLabel;
                }
                else
                {
                    ViewData["Title"] = _localLabel.UpdateTitle;
                    ViewData["BtnValue"] = _localLabel.UpdateBtnLabel;
                }
                await SetDropDown();
                AddJS("SideMenu", "/js/SideMenu/SideMenu.js");
                return View("Create", SideMenu);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<IActionResult> Delete()
        {
            try
            {
                if (QueryParameters.Length > 0)
                {
                    Guid id = Guid.Parse(QueryParameters[0]);
                    if (id != null)
                    {
                        SideMenuManager mgr = new SideMenuManager();
                        OperationStatus status = await mgr.DeleteSideMenu(id);
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            catch (Exception)
            {
                throw;
            }
        }
        [NonAction]
        public async Task SetDropDown(int areaId = 0, Guid? parentId=null)
        {
            SideMenuManager mgr = new SideMenuManager();
            IList<PageApplicationArea> appAreas = await mgr.GetAreas(GetSiteID);
            IList<DashboardSideMenu> menuList = await mgr.GetAllSideMenu(null, GetSiteID);
            List<SelectListItem> lst = new List<SelectListItem>();
            List<SelectListItem> menuLst = new List<SelectListItem>();
            List<SelectListItem> culture = new List<SelectListItem>();
            if (appAreas != null)
            {
                foreach (PageApplicationArea appArea in appAreas)
                {
                    lst.Add(new SelectListItem(appArea.DisplayName, appArea.AreaID.ToString()));
                }
            }
            ViewBag.Area = lst;
            menuLst.Add(new SelectListItem("Select Parent", Guid.Empty.ToString()));
            if (menuList != null)
            {
                foreach (DashboardSideMenu menuItem in menuList)
                {
                    menuLst.Add(new SelectListItem(menuItem.LinkTitle, menuItem.LinkID.ToString(), menuItem.LinkID == parentId));
                }
            }
            ViewBag.Menu = menuLst;
            culture.Add(new SelectListItem("en-US", "en-US"));
            ViewBag.Culture = culture;
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        public async Task<IActionResult> GetPages(string AreaID)
        {
            try
            {
                SideMenuManager mgr = new SideMenuManager();
                var pages = await mgr.GetPages(GetSiteID, AreaID);
                return new ObjectResult(pages);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        public async Task<IActionResult> GetActions(string PageID)
        {
            try
            {
                SideMenuManager mgr = new SideMenuManager();
                var actios = await mgr.GetActions(PageID);
                return new ObjectResult(actios);
            }
            catch (Exception)
            {

                throw;
            }
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        public async Task ToogleSidebar([FromBody] SettingKeyValue settingKeyValue)
        {
            try
            {
                SettingHelper settingHelper = new SettingHelper(_memoryCache);
                await settingHelper.SettingValueUpdate(SettingKeys.AdminSidebar, settingKeyValue.Value);
                await Task.Run(() =>
                {
                    return settingHelper.UpdateCachedSettingValue(SettingKeys.AdminSidebar, settingKeyValue.Value);
                });
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}