using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.Core.SEO
{
    public class MetaInfo
    {
        /// <summary>
        /// Keeping your titles under 55 characters, you can expect at least 95% of your titles to display properly.
        /// </summary>
        public string ContentTitle { get; set; }
        /// <summary>
        /// The description should optimally be between 150-160 characters.
        /// </summary>
        public string ShortDescription { get; set; }

        public string ImageURL { get; set; }
        /// <summary>
        /// define type such as Article,Blog, Personal,Portfolio,Report,News,Interview,Music,Cinema,Others
        /// </summary>
        public string ContentType { get; set; }

    }
}
