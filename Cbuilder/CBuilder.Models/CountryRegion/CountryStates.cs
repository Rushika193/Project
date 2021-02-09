using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.CountryRegion.Models
{
    public class APICountryInfo
    {
        public int CountryID { get; set; }
        public string CountryName { get; set; }
        public string CountryCode { get; set; }
        public string Demonym { get; set; }
    }

    public class CountryStates
    {
        public int StateID { get; set; }
        public string States { get; set; }
        public string CountryCode { get; set; }
    }
}
