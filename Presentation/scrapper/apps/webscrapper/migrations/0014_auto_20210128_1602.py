# Generated by Django 3.1 on 2021-01-28 10:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webscrapper', '0013_auto_20210128_1602'),
    ]

    operations = [
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Listing', models.CharField(max_length=200, null=True)),
            ],
        ),
        migrations.RenameField(
            model_name='sitetype',
            old_name='Listing',
            new_name='sitetype',
        ),
    ]
