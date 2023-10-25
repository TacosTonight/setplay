import requests
import json
import os


class SetlistClient:
    HEADERS = {
        "x-api-key": os.environ.get("SETLIST_FM_KEY"),
        "Accept": "application/json",
    }

    def get_most_recent_set(self, artist_name, max_page_search):
        for i in range(1, max_page_search + 1):
            try:
                setlists = self.get_setlists(artist_name, i).get("setlist")
                for setlist in setlists:
                    if self.get_song_count(setlist) > 5:
                        return setlist
            except AttributeError:
                return None

    def parse_song_names_from_setlist(self, setlist):
        if setlist is None:
            return None
        parsed_setlist = self.parse_set(setlist)
        if not parsed_setlist:
            return None
        setlist = self.parse_subsets_from_set(parsed_setlist)
        if None in (parsed_setlist, setlist):
            return None
        return self.flatten_subsets(setlist)

    def parse_meta_data(self, setlist):
        if setlist is None:
            return None
        artist_info = setlist.get("artist")
        venue_info = setlist.get("venue")
        tour = setlist.get("tour")
        # Day Month Year
        event_date = setlist.get("eventDate")
        if None in (artist_info, venue_info, tour):
            return None
        return {
            "artist": artist_info,
            "venue": venue_info,
            "tour": tour,
            "date": event_date,
        }

    def get_setlists(self, artist_name, page_number):
        url = "https://api.setlist.fm/rest/1.0/search/setlists"
        params = {"artistName": "{}".format(artist_name), "p": page_number}
        return self.setlist_JSON_response(url, params)

    def get_song_count(self, setlist):
        if self.is_empty_set(setlist):
            return 0
        else:
            parsed_setlist = self.parse_set(setlist)
            setlist_song_cont = 0
            for sub_setlist in parsed_setlist:
                sub_setlist_song_count = len(sub_setlist.get("song"))
                setlist_song_cont += sub_setlist_song_count
            return setlist_song_cont

    def is_empty_set(self, setlist):
        if not self.parse_set(setlist):
            return True
        else:
            return False

    def parse_set(self, setlist):
        try:
            return setlist.get("sets").get("set")
        except AttributeError:
            return None

    def parse_subsets_from_set(self, set):
        # One set can have multiple subsets i.e encore and main set
        try:
            return [sub_setlist.get("song") for sub_setlist in set]
        except AttributeError:
            return None
        except TypeError:
            return None

    def flatten_subsets(self, subsets):
        try:
            return [song.get("name") for sublist in subsets for song in sublist]
        except AttributeError:
            return None
        except TypeError:
            return None

    def setlist_JSON_response(self, url, params=None):
        r = requests.get(url, params=params, headers=self.HEADERS)
        if r.status_code != requests.codes.ok:
            return None
        return json.loads(r.text)
