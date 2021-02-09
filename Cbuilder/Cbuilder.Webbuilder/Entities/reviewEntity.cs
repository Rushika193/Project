using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.WebBuilder
{
    [DataContract]
    public class ReviewEntity
    {
        [DataMember(Order =1)]
        public int ReviewID { get; set; }

        [DataMember(Order =2)]
        public string AddedBy { get; set; }

        [DataMember(Order =3)]
        public string Email { get; set; }

        [DataMember(Order =4)]
        public string Review { get; set; }

        [DataMember(Order =5)]
        public string AddedOn { get; set; }

        [DataMember(Order =6)]
        public string UpdatedOn { get; set; } 
        [DataMember(Order =7)]
        public int UserModuleID { get; set; }
        [DataMember(Order =8)]
        public int PortalID { get; set; }

        public string UserName { get; set; }
        public string Password { get; set; }

    }
}
