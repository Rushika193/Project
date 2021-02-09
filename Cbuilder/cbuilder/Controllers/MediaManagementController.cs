using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Cbuilder.Core.MediaManagement;
using Cbuilder.Core.MediaManagement.Models;
using Microsoft.Extensions.Hosting;
using Cbuilder.Core.Helper.Extensions;

namespace Cbuilder.Controllers
{
    [Authorize]
    [Route("[controller]/[action]")]
    public class MediaManagementController : Controller
    {
        private IWebHostEnvironment _hostingEnvironment;
        public MediaManagementController(IWebHostEnvironment hostingEnvironment)
        {
            this._hostingEnvironment = hostingEnvironment;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult FileUpload(IFormFile files, string fileextension, string rootPath, string quality, string type)
        {
            string retMsg = "0###fail";
            try
            {
                bool isValidFile = false;
                string validExtension = string.Empty;
                string retFilePath = string.Empty;
                string dirBaseLocation = string.Empty;
                string originalPath = string.Empty;
                string thumbLargePath = string.Empty;
                string thumbMediumPath = string.Empty;
                string thumbSmallPath = string.Empty;
                string strBaseLocation = rootPath;


                string filename = string.Empty;
                string newFileName = string.Empty;
                //  HttpRequest Request = HttpContext.Current.Request;
                string fileExt = fileextension.ToString();
                string[] allowExtensions = fileExt.Split(',');
                long encodeQuality = 10L;
                if (quality != null && quality.ToString().Length > 0)
                {
                    long.TryParse(quality, out encodeQuality);
                }

                if (files != null)
                {
                    MediaSettingKeys objsettingInfo = new MediaSettingKeys();
                    MediaSettingController objController = new MediaSettingController();
                    objsettingInfo = objController.GetMediaSettingKeyValue().Result;

                    if (objsettingInfo != null)
                    {
                        string ext = string.Empty;
                        switch (type)
                        {
                            case "image":
                                ext = objsettingInfo.ImageExtension;
                                break;
                            case "video":
                                ext = objsettingInfo.VideoExtension;
                                break;
                            case "document":
                                ext = objsettingInfo.DocumentExtension;
                                break;
                            default:
                                ext = objsettingInfo.ImageExtension + "," + objsettingInfo.VideoExtension + "," + objsettingInfo.DocumentExtension;
                                break;
                        }
                        allowExtensions = ext.Split(',');
                        if (string.IsNullOrEmpty(fileExt))
                            fileExt = ext;
                    }
                    string extension = GetExtension(files.FileName.ToLower()).ToLower();
                    if (IsValidExtension(allowExtensions, extension))
                    {
                        string[] myExtensions = fileExt.Split(',');
                        if (IsValidExtension(myExtensions, extension))
                        {
                            isValidFile = true;
                            retMsg = "0###Valid file Extension";
                        }
                        else
                        {
                            isValidFile = false;
                            retMsg = "0###Not valid file Extension";
                        }
                    }
                    else
                    {
                        isValidFile = false;
                        retMsg = "0###Not valid file Extension";
                    }
                    if (isValidFile)
                    {
                        
                        filename = Path.GetFileName(files.FileName.Replace(" ", "_"));

                        originalPath = Path.Combine(_hostingEnvironment.WebRootPath, MediaHelper.originalThumbPath, strBaseLocation);
                        string tempPath = Path.Combine(_hostingEnvironment.WebRootPath, MediaHelper.tempThumbPath, strBaseLocation);
                        thumbLargePath = Path.Combine(_hostingEnvironment.WebRootPath, MediaHelper.largeThumbPath, strBaseLocation);
                        thumbMediumPath = Path.Combine(_hostingEnvironment.WebRootPath, MediaHelper.mediumThumbPath, strBaseLocation);
                        string baseLocationPath = Path.Combine(_hostingEnvironment.WebRootPath, strBaseLocation);
                        newFileName = MediaHelper.NewFileName(filename.ToLower(), baseLocationPath);

                        string screenshotPath = string.Empty;
                        if (!Directory.Exists(originalPath))
                            Directory.CreateDirectory(originalPath);
                        if (!Directory.Exists(thumbLargePath))
                            Directory.CreateDirectory(thumbLargePath);
                        if (!Directory.Exists(thumbMediumPath))
                            Directory.CreateDirectory(thumbMediumPath);
                        if (!Directory.Exists(baseLocationPath))
                            Directory.CreateDirectory(baseLocationPath);
                        if (!Directory.Exists(tempPath))
                            Directory.CreateDirectory(tempPath);

                        thumbLargePath = Path.Combine(thumbLargePath, newFileName);
                        thumbMediumPath = Path.Combine(thumbMediumPath, newFileName);
                        originalPath = Path.Combine(originalPath, newFileName);
                        tempPath = Path.Combine(tempPath, newFileName);
                        string filePath = Path.Combine(baseLocationPath, newFileName);
                        retFilePath = retFilePath + filename + ',';
                        bool isImage = CheckImage(extension, objsettingInfo.ImageExtension);
                        if (isImage)
                        {
                            ImageOptimize objOptimizeImage = new ImageOptimize();
                            using (FileStream tempPath1 = System.IO.File.Create(tempPath))
                                files.CopyTo(tempPath1);
                            // files.SaveAs(tempPath);
                            objOptimizeImage.OptimizeImage(_hostingEnvironment.WebRootPath, tempPath, strBaseLocation, newFileName, extension);
                        }
                        else
                        {
                            using (FileStream tempPath1 = System.IO.File.Create(this.GetPathAndFilename(filename)))
                                files.CopyTo(tempPath1);
                            //files.SaveAs(filePath);
                        }
                        retMsg = "1###" + retFilePath.TrimEnd(',').Replace("." + extension, "").Replace("_", " ") + "###" + newFileName;
                    }
                }

            }
            catch (Exception ex)
            {
                ex.ToString().WriteLOG();
                throw;
            }
            //string filename = ContentDispositionHeaderValue.Parse(files.ContentDisposition).FileName.Trim('"');

            //filename = this.EnsureCorrectFilename(filename);

            //using (FileStream output = System.IO.File.Create(this.GetPathAndFilename(filename)))
            //    files.CopyTo(output);


            return this.Json(retMsg);
        }
        private bool CheckImage(string extension, string extensions)
        {
            bool isImage = false;
            string[] ext = extensions.Split(',');
            int extensionLength = ext.Length;
            for (int i = 0; i < extensionLength; i++)
            {
                if (ext[i] == extension)
                {
                    isImage = true;
                    break;
                }
            }
            return isImage;

        }
        private string GetExtension(string fileName)
        {
            int index = fileName.LastIndexOf('.');
            string ext = fileName.Substring(index + 1, (fileName.Length - index) - 1);
            return ext;
        }

        public bool IsValidExtension(string[] array, string ext)
        {
            bool found = false;
            foreach (string s in array)
            {
                if (s.Equals(ext))
                {
                    found = true;
                    break;
                }
            }
            return found;
        }

        //public async Task<JsonResult> GetSettings([FromBody] MediaSettingInfo objMediaSetting, string userName, string secureToken)
        //public async Task<JsonResult> GetSettings([FromBody] TestModel testmodel)
        [HttpPost]
        public async Task<JsonResult> GetSettings([FromBody] MediaSettingInfo objMediaSetting)
        {
            long mediaSettingID = 1;
            if (objMediaSetting != null)
                mediaSettingID = objMediaSetting.MediaSettingID;

            MediaSettingController objDataProvider = new MediaSettingController();

            MediaSettingInfo objsettingInfo = await objDataProvider.GetByID(mediaSettingID);
            return this.Json(objsettingInfo);
        }


        [HttpPost]
        public JsonResult CreateCategory([FromBody] MediaCategory mediaCategory)
        {

            //MediaCategory mediaCategory = new MediaCategory();


            //mediaCategory.BaseCategory = bPath;
            //mediaCategory.ParentCategory = pCategory;


            bool isExists = false;
            string basePath = "/";
            if (mediaCategory.ParentCategory.Length > 0)
            {
                basePath += mediaCategory.ParentCategory + "/";
            }
            basePath += mediaCategory.BaseCategory;

            isExists = MediaHelper.CreateCategory(basePath);

            return Json(isExists);

        }

        [HttpPost]
        public JsonResult RenameCategory([FromBody] MediaCategory objMediaCategory)
        {
            bool isExists = false;

            string basePath = "/";
            if (objMediaCategory.ParentCategory.Length > 0)
            {
                basePath += objMediaCategory.ParentCategory + "/";
            }
            string newCategory = objMediaCategory.NewCategory;

            isExists = MediaHelper.RenameCategory(objMediaCategory.ParentCategory + "/" + objMediaCategory.BaseCategory, objMediaCategory.ParentCategory + "/" + newCategory);
            string ext = MediaHelper.GetFileExtension(objMediaCategory.BaseCategory);
            string pathStr = MediaHelper.largeThumbPath + objMediaCategory.ParentCategory + "/";
            MediaHelper.RenameCategory(pathStr + objMediaCategory.BaseCategory, pathStr + newCategory);
            pathStr = MediaHelper.mediumThumbPath + objMediaCategory.ParentCategory + "/";
            MediaHelper.RenameCategory(pathStr + objMediaCategory.BaseCategory, pathStr + newCategory);
            pathStr = MediaHelper.originalThumbPath + objMediaCategory.ParentCategory + "/";
            MediaHelper.RenameCategory(pathStr + objMediaCategory.BaseCategory, pathStr + newCategory);

            return Json(isExists);
        }

        public bool RenameFileName([FromBody]MediaCategory objMediaCategory)
        {
            bool isExists = false;

            string newCategory = objMediaCategory.NewCategory;


            isExists = MediaHelper.RenameFileName(objMediaCategory.ParentCategory + "/" + objMediaCategory.BaseCategory, objMediaCategory.ParentCategory + "/" + newCategory);
            string ext = MediaHelper.GetFileExtension(objMediaCategory.BaseCategory);
            if (ext == "jpg" || ext == "png" || ext == "jpeg")
            {
                string pathStr = MediaHelper.largeThumbPath + objMediaCategory.ParentCategory + "/";
                MediaHelper.RenameFileName(pathStr + objMediaCategory.BaseCategory, pathStr + newCategory);
                pathStr = MediaHelper.mediumThumbPath + objMediaCategory.ParentCategory + "/";
                MediaHelper.RenameFileName(pathStr + objMediaCategory.BaseCategory, pathStr + newCategory);
                pathStr = MediaHelper.originalThumbPath + objMediaCategory.ParentCategory + "/";
                MediaHelper.RenameFileName(pathStr + objMediaCategory.BaseCategory, pathStr + newCategory);
            }

            return isExists;
        }




        public async Task<JsonResult> GetMediaFolderList(MediaCategory mediaCategory)
        {
            MediaSettingController mediaSettingController = new MediaSettingController();
            MediaSettingKeys mediaSettingKeys = await mediaSettingController.GetMediaSettingKeyValue();

            string folderList = MediaHelper.GetMediaFolderList(mediaCategory, mediaSettingKeys);

            return Json(folderList);

        }

        public async Task<IActionResult> GetMediaByPath(string basePath, string filter)
        {

            MediaSettingController mediaSettingController = new MediaSettingController();
            MediaSettingKeys mediaSetting = await mediaSettingController.GetMediaSettingKeyValue();
            return ViewComponent("MediaImages", new { folderName = basePath, filterText = filter, mediaSettingKeys = mediaSetting });
        }

        public async Task<string> DeleteMedia([FromBody]List<MediaCategory> objMediaCategoryList)
        {
            string message = string.Empty;
            MediaSettingController mediaSettingController = new MediaSettingController();
            MediaSettingKeys mediaSettingKeys = await mediaSettingController.GetMediaSettingKeyValue();

            foreach (MediaCategory objMediaCategory in objMediaCategoryList)
            {
                string[] extensions = { };
                string rootPath = MediaHelper.GetRootPath(mediaSettingKeys, objMediaCategory, out extensions);
                if (objMediaCategory.UploadType == "category")
                {
                    if (objMediaCategory.BaseCategory.ToLower().IndexOf(rootPath.ToLower()) > -1)
                    {
                        message = MediaHelper.DeleteMediaCategory(objMediaCategory.BaseCategory);
                        MediaHelper.DeleteMediaCategory(MediaHelper.largeThumbPath + objMediaCategory.BaseCategory);
                        MediaHelper.DeleteMediaCategory(MediaHelper.mediumThumbPath + objMediaCategory.BaseCategory);
                        MediaHelper.DeleteMediaCategory(MediaHelper.originalThumbPath + objMediaCategory.BaseCategory);

                    }
                }
                else
                {
                    if (objMediaCategory.BaseCategory.ToLower().IndexOf(rootPath.ToLower()) > -1)
                        message = MediaHelper.DeleteMediaFile(objMediaCategory.BaseCategory);
                    string ext = MediaHelper.GetFileExtension(objMediaCategory.BaseCategory);
                    if (ext == "jpg" || ext == "png" || ext == "jpeg")
                    {
                        MediaHelper.DeleteMediaFile(MediaHelper.largeThumbPath + objMediaCategory.BaseCategory);
                        MediaHelper.DeleteMediaFile(MediaHelper.mediumThumbPath + objMediaCategory.BaseCategory);
                        MediaHelper.DeleteMediaFile(MediaHelper.originalThumbPath + objMediaCategory.BaseCategory);
                    }
                }
            }

            return message;
        }


        public string SaveCroppedImage([FromBody]ImageInfo objImageInfo)
        {
            string filePath = string.Empty;

            objImageInfo = ParseImagePath(objImageInfo);
            string basePath = MediaHelper.tempThumbPath + "/" + objImageInfo.ImagePath;
            MediaHelper.SaveBase64Image(basePath, objImageInfo.ImageName, objImageInfo.Image64Bit.Replace("data:image/jpeg;base64,", ""));
            string serverRootPath = MediaHelper.serverRootPath; //HttpContext.Current.Server.MapPath(@"~\").ToLower();
            filePath = objImageInfo.ImageFullPath; //objImageInfo.ImagePath + "/" + objImageInfo.ImageName;
            basePath = serverRootPath + basePath + "/" + objImageInfo.ImageName;
            //PictureManager.CreateThmnail(basePath, 1920, serverRootPath + MediaHelper.originalThumbPath + filePath);
            //PictureManager.CreateThmnail(basePath, 1320, serverRootPath + MediaHelper.largeThumbPath + filePath);
            //PictureManager.CreateThmnail(basePath, 720, serverRootPath + MediaHelper.mediumThumbPath + filePath);
            //PictureManager.CreateThmnail(basePath, 320, serverRootPath + filePath);
            ImageOptimize objOptimizeImage = new ImageOptimize();
            objOptimizeImage.OptimizeImage(_hostingEnvironment.WebRootPath, basePath, "Media/", objImageInfo.ImageName, System.IO.Path.GetExtension(objImageInfo.ImageName).Replace(".", ""));

            return filePath;
        }

        private ImageInfo ParseImagePath(ImageInfo objImageInfo)
        {
            if (objImageInfo != null)
            {
                objImageInfo.ImagePath = GetFilePath(objImageInfo.ImageFullPath);
                objImageInfo.ImageName = GetFileName(objImageInfo.ImageFullPath, objImageInfo.ImagePath);
            }
            return objImageInfo;
        }

        private string GetFilePath(string fullPath)
        {
            string[] filePath = fullPath.Split('/');
            int filePathLength = filePath.Length;
            string fileName = filePath[filePathLength - 1];
            fileName = fullPath.Replace(fileName, "");
            return fileName;
        }

        private string GetFileName(string fullPath, string basePath)
        {
            //string[] filePath = fullPath.Split('/');
            //int filePathLength = filePath.Length;
            string fileName = Path.GetFileName(fullPath); //filePath[filePathLength - 1];
            fileName = MediaHelper.NewFileName(fileName, basePath);
            return fileName;
        }

        public async Task<string> CopyMedia([FromBody]MediaCategory objMediaCategory)
        {
            string message = string.Empty;
            MediaSettingController mediaSettingController = new MediaSettingController();
            MediaSettingKeys mediaSettingKeys = await mediaSettingController.GetMediaSettingKeyValue();

            string[] extensions = { };
            string rootPath = MediaHelper.GetRootPath(mediaSettingKeys, objMediaCategory, out extensions);
            if (objMediaCategory.UploadType == "category")
            {
                if (objMediaCategory.BaseCategory.ToLower().IndexOf(rootPath.ToLower()) > -1 && objMediaCategory.ParentCategory.ToLower().IndexOf(rootPath.ToLower()) > -1)
                    message = MediaHelper.CopyMediaCategory(objMediaCategory.BaseCategory, objMediaCategory.ParentCategory);

            }
            else
            {
                if (objMediaCategory.BaseCategory.ToLower().IndexOf(rootPath.ToLower()) > -1 && objMediaCategory.ParentCategory.ToLower().IndexOf(rootPath.ToLower()) > -1)
                    message = MediaHelper.CopyMediaFile(objMediaCategory.BaseCategory, objMediaCategory.ParentCategory);
            }

            return message;
        }

        public async Task<string> MoveMedia([FromBody]MediaCategory objMediaCategory)
        {
            string message = string.Empty;
            MediaSettingController mediaSettingController = new MediaSettingController();
            MediaSettingKeys mediaSettingKeys = await mediaSettingController.GetMediaSettingKeyValue();

            string[] extensions = { };
            string rootPath = MediaHelper.GetRootPath(mediaSettingKeys, objMediaCategory, out extensions);
            if (objMediaCategory.BaseCategory.ToLower() != objMediaCategory.ParentCategory.ToLower())
            {
                if (objMediaCategory.UploadType == "category")
                {
                    if (objMediaCategory.BaseCategory.ToLower().IndexOf(rootPath.ToLower()) > -1 && objMediaCategory.ParentCategory.ToLower().IndexOf(rootPath.ToLower()) > -1)
                    {
                        message = MediaHelper.MoveMediaCategory(objMediaCategory.BaseCategory, objMediaCategory.ParentCategory);
                        MediaHelper.MoveMediaFile(MediaHelper.originalThumbPath + objMediaCategory.BaseCategory, MediaHelper.originalThumbPath + objMediaCategory.ParentCategory);
                        MediaHelper.MoveMediaFile(MediaHelper.largeThumbPath + objMediaCategory.BaseCategory, MediaHelper.largeThumbPath + objMediaCategory.ParentCategory);
                        MediaHelper.MoveMediaFile(MediaHelper.mediumThumbPath + objMediaCategory.BaseCategory, MediaHelper.mediumThumbPath + objMediaCategory.ParentCategory);
                    }
                }
                else
                {
                    if (objMediaCategory.BaseCategory.ToLower().IndexOf(rootPath.ToLower()) > -1 && objMediaCategory.ParentCategory.ToLower().IndexOf(rootPath.ToLower()) > -1)
                    {
                        message = MediaHelper.MoveMediaFile(objMediaCategory.BaseCategory, objMediaCategory.ParentCategory);
                        string ext = MediaHelper.GetFileExtension(objMediaCategory.BaseCategory);
                        if (ext == "jpg" || ext == "png" || ext == "jpeg")
                        {
                            MediaHelper.MoveMediaFile(MediaHelper.originalThumbPath + objMediaCategory.BaseCategory, MediaHelper.originalThumbPath + objMediaCategory.ParentCategory);
                            MediaHelper.MoveMediaFile(MediaHelper.largeThumbPath + objMediaCategory.BaseCategory, MediaHelper.largeThumbPath + objMediaCategory.ParentCategory);
                            MediaHelper.MoveMediaFile(MediaHelper.mediumThumbPath + objMediaCategory.BaseCategory, MediaHelper.mediumThumbPath + objMediaCategory.ParentCategory);
                        }
                    }
                }
            }

            return message;
        }


        [HttpPost]
        public async Task<int> AddUpdate([FromBody] MediaSettingInfo mediaSettingInfo)
        {
            MediaSettingController mediaSettingController = new MediaSettingController();
            mediaSettingInfo.MediaSettingID = 1;
            int mediaSettingID = await mediaSettingController.AddUpdate(mediaSettingInfo);

            return mediaSettingID;
        }


        [HttpPost]
        public int DownloadAndSaveImage([FromBody]ImageDownloadInfo downloadInfo)
        {
            return MediaHelper.DownloadAndSaveImage(_hostingEnvironment.WebRootPath, downloadInfo.DownloadURL, downloadInfo.DownloadPath);
        }


        private string EnsureCorrectFilename(string filename)
        {
            if (filename.Contains("\\"))
                filename = filename.Substring(filename.LastIndexOf("\\") + 1);

            return filename;
        }

        private string GetPathAndFilename(string filename)
        {
            return this._hostingEnvironment.WebRootPath + "\\Media\\" + filename;
        }
    }
}