using Cbuilder.Core.API.Enum;
using Cbuilder.Core.Constants;
using Cbuilder.Core.Constants.Enum;
using Cbuilder.Core.Helper.Classes.Models;
using Cbuilder.Core.Helper.Extensions; 
using Cbuilder.Core.Helper.Interfaces;
using Cbuilder.Core.Helper.Models;
using Cbuilder.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
using System.Security.Cryptography.X509Certificates;
using System.Net.Security;

namespace Cbuilder.Core.Helper.API
{
    public class ApiClient : IApiClient
    {
       
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ApiClient(
           
            SignInManager<ApplicationUser> signInManager,
            IHttpContextAccessor httpContextAccessor
            )
        {
           
            _signInManager = signInManager;
            _httpContextAccessor = httpContextAccessor;
        }


        private HttpClient _httpClient;
        //public ApiClient(string baseEndpoint) =>
        //    BaseEndpoint = baseEndpoint ?? throw new ArgumentNullException("baseEndpoint is null");

        public async Task PostVoidAsync(object jsonContent, string apiPath)
        {
            var result = string.Empty;
            try
            {
                _httpClient = new HttpClient();
                //if (addClientHeader)
                AddClientIdentity(ref _httpClient);
                //if (accessToken)
                //AddAccessToken(ref _httpClient);
                //AddHeaders(headerParam, ref _httpClient);
                _httpClient.BaseAddress = new Uri(apiPath);
                HttpContent content = CreateHttpContent<object>(jsonContent);
                HttpResponseMessage response = await _httpClient.PostAsync(apiPath, content);
                response.EnsureSuccessStatusCode();
            }
            catch (Exception ex)
            {
                _httpContextAccessor.ProcessExceptionsToFile(ex);
            }
        }
        public async Task LogVoidAsync(object jsonContent, string apiPath)
        {
            var result = string.Empty;
            try
            {
                _httpClient = new HttpClient();
                //if (addClientHeader)
                AddClientIdentity(ref _httpClient);
                //if (accessToken)
                AddAccessToken(ref _httpClient);
                //AddHeaders(headerParam, ref _httpClient);
                _httpClient.BaseAddress = new Uri(apiPath);
                HttpContent content = CreateHttpContent<object>(jsonContent);
                HttpResponseMessage response = await _httpClient.PostAsync(apiPath, content);
                response.EnsureSuccessStatusCode();
            }
            catch
            {
                // ProcessException(ex, apiPath);
            }
        }


        public async Task<HttpResponseMessage> GetAsyncHttpResponse(string apiPath)
        {

            HttpResponseMessage response = null;
            try
            {
                _httpClient = new HttpClient();
                //if (addClientHeader)
                AddClientIdentity(ref _httpClient);
                //if (accessToken)
                AddAccessToken(ref _httpClient);
                //AddHeaders(headerParam, ref _httpClient);
                _httpClient.BaseAddress = new Uri(apiPath);
                response = await _httpClient.GetAsync(apiPath);
            }
            catch (Exception ex)
            {
                _httpContextAccessor.ProcessExceptionsToFile(ex);
            }
            return response;
        }


        #region "GetSync"
        public async Task<T> GetAsync<T>()
        {
            return await GetAsyncResult<T>(string.Empty, new Dictionary<string, string>(), true, true);
        }
        public async Task<T> GetAsync<T>(string apiPath)
        {
            return await GetAsyncResult<T>(apiPath, new Dictionary<string, string>(), true, true);
        }
        public async Task<T> GetAsync<T>(string apiPath, bool addClientHeader = false, bool accessToken = false)
        {
            return await GetAsyncResult<T>(apiPath, new Dictionary<string, string>(), addClientHeader, accessToken);
        }
        public async Task<T> GetAsync<T>(string apiPath, Dictionary<string, string> headerParam, bool addClientHeader = false, bool accessToken = false)
        {
            return await GetAsyncResult<T>(apiPath, headerParam, addClientHeader, accessToken);
        }
        private async Task<T> GetAsyncResult<T>(string apiPath, Dictionary<string, string> headerParam, bool addClientHeader = false, bool accessToken = false)
        {
            var result = string.Empty;
            HttpResponseMessage response = null;
            try
            {
                _httpClient = new HttpClient();
                if (addClientHeader)
                    AddClientIdentity(ref _httpClient);
                if (accessToken)
                    AddAccessToken(ref _httpClient);
                AddHeaders(headerParam, ref _httpClient);
                _httpClient.BaseAddress = new Uri(apiPath);
                response = await _httpClient.GetAsync(apiPath);
                //                _httpContext.Message("ola", MessageType.Error);
                switch (response.StatusCode)
                {
                    case HttpStatusCode.OK:
                        result = response.Content.ReadAsStringAsync().Result;
                        break;
                    case HttpStatusCode.Unauthorized:
                        await ResetToken();
                        result = await ContinueExecution(string.Empty, apiPath, PostTypes.GET);
                        break;
                }

            }
            catch (Exception ex)
            {
                _httpContextAccessor.ShowMessage(ex.ToString(), MessageType.Error);
                _httpContextAccessor.ProcessExceptionsToFile(ex);
            }
            finally
            {
                response.Dispose();
            }
            return JsonConvert.DeserializeObject<T>(result);
        }
        #endregion

