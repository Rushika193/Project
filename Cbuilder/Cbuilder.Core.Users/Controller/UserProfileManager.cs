using Cbuilder.Core.API.Models;
using System.Threading.Tasks;

namespace Cbuilder.Core.Users
{
    public class UserProfileManager
    {        
        public UserProfileManager()
        {           
        }
        //public async Task<UserProfileEditModel> GetUserById(string userID)
        //{
        //    UserProfileDataProvider provider = new UserProfileDataProvider();
        //    return await provider.GetUserById(userID);
        //}
        //public async Task<int> AddUpdateUser(UserProfileEditModel user)
        //{
        //    UserProfileDataProvider provider = new UserProfileDataProvider();
        //    return await provider.AddUpdateUser(user);
        //}

        public async Task<UserProfile> GetUserProfileByUserID(string UserID)
        {
            UserProfileDataProvider provider = new UserProfileDataProvider();
            return await provider.GetUserProfileByUserID(UserID);
        }
        public async Task<OperationStatus> UpdateUserProfile(UserProfile Profile)
        {
            UserProfileDataProvider provider = new UserProfileDataProvider();
            return await provider.UpdateUserProfile(Profile);
        }

    }
}
