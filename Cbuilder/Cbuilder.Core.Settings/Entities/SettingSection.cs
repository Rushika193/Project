using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Core.Settings
{
    public class SettingSection
    {
        public string SectionName { get; set; }
        public List<SettingItem> SettingItems { get; set; }

        public string CustomButtons { get; set; }
    }
}
