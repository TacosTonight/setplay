# Generated by Django 4.1.3 on 2023-02-13 00:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0003_alter_spotifytoken_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='spotifytoken',
            name='modified_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
