using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Documentation.Models
{
    public class HomeInfo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string CaptchaAnswer { get; set; }
        public string CaptchaResponse { get; set; }
        public string cbuildercaptcharesponse { get; set; }
        public string CaptchaServer { get; set; }
    }
}
