from rest_framework import serializers
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    uuid = serializers.CharField(source='user.uuid', read_only=True)
    class Meta:
        model = Profile
        exclude = ('created_at', 'updated_at')