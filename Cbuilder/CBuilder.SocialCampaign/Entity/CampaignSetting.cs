using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBuilder.SocialCampaign
{
    public class CampaignSetting
    {
        public string APISecret { get; set; }
        public string DomainType { get; set; }
        public string DomainSecret { get; set; }
        public bool IsSubscribed { get; set; }
    }
}
