using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Webbuilder
{
    public class OnlineApiInfo
    {
        public int Offset { get; set; }
        public int Limit { get; set; }
        public string SearchText { get; set; }
        public string SecureToken { get; set; }
        public string Type { get; set; }
        public string Category { get; set; }
        public string ApplicationName { get; set; }
        public int SectorID { get; set; }
        public int SiteCategoryID { get; set; }
        public int BusinessTypeID { get; set; }
        public string ThemeName { get; set; }
        public string ComponentName { get; set; }
        public string TagIDs { get; set; }
    }
}
