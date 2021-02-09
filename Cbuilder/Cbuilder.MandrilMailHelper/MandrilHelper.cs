using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.MandrilMailHelper
{
    public class MandrilHelper
    {
        private string _APIKey;
        private bool UseHttps = false;
        public MandrilHelper(string APIKey, bool useHttps = false, bool useStatic = false)
        {
            this._APIKey = APIKey;
            this.UseHttps = useHttps;
            if (useHttps && useStatic)
                baseUrl = MandrilConfiguration.BASE_STATIC_SECURE_URL;
            else if (useHttps && !useStatic)
                baseUrl = MandrilConfiguration.BASE_SECURE_URL;
            else if (!useHttps && useStatic)
                baseUrl = MandrilConfiguration.BASE_STATIC_URL;
            else
                baseUrl = MandrilConfiguration.BASE_URL;


            _httpClient = new HttpClient
            {
                BaseAddress = new Uri(baseUrl)
            };
        }
        private readonly string baseUrl;
        HttpClient _httpClient;
        public async void SendMandrillMessage(EMailInfo objMail)
        {
            try
            {
                EmailMessage message = new EmailMessage();
                message.from_email = objMail.EmailFrom;
                message.from_name = objMail.FromName;
                message.html = objMail.MailBody;
                message.subject = objMail.Subject;
                List<EmailAddress> toEmails = new List<EmailAddress>();
                EmailAddress ts = new EmailAddress(objMail.EmailTo, objMail.ToName);
                toEmails.Add(ts);
                message.to = toEmails;
                FinalEmail finalEmail = new FinalEmail();
                if (!objMail.IsInstant)
                    finalEmail.send_at = objMail.ScheduleOn.ToString(MandrilConfiguration.DATE_TIME_FORMAT_STRING);
                List<EmailResult> results = await SendMessage(finalEmail);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<EmailResult>> SendMessage(FinalEmail finalEmail)
        {
            finalEmail.key = _APIKey;
            string path = "messages/send.json";
            try
            {
                string requestContent;
                try
                {
                    requestContent = JsonConvert.SerializeObject(finalEmail);
                }
                catch (JsonException ex)
                {
                    throw ex;
                }

                var response =
                  await
                    _httpClient.PostAsync(
                        path,
                        new StringContent(requestContent, Encoding.UTF8, "application/json"))
                      .ConfigureAwait(false);

                var responseContent = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                List<EmailResult> lstResult = JsonConvert.DeserializeObject<List<EmailResult>>(responseContent);

                return lstResult;
            }
            catch (TimeoutException ex)
            {
                throw new TimeoutException(string.Format("Post timed out to {0}", path), ex);
            }
        }
    }

}