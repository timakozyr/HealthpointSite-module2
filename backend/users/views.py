from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from roles.models import Role

from .models import User
from .serializers import UserLoginSerializer, UserSerializer


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
            "email": user.email.encode("utf-8"),
            "first_name": user.first_name.encode("utf-8"),
            "last_name": user.last_name.encode("utf-8"),
            "patronymic_name": user.patronymic_name.encode("utf-8"),
            "city": user.city.encode("utf-8"),
            "role": user.role.name.encode("utf-8"),
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
