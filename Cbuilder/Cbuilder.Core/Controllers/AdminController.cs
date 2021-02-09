using Cbuilder.Core.Constants;
using Cbuilder.Core.Helper.Interfaces;
using Cbuilder.Core.Permissions.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cbuilder.Core.Controllers
{
    /// <summary>
    /// Admin Controller where the common admin tasks are done
    /// </summary>
    [Authorize]
    [TypeFilter(typeof(AuthorizedAdmin))]
    public class AdminController : CommonController
    {
        /// <summary>
        /// Calling this method as contructor passes the httpcontext which  helps to add/remove 
        /// features in current httpcontext.
        /// In this contructor layout for the admin controller is being assigned.
        /// </summary>
        /// <param name="httpContext"></param>
        public AdminController(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
            InitializeData(httpContextAccessor);
        }
       
        private void InitializeData(IHttpContextAccessor httpContextAccessor)
        {
            httpContextAccessor.HttpContext.Items[HttpContextKey.layoutName] = CbuilderLayout.Dashboard;
            httpContextAccessor.HttpContext.Items[HttpContextKey.UserArea] = UserArea.Admin;
        }
    }
}