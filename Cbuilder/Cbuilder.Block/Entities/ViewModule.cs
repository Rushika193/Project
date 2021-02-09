using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Serialization;

namespace Cbuilder.Block.Entities
{
    public class ViewModule
    {
        [XmlAttribute]
        public int ID { get; set; }
       
        [XmlAttribute]
        public string ElementID { get; set; }
        [XmlAttribute]
        public Guid ModuleID { get; set; }
        [XmlAttribute]
        public string InvokeName { get; set; }
        [XmlAttribute]
        public string InvokeParam { get; set; }
        [XmlAttribute]
        public string Title { get; set; }
        [XmlAttribute]
        public string ModuleType { get; set; }
        [XmlAttribute]
        public string CssClass { get; set; }
        [XmlAttribute]
        public int DisplayOrder { get; set; }
    }
    public static class ModuleType
    {
        public const string ViewComponent = "viewcomponent"; 
        public const string PartialView = "partialview";
    }
   
}
