using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.MiniEditor.Models
{
    public class MiniEditorParam
    {
        public MiniEditorParam() { }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="moduleJsPath">Mini Editor Invoker Module Path.</param>
        /// <param name="enableMultiRow">If Editor required  multiple row where row component can drag drop set this properties true.</param>
        /// <param name="noComponents">When Editor doesnot need component and module it self manage component. Example Post type.</param>
        /// <param name="extraBasicComponent">If Modules need extra basic component form webbuilder. Provide component name in comma separed format.</param>
        public MiniEditorParam(string moduleName,string moduleJsPath, bool enableMultiRow=false,bool hasComponent=true, string extraBasicComponent="")
        {
            this.ModuleName = moduleName;
            this.ModulePath= moduleJsPath;
            this.EnableMultiRow=enableMultiRow;
            this.HasComponent = hasComponent;
            this.ExtraBasicComponent = extraBasicComponent;
        }
        public string ModuleName { get; set; }
        /// <summary>
        /// Mini Editor Invoker Module Path.
        /// </summary>
        public string ModulePath { get; set; }
        /// <summary>
        /// If Modules need extra basic component form webbuilder. Provide component name in comma separed format.
        /// </summary>
        public string ExtraBasicComponent { get; set; }
        /// <summary>
        ///Set false for dot not include component and module it self manage component. Example Post type.
        /// </summary>
        public bool HasComponent { get; set; } = true;
        /// <summary>
        /// If Editor required  multiple row where row component can drag drop set this properties true.
        /// </summary>
        public bool EnableMultiRow { get; set; }
    }
}
