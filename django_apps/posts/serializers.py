from rest_framework.serializers import ModelSerializer, HyperlinkedIdentityField
from .models import Post

# post_detail_url = HyperlinkedIdentityField(
# 		view_name='post:PostListAPi',
# 		lookup_field='id'
# 		)

class PostListSerializer(ModelSerializer):
	class Meta:
		model = Post
		fields = '__all__'

class PostDetailSerializer(ModelSerializer):
	# url = post_detail_url
	class Meta:
		model = Post
		fields = [
				'title',
				'content',
]
