
using Cbuilder.Core.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cbuilder.Core.DynamicPost
{
    public class DynamicComponentController
    {
        #region Post_Crud

        public async Task<int> AddNewPost(Post postObj, int siteId, string userName)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            return await provider.AddNewPost(postObj,siteId,userName);         
        }
        public async Task<OperationStatus> AddUpdatePost(Post postObj, int siteId, string userName)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            return await provider.AddUpdatePost(postObj,siteId,userName);
        }
        public async Task<string> GetFormByPostId(int postId)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            return await provider.GetFormByPostId(postId);
        }
        public async Task DeletePost(Post obj, int siteId, string userName)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            await provider.DeletePost(obj,siteId,userName);
        }

        public async Task<int> UpdatePost(Post postObj, int siteId, string userName)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            return await provider.UpdatePost(postObj,siteId,userName);
        }

        public async Task<IList<Post>> GetPost(string keyword,int siteId)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            return await provider.GetPost(keyword, siteId);
        }
        public async Task<IList<Post>> GetPostAndId()
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            return await provider.GetPostAndId();
        }
        public async Task<Post> GetPostById(int postId, int siteId)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            return await provider.GetPostById(postId, siteId);
        }
        public async Task<Post> GetPostByPostKey(string postKey, int siteId)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            return await provider.GetPostByPostKey(postKey, siteId);
        }
        public async Task<string> GetPostNameByPostId(int postId)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            return await provider.GetPostNameByPostId(postId);
        }

        public async Task PublishPostType(Post post, int siteId, string userName)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            await provider.PublishPostType(post,siteId,userName);
            //ComponentUploadHandler objHandler = new ComponentUploadHandler();
            //objHandler.ClearUpdateCache();
        }

        public async Task<bool> CheckHasDetailTemplates(int postId)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            return await provider.CheckHasDetailTemplates(postId);
        }

        public async Task ClonePostType(int postId, int siteId, string addedBy)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            await provider.ClonePostType(postId, siteId, addedBy);
        }
        #endregion

        #region PostData_Crud
        public async Task AddNewPostData(PostData obj,int siteID,string userName)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            await provider.AddNewPostData(obj,siteID,userName);
        }

        public async Task ClonePostData(int postDataId, int siteId, string addedBy)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            await provider.ClonePostData(postDataId, siteId, addedBy);
        }

        public async Task UpdatePostDataOrder(string order)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            await provider.UpdatePostDataOrder(order);
        }

        public async Task DeletePostData(int postDataId, int siteID, string userName)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            await provider.DeletePostData(postDataId, siteID,userName);
        }

        public async Task UpdatePostData(PostData obj, int siteID, string userName)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            await provider.UpdatePostData(obj,siteID,userName);
        }

        public async Task<IList<PostData>> GetPostDataByPostId(int postId, int offset, int limit, int siteId)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            return await provider.GetPostDataByPostId(postId, offset, limit, siteId);
        }

        public async Task<IList<PostData>> GetPostDataByKey(string postKey, string offset, string limit, string siteId)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            return await provider.GetPostDataByKey(postKey,int.Parse(offset),int.Parse(limit),int.Parse(siteId));
        }

        public async Task<PostData> GetPostDataById(string postDataId)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            return await provider.GetPostDataById(int.Parse(postDataId));
        }

        public async Task<string> GetPostTypeById(int id)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            return await provider.GetPostTypeById(id);
        }
        #endregion

        #region Template_Crud
        public async Task<int> AddNewTemplate(Template obj, string appPath, int siteId, string userName)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            return await provider.AddNewTemplate(obj, appPath,siteId,userName);
        }

        public async Task DeleteTemplate(int templateID, int siteID,string userName)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            await provider.DeleteTemplate(templateID,siteID,userName);
        }

        public async Task UpdateTemplate(Template obj, string appPath, int siteId, string userName)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            await provider.UpdateTemplate(obj,appPath,siteId,userName);
        }

        public async Task<IList<Template>> GetTemplate()
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            return await provider.GetTemplate();
        }

        public async Task<Template> GetTemplateById(int templateId, int siteId)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            return await provider.GetTemplateById(templateId, siteId);
        }
        
        public async Task<IList<Template>> GetAllPostTemplates(string templateName, int postId,int siteId, string type = null)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            return await provider.GetAllPostTemplates(templateName, postId, siteId, type);
        }

        public async Task<IList<Template>> GetAllPostTemplatesByKey(string postKey, int siteId, string type = null)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            return await provider.GetAllPostTemplatesByKey(postKey, siteId, type);
        }

        public async Task CloneTemplate(int templateID, string addedBy,int siteID,string appPath)
        {
            DynamicComponentDataProvider provider = new DynamicComponentDataProvider();
            await provider.CloneTemplate(templateID, addedBy,siteID, appPath);
        }
        #endregion
    }
}
