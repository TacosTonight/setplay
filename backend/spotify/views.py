import requests
from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
from .spotify_authentication import SpotifyAuthentication

spotify_auth = SpotifyAuthentication()

class AuthURL(APIView):
    def get(self, request):
        return Response({'url':spotify_auth.create_auth_url()}, status=status.HTTP_200_OK)

class IsAuthenticated(APIView):
    def get(self, request):
        is_authed = spotify_auth.is_authenticated(self.request.session.session_key)
        return Response({'status':is_authed}, status=status.HTTP_200_OK)

def spotify_callback(request):
    code = request.GET.get('code')
    error = request.GET.get('error')
    if error:
        return HttpResponse("Authentication denied")
    if not request.session.exists(request.session.session_key):
        request.session.create()
    spotify_auth.request_new_tokens(request.session.session_key, code)
    return redirect('auth-confirmation')

def auth_confirmation(request):
    return HttpResponse("temporary redirect page")

def authenticate(request):
    if request.method == 'POST':
        r = requests.get('http://127.0.0.1:8000/spotify/get-auth-url')
        auth_url = r.json().get('url')
        return redirect(auth_url)
    return render (request, 'spotify/auth.html')