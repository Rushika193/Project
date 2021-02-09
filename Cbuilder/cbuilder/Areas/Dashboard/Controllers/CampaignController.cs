using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Cbuilder.Core.Constants.Enum;
using Cbuilder.Core.Controllers;
using Cbuilder.Core.Permissions;
using CBuilder.SocialCampaign;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Microsoft.Extensions.Hosting;

namespace Cbuilder.Areas.Dashboard.Controllers
{
    [Area("Dashboard")]
    public class CampaignController : AdminController
    {
        private string LocalizePath = Path.Combine("Localization", "campaign", "campaign");
        IPermission _permission;
        public CampaignController(IPermission permission, IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
            _permission = permission;
        }
        public async Task<IActionResult> Index()
        {
            try
            {
                List<ElementPermission> requiredPermission = new List<ElementPermission>()
                {
                    //new ElementPermission(nameof(AddUpdateSupplier)),
                    //new ElementPermission(nameof(DeleteSupplier))
                };
                _permission.HasElementPermission(requiredPermission, UsersRoles);

                AddJS("Pagination", "/lib/js/jquery.pagination.js");
                AddJS("campaignjs", "/campaign/js/socialcampaign.js");
                AddCSS("campaigncss", "/campaign/css/common.css");
                await CheckCampaignSubscription();
                ViewBag.LocalLabel = await LocalizeJson(LocalizePath);
                return View();
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return new ObjectResult(null);
            }

        }

        private async Task CheckCampaignSubscription()
        {
            CampaignDataController objController = new CampaignDataController();
            CampaignSetting campaignSetting = await objController.GetCampaignSetting();

            if (!campaignSetting.IsSubscribed)
            {
                CampaignDataController controller = new CampaignDataController();
                await controller.SubscribeService(HostUrl, GetUsername);
            }

        }

        [HttpPost]
        public async Task<IActionResult> GetCampaignList(int offset, int limit, string searchText, int campaignType, int statusID)
        {
            try
            {
                if (string.IsNullOrEmpty(searchText)) searchText = "";
                CampaignDataController controller = new CampaignDataController();
                var res = await controller.GetCampaignList(offset, limit, campaignType, statusID, searchText);
                return new ObjectResult(res);
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return new ObjectResult(null);
            }
        }

        [HttpGet]
        public async Task<IActionResult> ManageAccounts()
        {
            try
            {
                List<ElementPermission> requiredPermission = new List<ElementPermission>()
                {
                    //new ElementPermission(nameof(AddUpdateSupplier)),
                    //new ElementPermission(nameof(DeleteSupplier))
                };
                _permission.HasElementPermission(requiredPermission, UsersRoles);

                AddJS("campaignjs", "/campaign/js/manageaccounts.js");
                AddCSS("campaigncss", "/campaign/css/common.css");

                string manageAccountsLocalizePath = Path.Combine("Localization", "campaign", "manageaccount");

                ViewBag.LocalLabel = await LocalizeJson(manageAccountsLocalizePath);
                return View();
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return new ObjectResult(null);
            }
        }

        [HttpPost]
        public async Task<IActionResult> GetCampaignApps()
        {
            try
            {
                CampaignDataController controller = new CampaignDataController();
                var res = await controller.GetCampaignApps();
                return new ObjectResult(res);
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return new ObjectResult(null);
            }
        }

