using System;
using System.Collections.Generic;
using System.Text;
using SageFrame.Web;
using System.Web;
using Microsoft.AspNetCore.Http;
using Cbuilder.Core.Constants;

namespace Cbuilder.Core.Helper
{
    /// <summary>
    /// Application common api about pages and URL.
    /// </summary>
    public partial class PortalAPI
    {
        private readonly IHttpContextAccessor _IHttpContextAccessor;
        private readonly HttpContext _httpContext;
        public PortalAPI(IHttpContextAccessor httpContextAccessor)
        {
            _IHttpContextAccessor = httpContextAccessor;
            _httpContext = _IHttpContextAccessor.HttpContext;
        }

        # region "Page Name With Extension only"
        /// <summary>
        /// Get application page with extension.
        /// </summary>
        public string RegistrationPageWithExtension
        {
            get
            {
                return BuildPageNameWithExtension(SettingKeys.RegistrationPage);
            }
        }
        /// <summary>
        /// Get login page with extension.
        /// </summary>
        public string LoginPageWithExtension
        {
            get
            {
                return BuildPageNameWithExtension(SettingKeys.Loginpage);
            }
        }
        /// <summary>
        /// Get application default page with extension.
        /// </summary>
        public string DefaultPageWithExtension
        {
            get
            {
                return BuildPageNameWithExtension(SettingKeys.DefaultPage);
            }
        }
        /// <summary>
        /// Get application profile page with extension.
        /// </summary>
        public string ProfilePageWithExtension
        {
            get
            {
                return BuildPageNameWithExtension(SettingKeys.UserProfilePage);
            }
        }
        /// <summary>
        /// Get application forgot password page with extension.
        /// </summary>
        public string ForgotPasswordPageWithExtension
        {
            get
            {
                return BuildPageNameWithExtension(SettingKeys.ForgotPassword);
            }
        }
        /// <summary>
        /// Get application page not found page with extension.
        /// </summary>
        public string PageNotFoundPageWithExtension
        {
            get
            {
                return BuildPageNameWithExtension(SettingKeys.PageNotFound);
            }
        }
        /// <summary>
        /// Get application password recovery page with extension.
        /// </summary>
        public string PasswordRecoveryPageWithExtension
        {
            get
            {
                return BuildPageNameWithExtension(SettingKeys.PasswordRecovery);
            }
        }
        /// <summary>
        /// Get application page not accessible page with extension.
        /// </summary>
        public string PageNotAccessiblePageWithExtension
        {
            get
            {
                return BuildPageNameWithExtension(SettingKeys.PageNotAccessible);
            }
        }
        #endregion

        #region "WithOut Root URL"
        /// <summary>
        ///  Get application registration url without root path.
        /// </summary>
        public string RegistrationURL
        {
            get
            {
                return BuildURL(SettingKeys.RegistrationPage, false);
            }
        }
        /// <summary>
        /// Get application login url without root path.
        /// </summary>
        public string LoginURL
        {
            get
            {
                return BuildURL(SettingKeys.Loginpage, false);
            }
        }
        /// <summary>
        /// Get application default url without root path.
        /// </summary>
        public string DefaultPageURL
        {
            get
            {
                return BuildURL(SettingKeys.DefaultPage, false);
            }
        }
        /// <summary>
        /// Get application profile page url without root path.
        /// </summary>
        public string ProfilePageURL
        {
            get
            {
                return BuildURL(SettingKeys.UserProfilePage, false);
            }
        }
        /// <summary>
        /// Get application forgot password url without root path.
        /// </summary>
        public string ForgotPasswordURL
        {
            get
            {
                return BuildURL(SettingKeys.ForgotPassword, false);
            }
        }
        /// <summary>
        /// Get application page not found url without root path.
        /// </summary>
        public string PageNotFoundURL
        {
            get
            {
                return BuildURL(SettingKeys.PageNotFound, false);
            }
        }
        /// <summary>
        /// Get application password recovery url without root path.
        /// </summary>
        public string PasswordRecoveryURL
        {
            get
            {
                return BuildURL(SettingKeys.PasswordRecovery, false);
            }
        }
        /// <summary>
        /// Get application page not accessible url without root path.
        /// </summary>
        public string PageNotAccessibleURL
        {
            get
            {
                return BuildURL(SettingKeys.PageNotAccessible, false);
            }
        }

