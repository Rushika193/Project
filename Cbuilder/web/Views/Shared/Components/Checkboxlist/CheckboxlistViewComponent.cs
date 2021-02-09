using Cbuilder.Core.Helper.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Cbuilder.Areas.Dashboard.Views.Shared.Components.Checkboxlist
{
    public class CheckboxlistViewComponent: ViewComponent
    {
        public async Task<IViewComponentResult> InvokeAsync(CustomMultiselect lst)
        {   

            return  View(lst);
        }
    }
}
