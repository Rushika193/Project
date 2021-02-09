using Cbuilder.Core.API.Models;
using Cbuilder.Core.Constants.Enum;
using Cbuilder.Core.Controllers;
using Cbuilder.Core.DynamicPost;
using Cbuilder.Core.Helper.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Authorization;
using Cbuilder.Core;
using Cbuilder.Core.Bundle;

namespace Cbuilder.Areas.Dashboard.Controllers
{
    [Area("Dashboard")]
    public class DynamicPostController : AdminController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public DynamicPostController(IHttpContextAccessor httpContextAccessor, IWebHostEnvironment hostingEnvironment) : base(httpContextAccessor)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        #region Post Type
        [HttpGet]
        public IActionResult Index()
        {            
            AddJS("formbuilder", "/DynamicPost/Assets/formbuilder/form-builder.min.js");
            AddJS("formbuilder_extras", "/DynamicPost/Assets/formbuilder/sageMedia.es5.js");
            AddJS("formbuilder_sageIcon", "/DynamicPost/Assets/formbuilder/sageIcon.es5.js");
            AddJS("formbuilder_richtext", "/DynamicPost/Assets/formbuilder/richtext.es5.js");           
            AddJS("formbuilder_sageVideo", "/DynamicPost/Assets/formbuilder/sageVideo.es5.js");
            AddJS("formbuilder_sageUrl", "/DynamicPost/Assets/formbuilder/sageUrl.es5.js");
            AddJS("formrender", "/DynamicPost/Assets/formbuilder/form-render.min.js");
             AddJS("SageMediaManagement", "/cbuilderassets/js/SageMediaManagement.js");
            AddJS("wbcomponentsample", "/DynamicPost/Assets/webbuilder/list_component.js");
            AddJS("detail_component", "/DynamicPost/Assets/webbuilder/detail_component.js");
            AddJS("handlebars", "/DynamicPost/Assets/handlebars/handlebars.min.js");
            AddJS("list", "/DynamicPost/Assets/handlebars/list.js");
            AddJS("detail", "/DynamicPost/Assets/handlebars/detail.js");
            AddJS("list_basic_setting", "/DynamicPost/Assets/handlebars/list_basic_setting.js");
            AddJS("postType", "/DynamicPost/PostType/js/PostType.js");
            AddJS("handlebars_helpers", "/DynamicPost/Assets/handlebars/helpers.js");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<int> AddNewPost([FromBody] Post obj)
        {
            try
            {
                DynamicComponentController controller = new DynamicComponentController();
                return await controller.AddNewPost(obj, GetSiteID, GetUsername);
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return 0;
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<string> GetFormByPostId([FromBody] Post obj)
        {
            try
            {
                DynamicComponentController controller = new DynamicComponentController();
                return await controller.GetFormByPostId(obj.PostId);
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return string.Empty;
            }

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<int> DeletePost([FromBody] Post obj)
        {
            try
            {
                DynamicComponentController controller = new DynamicComponentController();
                await controller.DeletePost(obj, GetSiteID, GetUsername);
                return 1;
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return 0;
            }

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<int> UpdatePost([FromBody] Post obj)
        {
            try
            {
                DynamicComponentController controller = new DynamicComponentController();
                return await controller.UpdatePost(obj, GetSiteID, GetUsername);
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return 0;
            }

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IList<Post>> GetPost([FromBody] string keyword)
        {
            try
            {
                DynamicComponentController controller = new DynamicComponentController();
                return await controller.GetPost(keyword, GetSiteID);
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return null;
            }

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IList<Post>> GetPostAndId()
        {
            try
            {
                DynamicComponentController controller = new DynamicComponentController();
                return await controller.GetPostAndId();
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return null;
            }


        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<Post> GetPostById([FromBody] int postId)
        {
            try
            {
                DynamicComponentController controller = new DynamicComponentController();
                return await controller.GetPostById(postId, GetSiteID);
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return null;
            }

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<string> GetPostNameByPostId([FromBody] int postId)
        {
            try
            {
                DynamicComponentController controller = new DynamicComponentController();
                return await controller.GetPostNameByPostId(postId);
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return string.Empty;
            }

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<int> PublishPostType([FromBody] Post post)
        {
            try
            {
                DynamicComponentController controller = new DynamicComponentController();
                await controller.PublishPostType(post, GetSiteID, GetUsername);
                return 1;
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return 0;
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<int> ClonePostType([FromBody] int postId)
        {
            try
            {
                DynamicComponentController controller = new DynamicComponentController();
                await controller.ClonePostType(postId, GetSiteID, GetUsername);
                return 1;
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return 0;
            }

        }
        #endregion

        #region Post Template
        [HttpGet]
        public async Task<IActionResult> PostTemplate()
        {
            string id = string.Empty;
            if (QueryParameters != null && QueryParameters.Length > 0)
            {
                id = QueryParameters[0].ToString();
            }
            int postid = 0;
            int.TryParse(id, out postid);
            Post post = null;
            post = await GetPostById(postid);
            if (post != null)
            {
                AddCSS("lightbox", "/DynamicPost/Assets/lightbox/jquery.lightbox-0.5.css");
                AddJS("PostTemplate", "/DynamicPost/PostTemplate/Assets/js/PostTemplate.js");
                AddJS("lightbox", "/DynamicPost/Assets/lightbox/jquery.lightbox-0.5.js");
                return View(post);
            }
            else
            {
                ActionMessage("No post found.", MessageType.Error);
                string redirectURI = nameof(Index);
                return RedirectToAction(redirectURI);
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<int> AddNewTemplate([FromBody]Template obj)
        {
            try
            {
                string appPath = _hostingEnvironment.WebRootPath;
                DynamicComponentController controller = new DynamicComponentController();
                return await controller.AddNewTemplate(obj, appPath, GetSiteID, GetUsername);
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return 0;
            }

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<int> DeleteTemplate([FromBody] int templateID)
        {
            try
            {

                DynamicComponentController controller = new DynamicComponentController();
                await controller.DeleteTemplate(templateID,GetSiteID,GetUsername);
                return 1;
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return 0;
            }

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<int> UpdateTemplate([FromBody]Template obj)
        {
            try
            {
                string appPath = _hostingEnvironment.WebRootPath;
                DynamicComponentController controller = new DynamicComponentController();
                await controller.UpdateTemplate(obj, appPath, GetSiteID, GetUsername);
                return 1;
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return 0;
            }

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IList<Template>> GetTemplate()
        {
            try
            {
                DynamicComponentController controller = new DynamicComponentController();
                return await controller.GetTemplate();
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return null;
            }

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IList<Template>> ListTemplatesByPostId([FromBody]Template template)
        {
            try
            {
                DynamicComponentController controller = new DynamicComponentController();
                return await controller.GetAllPostTemplates(template.TemplateName, template.PostId, GetSiteID,template.Type);
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return null;
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IList<Template>> GetAllPostTemplates(int postId, string type)
        {
            try
            {
                DynamicComponentController controller = new DynamicComponentController();
                return await controller.GetAllPostTemplates(string.Empty, postId, GetSiteID, type);
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return null;
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IList<Template>> GetAllPostTemplatesByKey([FromBody]Template template)
        {
            try
            {
                DynamicComponentController controller = new DynamicComponentController();
                return await controller.GetAllPostTemplatesByKey(template.PostKey, GetSiteID, template.Type);

            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return null;
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<int> CloneTemplate([FromBody]int templateID)
        {
            try
            {
                string appPath = _hostingEnvironment.WebRootPath;
                DynamicComponentController controller = new DynamicComponentController();
                await controller.CloneTemplate(templateID, GetUsername,GetSiteID, appPath);
                return 1;
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return 0;
            }

        }
        #endregion

        #region Post Template Builder
        [HttpGet]
        public async Task<IActionResult> TemplateBuilder()
        {
            string type = string.Empty;
            string id = string.Empty;
            if (QueryParameters != null && QueryParameters.Length > 0)
            {
                type = QueryParameters[0].ToString();
                id = QueryParameters[1].ToString();
            }
            int templateid = 0;
            int.TryParse(id, out templateid);
            Post post = null;           
            if (type != string.Empty && templateid>0)
            {
                TemplatePost templatePost = new TemplatePost();
                DynamicComponentController controller = new DynamicComponentController();
                bool isDevelopmentMode = CurrentHostEnvironment.IsDevelopment;
                templatePost.PostTypeFields= "\"[]\"";
                templatePost.PostTemplateObj = "{}";
                templatePost.TemplateType = type;
                Template postTemplate;
                templatePost.IsEdit = 0;
                //string componentJsPath = _hostingEnvironment.WebRootPath + "/DynamicPost/PostTemplate/Assets/js/component/exec_component.js"; 
                //if (System.IO.File.Exists(componentJsPath))
                //{
                //    System.IO.File.Delete(componentJsPath);
                //}
                //string componentJsPathLive = _hostingEnvironment.WebRootPath + "/DynamicPost/PostTemplate/Assets/js/component/exec_component.live.js";
                //if (!isDevelopmentMode && System.IO.File.Exists(componentJsPathLive))
                //{
                //    System.IO.File.Copy(componentJsPathLive, componentJsPath);
                //}

                if (type == "edit")
                {                    
                    postTemplate =await controller.GetTemplateById(templateid, GetSiteID);
                    
                    if (postTemplate == null || postTemplate.TemplateId == 0)
                    {
                        throw new Exception("Template not found.");
                    }
                    post = await GetPostById(postTemplate.PostId);
                    templatePost.Post = post;
                    templatePost.PostTypeFields = post.Form;
                    templatePost.Template = postTemplate;
                    templatePost.PostTemplateObj = Newtonsoft.Json.JsonConvert.SerializeObject(postTemplate);
                    templatePost.IsEdit = 1;                    
                }
                else if (type == "list" || type == "detail")
                {
                    post =await GetPostById(templateid);
                    templatePost.Post = post;
                    templatePost.PostTypeFields = post.Form;
                    templatePost.Template = new Template();
                    templatePost.Template.TemplateId = templateid;
                    if (type == "detail" && post.HasDetail == false)
                    {
                        throw new Exception(post.Name + " does not have detail.");                        
                    }
                }
                else
                {
                    throw new Exception("Invalid Post Template");
                }
                AddJS(new AssetLocation() { FileName = "webbuilder_overrides", FilePath = "/DynamicPost/PostTemplate/Assets/js/webbuilder_overrides.js", Position = AssetPosition.Header });
                AddJS("handlebars", "/DynamicPost/Assets/handlebars/handlebars.min.js");
                AddJS("templates", "/DynamicPost/PostTemplate/Assets/js/handlebars/templates.js");
                //AddJS("webbuilder_overrides", "/DynamicPost/PostTemplate/Assets/js/webbuilder_overrides.js");
                AddJS("template_builder", "/DynamicPost/PostTemplate/Assets/js/template_builder.js");
                AddJS("TemplateBuilderPlugins", "/DynamicPost/PostTemplate/Assets/js/TemplateBuilderPlugins.js");  
                 AddJS("SageMediaManagement", "/cbuilderassets/js/SageMediaManagement.js");             
                AddJS("html2canvas", "/DynamicPost/PostTemplate/Assets/js/html2canvas.min.js");
                if (isDevelopmentMode)
                {
                    AddJS("component_template", "/DynamicPost/PostTemplate/Assets/js/component_template.js");
                }
                else
                {
                    AddJS("component_template", "/DynamicPost/PostTemplate/Assets/js/component_template.live.js");
                }
                return View(templatePost);
            }
            else
            {
                ActionMessage("No post found.", MessageType.Error);
                string redirectURI = nameof(PostTemplate);
                return RedirectToAction(redirectURI);
            }
        }
        #endregion

        #region Post Data

        [HttpGet]
        public async Task<IActionResult> PostData()
        {
            string id = string.Empty;
            if (QueryParameters != null && QueryParameters.Length > 0)
            {                
                id = QueryParameters[0].ToString();
            }
            int ptid = 0;
            int.TryParse(id,out ptid);
            Post post=null;
            DynamicComponentController controller = new DynamicComponentController();
            if (ptid > 0)
            {               
                post =await controller.GetPostById(ptid, GetSiteID);
            }
            else
            {
                post =await controller.GetPostByPostKey(id, GetSiteID);
            }
            if (post == null)
            {
                throw new Exception("No Post found");
            }
            else
            {
                AddJS("postData", "/DynamicPost/PostData/js/PostData.js");
                AddJS("FBUserData", "/DynamicPost/PostData/js/FBUserData.js");
                AddJS("formbuilder", "/DynamicPost/Assets/formbuilder/form-builder.min.js");
                AddJS("formbuilder_extras", "/DynamicPost/Assets/formbuilder/sageMedia.es5.js");
                AddJS("formbuilder_sageIcon", "/DynamicPost/Assets/formbuilder/sageIcon.es5.js");
                AddJS("formbuilder_richtext", "/DynamicPost/Assets/formbuilder/richtext.es5.js");                
                AddJS("formbuilder_sageVideo", "/DynamicPost/Assets/formbuilder/sageVideo.es5.js");
                AddJS("formbuilder_sageUrl", "/DynamicPost/Assets/formbuilder/sageUrl.es5.js");
                AddJS("formrender", "/DynamicPost/Assets/formbuilder/form-render.min.js");
                AddJS("SageMediaManagement", "/cbuilderassets/js/SageMediaManagement.js");
               
                return View(post);
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<int> AddNewPostData([FromBody]PostData obj)
        {
            try
            {
                DynamicComponentController controller = new DynamicComponentController();               
                await controller.AddNewPostData(obj,GetSiteID,GetUsername);
                return 1;
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return 0;
            }

        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<int> ClonePostData([FromBody]int postDataId)
        {
            try
            {
                DynamicComponentController controller = new DynamicComponentController();
                await controller.ClonePostData(postDataId, GetSiteID, GetUsername);
                return 1;
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return 0;
            }

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<int> UpdatePostDataOrder([FromBody]string order)
        {
            try
            {

                DynamicComponentController controller = new DynamicComponentController();
                await controller.UpdatePostDataOrder(order);
                return 1;
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return 0;
            }

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<int> DeletePostData([FromBody]int postDataId)
        {
            try
            {
                DynamicComponentController controller = new DynamicComponentController();                
                await controller.DeletePostData(postDataId,GetSiteID,GetUsername);
                return 1;
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return 0;
            }

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<int> UpdatePostData([FromBody]PostData obj)
        {
            try
            {

                DynamicComponentController controller = new DynamicComponentController();               
                await controller.UpdatePostData(obj,GetSiteID,GetUsername);
                return 1;
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return 0;
            }

        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IList<PostData>> GetPostDataByPostId([FromBody]PostData obj)
        {
            try
            {
                DynamicComponentController controller = new DynamicComponentController();
                return await controller.GetPostDataByPostId(obj.PostId, obj.offset, obj.limit, GetSiteID);
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return null;
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [AllowAnonymous]
        public async Task<IList<PostData>> GetPostDataByKey([FromBody] PostData data)
        {
            try
            {                
                DynamicComponentController controller = new DynamicComponentController();
                return await controller.GetPostDataByKey(data.PostKey, data.offset.ToString(), data.limit.ToString(), GetSiteID.ToString());
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return null;
            }

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<string> GetPostTypeById([FromBody]int id)
        {
            try
            {
                DynamicComponentController controller = new DynamicComponentController();
                return await controller.GetPostTypeById(id);
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return string.Empty;
            }

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<PostData> GetPostDataById([FromBody]string postDataId)
        {
            try
            {
                DynamicComponentController controller = new DynamicComponentController();
                return await controller.GetPostDataById(postDataId);
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return null;
            }
        }
        #endregion
    }
}
