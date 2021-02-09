namespace Cbuilder.Core.API.Enum
{
    /// <summary>
    /// StatusCode
    /// </summary>
    public enum StatusCode 
    {
        Created=1,
        NotExists =2,
        Updated = 3,
        Deleted =4,
        TokenExpired = 5,
        FieldMissing=6,
        DuplicateItem=7,
        NotAllowed=8,
        ServerError = 500,
        Ok=200,
        
        //
        // Summary:
        //     Equivalent to HTTP status 400. System.Net.HttpStatusCode.BadRequest indicates
        //     that the request could not be understood by the server. System.Net.HttpStatusCode.BadRequest
        //     is sent when no other error is applicable, or if the exact error is unknown or
        //     does not have its own error code.
        BadRequest = 400,
        //
        // Summary:
        //     Equivalent to HTTP status 401. System.Net.HttpStatusCode.Unauthorized indicates
        //     that the requested resource requires authentication. The WWW-Authenticate header
        //     contains the details of how to perform the authentication.
        Unauthorized = 401,
    }
}
