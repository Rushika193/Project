using Cbuilder.Core.Helper.Classes.Models;
using Cbuilder.Core.Helper.Interfaces;
using Cbuilder.Core.Helper.Models;
using Cbuilder.Core.Role;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cbuilder.Areas.Dashboard.Views.User.Components.Roles
{

    public class RolesViewComponent : ViewComponent
    {
        private readonly IApiClient _apiClient;
        public RolesViewComponent(IApiClient apiClient)
        {
            _apiClient = apiClient;
        }
        public async Task<IViewComponentResult> InvokeAsync()
        {
            List<RoleViewModel> lstRole = await _apiClient.GetAsync<List<RoleViewModel>>(APIURL.IdentityBaseUri + IdentityAPI.Role.GetAll);
            return View("Roles",lstRole);
            //List<RoleViewModel> roles = new List<RoleViewModel>
            //{                
            //    new RoleViewModel { ID = "2B182DB7-6F5E-425F-95F6-367304456582", Name = "DataioAdmin" },
            //    new RoleViewModel { ID = "2B182DB7-6F5E-425F-95F6-367304456582", Name = "Author User" },
            //    new RoleViewModel { ID = "6E9BDCEC-40D3-485D-9FA5-2EA9AD5E73AB", Name = "New Role User" },
            //    new RoleViewModel { ID = "87AF89E0-77E5-4E84-9C9D-DA81DF5000F3", Name = "Admin User" }                              
            //};
            //return View("Roles", roles);
        }        
    }
}
