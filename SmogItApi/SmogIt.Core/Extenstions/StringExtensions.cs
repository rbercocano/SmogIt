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
    }
}
