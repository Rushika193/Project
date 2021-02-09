using System.Collections.Generic;

namespace Cbuilder.MandrilMailHelper
{
    public class SubscriberMergeVar
    {
        public string name { get; set; }
        public string content { get; set; }
    }
    public class MailMergeVar
    {
        public string rcpt { get; set; }
        public List<SubscriberMergeVar> vars { get; set; }
    }
}
