using System.Collections.Generic;
namespace Cbuilder.ManageMassMail
{
    public class MailSendInfo
    {
        public int MassMailID { get; set; }

        public string Subject { get; set; }
        public string MessageBody { get; set; }

        public string MailFrom { get; set; }
        public string TokenKeys { get; set; }


    }
    public class SendsEmail
    {
        public MailSendInfo Mail { get; set; }

        public IList<UserInfo> Subscribers { get; set; }
    }
    public class UserInfo
    {
        public string EmailAddress { get; set; }
        public string TokenValues { get; set; }
        public string FullName { get; set; }

    }
    /// <summary>
    /// Request info by Data I/O
    /// </summary>
    public class RequestSubscriber
    {
        public string EmailAddress { get; set; }
        public int Status { get; set; }
    }

}
