# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.
from .models import Post

class PostAdmin(admin.ModelAdmin):
	list_display = ["title", "timestamp", "updated"]
	list_display_links = ["timestamp"]
	list_filter = ["updated"]
	list_editable = ["title"]
	search_fields = ["title", "content"]
	class meta:
		model = Post

admin.site.register(Post, PostAdmin)
