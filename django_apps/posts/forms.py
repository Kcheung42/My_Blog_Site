from django import forms
from django_apps.posts.models import Post
from pagedown.widgets import PagedownWidget


class PostForm(forms.ModelForm):
	content = forms.CharField(widget=PagedownWidget(show_preview=False))
	publish = forms.DateField(widget=forms.SelectDateWidget)
	class Meta: #allows us to not have to redefine fields from model
		model = Post
		fields = [
			"title",
			"content",
			"image",
			"draft",
			"publish",
		]
