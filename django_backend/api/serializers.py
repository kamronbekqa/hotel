from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Dacha, Booking

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data.get('username') or validated_data['email'].split('@')[0],
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data.get('role', 'user')
        )
        return user

class DachaSerializer(serializers.ModelSerializer):
    # To handle Mongoose `_id` and image paths correctly
    _id = serializers.CharField(source='id', read_only=True)
    
    class Meta:
        model = Dacha
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    _id = serializers.CharField(source='id', read_only=True)
    dachaId = serializers.PrimaryKeyRelatedField(source='dacha', queryset=Dacha.objects.all(), required=False)
    
    class Meta:
        model = Booking
        fields = '__all__'
        extra_kwargs = {
            'dacha': {'required': False} # handled via dachaId or passed directly
        }

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        # Include nested dacha info if needed
        if instance.dacha:
            rep['dachaId'] = DachaSerializer(instance.dacha).data
        return rep
