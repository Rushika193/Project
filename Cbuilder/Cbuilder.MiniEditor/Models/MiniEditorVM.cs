using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.MiniEditor.Models
{
   
    public class MiniEditorVM: MiniEditorParam
    {
       
        /// <summary>
        /// True if component minified executed js file exists on caller modules.
        /// </summary>
        public bool HasComponentFile { get; set; }
        
        /// <summary>
        /// Hold all website front page stringify PageList.
        /// </summary>
        public string WebsitePages { get; set; }
        /// <summary>
        /// Hold font icon option DOM 
        /// </summary>
        public string FontDOM { get; set; }
        /// <summary>
        /// Check System is in developer mode
        /// </summary>
        public bool IsDevMode { get; set; }
        public string BasicComponents { get; set; }
        public string EditorComponents { get; set; }
        public string ComponentPath { get; set; }

    }
}
