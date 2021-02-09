using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Cbuilder.Core.MediaManagement
{
    public class MediaThubnailInfo
    {
        public MediaThubnailInfo(string fullFilePath, int size)
        {
            _fullFilePath = fullFilePath;
            Size = size;
        }
        public MediaThubnailInfo(string savePath, string fileName, int size)
        {
            SavePath = savePath;
            FileName = fileName;
            Size = size;
         
        }
        public string SavePath { get; set; }
        public string FileName { get; set; }
        public int Size { get; set; }
        private string _fullFilePath;
        public string FullFilePath
        {
            get
            {
                if (string.IsNullOrEmpty(_fullFilePath))
                    return Path.Combine(this.SavePath, this.FileName);
                else return _fullFilePath;
            }
            set
            {
                _fullFilePath = value;
            }
        }
    }
}
