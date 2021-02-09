using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Analytics.Models
{
  public  class SiteAnalyticsTotalHeader
    {
        public int TotalVisit { get; set; }
        public int TotalSession { get; set; }
        public int BounceRate { get; set; }
        public List<AnalyticsHeaderDetail> TotalVisits { get; set; }
        public List<AnalyticsHeaderDetail> TotalSessions { get; set; }
    }
}
