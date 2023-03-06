import requests
from datetime import timedelta
from django.utils import timezone
from .models import SpotifyToken

class SpotifyAuthentication:
    def __init__(self, redirect_uri, client_id, client_secret, scopes, token_url, authorize_url):
        self.redirect_uri = redirect_uri
        self.client_id = client_id
        self.client_secret = client_secret
        self.scopes = scopes
        self.token_url = token_url
        self.authorize_url = authorize_url

    def create_auth_url(self):
        params = {
            'client_id': self.client_id,
            'response_type':'code',
            'redirect_uri': self.redirect_uri,
            'scopes': self.scopes
        }
        return requests.Request('GET', self.authorize_url, params=params).prepare().url

    def is_authenticated(self, session_id):
        user_tokens = SpotifyToken.objects.filter(user=session_id)
        if not user_tokens.exists():
            return False

        if user_tokens[0].expires_in <= timezone.now():
            self.refresh_tokens(session_id)
        return True

    def request_new_tokens(self, session_id, code):
        data = {
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': self.redirect_uri,
            'client_id': self.client_id,
            'client_secret': self.client_secret
        }
        response = self.get_spotify_token_response(self.token_url, data=data)
        SpotifyToken.objects.update_or_create(user=session_id, defaults=self.parse_spotify_auth(response, 'authorization_code'))
    
    def refresh_tokens(self, session_id):
        refresh_token = SpotifyToken.objects.filter(user=session_id)[0].refresh_token
        data = {
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token,
            'client_id': self.client_id,
            'client_secret': self.client_secret
        }
        response = self.get_spotify_token_response(self.token_url, data=data)
        SpotifyToken.objects.update_or_create(user=session_id, defaults=self.parse_spotify_auth(response, 'refresh_token'))

    def parse_spotify_auth(self, response, grant_type):
        access_token = response.get('access_token')
        token_type = response.get('token_type')
        refresh_token = response.get('refresh_token')
        expires_in = response.get('expires_in')

        if grant_type == 'authorization_code':
            return {
            'access_token':access_token,
            'token_type':token_type,
            'expires_in': self.calculate_token_expiration_time(expires_in),
            'refresh_token': refresh_token,
        }

        if grant_type == 'refresh_token':
            return {
            'access_token':access_token,
            'token_type':token_type,
            'expires_in': self.calculate_token_expiration_time(expires_in),
        }

    def calculate_token_expiration_time(self, expires_in):
        return timezone.now() + timedelta(seconds=expires_in)

    def get_spotify_token_response(self, url, params=None, data = None):
        r = requests.post(url, params=params, data= data)
        if r.status_code != requests.codes.ok:
            return None
        return r.json()