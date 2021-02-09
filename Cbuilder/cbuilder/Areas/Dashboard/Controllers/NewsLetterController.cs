using Cbuilder.NewsLetter;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Cbuilder.Areas.Dashboard.Controllers
{
    public class NewsLetterController : Controller
    {
        private readonly IHttpContextAccessor _context;
        public NewsLetterController(IHttpContextAccessor context)
        {
            _context = context;
        }
        public async Task<IActionResult> GetUserInterest(int SiteID)
        {
            NL_Controller objCon = new NL_Controller();
            var interest = await objCon.GetInterest(SiteID);
            return new ObjectResult(interest);
        }
        public async Task<int> AddSubscribeUser(string Email, string FName, string Lname, string Location, int Gender, bool InterestInAll, string Interest)
        {
            try
            {
                NL_Controller objCon = new NL_Controller();
                NL_UserInfo objUser = new NL_UserInfo
                {
                    ClientIP = _context.HttpContext?.Connection?.RemoteIpAddress?.ToString(),
                    AddedBy = "SubcribeComponent",
                    SubscriberEmail = Email,
                    FirstName = FName,
                    LastName = Lname,
                    Location = Location,
                    InterestInAll = InterestInAll,
                    Interest = Interest,
                    Gender = (UserGender)Gender,
                    IsImported = false
                };
                int status = await objCon.SaveEmailSubscriber(objUser);
                await objCon.SendMailToUser(Email);
                return status;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> UnsubscribeUser(string token, string reason)
        {
            try
            {
                NL_Controller objCon = new NL_Controller();
                return await objCon.UnSubscribeByEmailLink(token, reason);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}