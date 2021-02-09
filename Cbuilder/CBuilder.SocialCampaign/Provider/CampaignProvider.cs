
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SQLHelper;

namespace CBuilder.SocialCampaign
{
    public class CampaignProvider
    {
        internal async Task<CampaignSetting> GetCampaignSetting()
        {
            try
            {
                SQLGetAsync objHandler = new SQLGetAsync();
                string sp_name = "[dbo].[usp_Campaign_GetCampaignSetting]";
                return await objHandler.ExecuteAsObjectAsync<CampaignSetting>(sp_name);
            }
            catch (Exception ex)
            {
                return new CampaignSetting() { IsSubscribed = false };
                //ProcesssExection(ex);
            }
        }

        internal async Task InitSetting(string username)
        {
            try
            {
                string sp_name = "[dbo].[usp_Campaign_InitSetting]";
                List<SQLParam> Param = new List<SQLParam>();
                Param.Add(new SQLParam("@Username", username));

                SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
                await handler.ExecuteNonQueryAsync(sp_name, Param);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        internal async Task UpdateCampaignSetting(bool subscribe, string username)
        {
            try
            {
                string sp_name = "[dbo].[usp_Campaign_UpdateSetting]";
                List<SQLParam> Param = new List<SQLParam>();
                Param.Add(new SQLParam("@Subscribe", subscribe));
                Param.Add(new SQLParam("@Username", username));

                SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
                await handler.ExecuteNonQueryAsync(sp_name, Param);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
