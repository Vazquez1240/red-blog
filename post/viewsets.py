from rest_framework import viewsets, status
from yaml import serialize

from social_blog.settings import BASE_URL
from profiles.models import Profile
from .models import Post
from .serializers import PostSerializer
from rest_framework.permissions import IsAuthenticated
from django.core.cache import cache
from users.models import User
from rest_framework.response import Response
from rest_framework.decorators import action
from mongoengine.errors import DoesNotExist

class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    http_method_names = ['get', 'post', 'patch']
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        cached_data = cache.get('posts')
        if cached_data:
            return cached_data
        queryset = Post.objects.all().order_by('-created_at')
        serialized_data = PostSerializer(queryset, many=True).data
        cache.set('posts', serialized_data)
        return queryset

    def retrieve(self, request, *args, **kwargs):
        """Deshabilitar la obtención de un detalle específico."""
        return Response({'detail': 'Método no permitido.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


    def create(self, request, *args, **kwargs):

        user = User.objects.get(uuid=request.data['author_uuid'])
        data = request.data
        print(user.username, 'user.username')

        data['author_username'] = user.username
        data['author_email'] = user.email

        serializer = PostSerializer(data=data)
        if serializer.is_valid():
            post = serializer.create(data)
            photo_author = Profile.objects.filter(user__uuid=post.author_uuid).first()
            if photo_author.avatar:
                photo_url =  BASE_URL+photo_author.avatar.url
            else:
                photo_url = None


            return Response({
                "id": post.id,
                "content": post.content,
                "author_uuid": post.author_uuid,
                "author_username": post.author_username,
                "author_email": post.author_email,
                "likes": post.likes,
                "comments": post.comments,
                "author_photo": photo_url,
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['patch'], detail=False, url_path='like-post', url_name='like-post')
    def like_post(self, request):
        try:
            post = Post.objects.get(id=self.request.data.get('id_post'))
        except DoesNotExist:
            return Response({'detail': 'El post no existe'}, status=status.HTTP_404_NOT_FOUND)

        user_uuid = request.user.uuid
        estado = None
        if post.likes is None:
            post.likes = []

        user_uuid = request.user.uuid

        if user_uuid in post.likes:
            estado = "remove"
            post.likes.remove(user_uuid)
        else:
            estado = "add"
            post.likes.append(user_uuid)

        post.save()

        return Response({
            'likes': len(post.likes),
            'estado': estado
        }, status=status.HTTP_200_OK)