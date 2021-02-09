using System;
using System.Collections.Generic;
using System.Text;
using Cbuilder.Core.Models;

namespace Cbuilder.Assets
{
    public class AssetLabel:BasicLocalLabel
    {
        public string AssetType { get; set; }
        public string Path { get; set; }
        public string FilePath { get; set; }
        public string LocalFilePath { get; set; }
        public string AssetPosition { get; set; }
        public string Mode { get; set; }
        public string UserArea { get; set; }
        public string Name { get; set; }
        public string Application { get; set; }
        public string Ok { get; set; }
        public string FileSelectError { get; set; }
        public string AccessMode { get; set; }
        public string Role { get; set; }

    }
}
