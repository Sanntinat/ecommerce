# Generated by Django 5.0.7 on 2024-09-30 01:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0004_productos_tags'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='productos',
            name='imagen',
        ),
        migrations.AddField(
            model_name='productos',
            name='imagen_url',
            field=models.CharField(blank=True, max_length=512, null=True),
        ),
    ]
