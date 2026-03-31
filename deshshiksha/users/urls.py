from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('profile-setup/', views.profile_setup, name='profile_setup'),
    path('select-disability/', views.select_disability, name='select_disability'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('dashboard/deaf/', views.dashboard_deaf, name='dashboard_deaf'),
    path('dashboard/blind/', views.dashboard_blind, name='dashboard_blind'),
    path('dashboard/cognitive/', views.dashboard_cognitive, name='dashboard_cognitive'),
    path('dashboard/dumb/', views.dashboard_dumb, name='dashboard_dumb'),
]
