using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cbuilder.Core.MediaManagement;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.Extensions;

namespace Cbuilder.ViewComponents
{
    public class MediaDOMViewComponent : ViewComponent
    {
        private IWebHostEnvironment _env { get; set; }



        public async Task<IViewComponentResult> InvokeAsync(string filePath, MediaSettingKeys mediaSettingKeys)
        {
            MediaSettingController settingController = new MediaSettingController();
            ViewBag.HostURL = HttpContext.Request.Scheme + "://" + HttpContext.Request.Host;
            string fileName,
                    fileExtension = string.Empty,
                    fileNameOnly = string.Empty;

            bool isFolder = false;
            bool isThumbNails = false,
                  isImageExtension = false,
                  isVideoExtension = false,
                  isDocumentExtension = false;
            fileName = GetFolderName(filePath);
            isFolder = (fileName.IndexOf('.') < 0);
            if (!isFolder)
            {
                fileExtension = GetFileExtension(fileName);
                fileNameOnly = GetFileNameOnly(fileName);
                isThumbNails = IsThumbNails(fileExtension);
                isImageExtension = mediaSettingKeys.ImageExtension.Split(',').Contains(fileExtension);
                isVideoExtension = mediaSettingKeys.VideoExtension.Split(',').Contains(fileExtension);
                isDocumentExtension = mediaSettingKeys.DocumentExtension.Split(',').Contains(fileExtension);
            }
            ImageDomInfo imageInfo = new ImageDomInfo();
            imageInfo.FilePath = filePath;
            imageInfo.FileName = fileName;
            imageInfo.FileExtension = fileExtension;
            imageInfo.FileNameOnly = fileNameOnly;
            imageInfo.IsFolder = isFolder;
            imageInfo.IsThumbNails = isThumbNails;
            imageInfo.IsImageExtension = isImageExtension;
            imageInfo.IsVideoExtension = isVideoExtension;
            imageInfo.IsDocumentExtension = isDocumentExtension;
            return await Task.FromResult((IViewComponentResult)View("Default", imageInfo));
        }


        private string GetFolderName(string filePath)
        {
            if (filePath != null && filePath.Length > 0)
            {
                //var fileSplited = filePath.Split("/");
                var fileSplited = filePath.Split(Constant.BS);
                var length = fileSplited.Length;
                return fileSplited[length - 1];
            }
            else
                return "";
        }

        private string GetFileExtension(string fileName)
        {
            return fileName.Split('.')[1].ToLowerInvariant();
        }

        private bool IsThumbNails(string fileExtension)
        {
            if (fileExtension == "jpg" || fileExtension == "png" || fileExtension == "jpeg")
                return true;
            return false;
        }

        private string GetFileNameOnly(string fileName)
        {
            return fileName.Split('.')[0];
        }

    }
}
