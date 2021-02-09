using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.Core.Permissions
{
    public interface IPermission
    {
        /// <summary>
        /// Check permission to role in controller action
        /// </summary>
        /// <param name="Area"></param>
        /// <param name="PageName"></param>
        /// <param name="ActionName"></param>
        /// <param name="RoleNames"></param>
        /// <returns></returns>
        Task<bool> CheckAdminPagePermission(string area, string ModuleName, string ActionName, string RoleNames);

        /// <summary>
        /// Check permission to role in controller action
        /// </summary>
        /// <param name="PageName"></param>
        /// <param name="ActionName"></param>
        /// <param name="RoleNames"></param>
        /// <returns></returns>
        Task<bool> CheckFrontPagePermission(string ModuleName, string ActionName, string RoleNames);

        /// <summary>
        /// Fetch require UI element permission and set in current context so that you can use HasElementPermission method.
        /// </summary>
        /// <param name="permission"></param>
        /// <param name="roleNames"></param>
        void HasElementPermission(List<ElementPermission> Permissions, string RoleNames);
        
        /// <summary>
        /// Check UI element action has permission. Required prior invocation of the ElementPermission method in the current context. 
        /// </summary>
        /// <param name="permission"></param>
        /// <returns></returns>
        bool CheckPermission(string AreaName,string ControllerName,string ActionName);
        bool CheckPermission(string ControllerName,string ActionName);
       /// <summary>
       /// Check Element Permission for current area controller 
       /// </summary>
       /// <param name="ActionName"></param>
       /// <returns></returns>
        bool CheckPermission(string ActionName);

    }
}
