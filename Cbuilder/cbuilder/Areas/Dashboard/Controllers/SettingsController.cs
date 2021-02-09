using System;
using System.Buffers;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;
using Cbuilder.Core.Constants.Enum;
using Cbuilder.Core.Controllers;
using Cbuilder.Core.Helper.Classes.Models;
using Cbuilder.Core.Helper.Interfaces;
using Cbuilder.Core.InMemory;
using Cbuilder.Core.Settings;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json.Linq;
using Cbuilder.Core.Constants;

namespace Cbuilder.Areas.Dashboard.Controllers
{
    [Area("Dashboard")]
    public class SettingsController : AdminController
    {
        private readonly IMemoryCache _cache;
        private readonly IApiClient _apiClient;
        private readonly IEmailSender _emailSender;
        //private readonly ICbuilderCache _cache;
        public SettingsController(IEmailSender emailSender, IApiClient apiClient, IMemoryCache memoryCache, IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
            _apiClient = apiClient;
            _cache = memoryCache;
            _emailSender = emailSender;
        }
        //public SettingsController(ICbuilderCache memoryCache, IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        //{
        //    _cache = memoryCache;
        //}


        //[HttpGet]
        //public async Task<ActionResult> Basic()
        //{
        //    AddJS("Settings", "/admin/js/settings.js");

        //    string userRole = UsersRoles;
        //    bool isSuperAdmin = userRole.ToLowerInvariant().Contains("super admin");
        //    ViewBag.IsSuperAdmin = isSuperAdmin;


        //    Dictionary<string, Settings> settings = new Dictionary<string, Settings>();
        //    SettingManager settingController = new SettingManager();
        //    string settingValue = await settingController.GetAdminSettings();
        //    await LoadOauth();
        //    if (!string.IsNullOrEmpty(settingValue))
        //    {

        //        settings = Deserialize(settingValue);

        //    }

        //    return View(settings);
        //}

        [HttpGet]
        public async Task<ActionResult> Basic()
        {

            string userRole = UsersRoles;
            bool isSuperAdmin = userRole.ToLowerInvariant().Contains("super admin");
            ViewBag.IsSuperAdmin = isSuperAdmin;
            ViewBag.IsBasicActive = true;


            List<string> lstBasicKeys = new List<string>
            {
                SettingKeys.AdminEmail
            };

            string json = Newtonsoft.Json.JsonConvert.SerializeObject(lstBasicKeys);

            Dictionary<string, Settings> settings = new Dictionary<string, Settings>();
            SettingManager settingController = new SettingManager();
            string settingValue = await settingController.GetAdminSettings(json);
            await LoadOauth();
            if (!string.IsNullOrEmpty(settingValue))
            {

                settings = Deserialize(settingValue);

            }

            List<SettingSection> lstSections = new List<SettingSection>();

            SettingSection settingSection2 = new SettingSection
            {
                SectionName = "Emails",
                SettingItems = new List<SettingItem>
                {
                    new SettingItem{
                        SettingKey=SettingKeys.AdminEmail,
                        SettingLabel="Admin Email",
                        IsCacheable=settings[SettingKeys.AdminEmail].IsCacheable,
                        SettingValue=settings[SettingKeys.AdminEmail].Value,
                        InputType=SettingInputType.TextBox
                    }
                }
            };
            lstSections.Add(settingSection2);


            return await CommonSetting(lstSections);
        }

