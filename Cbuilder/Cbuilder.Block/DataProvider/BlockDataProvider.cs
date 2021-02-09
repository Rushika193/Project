using Cbuilder.Block.Entities;
using SQLHelper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.Block
{
    public class BlockDataProvider
    {
        internal async Task<IList<Block>> GetBoardListByUsage(Block block)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>();
                sqlParam.Add(new SQLParam("@RenderName", block.RenderName));
                SQLGetListAsync sqlHandler = new SQLGetListAsync();
                return await sqlHandler.ExecuteAsListAsync<Block>("[usp_Webbuilder_Block_GetByRenderName]", sqlParam);
            }
            catch
            {
                throw;
            }
        }
        internal async Task<int> SaveLayout(string elementXML,string moduleXML,string pageName,int siteID)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>();
                sqlParam.Add(new SQLParam("@LayoutElements", elementXML));
                sqlParam.Add(new SQLParam("@ElementModules", moduleXML));
                sqlParam.Add(new SQLParam("@PageName", pageName));
                sqlParam.Add(new SQLParam("@SiteID", siteID));
                SQLExecuteNonQueryAsync sqlHandler = new SQLExecuteNonQueryAsync();
                return await sqlHandler.ExecuteNonQueryAsync("[dbo].[usp_Dashboard_PageLayoutElementUpdate]", sqlParam);
            }
            catch
            {
                throw;
            }
        }
        internal async Task<DataSet> GetLayoutElement(string pageName,int siteID)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>();
                sqlParam.Add(new SQLParam("@PageName", pageName));
                sqlParam.Add(new SQLParam("@SiteID", siteID));
                SQLGetListAsync sqlHandler = new SQLGetListAsync();
                return await sqlHandler.ExecuteAsDataSetAsync("[dbo].[usp_Dashboard_PageLayoutElementGet]", sqlParam);
            }
            catch
            {
                throw;
            }
        }
        internal async Task<IList<ViewModule>> GetAvailableModule()
        {
            try
            {
            //    List<SQLParam> sqlParam = new List<SQLParam>();
            
                SQLGetListAsync sqlHandler = new SQLGetListAsync();
                return await sqlHandler.ExecuteAsListAsync<ViewModule>("[dbo].[usp_Dashboard_ViewModule_GetAll]");
            }
            catch
            {
                throw;
            }
        }
        
    }
}
