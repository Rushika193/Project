from django import forms
# ?from apps.webscrapper.models import data
from django.contrib.auth.forms import UserCreationForm 
from django.contrib.auth.models import User
from django.db import models
from apps.webscrapper.models import Text,Image,Title,Index_Name,BackgroundImg

class get_Title(forms.ModelForm):
    class Meta:
        model=Title
        fields=('Tit',)

class get_Image(forms.ModelForm):
    class Meta:
        model= Image
        fields=('Img',)

class get_Text(forms.ModelForm):
    class Meta:
        model=Text
        fields=('Txt',)        

class get_Index(forms.ModelForm):
    class Meta:
        model=Index_Name
        fields=('Index',)
        