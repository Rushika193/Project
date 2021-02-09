using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Core.InMemory
{
    public class CbuilderCache : ICbuilderCache
    {
        private IMemoryCache memoryCache;

        public ICacheEntry CreateEntry(object key)
        {
            return memoryCache.CreateEntry(key);
        }

        public void Dispose()
        {
            memoryCache.Dispose();
        }

        public void Remove(object key)
        {
            memoryCache.Remove(key);
        }

        public bool TryGetValue(object key, out object value)
        {
            return memoryCache.TryGetValue(key, out value);
        }
    }
}
