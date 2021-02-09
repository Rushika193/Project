using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Core.MediaManagement
{
    public class MediaCategory
    {
        public string BaseCategory { get; set; }
        public string ParentCategory { get; set; }
        public string UserName { get; set; }
        public string Filter { get; set; }
        public string secureToken { get; set; }
        public int MediaSettingID { get; set; }
        public string UploadType { get; set; }

        public string NewCategory { get; set; }
    }
  
}
