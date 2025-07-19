# api/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import UserSettings, Address
from .models import CustomUser  # Assuming contact field is in CustomUser
from .models import Order, OrderItem




User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email','contact',  'password', 'password2']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords don't match")
        return data
        
    def validate_contact(self, value):
        if CustomUser.objects.filter(contact=value).exists():
            raise serializers.ValidationError("This contact number is already registered.")
        return value

    def create(self, validated_data):
        validated_data.pop('password2')
        return User.objects.create_user(**validated_data)

class CustomTokenObtainPairSerializer(serializers.Serializer):
    # Your existing token serializer
    pass

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'contact']
        
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', "contact"]
        extra_kwargs = {
            'email': {'required': False},
            'username': {'read_only': True}
        }

    def update(self, instance, validated_data):
        # Update User fields
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)
        instance.save()

        # Update Profile fields if provided
        profile_data = self.initial_data.get('profile')
        if profile_data:
            profile = instance.profile
            profile.contact = profile_data.get('contact', profile.contact)
            profile.save()

        return instance

class UserSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSettings
        fields = ['dark_mode', 'language', 'notifications_enabled']

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = [
            'id', 'type', 'username', 'email', 'whatsapp', 
            'houseNo', 'state','city', 'village', 'pinCode', 'default'
        ]

    def validate(self, data):
        user = self.context['request'].user
        instance = getattr(self, 'instance', None)

        # Prevent removing last default address
        if instance and instance.default:
            is_being_unset = data.get('default') is False
            other_defaults_exist = Address.objects.filter(user=user, default=True).exclude(pk=instance.pk).exists()

            if is_being_unset and not other_defaults_exist:
                raise serializers.ValidationError("You must have at least one default address.")

        return data


from rest_framework import serializers
from .models import Order, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    shop = serializers.SerializerMethodField()
    
    class Meta:
        model = Order
        fields = [
            'id', 'shop', 'created_at', 'status', 
            'total_amount', 'items', 'rating'
        ]
    
    def get_shop(self, obj):
        return {
            'name': obj.shop.name,
            'id': obj.shop.id
        }