from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('setlistfm/', views.SetlistAPI.as_view(), name='setlistfm')
]