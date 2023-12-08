from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from doctors.models import Doctor

from .models import User


class UserAdmin(BaseUserAdmin):
    list_display = (
        "email",
        "first_name",
        "last_name",
        "last_login",
        "profile_pic",
        "city",
        "is_admin",
        "is_staff",
    )
    search_fields = ["email"]
    readonly_fields = (
        "id",
        "last_login",
        "profile_pic",
        "city",
    )

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()
    ordering = ["id"]


admin.site.register(User, UserAdmin)
admin.site.register(Doctor)
