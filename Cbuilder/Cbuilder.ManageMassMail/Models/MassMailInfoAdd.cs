using System;
using System.ComponentModel.DataAnnotations;

namespace Cbuilder.ManageMassMail
{
    public class MassMailAddInfo
    {
        public long MassMailID { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string MessageTitle { get; set; }
        public bool IsRolesUsers { get; set; }
        public bool IsCustomMailList { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string CustomRecipientGroup { get; set; }
        public bool IsSubscribeUser { get; set; }
        public bool HasTargetUserInterest { get; set; }
        /// <summary>
        /// Comma separated integer. 1-Male 2-Female 3-Others (eg. 1,2,3)
        /// </summary>
        public string Gender { get; set; }
        public bool ToAllGender { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string Roles { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string Interests { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string AdvanceFilters { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string AdditionalUser { get; set; }
        public string Subject { get; set; }
        public string MessageBody { get; set; }
        public string MessageEditDOM { get; set; }
        public bool IsInstant { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string ScheduledOn { get; set; }

        public string TimeZoneOffset { get; set; }
        public DateTime UTCScheduled
        {
            get
            {
                if (!string.IsNullOrEmpty(TimeZoneOffset))
                    return DateTimeController.GetTimeZoneTime(DateTime.Parse(this.ScheduledOn), this.TimeZoneOffset);
                else
                    return DateTimeController.GetLocalTime(DateTime.UtcNow.ToLocalTime());
            }
        }
    }
}
