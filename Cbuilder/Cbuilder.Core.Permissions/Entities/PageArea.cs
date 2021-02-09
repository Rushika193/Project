using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Core.Permissions
{
    public class PageArea
    {
        public Guid AreaID { get; set; }
        public string AreaName { get; set; }

        public string DisplayName { get; set; }
        public string Description { get; set; }        
    }
}
