using SQLHelper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.Core.Helper
{
    public class SettingDataProvider
    {
        public DataSet GetAllCachaleSettings()
        {
            try
            {
                //List<KeyValuePair<string, string>> ParaMeterCollection = new List<KeyValuePair<string, string>>();
                //ParaMeterCollection.Add(new KeyValuePair<string, string>("@PortalID", PortalID));
                //ParaMeterCollection.Add(new KeyValuePair<string, string>("@SettingType", SettingType));
                DataSet ds = new DataSet();
                SQLHandler sagesql = new SQLHandler();
                ds = sagesql.ExecuteAsDataSet("[usp_Webbuilder_Settings_Getall]");
                return ds;
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
                List<KeyValuePair<string, string>> ParaMeterCollection = new List<KeyValuePair<string, string>>();
                ParaMeterCollection.Add(new KeyValuePair<string, string>("@Keys", keys));
                DataSet ds = new DataSet();
                SQLHandler sagesql = new SQLHandler();
                ds = sagesql.ExecuteAsDataSet("[usp_Webbuilder_Settings_GetByKeys]", ParaMeterCollection);
                return ds;
            }
            catch
            {
                throw;
            }
        }

        public async Task<KeyValue> GetSettingValueByKey(string settingKey)
        {
            KeyValue value = new KeyValue();
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>();
                sqlParam.Add(new SQLParam("@SettingKey", settingKey));
                SQLHandler sagesql = new SQLHandler();
                SQLGetAsync sqlHandler = new SQLGetAsync();
                value = await sqlHandler.ExecuteAsObjectAsync<KeyValue>("[usp_webbuilder_settings_getbykey]", sqlParam);
            }
            catch
            {
                throw;
            }
            return value;
        }
        public async Task<int> SettingValueUpdate(string settingKey, string settingValue)
        {
            try
            {
                List<SQLParam> sqlParam = new List<SQLParam>();

                sqlParam.Add(new SQLParam("@SettingKey", settingKey));
                sqlParam.Add(new SQLParam("@SettingValue", settingValue));
                SQLExecuteNonQueryAsync sagesql = new SQLExecuteNonQueryAsync();
                return await sagesql.ExecuteNonQueryAsync("[usp_Webbuilder_Settings_UpdateValue]", sqlParam);
            }
            catch
            {
                throw;
            }
        }
    }
}
