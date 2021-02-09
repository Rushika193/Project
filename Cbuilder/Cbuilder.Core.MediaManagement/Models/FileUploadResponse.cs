using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Core.MediaManagement
{
    public class FileUploadResponse
    {
        public List<string> messages { get; set; }
        public string filePath { get; set; }
        public int status { get; set; } = 0;
        public List<string> files { get; set; }
    }
}
