from django.urls import path

from .views import *

urlpatterns = [
    path("get-auth-url", AuthURL.as_view(), name="spotify-auth"),
    path("callback", SpotifyCallback.as_view(), name="callback"),
    path("is-authed", IsAuthenticated.as_view(), name="is-authed"),
    path("artists", Artists.as_view(), name="spotify-artists"),
    path("setlist", Setlist.as_view(), name="spotify-setlist"),
    path("create-playlist", SpotifyPlaylist.as_view(), name="spotify-create-playlist"),
]
