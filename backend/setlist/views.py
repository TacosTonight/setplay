from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .setlist_client import SetlistClient

class SetlistView(APIView):
    ARTIST_QUERY_PARAM = "artistName"
    MAX_PAGE_SEARCH = 5
    
    def get(self, request):
        artist_name = request.GET.get(self.ARTIST_QUERY_PARAM)
        if artist_name == None:
            return Response(status=status.HTTP_204_NO_CONTENT)
        setlist = self.build_setlist_response(artist_name)
        if setlist == None:
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(setlist, status=status.HTTP_200_OK)

    def build_setlist_response(self, artist_name):
        client = SetlistClient()
        most_recent = client.get_most_recent_set(artist_name, self.MAX_PAGE_SEARCH)
        meta_data = client.parse_meta_data(most_recent)
        songs = client.parse_song_names_from_setlist(most_recent)
        if None in (most_recent, meta_data, songs):
            return None
        return {'setlist':{'metadata':meta_data, 'songs':songs}}