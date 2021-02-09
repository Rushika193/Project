using System;

namespace Cbuilder.ManageMassMail
{
    public class MassMailInfo
    {
        public int RowTotal { get; set; }
        public int RowNum { get; set; }
        public long MassMailID { get; set; }
        public string MessageTitle { get; set; }
        public bool IsRolesUsers { get; set; }
        public bool IsCustomMailList { get; set; }
        public bool IsSubscribeUser { get; set; }
        public bool IsInstant { get; set; }
        public bool IsAddedByApp { get; set; }
        public int Gender { get; set; }
        public string Subject { get; set; }
        public string StatusName { get; set; }
        public eEmailStatus StatusID { get; set; }
        public string Status
        {
            get
            {
                return this.StatusID.GetAttrValue();
            }
        }
        private string _ScheduledOn;
        public string TimeZoneOffset { get; set; }

        public string ScheduledOn
        {
            get
            {
                return DateTimeController.GetTimeZoneFromUtcTime(DateTime.Parse(this._ScheduledOn),this.TimeZoneOffset).ToString("MM/dd/yyyy HH:mm");
            }
            set { this._ScheduledOn = value; }
        }


        public string AddedBy { get; set; }
        private string _AddedOn;

        public string AddedOn
        {
            get
            {
                return DateTimeController.GetLocalTime(_AddedOn).ToShortDateString();
            }
            set { _AddedOn = value; }
        }
        public int ScheduleType { get; set; }

       
    }
}
