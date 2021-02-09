using System.ComponentModel.DataAnnotations;

namespace Cbuilder.Core.Models.AccountViewModels
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string UserName { get; set; }
        public string CaptchaValue { get; set; }
        public string CaptchaResponse { get; set; }
        
    }
}
