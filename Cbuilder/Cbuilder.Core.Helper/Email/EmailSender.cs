using Cbuilder.Core.Constants;
using Cbuilder.Core.Helper.DataProvider;
using Cbuilder.Core.Helper.Interfaces;
using Cbuilder.Core.Helper.Models;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.Helpers
{
    // This class is used by the application to send email for account confirmation and password reset.
    // For more details see https://go.microsoft.com/fwlink/?LinkID=532713
    public class EmailSender : IEmailSender
    {
        public async Task SendEmailAsync(string email, string emailSubject, string emailMessage)
        {
            AdminSettingsController adminSettingsController = new AdminSettingsController();
            string settings = SettingKeys.SMTPServer + ","  + SettingKeys.SMTPUserName + "," + SettingKeys.SMTPPassword + "," + SettingKeys.SMTPSSlEnabled;
            IList<Settings> list = adminSettingsController.GetSettingByKeys(settings).Result;
            if (list != null)
            {
                bool isSSL = false;
                string server = list.Where(i => i.Key == SettingKeys.SMTPServer).First().Value;
                string[] serverPort = server.Split(":");
                server = serverPort[0];
                string userName = list.Where(i => i.Key == SettingKeys.SMTPUserName).First().Value;
                string password = list.Where(i => i.Key == SettingKeys.SMTPPassword).First().Value;
                string sSlEnabled = list.Where(i => i.Key == SettingKeys.SMTPSSlEnabled).First().Value;
                if (sSlEnabled.ToLower() == "true")
                {
                    isSSL = true;
                }
                int port1 = 0;
                int.TryParse(serverPort[1], out port1);

                var message = new MailMessage(userName, email);
                message.Subject = emailSubject;
                message.Body = emailMessage;
                using (var smtpClient = new SmtpClient())
                {
                    smtpClient.Port = port1;
                    smtpClient.Host = server;
                    smtpClient.EnableSsl = isSSL;
                    smtpClient.Timeout = 10000;
                    smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtpClient.UseDefaultCredentials = false;
                    smtpClient.Credentials = new System.Net.NetworkCredential(userName, password);
                    await smtpClient.SendMailAsync(message);
                }
            }
        }

        public void SendEmail( string email, string emailSubject, string emailMessage)
        {
            AdminSettingsController adminSettingsController = new AdminSettingsController();
            string settings = SettingKeys.SMTPServer + ","+ SettingKeys.SMTPUserName + "," + SettingKeys.SMTPPassword + "," + SettingKeys.SMTPSSlEnabled;
            IList<Settings> list = adminSettingsController.GetSettingByKeys(settings).Result;
            if (list != null)
            {
                bool isSSL = false;
                string server = list.Where(i => i.Key == SettingKeys.SMTPServer).First().Value;
                string[] serverPort = server.Split(":");
                server = serverPort[0];
                string userName = list.Where(i => i.Key == SettingKeys.SMTPUserName).First().Value;
                string password = list.Where(i => i.Key == SettingKeys.SMTPPassword).First().Value;
                string sSlEnabled = list.Where(i => i.Key == SettingKeys.SMTPSSlEnabled).First().Value;
                if (sSlEnabled.ToLower() == "true")
                {
                    isSSL = true;
                }
                int port1 = 0;
                int.TryParse(serverPort[1], out port1);

                var message = new MailMessage(userName, email);
                message.To.Add(email);

                message.Subject = emailSubject;
                message.Body = emailMessage;
                using (var smtpClient = new SmtpClient())
                {
                    smtpClient.Port = port1;
                    smtpClient.Host = server;
                    smtpClient.EnableSsl = isSSL;
                    smtpClient.Timeout = 10000;
                    smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtpClient.UseDefaultCredentials = false;
                    smtpClient.Credentials = new System.Net.NetworkCredential(userName, password);
                    smtpClient.Send(message);
                }
            }
        }
    }
}
