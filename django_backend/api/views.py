from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate, get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Dacha, Booking
from .serializers import UserSerializer, DachaSerializer, BookingSerializer
from .telegram import send_telegram_message, format_booking_message

User = get_user_model()

def home(request):
    dachas = Dacha.objects.filter(status='available')
    return render(request, 'index.html', {'dachas': dachas})

def book_dacha(request):
    if request.method == 'POST':
        try:
            dacha_id = request.POST.get('dacha')
            name = request.POST.get('name')
            phone = request.POST.get('phone')
            check_in = request.POST.get('check_in')
            check_out = request.POST.get('check_out')
            guests = request.POST.get('guests') or 1
            
            # Convert guests to int
            try:
                guests = int(guests)
            except (ValueError, TypeError):
                guests = 1
            
            dacha = get_object_or_404(Dacha, id=dacha_id)
            
            booking = Booking.objects.create(
                dacha=dacha,
                name=name,
                phone=phone,
                check_in=check_in,
                check_out=check_out,
                guests=guests
            )
            
            # Send Telegram notification
            try:
                msg = format_booking_message(booking)
                send_telegram_message(msg)
            except Exception as te:
                print(f"Telegram error: {te}")
                
            messages.success(request, "Bron muvaffaqiyatli qabul qilindi! Tez orada bog'lanamiz.")
        except Exception as e:
            print(f"Booking error: {e}")
            messages.error(request, f"Xatolik yuz berdi: {e}")
            
        return redirect('home')
    return redirect('home')

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'status': 'success',
            'token': str(refresh.access_token),
            'user': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    # Authenticate by email
    try:
        user = User.objects.get(email=email)
        if user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response({
                'status': 'success',
                'token': str(refresh.access_token),
                'user': UserSerializer(user).data
            })
    except User.DoesNotExist:
        pass

    return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    return Response({
        'status': 'success',
        'data': {
            'user': UserSerializer(request.user).data
        }
    })

class DachaViewSet(viewsets.ModelViewSet):
    queryset = Dacha.objects.all()
    serializer_class = DachaSerializer
    permission_classes = [AllowAny] # Set to IsAuthenticatedOrReadOnly in production if needed

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return Response({
            'status': 'success',
            'results': len(response.data),
            'data': {'dachas': response.data}
        })

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        return Response({
            'status': 'success',
            'data': {'dacha': response.data}
        })

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AllowAny] # Or limit to IsAuthenticated for creating

    def list(self, request, *args, **kwargs):
        # Filter by user if requested or just return all
        response = super().list(request, *args, **kwargs)
        return Response({
            'status': 'success',
            'results': len(response.data),
            'data': {'bookings': response.data}
        })

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        
        # dachaId is usually sent from frontend
        if 'dachaId' in data:
            data['dacha'] = data.pop('dachaId')

        # Format dates if they come differently (DRF usually handles ISO formats well)
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        booking = serializer.save()

        # Send Telegram notification
        try:
            msg = format_booking_message(booking)
            send_telegram_message(msg)
        except Exception as e:
            print(f"Telegram error: {e}")

        return Response({
            'status': 'success',
            'data': {'booking': serializer.data}
        }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def upload(request):
    if 'image' not in request.FILES:
        return Response({'message': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    upload = request.FILES['image']
    # Minimal implementation for saving file
    from django.core.files.storage import default_storage
    file_name = default_storage.save('dachas/' + upload.name, upload)
    file_url = default_storage.url(file_name)
    
    return Response({
        'status': 'success',
        'data': {
            'imageUrl': file_url
        }
    })
