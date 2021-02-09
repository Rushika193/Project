using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.NewsLetter
{
    public class ImportUserInfo
    {
        public int SubscriberID { get; set; }
        public string SubscriberEmail { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public UserGender Gender { get; set; }
        public string PhoneNumber { get; set; }
        public string Profession { get; set; }
        public string CompanyName { get; set; }
        /// <summary>
        /// Comma separated strings
        /// </summary>
        public string Interest { get; set; }
        public bool InterestInAll { get; set; }
        public string Location { get; set; }
        public string RecipientGroup { get; set; }
        public string UserSex
        {
            get
            {
                if (this.Gender == UserGender.Male)
                    return "Male";
                else if (this.Gender == UserGender.Female)
                    return "Female";
                else
                    return "Others";
            }
        }
        public int RowTotal { get; set; }
        public int RowNum { get; set; }
    }
}
