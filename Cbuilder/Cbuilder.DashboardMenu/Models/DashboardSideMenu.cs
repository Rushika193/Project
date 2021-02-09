using Microsoft.AspNetCore.Mvc;
using System;
using System.ComponentModel.DataAnnotations;

namespace Cbuilder.DashboardMenu
{
    public class DashboardSideMenu
    {
        [HiddenInput]

        public Guid? LinkID { get; set; }
        [Required(ErrorMessage = "Link title is required.")]
        public string LinkTitle { get; set; }
        public Guid Area { get; set; }
        public Guid Controller { get; set; }
        public Guid Action { get; set; }
        public string Culture { get; set; }
        public Guid? ParentID { get; set; }
        [Required(ErrorMessage = "Icon class is required.")]
        public string PageIcon { get; set; }
        public bool IsParent { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string Param { get; set; }
        public int DisplayOrder { get; set; }
        public string URL { get; set; }
    }
}
