using Cbuilder.Core.Constants;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.Loader;
using System.Text;

namespace Cbuilder.Core.Helper.Extensions
{
    public static class AssemblyLoader
    {
        public static IMvcBuilder LoadApplicationAssembly(this IMvcBuilder builder)
        {
            string contentderPackagePath = Path.Combine(AppContext.BaseDirectory, FolderName.WWWWroot, FolderName.ContentderPackages);
            if (Directory.Exists(contentderPackagePath))
            {
                string[] packages = Directory.GetDirectories(contentderPackagePath);
                for (int i = 0, length = packages.Length; i < length; i++)
                {
                    string dllPath = Path.Combine(packages[i], "dll");
                    if (Directory.Exists(dllPath))
                    {
                        string[] dlls = Directory.GetFiles(dllPath, "*.dll");
                        for (int j = 0, len = dlls.Length; j < len; j++)
                        {
                            string filePath = dlls[j];
                            string fileName = Path.GetFileName(filePath);
                            var destFilePath = Path.Combine(AppContext.BaseDirectory, fileName);
                            if (!File.Exists(destFilePath))
                                File.Copy(filePath, destFilePath);
                            builder.AddApplicationPart(
                            AssemblyLoadContext.Default.LoadFromAssemblyPath(
                                destFilePath
                            ));
                        }
                    }
                }
            }
            return builder;
        }
    }
}
