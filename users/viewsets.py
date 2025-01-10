from .models import User
from .serializers import UserSerializer
from rest_framework.parsers import JSONParser
from rest_framework import viewsets
from .permissions import IsAuthenticatedAndObjUserOrIsStaff
from rest_framework import exceptions


class UserViewSet(viewsets.ModelViewSet):
    parser_classes = [JSONParser]
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticatedAndObjUserOrIsStaff]
    http_method_names = ['get', 'options', 'head']

    queryset = User.objects.all()

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()
        elif self.request.user.is_staff:
            return User.objects.all()
        elif self.request.user.is_authenticated:
            return User.objects.filter(pk=self.request.user.pk)
        else:
            raise exceptions.PermissionDenied('Forbidden')