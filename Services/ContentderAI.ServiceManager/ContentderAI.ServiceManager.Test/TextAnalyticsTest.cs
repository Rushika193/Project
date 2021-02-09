using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ContentderAI.CognetiveService;
using ContentderAI.ServiceManager.Helper.Settings;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SQLHelper;
using Xunit;

namespace ContentderAI.ServiceManager.Test
{
    public class TextAnalyticsTest
    {
        private readonly TextAnalytics _textAnalytics;

        public TextAnalyticsTest()
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
            SQLHelperConfig.ConnectionConfig = configuration.GetConnectionString("ContentderAIConnection");

            var provider = new ServiceCollection()
                .AddMemoryCache()
                .BuildServiceProvider();
            var memoryCache = provider.GetService<IMemoryCache>();
            var settingHelper = new SettingHelper(memoryCache);
            settingHelper.CacheAllSettings();

            var keys = $"{SettingKeys.TextAnalyticsEndpoint},{SettingKeys.TextAnalyticsSecret}";
            Dictionary<string, string> settings = settingHelper.GetCachedSettingValuesByKeys(keys);
            _textAnalytics = new TextAnalytics(settings[SettingKeys.TextAnalyticsEndpoint], settings[SettingKeys.TextAnalyticsSecret]);
        }

        [Fact]
        public async Task ProcessText_OneDocument_ReturnOk()
        {
            // Arrange
            var document = "We are one of the finest money transfer company in Nepal. We provide service with a smile.";

            // Act
            var response = await _textAnalytics.ProcessText(document);

            // Assert
            Assert.NotNull(response);
            Assert.True(response.Count == 1);
            Assert.True(document == response.First().Text);
            Assert.False(response.First().IsHeadingCandidate);
        }

        [Fact]
        public async Task ProcessText_EightDocuments_ReturnOk()
        {
            // Arrange
            var document =
                "About us\n" +
                "We are one of the finest money transfer company in Nepal. We provide service with a smile.\n" +
                "Company Profile\n" +
                "Cashway Money Transfer is Nepal based Money Transfer Company. It is registered at the Office of Company Registrar of Nepal under the Company Act 2063 having head office at Shanta Plaza, Ratopul, Kathmandu, Nepal. It is regulated and certified by the Central Bank of Nepal. It is formed primarily to offer remittance services in Nepal and promoted by well-known figures of the Nepalese Banking Industry and Nepalese Remittance Industry, carrying decades of experience with them in the related fields. It is emerging money transfer company committed to provide a reliable network of remittance solutions all over Nepal with a trade name “Cashway Money Transfer”. Our service allows Nepalese living overseas to send money to their relatives and friends in Nepal at much reliable and cost effective way than is currently being charged by the other operating Remittance Companies.\n" +
                "Recipients can receive money as soon as it is transferred with a consistent exchange rate at a low transaction fee. Cashway Money Transfer is ideal for everyone as sender and recipient do not require to have a bank account. It is convenient, quick and safe as you can send and receive money from any location in urban and rural areas.\n" +
                "Our Mission\n" +
                "To assist people in sending and collecting money through use of latest technology in fastest and cheapest way and building a long term relationship with our clients that is based on trust, credibility and highest values.\n" +
                "Our Vision\n" +
                "Cashway Money Transfer will be the leading national service provider in the money transfer industry in Nepal. We will become the market leader by focusing on technology and innovation, credibility and trust, speed and efficiency, all these coupled with a team that is professional and friendly who will work to serve the Nepali sons and daughters who are far away from their dear ones and need a service to send money easily to Nepal.";

            // Acts
            var response = await _textAnalytics.ProcessText(document);

            // Assert
            Assert.NotNull(response);
            Assert.True(response.Count == 9);
        }
    }
}
