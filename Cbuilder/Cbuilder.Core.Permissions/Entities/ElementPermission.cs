using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Core.Permissions
{
    public class ElementPermission
    {
        public ElementPermission() { }
        public ElementPermission(string area,string controller,string action) {
            AreaName = area;
            Controller = controller;
            ActionName = action;
        }
        public ElementPermission(string controller, string action)
        {
           
            Controller = controller;
            ActionName = action;
        }
        /// <summary>
        /// Take Current Area And Controller Value as Default
        /// </summary>
        /// <param name="action"></param>
        public ElementPermission(string action)
        {            
            ActionName = action;
        }
        public string AreaName { get; set; }
        public string Controller { get; set; }
        public string ActionName { get; set; }
    }
 
}
