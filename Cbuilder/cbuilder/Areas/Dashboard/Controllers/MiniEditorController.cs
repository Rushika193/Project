using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cbuilder.Core.Controllers;
using Cbuilder.MiniEditor;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace Cbuilder.Controllers
{
    [Area("Dashboard")]
    public class MiniEditorController : AdminController
    {

        public MiniEditorController(IHttpContextAccessor httpContextAccessor, IActionContextAccessor actionContextAccessor) : base(httpContextAccessor)
        {

        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> UpdateComponent(ComponentJson comp, string module)
        {
            MiniEditorManager editorMgr = new MiniEditorManager();
            var res = await editorMgr.AddUpdateComponent(comp, GetUsername, module, GetSiteID);
            return new ObjectResult(res);
        }
        // using example 

        public IActionResult Test()
        {
            return View();
        }
    }
}