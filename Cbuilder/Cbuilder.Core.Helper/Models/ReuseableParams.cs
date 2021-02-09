using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;

namespace Cbuilder.Core.Helper.Models
{
    public class ReuseableParams
    {
        public string UserName { get; set; }
        public string HostURL { get; set; }
        public string UserImage { get; set; }
        public int SiteID { get; set; }
        public string CurrentRoleIDs { get; set; }
        public string[] UrlParameters { get; set; }
        public string Culture { get; set; }
        public IHttpContextAccessor HttpContextAccessor { get; set; }
        public IMemoryCache MemoryCache { get; set; }
    }
}
