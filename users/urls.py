from apirest.urls import drf_router
from users.viewsets import (UserViewSet)


urlpatterns = [
]

drf_router.register(r'users', UserViewSet, basename='users')
