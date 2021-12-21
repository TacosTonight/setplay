import json
import requests
import base64
from decouple import config

class Setlist:
    def __init__(self, artist):
        self.artist = artist
        self.setlist_api_key = config('SETLIST_API_KEY')
        self.headers = {'x-api-key': self.setlist_api_key, 'Accept': 'application/json'}
        
    def setlist_JSON_response(self, url, params = None):
        r = requests.get(url, params = params, headers = self.headers)
        if r.status_code != requests.codes.ok:
            return None 
        return json.loads(r.text)
        
    def get_mbid(self):
        url = 'https://api.setlist.fm/rest/1.0/search/artists'
        params = {'artistName': self.artist, 'sort': 'relevance'}
        query_results = self.setlist_JSON_response(url, params)
        if query_results == None:
            return None
        return query_results.get("artist")[0].get("mbid")

    def get_setlist(self, mbid, max_page):
        #returns the list of setlist dictonaries 
        for i in range (1, max_page+1):
            url = 'https://api.setlist.fm/rest/1.0/artist/' + str(mbid) + '/setlists' 
            params = {'p':i}
            query_results = self.setlist_JSON_response(url,params)
            if query_results == None:
                return None
            elif self.is_empty_setlists(query_results.get("setlist")) == False:
                return query_results.get("setlist")
        print("could not find setlist")

    def is_empty_setlists(self,setlists):
        #returns FALSE if a setlist is not empty 
        for sets in setlists:
            if sets.get("sets").get("set"):
                return False 
                
    def most_recent_set(self, setlists):
        number_of_songs = 5
        if setlists == None:
            return None
        for sets in setlists:
            if not sets.get("sets").get("set"):
                continue
            else:
                if len(sets.get("sets").get("set")[0].get("song")) > number_of_songs:
                    return sets.get("sets").get("set")

    def songlist(self, most_recent_set):
        combinedlist = []
        if most_recent_set == None:
            return "no setlist"
        song_list = most_recent_set[0].get("song")
        for tracks in song_list:
            combinedlist.append(tracks.get("name"))
        if len(most_recent_set) > 1:
            encore_list = most_recent_set[1].get("song")
            for tracks in encore_list:
                combinedlist.append(tracks.get("name"))
        return combinedlist


if __name__ == '__main__':
	band = input('Enter Band Name: ')
	sets = Setlist(band)
	mbid = sets.get_mbid()
	setlists = sets.get_setlist(mbid,4)
	most_recent = sets.most_recent_set(setlists)
	songlist = sets.songlist(most_recent)
	print(songlist)
