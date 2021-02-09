using Cbuilder.Core.Helper.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Cbuilder.ViewComponents
{
    public class PaginationViewComponent : ViewComponent
    {
        public Task<IViewComponentResult> InvokeAsync(PagedResultBase result)
        {
            return Task.FromResult((IViewComponentResult)View("Default", result));
        }
    }   
}