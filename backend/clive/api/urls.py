from django.urls import path, include
from user.views import RegisterApi, LoginApi
from .chat import chat_completion

urlpatterns = [
    path('register/', RegisterApi.as_view()),
    path('login/', LoginApi.as_view()),
    path('home/', include('home.urls')),
    path('profile/', include('home.profile_urls')),
    path('chat/', chat_completion, name='chat_completion'),
    
]
