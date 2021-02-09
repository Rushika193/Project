using Microsoft.AspNetCore.Http;
using SQLHelper;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Core.Helper
{
    public class LogHelper
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly int _logOrigin = 4;
        public LogHelper(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public LogHelper(IHttpContextAccessor httpContextAccessor, int logOrigin)
        {
            _httpContextAccessor = httpContextAccessor;
            _logOrigin = logOrigin;
        }
        public int LogOrigin { get { return _logOrigin; } }

        public string UrlPath
        {
            get
            {
                return _httpContextAccessor.HttpContext.Request.Path.ToString();
            }
        }
        public string ClientIpAddress
        {
            get
            {
                return _httpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString();
            }
        }
        public string UserAgent
        {
            get
            {
                return _httpContextAccessor.HttpContext.Request.Headers["User-agent"].ToString();
            }
        }
        public string Browser
        {
            get
            {
                return string.Empty;
            }
        }
        public string SessionID
        {
            get
            {
                return _httpContextAccessor.HttpContext.Session.Id.ToString();
            }
        }
        public string DomainName
        {
            get
            {
                return $"{ _httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}{_httpContextAccessor.HttpContext.Request.PathBase}";
            }
        }
        public string ReferralURL
        {
            get
            {
                return _httpContextAccessor.HttpContext.Request.Headers["Referer"].ToString();
            }
        }
        public string Cookie
        {
            get
            {
                return _httpContextAccessor.HttpContext.Request.Headers["Cookie"].ToString();
            }
        }
        public string Uniqueid
        {
            get
            {
                string id = _httpContextAccessor.HttpContext.Request.Cookies["uniqueid"]?.ToString();
                if (string.IsNullOrEmpty(id))
                {
                    id = Guid.NewGuid().ToString();
                    SetCookie("uniqueid", id, 1440);
                }
                return id;
            }
        }

        private void SetCookie(string key, string value, int? expireTime)
        {
            CookieOptions option = new CookieOptions();
            if (expireTime.HasValue)
                option.Expires = DateTime.Now.AddMinutes(expireTime.Value);
            else
                option.Expires = DateTime.Now.AddMilliseconds(10);
            _httpContextAccessor.HttpContext.Response.Cookies.Append(key, value, option);
        }
    }
}
