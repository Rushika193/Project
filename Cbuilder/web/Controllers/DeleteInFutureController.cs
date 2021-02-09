using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Cbuilder.Core.Constants;
using Cbuilder.Core.Controllers;
using Cbuilder.Core.Helper;
using Cbuilder.Core.Helper.Interfaces;
using Cbuilder.Core.Helper.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json.Linq;

namespace web.Controllers
{
    public class DeleteInFutureController : FrontController
    {
        public readonly IMemoryCache _memoryCache;
        public DeleteInFutureController(IApiClient apiClient, IHttpContextAccessor httpContextAccessor, IActionContextAccessor actionContextAccessor, IMemoryCache memoryCache) : base(httpContextAccessor)
        {
            _memoryCache = memoryCache;
        }
        public IActionResult Index()
        {
            SettingHelper settingHelper = new SettingHelper(_memoryCache);

            //bool local = settingHelper.GetCachedSettingBoolValue(SettingKeys.Localization);
            //settingHelper.UpdateCachedSettingValue(SettingKeys.Localization,"false");
            //local = settingHelper.GetCachedSettingBoolValue(SettingKeys.Localization);
            ViewBag.Message = WriteLOG("oneline");
            return View();
        }
        public string WriteLOG(string message)
        {
            string filePath = "one";
            string error = "Welcome here";
            string folderName = "iskconFolder";
            try
            {
                string folderPath = Path.Combine(CurrentHostEnvironment.WebRootPath, folderName);
                if (!Directory.Exists(folderPath))
                    Directory.CreateDirectory(folderPath);
                string logFilePath = "Logs_" + DateTime.Now.ToString("yyyy_MMM_dd_HH_mm_ss_fffffff") + ".txt";
                filePath = Path.Combine(folderPath, logFilePath);
                using (StreamWriter streamWriter = new StreamWriter(System.IO.File.Open(filePath, FileMode.OpenOrCreate)))
                {
                    streamWriter.WriteAsync(message);
                }
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            if (error.Length > 0)
                filePath = error;
            return filePath;
        }
    }
}