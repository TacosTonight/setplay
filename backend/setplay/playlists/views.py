from django.shortcuts import render
from django.http import HttpResponse

from songdata.setlist import Setlist


def index(request):
    artist = "Stray From The Path"
    sets = Setlist(artist)
    mbid = sets.get_mbid()
    setlists = sets.get_setlist(mbid,4)
    most_recent = sets.most_recent_set(setlists)
    songlist = sets.songlist(most_recent)
   
    return render(request, 'playlists/index.html', {'artist':artist, 'songlist': songlist})