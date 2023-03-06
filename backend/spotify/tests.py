from unittest import mock
from django.test import TestCase
from spotify.models import SpotifyToken
from.spotify_authentication import SpotifyAuthentication
from setplay.settings import TIME_ZONE

class SpotifyTokenTest(TestCase):
    def setUp(self):
        self.auth_test = SpotifyAuthentication("","","", "", "", "")
        SpotifyToken.objects.create(
            user = "user1",
            refresh_token = "refresh_token",
            access_token = "access_token",
            expires_in = "2012-01-30 04:49:15.059321+00:00",
            token_type = "token_type"
        )

    def test_is_authenticated_user_not_found(self):
        """
        SCENARIO
            - Check if a non-existent user is authenticated
        EXPECTED
            - Return false for non-existent user 
        """
        self.assertFalse(self.auth_test.is_authenticated("user_not_found"))

    def test_is_authenticated_refresh(self):
        """
        SCENARIO
            - Check if user exists and has expired token
        Expected
            - An existing user that has an expired token will return True and refresh their access token
            - Db for user1 will now have access_token2 for acess token
        """
        refresh_token_response = {
        'access_token':'access_token2',
        'token_type':'token_type',
        'expires_in': 3600
        }
        with mock.patch('spotify.spotify_authentication.SpotifyAuthentication.get_spotify_token_response', return_value=refresh_token_response):
            self.assertTrue(self.auth_test.is_authenticated("user1"))
            row = SpotifyToken.objects.get(user="user1")
            user = row.user
            refresh_token = row.refresh_token
            access_token = row.access_token
            #expected actual
            self.assertEqual("user1", user)
            self.assertEqual("refresh_token", refresh_token)
            self.assertEqual("access_token2", access_token)

    def test_request_new_tokens_new_user(self):
        """
        SCENARIO 
            - Request token for new user
        Expected
            - User2 which does not exist in the current db will create a new user row with access_token
        """
        user = "user2"
        refresh_token_response = {
            'access_token':'access_token',
            'token_type':'token_type',
            'expires_in': 3600,
            'refresh_token': 'refresh_token',
        }
        with mock.patch('spotify.spotify_authentication.SpotifyAuthentication.get_spotify_token_response', return_value=refresh_token_response):
            self.assertFalse(SpotifyToken.objects.filter(user="user2").exists())
            self.auth_test.request_new_tokens(user, '')
            self.assertTrue(SpotifyToken.objects.filter(user="user2").exists())

    def test_parse_spotify_auth_authorization_code(self):
        """
        SCENARIO
            - Parse authorization code response
        Expected
            - Dict with 4 keys that are access_token, token_type, expires_in, and refresh_token
        """
        response = {
            'access_token':'access_token',
            'token_type':'token_type',
            'expires_in': 9999,
            'refresh_token': 'refresh_token',
        }
        with mock.patch('spotify.spotify_authentication.SpotifyAuthentication.calculate_token_expiration_time', return_value=9999):
            parsed_response = self.auth_test.parse_spotify_auth(response, "authorization_code")
            self.assertEqual(4, len(parsed_response))
            self.assertTrue('access_token' in parsed_response)
            self.assertTrue('token_type' in parsed_response)
            self.assertTrue('expires_in' in parsed_response)
            self.assertTrue('refresh_token' in parsed_response)

    def test_parse_spotify_auth_refresh_token(self):
        """
        SCENARIO
            - Parse refresh token response
        Expected
            - Dict with 3 keys that are access_token, token_type, expires_in
        """
        response = {
            'access_token':'access_token',
            'token_type':'token_type',
            'expires_in': 9999,
            'refresh_token': 'refresh_token',
        }
        with mock.patch('spotify.spotify_authentication.SpotifyAuthentication.calculate_token_expiration_time', return_value=9999):
            parsed_response = self.auth_test.parse_spotify_auth(response, "refresh_token")
            self.assertEqual(3, len(parsed_response))
            self.assertTrue('access_token' in parsed_response)
            self.assertTrue('token_type' in parsed_response)
            self.assertTrue('expires_in' in parsed_response)
