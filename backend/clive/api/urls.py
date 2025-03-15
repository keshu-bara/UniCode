
from django.urls import path,include
from user.views import RegisterApi,LoginApi





urlpatterns = [
    path('register/',RegisterApi.as_view()),
    path('login/',LoginApi.as_view()),
    path('home/',include('home.urls')),

]
