using Cbuilder.Core.API.Enum;
using Cbuilder.Core.API.Models;
using SQLHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.Core.PageAction
{
    public class PageActionDataProvider
    {
        public PageActionDataProvider()
        {
        }

        internal async Task<IList<PageController>> GetPageController(string areaName, string keyword, int offset = 0, int limit = 10)
        {
            SQLGetListAsync sqlhandler = new SQLGetListAsync();
            List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@AreaName", areaName),
                new SQLParam("@Keyword", keyword),
                new SQLParam("@offset", offset),
                new SQLParam("@limit", limit)
            };
            try
            {
                return await sqlhandler.ExecuteAsListAsync<PageController>("[usp_PageAction_GetPageController]", sQLParam);
            }
            catch
            {
                throw;
            }
        }

        internal async Task<IList<PageArea>> GetAllArea()
        {
            SQLGetListAsync sqlhandler = new SQLGetListAsync();

            try
            {
                return await sqlhandler.ExecuteAsListAsync<PageArea>("[usp_PageAction_GetAllArea]");
            }
            catch
            {
                throw;
            }
        }

        internal async Task<PageArea> GetPageAreaByID(string areaID)
        {
            SQLGetAsync sqlhandler = new SQLGetAsync();
            List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@AreaID", areaID)

            };
            try
            {
                return await sqlhandler.ExecuteAsObjectAsync<PageArea>("[usp_PageAction_GetPageAreaByID]", sQLParam);
            }
            catch
            {
                throw;
            }
        }

        internal async Task<OperationStatus> AddUpdatePageArea(PageArea pageArea, string userName)
        {
            List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@AreaID", pageArea.AreaID),
                new SQLParam("@Name", pageArea.AreaName),
                new SQLParam("@DisplayName", pageArea.DisplayName),
                new SQLParam("@Description", pageArea.Description),
                 new SQLParam("@UserName", userName)
            };
            try
            {
                SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
                int result = await handler.ExecuteNonQueryAsync("[usp_PageAction_AddUpdatePageArea]", sQLParam, "@Status");
                if (result == 1)
                {
                    return new OperationStatus { Message = "Page Controller added successfully.", StatusCode = StatusCode.Created, Result = result };
                }
                else if (result == 2)
                {
                    return new OperationStatus { Message = "Page Controller updated successfully.", StatusCode = StatusCode.Updated, Result = result };
                }
                return new OperationStatus { Message = "Something went wrong while saving Page Controller data.", StatusCode = StatusCode.ServerError, Result = result };
            }
            catch
            {
                throw;
            }
        }

        internal async Task<PageController> GetPageControllerByID(string pageID)
        {
            SQLGetAsync sqlhandler = new SQLGetAsync();
            List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@PageID", pageID)

            };
            try
            {
                return await sqlhandler.ExecuteAsObjectAsync<PageController>("[usp_PageAction_GetPageByID]", sQLParam);
            }
            catch
            {
                throw;
            }
        }

        internal async Task<OperationStatus> AddUpdatePageController(PageController pageController, string userName)
        {
            List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@PageID", pageController.PageID),
                new SQLParam("@AreaName", pageController.AreaName),
                new SQLParam("@PageName", pageController.PageName),
                new SQLParam("@DisplayName", pageController.DisplayName),
                new SQLParam("@Description", pageController.Description),
                new SQLParam("@ControllerType", pageController.ControllerType),
                new SQLParam("@UserName", userName)
            };
            try
            {
                SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
                int result = await handler.ExecuteNonQueryAsync("[usp_PageAction_AddUpdatePageController]", sQLParam, "@Status");
                if (result == 1)
                {
                    return new OperationStatus { Message = "Page Controller added successfully.", StatusCode = StatusCode.Created, Result = result };
                }
                else if (result == 2)
                {
                    return new OperationStatus { Message = "Page Controller updated successfully.", StatusCode = StatusCode.Updated, Result = result };
                }
                return new OperationStatus { Message = "Something went wrong while saving Page Controller data.", StatusCode = StatusCode.ServerError, Result = result };
            }
            catch
            {
                throw;
            }
        }

        internal async Task<IList<PageAction>> GetPageActions(string areaName, string pageName, string keyword, int offset, int limit)
        {
            SQLGetListAsync sqlhandler = new SQLGetListAsync();
            List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@AreaName", areaName),
                new SQLParam("@PageName", pageName),
                new SQLParam("@Keyword", keyword),
                new SQLParam("@offset", offset),
                new SQLParam("@limit", limit)
            };
            try
            {
                return await sqlhandler.ExecuteAsListAsync<PageAction>("[usp_PageAction_GetPageActions]", sQLParam);
            }
            catch
            {
                throw;
            }
        }

        internal async Task<IList<ControllerType>> GetControllerType()
        {
            SQLGetListAsync sqlhandler = new SQLGetListAsync();
            try
            {
                return await sqlhandler.ExecuteAsListAsync<ControllerType>("[usp_PageAction_GetControllerType]");
            }
            catch
            {
                throw;
            }
        }

        internal async Task<PageAction> GetPageActionByID(string pageActionID)
        {
            SQLGetAsync sqlhandler = new SQLGetAsync();
            List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@PageActionID", pageActionID)

            };
            try
            {
                return await sqlhandler.ExecuteAsObjectAsync<PageAction>("[usp_PageAction_GetPageActionByID]", sQLParam);
            }
            catch
            {
                throw;
            }
        }

        internal async Task<OperationStatus> AddUpdatePageAction(PageAction pageAction, string userName)
        {
            List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@PageActionID", pageAction.PageActionID),
                new SQLParam("@AreaName", pageAction.AreaName),
                new SQLParam("@PageName", pageAction.PageName),
                 new SQLParam("@ActionName", pageAction.ActionName),
                new SQLParam("@DisplayName", pageAction.DisplayName),
                new SQLParam("@Description", pageAction.Description),
                new SQLParam("@ActionGroupID", pageAction.ActionGroupID),
                new SQLParam("@UserName", userName)
            };
            try
            {
                SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
                int result = await handler.ExecuteNonQueryAsync("[usp_PageAction_AddUpdatePageAction]", sQLParam, "@Status");
                if (result == 1)
                {
                    return new OperationStatus { Message = "Page Controller added successfully.", StatusCode = StatusCode.Created, Result = result };
                }
                else if (result == 2)
                {
                    return new OperationStatus { Message = "Page Controller updated successfully.", StatusCode = StatusCode.Updated, Result = result };
                }
                return new OperationStatus { Message = "Something went wrong while saving Page Controller data.", StatusCode = StatusCode.ServerError, Result = result };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        internal async Task<IList<ActionGroup>> GetActionGroup()
        {
            SQLGetListAsync sqlhandler = new SQLGetListAsync();
            try
            {
                return await sqlhandler.ExecuteAsListAsync<ActionGroup>("[usp_PageAction_GetActionGroup]");
            }
            catch
            {
                throw;
            }
        }

        internal async Task<IList<PageController>> GetPageControllerList(string area)
        {
            SQLGetListAsync sqlhandler = new SQLGetListAsync();
            List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@Area", area),

            };
            try
            {
                return await sqlhandler.ExecuteAsListAsync<PageController>("[usp_PageAction_GetPageControllerList]", sQLParam);
            }
            catch
            {
                throw;
            }
        }
        internal async Task<IList<PageAction>> GetPageActionList(string areaName, string pageName)
        {
            SQLGetListAsync sqlhandler = new SQLGetListAsync();
            List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@AreaName", areaName),
                 new SQLParam("@PageName", pageName),

            };
            try
            {
                return await sqlhandler.ExecuteAsListAsync<PageAction>("[usp_PageAction_GetPageActionList]", sQLParam);
            }
            catch
            {
                throw;
            }
        }

        internal async Task<OperationStatus> AutomateActions(ControllerActions controllerAction, string userName)
        {
            List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@AreaName", controllerAction.Area),
                new SQLParam("@PageName", controllerAction.Controller),
                 new SQLParam("@ActionName", controllerAction.Action),
                new SQLParam("@UserName", userName)
            };
            try
            {
                SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
                int result = await handler.ExecuteNonQueryAsync("[usp_PageAction_AutomateActions]", sQLParam, "@Status");
                if (result == 1)
                {
                    return new OperationStatus { Message = "Page Controller added successfully.", StatusCode = StatusCode.Created, Result = result };
                }
                else if (result == 2)
                {
                    return new OperationStatus { Message = "Page Controller updated successfully.", StatusCode = StatusCode.Updated, Result = result };
                }
                return new OperationStatus { Message = "Something went wrong while saving Page Controller data.", StatusCode = StatusCode.ServerError, Result = result };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        internal async Task<OperationStatus> DeleteAction(string id, string userName)
        {
            List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@PageActionID", id),
                new SQLParam("@UserName", userName)
            };
            try
            {
                SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
                int result = await handler.ExecuteNonQueryAsync("[usp_PageAction_DeleteAction]", sQLParam, "@Status");
                if (result == 1)
                {
                    return new OperationStatus { Message = "Action deleted successfully.", StatusCode = StatusCode.Created, Result = result };
                }                
                return new OperationStatus { Message = "Something went wrong while Action deleted.", StatusCode = StatusCode.ServerError, Result = result };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        internal async Task<OperationStatus> DeletePage(string id, string userName)
        {
            List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@PageID", id),
                new SQLParam("@UserName", userName)
            };
            try
            {
                SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
                int result = await handler.ExecuteNonQueryAsync("[usp_PageAction_DeletePage]", sQLParam, "@Status");
                if (result == 1)
                {
                    return new OperationStatus { Message = "Page deleted successfully.", StatusCode = StatusCode.Created, Result = result };
                }
                return new OperationStatus { Message = "Something went wrong while Action deleted.", StatusCode = StatusCode.ServerError, Result = result };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        internal async Task<OperationStatus> DeleteArea(string id, string userName)
        {
            List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@AreaID", id),
                new SQLParam("@UserName", userName)
            };
            try
            {
                SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
                int result = await handler.ExecuteNonQueryAsync("[usp_PageAction_DeleteArea]", sQLParam, "@Status");
                if (result == 1)
                {
                    return new OperationStatus { Message = "Area deleted successfully.", StatusCode = StatusCode.Created, Result = result };
                }
                return new OperationStatus { Message = "Something went wrong while Action deleted.", StatusCode = StatusCode.ServerError, Result = result };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IList<ServiceAction>> GetAllServiceActions()
        {
            SQLGetListAsync sqlhandler = new SQLGetListAsync();           
            try
            {
                return await sqlhandler.ExecuteAsListAsync<ServiceAction>("[usp_PageAction_GetAllServiceActions]");
            }
            catch
            {
                throw;
            }
        }

        public async Task<IList<IdentityAction>> GetAllIdentityActions()
        {
            SQLGetListAsync sqlhandler = new SQLGetListAsync();
            try
            {
                return await sqlhandler.ExecuteAsListAsync<IdentityAction>("[usp_PageAction_GetAllIdentityActions]");
            }
            catch
            {
                throw;
            }
        }

        public async Task<OperationStatus> ManageIdentity(IdentiyActionBind identiyActionBind, string userName)
        {
            List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@PageActionID", identiyActionBind.PageAction.PageActionID),
                new SQLParam("@SelectedIdentity", identiyActionBind.PageAction.SelectedIdentity),
                new SQLParam("@UserName", userName)
            };
            try
            {
                SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
                int result = await handler.ExecuteNonQueryAsync("[usp_PageAction_ManageIdentity]", sQLParam, "@Status");
                if (result == 1)
                {
                    return new OperationStatus { Message = "Identy scope added successfully.", StatusCode = StatusCode.Created, Result = result };
                }
                return new OperationStatus { Message = "Something went wrong while Action deleted.", StatusCode = StatusCode.ServerError, Result = result };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<OperationStatus> ManageService(ServiceActionBind serviceActionBind, string userName)
        {
            List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@PageActionID", serviceActionBind.PageAction.PageActionID),
                new SQLParam("@SelectedService", serviceActionBind.PageAction.SelectedService),
                new SQLParam("@UserName", userName)
            };
            try
            {
                SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
                int result = await handler.ExecuteNonQueryAsync("[usp_PageAction_ManageService]", sQLParam, "@Status");
                if (result == 1)
                {
                    return new OperationStatus { Message = "Identy scope added successfully.", StatusCode = StatusCode.Created, Result = result };
                }
                return new OperationStatus { Message = "Something went wrong while Action deleted.", StatusCode = StatusCode.ServerError, Result = result };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
