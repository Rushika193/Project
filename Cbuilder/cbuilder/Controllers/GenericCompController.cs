using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Cbuilder.GenericComponent;

namespace Cbuilder.Controllers
{
    public class GenericCompController : Controller
    {
        [HttpPost]
        public async Task<int> AddUpdateGenericComponent([FromBody] ComponentDetails comp)
        {
            GenericComponentController controllerObj=new GenericComponentController();
            return await controllerObj.AddUpdateGeneticComp(comp);
        }

        [HttpGet]
        public async Task<IList<ComponentInfo>> GetGenericComponent(int componentId, int siteId)
        {
            GenericComponentController controllerObj=new GenericComponentController();
            return await controllerObj.GetGenericComponent(componentId, siteId);
        }
        [HttpPost]
        public async Task DeleteGenericComponent(int componentId, int siteId)
        {
            GenericComponentController controllerObj=new GenericComponentController();
            await controllerObj.DeleteGeneriComponent(componentId, siteId);
        }
    }
}