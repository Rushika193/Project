#region "References"
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using SQLHelper;
using Cbuilder.Core.Helper;
using System.Threading.Tasks;
#endregion

namespace Cbuilder.Core.Pages
{
    /// <summary>
    /// Manupulates data for PageDataProvider
    /// </summary>
    public class PageDataProvider
    {        
        
        /// <summary>
        /// Connect to database and add update pages.
        /// </summary>
        /// <param name="objPage">Object of PortalPage class.</param>
        public async Task<string> AddUpdatePages(PortalPage objPage,List<PageRolePermission> RolePermissions,int siteID,string userName)
        {
            SQLExecuteNonQueryAsync sagesql = new SQLExecuteNonQueryAsync();

            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@PageID", objPage.PageID));
            sQLParam.Add(new SQLParam("@PageName", objPage.PageName.ToString()));
            sQLParam.Add(new SQLParam("@Title", objPage.Title));
            sQLParam.Add(new SQLParam("@Description", objPage.Description));
            sQLParam.Add(new SQLParam("@KeyWords", objPage.KeyWords));
            sQLParam.Add(new SQLParam("@IsActive", objPage.IsActive));
            sQLParam.Add(new SQLParam("@SiteID", siteID));
            sQLParam.Add(new SQLParam("@AddedBy", userName));
            try
            {
                string pageid = string.Empty;
                pageid= await sagesql.ExecuteNonQueryAsGivenTypeAsync<string>("[usp_PageMgr_AddUpdatePage]", sQLParam, "@output");
                
                if (pageid != string.Empty && RolePermissions.Count>0)
                {
                    foreach (PageRolePermission rolePermission in RolePermissions)
                    {
                      await  AddUpdteRolePermission(pageid, rolePermission.RoleName, rolePermission.SelectedPageActions, userName);
                    }
                }
                return pageid;


            }            
            catch 
            {
                throw;
            }
        }

        internal async Task<int> AddUpdteRolePermission(string pageID, string roleName, string selectedPageActions, string userName)
        {
            SQLExecuteNonQueryAsync sagesql = new SQLExecuteNonQueryAsync();

            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@PageID", pageID));
            sQLParam.Add(new SQLParam("@RoleName", roleName));
            sQLParam.Add(new SQLParam("@SelectedPageActions", selectedPageActions));
            sQLParam.Add(new SQLParam("@UserName", userName));
            try
            {
                return await sagesql.ExecuteNonQueryAsync("[usp_PageMgr_AddUpdteRolePermission]", sQLParam, "@Status");
            }
            catch 
            {
                throw;
            }
        }


        /// <summary>
        /// Connect to database and update application setting key value.
        /// </summary>
        /// <param name="PageName">Page name.</param> 
        public async Task UpdSettingKeyValue(string PageName)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@PageID", PageName));
            SQLExecuteNonQueryAsync sagesql = new SQLExecuteNonQueryAsync();
            try
            {
                await sagesql.ExecuteNonQueryAsync("dbo.usp_PageMgr_UpdSettingKeyValue", sQLParam);
            }
            catch
            {
                throw;
            }
        }  

        internal async Task<IList<AdminPage>> GetAdminPages(string areaName, string keyword, int offset, int limit)
        {
            SQLGetListAsync sqlhandler = new SQLGetListAsync();
            List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@AreaName", areaName),
                new SQLParam("@Keyword", keyword),
                new SQLParam("@offset", offset),
                new SQLParam("@limit", limit)
            };
            try
            {
                return await sqlhandler.ExecuteAsListAsync<AdminPage>("[usp_Page_GetAdminPages]", sQLParam);
            }
            catch
            {
                throw;
            }
        }

        internal async Task<IList<PortalPage>> GetPortalPages(string keyword, int siteID, int offset, int limit)
        {
            SQLGetListAsync sqlhandler = new SQLGetListAsync();
            List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@Keyword", keyword),
                new SQLParam("@SiteID", siteID),
                new SQLParam("@offset", offset),
                new SQLParam("@limit", limit)
            };
            try
            {
                return await sqlhandler.ExecuteAsListAsync<PortalPage>("[usp_Page_GetPortalPages]", sQLParam);
            }
            catch
            {
                throw;
            }
        }

        internal async Task<IList<PageAction>> GetPageActionsByPageId(string pageID)
        {
            SQLGetListAsync sqlhandler = new SQLGetListAsync();
            List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@PageID", pageID)                
            };
            try
            {
                return await sqlhandler.ExecuteAsListAsync<PageAction>("[usp_Page_GetActionsByPageId]", sQLParam);
            }
            catch
            {
                throw;
            }
        }

        internal async Task<IList<PageRolePermission>> GetPageRoleByPageId(string pageID)
        {
            SQLGetListAsync sqlhandler = new SQLGetListAsync();
            List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@PageID", pageID)
            };
            try
            {
                return await sqlhandler.ExecuteAsListAsync<PageRolePermission>("[usp_Page_GetPageRoleByPageId]", sQLParam);
            }
            catch
            {
                throw;
            }
        }
    }
}
