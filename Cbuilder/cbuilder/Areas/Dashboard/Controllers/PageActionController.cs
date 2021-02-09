using Cbuilder.Core.API.Models;
using Cbuilder.Core.Constants.Enum;
using Cbuilder.Core.Controllers;
using Cbuilder.Core.PageAction;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Cbuilder.Areas.Dashboard.Controllers
{
    [Area("Dashboard")]
    public class PageActionController : AdminController
    {
        private string LocalizePath = Path.Combine("Localization", "pageaction", "pageaction");
        public PageActionController(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {

        }

        [HttpGet]
        public async Task<IActionResult> Index(string areaName = "", string keyword = "", int offset = 0, int limit = 10)
        {
            if (areaName == null)
                areaName = string.Empty;
            if (keyword == null)
                keyword = string.Empty;


            AddJS("Pagination", "/js/pagination.js");
            ViewBag.AreaList = await GetAreaList();
            PageActionManager pageAction = new PageActionManager();
            IList<PageController> pageList = await pageAction.GetPageController(areaName, keyword, offset, limit);
            ViewBag.LocalizeLabel = await LocalizeJson(LocalizePath);
            ViewData["Keyword"] = keyword;
            ViewData["AreaName"] = areaName;
            return View(pageList);
        }

        [HttpGet]
        public async Task<IActionResult> PageArea()
        {

            PageActionManager pageAction = new PageActionManager();
            IList<PageArea> pageArea = await pageAction.GetAllArea();
            return View(pageArea);
        }

        [HttpGet]
        public async Task<ActionResult> Create()
        {
            ViewData["ActionType"] = "Create";
            ViewBag.AreaList = await GetAreaList();
            ViewBag.ControllerType = await GetControllerType();
            return View();
        }

        [HttpGet]
        public async Task<ActionResult> AutomateActions()
        {
            string redirectURI = nameof(Index);
            try
            {
                PageActionManager pageAction = new PageActionManager();
                List<ControllerActions> refectiionActions = GetReflectionActions();
                foreach (ControllerActions controllerAction in refectiionActions)
                {
                    await pageAction.AutomateActions(controllerAction, GetUsername);
                }
                ActionMessage("Added Succesfully", MessageType.Success);

            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
            }
            return RedirectToAction(redirectURI);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(PageController pageController)
        {
            try
            {
                string redirectURI = "Create";
                if (ModelState.IsValid)
                {
                    if (pageController.AreaName == null)
                        pageController.AreaName = string.Empty;
                    PageActionManager pageAction = new PageActionManager();
                    OperationStatus response = await pageAction.AddUpdatePageController(pageController, GetUsername);
                    if (Convert.ToBoolean(response.StatusCode))
                    {
                        ActionMessage(response.Message, MessageType.Success);
                        redirectURI = nameof(Index);
                        return RedirectToAction(redirectURI);
                    }
                    else
                    {
                        ActionMessage(response.Message, MessageType.Error);
                        return View("Create", pageController);
                    }
                }
                else
                {
                    ActionMessage("All the fields are required!", MessageType.Error);
                    return View("Create", pageController);
                }
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return View("Create");
            }
        }

        [HttpGet]
        public async Task<ActionResult> Edit(string id)
        {
            ViewData["ActionType"] = "Update";
            ViewBag.AreaList = await GetAreaList();
            ViewBag.ControllerType = await GetControllerType();

            PageActionManager pageAction = new PageActionManager();
            PageController pageAreaObj = await pageAction.GetPageControllerByID(id);
            return View("Create", pageAreaObj);
        }

        [HttpGet]
        public async Task<ActionResult> GetRefractionPages(string areaName = "", bool isEdit = false)
        {
            if (areaName == null)
                areaName = string.Empty;

            List<SelectListItem> lst = new List<SelectListItem>();
            if (isEdit)
            {
                lst = await GetPageControllerList(areaName);
            }
            else
            {

                List<ControllerActions> areaPageLists = GetReflectionActions();
                List<ControllerActions> areaList = areaPageLists.Where(x => x.Area == areaName).ToList();
                List<string> pageList = areaList.Select(x => x.Controller).Distinct().ToList();
                foreach (string page in pageList)
                {
                    lst.Add(new SelectListItem(page, page));
                }
                List<SelectListItem> pageListFromDB = await GetPageControllerList(areaName);
                lst = lst.Where(p => !pageListFromDB.Any(p2 => p2.Value == p.Value)).ToList();
            }
            return Json(lst);
        }

        [HttpGet]
        public async Task<ActionResult> GetRefractionPageAction(string areaName = "", string pageName = "", bool isEdit = false)
        {
            if (areaName == null)
                areaName = string.Empty;

            if (pageName == null)
                pageName = string.Empty;

            List<SelectListItem> lst = new List<SelectListItem>();
            if (isEdit)
            {
                lst = await GetPageActionList(areaName, pageName);
            }
            else
            {
                List<ControllerActions> areaPageLists = GetReflectionActions();
                List<ControllerActions> actionList = areaPageLists.Where(x => x.Area == areaName && x.Controller == pageName).ToList();
                List<string> pageList = actionList.Select(x => x.Action).Distinct().ToList();
                foreach (string page in pageList)
                {
                    lst.Add(new SelectListItem(page, page));
                }
                List<SelectListItem> actionFromDB = await GetPageActionList(areaName, pageName);
                lst = lst.Where(p => !actionFromDB.Any(p2 => p2.Value == p.Value)).ToList();
            }
            return Json(lst);
        }

        [HttpGet]
        public async Task<ActionResult> CreateArea()
        {

            List<SelectListItem> lst = new List<SelectListItem>();
            List<ControllerActions> areaPageLists = GetReflectionActions();
            List<string> areaList = areaPageLists.Select(x => x.Area).Distinct().ToList();
            List<SelectListItem> areaListFromDB = await GetAreaList();
            areaList = areaList.Where(p => !areaListFromDB.Any(p2 => p2.Value == p)).ToList();
            foreach (string area in areaList)
            {
                if (area != string.Empty)
                    lst.Add(new SelectListItem(area, area));
            }
            ViewBag.AreaList = lst;
            ViewData["ActionType"] = "Create";
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> CreateArea(PageArea pageArea)
        {
            try
            {
                string redirectURI = "CreateArea";
                if (ModelState.IsValid)
                {
                    PageActionManager pageAction = new PageActionManager();
                    OperationStatus response = await pageAction.AddUpdatePageArea(pageArea, GetUsername);
                    if (Convert.ToBoolean(response.StatusCode))
                    {
                        ActionMessage(response.Message, MessageType.Success);
                        redirectURI = nameof(PageArea);
                        return RedirectToAction(redirectURI);
                    }
                    else
                    {
                        ActionMessage(response.Message, MessageType.Error);
                        return View("CreateArea", pageArea);
                    }
                }
                else
                {
                    ActionMessage("All the fields are required!", MessageType.Error);
                    return View("CreateArea", pageArea);
                }
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return View("CreateArea", pageArea);
            }
        }

        [HttpGet]
        public async Task<ActionResult> EditArea(string id)
        {
            ViewData["ActionType"] = "Update";
            if (!string.IsNullOrEmpty(id))
            {
                List<SelectListItem> lst = new List<SelectListItem>();
                PageActionManager pageAction = new PageActionManager();
                IList<PageArea> pageArea = await pageAction.GetAllArea();
                foreach (PageArea area in pageArea)
                {
                    lst.Add(new SelectListItem(area.AreaName, area.AreaName));
                }
                ViewBag.AreaList = lst;
                PageArea pageAreaObj = await pageAction.GetPageAreaByID(id);
                return View("CreateArea", pageAreaObj);
            }
            else
            {
                return View(nameof(PageArea));
            }
        }

        [HttpGet]
        public async Task<IActionResult> ManageAction(string areaName = "", string pageName = "", string keyword = "", int offset = 0, int limit = 10)
        {
            if (areaName == null)
                areaName = string.Empty;
            if (pageName == null)
                pageName = string.Empty;
            if (keyword == null)
                keyword = string.Empty;
            AddJS("Pagination", "/js/pagination.js");
            List<SelectListItem> lst = new List<SelectListItem>();
            PageActionManager pageAction = new PageActionManager();
            IList<PageArea> pageArea = await pageAction.GetAllArea();
            foreach (PageArea area in pageArea)
            {
                lst.Add(new SelectListItem(area.AreaName, area.AreaName));
            }
            ViewBag.AreaList = lst;


            IList<PageAction> pageList = await pageAction.GetPageActions(areaName, pageName, keyword, offset, limit);
            ViewData["Keyword"] = keyword;
            ViewData["AreaName"] = areaName;
            ViewData["PageName"] = pageName;
            return View(pageList);
        }

        [HttpGet]
        public async Task<ActionResult> CreateAction()
        {
            ViewData["ActionType"] = "Create";
            ViewBag.AreaList = await GetAreaList();
            ViewBag.ActionList = await GetActionGroup();
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> CreateAction(PageAction pageAction)
        {
            try
            {
                string redirectURI = "CreateAction";
                if (ModelState.IsValid)
                {
                    if (pageAction.AreaName == null)
                        pageAction.AreaName = string.Empty;
                    PageActionManager pageActionMage = new PageActionManager();
                    OperationStatus response = await pageActionMage.AddUpdatePageAction(pageAction, GetUsername);
                    if (Convert.ToBoolean(response.StatusCode))
                    {
                        ActionMessage(response.Message, MessageType.Success);
                        redirectURI = nameof(ManageAction);
                        return RedirectToAction(redirectURI);
                    }
                    else
                    {
                        ActionMessage(response.Message, MessageType.Error);
                        return View("CreateAction", pageAction);
                    }
                }
                else
                {
                    ActionMessage("All the fields are required!", MessageType.Error);
                    return View("CreateAction", pageAction);
                }
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
                return View("CreateAction");
            }
        }

        [HttpGet]
        public async Task<ActionResult> EditAction(string id)
        {
            ViewData["ActionType"] = "Update";
            ViewBag.AreaList = await GetAreaList();
            ViewBag.ActionList = await GetActionGroup();
            PageActionManager pageAction = new PageActionManager();
            PageAction pageAreaObj = await pageAction.GetPageActionByID(id);
            return View("CreateAction", pageAreaObj);
        }

        [HttpGet]
        public async Task<ActionResult> DeleteAction(string id)
        {
            string redirectURI = nameof(ManageAction);
            try
            {

                PageActionManager pageAction = new PageActionManager();
                OperationStatus response = await pageAction.DeleteAction(id, GetUsername);
                if (Convert.ToBoolean(response.StatusCode))
                {
                    ActionMessage(response.Message, MessageType.Success);
                }
                else
                {
                    ActionMessage(response.Message, MessageType.Error);
                }
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
            }
            return RedirectToAction(redirectURI);
        }

        [HttpGet]
        public async Task<ActionResult> Delete(string id)
        {
            string redirectURI = nameof(Index);
            try
            {

                PageActionManager pageAction = new PageActionManager();
                OperationStatus response = await pageAction.DeletePage(id, GetUsername);
                if (Convert.ToBoolean(response.StatusCode))
                {
                    ActionMessage(response.Message, MessageType.Success);
                }
                else
                {
                    ActionMessage(response.Message, MessageType.Error);
                }
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
            }
            return RedirectToAction(redirectURI);
        }

        [HttpGet]
        public async Task<ActionResult> DeleteArea(string id)
        {
            string redirectURI = nameof(PageArea);
            try
            {

                PageActionManager pageAction = new PageActionManager();
                OperationStatus response = await pageAction.DeleteArea(id, GetUsername);
                if (Convert.ToBoolean(response.StatusCode))
                {
                    ActionMessage(response.Message, MessageType.Success);
                }
                else
                {
                    ActionMessage(response.Message, MessageType.Error);
                }
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
            }
            return RedirectToAction(redirectURI);
        }

        [HttpGet]
        public async Task<ActionResult> ManageService(string id)
        {
            AddJS("ManageService", "/admin/js/PageAction/ManageService.js");

            ServiceActionBind serviceActionBind = new ServiceActionBind();
            PageActionManager pageAction = new PageActionManager();
            PageAction pageAreaObj = await pageAction.GetPageActionByID(id);
            IList<ServiceAction> serviceActions = await pageAction.GetAllServiceActions();
            serviceActionBind.PageAction = pageAreaObj;
            serviceActionBind.ServiceActionList = serviceActions;
            return View(serviceActionBind);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ManageService(ServiceActionBind serviceActionBind)
        {
            string redirectURI = "ManageService";
            try
            {
                PageActionManager pageActionMage = new PageActionManager();
                OperationStatus response = await pageActionMage.ManageService(serviceActionBind, GetUsername);
                if (Convert.ToBoolean(response.StatusCode))
                {
                    ActionMessage(response.Message, MessageType.Success);
                }
                else
                {
                    ActionMessage(response.Message, MessageType.Error);

                }
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
            }
            redirectURI = nameof(ManageAction);
            return RedirectToAction(redirectURI);
        }


        [HttpGet]
        public async Task<ActionResult> ManageIdentity(string id)
        {
            AddJS("ManageIdentity", "/admin/js/PageAction/ManageIdentity.js");

            IdentiyActionBind identiyActionBind = new IdentiyActionBind();
            PageActionManager pageAction = new PageActionManager();
            PageAction pageAreaObj = await pageAction.GetPageActionByID(id);
            IList<IdentityAction> identityActions = await pageAction.GetAllIdentityActions();
            identiyActionBind.PageAction = pageAreaObj;
            identiyActionBind.IdentiyActionList = identityActions;
            return View(identiyActionBind);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ManageIdentity(IdentiyActionBind identiyActionBind)
        {
            string redirectURI = "ManageAction";
            try
            {
                PageActionManager pageActionMage = new PageActionManager();
                OperationStatus response = await pageActionMage.ManageIdentity(identiyActionBind, GetUsername);
                if (Convert.ToBoolean(response.StatusCode))
                {
                    ActionMessage(response.Message, MessageType.Success);
                }
                else
                {
                    ActionMessage(response.Message, MessageType.Error);

                }
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                ActionMessage(ex.Message, MessageType.Error);
            }
            redirectURI = nameof(ManageAction);
            return RedirectToAction(redirectURI);
        }

        private List<ControllerActions> GetReflectionActions()
        {
            Assembly[] assemblies = AppDomain.CurrentDomain.GetAssemblies();
            List<Assembly> myAssemblies = new List<Assembly>();

            foreach (Assembly assembly in assemblies)
            {
                if (assembly.GetTypes().Any(type => type.IsSubclassOf(typeof(CommonController))))
                {
                    myAssemblies.Add(assembly);
                }
            }
            var list = new List<ControllerActions>();
            foreach (Assembly asm in myAssemblies)
            {
                //  Assembly asm = Assembly.GetExecutingAssembly();

                var controlleractionlist = asm.GetTypes()
            .Where(type => typeof(ControllerBase).IsAssignableFrom(type))
            .SelectMany(type => type.GetMethods(BindingFlags.Instance | BindingFlags.DeclaredOnly | BindingFlags.Public))
            .Where(method => method.IsPublic && !method.IsDefined(typeof(NonActionAttribute)))
            .Select(x =>
            new
            {
                Controller = x.DeclaringType.Name.Replace("Controller", ""),
                Action = x.Name,
                ReturnType = x.ReturnType.Name,
                Area = x.DeclaringType.CustomAttributes.Where(c => c.AttributeType == typeof(AreaAttribute))
                //,
                //Attributes =  x.GetCustomAttributes<ServicePermission>().Select(t=>t.Service).ToArray()
            }).ToList();

                foreach (var item in controlleractionlist)
                {
                    if (item.Area.Count() != 0)
                    {
                        list.Add(new ControllerActions()
                        {
                            Controller = item.Controller,
                            Action = item.Action,
                            Area = item.Area.Select(v => v.ConstructorArguments[0].Value.ToString()).FirstOrDefault()
                            //,
                            //Attributes = item.Attributes
                        });
                    }
                    else
                    {
                        list.Add(new ControllerActions()
                        {
                            Controller = item.Controller,
                            Action = item.Action,
                            Area = string.Empty
                            //,
                            //Attributes = item.Attributes
                        });
                    }
                }
            }

            list.OrderBy(x => x.Area).ThenBy(x => x.Controller).ThenBy(x => x.Action);
            return list;
        }

        private async Task<List<SelectListItem>> GetAreaList()
        {
            List<SelectListItem> lst = new List<SelectListItem>();
            PageActionManager pageAction = new PageActionManager();
            IList<PageArea> pageArea = await pageAction.GetAllArea();
            foreach (PageArea area in pageArea)
            {
                lst.Add(new SelectListItem(area.DisplayName, area.AreaName));
            }
            return lst;
        }

        private async Task<List<SelectListItem>> GetPageControllerList(string areaName)
        {
            if (areaName == null)
                areaName = string.Empty;

            List<SelectListItem> lst = new List<SelectListItem>();
            PageActionManager pageAction = new PageActionManager();
            IList<PageController> pageArea = await pageAction.GetPageControllerList(areaName);
            foreach (PageController page in pageArea)
            {
                lst.Add(new SelectListItem(page.DisplayName, page.PageName));
            }
            return lst;
        }

        private async Task<List<SelectListItem>> GetPageActionList(string areaName, string pageName)
        {
            List<SelectListItem> lst = new List<SelectListItem>();
            PageActionManager pageAction = new PageActionManager();
            IList<PageAction> actions = await pageAction.GetPageActionList(areaName, pageName);
            foreach (PageAction action in actions)
            {
                lst.Add(new SelectListItem(action.DisplayName, action.ActionName));
            }
            return lst;
        }

        private async Task<List<SelectListItem>> GetControllerType()
        {
            List<SelectListItem> lst = new List<SelectListItem>();
            PageActionManager pageAction = new PageActionManager();
            IList<ControllerType> pageArea = await pageAction.GetControllerType();
            foreach (ControllerType controller in pageArea)
            {
                lst.Add(new SelectListItem(controller.ControllerTypeName, controller.ControllerTypeID.ToString()));
            }
            return lst;
        }

        private async Task<List<SelectListItem>> GetActionGroup()
        {
            List<SelectListItem> lst = new List<SelectListItem>();
            PageActionManager pageAction = new PageActionManager();
            IList<ActionGroup> pageArea = await pageAction.GetActionGroup();
            foreach (ActionGroup group in pageArea)
            {
                lst.Add(new SelectListItem(group.GroupName, group.ActionGroupID.ToString()));
            }
            return lst;
        }

    }
}