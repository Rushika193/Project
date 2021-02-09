using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.MailSenderHelper
{
    public class MailController
    {
        public void SendMail(SendMailMessage message)
        {
            //smtpMessage.ReplyTo =new  MailAddress(message.ReplyTo);
            foreach (Recipient rcpt in message.To)
            {
                try
                {
                    string body = message.MailBody;
                    MailMessage smtpMessage = new MailMessage();
                    smtpMessage.From = new MailAddress(message.FromEmail, message.FromName);
                    smtpMessage.Subject = message.Subject;
                    smtpMessage.IsBodyHtml = true;
                    smtpMessage.To.Add(new MailAddress(rcpt.Email, rcpt.Name));

                    foreach (MailToken token in rcpt.Tokens)
                    {
                        body = body.Replace(token.Key, token.Value);
                    }
                    smtpMessage.Body = body;
                    Task.Run(async () => await SendMessage(smtpMessage));
                }
                catch (Exception)
                {
                    break;
                    throw;
                }
            }
        }
        private async Task SendMessage(MailMessage message)
        {
            //SageFrameConfig sfConfig = new SageFrameConfig();
            //string ServerPort = sfConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.SMTPServer);
            //string SMTPAuthentication = sfConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.SMTPAuthentication);
            //string SMTPEnableSSL = sfConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.SMTPEnableSSL);
            //string SMTPPassword = sfConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.SMTPPassword);
            //string SMTPUsername = sfConfig.GetSettingValueByIndividualKey(SageFrameSettingKeys.SMTPUsername);
            //string[] SMTPServer = ServerPort.Split(':');
            //try
            //{
            //    SmtpClient smtp = new SmtpClient();
            //    if (SMTPAuthentication == "1")
            //    {
            //        if (SMTPUsername.Length > 0 && SMTPPassword.Length > 0)
            //        {
            //            smtp.Credentials = new System.Net.NetworkCredential(SMTPUsername, SMTPPassword);
            //        }
            //    }
            //    smtp.EnableSsl = bool.Parse(SMTPEnableSSL.ToString());
            //    if (SMTPServer.Length > 0)
            //    {
            //        if (SMTPServer[0].Length != 0)
            //        {
            //            smtp.Host = SMTPServer[0];
            //            if (SMTPServer.Length == 2)
            //            {
            //                smtp.Port = int.Parse(SMTPServer[1]);
            //            }
            //            else
            //            {
            //                smtp.Port = 25;
            //            }

            //            smtp.SendCompleted += new SendCompletedEventHandler(Smtp_SendCompleted); ;
            //            await smtp.SendMailAsync(message);
            //        }
            //        else
            //        {
            //            throw new Exception("SMTP Host must be provided");
            //        }
            //    }
            //}
            //catch (Exception ex)
            //{
            //    throw ex;
            //}
        }
        private void Smtp_SendCompleted(object sender, System.ComponentModel.AsyncCompletedEventArgs e)
        {

        }
        private void LogStatus()
        {

        }
    }
}
