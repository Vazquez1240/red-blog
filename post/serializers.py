from .models import Post
from rest_framework_mongoengine import serializers

class PostSerializer(serializers.DocumentSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        if '_id' in data:
            data['_id'] = str(data['_id'])
        return data