# Generated by Django 3.1 on 2021-01-19 08:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webscrapper', '0002_auto_20210119_1339'),
    ]

    operations = [
        migrations.AddField(
            model_name='data',
            name='d_id',
            field=models.CharField(max_length=1200, null=True),
        ),
    ]
