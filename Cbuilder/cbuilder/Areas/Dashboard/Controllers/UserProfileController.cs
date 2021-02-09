
using Cbuilder.Core.API.Models;
using Cbuilder.Core.Constants.Enum;
using Cbuilder.Core.Controllers;
using Cbuilder.Core.Helper.Classes.Models;
using Cbuilder.Core.Helper.Interfaces;
using Cbuilder.Core.Helper.Models;
using Cbuilder.Core.MediaManagement;
using Cbuilder.Core.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Cbuilder.Areas.Dashboard.Controllers
{
    [Area("Dashboard")]
    public class UserProfileController : AdminController
    {
        private readonly IApiClient _apiClient;
        public UserProfileController(IApiClient apiClient, IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
            _apiClient = apiClient;
        }
        private void IncludeAssets()
        {
            ViewData["UploadPath"] = FileUploadHelper.EncryptString(Path.Combine(CurrentHostEnvironment.WebRootPath, "images", "user"));
            ViewData["AllowExtension"] = FileUploadHelper.EncryptString(string.Join(",", Enum.GetNames(typeof(ImageExtensionEnum)))); 
            AddJS("FileUploadJs","/js/uploadFile.js");
            AddJS("FileUploadJs", "/lib/js/jquery.validate.js");
        }
        public async Task<IActionResult> Details()
        {
            try
            {
                IncludeAssets();
                if (UserID != null)
                {
                    string userID = UserID;
                    UserProfileManager userProfile = new UserProfileManager();
                    UserProfile profile = await userProfile.GetUserProfileByUserID(userID);
                    if (profile == null)
                    {
                        profile = new UserProfile() { UserID = userID, Email = GetUsername };
                    }
                    return View(profile);
                }
                return View();
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return View();
            }

        }
        [HttpPost]
        public async Task<IActionResult> Details(UserProfile user)
        {
            try
            {

                user.UserID = UserID;
                user.Username = GetUsername;
                UserProfileManager userProfile = new UserProfileManager();
                var rs = await userProfile.UpdateUserProfile(user);
                var param = new UserProfileDTO
                {
                    UserID = user.UserID,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    SecondaryEmail = user.Email,
                    ProfileImage = HostUrl + user.ProfileImage,
                    Gender = user.GenderID,
                    DateOfBirth = null,
                    About = user.About,
                    UserAddress = user.StreetAddress,
                    UpdatedBy = GetUsername
                };
                rs = await _apiClient.PostAsync<OperationStatus>(param, APIURL.IdentityBaseUri + IdentityAPI.User.UpdateProfile, true, true);
                if (rs.IsSuccess)
                    ActionMessage(rs.Message, MessageType.Success);
                else
                    ActionMessage(rs.Message, MessageType.Error);
                IncludeAssets();
                return View(user);
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return View(user);
            }
        }


    }
}
