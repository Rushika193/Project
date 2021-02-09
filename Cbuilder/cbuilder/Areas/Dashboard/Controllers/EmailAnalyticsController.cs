using Cbuilder.Core.Controllers;
using Cbuilder.ManageMassMail;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.IO;
using System.Threading.Tasks;

namespace Cbuilder.Areas.Dashboard.Controllers
{
    [Area("Dashboard")]
    public class EmailAnalyticsController : AdminController
    {
        public EmailAnalyticsController(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor) { }
        public async Task<IActionResult> Index()
        {
            AddCSS("analyticsCss", "/lib/css/jquery.jqplot.min.css");
            AddJS("analyticsJs1", "/lib/pjs/jquery.jqplot.min.js");
            AddJS("analyticsJs2", "/lib/pjs/excanvas.min.js");
            AddJS("analyticsJs3", "/lib/pjs/jqplot.barRenderer.min.js");
            AddJS("analyticsJs4", "/lib/pjs/jqplot.categoryAxisRenderer.js");
            AddJS("analyticsJs5", "/lib/pjs/jqplot.pointLabels.min.js");
            AddJS("analyticsJs6", "/lib/pjs/jqplot.cursor.min.js");
            AddJS("analyticsJs7", "/lib/pjs/jqplot.dateAxisRenderer.min.js");
            AddJS("analyticsJs8", "/MassMail/EmailAnalytics.js");
            EmailAnalyticsLabel _localLabel = await Localize<EmailAnalyticsLabel>(Path.Combine("Localization", "massmail", "emailanalytics"));
            ViewBag.LocalLabel = _localLabel;
            return View();
        }
        public async Task<IActionResult> GetAllAnalytics(string StartDate, string EndDate)
        {
            EmailAnalyticsHelper objController = new EmailAnalyticsHelper();
            var ds = await objController.GetAnalyticsData(StartDate, EndDate);
            return new ObjectResult(JsonConvert.SerializeObject(ds, Formatting.Indented));
        }
    }
}