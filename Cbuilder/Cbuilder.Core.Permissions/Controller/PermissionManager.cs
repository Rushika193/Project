using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.Core.Permissions
{
    public class PermissionManager
    {
      
        public async Task<IList<IdentityScope>> GetIdentityScopes(string selectedIDs)
        {
            PermissionProvider provider = new PermissionProvider();
            return await provider.GetIdentityScopes(selectedIDs);
        }

        public async Task<IList<PageAction>> GetAllPageAction()
        {
            PermissionProvider provider = new PermissionProvider();
            return await provider.GetAllPageAction();

        }

        public async Task<IList<PageArea>> GetAllArea()
        {
            PermissionProvider provider = new PermissionProvider();
            return await provider.GetAllArea();
        }

    }
}
