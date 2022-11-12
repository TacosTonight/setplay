import requests
import json
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

class SetlistView(APIView):
    ARTIST_QUERY_PARAM = "artistName"
    HEADERS = {'x-api-key': '', 'Accept': 'application/json'}

    def get(self, request):
        artist_name = request.GET.get(self.ARTIST_QUERY_PARAM)
        if artist_name == None:
            return Response(status=status.HTTP_204_NO_CONTENT)
        # Will eventually return the formatted most recent setlist 
        # instead of just get_setlists
        return Response(self.get_setlists(artist_name,1), status=status.HTTP_200_OK)

    def get_most_recent_set(self, artist_name):
        # Loop through pages of get_setlists 
        # Return setlist if song is >= 5
        return None 

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

    def parse_set(self, setlist):
        return setlist.get("sets").get("set")

    def setlist_JSON_response(self, url, params = None):
        r = requests.get(url, params = params, headers = self.HEADERS)
        if r.status_code != requests.codes.ok:
            return None 
        return json.loads(r.text)