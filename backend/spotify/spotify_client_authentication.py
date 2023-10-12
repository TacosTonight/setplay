from django.utils import timezone
from spotify.utils import get_spotify_token_response, calculate_token_expiration_time


class SpotifyClientAuthentication:
    def __init__(self, client_id, client_secret):
        self.client_id = client_id
        self.client_secret = client_secret
        self.access_token, self.expires_in = self.request_new_tokens().values()

    def request_new_tokens(self):
        data = {
            "grant_type": "client_credentials",
            "client_id": self.client_id,
            "client_secret": self.client_secret,
        }

        response = get_spotify_token_response(
            "https://accounts.spotify.com/api/token", data=data
        )
        return self.parse_spotify_auth(response)

    def parse_spotify_auth(self, response):
        access_token = response.get("access_token")
        expires_in = response.get("expires_in")

        return {
            "access_token": access_token,
            "expires_in": calculate_token_expiration_time(expires_in),
        }

    def is_authenticated(self):
        return self.expires_in <= timezone.now()

    def refresh_tokens(self):
        self.access_token, self.expires_in = self.request_new_tokens()
