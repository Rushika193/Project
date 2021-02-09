using System;
using System.Collections.Generic;
using System.Text;
using System.Xml;
using System.Xml.Serialization;

namespace Cbuilder.Block.Entities
{
    public class DashboardLayout
    {
       
        public List<LayoutElement> Elements { get; set; }
        public List<ViewModule> Modules { get; set; }

        public string PageName { get; set; }
        public int SiteID { get; set; }
       
    }
    public class LayoutElement
    {
        [XmlAttribute]
        public int ID { get; set; }
        [XmlAttribute]
        public string ElementID { get; set; }
        [XmlAttribute]
        public string ParentID { get; set; }
        [XmlAttribute]
        public int DisplayOrder { get; set; }
        [XmlAttribute]
        public string Attributes { get; set; }
        [XmlAttribute]
        public string EleType { get; set; }
        [XmlAttribute]
        public bool HasInnerElement { get; set; }
        [XmlAttribute]
        public bool HasModules { get; set; }
    }
    
}
