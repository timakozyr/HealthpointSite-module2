from django.contrib.auth.models import AnonymousUser
from rest_framework import permissions, status, viewsets
from rest_framework.response import Response

from roles.models import Role

from .models import User
from .serializers import UserSerializer


class IsDoctorOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        # if request.method in permissions.SAFE_METHODS:
        #     return True

        if not isinstance(request.user, AnonymousUser):
            if not bool(request.user and request.user.is_staff):
                role = Role.objects.get(name="doctor")
                return request.user.role == role
            else:
                return True
        return False


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsDoctorOrAdmin]

    def get_queryset(self):
        if self.request.user.is_admin or self.request.user.role.id == 3:
            return User.objects.filter(role__name="user")
        return User.objects.filter(id=self.request.user.id)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            if (
                not request.user.is_admin
                and request.user.id != serializer.validated_data.get("id")
            ):
                return Response(
                    {"detail": "You can only create users for yourself."},
                    status=status.HTTP_403_FORBIDDEN,
                )
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None, *args, **kwargs):
        user = self.get_object()
        if not request.user.is_admin and user.id != request.user.id:
            return Response(
                {"detail": "You can only edit your own user data."},
                status=status.HTTP_403_FORBIDDEN,
            )
        serializer = self.get_serializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None, *args, **kwargs):
        user = self.get_object()
        if not request.user.is_admin and user.id != request.user.id:
            return Response(
                {"detail": "You can only delete your own user."},
                status=status.HTTP_403_FORBIDDEN,
            )
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
