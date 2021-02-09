using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using ContentderAI.ServiceManager.Helper.ElasticSearch;
using ContentderAI.ServiceManager.Helper.Settings;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ContentderAI.ServiceManager.Helper.ElasticSearch.Models;
using SQLHelper;
using Xunit;

namespace ContentderAI.ServiceManager.Test
{
    public class HelperElasticSearchTest
    {
        private readonly ElasticSearch _elasticSearch;
        private readonly string index;
        public HelperElasticSearchTest()
        {
            var configuration = new ConfigurationBuilder()
              .SetBasePath(Directory.GetCurrentDirectory())
              .AddJsonFile("appsettings.json")
              .Build();
            SQLHelperConfig.ConnectionConfig = configuration.GetConnectionString("ContentderAIConnection");

            var provider = new ServiceCollection()
                .AddMemoryCache()
                .BuildServiceProvider();
            var memoryCache = provider.GetService<IMemoryCache>();
            var settingHelper = new SettingHelper(memoryCache);
            settingHelper.CacheAllSettings();

            var url = settingHelper.GetCachedSettingValue(SettingKeys.ElasticSearchEndpoint);
            index = settingHelper.GetCachedSettingValue(SettingKeys.ElasticSearchIndex);
            _elasticSearch = new ElasticSearch(url, index);
        }

        [Fact]
        public void CheckIndex_Exist_ReturnOk()
        {
            var index_name = index;

            var response = _elasticSearch.CheckIndecesStatus(index_name);

            Assert.True(response);
        }
        [Fact]
        public void CheckInsert_NewData_RetrunOk()
        {
            ElasticInputModel input = new ElasticInputModel
            {
                DomainName = "Domain for Test",
                RequestId = Guid.NewGuid(),
                SessionId = 11111,
                Status = 1,
                Data = new List<ElasticDataModel>{
                    new ElasticDataModel
                        {
                            Images = new List<string> { "image1","image2"},
                            Icons = new List<string>{ "icon1",  "icon2" },
                            Videos = new List<string>{"videos1","video2"},
                            Texts = new List<string>{"text1","text2"}

                        }
                }

            };
            var before_count = _elasticSearch.TotalDataCount();

            _elasticSearch.AddNewIndex(input);

            var after_count = _elasticSearch.TotalDataCount();
            int increate_count = after_count - before_count;
            Assert.Equal(1, increate_count);

        }
        [Fact]
        public void Check_ReturnAllData()
        {
            var result = _elasticSearch.GetAllData();
            Assert.Equal(typeof(List<ElasticInputModel>), result.GetType());
        }
        [Fact]
        public void Check_CreateNewIndex_ReturnOk()
        {
            var new_index = "test_new_index";
            if(_elasticSearch.CheckIndecesStatus(new_index))
            {
                _elasticSearch.DeleteIndex(new_index);
            }
            var result = _elasticSearch.CreateNewIndex(new_index);

            Assert.True(result);


        }
       
    }
}
