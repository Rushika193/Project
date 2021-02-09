using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.Webbuilder
{
    public class WebbuilderViewGetInfo
    {
        public string Culture { get; set; }
        public string PageName { get; set; }
        public int SiteID { get; set; }
        public bool PreviewMode { get; set; } = false;

    }
}
