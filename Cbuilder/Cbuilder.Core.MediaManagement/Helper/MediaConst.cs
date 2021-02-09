using System;
using System.Collections.Generic;
using System.Text;

namespace Cbuilder.Core.MediaManagement
{
    public class MediaConst
    {
        public string Message;
        public int MessageCode;
        public MediaConst(string message, int messageCode)
        {
            this.Message = message;
            this.MessageCode = messageCode;
        }
        public MediaConst()
        {

        }
    }
}
