using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using SQLHelper;
namespace Cbuilder.Core.Localization
{
    public class LocalizationProvider
    {
        public LocalizationProvider()
        { }

        public async void UpdateLocalizationStatus(string Localization)
        {
            try
            {
                List<SQLParam> param = new List<SQLParam>
                {
                new SQLParam("@Localization", Localization)
                };
                SQLExecuteNonQueryAsync sql = new SQLExecuteNonQueryAsync();
                await sql.ExecuteNonQueryAsync("[dbo].[usp_Localization_SetLocalization]", param);
            }
            catch
            {
                throw;
            }
        }

        public async Task<IList<Language>> GetLanguage(int siteID)
        {

            try
            {
                List<SQLParam> param = new List<SQLParam>
                {
                new SQLParam("@SiteID", siteID)
                };
                SQLGetListAsync handler = new SQLGetListAsync();
                return await handler.ExecuteAsListAsync<Language>("[dbo].[usp_Localization_GetLanguage]", param);

            }
            catch
            {
                throw;
            }
        }
        public async Task<IList<KeyValue>> GetFilePath()
        {
            try
            {
                SQLGetListAsync handler = new SQLGetListAsync();
                return await handler.ExecuteAsListAsync<KeyValue>("[dbo].[usp_Localization_GetFiles]");

            }
            catch
            {
                throw;
            }
        }
        public async Task<IList<LocalizedData>> GetFilePathByApplicationID(string applicationIDs)
        {
            try
            {
                List<SQLParam> sQLParam = new List<SQLParam>
                {
                    new SQLParam("@ApplicationIDs", applicationIDs)

                };
                SQLGetListAsync handler = new SQLGetListAsync();
                return await handler.ExecuteAsListAsync<LocalizedData>("[dbo].[usp_Localization_GetFilesbyApplicationID]", sQLParam);
            }
            catch
            {
                throw;
            }
        }
        public async Task DeletelanguageByID(int LanguageID)
        {
            List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@LanguageID", LanguageID)

            };
            try
            {
                SQLExecuteNonQueryAsync sqlhandler = new SQLExecuteNonQueryAsync();
                await sqlhandler.ExecuteNonQueryAsync("[dbo].[usp_Localization_DeleteLanguage]", sQLParam);

            }
            catch
            {
                throw;
            }
        }

        public async Task Add(CountryLanguage countryLanguage, string userName)
        {
            List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@CultureCode", countryLanguage.CultureCode),
                new SQLParam("@CultureName", countryLanguage.CultureName),
                new SQLParam("@FallbackCulture", countryLanguage.CultureName),
                new SQLParam("@FallbackCultureCode",countryLanguage.CultureCode),
                new SQLParam("@CreatedBy",userName),
                new SQLParam("@Country", countryLanguage.Country),
                new SQLParam("@CountryCode", countryLanguage.CountryCode),
                new SQLParam("@Language", countryLanguage.Language),
                new SQLParam("@LanguageCode", countryLanguage.LanguageCode)
            };
            try
            {
                SQLExecuteNonQueryAsync sqlhandler = new SQLExecuteNonQueryAsync();
                await sqlhandler.ExecuteNonQueryAsync("[dbo].[usp_Localization_AddLanguage]", sQLParam);

            }
            catch
            {
                throw;
            }
        }

        public async Task<IList<LanguageMiniInfo>> GetLanguageForViewComponent()
        {

            try
            {

                SQLGetListAsync handler = new SQLGetListAsync();
                return await handler.ExecuteAsListAsync<LanguageMiniInfo>("[dbo].[usp_Localization_GetLanguageForViewComponent]");

            }
            catch
            {
                throw;
            }
        }


    }
}
