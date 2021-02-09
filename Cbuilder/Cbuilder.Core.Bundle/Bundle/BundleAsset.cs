using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Core.Bundle
{
    public class BundleAsset
    {
        public int BundleID { get; set; }
        public string Names { get; set; }
        public string AssetType { get; set; }
        public string Position { get; set; }
        public int Orders { get; set; }
        public string FilePath { get; set; }
        public bool IsExternal { get; set; }
        public ExcessModes ExcessMode { get; set; }
        public string Roles { get; set; }
        public string Application { get; set; }
        public string UserArea { get; set; }
        public string PageName { get; set; }
    }
}
