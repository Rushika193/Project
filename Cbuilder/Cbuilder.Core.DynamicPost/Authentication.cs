using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.Core.DynamicPost
{
    public class Authentication
    {
        public int PortalID { get; set; }
        public int UserModuleID { get; set; }
        public string UserName { get; set; }
        public string SecureToken { get; set; }
    }
}
