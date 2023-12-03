from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import Doctor, User


class UserAdmin(BaseUserAdmin):
    list_display = (
        "email",
        "first_name",
        "last_name",
        "date_joined",
        "last_login",
        "profile_pic",
        "city",
        "is_admin",
        "is_staff",
    )
    search_fields = ["email"]
    readonly_fields = (
        "id",
        "date_joined",
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
