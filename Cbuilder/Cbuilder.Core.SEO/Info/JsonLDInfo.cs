using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;
using System.Web;

namespace Cbuilder.Core.SEO.JsonLD
{
    [DataContract]
    public class JsonLDBaseInfo
    {
        [DataMember(Name = "@context")]
        public string Context { get { return "https://schema.org/"; } }
        [DataMember(Name = "@type")]
        public string Type { get; set; }
        [DataMember(Name = "description")]
        public string Description { get; set; }
        [DataMember(Name = "name")]
        public string Title { get; set; }
        [DataMember(Name = "image")]
        public string[] Image { get; set; }
        //[DataMember(Name = "url")]
        //public string URL
        //{
        //    get
        //    {
        //        return HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority);
        //    }
        //}
        [DataMember(Name = "logo")]
        public string Logo { get; set; }
        [DataMember(Name = "author")]
        public ContentWithType Author { get; set; }
    }

    public class JsonLDArticle : JsonLDBaseInfo
    {
        /// <summary>
        /// Post Title 
        /// </summary>
        [DataMember(Name = "headline")]
        public string Headline { get; set; }
        [DataMember(Name = "dateCreated")]
        public DateTime AddedOn { get; set; }
        [DataMember(Name = "dateModified")]
        public DateTime UpdatedOn { get; set; }
        [DataMember(Name = "datePublished")]
        public string PublishedOn { get; set; }
        /// <summary>
        /// The number of words in the text of the Article.
        /// </summary>
        [DataMember(Name = "wordcount")]
        public int WordCount { get; set; }
        /// <summary>
        ///Keywords or tags used to describe Post.
        /// </summary>
        [DataMember(Name = "keywords")]
        public string KeyWords { get; set; }
        [DataMember(Name = "articleBody")]
        public string ArticleBody { get; set; }
        [DataMember(Name = "publisher")]
        public ContentWithType Publisher { get; set; }
        [DataMember(Name = "mainEntityOfPage")]
        public string HomePage { get; set; }
    }
    [DataContract]
    public class ContentWithType
    {
        [DataMember(Name = "@type")]
        public string Type { get; set; }
        [DataMember(Name = "name")]
        public string Name { get; set; }
        [DataMember(Name = "logo")]
        public LDLogo Logo { get; set; }

    }
    [DataContract]
    public class LDLogo
    {
        [DataMember(Name = "@type")]
        public string Type { get; set; }
        [DataMember(Name = "url")]
        public string URL { get; set; }
    }
    public class JsonLDProduct : JsonLDBaseInfo
    {
        [DataMember(Name = "brand")]
        public string Brand { get; set; }
        [DataMember(Name = "category")]
        public string Category { get; set; }
        [DataMember(Name = "color")]
        public string Color { get; set; }
        [DataMember(Name = "mpn")]
        public string SKU { get; set; }
        [DataMember(Name = "offers")]
        public ProductOffers Offers { get; set; }


    }
    [DataContract]
    public class ProductOffers
    {
        [DataMember(Name = "@type")]
        public string Type = "Offer";

        [DataMember(Name = "priceCurrency")]
        public string Currency { get; set; }
        [DataMember(Name = "price")]
        public string Price { get; set; }
        /// <summary> 
        /// http://schema.org/InStock 
        /// </summary> 
        [DataMember(Name = "availability")]
        public string Availability { get; set; }
        [DataMember(Name = "seller")]
        public ProductSeller Seller { get; set; }
    }
    [DataContract]
    public class ProductSeller
    {
        [DataMember(Name = "@type")]
        public string Type = "Organization";
        [DataMember(Name = "name")]
        public string Name { get; set; }
        public ProductSeller(string name)
        {
            this.Name = name;
        }
    }

}
