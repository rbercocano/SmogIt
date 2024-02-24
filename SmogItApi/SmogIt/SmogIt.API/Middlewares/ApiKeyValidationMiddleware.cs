using Microsoft.Extensions.Primitives;
using System.Security.Cryptography;
using System.Text;
namespace SmogIt.API.Middlewares
{
    public class ApiKeyValidationMiddleware
    {
        private readonly RequestDelegate _next;
        private const string ClientId = "clientId";
        private const string ClientSecret = "clientSecret";
        private const string ApiKeyHeader = "x-apikey";

        public ApiKeyValidationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            if (!ValidateApiKey(context.Request.Headers))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Invalid API key");
                return;
            }
            await _next(context);
        }

        private bool ValidateApiKey(IHeaderDictionary headers)
        {
            if (headers.TryGetValue(ApiKeyHeader, out StringValues encryptedKey) && headers.TryGetValue("timestamp", out StringValues timestamp))
            {
                bool isValid = IsValidApiKey(encryptedKey, timestamp);
                return isValid;
            }

            return false;
        }

        private bool IsValidApiKey(string encryptedKey, string timestamp)
        {
            long currentEpochTime = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            long providedEpochTime = long.Parse(timestamp);

            if (Math.Abs(currentEpochTime - providedEpochTime) > 30)             
                return false;

            byte[] inputBytes = Encoding.UTF8.GetBytes($"{ClientId}{ClientSecret}{timestamp}");
            using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(ClientSecret));
            byte[] hashBytes = hmac.ComputeHash(inputBytes);
            var base64 = Convert.ToBase64String(hashBytes);
            return base64 == encryptedKey;
        }




    }

    public static class ApiKeyValidationMiddlewareExtensions
    {
        public static IApplicationBuilder UseApiKeyValidation(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ApiKeyValidationMiddleware>();
        }
    }


}
