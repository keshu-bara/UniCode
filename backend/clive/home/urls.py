from django.urls import path
from .views import MomentsApi, serveron, ProfilesApi, ProfileView 

urlpatterns = [
    path('moments/', MomentsApi.as_view()),
    path('serveron/', serveron.as_view()),
    path('profiles/', ProfilesApi.as_view()),
    path('profile/', ProfileView.as_view(), name='profile'),
    
]
