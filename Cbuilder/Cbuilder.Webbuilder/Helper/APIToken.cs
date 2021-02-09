using Cbuilder.Core.Constants;
using Cbuilder.Core.Helper;
using Cbuilder.Core.Helper.Models;
using Cbuilder.Core.Helper.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;

namespace Cbuilder.Webbuilder.Helper
{
    public class APIToken
    {
        private readonly string APIURL = string.Empty;
        private readonly IMemoryCache _memoryCache;

        public APIToken(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
            SettingHelper sageConfig = new SettingHelper();
            APIURL = sageConfig.GetSettingValueByIndividualKey(SettingKeys.OnlineStore).Result;
        }
        public string GetServiceToken(string securetoken, string userName)
        {
            string authToken = string.Empty;
            string sessionName = "Secret_" + securetoken;
            //if (HttpContext.Current.Session[sessionName] != null && HttpContext.Current.Session[sessionName].ToString().Length > 0)
            //{
            //    authToken = HttpContext.Current.Session[sessionName].ToString();
            //}
            //else
            //{

            Encryption objEncrypt = new Encryption();
            SettingHelper settingHelper = new SettingHelper(_memoryCache);
            string configureCode = settingHelper.GetCachedSettingValue(SettingKeys.Configurecode);
            string key = objEncrypt.GetRandomStr(24);
            Dictionary<string, object> objCollection = new Dictionary<string, object>();
            objCollection.Add("key", key);
            objCollection.Add("userToken", objEncrypt.DESEncrypt(userName, key));
            objCollection.Add("configureCodeToken", objEncrypt.DESEncrypt(configureCode, key));
            objCollection.Add("application", "cbuilder");
            authToken = GetSecureToken("token", objCollection);
            dynamic dyn = JsonConvert.DeserializeObject(authToken);
            if (dyn != null)
            {
                authToken = dyn.token.Value;
            }
            // HttpContext.Current.Session[sessionName] = authToken;
            // }
            return authToken;
        }
        public string GetSecureToken(string methodName, Dictionary<string, object> objCollection)
        {
            string result = string.Empty;
            using (WebClient client = new WebClient())
            {
                client.Headers["Content-Type"] = "application/json";
                client.Encoding = Encoding.UTF8;
                var data = Encoding.ASCII.GetBytes(DictToJson(objCollection));
                string url = APIURL + methodName;
                System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;
                System.Net.ServicePointManager.ServerCertificateValidationCallback += (se, cert, chain, sslerror) => { return true; };
                byte[] responsebytes = client.UploadData(url, "POST", data);
                result = Encoding.UTF8.GetString(responsebytes);
            }
            return result;
        }
        public object WebClientInvokerPOST(string methodName, Dictionary<string, object> objCollection, string secureToken, string userName)
        {
            string serverToken = string.Empty;// GetServiceToken(secureToken, userName);
            return WebClientInvokerPOST(methodName, objCollection, serverToken, secureToken, userName, 0);
        }
        public object WebClientInvokerPOST(string methodName, Dictionary<string, object> objCollection, string serverToken, string secureToken, string userName, int counter)
        {
            object result = null;
            using (WebClient client = new WebClient())
            {
                client.Headers["Content-Type"] = "application/json";
                client.Headers[HttpRequestHeader.Authorization] = "Bearer " + serverToken;
                client.Encoding = Encoding.UTF8;
                SettingHelper settingHelper = new SettingHelper(_memoryCache);
                string configureCode = settingHelper.GetCachedSettingValue(SettingKeys.Configurecode);
                objCollection.Add("Code", configureCode);
                var data = Encoding.ASCII.GetBytes(DictToJson(objCollection));
                string url = APIURL + methodName;
                System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;
                System.Net.ServicePointManager.ServerCertificateValidationCallback += (se, cert, chain, sslerror) => { return true; };
                byte[] responsebytes = client.UploadData(url, "POST", data);
                if (client.ResponseHeaders["Token-Expired"] != null)
                {
                    bool expired = client.ResponseHeaders["Token-Expired"].ToString() == "true" ? true : false;
                    if (expired && counter == 0)
                    {
                        serverToken = GetServiceToken(secureToken, userName);
                        return WebClientInvokerPOST(methodName, objCollection, serverToken, secureToken, userName, 1);
                    }
                    else
                    {
                        result = Encoding.UTF8.GetString(responsebytes);
                    }
                }
                else
                {
                    result = Encoding.UTF8.GetString(responsebytes);
                }
            }
            return result;
        }

        private string DictToJson(Dictionary<string, object> objCollection)
        {
            StringBuilder json = new StringBuilder();
            json.Append("{");
            for (int i = 0, length = objCollection.Count; i < length; i++)
            {
                string key = objCollection.Keys.ElementAt(i);
                json.Append(key);
                json.Append(":'");
                json.Append(objCollection[key]?.ToString() ?? "");
                json.Append("'");
                if (i < length - 1)
                    json.Append(",");
            }
            json.Append("}");
            return json.ToString();
        }

        public string APICall(string url, string  dataCollection)
        {
            string result = string.Empty;
            using (WebClient client = new WebClient())
            {
                client.Headers["Content-Type"] = "application/json";
                client.Encoding = Encoding.UTF8;
                var data = Encoding.ASCII.GetBytes(dataCollection);
                byte[] responsebytes = client.UploadData(url, "POST", data);
                result = Encoding.UTF8.GetString(responsebytes);
            }
            return result;
        }
    }
}
