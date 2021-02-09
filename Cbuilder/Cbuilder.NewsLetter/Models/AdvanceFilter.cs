using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.NewsLetter
{

    internal class AdvanceFilterAPIInfo
    {
        public int InvokeID { get; set; }
        public string StoreProcName { get; set; }
        public string ApplicationName { get; set; }
    }
    public class AdvanceFilterInfo
    {
        public string AppName { get; set; }
        public string CategoryName { get; set; }

        /// <summary>
        /// type of input to be shown in advance filter section
        /// </summary>
        public string InputType { get; set; }
        public List<string> FilterList { get; set; }
    }

    internal class AdvanceFilterTempInfo
    {
        public string AppName { get; set; }
        public string CategoryName { get; set; }
        public string InputType { get; set; }
        public string KeyWord { get; set; }
    }

}
