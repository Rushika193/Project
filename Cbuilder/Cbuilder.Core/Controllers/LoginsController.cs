using Cbuilder.Core.Constants;
using Microsoft.AspNetCore.Http;

namespace Cbuilder.Core.Controllers
{
    public class LoginsController : CommonController
    {
        public LoginsController(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
            httpContextAccessor.HttpContext.Items[HttpContextKey.layoutName] = CbuilderLayout.Default;
            httpContextAccessor.HttpContext.Items[HttpContextKey.UserArea] = UserArea.Logins;
        }
    }
}
