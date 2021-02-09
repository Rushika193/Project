using Cbuilder.Core.Helper.Models;
using SQLHelper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cbuilder.Webbuilder
{
    internal class WebBuilderDataProvider
    {
        internal async Task<int> AddUpdate(WebBuilderInfo objWebBuilder)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>
                {
                    new SQLParam("@WebBuilderID", objWebBuilder.WebBuilderID),
                    new SQLParam("@EditDOM", objWebBuilder.EditDOM),
                    new SQLParam("@ViewDOM", objWebBuilder.ViewDOM),
                    new SQLParam("@Culture", objWebBuilder.Culture),
                    new SQLParam("@UserName", objWebBuilder.UserName),
                    new SQLParam("@Extra", objWebBuilder.Extra),
                    new SQLParam("@Settings", objWebBuilder.Settings),
                    new SQLParam("@PageName", objWebBuilder.PageName),
                    new SQLParam("@Header", objWebBuilder.Header),
                    new SQLParam("@HeaderEdit", objWebBuilder.HeaderEdit),
                    new SQLParam("@Footer", objWebBuilder.Footer),
                    new SQLParam("@FooterEdit", objWebBuilder.FooterEdit),
                    new SQLParam("@PackageXML", objWebBuilder.PackageXML),
                    new SQLParam("@PageComponent", objWebBuilder.PageComponent),
                    new SQLParam("@HeaderFooterComponent", objWebBuilder.HeaderFooterComponent),
                    new SQLParam("@CloneWebBuilderID", objWebBuilder.CloneWebBuilderID),
                    new SQLParam("@SiteID", objWebBuilder.SiteID)
                };
                SQLExecuteNonQueryAsync sqlHandler = new SQLExecuteNonQueryAsync();
                return await sqlHandler.ExecuteNonQueryAsync("[usp_WebBuilder_AddUpdate]", sqlParam, "@webbuildernewID");
            }
            catch
            {
                throw;
            }
        }

        internal async Task<int> AddUpdatePublished(int webBuilderID, int siteID)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>
                {
                    new SQLParam("@WebBuilderID", webBuilderID),
                    new SQLParam("@SiteID", siteID)
                };
                SQLExecuteNonQueryAsync sqlHandler = new SQLExecuteNonQueryAsync();
                return await sqlHandler.ExecuteNonQueryAsync("[usp_WebBuilder_AddUpdatePublished]", sqlParam, "@webbuildernewID");
            }
            catch
            {
                throw;
            }
        }

        internal async Task<CbuilderView> GetEditDOMByID(WebBuilderInfo objWebBuilder)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>
                {
                    new SQLParam("@Culture", objWebBuilder.Culture),
                    new SQLParam("@PageName", objWebBuilder.PageName),
                    new SQLParam("@SiteID", objWebBuilder.SiteID)
                };
                SQLGetAsync sqlHandler = new SQLGetAsync();
                return await sqlHandler.ExecuteAsObjectAsync<CbuilderView>("[usp_WebBuilder_GetEditDOMByID]", sqlParam);
            }
            catch
            {
                throw;
            }
        }

        internal async Task<IList<WebBuilderPages>> GetPageList(int siteID)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>
                {
                    new SQLParam("@SiteID", siteID)
                };
                SQLGetListAsync sqlHandler = new SQLGetListAsync();
                return await sqlHandler.ExecuteAsListAsync<WebBuilderPages>("[usp_WebBuilder_GetPages]", sqlParam);
            }
            catch
            {
                throw;
            }
        }
        internal async Task<IList<WebBuilderPages>> GetAllPageList(int siteID)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>
                {
                    new SQLParam("@SiteID", siteID)
                };
                SQLGetListAsync sqlHandler = new SQLGetListAsync();
                return await sqlHandler.ExecuteAsListAsync<WebBuilderPages>("[usp_WebBuilder_GetAllPages]", sqlParam);
            }
            catch
            {
                throw;
            }
        }
        internal async Task<IList<WebBuilderPages>> GetDashboardPageList(int siteID)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>
                {
                    new SQLParam("@SiteID", siteID)
                };
                SQLGetListAsync sqlHandler = new SQLGetListAsync();
                return await sqlHandler.ExecuteAsListAsync<WebBuilderPages>("[usp_Webbuilder_dashboardpages]", sqlParam);
            }
            catch
            {
                throw;
            }
        }

        internal async Task<IList<WebBuilderPages>> GetForbiddenPageList(int siteID)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>
                {
                    new SQLParam("@SiteID", siteID)
                };
                SQLGetListAsync sqlHandler = new SQLGetListAsync();
                return await sqlHandler.ExecuteAsListAsync<WebBuilderPages>("[usp_Webbuilder_ForbiddenPages]", sqlParam);
            }
            catch
            {
                throw;
            }
        }



        internal async Task<IList<BuilderComponentJson>> GetComponentValue(int siteID)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>
                {
                    new SQLParam("@SiteID", siteID)
                };
                SQLGetListAsync sqlHandler = new SQLGetListAsync();
                return await sqlHandler.ExecuteAsListAsync<BuilderComponentJson>("[usp_WebBuilder_ComponentGetList]", sqlParam);
            }

            catch
            {
                throw;
            }
        }
        internal async Task<IList<BuilderComponentJson>> GetBucketComponents(int siteID)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>
                {
                    new SQLParam("@SiteID", siteID)
                };
                SQLGetListAsync sqlHandler = new SQLGetListAsync();
                return await sqlHandler.ExecuteAsListAsync<BuilderComponentJson>("[usp_WebBuilder_GetBucketList]", sqlParam);
            }
            catch
            {
                throw;
            }
        }

        internal async Task<ApplicationDetail> GetApplicationName(int siteID)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>
                {
                    new SQLParam("@SiteID", siteID)
                };
                SQLGetAsync sqlHandler = new SQLGetAsync();
                return await sqlHandler.ExecuteAsObjectAsync<ApplicationDetail>("[usp_webbuilder_application_GetApplicationName]", sqlParam);
            }
            catch
            {
                throw;
            }
        }
        internal async Task<IList<ApplicationDetail>> GetApplicationNames(int siteID)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>
                {
                    new SQLParam("@SiteID", siteID)
                };
                SQLGetListAsync sqlHandler = new SQLGetListAsync();
                return await sqlHandler.ExecuteAsListAsync<ApplicationDetail>("[usp_Webbuilder_Application_GetList]",sqlParam);
            }
            catch
            {
                throw;
            }
        }
        internal async Task<IList<ControllerDetail>> GetAPIList(string pageName, int siteID)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>
                {
                    new SQLParam("@PageName", pageName),
                    new SQLParam("@SiteID", siteID)
                };
                SQLGetListAsync sqlHandler = new SQLGetListAsync();
                return await sqlHandler.ExecuteAsListAsync<ControllerDetail>("[Usp_Webbuilder_GetAPIList]", sqlParam);
            }
            catch
            {
                throw;
            }
        }

        internal List<ControllerDetail> GetAPIListPublished(string pageName, int siteID)
        {
            try
            {
                List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>
                {
                    new KeyValuePair<string, object>("@PageName", pageName),
                    new KeyValuePair<string, object>("@SiteID", siteID)
                };
                SQLHandler sqlHandler = new SQLHandler();
                return sqlHandler.ExecuteAsList<ControllerDetail>("[Usp_Webbuilder_GetAPIListPublished]", param);
            }
            catch
            {
                throw;
            }
        }
        internal async Task<IList<ControllerDetail>> GetMethodDetails(string invokeOn, int siteID)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>
                {
                    new SQLParam("@InvokeOn", invokeOn),
                    new SQLParam("@SiteID", siteID)
                };
                SQLGetListAsync sqlHandler = new SQLGetListAsync();
                return await sqlHandler.ExecuteAsListAsync<ControllerDetail>("[Usp_Webbuilder_GetMethodsDetails]", sqlParam);
            }
            catch
            {
                throw;
            }
        }
        internal async Task<int> CheckPage(string pageName, Guid pageID, int siteID)
        {
            int exists = 1;
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>
                {
                    new SQLParam("@PageID", pageID),
                    new SQLParam("@PageName", pageName),
                    new SQLParam("@SiteID", siteID)
                };
                SQLExecuteNonQueryAsync sqlHandler = new SQLExecuteNonQueryAsync();
                return await sqlHandler.ExecuteNonQueryAsGivenTypeAsync<int>("[usp_webbuilder_checkPage]", sqlParam, "@Exists");
            }
            catch
            {
                throw;
            }
        }
        internal async Task<int> UpdatePageName(string pageName, int webbuilderID, int cloneWebBuilderID, string culture)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>
                {
                    new SQLParam("@PageName", pageName),
                    new SQLParam("@WebbuilderID", webbuilderID),
                    new SQLParam("@CloneWebBuilderID", cloneWebBuilderID),
                    new SQLParam("@Culture", culture)
                };
                SQLExecuteNonQueryAsync sqlHandler = new SQLExecuteNonQueryAsync();
                return await sqlHandler.ExecuteNonQueryAsync("[usp_WebBuilder_UpdatePageName]", sqlParam);
            }
            catch
            {
                throw;
            }
        }

        internal async Task<int> UpdateComponents(BuilderComponent builderComponent)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>
                {
                    new SQLParam("@ComponentName", builderComponent.ComponentName),
                    new SQLParam("@ComponentValue", builderComponent.ComponentValue),
                    new SQLParam("@ComponentViewValue", builderComponent.ComponentViewValue),
                    new SQLParam("@Version", builderComponent.Version),
                    new SQLParam("@UniversalComponentID", builderComponent.ComponentID),
                    new SQLParam("@Type", builderComponent.Type)
                };
                SQLExecuteNonQueryAsync sqlHelper = new SQLExecuteNonQueryAsync();
                return await sqlHelper.ExecuteNonQueryAsync("[usp_WebBuilder_ComponentInsert]", sqlParam, "@output");
            }
            catch
            {
                throw;
            }
        }


        internal async Task<int> DeletePage(DeletePage deletePage)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>
                {
                    new SQLParam("@PageID", deletePage.PageID),
                    new SQLParam("@UserName", deletePage.UserName)
                };
                SQLExecuteNonQueryAsync sqlHelper = new SQLExecuteNonQueryAsync();
                return await sqlHelper.ExecuteNonQueryAsync("[usp_WebBuilder_Page_delete]", sqlParam);
            }
            catch
            {
                throw;
            }
        }
        internal async Task<PageDetail> GetPageDetails(Guid pageID)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>
                {
                    new SQLParam("@PageID", pageID)
                };
                SQLGetAsync sqlHandler = new SQLGetAsync();
                return await sqlHandler.ExecuteAsObjectAsync<PageDetail>("usp_Webbuilder_Page_Getdetails", sqlParam);
            }
            catch
            {
                throw;
            }
        }


        internal async Task<IList<BuilderComponentJson>> GetComponentViewValue(string pageName, bool isPublished, int siteID)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>
                {
                    new SQLParam("@PageName", pageName),
                    new SQLParam("@IsPublished", isPublished),
                    new SQLParam("@SiteID", siteID)
                };
                SQLGetListAsync sQLGetListAsync = new SQLGetListAsync();
                return await sQLGetListAsync.ExecuteAsListAsync<BuilderComponentJson>("[usp_WebBuilder_ComponentGetViewList]", sqlParam);
            }
            catch
            {
                throw;
            }
        }
        internal async Task<IList<LanguageList>> GetLanguageLists(int siteID)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>
                {
                    new SQLParam("@SiteID", siteID)
                };
                SQLGetListAsync sQLGetListAsync = new SQLGetListAsync();
                return await sQLGetListAsync.ExecuteAsListAsync<LanguageList>("[usp_WebBuilder_LanguageList]", sqlParam);
            }
            catch
            {
                throw;
            }
        }

        internal async Task<WebbuilderViewInfo> GetPageViewDOM(WebbuilderViewGetInfo webbuilderViewGetInfo)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>
                {
                    new SQLParam("@Culture", webbuilderViewGetInfo.Culture),
                    new SQLParam("@PageName", webbuilderViewGetInfo.PageName),
                    new SQLParam("@SiteID", webbuilderViewGetInfo.SiteID)
                };
                SQLGetAsync sqlHelper = new SQLGetAsync();
                if (webbuilderViewGetInfo.PreviewMode)
                    return await sqlHelper.ExecuteAsObjectAsync<WebbuilderViewInfo>("[usp_WebBuilder_GetViewDOMByID]", sqlParam);
                else
                    return await sqlHelper.ExecuteAsObjectAsync<WebbuilderViewInfo>("[usp_WebBuilder_GetPublishedViewDOMByID]", sqlParam);

            }
            catch
            {
                throw;
            }
        }
        internal async Task<IList<BuilderComponentJson>> GetAppsExtraComponent(string InvokeXMLparams, string PageName, int siteID)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>
                {
                    new SQLParam("@XMLparams", InvokeXMLparams),
                    new SQLParam("@PageName", PageName),
                    new SQLParam("@SiteID", siteID)
                };
                SQLGetListAsync sqlHelper = new SQLGetListAsync();
                return await sqlHelper.ExecuteAsListAsync<BuilderComponentJson>("[usp_Webbuilder_AppsComponents_Get]", sqlParam);
            }
            catch
            {
                throw;
            }
        }
        internal async Task<int> EnableHeadFoot(HeaderFooter headerFooter)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>
                {
                    new SQLParam("@PageName", headerFooter.PageName),
                    new SQLParam("@Section", headerFooter.Section),
                    new SQLParam("@Enabled", headerFooter.Enabled),
                    new SQLParam("@SiteID", headerFooter.SiteID)
                };
                SQLExecuteNonQueryAsync sqlHandler = new SQLExecuteNonQueryAsync();
                return await sqlHandler.ExecuteNonQueryAsync("[usp_WebBuilder_SystemPage_HeadFoot]", sqlParam);
            }
            catch
            {
                throw;
            }
        }
        //internal CbuilderView GetCbuilderViewData(string pageName)
        //{
        //    CbuilderView cbuilderView = new CbuilderView();
        //    try
        //    {
        //        List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
        //        param.Add(new KeyValuePair<string, object>("@PageName", pageName));

        //        SQLHandler sqlHandler = new SQLHandler();
        //        DataSet dataSet = sqlHandler.ExecuteAsDataSet("[usp_Webbuilder_editor_getAll]", param);

        //    }
        //    catch
        //    {
        //        throw;
        //    }
        //    return cbuilderView
        //}
    }
}
