from rest_framework.routers import DefaultRouter

from .views import DoctorViewSet


router = DefaultRouter()
router.register(r"", DoctorViewSet, basename="doctors")

urlpatterns = []

urlpatterns += router.urls
