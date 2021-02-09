using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContentderAI.ServiceManager.Helper.ElasticSearch.Models
{
    public class ElasticDataModel
    {
        public List<string> Images { get; set; }
        public List<string> Texts { get; set; }
        public List<string> Icons { get; set; }
        public List<string> Videos { get; set; }
    }
}
