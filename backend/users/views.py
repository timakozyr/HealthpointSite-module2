from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.views import APIView

from .serializers import UserSerializer, UserLoginSerializer
from .models import User


class LoginAPIView(APIView):
    serializer_class = UserLoginSerializer

    def post(self, request):
        user = get_object_or_404(User, email=request.data['email'])
        if not user.check_password(request.data['password']):
            return Response({"detail": "Not found."},
                            status=status.HTTP_404_NOT_FOUND)
        token, created = Token.objects.get_or_create(user=user)
        serializer = UserSerializer(instance=user)
        return Response({"token": token.key})


class SignupAPIView(APIView):
    serializer_class = UserSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(email=request.data['email'])
            user.set_password(request.data['password'])
            user.save()
            token = Token.objects.create(user=user)
            if User.objects.filter(email=request.data['email']).exists():
                return Response({"token": token.key},
                                status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
