from django.http import response
from apps.webscrapper.Helper.elasticsearch import ElasticSearch
from django.shortcuts import render,redirect
from django.http.response import HttpResponse, JsonResponse
from apps.webscrapper.models import Text,Title,Image,SiteType,PageType,Describe,VerifiedBy,VerifiedDate
from apps.webscrapper.models import Index_Name,BackgroundImg,Listing,Application,Remarks
import json
from apps.webscrapper.forms import get_Title,get_Image,get_Text
from apps.webscrapper.Helper.DOMParser import DOMParser
from apps.webscrapper.Helper.DOMStructure import DOMStructure
from rest_framework.decorators import api_view
from decouple import config
from django.shortcuts import render
from django.views.generic import ListView

# Create your views here.


def index(request):
    
    return render(request, 'index.html')


def startscraping(request):

    # this will come from one api from contentder and maight the structure of data vary
    # urls = ["https://delasheshstha.contentder.com/"]
    urls = ["https://cashway.com.np"]

    dp = DOMParser()
    page_row = dp.parse_sites(urls)
    return JsonResponse(page_row, safe=False)


@api_view(['POST'])
def recommenddesign(request):
    data = request.data

    es = ElasticSearch()
    result = es.search_design(config('INDEX_NAME'),
                              data['count'], data['componentCount'])

    designs = []
    for hit in result['hits']['hits']:
        hit_data = {'id': hit['_id'], 'imagePath': "{0}://{1}/{2}".format(
            request.scheme, request.get_host(), hit['_source']['imagePath'])}
        designs.append(hit_data)

    response = {'designs': designs}
    return JsonResponse(response)

# API to return template deisng on api


@api_view(['POST'])
def gettemplate(request):
    data = request.data
    es = ElasticSearch()
    template = es.search_template(config('INDEX_NAME'), data['id'])
    hit = template['hits']['hits'][0]
    return JsonResponse({'id': hit['_id'], 'template': hit['_source']['template'], 'componentOrderJson': hit['_source']['componentOrderJson']})

def data_list(request,page_number=1,page_size=5):
    es = ElasticSearch()
    html=" "
    page= (page_number-1)*page_size
    

    
    
    
    result=es.search_data(config('INDEX_NAME'),page,page_size)
    data_html="" 
   
    for i in result['hits']['hits']:
        d_id=i['_id']
        html+='<tr><td>{0}</td><td><img src="http://40.114.92.165:9201/{1}" alt="Responsive image" width="200px" height="90px"></td><td>{2}</td><td><a href="http://127.0.0.1:8000/webscrapper/list/{3}"><input type="button" value="Detail" class="btn btn-primary"></a></td></tr>'.format(i['_source']['pageUrl'],i['_source']['imagePath'],i['_source']['componentCount'],i['_id'],)
        
    
           
    next_page=page_number+1
    prev_page=page_number-1

    posts={ 
            'page_number':page_number,
            'next_page':next_page,
            'prev_page':prev_page,
            'd_id':d_id,
            'html':html,
            }

  
    return render(request,'data.html',posts)
   
def get_list(request,id):
    es = ElasticSearch()
    result=es.searchdata(config('INDEX_NAME'),id)
    keys=[]

    data_html = ""
    
    source={}
    doc={}

    for i in result['hits']['hits']:
        ans=i['_source']
        keys.append(ans.keys())

    data=str(keys).replace("{","").replace("}", "").replace("[","").replace("]","")
    print(data)

    for i in result['hits']['hits']:
        data_html += '<img src="http://40.114.92.165:9201/{0}" alt="Responsive image" width="1820" height="200px">'.format( i['_source']['imagePath'],)
        d_id=i['_id']
        count=i['_source']['count']
        components=i['_source']['components']
        componentCount=i['_source']['componentCount'] 
        backgroundImage=i['_source']['bgImage'] 
        data_type=i['_type']
        nodes=i['_source']['nodes']
        index=i['_index']
        pageurl=i['_source']['pageUrl']
        domain=i['_source']['domain']
        

        if "Pagetype" in data: 
            print("yes")
            pagetype=i['_source']['Pagetype']
                    
        else:
            doc['Pagetype']="Travel blog"
            pagetype="Travel blog"
        
        if "Sitetype" in  data:  
            sitetype=i['_source']['Sitetype']
        else:
            doc["Sitetype"]="Website"
            sitetype="Website"            
            
        if "Remarks" in data:  
            Remarks=i['_source']['Remarks']
        else:
            doc['Remarks']="Good"
            Remarks= "Good"    
            
        if 'Application' in data:  
            print("yes")
            Application=i['_source']['Application']
        else:
            doc['Application']="Good"
            Application="Good"   
            
        if 'Describe'in data: 
            Describe=i['_source']['Describe']
        else:
            doc['Describe']="Good"
            Describe="Good"   
            
        if 'Listing' in data: 
                Listing=i['_source']['Listing']
        else:
                doc['Listing']="Yes"
                Listing="Yes"

        if len(doc)!=0:      
            print("updated")   
            source['doc']=doc
            update=es.update_data('live_site_data',i['_id'],source)
            
        

    posts={
        'index':index,
        'html_data':data_html,
        'd_id':d_id,
        
        'pagetype':pagetype,
        'sitetype':sitetype,
        'backgroundImage':backgroundImage, 
        'data_type':data_type,
        'count':count,
        'componentCount':componentCount,
        'components':components,
        'nodes':nodes,
        'pageurl':pageurl,
        'Remarks':Remarks,
        'Application':Application,
        'Describe':Describe,
        'Listing':Listing,
        }

  
    return render(request,'List.html',posts)

