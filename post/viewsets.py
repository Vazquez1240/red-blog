from rest_framework import viewsets, status
from .models import Post
from .serializers import PostSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser
from users.models import User
from rest_framework.response import Response

class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Post.objects.all()
        elif user.is_staff:
            return Post.objects.all()
        else:
            return Post.objects.filter(author_uuid=user.uuid)


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