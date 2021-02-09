using System;
using System.Security.Claims;
using System.Security.Principal;
using System.Linq;

namespace Cbuilder.Core.Helper.Extensions
{
    public static class CliamExtensions
    {
        public static void AddUpdateClaim(this IPrincipal currentPrincipal, string key, string value)
        {
            var identity = currentPrincipal.Identity as ClaimsIdentity;
            if (identity == null)
                return;

            // check for existing claim and remove it
            var existingClaim = identity.FindFirst(key);
            if (existingClaim != null)
                identity.RemoveClaim(existingClaim);
            // add new claim
            identity.AddClaim(new Claim(key, value));


            //var authenticationManager = HttpContext.Current.GetOwinContext().Authentication;
            //authenticationManager.AuthenticationResponseGrant = new AuthenticationResponseGrant(new ClaimsPrincipal(identity), new AuthenticationProperties() { IsPersistent = true });
        }

        public static string GetClaimValue(this IPrincipal currentPrincipal, string key)
        {
            var identity = currentPrincipal.Identity as ClaimsIdentity;
            if (identity == null)
                throw new ArgumentException("claim identity is null");
            var claim = identity.Claims.FirstOrDefault(c => c.Type == key);
            if (claim == null)
                throw new ArgumentException("claim is null for " + key);
            if (string.IsNullOrEmpty(claim.Value))
                throw new ArgumentException(key + "claim value is null or empty");
            return claim.Value;
        }
    }
}
