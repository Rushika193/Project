using System;
using System.Linq;
using System.Runtime.Serialization;

namespace Cbuilder.ManageMassMail
{
    public enum ePostResponseCode
    {
        Success = 1,
        Invalid = -1,
        TransactionError = -2,
        Default = 0,
        NotSubscribed = 101,
        PackageLimitExceed = 102,
    }
    public enum eEmailStatus
    {
        [EnumMember(Value = "Schedule")]
        Schedule = 1,
        [EnumMember(Value = "Processed")]
        Processed = 2,
        [EnumMember(Value = "Dispatched")]
        Dispatched = 3,
        [EnumMember(Value = "Package Limit Exceeded")]
        LimitExceeded = 4,
    }
    public enum GenderEnum
    {
        Male = 0,
        Female = 1,
        Others = 2
    };

    public static class EnumHelper
    {
        public static string GetAttrValue(this Enum @enum)
        {
            var attr =
                @enum.GetType().GetMember(@enum.ToString()).FirstOrDefault()?.
                    GetCustomAttributes(false).OfType<EnumMemberAttribute>().
                    FirstOrDefault();
            if (attr == null)
                return @enum.ToString();
            return attr.Value;
        }
    }
}
