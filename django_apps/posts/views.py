# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from .forms import PostForm
from .models import Post
from .serializers import PostDetailSerializer, PostListSerializer
from django.contrib import messages
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Q
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone
from urllib.parse import quote_plus #used for creating share strings
from rest_framework.generics import (
	ListAPIView,
	RetrieveAPIView,
	DestroyAPIView,
	UpdateAPIView,
)
from django.contrib.contenttypes.models import ContentType
from django_apps.comments.models import Comment

# Create your views here.

def post_create(request): #C
	if not request.user.is_staff or not request.user.is_superuser:
		raise Http404
	form = PostForm(request.POST or None, request.FILES or None) #Built in validation from forms
	if form.is_valid(): #if all fields filled out then save
		# print(form.cleaned_data.get("title")) #print field
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

def post_detail(request, slug=None): #R
	instance = get_object_or_404(Post, slug=slug)
	share_string = quote_plus(instance.content)
	content_type = ContentType.objects.get_for_model(Post)
	obj_id = instance.id
	comments = Comment.objects.filter(content_type=content_type, object_id=obj_id)
	if instance.publish > timezone.now().date() or instance.draft:
		if not request.user.is_staff or not request.user.is_superuser:
			raise Http404
	context = {
		"title" : instance.title,
		"instance" : instance,
		"share_string" : share_string,
		"comments" : comments,
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

def post_update(request, slug=None): #U
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

def post_delete(request, slug=None): #D
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
	return render(request, "index.html", context)

# Below are views for Rest API
class PostListAPIView(ListAPIView):
	serializer_class = PostListSerializer #Turn model into Json
	queryset = Post.objects.all() #must have queryset or overide get_querset() method
	lookup_field = 'slug'

	# search_fields = ['title']
	# def get_queryset(self, *args, **kwargs):
	# 	queryset_list = Post.objects.all()
	# 	query = self.request.Get.get("q")
	# 	if query:
	# 		query_list = queryset_list.filter(
	# 				Q(title__icontains=query)).distinct()
	# 	return query_list

class PostDetailAPIView(RetrieveAPIView):
	serializer_class = PostDetailSerializer
	queryset = Post.objects.all()
	lookup_field = 'slug'

