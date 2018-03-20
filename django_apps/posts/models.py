# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.core.urlresolvers import reverse
from django.db import models
from django.db.models.signals import pre_save
from django.utils import timezone #used for publish date
from django.utils.safestring import mark_safe #turn strings to safe (render as html)
from django.utils.text import slugify
from django_apps.comments.models import Comment #create @property of Post access comments
from markdown_deux import markdown #third party library
from django.dispatch import receiver
import logging

class PostManager(models.Manager): #allows us to ovewrite default model Manger functions i.e objects.all() objects.create()
	def active(self, *args, **kwargs):
		return super(PostManager, self).filter(draft=False).filter(publish__lte=timezone.now())

def upload_location(instance, filename):
	return "%s/%s" %(instance.id, filename)

# Create your models here.

class Post(models.Model):
	# Fields
	title		= models.CharField(max_length=120)
	slug		= models.SlugField(unique=True) #slugs are used to make urls friendly to read
	image		= models.ImageField(null=True, blank=True,
							height_field="img_height",
							width_field="img_width",
							upload_to=upload_location
							)
	img_height	= models.IntegerField(default=0)
	img_width	= models.IntegerField(default=0)
	content		= models.TextField(max_length=1000)
	draft		= models.BooleanField(default=False, blank=True)
	publish		= models.DateField(auto_now=False, auto_now_add=False)
	updated		= models.DateTimeField(auto_now=True, auto_now_add=False)
	timestamp	= models.DateTimeField(auto_now=False, auto_now_add=True)

	# Relationship Fields
	user		= models.ForeignKey(settings.AUTH_USER_MODEL, default=1)

	objects = PostManager() #objects can be called something else but not recommended  queryset_list = Post.<objects>.all()

	def __str__(self):
		return self.title

	def get_absolute_url(self):
		return reverse("posts:detail", kwargs={"slug" : self.slug})
	# return reverse("posts:detail", kwargs={"id" : self.id}) #OLD before slug

	def get_delete_url(self):
		return reverse("posts:delete", kwargs={"slug" : self.slug})

	def get_edit_url(self):
		return reverse("posts:edit", kwargs={"slug" : self.slug})

	class Meta:
		ordering = ["-timestamp", "-updated"]

	def get_markdown(self): #use mardown-deux library to return markdown of content
		content = self.content
		markdown_text = markdown(content)
		return mark_safe(markdown_text)

	@property
	def comments(self):
		instance = self
		qs = Comment.objects.filter_by_instance(instance) # see Comment's Model Manger
		return qs

	@property
	def content_type(self):
		instance = self
		contentType = ContentType.objects.get_for_model(instance.__class__) #return content type of of the current instance
		return contentType

# Adding Slugs: Note! Must change all id in .views to slug
def create_slug(instance, new_slug=None):
	slug = slugify(instance.title)
	if new_slug is not None:
		slug = new_slug
	qs = Post.objects.filter(slug=slug).order_by("-id")
	exists = qs.exists()
	if exists:
		new_slug = "%s-%s" %(slug, qs.first().id)
		return create_slug(instance, new_slug=new_slug)
	return slug

def pre_save_post_receiver(sender, instance, *args, **kwargs):
	if not instance.slug:
		instance.slug = create_slug(instance)

pre_save.connect(pre_save_post_receiver, sender=Post)
