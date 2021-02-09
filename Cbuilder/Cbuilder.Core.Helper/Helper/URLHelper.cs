using Cbuilder.Core.Constants;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Policy;
using System.Text;

namespace Cbuilder.Core.Helper.Helper
{
    public class URLHelper
    {
        
        /// <summary>
        /// Creates dashboard links for given controller, action , area with cultureCode if localization is enabled
        /// </summary>
        /// <param name="httpContext">Current httpContext</param>
        /// <param name="controller">controller name</param>
        /// <param name="action">action name: default index</param>
        /// <param name="area">area name: default dashbaord</param>
        /// <returns>dashbaord url</returns>
        public static string DashboardURL(HttpContext httpContext, string controller, string action = "index", string area = "dashboard")
        {
            string cultureURL = HttpContextKey.CultureURL.FromHttpContext(httpContext);
            //return Path.Combine(HttpContextCommons.HostURL, "dashbaord", controller, action, HttpContextCommons.CultureURL);
            return $"{HttpContextCommons.HostURL}/{area}/{controller}/{action}{cultureURL}";
        }

        /// <summary>
        /// Creates dashboard links for given controller, action , area with cultureCode if localization is enabled
        /// </summary>
        /// <param name="httpContext">Current httpContext</param>
        /// <param name="controller">controller name</param>
        /// <param name="action">action name</param>
        /// <param name="parameters">parameter</param>
        /// <param name="area">deafualt: dashboard</param>
        /// <returns>dashboard link</returns>
        public static string DashboardURL(HttpContext httpContext, string controller, string action, string parameters, string area = "dashboard")
        {
            string cultureURL = HttpContextKey.CultureURL.FromHttpContext(httpContext);
            return $"{HttpContextCommons.HostURL}/{area}/{controller}/{action}{cultureURL}/{parameters}";
        }
    }
}