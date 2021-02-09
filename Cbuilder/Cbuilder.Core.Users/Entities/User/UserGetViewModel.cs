using Cbuilder.Core.Role;
using System.Collections.Generic;

namespace Cbuilder.Core.Users
{
    public class UserGetViewModel : UserViewModel
    {   
        public IEnumerable<RoleViewModel> UserInRoles { get; set; }
        public int TotalRow { get; set; }
        public string RoleNames { get; set; }
    }
}
