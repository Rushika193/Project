using Cbuilder.MandrilMailHelper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;

namespace Cbuilder.ManageMassMail
{
    internal class MandrillMailController
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IHostEnvironment _env;
        private readonly IMemoryCache _memoryCache;
        public MandrillMailController(IHttpContextAccessor httpContextAccessor, IHostEnvironment env, IMemoryCache memoryCache)
        {
            _httpContextAccessor = httpContextAccessor;
            _env = env;
            _memoryCache = memoryCache;
        }
        public async void SendMailFromMandril(DateTime SecheduleDate, bool IsInstant)
        {
            MassMailHelper conMassMail = new MassMailHelper(_httpContextAccessor, _env, _memoryCache);
            SendsEmail sendsEmail = await conMassMail.GetMailAndUserToSendMail(SecheduleDate.ToString());
            MailSendInfo mail = sendsEmail.Mail;
            List<MailMergeVar> lstMergeVars = new List<MailMergeVar>();
            EmailMessage message = new EmailMessage();
            if (mail != null)
            {
                message.from_email = mail.MailFrom;
                message.from_name = mail.MailFrom;
                message.subject = mail.Subject;
                List<EmailAddress> toEmails = new List<EmailAddress>();
                message.html = this.ConvertAllMergeTagsToMandrillsTags(mail.MessageBody);
                foreach (UserInfo subcriber in sendsEmail.Subscribers)
                {
                    if (!string.IsNullOrEmpty(subcriber.EmailAddress))
                    {
                        toEmails.Add(new EmailAddress(subcriber.EmailAddress, subcriber.FullName, "to"));
                        lstMergeVars.Add(new MailMergeVar { rcpt = subcriber.EmailAddress, vars = this.GetSubscriberMergeVars(subcriber.TokenValues, mail.TokenKeys) });
                    }
                }
                message.to = toEmails;
                message.merge_vars = lstMergeVars;
                FinalEmail finalEmail = new FinalEmail();
                finalEmail.async = true;
                finalEmail.message = message;

                if (!IsInstant)
                    finalEmail.send_at = SecheduleDate.ToString(MandrilConfiguration.DATE_TIME_FORMAT_STRING);
                string ApiKey = await MailSettingController.GetSettingByKey(MailSettingKey.MandrilAPIKey);
                MandrilHelper mandrilMailHelper = new MandrilHelper(ApiKey);
                List<EmailResult> emailResults = await mandrilMailHelper.SendMessage(finalEmail);
                MassMailProvider massMailProvider = new MassMailProvider();
                if (emailResults != null)
                {
                    await massMailProvider.UpdateStausOfFailMail(mail.MassMailID, string.Empty);
                    foreach (EmailResult objResult in emailResults)
                    {
                        await massMailProvider.AddMailSubscriberStatus(mail.MassMailID, objResult.Email, (int)objResult.Status, 1, objResult.RejectReason);
                    }
                }
            }
        }
        /// <summary>
        /// Retruns Merge var for Mandril API
        /// </summary>
        /// <returns></returns>
        private List<SubscriberMergeVar> GetSubscriberMergeVars(string TokenValues, string TokenKeys)
        {
            List<SubscriberMergeVar> objVars = new List<SubscriberMergeVar>();
            string[] Tokens = TokenKeys.Split(',');
            string[] Values = TokenValues.Split(',');
            int len = Tokens.Length;
            for (int i = 0; i < len; i++)
            {
                SubscriberMergeVar obj = new SubscriberMergeVar();
                obj.name = Tokens[i].Replace("#{", "").Replace("}#", "");
                obj.content = Values[i];
                objVars.Add(obj);
            }
            return objVars;
        }
        private string ConvertAllMergeTagsToMandrillsTags(string Body)
        {
            Body = Body.Replace("#{", "*|").Replace("}#", "|*");
            return Body;
        }
    }
}
