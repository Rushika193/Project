using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Core.PageAction
{
    public class ControllerActions
    {
        public string Controller { get; set; }
        public string Action { get; set; }
        public string Area { get; set; }
        public object[] Attributes { get; set; }
    }
}
