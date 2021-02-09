using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Core.Role
{
    public class PageList
    {
        public int PageID { get; set; }
        public int AreaID { get; set; }
        public string PageName { get; set; }
        public string DisplayName { get; set; }
        public string Details { get; set; }
        public bool IsActive { get; set; }
        public bool IsAdmin { get; set;}
    }
}
