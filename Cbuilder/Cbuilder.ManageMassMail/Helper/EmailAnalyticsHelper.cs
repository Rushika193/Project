using System.Data;
using System.Threading.Tasks;

namespace Cbuilder.ManageMassMail
{
    public class EmailAnalyticsHelper
    {
        public async Task<DataSet> GetAnalyticsData(string StartDate, string EndDate)
        {
            EmailAnalyticsProvider objProvider = new EmailAnalyticsProvider();
            DataSet ds = await objProvider.GetAnalyticsData(StartDate, EndDate);
            ds.Tables[0].TableName = "Interest";
            ds.Tables[1].TableName = "ImportedUsers";
            ds.Tables[2].TableName = "SubscribedUsers";
            ds.Tables[3].TableName = "UnsubscribedUsers";
            ds.Tables[4].TableName = "DeliveredMail";
            ds.Tables[5].TableName = "ScheduledMail";
            return ds;
        }
    }
}
