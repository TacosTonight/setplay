from datetime import timedelta
from django.utils import timezone
from .models import SpotifyToken
from requests import post

REDIRECT_URI = ''
CLIENT_ID = ''
CLIENT_SECRET = ''
SCOPES = ''

def is_authenticated(session_id):
    user_tokens = SpotifyToken.objects.filter(user=session_id)
    if not user_tokens.exists():
        return False
    if user_tokens[0].expires_in <= timezone.now():
        refresh_tokens(session_id)
    return True

def request_new_tokens(session_id, code):
    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()
    SpotifyToken.objects.update_or_create(user=session_id, defaults=parse_spotify_auth(response))
  
def refresh_tokens(session_id):
    refresh_token = SpotifyToken.objects.filter(user=session_id)[0].refresh_token
    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()
    SpotifyToken.objects.update_or_create(user=session_id, defaults=parse_spotify_auth(response))

def parse_spotify_auth(response):
    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')
    updated_values = {
        'access_token':access_token,
        'token_type':token_type,
        'expires_in': calculate_token_expiration_time(expires_in),
        'refresh_token': refresh_token
    }
    if not refresh_token:
        updated_values.pop('refresh_token', None)
    return updated_values

def calculate_token_expiration_time(expires_in):
    return timezone.now() + timedelta(seconds=expires_in)