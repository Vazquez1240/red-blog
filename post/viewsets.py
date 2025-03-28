from rest_framework import viewsets, status
from social_blog.settings import BASE_URL
from profiles.models import Profile
from .models import Post, Comment
from .serializers import PostSerializer
from rest_framework.permissions import IsAuthenticated
from django.core.cache import cache
from users.models import User
from rest_framework.response import Response
from rest_framework.decorators import action
from mongoengine.errors import DoesNotExist
from datetime import datetime

class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    http_method_names = ['get', 'post', 'patch']
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        cached_data = cache.get('posts')
        if cached_data:
            print(cached_data, 'data')
            return Post.objects.filter(id__in=[post['id'] for post in cached_data])
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

        data['author_username'] = user.username
        data['author_email'] = user.email

        serializer = PostSerializer(data=data)
        if serializer.is_valid():
            cache.delete('posts')
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


    @action(methods=['patch'], detail=False, url_path='comment-post', url_name='comment-post')
    def comment_post(self, request):
        print('pasando aqui')
        try:
            post = Post.objects.get(id=self.request.data.get('id_post'))
            print('pasando aqui x2')
            profile = Profile.objects.get(user__username=request.user.username)
            print('pasando aqui x3 ')
        except DoesNotExist:
            return Response({'detail': 'El post no existe'}, status=status.HTTP_404_NOT_FOUND)
        comment_content = request.data.get('comment_content')

        new_comment = Comment(
            content=comment_content,
            author_uuid=request.user.uuid,
            author_username=request.user.username,
            created_at=datetime.utcnow()
        )
        post.comments.append(new_comment)
        post.save()
        if profile.avatar:
            photo_url = BASE_URL+profile.avatar.url
        else:
            photo_url = None



        return Response({
            'id_post': str(post.id),
            'comment': {
                'content': new_comment.content,
                'author_uuid': str(new_comment.author_uuid),
                'author_username': new_comment.author_username,
                'created_at': new_comment.created_at.isoformat(),
                'author_avatar': photo_url
            },
            'total_comments': len(post.comments)
        }, status=status.HTTP_201_CREATED)
