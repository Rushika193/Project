using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cbuilder.Areas.Dashboard.Models.Dashboard
{
    public class Robots
    {
        public List<string> DisallowedList { get; set; }
        public string Disallowed { get; set; }
        public string UserAgent { get; set; }
        public string Allow { get; set; }
        public string FileType { get; set; }
        public string FullText { get; set; }
    }
}
