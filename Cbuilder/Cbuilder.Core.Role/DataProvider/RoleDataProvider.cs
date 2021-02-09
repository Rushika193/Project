using Cbuilder.Core.API.Enum;
using Cbuilder.Core.API.Models;
using SQLHelper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cbuilder.Core.Role
{
    public class RoleDataProvider
    {
        public async Task<OperationStatus> AddUpdateRole(RoleViewModel userRole, string userName)
        {
            List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@RoleName", userRole.Name),
                new SQLParam("@AliasName", userRole.AliasName),
                new SQLParam("@ID", userRole.ID),
                new SQLParam("@Description", userRole.Description),
                new SQLParam("@IsActive", userRole.IsActive),
                new SQLParam("@SelectedPageActions", userRole.SelectedPageActions),
                 new SQLParam("@UserName", userName)
            };
            try
            {
                SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
                int result = await handler.ExecuteNonQueryAsync("[dbo].[usp_Roles_AddUpdate]", sQLParam, "@Status");
                if (result == 1)
                {
                    return new OperationStatus { Message = "Role added successfully.", StatusCode = StatusCode.Created, Result = result };
                }
                else if (result == 2)
                {
                    return new OperationStatus { Message = "Role updated successfully.", StatusCode = StatusCode.Updated, Result = result };
                }
                return new OperationStatus { Message = "Something went wrong while saving role data.", StatusCode = StatusCode.ServerError, Result = result };
            }
            catch
            {
                throw;
            }
        }
        public async Task<IList<RoleViewModel>> GetAllRole(string name, int offset, int limit)
        {
            SQLGetListAsync sqlhandler = new SQLGetListAsync();
            List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@RoleName", name),
                new SQLParam("@offset", offset),
                new SQLParam("@limit", limit)
            };
            try
            {
                return await sqlhandler.ExecuteAsListAsync<RoleViewModel>("[dbo].[usp_Roles_GetAll]", sQLParam);
            }
            catch
            {
                throw;
            }
        }
        public async Task<OperationStatus> DeleteRoleByID(string roleID, string userName)
        {
            List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@RoleID", roleID),
                new SQLParam("@UserName", userName)
            };
            try
            {
                SQLExecuteNonQueryAsync sqlhandler = new SQLExecuteNonQueryAsync();
                int result = await sqlhandler.ExecuteNonQueryAsync("[dbo].[usp_Roles_DeleteByID]", sQLParam, "@Status");
                if (result == 1)
                {
                    return new OperationStatus { Message = "Role deleted successfully.", StatusCode = StatusCode.Deleted, Result = result };
                }
                return new OperationStatus { Message = "Something went wrong while deleting role.", StatusCode = StatusCode.ServerError, Result = result };
            }
            catch
            {
                throw;
            }
        }

        public async Task<RoleViewModel> GetRoleByID(string roleID)
        {
            List<SQLParam> param = new List<SQLParam>
            {
                new SQLParam("@RoleID", roleID)
            };
            try
            {
                SQLGetAsync sqlhandler = new SQLGetAsync();
                return await sqlhandler.ExecuteAsObjectAsync<RoleViewModel>("[dbo].[usp_Roles_GetByID]", param);
            }
            catch
            {
                throw;
            }
        }

        public async Task<IList<RoleViewModel>> GetAllRoleView()
        {
            try
            {
                SQLGetListAsync handler = new SQLGetListAsync();
                return await handler.ExecuteAsListAsync<RoleViewModel>("[dbo].[usp_Roles_GetAllView]");
            }
            catch
            {
                throw;
            }
        }
        public async Task<string> GetRoleRedirectURL(string roleNames, int siteID)
        {
            List<SQLParam> param = new List<SQLParam>
            {
                new SQLParam("@RoleIDs", roleNames),
                new SQLParam("@SiteID", siteID)

            };
            try
            {
                SQLGetAsync sqlhandler = new SQLGetAsync();
                return await sqlhandler.ExecuteAsScalarAsync<string>("[dbo].[usp_Admin_RoleUrlMap_GetByRole]", param);
            }
            catch
            {
                throw;
            }
        }

        public async Task<OperationStatus> SaveRolewiseRedirect(string roleUrlXML, int siteID, string userName)
        {
            List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@RoleUrlXML", roleUrlXML),
                new SQLParam("@UserName", userName),
                new SQLParam("@SiteID", siteID)
            };
            try
            {
                SQLExecuteNonQueryAsync sqlhandler = new SQLExecuteNonQueryAsync();
                int result = await sqlhandler.ExecuteNonQueryAsync("[dbo].[usp_RolewiseRedirect_AddUpdate]", sQLParam, "@Status");
                if (result == 1)
                {
                    return new OperationStatus { Message = "Role and Redirect Url mapped successfully.", StatusCode = StatusCode.Created, Result = result };
                }
                return new OperationStatus { Message = "Something went wrong while mapping role and page.", StatusCode = StatusCode.ServerError, Result = result, IsSuccess = false };
            }
            catch
            {
                throw;
            }
        }

        public async Task<IList<RoleRedirectModel>> GetAllRoleRedirectUrl(int siteID)
        {
            //List<SQLParam> param = new List<SQLParam>
            //{                
            //    new SQLParam("@SiteID", siteID)
            //};
            try
            {
                SQLGetListAsync sqlhandler = new SQLGetListAsync();
                return await sqlhandler.ExecuteAsListAsync<RoleRedirectModel>("[dbo].[usp_RolewiseRedirect_GetAll]");
            }
            catch
            {
                throw;
            }
        }
    }

}

