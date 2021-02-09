using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Cbuilder.Assets;
using Cbuilder.Core.Bundle;
using Cbuilder.Core.Constants;
using Cbuilder.Core.ViewComponents;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Hosting;

namespace Cbuilder.ViewComponents
{
    public class JSVariablesViewComponent : CommonViewComponent
    {
        public JSVariablesViewComponent(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }
        public async Task<IViewComponentResult> InvokeAsync()
        {
            await Task.Run(() =>
            {
                ViewData["JS"] = this.HttpContext?.Items[HttpContextKey.JSVariable]?.ToString();
            });
            return View();
        }
    }
}
