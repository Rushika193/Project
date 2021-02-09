using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Core.Helper.Models
{
    public class CustomMultiselect
    {
        
        public CustomMultiselect(List<SelectListItem> Items, string GroupName) {
            this.GroupName = GroupName;
            this.Items = Items;
        }
        public List<SelectListItem> Items { get; }
        public string GroupName { get; }
    }
}
