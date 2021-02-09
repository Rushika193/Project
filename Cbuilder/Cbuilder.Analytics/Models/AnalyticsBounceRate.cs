using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Analytics.Models
{
    public class AnalyticsBounceRate
    {
        public string PageName { get; set; }
       public List<AnalyticsBounceCategory> analyticsBounceCategories { get; set; }

        public int TotalBounce { get; set; }
        public int BounceRate { get; set; }
    }
}
