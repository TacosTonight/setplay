from django.urls import path

from .views import *

urlpatterns = [
    path("get-auth-url", AuthURL.as_view(), name="spotify-auth"),
    path("auth-confirmation", auth_confirmation, name="auth-confirmation"),
    path("auth", authenticate, name="auth"),
    path("callback", spotify_callback, name="callback"),
    path("is-authed", IsAuthenticated.as_view(), name="is-authed"),
    path("artists", Artists.as_view(), name="spotify-artists"),
    path("setlist", Setlist.as_view(), name="spotify-setlist"),
]
