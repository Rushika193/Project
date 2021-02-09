using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nest;
using ContentderAI.ServiceManager.Helper.ElasticSearch.Models;
using Microsoft.Extensions.Configuration;
using System.IO;
using ContentderAI.ServiceManager.Helper.Settings;
using Microsoft.Extensions.Caching.Memory;

namespace ContentderAI.ServiceManager.Helper.ElasticSearch
{
    /// <summary>
    /// 
    /// </summary>
    public class ElasticSearch
    {
        private readonly ElasticClient _client;
        private readonly string index_name;
        private readonly string elastic_client;
        //connect elastic search
        /// <summary>
        /// 
        /// </summary>
        public ElasticSearch(string url, string index)
        {
            elastic_client = url;
            index_name = index;

            var uri = new Uri(elastic_client);
            var settings = new ConnectionSettings(uri)
                .DisableDirectStreaming()
                .PrettyJson();
            _client = new ElasticClient(settings);
            if (!CheckIndecesStatus(index_name))
            {
                _client.Indices.Create(index_name);
            }
            settings.DefaultIndex(index_name);
            
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="new_index_name"></param>
        /// <returns></returns>
        public bool CreateNewIndex(string new_index_name)
        {
            
                if(!CheckIndecesStatus(new_index_name))
                {
                _client.Indices.Create(new_index_name);
                return true;
                }
                return false;
           
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public string GetIndiciesList()
        {
            var result = _client.Indices.Stats();
            return result.ToString();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<ElasticInputModel> GetData(string id)
        {
            if (CheckIndecesStatus(index_name))
            {
                var query = id.ToString();
                var result = _client.Search<ElasticInputModel>(s => s
                   .Query(qry => qry
                   .Match(m => m
                   .Field(f => f.RequestId)
                   .Query(query)))).Documents.ToList();
                return result;
            }
            return null;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="query"></param>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <returns></returns>
        public List<ElasticInputModel> SearchData(string query,int start, int size)
        {
            if(CheckIndecesStatus(index_name)){
            var results1 = _client.Search<ElasticInputModel>(s => s
                            .From(start)
                            .Size(size)
                            .Query(qry => qry
                            .MultiMatch(m => m
                            .Fields(p => p
                                .Field("domainName")
                                .Field("sessionId")
                                .Field("data.images")
                                .Field("data.texts")
                                .Field("data.icons")
                                .Field("data.videos")
                                )
                            .Query(query)))).Documents.ToList();
             var results2 = _client.Search<ElasticInputModel>(s => s
                                    .From(start)
                                    .Size(size)
                                    .Query(q =>
                                        q.Match(m => m.Field(p => p.DomainName).Query(query)) ||
                                        q.Match(m => m.Field(p => p.SessionId).Query(query)) ||
                                        q.Match(m => m.Field(p => p.Data).Query(query)
                                     ))).Documents.ToList();
                var results3 = _client.Search<ElasticInputModel>(s => s
                                            .From(start)
                                            .Size(size)
                                            .Query(q => q
                                                .MultiMatch(m => m
                                                    .Fields(p => p.Field(f => f.DomainName))
                                                    .Query(query)
                                                )
                                             )
                                        ).Documents.ToList();


                return results1;
            }
            return null;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<ElasticInputModel> GetAllData()
        {
            if(CheckIndecesStatus(index_name))
            {
                var result = _client.SearchAsync<ElasticInputModel>(s => s
                .Query(q => q
                    .MatchAll())).Result.Documents.ToList();
                return result;
            }
            return null;
        }
        public void AddNewIndex(ElasticInputModel input)
        {
            _client.Index<ElasticInputModel>(input,null);
        }
        public bool CheckIndecesStatus(string index_name)
        {
            return _client.Indices.Exists(index_name).Exists;
        }

        public int TotalDataCount()
        {
           var count =  _client.SearchAsync<ElasticInputModel>(s => s
                                                                .Query(q => q
                                                                .MatchAll())).Result.Documents.ToList().Count;
            return count;

        }
        public bool DeleteIndex(string index)
        {
            var response = _client.Indices.Delete(index).Acknowledged;
            return response;
        }
        
    }
}
