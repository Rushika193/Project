using SQLHelper;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text;
using System.Threading.Tasks;


namespace Cbuilder.Core.Localization
{
    public class LocalizationManager
    {
        public LocalizationManager() { }
        public void UpdateLocalizationStatus(string Localization)
        {
            LocalizationProvider provider = new LocalizationProvider();
            provider.UpdateLocalizationStatus(Localization);
        }

        public async Task<IList<LanguageList>> GetCultures()
        {
            IList<LanguageList> lstLocales = new List<LanguageList>();
            await Task.Run(() =>
             {
                 foreach (CultureInfo ci in CultureInfo.GetCultures(CultureTypes.SpecificCultures))
                 {
                     LanguageList obj = new LanguageList();
                     obj.LanguageCode = ci.Name;
                     obj.CountryLanguageCode = ci.EnglishName;
                     obj.Country = ci.NativeName;
                     lstLocales.Add(obj);
                 }
             }
             );
            return lstLocales;
        }
        public async Task<IList<Language>> GetLanguage(int siteID)
        {
            LocalizationProvider provider = new LocalizationProvider();
            return await provider.GetLanguage(siteID);
        }

        public async Task DeletelanguageByID(int LanguageID)
        {
            LocalizationProvider provider = new LocalizationProvider();
            await provider.DeletelanguageByID(LanguageID);
        }
        public async Task<IList<KeyValue>> GetFilePath()
        {
            LocalizationProvider provider = new LocalizationProvider();
            return await provider.GetFilePath();
        }
        public async Task<IList<LocalizedData>> GetFilePathByApplicationID(string applicationIDs)
        {
            LocalizationProvider provider = new LocalizationProvider();
            return await provider.GetFilePathByApplicationID(applicationIDs);
        }
        public async Task Add(CountryLanguage countryLanguage, string userName)
        {
            LocalizationProvider provider = new LocalizationProvider();
            await provider.Add(countryLanguage, userName);
        }

        public async Task<IList<LanguageMiniInfo>> GetLanguageForViewComponent()
        {

            LocalizationProvider provider = new LocalizationProvider();
            return await provider.GetLanguageForViewComponent();
        }

    }
}
