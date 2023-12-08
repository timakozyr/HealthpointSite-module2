from rest_framework.routers import DefaultRouter

from .views import SpecializationViewSet

router = DefaultRouter()
router.register(r"", SpecializationViewSet, basename="specializations")
urlpatterns = router.urls
