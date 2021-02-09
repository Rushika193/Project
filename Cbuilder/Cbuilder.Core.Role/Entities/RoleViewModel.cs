using Cbuilder.Core.Permissions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace Cbuilder.Core.Role
{
    public class RoleViewModel
    {
        [HiddenInput]
        public string ID { get; set; }

        [Required(ErrorMessage = "Role name is required.")]
        [StringLength(256, ErrorMessage = "Role name must be less than {1} characters.")]
        [Display(Name = "Role Name")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Alias name is required.")]
        [StringLength(256, ErrorMessage = "Alias name must be less than {1} characters.")]
        [Display(Name = "Alias Name")]
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string AliasName { get; set; }

        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string Description { get; set; }
        public bool IsSystem { get; set; }
        public bool CanEdit { get; set; }
        public bool IsActive { get; set; }
        public bool Enabled { get; set; }
        public string SelectedPageActions { get; set; }
    }    
    public class RolePermission
    {
       public RoleViewModel RoleViewModel { get; set; }
       public IList<PageAction> PageActions { get; set; }
    }

}
