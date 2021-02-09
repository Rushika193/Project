using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Theme
{
    public class CssParserRule
    {
        public CssParserRule(string media)
        {
            Selectors = new List<string>();
            Declarations = new List<CssParserDeclaration>();
            Media = media;
        }

        public string Media { get; set; }
        public IEnumerable<string> Selectors { get; set; }
        public IEnumerable<CssParserDeclaration> Declarations { get; set; }
    }
}
