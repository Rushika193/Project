using Cbuilder.Core.Constants;
using Cbuilder.Core.Helper.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cbuilder.Core.Helper.Extensions
{
    public static class ApplicationInitExtensions
    {

        /// <summary>
        /// Helps to load the settings key value in the memory
        /// </summary>
        /// <param name="app">Application pipleline where the setting is to be initiated.</param>
        /// <param name="memoryCache">In Memory where the values needed to be store</param>
        public static async Task CbuilderInitialTasks(this IApplicationBuilder app, IMemoryCache memoryCache, IWebHostEnvironment hostingEnvironment, IHttpContextAccessor httpContextAccessor)
        {

            SettingHelper settingHelper = new SettingHelper(memoryCache);
            Dictionary<string, string> settingValues = settingHelper.GetSettingValuesByKeys(string.Format("{0},{1},{2},{3},{4},{5},{6}",
                SettingKeys.ClientID,
                SettingKeys.ClientSecretKey,
                SettingKeys.IdentityUrl,
                SettingKeys.LoggerApiGatewayUrl,
                SettingKeys.CampaignBaseUri,
                SettingKeys.ApiGatewayBaseUri,
                SettingKeys.PaymentGatewayBaseUri
                ));
            CurrentHostEnvironment.WebRootPath = hostingEnvironment.WebRootPath;
            CurrentHostEnvironment.ContentRootPath = hostingEnvironment.ContentRootPath;
            CurrentHostEnvironment.IsDevelopment = hostingEnvironment.IsDevelopment();
            CurrentHostEnvironment.IsProduction = hostingEnvironment.IsProduction();
            CurrentHostEnvironment.IsStaging = hostingEnvironment.IsStaging();
            Common.ClientID = settingValues[SettingKeys.ClientID];
            Common.ClientSecretKey = settingValues[SettingKeys.ClientSecretKey];
            settingHelper.CacheAllSettings();
            ////Reading particular settings from caches
            APIURL.IdentityBaseUri = settingValues[SettingKeys.IdentityUrl];
            APIURL.LoggerBaseUri = settingValues[SettingKeys.LoggerApiGatewayUrl];
            APIURL.CampaignBaseUri = settingValues[SettingKeys.CampaignBaseUri];
            APIURL.PaymentGatewayUri = settingValues[SettingKeys.PaymentGatewayBaseUri];
            APIURL.ApiGatewayBaseUri = settingValues[SettingKeys.ApiGatewayBaseUri];
        }
    }
}
