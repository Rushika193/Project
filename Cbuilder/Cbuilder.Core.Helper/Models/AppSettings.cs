using System.IO;

namespace Cbuilder.Core.Helper.Models
{

    public static class CurrentHostEnvironment
    {
        public static string WebRootPath { get; set; }
        public static string ContentRootPath { get; set; }
        public static bool IsDevelopment { get; set; }
        public static bool IsProduction { get; set; }
        public static bool IsStaging { get; set; }
    }
    public class APIURL
    {
        public static string IdentityBaseUri { get; set; }
        public static string LoggerBaseUri { get; set; }
        public static string ApiGatewayBaseUri { get; set; }
        public static string CampaignBaseUri { get; set; }
        public static string PaymentGatewayUri { get; set; }
    }

    public class APIScope
    {
        public static string IdentityPassword { get; set; }
        public static string LoggerLog { get; set; } = "/api/Logger/";
    }

    public class CbuilderLog
    {
        public static string FolderName { get; set; } = "cbuilderlogs";
    }
}
