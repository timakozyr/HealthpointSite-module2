from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import AppointmentViewSet, AvailableTimeBlocks


router = SimpleRouter()
router.register(r"", AppointmentViewSet, basename="appointments")

urlpatterns = router.urls

urlpatterns += [
    path(
        "slots/<int:doctor_id>/<str:date>/",
        AvailableTimeBlocks.as_view(),
        name="slots",
    ),
]
