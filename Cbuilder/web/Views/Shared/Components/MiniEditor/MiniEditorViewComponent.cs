using Cbuilder.Core.Helper.Models;
using Cbuilder.Core.ViewComponents;
using Cbuilder.MiniEditor;
using Cbuilder.MiniEditor.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Cbuilder.ViewComponents
{
    public class MiniEditorViewComponent : CommonViewComponent
    {
        public MiniEditorViewComponent(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {

        }
        // using example 
        //@await Component.InvokeAsync("MiniEditor", new Cbuilder.MiniEditor.Models.MiniEditorParam("MiniEditorTest","/js/MiniEditorTest/"))
        public async Task<IViewComponentResult> InvokeAsync(MiniEditorParam param)
        {
            MiniEditorVM model = new MiniEditorVM();
            MiniEditorManager editorManager = new MiniEditorManager();

            model.IsDevMode = CurrentHostEnvironment.IsDevelopment;
            model.EnableMultiRow = param.EnableMultiRow;
            model.HasComponent = param.HasComponent;
            model.ExtraBasicComponent = param.ExtraBasicComponent;
            model.ModulePath = param.ModulePath;
            model.ModuleName = param.ModuleName;
            if (model.HasComponent)
            {
                model.ComponentPath = string.Concat("/" + param.ModulePath, "/component", "/component.js");
                string RequiredBasicComp = "row,column,holder,container,row separator";
                if (!string.IsNullOrEmpty(param.ExtraBasicComponent))
                    RequiredBasicComp += "," + param.ExtraBasicComponent;
                var componentList = await editorManager.GetComponents(param.ModuleName, RequiredBasicComp, 0);
                model.EditorComponents = JsonConvert.SerializeObject(componentList);
                if (model.IsDevMode)
                    CombineFiles(model.ModulePath);
            }
            else
            {
                model.EditorComponents = "[]";
            }

            return View("MiniEditor", model);
        }

        private void CombineFiles(string modulePath)
        {
            modulePath = Path.Combine(modulePath.Split("/"));
            string webrootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            string ComponentPath = Path.Combine(webrootPath, modulePath, "component");
            string extensionPath = Path.Combine(ComponentPath, "extensions");
            try
            {
                if (!Directory.Exists(Path.Combine(ComponentPath, "html")))
                {
                    Directory.CreateDirectory(Path.Combine(ComponentPath, "html"));
                }
                if (!Directory.Exists(ComponentPath))
                {
                    Directory.CreateDirectory(ComponentPath);
                }
                if (!Directory.Exists(extensionPath))
                {
                    Directory.CreateDirectory(extensionPath);
                }
                ComponentPath = Path.Combine(ComponentPath, "component.js");
                if (File.Exists(modulePath))
                    File.Delete(modulePath);
                string[] files = Directory.GetFiles(extensionPath, "*.js");

                // WAY 1
                if (files.Length > 0)
                {
                    using (StreamWriter writeToFile = new StreamWriter(ComponentPath))
                    {
                        writeToFile.WriteLine("var extendedComps = {");
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

            }
        }


    }
}

