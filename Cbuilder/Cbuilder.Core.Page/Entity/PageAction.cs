using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Core.Pages
{
    public class PageAction
    {
        public Guid PageActionID { get; set; }       
        public Guid PageID { get; set; }
        public string ActionName { get; set; }
        public string DisplayName { get; set; }
        public string PageName { get; set; }
        public string AreaName { get; set; }
        public int ActionGroupID { get; set; }
        public string GroupName { get; set; }
    }
}
