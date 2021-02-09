namespace Cbuilder.Webbuilder
{
    public class CbuilderVariables : WebBuilderInfo
    {
        public string PortalDefaultPage { get; set; }
        public string TempPageName { get; set; }
        public string Webbuildermodulepath { get; set; } = "/modules/webbuilder";
        public string EnableHeader { get; set; }
        public string OnlineStoreURL { get; set; }
        public string DigiSphereApi { get; set; }
        public string Version { get; set; }
        public bool IsDevelopmentMode { get; set; }
        public string Applicationname { get; set; }
        public string ComponentList { get; set; }
        public string HostURL { get; set; }
    }
}
