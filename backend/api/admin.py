# api/admin.py (Your original code, no changes needed for styling)
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from .models import CustomUser, Address, UserSettings,Payment


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('id', 'username', 'email', 'contact', 'is_staff', 'created_at', 'updated_at')
    list_filter = ('is_staff', 'is_superuser', 'is_active')

    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        (_('Personal info'), {'fields': ('contact',)}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'created_at', 'updated_at')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'contact', 'password1', 'password2'),
        }),
    )

    search_fields = ('username', 'email', 'contact')
    ordering = ('id',)


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ['username', 'type', 'email','whatsapp','houseNo','state', 'city', 'village', 'pinCode', 'default']
    list_filter = ('type', 'default')
    search_fields = ['username', 'email', 'city', 'village' ,'pinCode']


admin.site.register(UserSettings)

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['user', 'razorpay_order_id', 'is_paid', 'amount', 'created_at']