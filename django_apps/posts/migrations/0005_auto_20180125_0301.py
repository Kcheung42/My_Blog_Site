# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2018-01-25 03:01
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0004_auto_20180125_0300'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='draft',
            field=models.BooleanField(default=False),
        ),
    ]
