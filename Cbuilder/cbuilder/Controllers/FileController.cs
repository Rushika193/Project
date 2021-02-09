using Cbuilder.Core.Constants;
using Cbuilder.Core.Helper.Models;
using Cbuilder.Core.Helper.Security;
using Cbuilder.Core.MediaManagement;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Cbuilder.Controllers
{
    public class FileController : Controller
    {

        public async Task<JsonResult> FileUploader(IList<IFormFile> files, string destination, bool isCrop, string allowExt = "")
        {
            if (string.IsNullOrEmpty(destination))
                return Json(new FileUploadResponse() { messages = new List<string>() { "Error" } });
            string basePath = FileUploadHelper.DecryptString(destination);
            //else
            //{
            //    basePath = Path.Combine(CurrentHostEnvironment.WebRootPath, "upload");
            //}
            if (!string.IsNullOrEmpty(allowExt))
                allowExt = FileUploadHelper.DecryptString(allowExt);
            var result = new FileUploadHelper().FileUpload(files, basePath, isCrop, allowExt);
            return Json(result);
        }
    }
}