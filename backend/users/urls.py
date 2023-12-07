from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views
from .views import UserViewSet, DoctorViewSet

router = DefaultRouter()
router.register(r"users", UserViewSet, basename="users_manipulation")
router.register(r'doctors', DoctorViewSet, basename='doctors')

urlpatterns = [
    path("signup/", views.SignupAPIView.as_view(), name="signup"),
    path("login/", views.LoginAPIView.as_view(), name="login"),
]

urlpatterns += router.urls
