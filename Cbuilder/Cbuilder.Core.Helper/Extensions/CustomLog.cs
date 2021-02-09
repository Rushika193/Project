using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Cbuilder.Core.Helper.Extensions
{
    public static class CustomLog
    {

        public static void WriteLOG(this string message, string folderName = "one")
        {
            try
            {
                if (!Directory.Exists(folderName))
                    Directory.CreateDirectory(folderName);
                string logFilePath = folderName + "/Logs_" + DateTime.Now.ToString("yyyy_MMM_dd_HH_mm_ss_fffffff") + ".txt";
                using (StreamWriter streamWriter = new StreamWriter(System.IO.File.Open(logFilePath, FileMode.OpenOrCreate)))
                {
                    streamWriter.WriteAsync(message);
                }
            }
            catch
            {
            }
        }
    }
}
