from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action

from .models import Profile, Follow
from post.models import Post
from .serializers import ProfileSerializer, FollowSerializer
from post.serializers import PostSerializer
from django.core.cache import cache

from rest_framework.parsers import JSONParser
from rest_framework.response import Response


class ProfilesViewset(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    parser_classes = (JSONParser,)

    def list(self, request, *args, **kwargs):
        if self.request.user.is_superuser:
            profiles = Profile.objects.all()
            serializer = ProfileSerializer(profiles, many=True)
            return Response(serializer.data)
        elif self.request.user.is_staff:
            profiles = Profile.objects.all()
            serializer = ProfileSerializer(profiles, many=True)
            return Response(serializer.data)
        else:
            cached_data = cache.get('profiles')
            if cached_data:
                return Response(cached_data)
            profile = Profile.objects.filter(user=self.request.user).first()
            posts = Post.objects.filter(author_uuid=profile.user.uuid)
            serializer = PostSerializer(posts, many=True)
            serializer_profile = ProfileSerializer(profile)
            data = {
                "data_profile": serializer_profile.data,
                "data_posts": serializer.data
            }
            cache.set('profiles', data, timeout=60 * 5)
            return Response({
                "data_profile": serializer_profile.data,
                "data_posts": serializer.data
            })
class ProfileViewset(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = PostSerializer
    parser_classes = (JSONParser,)

    def list(self, request, *args, **kwargs):
        user_id = request.query_params.get('id_user')
        if not user_id:
            return Response([])
        try:
            profile = Profile.objects.filter(id=user_id).first()
            if not profile:
                return Response([])
            posts = Post.objects.filter(author_uuid=profile.user.uuid)
            serializer = PostSerializer(posts, many=True)
            serializer_profile = ProfileSerializer(profile)
            return Response({
                "data_profile": serializer_profile.data,
                "data_posts": serializer.data
            })
        except (ValueError, Profile.DoesNotExist):
            return Response([])



class FollowViewset(viewsets.ModelViewSet):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    parser_classes = (JSONParser,)


    def create(self, request, *args, **kwargs):
        follower_id = self.request.data.get('follower_id')
        follower_profile = request.user.profile
        following_profile = get_object_or_404(Profile, id=follower_id)

        if Follow.objects.filter(follower=follower_profile, following=following_profile).exists():
            return Response({'message': 'Ya sigues a este usuario.'}, status=status.HTTP_400_BAD_REQUEST)

        Follow.objects.create(follower=follower_profile, following=following_profile)

        return Response({'message': f'Ahora sigues a {following_profile.user.email}'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'], url_path='following')
    def following(self, request, pk=None):
        """
        Obtiene la lista de usuarios que sigue el perfil con el ID proporcionado.
        """
        # Obtener el perfil del ID proporcionado
        follower_profile = get_object_or_404(Profile, pk=pk)

        # Obtener los usuarios que sigue este perfil
        following_profiles = Follow.objects.filter(follower=follower_profile).select_related('following')

        data = ProfileSerializer([f.following for f in following_profiles], many=True).data

        return Response(data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'], url_path='followers')
    def followers(self, request, pk=None):
        """
        Obtiene la lista de seguidores de un usuario específico. Esto quiere decir que podemos ver quien sigue a un usuario
        en especifico
        """
        profile = get_object_or_404(Profile, pk=pk)
        follower_profiles = Follow.objects.filter(following=profile).select_related('follower')
        data = ProfileSerializer([f.follower for f in follower_profiles], many=True).data
        return Response(data, status=status.HTTP_200_OK)
