using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Cbuilder.Core.MediaManagement;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;


namespace Cbuilder.ViewComponents
{
    public class MediaImagesViewComponent : ViewComponent
    {

        public async Task<IViewComponentResult> InvokeAsync(string folderName, string filterText, MediaSettingKeys mediaSettingKeys)
        {
            MediaLibraryInfo libraryInfo = new MediaLibraryInfo();


            MediaCategory mediaCategory = new MediaCategory(); //Get Username here later

            if (string.IsNullOrEmpty(folderName))
                mediaCategory.BaseCategory = (mediaSettingKeys.MediaReadLocation == MediaReadLocationType.System) ? "" : mediaSettingKeys.FolderName;
            else
                mediaCategory.BaseCategory = folderName;
            MediaSettingController settingController = new MediaSettingController();
            if (!string.IsNullOrEmpty(filterText))
                libraryInfo.MediaCategories = MediaHelper.FileterDirectoryAndFiles(mediaCategory.BaseCategory, filterText);
            else if (string.IsNullOrEmpty(mediaCategory.BaseCategory))
                libraryInfo.MediaCategories = MediaHelper.GetMediaCategory(mediaCategory, mediaSettingKeys);
            else
                libraryInfo.MediaCategories = MediaHelper.GetMediaCategoryByPath(mediaCategory, mediaSettingKeys);
            libraryInfo.MediaSettingKeys = mediaSettingKeys;
            return await Task.FromResult((IViewComponentResult)View("Default", libraryInfo));
        }
        //public string[] GetMediaCategory(MediaCategory objMediaCategory, MediaSettingKeys mediaSettingKeys)
        //{
        //    string[] extensions = { };
        //    string rootPath = GetRootPath(mediaSettingKeys, objMediaCategory, out extensions);
        //    //string[] categotyList = MediaHelper.ReadDirectoryAndFiles(rootPath);
        //    string[] categotyList = MediaHelper.ReadDirectoryAndFiles(rootPath, string.Empty, extensions);
        //    return categotyList;
        //}

        //private string GetRootPath(MediaSettingKeys mediaSettingKeys, MediaCategory mediaCategory, out string[] extensions)
        //{
        //    string rootPath = string.Empty;
        //    if (mediaSettingKeys != null)
        //    {
        //        extensions = filterExtensions(mediaCategory, mediaSettingKeys);
        //        if (mediaSettingKeys.MediaReadLocation.ToLowerInvariant() == MediaReadLocationType.System)
        //        {
        //            rootPath = string.Empty;
        //        }
        //        else
        //        {
        //            rootPath = mediaSettingKeys.FolderName;
        //        }

        //        if (mediaSettingKeys.MediaVisibility.ToLowerInvariant() == MediaVisibilityType.UserWise)
        //        {
        //            rootPath += "/" + mediaCategory.UserName;
        //        }
        //    }
        //    else
        //    {
        //        extensions = null;
        //    }

        //    return rootPath;

        //}

        //private string[] filterExtensions(MediaCategory objMedaicategory, MediaSettingKeys objsettingInfo)
        //{
        //    string ext = string.Empty;
        //    switch (objMedaicategory.UploadType)
        //    {
        //        case "image":
        //            ext = objsettingInfo.ImageExtension;
        //            break;
        //        case "video":
        //            ext = objsettingInfo.VideoExtension;
        //            break;
        //        case "document":
        //            ext = objsettingInfo.DocumentExtension;
        //            break;
        //        default:
        //            ext = objsettingInfo.ImageExtension + "," + objsettingInfo.VideoExtension + "," + objsettingInfo.DocumentExtension;
        //            break;
        //    }
        //    string[] extensions = ext.Split(',');
        //    return extensions;
        //}

        private List<string> GetFolders(string basePath)
        {
            var files = Directory.GetFiles(basePath);
            return null;
        }


    }
}
