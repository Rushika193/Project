using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Core.Users.Entities
{
    public static class UserSettingKeys
    {
        public const string EmailVerification = "RegistrationEmailVerification";
        public const string Captcha = "RegistrationCaptcha";
        public const string RegistrationRoleID = "RegistrationRoleID";
        public const string CaptchaServer = "CaptchaServer";
        public static string GetAllKeys
        {
            get
            {
                return string.Format("{0},{1},{2},{3}",EmailVerification,Captcha,RegistrationRoleID, CaptchaServer);
            }

        }
    }
}
