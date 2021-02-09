using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using Cbuilder.Core.Constants;
using Cbuilder.Core.Constants.Enum;
using Cbuilder.Core.Controllers;
using Cbuilder.Core.Helper;
using Cbuilder.Core.Localization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using SQLHelper;
using Cbuilder.Core.Helper.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Globalization;
using Cbuilder.Assets;
using System.IO.Compression;
using Newtonsoft.Json.Linq;
using Cbuilder.Core.Helper.Helper;
using Microsoft.Extensions.Caching.Memory;
using Cbuilder.Core.MediaManagement;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Cbuilder.Areas.Dashboard.Controllers
{

    [Area("Dashboard")]

    public class LocalizationController : AdminController
    {

        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMemoryCache _memoryCache;
        public LocalizationController(IHttpContextAccessor httpContextAccessor, IMemoryCache memoryCache) : base(httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _memoryCache = memoryCache;
        }
        // GET: /<controller>/

        public async Task<IActionResult> Index()
        {

            SettingHelper settingHelper = new SettingHelper();
            bool localizationenabled = await settingHelper.GetSettingBoolValueByIndividualKey(SettingKeys.Localization);
            if (localizationenabled)
            {
                LocalizationManager objLocalization = new LocalizationManager();
                Task<IList<Language>> lstLoc = objLocalization.GetLanguage(GetSiteID);
                Task<string> defaultLanguage = settingHelper.GetSettingValueByIndividualKey(SettingKeys.DefaultCulture);
                await Task.WhenAll(lstLoc, defaultLanguage);
                ViewBag.AvailableCulture = await lstLoc;
                ViewBag.DefaultCulture = await defaultLanguage;
            }
            ViewBag.EnableLocalization = localizationenabled;
            AddJS("Localization", "/admin/js/localization/localization.js");
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> AddLanguage()
        {
            ViewBag.Languages = await GetCultures();
            return View(new CountryLanguage());
        }
        public async Task<IActionResult> ImportExport()
        {
            AddJS("uploadJson", "/js/uploadFile.js");
            AddJS("uploadJsonImportExport", "/admin/js/localization/ImportExport.js");
            ApplicationManager applicationManager = new ApplicationManager();
            IList<ApplicationNameInfo> applicationNameInfos = await applicationManager.GetApplicationNames();
            //List<SelectListItem> lstItems = new List<SelectListItem>();
            //foreach (ApplicationNameInfo applicationNameInfo in applicationNameInfos)
            //{
            //    lstItems.Add(new SelectListItem { Text = applicationNameInfo.ApplicationName, Value = applicationNameInfo.ApplicationID.ToString() });
            //}
            ViewBag.Categories = applicationNameInfos;
            ViewBag.Extensions = FileUploadHelper.EncryptString("zip");
            ViewBag.Path = FileUploadHelper.EncryptString(Path.Combine(CurrentHostEnvironment.WebRootPath, "Temp"));
            return View();
        }
        [HttpPost]
        public async Task<string> Export([FromBody] LocalizedData localizedData)
        {
            LocalizationManager objLocalization = new LocalizationManager();
            IList<LocalizedData> localizedDatas = await objLocalization.GetFilePathByApplicationID(localizedData.Value);
            string applicationName = string.Empty;
            string appFolder = string.Empty;
            string zipPath = string.Empty;
            string tempFolder = Path.Combine(CurrentHostEnvironment.WebRootPath, "Temp");
            if (localizedDatas != null)
            {
                string localizationfolder = Path.Combine(tempFolder, "localization");
                if (Directory.Exists(tempFolder))
                    Directory.Delete(tempFolder, true);
                Directory.CreateDirectory(localizationfolder);
                foreach (LocalizedData localizedFile in localizedDatas)
                {
                    if (applicationName != localizedFile.Value)
                    {
                        appFolder = Path.Combine(localizationfolder, localizedFile.Value);
                        if (!Directory.Exists(appFolder))
                        {
                            Directory.CreateDirectory(appFolder);
                        }
                    }
                    string destfile = appFolder + localizedFile.FilePath + ".json";
                    string srcFile = CurrentHostEnvironment.WebRootPath + localizedFile.FilePath + ".json";
                    string destFolder = Path.GetDirectoryName(destfile);
                    if (!Directory.Exists(destFolder))
                        Directory.CreateDirectory(destFolder);
                    if (System.IO.File.Exists(srcFile))
                        System.IO.File.Copy(srcFile, destfile);
                }
                zipPath = tempFolder + "\\languages.zip";
                ZipFile.CreateFromDirectory(localizationfolder, zipPath);

                //RedirectToAction(nameof(DownloadZip), nameof(LocalizationController), new { zipPath = zipPath });
            }
            return "language";
            //FileDownloadHelper fileDownloadHelper = new FileDownloadHelper(_httpContextAccessor);
            //fileDownloadHelper.Download(MimeTypes.Zip, "localizations.zip", zipPath);
        }

        bool NoError_ = true;
        [HttpPost]
        public async Task<List<Task<LocalizationResponse>>> Import([FromBody] LocalizedData localizedData)
        {
            string tempLocalizationFolder = Path.Combine(CurrentHostEnvironment.WebRootPath, "Temp", "ExtractedLocalized");
            string srcZip = Path.Combine(CurrentHostEnvironment.WebRootPath, "Temp", localizedData.Value);
            ZipFile.ExtractToDirectory(srcZip, tempLocalizationFolder);
            List<Task<LocalizationResponse>> localizationResponses = new List<Task<LocalizationResponse>>();
            string[] applications = Directory.GetDirectories(tempLocalizationFolder);

            DirectoryInfo diInfo = new DirectoryInfo(tempLocalizationFolder);
            DirectoryInfo[] diInfoArr = diInfo.GetDirectories();
            foreach (DirectoryInfo DirInfo in diInfoArr)
            {
                string applicationDir = DirInfo.FullName;
                string appName = DirInfo.Name;
                string[] files = Directory.GetFiles(applicationDir, "*", SearchOption.AllDirectories);
                foreach (string userFile in files)
                {
                    string filedir = Path.GetDirectoryName(userFile).Replace(applicationDir, String.Empty);
                    string systemfile = CurrentHostEnvironment.WebRootPath + filedir + "\\" + Path.GetFileNameWithoutExtension(filedir) + ".json";
                    LocalizationResponse localizationResponse = new LocalizationResponse
                    {
                        FilePath = filedir
                    };
                    localizationResponses.Add(JsonCompare(userFile, systemfile, localizationResponse));
                }
                await Task.WhenAll(localizationResponses);
            }
            //NoError_

            return localizationResponses;
        }

        private async Task<LocalizationResponse> JsonCompare(string userFile, string systemfile, LocalizationResponse localizationResponse)
        {
            Task<JObject> userJson = ReadFile(userFile);
            Task<JObject> systemJson = ReadFile(systemfile);
            JObject userJson_ = await userJson;
            JObject systemJson_ = await systemJson;
            NoError_ = JToken.DeepEquals(userJson_, systemJson_);
            localizationResponse.Equal = NoError_;
            return localizationResponse;
        }

        public async Task<JObject> ReadFile(string filelocation)
        {
            string localizeValue = string.Empty;
            if (System.IO.File.Exists(filelocation))
                localizeValue = await ReadJSONFile(filelocation);
            return JObject.Parse(localizeValue);
        }

        private async Task<IList<SelectListItem>> GetCultures()
        {
            IList<SelectListItem> lstLocales = new List<SelectListItem>();
            await Task.Run(() =>
            {
                foreach (CultureInfo ci in CultureInfo.GetCultures(CultureTypes.SpecificCultures))
                {
                    LanguageList obj = new LanguageList
                    {
                        LanguageCode = ci.Name,
                        CountryLanguageCode = ci.EnglishName,
                        Country = ci.NativeName
                    };
                    lstLocales.Add(new SelectListItem { Text = ci.NativeName + " " + ci.Name, Value = ci.EnglishName + "##" + ci.Name });
                }
            }
             );
            return lstLocales;
        }

        [HttpGet]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var LanguageObj = new
                {
                    LanguageID = id
                };
                string redirectURL = string.Empty;
                LocalizationManager objLocalization = new LocalizationManager();
                await objLocalization.DeletelanguageByID(id);
                ActionMessage("Deleted Succesfully", MessageType.Success);
                redirectURL = nameof(Index);
                return RedirectToAction(redirectURL);
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return View("Index");
            }
        }

        [HttpGet]
        [Route("dashboard/[controller]/[action]/{LanguageCode}")]
        public async Task<ActionResult> Localize(string LanguageCode)
        {
            try
            {
                AddJS("Localization", "/admin/js/localization/localizedata.js");
                IList<KeyValue> lstFiles = new List<KeyValue>();
                LocalizationManager objLocalization = new LocalizationManager();
                lstFiles = await objLocalization.GetFilePath();
                ViewBag.FilePath = lstFiles;
                ViewBag.Lang = LanguageCode;

                return View();
            }
            catch (Exception ex)
            {
                ProcessException(ex);
                return View("Index");
            }
        }

        [HttpGet]
        public async Task<ActionResult> Update(string LanguageCode, string Language)
        {
            try
            {
                string redirectURL = string.Empty;
                redirectURL = nameof(Index);
                SettingHelper settingHelper = new SettingHelper(_memoryCache);
                await settingHelper.SettingValueUpdate(SettingKeys.DefaultCulture, LanguageCode);
                settingHelper.UpdateCachedSettingValue(SettingKeys.DefaultCulture, LanguageCode);

                await settingHelper.SettingValueUpdate(SettingKeys.CultureLanguage, Language);
                settingHelper.UpdateCachedSettingValue(SettingKeys.CultureLanguage, Language);

                ActionMessage("Update Succesfully", MessageType.Success);
                return RedirectToAction(redirectURL);
            }
            catch (Exception ex)
            {

                ProcessException(ex);
                return View();
            }
        }

        [HttpPost]
        public async Task<ActionResult> SaveLanguage(CountryLanguage countryLanguage)
        {
            try
            {
                string redirectURL = string.Empty;
                LocalizationManager objLocalization = new LocalizationManager();
                if (countryLanguage.LanguageName.Length > 0)
                {
                    string[] langs = countryLanguage.LanguageName.Split("##");
                    string[] countrylang = langs[0].Split(' ');
                    countryLanguage.CultureName = langs[0];
                    countryLanguage.CultureCode = langs[1];
                    countryLanguage.Country = countrylang[1];
                    countryLanguage.Country = countryLanguage.Country.Substring(1, countryLanguage.Country.Length - 2);
                    countryLanguage.Language = countrylang[0];
                    string[] langcode = langs[1].Split('-');
                    countryLanguage.CountryCode = langcode[1];
                    countryLanguage.LanguageCode = langcode[0];
                    await objLocalization.Add(countryLanguage, GetUsername);
                }
                redirectURL = nameof(Index);
                return RedirectToAction(redirectURL);
            }
            catch (Exception ex)
            {

                ProcessException(ex);
                return View("Index");
            }
        }


        [HttpPost]
        public Dictionary<string, string> GetJsonData([FromBody] GetLanguage lstParam)
        {
            string LanguageCode = lstParam.LanguageCode;
            string URL = CurrentHostEnvironment.WebRootPath + lstParam.FilePath + "." + LanguageCode + ".json";
            if (!System.IO.File.Exists(URL))
            {
                SettingHelper settingHelper = new SettingHelper(_memoryCache);
                LanguageCode = settingHelper.GetCachedSettingValue(SettingKeys.DefaultCulture);
                URL = CurrentHostEnvironment.WebRootPath + lstParam.FilePath + "." + LanguageCode + ".json";
            }
            var jsonString = System.IO.File.ReadAllText(URL);
            Dictionary<string, string> localizeValue = JsonSerializer.Deserialize<Dictionary<string, string>>(jsonString);
            return localizeValue;
        }


        [HttpPost]
        public async Task<string> SaveJsonData([FromBody] LocalizedData LocalizedData)
        {
            string filePath = CurrentHostEnvironment.WebRootPath + LocalizedData.FilePath + "." + LocalizedData.Culture + ".json";
            using (StreamWriter streamWriter = new StreamWriter(filePath))
            {
                await streamWriter.WriteLineAsync(LocalizedData.Value);
            }
            return "1";
        }

        [HttpPost]
        public async Task<int> LocalizationToggle([FromBody] LocalizationToggle localizationToggle)
        {
            SettingHelper settingHelper = new SettingHelper();
            return await settingHelper.SettingValueUpdate(SettingKeys.Localization, localizationToggle.Check.ToString());
        }
    }
}
