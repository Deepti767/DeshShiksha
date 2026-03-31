from django.urls import path
from . import views

urlpatterns = [
    # Overview pages
    path('deaf/alphabets/', views.deaf_alphabets, name='deaf_alphabets'),
    path('deaf/numbers/', views.deaf_numbers, name='deaf_numbers'),
    path('deaf/quiz/', views.deaf_quiz, name='deaf_quiz'),
    path('deaf/practice/', views.deaf_practice, name='deaf_practice'),
    path('deaf/practice/award/', views.deaf_practice_award, name='deaf_practice_award'),
    # Dumb (speech-impaired)
    path('dumb/alphabets/', views.dumb_alphabets, name='dumb_alphabets'),
    path('dumb/numbers/', views.dumb_numbers, name='dumb_numbers'),
    path('dumb/practice/', views.dumb_practice, name='dumb_practice'),
    path('dumb/<str:module>/lesson/<int:index>/', views.dumb_lesson, name='dumb_lesson'),
    path('blind/alphabets/', views.blind_alphabets, name='blind_alphabets'),
    path('blind/numbers/', views.blind_numbers, name='blind_numbers'),
    path('blind/quiz/', views.blind_quiz, name='blind_quiz'),
    path('cognitive/alphabets/', views.cognitive_alphabets, name='cognitive_alphabets'),
    path('cognitive/numbers/', views.cognitive_numbers, name='cognitive_numbers'),
    path('cognitive/quiz/', views.cognitive_quiz, name='cognitive_quiz'),

    # Individual lesson pages
    path('<str:disability>/<str:module>/lesson/<int:index>/', views.lesson, name='lesson'),
]
