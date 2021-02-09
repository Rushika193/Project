from django.db import models

# Create your models here.
class Title(models.Model):
    Tit=models.IntegerField(default=0)
    
    def __int__(self):
        return self.Tit



class Text(models.Model):
    Txt=models.IntegerField(default=0)

    def __int__(self):
        return self.Text

class Image(models.Model):
    Img=models.IntegerField(default=0)

    def __int__(self):
        return self.Img

class Index_Name(models.Model):
    Index=models.CharField(max_length=200,null=True)

    def __str__(self):
        return self.Index  

class BackgroundImg(models.Model):
    B_img=models.IntegerField(default=0)

    def __int__(self):
        return self.B_img    

class PageType(models.Model):        
    pagetype=models.CharField(max_length=200,null=True)

    def __str__(self):
        return self.pagetype

class SiteType(models.Model):        
    sitetype=models.CharField(max_length=200,null=True)

    def __str__(self):
        return self.sitetype 

class Describe(models.Model):        
    des=models.CharField(max_length=500,null=True)

    def __str__(self):
        return self.des

class Application(models.Model):        
    application=models.CharField(max_length=200,null=True)

    def __str__(self):
        return self.application

class Remarks(models.Model):        
    remarks=models.CharField(max_length=200,null=True)

    def __str__(self):
        return self.remarks

class Listing(models.Model):        
    Listing=models.CharField(max_length=200,null=True)

    def __str__(self):
        return self.Listing 

class VerifiedBy(models.Model):        
    verifiedby=models.CharField(max_length=200,null=True)
    def __str__(self):
        return self.verifiedby 

class VerifiedDate(models.Model):        
    verifiedate=models.DateField()
    def __str__(self):
        return self.verifieddate 
         