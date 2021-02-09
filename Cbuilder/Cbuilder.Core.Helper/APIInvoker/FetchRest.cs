using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

namespace Cbuilder.Core.Helper.APIInvoker
{
    public class FetchRest
    {

        public string Method { get; set; } = "POST";
        public string ContentType { get; set; } = "application/json";
        public string UserAgent { get; set; } = string.Empty;
        public int TimeOut { get; set; } = -1;

        public bool UseEncoding { get; set; } = false;
        public Encoding Encoding { get; set; } = Encoding.UTF8;

        public FetchRest() { }
        private string GetResponse(HttpWebRequest httpWebRequest)
        {
            string jsonResult = string.Empty;
            WebResponse httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();

            using (Stream stream = httpResponse.GetResponseStream())
            {
                using StreamReader reader = new StreamReader(stream, Encoding);
                jsonResult = reader.ReadToEnd();
            }

            return jsonResult;
        }
        public string GetData(string url, string message)
        {
            try
            {
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
                httpWebRequest.ContentType = ContentType;
                httpWebRequest.Method = Method;
                if (UserAgent != string.Empty)
                    httpWebRequest.UserAgent = UserAgent;

                if (TimeOut > -1)
                    httpWebRequest.Timeout = TimeOut;

                if (message != string.Empty)
                    using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                    { streamWriter.Write(message); }

                string jsonResult = GetResponse(httpWebRequest);
                return jsonResult;
            }
            catch { return String.Empty; }


        }
        public HttpResponseMessage PostData(string UserName, string Password, Uri RequestURI, string JsonPostData)
        {
            using var httpClient = new HttpClient();
            try
            {
                httpClient.BaseAddress = RequestURI;
                var byteArray = Encoding.ASCII.GetBytes(UserName + ":" + Password);
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpContent content = new StringContent(JsonPostData, UTF8Encoding.UTF8, "application/json");
                HttpResponseMessage response = httpClient.PostAsync(RequestURI, content).Result;
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
