from django.utils import timezone
from spotify.utils import handle_requests, calculate_token_expiration_time


class SpotifyClientAuthentication:
    def __init__(self, client_id, client_secret):
        self.client_id = client_id
        self.client_secret = client_secret
        self.access_token, self.expires_in = self.request_new_tokens().values()

    def request_new_tokens(self):
        url = "https://accounts.spotify.com/api/token"
        method = "POST"
        data = {
            "grant_type": "client_credentials",
            "client_id": self.client_id,
            "client_secret": self.client_secret,
        }
        response = handle_requests(url, method, data=data)
        return self.parse_spotify_auth(response)

    def parse_spotify_auth(self, response):
        try:
            access_token = response.get("access_token")
            expires_in = response.get("expires_in")

            return {
                "access_token": access_token,
                "expires_in": calculate_token_expiration_time(expires_in),
            }
        except AttributeError as err:
            print(err)

    def is_authenticated(self):
        return self.expires_in <= timezone.now()

    def refresh_tokens(self):
        self.access_token, self.expires_in = self.request_new_tokens().values()
