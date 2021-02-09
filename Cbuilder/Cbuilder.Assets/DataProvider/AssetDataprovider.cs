using Cbuilder.Core.Bundle;
using SQLHelper;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace Cbuilder.Assets
{
    public class AssetDataprovider
    {
        public async Task<IList<BundleAsset>> GetAssets(BundleAsset bundleAsset)
        {
            IList<BundleAsset> bundleAssets;
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@Roles", bundleAsset.Roles));
            sQLParam.Add(new SQLParam("@ExcessMode", bundleAsset.ExcessMode.ToString()));
            sQLParam.Add(new SQLParam("@Application", bundleAsset.Application));
            sQLParam.Add(new SQLParam("@UserArea", bundleAsset.UserArea));
            sQLParam.Add(new SQLParam("@PageName", bundleAsset.PageName));
            SQLGetListAsync sqlhandler = new SQLGetListAsync();
            try
            {
                bundleAssets = await sqlhandler.ExecuteAsListAsync<BundleAsset>("[dbo].[usp_webbuilder_asset_getAll]", sQLParam);
            }
            catch
            {
                throw;
            }
            return bundleAssets;
        }
        public async Task<IList<BundleAsset>> GetPageAssets(string pageName, ExcessModes accessMode)
        {
            IList<BundleAsset> bundleAssets;
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@PageName", pageName));
            sQLParam.Add(new SQLParam("@AccessMode", accessMode.ToString()));
            SQLGetListAsync sqlhandler = new SQLGetListAsync();
            try
            {
                bundleAssets = await sqlhandler.ExecuteAsListAsync<BundleAsset>("[dbo].[usp_Assets_GetByPage]", sQLParam);
            }
            catch
            {
                throw;
            }
            return bundleAssets;
        }

        public async Task<IList<UserAreaModel>> GetUserAreas()
        {
            IList<UserAreaModel> userAreas;
            try
            {

                SQLGetListAsync objSQL = new SQLGetListAsync();
                userAreas = await objSQL.ExecuteAsListAsync<UserAreaModel>("[dbo].[usp_Asset_UserArea_Get]");

            }
            catch (Exception)
            {

                throw;
            }
            return userAreas;


        }

        public async Task<int> SaveUserArea(UserAreaModel userArea)
        {

            int result = -1;

            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@UserAreaID", userArea.UserAreaID));
            sQLParam.Add(new SQLParam("@UserArea", userArea.UserArea));

            try
            {
                SQLGetAsync objSQL = new SQLGetAsync();
                result = await objSQL.ExecuteAsScalarAsync<int>("[dbo].[usp_Asset_UserArea_Save]", sQLParam);
            }
            catch (Exception)
            {

                throw;
            }

            return result;
        }

        public async Task DeleteUserArea(int userAreaID)
        {

            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@UserAreaID", userAreaID));

            SQLExecuteNonQueryAsync objSQL = new SQLExecuteNonQueryAsync();
            await objSQL.ExecuteNonQueryAsync("[dbo].[usp_Asset_UserArea_Delete]", sQLParam);
        }

        public async Task<IList<AssetViewSettings>> GetAssetSettings(int applicationID, string assetType, string excessMode)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@ApplicationID", applicationID));
            sQLParam.Add(new SQLParam("@AssetType", assetType));
            sQLParam.Add(new SQLParam("@ExcessMode", excessMode));


            IList<AssetViewSettings> lstAssets = new List<AssetViewSettings>();

            try
            {
                SQLGetListAsync objSQL = new SQLGetListAsync();
                lstAssets = await objSQL.ExecuteAsListAsync<AssetViewSettings>("[dbo].[usp_Asset_Settings_Get]", sQLParam);
            }
            catch (Exception)
            {

                throw;
            }

            return lstAssets;
        }

        public async Task<IList<AssetViewSettings>> GetAssetSettingsByArea(int applicationID, int areaID, string assetType, string excessMode)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@ApplicationID", applicationID));
            sQLParam.Add(new SQLParam("@AreaID", areaID));
            sQLParam.Add(new SQLParam("@AssetType", assetType));
            sQLParam.Add(new SQLParam("@ExcessMode", excessMode));



            IList<AssetViewSettings> lstAssets = new List<AssetViewSettings>();

            try
            {
                SQLGetListAsync objSQL = new SQLGetListAsync();
                lstAssets = await objSQL.ExecuteAsListAsync<AssetViewSettings>("[dbo].[usp_Asset_Settings_GetByArea]", sQLParam);
            }
            catch (Exception)
            {

                throw;
            }

            return lstAssets;
        }

        public async Task<int> SaveAssetSettings(SaveAssetInfo asset)
        {
            int result = 1;

            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@BundleAssetID", asset.AssetID));
            sQLParam.Add(new SQLParam("@Name", asset.Names));
            sQLParam.Add(new SQLParam("@AssetType", asset.AssetType));
            sQLParam.Add(new SQLParam("@Position", asset.Position));
            sQLParam.Add(new SQLParam("@FilePath", asset.FilePath));
            sQLParam.Add(new SQLParam("@IsExternal", asset.IsExternal));
            sQLParam.Add(new SQLParam("@ExcessMode", asset.ExcessMode));
            sQLParam.Add(new SQLParam("@Application", asset.Application));
            sQLParam.Add(new SQLParam("@UserAreaID", asset.UserAreaID));
            sQLParam.Add(new SQLParam("@Roles", asset.Roles));



            try
            {
                SQLExecuteNonQueryAsync objSQL = new SQLExecuteNonQueryAsync();
                await objSQL.ExecuteNonQueryAsync("[dbo].[usp_Asset_Save]", sQLParam);
            }
            catch
            {

                throw;
            }

            return result;
        }

        public async Task<SaveAssetInfo> GetAssetSettingByID(int bundleAssetID)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@BundleAssetID", bundleAssetID));

            SaveAssetInfo bundleAsset = new SaveAssetInfo();

            try
            {
                SQLGetAsync objSQL = new SQLGetAsync();
                bundleAsset = await objSQL.ExecuteAsObjectAsync<SaveAssetInfo>("[dbo].[usp_Asset_Settings_GetByID]", sQLParam);

            }
            catch
            {

                throw;
            }

            return bundleAsset;
        }

        public async Task<int> DeleteAsset(int AssetID)
        {
            int result = 1;

            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@BundleAssetID", AssetID));

            try
            {

                SQLExecuteNonQueryAsync objSQL = new SQLExecuteNonQueryAsync();
                await objSQL.ExecuteNonQueryAsync("[dbo].[usp_Asset_Delete]", sQLParam);
            }
            catch
            {

                throw;
            }

            return result;
        }


        public async Task<int> SaveAssetsOrder(int UserAreaID, string strOrdersXML)
        {
            int result = 1;

            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@UserAreaID", UserAreaID));
            sQLParam.Add(new SQLParam("@OrdersXML", strOrdersXML));

            try
            {

                SQLExecuteNonQueryAsync objSQL = new SQLExecuteNonQueryAsync();
                await objSQL.ExecuteNonQueryAsync("[dbo].[usp_Asset_Orders_Save]", sQLParam);
            }
            catch
            {

                throw;
            }

            return result;
        }

        public async Task<int> CloneAssets(int sourceApplicationID, int destinationApplicationID, int areaID)
        {
            int result = 1;

            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@SourceApplicationID", sourceApplicationID));
            sQLParam.Add(new SQLParam("@DestinationApplicationID", destinationApplicationID));
            sQLParam.Add(new SQLParam("@AreaID", areaID));


            try
            {

                SQLExecuteNonQueryAsync objSQL = new SQLExecuteNonQueryAsync();
                await objSQL.ExecuteNonQueryAsync("[dbo].[usp_Asset_Clone]", sQLParam);
            }
            catch
            {

                throw;
            }

            return result;
        }




    }
}
