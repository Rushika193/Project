using SQLHelper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cbuilder.NewsLetter
{
    internal class GroupProvider
    {
        public async Task<int> AddUpdateGroup(GroupInfo grp, string UserName)
        {
            try
            {
                SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@GroupID", grp.GroupID),
                    new SQLParam("@Name", grp.Name),
                    new SQLParam("@AddedBy", UserName)
                };
                return await handler.ExecuteNonQueryAsync("usp_Wb_Mail_GroupAddUpdate", param, "@status");
            }
            catch
            {
                throw;
            }
        }

        public async Task<IList<GroupInfo>> GetGroupList()
        {
            try
            {
                SQLGetListAsync SQL = new SQLGetListAsync();
                return await SQL.ExecuteAsListAsync<GroupInfo>("usp_Wb_GetAllGroups");
            }
            catch
            {
                throw;
            }
        }
        public async Task DeleteGroup(int GroupID)
        {
            try
            {
                SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("@GroupID", GroupID)
                };
                await handler.ExecuteNonQueryAsync("[usp_Wb_Mail_Group_DeleteByID]", param);
            }
            catch
            {
                throw;
            }
        }
        public async Task<int> UpdateGroup(int GroupID)
        {
            try
            {
                SQLExecuteNonQueryAsync handler = new SQLExecuteNonQueryAsync();
                List<SQLParam> param = new List<SQLParam>
                {
                    new SQLParam("GroupID", GroupID)
                };
                return await handler.ExecuteNonQueryAsync("", param, "@status");
            }
            catch
            {
                throw;
            }
        }

    }
}
