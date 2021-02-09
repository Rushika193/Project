using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Theme
{
    public static class CSSProperties
    {
        public static readonly string BgColor = "background-color";
        public static readonly string Color = "color";


        public static readonly string FontSize = "font-size";
        public static readonly string FontWeight = "font-weight";
        public static readonly string TextAlign = "text-align";
        
        
        public static readonly string MarginTop = "margin-top";
        public static readonly string MarginBottom = "margin-bottom";
        public static readonly string MarginRight = "margin-right";
        public static readonly string MarginLeft = "margin-left";

        public static readonly string PaddingTop = "padding-top";
        public static readonly string PaddingBottom = "padding-bottom";
        public static readonly string PaddingRight = "padding-right";
        public static readonly string PaddingLeft = "padding-left";


        public static readonly string BorderColor = "border-color";
        public static readonly string BorderWidth = "border-width";
        public static readonly string BorderStyle = "border-style";



        public static readonly string ComponentName = "--component";
        public static readonly string SubComponentName = "--subComponent";

        public static readonly string[] ColorProperties = new string[] {BgColor,Color, BorderColor};
        public static readonly string[] MarginProperties = new string[] { MarginTop, MarginBottom, MarginRight, MarginLeft };
        public static readonly string[] PaddingProperties = new string[] { PaddingTop, PaddingBottom, PaddingRight, PaddingLeft };
        public static readonly string[] BorderProperties = new string[] {BorderWidth,BorderStyle};
        public static readonly string[] FontProperties = new string[] { FontSize, FontWeight };


        public static readonly string[] AlignValues = { "left","center","right"};
        public static readonly string[] BorderStyleValues = {"dotted","dashed","solid","double","groove","ridge","inset","outset","none","hidden"};
    }
}
