using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Webbuilder
{
    public class BuilderComponent
    {

        public int ComponentID { get; set; }
        public string ComponentValue { get; set; }
        public string ComponentViewValue { get; set; }
        public string ComponentName { get; set; }
        public string ComponentCategory { get; set; }
        public string ComponentType { get; set; }
        public decimal Version { get; set; }
        public string Dependencies { get; set; }
        public bool AlreadyExists { get; set; }
        public int UserModuleID { get; set; }
        public long UniversalComponentID { get; set; }
        public string UserName { get; set; }
        public string SecureToken { get; set; }
        public int DownloadCount { get; set; }
        public int SiteID { get; set; } = 0;
        public string EasyBuilderVersion { get; set; }
        public string FilePath { get; set; }
        public string Type { get; set; }
        public string Screenshot { get; set; }
        public decimal Price { get; set; }
        public bool PackageType { get; set; }
        public string DownloadType { get; set; }
        public string Currency { get; set; }
        public int PriceType { get; set; }
    }
}
