using System.Linq;
using System.Reflection;
using System.Security.Claims;
using System.Threading.Tasks;
using Cbuilder.Core.Permissions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Cbuilder.Core.Permissions.Filters
{
    /// <summary>
    /// Check user roles is allow access to controller action 
    /// </summary>
    public class AuthorizedFrontView : IAsyncAuthorizationFilter
    {
        private readonly IPermission _appPer;
        public AuthorizedFrontView(IPermission permission)
        {
            _appPer = permission;
        }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {

            var User = context.HttpContext.User;
            string UserRoles = User.FindFirst(ClaimTypes.Role)?.Value;
            if (UserRoles != null)
            {
                var conAction = context.ActionDescriptor as ControllerActionDescriptor;

                bool HasPermission = false;

                if (conAction.ActionName.ToLower() == "error")
                {
                    HasPermission = true;
                }
                else
                {
                    PermissionManager permissionManager = new PermissionManager();
                    HasPermission = await _appPer.CheckFrontPagePermission(conAction.ControllerName, conAction.ActionName, UserRoles);
                }
                if (!HasPermission)
                    context.Result = new ForbidResult();
            }
        }

    }
}


