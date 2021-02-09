using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Analytics.Models
{
    public class AnalyticsUserFilter
    {
        public int Type { get; set; }
        public string UserMedium { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string DomainName { get; set; }
        public string PageName { get; set; }
    }
}
