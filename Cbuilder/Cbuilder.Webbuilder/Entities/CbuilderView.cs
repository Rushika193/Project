using System.Collections.Generic;

namespace Cbuilder.Webbuilder
{
    public class CbuilderView : WebBuilderInfo
    {
        public string PortalDefaultPage { get; set; }
        public string TempPageName { get; set; }
        public string Webbuildermodulepath { get; set; } = "/cbuilderassets/";
        public string EnableHeader { get; set; }
        public string OnlineStoreURL { get; set; }
        public string DigiSphereApi { get; set; }
        public string Version { get; set; }
        public bool IsDevelopmentMode { get; set; }
        public string Applicationname { get; set; }
        public string ComponentList { get; set; }
        public string HostURL { get; set; }
        public string APIResultString { get; set; }
        public string BucketComponents { get; set; }
        public string  DarkMode { get; set; }
        public bool UnderConstruction { get; set; }

        public IList<WebBuilderPages> PageList { get; set; }
        public string PagesDOM { get; set; }
        public IList<WebBuilderPages> DashboardPages { get; set; }
        public IList<WebBuilderPages> ForbiddenPage { get; set; }
        public string DashboardPagesDOM { get; set; }
        public List<BuilderComponentJson> ComponentValues { get; set; }
        //public List<BuilderComponentJson> BucketComponents { get; set; }
        public IList<ApplicationDetail> ApplicationNames { get; set; }
        public IList<LanguageList> Languages { get; set; }
        public string ParamString { get; set; }
        public string CultureCountry { get; set; }
        public string CultureLanguage { get; set; }
    }
}
