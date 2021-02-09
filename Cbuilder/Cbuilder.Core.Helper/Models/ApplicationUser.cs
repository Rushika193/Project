using Microsoft.AspNetCore.Identity;

namespace Cbuilder.Core.Helper.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
        //public bool IsAdministrator { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public string UsersRoles { get; set; }
        public string UserID { get; set; }
        public int SessionExpiry { get; set; }
    }
}
