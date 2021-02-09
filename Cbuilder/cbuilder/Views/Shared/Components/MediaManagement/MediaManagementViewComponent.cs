using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Cbuilder.Core.MediaManagement;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Cbuilder.Models;
using Cbuilder.Webbuilder;
using Cbuilder.Core.Helper.Models;
using Cbuilder.Core.ViewComponents;
using Microsoft.AspNetCore.Http;

namespace Cbuilder.ViewComponents
{
    public class MediaManagementViewComponent : CommonViewComponent
    {
        CbuilderVariables cbuilderVariables;


        private IWebHostEnvironment _hostingEnvironment;
        private readonly IHttpContextAccessor httpContextAccessor;
        public MediaManagementViewComponent(IWebHostEnvironment hostingEnvironment, IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
            this._hostingEnvironment = hostingEnvironment;
            cbuilderVariables = new CbuilderVariables();
            cbuilderVariables.IsDevelopmentMode = CurrentHostEnvironment.IsDevelopment;
            MediaHelper.serverRootPath = hostingEnvironment.WebRootPath;
        }


        public async Task<IViewComponentResult> InvokeAsync()
        {
            AddJS("MediaManagement", "/cbuilderassets/js/SageMediaManagement.js");
            AddCSS("MediaMgmt", "/cbuilderassets/css/MediaManagement.css");

            MediaLibraryInfo libraryInfo = new MediaLibraryInfo();
            MediaCategory mediaCategory = new MediaCategory(); //Get Username here later

            MediaSettingController settingController = new MediaSettingController();
            MediaSettingKeys mediaSettingKeys = await settingController.GetMediaSettingKeyValue();

            libraryInfo.MediaSettingKeys = mediaSettingKeys;
            libraryInfo.MediaFolderList = MediaHelper.GetMediaFolderList(mediaCategory, mediaSettingKeys);
            PackMediaJs();

            return await Task.FromResult((IViewComponentResult)View("Default", libraryInfo));
        }


        private void PackMediaJs()
        {
            cbuilderVariables.IsDevelopmentMode = true;
            if (cbuilderVariables.IsDevelopmentMode)
            {
                try
                {
                    string basePath = _hostingEnvironment.WebRootPath + @"\cbuilderassets";
                    string extensionPath = basePath + @"\js\SageMediaManagement.js";
                    string fullpath = string.Format("{0}{1}", basePath, @"\js\MediaManagement\");
                    string[] files = Directory.GetFiles(fullpath, "*.js");
                    if (files.Length > 0)
                    {
                        File.WriteAllText(extensionPath, String.Empty);
                        using (StreamWriter writeToFile = new StreamWriter(File.Open(extensionPath, FileMode.OpenOrCreate)))
                        {
                            foreach (var file in files)
                            {
                                using (StreamReader readFrom = new StreamReader(file))
                                {
                                    while (!readFrom.EndOfStream)
                                    {
                                        string line = readFrom.ReadLine();
                                        writeToFile.WriteLine(line);
                                    }
                                }
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    //ProcessException(ex);
                }
            }
        }
    }
}
