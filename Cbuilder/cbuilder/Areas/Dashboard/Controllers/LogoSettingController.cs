using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cbuilder.Core.Controllers;
using Cbuilder.Assets;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Cbuilder.Core.Bundle;
using Microsoft.AspNetCore.Hosting;
using Cbuilder.Core.MediaManagement;
using System.IO;

namespace Cbuilder.Areas.Dashboard.Controllers
{
    [Area("Dashboard")]
    public class LogoSettingController : AdminController
    {

        static string logoFolderPath = Path.Combine("images", "logos");
        IWebHostEnvironment _hostingEnvironment;
        public LogoSettingController(IHttpContextAccessor httpContextAccessor, IWebHostEnvironment hostingEnvironment) : base(httpContextAccessor)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            AddJS("logoSettings", "/admin/js/logos.js");
            LogoSettingModel logoSettingModel = new LogoSettingModel();
            logoSettingModel.WebRootPath = _hostingEnvironment.WebRootPath;
            logoSettingModel.LogoDirectoryPath = Path.Combine(_hostingEnvironment.WebRootPath, logoFolderPath);
            return View(logoSettingModel);
        }

        [ValidateAntiForgeryToken]
        public int ChangeLogo([FromBody]LogoChangeInfo changeInfo)
        {
            int result = 0;
            try
            {
                changeInfo.ImagePath = changeInfo.ImagePath.TrimStart('/');
                string destinationFolder = Path.Combine(_hostingEnvironment.WebRootPath, logoFolderPath, changeInfo.FolderName);
                string srcImagePath = Path.Combine(_hostingEnvironment.WebRootPath, changeInfo.ImagePath);
                string extension = Path.GetExtension(srcImagePath);
                //delete existing image first
                if (new DirectoryInfo(destinationFolder).Exists)
                {
                    DirectoryInfo di = new DirectoryInfo(destinationFolder);
                    foreach (FileInfo file in di.GetFiles())
                    {
                        file.Delete();
                    }
                    string FileName = "Contentder";
                    System.IO.File.Copy(srcImagePath, Path.Combine(destinationFolder, FileName + extension), true);
                    result = 1;
                }
            }
            catch
            {
                result = 0;
            }

            return result;
        }

        [ValidateAntiForgeryToken]
        public int ChangeFavicon([FromBody]LogoChangeInfo changeInfo)
        {
            int result;
            try
            {
                string destinationPath = Path.Combine(_hostingEnvironment.WebRootPath, "favicon.ico");
                string sourcePath = Path.Combine(_hostingEnvironment.WebRootPath, changeInfo.ImagePath);
                System.IO.File.Copy(sourcePath, destinationPath, true);
                result = 1;
            }
            catch
            {

                result = 0;
            }
            return result;
        }
    }
}