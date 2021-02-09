using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace ContentderAI.ServiceManager.Helper.ElasticSearch.Models
{
    public class ElasticInputModel
    {
        public Guid RequestId { get; set; } = Guid.NewGuid();
        public string DomainName { get; set; }
        public int SessionId { get; set; }
        public DateTime AddedOn { get; set; } = DateTime.Now;
        public int Status { get; set; }
        public IEnumerable<ElasticDataModel> Data { get; set; }
    }
}
