from rest_framework import serializers
from .models import Profile, Follow

class ProfileSerializer(serializers.ModelSerializer):
    uuid = serializers.CharField(source='user.uuid', read_only=True)
    class Meta:
        model = Profile
        exclude = ('created_at', 'updated_at')


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = '__all__'