using Cbuilder.Core.Constants;
using Cbuilder.Core.Constants.Enum;
using Cbuilder.Core.Helper.API;
using Cbuilder.Core.Helper.Interfaces;
using Cbuilder.Core.Helper.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.Core.Helper.Extensions
{
    public static class ProcessEx
    {
        public static async void ProcessException(this IHttpContextAccessor _httpContextAccessor, Exception ex, string urlPath)
        {
            try
            {
                LogHelper logHelper = new LogHelper(_httpContextAccessor);
                var model = new
                {
                    logHelper.LogOrigin,
                    logHelper.UrlPath,
                    HostAddress = logHelper.ClientIpAddress,
                    logHelper.UserAgent,
                    logHelper.Browser,
                    logHelper.SessionID,
                    logHelper.DomainName,
                    logHelper.ReferralURL,
                    ErrorType = "exception",
                    ex.Message,
                    ErrorDetail = ex.ToString(),
                };
                Dictionary<string, string> headerParam = new Dictionary<string, string>()
                {
                    { Headers.Scope,LoggerNames.CreateErrorLog}
                };
                var rs = await PostDataAsync(model, APIURL.LoggerBaseUri + APIScope.LoggerLog + LoggerNames.CreateLog, headerParam);
            }
            catch (Exception exception)
            {
                _httpContextAccessor.ShowMessage(exception.ToString(), MessageType.Error);
                ProcessExceptionsToFile(_httpContextAccessor, ex);
            }
        }

        public static async void ProcessExceptionsToFile(this IHttpContextAccessor _httpContextAccessor, Exception ex)
        {

            //if (CurrentHostEnvironment.IsDevelopment)
            //{
            //    // throw new Exception(ex.ToString());
            //}
            //else
            //{
            //    try
            //    {
            string folderName = Path.Combine(CurrentHostEnvironment.WebRootPath, "CbuilderLogs");
            if (!Directory.Exists(folderName))
                Directory.CreateDirectory(folderName);
            string logFilePath = Path.Combine(folderName, "Logs_" + DateTime.Now.ToString("yyyy_MMM_dd_HH_mm_ss_fffffff") + ".txt");
            await using (StreamWriter streamWriter = new StreamWriter(System.IO.File.Open(logFilePath, FileMode.OpenOrCreate)))
            {
                await streamWriter.WriteAsync(ex.ToString());
            }
        }
        private static async Task<HttpResponseMessage> PostDataAsync(object jsonContent, string apiPath, Dictionary<string, string> headerParam, bool addClientHeader = false)
        {
            HttpClient httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add(Headers.ClientID, Common.ClientID);
            httpClient.DefaultRequestHeaders.Add(Headers.SecreteToken, Common.ClientSecretKey);
            if (headerParam != null && headerParam.Count > 0)
            {
                foreach (KeyValuePair<string, string> keyValue in headerParam)
                {
                    httpClient.DefaultRequestHeaders.Add(keyValue.Key, keyValue.Value);
                }
            }
            string json = System.Text.Json.JsonSerializer.Serialize(jsonContent);
            HttpContent content = new StringContent(json, Encoding.UTF8, Headers.ApplicationJson);
            return await httpClient.PostAsync(apiPath, content);
        }
    }
}