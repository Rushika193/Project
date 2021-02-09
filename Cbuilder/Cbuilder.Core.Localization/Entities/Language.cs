using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Core.Localization
{
    public class Language
    {
        public IList<Language> AvailableCulture { get; set; }
        public bool EnabledCulture { get; set; }
        /// <summary>
        /// Gets or sets LanguageID.
        /// </summary>
        public int LanguageID { get; set; }
        /// <summary>
        /// Gets or sets LanguageName.
        /// </summary>
        public string LanguageName { get; set; }
        /// <summary>
        /// Gets or sets LanguageCode.
        /// </summary>
        public string LanguageCode { get; set; }
        /// <summary>
        /// Gets or sets FallBackLanguage.
        /// </summary>
        public string FallBackLanguage { get; set; }
        /// <summary>
        /// Gets or sets FallBackLanguageCode.
        /// </summary>
        public string FallBackLanguageCode { get; set; }
        /// <summary>
        /// Gets or sets NativeName.
        /// </summary>
        public string NativeName { get; set; }
        /// <summary>
        /// Gets or sets FlagPath.
        /// </summary>
        public string FlagPath { get; set; }
        public string FilePath { get; set; }
        public string Country { get; set; }
        public string CultureLanguage { get; set; }

    }
    public class GetlocalizeValue
    {
        public GetlocalizeValue() { }
        public string key { get; set; }
        public string value { get; set; }
        public string FilePath { get; set; }
        //public string data { get; set; }
        public GetlocalizeValue(string key, string value)
        {
            this.key = key;
            this.value = value;
        }
    }
    public class LocalizedValues
    {
        public List<GetlocalizeValue> lstJson { get; set; }
    }
    public class GetLanguage
    {
        public string FilePath { get; set; }
        public string LanguageCode { get; set; }
    }
}
