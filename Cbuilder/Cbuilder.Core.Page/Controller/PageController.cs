#region "Copyright"
/*
FOR FURTHER DETAILS ABOUT LICENSING, PLEASE VISIT "LICENSE.txt" INSIDE THE SAGEFRAME FOLDER
*/
#endregion

#region "References"
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using Cbuilder.Core.SEO;
using System.Data.SqlClient; 
using System.Threading.Tasks;
#endregion

namespace Cbuilder.Core.Pages
{
    /// <summary>
    /// Business logic for PageController. 
    /// </summary>
    public class PageController
    {


        /// <summary>
        /// Add update page.
        /// </summary>
        /// <param name="objPage">Object of PortalPage class.</param>
        public async Task<string> AddUpdatePages(PortalPage objPage, List<PageRolePermission> RolePermissions, string hostUrl,int siteID, string userName)
        {
            string pageID = string.Empty;
            PageDataProvider objProvider = new PageDataProvider();
            pageID = await objProvider.AddUpdatePages(objPage, RolePermissions,siteID, userName);
            //For SEO Meta Data

            List<SEOMetaValues> metaValues = new List<SEOMetaValues>();
            SEOMetaValues title = new SEOMetaValues();
            title.SEOMetaTagTypeID = 1; //Type
            title.MetaTagContent = objPage.PageName;
            metaValues.Add(title);

            SEOMetaValues desc = new SEOMetaValues();
            desc.SEOMetaTagTypeID = 2;//Title
            desc.MetaTagContent = objPage.Title;
            metaValues.Add(desc);

            SEOMetaValues image = new SEOMetaValues();
            image.SEOMetaTagTypeID = 4;//Description
            image.MetaTagContent = string.Empty;
            metaValues.Add(image);

            SEOMetaValues type = new SEOMetaValues();
            type.SEOMetaTagTypeID = 5;//Url
            type.MetaTagContent = string.Empty;
            metaValues.Add(type);

            SEOController seoContrl = new SEOController();
            await seoContrl.SaveSEOMetaTag(pageID, metaValues, userName, hostUrl);
            return pageID;
        }

        /// <summary>
        /// Update application setting key value.
        /// </summary>
        /// <param name="PageName">Page name.</param>
        public async Task UpdSettingKeyValue(string PageName)
        {
            try
            {
                PageDataProvider objProvider = new PageDataProvider();
                await objProvider.UpdSettingKeyValue(PageName);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<IList<AdminPage>> GetAdminPages(string areaName,  string keyword, int offset, int limit)
        {
            PageDataProvider objProvider = new PageDataProvider();
            return await objProvider.GetAdminPages(areaName, keyword, offset, limit);
        }

        public async Task<IList<PortalPage>> GetPortalPages(string keyword,int siteID, int offset, int limit)
        {
            PageDataProvider objProvider = new PageDataProvider();
            return await objProvider.GetPortalPages(keyword,siteID, offset, limit);
        }

        public async Task<IList<PageAction>> GetPageActionsByPageId(string pageID)
        {
            PageDataProvider objProvider = new PageDataProvider();
            return await objProvider.GetPageActionsByPageId(pageID);
        }

        public async Task<IList<PageRolePermission>> GetPageRoleByPageId(string pageID)
        {
            PageDataProvider objProvider = new PageDataProvider();
            return await objProvider.GetPageRoleByPageId(pageID);
        }
    }
}
