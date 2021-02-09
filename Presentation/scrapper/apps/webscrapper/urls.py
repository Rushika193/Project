from django.urls import path

from apps.webscrapper import views


urlpatterns = [
    path('', views.index, name='index'),
    path('startscraping', views.startscraping, name='startscraping'),
    path('recommenddesign', views.recommenddesign, name='recommenddesign'),
    path('gettemplate',views.gettemplate, name='getemplate'),
    path('data_list/<int:page_number>/<int:page_size>/',views.data_list, name='data_list'),
    path('list/<str:id>/',views.get_list, name='list'),
    path('edit/<str:id>/',views.edit,name='edit'),
    path('delete/<str:id>/',views.delete,name='delete'),
]
