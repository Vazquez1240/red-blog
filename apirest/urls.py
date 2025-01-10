from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

drf_router = routers.DefaultRouter()

app_name = 'apirest'

urlpatterns = [
    path('users/', include('users.urls')),

    path('', include(drf_router.urls)),
]

urlpatterns += drf_router.urls