        #endregion

        #region "With Root URL"
        /// <summary>
        ///  Get application registration url with  root path.
        /// </summary>
        public string RegistrationURLWithRoot
        {
            get
            {
                return BuildURL(SettingKeys.RegistrationPage, true);
            }
        }
        /// <summary>
        ///  Get application login url with root path.
        /// </summary>
        public string LoginURLWithRoot
        {
            get
            {
                return BuildURL(SettingKeys.Loginpage, true);
            }
        }
        /// <summary>
        ///  Get application default page url with root path.
        /// </summary>
        public string DefaultPageURLWithRoot
        {
            get
            {
                return BuildURL(SettingKeys.DefaultPage, true);
            }
        }
        /// <summary>
        ///  Get application profile page url with root path.
        /// </summary>
        public string ProfilePageURLWithRoot
        {
            get
            {
                return BuildURL(SettingKeys.UserProfilePage, true);
            }
        }
        /// <summary>
        ///  Get application forgot password url with root path.
        /// </summary>
        public string ForgotPasswordURLWithRoot
        {
            get
            {
                return BuildURL(SettingKeys.ForgotPassword, true);
            }
        }
        /// <summary>
        ///  Get application page not found url with root path.
        /// </summary>
        public string PageNotFoundURLWithRoot
        {
            get
            {
                return BuildURL(SettingKeys.PageNotFound, true);
            }
        }
        /// <summary>
        ///  Get application password recovery url with root path.
        /// </summary>
        public string PasswordRecoveryURLWithRoot
        {
            get
            {
                return BuildURL(SettingKeys.PasswordRecovery, true);
            }
        }
        /// <summary>
        ///  Get application page not accessible url with root path.
        /// </summary>
        public string PageNotAccessibleURLWithRoot
        {
            get
            {
                return BuildURL(SettingKeys.PageNotAccessible, true);
            }
        }

        #endregion

        /// <summary>
        /// Returns application path.
        /// </summary>
        public string GetApplicationName
        {
            get
            {
                return string.Empty;
            }
        }

        #region "Private Methods"
        /// <summary>
        /// Return page name with pageextension.
        /// </summary>
        /// <param name="settingKey">SageFrame settingkey</param>
        /// <returns>string</returns>
        private string BuildPageNameWithExtension(string settingKey)
        {
            StringBuilder strBuilder = new StringBuilder();
            SettingHelper settingHelper = new SettingHelper();
            string url = settingHelper.GetSettingValueByIndividualKey(settingKey).Result;
            strBuilder.Append(ReplaceString(url));
            //strBuilder.Append(SettingKeys.PageExtension);
            return strBuilder.ToString();
        }
        /// <summary>
        /// Return application url.
        /// </summary>
        /// <param name="settingKey">SageFrame setting key</param>
        /// <param name="withRoot">Boolean variable to check for inculding a root path.</param>
        /// <returns>string</returns>
        private string BuildURL(string settingKey, bool withRoot)
        {
            string url = string.Empty;
            try
            {
                StringBuilder strBuilder = new StringBuilder();
                SettingHelper settingHelper = new SettingHelper();

                if (withRoot)
                {
                    strBuilder.Append($"{_httpContext.Request.Host}{_httpContext.Request.PathBase}");
                }
                strBuilder.Append(GetApplicationName);
                strBuilder.Append("/");
                strBuilder.Append(ReplaceString(settingHelper.GetSettingValueByIndividualKey(settingKey).Result));
                //strBuilder.Append(SettingKeys.PageExtension);
                url = strBuilder.ToString();
            }
            catch
            {
            }
            return url;
        }
        /// <summary>
        /// Replaces "blank sapce" with "-" and "&" with "-and-" and returns page name
        /// </summary>
        /// <param name="strPageName">Page name.</param>
        /// <returns>string</returns>
        public string ReplaceString(string strPageName)
        {
            strPageName = strPageName.Replace(" ", "-");
            strPageName = strPageName.Replace("&", "-and-");
            return strPageName;
        }

        #endregion
    }
}