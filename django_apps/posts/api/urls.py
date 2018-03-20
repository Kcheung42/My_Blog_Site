from django.conf.urls import url
from django.contrib import admin

from django_apps.posts.api.views import (
	PostDeleteAPIView,
	PostDetailAPIView,
	PostListAPIView,
	PostUpdateAPIView,
)

urlpatterns = [
	url(r'^$', PostListAPIView.as_view(), name='list'),
	url(r'^(?P<slug>[\w-]+)/$', PostDetailAPIView.as_view(), name='detail'),
	url(r'^(?P<slug>[\w-]+)/delete/$', PostDeleteAPIView.as_view(), name='delete'),
	url(r'^(?P<slug>[\w-]+)/edit/$', PostUpdateAPIView.as_view(), name='edit'),
]
