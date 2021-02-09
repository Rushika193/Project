using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using SQLHelper;

namespace ContentderAI.ServiceManager.Helper.Settings
{
    public class SettingDataProvider
    {
        public DataSet GetAllCachedSettings()
        {
            try
            {
                var value = new SQLHandler().ExecuteAsDataSet("[usp_Webbuilder_Settings_Getall]");
                return value;
            }
            catch
            {
                throw;
            }
        }

        public DataSet GetSettingsValueByKeys(string keys)
        {
            try
            {
                var ParaMeterCollection = new List<KeyValuePair<string, string>>
                {
                    new KeyValuePair<string, string>("@Keys", keys)
                };
                var value = new SQLHandler().ExecuteAsDataSet("[usp_Webbuilder_Settings_GetByKeys]", ParaMeterCollection);
                return value;
            }
            catch
            {
                throw;
            }
        }

        public async Task<KeyValue> GetSettingValueByKey(string settingKey)
        {
            try
            {
                var sqlParam = new List<SQLParam>
                {
                    new SQLParam("@SettingKey", settingKey)
                };
                var value = await new SQLGetAsync().ExecuteAsObjectAsync<KeyValue>("[usp_webbuilder_settings_getbykey]", sqlParam);
                return value;
            }
            catch
            {
                throw;
            }
        }

        public async Task<int> SettingValueUpdate(string settingKey, string settingValue)
        {
            try
            {
                var sqlParam = new List<SQLParam>
                {
                    new SQLParam("@SettingKey", settingKey),
                    new SQLParam("@SettingValue", settingValue)
                };
                var value = await new SQLExecuteNonQueryAsync().ExecuteNonQueryAsync("[usp_Webbuilder_Settings_UpdateValue]", sqlParam);
                return value;
            }
            catch
            {
                throw;
            }
        }
    }
}
