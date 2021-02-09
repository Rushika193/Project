using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.Core.Helper.Models
{
    public class ControllerDetail
    {
        /// <summary>
        /// Component Universal ID
        /// </summary>
        public string ComponentID { get; set; }
        public string PageName { get; set; }
        public string ComponentName { get; set; }
        /// <summary>
        /// Namespace of the dll (case sensitive)
        /// </summary>
        public string Namespaces { get; set; }
        /// <summary>
        /// Name of the class for which the method to be invoked (case sensitive)
        /// </summary>
        public string ClassNames { get; set; }
        /// <summary>
        /// Method Name to be invoked (case sensitive)
        /// </summary>
        public string MethodNames { get; set; }
        /// <summary>
        /// Parameters value list in comma separated string
        /// Parameters must be of same number and same order.
        /// </summary>
        public string Parameters { get; set; }
        //public object[] Arguments { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public object[] Args { get; set; }
        //public object[] Args
        //{
        //    get
        //    {
        //        object[] args = null;
        //        if (this.Parameters != null && this.Parameters != string.Empty)
        //        {
        //            args = this.Parameters.Split(',');
        //        }
        //        return args;
        //    }

        //}
        public string Type { get; set; }
        public string BindMethodName { get; set; }
        public string ErrorMethodName { get; set; }
        public int Orders { get; set; }
        public string Placement { get; set; }
        public bool ErrorOccured { get; set; }
        public object[] Result { get; set; }
        public object[] Error { get; set; }
    }

}