        [HttpGet]
        public async Task<ActionResult> Advanced()
        {

            string userRole = UsersRoles;
            bool isSuperAdmin = userRole.ToLowerInvariant().Contains("super admin");
            ViewBag.IsSuperAdmin = isSuperAdmin;
            ViewBag.IsBasicActive = false;

            List<string> lstAdvancedKeys = new List<string>
            {
                SettingKeys.OptimizeAssets,

                SettingKeys.SMTPServer,
                SettingKeys.SMTPUserName,
                SettingKeys.SMTPPassword,
                SettingKeys.SMTPSSlEnabled,

                SettingKeys.ClientID,
                SettingKeys.ClientSecretKey,

                SettingKeys.EncryptionKey,
                SettingKeys.GUID,
                SettingKeys.ServerCookieExpiration,


                SettingKeys.IdentityUrl,
                SettingKeys.LoggerApiGatewayUrl,
                SettingKeys.APKBuilderHostURL,
                SettingKeys.OnlineStore,
                SettingKeys.DigiSphereApi

            };

                

            string json = Newtonsoft.Json.JsonConvert.SerializeObject(lstAdvancedKeys);

            Dictionary<string, Settings> settings = new Dictionary<string, Settings>();
            SettingManager settingController = new SettingManager();
            string settingValue = await settingController.GetAdminSettings(json);
            if (!string.IsNullOrEmpty(settingValue))
            {

                settings = Deserialize(settingValue);

            }

            List<SettingSection> lstSections = new List<SettingSection>();

            //SettingSection settingSection1 = new SettingSection
            //{
            //    SectionName = "FTP",
            //    SettingItems = new List<SettingItem>
            //    {
            //        new SettingItem{
            //            SettingKey=SettingKeys.FtpServer,
            //            SettingLabel="Server",
            //            IsCacheable=settings[SettingKeys.FtpServer].IsCacheable,
            //            SettingValue=settings[SettingKeys.FtpServer].Value,
            //            InputType=SettingInputType.TextBox
            //        },
            //        new SettingItem
            //        {
            //            SettingKey=SettingKeys.FtpPort,
            //            SettingLabel="Port",
            //            IsCacheable=settings[SettingKeys.FtpPort].IsCacheable,
            //            SettingValue=settings[SettingKeys.FtpPort].Value,
            //            InputType=SettingInputType.TextBox
            //        },
            //         new SettingItem{
            //            SettingKey=SettingKeys.FtpUserName,
            //            SettingLabel="Username",
            //            IsCacheable=settings[SettingKeys.FtpUserName].IsCacheable,
            //            SettingValue=settings[SettingKeys.FtpUserName].Value,
            //            InputType=SettingInputType.TextBox
            //        },
            //        new SettingItem
            //        {
            //            SettingKey=SettingKeys.FtpPassword,
            //            SettingLabel="Password",
            //            IsCacheable=settings[SettingKeys.FtpPassword].IsCacheable,
            //            SettingValue=settings[SettingKeys.FtpPassword].Value,
            //            InputType=SettingInputType.TextBox
            //        }
            //    }

            //};
            //lstSections.Add(settingSection1);

            SettingSection settingSection1 = new SettingSection
            {
                SectionName = "Optimize Assets",
                SettingItems = new List<SettingItem>
                {
                    new SettingItem{
                        SettingKey=SettingKeys.OptimizeAssets,
                        SettingLabel="Optimize Assets",
                        IsCacheable=settings[SettingKeys.OptimizeAssets].IsCacheable,
                        SettingValue=settings[SettingKeys.OptimizeAssets].Value,
                        InputType=SettingInputType.CheckBox
                    }
                }
            };
            lstSections.Add(settingSection1);
            SettingSection settingSection2 = new SettingSection
            {
                SectionName = "SMTP",
                CustomButtons= @"<div class='sfButtonwrapper'>
                                    <button type='button' class='btn primary btnSaveSettings'>Save</button>
								    <button type='button' class='btn primary' id='btnSaveAndTestSMTP'>Save & Test</button>
                                </div>
                                ",
                SettingItems = new List<SettingItem>
                {
                    new SettingItem {
                        SettingKey = SettingKeys.SMTPServer,
                        SettingLabel = "Server",
                        IsCacheable = settings[SettingKeys.SMTPServer].IsCacheable,
                        SettingValue = settings[SettingKeys.SMTPServer].Value,
                        InputType = SettingInputType.TextBox
                    },
                    new SettingItem {
                        SettingKey = SettingKeys.SMTPUserName,
                        SettingLabel = "Username",
                        IsCacheable = settings[SettingKeys.SMTPUserName].IsCacheable,
                        SettingValue = settings[SettingKeys.SMTPUserName].Value,
                        InputType = SettingInputType.TextBox
                    },
                    new SettingItem
                    {
                        SettingKey = SettingKeys.SMTPPassword,
                        SettingLabel = "Password",
                        IsCacheable = settings[SettingKeys.SMTPPassword].IsCacheable,
                        SettingValue = settings[SettingKeys.SMTPPassword].Value,
                        InputType = SettingInputType.TextBox
                    },
                    new SettingItem
                    {
                        SettingKey = SettingKeys.SMTPSSlEnabled,
                        SettingLabel = "Is SSL Enabled?",
                        IsCacheable = settings[SettingKeys.SMTPSSlEnabled].IsCacheable,
                        SettingValue = settings[SettingKeys.SMTPSSlEnabled].Value,
                        InputType = SettingInputType.CheckBox
                    }
                }

            };
            lstSections.Add(settingSection2);


            SettingSection settingSection3 = new SettingSection
            {
                SectionName = "Client",
                SettingItems = new List<SettingItem>
                {
                    new SettingItem{
                        SettingKey=SettingKeys.ClientID,
                        SettingLabel="ClientID",
                        IsCacheable=settings[SettingKeys.ClientID].IsCacheable,
                        SettingValue=settings[SettingKeys.ClientID].Value,
                        InputType=SettingInputType.TextBox
                    },
                    new SettingItem
                    {
                        SettingKey=SettingKeys.ClientSecretKey,
                        SettingLabel="Client Secret Key",
                        IsCacheable=settings[SettingKeys.ClientSecretKey].IsCacheable,
                        SettingValue=settings[SettingKeys.ClientSecretKey].Value,
                        InputType=SettingInputType.TextBox
                    }
                }

            };
            lstSections.Add(settingSection3);

            SettingSection settingSection4 = new SettingSection
            {
                SectionName = "Security",
                SettingItems = new List<SettingItem>
                {
                    new SettingItem{
                        SettingKey=SettingKeys.EncryptionKey,
                        SettingLabel="Encryption Key",
                        IsCacheable=settings[SettingKeys.EncryptionKey].IsCacheable,
                        SettingValue=settings[SettingKeys.EncryptionKey].Value,
                        InputType=SettingInputType.TextBox
                    },
                    new SettingItem
                    {
                        SettingKey=SettingKeys.GUID,
                        SettingLabel="GUID",
                        IsCacheable=settings[SettingKeys.GUID].IsCacheable,
                        SettingValue=settings[SettingKeys.GUID].Value,
                        InputType=SettingInputType.TextBox
                    }
                    ,
                    new SettingItem
                    {
                        SettingKey=SettingKeys.ServerCookieExpiration,
                        SettingLabel="Server Cookie Expiration",
                        IsCacheable=settings[SettingKeys.ServerCookieExpiration].IsCacheable,
                        SettingValue=settings[SettingKeys.ServerCookieExpiration].Value,
                        InputType=SettingInputType.TextBox
                    }
                }

            };
            lstSections.Add(settingSection4);

            SettingSection settingSection5 = new SettingSection
            {
                SectionName = "API",
                SettingItems = new List<SettingItem>
                {
                    new SettingItem{
                        SettingKey=SettingKeys.IdentityUrl,
                        SettingLabel="Identity URL",
                        IsCacheable=settings[SettingKeys.IdentityUrl].IsCacheable,
                        SettingValue=settings[SettingKeys.IdentityUrl].Value,
                        InputType=SettingInputType.TextBox
                    },
                    new SettingItem
                    {
                        SettingKey=SettingKeys.LoggerApiGatewayUrl,
                        SettingLabel="Logger Gateway URL",
                        IsCacheable=settings[SettingKeys.LoggerApiGatewayUrl].IsCacheable,
                        SettingValue=settings[SettingKeys.LoggerApiGatewayUrl].Value,
                        InputType=SettingInputType.TextBox
                    }
                    ,
                    new SettingItem
                    {
                        SettingKey=SettingKeys.APKBuilderHostURL,
                        SettingLabel="APK Builder Host URL",
                        IsCacheable=settings[SettingKeys.APKBuilderHostURL].IsCacheable,
                        SettingValue=settings[SettingKeys.APKBuilderHostURL].Value,
                        InputType=SettingInputType.TextBox
                    }
                    ,
                    new SettingItem
                    {
                        SettingKey=SettingKeys.OnlineStore,
                        SettingLabel="Online Store",
                        IsCacheable=settings[SettingKeys.OnlineStore].IsCacheable,
                        SettingValue=settings[SettingKeys.OnlineStore].Value,
                        InputType=SettingInputType.TextBox
                    }
                    ,
                    new SettingItem
                    {
                        SettingKey=SettingKeys.DigiSphereApi,
                        SettingLabel="Digi Sphere API",
                        IsCacheable=settings[SettingKeys.DigiSphereApi].IsCacheable,
                        SettingValue=settings[SettingKeys.DigiSphereApi].Value,
                        InputType=SettingInputType.TextBox
                    }
                }

            };
            lstSections.Add(settingSection5);

            return await CommonSetting(lstSections);
        }



