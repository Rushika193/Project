using Cbuilder.Core.API.Models;
using Cbuilder.Core.Constants;
using Cbuilder.Core.Controllers;
using Cbuilder.Core.Helper;
using Cbuilder.Core.Helper.Models;
using Cbuilder.ManageMassMail;
using Cbuilder.NewsLetter;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using SQLHelper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cbuilder.Areas.Dashboard.Controllers
{
    [Area("Dashboard")]
    public class MassMailController : AdminController
    {
        private readonly IMemoryCache _memoryCache;
        public MassMailController(IHttpContextAccessor httpContextAccessor, IMemoryCache memoryCache) : base(httpContextAccessor)
        {
            _memoryCache = memoryCache;
        }
        public IActionResult Index()
        {

            AddCSS("EditorCss3", "/EmailTemplate/css/MailTemplate.css");
            AddJS("massmailPagi", "/js/pagination.js");
            AddJS("massmail", "/lib/js/jquery.validate.js");
            AddJS("massmail1", "/lib/js/jquery.datetimepicker.full.js");
            AddJS("massMail2", "/MassMail/MassMail.js");
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> GetAllUsers(string username)
        {
            try
            {
                MassMailHelper objController = new MassMailHelper();
                var lstUser = await objController.GetAllUsers(username);
                return new ObjectResult(lstUser);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> GetMassMailList(int offset, int limit, int filterTypeID, int status, string mailTitle)
        {
            try
            {
                MassMailHelper obj = new MassMailHelper();
                var mailList = await obj.GetMassMailList(offset, limit, filterTypeID, mailTitle, status);
                return new ObjectResult(mailList);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public async Task<IActionResult> GetFilterValue()
        {
            try
            {
                MassMailHelper objController = new MassMailHelper();
                var lstType = await objController.GetFilterValueList(1);
                return new ObjectResult(lstType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddUpdateMassMail(MassMailAddInfo objMassMail)
        {
            try
            {
                MassMailHelper objController = new MassMailHelper();
                var status = await objController.AddUpdateMassMail(objMassMail, GetUsername, HostUrl);
                return new ObjectResult(status);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> DeleteMassMail(string massmailID)
        {
            try
            {
                MassMailHelper objController = new MassMailHelper();
                return await objController.DeleteMassMail(massmailID, GetUsername);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<IActionResult> GetMassMailDetailForEdit(long massmailID)
        {
            try
            {
                MassMailHelper objController = new MassMailHelper();
                var ds = await objController.GetMassMailDetailForEdit(massmailID);
                return new ObjectResult(JsonConvert.SerializeObject(ds, Formatting.Indented));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        // This api is invoked by data i/o to fetch mail
        public async Task<SendsEmail> GetMassMail(string ScheduleDate, string AuthToken)
        {
            try
            {
                SettingHelper settingHelper = new SettingHelper(_memoryCache);
                string configCode = settingHelper.GetCachedSettingValue(SettingKeys.Configurecode);
                if (AuthToken == configCode)
                {
                    MassMailHelper objController = new MassMailHelper();
                    return await objController.GetMailAndUserToSendMail(ScheduleDate);
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> UpdateStausOfFailMail(long MailID, List<RequestSubscriber> Subscribers, string AuthToken)
        {
            try
            {
                SettingHelper settingHelper = new SettingHelper(_memoryCache);
                string configCode = settingHelper.GetCachedSettingValue(SettingKeys.Configurecode);
                if (AuthToken == configCode)
                {
                    MassMailHelper objController = new MassMailHelper();
                    return await objController.UpdateStausOfFailMail(MailID, Subscribers);
                }
                else
                {
                    return -1;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<IList<MassMailInterestInfo>> GetInterest(string Keyword)
        {
            try
            {
                MassMailHelper obj = new MassMailHelper();
                return await obj.GetInterest(Keyword);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<IList<MassMailTimeZoneInfo>> GetAllTimeZone()
        {
            DateTimeController objDateCon = new DateTimeController();
            return await objDateCon.GetAllTimeZone();
        }
        public async Task<MassMailReportInfo> GetReportByID(int MailID)
        {
            try
            {
                MassMailHelper controllerObj = new MassMailHelper();
                return await controllerObj.GetReportByID(MailID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<IList<MassMailDeliverInfo>> GetAudienceReportByID(int MailID, int OffSet, int Limit, int Types)
        {
            try
            {
                MassMailHelper controllerObj = new MassMailHelper();
                return await controllerObj.GetMailReportByID(MailID, OffSet, Limit, Types);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int AddUpdateSettings(List<KeyValue> settings)
        {
            MailSettingController settingController = new MailSettingController();
            int length = settings.Count;
            for (int i = 0; i < length; i++)
            {
                if (settings[i].Key == MailSettingKey.MandrilAPIKey)
                {
                    int strLen = settings[i].Value.Length;
                    if (strLen > 0)
                        settings[i].Value = settings[i].Value.Substring(0, strLen - 2);
                    break;
                }
            }
            settingController.AddUpdateSetting(settings, GetUsername);
            return 1;
        }
        public async Task<IList<MassMailSettingInfo>> GetAllSettings()
        {
            MailSettingController settingController = new MailSettingController();
            return await settingController.GetAllSettings();
        }
        public async Task<string> ReplaceAppsToken(string MailBody)
        {
            try
            {
                MassMailHelper massMailController = new MassMailHelper();
                return await massMailController.ReplaceApplicationMailTokens(MailBody);
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        public async Task<IList<InterestInfo>> GetUserInterest()
        {
            try
            {
                NL_Controller objCon = new NL_Controller();
                return await objCon.GetInterestForCampaign(GetSiteID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IList<AdvanceFilterInfo>> GetAdvanceFilters()
        {
            try
            {
                NL_Controller objCon = new NL_Controller();
                return await objCon.GetAdvanceFilters(GetSiteID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
