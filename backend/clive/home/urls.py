from django.urls import path
from .views import MomentsApi





urlpatterns = [
    path('moments/',MomentsApi.as_view())
]
