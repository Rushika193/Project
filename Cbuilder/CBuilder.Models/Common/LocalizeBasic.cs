using System;
using System.Collections.Generic;
using System.Reflection.Metadata;
using System.Text;

namespace Cbuilder.Core.Models
{
    public class BasicLocalLabel
    {
        public static string ItemName = "Item";
        public string AddNew { get; set; } = "Add New";
        public string Add { get; set; } = "Add";
        public string Save { get; set; } = "Save";
        public string SaveAsDraft { get; set; } = "Draft";
        public string Publish { get; set; } = "Publish";
        public string Submit { get; set; } = "Submit";
        public string Update { get; set; } = "Update";
        public string Cancel { get; set; } = "Cancel";
        public string Exit { get; set; } = "Exit";
        public string View { get; set; } = "View";
        public string Preview { get; set; } = "Preview";
        public string Back { get; set; } = "Back";
        public string Search { get; set; } = "Search";
        public string Reset { get; set; } = "Reset";
        public string Status { get; set; } = "Status";
        public string Action { get; set; } = "Action";
        public string SearchPlaceHolder { get; set; } = "Search by keywords";
        public string Close { get; set; } = "Close";
        public string Open { get; set; } = "Open";
        public string Edit { get; set; } = "Edit";
        public string Clone { get; set; } = "Clone";
        public string Copy { get; set; } = "Copy";
        public string Paste { get; set; } = "Paste";
        public string Delete { get; set; } = "Delete";
        public string DeleteConfirm { get; set; } = "Are you sure to delete?";
        public string Activate { get; set; } = "Activate";
        public string Active { get; set; } = "Active";
        public string Deactivate { get; set; } = "Deactivate";
        public string InActive { get; set; } = "Inactive";
        public string Details { get; set; } = "Details";
        public string SetDefault { get; set; } = "Set Default";
        public string GridHeading { get; set; } = string.Format("Manage {0}",ItemName);
        public string AddFormHeading { get; set; } = string.Format("Create {0}",ItemName);
        public string EditFormHeading { get; set; } =string.Format("Edit {0}", ItemName);
        public string DetailHeading { get; set; } =string.Format("{0} Details",ItemName);
        public string NoData { get; set; } = "No data to display.";
       /// <summary>
       /// For Validation Message
       /// </summary>
        public string Required { get; set; } = "Required";
    }
    public class BasicLocalMessage
    {
        public static string ItemName = "Item";
        public string AddSuccess { get; set; } =string.Format("{0} Created Successfully.",ItemName);
        public string UpdateSuccess { get; set; } = string.Format("{0} Update Successfully.", ItemName);
        public string DeleteSuccess { get; set; } = string.Format("{0} Delete Successfully.", ItemName);
        public string ActivateSuccess { get; set; } = string.Format("{0} Activate Successfully.", ItemName);
        public string DeActivateSuccess { get; set; } = string.Format("{0} Deactivated successfully.", ItemName);
        public string InvalidData { get; set; } = "Invalid data.";
        public string InvalidRequest { get; set; } = "Invalid request.";
        public string RequiredFieldMissing { get; set; } = "Required field are missing";
        public string ItemAlreadyExist { get; set; } = string.Format("{0} already exists.", ItemName);
        public string ItemNotExist { get; set; } = string.Format("{0} does not exists.", ItemName);
    }
    public class BasicLocalText : BasicLocalLabel
    {
        public string AddSuccess { get; set; } = string.Format("{0} Created Successfully.", ItemName);
        public string UpdateSuccess { get; set; } = string.Format("{0} Update Successfully.", ItemName);
        public string DeleteSuccess { get; set; } = string.Format("{0} Delete Successfully.", ItemName);
        public string ActivateSuccess { get; set; } = string.Format("{0} Activate Successfully.", ItemName);
        public string DeActivateSuccess { get; set; } = string.Format("{0} Deactivated successfully.", ItemName);
        public string InvalidData { get; set; } = "Invalid data.";
        public string InvalidRequest { get; set; } = "Invalid request.";
        public string RequiredFieldMissing { get; set; } = "Required field are missing";
        public string ItemAlreadyExist { get; set; } = string.Format("{0} already exists.", ItemName);
        public string ItemNotExist { get; set; } = string.Format("{0} does not exists.", ItemName);
    }
}
