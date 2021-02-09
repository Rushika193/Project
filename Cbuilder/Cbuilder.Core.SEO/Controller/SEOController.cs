using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Newtonsoft.Json;
using System.IO;
using Cbuilder.Core.SEO.JsonLD;
using Cbuilder.Core.Helper;
using Cbuilder.Core.Constants;
using Cbuilder.Core.InMemory;
using System.Threading.Tasks;
using Cbuilder.Core.CoreHelpers;
using Microsoft.AspNetCore.Http;

namespace Cbuilder.Core.SEO
{
    public class SEOController
    {
        private readonly ICbuilderCache _memoryCache;
        public SEOController(ICbuilderCache memoryCache)
        {
            _memoryCache = memoryCache;
        }
        public SEOController() { }
        public Task<IList<SEOMetaType>> GetSEOMetaType()
        {
            SEOProvider provider = new SEOProvider();
            return provider.GetSEOMetaType();
        }
        public Task<IList<SEOMetaValues>> GetSEOMetaValuesByPageId(int pageID, int userModuleID, int portalID)
        {
            SEOProvider provider = new SEOProvider();
            return provider.GetSEOMetaValuesByPageId(pageID, userModuleID, portalID);
        }
        public Task<IList<WebTypes>> GetWebTypes()
        {
            SEOProvider provider = new SEOProvider();
            return provider.GetWebTypes();
        }
        public async Task<int> SaveSEOMetaTag(string pageID, List<SEOMetaValues> objTagValue, string userName, string hostUrl)
        {
            SEOProvider provider = new SEOProvider();
            DataTable tagTable = new DataTable();
            tagTable.Columns.Add("RowNum");
            tagTable.Columns.Add("SEOMetaTagTypeID");
            tagTable.Columns.Add("MetaTagContent");
            JsonLDBaseInfo jsonLDBaseInfo = new JsonLDBaseInfo();
            if (objTagValue.Count > 0)
            {
                int count = 1;


                foreach (SEOMetaValues item in objTagValue)
                {
                    DataRow dr = tagTable.NewRow();
                    dr["RowNum"] = count;
                    dr["SEOMetaTagTypeID"] = item.SEOMetaTagTypeID;
                    dr["MetaTagContent"] = item.MetaTagContent;
                    tagTable.Rows.Add(dr);
                    // creating LD+JSON
                    switch (item.SEOMetaTagTypeID)
                    {
                        case 1://@type
                            jsonLDBaseInfo.Type = item.MetaTagContent;
                            break;
                        case 2://Title
                            jsonLDBaseInfo.Title = item.MetaTagContent;
                            break;
                        case 3://Image
                            jsonLDBaseInfo.Image = new string[] { item.MetaTagContent };
                            break;
                        case 4://Description
                            jsonLDBaseInfo.Description = item.MetaTagContent;
                            break;

                    }
                    count++;
                }
            }
            string JsonLDValue = CreateJsonLD(jsonLDBaseInfo);
            string seoValue = string.Empty;
            string pageTitle = string.Empty;
            IList<SEOMetaType> seoTagList = await provider.GetSeoTags() as IList<SEOMetaType>;
            List<SEOAttribute> objSeoAttributeList = new List<SEOAttribute>();
            foreach (SEOMetaValues objseoMeta in objTagValue)
            {
                foreach (SEOMetaType seoMetaType in seoTagList)
                {
                    if (seoMetaType.TagTypeID == objseoMeta.SEOMetaTagTypeID)
                    {
                        string contentValue = seoMetaType.TagName;

                        switch (seoMetaType.CrawlerName)
                        {
                            case "facebook":
                                objSeoAttributeList.Add(new SEOAttribute("meta", "property", contentValue, "content", objseoMeta.MetaTagContent));
                                break;
                            case "twitter":
                                objSeoAttributeList.Add(new SEOAttribute("meta", "name", contentValue, "content", objseoMeta.MetaTagContent));
                                break;
                            case "google":
                                objSeoAttributeList.Add(new SEOAttribute("meta", "name", contentValue, "content", objseoMeta.MetaTagContent));
                                break;
                        }
                    }
                }
                if (objseoMeta.SEOMetaTagTypeID == 2)
                {
                    pageTitle = objseoMeta.MetaTagContent;
                }
            }
            pageTitle = Environment.NewLine + "<title>" + pageTitle + "</title>" + Environment.NewLine;
            string metaTagHtml = pageTitle + SEOHelper.BuildSEOTags(objSeoAttributeList) + AddAdditionalSEO() + JsonLDValue;
            metaTagHtml = metaTagHtml.Replace(hostUrl, "#{HostURL}#");
            return await provider.SaveSEOMetaTag(pageID, tagTable, metaTagHtml, userName);
        }
        
