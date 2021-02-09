using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.EmailTemplate
{
    public static class MailToken
    {
        public static string UserName = "#{Username}#";
        public static string Email = "#{UserEmail}#";
        public static string FirstName = "#{UserFirstName}#";
        public static string LastName = "#{UserLastName}#";
        public static string CurrnetHostURL = "#{HostURL}#";
        public static string SiteLogo = "#{SiteLogo}#";
        public static string UserActivationCode = "#{UserActivationCode}#";
        public static string UnsubscribeLink = "#{UnsubscribeLink}#";
    }
}
