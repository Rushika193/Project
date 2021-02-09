using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json;
using Documentation.Models;
using Microsoft.AspNetCore.Http;
using Cbuilder.Core.Constants;
using Cbuilder.Core.MediaManagement;
using System.IO;
using Cbuilder.Core.Helper.Models;

namespace Documentation.Controllers
{
    [Area("Document")]
    public class CodeController : Controller
    {
        private readonly ILogger<CodeController> _logger;
        private string CaptchaServer = "http://192.168.3.7:9250";
        public CodeController(IHttpContextAccessor httpContextAccessor)
        {
            httpContextAccessor.HttpContext.Items[HttpContextKey.layoutName] = "_CodeDocumentationLayout.cshtml";
        }
        [HttpGet]
        public IActionResult captchaexample()
        {

            return View(new HomeInfo() { CaptchaServer = CaptchaServer });
        }
        [HttpPost]
        public async Task<IActionResult> captchaexample([FromForm]HomeInfo homeInfo)
        {

            var parameters = new Dictionary<string, string>();
            parameters.Add("SecretKey", "ss");
            parameters.Add("SiteKey", "sk");
            parameters.Add("CaptchaResponse", homeInfo.cbuildercaptcharesponse);
            parameters.Add("CaptchaAnswer", homeInfo.CaptchaAnswer);


            var data = new StringContent(JsonConvert.SerializeObject(parameters), Encoding.UTF8, "application/json");

            var url = CaptchaServer + "/api/v1/Captcha/EnsureCaptcha";
            var client = new HttpClient();

            var response = await client.PostAsync(url, data);

            string result = response.Content.ReadAsStringAsync().Result;
            //  Console.WriteLine(result);
            homeInfo.CaptchaServer = CaptchaServer;
            return View(homeInfo);
        }
        [Microsoft.AspNetCore.Authorization.Authorize]
        public IActionResult UploadExample()
        {
            ViewBag.UploadPath = FileUploadHelper.EncryptString(Path.Combine(CurrentHostEnvironment.WebRootPath, "upload","example"));
            ViewBag.AllowExtension = FileUploadHelper.EncryptString(string.Join(",",Enum.GetNames(typeof(ImageExtensionEnum))));
            return View();
        }


    }
}
