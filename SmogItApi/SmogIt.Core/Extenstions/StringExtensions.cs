using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace SmogIt.Core.Extenstions
{
    public static class StringExtensions
    {
        public static string FormatAsUSPhoneNumber(this string input)
        {
            string numericOnly = Regex.Replace(input, @"[^\d]", "");
            return string.Format("({0}) {1}-{2}",
                numericOnly.Substring(0, 3),
                numericOnly.Substring(3, 3),
                numericOnly.Substring(6));
        }
        public static string Hash(this string input)
        {
            using SHA256 sha256 = SHA256.Create();
            byte[] passwordBytes = Encoding.UTF8.GetBytes(input);
            byte[] hashBytes = sha256.ComputeHash(passwordBytes);
            StringBuilder stringBuilder = new StringBuilder();
            for (int i = 0; i < hashBytes.Length; i++)
                stringBuilder.Append(hashBytes[i].ToString("x2"));

            return stringBuilder.ToString();
        }
    }
}
