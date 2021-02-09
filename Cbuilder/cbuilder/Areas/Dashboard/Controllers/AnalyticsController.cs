using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cbuilder.Analytics.Models;
using Cbuilder.Core.Constants;
using Cbuilder.Core.Controllers;
using Cbuilder.Core.Helper.Interfaces;
using Cbuilder.Core.Helper.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cbuilder.Areas.Dashboard.Controllers
{
    [Area("Dashboard")]
    public class AnalyticsController : AdminController
    {
        private readonly IApiClient _apiClient;
      
        public AnalyticsController(IHttpContextAccessor httpContextAccessor, IApiClient apiClient) : base(httpContextAccessor)
        {
            this._apiClient = apiClient;
          
        }
        public IActionResult Index()
        {
            AddJS("AnalyticsJS", "/admin/js/analytics.js");
            AddJS("ChartJS", "/lib/chartjs/chartjs.js");
            AddJS("ChartGeoJS", "/lib/chartjs/Chart.Geo.min.js");
            AddJS("ChartGeoJS1", "/lib/chartjs/funnel-graph.js");
            AddCSS("ChartCSS", "/lib/css/chartjs.css");
            AddCSS("ChartCSS1", "/lib/css/chartmain.css");
            AddCSS("ChartCSS2", "/lib/css/charttheme.css");
            return View();
        }
        [HttpPost]
        public async Task<JsonResult> GetAnalyticsUser([FromBody] AnalyticsUserFilter analyticsUser)
        {
            string domainName = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
            var model = new
            {
                Type = analyticsUser.Type,
                UserMedium = analyticsUser.UserMedium,
                FromDate = analyticsUser.FromDate,
                ToDate = analyticsUser.ToDate,
                DomainName = domainName
            };

            Dictionary<string, string> headerParam = new Dictionary<string, string>()
                {
                    { Headers.Scope,LoggerNames.GetUserCountQueryLog}
                };
            var result = await _apiClient.PostAsync<List<AnalyticsUser>>(model, APIURL.LoggerBaseUri + APIScope.LoggerLog + LoggerNames.GetLog, headerParam);
            return Json(result);
        }
        [HttpPost]
        public async Task<JsonResult> GetAnalyticsUserDevice([FromBody] AnalyticsUserFilter analyticsUser)
        {
            string domainName = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
            var model = new
            {
                Type = analyticsUser.Type,
                UserMedium = analyticsUser.UserMedium,
                FromDate = analyticsUser.FromDate,
                ToDate = analyticsUser.ToDate,
                DomainName = domainName
            };

            Dictionary<string, string> headerParam = new Dictionary<string, string>()
                {
                    { Headers.Scope,LoggerNames.GetUserCountQueryLog}
                };
            var result = await _apiClient.PostAsync<List<AnalyticsUser>>(model, APIURL.LoggerBaseUri + APIScope.LoggerLog + LoggerNames.GetLog, headerParam);
            return Json(result);
        }

        public async Task<JsonResult> GetAnalyticsUserCountry([FromBody] AnalyticsUserFilter analyticsUser)
        {
            string domainName = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
            var model = new
            {
                Type = analyticsUser.Type,
                UserMedium = analyticsUser.UserMedium,
                FromDate = analyticsUser.FromDate,
                ToDate = analyticsUser.ToDate,
                DomainName = domainName
            };

            Dictionary<string, string> headerParam = new Dictionary<string, string>()
                {
                    { Headers.Scope,LoggerNames.GetUserCountQueryLog}
                };
            var result = await _apiClient.PostAsync<List<AnalyticsUser>>(model, APIURL.LoggerBaseUri + APIScope.LoggerLog + LoggerNames.GetLog, headerParam);
            return Json(result);
        }

        public async Task<JsonResult> GetTotalHeaderAnalyticsValues([FromBody] AnalyticsUserFilter analyticsUser)
        {
            string domainName = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
            var model = new
            {
                Type = analyticsUser.Type,
                UserMedium = analyticsUser.UserMedium,
                FromDate = analyticsUser.FromDate,
                ToDate = analyticsUser.ToDate,
                DomainName = domainName
            };

            Dictionary<string, string> headerParam = new Dictionary<string, string>()
                {
                    { Headers.Scope,LoggerNames.GetSiteAnalyticsQueryLog}
                };
            var result = await _apiClient.PostAsync<SiteAnalyticsTotalHeader>(model, APIURL.LoggerBaseUri + APIScope.LoggerLog + LoggerNames.GetLog, headerParam);
            return Json(result);
        }
        public async Task<JsonResult> GetAnalyticsBounceRate([FromBody] AnalyticsUserFilter analyticsUser)
        {
            string domainName = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
            var model = new
            {
                Type = analyticsUser.Type,
                UserMedium = analyticsUser.UserMedium,
                FromDate = analyticsUser.FromDate,
                ToDate = analyticsUser.ToDate,
                DomainName = domainName,
                PageName=analyticsUser.PageName
            };

            Dictionary<string, string> headerParam = new Dictionary<string, string>()
                {
                    { Headers.Scope,LoggerNames.GetSiteAnalyticsQueryLog}
                };
           var result = await _apiClient.PostAsync<List<AnalyticsBounceRate>>(model, APIURL.LoggerBaseUri + APIScope.LoggerLog + LoggerNames.GetLog, headerParam);
            return Json(result);
        }

        public async Task<JsonResult> GetAnalyticsActivePages([FromBody] AnalyticsUserFilter analyticsUser)
        {
            string domainName = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
            var model = new
            {
                Type = analyticsUser.Type,
                UserMedium = analyticsUser.UserMedium,
                FromDate = analyticsUser.FromDate,
                ToDate = analyticsUser.ToDate,
                DomainName = domainName,
                PageName = analyticsUser.PageName
            };

            Dictionary<string, string> headerParam = new Dictionary<string, string>()
                {
                    { Headers.Scope,LoggerNames.GetSiteAnalyticsQueryLog}
                };
            var result = await _apiClient.PostAsync<List<AnalyticsActivePage>>(model, APIURL.LoggerBaseUri + APIScope.LoggerLog + LoggerNames.GetLog, headerParam);
            return Json(result);
        }
    }
}
