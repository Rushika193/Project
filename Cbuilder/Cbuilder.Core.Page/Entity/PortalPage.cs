using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Cbuilder.Core.Pages
{
     public class PortalPage
    {
        public Guid? PageID { get; set; }

        [Required]
        public string PageName { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string KeyWords { get; set; }
        public bool IsActive { get; set; }
        public int RowTotal { get; set; }
    }
}
