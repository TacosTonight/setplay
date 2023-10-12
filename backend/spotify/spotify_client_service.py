from spotify.utils import handle_requests


class SpotifyClientService:
    def __init__(self, spotify_client_auth, setlist_client):
        self.spotify_client_auth = spotify_client_auth
        self.setlist_client = setlist_client

    def get_artists(self, search_input):
        access_token = self.spotify_client_auth.access_token
        self.authenticate()
        method = "GET"
        url = "https://api.spotify.com/v1/search"
        headers = {"Authorization": "Bearer {}".format(access_token)}
        params = {"q": "artist:{}".format(search_input), "type": "artist", "limit": 5}
        return handle_requests(method=method, url=url, headers=headers, params=params)

    def generate_setlist_response(self, artist):
        pass

    def get_setlist_from_setplay(self, artist):
        pass

    def get_song_data_from_spotify(self, song):
        pass

    def authenticate(self):
        if not self.spotify_client_auth.is_authenticated():
            self.spotify_client_auth.refresh_tokens()
