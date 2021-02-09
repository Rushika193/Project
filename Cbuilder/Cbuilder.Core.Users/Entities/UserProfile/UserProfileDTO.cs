using Cbuilder.Core.Users.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Core.Users
{
    public class UserProfileDTO
    {
        public string UserID { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string SecondaryEmail { get; set; }
        public string ProfileImage { get; set; }
        public Gender Gender { get; set; } = Gender.NotProvided;
        public DateTime? DateOfBirth { get; set; } = null;

        public string About { get; set; }
        public string UserAddress { get; set; }
        public string UpdatedBy { get; set; }
    }
}
