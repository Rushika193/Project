using SQLHelper;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using Cbuilder.Core.Helper.Interfaces;
using Cbuilder.Core.Helper.Models;
using Cbuilder.Core.InMemory;

namespace Cbuilder.Core.Helper.DataProvider
{
    public class AdminSettingsController : IAdminSettings
    {
        private readonly ICbuilderCache _cache;
        public AdminSettingsController(ICbuilderCache memoryCache)
        {
            _cache = memoryCache;
        }
        public AdminSettingsController()
        {
        }
        public async Task<string> GetAdminSettings()
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            SQLGetAsync sqlhandler = new SQLGetAsync();
            try
            {
                return await sqlhandler.ExecuteAsScalarAsync<string>("[usp_AdminSetting_GetSettings]", sQLParam);
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
                return await sqlhandler.ExecuteNonQueryAsync("[usp_AdminSetting_SaveSettings]", sQLParam, "@Output");
            }
            catch
            {
                throw;
            }
        }

        public Task<IList<Settings>> GetSettingByType(string type)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@type", type));
            SQLGetListAsync sqlhandler = new SQLGetListAsync();
            try
            {
                return sqlhandler.ExecuteAsListAsync<Settings>("[usp_AdminSetting_GetSettingByType]", sQLParam);
            }
            catch
            {
                throw;
            }
        }

        public async Task<IList<Settings>> GetSettingByKey(string key)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@Key", key));
            SQLGetListAsync sqlhandler = new SQLGetListAsync();
            try
            {
                return await sqlhandler.ExecuteAsListAsync<Settings>("[usp_AdminSetting_GetSettingByKey]", sQLParam);
            }
            catch
            {
                throw;
            }
        }

        public async Task<IList<Settings>> GetSettingByKeys(string keys)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@Keys", keys));
            SQLGetListAsync sqlhandler = new SQLGetListAsync();
            try
            {
                return await sqlhandler.ExecuteAsListAsync<Settings>("[usp_AdminSetting_GetSettingByKeys]", sQLParam);
            }
            catch
            {
                throw;
            }
        }
        public void SetSettingCache()
        {
            Task<IList<Settings>> result = GetSettingByType("Cacheable");
            if (result != null && result.Result.Count > 0)
            {
                foreach (Settings item in result.Result)
                {
                    CacheHelper cacheHelper = new CacheHelper(_cache);
                    cacheHelper.SetSettingValue(item.Key, item.Value);
                }
            }
        }

        public string GetSettingValueFromKey(string key)
        {
            CacheHelper cacheHelper = new CacheHelper(_cache);
            return cacheHelper.GetSettingValueFromKey(key);
        }
    }
}
