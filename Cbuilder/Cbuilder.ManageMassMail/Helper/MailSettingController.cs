using SQLHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.ManageMassMail
{
    public class MailSettingController
    {
        static string SettingSessionKey = "MassMailSettingCache";
        public void AddUpdateSetting(List<KeyValue> lstSettings, string UserName)
        {
            try
            {
                string Settings = this.CreateSettingXML(lstSettings);
                MassMailSettingProvider settingProvider = new MassMailSettingProvider();
                settingProvider.AddUpdateSetting(Settings, UserName);
                // SageFrame.Core => Globals
                //Globals.sysHst[SettingSessionKey] = null;
            }
            catch
            {
                throw;
            }
        }
        private string CreateSettingXML(List<KeyValue> lstSettings)
        {
            StringBuilder sbXML = new StringBuilder();
            sbXML.Append("<settings>");
            foreach (KeyValue keyValue in lstSettings)
            {
                sbXML.Append("<setting>");
                sbXML.Append("<key>");
                sbXML.Append(keyValue.Key);
                sbXML.Append("</key>");
                sbXML.Append("<value>");
                sbXML.Append(keyValue.Value);
                sbXML.Append("</value>");
                sbXML.Append("</setting>");
            }
            sbXML.Append("</settings>");
            return sbXML.ToString();
        }

        public async Task<IList<MassMailSettingInfo>> GetAllSettings()
        {
            try
            {
                MassMailSettingProvider settingProvider = new MassMailSettingProvider();
                //IList<MassMailSettingInfo> lstInfo = null;
                //if (lstInfo == null)
                //{
                //lstInfo = await settingProvider.GetAllSettings();
                return await settingProvider.GetAllSettings();
                //}
                //return lstInfo;
            }
            catch
            {
                throw;
            }
        }
        public async static Task<string> GetSettingByKey(string SettingsKey)
        {
            MailSettingController conStng = new MailSettingController();
            IList<MassMailSettingInfo> lstSetting = await conStng.GetAllSettings();
            foreach (MassMailSettingInfo objInfo in lstSetting)
            {
                if (objInfo.SettingKey == SettingsKey)
                {
                    return objInfo.SettingValue;
                }
            }
            return null;
        }
    }
}
