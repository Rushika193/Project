using Cbuilder.Core.API.Enum;
using Cbuilder.Core.Constants;
using Cbuilder.Core.CoreHelpers;
using Cbuilder.Core.Helper;
using Cbuilder.Core.Helper.Extensions;
using Cbuilder.Core.Helper.Interfaces;
using Cbuilder.Core.Helper.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
/// <summary>
/// code taken from  https://blog.elmah.io/asp-net-core-request-logging-middleware/
/// </summary>
namespace web
{

    public class RequestHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IHttpContextAccessor _httpContextAccessor;
        // static file request to controller
        private string[] staticFileRequest = { "map", "js", "css", "jpg", "jpeg", "png", "gif", "svg", "bmp", "ico", "html" };
        public RequestHandlerMiddleware(RequestDelegate next, IHttpContextAccessor httpContextAccessor)
        {
            _next = next;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task Invoke(HttpContext context, IApiClient _apiClient)
        {
            try
            {

                //avoid static file request to controller
                if (!CheckStaticFileRequest(context.Request.Path))
                {
                    string xRequest = context.Request.Headers["X-Requested-With"];
                    bool IsPageRequest = false;
                    if (xRequest == null)
                    {
                        IsPageRequest = true;
                    }
                    context.Items[HttpContextKey.IsPageRequest] = IsPageRequest;
                    _ = HttpRequestLog(_apiClient);
                    await _next(context);
                }
                else
                {
                    context.Response.StatusCode = 404;
                }
            }
            catch (Exception ex)
            {
                _httpContextAccessor.ProcessException(ex, "");
            }
        }

        private bool CheckStaticFileRequest(string param)
        {
            string ext = param.ToLower().Split('.').Last();
            return staticFileRequest.Contains(ext);
        }
        private async Task HttpRequestLog(IApiClient _apiClient)
        {
            LogHelper logHelper = new LogHelper(_httpContextAccessor);
            var model = new
            {
                logHelper.LogOrigin,
                logHelper.UrlPath,
                HostAddress = logHelper.ClientIpAddress,
                ClientIP = logHelper.ClientIpAddress,
                logHelper.UserAgent,
                logHelper.Browser,
                logHelper.SessionID,
                RequestHeader = "",
                RequestBody = "",
                logHelper.DomainName,
                logHelper.ReferralURL,
                logHelper.Cookie,
                UniqueID = logHelper.Uniqueid
            };
            Dictionary<string, string> headerParam = new Dictionary<string, string>()
                {
                    { Headers.Scope,LoggerNames.CreateDomainHttpRequestLog}
                };
            await _apiClient.PostAsync<object>(model, APIURL.LoggerBaseUri + APIScope.LoggerLog + LoggerNames.CreateLog, headerParam);
        }
    }
}
