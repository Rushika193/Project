using Cbuilder.Core.API.Enum;
using Cbuilder.Core.API.Models;
using SQLHelper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cbuilder.MiniEditor
{
    public class MiniEditorManager
    {
        /// <summary>
        /// Add Update mini editor component
        /// </summary>
        /// <param name="Component"></param>
        /// <param name="UserName"></param>
        /// <param name="ModuleName"></param>
        /// <param name="SiteID"></param>
        /// <returns></returns>
        public async Task<OperationStatus> AddUpdateComponent(ComponentJson Component,string ModuleName, string UserName, int SiteID)
        {
            try
            {
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@SiteID", SiteID),
                    new SQLParam("@ComponentValue", Component.ComponentValue),
                    new SQLParam("@ComponentName", Component.ComponentName),
                    new SQLParam("@ModuleName", ModuleName),
                    new SQLParam("@AddedBy", UserName)
                 };
                SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
                int result = await handler.ExecuteNonQueryAsync("[dbo].[usp_MiniEditor_Component_AddUpdate]", param, "@ReturnValue");
                switch (result)
                {
                    case 1:
                        return new OperationStatus { Message = "Mini Editor Component Added Successfully.", StatusCode = StatusCode.Created };
                    case 2:
                        return new OperationStatus { Message = "Mini Editor Component Updated Successfully.", StatusCode = StatusCode.Updated };
                    default:
                        return new OperationStatus { IsSuccess = false, Message = "Something went wrong while adding mini editor component.", StatusCode = StatusCode.ServerError };
                }
            }
            catch
            {
                throw;
            }
        }
        public async Task<IList<ComponentJson>> GetComponents(string ModuleName, string BasicCompNames, int SiteID)
        {
            try
            {
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@ModuleName", ModuleName),
                    new SQLParam("@SiteID", SiteID),
                    new SQLParam("@BasicCompNames", BasicCompNames)
                 };
                SQLGetListAsync handler = new SQLGetListAsync();
                return await handler.ExecuteAsListAsync<ComponentJson>("[dbo].[usp_MiniEditor_Component_GetByName]", param);
            }
            catch
            {
                throw;
            }
        }
    }
}

