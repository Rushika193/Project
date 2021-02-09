using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cbuilder.Core.Helper.Models
{
    public class CustomUserManager<TUser> : UserManager<TUser> where TUser : class
    {
        public CustomUserManager(IUserStore<TUser> store, IOptions<IdentityOptions> optionsAccessor,
    IPasswordHasher<TUser> passwordHasher, IEnumerable<IUserValidator<TUser>> userValidators,
    IEnumerable<IPasswordValidator<TUser>> passwordValidators, ILookupNormalizer keyNormalizer,
    IdentityErrorDescriber errors, IServiceProvider services, ILogger<UserManager<TUser>> logger) : base(store, optionsAccessor, passwordHasher, userValidators, passwordValidators, keyNormalizer, errors, services, logger)
        {
        }

        public override Task<bool> CheckPasswordAsync(TUser user, string password)
        {
            // return Task.FromResult(true);
            return base.CheckPasswordAsync(user, password);
        }
        //public override async Task<bool> CheckPasswordAsync(TUser user, string password)
        //{
        //    ThrowIfDisposed();
        //    var passwordStore = GetPasswordStore();
        //    if (user == null)
        //    {
        //        return false;
        //    }
        //    var result = await VerifyPasswordAsync(passwordStore, user, password);
        //    if (result == PasswordVerificationResult.SuccessRehashNeeded)
        //    {
        //        await UpdatePasswordHash(passwordStore, user, password, validatePassword: false);
        //        await UpdateUserAsync(user);
        //    }

        //    var success = result != PasswordVerificationResult.Failed;
        //    if (!success)
        //    {
        //        Logger.LogWarning(0, "Invalid password for user {userId}.", await GetUserIdAsync(user));
        //    }
        //    return success;
        //}
        //private IUserPasswordStore<TUser> GetPasswordStore()
        //{
        //    var cast = Store as IUserPasswordStore<TUser>;
        //    if (cast == null)
        //    {
        //        throw new NotSupportedException(Resources.StoreNotIUserPasswordStore);
        //    }
        //    return cast;
        //}

    }
}
