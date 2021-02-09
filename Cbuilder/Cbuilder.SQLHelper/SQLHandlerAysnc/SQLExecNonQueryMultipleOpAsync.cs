using SQLHelper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;

namespace SQLHelper
{
    public class SQLExecNonQueryMultipleOpAsync : SQLHandlerAsync
    {

        #region Constructor
        public SQLExecNonQueryMultipleOpAsync()
        {
            //Note there is lot of way to set this, please use your needed way to do this connections string vallue setting
            _connectionString = Connectionconfig;
        }
        #endregion

        /// <summary>
        /// Executes non query with multipal output.
        /// </summary>
        /// <param name="StroredProcedureName">Strored procedure name.</param>
        /// <param name="InputParamColl">Accept Key Value collection for parameters.</param>
        /// <param name="OutPutParamColl">Output Key Value collection for parameters.</param>
        /// <returns>List Key Value collection</returns>
        public async Task<List<KeyValuePair<int, string>>> ExecuteNonQueryWithMultipleOutputAsync(string StroredProcedureName, List<SQLParam> InputParamColl, List<SQLParam> OutPutParamColl)
        {
            using (SqlConnection SQLConn = new SqlConnection(base.connectionString))
            {
                try
                {
                    SqlCommand SQLCmd = new SqlCommand();
                    SQLCmd.Connection = SQLConn;
                    SQLCmd.CommandText = StroredProcedureName;
                    SQLCmd.CommandType = CommandType.StoredProcedure;
                    SqlParameter[] sqlParameters = new SQLParamCollection(InputParamColl).ParamCollection;
                    SQLCmd.Parameters.AddRange(sqlParameters);
                    foreach (SQLParam kvp in OutPutParamColl)
                    {
                        SqlParameter sqlParaMeter = new SqlParameter();
                        sqlParaMeter.IsNullable = true;
                        sqlParaMeter.ParameterName = kvp.Key;
                        sqlParaMeter.Value = kvp.Value;
                        sqlParaMeter.Direction = ParameterDirection.InputOutput;
                        sqlParaMeter.Size = 256;
                        SQLCmd.Parameters.Add(sqlParaMeter);
                    }
                    SQLConn.OpenAsync().Wait();
                    await SQLCmd.ExecuteNonQueryAsync();
                    List<KeyValuePair<int, string>> lstRetValues = new List<KeyValuePair<int, string>>();
                    for (int i = 0; i < OutPutParamColl.Count; i++)
                    {
                        lstRetValues.Add(new KeyValuePair<int, string>(i, SQLCmd.Parameters[InputParamColl.Count + i].Value.ToString()));
                    }
                    return lstRetValues;
                }
                catch (Exception e)
                {
                    throw e;
                }
                finally
                {
                    SQLConn.Close();
                }
            }
        }
        /// <summary>
        /// Executes non query with multipal output.
        /// </summary>
        /// <param name="transaction"> Transact-SQL transaction </param>
        /// <param name="commandType">Command type</param>
        /// <param name="StroredProcedureName">Strored procedure name.</param>
        /// <param name="InputParamColl">Accept Key Value collection for parameters.</param>
        /// <param name="OutPutParamColl">Output Key Value collection for parameters.</param>
        /// <returns>List Key Value collection</returns>
        public List<KeyValuePair<int, string>> ExecuteNonQueryWithMultipleOutputAsync(SqlTransaction transaction, CommandType commandType, string StroredProcedureName, List<KeyValuePair<string, object>> InputParamColl, List<KeyValuePair<string, object>> OutPutParamColl)
        {
            try
            {
                //create a command and prepare it for execution
                SqlCommand cmd = new SqlCommand();
                SQLHandler.PrepareCommand(cmd, transaction.Connection, transaction, commandType, StroredProcedureName);
                //Loop for Paramets
                foreach (KeyValuePair<string, object> kvp in InputParamColl)
                {
                    SqlParameter sqlParaMeter = new SqlParameter();
                    sqlParaMeter.IsNullable = true;
                    sqlParaMeter.ParameterName = kvp.Key;
                    sqlParaMeter.Value = kvp.Value;
                    cmd.Parameters.Add(sqlParaMeter);
                }

                foreach (KeyValuePair<string, object> kvp in OutPutParamColl)
                {
                    SqlParameter sqlParaMeter = new SqlParameter();
                    sqlParaMeter.IsNullable = true;
                    sqlParaMeter.ParameterName = kvp.Key;
                    sqlParaMeter.Value = kvp.Value;
                    sqlParaMeter.Direction = ParameterDirection.InputOutput;
                    sqlParaMeter.Size = 256;
                    cmd.Parameters.Add(sqlParaMeter);
                }

                cmd.ExecuteNonQuery();
                List<KeyValuePair<int, string>> lstRetValues = new List<KeyValuePair<int, string>>();
                for (int i = 0; i < OutPutParamColl.Count; i++)
                {
                    lstRetValues.Add(new KeyValuePair<int, string>(i, cmd.Parameters[InputParamColl.Count + i].Value.ToString()));
                }
                return lstRetValues;
            }
            catch (Exception e)
            {
                throw e;
            }

        }
    }
}
