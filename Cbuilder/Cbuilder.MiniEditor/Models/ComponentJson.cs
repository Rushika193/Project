using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.MiniEditor
{
    public class ComponentJson
    {
        public string ComponentValue { get; set; }
        public string ComponentName { get; set; }
      
        public bool IsBasic { get; set; }
    }
    public class ComponentUpdateViewModel
    {
        public List<ComponentJson> Components { get; set; }
        public string ModuleName { get; set; }
    }

}
