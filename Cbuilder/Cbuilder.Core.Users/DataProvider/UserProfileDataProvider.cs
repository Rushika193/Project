using Cbuilder.Core.API.Enum;
using Cbuilder.Core.API.Models;
using SQLHelper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cbuilder.Core.Users
{
    public class UserProfileDataProvider
    {
        
        public UserProfileDataProvider()
        {            
        }
        //public async Task<UserProfileEditModel> GetUserById(string userID)
        //{
        //    List<SQLParam> pairs = new List<SQLParam>();
        //    pairs.Add(new SQLParam("@UserId", userID));
        //    SQLGetAsync sql = new SQLGetAsync();
        //    return await sql.ExecuteAsObjectAsync<UserProfileEditModel>("usp_Dashboard_Users_GetUserByID", pairs);
        //}
        //public async Task<int> AddUpdateUser(UserProfileEditModel user)
        //{
        //    List<SQLParam> pairs = new List<SQLParam>();
        //    pairs.Add(new SQLParam("@UserId", user.UserId));
        //    pairs.Add(new SQLParam("@FirstName", user.FirstName));
        //    pairs.Add(new SQLParam("@LastName", user.LastName));
        //    pairs.Add(new SQLParam("@PhoneNumber", user.PhoneNumber));
        //    pairs.Add(new SQLParam("@Email", user.Email));
        //    pairs.Add(new SQLParam("@ImagePath", user.ImagePath));
        //    pairs.Add(new SQLParam("@Country", user.Country));
        //    pairs.Add(new SQLParam("@About", user.About));
        //    SQLExecuteNonQueryAsync sql = new SQLExecuteNonQueryAsync();
        //    return await sql.ExecuteNonQueryAsGivenTypeAsync<int>("usp_Dashboard_Users_UpdateUser", pairs, "@result");
        //}


        public async Task<UserProfile> GetUserProfileByUserID(string UserID)
        {
            List<SQLParam> param = new List<SQLParam>
            {
                new SQLParam("@UserID", UserID)
            };
            try
            {
                SQLGetAsync handler = new SQLGetAsync();
                return await handler.ExecuteAsObjectAsync<UserProfile>("[dbo].[usp_UserProfile_GetByID]", param);

            }
            catch
            {
                throw;
            }
        }
        public async Task<OperationStatus> UpdateUserProfile(UserProfile Profile)
        {
            try
            {
                List<SQLParam> pairs = new List<SQLParam>
                {
                new SQLParam("@UserID", Profile.UserID),
                new SQLParam("@Username", Profile.Username),
                new SQLParam("@Title", Profile.Title??string.Empty),
                new SQLParam("@FirstName", Profile.FirstName??string.Empty),
                new SQLParam("@MiddleName",Profile.MiddleName??string.Empty),
                new SQLParam("@LastName", Profile.LastName??string.Empty),
                new SQLParam("@GenderID",(int)Profile.GenderID),
                new SQLParam("@ProfileImage", Profile.ProfileImage??string.Empty),
                new SQLParam("@Mobile", Profile.Mobile??string.Empty),
                new SQLParam("@Email", Profile.Email??string.Empty),
                new SQLParam("@Phone", Profile.Phone??string.Empty),
                new SQLParam("@ResPhone", Profile.ResPhone??string.Empty),
                new SQLParam("@StreetAddress", Profile.StreetAddress??string.Empty),
                new SQLParam("@City", Profile.City??string.Empty),
                new SQLParam("@State", Profile.State??string.Empty),
                new SQLParam("@PostalCode", Profile.PostalCode??string.Empty),
                new SQLParam("@About", Profile.About??string.Empty),
                new SQLParam("@CurrentUser", Profile.Email??string.Empty)
                };
                SQLExecuteNonQueryAsync sql = new SQLExecuteNonQueryAsync();
                await sql.ExecuteNonQueryAsync("[dbo].[usp_Users_UpdateUser]", pairs);

                return new OperationStatus { Message = "User Profile Updated Successfully.", StatusCode = StatusCode.Updated };

            }
            catch
            {
                throw;
            }
        }
    }
}
