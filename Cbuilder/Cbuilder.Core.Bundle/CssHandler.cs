using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace Cbuilder.Core.Bundle
{
    public class CssMinifierHelper
    {
        /// <summary>
        /// Rewrites the css image path from normal folder to optimation folder.
        /// </summary>
        /// <param name="content">Content  from where path to be change</param>
        /// <param name="modulePath">Module Path.</param>
        /// <param name="appRoot">Applicatio root path.</param>
        /// <param name="imageFolder">Image's folder name. </param>
        /// <returns>Changed image url path.</returns>
        public static string RewriteCssImagePath(string content, string modulePath, string appRoot, string imageFolder)
        {
            modulePath = modulePath.Trim().Replace('\\','/');
            if (modulePath.EndsWith("/"))
            {
                modulePath = modulePath.Substring(0, modulePath.Length - 1);
            }
            string imagePath = appRoot + modulePath;
            //Match for image path without / in front
            string pattern = "url\\s*\\(\\s*[\"']?(?<imgfile>\\s*[^\"')]*)[\"')]?";
            MatchCollection collection = Regex.Matches(content, pattern);
            foreach (Match match in collection)
            {
                string path = match.Groups[1].Value.Trim();
                if (!path.Substring(0, 1).Equals("/") && !path.Substring(0, 1).Equals("."))
                {
                    string urlPath = match.Groups[1].Value;
                    if (!Regex.IsMatch(urlPath, @"https?.*", RegexOptions.IgnoreCase))
                    {
                        string elementPattern = "url\\s*\\(\\s*[\"']?" + match.Groups[1].Value + "[\"']?";
                        content = Regex.Replace(content, elementPattern, "url('" + imagePath + "/" + match.Groups[1].Value + "'");
                    }
                }
            }
            return Parse(content, imagePath);
        }
        /// <summary>
        /// Changes the string's relative path 
        /// </summary>
        /// <param name="content">Content to be change.</param>
        /// <param name="relativePath">Relative path.</param>
        /// <returns>Changed string.</returns>
        static string Parse(string content, string relativePath)
        {
            int slashCount = GetSlashCount(relativePath);

            for (int i = slashCount; i > 1; i--)
            {
                string pathPortion = relativePath;
                string oldpattern = "";
                string newPath = "";
                for (int j = i; j > 1; j--)
                {
                    oldpattern += "\\.\\./";

                    int end = pathPortion.LastIndexOf("/");
                    newPath = relativePath.Substring(0, end);
                    pathPortion = pathPortion.Substring(0, pathPortion.LastIndexOf("/"));
                }

                string pattern = "url\\s*\\(\\s*[\"']?" + oldpattern + "(?<imgfile>\\s*[^\"')]*)[\"')]?";

                content = Regex.Replace(content, oldpattern, newPath + "/");

            }

            return content;

        }

        /// <summary>
        /// Returns the count of slash '/' in an string.
        /// </summary>
        /// <param name="folderPath">Folder path.</param>
        /// <returns>Counts of slashes in the string.</returns>
        static int GetSlashCount(string folderPath)
        {
            int count = 0;
            string pattern = "/";
            Match match = Regex.Match(folderPath, pattern);
            while (match.Success)
            {
                count++;
                match = match.NextMatch();
            }
            return count;
        }


        public static string ImportTextCombine(string cssValue)
        {
            string pattern = @"@import (.*?)\)";
            MatchCollection imports = Regex.Matches(cssValue, pattern);
            string importList = string.Empty;
            foreach (Match match in imports)
            {
                string fontLink = match.Value;
                string googlefontlinks = string.Empty;
                if (fontLink.IndexOf("fonts.googleapis.com") > -1)
                {

                }
                importList += match.Value;
                cssValue = cssValue.Replace(match.Value, string.Empty);
            }
            string replacedString = importList + cssValue;
            return replacedString;
        }
    }
}
