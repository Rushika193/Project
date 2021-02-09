using SQLHelper;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.Core.Permissions
{
    public class PermissionProvider
    {
        public PermissionProvider()
        {
        }

        internal async Task<IList<IdentityScope>> GetIdentityScopes(string selectedIDs)
        {
            try
            {
                List<SQLParam> sQLParam = new List<SQLParam>
            {
                new SQLParam("@SelectedIDs", selectedIDs)
            };
                SQLGetListAsync handler = new SQLGetListAsync();
                return await handler.ExecuteAsListAsync<IdentityScope>("[usp_Permission_GetIdentityScopes]", sQLParam);

            }
            catch { throw; }
        }

        public async Task<IList<PageAction>> GetAllPageAction()
        {
            try
            {
                SQLGetListAsync handler = new SQLGetListAsync();
                return await handler.ExecuteAsListAsync<PageAction>("[dbo].[usp_Roles_GetAllPageAction]");
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
                return await sqlhandler.ExecuteAsListAsync<PageArea>("[usp_Page_GetAllArea]");
            }
            catch
            {
                throw;
            }
        }
    }
}
