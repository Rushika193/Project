using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Cbuilder.ManageMassMail
{
    public class DateTimeController
    {
        public static DateTime GetLocalTime(DateTime utcTime)
        {
            return TimeZone.CurrentTimeZone.ToLocalTime(utcTime);
        }

        public static DateTime GetLocalTime(string utcTime)
        {
            return TimeZone.CurrentTimeZone.ToLocalTime(DateTime.Parse(utcTime));
        }

        public static DateTime GetUtcTime(DateTime localTime)
        {
            return TimeZone.CurrentTimeZone.ToUniversalTime(localTime);
        }
        public static DateTime GetTimeZoneTime(DateTime time, string TimeZoneOffset)
        {
            string[] tms = TimeZoneOffset.Split(':');
            TimeSpan offset = new TimeSpan(Int32.Parse(tms[0]), Int32.Parse(tms[1]), 0);
            time = time - offset;
            return time;
        }
        public static DateTime GetTimeZoneFromUtcTime(DateTime UTCTime, string TimeZoneOffset)
        {
            string[] tms = TimeZoneOffset.Split(':');
            TimeSpan offset = new TimeSpan(Int32.Parse(tms[0]), Int32.Parse(tms[1]), 0);
            UTCTime = UTCTime + offset;
            return UTCTime;
        }
        public static DateTime GetUtcTime(string localTime)
        {
            return TimeZone.CurrentTimeZone.ToUniversalTime(DateTime.Parse(localTime));
        }
        public async Task<IList<MassMailTimeZoneInfo>> GetAllTimeZone()
        {
            MassMailProvider objProvider = new MassMailProvider();
            return await objProvider.GetAllTimeZone();
        }
    }
}
