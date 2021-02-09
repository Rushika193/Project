
using Cbuilder.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cbuilder.Areas.Dashboard.Views.Shared.Components.Checkboxlist
{
    public class DashboardLinksViewComponent : ViewComponent
    {
        public async Task<IViewComponentResult> InvokeAsync(JObject param)
        {

            List<DashboardLinks> dashboardLinks = new List<DashboardLinks>();

            dashboardLinks.Add(new DashboardLinks()
            {
                PageName = "role",
                Title = "role",
                Description = "you can manage role from here",
                CssColor = "blue",
                IconClass = "ct ct-diagram",
                Link = "role"
            });
            dashboardLinks.Add(new DashboardLinks()
            {
                PageName = "user",
                Title = "user",
                Description = "you can manage user from here",
                CssColor = "yellow",
                IconClass = "ct ct-users-outline",
                Link = "user"
            });
            dashboardLinks.Add(new DashboardLinks()
            {
                PageName = "Settings",
                Title = "Setting",
                Description = "you can manage setting from here",
                CssColor = "green",
                IconClass = "ct ct-settings",
                Link = "settings/basic"
            });

            return View(dashboardLinks);
        }
    }
}
