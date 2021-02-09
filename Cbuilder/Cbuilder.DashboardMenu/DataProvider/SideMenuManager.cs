using Cbuilder.Core.API.Enum;
using Cbuilder.Core.API.Models;
using Cbuilder.DashboardMenu.Models;
using SQLHelper;
using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace Cbuilder.DashboardMenu
{
    public class SideMenuManager
    {
        public async Task<OperationStatus> AddUpdateMenu(DashboardSideMenu SideMenu, string UserName, int SiteID)
        {
            try
            {
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@ID", SideMenu.LinkID),
                    new SQLParam("@LinkTitle", SideMenu.LinkTitle),
                    new SQLParam("@Area", SideMenu.Area),
                    new SQLParam("@Controller", SideMenu.Controller),
                    new SQLParam("@Action", SideMenu.Action),
                    new SQLParam("@IsParent", SideMenu.IsParent),
                    new SQLParam("@ParentID", SideMenu.ParentID),
                    new SQLParam("@Culture", SideMenu.Culture),
                    new SQLParam("@Param", SideMenu.Param),
                    new SQLParam("@Icon", SideMenu.PageIcon),
                    new SQLParam("@SiteID", SiteID),
                    new SQLParam("@UserName", UserName)
                };
                SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
                int result = await handler.ExecuteNonQueryAsync("[dbo].[usp_DashboardLink_AddUpdate]", param, "@Status");
                if (result == 1)
                {
                    return new OperationStatus { Message = "Menu item added successfully.", StatusCode = StatusCode.Created, Result = result };
                }
                else if (result == 2)
                {
                    return new OperationStatus { Message = "Menu item updated successfully.", StatusCode = StatusCode.Updated, Result = result };
                }
                return new OperationStatus { Message = "Something went wrong while saving menu data.", StatusCode = StatusCode.ServerError, Result = result };
            }
            catch
            {
                throw;
            }
        }
        public async Task<OperationStatus> DeleteSideMenu(Guid ID)
        {
            try
            {
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@Id", ID)
                };
                SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
                int result = await handler.ExecuteNonQueryAsync("[dbo].[usp_DashboardLink_Delete]", param, "@Status");
                if (result == 1)
                {
                    return new OperationStatus { Message = "Menu item deleted successfully.", StatusCode = StatusCode.Deleted, Result = result };
                }
                return new OperationStatus { Message = "Something went wrong while deleting menu data.", StatusCode = StatusCode.ServerError, Result = result };
            }
            catch
            {
                throw;
            }
        }
        public async Task<IList<PageApplicationArea>> GetAreas(int SiteID)
        {
            try
            {
                SQLGetListAsync handler = new SQLGetListAsync();
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@SiteID", SiteID)
                };
                return await handler.ExecuteAsListAsync<PageApplicationArea>("[dbo].[usp_PageApplicationArea_GetAll]", param);
            }
            catch
            {
                throw;
            }
        }
        public async Task<IList<Pages>> GetPages(int SiteID, string AreaID)
        {
            try
            {
                SQLGetListAsync handler = new SQLGetListAsync();
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@AreaID", AreaID),
                    new SQLParam("@SiteID", SiteID)
                };
                return await handler.ExecuteAsListAsync<Pages>("[dbo].[usp_Pages_GetAllByArea]", param);
            }
            catch
            {
                throw;
            }
        }
        public async Task<IList<PageActions>> GetActions(string PageID)
        {
            try
            {
                SQLGetListAsync handler = new SQLGetListAsync();
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@PageID", PageID)
                };
                return await handler.ExecuteAsListAsync<PageActions>("[dbo].[usp_PageActions_GetAllByPageID]", param);
            }
            catch
            {
                throw;
            }
        }
        public async Task<IList<DashboardSideMenuView>> GetAllwithPagi(string Keyword, string Culture, int Offset, int Limit, int SiteID)
        {
            try
            {
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@Keyword", Keyword),
                    new SQLParam("@Culture", Culture),
                    new SQLParam("@Offset", Offset),
                    new SQLParam("@Limit", Limit),
                    new SQLParam("@SiteID", SiteID)
                };
                SQLGetListAsync handler = new SQLGetListAsync();
                return await handler.ExecuteAsListAsync<DashboardSideMenuView>("[dbo].[usp_DashboardLink_GetWithPagi]", param);
            }
            catch
            {
                throw;
            }
        }
        public async Task<DashboardSideMenu> GetByID(Guid LinkID, int SiteID)
        {
            try
            {
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@LinkID", LinkID),
                    new SQLParam("@SiteID", SiteID)
                };
                SQLGetAsync handler = new SQLGetAsync();
                return await handler.ExecuteAsObjectAsync<DashboardSideMenu>("[dbo].[usp_DashboardLink_GetByID]", param);
            }
            catch
            {
                throw;
            }
        }
        public async Task<IList<DashboardSideMenu>> GetAllSideMenu(Guid? LinkID, int SiteID)
        {
            try
            {
                SQLGetListAsync handler = new SQLGetListAsync();
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@LinkID", LinkID),
                    new SQLParam("@SiteID", SiteID)
                };
                return await handler.ExecuteAsListAsync<DashboardSideMenu>("[dbo].[usp_DashboardLink_GetAll]", param);
            }
            catch
            {
                throw;
            }
        }
        public async Task<IList<DashboardSideMenu>> GetAllParentMenu(int SiteID)
        {
            try
            {
                SQLGetListAsync handler = new SQLGetListAsync();
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@SiteID", SiteID)
                };
                return await handler.ExecuteAsListAsync<DashboardSideMenu>("[dbo].[usp_DashboardLink_GetAllParent]", param);
            }
            catch
            {
                throw;
            }
        }
        public async Task<IList<DashboardSideMenu>> GetSideMenuByRole(string roles, int SiteID)
        {
            try
            {
                SQLGetListAsync handler = new SQLGetListAsync();
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@RoleNames", roles),
                    new SQLParam("@SiteID", SiteID)
                };
                return await handler.ExecuteAsListAsync<DashboardSideMenu>("[dbo].[usp_DashboardLink_GetAllByPermission]", param);

            }
            catch
            {
                throw;
            }
        }
    }
}
