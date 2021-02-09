using System.Runtime.Serialization;

namespace Cbuilder.ManageMassMail
{
    public enum DeliverStatus
    {
        /// <summary>
        ///   The invalid.
        /// </summary>
        [EnumMember(Value = "Fail")]
        Fail,
        /// <summary>
        ///   The sent.
        /// </summary>
        [EnumMember(Value = "Sent")]
        Sent,

        /// <summary>
        ///   The queued.
        /// </summary>
        [EnumMember(Value = "Queued")]
        Queued,

        /// <summary>
        ///   The rejected.
        /// </summary>
        [EnumMember(Value = "Rejected")]
        Rejected,


        /// <summary>
        ///   The scheduled.
        /// </summary>
        [EnumMember(Value = "Scheduled")]
        Scheduled
    }
    public class MassMailReportInfo
    {


        public int MailID { get; set; }
        public int SuccessMail { get; set; }
        public int FailureMail { get; set; }
        public int TotalAudience
        {
            get
            {
                return (this.SuccessMail + this.FailureMail);
            }
        }
    }
    public class MassMailDeliverInfo
    {
        public int RowNum { get; set; }
        public int TotalRow { get; set; }
        public string EmailAddress { get; set; }


        public DeliverStatus DeliverStatus { get; set; }
        public string Status
        {
            get
            {
                return DeliverStatus.ToString();
            }
        }

    }
}
