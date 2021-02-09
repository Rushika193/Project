using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Core.Pages
{
    public class PageRolePermission
    {
        public string PageID { get; set; }
        public string RoleID { get; set; }
        public string RoleName { get; set; }
        public string SelectedPageActions { get; set; }
    }

    public class PagePermission
    {
        PageRolePermission PageRole { get; set; }

        List<PageAction> PageActions { get; set; }

    }
}
