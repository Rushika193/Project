using Cbuilder.Block.Entities;
using Cbuilder.Core.Helper;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using SQLHelper;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;

namespace Cbuilder.Block
{
    public class BlockController
    {
        public async Task<IList<Block>> GetBoardListByUsage(Block block)
        {
            BlockDataProvider blockDataProvider = new BlockDataProvider();
            return await blockDataProvider.GetBoardListByUsage(block);
        }
        public async Task<int> SaveLayout(DashboardLayout layout)
        {
            BlockDataProvider blockDataProvider = new BlockDataProvider();
            string layoutXML = new XMLHelper().SerializeXML(layout.Elements, "Root", true);
            string moduleXML = new XMLHelper().SerializeXML(layout.Modules, "Root", true);
            return await blockDataProvider.SaveLayout(layoutXML, moduleXML, layout.PageName, layout.SiteID);
        }
        public async Task<PageLayoutViewModel> GetLayoutElement(string pageName, int siteID)
        {
            var ds = await new BlockDataProvider().GetLayoutElement(pageName, siteID);
            PageLayoutViewModel obj = new PageLayoutViewModel()
            {
                Elements = new List<LayoutElements>(),

            };
            IList<LayoutElement> lstElements = DataSourceHelper.FillCollection<LayoutElement>(ds.Tables[0]);
            IList<ViewModule> lstModule = DataSourceHelper.FillCollection<ViewModule>(ds.Tables[1]);
          
            foreach (var e in lstElements)
            {
                if (e.HasInnerElement)
                {
                    LayoutElements ele = CreateElements(e);
                    ele.InnerElements = GetInnerElement(e.ElementID, lstElements, lstModule);
                    obj.Elements.Add(ele);
                }
                else
                {
                    break;
                }
            }
            return obj;
        }
        private LayoutElements CreateElements(LayoutElement e)
        {
            LayoutElements ele = new LayoutElements()
            {
                ID = e.ID,
                ElementID = e.ElementID,
                ParentID = e.ParentID,
                DisplayOrder = e.DisplayOrder,
                Attributes = e.Attributes,
                EleType = e.EleType,
                HasInnerElement=e.HasInnerElement,
                HasModules=e.HasModules
            };
            return ele;
        }
        private List<LayoutElements> GetInnerElement(string ParentID, IList<LayoutElement> AllElement, IList<ViewModule> AllPageModule)
        {
            List<LayoutElement> elements = AllElement.Where(e => e.ParentID == ParentID).OrderBy(a => a.DisplayOrder).ToList();
            List<LayoutElements> lstele = new List<LayoutElements>();
            foreach (var e in elements)
            {
               var ele= CreateElements(e);
                if (e.HasModules)
                    ele.Modules = GetElementModules(e.ElementID, AllPageModule);
                if (e.HasInnerElement)// Recursive Method for inner element
                    ele.InnerElements = GetInnerElement(e.ElementID, AllElement, AllPageModule);
                lstele.Add(ele);
            }
            return lstele;
        }
        private List<ViewModule> GetElementModules(string ElementID, IList<ViewModule> AllPageModule)
        {
            List<ViewModule> modules = AllPageModule.Where(e => e.ElementID == ElementID).OrderBy(a => a.DisplayOrder).Cast<ViewModule>().ToList();
            return modules;
        }
        public async Task<IList<ViewModule>> GetAvailableModule()
        {
            return await new BlockDataProvider().GetAvailableModule();
        }
    }
}
