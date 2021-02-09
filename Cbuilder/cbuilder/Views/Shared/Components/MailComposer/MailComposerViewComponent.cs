using Cbuilder.Core.ViewComponents;
using Cbuilder.EmailTemplate;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.Areas.OfficeAdmin.Components
{
    public class MailComposerViewComponent : CommonViewComponent
    {
        private readonly IEmailTemplateManager _tempMgr;
        //private readonly IHostingEnvironment _hostingEnv;
        string ModulePath;
        bool DevMode = true;
        string serverPath;
        public MailComposerViewComponent(IHttpContextAccessor httpContextAccessor, IEmailTemplateManager eTemp, IWebHostEnvironment hostingEnv) : base(httpContextAccessor)
        {
            _tempMgr = eTemp;
            serverPath = hostingEnv.ContentRootPath + "/wwwroot/";
            DevMode = hostingEnv.IsDevelopment();
        }
        public async Task<IViewComponentResult> InvokeAsync(string JsInvokerPath)
        {
            IncludeAssets();
            ModulePath = JsInvokerPath;
            CombineFiles();
            GetComponent();
            MailComposerViewModel model = new MailComposerViewModel();
            model.TokenScript = await GetTokenScript("all");
            model.InvokerJsPath = JsInvokerPath;
            return View(model);
        }
        public void IncludeAssets()
        {
            //AddCSS("EditorCss1", "/emailtemplate/css/fontIcon.css");
            AddCSS("EditorCss2", "/EmailTemplate/css/texteditor.css");
            AddCSS("EditorCss4", "/EmailTemplate/css/MailTemplateEditor.css");

            AddJS("TemplateComposer1", "/EmailTemplate/text-editor.js");
            AddJS("TemplateComposer2", "/EmailTemplate/tinyColorPicker.js");
            AddJS("TemplateComposer3", "/EmailTemplate/components/components.js");
            AddJS("TemplateComposer4", "/EmailTemplate/mailtemplateComposer.js");
            AddJS("TemplateComposer5", "/EmailTemplate/settingsLibrary.js");
            if(DevMode)
                AddJS("TemplateComposer6", "/EmailTemplate/components/extensions.js");
        }
        public void CombineFiles()
        {
            if (!string.IsNullOrEmpty(ModulePath) && DevMode)
            {
                string ComponentPath = ModulePath + "components";
                string extensionPath = ComponentPath + "/extensions";
                try
                {
                    ComponentPath = serverPath + ComponentPath;
                    extensionPath = serverPath + extensionPath;

                    if (!Directory.Exists(ComponentPath + "/html"))
                    {
                        Directory.CreateDirectory(ComponentPath + "/html");
                    }
                    if (!Directory.Exists(ComponentPath))
                    {
                        Directory.CreateDirectory(ComponentPath);
                    }
                    if (!Directory.Exists(extensionPath))
                    {
                        Directory.CreateDirectory(extensionPath);
                    }
                    ComponentPath = ComponentPath + "/extensions.js";
                    if (File.Exists(ModulePath)) File.Delete(ModulePath);

                    string[] files = Directory.GetFiles(extensionPath, "*.js");

                    // WAY 1
                    if (files.Length > 0)
                    {
                        using (StreamWriter writeToFile = new StreamWriter(ComponentPath))
                        {
                            writeToFile.WriteLine("var extendedMailComps = {");
                            foreach (var file in files)
                            {
                                using (StreamReader readFrom = new StreamReader(file))
                                {
                                    while (!readFrom.EndOfStream)
                                    {
                                        string line = readFrom.ReadLine();
                                        if (!line.StartsWith("var") && !line.StartsWith("}"))
                                        {
                                            writeToFile.WriteLine(line);
                                        }
                                    }
                                    writeToFile.Write(',');
                                }
                            }
                            writeToFile.WriteLine("}");
                        }
                    }
                }
                catch (Exception ex)
                {
                    //ProcessException(ex);
                }
            }
        }
        private async void GetComponent()
        {
            string componentPath = serverPath + ModulePath + "/components/components.js";
            if (!File.Exists(componentPath) || DevMode)
            {
                IList<EmailTemplateComponent> objComponentList = await _tempMgr.GetAllComponent();
                string componentList = JsonConvert.SerializeObject(objComponentList);
                SaveComponentToJS("var storedEmailComponent=" + componentList.ToString() + ";", componentPath);
            }
        }
        private void SaveComponentToJS(string components, string componentPath)
        {
            try
            {
                if (!Directory.Exists(Path.GetDirectoryName(componentPath)))
                    Directory.CreateDirectory(Path.GetDirectoryName(componentPath));
                using (StreamWriter writeToFile = new StreamWriter(componentPath))
                {
                    writeToFile.Write(components);
                }
            }
            catch (Exception ex)
            {
            }
        }
        private async Task<string> GetTokenScript(string Type)
        {
            IList<EmailToken> tokenObj = await _tempMgr.GetTokenList(Type);
            if (tokenObj.Count > 0)
            {
                StringBuilder sbObj = new StringBuilder();
                sbObj.Append("<script> let EmailBasicToken = {");
                var len = tokenObj.Count;
                for (int i = 0; i < len; i++)
                {
                    sbObj.Append(tokenObj[i].Key);
                    sbObj.Append(": { Token :\"");
                    sbObj.Append(tokenObj[i].Token);
                    sbObj.Append("\" , Type : \"");
                    sbObj.Append(tokenObj[i].Type);
                    sbObj.Append("\" , SampleValue : \"");
                    if (tokenObj[i].Key == "SiteLogo")
                    {
                        sbObj.Append("");
                    }
                    else
                    {
                        sbObj.Append(tokenObj[i].SampleValue);
                    }
                    sbObj.Append("\" } ");
                    if (i < len - 1)
                        sbObj.Append(",");
                }
                sbObj.Append("} </script>");
                return sbObj.ToString();
            }
            else
            {
                return string.Empty;
            }
        }
    }
}
