using Cbuilder.Core.Helper.Interfaces;
using Cbuilder.EmailTemplate;
using SQLHelper;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Cbuilder.NewsLetter
{

    /// <summary>
    /// Business logic class for NewsLetter.
    /// </summary>
    public class NL_Controller
    {
        private readonly IEmailTemplateManager _emailTemplate;
        private readonly IEmailSender _emailSender;
        public NL_Controller()
        {
        }
        public NL_Controller(IEmailTemplateManager emailTemplate, IEmailSender emailSender)
        {
            _emailTemplate = emailTemplate;
            _emailSender = emailSender;
        }
        public async Task<int> SaveEmailSubscriber(NL_UserInfo objInfo)
        {
            try
            {
                NL_Provider cont = new NL_Provider();
                return await cont.SaveEmailSubscriber(objInfo);
            }
            catch
            {
                throw;
            }
        }

        public async Task<int> UnSubscribeByEmailLink(string UniqueCode, string Reason)
        {
            try
            {
                NL_Provider provider = new NL_Provider();
                return await provider.UnSubscribeByEmailLink(UniqueCode, Reason);
            }
            catch
            {
                throw;
            }
        }

        public async Task<IList<InterestInfo>> GetInterest(int SiteID)
        {
            NL_Provider provider = new NL_Provider();
            DataSet ds = await provider.GetCustomerInterest(SiteID);

            List<InterestInfo> finalList = new List<InterestInfo>();
            for (int i = 0; i < ds.Tables.Count; i++)
            {
                IList<InterestTempInfo> infos = DataSourceHelper.FillCollection<InterestTempInfo>(ds.Tables[i]);

                InterestInfo info = new InterestInfo
                {
                    AppName = infos[0].AppName,
                    CategoryName = infos[0].CategoryName
                };

                List<string> lstKeyword = infos.Select(x => x.KeyWord).Distinct().ToList();
                info.KeyWordList = lstKeyword;

                finalList.Add(info);
            }
            return finalList;

        }

        //GetInterestForCampaign
        public async Task<IList<InterestInfo>> GetInterestForCampaign(int SiteID)
        {


            NL_Provider provider = new NL_Provider();
            DataSet ds = await provider.GetInterestForCampaign(SiteID);
            List<InterestInfo> finalList = new List<InterestInfo>();
            IList<InterestTempInfo> infos = new List<InterestTempInfo>();

            if (ds.Tables.Count > 0)
            {
                infos = DataSourceHelper.FillCollection<InterestTempInfo>(ds.Tables[0]);

                List<string> appNames = infos.Select(x => x.AppName).Distinct().ToList();

                foreach (string appName in appNames)
                {
                    List<InterestTempInfo> tempInfos = infos.ToList<InterestTempInfo>().FindAll(x => x.AppName == appName);
                    List<string> categories = tempInfos.Select(x => x.CategoryName).Distinct().ToList();
                    foreach (string category in categories)
                    {
                        List<InterestTempInfo> tempCatInfos = tempInfos.FindAll(x => x.CategoryName == category);
                        List<string> keywords = tempCatInfos.Select(x => x.KeyWord).ToList();
                        InterestInfo objInfo = new InterestInfo();
                        objInfo.AppName = appName;
                        objInfo.CategoryName = category;
                        objInfo.KeyWordList = keywords;
                        finalList.Add(objInfo);
                    }
                }
            }
            return finalList;

        }

        public async Task<IList<ImportUserInfo>> GetAllImportUser(string searchKey, int offset, int limit, int isImported, int isSubscribed)
        {
            NL_Provider provider = new NL_Provider();
            return await provider.GetAllImportUser(searchKey, offset, limit, isImported, isSubscribed);
        }
        public async Task<ImportUserInfo> GetImportedUserByID(int subscriberID)
        {
            NL_Provider provider = new NL_Provider();
            return await provider.GetImportUserByID(subscriberID);
        }
        public async Task DeleteImportUserByID(int subscriberID)
        {
            NL_Provider provider = new NL_Provider();
            await provider.DeleteImportUserByID(subscriberID);
        }

        public async Task DeleteMultImportedUser(string subscriberID)
        {
            NL_Provider provider = new NL_Provider();
            await provider.DeleteMultImportedUser(subscriberID);
        }
        public async Task<NL_UserInfo> GetByEmail(string EmailAddress)
        {
            NL_Provider provider = new NL_Provider();
            return await provider.GetByEmail(EmailAddress);
        }
        public async Task SendMailToUser(string Email)
        {
            NL_UserInfo _UserInfo = await this.GetByEmail(Email);
            if (_UserInfo != null)
            {
                Cbuilder.EmailTemplate.EmailTemplate mail = await _emailTemplate.GetByIdentifier("subscription-65F1A79A");
                //string hostURL = TokenController.GetCurrnetHostURL();

                if (mail != null)
                {
                    List<TokenKeyValue> lstToken = new List<TokenKeyValue>
                    {
                        new TokenKeyValue { Key = MailToken.FirstName, Value = _UserInfo.FirstName },
                        new TokenKeyValue { Key = MailToken.LastName, Value = _UserInfo.LastName },
                        new TokenKeyValue { Key = MailToken.Email, Value = _UserInfo.SubscriberEmail },
                        new TokenKeyValue { Key = MailToken.UnsubscribeLink, Value = _UserInfo.UniqueCode },
                        new TokenKeyValue { Key = MailToken.UserName, Value = string.Empty },
                        new TokenKeyValue { Key = MailToken.CurrnetHostURL, Value = "" }
                    };
                    mail.ViewDOM = _emailTemplate.ReplaceToken(mail.ViewDOM, lstToken);
                    string AdminMail = /*pagebase.GetSettingValueByIndividualKey(SageFrameSettingKeys.PortalAdminEmail)*/"";
                    _emailSender.SendEmailAsync(_UserInfo.SubscriberEmail, mail.Subject, mail.ViewDOM);
                }
            }
        }

        public async Task<IList<AdvanceFilterInfo>> GetAdvanceFilters(int SiteID)
        {
            NL_Provider provider = new NL_Provider();
            DataSet ds = await provider.GetAdvanceFilters(SiteID);

            List<AdvanceFilterInfo> finalList = new List<AdvanceFilterInfo>();
            for (int i = 0; i < ds.Tables.Count; i++)
            {
                IList<AdvanceFilterTempInfo> infos = DataSourceHelper.FillCollection<AdvanceFilterTempInfo>(ds.Tables[i]);

                AdvanceFilterInfo info = new AdvanceFilterInfo
                {
                    AppName = infos[0].AppName,
                    CategoryName = infos[0].CategoryName,
                    InputType = infos[0].InputType
                };

                List<string> lstKeyword = infos.Select(x => x.KeyWord).Distinct().ToList();
                info.FilterList = lstKeyword;

                finalList.Add(info);
            }
            return finalList;
        }

    }


}
