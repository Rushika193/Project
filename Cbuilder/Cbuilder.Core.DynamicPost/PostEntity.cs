using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Cbuilder.Core.DynamicPost
{
    public class DynamicCommon
    {
        public int PostId { get; set; }
        public string PostKey { get; set; }
        public int SiteId { get; set; }
        public string AddedBy { get; set; }
        public virtual DateTime AddedOn { get; set; }
        public virtual string AddedOn_ { get { return this.AddedOn.ToString("MMMM dd yyyy"); } }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string UpdatedOn_ { get { return this.UpdatedOn.ToString("MMMM dd yyyy"); }}
        public DateTime DeletedOn { get; set; }
        public string DeletedOn_ { get { return this.UpdatedOn.ToString("MMMM dd yyyy"); } }
        public string DeletedBy { get; set; }
        public bool IsActive { get; set; }
    }
    public class Post:DynamicCommon
    {        
        public string  Name { get; set; }
        public string Form { get; set; }
        public bool HasDetail { get; set; }
        public bool IsPublished { get; set; }
        public string ComponentDataList { get; set; }
        public string ComponentDataDetail { get; set; }
        public string ComponentDataListView { get; set; }
        public string ComponentDataDetailView { get; set; }

        public string GeneratePostKey()
        {
            return Guid.NewGuid().ToString();
        }
    }

    public class PostData : DynamicCommon
    {
        public int PostDataId { get; set; }
        public string JsonData { get; set; }
        public int Order { get; set; }
        public int offset { get; set; }
        public int limit { get; set; }
    }

    public class Template : DynamicCommon
    {
        public int TemplateId { get; set; }
        public string TemplateKey { get; set; }
        public string Type { get; set; }
        public string TemplateViewDom { get; set; }
        public string TemplateName { get; set; }
        public string Screenshot { get; set; }
        public string ScreenshotBase64 { get; set; }
        public string TemplateEditDom { get; set; }

        public string GenerateTemplateKey()
        {
            return Guid.NewGuid().ToString();
        }

        public string ScreenshotFile(string appPath)
        {
            string ssName = "";
            if(!String.IsNullOrEmpty(Screenshot)) 
            {
                string[] ssPaths = Screenshot.Split('/');
                if (ssPaths.Length > 1)
                {
                    ssName = ssPaths[ssPaths.Length - 1];
                }
            }
            if(!String.IsNullOrEmpty(ScreenshotBase64) && ScreenshotBase64.StartsWith("data:image/png;base64,"))
            {
                string dirPath = String.Format("{0}\\DynamicPost\\Assets\\screenshots\\", appPath);
                //generate a filename for new template
                if(TemplateId == 0 || String.IsNullOrEmpty(ssName))
                {
                    TimeSpan ts= DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, 0);
                    string timestamp = Convert.ToInt64(ts.TotalSeconds).ToString();
                    ssName = String.Format("{0}.{1}.{2}.{3}.png", PostId, Type, timestamp, Path.GetRandomFileName());
                }
                string ssPath = String.Format("{0}\\{1}", dirPath, ssName);
                try 
                {
                    string base64string = ScreenshotBase64.Split(',')[1];
                    byte[] bytes = Convert.FromBase64String(base64string);
                    //delete old file
                    if(TemplateId > 0 && !String.IsNullOrEmpty(ssName)) 
                    {
                        if(File.Exists(ssPath)) 
                        {
                            File.Delete(ssPath);
                        }
                    }
                    if (!Directory.Exists(dirPath))
                    {
                        Directory.CreateDirectory(dirPath);
                    }
                    using (FileStream fs = new FileStream(ssPath, FileMode.Create, FileAccess.Write))
                    {
                        fs.Write(bytes, 0, bytes.Length);
                    }
                    return "/DynamicPost/Assets/screenshots/" + ssName;
                } 
                catch(Exception ex) 
                {
                    throw new Exception(ex.Message);
                }
            }
            return ssName;
        }
    }

    public class TemplatePost { 
        public Post Post { get; set; }
        public Template Template { get; set; }
        public string PostTemplateObj { get; set; }
        public int IsEdit { get; set; }
        public string PostTypeFields { get; set; }
        public string TemplateType { get; set; }

    }
}
