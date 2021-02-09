using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.Core.Bundle
{
    public class BundleController
    {
        public async Task<AssetCollection> GetAssetCollection(string pageName, string roleName)
        {
            BundleDataProvider bundleDataProvider = new BundleDataProvider();
            return await bundleDataProvider.GetAssetCollection(pageName, roleName);
        }
        public async Task<int> SaveAssetCollection(AssetCollection assetCollection)
        {
            BundleDataProvider bundleDataProvider = new BundleDataProvider();
            return await bundleDataProvider.SaveAssetCollection(assetCollection);
        }
    }
}
