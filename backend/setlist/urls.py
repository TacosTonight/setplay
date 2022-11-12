from django.urls import path

from .views import *

urlpatterns = [
    path('', SetlistView.as_view(), name='setlist'),
]