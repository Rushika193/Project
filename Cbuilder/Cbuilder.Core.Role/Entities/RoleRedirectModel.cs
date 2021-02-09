using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Cbuilder.Core.Role
{
    public class RoleRedirectModel
    {
        public int RoleUrlMapID { get; set; }
        public string RoleID { get; set; }
        public string RoleName { get; set; }
        public string RedirectUrl { get; set; }
        public bool IsActive { get; set; }
    }

    public class RoleRedirectPost
    {
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string RedirectUrlXML { get; set; }
        public IEnumerable<RoleRedirectModel> Roles { get; set; }
    }
}
