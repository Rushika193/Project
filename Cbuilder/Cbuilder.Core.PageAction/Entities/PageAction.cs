using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.Core.PageAction
{
    public class PageAction
    {
        public Guid? PageActionID { get; set; }
        public Guid? PageID { get; set; }
        public Guid? AreaID { get; set; }

        [Display(Name = "Page Name")]
        public string PageName { get; set; }

        [Display(Name = "Area Name")]
        public string AreaName { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Name must be less than {1} characters.")]
        [Display(Name = "Action Name")]
        public string ActionName { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Name must be less than {1} characters.")]
        [Display(Name = "Display Name")]
        public string DisplayName { get; set; }

        [Required]
        [StringLength(500, ErrorMessage = "Name must be less than {1} characters.")]
        [Display(Name = "Description")]
        public string Description { get; set; }

        [Required]
        [Display(Name = "Action Group")]
        public int ActionGroupID { get; set; }

        public int RowTotal { get; set; }

        public string SelectedService { get; set; }
        public string SelectedIdentity { get; set; }
    }
    public class ServiceAction
    {
        public Guid ServiceActionID { get; set; }
        public Guid PageID { get; set; }
        public string ServiceName { get; set; }
        public string PageName { get; set; }
        public string AreaName { get; set; }
        public int ActionGroupID { get; set; }
        public string GroupName { get; set; }
    }

    public class ServiceActionBind {
        public PageAction PageAction { get; set; }
        public IList<ServiceAction> ServiceActionList { get; set; }
    }

    public class IdentityAction
    {
        public int ScopeID { get; set; }
        public string ScopeName { get; set; }
        public bool IsForAllRole { get; set; }
    }

    public class IdentiyActionBind
    { 
        public PageAction PageAction { get; set; }
        public IList<IdentityAction> IdentiyActionList { get; set; }
    }

}

