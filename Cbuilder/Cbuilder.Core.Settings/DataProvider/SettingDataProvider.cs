using SQLHelper;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.Core.Settings
{
    public class SettingDataProvider
    {  
        public async Task<string> GetAdminSettings(string keysJSON)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@keysJSON", keysJSON));

            SQLGetAsync sqlhandler = new SQLGetAsync();
            try
            {
                var obj= await sqlhandler.ExecuteAsObjectAsync<Settings>("[dbo].[usp_AdminSetting_GetSettings]", sQLParam);
                return obj.Value;
            }
            catch
            {
                throw;
            }
        }
       
        public async Task<int> SaveAdminSettings(string settings, string userName)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@Settings", settings));
            sQLParam.Add(new SQLParam("@UserName", userName));
            SQLExecuteNonQueryAsync sqlhandler = new SQLExecuteNonQueryAsync();
            try
            {
                return await sqlhandler.ExecuteNonQueryAsync("[dbo].[usp_AdminSetting_SaveSettings]", sQLParam, "@Output");
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        //public Task<IList<Settings>> GetSettingByType(string type)
        //{
        //    List<SQLParam> sQLParam = new List<SQLParam>();
        //    sQLParam.Add(new SQLParam("@type", type));
        //    SQLGetListAsync sqlhandler = new SQLGetListAsync();
        //    try
        //    {
        //        return sqlhandler.ExecuteAsListAsync<Settings>("[dbo].[usp_AdminSetting_GetSettingByType]", sQLParam);
        //    }
        //    catch
        //    {
        //        throw;
        //    }
        //}

        //public async Task<IList<Settings>> GetSettingByKey(string key)
        //{
        //    List<SQLParam> sQLParam = new List<SQLParam>();
        //    sQLParam.Add(new SQLParam("@Key", key));
        //    SQLGetListAsync sqlhandler = new SQLGetListAsync();
        //    try
        //    {
        //        return await sqlhandler.ExecuteAsListAsync<Settings>("[dbo].[usp_AdminSetting_GetSettingByKey]", sQLParam);
        //    }
        //    catch
        //    {
        //        throw;
        //    }
        //}

        //public async Task<IList<Settings>> GetSettingByKeys(string keys)
        //{
        //    List<SQLParam> sQLParam = new List<SQLParam>();
        //    sQLParam.Add(new SQLParam("@Keys", keys));
        //    SQLGetListAsync sqlhandler = new SQLGetListAsync();
        //    try
        //    {
        //        return await sqlhandler.ExecuteAsListAsync<Settings>("[dbo].[usp_AdminSetting_GetSettingByKeys]", sQLParam);
        //    }
        //    catch
        //    {
        //        throw;
        //    }
        //}
    }
}
