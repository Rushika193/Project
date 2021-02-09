using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Core.Bundle
{
    public class AssetResult
    {
        public List<string> CSS { get; set; }
        public List<string> JSHeader { get; set; }
        public List<string> JSFooter { get; set; }

        public string JsHeaderCDN { get; set; }
        public string JsFooterTopCDN { get; set; }
        public string JsFooterBottomCDN { get; set; }
        public string CssCDN { get; set; }
    }
}
