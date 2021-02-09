
using Cbuilder.Core.API.EndPoint;
using Cbuilder.Core.API.Models;
using Cbuilder.Core.Constants;
using Cbuilder.Core.Helper;
using Cbuilder.Core.Helper.APIInvoker;
using Cbuilder.Core.Helper.Models;
using Cbuilder.EmailTemplate;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Net.Http;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.ManageMassMail
{
    public class MassMailHelper
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IHostEnvironment _env;
        private readonly IMemoryCache _memoryCache;
        public MassMailHelper()
        {
        }
        public MassMailHelper(IHttpContextAccessor httpContextAccessor, IHostEnvironment env, IMemoryCache memoryCache)
        {
            _httpContextAccessor = httpContextAccessor;
            _env = env;
            _memoryCache = memoryCache;
        }
        public async Task<IList<MassMailFilterTypeInfo>> GetFilterValueList(int filterTypeID)
        {
            MassMailProvider objProvider = new MassMailProvider();
            return await objProvider.GetFilterValueList(filterTypeID);
        }
        public async Task<IList<MassMailFilterTypeInfo>> GetAllUsers(string username)
        {
            MassMailProvider objProvider = new MassMailProvider();
            return await objProvider.GetAllUsersForAutoComplete(username);
        }

        public async Task<IList<MassMailInfo>> GetMassMailList(int offset, int limit, int filterTypeID, string title, int status)
        {
            MassMailProvider objProvider = new MassMailProvider();
            return await objProvider.GetMassMailList(offset, limit, filterTypeID, title, status);
        }

        public async Task<OperationStatus> AddUpdateMassMail(MassMailAddInfo objMassMail, string username, string HostURL)
        {
            MassMailProvider objProvider = new MassMailProvider();
            if (objMassMail.IsInstant)
            {
                DateTime CurrentDate = DateTime.UtcNow.ToLocalTime();
                objMassMail.ScheduledOn = CurrentDate.ToString();
                objMassMail.TimeZoneOffset = TimeZone.CurrentTimeZone.GetUtcOffset(CurrentDate).ToString();
            }
            OperationStatus status = await objProvider.AddUpdateMassMail(objMassMail, username);
            if ((int)status.Result > 0)
            {
                this.CallMailGateway(objMassMail.UTCScheduled, objMassMail.IsInstant, HostURL);
            }
            return status;
        }
        private void CallMailGateway(DateTime ScheduleDate, bool IsInstant, string HostURL)
        {
            string GateWay = MailSettingController.GetSettingByKey(MailSettingKey.EMailGateWay).Result.ToLower();
            if (GateWay == "contentder")
                Task.Run(() => SendMailFromContentder(ScheduleDate, HostURL));
            else if (GateWay == "mandrill")
            {
                MandrillMailController conMandrill = new MandrillMailController(_httpContextAccessor, _env, _memoryCache);
                Task.Run(() => conMandrill.SendMailFromMandril(ScheduleDate, IsInstant));
            }
        }
        /// <summary>
        /// Replace token value
        /// </summary>
        /// <param name="TokenKeys">Comma Separed string</param>
        /// <param name="TokenValues">Comma Separed string same order to tokenkey</param>
        private string ReplaceUsersToken(string MessageBody, string TokenKeys, string TokenValues)
        {
            try
            {
                string[] Tokens = TokenKeys.Split(',');
                string[] Values = TokenValues.Split(',');
                int len = Tokens.Length;
                for (int i = 0; i < len; i++)
                {
                    MessageBody = MessageBody.Replace(Tokens[i], Values[i]);
                }
                return MessageBody;
            }
            catch (Exception)
            {
                return MessageBody;
            }
        }
        /// <summary>
        /// Send email to subscribe users with interest and gender filter. All system token will be replaced by real value. Replace your app token before call it.This Mail is saved in massmail table.
        /// </summary>
        /// <param name="Subject">Email Subject</param>
        /// <param name="Body">Email Body Get From Mail Template with replaced tokens</param>
        /// <param name="UserName">Current System User</param>
        /// <param name="AudienceInterests">Email target audience interest(Category). eg sports,technology etc</param>
        /// <param name="TargetGender">(eg 0,1,2) 0-Male 1-Female 2-Others</param>
        /// <param name="ToAllGender">Send to all user whose gender is either specified or not.</param>
        /// <param name="AppName">Caller App name (eg Blog,e-Commerce).</param>
        /// <returns></returns>
        public async Task<int> SendMailToSubscribeUser(string Subject, string Body, string UserName, string AudienceInterests, string TargetGender, bool ToAllGender, string AppName, string HostURL)
        {
            MassMailAddInfo objMassMail = new MassMailAddInfo();
            MassMailProvider objProvider = new MassMailProvider();
            objMassMail.MessageTitle = Subject;
            objMassMail.Gender = TargetGender;
            objMassMail.Interests = AudienceInterests;
            objMassMail.Subject = Subject;
            objMassMail.MessageBody = Body;
            objMassMail.IsInstant = true;
            objMassMail.ToAllGender = ToAllGender;
            DateTime CurrentDate = DateTime.UtcNow.ToLocalTime();
            objMassMail.TimeZoneOffset = TimeZone.CurrentTimeZone.GetUtcOffset(CurrentDate).ToString();
            objMassMail.ScheduledOn = CurrentDate.ToString();
            int status = await objProvider.AddMailByApp(objMassMail, UserName, AppName);
            if (status > 0)
                this.CallMailGateway(objMassMail.UTCScheduled, objMassMail.IsInstant, HostURL);
            return status;
        }
        public async Task<int> DeleteMassMail(string massMailID, string username)
        {
            MassMailProvider objProvider = new MassMailProvider();
            return await objProvider.DeleteMassMail(massMailID, username);
        }

        public async Task<DataSet> GetMassMailDetailForEdit(long massmailID)
        {
            MassMailProvider objProvider = new MassMailProvider();
            DataSet ds = await objProvider.GetMassMailDetailForEdit(massmailID);
            ds.Tables[0].TableName = "Mails";
            ds.Tables[1].TableName = "Interests";
            ds.Tables[2].TableName = "Genders";
            ds.Tables[3].TableName = "Users";
            ds.Tables[4].TableName = "RecipientGroup";
            ds.Tables[5].TableName = "AdvanceFilters";
            return ds;
        }
        public async Task<SendsEmail> GetMailAndUserToSendMail(string SecheduleDate)
        {
            try
            {
                MassMailProvider objProvider = new MassMailProvider();
                SendsEmail objInfo = await objProvider.GetMailAndUserToSendMail(DateTime.Parse(SecheduleDate));
                SettingHelper pagebase = new SettingHelper();
                if (objInfo.Mail != null)
                {
                    //objInfo.Mail.MessageBody = objInfo.Mail.MessageBody.Replace(MailToken.CurrnetHostURL, TokenController.GetCurrnetHostURL());
                    objInfo.Mail.MailFrom = await pagebase.GetSettingValueByIndividualKey(SettingKeys.AdminEmail);
                    objInfo.Mail.MessageBody = await this.ReplaceApplicationMailTokens(objInfo.Mail.MessageBody);
                    //objInfo.Mail.MessageBody = objInfo.Mail.MessageBody.Replace(MailToken.SiteLogo, TokenController.GetLogo());
                    objInfo.Mail.TokenKeys = MailToken.FirstName + "," +
                  MailToken.LastName + "," +
                  MailToken.UserName + "," +
                  MailToken.Email + "," + MailToken.UnsubscribeLink;
                }
                return objInfo;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<int> UpdateStausOfFailMail(long MailID, List<RequestSubscriber> Subscribers)
        {

            MassMailProvider objProvider = new MassMailProvider();
            return await objProvider.UpdateStausOfFailMail(MailID, this.CreateUserXML(Subscribers));
        }
        private string CreateUserXML(List<RequestSubscriber> lstUser)
        {
            if (lstUser.Count > 0)
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("<subscribers>");
                foreach (RequestSubscriber subcriber in lstUser)
                {
                    sb.Append("<user>");
                    sb.Append("<email>");
                    sb.Append(subcriber.EmailAddress);
                    sb.Append("</email>");
                    sb.Append("<status>");
                    sb.Append(subcriber.Status);
                    sb.Append("</status>");
                    sb.Append("</user>");
                }
                sb.Append("</subscribers>");
                return sb.ToString();
            }
            else return string.Empty;
        }
        /// <summary>
        /// This method get invoke contentder scheduler to fetch mail on schedule date and send mail.
        /// </summary>
        /// <param name="ScheduleOn"></param>
        /// <returns></returns>
        private async void SendMailFromContentder(DateTime ScheduleOn, string DomainName)
        {
            try
            {
                string scheduleOn = ScheduleOn.ToString("yyyy-MM-dd HH:mm:ss");
                FetchRest fetchRest = new FetchRest();
                SettingHelper settingHelper = new SettingHelper(_memoryCache);
                string configurecode = settingHelper.GetCachedSettingValue(SettingKeys.Configurecode);

                ClientRequestInfo clientRequest = new ClientRequestInfo();
                clientRequest.Sender = DomainName;
                clientRequest.RequestType = 1;
                clientRequest.ExecuteOn = scheduleOn;
                string PostData = JsonConvert.SerializeObject(clientRequest);
                string MassMailRequestURL = ContentderAPI.AutomatedTaskRequest;
                Uri URI = new Uri(MassMailRequestURL);
                HttpResponseMessage responseMessage = await Task.Run(() => fetchRest.PostData(DomainName, configurecode, URI, PostData));
                if (responseMessage.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var responseContent = await responseMessage.Content.ReadAsStringAsync().ConfigureAwait(false);
                    PostResponse postResponse = JsonConvert.DeserializeObject<PostResponse>(responseContent);
                    if (postResponse.Code == (int)ePostResponseCode.PackageLimitExceed)
                    {
                        MassMailProvider mailProvider = new MassMailProvider();
                        _ = mailProvider.UpdateStausOfMail(ScheduleOn, eEmailStatus.LimitExceeded);
                    }
                }
            }
            catch (Exception)
            {

            }
        }

        public string GetCurrnetHostURL
        {
            get
            {
                return _httpContextAccessor.HttpContext.Request.Scheme + "://" + _httpContextAccessor.HttpContext.Request.Host.Value;
            }
        }

        public async Task<IList<MassMailInterestInfo>> GetInterest(string Keyword)
        {
            MassMailProvider providerObj = new MassMailProvider();
            return await providerObj.GetInterest(Keyword);
        }
        /// <summary>
        /// This method replace the tokens of application such as ecommerce and blog news and return real data mail body.
        /// </summary>
        /// <param name="MailBody"></param>
        /// <returns></returns>
        public async Task<string> ReplaceApplicationMailTokens(string MailBody)
        {
            MassMailProvider providerObj = new MassMailProvider();
            IList<MethodInvokerInfo> lstMethods = await providerObj.GetAllAppMethods();
            foreach (MethodInvokerInfo objMethod in lstMethods)
            {
                MailBody = this.InvokeDynamicMethod(objMethod, MailBody);
            }
            return MailBody;
        }
        private string InvokeDynamicMethod(MethodInvokerInfo objControll, string MailBody)
        {
            string dlllocation = Path.Combine(_env.ContentRootPath, "bin\\" + objControll.NameSpace + ".dll");
            Assembly myLibrary = Assembly.LoadFile(dlllocation);
            Type type = myLibrary.GetType(objControll.NameSpace + "." + objControll.ClassName);
            object instance = Activator.CreateInstance(type, null);
            MethodInfo method = type.GetMethod(objControll.MethodName);
            object[] args = { MailBody };
            string result = (string)method.Invoke(instance, args);
            return result;
        }

        public async Task<MassMailReportInfo> GetReportByID(int MailID)
        {
            MassMailProvider providerObj = new MassMailProvider();
            return await providerObj.GetReportByID(MailID);
        }

        public async Task<IList<MassMailDeliverInfo>> GetMailReportByID(int MailID, int OffSet, int Limit, int Types)
        {
            MassMailProvider providerObj = new MassMailProvider();
            return await providerObj.GetMailReportByID(MailID, OffSet, Limit, Types);
        }
    }
}
