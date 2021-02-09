using Cbuilder.Core.Constants;
using Cbuilder.Core.Helper.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.Webbuilder.Helper
{
    public class CommonCbuilder
    {
        public async Task<Tuple<string, bool>> BindPages(IList<WebBuilderPages> objPageList, string hosturl, string tempPageName)
        {
            StringBuilder html = new StringBuilder();
            bool pageNotExists = true;
            await Task.Run(() =>
            {
                foreach (WebBuilderPages objPages in objPageList)
                {
                    string pageName = objPages.PageName.Replace(" ", "-").Replace("&", "-and-");
                    if (tempPageName.Replace(" ", "-").ToLower() == pageName.ToLower())
                        pageNotExists = false;
                    if (AllowedPage(pageName))
                    {
                        html.Append("<li data-pageid='");
                        html.Append(objPages.PageID);
                        html.Append("' data-webbuilderid='");
                        html.Append(objPages.WebbuilderID);
                        html.Append("'>");
                        html.Append("<a href=");
                        html.Append(hosturl);
                        html.Append("/");
                        html.Append(pageName);
                        html.Append(" data-pageName='");
                        html.Append(pageName);
                        html.Append("' class='pagelink '><span class='pageName editor-text-letterSpacing-0' style='font-size: 14px; color: rgb(217, 217, 217);'>");
                        html.Append(objPages.PageName);
                        html.Append("</span></a>");
                        html.Append("</li>");
                    }
                }
            });
            Tuple<string, bool> returnValue = new Tuple<string, bool>(html.ToString(), pageNotExists);
            return returnValue;
        }
        private bool AllowedPage(string checkPage)
        {
            bool pageAllowed = true;
            string[] notAllowedPages = { "Under Construction", "SearchResult", "ourwebbuildernonvisiblepage", "login", "forgot password", "contact us manage" };
            foreach (string page in notAllowedPages)
            {
                if (page.Replace(" ", "-").Replace("&", "-and-").ToLower() == checkPage.ToLower())
                    pageAllowed = false;
            }
            return pageAllowed;
        }

        public async Task CombineFiles(string directoryPath, string destinationFilePath)
        {
            if (Directory.Exists(directoryPath))
            {
                string[] packagesDir = Directory.GetDirectories(directoryPath);
                List<string> files = new List<string>();
                foreach (string pacDir in packagesDir)
                {
                    string dirPath = Path.Combine(pacDir, FolderName.JS);
                    if (Directory.Exists(dirPath))
                        files.AddRange(Directory.GetFiles(dirPath, "*.js"));
                }
                List<string> fileNameList = new List<string>();
                await using StreamWriter writeToFile = new StreamWriter(System.IO.File.Open(destinationFilePath, FileMode.OpenOrCreate));
                StringBuilder jsScripts = new StringBuilder();
                if (files.Count > 0)
                {
                    foreach (string file in files)
                    {
                        string currentFileName = Path.GetFileName(file);
                        if (!fileNameList.Contains(currentFileName))
                        {
                            fileNameList.Add(currentFileName);
                            using StreamReader readFrom = new StreamReader(file);
                            jsScripts.Append(readFrom.ReadToEnd());
                        }
                    }
                }
                await writeToFile.WriteLineAsync(jsScripts.ToString());
            }
            else
            {
                if (!System.IO.File.Exists(destinationFilePath))
                    System.IO.File.Create(destinationFilePath);
            }
        }


        public async Task CombineWebbuilderLibrary(string patterns, string fileName)
        {
            if (CurrentHostEnvironment.IsDevelopment)
            {
                string extensionPath = Path.Combine(CurrentHostEnvironment.WebRootPath, FolderName.CbuilderAssets, FolderName.JS, fileName);
                string fullpath = Path.Combine(CurrentHostEnvironment.WebRootPath, FolderName.CbuilderAssets, FolderName.JS, FolderName.CoreJS);
                DirectoryInfo dir = new DirectoryInfo(fullpath);
                FileInfo[] files = dir.GetFiles(patterns).OrderBy(s => s.Name).ToArray();
                if (files.Length > 0)
                {
                    System.IO.File.WriteAllText(extensionPath, string.Empty);
                    await using StreamWriter writeToFile = new StreamWriter(System.IO.File.Open(extensionPath, FileMode.OpenOrCreate));
                    //appending the \lib\js\ajaxHelper.js
                    string ajaxHelper = Path.Combine(CurrentHostEnvironment.WebRootPath, FolderName.Lib, FolderName.JS, "ajaxHelper.js");
                    using (StreamReader reader = new StreamReader(ajaxHelper))
                    {
                        string core = reader.ReadToEnd();
                        await writeToFile.WriteAsync(core);
                    }
                    //writing all the core 
                    foreach (var file in files)
                    {
                        using StreamReader readFrom = new StreamReader(file.FullName);
                        string core = readFrom.ReadToEnd();
                        await writeToFile.WriteAsync(core);
                    }
                }
            }
        }
    }
}

