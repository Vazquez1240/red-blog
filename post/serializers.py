from .models import Post, Comment
from profiles.models import Profile
from rest_framework_mongoengine import serializers
from social_blog.settings import BASE_URL

class PostSerializer(serializers.DocumentSerializer):
    class Meta:
        model = Post
        fields = ['title', 'content', 'author_uuid', 'author_username', 'author_email', 'comments', 'likes', 'id']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        try:
            uuid_author = instance.author_uuid
            photo_author = Profile.objects.filter(user__uuid=uuid_author).first()
            data['comments'] = sorted(
                data['comments'],
                key=lambda x: x.get('created_at', ''),
                reverse=True
            )
            if photo_author.avatar:
                data['author_photo'] = BASE_URL+photo_author.avatar.url
            else:
                data['author_photo'] = None

        except AttributeError as e:
            data['author_photo'] = None
        return data