using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Webbuilder
{
    public class WebbuilderPage : PageDetail
    {
        public Guid PageID { get; set; }
        public string Description { get; set; } = string.Empty;
        public string ActionName { get; set; } = string.Empty;
        public string AreaName { get; set; } = string.Empty;
        public string PageComponent { get; set; } = string.Empty;
        public string HeaderFooterComponent { get; set; } = string.Empty;
        public int WebBuilderID { get; set; }
        public int CloneWebBuilderID { get; set; }
        public string KeyWords { get; set; }
        public string Culture { get; set; }
        public string Mode { get; set; }
    }
}