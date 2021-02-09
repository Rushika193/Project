using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Cbuilder.Core.Constants;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace Documentation.Controllers
{
    [Area("Document")]
    public class DesignController : Controller
    {
        
        public DesignController(IHttpContextAccessor httpContextAccessor)
        {
            httpContextAccessor.HttpContext.Items[HttpContextKey.layoutName] = "_DocumentationLayout.cshtml";
        }
        public IActionResult index()
        {
            return View();
        }
        public IActionResult containers()
        {
            return View();
        }
        public IActionResult layout()
        {
            return View();
        }
        public IActionResult grid()
        {
            return View();
        }
        public IActionResult spacing()
        {
            return View();
        }
        public IActionResult cards()
        {
            return View();
        }
        public IActionResult alerts()
        {
            return View();
        }
        public IActionResult buttons()
        {
            return View();
        }
        public IActionResult colors()
        {
            return View();
        }
        public IActionResult forms()
        {
            return View();
        }
        public IActionResult formAdvElement()
        {
            return View();
        }
        public IActionResult alertandconfirm()
        {
            return View();
        }
        
        public IActionResult modals()
        {
            return View();
        }
        public IActionResult tabs()
        {
            return View();
        }
        public IActionResult accordian()
        {
            return View();
        }
        public IActionResult pagination()
        {
            return View();
        }
        public IActionResult popovers()
        {
            return View();
        }
        public IActionResult tooltips()
        {
            return View();
        }
        public IActionResult dataGrid()
        {
            return View();
        }
        public IActionResult filter()
        {
            return View();
        }
        public IActionResult tab()
        {
            return View();
        }
        public IActionResult pills()
        {
            return View();
        }
        public IActionResult flex()
        {
            return View();
        }
        public IActionResult listGroup()
        {
            return View();
        }
        public IActionResult Typography()
        {
            return View();
        }
        public IActionResult table()
        {
            return View();
        }
        public IActionResult images()
        {
            return View();
        }
        public IActionResult fieldset()
        {
            return View();
        }
    }
}
