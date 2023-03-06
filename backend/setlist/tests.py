from unittest.mock import patch
from django.test import TestCase
from .setlist_client import SetlistClient
from .example_setlist_responses import *

# Create your tests here.
class SetlistViewTest(TestCase):
    def setUp(self):
        self.client_test = SetlistClient()

    #parse_song_names
    def test_parse_song_names_from_setlist_incorrect_format(self):
        self.assertIsNone(self.client_test.parse_song_names_from_setlist("incorrect input"))

    def test_parse_song_names_from_setlist_correct_format(self):
        expected_songs = ["song1", "song2", "song3", "song4", "song5", "song6", "song7", "song8", "song9", "song10"]
        self.assertEqual(self.client_test.parse_song_names_from_setlist(page_of_setlists.get("setlist")[2]), expected_songs)

    #parse_meta_data
    def test_parse_meta_data_correct_format(self):
        self.assertEqual(self.client_test.parse_meta_data(page_of_setlists.get("setlist")[0]), parsed_meta_data)

    #get_most_recent_set
    @patch("setlist.setlist_client.SetlistClient.get_setlists", return_value = "incorrect input")
    def test_get_most_recent_set_incorrect_format(self, mock_get_setlists):
        self.assertIsNone(self.client_test.get_most_recent_set("artist", 1))

    @patch("setlist.setlist_client.SetlistClient.get_setlists", return_value = page_of_setlists)
    def test_get_most_recent_set_correct_format_correct_number_of_songs(self, mock_get_setlists):
        self.assertEqual(self.client_test.get_most_recent_set("artist", 1), page_of_setlists.get("setlist")[2])

    @patch("setlist.setlist_client.SetlistClient.get_setlists", return_value = page_of_setlists_no_full_set)
    def test_get_most_recent_set_correct_format_incorrect_number_of_songs(self, mock_get_setlists):
        self.assertIsNone(self.client_test.get_most_recent_set("artist", 1))

    