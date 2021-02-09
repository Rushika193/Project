using SQLHelper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cbuilder.ManageMassMail
{
    public class MassMailSettingProvider
    {
        internal async Task AddUpdateSetting(string Settings, string UserName)
        {
            try
            {
                List<SQLParam> Param = new List<SQLParam>
                {
                    new SQLParam("@Settings", Settings),
                    new SQLParam("@UserName", UserName)
                };
                SQLExecuteNonQueryAsync objHandler = new SQLExecuteNonQueryAsync();
                await objHandler.ExecuteNonQueryAsync("[dbo].[usp_Wb__MassMailSettings_addUpdate]", Param);
            }
            catch
            {
                throw;
            }
        }
        internal async Task<IList<MassMailSettingInfo>> GetAllSettings()
        {
            try
            {
                SQLGetListAsync objHandler = new SQLGetListAsync();
                return await objHandler.ExecuteAsListAsync<MassMailSettingInfo>("[dbo].[usp_Wb__MassMailSettings_GetAll]");
            }
            catch
            {
                throw;
            }
        }

    }
}
