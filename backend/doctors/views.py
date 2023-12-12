from django.contrib.auth.models import AnonymousUser
from rest_framework import permissions, viewsets

from users.models import User
from .models import Doctor
from .serializers import DoctorSerializer


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        if not isinstance(request.user, AnonymousUser):
            return request.user.is_admin
        return False


class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [IsAdminOrReadOnly]

    def perform_create(self, serializer):
        serializer.save()

    def perform_update(self, serializer):
        serializer.save()

    def perform_destroy(self, instance):
        user_id = instance.user_id

        try:
            instance.user.delete()
        except User.DoesNotExist:
            pass

        instance.delete()
