using System;
using Microsoft.Extensions.Caching.Memory;

namespace ContentderAI.ServiceManager.Helper.InMemory
{
    public class CacheHelper
    {
        #region Fields
        private readonly IMemoryCache _memoryCache;
        #endregion

        #region Constructors
        public CacheHelper(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache ?? throw new ArgumentNullException("memoryCache cannot be null");
        }
        #endregion

        #region Methods
        /// <summary>
        /// Returns value for any key that is stored in in memory cache
        /// </summary>
        /// <param name="key">key of the cache</param>
        /// <returns>
        ///  If 'exists': returns the value 
        ///  else :  returns string.Empty
        /// </returns>
        public string GetValueFromKey(string key)
        {
            string value = string.Empty;
            _memoryCache?.TryGetValue(key, out value);
            return value;
        }
        /// <summary>
        ///  Stores the setting keys and value in the in memory
        /// </summary>
        /// <param name="key">key for the cache</param>
        /// <param name="value">value to be cached for the key</param>
        public void SetValue(string key, string value)
        {
            _memoryCache?.Set(key, value);
        }

        /// <summary>
        /// Returns setting value for a key that is stored in in memory cache
        /// </summary>
        /// <param name="key">key of the cache</param>
        /// <returns>
        ///  If 'exists': returns the setting value 
        ///  else :  returns string.Empty
        /// </returns>
        public string GetSettingValueFromKey(string key)
        {
            key += "_setting";
            return GetValueFromKey(key);
        }

        /// <summary>
        /// Stores the setting keys and value in the in memory
        /// </summary>
        /// <param name="key">key for the setting cache</param>
        /// <param name="value">setting value to be cached for the key</param>
        public void SetSettingValue(string key, string value)
        {
            _memoryCache?.Set(key + "_setting", value);
        }



        /// <summary>
        ///  Stores the setting keys and value in the in memory
        /// </summary>
        /// <param name="key">key for the cache</param>
        /// <param name="value">value to be cached for the key</param>
        public void SetObjectValue(string key, object value)
        {
            _memoryCache?.Set(key, value);
        }

        /// <summary>
        ///  Returns the object
        /// </summary>
        /// <param name="key">key for the cache</param>
        /// <param name="value">value to be cached for the key</param>
        public object GetObjectValue(string key)
        {
            object value = null;
            _memoryCache?.TryGetValue(key, out value);
            return value;
        }
        #endregion
    }
}
