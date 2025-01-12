from .models import Post
from rest_framework_mongoengine import serializers

class PostSerializer(serializers.DocumentSerializer):
    class Meta:
        model = Post  # Especificamos el modelo de mongoengine
        fields = '__all__'