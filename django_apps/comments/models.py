# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
# from django_apps.posts.models import Post #OLD do not do

# Create your models here.

class Comment(models.Model):
	user		= models.ForeignKey(settings.AUTH_USER_MODEL, default=1)
	# post		= models.ForeignKey(Post)

	# Set up generic foreignkey like this at the very beginning or it will break your Database
	content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
	object_id = models.PositiveIntegerField()
	content_object = GenericForeignKey('content_type', 'object_id')

	content		= models.TextField()
	timestamp	= models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.user.username
