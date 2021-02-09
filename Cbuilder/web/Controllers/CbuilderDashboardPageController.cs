using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Cbuilder.Core.Constants;

namespace Web.Controllers
{
    public class CbuilderDashboardPageController : Controller
    {
        public IActionResult Index()
        {
            //string pagename = this.RouteData.Values["Page"].ToString();
            //   string parameter = this.RouteData.Values["Params"].ToString();
            HttpContext.Items[HttpContextKey.layoutName] = CbuilderLayout.Dashboard;
            return View();
        }
    }
}