        public void SetDynamicMeta(MetaInfo objMeta, JsonLDBaseInfo jsonLDInfo, IHttpContextAccessor _httpContextAccessor)
        {
            string MetaHtml = CreateMetaTagsHtml(objMeta);
            string JSONLD = CreateJsonLD(jsonLDInfo);
            string metatags = MetaHtml + JSONLD;
            CoreHelper coreHelper = new CoreHelper();
            coreHelper.SetHttpContextItem(HttpContextKey.SEOMeta, metatags, _httpContextAccessor);
        }
        public void SetDynamicMeta(MetaInfo objMeta, HttpContextAccessor _httpContextAccessor)
        {
            string tags = CreateMetaTagsHtml(objMeta);
            CoreHelper coreHelper = new CoreHelper();
            coreHelper.SetHttpContextItem(HttpContextKey.SEOMeta, tags, _httpContextAccessor);
        }
        private string CreateMetaTagsHtml(MetaInfo objMeta)
        {
            SEOProvider provider = new SEOProvider();
            IList<SEOMetaType> seoTagList = provider.GetSeoTags().Result as IList<SEOMetaType>;
            List<SEOAttribute> objSeoAttributeList = new List<SEOAttribute>();
            string pageTitle = objMeta.ContentTitle;
            foreach (SEOMetaType seoMetaType in seoTagList)
            {
                string contentValue = seoMetaType.TagName;
                string content = string.Empty;
                switch (seoMetaType.TagTypeID)
                {
                    case 1://type
                        content = objMeta.ContentType;
                        break;
                    case 2: //title
                        content = objMeta.ContentTitle;
                        break;
                    case 3: //image
                        content = objMeta.ImageURL;
                        break;
                    case 4: //description
                        content = objMeta.ShortDescription;
                        break;
                }
                switch (seoMetaType.CrawlerName)
                {
                    case "facebook":
                        objSeoAttributeList.Add(new SEOAttribute("meta", "property", contentValue, "content", content));
                        break;
                    case "twitter":
                        objSeoAttributeList.Add(new SEOAttribute("meta", "name", contentValue, "content", content));
                        break;
                    case "google":
                        objSeoAttributeList.Add(new SEOAttribute("meta", "name", contentValue, "content", content));
                        break;
                }

            }
            pageTitle = Environment.NewLine + "<title>" + pageTitle + "</title>" + Environment.NewLine;
            return pageTitle + SEOHelper.BuildSEOTags(objSeoAttributeList) + AddAdditionalSEO();
        }
        private string AddAdditionalSEO()
        {

            SettingHelper settingHelper = new SettingHelper();


            Dictionary<string, string> settingValues = settingHelper.GetSettingValuesByKeys(string.Format("{0},{1},{2},{3},{4},{5},{6},{7},{8}",
             SettingKeys.MetaRefresh,
             SettingKeys.MetaCopyright,
             SettingKeys.MetaGenerator,
             SettingKeys.MetaAuthor,
             SettingKeys.MetaRESOURCE_TYPE,
             SettingKeys.MetaDISTRIBUTION,
             SettingKeys.MetaRobots,
             SettingKeys.MetaPAGE_ENTER,
             SettingKeys.MetaREVISIT_AFTER
             ));



            string refresh = settingValues[SettingKeys.MetaRefresh];
            string copyright = settingValues[SettingKeys.MetaCopyright];
            string generator = settingValues[SettingKeys.MetaGenerator];
            string author = settingValues[SettingKeys.MetaAuthor];
            string resourceType = settingValues[SettingKeys.MetaRESOURCE_TYPE];
            string distribution = settingValues[SettingKeys.MetaDISTRIBUTION];
            string robots = settingValues[SettingKeys.MetaRobots];
            string pageEnter = settingValues[SettingKeys.MetaPAGE_ENTER];
            string revisitAfter = settingValues[SettingKeys.MetaREVISIT_AFTER];

            List<SEOAttribute> objSeoAttributeList = new List<SEOAttribute>();
            objSeoAttributeList.Add(new SEOAttribute("meta", "name", "DISTRIBUTION", "content", distribution));
            objSeoAttributeList.Add(new SEOAttribute("meta", "name", "REVISIT-AFTER", "content", revisitAfter));
            //objSeoAttributeList.Add(new SEOAttribute("meta", "name", "Refresh", "content", refresh));
            objSeoAttributeList.Add(new SEOAttribute("meta", "name", "COPYRIGHT", "content", copyright));
            objSeoAttributeList.Add(new SEOAttribute("meta", "name", "GENERATOR", "content", generator));
            objSeoAttributeList.Add(new SEOAttribute("meta", "name", "AUTHOR", "content", author));
            objSeoAttributeList.Add(new SEOAttribute("meta", "name", "RESOURCE-TYPE", "content", resourceType));
            objSeoAttributeList.Add(new SEOAttribute("meta", "name", "DISTRIBUTION", "content", distribution));
            objSeoAttributeList.Add(new SEOAttribute("meta", "name", "ROBOTS", "content", robots));
            objSeoAttributeList.Add(new SEOAttribute("meta", "name", "REVISIT-AFTER", "content", revisitAfter));
            objSeoAttributeList.Add(new SEOAttribute("meta", "name", "PAGE-ENTER", "content", pageEnter));
            //Additional tags here:

            string metaTagHtml = SEOHelper.BuildSEOTags(objSeoAttributeList);
            return metaTagHtml;
        }
        public string GetSiteLogo
        {
            get { return ""; }
        }
        public async Task<string> GetSEOMetaValuesByPageName(string pageName,int siteID)
        {
            string metaValue = string.Empty;
            SEOProvider provider = new SEOProvider();
            SEOMetaValues sEOMetaValues=await provider.GetSEOMetaValuesByPageName(pageName,siteID);
            if (sEOMetaValues != null)
            {
                metaValue = sEOMetaValues.MetaTagContent;
            }
            return metaValue;
        }
        private string CreateJsonLD(JsonLDBaseInfo jsonLD)
        {
            var settings = new JsonSerializerSettings
            {
                NullValueHandling = NullValueHandling.Ignore,
                MissingMemberHandling = MissingMemberHandling.Ignore
            };
            string JsonVal = JsonConvert.SerializeObject(jsonLD, settings);
            StringBuilder sbLd = new StringBuilder();
            sbLd.Append("<script type='application/ld+json'>");
            sbLd.Append(JsonVal);
            sbLd.Append("</script>");
            return sbLd.ToString();
        }
    }
}
