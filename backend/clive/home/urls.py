from django.urls import path
from .views import MomentsApi,serveron





urlpatterns = [
    path('moments/',MomentsApi.as_view()),
    path('serveron/',serveron.as_view())
]
