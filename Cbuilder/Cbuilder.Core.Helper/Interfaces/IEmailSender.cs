using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cbuilder.Core.Helper.Interfaces
{
    public interface IEmailSender
    {
        Task SendEmailAsync( string email, string subject, string message);
        void SendEmail(string email, string subject, string message);
    }
}
