using Cbuilder.Core.Helper;
using System;

namespace Cbuilder.Webbuilder
{
    public class WebBuilderInfo
    {
        public int WebBuilderID { get; set; }
        public string EditDOM { get; set; } = string.Empty;
        public string ViewDOM { get; set; } = string.Empty;
        public string Culture { get; set; } = string.Empty;
        public string CultureURL { get; set; } = string.Empty;
        public string SecureToken { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string PageName { get; set; } = string.Empty;
        public string Header { get; set; } = string.Empty;
        public string HeaderEdit { get; set; } = string.Empty;
        public string Footer { get; set; } = string.Empty;
        public string FooterEdit { get; set; } = string.Empty;
        // put any settings with this property
        public string Settings { get; set; } = string.Empty;
        //In future if needed for additional field
        public string Extra { get; set; } = string.Empty;
        public string PackageXML { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        /// <summary>
        /// Returns or retains true if the message template is deleted
        /// </summary>
        public bool IsDeleted { get; set; }
        /// <summary>
        /// Gets or sets message template added date
        /// </summary>
        private DateTime _AddedOn;
        public DateTime AddedOn
        {
            get
            {
                return DateTimeHelper.GetLocalTime(_AddedOn);
            }
            set
            {
                if ((this._AddedOn != value))
                    this._AddedOn = value;

            }
        }
        /// <summary>
        /// Gets or sets message template update date
        /// </summary>
        private DateTime _UpdatedOn;
        public DateTime UpdatedOn
        {
            get
            {
                return DateTimeHelper.GetLocalTime(_UpdatedOn);
            }
            set
            {
                if ((this._UpdatedOn != value))
                    this._UpdatedOn = value;

            }
        }
        /// <summary>
        /// Gets or sets message template deleted date
        /// </summary>
        private DateTime _DeletedOn;
        public DateTime DeletedOn
        {
            get
            {
                return DateTimeHelper.GetLocalTime(_DeletedOn);
            }
            set
            {
                if ((this._DeletedOn != value))
                    this._DeletedOn = value;
            }
        }
        public int CloneWebBuilderID { get; set; }
        public int SiteID { get; set; } = 0;
        public string PageComponent { get; set; } = string.Empty;
        public string HeaderFooterComponent { get; set; } = string.Empty;
    }
}
