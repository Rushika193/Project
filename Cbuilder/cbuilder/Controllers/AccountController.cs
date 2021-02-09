using Cbuilder.Core.API.EndPoint;
using Cbuilder.Core.API.Models;
using Cbuilder.Core.Constants;
using Cbuilder.Core.Constants.Enum;
using Cbuilder.Core.Controllers;
using Cbuilder.Core.Helper;
using Cbuilder.Core.Helper.Classes.Models;
using Cbuilder.Core.Helper.Interfaces;
using Cbuilder.Core.Helper.Models;
using Cbuilder.Core.Models.AccountViewModels;
using Cbuilder.Core.Models.Capthca;
using Cbuilder.Core.Role;
using Cbuilder.Core.Users;
using Cbuilder.Core.Users.Entities;
using Cbuilder.Core.Users.Entities.API;
using Cbuilder.Models;
using Cbuilder.Webbuilder;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cbuilder.Controllers
{
    [Authorize]
    [Route("[controller]/[action]")]
    public class AccountController : CommonController
    {

        private string _captchaServer;
        //private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IEmailSender _emailSender;
        private readonly ILogger _logger;
        private readonly IApiClient _apiClient;
        private readonly IMemoryCache _memoryCache;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AccountController(
            //UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IEmailSender emailSender,
            IApiClient apiClient,
            IHttpContextAccessor httpContextAccessor,
             IMemoryCache _memoryCache,
        ILogger<AccountController> logger) : base(httpContextAccessor)
        {

            _signInManager = signInManager;
            _emailSender = emailSender;
            _logger = logger;
            _apiClient = apiClient;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Login(string returnUrl = null)
        {

            // Clear the existing external cookie to ensure a clean login process
            await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);
            return View();
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetExternalLogin()
        {
            var rs = await _apiClient.GetAsync<List<ActiveExtLogin>>(APIURL.IdentityBaseUri + IdentityAPI.Account.GetExternalActiveLogin, true, false);
            if (rs == null)
                rs = new List<ActiveExtLogin>();
            return new ObjectResult(rs);
        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            WebBuilderController webBuilderController = new WebBuilderController();
            IList<ControllerDetail> controllerDetails = await webBuilderController.GetMethodDetails("login", GetSiteID);
            MethodInvoke methodInvoke = new MethodInvoke();
            //if (controllerDetails?.Count > 0)
            //    methodInvoke.Execute(controllerDetails[0], GetReuseableParams(_memoryCache), new List<ControllerDetail>());
            string _loginTryCount = string.Format("loginTryCount{0}", model.UserEmail);
            await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);
            string loginError = "/login" + CultureURL + "?ReturnUrl=" + model.ReturnURL;
            if (ModelState.IsValid)
            {
                int tryCount = 1;
                string tryCountStr = TempData[_loginTryCount]?.ToString();
                if (tryCountStr != null)
                    tryCount = int.Parse(tryCountStr) + 1;
                //process for lockout
                if (tryCount >= 10)
                {
                    OperationStatus rs = new OperationStatus() { Message = "Account locked out" };
                    if (tryCount == 10)
                    {
                        var lockout = new
                        {
                            UserName = model.UserEmail,
                        };
                        rs = await _apiClient.PostAsync<OperationStatus>(lockout, APIURL.IdentityBaseUri + IdentityAPI.Account.LockOutAccount, true, false);
                    }
                    TempData[_loginTryCount] = tryCount;
                    ActionMessage(rs.Message, MessageType.Error);
                    return Redirect(loginError);
                }
                if (tryCount >= 3) // process for captcha
                {
                    SettingHelper settingHelper = new SettingHelper();
                    Dictionary<string, string> settingValues = settingHelper.GetSettingValuesByKeys(string.Format("{0},{1}", SettingKeys.CaptchaServer, SettingKeys.CaptchaType));
                    loginError += "&captcha=true&type=" + settingValues[SettingKeys.CaptchaType];
                    if (tryCount > 3)
                    {
                        _captchaServer = settingValues[SettingKeys.CaptchaServer];
                        var rs = await ValidateCaptcha(model.cbuildercaptcharesponse, model.CaptchaAnswer);
                        if (!rs.IsSuccess)
                        {
                            ActionMessage(rs.Message, MessageType.Error);
                            return Redirect(loginError);
                        }
                    }
                }
                var obj = new
                {
                    username = model.UserEmail,
                    password = model.UserPassword
                };
                //UserAuthenticateResponse userAuth = await _apiClient.PostAsync<UserAuthenticateResponse>(obj, APIURL.IdentityBaseUri + IdentityAPI.Account.PasswordSignInAsync, true, false);
                UserAuthenticateResponse userAuth = new UserAuthenticateResponse()
                {
                    IsAuthenticate = true,
                    AccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9oYXNoIjoiNTc0M2MxMDMtNTIwOS00ZGU1LTgwODAtYmI5MDQxM2JjNzIwIiwibmFtZWlkIjoiMDJDMTU3RUQtQzg4MS00N0VGLUFENEQtQUQyMDIzQzJFNzA0IiwidW5pcXVlX25hbWUiOiJzdXBlcnVzZXJAY29udGVudGRlci5jb20iLCJncm91cHNpZCI6IjE2MCIsInJvbGUiOiJTdXBlciBBZG1pbiIsIm5iZiI6MTYwMjIzNzI0MSwiZXhwIjoxNjAyMjQwODQxLCJpYXQiOjE2MDIyMzcyNDEsImlzcyI6IkNJZGVudGl0eVNlcnZlciJ9.Kg7GQmeQl5us8RXl66h6nccxMatXMI95H4meIMZ9_-0",
                    RefreshToken = "45dbb014bedf499897b0d0575ded96ac",
                    UsersRoles = "Super Admin",
                    UserID = "02C157ED-C881-47EF-AD4D-AD2023C2E704",
                    Message = "Authenticated Successfully."
                };
                if (userAuth == null)
                {
                    ActionMessage("Identity server not working", MessageType.Warning);
                    return Redirect(loginError);
                }
                else if (userAuth.IsAuthenticate)
                {
                    if (string.IsNullOrEmpty(model.ReturnURL))
                    {
                        RoleManager _role = new RoleManager();
                        model.ReturnURL = await _role.GetRoleRedirectURL(userAuth.UsersRoles, GetSiteID);
                        if (model.ReturnURL == null)
                            model.ReturnURL = "/dashboard/dashboard/index" + CultureURL;
                        else
                            model.ReturnURL = model.ReturnURL + CultureURL;
                    }
                    await AuthenticateUser(userAuth, model.ReturnURL);
                    TempData[_loginTryCount] = 0;
                    if (controllerDetails?.Count > 0)
                    {
                        var reusableParam = GetReuseableParams(_memoryCache);
                        reusableParam.UserName = model.UserEmail;

                        foreach (var item in controllerDetails)
                        {
                            methodInvoke.Execute(item, GetAPIParams(model.UserEmail, userAuth.UsersRoles), new List<ControllerDetail>());

                        }
                    }
                    return Redirect(model.ReturnURL);
                }
                else
                {
                    TempData[_loginTryCount] = tryCount;
                    ActionMessage(userAuth.Message, MessageType.Warning);
                    return Redirect(loginError);
                }
            }
            ShowModelStateErorr();
            return Redirect(loginError);
        }

        public ReuseableParams GetAPIParams(string userName, string roles)
        {
            return new ReuseableParams
            {
                UserName = userName,
                HostURL = HostUrl,
                SiteID = GetSiteID,
                CurrentRoleIDs = roles,
                UrlParameters = QueryParameters,
                Culture = GetCurrentCulture,
                HttpContextAccessor = _httpContextAccessor,
                MemoryCache = _memoryCache
            };
        }
        private async Task AuthenticateUser(UserAuthenticateResponse userAuth, string redirectURI)
        {
            // JObject objRes = userAuth.Result as JObject;
            //UserBasicInfo resUser = objRes.ToObject<UserBasicInfo>();
            //ApplicationUser user = new ApplicationUser()
            //{
            //    AccessToken = userAuth.AccessToken,
            //    UsersRoles = userAuth.UsersRoles,
            //    RefreshToken = userAuth.RefreshToken,
            //    UserID = userAuth.UserID,
            //    UserName = resUser.UserName,
            //    Email = resUser.Email,
            //    EmailConfirmed = resUser.EmailConfirmed,
            //    PhoneNumberConfirmed = resUser.PhoneNumberConfirmed,
            //    PasswordHash = resUser.PasswordHash,
            //    PhoneNumber = resUser.PhoneNumber,
            //    SecurityStamp = resUser.SecurityStamp, //THIS IS WHAT I NEEDED

            //};
            ApplicationUser user = new ApplicationUser()
            {
                AccessToken = userAuth.AccessToken,
                UsersRoles = userAuth.UsersRoles,
                RefreshToken = userAuth.RefreshToken,
                UserID = userAuth.UserID,
                UserName = "superuser@contentder.com",
                Email = "superuser@contentder.com",
                EmailConfirmed = true,
                PhoneNumberConfirmed = false,
                PasswordHash = "6mWE8GCUiuVtO5Tvx4zgGEG5WnwBsA/9I+nLFa+7cnObIDtKCGshc9UxrjU4DyBo6pWCe5XZTyyizbtkPiI8nw==",
                PhoneNumber = string.Empty,
                SecurityStamp = "1fc9f86395b74d0ba81761096da0f844",

            };
            var authenticationProperties = new AuthenticationProperties()
            {
                RedirectUri = redirectURI,
                ExpiresUtc = DateTime.UtcNow.AddMinutes(20),
                IsPersistent = true,
                AllowRefresh = true
            };
            await _signInManager.SignInAsync(user, authenticationProperties);
        }
        private async Task<OperationStatus> ValidateCaptcha(string CaptchaResponse, string CaptchaAnswer)
        {
            OperationStatus status = new OperationStatus() { IsSuccess = false };
            if (!string.IsNullOrEmpty(CaptchaAnswer) && !string.IsNullOrEmpty(CaptchaResponse))
            {
                CapthaRQ RQ = new CapthaRQ()
                {
                    CaptchaResponse = CaptchaResponse,
                    CaptchaAnswer = CaptchaAnswer,

                };
                GateWayAPI.HostURL = _captchaServer;
                status = await _apiClient.PostAsync<OperationStatus>(RQ, GateWayAPI.EnsureCaptcha, true, false);
                if (!status.IsSuccess)
                    status.Message = "Unable to validate captcha answer. Please try again.";
            }
            else
            {
                status.Message = "Captcha Value Required";
            }
            return status;
        }
        [HttpGet]
        [AllowAnonymous]
        public IActionResult Lockout()
        {
            return View();
        }
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            //model.ReturnURL = string.IsNullOrEmpty(model.ReturnURL) ? "/login" + CultureURL : model.ReturnURL;
            string RegistrationURL = "/register" + CultureURL;
            OperationStatus status = new OperationStatus();
            if (ModelState.IsValid)
            {
                SettingHelper settingHelper = new SettingHelper();
                Dictionary<string, string> settingValues = settingHelper.GetSettingValuesByKeys(UserSettingKeys.GetAllKeys);
                bool CaptchaEnabled = settingValues[UserSettingKeys.Captcha] == "true";
                if (CaptchaEnabled)
                {
                    _captchaServer = settingValues[UserSettingKeys.CaptchaServer];
                    var res = await ValidateCaptcha(model.Cbuildercaptcharesponse, model.Captcha);
                    if (!res.IsSuccess)
                    {
                        ActionMessage(res.Message, MessageType.Error);
                        return Redirect(RegistrationURL);
                    }
                }
                string roleName = settingValues[UserSettingKeys.RegistrationRoleID];
                UserPostViewModel user = new UserPostViewModel();
                string method = APIURL.IdentityBaseUri + IdentityAPI.AnonomousUser.Create;
                user.ID = null;
                user.UserName = model.Email;
                user.Password = model.Password;
                user.ConfirmPassword = model.Password;
                user.Email = model.Email;
                user.Enabled = settingValues[UserSettingKeys.EmailVerification] == "false";
                IEnumerable<string> userInRoles = new List<string> { roleName };
                user.UserInRoles = userInRoles;
                status = await _apiClient.PostAsync<OperationStatus>(user, method, true, false);
                if (status.IsSuccess)
                {
                    JObject obj = status.Result as JObject;
                    UserRegisterRS resUser = obj.ToObject<UserRegisterRS>();
                    if (!user.Enabled)
                    {
                        SendActivationEmail(model, resUser.Code, resUser.ID);
                        status.Message = "Registration success. Check email on " + model.Email + " to verify your accout.";
                    }
                    if (model.IsSubscribe)
                        AddUserAsSubcriber(model);
                    CreateProfile(model, resUser.ID);
                    ActionMessage(status.Message, MessageType.Success);

                    WebBuilderController webBuilderController = new WebBuilderController();
                    IList<ControllerDetail> controllerDetails = await webBuilderController.GetMethodDetails("register", GetSiteID);
                    MethodInvoke methodInvoke = new MethodInvoke();

                    if (controllerDetails?.Count > 0)
                    {
                        var reusableParam = GetReuseableParams(_memoryCache);
                        reusableParam.UserName = model.Email;

                        foreach (var item in controllerDetails)
                        {
                            methodInvoke.Execute(item, reusableParam, new List<ControllerDetail>());

                        }
                    }
                    if (string.IsNullOrEmpty(model.ReturnURL))
                    {
                        RoleManager _role = new RoleManager();
                        model.ReturnURL = await _role.GetRoleRedirectURL(roleName, GetSiteID);
                        if (model.ReturnURL == null)
                            model.ReturnURL = "/dashboard/dashboard/index" + CultureURL;
                        else
                            model.ReturnURL = model.ReturnURL + CultureURL;
                    }
                    return Redirect(model.ReturnURL);
                }
            }
            else
            {
                status.Message = GetModelStateErorr();
            }
            ActionMessage(status.Message, MessageType.Error);
            return Redirect(RegistrationURL);
        }
        [NonAction]
        private async void SendActivationEmail(RegisterViewModel model, string code, string userid)
        {
            string link = HostUrl + "/account/ConfirmEmail?id=" + userid + "&code=" + code + "&returnurl=" + model.ReturnURL;
            string message = "<a href='" + link + "'>Click here activate your account</a>";
            await _emailSender.SendEmailAsync(model.Email, "Account Confirmation", message);
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail(string id, string code, string returnurl)
        {
            OperationStatus status = new OperationStatus();
            if (id == null || code == null)
            {
                status.Message = "Invalid link";
            }
            else
            {
                string method = APIURL.IdentityBaseUri + IdentityAPI.AnonomousUser.ActivateUser;
                var ReqData = new
                {
                    Token = code,
                };
                status = await _apiClient.PostAsync<OperationStatus>(ReqData, method, true, false);
                if (status.IsSuccess)
                {
                    ActionMessage(status.Message, MessageType.Success);
                    return Redirect("/login" + CultureURL);
                    //return RedirectToLocal(returnurl);
                }
            }
            return View(status);
        }
        [NonAction]
        private async void CreateProfile(RegisterViewModel model, string userID)
        {
            UserProfileManager _profile = new UserProfileManager();
            UserProfile up = new UserProfile()
            {
                UserID = userID,
                Username = model.Email,
                Title = model.Title,
                FirstName = model.FirstName,
                MiddleName = model.MiddleName,
                LastName = model.LastName,
                GenderID = model.GenderID,
                ProfileImage = model.ProfileImage == null ? "" : model.ProfileImage,
                Mobile = model.Mobile,
                Email = model.Email,
                Phone = model.Phone,
                ResPhone = model.ResPhone,
                StreetAddress = model.StreetAddress,
                City = model.City,
                State = model.State,
                PostalCode = model.PostalCode,
                About = model.About,
            };
            await _profile.UpdateUserProfile(up);
        }
        [NonAction]
        private async void AddUserAsSubcriber(RegisterViewModel model)
        {

            // need to call subriber sevice
        }
        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            _logger.LogInformation("User logged out.");
            return Redirect(HostUrl);
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ForgotPassword([FromBody]ForgotPasswordViewModel model)
        {
            OperationStatus status = new OperationStatus() { IsSuccess = false };
            if (ModelState.IsValid)
            {
                SettingHelper settingHelper = new SettingHelper();
                Dictionary<string, string> settingValues = settingHelper.GetSettingValuesByKeys(string.Format("{0},{1}", SettingKeys.CaptchaServer, SettingKeys.CaptchaType));
                _captchaServer = settingValues[SettingKeys.CaptchaServer];
                status = await ValidateCaptcha(model.CaptchaResponse, model.CaptchaValue);
                if (!status.IsSuccess)
                    return new ObjectResult(status);
                string method = APIURL.IdentityBaseUri + IdentityAPI.ForgotPassword.Forget;
                status = await _apiClient.PostAsync<OperationStatus>(model, method, true, false);
                if (status.IsSuccess)
                {
                    string recoverlink = HostUrl + "/resetpassword?code=" + status.Result;
                    // here email template will be invoked.
                    string message = "<a href='" + recoverlink + "'>Click here to reset new password</a>";
                    await _emailSender.SendEmailAsync(model.UserName, "Password Reset Request", message);
                    status.Message = "Please check your email to reset your password";
                    status.Result = null;
                }
            }
            return new ObjectResult(status);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CheckResetCode([FromBody]ResetPasswordViewModel model)
        {
            OperationStatus status = new OperationStatus() { IsSuccess = false, Message = "Invalid password reset code." };
            if (string.IsNullOrEmpty(model.Code))
            {
                string method = APIURL.IdentityBaseUri + IdentityAPI.ForgotPassword.CheckRecoveryToken;
                object token = new
                {
                    Token = model.Code
                };
                status = await _apiClient.PostAsync<OperationStatus>(token, method, true, false);
            }
            return new ObjectResult(status);
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            OperationStatus status = new OperationStatus() { IsSuccess = false, Message = "Some field value are missing" };
            if (ModelState.IsValid)
            {
                var obj = new
                {
                    RecoveryToken = model.Code,
                    NewPassword = model.Password
                };
                string method = APIURL.IdentityBaseUri + IdentityAPI.ForgotPassword.ResetPassword;
                status = await _apiClient.PostAsync<OperationStatus>(obj, method, true, false);
                if (status.IsSuccess)
                {
                    ActionMessage("Password Reset Successfully. You can sign in with your new password.", MessageType.Success);
                    return Redirect("/login" + CultureURL);
                }
            }
            ActionMessage(status.Message, MessageType.Error);
            return Redirect("/resetpassword" + CultureURL + "?code=" + model.Code);
        }
        [AllowAnonymous]
        public IActionResult ExternalLogin(string provider, string returnURL)
        {
            TempData["ReturnURL"] = returnURL;
            string url = APIURL.IdentityBaseUri + IdentityAPI.Account.ExternalLogin;
            string param = string.Format("?loginprovider={0}&successurl={1}&clientid={2}&state={3}", provider, HostUrl + "/account/ExternalLoginSuccess", Common.ClientID, returnURL);
            url = url + param;
            // var objParam = new
            //{
            //    LoginProvider = provider,
            //    SuccessURL = returnURL,
            //    ClientID = Common.ClientID,
            //};
            // string param = JsonConvert.SerializeObject(objParam);
            //string cipherParam = string.Empty;
            //EncryptionHelper encryptHelper = new EncryptionHelper();
            //encryptHelper.EncryptString(param, cipherParam);
            return new RedirectResult(url);

        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> ExternalLoginSuccess(string param)
        {
            string returnurl = TempData["ReturnURL"] as string;

            string loginError = "/login" + CultureURL + "?ReturnUrl=" + returnurl;
            var objparam = new
            {
                arg = param,
            };
            //provide  login token by contender identity server. need to authenticate this token from c-identity server.
            string url = APIURL.IdentityBaseUri + IdentityAPI.Account.AuthenticateExternalLogin;
            UserAuthenticateResponse userAuth = await _apiClient.PostAsync<UserAuthenticateResponse>(objparam, APIURL.IdentityBaseUri + IdentityAPI.Account.AuthenticateExternalLogin, true, false);
            if (userAuth == null)
            {
                ActionMessage("Identity server not working", MessageType.Warning);
            }
            else if (userAuth.IsAuthenticate)
            {
                if (string.IsNullOrEmpty(returnurl))
                {
                    RoleManager _role = new RoleManager();
                    returnurl = await _role.GetRoleRedirectURL(userAuth.UsersRoles, GetSiteID);
                    if (returnurl == null)
                        returnurl = "/dashboard/dashboard/index" + CultureURL;
                    else
                        returnurl = returnurl + CultureURL;
                }
                await AuthenticateUser(userAuth, returnurl);
                return Redirect(returnurl);
            }
            else
            {
                ActionMessage(userAuth.Message, MessageType.Error);
            }
            return Redirect(loginError);
        }
        [HttpGet]
        public IActionResult AccessDenied()
        {
            return View();
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult InvalidToken()
        {
            return View();
        }

        #region Helpers

        public void LoadOwnCJs()
        {
            this.HttpContext?.Items.Add("_jsLoginValidate", "/lib/jquery-validation/dist/jquery.validate.min.js");
            this.HttpContext?.Items.Add("_jsLoginValidate2", "/lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js");
        }
        #endregion
    }


}
