from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from backend import settings
from users import views

urlpatterns = [
                  path("admin/", admin.site.urls),
                  path("users/", include("users.urls")),
                  path("services/", include("services.urls")),
                  path("appointments/", include("appointments.urls")),
                  path("specializations/", include("specializations.urls")),
                  path("doctors/", include("doctors.urls")),
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

swagger = [
    path("api/schema/", SpectacularAPIView.as_view(), name="api-schema"),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="api-schema"),
        name="api-docs",
    ),
]

urlpatterns += swagger
