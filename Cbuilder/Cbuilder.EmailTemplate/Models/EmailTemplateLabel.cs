using Cbuilder.Core.Models;
using System.Security.Permissions;

namespace Cbuilder.EmailTemplate
{
    public class EmailTemplateLabel : BasicLocalText
    {
        public string FilterHeading { get; set; }
        public string FilterPlaceholder { get; set; }
        public string PreviewHeading { get; set; }
        public string NextLbl { get; set; }
        public string SendTestEmailLbl { get; set; }
        public string FormNameLbl { get; set; }
        public string FormSubjectLbl { get; set; }
        public string FormCategoryLbl { get; set; }
        public string FormScreenshotLbl { get; set; }
        public string FormAddCategoryLbl { get; set; }
        public string FormNewLbl { get; set; }
        public string SendTestMailTitle { get; set; }
        public string SendLbl { get; set; }
        public string ConfirmationTitle { get; set; }
        public string ConfirmationMessageTxt { get; set; }
        public string ConfContinueEditingLbl { get; set; }
        public string ConfCreateAnotherLbl { get; set; }
        public string ConfExitLbl { get; set; }
        public string  NoMailTemplateNextError { get; set; }
        public string  NoMailTemplatePreviewError { get; set; }
        public string TestMailSuccess { get; set; }
        public string TestMailFail { get; set; }
        public string EmptyThemeName { get; set; }
        public string EmptySub { get; set; }
        public string NoTemplateCat { get; set; }
        public string CategoryAddSuccess { get; set; }
        public string CategoryUpdateSuccess { get; set; }
        public string CategoryAlreadyExistError { get; set; }
        public string CategoryDeleteSucces { get; set; }
        public string SytemReservedCatDeleteError { get; set; }
    }
}
