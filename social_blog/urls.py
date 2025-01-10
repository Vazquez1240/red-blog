from django.contrib import admin
from django.urls import path, include
# from drf_spectacular.views import SpectacularSwaggerView, SpectacularAPIView, SpectacularRedocView

urlpatterns = [
    path('dadmin/', admin.site.urls),
    path('rest/v1/', include('apirest.urls', namespace='apirest')),
    path('rest/v1/auth/', include('rest_framework.urls', namespace='rest_framework')),

    # path('schema/', SpectacularAPIView.as_view(), name='schema'),
    # path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger'),
    # path('redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

]