# post_app/views.py
from rest_framework import viewsets
from .models import Post
from .serializers import PostSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser

class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados pueden acceder

    def get_queryset(self):
        """
        Personaliza la consulta de los posts según el usuario autenticado.
        """
        user = self.request.user
        if user.is_superuser:
            return Post.objects.all()
        elif user.is_staff:
            return Post.objects.all()
        else:
            return Post.objects.filter(author_uuid=user.uuid)  # Filtrar por el UUID del autor

    def perform_create(self, serializer):
        """
        Sobreescribir el método de creación para incluir el autor automáticamente.
        """
        serializer.save(author_uuid=self.request.user.uuid)
