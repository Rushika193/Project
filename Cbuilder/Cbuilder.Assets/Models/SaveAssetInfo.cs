using System;
using System.Collections.Generic;
using System.Text;
using Cbuilder.Core.Bundle;

namespace Cbuilder.Assets
{
    public class SaveAssetInfo
    {
        public int AssetID { get; set; }
        public string Names { get; set; }
        public string AssetType { get; set; }
        public string Position { get; set; }
        public int Orders { get; set; }
        public string FilePath { get; set; }
        public bool IsExternal { get; set; }
        public string ExcessMode { get; set; }
        public string Roles { get; set; }
        public string Application { get; set; }
        public string UserArea { get; set; }
        public int UserAreaID { get; set; }
        

    }
}
