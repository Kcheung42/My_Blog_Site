# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
# from django_apps.posts.models import Post #OLD do not do

# Create your models here.

class CommentManager(models.Manager): #allows us to use instance of Post to get comments. Clearner .views
	def filter_by_instance(self, instance):
		content_type	= ContentType.objects.get_for_model(instance.__class__)
		obj_id			= instance.id
		qs				= super(CommentManager, self).filter(content_type=content_type, object_id=obj_id).filter(parent=None)
		return qs

class Comment(models.Model):
	# Set up generic foreignkey very beginning or it will break your Database
	user			= models.ForeignKey(settings.AUTH_USER_MODEL, default=1)
	#setting up with GFkey allows us to use Comments app in other apps
	content			= models.TextField()
	content_object	= GenericForeignKey('content_type', 'object_id') #this is the instance of Post object
	content_type	= models.ForeignKey(ContentType, on_delete=models.CASCADE)
	object_id		= models.PositiveIntegerField() #id of the Post it belongs to
	timestamp		= models.DateTimeField(auto_now_add=True)
	parent			= models.ForeignKey("self", null=True, blank=True)

	objects = CommentManager()

	class Meta:
		ordering = ['-timestamp']

	def __str__(self):
		return self.user.username

	def children(self):
		return Comment.objects.filter(parent=self)

	@property
	def is_parent(self):
		if self.parent is not None:
			return False
		return True