        #region "PostAsync"
        public async Task<T> PostAsync<T>(object jsonContent)
        {
            return await PostAsyncResult<T>(jsonContent, "", new Dictionary<string, string>(), false, false);
        }
        public async Task<T> PostAsync<T>(object jsonContent, string apiPath)
        {
            return await PostAsyncResult<T>(jsonContent, apiPath, new Dictionary<string, string>(), true, true);
        }
        public async Task<T> PostAsync<T>(object jsonContent, string apiPath, bool addClientHeader = false, bool accessToken = false)
        {
            return await PostAsyncResult<T>(jsonContent, apiPath, new Dictionary<string, string>(), addClientHeader, accessToken);
        }
        public async Task<T> PostAsync<T>(object jsonContent, string apiPath, Dictionary<string, string> headerParam, bool addClientHeader = false, bool accessToken = false)
        {
            return await PostAsyncResult<T>(jsonContent, apiPath, headerParam, addClientHeader, accessToken);
        }

        private async Task<T> PostAsyncResult<T>(object jsonContent, string apiPath, Dictionary<string, string> headerParam, bool addClientHeader = false, bool accessToken = false)
        {
            var result = string.Empty;
            HttpResponseMessage response = null;
            HttpContent content = null;
            try
            {
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                ServicePointManager.ServerCertificateValidationCallback += (se, cert, chain, sslerror) => { return true; };
                _httpClient = new HttpClient();
                if (addClientHeader)
                    AddClientIdentity(ref _httpClient);
                if (accessToken)
                    AddAccessToken(ref _httpClient);
                AddHeaders(headerParam, ref _httpClient);
                _httpClient.BaseAddress = new Uri(apiPath);
                content = CreateHttpContent<object>(jsonContent);
                response = await _httpClient.PostAsync(apiPath, content);
                    switch (response.StatusCode)
                {
                    case HttpStatusCode.OK:
                        result = response.Content.ReadAsStringAsync().Result;
                        break;
                    case HttpStatusCode.Unauthorized:
                        UserAuthenticateResponse objResult = JsonConvert.DeserializeObject<UserAuthenticateResponse>(await response.Content.ReadAsStringAsync());
                        switch (objResult.StatusCode)
                        {
                            case StatusCode.TokenExpired:
                                await ResetToken();
                                result = await ContinueExecution(jsonContent, apiPath, PostTypes.POST);
                                break;
                            case StatusCode.FieldMissing:
                                break;
                            case StatusCode.NotAllowed:
                                _httpContextAccessor.ShowMessage(Messages.ResourceNotAllowed, MessageType.Error);
                                break;
                            case StatusCode.BadRequest:
                                _httpContextAccessor.ShowMessage(Messages.BadRequest, MessageType.Error);
                                break;
                            case StatusCode.Unauthorized:
                                _httpContextAccessor.ShowMessage(Messages.Unauthorized, MessageType.Error);
                                break;
                            default:
                                break;
                        }
                        break;
                }

            }
            catch (Exception ex)
            {
                _httpContextAccessor.ShowMessage(ex.ToString(), MessageType.Error);
                _httpContextAccessor.ProcessExceptionsToFile(ex);
            }
            finally
            {
                content?.Dispose();
                response?.Dispose();
            }
            return JsonConvert.DeserializeObject<T>(result);
        }

