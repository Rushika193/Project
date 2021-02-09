using System.Collections.Generic;

namespace Cbuilder.MailSenderHelper
{
    public class SendMailMessage
    {
        public string MailBody { get; set; }
        public string Subject { get; set; }
        public string FromEmail { get; set; }
        public string BccAddress { get; set; }
        public string CcAddress { get; set; }
        public string ReplyTo { get; set; }
        public string FromName { get; set; }
        public List<Recipient> To { get; set; }
    }
    public class Recipient
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public List<MailToken> Tokens { get; set; }

    }
    public class MailToken
    {
        public string Key { get; set; }
        public string Value { get; set; }
    }
}
