using System.Collections.Generic;

namespace Cbuilder.MandrilMailHelper
{
    public class FinalEmail
    {
        public string key { get; set; }
        public EmailMessage message { get; set; }
        public bool async { get; set; }
        public string send_at { get; set; }
    }
    public class EmailMessage
    {
        public string html { get; set; }
        public string text { get; set; }
        public string subject { get; set; }
        public string from_email { get; set; }
        public string from_name { get; set; }
        public List<EmailAddress> to { get; set; }

        public bool important { get; set; }
        public string track_opens { get; set; }
        public string track_clicks { get; set; }
        public string auto_text { get; set; }
        public string auto_html { get; set; }

        public string inline_css { get; set; }
        public string url_strip_qs { get; set; }
        public string preserve_recipients { get; set; }
        public string view_content_link { get; set; }
        public string bcc_address { get; set; }
        public string tracking_domain { get; set; }
        public string signing_domain { get; set; }
        public string return_path_domain { get; set; }

        public List<EmailFileInfo> attachments { get; set; }
        public List<EmailFileInfo> images { get; set; }
        public KeyValuePair<object, object> metadata { get; set; }
        public string[] tags { get; set; }
        public List<MailMergeVar> merge_vars { get; set; }
    }

    public class EmailAddress
    {
        /// <summary>
        ///   Initializes a new instance of the <see cref="EmailAddress" /> class.
        /// </summary>
        public EmailAddress()
        {
        }

        /// <summary>
        ///   Initializes a new instance of the <see cref="EmailAddress" /> class.
        /// </summary>
        /// <param name="email">
        ///   The email.
        /// </param>
        public EmailAddress(string email)
        {
            this.email = email;
            this.name = string.Empty;
        }

        /// <summary>
        ///   Initializes a new instance of the <see cref="EmailAddress" /> class.
        /// </summary>
        /// <param name="email">
        ///   The email.
        /// </param>
        /// <param name="name">
        ///   The name.
        /// </param>
        public EmailAddress(string email, string name)
        {
            this.email = email;
            this.name = name;
        }

        /// <summary>
        ///   Initializes a new instance of the <see cref="EmailAddress" /> class.
        /// </summary>
        /// <param name="email">
        ///   The email.
        /// </param>
        /// <param name="name">
        ///   The name.
        /// </param>
        /// <param name="type">
        ///   The type.
        /// </param>
        public EmailAddress(string email, string name, string type)
        {
            this.email = email;
            this.name = name;
            this.type = type;
        }

        public string email { get; set; }
        public string name { get; set; }
        public string type { get; set; }
    }
    public class EmailFileInfo
    {
        public string type { get; set; }
        public string name { get; set; }
        public string content { get; set; }

    }
    public class MetaData
    {
        public MetaData(string website)
        {
            this.website = website;
        }
        public string website { get; set; }
    }

}
