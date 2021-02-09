using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using ContentderAI.ServiceManager.Helper.InMemory;
using Microsoft.Extensions.Caching.Memory;
using SQLHelper;

namespace ContentderAI.ServiceManager.Helper.Settings
{
    public class SettingHelper
    {
        #region Fields
        private readonly IMemoryCache _memoryCache;
        #endregion

        #region Constructors
        public SettingHelper(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache ?? throw new ArgumentNullException("memoryCache cannot be null");
        }

        // No need of memoryCache when getting settings directly from database
        public SettingHelper()
        {

        }
        #endregion

        #region Methods
        /// <summary>
        /// Returns the settingList from cached memory
        /// </summary>
        /// <returns>Key value pair of settings from cached memory</returns>
        public Dictionary<string, string> ReadCachedSettingList()
        {
            CacheHelper cacheHelper = new CacheHelper(_memoryCache);
            return (Dictionary<string, string>)cacheHelper.GetObjectValue(SettingKeys.SettingList);
        }

        /// <summary>
        /// Loads all the cache settings in the memory
        /// </summary>
        public void CacheAllSettings()
        {
            DataSet dataSet = new SettingDataProvider().GetAllCachedSettings();
            CacheHelper cacheHelper = new CacheHelper(_memoryCache);
            cacheHelper.SetObjectValue(SettingKeys.SettingList, DataSetToDictionary(dataSet));
        }

        /// <summary>
        /// Returns the cached settingValue in string by key
        /// </summary>
        /// <param name="key">key name</param>
        /// <returns>setting value [string] </returns>
        public string GetCachedSettingValue(string key)
        {
            Dictionary<string, string> dictionary = ReadCachedSettingList();
            dictionary.TryGetValue(key, out string value);
            return value ?? string.Empty;
        }

        /// <summary>
        /// Returns the cached settingValue [bool] by key
        /// </summary>
        /// <param name="key">key name</param>
        /// <returns>setting value [bool] </returns>
        public bool GetCachedSettingBoolValue(string key)
        {
            bool.TryParse(GetCachedSettingValue(key), out bool value);
            return value;
        }

        /// <summary>
        /// Update the cached setting value if  key exists
        /// </summary>
        /// <param name="key">setting key</param>
        /// <param name="value">setting value</param>
        /// <returns></returns>
        public bool UpdateCachedSettingValue(string key, string value)
        {
            Dictionary<string, string> dictionary = ReadCachedSettingList();
            if (dictionary.ContainsKey(key))
            {
                dictionary[key] = value;
                return true;
            }
            return false;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="keys"></param>
        /// <returns></returns>
        public Dictionary<string, string> GetCachedSettingValuesByKeys(string keys)
        {
            Dictionary<string, string> returnValue = new Dictionary<string, string>();
            Dictionary<string, string> dictionary = ReadCachedSettingList();
            string[] keys_ = keys.Split(",");
            if (keys_.Length > 0)
            {
                foreach (string key in keys_)
                {
                    dictionary.TryGetValue(key, out string value);
                    returnValue.Add(key, value ?? string.Empty);
                }
            }
            return returnValue;
        }

        public void RefreshCache()
        {
            //To do...clear cached setting list
        }

        public async Task<string> GetSettingValueByIndividualKey(string settingKey)
        //public string GetSettingValueByIndividualKey(string settingKey)
        {
            string value = string.Empty;
            try
            {
                KeyValue objValue = await new SettingDataProvider().GetSettingValueByKey(settingKey);
                if (objValue != null && objValue.Value != null)
                {
                    value = objValue.Value;
                }
            }
            catch
            {
                throw;
            }
            return value;
        }

        public async Task<bool> GetSettingBoolValueByIndividualKey(string settingKey)
        {
            bool.TryParse(await GetSettingValueByIndividualKey(settingKey), out bool value);
            return value;
        }

        public Dictionary<string, string> GetSettingValuesByKeys(string keys)
        {
            DataSet dataSet = new SettingDataProvider().GetSettingsValueByKeys(keys);
            return DataSetToDictionary(dataSet);
        }

        private Dictionary<string, string> DataSetToDictionary(DataSet dataSet)
        {
            var dictionary = new Dictionary<string, string>();
            if (dataSet?.Tables?.Count > 0)
            {
                DataTable dt = dataSet.Tables[0];
                if (dt?.Rows.Count > 0)
                {
                    for (int i = 0, length = dt.Rows.Count; i < length; i++)
                    {
                        try
                        {
                            dictionary.Add(dt.Rows[i]["SettingKey"].ToString(), dt.Rows[i]["SettingValue"].ToString());
                        }
                        catch
                        {
                            throw;
                        }

                    }
                }
            }
            return dictionary;

        }
        public async Task<int> SettingValueUpdate(string settingKey, string settingValue)
        {
            SettingDataProvider settingDataProvider = new SettingDataProvider();
            return await settingDataProvider.SettingValueUpdate(settingKey, settingValue);
        }
        #endregion
    }
}
