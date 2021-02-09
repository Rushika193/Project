using System.Configuration;
using System.Threading.Tasks;

namespace Cbuilder.Core.API.EndPoint
{
    public static class GateWayAPI
    {
        public static string HostURL;
        public static string EnsureCaptcha
        {
            get
            {
                return HostURL + "/api/v1/Captcha/EnsureCaptcha";
            }
        }

    }
}
