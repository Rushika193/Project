
using Cbuilder.Core.API.Models;
using Cbuilder.Core.Constants.Enum;
using Cbuilder.Core.Controllers;
using Cbuilder.Core.Helper.Classes.Models;
using Cbuilder.Core.Helper.Interfaces;
using Cbuilder.Core.Helper.Models;
using Cbuilder.Core.Models;
using Cbuilder.Core.Models.AccountViewModels;
using Cbuilder.Core.Models.ManageViewModels;
using Cbuilder.Core.Role;
using Cbuilder.Core.Users;
using Cbuilder.Core.Users.Enum;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Cbuilder.Areas.Dashboard.Controllers
{
    [Area("Dashboard")]
    public class UserController : AdminController
    {
        private readonly IApiClient ApiInvoker;
        private string LocalizePath = Path.Combine("Localization", "user", "user");
        public UserController(IApiClient apiClient, IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
            ApiInvoker = apiClient;
        }
        public async Task<IActionResult> Index(string keyword,string roleName, int offset = 0, int limit = 10)
        {

            AddJS("Pagination", "/js/pagination.js");
            if (string.IsNullOrWhiteSpace(keyword))
            {
                keyword = string.Empty;
            }
            if (string.IsNullOrWhiteSpace(roleName))
            {
                roleName = string.Empty;
            }
            var objParam = new
            {
                offset = offset,
                limit = limit,
                keywords = keyword,
                roleName= roleName
            };
            Dictionary<string, string> _localLabel =await LocalizeData(LocalizePath);


            IList<UserGetViewModel> lstUser = await ApiInvoker.PostAsync<IList<UserGetViewModel>>(objParam, APIURL.IdentityBaseUri + IdentityAPI.User.GetAllByRoleAndName);
            await BindSelectionRoleList(roleName);
            ViewData["Keyword"] = keyword;
            ViewData["RoleName"] = roleName;
            ViewData["LocalLabel"] = _localLabel;
            ViewData["UserName"] = GetUsername;
            return View(lstUser);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            Dictionary<string, string> _localLabel = await LocalizeData(LocalizePath);
            ViewData["LocalLabel"] = _localLabel;
            await BindRoleList();
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> Edit(string id)
        {
            IEnumerable<RoleViewModel> lstRoles = await ApiInvoker.GetAsync<IEnumerable<RoleViewModel>>(APIURL.IdentityBaseUri + IdentityAPI.Role.GetAll);
            var objParam = new
            {
                id = id
            };
            UserEditGetModel user = await ApiInvoker.PostAsync<UserEditGetModel>(objParam, APIURL.IdentityBaseUri + IdentityAPI.User.GetByID);
            await BindRoleList(user.UserInRoles);
            Dictionary<string, string> _localLabel = await LocalizeData(LocalizePath);
            ViewData["LocalLabel"] = _localLabel;
            return View("Edit", user);
        }

        [HttpPost]
        public async Task<IActionResult> Create(UserPostViewModel model)
        {
            if (ModelState.IsValid)
            {
                string method = APIURL.IdentityBaseUri + IdentityAPI.User.Create;
                model.UserName = model.Email;
                OperationStatus status = await ApiInvoker.PostAsync<OperationStatus>(model, method);
                if (status.IsSuccess)
                {
                    JObject obj = status.Result as JObject;
                    UserProfileManager _profile = new UserProfileManager();
                    UserProfile up = new UserProfile()
                    {
                        UserID = obj["id"].ToString(),
                        Username = model.UserName,
                        Title = string.Empty,
                        FirstName = string.Empty,
                        MiddleName = string.Empty,
                        LastName = string.Empty,
                        GenderID = Gender.NotProvided,
                        ProfileImage = string.Empty,
                        Mobile = model.PhoneNumber,
                        Email = model.Email,
                        Phone = model.PhoneNumber,
                        ResPhone = model.PhoneNumber,
                        StreetAddress = string.Empty,
                        City = string.Empty,
                        State = string.Empty,
                        PostalCode = string.Empty,
                        About = string.Empty,
                    };
                    await _profile.UpdateUserProfile(up);
                    ActionMessage(status.Message, MessageType.Success);
                }
                else
                    ActionMessage(status.Message, MessageType.Error);

                return RedirectToAction("Index");
            }
            else
            {

                await BindRoleList();
                ShowModelStateErorr();
                return View(new UserGetViewModel());
            }
        }

        [HttpPost]
        public async Task<IActionResult> Edit(UserEditModel user)
        {
            if (ModelState.IsValid)
            {
                string method = APIURL.IdentityBaseUri + IdentityAPI.User.Update;                
                OperationStatus status = await ApiInvoker.PostAsync<OperationStatus>(user, method);
                if (status.IsSuccess)
                    ActionMessage(status.Message, MessageType.Success);
                else
                    ActionMessage(status.Message, MessageType.Error);

                return RedirectToAction("Index");
            }
            else
            {
                await BindRoleList();
                ActionMessage("All the fields are required!", MessageType.Error);
                return View(new UserEditGetModel());
            }
        }

        [NonAction]
        public async Task BindRoleList(IEnumerable<RoleViewModel> selectedRoles = null)
        {
            AddJS("validate", "/lib/js/jquery.validate.js");
            RoleManager roleManager = new RoleManager();
            IEnumerable<RoleViewModel> lstRoles = await roleManager.GetAllRoleView();
            List<SelectListItem> lst = new List<SelectListItem>();
            bool selected = false;
            foreach (RoleViewModel roles in lstRoles)
            {
                selected = false;
                if (selectedRoles != null)
                {
                    if (selectedRoles.Any(i => i.ID.ToString().ToLower() == roles.ID.ToString().ToLower()))
                    {
                        selected = true;
                    }
                }
                lst.Add(new SelectListItem(roles.Name, roles.ID.ToString(), selected));
            }
            ViewBag.RoleList = lst;
        }


        [NonAction]
        public async Task BindSelectionRoleList(string selectedRole)
        {            
            RoleManager roleManager = new RoleManager();
            IEnumerable<RoleViewModel> lstRoles = await roleManager.GetAllRoleView();
            List<SelectListItem> lst = new List<SelectListItem>();
            lst.Add(new SelectListItem("All", string.Empty));
            foreach (RoleViewModel roles in lstRoles)
            {
                string roleName = roles.AliasName;
                if (roles.AliasName == string.Empty)
                {
                    roleName = roles.Name;
                }
                lst.Add(new SelectListItem(roleName, roles.Name.ToString()));
            }
            lst.Where(i => i.Value == selectedRole).ToList().ForEach(x => { x.Selected = true; });
            ViewBag.RoleListSelection = lst;
        }

        public async Task<IActionResult> NonEditable(string id, bool enable)
        {
            var obj = new { id = id, enable = !enable };
            var result = await ApiInvoker.PostAsync<OperationStatus>(obj, APIURL.IdentityBaseUri + IdentityAPI.User.Editable);
            if (result.IsSuccess)
            {
                ActionMessage(result.Message, MessageType.Success);
            }
            return RedirectToAction("Index");
        }
        public async Task<IActionResult> Enable(string id, bool enable)
        {
            var obj = new { id = id, enable = !enable };
            var result = await ApiInvoker.PostAsync<OperationStatus>(obj, APIURL.IdentityBaseUri + IdentityAPI.User.Enable);
            if (result.IsSuccess)
            {
                ActionMessage(result.Message, MessageType.Success);
            }
            return RedirectToAction("Index");
        }
        public async Task<IActionResult> Delete(string id)
        {
            var userDel = new
            {
                id = id
            };
            OperationStatus status = await ApiInvoker.PostAsync<OperationStatus>(userDel, APIURL.IdentityBaseUri + IdentityAPI.User.Delete);
            if (status.IsSuccess)
                ActionMessage(status.Message, MessageType.Success);
            else
                ActionMessage(status.Message, MessageType.Error);

            return RedirectToAction("Index");
        }
        [HttpGet]
        public async Task<IActionResult> Details(string id)
        {
            var objParam = new
            {
                id = id
            };
            UserGetViewModel user = await ApiInvoker.PostAsync<UserGetViewModel>(objParam, APIURL.IdentityBaseUri + IdentityAPI.User.GetByID);
            return View(user);
        }

        [HttpGet]
        public async Task<IActionResult> ChangePassword()
        {
            return View();
        }

        public async Task<IActionResult> ChangePassword(ChangePasswordViewModel changePW)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    string method = APIURL.IdentityBaseUri + IdentityAPI.Password.Update;
                    var obj = new
                    {
                        username = GetUsername,
                        oldpassword = changePW.OldPassword,
                        newpassword = changePW.NewPassword
                    };
                    OperationStatus status = await ApiInvoker.PostAsync<OperationStatus>(obj, method);
                    if (status.IsSuccess)
                        ActionMessage(status.Message, MessageType.Success);
                    else
                        ActionMessage(status.Message, MessageType.Error);
                }
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return View(changePW);
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetUserByRole(string roleNames, int offset = 0, int limit = 10)
        {
            var objParam = new
            {
                offset = offset,
                limit = limit,
                roleNames = roleNames
            };
            IList<UserGetViewModel> lstUser = await ApiInvoker.PostAsync<IList<UserGetViewModel>>(objParam, APIURL.IdentityBaseUri + IdentityAPI.User.GetAllByRole);
            return new ObjectResult(lstUser);
        }

        [HttpGet]
        public async Task<IActionResult> ResetPassword(string id)
        {
            IEnumerable<RoleViewModel> lstRoles = await ApiInvoker.GetAsync<IEnumerable<RoleViewModel>>(APIURL.IdentityBaseUri + IdentityAPI.Role.GetAll);
            var objParam = new
            {
                id = id
            };
            UserEditGetModel user = await ApiInvoker.PostAsync<UserEditGetModel>(objParam, APIURL.IdentityBaseUri + IdentityAPI.User.GetByID);
            ResetPassword reset = new ResetPassword();
            if (user != null)
            {
                reset.UserName = user.UserName;
            }
            Dictionary<string, string> _localLabel = await LocalizeData(LocalizePath);
            ViewData["LocalLabel"] = _localLabel;
            return View("ResetPassword", reset);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword(ResetPassword model)
        {
            OperationStatus status = new OperationStatus() { IsSuccess = false, Message = "Some field value are missing" };
            if (ModelState.IsValid)
            {
                var obj = new
                {
                    username = model.UserName,
                    newpassword = model.NewPassword
                };
                string method = APIURL.IdentityBaseUri + IdentityAPI.Password.Reset;
                status = await ApiInvoker.PostAsync<OperationStatus>(obj, method, true, false);
                if (status.IsSuccess)
                {
                    ActionMessage("Password Reset Successfully.", MessageType.Success);
                    return RedirectToAction("Index");
                }
                else {                    
                    ActionMessage(status.Message, MessageType.Error);
                    return View(model);
                }
            }
            return View(model);
        }
    }
}