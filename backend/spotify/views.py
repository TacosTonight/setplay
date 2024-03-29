import requests
import os
from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
from .spotify_user_authentication import SpotifyUserAuthentication
from .spotify_client_authentication import SpotifyClientAuthentication
from .spotify_client_service import SpotifyClientService
from setlist.setlist_client import SetlistClient
from .spotify_user_service import SpotifyUserService
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

REDIRECT_URI = os.environ.get("REDIRECT_URI")
CLIENT_ID = os.environ.get("CLIENT_ID")
CLIENT_SECRET = os.environ.get("CLIENT_SECRET")
SCOPES = os.environ.get("SCOPES")
TOKEN_URL = os.environ.get("TOKEN_URL")
AUTHORIZE_URL = os.environ.get("AUTHORIZE_URL")

spotify_auth = SpotifyUserAuthentication(
    REDIRECT_URI, CLIENT_ID, CLIENT_SECRET, SCOPES, TOKEN_URL, AUTHORIZE_URL
)
spotify_user_service = SpotifyUserService()

spotify_client_auth = SpotifyClientAuthentication(CLIENT_ID, CLIENT_SECRET)
setlist_client = SetlistClient()
spotify_client_service = SpotifyClientService(spotify_client_auth, setlist_client)


class AuthURL(APIView):
    def get(self, request):
        return Response(
            {"url": spotify_auth.create_auth_url()}, status=status.HTTP_200_OK
        )


class IsAuthenticated(APIView):
    def get(self, request):
        is_authed = spotify_auth.is_authenticated(request.session.session_key)
        return Response({"authStatus": is_authed}, status=status.HTTP_200_OK)


class SpotifyCallback(APIView):
    def get(self, request):
        code = request.GET.get("code")
        error = request.GET.get("error")
        if error:
            return redirect(os.environ.get("APP_URL"))
        if not request.session.exists(request.session.session_key):
            request.session.create()
        spotify_auth.request_new_tokens(request.session.session_key, code)
        return redirect(os.environ.get("APP_URL"))


# Spotify Client Authorized Tasks
class Artists(APIView):
    def get(self, request):
        artist_input = request.GET.get("artist", "")
        artists = spotify_client_service.get_artists(artist_input)
        if artists is None or not artists:
            return Response(
                {"error": "Unable to get artists"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response({"artists": artists}, status=status.HTTP_200_OK)


class Setlist(APIView):
    def get(self, request):
        artist_input = request.GET.get("artist", "")
        set_list = spotify_client_service.generate_setlist_response(artist_input)
        if not set_list:
            return Response(
                {"error": "Unable to get setlist"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response({"songs": set_list}, status=status.HTTP_200_OK)


# Spotify User Authorized Tasks
class SpotifyPlaylist(APIView):
    def post(self, request):
        uris = request.data.get("uris", [])
        playlist_name = request.data.get("playlistName")
        playlist_art = request.data.get("playlistArt")
        playlist_art = playlist_art.replace("data:image/jpeg;base64,", "").strip()
        access_token = spotify_auth.get_access_token(request.session.session_key)
        try:
            spotify_user_service.create_playlist(
                access_token, uris, playlist_name, playlist_art
            )
            return Response(
                {"message": "Playlist created successfully"},
                status=status.HTTP_201_CREATED,
            )
        except AttributeError:
            return Response(
                {"message": "Unable to create playlist"},
                status=status.HTTP_400_BAD_REQUEST,
            )
