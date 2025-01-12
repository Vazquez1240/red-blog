from apirest.urls import drf_router
from .viewsets import ProfilesViewset, ProfileViewset


urlpatterns = [
]

drf_router.register(r'profiles', ProfilesViewset, basename='profiles')
drf_router.register(r'profile', ProfileViewset, basename='profile')
