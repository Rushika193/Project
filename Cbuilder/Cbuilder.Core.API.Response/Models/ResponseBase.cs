using Cbuilder.Core.API.Enum;
namespace Cbuilder.Core.API.Models
{
    /// <summary>
    /// A default Response for API
    /// </summary>
    public abstract class ResponseBase
    {
      
        /// <summary>
        /// Defines the status of respose 
        /// </summary>
        public StatusCode StatusCode { get; set; } = StatusCode.Ok;
        /// <summary>
        /// Clear message that defines the respose clearly
        /// </summary>
        public string Message { get; set; }
        /// <summary>
        /// Holds the result object to be transmitted
        /// </summary>
        public object Result { get; set; }
    }
}
