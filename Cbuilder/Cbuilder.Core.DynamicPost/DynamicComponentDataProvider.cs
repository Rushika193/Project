
using Cbuilder.Core.API.Enum;
using Cbuilder.Core.API.Models;
using SQLHelper;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Cbuilder.Core.DynamicPost
{
    public class DynamicComponentDataProvider
    {
        #region Post_Crud

        public async Task<int> AddNewPost(Post postObj,int siteId,string userName)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@PostKey", postObj.GeneratePostKey()));
            sQLParam.Add(new SQLParam("@SiteId", siteId));
            sQLParam.Add(new SQLParam("@Name", postObj.Name));
            sQLParam.Add(new SQLParam("@Form", postObj.Form));
            sQLParam.Add(new SQLParam("@HasDetail", postObj.HasDetail));
            sQLParam.Add(new SQLParam("@IsActive", postObj.IsActive));
            sQLParam.Add(new SQLParam("@AddedBy", userName));
            sQLParam.Add(new SQLParam("@ComponentDataList", postObj.ComponentDataList));
            sQLParam.Add(new SQLParam("@ComponentDataDetail", postObj.ComponentDataDetail));
            sQLParam.Add(new SQLParam("@ComponentDataListView", postObj.ComponentDataListView));
            sQLParam.Add(new SQLParam("@ComponentDataDetailView", postObj.ComponentDataDetailView));
            SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
            try
            {
               return  await handler.ExecuteNonQueryAsync("[usp_WebBuilder_DynamicPostType_AddNewPost]", sQLParam, "@output");
             }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        internal async Task<OperationStatus> AddUpdatePost(Post postObj, int siteId, string userName)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();

            sQLParam.Add(new SQLParam("@PostId", postObj.PostId)); 
            sQLParam.Add(new SQLParam("@PostKey", postObj.GeneratePostKey()));
            sQLParam.Add(new SQLParam("@SiteId", siteId));
            sQLParam.Add(new SQLParam("@Name", postObj.Name));
            sQLParam.Add(new SQLParam("@Form", postObj.Form));
            sQLParam.Add(new SQLParam("@HasDetail", postObj.HasDetail));
            sQLParam.Add(new SQLParam("@IsActive", postObj.IsActive));
            sQLParam.Add(new SQLParam("@UserName", userName));
            sQLParam.Add(new SQLParam("@ComponentDataList", postObj.ComponentDataList));
            sQLParam.Add(new SQLParam("@ComponentDataDetail", postObj.ComponentDataDetail));
            sQLParam.Add(new SQLParam("@ComponentDataListView", postObj.ComponentDataListView));
            sQLParam.Add(new SQLParam("@ComponentDataDetailView", postObj.ComponentDataDetailView));
            SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
            try
            {
                int result =await handler.ExecuteNonQueryAsync("[usp_WebBuilder_DynamicPostType_AddUpdatePost]", sQLParam, "@output");
                if (result == 1)
                {
                    return new OperationStatus { Message = "Post added successfully.", StatusCode = StatusCode.Created, Result = result };
                }
                else if (result == 2)
                {
                    return new OperationStatus { Message = "Post updated successfully.", StatusCode = StatusCode.Updated, Result = result };
                }
                return new OperationStatus { Message = "Something went wrong while saving Post data.", StatusCode = StatusCode.ServerError, Result = result };
            }
            catch
            {
                throw;
            }
        }

        internal async Task<string> GetFormByPostId(int postId)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@PostId", postId));
            try
            {
                SQLGetAsync handler = new SQLGetAsync();
                return await handler.ExecuteAsScalarAsync<string>("[usp_WebBuilder_DynamicPostType_GetFormByPostId]", sQLParam);
            }
            catch
            {
                throw;
            }
        }
        internal async Task DeletePost(Post obj, int siteId, string userName)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@PostId", obj.PostId));
            sQLParam.Add(new SQLParam("@SiteId", siteId));
            sQLParam.Add(new SQLParam("@DeletedBy", userName));
            try
            {
                SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
                await handler.ExecuteNonQueryAsync("[usp_WebBuilder_DynamicPostType_DeletePost]", sQLParam);
            }
            catch
            {
                throw;
            }
        }

        public async Task<int> UpdatePost(Post postObj, int siteId, string userName)
        {

            List<SQLParam> sQLParam = new List<SQLParam>();

            sQLParam.Add(new SQLParam("@PostId", postObj.PostId));
            sQLParam.Add(new SQLParam("@SiteId", siteId));
            sQLParam.Add(new SQLParam("@Name", postObj.Name));
            sQLParam.Add(new SQLParam("@Form", postObj.Form));
            sQLParam.Add(new SQLParam("@HasDetail", postObj.HasDetail));
            sQLParam.Add(new SQLParam("@UpdatedBy", userName));
            sQLParam.Add(new SQLParam("@ComponentDataList", postObj.ComponentDataList));
            sQLParam.Add(new SQLParam("@ComponentDataDetail", postObj.ComponentDataDetail));
            sQLParam.Add(new SQLParam("@ComponentDataListView", postObj.ComponentDataListView));
            sQLParam.Add(new SQLParam("@ComponentDataDetailView", postObj.ComponentDataDetailView));
            SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
            try
            {
               return await handler.ExecuteNonQueryAsync("[usp_WebBuilder_DynamicPostType_UpdatePost]", sQLParam, "@output");
            }
            catch
            {
                throw;
            }
        }

        internal async Task PublishPostType(Post postObj, int siteId, string userName)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@PostId", postObj.PostId));
            sQLParam.Add(new SQLParam("@SiteId", siteId));
            sQLParam.Add(new SQLParam("@ComponentDataList", postObj.ComponentDataList));
            sQLParam.Add(new SQLParam("@ComponentDataDetail", postObj.ComponentDataDetail));
            sQLParam.Add(new SQLParam("@ComponentDataListView", postObj.ComponentDataListView));
            sQLParam.Add(new SQLParam("@ComponentDataDetailView", postObj.ComponentDataDetailView));
            try
            {
                SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
                await handler.ExecuteNonQueryAsync("[usp_WebBuilder_DynamicPostType_PublishPost]", sQLParam);
            }
            catch
            {
                throw;
            }
        }

        internal async Task<IList<Post>> GetPost(string keyword,int siteId)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@SiteId", siteId));
            sQLParam.Add(new SQLParam("@Keyword", keyword));
            SQLGetListAsync handler = new SQLGetListAsync();
            try
            {
                return await handler.ExecuteAsListAsync<Post>("[usp_WebBuilder_DynamicPostType_GetPost]", sQLParam);
            }
            catch
            {
                throw;
            }
        }
        internal async Task<IList<Post>> GetPostAndId()
        {
            SQLGetListAsync handler = new SQLGetListAsync();
            try
            {
                return await handler.ExecuteAsListAsync<Post>("[usp_WebBuilder_DynamicPostType_GetPostAndId]");
            }
            catch
            {
                throw;
            }
        }

        internal async Task<Post> GetPostById(int postId, int siteId)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@PostId", postId));
            sQLParam.Add(new SQLParam("@SiteId", siteId));
            SQLGetAsync handler = new SQLGetAsync();
            try
            {
                return await handler.ExecuteAsObjectAsync<Post>("[usp_WebBuilder_DynamicPostType_GetPostById]", sQLParam);
            }
            catch
            {
                throw;
            }
        }

        internal async Task<Post> GetPostByPostKey(string postKey, int siteId)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@PostKey", postKey));
            sQLParam.Add(new SQLParam("@SiteId", siteId));
            SQLGetAsync handler = new SQLGetAsync();
            try
            {
                return await handler.ExecuteAsObjectAsync<Post>("[usp_WebBuilder_DynamicPostType_GetPostByPostKey]", sQLParam);
            }
            catch
            {
                throw;
            }
        }

        internal async Task<string> GetPostNameByPostId(int postId)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@PostId", postId));
            SQLGetAsync handler = new SQLGetAsync();
            try
            {
                return await handler.ExecuteAsScalarAsync<string>("[usp_WebBuilder_DynamicPostType_GetPostNameByPostId]", sQLParam);
            }
            catch
            {
                throw;
            }
        }

        internal async Task<bool> CheckHasDetailTemplates(int postId)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@PostId", postId));
            SQLGetAsync handler = new SQLGetAsync();
            try
            {
                return await handler.ExecuteAsScalarAsync<bool>("[usp_WebBuilder_DynamicPostType_CheckHasDetailTemplate]", sQLParam);
            }
            catch
            {
                throw;
            }
        }

        internal async Task ClonePostType(int postId, int siteId, string addedBy)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@PostId", postId));
            sQLParam.Add(new SQLParam("@PostKey", (new Post()).GeneratePostKey()));
            sQLParam.Add(new SQLParam("@SiteId", siteId));
            sQLParam.Add(new SQLParam("@AddedBy", addedBy));
            try
            {
                SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
                await handler.ExecuteNonQueryAsync("[usp_WebBuilder_DynamicPostType_ClonePost]", sQLParam);
            }
            catch
            {
                throw;
            }
        }
        #endregion

        #region PostData_Crud
        internal async Task AddNewPostData(PostData obj,int siteID,string userName)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@PostId", obj.PostId));
            sQLParam.Add(new SQLParam("@PostKey", obj.PostKey));
            sQLParam.Add(new SQLParam("@SiteId", siteID));
            sQLParam.Add(new SQLParam("@JsonData", obj.JsonData));
            sQLParam.Add(new SQLParam("@AddedBy", userName));
            sQLParam.Add(new SQLParam("@IsActive", obj.IsActive));
            SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
            try
            {
                await handler.ExecuteNonQueryAsync("[usp_WebBuilder_DynamicPostData_AddNewPostData]", sQLParam);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        internal async Task ClonePostData(int postDataId, int siteId, string addedBy)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@PostDataId", postDataId));
            sQLParam.Add(new SQLParam("@SiteId", siteId));
            sQLParam.Add(new SQLParam("@AddedBy", addedBy));
            SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
            try
            {
                await handler.ExecuteNonQueryAsync("[usp_WebBuilder_DynamicPostData_ClonePostData]", sQLParam);
            }
            catch
            {
                throw;
            }
        }

        internal async Task UpdatePostDataOrder(string order)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@Order", order));
            SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
            try
            {
                await handler.ExecuteNonQueryAsync("[usp_WebBuilder_DynamicPostData_UpdatePostDataOrder]", sQLParam);
            }
            catch
            {
                throw;
            }
        }
        internal async Task DeletePostData(int postDataId, int siteID, string userName)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@PostDataId", postDataId));
            sQLParam.Add(new SQLParam("@SiteId", siteID));
            sQLParam.Add(new SQLParam("@DeletedBy", userName));
            SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
            try
            {
                await handler.ExecuteNonQueryAsync("[usp_WebBuilder_DynamicPostData_DeletePostData]", sQLParam);
            }
            catch
            {
                throw;
            }
        }

        internal async Task UpdatePostData(PostData obj,int siteID,string userName)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@PostDataId", obj.PostDataId));
            sQLParam.Add(new SQLParam("@SiteId", siteID));
            sQLParam.Add(new SQLParam("@UpdatedBy", userName));
            sQLParam.Add(new SQLParam("@JsonData", obj.JsonData));
            SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
            try
            {
                await handler.ExecuteNonQueryAsync("[usp_WebBuilder_DynamicPostData_UpdatePostData]", sQLParam);
            }
            catch(Exception ex)
            {
                throw ex;
            }            
        }

        internal async Task<IList<PostData>> GetPostDataByPostId(int postId, int offset, int limit, int siteId)
        {
            
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@PostId", postId));
            sQLParam.Add(new SQLParam("@SiteId", siteId));
            sQLParam.Add(new SQLParam("@Offset", offset));
            sQLParam.Add(new SQLParam("@Limit", limit));
            SQLGetListAsync handler = new SQLGetListAsync();
            try
            {
                return await handler.ExecuteAsListAsync<PostData>("[usp_WebBuilder_DynamicPostData_GetPostDataByPostId]", sQLParam);
            }
            catch
            {
                throw;
            }
        }

        internal async Task<IList<PostData>> GetPostDataByKey(string postKey, int offset, int limit, int siteId)
        {
            
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@PostKey", postKey));
            sQLParam.Add(new SQLParam("@SiteId", siteId));
            sQLParam.Add(new SQLParam("@Offset", offset));
            sQLParam.Add(new SQLParam("@Limit", limit));
            SQLGetListAsync handler = new SQLGetListAsync();
            try
            {
                return await handler.ExecuteAsListAsync<PostData>("[usp_WebBuilder_DynamicPostData_GetPostDataByKey]", sQLParam);
            }
            catch
            {
                throw;
            }
        }

        internal async Task<PostData> GetPostDataById(int postDataId)
        {            
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@PostDataId", postDataId));
            SQLGetAsync handler = new SQLGetAsync();
            try
            {
                return await handler.ExecuteAsObjectAsync<PostData>("[usp_WebBuilder_DynamicPostData_GetPostDataById]", sQLParam);
            }
            catch
            {
                throw;
            }
        }

        internal async Task<string> GetPostTypeById(int id)
        {
            
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@PostId", id));

            SQLGetAsync handler = new SQLGetAsync();
            try
            {
                return await handler.ExecuteAsObjectAsync<string>("[usp_WebBuilder_DynamicPostData_GetPostTypeById]", sQLParam);
            }
            catch
            {
                throw;
            }
        }
        #endregion

        #region Template_Crud
        internal async Task<int> AddNewTemplate(Template obj, string appPath, int siteId, string userName)
        {
            int createdTemplateId = 0;
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@TemplateKey", obj.GenerateTemplateKey()));
            sQLParam.Add(new SQLParam("@SiteId", siteId));
            sQLParam.Add(new SQLParam("@PostId", obj.PostId));
            sQLParam.Add(new SQLParam("@PostKey", obj.PostKey));
            sQLParam.Add(new SQLParam("@TemplateName", obj.TemplateName));
            sQLParam.Add(new SQLParam("@TemplateViewDom", obj.TemplateViewDom));
            sQLParam.Add(new SQLParam("@TemplateEditDom", obj.TemplateEditDom));
            sQLParam.Add(new SQLParam("@Screenshot", obj.ScreenshotFile(appPath)));
            sQLParam.Add(new SQLParam("@Type", obj.Type));
            sQLParam.Add(new SQLParam("@IsActive", obj.IsActive));
            sQLParam.Add(new SQLParam("@AddedBy", userName));
            SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
            try
            {
                createdTemplateId = await handler.ExecuteNonQueryAsync("[usp_WebBuilder_DynamicTemplate_AddNewTemplate]", sQLParam, "@CreatedTemplateId");
                return createdTemplateId;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        internal async Task DeleteTemplate(int templateID, int siteID, string userName)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@TemplateId", templateID));
            sQLParam.Add(new SQLParam("@SiteId", siteID));
            sQLParam.Add(new SQLParam("@DeletedBy", userName));
            SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
            try
            {
                await handler.ExecuteNonQueryAsync("[usp_WebBuilder_DynamicTemplate_DeleteTemplate]", sQLParam);
            }
            catch
            {
                throw;
            }
        }

        internal async Task UpdateTemplate(Template obj,string appPath, int siteId, string userName)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@TemplateId", obj.TemplateId));
            sQLParam.Add(new SQLParam("@SiteId", siteId));
            sQLParam.Add(new SQLParam("@TemplateName", obj.TemplateName));
            sQLParam.Add(new SQLParam("@TemplateEditDom", obj.TemplateEditDom));
            sQLParam.Add(new SQLParam("@TemplateViewDom", obj.TemplateViewDom));
            sQLParam.Add(new SQLParam("@Screenshot", obj.ScreenshotFile(appPath)));
            //sQLParam.Add(new SQLParam("@Type", obj.Type));
            sQLParam.Add(new SQLParam("@UpdatedBy", userName));
            SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
            try
            {
                await handler.ExecuteNonQueryAsync("[usp_WebBuilder_DynamicTemplate_UpdateTemplate]", sQLParam);
            }
            catch
            {
                throw;
            }
        }


        internal async Task<IList<Template>> GetTemplate()
        {
            SQLGetListAsync handler = new SQLGetListAsync();
            try
            {
                return await handler.ExecuteAsListAsync<Template>("[usp_WebBuilder_DynamicTemplate_GetTemplate");
            }
            catch
            {
                throw;
            }
        }

        internal async Task<IList<Template>> GetAllPostTemplates(string templateName, int postId, int siteId,string type = null)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@TemplateName", templateName));
            sQLParam.Add(new SQLParam("@PostId", postId));
            sQLParam.Add(new SQLParam("@SiteId", siteId));
            sQLParam.Add(new SQLParam("@Type", type));
            SQLGetListAsync handler = new SQLGetListAsync();
            try
            {
                return await handler.ExecuteAsListAsync<Template>("[usp_WebBuilder_DynamicTemplate_GetAllPostTemplates]", sQLParam);
            }
            catch
            {
                throw;
            }
        }

        internal async Task<IList<Template>> GetAllPostTemplatesByKey(string postKey, int siteId, string type = null)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@PostKey", postKey));
            sQLParam.Add(new SQLParam("@SiteId", siteId));
            sQLParam.Add(new SQLParam("@Type", type));
            SQLGetListAsync handler = new SQLGetListAsync();
            try
            {
                return await handler.ExecuteAsListAsync<Template>("[usp_WebBuilder_DynamicTemplate_GetAllPostTemplatesByKey]", sQLParam);
            }
            catch
            {
                throw;
            }

        }

        internal async Task<Template> GetTemplateById(int templateId, int siteId)
        {
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@TemplateId", templateId));
            sQLParam.Add(new SQLParam("@SiteId", siteId));
            SQLGetAsync handler = new SQLGetAsync();
            try
            {
                return await handler.ExecuteAsObjectAsync<Template>("[usp_WebBuilder_DynamicTemplate_GetTemplateById]", sQLParam);
            }
            catch
            {
                throw;
            }
        }

        internal async Task<int> CloneTemplate(int templateID, string addedBy,int siteID, string appPath)
        {
            Template obj =await GetTemplateById(templateID, siteID);
            string ssName = "";
            if (!String.IsNullOrEmpty(obj.Screenshot))
            {
                try
                {
                    //generate name for cloned screenshot
                    TimeSpan ts = DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, 0);
                    string timestamp = Convert.ToInt64(ts.TotalSeconds).ToString();
                    ssName = String.Format("{0}.{1}.{2}.{3}.png", obj.PostId, obj.Type, timestamp, Path.GetRandomFileName());
                    //copy screenshot
                    string dirPath = String.Format("{0}\\DynamicPost\\Assets\\screenshots\\", appPath);
                    //string ssPath = String.Format("{0}\\{1}", dirPath, obj.Screenshot);
                    string[] ssPaths = obj.Screenshot.Split('/');
                    if (ssPaths.Length > 1)
                    {
                        string ssPath = ssPaths[ssPaths.Length - 1];
                        ssPath = String.Format("{0}\\{1}", dirPath, ssPath);
                        string clonePath = String.Format("{0}\\{1}", dirPath, ssName);
                        if (File.Exists(ssPath))
                        {
                            File.Copy(ssPath, clonePath);
                        }
                        ssName = "/DynamicPost/Assets/screenshots/" + ssName;
                    }
                }
                catch {
                    throw;
                }
                
            }
            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@TemplateId", obj.TemplateId));
            sQLParam.Add(new SQLParam("@TemplateKey", (new Template()).GenerateTemplateKey()));
            sQLParam.Add(new SQLParam("@Screenshot", ssName));
            sQLParam.Add(new SQLParam("@SiteId", obj.SiteId));
            sQLParam.Add(new SQLParam("@AddedBy", addedBy));
            try
            {
                SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
                await handler.ExecuteNonQueryAsync("[usp_WebBuilder_DynamicPostType_CloneTemplate]", sQLParam);
                return 1;
            }
            catch
            {
                throw;
            }
        }
        #endregion
    }
}
