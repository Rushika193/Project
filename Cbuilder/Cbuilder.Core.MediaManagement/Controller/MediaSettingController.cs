using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;

namespace Cbuilder.Core.MediaManagement
{
    public class MediaSettingController
    {
        public Task<MediaSettingInfo> GetByID(long MediaSettingID)
        {
            MediaSettingDataProvider objDataProvider = new MediaSettingDataProvider();
            return objDataProvider.GetByID(MediaSettingID);
        }

        public async Task<int> AddUpdate(MediaSettingInfo obj)
        {
            MediaSettingDataProvider objDataProvider = new MediaSettingDataProvider();
            return await objDataProvider.AddUpdate(obj);
        }
        //public List<MediaSettingInfo> GetallData(MediaSettingInfo objMediaSetting)
        //{
        //    MediaSettingDataProvider objDataProvider = new MediaSettingDataProvider();
        //    return objDataProvider.GetallData(objMediaSetting);
        //}


        //public void DeleteByID(long MediaSettingID)
        //{
        //    MediaSettingDataProvider objDataProvider = new MediaSettingDataProvider();
        //    objDataProvider.DeleteByID(MediaSettingID);
        //}

        public async Task<MediaSettingKeys> GetMediaSettingKeyValue()
        {
            MediaSettingKeys objSettingKey = new MediaSettingKeys();
            try
            {
                MediaSettingDataProvider objDataProvider = new MediaSettingDataProvider();
                MediaSettingInfo settingKeyInfo = await objDataProvider.GetByID(1);
                if (settingKeyInfo != null && settingKeyInfo.SettingKeyValue.Length > 0)
                {
                    MediaSettingKeyValue objMediaKeys = new MediaSettingKeyValue();
                    objMediaKeys = JsonSerializer.Deserialize<MediaSettingKeyValue>(settingKeyInfo.SettingKeyValue);
                    //objMediaKeys = new JavaScriptSerializer().Deserialize<MediaSettingKeyValue>(settingKeyInfo.SettingKeyValue);
                    objSettingKey = objMediaKeys.MediaSetting;
                }
            }
            catch
            {
                throw;
            }
            return objSettingKey;
        }
    }
}
