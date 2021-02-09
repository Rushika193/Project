#region "Copyright"

/*
FOR FURTHER DETAILS ABOUT LICENSING, PLEASE VISIT "LICENSE.txt" INSIDE THE SAGEFRAME FOLDER
*/

#endregion

#region "References"

using System; 

#endregion

namespace Cbuilder.Core.InMemory
{
    /// <summary>
    /// Application cache keys.
    /// </summary>
    [Serializable]
    public static partial class CacheKeys
    {
        public static string SageGoogleAnalytics = "SageGoogleAnalytics";
        public static string Portals = "Portals";
        public static string SageSetting = "SageSetting";
        public static string StartupSageSetting = "StartupSageSetting";
        public static string SetLayout = "SetLayout";
        public static string DynamicMetaTags = "DynamicMetaTags";
    }
}
