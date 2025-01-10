from apirest.urls import drf_router
from post.viewsets import PostViewSet


urlpatterns = [
]

drf_router.register(r'posts', PostViewSet, basename='posts')
