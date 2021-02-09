using Cbuilder.Core.Controllers;
using Cbuilder.Core.Helper.Security;
using Cbuilder.EmailTemplate;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Cbuilder.Areas.Dashboard.Controllers
{

    [Area("Dashboard")]
    public class EmailTemplateController : AdminController
    {
        private readonly IEmailTemplateManager _tempMgr;
        public EmailTemplateController(IHttpContextAccessor httpContextAccessor, IEmailTemplateManager templateManager) : base(httpContextAccessor)
        {
            _tempMgr = templateManager;
        }
        public async Task<IActionResult> Index()
        {
            ViewBag.path = Encryption.EncryptString("MediaThumb");

            AddCSS("EditorCss3", "/EmailTemplate/css/MailTemplate.css");
            AddJS("EditorJs1", "/js/uploadFile.js");
            AddJS("EditorJs2", "/lib/js/jquery.pagination.js");
            AddJS("EditorValid", "/lib/js/jquery.validate.js");
            AddJS("EditorJs", "/EmailTemplate/TemplateManagement.js");
            EmailTemplateLabel _localLabel = await Localize<EmailTemplateLabel>(Path.Combine("Localization", "massmail", "emailtemplate"));
            ViewBag.LocalLabel = _localLabel;
            //ViewBag.CultureCode = new SelectList(await _common.GetAllCulture(), null, "Language", "CultureCode");
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> GetAllTemplate([FromBody] GetDataDTO dto)
        {
            try
            {
                var res = await _tempMgr.GetAllTemplate(dto.offset, dto.limit, GetSiteID, dto.keywords, dto.category, false);
                return new ObjectResult(res);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        [HttpPost]
        public async Task<IActionResult> GetTemplateByID(int TemplateID)
        {
            try
            {
                var res = await _tempMgr.GetTemplateByID(TemplateID, GetSiteID);
                return new ObjectResult(res);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> RemoveTemplateByID(int TemplateID)
        {
            try
            {
                var res = await _tempMgr.RemoveTemplateByID(TemplateID, GetUsername, GetSiteID);
                return new ObjectResult(res);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> RemoveCategoryByID(int CategoryID)
        {
            try
            {
                var res = await _tempMgr.RemoveCategory(CategoryID, GetUsername, GetSiteID);
                return new ObjectResult(res);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddUpdateTemplate(EmailTemplate.EmailTemplate temp)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    temp.CultureCode = GetCurrentCulture;
                    var res = await _tempMgr.AddUpdateTemplate(temp, GetSiteID, GetUsername);
                    return new ObjectResult(res);
                }
                return new ObjectResult("Some field are missing");
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        [HttpPost]
        public async Task<IActionResult> GetAllCategory([FromBody] GetDataDTO dto)
        {
            try
            {
                var res = await _tempMgr.GetCategoryList(dto.offset, dto.limit, GetSiteID);
                return new ObjectResult(res);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddUpdateCategory(int id, string name)
        {
            try
            {
                var res = await _tempMgr.AddUpdateCategory(new EmailTemplateCategory { CategoryID = id, CategoryName = name }, GetSiteID, GetUsername);
                return new ObjectResult(res);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
