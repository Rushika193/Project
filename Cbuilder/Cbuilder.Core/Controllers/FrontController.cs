using Cbuilder.Core.Constants;
using Cbuilder.Core.Helper.Interfaces;
using Cbuilder.Core.Permissions.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace Cbuilder.Core.Controllers
{
    //[Authorize]
    //[TypeFilter(typeof(AuthorizedFrontView))]
    public class FrontController : CommonController
    {
        public FrontController(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
            InitializeData(httpContextAccessor);
        }
       

        private void InitializeData(IHttpContextAccessor httpContextAccessor)
        {
            httpContextAccessor.HttpContext.Items[HttpContextKey.layoutName] = CbuilderLayout.Default;
            httpContextAccessor.HttpContext.Items[HttpContextKey.UserArea] = UserArea.Front;
        }
    }
}
