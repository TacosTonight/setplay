from requests import Request, post
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class AuthURL(APIView):
    def get(self, request):
        scopes = ''
        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'client_id':'9d938743bfbe4d4ab59050f1ec3b2494',
            'response_type':'code',
            'redirect_uri':'http://127.0.0.1:8000/spotify/',
            'scopes': 'scopes'
        }).prepare().url
        return Response({'url':url}, status=status.HTTP_200_OK)

def spotify_callback(request):
    code = request.GET.get('code')
    error = request.GET.get('error')

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': 'adf',
        'client_id': 'asdf',
        'client_secret': 'adsf'
    }).json()