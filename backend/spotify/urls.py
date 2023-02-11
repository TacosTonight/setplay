from django.urls import path

from .views import *

urlpatterns = [
    path('get-auth-url', AuthURL.as_view(), name='spotify-auth')
]