using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Analytics.Models
{
    public class AnalyticsUser
    {
        public int NewUserCount { get; set; }
        public int CurrentUserCount { get; set; }

        public string AddedOn { get; set; }
        public string Browser { get; set; }
        public string Country { get; set; }
    }
}
