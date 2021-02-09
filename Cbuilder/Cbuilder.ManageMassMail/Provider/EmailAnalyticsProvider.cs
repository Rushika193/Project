using SQLHelper;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace Cbuilder.ManageMassMail
{
    public class EmailAnalyticsProvider
    {
        public async Task<DataSet> GetAnalyticsData(string StartDate, string EndDate)
        {
            try
            {
                //EmailAnalyticsInfo anlInfo = new EmailAnalyticsInfo();
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@StartDate", StartDate),
                    new SQLParam("@EndDate", EndDate)
                };
                SQLGetListAsync handler = new SQLGetListAsync();
                return await handler.ExecuteAsDataSetAsync("[dbo].[usp_WB_Mail_GetAllAnalytics]", param);
            }
            catch
            {
                return null;
            }
        }
    }
}
