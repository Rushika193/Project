from django.urls import path

from . import views

urlpatterns = [
    path('similarword', views.similar),
    path('similarword/', views.similar),
]
