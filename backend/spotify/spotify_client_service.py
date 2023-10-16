from spotify.utils import handle_requests


class SpotifyClientService:
    SPOTIFY_SEARCH_URL = "https://api.spotify.com/v1/search"

    def __init__(self, spotify_client_auth, setlist_client):
        self.spotify_client_auth = spotify_client_auth
        self.setlist_client = setlist_client

    def get_artists(self, search_input):
        self.authenticate()
        access_token = self.spotify_client_auth.access_token
        method = "GET"
        url = self.SPOTIFY_SEARCH_URL
        headers = {"Authorization": "Bearer {}".format(access_token)}
        params = {"q": "artist:{}".format(search_input), "type": "artist", "limit": 5}
        return self.parse_spotify_artist_response(
            handle_requests(method=method, url=url, headers=headers, params=params)
        )

    def generate_setlist_response(self, artist):
        setlist_fm = self.get_setlist_from_setlistfm(artist)
        try:
            setlist_with_spotify_data = [
                self.get_song_data_from_spotify(artist, song) for song in setlist_fm
            ]
            return setlist_with_spotify_data
        except AttributeError as e:
            print(e)
            return []
        except TypeError as e:
            print(e)
            return []

    def get_setlist_from_setlistfm(self, artist):
        most_recent_set = self.setlist_client.get_most_recent_set(
            "{}".format(artist), 5
        )
        return self.setlist_client.parse_song_names_from_setlist(most_recent_set)

    def get_song_data_from_spotify(self, artist, song):
        self.authenticate()
        access_token = self.spotify_client_auth.access_token
        method = "GET"
        url = self.SPOTIFY_SEARCH_URL
        headers = {"Authorization": "Bearer {}".format(access_token)}
        params = {
            "q": "artist:{} track:{}".format(artist, song),
            "type": "track",
            "limit": 1,
        }
        tracks = (
            handle_requests(method=method, url=url, headers=headers, params=params)
            .get("tracks")
            .get("items")
        )
        # Find the track with the highest popularity since there could be multiple tracks in the response
        try:
            max_popularity_index = self.get_highest_popularity_index(tracks)
            selected_track = tracks[max_popularity_index]
        except TypeError as e:
            print(e)
            selected_track = song

        return self.parse_spotify_track_response(selected_track)

    def get_highest_popularity_index(self, objects):
        max_popularity = float("-inf")
        max_index = None

        for i, obj in enumerate(objects):
            popularity = obj.get(
                "popularity", 0
            )  # Get the popularity value, default to 0 if not present
            if popularity > max_popularity:
                max_popularity = popularity
                max_index = i

        return max_index

    def parse_spotify_artist_response(self, response):
        try:
            artists = response.get("artists", {}).get("items", [])
            matches = [
                {
                    "name": artist.get("name"),
                    "imgUrl": artist.get("images", [{}])[0].get("url", ""),
                }
                for artist in artists
            ]
            return matches
        except AttributeError as erra:
            print(erra)
        except TypeError as errt:
            print(errt)
        except IndexError as erri:
            print(erri)

    def parse_spotify_track_response(self, track):
        try:
            title = track.get("name")
            album_name = track.get("album").get("name")
            album_art = track.get("album").get("images")[0].get("url")
            duration = track.get("duration_ms")
            uri = track.get("uri")
        except AttributeError as e:
            print(e)
            title = track
            album_name = "TRACK NOT AVAILABLE"
            album_art = "TRACK NOT AVAILABLE"
            duration = 0
            uri = "TRACK NOT AVAILABLE"
        return {
            "title": title,
            "albumName": album_name,
            "albumArt": album_art,
            "duration": duration,
            "uri": uri,
        }

    def authenticate(self):
        if not self.spotify_client_auth.is_authenticated():
            self.spotify_client_auth.refresh_tokens()
