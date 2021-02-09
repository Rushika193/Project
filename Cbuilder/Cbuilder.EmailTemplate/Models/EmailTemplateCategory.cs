using System;

namespace Cbuilder.EmailTemplate
{
    public class EmailTemplateCategory
    {
        public int CategoryID { get; set; }
        public string CategoryName { get; set; }
        public int SiteID { get; set; }
        public bool IsSystem { get; set; }
        public bool IsActive { get; set; }
        public string AddedBy { get; set; }
    
    }
}
