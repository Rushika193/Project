using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using SQLHelper;

namespace Cbuilder.Assets
{
    public class ApplicationProvider
    {
        public async Task<int> SaveApplication(ApplicationNameInfo app)
        {
            int result = -1;

            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@ApplicationID", app.ApplicationID));
            sQLParam.Add(new SQLParam("@ApplicationName", app.ApplicationName));


            try
            {
                SQLGetAsync objSQL = new SQLGetAsync();
                result = await objSQL.ExecuteAsScalarAsync<int>("[dbo].[usp_Application_Save]", sQLParam);

            }
            catch
            {

                throw;
            }

            return result;
        }


        public async Task<int> DeleteApplication(int applicationID)
        {
            int result = -1;

            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@ApplicationID", applicationID));

            try
            {
                SQLExecuteNonQueryAsync objSQL = new SQLExecuteNonQueryAsync();
                await objSQL.ExecuteNonQueryAsync("[dbo].[usp_Application_Delete]", sQLParam);
                result = 1;
            }
            catch
            {

                throw;
            }


            return result;
        }

        public async Task<IList<ApplicationNameInfo>> GetApplicationNames()
        {
            try
            {

                SQLGetListAsync objSQL = new SQLGetListAsync();
                return await objSQL.ExecuteAsListAsync<ApplicationNameInfo>("[dbo].[usp_Application_GetAll]");
            }
            catch
            {

                throw;
            }
        }

        public async Task<ApplicationNameInfo> GetApplicationByID(int applicationID)
        {

            List<SQLParam> sQLParam = new List<SQLParam>();
            sQLParam.Add(new SQLParam("@ApplicationID", applicationID));
            try
            {


                SQLGetAsync objSQL = new SQLGetAsync();
                return await objSQL.ExecuteAsObjectAsync<ApplicationNameInfo>("[dbo].[usp_Application_GetByID]", sQLParam);
            }
            catch
            {

                throw;
            }
        }

    }
}
