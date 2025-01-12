from rest_framework import viewsets
from .models import Profile
from post.models import Post
from .serializers import ProfileSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser


class ProfilesViewset(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Profile.objects.all()
        elif self.request.user.is_staff:
            return Profile.objects.all()
        else:
            return Profile.objects.filter(user=self.request.user.email)

class ProfileViewset(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_queryset(self):

        queryset = self.queryset.filter(id=self.request.data.get('id_user'))

        user = queryset.filter().first()

        print(user)

        publicaciones = Post.objects.filter(author_uuid=user.user.uuid)

        return publicaciones