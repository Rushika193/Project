using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Core.Settings
{
    public class Settings
    {        
        public string Key { get; set; }
        public string Value { get; set; }
        public string Type { get; set; }
        public bool IsCacheable { get; set; }

    }
}
