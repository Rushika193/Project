using Cbuilder.Core.Helper.API;
using Cbuilder.Core.Helper.Interfaces;
using Cbuilder.Core.Helper.Models;
using Cbuilder.Core.Permissions;
using Cbuilder.EmailTemplate;
using Cbuilder.Helpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.DependencyInjection;

namespace Cbuilder.Core.Helper.Extensions
{
    public static class RegisterServices
    {
        public static IServiceCollection RegisterCbuilderServices(this IServiceCollection services, IWebHostEnvironment CurrentEnvironment)
        {
            services.AddTransient<IUserClaimsPrincipalFactory<ApplicationUser>, MyClaimsPrincipalFactory<ApplicationUser>>();
            // Add application services.
            services.AddTransient<IEmailTemplateManager, EmailTemplateManager>();
            services.AddTransient<IEmailSender, EmailSender>();
            services.AddTransient<IPermission, AppPermission>();
            services.AddTransient<IApiClient, ApiClient>();

            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();
            services.AddHttpContextAccessor();
            services.AddMemoryCache();


            //if (CurrentEnvironment.IsProduction())
            //{
            //    services.AddWebOptimizer(pipeline =>
            //    {
            //        // Creates a CSS and a JS bundle. Globbing patterns supported.
            //        pipeline.AddCssBundle("/css/bundle.css", "css/*.css");
            //        pipeline.AddJavaScriptBundle("/js/bundle.js", "js/plus.js", "js/minus.js", "optmize/*.js");

            //        // This bundle uses source files from the Content Root and uses a custom PrependHeader extension
            //        pipeline.AddJavaScriptBundle("/js/scripts.js", "scripts/a.js", "wwwroot/js/plus.js")
            //                .UseContentRoot()
            //                //.PrependHeader("My custom header")
            //                .AddResponseHeader("x-test", "value");

            //        // This will minify any JS and CSS file that isn't part of any bundle
            //        pipeline.MinifyCssFiles();
            //        pipeline.MinifyJsFiles();

            //        // This will automatically compile any referenced .scss files
            //        //pipeline.CompileScssFiles();

            //        // AddFiles/AddBundle allow for custom pipelines
            //        pipeline.AddBundle("/text.txt", "text/plain", "*/*.txt")
            //                .AdjustRelativePaths()
            //                .Concatenate()
            //                .FingerprintUrls()
            //                .MinifyCss();
            //    });
            //}

            return services;
        }
    }
}
