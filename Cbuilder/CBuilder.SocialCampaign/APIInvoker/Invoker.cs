using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace CBuilder.SocialCampaign
{
    public class Invoker
    {

        public Invoker()
        {

        }

        /// <summary>
        /// post data to url usig httpclient
        /// </summary>
        /// <param name="httpMethod">type of request: POST or GET</param>
        /// <param name="url">url for api</param>
        /// <param name="header">list of headers to be added</param>
        /// <param name="param">request parameter</param>
        /// <returns></returns>
        public async Task<T> PostAsync<T>(string httpMethod, string url, Dictionary<string, string> headers, string param = "")
        {
            T returnObject = default;

            var ContentType = "application/json";
            using (var httpClient = new HttpClient())
            {
                httpClient.BaseAddress = new Uri(url);

                if (headers != null)
                {
                    foreach (var item in headers)
                    {
                        httpClient.DefaultRequestHeaders.Add(item.Key, item.Value);
                    }
                }

                try
                {
                    HttpResponseMessage response = null;
                    httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(ContentType));

                    if (httpMethod == "POST")
                    {
                        HttpContent content = new StringContent(param, Encoding.UTF8, ContentType);
                        response = await httpClient.PostAsync(url, content);
                    }
                    else
                    {
                        response = await httpClient.GetAsync(url);
                    }

                    if (response.StatusCode == System.Net.HttpStatusCode.OK)
                    {
                        if (response.IsSuccessStatusCode)
                        {
                            string result = response.Content.ReadAsStringAsync().Result;
                            returnObject = JsonConvert.DeserializeObject<T>(result);
                        }
                    }
                }
                catch (Exception ex)
                {
                    //ProcessException(ex);
                }
            }

            return returnObject;
        }

        /// <summary>
        /// post data to url usig httpclient
        /// </summary>
        /// <param name="httpMethod">type of request: POST or GET</param>
        /// <param name="url">url for api</param>
        /// <param name="header">list of headers to be added</param>
        /// <param name="param">request parameter in json format</param>
        /// <returns></returns>
        public async Task<string> PostAsync(string httpMethod, string url, Dictionary<string, string> headers, string param = "")
        {
            string returnData = string.Empty;

            string ContentType = "application/json";
            using (var httpClient = new HttpClient())
            {
                httpClient.BaseAddress = new Uri(url);

                if (headers != null)
                {
                    foreach (var item in headers)
                    {
                        httpClient.DefaultRequestHeaders.Add(item.Key, item.Value);
                    }
                }

                try
                {
                    HttpResponseMessage response = null;
                    httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(ContentType));

                    if (httpMethod == "POST")
                    {
                        HttpContent content = new StringContent(param, Encoding.UTF8, ContentType);
                        response = await httpClient.PostAsync(url, content);
                    }
                    else
                    {
                        response = await httpClient.GetAsync(url);
                    }

                    if (response.StatusCode == System.Net.HttpStatusCode.OK)
                    {
                        if (response.IsSuccessStatusCode)
                        {
                            returnData = response.Content.ReadAsStringAsync().Result;
                        }
                    }
                }
                catch (Exception ex)
                {
                    //ProcessException(ex);
                }
            }

            return returnData;
        }
    }
}
