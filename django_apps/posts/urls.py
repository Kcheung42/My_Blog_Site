from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from .views import (
	PostDetailAPIView,
	PostListAPIView,
	post_create,
	post_delete,
	post_detail,
	post_home,
	post_list,
	post_update,
)

urlpatterns = [
	url(r'^$', post_home, name='index'),
	url(r'^list/$', post_list, name='list'),
	url(r'^create/$', post_create, name='create'),
	url(r'^(?P<slug>[\w-]+)/$', post_detail, name='detail'),
	url(r'^(?P<slug>[\w-]+)/delete/$', post_delete, name='delete'),
	url(r'^(?P<slug>[\w-]+)/edit/$', post_update, name='edit'),
	url(r'^api/$', PostListAPIView.as_view(), name='list-api'),
	url(r'^(?P<slug>[\w-]+)/api/$', PostDetailAPIView.as_view(), name='detail-api'),
]

# Old without slugs
# urlpatterns = [
# 	url(r'^$', post_home, name='index'),
# 	url(r'^(?P<id>\d+)/$', post_detail, name='detail'),
# 	url(r'^api/$', PostListAPIView.as_view(), name='list-api'),
# 	url(r'^api/(?P<id>\d+)/$', PostDetailAPIView.as_view(), name='detail-api'),
# 	url(r'^create/$', post_create),
# 	url(r'^delete/(?P<id>\d+)/$', post_delete, name='delete'),
# 	url(r'^list/$', post_list, name='list'),
# 	url(r'^edit/(?P<id>\d+)/$', post_update, name='edit'),
# ]

#This
urlpatterns = format_suffix_patterns(urlpatterns)
