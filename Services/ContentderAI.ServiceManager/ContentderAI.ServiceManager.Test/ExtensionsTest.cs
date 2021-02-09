using ContentderAI.Extensions;
using Xunit;

namespace ContentderAI.ServiceManager.Test
{
    public class ExtensionsTest
    {
        [Fact]
        public void HasContent_NonEmptyString_ReturnTrue()
        {
            // Arrange
            var testString = "Hello";

            // Act
            var result = testString.HasContent();

            // Assert
            Assert.True(result);
        }

        [Fact]
        public void HasContent_EmptyString_RetrunFalse()
        {
            // Arrange
            var testString = "";

            // Act
            var result = testString.HasContent();

            // Assert
            Assert.False(result);
        }
    }
}
