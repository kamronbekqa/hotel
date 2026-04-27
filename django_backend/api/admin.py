from django.contrib import admin
from .models import User, Dacha, Booking

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'role', 'is_staff')
    list_filter = ('role', 'is_staff')

@admin.register(Dacha)
class DachaAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'type', 'status', 'created_at')
    list_filter = ('type', 'status')
    search_fields = ('title', 'location')

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('name', 'dacha', 'check_in', 'check_out', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('name', 'phone')
    readonly_fields = ('created_at', 'updated_at')
