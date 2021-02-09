
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Cbuilder.Areas.Dashboard.Views.Shared.Components.Checkboxlist
{
    public class ActionmessageViewComponent : ViewComponent
    {
        public async Task<IViewComponentResult> InvokeAsync()
        {
            string message = string.Empty;
            if (HttpContext.Items["actionmessage"] != null && HttpContext.Items["actionmessagetype"] != null)
            {
                TempData["ActionMessage"] = HttpContext.Items["actionmessage"];
                TempData["ActionMessageType"] = HttpContext.Items["actionmessagetype"];
            }
            return View();
        }
    }
}
