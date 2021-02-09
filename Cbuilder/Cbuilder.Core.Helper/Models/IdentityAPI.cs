using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cbuilder.Core.Helper.Classes.Models
{
    public class IdentityAPI
    {
        private const string Version = "v1";
        public static class Resource
        {
            private const string ApiPath = "/api/" + Version + "/Resource/";
            public const string GetAll = ApiPath + "GetAll";
            public const string Create = ApiPath + "Create";
            public const string Update = ApiPath + "Update";
            public const string GetByClientID = ApiPath + "GetAllByClientID";
            public const string GetByAppsType = ApiPath + "GetAllByAppsType";
            public const string GetAllAppsType = ApiPath + "GetAllAppsType";
            public const string GetAllByType = ApiPath + "GetAllByType";
            public const string GetByID = ApiPath + "GetByID";
            public const string RemoveByID = ApiPath + "RemoveByID";
            public const string GetTypes = ApiPath + "GetTypes";
            public const string CreateScope = ApiPath + "createScope";
            public const string UpdateScope = ApiPath + "updateScope";
            public const string GetScopeByID = ApiPath + "GetScopeByID";
            public const string GetScopeByResourceID = ApiPath + "GetScopeByResourceID";
            public const string GetScopeGroupByResourceID = ApiPath + "GetScopeGroupByResourceID";
            public const string GetAllScopeGroup = ApiPath + "GetAllScopeGroup";
            public const string RemoveScopeByID = ApiPath + "RemoveScopeByID";
        }
        public static class Client
        {
            private const string ApiPath = "/api/" + Version + "/Client/";
            public const string GetAll = ApiPath + "GetAll";
            public const string Create = ApiPath + "Create";
            public const string Delete = ApiPath + "Delete";
            public const string Update = ApiPath + "Update";
            public const string GetByClientID = ApiPath + "GetByClientID";
            public const string GetByID = ApiPath + "GetByID";
            public const string Enable = ApiPath + "EnableDisable";
            public const string NonEditable = ApiPath + "NonEditable";

        }
        public static class ClientSecrets
        {
            private const string ApiPath = "/api/" + Version + "/ClientSecrets/";
            public const string Create = ApiPath + "Create";
            public const string Delete = ApiPath + "Delete";
            public const string Update = ApiPath + "Update";
            public const string GetByClientID = ApiPath + "GetByClientID";
            public const string GetByID = ApiPath + "GetByID";
            public const string GetSecretType = ApiPath + "GetSecretType";
            public const string UpdateSecret = ApiPath + "UpdateSecret";
        }
        public static class Account
        {
            private const string ApiPath = "/api/" + Version + "/Account/";
            public const string PasswordSignInAsync = ApiPath + "PasswordSignInAsync";
            public const string PasswordSignOutAsync = ApiPath + "PasswordSignOutAsync";
            public const string RefreshAccessToken = ApiPath + "RefreshAccessToken";
            public const string LockOutAccount = ApiPath + "LockOut";
            public const string AuthenticateExternalLogin = ApiPath + "AuthenticateExternalLogin";
            public const string GetExternalActiveLogin = ApiPath + "GetActiveExternalLogin";
            public const string ExternalLogin = "/ExternalLogin/Login";
        }
        public static class Password
        {
            private const string ApiPath = "/api/" + Version + "/Password/";
            public const string Update = ApiPath + "UpdatePassword";
            public const string Reset = ApiPath + "ResetPassword";
            public const string GetFormat = ApiPath + "GetPasswordFormat";

        }

        public static class ForgotPassword
        {
            private const string ApiPath = "/api/" + Version + "/PasswordRecovery/";
            public const string Forget = ApiPath + "Forget";
            public const string ResetPassword = ApiPath + "ResetPassword";
            public const string CheckRecoveryToken = ApiPath + "CheckRecoveryToken";

        }
        public static class CountryRegion
        {
            private const string ApiPath = "/api/" + Version + "/CountryRegion/";
            public const string GetCountries = ApiPath + "GetAllCountries";
            public const string GetCountriesByRegion = ApiPath + "GetAllCountriesByRegion";
            public const string GetStates = ApiPath + "GetStates";

        }
        public static class AccountSettings
        {
            private const string ApiPath = "/api/" + Version + "/AccountSetting/";
            public const string GetOauthSettingForms = ApiPath + "GetOauthSettingForm";
            public const string GetOauthSetting = ApiPath + "GetOauthSetting";
            public const string SaveOauthSetting = ApiPath + "SaveOauthSetting";
           


        }
        public static class Role
        {
            private const string ApiPath = "/api/" + Version + "/Role/";
            public const string GetAll = ApiPath + "GetAll";
            public const string GetByName = ApiPath + "GetByName";
            public const string Create = ApiPath + "Create";
            public const string Update = ApiPath + "Update";
            public const string Delete = ApiPath + "Delete";
            public const string GetByID = ApiPath + "GetByID";
            public const string Enable = ApiPath + "EnableDisable";
            public const string AssignRoleScope = ApiPath + "AssignRoleScope";
            public const string GetResourcesByRoleID = ApiPath + "GetResourcesByRoleID";
        }
        public static class User
        {
            private const string ApiPath = "/api/" + Version + "/User/";
            public const string Create = ApiPath + "Create";
            public const string Update = ApiPath + "Update";
            public const string Enable = ApiPath + "EnableDisable";
            public const string Delete = ApiPath + "Delete";
            public const string GetAll = ApiPath + "GetAll"; 
            public const string GetAllByRole = ApiPath + "GetAllByRole"; 
            public const string GetByID = ApiPath + "GetByID";
            public const string GetByUserName = ApiPath + "GetByUserName";
            public const string GetByEmail = ApiPath + "GetByEmail";
            public const string Editable = ApiPath + "Editable";
            public const string UpdateProfile = ApiPath + "UpdateProfile";
            public const string GetProfileByID = ApiPath + "GetProfileByID";
            public const string GetProfileByUserName = ApiPath + "GetProfileByUserName";
            public const string GetAllByRoleAndName = ApiPath + "GetAllByRoleAndName";
        }
        public static class AnonomousUser
        {
            private const string ApiPath = "/api/" + Version + "/UserRegister/";
            public const string Create = ApiPath + "Create";
            public const string ActivateUser = ApiPath + "ActivateUser";
            public const string VerifyEmail = ApiPath + "VerifyEmail";
            
        }

            public static class ClientResource
        {
            private const string ApiPath = "/api/" + Version + "/ClientResource/";
            public const string GetClientRole = ApiPath + "GetClientRole";
            public const string GetClientRoleList = ApiPath + "GetClientRoleList";
            public const string GrantScopetoRole = ApiPath + "GrantScopetoRole";
            public const string RevokeScopetoRole = ApiPath + "RevokeScopetoRole";
            public const string GetResourceScopes = ApiPath + "GetResourceScopes";
            public const string GetAPIResource = ApiPath + "GetAPIResource";
        }
    }
}
