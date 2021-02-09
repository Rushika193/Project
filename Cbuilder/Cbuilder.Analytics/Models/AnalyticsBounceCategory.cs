using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Analytics.Models
{
    public class AnalyticsBounceCategory
    {
        public string CategoryName { get; set; }
        public int TotalVisit { get; set; }
        public int BounceRate { get; set; }
    }
}
