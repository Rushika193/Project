using System;
using System.Collections.Generic;
using System.Text;
using Cbuilder.Core.Models;

namespace Cbuilder.Assets
{
    public class AreaLabel:BasicLocalLabel
    {
        public string UserArea { get; set; }
        public string AreaName { get; set; }
        public string FileSelectError { get; set; }
        public string Ok { get; set; }
        public string BackToAsset { get; set; }

    }
}
