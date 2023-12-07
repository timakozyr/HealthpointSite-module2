from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views
from .views import UserViewSet

router = DefaultRouter()
router.register(r"", UserViewSet, basename="users_manipulation")

urlpatterns = [
    path("signup/", views.SignupAPIView.as_view(), name="signup"),
    path("login/", views.LoginAPIView.as_view(), name="login"),
]

urlpatterns += router.urls
