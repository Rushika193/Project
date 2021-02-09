using Cbuilder.Core.API.Models;
using Cbuilder.Core.Constants.Enum;
using Cbuilder.Core.Controllers;
using Cbuilder.Core.Helper.Classes.Models;
using Cbuilder.Core.Helper.Interfaces;
using Cbuilder.Core.Helper.Models;
using Cbuilder.Core.Role;
using Cbuilder.Core.Permissions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Linq;
using Cbuilder.DashboardMenu;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace Cbuilder.Areas.Dashboard.Controllers
{
    [Area("Dashboard")]
    public class RoleController : AdminController
    {
        private readonly IApiClient _apiClient;
        private readonly IPermission _permission;
        public RoleController(IApiClient apiClient, IHttpContextAccessor httpContextAccessor, IPermission permission) : base(httpContextAccessor)
        {
            _apiClient = apiClient;
            _permission = permission;
        }
        [HttpGet]
        public async Task<ActionResult> Index(string keywords = "", int offset = 0, int limit = 10)
        {
            try
            {
                List<ElementPermission> requiredPermission = new List<ElementPermission>()
                {
                    new ElementPermission(nameof(Create)),
                    new ElementPermission(nameof(Delete))
                };
                _permission.HasElementPermission(requiredPermission, UsersRoles);
                RoleManager roleController = new RoleManager();
                OperationStatus status = new OperationStatus();
                string apiURL = APIURL.IdentityBaseUri + IdentityAPI.Role.GetAll;                
                IList<RoleViewModel> lstRolesFromApi = await _apiClient.GetAsync<IList<RoleViewModel>>(apiURL);
                IList<RoleViewModel> lstRoles = roleController.GetAllRole(keywords, offset, limit).Result;
                if (lstRolesFromApi != null && lstRolesFromApi.Count() > 0)
                {
                    foreach (RoleViewModel role in lstRolesFromApi)
                    {
                        role.IsActive = role.Enabled;
                        IList<RoleViewModel> roleDbs = lstRoles.Where(i => i.ID == role.ID).ToList();
                        if (roleDbs != null && roleDbs.Count > 0)
                        {
                            RoleViewModel roleDb = roleDbs.First();
                            if (roleDb != null)
                            {
                                role.AliasName = roleDb.AliasName;
                                role.IsSystem = roleDb.IsSystem;
                                role.SelectedPageActions = roleDb.SelectedPageActions;
                                role.CanEdit = roleDb.CanEdit;
                            }
                        }
                        else
                        {
                            role.AliasName = string.Empty;
                            role.SelectedPageActions = string.Empty;
                        }
                    }
                }
                Task<Dictionary<string, string>> localized = LocalizeData(Path.Combine("Localization", "Role", "role"));
                string url = HostUrl +  CultureURL + "/actionName/params";
                await Task.WhenAll(localized);
                ViewData["localized"] = await localized;
                IList<RoleViewModel> lstRole = lstRolesFromApi;
                return View(lstRole);
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return View();
            }
        }

        [HttpGet]
        public async Task<ActionResult> Create()
        {
            RolePermission rolePermission = new RolePermission();
            try
            {
                AddJS("Role", "/admin/js/Role/RoleManage.js");

                ViewData["ActionType"] = "Create";
                RoleManager roleManager = new RoleManager();
                PermissionManager permission = new PermissionManager();
                IList<PageAction> pageActions = await permission.GetAllPageAction();
                RoleViewModel roleViewModel = new RoleViewModel();
                rolePermission.PageActions = pageActions;
                rolePermission.RoleViewModel = roleViewModel;
                Task<Dictionary<string, string>> localized = LocalizeData(Path.Combine("Localization", "Role", "role"));                
                ViewData["localized"] = await localized;
                return View(rolePermission);
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return View(rolePermission);
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddUpdate(RolePermission rolePermission)
        {
            try
            {
                if (ModelState.IsValid)
                {                    
                    string apiURL = APIURL.IdentityBaseUri + IdentityAPI.Role.Update;
                    if (string.IsNullOrEmpty(rolePermission.RoleViewModel.ID))
                        apiURL = APIURL.IdentityBaseUri + IdentityAPI.Role.Create;
                    var userRole = new
                    {
                        id = rolePermission.RoleViewModel.ID,
                        name = rolePermission.RoleViewModel.Name.Trim(),
                        enabled = rolePermission.RoleViewModel.IsActive
                    };

                    OperationStatus status = new OperationStatus();
                    status = await _apiClient.PostAsync<OperationStatus>(userRole, apiURL);
                    if (status.IsSuccess)
                    {
                        if (string.IsNullOrEmpty(rolePermission.RoleViewModel.SelectedPageActions))
                        {
                            rolePermission.RoleViewModel.SelectedPageActions = string.Empty;
                        }
                        string Message = string.Empty;
                        rolePermission.RoleViewModel.ID = status.Result.ToString();
                        RoleManager roleController = new RoleManager();
                        OperationStatus response = await roleController.AddUpdateRole(rolePermission.RoleViewModel, string.Empty);
                        //if (Convert.ToBoolean(response.StatusCode))
                        //{
                        //    if (!string.IsNullOrEmpty(rolePermission.RoleViewModel.SelectedPageActions))
                        //    {
                        //        PermissionManager permission = new PermissionManager();
                        //        IList<IdentityScope> scopes = await permission.GetIdentityScopes(rolePermission.RoleViewModel.SelectedPageActions);
                        //        if (scopes.Count > 0)
                        //        {
                        //            int[] scopeIDs = scopes.Select(x => x.ScopeID).ToArray();
                        //            var obj = new
                        //            {
                        //                RoleID = status.Result.ToString(),
                        //                ScopeIDs = scopeIDs
                        //            };
                        //            OperationStatus roleScopeStatus = await _apiClient.PostAsync<OperationStatus>(obj, APIURL.IdentityBaseUri + IdentityAPI.Role.AssignRoleScope);
                        //            if (roleScopeStatus.IsSuccess)
                        //            {
                        //                ActionMessage(roleScopeStatus.Message, MessageType.Success);
                        //                return RedirectToAction(nameof(Index));
                        //            }
                        //        }
                        //    }
                        //}
                        ActionMessage(response.Message, MessageType.Success);
                        return RedirectToAction(nameof(Index));
                    }
                    else
                    {
                        ActionMessage(status.Message, MessageType.Error);
                    }
                }                
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);               
            }
            if (string.IsNullOrEmpty(rolePermission.RoleViewModel.ID))
            {                
                ViewData["ActionType"] = "Create";
            }
            else
            {
                ViewData["ActionType"] = "Update";
            }
            AddJS("Role", "/admin/js/Role/RoleManage.js");
            Task<Dictionary<string, string>> localized = LocalizeData(Path.Combine("Localization", "Role", "role"));
            ViewData["localized"] = await localized;
            PermissionManager permission = new PermissionManager();
            IList<PageAction> pageActions = await permission.GetAllPageAction();
            RoleViewModel roleViewModel = new RoleViewModel();
            rolePermission.PageActions = pageActions;
            roleViewModel.SelectedPageActions = rolePermission.RoleViewModel.SelectedPageActions;
            return View("Create",rolePermission);
        }

        [HttpGet]
        public async Task<ActionResult> Edit(string id)
        {
            ViewData["ActionType"] = "Update";
            AddJS("Role", "/admin/js/Role/RoleManage.js");
            if (!string.IsNullOrEmpty(id))
            {
                RolePermission rolePermission = new RolePermission();
                RoleManager roleManager = new RoleManager();
                PermissionManager permission = new PermissionManager();
                IList<PageAction> pageActions = await permission.GetAllPageAction();
                string apiURL = APIURL.IdentityBaseUri + IdentityAPI.Role.GetByID;
                var userRole = new {
                    id=id
                };
                RoleViewModel role = await roleManager.GetRoleByID(id);
                RoleViewModel lstRolesFromApi = await _apiClient.PostAsync<RoleViewModel>(userRole,apiURL);
                if (lstRolesFromApi != null)
                {
                    lstRolesFromApi.IsActive = lstRolesFromApi.Enabled;
                    if (role != null)
                    {
                        lstRolesFromApi.AliasName = role.AliasName;
                        lstRolesFromApi.IsSystem = role.IsSystem;
                        lstRolesFromApi.SelectedPageActions = role.SelectedPageActions;
                        lstRolesFromApi.CanEdit = role.CanEdit;
                    }
                    else
                    {
                        lstRolesFromApi.AliasName = string.Empty;
                        lstRolesFromApi.SelectedPageActions = string.Empty;
                    }
                }
                rolePermission.PageActions = pageActions;
                rolePermission.RoleViewModel = lstRolesFromApi;
                Task<Dictionary<string, string>> localized = LocalizeData(Path.Combine("Localization", "Role", "role"));
                ViewData["localized"] = await localized;
                return View("Create", rolePermission);
            }
            else
            {
                return View(nameof(Index));
            }
        }
        [HttpGet]
        public async Task<ActionResult> Delete(string id)
        {
            try
            {
                string redirectURL = string.Empty;
                var roleObj = new
                {
                    id = id
                };
                OperationStatus status = await _apiClient.PostAsync<OperationStatus>(roleObj, APIURL.IdentityBaseUri + IdentityAPI.Role.Delete);
                if (status.IsSuccess)
                {
                    string Message = string.Empty;
                    RoleManager roleManager = new RoleManager();
                    OperationStatus response = await roleManager.DeleteRoleByID(id, string.Empty);
                    if (response.IsSuccess)
                    {
                        Message = status.Message;
                        redirectURL = nameof(Index);
                        ActionMessage(status.Message, MessageType.Success);
                    }
                }
                return RedirectToAction(redirectURL);
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return View("Index");
            }
        }

        [HttpGet]
        public async Task<IActionResult> RoleRedirect()
        {
            RoleManager roleManager = new RoleManager();
            SideMenuManager mgr = new SideMenuManager();
            List<SelectListItem> pageLst = new List<SelectListItem>();
            RoleRedirectPost roleView = new RoleRedirectPost();
            roleView.Roles = await roleManager.GetAllRoleRedirectUrl(GetSiteID);
            IEnumerable<DashboardSideMenu> lstPages = await mgr.GetAllSideMenu(null, 0);
            if (lstPages != null)
            {
                //pageLst.Add(new SelectListItem { Text = "Select Role", Value = "", Selected = true, Disabled = true });
                pageLst.Add(new SelectListItem { Text = "Editor", Value = "/Webbuilder/Home", Selected = true });
                foreach (DashboardSideMenu page in lstPages)
                {
                    //bool isSelected = roleView.Roles.Any(x => x.RedirectUrl.ToLower() == page.URL.ToLower());
                    pageLst.Add(new SelectListItem(page.LinkTitle, "/" + page.URL));//, isSelected));
                }
            }
            ViewBag.PageList = pageLst;
            Task<Dictionary<string, string>> localized = LocalizeData(Path.Combine("Localization", "Role", "role"));
            ViewData["localized"] = await localized;
            return View(roleView);
        }

        [ValidateAntiForgeryToken]
        [HttpPost]
        public async Task<IActionResult> RoleRedirect(RoleRedirectPost postData)
        {
            RoleManager roleManager = new RoleManager();
            if (!string.IsNullOrEmpty(postData.RedirectUrlXML))
            {
                var status = await roleManager.SaveRolewiseRedirect(postData.RedirectUrlXML, GetSiteID, GetUsername);
                MessageType msg = status.IsSuccess ? MessageType.Success : MessageType.Error;
                ActionMessage(status.Message, msg);
            }
            return RedirectToAction("RoleRedirect");
        }
    }
}