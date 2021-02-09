using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cbuilder.Core.Controllers;
using Cbuilder.Assets;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Cbuilder.Core.Bundle;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace Cbuilder.Areas.Dashboard.Controllers
{
    [Area("Dashboard")]
    [AutoValidateAntiforgeryToken]
    public class ApplicationController : AdminController
    {
        IWebHostEnvironment _hostingEnvironment;


        private string LocalizePath = Path.Combine("Localization", "application", "application");
        public ApplicationController(IHttpContextAccessor httpContextAccessor, IWebHostEnvironment hostingEnvironment) : base(httpContextAccessor)
        {
            _hostingEnvironment = hostingEnvironment;
        }


        [HttpGet]
        public async Task<ActionResult> Index()
        {
            ApplicationManager appManager = new ApplicationManager();
            IList<ApplicationNameInfo> lstApplications = await appManager.GetApplicationNames();

            ViewBag.LocalLabel = await LocalizeJson(LocalizePath);

            return View(lstApplications);
        }

        [HttpGet]
        public async Task<ActionResult> Create()
        {
            ViewBag.LocalLabel = await LocalizeJson(LocalizePath);
            return View("AddEdit");
        }

        [HttpPost]
        public async Task<ActionResult> Create(ApplicationNameInfo app)
        {

            if (string.IsNullOrEmpty(app.ApplicationName))
            {
                ViewBag.AppErrMsg = "Enter Application Name";
                return View("AddEdit", app);
            }
            else
            {
                ApplicationManager applicationManager = new ApplicationManager();
                int result = await applicationManager.SaveApplication(app);

                if (result > 0)
                    return RedirectToAction("Index");
                else
                {
                    ViewBag.AppErrMsg = "Application name already exists";
                    return View("AddEdit", app);

                }
            }

        }


        [HttpGet]
        public async Task<ActionResult> Edit(int id)
        {
            ViewBag.LocalLabel = await LocalizeJson(LocalizePath);

            ApplicationManager applicationManager = new ApplicationManager();
            ApplicationNameInfo app = await applicationManager.GetApplicationByID(id);

            return View("AddEdit", app);
        }


        [HttpPost]
        public async Task<ActionResult> Edit(ApplicationNameInfo app)
        {
            if (ModelState.IsValid)
            {
                ApplicationManager applicationManager = new ApplicationManager();
                int result = await applicationManager.SaveApplication(app);

                if (result > 0)
                    return RedirectToAction("Index");
                else
                {
                    ViewBag.AppErrMsg = "Application name already exists";
                    return View("AddEdit", app);

                }
            }
            else
                return View("AddEdit");
        }

        [HttpGet]
        public async Task<ActionResult> Delete(int id)
        {
            ApplicationManager applicationManager = new ApplicationManager();
            await applicationManager.DeleteApplication(id);

            return RedirectToAction("Index");
        }









    }
}
