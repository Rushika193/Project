﻿#region "Copyright"
/*
FOR FURTHER DETAILS ABOUT LICENSING, PLEASE VISIT "LICENSE.txt" INSIDE THE SAGEFRAME FOLDER
*/
#endregion

#region "References"
using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Collections;
#endregion

namespace Cbuilder.Core.Helper
{
    /// <summary>
    /// File operations.
    /// </summary>
    public class IOHelper
    {
        /// <summary>
        /// Delete directory.
        /// </summary>
        /// <param name="target_dir">Directory path.</param>
        /// <returns>Return "True" if directory exist.</returns>
        public static bool DeleteDirectory(string target_dir)
        {
            bool result = false;
            if (Directory.Exists(target_dir))
            {
                string[] files = Directory.GetFiles(target_dir);
                string[] dirs = Directory.GetDirectories(target_dir);

                foreach (string file in files)
                {
                    File.SetAttributes(file, FileAttributes.Normal);
                    File.Delete(file);
                }

                foreach (string dir in dirs)
                {
                    DeleteDirectory(dir);
                }

                Directory.Delete(target_dir, false);
                result = true;
            }
            return result;
        }
        /// <summary>
        /// Delete directory files.
        /// </summary>
        /// <param name="target_dir">Directory path.</param>
        /// <param name="ext_todelete">File extensions to delete seperated by ",".</param>
        /// <returns>Return "True" if directory exist.</returns>
        public static bool DeleteDirectoryFiles(string target_dir, string ext_todelete)
        {
            bool result = false;
            if (Directory.Exists(target_dir))
            {
                string[] files = Directory.GetFiles(target_dir);
                string[] dirs = Directory.GetDirectories(target_dir);
                string[] ext_arr_todelete = ext_todelete.Split(',');
                foreach (string file in files)
                {
                    foreach (string deleteFile in ext_arr_todelete)
                    {
                        if (deleteFile.Contains(Path.GetExtension(file)))
                        {
                            File.SetAttributes(file, FileAttributes.Normal);
                            File.Delete(file);
                        }
                    }
                }
                result = true;
            }

            return result;
        }


        public static void CopyDirectory(DirectoryInfo source, DirectoryInfo destination)
        {
            if (!destination.Exists)
            {
                destination.Create();
            }

            FileInfo[] files = source.GetFiles();
            foreach (FileInfo file in files)
            {
                file.CopyTo(Path.Combine(destination.FullName, file.Name));
            }
            // Process subdirectories.
            DirectoryInfo[] dirs = source.GetDirectories();
            foreach (DirectoryInfo dir in dirs)
            {
                // Get destination directory.
                string destinationDir = Path.Combine(destination.FullName, dir.Name);

                // Call CopyDirectory() recursively.
                CopyDirectory(dir, new DirectoryInfo(destinationDir));
            }
        }

        public static void CopyDirectoryReplaceFile(DirectoryInfo source, DirectoryInfo destination)
        {
            if (!destination.Exists)
            {
                destination.Create();
            }

            FileInfo[] files = source.GetFiles();
            foreach (FileInfo file in files)
            {
                try
                {
                    string destFile = Path.Combine(destination.FullName, file.Name);
                    if (File.Exists(destFile))
                        File.Delete(destFile);
                    file.CopyTo(destFile);
                }
                catch { }
            }
            // Process subdirectories.
            DirectoryInfo[] dirs = source.GetDirectories();
            foreach (DirectoryInfo dir in dirs)
            {
                // Get destination directory.
                string destinationDir = Path.Combine(destination.FullName, dir.Name);

                // Call CopyDirectory() recursively.
                CopyDirectoryReplaceFile(dir, new DirectoryInfo(destinationDir));
            }
        }

        public static void CopyDirectoryNoReplaceFile(DirectoryInfo source, DirectoryInfo destination)
        {
            if (!destination.Exists)
            {
                destination.Create();
            }

            FileInfo[] files = source.GetFiles();
            foreach (FileInfo file in files)
            {
                try
                {
                    string destFile = Path.Combine(destination.FullName, file.Name);
                    if (!File.Exists(destFile))
                        file.CopyTo(destFile);
                }
                catch { }
            }
            // Process subdirectories.
            DirectoryInfo[] dirs = source.GetDirectories();
            foreach (DirectoryInfo dir in dirs)
            {
                // Get destination directory.
                string destinationDir = Path.Combine(destination.FullName, dir.Name);

                // Call CopyDirectory() recursively.
                CopyDirectoryNoReplaceFile(dir, new DirectoryInfo(destinationDir));
            }
        }
    }
}
