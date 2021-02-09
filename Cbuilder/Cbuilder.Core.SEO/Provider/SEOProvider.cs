
using SQLHelper;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace Cbuilder.Core.SEO
{
    public class SEOProvider
    {
        public SEOProvider() { }

        internal async Task<IList<SEOMetaType>> GetSEOMetaType()
        {
            SQLGetListAsync sagesql = new SQLGetListAsync();
            try
            {
                return await sagesql.ExecuteAsListAsync<SEOMetaType>("[usp_SEO_GetSEOMetaType]");
            }
            catch
            {
                throw;
            }
        }

        internal async Task<IList<SEOMetaValues>> GetSEOMetaValuesByPageId(int pageID, int userModuleID, int portalID)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@PageID", pageID));
            sQLParam.Add(new SQLParam("@PortalID", portalID));

            SQLGetListAsync sagesql = new SQLGetListAsync();
            try
            {
                return await sagesql.ExecuteAsListAsync<SEOMetaValues>("[usp_SEO_GetSEOMetaValuesByPageId]", sQLParam);
            }
            catch
            {
                throw;
            }
        }
        internal Task<IList<WebTypes>> GetWebTypes()
        {

            SQLGetListAsync sagesql = new SQLGetListAsync();
            try
            {
                return sagesql.ExecuteAsListAsync<WebTypes>("[usp_SEOTypesValue_Get]");
            }
            catch
            {
                throw;
            }
        }
        internal async Task<int> SaveSEOMetaTag(string pageID, DataTable metaTagTable, string seoValue, string userName)
        {           

            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@PageID", pageID));
            sQLParam.Add(new SQLParam("@SEOValue", seoValue));
            sQLParam.Add(new SQLParam("@MetaTagTable", metaTagTable));
            sQLParam.Add(new SQLParam("@UserName", userName));

            SQLExecuteNonQueryAsync sagesql = new SQLExecuteNonQueryAsync();
            try
            {
                return await sagesql.ExecuteNonQueryAsync("[usp_SEO_SaveSEOMetaValues]", sQLParam, "@output");
            }
            catch
            {
                throw;
            }
        }
        internal async Task<IList<SEOMetaType>> GetSeoTags()
        {
            SQLGetListAsync sagesql = new SQLGetListAsync();
            try
            {
                return await sagesql.ExecuteAsListAsync<SEOMetaType>("[usp_SEO_GetMetaTags]");
            }
            catch
            {
                throw;
            }
        }

        internal async Task<SEOMetaValues> GetSEOMetaValuesByPageName(string pageName,int siteID)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@PageName", pageName));
            sQLParam.Add(new SQLParam("@SiteID", siteID));
            SQLGetAsync sagesql = new SQLGetAsync();
            try
            {
                return await sagesql.ExecuteAsObjectAsync<SEOMetaValues>("[usp_SEO_GetSEOMetaValuesByPageName]", sQLParam);
            }
            catch
            {
                throw;
            }
        }
    }
}
