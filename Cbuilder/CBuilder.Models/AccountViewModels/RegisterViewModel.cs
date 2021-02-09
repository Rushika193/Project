using Cbuilder.Core.Users;
using Cbuilder.Core.Users.Enum;
using System.ComponentModel.DataAnnotations;

namespace Cbuilder.Core.Models.AccountViewModels
{
    public class RegisterViewModel : UserProfile
    {
        [Required]
        // [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        // [RegularExpression("^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^a-zA-Z0-9])|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])).{8,}$", ErrorMessage = "Passwords must be at least 8 characters and contain at 3 of 4 of the following: upper case (A-Z), lower case (a-z), number (0-9) and special character (e.g. !@#$%^&*)")]

        public string Password { get; set; }
        public string ConfirmPassword { get; set; }

        public string Captcha { get; set; }
        public string Cbuildercaptcharesponse { get; set; }

        /// <summary>
        /// Subscribe News leter
        /// </summary>
        public bool IsSubscribe { get; set; }
        public string ReturnURL { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        new public string FirstName { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        new public string LastName { get; set; }

        [DisplayFormat(ConvertEmptyStringToNull = false)]
        new public string Mobile { get; set; }

    }
}
