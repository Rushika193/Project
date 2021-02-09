using Cbuilder.Core.API.Enum;
using Cbuilder.Core.API.Models;
using SQLHelper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace Cbuilder.ManageMassMail

{
    public class MassMailProvider
    {
        internal async Task<IList<MassMailFilterTypeInfo>> GetFilterValueList(int filterTypeID)
        {
            try
            {
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@FilterTypeID", filterTypeID)
                };
                SQLGetListAsync handler = new SQLGetListAsync();
                return await handler.ExecuteAsListAsync<MassMailFilterTypeInfo>("[dbo].[usp_wb_MassMail_GetFilterValues]", param);
            }
            catch
            {
                return null;
            }
        }
        internal async Task<IList<MassMailFilterTypeInfo>> GetAllUsersForAutoComplete(string username)
        {
            try
            {
                List<SQLParam> param = new List<SQLParam>()
                {
                    new SQLParam("@Username", username)
                };
                SQLGetListAsync handler = new SQLGetListAsync();
                return await handler.ExecuteAsListAsync<MassMailFilterTypeInfo>("[dbo].[usp_wb_MassMail_GetAllUsersForAutoComplete]", param);
            }
            catch
            {
                throw;
            }
        }

        internal async Task<IList<MassMailInfo>> GetMassMailList(int offset, int limit, int filterTypeID, string title, int status)
        {

            try
            {
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@offset", offset),
                    new SQLParam("@limit", limit),
                    new SQLParam("@MailTitle", title??string.Empty),
                    new SQLParam("@Status", status)
                };
                SQLGetListAsync handler = new SQLGetListAsync();
                return await handler.ExecuteAsListAsync<MassMailInfo>("[dbo].[usp_Wb_MassMail_GetMassMailList]", param);
            }
            catch
            {
                throw;
            }
        }

        internal async Task<OperationStatus> AddUpdateMassMail(MassMailAddInfo objMassMail, string username)
        {
            try
            {
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@MassMailID", objMassMail.MassMailID),
                    new SQLParam("@MessageMailTitle", objMassMail.MessageTitle),
                    new SQLParam("@IsRole", objMassMail.IsRolesUsers),
                    new SQLParam("@IsCustom", objMassMail.IsCustomMailList),
                    new SQLParam("@CustomRecipientGroup", objMassMail.CustomRecipientGroup),
                    new SQLParam("@IsSubscribe", objMassMail.IsSubscribeUser),
                    new SQLParam("@HasTarget", objMassMail.HasTargetUserInterest),
                    new SQLParam("@Gender", objMassMail.Gender),
                    new SQLParam("@ToAllGender", objMassMail.ToAllGender),
                    new SQLParam("@Roles", objMassMail.Roles),
                    new SQLParam("@Interests", objMassMail.Interests),
                    new SQLParam("@AdvanceFilters", objMassMail.AdvanceFilters),
                    new SQLParam("@AdditionalUser", objMassMail.AdditionalUser),
                    new SQLParam("@Subject", objMassMail.Subject),
                    new SQLParam("@MessageBody", objMassMail.MessageBody),
                    new SQLParam("@MessageEditDOM", objMassMail.MessageEditDOM),
                    new SQLParam("@IsInstant", objMassMail.IsInstant),
                    new SQLParam("@ScheduledOn", objMassMail.UTCScheduled),
                    new SQLParam("@TimeZoneOffset", objMassMail.TimeZoneOffset),
                    new SQLParam("@Username", username)
                };
                SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
                int result = await handler.ExecuteNonQueryAsync("[dbo].[usp_Wb_massMail_AddUpdateMassMail]", param, "@output");
                if (result == (int)StatusCode.Created)
                {
                    return new OperationStatus { IsSuccess = true, Message = "Mass mail created successfully.", StatusCode = StatusCode.Created, Result = result };
                }
                else if (result == (int)StatusCode.Updated || result == 2)
                {
                    return new OperationStatus { IsSuccess = true, Message = "Mass mail updated successfully.", StatusCode = StatusCode.Updated, Result = result };
                }
                return new OperationStatus { IsSuccess = false, Message = "Something went wrong.", StatusCode = StatusCode.ServerError, Result = result };
            }
            catch
            {
                throw;
            }
        }

        internal async Task<int> DeleteMassMail(string massMailID, string username)
        {
            try
            {
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@MassMailID", massMailID),
                    new SQLParam("@Username", username)
                };
                SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
                return await handler.ExecuteNonQueryAsync("[dbo].[usp_Wb_MassMail_DeleteMassMail]", param, "@output");
            }
            catch
            {
                throw;
            }
        }

        internal async Task<DataSet> GetMassMailDetailForEdit(long massmailID)
        {
            try
            {
                List<SQLParam> Param = new List<SQLParam>
                {
                    new SQLParam("@MassMailID", massmailID)
                };
                SQLGetListAsync objHandler = new SQLGetListAsync();
                DataSet ds = await objHandler.ExecuteAsDataSetAsync("[dbo].[usp_Wb_GetMailDetailByMassMailID]", Param);
                return ds;
            }
            catch
            {
                throw;
            }
        }
        internal async Task<SendsEmail> GetMailAndUserToSendMail(DateTime SecheduleDate)
        {
            try
            {
                const string sp = "[dbo].[usp_Wb_MassMail_GetMailForSend]";
                List<SQLParam> Param = new List<SQLParam>
                {
                    new SQLParam("@ScheduleDate", SecheduleDate)
                };
                SendsEmail objSendMail = new SendsEmail();
                SQLGetListAsync handler = new SQLGetListAsync();
                DataSet ds = await handler.ExecuteAsDataSetAsync(sp, Param);
                if (ds != null && ds.Tables.Count > 0)
                {
                    MailSendInfo objMail = DataSourceHelper.FillObject<MailSendInfo>(ds.Tables[0].CreateDataReader());
                    IList<UserInfo> userInfo = DataSourceHelper.FillCollection<UserInfo>(ds.Tables[1]);
                    if (objMail != null)
                        objSendMail.Mail = objMail;
                    if (userInfo != null)
                        objSendMail.Subscribers = userInfo;
                    return objSendMail;
                }
                else
                {
                    return null;
                }
            }
            catch
            {
                throw;
            }
        }
        internal async Task UpdateStausOfMail(DateTime ScheduleOn, eEmailStatus status)
        {
            try
            {
                const string sp = "[dbo].[usp_Wb__MassMail_UpdateStatusOfMail]";
                List<SQLParam> Param = new List<SQLParam>
                {
                    new SQLParam("@ScheduleOn", ScheduleOn),
                    new SQLParam("@Status", (int)status)
                };
                SQLExecuteNonQueryAsync objHandler = new SQLExecuteNonQueryAsync();
                await objHandler.ExecuteNonQueryAsync(sp, Param);
            }
            catch
            {
                throw;
            }
        }
        internal async Task<int> UpdateStausOfFailMail(long MailID, string userXML)
        {
            try
            {
                const string sp = "[dbo].[usp_Wb__MassMail_UpdateStatusOfSendMail]";
                List<SQLParam> Param = new List<SQLParam>
                {
                    new SQLParam("@userXML", userXML),
                    new SQLParam("@MailID", MailID)
                };
                SQLExecuteNonQueryAsync objHandler = new SQLExecuteNonQueryAsync();
                await objHandler.ExecuteNonQueryAsync(sp, Param);
                return 1;
            }
            catch
            {
                throw;
            }
        }
        public async Task<IList<MassMailInterestInfo>> GetInterest(string Keyword)
        {
            try
            {
                List<SQLParam> Param = new List<SQLParam>
                {
                    new SQLParam("@Keyword", Keyword)
                };
                SQLGetListAsync hdlrObj = new SQLGetListAsync();
                return await hdlrObj.ExecuteAsListAsync<MassMailInterestInfo>("[dbo].[usp_Wb_GetMassMailInterest]", Param);
            }
            catch
            {
                throw;
            }
        }
        public async Task<IList<MethodInvokerInfo>> GetAllAppMethods()
        {
            try
            {
                SQLGetListAsync hdlrObj = new SQLGetListAsync();
                return await hdlrObj.ExecuteAsListAsync<MethodInvokerInfo>("[dbo].[usp_Wb_MassMail_TokenReplaceInvoker]");
            }
            catch
            {
                throw;
            }
        }
        public async Task<IList<MassMailTimeZoneInfo>> GetAllTimeZone()
        {
            try
            {
                SQLGetListAsync hdlrObj = new SQLGetListAsync();
                return await hdlrObj.ExecuteAsListAsync<MassMailTimeZoneInfo>("[dbo].[usp_Wb_TimeZone_GetAll]");
            }
            catch
            {
                throw;
            }
        }
        internal async Task<int> AddMailByApp(MassMailAddInfo objMassMail, string username, string appName)
        {
            try
            {
                List<SQLParam> Param = new List<SQLParam>
                {
                    new SQLParam("@MessageTitle", objMassMail.MessageTitle),
                    new SQLParam("@Gender", objMassMail.Gender),
                    new SQLParam("@ToAllGender", objMassMail.ToAllGender),
                    new SQLParam("@Interests", objMassMail.Interests),
                    new SQLParam("@Subject", objMassMail.Subject),
                    new SQLParam("@MessageBody", objMassMail.MessageBody),
                    new SQLParam("@IsInstant", objMassMail.IsInstant),
                    new SQLParam("@ScheduledOn", objMassMail.UTCScheduled),
                    new SQLParam("@TimeZoneOffset", objMassMail.TimeZoneOffset),
                    new SQLParam("@Username", username),
                    new SQLParam("@AppName", appName)
                };
                SQLExecuteNonQueryAsync objHandler = new SQLExecuteNonQueryAsync();
                return await objHandler.ExecuteNonQueryAsync("[dbo].[usp_Wb_MassMail_AddMail_ByApp]", Param, "@output");
            }
            catch
            {
                throw;
            }
        }

        public async Task<MassMailReportInfo> GetReportByID(int MailID)
        {
            try
            {
                List<SQLParam> Param = new List<SQLParam>
                {
                    new SQLParam("@MailID", MailID)
                };
                SQLGetAsync objHandler = new SQLGetAsync();
                return await objHandler.ExecuteAsObjectAsync<MassMailReportInfo>("[dbo].[usp_Wb_MassMail_GetReportByID]", Param);
            }
            catch
            {
                throw;
            }
        }

        public async Task<IList<MassMailDeliverInfo>> GetMailReportByID(int MailID, int OffSet, int Limit, int Types)
        {
            try
            {
                List<SQLParam> Param = new List<SQLParam>
                {
                    new SQLParam("@MailID", MailID),
                    new SQLParam("@OffSet", OffSet),
                    new SQLParam("@Limit", Limit),
                    new SQLParam("@Types", Types)
                };
                SQLGetListAsync objHandler = new SQLGetListAsync();
                return await objHandler.ExecuteAsListAsync<MassMailDeliverInfo>("[dbo].[usp_Wb_MassMail_GetUsersReportByID]", Param);
            }
            catch
            {
                throw;
            }
        }
        public async Task AddMailSubscriberStatus(int MailID, string EmailAddress, int Status, int TryCount, string RejectionReason)
        {
            try
            {
                List<SQLParam> Param = new List<SQLParam>
                {
                    new SQLParam("@MailID", MailID),
                    new SQLParam("@EmailAddress", EmailAddress),
                    new SQLParam("@DeliverStatus", Status),
                    new SQLParam("@TryCount", TryCount),
                    new SQLParam("@RejectReason", RejectionReason)
                };
                SQLExecuteNonQueryAsync objHandler = new SQLExecuteNonQueryAsync();
                await objHandler.ExecuteNonQueryAsync("[dbo].[usp_Wb_MassMailStatusTracker_Add]", Param);
            }
            catch
            {
                throw;
            }
        }
    }
}