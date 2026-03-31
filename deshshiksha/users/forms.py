from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import UserProfile


class RegisterForm(UserCreationForm):
    class Meta:
        model  = User
        fields = ['username', 'password1', 'password2']


class ProfileSetupForm(forms.ModelForm):
    class Meta:
        model  = UserProfile
        fields = ['full_name', 'dob', 'age', 'disability']
        widgets = {
            'full_name':  forms.TextInput(attrs={'placeholder': 'Enter your full name'}),
            'dob':        forms.DateInput(attrs={'type': 'date'}),
            'age':        forms.NumberInput(attrs={'placeholder': 'Auto-calculated', 'readonly': 'readonly'}),
            'disability': forms.Select(),
        }
