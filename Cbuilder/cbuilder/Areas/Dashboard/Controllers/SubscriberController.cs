using Cbuilder.Core.Controllers;
using Cbuilder.NewsLetter;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Cbuilder.Areas.Dashboard.Controllers
{
    [Area("Dashboard")]
    public class SubscriberController : AdminController
    {
        List<string> customEmaillstInfo;
        public SubscriberController(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }
        public IActionResult Index()
        {
            AddJS("SubValid", "/lib/js/jquery.validate.js");
            AddJS("Subscriber", "/massmail/subscriber.js");
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> GetAllSubscriber(string Keyword = "", int Offset = 0, int Limit = 10, int IsImported = 0, int IsSubscribed = 0)
        {
            try
            {
                NL_Controller objCon = new NL_Controller();
                var users = await objCon.GetAllImportUser(Keyword, Offset, Limit, IsImported, IsSubscribed);
                return new ObjectResult(users);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<IActionResult> GetUserInterest(int SiteID)
        {
            try
            {
                NL_Controller objCon = new NL_Controller();
                var interest = await objCon.GetInterest(SiteID);
                return new ObjectResult(interest);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> AddUpdateSubscribeUser(NL_UserInfo objUser)
        {
            try
            {
                NL_Controller objCon = new NL_Controller();
                objUser.IsImported = true;
                objUser.AddedBy = GetUsername;
                return await objCon.SaveEmailSubscriber(objUser);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<IActionResult> GetAllImportUser(string searchKey, int offset, int limit, int isImported, int isSubscribed)
        {
            try
            {
                NL_Controller objCon = new NL_Controller();
                var users = await objCon.GetAllImportUser(searchKey, offset, limit, isImported, isSubscribed);
                return new ObjectResult(users);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<IActionResult> GetImportedUserByID(int subscriberID)
        {
            try
            {
                NL_Controller objCon = new NL_Controller();
                var result = await objCon.GetImportedUserByID(subscriberID);
                return new ObjectResult(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public async Task<int> DeleteImportUserByID(int subscriberID)
        {
            try
            {
                NL_Controller objCon = new NL_Controller();
                await objCon.DeleteImportUserByID(subscriberID);
                return 1;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> DeleteMultImportedUser(string subscriberIDs)
        {
            try
            {
                NL_Controller objController = new NL_Controller();
                await objController.DeleteMultImportedUser(subscriberIDs);
                return 1;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> GetAllGroups()
        {
            try
            {
                GroupController grp = new GroupController();
                var result = await grp.GetGroupList();
                return new ObjectResult(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> AddUpdateGroup(GroupInfo obj)
        {
            try
            {
                GroupController grp = new GroupController();
                return await grp.AddUpdateGroup(obj, GetUsername);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<int> DeleteGroup(int GroupID)
        {
            try
            {
                GroupController grp = new GroupController();
                await grp.DeleteGroup(GroupID);
                return 1;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // Import code

        private async Task<bool> SaveImportedData(DataTable data)
        {
            NL_Controller objCon = new NL_Controller();
            NL_UserInfo objInfo = new NL_UserInfo();
            customEmaillstInfo = new List<string>();
            string chkdgrpLst = GetSelectedGroup();
            Regex regEmail = new Regex(@"^\w.+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$");
            if (data != null && data.Rows.Count > 0)
            {
                int RowCount = 2;
                foreach (DataRow row in data.Rows)
                {
                    if (data.Rows.IndexOf(row) != 0)
                    {
                        Match match = regEmail.Match(row[1].ToString());
                        try
                        {
                            if (string.IsNullOrEmpty(row[1].ToString()))
                                customEmaillstInfo.Add("Empty record found in row " + RowCount);
                            //else if (match.Success)
                            //    customEmaillstInfo.Add("Invalid Email Added in row" + RowCount);
                            else if (string.IsNullOrEmpty(row[2].ToString()))
                                customEmaillstInfo.Add("Empty record found in row " + RowCount);
                            else if (string.IsNullOrEmpty(row[3].ToString()))
                                customEmaillstInfo.Add("Empty record found in row " + RowCount);
                            else if (string.IsNullOrEmpty(row[4].ToString()))
                                customEmaillstInfo.Add("Empty record found in row " + RowCount);
                            else if (string.IsNullOrEmpty(row[5].ToString()))
                                customEmaillstInfo.Add("Empty record found in row " + RowCount);
                            else if (string.IsNullOrEmpty(row[6].ToString()))
                                customEmaillstInfo.Add("Empty record found in row " + RowCount);
                            else
                            {
                                objInfo.SubscriberEmail = row[1].ToString();
                                objInfo.FirstName = row[2].ToString();
                                objInfo.LastName = row[3].ToString();
                                objInfo.Location = row[5].ToString();
                                objInfo.Gender = getGender(row[6].ToString().ToLower());
                                objInfo.IsImported = true;
                                objInfo.ClientIP = null;
                                if (row[4].ToString().ToLower() == "all")
                                {
                                    objInfo.InterestInAll = true;
                                    objInfo.Interest = "";
                                }
                                else
                                {
                                    objInfo.InterestInAll = false;
                                    objInfo.Interest = row[4].ToString().Trim();
                                }
                                objInfo.AddedBy = GetUsername;
                                objInfo.RecipientGroup = chkdgrpLst;
                                int status = await objCon.SaveEmailSubscriber(objInfo);
                                if (status == 2)
                                {
                                    customEmaillstInfo.Add(string.Format("Email of row {0} already exists in the database.", RowCount));
                                }

                                //foreach (ListItem item in SrvrChkGrp.Items)
                                //{
                                //    if (item.Selected)
                                //        item.Selected = false;
                                //}
                                //EmailListLedger.PostedFile.InputStream.Dispose();
                            }
                        }
                        catch (Exception ex)
                        {
                            customEmaillstInfo.Add(string.Format("Error in row {0}. Error Message: {1}", RowCount, ex.Message));
                            return false;
                        }
                        RowCount++;
                    }
                }
            }
            return true;
        }
        private UserGender getGender(string gender)
        {
            switch (gender)
            {
                case "male":
                    return UserGender.Male;
                case "female":
                    return UserGender.Female;
                default:
                    return UserGender.Others;
            }

        }
        private string GetSelectedGroup()
        {
            List<String> chkdLst = new List<string>();

            //foreach (ListItem item in SrvrChkGrp.Items)
            //{
            //    if (item.Selected)
            //    {
            //        chkdLst.Add(item.Value);
            //    }
            //}
            String strngVal = String.Join(",", chkdLst.ToArray());
            return strngVal;
        }
    }
}