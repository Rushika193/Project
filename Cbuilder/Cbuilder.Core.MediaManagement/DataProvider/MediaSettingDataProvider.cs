using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using SQLHelper;

namespace Cbuilder.Core.MediaManagement
{
    public class MediaSettingDataProvider
    {
        public async Task<MediaSettingInfo> GetByID(long MediaSettingID)
        {
            try
            {
               
                List<SQLParam> param = new List<SQLParam>();
                param.Add(new SQLParam("@MediaSettingID", MediaSettingID));
                SQLGetAsync sqlHandler = new SQLGetAsync();
                return await sqlHandler.ExecuteAsObjectAsync<MediaSettingInfo>("[dbo].[usp_MediaSetting_GetByID]", param);

              


            }
            catch
            {
                throw;
            }
        }

        //public List<MediaSettingInfo> GetallData(MediaSettingInfo objMediaSetting)
        //{
        //    try
        //    {
        //        List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
        //        param.Add(new KeyValuePair<string, object>("@PortalID", objMediaSetting.PortalID));
        //        param.Add(new KeyValuePair<string, object>("@UserModuleID", objMediaSetting.UserModuleID));
        //        param.Add(new KeyValuePair<string, object>("@Culture", objMediaSetting.Culture));
        //        SQLHandler sagesql = new SQLHandler();
        //        return sagesql.ExecuteAsList<MediaSettingInfo>("[dbo].[usp_MediaSetting_GetallData]", param);
        //    }
        //    catch
        //    {
        //        throw;
        //    }
        //}

        //public void DeleteByID(long MediaSettingID)
        //{
        //    try
        //    {
        //        List<KeyValuePair<string, object>> param = new List<KeyValuePair<string, object>>();
        //        param.Add(new KeyValuePair<string, object>("@MediaSettingID", MediaSettingID));
        //        SQLHandler sagesql = new SQLHandler();
        //        sagesql.ExecuteNonQuery("[dbo].[usp_MediaSetting_DeleteByID]", param);
        //    }
        //    catch
        //    {
        //        throw;
        //    }
        //}

        public async Task<int> AddUpdate(MediaSettingInfo objMediaSetting)
        {
            int mediaSettingID = 0;

            List<SQLParam> param = new List<SQLParam>();
            param.Add(new SQLParam("@MediaSettingID", objMediaSetting.MediaSettingID));
            param.Add(new SQLParam("@SettingKeyValue", objMediaSetting.SettingKeyValue));
            
            try
            {

                SQLExecuteNonQueryAsync sqlHandler = new SQLExecuteNonQueryAsync();
                mediaSettingID = await sqlHandler.ExecuteNonQueryAsync("[dbo].[usp_MediaSetting_InsertUpdate]", param, "@NewMediaSettingID");

            }
            catch
            {

                throw;
            }

            return mediaSettingID;

        }
    }
}
