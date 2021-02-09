namespace ContentderAI.Extensions
{
    public static class StringExtension
    {
        public static bool HasContent(this string content)
        {
            return content?.Trim().Length > 0;
        }
    }
}
