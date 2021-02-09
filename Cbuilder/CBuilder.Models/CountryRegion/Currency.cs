using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.CountryRegion.Models
{

    public class Currency
    {
        public int CurrencyID { get; set; }

        public string Code { get; set; }

        public string CurrencyName { get; set; }

        public string Symbol { get; set; }

        public string Alpha2Code { get; set; }

        public string Alpha3Code { get; set; }

        public int? CountryID { get; set; }
    }
}
