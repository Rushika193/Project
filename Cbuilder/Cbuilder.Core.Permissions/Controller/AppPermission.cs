using Cbuilder.Core.Constants;
using Microsoft.AspNetCore.Http;
using SQLHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Cbuilder.Core.Permissions
{
    /// <summary>
    /// Application Permission manager mostly used for readonly perpose. 
    /// </summary>
    public class AppPermission : IPermission
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AppPermission(IHttpContextAccessor contextAccessor)
        {
            _httpContextAccessor = contextAccessor;
        }

        public async Task<bool> CheckAdminPagePermission(string AreaName, string ModuleName, string ActionName, string RoleNames)
        {
            try
            {
                if (RoleNames.Contains("Super Admin"))
                return true;
            else
            {                
                    List<SQLParam> sQLParam = new List<SQLParam>
                    {
                        new SQLParam("@RoleNames", RoleNames),
                        new SQLParam("@Area", AreaName),
                        new SQLParam("@PageName", ModuleName),
                        new SQLParam("@ActionName", ActionName),
                    };
                    SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
                    int rs = await handler.ExecuteNonQueryAsync("[usp_Permission_CheckAdminPermission]", sQLParam, "@Permission");
                    return rs == 1;
                }
            }
                catch { throw; }
        }

        public async Task<bool> CheckFrontPagePermission(string PageName, string ActionName, string RoleNames)
        {
            try
            {
                if (RoleNames.Contains("Super Admin"))
                    return true;
                else
                {

                    List<SQLParam> sQLParam = new List<SQLParam>
                {
                    new SQLParam("@RoleNames", RoleNames),
                    new SQLParam("@PageName", PageName),
                    new SQLParam("@ActionName",ActionName),
                };
                    SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
                    int rs = await handler.ExecuteNonQueryAsync("[usp_Permission_CheckFrontPermission]", sQLParam, "@Permission");
                    return rs == 1;
                }
            }
            catch 
            {

                throw;
            }

        }

        /// <summary>
        /// Fetch require UI element permission and set in current context so that you can use CheckElementPermission method.
        /// </summary>
        /// <param name="permission"></param>
        /// <param name="roleNames"></param>
        public void HasElementPermission(List<ElementPermission> permission, string roleNames)
        {
           
            IList<ElementPermission> lstPer = new List<ElementPermission>();
            if (roleNames.Contains("Super Admin"))
            {
                lstPer.Add(new ElementPermission()
                {
                    ActionName = "all",
                    Controller = "all",
                    AreaName = "all"
                });
                _httpContextAccessor.HttpContext.Items[HttpContextKey.SuperAdminElementAllow] = 1;
            }
            else
            {
                _httpContextAccessor.HttpContext.Items[HttpContextKey.SuperAdminElementAllow] = 0;
                lstPer = GetElementPermission(PermissionListToXML(permission), roleNames).Result;
            }
            SetElementPermissionJs(lstPer);
            _httpContextAccessor.HttpContext.Items[HttpContextKey.ElementPermission] = lstPer;
        }
        private async Task<IList<ElementPermission>> GetElementPermission(string actionXML, string roleNames)
        {
            try
            {
                List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@ActionXML", actionXML),
                new SQLParam("@RoleNames", roleNames),
            };
                SQLGetListAsync handler = new SQLGetListAsync();
                return await handler.ExecuteAsListAsync<ElementPermission>("[dbo].[usp_Permission_GetRequired]", sQLParam);

            }
            catch { throw; }
        }
        private string PermissionListToXML(List<ElementPermission> permissions)
        {
            StringBuilder sb = new StringBuilder();
            string controller = _httpContextAccessor.HttpContext.Items[HttpContextKey.PageName] as string;
            string area = _httpContextAccessor.HttpContext.Items[HttpContextKey.AreaName] as string;
            sb.Append("<Root>");
            foreach (ElementPermission p in permissions)
            {
                if (string.IsNullOrEmpty(p.AreaName))
                    p.AreaName = area;
                if ((string.IsNullOrEmpty(p.Controller)))
                    p.Controller = controller;
                sb.Append("<Item>");
                sb.Append("<Area>");
                sb.Append(p.AreaName);
                sb.Append("</Area>");
                sb.Append("<PageName>");
                sb.Append(p.Controller);
                sb.Append("</PageName>");
                sb.Append("<ActionName>");
                sb.Append(p.ActionName);
                sb.Append("</ActionName>");
                sb.Append("</Item>");
            }
            sb.Append("</Root>");
            return sb.ToString();
        }
        /// <summary>
        /// Check UI element action has permission. Required prior invocation of the HasElementPermission method in the current context. 
        /// </summary>
        /// <param name="permission"></param>
        /// <returns></returns>
        public bool CheckPermission(string AreaName, string ControllerName, string ActionName)
        {
            AreaName = AreaName.ToLower();
            ControllerName = ControllerName.ToLower();
            ActionName = ActionName.ToLower();
            if (_httpContextAccessor.HttpContext.Items[HttpContextKey.SuperAdminElementAllow].ToString() == "1")
                return true;
            IList<ElementPermission> lstPermission = _httpContextAccessor.HttpContext.Items[HttpContextKey.ElementPermission] as IList<ElementPermission>;
            return lstPermission.Where(a => a.Controller == ControllerName && a.ActionName == ActionName).Count() > 0;
        }
        public bool CheckPermission(string ControllerName, string ActionName)
        {
            string area = _httpContextAccessor.HttpContext.Items[HttpContextKey.AreaName] as string;
            return CheckPermission(area, ControllerName, ActionName);
        }
        /// <summary>
        /// Use Current area and controller
        /// </summary>
        /// <param name="ActionName"></param>
        /// <returns></returns>
        public bool CheckPermission(string ActionName)
        {
            string controller = _httpContextAccessor.HttpContext.Items[HttpContextKey.PageName] as string;
            string area = _httpContextAccessor.HttpContext.Items[HttpContextKey.AreaName] as string;
            return CheckPermission(area, controller, ActionName);
        }

        public void SetElementPermissionJs(IList<ElementPermission> lstPermission)
        {
            string jsVar = "var AllowPermission=" + JsonSerializer.Serialize(lstPermission) + ";";
            AppendHttpContextItem(HttpContextKey.JSVariable, jsVar);
        }
        private void AppendHttpContextItem(string key, string value)
        {
            var prevVal = _httpContextAccessor.HttpContext.Items[key] as string;
            if (!string.IsNullOrEmpty(prevVal))
                value = prevVal + value;
            _httpContextAccessor.HttpContext.Items[key] = value;
        }

    }
}
