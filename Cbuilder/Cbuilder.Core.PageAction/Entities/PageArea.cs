using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.Core.PageAction
{
    public class PageArea
    {
        public Guid? AreaID { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Area Name must be less than {1} characters.")]
        [Display(Name = "Area Name")]
        public string AreaName { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Display Name must be less than {1} characters.")]
        [Display(Name = "Display Name")]
        public string DisplayName { get; set; }

        [Required]
        [StringLength(500, ErrorMessage = "Description Name must be less than {1} characters.")]
        [Display(Name = "Description")]
        public string Description { get; set; }
    }
}

