using Cbuilder.Core.API.Models;
namespace Cbuilder.Models
{
    public class UserAuthenticateResponse : ResponseBase
    {
        public bool IsAuthenticate { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public string UsersRoles { get; set; }
        public string UserID { get; set; }
       // public int SessionExpiry { get; set; }
    }
}
