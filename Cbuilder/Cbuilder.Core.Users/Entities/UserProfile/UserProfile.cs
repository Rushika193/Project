using Cbuilder.Core.Users.Enum;
using System.ComponentModel.DataAnnotations;

namespace Cbuilder.Core.Users
{
    public class UserProfile
    {
       
        public string UserID { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string Username { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string Title { get; set; }
        [Required]
        public string FirstName { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string MiddleName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public Gender GenderID { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string ProfileImage { get; set; }
        [Required]
        [DataType(DataType.PhoneNumber)]
        public string Mobile { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string Phone { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string ResPhone { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string StreetAddress { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string City { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string State { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string PostalCode { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string About { get; set; }

    }
}
