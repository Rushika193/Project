using System;
using System.ComponentModel.DataAnnotations;

namespace Cbuilder.EmailTemplate
{
    public class EmailTemplate
    {
        public int RowNum { get; set; }
        public int RowTotal { get; set; }
        [Required]
        public int TemplateID { get; set; }
        [Required]
        public string EditDOM { get; set; }
        [Required]
        public string ViewDOM { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Subject { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string ScreenShot { get; set; }
        [Required]
        public int CategoryID { get; set; }
        public string Category { get; set; }
        public string Identifier { get; set; }
        public int SiteID { get; set; }
        public string CultureCode { get; set; }
        public bool IsSystem { get; set; }
        public bool IsActive { get; set; }
        public DateTime AddedOn { get; set; }
        public string AddedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
    }
}
