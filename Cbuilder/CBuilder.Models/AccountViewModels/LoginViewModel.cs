using System.ComponentModel.DataAnnotations;

namespace Cbuilder.Core.Models.AccountViewModels
{
    public class LoginViewModel
    {
        [Required]
//        [EmailAddress]
        public string UserEmail { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string UserPassword { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
        public string ReturnURL { get; set; }
        public string cbuildercaptcharesponse { get; set; }
        public string CaptchaAnswer { get; set; }
    }
}
