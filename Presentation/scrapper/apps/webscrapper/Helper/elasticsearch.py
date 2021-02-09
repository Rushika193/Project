from elasticsearch import Elasticsearch
import csv
import json
from decouple import config


class ElasticSearch:

    def __init__(self):
         self._es = Elasticsearch(
            hosts=[{'host': config('ES_HOST'), 'port': config('ES_PORT')}],
            http_auth=(config('ES_USERNAME'), config('ES_PASSWORD')))


    def create_index(self, index_name):
        return self._es.indices.create(index=index_name, ignore=400)

    def check_index_exist(self, index_name):
        return self._es.indices.exists(index=index_name)

    def delete_index(self, index_name):
        return self._es.indices.delete(index=index_name)

    def get_or_create(self, index_name):
        if self.check_index_exist(index_name):
            return True, False
        else:
            return self.create_index(index_name), True

    def load_csv_file(self, csv_file_path):

        data = []
        csvFilePath = csv_file_path
        with open(csvFilePath) as csvFile:
            csvReader = csv.DictReader(csvFile)
            for rows in csvReader:
                data.append(json.dumps(rows))
        return data

    def __buld_create(self, data, data_structure):

        for datom in data:
            yield data_structure

    '''def bulk_indexing(self,data):
        Helper.bulk(self._es,self.__bulk_create(data))
        return True'''

    def single_indexing(self, index_name, body, doc_type=None, id=None):
        try:
            response = self._es.index(
                index=index_name, doc_type=doc_type, id=id, body=body)
            return response['result']
        except Exception as e:
            raise e

    def get_indices_data_by_id(self, index, id, doc_type=None):
        try:
            response = self._es.get(index=index, id=id, doc_type=doc_type)
            return response
        except Exception as e:
            raise e

    def search_indices_fts(self, index, fields, query, size=10, frm=0):

        try:
            result = self._es.search(index=index,
                                     body={
                                         "from": frm,
                                         "size": size,
                                         "query": {
                                             "bool": {
                                                 "must":
                                                 [{"match_phrase": {
                                                     field: query
                                                 }} for field in fields]
                                             }
                                         }
                                     }
                                     )
            return {'hits': result['hits']['total']['value'], 'data': result['hits']['hits']}
        except:
            return {'hits': []}

    def search_design(self, index, count, componentCount):
        c = len(count)
        keys = list(count.keys())

        parameter = [{
            "match": {
                "count.{0}".format(keys[i].replace(' ', '')): count[keys[i]]
            }
        } for i in range(c)]
        parameter.append({
            "match": {
                "componentCount": componentCount
            }
        })

        result = self._es.search(index=index, body={
            "query": {
                "bool": {
                    "must": parameter
                }
            }
        })

        return result

    def search_template(self, index, template_id):
        result = self._es.search(index=index, body={
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "_id": template_id
                            }
                        }
                    ]
                }
            }
            
        })
        return result


    def search_data(self,index,start_from,page_size):
        result=self._es.search(index=index,body={
            "from":start_from,"size":page_size,
            "sort": [
                      { 
                        "scrapeDate": {
                                        "order": "desc"
                                    }
                      }
                    ],
            "query":{
                "bool":{
                    "must":[
                        {
                            "match_all":{ 
                                
                            }
                        }
                    ]
                }
            },
           
          })
        
        return result


    def searchdata(self,index,id):
        result=self._es.search(index=index,
        body={
            "query":{
                "bool":{
                    "must":[
                        {
                            "match":{ 
                                "_id":id
                            }
                        }
                    ]
                }
            }
        })  

        return result
    def update_data(self,index,id,source_to_update):
       
        result=self._es.update(index=index,id=id,body=source_to_update)  
        return result

    def delete_data(self,index,id):
        delete=self._es.delete(index=index,id=id,  ignore=[400, 404]) 

        