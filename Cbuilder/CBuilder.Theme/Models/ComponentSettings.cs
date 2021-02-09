using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Theme
{
    public class ComponentSettings
    {
        public ComponentSettings()
        {
            Rules = new List<CssParserRule>();
        }

      
        public string ComponentName { get; set; }

        public List<CssParserRule> Rules { get; set;}
        public bool IsPredefinedThemeSelector { get; set; }

    }

    public class MainComponentSettings:ComponentSettings
    {
        public MainComponentSettings()
        {
            SubComponents = new List<SubComponentSettings>();
        }

        public List<SubComponentSettings> SubComponents { get; set; }
    }


    public class SubComponentSettings:ComponentSettings
    {
        public string SubComponentName { get; set; }
    }
}
