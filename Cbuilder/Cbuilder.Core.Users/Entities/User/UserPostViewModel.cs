using System.Collections.Generic;

namespace Cbuilder.Core.Users
{
    public class UserPostViewModel : UserViewModel
    {
        //  [Required,MinLength(1,ErrorMessage = "Please select atleast one role.")]

        [UserCustomValidate(1, ErrorMessage = "At least one role must be selected!")]
        public IEnumerable<string> UserInRoles { get; set; }
    }


}
