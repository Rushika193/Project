# Generated by Django 3.1 on 2021-01-26 10:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webscrapper', '0010_index_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='BackgroundImg',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('B_img', models.IntegerField(default=0)),
            ],
        ),
    ]
