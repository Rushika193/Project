using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Core.Users.Entities
{
    public class UserBasicInfo
    {
        public  string UserName { get; set; }
        public  string NormalizedUserName { get; set; }
        public  string Email { get; set; }
        public  string NormalizedEmail { get; set; }
        public  bool EmailConfirmed { get; set; }
        public  string SecurityStamp { get; set; }
        public string PasswordHash { get; set; }
        public  string ConcurrencyStamp { get; set; }
        public  string PhoneNumber { get; set; }
        public  bool PhoneNumberConfirmed { get; set; }
        public  bool TwoFactorEnabled { get; set; }
        public string LoginProvider { get; set; }
    }
}
