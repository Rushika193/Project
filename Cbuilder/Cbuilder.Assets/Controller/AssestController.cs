using Cbuilder.Core.Bundle;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.Assets
{
    public class AssestController
    {
        public async Task<IList<BundleAsset>> GetAssets(BundleAsset bundleAsset)
        {
            AssetDataprovider assetDataprovider = new AssetDataprovider();
            return await assetDataprovider.GetAssets(bundleAsset);
        }
        public async Task<IList<BundleAsset>> GetPageAssets(string pageName,ExcessModes accessMode)
        {
            AssetDataprovider assetDataprovider = new AssetDataprovider();
            return await assetDataprovider.GetPageAssets(pageName,accessMode);
        }
        public async Task<IList<UserAreaModel>> GetUserAreas()
        {
            AssetDataprovider dataprovider = new AssetDataprovider();
            return await dataprovider.GetUserAreas();
        }

        public async Task<int> SaveUserArea(UserAreaModel userArea)
        {
            AssetDataprovider dataprovider = new AssetDataprovider();
            return await dataprovider.SaveUserArea(userArea);
        }

        public async Task DeleteUserArea(int userAreaID)
        {
            AssetDataprovider assetDataprovider = new AssetDataprovider();
            await assetDataprovider.DeleteUserArea(userAreaID);
        }

        public async Task<List<AssetSettingsViewModel>> GetAssetSettings(int applicationId, string assetType, string excessMode)
        {
            AssetDataprovider assetDataprovider = new AssetDataprovider();
            IList<UserAreaModel> userAreas = await assetDataprovider.GetUserAreas();
            List<AssetViewSettings> assetViewSettings = await assetDataprovider.GetAssetSettings(applicationId, assetType, excessMode) as List<AssetViewSettings>;

            List<AssetSettingsViewModel> lstAssetSettings = new List<AssetSettingsViewModel>();


            foreach (UserAreaModel area in userAreas)
            {
                AssetSettingsViewModel assetSettings = new AssetSettingsViewModel();
                assetSettings.UserAreaID = area.UserAreaID;
                assetSettings.UserArea = area.UserArea;
                assetSettings.Assets = assetViewSettings.FindAll(x => x.UserAreaID == area.UserAreaID);

                lstAssetSettings.Add(assetSettings);
            }


            return lstAssetSettings;



        }

        public async Task<IList<AssetViewSettings>> GetAssetSettingsByArea(int applicationID, int areaID, string assetType, string excessMode)
        {
            AssetDataprovider assetDataprovider = new AssetDataprovider();
            return await assetDataprovider.GetAssetSettingsByArea(applicationID, areaID, assetType, excessMode);
        }

        public async Task<int> SaveAssetSettings(SaveAssetInfo asset)
        {
            AssetDataprovider assetDataprovider = new AssetDataprovider();
            return await assetDataprovider.SaveAssetSettings(asset);
        }

        public async Task<SaveAssetInfo> GetAssetSettingByID(int bundleAssetID)
        {
            AssetDataprovider assetDataprovider = new AssetDataprovider();
            return await assetDataprovider.GetAssetSettingByID(bundleAssetID);
        }

        public async Task<int> DeleteAsset(int AssetID)
        {
            AssetDataprovider assetDataprovider = new AssetDataprovider();
            return await assetDataprovider.DeleteAsset(AssetID);
        }
        public async Task<int> SaveAssetsOrder(List<AssetsOrder> lstAssets, int UserAreaID)
        {
            StringBuilder strOrder = new StringBuilder();
            strOrder.Append("<OrderSettings>");

            for (int i = 0; i < lstAssets.Count; i++)
                strOrder.AppendFormat(@"<Asset>
                                            <AssetID>{0}</AssetID>
                                            <Order>{1}</Order>
                                       </Asset>", lstAssets[i].AssetID, lstAssets[i].Order);

            strOrder.Append("</OrderSettings>");


            AssetDataprovider assetDataprovider = new AssetDataprovider();
            return await assetDataprovider.SaveAssetsOrder(UserAreaID, strOrder.ToString());

        }

        public async Task<int> CloneAssets(int sourceApplicationID, int destinationApplicationID, int areaID)
        {
            AssetDataprovider assetDataprovider = new AssetDataprovider();
            return await assetDataprovider.CloneAssets(sourceApplicationID, destinationApplicationID, areaID);
        }

        

        public List<string> GetLocalAssetFiles(string rootPath)
        {
            List<string> lstFiles = new List<string>();

            string[] extensions = new string[] { "css", "js" };

            string extensionName;


            foreach (string d in Directory.GetDirectories(rootPath))
            {

                foreach (string f in Directory.GetFiles(d))
                {
                    extensionName = GetFileExtension(f);

                    if (Array.IndexOf(extensions, extensionName) >= 0)
                        lstFiles.Add(FormatFileName(f));
                }

                lstFiles.AddRange(GetLocalAssetFiles(d));
            }


            return lstFiles;


        }


        public string FormatFileName(string fileName)
        {
            string formattedName = fileName.Split("wwwroot")[1];
            return formattedName;
        }

        public string GetFileExtension(string fileName)
        {
            return Path.GetExtension(fileName).Replace(".", "").ToLowerInvariant();
        }
    }
}
