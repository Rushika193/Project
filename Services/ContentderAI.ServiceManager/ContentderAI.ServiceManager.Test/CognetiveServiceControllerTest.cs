using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace ContentderAI.ServiceManager.Test
{
    public class CognetiveServiceControllerTest : IClassFixture<WebApplicationFactory<Startup>>
    {
        private readonly WebApplicationFactory<Startup> _factory;
        private readonly string ExpectedContentType = "application/json; charset=utf-8";
        private readonly string TextEndpoint = "api/CognetiveService/Text";

        public CognetiveServiceControllerTest(WebApplicationFactory<Startup> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task TextAPI_DocumentAnalysis_ReturnResult()
        {
            // Arrange
            var client = _factory.CreateClient();
            var data = new
            {
                document = "We are one of the finest money transfer company in Nepal. We provide service with a smile."
            };
            var content = JsonSerializer.Serialize(data);
            var buffer = Encoding.UTF8.GetBytes(content);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            // Act
            var response = await client.PostAsync(TextEndpoint, byteContent);

            // Assert
            Assert.Equal(ExpectedContentType, response.Content.Headers.ContentType.ToString());
            Assert.True(response.IsSuccessStatusCode);
        }

        [Fact]
        public async Task TextAPI_EmptyDocument_ReturnBadRequest()
        {
            // Arrange
            var client = _factory.CreateClient();
            var data = new
            {
                document = ""
            };
            var content = JsonSerializer.Serialize(data);
            var buffer = Encoding.UTF8.GetBytes(content);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            // Act
            var response = await client.PostAsync(TextEndpoint, byteContent);

            // Assert
            Assert.True(response.StatusCode == HttpStatusCode.BadRequest);
        }

    }
}
