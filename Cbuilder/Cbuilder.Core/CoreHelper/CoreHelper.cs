using Cbuilder.Core.Constants;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Text;

namespace Cbuilder.Core.CoreHelpers
{
    public class CoreHelper
    {
        /// <summary>
        /// Returns the current hosted url, Example "www.contentder.com"
        /// </summary>
        public string HostUrl(IHttpContextAccessor _httpContextAccessor)
        {
            //if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
            //{
            //    return "http://172.18.29.6:9021";
            //}
            return $"{ _httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host.Value}{_httpContextAccessor.HttpContext.Request.PathBase}";
        }
        public void AddJS(IHttpContextAccessor _httpContextAccessor, string name, string filePath)
        {
            string key = "_js" + name;
            SetHttpContextItem(key, filePath, _httpContextAccessor);
        }
        /// <summary>
        /// Adds JS to the current httpcontext for bundling and minifying.
        /// </summary>
        /// <param name="httpContext">httpcontext where the  js to be added.</param>
        /// <param name="name">unique name of the js.</param>
        /// <param name="filePath">Js file path which is inside wwwroot folder. Eg: "/js/foldername/index.js."</param>
        public void AddCSS(IHttpContextAccessor _httpContextAccessor, string name, string filePath)
        {
            string key = "_css" + name;
            SetHttpContextItem(key, filePath, _httpContextAccessor);
        }


        public void AddJS(IHttpContextAccessor _httpContextAccessor, AssetLocation assetLocation)
        {
            string key = "_jsPlacement" + assetLocation.FileName;
            SetHttpContextItem(key, assetLocation, _httpContextAccessor);
        }
        public void AddCSS(IHttpContextAccessor _httpContextAccessor, AssetLocation assetLocation)
        {
            string key = "_cssPlacement" + assetLocation.FileName;
            SetHttpContextItem(key, assetLocation, _httpContextAccessor);
        }
        public void SetHttpContextItem(string key, object value, IHttpContextAccessor _httpContextAccessor)
        {
            if (_httpContextAccessor.HttpContext != null && !_httpContextAccessor.HttpContext.Items.ContainsKey(key))
                _httpContextAccessor.HttpContext.Items[key] = value;
        }
        public void AppendHttpContextItem(string key, string value, IHttpContextAccessor _httpContextAccessor)
        {
            var prevVal = _httpContextAccessor.HttpContext.Items[key] as string;
            if (!string.IsNullOrEmpty(prevVal))
                value = prevVal + value;
            _httpContextAccessor.HttpContext.Items[key] = value;
        }
        public string GetCookieValue(IHttpContextAccessor _httpContextAccessor, string key)
        {
            return _httpContextAccessor.HttpContext.Request.Cookies[key];
        }
        public void SetCookie(IHttpContextAccessor _httpContextAccessor, string key, string value, int? expireMinute=null)
        {
            CookieOptions option = new CookieOptions();
            if (expireMinute.HasValue)
                option.Expires = DateTime.Now.AddMinutes(expireMinute.Value);
            else
                option.Expires = DateTime.Now.AddDays(1);
            _httpContextAccessor.HttpContext.Response.Cookies.Append(key, value, option);
        }

        public string GetHttpItemValuebyKey(IHttpContextAccessor _httpContextAccessor, string key)
        {
            return _httpContextAccessor?.HttpContext?.Items[key]?.ToString();
        }
        public static void RegisterJSVariable(HttpContext context)
        {
            string value = string.Format(" var SageFrameUserName = '{0}';", context.User?.Identity?.Name);
            var prevVal = context.Items[HttpContextKey.JSVariable] as string;
            if (!string.IsNullOrEmpty(prevVal))
                value = prevVal + value;
            context.Items[HttpContextKey.JSVariable] = value;
        }
    }
}
