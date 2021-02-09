using SQLHelper;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace Cbuilder.NewsLetter
{
    /// <summary>
    /// Manipulates data for NL_Controller class.
    /// </summary>
    internal class NL_Provider
    {
        /// <summary>
        /// Connects to database and save email for subscribing.
        /// </summary>

        public async Task<int> SaveEmailSubscriber(NL_UserInfo objInfo)
        {
            try
            {
                List<SQLParam> Param = new List<SQLParam>
                {
                    new SQLParam("@SubscriberID", objInfo.SubscriberID),
                    new SQLParam("@SubscriberEmail", objInfo.SubscriberEmail),
                    new SQLParam("@ClientIP", objInfo.ClientIP),
                    new SQLParam("@FirstName", objInfo.FirstName),
                    new SQLParam("@LastName", objInfo.LastName),
                    new SQLParam("@Location", objInfo.Location),
                    new SQLParam("@Gender", (int)objInfo.Gender),
                    new SQLParam("@InterestInAll", objInfo.InterestInAll),
                    new SQLParam("@Interest", objInfo.Interest),
                    new SQLParam("@IsImported", objInfo.IsImported),
                    new SQLParam("@RecipientGroup", objInfo.RecipientGroup),
                    new SQLParam("@CompanyName", objInfo.CompanyName),
                    new SQLParam("@PhoneNumber", objInfo.PhoneNumber),
                    new SQLParam("@Profession", objInfo.Profession),
                    new SQLParam("@Source", objInfo.Source),
                    new SQLParam("@AddedBy", objInfo.AddedBy)
                };
                SQLExecuteNonQueryAsync sqlh = new SQLExecuteNonQueryAsync();
                return await sqlh.ExecuteNonQueryAsync("[dbo].[usp_Wb_Mail_NL_Subscriber_Add]", Param, "@OpStatus");
            }
            catch
            {
                throw;
            }
        }


        public async Task<int> UnSubscribeByEmailLink(string UniqueCode, string Reason)
        {
            try
            {
                List<SQLParam> Param = new List<SQLParam>
                {
                    new SQLParam("@UniqueCode", UniqueCode),
                    new SQLParam("@Reason", Reason)
                };
                SQLExecuteNonQueryAsync sqlh = new SQLExecuteNonQueryAsync();
                return await sqlh.ExecuteNonQueryAsync("usp_Wb_Mail_NL_Subscriber_Unsubscribe", Param, "@OpStatus");

            }
            catch
            {
                throw;
            }
        }
        /// <summary>
        /// Connects to database and returns NL_Info list containing subscriber list.
        /// </summary>
        /// <param name="index">index</param>
        /// <returns>NL_Info list</returns>
        public async Task<IList<NL_UserInfo>> GetSubscriberList(int index)
        {
            try
            {
                List<SQLParam> Param = new List<SQLParam>
                {
                    new SQLParam("@Offset", index)
                };
                SQLGetListAsync sqlh = new SQLGetListAsync();
                return await sqlh.ExecuteAsListAsync<NL_UserInfo>("usp_NL_GetSubscriberList", Param);
            }
            catch
            {
                throw;
            }
        }

        private async Task<IList<InterestAPIInfo>> GetInvokerAPI(string invokerType)
        {
            try
            {
                SQLGetListAsync sqlh = new SQLGetListAsync();
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@InvokerType", invokerType)
                };
                return await sqlh.ExecuteAsListAsync<InterestAPIInfo>("usp_Wb_Mail_SpInvoker_GetAll", param);
            }
            catch
            {
                throw;
            }
        }
        internal async Task<DataSet> GetCustomerInterest(int SiteID)
        {
            try
            {
                DataSet finalDataSet = new DataSet();

                List<InterestInfo> lstInterest = new List<InterestInfo>();
                IList<InterestAPIInfo> lstAPI = await this.GetInvokerAPI("interest");
                SQLGetListAsync sqlh = new SQLGetListAsync();
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@SiteID", SiteID)
                };
                foreach (InterestAPIInfo objAPI in lstAPI)
                {
                    DataSet ds = await sqlh.ExecuteAsDataSetAsync(objAPI.StoreProcName, param);
                    for (int i = 0; i < ds.Tables.Count; i++)
                    {
                        DataTable dt = ds.Tables[i];
                        if (dt.Rows.Count == 0)
                        {
                            ds.Tables.Remove(dt);
                        }
                    }

                    finalDataSet.Merge(ds);
                    //lstInterest.AddRange(lst);
                }
                return finalDataSet;// lstInterest.Select(x => x.CategoryName).Distinct().ToList();
            }
            catch
            {
                throw;
            }
        }

        //GetInterestForCampaign
        internal async Task<DataSet> GetInterestForCampaign(int SiteID)
        {
            try
            {
                DataSet finalDataSet = new DataSet();
                SQLGetListAsync sqlh = new SQLGetListAsync();
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@SiteID", SiteID)
                };
                finalDataSet = await sqlh.ExecuteAsDataSetAsync("[dbo].[usp_Wb_massMail_GetInterests]", param);
                for (int i = 0; i < finalDataSet.Tables.Count; i++)
                {
                    DataTable dt = finalDataSet.Tables[i];
                    if (dt.Rows.Count == 0)
                    {
                        finalDataSet.Tables.Remove(dt);
                    }
                }
                return finalDataSet;// lstInterest.Select(x => x.CategoryName).Distinct().ToList();
            }
            catch
            {
                throw;
            }
        }

        public async Task<IList<ImportUserInfo>> GetAllImportUser(string searchKey, int offset, int limit, int isImported, int isSubscribed)
        {
            try
            {
                List<SQLParam> Param = new List<SQLParam>
                {
                    new SQLParam("@SearchKey", searchKey),
                    new SQLParam("@Offset", offset),
                    new SQLParam("@Limit", limit),
                    new SQLParam("@IsImported", isImported),
                    new SQLParam("@IsSubscribed", isSubscribed)
                };
                SQLGetListAsync sqlh = new SQLGetListAsync();
                return await sqlh.ExecuteAsListAsync<ImportUserInfo>("usp_Wb_Mail_NL_Subscriber_GetAllImported", Param);

            }
            catch
            {
                throw;
            }
        }
        public async Task<ImportUserInfo> GetImportUserByID(int subscriberID)
        {
            try
            {
                List<SQLParam> Param = new List<SQLParam>
                {
                    new SQLParam("@SubscriberID", subscriberID)
                };
                SQLGetAsync sqlh = new SQLGetAsync();
                return await sqlh.ExecuteAsObjectAsync<ImportUserInfo>("usp_Wb_Mail_NL_Subscriber_GetImported", Param);
            }
            catch
            {
                throw;
            }
        }
        public async Task<NL_UserInfo> GetByEmail(string EmailAddress)
        {
            try
            {
                List<SQLParam> Param = new List<SQLParam>
                {
                    new SQLParam("@Email", EmailAddress)
                };
                SQLGetAsync sqlh = new SQLGetAsync();
                return await sqlh.ExecuteAsObjectAsync<NL_UserInfo>("[usp_Wb_Mail_NL_Subscriber_GetByEmail]", Param);
            }
            catch
            {
                throw;
            }
        }
        public async Task DeleteImportUserByID(int subscriberID)
        {
            try
            {
                List<SQLParam> Param = new List<SQLParam>
                {
                    new SQLParam("@SubscriberID", subscriberID)
                };
                SQLExecuteNonQueryAsync sqlh = new SQLExecuteNonQueryAsync();
                await sqlh.ExecuteNonQueryAsync("usp_Wb_Mail_NL_Subscriber_DelImportedByID", Param);
            }
            catch
            {
                throw;
            }
        }

        public async Task DeleteMultImportedUser(string subscriberID)
        {
            try
            {
                List<SQLParam> Param = new List<SQLParam>
                {
                    new SQLParam("@SubscriberID", subscriberID)
                };

                SQLExecuteNonQueryAsync sqlh = new SQLExecuteNonQueryAsync();
                await sqlh.ExecuteNonQueryAsync("usp_Wb_Mail_NL_Subscriber_DelSelectedImported", Param);
            }
            catch
            {
                throw;
            }
        }

        internal async Task<DataSet> GetAdvanceFilters(int SiteID)
        {
            try
            {
                DataSet finalDataSet = new DataSet();
                IList<InterestAPIInfo> lstAPI = await this.GetInvokerAPI("advance");
                SQLGetListAsync sqlh = new SQLGetListAsync();
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@SiteID", SiteID)
                };
                foreach (InterestAPIInfo objAPI in lstAPI)
                {
                    DataSet ds = await sqlh.ExecuteAsDataSetAsync(objAPI.StoreProcName, param);
                    for (int i = 0; i < ds.Tables.Count; i++)
                    {
                        DataTable dt = ds.Tables[i];
                        if (dt.Rows.Count == 0)
                        {
                            ds.Tables.Remove(dt);
                        }
                    }
                    finalDataSet.Merge(ds);
                }
                return finalDataSet;// lstInterest.Select(x => x.CategoryName).Distinct().ToList();
            }
            catch
            {
                throw;
            }
        }
    }
}