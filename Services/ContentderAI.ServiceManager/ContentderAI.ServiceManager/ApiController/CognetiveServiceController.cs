using System.Collections.Generic;
using System.Threading.Tasks;
using ContentderAI.CognetiveService;
using ContentderAI.Extensions;
using ContentderAI.ServiceManager.Helper.Settings;
using ContentderAI.ServiceManager.Models.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace ContentderAI.ServiceManager.ApiController
{
    [Route("api/[controller]")]
    [ApiController]
    public class CognetiveServiceController : ControllerBase
    {
        #region Fields
        private readonly IMemoryCache _memoryCache;
        #endregion

        #region Constructors
        public CognetiveServiceController(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }
        #endregion

        #region Controllers
        /// <summary>
        /// Analyze a given text using Azure Text Analytics
        /// </summary>
        /// <param name="document"></param>
        /// <returns></returns>
        [HttpPost("Text")]
        public async Task<ActionResult> Text([FromBody] InputModel inputModel)
        {
            if (inputModel.Document.HasContent())
            {
                // Get settings from cache
                var settingHelper = new SettingHelper(_memoryCache);
                var keys = $"{SettingKeys.TextAnalyticsEndpoint},{SettingKeys.TextAnalyticsSecret}";
                Dictionary<string, string> settings = settingHelper.GetCachedSettingValuesByKeys(keys);
                
                // Text analytics
                var textAnalytics = new TextAnalytics(settings[SettingKeys.TextAnalyticsEndpoint], settings[SettingKeys.TextAnalyticsSecret]);
                var response = await textAnalytics.ProcessText(inputModel.Document);
                return Ok(response);
            }

            // If it reaches here document has no content return HTTP 400 Bad Request
            return BadRequest(new { Message = "Document cannot be empty" });
        }
        #endregion
    }
}
