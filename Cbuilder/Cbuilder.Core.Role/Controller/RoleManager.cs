using Cbuilder.Core.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cbuilder.Core.Role
{
    public class RoleManager
    {
        public async Task<OperationStatus> AddUpdateRole(RoleViewModel userRole, string userName)
        {
            RoleDataProvider provider = new RoleDataProvider();
            return await provider.AddUpdateRole(userRole, userName);

        }
        public async Task<IList<RoleViewModel>> GetAllRole(string name, int offset, int limit)
        {
            RoleDataProvider provider = new RoleDataProvider();
            return await provider.GetAllRole(name, offset, limit);
        }
        public async Task<OperationStatus> DeleteRoleByID(string roleID, string userName)
        {
            RoleDataProvider provider = new RoleDataProvider();
            return await provider.DeleteRoleByID(roleID, userName);

        }

        public async Task<RoleViewModel> GetRoleByID(string roleID)
        {
            RoleDataProvider provider = new RoleDataProvider();
            return await provider.GetRoleByID(roleID);
        }
        public async Task<IList<RoleViewModel>> GetAllRoleView()
        {
            RoleDataProvider provider = new RoleDataProvider();
            return await provider.GetAllRoleView();

        }
        public async Task<string> GetRoleRedirectURL(string roleNames, int siteID)
        {
            RoleDataProvider provider = new RoleDataProvider();
            return await provider.GetRoleRedirectURL(roleNames, siteID);
        }
        public async Task<OperationStatus> SaveRolewiseRedirect(string roleUrlXML, int siteID, string userName)
        {
            RoleDataProvider provider = new RoleDataProvider();
            return await provider.SaveRolewiseRedirect(roleUrlXML, siteID, userName);
        }

        public async Task<IList<RoleRedirectModel>> GetAllRoleRedirectUrl(int siteID)
        {
            RoleDataProvider provider = new RoleDataProvider();
            return await provider.GetAllRoleRedirectUrl(siteID);
        }
    }
}
