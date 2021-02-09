using System;
using Cbuilder.Core.DbContext;
using Cbuilder.Core.Helper.API;
using Cbuilder.Core.Helper.Extensions;
using Cbuilder.Core.Helper.Interfaces;
using Cbuilder.Core.Helper.Models;
using Cbuilder.Core.Permissions;
using Cbuilder.EmailTemplate;
using Cbuilder.Helpers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SQLHelper;

namespace web
{
    public class Startup
    {
        private IWebHostEnvironment CurrentEnvironment { get; set; }
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            CurrentEnvironment = env;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSession();
            var builder = services.AddMvc(option => option.EnableEndpointRouting = false)
                     .AddJsonOptions(jsonOptions =>                             //Added to disable camelCasing response
                     {
                         jsonOptions.JsonSerializerOptions.PropertyNamingPolicy = null;
                     })
                    .SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            services.AddHttpContextAccessor();
            SQLHandlerAsync.Connectionconfig = SQLHandler.Connectionconfig = Configuration.GetConnectionString("CbuilderConnection");
            services.AddDbContext<ApplicationDbContext>(options =>
               options.UseSqlServer(Configuration.GetConnectionString("CbuilderConnection")));
            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();
            services.Configure<IdentityOptions>(options =>
            {
                // Password settings
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = false;
                options.Password.RequiredUniqueChars = 6;
                // Lockout settings
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                options.Lockout.MaxFailedAccessAttempts = 10;
                options.Lockout.AllowedForNewUsers = true;
                // User settings
                options.User.RequireUniqueEmail = true;
            });
            services.ConfigureApplicationCookie(options =>
            {
                // Cookie settings
                options.Cookie.HttpOnly = true;
                //options.Cookie.Expiration = TimeSpan.FromDays(150); old way
                options.ExpireTimeSpan = TimeSpan.FromDays(150);
                // If the LoginPath isn't set, ASP.NET Core defaults 
                // the path to /Account/Login.
                options.LoginPath = "/Login";
                // If the AccessDeniedPath isn't set, ASP.NET Core defaults 
                // the path to /Account/AccessDenied.
                options.AccessDeniedPath = "/Account/AccessDenied";
                options.SlidingExpiration = true;
            });
            services.RegisterCbuilderServices(CurrentEnvironment);
            services.AddAntiforgery(o => o.HeaderName = "XSRF-TOKEN");
            var razor = services.AddRazorPages();
            if (CurrentEnvironment.IsDevelopment())
            {
                razor.AddRazorRuntimeCompilation();
            }
            builder.LoadApplicationAssembly();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IMemoryCache memoryCache, IHttpContextAccessor httpContextAccessor)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");

                //Hsts means the client will never even attempt http, even if the user tried to use it
                //app.UseHsts();
            }
            //app.UseHttpsRedirection();

            _ = app.CbuilderInitialTasks(memoryCache, CurrentEnvironment, httpContextAccessor);
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseRouting();
            app.UseAuthentication();
            app.UseSession();
            app.UseMiddleware<RequestHandlerMiddleware>();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                name: "webbuilderaction",
                template: "webbuilder/{action}/{id?}",
                defaults: new { controller = "Builder", action = "Index" }
                );
                routes.MapRoute(
                name: "webbuilder",
                template: "webbuilder/{Page}/{**Params}",
                defaults: new { controller = "Builder", action = "Index" }
                );
                routes.MapRoute(
                name: "areas",
                template: "{area:exists}/{controller}/{action=Index}/{**Params}"
                );
                routes.MapRoute(
                name: "webbuilderController",
                template: "{Controller}/{page}/{**Params}",
                defaults: new { controller = "cbuilderDynamicpage", action = "Index" }
                );
                routes.MapRoute(
                name: "defaultcontroller",
                template: "{Controller}/{action}/{**Params}",
                defaults: new { controller = "cbuilderDynamicpage", action = "Index" }
                );
                routes.MapRoute(
                name: "defaultPage",
                template: "{Page}/{**Params}",
                defaults: new { controller = "cbuilderDynamicpage", action = "Index" }
                );
            });
        }
    }
}