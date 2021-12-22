from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from django.http import JsonResponse
from songdata.setlist import Setlist


def index(request):
    artist = "Acacia Strain"
    sets = Setlist(artist)
    mbid = sets.get_mbid()
    setlists = sets.get_setlist(mbid,4)
    most_recent = sets.most_recent_set(setlists)
    songlist = sets.songlist(most_recent)
   
    return render(request, 'playlists/index.html', {'artist':artist, 'songlist': songlist})

class SetlistAPI(View):
    def get(self, request, *args, **kwargs):
        artist = "Stray From The Path"
        sets = Setlist(artist)
        mbid = sets.get_mbid()
        setlists = sets.get_setlist(mbid,4)
        most_recent = sets.most_recent_set(setlists)
        songlist = sets.songlist(most_recent)
        return JsonResponse({'songlist': songlist})