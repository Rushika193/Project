using Cbuilder.Core.Constants.Enum;
using Microsoft.AspNetCore.Http;

namespace Cbuilder.Core.Helper.Extensions
{
    public static class MessageExtension
    {
        /// <summary>
        /// Adds the message in current pipeline of HttpContext
        /// </summary>
        /// <param name="httpContext">httpContext</param>
        /// <param name="message">message  to be shown</param>
        /// <param name="messageType">Type of message : MessageType </param>
        public static void ShowMessage(this IHttpContextAccessor httpContextAccessor, string message, MessageType messageType)
        {
            if (httpContextAccessor.HttpContext != null)
            {
                httpContextAccessor.HttpContext.Items["actionmessage"] = message;
                httpContextAccessor.HttpContext.Items["actionmessagetype"] = messageType.ToString();
            }
        }
    }
}
