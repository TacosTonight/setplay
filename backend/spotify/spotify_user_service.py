from spotify.utils import handle_requests


class SpotifyUserService:
    def __init__(self, spotify_user_auth):
        # assume i'll get a valid access token while coding this
        # self.spotify_user_auth.get_access_token()
        self.spotify_user_auth = spotify_user_auth
        self.access_token = self.spotify_user_auth.get_access_token()

    def get_user_id(self):
        method = "GET"
        url = "https://api.spotify.com/v1/me"
        headers = {"Authorization": "Bearer {}".format(self.access_token)}
        response = handle_requests(method=method, url=url, headers=headers)
        return response.get("id")

    def create_playlist_and_get_id(self, playlist_name, user_id):
        method = "POST"
        url = "https://api.spotify.com/v1/users/{}/playlists".format(user_id)
        headers = {"Authorization": "Bearer {}".format(self.access_token)}
        data = {
            "name": playlist_name,
            "public": False,
            "description": "Created with Setplay",
        }
        response = handle_requests(method=method, url=url, headers=headers, data=data)
        return response.get("id")

    def add_songs_to_playlist(self, playlist_id, uris):
        method = "POST"
        url = "https://api.spotify.com/v1/playlists/{}/tracks".format(playlist_id)
        headers = {"Authorization": "Bearer {}".format(self.access_token)}
        data = {"uris": uris}
        handle_requests(method=method, url=url, headers=headers, data=data)

    def add_playlist_art(self, playlist_id, playlist_art):
        method = "PUT"
        url = "https://api.spotify.com/v1/playlists/{}/images".format(playlist_id)
        headers = {"Authorization": "Bearer {}".format(self.access_token)}
        data = playlist_art
        handle_requests(method=method, url=url, headers=headers, data=data)
