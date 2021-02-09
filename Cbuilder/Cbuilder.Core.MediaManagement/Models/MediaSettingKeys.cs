using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Core.MediaManagement
{
    public class MediaSettingKeys
    {
        public string FolderName { get; set; }
        public string MediaVisibility { get; set; }
        public string MediaReadLocation { get; set; }
        public string MediaIgnoreFolders { get; set; }
        public bool AllowCategory { get; set; }
        public string ImageExtension { get; set; }
        public string VideoExtension { get; set; }
        public string DocumentExtension { get; set; }
        public bool OptimizeImage { get; set; }
        public int ScaleImage { get; set; }
    }
}
