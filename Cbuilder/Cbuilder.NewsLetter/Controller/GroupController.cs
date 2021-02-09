using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cbuilder.NewsLetter
{
    public class GroupController
    {
        public async Task<int> AddUpdateGroup(GroupInfo obj, string UserName)
        {
            try
            {
                GroupProvider grp = new GroupProvider();
                return await grp.AddUpdateGroup(obj, UserName);
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
                GroupProvider provider = new GroupProvider();
                return await provider.GetGroupList();
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
                GroupProvider grp = new GroupProvider();
                await grp.DeleteGroup(GroupID);
            }
            catch
            {
                throw;
            }
        }
    }
}
