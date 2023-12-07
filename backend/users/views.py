from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from rest_framework import status, permissions, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from roles.models import Role

from .models import User, Doctor
from .serializers import UserLoginSerializer, UserSerializer, DoctorSerializer


class LoginAPIView(APIView):
    serializer_class = UserLoginSerializer

    def post(self, request):
        user = get_object_or_404(User, email=request.data["email"])
        if not user.check_password(request.data["password"]):
            return Response({"detail": "Not found."},
                            status=status.HTTP_404_NOT_FOUND)
        token, created = Token.objects.get_or_create(user=user)
        serializer = UserSerializer(instance=user)
        user_data = {
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "patronymic_name": user.patronymic_name,
            "city": user.city,
            "role": user.role.name,
            # "profile_pic": user.profile_pic
        }

        return Response(
            {"token": token.key, "user": user_data}, status=status.HTTP_200_OK
        )


class SignupAPIView(APIView):
    serializer_class = UserSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            role_user, created = Role.objects.get_or_create(name="user")
            user = serializer.save(role=role_user)

            user.set_password(request.data["password"])

            user.save()

            token = Token.objects.create(user=user)
            if User.objects.filter(email=request.data["email"]).exists():
                return Response(
                    {
                        "token": token.key,
                        "user": {
                            "id": user.id,
                            "email": user.email,
                            "first_name": user.first_name,
                            "last_name": user.last_name,
                            "patronymic_name": user.patronymic_name,
                            "city": user.city,
                            "role": user.role.name,
                        },
                    },
                    status=status.HTTP_200_OK,
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        if self.request.user.is_admin:
            return User.objects.all()
        return User.objects.filter(id=self.request.user.id)

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            if not request.user.is_admin and request.user.id != serializer.validated_data.get(
                    "id"):
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
        serializer = self.serializer_class(user, data=request.data,
                                           partial=True)
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


# class DoctorViewSet(viewsets.ModelViewSet):
#     queryset = Doctor.objects.all()
#     serializer_class = DoctorSerializer
#     permission_classes = [permissions.IsAdminUser]
#
#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         role = Role.objects.get(id=3)
#
#         user_data = serializer.validated_data.pop('user')
#         specialization = serializer.validated_data.pop('specialization')
#
#         # Check if the user already exists
#         user = User.objects.filter(email=user_data.get('email')).first()
#
#         if not user:
#             user_serializer = UserSerializer(data=user_data)
#             if user_serializer.is_valid():
#                 user = user_serializer.save(role=role)
#                 print("User created")
#             else:
#                 return Response(user_serializer.errors,
#                                 status=status.HTTP_400_BAD_REQUEST)
#
#         user_instance = user if 'user_serializer' in locals() else user_serializer.instance
#         print("User checked")
#         # Create the Doctor associated with the existing or newly created user
#         doctor = Doctor.objects.create(
#             specialization=specialization,
#             user_ptr=user_instance,
#             **serializer.validated_data
#         )
#
#         print("Doctor created")
#
#         return Response(self.get_serializer(doctor).data,
#                         status=status.HTTP_201_CREATED)


class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [permissions.IsAdminUser]

    def perform_create(self, serializer):
        serializer.save()

    def perform_update(self, serializer):
        serializer.save()

    def perform_destroy(self, instance):
        instance.delete()
