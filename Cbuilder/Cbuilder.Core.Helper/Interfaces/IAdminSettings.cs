
using Cbuilder.Core.Helper.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.Core.Helper.Interfaces
{
   public interface IAdminSettings
    {
        Task<string> GetAdminSettings();
        Task<int> SaveAdminSettings(string settings, string userName);
        Task<IList<Settings>> GetSettingByType(string type);
        Task<IList<Settings>> GetSettingByKey(string key);
        Task<IList<Settings>> GetSettingByKeys(string keys);
        string GetSettingValueFromKey(string key);
    }
}
