# Generated by Django 3.1 on 2021-01-22 05:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webscrapper', '0006_auto_20210122_0947'),
    ]

    operations = [
        migrations.AlterField(
            model_name='data',
            name='Image',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='data',
            name='Text',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='data',
            name='Title',
            field=models.IntegerField(default=0),
        ),
    ]
