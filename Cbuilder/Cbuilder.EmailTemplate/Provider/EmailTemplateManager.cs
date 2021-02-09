using Cbuilder.Core.API.Enum;
using Cbuilder.Core.API.Models;
using SQLHelper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cbuilder.EmailTemplate
{
    public class EmailTemplateManager : IEmailTemplateManager
    {

        #region Category
        public async Task<int> AddUpdateCategory(EmailTemplateCategory category, int SiteID, string Username)
        {
            try
            {
                SQLExecuteNonQueryAsync sql = new SQLExecuteNonQueryAsync();
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@CatID",category.CategoryID),
                    new SQLParam("@CatName",category.CategoryName),
                    new SQLParam("@SiteID",SiteID),
                    new SQLParam("@Username",Username),
                };
                return await sql.ExecuteNonQueryAsync("[dbo].[usp_Email_Template_Category_AddUpdate]", param, "@Status");

            }
            catch
            {
                throw;
            }
        }

        public async Task<IList<EmailTemplateCategory>> GetCategoryList(int OffSet, int Limit, int SiteID)
        {
            try
            {
                SQLGetListAsync sql = new SQLGetListAsync();
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@OffSet",OffSet),
                    new SQLParam("Limit",Limit),
                    new SQLParam("@SiteID",SiteID),

                };
                return await sql.ExecuteAsListAsync<EmailTemplateCategory>("[dbo].[usp_Email_Template_Category_GetAll]", param);

            }
            catch
            {
                throw;
            }
        }

        public async Task<EmailTemplateCategory> GetCategoryByID(int CatID, int SiteID)
        {

            try
            {
                SQLGetAsync sql = new SQLGetAsync();
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@CatID",CatID),

                    new SQLParam("@SiteID",SiteID),

                };
                return await sql.ExecuteAsObjectAsync<EmailTemplateCategory>("[dbo].[usp_Email_Template_Category_GetByID]", param);

            }
            catch
            {
                throw;
            }
        }

        public async Task<int> RemoveCategory(int CatID, string UserName, int SiteID)
        {
            try
            {
                SQLExecuteNonQueryAsync sql = new SQLExecuteNonQueryAsync();
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@CatID",CatID),
                    new SQLParam("@UserName",UserName),
                    new SQLParam("@SiteID",SiteID),

                };
                return await sql.ExecuteNonQueryAsync("[dbo].[usp_Email_Template_Category_DeleteByID]", param, "@Status");

            }
            catch
            {
                throw;
            }
        }
        #endregion
        #region Component
        public async Task<OperationStatus> AddUpdateComponent(string ComponentName, string ComponentValue)
        {
            try
            {
                SQLExecuteNonQueryAsync sql = new SQLExecuteNonQueryAsync();
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@ComponentName",ComponentName),
                    new SQLParam("@ComponentValue",ComponentValue)

                };
                int status = await sql.ExecuteNonQueryAsync("[dbo].[usp_Email_Template_Component_AddUpdate]", param, "@Status");
                //if (status == (int)SpOperation.Insert)
                if (status == 1)
                    return new OperationStatus() { Message = "Component Added Successfully." };
                return new OperationStatus() { Message = "Component Updated Successfully." };
            }
            catch
            {
                throw;
            }

        }

        public async Task<IList<EmailTemplateComponent>> GetAllComponent()
        {
            try
            {
                SQLGetListAsync sql = new SQLGetListAsync();
                return await sql.ExecuteAsListAsync<EmailTemplateComponent>("[dbo].[usp_Email_Template_Component_GetAll]");

            }
            catch
            {
                throw;
            }

        }
        #endregion
        #region Email Template
        public async Task<OperationStatus> AddUpdateTemplate(EmailTemplate tem, int SiteID, string UserName)
        {
            try
            {
                SQLExecuteNonQueryAsync sql = new SQLExecuteNonQueryAsync();
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@TemplateID",tem.TemplateID),
                    new SQLParam("@EditDOM",tem.EditDOM),
                    new SQLParam("@ViewDOM",tem.ViewDOM),
                    new SQLParam("@Name",tem.Name),
                    new SQLParam("@Subject",tem.Subject),
                    new SQLParam("@CultureCode",tem.CultureCode),
                    new SQLParam("@ScreenShot",tem.ScreenShot),
                    new SQLParam("@CatID",tem.CategoryID),
                    new SQLParam("@SiteID",SiteID),
                    new SQLParam("@Username",UserName),
                };
                int TempID = await sql.ExecuteNonQueryAsync("[dbo].[usp_Email_Template_AddUpdate]", param, "@TempID");
                return new OperationStatus() { StatusCode = tem.TemplateID == 0 ? StatusCode.Created : StatusCode.Updated, Result = TempID };
            }
            catch
            {
                throw;
            }
        }
        public async Task<EmailTemplate> GetTemplateByID(int TemplateID, int SiteID)
        {

            try
            {
                SQLGetAsync sql = new SQLGetAsync();
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@TemplateID",TemplateID),
                    new SQLParam("@SiteID",SiteID),

                };
                return await sql.ExecuteAsObjectAsync<EmailTemplate>("[dbo].[usp_Email_Template_GetByID]", param);

            }
            catch
            {
                throw;
            }
        }
        public async Task<EmailTemplate> GetByIdentifier(string Identifier)
        {
            try
            {
                SQLGetAsync sql = new SQLGetAsync();
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@TemplateID",Identifier)
                };
                return await sql.ExecuteAsObjectAsync<EmailTemplate>("[dbo].[usp_Email_Template_GetByIdentifier]", param);

            }
            catch
            {
                throw;
            }

        }
        public async Task<IList<EmailTemplate>> GetAllTemplate(int OffSet, int Limit, int SiteID, string SearchKey, string Category, bool IsMassMail)
        {
            try
            {
                SQLGetListAsync sql = new SQLGetListAsync();
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@OffSet",OffSet),
                    new SQLParam("Limit",Limit),
                    new SQLParam("@SiteID",SiteID),
                    new SQLParam("@Category",Category??string.Empty),
                    new SQLParam("@SearchKey",SearchKey??string.Empty),
                    new SQLParam("@IsMassMail",IsMassMail)

                };
                return await sql.ExecuteAsListAsync<EmailTemplate>("[dbo].[usp_Email_Template_GetAll]", param);
            }
            catch
            {
                throw;
            }

        }
        public async Task<OperationStatus> RemoveTemplateByID(int TemplateID, string UserName, int SiteID)
        {
            try
            {
                SQLExecuteNonQueryAsync sql = new SQLExecuteNonQueryAsync();
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@TemplateID",TemplateID),
                    new SQLParam("@SiteID",SiteID),
                    new SQLParam("@UserName",UserName),
                };
                await sql.ExecuteNonQueryAsync("[dbo].[usp_Email_Template_DeleteByID]", param);
                return new OperationStatus() { Message = "Template Deleted Successfully." };
            }
            catch
            {
                throw;
            }

        }
        #endregion
        #region Email Token
        public async Task<OperationStatus> AddUpdateToken(int TokenID, string Token, string SampleValue, string Types, int SiteID, string UserName)
        {
            throw new NotImplementedException();
        }
        public async Task<IList<EmailToken>> GetTokenList(string Type)
        {
            try
            {
                SQLGetListAsync sql = new SQLGetListAsync();
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@Type",Type)
                };
                return await sql.ExecuteAsListAsync<EmailToken>("[dbo].[usp_Email_Template_Tokens_GetAll]", param);
            }
            catch
            {
                throw;
            }
        }
        public async Task<EmailToken> GetTokenByID(int TokenID)
        {
            throw new NotImplementedException();
        }

        public async Task<OperationStatus> RemoveToken(int TokenID, string UserName)
        {
            throw new NotImplementedException();
        }
        public IList<TokenKeyValue> GetUserToken(UserInfo userInfo, UserTokenType type)
        {
            IList<TokenKeyValue> lstUserToken = new List<TokenKeyValue>();
            if (userInfo != null)
            {
                lstUserToken.Add(new TokenKeyValue { Key = MailToken.UserName, Value = userInfo.UserName });
                lstUserToken.Add(new TokenKeyValue { Key = MailToken.FirstName, Value = userInfo.FirstName });
                lstUserToken.Add(new TokenKeyValue { Key = MailToken.LastName, Value = userInfo.LastName });
                lstUserToken.Add(new TokenKeyValue { Key = MailToken.Email, Value = userInfo.Email });
                lstUserToken.Add(new TokenKeyValue { Key = MailToken.UserActivationCode, Value = userInfo.UserActivationCode });
            }
            return lstUserToken;
        }

        public string ReplaceToken(string MailBody, IList<TokenKeyValue> Tokens)
        {
            foreach (TokenKeyValue t in Tokens)
            {
                MailBody = MailBody.Replace(t.Key, t.Value);
            }
            return MailBody;
        }

        #endregion
    }
}
