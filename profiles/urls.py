from apirest.urls import drf_router
from .viewsets import ProfilesViewset, ProfileViewset, FollowViewset

urlpatterns = [
]

drf_router.register(r'profiles', ProfilesViewset, basename='profiles')
drf_router.register(r'profile', ProfileViewset, basename='profile')
drf_router.register(r'follow', FollowViewset, basename='follow')
