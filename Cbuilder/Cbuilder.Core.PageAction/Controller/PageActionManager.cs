using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Cbuilder.Core.API.Models;

namespace Cbuilder.Core.PageAction
{
    public class PageActionManager
    {
        public PageActionManager()
        {
        }
        public async Task<IList<PageController>> GetPageController(string areaName, string keyword, int offset, int limit)
        {
            PageActionDataProvider provider = new PageActionDataProvider();
            return await provider.GetPageController(areaName, keyword, offset, limit);
        }

        public async Task<IList<PageArea>> GetAllArea()
        {
            PageActionDataProvider provider = new PageActionDataProvider();
            return await provider.GetAllArea();
        }

        public async Task<PageArea> GetPageAreaByID(string areaID)
        {
            PageActionDataProvider provider = new PageActionDataProvider();
            return await provider.GetPageAreaByID(areaID);
        }


        public async Task<OperationStatus> AddUpdatePageArea(PageArea pageArea, string userName)
        {
            PageActionDataProvider provider = new PageActionDataProvider();
            return await provider.AddUpdatePageArea(pageArea, userName);
        }


        public async Task<PageController> GetPageControllerByID(string pageID)
        {
            PageActionDataProvider provider = new PageActionDataProvider();
            return await provider.GetPageControllerByID(pageID);
        }

        public async Task<OperationStatus> AddUpdatePageController(PageController pageController, string userName)
        {
            PageActionDataProvider provider = new PageActionDataProvider();
            return await provider.AddUpdatePageController(pageController, userName);
        }


        public async Task<IList<PageAction>> GetPageActions(string areaName, string pageName, string keyword, int offset, int limit)
        {
            PageActionDataProvider provider = new PageActionDataProvider();
            return await provider.GetPageActions(areaName, pageName, keyword, offset, limit);
        }

        public async Task<IList<ControllerType>> GetControllerType()
        {
            PageActionDataProvider provider = new PageActionDataProvider();
            return await provider.GetControllerType();
        }


        public async Task<PageAction> GetPageActionByID(string pageActionID)
        {
            PageActionDataProvider provider = new PageActionDataProvider();
            return await provider.GetPageActionByID(pageActionID);
        }

        public async Task<OperationStatus> AddUpdatePageAction(PageAction pageAction, string userName)
        {
            PageActionDataProvider provider = new PageActionDataProvider();
            return await provider.AddUpdatePageAction(pageAction, userName);
        }
        public async Task<IList<ActionGroup>> GetActionGroup()
        {
            PageActionDataProvider provider = new PageActionDataProvider();
            return await provider.GetActionGroup();
        }

        public async Task<IList<PageController>> GetPageControllerList(string area)
        {
            PageActionDataProvider provider = new PageActionDataProvider();
            return await provider.GetPageControllerList(area);
        }
        public async Task<IList<PageAction>> GetPageActionList(string areaName, string pageName)
        {
            PageActionDataProvider provider = new PageActionDataProvider();
            return await provider.GetPageActionList(areaName, pageName);
        }
        public async Task<OperationStatus> AutomateActions(ControllerActions controllerAction, string userName)
        {
            PageActionDataProvider provider = new PageActionDataProvider();
            return await provider.AutomateActions(controllerAction, userName);
        }

        public async Task<OperationStatus> DeleteAction(string id, string userName)
        {
            PageActionDataProvider provider = new PageActionDataProvider();
            return await provider.DeleteAction(id, userName);
        }

        public async Task<OperationStatus> DeletePage(string id, string userName)
        {
            PageActionDataProvider provider = new PageActionDataProvider();
            return await provider.DeletePage(id, userName);
        }

        public async Task<OperationStatus> DeleteArea(string id, string userName)
        {
            PageActionDataProvider provider = new PageActionDataProvider();
            return await provider.DeleteArea(id, userName);
        }

        public async Task<IList<ServiceAction>> GetAllServiceActions()
        {
            PageActionDataProvider provider = new PageActionDataProvider();
            return await provider.GetAllServiceActions();
        }

        public async Task<IList<IdentityAction>> GetAllIdentityActions()
        {
            PageActionDataProvider provider = new PageActionDataProvider();
            return await provider.GetAllIdentityActions();
        }
        public async Task<OperationStatus> ManageIdentity(IdentiyActionBind identiyActionBind,string userName)
        {
            PageActionDataProvider provider = new PageActionDataProvider();
            return await provider.ManageIdentity(identiyActionBind,userName);
        }
        public async Task<OperationStatus> ManageService(ServiceActionBind serviceActionBind, string userName)
        {
            PageActionDataProvider provider = new PageActionDataProvider();
            return await provider.ManageService(serviceActionBind, userName);
        }

    }
}
