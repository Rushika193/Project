using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Core.Localization
{
    public class LocalizationResponse
    {
        public string FilePath { get; set; } = string.Empty;
        public bool Equal { get; set; } = false;
    }
}
