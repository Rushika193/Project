using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Core.Pages
{
    public class AdminPage
    {
        public Guid PageID { get; set; }
        public string AreaName { get; set; }
        public string PageName { get; set; }
        public string DisplayName { get; set; }
        public string Description { get; set; }
        public int ControllerType { get; set; }
        public string ControllerTypeName { get; set; }
        public int RowTotal { get; set; }
    }
}
