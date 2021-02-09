using System.Collections.Generic;

namespace Cbuilder.ManageMassMail
{
    public class EmailAnalyticsInfo
    {
        public int TotalSubscribers { get; set; }
        public int TotalImportedSubscribers { get; set; }
        public int TotalUnsubscribedUsers { get; set; }
        public int TotalDeliveredMails { get; set; }
        public int TotalScheduledMails { get; set; }
        // public string TopUserInterests { get; set; }
        public List<MonthlyAnalytics> MonthlyEmails { get; set; }
        public List<MonthlyAnalytics> MonthlySubscriber { get; set; }
        public List<MonthlyAnalytics> MonthlyUnSubscriber { get; set; }
        public List<Interests> TopUserInterests { get; set; }
    }
    public class Interests
    {
        public int InterestCount { get; set; }
        public string Interest { get; set; }
    }
}
