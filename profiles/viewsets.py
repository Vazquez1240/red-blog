from rest_framework import viewsets
from .models import Profile
from post.models import Post
from .serializers import ProfileSerializer
from post.serializers import PostSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser
from rest_framework.response import Response


class ProfilesViewset(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    parser_classes = (JSONParser,)

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Profile.objects.all()
        elif self.request.user.is_staff:
            return Profile.objects.all()
        else:
            return Profile.objects.filter(user=self.request.user.email)

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
            return Response(serializer.data)

        except (ValueError, Profile.DoesNotExist):
            return Response([])