def edit(request,id):
        es=ElasticSearch()

        result=es.searchdata(config('INDEX_NAME'),id)

        for i in result['hits']['hits']:
            d_id=i['_id']
            count=i['_source']['count']
            components=i['_source']['components']
            componentCount=i['_source']['componentCount'] 
            backgroundImage=i['_source']['bgImage'] 
            data_type=i['_type']
            nodes=i['_source']['nodes']
            index=i['_index']
            pageurl=i['_source']['pageUrl']
            domain=i['_source']['domain']
            pagetype=i['_source']['Pagetype']
            sitetype=i['_source']['Sitetype']
            remark=i['_source']['Remarks']
            application=i['_source']['Application']
            Des=i['_source']['Describe']
            listing=i['_source']['Listing']
        
            
        

    


        if request.method=="POST":
            Tit=request.POST['Title']
            Txt=request.POST['Text']
            Img=request.POST['Image']
            page=request.POST['page']
            site=request.POST['site']
            b_img=request.POST['B_img']
            remarks=request.POST['remarks']
            application=request.POST['application']
            listing=request.POST['listing']
            describe=request.POST['description']
            verifiedby=request.POST['By']
            verifieddate=request.POST['date']


            Image.objects.create(Img=Img)
            Title.objects.create(Tit=Tit)
            Text.objects.create(Txt=Txt)
            VerifiedBy.objects.create(verifiedby=verifiedby)
            VerifiedDate.objects.create(verifiedate=verifieddate)
            BackgroundImg.objects.create(B_img=b_img)
            SiteType.objects.create(sitetype=site)
            PageType.objects.create(pagetype=page)
            Describe.objects.create(des=describe)
            Remarks.objects.create(remarks=remarks) 
            Application.objects.create(application=application)
            Listing.objects.create(Listing=listing)

            tt=Title.objects.filter(Tit=Tit).first()      
            txt=Text.objects.filter(Txt=Txt).first()
            Img=Image.objects.filter(Img=Img).first()
            by=VerifiedBy.objects.filter(verifiedby=verifiedby).first()
            date=VerifiedDate.objects.filter(verifiedate=verifieddate).first()
            b_img=BackgroundImg.objects.filter(B_img=b_img).first()
            describe=Describe.objects.filter(des=describe).first()
            application=Application.objects.filter(application=application).first()
            remarks=Remarks.objects.filter(remarks=remarks).first()
            listing=Listing.objects.filter(Listing=listing).first()
            page=PageType.objects.filter(pagetype=page).first()
            site=SiteType.objects.filter(sitetype=site).first()

            
            print(type(tt.Tit))  

            source_to_update={   
                        "doc":{
                            
                                "Pagetype":page.pagetype,
                                "Sitetype":site.sitetype,
                                "Remarks":remarks.remarks,
                                "Describe":describe.des,
                                "Application":application.application,
                                "bgImage": b_img.B_img,
                                "VerifiedBy":by.verifiedby,
                                "VeridiedDate":date.verifiedate,
                                "Listing":listing.Listing,

                        "count":   [
                                            {
                                                "heading":tt.Tit
                                            },
                                            {
                                                "image": Img.Img
                                            },
                                            {
                                                "text": txt.Txt
                                            }
                                ],
                            }
                        } 
            result=es.update_data(config('INDEX_NAME'),id,source_to_update)
            print(result)
                
            return redirect('/webscrapper/list/'+id)


        posts={
        'index':index,
        'd_id':d_id,
        'pagetype':pagetype,
        'sitetype':sitetype,
        'backgroundImage':backgroundImage, 
        'data_type':data_type,
        'count':count,
        'componentCount':componentCount,
        'components':components,
        'nodes':nodes,
        'pageurl':pageurl,
        'Remarks':remark,
        'Application':application,
        'Describe':Des,
        'Listing':listing,
        }
        return render(request,'edit.html',posts)


    

def delete(request,id):
    es = ElasticSearch()
    print(id+"ig")
    d=es.delete_data(config('INDEX_NAME'),id)
    return redirect('/')        