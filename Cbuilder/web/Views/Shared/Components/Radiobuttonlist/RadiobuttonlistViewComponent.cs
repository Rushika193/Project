using Cbuilder.Core.Helper.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cbuilder.Areas.Dashboard.Views.Shared.Components.Checkboxlist
{
    public class RadiobuttonlistViewComponent: ViewComponent
    {
        public  async Task<IViewComponentResult> InvokeAsync(CustomMultiselect lst)
        {   
            return  View(lst);
        }
    }
}
