using Cbuilder.Core.Constants;
using Cbuilder.Core.Helper;
using Cbuilder.Core.Helper.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Web.Administration;
using System;
using System.IO;
using System.Linq;

namespace Cbuilder.Webbuilder
{
    public class WBCachehelper
    {
        private readonly IHostApplicationLifetime _hostApplicationLifetime;

        public WBCachehelper()
        {

        }
        public WBCachehelper(IHostApplicationLifetime hostApplicationLifetime)
        {
            _hostApplicationLifetime = hostApplicationLifetime;
        }
        public void RemoveCacheByPageName(string pageName, bool ispublished, string rootPath)
        {
            try
            {
                //creating random value for each file so that client request get new file rather than from client browser cache
                Random random = new Random();
                string randomString = random.Next(1, 10000).ToString();
                SettingHelper settingHelper = new SettingHelper();
                _ = settingHelper.SettingValueUpdate(SettingKeys.ComponentVersion, randomString);

                //each page got their respective component view js:publised and preview which are also optimized and rendered. so need to delete them.
                string compoFileName = string.Empty;
                string componentPath = string.Empty;

                if (ispublished)
                {
                    compoFileName = "components_pub_" + pageName + ".js";
                    componentPath = rootPath + "js/PageComponent/" + compoFileName;
                    if (File.Exists(componentPath))
                        File.Delete(componentPath);
                }
                compoFileName = "components_" + pageName + ".js";
                componentPath = rootPath + "js/PageComponent/" + compoFileName;
                if (File.Exists(componentPath))
                    File.Delete(componentPath);
            }
            catch
            {
                throw;
            }
        }



        public void RemoveAllCachedFile(IWebHostEnvironment webHostEnvironment)
        {
            try
            {
                string cbuilderPath = Path.Combine(webHostEnvironment.WebRootPath, FolderName.CbuilderAssets);
                string pageComponentPath = Path.Combine(cbuilderPath, FolderName.JS, FolderName.PageComponent);
                DirectoryInfo di = new DirectoryInfo(pageComponentPath);
                if (Directory.Exists(pageComponentPath))
                {
                    foreach (FileInfo file in di.GetFiles())
                    {
                        file.Delete();
                    }
                }

                string optimzeFolder = Path.Combine(webHostEnvironment.WebRootPath, FolderName.Optimize);
                if (Directory.Exists(optimzeFolder))
                {
                    DirectoryInfo optimizeDirINfo = new DirectoryInfo(optimzeFolder);
                    foreach (FileInfo file in optimizeDirINfo.GetFiles())
                    {
                        file.Delete();
                    }
                }
                string packageJSPath = Path.Combine(cbuilderPath, FolderName.JS, "packages.js");
                if (File.Exists(packageJSPath))
                {
                    File.Delete(packageJSPath);
                }
                //creating random value for each file so that client request get new file rather than from client browser cache
                Random random = new Random();
                string randomString = random.Next(1, 10000).ToString();
                SettingHelper settingHelper = new SettingHelper();
                _ = settingHelper.SettingValueUpdate(SettingKeys.ComponentVersion, randomString);
            }
            catch
            {
                throw;
            }
        }

        public void RecycleApplicationPool()
        {
            //_hostApplicationLifetime.ApplicationStopped.Register(() => Console.Write("Application Stopped"));
            _hostApplicationLifetime.StopApplication();
        }
    }
}
