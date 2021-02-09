using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Cbuilder.Core.Helper.Helper
{
    public class FontHelper
    {
        public async Task SaveFontClass(string cssFilePath, string destjsFile)
        {
            MatchCollection matches = await GetFontMatchesList(cssFilePath);
            int len = matches.Count;
            StringBuilder html = new StringBuilder("var fontawesomeClasses= [");
            for (int i = 0; i < len; i++)
            {
                string className = matches[i].ToString().Replace(":before", string.Empty);
                html.AppendFormat("'{0}',", className);
            }
            html.Append("];");
            await using StreamWriter streamWriter = new StreamWriter(File.Open(destjsFile, FileMode.OpenOrCreate));
            await streamWriter.WriteAsync(html.ToString());
            //return write;
        }

        public async Task<MatchCollection> GetFontMatchesList(string cssFilePath)
        {
            string fontAwesome = await File.ReadAllTextAsync(cssFilePath);
            string value = ("fa(-[a-z]{1,20}){0,1}(-[a-z]{1,20}){0,1}(-[a-z]{0,20}){0,1}:before");
            return Regex.Matches(fontAwesome, value);
        }
    }
}
