import requests
import json
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

class SetlistView(APIView):
    ARTIST_QUERY_PARAM = "artistName"
    HEADERS = {'x-api-key': 'YyyAf5VEbxqLp-ETIOqdKSPeKxRncbt9yL_6', 'Accept': 'application/json'}

    def get(self, request):
        artist_name = request.GET.get(self.ARTIST_QUERY_PARAM)
        if artist_name == None:
            return Response(status=status.HTTP_204_NO_CONTENT)
        setlist = self.build_setlist_response(artist_name)
        if setlist == None:
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(setlist, status=status.HTTP_200_OK)

    def build_setlist_response(self, artist_name):
        most_recent = self.get_most_recent_set(artist_name, 5)
        meta_data = self.parse_meta_data(most_recent)
        songs = self.parse_song_names_from_setlist(most_recent)
        if None in (most_recent, meta_data, songs):
            return None
        return {'setlist':{'metadata':meta_data, 'songs':songs}}

    def get_most_recent_set(self, artist_name, max_page_search):
        for i in range (1, max_page_search + 1):
            setlists = self.get_setlists(artist_name, i).get("setlist")
            for setlist in setlists:
                if self.get_song_count(setlist) > 5:
                    return setlist

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
        return {'artist': artist_info, 'venue': venue_info, 'tour': tour, 'date':event_date}
   
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

    def get_setlists(self, artist_name, page_number):
        url = 'https://api.setlist.fm/rest/1.0/search/setlists'
        params = {'artistName': '{}'.format(artist_name), 'p': page_number}
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

    def setlist_JSON_response(self, url, params = None):
        r = requests.get(url, params = params, headers = self.HEADERS)
        if r.status_code != requests.codes.ok:
            return None 
        return json.loads(r.text)