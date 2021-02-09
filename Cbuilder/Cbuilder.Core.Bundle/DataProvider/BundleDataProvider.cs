using SQLHelper;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.Core.Bundle
{
    public class BundleDataProvider
    {
        internal async Task<AssetCollection> GetAssetCollection(string pageName, string roleName)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>
                {
                    new SQLParam("@PageName", pageName),
                    new SQLParam("@RoleName", roleName)
                };
                SQLGetAsync sqlHandler = new SQLGetAsync();
                return await sqlHandler.ExecuteAsObjectAsync<AssetCollection>("[usp_Webbuilder_AssestCollection_Get]", sqlParam);
            }
            catch
            {
                throw;
            }
        }
        internal async Task<int> SaveAssetCollection(AssetCollection assetCollection)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>
                {
                    new SQLParam("@PageName", assetCollection.PageName),
                    new SQLParam("@RoleName", assetCollection.RoleName),
                    new SQLParam("@Name", assetCollection.Name),
                    new SQLParam("@Csslink", assetCollection.CssLink),
                    new SQLParam("@JSHeaderLink", assetCollection.JSHeaderLink),
                    new SQLParam("@JSFooterLink", assetCollection.JSFooterLink),
                };
                SQLExecuteNonQueryAsync sqlHandler = new SQLExecuteNonQueryAsync();
                return await sqlHandler.ExecuteNonQueryAsync("[usp_Webbuilder_AssestCollection_AddUpdate]", sqlParam);
            }
            catch
            {
                throw;
            }
        }
    }
}
