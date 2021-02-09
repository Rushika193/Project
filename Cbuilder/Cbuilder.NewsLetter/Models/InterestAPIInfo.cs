using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.NewsLetter
{
    internal class InterestAPIInfo
    {
        public int InvokeID { get; set; }
        public string StoreProcName { get; set; }
        public string ApplicationName { get; set; }
    }
    public class InterestInfo
    {
        public string AppName { get; set; }
        public string CategoryName { get; set; }
        public List<string> KeyWordList { get; set; }
    }

    public class InterestTempInfo
    {
        public string AppName { get; set; }
        public string CategoryName { get; set; }
        public string KeyWord { get; set; }
    }

    //internal class InterestKeyWord
    //{
    //    public string KeyWord { get; set; }
    //}
}
