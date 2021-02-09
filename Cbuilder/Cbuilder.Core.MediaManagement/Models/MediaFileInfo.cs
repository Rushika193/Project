using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Http;
namespace Cbuilder.Core.MediaManagement
{
   public class MediaFileInfo
    {
        public IFormFile FormFile { get; set; }
        public string Extension { get; set; }
        public string RootPath { get; set; }
        public string Quality { get; set; }
        public string Type { get; set; }

    }
}
