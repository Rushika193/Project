# Generated by Django 3.1 on 2021-01-15 08:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='data',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('d_id', models.CharField(max_length=120)),
                ('components', models.CharField(max_length=120)),
                ('imagePath', models.CharField(max_length=120)),
            ],
        ),
    ]