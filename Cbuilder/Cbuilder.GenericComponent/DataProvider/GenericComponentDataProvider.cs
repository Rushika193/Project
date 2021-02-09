using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using SQLHelper;

namespace Cbuilder.GenericComponent
{
    public class GenericComponentDataProvider
    {
        public async Task<int> AddUpdateGenericComp(ComponentDetails comp)
        {
            List<SQLParam> param = new List<SQLParam>();
            param.Add(new SQLParam("@ComponentId", comp.ComponentId));
            param.Add(new SQLParam("@ComponentName", comp.ComponentName));
            param.Add(new SQLParam("@JsonData", comp.JSONData));
            param.Add(new SQLParam("@Label", comp.Label));
            param.Add(new SQLParam("@SiteId", comp.SiteId));
            SQLExecuteNonQueryAsync sql=new SQLExecuteNonQueryAsync();
            return await sql.ExecuteNonQueryAsync("usp_Webbuilder_GenericData_AddUpdate", param,"@Status");
        }

        public async Task DeleteComponent(int componentId, int siteId)
        {
            List<SQLParam> param = new List<SQLParam>();
            param.Add(new SQLParam("@ComponentId", componentId));
            param.Add(new SQLParam("@SiteId", siteId));
            SQLExecuteNonQueryAsync sql = new SQLExecuteNonQueryAsync();
            await sql.ExecuteNonQueryAsync("usp_Webbuilder_GenericData_DeleteByComponentId", param);
        }

        public async Task<IList<ComponentInfo>> GetGenericComponent(int componentId, int siteId)
        {
            List<SQLParam> param = new List<SQLParam>();
            param.Add(new SQLParam("@ComponentId", componentId));
            param.Add(new SQLParam("@SiteId", siteId));
            SQLGetListAsync sqlList = new SQLGetListAsync();
            return await sqlList.ExecuteAsListAsync<ComponentInfo>("usp_Webbuilder_GenericData_GetAllComponent", param);
        }
    }
}