        [HttpGet]
        public async Task<ActionResult> CommonSetting(List<SettingSection> lstSections)
        {


            AddJS("Settings", "/admin/js/settings.js");

            return View("CommonSetting", lstSections);

        }

        


        private async Task LoadOauth()
        {

            string apiURL = Core.Helper.Models.APIURL.IdentityBaseUri + IdentityAPI.AccountSettings.GetOauthSettingForms;
            JObject rs = await _apiClient.GetAsync<JObject>(apiURL);
            string formHTML = string.Empty;
            if (rs != null)
                formHTML = rs.GetValue("form").ToString();
            ViewBag.OAuthSettingForm = formHTML;
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Oauth([FromBody]object form)
        {
            string apiURL = Core.Helper.Models.APIURL.IdentityBaseUri + IdentityAPI.AccountSettings.SaveOauthSetting;
            var status = await _apiClient.PostAsync<Core.API.Models.OperationStatus>(form, apiURL);
            return new ObjectResult(status);
        }

        //[HttpGet]
        //public async Task<ActionResult> Advanced()
        //{
        //    string userRole = UsersRoles;
        //    bool isSuperAdmin = userRole.ToLowerInvariant().Contains("super admin");

        //    if (!isSuperAdmin)
        //        return RedirectToAction("Basic");
        //    else
        //    {
        //        AddJS("Settings", "/admin/js/settings.js");
        //        Dictionary<string, Settings> settings = new Dictionary<string, Settings>();
        //        SettingManager settingController = new SettingManager();
        //        string settingValue = await settingController.GetAdminSettings();
        //        if (!string.IsNullOrEmpty(settingValue))
        //        {
        //            settings = Deserialize(settingValue);
        //        }

        //        return View(settings);
        //    }
        //}




        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<int> SaveSettingKeys([FromBody]List<Settings> settings)
        {
            int success = 0;

            try
            {
                string userName = User.Identity.Name;
                string settingValue = XmlSerialize(settings);
                SettingManager settingController = new SettingManager(_cache);
                int result = await settingController.SaveAdminSettings(settingValue, userName);

                if (result == 1)
                {

                    settingController.SetSettingCache(settings);

                    //foreach (Settings obj in settings)
                    //{
                    //    if (obj.IsCacheable)
                    //        settingHelper.UpdateCachedSettingValue(obj.Key, obj.Value);
                    //}

                }


                success = 1;
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                success = 0;
            }

            return success;
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<int> SaveAndTestSMTP([FromBody]List<Settings> settings)
        {
            int success = 0;

            try
            {
                string userName = User.Identity.Name;
                string settingValue = XmlSerialize(settings);
                SettingManager settingController = new SettingManager(_cache);
                int result = await settingController.SaveAdminSettings(settingValue, userName);

                if (result == 1)
                {
                    settingController.SetSettingCache(settings);

                    bool isSMTPSettings = settings.FindAll(x => x.Key == SettingKeys.SMTPUserName).Count > 0;
                    if (isSMTPSettings)
                    {
                        string username = settings.Find(x => x.Key == SettingKeys.SMTPUserName).Value;
                        await SendTestMail(username);
                    }
                }

                success = 1;
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                success = 0;
            }

            return success;
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public int RefreshCache()
        {
            int result = 1;
            Cbuilder.Core.Helper.SettingHelper settingHelper = new Core.Helper.SettingHelper();
            settingHelper.RefreshCache();
            return result;
        }

        private async Task SendTestMail(string email)
        {
            await _emailSender.SendEmailAsync(email, "Test Email for configuration", "Test Email");
        }

        //private Dictionary<string, string> GetAllType()
        //{
        //    Dictionary<string, string> typeList = new Dictionary<string, string>
        //    {
        //        { "NonCacheable", "NonCacheable" },
        //        { "Cacheable", "Cacheable" }
        //    };
        //    return typeList;
        //}

        private static string XmlSerialize(Dictionary<string, Settings> dataToSerialize)
        {
            if (dataToSerialize == null) return null;
            using (var stringWriter = new StringWriter())
            using (var xmlTextWriter = XmlWriter.Create(stringWriter))
            {
                XmlDocument XDoc = new XmlDocument();
                // Create root node.
                XmlElement XElemRoot = XDoc.CreateElement("settings");
                XDoc.AppendChild(XElemRoot);
                foreach (var item in dataToSerialize)
                {
                    if (item.Key != "__RequestVerificationToken")
                    {
                        XmlElement Xsource = XDoc.CreateElement("setting");
                        Xsource.SetAttribute("key", item.Value.Key);
                        Xsource.SetAttribute("value", item.Value.Value);
                        Xsource.SetAttribute("type", item.Value.Type);
                        XElemRoot.AppendChild(Xsource);
                    }
                }
                XDoc.WriteTo(xmlTextWriter);
                xmlTextWriter.Flush();
                return stringWriter.GetStringBuilder().ToString();
            }
        }
        private static string XmlSerialize(List<Settings> dataToSerialize)
        {
            if (dataToSerialize == null) return null;
            using (var stringWriter = new StringWriter())
            using (var xmlTextWriter = XmlWriter.Create(stringWriter))
            {
                XmlDocument XDoc = new XmlDocument();
                // Create root node.
                XmlElement XElemRoot = XDoc.CreateElement("settings");
                XDoc.AppendChild(XElemRoot);
                foreach (var item in dataToSerialize)
                {
                    if (item.Key != "__RequestVerificationToken")
                    {
                        XmlElement Xsource = XDoc.CreateElement("setting");
                        Xsource.SetAttribute("key", item.Key);
                        Xsource.SetAttribute("value", item.Value);
                        Xsource.SetAttribute("type", item.Type);
                        XElemRoot.AppendChild(Xsource);
                    }
                }
                XDoc.WriteTo(xmlTextWriter);
                xmlTextWriter.Flush();
                return stringWriter.GetStringBuilder().ToString();
            }
        }
        public static Dictionary<string, Settings> Deserialize(string xmlText)
        {
            if (String.IsNullOrWhiteSpace(xmlText)) return default(Dictionary<string, Settings>);

            XDocument doc = XDocument.Parse(xmlText);
            Dictionary<string, Settings> dataDictionary = new Dictionary<string, Settings>();

            foreach (XElement element in doc.Descendants().Where(p => p.HasElements == false))
            {
                string key = element.Attribute("key").Value.ToString();
                while (!dataDictionary.ContainsKey(key))
                {
                    string settingValue = element.Attribute("value").Value.ToString();
                    string settingType = element.Attribute("type").Value.ToString();
                    bool isCacheable = element.Attribute("cacheable").Value.ToString() == "1";
                    dataDictionary.Add(key, new Settings
                    {
                        Key = key,
                        Value = settingValue,
                        Type = settingType,
                        IsCacheable = isCacheable
                    });
                }

            }
            return dataDictionary;
        }
        public IActionResult Error()
        {
            ViewBag.Layout = "~/Layouts/Dashboard.cshtml";
            return View();
        }
    }
}