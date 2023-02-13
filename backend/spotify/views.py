import requests
from requests import Request, post
from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
from .utils import request_new_tokens, is_authenticated

REDIRECT_URI = ''
CLIENT_ID = ''
CLIENT_SECRET = ''
SCOPES = ''

class AuthURL(APIView):
    def get(self, request):
        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'client_id': CLIENT_ID,
            'response_type':'code',
            'redirect_uri': REDIRECT_URI,
            'scopes': SCOPES
        }).prepare().url
        return Response({'url':url}, status=status.HTTP_200_OK)

class IsAuthenticated(APIView):
    def get(self, request):
        is_authed = is_authenticated(self.request.session.session_key)
        return Response({'status':is_authed}, status=status.HTTP_200_OK)

def spotify_callback(request):
    code = request.GET.get('code')
    error = request.GET.get('error')
    if not request.session.exists(request.session.session_key):
        request.session.create()
    request_new_tokens(request.session.session_key, code)
    return redirect('auth-confirmation')

def auth_confirmation(request):
    return HttpResponse("You have been authenticated!")

def authenticate(request):
    if request.method == 'POST':
        r = requests.get('http://127.0.0.1:8000/spotify/get-auth-url')
        auth_url = r.json().get('url')
        return redirect(auth_url)
    return render (request, 'spotify/auth.html')