using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Core.API.EndPoint
{
    public static class ContentderAPI
    {
        public static string HostURL;
        public static string AutomatedTaskRequest
        {
            get
            {
                return HostURL + "/request";
            }
        }
    }
}
