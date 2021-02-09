using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Core.MediaManagement
{
    public class ImageDomInfo
    {
        public string FilePath { get; set; }
        public string FileName { get; set; }
        public string FileExtension { get; set; }
        public string FileNameOnly { get; set; }
        public bool IsFolder { get; set; }
        public bool IsThumbNails { get; set; }
        public bool IsImageExtension { get; set; }
        public bool IsVideoExtension { get; set; }
        public bool IsDocumentExtension { get; set; }

    }
}
