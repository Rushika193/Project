using System;

namespace Cbuilder.EmailTemplate
{
    public class TokenKeyValue
    {
        public string Key { get; set; }
        public string Value { get; set; }
    }
    public class EmailToken : TokenKeyValue
    {
        public int TokenID { get; set; }
        public string Token { get; set; }
        public string SampleValue { get; set; }

        public string Type { get; set; }
        public int SiteID { get; set; }
        public bool IsSystem { get; set; }
        public bool IsActive { get; set; }

        public string AddedBy { get; set; }

    }


}
