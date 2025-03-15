from django.urls import path
from .views import MomentsApi,serveron,ProfilesApi





urlpatterns = [
    path('moments/',MomentsApi.as_view()),
    path('serveron/',serveron.as_view()),
    path('profiles/',ProfilesApi.as_view())
]
