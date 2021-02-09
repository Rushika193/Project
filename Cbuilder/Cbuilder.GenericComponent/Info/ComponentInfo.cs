using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;

namespace Cbuilder.GenericComponent
{
   public class ComponentInfo
    {
        public int ComponentId { get; set; }
        public string JSONData { get; set; }
        public string ComponentName { get; set; }
        public string Label { get; set; }
    }

   public class ComponentDetails : ComponentInfo
   {
       public int SiteId { get; set; }
       public string Culture { get; set; }
       public string UpdateKeyJson { get; set; }
   }
}
