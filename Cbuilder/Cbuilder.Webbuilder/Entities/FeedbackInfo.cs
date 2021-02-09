using System;

namespace Cbuilder.WebBuilder
{
    public class FeedbackDetails
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string EmailID { get; set; }
        public string Category { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Domain { get; set; }
        public string SentBy { get; set; }
        public DateTime ReceivedOn { get; set; }
        public string ReceivedDate { get { return this.ReceivedOn.ToString(); } }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Rating { get; set; }
        public int PageSize { get; set; }
        public int PageNumber { get; set; }
        public int TotalCount { get; set; }
        public string Keyword { get; set; }
        public int UserModuleID { get; set; }
        public string IsRead { get; set; }
        public string ReadBy { get; set; }
        public int PortalID { get; set; }
        public string CultureCode { get; set; }
        public string SortName { get; set; }
        public string SortOrder { get; set; }
        public string SecureToken { get; set; }
    }
}
