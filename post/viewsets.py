from rest_framework import viewsets, status
from .models import Post
from .serializers import PostSerializer
from rest_framework.permissions import IsAuthenticated
from django.core.cache import cache
from users.models import User
from rest_framework.response import Response

class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    http_method_names = ['get', 'post']
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        cached_data = cache.get('posts')
        if cached_data:
            return cached_data
        cache.set('posts', Post.objects.all().order_by('-created_at'), timeout=60 * 5)
        return Post.objects.all().order_by('-created_at')

    def retrieve(self, request, *args, **kwargs):
        """Deshabilitar la obtención de un detalle específico."""
        return Response({'detail': 'Método no permitido.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


    def create(self, request, *args, **kwargs):
        user = User.objects.get(uuid=request.data['author_uuid'])
        data = request.data

        data['author_username'] = user.username
        data['author_email'] = user.email

        serializer = PostSerializer(data=data)
        if serializer.is_valid():
            post = serializer.create(data)
            return Response({'status': '201'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)