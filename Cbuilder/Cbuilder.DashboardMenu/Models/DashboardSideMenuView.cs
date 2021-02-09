using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.DashboardMenu
{
    public class DashboardSideMenuView
    {
        public int TotalRow { get; set; }
        public Guid LinkID { get; set; }
        public string LinkTitle { get; set; }
        public string Area { get; set; }
        public string Action { get; set; }
        public string Controller { get; set; }
        public string Param { get; set; }
    }
}
