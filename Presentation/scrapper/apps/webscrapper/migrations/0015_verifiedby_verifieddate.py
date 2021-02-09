# Generated by Django 3.1 on 2021-01-29 10:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webscrapper', '0014_auto_20210128_1602'),
    ]

    operations = [
        migrations.CreateModel(
            name='VerifiedBy',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('verifiedby', models.CharField(max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='VerifiedDate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('verifiedate', models.DateField()),
            ],
        ),
    ]