        #endregion
        private async Task<string> ContinueExecution(object jsonContent, string apiPath, PostTypes postType)
        {
            var result = string.Empty;
            _httpClient = new HttpClient();
            var claim = _httpContextAccessor.HttpContext.User.Claims.First(c => c.Type == ConstantString.AccessToken);
            string accessToken = claim.Value;
            if (!string.IsNullOrEmpty(accessToken))
                _httpClient.DefaultRequestHeaders.Add(ConstantString.AccessToken, accessToken);
            _httpClient.DefaultRequestHeaders.Add(Headers.ClientID, Common.ClientID);
            _httpClient.DefaultRequestHeaders.Add(Headers.SecreteToken, Common.ClientSecretKey);
            _httpClient.BaseAddress = new Uri(apiPath);
            if (PostTypes.GET == postType)
            {
                HttpResponseMessage response = await _httpClient.GetAsync(apiPath);
                switch (response.StatusCode)
                {
                    case HttpStatusCode.OK:
                        result = response.Content.ReadAsStringAsync().Result;
                        break;
                }
                response.Dispose();
            }
            else
            {
                HttpContent content = CreateHttpContent<object>(jsonContent);
                HttpResponseMessage response = await _httpClient.PostAsync(apiPath, content);
                switch (response.StatusCode)
                {
                    case HttpStatusCode.OK:
                        result = response.Content.ReadAsStringAsync().Result;
                        break;
                }
                content.Dispose();
                response.Dispose();
            }
            return result;
        }
        private HttpContent CreateHttpContent<T>(T content)
        {
            var json = System.Text.Json.JsonSerializer.Serialize(content);
            return new StringContent(json, Encoding.UTF8, Headers.ApplicationJson);
        }
        private void AddAccessToken(ref HttpClient httpClient_)
        {
            string accessToken = _httpContextAccessor.HttpContext.User.GetClaimValue(ConstantString.AccessToken);
            httpClient_.DefaultRequestHeaders.Add(Headers.AccessToken, accessToken);
        }
        private void AddClientIdentity(ref HttpClient httpClient_)
        {
            httpClient_.DefaultRequestHeaders.Add(Headers.ClientID, Common.ClientID);
            httpClient_.DefaultRequestHeaders.Add(Headers.SecreteToken, Common.ClientSecretKey);
        }
        private void AddHeaders(Dictionary<string, string> headerParam, ref HttpClient httpClient_)
        {
            //_httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(Headers.ApplicationJson));
            if (headerParam.Count > 0)
            {
                foreach (KeyValuePair<string, string> keyValue in headerParam)
                {
                    httpClient_.DefaultRequestHeaders.Add(keyValue.Key, keyValue.Value);
                }
            }
        }
        private async Task ResetToken()
        {
            HttpClient httpClient = new HttpClient();
            string accessToken = _httpContextAccessor.HttpContext.User.GetClaimValue(ConstantString.AccessToken);
            httpClient.DefaultRequestHeaders.Add(ConstantString.AccessToken, accessToken);
            httpClient.DefaultRequestHeaders.Add(Headers.ClientID, Common.ClientID);
            httpClient.DefaultRequestHeaders.Add(Headers.SecreteToken, Common.ClientSecretKey);
            string refreshToken = _httpContextAccessor.HttpContext.User.GetClaimValue(ConstantString.RefreshToken);
            httpClient.DefaultRequestHeaders.Add(ConstantString.RefreshToken, refreshToken);
            string url = APIURL.IdentityBaseUri + IdentityAPI.Account.RefreshAccessToken;
            httpClient.BaseAddress = new Uri(url);
            var objToken = new
            {
                UserName = _httpContextAccessor.HttpContext.User.Identity.Name
            };
            HttpContent content = CreateHttpContent<object>(objToken);
            HttpResponseMessage response = await httpClient.PostAsync(url, content);
            UserAuthenticateResponse userAuth = JsonConvert.DeserializeObject<UserAuthenticateResponse>(response.Content.ReadAsStringAsync().Result);
            if (userAuth.IsAuthenticate)
            {

                ApplicationUser user = new ApplicationUser()
                {
                    AccessToken = userAuth.AccessToken,
                    UsersRoles = userAuth.UsersRoles,
                    RefreshToken = userAuth.RefreshToken,
                    UserID = userAuth.UserID,
                    UserName = _httpContextAccessor.HttpContext.User.Identity.Name,
                    Email = _httpContextAccessor.HttpContext.User.Identity.Name,
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = false,
                    //PasswordHash = model.Password,
                    //PhoneNumber = "111-222-3344",
                    SecurityStamp = Guid.NewGuid().ToString() //THIS IS WHAT I NEEDED

                };
                //updating the current claim for continuous process
                _httpContextAccessor.HttpContext.User.AddUpdateClaim(ConstantString.AccessToken, userAuth.AccessToken);
                //updating the current claim for refreshUser
                await _signInManager.RefreshSignInAsync(user);
            }
        }
    }
}
