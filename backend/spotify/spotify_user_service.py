from spotify.utils import handle_requests


class SpotifyUserService:
    def create_playlist(self, access_token, uris, playlist_name, playlist_art):
        user_id = self.get_user_id(access_token)
        playlist_id = self.create_playlist_and_get_id(
            access_token, playlist_name, user_id
        )
        self.add_songs_to_playlist(access_token, playlist_id, uris)
        self.add_playlist_art(access_token, playlist_id, playlist_art)

    def get_user_id(self, access_token):
        method = "GET"
        url = "https://api.spotify.com/v1/me"
        headers = {"Authorization": "Bearer {}".format(access_token)}
        response = handle_requests(method=method, url=url, headers=headers)
        try:
            return response.get("id")
        except AttributeError as err:
            print(err)

    def create_playlist_and_get_id(self, access_token, playlist_name, user_id):
        method = "POST"
        url = "https://api.spotify.com/v1/users/{}/playlists".format(user_id)
        headers = {"Authorization": "Bearer {}".format(access_token)}
        body = {
            "name": playlist_name,
            "public": False,
            "description": "Created with Setplay",
        }
        response = handle_requests(method=method, url=url, headers=headers, json=body)
        try:
            return response.get("id")
        except AttributeError as err:
            print(err)

    def add_songs_to_playlist(self, access_token, playlist_id, uris):
        method = "POST"
        url = "https://api.spotify.com/v1/playlists/{}/tracks".format(playlist_id)
        headers = {"Authorization": "Bearer {}".format(access_token)}
        body = {"uris": uris}
        handle_requests(method=method, url=url, headers=headers, json=body)

    def add_playlist_art(self, access_token, playlist_id, playlist_art):
        method = "PUT"
        url = "https://api.spotify.com/v1/playlists/{}/images".format(playlist_id)
        headers = {"Authorization": "Bearer {}".format(access_token)}
        data = playlist_art
        handle_requests(method=method, url=url, headers=headers, data=data)
