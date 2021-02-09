using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.Core.Settings
{
    public class SettingManager
    {
        private readonly IMemoryCache _cache;
        public SettingManager(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
        }
        public SettingManager()
        {
        }
        public async Task<string> GetAdminSettings(string keysJSON="")
        {
            SettingDataProvider settingDataProvider = new SettingDataProvider();
            return await settingDataProvider.GetAdminSettings(keysJSON);
        }
        
        public async Task<int> SaveAdminSettings(string settings, string userName)
        {
            SettingDataProvider settingDataProvider = new SettingDataProvider();
            return await settingDataProvider.SaveAdminSettings(settings,userName);
        }

        //public async Task<IList<Settings>> GetSettingByType(string type)
        //{
        //    SettingDataProvider settingDataProvider = new SettingDataProvider();
        //    return await settingDataProvider.GetSettingByType(type);
        //}

        //public async Task<IList<Settings>> GetSettingByKey(string key)
        //{
        //    SettingDataProvider settingDataProvider = new SettingDataProvider();
        //    return await settingDataProvider.GetSettingByKey(key);
        //}

        //public async Task<IList<Settings>> GetSettingByKeys(string keys)
        //{
        //    SettingDataProvider settingDataProvider = new SettingDataProvider();
        //    return await settingDataProvider.GetSettingByKeys(keys);
        //}



        public void SetSettingCache(List<Settings> settings)
        {
            
            if (settings != null && settings.Count > 0)
            {
                foreach (Settings item in settings)
                {
                    if (item.IsCacheable)
                    {
                        string key = item.Key + "_setting";
                        string cacheEntry = item.Value;
                        _cache.Set(key, cacheEntry);
                    }
                }
            }

        }


        //public string GetSettingValueFromKey(string key)
        //{
        //    key = key + "_setting";
        //    string value = string.Empty;
        //    if (_cache != null)
        //    {
        //        _cache.TryGetValue(key, out value);
        //    }
        //    return value;
        //}
    }
}
