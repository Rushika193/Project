using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Theme
{
    public class CSSRuleInfo
    {
        public string SelectorName { get; set; }
        public List<CSSPropVal> CSSProperties { get; set; }

    }


    public class CSSPropVal
    {
        public string CSSProperty { get; set; }
        public string CSSValue { get; set; }
    }
}
