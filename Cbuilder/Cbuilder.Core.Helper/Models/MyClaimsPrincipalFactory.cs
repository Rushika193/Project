using Cbuilder.Core.Constants;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.Core.Helper.Models
{
    public class MyClaimsPrincipalFactory<TUser> : UserClaimsPrincipalFactory<TUser> where TUser : ApplicationUser
    {
        public MyClaimsPrincipalFactory(
            UserManager<TUser> userManager,
            IOptions<IdentityOptions> optionsAccessor) : base(userManager, optionsAccessor)
        {

        }

        protected override async Task<ClaimsIdentity> GenerateClaimsAsync(TUser user)
        {
            var id = await base.GenerateClaimsAsync(user);
            Claim[] claims = new Claim[]
                        {
                            new Claim(ConstantString.AccessToken,user.AccessToken),
                            new Claim(ClaimTypes.Name,user.Email),
                            new Claim(ClaimTypes.Role,user.UsersRoles),
                            new Claim(ConstantString.RefreshToken,user.RefreshToken),
                            new Claim(ConstantString.UserID,user.UserID)
                            //new Claim(ClaimTypes.Expiration,user.SessionExpiry.ToString())
                        };
            id.AddClaims(claims);
            return id;
        }
    }
}
