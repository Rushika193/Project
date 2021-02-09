using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.Webbuilder
{
    public class WebbuilderViewInfo
    {
        public string Settings { get; set; }
        public string ViewDOM { get; set; }
        public string Header { get; set; }
        public string Footer { get; set; }

        public string PageName { get; set; }
        public string APIResultString { get; set; }
        public string AppsExtraComponent { get; set; }
        public string HostURL { get; set; }
        public bool PreviewMode { get; set; } = false;
        public string Webbuildermodulepath { get; set; } = "/modules/webbuilder";


    }
}
