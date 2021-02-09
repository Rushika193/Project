using Microsoft.AspNetCore.Http;

namespace Microsoft.AspNetCore.Mvc
{
    public static class HttpContextKeyExtensions
    {
        public static string GetHttpItemValuebyKey(this HttpContext httpContext, string key)
        {
            return httpContext?.Items[key]?.ToString();
        }
        public static string FromHttpContext(this string key, HttpContext httpContext)
        {
            return httpContext?.Items[key]?.ToString();
        }
    }
}
