using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBuilder.SocialCampaign
{
    public class CampaignInfo
    {
        public Guid CampaignID { get; set; }
        public int CampaignType { get; set; }
        public string CampaignTitle { get; set; }
    }

    public class CampaignPostInfo
    {
        public string CampaignID { get; set; }
        public string PostContent { get; set; }
        public List<string> ImageUrls { get; set; }
        public string AppIDs { get; set; }
    }

    public class CampaignPostDTO
    {
        public string CampaignID { get; set; }
        public string CampaignPostID { get; set; }
        public int AppID { get; set; }
        public string PostContent { get; set; }
        public string TargetID { get; set; }
        public List<CampaignPostImages> Images { get; set; }
    }

    public class CampaignPostImages
    {
        public string ImageID { get; set; }
        public string ImageUrl { get; set; }
    }

}
