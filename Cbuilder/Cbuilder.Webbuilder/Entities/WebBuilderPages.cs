
using System;

namespace Cbuilder.Webbuilder
{
    public class WebBuilderPages
    {
        public Guid PageID { get; set; }
        public int WebbuilderID { get; set; }
        public string PageName { get; set; }
        public bool ShowHeader { get; set; }
        public bool ShowFooter { get; set; }
    }
}
