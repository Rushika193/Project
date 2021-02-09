using SQLHelper;
using System.Collections.Generic;

namespace Cbuilder.ManageMassMail
{
    public class MassMailSettingInfo
    {
        public int SettingID { get; set; }
        public string SettingKey { get; set; }
        public string SettingValue { get; set; }

    }
    public class SettingAddInfo
    {
        public List<KeyValue> Settings { get; set; }
        public string UserName { get; set; }
    }
}
