
#region "References"
using System;
using System.Collections.Generic;
using System.Text;
#endregion

/// <summary>
/// Summary description for SEOHelper
/// </summary>
/// 
namespace Cbuilder.Core.SEO
{
    public class SEOHelper
    {        
        public SEOHelper()
        {            
        }
        private const string openTag = "<";
        private const string closeTag = "/>";
        private const string space = " ";
        private const string inverted = "\"";
        private const string equals = "=";
        private const string id = "id=";

        public static string BuildSEOTags(List<SEOAttribute> objSeoAttributeList)
        {
            StringBuilder html = new StringBuilder();
            foreach (SEOAttribute objSeoAttribute in objSeoAttributeList)
            {
                html.Append(openTag);
                html.Append(objSeoAttribute.Tag);
                html.Append(space);
                html.Append(id);
                html.Append(inverted);
                html.Append(objSeoAttribute.TagID);
                html.Append(inverted);
                html.Append(space);
                html.Append(objSeoAttribute.NameKey);
                html.Append(equals);
                html.Append(inverted);
                html.Append(objSeoAttribute.NameValue);
                html.Append(inverted);
                html.Append(space);
                html.Append(objSeoAttribute.ContentKey);
                html.Append(equals);
                html.Append(inverted);
                html.Append(objSeoAttribute.Contentvalue);
                html.Append(inverted);
                html.Append(closeTag);
                html.Append(Environment.NewLine);
            }
           return html.ToString();
        }
    }
}
