using System;

namespace Cbuilder.MandrilMailHelper
{
    public class EMailInfo
    {
        public string EmailFrom { get; set; }
        public string EmailTo { get; set; }
        public string ToName { get; set; }
        public string FromName { get; set; }
        public string MailBody { get; set; }
        public string Subject { get; set; }
        public bool IsInstant { get; set; }
        public DateTime ScheduleOn { get; set; }
    }
}
