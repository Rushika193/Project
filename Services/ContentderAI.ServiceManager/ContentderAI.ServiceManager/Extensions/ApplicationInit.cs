using ContentderAI.ServiceManager.Helper.Settings;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Caching.Memory;

namespace ContentderAI.ServiceManager.Extensions
{
    public static class ApplicationInit
    {
        public static void ConfigureContentderAI(this IApplicationBuilder app, IMemoryCache memoryCache)
        {
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });

            var settingHelper = new SettingHelper(memoryCache);
            settingHelper.CacheAllSettings();
        }
    }
}
