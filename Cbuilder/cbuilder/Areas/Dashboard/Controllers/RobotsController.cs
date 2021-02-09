using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Cbuilder.Areas.Dashboard.Models.Dashboard;
using Cbuilder.Core.Constants.Enum;
using Cbuilder.Core.Controllers;
using Cbuilder.Core.Helper.Models;
using Cbuilder.Webbuilder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.Extensions.Caching.Memory;

namespace Cbuilder.Areas.Dashboard.Controllers
{
    [Area("Dashboard")]
    public class RobotsController : AdminController
    {
        public readonly IMemoryCache _memoryCache;
        public RobotsController(IHttpContextAccessor httpContextAccessor, IMemoryCache memoryCache) : base(httpContextAccessor)
        {
            _memoryCache = memoryCache;
        }
        public async Task<IActionResult> Index()
        {
            AddJS("robotsJS", "/admin/js/robots.js");
            string robotPath = Path.Combine(CurrentHostEnvironment.ContentRootPath, "robots.txt");
            Robots robots = new Robots();
            if (System.IO.File.Exists(robotPath))
            {
                using StreamReader sr = new StreamReader(robotPath);
                string contents = await sr.ReadToEndAsync();
                if (contents.Length > 0)
                {
                    string line1 = System.IO.File.ReadLines(robotPath)?.First();

                    switch (line1)
                    {
                        case "":
                            ActionMessage("no file type of robot.txt", MessageType.Error);
                            return new EmptyResult();
                        case "#full":
                            {
                                robots.FileType = "full";
                                using StreamReader readFrom = new StreamReader(robotPath);
                                robots.FullText = await readFrom.ReadToEndAsync();
                                robots.FullText = robots.FullText.Replace("#full", string.Empty);
                            }
                            break;
                        case "#partial":
                            {
                                List<string> disallowedList = new List<string>();
                                robots.FileType = "partial";
                                using StreamReader readFrom = new StreamReader(robotPath);
                                while (!readFrom.EndOfStream)
                                {
                                    string line = await readFrom.ReadLineAsync();
                                    if (line.StartsWith("Disallow:"))
                                    {
                                        disallowedList.Add(line.Replace("Disallow:", string.Empty).Trim());
                                    }
                                    else if (line.StartsWith("User-Agent:"))
                                    {
                                        robots.UserAgent = line.Replace("User-Agent:", string.Empty).Trim();
                                    }
                                }
                                robots.Disallowed = string.Join(",", disallowedList);
                                robots.DisallowedList = disallowedList;
                                WebBuilderController webBuilderController = new WebBuilderController();
                                ViewBag.Pages = await webBuilderController.GetAllPageList(GetSiteID);
                            }
                            break;
                        default:
                            ActionMessage("Robots.txt doesnot mathc any criteria", MessageType.Error);
                            return new EmptyResult();
                    }
                }
                else
                {
                    ActionMessage("Robots.txt file is empty", MessageType.Error);
                    return new EmptyResult();
                }
            }
            else
            {
                ActionMessage("Robots.txt file not found", MessageType.Error);
                return new EmptyResult();
            }
            return View(robots);
        }

        [HttpPost]
        public async Task<IActionResult> Index(Robots robots)
        {
            string robotPath = Path.Combine(CurrentHostEnvironment.ContentRootPath, "robots.txt");
            using StreamWriter writer = new StreamWriter(robotPath);
            if (robots.FileType == "full")
            {
                await writer.WriteLineAsync("#full");
                await writer.WriteAsync(robots.FullText);
            }
            else
            {
                StringBuilder html = new StringBuilder();
                html.Append("#partial");
                html.Append("User-Agent: " + robots.UserAgent);
                foreach (string disallowed in robots.DisallowedList)
                {
                    html.AppendFormat("Disallow: {0}", disallowed);
                }
                await writer.WriteLineAsync(html.ToString());
            }
            writer.Close();
            ActionMessage("Robots.txt updated succesfully", MessageType.Success);
            return RedirectToAction(nameof(Index));
        }
    }
}