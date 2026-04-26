from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'dachas', views.DachaViewSet)
router.register(r'bookings', views.BookingViewSet)

urlpatterns = [
    path('', views.home, name='home'),
    path('book/', views.book_dacha, name='book_dacha'),
    path('auth/register', views.register, name='register'),
    path('auth/login', views.login, name='login'),
    path('auth/me', views.me, name='me'),
    path('upload/', views.upload, name='upload'),
    path('api/', include(router.urls)),
]
