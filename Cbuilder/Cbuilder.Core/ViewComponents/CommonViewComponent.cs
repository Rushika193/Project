using Cbuilder.Core.Constants;
using Cbuilder.Core.CoreHelpers;
using Cbuilder.Core.Helper.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.Core.ViewComponents
{
    public abstract class CommonViewComponent : ViewComponent
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public CommonViewComponent(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        private CoreHelper _coreHelper = new CoreHelper();
        public string HostUrl
        {
            get
            {
                return _coreHelper.HostUrl(_httpContextAccessor);
            }
        }

        /// <summary>
        /// Adds JS to the current httpcontext for bundling and minifying
        /// </summary>
        /// <param name="name">unique name of the js</param>
        /// <param name="filePath">Js file path which is inside wwwroot folder. Eg: "/js/foldername/index.js"</param>
        public void AddJS(string name, string filePath)
        {
            AddJS(HttpContext, name, filePath);
        }

        /// <summary>
        ///  Adds JS to the httpcontext passed for bundling and minifying.
        /// </summary>
        /// <param name="httpContext">httpcontext where the  js to be added.</param>
        /// <param name="name">unique name of the js.</param>
        /// <param name="filePath">Js file path which is inside wwwroot folder. Eg: "/js/foldername/index.js."</param>
        public void AddJS(HttpContext httpContext, string name, string filePath)
        {
            _coreHelper.AddJS(_httpContextAccessor, name, filePath);
        }
        /// <summary>
        /// Adds CSS to the current httpcontext for bundling and minifying
        /// </summary>
        /// <param name="name">Unique name of the css file.</param>
        /// <param name="filePath">CSS file path which is inside wwwroot folder. Eg: "/css/foldername/index.css."</param>
        public void AddCSS(string name, string filePath)
        {
            _coreHelper.AddCSS(_httpContextAccessor, name, filePath);
        }

        public string PageName
        {
            get
            {
                return _coreHelper.GetHttpItemValuebyKey(_httpContextAccessor, HttpContextKey.PageName);
            }
        }
        public string ActionName
        {
            get
            {
                return _coreHelper.GetHttpItemValuebyKey(_httpContextAccessor, HttpContextKey.ActionName);
            }
        }
        public string AreaName
        {
            get
            {
                return _coreHelper.GetHttpItemValuebyKey(_httpContextAccessor, HttpContextKey.AreaName);
            }
        }
        public string UserArea
        {
            get
            {
                return _coreHelper.GetHttpItemValuebyKey(_httpContextAccessor, HttpContextKey.UserArea);
            }
        }
        public string Application
        {
            get
            {
                return _coreHelper.GetHttpItemValuebyKey(_httpContextAccessor, HttpContextKey.Application);
            }
        }
        public int SiteID
        {
            get
            {
                string _siteID = _coreHelper.GetHttpItemValuebyKey(_httpContextAccessor, HttpContextKey.SiteID);
                int siteID;
                int.TryParse(_siteID, out siteID);
                return siteID;
            }
        }
        public string QueryParameters
        {
            get
            {
                return _coreHelper.GetHttpItemValuebyKey(_httpContextAccessor, HttpContextKey.QueryParameters);
            }
        }
        public string QueryParamString
        {
            get
            {
                return _coreHelper.GetHttpItemValuebyKey(_httpContextAccessor, HttpContextKey.QueryParamString);
            }
        }
    }
}