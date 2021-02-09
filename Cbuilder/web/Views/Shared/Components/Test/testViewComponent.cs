
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;

namespace Cbuilder.Areas.Dashboard.Views.Shared.Components.Checkboxlist
{
    public class TestViewComponent : ViewComponent
    {
        public async Task<IViewComponentResult> InvokeAsync(JObject param)
        {
            
            return View();
        }
    }
}
