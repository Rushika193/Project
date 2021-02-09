using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.EmailTemplate
{
    public class GetDataDTO
    {
        public int offset { get; set; }
        public int limit { get; set; }
        public string category { get; set; }
        public string keywords { get; set; }
    }
}
