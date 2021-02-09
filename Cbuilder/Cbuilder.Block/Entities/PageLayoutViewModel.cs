using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cbuilder.Block.Entities
{
    public class PageLayoutViewModel
    {
        public IList<LayoutElements> Elements { get; set; }
        public IList<ViewModule> AvailableModules { get; set; }

    }

    public class LayoutElements : LayoutElement
    {
        public IList<LayoutElements> InnerElements { get; set; }
        public IList<ViewModule> Modules { get; set; }
    }
    
}
