from django_apps.posts.models import Post
from django_apps.posts.api.serializers import PostListSerializer, PostDetailSerializer

from rest_framework.generics import (
	ListAPIView,
	RetrieveAPIView,
	DestroyAPIView,
	UpdateAPIView,
)

class PostDetailAPIView(RetrieveAPIView):
	queryset = Post.objects.all()
	serializer_class = PostDetailSerializer
	lookup_field = 'slug'

class PostListAPIView(ListAPIView):
	queryset = Post.objects.all() #must have queryset or overide get_querset() method
	serializer_class = PostListSerializer #Turn model into Json
	lookup_field = 'slug'

class PostUpdateAPIView(UpdateAPIView):
	queryset = Post.objects.all() #must have queryset or overide get_querset() method
	serializer_class = PostListSerializer #Turn model into Json
	lookup_field = 'slug'

class PostDeleteAPIView(DestroyAPIView):
	queryset = Post.objects.all() #must have queryset or overide get_querset() method
	serializer_class = PostListSerializer #Turn model into Json
	lookup_field = 'slug'

