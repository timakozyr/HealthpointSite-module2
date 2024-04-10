from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.views.generic import RedirectView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from backend import settings


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/users/", include("users.urls")),
    path("api/services/", include("services.urls")),
    path("api/appointments/", include("appointments.urls")),
    path("api/specializations/", include("specializations.urls")),
    path("api/doctors/", include("doctors.urls")),
    path("api/auth/", include("authentication.urls")),
    path("api/prediction/", include("artificial_intelligence.urls"))
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

urlpatterns += [
    path("", RedirectView.as_view(url="/api/docs/", permanent=True)),
]
