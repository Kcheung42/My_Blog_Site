# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import messages
from django.contrib.contenttypes.models import ContentType
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Q
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone
from django_apps.comments.forms import CommentForm
from django_apps.comments.models import Comment
from django_apps.posts.forms import PostForm
from django_apps.posts.models import Post
from urllib.parse import quote_plus #used for creating share strings

import csv
import codecs

# Create your views here.

def post_create(request): #Create
	if not request.user.is_staff or not request.user.is_superuser:
		raise Http404
	form = PostForm(request.POST or None, request.FILES or None) #Built in validation from forms
	if form.is_valid(): #if all fields filled out then save
		instance = form.save(commit=False)
		instance.user = request.user
		instance.save()
		messages.success(request, "Sucessfully Created")
		return HttpResponseRedirect(instance.get_absolute_url())
	context = {
		"form": form,
		"type": "Create",
	}
	return render(request, "post_form.html", context)

def post_detail(request, slug=None): #Retrieve
	instance = get_object_or_404(Post, slug=slug)
	if instance.publish > timezone.now().date() or instance.draft:
		if not request.user.is_staff or not request.user.is_superuser:
			raise Http404
	share_string = quote_plus(instance.content)

	initial_data = {
		"content_type" : instance.content_type, #get_content_type is a property of Post's Model
		"object_id": instance.id,
	}
	form = CommentForm(request.POST or None, initial=initial_data)
	if form.is_valid():
		c_type					= form.cleaned_data.get("content_type") #comes from initial_data
		content_type			= ContentType.objects.get(model=c_type) #get type from initial_data
		obj_id					= form.cleaned_data.get("object_id")
		content_data			= form.cleaned_data.get("content")
		parent_obj				= None

		try:
			parent_id = int(request.POST.get("parent_id"))
		except:
			parent_id = None
		if parent_id:
			print('here!')
			parent_qs = Comment.objects.filter(id=parent_id)
			if parent_qs.exists() and parent_qs.count() == 1:
				parent_obj = parent_qs[0] #can also use .first()

		new_comment, created	= Comment.objects.update_or_create(
			user = request.user,
			content_type = content_type,
			object_id = obj_id,
			content = content_data,
			timestamp = timezone.now(),
			parent = parent_obj
		)
		return HttpResponseRedirect(new_comment.content_object.get_absolute_url())
		if created:
			print("yearh it worked")

	comments = instance.comments
	context = {
		"title" : instance.title,
		"instance" : instance,
		"share_string" : share_string,
		"comments" : comments,
		"comment_form" : form
	}
	return render(request, "post_detail.html", context)

def post_list(request):
	# queryset_list = Post.objects.filter(draft=False).filter(publish__lte=timezone.now())
	today = timezone.now().date
	queryset_list = Post.objects.active()
	if request.user.is_staff or request.user.is_superuser: #use to control display of view Edit and Delete buttons
		queryset_list = Post.objects.all()
	query = request.GET.get("q")
	if query:
		queryset_list = queryset_list.filter(
			Q(title__icontains=query)| #import Q to seach multiple
			Q(content__icontains=query)
		).distinct() #No duplicte items
	paginator = Paginator(queryset_list, 7) # Show 7 contacts per page
	page = request.GET.get('abc') #must be named same as page_var
	page_request_var = 'abc'
	try:
		queryset = paginator.page(page)
	except PageNotAnInteger:
		queryset = paginator.page(1)
	except EmptyPage:
		queryset = paginator.page(paginator.num_pages)
	context = {
		"object_list": queryset,
		"title":"Welcome To My Blog",
		"page_request_var": page_request_var,
		"today" : today,
	}
	return render(request, "post_list.html", context)

def post_update(request, slug=None): #Update
	if not request.user.is_staff or not request.user.is_superuser:
		raise Http404
	instance = get_object_or_404(Post, slug=slug)
	form = PostForm(request.POST or None, request.FILES or None, instance=instance)
	if form.is_valid():
		instance = form.save(commit=False)
		instance.save()
		messages.success(request, "<a href='#'>Item</a> Success!", extra_tags='html_safe')
		return HttpResponseRedirect(instance.get_absolute_url())
	context = {
		"title": instance.title,
		"instance": instance,
		"form": form,
		"type": "Update",
	}
	return render(request, "post_form.html", context)

def post_delete(request, slug=None): #Delete
	if not request.user.is_staff or not request.user.is_superuser:
		raise Http404
	instance = get_object_or_404(Post, slug=slug)
	instance.delete()
	messages.success(request, "Sucessfully Deleted", extra_tags='html_safe')
	return redirect("posts:list")

def post_home(request): #C
	context = {
		"title": "Welcome to Bambo's Blog"
	}
	if request.POST and request.FILES:
		csvfile = request.FILES['csv_file']
		dialect = csv.Sniffer().sniff(codecs.EncodedFile(csvfile, "utf-8").read(1024))
		csvfile.open()
		reader = csv.reader(codecs.EncodedFile(csvfile, "utf-8"), delimiter=',', dialect=dialect)
	return render(request, "index.html", context)