        [HttpPost]
        public async Task<IActionResult> LinkAccount(string type, string redirectUrl)
        {
            try
            {

                CampaignDataController controller = new CampaignDataController();
                var res = await controller.LinkAccount(type, redirectUrl);
                KeyValuePair<string, object> result = new KeyValuePair<string, object>("Result", res);
                return new ObjectResult(result);

            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return new ObjectResult(null);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            try
            {
                AddJS("SageMedia", "/cbuilderassets/js/SageMediaManagement.js");
                AddJS("DatePickerJs", "/lib/js/jquery.datetimepicker.full.js");
                AddJS("campaignjs", "/campaign/js/createcampaign.js");
                AddJS("Validation", "/lib/js/jquery.validate.js");
                AddCSS("datepickercss", "/lib/css/jquery.datetimepicker.css");
                AddCSS("campaigncss", "/campaign/css/common.css");
                string campaignID = new Guid().ToString();
                if (QueryParameters != null && QueryParameters.Length > 0)
                    campaignID = QueryParameters[0].ToString();

                ViewBag.CampaignID = campaignID;

                ViewBag.CurrentStep = 0;

                string manageAccountsLocalizePath = Path.Combine("Localization", "campaign", "createcampaign");

                ViewBag.LocalLabel = await LocalizeJson(manageAccountsLocalizePath);
                return View();
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return new ObjectResult(null);
            }
        }

        [HttpPost]
        public async Task<IActionResult> GetCampaignStatus(string campaignID)
        {
            try
            {
                CampaignDataController controller = new CampaignDataController();
                var res = await controller.GetCampaignStatus(campaignID);
                KeyValuePair<string, object> result = new KeyValuePair<string, object>("Result", res);
                return new ObjectResult(result);

            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return new ObjectResult(null);
            }
        }

        [HttpPost]
        public async Task<IActionResult> GetCampaignSummary(string campaignID)
        {
            try
            {
                CampaignDataController controller = new CampaignDataController();
                var res = await controller.GetCampaignSummary(campaignID);
                KeyValuePair<string, object> result = new KeyValuePair<string, object>("Result", res);
                return new ObjectResult(result);

            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return new ObjectResult(null);
            }
        }

        [HttpPost]
        public async Task<IActionResult> GetCampaignPostDetail(string campaignID)
        {
            try
            {
                CampaignDataController controller = new CampaignDataController();
                var res = await controller.GetCampaignPostDetail(campaignID);
                return new ObjectResult(res);

            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return new ObjectResult(null);
            }
        }

        [HttpPost]
        public async Task<IActionResult> GetCampaignTypes(string searchText)
        {
            try
            {
                if (string.IsNullOrEmpty(searchText)) searchText = "";
                CampaignDataController controller = new CampaignDataController();
                var res = await controller.GetCampaignType(searchText);
                return new ObjectResult(res);

            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return new ObjectResult(null);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CampaignAdd([FromBody] CampaignInfo campaignInfo)
        {
            try
            {
                CampaignDataController controller = new CampaignDataController();
                var res = await controller.CampaignAdd(campaignInfo);
                return new ObjectResult(res);

            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return new ObjectResult(null);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CampaignAddPost([FromBody] CampaignPostInfo campaignInfo)
        {
            try
            {
                CampaignDataController controller = new CampaignDataController();
                var res = await controller.CampaignAddPost(campaignInfo);
                KeyValuePair<string, object> result = new KeyValuePair<string, object>("Result", res);
                return new ObjectResult(result);

            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return new ObjectResult(null);
            }
        }

        [HttpPost]
        public async Task<IActionResult> GetCampaignPostList(string campaignID)
        {
            try
            {
                CampaignDataController controller = new CampaignDataController();
                var res = await controller.GetCampaignPostList(campaignID);
                return new ObjectResult(res);

            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return new ObjectResult(null);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CampaignPostSave([FromBody] CampaignPostDTO campaignInfo)
        {
            try
            {
                CampaignDataController controller = new CampaignDataController();
                var res = await controller.CampaignPostSave(campaignInfo);
                KeyValuePair<string, object> result = new KeyValuePair<string, object>("Result", res);
                return new ObjectResult(result);

            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return new ObjectResult(null);
            }
        }

        [HttpPost]
        public async Task<IActionResult> ProcessCampaignPost(string campaignID)
        {
            try
            {
                CampaignDataController controller = new CampaignDataController();
                var res = await controller.ProcessCampaignPost(campaignID);
                KeyValuePair<string, object> result = new KeyValuePair<string, object>("Result", res);
                return new ObjectResult(result);

            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return new ObjectResult(null);
            }
        }

        [HttpPost]
        public async Task<IActionResult> ScheduleCampaign(string campaignid, bool publish, string scheduleOn)
        {
            try
            {
                if (string.IsNullOrEmpty(scheduleOn)) scheduleOn = string.Empty;
                CampaignDataController controller = new CampaignDataController();
                var res = await controller.ScheduleCampaign(campaignid, publish, scheduleOn);
                KeyValuePair<string, object> result = new KeyValuePair<string, object>("Result", res);
                return new ObjectResult(result);

            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return new ObjectResult(null);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddDuplicateCampaign(string campaignid)
        {
            try
            {
                CampaignDataController controller = new CampaignDataController();
                var res = await controller.AddDuplicateCampaign(campaignid);
                KeyValuePair<string, object> result = new KeyValuePair<string, object>("Result", res);
                return new ObjectResult(result);

            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return new ObjectResult(null);
            }
        }

        [HttpPost]
        public async Task<IActionResult> GetCampaignDetail(string campaignid)
        {
            try
            {
                CampaignDataController controller = new CampaignDataController();
                var res = await controller.GetCampaignDetail(campaignid);
                KeyValuePair<string, object> result = new KeyValuePair<string, object>("Result", res);
                return new ObjectResult(result);

            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return new ObjectResult(null);
            }
        }

        [HttpPost]
        public async Task<IActionResult> DeleteCampaign(string campaignid)
        {
            try
            {
                CampaignDataController controller = new CampaignDataController();
                var res = await controller.DeleteCampaign(campaignid);
                KeyValuePair<string, object> result = new KeyValuePair<string, object>("Result", res);
                return new ObjectResult(result);

            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return new ObjectResult(null);
            }
        }
    }
}
