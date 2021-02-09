using Cbuilder.Core.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cbuilder.EmailTemplate
{
    public interface IEmailTemplateManager
    {
        #region Category
        Task<int> AddUpdateCategory(EmailTemplateCategory category, int SiteID, string Username);

        Task<IList<EmailTemplateCategory>> GetCategoryList(int OffSet, int Limit, int SiteID);

        Task<EmailTemplateCategory> GetCategoryByID(int CatID, int SiteID);

        Task<int> RemoveCategory(int CatID, string UserName, int SiteID);
        #endregion
        #region Component
        Task<OperationStatus> AddUpdateComponent(string ComponentName, string ComponentValue);

        Task<IList<EmailTemplateComponent>> GetAllComponent();
        #endregion
        #region Email Template
        Task<OperationStatus> AddUpdateTemplate(EmailTemplate Temp, int SiteID, string UserName);
        Task<EmailTemplate> GetTemplateByID(int TemplateID, int SiteID);
        Task<EmailTemplate> GetByIdentifier(string Identifier);
        Task<IList<EmailTemplate>> GetAllTemplate(int OffSet, int Limit, int SiteID, string SearchKey, string Category, bool IsMassMail);
        Task<OperationStatus> RemoveTemplateByID(int TemplateID, string UserName, int SiteID);
        #endregion
        #region Email Token
        Task<OperationStatus> AddUpdateToken(int TokenID, string Token, string SampleValue, string Types, int SiteID, string UserName);
        Task<IList<EmailToken>> GetTokenList(string type);
        Task<EmailToken> GetTokenByID(int TokenID);

        Task<OperationStatus> RemoveToken(int TokenID, string UserName);
        IList<TokenKeyValue> GetUserToken(UserInfo userInfo, UserTokenType type);

        string ReplaceToken(string MailBody, IList<TokenKeyValue> Tokens);

        #endregion
     
    }
}
