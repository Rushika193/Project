using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Cbuilder.Core.Users
{
    public class UserProfileCreateModel
    {
        public string UserId { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.PhoneNumber)]
        public long PhoneNumber { get; set; }

        [Required]
        public string Country { get; set; }
        public string About { get; set; }
        public IFormFile ProfilePicture { get; set; }
    }
}
