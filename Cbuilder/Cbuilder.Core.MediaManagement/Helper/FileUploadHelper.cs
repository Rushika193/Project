using Cbuilder.Core.Helper.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;

namespace Cbuilder.Core.MediaManagement
{
    public class FileUploadHelper
    {
        public FileUploadResponse FileUpload(IList<IFormFile> files, string basePath, bool thubnail, string allowExt)
        {
            FileUploadResponse res = new FileUploadResponse();
            res.files = new List<string>();
            res.messages = new List<string>();

            string newFileName;
            try
            {
                DirectoryInfo baseDirectory = new DirectoryInfo(basePath);

                if (!baseDirectory.Exists)
                    baseDirectory.Create();
                foreach (IFormFile file in files)
                {
                    string extension = GetExtension(file.FileName);
                    bool isValidextension = EnsureValidFile(extension, allowExt);
                    if (!isValidextension)
                    {
                        res.messages.Add(file.FileName + " not valid file extension");
                        return res;
                    }
                    if (thubnail && EnsureImage(extension))
                    {
                        newFileName = FileCropExecution(file, basePath, extension);
                        res.files.Add(newFileName);
                        res.messages.Add(newFileName + " uploaded successfully.");
                    }
                    else
                    {
                        newFileName = FileUploadExecution(file, basePath);
                        res.files.Add(newFileName);
                        res.messages.Add(newFileName + " uploaded successfully.");
                    }
                }
                res.status = 1;
                res.filePath = basePath.Replace(CurrentHostEnvironment.WebRootPath, "").Replace("wwwroot","").Replace("//", "/").Replace("\\", "/") + "/";
                return res;
            }
            catch
            {
                throw;
            }
        }
        private string FileUploadExecution(IFormFile file, string uploadPath)
        {
            try
            {
                string filename = MediaHelper.NewFileName(file.FileName.ToLower(), uploadPath);
                using (FileStream tempUploadPath = System.IO.File.Create(Path.Combine(uploadPath, filename)))
                    file.CopyTo(tempUploadPath);
                return filename;
            }
            catch
            {
                throw;
            }
        }

        private string FileCropExecution(IFormFile file, string uploadPath, string fileExtension)
        {
            try
            {
                string filename = MediaHelper.NewFileName(file.FileName.ToLower(), uploadPath);
                string tempPath = uploadPath;

                if (!Directory.Exists(tempPath))
                    Directory.CreateDirectory(tempPath);
                tempPath = Path.Combine(tempPath, filename);
                using (FileStream tempPath1 = System.IO.File.Create(tempPath))
                    file.CopyTo(tempPath1);

                ImageOptimize objOptimizeImage = new ImageOptimize();
                List<MediaThubnailInfo> lst = objOptimizeImage.GetStandardThubnails(uploadPath, filename);
                foreach (var p in lst)
                {
                    if (!Directory.Exists(p.SavePath))
                        Directory.CreateDirectory(p.SavePath);
                }
                objOptimizeImage.OptimizeImage(tempPath, false, fileExtension, lst);

                return filename;
            }
            catch
            {
                throw;
            }
        }
        private static bool EnsureValidFile(string extension, string allowedExtensions)
        {

            if (string.IsNullOrEmpty(allowedExtensions))
            {
                var exts = Enum.GetNames(typeof(FileExtensionEnum));
                foreach (string ext in exts)
                {
                    if (ext == extension.ToUpper())
                        return true;
                }
            }
            else
            {
                List<string> AllowedStringList = allowedExtensions.Split(",").ToList();
                bool exists = AllowedStringList.Exists(x => x.Trim().ToLower() == extension.Trim().ToLower());
                return exists;
            }

            return false;
        }
        private static bool EnsureImage(string extension)
        {
            string[] exts = Enum.GetNames(typeof(ImageExtensionEnum));
            foreach (string ext in exts)
            {
                if (ext == extension.ToUpper())
                    return true;
            }
            return false;

        }
        public static string EncryptString(string normalString)
        {
            string cipherText = Cbuilder.Core.Helper.Security.Encryption.EncryptString(normalString);
            cipherText = WebUtility.UrlEncode(cipherText);
            return cipherText;
        }
        public static string DecryptString(string cipherText)
        {
            //cipherText = WebUtility.UrlDecode(cipherText);
            string normalString = Cbuilder.Core.Helper.Security.Encryption.DecryptString(cipherText);
            return normalString;
        }
        private static string GetExtension(string fileName)
        {
            int index = fileName.LastIndexOf('.');
            string ext = fileName.Substring(index + 1, (fileName.Length - index) - 1);
            return ext;
        }
    }
}
