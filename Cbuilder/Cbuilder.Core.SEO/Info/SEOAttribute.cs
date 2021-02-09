namespace Cbuilder.Core.SEO
{
    public class SEOAttribute
    {
       
        public SEOAttribute()
        {

        }
        public string Tag { get; set; } = "meta";
        public string NameKey { get; set; } = "name";
        public string NameValue { get; set; }
        public string ContentKey { get; set; } = "content";
        public string Contentvalue { get; set; }
        public string TagID { get; set; }

        public SEOAttribute(string tag, string namekey, string nameValue, string contentKey, string contentValue)
        {
            this.Tag = tag;
            this.NameKey = namekey;
            this.NameValue = nameValue;
            this.ContentKey = contentKey;
            this.Contentvalue = contentValue;
            string metaID = nameValue.ToUpper();
            if (metaID.IndexOf("-") > 0)
            {
                metaID = metaID.Replace("-", string.Empty);
            }
            if (metaID.IndexOf(":") > 0)
            {
                metaID = metaID.Replace(":", string.Empty);
            }
            this.TagID = metaID;
        }
    }
}
