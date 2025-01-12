from apirest.urls import drf_router
from users.viewsets import (UserViewSet, AuthTokenViewset)


urlpatterns = [
]

drf_router.register(r'users', UserViewSet, basename='users')
drf_router.register(r'login', AuthTokenViewset, basename='login')
