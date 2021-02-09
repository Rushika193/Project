using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Core.Settings
{
    public class SettingItem
    {
        public string SettingKey { get; set; }
        public string SettingValue { get; set; }
        public string SettingLabel { get; set; }
        public bool IsCacheable { get; set; }
        public SettingInputType InputType { get; set; }
       
    }
}
