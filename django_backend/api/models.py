from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator

class User(AbstractUser):
    ROLE_CHOICES = (
        ('user', 'User'),
        ('admin', 'Admin'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
    email = models.EmailField(unique=True)

class Dacha(models.Model):
    TYPE_CHOICES = (
        ('sale', 'Sale'),
        ('rent', 'Rent'),
    )
    STATUS_CHOICES = (
        ('available', 'Available'),
        ('booked', 'Booked'),
    )

    title = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    image = models.ImageField(upload_to='dachas/', default='default-dacha.jpg', null=True, blank=True)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='available')
    features = models.JSONField(default=list, blank=True)
    location = models.CharField(max_length=255, blank=True)
    bedrooms = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    bathrooms = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    area = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Booking(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='bookings')
    dacha = models.ForeignKey(Dacha, on_delete=models.CASCADE, related_name='bookings')
    name = models.CharField(max_length=100)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20)
    check_in = models.DateField()
    check_out = models.DateField()
    guests = models.IntegerField(validators=[MinValueValidator(1)])
    message = models.TextField(blank=True)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='pending')
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0, validators=[MinValueValidator(0)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.dacha.title}"

    @property
    def duration(self):
        if self.check_in and self.check_out:
            return (self.check_out - self.check_in).days
        return 0
