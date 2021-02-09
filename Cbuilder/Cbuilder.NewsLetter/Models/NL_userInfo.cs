using SageFrame.Web;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace Cbuilder.NewsLetter
{
    /// <summary>
    /// This class holds the properties for NL_Info.
    /// </summary>
    public class NL_UserInfo
    {
        public int SubscriberID { get; set; }
        public string SubscriberEmail { get; set; }
        public bool IsImported { get; set; }
        public string ClientIP { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public UserGender Gender { get; set; }
        /// <summary>
        /// Comma separated strings
        /// </summary>
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string Interest { get; set; }
        public bool InterestInAll { get; set; }
        public string AddedBy { get; set; }
        public string Location { get; set; }
        public string PhoneNumber { get; set; }
        public string CompanyName { get; set; }
        public int Source { get; set; }
        public string Profession { get; set; }
        public string RecipientGroup { get; set; }
        public string UniqueCode { get; set; }
    }
    public enum UserGender
    {
        Male = 0,
        Female = 1,
        Others = 2
    }
    public enum Source
    {
        Import = 1,
        Form = 2
    }

}
