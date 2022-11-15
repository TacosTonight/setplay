from unittest.mock import patch
from django.test import TestCase
from .views import SetlistView
from .example_setlist_responses import *

# Create your tests here.
class SetlistViewTest(TestCase):
    def setUp(self):
        self.view = SetlistView()
    # parse_set()
    def test_parse_set_is_empty(self):
        self.assertEquals(self.view.parse_set(empty_setlist), [])
    def test_parse_set_with_sets(self):
        self.assertEquals(self.view.parse_set(setlist_with_subsets), parsed_setlist_with_subsets)
    def test_parse_set_incorrect_key(self):
        self.assertIsNone(self.view.parse_set(empty_setlist_incorrect_key))

    # is_empty()
    def test_is_empty_empty_set(self):
        self.assertTrue(self.view.is_empty_set(empty_setlist))

    def test_is_empty_set_with_subsets(self):
        self.assertFalse(self.view.is_empty_set(setlist_with_subsets))

    def test_is_empty_set_incorrect_key(self):
        self.assertTrue(self.view.is_empty_set(empty_setlist_incorrect_key))

    # get_song_count()
    def test_get_song_count_with_subsets(self):
        self.assertEqual(self.view.get_song_count(setlist_with_subsets), 10)

    def test_get_song_count_without_subsets(self):
        self.assertEqual(self.view.get_song_count(setlist_single_subset), 5)

    def test_get_song_count_empty(self):
        self.assertEqual(self.view.get_song_count(empty_setlist), 0)

    def test_get_song_count_incorrect_key(self):
        self.assertEqual(self.view.get_song_count(empty_setlist_incorrect_key), 0)

    # parse_subsets_from_set()
    def test_parse_subsets_from_set_passing_case(self):
        self.assertEqual(self.view.parse_subsets_from_set(parsed_setlist_with_subsets), parsed_subsets)

    def test_parse_subsets_from_set_incorrect_format(self):
        self.assertIsNone(self.view.parse_subsets_from_set({'randomkey':21}))

    # flatten_subsets()
    def test_flatten_subsets_passing_case(self):
        self.assertEqual(self.view.flatten_subsets(parsed_subsets),flattened_subsets)

    def test_flatten_subsets_incorrect_format(self):
        self.assertIsNone(self.view.flatten_subsets({'randomkey':21}))

    # parse_meta_data()
    def test_parse_meta_data_passing_case(self):
        self.assertEqual(self.view.parse_meta_data(meta_data), parsed_meta_data)

    def test_parse_meta_data_incorrect_format(self):
        self.assertIsNone(self.view.parse_meta_data({'randomkey':21}))

    # parse_song_names_from_setlist()
    def test_parse_names_from_setlist_passing_case_with_subsets(self):
        self.assertEqual(self.view.parse_song_names_from_setlist(setlist_with_subsets), flattened_subsets)

    def test_parse_names_from_setlist_passing_case_with_single_subset(self):
        self.assertEqual(self.view.parse_song_names_from_setlist(setlist_single_subset), flattened_single_subset)

    def test_parse_names_from_setlist_incorrect_key(self):
        self.assertIsNone(self.view.parse_song_names_from_setlist(empty_setlist_incorrect_key))

    # get_most_recent_set()
    @patch("setlist.views.SetlistView.get_setlists", return_value = page_of_setlists)
    def test_get_most_recent_set(self, mock_get_setlists):
        self.assertEquals(self.view.get_most_recent_set("asdf", 1), most_recent_set)

    @patch("setlist.views.SetlistView.get_setlists", return_value = page_of_setlists_all_empty)
    def test_get_most_recent_set_all_empty(self, mock_get_setlists):
        self.assertIsNone(self.view.get_most_recent_set("asdf", 1))

    # build_setlist_response()
    @patch("setlist.views.SetlistView.get_most_recent_set", return_value = most_recent_set)
    def test_build_setlist_response(self, mock_get_most_recent_set):
        self.assertEquals(self.view.build_setlist_response("asdf"), set_list_response)

    @patch("setlist.views.SetlistView.get_most_recent_set", return_value = most_recent_set_empty)
    def test_build_setlist_response_empty_set(self, mock_get_most_recent_set):
        self.assertIsNone(self.view.build_setlist_response("asdf"))