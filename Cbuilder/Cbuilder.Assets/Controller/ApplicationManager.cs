using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Cbuilder.Assets
{
    public class ApplicationManager
    {

        public async Task<int> SaveApplication(ApplicationNameInfo app)
        {
            ApplicationProvider applicationProvider = new ApplicationProvider();
            return await applicationProvider.SaveApplication(app);
        }

        public async Task<int> DeleteApplication(int applicationID)
        {
            ApplicationProvider applicationProvider = new ApplicationProvider();
            return await applicationProvider.DeleteApplication(applicationID);
        }

        public async Task<IList<ApplicationNameInfo>> GetApplicationNames()
        {
            ApplicationProvider applicationProvider = new ApplicationProvider();
            return await applicationProvider.GetApplicationNames();
        }

        public async Task<ApplicationNameInfo> GetApplicationByID(int applicationID)
        {
            ApplicationProvider applicationProvider = new ApplicationProvider();
            return await applicationProvider.GetApplicationByID(applicationID);
        }



    }
}
