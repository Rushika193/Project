using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Cbuilder.GenericComponent;

namespace Cbuilder.GenericComponent
{
  public class GenericComponentController
    {
        public async Task<int> AddUpdateGeneticComp(ComponentDetails album)
        {
            GenericComponentDataProvider dataProvider = new GenericComponentDataProvider();
            return await dataProvider.AddUpdateGenericComp(album);
        }

        public async Task<IList<ComponentInfo>> GetGenericComponent(int componentId,int siteId)
        {
            GenericComponentDataProvider dataProvider=new GenericComponentDataProvider();
            return await dataProvider.GetGenericComponent(componentId, siteId);
        }

        public async Task DeleteGeneriComponent(int componentId, int siteId)
        {
            GenericComponentDataProvider dataPro=new GenericComponentDataProvider();
            await dataPro.DeleteComponent(componentId, siteId);
        }
    }
}
