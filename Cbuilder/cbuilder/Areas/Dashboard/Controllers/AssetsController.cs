using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cbuilder.Core.Controllers;
using Cbuilder.Assets;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Cbuilder.Core.Bundle;
using Microsoft.AspNetCore.Hosting;
using Cbuilder.Core.Models;
using System.IO;
using Cbuilder.Core.Role;

namespace Cbuilder.Areas.Dashboard.Controllers
{
    [Area("Dashboard")]


    public class AssetsController : AdminController
    {
        readonly IWebHostEnvironment _hostingEnvironment;
        private string LocalizePath = Path.Combine("Localization", "assets", "asset");
        private string AreaLocalizePath = Path.Combine("Localization", "assets", "userArea");

        public AssetsController(IHttpContextAccessor httpContextAccessor, IWebHostEnvironment hostingEnvironment) : base(httpContextAccessor)
        {
            _hostingEnvironment = hostingEnvironment;
        }


        [HttpGet]
        public async Task<ActionResult> Index()
        {

            AddJS("Asset", "/admin/js/assets.js");
            ApplicationManager appManager = new ApplicationManager();
            IList<ApplicationNameInfo> lstApplications = await appManager.GetApplicationNames();
            AssetLabel _localLabel = await Localize<AssetLabel>(LocalizePath);
            ViewBag.LocalLabel = _localLabel;


            RoleManager roleManager = new RoleManager();
            IEnumerable<RoleViewModel> lstRoles = await roleManager.GetAllRoleView();
            ViewBag.RoleList = lstRoles;

            return View(lstApplications);
        }


        [HttpGet]
        public async Task<ActionResult> UserArea()
        {
            AddJS("Area", "/admin/js/userarea.js");
            AddJS("UIComponent", "/admin/js/UIComponents.js");

            AreaLabel _localLabel = await Localize<AreaLabel>(AreaLocalizePath);
            ViewBag.AreaLocalLabel = _localLabel;


            return View("UserArea");
        }

        [HttpGet]
        public async Task<JsonResult> GetAreaList()
        {
            AssestController controller = new AssestController();
            IList<UserAreaModel> userAreas = await controller.GetUserAreas();

            return Json(userAreas);
        }

        [HttpPost]
        public async Task<JsonResult> SaveUserArea([FromBody]UserAreaModel objUserArea)
        {
            AssestController controller = new AssestController();
            int result = await controller.SaveUserArea(objUserArea);
            return Json(result);

        }

        [HttpGet]
        public async Task DeleteUserArea(int AreaID)
        {
            AssestController controller = new AssestController();
            await controller.DeleteUserArea(AreaID);
        }


        [HttpGet]
        public async Task<List<AssetSettingsViewModel>> GetAreaWiseAssets(int applicationID, string assetType, string excessMode)
        {
            AssestController controller = new AssestController();
            return await controller.GetAssetSettings(applicationID, assetType, excessMode);

        }


        [HttpGet]
        public async Task<IList<AssetViewSettings>> GetAssetSettingsByArea(int applicationID, int areaID, string assetType, string excessMode)
        {
            AssestController controller = new AssestController();
            return await controller.GetAssetSettingsByArea(applicationID, areaID, assetType, excessMode);
        }


        [HttpGet]
        public async Task<SaveAssetInfo> GetAssetSettingByID(int bundleAssetID)
        {
            AssestController controller = new AssestController();
            return await controller.GetAssetSettingByID(bundleAssetID);

        }

        [HttpGet]
        public async Task<int> DeleteAsset(int AssetID)
        {
            AssestController controller = new AssestController();
            return await controller.DeleteAsset(AssetID);

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<int> SaveAssetSettings([FromBody]SaveAssetInfo asset)
        {

            AssestController controller = new AssestController();
            return await controller.SaveAssetSettings(asset);
        }



        [HttpPost]
        public async Task<int> SaveAssetsOrder([FromBody]AssetsOrderSaveInfo saveInfo)
        {
            AssestController controller = new AssestController();
            return await controller.SaveAssetsOrder(saveInfo.OrderList, saveInfo.AreaID);

        }

        [HttpGet]
        public async Task<int> CloneAssets(int sourceApplicationID, int destinationApplicationID, int areaID)
        {
            AssestController controller = new AssestController();
            return await controller.CloneAssets(sourceApplicationID, destinationApplicationID, areaID);
        }

        [HttpGet]
        [ValidateAntiForgeryToken]
        public List<string> GetLocalAssets()
        {
            AssestController controller = new AssestController();
            return controller.GetLocalAssetFiles(_hostingEnvironment.WebRootPath);
        }


    }
}
