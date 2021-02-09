using Cbuilder.Core.ViewComponents;
using Cbuilder.DashboardMenu;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Cbuilder.ViewComponents
{
    public class SideBarViewComponent : CommonViewComponent
    {
        public SideBarViewComponent(IHttpContextAccessor accessor) : base(accessor)
        {

        }
        public async Task<IViewComponentResult> InvokeAsync()
        {
           // AddJS("DashboardMenu", "/admin/js/dashboardMenu.js");
            IList<DashboardSideMenu> objMenus = await GetSideMenu();
            return await Task.FromResult((IViewComponentResult)View("Default", objMenus));
        }

        private async Task<IList<DashboardSideMenu>> GetSideMenu()
        {
            SideMenuManager mgr = new SideMenuManager();
            string UserRoles = UserClaimsPrincipal.FindFirst(ClaimTypes.Role)?.Value;
            string[] currentRoles = UserRoles.Split(",");
            IList<DashboardSideMenu> listitem;
            if (Array.IndexOf(currentRoles, "Super Admin") > -1)// do not check permission for erp admin super roles.
                listitem = await mgr.GetAllSideMenu(null, 0);
            else
                listitem = await mgr.GetSideMenuByRole(UserRoles, 0);
            return listitem;
        }
    }
}
