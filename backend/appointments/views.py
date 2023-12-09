from rest_framework import permissions, status, viewsets
from rest_framework.response import Response

from doctors.models import Doctor
from .models import Appointment
from .serializers import AppointmentSerializer


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_admin


class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user or request.user.is_admin


class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_admin:
            return Appointment.objects.all()
        if Doctor.objects.filter(user_id=self.request.user.id).exists():
            return Appointment.objects.filter(
                doctor__user_id=self.request.user.id)

        return Appointment.objects.filter(patient=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            appointment_patient = serializer.validated_data.get("patient").id

            if not request.user.is_admin and appointment_patient != request.user.id:
                return Response(
                    {
                        "detail": "You can only create appointments for yourself."},
                    status=status.HTTP_403_FORBIDDEN,
                )

            if appointment_patient == serializer.validated_data.get(
                    "doctor").user.id:
                return Response(
                    {"detail": "You can not make appointment to yourself"},
                    status=status.HTTP_403_FORBIDDEN,
                )

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None, *args, **kwargs):
        appointment = self.get_object()
        if not request.user.is_admin and appointment.patient.id != request.user.id:
            return Response(
                {"detail": "You can only edit your own appointments."},
                status=status.HTTP_403_FORBIDDEN,
            )
        serializer = self.serializer_class(appointment, data=request.data,
                                           partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None, *args, **kwargs):
        appointment = self.get_object()
        if not request.user.is_admin and appointment.patient.id != request.user.id:
            return Response(
                {"detail": "You can only delete your own appointments."},
                status=status.HTTP_403_FORBIDDEN,
            )
        appointment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
